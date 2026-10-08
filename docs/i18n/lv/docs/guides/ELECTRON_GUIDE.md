# Electron Desktop Guide (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Patiesības avots:** `electron/` darbvieta
> **Pēdējoreiz atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute ietver vairākplatformu darbvirsmas lietotni (Windows / macOS / Linux), kas veidota,
izmantojot **Electron 41** un **electron-builder 26.10**. Darbvirsmas lietotne palaiž Next.js
savrupserveri kā bērnprocesu, novirza uz to `BrowserWindow` un pievieno
sistēmas tekni, automātisko atjauninātāju, IPC tiltu un bezkonfigurācijas noslēpumu inicializāciju.

## Arhitektūra

```
┌──────────────────────────────────────────────────────┐
│ Electron galvenais process (electron/main.js)        │
│ ├─ Vienas instances bloķēšana                        │
│ ├─ Bērnprocess: Next.js savrupserveris               │
│ │   (palaists ar Electron Node izpildlaika vidi)      │
│ ├─ BrowserWindow → http://localhost:PORT             │
│ ├─ Sistēmas tekne + kontekstizvēlne                  │
│ ├─ Automātiskā atjaunināšana ar electron-updater     │
│ ├─ Satura drošības politika (sesijas galvenes)       │
│ └─ Noslēpumu inicializācija (JWT / API_KEY_SECRET)   │
└──────────────────────────────────────────────────────┘
            ↕ IPC tilts (electron/preload.js)
┌──────────────────────────────────────────────────────┐
│ Renderētājs (Next.js informācijas panelis)           │
│   window.electronAPI.* (contextIsolation)            │
└──────────────────────────────────────────────────────┘
```

## Versijas

Apstiprināts, izmantojot `electron/package.json`:

| Pakotne            | Versija                                                             |
| ------------------ | ------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                           |
| `electron-builder` | `^26.15.3`                                                          |
| `electron-updater` | `^6.8.9`                                                            |
| `better-sqlite3`   | saknes `^13.0.2` (Node-API priekšbūvējumi — Electron nav jāpārbūvē) |
| Lietotnes versija  | `3.8.0`                                                             |
| Lietotnes ID       | `online.omniroute.desktop`                                          |
| Produkta nosaukums | `OmniRoute`                                                         |

## Skripti (saknes `package.json`)

| Skripts                           | Mērķis                                                                                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Palaiž `npm run dev`, gaida `localhost:20128` un palaiž Electron                                           |
| `npm run electron:build`          | Būvē Next.js un pēc tam izpilda `electron-builder` pašreizējai operētājsistēmai                            |
| `npm run electron:build:win`      | Būvē Windows NSIS instalētāju un portatīvo versiju (x64)                                                   |
| `npm run electron:build:mac`      | Būvē macOS DMG (Intel + Apple Silicon)                                                                     |
| `npm run electron:build:linux`    | Būvē Linux AppImage un DEB (x64 + arm64)                                                                   |
| `npm run electron:smoke:packaged` | Palaiž sapakoto bināro failu un pārbauda, vai `/login` atgriež HTTP 200, pēc tam pabeidz lietotnes darbību |

Darbvieta `electron/` nodrošina arī:

- `npm run prepare:bundle` — izpilda `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — vienas arhitektūras macOS būvējumi
- `npm run pack` — būvējums tikai direktorijā lokālai testēšanai (bez instalētāja)

## Direktoriju izkārtojums

```
electron/
├── package.json              # Electron atkarības + electron-builder konfigurācija
├── main.js                   # Galvenais process (24 KB — skatiet anotācijas tālāk)
├── preload.js                # contextBridge IPC tilts
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI tipi
├── README.md                 # Piezīmes darbvietā
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder izvade (git ignorēta)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Sagatavo .next/electron-standalone komplektu
└── dev/
    └── smoke-electron-packaged.mjs       # Pēcbūvējuma ātrā pārbaude
