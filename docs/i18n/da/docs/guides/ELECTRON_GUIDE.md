# Electron Desktop Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Sandhedskilde:** `electron/`-arbejdsområdet
> **Senest opdateret:** 2026-06-28 — v3.8.40

OmniRoute leveres med en skrivebordsapp til flere platforme (Windows / macOS / Linux), der er bygget med
**Electron 41** + **electron-builder 26.10**. Skrivebordsappen starter den selvstændige Next.js-server
som en underproces, dirigerer et `BrowserWindow` til den og tilføjer et
systembakkeikon, automatiske opdateringer, en IPC-bro og konfigurationsfri initialisering af hemmeligheder.

## Arkitektur

```
┌────────────────────────────────────────────────────┐
│ Electrons hovedproces (electron/main.js)            │
│ ├─ Lås til én enkelt instans                        │
│ ├─ Underproces: Selvstændig Next.js-server          │
│ │   (startet med Electrons Node-kørselsmiljø)       │
│ ├─ BrowserWindow → http://localhost:PORT            │
│ ├─ Systembakkeikon + genvejsmenu                    │
│ ├─ Automatisk opdatering via electron-updater       │
│ ├─ Content Security Policy (sessionsheadere)        │
│ └─ Initialisering af hemmeligheder (JWT / API_KEY_SECRET) │
└────────────────────────────────────────────────────┘
            ↕ IPC-bro (electron/preload.js)
┌────────────────────────────────────────────────────┐
│ Renderer (Next.js-kontrolpanel)                     │
│   window.electronAPI.* (contextIsolation)           │
└────────────────────────────────────────────────────┘
```

## Versioner

Bekræftet ud fra `electron/package.json`:

| Pakke              | Version                                                                   |
| ------------------ | ------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                 |
| `electron-builder` | `^26.15.3`                                                                |
| `electron-updater` | `^6.8.9`                                                                  |
| `better-sqlite3`   | rod `^13.0.2` (Node-API-prækompileringer — ingen Electron-genkompilering) |
| Appversion         | `3.8.0`                                                                   |
| App-id             | `online.omniroute.desktop`                                                |
| Produktnavn        | `OmniRoute`                                                               |

## Scripts (`package.json` i roden)

| Script                            | Formål                                                                                         |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Starter `npm run dev` + venter på `localhost:20128` + starter Electron                         |
| `npm run electron:build`          | Bygger Next.js og kører derefter `electron-builder` for det aktuelle operativsystem            |
| `npm run electron:build:win`      | Bygger Windows NSIS-installationsprogram + portabel version (x64)                              |
| `npm run electron:build:mac`      | Bygger macOS-DMG (Intel + Apple Silicon)                                                       |
| `npm run electron:build:linux`    | Bygger Linux AppImage + DEB (x64 + arm64)                                                      |
| `npm run electron:smoke:packaged` | Starter den pakkede binære fil og kontrollerer `/login` for HTTP 200, hvorefter den lukkes ned |

`electron/`-arbejdsområdet tilbyder også:

- `npm run prepare:bundle` — kører `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — macOS-builds til en enkelt arkitektur
- `npm run pack` — build kun som mappe til lokal test (intet installationsprogram)

## Mappestruktur

```
electron/
├── package.json              # Electron-afhængigheder + electron-builder-konfiguration
├── main.js                   # Hovedproces (24 KB — se annoteringer nedenfor)
├── preload.js                # contextBridge IPC-bro
├── types.d.ts                # AppInfo-/ServerStatus-/ElectronAPI-typer
├── README.md                 # Noter i arbejdsområdet
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Output fra electron-builder (ignoreres af git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Klargør .next/electron-standalone-pakken
└── dev/
    └── smoke-electron-packaged.mjs       # Smoke-test efter build
```

Både `main.js` og `preload.js` er **CommonJS-`.js`-filer**, ikke TypeScript.
Typedefinitionerne på renderer-siden findes i `electron/types.d.ts`.

## IPC-bro (`preload.js`)

Preload-scriptet eksponerer en hvidlistet API på `window.electronAPI` ved hjælp af `contextBridge`
med `contextIsolation: true` og `nodeIntegration: false`.

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

Eksponerede metoder:

| Kald fra rendereren                                               | Type                                    |
| ----------------------------------------------------------------- | --------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                  |
| `openExternal(url)`                                               | invoke                                  |
| `getDataDir()`                                                    | invoke                                  |
| `restartServer()`                                                 | invoke                                  |
| `getAppVersion()`                                                 | invoke                                  |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                  |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                    |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (returnerer oprydningsfunktion) |

Receive-hjælpefunktionerne returnerer en **oprydningsfunktion** i stedet for at være afhængige af
`removeAllListeners` — dette forhindrer ophobning af listeners, når React-komponenter
genmonteres.

## Serverens livscyklus

`main.js` starter den selvstændige Next.js-pakke direkte med Electrons Node-
runtime for at undgå uoverensstemmelser i native modulers ABI med systemets Node:

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

Højdepunkter:

- `waitForServer()` poller URL'en i op til 30 s, før vinduet vises (ingen tom skærm ved koldstart).
- `stdio: "pipe"` opfanger stdout/stderr; klar-meddelelser (`Ready` / `listening`) udsender `server-status: running` via IPC.
- `before-quit` venter i op til 5 s på en kontrolleret SIGTERM (WAL-checkpoint) og sender derefter SIGKILL.
- Portvælgeren i systembakken (`20128`, `3000`, `8080`) stopper og genstarter serveren og genindlæser derefter BrowserWindow.

## Nulkonfigurations-bootstrap af hemmeligheder

Ved første start genererer og gemmer hovedprocessen automatisk manglende hemmeligheder:

| Hemmelighed              | Kilde                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                         |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (afviser, hvis der allerede findes krypterede legitimationsoplysninger) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                         |

Gemmes i `<DATA_DIR>/server.env`. `DATA_DIR` fortolkes som:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` eller `~/.omniroute`
- macOS: `~/.omniroute`

## Vindue og systembakke

- `BrowserWindow`: 1400×900 (min. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, trafiklysknapper ved `{ x: 16, y: 16 }`.
- Windows/Linux: indbygget titellinje.
- Luk-knappen minimerer til systembakken; systembakkemenuen indeholder **Åbn OmniRoute**, **Åbn kontrolpanel** (ekstern browser), undermenuen **Serverport**, **Søg efter opdateringer**, **Afslut**.

## Politik for indholdssikkerhed

Indstilles via `session.defaultSession.webRequest.onHeadersReceived`. Bemærkelsesværdige direktiver:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Udviklingstilstand føjer kun `'unsafe-eval'` til `script-src`

## Automatisk opdatering

Bruger `electron-updater` med GitHub-udbyderen (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Hændelser videresendes til renderprocessen via `update-status`-IPC:
  `checking`, `available`, `not-available`, `downloading` (med `percent`), `downloaded`, `error`
- `installUpdate()` stopper serveren og kalder derefter `autoUpdater.quitAndInstall()`
- Springes over i udviklingstilstand (`!app.isPackaged`)

## Build-pipeline

1. `npm run build` → selvstændig Next.js-build i `.next/standalone`.
2. `prepare-electron-standalone.mjs` → klargør igen i `.next/electron-standalone` og omskriver absolutte stier i `server.js` + `required-server-files.json`, så pakken kan flyttes.
3. `electron-builder` pakker `main.js`, `preload.js`, `node_modules` og `extraResources: { ../.next/electron-standalone → app }`.

### Build-mål

| OS      | Mål                                        |
| ------- | ------------------------------------------ |
| Windows | NSIS-installationsprogram + portabel (x64) |
| macOS   | DMG (Intel + arm64, træk til Programmer)   |
| Linux   | AppImage + DEB (x64 + arm64)               |

NSIS-indstillinger: `oneClick: false`, lader brugeren vælge installationsmappen og opretter genveje på skrivebordet og i Startmenuen.

## Røgtest af pakket build

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Finder automatisk den pakkede binære fil i `electron/dist-electron/` for den aktuelle platform.
- Starter med isolerede `HOME`/`APPDATA`/`XDG_*`-mapper, så udviklerdata ikke berøres.
- Forespørger gentagne gange `http://127.0.0.1:20128/login` efter HTTP 200 inden for 45 sek.
- Overvåger stderr/stdout for fatale mønstre (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` osv.).
- Venter på 2 sek. stabil kørsel efter klarmelding, sender derefter SIGTERM og venter på, at porten frigives.
- I CI videregives `--no-sandbox --disable-gpu` automatisk (og `--disable-dev-shm-usage` på Linux).

Miljøvariabeltilsidesættelser: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kodesignering

`electron/package.json` konfigurerer **ikke** signeringslegitimationsoplysninger direkte. Overfør dem via miljøvariabler til `electron-builder`:

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

AppImage-signering er valgfri — angiv `LINUX_GPG_KEY`, hvis der skal signeres.

## Distribution

Artefakter placeres i `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Udgivelser publiceres på GitHub Releases (`diegosouzapw/OmniRoute`), hvor `electron-updater` også søger efter nye versioner.

## Fejlfinding

| Symptom                                                                    | Løsning                                                                                                                                                                                     |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` efter en større Electron-opgradering | better-sqlite3 v13 leveres med færdigbyggede Node-API-filer — kør `npm install` igen i roden og derefter `prepare:bundle` (den verificerer den færdigbyggede fil for den aktuelle platform) |
| `ERR_DLOPEN_FAILED` for et oprindeligt modul                               | Kør `prepare:bundle` igen — den stopper straks med en fejl, hvis den færdigbyggede Node-API-fil til den aktuelle platform mangler                                                           |
| Vinduet er tomt på Linux                                                   | Bekræft, at Next.js-serveren faktisk er bundet til PORT (kontrollér `[Server]`-logfilerne)                                                                                                  |
| macOS-notarisering går i stå                                               | Sørg for, at `APPLE_*`-variablerne er eksporteret og ikke kun angivet i `.env`                                                                                                              |
| Windows SmartScreen-advarsel                                               | Signér med et EV-certifikat, eller bed brugerne om at højreklikke → "Kør alligevel"                                                                                                         |
| Smoke-test mislykkes, fordi porten er i brug                               | Stop enhver lokal udviklingsserver på 20128, før du kører `electron:smoke:packaged`                                                                                                         |

## Se også

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Kilde: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Hjælpeværktøjer: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
