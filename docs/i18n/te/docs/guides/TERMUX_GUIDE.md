# Termux Headless Setup (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRouteను Termux ద్వారా Androidలో headless serverగా అమలు చేయవచ్చు. Electron desktop appకు Termuxలో మద్దతు లేదు, కానీ web dashboard మరియు OpenAI-compatible API స్థానిక browser నుండి లేదా అదే networkలోని ఇతర పరికరాల నుండి పనిచేస్తాయి.

## ముందస్తు అవసరాలు

F-Droid లేదా GitHub releases నుండి Termuxను ఇన్స్టాల్ చేసి, ఆపై packagesను నవీకరించి, `better-sqlite3` వంటి native dependenciesకు అవసరమైన build toolsను ఇన్స్టాల్ చేయండి.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js వెర్షన్:** OmniRouteకు Node `>=22.22.2 <23 || >=24.0.0 <27` అవసరం (`package.json` / `SUPPORTED_NODE_RANGE`లోని `engines`తో సరిపోలుతుంది). Termux యొక్క `nodejs-lts` సాధారణంగా Node 20 LTSను అందిస్తుంది, దీనికి **ఇకపై మద్దతు లేదు** — బదులుగా `pkg install nodejs` (ప్రస్తుత వెర్షన్)ను ఇన్స్టాల్ చేసి, `node --version` 22.x/24.x+ శ్రేణిని చూపుతుందని నిర్ధారించండి.

Native package compilation విఫలమైతే, పైన ఉన్న `pkg install` commandను మళ్లీ అమలు చేసి, ఆపై OmniRoute installationను తిరిగి ప్రయత్నించండి.

## ఇన్స్టాల్ చేయడం

తాజాగా ప్రచురించిన packageను నేరుగా అమలు చేయండి:

```bash
npx -y omniroute@latest
```

దీనిని globally కూడా ఇన్స్టాల్ చేయవచ్చు:

```bash
npm install -g omniroute
omniroute
```

## అమలు చేయడం

OmniRouteను headless server modeలో ప్రారంభించండి:

```bash
omniroute
```

లేదా:

```bash
npx omniroute
```

Dashboard ఈ చిరునామాలో అందుబాటులో ఉంటుంది:

```text
http://localhost:20128
```

Android browserలో ఆ URLను తెరవండి. మీరు Termux లోపల clientsను అమలు చేస్తే, OpenAI-compatible base URLగా అదే host మరియు portను ఉపయోగించండి.

## నేపథ్యంలో అమలు చేయడం

సాధారణ background process కోసం:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

దాన్ని ఆపడానికి:

```bash
pkill -f omniroute
```

పరికరం boot అయిన తర్వాత స్వయంచాలకంగా ప్రారంభించడానికి, Termux:Boot add-onను ఇన్స్టాల్ చేసి boot scriptను సృష్టించండి:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android battery optimization ఎక్కువసేపు నడిచే background processesను ఆపవచ్చు. Server నిరంతరం onlineలో ఉండాల్సి ఉంటే Termux కోసం battery optimizationను నిలిపివేయండి.

## ఇతర పరికరాల నుండి యాక్సెస్ చేయడం

WiFi networkలో phone IP addressను కనుగొనండి:

```bash
ip addr show wlan0
```

ఆపై మరో పరికరం నుండి dashboardను తెరవండి:

```text
http://PHONE_IP:20128
```

ఉదాహరణకు:

```text
http://192.168.1.50:20128
```

Phone మరియు clientను ఒకే విశ్వసనీయ networkలో ఉంచండి. మీరు OmniRouteను phone వెలుపల అందుబాటులో ఉంచితే, API keys మరియు dashboard authenticationను ప్రారంభించండి.

## Data Directory

Defaultగా OmniRoute, Linuxలో ఉపయోగించే అదే server-side data path ప్రవర్తనను అనుసరించి, Termux home directory కింద dataను నిల్వ చేస్తుంది. Databaseను నిర్దిష్ట ప్రదేశంలో ఉంచడానికి:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## పరిమితులు

