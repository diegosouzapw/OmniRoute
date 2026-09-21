# Termux Headless Setup (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute saab Androidis Termuxi kaudu töötada ilma graafilise kasutajaliideseta serverina. Electroni töölauarakendust Termuxis ei toetata, kuid veebipõhine juhtpaneel ja OpenAI-ga ühilduv API töötavad kohalikus brauseris või teistes samas võrgus olevates seadmetes.

## Eeltingimused

Installige Termux F-Droidist või GitHubi väljalasetest, seejärel värskendage pakette ja installige natiivsete sõltuvuste, näiteks `better-sqlite3`, jaoks vajalikud koostamistööriistad.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js-i versioon:** OmniRoute nõuab Node'i versiooni `>=22.22.2 <23 || >=24.0.0 <27` (vastab väärtustele `engines` failis `package.json` / `SUPPORTED_NODE_RANGE`). Termuxi `nodejs-lts` sisaldab tavaliselt Node 20 LTS-i, mida **enam ei toetata** — installige selle asemel `pkg install nodejs` (praegune versioon) ja kontrollige käsuga `node --version`, et kuvatakse versioonireast 22.x/24.x+ pärinev versioon.

Kui natiivse paketi kompileerimine ebaõnnestub, käivitage ülaltoodud käsk `pkg install` uuesti ja proovige seejärel OmniRoute'i installimist veel kord.

## Installimine

Käivitage uusim avaldatud pakett otse:

```bash
npx -y omniroute@latest
```

Samuti saate selle globaalselt installida:

```bash
npm install -g omniroute
omniroute
```

## Käivitamine

Käivitage OmniRoute ilma graafilise kasutajaliideseta serverirežiimis:

```bash
omniroute
```

või:

```bash
npx omniroute
```

Juhtpaneel kuulab aadressil:

```text
http://localhost:20128
```

Avage see URL Androidi brauseris. Kui käitate kliente Termuxis, kasutage OpenAI-ga ühilduva baas-URL-ina sama hosti ja porti.

## Taustal käitamine

Lihtsa taustaprotsessi käivitamiseks:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Selle peatamiseks:

```bash
pkill -f omniroute
```

Seadme käivitamise järel automaatseks käivitamiseks installige Termux:Booti lisandmoodul ja looge käivitusskript:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Androidi aku optimeerimine võib pikalt töötavad taustaprotsessid peatada. Kui server peab pidevalt võrgus püsima, keelake Termuxi jaoks aku optimeerimine.

## Juurdepääs teistest seadmetest

Leidke telefoni IP-aadress WiFi-võrgus:

```bash
ip addr show wlan0
```

Seejärel avage juhtpaneel teisest seadmest:

```text
http://PHONE_IP:20128
```

Näiteks:

```text
http://192.168.1.50:20128
```

Hoidke telefon ja klient samas usaldusväärses võrgus. Kui teete OmniRoute'i juurdepääsetavaks väljastpoolt telefoni, lubage API-võtmed ja juhtpaneeli autentimine.

## Andmekataloog

Vaikimisi salvestab OmniRoute andmed Termuxi kodukataloogi, järgides sama serveripoolse andmetee käitumist nagu Linuxis. Andmebaasi paigutamiseks kindlasse asukohta tehke järgmist:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Piirangud

- Electron ei tööta Termuxis.
- Puudub süsteemisalv ja töölauaga integreerimine.
- See seadistus on ainult serveri jaoks: kasutage brauseripõhist juhtpaneeli.
- Natiivsed sõltuvused võivad vajada kohalikku kompileerimist.
- Vähese mäluga Androidi seadmetes võib olla vaja samaaegsete päringute arvu vähendada.
- MITM-i/süsteemi sertifikaatide funktsioonid võivad nõuda väljaspool Termuxit Androidi usaldushoidla seadistamist.

## Tõrkeotsing

### Toetamata platvorm: android (iga päring tagastab HTTP 500)

**Sümptom:** `omniroute` / `omniroute serve` väljastab `✔ OmniRoute is running!`, kuid iga juhtpaneeli- või API-päring tagastab pelga vastuse `500 Internal Server Error`. `~/.omniroute/logs/application/app.log` jääb tühjaks, `APP_LOG_LEVEL=debug` ei väljasta midagi kasulikku ja vastuse keha on lihttekst (`Internal Server Error`) ilma JSON-i üksikasjadeta.

**Põhjus:** Mõned Termuxi/Node'i järgud teatavad `process.platform === "android"`. Next.js-i `getCacheDirectory()` ei käsitle seda platvormi: see nõuab, et `~/.cache` (või üldine ajutine kataloog) oleks _juba_ olemas, vastasel juhul ebaõnnestub instrumentatsioonikonksu laadimine järgmise veaga:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Kuna konksu ei laadita, ei käivitu ka logimine — tõrke 500 põhjust näib täiesti võimatu diagnoosida. OmniRoute loob enne Next.js-i käivitumist CLI sisenemispunktis kataloogi `~/.cache` (ja määrab `XDG_CACHE_HOME`, kui see pole määratud), et see kontroll Androidis/Termuxis õnnestuks.

**Toetatud lahendus (ilma paketti muutmata):**

```bash
mkdir -p ~/.cache
omniroute serve
```

OmniRoute'i praegustes järkudes teeb CLI seda Androidis/Termuxis automaatselt — värske `npx -y omniroute@latest` / globaalne install ei tohiks käsitsi tehtavat sammu vajada. Kui näete viga ka pärast versiooniuuendust, looge `~/.cache` ülaltoodud viisil üks kord ja taaskäivitage.

**Ärge** muutke faili `dist/server.js`, et sundida väärtuseks `process.platform = "linux"`. Selline paketi muudatus kirjutatakse igal uuesti installimisel või versiooniuuendusel üle ning pole pärast vahemälukataloogi loomist vajalik.

### better-sqlite3 koostamisvead

Installige Termuxi koostamistööriistad:

```bash
pkg install nodejs python build-essential
```

Seejärel käivitage uuesti:

```bash
npx -y omniroute@latest
```

### Port on juba kasutusel

Kontrollige, mis kuulab vaikepordil:

```bash
ss -ltnp | grep 20128
```

Peatage vana protsess:

```bash
pkill -f omniroute
```

### Juhtpaneel pole teisest seadmest kättesaadav

Veenduge, et mõlemad seadmed oleksid samas WiFi-võrgus, seejärel testige Termuxist:

```bash
curl http://localhost:20128
```

Kui kohalik juurdepääs töötab, kuid LAN-i kaudu juurdepääs mitte, kontrollige Androidi pääsupunkti/WiFi isoleerimist ning telefonis olevaid tulemüüri- või VPN-profiile.
