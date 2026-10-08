# Electron Desktop Guide (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **ዋና የእውነት ምንጭ:** `electron/` የሥራ ቦታ
> **መጨረሻ የተዘመነው:** 2026-06-28 — v3.8.40

OmniRoute በ**Electron 41** + **electron-builder 26.10** ላይ የተገነባ ባለብዙ-መድረክ የዴስክቶፕ መተግበሪያ (Windows / macOS / Linux) ይዞ ይመጣል። የዴስክቶፕ መተግበሪያው ራሱን የቻለውን የNext.js አገልጋይ እንደ ልጅ ሂደት ያስጀምራል፣ `BrowserWindow`ን ወደ እሱ ያመለክታል፣ እንዲሁም የስርዓት ትሪ፣ ራስ-ሰር አዘማኝ፣ የIPC ድልድይ እና ምንም ውቅር የማይፈልግ የምስጢር ማስነሻ ያክላል።

## አርክቴክቸር

```
┌──────────────────────────────────────────────┐
│ የElectron ዋና ሂደት (electron/main.js)       │
│ ├─ የአንድ-ኢንስታንስ መቆለፊያ                 │
│ ├─ ልጅ ሂደት፦ ራሱን የቻለ የNext.js አገልጋይ   │
│ │   (በElectron Node runtime የሚጀመር)          │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ የስርዓት ትሪ + የአውድ ምናሌ                │
│ ├─ በelectron-updater በኩል ራስ-ሰር ማዘመን      │
│ ├─ የይዘት ደህንነት ፖሊሲ (የክፍለ ጊዜ ራስጌዎች) │
│ └─ የምስጢር ማስነሻ (JWT / API_KEY_SECRET)      │
└──────────────────────────────────────────────┘
            ↕ የIPC ድልድይ (electron/preload.js)
┌──────────────────────────────────────────────┐
│ አቅራቢ (የNext.js ዳሽቦርድ)                     │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## ስሪቶች

ከ`electron/package.json` የተረጋገጠ፦

| ጥቅል                | ስሪት                                                                |
| ------------------ | ------------------------------------------------------------------ |
| `electron`         | `^43.4.1`                                                          |
| `electron-builder` | `^26.15.3`                                                         |
| `electron-updater` | `^6.8.9`                                                           |
| `better-sqlite3`   | root `^13.0.2` (የNode-API ቀድሞ-ግንባታዎች — የElectron ዳግም ግንባታ አያስፈልግም) |
| የመተግበሪያ ስሪት        | `3.8.0`                                                            |
| የመተግበሪያ መለያ        | `online.omniroute.desktop`                                         |
| የምርት ስም            | `OmniRoute`                                                        |

## ስክሪፕቶች (root `package.json`)

| ስክሪፕት                             | ዓላማ                                                                |
| --------------------------------- | ------------------------------------------------------------------ |
| `npm run electron:dev`            | `npm run dev`ን ያስጀምራል + `localhost:20128`ን ይጠብቃል + Electronን ያስነሳል |
| `npm run electron:build`          | Next.jsን ይገነባል፣ ከዚያም ለአሁኑ OS `electron-builder`ን ያስኬዳል             |
| `npm run electron:build:win`      | የWindows NSIS ጫኚ + ተንቀሳቃሽ ስሪት (x64) ይገነባል                          |
| `npm run electron:build:mac`      | የmacOS DMG (Intel + Apple Silicon) ይገነባል                           |
| `npm run electron:build:linux`    | የLinux AppImage + DEB (x64 + arm64) ይገነባል                          |
| `npm run electron:smoke:packaged` | የታሸገውን ባይነሪ ያስነሳል፣ `/login`ን ለHTTP 200 ይፈትሻል፣ ከዚያም ያጠፋዋል           |

የ`electron/` የሥራ ቦታ የሚከተሉትንም ያቀርባል፦

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs`ን ያስኬዳል
- `npm run build:mac-x64` / `build:mac-arm64` — ባለአንድ-አርክቴክቸር macOS ግንባታዎች
- `npm run pack` — ለአካባቢያዊ ሙከራ ማውጫ-ብቻ ግንባታ (ጫኚ የለውም)

## የማውጫ አቀማመጥ

```
electron/
├── package.json              # የElectron ጥገኞች + የelectron-builder ውቅር
├── main.js                   # ዋና ሂደት (24 KB — ከታች ያሉትን ማብራሪያዎች ይመልከቱ)
├── preload.js                # የcontextBridge IPC ድልድይ
├── types.d.ts                # የAppInfo / ServerStatus / ElectronAPI ዓይነቶች
├── README.md                 # በworkspace ውስጥ ያሉ ማስታወሻዎች
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # የelectron-builder ውጤት (በgit ችላ የሚባል)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # የ.next/electron-standalone ጥቅልን ያዘጋጃል
└── dev/
    └── smoke-electron-packaged.mjs       # ከግንባታ በኋላ የሚካሄድ የsmoke ሙከራ
```

