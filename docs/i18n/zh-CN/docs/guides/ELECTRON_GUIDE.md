# Electron Desktop Guide (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **事实来源：** `electron/` 工作区
> **最后更新：** 2026-06-28 — v3.8.40

OmniRoute 提供基于 **Electron 41** + **electron-builder 26.10** 构建的跨平台桌面应用（Windows / macOS / Linux）。桌面应用会将 Next.js 独立服务器作为子进程启动，使用 `BrowserWindow` 访问该服务器，并提供系统托盘、自动更新程序、IPC 桥接和零配置密钥初始化功能。

## 架构

```
┌──────────────────────────────────────────────┐
│ Electron 主进程 (electron/main.js)            │
│ ├─ 单实例锁                                   │
│ ├─ 子进程：Next.js 独立服务器                 │
│ │   （使用 Electron 的 Node 运行时启动）       │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ 系统托盘 + 上下文菜单                      │
│ ├─ 通过 electron-updater 自动更新             │
│ ├─ 内容安全策略（会话标头）                    │
│ └─ 密钥初始化 (JWT / API_KEY_SECRET)          │
└──────────────────────────────────────────────┘
            ↕ IPC 桥接 (electron/preload.js)
┌──────────────────────────────────────────────┐
│ 渲染器（Next.js 仪表板）                      │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## 版本

已从 `electron/package.json` 确认：

| 软件包             | 版本                                                                |
| ------------------ | ------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                           |
| `electron-builder` | `^26.15.3`                                                          |
| `electron-updater` | `^6.8.9`                                                            |
| `better-sqlite3`   | 根目录 `^13.0.2`（Node-API 预构建版本——无需针对 Electron 重新构建） |
| 应用版本           | `3.8.0`                                                             |
| 应用 ID            | `online.omniroute.desktop`                                          |
| 产品名称           | `OmniRoute`                                                         |

## 脚本（根目录 `package.json`）

| 脚本                              | 用途                                                                  |
| --------------------------------- | --------------------------------------------------------------------- |
| `npm run electron:dev`            | 启动 `npm run dev` + 等待 `localhost:20128` + 启动 Electron           |
| `npm run electron:build`          | 构建 Next.js，然后针对当前操作系统运行 `electron-builder`             |
| `npm run electron:build:win`      | 构建 Windows NSIS 安装程序 + 便携版（x64）                            |
| `npm run electron:build:mac`      | 构建 macOS DMG（Intel + Apple Silicon）                               |
| `npm run electron:build:linux`    | 构建 Linux AppImage + DEB（x64 + arm64）                              |
| `npm run electron:smoke:packaged` | 启动已打包的二进制文件并探测 `/login` 是否返回 HTTP 200，然后关闭应用 |

`electron/` 工作区还提供：

- `npm run prepare:bundle` — 运行 `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — 单架构 macOS 构建
- `npm run pack` — 仅生成目录的构建，用于本地测试（不生成安装程序）

## 目录结构

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
│   └── prepare-electron-standalone.mjs   # 暂存 .next/electron-standalone 捆绑包
└── dev/
    └── smoke-electron-packaged.mjs       # 构建后冒烟测试
```

`main.js` 和 `preload.js` 都是 **CommonJS `.js` 文件**，而不是 TypeScript。渲染器端的类型定义位于 `electron/types.d.ts`。

## IPC 桥接（`preload.js`）

预加载脚本使用 `contextBridge`，在 `contextIsolation: true` 且 `nodeIntegration: false` 的情况下，将经过白名单限制的 API 暴露到 `window.electronAPI` 上。

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

暴露的方法：

| 渲染器调用                                                        | 类型                    |
| ----------------------------------------------------------------- | ----------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                  |
| `openExternal(url)`                                               | invoke                  |
| `getDataDir()`                                                    | invoke                  |
| `restartServer()`                                                 | invoke                  |
| `getAppVersion()`                                                 | invoke                  |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                  |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                    |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive（返回清理函数） |

这些 receive 辅助方法会返回一个**清理函数**，而不是依赖 `removeAllListeners`——这可以防止 React 组件重新挂载时监听器不断累积。

## 服务器生命周期

`main.js` 使用 Electron 的 Node 运行时直接生成 Next.js 独立捆绑包进程，以避免与系统 Node 之间出现原生模块 ABI 不匹配：

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

- `waitForServer()` 会轮询 URL 最多 30 秒，然后再显示窗口（避免冷启动时出现空白屏幕）。
- `stdio: "pipe"` 会捕获 stdout/stderr；检测到就绪短语（`Ready` / `listening`）后，会通过 IPC 发出 `server-status: running`。
- `before-quit` 会等待最多 5 秒，以便通过 SIGTERM 优雅关闭（执行 WAL 检查点），然后发送 SIGKILL。
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

## 窗口与托盘

- `BrowserWindow`：1400×900（最小 1024×700），`backgroundColor: "#0a0a0a"`。
- macOS：`titleBarStyle: "hiddenInset"`，窗口控制按钮位于 `{ x: 16, y: 16 }`。
- Windows/Linux：原生标题栏。
- 关闭按钮会将应用最小化到托盘；托盘菜单包含 **打开 OmniRoute**、**打开仪表板**（外部浏览器）、**服务器端口**子菜单、**检查更新**、**退出**。

## 内容安全策略

通过 `session.defaultSession.webRequest.onHeadersReceived` 设置。主要指令：

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

1. `npm run build` → 在 `.next/standalone` 中生成 Next.js 独立构建。
2. `prepare-electron-standalone.mjs` → 将其重新暂存到 `.next/electron-standalone`，并重写 `server.js` + `required-server-files.json` 中的绝对路径，使捆绑包可重定位。
3. `electron-builder` 打包 `main.js`、`preload.js`、`node_modules`，以及 `extraResources: { ../.next/electron-standalone → app }`。

### 构建目标

| 操作系统 | 目标                                   |
| -------- | -------------------------------------- |
| Windows  | NSIS 安装程序 + 便携版（x64）          |
| macOS    | DMG（Intel + arm64，拖放到“应用程序”） |
| Linux    | AppImage + DEB（x64 + arm64）          |

NSIS 设置：`oneClick: false`，允许用户选择安装目录，并创建桌面和“开始”菜单快捷方式。

## 已打包构建的冒烟测试

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`：

