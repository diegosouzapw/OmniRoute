# Electron Desktop Guide (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **ప్రామాణిక మూలం:** `electron/` వర్క్స్పేస్
> **చివరిగా నవీకరించబడింది:** 2026-06-28 — v3.8.40

OmniRoute, **Electron 41** + **electron-builder 26.10** ఆధారంగా రూపొందించిన క్రాస్-ప్లాట్ఫారమ్ డెస్క్టాప్ యాప్ను (Windows / macOS / Linux) అందిస్తుంది. డెస్క్టాప్ యాప్ Next.js స్వతంత్ర సర్వర్ను చైల్డ్ ప్రాసెస్గా ప్రారంభించి, దాని వైపు ఒక `BrowserWindow`ను మళ్లిస్తుంది, అలాగే సిస్టమ్ ట్రే, ఆటో-అప్డేటర్, IPC బ్రిడ్జ్ మరియు కాన్ఫిగరేషన్ అవసరం లేని సీక్రెట్ బూట్స్ట్రాప్ను జోడిస్తుంది.

## ఆర్కిటెక్చర్

```
┌───────────────────────────────────────────────────────┐
│ Electron ప్రధాన ప్రాసెస్ (electron/main.js)           │
│ ├─ సింగిల్-ఇన్స్టెన్స్ లాక్                          │
│ ├─ చైల్డ్ ప్రాసెస్: Next.js స్వతంత్ర సర్వర్           │
│ │   (Electron Node రన్టైమ్తో ప్రారంభించబడుతుంది)    │
│ ├─ BrowserWindow → http://localhost:PORT              │
│ ├─ సిస్టమ్ ట్రే + సందర్భ మెను                          │
│ ├─ electron-updater ద్వారా ఆటో-అప్డేట్              │
│ ├─ కంటెంట్ సెక్యూరిటీ పాలసీ (సెషన్ హెడర్లు)         │
│ └─ సీక్రెట్ బూట్స్ట్రాప్ (JWT / API_KEY_SECRET)      │
└───────────────────────────────────────────────────────┘
            ↕ IPC బ్రిడ్జ్ (electron/preload.js)
┌───────────────────────────────────────────────────────┐
│ రెండరర్ (Next.js డ్యాష్బోర్డ్)                       │
│   window.electronAPI.* (contextIsolation)             │
└───────────────────────────────────────────────────────┘
```

## వెర్షన్లు

`electron/package.json` నుండి నిర్ధారించబడినవి:

| ప్యాకేజ్           | వెర్షన్                                                                    |
| ------------------ | -------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                  |
| `electron-builder` | `^26.15.3`                                                                 |
| `electron-updater` | `^6.8.9`                                                                   |
| `better-sqlite3`   | రూట్ `^13.0.2` (Node-API ముందస్తు బిల్డ్లు — Electron రీబిల్డ్ అవసరం లేదు) |
| యాప్ వెర్షన్       | `3.8.0`                                                                    |
| యాప్ ఐడి           | `online.omniroute.desktop`                                                 |
| ఉత్పత్తి పేరు      | `OmniRoute`                                                                |

## స్క్రిప్ట్లు (రూట్ `package.json`)

