# Electron Desktop Guide (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **مستند ماخذ:** `electron/` ورک اسپیس
> **آخری بار اپ ڈیٹ کیا گیا:** 2026-06-28 — v3.8.40

OmniRoute ایک کراس پلیٹ فارم ڈیسک ٹاپ ایپ (Windows / macOS / Linux) فراہم کرتا ہے جو
**Electron 41** + **electron-builder 26.10** پر بنائی گئی ہے۔ ڈیسک ٹاپ ایپ Next.js
اسٹینڈ الون سرور کو ایک چائلڈ پراسیس کے طور پر شروع کرتی ہے، ایک `BrowserWindow` کو اس کی طرف متوجہ کرتی ہے، اور
سسٹم ٹرے، آٹو اپڈیٹر، IPC برج، اور زیرو کنفیگریشن سیکرٹ بوٹسٹریپ شامل کرتی ہے۔

## ساخت

```
┌──────────────────────────────────────────────┐
│ Electron مرکزی پراسیس (electron/main.js)     │
│ ├─ سنگل انسٹینس لاک                          │
│ ├─ چائلڈ پراسیس: Next.js اسٹینڈ الون سرور    │
│ │   (Electron کے Node رن ٹائم سے شروع کردہ)  │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ سسٹم ٹرے + سیاقی مینو                     │
│ ├─ electron-updater کے ذریعے آٹو اپ ڈیٹ      │
│ ├─ مواد کی سیکیورٹی پالیسی (سیشن ہیڈرز)      │
│ └─ سیکرٹ بوٹسٹریپ (JWT / API_KEY_SECRET)     │
└──────────────────────────────────────────────┘
            ↕ IPC برج (electron/preload.js)
┌──────────────────────────────────────────────┐
│ رینڈرر (Next.js ڈیش بورڈ)                    │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## ورژنز

`electron/package.json` سے تصدیق شدہ:

| پیکیج              | ورژن                                                     |
| ------------------ | -------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                |
| `electron-builder` | `^26.15.3`                                               |
| `electron-updater` | `^6.8.9`                                                 |
| `better-sqlite3`   | روٹ `^13.0.2` (Node-API پری بلڈز — Electron ری بلڈ نہیں) |
| ایپ ورژن           | `3.8.0`                                                  |
| ایپ آئی ڈی         | `online.omniroute.desktop`                               |
| پروڈکٹ کا نام      | `OmniRoute`                                              |

## اسکرپٹس (روٹ `package.json`)

| اسکرپٹ                            | مقصد                                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` شروع کرتا ہے + `localhost:20128` کا انتظار کرتا ہے + Electron لانچ کرتا ہے    |
| `npm run electron:build`          | Next.js بناتا ہے، پھر موجودہ OS کے لیے `electron-builder` چلاتا ہے                          |
| `npm run electron:build:win`      | Windows کا NSIS انسٹالر + پورٹیبل (x64) بناتا ہے                                            |
| `npm run electron:build:mac`      | macOS کا DMG (Intel + Apple Silicon) بناتا ہے                                               |
| `npm run electron:build:linux`    | Linux کا AppImage + DEB (x64 + arm64) بناتا ہے                                              |
| `npm run electron:smoke:packaged` | پیکیج شدہ بائنری لانچ کرتا ہے، HTTP 200 کے لیے `/login` کی جانچ کرتا ہے، پھر بند ہو جاتا ہے |

