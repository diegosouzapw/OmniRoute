# Electron Desktop Guide (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Izvor istine:** radni prostor `electron/`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute isporučuje višeplatformsku desktop aplikaciju (Windows / macOS / Linux) izgrađenu na
**Electron 41** + **electron-builder 26.10**. Desktop aplikacija pokreće samostalni Next.js
server kao podređeni proces, usmjerava `BrowserWindow` na njega te dodaje
sistemsku traku, automatsko ažuriranje, IPC most i pokretanje tajni bez konfiguracije.

## Arhitektura

```
┌──────────────────────────────────────────────┐
│ Glavni Electron proces (electron/main.js)    │
│ ├─ Zaključavanje jedne instance              │
│ ├─ Podređeni proces: samostalni Next.js server│
│ │   (pokrenut pomoću Electronovog Node okruženja)│
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Sistemska traka + kontekstni meni         │
│ ├─ Automatsko ažuriranje putem electron-updater│
│ ├─ Politika sigurnosti sadržaja (zaglavlja sesije)│
│ └─ Pokretanje tajni (JWT / API_KEY_SECRET)   │
└──────────────────────────────────────────────┘
            ↕ IPC most (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Prikazivač (Next.js kontrolna ploča)         │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## Verzije

Potvrđeno iz `electron/package.json`:

| Paket              | Verzija                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                                   |
| `electron-builder` | `^26.15.3`                                                                                  |
| `electron-updater` | `^6.8.9`                                                                                    |
| `better-sqlite3`   | korijenski `^13.0.2` (Node-API unaprijed izgrađeni paketi — bez ponovne Electron izgradnje) |
| Verzija aplikacije | `3.8.0`                                                                                     |
| ID aplikacije      | `online.omniroute.desktop`                                                                  |
| Naziv proizvoda    | `OmniRoute`                                                                                 |

## Skripte (korijenski `package.json`)

| Skripta                           | Namjena                                                                                      |
| --------------------------------- | -------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Pokreće `npm run dev` + čeka `localhost:20128` + pokreće Electron                            |
| `npm run electron:build`          | Izgrađuje Next.js, a zatim pokreće `electron-builder` za trenutni OS                         |
| `npm run electron:build:win`      | Izgrađuje Windows NSIS instalacijski program + prenosivu verziju (x64)                       |
| `npm run electron:build:mac`      | Izgrađuje macOS DMG (Intel + Apple Silicon)                                                  |
| `npm run electron:build:linux`    | Izgrađuje Linux AppImage + DEB (x64 + arm64)                                                 |
| `npm run electron:smoke:packaged` | Pokreće zapakovanu binarnu datoteku i provjerava `/login` za HTTP 200, a zatim je zaustavlja |

Radni prostor `electron/` također omogućava:

- `npm run prepare:bundle` — pokreće `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — macOS izgradnje za pojedinačnu arhitekturu
- `npm run pack` — izgradnja samo direktorija za lokalno testiranje (bez instalacijskog programa)

## Raspored direktorija

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
│   └── prepare-electron-standalone.mjs   # Priprema .next/electron-standalone paket
└── dev/
    └── smoke-electron-packaged.mjs       # Smoke test nakon izgradnje