| స్క్రిప్ట్                        | ఉద్దేశ్యం                                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev`ను ప్రారంభించి + `localhost:20128` కోసం వేచి ఉండి + Electronను ప్రారంభిస్తుంది    |
| `npm run electron:build`          | Next.jsను బిల్డ్ చేసి, ప్రస్తుత OS కోసం `electron-builder`ను అమలు చేస్తుంది                    |
| `npm run electron:build:win`      | Windows NSIS ఇన్స్టాలర్ + పోర్టబుల్ (x64)ను బిల్డ్ చేస్తుంది                                   |
| `npm run electron:build:mac`      | macOS DMGను (Intel + Apple Silicon) బిల్డ్ చేస్తుంది                                           |
| `npm run electron:build:linux`    | Linux AppImage + DEBను (x64 + arm64) బిల్డ్ చేస్తుంది                                          |
| `npm run electron:smoke:packaged` | ప్యాకేజ్ చేసిన బైనరీని ప్రారంభించి, HTTP 200 కోసం `/login`ను పరీక్షించి, ఆపై షట్డౌన్ చేస్తుంది |

`electron/` వర్క్స్పేస్ కింది వాటిని కూడా అందుబాటులో ఉంచుతుంది:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs`ను అమలు చేస్తుంది
- `npm run build:mac-x64` / `build:mac-arm64` — ఒకే ఆర్కిటెక్చర్కు సంబంధించిన macOS బిల్డ్లు
- `npm run pack` — స్థానిక పరీక్ష కోసం డైరెక్టరీ-మాత్రమే బిల్డ్ (ఇన్స్టాలర్ లేదు)

## డైరెక్టరీ నిర్మాణం

```
electron/
├── package.json              # Electron డిపెండెన్సీలు + electron-builder కాన్ఫిగరేషన్
├── main.js                   # ప్రధాన ప్రాసెస్ (24 KB — దిగువ అనోటేషన్లను చూడండి)
├── preload.js                # contextBridge IPC బ్రిడ్జ్
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI టైప్లు
├── README.md                 # వర్క్స్పేస్లోని గమనికలు
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder అవుట్పుట్ (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone బండిల్ను సిద్ధం చేస్తుంది
└── dev/
    └── smoke-electron-packaged.mjs       # బిల్డ్ అనంతర స్మోక్ టెస్ట్
```

`main.js` మరియు `preload.js` రెండూ TypeScript కాదు, అవి **CommonJS `.js` ఫైళ్లు**.
రెండరర్ వైపు టైపింగ్లు `electron/types.d.ts`లో ఉంటాయి.

## IPC బ్రిడ్జ్ (`preload.js`)

ప్రీలోడ్, `contextIsolation: true` మరియు `nodeIntegration: false`తో `contextBridge`
ఉపయోగించి, అనుమతించబడిన APIని `window.electronAPI`పై అందుబాటులో ఉంచుతుంది.

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

అందుబాటులో ఉంచిన మెథడ్లు:

| రెండరర్ కాల్                                                      | రకం                               |
| ----------------------------------------------------------------- | --------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                            |
| `openExternal(url)`                                               | invoke                            |
| `getDataDir()`                                                    | invoke                            |
| `restartServer()`                                                 | invoke                            |
| `getAppVersion()`                                                 | invoke                            |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                            |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                              |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (డిస్పోజర్ను అందిస్తుంది) |

రిసీవ్ హెల్పర్లు `removeAllListeners`పై ఆధారపడటానికి బదులుగా ఒక **డిస్పోజర్ ఫంక్షన్ను**
అందిస్తాయి — React కంపోనెంట్లు మళ్లీ మౌంట్ అయినప్పుడు లిసనర్లు పేరుకుపోకుండా ఇది
నిరోధిస్తుంది.

## సర్వర్ జీవితచక్రం

సిస్టమ్ Nodeతో నేటివ్-మాడ్యూల్ ABI అసమతుల్యతను నివారించేందుకు, `main.js` Next.js
స్టాండలోన్ బండిల్ను Electron Node రన్టైమ్తో నేరుగా స్పాన్ చేస్తుంది:

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

ముఖ్యాంశాలు:

- విండోను చూపించే ముందు `waitForServer()` URLను గరిష్ఠంగా 30 s వరకు పోల్ చేస్తుంది (కోల్డ్ స్టార్ట్లో ఖాళీ స్క్రీన్ కనిపించదు).
- `stdio: "pipe"` stdout/stderrను క్యాప్చర్ చేస్తుంది; సిద్ధంగా ఉన్నట్లు సూచించే పదబంధాలు (`Ready` / `listening`) IPC ద్వారా `server-status: running`ను విడుదల చేస్తాయి.
- `before-quit`, సాఫీగా SIGTERM జరగడానికి (WAL checkpoint) గరిష్ఠంగా 5 s వరకు వేచి ఉండి, ఆపై SIGKILLను పంపుతుంది.
- ట్రేలోని పోర్ట్ స్విచర్ (`20128`, `3000`, `8080`) సర్వర్ను ఆపి, పునఃప్రారంభించి, ఆపై BrowserWindowను రీలోడ్ చేస్తుంది.

