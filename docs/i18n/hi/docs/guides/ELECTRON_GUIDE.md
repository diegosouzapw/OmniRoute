# Electron Desktop Guide (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **सत्य का स्रोत:** `electron/` वर्कस्पेस
> **अंतिम अपडेट:** 2026-06-28 — v3.8.40

OmniRoute एक क्रॉस-प्लेटफ़ॉर्म डेस्कटॉप ऐप (Windows / macOS / Linux) प्रदान करता है, जिसे
**Electron 41** + **electron-builder 26.10** पर बनाया गया है। डेस्कटॉप ऐप Next.js
स्टैंडअोन सर्वर को चाइल्ड प्रोसेस के रूप में शुरू करता है, एक `BrowserWindow` को उस पर इंगित करता है, और
एक सिस्टम ट्रे, ऑटो-अपडेटर, IPC ब्रिज तथा शून्य-कॉन्फ़िगरेशन सीक्रेट बूटस्ट्रैप जोड़ता है।

## आर्किटेक्चर

```
┌──────────────────────────────────────────────┐
│ Electron मुख्य प्रोसेस (electron/main.js)    │
│ ├─ एकल-इंस्टेंस लॉक                         │
│ ├─ चाइल्ड प्रोसेस: Next.js स्टैंडअलोन सर्वर │
│ │   (Electron के Node रनटाइम से शुरू किया गया)│
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ सिस्टम ट्रे + कॉन्टेक्स्ट मेन्यू          │
│ ├─ electron-updater के माध्यम से ऑटो-अपडेट  │
│ ├─ कंटेंट सिक्योरिटी पॉलिसी (सेशन हेडर)     │
│ └─ सीक्रेट बूटस्ट्रैप (JWT / API_KEY_SECRET)│
└──────────────────────────────────────────────┘
            ↕ IPC ब्रिज (electron/preload.js)
┌──────────────────────────────────────────────┐
│ रेंडरर (Next.js डैशबोर्ड)                   │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## संस्करण

`electron/package.json` से पुष्टि की गई:

| पैकेज              | संस्करण                                                  |
| ------------------ | -------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                |
| `electron-builder` | `^26.15.3`                                               |
| `electron-updater` | `^6.8.9`                                                 |
| `better-sqlite3`   | रूट `^13.0.2` (Node-API प्रीबिल्ड—Electron रीबिल्ड नहीं) |
| ऐप संस्करण         | `3.8.0`                                                  |
| ऐप आईडी            | `online.omniroute.desktop`                               |
| उत्पाद नाम         | `OmniRoute`                                              |

## स्क्रिप्ट (`package.json` रूट करें)

| स्क्रिप्ट                         | उद्देश्य                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run electron:dev`            | `npm run dev` शुरू करता है + `localhost:20128` की प्रतीक्षा करता है + Electron लॉन्च करता है     |
| `npm run electron:build`          | Next.js को बिल्ड करता है, फिर वर्तमान OS के लिए `electron-builder` चलाता है                      |
| `npm run electron:build:win`      | Windows NSIS इंस्टॉलर + पोर्टेबल (x64) बिल्ड करता है                                             |
| `npm run electron:build:mac`      | macOS DMG (Intel + Apple Silicon) बिल्ड करता है                                                  |
| `npm run electron:build:linux`    | Linux AppImage + DEB (x64 + arm64) बिल्ड करता है                                                 |
| `npm run electron:smoke:packaged` | पैकेज की गई बाइनरी लॉन्च करता है और HTTP 200 के लिए `/login` की जाँच करता है, फिर बंद हो जाता है |

`electron/` वर्कस्पेस निम्न को भी उपलब्ध कराता है:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` चलाता है
- `npm run build:mac-x64` / `build:mac-arm64` — एकल-आर्किटेक्चर macOS बिल्ड
- `npm run pack` — स्थानीय परीक्षण के लिए केवल-डायरेक्टरी बिल्ड (कोई इंस्टॉलर नहीं)

## डायरेक्टरी संरचना

```
electron/
├── package.json              # Electron निर्भरताएँ + electron-builder कॉन्फ़िगरेशन
├── main.js                   # मुख्य प्रोसेस (24 KB — नीचे टिप्पणियाँ देखें)
├── preload.js                # contextBridge IPC ब्रिज
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI प्रकार
├── README.md                 # वर्कस्पेस के भीतर के नोट्स
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder आउटपुट (gitignored)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone बंडल तैयार करता है
└── dev/
    └── smoke-electron-packaged.mjs       # बिल्ड के बाद का स्मोक परीक्षण
