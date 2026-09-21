# Termux Headless Setup (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute-ന് Termux വഴി Android-ൽ ഹെഡ്ലെസ് സെർവറായി പ്രവർത്തിക്കാനാകും. Electron ഡെസ്ക്ടോപ്പ് ആപ്പ് Termux-ൽ പിന്തുണയ്ക്കുന്നില്ല, എന്നാൽ വെബ് ഡാഷ്ബോർഡും OpenAI-അനുയോജ്യമായ API-യും ലോക്കൽ ബ്രൗസറിൽ നിന്നോ അതേ നെറ്റ്വർക്കിലുള്ള മറ്റ് ഉപകരണങ്ങളിൽ നിന്നോ ഉപയോഗിക്കാം.

## മുൻവ്യവസ്ഥകൾ

F-Droid അല്ലെങ്കിൽ GitHub റിലീസുകളിൽ നിന്ന് Termux ഇൻസ്റ്റാൾ ചെയ്യുക. തുടർന്ന് പാക്കേജുകൾ അപ്ഡേറ്റ് ചെയ്ത് `better-sqlite3` പോലുള്ള നേറ്റീവ് ഡിപെൻഡൻസികൾക്ക് ആവശ്യമായ ബിൽഡ് ടൂളുകൾ ഇൻസ്റ്റാൾ ചെയ്യുക.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js പതിപ്പ്:** OmniRoute-ന് Node `>=22.22.2 <23 || >=24.0.0 <27` ആവശ്യമാണ് (`package.json` / `SUPPORTED_NODE_RANGE` എന്നതിലെ `engines`-മായി പൊരുത്തപ്പെടുന്നു). Termux-ന്റെ `nodejs-lts` സാധാരണയായി Node 20 LTS ആണ് നൽകുന്നത്, അത് **ഇനി പിന്തുണയ്ക്കുന്നില്ല** — പകരം `pkg install nodejs` (നിലവിലെ പതിപ്പ്) ഇൻസ്റ്റാൾ ചെയ്ത് `node --version` ഒരു 22.x/24.x+ പതിപ്പ് കാണിക്കുന്നുണ്ടെന്ന് സ്ഥിരീകരിക്കുക.

നേറ്റീവ് പാക്കേജ് കംപൈലേഷൻ പരാജയപ്പെടുകയാണെങ്കിൽ, മുകളിലുള്ള `pkg install` കമാൻഡ് വീണ്ടും പ്രവർത്തിപ്പിച്ച ശേഷം OmniRoute ഇൻസ്റ്റാളേഷൻ വീണ്ടും ശ്രമിക്കുക.

## ഇൻസ്റ്റാൾ ചെയ്യുക

ഏറ്റവും പുതിയ പ്രസിദ്ധീകരിച്ച പാക്കേജ് നേരിട്ട് പ്രവർത്തിപ്പിക്കുക:

```bash
npx -y omniroute@latest
```

ഇത് ഗ്ലോബലായും ഇൻസ്റ്റാൾ ചെയ്യാം:

```bash
npm install -g omniroute
omniroute
```

## പ്രവർത്തിപ്പിക്കുക

ഹെഡ്ലെസ് സെർവർ മോഡിൽ OmniRoute ആരംഭിക്കുക:

```bash
omniroute
```

അല്ലെങ്കിൽ:

```bash
npx omniroute
```

ഡാഷ്ബോർഡ് ലഭ്യമാകുന്ന വിലാസം:

```text
http://localhost:20128
```

Android ബ്രൗസറിൽ ആ URL തുറക്കുക. Termux-നുള്ളിൽ ക്ലയന്റുകൾ പ്രവർത്തിപ്പിക്കുകയാണെങ്കിൽ, OpenAI-അനുയോജ്യമായ ബേസ് URL ആയി അതേ ഹോസ്റ്റും പോർട്ടും ഉപയോഗിക്കുക.

## പശ്ചാത്തലത്തിൽ പ്രവർത്തിപ്പിക്കൽ

ലളിതമായ ഒരു പശ്ചാത്തല പ്രോസസിനായി:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

അത് നിർത്താൻ:

```bash
pkill -f omniroute
```

ഉപകരണം ബൂട്ട് ചെയ്തതിന് ശേഷം സ്വയമേവ ആരംഭിക്കാൻ, Termux:Boot ആഡ്-ഓൺ ഇൻസ്റ്റാൾ ചെയ്ത് ഒരു ബൂട്ട് സ്ക്രിപ്റ്റ് സൃഷ്ടിക്കുക:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android ബാറ്ററി ഒപ്റ്റിമൈസേഷൻ ദീർഘനേരം പ്രവർത്തിക്കുന്ന പശ്ചാത്തല പ്രോസസുകൾ നിർത്തിയേക്കാം. സെർവർ ഓൺലൈനായി തുടരേണ്ടതുണ്ടെങ്കിൽ Termux-നുള്ള ബാറ്ററി ഒപ്റ്റിമൈസേഷൻ പ്രവർത്തനരഹിതമാക്കുക.

