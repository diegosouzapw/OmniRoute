# Electron Desktop Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **အမှန်တကယ်ကိုးကားရမည့် ရင်းမြစ်:** `electron/` workspace
> **နောက်ဆုံးပြင်ဆင်ထားသည့်ရက်:** 2026-06-28 — v3.8.40

OmniRoute တွင် **Electron 41** + **electron-builder 26.10** ဖြင့် တည်ဆောက်ထားသည့် ပလက်ဖောင်းစုံသုံး desktop app (Windows / macOS / Linux) ပါဝင်သည်။ Desktop app သည် Next.js standalone server ကို child process အဖြစ် စတင်ပြီး `BrowserWindow` ကို ၎င်းထံ ညွှန်ပေးကာ system tray၊ auto-updater၊ IPC bridge နှင့် configuration ပြုလုပ်ရန်မလိုသော secret bootstrap တို့ကို ထည့်သွင်းပေးသည်။

## ဖွဲ့စည်းပုံ

```
┌──────────────────────────────────────────────┐
│ Electron ပင်မ process (electron/main.js)     │
│ ├─ Instance တစ်ခုတည်းသာ run နိုင်ရန် lock    │
│ ├─ Child process: Next.js standalone server  │
│ │   (Electron ၏ Node runtime ဖြင့် စတင်သည်)  │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ System tray + context menu                │
│ ├─ electron-updater ဖြင့် auto-update        │
│ ├─ Content Security Policy (session headers) │
│ └─ Secret bootstrap (JWT / API_KEY_SECRET)   │
└──────────────────────────────────────────────┘
            ↕ IPC bridge (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderer (Next.js dashboard)                  │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## ဗားရှင်းများ

`electron/package.json` မှ အတည်ပြုထားသည်-

| Package            | ဗားရှင်း                                                      |
| ------------------ | ------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                     |
| `electron-builder` | `^26.15.3`                                                    |
| `electron-updater` | `^6.8.9`                                                      |
| `better-sqlite3`   | root `^13.0.2` (Node-API prebuilds — Electron rebuild မလိုပါ) |
| App ဗားရှင်း       | `3.8.0`                                                       |
| App id             | `online.omniroute.desktop`                                    |
| ထုတ်ကုန်အမည်       | `OmniRoute`                                                   |

## Script များ (root `package.json`)

| Script                            | ရည်ရွယ်ချက်                                                                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` ကို စတင်ပြီး `localhost:20128` ကို စောင့်ဆိုင်းကာ Electron ကို ဖွင့်သည်        |
| `npm run electron:build`          | Next.js ကို build လုပ်ပြီးနောက် လက်ရှိ OS အတွက် `electron-builder` ကို run သည်               |
| `npm run electron:build:win`      | Windows NSIS installer + portable (x64) ကို build လုပ်သည်                                    |
| `npm run electron:build:mac`      | macOS DMG (Intel + Apple Silicon) ကို build လုပ်သည်                                          |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) ကို build လုပ်သည်                                         |
| `npm run electron:smoke:packaged` | Packaged binary ကို ဖွင့်ပြီး `/login` တွင် HTTP 200 ရရှိကြောင်း စမ်းသပ်ကာ ထို့နောက် ပိတ်သည် |

`electron/` workspace တွင် အောက်ပါတို့ကိုလည်း အသုံးပြုနိုင်သည်-

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` ကို run သည်
- `npm run build:mac-x64` / `build:mac-arm64` — architecture တစ်မျိုးတည်းအတွက် macOS build များ
- `npm run pack` — စက်အတွင်း စမ်းသပ်ရန် directory သီးသန့် build (installer မပါဝင်ပါ)

## ဖိုင်တွဲ ဖွဲ့စည်းပုံ

```
electron/
├── package.json              # Electron မှီခိုပက်ကေ့ချ်များ + electron-builder စီစဉ်သတ်မှတ်ချက်
├── main.js                   # ပင်မ process (24 KB — အောက်ပါ မှတ်ချက်များကို ကြည့်ပါ)
├── preload.js                # contextBridge IPC ချိတ်ဆက်တံတား
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI အမျိုးအစားများ
├── README.md                 # Workspace အတွင်းရှိ မှတ်စုများ
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder အထွက်ဖိုင်များ (git မှ လျစ်လျူရှုထားသည်)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone bundle ကို ပြင်ဆင်နေရာချသည်
└── dev/
    └── smoke-electron-packaged.mjs       # Build ပြီးနောက် smoke test