```

I `main.js` i `preload.js` su **CommonJS `.js` datoteke**, a ne TypeScript. Tipovi
na strani renderera nalaze se u `electron/types.d.ts`.

## IPC most (`preload.js`)

Preload izlaže API s dozvoljene liste na `window.electronAPI` koristeći `contextBridge`
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

| Poziv renderera                                                   | Tip                      |
| ----------------------------------------------------------------- | ------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                   |
| `openExternal(url)`                                               | invoke                   |
| `getDataDir()`                                                    | invoke                   |
| `restartServer()`                                                 | invoke                   |
| `getAppVersion()`                                                 | invoke                   |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                   |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (vraća disposer) |

Pomoćne funkcije za primanje vraćaju **disposer funkciju** umjesto oslanjanja na
`removeAllListeners` — time se sprečava nagomilavanje osluškivača kada se React komponente
ponovo montiraju.

## Životni ciklus servera

`main.js` direktno pokreće samostalni Next.js paket pomoću Electron Node
izvršnog okruženja kako bi se izbjegla neusklađenost ABI-ja nativnih modula sa sistemskim Nodeom:

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

Najvažnije:

- `waitForServer()` provjerava URL do 30 s prije prikazivanja prozora (nema praznog ekrana pri hladnom pokretanju).
- `stdio: "pipe"` hvata stdout/stderr; fraze spremnosti (`Ready` / `listening`) emituju `server-status: running` putem IPC-a.
- `before-quit` čeka do 5 s na uredni SIGTERM (WAL kontrolna tačka), a zatim šalje SIGKILL.
- Prebacivač porta u sistemskoj traci (`20128`, `3000`, `8080`) zaustavlja i ponovo pokreće server, a zatim ponovo učitava BrowserWindow.

## Automatsko inicijalno postavljanje tajni bez konfiguracije

Pri prvom pokretanju glavni proces automatski generiše i trajno pohranjuje tajne koje nedostaju:

| Tajna                    | Izvor                                                                                        |
| ------------------------ | -------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                     |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (odbija ako šifrirani pristupni podaci već postoje) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                     |

Pohranjuju se u `<DATA_DIR>/server.env`. `DATA_DIR` se određuje kao:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ili `~/.omniroute`
- macOS: `~/.omniroute`

## Pronalaženje datoteke okruženja

Prije pokretanja servera, glavni proces (`getPreferredEnvFilePath()` u
`electron/main.js`) bira **jednu** `.env` datoteku: prvu od sljedećih koja postoji.

1. `$DATA_DIR/.env`, kada je `DATA_DIR` postavljen u okruženju iz kojeg je aplikacija pokrenuta.
2. `<resolved DATA_DIR>/.env`, koristeći iste zadane vrijednosti kao iznad: `%APPDATA%\omniroute\.env` na
   Windowsu, `$XDG_CONFIG_HOME/omniroute/.env` ili `~/.omniroute/.env` na Linuxu i macOS-u.
3. `.env` u radnom direktoriju procesa.

Glavni proces čita samo tu datoteku; kasniji kandidati se ne objedinjuju. Okruženje servera
zatim se gradi prema sljedećem redoslijedu prioriteta (od najvišeg):

1. Okruženje Electron procesa (varijable naslijeđene od onoga što je pokrenulo aplikaciju).
2. Odabrana `.env` datoteka.
3. `<DATA_DIR>/server.env` (prethodno navedene inicijalne tajne).

Okruženje procesa se bilježi pri pokretanju aplikacije, tako da sistemska ili korisnička varijabla
okruženja postavljena dok je aplikacija pokrenuta (uključujući vrijeme dok se nalazi u sistemskoj traci nakon
zatvaranja prozora) neće dospjeti do servera sve dok se aplikacija potpuno ne zatvori i ponovo pokrene. Za postavke
izvršavanja kao što je `CONTEXT_LENGTH_<PROVIDER>` (pogledajte
[Varijable okruženja: Dužina konteksta po pružaocu](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
koristite `.env` datoteku, a zatim potpuno zatvorite aplikaciju (sistemska traka, **Zatvori**) i ponovo je pokrenite.

## Prozor i sistemska traka

- `BrowserWindow`: 1400×900 (minimalno 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, dugmad prozora na `{ x: 16, y: 16 }`.
- Windows/Linux: izvorna naslovna traka.
- Dugme za zatvaranje minimizira aplikaciju u sistemsku traku; meni sistemske trake sadrži **Otvori OmniRoute**, **Otvori kontrolnu ploču** (vanjski preglednik), podmeni **Port servera**, **Provjeri ima li ažuriranja**, **Zatvori**.

## Politika sigurnosti sadržaja

Postavlja se putem `session.defaultSession.webRequest.onHeadersReceived`. Značajne direktive:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Razvojni način rada dodaje `'unsafe-eval'` samo u `script-src`

## Automatsko ažuriranje

Koristi `electron-updater` s GitHub pružaocem (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Događaji se prosljeđuju prikazivaču putem `update-status` IPC-a:
  `checking`, `available`, `not-available`, `downloading` (s `percent`), `downloaded`, `error`
- `installUpdate()` zaustavlja server, a zatim poziva `autoUpdater.quitAndInstall()`
- Preskače se u razvojnom načinu rada (`!app.isPackaged`)

## Proces izgradnje

1. `npm run build` → samostalna Next.js aplikacija u `.next/standalone`.
2. `prepare-electron-standalone.mjs` → ponovo priprema sadržaj u `.next/electron-standalone` i prepisuje apsolutne putanje unutar `server.js` + `required-server-files.json` kako bi se paket mogao premještati.
3. `electron-builder` pakuje `main.js`, `preload.js`, `node_modules` i `extraResources: { ../.next/electron-standalone → app }`.

### Ciljne platforme izgradnje

| OS      | Ciljevi                                               |
| ------- | ----------------------------------------------------- |
| Windows | NSIS instalacijski program + prijenosna verzija (x64) |
| macOS   | DMG (Intel + arm64, prevlačenje u Applications)       |
| Linux   | AppImage + DEB (x64 + arm64)                          |

NSIS postavke: `oneClick: false`, omogućava korisniku da odabere direktorij instalacije te kreira prečice na radnoj površini i u izborniku Start.

## Osnovno testiranje zapakovane verzije

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automatski pronalazi zapakovanu izvršnu datoteku u `electron/dist-electron/` za trenutnu platformu.
- Pokreće je s izolovanim direktorijima `HOME`/`APPDATA`/`XDG_*` kako ne bi pristupala podacima programera.
- Periodično provjerava `http://127.0.0.1:20128/login` radi HTTP odgovora 200 unutar 45 s.
- Prati stderr/stdout radi fatalnih obrazaca (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` itd.).
- Nakon potvrde spremnosti čeka 2 s stabilnog rada, zatim šalje SIGTERM i čeka da se port oslobodi.
- U CI okruženju automatski prosljeđuje `--no-sandbox --disable-gpu` (i `--disable-dev-shm-usage` na Linuxu).

Promjenjive okruženja za prilagođavanje: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Potpisivanje koda

`electron/package.json` **ne** povezuje direktno vjerodajnice za potpisivanje. Proslijedite ih putem promjenjivih okruženja alatu `electron-builder`:

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

Artefakti se smještaju u `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Izdanja se objavljuju na GitHub Releases (`diegosouzapw/OmniRoute`), gdje `electron-updater` također provjerava postoje li nove verzije.

## Rješavanje problema

| Simptom                                                                | Rješenje                                                                                                                                                                                                     |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Cannot find module 'better-sqlite3'` nakon veće nadogradnje Electrona | better-sqlite3 v13 isporučuje unaprijed izgrađene Node-API pakete — ponovo pokrenite `npm install` u korijenskom direktoriju i `prepare:bundle` (provjerava unaprijed izgrađeni paket za trenutnu platformu) |
| `ERR_DLOPEN_FAILED` za izvorni modul                                   | Ponovo pokrenite `prepare:bundle` — odmah prijavljuje grešku kada nedostaje unaprijed izgrađeni Node-API paket za trenutnu platformu                                                                         |
| Prozor je prazan na Linuxu                                             | Potvrdite da se Next.js server zaista povezao s portom PORT (provjerite zapise `[Server]`)                                                                                                                   |
| Notarizacija na macOS-u zastane                                        | Provjerite jesu li promjenjive `APPLE_*` izvezene, a ne samo navedene u `.env`                                                                                                                               |
| Upozorenje Windows SmartScreena                                        | Potpišite EV certifikatom ili neka korisnici kliknu desnim dugmetom → "Svejedno pokreni"                                                                                                                     |
| Osnovni test ne uspije zbog zauzetog porta                             | Zaustavite svaki lokalni razvojni server na portu 20128 prije pokretanja `electron:smoke:packaged`                                                                                                           |

## Također pogledajte

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Izvor: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pomoćne skripte: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
