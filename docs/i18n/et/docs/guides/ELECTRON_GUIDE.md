# Electron Desktop Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Tõeallikas:** `electron/` tööruum
> **Viimati uuendatud:** 2026-06-28 — v3.8.40

OmniRoute sisaldab platvormideülest töölauarakendust (Windows / macOS / Linux), mis põhineb
tehnoloogiatel **Electron 41** + **electron-builder 26.10**. Töölauarakendus käivitab Next.js-i
eraldiseisva serveri alamprotsessina, suunab `BrowserWindow`-i sellele ning lisab
süsteemisalve, automaatse uuendaja, IPC-silla ja nullkonfiguratsiooniga saladuste algseadistuse.

## Arhitektuur

```
┌──────────────────────────────────────────────┐
│ Electroni põhiprotsess (electron/main.js)    │
│ ├─ Ühe eksemplari lukk                       │
│ ├─ Alamprotsess: Next.js-i eraldiseisev server│
│ │   (käivitatud Electroni Node'i käituskeskkonnaga)│
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Süsteemisalv + kontekstimenüü             │
│ ├─ Automaatne uuendamine electron-updateri kaudu│
│ ├─ Sisuturbepoliitika (seansi päised)        │
│ └─ Saladuste algseadistus (JWT / API_KEY_SECRET)│
└──────────────────────────────────────────────┘
            ↕ IPC-sild (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderdaja (Next.js-i töölaud)               │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## Versioonid

Kinnitatud faili `electron/package.json` põhjal:

| Pakett             | Versioon                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                                                |
| `electron-builder` | `^26.15.3`                                                                                               |
| `electron-updater` | `^6.8.9`                                                                                                 |
| `better-sqlite3`   | juurkaustas `^13.0.2` (Node-API eelkompileeritud järgud — Electroni jaoks pole vaja uuesti kompileerida) |
| Rakenduse versioon | `3.8.0`                                                                                                  |
| Rakenduse ID       | `online.omniroute.desktop`                                                                               |
| Toote nimi         | `OmniRoute`                                                                                              |

## Skriptid (juurkausta `package.json`)

| Skript                            | Eesmärk                                                                                                   |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Käivitab `npm run dev`, ootab `localhost:20128` kättesaadavust ja käivitab Electroni                      |
| `npm run electron:build`          | Koostab Next.js-i rakenduse ja käivitab seejärel praeguse operatsioonisüsteemi jaoks `electron-builder`-i |
| `npm run electron:build:win`      | Koostab Windowsi NSIS-i installeri ja kaasaskantava versiooni (x64)                                       |
| `npm run electron:build:mac`      | Koostab macOS-i DMG (Intel + Apple Silicon)                                                               |
| `npm run electron:build:linux`    | Koostab Linuxi AppImage'i ja DEB-i (x64 + arm64)                                                          |
| `npm run electron:smoke:packaged` | Käivitab pakendatud binaarfaili, kontrollib `/login`-i HTTP 200 vastust ja sulgeb seejärel rakenduse      |

Tööruum `electron/` pakub ka järgmisi skripte:

- `npm run prepare:bundle` — käivitab `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — ühe arhitektuuriga macOS-i järgud
- `npm run pack` — ainult kataloogi loov järk kohalikuks testimiseks (ilma installerita)

## Kataloogistruktuur

```
electron/
├── package.json              # Electroni sõltuvused + electron-builderi konfiguratsioon
├── main.js                   # Põhiprotsess (24 KB — vt allolevaid märkusi)
├── preload.js                # contextBridge'i IPC-sild
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI tüübid
├── README.md                 # Tööruumisisesed märkmed
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builderi väljund (gitignore'iga eiratud)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Valmistab ette .next/electron-standalone'i komplekti
└── dev/
    └── smoke-electron-packaged.mjs       # Kompileerimisjärgne suitsutest
```

Nii `main.js` kui ka `preload.js` on **CommonJS-i `.js`-failid**, mitte TypeScript. Renderdajapoolsed
tüübikirjeldused asuvad failis `electron/types.d.ts`.

## IPC-sild (`preload.js`)

Eellaadimisskript teeb lubatud API kättesaadavaks objektil `window.electronAPI`, kasutades `contextBridge`'i
koos sätetega `contextIsolation: true` ja `nodeIntegration: false`.

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

Avalikustatud meetodid:

| Renderdaja väljakutse                                             | Tüüp                                   |
| ----------------------------------------------------------------- | -------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                 |
| `openExternal(url)`                                               | invoke                                 |
| `getDataDir()`                                                    | invoke                                 |
| `restartServer()`                                                 | invoke                                 |
| `getAppVersion()`                                                 | invoke                                 |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                 |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                   |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (tagastab eemaldusfunktsiooni) |

Vastuvõtu abifunktsioonid tagastavad **eemaldusfunktsiooni**, selle asemel et tugineda
meetodile `removeAllListeners` — see väldib kuularite kuhjumist Reacti komponentide
uuesti ühendamisel.

## Serveri elutsükkel

`main.js` käivitab Next.js-i autonoomse komplekti otse Electroni Node'i
käituskeskkonnaga, et vältida süsteemi Node'iga loomulike moodulite ABI ühildumatust:

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

Olulisemad omadused:

- `waitForServer()` küsitleb URL-i kuni 30 s enne akna kuvamist (külmkäivitusel ei kuvata tühja ekraani).
- `stdio: "pipe"` hõivab stdout/stderr-i; valmisolekut väljendavad fraasid (`Ready` / `listening`) saadavad IPC kaudu sündmuse `server-status: running`.
- `before-quit` ootab sujuva SIGTERM-i (WAL-i kontrollpunkti) lõpetamist kuni 5 s ja saadab seejärel SIGKILL-i.
- Süsteemisalves olev pordivahetaja (`20128`, `3000`, `8080`) peatab ja taaskäivitab serveri ning laadib seejärel BrowserWindow' uuesti.

## Saladuste nullkonfiguratsiooniga algkäivitus

Esimesel käivitamisel genereerib põhiprotsess puuduvad saladused automaatselt ja salvestab need püsivalt:

| Saladus                  | Allikas                                                                                       |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                      |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (keeldub, kui krüpteeritud mandaadid on juba olemas) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                      |

