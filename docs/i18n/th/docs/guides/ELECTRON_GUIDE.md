# Electron Desktop Guide (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **แหล่งข้อมูลหลัก:** เวิร์กสเปซ `electron/`
> **อัปเดตล่าสุด:** 2026-06-28 — v3.8.40

OmniRoute มาพร้อมแอปเดสก์ท็อปข้ามแพลตฟอร์ม (Windows / macOS / Linux) ที่สร้างขึ้นบน
**Electron 41** + **electron-builder 26.10** แอปเดสก์ท็อปจะเริ่มเซิร์ฟเวอร์แบบสแตนด์อโลนของ Next.js
เป็นโพรเซสลูก ชี้ `BrowserWindow` ไปยังเซิร์ฟเวอร์ดังกล่าว และเพิ่ม
ถาดระบบ ตัวอัปเดตอัตโนมัติ บริดจ์ IPC และการตั้งค่าความลับเริ่มต้นแบบไม่ต้องกำหนดค่า

## สถาปัตยกรรม

```
┌──────────────────────────────────────────────┐
│ โพรเซสหลักของ Electron (electron/main.js)    │
│ ├─ การล็อกให้ทำงานเพียงอินสแตนซ์เดียว          │
│ ├─ โพรเซสลูก: เซิร์ฟเวอร์สแตนด์อโลน Next.js    │
│ │   (เริ่มด้วยรันไทม์ Node ของ Electron)       │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ ถาดระบบ + เมนูบริบท                        │
│ ├─ อัปเดตอัตโนมัติผ่าน electron-updater       │
│ ├─ Content Security Policy (ส่วนหัวเซสชัน)    │
│ └─ การตั้งค่าความลับเริ่มต้น (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────┘
            ↕ บริดจ์ IPC (electron/preload.js)
┌──────────────────────────────────────────────┐
│ ตัวเรนเดอร์ (แดชบอร์ด Next.js)                │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## เวอร์ชัน

ยืนยันจาก `electron/package.json`:

| แพ็กเกจ            | เวอร์ชัน                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                                 |
| `electron-builder` | `^26.15.3`                                                                                |
| `electron-updater` | `^6.8.9`                                                                                  |
| `better-sqlite3`   | รูท `^13.0.2` (ไบนารีที่คอมไพล์ล่วงหน้าสำหรับ Node-API — ไม่ต้องสร้างใหม่สำหรับ Electron) |
| เวอร์ชันแอป        | `3.8.0`                                                                                   |
| ID แอป             | `online.omniroute.desktop`                                                                |
| ชื่อผลิตภัณฑ์      | `OmniRoute`                                                                               |

## สคริปต์ (`package.json` ที่รูท)

| สคริปต์                           | วัตถุประสงค์                                                                        |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `npm run electron:dev`            | เริ่ม `npm run dev` + รอ `localhost:20128` + เปิด Electron                          |
| `npm run electron:build`          | สร้าง Next.js แล้วเรียกใช้ `electron-builder` สำหรับระบบปฏิบัติการปัจจุบัน          |
| `npm run electron:build:win`      | สร้างตัวติดตั้ง NSIS สำหรับ Windows + เวอร์ชันพกพา (x64)                            |
| `npm run electron:build:mac`      | สร้าง DMG สำหรับ macOS (Intel + Apple Silicon)                                      |
| `npm run electron:build:linux`    | สร้าง AppImage + DEB สำหรับ Linux (x64 + arm64)                                     |
| `npm run electron:smoke:packaged` | เปิดไบนารีที่แพ็กเกจแล้วและตรวจสอบ `/login` เพื่อยืนยัน HTTP 200 จากนั้นปิดการทำงาน |

เวิร์กสเปซ `electron/` ยังมีคำสั่งต่อไปนี้:

- `npm run prepare:bundle` — เรียกใช้ `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — บิลด์ macOS สำหรับสถาปัตยกรรมเดียว
- `npm run pack` — บิลด์เฉพาะไดเรกทอรีสำหรับการทดสอบภายในเครื่อง (ไม่มีตัวติดตั้ง)

## โครงสร้างไดเรกทอรี

```
electron/
├── package.json              # dependencies ของ Electron + การกำหนดค่า electron-builder
├── main.js                   # โปรเซสหลัก (24 KB — ดูคำอธิบายประกอบด้านล่าง)
├── preload.js                # บริดจ์ IPC ของ contextBridge
├── types.d.ts                # ชนิดข้อมูล AppInfo / ServerStatus / ElectronAPI
├── README.md                 # บันทึกภายใน workspace
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # เอาต์พุตของ electron-builder (ถูกละเว้นโดย git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # จัดเตรียมบันเดิล .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # การทดสอบ smoke หลังการ build
```

ทั้ง `main.js` และ `preload.js` เป็น **ไฟล์ CommonJS `.js`** ไม่ใช่ TypeScript ส่วน
type definitions ฝั่ง renderer อยู่ใน `electron/types.d.ts`

## บริดจ์ IPC (`preload.js`)

