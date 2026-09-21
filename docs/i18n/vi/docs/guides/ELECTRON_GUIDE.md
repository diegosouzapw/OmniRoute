# Electron Desktop Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Nguồn chính xác:** workspace `electron/`
> **Cập nhật lần cuối:** 2026-06-28 — v3.8.40

OmniRoute cung cấp một ứng dụng desktop đa nền tảng (Windows / macOS / Linux) được xây dựng trên
**Electron 41** + **electron-builder 26.10**. Ứng dụng desktop khởi chạy máy chủ độc lập Next.js
dưới dạng tiến trình con, trỏ một `BrowserWindow` đến máy chủ đó, đồng thời bổ sung
khay hệ thống, trình tự động cập nhật, cầu nối IPC và cơ chế khởi tạo bí mật không cần cấu hình.

## Kiến trúc

```
┌──────────────────────────────────────────────┐
│ Tiến trình chính Electron (electron/main.js) │
│ ├─ Khóa đơn phiên bản                        │
│ ├─ Tiến trình con: máy chủ độc lập Next.js   │
│ │   (được khởi chạy bằng Node runtime của Electron) │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Khay hệ thống + menu ngữ cảnh             │
│ ├─ Tự động cập nhật qua electron-updater     │
│ ├─ Chính sách bảo mật nội dung (header phiên)│
│ └─ Khởi tạo bí mật (JWT / API_KEY_SECRET)    │
└──────────────────────────────────────────────┘
            ↕ Cầu nối IPC (electron/preload.js)
┌──────────────────────────────────────────────┐
│ Trình kết xuất (bảng điều khiển Next.js)      │
│   window.electronAPI.* (contextIsolation)     │
└──────────────────────────────────────────────┘
```

## Phiên bản

Được xác nhận từ `electron/package.json`:

| Gói                | Phiên bản                                                                |
| ------------------ | ------------------------------------------------------------------------ |
| `electron`         | `^43.4.1`                                                                |
| `electron-builder` | `^26.15.3`                                                               |
| `electron-updater` | `^6.8.9`                                                                 |
| `better-sqlite3`   | root `^13.0.2` (bản dựng sẵn Node-API — không cần dựng lại cho Electron) |
| Phiên bản ứng dụng | `3.8.0`                                                                  |
| ID ứng dụng        | `online.omniroute.desktop`                                               |
| Tên sản phẩm       | `OmniRoute`                                                              |

## Script (`package.json` gốc)

| Script                            | Mục đích                                                                                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | Khởi chạy `npm run dev` + chờ `localhost:20128` + khởi chạy Electron                                      |
| `npm run electron:build`          | Xây dựng Next.js rồi chạy `electron-builder` cho hệ điều hành hiện tại                                    |
| `npm run electron:build:win`      | Xây dựng trình cài đặt Windows NSIS + bản di động (x64)                                                   |
| `npm run electron:build:mac`      | Xây dựng DMG cho macOS (Intel + Apple Silicon)                                                            |
| `npm run electron:build:linux`    | Xây dựng AppImage + DEB cho Linux (x64 + arm64)                                                           |
| `npm run electron:smoke:packaged` | Khởi chạy tệp nhị phân đã đóng gói và kiểm tra `/login` có trả về HTTP 200 hay không, sau đó tắt ứng dụng |

Workspace `electron/` cũng cung cấp:

- `npm run prepare:bundle` — chạy `scripts/build/prepare-electron-standalone.mjs`
- `npm run build:mac-x64` / `build:mac-arm64` — các bản dựng macOS đơn kiến trúc
- `npm run pack` — bản dựng chỉ tạo thư mục để kiểm thử cục bộ (không có trình cài đặt)

## Bố cục thư mục

```
electron/
├── package.json              # Các dependency Electron + cấu hình electron-builder
├── main.js                   # Tiến trình chính (24 KB — xem chú thích bên dưới)
├── preload.js                # Cầu nối IPC contextBridge
├── types.d.ts                # Các kiểu AppInfo / ServerStatus / ElectronAPI
├── README.md                 # Ghi chú trong workspace
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # Đầu ra của electron-builder (được git bỏ qua)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # Chuẩn bị bundle .next/electron-standalone
└── dev/
    └── smoke-electron-packaged.mjs       # Kiểm thử nhanh sau khi build
```

