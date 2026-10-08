# Electron Desktop Guide (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Həqiqət mənbəyi:** `electron/` iş sahəsi
> **Son yenilənmə:** 2026-06-28 — v3.8.40

OmniRoute **Electron 41** + **electron-builder 26.10** əsasında qurulmuş platformalararası masaüstü tətbiqi (Windows / macOS / Linux) ilə təqdim olunur. Masaüstü tətbiqi Next.js müstəqil serverini alt proses kimi işə salır, `BrowserWindow` pəncərəsini ona yönəldir və sistem treyi, avtomatik yeniləyici, IPC körpüsü və konfiqurasiya tələb etməyən məxfi məlumatların ilkin quraşdırılmasını əlavə edir.

## Arxitektura

```
┌─────────────────────────────────────────────────────┐
│ Electron əsas prosesi (electron/main.js)            │
│ ├─ Tək nüsxə kilidi                                 │
│ ├─ Alt proses: Next.js müstəqil serveri             │
│ │   (Electron-un Node icra mühiti ilə başladılır)   │
│ ├─ BrowserWindow → http://localhost:PORT            │
│ ├─ Sistem treyi + kontekst menyusu                  │
│ ├─ electron-updater vasitəsilə avtomatik yeniləmə   │
│ ├─ Məzmun Təhlükəsizliyi Siyasəti (sessiya başlıqları) │
│ └─ Məxfi məlumatların ilkin quraşdırılması (JWT / API_KEY_SECRET) │
└─────────────────────────────────────────────────────┘
            ↕ IPC körpüsü (electron/preload.js)
┌─────────────────────────────────────────────────────┐
│ Render prosesi (Next.js idarəetmə paneli)           │
│   window.electronAPI.* (contextIsolation)            │
└─────────────────────────────────────────────────────┘
```

## Versiyalar

`electron/package.json` faylından təsdiqlənib:

| Paket              | Versiya                                                                                         |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                                       |
| `electron-builder` | `^26.15.3`                                                                                      |
| `electron-updater` | `^6.8.9`                                                                                        |
| `better-sqlite3`   | kök `^13.0.2` (Node-API öncədən yığılmış paketləri — Electron üçün yenidən yığma tələb olunmur) |
| Tətbiq versiyası   | `3.8.0`                                                                                         |
| Tətbiq ID-si       | `online.omniroute.desktop`                                                                      |
| Məhsul adı         | `OmniRoute`                                                                                     |

## Skriptlər (kök `package.json`)

| Skript                            | Məqsəd                                                                                             |
| --------------------------------- | -------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` əmrini başladır, `localhost:20128` üçün gözləyir və Electron-u işə salır             |
| `npm run electron:build`          | Next.js-i yığır, sonra cari ƏS üçün `electron-builder` işlədir                                     |
| `npm run electron:build:win`      | Windows NSIS quraşdırıcısını + portativ versiyanı (x64) yığır                                      |
| `npm run electron:build:mac`      | macOS DMG-ni (Intel + Apple Silicon) yığır                                                         |
| `npm run electron:build:linux`    | Linux AppImage + DEB paketlərini (x64 + arm64) yığır                                               |
| `npm run electron:smoke:packaged` | Paketlənmiş binar faylı işə salır, `/login` ünvanında HTTP 200 cavabını yoxlayır, sonra dayandırır |

`electron/` iş sahəsi həmçinin aşağıdakıları təqdim edir:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` skriptini işlədir
- `npm run build:mac-x64` / `build:mac-arm64` — tək arxitekturalı macOS yığımları
- `npm run pack` — lokal sınaq üçün yalnız qovluq şəklində yığım (quraşdırıcı olmadan)

## Qovluq strukturu

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

Həm `main.js`, həm də `preload.js` TypeScript deyil, **CommonJS `.js` fayllarıdır**.
Renderer tərəfinin tip təyinləri `electron/types.d.ts` faylında yerləşir.

## IPC körpüsü (`preload.js`)

Preload `contextIsolation: true` və `nodeIntegration: false` ilə `contextBridge`
vasitəsilə `window.electronAPI` üzərində icazə siyahısına salınmış API təqdim edir.

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

| Renderer çağırışı                                                 | Tip                            |
| ----------------------------------------------------------------- | ------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                         |
| `openExternal(url)`                                               | invoke                         |
| `getDataDir()`                                                    | invoke                         |
| `restartServer()`                                                 | invoke                         |
| `getAppVersion()`                                                 | invoke                         |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                         |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                           |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (təmizləyici qaytarır) |

Qəbul köməkçiləri `removeAllListeners` funksiyasına arxalanmaq əvəzinə **təmizləyici funksiya**
qaytarır — bu, React komponentləri yenidən quraşdırıldıqda dinləyicilərin yığılmasının
qarşısını alır.

