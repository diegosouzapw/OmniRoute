# Electron Desktop Guide (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **সত্যের উৎস:** `electron/` ওয়ার্কস্পেস
> **সর্বশেষ হালনাগাদ:** 2026-06-28 — v3.8.40

OmniRoute একটি ক্রস-প্ল্যাটফর্ম ডেস্কটপ অ্যাপ (Windows / macOS / Linux) সরবরাহ করে, যা
**Electron 41** + **electron-builder 26.10**-এর ওপর নির্মিত। ডেস্কটপ অ্যাপটি Next.js
স্ট্যান্ডঅ্যালোন সার্ভারকে একটি চাইল্ড প্রসেস হিসেবে চালু করে, একটি `BrowserWindow`-কে এর দিকে
নির্দেশ করে এবং একটি সিস্টেম ট্রে, স্বয়ংক্রিয় আপডেটার, IPC ব্রিজ ও শূন্য-কনফিগারেশন সিক্রেট বুটস্ট্র্যাপ যোগ করে।

## আর্কিটেকচার

```
┌──────────────────────────────────────────────┐
│ Electron প্রধান প্রসেস (electron/main.js)   │
│ ├─ একক-ইনস্ট্যান্স লক                        │
│ ├─ চাইল্ড প্রসেস: Next.js স্ট্যান্ডঅ্যালোন সার্ভার │
│ │   (Electron-এর Node রানটাইম দিয়ে চালু)    │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ সিস্টেম ট্রে + কনটেক্সট মেনু              │
│ ├─ electron-updater-এর মাধ্যমে স্বয়ংক্রিয় আপডেট │
│ ├─ কনটেন্ট সিকিউরিটি পলিসি (সেশন হেডার)     │
│ └─ সিক্রেট বুটস্ট্র্যাপ (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────┘
            ↕ IPC ব্রিজ (electron/preload.js)
┌──────────────────────────────────────────────┐
│ রেন্ডারার (Next.js ড্যাশবোর্ড)               │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## সংস্করণসমূহ

`electron/package.json` থেকে নিশ্চিত করা হয়েছে:

| প্যাকেজ            | সংস্করণ                                                              |
| ------------------ | -------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                            |
| `electron-builder` | `^26.15.3`                                                           |
| `electron-updater` | `^6.8.9`                                                             |
| `better-sqlite3`   | রুট `^13.0.2` (Node-API প্রিবিল্ড — Electron রিবিল্ডের প্রয়োজন নেই) |
| অ্যাপ সংস্করণ      | `3.8.0`                                                              |
| অ্যাপ আইডি         | `online.omniroute.desktop`                                           |
| পণ্যের নাম         | `OmniRoute`                                                          |

## স্ক্রিপ্টসমূহ (রুট `package.json`)

| স্ক্রিপ্ট                         | উদ্দেশ্য                                                                               |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` চালু করে + `localhost:20128`-এর জন্য অপেক্ষা করে + Electron চালু করে     |
| `npm run electron:build`          | Next.js বিল্ড করে, তারপর বর্তমান OS-এর জন্য `electron-builder` চালায়                  |
| `npm run electron:build:win`      | Windows NSIS ইনস্টলার + পোর্টেবল (x64) বিল্ড করে                                       |
| `npm run electron:build:mac`      | macOS DMG (Intel + Apple Silicon) বিল্ড করে                                            |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) বিল্ড করে                                           |
| `npm run electron:smoke:packaged` | প্যাকেজ করা বাইনারি চালু করে এবং HTTP 200-এর জন্য `/login` পরীক্ষা করে, তারপর বন্ধ করে |

