# Electron Desktop Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **အမှန်တရား၏ မူရင်းရင်းမြစ်:** `electron/` workspace
> **နောက်ဆုံးအပ်ဒိတ်လုပ်ခဲ့သည့်ရက်:** 2026-06-28 — v3.8.40

OmniRoute တွင် **Electron 41** + **electron-builder 26.10** ဖြင့် တည်ဆောက်ထားသည့် ပလက်ဖောင်းစုံ desktop app (Windows / macOS / Linux) ပါဝင်သည်။ Desktop app သည် Next.js standalone server ကို child process အဖြစ် စတင်ပေးပြီး `BrowserWindow` ကို ထို server သို့ ညွှန်ပေးကာ system tray၊ auto-updater၊ IPC bridge နှင့် configuration မလိုအပ်သော secret bootstrap တို့ကို ထည့်သွင်းပေးသည်။

## ဗိသုကာဖွဲ့စည်းပုံ

```
┌──────────────────────────────────────────────────┐
│ Electron main process (electron/main.js)         │
│ ├─ တစ်ခုတည်းသော instance lock                    │
│ ├─ Child process: Next.js standalone server      │
│ │   (Electron ၏ Node runtime ဖြင့် စတင်ထားသည်)   │
│ ├─ BrowserWindow → http://localhost:PORT         │
│ ├─ System tray + context menu                    │
│ ├─ electron-updater မှတစ်ဆင့် auto-update        │
│ ├─ Content Security Policy (session headers)     │
│ └─ Secret bootstrap (JWT / API_KEY_SECRET)       │
└──────────────────────────────────────────────────┘
            ↕ IPC bridge (electron/preload.js)
┌──────────────────────────────────────────────────┐
│ Renderer (Next.js dashboard)                     │
│   window.electronAPI.* (contextIsolation)        │
└──────────────────────────────────────────────────┘
```

## ဗားရှင်းများ

`electron/package.json` မှ အတည်ပြုထားသည်-

| Package            | ဗားရှင်း                                                                  |
| ------------------ | ------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                 |
| `electron-builder` | `^26.15.3`                                                                |
| `electron-updater` | `^6.8.9`                                                                  |
| `better-sqlite3`   | root `^13.0.2` (Node-API ကြိုတင် build များ — Electron rebuild မလိုအပ်ပါ) |
| App ဗားရှင်း       | `3.8.0`                                                                   |
| App id             | `online.omniroute.desktop`                                                |
| ထုတ်ကုန်အမည်       | `OmniRoute`                                                               |

## Script များ (root `package.json`)

| Script                            | ရည်ရွယ်ချက်                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` ကို စတင်ပြီး `localhost:20128` ကို စောင့်ကာ Electron ကို ဖွင့်ပေးသည်          |
| `npm run electron:build`          | Next.js ကို build လုပ်ပြီးနောက် လက်ရှိ OS အတွက် `electron-builder` ကို run သည်              |
| `npm run electron:build:win`      | Windows NSIS installer + portable (x64) ကို build လုပ်သည်                                   |
| `npm run electron:build:mac`      | macOS DMG (Intel + Apple Silicon) ကို build လုပ်သည်                                         |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) ကို build လုပ်သည်                                        |
| `npm run electron:smoke:packaged` | Package လုပ်ထားသည့် binary ကို ဖွင့်ပြီး `/login` တွင် HTTP 200 ရှိမရှိ စစ်ဆေးကာ ပိတ်ပေးသည် |

`electron/` workspace တွင် အောက်ပါတို့ကိုလည်း အသုံးပြုနိုင်သည်-

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` ကို run သည်
- `npm run build:mac-x64` / `build:mac-arm64` — architecture တစ်မျိုးတည်းအတွက် macOS build များ
- `npm run pack` — စက်တွင်းစမ်းသပ်မှုအတွက် directory သီးသန့် build (installer မပါဝင်ပါ)

## ဖိုင်လမ်းညွှန် ဖွဲ့စည်းပုံ

