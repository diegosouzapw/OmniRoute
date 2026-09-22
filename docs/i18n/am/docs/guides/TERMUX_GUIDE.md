# Termux Headless Setup (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute በTermux በኩል Android ላይ headless አገልጋይ ሆኖ መስራት ይችላል። የElectron ዴስክቶፕ መተግበሪያ በTermux ውስጥ አይደገፍም፤ ነገር ግን የድር ዳሽቦርዱና ከOpenAI ጋር ተኳሃኝ የሆነው API ከአካባቢያዊ አሳሹ ወይም በተመሳሳይ አውታረ መረብ ላይ ካሉ ሌሎች መሣሪያዎች ይሰራሉ።

## ቅድመ ሁኔታዎች

Termuxን ከF-Droid ወይም ከGitHub releases ይጫኑ፤ ከዚያም ፓኬጆቹን ያዘምኑና እንደ `better-sqlite3` ላሉ ቤተኛ ጥገኞች የሚያስፈልጉትን የግንባታ መሣሪያዎች ይጫኑ።

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **የNode.js ስሪት፦** OmniRoute Node `>=22.22.2 <23 || >=24.0.0 <27` ይፈልጋል (በ`package.json` / `SUPPORTED_NODE_RANGE` ውስጥ ካለው `engines` ጋር ይዛመዳል)። የTermux `nodejs-lts` በተለምዶ Node 20 LTSን ይዞ ይመጣል፤ ይህም **ከእንግዲህ አይደገፍም** — በምትኩ `pkg install nodejs` (የአሁኑን) ይጫኑና `node --version` የ22.x/24.x+ መስመር እንደሚያሳይ ያረጋግጡ።

የቤተኛ ፓኬጅ ማጠናቀር ካልተሳካ፣ ከላይ ያለውን የ`pkg install` ትዕዛዝ እንደገና ያስኪዱና የOmniRoute ጭነቱን እንደገና ይሞክሩ።

## መጫን

የታተመውን የቅርብ ጊዜ ፓኬጅ በቀጥታ ያስኪዱ፦

```bash
npx -y omniroute@latest
```

እንዲሁም በስርዓቱ አቀፍ ደረጃ መጫን ይችላሉ፦

```bash
npm install -g omniroute
omniroute
```

## ማስኬድ

OmniRouteን በheadless አገልጋይ ሁነታ ያስጀምሩ፦

```bash
omniroute
```

ወይም፦

```bash
npx omniroute
```

ዳሽቦርዱ የሚያዳምጠው በ፦

```text
http://localhost:20128
```

ያንን URL በAndroid አሳሹ ውስጥ ይክፈቱ። ደንበኛ ፕሮግራሞችን በTermux ውስጥ ካስኬዱ፣ ከOpenAI ጋር ተኳሃኝ ለሆነው መሠረታዊ URL ተመሳሳዩን አስተናጋጅና ወደብ ይጠቀሙ።

## ከበስተጀርባ ማስኬድ

ለቀላል የበስተጀርባ ሂደት፦

```bash
nohup omniroute > omniroute.log 2>&1 &
```

ለማቆም፦

```bash
pkill -f omniroute
```

መሣሪያው ከተነሳ በኋላ በራስ-ሰር እንዲጀምር፣ የTermux:Boot ተጨማሪውን ይጫኑና የማስነሻ ስክሪፕት ይፍጠሩ፦

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

የAndroid የባትሪ ማመቻቸት ለረጅም ጊዜ የሚሰሩ የበስተጀርባ ሂደቶችን ሊያቆም ይችላል። አገልጋዩ መስመር ላይ እንዲቆይ የሚጠበቅ ከሆነ ለTermux የባትሪ ማመቻቸትን ያሰናክሉ።

## ከሌሎች መሣሪያዎች መድረስ

በWiFi አውታረ መረቡ ላይ የስልኩን IP አድራሻ ያግኙ፦

```bash
ip addr show wlan0
```

ከዚያም ዳሽቦርዱን ከሌላ መሣሪያ ይክፈቱ፦

```text
http://PHONE_IP:20128
```

ለምሳሌ፦

```text
http://192.168.1.50:20128
```

ስልኩንና ደንበኛውን በተመሳሳይ የታመነ አውታረ መረብ ላይ ያቆዩ። OmniRouteን ከስልኩ ውጭ ተደራሽ ካደረጉ፣ API keysንና የዳሽቦርድ ማረጋገጫን ያንቁ።

## የውሂብ ማውጫ

በነባሪነት OmniRoute በLinux ላይ ጥቅም ላይ የሚውለውን ተመሳሳይ የአገልጋይ-ወገን የውሂብ ዱካ ባህሪ በመከተል ውሂብን በTermux መነሻ ማውጫ ስር ያከማቻል። የውሂብ ጎታውን በግልጽ በተወሰነ ቦታ ለማስቀመጥ፦

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## ገደቦች

