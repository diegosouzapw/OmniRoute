# Electron Desktop Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Mjerodavni izvor:** radni prostor `electron/`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute isporučuje višeplatformsku aplikaciju za stolna računala (Windows / macOS / Linux) izrađenu pomoću
**Electron 41** + **electron-builder 26.10**. Aplikacija za stolna računala pokreće samostalni Next.js
poslužitelj kao podređeni proces, usmjerava `BrowserWindow` na njega te dodaje
ikonu u sistemsku traku, automatsko ažuriranje, IPC most i automatsko postavljanje tajni bez konfiguracije.

## Arhitektura

```
┌──────────────────────────────────────────────┐
│ Glavni Electron proces (electron/main.js)    │
│ ├─ Zaključavanje na jednu instancu           │
│ ├─ Podređeni proces: samostalni Next.js      │
│ │   poslužitelj (pokrenut pomoću Electronova │
│ │   Node izvršnog okruženja)                 │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Sistemska traka + kontekstni izbornik     │
│ ├─ Automatsko ažuriranje putem               │
│ │   electron-updater                         │
│ ├─ Pravila sigurnosti sadržaja               │
│ │   (zaglavlja sesije)                       │
│ └─ Postavljanje tajni (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────┘
            ↕ IPC most (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Proces iscrtavanja (Next.js nadzorna ploča)  │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## Verzije

Potvrđeno iz `electron/package.json`:

| Paket              | Verzija                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                                                |
| `electron-builder` | `^26.15.3`                                                                                               |
| `electron-updater` | `^6.8.9`                                                                                                 |
| `better-sqlite3`   | korijenski `^13.0.2` (unaprijed izgrađeni Node-API paketi — nije potrebna ponovna izgradnja za Electron) |
| Verzija aplikacije | `3.8.0`                                                                                                  |
| ID aplikacije      | `online.omniroute.desktop`                                                                               |
| Naziv proizvoda    | `OmniRoute`                                                                                              |

## Skripte (korijenski `package.json`)

| Skripta                           | Namjena                                                                                            |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Pokreće `npm run dev` + čeka `localhost:20128` + pokreće Electron                                  |
| `npm run electron:build`          | Izgrađuje Next.js, a zatim pokreće `electron-builder` za trenutačni OS                             |
| `npm run electron:build:win`      | Izgrađuje Windows NSIS instalacijski program + prijenosnu verziju (x64)                            |
| `npm run electron:build:mac`      | Izgrađuje macOS DMG (Intel + Apple Silicon)                                                        |
| `npm run electron:build:linux`    | Izgrađuje Linux AppImage + DEB (x64 + arm64)                                                       |
| `npm run electron:smoke:packaged` | Pokreće zapakiranu izvršnu datoteku i provjerava vraća li `/login` HTTP 200, a zatim je zaustavlja |

Radni prostor `electron/` također nudi:

- `npm run prepare:bundle` — pokreće `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — macOS izgradnje za pojedinačnu arhitekturu
- `npm run pack` — izgradnja samo direktorija za lokalno testiranje (bez instalacijskog programa)

## Raspored direktorija

```
electron/
├── package.json              # Electron ovisnosti + konfiguracija za electron-builder
├── main.js                   # Glavni proces (24 KB — pogledajte napomene u nastavku)
├── preload.js                # contextBridge IPC most
├── types.d.ts                # Tipovi AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Bilješke unutar radnog prostora
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Izlaz alata electron-builder (ignorira ga git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Priprema paket .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Brzi test nakon izgradnje
```

I `main.js` i `preload.js` su **CommonJS `.js` datoteke**, a ne TypeScript. Definicije
tipova za renderer nalaze se u `electron/types.d.ts`.

## IPC most (`preload.js`)

Preload izlaže API s popisa dopuštenih API-ja na `window.electronAPI` koristeći `contextBridge`
uz `contextIsolation: true` i `nodeIntegration: false`.

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

| Poziv renderera                                                   | Vrsta                                  |
| ----------------------------------------------------------------- | -------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                 |
| `openExternal(url)`                                               | invoke                                 |
| `getDataDir()`                                                    | invoke                                 |
| `restartServer()`                                                 | invoke                                 |
| `getAppVersion()`                                                 | invoke                                 |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                 |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                   |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (vraća funkciju za uklanjanje) |

Pomoćne funkcije za primanje vraćaju **funkciju za uklanjanje** umjesto oslanjanja na
`removeAllListeners` — time se sprječava gomilanje osluškivača kada se React komponente
ponovno montiraju.

## Životni ciklus poslužitelja

`main.js` izravno pokreće samostalni Next.js paket koristeći Electronovo Node
izvršno okruženje kako bi se izbjegla nepodudarnost ABI-ja nativnih modula sa sustavskim Nodeom:

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

- `waitForServer()` provjerava URL do 30 s prije prikazivanja prozora (nema praznog zaslona pri hladnom pokretanju).
- `stdio: "pipe"` hvata stdout/stderr; fraze spremnosti (`Ready` / `listening`) šalju `server-status: running` putem IPC-a.
- `before-quit` čeka do 5 s na uredan SIGTERM (WAL kontrolna točka), a zatim šalje SIGKILL.
- Prebacivač priključka u sistemskoj traci (`20128`, `3000`, `8080`) zaustavlja i ponovno pokreće poslužitelj, a zatim ponovno učitava BrowserWindow.

## Pokretanje tajni bez konfiguracije