Cả `main.js` và `preload.js` đều là **các tệp CommonJS `.js`**, không phải TypeScript. Các
khai báo kiểu phía renderer nằm trong `electron/types.d.ts`.

## Cầu nối IPC (`preload.js`)

Preload cung cấp một API nằm trong danh sách cho phép tại `window.electronAPI` bằng `contextBridge`
với `contextIsolation: true` và `nodeIntegration: false`.

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

Các phương thức được cung cấp:

| Lệnh gọi từ renderer                                              | Loại                      |
| ----------------------------------------------------------------- | ------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                    |
| `openExternal(url)`                                               | invoke                    |
| `getDataDir()`                                                    | invoke                    |
| `restartServer()`                                                 | invoke                    |
| `getAppVersion()`                                                 | invoke                    |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                    |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                      |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (trả về disposer) |

Các hàm hỗ trợ receive trả về một **hàm disposer** thay vì phụ thuộc vào
`removeAllListeners` — điều này ngăn listener tích tụ khi các component React
được mount lại.

## Vòng đời máy chủ

`main.js` khởi chạy trực tiếp bundle standalone của Next.js bằng runtime Node của Electron
để tránh tình trạng không khớp ABI của native module với Node hệ thống:

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

Các điểm nổi bật:

- `waitForServer()` thăm dò URL trong tối đa 30 giây trước khi hiển thị cửa sổ (không có màn hình trống khi khởi động nguội).
- `stdio: "pipe"` thu thập stdout/stderr; các cụm từ báo sẵn sàng (`Ready` / `listening`) phát `server-status: running` qua IPC.
- `before-quit` chờ tối đa 5 giây để SIGTERM kết thúc an toàn (WAL checkpoint), sau đó gửi SIGKILL.
- Trình chuyển đổi cổng trong khay hệ thống (`20128`, `3000`, `8080`) dừng và khởi động lại máy chủ, sau đó tải lại BrowserWindow.

## Khởi tạo bí mật không cần cấu hình

Trong lần khởi chạy đầu tiên, tiến trình chính tự động tạo và lưu trữ các bí mật còn thiếu:

| Bí mật                   | Nguồn                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                         |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (từ chối nếu đã tồn tại thông tin xác thực được mã hóa) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                         |

