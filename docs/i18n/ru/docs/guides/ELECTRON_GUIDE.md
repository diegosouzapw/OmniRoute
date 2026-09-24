# Electron Desktop Guide (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Источник истины:** рабочая область `electron/`
> **Последнее обновление:** 2026-06-28 — v3.8.40

OmniRoute поставляется с кроссплатформенным настольным приложением (Windows / macOS / Linux), созданным на основе
**Electron 41** + **electron-builder 26.10**. Настольное приложение запускает автономный сервер Next.js
как дочерний процесс, направляет на него `BrowserWindow`, а также добавляет
системный трей, автоматическое обновление, IPC-мост и автоматическую инициализацию секретов без настройки.

## Архитектура

```
┌─────────────────────────────────────────────────┐
│ Основной процесс Electron (electron/main.js)     │
│ ├─ Блокировка единственного экземпляра          │
│ ├─ Дочерний процесс: автономный сервер Next.js  │
│ │   (запущен в среде Node из Electron)           │
│ ├─ BrowserWindow → http://localhost:PORT         │
│ ├─ Системный трей + контекстное меню             │
│ ├─ Автообновление через electron-updater         │
│ ├─ Content Security Policy (заголовки сеанса)    │
│ └─ Инициализация секретов (JWT / API_KEY_SECRET) │
└─────────────────────────────────────────────────┘
            ↕ IPC-мост (electron/preload.js)
┌─────────────────────────────────────────────────┐
│ Рендерер (панель управления Next.js)             │
│   window.electronAPI.* (contextIsolation)        │
└─────────────────────────────────────────────────┘
```

## Версии

Подтверждено по `electron/package.json`:

| Пакет                    | Версия                                                                          |
| ------------------------ | ------------------------------------------------------------------------------- |
| `electron`               | `^43.4.1`                                                                       |
| `electron-builder`       | `^26.15.3`                                                                      |
| `electron-updater`       | `^6.8.9`                                                                        |
| `better-sqlite3`         | корневой `^13.0.2` (готовые сборки Node-API — пересборка Electron не требуется) |
| Версия приложения        | `3.8.0`                                                                         |
| Идентификатор приложения | `online.omniroute.desktop`                                                      |
| Название продукта        | `OmniRoute`                                                                     |

## Скрипты (корневой `package.json`)

| Скрипт                            | Назначение                                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Запускает `npm run dev`, ожидает `localhost:20128` и запускает Electron                                 |
| `npm run electron:build`          | Собирает Next.js, затем запускает `electron-builder` для текущей ОС                                     |
| `npm run electron:build:win`      | Создает установщик Windows NSIS и переносную версию (x64)                                               |
| `npm run electron:build:mac`      | Создает DMG для macOS (Intel + Apple Silicon)                                                           |
| `npm run electron:build:linux`    | Создает AppImage и DEB для Linux (x64 + arm64)                                                          |
| `npm run electron:smoke:packaged` | Запускает упакованный исполняемый файл, проверяет ответ HTTP 200 для `/login`, а затем завершает работу |

Рабочая область `electron/` также предоставляет:

- `npm run prepare:bundle` — запускает `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — сборки macOS для одной архитектуры
- `npm run pack` — сборка только каталога для локального тестирования (без установщика)

## Структура каталогов

```
electron/
├── package.json              # Зависимости Electron + конфигурация electron-builder
├── main.js                   # Основной процесс (24 КБ — см. примечания ниже)
├── preload.js                # IPC-мост contextBridge
├── types.d.ts                # Типы AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Заметки в рабочем пространстве
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Выходные файлы electron-builder (игнорируются Git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Подготавливает пакет .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Дымовой тест после сборки
```

И `main.js`, и `preload.js` являются **файлами CommonJS `.js`**, а не TypeScript.
Типы для стороны рендерера находятся в `electron/types.d.ts`.

## IPC-мост (`preload.js`)

Скрипт preload предоставляет API из белого списка через `window.electronAPI`, используя `contextBridge`
с `contextIsolation: true` и `nodeIntegration: false`.

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

Предоставляемые методы:

| Вызов из рендерера                                                | Тип                                  |
| ----------------------------------------------------------------- | ------------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                               |
| `openExternal(url)`                                               | invoke                               |
| `getDataDir()`                                                    | invoke                               |
| `restartServer()`                                                 | invoke                               |
| `getAppVersion()`                                                 | invoke                               |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                               |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                 |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (возвращает функцию очистки) |

Вспомогательные функции receive возвращают **функцию очистки**, а не полагаются на
`removeAllListeners` — это предотвращает накопление обработчиков при повторном
монтировании компонентов React.

## Жизненный цикл сервера

`main.js` запускает автономный пакет Next.js непосредственно с помощью среды выполнения Node
из Electron, чтобы избежать несовместимости ABI нативных модулей с системным Node:

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

Основные особенности:

- `waitForServer()` опрашивает URL в течение максимум 30 с перед отображением окна (без пустого экрана при холодном запуске).
- `stdio: "pipe"` перехватывает stdout/stderr; фразы готовности (`Ready` / `listening`) отправляют `server-status: running` через IPC.
- `before-quit` ожидает до 5 с корректного завершения по SIGTERM (контрольная точка WAL), а затем отправляет SIGKILL.
- Переключатель портов в трее (`20128`, `3000`, `8080`) останавливает и перезапускает сервер, после чего перезагружает BrowserWindow.

## Инициализация секретов без настройки

При первом запуске основной процесс автоматически генерирует и сохраняет отсутствующие секреты:

| Секрет                   | Источник                                                                                           |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                           |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (отказ, если зашифрованные учётные данные уже существуют) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                           |

Сохраняются в `<DATA_DIR>/server.env`. `DATA_DIR` определяется следующим образом:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` или `~/.omniroute`
- macOS: `~/.omniroute`

## Окно и системный трей

- `BrowserWindow`: 1400×900 (минимум 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, кнопки управления окном расположены в `{ x: 16, y: 16 }`.
- Windows/Linux: нативная строка заголовка.
- Кнопка закрытия сворачивает приложение в системный трей; меню трея содержит пункты **Открыть OmniRoute**, **Открыть панель управления** (во внешнем браузере), подменю **Порт сервера**, **Проверить наличие обновлений**, **Выйти**.

## Политика безопасности содержимого

Задаётся через `session.defaultSession.webRequest.onHeadersReceived`. Основные директивы:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- В режиме разработки `'unsafe-eval'` добавляется только в `script-src`

## Автоматическое обновление

Используется `electron-updater` с провайдером GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- События передаются процессу рендеринга через IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (с `percent`), `downloaded`, `error`
- `installUpdate()` завершает работу сервера, а затем вызывает `autoUpdater.quitAndInstall()`
- Пропускается в режиме разработки (`!app.isPackaged`)

## Процесс сборки

1. `npm run build` → автономная сборка Next.js в `.next/standalone`.
2. `prepare-electron-standalone.mjs` → повторно размещает файлы в `.next/electron-standalone` и заменяет абсолютные пути внутри `server.js` и `required-server-files.json`, чтобы пакет можно было перемещать.
3. `electron-builder` упаковывает `main.js`, `preload.js`, `node_modules` и `extraResources: { ../.next/electron-standalone → app }`.

### Целевые форматы сборки

| ОС      | Целевые форматы                                    |
| ------- | -------------------------------------------------- |
| Windows | Установщик NSIS + переносная версия (x64)          |
| macOS   | DMG (Intel + arm64, перетаскивание в Applications) |
| Linux   | AppImage + DEB (x64 + arm64)                       |

Настройки NSIS: `oneClick: false`, позволяют пользователю выбрать каталог установки, создают ярлыки на рабочем столе и в меню «Пуск».

## Дымовое тестирование упакованной сборки

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Автоматически находит упакованный исполняемый файл в `electron/dist-electron/` для текущей платформы.
- Запускает приложение с изолированными каталогами `HOME`/`APPDATA`/`XDG_*`, чтобы не затрагивать данные разработчика.
- Опрашивает `http://127.0.0.1:20128/login` до получения HTTP 200 в течение 45 с.
- Отслеживает в stderr/stdout критические шаблоны (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` и т. д.).
- После подтверждения готовности ожидает 2 с стабильной работы, затем отправляет SIGTERM и ждёт освобождения порта.
- В CI автоматически передаёт `--no-sandbox --disable-gpu` (а в Linux также `--disable-dev-shm-usage`).

Переопределения через переменные окружения: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Подписание кода

`electron/package.json` **не** подключает учётные данные для подписания напрямую. Передайте их в `electron-builder` через переменные окружения:

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

Подписание AppImage необязательно — для подписания задайте `LINUX_GPG_KEY`.

## Распространение

Артефакты создаются в `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Релизы публикуются в GitHub Releases (`diegosouzapw/OmniRoute`), где `electron-updater` также проверяет наличие новых версий.

## Устранение неполадок

| Симптом                                                                  | Решение                                                                                                                                                                                        |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` после крупного обновления Electron | better-sqlite3 v13 поставляется с предварительными сборками Node-API — повторно выполните `npm install` в корне и `prepare:bundle` (он проверяет предварительную сборку для текущей платформы) |
| `ERR_DLOPEN_FAILED` для нативного модуля                                 | Повторно выполните `prepare:bundle` — он немедленно завершится с ошибкой, если предварительная сборка Node-API для текущей платформы отсутствует                                               |
| В Linux отображается пустое окно                                         | Убедитесь, что сервер Next.js действительно привязан к PORT (проверьте журналы `[Server]`)                                                                                                     |
| Нотаризация macOS зависает                                               | Убедитесь, что переменные `APPLE_*` экспортированы, а не только указаны в `.env`                                                                                                               |
| Предупреждение Windows SmartScreen                                       | Подпишите приложение сертификатом EV или предложите пользователям щёлкнуть правой кнопкой мыши → «Всё равно запустить»                                                                         |
| Smoke-тест завершается ошибкой из-за занятого порта                      | Остановите все локальные серверы разработки на порте 20128 перед запуском `electron:smoke:packaged`                                                                                            |

## См. также

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Исходный код: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Вспомогательные скрипты: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