```

`main.js` နှင့် `preload.js` နှစ်ခုစလုံးသည် TypeScript မဟုတ်ဘဲ **CommonJS `.js` ဖိုင်များ** ဖြစ်သည်။
Renderer ဘက်ရှိ type သတ်မှတ်ချက်များသည် `electron/types.d.ts` တွင် ရှိသည်။

## IPC ချိတ်ဆက်တံတား (`preload.js`)

Preload သည် `contextIsolation: true` နှင့် `nodeIntegration: false` ကို အသုံးပြု၍ `contextBridge`
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

| Renderer မှ ခေါ်ဆိုမှု                                            | အမျိုးအစား                                             |
| ----------------------------------------------------------------- | ------------------------------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                                 |
| `openExternal(url)`                                               | invoke                                                 |
| `getDataDir()`                                                    | invoke                                                 |
| `restartServer()`                                                 | invoke                                                 |
| `getAppVersion()`                                                 | invoke                                                 |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                                 |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                                   |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (ရှင်းလင်းဖယ်ရှားသည့် function ကို ပြန်ပေးသည်) |

Receive helper များသည် `removeAllListeners` ကို အားကိုးမည့်အစား **ရှင်းလင်းဖယ်ရှားသည့် function**
တစ်ခုကို ပြန်ပေးသည် — ဤနည်းဖြင့် React component များ ပြန်လည် mount လုပ်သည့်အခါ listener များ
စုပုံလာခြင်းကို တားဆီးပေးသည်။

## Server အသက်တာစက်ဝန်း

System Node နှင့် native-module ABI မကိုက်ညီမှုကို ရှောင်ရှားရန် `main.js` သည် Electron Node
runtime ဖြင့် Next.js standalone bundle ကို တိုက်ရိုက် စတင်မောင်းနှင်သည်-

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

- `waitForServer()` သည် window ကို မပြသမီ URL ကို 30 s အထိ အကြိမ်ကြိမ် စစ်ဆေးသည် (cold start တွင် မျက်နှာပြင်အလွတ် မပေါ်စေရန်)။
- `stdio: "pipe"` သည် stdout/stderr ကို ဖမ်းယူသည်။ အဆင်သင့်ဖြစ်ကြောင်း ဖော်ပြသည့် စာသားများ (`Ready` / `listening`) ကို တွေ့ရှိပါက IPC မှတစ်ဆင့် `server-status: running` ကို ထုတ်လွှင့်သည်။
- `before-quit` သည် ချောမွေ့စွာ SIGTERM လုပ်ဆောင်ပြီးဆုံးရန် (WAL checkpoint) 5 s အထိ စောင့်ပြီးနောက် SIGKILL ကို ပေးပို့သည်။
- Tray ရှိ port ပြောင်းလဲကိရိယာ (`20128`, `3000`, `8080`) သည် server ကို ရပ်ပြီး ပြန်လည်စတင်ကာ ထို့နောက် BrowserWindow ကို ပြန်လည်ဖွင့်တင်သည်။

## သတ်မှတ်ပြင်ဆင်မှုမလိုသော Secret Bootstrap

ပထမဆုံး စတင်ဖွင့်လှစ်ချိန်တွင် main process က မရှိသေးသော secret များကို အလိုအလျောက် ထုတ်လုပ်ပြီး အမြဲတမ်းသိမ်းဆည်းထားသည်-

| Secret                   | ရင်းမြစ်                                                                                            |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                            |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (ကုဒ်ဝှက်ထားသော အထောက်အထားများ ရှိပြီးသားဖြစ်ပါက လက်မခံပါ) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                            |

`<DATA_DIR>/server.env` တွင် အမြဲတမ်းသိမ်းဆည်းထားသည်။ `DATA_DIR` ကို အောက်ပါအတိုင်း သတ်မှတ်သည်-

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` သို့မဟုတ် `~/.omniroute`
- macOS: `~/.omniroute`

