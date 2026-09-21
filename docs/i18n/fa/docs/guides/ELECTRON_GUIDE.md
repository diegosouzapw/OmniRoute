# Electron Desktop Guide (فارسی)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **منبع اصلی حقیقت:** فضای کاری `electron/`
> **آخرین بهروزرسانی:** 2026-06-28 — v3.8.40

OmniRoute یک برنامه دسکتاپ چندسکویی (Windows / macOS / Linux) ارائه میکند که بر پایه
**Electron 41** و **electron-builder 26.10** ساخته شده است. برنامه دسکتاپ، سرور مستقل Next.js
را بهعنوان یک فرایند فرزند اجرا میکند، یک `BrowserWindow` را به آن متصل میکند و
سینی سیستم، بهروزرسان خودکار، پل IPC و راهاندازی اولیه اسرار بدون نیاز به پیکربندی را اضافه میکند.

## معماری

```
┌──────────────────────────────────────────────┐
│ فرایند اصلی Electron (electron/main.js)      │
│ ├─ قفل تکنمونهای                            │
│ ├─ فرایند فرزند: سرور مستقل Next.js          │
│ │   (اجراشده با محیط اجرای Node در Electron) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ سینی سیستم + منوی زمینه                   │
│ ├─ بهروزرسانی خودکار از طریق electron-updater │
│ ├─ سیاست امنیت محتوا (هدرهای نشست)           │
│ └─ راهاندازی اولیه اسرار (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────┘
            ↕ پل IPC (electron/preload.js)
┌──────────────────────────────────────────────┐
│ رندرکننده (داشبورد Next.js)                  │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## نسخهها

تأییدشده از `electron/package.json`:

| بسته               | نسخه                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                               |
| `electron-builder` | `^26.15.3`                                                              |
| `electron-updater` | `^6.8.9`                                                                |
| `better-sqlite3`   | ریشه `^13.0.2` (نسخههای ازپیشساختهشده Node-API — بدون بازسازی Electron) |
| نسخه برنامه        | `3.8.0`                                                                 |
| شناسه برنامه       | `online.omniroute.desktop`                                              |
| نام محصول          | `OmniRoute`                                                             |

## اسکریپتها (`package.json` ریشه)

| اسکریپت                           | هدف                                                                                                       |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` را آغاز میکند، منتظر `localhost:20128` میماند و Electron را اجرا میکند                      |
| `npm run electron:build`          | Next.js را میسازد و سپس `electron-builder` را برای سیستمعامل فعلی اجرا میکند                              |
| `npm run electron:build:win`      | نصبکننده NSIS و نسخه قابلحمل Windows را میسازد (x64)                                                      |
| `npm run electron:build:mac`      | DMG مربوط به macOS را میسازد (Intel + Apple Silicon)                                                      |
| `npm run electron:build:linux`    | AppImage و DEB مربوط به Linux را میسازد (x64 + arm64)                                                     |
| `npm run electron:smoke:packaged` | فایل اجرایی بستهبندیشده را اجرا میکند و `/login` را برای پاسخ HTTP 200 بررسی میکند، سپس آن را متوقف میکند |

فضای کاری `electron/` همچنین موارد زیر را ارائه میکند:

- `npm run prepare:bundle` — اسکریپت `scripts/build/prepare-electron-standalone.mjs` را اجرا میکند
- `npm run build:mac-x64` / `build:mac-arm64` — ساختهای تکمعماری macOS
- `npm run pack` — ساخت فقط بهصورت دایرکتوری برای آزمایش محلی (بدون نصبکننده)

## ساختار دایرکتوری

```
electron/
├── package.json              # وابستگیهای Electron و پیکربندی electron-builder
├── main.js                   # فرایند اصلی (24 KB — حاشیهنویسیهای زیر را ببینید)
├── preload.js                # پل IPC مبتنی بر contextBridge
├── types.d.ts                # نوعهای AppInfo / ServerStatus / ElectronAPI
├── README.md                 # یادداشتهای درون فضای کاری
├── assets/                   # icon.png، icon.ico، icon.icns، tray-icon.png
└── dist-electron/            # خروجی electron-builder (نادیدهگرفتهشده توسط git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # بستهٔ .next/electron-standalone را آماده میکند
└── dev/
    └── smoke-electron-packaged.mjs       # آزمون دود پس از ساخت
```

هر دو فایل `main.js` و `preload.js`، **فایلهای CommonJS با پسوند `.js`** هستند، نه TypeScript.
تعریف نوعهای سمت رندرکننده در `electron/types.d.ts` قرار دارند.

## پل IPC (`preload.js`)

اسکریپت preload با استفاده از `contextBridge` و تنظیمات `contextIsolation: true` و
`nodeIntegration: false`، یک API در فهرست مجاز را روی `window.electronAPI` ارائه میکند.

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

