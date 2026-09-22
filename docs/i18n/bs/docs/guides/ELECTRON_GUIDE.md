# Electron Desktop Guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

# Vodič za Electron Desktop

> **Izvor istine:** `electron/` radni prostor
> **Posljednje ažurirano:** 2026-06-28 — v3.8.40

OmniRoute isporučuje desktop aplikaciju za više platformi (Windows / macOS / Linux) izgrađenu na **Electron 41** + **electron-builder 26.10**. Desktop aplikacija pokreće Next.js samostalni server kao podproces, usmjerava `BrowserWindow` na njega i dodaje sistemsku traku, automatsko ažuriranje, IPC most i zero-config bootstrap tajni.

## Arhitektura

```
┌──────────────────────────────────────────────┐
│ Glavni proces Electrona (electron/main.js)   │
│ ├─ Zaključavanje jedne instance              │
│ ├─ Podproces: Next.js samostalni server      │
│ │   (pokrenut sa Electronovim Node runtime-om)│
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Sistemska traka + kontekstni meni         │
│ ├─ Automatsko ažuriranje putem electron-updater-a │
│ ├─ Politika sigurnosti sadržaja (zaglavlja sesije) │
│ └─ Bootstrap tajni (JWT / API_KEY_SECRET)    │
└──────────────────────────────────────────────┘
            ↕ IPC most (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderer (Next.js kontrolna tabla)           │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## Verzije

Potvrđeno iz `electron/package.json`:

| Paket              | Verzija                                                                   |
| ------------------ | ------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                 |
| `electron-builder` | `^26.15.3`                                                                |
| `electron-updater` | `^6.8.9`                                                                  |
| `better-sqlite3`   | root `^13.0.2` (Node-API predizgradnje — bez ponovne izgradnje Electrona) |
| Verzija aplikacije | `3.8.0`                                                                   |
| ID aplikacije      | `online.omniroute.desktop`                                                |
| Naziv proizvoda    | `OmniRoute`                                                               |

## Skripte (root `package.json`)

| Skripta                           | Svrha                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Pokreće `npm run dev` + čeka na `localhost:20128` + pokreće Electron                |
| `npm run electron:build`          | Izgrađuje Next.js, a zatim pokreće `electron-builder` za trenutni OS                |
| `npm run electron:build:win`      | Izgrađuje Windows NSIS instalater + portable (x64)                                  |
| `npm run electron:build:mac`      | Izgrađuje macOS DMG (Intel + Apple Silicon)                                         |
| `npm run electron:build:linux`    | Izgrađuje Linux AppImage + DEB (x64 + arm64)                                        |
| `npm run electron:smoke:packaged` | Pokreće upakovanu binarnu datoteku i provjerava `/login` za HTTP 200, zatim se gasi |

Radni prostor `electron/` također izlaže:

- `npm run prepare:bundle` — pokreće `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — izgradnje za jednu arhitekturu macOS-a
- `npm run pack` — izgradnja samo direktorija za lokalno testiranje (bez instalatera)

## Izgled direktorija

```
electron/
├── package.json              # Electron zavisnosti + electron-builder konfiguracija
├── main.js                   # Glavni proces (24 KB — pogledajte napomene ispod)
├── preload.js                # contextBridge IPC most
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI tipovi
├── README.md                 # Bilješke unutar radnog prostora
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder izlaz (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Priprema .next/electron-standalone paketa
└── dev/
    └── smoke-electron-packaged.mjs       # Smoke test nakon izgradnje
```

I `main.js` i `preload.js` su **CommonJS `.js` datoteke**, a ne TypeScript. Tipovi za renderer stranu se nalaze u `electron/types.d.ts`.

## IPC most (`preload.js`)

Preload izlaže API sa bijele liste na `window.electronAPI` koristeći `contextBridge` sa `contextIsolation: true` i `nodeIntegration: false`.

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

Izložene metode:

| Renderer poziv                                                    | Tip                      |
| ----------------------------------------------------------------- | ------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                   |
| `openExternal(url)`                                               | invoke                   |
| `getDataDir()`                                                    | invoke                   |
| `restartServer()`                                                 | invoke                   |
| `getAppVersion()`                                                 | invoke                   |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                   |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (vraća disposer) |

Pomoćne funkcije za primanje vraćaju **disposer funkciju** umjesto oslanjanja na `removeAllListeners` — ovo sprječava gomilanje slušatelja kada se React komponente ponovo montiraju.

## Životni ciklus servera

`main.js` pokreće Next.js standalone paket direktno sa Electron Node runtime-om kako bi se izbjeglo neusklađivanje ABI-ja izvornih modula sa sistemskim Node-om:

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

Istaknuto:

- `waitForServer()` provjerava URL do 30 s prije prikazivanja prozora (nema praznog ekrana pri hladnom pokretanju).
- `stdio: "pipe"` hvata stdout/stderr; fraze spremnosti (`Ready` / `listening`) emituju `server-status: running` preko IPC-a.
- `before-quit` čeka do 5 s na graciozni SIGTERM (WAL checkpoint) a zatim šalje SIGKILL.
- Prekidač portova u tray-u (`20128`, `3000`, `8080`) zaustavlja i ponovo pokreće server, a zatim ponovo učitava BrowserWindow.