ሁለቱም `main.js` እና `preload.js` TypeScript ሳይሆኑ **CommonJS `.js` ፋይሎች** ናቸው።
የrenderer-ጎን ዓይነት መግለጫዎች `electron/types.d.ts` ውስጥ ይገኛሉ።

## IPC ድልድይ (`preload.js`)

preload፣ `contextIsolation: true` እና `nodeIntegration: false` ያለውን `contextBridge`
በመጠቀም በ`window.electronAPI` ላይ በተፈቀደ ዝርዝር ውስጥ ያለ API ያጋልጣል።

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

የተጋለጡ ዘዴዎች፦

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

የreceive አጋዥ ዘዴዎቹ በ`removeAllListeners` ላይ ከመመርኮዝ ይልቅ **disposer function**
ይመልሳሉ — ይህም የReact components እንደገና ሲጫኑ የlistener መከማቸትን ይከላከላል።

## የServer የሕይወት ዑደት

`main.js` ከsystem Node ጋር የnative-module ABI አለመጣጣምን ለማስወገድ፣
የNext.js standalone ጥቅሉን በElectron Node runtime በቀጥታ ያስነሳል፦

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

- `waitForServer()` መስኮቱን ከማሳየቱ በፊት URLን እስከ 30 s ድረስ በተደጋጋሚ ይፈትሻል (በcold start ጊዜ ባዶ ማያ አይታይም)።
- `stdio: "pipe"` stdout/stderrን ይይዛል፤ የዝግጁነት ሐረጎች (`Ready` / `listening`) `server-status: running`ን በIPC ላይ ይልካሉ።
- `before-quit` ለሰላማዊ SIGTERM (WAL checkpoint) እስከ 5 s ድረስ ይጠብቃል፤ ከዚያ SIGKILL ይልካል።
- በtray ውስጥ ያለው የport መቀየሪያ (`20128`፣ `3000`፣ `8080`) serverን ያቆማል፣ እንደገና ያስነሳል፣ ከዚያም BrowserWindowን እንደገና ይጭናል።

## ዜሮ-ውቅር የሚስጥር ማስጀመሪያ

በመጀመሪያው ማስጀመር፣ ዋናው ሂደት የጎደሉ ሚስጥሮችን በራስ-ሰር ያመነጫል እና በቋሚነት ያስቀምጣል፦

| ሚስጥር                     | ምንጭ                                                                        |
| ------------------------ | -------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                   |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (የተመሰጠሩ ማረጋገጫዎች አስቀድመው ካሉ አይቀበልም) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                   |

በ `<DATA_DIR>/server.env` ውስጥ በቋሚነት ይቀመጣሉ። `DATA_DIR` ወደሚከተሉት ይፈታል፦

- Windows፦ `%APPDATA%\omniroute`
- Linux፦ `$XDG_CONFIG_HOME/omniroute` ወይም `~/.omniroute`
- macOS፦ `~/.omniroute`

## የአካባቢ ፋይል ፍለጋ

ዋናው ሂደት አገልጋዩን ከማስጀመሩ በፊት (`electron/main.js` ውስጥ ያለው `getPreferredEnvFilePath()`)
ካሉት ውስጥ በመጀመሪያ የተገኘውን **አንድ** `.env` ፋይል ይመርጣል።

1. መተግበሪያው በተጀመረበት አካባቢ `DATA_DIR` ከተዋቀረ፣ `$DATA_DIR/.env`።
2. ከላይ ያሉትን ተመሳሳይ ነባሪዎች በመጠቀም፣ `<resolved DATA_DIR>/.env`፦ በ
   Windows `%APPDATA%\omniroute\.env`፣ በ Linux እና macOS `$XDG_CONFIG_HOME/omniroute/.env` ወይም `~/.omniroute/.env`።
3. በሂደቱ የሥራ ማውጫ ውስጥ ያለ `.env`።

ዋናው ሂደት ያንን ፋይል ብቻ ያነባል፤ ቀጥለው ያሉ እጩ ፋይሎች አይዋሃዱም። ከዚያም የአገልጋዩ
አካባቢ በሚከተለው የቅድሚያ ቅደም ተከተል ይገነባል (ከፍተኛው በመጀመሪያ)፦

1. የ Electron ሂደት አካባቢ (መተግበሪያውን ካስጀመረው ማንኛውም ነገር የተወረሱ ተለዋዋጮች)።
2. የተመረጠው `.env` ፋይል።
3. `<DATA_DIR>/server.env` (ከላይ ያሉት የማስጀመሪያ ሚስጥሮች)።

