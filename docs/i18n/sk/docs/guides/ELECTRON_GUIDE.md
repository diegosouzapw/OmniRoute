# Electron Desktop Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Smerodajný zdroj:** pracovný priestor `electron/`
> **Posledná aktualizácia:** 2026-06-28 — v3.8.40

OmniRoute poskytuje multiplatformovú desktopovú aplikáciu (Windows / macOS / Linux) vytvorenú pomocou
**Electron 41** + **electron-builder 26.10**. Desktopová aplikácia spúšťa samostatný server Next.js
ako podradený proces, nasmeruje naň okno `BrowserWindow` a pridáva
systémovú lištu, automatické aktualizácie, most IPC a inicializáciu tajomstiev bez potreby konfigurácie.

## Architektúra

```
┌──────────────────────────────────────────────────┐
│ Hlavný proces Electron (electron/main.js)        │
│ ├─ Zámok jednej inštancie                        │
│ ├─ Podradený proces: samostatný server Next.js   │
│ │   (spustený pomocou runtime Node z Electron)   │
│ ├─ BrowserWindow → http://localhost:PORT         │
│ ├─ Systémová lišta + kontextová ponuka           │
│ ├─ Automatické aktualizácie cez electron-updater │
│ ├─ Content Security Policy (hlavičky relácie)    │
│ └─ Inicializácia tajomstiev (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────────┘
            ↕ Most IPC (electron/preload.js)
┌──────────────────────────────────────────────────┐
│ Renderer (ovládací panel Next.js)                │
│   window.electronAPI.* (contextIsolation)        │
└──────────────────────────────────────────────────┘
```

## Verzie

Potvrdené podľa `electron/package.json`:

| Balík              | Verzia                                                                           |
| ------------------ | -------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                        |
| `electron-builder` | `^26.15.3`                                                                       |
| `electron-updater` | `^6.8.9`                                                                         |
| `better-sqlite3`   | koreňový `^13.0.2` (predkompilované Node-API — bez prekompilovania pre Electron) |
| Verzia aplikácie   | `3.8.0`                                                                          |
| ID aplikácie       | `online.omniroute.desktop`                                                       |
| Názov produktu     | `OmniRoute`                                                                      |

## Skripty (koreňový `package.json`)

| Skript                            | Účel                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Spustí `npm run dev`, počká na `localhost:20128` a spustí Electron                   |
| `npm run electron:build`          | Zostaví Next.js a následne spustí `electron-builder` pre aktuálny OS                 |
| `npm run electron:build:win`      | Zostaví inštalátor NSIS pre Windows + prenosnú verziu (x64)                          |
| `npm run electron:build:mac`      | Zostaví DMG pre macOS (Intel + Apple Silicon)                                        |
| `npm run electron:build:linux`    | Zostaví AppImage + DEB pre Linux (x64 + arm64)                                       |
| `npm run electron:smoke:packaged` | Spustí zabalený binárny súbor, overí odpoveď HTTP 200 pre `/login` a potom ho ukončí |

Pracovný priestor `electron/` poskytuje aj:

- `npm run prepare:bundle` — spustí `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — zostavenia pre macOS s jedinou architektúrou
- `npm run pack` — zostavenie iba do adresára na lokálne testovanie (bez inštalátora)

## Rozloženie adresárov

```
electron/
├── package.json              # Závislosti Electronu + konfigurácia electron-builder
├── main.js                   # Hlavný proces (24 KB — pozri poznámky nižšie)
├── preload.js                # Most IPC cez contextBridge
├── types.d.ts                # Typy AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Poznámky v rámci pracovného priestoru
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Výstup electron-builder (ignorovaný systémom git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Pripraví balík .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Overovací test po zostavení
```

Súbory `main.js` aj `preload.js` sú **súbory CommonJS `.js`**, nie TypeScript. Typové
definície pre renderer sa nachádzajú v `electron/types.d.ts`.

## Most IPC (`preload.js`)

Preload sprístupňuje povolené API v `window.electronAPI` pomocou `contextBridge`
s nastaveniami `contextIsolation: true` a `nodeIntegration: false`.

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

Sprístupnené metódy:

| Volanie z renderera                                               | Typ                       |
| ----------------------------------------------------------------- | ------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                    |
| `openExternal(url)`                                               | invoke                    |
| `getDataDir()`                                                    | invoke                    |
| `restartServer()`                                                 | invoke                    |
| `getAppVersion()`                                                 | invoke                    |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                    |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                      |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (vracia disposer) |

Pomocné funkcie na prijímanie vracajú **funkciu disposer** namiesto toho, aby sa
spoliehali na `removeAllListeners` — tým sa zabraňuje hromadeniu poslucháčov pri
opakovanom pripájaní komponentov Reactu.

## Životný cyklus servera

`main.js` spúšťa samostatný balík Next.js priamo pomocou runtime prostredia Node
v Electrone, aby sa predišlo nezhode ABI natívnych modulov so systémovým Node:

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

Hlavné body:

- `waitForServer()` kontroluje URL až 30 s pred zobrazením okna (pri studenom štarte sa nezobrazí prázdna obrazovka).
- `stdio: "pipe"` zachytáva stdout/stderr; frázy signalizujúce pripravenosť (`Ready` / `listening`) odošlú cez IPC udalosť `server-status: running`.
- `before-quit` čaká až 5 s na korektné ukončenie pomocou SIGTERM (kontrolný bod WAL) a potom odošle SIGKILL.
- Prepínač portov v systémovej lište (`20128`, `3000`, `8080`) zastaví a reštartuje server a následne znova načíta BrowserWindow.

## Inicializácia tajných kľúčov bez konfigurácie

Pri prvom spustení hlavný proces automaticky vygeneruje a uloží chýbajúce tajné kľúče:

| Tajný kľúč               | Zdroj                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                     |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (odmietne pokračovať, ak už existujú šifrované prihlasovacie údaje) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                     |

Ukladajú sa do `<DATA_DIR>/server.env`. `DATA_DIR` sa určuje nasledovne:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` alebo `~/.omniroute`
- macOS: `~/.omniroute`

## Okno a systémová lišta

- `BrowserWindow`: 1400×900 (min. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, ovládacie prvky okna na pozícii `{ x: 16, y: 16 }`.
- Windows/Linux: natívny záhlavný panel.
- Tlačidlo zatvorenia minimalizuje aplikáciu do systémovej lišty; ponuka systémovej lišty obsahuje položky **Otvoriť OmniRoute**, **Otvoriť informačný panel** (v externom prehliadači), podponuku **Port servera**, **Skontrolovať aktualizácie**, **Ukončiť**.

## Zásady zabezpečenia obsahu

Nastavujú sa prostredníctvom `session.defaultSession.webRequest.onHeadersReceived`. Významné direktívy:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Režim vývoja pridáva `'unsafe-eval'` iba do `script-src`

## Automatické aktualizácie

Používa `electron-updater` s poskytovateľom GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Udalosti sa odovzdávajú vykresľovaciemu procesu prostredníctvom IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (s hodnotou `percent`), `downloaded`, `error`
- `installUpdate()` ukončí server a potom zavolá `autoUpdater.quitAndInstall()`
- V režime vývoja sa preskočí (`!app.isPackaged`)

## Proces zostavenia

1. `npm run build` → samostatné zostavenie Next.js v `.next/standalone`.
2. `prepare-electron-standalone.mjs` → opätovne pripraví súbory v `.next/electron-standalone` a prepíše absolútne cesty v súboroch `server.js` a `required-server-files.json`, aby bolo možné balík premiestňovať.
3. `electron-builder` zabalí `main.js`, `preload.js`, `node_modules` a `extraResources: { ../.next/electron-standalone → app }`.

### Cieľové formáty zostavenia

| OS      | Cieľové formáty                                 |
| ------- | ----------------------------------------------- |
| Windows | Inštalátor NSIS + prenosná verzia (x64)         |
| macOS   | DMG (Intel + arm64, presunutie do Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                    |

Nastavenia NSIS: `oneClick: false`, umožňuje používateľovi vybrať inštalačný adresár a vytvára odkazy na pracovnej ploche a v ponuke Štart.

## Základné testovanie zabaleného zostavenia

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automaticky vyhľadá zabalený binárny súbor v `electron/dist-electron/` pre aktuálnu platformu.
- Spustí ho s izolovanými adresármi `HOME`/`APPDATA`/`XDG_*`, aby sa nedotkol údajov vývojára.
- Opakovane kontroluje `http://127.0.0.1:20128/login`, či do 45 s vráti stav HTTP 200.
- Sleduje stderr/stdout a vyhľadáva závažné vzory (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` atď.).
- Po dosiahnutí pripravenosti čaká 2 s stabilnej prevádzky, potom odošle SIGTERM a čaká na uvoľnenie portu.
- V CI automaticky odovzdá `--no-sandbox --disable-gpu` (a v systéme Linux aj `--disable-dev-shm-usage`).

Prepísanie pomocou premenných prostredia: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Podpisovanie kódu

Súbor `electron/package.json` **neprepája** podpisovacie poverenia priamo. Odovzdajte ich nástroju `electron-builder` prostredníctvom premenných prostredia:

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

Podpisovanie AppImage je voliteľné — ak chcete podpisovať, nastavte `LINUX_GPG_KEY`.

## Distribúcia

Artefakty sa ukladajú do `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Vydania sa zverejňujú v GitHub Releases (`diegosouzapw/OmniRoute`), kde `electron-updater` zároveň kontroluje dostupnosť nových verzií.

## Riešenie problémov

| Príznak                                                                      | Riešenie                                                                                                                                                                                          |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` po prechode na hlavnú verziu Electronu | better-sqlite3 v13 poskytuje predkompilované zostavenia Node-API — znova spustite `npm install` v koreňovom adresári a `prepare:bundle` (overí predkompilované zostavenie pre aktuálnu platformu) |
| `ERR_DLOPEN_FAILED` pre natívny modul                                        | Znova spustite `prepare:bundle` — ak chýba predkompilované zostavenie Node-API pre aktuálnu platformu, okamžite skončí s chybou                                                                   |
| V systéme Linux sa zobrazí prázdne okno                                      | Overte, či sa server Next.js skutočne naviazal na PORT (skontrolujte protokoly `[Server]`)                                                                                                        |
| Notarizácia v systéme macOS sa zasekne                                       | Uistite sa, že premenné `APPLE_*` sú exportované, nielen uvedené v `.env`                                                                                                                         |
| Upozornenie Windows SmartScreen                                              | Podpíšte aplikáciu certifikátom EV alebo používatelia môžu kliknúť pravým tlačidlom myši → „Napriek tomu spustiť“                                                                                 |
| Rýchly test zlyhá z dôvodu používaného portu                                 | Pred spustením `electron:smoke:packaged` zastavte všetky lokálne vývojové servery používajúce port 20128                                                                                          |

## Pozrite tiež

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Zdrojové súbory: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pomocné skripty: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
