import { after, before, test } from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { chromium } from "playwright";
import { strFromU8, unzipSync } from "fflate";

const require = createRequire(import.meta.url);
const origin = "http://127.0.0.1:4174";
let server;
let browser;
let context;
let page;
const consoleErrors = [];
const externalRequests = [];

before(async () => {
  await mkdir("test-results", { recursive: true });
  // Validate the built artifact; npm run build must have completed first.
  assert.ok(existsSync("dist/index.html"), "Run npm run build before npm test");
  server = spawn(
    process.execPath,
    [
      "node_modules/vite/bin/vite.js",
      "preview",
      "--host",
      "127.0.0.1",
      "--port",
      "4174",
      "--strictPort",
    ],
    { stdio: "pipe" },
  );
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error("Preview startup timed out")),
      15000,
    );
    server.stdout.on("data", (data) => {
      if (data.toString().includes("4174")) {
        clearTimeout(timeout);
        resolve();
      }
    });
    server.on("error", reject);
    server.on("exit", (code) => {
      if (code) {
        clearTimeout(timeout);
        reject(new Error(`Preview exited: ${code}`));
      }
    });
  });
  const executablePath =
    process.env.CHROMIUM_PATH ||
    (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
  browser = await chromium.launch({
    executablePath,
    headless: true,
    args: ["--no-sandbox"],
  });
  context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  page = await context.newPage();
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("request", (request) => {
    if (!request.url().startsWith(origin) && /^https?:/.test(request.url()))
      externalRequests.push(request.url());
  });
  await page.goto(origin);
});

after(async () => {
  await context?.close();
  await browser?.close();
  server?.kill("SIGTERM");
});

test("Desktop, Tablet und Mobil: kein Überlauf, sinnvolle Struktur und lesbare Navigation", async () => {
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator(".service-card").count(), 4);
  assert.match(await page.title(), /S\+H Grundbau GmbH/);
  assert.equal(await page.locator("html").getAttribute("lang"), "de");
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      `Horizontal overflow at ${width}`,
    );
    await page.screenshot({
      path: `test-results/seite-${width}.png`,
      fullPage: true,
    });
    if (width === 1440 || width === 390)
      await page.screenshot({
        path: `test-results/${width === 1440 ? "desktop" : "mobile"}.png`,
      });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  const menu = page.locator(".menu-toggle");
  await menu.click();
  assert.equal(await menu.getAttribute("aria-expanded"), "true");
  await page.keyboard.press("Escape");
  assert.equal(await menu.getAttribute("aria-expanded"), "false");
  assert.equal(
    await menu.evaluate((el) => el === document.activeElement),
    true,
  );
  await menu.click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Leistungen", exact: true })
    .click();
  assert.equal(await menu.getAttribute("aria-expanded"), "false");
  assert.equal(new URL(page.url()).hash, "#leistungen");
  await page
    .getByRole("link", { name: "Mikropfähle anfragen", exact: true })
    .click();
  assert.equal(
    await page.locator("select[name=leistung]").inputValue(),
    "Mikropfähle",
  );
  assert.equal(new URL(page.url()).hash, "#kontakt");
});

