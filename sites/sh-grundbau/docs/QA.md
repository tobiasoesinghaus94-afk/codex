# Qualitätsprüfung

Stand: 22. Oktober 2026. Geprüft mit Node.js 24.19.0 und lokalem Chromium. Kein Deployment durchgeführt.

## Erfolgreich ausgeführt

| Prüfung                                           | Ergebnis                                                                                                                                                                                   |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Installation aus Lockdatei: `npm ci`              | Erfolgreich                                                                                                                                                                                |
| ESLint: `npm run lint`                            | Keine Fehler oder Lint-Warnungen                                                                                                                                                           |
| TypeScript und Produktions-Build: `npm run build` | Erfolgreich                                                                                                                                                                                |
| Browserprüfungen: `npm test`                      | 4 Testgruppen bestanden, keine fehlgeschlagenen oder übersprungenen Gruppen                                                                                                                |
| Layout bei 320, 390, 768, 1024 und 1440 px        | Kein horizontaler Überlauf; Screenshots erzeugt                                                                                                                                            |
| Desktop und mobile Darstellung                    | Screenshots visuell geprüft; eigenes schematisches Motiv, keine Baustellen- oder Fremdfotos                                                                                                |
| Navigation / Sprungmarken / Leistungs-CTA         | Ziele vorhanden, mobile Navigation schließt, Leistung wird im Formular vorausgewählt                                                                                                       |
| Tastatur                                          | Skip-Link, native Formularbedienung, Escape schließt mobiles Menü und setzt Fokus zurück                                                                                                   |
| Pflichtfelder / E-Mail / Datenschutzbestätigung   | Native Validierung geprüft; reine Leerzeichen zusätzlich abgefangen                                                                                                                        |
| Anhänge                                           | Unerlaubte Endung, mehr als 5 Dateien, einzelne Datei über 10 MB und Gesamtgröße über 20 MB abgefangen                                                                                     |
| ZIP-Download                                      | Archiv geöffnet; Name, gewählte Leistung und tatsächlicher Inhalt der Testdatei geprüft                                                                                                    |
| Versandverhalten                                  | Kein Upload oder Versand durch die Website; lokaler E-Mail-Entwurf an info@sh-grundbau.de geprüft, ZIP muss manuell angehängt werden; nach Formularänderung wird der alte Entwurf entfernt |
| Original-Logo und Firmendaten                     | Logo lädt; Ansprechpartner-Mails, Telefon, Schema.org und Register-/USt-ID-Angaben geprüft. Keine PDF-Dokumente im Produktions-Build                                                       |
| Automatische Barrierefreiheit                     | axe-core: keine Verstöße gegen die geprüften WCAG-2-A/AA- und 2.1-A/AA-Regeln am Desktop und im geöffneten mobilen Menü; Rechtsseiten ebenfalls geprüft                                    |
| Links / Rechtsseiten                              | Impressum und Datenschutz erreichbar; alle internen Sprungziele vorhanden                                                                                                                  |
| Firmenabgrenzung                                  | Klare rechtliche Abgrenzung; keine Verlinkung zur S+H Spezialtiefbau GmbH                                                                                                                  |
| Browserkonsole / Netz                             | Keine Konsolenfehler; keine externen Ressourcenaufrufe                                                                                                                                     |
| SEO                                               | Eine H1, deutsche Sprache, individuelle Metadaten, Open Graph, bestätigte Angaben in Schema.org; absichtlich `noindex,nofollow`                                                            |
| Inhalte / Nutzungsrechte                          | Fachtexte gegen Auftragsprofil geprüft; keine fremden Bilder, Referenzen, Kennzahlen, Zertifikate oder Kontaktdaten übernommen                                                             |

Screenshots und Test-ZIP werden lokal unter `test-results/` erzeugt. Die Testbezeichnung „4 Gruppen“ umfasst mehrere konkrete Prüfungen, nicht vier einzelne UI-Aktionen.

## Ladeverhalten

Der Produktions-Build nach Brandingintegration umfasst ca. 82,17 kB gzip JavaScript und 5,12 kB gzip CSS. Die 640-Pixel-Version des Logo-WebP ist ca. 42 kB groß, die 1280-Pixel-Version ca. 117 kB. Header und Footer nutzen dieselbe zwischenspeicherbare Bilddatei; das Original-Seitenverhältnis bleibt erhalten. Keine externen Fonts oder Baustellenfotos.

Ein lokaler Chromium-Messlauf mit warmem Browsercache ohne Netzwerk-/CPU-Drosselung ergab 30 ms bis DOMContentLoaded/Load. Die genauen Werte des aktuellen Laufs stehen unter `test-results/performance.json`. Diese lokale Cache-Messung ist keine Aussage über reale Mobilnetze, spätere Hosting-Latenz oder veröffentlichte Core Web Vitals.

## Grenzen und offene Arbeit

- Bochumer Grundbau wurde nach der anfänglichen Netzsperre separat geprüft; Borken und die fehlende dritte URL bleiben offen. Details in `REFERENZEN.md`.
- Logo, Grüntöne, Unternehmens- und Kontaktangaben sind integriert. Baustellenbilder und ein zusätzlicher Schrift-/Styleguide liegen nicht vor; die Systemschriften bleiben dokumentierte Fallbacks.
- Das Impressum enthält die bestätigten Anbieterdaten und benötigt vor Veröffentlichung eine rechtliche Vollständigkeitsprüfung. Der Datenschutzentwurf benötigt zusätzlich die tatsächlichen Hosting-/Verarbeitungsangaben.
- Automatische Barrierefreiheitsprüfung und visuelle Kontrolle sind keine vollständige Konformitätszertifizierung; Screenreader-, reale iOS-/Android- und Safari-/Firefox-Prüfung wurden nicht durchgeführt.
- Der Formularablauf arbeitet absichtlich lokal. Der Empfänger info@sh-grundbau.de ist bestätigt, es gibt jedoch keinen Server-Versandendpunkt. Der Mail-Link wurde ohne tatsächliches Absenden geprüft.
- Keine Domain geändert, kein externer Formulardienst verbunden, keine Website veröffentlicht.
- Die bestehenden Rust-/SDK-Dateien bleiben unverändert; die Website ist als eigenständiges Unterprojekt unter `sites/sh-grundbau` abgelegt.

- Das vertrauliche Angebot bleibt außerhalb des Projektordners. Nur die optimierten Logo-Bilder werden als neue öffentliche Assets ausgeliefert. Preise, Kunden-/Projektangaben, Bankdaten und interne Steuernummern wurden nicht übernommen.