## జీరో-కాన్ఫిగ్ రహస్యాల బూట్స్ట్రాప్

మొదటిసారి ప్రారంభించినప్పుడు, ప్రధాన ప్రాసెస్ లేని రహస్యాలను స్వయంచాలకంగా రూపొందించి, శాశ్వతంగా భద్రపరుస్తుంది:

| రహస్యం                   | మూలం                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                  |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (ఎన్క్రిప్ట్ చేసిన క్రెడెన్షియల్స్ ఇప్పటికే ఉంటే నిరాకరిస్తుంది) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                  |

`<DATA_DIR>/server.env`లో భద్రపరచబడుతుంది. `DATA_DIR` ఈ విధంగా పరిష్కరించబడుతుంది:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` లేదా `~/.omniroute`
- macOS: `~/.omniroute`

## ఎన్విరాన్మెంట్ ఫైల్ అన్వేషణ

సర్వర్ను ప్రారంభించే ముందు, ప్రధాన ప్రాసెస్ (`electron/main.js`లోని
`getPreferredEnvFilePath()`) **ఒక** `.env` ఫైల్ను ఎంచుకుంటుంది: కింది వాటిలో ఉనికిలో ఉన్న మొదటి ఫైల్.

1. యాప్ ప్రారంభించబడిన ఎన్విరాన్మెంట్లో `DATA_DIR` సెట్ చేసి ఉన్నప్పుడు, `$DATA_DIR/.env`.
2. పైన పేర్కొన్న అవే డిఫాల్ట్లను ఉపయోగించి `<resolved DATA_DIR>/.env`: Windowsలో
   `%APPDATA%\omniroute\.env`, Linux మరియు macOSలో `$XDG_CONFIG_HOME/omniroute/.env` లేదా `~/.omniroute/.env`.
3. ప్రాసెస్ వర్కింగ్ డైరెక్టరీలోని `.env`.

ప్రధాన ప్రాసెస్ ఆ ఫైల్ను మాత్రమే చదువుతుంది; తర్వాతి అభ్యర్థి ఫైళ్లు విలీనం చేయబడవు. ఆపై సర్వర్
ఎన్విరాన్మెంట్ ఈ ప్రాధాన్యత క్రమంలో నిర్మించబడుతుంది (అత్యధిక ప్రాధాన్యత మొదట):

1. Electron ప్రాసెస్ ఎన్విరాన్మెంట్ (యాప్ను ప్రారంభించిన దాని నుండి సంక్రమించిన వేరియబుల్స్).
2. ఎంచుకున్న `.env` ఫైల్.
3. `<DATA_DIR>/server.env` (పైన పేర్కొన్న బూట్స్ట్రాప్ రహస్యాలు).

యాప్ ప్రారంభమైనప్పుడు ప్రాసెస్ ఎన్విరాన్మెంట్ సంగ్రహించబడుతుంది, కాబట్టి యాప్ నడుస్తున్నప్పుడు
సెట్ చేసిన సిస్టమ్ లేదా యూజర్ ఎన్విరాన్మెంట్ వేరియబుల్ (దాని విండో మూసివేసిన తర్వాత ట్రేలో ఉన్నప్పుడు
సెట్ చేసినవి కూడా) యాప్ను పూర్తిగా క్విట్ చేసి మళ్లీ ప్రారంభించే వరకు సర్వర్కు చేరదు. `CONTEXT_LENGTH_<PROVIDER>` వంటి
రన్టైమ్ సెట్టింగ్ల కోసం (చూడండి
[ఎన్విరాన్మెంట్ వేరియబుల్స్: ప్రొవైడర్-వారీ కాంటెక్స్ట్ నిడివి](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
`.env` ఫైల్కు ప్రాధాన్యత ఇవ్వండి, ఆపై పూర్తిగా క్విట్ చేసి (ట్రే, **Quit**) మళ్లీ ప్రారంభించండి.

## విండో & ట్రే

- `BrowserWindow`: 1400×900 (కనిష్ఠం 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, ట్రాఫిక్-లైట్ `{ x: 16, y: 16 }` వద్ద ఉంటుంది.
- Windows/Linux: స్థానిక టైటిల్ బార్.
- మూసివేత బటన్ యాప్ను ట్రేకు మినిమైజ్ చేస్తుంది; ట్రే మెనూలో **Open OmniRoute**, **Open Dashboard** (బాహ్య బ్రౌజర్), **Server Port** ఉపమెనూ, **Check for Updates**, **Quit** ఉంటాయి.

## కంటెంట్ సెక్యూరిటీ పాలసీ

`session.defaultSession.webRequest.onHeadersReceived` ద్వారా సెట్ చేయబడుతుంది. ముఖ్యమైన డైరెక్టివ్లు:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- డెవ్ మోడ్లో `script-src`కు మాత్రమే `'unsafe-eval'` జోడించబడుతుంది

## స్వయంచాలక అప్డేట్

GitHub ప్రొవైడర్తో (`diegosouzapw/OmniRoute`) `electron-updater`ను ఉపయోగిస్తుంది.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- `update-status` IPC ద్వారా రెండరర్కు ఫార్వర్డ్ చేయబడే ఈవెంట్లు:
  `checking`, `available`, `not-available`, `downloading` (`percent`తో), `downloaded`, `error`
- `installUpdate()` సర్వర్ను నిలిపివేసి, ఆపై `autoUpdater.quitAndInstall()`ను కాల్ చేస్తుంది
- డెవ్ మోడ్లో (`!app.isPackaged`) దాటవేయబడుతుంది

## బిల్డ్ పైప్లైన్

1. `npm run build` → `.next/standalone`లో Next.js స్వతంత్ర బిల్డ్.
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone`లోకి మళ్లీ స్టేజ్ చేసి, బండిల్ను వేరే స్థానానికి తరలించగలిగేలా `server.js` + `required-server-files.json`లోని నిరపేక్ష పాత్లను తిరిగి రాస్తుంది.
3. `electron-builder`, `main.js`, `preload.js`, `node_modules`, మరియు `extraResources: { ../.next/electron-standalone → app }`లను ప్యాకేజ్ చేస్తుంది.

