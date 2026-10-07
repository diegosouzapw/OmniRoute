# Electron Desktop Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Totuuden lähde:** `electron/`-työtila
> **Viimeksi päivitetty:** 2026-06-28 — v3.8.40

OmniRoute sisältää eri alustoilla toimivan työpöytäsovelluksen (Windows / macOS / Linux), joka perustuu
**Electron 41**- ja **electron-builder 26.10** -tekniikoihin. Työpöytäsovellus käynnistää Next.js:n
itsenäisen palvelimen aliprosessina, ohjaa `BrowserWindow`-ikkunan siihen ja lisää
ilmaisinalueen kuvakkeen, automaattisen päivitystoiminnon, IPC-sillan sekä määrityksiä vaatimattoman salaisuuksien alustuksen.

## Arkkitehtuuri

```
┌──────────────────────────────────────────────┐
│ Electronin pääprosessi (electron/main.js)    │
│ ├─ Yhden ilmentymän lukitus                  │
│ ├─ Aliprosessi: itsenäinen Next.js-palvelin  │
│ │   (käynnistetään Electronin Node-ajolla)   │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Ilmaisinalueen kuvake + kontekstivalikko  │
│ ├─ Automaattinen päivitys electron-updaterilla│
│ ├─ Sisällön suojauskäytäntö (istunto-otsakkeet)│
│ └─ Salaisuuksien alustus (JWT / API_KEY_SECRET)│
└──────────────────────────────────────────────┘
            ↕ IPC-silta (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderöijä (Next.js-hallintapaneeli)         │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## Versiot

Vahvistettu tiedostosta `electron/package.json`:

| Paketti            | Versio                                                                                      |
| ------------------ | ------------------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                                   |
| `electron-builder` | `^26.15.3`                                                                                  |
| `electron-updater` | `^6.8.9`                                                                                    |
| `better-sqlite3`   | juuressa `^13.0.2` (Node-API:n esikäännetyt versiot — Electron-uudelleenkoontia ei tarvita) |
| Sovellusversio     | `3.8.0`                                                                                     |
| Sovellustunnus     | `online.omniroute.desktop`                                                                  |
| Tuotenimi          | `OmniRoute`                                                                                 |

## Komentosarjat (juuren `package.json`)

| Komentosarja                      | Tarkoitus                                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Käynnistää komennon `npm run dev`, odottaa osoitetta `localhost:20128` ja käynnistää Electronin                     |
| `npm run electron:build`          | Kokoaa Next.js:n ja suorittaa sitten `electron-builder`-työkalun nykyiselle käyttöjärjestelmälle                    |
| `npm run electron:build:win`      | Kokoaa Windowsin NSIS-asennusohjelman ja siirrettävän version (x64)                                                 |
| `npm run electron:build:mac`      | Kokoaa macOS:n DMG-levykuvan (Intel + Apple Silicon)                                                                |
| `npm run electron:build:linux`    | Kokoaa Linuxin AppImage- ja DEB-paketit (x64 + arm64)                                                               |
| `npm run electron:smoke:packaged` | Käynnistää paketoidun binääritiedoston, tarkistaa `/login`-osoitteesta HTTP 200 -vastauksen ja sammuttaa sen sitten |

`electron/`-työtila tarjoaa myös seuraavat komennot:

- `npm run prepare:bundle` — suorittaa komentosarjan `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — yhden arkkitehtuurin macOS-koonnit
- `npm run pack` — vain hakemiston tuottava koonti paikallista testausta varten (ei asennusohjelmaa)

## Hakemistorakenne

```
electron/
├── package.json              # Electron-riippuvuudet + electron-builder-määritykset
├── main.js                   # Pääprosessi (24 kt — katso merkinnät alta)
├── preload.js                # contextBridge-IPC-silta
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI-tyypit
├── README.md                 # Työtilan sisäiset muistiinpanot
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder-tuloste (ei versionhallinnassa)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Valmistelee .next/electron-standalone-paketin
└── dev/
    └── smoke-electron-packaged.mjs       # Koontia seuraava smoke-testi
```

Sekä `main.js` että `preload.js` ovat **CommonJS-muotoisia `.js`-tiedostoja**, eivät TypeScript-tiedostoja. Renderöintipuolen tyypitykset sijaitsevat tiedostossa `electron/types.d.ts`.

## IPC-silta (`preload.js`)

Esilataus tuo sallittujen kohteiden luetteloon perustuvan API:n saataville kohteessa `window.electronAPI` käyttäen `contextBridge`-toimintoa asetuksilla `contextIsolation: true` ja `nodeIntegration: false`.

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

| Renderöintiprosessin kutsu                                        | Tyyppi                              |
| ----------------------------------------------------------------- | ----------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | kutsu                               |
| `openExternal(url)`                                               | kutsu                               |
| `getDataDir()`                                                    | kutsu                               |
| `restartServer()`                                                 | kutsu                               |
| `getAppVersion()`                                                 | kutsu                               |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | kutsu                               |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | lähetys                             |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | vastaanotto (palauttaa vapauttajan) |

