# Electron Desktop Guide (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Madogarar gaskiya:** wurin aiki na `electron/`
> **Sabuntawa na ƙarshe:** 2026-06-28 — v3.8.40

OmniRoute na zuwa da manhajar tebur mai aiki a dandamali daban-daban (Windows / macOS / Linux), wadda aka gina bisa
**Electron 41** + **electron-builder 26.10**. Manhajar tebur tana ƙaddamar da sabar
standalone ta Next.js a matsayin ƙaramin tsari, tana nuna `BrowserWindow` zuwa gare ta, sannan tana ƙara
tireren tsarin, mai sabuntawa ta atomatik, gadar IPC, da fara saita sirri ba tare da wani tsari ba.

## Tsarin gine-gine

```
┌──────────────────────────────────────────────┐
│ Babban tsarin Electron (electron/main.js)    │
│ ├─ Kulle misali guda                         │
│ ├─ Ƙaramin tsari: sabar standalone ta Next.js│
│ │   (an ƙaddamar da ita da Node na Electron) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Tireren tsarin + menu na mahalli           │
│ ├─ Sabuntawa ta atomatik ta electron-updater │
│ ├─ Manufar Tsaron Abun Ciki (kanun zaman)    │
│ └─ Fara saita sirri (JWT / API_KEY_SECRET)   │
└──────────────────────────────────────────────┘
            ↕ Gadar IPC (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Mai nunawa (dashboard na Next.js)            │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## Nau'uka

An tabbatar daga `electron/package.json`:

| Kunshin            | Nau'i                                                            |
| ------------------ | ---------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                        |
| `electron-builder` | `^26.15.3`                                                       |
| `electron-updater` | `^6.8.9`                                                         |
| `better-sqlite3`   | tushen `^13.0.2` (Node-API prebuilds — babu sake ginin Electron) |
| Nau'in manhaja     | `3.8.0`                                                          |
| ID na manhaja      | `online.omniroute.desktop`                                       |
| Sunan samfur       | `OmniRoute`                                                      |

## Skrif (`package.json` na tushe)

| Skrif                             | Manufa                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Yana fara `npm run dev` + yana jiran `localhost:20128` + yana ƙaddamar da Electron             |
| `npm run electron:build`          | Yana gina Next.js sannan ya gudanar da `electron-builder` don OS na yanzu                      |
| `npm run electron:build:win`      | Yana gina mai girka NSIS na Windows + nau'in ɗaukuwa (x64)                                     |
| `npm run electron:build:mac`      | Yana gina DMG na macOS (Intel + Apple Silicon)                                                 |
| `npm run electron:build:linux`    | Yana gina Linux AppImage + DEB (x64 + arm64)                                                   |
| `npm run electron:smoke:packaged` | Yana ƙaddamar da binary ɗin da aka shirya, ya gwada `/login` don HTTP 200, sannan ya kashe shi |

Wurin aiki na `electron/` kuma yana samar da:

- `npm run prepare:bundle` — yana gudanar da `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — ginin macOS na tsarin gine-gine guda
- `npm run pack` — ginin kundin adireshi kawai don gwajin cikin gida (babu mai girkawa)

## Tsarin Kundin Adireshi

```
electron/
├── package.json              # Dogarorin Electron + saitin electron-builder
├── main.js                   # Babban tsari (24 KB — duba bayanan da ke ƙasa)
├── preload.js                # Gadar IPC ta contextBridge
├── types.d.ts                # Nau'ikan AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Bayanan cikin wurin aiki
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Fitowar electron-builder (git ya yi watsi da shi)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Yana shirya kunshin .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Gwajin smoke bayan ginawa
```

Duka `main.js` da `preload.js` **fayilolin CommonJS `.js` ne**, ba TypeScript ba. Bayanin nau'ikan
ɓangaren renderer yana cikin `electron/types.d.ts`.

## Gadar IPC (`preload.js`)

Preload ɗin yana samar da API mai iyakance izini a `window.electronAPI` ta amfani da `contextBridge`
tare da `contextIsolation: true` da `nodeIntegration: false`.

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

Hanyoyin da aka samar:

| Kiran renderer                                                    | Nau'i                            |
| ----------------------------------------------------------------- | -------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | kira                             |
| `openExternal(url)`                                               | kira                             |
| `getDataDir()`                                                    | kira                             |
| `restartServer()`                                                 | kira                             |
| `getAppVersion()`                                                 | kira                             |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | kira                             |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | aika                             |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | karɓa (yana mayar da mai cirewa) |

Masu taimakon karɓa suna mayar da **aikin cirewa** maimakon dogaro da
`removeAllListeners` — wannan yana hana taruwar masu sauraro idan aka sake ɗora
abubuwan React.

## Zagayowar Rayuwar Sabar

`main.js` yana ƙaddamar da kunshin standalone na Next.js kai tsaye da runtime na Electron Node
don kauce wa rashin daidaiton ABI na native-module da Node na tsarin:

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

Muhimman bayanai:

- `waitForServer()` yana duba URL har zuwa sakan 30 kafin nuna taga (babu farin allo yayin farawa daga farko).
- `stdio: "pipe"` yana kama stdout/stderr; jimlolin shiri (`Ready` / `listening`) suna aika `server-status: running` ta IPC.
- `before-quit` yana jira har zuwa sakan 5 domin SIGTERM na rufewa cikin tsari (WAL checkpoint), sannan ya aika SIGKILL.
- Mai sauya port da ke cikin tray (`20128`, `3000`, `8080`) yana tsayarwa kuma ya sake kunna sabar, sannan ya sake loda BrowserWindow.

## Fara Sirri Ba Tare da Saiti ba

