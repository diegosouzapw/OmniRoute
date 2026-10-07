# Electron Desktop Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Hiteles forrás:** `electron/` munkaterület
> **Utolsó frissítés:** 2026-06-28 — v3.8.40

Az OmniRoute egy több platformon (Windows / macOS / Linux) használható asztali alkalmazást biztosít, amely az
**Electron 41** + **electron-builder 26.10** technológiákra épül. Az asztali alkalmazás gyermekfolyamatként
elindítja a Next.js önálló kiszolgálóját, egy `BrowserWindow` ablakot irányít rá, továbbá
rendszertálcát, automatikus frissítőt, IPC-hidat és konfiguráció nélküli titok-inicializálást biztosít.

## Architektúra

```
┌──────────────────────────────────────────────┐
│ Electron főfolyamat (electron/main.js)       │
│ ├─ Egyetlen példányt biztosító zárolás       │
│ ├─ Gyermekfolyamat: önálló Next.js-kiszolgáló│
│ │   (az Electron Node futtatókörnyezetével)  │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Rendszertálca + helyi menü                │
│ ├─ Automatikus frissítés electron-updaterrel │
│ ├─ Tartalombiztonsági házirend (munkamenet-  │
│ │  fejlécek)                                 │
│ └─ Titok-inicializálás (JWT / API_KEY_SECRET)│
└──────────────────────────────────────────────┘
            ↕ IPC-híd (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderelő (Next.js irányítópult)             │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## Verziók

Az `electron/package.json` alapján megerősítve:

| Csomag              | Verzió                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------- |
| `electron`          | `^43.4.1`                                                                                                     |
| `electron-builder`  | `^26.15.3`                                                                                                    |
| `electron-updater`  | `^6.8.9`                                                                                                      |
| `better-sqlite3`    | gyökérszintű `^13.0.2` (Node-API előre lefordított binárisok — nincs szükség Electronhoz való újrafordításra) |
| Alkalmazásverzió    | `3.8.0`                                                                                                       |
| Alkalmazásazonosító | `online.omniroute.desktop`                                                                                    |
| Terméknév           | `OmniRoute`                                                                                                   |

## Szkriptek (gyökérszintű `package.json`)

| Szkript                           | Rendeltetés                                                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Elindítja az `npm run dev` parancsot, megvárja a `localhost:20128` elérhetőségét, majd elindítja az Electront     |
| `npm run electron:build`          | Összeállítja a Next.js alkalmazást, majd futtatja az `electron-builder` eszközt az aktuális operációs rendszerhez |
| `npm run electron:build:win`      | Elkészíti a Windows NSIS-telepítőt és a hordozható változatot (x64)                                               |
| `npm run electron:build:mac`      | Elkészíti a macOS DMG-t (Intel + Apple Silicon)                                                                   |
| `npm run electron:build:linux`    | Elkészíti a Linux AppImage- és DEB-csomagokat (x64 + arm64)                                                       |
| `npm run electron:smoke:packaged` | Elindítja a csomagolt bináris fájlt, ellenőrzi, hogy a `/login` HTTP 200 választ ad-e, majd leállítja             |

Az `electron/` munkaterület a következőket is biztosítja:

- `npm run prepare:bundle` — futtatja a `scripts/build/prepare-electron-standalone.mjs` fájlt
- `npm run build:mac-x64` / `build:mac-arm64` — egyetlen architektúrához készült macOS-build
- `npm run pack` — csak könyvtárat létrehozó build helyi teszteléshez (telepítő nélkül)

## Könyvtárstruktúra

```
electron/
├── package.json              # Electron-függőségek + electron-builder konfiguráció
├── main.js                   # Főfolyamat (24 KB — lásd az alábbi megjegyzéseket)
├── preload.js                # contextBridge IPC-híd
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI típusok
├── README.md                 # Munkaterületen belüli jegyzetek
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder kimenete (git által figyelmen kívül hagyva)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Előkészíti a .next/electron-standalone csomagot
└── dev/
    └── smoke-electron-packaged.mjs       # Build utáni gyors ellenőrző teszt
