# Electron Desktop Guide (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Madogarar gaskiya:** filin aiki na `electron/`
> **Sabuntawa ta ƙarshe:** 2026-06-28 — v3.8.40

OmniRoute yana zuwa da manhajar tebur mai aiki a dandamali daban-daban (Windows / macOS / Linux), wadda aka gina a kan
**Electron 41** + **electron-builder 26.10**. Manhajar tebur tana ƙaddamar da sabar Next.js
mai zaman kanta a matsayin ƙaramin tsari, tana nuna `BrowserWindow` zuwa gare ta, sannan tana ƙara
tirensa na tsarin kwamfuta, mai sabuntawa ta atomatik, gadar IPC, da fara amfani da sirri ba tare da saiti ba.

## Tsarin gine-gine

```
┌──────────────────────────────────────────────┐
│ Babban tsarin Electron (electron/main.js)    │
│ ├─ Kulle na ƙaddamarwa guda ɗaya             │
│ ├─ Ƙaramin tsari: sabar Next.js mai zaman kanta│
│ │   (an ƙaddamar da ita da Node na Electron) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Tirensa na tsari + menu na mahallin aiki  │
│ ├─ Sabuntawa ta atomatik ta electron-updater │
│ ├─ Manufar Tsaron Abun Ciki (taken zaman)     │
│ └─ Fara amfani da sirri (JWT / API_KEY_SECRET)│
└──────────────────────────────────────────────┘
            ↕ Gadar IPC (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Mai nunawa (allon sarrafa Next.js)           │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## Nau'ikan sigogi

An tabbatar daga `electron/package.json`:

| Kunshin            | Sigo                                                            |
| ------------------ | --------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                       |
| `electron-builder` | `^26.15.3`                                                      |
| `electron-updater` | `^6.8.9`                                                        |
| `better-sqlite3`   | tushen `^13.0.2` (ginannun Node-API — babu sake ginin Electron) |
| Sigar manhaja      | `3.8.0`                                                         |
| ID na manhaja      | `online.omniroute.desktop`                                      |
| Sunan samfur       | `OmniRoute`                                                     |

## Rubutun umarni (`package.json` na tushe)

| Rubutun umarni                    | Manufa                                                                                    |
| --------------------------------- | ----------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Yana fara `npm run dev` + yana jiran `localhost:20128` + yana ƙaddamar da Electron        |
| `npm run electron:build`          | Yana gina Next.js sannan ya gudanar da `electron-builder` don OS na yanzu                 |
| `npm run electron:build:win`      | Yana gina mai shigar da Windows na NSIS + sigar šaukuwa (x64)                             |
| `npm run electron:build:mac`      | Yana gina DMG na macOS (Intel + Apple Silicon)                                            |
| `npm run electron:build:linux`    | Yana gina AppImage + DEB na Linux (x64 + arm64)                                           |
| `npm run electron:smoke:packaged` | Yana ƙaddamar da binary da aka shirya, ya gwada `/login` don HTTP 200, sannan ya rufe shi |

Filin aiki na `electron/` kuma yana samar da:

- `npm run prepare:bundle` — yana gudanar da `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — ginin macOS na tsari guda
- `npm run pack` — ginin kundin adireshi kawai don gwaji na cikin gida (babu mai shigarwa)

## Tsarin Kundin Fayiloli

```
electron/
├── package.json              # Dogarorin Electron + saitunan electron-builder
├── main.js                   # Babban tsari (24 KB — duba bayanan da ke ƙasa)
├── preload.js                # Gadar IPC ta contextBridge
├── types.d.ts                # Nau'ikan AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Bayanan kula na cikin filin aiki
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Sakamakon electron-builder (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Yana shirya kunshin .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Gwajin smoke bayan ginawa
```

Dukansu `main.js` da `preload.js` **fayilolin CommonJS `.js` ne**, ba TypeScript ba. Bayanin nau'ikan
ɓangaren renderer yana cikin `electron/types.d.ts`.

## Gadar IPC (`preload.js`)

Preload yana samar da API da aka amince da shi a `window.electronAPI` ta amfani da `contextBridge`
tare da `contextIsolation: true` da `nodeIntegration: false`.

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

Hanyoyin da aka samar:

| Kiran renderer                                                    | Nau'i                           |
| ----------------------------------------------------------------- | ------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                          |
| `openExternal(url)`                                               | invoke                          |
| `getDataDir()`                                                    | invoke                          |
| `restartServer()`                                                 | invoke                          |
| `getAppVersion()`                                                 | invoke                          |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                          |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                            |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (yana dawo da disposer) |

