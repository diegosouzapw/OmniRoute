# Electron Desktop Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md)

---

> **資訊來源：** `electron/` 工作區
> **最後更新：** 2026-06-28 — v3.8.40

OmniRoute 提供以 **Electron 41** + **electron-builder 26.10** 建構的跨平台桌面應用程式（Windows / macOS / Linux）。桌面應用程式會將 Next.js 獨立伺服器啟動為子行程、讓 `BrowserWindow` 指向該伺服器，並加入系統匣、自動更新程式、IPC 橋接器，以及零設定的密鑰啟動機制。

## 架構

```
┌──────────────────────────────────────────────┐
│ Electron 主行程（electron/main.js）           │
│ ├─ 單一執行個體鎖定                           │
│ ├─ 子行程：Next.js 獨立伺服器                  │
│ │   （使用 Electron 的 Node 執行環境啟動）     │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ 系統匣 + 快顯功能表                         │
│ ├─ 透過 electron-updater 自動更新             │
│ ├─ 內容安全政策（工作階段標頭）                 │
│ └─ 密鑰啟動機制（JWT / API_KEY_SECRET）        │
└──────────────────────────────────────────────┘
            ↕ IPC 橋接器（electron/preload.js）
┌──────────────────────────────────────────────┐
│ 轉譯器（Next.js 儀表板）                       │
│   window.electronAPI.*（contextIsolation）    │
└──────────────────────────────────────────────┘
```

## 版本

已從 `electron/package.json` 確認：

| 套件               | 版本                                                              |
| ------------------ | ----------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                         |
| `electron-builder` | `^26.15.3`                                                        |
| `electron-updater` | `^6.8.9`                                                          |
| `better-sqlite3`   | 根目錄 `^13.0.2`（Node-API 預先建置版本 — 無須重新建置 Electron） |
| 應用程式版本       | `3.8.0`                                                           |
| 應用程式 ID        | `online.omniroute.desktop`                                        |
| 產品名稱           | `OmniRoute`                                                       |

## 指令碼（根目錄 `package.json`）

| 指令碼                            | 用途                                                            |
| --------------------------------- | --------------------------------------------------------------- |
| `npm run electron:dev`            | 啟動 `npm run dev` + 等待 `localhost:20128` + 啟動 Electron     |
| `npm run electron:build`          | 建置 Next.js，然後針對目前的作業系統執行 `electron-builder`     |
| `npm run electron:build:win`      | 建置 Windows NSIS 安裝程式 + 可攜式版本（x64）                  |
| `npm run electron:build:mac`      | 建置 macOS DMG（Intel + Apple Silicon）                         |
| `npm run electron:build:linux`    | 建置 Linux AppImage + DEB（x64 + arm64）                        |
| `npm run electron:smoke:packaged` | 啟動已封裝的二進位檔並探測 `/login` 是否回傳 HTTP 200，然後關閉 |

`electron/` 工作區也提供：

- `npm run prepare:bundle` — 執行 `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — 單一架構的 macOS 建置
- `npm run pack` — 僅產生目錄的建置，用於本機測試（不含安裝程式）

## 目錄結構

```
electron/
├── package.json              # Electron 相依套件 + electron-builder 設定
├── main.js                   # 主程序（24 KB — 請參閱下方註解）
├── preload.js                # contextBridge IPC 橋接器
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI 類型
├── README.md                 # 工作區內備註
├── assets/                   # icon.png、icon.ico、icon.icns、tray-icon.png
└── dist-electron/            # electron-builder 輸出（已由 git 忽略）

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # 暫存 .next/electron-standalone 套件組合
└── dev/
    └── smoke-electron-packaged.mjs       # 建置後冒煙測試
