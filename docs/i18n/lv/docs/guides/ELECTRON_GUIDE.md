# Electron Desktop Guide (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Patiesības avots:** `electron/` darbvieta
> **Pēdējoreiz atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute nodrošina vairākplatformu darbvirsmas lietotni (Windows / macOS / Linux), kas veidota ar
**Electron 41** + **electron-builder 26.10**. Darbvirsmas lietotne palaiž Next.js
savrupā servera procesu kā bērnprocesu, novirza uz to `BrowserWindow` un pievieno
sistēmas tekni, automātisko atjauninātāju, IPC tiltu un bezkonfigurācijas noslēpumu inicializāciju.

## Arhitektūra

```
┌──────────────────────────────────────────────┐
│ Electron galvenais process (electron/main.js)│
│ ├─ Vienas instances bloķēšana                │
│ ├─ Bērnprocess: Next.js savrupais serveris   │
│ │   (palaists ar Electron Node izpildvidi)   │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Sistēmas tekne + kontekstizvēlne          │
│ ├─ Automātiskā atjaunināšana ar electron-updater │
│ ├─ Satura drošības politika (sesijas galvenes) │
│ └─ Noslēpumu inicializācija (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────┘
            ↕ IPC tilts (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Atveidotājs (Next.js informācijas panelis)   │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## Versijas

Apstiprināts no `electron/package.json`:

| Pakotne            | Versija                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `electron`         | `^43.4.1`                                                                                        |
| `electron-builder` | `^26.15.3`                                                                                       |
| `electron-updater` | `^6.8.9`                                                                                         |
| `better-sqlite3`   | saknes `^13.0.2` (Node-API iepriekšējie būvējumi — Electron atkārtota būvēšana nav nepieciešama) |
| Lietotnes versija  | `3.8.0`                                                                                          |
| Lietotnes id       | `online.omniroute.desktop`                                                                       |
| Produkta nosaukums | `OmniRoute`                                                                                      |

## Skripti (saknes `package.json`)

| Skripts                           | Nolūks                                                                                       |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Palaiž `npm run dev`, gaida `localhost:20128` un palaiž Electron                             |
| `npm run electron:build`          | Būvē Next.js un pēc tam palaiž `electron-builder` pašreizējai OS                             |
| `npm run electron:build:win`      | Būvē Windows NSIS instalētāju un portatīvo versiju (x64)                                     |
| `npm run electron:build:mac`      | Būvē macOS DMG (Intel + Apple Silicon)                                                       |
| `npm run electron:build:linux`    | Būvē Linux AppImage + DEB (x64 + arm64)                                                      |
| `npm run electron:smoke:packaged` | Palaiž sapakoto bināro failu, pārbauda, vai `/login` atgriež HTTP 200, un pēc tam to izslēdz |

`electron/` darbvieta nodrošina arī:

- `npm run prepare:bundle` — palaiž `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — vienas arhitektūras macOS būvējumi
- `npm run pack` — tikai direktorija būvējums lokālai testēšanai (bez instalētāja)

## Direktoriju struktūra

```
electron/
├── package.json              # Electron atkarības + electron-builder konfigurācija
├── main.js                   # Galvenais process (24 KB — skatiet anotācijas tālāk)
├── preload.js                # contextBridge IPC tilts
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI tipi
├── README.md                 # Darbvietas piezīmes
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder izvade (git ignorēta)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Sagatavo .next/electron-standalone komplektu
└── dev/
    └── smoke-electron-packaged.mjs       # Pēcbūvējuma pamatdarbības tests
```

Gan `main.js`, gan `preload.js` ir **CommonJS `.js` faili**, nevis TypeScript. Ar
renderētāju saistītās tipu definīcijas atrodas failā `electron/types.d.ts`.

## IPC tilts (`preload.js`)

Priekšielādes skripts, izmantojot `contextBridge`, objektā `window.electronAPI`
eksponē baltajā sarakstā iekļautu API ar `contextIsolation: true` un `nodeIntegration: false`.

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

