# Electron Desktop Guide (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **ആധികാരിക ഉറവിടം:** `electron/` workspace
> **അവസാനം പുതുക്കിയത്:** 2026-06-28 — v3.8.40

**Electron 41** + **electron-builder 26.10** അടിസ്ഥാനമാക്കി നിർമ്മിച്ച ഒരു ക്രോസ്-പ്ലാറ്റ്ഫോം ഡെസ്ക്ടോപ്പ് ആപ്പ് (Windows / macOS / Linux) OmniRoute നൽകുന്നു. ഡെസ്ക്ടോപ്പ് ആപ്പ് Next.js standalone server-നെ ഒരു child process ആയി ആരംഭിക്കുകയും, ഒരു `BrowserWindow` അതിലേക്ക് ചൂണ്ടുകയും, system tray, auto-updater, IPC bridge, zero-config secret bootstrap എന്നിവ ചേർക്കുകയും ചെയ്യുന്നു.

## ആർക്കിടെക്ചർ

```
┌──────────────────────────────────────────────┐
│ Electron പ്രധാന പ്രോസസ് (electron/main.js)  │
│ ├─ ഒറ്റ-instance lock                        │
│ ├─ Child process: Next.js standalone server │
│ │   (Electron-ന്റെ Node runtime ഉപയോഗിച്ച് ആരംഭിക്കുന്നത്) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ System tray + context menu                │
│ ├─ electron-updater വഴിയുള്ള auto-update     │
│ ├─ Content Security Policy (session headers) │
│ └─ Secret bootstrap (JWT / API_KEY_SECRET)   │
└──────────────────────────────────────────────┘
            ↕ IPC bridge (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderer (Next.js dashboard)                 │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## പതിപ്പുകൾ

`electron/package.json`-ൽ നിന്ന് സ്ഥിരീകരിച്ചത്:

| പാക്കേജ്              | പതിപ്പ്                                                           |
| --------------------- | ----------------------------------------------------------------- |
| `electron`            | `^43.4.1`                                                         |
| `electron-builder`    | `^26.15.3`                                                        |
| `electron-updater`    | `^6.8.9`                                                          |
| `better-sqlite3`      | root `^13.0.2` (Node-API prebuilds — Electron rebuild ആവശ്യമില്ല) |
| ആപ്പ് പതിപ്പ്         | `3.8.0`                                                           |
| ആപ്പ് id              | `online.omniroute.desktop`                                        |
| ഉൽപ്പന്നത്തിന്റെ പേര് | `OmniRoute`                                                       |

## സ്ക്രിപ്റ്റുകൾ (root `package.json`)

| സ്ക്രിപ്റ്റ്                      | ഉദ്ദേശ്യം                                                                                                               |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` ആരംഭിക്കുന്നു + `localhost:20128`-നായി കാത്തിരിക്കുന്നു + Electron ആരംഭിക്കുന്നു                          |
| `npm run electron:build`          | Next.js build ചെയ്തശേഷം നിലവിലെ OS-നായി `electron-builder` പ്രവർത്തിപ്പിക്കുന്നു                                        |
| `npm run electron:build:win`      | Windows NSIS installer + portable (x64) build ചെയ്യുന്നു                                                                |
| `npm run electron:build:mac`      | macOS DMG (Intel + Apple Silicon) build ചെയ്യുന്നു                                                                      |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) build ചെയ്യുന്നു                                                                     |
| `npm run electron:smoke:packaged` | പാക്കേജ് ചെയ്ത binary ആരംഭിച്ച് HTTP 200 ലഭിക്കുന്നുണ്ടോയെന്ന് `/login`-ൽ പരിശോധിക്കുന്നു, തുടർന്ന് shutdown ചെയ്യുന്നു |

