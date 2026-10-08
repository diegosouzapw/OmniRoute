# Electron Desktop Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Sumber kebenaran:** workspace `electron/`
> **Terakhir diperbarui:** 2026-06-28 — v3.8.40

OmniRoute menyediakan aplikasi desktop lintas platform (Windows / macOS / Linux) yang dibangun dengan
**Electron 41** + **electron-builder 26.10**. Aplikasi desktop menjalankan server mandiri Next.js
sebagai proses anak, mengarahkan `BrowserWindow` ke server tersebut, serta menambahkan
tray sistem, pembaru otomatis, jembatan IPC, dan bootstrap rahasia tanpa konfigurasi.

## Arsitektur

```
┌──────────────────────────────────────────────┐
│ Proses utama Electron (electron/main.js)     │
│ ├─ Kunci instans tunggal                     │
│ ├─ Proses anak: server mandiri Next.js       │
│ │   (dijalankan dengan runtime Node Electron)│
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Tray sistem + menu konteks                │
│ ├─ Pembaruan otomatis via electron-updater   │
│ ├─ Content Security Policy (header sesi)     │
│ └─ Bootstrap rahasia (JWT / API_KEY_SECRET)  │
└──────────────────────────────────────────────┘
            ↕ Jembatan IPC (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Renderer (dasbor Next.js)                    │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## Versi

Dikonfirmasi dari `electron/package.json`:

| Paket              | Versi                                                       |
| ------------------ | ----------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                   |
| `electron-builder` | `^26.15.3`                                                  |
| `electron-updater` | `^6.8.9`                                                    |
| `better-sqlite3`   | root `^13.0.2` (prebuild Node-API — tanpa rebuild Electron) |
| Versi aplikasi     | `3.8.0`                                                     |
| ID aplikasi        | `online.omniroute.desktop`                                  |
| Nama produk        | `OmniRoute`                                                 |

## Skrip (`package.json` root)

| Skrip                             | Tujuan                                                                              |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Memulai `npm run dev` + menunggu `localhost:20128` + meluncurkan Electron           |
| `npm run electron:build`          | Membangun Next.js lalu menjalankan `electron-builder` untuk OS saat ini             |
| `npm run electron:build:win`      | Membangun penginstal NSIS Windows + versi portabel (x64)                            |
| `npm run electron:build:mac`      | Membangun DMG macOS (Intel + Apple Silicon)                                         |
| `npm run electron:build:linux`    | Membangun AppImage + DEB Linux (x64 + arm64)                                        |
| `npm run electron:smoke:packaged` | Meluncurkan biner terpaket dan memeriksa `/login` untuk HTTP 200, lalu mematikannya |

Workspace `electron/` juga menyediakan:

- `npm run prepare:bundle` — menjalankan `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — build macOS untuk satu arsitektur
- `npm run pack` — build khusus direktori untuk pengujian lokal (tanpa penginstal)

## Tata Letak Direktori

```
electron/
├── package.json              # Dependensi Electron + konfigurasi electron-builder
├── main.js                   # Proses utama (24 KB — lihat anotasi di bawah)
├── preload.js                # Jembatan IPC contextBridge
├── types.d.ts                # Tipe AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Catatan dalam workspace
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Output electron-builder (diabaikan oleh git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Menyiapkan bundle .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Uji asap pascapembuatan
```

Baik `main.js` maupun `preload.js` adalah **file CommonJS `.js`**, bukan TypeScript. Definisi tipe
sisi renderer berada di `electron/types.d.ts`.

## Jembatan IPC (`preload.js`)

Preload mengekspos API yang diizinkan pada `window.electronAPI` menggunakan `contextBridge`
dengan `contextIsolation: true` dan `nodeIntegration: false`.

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

Metode yang diekspos:

| Panggilan renderer                                                | Tipe                             |
| ----------------------------------------------------------------- | -------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                           |
| `openExternal(url)`                                               | invoke                           |
| `getDataDir()`                                                    | invoke                           |
| `restartServer()`                                                 | invoke                           |
| `getAppVersion()`                                                 | invoke                           |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                           |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                             |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (mengembalikan disposer) |