test("Formular prüft Pflichtfelder, E-Mail, Zustimmung und Dateigrenzen; ZIP enthält echte Unterlagen", async () => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const form = page.getByRole("form", { name: "Projektanfrage vorbereiten" });
  assert.equal(await form.evaluate((el) => el.checkValidity()), false);
  await page.locator("[name=name]").fill("Erika Muster");
  await page.locator("[name=unternehmen]").fill("Test Bau GmbH");
  await page.locator("[name=email]").fill("ungueltig");
  await page.locator("[name=bauvorhaben]").fill("Test-Baugrube, Essen");
  await page
    .locator("[name=nachricht]")
    .fill("Anfrage zur Rückverankerung. Unterlagen anbei.");
  await page.locator("select[name=leistung]").selectOption("Mikropfähle");
  await page.locator("[name=datenschutz]").check();
  assert.equal(await form.evaluate((el) => el.checkValidity()), false);
  await page.locator("[name=email]").fill("erika@example.test");
  assert.equal(await form.evaluate((el) => el.checkValidity()), true);
  await page.locator("[name=datenschutz]").uncheck();
  assert.equal(await form.evaluate((el) => el.checkValidity()), false);
  await page.locator("[name=datenschutz]").check();
  await page.locator("[name=name]").fill("   ");
  await page
    .getByRole("button", { name: "Anfragepaket herunterladen" })
    .click();
  assert.match(await page.getByRole("alert").innerText(), /Pflichtfelder/);
  await page.locator("[name=name]").fill("Erika Muster");
  await page.locator("input[type=file]").setInputFiles({
    name: "script.exe",
    mimeType: "application/octet-stream",
    buffer: Buffer.from("test"),
  });
  await page
    .getByRole("button", { name: "Anfragepaket herunterladen" })
    .click();
  assert.match(await page.getByRole("alert").innerText(), /zulässige Dateien/);
  await page.locator("input[type=file]").setInputFiles({
    name: "lageplan.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.alloc(10 * 1024 * 1024 + 1),
  });
  await page
    .getByRole("button", { name: "Anfragepaket herunterladen" })
    .click();
  assert.match(await page.getByRole("alert").innerText(), /maximal 10 MB/);
  await page.locator("input[type=file]").setInputFiles(
    Array.from({ length: 6 }, (_, i) => ({
      name: `plan${i}.pdf`,
      mimeType: "application/pdf",
      buffer: Buffer.from("test"),
    })),
  );
  await page
    .getByRole("button", { name: "Anfragepaket herunterladen" })
    .click();
  assert.match(await page.getByRole("alert").innerText(), /höchstens 5/);
  await page.locator("input[type=file]").setInputFiles(
    Array.from({ length: 3 }, (_, i) => ({
      name: `plan${i}.pdf`,
      mimeType: "application/pdf",
      buffer: Buffer.alloc(7 * 1024 * 1024),
    })),
  );
  await page
    .getByRole("button", { name: "Anfragepaket herunterladen" })
    .click();
  assert.match(
    await page.getByRole("alert").innerText(),
    /insgesamt maximal 20 MB/,
  );
  await page.locator("input[type=file]").setInputFiles({
    name: "lageplan.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("%PDF-test-only"),
  });
  const noUpload = [];
  const listener = (request) => {
    if (request.method() !== "GET") noUpload.push(request.url());
  };
  page.on("request", listener);
  const downloadReady = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Anfragepaket herunterladen" })
    .click();
  const download = await downloadReady;
  const filename = `test-results/${download.suggestedFilename()}`;
  await download.saveAs(filename);
  const archive = unzipSync(new Uint8Array(await readFile(filename)));
  assert.match(strFromU8(archive["Projektanfrage.txt"]), /Erika Muster/);
  assert.match(strFromU8(archive["Projektanfrage.txt"]), /Mikropfähle/);
  assert.equal(
    strFromU8(archive["Unterlagen/1-lageplan.pdf"]),
    "%PDF-test-only",
  );
  assert.match(
    await page.getByRole("status").innerText(),
    /Es wurde nichts versendet/,
  );
  assert.equal(await page.locator("[name=name]").inputValue(), "Erika Muster");
  assert.deepEqual(noUpload, []);
  const draft = page.getByRole("link", { name: "E-Mail-Entwurf öffnen" });
  const href = new URL(await draft.getAttribute("href"));
  assert.equal(href.protocol, "mailto:");
  assert.equal(href.pathname, "info@sh-grundbau.de");
  assert.match(href.searchParams.get("subject"), /Test-Baugrube, Essen/);
  assert.match(href.searchParams.get("body"), /ZIP-Datei manuell als Anhang/);
  assert.match(
    strFromU8(archive["Projektanfrage.txt"]),
    /Empfänger: info@sh-grundbau.de/,
  );
  await page.locator("[name=name]").fill("Erika Muster geändert");
  assert.equal(await draft.count(), 0);
  assert.equal(await page.locator(".form-status").textContent(), "");
  page.off("request", listener);
});