## മറ്റ് ഉപകരണങ്ങളിൽ നിന്ന് ആക്സസ് ചെയ്യുക

WiFi നെറ്റ്വർക്കിലെ ഫോണിന്റെ IP വിലാസം കണ്ടെത്തുക:

```bash
ip addr show wlan0
```

തുടർന്ന് മറ്റൊരു ഉപകരണത്തിൽ നിന്ന് ഡാഷ്ബോർഡ് തുറക്കുക:

```text
http://PHONE_IP:20128
```

ഉദാഹരണത്തിന്:

```text
http://192.168.1.50:20128
```

ഫോണും ക്ലയന്റും ഒരേ വിശ്വസനീയ നെറ്റ്വർക്കിൽ നിലനിർത്തുക. OmniRoute ഫോണിന് പുറത്തേക്ക് ലഭ്യമാക്കുകയാണെങ്കിൽ, API കീകളും ഡാഷ്ബോർഡ് പ്രാമാണീകരണവും പ്രവർത്തനക്ഷമമാക്കുക.

## ഡാറ്റ ഡയറക്ടറി

ഡിഫോൾട്ടായി, Linux-ൽ ഉപയോഗിക്കുന്ന അതേ സെർവർ-സൈഡ് ഡാറ്റ പാത്ത് സ്വഭാവം പിന്തുടർന്ന് OmniRoute ഡാറ്റ Termux ഹോം ഡയറക്ടറിയിൽ സംഭരിക്കുന്നു. ഡാറ്റാബേസ് വ്യക്തമായി നിർദിഷ്ടമായ മറ്റൊരു സ്ഥലത്ത് സൂക്ഷിക്കാൻ:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## പരിമിതികൾ

- Electron Termux-ൽ പ്രവർത്തിക്കില്ല.
- സിസ്റ്റം ട്രേയോ ഡെസ്ക്ടോപ്പ് ഇന്റഗ്രേഷനോ ഇല്ല.
- ഈ സജ്ജീകരണം സെർവർ-മാത്രമാണ്: ബ്രൗസർ ഡാഷ്ബോർഡ് ഉപയോഗിക്കുക.
- നേറ്റീവ് ഡിപെൻഡൻസികൾക്ക് ലോക്കൽ കംപൈലേഷൻ ആവശ്യമായി വന്നേക്കാം.
- കുറഞ്ഞ മെമ്മറിയുള്ള Android ഉപകരണങ്ങളിൽ ഒരേസമയം നടത്തുന്ന അഭ്യർത്ഥനകളുടെ എണ്ണം കുറയ്ക്കേണ്ടി വന്നേക്കാം.
- MITM/സിസ്റ്റം സർട്ടിഫിക്കറ്റ് സവിശേഷതകൾക്ക് Termux-ന് പുറത്തുള്ള Android-തല ട്രസ്റ്റ്-സ്റ്റോർ ക്രമീകരണം ആവശ്യമായി വന്നേക്കാം.

## പ്രശ്നപരിഹാരം

### പിന്തുണയ്ക്കാത്ത പ്ലാറ്റ്ഫോം: android (എല്ലാ അഭ്യർത്ഥനകൾക്കും HTTP 500 ലഭിക്കുന്നു)

**ലക്ഷണം:** `omniroute` / `omniroute serve` എന്നത് `✔ OmniRoute is running!` എന്ന് പ്രിന്റ് ചെയ്യുന്നു, എന്നാൽ എല്ലാ ഡാഷ്ബോർഡ് അല്ലെങ്കിൽ API അഭ്യർത്ഥനകളും വിശദാംശങ്ങളില്ലാത്ത `500 Internal Server Error` മടക്കുന്നു. `~/.omniroute/logs/application/app.log` ശൂന്യമായി തുടരുന്നു, `APP_LOG_LEVEL=debug` ഉപയോഗിച്ചാലും പ്രയോജനകരമായ ഒന്നും പ്രിന്റ് ചെയ്യുന്നില്ല, കൂടാതെ റെസ്പോൺസ് ബോഡി JSON വിശദാംശങ്ങളില്ലാതെ പ്ലെയിൻ ടെക്സ്റ്റായി (`Internal Server Error`) ലഭിക്കുന്നു.

