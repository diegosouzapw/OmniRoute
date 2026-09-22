# Electron Desktop Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Sors awtorevoli:** spazju tax-xogħol `electron/`
> **Aġġornat l-aħħar:** 2026-06-28 — v3.8.40

OmniRoute jipprovdi app tad-desktop multiplattaforma (Windows / macOS / Linux) mibnija fuq
**Electron 41** + **electron-builder 26.10**. L-app tad-desktop tniedi s-server awtonomu ta’ Next.js
bħala proċess sekondarju, torbot `BrowserWindow` miegħu, u żżid trej tas-sistema,
aġġornatur awtomatiku, pont IPC, u inizjalizzazzjoni mingħajr konfigurazzjoni tas-sigrieti.

## Arkitettura

```
┌────────────────────────────────────────────────────┐
│ Proċess ewlieni ta’ Electron (electron/main.js)    │
│ ├─ Serratura għal istanza waħda                    │
│ ├─ Proċess sekondarju: server awtonomu ta’ Next.js │
│ │   (imniedi bir-runtime Node ta’ Electron)        │
│ ├─ BrowserWindow → http://localhost:PORT           │
│ ├─ Trej tas-sistema + menu kuntestwali             │
│ ├─ Aġġornament awtomatiku permezz ta’ electron-updater │
│ ├─ Politika tas-Sigurtà tal-Kontenut (headers tas-sessjoni) │
│ └─ Inizjalizzazzjoni tas-sigrieti (JWT / API_KEY_SECRET) │
└────────────────────────────────────────────────────┘
            ↕ Pont IPC (electron/preload.js)
┌────────────────────────────────────────────────────┐
│ Renderizzatur (dashboard ta’ Next.js)              │
│   window.electronAPI.* (contextIsolation)          │
└────────────────────────────────────────────────────┘
```

## Verżjonijiet

Ikkonfermati minn `electron/package.json`:

| Pakkett            | Verżjoni                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                                   |
| `electron-builder` | `^26.15.3`                                                                                  |
| `electron-updater` | `^6.8.9`                                                                                    |
| `better-sqlite3`   | għerq `^13.0.2` (builds lesti minn qabel ta’ Node-API — ebda rikompilazzjoni għal Electron) |
| Verżjoni tal-app   | `3.8.0`                                                                                     |
| ID tal-app         | `online.omniroute.desktop`                                                                  |
| Isem tal-prodott   | `OmniRoute`                                                                                 |

## Skripts (`package.json` tal-għerq)

| Skript                            | Għan                                                                               |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Jibda `npm run dev` + jistenna lil `localhost:20128` + iniedi Electron             |
| `npm run electron:build`          | Jibni Next.js u mbagħad iħaddem `electron-builder` għas-sistema operattiva attwali |
| `npm run electron:build:win`      | Jibni installatur NSIS ta’ Windows + verżjoni portabbli (x64)                      |
| `npm run electron:build:mac`      | Jibni DMG ta’ macOS (Intel + Apple Silicon)                                        |
| `npm run electron:build:linux`    | Jibni AppImage + DEB għal Linux (x64 + arm64)                                      |
| `npm run electron:smoke:packaged` | Iniedi l-binarju ppakkjat u jittestja `/login` għal HTTP 200, imbagħad jagħlqu     |

L-ispazju tax-xogħol `electron/` jesponi wkoll:

