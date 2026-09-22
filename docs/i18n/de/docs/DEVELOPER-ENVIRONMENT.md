# Developer environment notes (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

Diese Seite erläutert das lokale Verhalten der `.env`-Datei des Projekts sowie den Umgang mit Umgebungsdateien und Geheimnissen bei der Entwicklung von OmniRoute.

## `.env`-Verhalten bei `postinstall`

Das Projekt kann während `npm install` / `postinstall` zur Vereinfachung der Entwicklung eine lokale `.env`-Datei erzeugen. Diese Datei ist ausschließlich für die lokale Entwicklung und für Tests vorgesehen und darf niemals in die Versionsverwaltung eingecheckt werden.

Wichtige Punkte:

- Die `.gitignore`-Datei des Repositorys ignoriert bereits `.env*`-Dateien (siehe den entsprechenden Eintrag in `.gitignore`). Entfernen oder ändern Sie diese Regel nur, wenn Sie bewusst eine bestimmte Beispieldatei einchecken möchten und dafür über einen dokumentierten Prozess verfügen.
- Wenn ein echtes Geheimnis versehentlich in das Repository eingecheckt wurde, rotieren bzw. widerrufen Sie die Zugangsdaten umgehend und entfernen Sie sie aus dem Repository-Verlauf (beispielsweise mit `git filter-repo` oder einem vergleichbaren Bereinigungsverfahren). Wenden Sie sich an die für Sicherheit zuständige Kontaktperson, wenn Sie Hilfe benötigen.
- Verwenden Sie für CI und Produktion CI-Geheimnisse oder eine Geheimnisverwaltung (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault usw.), anstatt Geheimnisse in Dateien einzuchecken.

## Empfohlener lokaler Arbeitsablauf

- Bewahren Sie `.env` ausschließlich in Ihrem lokalen Arbeitsbereich auf. Verwenden Sie `.env.example` (bereits versioniert), um erforderliche Variablen und zulässige Beispielwerte zu dokumentieren.
- Wenn Sie lokal Tests ausführen, die geheimnisähnliche Werte erfordern, verwenden Sie vorzugsweise synthetische Platzhalter oder zur Laufzeit erzeugte kurzlebige Schlüssel anstelle echter Zugangsdaten.
- Fügen Sie Tests, die Platzhalter verwenden, einen kurzen Kommentar hinzu, damit Reviewer erkennen können, dass es sich um synthetische Testdaten handelt.

## Hinweise zu Scannern

- Einige kompilierte oder binäre Ressourcen (z. B. eingebettete Base64-WASM-Blobs) können ASCII-Teilzeichenfolgen enthalten, die wie Zugangsdaten aussehen und textbasierte Geheimnis-Scanner auslösen können. Wenn diese Ressourcen legitim sind, nehmen Sie sie entweder in die Zulassungsliste des Scanners auf oder schließen Sie die entsprechenden Verzeichnisse in der Scanner-Konfiguration aus.

## Wenn Sie ein Leck entdecken

1. Rotieren bzw. widerrufen Sie den Schlüssel umgehend.
2. Entfernen Sie das Geheimnis aus dem Verlauf und führen Sie bei Bedarf einen erzwungenen Push des bereinigten Branches durch.
3. Benachrichtigen Sie die Maintainer und befolgen Sie die Checkliste Ihrer Organisation zur Reaktion auf Sicherheitsvorfälle.
