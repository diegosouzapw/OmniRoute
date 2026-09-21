# Electron Desktop Guide (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Pinagmulan ng katotohanan:** `electron/` workspace
> **Huling na-update:** 2026-06-28 — v3.8.40

May kasamang cross-platform na desktop app ang OmniRoute (Windows / macOS / Linux) na binuo gamit ang
**Electron 41** + **electron-builder 26.10**. Inilulunsad ng desktop app ang standalone server ng Next.js
bilang child process, itinuturo rito ang isang `BrowserWindow`, at nagdaragdag ito ng
system tray, auto-updater, IPC bridge, at zero-config na pag-bootstrap ng secret.

## Arkitektura

```
┌──────────────────────────────────────────────┐
│ Pangunahing proseso ng Electron (electron/main.js) │
│ ├─ Lock para sa iisang instance              │
│ ├─ Child process: standalone server ng Next.js │
│ │   (inilunsad gamit ang Node runtime ng Electron) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ System tray + context menu                │
│ ├─ Auto-update sa pamamagitan ng electron-updater │
│ ├─ Content Security Policy (mga session header) │
│ └─ Pag-bootstrap ng secret (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────┘
            ↕ IPC bridge (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderer (dashboard ng Next.js)              │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## Mga Bersyon

Nakumpirma mula sa `electron/package.json`:

| Package              | Bersyon                                                                       |
| -------------------- | ----------------------------------------------------------------------------- |
| `electron`           | `^43.4.1`                                                                     |
| `electron-builder`   | `^26.15.3`                                                                    |
| `electron-updater`   | `^6.8.9`                                                                      |
| `better-sqlite3`     | root `^13.0.2` (mga Node-API prebuild — hindi kailangan ang Electron rebuild) |
| Bersyon ng app       | `3.8.0`                                                                       |
| App id               | `online.omniroute.desktop`                                                    |
| Pangalan ng produkto | `OmniRoute`                                                                   |

## Mga Script (root `package.json`)

| Script                            | Layunin                                                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Sinisimulan ang `npm run dev` + naghihintay sa `localhost:20128` + inilulunsad ang Electron                   |
| `npm run electron:build`          | Binu-build ang Next.js at pagkatapos ay pinapatakbo ang `electron-builder` para sa kasalukuyang OS            |
| `npm run electron:build:win`      | Binu-build ang Windows NSIS installer + portable (x64)                                                        |
| `npm run electron:build:mac`      | Binu-build ang macOS DMG (Intel + Apple Silicon)                                                              |
| `npm run electron:build:linux`    | Binu-build ang Linux AppImage + DEB (x64 + arm64)                                                             |
| `npm run electron:smoke:packaged` | Inilulunsad ang naka-package na binary at sinusuri ang `/login` para sa HTTP 200, pagkatapos ay isinasara ito |

Inilalantad din ng `electron/` workspace ang:

- `npm run prepare:bundle` — pinapatakbo ang `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — mga single-arch na build para sa macOS
- `npm run pack` — build na directory lamang para sa lokal na pagsubok (walang installer)

## Layout ng Direktoryo

```
electron/
├── package.json              # Mga dependency ng Electron + config ng electron-builder
├── main.js                   # Pangunahing proseso (24 KB — tingnan ang mga anotasyon sa ibaba)
├── preload.js                # Tulay ng IPC na contextBridge
├── types.d.ts                # Mga uri ng AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Mga tala sa loob ng workspace
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Output ng electron-builder (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Inihahanda ang bundle na .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Smoke test pagkatapos ng build
```

Ang `main.js` at `preload.js` ay parehong mga **CommonJS `.js` file**, hindi TypeScript. Ang
mga typing sa panig ng renderer ay nasa `electron/types.d.ts`.

## Tulay ng IPC (`preload.js`)

Naglalantad ang preload ng naka-whitelist na API sa `window.electronAPI` gamit ang `contextBridge`
na may `contextIsolation: true` at `nodeIntegration: false`.

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

Mga inilantad na method:

| Tawag ng renderer                                                 | Uri                              |
| ----------------------------------------------------------------- | -------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                           |
| `openExternal(url)`                                               | invoke                           |
| `getDataDir()`                                                    | invoke                           |
| `restartServer()`                                                 | invoke                           |
| `getAppVersion()`                                                 | invoke                           |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                           |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                             |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (nagbabalik ng disposer) |

Nagbabalik ang mga receive helper ng **disposer function** sa halip na umasa sa
`removeAllListeners` — pinipigilan nito ang pagdami ng mga listener kapag muling
nag-mount ang mga React component.

## Lifecycle ng Server

Direktang inilulunsad ng `main.js` ang standalone bundle ng Next.js gamit ang Node
runtime ng Electron upang maiwasan ang hindi pagtutugma ng ABI ng native module sa system Node:

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

Mga tampok:

- Paulit-ulit na sinusuri ng `waitForServer()` ang URL nang hanggang 30 s bago ipakita ang window (walang blangkong screen sa cold start).
- Kinukuha ng `stdio: "pipe"` ang stdout/stderr; ang mga pariralang nagsasaad na handa na (`Ready` / `listening`) ay nagpapadala ng `server-status: running` sa pamamagitan ng IPC.
- Naghihintay ang `before-quit` nang hanggang 5 s para sa maayos na SIGTERM (WAL checkpoint), pagkatapos ay nagpapadala ng SIGKILL.
- Pinatitigil at muling sinisimulan ng tagapagpalit ng port sa tray (`20128`, `3000`, `8080`) ang server, pagkatapos ay nire-reload ang BrowserWindow.

