# Termux Headless Setup (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute ကို Termux မှတစ်ဆင့် Android ပေါ်တွင် headless server အဖြစ် အသုံးပြုနိုင်သည်။ Electron desktop app ကို Termux တွင် မပံ့ပိုးသော်လည်း web dashboard နှင့် OpenAI-compatible API ကို စက်တွင်း browser သို့မဟုတ် တူညီသော network ပေါ်ရှိ အခြားစက်များမှ အသုံးပြုနိုင်သည်။

## ကြိုတင်လိုအပ်ချက်များ

Termux ကို F-Droid သို့မဟုတ် GitHub releases မှ install လုပ်ပါ။ ထို့နောက် package များကို update လုပ်ပြီး `better-sqlite3` ကဲ့သို့သော native dependency များအတွက် လိုအပ်သည့် build tool များကို install လုပ်ပါ။

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js version:** OmniRoute သည် Node `>=22.22.2 <23 || >=24.0.0 <27` ကို လိုအပ်သည် (`package.json` ရှိ `engines` / `SUPPORTED_NODE_RANGE` နှင့် ကိုက်ညီသည်)။ Termux ၏ `nodejs-lts` တွင် ပုံမှန်အားဖြင့် Node 20 LTS ပါဝင်ပြီး ၎င်းကို **မပံ့ပိုးတော့ပါ** — ထို့ကြောင့် `pkg install nodejs` (လက်ရှိဗားရှင်း) ကို install လုပ်ပြီး `node --version` က 22.x/24.x+ ဗားရှင်းလိုင်းကို ပြသကြောင်း စစ်ဆေးပါ။

Native package compilation မအောင်မြင်ပါက အထက်ပါ `pkg install` command ကို ထပ်မံ run ပြီးနောက် OmniRoute ကို ပြန်လည် install လုပ်ပါ။

## Install လုပ်ခြင်း

နောက်ဆုံးထုတ်ဝေထားသော package ကို တိုက်ရိုက် run ပါ။

```bash
npx -y omniroute@latest
```

၎င်းကို global အနေဖြင့်လည်း install လုပ်နိုင်သည်။

```bash
npm install -g omniroute
omniroute
```

## Run ခြင်း

OmniRoute ကို headless server mode ဖြင့် စတင်ပါ။

```bash
omniroute
```

သို့မဟုတ်-

```bash
npx omniroute
```

Dashboard သည် အောက်ပါလိပ်စာတွင် ချိတ်ဆက်မှုများကို စောင့်ဆိုင်းသည်။

```text
http://localhost:20128
```

ထို URL ကို Android browser တွင် ဖွင့်ပါ။ Client များကို Termux အတွင်း run ပါက OpenAI-compatible base URL အဖြစ် တူညီသော host နှင့် port ကို အသုံးပြုပါ။

## နောက်ခံတွင် Run ခြင်း

ရိုးရှင်းသော နောက်ခံ process တစ်ခုအတွက်-

```bash
nohup omniroute > omniroute.log 2>&1 &
```

၎င်းကို ရပ်တန့်ရန်-

```bash
pkill -f omniroute
```

စက် boot တက်ပြီးနောက် အလိုအလျောက် စတင်စေရန် Termux:Boot add-on ကို install လုပ်ပြီး boot script တစ်ခု ဖန်တီးပါ။

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android battery optimization ကြောင့် အချိန်ကြာမြင့်စွာ run နေသည့် နောက်ခံ process များ ရပ်တန့်သွားနိုင်သည်။ Server ကို အမြဲ online ထားရန်လိုအပ်ပါက Termux အတွက် battery optimization ကို ပိတ်ထားပါ။

## အခြားစက်များမှ ဝင်ရောက်အသုံးပြုခြင်း

WiFi network ပေါ်ရှိ ဖုန်း၏ IP address ကို ရှာပါ။

```bash
ip addr show wlan0
```

ထို့နောက် အခြားစက်တစ်ခုမှ dashboard ကို ဖွင့်ပါ။

```text
http://PHONE_IP:20128
```

ဥပမာ-

```text
http://192.168.1.50:20128
```

ဖုန်းနှင့် client ကို ယုံကြည်စိတ်ချရသော တူညီသည့် network ပေါ်တွင် ထားပါ။ OmniRoute ကို ဖုန်းပြင်ပသို့ ဖွင့်ပေးထားပါက API key များနှင့် dashboard authentication ကို ဖွင့်ထားပါ။

## Data Directory

ပုံသေအားဖြင့် OmniRoute သည် Linux တွင် အသုံးပြုသည့် server-side data path အပြုအမူအတိုင်း Termux home directory အောက်တွင် data များကို သိမ်းဆည်းသည်။ Database ကို သတ်မှတ်ထားသော နေရာတစ်ခုတွင် ထားရှိရန်-

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## ကန့်သတ်ချက်များ

- Electron ကို Termux တွင် run မရပါ။
- System tray သို့မဟုတ် desktop integration မရှိပါ။
- ဤ setup သည် server-only ဖြစ်သည်။ Browser dashboard ကို အသုံးပြုပါ။
- Native dependency များကို စက်တွင်း၌ compile လုပ်ရန် လိုအပ်နိုင်သည်။
- Memory နည်းသော Android စက်များတွင် တစ်ပြိုင်နက်တည်း request အရေအတွက်ကို လျှော့ချရန် လိုအပ်နိုင်သည်။
- MITM/system certificate feature များအတွက် Termux ပြင်ပရှိ Android-level trust-store ကို ပြင်ဆင်ရန် လိုအပ်နိုင်သည်။

