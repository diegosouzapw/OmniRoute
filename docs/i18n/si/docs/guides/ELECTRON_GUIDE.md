# Electron Desktop Guide (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **සත්යයේ මූලාශ්රය:** `electron/` workspace
> **අවසන් වරට යාවත්කාලීන කළේ:** 2026-06-28 — v3.8.40

OmniRoute විසින් **Electron 41** + **electron-builder 26.10** මත ගොඩනැගූ හරස්-වේදිකා desktop යෙදුමක් (Windows / macOS / Linux) සපයයි. desktop යෙදුම Next.js standalone server එක child process එකක් ලෙස ආරම්භ කර, `BrowserWindow` එකක් ඒ වෙත යොමු කර, system tray එකක්, auto-updater එකක්, IPC bridge එකක් සහ configuration අවශ්ය නොවන secret bootstrap එකක් එක් කරයි.

## ගෘහනිර්මාණය

```
┌──────────────────────────────────────────────┐
│ Electron ප්රධාන process එක (electron/main.js) │
│ ├─ තනි-instance lock එක                      │
│ ├─ Child process එක: Next.js standalone server │
│ │   (Electron හි Node runtime එකෙන් ආරම්භ වේ) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ System tray + context menu                │
│ ├─ electron-updater හරහා auto-update කිරීම  │
│ ├─ Content Security Policy (session headers) │
│ └─ Secret bootstrap (JWT / API_KEY_SECRET)   │
└──────────────────────────────────────────────┘
            ↕ IPC bridge (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderer (Next.js dashboard)                 │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## අනුවාද

`electron/package.json` වෙතින් තහවුරු කර ඇත:

| Package            | අනුවාදය                                                           |
| ------------------ | ----------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                         |
| `electron-builder` | `^26.15.3`                                                        |
| `electron-updater` | `^6.8.9`                                                          |
| `better-sqlite3`   | root `^13.0.2` (Node-API prebuilds — Electron rebuild අවශ්ය නොවේ) |
| යෙදුම් අනුවාදය     | `3.8.0`                                                           |
| යෙදුම් id එක       | `online.omniroute.desktop`                                        |
| නිෂ්පාදන නාමය      | `OmniRoute`                                                       |

## Scripts (root `package.json`)

| Script                            | අරමුණ                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` ආරම්භ කරයි + `localhost:20128` සඳහා රැඳී සිටියි + Electron දියත් කරයි |
| `npm run electron:build`          | Next.js build කර, පවතින OS එක සඳහා `electron-builder` ධාවනය කරයි                    |
| `npm run electron:build:win`      | Windows NSIS installer එක + portable අනුවාදය (x64) build කරයි                       |
| `npm run electron:build:mac`      | macOS DMG (Intel + Apple Silicon) build කරයි                                        |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) build කරයි                                       |
| `npm run electron:smoke:packaged` | ඇසුරුම් කළ binary එක දියත් කර HTTP 200 සඳහා `/login` පරීක්ෂා කර, පසුව වසා දමයි      |

`electron/` workspace එක පහත දෑ ද සපයයි:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` ධාවනය කරයි
- `npm run build:mac-x64` / `build:mac-arm64` — තනි-architecture macOS builds
- `npm run pack` — දේශීය පරීක්ෂණ සඳහා directory-only build එකක් (installer එකක් නොමැත)

## නාමාවලි සැකැස්ම

```
electron/
├── package.json              # Electron පරායත්තතා + electron-builder වින්යාසය
├── main.js                   # ප්රධාන ක්රියාවලිය (24 KB — පහත විවරණ බලන්න)
├── preload.js                # contextBridge IPC පාලම
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI වර්ග
├── README.md                 # වැඩබිම තුළ සටහන්
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder ප්රතිදානය (git විසින් නොසලකා හරින ලද)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone මිටිය සූදානම් කරයි
└── dev/
    └── smoke-electron-packaged.mjs       # ගොඩනැගීමෙන් පසු smoke පරීක්ෂණය
