# S+H Grundbau GmbH – Landingpage

Eigenständiger, lokal lauffähiger Website-Entwurf mit React, TypeScript und Vite. Projektpfad im eingebundenen Repository: `sites/sh-grundbau` (Cloud-Pfad: `/workspace/codex/sites/sh-grundbau`). Das Webprojekt liegt als eigenständiger Unterordner im eingebundenen Repository. Die bestehenden Rust-/SDK-Dateien bleiben unverändert.

## Start

**Windows: Schritt-für-Schritt-Anleitung in [docs/WINDOWS-START.md](docs/WINDOWS-START.md).** Für eine sofortige Ansicht ohne Installation lässt sich die enthaltene Datei `vorschau.html` nach dem Entpacken im Browser öffnen. Für automatische Aktualisierungen bei Änderungen die Vite-Vorschau verwenden.

Node.js >= 22.12 verwenden (validiert mit Node 24). Im Projektordner:

```sh
npm ci
npm run dev
```

Vite gibt die lokale Entwicklungsadresse aus. Produktionsprüfung:

```sh
npm run lint
npm run build
npm test
npm run preview
```

Falls das Nutzerverzeichnis nicht beschreibbar ist, den npm-Cache mit `npm_config_cache=/workspace/.cloud-setup/npm-cache` setzen. `package-lock.json` ist Bestandteil des Projekts. Kein externer Dienst, kein API-Schlüssel und kein Backend erforderlich.

Die Browserprüfungen verwenden vorhandenes Chromium unter `/usr/bin/chromium`, alternativ `CHROMIUM_PATH` setzen oder einmal `npx playwright install chromium` ausführen. `npm test` startet und beendet selbst einen lokalen Vite-Preview-Prozess auf Port 4174 und prüft das zuvor gebaute `dist/`. Screenshots und das geprüfte Anfragepaket liegen anschließend im ignorierten Ordner `test-results/`.

## Umsetzung und Dateien

- `src/App.tsx`: vollständige Landingpage mit Hero, Leistungen, Vorteilen, Unternehmen, Einsatzfeldern, Kontakt und Footer.
- `src/components/Header.tsx`: Sticky Header, mobiles Menü mit Escape-Bedienung.
- `src/components/Graphics.tsx`: eigene schematische SVG-Zeichnung und Leistungssymbole; dekorativ, nicht als technische Ausführungsplanung zu lesen.
- `src/components/ContactForm.tsx`: native Pflichtfeld-/E-Mail-Prüfung, Dateilimits, lokaler ZIP-Export mit echten Dateianhängen und anschließender E-Mail-Entwurf an info@sh-grundbau.de.
- `src/content.ts`: zentrale Fachtexte und bestätigte Unternehmens-/Kontaktdaten; `src/tokens.css`: austauschbare Gestaltungswerte; `src/styles.css`: responsive Oberfläche und Fokuszustände.
- `index.html`: deutsche SEO-Metadaten, Open Graph und Schema.org nur mit bestätigten Angaben.
- `public/impressum.html`, `public/datenschutz.html`: Impressum mit bestätigten Anbieterdaten und Datenschutzentwurf; rechtliche Prüfung und Hostingangaben vor Veröffentlichung ausstehend.
- `docs/REFERENZEN.md`: Referenzzugriff, spätere Bochum-Auswertung und Gestaltungsentscheidungen.
- `public/brand/`: unbeschnittenes Original-Logo aus dem bereitgestellten Logo-PDF, für Webdarstellung optimiert.
- `docs/BRANDING.md`: Logoherkunft, Farbableitung, Datenquellen und Schutz der Angebotsinformationen.
- `docs/FREIGABEN.md`: Annahmen, ausstehende Angaben und Freigaben.
- `tests/browser.test.mjs`: Desktop-, Tablet-, Mobil-, Tastatur-, Formular-, Download- und Accessibility-Prüfungen.

## Kontaktformular: vollständig lokal

„Anfragepaket herunterladen“ erzeugt eine ZIP-Datei mit `Projektanfrage.txt` und den ausgewählten Unterlagen. Die einzigen hierfür notwendigen Laufzeitabhängigkeiten neben React sind die kleinen ZIP-Hilfen aus `fflate`. Kein Upload, Versand, Local Storage oder automatischer Mailversand. Es werden keine Formulardaten protokolliert. Maximal fünf Dateien, je 10 MB, insgesamt 20 MB. Akzeptiert werden PDF, DOC/DOCX, XLS/XLSX, DWG, DXF, GAEB X83/D83/P83 und ZIP. Es erfolgt keine Sicherheitsprüfung von Dateiinhalten; Empfänger müssen Unterlagen vor dem Öffnen wie andere eingehende Dokumente behandeln.

Nach dem Download erscheint „E-Mail-Entwurf öffnen“. Der Link öffnet das eigene E-Mail-Programm mit `info@sh-grundbau.de`, Projektbetreff und kurzen Eckdaten. Die ZIP-Datei muss manuell angehängt und die E-Mail selbst versendet werden. Die Website sendet nichts und verbindet keinen externen Formulardienst. Bei Änderungen am Formular wird der alte Entwurfslink entfernt, damit er nicht zu einem veralteten Anfragepaket führt. Ein echtes Backend benötigt eine gesonderte Freigabe.

## Entwurfsstatus

Das Original-Logo und die Unternehmens-/Kontaktangaben sind integriert. Die zwei dominanten Grüntöne des Logos bestimmen die Akzente. Ergänzende dunkle und helle Farben sind dokumentierte Gestaltungsentscheidungen; ein weiterer Styleguide liegt nicht vor. Es werden lokale Systemschrift-Fallbacks verwendet. Baustellenfotos fehlen weiterhin, deshalb bleibt die eigene schematische Grafik erhalten.

Das Angebot wird weder im öffentlichen Ordner noch im Projektarchiv veröffentlicht. Es wurden nur bestätigte Unternehmensangaben übernommen; keine Preise, Kunden-/Projektangaben, Bankdaten, internen Steuernummern oder Referenzbehauptungen.

Bochumer Grundbau wurde nach anfänglicher Netzsperre separat analysiert. Borken wurde im späteren Analyseschritt noch nicht geprüft. Alle Seiten bleiben absichtlich auf `noindex,nofollow`. Domain, Canonical, endgültige Social-Preview-Daten, Hosting und rechtliche Prüfung sind vor Veröffentlichung zu klären. Nichts wurde veröffentlicht und keine Domain oder externe Formularverbindung eingerichtet.