متدهای ارائهشده:

| فراخوانی رندرکننده                                                | نوع                              |
| ----------------------------------------------------------------- | -------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                           |
| `openExternal(url)`                                               | invoke                           |
| `getDataDir()`                                                    | invoke                           |
| `restartServer()`                                                 | invoke                           |
| `getAppVersion()`                                                 | invoke                           |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                           |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                             |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (یک پاککننده برمیگرداند) |

توابع کمکی receive بهجای تکیه بر `removeAllListeners`، یک **تابع پاککننده** برمیگردانند؛
این کار هنگام mount مجدد کامپوننتهای React از انباشتهشدن listenerها جلوگیری میکند.

## چرخهٔ حیات سرور

فایل `main.js` بستهٔ مستقل Next.js را مستقیماً با runtime مربوط به Node در Electron اجرا میکند
تا از ناسازگاری ABI ماژولهای native با Node سیستم جلوگیری شود:

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

نکات برجسته:

- `waitForServer()` پیش از نمایش پنجره، URL را تا 30 s پایش میکند (بدون صفحهٔ خالی هنگام شروع سرد).
- `stdio: "pipe"` خروجیهای stdout/stderr را دریافت میکند؛ عبارتهای نشاندهندهٔ آمادگی (`Ready` / `listening`) وضعیت `server-status: running` را از طریق IPC منتشر میکنند.
- `before-quit` برای SIGTERM آرام (checkpoint مربوط به WAL) تا 5 s منتظر میماند و سپس SIGKILL ارسال میکند.
- تغییردهندهٔ پورت در tray (`20128`، `3000`، `8080`) سرور را متوقف و دوباره راهاندازی میکند و سپس BrowserWindow را مجدداً بارگذاری میکند.

## راهاندازی اولیهٔ بدون پیکربندی اسرار

در نخستین اجرا، فرایند اصلی اسرار موجودنبودن را بهطور خودکار تولید و ذخیره میکند:

| راز                      | منبع                                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                              |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (اگر اطلاعات احراز هویت رمزگذاریشده از قبل وجود داشته باشد، عملیات رد میشود) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                              |

در `<DATA_DIR>/server.env` ذخیره میشوند. `DATA_DIR` به مسیرهای زیر نگاشت میشود:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` یا `~/.omniroute`
- macOS: `~/.omniroute`

## پنجره و سینی سیستم

- `BrowserWindow`: ابعاد 1400×900 (حداقل 1024×700)، با `backgroundColor: "#0a0a0a"`.
- macOS: مقدار `titleBarStyle: "hiddenInset"` و دکمههای کنترل پنجره در `{ x: 16, y: 16 }`.
- Windows/Linux: نوار عنوان بومی سیستمعامل.
- دکمهٔ بستن، برنامه را به سینی سیستم میفرستد؛ منوی سینی شامل **باز کردن OmniRoute**، **باز کردن داشبورد** (در مرورگر خارجی)، زیرمنوی **درگاه سرور**، **بررسی بهروزرسانیها** و **خروج** است.

## سیاست امنیت محتوا

از طریق `session.defaultSession.webRequest.onHeadersReceived` تنظیم میشود. دستورالعملهای مهم:

- `frame-ancestors 'none'`، `object-src 'none'`، `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- حالت توسعه فقط `'unsafe-eval'` را به `script-src` اضافه میکند

## بهروزرسانی خودکار

از `electron-updater` همراه با ارائهدهندهٔ GitHub (`diegosouzapw/OmniRoute`) استفاده میکند.

- `autoDownload = false`، `autoInstallOnAppQuit = true`
- رویدادها از طریق IPC با نام `update-status` به رندرر ارسال میشوند:
  `checking`، `available`، `not-available`، `downloading` (همراه با `percent`)، `downloaded`، `error`
- `installUpdate()` سرور را متوقف میکند و سپس `autoUpdater.quitAndInstall()` را فراخوانی میکند
- در حالت توسعه (`!app.isPackaged`) اجرا نمیشود

## خط لولهٔ ساخت

1. `npm run build` ← خروجی مستقل Next.js در `.next/standalone`.
2. `prepare-electron-standalone.mjs` ← محتوا را مجدداً در `.next/electron-standalone` آماده میکند و مسیرهای مطلق داخل `server.js` و `required-server-files.json` را بازنویسی میکند تا بسته قابل جابهجایی باشد.
3. `electron-builder` فایلهای `main.js`، `preload.js`، `node_modules` و `extraResources: { ../.next/electron-standalone → app }` را بستهبندی میکند.

### اهداف ساخت

