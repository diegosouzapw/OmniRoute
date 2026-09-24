# Electron Desktop Guide (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Chanzo rasmi:** nafasi ya kazi ya `electron/`
> **Ilisasishwa mwisho:** 2026-06-28 — v3.8.40

OmniRoute huja na programu ya eneo-kazi inayofanya kazi kwenye majukwaa mbalimbali (Windows / macOS / Linux), iliyoundwa kwa kutumia
**Electron 41** + **electron-builder 26.10**. Programu ya eneo-kazi huanzisha seva huru ya Next.js
kama mchakato-toto, huelekeza `BrowserWindow` kwake, na huongeza
ikoni ya trei ya mfumo, kisasishaji kiotomatiki, daraja la IPC, na uanzishaji wa siri usiohitaji usanidi.

## Usanifu

```
┌──────────────────────────────────────────────┐
│ Mchakato mkuu wa Electron (electron/main.js) │
│ ├─ Kufuli ya nakala moja                     │
│ ├─ Mchakato-toto: seva huru ya Next.js       │
│ │   (huanzishwa kwa runtime ya Node ya Electron) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Trei ya mfumo + menyu ya muktadha          │
│ ├─ Usasishaji kiotomatiki kupitia electron-updater │
│ ├─ Sera ya Usalama wa Maudhui (vichwa vya kipindi) │
│ └─ Uanzishaji wa siri (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────┘
            ↕ Daraja la IPC (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Kionyeshi (dashibodi ya Next.js)             │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## Matoleo

Yamethibitishwa kutoka `electron/package.json`:

| Kifurushi                 | Toleo                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------- |
| `electron`                | `^43.4.1`                                                                                    |
| `electron-builder`        | `^26.15.3`                                                                                   |
| `electron-updater`        | `^6.8.9`                                                                                     |
| `better-sqlite3`          | mzizi `^13.0.2` (miundo iliyotayarishwa awali ya Node-API — hakuna uundaji upya wa Electron) |
| Toleo la programu         | `3.8.0`                                                                                      |
| Kitambulisho cha programu | `online.omniroute.desktop`                                                                   |
| Jina la bidhaa            | `OmniRoute`                                                                                  |

## Hati (mzizi wa `package.json`)

| Hati                              | Madhumuni                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Huanzisha `npm run dev` + husubiri `localhost:20128` + huzindua Electron               |
| `npm run electron:build`          | Huunda Next.js kisha huendesha `electron-builder` kwa OS ya sasa                       |
| `npm run electron:build:win`      | Huunda kisakinishi cha Windows NSIS + toleo linalobebeka (x64)                         |
| `npm run electron:build:mac`      | Huunda DMG ya macOS (Intel + Apple Silicon)                                            |
| `npm run electron:build:linux`    | Huunda Linux AppImage + DEB (x64 + arm64)                                              |
| `npm run electron:smoke:packaged` | Huzindua faili tekelezi iliyofungashwa na hukagua `/login` kwa HTTP 200, kisha huizima |

Nafasi ya kazi ya `electron/` pia hutoa:

- `npm run prepare:bundle` — huendesha `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — miundo ya macOS ya usanifu mmoja
- `npm run pack` — muundo wa saraka pekee kwa majaribio ya ndani (bila kisakinishi)

## Muundo wa Saraka

```
electron/
├── package.json              # Vitegemezi vya Electron + usanidi wa electron-builder
├── main.js                   # Mchakato mkuu (KB 24 — tazama maelezo hapa chini)
├── preload.js                # Daraja la IPC la contextBridge
├── types.d.ts                # Aina za AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Maelezo ya ndani ya workspace
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Matokeo ya electron-builder (yamepuuzwa na git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Huandaa kifurushi cha .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Jaribio la awali baada ya build
```

`main.js` na `preload.js` zote ni **faili za CommonJS `.js`**, si TypeScript. Ufafanuzi
wa aina wa upande wa renderer unapatikana katika `electron/types.d.ts`.

## Daraja la IPC (`preload.js`)