Pri prvom pokretanju glavni proces automatski generira i trajno pohranjuje tajne koje nedostaju:

| Tajna                    | Izvor                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                 |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (odbija ako šifrirane vjerodajnice već postoje) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                 |

Pohranjuju se u `<DATA_DIR>/server.env`. `DATA_DIR` se razrješava na:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ili `~/.omniroute`
- macOS: `~/.omniroute`

## Prozor i sistemska traka

- `BrowserWindow`: 1400×900 (najmanje 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, semaforski gumbi na `{ x: 16, y: 16 }`.
- Windows/Linux: izvorna naslovna traka.
- Gumb za zatvaranje minimizira aplikaciju u sistemsku traku; izbornik sistemske trake sadrži **Otvori OmniRoute**, **Otvori nadzornu ploču** (vanjski preglednik), podizbornik **Port poslužitelja**, **Provjeri postoje li ažuriranja**, **Zatvori**.

## Pravila sigurnosti sadržaja

Postavljaju se putem `session.defaultSession.webRequest.onHeadersReceived`. Važne direktive:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Razvojni način dodaje `'unsafe-eval'` samo u `script-src`

## Automatsko ažuriranje

Upotrebljava `electron-updater` s GitHub pružateljem (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Događaji se prosljeđuju procesu za iscrtavanje putem `update-status` IPC-a:
  `checking`, `available`, `not-available`, `downloading` (s `percent`), `downloaded`, `error`
- `installUpdate()` zaustavlja poslužitelj, a zatim poziva `autoUpdater.quitAndInstall()`
- Preskače se u razvojnom načinu (`!app.isPackaged`)

## Proces izgradnje

1. `npm run build` → samostalna Next.js aplikacija u `.next/standalone`.
2. `prepare-electron-standalone.mjs` → ponovno priprema sadržaj u `.next/electron-standalone` i prepisuje apsolutne putanje unutar `server.js` + `required-server-files.json` kako bi se paket mogao premještati.
3. `electron-builder` pakira `main.js`, `preload.js`, `node_modules` i `extraResources: { ../.next/electron-standalone → app }`.

### Ciljevi izgradnje

| OS      | Ciljevi                                               |
| ------- | ----------------------------------------------------- |
| Windows | NSIS instalacijski program + prijenosna verzija (x64) |
| macOS   | DMG (Intel + arm64, povlačenje u Applications)        |
| Linux   | AppImage + DEB (x64 + arm64)                          |

Postavke NSIS-a: `oneClick: false`, omogućuje korisniku odabir instalacijskog direktorija te stvara prečace na radnoj površini i u izborniku Start.

## Brzo testiranje zapakirane verzije

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automatski pronalazi zapakiranu izvršnu datoteku u `electron/dist-electron/` za trenutačnu platformu.
- Pokreće se s izoliranim direktorijima `HOME`/`APPDATA`/`XDG_*` kako ne bi dirao razvojne podatke.
- Periodički provjerava `http://127.0.0.1:20128/login` radi HTTP odgovora 200 unutar 45 s.
- Prati stderr/stdout radi fatalnih uzoraka (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` itd.).
- Nakon spremnosti čeka 2 s stabilnog rada, zatim šalje SIGTERM i čeka oslobađanje porta.
- U CI-ju automatski prosljeđuje `--no-sandbox --disable-gpu` (i `--disable-dev-shm-usage` na Linuxu).

Nadjačavanja putem varijabli okruženja: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Potpisivanje koda

`electron/package.json` **ne** povezuje izravno vjerodajnice za potpisivanje. Proslijedite ih alatu `electron-builder` putem varijabli okruženja:

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

Potpisivanje AppImage datoteke nije obavezno — postavite `LINUX_GPG_KEY` ako želite potpisivanje.

## Distribucija

Artefakti se spremaju u `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Izdanja se objavljuju na GitHub Releases (`diegosouzapw/OmniRoute`), gdje i `electron-updater` provjerava postoje li nove verzije.

## Rješavanje problema

| Simptom                                                                  | Rješenje                                                                                                                                                                                         |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` nakon velike nadogradnje Electrona | better-sqlite3 v13 isporučuje unaprijed izgrađene Node-API pakete — ponovno pokrenite `npm install` u korijenu i `prepare:bundle` (provjerava unaprijed izgrađeni paket za trenutačnu platformu) |
| `ERR_DLOPEN_FAILED` za nativni modul                                     | Ponovno pokrenite `prepare:bundle` — postupak se odmah prekida s pogreškom ako nedostaje unaprijed izgrađeni Node-API paket za trenutačnu platformu                                              |
| Prozor je prazan u Linuxu                                                | Potvrdite da je Next.js poslužitelj doista povezan s varijablom PORT (provjerite zapise `[Server]`)                                                                                              |
| Notarizacija u macOS-u zastaje                                           | Provjerite jesu li varijable `APPLE_*` izvezene, a ne samo navedene u datoteci `.env`                                                                                                            |
| Upozorenje Windows SmartScreena                                          | Potpišite EV certifikatom ili neka korisnici kliknu desnom tipkom miša → "Svejedno pokreni"                                                                                                      |
| Smoke test ne uspijeva jer se priključak već koristi                     | Zaustavite sve lokalne razvojne poslužitelje na priključku 20128 prije pokretanja `electron:smoke:packaged`                                                                                      |

## Pogledajte također

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Izvor: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pomoćne skripte: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