Vastaanoton apufunktiot palauttavat **vapautusfunktion** sen sijaan, että ne käyttäisivät `removeAllListeners`-metodia — tämä estää kuuntelijoiden kertymisen React-komponenttien uudelleenliittämisen yhteydessä.

## Palvelimen elinkaari

`main.js` käynnistää itsenäisen Next.js-paketin suoraan Electronin Node-ajonaikaisympäristöllä välttääkseen järjestelmän Noden kanssa ilmenevät natiivimoduulien ABI-yhteensopimattomuudet:

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

- `waitForServer()` kyselee URL-osoitetta enintään 30 sekunnin ajan ennen ikkunan näyttämistä (ei tyhjää näyttöä kylmäkäynnistyksen aikana).
- `stdio: "pipe"` kaappaa vakio- ja virhetulosteen; valmiudesta kertovat ilmaukset (`Ready` / `listening`) lähettävät IPC:n kautta tilan `server-status: running`.
- `before-quit` odottaa sulavaa SIGTERM-sammutusta (WAL-tarkistuspiste) enintään 5 sekuntia ja lähettää sen jälkeen SIGKILL-signaalin.
- Ilmoitusalueen portinvalitsin (`20128`, `3000`, `8080`) pysäyttää ja käynnistää palvelimen uudelleen sekä lataa sitten BrowserWindow-ikkunan uudelleen.

## Salaisuuksien alustus ilman määrityksiä

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

## Ympäristötiedoston haku

Ennen palvelimen käynnistämistä pääprosessi (`getPreferredEnvFilePath()` tiedostossa
`electron/main.js`) valitsee **yhden** `.env`-tiedoston: ensimmäisen olemassa olevan tiedoston seuraavista.

1. `$DATA_DIR/.env`, kun `DATA_DIR` on asetettu ympäristössä, josta sovellus käynnistettiin.
2. `<resolved DATA_DIR>/.env`, käyttäen samoja oletusarvoja kuin edellä: `%APPDATA%\omniroute\.env`
   Windowsissa, `$XDG_CONFIG_HOME/omniroute/.env` tai `~/.omniroute/.env` Linuxissa ja macOS:ssä.
3. `.env` prosessin työhakemistossa.

Pääprosessi lukee vain kyseisen tiedoston; myöhempien ehdokkaiden sisältöä ei yhdistetä siihen. Palvelimen
ympäristö muodostetaan sitten seuraavan ensisijaisuusjärjestyksen mukaisesti (korkein ensin):

1. Electron-prosessin ympäristö (muuttujat, jotka peritään sovelluksen käynnistäneeltä prosessilta).
2. Valittu `.env`-tiedosto.
3. `<DATA_DIR>/server.env` (edellä mainitut alustussalaisuudet).

