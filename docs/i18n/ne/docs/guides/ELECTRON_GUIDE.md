# Electron Desktop Guide (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **आधिकारिक स्रोत:** `electron/` कार्यक्षेत्र
> **अन्तिम अद्यावधिक:** 2026-06-28 — v3.8.40

OmniRoute सँग **Electron 41** + **electron-builder 26.10** मा निर्मित क्रस-प्लेटफर्म डेस्कटप एप (Windows / macOS / Linux) आउँछ। डेस्कटप एपले Next.js को स्ट्यान्डअलोन सर्भरलाई चाइल्ड प्रोसेसका रूपमा सुरु गर्छ, त्यसतर्फ `BrowserWindow` निर्देशित गर्छ, र सिस्टम ट्रे, स्वतः-अद्यावधिककर्ता, IPC ब्रिज तथा शून्य-कन्फिगरेसन गोप्य मान बुटस्ट्र्याप थप्छ।

## वास्तुकला

```
┌──────────────────────────────────────────────┐
│ Electron मुख्य प्रोसेस (electron/main.js)    │
│ ├─ एकल-इन्स्टेन्स लक                         │
│ ├─ चाइल्ड प्रोसेस: Next.js स्ट्यान्डअलोन सर्भर │
│ │   (Electron को Node रनटाइमद्वारा सुरु गरिएको) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ सिस्टम ट्रे + कन्टेक्स्ट मेनु              │
│ ├─ electron-updater मार्फत स्वतः-अद्यावधिक   │
│ ├─ सामग्री सुरक्षा नीति (सेसन हेडरहरू)        │
│ └─ गोप्य मान बुटस्ट्र्याप (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────┘
            ↕ IPC ब्रिज (electron/preload.js)
┌──────────────────────────────────────────────┐
│ रेन्डरर (Next.js ड्यासबोर्ड)                  │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## संस्करणहरू

`electron/package.json` बाट पुष्टि गरिएको:

| प्याकेज            | संस्करण                                                                            |
| ------------------ | ---------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                          |
| `electron-builder` | `^26.15.3`                                                                         |
| `electron-updater` | `^6.8.9`                                                                           |
| `better-sqlite3`   | मूल `^13.0.2` (Node-API पूर्वनिर्मित बाइनरीहरू — Electron पुनर्निर्माण आवश्यक छैन) |
| एप संस्करण         | `3.8.0`                                                                            |
| एप आईडी            | `online.omniroute.desktop`                                                         |
| उत्पादनको नाम      | `OmniRoute`                                                                        |

## स्क्रिप्टहरू (मूल `package.json`)

| स्क्रिप्ट                         | उद्देश्य                                                                              |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` सुरु गर्छ + `localhost:20128` को प्रतीक्षा गर्छ + Electron सुरु गर्छ    |
| `npm run electron:build`          | Next.js निर्माण गर्छ र त्यसपछि हालको OS का लागि `electron-builder` चलाउँछ             |
| `npm run electron:build:win`      | Windows NSIS इन्स्टलर + पोर्टेबल (x64) निर्माण गर्छ                                   |
| `npm run electron:build:mac`      | macOS DMG (Intel + Apple Silicon) निर्माण गर्छ                                        |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) निर्माण गर्छ                                       |
| `npm run electron:smoke:packaged` | प्याकेज गरिएको बाइनरी सुरु गर्छ र HTTP 200 का लागि `/login` जाँच्छ, त्यसपछि बन्द गर्छ |

