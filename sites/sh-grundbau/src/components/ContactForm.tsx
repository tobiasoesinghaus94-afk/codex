import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { strToU8, zipSync } from "fflate";
import { company, services } from "../content";
import { Arrow } from "./Graphics";

const maxFile = 10 * 1024 * 1024;
const maxTotal = 20 * 1024 * 1024;
const allowed = /\.(pdf|docx?|xlsx?|dwg|dxf|x83|d83|p83|zip)$/i;

export default function ContactForm({
  selectedService,
}: {
  selectedService: string;
}) {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [mailDraft, setMailDraft] = useState("");
  const [filenames, setFilenames] = useState<string[]>([]);
  const filesRef = useRef<HTMLInputElement>(null);

  async function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const files = Array.from(filesRef.current?.files ?? []);
    setStatus("");
    setError("");
    setMailDraft("");
    for (const name of [
      "name",
      "unternehmen",
      "email",
      "bauvorhaben",
      "nachricht",
    ]) {
      if (!String(data.get(name) ?? "").trim()) {
        setError(
          "Bitte füllen Sie alle Pflichtfelder mit einer aussagekräftigen Angabe aus.",
        );
        form.querySelector<HTMLInputElement>(`[name="${name}"]`)?.focus();
        return;
      }
    }
    if (
      files.length > 5 ||
      files.some((file) => !allowed.test(file.name) || file.size > maxFile) ||
      files.reduce((sum, file) => sum + file.size, 0) > maxTotal
    ) {
      setError(
        "Bitte wählen Sie höchstens 5 zulässige Dateien mit je maximal 10 MB und insgesamt maximal 20 MB aus.",
      );
      filesRef.current?.focus();
      return;
    }
    setBusy(true);
    try {
      const fields = [
        ["Name", "name"],
        ["Unternehmen", "unternehmen"],
        ["E-Mail", "email"],
        ["Telefon", "telefon"],
        ["Bauvorhaben und Ort", "bauvorhaben"],
        ["Gewünschte Leistung", "leistung"],
        ["Ausführungszeitraum", "zeitraum"],
        ["Nachricht", "nachricht"],
      ];
      const body = [
        `Projektanfrage an ${company.legalName}`,
        `Empfänger: ${company.email}`,
        "Lokal vorbereitet – noch nicht versendet.",
        "",
        ...fields.map(
          ([label, key]) =>
            `${label}: ${String(data.get(key) || "Nicht angegeben").trim()}`,
        ),
        "",
        `Unterlagen: ${files.length ? files.map((f) => f.name).join(", ") : "Keine beigefügt"}`,
        "",
        `Bitte die ZIP-Datei nach Prüfung manuell an ${company.email} senden.`,
      ].join("\n");
      const entries: Record<string, Uint8Array> = {
        "Projektanfrage.txt": strToU8(body),
      };
      for (const [index, file] of files.entries()) {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        entries[`Unterlagen/${index + 1}-${safeName}`] = new Uint8Array(
          await file.arrayBuffer(),
        );
      }
      const bytes = zipSync(entries, { level: 0 });
      const url = URL.createObjectURL(
        new Blob([new Uint8Array(bytes)], { type: "application/zip" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "S-H-Grundbau-Projektanfrage.zip";
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      const subject = `Projektanfrage – ${String(data.get("bauvorhaben")).trim().slice(0, 180)}`;
      const mailBody = [
        "Guten Tag,",
        "",
        `ich möchte folgendes Bauvorhaben anfragen: ${String(data.get("bauvorhaben")).trim()}`,
        `Gewünschte Leistung: ${String(data.get("leistung")).trim()}`,
        `Ausführungszeitraum: ${String(data.get("zeitraum") || "Noch offen").trim()}`,
        "",
        "Die vollständigen Angaben und Unterlagen finden Sie im Anfragepaket.",
        "[Bitte die heruntergeladene ZIP-Datei manuell als Anhang hinzufügen.]",
        "",
        String(data.get("name")).trim(),
        String(data.get("unternehmen")).trim(),
        String(data.get("email")).trim(),
        String(data.get("telefon") || "").trim(),
      ].join("\n");
      setMailDraft(
        `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`,
      );
      setStatus(
        `Ihr Anfragepaket wurde erstellt und der Download gestartet. Es wurde nichts versendet. Senden Sie die ZIP-Datei nach Prüfung an ${company.email}. Über „E-Mail-Entwurf öffnen“ können Sie Ihr E-Mail-Programm aufrufen. Fügen Sie die ZIP-Datei dort manuell als Anhang hinzu.`,
      );
    } catch {
      setError(
        "Das Anfragepaket konnte nicht erstellt werden. Bitte versuchen Sie es mit weniger oder kleineren Unterlagen erneut.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={prepare}
      onChange={() => {
        setStatus("");
        setMailDraft("");
      }}
      aria-label="Projektanfrage vorbereiten"
    >
      <div className="form-heading">
        <h3>Worum geht es bei Ihrem Projekt?</h3>
        <span>* Pflichtfeld</span>
      </div>
      <div className="form-grid">
        <label>
          Name *
          <input name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label>
          Unternehmen *
          <input
            name="unternehmen"
            autoComplete="organization"
            required
            maxLength={160}
          />
        </label>
        <label>
          E-Mail *
          <input
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={200}
          />
        </label>
        <label>
          Telefon <span className="optional">(optional)</span>
          <input type="tel" name="telefon" autoComplete="tel" maxLength={60} />
        </label>
        <label className="full-width">
          Bauvorhaben und Ort *
          <input
            name="bauvorhaben"
            required
            maxLength={300}
            placeholder="Projektbezeichnung, PLZ und Ort"
          />
        </label>
        <label>
          Gewünschte Leistung *
          <select
            key={selectedService}
            name="leistung"
            defaultValue={selectedService || ""}
            required
          >
            <option value="" disabled>
              Bitte auswählen
            </option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>
                {s.title}
              </option>
            ))}
            <option>Mehrere Leistungen / noch offen</option>
          </select>
        </label>
        <label>
          Ausführungszeitraum <span className="optional">(optional)</span>
          <input
            name="zeitraum"
            maxLength={120}
            placeholder="z. B. Monat, Jahr oder noch offen"
          />
        </label>
        <label className="full-width">
          Ihre Nachricht *
          <textarea
            name="nachricht"
            rows={4}
            required
            maxLength={5000}
            placeholder="Welche Arbeiten sind vorgesehen? Was ist bei Zugang und Baufeld zu beachten?"
          />
        </label>
      </div>
      <label className="file-zone">
        Unterlagen hinzufügen <span className="optional">(optional)</span>
        <span className="file-help" id="file-help">
          LV, Pläne oder Baugrundunterlagen · PDF, Word, Excel, DWG, DXF, GAEB,
          ZIP · max. 5 Dateien, je 10 MB / zusammen 20 MB
        </span>
        <input
          ref={filesRef}
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg,.dxf,.x83,.d83,.p83,.zip"
          aria-describedby="file-help"
          onChange={(e) => {
            setFilenames(Array.from(e.target.files ?? []).map((f) => f.name));
            setStatus("");
            setError("");
          }}
        />
        <span className="selected-files">
          {filenames.length > 0
            ? filenames.join(" · ")
            : "Die Dateien werden nur Ihrem lokalen Anfragepaket hinzugefügt."}
        </span>
      </label>
      <label className="checkbox-label">
        <input name="datenschutz" type="checkbox" required />
        <span>
          Ich habe die <a href="/datenschutz.html">Datenschutzhinweise</a> zur
          lokalen Verarbeitung gelesen. *
        </span>
      </label>
      <p className="form-note" id="local-note">
        Ihre Angaben und Unterlagen werden ausschließlich in Ihrem Browser zu
        einer ZIP-Datei zusammengestellt. Es erfolgt kein Upload und kein
        Versand durch die Website. Anschließend können Sie einen E-Mail-Entwurf
        an info@sh-grundbau.de öffnen und die ZIP-Datei manuell anhängen.
      </p>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <p className="form-status" role="status" aria-live="polite">
        {status}
      </p>
      <button
        type="submit"
        className="button button-dark submit-button"
        disabled={busy}
        aria-describedby="local-note"
      >
        {busy ? "Anfragepaket wird erstellt …" : "Anfragepaket herunterladen"}
        <Arrow />
      </button>
      {mailDraft && (
        <a className="button mail-draft-button" href={mailDraft}>
          E-Mail-Entwurf öffnen
          <Arrow diagonal />
        </a>
      )}
    </form>
  );
}