## Serverin həyat dövrü

`main.js` sistem Node mühiti ilə yerli modulların ABI uyğunsuzluğundan qaçmaq üçün
Next.js müstəqil paketini birbaşa Electron Node icra mühiti ilə işə salır:

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

- `waitForServer()` pəncərəni göstərməzdən əvvəl URL-i 30 saniyəyədək sorğulayır (soyuq başlanğıc zamanı boş ekran göstərilmir).
- `stdio: "pipe"` stdout/stderr çıxışlarını tutur; hazırlıq ifadələri (`Ready` / `listening`) IPC üzərindən `server-status: running` hadisəsini göndərir.
- `before-quit` nəzakətli SIGTERM dayandırılması (WAL nəzarət nöqtəsi) üçün 5 saniyəyədək gözləyir, sonra SIGKILL göndərir.
- Sistem treyindəki port dəyişdiricisi (`20128`, `3000`, `8080`) serveri dayandırıb yenidən işə salır, sonra BrowserWindow pəncərəsini yenidən yükləyir.

## Sıfır konfiqurasiya ilə məxfi dəyərlərin ilkin yaradılması

İlk işəsalmada əsas proses çatışmayan məxfi dəyərləri avtomatik yaradır və yadda saxlayır:

| Məxfi dəyər              | Mənbə                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                                |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (şifrələnmiş giriş məlumatları artıq mövcuddursa, imtina edir) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                                |