Masu taimakon receive suna dawo da **aikin disposer** maimakon dogaro da
`removeAllListeners` — wannan yana hana taruwar listeners lokacin da aka sake
ɗora React components.

## Zagayowar Rayuwar Server

`main.js` yana ƙaddamar da kunshin standalone na Next.js kai tsaye da Electron Node
runtime domin kauce wa rashin dacewar ABI na native-module da Node na tsarin:

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

Muhimman bayanai:

- `waitForServer()` yana duba URL akai-akai har zuwa 30 s kafin nuna taga (babu allo marar komai yayin farawa daga sanyi).
- `stdio: "pipe"` yana karɓar stdout/stderr; jimlolin shirye (`Ready` / `listening`) suna aika `server-status: running` ta IPC.
- `before-quit` yana jira har zuwa 5 s domin SIGTERM ya rufe cikin tsari (WAL checkpoint), sannan ya aika SIGKILL.
- Mai sauya port a tray (`20128`, `3000`, `8080`) yana tsayarwa da sake kunna server, sannan ya sake loda BrowserWindow.

## Fara Sirri Ba Tare da Saiti Ba

A farkon ƙaddamarwa, babban tsari yana samarwa ta atomatik kuma yana adana sirrin da suka ɓace:

| Sirri                    | Tushe                                                                                                       |
| ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                    |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (yana ƙin ci gaba idan akwai bayanan shaidar da aka riga aka ɓoye) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                    |

Ana adana su a `<DATA_DIR>/server.env`. `DATA_DIR` yana zama:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ko `~/.omniroute`
- macOS: `~/.omniroute`

## Neman fayil ɗin muhalli

Kafin fara uwar garken, babban tsari (`getPreferredEnvFilePath()` a cikin
`electron/main.js`) yana zaɓar fayil ɗin `.env` **guda ɗaya**: na farko daga cikin waɗannan da yake akwai.

1. `$DATA_DIR/.env`, idan an saita `DATA_DIR` a cikin muhallin da aka ƙaddamar da manhajar da shi.
2. `<resolved DATA_DIR>/.env`, ta amfani da tsoffin ƙimomi iri ɗaya da na sama: `%APPDATA%\omniroute\.env` a
   Windows, `$XDG_CONFIG_HOME/omniroute/.env` ko `~/.omniroute/.env` a Linux da macOS.
3. `.env` a cikin kundin aiki na tsarin.

Babban tsari yana karanta wannan fayil ɗin kawai; ba a haɗa sauran zaɓuɓɓukan da ke biyo baya ba. Sannan
ana gina muhallin uwar garken da wannan fifiko (mafi girma da farko):

1. Muhallin tsarin Electron (canje-canjen da aka gada daga duk abin da ya ƙaddamar da manhajar).
2. Fayil ɗin `.env` da aka zaɓa.
3. `<DATA_DIR>/server.env` (sirrin farawa da ke sama).

