# Electron Desktop Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md)

---

> **權威來源：** `electron/` 工作區
> **最後更新：** 2026-06-28 — v3.8.40

OmniRoute 提供以 **Electron 41** + **electron-builder 26.10** 建置的跨平台桌面應用程式（Windows / macOS / Linux）。桌面應用程式會將 Next.js 獨立伺服器啟動為子行程、讓 `BrowserWindow` 指向該伺服器，並加入系統匣、自動更新程式、IPC 橋接器，以及零設定的密鑰初始化功能。

## 架構

```
┌──────────────────────────────────────────────┐
│ Electron 主行程（electron/main.js）          │
│ ├─ 單一執行個體鎖定                         │
│ ├─ 子行程：Next.js 獨立伺服器                │
│ │   （使用 Electron 的 Node 執行環境啟動）   │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ 系統匣 + 內容選單                         │
│ ├─ 透過 electron-updater 自動更新            │
│ ├─ 內容安全政策（工作階段標頭）              │
│ └─ 密鑰初始化（JWT / API_KEY_SECRET）        │
└──────────────────────────────────────────────┘
            ↕ IPC 橋接器（electron/preload.js）
┌──────────────────────────────────────────────┐
│ 渲染程序（Next.js 儀表板）                   │
│   window.electronAPI.*（contextIsolation）    │
└──────────────────────────────────────────────┘
```

## 版本

已由 `electron/package.json` 確認：

| 套件               | 版本                                                        |
| ------------------ | ----------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                   |
| `electron-builder` | `^26.15.3`                                                  |
| `electron-updater` | `^6.8.9`                                                    |
| `better-sqlite3`   | 根目錄 `^13.0.2`（Node-API 預建檔 — 無須重新建置 Electron） |
| 應用程式版本       | `3.8.0`                                                     |
| 應用程式 ID        | `online.omniroute.desktop`                                  |
| 產品名稱           | `OmniRoute`                                                 |

## 指令碼（根目錄 `package.json`）

| 指令碼                            | 用途                                                                |
| --------------------------------- | ------------------------------------------------------------------- |
| `npm run electron:dev`            | 啟動 `npm run dev` + 等待 `localhost:20128` + 啟動 Electron         |
| `npm run electron:build`          | 建置 Next.js，然後針對目前的作業系統執行 `electron-builder`         |
| `npm run electron:build:win`      | 建置 Windows NSIS 安裝程式 + 可攜式版本（x64）                      |
| `npm run electron:build:mac`      | 建置 macOS DMG（Intel + Apple Silicon）                             |
| `npm run electron:build:linux`    | 建置 Linux AppImage + DEB（x64 + arm64）                            |
| `npm run electron:smoke:packaged` | 啟動已封裝的二進位檔並探測 `/login` 是否回傳 HTTP 200，然後將其關閉 |

`electron/` 工作區也提供：

- `npm run prepare:bundle` — 執行 `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — 單一架構的 macOS 建置
- `npm run pack` — 僅產生目錄的建置，用於本機測試（不含安裝程式）

## 目錄配置

```
electron/
├── package.json              # Electron 相依套件 + electron-builder 設定
├── main.js                   # 主程序（24 KB — 請參閱下方註解）
├── preload.js                # contextBridge IPC 橋接
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI 類型
├── README.md                 # 工作區內的備註
├── assets/                   # icon.png、icon.ico、icon.icns、tray-icon.png
└── dist-electron/            # electron-builder 輸出（已由 git 忽略）

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # 暫存 .next/electron-standalone 套件組合
└── dev/
    └── smoke-electron-packaged.mjs       # 建置後煙霧測試
