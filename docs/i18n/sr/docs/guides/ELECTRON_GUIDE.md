# Electron Desktop Guide (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Извор истине:** радни простор `electron/`
> **Последње ажурирање:** 2026-06-28 — v3.8.40

OmniRoute се испоручује као вишеплатформска десктоп апликација (Windows / macOS / Linux) изграђена на
**Electron 41** + **electron-builder 26.10**. Десктоп апликација покреће самостални Next.js
сервер као подређени процес, усмерава `BrowserWindow` ка њему и додаје
системску палету, аутоматско ажурирање, IPC мост и иницијализацију тајни без конфигурације.

## Архитектура

```
┌──────────────────────────────────────────────┐
│ Главни Electron процес (electron/main.js)    │
│ ├─ Закључавање на једну инстанцу             │
│ ├─ Подређени процес: самостални Next.js      │
│ │   сервер (покренут Electron Node окружењем)│
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Системска палета + контекстни мени        │
│ ├─ Аутоматско ажурирање преко electron-updater│
│ ├─ Content Security Policy (заглавља сесије) │
│ └─ Иницијализација тајни (JWT / API_KEY_SECRET)│
└──────────────────────────────────────────────┘
            ↕ IPC мост (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Приказивач (Next.js контролна табла)         │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## Верзије

Потврђено на основу `electron/package.json`:

| Пакет              | Верзија                                                                      |
| ------------------ | ---------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                    |
| `electron-builder` | `^26.15.3`                                                                   |
| `electron-updater` | `^6.8.9`                                                                     |
| `better-sqlite3`   | коренски `^13.0.2` (Node-API готове верзије — без Electron поновне изградње) |
| Верзија апликације | `3.8.0`                                                                      |
| ID апликације      | `online.omniroute.desktop`                                                   |
| Назив производа    | `OmniRoute`                                                                  |

## Скрипте (коренски `package.json`)

| Скрипта                           | Намена                                                                                             |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Покреће `npm run dev` + чека `localhost:20128` + покреће Electron                                  |
| `npm run electron:build`          | Израђује Next.js, а затим покреће `electron-builder` за тренутни оперативни систем                 |
| `npm run electron:build:win`      | Израђује Windows NSIS инсталер + преносиву верзију (x64)                                           |
| `npm run electron:build:mac`      | Израђује macOS DMG (Intel + Apple Silicon)                                                         |
| `npm run electron:build:linux`    | Израђује Linux AppImage + DEB (x64 + arm64)                                                        |
| `npm run electron:smoke:packaged` | Покреће упаковану бинарну датотеку и проверава да ли `/login` враћа HTTP 200, а затим је искључује |

Радни простор `electron/` такође пружа:

- `npm run prepare:bundle` — покреће `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — macOS израде за појединачне архитектуре
- `npm run pack` — израда само директоријума за локално тестирање (без инсталера)

## Распоред директоријума

```
electron/
├── package.json              # Electron зависности + electron-builder конфигурација
├── main.js                   # Главни процес (24 KB — погледајте напомене испод)
├── preload.js                # contextBridge IPC мост
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI типови
├── README.md                 # Напомене унутар радног простора
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder излаз (игнорише га git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Припрема .next/electron-standalone пакет
└── dev/
    └── smoke-electron-packaged.mjs       # Smoke тест након изградње
```

И `main.js` и `preload.js` су **CommonJS `.js` датотеке**, а не TypeScript. Типови
за renderer страну налазе се у `electron/types.d.ts`.

## IPC мост (`preload.js`)

Preload излаже API са листом дозвољених метода на `window.electronAPI` користећи `contextBridge`
са `contextIsolation: true` и `nodeIntegration: false`.

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

Изложене методе:

| Позив из renderer-а                                               | Тип                     |
| ----------------------------------------------------------------- | ----------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                  |
| `openExternal(url)`                                               | invoke                  |
| `getDataDir()`                                                    | invoke                  |
| `restartServer()`                                                 | invoke                  |
| `getAppVersion()`                                                 | invoke                  |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                  |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                    |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (враћа уклањач) |

Помоћне receive функције враћају **функцију за уклањање** уместо да се ослањају на
`removeAllListeners` — тиме се спречава нагомилавање слушалаца када се React компоненте
поново монтирају.

## Животни циклус сервера

`main.js` директно покреће самостални Next.js пакет помоћу Electron Node
окружења како би се избегла неусклађеност ABI-ја изворних модула са системским Node-ом:

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

Најважније:

- `waitForServer()` проверава URL до 30 s пре приказивања прозора (нема празног екрана при хладном покретању).
- `stdio: "pipe"` хвата stdout/stderr; фразе које означавају спремност (`Ready` / `listening`) емитују `server-status: running` преко IPC-а.
- `before-quit` чека до 5 s на уредан SIGTERM (WAL checkpoint), а затим шаље SIGKILL.
- Прекидач порта у системској палети (`20128`, `3000`, `8080`) зауставља и поново покреће сервер, а затим поново учитава BrowserWindow.