### బిల్డ్ లక్ష్యాలు

| OS      | లక్ష్యాలు                                            |
| ------- | ---------------------------------------------------- |
| Windows | NSIS ఇన్స్టాలర్ + పోర్టబుల్ (x64)                    |
| macOS   | DMG (Intel + arm64, Applicationsలోకి డ్రాగ్ చేయగలది) |
| Linux   | AppImage + DEB (x64 + arm64)                         |

NSIS సెట్టింగ్లు: `oneClick: false`; వినియోగదారు ఇన్స్టాలేషన్ డైరెక్టరీని ఎంచుకోవడానికి అనుమతిస్తుంది; Desktop మరియు Start-Menu షార్ట్కట్లను సృష్టిస్తుంది.

## ప్యాకేజ్ చేసిన బిల్డ్కు స్మోక్ టెస్టింగ్

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- ప్రస్తుత ప్లాట్ఫారమ్ కోసం `electron/dist-electron/`లోని ప్యాకేజ్ చేసిన బైనరీని స్వయంచాలకంగా గుర్తిస్తుంది.
- డెవలపర్ డేటాను తాకకుండా ఉండేందుకు వేరుచేసిన `HOME`/`APPDATA`/`XDG_*` డైరెక్టరీలతో ప్రారంభిస్తుంది.
- 45 sలోపు HTTP 200 ప్రతిస్పందన కోసం `http://127.0.0.1:20128/login`ను క్రమం తప్పకుండా తనిఖీ చేస్తుంది.
- ప్రాణాంతక నమూనాల కోసం stderr/stdoutను పర్యవేక్షిస్తుంది (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, మొదలైనవి).
- సిద్ధమైన తర్వాత 2 s స్థిరమైన రన్టైమ్ కోసం వేచి ఉండి, ఆపై SIGTERMను పంపించి పోర్ట్ ఖాళీ అయ్యే వరకు వేచి ఉంటుంది.
- CIలో, స్వయంచాలకంగా `--no-sandbox --disable-gpu`ను పంపిస్తుంది (Linuxలో `--disable-dev-shm-usage`ను కూడా).

