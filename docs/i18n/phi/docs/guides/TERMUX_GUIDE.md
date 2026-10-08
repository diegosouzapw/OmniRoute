# Termux Headless Setup (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

Maaaring patakbuhin ang OmniRoute bilang headless server sa Android sa pamamagitan ng Termux. Hindi sinusuportahan sa Termux ang Electron desktop app, ngunit gumagana ang web dashboard at OpenAI-compatible API mula sa lokal na browser o sa iba pang device sa parehong network.

## Mga Kinakailangan

I-install ang Termux mula sa F-Droid o sa mga release sa GitHub, pagkatapos ay i-update ang mga package at i-install ang mga build tool na kinakailangan ng mga native dependency gaya ng `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Bersyon ng Node.js:** Kinakailangan ng OmniRoute ang Node `>=22.22.2 <23 || >=24.0.0 <27` (tumutugma sa `engines` sa `package.json` / `SUPPORTED_NODE_RANGE`). Karaniwang kasama sa `nodejs-lts` ng Termux ang Node 20 LTS, na **hindi na sinusuportahan** — sa halip, i-install ang `pkg install nodejs` (kasalukuyang bersyon) at tiyaking ang `node --version` ay nag-uulat ng linyang 22.x/24.x+.

Kung mabigo ang pag-compile ng native package, patakbuhin muli ang command na `pkg install` sa itaas at pagkatapos ay subukang muli ang pag-install ng OmniRoute.

## Pag-install

Direktang patakbuhin ang pinakabagong na-publish na package:

```bash
npx -y omniroute@latest
```

Maaari mo rin itong i-install nang global:

```bash
npm install -g omniroute
omniroute
```

## Pagpapatakbo

Simulan ang OmniRoute sa headless server mode:

```bash
omniroute
```

o:

```bash
npx omniroute
```

Makikita ang dashboard sa:

```text
http://localhost:20128
```

Buksan ang URL na iyon sa Android browser. Kung nagpapatakbo ka ng mga client sa loob ng Termux, gamitin ang parehong host at port bilang OpenAI-compatible base URL.

## Pagpapatakbo sa Background

Para sa isang simpleng proseso sa background:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Upang ihinto ito:

```bash
pkill -f omniroute
```

Para sa awtomatikong pagsisimula pagkatapos mag-boot ang device, i-install ang Termux:Boot add-on at gumawa ng boot script:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Maaaring ihinto ng Android battery optimization ang mga prosesong matagal na tumatakbo sa background. I-disable ang battery optimization para sa Termux kung inaasahang mananatiling online ang server.

## Pag-access Mula sa Ibang Mga Device

Hanapin ang IP address ng telepono sa WiFi network:

```bash
ip addr show wlan0
```

Pagkatapos, buksan ang dashboard mula sa ibang device:

```text
http://PHONE_IP:20128
```

Halimbawa:

```text
http://192.168.1.50:20128
```

Panatilihin ang telepono at client sa parehong pinagkakatiwalaang network. Kung ilalantad mo ang OmniRoute sa labas ng telepono, i-enable ang mga API key at authentication ng dashboard.

## Direktoryo ng Data

Bilang default, iniimbak ng OmniRoute ang data sa ilalim ng home directory ng Termux, alinsunod sa parehong gawi ng server-side data path na ginagamit sa Linux. Upang ilagay ang database sa isang tahasang lokasyon:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Mga Limitasyon

- Hindi tumatakbo ang Electron sa Termux.
- Walang system tray o desktop integration.
- Para lamang sa server ang setup na ito: gamitin ang browser dashboard.
- Maaaring kailanganin ng mga native dependency ang lokal na pag-compile.
- Maaaring kailanganin ng mga Android device na may kaunting memory ang mas kaunting sabay-sabay na request.
- Maaaring mangailangan ang mga feature ng MITM/system certificate ng pagbabago sa trust store sa antas ng Android sa labas ng Termux.

## Pag-troubleshoot

### Hindi sinusuportahang platform: android (bawat request ay nagbabalik ng HTTP 500)

**Sintomas:** Nagpi-print ang `omniroute` / `omniroute serve` ng `✔ OmniRoute is running!`, ngunit ang bawat request sa dashboard o API ay nagbabalik ng simpleng `500 Internal Server Error`. Nananatiling walang laman ang `~/.omniroute/logs/application/app.log`, walang kapaki-pakinabang na napi-print ang `APP_LOG_LEVEL=debug`, at plain text (`Internal Server Error`) ang response body nang walang detalye sa JSON.

**Sanhi:** Iniuulat ng ilang Termux/Node build ang `process.platform === "android"`. Hindi pinangangasiwaan ng `getCacheDirectory()` ng Next.js ang platform na iyon: kinakailangan nitong _umiiral na_ ang `~/.cache` (o isang generic na tmp directory), kung hindi ay mabibigo ito habang nilo-load ang instrumentation hook na may:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Dahil hindi kailanman nalo-load ang hook, hindi kailanman nagsisimula ang logging — kaya tila ganap na imposibleng masuri ang 500. Ginagawa ng OmniRoute ang `~/.cache` (at itinatakda ang `XDG_CACHE_HOME` kapag hindi pa ito nakatakda) sa CLI entrypoint bago magsimula ang Next.js upang magtagumpay ang probe na ito sa Android/Termux.

**Sinusuportahang solusyon (walang pag-patch ng package):**

```bash
mkdir -p ~/.cache
omniroute serve
```

Sa mga kasalukuyang build ng OmniRoute, awtomatikong ginagawa ito ng CLI sa Android/Termux — hindi dapat kailanganin ng bagong `npx -y omniroute@latest` / global install ang manu-manong hakbang. Kung nakikita mo pa rin ang error pagkatapos mag-upgrade, gawin ang `~/.cache` nang isang beses gaya ng nasa itaas at i-restart.

**Huwag** i-patch ang `dist/server.js` upang piliting maging `process.platform = "linux"`. Ang ganitong uri ng package patch ay nao-overwrite sa bawat muling pag-install/pag-upgrade at hindi na kailangan kapag umiiral na ang cache directory.

### Mga Error sa Pag-build ng better-sqlite3

I-install ang build toolchain ng Termux:

```bash
pkg install nodejs python build-essential
```

Pagkatapos ay patakbuhin muli:

```bash
npx -y omniroute@latest
```

### Ginagamit Na ang Port

Suriin kung ano ang nakikinig sa default na port:

```bash
ss -ltnp | grep 20128
```

Ihinto ang lumang proseso:

```bash
pkill -f omniroute
```

### Hindi Ma-access ang Dashboard Mula sa Ibang Device

Tiyaking nasa parehong WiFi network ang dalawang device, pagkatapos ay subukan mula sa Termux:

```bash
curl http://localhost:20128
```

Kung gumagana ang lokal na access ngunit hindi ang LAN access, suriin ang Android hotspot/WiFi isolation at anumang firewall o VPN profile sa telepono.
