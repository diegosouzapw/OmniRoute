# Electron Desktop Guide (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Pirminis tiesos šaltinis:** `electron/` darbo sritis
> **Paskutinį kartą atnaujinta:** 2026-06-28 — v3.8.40

OmniRoute pateikiama su kelių platformų darbalaukio programa (Windows / macOS / Linux), sukurta naudojant
**Electron 41** ir **electron-builder 26.10**. Darbalaukio programa paleidžia autonominį Next.js
serverį kaip antrinį procesą, nukreipia į jį `BrowserWindow` ir prideda
sistemos dėklą, automatinį naujinimą, IPC sąsają bei nulinės konfigūracijos paslapčių inicijavimą.

## Architektūra

```
┌──────────────────────────────────────────────┐
│ Pagrindinis Electron procesas (electron/main.js) │
│ ├─ Vieno egzemplioriaus užraktas             │
│ ├─ Antrinis procesas: autonominis Next.js serveris │
│ │   (paleistas naudojant Electron Node vykdymo aplinką) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Sistemos dėklas + kontekstinis meniu      │
│ ├─ Automatinis naujinimas per electron-updater │
│ ├─ Turinio saugumo politika (seanso antraštės) │
│ └─ Paslapčių inicijavimas (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────┘
            ↕ IPC sąsaja (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Atvaizdavimo procesas (Next.js valdymo skydelis) │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## Versijos

Patvirtinta pagal `electron/package.json`:

| Paketas              | Versija                                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `electron`           | `^43.4.1`                                                                                                            |
| `electron-builder`   | `^26.15.3`                                                                                                           |
| `electron-updater`   | `^6.8.9`                                                                                                             |
| `better-sqlite3`     | šakniniame projekte `^13.0.2` (Node-API iš anksto sukompiliuoti paketai — nereikia perkompiliuoti Electron aplinkai) |
| Programos versija    | `3.8.0`                                                                                                              |
| Programos ID         | `online.omniroute.desktop`                                                                                           |
| Produkto pavadinimas | `OmniRoute`                                                                                                          |

## Scenarijai (šakninis `package.json`)

| Scenarijus                        | Paskirtis                                                                                       |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Paleidžia `npm run dev`, laukia `localhost:20128` ir paleidžia Electron                         |
| `npm run electron:build`          | Sukompiliuoja Next.js, tada paleidžia `electron-builder` dabartinei OS                          |
| `npm run electron:build:win`      | Sukuria Windows NSIS diegimo programą ir nešiojamąją versiją (x64)                              |
| `npm run electron:build:mac`      | Sukuria macOS DMG (Intel + Apple Silicon)                                                       |
| `npm run electron:build:linux`    | Sukuria Linux AppImage ir DEB (x64 + arm64)                                                     |
| `npm run electron:smoke:packaged` | Paleidžia supakuotą dvejetainį failą, patikrina, ar `/login` grąžina HTTP 200, tada jį išjungia |

`electron/` darbo srityje taip pat pasiekiama:

- `npm run prepare:bundle` — paleidžia `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — vienos architektūros macOS versijos
- `npm run pack` — sukuria tik katalogą vietiniam testavimui (be diegimo programos)

## Katalogų struktūra

```
electron/
├── package.json              # Electron priklausomybės + electron-builder konfigūracija
├── main.js                   # Pagrindinis procesas (24 KB — žr. pastabas toliau)
├── preload.js                # contextBridge IPC tiltas
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI tipai
├── README.md                 # Pastabos darbo aplinkoje
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder išvestis (git ignoruojama)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Paruošia .next/electron-standalone paketą
└── dev/
    └── smoke-electron-packaged.mjs       # Po komponavimo vykdomas bazinis testas
```

Tiek `main.js`, tiek `preload.js` yra **CommonJS `.js` failai**, o ne TypeScript. Su
atvaizdavimo procesu susiję tipų aprašai yra faile `electron/types.d.ts`.

## IPC tiltas (`preload.js`)

Išankstinio įkėlimo scenarijus per `contextBridge` pateikia į baltąjį sąrašą įtrauktą API
objekte `window.electronAPI`, naudojant `contextIsolation: true` ir `nodeIntegration: false`.

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

Pateikiami metodai:

| Atvaizdavimo proceso iškvieta                                     | Tipas                                |
| ----------------------------------------------------------------- | ------------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                               |
| `openExternal(url)`                                               | invoke                               |
| `getDataDir()`                                                    | invoke                               |
| `restartServer()`                                                 | invoke                               |
| `getAppVersion()`                                                 | invoke                               |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                               |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                 |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (grąžina atjungimo funkciją) |