Env ఓవర్రైడ్లు: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## కోడ్ సైనింగ్

`electron/package.json` సైనింగ్ ఆధారాలను నేరుగా అనుసంధానించదు. వాటిని env vars ద్వారా `electron-builder`కు పంపించండి:

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

AppImage సైనింగ్ ఐచ్ఛికం — సైన్ చేయాలనుకుంటే `LINUX_GPG_KEY`ను సెట్ చేయండి.

## పంపిణీ

ఆర్టిఫాక్ట్లు `electron/dist-electron/`లో ఉంచబడతాయి:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

రిలీజ్లు GitHub Releases (`diegosouzapw/OmniRoute`)లో ప్రచురించబడతాయి; కొత్త వెర్షన్ల కోసం `electron-updater` కూడా అక్కడే తనిఖీ చేస్తుంది.

## సమస్య పరిష్కారం

| లక్షణం                                                                     | పరిష్కారం                                                                                                                                                                                     |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron ప్రధాన వెర్షన్ పెంపు తర్వాత `Cannot find module 'better-sqlite3'` | better-sqlite3 v13, Node-API ముందస్తు బిల్డ్లను అందిస్తుంది — రూట్లో `npm install`ను మరియు `prepare:bundle`ను మళ్లీ అమలు చేయండి (ఇది ప్రస్తుత ప్లాట్ఫారమ్కు ముందస్తు బిల్డ్ను ధృవీకరిస్తుంది) |
| స్థానిక మాడ్యూల్ కోసం `ERR_DLOPEN_FAILED`                                  | `prepare:bundle`ను మళ్లీ అమలు చేయండి — ప్రస్తుత ప్లాట్ఫారమ్కు Node-API ముందస్తు బిల్డ్ లేకపోతే ఇది వెంటనే విఫలమవుతుంది                                                                        |
| Linuxలో విండో ఖాళీగా కనిపిస్తుంది                                          | Next.js సర్వర్ నిజంగా PORTకు బైండ్ అయిందని నిర్ధారించండి (`[Server]` లాగ్లను తనిఖీ చేయండి)                                                                                                    |
| macOS నోటరైజేషన్ నిలిచిపోతుంది                                             | `APPLE_*` vars కేవలం `.env`లో మాత్రమే కాకుండా, export చేయబడ్డాయని నిర్ధారించండి                                                                                                               |
| Windows SmartScreen హెచ్చరిక                                               | EV సర్టిఫికేట్తో సైన్ చేయండి, లేదా వినియోగదారులు రైట్-క్లిక్ → "ఏమైనప్పటికీ అమలు చేయి" ఎంచుకోవాలి                                                                                             |
| పోర్ట్ వినియోగంలో ఉండటం వల్ల స్మోక్ టెస్ట్ విఫలమవుతుంది                    | `electron:smoke:packaged`ను అమలు చేయడానికి ముందు 20128పై నడుస్తున్న ఏదైనా స్థానిక డెవలప్మెంట్ సర్వర్ను ఆపండి                                                                                  |

## ఇవి కూడా చూడండి

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- సోర్స్: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- సహాయకాలు: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