```

`main.js` 和 `preload.js` 都是 **CommonJS `.js` 檔案**，而非 TypeScript。渲染器端的類型宣告位於 `electron/types.d.ts`。

## IPC 橋接器（`preload.js`）

預載腳本使用 `contextBridge`，在 `contextIsolation: true` 且 `nodeIntegration: false` 的設定下，於 `window.electronAPI` 上公開白名單 API。

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

| 渲染器呼叫                                                        | 類型                 |
| ----------------------------------------------------------------- | -------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | 呼叫                 |
| `openExternal(url)`                                               | 呼叫                 |
| `getDataDir()`                                                    | 呼叫                 |
| `restartServer()`                                                 | 呼叫                 |
| `getAppVersion()`                                                 | 呼叫                 |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | 呼叫                 |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | 傳送                 |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | 接收（回傳清除函式） |

接收輔助函式會回傳**清除函式**，而非依賴 `removeAllListeners`——這可防止 React 元件重新掛載時累積監聽器。

## 伺服器生命週期

`main.js` 會直接使用 Electron Node 執行階段啟動 Next.js 獨立套件組合，以避免與系統 Node 之間的原生模組 ABI 不相容：

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

- `waitForServer()` 會輪詢 URL 最多 30 秒，之後才顯示視窗（避免冷啟動時出現空白畫面）。
- `stdio: "pipe"` 會擷取 stdout/stderr；就緒字串（`Ready` / `listening`）會透過 IPC 發出 `server-status: running`。
- `before-quit` 會等待最多 5 秒，讓 SIGTERM 正常完成（WAL 檢查點），之後再傳送 SIGKILL。
- 系統匣中的連接埠切換器（`20128`、`3000`、`8080`）會停止並重新啟動伺服器，然後重新載入 BrowserWindow。

## 零設定密鑰啟動

首次啟動時，主程序會自動產生並持久保存缺少的密鑰：

| 密鑰                     | 來源                                                                   |
| ------------------------ | ---------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                               |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")`（若已存在加密憑證則拒絕執行） |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                               |

持久保存至 `<DATA_DIR>/server.env`。`DATA_DIR` 解析為：

- Windows：`%APPDATA%\omniroute`
- Linux：`$XDG_CONFIG_HOME/omniroute` 或 `~/.omniroute`
- macOS：`~/.omniroute`

## 環境檔案查找

在產生伺服器程序之前，主程序（`electron/main.js` 中的 `getPreferredEnvFilePath()`）會選取**一個** `.env` 檔案：下列檔案中第一個存在的檔案。

1. `$DATA_DIR/.env`，前提是啟動應用程式時的環境中已設定 `DATA_DIR`。
2. `<resolved DATA_DIR>/.env`，使用與上述相同的預設值：Windows 上為 `%APPDATA%\omniroute\.env`，Linux 和 macOS 上為 `$XDG_CONFIG_HOME/omniroute/.env` 或 `~/.omniroute/.env`。
3. 程序工作目錄中的 `.env`。

主程序只會讀取該檔案；後續候選檔案不會合併。接著會依照以下優先順序建構伺服器環境（由高至低）：

1. Electron 程序環境（繼承自啟動應用程式的來源）。
2. 選取的 `.env` 檔案。
3. `<DATA_DIR>/server.env`（上述啟動密鑰）。

程序環境會在應用程式啟動時擷取，因此，在應用程式執行期間設定的系統或使用者環境變數（包括視窗關閉後仍常駐系統匣期間）不會傳遞至伺服器，直到完全結束並重新啟動應用程式為止。對於 `CONTEXT_LENGTH_<PROVIDER>` 等執行階段設定（請參閱[環境變數：各提供者的內容長度](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)），建議使用 `.env` 檔案，然後完全結束應用程式（系統匣中的 **Quit**）並重新啟動。

## 視窗與系統匣

- `BrowserWindow`：1400×900（最小 1024×700），`backgroundColor: "#0a0a0a"`。
- macOS：`titleBarStyle: "hiddenInset"`，視窗控制鈕位於 `{ x: 16, y: 16 }`。
- Windows/Linux：原生標題列。
- 關閉按鈕會將應用程式最小化至系統匣；系統匣選單包含 **Open OmniRoute**、**Open Dashboard**（外部瀏覽器）、**Server Port** 子選單、**Check for Updates**、**Quit**。

## 內容安全政策

透過 `session.defaultSession.webRequest.onHeadersReceived` 設定。值得注意的指令包括：