`receive` pagalbinės funkcijos grąžina **atjungimo funkciją**, užuot naudojusios
`removeAllListeners` — tai neleidžia klausytojams kauptis, kai React komponentai
prijungiami iš naujo.

## Serverio gyvavimo ciklas

`main.js` paleidžia autonominį Next.js paketą tiesiogiai naudodamas Electron Node
vykdymo aplinką, kad būtų išvengta savųjų modulių ABI nesuderinamumo su sisteminiu Node:

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

Svarbiausi aspektai:

- `waitForServer()` tikrina URL iki 30 s prieš parodydama langą (šaltojo paleidimo metu nerodomas tuščias ekranas).
- `stdio: "pipe"` fiksuoja stdout/stderr; parengties frazės (`Ready` / `listening`) per IPC išsiunčia `server-status: running`.
- `before-quit` iki 5 s laukia tvarkingo SIGTERM užbaigimo (WAL kontrolinio taško), tada siunčia SIGKILL.
- Prievadų perjungiklis sistemos dėkle (`20128`, `3000`, `8080`) sustabdo ir iš naujo paleidžia serverį, tada iš naujo įkelia BrowserWindow.

## Nulinės konfigūracijos paslapčių inicijavimas

Pirmą kartą paleidus, pagrindinis procesas automatiškai sugeneruoja ir išsaugo trūkstamas paslaptis:

| Paslaptis                | Šaltinis                                                                                                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                 |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (atsisakoma tęsti, jei jau yra užšifruotų prisijungimo duomenų) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                 |