## Zero-config na Pag-bootstrap ng mga Secret

Sa unang paglunsad, awtomatikong bumubuo at permanenteng nagse-save ang pangunahing proseso ng mga nawawalang secret:

| Secret                   | Pinagmulan                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                             |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (tatanggi kung mayroon nang naka-encrypt na mga kredensyal) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                             |

Sine-save sa `<DATA_DIR>/server.env`. Ang `DATA_DIR` ay tumutukoy sa:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` o `~/.omniroute`
- macOS: `~/.omniroute`

## Window at Tray

- `BrowserWindow`: 1400×900 (minimum na 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, traffic light sa `{ x: 16, y: 16 }`.
- Windows/Linux: native na title bar.
- Ang close button ay nagmi-minimize sa tray; may **Buksan ang OmniRoute**, **Buksan ang Dashboard** (panlabas na browser), submenu na **Server Port**, **Tingnan kung May mga Update**, at **Lumabas** ang tray menu.

## Patakaran sa Seguridad ng Nilalaman

Itinatakda sa pamamagitan ng `session.defaultSession.webRequest.onHeadersReceived`. Mga mahalagang directive:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Sa dev mode lamang idinaragdag ang `'unsafe-eval'` sa `script-src`

## Awtomatikong Pag-update

Gumagamit ng `electron-updater` kasama ang GitHub provider (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Ipinapasa ang mga event sa renderer sa pamamagitan ng `update-status` IPC:
  `checking`, `available`, `not-available`, `downloading` (may `percent`), `downloaded`, `error`
- Pinapatigil ng `installUpdate()` ang server at pagkatapos ay tinatawag ang `autoUpdater.quitAndInstall()`
- Nilalaktawan sa dev mode (`!app.isPackaged`)

## Pipeline ng Build

1. `npm run build` → Next.js standalone sa `.next/standalone`.
2. `prepare-electron-standalone.mjs` → muling inaayos sa `.next/electron-standalone` at muling isinusulat ang mga absolute path sa loob ng `server.js` + `required-server-files.json` upang mailipat-lipat ang bundle.
3. Pina-package ng `electron-builder` ang `main.js`, `preload.js`, `node_modules`, at `extraResources: { ../.next/electron-standalone → app }`.

### Mga target ng build

| OS      | Mga target                                          |
| ------- | --------------------------------------------------- |
| Windows | NSIS installer + portable (x64)                     |
| macOS   | DMG (Intel + arm64, i-drag papunta sa Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                        |

Mga setting ng NSIS: `oneClick: false`, pinapayagan ang user na piliin ang directory ng pag-install, at gumagawa ng mga shortcut sa Desktop at Start Menu.

## Smoke Testing ng Na-package na Build

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Awtomatikong hinahanap ang na-package na binary sa `electron/dist-electron/` para sa kasalukuyang platform.
- Inilulunsad gamit ang mga nakahiwalay na directory na `HOME`/`APPDATA`/`XDG_*` upang hindi nito magalaw ang data ng developer.
- Paulit-ulit na sinusuri ang `http://127.0.0.1:20128/login` para sa HTTP 200 sa loob ng 45 s.
- Binabantayan ang stderr/stdout para sa mga fatal pattern (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, atbp.).
- Naghihintay ng 2 s na matatag na runtime pagkatapos maging handa, saka nagpapadala ng SIGTERM at naghihintay na lumaya ang port.
- Sa CI, awtomatikong ipinapasa ang `--no-sandbox --disable-gpu` (at `--disable-dev-shm-usage` sa Linux).

Mga override ng environment: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Paglagda ng Code

Hindi direktang kinokonekta ng `electron/package.json` ang mga kredensyal sa paglagda. Ipasa ang mga ito sa `electron-builder` sa pamamagitan ng mga env var:

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

Opsyonal ang paglagda sa AppImage — itakda ang `LINUX_GPG_KEY` kung lalagdaan ito.

## Pamamahagi

Mapupunta ang mga artifact sa `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Inilalathala ang mga release sa GitHub Releases (`diegosouzapw/OmniRoute`), na siyang lugar din kung saan tumitingin ang `electron-updater` para sa mga bagong bersyon.

## Pag-troubleshoot

| Sintomas                                                                                | Solusyon                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` pagkatapos ng pangunahing pag-upgrade ng Electron | Naglalaman ang better-sqlite3 v13 ng mga Node-API prebuild — patakbuhing muli ang `npm install` sa root at ang `prepare:bundle` (bineberipika nito ang prebuild para sa kasalukuyang platform) |
| `ERR_DLOPEN_FAILED` para sa native module                                               | Patakbuhing muli ang `prepare:bundle` — agad itong nabibigo kapag nawawala ang Node-API prebuild para sa kasalukuyang platform                                                                 |
| Blangko ang lumalabas na window sa Linux                                                | Kumpirmahing aktuwal na naka-bind ang Next.js server sa PORT (suriin ang mga log ng `[Server]`)                                                                                                |
| Natitigil ang notarization ng macOS                                                     | Tiyaking naka-export ang mga `APPLE_*` var, at hindi lamang nasa `.env`                                                                                                                        |
| Babala ng Windows SmartScreen                                                           | Lumagda gamit ang EV cert, o mag-right-click ang mga user → "Patakbuhin pa rin"                                                                                                                |
| Nabibigo ang smoke test dahil ginagamit ang port                                        | Ihinto ang anumang lokal na dev server sa 20128 bago patakbuhin ang `electron:smoke:packaged`                                                                                                  |

## Tingnan Din

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Pinagmulan: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Mga helper: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