```

`main.js` और `preload.js` दोनों **CommonJS `.js` फ़ाइलें** हैं, TypeScript नहीं।
रेंडरर-साइड प्रकार परिभाषाएँ `electron/types.d.ts` में मौजूद हैं।

## IPC ब्रिज (`preload.js`)

प्रीलोड, `contextIsolation: true` और `nodeIntegration: false` के साथ `contextBridge`
का उपयोग करके `window.electronAPI` पर एक श्वेतसूचीबद्ध API उपलब्ध कराता है।

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

उपलब्ध कराई गई विधियाँ:

| रेंडरर कॉल                                                        | प्रकार                        |
| ----------------------------------------------------------------- | ----------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                        |
| `openExternal(url)`                                               | invoke                        |
| `getDataDir()`                                                    | invoke                        |
| `restartServer()`                                                 | invoke                        |
| `getAppVersion()`                                                 | invoke                        |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                        |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                          |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (डिस्पोज़र लौटाता है) |

रिसीव हेल्पर `removeAllListeners` पर निर्भर रहने के बजाय एक **डिस्पोज़र फ़ंक्शन**
लौटाते हैं — इससे React कंपोनेंट्स के दोबारा माउंट होने पर लिसनर्स का संचय नहीं होता।

## सर्वर जीवनचक्र

सिस्टम Node के साथ नेटिव-मॉड्यूल ABI असंगति से बचने के लिए `main.js`, Electron Node
रनटाइम का उपयोग करके Next.js स्टैंडअलोन बंडल को सीधे स्पॉन करता है:

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

मुख्य विशेषताएँ:

- विंडो दिखाने से पहले `waitForServer()` अधिकतम 30 s तक URL को पोल करता है (कोल्ड स्टार्ट पर खाली स्क्रीन नहीं दिखती)।
- `stdio: "pipe"` stdout/stderr को कैप्चर करता है; तैयार होने के संकेत देने वाले वाक्यांश (`Ready` / `listening`) IPC के माध्यम से `server-status: running` उत्सर्जित करते हैं।
- `before-quit`, सुचारु SIGTERM (WAL चेकपॉइंट) के लिए अधिकतम 5 s तक प्रतीक्षा करता है और फिर SIGKILL भेजता है।
- ट्रे में मौजूद पोर्ट स्विचर (`20128`, `3000`, `8080`) सर्वर को रोककर पुनः शुरू करता है, फिर BrowserWindow को रीलोड करता है।

## शून्य-कॉन्फ़िगरेशन सीक्रेट बूटस्ट्रैप

पहली बार लॉन्च होने पर, मुख्य प्रोसेस अनुपलब्ध सीक्रेट्स को स्वतः जनरेट करके स्थायी रूप से सहेजता है:

| सीक्रेट                  | स्रोत                                                                                                          |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                       |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (यदि एन्क्रिप्टेड क्रेडेंशियल पहले से मौजूद हों, तो अस्वीकार करता है) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                       |

इन्हें `<DATA_DIR>/server.env` में स्थायी रूप से सहेजा जाता है। `DATA_DIR` का मान इस प्रकार निर्धारित होता है:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` या `~/.omniroute`
- macOS: `~/.omniroute`

## विंडो और ट्रे

- `BrowserWindow`: 1400×900 (न्यूनतम 1024×700), `backgroundColor: "#0a0a0a"`।
- macOS: `titleBarStyle: "hiddenInset"`, ट्रैफ़िक-लाइट `{ x: 16, y: 16 }` पर।
- Windows/Linux: नेटिव टाइटल बार।
- बंद करने वाला बटन विंडो को ट्रे में मिनिमाइज़ करता है; ट्रे मेनू में **OmniRoute खोलें**, **डैशबोर्ड खोलें** (बाहरी ब्राउज़र), **सर्वर पोर्ट** सबमेनू, **अपडेट जाँचें**, **बंद करें** शामिल हैं।

## कंटेंट सिक्योरिटी पॉलिसी

इसे `session.defaultSession.webRequest.onHeadersReceived` के माध्यम से सेट किया जाता है। उल्लेखनीय डायरेक्टिव:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Dev मोड केवल `script-src` में `'unsafe-eval'` जोड़ता है

## स्वचालित अपडेट

GitHub प्रोवाइडर (`diegosouzapw/OmniRoute`) के साथ `electron-updater` का उपयोग करता है।

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- ईवेंट्स को `update-status` IPC के माध्यम से रेंडरर को अग्रेषित किया जाता है:
  `checking`, `available`, `not-available`, `downloading` (`percent` के साथ), `downloaded`, `error`
- `installUpdate()` सर्वर को समाप्त करता है और फिर `autoUpdater.quitAndInstall()` को कॉल करता है
- Dev मोड (`!app.isPackaged`) में इसे छोड़ दिया जाता है

## बिल्ड पाइपलाइन