```

`main.js` 和 `preload.js` 都是 **CommonJS `.js` 檔案**，而非 TypeScript。渲染器端的類型定義位於 `electron/types.d.ts`。

## IPC 橋接（`preload.js`）

預載腳本使用 `contextBridge`，在 `contextIsolation: true` 且 `nodeIntegration: false` 的情況下，於 `window.electronAPI` 上公開白名單 API。

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

公開的方法：

| 渲染器呼叫                                                        | 類型                    |
| ----------------------------------------------------------------- | ----------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                  |
| `openExternal(url)`                                               | invoke                  |
| `getDataDir()`                                                    | invoke                  |
| `restartServer()`                                                 | invoke                  |
| `getAppVersion()`                                                 | invoke                  |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                  |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                    |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive（回傳清理函式） |

接收輔助函式會回傳一個**清理函式**，而不是依賴 `removeAllListeners`——這可防止 React 元件重新掛載時累積監聽器。

## 伺服器生命週期

`main.js` 直接使用 Electron Node 執行階段啟動 Next.js 獨立套件組合，以避免與系統 Node 發生原生模組 ABI 不相容：

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

重點：

- `waitForServer()` 最多輪詢該 URL 30 秒，之後才顯示視窗（冷啟動時不會出現空白畫面）。
- `stdio: "pipe"` 會擷取 stdout/stderr；偵測到就緒字串（`Ready` / `listening`）時，會透過 IPC 發出 `server-status: running`。
- `before-quit` 會等待最多 5 秒，讓 SIGTERM 優雅終止（WAL 檢查點），之後再傳送 SIGKILL。
- 系統匣中的連接埠切換器（`20128`、`3000`、`8080`）會停止並重新啟動伺服器，接著重新載入 BrowserWindow。

## 零設定密鑰引導

首次啟動時，主程序會自動產生並持久化缺少的密鑰：

| 密鑰                     | 來源                                                                     |
| ------------------------ | ------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                 |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")`（若已存在加密憑證，則拒絕執行） |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                 |

持久化至 `<DATA_DIR>/server.env`。`DATA_DIR` 會解析為：

- Windows：`%APPDATA%\omniroute`
- Linux：`$XDG_CONFIG_HOME/omniroute` 或 `~/.omniroute`
- macOS：`~/.omniroute`

## 視窗與系統匣

- `BrowserWindow`：1400×900（最小 1024×700），`backgroundColor: "#0a0a0a"`。
- macOS：`titleBarStyle: "hiddenInset"`，視窗控制鈕位於 `{ x: 16, y: 16 }`。
- Windows/Linux：原生標題列。
- 關閉按鈕會將應用程式最小化至系統匣；系統匣選單包含 **開啟 OmniRoute**、**開啟儀表板**（外部瀏覽器）、**伺服器連接埠**子選單、**檢查更新**、**結束**。

## 內容安全政策

透過 `session.defaultSession.webRequest.onHeadersReceived` 設定。重要指令包括：

- `frame-ancestors 'none'`、`object-src 'none'`、`child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- 開發模式僅會將 `'unsafe-eval'` 加入 `script-src`

## 自動更新

使用採用 GitHub 提供者（`diegosouzapw/OmniRoute`）的 `electron-updater`。

- `autoDownload = false`、`autoInstallOnAppQuit = true`
- 透過 `update-status` IPC 將事件轉送至渲染程序：
  `checking`、`available`、`not-available`、`downloading`（包含 `percent`）、`downloaded`、`error`
- `installUpdate()` 會終止伺服器，然後呼叫 `autoUpdater.quitAndInstall()`
- 在開發模式（`!app.isPackaged`）下略過

## 建置流程

1. `npm run build` → 在 `.next/standalone` 中產生 Next.js 獨立建置。
2. `prepare-electron-standalone.mjs` → 重新暫存至 `.next/electron-standalone`，並重寫 `server.js` + `required-server-files.json` 內的絕對路徑，使套件可重新定位。
3. `electron-builder` 會封裝 `main.js`、`preload.js`、`node_modules`，以及 `extraResources: { ../.next/electron-standalone → app }`。

### 建置目標

| 作業系統 | 目標                                      |
| -------- | ----------------------------------------- |
| Windows  | NSIS 安裝程式 + 可攜式版本（x64）         |
| macOS    | DMG（Intel + arm64，拖放至 Applications） |
| Linux    | AppImage + DEB（x64 + arm64）             |

NSIS 設定：`oneClick: false`，允許使用者選擇安裝目錄，並建立桌面與開始功能表捷徑。

## 已封裝建置的冒煙測試

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`：