Helper receive mengembalikan **fungsi disposer**, alih-alih mengandalkan
`removeAllListeners` — ini mencegah penumpukan listener ketika komponen React
dipasang ulang.

## Siklus Hidup Server

`main.js` menjalankan bundle standalone Next.js secara langsung dengan runtime Node
Electron untuk menghindari ketidakcocokan ABI modul native dengan Node sistem:

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

Sorotan:

- `waitForServer()` melakukan polling URL hingga 30 detik sebelum menampilkan jendela (tidak ada layar kosong saat cold start).
- `stdio: "pipe"` menangkap stdout/stderr; frasa siap (`Ready` / `listening`) mengirimkan `server-status: running` melalui IPC.
- `before-quit` menunggu hingga 5 detik untuk SIGTERM yang anggun (checkpoint WAL), lalu mengirimkan SIGKILL.
- Pengalih port di tray (`20128`, `3000`, `8080`) menghentikan dan memulai ulang server, lalu memuat ulang BrowserWindow.

## Bootstrap Rahasia Tanpa Konfigurasi

Saat pertama kali dijalankan, proses utama secara otomatis membuat dan menyimpan rahasia yang belum tersedia:

| Rahasia                  | Sumber                                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                 |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (menolak jika kredensial terenkripsi sudah ada) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                 |

Disimpan ke `<DATA_DIR>/server.env`. `DATA_DIR` ditetapkan sebagai:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` atau `~/.omniroute`
- macOS: `~/.omniroute`

## Pencarian file lingkungan

Sebelum menjalankan server, proses utama (`getPreferredEnvFilePath()` di
`electron/main.js`) memilih **satu** file `.env`: file pertama dari daftar berikut yang tersedia.

1. `$DATA_DIR/.env`, ketika `DATA_DIR` ditetapkan di lingkungan tempat aplikasi dijalankan.
2. `<resolved DATA_DIR>/.env`, menggunakan nilai default yang sama seperti di atas: `%APPDATA%\omniroute\.env` pada
   Windows, `$XDG_CONFIG_HOME/omniroute/.env` atau `~/.omniroute/.env` pada Linux dan macOS.
3. `.env` di direktori kerja proses.

Proses utama hanya membaca file tersebut; kandidat berikutnya tidak digabungkan. Lingkungan
server kemudian dibuat dengan urutan prioritas berikut (tertinggi terlebih dahulu):

1. Lingkungan proses Electron (variabel yang diwarisi dari apa pun yang menjalankan aplikasi).
2. File `.env` yang dipilih.
3. `<DATA_DIR>/server.env` (rahasia bootstrap di atas).

Lingkungan proses direkam saat aplikasi dimulai, sehingga variabel lingkungan sistem atau pengguna
yang ditetapkan saat aplikasi sedang berjalan (termasuk saat aplikasi tetap berada di baki sistem setelah jendelanya
ditutup) tidak diteruskan ke server hingga aplikasi ditutup sepenuhnya dan dijalankan kembali. Untuk opsi runtime
seperti `CONTEXT_LENGTH_<PROVIDER>` (lihat
[Variabel Lingkungan: Panjang konteks per penyedia](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
sebaiknya gunakan file `.env`, lalu tutup sepenuhnya (baki sistem, **Keluar**) dan jalankan kembali.

## Jendela & Baki Sistem

- `BrowserWindow`: 1400×900 (min 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, tombol kontrol jendela di `{ x: 16, y: 16 }`.
- Windows/Linux: bilah judul native.
- Tombol tutup meminimalkan aplikasi ke baki sistem; menu baki memiliki **Buka OmniRoute**, **Buka Dasbor** (browser eksternal), submenu **Port Server**, **Periksa Pembaruan**, **Keluar**.

## Kebijakan Keamanan Konten

Ditetapkan melalui `session.defaultSession.webRequest.onHeadersReceived`. Direktif penting:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Mode pengembangan hanya menambahkan `'unsafe-eval'` ke `script-src`

## Pembaruan otomatis

Menggunakan `electron-updater` dengan penyedia GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Peristiwa diteruskan ke renderer melalui IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (dengan `percent`), `downloaded`, `error`
- `installUpdate()` menghentikan server lalu memanggil `autoUpdater.quitAndInstall()`
- Dilewati dalam mode pengembangan (`!app.isPackaged`)

## Pipeline Build

1. `npm run build` → Next.js standalone di `.next/standalone`.
2. `prepare-electron-standalone.mjs` → menata ulang ke `.next/electron-standalone` dan menulis ulang path absolut di dalam `server.js` + `required-server-files.json` agar bundel dapat dipindahkan.
3. `electron-builder` mengemas `main.js`, `preload.js`, `node_modules`, dan `extraResources: { ../.next/electron-standalone → app }`.

### Target build

| OS      | Target                                     |
| ------- | ------------------------------------------ |
| Windows | Penginstal NSIS + portabel (x64)           |
| macOS   | DMG (Intel + arm64, seret ke Applications) |
| Linux   | AppImage + DEB (x64 + arm64)               |

Pengaturan NSIS: `oneClick: false`, memungkinkan pengguna memilih direktori instalasi, serta membuat pintasan Desktop dan Start Menu.

## Pengujian Smoke untuk Build yang Telah Dikemas

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Secara otomatis menemukan biner yang telah dikemas di `electron/dist-electron/` untuk platform saat ini.
- Meluncurkannya dengan direktori `HOME`/`APPDATA`/`XDG_*` yang terisolasi agar tidak menyentuh data pengembang.
- Melakukan polling terhadap `http://127.0.0.1:20128/login` untuk mendapatkan HTTP 200 dalam waktu 45 detik.
- Memantau stderr/stdout untuk pola fatal (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, dan sebagainya).
- Menunggu runtime stabil selama 2 detik setelah siap, kemudian mengirimkan SIGTERM dan menunggu hingga port bebas.
- Di CI, secara otomatis meneruskan `--no-sandbox --disable-gpu` (dan `--disable-dev-shm-usage` di Linux).