Išsaugoma faile `<DATA_DIR>/server.env`. `DATA_DIR` nustatomas taip:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` arba `~/.omniroute`
- macOS: `~/.omniroute`

## Aplinkos failo paieška

Prieš paleisdamas serverio procesą, pagrindinis procesas (`getPreferredEnvFilePath()` faile
`electron/main.js`) pasirenka **vieną** `.env` failą: pirmąjį iš toliau nurodytų, kuris egzistuoja.

1. `$DATA_DIR/.env`, kai `DATA_DIR` nustatytas aplinkoje, iš kurios buvo paleista programa.
2. `<resolved DATA_DIR>/.env`, naudojant tas pačias numatytąsias reikšmes kaip pirmiau: `%APPDATA%\omniroute\.env`
   sistemoje Windows, `$XDG_CONFIG_HOME/omniroute/.env` arba `~/.omniroute/.env` sistemose Linux ir macOS.
3. `.env` proceso darbiniame kataloge.

Pagrindinis procesas nuskaito tik tą failą; vėlesni kandidatai nesujungiami. Tada serverio
aplinka sudaroma pagal šią pirmumo tvarką (nuo aukščiausio prioriteto):

1. Electron proceso aplinka (kintamieji, paveldėti iš programą paleidusio proceso).
2. Pasirinktas `.env` failas.
3. `<DATA_DIR>/server.env` (pirmiau nurodytos inicijavimo paslaptys).

Proceso aplinka užfiksuojama paleidžiant programą, todėl sistemos ar naudotojo aplinkos
kintamasis, nustatytas programai veikiant (įskaitant laiką, kai uždarius langą ji lieka sistemos
dėkle), nepasiekia serverio, kol programa visiškai neuždaroma ir nepaleidžiama iš naujo. Vykdymo
parametrams, pvz., `CONTEXT_LENGTH_<PROVIDER>` (žr.
[Aplinkos kintamieji: kiekvieno teikėjo konteksto ilgis](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
geriau naudoti `.env` failą, tada visiškai uždaryti programą (sistemos dėkle pasirinkti **Uždaryti**) ir paleisti iš naujo.

## Langas ir sistemos dėklas

- `BrowserWindow`: 1400×900 (mažiausias dydis 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, lango valdikliai ties `{ x: 16, y: 16 }`.
- Windows/Linux: įprasta sistemos antraštės juosta.
- Uždarymo mygtukas sumažina programą į sistemos dėklą; dėklo meniu yra **Atverti OmniRoute**, **Atverti valdymo skydą** (išorinėje naršyklėje), pomeniu **Serverio prievadas**, **Ieškoti naujinimų**, **Uždaryti**.

## Turinio saugumo politika

Nustatoma per `session.defaultSession.webRequest.onHeadersReceived`. Svarbios direktyvos:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Kūrimo režimu `'unsafe-eval'` pridedama tik prie `script-src`

## Automatinis naujinimas

Naudojamas `electron-updater` su GitHub teikėju (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Įvykiai perduodami atvaizdavimo procesui per `update-status` IPC:
  `checking`, `available`, `not-available`, `downloading` (su `percent`), `downloaded`, `error`
- `installUpdate()` nutraukia serverio procesą, tada iškviečia `autoUpdater.quitAndInstall()`
- Kūrimo režimu praleidžiama (`!app.isPackaged`)

## Kompiliavimo procesas

1. `npm run build` → Next.js autonominis paketas aplanke `.next/standalone`.
2. `prepare-electron-standalone.mjs` → iš naujo paruošia failus aplanke `.next/electron-standalone` ir perrašo absoliučiuosius kelius failuose `server.js` bei `required-server-files.json`, kad paketą būtų galima perkelti.
3. `electron-builder` supakuoja `main.js`, `preload.js`, `node_modules` ir `extraResources: { ../.next/electron-standalone → app }`.

### Kompiliavimo tikslai

| OS      | Tikslai                                           |
| ------- | ------------------------------------------------- |
| Windows | NSIS diegimo programa + nešiojamoji versija (x64) |
| macOS   | DMG (Intel + arm64, nuvelkama į „Applications“)   |
| Linux   | AppImage + DEB (x64 + arm64)                      |

NSIS nustatymai: `oneClick: false`, leidžia naudotojui pasirinkti diegimo katalogą, sukuria darbalaukio ir meniu „Start“ nuorodas.

## Supakuotos versijos bazinis testavimas

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Automatiškai aptinka dabartinei platformai skirtą supakuotą vykdomąjį failą kataloge `electron/dist-electron/`.
- Paleidžia su izoliuotais `HOME`/`APPDATA`/`XDG_*` katalogais, kad nebūtų paveikti kūrėjo duomenys.
- Iki 45 s periodiškai tikrina `http://127.0.0.1:20128/login`, laukdamas HTTP 200 atsako.
- Stebi stderr/stdout ir ieško kritinių šablonų (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` ir kt.).
- Kai sistema tampa paruošta, laukia 2 s stabilaus veikimo, tada siunčia SIGTERM ir laukia, kol prievadas bus atlaisvintas.
- CI aplinkoje automatiškai perduoda `--no-sandbox --disable-gpu` (o Linux sistemoje ir `--disable-dev-shm-usage`).

Aplinkos kintamųjų perrašymai: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kodo pasirašymas

Faile `electron/package.json` pasirašymo prisijungimo duomenys **nėra** tiesiogiai sukonfigūruoti. Perduokite juos `electron-builder` naudodami aplinkos kintamuosius:

### macOS

```bash
export APPLE_ID=<el. paštas>
export APPLE_APP_SPECIFIC_PASSWORD=<slaptažodis>
export APPLE_TEAM_ID=<id>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<sertifikato-slaptažodis>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<sertifikato-slaptažodis>
npm run electron:build:win
```

### Linux

AppImage pasirašymas neprivalomas — norėdami pasirašyti, nustatykite `LINUX_GPG_KEY`.

## Platinimas

Artefaktai išsaugomi kataloge `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Leidos skelbiamos GitHub Releases (`diegosouzapw/OmniRoute`), kur `electron-updater` taip pat tikrina, ar yra naujų versijų.

## Trikčių diagnostika

| Požymis                                                                      | Sprendimas                                                                                                                                                                                                           |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` atnaujinus pagrindinę Electron versiją | better-sqlite3 v13 pateikia Node-API iš anksto sukompiliuotus failus — dar kartą paleiskite `npm install` šakniniame kataloge ir `prepare:bundle` (ji patikrina dabartinės platformos iš anksto sukompiliuotą failą) |
| `ERR_DLOPEN_FAILED` savajam moduliui                                         | Dar kartą paleiskite `prepare:bundle` — ji iš karto nutraukia darbą, jei nėra dabartinei platformai skirto Node-API iš anksto sukompiliuoto failo                                                                    |
| Linux sistemoje rodomas tuščias langas                                       | Patikrinkite, ar Next.js serveris iš tikrųjų prisijungė prie PORT (patikrinkite `[Server]` žurnalus)                                                                                                                 |
| macOS notarizavimas užstringa                                                | Įsitikinkite, kad `APPLE_*` kintamieji eksportuoti, o ne tik nurodyti `.env`                                                                                                                                         |
| Windows SmartScreen įspėjimas                                                | Pasirašykite naudodami EV sertifikatą arba naudotojai gali spustelėti dešiniuoju pelės mygtuku → „Run anyway“                                                                                                        |
| Bazinis testas nepavyksta, nes prievadas naudojamas                          | Prieš paleisdami `electron:smoke:packaged`, sustabdykite bet kurį vietinį kūrimo serverį, naudojantį 20128                                                                                                           |

## Taip pat žr.

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Šaltinis: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pagalbiniai failai: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