1. `npm run build` → `.next/standalone` में Next.js स्टैंडअलोन।
2. `prepare-electron-standalone.mjs` → इसे `.next/electron-standalone` में पुनः स्टेज करता है और `server.js` + `required-server-files.json` के भीतर मौजूद एब्सोल्यूट पाथ को फिर से लिखता है, ताकि बंडल को स्थानांतरित किया जा सके।
3. `electron-builder`, `main.js`, `preload.js`, `node_modules`, और `extraResources: { ../.next/electron-standalone → app }` को पैकेज करता है।

### बिल्ड लक्ष्य

| OS      | लक्ष्य                                              |
| ------- | --------------------------------------------------- |
| Windows | NSIS इंस्टॉलर + पोर्टेबल (x64)                      |
| macOS   | DMG (Intel + arm64, खींचकर Applications में छोड़ें) |
| Linux   | AppImage + DEB (x64 + arm64)                        |

NSIS सेटिंग्स: `oneClick: false`, उपयोगकर्ता को इंस्टॉलेशन डायरेक्टरी चुनने देती हैं और Desktop तथा Start-Menu शॉर्टकट बनाती हैं।

## पैकेज किए गए बिल्ड का स्मोक परीक्षण

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- वर्तमान प्लेटफ़ॉर्म के लिए `electron/dist-electron/` में पैकेज की गई बाइनरी स्वतः खोजता है।
- इसे अलग-थलग `HOME`/`APPDATA`/`XDG_*` डायरेक्टरी के साथ लॉन्च करता है, ताकि यह डेवलपर डेटा को प्रभावित न करे।
- 45 सेकंड के भीतर HTTP 200 के लिए `http://127.0.0.1:20128/login` को बार-बार जाँचता है।
- घातक पैटर्न (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, आदि) के लिए stderr/stdout की निगरानी करता है।
- तैयार होने के बाद 2 सेकंड तक स्थिर रनटाइम की प्रतीक्षा करता है, फिर SIGTERM भेजता है और पोर्ट के मुक्त होने की प्रतीक्षा करता है।
- CI में, स्वचालित रूप से `--no-sandbox --disable-gpu` (और Linux पर `--disable-dev-shm-usage`) पास करता है।

Env ओवरराइड: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`।

## कोड साइनिंग

`electron/package.json` साइनिंग क्रेडेंशियल्स को सीधे कॉन्फ़िगर **नहीं** करता है। उन्हें पर्यावरण वेरिएबल्स के माध्यम से `electron-builder` को प्रदान करें:

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

AppImage साइनिंग वैकल्पिक है — साइनिंग के लिए `LINUX_GPG_KEY` सेट करें।

## वितरण

आर्टिफ़ैक्ट्स `electron/dist-electron/` में उपलब्ध होते हैं:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

रिलीज़ GitHub Releases (`diegosouzapw/OmniRoute`) पर प्रकाशित की जाती हैं, और `electron-updater` भी नए संस्करणों के लिए वहीं जाँच करता है।

## समस्या निवारण

| लक्षण                                                                                   | समाधान                                                                                                                                                                       |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron के प्रमुख संस्करण को अपग्रेड करने के बाद `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 Node-API प्रीबिल्ड्स प्रदान करता है — रूट पर फिर से `npm install` और `prepare:bundle` चलाएँ (यह वर्तमान प्लेटफ़ॉर्म के लिए प्रीबिल्ड को सत्यापित करता है) |
| नेटिव मॉड्यूल के लिए `ERR_DLOPEN_FAILED`                                                | `prepare:bundle` फिर से चलाएँ — वर्तमान प्लेटफ़ॉर्म के लिए Node-API प्रीबिल्ड अनुपलब्ध होने पर यह तुरंत विफल हो जाता है                                                      |
| Linux पर विंडो खाली दिखाई देती है                                                       | पुष्टि करें कि Next.js सर्वर वास्तव में PORT से बाइंड हुआ है (`[Server]` लॉग देखें)                                                                                          |
| macOS नोटराइज़ेशन रुक जाता है                                                           | सुनिश्चित करें कि `APPLE_*` वेरिएबल्स एक्सपोर्ट किए गए हैं, न कि केवल `.env` में रखे गए हैं                                                                                  |
| Windows SmartScreen चेतावनी                                                             | EV प्रमाणपत्र से साइन करें, या उपयोगकर्ता राइट-क्लिक करें → "फिर भी चलाएँ"                                                                                                   |
| पोर्ट उपयोग में होने के कारण स्मोक टेस्ट विफल हो जाता है                                | `electron:smoke:packaged` चलाने से पहले 20128 पर चल रहे किसी भी स्थानीय डेवलपमेंट सर्वर को रोकें                                                                             |

## यह भी देखें

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- स्रोत: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- सहायक स्क्रिप्ट्स: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
