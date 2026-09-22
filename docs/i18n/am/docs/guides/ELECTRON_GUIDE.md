# Electron Desktop Guide (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **ዋና የመረጃ ምንጭ:** `electron/` workspace
> **መጨረሻ የተዘመነው:** 2026-06-28 — v3.8.40

OmniRoute በ**Electron 41** + **electron-builder 26.10** ላይ የተገነባ በበርካታ መድረኮች (Windows / macOS / Linux) ላይ የሚሠራ የዴስክቶፕ መተግበሪያ ይዞ ይመጣል። የዴስክቶፕ መተግበሪያው የNext.js standalone አገልጋይን እንደ ልጅ ሂደት ያስጀምራል፣ `BrowserWindow`ን ወደ እሱ ያመለክታል፣ እንዲሁም የስርዓት ትሪ፣ ራስ-ሰር ማዘመኛ፣ የIPC ድልድይ እና ምንም ውቅር የማይፈልግ የሚስጥር ማስነሻ ያክላል።

## ሥነ ሕንፃ

```
┌──────────────────────────────────────────────┐
│ የElectron ዋና ሂደት (electron/main.js)       │
│ ├─ የነጠላ ኢንስታንስ መቆለፊያ                │
│ ├─ ልጅ ሂደት፦ Next.js standalone አገልጋይ   │
│ │   (በElectron Node የማስኬጃ አካባቢ የሚጀመር) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ የስርዓት ትሪ + የአውድ ምናሌ              │
│ ├─ በelectron-updater በኩል ራስ-ሰር ማዘመን    │
│ ├─ የይዘት ደህንነት ፖሊሲ (የክፍለ ጊዜ ራስጌዎች) │
│ └─ የሚስጥር ማስነሻ (JWT / API_KEY_SECRET)    │
└──────────────────────────────────────────────┘
            ↕ የIPC ድልድይ (electron/preload.js)
┌──────────────────────────────────────────────┐
│ አቅራቢ (Next.js ዳሽቦርድ)                     │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## ስሪቶች

ከ`electron/package.json` የተረጋገጠ፦

| ጥቅል                | ስሪት                                                                  |
| ------------------ | -------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                            |
| `electron-builder` | `^26.15.3`                                                           |
| `electron-updater` | `^6.8.9`                                                             |
| `better-sqlite3`   | root `^13.0.2` (የNode-API አስቀድሞ ግንባታዎች — የElectron ዳግም ግንባታ አያስፈልግም) |
| የመተግበሪያ ስሪት        | `3.8.0`                                                              |
| የመተግበሪያ መታወቂያ      | `online.omniroute.desktop`                                           |
| የምርት ስም            | `OmniRoute`                                                          |

## ስክሪፕቶች (root `package.json`)

| ስክሪፕት                             | ዓላማ                                                                 |
| --------------------------------- | ------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev`ን ያስጀምራል + `localhost:20128`ን ይጠብቃል + Electronን ያስጀምራል |
| `npm run electron:build`          | Next.jsን ይገነባል፣ ከዚያም ለአሁኑ OS `electron-builder`ን ያስኬዳል              |
| `npm run electron:build:win`      | የWindows NSIS ጫኝ + ተንቀሳቃሽ ስሪት (x64) ይገነባል                           |
| `npm run electron:build:mac`      | የmacOS DMG (Intel + Apple Silicon) ይገነባል                            |
| `npm run electron:build:linux`    | የLinux AppImage + DEB (x64 + arm64) ይገነባል                           |
| `npm run electron:smoke:packaged` | የታሸገውን ባይነሪ ያስጀምራል፣ `/login`ን ለHTTP 200 ይመረምራል፣ ከዚያም ያቆማል           |