`<DATA_DIR>/server.env` faylında saxlanılır. `DATA_DIR` aşağıdakı kimi müəyyən edilir:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` və ya `~/.omniroute`
- macOS: `~/.omniroute`

## Mühit faylının axtarışı

Serveri işə salmazdan əvvəl əsas proses (`electron/main.js` daxilindəki `getPreferredEnvFilePath()`) mövcud olan aşağıdakı fayllardan birincisini — **bir** `.env` faylını seçir.

1. Tətbiqin işə salındığı mühitdə `DATA_DIR` təyin edildikdə, `$DATA_DIR/.env`.
2. Yuxarıdakı eyni standart dəyərlərdən istifadə etməklə `<resolved DATA_DIR>/.env`: Windows-da
   `%APPDATA%\omniroute\.env`, Linux və macOS-da `$XDG_CONFIG_HOME/omniroute/.env` və ya `~/.omniroute/.env`.
3. Prosesin iş qovluğundakı `.env`.

Əsas proses yalnız həmin faylı oxuyur; sonrakı namizəd faylların məzmunu birləşdirilmir. Daha sonra server
mühiti aşağıdakı üstünlük sırası ilə yaradılır (ən yüksək üstünlükdən başlayaraq):

1. Electron prosesinin mühiti (tətbiqi işə salan prosesdən miras alınmış dəyişənlər).
2. Seçilmiş `.env` faylı.
3. `<DATA_DIR>/server.env` (yuxarıdakı ilkin məxfi dəyərlər).

Proses mühiti tətbiq işə salınarkən qeydə alınır. Buna görə tətbiq işlədiyi müddətdə (o cümlədən pəncərəsi
bağlandıqdan sonra sistem panelində qaldığı zaman) təyin edilən sistem və ya istifadəçi mühit dəyişəni,
tətbiq tamamilə bağlanıb yenidən işə salınana qədər serverə ötürülmür. `CONTEXT_LENGTH_<PROVIDER>` kimi
icra vaxtı parametrləri üçün (baxın:
[Mühit dəyişənləri: Provayder üzrə kontekst uzunluğu](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider))
`.env` faylına üstünlük verin, sonra tətbiqi tamamilə bağlayın (sistem panelində **Çıxış**) və yenidən işə salın.

## Pəncərə və sistem paneli

- `BrowserWindow`: 1400×900 (minimum 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, idarəetmə düymələri `{ x: 16, y: 16 }` mövqeyində.
- Windows/Linux: sistemin standart başlıq paneli.
- Bağlama düyməsi tətbiqi sistem panelinə kiçildir; sistem paneli menyusunda **OmniRoute-u aç**, **İdarəetmə panelini aç** (xarici brauzerdə), **Server portu** alt menyusu, **Yeniləmələri yoxla**, **Çıxış** seçimləri var.

## Məzmun Təhlükəsizliyi Siyasəti

`session.defaultSession.webRequest.onHeadersReceived` vasitəsilə təyin edilir. Diqqətəlayiq direktivlər:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Tərtibatçı rejimi yalnız `script-src` direktivinə `'unsafe-eval'` əlavə edir

## Avtomatik yeniləmə

GitHub provayderi (`diegosouzapw/OmniRoute`) ilə `electron-updater` istifadə edir.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Hadisələr `update-status` IPC vasitəsilə renderer prosesinə ötürülür:
  `checking`, `available`, `not-available`, `downloading` (`percent` ilə), `downloaded`, `error`
- `installUpdate()` serveri dayandırır, sonra `autoUpdater.quitAndInstall()` çağırır
- Tərtibatçı rejimində ötürülür (`!app.isPackaged`)

## Yığma Konveyeri

1. `npm run build` → `.next/standalone` daxilində Next.js standalone yığımı.
2. `prepare-electron-standalone.mjs` → faylları yenidən `.next/electron-standalone` daxilında yerləşdirir və paketin başqa yerə köçürülə bilməsi üçün `server.js` + `required-server-files.json` daxilindəki mütləq yolları yenidən yazır.
3. `electron-builder`, `main.js`, `preload.js`, `node_modules` və `extraResources: { ../.next/electron-standalone → app }` resurslarını paketləyir.

### Yığma hədəfləri

| ƏS      | Hədəflər                                              |
| ------- | ----------------------------------------------------- |
| Windows | NSIS quraşdırıcısı + portativ (x64)                   |
| macOS   | DMG (Intel + arm64, Applications qovluğuna sürükləmə) |
| Linux   | AppImage + DEB (x64 + arm64)                          |

NSIS parametrləri: `oneClick: false`, istifadəçiyə quraşdırma kataloqunu seçməyə imkan verir, İş masası və Başlat menyusu qısayolları yaradır.

## Paketlənmiş Yığımın Tüstü Testi

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Cari platforma üçün paketlənmiş icra faylını `electron/dist-electron/` daxilində avtomatik aşkarlayır.
- Tərtibatçı məlumatlarına toxunmamaq üçün izolyasiya edilmiş `HOME`/`APPDATA`/`XDG_*` kataloqları ilə işə salır.
- 45 saniyə ərzində HTTP 200 cavabı üçün `http://127.0.0.1:20128/login` ünvanını dövri olaraq yoxlayır.
- Fatal nümunələri (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` və s.) aşkarlamaq üçün stderr/stdout çıxışlarını izləyir.
- Hazır olduqdan sonra 2 saniyə stabil işləməsini gözləyir, ardınca SIGTERM göndərir və portun boşalmasını gözləyir.
- CI mühitində avtomatik olaraq `--no-sandbox --disable-gpu` (Linux-da həmçinin `--disable-dev-shm-usage`) ötürür.

Mühit dəyişəni ilə əvəzləmələr: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kodun İmzalanması

`electron/package.json` imzalama məlumatlarını birbaşa əlaqələndirmir. Onları mühit dəyişənləri vasitəsilə `electron-builder`-ə ötürün:

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

AppImage imzalanması istəyə bağlıdır — imzalama üçün `LINUX_GPG_KEY` təyin edin.

## Paylanma

Artefaktlar `electron/dist-electron/` daxilında yerləşdirilir:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Buraxılışlar GitHub Releases (`diegosouzapw/OmniRoute`) bölməsində dərc olunur; `electron-updater` də yeni versiyaları burada yoxlayır.

## Problemlərin Aradan Qaldırılması

| Əlamət                                                                               | Həll                                                                                                                                                                                                                 |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Electron-un əsas versiyası yeniləndikdən sonra `Cannot find module 'better-sqlite3'` | better-sqlite3 v13 Node-API əvvəlcədən yığılmış faylları ilə təqdim olunur — kök kataloqda `npm install` və `prepare:bundle` əmrlərini yenidən icra edin (o, cari platforma üçün əvvəlcədən yığılmış faylı yoxlayır) |
| Yerli modul üçün `ERR_DLOPEN_FAILED`                                                 | `prepare:bundle` əmrini yenidən icra edin — cari platforma üçün Node-API əvvəlcədən yığılmış faylı olmadıqda dərhal xəta ilə dayanır                                                                                 |
| Linux-da pəncərə boş görünür                                                         | Next.js serverinin həqiqətən PORT-a bağlandığını təsdiqləyin (`[Server]` jurnallarını yoxlayın)                                                                                                                      |
| macOS notarial təsdiqi dayanır                                                       | `APPLE_*` dəyişənlərinin yalnız `.env` daxilində olmadığından, ixrac edildiyindən əmin olun                                                                                                                          |
| Windows SmartScreen xəbərdarlığı                                                     | EV sertifikatı ilə imzalayın və ya istifadəçilər sağ klikləyib → "İstənilən halda işə sal" seçsinlər                                                                                                                 |
| Tüstü testi portun istifadədə olması səbəbindən uğursuz olur                         | `electron:smoke:packaged` əmrini icra etməzdən əvvəl 20128 portundakı bütün lokal tərtibat serverlərini dayandırın                                                                                                   |

## Həmçinin baxın

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Mənbə: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Köməkçi skriptlər: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