## Window နှင့် Tray

- `BrowserWindow`: 1400×900 (အနည်းဆုံး 1024×700)၊ `backgroundColor: "#0a0a0a"`။
- macOS: `titleBarStyle: "hiddenInset"`၊ traffic-light ကို `{ x: 16, y: 16 }` တွင်ထားသည်။
- Windows/Linux: မူလစနစ်၏ title bar ကို အသုံးပြုသည်။
- Close ခလုတ်က tray သို့ လျှော့ချသည်။ tray menu တွင် **OmniRoute ကိုဖွင့်ရန်**၊ **Dashboard ကိုဖွင့်ရန်** (ပြင်ပ browser)၊ **Server Port** submenu၊ **အပ်ဒိတ်များ စစ်ဆေးရန်**နှင့် **ထွက်ရန်**တို့ ပါဝင်သည်။

## Content Security Policy

`session.defaultSession.webRequest.onHeadersReceived` မှတစ်ဆင့် သတ်မှတ်သည်။ မှတ်သားဖွယ် directive များ-

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev mode တွင် `script-src` သို့သာ `'unsafe-eval'` ကို ထည့်သွင်းသည်

## အလိုအလျောက်အပ်ဒိတ်

GitHub provider (`diegosouzapw/OmniRoute`) နှင့်အတူ `electron-updater` ကို အသုံးပြုသည်။

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Event များကို `update-status` IPC မှတစ်ဆင့် renderer သို့ ပေးပို့သည်-
  `checking`, `available`, `not-available`, `downloading` (`percent` နှင့်အတူ), `downloaded`, `error`
- `installUpdate()` က server ကို ပိတ်ပြီးနောက် `autoUpdater.quitAndInstall()` ကို ခေါ်သည်
- Dev mode (`!app.isPackaged`) တွင် ကျော်သွားသည်

## Build Pipeline

1. `npm run build` → `.next/standalone` ထဲရှိ Next.js standalone။
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone` ထဲသို့ ပြန်လည်အဆင့်ဆင့် စီစဉ်ပြီး bundle ကို နေရာရွှေ့နိုင်စေရန် `server.js` + `required-server-files.json` အတွင်းရှိ absolute path များကို ပြန်လည်ရေးသားသည်။
3. `electron-builder` က `main.js`, `preload.js`, `node_modules` နှင့် `extraResources: { ../.next/electron-standalone → app }` ကို package ပြုလုပ်သည်။

### Build ပစ်မှတ်များ

| OS      | ပစ်မှတ်များ                                         |
| ------- | --------------------------------------------------- |
| Windows | NSIS installer + portable (x64)                     |
| macOS   | DMG (Intel + arm64၊ Applications သို့ ဆွဲထည့်ခြင်း) |
| Linux   | AppImage + DEB (x64 + arm64)                        |

NSIS ဆက်တင်များ- `oneClick: false`၊ အသုံးပြုသူအား install directory ရွေးချယ်ခွင့်ပေးပြီး Desktop နှင့် Start-Menu shortcut များကို ဖန်တီးသည်။

## Package ပြုလုပ်ထားသော Build ကို Smoke Testing လုပ်ခြင်း

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`-

