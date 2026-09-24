# Electron Desktop Guide (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **ആധികാരിക ഉറവിടം:** `electron/` വർക്ക്സ്പേസ്
> **അവസാനം പുതുക്കിയത്:** 2026-06-28 — v3.8.40

**Electron 41** + **electron-builder 26.10** എന്നിവയെ അടിസ്ഥാനമാക്കി നിർമ്മിച്ച ഒരു ക്രോസ്-പ്ലാറ്റ്ഫോം ഡെസ്ക്ടോപ്പ് ആപ്പ് (Windows / macOS / Linux) OmniRoute നൽകുന്നു. ഡെസ്ക്ടോപ്പ് ആപ്പ് Next.js സ്റ്റാൻഡ്എലോൺ സെർവറിനെ ഒരു ചൈൽഡ് പ്രോസസായി ആരംഭിക്കുകയും, ഒരു `BrowserWindow` അതിലേക്ക് ചൂണ്ടുകയും, സിസ്റ്റം ട്രേ, ഓട്ടോ-അപ്ഡേറ്റർ, IPC ബ്രിഡ്ജ്, സീറോ-കോൺഫിഗ് സീക്രട്ട് ബൂട്ട്സ്ട്രാപ്പ് എന്നിവ ചേർക്കുകയും ചെയ്യുന്നു.

## ആർക്കിടെക്ചർ

```
┌─────────────────────────────────────────────────────────┐
│ Electron മെയിൻ പ്രോസസ് (electron/main.js)                │
│ ├─ സിംഗിൾ-ഇൻസ്റ്റൻസ് ലോക്ക്                                │
│ ├─ ചൈൽഡ് പ്രോസസ്: Next.js സ്റ്റാൻഡ്എലോൺ സെർവർ          │
│ │   (Electron-ന്റെ Node റൺടൈം ഉപയോഗിച്ച് ആരംഭിച്ചത്)      │
│ ├─ BrowserWindow → http://localhost:PORT                 │
│ ├─ സിസ്റ്റം ട്രേ + കോൺടെക്സ്റ്റ് മെനു                       │
│ ├─ electron-updater വഴിയുള്ള ഓട്ടോ-അപ്ഡേറ്റ്             │
│ ├─ കണ്ടന്റ് സെക്യൂരിറ്റി പോളിസി (സെഷൻ ഹെഡറുകൾ)           │
│ └─ സീക്രട്ട് ബൂട്ട്സ്ട്രാപ്പ് (JWT / API_KEY_SECRET)       │
└─────────────────────────────────────────────────────────┘
            ↕ IPC ബ്രിഡ്ജ് (electron/preload.js)
┌─────────────────────────────────────────────────────────┐
│ റെൻഡറർ (Next.js ഡാഷ്ബോർഡ്)                             │
│   window.electronAPI.* (contextIsolation)                │
└─────────────────────────────────────────────────────────┘
```

## പതിപ്പുകൾ

`electron/package.json`-ൽ നിന്ന് സ്ഥിരീകരിച്ചത്:

| പാക്കേജ്           | പതിപ്പ്                                                          |
| ------------------ | ---------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                        |
| `electron-builder` | `^26.15.3`                                                       |
| `electron-updater` | `^6.8.9`                                                         |
| `better-sqlite3`   | റൂട്ട് `^13.0.2` (Node-API പ്രീബിൽഡുകൾ — Electron റീബിൽഡ് വേണ്ട) |
| ആപ്പ് പതിപ്പ്      | `3.8.0`                                                          |
| ആപ്പ് ഐഡി          | `online.omniroute.desktop`                                       |
| ഉൽപ്പന്ന നാമം      | `OmniRoute`                                                      |

## സ്ക്രിപ്റ്റുകൾ (റൂട്ട് `package.json`)