```

Gan `main.js`, gan `preload.js` ir **CommonJS `.js` faili**, nevis TypeScript.
Renderētāja puses tipu definīcijas atrodas failā `electron/types.d.ts`.

## IPC tilts (`preload.js`)

Priekšielādes skripts, izmantojot `contextBridge`, nodrošina baltajā sarakstā iekļautu API objektā `window.electronAPI`
ar `contextIsolation: true` un `nodeIntegration: false`.

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

Pieejamās metodes:

| Renderētāja izsaukums                                             | Tips                       |
| ----------------------------------------------------------------- | -------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                     |
| `openExternal(url)`                                               | invoke                     |
| `getDataDir()`                                                    | invoke                     |
| `restartServer()`                                                 | invoke                     |
| `getAppVersion()`                                                 | invoke                     |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                     |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                       |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (atgriež noņēmēju) |

Saņemšanas palīgfunkcijas atgriež **noņēmēja funkciju**, nevis paļaujas uz
`removeAllListeners` — tas novērš klausītāju uzkrāšanos, kad React komponenti
tiek atkārtoti montēti.

## Servera dzīves cikls

`main.js` palaiž Next.js savrupo komplektu tieši ar Electron Node
izpildlaiku, lai izvairītos no iebūvēto moduļu ABI neatbilstības sistēmas Node versijai:

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

Svarīgākais:

- `waitForServer()` aptaujā URL līdz 30 s, pirms tiek parādīts logs (aukstās palaišanas laikā nav tukša ekrāna).
- `stdio: "pipe"` tver stdout/stderr; gatavības frāzes (`Ready` / `listening`) nosūta `server-status: running`, izmantojot IPC.
- `before-quit` gaida līdz 5 s korektai SIGTERM pabeigšanai (WAL kontrolpunkta izveidei) un pēc tam nosūta SIGKILL.
- Portu pārslēdzējs sistēmas teknē (`20128`, `3000`, `8080`) aptur un restartē serveri, pēc tam atkārtoti ielādē BrowserWindow.

## Beznkonfigurācijas noslēpumu sāknēšana

Pirmajā palaišanas reizē galvenais process automātiski ģenerē un saglabā trūkstošos noslēpumus:

| Noslēpums                | Avots                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                     |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (atsakās, ja šifrēti akreditācijas dati jau pastāv) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                     |

Tie tiek saglabāti failā `<DATA_DIR>/server.env`. `DATA_DIR` tiek noteikts šādi:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` vai `~/.omniroute`
- macOS: `~/.omniroute`

## Vides faila meklēšana

Pirms servera procesa palaišanas galvenais process (`getPreferredEnvFilePath()` failā
`electron/main.js`) izvēlas **vienu** `.env` failu: pirmo no tālāk norādītajiem, kas pastāv.

1. `$DATA_DIR/.env`, ja `DATA_DIR` ir iestatīts vidē, ar kuru tika palaista lietotne.
2. `<resolved DATA_DIR>/.env`, izmantojot tos pašus iepriekš norādītos noklusējumus: `%APPDATA%\omniroute\.env`
   operētājsistēmā Windows, `$XDG_CONFIG_HOME/omniroute/.env` vai `~/.omniroute/.env` operētājsistēmās Linux un macOS.
3. `.env` procesa darba direktorijā.

Galvenais process nolasa tikai šo failu; vēlākie kandidāti netiek apvienoti. Pēc tam servera
vide tiek izveidota ar šādu prioritāti (sākot ar augstāko):

1. Electron procesa vide (mainīgie, kas mantoti no procesa, kurš palaida lietotni).
2. Izvēlētais `.env` fails.
3. `<DATA_DIR>/server.env` (iepriekš minētie sāknēšanas noslēpumi).