```
electron/
├── package.json              # Electron dependencies များ + electron-builder ဖွဲ့စည်းသတ်မှတ်ချက်
├── main.js                   # ပင်မ process (24 KB — အောက်ပါ မှတ်ချက်များကို ကြည့်ပါ)
├── preload.js                # contextBridge IPC bridge
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI type များ
├── README.md                 # Workspace အတွင်းရှိ မှတ်စုများ
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder output (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone bundle ကို ပြင်ဆင်ပေးသည်
└── dev/
    └── smoke-electron-packaged.mjs       # Build ပြီးနောက် smoke test
```

`main.js` နှင့် `preload.js` နှစ်ခုစလုံးသည် TypeScript မဟုတ်ဘဲ **CommonJS `.js` ဖိုင်များ** ဖြစ်သည်။
Renderer ဘက်ခြမ်း typing များသည် `electron/types.d.ts` တွင် ရှိသည်။

## IPC Bridge (`preload.js`)

Preload သည် `contextIsolation: true` နှင့် `nodeIntegration: false` ကို အသုံးပြုပြီး `contextBridge`
မှတစ်ဆင့် ခွင့်ပြုစာရင်းသွင်းထားသော API တစ်ခုကို `window.electronAPI` ပေါ်တွင် ဖော်ထုတ်ပေးသည်။

```javascript
const VALID_CHANNELS = {
  invoke: [
    "get-app-info",
    "open-external",
    "get-data-dir",
    "restart-server",
    "check-for-updates",
    "download-update",
    "install-update",
    "get-app-version",
  ],
  send: ["window-minimize", "window-maximize", "window-close"],
  receive: ["server-status", "port-changed", "update-status"],
};
```

ဖော်ထုတ်ပေးထားသော method များ-

| Renderer ခေါ်ဆိုမှု                                               | အမျိုးအစား                        |
| ----------------------------------------------------------------- | --------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                            |
| `openExternal(url)`                                               | invoke                            |
| `getDataDir()`                                                    | invoke                            |
| `restartServer()`                                                 | invoke                            |
| `getAppVersion()`                                                 | invoke                            |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                            |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                              |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (disposer ကို ပြန်ပေးသည်) |

Receive helper များသည် `removeAllListeners` ကို အားကိုးမည့်အစား **disposer function** တစ်ခုကို ပြန်ပေးသည် — ဤနည်းဖြင့် React component များ ပြန်လည် mount လုပ်သောအခါ listener များ စုပုံလာခြင်းကို တားဆီးပေးသည်။

## Server အသက်တာစက်ဝန်း

`main.js` သည် system Node နှင့် native-module ABI မကိုက်ညီမှုကို ရှောင်ရှားရန် Next.js standalone bundle ကို Electron Node runtime ဖြင့် တိုက်ရိုက် spawn လုပ်သည်-

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: {
    ...serverEnv,
    PORT,
    NODE_ENV: "production",
    ELECTRON_RUN_AS_NODE: "1",
    NODE_PATH,
  },
  stdio: "pipe",
});
```

အဓိကအချက်များ-

- `waitForServer()` သည် window ကို မပြမီ URL ကို 30 s အထိ အကြိမ်ကြိမ် စစ်ဆေးသည် (cold start တွင် မျက်နှာပြင်အလွတ် မပေါ်စေပါ)။
- `stdio: "pipe"` သည် stdout/stderr ကို ဖမ်းယူသည်။ အဆင်သင့်ဖြစ်ကြောင်း ဖော်ပြသည့် စကားစုများ (`Ready` / `listening`) တွေ့ရှိပါက IPC မှတစ်ဆင့် `server-status: running` ကို ထုတ်လွှင့်သည်။
- `before-quit` သည် ပုံမှန် SIGTERM (WAL checkpoint) ဖြင့် ပိတ်ရန် 5 s အထိ စောင့်ဆိုင်းပြီးနောက် SIGKILL ကို ပေးပို့သည်။
- Tray ရှိ port switcher (`20128`, `3000`, `8080`) သည် server ကို ရပ်တန့်ပြီး ပြန်လည်စတင်ကာ BrowserWindow ကို ပြန်လည် load လုပ်သည်။

## ဖွဲ့စည်းသတ်မှတ်ရန်မလိုသော လျှို့ဝှက်တန်ဖိုး စတင်ပြင်ဆင်ခြင်း

ပထမဆုံး စတင်ဖွင့်လှစ်ချိန်တွင် ပင်မ process သည် မရှိသေးသော လျှို့ဝှက်တန်ဖိုးများကို အလိုအလျောက်ထုတ်လုပ်ပြီး အမြဲတမ်းသိမ်းဆည်းထားသည်-

| လျှို့ဝှက်တန်ဖိုး        | ရင်းမြစ်                                                                                          |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                          |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (ကုဒ်ဝှက်ထားသော အထောက်အထားများ ရှိနှင့်ပြီးပါက လက်မခံပါ) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                          |

`<DATA_DIR>/server.env` တွင် အမြဲတမ်းသိမ်းဆည်းထားသည်။ `DATA_DIR` ကို အောက်ပါအတိုင်း သတ်မှတ်ဖြေရှင်းသည်-

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` သို့မဟုတ် `~/.omniroute`
- macOS: `~/.omniroute`

