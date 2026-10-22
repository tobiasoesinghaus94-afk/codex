# Website unter Windows öffnen und mit Codex bearbeiten

## Sofort ansehen

1. Den Website-Branch auf GitHub als ZIP herunterladen und über „Alle extrahieren“ vollständig entpacken.
2. Im entpackten Repository den Ordner `sites`, darin `sh-grundbau` öffnen.
3. `vorschau.html` per Doppelklick im Browser öffnen. Bei Bedarf über „Öffnen mit“ Microsoft Edge, Chrome oder Firefox auswählen.

Die einzelne HTML-Datei enthält Logo, Gestaltung und JavaScript bereits. Sie benötigt keinen lokalen Webserver. Sie ist eine Momentaufnahme des Entwurfs; spätere Änderungen an den Quelldateien erscheinen darin nicht automatisch. Die Rechtsseiten werden innerhalb dieser Vorschau als Dialog geöffnet. Es erfolgt keine externe Veröffentlichung.

## Für die laufende Weiterentwicklung

1. VS Code von https://code.visualstudio.com/ installieren.
2. Node.js 24 LTS von https://nodejs.org/ installieren. VS Code danach vollständig schließen und neu öffnen, damit Node und npm gefunden werden.
3. In VS Code mit `Strg + Umschalt + X` die Erweiterungen öffnen. Die offizielle Codex-Erweiterung von OpenAI installieren und mit dem ChatGPT-Konto anmelden.
4. In VS Code über „Datei > Ordner öffnen“ genau den entpackten Ordner `sites/sh-grundbau` auswählen.
5. Über „Terminal > Neues Terminal“ ein Terminal im Projektordner öffnen und nacheinander ausführen:

```powershell
node --version
npm.cmd ci
npm.cmd run dev
```

`npm.cmd` funktioniert auch dann, wenn PowerShell die Ausführung von `npm.ps1` durch ihre Skriptrichtlinie blockiert. Eine Änderung der Windows-Sicherheitsrichtlinie ist dafür nicht erforderlich.

6. Die vom Terminal angezeigte lokale Adresse, üblicherweise `http://localhost:5173`, auf demselben Windows-Rechner im Browser öffnen. Falls der Port belegt ist, die tatsächlich ausgegebene Adresse verwenden.
7. Das Terminal weiterlaufen lassen. Änderungen an den Quelldateien werden im Browser automatisch angezeigt. Mit `Strg + C` lässt sich der Entwicklungsserver beenden.

## Auftrag an Codex in VS Code

> Arbeite in diesem S+H-Grundbau-Projekt. Lies zuerst README.md und docs/BRANDING.md. Behalte die bestätigten Unternehmensdaten und die Abgrenzung zur S+H Spezialtiefbau GmbH bei. Verwende keine vertraulichen Angebotsdaten. Veröffentliche nichts ohne Freigabe. Starte bei Bedarf die Vite-Vorschau und setze meine gewünschten Änderungen um.

Die Dokumente unter `docs/` enthalten die Datenherkunft, den bisherigen Prüfstand und die noch offenen Veröffentlichungsfreigaben.

## Wichtige Unterscheidungen

- `vorschau.html`: sofort sichtbare, eigenständige Momentaufnahme.
- `src/`, `public/` und `index.html`: bearbeitbare Website-Quelldateien.
- `npm.cmd run dev`: laufende Vorschau mit automatischen Aktualisierungen.
- `npm.cmd run build`: erzeugt die Dateien für eine spätere Bereitstellung unter `dist/`.

Die Anfragefunktion erzeugt ein lokales ZIP-Paket. Ein E-Mail-Link öffnet danach einen Entwurf an info@sh-grundbau.de. Die ZIP-Datei muss manuell angehängt und die E-Mail selbst versendet werden. Die Website versendet keine Nachrichten.

## Prüfung

```powershell
npm.cmd run lint
npm.cmd run build
npx.cmd playwright install chromium
npm.cmd test
```

Die Browserprüfungen benötigen einen zuvor gebauten `dist/`-Ordner und einen verfügbaren Chromium-Browser. Die erfolgreiche Cloud-Prüfung ist dokumentiert; eine Ausführung auf dem eigenen Windows-Rechner ist davon getrennt.