Preload hufichua API iliyoidhinishwa kwenye `window.electronAPI` kwa kutumia `contextBridge`
ikiwa na `contextIsolation: true` na `nodeIntegration: false`.

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

Mbinu zinazofichuliwa:

| Mwito wa renderer                                                 | Aina                         |
| ----------------------------------------------------------------- | ---------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                       |
| `openExternal(url)`                                               | invoke                       |
| `getDataDir()`                                                    | invoke                       |
| `restartServer()`                                                 | invoke                       |
| `getAppVersion()`                                                 | invoke                       |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                       |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                         |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (hurudisha disposer) |

Visaidizi vya receive hurudisha **kitendakazi cha disposer** badala ya kutegemea
`removeAllListeners` — hii huzuia mlundikano wa listeners wakati vipengele vya React
vinapopachikwa upya.

## Mzunguko wa Maisha wa Seva

`main.js` huanzisha kifurushi cha standalone cha Next.js moja kwa moja kwa kutumia mazingira ya Node
ya Electron ili kuepuka kutolingana kwa ABI ya native-module na Node ya mfumo:

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

Mambo muhimu:

- `waitForServer()` hukagua URL mara kwa mara kwa hadi sekunde 30 kabla ya kuonyesha dirisha (hakuna skrini tupu wakati wa uanzishaji wa kwanza).
- `stdio: "pipe"` hunasa stdout/stderr; vifungu vya kuonyesha utayari (`Ready` / `listening`) hutuma `server-status: running` kupitia IPC.
- `before-quit` husubiri hadi sekunde 5 kwa SIGTERM ya kawaida (WAL checkpoint), kisha hutuma SIGKILL.
- Kibadilisha port kwenye tray (`20128`, `3000`, `8080`) husimamisha na kuwasha upya seva, kisha hupakia upya BrowserWindow.

## Uanzishaji wa Siri Bila Usanidi

Katika uzinduzi wa kwanza, mchakato mkuu huzalisha kiotomatiki na kuhifadhi siri zinazokosekana:

| Siri                     | Chanzo                                                                                          |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                        |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (hukataa ikiwa vitambulisho vilivyosimbwa tayari vipo) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                        |

Huhifadhiwa katika `<DATA_DIR>/server.env`. `DATA_DIR` hutatuliwa kuwa:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` au `~/.omniroute`
- macOS: `~/.omniroute`

## Dirisha na Trei

- `BrowserWindow`: 1400×900 (kiwango cha chini 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, vitufe vya kudhibiti dirisha katika `{ x: 16, y: 16 }`.
- Windows/Linux: upau asilia wa kichwa.
- Kitufe cha kufunga hupunguza programu hadi kwenye trei; menyu ya trei ina **Fungua OmniRoute**, **Fungua Dashibodi** (kivinjari cha nje), menyu ndogo ya **Mlango wa Seva**, **Angalia Masasisho**, **Ondoka**.

## Sera ya Usalama wa Maudhui

Huwekwa kupitia `session.defaultSession.webRequest.onHeadersReceived`. Maagizo muhimu:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Hali ya usanidi huongeza `'unsafe-eval'` kwenye `script-src` pekee

## Usasishaji Kiotomatiki

Hutumia `electron-updater` pamoja na mtoa huduma wa GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Matukio hutumwa kwa kionyeshi kupitia IPC ya `update-status`:
  `checking`, `available`, `not-available`, `downloading` (pamoja na `percent`), `downloaded`, `error`
- `installUpdate()` husimamisha seva kisha huita `autoUpdater.quitAndInstall()`
- Hurukwa katika hali ya usanidi (`!app.isPackaged`)

## Mchakato wa Uundaji

1. `npm run build` → Next.js inayojitegemea katika `.next/standalone`.
2. `prepare-electron-standalone.mjs` → hupanga upya katika `.next/electron-standalone` na kuandika upya njia kamili ndani ya `server.js` + `required-server-files.json` ili kifurushi kiweze kuhamishwa.
3. `electron-builder` hufungasha `main.js`, `preload.js`, `node_modules`, na `extraResources: { ../.next/electron-standalone → app }`.

### Malengo ya uundaji

| OS      | Malengo                                       |
| ------- | --------------------------------------------- |
| Windows | Kisakinishaji cha NSIS + kinachobebeka (x64)  |
| macOS   | DMG (Intel + arm64, buruta hadi Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                  |

Mipangilio ya NSIS: `oneClick: false`, humruhusu mtumiaji kuchagua saraka ya usakinishaji, na huunda njia za mkato kwenye Eneo-kazi na menyu ya Start.

## Jaribio la Msingi la Kifurushi Kilichoundwa

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Hugundua kiotomatiki faili tekelezi iliyofungashwa katika `electron/dist-electron/` kwa jukwaa la sasa.
- Huanzisha kwa kutumia saraka zilizotengwa za `HOME`/`APPDATA`/`XDG_*` ili isiguse data ya msanidi programu.
- Hukagua `http://127.0.0.1:20128/login` mara kwa mara ili kupata HTTP 200 ndani ya sekunde 45.
- Hufuatilia stderr/stdout kutafuta mifumo ya hitilafu mbaya (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, n.k.).
- Husubiri sekunde 2 za utekelezaji thabiti baada ya kuwa tayari, kisha hutuma SIGTERM na kusubiri mlango uwe huru.
- Katika CI, hupitisha kiotomatiki `--no-sandbox --disable-gpu` (na `--disable-dev-shm-usage` kwenye Linux).

