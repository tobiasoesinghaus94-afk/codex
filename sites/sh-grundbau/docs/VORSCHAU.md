# Teilbare Vorschau über GitHub und Netlify

Diese Anleitung bereitet eine externe Bereitstellung vor. Es wurde weder ein Hostingkonto verbunden noch eine Website veröffentlicht.

## GitHub

Das eigenständige Webprojekt liegt im eingebundenen Repository unter `sites/sh-grundbau`. Die bestehenden Rust-/SDK-Dateien sind davon unabhängig. In einer normalen Codex-Codeaufgabe können die Änderungen geprüft und über einen Pull Request ins GitHub-Repository übernommen werden. Eine reine Umgebungseinrichtungsansicht bietet diese Aufgabe-/PR-Bedienung gegebenenfalls nicht; eine lokale Terminaladresse allein ist kein von außen erreichbarer Link.

## Netlify

1. Bei Netlify anmelden und ein bestehendes GitHub-Projekt importieren.
2. Das Repository und den Branch mit der Website auswählen. Den GitHub-Zugriff bewusst auf das benötigte Repository beschränken.
3. Als Basisverzeichnis `sites/sh-grundbau` einstellen.
4. Build-Befehl: `npm run build`. Veröffentlichungsverzeichnis, relativ zum Basisverzeichnis: `dist`.
5. Node-Version 24 einstellen; Node >=22.12 wird benötigt.
6. Erst nach ausdrücklicher Freigabe bereitstellen. Der Dienst erstellt eine `netlify.app`-Adresse; eine eigene Domain ist nicht erforderlich.

Eine normale Bereitstellung ist ohne zusätzliche Zugriffsbeschränkung öffentlich erreichbar. `noindex` verhindert keinen Zugriff. Vorher insbesondere Impressum, Datenschutz und Hostingangaben prüfen; für einen beschränkten Entwurf den vom gewählten Hostingtarif unterstützten Zugriffsschutz prüfen.

Es sind keine Formularschlüssel oder externen Formulardienste nötig. Anfragepakete werden weiterhin nur lokal erstellt. E-Mail-Entwürfe werden vom Besucher im eigenen E-Mail-Programm geöffnet und selbst versendet.
