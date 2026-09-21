# Electron Desktop Guide (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Asosiy manba:** `electron/` ish maydoni
> **Soʻnggi yangilanish:** 2026-06-28 — v3.8.40

OmniRoute **Electron 41** + **electron-builder 26.10** asosida yaratilgan,
platformalararo ish stoli ilovasini (Windows / macOS / Linux) taqdim etadi. Ish stoli ilovasi Next.js
mustaqil serverini quyi jarayon sifatida ishga tushiradi, `BrowserWindow` oynasini unga
yoʻnaltiradi hamda tizim treyi, avtomatik yangilash vositasi, IPC koʻprigi va konfiguratsiyasiz maxfiy kalitlarni boshlangʻich sozlash imkoniyatlarini qoʻshadi.

## Arxitektura

```
┌──────────────────────────────────────────────┐
│ Electron asosiy jarayoni (electron/main.js)  │
│ ├─ Yagona nusxa qulfi                        │
│ ├─ Quyi jarayon: Next.js mustaqil serveri    │
│ │   (Electron Node muhiti bilan ishga tushadi)│
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Tizim treyi + kontekst menyusi            │
│ ├─ electron-updater orqali avtomatik yangilash│
│ ├─ Kontent xavfsizligi siyosati (sessiya sarlavhalari) │
│ └─ Maxfiy kalitlarni boshlangʻich sozlash (JWT / API_KEY_SECRET) │
└──────────────────────────────────────────────┘
            ↕ IPC koʻprigi (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderer (Next.js boshqaruv paneli)          │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## Versiyalar

`electron/package.json` fayli asosida tasdiqlangan:

| Paket                | Versiya                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------- |
| `electron`           | `^43.4.1`                                                                                     |
| `electron-builder`   | `^26.15.3`                                                                                    |
| `electron-updater`   | `^6.8.9`                                                                                      |
| `better-sqlite3`     | asosiy `^13.0.2` (Node-API tayyor yigʻmalari — Electron uchun qayta yigʻish talab qilinmaydi) |
| Ilova versiyasi      | `3.8.0`                                                                                       |
| Ilova identifikatori | `online.omniroute.desktop`                                                                    |
| Mahsulot nomi        | `OmniRoute`                                                                                   |

## Skriptlar (asosiy `package.json`)

| Skript                            | Maqsad                                                                                                                       |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev`ni ishga tushiradi + `localhost:20128`ni kutadi + Electron’ni ishga tushiradi                                   |
| `npm run electron:build`          | Next.js’ni yigʻadi, soʻng joriy OT uchun `electron-builder`ni ishga tushiradi                                                |
| `npm run electron:build:win`      | Windows NSIS oʻrnatuvchisi + portativ versiyani (x64) yigʻadi                                                                |
| `npm run electron:build:mac`      | macOS DMG’ni (Intel + Apple Silicon) yigʻadi                                                                                 |
| `npm run electron:build:linux`    | Linux AppImage + DEB’ni (x64 + arm64) yigʻadi                                                                                |
| `npm run electron:smoke:packaged` | Paketlangan bajariladigan faylni ishga tushiradi va `/login` manzilini HTTP 200 javobi uchun tekshiradi, soʻng uni oʻchiradi |

`electron/` ish maydoni quyidagilarni ham taqdim etadi:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs`ni ishga tushiradi
- `npm run build:mac-x64` / `build:mac-arm64` — bitta arxitektura uchun macOS yigʻmalari
- `npm run pack` — mahalliy sinov uchun faqat katalogli yigʻma (oʻrnatuvchisiz)

## Katalog tuzilishi

```
electron/
├── package.json              # Electron bogʻliqliklari + electron-builder konfiguratsiyasi
├── main.js                   # Asosiy jarayon (24 KB — quyidagi izohlarga qarang)
├── preload.js                # contextBridge IPC ko‘prigi
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI turlari
├── README.md                 # Ish maydonidagi qaydlar
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder chiqishi (git tomonidan eʼtiborsiz qoldiriladi)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone toʻplamini tayyorlaydi
└── dev/
    └── smoke-electron-packaged.mjs       # Yigʻishdan keyingi smoke-testi