## Аутоматско иницијализовање тајни без конфигурације

При првом покретању, главни процес аутоматски генерише и трајно чува недостајуће тајне:

| Тајна                    | Извор                                                                                  |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                               |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (одбија ако шифровани акредитиви већ постоје) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                               |

Трајно се чувају у `<DATA_DIR>/server.env`. `DATA_DIR` се разрешава на:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` или `~/.omniroute`
- macOS: `~/.omniroute`

## Прозор и системска палета

- `BrowserWindow`: 1400×900 (минимално 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, дугмад за управљање прозором на `{ x: 16, y: 16 }`.
- Windows/Linux: изворна насловна трака.
- Дугме за затварање минимизује апликацију у системску палету; мени системске палете садржи **Отвори OmniRoute**, **Отвори контролну таблу** (у спољном прегледачу), подмени **Порт сервера**, **Провери ажурирања**, **Изађи**.

## Политика безбедности садржаја

Поставља се преко `session.defaultSession.webRequest.onHeadersReceived`. Значајне директиве:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Режим развоја додаје `'unsafe-eval'` само у `script-src`

## Аутоматско ажурирање

Користи `electron-updater` са GitHub добављачем (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Догађаји се прослеђују процесу за приказ преко `update-status` IPC-а:
  `checking`, `available`, `not-available`, `downloading` (са `percent`), `downloaded`, `error`
- `installUpdate()` зауставља сервер, а затим позива `autoUpdater.quitAndInstall()`
- Прескаче се у режиму развоја (`!app.isPackaged`)

## Процес изградње

1. `npm run build` → самостална Next.js апликација у `.next/standalone`.
2. `prepare-electron-standalone.mjs` → поново смешта садржај у `.next/electron-standalone` и преписује апсолутне путање унутар `server.js` + `required-server-files.json` како би пакет могао да се премешта.
3. `electron-builder` пакује `main.js`, `preload.js`, `node_modules` и `extraResources: { ../.next/electron-standalone → app }`.

### Циљеви изградње

| ОС      | Циљеви                                         |
| ------- | ---------------------------------------------- |
| Windows | NSIS инсталатор + преносива верзија (x64)      |
| macOS   | DMG (Intel + arm64, превлачење у Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                   |

NSIS подешавања: `oneClick: false`, омогућава кориснику да изабере директоријум за инсталацију и креира пречице на радној површини и у менију Start.

## Основно тестирање упаковане верзије

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Аутоматски проналази упаковану извршну датотеку у `electron/dist-electron/` за тренутну платформу.
- Покреће је са изолованим директоријумима `HOME`/`APPDATA`/`XDG_*` како не би приступала подацима програмера.
- Проверава `http://127.0.0.1:20128/login` док не добије HTTP 200 у року од 45 s.
- Надгледа stderr/stdout ради фаталних образаца (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, итд.).
- Након што апликација постане спремна, чека 2 s стабилног рада, затим шаље SIGTERM и чека да се порт ослободи.
- У CI окружењу аутоматски прослеђује `--no-sandbox --disable-gpu` (и `--disable-dev-shm-usage` на Linux-у).

Замене преко променљивих окружења: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Потписивање кода

`electron/package.json` **не** повезује директно акредитиве за потписивање. Проследите их алатки `electron-builder` путем променљивих окружења:

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

Потписивање AppImage датотеке је опционо — подесите `LINUX_GPG_KEY` ако је потребно потписивање.

## Дистрибуција

Артефакти се смештају у `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Издања се објављују у GitHub Releases (`diegosouzapw/OmniRoute`), где и `electron-updater` проверава да ли постоје нове верзије.

## Решавање проблема

| Симптом                                                                                | Решење                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` након преласка на нову главну верзију Electron-а | better-sqlite3 v13 испоручује унапред изграђене Node-API бинарне датотеке — поново покрените `npm install` у кореном директоријуму и `prepare:bundle` (он проверава унапред изграђену бинарну датотеку за тренутну платформу) |
| `ERR_DLOPEN_FAILED` за изворни модул                                                   | Поново покрените `prepare:bundle` — он одмах пријављује грешку када недостаје унапред изграђена Node-API бинарна датотека за тренутну платформу                                                                               |
| Прозор је празан на Linux-у                                                            | Потврдите да се Next.js сервер заиста повезао са променљивом PORT (проверите `[Server]` евиденције)                                                                                                                           |
| Нотаризација на macOS-у се зауставља                                                   | Уверите се да су променљиве `APPLE_*` извезене, а не само наведене у `.env` датотеци                                                                                                                                          |
| Windows SmartScreen упозорење                                                          | Потпишите EV сертификатом или нека корисници кликну десним тастером миша → „Ипак покрени“                                                                                                                                     |
| Брзи тест не успева јер је порт заузет                                                 | Зауставите све локалне развојне сервере на порту 20128 пре покретања `electron:smoke:packaged`                                                                                                                                |

## Погледајте и

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Изворни код: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Помоћне скрипте: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
