# Electron Desktop Guide

> **Source of truth:** `electron/` workspace
> **Last updated:** 2026-05-13 — v3.8.0

OmniRoute ships a cross-platform desktop app (Windows / macOS / Linux) built on
**Electron 41** + **electron-builder 26.10**. The desktop app spawns the Next.js
standalone server as a child process, points a `BrowserWindow` at it, and adds a
system tray, auto-updater, IPC bridge, and zero-config secret bootstrap.

## Architecture

```
┌──────────────────────────────────────────────┐
│ Electron main process (electron/main.js)     │
│ ├─ Single-instance lock                       │
│ ├─ Child process: Next.js standalone server  │
│ │   (spawned with Electron's Node runtime)   │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ System tray + context menu                │
│ ├─ Auto-update via electron-updater          │
│ ├─ Content Security Policy (session headers) │
│ └─ Secret bootstrap (JWT / API_KEY_SECRET)   │
└──────────────────────────────────────────────┘
            ↕ IPC bridge (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderer (Next.js dashboard)                  │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## Versions

Confirmed from `electron/package.json`:

| Package            | Version                    |
| ------------------ | -------------------------- |
| `electron`         | `^41.5.1`                  |
| `electron-builder` | `^26.10.0`                 |
| `electron-updater` | `^6.8.5`                   |
| `better-sqlite3`   | `^12.9.0`                  |
| App version        | `3.8.0`                    |
| App id             | `online.omniroute.desktop` |
| Product name       | `OmniRoute`                |

## Scripts (root `package.json`)

| Script                            | Purpose                                                                    |
| --------------------------------- | -------------------------------------------------------------------------- |
| `npm run electron:dev`            | Starts `npm run dev` + waits for `localhost:20128` + launches Electron     |
| `npm run electron:build`          | Builds Next.js then runs `electron-builder` for the current OS             |
| `npm run electron:build:win`      | Builds Windows NSIS installer + portable (x64)                             |
| `npm run electron:build:mac`      | Builds macOS DMG (Intel + Apple Silicon)                                   |
| `npm run electron:build:linux`    | Builds Linux AppImage + DEB (x64 + arm64)                                  |
| `npm run electron:smoke:packaged` | Launches packaged binary and probes `/login` for HTTP 200, then shuts down |

The `electron/` workspace also exposes:

- `npm run prepare:bundle` — runs `scripts/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — single-arch macOS builds
- `npm run pack` — directory-only build for local testing (no installer)

## Directory Layout

```
electron/
├── package.json              # Electron deps + electron-builder config
├── main.js                   # Main process (24 KB — see annotations below)
├── preload.js                # contextBridge IPC bridge
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI types
├── README.md                 # In-workspace notes
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder output (gitignored)

scripts/
├── prepare-electron-standalone.mjs   # Stages .next/electron-standalone bundle
└── smoke-electron-packaged.mjs       # Post-build smoke test
```

Both `main.js` and `preload.js` are **CommonJS `.js` files**, not TypeScript. The
renderer-side typings live in `electron/types.d.ts`.

## IPC Bridge (`preload.js`)

The preload exposes a whitelisted API on `window.electronAPI` using `contextBridge`
with `contextIsolation: true` and `nodeIntegration: false`.

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

Exposed methods:

| Renderer call                                                     | Type                       |
| ----------------------------------------------------------------- | -------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                     |
| `openExternal(url)`                                               | invoke                     |
| `getDataDir()`                                                    | invoke                     |
| `restartServer()`                                                 | invoke                     |
| `getAppVersion()`                                                 | invoke                     |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                     |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                       |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (returns disposer) |

The receive helpers return a **disposer function** rather than relying on
`removeAllListeners` — this prevents listener accumulation when React components
remount.

## Server Lifecycle

`main.js` spawns the Next.js standalone bundle directly with the Electron Node
runtime to avoid native-module ABI mismatch with system Node:

```js
spawn(process.execPath, [serverScript], {
  cwd: NEXT_SERVER_PATH,
  env: { ...serverEnv, PORT, NODE_ENV: "production", ELECTRON_RUN_AS_NODE: "1", NODE_PATH },
  stdio: "pipe",
});
```

Highlights:

- `waitForServer()` polls the URL up to 30 s before showing the window (no blank screen on cold start).
- `stdio: "pipe"` captures stdout/stderr; ready phrases (`Ready` / `listening`) emit `server-status: running` over IPC.
- `before-quit` waits up to 5 s for graceful SIGTERM (WAL checkpoint) then sends SIGKILL.
- Port switcher in the tray (`20128`, `3000`, `8080`) stops and restarts the server, then reloads the BrowserWindow.

## Zero-config Secret Bootstrap

On first launch, the main process auto-generates and persists missing secrets:

| Secret                   | Source                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                            |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (refuses if encrypted creds already exist) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                            |

Persisted to `<DATA_DIR>/server.env`. `DATA_DIR` resolves to:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` or `~/.omniroute`
- macOS: `~/.omniroute`

## Window & Tray

- `BrowserWindow`: 1400×900 (min 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, traffic-light at `{ x: 16, y: 16 }`.
- Windows/Linux: native title bar.
- Close button minimizes to tray; the tray menu has **Open OmniRoute**, **Open Dashboard** (external browser), **Server Port** submenu, **Check for Updates**, **Quit**.

## Content Security Policy

Set via `session.defaultSession.webRequest.onHeadersReceived`. Notable directives:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev mode adds `'unsafe-eval'` to `script-src` only

## Auto-update

Uses `electron-updater` with the GitHub provider (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Events forwarded to renderer via `update-status` IPC:
  `checking`, `available`, `not-available`, `downloading` (with `percent`), `downloaded`, `error`
- `installUpdate()` kills the server then calls `autoUpdater.quitAndInstall()`
- Skipped in dev mode (`!app.isPackaged`)

## Build Pipeline

1. `npm run build` → Next.js standalone in `.next/standalone`.
2. `prepare-electron-standalone.mjs` → re-stages into `.next/electron-standalone` and rewrites absolute paths inside `server.js` + `required-server-files.json` so the bundle is relocatable.
3. `electron-builder` packages `main.js`, `preload.js`, `node_modules`, and `extraResources: { ../.next/electron-standalone → app }`.

### Build targets

| OS      | Targets                                   |
| ------- | ----------------------------------------- |
| Windows | NSIS installer + portable (x64)           |
| macOS   | DMG (Intel + arm64, drag-to-Applications) |
| Linux   | AppImage + DEB (x64 + arm64)              |

NSIS settings: `oneClick: false`, lets the user choose the install directory, creates Desktop and Start-Menu shortcuts.

## Smoke Testing Packaged Build

```bash
npm run electron:smoke:packaged
```

`scripts/smoke-electron-packaged.mjs`:

- Auto-discovers the packaged binary in `electron/dist-electron/` for the current platform.
- Launches with isolated `HOME`/`APPDATA`/`XDG_*` directories so it doesn't touch developer data.
- Polls `http://127.0.0.1:20128/login` for HTTP 200 within 45 s.
- Watches stderr/stdout for fatal patterns (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, etc.).
- Waits 2 s of stable runtime after readiness, then issues SIGTERM and waits for the port to free.
- In CI, automatically passes `--no-sandbox --disable-gpu` (and `--disable-dev-shm-usage` on Linux).

Env overrides: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Code Signing

`electron/package.json` does **not** wire signing credentials directly. Pass them via env vars to `electron-builder`:

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

AppImage signing is optional — set `LINUX_GPG_KEY` if signing.

## Distribution

Artifacts land in `electron/dist-electron/`:

- `OmniRoute Setup X.Y.Z.exe`, `OmniRoute-X.Y.Z-portable.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Releases are published to GitHub Releases (`diegosouzapw/OmniRoute`), which is also where `electron-updater` checks for new versions.

## Troubleshooting

| Symptom                                                         | Fix                                                                         |
| --------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` after Electron major bump | `cd electron && npm rebuild`                                                |
| `ERR_DLOPEN_FAILED` for native module                           | Re-run `prepare:bundle` and verify ABI matches Electron's Node              |
| Window appears blank on Linux                                   | Confirm Next.js server actually bound to PORT (check `[Server]` logs)       |
| macOS notarization stalls                                       | Ensure `APPLE_*` vars are exported, not just in `.env`                      |
| Windows SmartScreen warning                                     | Sign with EV cert, or users right-click → "Run anyway"                      |
| Smoke test fails with port-in-use                               | Stop any local dev server on 20128 before running `electron:smoke:packaged` |

## See Also

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md)
- Source: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Helpers: `scripts/prepare-electron-standalone.mjs`, `scripts/smoke-electron-packaged.mjs`