```

`main.js` va `preload.js` fayllarining ikkalasi ham TypeScript emas, balki **CommonJS `.js` fayllari**.
Renderer tomonidagi tip taʼriflari `electron/types.d.ts` faylida joylashgan.

## IPC ko‘prigi (`preload.js`)

Preload `contextIsolation: true` va `nodeIntegration: false` parametrlari bilan
`contextBridge` orqali `window.electronAPI` obyektida ruxsat etilgan API roʻyxatini taqdim etadi.

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

Taqdim etilgan metodlar:

| Renderer chaqiruvi                                                | Tur                                       |
| ----------------------------------------------------------------- | ----------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                    |
| `openExternal(url)`                                               | invoke                                    |
| `getDataDir()`                                                    | invoke                                    |
| `restartServer()`                                                 | invoke                                    |
| `getAppVersion()`                                                 | invoke                                    |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                    |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                      |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (tozalash funksiyasini qaytaradi) |

Qabul qilish yordamchilari `removeAllListeners`ga tayanish oʻrniga **tozalash funksiyasini**
qaytaradi — bu React komponentlari qayta ulanganda tinglovchilar toʻplanib qolishining
oldini oladi.

## Serverning hayot sikli

`main.js` tizimdagi Node bilan mahalliy modullar ABI nomuvofiqligini oldini olish uchun
Next.js mustaqil toʻplamini bevosita Electron Node ijro muhiti yordamida ishga tushiradi:

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

Muhim jihatlar:

- `waitForServer()` oynani ko‘rsatishdan oldin URL manzilini 30 s gacha tekshiradi (sovuq ishga tushirishda bo‘sh ekran ko‘rinmaydi).
- `stdio: "pipe"` stdout/stderr oqimlarini yozib oladi; tayyorlik iboralari (`Ready` / `listening`) IPC orqali `server-status: running` hodisasini yuboradi.
- `before-quit` muammosiz SIGTERM (WAL nazorat nuqtasi) uchun 5 s gacha kutadi, soʻng SIGKILL yuboradi.
- Tizim treyidagi port almashtirgichi (`20128`, `3000`, `8080`) serverni toʻxtatib, qayta ishga tushiradi va keyin BrowserWindow oynasini qayta yuklaydi.

## Nol-konfiguratsiyali maxfiy maʼlumotlarni boshlangʻich sozlash

Birinchi ishga tushirishda asosiy jarayon mavjud boʻlmagan maxfiy maʼlumotlarni avtomatik yaratadi va saqlaydi:

| Maxfiy maʼlumot          | Manba                                                                                              |
| ------------------------ | -------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                           |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (shifrlangan hisob maʼlumotlari mavjud boʻlsa, rad etadi) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                           |

`<DATA_DIR>/server.env` fayliga saqlanadi. `DATA_DIR` quyidagicha aniqlanadi:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` yoki `~/.omniroute`
- macOS: `~/.omniroute`

## Oyna va tizim treyi