Eksponētās metodes:

| Renderētāja izsaukums                                             | Tips                                    |
| ----------------------------------------------------------------- | --------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                  |
| `openExternal(url)`                                               | invoke                                  |
| `getDataDir()`                                                    | invoke                                  |
| `restartServer()`                                                 | invoke                                  |
| `getAppVersion()`                                                 | invoke                                  |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                  |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                    |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (atgriež atbrīvošanas funkciju) |

Saņemšanas palīgfunkcijas atgriež **atbrīvošanas funkciju**, nevis paļaujas uz
`removeAllListeners` — tas novērš klausītāju uzkrāšanos, kad React komponenti
tiek atkārtoti montēti.

## Servera dzīves cikls

`main.js` palaiž Next.js savrupo komplektu tieši ar Electron Node
izpildlaiku, lai izvairītos no iebūvēto moduļu ABI nesaderības ar sistēmas Node:

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

- `waitForServer()` aptaujā URL līdz pat 30 s, pirms tiek parādīts logs (aukstās palaišanas laikā nav tukša ekrāna).
- `stdio: "pipe"` tver stdout/stderr; gatavības frāzes (`Ready` / `listening`) pa IPC nosūta `server-status: running`.
- `before-quit` līdz 5 s gaida korektu SIGTERM pabeigšanu (WAL kontrolpunkta izveidi) un pēc tam nosūta SIGKILL.
- Portu pārslēdzējs sistēmas teknē (`20128`, `3000`, `8080`) aptur un restartē serveri un pēc tam atkārtoti ielādē BrowserWindow.

## Bezkonfigurācijas noslēpumu inicializācija

Pirmajā palaišanas reizē galvenais process automātiski ģenerē un saglabā trūkstošos noslēpumus:

| Noslēpums                | Avots                                                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                              |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (atsakās turpināt, ja šifrēti akreditācijas dati jau pastāv) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                              |