## Environment ဖိုင် ရှာဖွေခြင်း

ဆာဗာကို စတင်မဖွင့်မီ ပင်မ process (`electron/main.js` ထဲရှိ `getPreferredEnvFilePath()`) သည် အောက်ပါတို့အနက် ရှိနေသော ပထမဆုံး `.env` ဖိုင် **တစ်ခုတည်း** ကို ရွေးချယ်သည်။

1. အက်ပ်ကို စတင်ဖွင့်လှစ်ခဲ့သည့် environment တွင် `DATA_DIR` ကို သတ်မှတ်ထားပါက `$DATA_DIR/.env`။
2. အထက်ပါ မူလတန်ဖိုးများကိုပင် အသုံးပြုသည့် `<resolved DATA_DIR>/.env`- Windows တွင်
   `%APPDATA%\omniroute\.env`၊ Linux နှင့် macOS တွင် `$XDG_CONFIG_HOME/omniroute/.env` သို့မဟုတ် `~/.omniroute/.env`။
3. Process ၏ အလုပ်လုပ်နေသော directory ထဲရှိ `.env`။

ပင်မ process သည် ထိုဖိုင်တစ်ခုတည်းကိုသာ ဖတ်ပြီး နောက်ပိုင်းရှိ candidate ဖိုင်များကို ပေါင်းစည်းခြင်း မပြုပါ။ ထို့နောက် ဆာဗာ
environment ကို အောက်ပါ ဦးစားပေးအစီအစဉ်အတိုင်း တည်ဆောက်သည် (အမြင့်ဆုံးကို ဦးစွာဖော်ပြထားသည်)-

1. Electron process environment (အက်ပ်ကို စတင်ဖွင့်လှစ်ပေးသည့်အရာမှ ဆက်ခံရရှိသော variable များ)။
2. ရွေးချယ်ထားသော `.env` ဖိုင်။
3. `<DATA_DIR>/server.env` (အထက်ပါ bootstrap လျှို့ဝှက်တန်ဖိုးများ)။

အက်ပ် စတင်ချိန်တွင် process environment ကို ဖမ်းယူထားသောကြောင့် အက်ပ် လည်ပတ်နေစဉ်အတွင်း
သတ်မှတ်လိုက်သော system သို့မဟုတ် user environment variable သည် (၎င်း၏ window ကို ပိတ်ပြီးနောက် tray ထဲတွင်
ရှိနေသည့်အချိန်အပါအဝင်) အက်ပ်ကို အပြည့်အဝ ပိတ်ပြီး ပြန်လည်ဖွင့်လှစ်သည်အထိ ဆာဗာသို့ မရောက်ရှိပါ။ `CONTEXT_LENGTH_<PROVIDER>` ကဲ့သို့သော
runtime ချိန်ညှိချက်များအတွက် ([Environment Variables: Provider တစ်ခုချင်းစီအလိုက် context အလျား](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)
ကို ကြည့်ပါ) `.env` ဖိုင်ကို ဦးစားပေးအသုံးပြုပြီးနောက် အပြည့်အဝ ပိတ်၍ (tray၊ **Quit**) ပြန်လည်ဖွင့်လှစ်ပါ။