- Electron በTermux ውስጥ አይሰራም።
- የስርዓት ትሪ ወይም የዴስክቶፕ ውህደት የለም።
- ይህ ዝግጅት ለአገልጋይ ብቻ ነው፦ የአሳሽ ዳሽቦርዱን ይጠቀሙ።
- ቤተኛ ጥገኞች በአካባቢው ማጠናቀር ሊያስፈልጋቸው ይችላል።
- ዝቅተኛ ማህደረ ትውስታ ያላቸው የAndroid መሣሪያዎች ያነሱ በአንድ ጊዜ የሚካሄዱ ጥያቄዎችን ሊፈልጉ ይችላሉ።
- የMITM/የስርዓት ሰርተፍኬት ባህሪያት ከTermux ውጭ በAndroid ደረጃ የtrust-store ስራ ሊያስፈልጋቸው ይችላል።

## ችግር መፍታት

### የማይደገፍ መድረክ፦ android (እያንዳንዱ ጥያቄ HTTP 500 ይመልሳል)

**ምልክት፦** `omniroute` / `omniroute serve` `✔ OmniRoute is running!` ብሎ ያትማል፤ ነገር ግን እያንዳንዱ የዳሽቦርድ ወይም API ጥያቄ ዝርዝር የሌለውን `500 Internal Server Error` ይመልሳል። `~/.omniroute/logs/application/app.log` ባዶ ሆኖ ይቆያል፣ `APP_LOG_LEVEL=debug` ጠቃሚ ነገር አያትምም፣ እና የምላሹ ይዘት የJSON ዝርዝር የሌለው ተራ ጽሑፍ (`Internal Server Error`) ነው።

**ምክንያት፦** አንዳንድ የTermux/Node ግንባታዎች `process.platform === "android"` ብለው ሪፖርት ያደርጋሉ። የNext.js `getCacheDirectory()` ያንን መድረክ አያስተናግድም፦ `~/.cache` (ወይም አጠቃላይ tmp ማውጫ) _ቀድሞውኑ_ እንዲኖር ይፈልጋል፤ አለበለዚያ instrumentation hookን በሚጭንበት ጊዜ በሚከተለው ስህተት ይወድቃል፦

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

hookው ጨርሶ ስለማይጫን፣ logging ጨርሶ አይጀምርም — 500ው ምንም መንስኤ ማወቅ የማይቻል ይመስላል። OmniRoute በAndroid/Termux ላይ ይህ probe እንዲሳካ፣ Next.js ከመጀመሩ በፊት በCLI entrypoint ውስጥ `~/.cache`ን ይፈጥራል (እንዲሁም `XDG_CACHE_HOME` ካልተዋቀረ ያዋቅረዋል)።

**የሚደገፍ መፍትሔ (ፓኬጁን ሳይቀይሩ)፦**

```bash
mkdir -p ~/.cache
omniroute serve
```

በአሁኖቹ የOmniRoute ግንባታዎች CLIው ይህን በAndroid/Termux ላይ በራስ-ሰር ያደርጋል — አዲስ `npx -y omniroute@latest` / ዓለም አቀፍ ጭነት ይህን በእጅ የሚደረግ እርምጃ መፈለግ የለበትም። ካሻሻሉ በኋላም ስህተቱን ካዩ፣ ከላይ እንዳለው `~/.cache`ን አንድ ጊዜ ይፍጠሩና እንደገና ያስጀምሩ።

`process.platform = "linux"` እንዲሆን ለማስገደድ `dist/server.js`ን **አይቀይሩ**። ይህ ዓይነቱ የፓኬጅ ለውጥ በእያንዳንዱ ዳግም ጭነት/ማሻሻያ ጊዜ ይተካል፤ የcache ማውጫው አንዴ ከተፈጠረም አያስፈልግም።

### የbetter-sqlite3 ግንባታ ስህተቶች

የTermux የግንባታ መሣሪያ ስብስብን ይጫኑ፦

```bash
pkg install nodejs python build-essential
```

ከዚያ እንደገና ያስኪዱ፦

```bash
npx -y omniroute@latest
```

### ወደቡ ቀድሞውኑ ጥቅም ላይ ነው

በነባሪው ወደብ ላይ የሚያዳምጠውን ይፈትሹ፦

```bash
ss -ltnp | grep 20128
```

አሮጌውን ሂደት ያቁሙ፦

```bash
pkill -f omniroute
```

### ዳሽቦርዱ ከሌላ መሣሪያ ሊደረስበት አይችልም

ሁለቱም መሣሪያዎች በተመሳሳይ WiFi አውታረ መረብ ላይ መሆናቸውን ያረጋግጡ፤ ከዚያም ከTermux ይፈትሹ፦

```bash
curl http://localhost:20128
```

የአካባቢ መዳረሻ የሚሰራ ሆኖ የLAN መዳረሻ ካልሰራ፣ በስልኩ ላይ የAndroid hotspot/WiFi isolationን እና ማንኛውንም firewall ወይም VPN profile ይፈትሹ።