- `npm run prepare:bundle` — iħaddem `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — builds ta’ macOS għal arkitettura waħda
- `npm run pack` — build tad-direttorju biss għall-ittestjar lokali (mingħajr installatur)

## Tqassim tad-Direttorji

```
electron/
├── package.json              # Dipendenzi ta’ Electron + konfigurazzjoni ta’ electron-builder
├── main.js                   # Proċess ewlieni (24 KB — ara l-annotazzjonijiet hawn taħt)
├── preload.js                # Pont IPC ta’ contextBridge
├── types.d.ts                # Tipi AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Noti fl-ispazju tax-xogħol
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Output ta’ electron-builder (injorat minn git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Jipprepara l-bundle .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Test rapidu wara l-build
```

Kemm `main.js` kif ukoll `preload.js` huma **fajls CommonJS `.js`**, mhux TypeScript. It-tipi
tan-naħa tar-renderer jinsabu f’`electron/types.d.ts`.

## Pont IPC (`preload.js`)

Il-preload jesponi API minn lista permessa fuq `window.electronAPI` billi juża `contextBridge`
b’`contextIsolation: true` u `nodeIntegration: false`.

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

Metodi esposti:

| Sejħa mir-renderer                                                | Tip                           |
| ----------------------------------------------------------------- | ----------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                        |
| `openExternal(url)`                                               | invoke                        |
| `getDataDir()`                                                    | invoke                        |
| `restartServer()`                                                 | invoke                        |
| `getAppVersion()`                                                 | invoke                        |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                        |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                          |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (jirritorna disposer) |

Il-funzjonijiet awżiljarji ta’ receive jirritornaw **funzjoni disposer** minflok ma jiddependu fuq
`removeAllListeners` — dan jipprevjeni l-akkumulazzjoni ta’ listeners meta l-komponenti React
jerġgħu jiġu mmuntati.

## Ċiklu tal-Ħajja tas-Server

`main.js` iniedi l-bundle standalone ta’ Next.js direttament bir-runtime Node ta’
Electron biex jevita nuqqas ta’ qbil fl-ABI tal-moduli nattivi ma’ Node tas-sistema:

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

Punti ewlenin:

- `waitForServer()` jiċċekkja l-URL ripetutament sa 30 s qabel ma juri t-tieqa (l-ebda skrin vojt waqt startjar kiesaħ).
- `stdio: "pipe"` jaqbad stdout/stderr; frażijiet ta’ lest (`Ready` / `listening`) jibagħtu `server-status: running` permezz tal-IPC.
- `before-quit` jistenna sa 5 s għal SIGTERM ikkontrollat (checkpoint tal-WAL), imbagħad jibgħat SIGKILL.
- Is-selettur tal-port fit-tray (`20128`, `3000`, `8080`) iwaqqaf u jerġa’ jħaddem is-server, imbagħad jerġa’ jgħabbi l-BrowserWindow.

## Bootstrap tas-Sigrieti mingħajr Konfigurazzjoni

Fl-ewwel tħaddim, il-proċess ewlieni jiġġenera awtomatikament u jippersisti s-sigrieti neqsin:

| Sigriet                  | Sors                                                                                         |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                     |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (jirrifjuta jekk diġà jeżistu kredenzjali kriptati) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                     |

Jiġu ppersistiti f’`<DATA_DIR>/server.env`. `DATA_DIR` jiġi riżolt għal:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` jew `~/.omniroute`
- macOS: `~/.omniroute`

## Tieqa u Trej

- `BrowserWindow`: 1400×900 (minimu 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, il-buttuni tat-tieqa f’`{ x: 16, y: 16 }`.
- Windows/Linux: bar tat-titlu nattiva.
- Il-buttuna tal-għeluq timminimizza għat-trej; il-menu tat-trej għandu **Iftaħ OmniRoute**, **Iftaħ id-Dashboard** (brawżer estern), submenu **Port tas-Server**, **Iċċekkja għal Aġġornamenti**, **Oħroġ**.

## Politika tas-Sigurtà tal-Kontenut

Issettjata permezz ta’`session.defaultSession.webRequest.onHeadersReceived`. Direttivi notevoli:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Il-modalità tal-iżvilupp iżżid `'unsafe-eval'` ma’`script-src` biss

## Aġġornament Awtomatiku

Juża `electron-updater` mal-fornitur ta’ GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- L-avvenimenti jintbagħtu lir-renderer permezz tal-IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (b’`percent`), `downloaded`, `error`
- `installUpdate()` iwaqqaf is-server u mbagħad isejjaħ `autoUpdater.quitAndInstall()`
- Jinqabeż fil-modalità tal-iżvilupp (`!app.isPackaged`)

## Pipeline tal-Build

1. `npm run build` → Next.js standalone f’`.next/standalone`.
2. `prepare-electron-standalone.mjs` → jerġa’ jipprepara l-fajls f’`.next/electron-standalone` u jikteb mill-ġdid il-paths assoluti ġewwa `server.js` + `required-server-files.json` sabiex il-bundle ikun jista’ jiġi rilokat.
3. `electron-builder` jippakkja `main.js`, `preload.js`, `node_modules`, u `extraResources: { ../.next/electron-standalone → app }`.

### Miri tal-build

| OS      | Miri                                          |
| ------- | --------------------------------------------- |
| Windows | Installatur NSIS + portabbli (x64)            |
| macOS   | DMG (Intel + arm64, kaxkar lejn Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                  |

Settings ta’ NSIS: `oneClick: false`, jippermetti lill-utent jagħżel id-direttorju tal-installazzjoni, u joħloq shortcuts fuq id-Desktop u fil-menu Start.

## Ittestjar Smoke tal-Build Ippakkjat

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Isib awtomatikament il-binary ippakkjat f’`electron/dist-electron/` għall-pjattaforma attwali.
- Iħaddmu b’direttorji iżolati ta’`HOME`/`APPDATA`/`XDG_*` sabiex ma jmissx id-data tal-iżviluppatur.
- Jivverifika ripetutament `http://127.0.0.1:20128/login` għal HTTP 200 fi żmien 45 s.
- Jimmonitorja stderr/stdout għal mudelli fatali (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, eċċ.).
- Jistenna 2 s ta’ runtime stabbli wara li jkun lest, imbagħad jibgħat SIGTERM u jistenna sakemm il-port jinħeles.
- Fis-CI, jgħaddi awtomatikament `--no-sandbox --disable-gpu` (u `--disable-dev-shm-usage` fuq Linux).

Overrides tal-ambjent: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Iffirmar tal-Kodiċi

`electron/package.json` **ma** jikkonfigurax direttament il-kredenzjali tal-iffirmar. Għaddihom permezz tal-varjabbli tal-ambjent lil `electron-builder`:

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

L-iffirmar tal-AppImage huwa fakultattiv — issettja `LINUX_GPG_KEY` jekk trid tiffirma.

## Distribuzzjoni

L-artefatti jinħolqu f’`electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Ir-rilaxxi jiġu ppubblikati fuq GitHub Releases (`diegosouzapw/OmniRoute`), li huwa wkoll fejn `electron-updater` jiċċekkja għal verżjonijiet ġodda.

## Soluzzjoni tal-Problemi

| Sintomu                                                                     | Soluzzjoni                                                                                                                                                          |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` wara aġġornament maġġuri ta’ Electron | better-sqlite3 v13 jipprovdi prebuilds ta’ Node-API — erġa’ ħaddem `npm install` fl-għerq u `prepare:bundle` (dan jivverifika l-prebuild għall-pjattaforma attwali) |
| `ERR_DLOPEN_FAILED` għal modulu nattiv                                      | Erġa’ ħaddem `prepare:bundle` — dan jieqaf minnufih bi żball meta l-prebuild ta’ Node-API għall-pjattaforma attwali jkun nieqes                                     |
| It-tieqa tidher vojta fuq Linux                                             | Ikkonferma li s-server ta’ Next.js effettivament intrabat ma’ PORT (iċċekkja l-logs ta’ `[Server]`)                                                                 |
| In-notarizzazzjoni ta’ macOS teħel                                          | Żgura li l-varjabbli `APPLE_*` jiġu esportati, u mhux sempliċement imqiegħda f’`.env`                                                                               |
| Twissija ta’ Windows SmartScreen                                            | Iffirma b’ċertifikat EV, jew l-utenti jistgħu jikklikkjaw bil-lemin → "Ħaddem xorta waħda"                                                                          |
| It-test bażiku jfalli minħabba li l-port ikun qed jintuża                   | Waqqaf kwalunkwe server tal-iżvilupp lokali fuq 20128 qabel tħaddem `electron:smoke:packaged`                                                                       |

## Ara Wkoll

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Sors: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Għodod awżiljarji: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
