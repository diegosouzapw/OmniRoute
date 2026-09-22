# Termux Headless Setup (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute हे Termux द्वारे Android वर headless server म्हणून चालवता येते. Electron desktop app ला Termux मध्ये समर्थन नाही, परंतु web dashboard आणि OpenAI-सुसंगत API स्थानिक browser मधून किंवा त्याच network वरील इतर devices मधून वापरता येतात.

## पूर्वआवश्यकता

F-Droid किंवा GitHub releases मधून Termux install करा, त्यानंतर packages update करा आणि `better-sqlite3` सारख्या native dependencies साठी आवश्यक build tools install करा.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js आवृत्ती:** OmniRoute साठी Node `>=22.22.2 <23 || >=24.0.0 <27` आवश्यक आहे (`package.json` / `SUPPORTED_NODE_RANGE` मधील `engines` शी जुळणारे). Termux चे `nodejs-lts` साधारणपणे Node 20 LTS पुरवते, ज्याला **आता समर्थन नाही** — त्याऐवजी `pkg install nodejs` (current) install करा आणि `node --version` मध्ये 22.x/24.x+ आवृत्ती दिसत असल्याची खात्री करा.

Native package compilation अयशस्वी झाल्यास, वरील `pkg install` command पुन्हा चालवा आणि त्यानंतर OmniRoute पुन्हा install करण्याचा प्रयत्न करा.

## Install करणे

नवीनतम प्रकाशित package थेट चालवा:

```bash
npx -y omniroute@latest
```

तुम्ही ते globally देखील install करू शकता:

```bash
npm install -g omniroute
omniroute
```

## चालवणे

OmniRoute हे headless server mode मध्ये सुरू करा:

```bash
omniroute
```

किंवा:

```bash
npx omniroute
```

Dashboard खालील पत्त्यावर उपलब्ध असतो:

```text
http://localhost:20128
```

ही URL Android browser मध्ये उघडा. तुम्ही Termux मध्ये clients चालवत असल्यास, OpenAI-सुसंगत base URL म्हणून हाच host आणि port वापरा.

## पार्श्वभूमीत चालवणे

साध्या background process साठी:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

तो थांबवण्यासाठी:

```bash
pkill -f omniroute
```

Device boot झाल्यानंतर आपोआप सुरू करण्यासाठी, Termux:Boot add-on install करा आणि boot script तयार करा:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android battery optimization मुळे दीर्घकाळ चालणारे background processes थांबू शकतात. Server सतत online राहणे अपेक्षित असल्यास Termux साठी battery optimization बंद करा.

## इतर Devices मधून प्रवेश

WiFi network वरील phone चा IP address शोधा:

```bash
ip addr show wlan0
```

त्यानंतर दुसऱ्या device वरून dashboard उघडा:

```text
http://PHONE_IP:20128
```

उदाहरणार्थ:

```text
http://192.168.1.50:20128
```

Phone आणि client एकाच विश्वासार्ह network वर ठेवा. OmniRoute ला phone च्या बाहेरून उपलब्ध करून देत असल्यास, API keys आणि dashboard authentication सक्षम करा.

## Data Directory

Default नुसार OmniRoute हे Linux वर वापरल्या जाणाऱ्या त्याच server-side data path पद्धतीचे अनुसरण करून Termux home directory अंतर्गत data साठवते. Database एखाद्या निश्चित ठिकाणी ठेवण्यासाठी:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## मर्यादा

- Electron हे Termux मध्ये चालत नाही.
- System tray किंवा desktop integration उपलब्ध नाही.
- ही रचना केवळ server साठी आहे: browser dashboard वापरा.
- Native dependencies चे local compilation करावे लागू शकते.
- कमी memory असलेल्या Android devices वर कमी concurrent requests ठेवाव्या लागू शकतात.
- MITM/system certificate सुविधांसाठी Termux च्या बाहेर Android-level trust-store वर काम करावे लागू शकते.

## समस्या निवारण

### असमर्थित platform: android (प्रत्येक request साठी HTTP 500 मिळतो)

**लक्षण:** `omniroute` / `omniroute serve` हे `✔ OmniRoute is running!` print करते, परंतु प्रत्येक dashboard किंवा API request साठी फक्त `500 Internal Server Error` मिळतो. `~/.omniroute/logs/application/app.log` रिकामीच राहते, `APP_LOG_LEVEL=debug` कोणतीही उपयुक्त माहिती print करत नाही आणि response body मध्ये JSON तपशीलाविना साधा text (`Internal Server Error`) असतो.

**कारण:** काही Termux/Node builds मध्ये `process.platform === "android"` असे report होते. Next.js चे `getCacheDirectory()` हे platform हाताळत नाही: त्यासाठी `~/.cache` (किंवा generic tmp dir) _आधीपासून_ अस्तित्वात असणे आवश्यक आहे; अन्यथा instrumentation hook load करताना ते खालील error सह अयशस्वी होते:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Hook load होत नसल्यामुळे logging कधीच सुरू होत नाही — त्यामुळे 500 error चे निदान करणे पूर्णपणे अशक्य वाटते. Android/Termux वर ही तपासणी यशस्वी व्हावी म्हणून Next.js सुरू होण्यापूर्वी OmniRoute CLI entrypoint मध्ये `~/.cache` तयार करते (आणि `XDG_CACHE_HOME` set नसल्यास ते set करते).

**समर्थित उपाय (package patch न करता):**

```bash
mkdir -p ~/.cache
omniroute serve
```

सध्याच्या OmniRoute builds मध्ये CLI हे Android/Termux वर आपोआप करते — नवीन `npx -y omniroute@latest` / global install साठी ही manual पायरी आवश्यक नसावी. Upgrade केल्यानंतरही हा error दिसत असल्यास, वरीलप्रमाणे एकदा `~/.cache` तयार करा आणि पुन्हा सुरू करा.

`process.platform = "linux"` सक्तीने set करण्यासाठी `dist/server.js` ला patch **करू नका**. अशा प्रकारचा package patch प्रत्येक reinstall/upgrade वेळी overwrite होतो आणि cache directory अस्तित्वात आल्यानंतर तो अनावश्यक असतो.

### better-sqlite3 Build Errors

Termux build toolchain install करा:

```bash
pkg install nodejs python build-essential
```

त्यानंतर पुन्हा चालवा:

```bash
npx -y omniroute@latest
```

### Port आधीपासून वापरात आहे

Default port वर कोणते process listen करत आहे ते तपासा:

```bash
ss -ltnp | grep 20128
```

जुने process थांबवा:

```bash
pkill -f omniroute
```

### दुसऱ्या Device वरून Dashboard उपलब्ध होत नाही

दोन्ही devices एकाच WiFi network वर असल्याची खात्री करा आणि त्यानंतर Termux मधून तपासा:

```bash
curl http://localhost:20128
```

Local access कार्यरत असला तरी LAN access कार्यरत नसल्यास, Android hotspot/WiFi isolation आणि phone वरील कोणतेही firewall किंवा VPN profile तपासा.
