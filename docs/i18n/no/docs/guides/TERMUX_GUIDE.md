# Termux Headless Setup (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute kan kjøre som en server uten grafisk grensesnitt på Android gjennom Termux. Electron-skrivebordsappen støttes ikke i Termux, men nettkontrollpanelet og det OpenAI-kompatible API-et fungerer fra den lokale nettleseren eller fra andre enheter på samme nettverk.

## Forutsetninger

Installer Termux fra F-Droid eller GitHub-utgivelser, oppdater deretter pakkene og installer byggeverktøyene som kreves av innebygde avhengigheter som `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js-versjon:** OmniRoute krever Node `>=22.22.2 <23 || >=24.0.0 <27` (samsvarer med `engines` i `package.json` / `SUPPORTED_NODE_RANGE`). Termux sin `nodejs-lts` leveres vanligvis med Node 20 LTS, som **ikke lenger støttes** — installer `pkg install nodejs` (gjeldende versjon) i stedet, og kontroller at `node --version` viser en 22.x-/24.x+-versjon.

Hvis kompilering av innebygde pakker mislykkes, kjører du `pkg install`-kommandoen ovenfor på nytt og prøver deretter å installere OmniRoute igjen.

## Installasjon

Kjør den sist publiserte pakken direkte:

```bash
npx -y omniroute@latest
```

Du kan også installere den globalt:

```bash
npm install -g omniroute
omniroute
```

## Kjøring

Start OmniRoute i servermodus uten grafisk grensesnitt:

```bash
omniroute
```

eller:

```bash
npx omniroute
```

Kontrollpanelet lytter på:

```text
http://localhost:20128
```

Åpne denne URL-en i Android-nettleseren. Hvis du kjører klienter inne i Termux, bruker du samme vert og port som basis-URL for det OpenAI-kompatible API-et.

## Bakgrunnskjøring

For en enkel bakgrunnsprosess:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Slik stopper du den:

```bash
pkill -f omniroute
```

For automatisk oppstart etter at enheten har startet, installerer du tillegget Termux:Boot og oppretter et oppstartsskript:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Androids batterioptimalisering kan stoppe bakgrunnsprosesser som kjører over lengre tid. Deaktiver batterioptimalisering for Termux hvis serveren skal forbli tilgjengelig.

## Tilgang fra andre enheter

Finn telefonens IP-adresse på WiFi-nettverket:

```bash
ip addr show wlan0
```

Åpne deretter kontrollpanelet fra en annen enhet:

```text
http://PHONE_IP:20128
```

For eksempel:

```text
http://192.168.1.50:20128
```

Hold telefonen og klienten på det samme klarerte nettverket. Hvis du eksponerer OmniRoute utenfor telefonen, må du aktivere API-nøkler og autentisering for kontrollpanelet.

## Datamappe

Som standard lagrer OmniRoute data under Termux-hjemmemappen, med samme virkemåte for databaner på serversiden som brukes på Linux. Slik plasserer du databasen på en eksplisitt angitt plassering:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Begrensninger

- Electron kjører ikke i Termux.
- Det finnes ingen systemstatusfelt- eller skrivebordsintegrasjon.
- Dette oppsettet er kun for serverbruk: bruk kontrollpanelet i nettleseren.
- Innebygde avhengigheter kan kreve lokal kompilering.
- Android-enheter med lite minne kan trenge færre samtidige forespørsler.
- Funksjoner for MITM-/systemsertifikater kan kreve arbeid med klareringslageret på Android-nivå utenfor Termux.

## Feilsøking

### Plattformen android støttes ikke (alle forespørsler returnerer HTTP 500)

**Symptom:** `omniroute` / `omniroute serve` skriver ut `✔ OmniRoute is running!`, men hver forespørsel til kontrollpanelet eller API-et returnerer en enkel `500 Internal Server Error`. `~/.omniroute/logs/application/app.log` forblir tom, `APP_LOG_LEVEL=debug` skriver ikke ut noe nyttig, og svarinnholdet er ren tekst (`Internal Server Error`) uten JSON-detaljer.

**Årsak:** Enkelte Termux-/Node-bygg rapporterer `process.platform === "android"`. Next.js `getCacheDirectory()` håndterer ikke denne plattformen: den krever at `~/.cache` (eller en generell midlertidig mappe) _allerede_ finnes, ellers oppstår det en feil under innlasting av instrumenteringshooken med:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Fordi hooken aldri lastes inn, starter aldri loggingen — 500-feilen ser derfor helt umulig ut å diagnostisere. OmniRoute oppretter `~/.cache` (og angir `XDG_CACHE_HOME` når den ikke allerede er angitt) i CLI-startpunktet før Next.js starter, slik at denne kontrollen lykkes på Android/Termux.

**Støttet løsning (uten endring av pakken):**

```bash
mkdir -p ~/.cache
omniroute serve
```

I gjeldende OmniRoute-bygg gjør CLI-et dette automatisk på Android/Termux — en ny `npx -y omniroute@latest` / global installasjon skal ikke kreve det manuelle trinnet. Hvis feilen fortsatt oppstår etter oppgradering, oppretter du `~/.cache` én gang som vist ovenfor og starter på nytt.

**Ikke** endre `dist/server.js` for å tvinge `process.platform = "linux"`. Denne typen pakkeendring overskrives ved hver nye installasjon/oppgradering og er unødvendig når hurtigbuffermappen finnes.

### Byggefeil for better-sqlite3

Installer byggeverktøykjeden for Termux:

```bash
pkg install nodejs python build-essential
```

Kjør deretter på nytt:

```bash
npx -y omniroute@latest
```

### Porten er allerede i bruk

Kontroller hva som lytter på standardporten:

```bash
ss -ltnp | grep 20128
```

Stopp den gamle prosessen:

```bash
pkill -f omniroute
```

### Kontrollpanelet kan ikke nås fra en annen enhet

Kontroller at begge enhetene er på samme WiFi-nettverk, og test deretter fra Termux:

```bash
curl http://localhost:20128
```

Hvis lokal tilgang fungerer, men LAN-tilgang ikke gjør det, kontrollerer du isolasjon for Android-tilgangspunkt/WiFi samt eventuelle brannmur- eller VPN-profiler på telefonen.
