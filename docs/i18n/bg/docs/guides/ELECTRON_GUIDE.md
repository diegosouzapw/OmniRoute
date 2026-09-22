# Electron Desktop Guide (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Източник на истина:** работното пространство `electron/`
> **Последна актуализация:** 2026-06-28 — v3.8.40

OmniRoute включва междуплатформено настолно приложение (Windows / macOS / Linux), изградено с
**Electron 41** + **electron-builder 26.10**. Настолното приложение стартира самостоятелния сървър на Next.js
като дъщерен процес, насочва `BrowserWindow` към него и добавя
системна област, автоматично обновяване, IPC мост и автоматично конфигуриране на тайни без необходимост от настройки.

## Архитектура

```
┌──────────────────────────────────────────────────────┐
│ Основен процес на Electron (electron/main.js)        │
│ ├─ Заключване до единствен екземпляр                 │
│ ├─ Дъщерен процес: самостоятелен сървър на Next.js   │
│ │   (стартиран чрез Node средата на Electron)        │
│ ├─ BrowserWindow → http://localhost:PORT             │
│ ├─ Системна област + контекстно меню                 │
│ ├─ Автоматично обновяване чрез electron-updater      │
│ ├─ Политика за сигурност на съдържанието             │
│ │   (заглавки на сесията)                            │
│ └─ Автоматично конфигуриране на тайни                │
│     (JWT / API_KEY_SECRET)                           │
└──────────────────────────────────────────────────────┘
                 ↕ IPC мост (electron/preload.js)
┌──────────────────────────────────────────────────────┐
│ Процес за визуализация (табло за управление Next.js) │
│   window.electronAPI.* (contextIsolation)            │
└──────────────────────────────────────────────────────┘
```

## Версии

Потвърдено от `electron/package.json`:

| Пакет                         | Версия                                                                                |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| `electron`                    | `^43.4.1`                                                                             |
| `electron-builder`            | `^26.15.3`                                                                            |
| `electron-updater`            | `^6.8.9`                                                                              |
| `better-sqlite3`              | основна `^13.0.2` (готови Node-API компилации — без повторно компилиране за Electron) |
| Версия на приложението        | `3.8.0`                                                                               |
| Идентификатор на приложението | `online.omniroute.desktop`                                                            |
| Име на продукта               | `OmniRoute`                                                                           |

## Скриптове (основен `package.json`)

| Скрипт                            | Предназначение                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Стартира `npm run dev` + изчаква `localhost:20128` + стартира Electron                      |
| `npm run electron:build`          | Компилира Next.js, след което изпълнява `electron-builder` за текущата операционна система  |
| `npm run electron:build:win`      | Създава NSIS инсталатор за Windows + преносима версия (x64)                                 |
| `npm run electron:build:mac`      | Създава DMG за macOS (Intel + Apple Silicon)                                                |
| `npm run electron:build:linux`    | Създава AppImage + DEB за Linux (x64 + arm64)                                               |
| `npm run electron:smoke:packaged` | Стартира пакетирания изпълним файл и проверява `/login` за HTTP 200, след което го изключва |

Работното пространство `electron/` предоставя също:

