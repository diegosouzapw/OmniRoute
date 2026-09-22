# Electron Desktop Guide (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **ಅಧಿಕೃತ ಮೂಲ:** `electron/` ವರ್ಕ್ಸ್ಪೇಸ್
> **ಕೊನೆಯ ನವೀಕರಣ:** 2026-06-28 — v3.8.40

OmniRoute, **Electron 41** + **electron-builder 26.10** ಆಧಾರಿತ ಕ್ರಾಸ್-ಪ್ಲಾಟ್ಫಾರ್ಮ್ ಡೆಸ್ಕ್ಟಾಪ್ ಅಪ್ಲಿಕೇಶನ್ಅನ್ನು (Windows / macOS / Linux) ಒದಗಿಸುತ್ತದೆ. ಡೆಸ್ಕ್ಟಾಪ್ ಅಪ್ಲಿಕೇಶನ್ Next.js ಸ್ವತಂತ್ರ ಸರ್ವರ್ ಅನ್ನು ಚೈಲ್ಡ್ ಪ್ರೊಸೆಸ್ ಆಗಿ ಪ್ರಾರಂಭಿಸಿ, ಅದರತ್ತ `BrowserWindow` ಅನ್ನು ನಿರ್ದೇಶಿಸುತ್ತದೆ ಹಾಗೂ ಸಿಸ್ಟಂ ಟ್ರೇ, ಸ್ವಯಂ-ನವೀಕರಣ ಸಾಧನ, IPC ಬ್ರಿಡ್ಜ್ ಮತ್ತು ಸಂರಚನೆ-ಮುಕ್ತ ರಹಸ್ಯ ಬೂಟ್ಸ್ಟ್ರ್ಯಾಪ್ ಅನ್ನು ಸೇರಿಸುತ್ತದೆ.

## ಆರ್ಕಿಟೆಕ್ಚರ್

```
┌─────────────────────────────────────────────────────┐
│ Electron ಮುಖ್ಯ ಪ್ರೊಸೆಸ್ (electron/main.js)          │
│ ├─ ಏಕ-ಇನ್ಸ್ಟನ್ಸ್ ಲಾಕ್                              │
│ ├─ ಚೈಲ್ಡ್ ಪ್ರೊಸೆಸ್: Next.js ಸ್ವತಂತ್ರ ಸರ್ವರ್          │
│ │   (Electronನ Node ರನ್ಟೈಮ್ನೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸಲಾಗಿದೆ) │
│ ├─ BrowserWindow → http://localhost:PORT            │
│ ├─ ಸಿಸ್ಟಂ ಟ್ರೇ + ಸಂದರ್ಭ ಮೆನು                        │
│ ├─ electron-updater ಮೂಲಕ ಸ್ವಯಂ-ನವೀಕರಣ               │
│ ├─ ವಿಷಯ ಭದ್ರತಾ ನೀತಿ (ಸೆಷನ್ ಹೆಡರ್ಗಳು)              │
│ └─ ರಹಸ್ಯ ಬೂಟ್ಸ್ಟ್ರ್ಯಾಪ್ (JWT / API_KEY_SECRET)      │
└─────────────────────────────────────────────────────┘
            ↕ IPC ಬ್ರಿಡ್ಜ್ (electron/preload.js)
┌─────────────────────────────────────────────────────┐
│ ರೆಂಡರರ್ (Next.js ಡ್ಯಾಶ್ಬೋರ್ಡ್)                     │
│   window.electronAPI.* (contextIsolation)           │
└─────────────────────────────────────────────────────┘
```

## ಆವೃತ್ತಿಗಳು

`electron/package.json` ನಿಂದ ದೃಢೀಕರಿಸಲಾಗಿದೆ:

| ಪ್ಯಾಕೇಜ್           | ಆವೃತ್ತಿ                                                              |
| ------------------ | -------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                            |
| `electron-builder` | `^26.15.3`                                                           |
| `electron-updater` | `^6.8.9`                                                             |
| `better-sqlite3`   | ರೂಟ್ `^13.0.2` (Node-API ಪೂರ್ವನಿರ್ಮಿತಗಳು — Electron ಮರುನಿರ್ಮಾಣವಿಲ್ಲ) |
| ಅಪ್ಲಿಕೇಶನ್ ಆವೃತ್ತಿ | `3.8.0`                                                              |
| ಅಪ್ಲಿಕೇಶನ್ ಐಡಿ     | `online.omniroute.desktop`                                           |
| ಉತ್ಪನ್ನದ ಹೆಸರು     | `OmniRoute`                                                          |