Tie tiek saglabāti failā `<DATA_DIR>/server.env`. `DATA_DIR` tiek noteikts šādi:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` vai `~/.omniroute`
- macOS: `~/.omniroute`

## Logs un sistēmas tekne

- `BrowserWindow`: 1400×900 (min. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, loga vadības pogas pozīcijā `{ x: 16, y: 16 }`.
- Windows/Linux: sistēmas virsrakstjosla.
- Aizvēršanas poga minimizē lietotni sistēmas teknē; teknes izvēlnē ir **Atvērt OmniRoute**, **Atvērt informācijas paneli** (ārējā pārlūkprogrammā), apakšizvēlne **Servera ports**, **Pārbaudīt atjauninājumus**, **Iziet**.

## Satura drošības politika

Iestatīta, izmantojot `session.defaultSession.webRequest.onHeadersReceived`. Būtiskākās direktīvas:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Izstrādes režīmā `'unsafe-eval'` tiek pievienots tikai `script-src`

## Automātiskā atjaunināšana

Izmanto `electron-updater` ar GitHub nodrošinātāju (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Notikumi tiek pārsūtīti renderēšanas procesam, izmantojot `update-status` IPC:
  `checking`, `available`, `not-available`, `downloading` (ar `percent`), `downloaded`, `error`
- `installUpdate()` aptur serveri un pēc tam izsauc `autoUpdater.quitAndInstall()`
- Izstrādes režīmā tiek izlaists (`!app.isPackaged`)

## Būvēšanas konveijers

1. `npm run build` → Next.js autonomais būvējums mapē `.next/standalone`.
2. `prepare-electron-standalone.mjs` → atkārtoti sagatavo failus mapē `.next/electron-standalone` un pārraksta absolūtos ceļus failos `server.js` un `required-server-files.json`, lai pakotni varētu pārvietot.
3. `electron-builder` pakotnē iekļauj `main.js`, `preload.js`, `node_modules` un `extraResources: { ../.next/electron-standalone → app }`.

### Būvējuma mērķi

| OS      | Mērķi                                       |
| ------- | ------------------------------------------- |
| Windows | NSIS instalētājs + portatīvā versija (x64)  |
| macOS   | DMG (Intel + arm64, velkot uz Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                |

NSIS iestatījumi: `oneClick: false`, ļauj lietotājam izvēlēties instalēšanas direktoriju, izveido darbvirsmas un izvēlnes Sākt saīsnes.

## Pakotā būvējuma ātrā testēšana

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automātiski atrod pašreizējai platformai paredzēto pakotās lietotnes izpildfailu mapē `electron/dist-electron/`.
- Palaiž lietotni ar izolētiem `HOME`/`APPDATA`/`XDG_*` direktorijiem, lai netiktu mainīti izstrādātāja dati.
- 45 sekunžu laikā periodiski pārbauda `http://127.0.0.1:20128/login`, gaidot HTTP 200 atbildi.
- Uzrauga stderr/stdout, meklējot fatālu kļūdu paraugus (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` u.c.).
- Pēc gatavības konstatēšanas gaida 2 sekundes stabilas darbības, pēc tam nosūta SIGTERM un gaida, līdz ports tiek atbrīvots.
- CI vidē automātiski nodod `--no-sandbox --disable-gpu` (un `--disable-dev-shm-usage` operētājsistēmā Linux).

Vides mainīgo pārrakstīšanas iespējas: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Koda parakstīšana

`electron/package.json` **neiestata** parakstīšanas akreditācijas datus tieši. Nododiet tos `electron-builder`, izmantojot vides mainīgos:

### macOS

```bash
export APPLE_ID=<e-pasts>
export APPLE_APP_SPECIFIC_PASSWORD=<parole>
export APPLE_TEAM_ID=<id>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<sertifikāta-parole>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<sertifikāta-parole>
npm run electron:build:win
```

### Linux

AppImage parakstīšana nav obligāta — ja nepieciešama parakstīšana, iestatiet `LINUX_GPG_KEY`.

## Izplatīšana

Artefakti tiek saglabāti mapē `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Laidieni tiek publicēti GitHub Releases (`diegosouzapw/OmniRoute`), kur `electron-updater` arī pārbauda jaunu versiju pieejamību.

## Problēmu novēršana

| Simptoms                                                                            | Risinājums                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` pēc Electron galvenās versijas atjaunināšanas | better-sqlite3 v13 nodrošina iepriekš kompilētas Node-API versijas — vēlreiz palaidiet `npm install` saknes direktorijā un `prepare:bundle` (tas pārbauda pašreizējai platformai paredzēto iepriekš kompilēto versiju) |
| `ERR_DLOPEN_FAILED` vietējam modulim                                                | Vēlreiz palaidiet `prepare:bundle` — tas nekavējoties beidzas ar kļūdu, ja pašreizējai platformai nav iepriekš kompilētas Node-API versijas                                                                            |
| Linux vidē logs ir tukšs                                                            | Pārliecinieties, ka Next.js serveris faktiski piesaistījās portam PORT (pārbaudiet `[Server]` žurnālus)                                                                                                                |
| macOS notariālā apstiprināšana iestrēgst                                            | Pārliecinieties, ka `APPLE_*` mainīgie ir eksportēti, nevis tikai norādīti `.env` failā                                                                                                                                |
| Windows SmartScreen brīdinājums                                                     | Parakstiet ar EV sertifikātu vai lietotājiem jānoklikšķina ar peles labo pogu → "Tomēr palaist"                                                                                                                        |
| Ātrā pārbaude neizdodas, jo ports tiek izmantots                                    | Pirms `electron:smoke:packaged` palaišanas apturiet jebkuru lokālo izstrādes serveri, kas izmanto portu 20128                                                                                                          |

## Skatiet arī

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Avota faili: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Palīgskripti: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