| സ്ക്രിപ്റ്റ്                      | ഉദ്ദേശ്യം                                                                                                      |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` ആരംഭിക്കുന്നു + `localhost:20128`-നായി കാത്തിരിക്കുന്നു + Electron ലോഞ്ച് ചെയ്യുന്നു             |
| `npm run electron:build`          | Next.js ബിൽഡ് ചെയ്തശേഷം നിലവിലെ OS-നായി `electron-builder` പ്രവർത്തിപ്പിക്കുന്നു                               |
| `npm run electron:build:win`      | Windows NSIS ഇൻസ്റ്റാളർ + പോർട്ടബിൾ (x64) ബിൽഡ് ചെയ്യുന്നു                                                     |
| `npm run electron:build:mac`      | macOS DMG (Intel + Apple Silicon) ബിൽഡ് ചെയ്യുന്നു                                                             |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) ബിൽഡ് ചെയ്യുന്നു                                                            |
| `npm run electron:smoke:packaged` | പാക്കേജ് ചെയ്ത ബൈനറി ലോഞ്ച് ചെയ്ത് HTTP 200 ലഭിക്കുന്നുണ്ടോയെന്ന് `/login` പരിശോധിച്ചശേഷം ഷട്ട് ഡൗൺ ചെയ്യുന്നു |

`electron/` വർക്ക്സ്പേസ് ഇനിപ്പറയുന്നവയും ലഭ്യമാക്കുന്നു:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` പ്രവർത്തിപ്പിക്കുന്നു
- `npm run build:mac-x64` / `build:mac-arm64` — സിംഗിൾ-ആർക്ക് macOS ബിൽഡുകൾ
- `npm run pack` — ലോക്കൽ പരിശോധനയ്ക്കുള്ള ഡയറക്ടറി-മാത്രം ബിൽഡ് (ഇൻസ്റ്റാളർ ഇല്ല)

## ഡയറക്ടറി ഘടന

```
electron/
├── package.json              # Electron ഡിപെൻഡൻസികൾ + electron-builder കോൺഫിഗറേഷൻ
├── main.js                   # പ്രധാന പ്രോസസ് (24 KB — താഴെയുള്ള വ്യാഖ്യാനങ്ങൾ കാണുക)
├── preload.js                # contextBridge IPC ബ്രിഡ്ജ്
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI ടൈപ്പുകൾ
├── README.md                 # വർക്ക്സ്പേസിനുള്ളിലെ കുറിപ്പുകൾ
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder ഔട്ട്പുട്ട് (git അവഗണിക്കുന്നത്)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone ബണ്ടിൽ തയ്യാറാക്കുന്നു
└── dev/
    └── smoke-electron-packaged.mjs       # ബിൽഡിന് ശേഷമുള്ള സ്മോക്ക് ടെസ്റ്റ്
```

`main.js`, `preload.js` എന്നിവ രണ്ടും TypeScript അല്ല, **CommonJS `.js` ഫയലുകളാണ്**.
റെൻഡറർ-സൈഡ് ടൈപ്പിങ്ങുകൾ `electron/types.d.ts`-ലാണ് ഉള്ളത്.

## IPC ബ്രിഡ്ജ് (`preload.js`)

`contextIsolation: true`, `nodeIntegration: false` എന്നിവ ഉപയോഗിച്ച് `contextBridge`
വഴി പ്രീലോഡ്, വൈറ്റ്ലിസ്റ്റ് ചെയ്ത ഒരു API `window.electronAPI`-യിൽ ലഭ്യമാക്കുന്നു.

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

ലഭ്യമാക്കിയിരിക്കുന്ന മെത്തഡുകൾ:

| റെൻഡറർ കോൾ                                                        | തരം                                |
| ----------------------------------------------------------------- | ---------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                             |
| `openExternal(url)`                                               | invoke                             |
| `getDataDir()`                                                    | invoke                             |
| `restartServer()`                                                 | invoke                             |
| `getAppVersion()`                                                 | invoke                             |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                             |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                               |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (ഡിസ്പോസർ തിരികെ നൽകുന്നു) |

React ഘടകങ്ങൾ വീണ്ടും മൗണ്ട് ചെയ്യുമ്പോൾ ലിസണറുകൾ കുമിഞ്ഞുകൂടുന്നത് തടയാൻ,
`removeAllListeners`-നെ ആശ്രയിക്കുന്നതിനുപകരം receive ഹെൽപ്പറുകൾ ഒരു **ഡിസ്പോസർ ഫങ്ഷൻ**
തിരികെ നൽകുന്നു.