- 自动在当前平台的 `electron/dist-electron/` 中查找已打包的二进制文件。
- 使用隔离的 `HOME`/`APPDATA`/`XDG_*` 目录启动，因此不会影响开发者数据。
- 轮询 `http://127.0.0.1:20128/login`，等待其在 45 s 内返回 HTTP 200。
- 监视 stderr/stdout 中的致命错误模式（`Cannot find module`、`MODULE_NOT_FOUND`、`ERR_DLOPEN_FAILED`、`Failed to start server` 等）。
- 就绪后等待 2 s 的稳定运行时间，然后发送 SIGTERM，并等待端口释放。
- 在 CI 中，自动传递 `--no-sandbox --disable-gpu`（在 Linux 上还会传递 `--disable-dev-shm-usage`）。

环境变量覆盖项：`ELECTRON_SMOKE_APP_EXECUTABLE`、`ELECTRON_SMOKE_URL`、`ELECTRON_SMOKE_TIMEOUT_MS`、`ELECTRON_SMOKE_SETTLE_MS`、`ELECTRON_SMOKE_DATA_DIR`、`ELECTRON_SMOKE_KEEP_DATA`、`ELECTRON_SMOKE_STREAM_LOGS`。

## 代码签名

`electron/package.json` **不会**直接配置签名凭据。请通过环境变量将其传递给 `electron-builder`：

### macOS

```bash
export APPLE_ID=<电子邮件>
export APPLE_APP_SPECIFIC_PASSWORD=<密码>
export APPLE_TEAM_ID=<id>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<证书密码>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<证书密码>
npm run electron:build:win
```

### Linux

AppImage 签名是可选的——如需签名，请设置 `LINUX_GPG_KEY`。

## 分发

构建产物位于 `electron/dist-electron/`：

- `OmniRoute.Setup.X.Y.Z.exe`、`OmniRoute X.Y.Z.exe`（Windows）
- `OmniRoute-X.Y.Z-mac.dmg`、`OmniRoute-X.Y.Z-arm64-mac.dmg`（macOS）
- `OmniRoute-X.Y.Z.AppImage`、`omniroute-desktop_X.Y.Z_amd64.deb`（Linux）

发布版本会发布到 GitHub Releases（`diegosouzapw/OmniRoute`），`electron-updater` 也会在此检查新版本。

## 故障排除

| 症状                                                            | 解决方法                                                                                                                                      |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron 主版本升级后出现 `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 提供 Node-API 预构建二进制文件——请在根目录重新运行 `npm install` 和 `prepare:bundle`（它会验证当前平台的预构建二进制文件） |
| 原生模块出现 `ERR_DLOPEN_FAILED`                                | 重新运行 `prepare:bundle`——如果缺少当前平台的 Node-API 预构建二进制文件，它会立即失败                                                         |
| Linux 上窗口显示为空白                                          | 确认 Next.js 服务器确实已绑定到 PORT（检查 `[Server]` 日志）                                                                                  |
| macOS 公证过程停滞                                              | 确保已导出 `APPLE_*` 变量，而不是仅将其配置在 `.env` 中                                                                                       |
| Windows SmartScreen 警告                                        | 使用 EV 证书签名，或让用户右键单击 →“仍要运行”                                                                                                |
| 冒烟测试因端口被占用而失败                                      | 运行 `electron:smoke:packaged` 之前，停止使用 20128 端口的所有本地开发服务器                                                                  |

## 另请参阅

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- 源文件：`electron/main.js`、`electron/preload.js`、`electron/package.json`
- 辅助脚本：`scripts/build/prepare-electron-standalone.mjs`、`scripts/dev/smoke-electron-packaged.mjs`