የ`electron/` workspace የሚከተሉትንም ያቀርባል፦

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs`ን ያስኬዳል
- `npm run build:mac-x64` / `build:mac-arm64` — የነጠላ አርክቴክቸር macOS ግንባታዎች
- `npm run pack` — ለአካባቢያዊ ሙከራ የማውጫ-ብቻ ግንባታ (ጫኝ የሌለው)

## የማውጫ አቀማመጥ

```
electron/
├── package.json              # የElectron ጥገኞች + የelectron-builder ውቅር
├── main.js                   # ዋና ሂደት (24 KB — ከታች ያሉትን ማብራሪያዎች ይመልከቱ)
├── preload.js                # የcontextBridge IPC ድልድይ
├── types.d.ts                # የAppInfo / ServerStatus / ElectronAPI ዓይነቶች
├── README.md                 # በworkspace ውስጥ ያሉ ማስታወሻዎች
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # የelectron-builder ውጤት (በgit ችላ የተባለ)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # የ.next/electron-standalone ጥቅልን ያዘጋጃል
└── dev/
    └── smoke-electron-packaged.mjs       # ከግንባታ በኋላ የሚደረግ የsmoke ሙከራ
```

ሁለቱም `main.js` እና `preload.js` TypeScript ሳይሆኑ **CommonJS `.js` ፋይሎች** ናቸው።
የrenderer ወገን ዓይነት መግለጫዎች `electron/types.d.ts` ውስጥ ይገኛሉ።

## IPC ድልድይ (`preload.js`)

preload በ`contextIsolation: true` እና `nodeIntegration: false`፣ `contextBridge`ን
በመጠቀም በተፈቀደለት ዝርዝር ውስጥ ያለ APIን በ`window.electronAPI` ላይ ያቀርባል።

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

የቀረቡ ሜተዶች፦

| የRenderer ጥሪ                                                      | ዓይነት                     |
| ----------------------------------------------------------------- | ------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                   |
| `openExternal(url)`                                               | invoke                   |
| `getDataDir()`                                                    | invoke                   |
| `restartServer()`                                                 | invoke                   |
| `getAppVersion()`                                                 | invoke                   |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                   |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (disposer ይመልሳል) |

የreceive አጋዥ ሜተዶች በ`removeAllListeners` ላይ ከመመሥረት ይልቅ **disposer function**
ይመልሳሉ — ይህም React components እንደገና በሚጫኑበት ጊዜ listener እንዳይከማች ይከላከላል።

## የServer የሕይወት ዑደት

`main.js` ከsystem Node ጋር የnative-module ABI አለመጣጣምን ለማስወገድ፣ የNext.js standalone
ጥቅልን በElectron Node runtime በቀጥታ ያስጀምራል፦

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

ዋና ዋና ነጥቦች፦

- `waitForServer()` windowን ከማሳየቱ በፊት URLን እስከ 30 s ድረስ በየጊዜው ይፈትሻል (በcold start ጊዜ ባዶ ማያ ገጽ አይታይም)።
- `stdio: "pipe"` stdout/stderrን ይይዛል፤ የዝግጁነት ሐረጎች (`Ready` / `listening`) `server-status: running`ን በIPC ይልካሉ።
- `before-quit` ለሰላማዊ SIGTERM (WAL checkpoint) እስከ 5 s ድረስ ይጠብቃል፣ ከዚያ SIGKILLን ይልካል።
- በtray ውስጥ ያለው የport መቀየሪያ (`20128`, `3000`, `8080`) serverን አቁሞ እንደገና ያስጀምራል፣ ከዚያም BrowserWindowን እንደገና ይጭናል።

## ዜሮ-ውቅር ሚስጥር ማስጀመሪያ

በመጀመሪያው ማስጀመር፣ ዋናው ፕሮሰስ የጎደሉ ሚስጥሮችን በራስ-ሰር ያመነጫል እና ያስቀምጣል፦

| ሚስጥር                     | ምንጭ                                                                             |
| ------------------------ | ------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                        |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (የተመሰጠሩ የመግቢያ መረጃዎች አስቀድመው ካሉ እምቢ ይላል) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                        |

በ`<DATA_DIR>/server.env` ውስጥ ይቀመጣል። `DATA_DIR` እንደሚከተለው ይፈታል፦

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ወይም `~/.omniroute`
- macOS: `~/.omniroute`

## መስኮት እና ሲስተም ትሪ

- `BrowserWindow`: 1400×900 (ዝቅተኛው 1024×700)፣ `backgroundColor: "#0a0a0a"`።
- macOS: `titleBarStyle: "hiddenInset"`፣ የመስኮት መቆጣጠሪያ አዝራሮች በ`{ x: 16, y: 16 }`።
- Windows/Linux: የስርዓቱ ተወላጅ የርዕስ አሞሌ።
- የመዝጊያ አዝራሩ ወደ ሲስተም ትሪ ያሳንሳል፤ የትሪው ምናሌ **OmniRouteን ክፈት**፣ **ዳሽቦርድን ክፈት** (በውጫዊ አሳሽ)፣ **የሰርቨር ፖርት** ንዑስ ምናሌ፣ **ዝማኔዎችን ፈልግ**፣ **ውጣ** አሉት።

## የይዘት ደህንነት ፖሊሲ

በ`session.defaultSession.webRequest.onHeadersReceived` በኩል ይዋቀራል። ዋና ዋና መመሪያዎች፦

- `frame-ancestors 'none'`፣ `object-src 'none'`፣ `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- የልማት ሁነታ `'unsafe-eval'`ን ወደ `script-src` ብቻ ይጨምራል

