# Electron Desktop Guide (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Sumber rujukan utama:** ruang kerja `electron/`
> **Kemas kini terakhir:** 2026-06-28 — v3.8.40

OmniRoute menyediakan aplikasi desktop merentas platform (Windows / macOS / Linux) yang dibina menggunakan
**Electron 41** + **electron-builder 26.10**. Aplikasi desktop melancarkan pelayan kendiri Next.js
sebagai proses anak, menghalakan `BrowserWindow` kepadanya, serta menambahkan dulang
sistem, pengemas kini automatik, jambatan IPC dan pemulaan rahsia tanpa konfigurasi.

## Seni bina

```
┌────────────────────────────────────────────────────┐
│ Proses utama Electron (electron/main.js)           │
│ ├─ Kunci tika tunggal                               │
│ ├─ Proses anak: pelayan kendiri Next.js            │
│ │   (dilancarkan dengan masa jalan Node Electron)  │
│ ├─ BrowserWindow → http://localhost:PORT            │
│ ├─ Dulang sistem + menu konteks                     │
│ ├─ Kemas kini automatik melalui electron-updater   │
│ ├─ Dasar Keselamatan Kandungan (pengepala sesi)    │
│ └─ Pemulaan rahsia (JWT / API_KEY_SECRET)          │
└────────────────────────────────────────────────────┘
            ↕ Jambatan IPC (electron/preload.js)
┌────────────────────────────────────────────────────┐
│ Pemapar (papan pemuka Next.js)                     │
│   window.electronAPI.* (contextIsolation)           │
└────────────────────────────────────────────────────┘
```

## Versi

Disahkan daripada `electron/package.json`:

| Pakej              | Versi                                                              |
| ------------------ | ------------------------------------------------------------------ |
| `electron`         | `^43.4.1`                                                          |
| `electron-builder` | `^26.15.3`                                                         |
| `electron-updater` | `^6.8.9`                                                           |
| `better-sqlite3`   | akar `^13.0.2` (prabinaan Node-API — tiada binaan semula Electron) |
| Versi aplikasi     | `3.8.0`                                                            |
| ID aplikasi        | `online.omniroute.desktop`                                         |
| Nama produk        | `OmniRoute`                                                        |

## Skrip (`package.json` akar)

| Skrip                             | Tujuan                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run electron:dev`            | Memulakan `npm run dev` + menunggu `localhost:20128` + melancarkan Electron                      |
| `npm run electron:build`          | Membina Next.js, kemudian menjalankan `electron-builder` untuk OS semasa                         |
| `npm run electron:build:win`      | Membina pemasang NSIS Windows + versi mudah alih (x64)                                           |
| `npm run electron:build:mac`      | Membina DMG macOS (Intel + Apple Silicon)                                                        |
| `npm run electron:build:linux`    | Membina AppImage + DEB Linux (x64 + arm64)                                                       |
| `npm run electron:smoke:packaged` | Melancarkan binari berpakej dan menguji `/login` untuk HTTP 200, kemudian menamatkan aplikasinya |

Ruang kerja `electron/` turut menyediakan:

- `npm run prepare:bundle` — menjalankan `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — binaan macOS seni bina tunggal
- `npm run pack` — binaan direktori sahaja untuk pengujian setempat (tanpa pemasang)

## Susun Atur Direktori

```
electron/
├── package.json              # Kebergantungan Electron + konfigurasi electron-builder
├── main.js                   # Proses utama (24 KB — lihat anotasi di bawah)
├── preload.js                # Jambatan IPC contextBridge
├── types.d.ts                # Jenis AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Nota dalam ruang kerja
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Output electron-builder (diabaikan oleh git)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Menyediakan himpunan .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Ujian ringkas selepas binaan
```

Kedua-dua `main.js` dan `preload.js` ialah **fail CommonJS `.js`**, bukan TypeScript. Penaipan
bahagian pemapar terletak dalam `electron/types.d.ts`.

## Jambatan IPC (`preload.js`)

Prapemuatan mendedahkan API yang disenaraikan dalam senarai dibenarkan pada `window.electronAPI` menggunakan `contextBridge`
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

Kaedah yang didedahkan:

| Panggilan pemapar                                                 | Jenis                                  |
| ----------------------------------------------------------------- | -------------------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                                 |
| `openExternal(url)`                                               | invoke                                 |
| `getDataDir()`                                                    | invoke                                 |
| `restartServer()`                                                 | invoke                                 |
| `getAppVersion()`                                                 | invoke                                 |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                                 |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                                   |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (mengembalikan fungsi pelupus) |

Pembantu penerimaan mengembalikan **fungsi pelupus** dan bukannya bergantung pada
`removeAllListeners` — ini menghalang pengumpulan pendengar apabila komponen React
dipasang semula.

## Kitaran Hayat Pelayan

`main.js` melancarkan himpunan kendiri Next.js secara langsung dengan masa jalan Node
Electron untuk mengelakkan ketidakpadanan ABI modul natif dengan Node sistem:

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

- `waitForServer()` meninjau URL sehingga 30 s sebelum memaparkan tetingkap (tiada skrin kosong semasa permulaan sejuk).
- `stdio: "pipe"` menangkap stdout/stderr; frasa kesediaan (`Ready` / `listening`) memancarkan `server-status: running` melalui IPC.
- `before-quit` menunggu sehingga 5 s untuk SIGTERM secara terkawal (titik semak WAL), kemudian menghantar SIGKILL.
- Penukar port dalam dulang (`20128`, `3000`, `8080`) menghentikan dan memulakan semula pelayan, kemudian memuatkan semula BrowserWindow.