| سیستمعامل | اهداف                                      |
| --------- | ------------------------------------------ |
| Windows   | نصبکنندهٔ NSIS و نسخهٔ قابلحمل (x64)       |
| macOS     | DMG (Intel و arm64، کشیدن به Applications) |
| Linux     | AppImage و DEB (x64 و arm64)               |

تنظیمات NSIS: مقدار `oneClick: false`، به کاربر اجازه میدهد پوشهٔ نصب را انتخاب کند و میانبرهای Desktop و Start-Menu را ایجاد میکند.

## آزمون دودِ نسخهٔ بستهبندیشده

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- فایل اجرایی بستهبندیشده را برای پلتفرم فعلی بهطور خودکار در `electron/dist-electron/` پیدا میکند.
- برنامه را با پوشههای مجزای `HOME`/`APPDATA`/`XDG_*` اجرا میکند تا به دادههای توسعهدهنده دست نزند.
- تا 45 ثانیه، `http://127.0.0.1:20128/login` را برای دریافت HTTP 200 بررسی میکند.
- خروجی stderr/stdout را برای الگوهای خطای بحرانی (`Cannot find module`، `MODULE_NOT_FOUND`، `ERR_DLOPEN_FAILED`، `Failed to start server` و غیره) پایش میکند.
- پس از آمادهشدن، 2 ثانیه برای اطمینان از پایداری اجرا صبر میکند، سپس SIGTERM را ارسال کرده و تا آزادشدن درگاه منتظر میماند.
- در CI، گزینههای `--no-sandbox --disable-gpu` را بهطور خودکار ارسال میکند (و در Linux گزینهٔ `--disable-dev-shm-usage` را نیز اضافه میکند).

بازنویسیهای محیطی: `ELECTRON_SMOKE_APP_EXECUTABLE`، `ELECTRON_SMOKE_URL`، `ELECTRON_SMOKE_TIMEOUT_MS`، `ELECTRON_SMOKE_SETTLE_MS`، `ELECTRON_SMOKE_DATA_DIR`، `ELECTRON_SMOKE_KEEP_DATA`، `ELECTRON_SMOKE_STREAM_LOGS`.

## امضای کد

فایل `electron/package.json` اعتبارنامههای امضا را **مستقیماً** پیکربندی نمیکند. آنها را از طریق متغیرهای محیطی به `electron-builder` ارسال کنید:

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

امضای AppImage اختیاری است — برای امضا، `LINUX_GPG_KEY` را تنظیم کنید.

## توزیع

خروجیها در `electron/dist-electron/` قرار میگیرند:

- `OmniRoute.Setup.X.Y.Z.exe`، `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`، `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`، `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

انتشارها در GitHub Releases (`diegosouzapw/OmniRoute`) منتشر میشوند؛ `electron-updater` نیز نسخههای جدید را در همین محل بررسی میکند.

## عیبیابی

| نشانه                                                                       | راهحل                                                                                                                                                                                            |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| خطای `Cannot find module 'better-sqlite3'` پس از ارتقای نسخهٔ اصلی Electron | better-sqlite3 v13 شامل فایلهای ازپیشساختهٔ Node-API است — `npm install` را دوباره در ریشه اجرا کنید و سپس `prepare:bundle` را اجرا کنید (این فرمان فایل ازپیشساختهٔ پلتفرم فعلی را بررسی میکند) |
| خطای `ERR_DLOPEN_FAILED` برای ماژول بومی                                    | `prepare:bundle` را دوباره اجرا کنید — اگر فایل ازپیشساختهٔ Node-API برای پلتفرم فعلی موجود نباشد، این فرمان فوراً با خطا متوقف میشود                                                            |
| پنجره در Linux خالی نمایش داده میشود                                        | تأیید کنید که سرور Next.js واقعاً به PORT متصل شده است (گزارشهای `[Server]` را بررسی کنید)                                                                                                       |
| تأیید محضری macOS متوقف میشود                                               | مطمئن شوید متغیرهای `APPLE_*` صادر شدهاند و فقط در `.env` قرار ندارند                                                                                                                            |
| هشدار Windows SmartScreen                                                   | با گواهی EV امضا کنید، یا کاربران راستکلیک کنند ← «در هر صورت اجرا شود»                                                                                                                          |
| آزمون دود بهدلیل در حال استفاده بودن پورت شکست میخورد                       | پیش از اجرای `electron:smoke:packaged`، هر سرور توسعهٔ محلی روی پورت 20128 را متوقف کنید                                                                                                         |

## همچنین ببینید

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- منبع: `electron/main.js`، `electron/preload.js`، `electron/package.json`
- ابزارهای کمکی: `scripts/build/prepare-electron-standalone.mjs`، `scripts/dev/smoke-electron-packaged.mjs`
