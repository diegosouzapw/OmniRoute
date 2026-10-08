# Termux Headless Setup (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute kan køre som en headless-server på Android via Termux. Electron-desktopappen understøttes ikke i Termux, men webdashboardet og den OpenAI-kompatible API fungerer fra den lokale browser eller fra andre enheder på samme netværk.

## Forudsætninger

Installer Termux fra F-Droid eller GitHub-udgivelser, opdater derefter pakkerne, og installer de byggeværktøjer, som kræves af native afhængigheder såsom `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js-version:** OmniRoute kræver Node `>=22.22.2 <23 || >=24.0.0 <27` (svarer til `engines` i `package.json` / `SUPPORTED_NODE_RANGE`). Termux' `nodejs-lts` leverer typisk Node 20 LTS, som **ikke længere understøttes** — installer i stedet `pkg install nodejs` (den aktuelle version), og kontrollér, at `node --version` viser en version i 22.x-/24.x+-serien.

Hvis kompilering af native pakker mislykkes, skal du køre kommandoen `pkg install` ovenfor igen og derefter prøve at installere OmniRoute på ny.

## Installation

Kør den senest udgivne pakke direkte:

```bash
npx -y omniroute@latest
```

Du kan også installere den globalt:

```bash
npm install -g omniroute
omniroute
```

## Kørsel

Start OmniRoute i headless-servertilstand:

```bash
omniroute
```

eller:

```bash
npx omniroute
```

Dashboardet lytter på:

```text
http://localhost:20128
```

Åbn denne URL i Android-browseren. Hvis du kører klienter inde i Termux, skal du bruge samme vært og port som basis-URL for den OpenAI-kompatible API.

## Kørsel i baggrunden

Til en enkel baggrundsproces:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Sådan stoppes den:

```bash
pkill -f omniroute
```

For automatisk opstart, efter at enheden er startet, skal du installere tilføjelsesprogrammet Termux:Boot og oprette et opstartsscript:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Androids batterioptimering kan stoppe baggrundsprocesser, der kører i længere tid. Deaktiver batterioptimering for Termux, hvis serveren forventes at forblive online.

## Adgang fra andre enheder

Find telefonens IP-adresse på WiFi-netværket:

```bash
ip addr show wlan0
```

Åbn derefter dashboardet fra en anden enhed:

```text
http://PHONE_IP:20128
```

For eksempel:

```text
http://192.168.1.50:20128
```

Hold telefonen og klienten på det samme betroede netværk. Hvis du gør OmniRoute tilgængelig uden for telefonen, skal du aktivere API-nøgler og godkendelse til dashboardet.

## Datamappe

Som standard gemmer OmniRoute data under Termux-hjemmemappen efter samme adfærd for serverens datasti som på Linux. Sådan placeres databasen et bestemt sted:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Begrænsninger

- Electron kører ikke i Termux.
- Der er ingen systembakke eller desktopintegration.
- Denne opsætning er kun til serverbrug: Brug browserdashboardet.
- Native afhængigheder kan kræve lokal kompilering.
- Android-enheder med begrænset hukommelse kan have behov for færre samtidige anmodninger.
- Funktioner til MITM-/systemcertifikater kan kræve arbejde med Androids tillidslager uden for Termux.

## Fejlfinding

### Ikke-understøttet platform: android (alle anmodninger returnerer HTTP 500)

**Symptom:** `omniroute` / `omniroute serve` skriver `✔ OmniRoute is running!`, men hver anmodning til dashboardet eller API'en returnerer en simpel `500 Internal Server Error`. `~/.omniroute/logs/application/app.log` forbliver tom, `APP_LOG_LEVEL=debug` skriver ikke noget brugbart, og svarteksten er almindelig tekst (`Internal Server Error`) uden JSON-detaljer.

**Årsag:** Nogle Termux-/Node-builds rapporterer `process.platform === "android"`. Next.js' `getCacheDirectory()` håndterer ikke denne platform: Den kræver, at `~/.cache` (eller en generisk midlertidig mappe) _allerede_ findes, ellers opstår der en fejl under indlæsning af instrumentation-hooket med:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Fordi hooket aldrig indlæses, starter logningen aldrig — 500-fejlen ser derfor helt umulig ud at diagnosticere. OmniRoute opretter `~/.cache` (og angiver `XDG_CACHE_HOME`, når den ikke er angivet) i CLI-indgangspunktet, før Next.js starter, så denne kontrol lykkes på Android/Termux.

**Understøttet løsning (uden ændring af pakken):**

```bash
mkdir -p ~/.cache
omniroute serve
```

I aktuelle OmniRoute-builds gør CLI'en dette automatisk på Android/Termux — en ny `npx -y omniroute@latest` / global installation bør ikke kræve det manuelle trin. Hvis fejlen stadig vises efter opgradering, skal du oprette `~/.cache` én gang som ovenfor og genstarte.

Du må **ikke** ændre `dist/server.js` for at gennemtvinge `process.platform = "linux"`. Den slags pakkeændring overskrives ved hver geninstallation/opgradering og er unødvendig, når cachemappen findes.

### Buildfejl med better-sqlite3

Installer Termux-værktøjskæden til builds:

```bash
pkg install nodejs python build-essential
```

Kør derefter igen:

```bash
npx -y omniroute@latest
```

### Porten er allerede i brug

Kontrollér, hvad der lytter på standardporten:

```bash
ss -ltnp | grep 20128
```

Stop den gamle proces:

```bash
pkill -f omniroute
```

### Dashboardet kan ikke tilgås fra en anden enhed

Kontrollér, at begge enheder er på det samme WiFi-netværk, og test derefter fra Termux:

```bash
curl http://localhost:20128
```

Hvis lokal adgang fungerer, men LAN-adgang ikke gør, skal du kontrollere hotspot-/WiFi-isolation i Android samt eventuelle firewall- eller VPN-profiler på telefonen.