## Window နှင့် Tray

- `BrowserWindow`: 1400×900 (အနည်းဆုံး 1024×700)၊ `backgroundColor: "#0a0a0a"`။
- macOS: `titleBarStyle: "hiddenInset"`၊ traffic-light ကို `{ x: 16, y: 16 }` တွင်ထားသည်။
- Windows/Linux: မူရင်း native title bar။
- ပိတ်ရန် ခလုတ်သည် tray သို့ လျှော့ချပေးသည်။ tray menu တွင် **OmniRoute ကို ဖွင့်ရန်**၊ **Dashboard ကို ဖွင့်ရန်** (ပြင်ပ browser)၊ **Server Port** submenu၊ **အပ်ဒိတ်များကို စစ်ဆေးရန်**၊ **ပိတ်ရန်** တို့ ပါဝင်သည်။

## အကြောင်းအရာ လုံခြုံရေး မူဝါဒ

`session.defaultSession.webRequest.onHeadersReceived` မှတစ်ဆင့် သတ်မှတ်ထားသည်။ မှတ်သားဖွယ် directive များ-

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev mode တွင် `script-src` သို့သာ `'unsafe-eval'` ကို ထည့်သွင်းသည်

## အလိုအလျောက် အပ်ဒိတ်

GitHub provider (`diegosouzapw/OmniRoute`) နှင့်အတူ `electron-updater` ကို အသုံးပြုသည်။

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Renderer သို့ event များကို `update-status` IPC မှတစ်ဆင့် ပေးပို့သည်-
  `checking`, `available`, `not-available`, `downloading` (`percent` ပါဝင်သည်), `downloaded`, `error`
- `installUpdate()` သည် ဆာဗာကို ရပ်တန့်ပြီးနောက် `autoUpdater.quitAndInstall()` ကို ခေါ်သည်
- Dev mode (`!app.isPackaged`) တွင် ကျော်သွားသည်

## တည်ဆောက်မှု Pipeline