```

`main.js` සහ `preload.js` යන දෙකම TypeScript නොව, **CommonJS `.js` ගොනු** වේ.
renderer පාර්ශ්වයේ වර්ග අර්ථදැක්වීම් `electron/types.d.ts` තුළ පිහිටයි.

## IPC පාලම (`preload.js`)

preload එක `contextIsolation: true` සහ `nodeIntegration: false` සමඟ `contextBridge`
භාවිතයෙන් `window.electronAPI` මත අවසරලත් ලැයිස්තුවකට සීමා කළ API එකක් නිරාවරණය කරයි.

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

නිරාවරණය කළ ක්රම:

| Renderer ඇමතුම                                                    | වර්ගය                                       |
| ----------------------------------------------------------------- | ------------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                      |
| `openExternal(url)`                                               | invoke                                      |
| `getDataDir()`                                                    | invoke                                      |
| `restartServer()`                                                 | invoke                                      |
| `getAppVersion()`                                                 | invoke                                      |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                      |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                        |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (ඉවත්කිරීමේ ශ්රිතයක් ආපසු ලබා දෙයි) |

receive උපකාරකයන් `removeAllListeners` මත රඳා සිටීම වෙනුවට **ඉවත්කිරීමේ ශ්රිතයක්**
ආපසු ලබා දෙයි — React සංරචක නැවත සවිකරන විට listener එකතු වීම මෙයින් වළක්වයි.

## සේවාදායක ජීවන චක්රය

පද්ධතියේ Node සමඟ native-module ABI නොගැළපීම වළක්වා ගැනීමට `main.js`, Electron Node
ධාවන පරිසරය සමඟ Next.js standalone මිටිය සෘජුවම දියත් කරයි:

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

විශේෂාංග:

- `waitForServer()` කවුළුව පෙන්වීමට පෙර තත්පර 30ක් දක්වා URL එක විමසයි (cold start එකකදී හිස් තිරයක් නොපෙන්වයි).
- `stdio: "pipe"` stdout/stderr ග්රහණය කරයි; සූදානම් බව දක්වන පද (`Ready` / `listening`) IPC හරහා `server-status: running` නිකුත් කරයි.
- `before-quit`, graceful SIGTERM සඳහා (WAL checkpoint) තත්පර 5ක් දක්වා රැඳී සිට, පසුව SIGKILL යවයි.
- tray එකේ ඇති port මාරුකාරකය (`20128`, `3000`, `8080`) සේවාදායකය නවත්වා නැවත ආරම්භ කර, ඉන්පසු BrowserWindow නැවත පූරණය කරයි.

## ශුන්ය-වින්යාස රහස් ආරම්භනය

පළමු වරට දියත් කරන විට, ප්රධාන ක්රියාවලිය නොමැති රහස් ස්වයංක්රීයව ජනනය කර ස්ථිරව සුරකියි:

| රහස                      | මූලාශ්රය                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                        |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (සංකේතනය කළ අක්තපත්ර දැනටමත් පවතී නම් ප්රතික්ෂේප කරයි) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                        |

`<DATA_DIR>/server.env` වෙත ස්ථිරව සුරකියි. `DATA_DIR` පහත පරිදි නිරාකරණය වේ:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` හෝ `~/.omniroute`
- macOS: `~/.omniroute`

## කවුළුව සහ පද්ධති තැටිය

