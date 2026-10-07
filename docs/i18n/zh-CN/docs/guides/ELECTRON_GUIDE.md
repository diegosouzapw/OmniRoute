# Electron Desktop Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **事实来源：** `electron/` 工作区
> **最后更新：** 2026-06-28 — v3.8.40

OmniRoute 提供基于 **Electron 41** + **electron-builder 26.10** 构建的跨平台桌面应用（Windows / macOS / Linux）。该桌面应用将 Next.js 独立服务器作为子进程启动，通过 `BrowserWindow` 访问该服务器，并提供系统托盘、自动更新程序、IPC 桥接和零配置密钥初始化功能。

## 架构

```
┌──────────────────────────────────────────────┐
│ Electron 主进程 (electron/main.js)           │
│ ├─ 单实例锁                                  │
│ ├─ 子进程：Next.js 独立服务器                │
│ │   （使用 Electron 的 Node 运行时启动）     │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ 系统托盘 + 上下文菜单                     │
│ ├─ 通过 electron-updater 自动更新            │
│ ├─ 内容安全策略（会话标头）                  │
│ └─ 密钥初始化（JWT / API_KEY_SECRET）        │
└──────────────────────────────────────────────┘
            ↕ IPC 桥接 (electron/preload.js)
┌──────────────────────────────────────────────┐
│ 渲染器（Next.js 仪表板）                     │
│   window.electronAPI.*（contextIsolation）    │
└──────────────────────────────────────────────┘
```

## 版本

已通过 `electron/package.json` 确认：

| 软件包             | 版本                                                              |
| ------------------ | ----------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                         |
| `electron-builder` | `^26.15.3`                                                        |
| `electron-updater` | `^6.8.9`                                                          |
| `better-sqlite3`   | 根目录 `^13.0.2`（Node-API 预构建版本——无需为 Electron 重新构建） |
| 应用版本           | `3.8.0`                                                           |
| 应用 ID            | `online.omniroute.desktop`                                        |
| 产品名称           | `OmniRoute`                                                       |

## 脚本（根目录 `package.json`）

| 脚本                              | 用途                                                              |
| --------------------------------- | ----------------------------------------------------------------- |
| `npm run electron:dev`            | 启动 `npm run dev` + 等待 `localhost:20128` 就绪 + 启动 Electron  |
| `npm run electron:build`          | 构建 Next.js，然后针对当前操作系统运行 `electron-builder`         |
| `npm run electron:build:win`      | 构建 Windows NSIS 安装程序 + 便携版（x64）                        |
| `npm run electron:build:mac`      | 构建 macOS DMG（Intel + Apple Silicon）                           |
| `npm run electron:build:linux`    | 构建 Linux AppImage + DEB（x64 + arm64）                          |
| `npm run electron:smoke:packaged` | 启动已打包的二进制文件并探测 `/login` 是否返回 HTTP 200，然后关闭 |

`electron/` 工作区还提供：

- `npm run prepare:bundle` — 运行 `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — 单架构 macOS 构建
- `npm run pack` — 仅生成目录的构建，用于本地测试（不生成安装程序）

## 目录布局

```
electron/
├── package.json              # Electron 依赖项 + electron-builder 配置
├── main.js                   # 主进程（24 KB — 请参阅下方注释）
├── preload.js                # contextBridge IPC 桥接
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI 类型
├── README.md                 # 工作区内说明
├── assets/                   # icon.png、icon.ico、icon.icns、tray-icon.png
└── dist-electron/            # electron-builder 输出（已被 git 忽略）

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # 暂存 .next/electron-standalone 包
└── dev/
    └── smoke-electron-packaged.mjs       # 构建后冒烟测试