## ಸ್ಕ್ರಿಪ್ಟ್ಗಳು (ರೂಟ್ `package.json`)

| ಸ್ಕ್ರಿಪ್ಟ್                        | ಉದ್ದೇಶ                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` ಅನ್ನು ಪ್ರಾರಂಭಿಸುತ್ತದೆ + `localhost:20128` ಗಾಗಿ ಕಾಯುತ್ತದೆ + Electron ಅನ್ನು ಪ್ರಾರಂಭಿಸುತ್ತದೆ |
| `npm run electron:build`          | Next.js ಅನ್ನು ನಿರ್ಮಿಸಿ, ನಂತರ ಪ್ರಸ್ತುತ OS ಗಾಗಿ `electron-builder` ಅನ್ನು ಚಲಾಯಿಸುತ್ತದೆ                     |
| `npm run electron:build:win`      | Windows NSIS ಇನ್ಸ್ಟಾಲರ್ + ಪೋರ್ಟಬಲ್ (x64) ಅನ್ನು ನಿರ್ಮಿಸುತ್ತದೆ                                            |
| `npm run electron:build:mac`      | macOS DMG (Intel + Apple Silicon) ಅನ್ನು ನಿರ್ಮಿಸುತ್ತದೆ                                                   |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) ಅನ್ನು ನಿರ್ಮಿಸುತ್ತದೆ                                                  |
| `npm run electron:smoke:packaged` | ಪ್ಯಾಕೇಜ್ ಮಾಡಿದ ಬೈನರಿಯನ್ನು ಪ್ರಾರಂಭಿಸಿ, HTTP 200 ಗಾಗಿ `/login` ಅನ್ನು ಪರಿಶೀಲಿಸಿ, ನಂತರ ಸ್ಥಗಿತಗೊಳಿಸುತ್ತದೆ    |

`electron/` ವರ್ಕ್ಸ್ಪೇಸ್ ಈ ಕೆಳಗಿನವುಗಳನ್ನೂ ಒದಗಿಸುತ್ತದೆ:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` ಅನ್ನು ಚಲಾಯಿಸುತ್ತದೆ
- `npm run build:mac-x64` / `build:mac-arm64` — ಏಕ-ಆರ್ಕಿಟೆಕ್ಚರ್ macOS ನಿರ್ಮಾಣಗಳು
- `npm run pack` — ಸ್ಥಳೀಯ ಪರೀಕ್ಷೆಗಾಗಿ ಡೈರೆಕ್ಟರಿ-ಮಾತ್ರದ ನಿರ್ಮಾಣ (ಇನ್ಸ್ಟಾಲರ್ ಇಲ್ಲ)

## ಡೈರೆಕ್ಟರಿ ವಿನ್ಯಾಸ

```
electron/
├── package.json              # Electron ಅವಲಂಬನೆಗಳು + electron-builder ಸಂರಚನೆ
├── main.js                   # ಮುಖ್ಯ ಪ್ರಕ್ರಿಯೆ (24 KB — ಕೆಳಗಿನ ಟಿಪ್ಪಣಿಗಳನ್ನು ನೋಡಿ)
├── preload.js                # contextBridge IPC ಸೇತುವೆ
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI ಪ್ರಕಾರಗಳು
├── README.md                 # ಕಾರ್ಯಕ್ಷೇತ್ರದೊಳಗಿನ ಟಿಪ್ಪಣಿಗಳು
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder ಔಟ್ಪುಟ್ (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone ಬಂಡಲ್ ಅನ್ನು ಸಿದ್ಧಪಡಿಸುತ್ತದೆ
└── dev/
    └── smoke-electron-packaged.mjs       # ಬಿಲ್ಡ್ ನಂತರದ ಸ್ಮೋಕ್ ಪರೀಕ್ಷೆ
```

`main.js` ಮತ್ತು `preload.js` ಎರಡೂ TypeScript ಅಲ್ಲ, ಅವು **CommonJS `.js` ಫೈಲ್ಗಳು**.
ರೆಂಡರರ್ ಬದಿಯ ಟೈಪಿಂಗ್ಗಳು `electron/types.d.ts` ನಲ್ಲಿವೆ.

## IPC ಸೇತುವೆ (`preload.js`)