Override env: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Penandatanganan Kode

`electron/package.json` **tidak** menghubungkan kredensial penandatanganan secara langsung. Teruskan kredensial tersebut melalui env vars ke `electron-builder`:

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

Penandatanganan AppImage bersifat opsional — atur `LINUX_GPG_KEY` jika ingin menandatangani.

## Distribusi

Artefak tersedia di `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Rilis dipublikasikan ke GitHub Releases (`diegosouzapw/OmniRoute`), yang juga menjadi lokasi tempat `electron-updater` memeriksa versi baru.

## Pemecahan Masalah

| Gejala                                                                         | Perbaikan                                                                                                                                                                  |
| ------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` setelah peningkatan versi mayor Electron | better-sqlite3 v13 menyediakan prebuild Node-API — jalankan ulang `npm install` di root dan `prepare:bundle` (perintah ini memverifikasi prebuild untuk platform saat ini) |
| `ERR_DLOPEN_FAILED` untuk modul native                                         | Jalankan ulang `prepare:bundle` — proses ini langsung gagal ketika prebuild Node-API untuk platform saat ini tidak tersedia                                                |
| Jendela tampak kosong di Linux                                                 | Pastikan server Next.js benar-benar terikat ke PORT (periksa log `[Server]`)                                                                                               |
| Notarisasi macOS terhenti                                                      | Pastikan env vars `APPLE_*` diekspor, bukan hanya disimpan di `.env`                                                                                                       |
| Peringatan Windows SmartScreen                                                 | Tandatangani dengan sertifikat EV, atau pengguna dapat mengeklik kanan → "Tetap jalankan"                                                                                  |
| Pengujian smoke gagal karena port sedang digunakan                             | Hentikan server pengembangan lokal apa pun di 20128 sebelum menjalankan `electron:smoke:packaged`                                                                          |

## Lihat Juga

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Sumber: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pembantu: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