- `npm run prepare:bundle` — изпълнява `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — компилации на macOS за отделна архитектура
- `npm run pack` — компилация само като директория за локално тестване (без инсталатор)

## Структура на директориите

```
electron/
├── package.json              # Зависимости на Electron + конфигурация на electron-builder
├── main.js                   # Основен процес (24 KB — вижте поясненията по-долу)
├── preload.js                # IPC мост чрез contextBridge
├── types.d.ts                # Типове AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Бележки в работното пространство
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Изходни файлове на electron-builder (игнорирани от git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Подготвя пакета .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Бърз тест след компилиране
```

Както `main.js`, така и `preload.js` са **CommonJS `.js` файлове**, а не TypeScript. Типовите
дефиниции за страната на рендерера се намират в `electron/types.d.ts`.

## IPC мост (`preload.js`)

Предварително зарежданият скрипт предоставя API от разрешен списък чрез `contextBridge`
в `window.electronAPI` с `contextIsolation: true` и `nodeIntegration: false`.

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

Предоставени методи:

| Извикване от рендерера                                            | Тип                                      |
| ----------------------------------------------------------------- | ---------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                   |
| `openExternal(url)`                                               | invoke                                   |
| `getDataDir()`                                                    | invoke                                   |
| `restartServer()`                                                 | invoke                                   |
| `getAppVersion()`                                                 | invoke                                   |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                   |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                     |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (връща функция за освобождаване) |

Помощните функции за получаване връщат **функция за освобождаване**, вместо да разчитат на
`removeAllListeners` — това предотвратява натрупването на слушатели при повторно
монтиране на React компоненти.

## Жизнен цикъл на сървъра

`main.js` стартира самостоятелния пакет на Next.js директно с Node средата за изпълнение
на Electron, за да избегне несъвместимост на ABI на нативните модули със системния Node:

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

Основни моменти:

- `waitForServer()` проверява периодично URL адреса до 30 s, преди да покаже прозореца (без празен екран при студено стартиране).
- `stdio: "pipe"` прихваща stdout/stderr; фразите за готовност (`Ready` / `listening`) изпращат `server-status: running` чрез IPC.
- `before-quit` изчаква до 5 s за коректно приключване със SIGTERM (WAL checkpoint), след което изпраща SIGKILL.
- Превключвателят на портове в системната област (`20128`, `3000`, `8080`) спира и рестартира сървъра, след което презарежда BrowserWindow.

## Инициализиране на тайни без конфигурация

При първото стартиране основният процес автоматично генерира и съхранява липсващите тайни:

| Тайна                    | Източник                                                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                   |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (отказва, ако вече съществуват криптирани идентификационни данни) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                   |

Съхраняват се в `<DATA_DIR>/server.env`. `DATA_DIR` се определя като:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` или `~/.omniroute`
- macOS: `~/.omniroute`

## Прозорец и системна област

- `BrowserWindow`: 1400×900 (мин. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, бутоните за управление на прозореца са на `{ x: 16, y: 16 }`.
- Windows/Linux: стандартна заглавна лента.
- Бутонът за затваряне минимизира приложението в системната област; менюто в системната област съдържа **Отваряне на OmniRoute**, **Отваряне на таблото** (във външен браузър), подменю **Порт на сървъра**, **Проверка за актуализации**, **Изход**.

## Политика за сигурност на съдържанието

Задава се чрез `session.defaultSession.webRequest.onHeadersReceived`. По-важни директиви:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Режимът за разработка добавя `'unsafe-eval'` само към `script-src`

## Автоматично актуализиране

Използва `electron-updater` с доставчика GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Събитията се препращат към процеса за визуализация чрез `update-status` IPC:
  `checking`, `available`, `not-available`, `downloading` (с `percent`), `downloaded`, `error`
- `installUpdate()` прекратява сървъра, след което извиква `autoUpdater.quitAndInstall()`
- Пропуска се в режим за разработка (`!app.isPackaged`)

## Процес на компилиране

1. `npm run build` → самостоятелна версия на Next.js в `.next/standalone`.
2. `prepare-electron-standalone.mjs` → подготвя я отново в `.next/electron-standalone` и пренаписва абсолютните пътища в `server.js` + `required-server-files.json`, така че пакетът да може да бъде преместван.
3. `electron-builder` пакетира `main.js`, `preload.js`, `node_modules` и `extraResources: { ../.next/electron-standalone → app }`.

### Целеви платформи за компилиране

| ОС      | Целеви формати                                 |
| ------- | ---------------------------------------------- |
| Windows | NSIS инсталатор + преносима версия (x64)       |
| macOS   | DMG (Intel + arm64, плъзгане към Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                   |

Настройки на NSIS: `oneClick: false`, позволява на потребителя да избере директорията за инсталиране и създава преки пътища на работния плот и в менюто „Старт“.

## Базово тестване на пакетирана версия

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Автоматично открива пакетирания изпълним файл в `electron/dist-electron/` за текущата платформа.
- Стартира с изолирани директории `HOME`/`APPDATA`/`XDG_*`, така че да не засяга данните на разработчика.
- Проверява периодично `http://127.0.0.1:20128/login` за HTTP 200 в рамките на 45 s.
- Следи stderr/stdout за фатални шаблони (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` и др.).
- Изчаква 2 s стабилна работа след установяване на готовност, след което изпраща SIGTERM и изчаква портът да се освободи.
- В CI автоматично подава `--no-sandbox --disable-gpu` (и `--disable-dev-shm-usage` под Linux).

Заместващи стойности чрез променливи на средата: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Подписване на кода

`electron/package.json` **не** свързва директно идентификационните данни за подписване. Подайте ги чрез променливи на средата към `electron-builder`:

### macOS

```bash
export APPLE_ID=<имейл>
export APPLE_APP_SPECIFIC_PASSWORD=<парола>
export APPLE_TEAM_ID=<идентификатор>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<парола-на-сертификата>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<парола-на-сертификата>
npm run electron:build:win
```

### Linux

Подписването на AppImage не е задължително — задайте `LINUX_GPG_KEY`, ако искате подписване.

## Разпространение

Артефактите се записват в `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Изданията се публикуват в GitHub Releases (`diegosouzapw/OmniRoute`), където `electron-updater` проверява и за нови версии.

## Отстраняване на неизправности

| Симптом                                                                     | Решение                                                                                                                                                                                                                   |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` след основна актуализация на Electron | better-sqlite3 v13 предоставя предварително компилирани Node-API версии — изпълнете отново `npm install` в главната директория и `prepare:bundle` (то проверява предварително компилираната версия за текущата платформа) |
| `ERR_DLOPEN_FAILED` за нативен модул                                        | Изпълнете отново `prepare:bundle` — то прекратява незабавно с грешка, когато липсва предварително компилираната Node-API версия за текущата платформа                                                                     |
| Прозорецът изглежда празен в Linux                                          | Потвърдете, че сървърът на Next.js действително е свързан към PORT (проверете журналите `[Server]`)                                                                                                                       |
| Нотаризацията в macOS блокира                                               | Уверете се, че променливите `APPLE_*` са експортирани, а не само зададени в `.env`                                                                                                                                        |
| Предупреждение от Windows SmartScreen                                       | Подпишете с EV сертификат или потребителите да щракнат с десния бутон → „Изпълни въпреки това“                                                                                                                            |
| Бързият тест е неуспешен поради зает порт                                   | Спрете всеки локален сървър за разработка на порт 20128, преди да изпълните `electron:smoke:packaged`                                                                                                                     |

## Вижте също

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Изходен код: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Помощни скриптове: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