ಪ್ರೀಲೋಡ್, `contextIsolation: true` ಮತ್ತು `nodeIntegration: false` ಜೊತೆಗೆ `contextBridge`
ಬಳಸಿ `window.electronAPI` ನಲ್ಲಿ ಅನುಮತಿಪಟ್ಟಿಯ API ಅನ್ನು ಬಹಿರಂಗಪಡಿಸುತ್ತದೆ.

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

ಬಹಿರಂಗಪಡಿಸಿದ ವಿಧಾನಗಳು:

| ರೆಂಡರರ್ ಕರೆ                                                       | ಪ್ರಕಾರ                                     |
| ----------------------------------------------------------------- | ------------------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                     |
| `openExternal(url)`                                               | invoke                                     |
| `getDataDir()`                                                    | invoke                                     |
| `restartServer()`                                                 | invoke                                     |
| `getAppVersion()`                                                 | invoke                                     |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                     |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                       |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (ಡಿಸ್ಪೋಸರ್ ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ) |

`removeAllListeners` ಅನ್ನು ಅವಲಂಬಿಸುವ ಬದಲು, receive ಸಹಾಯಕಗಳು **ಡಿಸ್ಪೋಸರ್ ಫಂಕ್ಷನ್** ಅನ್ನು
ಹಿಂದಿರುಗಿಸುತ್ತವೆ — React ಕಾಂಪೊನೆಂಟ್ಗಳು ಮರುಮೌಂಟ್ ಆದಾಗ ಲಿಸನರ್ಗಳು ಸಂಗ್ರಹವಾಗುವುದನ್ನು ಇದು
ತಡೆಯುತ್ತದೆ.

## ಸರ್ವರ್ ಜೀವನಚಕ್ರ

ಸಿಸ್ಟಮ್ Node ಜೊತೆಗಿನ ನೇಟಿವ್-ಮಾಡ್ಯೂಲ್ ABI ಅಸಾಮರಸ್ಯವನ್ನು ತಪ್ಪಿಸಲು, `main.js` Next.js
ಸ್ಟ್ಯಾಂಡ್ಅಲೋನ್ ಬಂಡಲ್ ಅನ್ನು Electron Node ರನ್ಟೈಮ್ನೊಂದಿಗೆ ನೇರವಾಗಿ ಸ್ಪಾನ್ ಮಾಡುತ್ತದೆ:

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

ಮುಖ್ಯಾಂಶಗಳು:

- ವಿಂಡೋವನ್ನು ತೋರಿಸುವ ಮೊದಲು `waitForServer()` URL ಅನ್ನು 30 s ವರೆಗೆ ಪೋಲ್ ಮಾಡುತ್ತದೆ (ಕೋಲ್ಡ್ ಸ್ಟಾರ್ಟ್ನಲ್ಲಿ ಖಾಲಿ ಪರದೆ ಇರುವುದಿಲ್ಲ).
- `stdio: "pipe"` stdout/stderr ಅನ್ನು ಸೆರೆಹಿಡಿಯುತ್ತದೆ; ಸಿದ್ಧತೆಯನ್ನು ಸೂಚಿಸುವ ಪದಗುಚ್ಛಗಳು (`Ready` / `listening`) IPC ಮೂಲಕ `server-status: running` ಅನ್ನು ಎಮಿಟ್ ಮಾಡುತ್ತವೆ.
- `before-quit`, ಸುಗಮವಾದ SIGTERM (WAL ಚೆಕ್ಪಾಯಿಂಟ್) ಗಾಗಿ 5 s ವರೆಗೆ ಕಾಯುತ್ತದೆ ಮತ್ತು ನಂತರ SIGKILL ಕಳುಹಿಸುತ್ತದೆ.
- ಟ್ರೇಯಲ್ಲಿರುವ ಪೋರ್ಟ್ ಸ್ವಿಚರ್ (`20128`, `3000`, `8080`) ಸರ್ವರ್ ಅನ್ನು ನಿಲ್ಲಿಸಿ ಮರುಪ್ರಾರಂಭಿಸುತ್ತದೆ, ನಂತರ BrowserWindow ಅನ್ನು ಮರುಲೋಡ್ ಮಾಡುತ್ತದೆ.

## ಶೂನ್ಯ-ಕಾನ್ಫಿಗ್ ರಹಸ್ಯ ಬೂಟ್ಸ್ಟ್ರ್ಯಾಪ್