- 自動探索目前平台位於 `electron/dist-electron/` 中的已封裝二進位檔。
- 使用隔離的 `HOME`/`APPDATA`/`XDG_*` 目錄啟動，以免存取開發人員資料。
- 輪詢 `http://127.0.0.1:20128/login`，確認在 45 秒內收到 HTTP 200。
- 監看 stderr/stdout 中的致命錯誤模式（`Cannot find module`、`MODULE_NOT_FOUND`、`ERR_DLOPEN_FAILED`、`Failed to start server` 等）。
- 就緒後等待 2 秒的穩定執行時間，接著發出 SIGTERM 並等待連接埠釋放。
- 在 CI 中，自動傳入 `--no-sandbox --disable-gpu`（Linux 上還會傳入 `--disable-dev-shm-usage`）。

環境變數覆寫：`ELECTRON_SMOKE_APP_EXECUTABLE`、`ELECTRON_SMOKE_URL`、`ELECTRON_SMOKE_TIMEOUT_MS`、`ELECTRON_SMOKE_SETTLE_MS`、`ELECTRON_SMOKE_DATA_DIR`、`ELECTRON_SMOKE_KEEP_DATA`、`ELECTRON_SMOKE_STREAM_LOGS`。

## 程式碼簽署

`electron/package.json` **不會**直接設定簽署憑證。請透過環境變數將其傳遞給 `electron-builder`：

### macOS

```bash
export APPLE_ID=<電子郵件>
export APPLE_APP_SPECIFIC_PASSWORD=<密碼>
export APPLE_TEAM_ID=<識別碼>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<憑證密碼>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<憑證密碼>
npm run electron:build:win
```

### Linux

AppImage 簽署為選用功能——如需簽署，請設定 `LINUX_GPG_KEY`。

## 發布

成品會輸出至 `electron/dist-electron/`：

- `OmniRoute.Setup.X.Y.Z.exe`、`OmniRoute X.Y.Z.exe`（Windows）
- `OmniRoute-X.Y.Z-mac.dmg`、`OmniRoute-X.Y.Z-arm64-mac.dmg`（macOS）
- `OmniRoute-X.Y.Z.AppImage`、`omniroute-desktop_X.Y.Z_amd64.deb`（Linux）

版本會發布至 GitHub Releases（`diegosouzapw/OmniRoute`），`electron-updater` 也會在此檢查新版本。

## 疑難排解

| 症狀                                                              | 解決方式                                                                                                                              |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Electron 主要版本升級後出現 `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 提供 Node-API 預先建置版本——請在根目錄重新執行 `npm install` 和 `prepare:bundle`（其會驗證目前平台的預先建置版本） |
| 原生模組出現 `ERR_DLOPEN_FAILED`                                  | 重新執行 `prepare:bundle`——若缺少目前平台的 Node-API 預先建置版本，該指令會立即失敗                                                   |
| Linux 上的視窗顯示空白                                            | 確認 Next.js 伺服器確實已繫結至 PORT（檢查 `[Server]` 日誌）                                                                          |
| macOS 公證程序停滯                                                | 確保已匯出 `APPLE_*` 變數，而不只是在 `.env` 中設定                                                                                   |
| Windows SmartScreen 警告                                          | 使用 EV 憑證簽署，或請使用者按一下滑鼠右鍵 →「仍要執行」                                                                              |
| 煙霧測試因連接埠已被占用而失敗                                    | 執行 `electron:smoke:packaged` 前，請停止任何使用 20128 的本機開發伺服器                                                              |

## 另請參閱

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- 原始碼：`electron/main.js`、`electron/preload.js`、`electron/package.json`
- 輔助工具：`scripts/build/prepare-electron-standalone.mjs`、`scripts/dev/smoke-electron-packaged.mjs`
