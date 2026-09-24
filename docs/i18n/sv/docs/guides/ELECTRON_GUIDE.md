# Electron Desktop Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Sanningskälla:** arbetsytan `electron/`
> **Senast uppdaterad:** 2026-06-28 — v3.8.40

OmniRoute levereras med en plattformsoberoende skrivbordsapp (Windows / macOS / Linux) byggd med
**Electron 41** + **electron-builder 26.10**. Skrivbordsappen startar den fristående Next.js-servern
som en underordnad process, riktar ett `BrowserWindow`-fönster mot den och lägger till ett
systemfält, automatiska uppdateringar, en IPC-brygga och konfigurationsfri initiering av hemligheter.

## Arkitektur

```
┌───────────────────────────────────────────────────────┐
│ Electrons huvudprocess (electron/main.js)             │
│ ├─ Lås för en enda instans                            │
│ ├─ Underordnad process: fristående Next.js-server     │
│ │   (startad med Electrons Node-körmiljö)             │
│ ├─ BrowserWindow → http://localhost:PORT              │
│ ├─ Systemfält + snabbmeny                             │
│ ├─ Automatisk uppdatering via electron-updater        │
│ ├─ Content Security Policy (sessionshuvuden)          │
│ └─ Initiering av hemligheter (JWT / API_KEY_SECRET)   │
└───────────────────────────────────────────────────────┘
            ↕ IPC-brygga (electron/preload.js)
┌───────────────────────────────────────────────────────┐
│ Renderarprocess (Next.js-instrumentpanel)              │
│   window.electronAPI.* (contextIsolation)              │
└───────────────────────────────────────────────────────┘
```

## Versioner

Bekräftat från `electron/package.json`:

| Paket              | Version                                                       |
| ------------------ | ------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                     |
| `electron-builder` | `^26.15.3`                                                    |
| `electron-updater` | `^6.8.9`                                                      |
| `better-sqlite3`   | rot `^13.0.2` (Node-API-förbyggen — ingen Electron-ombyggnad) |
| Appversion         | `3.8.0`                                                       |
| App-ID             | `online.omniroute.desktop`                                    |
| Produktnamn        | `OmniRoute`                                                   |

## Skript (`package.json` i roten)

| Skript                            | Syfte                                                                                        |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Startar `npm run dev` + väntar på `localhost:20128` + startar Electron                       |
| `npm run electron:build`          | Bygger Next.js och kör sedan `electron-builder` för det aktuella operativsystemet            |
| `npm run electron:build:win`      | Bygger Windows NSIS-installationsprogram + portabel version (x64)                            |
| `npm run electron:build:mac`      | Bygger macOS DMG (Intel + Apple Silicon)                                                     |
| `npm run electron:build:linux`    | Bygger Linux AppImage + DEB (x64 + arm64)                                                    |
| `npm run electron:smoke:packaged` | Startar den paketerade binärfilen och kontrollerar `/login` efter HTTP 200, stänger sedan av |

Arbetsytan `electron/` exponerar även:

- `npm run prepare:bundle` — kör `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — macOS-byggen för en enskild arkitektur
- `npm run pack` — bygger endast en katalog för lokal testning (inget installationsprogram)

## Katalogstruktur

```
electron/
├── package.json              # Electron-beroenden + konfiguration för electron-builder
├── main.js                   # Huvudprocess (24 kB — se kommentarerna nedan)
├── preload.js                # contextBridge-brygga för IPC
├── types.d.ts                # Typerna AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Anteckningar i arbetsytan
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Utdata från electron-builder (ignoreras av git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Förbereder paketet .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Röktest efter bygge
```

Både `main.js` och `preload.js` är **CommonJS-filer av typen `.js`**, inte TypeScript.
Typdefinitionerna för renderarsidan finns i `electron/types.d.ts`.

## IPC-brygga (`preload.js`)

Förinläsningen exponerar ett vitlistat API på `window.electronAPI` med hjälp av
`contextBridge` med `contextIsolation: true` och `nodeIntegration: false`.

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

Exponerade metoder:

| Anrop från renderaren                                             | Typ                                             |
| ----------------------------------------------------------------- | ----------------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                          |
| `openExternal(url)`                                               | invoke                                          |
| `getDataDir()`                                                    | invoke                                          |
| `restartServer()`                                                 | invoke                                          |
| `getAppVersion()`                                                 | invoke                                          |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                          |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                            |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (returnerar en avregistreringsfunktion) |

Mottagningshjälparna returnerar en **avregistreringsfunktion** i stället för att förlita sig på
`removeAllListeners` — detta förhindrar att lyssnare ackumuleras när React-komponenter
monteras om.

## Serverns livscykel

`main.js` startar det fristående Next.js-paketet direkt med Electrons Node-
körmiljö för att undvika ABI-inkompatibilitet mellan inbyggda moduler och systemets Node:

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

Höjdpunkter:

- `waitForServer()` avsöker URL:en i upp till 30 s innan fönstret visas (ingen tom skärm vid kallstart).
- `stdio: "pipe"` samlar in stdout/stderr; klarfraser (`Ready` / `listening`) skickar `server-status: running` via IPC.
- `before-quit` väntar i upp till 5 s på en kontrollerad SIGTERM (WAL-kontrollpunkt) och skickar sedan SIGKILL.
- Portväljaren i systemfältet (`20128`, `3000`, `8080`) stoppar och startar om servern och laddar sedan om BrowserWindow.

## Hemlighetsinitiering utan konfiguration

Vid första starten genererar och sparar huvudprocessen automatiskt saknade hemligheter:

| Hemlighet                | Källa                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                              |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (avbryter om krypterade autentiseringsuppgifter redan finns) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                              |

Sparas i `<DATA_DIR>/server.env`. `DATA_DIR` matchar:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` eller `~/.omniroute`
- macOS: `~/.omniroute`

## Fönster och systemfält

- `BrowserWindow`: 1400×900 (minst 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, trafikljusknappar vid `{ x: 16, y: 16 }`.
- Windows/Linux: inbyggt namnlistfält.
- Stängningsknappen minimerar till systemfältet. Systemfältsmenyn innehåller **Öppna OmniRoute**, **Öppna instrumentpanelen** (extern webbläsare), undermenyn **Serverport**, **Sök efter uppdateringar** och **Avsluta**.

## Säkerhetspolicy för innehåll

Konfigureras via `session.defaultSession.webRequest.onHeadersReceived`. Viktiga direktiv:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Utvecklingsläget lägger endast till `'unsafe-eval'` i `script-src`

## Automatisk uppdatering

Använder `electron-updater` med GitHub-leverantören (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Händelser vidarebefordras till renderaren via `update-status`-IPC:
  `checking`, `available`, `not-available`, `downloading` (med `percent`), `downloaded`, `error`
- `installUpdate()` avslutar servern och anropar sedan `autoUpdater.quitAndInstall()`
- Hoppas över i utvecklingsläge (`!app.isPackaged`)

## Byggpipeline

1. `npm run build` → fristående Next.js-version i `.next/standalone`.
2. `prepare-electron-standalone.mjs` → arrangerar om innehållet i `.next/electron-standalone` och skriver om absoluta sökvägar i `server.js` + `required-server-files.json` så att paketet kan flyttas.
3. `electron-builder` paketerar `main.js`, `preload.js`, `node_modules` och `extraResources: { ../.next/electron-standalone → app }`.

### Byggmål

| OS      | Mål                                                |
| ------- | -------------------------------------------------- |
| Windows | NSIS-installationsprogram + portabel version (x64) |
| macOS   | DMG (Intel + arm64, dra till Applications)         |
| Linux   | AppImage + DEB (x64 + arm64)                       |

NSIS-inställningar: `oneClick: false`, låter användaren välja installationskatalog och skapar genvägar på skrivbordet och i Start-menyn.

## Röktestning av paketerad version

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Identifierar automatiskt den paketerade binärfilen i `electron/dist-electron/` för den aktuella plattformen.
- Startar med isolerade `HOME`-/`APPDATA`-/`XDG_*`-kataloger så att utvecklardata inte påverkas.
- Avsöker `http://127.0.0.1:20128/login` efter HTTP 200 inom 45 s.
- Övervakar stderr/stdout efter allvarliga mönster (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` osv.).
- Väntar på 2 s stabil körtid efter att beredskap har uppnåtts, skickar sedan SIGTERM och väntar tills porten frigörs.
- I CI skickas `--no-sandbox --disable-gpu` automatiskt (och `--disable-dev-shm-usage` på Linux).

Miljövariabelåsidosättningar: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kodsignering

`electron/package.json` kopplar **inte** signeringsuppgifter direkt. Skicka dem via miljövariabler till `electron-builder`:

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

AppImage-signering är valfri — ange `LINUX_GPG_KEY` om signering ska användas.

## Distribution

Artefakterna hamnar i `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Utgåvor publiceras i GitHub Releases (`diegosouzapw/OmniRoute`), där även `electron-updater` söker efter nya versioner.

## Felsökning

| Symptom                                                                     | Åtgärd                                                                                                                                                                                                |
| --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` efter en större Electron-uppgradering | better-sqlite3 v13 levereras med förkompilerade Node-API-binärer — kör `npm install` igen i roten och sedan `prepare:bundle` (det verifierar den förkompilerade binären för den aktuella plattformen) |
| `ERR_DLOPEN_FAILED` för en inbyggd modul                                    | Kör `prepare:bundle` igen — det avbryts omedelbart när den förkompilerade Node-API-binären för den aktuella plattformen saknas                                                                        |
| Fönstret visas tomt i Linux                                                 | Bekräfta att Next.js-servern faktiskt är bunden till PORT (kontrollera `[Server]`-loggarna)                                                                                                           |
| macOS-notariseringen stannar                                                | Kontrollera att `APPLE_*`-variablerna har exporterats och inte bara finns i `.env`                                                                                                                    |
| Windows SmartScreen-varning                                                 | Signera med ett EV-certifikat, eller låt användarna högerklicka → "Kör ändå"                                                                                                                          |
| Röktestet misslyckas eftersom porten används                                | Stoppa eventuella lokala utvecklingsservrar på 20128 innan du kör `electron:smoke:packaged`                                                                                                           |

## Se även

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Källkod: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Hjälpskript: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