**കാരണം:** ചില Termux/Node ബിൽഡുകൾ `process.platform === "android"` എന്ന് റിപ്പോർട്ട് ചെയ്യുന്നു. Next.js-ന്റെ `getCacheDirectory()` ആ പ്ലാറ്റ്ഫോം കൈകാര്യം ചെയ്യുന്നില്ല: `~/.cache` (അല്ലെങ്കിൽ ഒരു ജനറിക് tmp ഡയറക്ടറി) _നേരത്തേ_ നിലവിലുണ്ടാകണം; അല്ലാത്തപക്ഷം ഇൻസ്ട്രുമെന്റേഷൻ ഹുക്ക് ലോഡ് ചെയ്യുമ്പോൾ താഴെപ്പറയുന്ന പിശകോടെ അത് പരാജയപ്പെടും:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

ഹുക്ക് ഒരിക്കലും ലോഡ് ചെയ്യാത്തതിനാൽ ലോഗിംഗ് ആരംഭിക്കുകയുമില്ല — അതുകൊണ്ട് 500-ന്റെ കാരണം കണ്ടെത്തുന്നത് പൂർണ്ണമായും അസാധ്യമെന്ന് തോന്നും. Android/Termux-ൽ ഈ പരിശോധന വിജയിക്കുന്നതിനായി Next.js ആരംഭിക്കുന്നതിന് മുമ്പ് CLI എൻട്രിപോയിന്റിൽ OmniRoute `~/.cache` സൃഷ്ടിക്കുകയും (`XDG_CACHE_HOME` സജ്ജീകരിച്ചിട്ടില്ലെങ്കിൽ അത് സജ്ജീകരിക്കുകയും) ചെയ്യുന്നു.

**പിന്തുണയ്ക്കുന്ന പരിഹാരം (പാക്കേജ് പാച്ച് ചെയ്യേണ്ടതില്ല):**

```bash
mkdir -p ~/.cache
omniroute serve
```

നിലവിലെ OmniRoute ബിൽഡുകളിൽ Android/Termux-ൽ CLI ഇത് സ്വയമേവ ചെയ്യുന്നു — പുതിയ `npx -y omniroute@latest` / ഗ്ലോബൽ ഇൻസ്റ്റാളിന് ഈ മാനുവൽ ഘട്ടം ആവശ്യമായി വരരുത്. അപ്ഗ്രേഡ് ചെയ്തിട്ടും ഈ പിശക് തുടരുകയാണെങ്കിൽ, മുകളിൽ കാണിച്ചതുപോലെ ഒരിക്കൽ `~/.cache` സൃഷ്ടിച്ച് പുനരാരംഭിക്കുക.

`process.platform = "linux"` നിർബന്ധമാക്കാൻ `dist/server.js` പാച്ച് **ചെയ്യരുത്**. അത്തരം പാക്കേജ് പാച്ച് ഓരോ റീഇൻസ്റ്റാളിലും/അപ്ഗ്രേഡിലും തിരുത്തിയെഴുതപ്പെടും; കാഷ് ഡയറക്ടറി നിലവിലുണ്ടെങ്കിൽ അത് ആവശ്യമില്ല.

### better-sqlite3 ബിൽഡ് പിശകുകൾ

Termux ബിൽഡ് ടൂൾചെയിൻ ഇൻസ്റ്റാൾ ചെയ്യുക:

```bash
pkg install nodejs python build-essential
```

തുടർന്ന് വീണ്ടും പ്രവർത്തിപ്പിക്കുക:

```bash
npx -y omniroute@latest
```

### പോർട്ട് ഇതിനകം ഉപയോഗത്തിലാണ്

ഡിഫോൾട്ട് പോർട്ടിൽ എന്താണ് ശ്രവിക്കുന്നതെന്ന് പരിശോധിക്കുക:

```bash
ss -ltnp | grep 20128
```

പഴയ പ്രോസസ് നിർത്തുക:

```bash
pkill -f omniroute
```

### മറ്റൊരു ഉപകരണത്തിൽ നിന്ന് ഡാഷ്ബോർഡ് ലഭ്യമാകുന്നില്ല

രണ്ട് ഉപകരണങ്ങളും ഒരേ WiFi നെറ്റ്വർക്കിലാണെന്ന് സ്ഥിരീകരിച്ച്, തുടർന്ന് Termux-ൽ നിന്ന് പരിശോധിക്കുക:

```bash
curl http://localhost:20128
```

ലോക്കൽ ആക്സസ് പ്രവർത്തിക്കുകയും LAN ആക്സസ് പ്രവർത്തിക്കാതിരിക്കുകയും ചെയ്യുന്നുവെങ്കിൽ, Android ഹോട്ട്സ്പോട്ട്/WiFi ഐസൊലേഷനും ഫോണിലെ ഏതെങ്കിലും ഫയർവാൾ അല്ലെങ്കിൽ VPN പ്രൊഫൈലും പരിശോധിക്കുക.