`electron/` ওয়ার্কস্পেসটি আরও যেগুলো উন্মুক্ত করে:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` চালায়
- `npm run build:mac-x64` / `build:mac-arm64` — একক-আর্কিটেকচারের macOS বিল্ড
- `npm run pack` — স্থানীয় পরীক্ষার জন্য শুধু-ডিরেক্টরি বিল্ড (কোনো ইনস্টলার নয়)

## ডিরেক্টরি বিন্যাস

```
electron/
├── package.json              # Electron নির্ভরতা + electron-builder কনফিগারেশন
├── main.js                   # প্রধান প্রসেস (24 KB — নিচের টীকা দেখুন)
├── preload.js                # contextBridge IPC ব্রিজ
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI টাইপ
├── README.md                 # ওয়ার্কস্পেসের অভ্যন্তরীণ নোট
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder আউটপুট (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone বান্ডেল প্রস্তুত করে
└── dev/
    └── smoke-electron-packaged.mjs       # বিল্ড-পরবর্তী স্মোক টেস্ট
```

`main.js` এবং `preload.js` উভয়ই **CommonJS `.js` ফাইল**, TypeScript নয়। রেন্ডারার-পক্ষের
টাইপিংগুলো `electron/types.d.ts`-এ রয়েছে।

## IPC ব্রিজ (`preload.js`)

প্রিলোডটি `contextIsolation: true` এবং `nodeIntegration: false` সহ `contextBridge`
ব্যবহার করে `window.electronAPI`-তে একটি অনুমোদিত তালিকাভুক্ত API উন্মুক্ত করে।

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

উন্মুক্ত মেথডসমূহ:

| রেন্ডারার কল                                                      | ধরন                          |
| ----------------------------------------------------------------- | ---------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                       |
| `openExternal(url)`                                               | invoke                       |
| `getDataDir()`                                                    | invoke                       |
| `restartServer()`                                                 | invoke                       |
| `getAppVersion()`                                                 | invoke                       |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                       |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                         |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (ডিসপোজার ফেরত দেয়) |

রিসিভ হেল্পারগুলো `removeAllListeners`-এর ওপর নির্ভর না করে একটি **ডিসপোজার ফাংশন**
ফেরত দেয় — React কম্পোনেন্ট পুনরায় মাউন্ট হলে এটি লিসেনার জমা হওয়া প্রতিরোধ করে।

## সার্ভারের জীবনচক্র

সিস্টেম Node-এর সঙ্গে নেটিভ-মডিউল ABI-এর অমিল এড়াতে `main.js`, Electron Node
রানটাইম দিয়ে সরাসরি Next.js স্ট্যান্ডঅ্যালোন বান্ডেল চালু করে:

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

উল্লেখযোগ্য বিষয়:

- উইন্ডো দেখানোর আগে `waitForServer()` সর্বোচ্চ 30 s পর্যন্ত URL পোল করে (কোল্ড স্টার্টে কোনো ফাঁকা স্ক্রিন থাকে না)।
- `stdio: "pipe"` stdout/stderr ধারণ করে; প্রস্তুতিসূচক বাক্যাংশ (`Ready` / `listening`) IPC-এর মাধ্যমে `server-status: running` নির্গত করে।
- `before-quit` স্বাভাবিক SIGTERM-এর (WAL checkpoint) জন্য সর্বোচ্চ 5 s অপেক্ষা করে, তারপর SIGKILL পাঠায়।
- ট্রের পোর্ট সুইচার (`20128`, `3000`, `8080`) সার্ভার বন্ধ করে পুনরায় চালু করে, তারপর BrowserWindow রিলোড করে।

## শূন্য-কনফিগারেশন সিক্রেট বুটস্ট্র্যাপ

প্রথমবার চালু হলে, মূল প্রসেস অনুপস্থিত সিক্রেটগুলো স্বয়ংক্রিয়ভাবে তৈরি করে এবং স্থায়ীভাবে সংরক্ষণ করে:

| সিক্রেট                  | উৎস                                                                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (এনক্রিপ্ট করা ক্রেডেনশিয়াল আগে থেকেই থাকলে প্রত্যাখ্যান করে) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                |

`<DATA_DIR>/server.env`-এ স্থায়ীভাবে সংরক্ষিত হয়। `DATA_DIR` যেভাবে নির্ধারিত হয়:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` অথবা `~/.omniroute`
- macOS: `~/.omniroute`

## উইন্ডো ও ট্রে

- `BrowserWindow`: 1400×900 (সর্বনিম্ন 1024×700), `backgroundColor: "#0a0a0a"`।
- macOS: `titleBarStyle: "hiddenInset"`, ট্র্যাফিক-লাইট `{ x: 16, y: 16 }`-এ।
- Windows/Linux: নেটিভ টাইটেল বার।
- ক্লোজ বোতাম উইন্ডোটিকে ট্রেতে মিনিমাইজ করে; ট্রে মেনুতে রয়েছে **OmniRoute খুলুন**, **ড্যাশবোর্ড খুলুন** (বাহ্যিক ব্রাউজারে), **সার্ভার পোর্ট** সাবমেনু, **আপডেট পরীক্ষা করুন**, **প্রস্থান করুন**।

## কনটেন্ট সিকিউরিটি পলিসি

`session.defaultSession.webRequest.onHeadersReceived`-এর মাধ্যমে সেট করা হয়। উল্লেখযোগ্য নির্দেশনাগুলো:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- ডেভ মোডে কেবল `script-src`-এ `'unsafe-eval'` যোগ করা হয়

## স্বয়ংক্রিয় আপডেট

GitHub প্রোভাইডার (`diegosouzapw/OmniRoute`) সহ `electron-updater` ব্যবহার করে।

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- `update-status` IPC-এর মাধ্যমে ইভেন্টগুলো রেন্ডারারে ফরওয়ার্ড করা হয়:
  `checking`, `available`, `not-available`, `downloading` (`percent`-সহ), `downloaded`, `error`
- `installUpdate()` সার্ভার বন্ধ করে, তারপর `autoUpdater.quitAndInstall()` কল করে
- ডেভ মোডে (`!app.isPackaged`) এড়িয়ে যাওয়া হয়

## বিল্ড পাইপলাইন

1. `npm run build` → `.next/standalone`-এ Next.js standalone।
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone`-এ পুনরায় স্টেজ করে এবং `server.js` + `required-server-files.json`-এর ভেতরের অ্যাবসোলিউট পাথগুলো পুনর্লিখন করে, যাতে বান্ডেলটি স্থানান্তরযোগ্য হয়।
3. `electron-builder`, `main.js`, `preload.js`, `node_modules`, এবং `extraResources: { ../.next/electron-standalone → app }` প্যাকেজ করে।

### বিল্ড টার্গেট

| OS      | টার্গেট                                      |
| ------- | -------------------------------------------- |
| Windows | NSIS ইনস্টলার + পোর্টেবল (x64)               |
| macOS   | DMG (Intel + arm64, ড্র্যাগ-টু-Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                 |

NSIS সেটিংস: `oneClick: false`, ব্যবহারকারীকে ইনস্টল ডিরেক্টরি বেছে নিতে দেয় এবং Desktop ও Start-Menu শর্টকাট তৈরি করে।

## প্যাকেজ করা বিল্ডের স্মোক টেস্টিং

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- বর্তমান প্ল্যাটফর্মের জন্য `electron/dist-electron/`-এ প্যাকেজ করা বাইনারি স্বয়ংক্রিয়ভাবে শনাক্ত করে।
- বিচ্ছিন্ন `HOME`/`APPDATA`/`XDG_*` ডিরেক্টরি দিয়ে চালু করে, যাতে এটি ডেভেলপারের ডেটা স্পর্শ না করে।
- 45 s-এর মধ্যে HTTP 200 পাওয়ার জন্য `http://127.0.0.1:20128/login` পোল করে।
- মারাত্মক প্যাটার্নের জন্য stderr/stdout পর্যবেক্ষণ করে (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, ইত্যাদি)।
- প্রস্তুত হওয়ার পর 2 s স্থিতিশীল রানটাইমের জন্য অপেক্ষা করে, তারপর SIGTERM পাঠায় এবং পোর্টটি মুক্ত হওয়া পর্যন্ত অপেক্ষা করে।
- CI-তে স্বয়ংক্রিয়ভাবে `--no-sandbox --disable-gpu` (এবং Linux-এ `--disable-dev-shm-usage`) পাস করে।

পরিবেশগত ওভাররাইড: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`।

## কোড সাইনিং

`electron/package.json`-এ সাইনিং ক্রেডেনশিয়াল সরাসরি সংযুক্ত করা নেই। env vars-এর মাধ্যমে সেগুলো `electron-builder`-এ পাঠান:

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

AppImage সাইনিং ঐচ্ছিক — সাইন করতে চাইলে `LINUX_GPG_KEY` সেট করুন।

## বিতরণ

আর্টিফ্যাক্টগুলো `electron/dist-electron/`-এ তৈরি হয়:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

রিলিজগুলো GitHub Releases-এ (`diegosouzapw/OmniRoute`) প্রকাশিত হয়, এবং `electron-updater` এখানেই নতুন সংস্করণ খোঁজে।

## সমস্যা সমাধান

| উপসর্গ                                                                           | সমাধান                                                                                                                                                 |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Electron-এর প্রধান সংস্করণ আপগ্রেড করার পর `Cannot find module 'better-sqlite3'` | better-sqlite3 v13-এ Node-API prebuild রয়েছে — রুটে আবার `npm install` এবং `prepare:bundle` চালান (এটি বর্তমান প্ল্যাটফর্মের জন্য prebuild যাচাই করে) |
| নেটিভ মডিউলের জন্য `ERR_DLOPEN_FAILED`                                           | `prepare:bundle` আবার চালান — বর্তমান প্ল্যাটফর্মের জন্য Node-API prebuild অনুপস্থিত থাকলে এটি দ্রুত ব্যর্থ হয়                                        |
| Linux-এ উইন্ডো ফাঁকা দেখায়                                                      | Next.js সার্ভারটি সত্যিই PORT-এ bind হয়েছে কি না নিশ্চিত করুন (`[Server]` লগ পরীক্ষা করুন)                                                            |
| macOS notarization স্থবির হয়ে যায়                                              | নিশ্চিত করুন যে `APPLE_*` vars export করা হয়েছে, শুধু `.env`-এ রাখা হয়নি                                                                             |
| Windows SmartScreen সতর্কতা                                                      | EV cert দিয়ে সাইন করুন, অথবা ব্যবহারকারীরা রাইট-ক্লিক → "Run anyway" নির্বাচন করতে পারেন                                                              |
| পোর্ট ব্যবহৃত থাকায় smoke test ব্যর্থ হয়                                       | `electron:smoke:packaged` চালানোর আগে 20128 পোর্টে চলমান যেকোনো লোকাল dev server বন্ধ করুন                                                             |

## আরও দেখুন

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- সোর্স: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- সহায়ক স্ক্রিপ্ট: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