ಮೊದಲ ಪ್ರಾರಂಭದಲ್ಲಿ, ಮುಖ್ಯ ಪ್ರಕ್ರಿಯೆಯು ಲಭ್ಯವಿಲ್ಲದ ರಹಸ್ಯಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ರಚಿಸಿ ಶಾಶ್ವತವಾಗಿ ಸಂಗ್ರಹಿಸುತ್ತದೆ:

| ರಹಸ್ಯ                    | ಮೂಲ                                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                   |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡಿದ ಕ್ರೆಡೆನ್ಶಿಯಲ್ಗಳು ಈಗಾಗಲೇ ಇದ್ದರೆ ನಿರಾಕರಿಸುತ್ತದೆ) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                   |

`<DATA_DIR>/server.env` ಗೆ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ. `DATA_DIR` ಈ ಕೆಳಗಿನಂತೆ ನಿರ್ಧರಿಸಲ್ಪಡುತ್ತದೆ:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` ಅಥವಾ `~/.omniroute`
- macOS: `~/.omniroute`

## ವಿಂಡೋ ಮತ್ತು ಟ್ರೇ

- `BrowserWindow`: 1400×900 (ಕನಿಷ್ಠ 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, ಟ್ರಾಫಿಕ್-ಲೈಟ್ `{ x: 16, y: 16 }` ನಲ್ಲಿ.
- Windows/Linux: ಸ್ಥಳೀಯ ಶೀರ್ಷಿಕೆ ಪಟ್ಟಿ.
- ಮುಚ್ಚುವ ಬಟನ್ ಟ್ರೇಗೆ ಕನಿಷ್ಠಗೊಳಿಸುತ್ತದೆ; ಟ್ರೇ ಮೆನುವಿನಲ್ಲಿ **OmniRoute ತೆರೆಯಿರಿ**, **ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೆರೆಯಿರಿ** (ಬಾಹ್ಯ ಬ್ರೌಸರ್), **ಸರ್ವರ್ ಪೋರ್ಟ್** ಉಪಮೆನು, **ನವೀಕರಣಗಳಿಗಾಗಿ ಪರಿಶೀಲಿಸಿ**, **ನಿರ್ಗಮಿಸಿ** ಆಯ್ಕೆಗಳಿವೆ.

## ವಿಷಯ ಭದ್ರತಾ ನೀತಿ

`session.defaultSession.webRequest.onHeadersReceived` ಮೂಲಕ ಹೊಂದಿಸಲಾಗಿದೆ. ಗಮನಾರ್ಹ ನಿರ್ದೇಶನಗಳು:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- ಡೆವ್ ಮೋಡ್ನಲ್ಲಿ `script-src` ಗೆ ಮಾತ್ರ `'unsafe-eval'` ಸೇರಿಸಲಾಗುತ್ತದೆ

## ಸ್ವಯಂ-ನವೀಕರಣ

GitHub ಪೂರೈಕೆದಾರರೊಂದಿಗೆ (`diegosouzapw/OmniRoute`) `electron-updater` ಅನ್ನು ಬಳಸುತ್ತದೆ.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- ಈವೆಂಟ್ಗಳನ್ನು `update-status` IPC ಮೂಲಕ ರೆಂಡರರ್ಗೆ ರವಾನಿಸಲಾಗುತ್ತದೆ:
  `checking`, `available`, `not-available`, `downloading` (`percent` ಜೊತೆಗೆ), `downloaded`, `error`
- `installUpdate()` ಸರ್ವರ್ ಅನ್ನು ಸ್ಥಗಿತಗೊಳಿಸಿ ನಂತರ `autoUpdater.quitAndInstall()` ಅನ್ನು ಕರೆಯುತ್ತದೆ
- ಡೆವ್ ಮೋಡ್ನಲ್ಲಿ (`!app.isPackaged`) ಬಿಟ್ಟುಬಿಡಲಾಗುತ್ತದೆ

## ಬಿಲ್ಡ್ ಪೈಪ್ಲೈನ್

1. `npm run build` → `.next/standalone` ನಲ್ಲಿ Next.js ಸ್ವತಂತ್ರ ಬಿಲ್ಡ್.
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone` ಗೆ ಮರು-ಸ್ಟೇಜ್ ಮಾಡುತ್ತದೆ ಮತ್ತು ಬಂಡಲ್ ಅನ್ನು ಸ್ಥಳಾಂತರಿಸಬಹುದಾಗಿಸಲು `server.js` + `required-server-files.json` ಒಳಗಿನ ಸಂಪೂರ್ಣ ಪಥಗಳನ್ನು ಮರುಬರೆಯುತ್ತದೆ.
3. `electron-builder` `main.js`, `preload.js`, `node_modules`, ಮತ್ತು `extraResources: { ../.next/electron-standalone → app }` ಅನ್ನು ಪ್ಯಾಕೇಜ್ ಮಾಡುತ್ತದೆ.

