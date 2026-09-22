# Electron Desktop Guide (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Autoritativ kilde:** `electron/`-arbeidsområdet
> **Sist oppdatert:** 2026-06-28 — v3.8.40

OmniRoute leveres med en skrivebordsapp for flere plattformer (Windows / macOS / Linux), bygget med
**Electron 41** + **electron-builder 26.10**. Skrivebordsappen starter den frittstående Next.js-serveren
som en underprosess, peker et `BrowserWindow`-vindu mot den og legger til et
systemstatusfelt, automatisk oppdatering, en IPC-bro og konfigurasjonsfri initialisering av hemmeligheter.

## Arkitektur

```
┌─────────────────────────────────────────────────────┐
│ Electron-hovedprosess (electron/main.js)            │
│ ├─ Lås for én enkelt instans                        │
│ ├─ Underprosess: Frittstående Next.js-server        │
│ │   (startet med Electrons Node-kjøretidsmiljø)     │
│ ├─ BrowserWindow → http://localhost:PORT            │
│ ├─ Systemstatusfelt + kontekstmeny                  │
│ ├─ Automatisk oppdatering via electron-updater      │
│ ├─ Content Security Policy (øktshoder)              │
│ └─ Initialisering av hemmeligheter (JWT / API_KEY_SECRET) │
└─────────────────────────────────────────────────────┘
            ↕ IPC-bro (electron/preload.js)
┌─────────────────────────────────────────────────────┐
│ Gjengivelsesprosess (Next.js-kontrollpanel)         │
│   window.electronAPI.* (contextIsolation)           │
└─────────────────────────────────────────────────────┘
```

## Versjoner

Bekreftet fra `electron/package.json`:

| Pakke              | Versjon                                                                  |
| ------------------ | ------------------------------------------------------------------------ |
| `electron`         | `^43.4.1`                                                                |
| `electron-builder` | `^26.15.3`                                                               |
| `electron-updater` | `^6.8.9`                                                                 |
| `better-sqlite3`   | rot `^13.0.2` (forhåndsbygde Node-API-pakker — ingen Electron-ombygging) |
| Appversjon         | `3.8.0`                                                                  |
| App-ID             | `online.omniroute.desktop`                                               |
| Produktnavn        | `OmniRoute`                                                              |

## Skript (rotens `package.json`)

| Skript                            | Formål                                                                                  |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Starter `npm run dev` + venter på `localhost:20128` + starter Electron                  |
| `npm run electron:build`          | Bygger Next.js og kjører deretter `electron-builder` for gjeldende operativsystem       |
| `npm run electron:build:win`      | Bygger Windows NSIS-installasjonsprogram + portabel versjon (x64)                       |
| `npm run electron:build:mac`      | Bygger macOS DMG (Intel + Apple Silicon)                                                |
| `npm run electron:build:linux`    | Bygger Linux AppImage + DEB (x64 + arm64)                                               |
| `npm run electron:smoke:packaged` | Starter den pakkede binærfilen og kontrollerer `/login` for HTTP 200, før den avsluttes |

Arbeidsområdet `electron/` tilbyr også:

- `npm run prepare:bundle` — kjører `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — macOS-bygg for én enkelt arkitektur
- `npm run pack` — bygg kun som katalog for lokal testing (uten installasjonsprogram)

## Katalogstruktur

```
electron/
├── package.json              # Electron-avhengigheter + electron-builder-konfigurasjon
├── main.js                   # Hovedprosess (24 KB — se merknadene nedenfor)
├── preload.js                # contextBridge IPC-bro
├── types.d.ts                # AppInfo- / ServerStatus- / ElectronAPI-typer
├── README.md                 # Merknader i arbeidsområdet
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Utdata fra electron-builder (ignoreres av git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Klargjør .next/electron-standalone-pakken
└── dev/
    └── smoke-electron-packaged.mjs       # Røyktest etter bygging
```

Både `main.js` og `preload.js` er **CommonJS `.js`-filer**, ikke TypeScript. Typene
på renderer-siden ligger i `electron/types.d.ts`.

## IPC-bro (`preload.js`)

Preload-skriptet eksponerer et hvitelistet API på `window.electronAPI` ved hjelp av `contextBridge`
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

Eksponerte metoder:

| Kall fra renderer                                                 | Type                                        |
| ----------------------------------------------------------------- | ------------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                      |
| `openExternal(url)`                                               | invoke                                      |
| `getDataDir()`                                                    | invoke                                      |
| `restartServer()`                                                 | invoke                                      |
| `getAppVersion()`                                                 | invoke                                      |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                      |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                        |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (returnerer en oppryddingsfunksjon) |

Receive-hjelperne returnerer en **oppryddingsfunksjon** i stedet for å bruke
`removeAllListeners` — dette forhindrer opphopning av lyttere når React-komponenter
monteres på nytt.

## Serverens livssyklus

`main.js` starter den frittstående Next.js-pakken direkte med Electrons Node-kjøretidsmiljø
for å unngå ABI-konflikter mellom native moduler og systemets Node:

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

Høydepunkter:

- `waitForServer()` spør URL-en gjentatte ganger i opptil 30 s før vinduet vises (ingen tom skjerm ved kaldstart).
- `stdio: "pipe"` fanger opp stdout/stderr; klar-meldinger (`Ready` / `listening`) sender `server-status: running` via IPC.
- `before-quit` venter i opptil 5 s på en kontrollert SIGTERM (WAL-kontrollpunkt) og sender deretter SIGKILL.
- Portvelgeren i systemstatusfeltet (`20128`, `3000`, `8080`) stopper og starter serveren på nytt, og laster deretter BrowserWindow på nytt.

## Oppstart av hemmeligheter uten konfigurasjon

Ved første oppstart genererer og lagrer hovedprosessen automatisk manglende hemmeligheter:

| Hemmelighet              | Kilde                                                                                         |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                      |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (avviser hvis kryptert legitimasjon allerede finnes) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                      |

Lagres i `<DATA_DIR>/server.env`. `DATA_DIR` fastsettes til:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` eller `~/.omniroute`
- macOS: `~/.omniroute`

## Vindu og systemstatusfelt

- `BrowserWindow`: 1400×900 (min. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, vindusknapper ved `{ x: 16, y: 16 }`.
- Windows/Linux: innebygd tittellinje.
- Lukkeknappen minimerer til systemstatusfeltet. Menyen i systemstatusfeltet har **Åpne OmniRoute**, **Åpne kontrollpanel** (ekstern nettleser), undermenyen **Serverport**, **Se etter oppdateringer** og **Avslutt**.

## Sikkerhetspolicy for innhold

Angis via `session.defaultSession.webRequest.onHeadersReceived`. Viktige direktiver:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Utviklingsmodus legger bare til `'unsafe-eval'` i `script-src`

## Automatisk oppdatering

Bruker `electron-updater` med GitHub-leverandøren (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Hendelser videresendes til renderer-prosessen via `update-status`-IPC:
  `checking`, `available`, `not-available`, `downloading` (med `percent`), `downloaded`, `error`
- `installUpdate()` avslutter serveren og kaller deretter `autoUpdater.quitAndInstall()`
- Hoppes over i utviklingsmodus (`!app.isPackaged`)

## Byggeprosess

1. `npm run build` → frittstående Next.js-bygg i `.next/standalone`.
2. `prepare-electron-standalone.mjs` → klargjør på nytt i `.next/electron-standalone` og omskriver absolutte baner i `server.js` + `required-server-files.json`, slik at pakken kan flyttes.
3. `electron-builder` pakker `main.js`, `preload.js`, `node_modules` og `extraResources: { ../.next/electron-standalone → app }`.

### Byggemål

| OS      | Mål                                            |
| ------- | ---------------------------------------------- |
| Windows | NSIS-installasjonsprogram + portabel (x64)     |
| macOS   | DMG (Intel + arm64, dra til Programmer-mappen) |
| Linux   | AppImage + DEB (x64 + arm64)                   |

NSIS-innstillinger: `oneClick: false`, lar brukeren velge installasjonsmappe og oppretter snarveier på skrivebordet og Start-menyen.

## Røyktesting av pakket bygg

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Finner automatisk den pakkede binærfilen i `electron/dist-electron/` for gjeldende plattform.
- Starter med isolerte `HOME`/`APPDATA`/`XDG_*`-mapper, slik at utviklerdata ikke berøres.
- Spør `http://127.0.0.1:20128/login` gjentatte ganger etter HTTP 200 innen 45 s.
- Overvåker stderr/stdout for kritiske mønstre (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` osv.).
- Venter på 2 s med stabil kjøretid etter at tjenesten er klar, sender deretter SIGTERM og venter til porten blir ledig.
- I CI sendes `--no-sandbox --disable-gpu` automatisk (og `--disable-dev-shm-usage` på Linux).

Miljøoverstyringer: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kodesignering

`electron/package.json` konfigurerer **ikke** signeringslegitimasjon direkte. Send den via miljøvariabler til `electron-builder`:

### macOS

```bash
export APPLE_ID=<e-post>
export APPLE_APP_SPECIFIC_PASSWORD=<passord>
export APPLE_TEAM_ID=<id>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<sertifikat-passord>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<sertifikat-passord>
npm run electron:build:win
```

### Linux

AppImage-signering er valgfritt — angi `LINUX_GPG_KEY` hvis du vil signere.

## Distribusjon

Artefakter plasseres i `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Utgivelser publiseres på GitHub Releases (`diegosouzapw/OmniRoute`), som også er der `electron-updater` ser etter nye versjoner.

## Feilsøking

| Symptom                                                                      | Løsning                                                                                                                                                                                         |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` etter en hovedoppgradering av Electron | better-sqlite3 v13 leveres med forhåndsbygde Node-API-filer — kjør `npm install` på nytt i roten og deretter `prepare:bundle` (den verifiserer den forhåndsbygde filen for gjeldende plattform) |
| `ERR_DLOPEN_FAILED` for innebygd modul                                       | Kjør `prepare:bundle` på nytt — den avbryter umiddelbart hvis den forhåndsbygde Node-API-filen for gjeldende plattform mangler                                                                  |
| Vinduet vises tomt på Linux                                                  | Bekreft at Next.js-serveren faktisk er bundet til PORT (sjekk `[Server]`-loggene)                                                                                                               |
| macOS-notarisering stopper opp                                               | Kontroller at `APPLE_*`-variablene er eksportert, og ikke bare angitt i `.env`                                                                                                                  |
| Windows SmartScreen-advarsel                                                 | Signer med et EV-sertifikat, eller be brukerne høyreklikke → «Kjør likevel»                                                                                                                     |
| Røyktesten mislykkes fordi porten er i bruk                                  | Stopp eventuelle lokale utviklingsservere på 20128 før du kjører `electron:smoke:packaged`                                                                                                      |

## Se også

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Kilde: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Hjelpeskript: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