`electron/` workspace ഇനിപ്പറയുന്നവയും ലഭ്യമാക്കുന്നു:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` പ്രവർത്തിപ്പിക്കുന്നു
- `npm run build:mac-x64` / `build:mac-arm64` — single-arch macOS builds
- `npm run pack` — പ്രാദേശിക പരിശോധനയ്ക്കുള്ള directory-only build (installer ഇല്ല)

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
റെൻഡറർ ഭാഗത്തെ ടൈപ്പിങ്ങുകൾ `electron/types.d.ts`-ലാണ് ഉള്ളത്.

## IPC ബ്രിഡ്ജ് (`preload.js`)

`contextIsolation: true`, `nodeIntegration: false` എന്നിവ ഉപയോഗിച്ച് `contextBridge`
വഴി, preload ഒരു വൈറ്റ്ലിസ്റ്റ് ചെയ്ത API `window.electronAPI`-യിൽ ലഭ്യമാക്കുന്നു.

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

| റെൻഡറർ കോൾ                                                        | തരം                         |
| ----------------------------------------------------------------- | --------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                      |
| `openExternal(url)`                                               | invoke                      |
| `getDataDir()`                                                    | invoke                      |
| `restartServer()`                                                 | invoke                      |
| `getAppVersion()`                                                 | invoke                      |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                      |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                        |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (ഡിസ്പോസർ നൽകുന്നു) |

`removeAllListeners`-നെ ആശ്രയിക്കുന്നതിന് പകരം receive ഹെൽപ്പറുകൾ ഒരു **ഡിസ്പോസർ ഫങ്ഷൻ**
നൽകുന്നു — React ഘടകങ്ങൾ വീണ്ടും മൗണ്ട് ചെയ്യുമ്പോൾ ലിസണറുകൾ അടിഞ്ഞുകൂടുന്നത് ഇത് തടയുന്നു.

## സെർവർ ലൈഫ്സൈക്കിൾ

സിസ്റ്റം Node-മായുള്ള നേറ്റീവ്-മൊഡ്യൂൾ ABI പൊരുത്തക്കേട് ഒഴിവാക്കാൻ, Electron Node
റൺടൈം ഉപയോഗിച്ച് `main.js` Next.js standalone ബണ്ടിൽ നേരിട്ട് സ്പോൺ ചെയ്യുന്നു:

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
- ഭംഗിയായ SIGTERM അവസാനിപ്പിക്കലിനായി (WAL checkpoint) `before-quit` പരമാവധി 5 s വരെ കാത്തിരിക്കുന്നു; തുടർന്ന് SIGKILL അയയ്ക്കുന്നു.
- ട്രേയിലെ പോർട്ട് സ്വിച്ചർ (`20128`, `3000`, `8080`) സെർവർ നിർത്തി പുനരാരംഭിക്കുകയും തുടർന്ന് BrowserWindow റീലോഡ് ചെയ്യുകയും ചെയ്യുന്നു.

## സജ്ജീകരണമൊന്നും ആവശ്യമില്ലാത്ത സീക്രട്ട് ബൂട്ട്സ്ട്രാപ്പ്

ആദ്യമായി സമാരംഭിക്കുമ്പോൾ, പ്രധാന പ്രോസസ് ലഭ്യമല്ലാത്ത സീക്രട്ടുകൾ സ്വയമേവ സൃഷ്ടിച്ച് സ്ഥിരമായി സംഭരിക്കുന്നു:

| സീക്രട്ട്                | ഉറവിടം                                                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                          |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (എൻക്രിപ്റ്റ് ചെയ്ത ക്രെഡൻഷ്യലുകൾ ഇതിനകം നിലവിലുണ്ടെങ്കിൽ നിരസിക്കുന്നു) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                          |

`<DATA_DIR>/server.env`-ലേക്ക് സ്ഥിരമായി സംഭരിക്കുന്നു. `DATA_DIR` ഇങ്ങനെ നിർണ്ണയിക്കപ്പെടുന്നു:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` അല്ലെങ്കിൽ `~/.omniroute`
- macOS: `~/.omniroute`

## എൻവയോൺമെന്റ് ഫയൽ കണ്ടെത്തൽ

സെർവർ ആരംഭിക്കുന്നതിന് മുമ്പ്, പ്രധാന പ്രോസസ് (`electron/main.js`-ലെ
`getPreferredEnvFilePath()`) **ഒരു** `.env` ഫയൽ തിരഞ്ഞെടുക്കുന്നു: താഴെപ്പറയുന്നവയിൽ നിലവിലുള്ള ആദ്യത്തെ ഫയൽ.