## ራስ-ሰር ዝማኔ

`electron-updater`ን ከGitHub አቅራቢ (`diegosouzapw/OmniRoute`) ጋር ይጠቀማል።

- `autoDownload = false`፣ `autoInstallOnAppQuit = true`
- ክስተቶች በ`update-status` IPC በኩል ወደ renderer ይተላለፋሉ፦
  `checking`፣ `available`፣ `not-available`፣ `downloading` (`percent`ን ጨምሮ)፣ `downloaded`፣ `error`
- `installUpdate()` ሰርቨሩን ካቆመ በኋላ `autoUpdater.quitAndInstall()`ን ይጠራል
- በልማት ሁነታ (`!app.isPackaged`) ይዘለላል

## የግንባታ ሂደት

1. `npm run build` → Next.js standalone በ`.next/standalone` ውስጥ።
2. `prepare-electron-standalone.mjs` → ወደ `.next/electron-standalone` እንደገና ያዘጋጃል፣ እንዲሁም ጥቅሉ ቦታውን መቀየር እንዲችል በ`server.js` + `required-server-files.json` ውስጥ ያሉ ፍጹም ዱካዎችን እንደገና ይጽፋል።
3. `electron-builder` `main.js`፣ `preload.js`፣ `node_modules` እና `extraResources: { ../.next/electron-standalone → app }`ን ያሽጋል።

### የግንባታ ዒላማዎች

| ስርዓተ ክወና | ዒላማዎች                                         |
| -------- | --------------------------------------------- |
| Windows  | NSIS ጫኚ + ተንቀሳቃሽ (x64)                        |
| macOS    | DMG (Intel + arm64፣ ወደ Applications ጎትቶ በመጣል) |
| Linux    | AppImage + DEB (x64 + arm64)                  |

የNSIS ቅንብሮች፦ `oneClick: false`፣ ተጠቃሚው የመጫኛ ማውጫውን እንዲመርጥ ያስችላል፣ የዴስክቶፕ እና የStart-Menu አቋራጮችን ይፈጥራል።