`electron/` कार्यक्षेत्रले यी पनि उपलब्ध गराउँछ:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` चलाउँछ
- `npm run build:mac-x64` / `build:mac-arm64` — एकल-आर्किटेक्चर macOS निर्माणहरू
- `npm run pack` — स्थानीय परीक्षणका लागि डाइरेक्टरी-मात्र निर्माण (इन्स्टलरबिना)

## डाइरेक्टरी संरचना

```
electron/
├── package.json              # Electron निर्भरताहरू + electron-builder कन्फिगरेसन
├── main.js                   # मुख्य प्रक्रिया (24 KB — तलका टिप्पणीहरू हेर्नुहोस्)
├── preload.js                # contextBridge IPC ब्रिज
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI प्रकारहरू
├── README.md                 # कार्यस्थानभित्रका टिप्पणीहरू
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder आउटपुट (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone बन्डल तयार गर्छ
└── dev/
    └── smoke-electron-packaged.mjs       # बिल्डपछिको स्मोक परीक्षण
```

`main.js` र `preload.js` दुवै TypeScript नभई **CommonJS `.js` फाइलहरू** हुन्।
रेन्डरर-पक्षका टाइपिङहरू `electron/types.d.ts` मा छन्।

## IPC ब्रिज (`preload.js`)

प्रीलोडले `contextIsolation: true` र `nodeIntegration: false` सहित `contextBridge`
प्रयोग गरेर `window.electronAPI` मा श्वेतसूचीबद्ध API उपलब्ध गराउँछ।

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

उपलब्ध गराइएका विधिहरू:

| रेन्डरर कल                                                        | प्रकार                      |
| ----------------------------------------------------------------- | --------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                      |
| `openExternal(url)`                                               | invoke                      |
| `getDataDir()`                                                    | invoke                      |
| `restartServer()`                                                 | invoke                      |
| `getAppVersion()`                                                 | invoke                      |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                      |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                        |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (डिस्पोजर फर्काउँछ) |

रिसिभ हेल्परहरूले `removeAllListeners` मा निर्भर हुनुको सट्टा **डिस्पोजर फङ्सन**
फर्काउँछन् — यसले React कम्पोनेन्टहरू पुनः माउन्ट हुँदा लिस्नरहरू सञ्चित हुनबाट
रोक्छ।

## सर्भर जीवनचक्र

सिस्टम Node सँग नेटिभ-मोड्युल ABI नमिल्ने समस्या टार्न `main.js` ले Electron Node
रनटाइम प्रयोग गरेर Next.js स्ट्यान्डअलोन बन्डललाई सीधै स्पन गर्छ:

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

मुख्य विशेषताहरू:

- `waitForServer()` ले विन्डो देखाउनुअघि 30 s सम्म URL पोल गर्छ (कोल्ड स्टार्टमा खाली स्क्रिन देखिँदैन)।
- `stdio: "pipe"` ले stdout/stderr क्याप्चर गर्छ; तयार भएको सङ्केत दिने वाक्यांशहरू (`Ready` / `listening`) ले IPC मार्फत `server-status: running` उत्सर्जन गर्छन्।
- `before-quit` ले शिष्ट SIGTERM (WAL चेकपोइन्ट) का लागि 5 s सम्म पर्खन्छ र त्यसपछि SIGKILL पठाउँछ।
- ट्रेमा रहेको पोर्ट स्विचरले (`20128`, `3000`, `8080`) सर्भर रोक्छ र पुनः सुरु गर्छ, त्यसपछि BrowserWindow पुनः लोड गर्छ।

## शून्य-कन्फिगरेसन गोप्य कुञ्जी बुटस्ट्र्याप

पहिलोपटक सुरु हुँदा, मुख्य प्रक्रियाले छुटेका गोप्य कुञ्जीहरू स्वतः उत्पन्न गरी स्थायी रूपमा भण्डारण गर्छ:

| गोप्य कुञ्जी             | स्रोत                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                      |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (इन्क्रिप्ट गरिएका क्रेडेन्सियलहरू पहिल्यै अवस्थित भए अस्वीकार गर्छ) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                      |

`<DATA_DIR>/server.env` मा स्थायी रूपमा भण्डारण गरिन्छ। `DATA_DIR` निम्न स्थानमा रिजोल्भ हुन्छ:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` वा `~/.omniroute`
- macOS: `~/.omniroute`

## विन्डो र ट्रे

- `BrowserWindow`: 1400×900 (न्यूनतम 1024×700), `backgroundColor: "#0a0a0a"`।
- macOS: `titleBarStyle: "hiddenInset"`, ट्राफिक-लाइट `{ x: 16, y: 16 }` मा।
- Windows/Linux: नेटिभ टाइटल बार।
- बन्द गर्ने बटनले ट्रेमा मिनिमाइज गर्छ; ट्रे मेनुमा **OmniRoute खोल्नुहोस्**, **ड्यासबोर्ड खोल्नुहोस्** (बाह्य ब्राउजर), **सर्भर पोर्ट** सबमेनु, **अपडेट जाँच गर्नुहोस्**, **बन्द गर्नुहोस्** छन्।

## सामग्री सुरक्षा नीति

`session.defaultSession.webRequest.onHeadersReceived` मार्फत सेट गरिन्छ। उल्लेखनीय डाइरेक्टिभहरू:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- डेभ मोडले `script-src` मा मात्र `'unsafe-eval'` थप्छ

## स्वतः-अपडेट

GitHub प्रदायक (`diegosouzapw/OmniRoute`) सहित `electron-updater` प्रयोग गर्छ।

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- इभेन्टहरू `update-status` IPC मार्फत रेन्डररमा फर्वार्ड गरिन्छ:
  `checking`, `available`, `not-available`, `downloading` (`percent` सहित), `downloaded`, `error`
- `installUpdate()` ले सर्भर बन्द गर्छ र त्यसपछि `autoUpdater.quitAndInstall()` कल गर्छ
- डेभ मोडमा छोडिन्छ (`!app.isPackaged`)

## बिल्ड पाइपलाइन

1. `npm run build` → `.next/standalone` मा Next.js स्ट्यान्डअलोन।
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone` मा पुनः स्टेज गर्छ र बन्डललाई स्थानान्तरणयोग्य बनाउन `server.js` + `required-server-files.json` भित्रका एब्सोल्युट पाथहरू पुनर्लेखन गर्छ।
3. `electron-builder` ले `main.js`, `preload.js`, `node_modules`, र `extraResources: { ../.next/electron-standalone → app }` प्याकेज गर्छ।

### बिल्ड लक्ष्यहरू

| OS      | लक्ष्यहरू                                          |
| ------- | -------------------------------------------------- |
| Windows | NSIS इन्स्टलर + पोर्टेबल (x64)                     |
| macOS   | DMG (Intel + arm64, Applications मा ड्र्याग गर्ने) |
| Linux   | AppImage + DEB (x64 + arm64)                       |

NSIS सेटिङहरू: `oneClick: false`, प्रयोगकर्तालाई इन्स्टल डाइरेक्टरी छनोट गर्न दिन्छ, र Desktop तथा Start-Menu सर्टकटहरू सिर्जना गर्छ।

## प्याकेज गरिएको बिल्डको स्मोक परीक्षण

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- हालको प्लेटफर्मका लागि `electron/dist-electron/` मा प्याकेज गरिएको बाइनरी स्वतः पत्ता लगाउँछ।
- पृथक् `HOME`/`APPDATA`/`XDG_*` डाइरेक्टरीहरूसहित सुरु गर्छ, जसले गर्दा यसले विकासकर्ताको डेटा छुँदैन।
- 45 s भित्र HTTP 200 का लागि `http://127.0.0.1:20128/login` लाई बारम्बार जाँच गर्छ।
- घातक ढाँचाहरू (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, आदि) का लागि stderr/stdout निगरानी गर्छ।
- तयार भएपछि 2 s सम्म स्थिर रनटाइम पर्खन्छ, त्यसपछि SIGTERM पठाउँछ र पोर्ट खाली नहुँदासम्म पर्खन्छ।
- CI मा, स्वतः `--no-sandbox --disable-gpu` (र Linux मा `--disable-dev-shm-usage`) पास गर्छ।

परिवेश ओभरराइडहरू: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`।

## कोड हस्ताक्षर

`electron/package.json` ले हस्ताक्षर प्रमाणहरूलाई प्रत्यक्ष रूपमा जडान **गर्दैन**। तिनलाई env vars मार्फत `electron-builder` मा पठाउनुहोस्:

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

AppImage हस्ताक्षर वैकल्पिक हो — हस्ताक्षर गर्न `LINUX_GPG_KEY` सेट गर्नुहोस्।

## वितरण

आर्टिफ्याक्टहरू `electron/dist-electron/` मा राखिन्छन्:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

रिलिजहरू GitHub Releases (`diegosouzapw/OmniRoute`) मा प्रकाशित गरिन्छन्, जहाँ `electron-updater` ले नयाँ संस्करणहरू पनि जाँच गर्छ।

## समस्या समाधान

| लक्षण                                                                    | समाधान                                                                                                                                                              |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron को प्रमुख संस्करण बढाएपछि `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 मा Node-API prebuilds समावेश छन् — root मा `npm install` र `prepare:bundle` पुनः चलाउनुहोस् (यसले हालको प्लेटफर्मका लागि prebuild प्रमाणित गर्छ) |
| native module का लागि `ERR_DLOPEN_FAILED`                                | `prepare:bundle` पुनः चलाउनुहोस् — हालको प्लेटफर्मका लागि Node-API prebuild नभएमा यो तुरुन्तै असफल हुन्छ                                                            |
| Linux मा विन्डो खाली देखिन्छ                                             | Next.js server वास्तवमै PORT मा bound भएको पुष्टि गर्नुहोस् (`[Server]` logs जाँच गर्नुहोस्)                                                                        |
| macOS notarization रोकिन्छ                                               | `APPLE_*` vars केवल `.env` मा नराखी export गरिएको सुनिश्चित गर्नुहोस्                                                                                               |
| Windows SmartScreen चेतावनी                                              | EV cert प्रयोग गरेर हस्ताक्षर गर्नुहोस्, वा प्रयोगकर्ताहरूले right-click → "जसरी पनि चलाउनुहोस्" चयन गर्न सक्छन्                                                    |
| port प्रयोगमा भएकाले smoke test असफल हुन्छ                               | `electron:smoke:packaged` चलाउनुअघि 20128 मा चलिरहेको कुनै पनि local dev server रोक्नुहोस्                                                                          |

## यो पनि हेर्नुहोस्

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- स्रोत: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- सहायकहरू: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