Ana ɗaukar muhallin tsarin lokacin da manhajar ta fara, don haka canjin muhalli na tsarin kwamfuta ko na mai amfani
da aka saita yayin da manhajar ke gudana (har da lokacin da take zaune a tiren bayan an rufe tagarta)
ba zai isa uwar garken ba har sai an fita daga manhajar gaba ɗaya sannan aka sake ƙaddamar da ita. Don saitunan lokacin gudana
kamar `CONTEXT_LENGTH_<PROVIDER>` (duba
[Canje-canjen Muhalli: Tsawon mahallin kowane mai samarwa](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
fi so a yi amfani da fayil ɗin `.env`, sannan a fita gaba ɗaya (tire, **Fita**) kuma a sake ƙaddamarwa.

## Taga & Tire

- `BrowserWindow`: 1400×900 (mafi ƙaranci 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, maɓallan sarrafa taga a `{ x: 16, y: 16 }`.
- Windows/Linux: sandar take ta asali.
- Maɓallin rufewa yana rage manhajar zuwa tire; menu na tiren yana da **Buɗe OmniRoute**, **Buɗe Dashboard** (burauzar waje), ƙaramin menu na **Tashar Uwar Garke**, **Duba Sabuntawa**, **Fita**.

## Manufar Tsaron Abun Ciki

Ana saita ta hanyar `session.defaultSession.webRequest.onHeadersReceived`. Muhimman umarni:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Yanayin haɓakawa yana ƙara `'unsafe-eval'` zuwa `script-src` kawai

## Sabuntawa ta atomatik

Yana amfani da `electron-updater` tare da mai samar da GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Ana tura abubuwan da suka faru zuwa mai nunawa ta hanyar `update-status` IPC:
  `checking`, `available`, `not-available`, `downloading` (tare da `percent`), `downloaded`, `error`
- `installUpdate()` yana kashe uwar garken sannan ya kira `autoUpdater.quitAndInstall()`
- Ana tsallake shi a yanayin haɓakawa (`!app.isPackaged`)

## Bututun Ginawa

1. `npm run build` → Next.js mai cin gashin kansa a cikin `.next/standalone`.
2. `prepare-electron-standalone.mjs` → yana sake tsara fayilolin cikin `.next/electron-standalone` kuma yana sake rubuta cikakkun hanyoyi da ke cikin `server.js` + `required-server-files.json` domin a iya matsar da kunshin.
3. `electron-builder` yana kunshe `main.js`, `preload.js`, `node_modules`, da `extraResources: { ../.next/electron-standalone → app }`.

### Manufar ginawa

| OS      | Manufa                                    |
| ------- | ----------------------------------------- |
| Windows | Mai girka na NSIS + mai ɗaukuwa (x64)     |
| macOS   | DMG (Intel + arm64, ja-zuwa-Applications) |
| Linux   | AppImage + DEB (x64 + arm64)              |

Saitunan NSIS: `oneClick: false`, yana ba mai amfani damar zaɓar kundin shigarwa, kuma yana ƙirƙirar gajerun hanyoyi a Desktop da Start-Menu.

## Gwajin Hayaki na Kunshin Ginawa

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Yana gano binary ɗin da aka kunshe ta atomatik a cikin `electron/dist-electron/` don dandali na yanzu.
- Yana ƙaddamarwa tare da keɓantattun kundin `HOME`/`APPDATA`/`XDG_*` domin kada ya taɓa bayanan masu haɓakawa.
- Yana duba `http://127.0.0.1:20128/login` akai-akai don samun HTTP 200 cikin s 45.
- Yana sa ido kan stderr/stdout don alamomin matsala masu tsanani (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, da sauransu).
- Yana jira s 2 na aiki mai daidaito bayan shiri, sannan ya aika SIGTERM kuma ya jira tashar ta kuɓuta.
- A cikin CI, yana tura `--no-sandbox --disable-gpu` ta atomatik (da `--disable-dev-shm-usage` a Linux).

Sauya saituna ta env: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Sa Hannu kan Lamba

`electron/package.json` **ba ya** haɗa bayanan shaidar sa hannu kai tsaye. Tura su ta masu canjin env zuwa `electron-builder`:

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

Sa hannu kan AppImage zaɓi ne — saita `LINUX_GPG_KEY` idan za a yi sa hannu.

## Rarrabawa

Abubuwan da aka samar suna shiga `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Ana wallafa fitarwa zuwa GitHub Releases (`diegosouzapw/OmniRoute`), wanda kuma shi ne inda `electron-updater` yake bincika sababbin sigogi.

## Magance Matsaloli

| Alamar matsala                                                         | Gyara                                                                                                                                                                      |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` bayan babban ɗaukaka na Electron | better-sqlite3 v13 yana zuwa da Node-API prebuilds — sake gudanar da `npm install` a tushen aikin da kuma `prepare:bundle` (yana tabbatar da prebuild na dandali na yanzu) |
| `ERR_DLOPEN_FAILED` don native module                                  | Sake gudanar da `prepare:bundle` — yana dakatarwa nan take idan Node-API prebuild na dandali na yanzu ya ɓace                                                              |
| Taga tana bayyana babu komai a Linux                                   | Tabbatar cewa sabar Next.js ta ɗaure da PORT da gaske (duba bayanan aiki na `[Server]`)                                                                                    |
| Tabbatarwar notarization ta macOS tana tsaya wa                        | Tabbatar an fitar da masu canjin `APPLE_*`, ba wai suna cikin `.env` kawai ba                                                                                              |
| Gargadin Windows SmartScreen                                           | Yi sa hannu da takardar shaida ta EV, ko masu amfani su danna-dama → "Run anyway"                                                                                          |
| Gwajin hayaki ya gaza saboda ana amfani da tashar                      | Dakatar da duk wata sabar haɓakawa ta gida a 20128 kafin gudanar da `electron:smoke:packaged`                                                                              |

## Duba Kuma

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Tushe: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Mataimaka: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