## Bootstrap tajni bez konfiguracije

Pri prvom pokretanju, glavni proces automatski generiše i čuva nedostajuće tajne:

| Tajna                    | Izvor                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                 |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (odbija ako šifrovani kredencijali već postoje) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                 |

Čuva se u `<DATA_DIR>/server.env`. `DATA_DIR` se razrješava na:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ili `~/.omniroute`
- macOS: `~/.omniroute`

## Prozor i Tray

- `BrowserWindow`: 1400×900 (min 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, traffic-light na `{ x: 16, y: 16 }`.
- Windows/Linux: izvorna naslovna traka.
- Dugme za zatvaranje minimizira aplikaciju u tray; meni tray-a sadrži **Open OmniRoute**, **Open Dashboard** (eksterni pretraživač), podmeni **Server Port**, **Check for Updates**, **Quit**.

## Content Security Policy

Postavljeno putem `session.defaultSession.webRequest.onHeadersReceived`. Značajne direktive:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev režim dodaje `'unsafe-eval'` samo u `script-src`

## Automatsko ažuriranje

Koristi `electron-updater` sa GitHub provajderom (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Događaji se prosljeđuju rendereru putem `update-status` IPC-a:
  `checking`, `available`, `not-available`, `downloading` (sa `percent`), `downloaded`, `error`
- `installUpdate()` gasi server, a zatim poziva `autoUpdater.quitAndInstall()`
- Preskočeno u dev režimu (`!app.isPackaged`)

## Build Pipeline

1. `npm run build` → Next.js standalone u `.next/standalone`.
2. `prepare-electron-standalone.mjs` → ponovo postavlja u `.next/electron-standalone` i prepisuje apsolutne putanje unutar `server.js` + `required-server-files.json` tako da bundle bude prenosiv.
3. `electron-builder` pakuje `main.js`, `preload.js`, `node_modules`, i `extraResources: { ../.next/electron-standalone → app }`.

### Build ciljevi

| OS      | Ciljevi                                     |
| ------- | ------------------------------------------- |
| Windows | NSIS installer + portable (x64)             |
| macOS   | DMG (Intel + arm64, prevuci u Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                |

NSIS postavke: `oneClick: false`, omogućava korisniku da izabere direktorijum instalacije, kreira prečice na radnoj površini i u Start meniju.

## Smoke testiranje upakovanog build-a

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automatski pronalazi upakovani binarni fajl u `electron/dist-electron/` za trenutnu platformu.
- Pokreće se sa izolovanim `HOME`/`APPDATA`/`XDG_*` direktorijumima tako da ne dira podatke programera.
- Provjerava `http://127.0.0.1:20128/login` za HTTP 200 u roku od 45 s.
- Prati stderr/stdout za fatalne obrasce (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, itd.).
- Čeka 2 s stabilnog rada nakon spremnosti, zatim izdaje SIGTERM i čeka da se port oslobodi.
- U CI-u, automatski prosljeđuje `--no-sandbox --disable-gpu` (i `--disable-dev-shm-usage` na Linux-u).

Env zamjene: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Potpisivanje koda

`electron/package.json` **ne** povezuje direktno vjerodajnice za potpisivanje. Proslijedite ih putem varijabli okruženja alatu `electron-builder`:

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

Potpisivanje AppImage datoteke je opcionalno — postavite `LINUX_GPG_KEY` ako želite potpisivanje.

## Distribucija

Artefakti se nalaze u `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Izdanja se objavljuju na GitHub Releases (`diegosouzapw/OmniRoute`), gdje `electron-updater` također provjerava nove verzije.

## Rješavanje problema

| Simptom                                                                   | Rješenje                                                                                                                                                                         |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` nakon velikog ažuriranja Electron-a | better-sqlite3 v13 isporučuje Node-API prebuild-ove — ponovo pokrenite `npm install` u korijenskom direktoriju i `prepare:bundle` (to verificira prebuild za trenutnu platformu) |
| `ERR_DLOPEN_FAILED` za nativni modul                                      | Ponovo pokrenite `prepare:bundle` — brzo ne uspijeva kada nedostaje Node-API prebuild za trenutnu platformu                                                                      |
| Prozor se prikazuje prazan na Linux-u                                     | Potvrdite da je Next.js server zapravo vezan za PORT (provjerite `[Server]` logove)                                                                                              |
| macOS notarizacija zastaje                                                | Osigurajte da su `APPLE_*` varijable eksportovane, a ne samo u `.env`                                                                                                            |
| Windows SmartScreen upozorenje                                            | Potpišite sa EV certifikatom, ili korisnici desni klik → "Run anyway"                                                                                                            |
| Smoke test ne uspijeva zbog zauzetog porta                                | Zaustavite bilo koji lokalni razvojni server na 20128 prije pokretanja `electron:smoke:packaged`                                                                                 |

## Vidi također

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Izvor: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pomoćni skriptovi: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
