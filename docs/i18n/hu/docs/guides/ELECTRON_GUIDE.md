# Electron Desktop Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Hiteles forrás:** `electron/` munkaterület
> **Utolsó frissítés:** 2026-06-28 — v3.8.40

Az OmniRoute egy többplatformos asztali alkalmazást (Windows / macOS / Linux) biztosít, amely az
**Electron 41** + **electron-builder 26.10** technológiákra épül. Az asztali alkalmazás gyermekfolyamatként
elindítja az önálló Next.js-kiszolgálót, ráirányít egy `BrowserWindow` ablakot, továbbá
rendszertálca-ikont, automatikus frissítőt, IPC-hidat és konfigurációt nem igénylő titkosérték-inicializálást biztosít.

## Architektúra

```
┌──────────────────────────────────────────────┐
│ Electron főfolyamat (electron/main.js)       │
│ ├─ Egyetlen példányt engedélyező zárolás     │
│ ├─ Gyermekfolyamat: önálló Next.js-kiszolgáló│
│ │   (az Electron Node futtatókörnyezetével)  │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Rendszertálca + helyi menü                │
│ ├─ Automatikus frissítés electron-updaterrel │
│ ├─ Tartalombiztonsági házirend (munkamenet-fejlécek) │
│ └─ Titkosérték-inicializálás (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────┘
            ↕ IPC-híd (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Megjelenítő (Next.js-irányítópult)           │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## Verziók

Az `electron/package.json` alapján megerősítve:

| Csomag              | Verzió                                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| `electron`          | `^43.4.1`                                                                                             |
| `electron-builder`  | `^26.15.3`                                                                                            |
| `electron-updater`  | `^6.8.9`                                                                                              |
| `better-sqlite3`    | gyökérszintű `^13.0.2` (Node-API előre elkészített binárisok — nincs szükség Electron-újrafordításra) |
| Alkalmazásverzió    | `3.8.0`                                                                                               |
| Alkalmazásazonosító | `online.omniroute.desktop`                                                                            |
| Terméknév           | `OmniRoute`                                                                                           |

## Szkriptek (gyökérszintű `package.json`)

| Szkript                           | Rendeltetés                                                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Elindítja az `npm run dev` parancsot, megvárja a `localhost:20128` elérhetőségét, majd elindítja az Electront     |
| `npm run electron:build`          | Összeállítja a Next.js alkalmazást, majd futtatja az `electron-builder` eszközt az aktuális operációs rendszerhez |
| `npm run electron:build:win`      | Elkészíti a Windows NSIS-telepítőt és a hordozható verziót (x64)                                                  |
| `npm run electron:build:mac`      | Elkészíti a macOS DMG-t (Intel + Apple Silicon)                                                                   |
| `npm run electron:build:linux`    | Elkészíti a Linux AppImage- és DEB-csomagokat (x64 + arm64)                                                       |
| `npm run electron:smoke:packaged` | Elindítja a csomagolt bináris fájlt, ellenőrzi, hogy a `/login` HTTP 200 választ ad-e, majd leállítja             |

Az `electron/` munkaterület a következőket is elérhetővé teszi:

- `npm run prepare:bundle` — futtatja a `scripts/build/prepare-electron-standalone.mjs` fájlt
- `npm run build:mac-x64` / `build:mac-arm64` — egyetlen architektúrához készült macOS-build
- `npm run pack` — csak könyvtárat létrehozó build helyi teszteléshez (telepítő nélkül)

## Könyvtárszerkezet

```
electron/
├── package.json              # Electron-függőségek + electron-builder konfiguráció
├── main.js                   # Főfolyamat (24 KB — lásd az alábbi megjegyzéseket)
├── preload.js                # contextBridge IPC-híd
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI típusok
├── README.md                 # Munkaterületen belüli jegyzetek
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder kimenete (a git figyelmen kívül hagyja)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Előkészíti a .next/electron-standalone csomagot
└── dev/
    └── smoke-electron-packaged.mjs       # Build utáni gyors ellenőrző teszt
