# Electron Desktop Guide (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **सत्याचा अधिकृत स्रोत:** `electron/` वर्कस्पेस
> **शेवटचे अद्यतन:** 2026-06-28 — v3.8.40

OmniRoute हे **Electron 41** + **electron-builder 26.10** वर तयार केलेले
क्रॉस-प्लॅटफॉर्म डेस्कटॉप अॅप (Windows / macOS / Linux) वितरित करते. डेस्कटॉप अॅप Next.js
स्टँडअलोन सर्व्हरला चाइल्ड प्रोसेस म्हणून सुरू करते, त्याकडे `BrowserWindow` निर्देशित करते आणि
सिस्टम ट्रे, स्वयंचलित अपडेटर, IPC ब्रिज व शून्य-कॉन्फिगरेशन सिक्रेट बूटस्ट्रॅप जोडते.

## आर्किटेक्चर

```
┌──────────────────────────────────────────────┐
│ Electron मुख्य प्रोसेस (electron/main.js)    │
│ ├─ एकल-इन्स्टन्स लॉक                         │
│ ├─ चाइल्ड प्रोसेस: Next.js स्टँडअलोन सर्व्हर │
│ │   (Electron च्या Node रनटाइमने सुरू केलेला)│
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ सिस्टम ट्रे + संदर्भ मेनू                 │
│ ├─ electron-updater द्वारे स्वयंचलित अपडेट  │
│ ├─ सामग्री सुरक्षा धोरण (सेशन हेडर्स)       │
│ └─ सिक्रेट बूटस्ट्रॅप (JWT / API_KEY_SECRET)│
└──────────────────────────────────────────────┘
            ↕ IPC ब्रिज (electron/preload.js)
┌──────────────────────────────────────────────┐
│ रेंडरर (Next.js डॅशबोर्ड)                    │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## आवृत्त्या

`electron/package.json` वरून पुष्टी केलेली माहिती:

| पॅकेज              | आवृत्ती                                                      |
| ------------------ | ------------------------------------------------------------ |
| `electron`         | `^43.4.1`                                                    |
| `electron-builder` | `^26.15.3`                                                   |
| `electron-updater` | `^6.8.9`                                                     |
| `better-sqlite3`   | रूट `^13.0.2` (Node-API प्रीबिल्ड्स — Electron रिबिल्ड नाही) |
| अॅप आवृत्ती        | `3.8.0`                                                      |
| अॅप आयडी           | `online.omniroute.desktop`                                   |
| उत्पादनाचे नाव     | `OmniRoute`                                                  |

## स्क्रिप्ट्स (रूट `package.json`)

| स्क्रिप्ट                         | उद्देश                                                                                   |
| --------------------------------- | ---------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` सुरू करते + `localhost:20128` ची प्रतीक्षा करते + Electron लाँच करते       |
| `npm run electron:build`          | Next.js बिल्ड करते आणि त्यानंतर सध्याच्या OS साठी `electron-builder` चालवते              |
| `npm run electron:build:win`      | Windows NSIS इंस्टॉलर + पोर्टेबल आवृत्ती (x64) बिल्ड करते                                |
| `npm run electron:build:mac`      | macOS DMG (Intel + Apple Silicon) बिल्ड करते                                             |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) बिल्ड करते                                            |
| `npm run electron:smoke:packaged` | पॅकेज केलेली बायनरी लाँच करते आणि `/login` वर HTTP 200 साठी प्रोब करते, नंतर ती बंद करते |