## ပြဿနာဖြေရှင်းခြင်း

### မပံ့ပိုးသော platform: android (request တိုင်း HTTP 500 ပြန်လာခြင်း)

**လက္ခဏာ:** `omniroute` / `omniroute serve` က `✔ OmniRoute is running!` ဟု ပြသသော်လည်း dashboard သို့မဟုတ် API request တိုင်းသည် အချက်အလက်ထပ်မပါသော `500 Internal Server Error` ကို ပြန်ပေးသည်။ `~/.omniroute/logs/application/app.log` သည် ဗလာဖြစ်နေပြီး `APP_LOG_LEVEL=debug` က အသုံးဝင်သည့်အရာတစ်ခုမျှ မပြသသည့်အပြင် response body သည် JSON အသေးစိတ်အချက်အလက်မပါသော ရိုးရိုးစာသား (`Internal Server Error`) သာ ဖြစ်နေသည်။

**အကြောင်းရင်း:** အချို့ Termux/Node build များတွင် `process.platform === "android"` ဟု ဖော်ပြသည်။ Next.js `getCacheDirectory()` သည် ထို platform ကို မကိုင်တွယ်နိုင်ပါ။ ၎င်းသည် `~/.cache` (သို့မဟုတ် ယေဘုယျ tmp dir တစ်ခု) ကို _ကြိုတင်_ ဖန်တီးထားရန် လိုအပ်ပြီး မရှိပါက instrumentation hook ကို load လုပ်နေစဉ် အောက်ပါ error ဖြင့် မအောင်မြင်ပါ။

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Hook ကို လုံးဝ load မလုပ်နိုင်သောကြောင့် logging သည်လည်း မစတင်နိုင်ပါ — ထို့ကြောင့် 500 error ကို ဖြစ်ရသည့်အကြောင်းရင်း ရှာမရသကဲ့သို့ ဖြစ်နေသည်။ Android/Termux တွင် ဤစစ်ဆေးမှု အောင်မြင်စေရန် OmniRoute သည် Next.js မစတင်မီ CLI entrypoint ထဲတွင် `~/.cache` ကို ဖန်တီးပေးပြီး `XDG_CACHE_HOME` ကို မသတ်မှတ်ရသေးပါက သတ်မှတ်ပေးသည်။

**ပံ့ပိုးထားသော ဖြေရှင်းနည်း (package ကို patch လုပ်ရန်မလို):**

```bash
mkdir -p ~/.cache
omniroute serve
```

လက်ရှိ OmniRoute build များတွင် CLI သည် Android/Termux ပေါ်၌ ဤလုပ်ဆောင်ချက်ကို အလိုအလျောက် ပြုလုပ်ပေးသည် — အသစ် run သည့် `npx -y omniroute@latest` / global install တွင် ဤအဆင့်ကို ကိုယ်တိုင်လုပ်ရန် မလိုအပ်သင့်ပါ။ Upgrade လုပ်ပြီးနောက် error ကို တွေ့နေရဆဲဖြစ်ပါက အထက်ပါအတိုင်း `~/.cache` ကို တစ်ကြိမ်ဖန်တီးပြီး ပြန်လည်စတင်ပါ။

`process.platform = "linux"` ကို အတင်းသတ်မှတ်ရန် `dist/server.js` ကို **မပြင်ဆင်ပါနှင့်**။ ထိုကဲ့သို့သော package patch သည် reinstall/upgrade ပြုလုပ်တိုင်း overwrite ဖြစ်သွားမည်ဖြစ်ပြီး cache directory ရှိပြီးသည်နှင့် မလိုအပ်တော့ပါ။

### better-sqlite3 Build Error များ

Termux build toolchain ကို install လုပ်ပါ။

```bash
pkg install nodejs python build-essential
```

ထို့နောက် အောက်ပါ command ကို ပြန် run ပါ။

```bash
npx -y omniroute@latest
```

### Port ကို အသုံးပြုနေပြီးဖြစ်ခြင်း

ပုံသေ port ပေါ်တွင် မည်သည့် process က ချိတ်ဆက်မှုများကို စောင့်ဆိုင်းနေသည်ကို စစ်ဆေးပါ။

```bash
ss -ltnp | grep 20128
```

Process အဟောင်းကို ရပ်တန့်ပါ။

```bash
pkill -f omniroute
```

### အခြားစက်မှ Dashboard ကို ဝင်ရောက်၍မရခြင်း

စက်နှစ်ခုစလုံးသည် တူညီသော WiFi network ပေါ်တွင် ရှိကြောင်း စစ်ဆေးပြီးနောက် Termux မှ စမ်းသပ်ပါ။

```bash
curl http://localhost:20128
```

စက်တွင်းမှ ဝင်ရောက်အသုံးပြုနိုင်သော်လည်း LAN မှ ဝင်ရောက်၍မရပါက Android hotspot/WiFi isolation နှင့် ဖုန်းပေါ်ရှိ firewall သို့မဟုတ် VPN profile များကို စစ်ဆေးပါ။