## സെർവർ ലൈഫ്സൈക്കിൾ

സിസ്റ്റം Node-മായുള്ള നേറ്റീവ്-മൊഡ്യൂൾ ABI പൊരുത്തക്കേട് ഒഴിവാക്കാൻ, `main.js` Next.js
സ്റ്റാൻഡ്അലോൺ ബണ്ടിൽ Electron Node റൺടൈം ഉപയോഗിച്ച് നേരിട്ട് ആരംഭിക്കുന്നു:

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

പ്രധാന സവിശേഷതകൾ:

- വിൻഡോ കാണിക്കുന്നതിന് മുമ്പ് `waitForServer()` പരമാവധി 30 s വരെ URL പോൾ ചെയ്യുന്നു (കോൾഡ് സ്റ്റാർട്ടിൽ ശൂന്യമായ സ്ക്രീൻ ഉണ്ടാകില്ല).
- `stdio: "pipe"` stdout/stderr ക്യാപ്ചർ ചെയ്യുന്നു; റെഡി സൂചിപ്പിക്കുന്ന വാക്യങ്ങൾ (`Ready` / `listening`) IPC വഴി `server-status: running` എമിറ്റ് ചെയ്യുന്നു.
- `before-quit`, സുഗമമായ SIGTERM-നായി (WAL ചെക്ക്പോയിന്റ്) പരമാവധി 5 s വരെ കാത്തിരിക്കുകയും തുടർന്ന് SIGKILL അയയ്ക്കുകയും ചെയ്യുന്നു.
- ട്രേയിലെ പോർട്ട് സ്വിച്ചർ (`20128`, `3000`, `8080`) സെർവർ നിർത്തി പുനരാരംഭിച്ച ശേഷം BrowserWindow വീണ്ടും ലോഡ് ചെയ്യുന്നു.

## സീറോ-കോൺഫിഗ് സീക്രട്ട് ബൂട്ട്സ്ട്രാപ്പ്

ആദ്യമായി സമാരംഭിക്കുമ്പോൾ, പ്രധാന പ്രോസസ് ലഭ്യമല്ലാത്ത സീക്രട്ടുകൾ സ്വയമേവ സൃഷ്ടിച്ച് സ്ഥിരമായി സംഭരിക്കുന്നു:

| സീക്രട്ട്                | ഉറവിടം                                                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                          |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (എൻക്രിപ്റ്റ് ചെയ്ത ക്രെഡൻഷ്യലുകൾ ഇതിനകം നിലവിലുണ്ടെങ്കിൽ നിരസിക്കുന്നു) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                          |

