# Electron Desktop Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Əsas mənbə:** `electron/` iş sahəsi
> **Son yenilənmə:** 2026-06-28 — v3.8.40

OmniRoute **Electron 41** + **electron-builder 26.10** əsasında qurulmuş, platformalararası masaüstü tətbiq (Windows / macOS / Linux) təqdim edir. Masaüstü tətbiq Next.js avtonom serverini alt proses kimi işə salır, `BrowserWindow` pəncərəsini ona yönəldir və sistem treyi, avtomatik yeniləyici, IPC körpüsü və konfiqurasiya tələb etməyən məxfi məlumatların ilkin hazırlanması funksiyasını əlavə edir.

## Arxitektura

```
┌───────────────────────────────────────────────────┐
│ Electron əsas prosesi (electron/main.js)          │
│ ├─ Tək nüsxə kilidi                               │
│ ├─ Alt proses: Next.js avtonom serveri            │
│ │   (Electron-un Node icra mühiti ilə başladılır) │
│ ├─ BrowserWindow → http://localhost:PORT          │
│ ├─ Sistem treyi + kontekst menyusu                 │
│ ├─ electron-updater vasitəsilə avtomatik yeniləmə │
│ ├─ Məzmun Təhlükəsizliyi Siyasəti (sessiya başlıqları) │
│ └─ Məxfi məlumatların ilkin hazırlanması (JWT / API_KEY_SECRET) │
└───────────────────────────────────────────────────┘
            ↕ IPC körpüsü (electron/preload.js)
┌───────────────────────────────────────────────────┐
│ Render prosesi (Next.js idarəetmə paneli)         │
│   window.electronAPI.* (contextIsolation)          │
└───────────────────────────────────────────────────┘
```

## Versiyalar

`electron/package.json` faylından təsdiqlənib:

| Paket              | Versiya                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                                      |
| `electron-builder` | `^26.15.3`                                                                                     |
| `electron-updater` | `^6.8.9`                                                                                       |
| `better-sqlite3`   | kök `^13.0.2` (Node-API üçün əvvəlcədən yığılmış fayllar — Electron üçün yenidən yığma yoxdur) |
| Tətbiq versiyası   | `3.8.0`                                                                                        |
| Tətbiq ID-si       | `online.omniroute.desktop`                                                                     |
| Məhsul adı         | `OmniRoute`                                                                                    |

## Skriptlər (kök `package.json`)

| Skript                            | Məqsəd                                                                                                   |
| --------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` əmrini başladır + `localhost:20128` üçün gözləyir + Electron-u işə salır                   |
| `npm run electron:build`          | Next.js-i yığır, sonra cari ƏS üçün `electron-builder` əmrini icra edir                                  |
| `npm run electron:build:win`      | Windows NSIS quraşdırıcısını + portativ versiyanı (x64) yığır                                            |
| `npm run electron:build:mac`      | macOS DMG faylını (Intel + Apple Silicon) yığır                                                          |
| `npm run electron:build:linux`    | Linux AppImage + DEB paketlərini (x64 + arm64) yığır                                                     |
| `npm run electron:smoke:packaged` | Paketlənmiş icra faylını başladır və `/login` ünvanında HTTP 200 cavabını yoxlayır, sonra onu dayandırır |

`electron/` iş sahəsi həmçinin aşağıdakıları təqdim edir:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` skriptini icra edir
- `npm run build:mac-x64` / `build:mac-arm64` — tək arxitekturalı macOS yığımları
- `npm run pack` — lokal sınaq üçün yalnız qovluq yığımı (quraşdırıcı olmadan)

## Kataloq Strukturu

```
electron/
├── package.json              # Electron asılılıqları + electron-builder konfiqurasiyası
├── main.js                   # Əsas proses (24 KB — aşağıdakı qeydlərə baxın)
├── preload.js                # contextBridge IPC körpüsü
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI tipləri
├── README.md                 # İş sahəsi daxilində qeydlər
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder çıxışı (git tərəfindən nəzərə alınmır)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone paketini hazırlayır
└── dev/
    └── smoke-electron-packaged.mjs       # Yığmadan sonrakı tüstü testi
```