1. `npm run build` → `.next/standalone` ထဲတွင် Next.js standalone ကို တည်ဆောက်သည်။
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone` ထဲသို့ ပြန်လည်စီစဉ်ထည့်သွင်းပြီး bundle ကို နေရာရွှေ့ပြောင်းအသုံးပြုနိုင်စေရန် `server.js` + `required-server-files.json` အတွင်းရှိ absolute path များကို ပြန်လည်ရေးသားသည်။
3. `electron-builder` သည် `main.js`, `preload.js`, `node_modules` နှင့် `extraResources: { ../.next/electron-standalone → app }` တို့ကို package ပြုလုပ်သည်။

### တည်ဆောက်မည့် ပစ်မှတ်များ

| OS      | ပစ်မှတ်များ                                           |
| ------- | ----------------------------------------------------- |
| Windows | NSIS installer + portable (x64)                       |
| macOS   | DMG (Intel + arm64၊ Applications ထဲသို့ ဆွဲထည့်ခြင်း) |
| Linux   | AppImage + DEB (x64 + arm64)                          |

NSIS ဆက်တင်များတွင် `oneClick: false` သတ်မှတ်ထားပြီး အသုံးပြုသူအား ထည့်သွင်းမည့် directory ကို ရွေးချယ်ခွင့်ပေးကာ Desktop နှင့် Start-Menu shortcut များကို ဖန်တီးပေးသည်။

## Package ပြုလုပ်ထားသော Build ကို Smoke Test လုပ်ခြင်း

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- လက်ရှိ platform အတွက် package ပြုလုပ်ထားသော binary ကို `electron/dist-electron/` ထဲတွင် အလိုအလျောက် ရှာဖွေသည်။
- Developer ဒေတာကို မထိခိုက်စေရန် သီးခြားခွဲထားသော `HOME`/`APPDATA`/`XDG_*` directory များဖြင့် စတင်သည်။
- 45 s အတွင်း HTTP 200 ရရှိရန် `http://127.0.0.1:20128/login` ကို အကြိမ်ကြိမ် စစ်ဆေးသည်။
- ဆိုးရွားသော error pattern များ (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` စသည်) ရှိမရှိ stderr/stdout ကို စောင့်ကြည့်သည်။
- အဆင်သင့်ဖြစ်ပြီးနောက် တည်ငြိမ်စွာ လည်ပတ်နေသည့်အချိန် 2 s စောင့်ဆိုင်းပြီးနောက် SIGTERM ပေးပို့ကာ port လွတ်သွားသည်အထိ စောင့်ဆိုင်းသည်။
- CI တွင် `--no-sandbox --disable-gpu` ကို အလိုအလျောက် ထည့်သွင်းပေးသည် (Linux တွင် `--disable-dev-shm-usage` ကိုလည်း ထည့်သွင်းသည်)။

Env override များ: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`။

## Code Signing

`electron/package.json` သည် signing credential များကို တိုက်ရိုက် ချိတ်ဆက်မထားပါ။ ၎င်းတို့ကို env var များမှတစ်ဆင့် `electron-builder` သို့ ပေးပို့ပါ။

### macOS

```bash
export APPLE_ID=<email>
export APPLE_APP_SPECIFIC_PASSWORD=<password>
export APPLE_TEAM_ID=<id>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<cert-password>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<cert-password>
npm run electron:build:win
```

### Linux

AppImage signing သည် မဖြစ်မနေ မဟုတ်ပါ — signing ပြုလုပ်လိုပါက `LINUX_GPG_KEY` ကို သတ်မှတ်ပါ။

## ဖြန့်ချိခြင်း

Artifact များကို `electron/dist-electron/` ထဲတွင် ထည့်သွင်းထားသည်။

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Release များကို GitHub Releases (`diegosouzapw/OmniRoute`) သို့ ထုတ်ဝေထားပြီး `electron-updater` က version အသစ်များ ရှိမရှိကိုလည်း ထိုနေရာတွင် စစ်ဆေးသည်။

## ပြဿနာဖြေရှင်းခြင်း

| လက္ခဏာ                                                                                 | ဖြေရှင်းနည်း                                                                                                                                                                              |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron major version မြှင့်ပြီးနောက် `Cannot find module 'better-sqlite3'` ဖြစ်ခြင်း | better-sqlite3 v13 တွင် Node-API prebuild များ ပါဝင်သည် — root တွင် `npm install` နှင့် `prepare:bundle` ကို ပြန်လည် run ပါ (၎င်းသည် လက်ရှိ platform အတွက် prebuild ကို စစ်ဆေးအတည်ပြုသည်) |
| Native module အတွက် `ERR_DLOPEN_FAILED` ဖြစ်ခြင်း                                      | `prepare:bundle` ကို ပြန်လည် run ပါ — လက်ရှိ platform အတွက် Node-API prebuild မရှိပါက ၎င်းသည် ချက်ချင်း မအောင်မြင်ကြောင်း ပြသသည်                                                          |
| Linux တွင် window က ဗလာဖြစ်နေခြင်း                                                     | Next.js server သည် PORT နှင့် အမှန်တကယ် bind လုပ်ထားကြောင်း အတည်ပြုပါ (`[Server]` log များကို စစ်ဆေးပါ)                                                                                   |
| macOS notarization ရပ်တန့်နေခြင်း                                                      | `APPLE_*` var များကို `.env` ထဲတွင်သာ မထားဘဲ export လုပ်ထားကြောင်း သေချာပါစေ                                                                                                              |
| Windows SmartScreen သတိပေးချက်                                                         | EV cert ဖြင့် sign လုပ်ပါ၊ သို့မဟုတ် အသုံးပြုသူများက right-click → "Run anyway" ကို ရွေးချယ်နိုင်သည်                                                                                      |
| Port အသုံးပြုနေသဖြင့် smoke test မအောင်မြင်ခြင်း                                       | `electron:smoke:packaged` ကို မ run မီ 20128 တွင် လည်ပတ်နေသော local dev server တစ်ခုခုကို ရပ်တန့်ပါ                                                                                       |

## ထပ်မံကြည့်ရှုရန်

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- ရင်းမြစ်: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- အကူကိရိယာများ: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