preload เปิดเผย API ที่อยู่ในรายการอนุญาตบน `window.electronAPI` โดยใช้ `contextBridge`
ร่วมกับ `contextIsolation: true` และ `nodeIntegration: false`

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

เมธอดที่เปิดเผย:

| การเรียกจาก renderer                                              | ชนิด                              |
| ----------------------------------------------------------------- | --------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                            |
| `openExternal(url)`                                               | invoke                            |
| `getDataDir()`                                                    | invoke                            |
| `restartServer()`                                                 | invoke                            |
| `getAppVersion()`                                                 | invoke                            |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                            |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                              |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (คืนค่าฟังก์ชัน disposer) |

ตัวช่วยสำหรับ receive จะคืนค่าเป็น **ฟังก์ชัน disposer** แทนการพึ่งพา
`removeAllListeners` ซึ่งช่วยป้องกันการสะสมของ listener เมื่อคอมโพเนนต์ React
ถูก mount ใหม่

## วงจรชีวิตของเซิร์ฟเวอร์

`main.js` เรียกใช้บันเดิล standalone ของ Next.js โดยตรงด้วย runtime ของ Electron Node
เพื่อหลีกเลี่ยงความไม่ตรงกันของ ABI ของ native module กับ Node ในระบบ:

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

จุดเด่น:

- `waitForServer()` ตรวจสอบ URL ซ้ำเป็นเวลาสูงสุด 30 วินาทีก่อนแสดงหน้าต่าง (ไม่มีหน้าจอว่างเมื่อเริ่มต้นแบบ cold start)
- `stdio: "pipe"` จับ stdout/stderr และเมื่อพบข้อความระบุความพร้อม (`Ready` / `listening`) จะส่ง `server-status: running` ผ่าน IPC
- `before-quit` รอการปิดอย่างราบรื่นด้วย SIGTERM (WAL checkpoint) สูงสุด 5 วินาที จากนั้นจึงส่ง SIGKILL
- ตัวสลับพอร์ตใน tray (`20128`, `3000`, `8080`) จะหยุดและเริ่มเซิร์ฟเวอร์ใหม่ จากนั้นโหลด BrowserWindow ใหม่

## การเริ่มต้น Secret แบบไม่ต้องกำหนดค่า

เมื่อเปิดใช้งานครั้งแรก โปรเซสหลักจะสร้างและบันทึก Secret ที่ยังไม่มีโดยอัตโนมัติ:

| Secret                   | แหล่งที่มา                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                              |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (ปฏิเสธหากมีข้อมูลรับรองที่เข้ารหัสอยู่แล้ว) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                              |