Həm `main.js`, həm də `preload.js` **TypeScript deyil, CommonJS `.js` fayllarıdır**.
Renderer tərəfinin tip təyinləri `electron/types.d.ts` faylında yerləşir.

## IPC Körpüsü (`preload.js`)

Preload, `contextIsolation: true` və `nodeIntegration: false` parametrləri ilə
`contextBridge` istifadə edərək `window.electronAPI` üzərindən icazə verilmiş API təqdim edir.

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

Təqdim edilən metodlar:

| Renderer çağırışı                                                 | Tip                          |
| ----------------------------------------------------------------- | ---------------------------- |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                       |
| `openExternal(url)`                                               | invoke                       |
| `getDataDir()`                                                    | invoke                       |
| `restartServer()`                                                 | invoke                       |
| `getAppVersion()`                                                 | invoke                       |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                       |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                         |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (ləğvedici qaytarır) |

Qəbul köməkçiləri `removeAllListeners`-ə güvənmək əvəzinə **ləğvedici funksiya**
qaytarır — bu, React komponentləri yenidən quraşdırıldıqda dinləyicilərin
toplanmasının qarşısını alır.

## Serverin Həyat Dövrü

`main.js`, sistem Node-u ilə yerli modul ABI uyğunsuzluğunun qarşısını almaq üçün
Next.js müstəqil paketini birbaşa Electron Node icra mühitində işə salır:

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

Əsas məqamlar:

- `waitForServer()` pəncərəni göstərməzdən əvvəl URL-i 30 saniyəyədək sorğulayır (soyuq başlanğıc zamanı boş ekran olmur).
- `stdio: "pipe"` stdout/stderr çıxışını tutur; hazırlıq ifadələri (`Ready` / `listening`) IPC vasitəsilə `server-status: running` göndərir.
- `before-quit` təhlükəsiz SIGTERM (WAL yoxlama nöqtəsi) üçün 5 saniyəyədək gözləyir, sonra SIGKILL göndərir.
- Sistem treyindəki port dəyişdiricisi (`20128`, `3000`, `8080`) serveri dayandırıb yenidən başladır, sonra BrowserWindow-u yenidən yükləyir.

## Sıfır konfiqurasiyalı məxfi məlumatların ilkin yaradılması

İlk işə salınma zamanı əsas proses çatışmayan məxfi məlumatları avtomatik yaradır və yadda saxlayır:

| Məxfi məlumat            | Mənbə                                                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                             |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (şifrələnmiş giriş məlumatları artıq mövcuddursa, əməliyyatdan imtina edir) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                             |