`<DATA_DIR>/server.env`-ലേക്ക് സ്ഥിരമായി സംഭരിക്കുന്നു. `DATA_DIR` ഇപ്രകാരം നിർണ്ണയിക്കപ്പെടുന്നു:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` അല്ലെങ്കിൽ `~/.omniroute`
- macOS: `~/.omniroute`

## വിൻഡോയും ട്രേയും

- `BrowserWindow`: 1400×900 (കുറഞ്ഞത് 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, ട്രാഫിക് ലൈറ്റ് `{ x: 16, y: 16 }`-ൽ.
- Windows/Linux: നേറ്റീവ് ടൈറ്റിൽ ബാർ.
- ക്ലോസ് ബട്ടൺ ട്രേയിലേക്ക് മിനിമൈസ് ചെയ്യുന്നു; ട്രേ മെനുവിൽ **OmniRoute തുറക്കുക**, **ഡാഷ്ബോർഡ് തുറക്കുക** (ബാഹ്യ ബ്രൗസർ), **സെർവർ പോർട്ട്** സബ്മെനു, **അപ്ഡേറ്റുകൾ പരിശോധിക്കുക**, **പുറത്തുകടക്കുക** എന്നിവയുണ്ട്.

## ഉള്ളടക്ക സുരക്ഷാ നയം

`session.defaultSession.webRequest.onHeadersReceived` വഴി സജ്ജീകരിക്കുന്നു. ശ്രദ്ധേയമായ ഡയറക്ടീവുകൾ:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev മോഡിൽ `script-src`-ലേക്ക് മാത്രം `'unsafe-eval'` ചേർക്കുന്നു

## സ്വയമേവയുള്ള അപ്ഡേറ്റ്

GitHub പ്രൊവൈഡർ (`diegosouzapw/OmniRoute`) ഉപയോഗിച്ച് `electron-updater` പ്രയോജനപ്പെടുത്തുന്നു.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- ഇവന്റുകൾ `update-status` IPC വഴി റെൻഡററിലേക്ക് കൈമാറുന്നു:
  `checking`, `available`, `not-available`, `downloading` (`percent` സഹിതം), `downloaded`, `error`
- `installUpdate()` സെർവർ അവസാനിപ്പിച്ചശേഷം `autoUpdater.quitAndInstall()` വിളിക്കുന്നു
- Dev മോഡിൽ (`!app.isPackaged`) ഇത് ഒഴിവാക്കുന്നു

## ബിൽഡ് പൈപ്പ്ലൈൻ

1. `npm run build` → `.next/standalone`-ൽ Next.js standalone.
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone`-ലേക്ക് വീണ്ടും സ്റ്റേജ് ചെയ്യുകയും ബണ്ടിൽ സ്ഥലം മാറ്റാനാകുന്നതിനായി `server.js` + `required-server-files.json` എന്നിവയിലെ അബ്സല്യൂട്ട് പാതകൾ തിരുത്തുകയും ചെയ്യുന്നു.
3. `electron-builder`, `main.js`, `preload.js`, `node_modules`, കൂടാതെ `extraResources: { ../.next/electron-standalone → app }` എന്നിവ പാക്കേജ് ചെയ്യുന്നു.

### ബിൽഡ് ടാർഗെറ്റുകൾ

| OS      | ടാർഗെറ്റുകൾ                                                   |
| ------- | ------------------------------------------------------------- |
| Windows | NSIS ഇൻസ്റ്റാളർ + പോർട്ടബിൾ (x64)                             |
| macOS   | DMG (Intel + arm64, Applications-ലേക്ക് ഡ്രാഗ് ചെയ്യാവുന്നത്) |
| Linux   | AppImage + DEB (x64 + arm64)                                  |

NSIS ക്രമീകരണങ്ങൾ: `oneClick: false`, ഇൻസ്റ്റാൾ ഡയറക്ടറി തിരഞ്ഞെടുക്കാൻ ഉപയോക്താവിനെ അനുവദിക്കുന്നു, Desktop, Start-Menu ഷോർട്ട്കട്ടുകൾ സൃഷ്ടിക്കുന്നു.

