# Electron Desktop Guide (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Vir resnice:** delovni prostor `electron/`
> **Nazadnje posodobljeno:** 2026-06-28 — v3.8.40

OmniRoute vključuje večplatformno namizno aplikacijo (Windows / macOS / Linux), zgrajeno z
**Electron 41** + **electron-builder 26.10**. Namizna aplikacija zažene samostojni strežnik
Next.js kot podrejeni proces, nanj usmeri `BrowserWindow` ter doda
sistemsko vrstico, samodejno posodabljanje, most IPC in inicializacijo skrivnosti brez konfiguracije.

## Arhitektura

```
┌─────────────────────────────────────────────────┐
│ Glavni proces Electron (electron/main.js)       │
│ ├─ Zaklep enega primerka                        │
│ ├─ Podrejeni proces: samostojni strežnik Next.js│
│ │   (zagnan z izvajalnim okoljem Node Electron) │
│ ├─ BrowserWindow → http://localhost:PORT        │
│ ├─ Sistemska vrstica + kontekstni meni          │
│ ├─ Samodejno posodabljanje prek electron-updater│
│ ├─ Pravilnik varnosti vsebine (glave seje)      │
│ └─ Inicializacija skrivnosti (JWT / API_KEY_SECRET)│
└─────────────────────────────────────────────────┘
            ↕ Most IPC (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Izrisovalnik (nadzorna plošča Next.js)       │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## Različice

Potrjeno na podlagi `electron/package.json`:

| Paket                | Različica                                                                                |
| -------------------- | ---------------------------------------------------------------------------------------- |
| `electron`           | `^43.4.1`                                                                                |
| `electron-builder`   | `^26.15.3`                                                                               |
| `electron-updater`   | `^6.8.9`                                                                                 |
| `better-sqlite3`     | korenska `^13.0.2` (vnaprej zgrajeni moduli Node-API — brez ponovne gradnje za Electron) |
| Različica aplikacije | `3.8.0`                                                                                  |
| ID aplikacije        | `online.omniroute.desktop`                                                               |
| Ime izdelka          | `OmniRoute`                                                                              |

## Skripti (korenski `package.json`)

| Skript                            | Namen                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Zažene `npm run dev` + počaka na `localhost:20128` + zažene Electron                    |
| `npm run electron:build`          | Zgradi Next.js in nato zažene `electron-builder` za trenutni operacijski sistem         |
| `npm run electron:build:win`      | Zgradi namestitveni program NSIS za Windows + prenosno različico (x64)                  |
| `npm run electron:build:mac`      | Zgradi DMG za macOS (Intel + Apple Silicon)                                             |
| `npm run electron:build:linux`    | Zgradi AppImage + DEB za Linux (x64 + arm64)                                            |
| `npm run electron:smoke:packaged` | Zažene zapakirano izvršljivo datoteko in preveri `/login` za HTTP 200, nato jo zaustavi |

Delovni prostor `electron/` omogoča tudi:

- `npm run prepare:bundle` — zažene `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — gradnje za macOS za posamezno arhitekturo
- `npm run pack` — gradnja samo imenika za lokalno preizkušanje (brez namestitvenega programa)

## Razporeditev imenikov

```
electron/
├── package.json              # Odvisnosti Electron + konfiguracija electron-builder
├── main.js                   # Glavni proces (24 KB — glejte spodnje opombe)
├── preload.js                # Most IPC contextBridge
├── types.d.ts                # Tipi AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Opombe znotraj delovnega prostora
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Izhod electron-builder (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Pripravi paket .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Preizkus smoke po gradnji
```

Tako `main.js` kot `preload.js` sta **datoteki CommonJS `.js`**, ne TypeScript. Definicije
tipov na strani izrisovalnika so v `electron/types.d.ts`.

## Most IPC (`preload.js`)

Prednalaganje izpostavi API z dovoljenega seznama v `window.electronAPI` z uporabo `contextBridge`
ter z `contextIsolation: true` in `nodeIntegration: false`.

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

Izpostavljene metode:

| Klic izrisovalnika                                                | Vrsta                          |
| ----------------------------------------------------------------- | ------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                         |
| `openExternal(url)`                                               | invoke                         |
| `getDataDir()`                                                    | invoke                         |
| `restartServer()`                                                 | invoke                         |
| `getAppVersion()`                                                 | invoke                         |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                         |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                           |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (vrne odstranjevalnik) |

Pomožne funkcije za prejemanje vrnejo **funkcijo za odstranjevanje** namesto uporabe
`removeAllListeners` — to preprečuje kopičenje poslušalcev, ko se komponente React
znova priklopijo.

## Življenjski cikel strežnika

`main.js` neposredno zažene samostojni paket Next.js z izvajalnim okoljem Electron Node,
da prepreči neujemanje ABI izvornih modulov s sistemskim okoljem Node:

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

Poudarki:

- `waitForServer()` preverja URL do 30 s, preden prikaže okno (brez praznega zaslona ob hladnem zagonu).
- `stdio: "pipe"` zajame stdout/stderr; fraze pripravljenosti (`Ready` / `listening`) prek IPC oddajo `server-status: running`.
- `before-quit` čaka do 5 s na urejen SIGTERM (kontrolna točka WAL), nato pošlje SIGKILL.
- Preklopnik vrat v sistemskem pladnju (`20128`, `3000`, `8080`) ustavi in znova zažene strežnik ter nato ponovno naloži BrowserWindow.

## Inicializacija skrivnosti brez konfiguracije