### ಬಿಲ್ಡ್ ಗುರಿಗಳು

| OS      | ಗುರಿಗಳು                                       |
| ------- | --------------------------------------------- |
| Windows | NSIS ಇನ್ಸ್ಟಾಲರ್ + ಪೋರ್ಟಬಲ್ (x64)              |
| macOS   | DMG (Intel + arm64, Applications ಗೆ ಎಳೆ-ಬಿಡಿ) |
| Linux   | AppImage + DEB (x64 + arm64)                  |

NSIS ಸೆಟ್ಟಿಂಗ್ಗಳು: `oneClick: false`, ಬಳಕೆದಾರರಿಗೆ ಇನ್ಸ್ಟಾಲ್ ಡೈರೆಕ್ಟರಿಯನ್ನು ಆಯ್ಕೆ ಮಾಡಲು ಅವಕಾಶ ನೀಡುತ್ತದೆ, Desktop ಮತ್ತು Start-Menu ಶಾರ್ಟ್ಕಟ್ಗಳನ್ನು ರಚಿಸುತ್ತದೆ.

## ಪ್ಯಾಕೇಜ್ ಮಾಡಿದ ಬಿಲ್ಡ್ನ ಸ್ಮೋಕ್ ಪರೀಕ್ಷೆ

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- ಪ್ರಸ್ತುತ ಪ್ಲಾಟ್ಫಾರ್ಮ್ಗಾಗಿ `electron/dist-electron/` ನಲ್ಲಿ ಪ್ಯಾಕೇಜ್ ಮಾಡಿದ ಬೈನರಿಯನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪತ್ತೆಹಚ್ಚುತ್ತದೆ.
- ಡೆವಲಪರ್ ಡೇಟಾವನ್ನು ಸ್ಪರ್ಶಿಸದಂತೆ ಪ್ರತ್ಯೇಕಿಸಿದ `HOME`/`APPDATA`/`XDG_*` ಡೈರೆಕ್ಟರಿಗಳೊಂದಿಗೆ ಪ್ರಾರಂಭಿಸುತ್ತದೆ.
- 45 s ಒಳಗೆ HTTP 200 ಪ್ರತಿಕ್ರಿಯೆಗಾಗಿ `http://127.0.0.1:20128/login` ಅನ್ನು ಪೋಲ್ ಮಾಡುತ್ತದೆ.
- ಗಂಭೀರ ಮಾದರಿಗಳಿಗಾಗಿ stderr/stdout ಅನ್ನು ಗಮನಿಸುತ್ತದೆ (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, ಇತ್ಯಾದಿ).
- ಸಿದ್ಧತೆಯ ನಂತರ 2 s ಸ್ಥಿರ ರನ್ಟೈಮ್ಗಾಗಿ ಕಾಯುತ್ತದೆ, ನಂತರ SIGTERM ಕಳುಹಿಸಿ ಪೋರ್ಟ್ ಮುಕ್ತವಾಗುವವರೆಗೆ ಕಾಯುತ್ತದೆ.
- CI ನಲ್ಲಿ, ಸ್ವಯಂಚಾಲಿತವಾಗಿ `--no-sandbox --disable-gpu` (ಮತ್ತು Linux ನಲ್ಲಿ `--disable-dev-shm-usage`) ಅನ್ನು ಪಾಸ್ ಮಾಡುತ್ತದೆ.

ಪರಿಸರ ಓವರ್ರೈಡ್ಗಳು: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## ಕೋಡ್ ಸಹಿ

`electron/package.json` ಸಹಿ ರುಜುವಾತುಗಳನ್ನು ನೇರವಾಗಿ ಸಂರಚಿಸುವುದಿಲ್ಲ. ಅವುಗಳನ್ನು env vars ಮೂಲಕ `electron-builder` ಗೆ ರವಾನಿಸಿ:

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

AppImage ಸಹಿ ಐಚ್ಛಿಕವಾಗಿದೆ — ಸಹಿ ಮಾಡಲು `LINUX_GPG_KEY` ಅನ್ನು ಹೊಂದಿಸಿ.

## ವಿತರಣೆ