```

`main.js` 和 `preload.js` 都是 **CommonJS `.js` 文件**，而不是 TypeScript。渲染器端类型定义位于 `electron/types.d.ts`。

## IPC 桥接（`preload.js`）

预加载脚本通过 `contextBridge` 在 `window.electronAPI` 上公开白名单 API，并设置 `contextIsolation: true` 和 `nodeIntegration: false`。

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

公开的方法：

| 渲染器调用                                                        | 类型                 |
| ----------------------------------------------------------------- | -------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | 调用                 |
| `openExternal(url)`                                               | 调用                 |
| `getDataDir()`                                                    | 调用                 |
| `restartServer()`                                                 | 调用                 |
| `getAppVersion()`                                                 | 调用                 |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | 调用                 |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | 发送                 |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | 接收（返回清理函数） |

接收辅助函数返回一个**清理函数**，而不是依赖 `removeAllListeners`——这可以防止 React 组件重新挂载时监听器不断累积。

## 服务器生命周期

`main.js` 使用 Electron Node 运行时直接启动 Next.js 独立包，以避免与系统 Node 之间的原生模块 ABI 不匹配：

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

要点：

- `waitForServer()` 在显示窗口前轮询 URL，最长持续 30 秒（避免冷启动时出现空白屏幕）。
- `stdio: "pipe"` 会捕获 stdout/stderr；就绪短语（`Ready` / `listening`）会通过 IPC 发出 `server-status: running`。
- `before-quit` 会等待最多 5 秒以完成优雅的 SIGTERM（WAL 检查点），随后发送 SIGKILL。
- 托盘中的端口切换器（`20128`、`3000`、`8080`）会停止并重新启动服务器，然后重新加载 BrowserWindow。

## 零配置密钥引导

首次启动时，主进程会自动生成并持久化缺失的密钥：

| 密钥                     | 来源                                                                       |
| ------------------------ | -------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                   |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")`（如果已存在加密凭据，则拒绝生成） |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                   |

持久化到 `<DATA_DIR>/server.env`。`DATA_DIR` 解析为：

- Windows：`%APPDATA%\omniroute`
- Linux：`$XDG_CONFIG_HOME/omniroute` 或 `~/.omniroute`
- macOS：`~/.omniroute`

## 环境文件查找

在启动服务器之前，主进程（`electron/main.js` 中的 `getPreferredEnvFilePath()`）会选择**一个** `.env` 文件，即以下文件中第一个存在的文件。

1. `$DATA_DIR/.env`，前提是在启动应用的环境中设置了 `DATA_DIR`。
2. `<resolved DATA_DIR>/.env`，使用与上述相同的默认值：Windows 上为 `%APPDATA%\omniroute\.env`，Linux 和 macOS 上为 `$XDG_CONFIG_HOME/omniroute/.env` 或 `~/.omniroute/.env`。
3. 进程工作目录中的 `.env`。

主进程只读取该文件；不会合并后续候选文件。随后，服务器环境按以下优先级构建（从高到低）：

1. Electron 进程环境（从启动应用的环境继承的变量）。
2. 选定的 `.env` 文件。
3. `<DATA_DIR>/server.env`（上述引导生成的密钥）。

进程环境会在应用启动时捕获，因此，在应用运行期间设置的系统或用户环境变量（包括窗口关闭后应用仍驻留在托盘中时设置的变量）不会传递到服务器，只有在完全退出并重新启动应用后才会生效。对于 `CONTEXT_LENGTH_<PROVIDER>` 等运行时配置项（请参阅[环境变量：每个提供者的上下文长度](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)），建议使用 `.env` 文件，然后完全退出（托盘，**退出**）并重新启动。

## 窗口和托盘

- `BrowserWindow`：1400×900（最小 1024×700），`backgroundColor: "#0a0a0a"`。
- macOS：`titleBarStyle: "hiddenInset"`，窗口控制按钮位于 `{ x: 16, y: 16 }`。
- Windows/Linux：原生标题栏。
- 关闭按钮会将应用最小化到托盘；托盘菜单包含**打开 OmniRoute**、**打开仪表板**（外部浏览器）、**服务器端口**子菜单、**检查更新**、**退出**。

## 内容安全策略

通过 `session.defaultSession.webRequest.onHeadersReceived` 设置。值得注意的指令包括：