## പാക്കേജ് ചെയ്ത ബിൽഡിന്റെ സ്മോക്ക് ടെസ്റ്റിംഗ്

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- നിലവിലെ പ്ലാറ്റ്ഫോമിനായി `electron/dist-electron/`-ലെ പാക്കേജ് ചെയ്ത ബൈനറി സ്വയമേവ കണ്ടെത്തുന്നു.
- ഡെവലപ്പർ ഡാറ്റയെ ബാധിക്കാതിരിക്കാൻ ഒറ്റപ്പെടുത്തിയ `HOME`/`APPDATA`/`XDG_*` ഡയറക്ടറികൾ ഉപയോഗിച്ച് സമാരംഭിക്കുന്നു.
- 45 സെക്കൻഡിനുള്ളിൽ HTTP 200 ലഭിക്കുന്നതിനായി `http://127.0.0.1:20128/login` പോൾ ചെയ്യുന്നു.
- ഗുരുതരമായ പാറ്റേണുകൾക്കായി stderr/stdout നിരീക്ഷിക്കുന്നു (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` മുതലായവ).
- സജ്ജമായതിനുശേഷം 2 സെക്കൻഡ് സ്ഥിരതയുള്ള റൺടൈമിനായി കാത്തിരിക്കുന്നു, തുടർന്ന് SIGTERM അയച്ച് പോർട്ട് സ്വതന്ത്രമാകുന്നതുവരെ കാത്തിരിക്കുന്നു.
- CI-യിൽ, `--no-sandbox --disable-gpu` സ്വയമേവ പാസ് ചെയ്യുന്നു (Linux-ൽ `--disable-dev-shm-usage`-ഉം).

Env ഓവർറൈഡുകൾ: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## കോഡ് സൈനിംഗ്

`electron/package.json` സൈനിംഗ് ക്രെഡൻഷ്യലുകൾ നേരിട്ട് ബന്ധിപ്പിക്കുന്നില്ല. അവ env vars വഴി `electron-builder`-ന് കൈമാറുക:

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

AppImage സൈനിംഗ് ഐച്ഛികമാണ് — സൈൻ ചെയ്യണമെങ്കിൽ `LINUX_GPG_KEY` സജ്ജമാക്കുക.

## വിതരണം

ആർട്ടിഫാക്റ്റുകൾ `electron/dist-electron/`-ൽ ലഭിക്കും:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

റിലീസുകൾ GitHub Releases-ലേക്ക് (`diegosouzapw/OmniRoute`) പ്രസിദ്ധീകരിക്കുന്നു; പുതിയ പതിപ്പുകൾക്കായി `electron-updater` പരിശോധിക്കുന്നതും അവിടെയാണ്.

## പ്രശ്നപരിഹാരം

| ലക്ഷണം                                                                               | പരിഹാരം                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron-ന്റെ പ്രധാന പതിപ്പ് ഉയർത്തിയതിന് ശേഷം `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 Node-API പ്രീബിൽഡുകളോടെയാണ് വരുന്നത് — റൂട്ടിൽ `npm install` വീണ്ടും പ്രവർത്തിപ്പിച്ച ശേഷം `prepare:bundle` പ്രവർത്തിപ്പിക്കുക (നിലവിലെ പ്ലാറ്റ്ഫോമിനുള്ള പ്രീബിൽഡ് അത് പരിശോധിക്കുന്നു) |
| നേറ്റീവ് മൊഡ്യൂളിന് `ERR_DLOPEN_FAILED`                                              | `prepare:bundle` വീണ്ടും പ്രവർത്തിപ്പിക്കുക — നിലവിലെ പ്ലാറ്റ്ഫോമിനുള്ള Node-API പ്രീബിൽഡ് ഇല്ലെങ്കിൽ അത് ഉടൻ പരാജയപ്പെടും                                                                                  |
| Linux-ൽ വിൻഡോ ശൂന്യമായി കാണപ്പെടുന്നു                                                | Next.js സെർവർ യഥാർത്ഥത്തിൽ PORT-ലേക്ക് ബൈൻഡ് ചെയ്തിട്ടുണ്ടെന്ന് സ്ഥിരീകരിക്കുക (`[Server]` ലോഗുകൾ പരിശോധിക്കുക)                                                                                             |
| macOS നോട്ടറൈസേഷൻ സ്തംഭിക്കുന്നു                                                     | `APPLE_*` vars `.env`-ൽ മാത്രമല്ല, export ചെയ്തിട്ടുണ്ടെന്ന് ഉറപ്പാക്കുക                                                                                                                                    |
| Windows SmartScreen മുന്നറിയിപ്പ്                                                    | EV cert ഉപയോഗിച്ച് സൈൻ ചെയ്യുക, അല്ലെങ്കിൽ ഉപയോക്താക്കൾ റൈറ്റ്-ക്ലിക്ക് → "Run anyway"                                                                                                                      |
| പോർട്ട് ഉപയോഗത്തിലായതിനാൽ സ്മോക്ക് ടെസ്റ്റ് പരാജയപ്പെടുന്നു                          | `electron:smoke:packaged` പ്രവർത്തിപ്പിക്കുന്നതിന് മുമ്പ് 20128-ൽ പ്രവർത്തിക്കുന്ന ഏതെങ്കിലും ലോക്കൽ dev സെർവർ നിർത്തുക                                                                                     |

## ഇതും കാണുക

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- സോഴ്സ്: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- സഹായികൾ: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