A lokacin ƙaddamarwa ta farko, babban tsari yana samarwa ta atomatik tare da adana sirrin da ba su nan:

| Sirri                    | Tushe                                                                                                     |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                  |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (yana ƙin ci gaba idan akwai bayanan shiga da aka riga aka ɓoye) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                  |

Ana adanawa a `<DATA_DIR>/server.env`. Ana tantance `DATA_DIR` zuwa:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ko `~/.omniroute`
- macOS: `~/.omniroute`

## Taga da Tray

- `BrowserWindow`: 1400×900 (mafi ƙaranci 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, maɓallan taga a `{ x: 16, y: 16 }`.
- Windows/Linux: sandar take ta asali.
- Maɓallin rufewa yana rage taga zuwa tray; menu na tray yana da **Buɗe OmniRoute**, **Buɗe Dashboard** (burauzar waje), ƙaramin menu na **Tashar Sabar**, **Duba Sabuntawa**, **Fita**.

## Manufofin Tsaron Abun Ciki

Ana saitawa ta hanyar `session.defaultSession.webRequest.onHeadersReceived`. Muhimman umarni:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Yanayin haɓakawa yana ƙara `'unsafe-eval'` ga `script-src` kawai

## Sabuntawa ta Atomatik

Yana amfani da `electron-updater` tare da mai samar da GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Ana tura abubuwan da suka faru zuwa renderer ta hanyar IPC na `update-status`:
  `checking`, `available`, `not-available`, `downloading` (tare da `percent`), `downloaded`, `error`
- `installUpdate()` yana kashe sabar sannan ya kira `autoUpdater.quitAndInstall()`
- Ana tsallake shi a yanayin haɓakawa (`!app.isPackaged`)

## Tsarin Gina Manhaja

1. `npm run build` → Next.js mai zaman kansa a `.next/standalone`.
2. `prepare-electron-standalone.mjs` → yana sake tsara fayiloli zuwa `.next/electron-standalone` kuma yana sake rubuta cikakkun hanyoyi a cikin `server.js` + `required-server-files.json` domin a iya matsar da kunshin.
3. `electron-builder` yana ƙulla `main.js`, `preload.js`, `node_modules`, da `extraResources: { ../.next/electron-standalone → app }`.

### Wuraren da ake nufin ginawa

| OS      | Abubuwan da ake ginawa                    |
| ------- | ----------------------------------------- |
| Windows | Mai girka NSIS + mai ɗaukuwa (x64)        |
| macOS   | DMG (Intel + arm64, ja-zuwa-Applications) |
| Linux   | AppImage + DEB (x64 + arm64)              |

Saitunan NSIS: `oneClick: false`, yana barin mai amfani ya zaɓi kundin girkawa, kuma yana ƙirƙirar gajerun hanyoyi a Desktop da Start-Menu.

## Gwajin Hayaki na Gina Manhajar da Aka Ƙulla

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Yana gano fayil ɗin binary da aka ƙulla a cikin `electron/dist-electron/` ta atomatik don dandali na yanzu.
- Yana ƙaddamarwa da keɓantattun kundin `HOME`/`APPDATA`/`XDG_*` domin kada ya taɓa bayanan masu haɓakawa.
- Yana yawan duba `http://127.0.0.1:20128/login` don HTTP 200 a cikin s 45.
- Yana sa ido kan stderr/stdout don gano alamomin babbar matsala (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, da sauransu).
- Yana jira s 2 na aiki mai ɗorewa bayan shiryawa, sannan ya aika SIGTERM kuma ya jira tashar ta kuɓuta.
- A cikin CI, yana tura `--no-sandbox --disable-gpu` ta atomatik (da kuma `--disable-dev-shm-usage` a Linux).

Sauye-sauyen Env: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Sa hannu kan Lamba

`electron/package.json` **ba ya** haɗa bayanan shaidar sa hannu kai tsaye. Miƙa su ta env vars zuwa `electron-builder`:

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

Sa hannu kan AppImage zaɓi ne — saita `LINUX_GPG_KEY` idan za a yi sa hannu.

## Rarrabawa

Abubuwan da aka samar suna zuwa cikin `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Ana wallafa fitarwa zuwa GitHub Releases (`diegosouzapw/OmniRoute`), wanda kuma shi ne inda `electron-updater` yake bincika sabbin nau'ikan.

## Magance Matsaloli

| Alama                                                               | Gyara                                                                                                                                                                              |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` bayan babban sabunta Electron | better-sqlite3 v13 yana zuwa da Node-API prebuilds — sake gudanar da `npm install` a tushen sannan `prepare:bundle` (yana tabbatar da prebuild na dandamalin da ake amfani da shi) |
| `ERR_DLOPEN_FAILED` ga native module                                | Sake gudanar da `prepare:bundle` — yana dakatarwa nan take idan Node-API prebuild na dandamalin da ake amfani da shi ya ɓace                                                       |
| Tagar tana bayyana babu komai a Linux                               | Tabbatar cewa uwar garken Next.js ya haɗu da PORT da gaske (duba logs na `[Server]`)                                                                                               |
| Tantancewar macOS tana tsaya cak                                    | Tabbatar an yi export na vars na `APPLE_*`, ba wai suna cikin `.env` kawai ba                                                                                                      |
| Gargadin Windows SmartScreen                                        | Yi sa hannu da EV cert, ko masu amfani su danna-dama → "Run anyway"                                                                                                                |
| Smoke test ya gaza saboda ana amfani da port                        | Dakatar da duk wani local dev server da ke kan 20128 kafin gudanar da `electron:smoke:packaged`                                                                                    |

## Duba Kuma

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Tushen lamba: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Kayan taimako: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
