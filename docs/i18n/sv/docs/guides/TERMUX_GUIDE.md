# Termux Headless Setup (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute kan köras som en headless-server på Android via Termux. Electron-skrivbordsappen stöds inte i Termux, men webbpanelen och det OpenAI-kompatibla API:et fungerar från den lokala webbläsaren eller från andra enheter i samma nätverk.

## Förutsättningar

Installera Termux från F-Droid eller GitHub-utgåvorna, uppdatera sedan paketen och installera de byggverktyg som krävs av systemspecifika beroenden som `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js-version:** OmniRoute kräver Node `>=22.22.2 <23 || >=24.0.0 <27` (motsvarar `engines` i `package.json` / `SUPPORTED_NODE_RANGE`). Termux `nodejs-lts` levererar vanligtvis Node 20 LTS, som **inte längre stöds** — installera `pkg install nodejs` (aktuell version) i stället och kontrollera att `node --version` visar en version i 22.x-/24.x+-serien.

Om kompileringen av systemspecifika paket misslyckas kör du kommandot `pkg install` ovan igen och försöker sedan installera OmniRoute på nytt.

## Installation

Kör det senast publicerade paketet direkt:

```bash
npx -y omniroute@latest
```

Du kan även installera det globalt:

```bash
npm install -g omniroute
omniroute
```

## Körning

Starta OmniRoute i headless-serverläge:

```bash
omniroute
```

eller:

```bash
npx omniroute
```

Kontrollpanelen är tillgänglig på:

```text
http://localhost:20128
```

Öppna den URL:en i Android-webbläsaren. Om du kör klienter inuti Termux använder du samma värd och port som bas-URL för det OpenAI-kompatibla API:et.

## Bakgrundskörning

För en enkel bakgrundsprocess:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Så här stoppar du den:

```bash
pkill -f omniroute
```

För automatisk start efter att enheten har startats installerar du tillägget Termux:Boot och skapar ett startskript:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Androids batterioptimering kan stoppa långvariga bakgrundsprocesser. Inaktivera batterioptimering för Termux om servern förväntas förbli online.

## Åtkomst från andra enheter

Ta reda på telefonens IP-adress i WiFi-nätverket:

```bash
ip addr show wlan0
```

Öppna sedan kontrollpanelen från en annan enhet:

```text
http://PHONE_IP:20128
```

Till exempel:

```text
http://192.168.1.50:20128
```

Se till att telefonen och klienten finns i samma betrodda nätverk. Om du exponerar OmniRoute utanför telefonen ska du aktivera API-nycklar och autentisering för kontrollpanelen.

## Datakatalog

Som standard lagrar OmniRoute data under Termux hemkatalog och följer samma beteende för datasökvägar på serversidan som används i Linux. Så här placerar du databasen på en uttryckligen angiven plats:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Begränsningar

- Electron körs inte i Termux.
- Det finns inget systemfält eller någon skrivbordsintegration.
- Den här konfigurationen är endast avsedd för serverdrift: använd kontrollpanelen i webbläsaren.
- Systemspecifika beroenden kan behöva kompileras lokalt.
- Android-enheter med lite minne kan behöva hantera färre samtidiga förfrågningar.
- Funktioner för MITM/systemcertifikat kan kräva ändringar av Androids betrodda certifikatarkiv utanför Termux.

## Felsökning

### Plattformen stöds inte: android (varje förfrågan returnerar HTTP 500)

**Symptom:** `omniroute` / `omniroute serve` skriver ut `✔ OmniRoute is running!`, men varje förfrågan till kontrollpanelen eller API:et returnerar en enkel `500 Internal Server Error`. `~/.omniroute/logs/application/app.log` förblir tom, `APP_LOG_LEVEL=debug` skriver inte ut något användbart och svarstexten är ren text (`Internal Server Error`) utan JSON-detaljer.

**Orsak:** Vissa Termux-/Node-versioner rapporterar `process.platform === "android"`. Next.js `getCacheDirectory()` hanterar inte den plattformen: funktionen kräver att `~/.cache` (eller en allmän tmp-katalog) _redan_ finns, annars misslyckas den när instrumenteringshooken läses in med:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Eftersom hooken aldrig läses in startar loggningen aldrig — 500-felet ser därför helt omöjligt ut att diagnostisera. OmniRoute skapar `~/.cache` (och ställer in `XDG_CACHE_HOME` när variabeln inte redan är angiven) i CLI-startpunkten innan Next.js startar, så att den här kontrollen lyckas på Android/Termux.

**Lösning som stöds (utan att korrigera paketet):**

```bash
mkdir -p ~/.cache
omniroute serve
```

I aktuella OmniRoute-versioner gör CLI:t detta automatiskt på Android/Termux — en ny `npx -y omniroute@latest`-/global installation bör inte kräva det manuella steget. Om felet fortfarande visas efter uppgraderingen skapar du `~/.cache` en gång enligt ovan och startar om.

Korrigera **inte** `dist/server.js` för att tvinga `process.platform = "linux"`. Den typen av paketkorrigering skrivs över vid varje ominstallation/uppgradering och behövs inte när cachekatalogen väl finns.

### Kompileringsfel för better-sqlite3

Installera Termux byggverktygskedja:

```bash
pkg install nodejs python build-essential
```

Kör sedan igen:

```bash
npx -y omniroute@latest
```

### Porten används redan

Kontrollera vad som lyssnar på standardporten:

```bash
ss -ltnp | grep 20128
```

Stoppa den gamla processen:

```bash
pkill -f omniroute
```

### Kontrollpanelen kan inte nås från en annan enhet

Kontrollera att båda enheterna är anslutna till samma WiFi-nätverk och testa sedan från Termux:

```bash
curl http://localhost:20128
```

Om lokal åtkomst fungerar men LAN-åtkomst inte gör det kontrollerar du isoleringsinställningarna för Androids hotspot/WiFi samt eventuella brandväggs- eller VPN-profiler på telefonen.