test("Original-Logo, Ansprechpartner und Anbieterangaben sind integriert; Angebot bleibt privat", async () => {
  await page.goto(origin);
  const logo = page.locator(".brand-logo");
  await logo.evaluate((image) => image.decode());
  assert.equal(await logo.getAttribute("alt"), "S + H Grundbau GmbH");
  assert.ok(await logo.evaluate((image) => image.naturalWidth > 0));
  for (const email of [
    "info@sh-grundbau.de",
    "michael.streit@sh-grundbau.de",
    "tobias.oesinghaus@sh-grundbau.de",
  ]) {
    assert.ok((await page.locator(`a[href="mailto:${email}"]`).count()) > 0);
  }
  assert.match(
    await page.locator(".people").innerText(),
    /Dipl.-Ing. Michael Streit/,
  );
  assert.match(
    await page.locator(".people").innerText(),
    /Tobias Oesinghaus, M.Sc./,
  );
  assert.equal(
    await page.locator(".contact-phone").getAttribute("href"),
    "tel:+4926832120",
  );
  const org = JSON.parse(
    await page.locator('script[type="application/ld+json"]').textContent(),
  );
  assert.equal(org.legalName, "S + H Grundbau GmbH");
  assert.equal(org.address.streetAddress, "Werner-Heisenberg-Straße 4");
  assert.equal(org.vatID, "DE225748543");
  await page.goto(origin + "/impressum.html");
  assert.match(await page.locator("main").innerText(), /Amtsgericht Montabaur/);
  assert.match(await page.locator("main").innerText(), /HRB 14575/);
  assert.match(await page.locator("main").innerText(), /DE225748543/);
  assert.equal(await page.locator('a[href="tel:+4926832120"]').count(), 1);
  const outputFiles = await readdir("dist", { recursive: true });
  assert.ok(outputFiles.every((name) => !/\.pdf$/i.test(name)));
  assert.doesNotMatch(
    await page.locator("body").innerText(),
    /IBAN|Steuer-Nr\.:/,
  );
  await page.goto(origin);
  const performanceDetails = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    return {
      environment:
        "Local Chromium; no network/CPU throttling; warm browser cache",
      domContentLoadedMs: Math.round(nav.domContentLoadedEventEnd),
      loadMs: Math.round(nav.loadEventEnd),
    };
  });
  await writeFile(
    "test-results/performance.json",
    JSON.stringify(performanceDetails, null, 2),
  );
});

test("WCAG-Prüfungen, Sprungziele, Rechtsseiten und keine externen Ressourcen", async () => {
  await page.goto(origin);
  await page.keyboard.press("Tab");
  assert.equal(
    await page.evaluate(() => document.activeElement?.textContent),
    "Zum Inhalt springen",
  );
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 });
    if (width === 390)
      await page.getByRole("button", { name: "Menü", exact: true }).click();
    await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
    const violations = await page.evaluate(
      async () =>
        (
          await window.axe.run(document, {
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"],
            },
          })
        ).violations,
    );
    assert.deepEqual(
      violations.map((v) => ({
        id: v.id,
        targets: v.nodes.map((n) => n.target),
      })),
      [],
      `Accessibility violations at ${width}`,
    );
  }
  const fragments = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) => links.map((a) => a.getAttribute("href").slice(1)));
  for (const fragment of fragments)
    assert.equal(await page.locator(`[id="${fragment}"]`).count(), 1);
  assert.equal(await page.locator('a[href*="spezialtiefbau"]').count(), 0);
  assert.match(
    await page.locator(".identity-note").innerText(),
    /rechtlich eigenständiges Unternehmen/,
  );
  assert.equal(
    await page.locator("meta[name=robots]").getAttribute("content"),
    "noindex, nofollow",
  );
  for (const path of ["/impressum.html", "/datenschutz.html"]) {
    const response = await page.goto(origin + path);
    assert.equal(response.status(), 200);
    await page.addScriptTag({ path: require.resolve("axe-core/axe.min.js") });
    const violations = await page.evaluate(
      async () =>
        (
          await window.axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa"] },
          })
        ).violations,
    );
    assert.deepEqual(
      violations.map((v) => v.id),
      [],
    );
  }
  assert.deepEqual(externalRequests, []);
  assert.deepEqual(consoleErrors, []);
});