Prosessiympäristö tallennetaan sovelluksen käynnistyessä, joten sovelluksen ollessa käynnissä asetettu
järjestelmä- tai käyttäjäympäristömuuttuja (myös silloin, kun sovellus jää ilmaisinalueelle ikkunan
sulkemisen jälkeen) ei välity palvelimelle ennen kuin sovellus suljetaan kokonaan ja käynnistetään
uudelleen. Suorituksenaikaisille asetuksille, kuten `CONTEXT_LENGTH_<PROVIDER>` (katso
[Ympäristömuuttujat: palveluntarjoajakohtainen kontekstin pituus](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
kannattaa käyttää `.env`-tiedostoa ja sulkea sitten sovellus kokonaan (ilmaisinalueelta, **Lopeta**) sekä käynnistää se uudelleen.

## Ikkuna ja ilmaisinalue

- `BrowserWindow`: 1400×900 (vähintään 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, liikennevalopainikkeet kohdassa `{ x: 16, y: 16 }`.
- Windows/Linux: natiivi otsikkopalkki.
- Sulkemispainike pienentää sovelluksen ilmaisinalueelle; ilmaisinalueen valikossa ovat **Avaa OmniRoute**, **Avaa hallintapaneeli** (ulkoisessa selaimessa), **Palvelimen portti** -alivalikko, **Tarkista päivitykset** ja **Lopeta**.

## Sisällön suojauskäytäntö

Asetetaan `session.defaultSession.webRequest.onHeadersReceived`-käsittelijän kautta. Huomionarvoisia direktiivejä:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Kehitystila lisää `'unsafe-eval'`-arvon vain `script-src`-direktiiviin

## Automaattinen päivitys

Käyttää `electron-updater`-pakettia GitHub-palveluntarjoajan (`diegosouzapw/OmniRoute`) kanssa.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Tapahtumat välitetään käyttöliittymäprosessille `update-status`-IPC:n kautta:
  `checking`, `available`, `not-available`, `downloading` (`percent`-arvon kanssa), `downloaded`, `error`
- `installUpdate()` pysäyttää palvelimen ja kutsuu sitten `autoUpdater.quitAndInstall()`
- Ohitetaan kehitystilassa (`!app.isPackaged`)

## Koontiputki

1. `npm run build` → Next.jsin erillinen koonti hakemistoon `.next/standalone`.
2. `prepare-electron-standalone.mjs` → kokoaa tiedostot uudelleen hakemistoon `.next/electron-standalone` ja kirjoittaa uudelleen absoluuttiset polut tiedostoissa `server.js` + `required-server-files.json`, jotta paketti voidaan siirtää.
3. `electron-builder` paketoi tiedostot `main.js`, `preload.js`, `node_modules` sekä `extraResources: { ../.next/electron-standalone → app }`.

### Koontikohteet

| Käyttöjärjestelmä | Kohteet                                        |
| ----------------- | ---------------------------------------------- |
| Windows           | NSIS-asennusohjelma + siirrettävä versio (x64) |
| macOS             | DMG (Intel + arm64, vedä Ohjelmat-kansioon)    |
| Linux             | AppImage + DEB (x64 + arm64)                   |

NSIS-asetukset: `oneClick: false`, antaa käyttäjän valita asennushakemiston sekä luo pikakuvakkeet työpöydälle ja Käynnistä-valikkoon.

## Paketoidun koonnin savutestaus

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Etsii automaattisesti nykyisen alustan paketoidun binääritiedoston hakemistosta `electron/dist-electron/`.
- Käynnistää sovelluksen eristetyillä `HOME`/`APPDATA`/`XDG_*`-hakemistoilla, jotta kehittäjän tietoihin ei kosketa.
- Tarkistaa toistuvasti, palauttaako `http://127.0.0.1:20128/login` HTTP 200 -vastauksen 45 s:n kuluessa.
- Tarkkailee stderr/stdout-tulosteita vakavien virhekuvioiden varalta (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` jne.).
- Odottaa valmiustilan jälkeen 2 s vakaata suoritusta, lähettää sitten SIGTERM-signaalin ja odottaa portin vapautumista.
- CI-ympäristössä välittää automaattisesti valitsimet `--no-sandbox --disable-gpu` (ja Linuxissa `--disable-dev-shm-usage`).

Ympäristömuuttujilla tehtävät ohitukset: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Koodin allekirjoittaminen

`electron/package.json` **ei** määritä allekirjoitustunnuksia suoraan. Välitä ne ympäristömuuttujina `electron-builder`-työkalulle:

### macOS

```bash
export APPLE_ID=<sähköposti>
export APPLE_APP_SPECIFIC_PASSWORD=<salasana>
export APPLE_TEAM_ID=<tunnus>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<varmenteen-salasana>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<varmenteen-salasana>
npm run electron:build:win
```

### Linux

AppImage-allekirjoitus on valinnainen — määritä `LINUX_GPG_KEY`, jos allekirjoitat.

## Jakelu

Tuotokset sijoitetaan hakemistoon `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Julkaisut julkaistaan GitHub Releases -palvelussa (`diegosouzapw/OmniRoute`), josta myös `electron-updater` tarkistaa uudet versiot.

## Vianmääritys

| Oire                                                                       | Korjaus                                                                                                                                                                                |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` Electronin pääversion noston jälkeen | better-sqlite3 v13 sisältää valmiiksi käännetyt Node-API-versiot — suorita `npm install` uudelleen juuressa ja sitten `prepare:bundle` (se tarkistaa nykyisen alustan valmiin koonnin) |
| Natiivimoduulin `ERR_DLOPEN_FAILED`                                        | Suorita `prepare:bundle` uudelleen — se keskeytyy heti, jos nykyisen alustan valmiiksi käännetty Node-API-versio puuttuu                                                               |
| Ikkuna näkyy tyhjänä Linuxissa                                             | Varmista, että Next.js-palvelin todella sitoutui muuttujan PORT osoittamaan porttiin (tarkista `[Server]`-lokit)                                                                       |
| macOS-notaarivahvistus pysähtyy                                            | Varmista, että `APPLE_*`-muuttujat on viety ympäristöön eikä vain määritetty tiedostossa `.env`                                                                                        |
| Windows SmartScreen -varoitus                                              | Allekirjoita EV-varmenteella tai pyydä käyttäjiä napsauttamaan hiiren kakkospainikkeella → "Suorita silti"                                                                             |
| Savutesti epäonnistuu portin ollessa käytössä                              | Pysäytä portissa 20128 toimiva paikallinen kehityspalvelin ennen komennon `electron:smoke:packaged` suorittamista                                                                      |

## Katso myös

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Lähdekoodi: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Apuskriptit: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