Salvestatakse faili `<DATA_DIR>/server.env`. `DATA_DIR` väärtuseks määratakse:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` või `~/.omniroute`
- macOS: `~/.omniroute`

## Keskkonnafaili otsing

Enne serveri alamprotsessina käivitamist valib põhiprotsess (`getPreferredEnvFilePath()` failis
`electron/main.js`) **ühe** `.env`-faili: esimese alltoodud failidest, mis on olemas.

1. `$DATA_DIR/.env`, kui `DATA_DIR` on määratud rakenduse käivituskeskkonnas.
2. `<resolved DATA_DIR>/.env`, kasutades samu eespool toodud vaikeväärtusi: `%APPDATA%\omniroute\.env`
   Windowsis, `$XDG_CONFIG_HOME/omniroute/.env` või `~/.omniroute/.env` Linuxis ja macOS-is.
3. `.env` protsessi töökataloogis.

Põhiprotsess loeb ainult seda faili; hilisemaid kandidaate ei liideta. Seejärel koostatakse serveri
keskkond järgmise tähtsusjärjestuse alusel (kõrgeim esimesena):

1. Electroni protsessi keskkond (muutujad, mis päritakse rakenduse käivitanud protsessilt).
2. Valitud `.env`-fail.
3. `<DATA_DIR>/server.env` (eespool kirjeldatud algkäivituse saladused).

Protsessi keskkond jäädvustatakse rakenduse käivitamisel, mistõttu rakenduse töötamise ajal määratud
süsteemi- või kasutajakeskkonna muutuja (sealhulgas siis, kui rakendus on pärast akna sulgemist
süsteemisalves) ei jõua serverini enne, kui rakendus täielikult suletakse ja uuesti käivitatakse.
Käitusaegsete seadistuste, näiteks `CONTEXT_LENGTH_<PROVIDER>` puhul (vt
[Keskkonnamuutujad: teenusepakkujakohane kontekstipikkus](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
eelista `.env`-faili, seejärel sulge rakendus täielikult (süsteemisalves **Välju**) ja käivita see uuesti.

## Aken ja süsteemisalv

- `BrowserWindow`: 1400×900 (min 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, akna juhtnupud asukohas `{ x: 16, y: 16 }`.
- Windows/Linux: süsteemiomane tiitliriba.
- Sulgemisnupp minimeerib rakenduse süsteemisalve; süsteemisalve menüüs on **Ava OmniRoute**, **Ava töölaud** (välises brauseris), alammenüü **Serveri port**, **Kontrolli värskendusi**, **Välju**.

## Sisu turbepoliitika

Määratakse `session.defaultSession.webRequest.onHeadersReceived` kaudu. Olulised direktiivid:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Arendusrežiim lisab ainult direktiivile `script-src` väärtuse `'unsafe-eval'`

## Automaatne värskendamine

Kasutab paketti `electron-updater` koos GitHubi teenusepakkujaga (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Sündmused edastatakse renderdusprotsessile `update-status` IPC kaudu:
  `checking`, `available`, `not-available`, `downloading` (koos väärtusega `percent`), `downloaded`, `error`
- `installUpdate()` peatab serveri ja kutsub seejärel välja `autoUpdater.quitAndInstall()`
- Arendusrežiimis jäetakse vahele (`!app.isPackaged`)

## Koostekonveier

1. `npm run build` → Next.js-i eraldiseisev rakendus kataloogis `.next/standalone`.
2. `prepare-electron-standalone.mjs` → paigutab failid uuesti kataloogi `.next/electron-standalone` ja kirjutab failides `server.js` + `required-server-files.json` olevad absoluutsed teed ümber, et paketti saaks ümber paigutada.
3. `electron-builder` pakendab `main.js`, `preload.js`, `node_modules` ja `extraResources: { ../.next/electron-standalone → app }`.

### Koostamise sihtplatvormid

| OS      | Sihtvormingud                                       |
| ------- | --------------------------------------------------- |
| Windows | NSIS-i paigaldaja + kaasaskantav (x64)              |
| macOS   | DMG (Intel + arm64, lohistatav Applications-kausta) |
| Linux   | AppImage + DEB (x64 + arm64)                        |

NSIS-i seaded: `oneClick: false`, võimaldab kasutajal valida paigalduskataloogi ning loob töölaua ja Start-menüü otseteed.

## Pakendatud koostu suitsutestimine

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Leiab praeguse platvormi jaoks pakendatud binaarfaili automaatselt kataloogist `electron/dist-electron/`.
- Käivitab selle isoleeritud `HOME`/`APPDATA`/`XDG_*` kataloogidega, et arendaja andmeid ei muudeta.
- Kontrollib aadressi `http://127.0.0.1:20128/login`, kuni saab 45 s jooksul HTTP 200 vastuse.
- Jälgib standardvea- ja standardväljundit fataalsete mustrite suhtes (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` jne).
- Ootab pärast valmisoleku tuvastamist 2 s stabiilset töötamist, saadab seejärel SIGTERM-i ja ootab pordi vabanemist.
- CI-s edastab automaatselt `--no-sandbox --disable-gpu` (ja Linuxis `--disable-dev-shm-usage`).

Keskkonnamuutujatega tehtavad alistused: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Koodi allkirjastamine

`electron/package.json` **ei** seo allkirjastamise mandaate otse. Edastage need keskkonnamuutujate kaudu tööriistale `electron-builder`:

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

AppImage'i allkirjastamine on valikuline — allkirjastamiseks määrake `LINUX_GPG_KEY`.

## Levitamine

Artefaktid salvestatakse kataloogi `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Väljalasked avaldatakse GitHub Releasesis (`diegosouzapw/OmniRoute`), kust ka `electron-updater` uusi versioone otsib.

## Tõrkeotsing

| Sümptom                                                                         | Lahendus                                                                                                                                                            |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` pärast Electroni põhiversiooni uuendamist | better-sqlite3 v13 sisaldab Node-API eelkoosteid — käivitage juurkataloogis uuesti `npm install` ja `prepare:bundle` (see kontrollib praeguse platvormi eelkoostet) |
| `ERR_DLOPEN_FAILED` omamooduli puhul                                            | Käivitage `prepare:bundle` uuesti — see lõpetab kohe veaga, kui praeguse platvormi Node-API eelkooste puudub                                                        |
| Linuxis kuvatakse tühi aken                                                     | Veenduge, et Next.js-i server seostus tegelikult pordiga PORT (kontrollige `[Server]` logisid)                                                                      |
| macOS-i notariaalne kinnitamine takerdub                                        | Veenduge, et `APPLE_*` muutujad oleks eksporditud, mitte ainult failis `.env`                                                                                       |
| Windows SmartScreeni hoiatus                                                    | Allkirjastage EV-sertifikaadiga või paluge kasutajatel teha paremklõps → „Run anyway“                                                                               |
| Suitsutest nurjub kasutusel oleva pordi tõttu                                   | Peatage enne `electron:smoke:packaged` käivitamist kõik pordil 20128 töötavad kohalikud arendusserverid                                                             |

## Vaata ka

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Lähtekood: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Abiskriptid: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