```

A `main.js` és a `preload.js` egyaránt **CommonJS `.js` fájl**, nem TypeScript. A
rendereroldali típusdefiníciók az `electron/types.d.ts` fájlban találhatók.

## IPC-híd (`preload.js`)

A preload a `window.electronAPI` objektumon keresztül tesz elérhetővé egy engedélyezési listán szereplő API-t a `contextBridge`
használatával, `contextIsolation: true` és `nodeIntegration: false` beállítások mellett.

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

Elérhetővé tett metódusok:

| Rendererhívás                                                     | Típus                                    |
| ----------------------------------------------------------------- | ---------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                   |
| `openExternal(url)`                                               | invoke                                   |
| `getDataDir()`                                                    | invoke                                   |
| `restartServer()`                                                 | invoke                                   |
| `getAppVersion()`                                                 | invoke                                   |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                   |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (eltávolító függvényt ad vissza) |

A receive segédfüggvények egy **eltávolító függvényt** adnak vissza ahelyett, hogy a
`removeAllListeners` metódusra támaszkodnának — ez megakadályozza a figyelők felhalmozódását, amikor a React-komponensek
újracsatolódnak.

## A szerver életciklusa

A `main.js` közvetlenül az Electron Node-futtatókörnyezetével indítja el a Next.js önálló csomagját,
hogy elkerülje a natív modulok és a rendszer Node-verziója közötti ABI-eltérést:

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

Főbb jellemzők:

- A `waitForServer()` legfeljebb 30 másodpercig lekérdezi az URL-t az ablak megjelenítése előtt (így hidegindításkor nem jelenik meg üres képernyő).
- A `stdio: "pipe"` rögzíti az stdout/stderr kimenetet; a készenléti kifejezések (`Ready` / `listening`) IPC-n keresztül `server-status: running` eseményt bocsátanak ki.
- A `before-quit` legfeljebb 5 másodpercet vár a szabályos SIGTERM-leállításra (WAL-ellenőrzőpont), majd SIGKILL jelet küld.
- A tálcán található portváltó (`20128`, `3000`, `8080`) leállítja és újraindítja a szervert, majd újratölti a BrowserWindow ablakot.

## Nulla konfigurációt igénylő titok-inicializálás

Az első indításkor a főfolyamat automatikusan előállítja és tartósan tárolja a hiányzó titkokat:

| Titok                    | Forrás                                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                         |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (megtagadja a műveletet, ha már léteznek titkosított hitelesítő adatok) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                         |

Tárolási helyük: `<DATA_DIR>/server.env`. A `DATA_DIR` feloldása:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` vagy `~/.omniroute`
- macOS: `~/.omniroute`

## Környezeti fájl keresése

A kiszolgáló elindítása előtt a főfolyamat (a `getPreferredEnvFilePath()` függvény az
`electron/main.js` fájlban) **egy** `.env` fájlt választ ki: az alábbiak közül az első létezőt.

1. `$DATA_DIR/.env`, ha a `DATA_DIR` be van állítva abban a környezetben, amelyből az alkalmazást elindították.
2. `<resolved DATA_DIR>/.env`, a fentiekkel azonos alapértelmezésekkel: `%APPDATA%\omniroute\.env`
   Windows rendszeren, `$XDG_CONFIG_HOME/omniroute/.env` vagy `~/.omniroute/.env` Linux és macOS rendszeren.
3. A folyamat munkakönyvtárában található `.env`.

A főfolyamat csak ezt a fájlt olvassa be; a későbbi jelöltek tartalma nem lesz összevonva. Ezután a
kiszolgáló környezete a következő prioritási sorrendben épül fel (a legmagasabbal kezdve):

1. Az Electron-folyamat környezete (az alkalmazást elindító környezettől örökölt változók).
2. A kiválasztott `.env` fájl.
3. `<DATA_DIR>/server.env` (a fent ismertetett inicializálási titkok).