```

A `main.js` és a `preload.js` egyaránt **CommonJS `.js` fájl**, nem TypeScript. A
megjelenítőoldali típusdefiníciók az `electron/types.d.ts` fájlban találhatók.

## IPC-híd (`preload.js`)

A preload egy engedélyezési listán szereplő API-t tesz elérhetővé a `window.electronAPI` objektumon a `contextBridge`
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

| Megjelenítőből indított hívás                                     | Típus                                    |
| ----------------------------------------------------------------- | ---------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                   |
| `openExternal(url)`                                               | invoke                                   |
| `getDataDir()`                                                    | invoke                                   |
| `restartServer()`                                                 | invoke                                   |
| `getAppVersion()`                                                 | invoke                                   |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                   |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (eltávolító függvényt ad vissza) |

A fogadási segédfüggvények a `removeAllListeners` használata helyett egy **eltávolító függvényt** adnak vissza — ez megakadályozza a figyelők felhalmozódását a React-komponensek
újracsatolásakor.

## A kiszolgáló életciklusa

A `main.js` közvetlenül az Electron Node-futtatókörnyezetével indítja el a Next.js önálló csomagját,
így elkerülhető a natív modulok ABI-eltérése a rendszer Node-verziójához képest:

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

- A `waitForServer()` legfeljebb 30 másodpercig kérdezi le az URL-t az ablak megjelenítése előtt (így hidegindításkor nincs üres képernyő).
- A `stdio: "pipe"` rögzíti a szabványos kimenetet és hibakimenetet; a készenléti kifejezések (`Ready` / `listening`) IPC-n keresztül `server-status: running` eseményt bocsátanak ki.
- A `before-quit` legfeljebb 5 másodpercig vár a szabályos SIGTERM-leállásra (WAL-ellenőrzőpont), majd SIGKILL jelet küld.
- A tálca portváltója (`20128`, `3000`, `8080`) leállítja és újraindítja a kiszolgálót, majd újratölti a BrowserWindow ablakot.

## Nulla konfigurációjú titok-inicializálás

Az első indításkor a főfolyamat automatikusan létrehozza és tartósan tárolja a hiányzó titkokat:

| Titok                    | Forrás                                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                             |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (megtagadja, ha már léteznek titkosított hitelesítő adatok) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                             |

A `<DATA_DIR>/server.env` fájlban tárolódnak. A `DATA_DIR` feloldása:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` vagy `~/.omniroute`
- macOS: `~/.omniroute`

## Ablak és rendszertálca