- `BrowserWindow`: 1400×900 (අවම 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, ට්රැෆික්-ලයිට් පිහිටීම `{ x: 16, y: 16 }`.
- Windows/Linux: ස්වදේශීය මාතෘකා තීරුව.
- වසා දැමීමේ බොත්තම කවුළුව පද්ධති තැටියට අවම කරයි; පද්ධති තැටි මෙනුවේ **OmniRoute විවෘත කරන්න**, **උපකරණ පුවරුව විවෘත කරන්න** (බාහිර බ්රවුසරය), **සේවාදායක තොට** උපමෙනුව, **යාවත්කාලීන සඳහා පරීක්ෂා කරන්න**, **ඉවත් වන්න** යන විකල්ප ඇත.

## අන්තර්ගත ආරක්ෂණ ප්රතිපත්තිය

`session.defaultSession.webRequest.onHeadersReceived` හරහා සකසයි. සැලකිය යුතු විධාන:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- සංවර්ධන ප්රකාරය `'unsafe-eval'` එක් කරන්නේ `script-src` වෙත පමණි

## ස්වයංක්රීය යාවත්කාලීන කිරීම

GitHub සැපයුම්කරු (`diegosouzapw/OmniRoute`) සමඟ `electron-updater` භාවිත කරයි.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- සිදුවීම් `update-status` IPC හරහා විදැහුම්කරණ ක්රියාවලිය වෙත යොමු කරයි:
  `checking`, `available`, `not-available`, `downloading` (`percent` සමඟ), `downloaded`, `error`
- `installUpdate()` සේවාදායකය නවතා ඉන්පසු `autoUpdater.quitAndInstall()` අමතයි
- සංවර්ධන ප්රකාරයේදී මඟ හරියි (`!app.isPackaged`)

## ගොඩනැගීමේ නළමඟ

1. `npm run build` → `.next/standalone` තුළ Next.js ස්වාධීන ගොඩනැගීම.
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone` වෙත නැවත සකසා, බණ්ඩලය වෙනත් ස්ථානයකට ගෙන යා හැකි වන පරිදි `server.js` + `required-server-files.json` තුළ ඇති නිරපේක්ෂ මාර්ග නැවත ලියයි.
3. `electron-builder` මඟින් `main.js`, `preload.js`, `node_modules`, සහ `extraResources: { ../.next/electron-standalone → app }` පැකේජ කරයි.

### ගොඩනැගීමේ ඉලක්ක

| මෙහෙයුම් පද්ධතිය | ඉලක්ක                                          |
| ---------------- | ---------------------------------------------- |
| Windows          | NSIS ස්ථාපකය + අතේ ගෙන යා හැකි අනුවාදය (x64)   |
| macOS            | DMG (Intel + arm64, Applications වෙත ඇද දැමීම) |
| Linux            | AppImage + DEB (x64 + arm64)                   |

NSIS සැකසුම්: `oneClick: false`, පරිශීලකයාට ස්ථාපන නාමාවලිය තෝරා ගැනීමට ඉඩ දෙයි, Desktop සහ Start-Menu කෙටිමං සාදයි.

## පැකේජ කළ ගොඩනැගීමේ දුම් පරීක්ෂාව

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- වත්මන් වේදිකාව සඳහා `electron/dist-electron/` තුළ ඇති පැකේජ කළ ද්විමය ගොනුව ස්වයංක්රීයව සොයා ගනියි.
- සංවර්ධක දත්තවලට බලපෑම් නොවන පරිදි හුදකලා කළ `HOME`/`APPDATA`/`XDG_*` නාමාවලි සමඟ දියත් කරයි.
- තත්පර 45ක් ඇතුළත HTTP 200 සඳහා `http://127.0.0.1:20128/login` නිරන්තරයෙන් විමසයි.
- මාරාන්තික රටා (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, ආදිය) සඳහා stderr/stdout නිරීක්ෂණය කරයි.
- සූදානම් වූ පසු තත්පර 2ක ස්ථාවර ධාවන කාලයක් බලා සිට, අනතුරුව SIGTERM නිකුත් කර තොට නිදහස් වන තෙක් බලා සිටියි.
- CI තුළ, ස්වයංක්රීයව `--no-sandbox --disable-gpu` (සහ Linux මත `--disable-dev-shm-usage`) යොදයි.

පරිසර අතික්රමණයන්: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## කේත අත්සන් කිරීම

`electron/package.json` මඟින් අත්සන් කිරීමේ අක්තපත්ර සෘජුව සම්බන්ධ **නොකරයි**. ඒවා පරිසර විචල්ය හරහා `electron-builder` වෙත ලබා දෙන්න:

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

AppImage අත්සන් කිරීම විකල්පයකි — අත්සන් කරන්නේ නම් `LINUX_GPG_KEY` සකසන්න.

## බෙදාහැරීම

නිර්මිත ගොනු `electron/dist-electron/` තුළ තැන්පත් වේ:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

නිකුතු GitHub Releases (`diegosouzapw/OmniRoute`) වෙත ප්රකාශයට පත් කෙරෙන අතර, `electron-updater` නව අනුවාද සඳහා පරීක්ෂා කරන්නේද එහිදීය.

## දෝෂ නිරාකරණය

| රෝග ලක්ෂණය                                                                      | විසඳුම                                                                                                                                                                                 |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron ප්රධාන අනුවාදය ඉහළ නැංවීමෙන් පසු `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 මඟින් Node-API පෙර-නිර්මිත ගොනු සපයයි — මූල නාමාවලියේදී `npm install` සහ `prepare:bundle` නැවත ධාවනය කරන්න (එය වත්මන් වේදිකාව සඳහා පෙර-නිර්මිත ගොනුව සත්යාපනය කරයි) |
| ස්වදේශීය මොඩියුලය සඳහා `ERR_DLOPEN_FAILED`                                      | `prepare:bundle` නැවත ධාවනය කරන්න — වත්මන් වේදිකාව සඳහා Node-API පෙර-නිර්මිත ගොනුව නොමැති විට එය වහාම අසාර්ථක වේ                                                                       |
| Linux මත කවුළුව හිස්ව දිස් වේ                                                   | Next.js සේවාදායකය සැබවින්ම PORT වෙත බැඳී ඇති බව තහවුරු කරන්න (`[Server]` ලොග් පරීක්ෂා කරන්න)                                                                                           |
| macOS නොටරීකරණය නතර වේ                                                          | `APPLE_*` විචල්ය `.env` තුළ පමණක් නොව export කර ඇති බවට වග බලා ගන්න                                                                                                                    |
| Windows SmartScreen අනතුරු ඇඟවීම                                                | EV සහතිකයක් සමඟ අත්සන් කරන්න, නැතහොත් පරිශීලකයන් දකුණු-ක්ලික් → "කෙසේ හෝ ධාවනය කරන්න" තෝරාගත යුතුය                                                                                     |
| පෝට් එක භාවිතයේ තිබීම නිසා දුම් පරීක්ෂණය අසාර්ථක වේ                             | `electron:smoke:packaged` ධාවනය කිරීමට පෙර 20128 මත ක්රියාත්මක වන ඕනෑම දේශීය සංවර්ධන සේවාදායකයක් නවත්වන්න                                                                              |

## මෙයද බලන්න

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- මූලාශ්ර: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- උපකාරක: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