`electron/` वर्कस्पेस पुढील गोष्टीदेखील उपलब्ध करून देते:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` चालवते
- `npm run build:mac-x64` / `build:mac-arm64` — एकल-आर्किटेक्चर macOS बिल्ड्स
- `npm run pack` — स्थानिक चाचणीसाठी केवळ-डिरेक्टरी बिल्ड (इंस्टॉलर नाही)

## निर्देशिका मांडणी

```
electron/
├── package.json              # Electron अवलंबित्वे + electron-builder कॉन्फिगरेशन
├── main.js                   # मुख्य प्रोसेस (24 KB — खालील टिपा पाहा)
├── preload.js                # contextBridge IPC ब्रिज
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI प्रकार
├── README.md                 # वर्कस्पेसमधील नोंदी
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder आउटपुट (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone बंडल तयार करते
└── dev/
    └── smoke-electron-packaged.mjs       # बिल्डनंतरची स्मोक चाचणी
```

`main.js` आणि `preload.js` या दोन्ही **CommonJS `.js` फाइल्स** आहेत, TypeScript नाहीत.
रेंडरर-साइड टाइपिंग्ज `electron/types.d.ts` मध्ये आहेत.

## IPC ब्रिज (`preload.js`)

प्रीलोड, `contextIsolation: true` आणि `nodeIntegration: false` सह `contextBridge`
वापरून `window.electronAPI` वर श्वेतसूचीबद्ध API उघड करते.

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

उपलब्ध करून दिलेल्या मेथड्स:

| रेंडरर कॉल                                                        | प्रकार                      |
| ----------------------------------------------------------------- | --------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                      |
| `openExternal(url)`                                               | invoke                      |
| `getDataDir()`                                                    | invoke                      |
| `restartServer()`                                                 | invoke                      |
| `getAppVersion()`                                                 | invoke                      |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                      |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                        |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (डिस्पोजर परत करते) |

रिसीव्ह हेल्पर्स `removeAllListeners` वर अवलंबून राहण्याऐवजी एक **डिस्पोजर फंक्शन**
परत करतात — यामुळे React कॉम्पोनंट्स पुन्हा माउंट झाल्यावर लिसनर्स साचणे टाळले जाते.

## सर्व्हर जीवनचक्र

सिस्टम Node सोबत नेटिव्ह-मॉड्यूल ABI विसंगती टाळण्यासाठी `main.js`, Electron Node
रनटाइम वापरून Next.js स्टँडअलोन बंडल थेट सुरू करते:

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

ठळक मुद्दे:

- विंडो दाखवण्यापूर्वी `waitForServer()` कमाल 30 s पर्यंत URL पोल करते (कोल्ड स्टार्टवर रिकामी स्क्रीन दिसत नाही).
- `stdio: "pipe"` stdout/stderr कॅप्चर करते; रेडी वाक्यांश (`Ready` / `listening`) IPC वर `server-status: running` उत्सर्जित करतात.
- `before-quit`, सुरळीत SIGTERM साठी (WAL चेकपॉइंट) कमाल 5 s प्रतीक्षा करते आणि त्यानंतर SIGKILL पाठवते.
- ट्रेमधील पोर्ट स्विचर (`20128`, `3000`, `8080`) सर्व्हर थांबवून पुन्हा सुरू करते आणि त्यानंतर BrowserWindow रीलोड करते.

## शून्य-कॉन्फिगरेशन सीक्रेट बूटस्ट्रॅप

पहिल्यांदा सुरू करताना, मुख्य प्रोसेस गहाळ सीक्रेट्स स्वयंचलितपणे तयार करून कायमस्वरूपी जतन करते:

| सीक्रेट                  | स्रोत                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                     |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (एन्क्रिप्टेड क्रेडेन्शियल्स आधीपासून अस्तित्वात असल्यास नकार देते) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                     |

`<DATA_DIR>/server.env` मध्ये कायमस्वरूपी जतन केले जाते. `DATA_DIR` चे निराकरण पुढीलप्रमाणे होते:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` किंवा `~/.omniroute`
- macOS: `~/.omniroute`

## विंडो आणि ट्रे

- `BrowserWindow`: 1400×900 (किमान 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, ट्रॅफिक-लाइट `{ x: 16, y: 16 }` येथे.
- Windows/Linux: नेटिव्ह टायटल बार.
- बंद करण्याचे बटण अॅपला ट्रेमध्ये मिनिमाइझ करते; ट्रे मेनूमध्ये **OmniRoute उघडा**, **डॅशबोर्ड उघडा** (बाह्य ब्राउझर), **सर्व्हर पोर्ट** सबमेनू, **अपडेट्स तपासा**, **बाहेर पडा** हे पर्याय असतात.

## सामग्री सुरक्षा धोरण

`session.defaultSession.webRequest.onHeadersReceived` द्वारे सेट केले जाते. उल्लेखनीय डायरेक्टिव्ह्ज:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- डेव्ह मोडमध्ये फक्त `script-src` मध्ये `'unsafe-eval'` जोडले जाते

## स्वयंचलित अपडेट

GitHub प्रोव्हायडरसह (`diegosouzapw/OmniRoute`) `electron-updater` वापरते.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- इव्हेंट्स `update-status` IPC द्वारे रेंडररकडे पाठवले जातात:
  `checking`, `available`, `not-available`, `downloading` (`percent` सह), `downloaded`, `error`
- `installUpdate()` सर्व्हर बंद करते आणि त्यानंतर `autoUpdater.quitAndInstall()` कॉल करते
- डेव्ह मोडमध्ये वगळले जाते (`!app.isPackaged`)

## बिल्ड पाइपलाइन

1. `npm run build` → `.next/standalone` मधील Next.js स्टँडअलोन.
2. `prepare-electron-standalone.mjs` → `.next/electron-standalone` मध्ये पुन्हा स्टेज करते आणि `server.js` + `required-server-files.json` मधील अॅब्सोल्यूट पाथ्स पुन्हा लिहिते, जेणेकरून बंडलचे स्थान बदलता येईल.
3. `electron-builder`, `main.js`, `preload.js`, `node_modules`, आणि `extraResources: { ../.next/electron-standalone → app }` पॅकेज करते.

### बिल्ड लक्ष्ये

| OS      | लक्ष्ये                                    |
| ------- | ------------------------------------------ |
| Windows | NSIS इंस्टॉलर + पोर्टेबल (x64)             |
| macOS   | DMG (Intel + arm64, ड्रॅग-टू-Applications) |
| Linux   | AppImage + DEB (x64 + arm64)               |

NSIS सेटिंग्ज: `oneClick: false`, वापरकर्त्याला इन्स्टॉल डिरेक्टरी निवडू देते आणि Desktop व Start-Menu शॉर्टकट्स तयार करते.

## पॅकेज केलेल्या बिल्डची स्मोक चाचणी

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- सध्याच्या प्लॅटफॉर्मसाठी `electron/dist-electron/` मधील पॅकेज केलेली बायनरी स्वयंचलितपणे शोधते.
- आयसोलेटेड `HOME`/`APPDATA`/`XDG_*` डिरेक्टरीजसह सुरू करते, त्यामुळे डेव्हलपरच्या डेटाला स्पर्श होत नाही.
- 45 s च्या आत HTTP 200 प्रतिसादासाठी `http://127.0.0.1:20128/login` चे पोलिंग करते.
- गंभीर पॅटर्न्ससाठी stderr/stdout वर लक्ष ठेवते (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, इत्यादी).
- तयार झाल्यानंतर 2 s स्थिर रनटाइमची प्रतीक्षा करते, त्यानंतर SIGTERM पाठवते आणि पोर्ट मोकळा होईपर्यंत प्रतीक्षा करते.
- CI मध्ये, स्वयंचलितपणे `--no-sandbox --disable-gpu` (आणि Linux वर `--disable-dev-shm-usage`) पास करते.

Env ओव्हरराइड्स: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## कोड साइनिंग

`electron/package.json` मध्ये साइनिंग क्रेडेन्शियल्स थेट जोडलेली **नाहीत**. ती env vars द्वारे `electron-builder` कडे पाठवा:

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

AppImage साइनिंग ऐच्छिक आहे — साइनिंग करायचे असल्यास `LINUX_GPG_KEY` सेट करा.

## वितरण

बिल्ड आर्टिफॅक्ट्स `electron/dist-electron/` मध्ये उपलब्ध होतात:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

रिलीझ GitHub Releases (`diegosouzapw/OmniRoute`) वर प्रकाशित केली जातात आणि `electron-updater` देखील नवीन आवृत्त्यांसाठी तेथेच तपासतो.

## समस्या निवारण

| लक्षण                                                                        | उपाय                                                                                                                                                                                            |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron ची मुख्य आवृत्ती वाढवल्यानंतर `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 मध्ये Node-API चे पूर्वनिर्मित बिल्ड्स समाविष्ट आहेत — रूटवर पुन्हा `npm install` आणि `prepare:bundle` चालवा (ते सध्याच्या प्लॅटफॉर्मसाठी पूर्वनिर्मित बिल्डची पडताळणी करते) |
| नेटिव्ह मॉड्यूलसाठी `ERR_DLOPEN_FAILED`                                      | `prepare:bundle` पुन्हा चालवा — सध्याच्या प्लॅटफॉर्मसाठी Node-API चे पूर्वनिर्मित बिल्ड उपलब्ध नसल्यास ते त्वरित अयशस्वी होते                                                                   |
| Linux वर विंडो रिकामी दिसते                                                  | Next.js सर्व्हर प्रत्यक्षात PORT शी जोडला गेला आहे याची खात्री करा (`[Server]` लॉग तपासा)                                                                                                       |
| macOS नोटरायझेशन थांबते                                                      | `APPLE_*` vars केवळ `.env` मध्ये नसून export केलेली आहेत याची खात्री करा                                                                                                                        |
| Windows SmartScreen चेतावणी                                                  | EV प्रमाणपत्राने साइन करा किंवा वापरकर्त्यांनी उजवे-क्लिक → "तरीही चालवा" निवडावे                                                                                                               |
| पोर्ट वापरात असल्याने स्मोक चाचणी अयशस्वी होते                               | `electron:smoke:packaged` चालवण्यापूर्वी 20128 वरील कोणताही स्थानिक dev सर्व्हर थांबवा                                                                                                          |

## हे देखील पहा

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- स्रोत: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- सहाय्यक: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