የሂደቱ አካባቢ መተግበሪያው ሲጀምር ይያዛል፤ ስለዚህ መተግበሪያው በሚሠራበት ጊዜ የተዋቀረ የስርዓት ወይም የተጠቃሚ
አካባቢ ተለዋዋጭ (መስኮቱ ከተዘጋ በኋላ በትሪው ውስጥ በሚቆይበት ጊዜ የተዋቀረንም ጨምሮ) መተግበሪያው ሙሉ በሙሉ ወጥቶ እንደገና
እስኪጀመር ድረስ ወደ አገልጋዩ አይደርስም። እንደ `CONTEXT_LENGTH_<PROVIDER>` ላሉ የአሂድ ጊዜ ቅንብሮች (
[የአካባቢ ተለዋዋጮች፦ በእያንዳንዱ አቅራቢ የዐውድ ርዝመት](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)
ይመልከቱ)፣ `.env` ፋይሉን መጠቀም ይመረጣል፤ ከዚያ ሙሉ በሙሉ ይውጡ (ትሪ፣ **ውጣ**) እና እንደገና ያስጀምሩ።

## መስኮት እና ትሪ

- `BrowserWindow`፦ 1400×900 (ዝቅተኛው 1024×700)፣ `backgroundColor: "#0a0a0a"`።
- macOS፦ `titleBarStyle: "hiddenInset"`፣ የመቆጣጠሪያ አዝራሮች በ `{ x: 16, y: 16 }`።
- Windows/Linux፦ የስርዓቱ ቤተኛ የርዕስ አሞሌ።
- የመዝጊያ አዝራሩ ወደ ትሪው ይቀንሳል፤ የትሪው ምናሌ **OmniRouteን ክፈት**፣ **ዳሽቦርድን ክፈት** (በውጫዊ አሳሽ)፣ **የአገልጋይ ወደብ** ንዑስ ምናሌ፣ **ዝማኔዎችን ፈትሽ**፣ **ውጣ** ይዟል።

## የይዘት ደኅንነት ፖሊሲ

በ `session.defaultSession.webRequest.onHeadersReceived` በኩል ይዋቀራል። ትኩረት የሚሹ መመሪያዎች፦

- `frame-ancestors 'none'`፣ `object-src 'none'`፣ `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- የልማት ሁነታ `'unsafe-eval'`ን ወደ `script-src` ብቻ ያክላል

## ራስ-ሰር ዝማኔ

`electron-updater`ን ከ GitHub አቅራቢ (`diegosouzapw/OmniRoute`) ጋር ይጠቀማል።

- `autoDownload = false`፣ `autoInstallOnAppQuit = true`
- ክስተቶች በ `update-status` IPC በኩል ወደ አሳዩ ይተላለፋሉ፦
  `checking`፣ `available`፣ `not-available`፣ `downloading` (`percent`ን ጨምሮ)፣ `downloaded`፣ `error`
- `installUpdate()` አገልጋዩን ያቋርጣል፣ ከዚያ `autoUpdater.quitAndInstall()`ን ይጠራል
- በልማት ሁነታ (`!app.isPackaged`) ይዘለላል

## የግንባታ ሂደት

1. `npm run build` → የNext.js ራሱን የቻለ ግንባታ በ`.next/standalone` ውስጥ።
2. `prepare-electron-standalone.mjs` → ወደ `.next/electron-standalone` እንደገና ያደራጃል፤ እንዲሁም ጥቅሉ ወደ ሌላ ቦታ ሊዛወር እንዲችል በ`server.js` + `required-server-files.json` ውስጥ ያሉ ፍጹም ዱካዎችን እንደገና ይጽፋል።
3. `electron-builder` `main.js`፣ `preload.js`፣ `node_modules` እና `extraResources: { ../.next/electron-standalone → app }`ን ወደ ጥቅል ያካትታል።

### የግንባታ ዒላማዎች

| ስርዓተ ክወና | ዒላማዎች                                           |
| -------- | ----------------------------------------------- |
| Windows  | NSIS ጫኚ + ተንቀሳቃሽ (x64)                          |
| macOS    | DMG (Intel + arm64፣ ወደ Applications በመጎተት የሚጫን) |
| Linux    | AppImage + DEB (x64 + arm64)                    |

የNSIS ቅንብሮች፦ `oneClick: false`፣ ተጠቃሚው የመጫኛ ማውጫውን እንዲመርጥ ያስችላል፣ እንዲሁም የDesktop እና Start-Menu አቋራጮችን ይፈጥራል።

## የታሸገውን ግንባታ የጭስ ሙከራ ማድረግ

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`፦