- Electron Termuxలో అమలు కాదు.
- System tray లేదా desktop integration ఉండదు.
- ఈ setup server-only: browser dashboardను ఉపయోగించండి.
- Native dependenciesకు స్థానిక compilation అవసరం కావచ్చు.
- తక్కువ memory ఉన్న Android పరికరాల్లో concurrent requests సంఖ్యను తగ్గించాల్సి రావచ్చు.
- MITM/system certificate featuresకు Termux వెలుపల Android స్థాయి trust-store మార్పులు అవసరం కావచ్చు.

## సమస్య పరిష్కారం

### మద్దతు లేని platform: android (ప్రతి request HTTP 500ను అందిస్తుంది)

**లక్షణం:** `omniroute` / `omniroute serve` అనేది `✔ OmniRoute is running!` అని చూపిస్తుంది, కానీ ప్రతి dashboard లేదా API request సాధారణ `500 Internal Server Error`ను అందిస్తుంది. `~/.omniroute/logs/application/app.log` ఖాళీగా ఉంటుంది, `APP_LOG_LEVEL=debug` ఉపయోగకరమైనదేదీ చూపదు, అలాగే response body ఎలాంటి JSON వివరాలు లేకుండా plain text (`Internal Server Error`)గా ఉంటుంది.

**కారణం:** కొన్ని Termux/Node buildsలో `process.platform === "android"`గా నివేదించబడుతుంది. Next.js `getCacheDirectory()` ఆ platformను నిర్వహించదు: దీనికి `~/.cache` (లేదా సాధారణ tmp dir) _ఇప్పటికే_ ఉండాలి; లేకపోతే instrumentation hookను load చేస్తున్నప్పుడు ఈ errorతో విఫలమవుతుంది:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Hook load కాకపోవడం వల్ల logging ఎప్పటికీ ప్రారంభం కాదు — కాబట్టి 500 errorకు కారణాన్ని గుర్తించడం పూర్తిగా అసాధ్యంగా కనిపిస్తుంది. Android/Termuxలో ఈ probe విజయవంతం కావడానికి, Next.js ప్రారంభమయ్యే ముందు OmniRoute CLI entrypointలో `~/.cache` సృష్టిస్తుంది (మరియు `XDG_CACHE_HOME` సెట్ చేయబడి లేకపోతే దాన్ని సెట్ చేస్తుంది).

**మద్దతు ఉన్న పరిష్కారం (packageను patch చేయకుండా):**

```bash
mkdir -p ~/.cache
omniroute serve
```

ప్రస్తుత OmniRoute buildsలో CLI దీన్ని Android/Termuxపై స్వయంచాలకంగా చేస్తుంది — కొత్త `npx -y omniroute@latest` / global installationకు manual step అవసరం ఉండకూడదు. Upgrade చేసిన తర్వాత కూడా ఈ error కనిపిస్తే, పైన చూపిన విధంగా `~/.cache`ను ఒక్కసారి సృష్టించి restart చేయండి.

`process.platform = "linux"`గా బలవంతంగా మార్చడానికి `dist/server.js`ను patch **చేయవద్దు**. అలాంటి package patch ప్రతి reinstall/upgrade సమయంలో overwrite అవుతుంది; cache directory ఉన్న తర్వాత అది అవసరం లేదు.

### better-sqlite3 Build Errors

Termux build toolchainను ఇన్స్టాల్ చేయండి:

```bash
pkg install nodejs python build-essential
```

ఆపై మళ్లీ అమలు చేయండి:

```bash
npx -y omniroute@latest
```

### Port ఇప్పటికే ఉపయోగంలో ఉంది

Default portపై ఏది listen చేస్తోందో తనిఖీ చేయండి:

```bash
ss -ltnp | grep 20128
```

పాత processను ఆపండి:

```bash
pkill -f omniroute
```

### మరో పరికరం నుండి Dashboardను చేరుకోలేకపోవడం

రెండు పరికరాలు ఒకే WiFi networkలో ఉన్నాయని నిర్ధారించుకుని, ఆపై Termux నుండి పరీక్షించండి:

```bash
curl http://localhost:20128
```

Local access పనిచేస్తూ LAN access పనిచేయకపోతే, Android hotspot/WiFi isolationను మరియు phoneలోని ఏదైనా firewall లేదా VPN profileను తనిఖీ చేయండి.