Mabadiliko ya mazingira yanayobatilisha mipangilio: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Utiaji Saini wa Msimbo

`electron/package.json` **haiunganishi** vitambulisho vya kutia saini moja kwa moja. Vipitishe kupitia vigezo vya mazingira kwenda kwa `electron-builder`:

### macOS

```bash
export APPLE_ID=<barua-pepe>
export APPLE_APP_SPECIFIC_PASSWORD=<nenosiri>
export APPLE_TEAM_ID=<kitambulisho>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<nenosiri-la-cheti>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<nenosiri-la-cheti>
npm run electron:build:win
```

### Linux

Kutia saini AppImage ni kwa hiari — weka `LINUX_GPG_KEY` ikiwa unatia saini.

## Usambazaji

Faili zinazozalishwa huwekwa katika `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Matoleo huchapishwa kwenye GitHub Releases (`diegosouzapw/OmniRoute`), ambako pia `electron-updater` hukagua matoleo mapya.

## Utatuzi wa Matatizo

| Dalili                                                                 | Suluhisho                                                                                                                                                                              |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` baada ya sasisho kuu la Electron | better-sqlite3 v13 huja na miundo iliyoundwa mapema ya Node-API — endesha tena `npm install` kwenye mzizi na `prepare:bundle` (huthibitisha muundo ulioundwa mapema kwa mfumo wa sasa) |
| `ERR_DLOPEN_FAILED` kwa moduli asilia                                  | Endesha tena `prepare:bundle` — husitisha mara moja wakati muundo ulioundwa mapema wa Node-API kwa mfumo wa sasa haupo                                                                 |
| Dirisha linaonekana tupu kwenye Linux                                  | Thibitisha kuwa seva ya Next.js imeunganishwa kwenye PORT (kagua kumbukumbu za `[Server]`)                                                                                             |
| Uthibitishaji wa macOS unakwama                                        | Hakikisha vigezo vya `APPLE_*` vimehamishwa, si kuwekwa tu katika `.env`                                                                                                               |
| Onyo la Windows SmartScreen                                            | Tia saini kwa cheti cha EV, au watumiaji wabofye kulia → "Endesha hata hivyo"                                                                                                          |
| Jaribio la msingi linashindwa kwa sababu kituo kinatumika              | Simamisha seva yoyote ya ndani ya usanidi kwenye 20128 kabla ya kuendesha `electron:smoke:packaged`                                                                                    |

## Tazama Pia

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Chanzo: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Visaidizi: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