ಆರ್ಟಿಫ್ಯಾಕ್ಟ್ಗಳು `electron/dist-electron/` ನಲ್ಲಿ ಲಭ್ಯವಾಗುತ್ತವೆ:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

ಬಿಡುಗಡೆಗಳನ್ನು GitHub Releases (`diegosouzapw/OmniRoute`) ನಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗುತ್ತದೆ; `electron-updater` ಹೊಸ ಆವೃತ್ತಿಗಳಿಗಾಗಿ ಪರಿಶೀಲಿಸುವ ಸ್ಥಳವೂ ಇದೇ ಆಗಿದೆ.

## ಸಮಸ್ಯೆ ಪರಿಹಾರ

| ಲಕ್ಷಣ                                                                      | ಪರಿಹಾರ                                                                                                                                                                                                            |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron ಪ್ರಮುಖ ಆವೃತ್ತಿ ನವೀಕರಣದ ನಂತರ `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 Node-API ಪೂರ್ವನಿರ್ಮಿತ ಬೈನರಿಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ — ರೂಟ್ನಲ್ಲಿ `npm install` ಅನ್ನು ಮತ್ತು `prepare:bundle` ಅನ್ನು ಪುನಃ ಚಲಾಯಿಸಿ (ಇದು ಪ್ರಸ್ತುತ ಪ್ಲಾಟ್ಫಾರ್ಮ್ಗಾಗಿ ಪೂರ್ವನಿರ್ಮಿತ ಬೈನರಿಯನ್ನು ಪರಿಶೀಲಿಸುತ್ತದೆ) |
| ಸ್ಥಳೀಯ ಮಾಡ್ಯೂಲ್ಗಾಗಿ `ERR_DLOPEN_FAILED`                                    | `prepare:bundle` ಅನ್ನು ಪುನಃ ಚಲಾಯಿಸಿ — ಪ್ರಸ್ತುತ ಪ್ಲಾಟ್ಫಾರ್ಮ್ಗಾಗಿ Node-API ಪೂರ್ವನಿರ್ಮಿತ ಬೈನರಿ ಕಾಣೆಯಾಗಿದ್ದರೆ ಇದು ತಕ್ಷಣವೇ ವಿಫಲಗೊಳ್ಳುತ್ತದೆ                                                                             |
| Linux ನಲ್ಲಿ ವಿಂಡೋ ಖಾಲಿಯಾಗಿ ಕಾಣಿಸುತ್ತದೆ                                     | Next.js ಸರ್ವರ್ ನಿಜವಾಗಿಯೂ PORT ಗೆ ಬದ್ಧವಾಗಿದೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿ (`[Server]` ಲಾಗ್ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ)                                                                                                                    |
| macOS ನೋಟರೀಕರಣ ಸ್ಥಗಿತಗೊಳ್ಳುತ್ತದೆ                                           | `APPLE_*` vars ಕೇವಲ `.env` ನಲ್ಲಿ ಇರುವ ಬದಲು export ಮಾಡಲಾಗಿದೆಯೇ ಎಂದು ಖಚಿತಪಡಿಸಿ                                                                                                                                      |
| Windows SmartScreen ಎಚ್ಚರಿಕೆ                                               | EV ಪ್ರಮಾಣಪತ್ರದೊಂದಿಗೆ ಸಹಿ ಮಾಡಿ, ಅಥವಾ ಬಳಕೆದಾರರು ರೈಟ್-ಕ್ಲಿಕ್ → "ಹೇಗಾದರೂ ಚಲಾಯಿಸಿ" ಆಯ್ಕೆಮಾಡಲಿ                                                                                                                          |
| ಬಳಕೆಯಲ್ಲಿರುವ ಪೋರ್ಟ್ನಿಂದಾಗಿ ಸ್ಮೋಕ್ ಟೆಸ್ಟ್ ವಿಫಲಗೊಳ್ಳುತ್ತದೆ                   | `electron:smoke:packaged` ಅನ್ನು ಚಲಾಯಿಸುವ ಮೊದಲು 20128 ನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಿರುವ ಯಾವುದೇ ಸ್ಥಳೀಯ ಡೆವಲಪ್ಮೆಂಟ್ ಸರ್ವರ್ ಅನ್ನು ನಿಲ್ಲಿಸಿ                                                                                  |

## ಇದನ್ನೂ ನೋಡಿ

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- ಮೂಲ: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- ಸಹಾಯಕಗಳು: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