Được lưu vào `<DATA_DIR>/server.env`. `DATA_DIR` được phân giải thành:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` hoặc `~/.omniroute`
- macOS: `~/.omniroute`

## Cửa sổ & khay hệ thống

- `BrowserWindow`: 1400×900 (tối thiểu 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, các nút điều khiển cửa sổ tại `{ x: 16, y: 16 }`.
- Windows/Linux: thanh tiêu đề gốc của hệ điều hành.
- Nút đóng sẽ thu nhỏ xuống khay hệ thống; menu khay có **Mở OmniRoute**, **Mở bảng điều khiển** (trong trình duyệt bên ngoài), menu con **Cổng máy chủ**, **Kiểm tra bản cập nhật**, **Thoát**.

## Chính sách bảo mật nội dung

Được thiết lập qua `session.defaultSession.webRequest.onHeadersReceived`. Các chỉ thị đáng chú ý:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Chế độ phát triển chỉ thêm `'unsafe-eval'` vào `script-src`

## Tự động cập nhật

Sử dụng `electron-updater` với nhà cung cấp GitHub (`diegosouzapw/OmniRoute`).

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Các sự kiện được chuyển tiếp đến trình kết xuất qua IPC `update-status`:
  `checking`, `available`, `not-available`, `downloading` (kèm `percent`), `downloaded`, `error`
- `installUpdate()` dừng máy chủ rồi gọi `autoUpdater.quitAndInstall()`
- Bỏ qua trong chế độ phát triển (`!app.isPackaged`)

## Quy trình build

1. `npm run build` → bản standalone của Next.js trong `.next/standalone`.
2. `prepare-electron-standalone.mjs` → sắp xếp lại vào `.next/electron-standalone` và viết lại các đường dẫn tuyệt đối bên trong `server.js` + `required-server-files.json` để gói có thể được di chuyển.
3. `electron-builder` đóng gói `main.js`, `preload.js`, `node_modules` và `extraResources: { ../.next/electron-standalone → app }`.

### Mục tiêu build

| Hệ điều hành | Mục tiêu                                  |
| ------------ | ----------------------------------------- |
| Windows      | Trình cài đặt NSIS + bản portable (x64)   |
| macOS        | DMG (Intel + arm64, kéo vào Applications) |
| Linux        | AppImage + DEB (x64 + arm64)              |

Thiết lập NSIS: `oneClick: false`, cho phép người dùng chọn thư mục cài đặt, tạo lối tắt trên Desktop và trong menu Start.

## Kiểm thử nhanh bản build đã đóng gói

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Tự động tìm tệp thực thi đã đóng gói trong `electron/dist-electron/` cho nền tảng hiện tại.
- Khởi chạy với các thư mục `HOME`/`APPDATA`/`XDG_*` biệt lập để không tác động đến dữ liệu của nhà phát triển.
- Thăm dò `http://127.0.0.1:20128/login` để nhận phản hồi HTTP 200 trong vòng 45 giây.
- Theo dõi stderr/stdout để phát hiện các mẫu lỗi nghiêm trọng (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server`, v.v.).
- Chờ hệ thống chạy ổn định trong 2 giây sau khi sẵn sàng, sau đó gửi SIGTERM và chờ cổng được giải phóng.
- Trong CI, tự động truyền `--no-sandbox --disable-gpu` (và `--disable-dev-shm-usage` trên Linux).

Các biến môi trường ghi đè: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Ký mã

`electron/package.json` **không** cấu hình trực tiếp thông tin xác thực ký mã. Hãy truyền chúng qua các biến môi trường cho `electron-builder`:

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

Việc ký AppImage là tùy chọn — đặt `LINUX_GPG_KEY` nếu cần ký.

## Phân phối

Các tệp tạo phẩm được lưu trong `electron/dist-electron/`:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Các bản phát hành được đăng lên GitHub Releases (`diegosouzapw/OmniRoute`), đây cũng là nơi `electron-updater` kiểm tra các phiên bản mới.

## Khắc phục sự cố

| Triệu chứng                                                                     | Cách khắc phục                                                                                                                                                            |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Cannot find module 'better-sqlite3'` sau khi nâng phiên bản chính của Electron | better-sqlite3 v13 cung cấp các bản dựng sẵn Node-API — chạy lại `npm install` tại thư mục gốc và `prepare:bundle` (lệnh này xác minh bản dựng sẵn cho nền tảng hiện tại) |
| `ERR_DLOPEN_FAILED` đối với mô-đun gốc                                          | Chạy lại `prepare:bundle` — lệnh này sẽ dừng ngay khi thiếu bản dựng sẵn Node-API cho nền tảng hiện tại                                                                   |
| Cửa sổ hiển thị trống trên Linux                                                | Xác nhận máy chủ Next.js thực sự đã liên kết với PORT (kiểm tra nhật ký `[Server]`)                                                                                       |
| Quá trình công chứng macOS bị đình trệ                                          | Đảm bảo các biến `APPLE_*` đã được xuất, không chỉ được đặt trong `.env`                                                                                                  |
| Cảnh báo Windows SmartScreen                                                    | Ký bằng chứng thư EV hoặc người dùng nhấp chuột phải → "Vẫn chạy"                                                                                                         |
| Kiểm thử nhanh thất bại do cổng đang được sử dụng                               | Dừng mọi máy chủ phát triển cục bộ trên cổng 20128 trước khi chạy `electron:smoke:packaged`                                                                               |

## Xem thêm

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Mã nguồn: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Công cụ hỗ trợ: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