## But Strap Rahsia Tanpa Konfigurasi

Pada pelancaran pertama, proses utama menjana secara automatik dan menyimpan rahsia yang tiada:

| Rahsia                   | Sumber                                                                                   |
| ------------------------ | ---------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                 |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (ditolak jika kelayakan disulitkan sudah wujud) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                 |

Disimpan dalam `<DATA_DIR>/server.env`. `DATA_DIR` ditentukan sebagai:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` atau `~/.omniroute`
- macOS: `~/.omniroute`

## Tetingkap & Dulang Sistem

- `BrowserWindow`: 1400×900 (minimum 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, butang lampu isyarat pada `{ x: 16, y: 16 }`.
- Windows/Linux: bar tajuk natif.
- Butang tutup meminimumkan aplikasi ke dulang sistem; menu dulang mempunyai **Buka OmniRoute**, **Buka Papan Pemuka** (pelayar luaran), submenu **Port Pelayan**, **Semak Kemas Kini**, **Keluar**.

## Dasar Keselamatan Kandungan

Ditetapkan melalui `session.defaultSession.webRequest.onHeadersReceived`. Arahan penting:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Mod pembangunan menambahkan `'unsafe-eval'` pada `script-src` sahaja

## Kemas Kini Automatik

Menggunakan `electron-updater` dengan penyedia GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Peristiwa dimajukan kepada pemapar melalui IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (dengan `percent`), `downloaded`, `error`
- `installUpdate()` menghentikan pelayan, kemudian memanggil `autoUpdater.quitAndInstall()`
- Dilangkau dalam mod pembangunan (`!app.isPackaged`)

## Talian Paip Binaan

1. `npm run build` → Next.js kendiri dalam `.next/standalone`.
2. `prepare-electron-standalone.mjs` → menyediakan semula ke dalam `.next/electron-standalone` dan menulis semula laluan mutlak di dalam `server.js` + `required-server-files.json` supaya berkas boleh dipindahkan.
3. `electron-builder` membungkus `main.js`, `preload.js`, `node_modules`, dan `extraResources: { ../.next/electron-standalone → app }`.

### Sasaran binaan

| OS      | Sasaran                                    |
| ------- | ------------------------------------------ |
| Windows | Pemasang NSIS + mudah alih (x64)           |
| macOS   | DMG (Intel + arm64, seret ke Applications) |
| Linux   | AppImage + DEB (x64 + arm64)               |

Tetapan NSIS: `oneClick: false`, membolehkan pengguna memilih direktori pemasangan, serta mencipta pintasan Desktop dan menu Start.

## Ujian Asap Binaan Berpakej

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Mengesan secara automatik binari berpakej dalam `electron/dist-electron/` untuk platform semasa.
- Melancarkan dengan direktori `HOME`/`APPDATA`/`XDG_*` yang diasingkan supaya data pembangun tidak disentuh.
- Meninjau `http://127.0.0.1:20128/login` untuk respons HTTP 200 dalam tempoh 45 s.
- Memantau stderr/stdout untuk corak ralat maut (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, dan sebagainya).
- Menunggu 2 s masa jalan yang stabil selepas sedia, kemudian menghantar SIGTERM dan menunggu sehingga port dibebaskan.
- Dalam CI, menghantar `--no-sandbox --disable-gpu` secara automatik (dan `--disable-dev-shm-usage` pada Linux).

Penggantian env: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Penandatanganan Kod

`electron/package.json` **tidak** mengkonfigurasi kelayakan penandatanganan secara langsung. Hantarkannya melalui pemboleh ubah persekitaran kepada `electron-builder`:

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

Penandatanganan AppImage adalah pilihan — tetapkan `LINUX_GPG_KEY` jika ingin menandatangani.

## Pengedaran

Artifak disimpan dalam `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Keluaran diterbitkan ke GitHub Releases (`diegosouzapw/OmniRoute`), yang juga merupakan lokasi `electron-updater` menyemak versi baharu.

## Penyelesaian Masalah

| Gejala                                                                         | Penyelesaian                                                                                                                                                                |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` selepas peningkatan versi utama Electron | better-sqlite3 v13 menyediakan prabinaan Node-API — jalankan semula `npm install` pada direktori akar dan `prepare:bundle` (ia mengesahkan prabinaan untuk platform semasa) |
| `ERR_DLOPEN_FAILED` untuk modul natif                                          | Jalankan semula `prepare:bundle` — ia gagal serta-merta apabila prabinaan Node-API untuk platform semasa tiada                                                              |
| Tetingkap kelihatan kosong pada Linux                                          | Sahkan pelayan Next.js benar-benar terikat pada PORT (semak log `[Server]`)                                                                                                 |
| Notarisasi macOS tersekat                                                      | Pastikan pemboleh ubah `APPLE_*` dieksport, bukan hanya berada dalam `.env`                                                                                                 |
| Amaran Windows SmartScreen                                                     | Tandatangani dengan sijil EV, atau pengguna boleh klik kanan → "Jalankan juga"                                                                                              |
| Ujian ringkas gagal kerana port sedang digunakan                               | Hentikan mana-mana pelayan pembangunan setempat pada 20128 sebelum menjalankan `electron:smoke:packaged`                                                                    |

## Lihat Juga

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Sumber: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Pembantu: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