- ለአሁኑ መድረክ በ`electron/dist-electron/` ውስጥ ያለውን የታሸገ ማስፈጸሚያ ፋይል በራስ-ሰር ያገኛል።
- የገንቢውን ውሂብ እንዳይነካ በተነጠሉ `HOME`/`APPDATA`/`XDG_*` ማውጫዎች ያስጀምራል።
- በ45 ሰከንድ ውስጥ HTTP 200 ለማግኘት `http://127.0.0.1:20128/login`ን በተደጋጋሚ ይፈትሻል።
- stderr/stdoutን ለከባድ የስህተት ንድፎች (`Cannot find module`፣ `MODULE_NOT_FOUND`፣ `ERR_DLOPEN_FAILED`፣ `Failed to start server`፣ ወዘተ) ይከታተላል።
- ዝግጁነት ከተረጋገጠ በኋላ ለ2 ሰከንድ የተረጋጋ አፈጻጸምን ይጠብቃል፣ ከዚያ SIGTERMን ይልካል እና ወደቡ እስኪለቀቅ ይጠብቃል።
- በCI ውስጥ `--no-sandbox --disable-gpu`ን (እና በLinux ላይ `--disable-dev-shm-usage`ን) በራስ-ሰር ያስተላልፋል።

የአካባቢ ተለዋዋጭ ሽረታዎች፦ `ELECTRON_SMOKE_APP_EXECUTABLE`፣ `ELECTRON_SMOKE_URL`፣ `ELECTRON_SMOKE_TIMEOUT_MS`፣ `ELECTRON_SMOKE_SETTLE_MS`፣ `ELECTRON_SMOKE_DATA_DIR`፣ `ELECTRON_SMOKE_KEEP_DATA`፣ `ELECTRON_SMOKE_STREAM_LOGS`።

## የኮድ ፊርማ

`electron/package.json` የፊርማ ማረጋገጫዎችን በቀጥታ **አያገናኝም**። በአካባቢ ተለዋዋጮች በኩል ወደ `electron-builder` ያስተላልፉ፦

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

የAppImage ፊርማ አማራጭ ነው — ፊርማ ለማድረግ `LINUX_GPG_KEY`ን ያዘጋጁ።

## ስርጭት

የግንባታ ውጤቶች በ`electron/dist-electron/` ውስጥ ይቀመጣሉ፦

- `OmniRoute.Setup.X.Y.Z.exe`፣ `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`፣ `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`፣ `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

ልቀቶች በGitHub Releases (`diegosouzapw/OmniRoute`) ላይ ይታተማሉ፤ `electron-updater`ም አዳዲስ ስሪቶችን የሚፈትሸው በዚያው ነው።

## መላ ፍለጋ

| ምልክት                                                            | መፍትሔ                                                                                                                                       |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Electron ዋና ስሪት ከተሻሻለ በኋላ `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 የNode-API ቅድመ-ግንባታዎችን ያቀርባል — በስር ማውጫው ውስጥ `npm install`ን እና `prepare:bundle`ን እንደገና ያስኪዱ (ለአሁኑ መድረክ ቅድመ-ግንባታውን ያረጋግጣል) |
| ለኔቲቭ ሞጁል `ERR_DLOPEN_FAILED`                                    | `prepare:bundle`ን እንደገና ያስኪዱ — ለአሁኑ መድረክ የNode-API ቅድመ-ግንባታ ከጎደለ ወዲያውኑ በስህተት ይቋረጣል                                                         |
| በLinux ላይ መስኮቱ ባዶ ሆኖ ይታያል                                       | የNext.js አገልጋይ በእርግጥ ከPORT ጋር መያያዙን ያረጋግጡ (`[Server]` ምዝግቦችን ይፈትሹ)                                                                         |
| የmacOS ኖተራይዜሽን ሂደት ይቆማል                                         | `APPLE_*` ተለዋዋጮች ወደ ውጭ መላካቸውን ያረጋግጡ፤ በ`.env` ውስጥ ብቻ መኖራቸው በቂ አይደለም                                                                         |
| የWindows SmartScreen ማስጠንቀቂያ                                    | በEV ሰርተፍኬት ይፈርሙ፣ ወይም ተጠቃሚዎች ቀኝ-ጠቅ አድርገው → "Run anyway"ን ይምረጡ                                                                               |
| ወደቡ በጥቅም ላይ በመሆኑ የጭስ ሙከራው ይከሽፋል                                 | `electron:smoke:packaged`ን ከማስኬድዎ በፊት በ20128 ላይ ያለ ማንኛውንም የአካባቢ ልማት አገልጋይ ያቁሙ                                                              |

## በተጨማሪ ይመልከቱ

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- ምንጭ፦ `electron/main.js`፣ `electron/preload.js`፣ `electron/package.json`
- ረዳቶች፦ `scripts/build/prepare-electron-standalone.mjs`፣ `scripts/dev/smoke-electron-packaged.mjs`
