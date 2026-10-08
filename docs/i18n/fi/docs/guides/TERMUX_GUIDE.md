# Termux Headless Setup (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoutea voidaan käyttää Androidissa headless-palvelimena Termuxin kautta. Electron-työpöytäsovellusta ei tueta Termuxissa, mutta verkkohallintapaneeli ja OpenAI-yhteensopiva API toimivat paikallisessa selaimessa tai muilla samassa verkossa olevilla laitteilla.

## Esivaatimukset

Asenna Termux F-Droidista tai GitHub-julkaisuista. Päivitä sen jälkeen paketit ja asenna natiivien riippuvuuksien, kuten `better-sqlite3`, tarvitsemat käännöstyökalut.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js-versio:** OmniRoute vaatii Node-version `>=22.22.2 <23 || >=24.0.0 <27` (vastaa `engines`-määritystä tiedostoissa `package.json` / `SUPPORTED_NODE_RANGE`). Termuxin `nodejs-lts` sisältää yleensä Node 20 LTS:n, jota **ei enää tueta** — asenna sen sijaan nykyinen versio komennolla `pkg install nodejs` ja varmista komennolla `node --version`, että käytössä on 22.x/24.x tai uudempi versiolinja.

Jos natiivin paketin kääntäminen epäonnistuu, suorita yllä oleva `pkg install` -komento uudelleen ja yritä sitten asentaa OmniRoute uudelleen.

## Asennus

Suorita uusin julkaistu paketti suoraan:

```bash
npx -y omniroute@latest
```

Voit myös asentaa sen globaalisti:

```bash
npm install -g omniroute
omniroute
```

## Suorittaminen

Käynnistä OmniRoute headless-palvelintilassa:

```bash
omniroute
```

tai:

```bash
npx omniroute
```

Hallintapaneeli kuuntelee osoitteessa:

```text
http://localhost:20128
```

Avaa tämä URL-osoite Android-selaimessa. Jos suoritat asiakasohjelmia Termuxissa, käytä samaa isäntää ja porttia OpenAI-yhteensopivana perus-URL-osoitteena.

## Suorittaminen taustalla

Yksinkertainen taustaprosessi voidaan käynnistää näin:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Pysäytä se näin:

```bash
pkill -f omniroute
```

Jos haluat käynnistää palvelun automaattisesti laitteen käynnistyessä, asenna Termux:Boot-lisäosa ja luo käynnistysskripti:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Androidin akun optimointi voi pysäyttää pitkään käynnissä olevat taustaprosessit. Poista Termuxin akun optimointi käytöstä, jos palvelimen on tarkoitus pysyä jatkuvasti käytettävissä.

## Käyttö muilta laitteilta

Selvitä puhelimen IP-osoite WiFi-verkossa:

```bash
ip addr show wlan0
```

Avaa sitten hallintapaneeli toisella laitteella:

```text
http://PHONE_IP:20128
```

Esimerkiksi:

```text
http://192.168.1.50:20128
```

Pidä puhelin ja asiakaslaite samassa luotetussa verkossa. Jos asetat OmniRouten käytettäväksi puhelimen ulkopuolelta, ota API-avaimet ja hallintapaneelin todennus käyttöön.

## Datahakemisto

Oletusarvoisesti OmniRoute tallentaa datan Termuxin kotihakemistoon noudattaen samaa palvelinpuolen datapolkukäytäntöä kuin Linuxissa. Voit sijoittaa tietokannan erikseen määritettyyn hakemistoon näin:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Rajoitukset

- Electron ei toimi Termuxissa.
- Järjestelmäpalkkia tai työpöytäintegraatiota ei ole.
- Tämä kokoonpano on tarkoitettu vain palvelinkäyttöön: käytä hallintapaneelia selaimella.
- Natiivit riippuvuudet saatetaan joutua kääntämään paikallisesti.
- Vähämuistisilla Android-laitteilla samanaikaisten pyyntöjen määrää voi olla tarpeen vähentää.
- MITM- ja järjestelmävarmenneominaisuudet voivat edellyttää Android-tason luottamusvarannon muutoksia Termuxin ulkopuolella.

## Vianmääritys

### Ei-tuettu alusta: android (jokainen pyyntö palauttaa HTTP 500 -virheen)

**Oire:** `omniroute` / `omniroute serve` tulostaa `✔ OmniRoute is running!`, mutta jokainen hallintapaneeli- tai API-pyyntö palauttaa pelkän `500 Internal Server Error` -virheen. Tiedosto `~/.omniroute/logs/application/app.log` pysyy tyhjänä, `APP_LOG_LEVEL=debug` ei tulosta mitään hyödyllistä ja vastauksen runko on pelkkää tekstiä (`Internal Server Error`) ilman JSON-lisätietoja.

**Syy:** Jotkin Termux-/Node-koontiversiot ilmoittavat arvon `process.platform === "android"`. Next.jsin `getCacheDirectory()` ei käsittele kyseistä alustaa: se edellyttää, että `~/.cache` (tai yleinen tilapäishakemisto) on _jo_ olemassa. Muussa tapauksessa instrumentointikoukun lataaminen epäonnistuu seuraavalla virheellä:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Koska koukkua ei koskaan ladata, lokitus ei käynnisty — 500-virhe näyttää täysin mahdottomalta diagnosoida. OmniRoute luo hakemiston `~/.cache` (ja asettaa muuttujan `XDG_CACHE_HOME`, jos sitä ei ole asetettu) CLI-käynnistyspisteessä ennen Next.jsin käynnistymistä, jotta tämä tarkistus onnistuu Androidissa/Termuxissa.

**Tuettu ratkaisu (pakettia ei tarvitse muokata):**

```bash
mkdir -p ~/.cache
omniroute serve
```

Nykyisissä OmniRoute-koontiversioissa CLI tekee tämän automaattisesti Androidissa/Termuxissa — uuden `npx -y omniroute@latest` -asennuksen tai globaalin asennuksen ei pitäisi edellyttää manuaalista vaihetta. Jos virhe esiintyy edelleen päivityksen jälkeen, luo `~/.cache` kerran yllä kuvatulla tavalla ja käynnistä palvelu uudelleen.

**Älä** muokkaa tiedostoa `dist/server.js` pakottaaksesi arvoksi `process.platform = "linux"`. Tällainen pakettimuutos korvautuu jokaisen uudelleenasennuksen tai päivityksen yhteydessä ja on tarpeeton, kun välimuistihakemisto on olemassa.

### better-sqlite3-koontivirheet

Asenna Termuxin käännöstyökalut:

```bash
pkg install nodejs python build-essential
```

Suorita sitten uudelleen:

```bash
npx -y omniroute@latest
```

### Portti on jo käytössä

Tarkista, mikä prosessi kuuntelee oletusporttia:

```bash
ss -ltnp | grep 20128
```

Pysäytä vanha prosessi:

```bash
pkill -f omniroute
```

### Hallintapaneelia ei voi käyttää toiselta laitteelta

Varmista, että molemmat laitteet ovat samassa WiFi-verkossa, ja testaa sitten Termuxista:

```bash
curl http://localhost:20128
```

Jos paikallinen käyttö toimii mutta lähiverkkokäyttö ei, tarkista Androidin hotspot-/WiFi-eristys sekä puhelimen palomuuri- ja VPN-profiilit.