1. ആപ്പ് സമാരംഭിച്ച എൻവയോൺമെന്റിൽ `DATA_DIR` സജ്ജീകരിച്ചിട്ടുണ്ടെങ്കിൽ, `$DATA_DIR/.env`.
2. മുകളിൽ പറഞ്ഞ അതേ ഡിഫോൾട്ടുകൾ ഉപയോഗിക്കുന്ന `<resolved DATA_DIR>/.env`: Windows-ൽ
   `%APPDATA%\omniroute\.env`, Linux-ലും macOS-ലും `$XDG_CONFIG_HOME/omniroute/.env` അല്ലെങ്കിൽ `~/.omniroute/.env`.
3. പ്രോസസിന്റെ പ്രവർത്തന ഡയറക്ടറിയിലുള്ള `.env`.

പ്രധാന പ്രോസസ് ആ ഫയൽ മാത്രം വായിക്കുന്നു; തുടർന്നുള്ള സാധ്യതയുള്ള ഫയലുകൾ ലയിപ്പിക്കില്ല. തുടർന്ന്
ഇനിപ്പറയുന്ന മുൻഗണനാക്രമത്തിൽ സെർവർ എൻവയോൺമെന്റ് നിർമ്മിക്കുന്നു (ഏറ്റവും ഉയർന്നത് ആദ്യം):

1. Electron പ്രോസസ് എൻവയോൺമെന്റ് (ആപ്പ് സമാരംഭിച്ച ഉറവിടത്തിൽനിന്ന് പാരമ്പര്യമായി ലഭിച്ച വേരിയബിളുകൾ).
2. തിരഞ്ഞെടുത്ത `.env` ഫയൽ.
3. `<DATA_DIR>/server.env` (മുകളിൽ പറഞ്ഞ ബൂട്ട്സ്ട്രാപ്പ് സീക്രട്ടുകൾ).

ആപ്പ് ആരംഭിക്കുമ്പോഴാണ് പ്രോസസ് എൻവയോൺമെന്റ് പകർത്തുന്നത്. അതിനാൽ, ആപ്പ് പ്രവർത്തിച്ചുകൊണ്ടിരിക്കുമ്പോൾ
(വിൻഡോ അടച്ച ശേഷം ട്രേയിൽ തുടരുന്ന സമയവും ഉൾപ്പെടെ) സജ്ജീകരിക്കുന്ന ഒരു സിസ്റ്റം അല്ലെങ്കിൽ ഉപയോക്തൃ എൻവയോൺമെന്റ്
വേരിയബിൾ, ആപ്പിൽനിന്ന് പൂർണ്ണമായി പുറത്തുകടന്ന് വീണ്ടും സമാരംഭിക്കുന്നതുവരെ സെർവറിലേക്ക് എത്തില്ല. `CONTEXT_LENGTH_<PROVIDER>` പോലുള്ള റൺടൈം ക്രമീകരണങ്ങൾക്ക് ([എൻവയോൺമെന്റ് വേരിയബിളുകൾ: ഓരോ പ്രൊവൈഡറിനുമുള്ള കോൺടെക്സ്റ്റ് ദൈർഘ്യം](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider) കാണുക),
`.env` ഫയലിന് മുൻഗണന നൽകുക; തുടർന്ന് പൂർണ്ണമായി പുറത്തുകടന്ന് (ട്രേ, **പുറത്തുകടക്കുക**) വീണ്ടും സമാരംഭിക്കുക.

## വിൻഡോയും ട്രേയും