- `BrowserWindow`: 1400×900 (minimum 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, az ablakvezérlő gombok helye: `{ x: 16, y: 16 }`.
- Windows/Linux: natív címsor.
- A bezárás gomb a rendszertálcára minimalizál; a rendszertálca menüje a következőket tartalmazza: **OmniRoute megnyitása**, **Vezérlőpult megnyitása** (külső böngészőben), **Kiszolgálóport** almenü, **Frissítések keresése**, **Kilépés**.

## Tartalombiztonsági szabályzat

Beállítása a `session.defaultSession.webRequest.onHeadersReceived` segítségével történik. Fontosabb direktívák:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- A fejlesztői mód kizárólag a `script-src` direktívához adja hozzá az `'unsafe-eval'` értéket

## Automatikus frissítés

Az `electron-updater` csomagot használja a GitHub-szolgáltatóval (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Az eseményeket az `update-status` IPC-n keresztül továbbítja a megjelenítőfolyamatnak:
  `checking`, `available`, `not-available`, `downloading` (`percent` értékkel), `downloaded`, `error`
- Az `installUpdate()` leállítja a kiszolgálót, majd meghívja az `autoUpdater.quitAndInstall()` függvényt
- Fejlesztői módban kihagyja (`!app.isPackaged`)

## Buildfolyamat

1. `npm run build` → önálló Next.js-alkalmazás a `.next/standalone` könyvtárban.
2. `prepare-electron-standalone.mjs` → újra előkészíti a `.next/electron-standalone` könyvtárban, és átírja a `server.js` + `required-server-files.json` fájlokban található abszolút elérési utakat, hogy a csomag áthelyezhető legyen.
3. Az `electron-builder` csomagolja a `main.js`, `preload.js`, `node_modules` elemeket, valamint az `extraResources: { ../.next/electron-standalone → app }` erőforrást.

### Buildcélok

| Operációs rendszer | Célok                                                |
| ------------------ | ---------------------------------------------------- |
| Windows            | NSIS-telepítő + hordozható verzió (x64)              |
| macOS              | DMG (Intel + arm64, áthúzás az Applications mappába) |
| Linux              | AppImage + DEB (x64 + arm64)                         |

NSIS-beállítások: `oneClick: false`, lehetővé teszi a felhasználónak a telepítési könyvtár kiválasztását, valamint parancsikonokat hoz létre az Asztalon és a Start menüben.

## A csomagolt build füsttesztelése

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automatikusan megkeresi az aktuális platformhoz tartozó csomagolt bináris fájlt az `electron/dist-electron/` könyvtárban.
- Elkülönített `HOME`/`APPDATA`/`XDG_*` könyvtárakkal indítja el, így nem érinti a fejlesztői adatokat.
- Legfeljebb 45 másodpercig lekérdezi a `http://127.0.0.1:20128/login` címet, HTTP 200-as válaszra várva.
- A stderr/stdout kimenetet végzetes hibamintákra figyeli (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` stb.).
- A készenléti állapot elérése után 2 másodpercnyi stabil futásra vár, majd SIGTERM jelet küld, és megvárja, amíg a port felszabadul.
- CI-környezetben automatikusan átadja a `--no-sandbox --disable-gpu` kapcsolókat (Linuxon a `--disable-dev-shm-usage` kapcsolót is).

Környezeti felülbírálások: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

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

Az elkészült csomagok az `electron/dist-electron/` könyvtárba kerülnek:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

A kiadások a GitHub Releases szolgáltatásban (`diegosouzapw/OmniRoute`) jelennek meg; az `electron-updater` szintén itt keres új verziókat.

## Hibaelhárítás

| Tünet                                                                           | Megoldás                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` az Electron főverziójának frissítése után | A better-sqlite3 v13 előre lefordított Node-API-csomagokat tartalmaz — futtassa újra az `npm install` parancsot a gyökérkönyvtárban, majd a `prepare:bundle` parancsot (ez ellenőrzi az aktuális platformhoz tartozó előre lefordított csomagot) |
| `ERR_DLOPEN_FAILED` natív modul esetén                                          | Futtassa újra a `prepare:bundle` parancsot — ez azonnal hibával leáll, ha hiányzik az aktuális platformhoz tartozó előre lefordított Node-API-csomag                                                                                             |
| Az ablak üresen jelenik meg Linuxon                                             | Ellenőrizze, hogy a Next.js-kiszolgáló valóban kapcsolódott-e a PORT porthoz (ellenőrizze a `[Server]` naplókat)                                                                                                                                 |
| A macOS-közjegyzősítés elakad                                                   | Győződjön meg arról, hogy az `APPLE_*` változók exportálva vannak, nem csak a `.env` fájlban szerepelnek                                                                                                                                         |
| Windows SmartScreen-figyelmeztetés                                              | Írja alá EV-tanúsítvánnyal, vagy a felhasználók kattintsanak a jobb egérgombbal → „Futtatás mindenképpen”                                                                                                                                        |
| A füstteszt foglalt port miatt sikertelen                                       | Az `electron:smoke:packaged` futtatása előtt állítson le minden, a 20128-as portot használó helyi fejlesztői kiszolgálót                                                                                                                         |

## Lásd még

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Forrás: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Segédprogramok: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