`electron/` ورک اسپیس یہ بھی فراہم کرتی ہے:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` چلاتا ہے
- `npm run build:mac-x64` / `build:mac-arm64` — سنگل آرکیٹیکچر macOS بلڈز
- `npm run pack` — مقامی جانچ کے لیے صرف ڈائریکٹری بلڈ (کوئی انسٹالر نہیں)

## ڈائریکٹری کی ساخت

```
electron/
├── package.json              # Electron dependencies + electron-builder کی configuration
├── main.js                   # مرکزی process (24 KB — ذیل میں annotations دیکھیں)
├── preload.js                # contextBridge IPC bridge
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI types
├── README.md                 # workspace کے اندر کے نوٹس
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder کا output (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone bundle کو تیار کرتا ہے
└── dev/
    └── smoke-electron-packaged.mjs       # build کے بعد کا smoke test
```

`main.js` اور `preload.js` دونوں TypeScript نہیں بلکہ **CommonJS `.js` فائلیں** ہیں۔
renderer-side typings، `electron/types.d.ts` میں موجود ہیں۔

## IPC برج (`preload.js`)

preload، `contextIsolation: true` اور `nodeIntegration: false` کے ساتھ `contextBridge`
استعمال کرتے ہوئے `window.electronAPI` پر whitelist شدہ API فراہم کرتا ہے۔

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

فراہم کردہ methods:

| Renderer call                                                     | Type                            |
| ----------------------------------------------------------------- | ------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                          |
| `openExternal(url)`                                               | invoke                          |
| `getDataDir()`                                                    | invoke                          |
| `restartServer()`                                                 | invoke                          |
| `getAppVersion()`                                                 | invoke                          |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                          |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                            |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (disposer واپس کرتا ہے) |

receive helpers، `removeAllListeners` پر انحصار کرنے کے بجائے ایک **disposer function**
واپس کرتے ہیں — یہ React components کے دوبارہ mount ہونے پر listeners کو جمع ہونے سے روکتا ہے۔

## سرور کا لائف سائیکل

`main.js`، system Node کے ساتھ native-module ABI عدم مطابقت سے بچنے کے لیے Next.js
standalone bundle کو براہِ راست Electron Node runtime کے ذریعے چلاتا ہے:

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

اہم نکات:

- `waitForServer()`، window دکھانے سے پہلے URL کو 30 s تک poll کرتا ہے (cold start پر کوئی خالی screen نہیں دکھائی جاتی)۔
- `stdio: "pipe"`، stdout/stderr کو capture کرتا ہے؛ ready phrases (`Ready` / `listening`) IPC کے ذریعے `server-status: running` خارج کرتے ہیں۔
- `before-quit`، graceful SIGTERM (WAL checkpoint) کے لیے 5 s تک انتظار کرتا ہے، پھر SIGKILL بھیجتا ہے۔
- tray میں موجود port switcher (`20128`، `3000`، `8080`) سرور کو روکتا اور دوبارہ شروع کرتا ہے، پھر BrowserWindow کو reload کرتا ہے۔

## زیرو-کنفیگ سیکرٹ بوٹسٹریپ

پہلی بار لانچ ہونے پر، مرکزی پراسیس غائب سیکرٹس خودکار طور پر بناتا اور محفوظ کرتا ہے:

| سیکرٹ                    | ماخذ                                                                                               |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                           |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (اگر انکرپٹ شدہ اسناد پہلے سے موجود ہوں تو انکار کرتا ہے) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                           |

`<DATA_DIR>/server.env` میں محفوظ کیا جاتا ہے۔ `DATA_DIR` کا تعین یوں ہوتا ہے:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` یا `~/.omniroute`
- macOS: `~/.omniroute`

## ونڈو اور ٹرے

- `BrowserWindow`: 1400×900 (کم از کم 1024×700)، `backgroundColor: "#0a0a0a"`۔
- macOS: `titleBarStyle: "hiddenInset"`، ٹریفک لائٹ `{ x: 16, y: 16 }` پر۔
- Windows/Linux: مقامی ٹائٹل بار۔
- بند کرنے کا بٹن ایپ کو ٹرے میں منیمائز کرتا ہے؛ ٹرے مینیو میں **OmniRoute کھولیں**، **ڈیش بورڈ کھولیں** (بیرونی براؤزر)، **سرور پورٹ** ذیلی مینیو، **اپ ڈیٹس چیک کریں**، اور **بند کریں** شامل ہیں۔

## مواد کی سیکیورٹی پالیسی

`session.defaultSession.webRequest.onHeadersReceived` کے ذریعے سیٹ کی جاتی ہے۔ قابلِ ذکر ہدایات:

- `frame-ancestors 'none'`، `object-src 'none'`، `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- ڈیولپمنٹ موڈ صرف `script-src` میں `'unsafe-eval'` شامل کرتا ہے

## خودکار اپ ڈیٹ

GitHub پرووائیڈر (`diegosouzapw/OmniRoute`) کے ساتھ `electron-updater` استعمال کرتا ہے۔

- `autoDownload = false`، `autoInstallOnAppQuit = true`
- ایونٹس `update-status` IPC کے ذریعے رینڈرر کو بھیجے جاتے ہیں:
  `checking`، `available`، `not-available`، `downloading` (`percent` کے ساتھ)، `downloaded`، `error`
- `installUpdate()` سرور کو بند کرتا ہے، پھر `autoUpdater.quitAndInstall()` کو کال کرتا ہے
- ڈیولپمنٹ موڈ (`!app.isPackaged`) میں اسے چھوڑ دیا جاتا ہے

## بلڈ پائپ لائن

1. `npm run build` → `.next/standalone` میں Next.js اسٹینڈ الون۔
2. `prepare-electron-standalone.mjs` → فائلوں کو دوبارہ `.next/electron-standalone` میں اسٹیج کرتا ہے اور `server.js` + `required-server-files.json` کے اندر مطلق پاتھز کو دوبارہ لکھتا ہے تاکہ بنڈل کو منتقل کیا جا سکے۔
3. `electron-builder`، `main.js`، `preload.js`، `node_modules`، اور `extraResources: { ../.next/electron-standalone → app }` کو پیکیج کرتا ہے۔

### بلڈ اہداف

| OS      | اہداف                                                  |
| ------- | ------------------------------------------------------ |
| Windows | NSIS انسٹالر + پورٹیبل (x64)                           |
| macOS   | DMG (Intel + arm64، ڈریگ کر کے Applications میں ڈالیں) |
| Linux   | AppImage + DEB (x64 + arm64)                           |

NSIS ترتیبات: `oneClick: false`، صارف کو انسٹالیشن ڈائریکٹری منتخب کرنے دیتی ہیں، اور Desktop اور Start-Menu شارٹ کٹس بناتی ہیں۔

## پیکیج شدہ بلڈ کی اسموک ٹیسٹنگ

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- موجودہ پلیٹ فارم کے لیے `electron/dist-electron/` میں پیکیج شدہ بائنری خودکار طور پر تلاش کرتا ہے۔
- الگ تھلگ `HOME`/`APPDATA`/`XDG_*` ڈائریکٹریز کے ساتھ لانچ کرتا ہے تاکہ ڈیولپر کے ڈیٹا کو نہ چھیڑے۔
- 45 s کے اندر HTTP 200 کے لیے `http://127.0.0.1:20128/login` کو مسلسل پول کرتا ہے۔
- مہلک پیٹرنز (`Cannot find module`، `MODULE_NOT_FOUND`، `ERR_DLOPEN_FAILED`، `Failed to start server`، وغیرہ) کے لیے stderr/stdout کی نگرانی کرتا ہے۔
- تیار ہونے کے بعد 2 s تک مستحکم رن ٹائم کا انتظار کرتا ہے، پھر SIGTERM جاری کرتا ہے اور پورٹ کے خالی ہونے کا انتظار کرتا ہے۔
- CI میں، خودکار طور پر `--no-sandbox --disable-gpu` (اور Linux پر `--disable-dev-shm-usage`) پاس کرتا ہے۔

ماحولیاتی اوور رائیڈز: `ELECTRON_SMOKE_APP_EXECUTABLE`، `ELECTRON_SMOKE_URL`، `ELECTRON_SMOKE_TIMEOUT_MS`، `ELECTRON_SMOKE_SETTLE_MS`، `ELECTRON_SMOKE_DATA_DIR`، `ELECTRON_SMOKE_KEEP_DATA`، `ELECTRON_SMOKE_STREAM_LOGS`۔

## کوڈ سائننگ

`electron/package.json` سائننگ کی اسناد کو براہِ راست منسلک **نہیں** کرتا۔ انہیں env vars کے ذریعے `electron-builder` کو فراہم کریں:

### macOS

```bash
export APPLE_ID=<ای میل>
export APPLE_APP_SPECIFIC_PASSWORD=<پاس ورڈ>
export APPLE_TEAM_ID=<آئی ڈی>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<سرٹیفکیٹ-پاس ورڈ>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<سرٹیفکیٹ-پاس ورڈ>
npm run electron:build:win
```

### Linux

AppImage سائننگ اختیاری ہے — سائننگ کے لیے `LINUX_GPG_KEY` سیٹ کریں۔

## تقسیم

آرٹیفیکٹس `electron/dist-electron/` میں محفوظ ہوتے ہیں:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

ریلیزز GitHub Releases (`diegosouzapw/OmniRoute`) پر شائع کی جاتی ہیں، اور `electron-updater` بھی نئے ورژنز کے لیے یہیں جانچ کرتا ہے۔

## مسائل کا حل

| علامت                                                                | حل                                                                                                                                                                     |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron کے بڑے اپ گریڈ کے بعد `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 کے ساتھ Node-API prebuilds آتے ہیں — روٹ پر دوبارہ `npm install` اور `prepare:bundle` چلائیں (یہ موجودہ پلیٹ فارم کے لیے prebuild کی تصدیق کرتا ہے) |
| مقامی ماڈیول کے لیے `ERR_DLOPEN_FAILED`                              | دوبارہ `prepare:bundle` چلائیں — موجودہ پلیٹ فارم کے لیے Node-API prebuild موجود نہ ہو تو یہ فوراً ناکام ہو جاتا ہے                                                    |
| Linux پر ونڈو خالی دکھائی دیتی ہے                                    | تصدیق کریں کہ Next.js سرور واقعی PORT سے منسلک ہوا ہے (`[Server]` لاگز دیکھیں)                                                                                         |
| macOS notarization رک جاتی ہے                                        | یقینی بنائیں کہ `APPLE_*` vars کو export کیا گیا ہے، نہ کہ صرف `.env` میں رکھا گیا ہے                                                                                  |
| Windows SmartScreen کی تنبیہ                                         | EV cert کے ساتھ سائن کریں، یا صارفین دایاں کلک کریں → "ہر حال میں چلائیں"                                                                                              |
| زیرِ استعمال پورٹ کے باعث smoke test ناکام ہوتا ہے                   | `electron:smoke:packaged` چلانے سے پہلے 20128 پر چلنے والے کسی بھی مقامی dev server کو بند کریں                                                                        |

## یہ بھی دیکھیں

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- ماخذ: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- معاون اسکرپٹس: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