A folyamat környezetét az alkalmazás indulásakor rögzíti a rendszer, ezért az alkalmazás futása
közben beállított rendszer- vagy felhasználói környezeti változó (beleértve azt az időszakot is,
amikor az ablak bezárása után az alkalmazás a tálcán marad) nem jut el a kiszolgálóhoz mindaddig,
amíg az alkalmazást teljesen ki nem léptetik, majd újra nem indítják. Az olyan futásidejű
beállításokhoz, mint a `CONTEXT_LENGTH_<PROVIDER>` (lásd:
[Környezeti változók: szolgáltatónkénti kontextushossz](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
részesítse előnyben a `.env` fájlt, majd teljesen lépjen ki (tálca, **Kilépés**), és indítsa újra az alkalmazást.

## Ablak és tálca

- `BrowserWindow`: 1400×900 (minimum 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, ablakvezérlő gombok helye: `{ x: 16, y: 16 }`.
- Windows/Linux: natív címsor.
- A bezárás gomb a tálcára minimalizál; a tálcamenü elemei: **OmniRoute megnyitása**, **Irányítópult megnyitása** (külső böngészőben), **Kiszolgáló portja** almenü, **Frissítések keresése**, **Kilépés**.

## Tartalombiztonsági házirend

Beállítása a `session.defaultSession.webRequest.onHeadersReceived` használatával történik. Fontosabb direktívák:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- A fejlesztői mód csak a `script-src` direktívához adja hozzá az `'unsafe-eval'` értéket

## Automatikus frissítés

Az `electron-updater` csomagot használja a GitHub-szolgáltatóval (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- A renderelőnek az `update-status` IPC-n keresztül továbbított események:
  `checking`, `available`, `not-available`, `downloading` (`percent` értékkel), `downloaded`, `error`
- Az `installUpdate()` leállítja a kiszolgálót, majd meghívja az `autoUpdater.quitAndInstall()` függvényt
- Fejlesztői módban kihagyva (`!app.isPackaged`)

## Buildelési folyamat

1. `npm run build` → önálló Next.js-alkalmazás a `.next/standalone` könyvtárban.
2. `prepare-electron-standalone.mjs` → újra előkészíti a fájlokat a `.next/electron-standalone` könyvtárban, és átírja az abszolút elérési utakat a `server.js` + `required-server-files.json` fájlokban, hogy a csomag áthelyezhető legyen.
3. Az `electron-builder` csomagolja a `main.js`, `preload.js`, `node_modules` elemeket, valamint az `extraResources: { ../.next/electron-standalone → app }` erőforrásokat.

### Buildelési célplatformok

| Operációs rendszer | Célok                                              |
| ------------------ | -------------------------------------------------- |
| Windows            | NSIS-telepítő + hordozható verzió (x64)            |
| macOS              | DMG (Intel + arm64, az Applications mappába húzva) |
| Linux              | AppImage + DEB (x64 + arm64)                       |

NSIS-beállítások: `oneClick: false`; lehetővé teszi a felhasználónak a telepítési könyvtár kiválasztását, valamint parancsikonokat hoz létre az Asztalon és a Start menüben.

## A csomagolt build gyors ellenőrzése

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automatikusan megkeresi az aktuális platformhoz tartozó csomagolt bináris fájlt az `electron/dist-electron/` könyvtárban.
- Elkülönített `HOME`/`APPDATA`/`XDG_*` könyvtárakkal indítja el, így nem érinti a fejlesztői adatokat.
- Legfeljebb 45 másodpercig lekérdezi a `http://127.0.0.1:20128/login` címet, amíg HTTP 200 választ nem kap.
- Figyeli a stderr/stdout kimenetet a végzetes hibákra utaló minták (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` stb.) után kutatva.
- A készenléti állapot elérése után 2 másodperc stabil futásra vár, majd SIGTERM jelet küld, és megvárja, amíg a port felszabadul.
- CI-környezetben automatikusan átadja a `--no-sandbox --disable-gpu` kapcsolókat (Linuxon pedig a `--disable-dev-shm-usage` kapcsolót is).

Környezeti változókkal felülírható értékek: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kódaláírás

Az `electron/package.json` **nem** tartalmazza közvetlenül az aláírási hitelesítő adatokat. Környezeti változókon keresztül adja át őket az `electron-builder` számára:

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

Az AppImage aláírása opcionális — aláíráshoz állítsa be a `LINUX_GPG_KEY` változót.

## Terjesztés

Az elkészült fájlok az `electron/dist-electron/` könyvtárba kerülnek:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

A kiadások a GitHub Releases szolgáltatásban (`diegosouzapw/OmniRoute`) jelennek meg; az `electron-updater` szintén itt ellenőrzi az új verziókat.

## Hibaelhárítás

| Jelenség                                                                     | Megoldás                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` az Electron főverziójának emelése után | A better-sqlite3 v13 Node-API előre lefordított binárisokat tartalmaz — futtassa újra az `npm install` parancsot a gyökérkönyvtárban, majd a `prepare:bundle` parancsot (ez ellenőrzi az aktuális platformhoz tartozó előre lefordított binárist) |
| `ERR_DLOPEN_FAILED` natív modul esetén                                       | Futtassa újra a `prepare:bundle` parancsot — azonnal hibát jelez, ha hiányzik az aktuális platformhoz tartozó Node-API előre lefordított bináris                                                                                                  |
| Linuxon üresen jelenik meg az ablak                                          | Ellenőrizze, hogy a Next.js-kiszolgáló ténylegesen kapcsolódott-e a PORT értékéhez (ellenőrizze a `[Server]` naplókat)                                                                                                                            |
| A macOS-közjegyzői hitelesítés elakad                                        | Győződjön meg róla, hogy az `APPLE_*` változókat exportálta, és nem csak a `.env` fájlban szerepelnek                                                                                                                                             |
| Windows SmartScreen-figyelmeztetés                                           | Írja alá EV-tanúsítvánnyal, vagy a felhasználók kattintsanak a jobb egérgombbal → „Futtatás mindenképpen”                                                                                                                                         |
| A gyors ellenőrzés foglalt port miatt meghiúsul                              | Az `electron:smoke:packaged` futtatása előtt állítsa le a 20128-as portot használó helyi fejlesztői kiszolgálót                                                                                                                                   |

## Lásd még

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Forrás: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Segédprogramok: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
