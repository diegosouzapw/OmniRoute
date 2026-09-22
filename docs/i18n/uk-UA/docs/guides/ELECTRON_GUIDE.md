# Electron Desktop Guide (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Джерело істини:** робочий простір `electron/`
> **Останнє оновлення:** 2026-06-28 — v3.8.40

OmniRoute постачається як кросплатформний настільний застосунок (Windows / macOS / Linux), створений на основі
**Electron 41** + **electron-builder 26.10**. Настільний застосунок запускає автономний сервер Next.js
як дочірній процес, спрямовує на нього `BrowserWindow` і додає
системний трей, автоматичне оновлення, IPC-міст та ініціалізацію секретів без налаштування.

## Архітектура

```
┌──────────────────────────────────────────────────┐
│ Головний процес Electron (electron/main.js)      │
│ ├─ Блокування одного екземпляра                  │
│ ├─ Дочірній процес: автономний сервер Next.js    │
│ │   (запущений у середовищі Node від Electron)   │
│ ├─ BrowserWindow → http://localhost:PORT         │
│ ├─ Системний трей + контекстне меню              │
│ ├─ Автооновлення через electron-updater          │
│ ├─ Політика безпеки вмісту (заголовки сеансу)    │
│ └─ Ініціалізація секретів (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────────┘
            ↕ IPC-міст (electron/preload.js)
┌──────────────────────────────────────────────────┐
│ Процес рендерингу (панель керування Next.js)     │
│   window.electronAPI.* (contextIsolation)        │
└──────────────────────────────────────────────────┘
```

## Версії

Підтверджено за `electron/package.json`:

| Пакет                    | Версія                                                                      |
| ------------------------ | --------------------------------------------------------------------------- |
| `electron`               | `^43.4.1`                                                                   |
| `electron-builder`       | `^26.15.3`                                                                  |
| `electron-updater`       | `^6.8.9`                                                                    |
| `better-sqlite3`         | коренева `^13.0.2` (готові збірки Node-API — без повторної збірки Electron) |
| Версія застосунку        | `3.8.0`                                                                     |
| Ідентифікатор застосунку | `online.omniroute.desktop`                                                  |
| Назва продукту           | `OmniRoute`                                                                 |

## Скрипти (кореневий `package.json`)

| Скрипт                            | Призначення                                                                                        |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Запускає `npm run dev` + очікує на `localhost:20128` + запускає Electron                           |
| `npm run electron:build`          | Збирає Next.js, а потім запускає `electron-builder` для поточної ОС                                |
| `npm run electron:build:win`      | Збирає інсталятор Windows NSIS + портативну версію (x64)                                           |
| `npm run electron:build:mac`      | Збирає DMG для macOS (Intel + Apple Silicon)                                                       |
| `npm run electron:build:linux`    | Збирає AppImage + DEB для Linux (x64 + arm64)                                                      |
| `npm run electron:smoke:packaged` | Запускає запакований виконуваний файл і перевіряє `/login` на HTTP 200, після чого завершує роботу |

Робочий простір `electron/` також надає:

- `npm run prepare:bundle` — запускає `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — збірки macOS для окремих архітектур
- `npm run pack` — збірка лише каталогу для локального тестування (без інсталятора)

## Структура каталогів

```
electron/
├── package.json              # Залежності Electron + конфігурація electron-builder
├── main.js                   # Головний процес (24 КБ — див. примітки нижче)
├── preload.js                # IPC-міст contextBridge
├── types.d.ts                # Типи AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Нотатки в робочому просторі
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Результати electron-builder (ігноруються git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Готує пакет .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Димовий тест після збірки
```

І `main.js`, і `preload.js` є **файлами CommonJS `.js`**, а не TypeScript. Типи
для рендерера містяться в `electron/types.d.ts`.

## IPC-міст (`preload.js`)

Сценарій попереднього завантаження надає дозволений API через `window.electronAPI` за допомогою `contextBridge`
з `contextIsolation: true` і `nodeIntegration: false`.

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

Доступні методи:

| Виклик із рендерера                                               | Тип                                 |
| ----------------------------------------------------------------- | ----------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                              |
| `openExternal(url)`                                               | invoke                              |
| `getDataDir()`                                                    | invoke                              |
| `restartServer()`                                                 | invoke                              |
| `getAppVersion()`                                                 | invoke                              |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                              |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (повертає функцію очищення) |

Допоміжні функції receive повертають **функцію очищення**, а не покладаються на
`removeAllListeners` — це запобігає накопиченню обробників під час повторного
монтування компонентів React.

## Життєвий цикл сервера

`main.js` запускає автономний пакет Next.js безпосередньо за допомогою середовища
виконання Node в Electron, щоб уникнути невідповідності ABI нативних модулів із системним Node:

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

Основні моменти:

- `waitForServer()` опитує URL протягом щонайбільше 30 с перед відображенням вікна (без порожнього екрана під час холодного запуску).
- `stdio: "pipe"` перехоплює stdout/stderr; фрази готовності (`Ready` / `listening`) надсилають `server-status: running` через IPC.
- `before-quit` очікує до 5 с на коректне завершення через SIGTERM (контрольна точка WAL), а потім надсилає SIGKILL.
- Перемикач портів у треї (`20128`, `3000`, `8080`) зупиняє та перезапускає сервер, а потім перезавантажує BrowserWindow.

## Ініціалізація секретів без конфігурації

Під час першого запуску головний процес автоматично генерує та зберігає відсутні секрети:

| Секрет                   | Джерело                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                       |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (відмова, якщо зашифровані облікові дані вже існують) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                       |

Зберігаються у `<DATA_DIR>/server.env`. Значення `DATA_DIR` визначається так:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` або `~/.omniroute`
- macOS: `~/.omniroute`

## Вікно та системний трей

- `BrowserWindow`: 1400×900 (мінімум 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, кнопки керування вікном у `{ x: 16, y: 16 }`.
- Windows/Linux: нативний рядок заголовка.
- Кнопка закриття згортає програму до системного трея; меню трея містить **Відкрити OmniRoute**, **Відкрити панель керування** (у зовнішньому браузері), підменю **Порт сервера**, **Перевірити наявність оновлень**, **Вийти**.

## Політика безпеки вмісту

Задається через `session.defaultSession.webRequest.onHeadersReceived`. Важливі директиви:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- У режимі розробки `'unsafe-eval'` додається лише до `script-src`

## Автоматичне оновлення

Використовує `electron-updater` із провайдером GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Події передаються до процесу візуалізації через IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (із `percent`), `downloaded`, `error`
- `installUpdate()` завершує роботу сервера, а потім викликає `autoUpdater.quitAndInstall()`
- Пропускається в режимі розробки (`!app.isPackaged`)

## Конвеєр збирання

1. `npm run build` → автономна збірка Next.js у `.next/standalone`.
2. `prepare-electron-standalone.mjs` → повторно розміщує файли в `.next/electron-standalone` і переписує абсолютні шляхи всередині `server.js` + `required-server-files.json`, щоб пакет можна було переміщувати.
3. `electron-builder` пакує `main.js`, `preload.js`, `node_modules` і `extraResources: { ../.next/electron-standalone → app }`.

### Цільові платформи збирання

| ОС      | Цільові формати                                    |
| ------- | -------------------------------------------------- |
| Windows | інсталятор NSIS + портативна версія (x64)          |
| macOS   | DMG (Intel + arm64, перетягування до Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                       |

Налаштування NSIS: `oneClick: false`, дає користувачеві змогу вибрати каталог встановлення, створює ярлики на робочому столі та в меню «Пуск».

## Димове тестування упакованої збірки

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Автоматично знаходить упакований виконуваний файл у `electron/dist-electron/` для поточної платформи.
- Запускає його з ізольованими каталогами `HOME`/`APPDATA`/`XDG_*`, щоб не зачіпати дані розробника.
- Опитує `http://127.0.0.1:20128/login`, очікуючи HTTP 200 протягом 45 с.
- Відстежує stderr/stdout на наявність шаблонів критичних помилок (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` тощо).
- Після готовності очікує 2 с стабільної роботи, потім надсилає SIGTERM і чекає на звільнення порту.
- У CI автоматично передає `--no-sandbox --disable-gpu` (а також `--disable-dev-shm-usage` у Linux).

Перевизначення через змінні середовища: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Підписування коду

`electron/package.json` **не** налаштовує облікові дані для підписування безпосередньо. Передайте їх через змінні середовища до `electron-builder`:

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

Підписування AppImage необов’язкове — для підписування задайте `LINUX_GPG_KEY`.

## Розповсюдження

Артефакти розміщуються в `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Релізи публікуються в GitHub Releases (`diegosouzapw/OmniRoute`), де `electron-updater` також перевіряє наявність нових версій.

## Усунення несправностей

| Симптом                                                                  | Виправлення                                                                                                                                                                                                            |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` після основного оновлення Electron | better-sqlite3 v13 постачається з попередньо зібраними бінарними файлами Node-API — повторно виконайте `npm install` у кореневому каталозі та `prepare:bundle` (він перевіряє попередню збірку для поточної платформи) |
| `ERR_DLOPEN_FAILED` для нативного модуля                                 | Повторно виконайте `prepare:bundle` — команда негайно завершується з помилкою, якщо попередня збірка Node-API для поточної платформи відсутня                                                                          |
| У Linux відображається порожнє вікно                                     | Переконайтеся, що сервер Next.js справді прив’язаний до PORT (перевірте журнали `[Server]`)                                                                                                                            |
| Нотаризація macOS зависає                                                | Переконайтеся, що змінні `APPLE_*` експортовані, а не лише вказані в `.env`                                                                                                                                            |
| Попередження Windows SmartScreen                                         | Підпишіть сертифікатом EV або попросіть користувачів клацнути правою кнопкою миші → «Run anyway»                                                                                                                       |
| Димовий тест завершується помилкою через зайнятий порт                   | Зупиніть усі локальні сервери розробки на порту 20128 перед запуском `electron:smoke:packaged`                                                                                                                         |

## Дивіться також

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Вихідний код: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Допоміжні засоби: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