- `frame-ancestors 'none'`、`object-src 'none'`、`child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- 開發模式只會將 `'unsafe-eval'` 加入 `script-src`

## 自動更新

使用採用 GitHub 提供者（`diegosouzapw/OmniRoute`）的 `electron-updater`。

- `autoDownload = false`、`autoInstallOnAppQuit = true`
- 透過 `update-status` IPC 將事件轉送至轉譯程序：
  `checking`、`available`、`not-available`、`downloading`（包含 `percent`）、`downloaded`、`error`
- `installUpdate()` 會終止伺服器，然後呼叫 `autoUpdater.quitAndInstall()`
- 在開發模式下略過（`!app.isPackaged`）

## 建置流程

1. `npm run build` → 將 Next.js 獨立版本建置至 `.next/standalone`。
2. `prepare-electron-standalone.mjs` → 重新暫存至 `.next/electron-standalone`，並重寫 `server.js` + `required-server-files.json` 內的絕對路徑，使套件可重新定位。
3. `electron-builder` 封裝 `main.js`、`preload.js`、`node_modules`，以及 `extraResources: { ../.next/electron-standalone → app }`。

### 建置目標

| 作業系統 | 目標                                      |
| -------- | ----------------------------------------- |
| Windows  | NSIS 安裝程式 + 可攜式版本 (x64)          |
| macOS    | DMG（Intel + arm64，拖放至 Applications） |
| Linux    | AppImage + DEB（x64 + arm64）             |

NSIS 設定：`oneClick: false`，允許使用者選擇安裝目錄，並建立桌面及開始功能表捷徑。

## 封裝建置的冒煙測試

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`：

- 自動在目前平台的 `electron/dist-electron/` 中尋找已封裝的二進位檔。
- 使用隔離的 `HOME`/`APPDATA`/`XDG_*` 目錄啟動，因此不會存取開發者資料。
- 輪詢 `http://127.0.0.1:20128/login`，確認在 45 秒內收到 HTTP 200。
- 監看 stderr/stdout 中的致命錯誤模式（`Cannot find module`、`MODULE_NOT_FOUND`、`ERR_DLOPEN_FAILED`、`Failed to start server` 等）。
- 就緒後等待 2 秒的穩定執行時間，接著傳送 SIGTERM，並等待連接埠釋放。
- 在 CI 中，自動傳入 `--no-sandbox --disable-gpu`（Linux 上也會傳入 `--disable-dev-shm-usage`）。

環境變數覆寫：`ELECTRON_SMOKE_APP_EXECUTABLE`、`ELECTRON_SMOKE_URL`、`ELECTRON_SMOKE_TIMEOUT_MS`、`ELECTRON_SMOKE_SETTLE_MS`、`ELECTRON_SMOKE_DATA_DIR`、`ELECTRON_SMOKE_KEEP_DATA`、`ELECTRON_SMOKE_STREAM_LOGS`。

## 程式碼簽署

`electron/package.json` **不會**直接設定簽署憑證。請透過環境變數將憑證傳給 `electron-builder`：

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

AppImage 簽署為選用功能——若要簽署，請設定 `LINUX_GPG_KEY`。

## 發佈

成品會輸出至 `electron/dist-electron/`：

- `OmniRoute.Setup.X.Y.Z.exe`、`OmniRoute X.Y.Z.exe`（Windows）
- `OmniRoute-X.Y.Z-mac.dmg`、`OmniRoute-X.Y.Z-arm64-mac.dmg`（macOS）
- `OmniRoute-X.Y.Z.AppImage`、`omniroute-desktop_X.Y.Z_amd64.deb`（Linux）

發行版本會發佈至 GitHub Releases（`diegosouzapw/OmniRoute`），`electron-updater` 也會在此檢查新版本。

## 疑難排解

| 症狀                                                            | 修正方式                                                                                                                              |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Electron 主版本升級後出現 `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 提供 Node-API 預先建置版本——請在根目錄重新執行 `npm install` 和 `prepare:bundle`（它會驗證目前平台的預先建置版本） |
| 原生模組出現 `ERR_DLOPEN_FAILED`                                | 重新執行 `prepare:bundle`——若缺少目前平台的 Node-API 預先建置版本，它會立即失敗                                                       |
| Linux 上的視窗顯示空白                                          | 確認 Next.js 伺服器確實已繫結至 PORT（檢查 `[Server]` 日誌）                                                                          |
| macOS 公證程序停滯                                              | 確認已匯出 `APPLE_*` 變數，而不只是將它們放在 `.env` 中                                                                               |
| Windows SmartScreen 警告                                        | 使用 EV 憑證簽署，或讓使用者按右鍵 →「仍要執行」                                                                                      |
| 冒煙測試因連接埠已被使用而失敗                                  | 執行 `electron:smoke:packaged` 前，請停止所有使用 20128 的本機開發伺服器                                                              |

## 另請參閱

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- 原始碼：`electron/main.js`、`electron/preload.js`、`electron/package.json`
- 輔助工具：`scripts/build/prepare-electron-standalone.mjs`、`scripts/dev/smoke-electron-packaged.mjs`