Procesa vide tiek fiksēta lietotnes palaišanas brīdī, tāpēc sistēmas vai lietotāja vides
mainīgais, kas iestatīts lietotnes darbības laikā (tostarp laikā, kad pēc loga aizvēršanas tā
atrodas sistēmas teknē), nenonāk serverī, kamēr lietotne nav pilnībā aizvērta un palaista no jauna.
Izpildlaika iestatījumiem, piemēram, `CONTEXT_LENGTH_<PROVIDER>` (skatiet
[Vides mainīgie: konteksta garums katram nodrošinātājam](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
ieteicams izmantot `.env` failu, pēc tam pilnībā aizvērt lietotni (sistēmas teknē izvēloties **Iziet**) un palaist to no jauna.

## Logs un sistēmas tekne

- `BrowserWindow`: 1400×900 (min. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, loga vadības pogas atrodas `{ x: 16, y: 16 }`.
- Windows/Linux: sistēmas virsrakstjosla.
- Aizvēršanas poga minimizē lietotni sistēmas teknē; teknes izvēlnē ir **Atvērt OmniRoute**, **Atvērt informācijas paneli** (ārējā pārlūkprogrammā), apakšizvēlne **Servera ports**, **Pārbaudīt atjauninājumus**, **Iziet**.

## Satura drošības politika

Iestatīta, izmantojot `session.defaultSession.webRequest.onHeadersReceived`. Būtiskākās direktīvas:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Izstrādes režīmā tikai direktīvai `script-src` tiek pievienots `'unsafe-eval'`

## Automātiskā atjaunināšana

Izmanto `electron-updater` ar GitHub nodrošinātāju (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Notikumi tiek pārsūtīti renderēšanas procesam, izmantojot `update-status` IPC:
  `checking`, `available`, `not-available`, `downloading` (ar `percent`), `downloaded`, `error`
- `installUpdate()` aptur serveri un pēc tam izsauc `autoUpdater.quitAndInstall()`
- Izstrādes režīmā tiek izlaists (`!app.isPackaged`)

## Būvēšanas konveijers

1. `npm run build` → Next.js savrupais būvējums mapē `.next/standalone`.
2. `prepare-electron-standalone.mjs` → atkārtoti sagatavo failus mapē `.next/electron-standalone` un pārraksta absolūtos ceļus failos `server.js` + `required-server-files.json`, lai pakotni varētu pārvietot.
3. `electron-builder` iepako `main.js`, `preload.js`, `node_modules` un `extraResources: { ../.next/electron-standalone → app }`.

### Būvēšanas mērķi

| OS      | Mērķi                                             |
| ------- | ------------------------------------------------- |
| Windows | NSIS instalētājs + portatīvā versija (x64)        |
| macOS   | DMG (Intel + arm64, ievilkšana Applications mapē) |
| Linux   | AppImage + DEB (x64 + arm64)                      |

NSIS iestatījumi: `oneClick: false`, ļauj lietotājam izvēlēties instalēšanas direktoriju, izveido saīsnes darbvirsmā un izvēlnē Sākt.

## Iepakotā būvējuma pamata darbspējas pārbaude

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automātiski atrod pašreizējai platformai paredzēto iepakoto izpildāmo failu mapē `electron/dist-electron/`.
- Palaiž to ar izolētām `HOME`/`APPDATA`/`XDG_*` direktorijām, lai netiktu skarti izstrādātāja dati.
- 45 s laikā periodiski pārbauda, vai `http://127.0.0.1:20128/login` atgriež HTTP 200.
- Pārrauga stderr/stdout, meklējot kritisku kļūdu paraugus (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` u.c.).
- Pēc gatavības sasniegšanas nogaida 2 s stabilas darbības, pēc tam nosūta SIGTERM un gaida, līdz ports tiek atbrīvots.
- CI vidē automātiski nodod `--no-sandbox --disable-gpu` (un `--disable-dev-shm-usage` operētājsistēmā Linux).

Vides mainīgo pārrakstīšanas iespējas: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Koda parakstīšana

`electron/package.json` **neiekļauj** parakstīšanas akreditācijas datus tieši. Nododiet tos `electron-builder`, izmantojot vides mainīgos:

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

AppImage parakstīšana nav obligāta — iestatiet `LINUX_GPG_KEY`, ja nepieciešama parakstīšana.

## Izplatīšana

Artefakti tiek ievietoti mapē `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Laidieni tiek publicēti GitHub Releases (`diegosouzapw/OmniRoute`), kur `electron-updater` arī pārbauda jaunu versiju pieejamību.

## Problēmu novēršana

| Simptoms                                                                             | Risinājums                                                                                                                                                                                             |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` pēc Electron galvenās versijas paaugstināšanas | better-sqlite3 v13 nodrošina Node-API iepriekš būvētas pakotnes — vēlreiz palaidiet `npm install` saknes direktorijā un `prepare:bundle` (tas pārbauda pašreizējās platformas iepriekš būvēto pakotni) |
| `ERR_DLOPEN_FAILED` vietējam modulim                                                 | Vēlreiz palaidiet `prepare:bundle` — tas nekavējoties pārtrauc darbību, ja pašreizējās platformas Node-API iepriekš būvētās pakotnes nav                                                               |
| Linux vidē logs ir tukšs                                                             | Pārliecinieties, ka Next.js serveris patiešām piesaistījās PORT (pārbaudiet `[Server]` žurnālus)                                                                                                       |
| macOS notariālā apstiprināšana iestrēgst                                             | Pārliecinieties, ka `APPLE_*` mainīgie ir eksportēti, nevis tikai norādīti `.env`                                                                                                                      |
| Windows SmartScreen brīdinājums                                                      | Parakstiet ar EV sertifikātu vai lietotājiem jāveic labais klikšķis → "Tomēr palaist"                                                                                                                  |
| Pamata darbspējas pārbaude neizdodas aizņemta porta dēļ                              | Pirms `electron:smoke:packaged` palaišanas apturiet jebkuru lokālo izstrādes serveri, kas izmanto portu 20128                                                                                          |

## Skatiet arī

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Avots: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Palīgskripti: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
