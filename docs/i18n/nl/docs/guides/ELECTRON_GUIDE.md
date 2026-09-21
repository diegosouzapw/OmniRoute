# Electron Desktop Guide (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Gezaghebbende bron:** `electron/`-werkruimte
> **Laatst bijgewerkt:** 2026-06-28 — v3.8.40

OmniRoute wordt geleverd met een platformoverschrijdende desktopapp (Windows / macOS / Linux), gebouwd met
**Electron 41** + **electron-builder 26.10**. De desktopapp start de zelfstandige Next.js-server
als een onderliggend proces, laat een `BrowserWindow` ernaar verwijzen en voegt een
systeemvakpictogram, automatische updater, IPC-bridge en configuratievrije initialisatie van geheimen toe.

## Architectuur

```
┌─────────────────────────────────────────────────┐
│ Electron-hoofdproces (electron/main.js)          │
│ ├─ Vergrendeling voor één exemplaar             │
│ ├─ Onderliggend proces: zelfstandige Next.js-    │
│ │   server (gestart met de Node-runtime van      │
│ │   Electron)                                    │
│ ├─ BrowserWindow → http://localhost:PORT         │
│ ├─ Systeemvakpictogram + contextmenu             │
│ ├─ Automatische updates via electron-updater     │
│ ├─ Content Security Policy (sessieheaders)       │
│ └─ Initialisatie van geheimen (JWT /             │
│     API_KEY_SECRET)                              │
└─────────────────────────────────────────────────┘
            ↕ IPC-bridge (electron/preload.js)
┌─────────────────────────────────────────────────┐
│ Renderer (Next.js-dashboard)                     │
│   window.electronAPI.* (contextIsolation)        │
└─────────────────────────────────────────────────┘
```

## Versies

Bevestigd op basis van `electron/package.json`:

| Pakket             | Versie                                                               |
| ------------------ | -------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                            |
| `electron-builder` | `^26.15.3`                                                           |
| `electron-updater` | `^6.8.9`                                                             |
| `better-sqlite3`   | root `^13.0.2` (Node-API-prebuilds — geen Electron-herbuild vereist) |
| Appversie          | `3.8.0`                                                              |
| App-id             | `online.omniroute.desktop`                                           |
| Productnaam        | `OmniRoute`                                                          |

## Scripts (`package.json` in de root)

| Script                            | Doel                                                                                                      |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Start `npm run dev`, wacht op `localhost:20128` en start Electron                                         |
| `npm run electron:build`          | Bouwt Next.js en voert vervolgens `electron-builder` uit voor het huidige besturingssysteem               |
| `npm run electron:build:win`      | Bouwt het Windows NSIS-installatieprogramma + de draagbare versie (x64)                                   |
| `npm run electron:build:mac`      | Bouwt de macOS-DMG (Intel + Apple Silicon)                                                                |
| `npm run electron:build:linux`    | Bouwt de Linux-AppImage + DEB (x64 + arm64)                                                               |
| `npm run electron:smoke:packaged` | Start het verpakte binaire bestand, controleert `/login` op HTTP 200 en sluit het programma vervolgens af |

De `electron/`-werkruimte biedt ook:

- `npm run prepare:bundle` — voert `scripts/build/prepare-electron-standalone.mjs` uit
- `npm run build:mac-x64` / `build:mac-arm64` — macOS-builds voor één architectuur
- `npm run pack` — build met alleen een map voor lokale tests (geen installatieprogramma)

## Mappenstructuur

```
electron/
├── package.json              # Electron-afhankelijkheden + electron-builder-configuratie
├── main.js                   # Hoofdproces (24 KB — zie annotaties hieronder)
├── preload.js                # contextBridge IPC-brug
├── types.d.ts                # AppInfo-/ServerStatus-/ElectronAPI-typen
├── README.md                 # Notities binnen de workspace
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder-uitvoer (genegeerd door Git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Bereidt de .next/electron-standalone-bundel voor
└── dev/
    └── smoke-electron-packaged.mjs       # Smoke-test na het bouwen
```

Zowel `main.js` als `preload.js` zijn **CommonJS `.js`-bestanden**, geen TypeScript. De
typedeclaraties aan de rendererzijde bevinden zich in `electron/types.d.ts`.

## IPC-brug (`preload.js`)

De preload stelt met behulp van `contextBridge` een API uit een toelatingslijst beschikbaar via `window.electronAPI`,
met `contextIsolation: true` en `nodeIntegration: false`.

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

Beschikbare methoden:

| Renderer-aanroep                                                  | Type                               |
| ----------------------------------------------------------------- | ---------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                             |
| `openExternal(url)`                                               | invoke                             |
| `getDataDir()`                                                    | invoke                             |
| `restartServer()`                                                 | invoke                             |
| `getAppVersion()`                                                 | invoke                             |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                             |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                               |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (retourneert een disposer) |

De receive-helpers retourneren een **disposer-functie** in plaats van te vertrouwen op
`removeAllListeners` — dit voorkomt de opstapeling van listeners wanneer React-componenten
opnieuw worden gemount.

## Serverlevenscyclus

`main.js` start de zelfstandige Next.js-bundel rechtstreeks met de Electron Node-
runtime om een ABI-incompatibiliteit van native modules met de systeemversie van Node te voorkomen:

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

Hoogtepunten:

- `waitForServer()` pollt de URL maximaal 30 s voordat het venster wordt weergegeven (geen leeg scherm bij een koude start).
- `stdio: "pipe"` legt stdout/stderr vast; gereedmeldingen (`Ready` / `listening`) verzenden `server-status: running` via IPC.
- `before-quit` wacht maximaal 5 s op een correcte afsluiting via SIGTERM (WAL-checkpoint) en verzendt daarna SIGKILL.
- De poortkiezer in het systeemvak (`20128`, `3000`, `8080`) stopt en herstart de server en laadt vervolgens de BrowserWindow opnieuw.