- လက်ရှိ platform အတွက် package ပြုလုပ်ထားသော binary ကို `electron/dist-electron/` ထဲတွင် အလိုအလျောက်ရှာဖွေသည်။
- Developer data ကို မထိခိုက်စေရန် သီးခြားခွဲထားသော `HOME`/`APPDATA`/`XDG_*` directory များဖြင့် စတင်သည်။
- 45 s အတွင်း HTTP 200 ရရှိရန် `http://127.0.0.1:20128/login` ကို အကြိမ်ကြိမ် စစ်ဆေးသည်။
- ဆိုးရွားသော pattern များ (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` စသည်) ရှိမရှိ stderr/stdout ကို စောင့်ကြည့်သည်။
- အဆင်သင့်ဖြစ်ပြီးနောက် တည်ငြိမ်သော runtime 2 s ကို စောင့်သည်၊ ထို့နောက် SIGTERM ကို ပေးပို့ပြီး port လွတ်သွားသည်အထိ စောင့်သည်။
- CI တွင် `--no-sandbox --disable-gpu` ကို အလိုအလျောက် ထည့်သွင်းပေးသည် (Linux တွင် `--disable-dev-shm-usage` ကိုလည်း ထည့်သွင်းသည်)။

Env override များ- `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`။

## ကုဒ် လက်မှတ်ထိုးခြင်း

`electron/package.json` တွင် လက်မှတ်ထိုးရန် အထောက်အထားများကို တိုက်ရိုက်ချိတ်ဆက်သတ်မှတ်ထားခြင်း **မရှိပါ**။ ၎င်းတို့ကို env vars မှတစ်ဆင့် `electron-builder` သို့ ပေးပို့ပါ-

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

AppImage လက်မှတ်ထိုးခြင်းသည် ရွေးချယ်နိုင်သည် — လက်မှတ်ထိုးလိုပါက `LINUX_GPG_KEY` ကို သတ်မှတ်ပါ။

## ဖြန့်ချိခြင်း

တည်ဆောက်ပြီးသော ဖိုင်များကို `electron/dist-electron/` တွင် ရရှိပါမည်-

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

ဖြန့်ချိမှုများကို GitHub Releases (`diegosouzapw/OmniRoute`) သို့ ထုတ်ဝေပြီး `electron-updater` ကလည်း ဗားရှင်းအသစ်များ ရှိမရှိ ထိုနေရာတွင် စစ်ဆေးပါသည်။

## ပြဿနာဖြေရှင်းခြင်း

| လက္ခဏာ                                                                                     | ဖြေရှင်းနည်း                                                                                                                                                                             |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron major ဗားရှင်းမြှင့်ပြီးနောက် `Cannot find module 'better-sqlite3'` ဖြစ်ပေါ်ခြင်း | better-sqlite3 v13 တွင် Node-API prebuilds များ ပါဝင်သည် — root တွင် `npm install` နှင့် `prepare:bundle` ကို ပြန်လည် run ပါ (၎င်းက လက်ရှိ platform အတွက် prebuild ကို စစ်ဆေးအတည်ပြုသည်) |
| native module အတွက် `ERR_DLOPEN_FAILED` ဖြစ်ပေါ်ခြင်း                                      | `prepare:bundle` ကို ပြန်လည် run ပါ — လက်ရှိ platform အတွက် Node-API prebuild မရှိပါက ၎င်းသည် ချက်ချင်း မအောင်မြင်ကြောင်း ပြသပါမည်                                                       |
| Linux တွင် window က ဗလာဖြစ်နေခြင်း                                                         | Next.js server သည် PORT နှင့် အမှန်တကယ် bind ဖြစ်ထားကြောင်း အတည်ပြုပါ (`[Server]` logs ကို စစ်ဆေးပါ)                                                                                     |
| macOS notarization ရပ်တန့်နေခြင်း                                                          | `APPLE_*` vars များကို `.env` ထဲတွင်သာ ထည့်ထားခြင်းမဟုတ်ဘဲ export လုပ်ထားကြောင်း သေချာပါစေ                                                                                               |
| Windows SmartScreen သတိပေးချက်                                                             | EV cert ဖြင့် လက်မှတ်ထိုးပါ၊ သို့မဟုတ် အသုံးပြုသူများက right-click → "Run anyway" ကို ရွေးချယ်နိုင်သည်                                                                                   |
| port အသုံးပြုနေသောကြောင့် smoke test မအောင်မြင်ခြင်း                                       | `electron:smoke:packaged` ကို run မလုပ်မီ 20128 တွင် run နေသော local dev server မှန်သမျှကို ရပ်တန့်ပါ                                                                                    |

## ထပ်မံကြည့်ရှုရန်

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- အရင်းအမြစ်- `electron/main.js`, `electron/preload.js`, `electron/package.json`
- အကူ Script များ- `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