- `BrowserWindow`: 1400×900 (minimal 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, boshqaruv tugmalari `{ x: 16, y: 16 }` koordinatasida.
- Windows/Linux: standart sarlavha paneli.
- Yopish tugmasi oynani tizim treyiga minimallashtiradi; trey menyusida **OmniRouteʼni ochish**, **Boshqaruv panelini ochish** (tashqi brauzerda), **Server porti** quyi menyusi, **Yangilanishlarni tekshirish**, **Chiqish** bandlari mavjud.

## Kontent xavfsizligi siyosati

`session.defaultSession.webRequest.onHeadersReceived` orqali oʻrnatiladi. Muhim direktivalar:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Ishlab chiqish rejimida faqat `script-src` direktivasiga `'unsafe-eval'` qoʻshiladi

## Avtomatik yangilash

GitHub provayderi (`diegosouzapw/OmniRoute`) bilan `electron-updater` ishlatiladi.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Hodisalar `update-status` IPC orqali rendererga uzatiladi:
  `checking`, `available`, `not-available`, `downloading` (`percent` bilan), `downloaded`, `error`
- `installUpdate()` serverni toʻxtatadi, soʻng `autoUpdater.quitAndInstall()` funksiyasini chaqiradi
- Ishlab chiqish rejimida oʻtkazib yuboriladi (`!app.isPackaged`)

## Yigʻish jarayoni

1. `npm run build` → `.next/standalone` ichidagi Next.js mustaqil yigʻilmasi.
2. `prepare-electron-standalone.mjs` → fayllarni `.next/electron-standalone` ichiga qayta joylaydi va paket boshqa joyga koʻchirilishi mumkin boʻlishi uchun `server.js` hamda `required-server-files.json` ichidagi mutlaq yoʻllarni qayta yozadi.
3. `electron-builder` `main.js`, `preload.js`, `node_modules` va `extraResources: { ../.next/electron-standalone → app }` ni paketlaydi.

### Yigʻish maqsadlari

| OT      | Maqsadlar                                              |
| ------- | ------------------------------------------------------ |
| Windows | NSIS oʻrnatuvchisi + portativ versiya (x64)            |
| macOS   | DMG (Intel + arm64, Applications ichiga sudrab oʻtish) |
| Linux   | AppImage + DEB (x64 + arm64)                           |

NSIS sozlamalari: `oneClick: false`, foydalanuvchiga oʻrnatish katalogini tanlash imkonini beradi, Ish stoli va Start menyusi yorliqlarini yaratadi.

## Paketlangan yigʻilmani tutun testi orqali tekshirish

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Joriy platforma uchun paketlangan bajariladigan faylni `electron/dist-electron/` ichidan avtomatik topadi.
- Ishlab chiquvchi maʼlumotlariga tegmaslik uchun alohida `HOME`/`APPDATA`/`XDG_*` kataloglari bilan ishga tushiradi.
- 45 soniya ichida HTTP 200 javobini olish uchun `http://127.0.0.1:20128/login` manzilini davriy tekshiradi.
- stderr/stdout oqimlarida kritik xato namunalarini (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` va boshqalar) kuzatadi.
- Tayyorlikka erishilgach, barqaror ishlashni 2 soniya kutadi, soʻng SIGTERM yuboradi va port boʻshashini kutadi.
- CI muhitida avtomatik ravishda `--no-sandbox --disable-gpu` (Linuxʼda esa qoʻshimcha ravishda `--disable-dev-shm-usage`) parametrlarini uzatadi.

Muhit oʻzgaruvchilari orqali qayta belgilash: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kodni imzolash

`electron/package.json` imzolash hisob ma’lumotlarini bevosita bog‘lamaydi. Ularni muhit o‘zgaruvchilari orqali `electron-builder`ga uzating:

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

AppImage’ni imzolash ixtiyoriy — imzolash kerak bo‘lsa, `LINUX_GPG_KEY`ni sozlang.

## Tarqatish

Artefaktlar `electron/dist-electron/` katalogiga joylanadi:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Relizlar GitHub Releases (`diegosouzapw/OmniRoute`)da e’lon qilinadi; `electron-updater` ham yangi versiyalarni shu yerdan tekshiradi.

## Muammolarni bartaraf etish

| Alomat                                                                               | Yechim                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron asosiy versiyasi yangilangandan keyin `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 Node-API uchun oldindan yig‘ilgan fayllarni taqdim etadi — ildiz katalogda `npm install` va `prepare:bundle`ni qayta ishga tushiring (u joriy platforma uchun oldindan yig‘ilgan faylni tekshiradi) |
| Mahalliy modul uchun `ERR_DLOPEN_FAILED`                                             | `prepare:bundle`ni qayta ishga tushiring — joriy platforma uchun Node-API oldindan yig‘ilgan fayli mavjud bo‘lmasa, u darhol xato bilan yakunlanadi                                                                    |
| Linux’da oyna bo‘sh ko‘rinadi                                                        | Next.js serveri haqiqatdan ham PORTga bog‘langanini tasdiqlang (`[Server]` jurnallarini tekshiring)                                                                                                                    |
| macOS notarizatsiyasi to‘xtab qoladi                                                 | `APPLE_*` o‘zgaruvchilari faqat `.env` ichida emas, balki eksport qilinganiga ishonch hosil qiling                                                                                                                     |
| Windows SmartScreen ogohlantirishi                                                   | EV sertifikati bilan imzolang yoki foydalanuvchilar sichqonchaning o‘ng tugmasini bosib → "Baribir ishga tushirish"ni tanlasin                                                                                         |
| Port bandligi sababli smoke test muvaffaqiyatsiz tugaydi                             | `electron:smoke:packaged`ni ishga tushirishdan oldin 20128-portdagi barcha mahalliy ishlab chiqish serverlarini to‘xtating                                                                                             |

## Shuningdek qarang

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Manba: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Yordamchi vositalar: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