บันทึกไว้ที่ `<DATA_DIR>/server.env` โดย `DATA_DIR` จะถูกกำหนดเป็น:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` หรือ `~/.omniroute`
- macOS: `~/.omniroute`

## หน้าต่างและถาดระบบ

- `BrowserWindow`: 1400×900 (ขั้นต่ำ 1024×700), `backgroundColor: "#0a0a0a"`
- macOS: `titleBarStyle: "hiddenInset"` โดยวางปุ่มควบคุมหน้าต่างไว้ที่ `{ x: 16, y: 16 }`
- Windows/Linux: ใช้แถบชื่อหน้าต่างแบบเนทีฟ
- ปุ่มปิดจะย่อแอปไปยังถาดระบบ โดยเมนูในถาดระบบประกอบด้วย **เปิด OmniRoute**, **เปิดแดชบอร์ด** (ในเบราว์เซอร์ภายนอก), เมนูย่อย **พอร์ตเซิร์ฟเวอร์**, **ตรวจสอบการอัปเดต**, **ออก**

## นโยบายความปลอดภัยของเนื้อหา

กำหนดผ่าน `session.defaultSession.webRequest.onHeadersReceived` โดยมีข้อกำหนดที่สำคัญดังนี้:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- โหมดพัฒนาจะเพิ่ม `'unsafe-eval'` ให้กับ `script-src` เท่านั้น

## การอัปเดตอัตโนมัติ

ใช้ `electron-updater` ร่วมกับผู้ให้บริการ GitHub (`diegosouzapw/OmniRoute`)

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- ส่งต่ออีเวนต์ไปยัง renderer ผ่าน IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (พร้อม `percent`), `downloaded`, `error`
- `installUpdate()` จะหยุดเซิร์ฟเวอร์ จากนั้นเรียก `autoUpdater.quitAndInstall()`
- ข้ามการทำงานในโหมดพัฒนา (`!app.isPackaged`)

## ไปป์ไลน์การบิลด์

1. `npm run build` → สร้าง Next.js standalone ใน `.next/standalone`
2. `prepare-electron-standalone.mjs` → จัดเตรียมไฟล์ใหม่ลงใน `.next/electron-standalone` และเขียนพาธสัมบูรณ์ภายใน `server.js` + `required-server-files.json` ใหม่ เพื่อให้สามารถย้ายตำแหน่งบันเดิลได้
3. `electron-builder` แพ็กเกจ `main.js`, `preload.js`, `node_modules` และ `extraResources: { ../.next/electron-standalone → app }`

### เป้าหมายการบิลด์

| ระบบปฏิบัติการ | เป้าหมาย                                   |
| -------------- | ------------------------------------------ |
| Windows        | ตัวติดตั้ง NSIS + เวอร์ชันพกพา (x64)       |
| macOS          | DMG (Intel + arm64, ลากไปยัง Applications) |
| Linux          | AppImage + DEB (x64 + arm64)               |

การตั้งค่า NSIS: `oneClick: false` อนุญาตให้ผู้ใช้เลือกไดเรกทอรีติดตั้ง และสร้างทางลัดบนเดสก์ท็อปและเมนู Start

## การทดสอบ Smoke Test สำหรับบิลด์ที่แพ็กเกจแล้ว

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- ค้นหาไบนารีที่แพ็กเกจแล้วใน `electron/dist-electron/` สำหรับแพลตฟอร์มปัจจุบันโดยอัตโนมัติ
- เปิดใช้งานโดยใช้ไดเรกทอรี `HOME`/`APPDATA`/`XDG_*` ที่แยกต่างหาก เพื่อไม่ให้กระทบข้อมูลของนักพัฒนา
- ตรวจสอบ `http://127.0.0.1:20128/login` ซ้ำจนกว่าจะได้รับ HTTP 200 ภายใน 45 วินาที
- เฝ้าตรวจสอบ stderr/stdout เพื่อหารูปแบบข้อผิดพลาดร้ายแรง (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` เป็นต้น)
- หลังจากระบบพร้อมใช้งาน จะรอให้รันอย่างเสถียรเป็นเวลา 2 วินาที จากนั้นส่ง SIGTERM และรอจนกว่าพอร์ตจะว่าง
- ใน CI จะส่ง `--no-sandbox --disable-gpu` โดยอัตโนมัติ (และ `--disable-dev-shm-usage` บน Linux)

ตัวแปรสภาพแวดล้อมสำหรับแทนที่ค่า: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`

## การลงนามโค้ด

`electron/package.json` **ไม่ได้** เชื่อมโยงข้อมูลรับรองสำหรับการลงนามโดยตรง ให้ส่งข้อมูลดังกล่าวผ่านตัวแปรสภาพแวดล้อมไปยัง `electron-builder`:

### macOS

```bash
export APPLE_ID=<อีเมล>
export APPLE_APP_SPECIFIC_PASSWORD=<รหัสผ่าน>
export APPLE_TEAM_ID=<รหัส>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<รหัสผ่านใบรับรอง>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<รหัสผ่านใบรับรอง>
npm run electron:build:win
```

### Linux

การลงนาม AppImage เป็นตัวเลือก — ตั้งค่า `LINUX_GPG_KEY` หากต้องการลงนาม

## การแจกจ่าย

อาร์ติแฟกต์จะอยู่ใน `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

รีลีสจะถูกเผยแพร่ไปยัง GitHub Releases (`diegosouzapw/OmniRoute`) ซึ่งเป็นตำแหน่งที่ `electron-updater` ใช้ตรวจสอบเวอร์ชันใหม่ด้วย

## การแก้ไขปัญหา

| อาการ                                                                      | วิธีแก้ไข                                                                                                                                                                             |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` หลังจากอัปเกรด Electron เวอร์ชันหลัก | better-sqlite3 v13 มี Node-API prebuilds ให้แล้ว — เรียกใช้ `npm install` อีกครั้งที่ไดเรกทอรีราก แล้วเรียกใช้ `prepare:bundle` (คำสั่งนี้จะตรวจสอบ prebuild สำหรับแพลตฟอร์มปัจจุบัน) |
| `ERR_DLOPEN_FAILED` สำหรับโมดูลเนทีฟ                                       | เรียกใช้ `prepare:bundle` อีกครั้ง — คำสั่งนี้จะหยุดและรายงานข้อผิดพลาดทันทีเมื่อไม่มี Node-API prebuild สำหรับแพลตฟอร์มปัจจุบัน                                                      |
| หน้าต่างว่างเปล่าบน Linux                                                  | ยืนยันว่าเซิร์ฟเวอร์ Next.js ผูกกับ PORT แล้วจริง ๆ (ตรวจสอบบันทึก `[Server]`)                                                                                                        |
| การรับรองโดย notarization บน macOS ค้าง                                    | ตรวจสอบให้แน่ใจว่าได้ export ตัวแปร `APPLE_*` แล้ว ไม่ใช่เพียงกำหนดไว้ใน `.env`                                                                                                       |
| คำเตือน Windows SmartScreen                                                | ลงนามด้วยใบรับรอง EV หรือให้ผู้ใช้คลิกขวา → "เรียกใช้ต่อไป"                                                                                                                           |
| การทดสอบ smoke ล้มเหลวเนื่องจากพอร์ตถูกใช้งานอยู่                          | หยุดเซิร์ฟเวอร์สำหรับการพัฒนาในเครื่องที่ใช้พอร์ต 20128 ก่อนเรียกใช้ `electron:smoke:packaged`                                                                                        |

## ดูเพิ่มเติม

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- ซอร์ส: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- ตัวช่วย: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