## Geheimen bootstrap zonder configuratie

Bij de eerste start genereert het hoofdproces automatisch ontbrekende geheimen en slaat deze permanent op:

| Geheim                   | Bron                                                                                              |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                          |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (weigert als er al versleutelde aanmeldgegevens bestaan) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                          |

Opgeslagen in `<DATA_DIR>/server.env`. `DATA_DIR` wordt bepaald als:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` of `~/.omniroute`
- macOS: `~/.omniroute`

## Venster en systeemvak

- `BrowserWindow`: 1400×900 (min. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, vensterknoppen op `{ x: 16, y: 16 }`.
- Windows/Linux: systeemeigen titelbalk.
- De sluitknop minimaliseert naar het systeemvak; het systeemvakmenu bevat **OmniRoute openen**, **Dashboard openen** (externe browser), het submenu **Serverpoort**, **Controleren op updates** en **Afsluiten**.

## Content Security Policy

Ingesteld via `session.defaultSession.webRequest.onHeadersReceived`. Belangrijke instructies:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- De ontwikkelmodus voegt alleen aan `script-src` `'unsafe-eval'` toe

## Automatisch bijwerken

Gebruikt `electron-updater` met de GitHub-provider (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Gebeurtenissen worden via `update-status`-IPC doorgestuurd naar de renderer:
  `checking`, `available`, `not-available`, `downloading` (met `percent`), `downloaded`, `error`
- `installUpdate()` beëindigt de server en roept vervolgens `autoUpdater.quitAndInstall()` aan
- Overgeslagen in de ontwikkelmodus (`!app.isPackaged`)

## Build-pijplijn

1. `npm run build` → zelfstandige Next.js-build in `.next/standalone`.
2. `prepare-electron-standalone.mjs` → zet de bestanden opnieuw klaar in `.next/electron-standalone` en herschrijft absolute paden in `server.js` + `required-server-files.json`, zodat de bundel verplaatsbaar is.
3. `electron-builder` verpakt `main.js`, `preload.js`, `node_modules` en `extraResources: { ../.next/electron-standalone → app }`.

### Build-doelen

| Besturingssysteem | Doelen                                        |
| ----------------- | --------------------------------------------- |
| Windows           | NSIS-installatieprogramma + portable (x64)    |
| macOS             | DMG (Intel + arm64, slepen naar Applications) |
| Linux             | AppImage + DEB (x64 + arm64)                  |

NSIS-instellingen: `oneClick: false`, laat de gebruiker de installatiemap kiezen en maakt snelkoppelingen op het bureaublad en in het Startmenu.

## Rooktest van de verpakte build

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Detecteert automatisch het verpakte uitvoerbare bestand in `electron/dist-electron/` voor het huidige platform.
- Start met geïsoleerde `HOME`-/`APPDATA`-/`XDG_*`-mappen, zodat ontwikkelaarsgegevens niet worden gewijzigd.
- Vraagt `http://127.0.0.1:20128/login` herhaaldelijk op en verwacht binnen 45 s een HTTP 200-respons.
- Controleert stderr/stdout op fatale patronen (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, enz.).
- Wacht na gereedheid 2 s op een stabiele uitvoering, stuurt vervolgens SIGTERM en wacht totdat de poort vrijkomt.
- Geeft in CI automatisch `--no-sandbox --disable-gpu` door (en `--disable-dev-shm-usage` op Linux).

Omgevingsvariabelen voor overschrijvingen: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Codeondertekening

`electron/package.json` koppelt de ondertekeningsreferenties **niet** rechtstreeks. Geef ze via omgevingsvariabelen door aan `electron-builder`:

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

Het ondertekenen van AppImage is optioneel — stel `LINUX_GPG_KEY` in als ondertekening gewenst is.

## Distributie

Artefacten worden in `electron/dist-electron/` geplaatst:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Releases worden gepubliceerd op GitHub Releases (`diegosouzapw/OmniRoute`), waar `electron-updater` ook controleert op nieuwe versies.

## Probleemoplossing

| Symptoom                                                                   | Oplossing                                                                                                                                                                                                   |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` na een grote Electron-versie-upgrade | better-sqlite3 v13 levert vooraf gebouwde Node-API-binaries — voer `npm install` opnieuw uit in de hoofdmap en daarna `prepare:bundle` (dit verifieert de vooraf gebouwde binary voor het huidige platform) |
| `ERR_DLOPEN_FAILED` voor een native module                                 | Voer `prepare:bundle` opnieuw uit — dit stopt direct met een fout als de vooraf gebouwde Node-API-binary voor het huidige platform ontbreekt                                                                |
| Venster blijft leeg op Linux                                               | Controleer of de Next.js-server daadwerkelijk aan PORT is gekoppeld (controleer de `[Server]`-logs)                                                                                                         |
| macOS-notarisatie blijft hangen                                            | Zorg ervoor dat de `APPLE_*`-variabelen zijn geëxporteerd en niet alleen in `.env` staan                                                                                                                    |
| Windows SmartScreen-waarschuwing                                           | Onderteken met een EV-certificaat, of laat gebruikers met de rechtermuisknop klikken → "Toch uitvoeren"                                                                                                     |
| Rooktest mislukt omdat de poort in gebruik is                              | Stop elke lokale ontwikkelserver op 20128 voordat u `electron:smoke:packaged` uitvoert                                                                                                                      |

## Zie ook

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Bron: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Hulpprogramma's: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