Ob prvem zagonu glavni proces samodejno ustvari in shrani manjkajoče skrivnosti:

| Skrivnost                | Vir                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                 |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (zavrne, če šifrirane poverilnice že obstajajo) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                 |

Shranjeno v `<DATA_DIR>/server.env`. `DATA_DIR` se razreši v:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ali `~/.omniroute`
- macOS: `~/.omniroute`

## Okno in sistemska vrstica

- `BrowserWindow`: 1400×900 (najmanj 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, gumbi okna na `{ x: 16, y: 16 }`.
- Windows/Linux: izvorna naslovna vrstica.
- Gumb za zapiranje pomanjša aplikacijo v sistemsko vrstico; meni sistemske vrstice vsebuje **Odpri OmniRoute**, **Odpri nadzorno ploščo** (zunanji brskalnik), podmeni **Vrata strežnika**, **Preveri posodobitve** in **Končaj**.

## Pravilnik o varnosti vsebine

Nastavljen prek `session.defaultSession.webRequest.onHeadersReceived`. Pomembne direktive:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Razvojni način doda `'unsafe-eval'` samo v `script-src`

## Samodejno posodabljanje

Uporablja `electron-updater` s ponudnikom GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Dogodki so posredovani upodabljalniku prek IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (s podatkom `percent`), `downloaded`, `error`
- `installUpdate()` ustavi strežnik in nato pokliče `autoUpdater.quitAndInstall()`
- Preskočeno v razvojnem načinu (`!app.isPackaged`)

## Graditveni cevovod

1. `npm run build` → samostojna različica Next.js v `.next/standalone`.
2. `prepare-electron-standalone.mjs` → ponovno pripravi datoteke v `.next/electron-standalone` in prepiše absolutne poti znotraj `server.js` + `required-server-files.json`, tako da je paket mogoče prestavljati.
3. `electron-builder` zapakira `main.js`, `preload.js`, `node_modules` in `extraResources: { ../.next/electron-standalone → app }`.

### Cilji graditve

| OS      | Cilji                                                |
| ------- | ---------------------------------------------------- |
| Windows | namestitveni program NSIS + prenosna različica (x64) |
| macOS   | DMG (Intel + arm64, povleci v Applications)          |
| Linux   | AppImage + DEB (x64 + arm64)                         |

Nastavitve NSIS: `oneClick: false`, uporabniku omogoča izbiro namestitvenega imenika ter ustvari bližnjice na namizju in v meniju Start.

## Osnovno preverjanje zapakirane graditve

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Samodejno odkrije zapakirano izvršljivo datoteko v `electron/dist-electron/` za trenutno platformo.
- Zažene jo z izoliranimi imeniki `HOME`/`APPDATA`/`XDG_*`, tako da ne posega v podatke razvijalca.
- Preverja `http://127.0.0.1:20128/login`, dokler v 45 s ne prejme odgovora HTTP 200.
- Spremlja stderr/stdout za usodne vzorce (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` itd.).
- Po pripravljenosti počaka 2 s stabilnega delovanja, nato pošlje SIGTERM in počaka, da se vrata sprostijo.
- V okolju CI samodejno poda `--no-sandbox --disable-gpu` (in `--disable-dev-shm-usage` v Linuxu).

Preglasitve okolja: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Podpisovanje kode

`electron/package.json` **ne** poveže poverilnic za podpisovanje neposredno. Posredujte jih prek spremenljivk okolja orodju `electron-builder`:

### macOS

```bash
export APPLE_ID=<e-pošta>
export APPLE_APP_SPECIFIC_PASSWORD=<geslo>
export APPLE_TEAM_ID=<id>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<geslo-potrdila>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<geslo-potrdila>
npm run electron:build:win
```

### Linux

Podpisovanje datotek AppImage je izbirno — za podpisovanje nastavite `LINUX_GPG_KEY`.

## Distribucija

Artefakti se shranijo v `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Izdaje so objavljene v GitHub Releases (`diegosouzapw/OmniRoute`), kjer tudi `electron-updater` preverja nove različice.

## Odpravljanje težav

| Simptom                                                             | Rešitev                                                                                                                                                                                                   |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` po večji nadgradnji Electrona | better-sqlite3 v13 vključuje vnaprej pripravljene različice Node-API — v korenski mapi znova zaženite `npm install` in `prepare:bundle` (ta preveri vnaprej pripravljeno različico za trenutno platformo) |
| `ERR_DLOPEN_FAILED` za izvorni modul                                | Znova zaženite `prepare:bundle` — ta se takoj prekine z napako, če manjka vnaprej pripravljena različica Node-API za trenutno platformo                                                                   |
| Okno je v Linuxu prazno                                             | Preverite, ali se je strežnik Next.js dejansko povezal z vrati PORT (preverite dnevnike `[Server]`)                                                                                                       |
| Overjanje pri Applu macOS zastane                                   | Prepričajte se, da so spremenljivke `APPLE_*` izvožene in ne samo navedene v `.env`                                                                                                                       |
| Opozorilo Windows SmartScreen                                       | Podpišite s potrdilom EV ali pa naj uporabniki kliknejo z desno tipko → »Run anyway«                                                                                                                      |
| Dimni preizkus ne uspe, ker so vrata v uporabi                      | Pred zagonom `electron:smoke:packaged` ustavite morebiten lokalni razvojni strežnik na vratih 20128                                                                                                       |

## Glejte tudi

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Izvorna koda: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pomožna orodja: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
