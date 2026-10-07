# Termux Headless Setup (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute kann über Termux als Headless-Server unter Android ausgeführt werden. Die Electron-Desktop-App wird in Termux nicht unterstützt, aber das Web-Dashboard und die OpenAI-kompatible API funktionieren im lokalen Browser oder auf anderen Geräten im selben Netzwerk.

## Voraussetzungen

Installieren Sie Termux über F-Droid oder die GitHub-Releases. Aktualisieren Sie anschließend die Pakete und installieren Sie die Build-Werkzeuge, die für native Abhängigkeiten wie `better-sqlite3` erforderlich sind.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js-Version:** OmniRoute erfordert Node `>=22.22.2 <23 || >=24.0.0 <27` (entspricht `engines` in `package.json` / `SUPPORTED_NODE_RANGE`). Das Termux-Paket `nodejs-lts` enthält üblicherweise Node 20 LTS, das **nicht mehr unterstützt wird** — installieren Sie stattdessen die aktuelle Version mit `pkg install nodejs` und überprüfen Sie, ob `node --version` eine Version der Reihe 22.x/24.x oder höher meldet.

Falls die Kompilierung nativer Pakete fehlschlägt, führen Sie den obigen Befehl `pkg install` erneut aus und versuchen Sie anschließend noch einmal, OmniRoute zu installieren.

## Installation

Führen Sie das neueste veröffentlichte Paket direkt aus:

```bash
npx -y omniroute@latest
```

Sie können es auch global installieren:

```bash
npm install -g omniroute
omniroute
```

## Ausführung

Starten Sie OmniRoute im Headless-Servermodus:

```bash
omniroute
```

oder:

```bash
npx omniroute
```

Das Dashboard ist unter folgender Adresse erreichbar:

```text
http://localhost:20128
```

Öffnen Sie diese URL im Android-Browser. Wenn Sie Clients innerhalb von Termux ausführen, verwenden Sie denselben Host und Port als OpenAI-kompatible Basis-URL.

## Ausführung im Hintergrund

Für einen einfachen Hintergrundprozess:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

So beenden Sie ihn:

```bash
pkill -f omniroute
```

Um OmniRoute nach dem Start des Geräts automatisch auszuführen, installieren Sie das Add-on Termux:Boot und erstellen Sie ein Boot-Skript:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Die Android-Akkuoptimierung kann lang laufende Hintergrundprozesse beenden. Deaktivieren Sie die Akkuoptimierung für Termux, wenn der Server dauerhaft online bleiben soll.

## Zugriff von anderen Geräten

Ermitteln Sie die IP-Adresse des Smartphones im WLAN:

```bash
ip addr show wlan0
```

Öffnen Sie anschließend das Dashboard auf einem anderen Gerät:

```text
http://PHONE_IP:20128
```

Zum Beispiel:

```text
http://192.168.1.50:20128
```

Das Smartphone und der Client müssen sich im selben vertrauenswürdigen Netzwerk befinden. Wenn Sie OmniRoute außerhalb des Smartphones zugänglich machen, aktivieren Sie API-Schlüssel und die Dashboard-Authentifizierung.

## Datenverzeichnis

Standardmäßig speichert OmniRoute Daten im Termux-Home-Verzeichnis und verwendet dabei dasselbe serverseitige Datenpfadverhalten wie unter Linux. Um die Datenbank an einem explizit festgelegten Ort zu speichern:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Einschränkungen

- Electron kann nicht in Termux ausgeführt werden.
- Es gibt keine Taskleisten- oder Desktop-Integration.
- Diese Einrichtung ist ausschließlich für den Serverbetrieb vorgesehen: Verwenden Sie das Browser-Dashboard.
- Native Abhängigkeiten müssen möglicherweise lokal kompiliert werden.
- Auf Android-Geräten mit wenig Arbeitsspeicher sollten möglicherweise weniger Anfragen gleichzeitig verarbeitet werden.
- MITM- und Systemzertifikatfunktionen erfordern möglicherweise Anpassungen am Android-Vertrauensspeicher außerhalb von Termux.

## Fehlerbehebung

### Nicht unterstützte Plattform: android (jede Anfrage gibt HTTP 500 zurück)

**Symptom:** `omniroute` / `omniroute serve` gibt `✔ OmniRoute is running!` aus, aber jede Dashboard- oder API-Anfrage gibt lediglich `500 Internal Server Error` zurück. `~/.omniroute/logs/application/app.log` bleibt leer, `APP_LOG_LEVEL=debug` gibt keine hilfreichen Informationen aus und der Antworttext ist reiner Text (`Internal Server Error`) ohne JSON-Details.

**Ursache:** Einige Termux-/Node-Builds melden `process.platform === "android"`. `getCacheDirectory()` von Next.js unterstützt diese Plattform nicht: `~/.cache` (oder ein generisches temporäres Verzeichnis) muss _bereits_ vorhanden sein, da andernfalls beim Laden des Instrumentierungs-Hooks folgender Fehler auftritt:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Da der Hook nie geladen wird, startet auch die Protokollierung nicht — dadurch wirkt der Fehler 500 völlig undiagnostizierbar. OmniRoute erstellt `~/.cache` im CLI-Einstiegspunkt, bevor Next.js gestartet wird (und setzt `XDG_CACHE_HOME`, falls die Variable noch nicht gesetzt ist), damit diese Prüfung unter Android/Termux erfolgreich ist.

**Unterstützte Lösung (ohne Änderung des Pakets):**

```bash
mkdir -p ~/.cache
omniroute serve
```

In aktuellen OmniRoute-Builds erledigt die CLI dies unter Android/Termux automatisch — bei einer frischen Installation mit `npx -y omniroute@latest` oder einer globalen Installation sollte dieser manuelle Schritt nicht erforderlich sein. Wenn der Fehler nach einem Upgrade weiterhin auftritt, erstellen Sie `~/.cache` einmalig wie oben beschrieben und starten Sie OmniRoute neu.

Ändern Sie **nicht** `dist/server.js`, um `process.platform = "linux"` zu erzwingen. Eine solche Paketänderung wird bei jeder Neuinstallation bzw. jedem Upgrade überschrieben und ist nicht erforderlich, sobald das Cache-Verzeichnis vorhanden ist.

### Build-Fehler bei better-sqlite3

Installieren Sie die Termux-Build-Toolchain:

```bash
pkg install nodejs python build-essential
```

Führen Sie anschließend erneut Folgendes aus:

```bash
npx -y omniroute@latest
```

### Port wird bereits verwendet

Überprüfen Sie, welcher Prozess den Standardport verwendet:

```bash
ss -ltnp | grep 20128
```

Beenden Sie den alten Prozess:

```bash
pkill -f omniroute
```

### Dashboard ist von einem anderen Gerät nicht erreichbar

Stellen Sie sicher, dass sich beide Geräte im selben WLAN befinden, und testen Sie den Zugriff anschließend über Termux:

```bash
curl http://localhost:20128
```

Wenn der lokale Zugriff funktioniert, der Zugriff über das LAN jedoch nicht, überprüfen Sie die Hotspot-/WLAN-Isolation von Android sowie alle Firewall- oder VPN-Profile auf dem Smartphone.