`<DATA_DIR>/server.env` faylında saxlanılır. `DATA_DIR` aşağıdakı kimi müəyyən edilir:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` və ya `~/.omniroute`
- macOS: `~/.omniroute`

## Pəncərə və sistem paneli

- `BrowserWindow`: 1400×900 (minimum 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, idarəetmə düymələri `{ x: 16, y: 16 }` mövqeyində.
- Windows/Linux: standart başlıq paneli.
- Bağlama düyməsi tətbiqi sistem panelinə kiçildir; sistem paneli menyusunda **OmniRoute-u aç**, **İdarəetmə panelini aç** (xarici brauzerdə), **Server portu** alt menyusu, **Yeniləmələri yoxla**, **Çıx** seçimləri var.

## Məzmun Təhlükəsizliyi Siyasəti

`session.defaultSession.webRequest.onHeadersReceived` vasitəsilə təyin edilir. Diqqətəlayiq direktivlər:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- İnkişaf rejimi yalnız `script-src` direktivinə `'unsafe-eval'` əlavə edir

## Avtomatik yeniləmə

GitHub provayderi (`diegosouzapw/OmniRoute`) ilə `electron-updater` istifadə edir.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Hadisələr `update-status` IPC vasitəsilə render prosesinə ötürülür:
  `checking`, `available`, `not-available`, `downloading` (`percent` ilə), `downloaded`, `error`
- `installUpdate()` serveri dayandırır, sonra `autoUpdater.quitAndInstall()` çağırır
- İnkişaf rejimində (`!app.isPackaged`) ötürülür

## Yığma prosesi

1. `npm run build` → `.next/standalone` daxilində Next.js müstəqil yığması.
2. `prepare-electron-standalone.mjs` → faylları yenidən `.next/electron-standalone` daxilində yerləşdirir və paket köçürülə bilən olsun deyə `server.js` + `required-server-files.json` daxilindəki mütləq yolları yenidən yazır.
3. `electron-builder` `main.js`, `preload.js`, `node_modules` və `extraResources: { ../.next/electron-standalone → app }` resurslarını paketləyir.

### Yığma hədəfləri

| ƏS      | Hədəflər                                                       |
| ------- | -------------------------------------------------------------- |
| Windows | NSIS quraşdırıcısı + portativ (x64)                            |
| macOS   | DMG (Intel + arm64, Applications qovluğuna sürükləyib buraxma) |
| Linux   | AppImage + DEB (x64 + arm64)                                   |

NSIS parametrləri: `oneClick: false`, istifadəçiyə quraşdırma qovluğunu seçməyə imkan verir, İş masası və Başlat menyusu qısayolları yaradır.

## Paketlənmiş yığmanın tüstü testi

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Cari platforma üçün paketlənmiş icra faylını `electron/dist-electron/` daxilində avtomatik aşkar edir.
- Tərtibatçı məlumatlarına toxunmamaq üçün təcrid olunmuş `HOME`/`APPDATA`/`XDG_*` qovluqları ilə işə salır.
- 45 saniyə ərzində HTTP 200 cavabı üçün `http://127.0.0.1:20128/login` ünvanını müntəzəm yoxlayır.
- Kritik xəta nümunələri (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` və s.) üçün stderr/stdout çıxışlarını izləyir.
- Hazır olduqdan sonra 2 saniyə sabit işləməni gözləyir, sonra SIGTERM göndərir və portun boşalmasını gözləyir.
- CI mühitində avtomatik olaraq `--no-sandbox --disable-gpu` (Linux-da həmçinin `--disable-dev-shm-usage`) ötürür.

Mühit dəyişəni ilə əvəzləmələr: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kodun İmzalanması

`electron/package.json` imzalama məlumatlarını **birbaşa** qoşmur. Onları mühit dəyişənləri vasitəsilə `electron-builder`-ə ötürün:

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

AppImage imzalanması ixtiyaridir — imzalama üçün `LINUX_GPG_KEY` təyin edin.

## Paylanma

Artefaktlar `electron/dist-electron/` qovluğunda yerləşdirilir:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Relizlər GitHub Releases-də (`diegosouzapw/OmniRoute`) yayımlanır; `electron-updater` də yeni versiyaları burada yoxlayır.

## Problemlərin Aradan Qaldırılması

| Əlamət                                                                               | Həll                                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron-un əsas versiyası yeniləndikdən sonra `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 Node-API üçün əvvəlcədən yığılmış fayllarla təmin edilir — kök qovluqda `npm install` və `prepare:bundle` əmrlərini yenidən işə salın (bu, cari platforma üçün əvvəlcədən yığılmış faylı yoxlayır) |
| Yerli modul üçün `ERR_DLOPEN_FAILED`                                                 | `prepare:bundle` əmrini yenidən işə salın — cari platforma üçün Node-API əvvəlcədən yığılmış faylı olmadıqda proses dərhal xəta ilə dayandırılır                                                                      |
| Linux-da pəncərə boş görünür                                                         | Next.js serverinin həqiqətən PORT-a bağlandığını təsdiqləyin (`[Server]` jurnallarını yoxlayın)                                                                                                                       |
| macOS notarial təsdiqi dayanır                                                       | `APPLE_*` dəyişənlərinin yalnız `.env` daxilində olmadığından, həm də ixrac edildiyindən əmin olun                                                                                                                    |
| Windows SmartScreen xəbərdarlığı                                                     | EV sertifikatı ilə imzalayın və ya istifadəçilər sağ klikləyib → "Yenə də işə sal" seçsinlər                                                                                                                          |
| Tüstü testi portun istifadədə olması səbəbindən uğursuz olur                         | `electron:smoke:packaged` əmrini işə salmazdan əvvəl 20128 portundakı bütün lokal işləmə serverlərini dayandırın                                                                                                      |

## Həmçinin Baxın

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Mənbə: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Köməkçi skriptlər: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