- `frame-ancestors 'none'`、`object-src 'none'`、`child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- 开发模式仅向 `script-src` 添加 `'unsafe-eval'`

## 自动更新

使用采用 GitHub 提供程序（`diegosouzapw/OmniRoute`）的 `electron-updater`。

- `autoDownload = false`，`autoInstallOnAppQuit = true`
- 通过 `update-status` IPC 将事件转发到渲染进程：
  `checking`、`available`、`not-available`、`downloading`（包含 `percent`）、`downloaded`、`error`
- `installUpdate()` 会终止服务器，然后调用 `autoUpdater.quitAndInstall()`
- 在开发模式下跳过（`!app.isPackaged`）

## 构建流水线

1. `npm run build` → 将 Next.js 独立构建输出到 `.next/standalone`。
2. `prepare-electron-standalone.mjs` → 将内容重新暂存到 `.next/electron-standalone`，并重写 `server.js` + `required-server-files.json` 中的绝对路径，使软件包可重新定位。
3. `electron-builder` 打包 `main.js`、`preload.js`、`node_modules` 和 `extraResources: { ../.next/electron-standalone → app }`。

### 构建目标

| 操作系统 | 目标                                       |
| -------- | ------------------------------------------ |
| Windows  | NSIS 安装程序 + 便携版 (x64)               |
| macOS    | DMG（Intel + arm64，拖入“应用程序”文件夹） |
| Linux    | AppImage + DEB（x64 + arm64）              |

NSIS 设置：`oneClick: false`，允许用户选择安装目录，并创建桌面和“开始”菜单快捷方式。

## 对打包构建进行冒烟测试

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`：

- 自动在当前平台的 `electron/dist-electron/` 中查找已打包的二进制文件。
- 使用隔离的 `HOME`/`APPDATA`/`XDG_*` 目录启动，因此不会修改开发者数据。
- 轮询 `http://127.0.0.1:20128/login`，检查是否在 45 秒内返回 HTTP 200。
- 监控 stderr/stdout 中的致命错误模式（`Cannot find module`、`MODULE_NOT_FOUND`、`ERR_DLOPEN_FAILED`、`Failed to start server` 等）。
- 就绪后等待 2 秒的稳定运行时间，然后发送 SIGTERM，并等待端口释放。
- 在 CI 中，自动传入 `--no-sandbox --disable-gpu`（在 Linux 上还会传入 `--disable-dev-shm-usage`）。

环境变量覆盖项：`ELECTRON_SMOKE_APP_EXECUTABLE`、`ELECTRON_SMOKE_URL`、`ELECTRON_SMOKE_TIMEOUT_MS`、`ELECTRON_SMOKE_SETTLE_MS`、`ELECTRON_SMOKE_DATA_DIR`、`ELECTRON_SMOKE_KEEP_DATA`、`ELECTRON_SMOKE_STREAM_LOGS`。

## 代码签名

`electron/package.json` **不会**直接配置签名凭据。请通过环境变量将凭据传递给 `electron-builder`：

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

AppImage 签名是可选的——如需签名，请设置 `LINUX_GPG_KEY`。

## 分发

构建产物位于 `electron/dist-electron/`：

- `OmniRoute.Setup.X.Y.Z.exe`、`OmniRoute X.Y.Z.exe`（Windows）
- `OmniRoute-X.Y.Z-mac.dmg`、`OmniRoute-X.Y.Z-arm64-mac.dmg`（macOS）
- `OmniRoute-X.Y.Z.AppImage`、`omniroute-desktop_X.Y.Z_amd64.deb`（Linux）

发行版本会发布到 GitHub Releases（`diegosouzapw/OmniRoute`），`electron-updater` 也会在此检查新版本。

## 故障排除

| 症状                                                            | 解决方法                                                                                                                          |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Electron 主版本升级后出现 `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 提供 Node-API 预构建文件——在根目录重新运行 `npm install` 和 `prepare:bundle`（后者会验证当前平台的预构建文件） |
| 原生模块出现 `ERR_DLOPEN_FAILED`                                | 重新运行 `prepare:bundle`——如果缺少当前平台的 Node-API 预构建文件，它会立即失败                                                   |
| Linux 上窗口显示为空白                                          | 确认 Next.js 服务器确实已绑定到 PORT（检查 `[Server]` 日志）                                                                      |
| macOS 公证流程卡住                                              | 确保已导出 `APPLE_*` 变量，而不是仅将其写入 `.env`                                                                                |
| Windows SmartScreen 警告                                        | 使用 EV 证书签名，或者让用户右键单击 → “仍要运行”                                                                                 |
| 冒烟测试因端口被占用而失败                                      | 运行 `electron:smoke:packaged` 之前，停止占用 20128 端口的所有本地开发服务器                                                      |

## 另请参阅

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- 源文件：`electron/main.js`、`electron/preload.js`、`electron/package.json`
- 辅助脚本：`scripts/build/prepare-electron-standalone.mjs`、`scripts/dev/smoke-electron-packaged.mjs`