## የታሸገውን ግንባታ የጭስ ሙከራ ማድረግ

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`፦

- ለአሁኑ መድረክ በ`electron/dist-electron/` ውስጥ ያለውን የታሸገ executable በራስ-ሰር ያገኛል።
- የገንቢውን ውሂብ እንዳይነካ በተነጠሉ `HOME`/`APPDATA`/`XDG_*` ማውጫዎች ያስጀምራል።
- በ45 s ውስጥ HTTP 200 ለማግኘት `http://127.0.0.1:20128/login`ን በተደጋጋሚ ይፈትሻል።
- ለከባድ የስህተት ቅጦች (`Cannot find module`፣ `MODULE_NOT_FOUND`፣ `ERR_DLOPEN_FAILED`፣ `Failed to start server`፣ ወዘተ) stderr/stdoutን ይከታተላል።
- ዝግጁነት ከተረጋገጠ በኋላ ለ2 s የተረጋጋ የማስኬጃ ጊዜ ይጠብቃል፣ ከዚያ SIGTERMን ይልካል እና ፖርቱ ነፃ እስኪሆን ይጠብቃል።
- በCI ውስጥ፣ `--no-sandbox --disable-gpu`ን (እና በLinux ላይ `--disable-dev-shm-usage`ን) በራስ-ሰር ያስተላልፋል።

የአካባቢ ተለዋዋጭ መሻሮች፦ `ELECTRON_SMOKE_APP_EXECUTABLE`፣ `ELECTRON_SMOKE_URL`፣ `ELECTRON_SMOKE_TIMEOUT_MS`፣ `ELECTRON_SMOKE_SETTLE_MS`፣ `ELECTRON_SMOKE_DATA_DIR`፣ `ELECTRON_SMOKE_KEEP_DATA`፣ `ELECTRON_SMOKE_STREAM_LOGS`።

## የኮድ ፊርማ

`electron/package.json` የፊርማ ማረጋገጫዎችን በቀጥታ **አያዋቅርም**። በenv vars በኩል ወደ `electron-builder` ያስተላልፏቸው፦

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

የAppImage ፊርማ አማራጭ ነው — ፊርማ የሚደረግ ከሆነ `LINUX_GPG_KEY`ን ያዘጋጁ።

## ስርጭት

የግንባታ ውጤቶች በ`electron/dist-electron/` ውስጥ ይቀመጣሉ፦

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

ልቀቶች በGitHub Releases (`diegosouzapw/OmniRoute`) ላይ ይታተማሉ፤ `electron-updater`ም አዳዲስ ስሪቶችን የሚፈትሸው በዚያው ነው።

## ችግር መፍታት

| ምልክት                                                            | መፍትሔ                                                                                                                                        |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| ከElectron ዋና ስሪት ማሻሻያ በኋላ `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 የNode-API ቀድሞ ግንባታዎችን ይዞ ይመጣል — በስር ማውጫው ላይ `npm install`ን እና `prepare:bundle`ን እንደገና ያስኪዱ (ለአሁኑ መድረክ ቀድሞ ግንባታውን ያረጋግጣል) |
| ለnative module `ERR_DLOPEN_FAILED`                              | `prepare:bundle`ን እንደገና ያስኪዱ — ለአሁኑ መድረክ የNode-API ቀድሞ ግንባታ ሲጎድል ወዲያውኑ ያቋርጣል                                                                |
| በLinux ላይ መስኮቱ ባዶ ሆኖ ይታያል                                       | የNext.js server በትክክል ከPORT ጋር መገናኘቱን ያረጋግጡ (`[Server]` logsን ይፈትሹ)                                                                         |
| የmacOS notarization ሂደት ይቆማል                                    | `APPLE_*` vars በ`.env` ውስጥ ብቻ ሳይሆኑ export መደረጋቸውን ያረጋግጡ                                                                                     |
| የWindows SmartScreen ማስጠንቀቂያ                                    | በEV cert ይፈርሙ፣ ወይም ተጠቃሚዎች ቀኝ-ጠቅ አድርገው → "ለማንኛውም አስኪድ" የሚለውን ይምረጡ                                                                            |
| የport-in-use ስህተት ምክንያት smoke test አይሳካም                        | `electron:smoke:packaged`ን ከማስኬድዎ በፊት በ20128 ላይ ያለ ማንኛውንም local dev server ያቁሙ                                                              |

## ተጨማሪ ይመልከቱ

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- ምንጭ፦ `electron/main.js`, `electron/preload.js`, `electron/package.json`
- ረዳቶች፦ `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
