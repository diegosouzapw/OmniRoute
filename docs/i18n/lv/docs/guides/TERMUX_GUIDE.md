# Termux Headless Setup (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute var darboties kā bezgalvas serveris Android ierīcē, izmantojot Termux. Electron darbvirsmas lietotne Termux vidē netiek atbalstīta, taču tīmekļa informācijas panelis un ar OpenAI saderīgā API darbojas lokālajā pārlūkprogrammā vai citās ierīcēs tajā pašā tīklā.

## Priekšnosacījumi

Instalējiet Termux no F-Droid vai GitHub laidieniem, pēc tam atjauniniet pakotnes un instalējiet būvēšanas rīkus, kas nepieciešami tādām vietējām atkarībām kā `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js versija:** OmniRoute nepieciešama Node versija `>=22.22.2 <23 || >=24.0.0 <27` (atbilst `engines` failā `package.json` / `SUPPORTED_NODE_RANGE`). Termux pakotne `nodejs-lts` parasti ietver Node 20 LTS, kas **vairs netiek atbalstīta** — tā vietā instalējiet pašreizējo versiju ar `pkg install nodejs` un pārbaudiet, vai `node --version` uzrāda 22.x/24.x+ versiju.

Ja vietējās pakotnes kompilēšana neizdodas, vēlreiz izpildiet iepriekš norādīto komandu `pkg install` un pēc tam atkārtojiet OmniRoute instalēšanu.

## Instalēšana

Palaidiet jaunāko publicēto pakotni tieši:

```bash
npx -y omniroute@latest
```

Varat to instalēt arī globāli:

```bash
npm install -g omniroute
omniroute
```

## Palaišana

Palaidiet OmniRoute bezgalvas servera režīmā:

```bash
omniroute
```

vai:

```bash
npx omniroute
```

Informācijas panelis klausās adresē:

```text
http://localhost:20128
```

Atveriet šo URL Android pārlūkprogrammā. Ja klientus darbināt Termux vidē, kā ar OpenAI saderīgās API bāzes URL izmantojiet to pašu resursdatoru un portu.

## Darbība fonā

Vienkāršam fona procesam:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Lai to apturētu:

```bash
pkill -f omniroute
```

Lai nodrošinātu automātisku palaišanu pēc ierīces sāknēšanas, instalējiet Termux:Boot papildinājumu un izveidojiet sāknēšanas skriptu:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android akumulatora optimizācija var apturēt ilgstoši darbojošos fona procesus. Ja serverim paredzēts nepārtraukti darboties tiešsaistē, atspējojiet Termux akumulatora optimizāciju.

## Piekļuve no citām ierīcēm

Noskaidrojiet tālruņa IP adresi WiFi tīklā:

```bash
ip addr show wlan0
```

Pēc tam atveriet informācijas paneli citā ierīcē:

```text
http://PHONE_IP:20128
```

Piemēram:

```text
http://192.168.1.50:20128
```

Tālrunim un klientam jāatrodas vienā uzticamā tīklā. Ja nodrošināt piekļuvi OmniRoute ārpus tālruņa, iespējojiet API atslēgas un informācijas paneļa autentifikāciju.

## Datu direktorijs

Pēc noklusējuma OmniRoute glabā datus Termux mājas direktorijā, izmantojot tādu pašu servera puses datu ceļa darbību kā Linux vidē. Lai datubāzi ievietotu skaidri norādītā vietā:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Ierobežojumi

- Electron nedarbojas Termux vidē.
- Nav sistēmas teknes vai darbvirsmas integrācijas.
- Šī konfigurācija paredzēta tikai serverim: izmantojiet pārlūkprogrammas informācijas paneli.
- Vietējās atkarības var būt jākompilē lokāli.
- Android ierīcēs ar nelielu atmiņas apjomu var būt nepieciešams samazināt vienlaicīgo pieprasījumu skaitu.
- MITM/sistēmas sertifikātu funkcijām var būt nepieciešamas Android līmeņa uzticamības krātuves izmaiņas ārpus Termux.

## Problēmu novēršana

### Neatbalstīta platforma: android (katrs pieprasījums atgriež HTTP 500)

**Pazīme:** `omniroute` / `omniroute serve` izvada `✔ OmniRoute is running!`, taču katrs informācijas paneļa vai API pieprasījums atgriež tikai `500 Internal Server Error`. Fails `~/.omniroute/logs/application/app.log` paliek tukšs, `APP_LOG_LEVEL=debug` neizvada neko noderīgu, un atbildes pamatteksts ir vienkāršs teksts (`Internal Server Error`) bez JSON informācijas.

**Cēlonis:** Dažas Termux/Node būvējuma versijas ziņo `process.platform === "android"`. Next.js `getCacheDirectory()` neapstrādā šo platformu: funkcija pieprasa, lai `~/.cache` (vai vispārīgs pagaidu direktorijs) _jau_ pastāvētu, pretējā gadījumā instrumentācijas āķa ielādes laikā rodas kļūme:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Tā kā āķis netiek ielādēts, reģistrēšana žurnālā netiek sākta — kļūda 500 šķiet pilnīgi nediagnosticējama. OmniRoute pirms Next.js palaišanas CLI ieejas punktā izveido `~/.cache` (un iestata `XDG_CACHE_HOME`, ja tas nav iestatīts), lai šī pārbaude Android/Termux vidē būtu sekmīga.

**Atbalstītais risinājums (bez pakotnes modificēšanas):**

```bash
mkdir -p ~/.cache
omniroute serve
```

Pašreizējos OmniRoute būvējumos CLI to Android/Termux vidē izdara automātiski — pēc jaunas `npx -y omniroute@latest` palaišanas vai globālas instalēšanas manuālajai darbībai nevajadzētu būt nepieciešamai. Ja pēc jaunināšanas kļūda joprojām parādās, vienreiz izveidojiet `~/.cache`, kā norādīts iepriekš, un restartējiet.

**Nemodificējiet** `dist/server.js`, lai piespiedu kārtā iestatītu `process.platform = "linux"`. Šāda pakotnes modifikācija tiek pārrakstīta katras atkārtotas instalēšanas vai jaunināšanas laikā un nav nepieciešama, tiklīdz pastāv kešatmiņas direktorijs.

### better-sqlite3 būvēšanas kļūdas

Instalējiet Termux būvēšanas rīku ķēdi:

```bash
pkg install nodejs python build-essential
```

Pēc tam vēlreiz izpildiet:

```bash
npx -y omniroute@latest
```

### Ports jau tiek izmantots

Pārbaudiet, kas klausās noklusējuma portā:

```bash
ss -ltnp | grep 20128
```

Apturiet veco procesu:

```bash
pkill -f omniroute
```

### Informācijas panelis nav sasniedzams no citas ierīces

Pārliecinieties, ka abas ierīces atrodas vienā WiFi tīklā, pēc tam veiciet pārbaudi no Termux:

```bash
curl http://localhost:20128
```

Ja lokālā piekļuve darbojas, bet LAN piekļuve nedarbojas, pārbaudiet Android tīklāja/WiFi izolāciju, kā arī tālrunī izmantotos ugunsmūra vai VPN profilus.