- `BrowserWindow`: 1400×900 (കുറഞ്ഞത് 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, ട്രാഫിക്-ലൈറ്റ് `{ x: 16, y: 16 }` എന്ന സ്ഥാനത്ത്.
- Windows/Linux: നേറ്റീവ് ടൈറ്റിൽ ബാർ.
- ക്ലോസ് ബട്ടൺ ആപ്പിനെ ട്രേയിലേക്ക് മിനിമൈസ് ചെയ്യുന്നു; ട്രേ മെനുവിൽ **OmniRoute തുറക്കുക**, **ഡാഷ്ബോർഡ് തുറക്കുക** (ബാഹ്യ ബ്രൗസർ), **സെർവർ പോർട്ട്** ഉപമെനു, **അപ്ഡേറ്റുകൾ പരിശോധിക്കുക**, **പുറത്തുകടക്കുക** എന്നിവയുണ്ട്.

## ഉള്ളടക്ക സുരക്ഷാ നയം

`session.defaultSession.webRequest.onHeadersReceived` വഴി സജ്ജീകരിക്കുന്നു. ശ്രദ്ധേയമായ ഡയറക്ടീവുകൾ:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- ഡെവ് മോഡിൽ `script-src`-ലേക്ക് മാത്രം `'unsafe-eval'` ചേർക്കുന്നു

## സ്വയമേവയുള്ള അപ്ഡേറ്റ്

GitHub പ്രൊവൈഡറിനൊപ്പം (`diegosouzapw/OmniRoute`) `electron-updater` ഉപയോഗിക്കുന്നു.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- `update-status` IPC വഴി റെൻഡററിലേക്ക് കൈമാറുന്ന ഇവന്റുകൾ:
  `checking`, `available`, `not-available`, `downloading` (`percent` ഉൾപ്പെടെ), `downloaded`, `error`
- `installUpdate()` സെർവറിനെ അവസാനിപ്പിച്ച ശേഷം `autoUpdater.quitAndInstall()` വിളിക്കുന്നു
- ഡെവ് മോഡിൽ ഒഴിവാക്കുന്നു (`!app.isPackaged`)

## ബിൽഡ് പൈപ്പ്ലൈൻ

1. `npm run build` → `.next/standalone`-ൽ Next.js standalone സൃഷ്ടിക്കുന്നു.
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone`-ലേക്ക് വീണ്ടും സ്റ്റേജ് ചെയ്യുകയും, ബണ്ടിൽ മറ്റൊരു സ്ഥാനത്തേക്ക് മാറ്റാനാകുന്ന വിധത്തിൽ `server.js` + `required-server-files.json` എന്നിവയ്ക്കുള്ളിലെ absolute path-കൾ തിരുത്തുകയും ചെയ്യുന്നു.
3. `electron-builder`, `main.js`, `preload.js`, `node_modules`, കൂടാതെ `extraResources: { ../.next/electron-standalone → app }` എന്നിവ പാക്കേജ് ചെയ്യുന്നു.

### ബിൽഡ് ടാർഗെറ്റുകൾ

| OS      | ടാർഗെറ്റുകൾ                                                   |
| ------- | ------------------------------------------------------------- |
| Windows | NSIS ഇൻസ്റ്റാളർ + പോർട്ടബിൾ (x64)                             |
| macOS   | DMG (Intel + arm64, Applications-ലേക്ക് ഡ്രാഗ് ചെയ്യാവുന്നത്) |
| Linux   | AppImage + DEB (x64 + arm64)                                  |

NSIS ക്രമീകരണങ്ങൾ: `oneClick: false`; ഇൻസ്റ്റാളേഷൻ ഡയറക്ടറി തിരഞ്ഞെടുക്കാൻ ഉപയോക്താവിനെ അനുവദിക്കുകയും Desktop, Start-Menu കുറുക്കുവഴികൾ സൃഷ്ടിക്കുകയും ചെയ്യുന്നു.

## പാക്കേജ് ചെയ്ത ബിൽഡിന്റെ സ്മോക്ക് ടെസ്റ്റിംഗ്

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- നിലവിലെ പ്ലാറ്റ്ഫോമിനായി `electron/dist-electron/`-ലെ പാക്കേജ് ചെയ്ത ബൈനറി സ്വയമേവ കണ്ടെത്തുന്നു.
- ഡെവലപ്പർ ഡാറ്റയെ ബാധിക്കാതിരിക്കാൻ ഒറ്റപ്പെടുത്തിയ `HOME`/`APPDATA`/`XDG_*` ഡയറക്ടറികളോടെ ലോഞ്ച് ചെയ്യുന്നു.
- 45 s-നുള്ളിൽ HTTP 200 ലഭിക്കുന്നുണ്ടോ എന്ന് `http://127.0.0.1:20128/login` പോൾ ചെയ്യുന്നു.
- മാരകമായ പാറ്റേണുകൾക്കായി stderr/stdout നിരീക്ഷിക്കുന്നു (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` മുതലായവ).
- സജ്ജമായതിന് ശേഷം 2 s സ്ഥിരമായ റൺടൈമിനായി കാത്തിരിക്കുകയും, തുടർന്ന് SIGTERM അയച്ച് പോർട്ട് സ്വതന്ത്രമാകുന്നതുവരെ കാത്തിരിക്കുകയും ചെയ്യുന്നു.
- CI-യിൽ, `--no-sandbox --disable-gpu` സ്വയമേവ കൈമാറുന്നു (Linux-ൽ `--disable-dev-shm-usage`-ഉം).

എൻവയോൺമെന്റ് ഓവർറൈഡുകൾ: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## കോഡ് സൈനിംഗ്

`electron/package.json` സൈനിംഗ് ക്രെഡൻഷ്യലുകൾ നേരിട്ട് ബന്ധിപ്പിക്കുന്നില്ല. അവ എൻവയോൺമെന്റ് വേരിയബിളുകൾ വഴി `electron-builder`-ന് കൈമാറുക:

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

AppImage സൈനിംഗ് ഐച്ഛികമാണ് — സൈൻ ചെയ്യുകയാണെങ്കിൽ `LINUX_GPG_KEY` സജ്ജമാക്കുക.

## വിതരണം

ആർട്ടിഫാക്റ്റുകൾ `electron/dist-electron/`-ൽ ലഭ്യമാകും:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

റിലീസുകൾ GitHub Releases-ൽ (`diegosouzapw/OmniRoute`) പ്രസിദ്ധീകരിക്കുന്നു; പുതിയ പതിപ്പുകൾക്കായി `electron-updater` പരിശോധിക്കുന്നതും അവിടെയാണ്.

## പ്രശ്നപരിഹാരം

| ലക്ഷണം                                                                         | പരിഹാരം                                                                                                                                                                                             |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron major പതിപ്പ് ഉയർത്തിയതിന് ശേഷം `Cannot find module 'better-sqlite3'` | better-sqlite3 v13, Node-API prebuild-കളോടെയാണ് ലഭിക്കുന്നത് — റൂട്ടിൽ `npm install`, `prepare:bundle` എന്നിവ വീണ്ടും പ്രവർത്തിപ്പിക്കുക (നിലവിലെ പ്ലാറ്റ്ഫോമിനായുള്ള prebuild അത് പരിശോധിക്കുന്നു) |
| നേറ്റീവ് മൊഡ്യൂളിനായി `ERR_DLOPEN_FAILED`                                      | `prepare:bundle` വീണ്ടും പ്രവർത്തിപ്പിക്കുക — നിലവിലെ പ്ലാറ്റ്ഫോമിനായുള്ള Node-API prebuild ലഭ്യമല്ലെങ്കിൽ അത് ഉടൻ പരാജയപ്പെടും                                                                     |
| Linux-ൽ വിൻഡോ ശൂന്യമായി കാണപ്പെടുന്നു                                          | Next.js സെർവർ യഥാർത്ഥത്തിൽ PORT-ലേക്ക് bind ചെയ്തിട്ടുണ്ടെന്ന് സ്ഥിരീകരിക്കുക (`[Server]` ലോഗുകൾ പരിശോധിക്കുക)                                                                                      |
| macOS notarization നിലച്ചുപോകുന്നു                                             | `APPLE_*` വേരിയബിളുകൾ `.env`-ൽ മാത്രം നൽകിയിട്ടില്ലെന്നും export ചെയ്തിട്ടുണ്ടെന്നും ഉറപ്പാക്കുക                                                                                                    |
| Windows SmartScreen മുന്നറിയിപ്പ്                                              | EV സർട്ടിഫിക്കറ്റ് ഉപയോഗിച്ച് സൈൻ ചെയ്യുക, അല്ലെങ്കിൽ ഉപയോക്താക്കൾ right-click → "Run anyway" തിരഞ്ഞെടുക്കുക                                                                                        |
| പോർട്ട് ഉപയോഗത്തിലായതിനാൽ സ്മോക്ക് ടെസ്റ്റ് പരാജയപ്പെടുന്നു                    | `electron:smoke:packaged` പ്രവർത്തിപ്പിക്കുന്നതിന് മുമ്പ് 20128-ലെ ഏതെങ്കിലും ലോക്കൽ ഡെവ് സെർവർ നിർത്തുക                                                                                            |

## ഇതും കാണുക

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- സോഴ്സ്: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- സഹായകങ്ങൾ: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
