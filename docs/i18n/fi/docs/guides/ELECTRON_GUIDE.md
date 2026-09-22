# Electron Desktop Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Totuuden lähde:** `electron/`-työtila
> **Viimeksi päivitetty:** 2026-06-28 — v3.8.40

OmniRoute sisältää monialustaisen työpöytäsovelluksen (Windows / macOS / Linux), joka perustuu
**Electron 41**- ja **electron-builder 26.10** -teknologioihin. Työpöytäsovellus käynnistää erillisenä
aliprosessina itsenäisen Next.js-palvelimen, ohjaa `BrowserWindow`-ikkunan siihen ja lisää
järjestelmän ilmaisinalueen, automaattisen päivittäjän, IPC-sillan sekä ilman määrityksiä toimivan salaisuuksien alustuksen.

## Arkkitehtuuri

```
┌───────────────────────────────────────────────────┐
│ Electron-pääprosessi (electron/main.js)           │
│ ├─ Yhden ilmentymän lukitus                       │
│ ├─ Aliprosessi: itsenäinen Next.js-palvelin       │
│ │   (käynnistetään Electronin Node-ajoympäristöllä)│
│ ├─ BrowserWindow → http://localhost:PORT          │
│ ├─ Järjestelmän ilmaisinalue + kontekstivalikko   │
│ ├─ Automaattinen päivitys electron-updaterilla    │
│ ├─ Content Security Policy (istunnon otsakkeet)   │
│ └─ Salaisuuksien alustus (JWT / API_KEY_SECRET)   │
└───────────────────────────────────────────────────┘
            ↕ IPC-silta (electron/preload.js)
┌───────────────────────────────────────────────────┐
│ Renderöijä (Next.js-hallintapaneeli)              │
│   window.electronAPI.* (contextIsolation)         │
└───────────────────────────────────────────────────┘
```

## Versiot

Vahvistettu tiedostosta `electron/package.json`:

| Paketti            | Versio                                                                         |
| ------------------ | ------------------------------------------------------------------------------ |
| `electron`         | `^43.4.1`                                                                      |
| `electron-builder` | `^26.15.3`                                                                     |
| `electron-updater` | `^6.8.9`                                                                       |
| `better-sqlite3`   | juuritason `^13.0.2` (Node-API-esikäännökset — ei Electron-uudelleenkäännöstä) |
| Sovellusversio     | `3.8.0`                                                                        |
| Sovellustunnus     | `online.omniroute.desktop`                                                     |
| Tuotenimi          | `OmniRoute`                                                                    |

## Komentosarjat (juuritason `package.json`)

| Komentosarja                      | Tarkoitus                                                                                                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Käynnistää komennon `npm run dev`, odottaa osoitetta `localhost:20128` ja käynnistää Electronin          |
| `npm run electron:build`          | Kääntää Next.js:n ja suorittaa sitten `electron-builder`-työkalun nykyiselle käyttöjärjestelmälle        |
| `npm run electron:build:win`      | Luo Windowsin NSIS-asennusohjelman ja siirrettävän version (x64)                                         |
| `npm run electron:build:mac`      | Luo macOS:n DMG-levykuvan (Intel + Apple Silicon)                                                        |
| `npm run electron:build:linux`    | Luo Linuxin AppImage- ja DEB-paketit (x64 + arm64)                                                       |
| `npm run electron:smoke:packaged` | Käynnistää paketoidun binääritiedoston, tarkistaa `/login`-polusta HTTP 200 -vastauksen ja sammuttaa sen |

`electron/`-työtila tarjoaa myös seuraavat komennot:

- `npm run prepare:bundle` — suorittaa komentosarjan `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — yhden arkkitehtuurin macOS-koontiversiot
- `npm run pack` — vain hakemiston luova koontiversio paikalliseen testaukseen (ei asennusohjelmaa)

## Hakemistorakenne

```
electron/
├── package.json              # Electron-riippuvuudet + electron-builder-määritykset
├── main.js                   # Pääprosessi (24 KB — katso huomautukset alta)
├── preload.js                # contextBridge IPC -silta
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI-tyypit
├── README.md                 # Työtilan sisäiset muistiinpanot
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder-tuloste (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Valmistelee .next/electron-standalone-paketin
└── dev/
    └── smoke-electron-packaged.mjs       # Koontiversion jälkeinen savutesti
```

Sekä `main.js` että `preload.js` ovat **CommonJS `.js` -tiedostoja**, eivät TypeScript-tiedostoja.
Renderöintipuolen tyypitykset sijaitsevat tiedostossa `electron/types.d.ts`.

## IPC-silta (`preload.js`)

Esilataus tuo sallittujen luetteloon perustuvan API:n saataville kohteessa `window.electronAPI` käyttämällä `contextBridge`-toimintoa
asetuksilla `contextIsolation: true` ja `nodeIntegration: false`.

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

Saataville tuodut metodit:

| Renderöintiprosessin kutsu                                        | Tyyppi                               |
| ----------------------------------------------------------------- | ------------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                               |
| `openExternal(url)`                                               | invoke                               |
| `getDataDir()`                                                    | invoke                               |
| `restartServer()`                                                 | invoke                               |
| `getAppVersion()`                                                 | invoke                               |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                               |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                 |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (palauttaa vapautusfunktion) |

Vastaanoton apufunktiot palauttavat **vapautusfunktion** sen sijaan, että ne käyttäisivät
`removeAllListeners`-toimintoa — tämä estää kuuntelijoiden kertymisen, kun React-komponentit
liitetään uudelleen.

## Palvelimen elinkaari

`main.js` käynnistää itsenäisen Next.js-paketin suoraan Electronin Node-
suoritusympäristössä, jotta järjestelmän Noden kanssa ei synny natiivimoduulien ABI-yhteensopimattomuutta:

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

Keskeiset ominaisuudet:

- `waitForServer()` tarkistaa URL-osoitetta enintään 30 s ennen ikkunan näyttämistä (ei tyhjää näyttöä kylmäkäynnistyksen aikana).
- `stdio: "pipe"` kaappaa stdout/stderr-tulosteet; valmiudesta kertovat ilmaukset (`Ready` / `listening`) lähettävät `server-status: running` -tapahtuman IPC:n kautta.
- `before-quit` odottaa enintään 5 s hallittua SIGTERM-sammutusta (WAL-tarkistuspiste) ja lähettää sitten SIGKILL-signaalin.
- Ilmaisinalueen portinvaihtaja (`20128`, `3000`, `8080`) pysäyttää ja käynnistää palvelimen uudelleen ja lataa sitten BrowserWindow-ikkunan uudelleen.

## Salaisuuksien automaattinen alustus ilman määrityksiä

Ensimmäisellä käynnistyskerralla pääprosessi luo automaattisesti puuttuvat salaisuudet ja tallentaa ne pysyvästi:

| Salaisuus                | Lähde                                                                                               |
| ------------------------ | --------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                            |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (kieltäytyy, jos salattuja tunnistetietoja on jo olemassa) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                            |

Tallennetaan tiedostoon `<DATA_DIR>/server.env`. `DATA_DIR` määräytyy seuraavasti:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` tai `~/.omniroute`
- macOS: `~/.omniroute`

## Ikkuna ja ilmaisinalue

- `BrowserWindow`: 1400×900 (vähintään 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, ikkunapainikkeet kohdassa `{ x: 16, y: 16 }`.
- Windows/Linux: käyttöjärjestelmän oma otsikkopalkki.
- Sulkemispainike pienentää sovelluksen ilmaisinalueelle. Ilmaisinalueen valikossa ovat **Avaa OmniRoute**, **Avaa hallintapaneeli** (ulkoisessa selaimessa), **Palvelimen portti** -alivalikko, **Tarkista päivitykset** ja **Lopeta**.

## Sisällön suojauskäytäntö

Asetetaan `session.defaultSession.webRequest.onHeadersReceived`-käsittelijän kautta. Merkittävät direktiivit:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Kehitystila lisää vain `script-src`-direktiiviin arvon `'unsafe-eval'`

## Automaattinen päivitys

Käyttää `electron-updater`-pakettia GitHub-palveluntarjoajan kanssa (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Tapahtumat välitetään renderöintiprosessille `update-status`-IPC:n kautta:
  `checking`, `available`, `not-available`, `downloading` (`percent`-arvon kanssa), `downloaded`, `error`
- `installUpdate()` lopettaa palvelimen ja kutsuu sitten `autoUpdater.quitAndInstall()`-metodia
- Ohitetaan kehitystilassa (`!app.isPackaged`)

## Koontiputki

1. `npm run build` → itsenäinen Next.js-koonti hakemistoon `.next/standalone`.
2. `prepare-electron-standalone.mjs` → kokoaa tiedostot uudelleen hakemistoon `.next/electron-standalone` ja kirjoittaa uudelleen tiedostojen `server.js` sekä `required-server-files.json` sisäiset absoluuttiset polut, jotta paketti voidaan siirtää.
3. `electron-builder` paketoi tiedostot `main.js`, `preload.js` ja `node_modules` sekä resurssit `extraResources: { ../.next/electron-standalone → app }`.

### Koontikohteet

| Käyttöjärjestelmä | Kohteet                                        |
| ----------------- | ---------------------------------------------- |
| Windows           | NSIS-asennusohjelma + siirrettävä versio (x64) |
| macOS             | DMG (Intel + arm64, vedä Ohjelmat-kansioon)    |
| Linux             | AppImage + DEB (x64 + arm64)                   |

NSIS-asetukset: `oneClick: false`, käyttäjä voi valita asennushakemiston, ja asennus luo pikakuvakkeet työpöydälle sekä Käynnistä-valikkoon.

## Paketoidun koonnin savutestaus

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Etsii nykyisen alustan paketoidun suoritettavan tiedoston automaattisesti hakemistosta `electron/dist-electron/`.
- Käynnistää sovelluksen eristetyillä `HOME`-/`APPDATA`-/`XDG_*`-hakemistoilla, jotta kehittäjän tietoihin ei kosketa.
- Kysyy osoitetta `http://127.0.0.1:20128/login` toistuvasti ja odottaa HTTP 200 -vastausta 45 sekunnin kuluessa.
- Tarkkailee stderr/stdout-tulosteita vakavien virhekuvioiden varalta (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` jne.).
- Odottaa valmiustilan jälkeen 2 sekuntia vakaata suoritusta, lähettää sitten SIGTERM-signaalin ja odottaa portin vapautumista.
- CI-ympäristössä välittää automaattisesti valitsimet `--no-sandbox --disable-gpu` (ja Linuxissa `--disable-dev-shm-usage`).

Ympäristömuuttujilla tehtävät ohitukset: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Koodin allekirjoitus

`electron/package.json` **ei** määritä allekirjoitustunnuksia suoraan. Välitä ne ympäristömuuttujina `electron-builder`-työkalulle:

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

AppImage-allekirjoitus on valinnainen — määritä `LINUX_GPG_KEY`, jos haluat allekirjoittaa.

## Jakelu

Artefaktit tallennetaan hakemistoon `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Julkaisut julkaistaan GitHub Releases -palvelussa (`diegosouzapw/OmniRoute`), josta myös `electron-updater` tarkistaa uudet versiot.

## Vianmääritys

| Oire                                                                            | Korjaus                                                                                                                                                                                       |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` Electronin pääversion päivityksen jälkeen | better-sqlite3 v13 sisältää valmiiksi käännetyt Node-API-binaarit — suorita uudelleen juuressa `npm install` ja `prepare:bundle` (se tarkistaa nykyisen alustan valmiiksi käännetyn binaarin) |
| Natiivimoduulin `ERR_DLOPEN_FAILED`                                             | Suorita `prepare:bundle` uudelleen — se keskeyttää heti, jos nykyisen alustan valmiiksi käännetty Node-API-binaari puuttuu                                                                    |
| Ikkuna näkyy tyhjänä Linuxissa                                                  | Varmista, että Next.js-palvelin on todella sidottu PORT-porttiin (tarkista `[Server]`-lokit)                                                                                                  |
| macOS-notarisointi pysähtyy                                                     | Varmista, että `APPLE_*`-muuttujat on viety ympäristöön eikä määritetty vain `.env`-tiedostossa                                                                                               |
| Windows SmartScreen -varoitus                                                   | Allekirjoita EV-varmenteella tai käyttäjät voivat napsauttaa hiiren kakkospainikkeella → "Suorita silti"                                                                                      |
| Savutesti epäonnistuu portin ollessa käytössä                                   | Pysäytä portissa 20128 toimiva paikallinen kehityspalvelin ennen komennon `electron:smoke:packaged` suorittamista                                                                             |

## Katso myös

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Lähdekoodi: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Apuskriptit: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
