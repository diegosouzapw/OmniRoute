# Electron Desktop Guide (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/ELECTRON_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/ELECTRON_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/ELECTRON_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/ELECTRON_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/ELECTRON_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/ELECTRON_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/ELECTRON_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/ELECTRON_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/ELECTRON_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/ELECTRON_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/ELECTRON_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/ELECTRON_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/ELECTRON_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/ELECTRON_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/ELECTRON_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/ELECTRON_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/ELECTRON_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/ELECTRON_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/ELECTRON_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/ELECTRON_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/ELECTRON_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/ELECTRON_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/ELECTRON_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/ELECTRON_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/ELECTRON_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/ELECTRON_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/ELECTRON_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/ELECTRON_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/ELECTRON_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/ELECTRON_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/ELECTRON_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/ELECTRON_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/ELECTRON_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/ELECTRON_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/ELECTRON_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/ELECTRON_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/ELECTRON_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/ELECTRON_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/ELECTRON_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/ELECTRON_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/ELECTRON_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/ELECTRON_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/ELECTRON_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/ELECTRON_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/ELECTRON_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/ELECTRON_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/ELECTRON_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/ELECTRON_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/ELECTRON_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/ELECTRON_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/ELECTRON_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/ELECTRON_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/ELECTRON_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/ELECTRON_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/ELECTRON_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/ELECTRON_GUIDE.md)

---

> **Doğruluk kaynağı:** `electron/` çalışma alanı
> **Son güncelleme:** 2026-06-28 — v3.8.40

OmniRoute, **Electron 41** + **electron-builder 26.10** üzerinde geliştirilmiş, platformlar arası bir masaüstü uygulamasıyla (Windows / macOS / Linux) birlikte sunulur. Masaüstü uygulaması, bağımsız Next.js sunucusunu bir alt süreç olarak başlatır, bir `BrowserWindow` örneğini bu sunucuya yönlendirir ve sistem tepsisi, otomatik güncelleyici, IPC köprüsü ve sıfır yapılandırmalı gizli değer önyüklemesi ekler.

## Mimari

```
┌──────────────────────────────────────────────┐
│ Electron ana süreci (electron/main.js)       │
│ ├─ Tek örnek kilidi                          │
│ ├─ Alt süreç: Bağımsız Next.js sunucusu      │
│ │   (Electron'ın Node çalışma zamanıyla      │
│ │   başlatılır)                              │
│ ├─ BrowserWindow → http://localhost:PORT     │
│ ├─ Sistem tepsisi + bağlam menüsü            │
│ ├─ electron-updater ile otomatik güncelleme  │
│ ├─ İçerik Güvenliği Politikası               │
│ │   (oturum üstbilgileri)                    │
│ └─ Gizli değer önyüklemesi                   │
│     (JWT / API_KEY_SECRET)                   │
└──────────────────────────────────────────────┘
          ↕ IPC köprüsü (electron/preload.js)
┌──────────────────────────────────────────────┐
│ İşleyici (Next.js panosu)                    │
│   window.electronAPI.* (contextIsolation)    │
└──────────────────────────────────────────────┘
```

## Sürümler

`electron/package.json` dosyasından doğrulanmıştır:

| Paket              | Sürüm                                                                            |
| ------------------ | -------------------------------------------------------------------------------- |
| `electron`         | `^43.4.1`                                                                        |
| `electron-builder` | `^26.15.3`                                                                       |
| `electron-updater` | `^6.8.9`                                                                         |
| `better-sqlite3`   | kök `^13.0.2` (Node-API ön derlemeleri — Electron için yeniden derleme gerekmez) |
| Uygulama sürümü    | `3.8.0`                                                                          |
| Uygulama kimliği   | `online.omniroute.desktop`                                                       |
| Ürün adı           | `OmniRoute`                                                                      |

## Betikler (kök `package.json`)

| Betik                             | Amaç                                                                                                                 |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `npm run electron:dev`            | `npm run dev` komutunu başlatır, `localhost:20128` için bekler ve Electron'ı başlatır                                |
| `npm run electron:build`          | Next.js'i derler, ardından geçerli işletim sistemi için `electron-builder` çalıştırır                                |
| `npm run electron:build:win`      | Windows NSIS yükleyicisini + taşınabilir sürümü (x64) derler                                                         |
| `npm run electron:build:mac`      | macOS DMG'yi (Intel + Apple Silicon) derler                                                                          |
| `npm run electron:build:linux`    | Linux AppImage + DEB paketlerini (x64 + arm64) derler                                                                |
| `npm run electron:smoke:packaged` | Paketlenmiş ikili dosyayı başlatır, HTTP 200 yanıtı için `/login` uç noktasını yoklar ve ardından uygulamayı kapatır |

`electron/` çalışma alanı ayrıca şunları sunar:

- `npm run prepare:bundle` — `scripts/build/prepare-electron-standalone.mjs` betiğini çalıştırır
- `npm run build:mac-x64` / `build:mac-arm64` — tek mimarili macOS derlemeleri
- `npm run pack` — yerel testler için yalnızca dizin oluşturan derleme (yükleyici yok)

## Dizin Yapısı

```
electron/
├── package.json              # Electron bağımlılıkları + electron-builder yapılandırması
├── main.js                   # Ana süreç (24 KB — aşağıdaki açıklamalara bakın)
├── preload.js                # contextBridge IPC köprüsü
├── types.d.ts                # AppInfo / ServerStatus / ElectronAPI türleri
├── README.md                 # Çalışma alanı içi notlar
├── assets/                   # icon.png, icon.ico, icon.icns, tray-icon.png
└── dist-electron/            # electron-builder çıktısı (git tarafından yok sayılır)

scripts/
├── build/
│   └── prepare-electron-standalone.mjs   # .next/electron-standalone paketini hazırlar
└── dev/
    └── smoke-electron-packaged.mjs       # Derleme sonrası duman testi
```

Hem `main.js` hem de `preload.js`, TypeScript değil, **CommonJS `.js` dosyalarıdır**.
İşleyici tarafı tür tanımları `electron/types.d.ts` içinde bulunur.

## IPC Köprüsü (`preload.js`)

Ön yükleme betiği, `contextIsolation: true` ve `nodeIntegration: false` ayarlarıyla
`contextBridge` kullanarak `window.electronAPI` üzerinde izin verilenler listesine alınmış bir API sunar.

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

Sunulan yöntemler:

| İşleyici çağrısı                                                  | Tür                            |
| ----------------------------------------------------------------- | ------------------------------ |
| `getAppInfo()` → `{ name, version, platform, isDev, port }`       | invoke                         |
| `openExternal(url)`                                               | invoke                         |
| `getDataDir()`                                                    | invoke                         |
| `restartServer()`                                                 | invoke                         |
| `getAppVersion()`                                                 | invoke                         |
| `checkForUpdates()` / `downloadUpdate()` / `installUpdate()`      | invoke                         |
| `minimizeWindow()` / `maximizeWindow()` / `closeWindow()`         | send                           |
| `onServerStatus(cb)` / `onPortChanged(cb)` / `onUpdateStatus(cb)` | receive (temizleyici döndürür) |

Alım yardımcıları, `removeAllListeners` işlevine dayanmak yerine bir **temizleyici işlev**
döndürür; bu, React bileşenleri yeniden bağlandığında dinleyicilerin birikmesini önler.

## Sunucu Yaşam Döngüsü

`main.js`, sistem Node'u ile yerel modül ABI uyuşmazlığını önlemek için Next.js
bağımsız paketini doğrudan Electron Node çalışma zamanı ile başlatır:

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

Öne çıkanlar:

- `waitForServer()`, pencereyi göstermeden önce URL'yi 30 saniyeye kadar yoklar (soğuk başlatmada boş ekran gösterilmez).
- `stdio: "pipe"`, stdout/stderr çıktısını yakalar; hazır olunduğunu belirten ifadeler (`Ready` / `listening`), IPC üzerinden `server-status: running` olayı yayar.
- `before-quit`, düzgün bir SIGTERM sonlandırması (WAL denetim noktası) için 5 saniyeye kadar bekler ve ardından SIGKILL gönderir.
- Tepsideki bağlantı noktası değiştirici (`20128`, `3000`, `8080`), sunucuyu durdurup yeniden başlatır ve ardından BrowserWindow'u yeniden yükler.

## Sıfır yapılandırmalı Gizli Değer Önyüklemesi

İlk başlatmada ana süreç, eksik gizli değerleri otomatik olarak oluşturur ve kalıcı hâle getirir:

| Gizli Değer              | Kaynak                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `JWT_SECRET`             | `crypto.randomBytes(64).toString("hex")`                                                               |
| `STORAGE_ENCRYPTION_KEY` | `crypto.randomBytes(32).toString("hex")` (şifrelenmiş kimlik bilgileri zaten mevcutsa işlemi reddeder) |
| `API_KEY_SECRET`         | `crypto.randomBytes(32).toString("hex")`                                                               |

`<DATA_DIR>/server.env` dosyasına kaydedilir. `DATA_DIR` şu şekilde çözümlenir:

- Windows: `%APPDATA%\omniroute`
- Linux: `$XDG_CONFIG_HOME/omniroute` veya `~/.omniroute`
- macOS: `~/.omniroute`

## Ortam dosyası arama sırası

Ana süreç, sunucuyu başlatmadan önce (`electron/main.js` içindeki `getPreferredEnvFilePath()`) aşağıdakilerden mevcut olan ilk **bir** `.env` dosyasını seçer.

1. Uygulamanın başlatıldığı ortamda `DATA_DIR` ayarlanmışsa `$DATA_DIR/.env`.
2. Yukarıdaki varsayılanlar kullanılarak `<resolved DATA_DIR>/.env`: Windows'ta `%APPDATA%\omniroute\.env`, Linux ve macOS'ta `$XDG_CONFIG_HOME/omniroute/.env` veya `~/.omniroute/.env`.
3. Sürecin çalışma dizinindeki `.env`.

Ana süreç yalnızca bu dosyayı okur; sonraki adaylar birleştirilmez. Ardından sunucu ortamı, aşağıdaki öncelik sırasına göre oluşturulur (en yüksek öncelikli önce):

1. Electron süreç ortamı (uygulamayı başlatan kaynaktan devralınan değişkenler).
2. Seçilen `.env` dosyası.
3. `<DATA_DIR>/server.env` (yukarıdaki önyükleme gizli değerleri).

Süreç ortamı, uygulama başlatıldığında yakalanır. Bu nedenle uygulama çalışırken ayarlanan bir sistem veya kullanıcı ortam değişkeni (penceresi kapatıldıktan sonra tepside beklediği süre dâhil), uygulama tamamen kapatılıp yeniden başlatılana kadar sunucuya ulaşmaz. `CONTEXT_LENGTH_<PROVIDER>` gibi çalışma zamanı ayarları için (bkz.
[Ortam Değişkenleri: Sağlayıcı başına bağlam uzunluğu](../reference/ENVIRONMENT.md#per-provider-context-length-context_length_provider)),
`.env` dosyasını tercih edin, ardından uygulamadan tamamen çıkın (tepsi, **Çıkış**) ve yeniden başlatın.

## Pencere ve Sistem Tepsisi

- `BrowserWindow`: 1400×900 (min. 1024×700), `backgroundColor: "#0a0a0a"`.
- macOS: `titleBarStyle: "hiddenInset"`, trafik ışığı düğmeleri `{ x: 16, y: 16 }` konumunda.
- Windows/Linux: yerel başlık çubuğu.
- Kapat düğmesi uygulamayı sistem tepsisine küçültür; tepsi menüsünde **OmniRoute'u Aç**, **Panoyu Aç** (harici tarayıcı), **Sunucu Bağlantı Noktası** alt menüsü, **Güncellemeleri Denetle** ve **Çıkış** seçenekleri bulunur.

## İçerik Güvenliği Politikası

`session.defaultSession.webRequest.onHeadersReceived` aracılığıyla ayarlanır. Dikkate değer yönergeler:

- `frame-ancestors 'none'`, `object-src 'none'`, `child-src 'none'`
- `connect-src 'self' http://localhost:* http://127.0.0.1:* ws://localhost:* ws://127.0.0.1:* https://*.omniroute.online https://*.omniroute.dev`
- Geliştirme modu yalnızca `script-src` yönergesine `'unsafe-eval'` ekler

## Otomatik güncelleme

GitHub sağlayıcısıyla (`diegosouzapw/OmniRoute`) `electron-updater` kullanır.

- `autoDownload = false`, `autoInstallOnAppQuit = true`
- Olaylar, `update-status` IPC üzerinden oluşturucu sürece iletilir:
  `checking`, `available`, `not-available`, `downloading` (`percent` ile), `downloaded`, `error`
- `installUpdate()`, sunucuyu sonlandırır ve ardından `autoUpdater.quitAndInstall()` çağrısını yapar
- Geliştirme modunda atlanır (`!app.isPackaged`)

## Derleme İşlem Hattı

1. `npm run build` → `.next/standalone` içinde bağımsız Next.js derlemesi oluşturur.
2. `prepare-electron-standalone.mjs` → dosyaları `.next/electron-standalone` içine yeniden yerleştirir ve paketin taşınabilir olması için `server.js` + `required-server-files.json` içindeki mutlak yolları yeniden yazar.
3. `electron-builder`, `main.js`, `preload.js`, `node_modules` ve `extraResources: { ../.next/electron-standalone → app }` öğelerini paketler.

### Derleme hedefleri

| İşletim Sistemi | Hedefler                                      |
| --------------- | --------------------------------------------- |
| Windows         | NSIS yükleyicisi + taşınabilir sürüm (x64)    |
| macOS           | DMG (Intel + arm64, Applications'a sürükleme) |
| Linux           | AppImage + DEB (x64 + arm64)                  |

NSIS ayarları: `oneClick: false`, kullanıcının yükleme dizinini seçmesine olanak tanır, Masaüstü ve Başlat Menüsü kısayolları oluşturur.

## Paketlenmiş Derlemenin Duman Testi

```bash
npm run electron:smoke:packaged
```

`scripts/dev/smoke-electron-packaged.mjs`:

- Geçerli platform için paketlenmiş ikili dosyayı `electron/dist-electron/` içinde otomatik olarak bulur.
- Geliştirici verilerine dokunmaması için yalıtılmış `HOME`/`APPDATA`/`XDG_*` dizinleriyle başlatır.
- 45 saniye içinde HTTP 200 yanıtı almak için `http://127.0.0.1:20128/login` adresini düzenli olarak yoklar.
- Ölümcül hata kalıpları (`Cannot find module`, `MODULE_NOT_FOUND`, `ERR_DLOPEN_FAILED`, `Failed to start server` vb.) için stderr/stdout çıktılarını izler.
- Hazır duruma geldikten sonra 2 saniyelik kararlı çalışma süresini bekler, ardından SIGTERM gönderir ve portun serbest kalmasını bekler.
- CI ortamında otomatik olarak `--no-sandbox --disable-gpu` (Linux'ta ayrıca `--disable-dev-shm-usage`) seçeneklerini iletir.

Ortam değişkeni geçersiz kılmaları: `ELECTRON_SMOKE_APP_EXECUTABLE`, `ELECTRON_SMOKE_URL`, `ELECTRON_SMOKE_TIMEOUT_MS`, `ELECTRON_SMOKE_SETTLE_MS`, `ELECTRON_SMOKE_DATA_DIR`, `ELECTRON_SMOKE_KEEP_DATA`, `ELECTRON_SMOKE_STREAM_LOGS`.

## Kod İmzalama

`electron/package.json`, imzalama kimlik bilgilerini **doğrudan** yapılandırmaz. Bunları ortam değişkenleri aracılığıyla `electron-builder`'a iletin:

### macOS

```bash
export APPLE_ID=<e-posta>
export APPLE_APP_SPECIFIC_PASSWORD=<parola>
export APPLE_TEAM_ID=<kimlik>
export CSC_LINK=path/to/cert.p12
export CSC_KEY_PASSWORD=<sertifika-parolası>
npm run electron:build:mac
```

### Windows

```bash
export CSC_LINK=path/to/cert.pfx
export CSC_KEY_PASSWORD=<sertifika-parolası>
npm run electron:build:win
```

### Linux

AppImage imzalama isteğe bağlıdır — imzalamak için `LINUX_GPG_KEY` değişkenini ayarlayın.

## Dağıtım

Derleme çıktıları `electron/dist-electron/` dizinine yerleştirilir:

- `OmniRoute.Setup.X.Y.Z.exe`, `OmniRoute X.Y.Z.exe` (Windows)
- `OmniRoute-X.Y.Z-mac.dmg`, `OmniRoute-X.Y.Z-arm64-mac.dmg` (macOS)
- `OmniRoute-X.Y.Z.AppImage`, `omniroute-desktop_X.Y.Z_amd64.deb` (Linux)

Sürümler GitHub Releases (`diegosouzapw/OmniRoute`) üzerinde yayımlanır; `electron-updater` da yeni sürümleri burada denetler.

## Sorun Giderme

| Belirti                                                                         | Çözüm                                                                                                                                                                                                        |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Electron ana sürümü yükseltildikten sonra `Cannot find module 'better-sqlite3'` | better-sqlite3 v13, Node-API için önceden derlenmiş dosyalar sunar — kök dizinde `npm install` ve `prepare:bundle` komutlarını yeniden çalıştırın (geçerli platform için önceden derlenmiş dosyayı doğrular) |
| Yerel modül için `ERR_DLOPEN_FAILED`                                            | `prepare:bundle` komutunu yeniden çalıştırın — geçerli platforma ait Node-API için önceden derlenmiş dosya eksik olduğunda hemen başarısız olur                                                              |
| Linux'ta pencere boş görünüyor                                                  | Next.js sunucusunun gerçekten PORT'a bağlandığını doğrulayın (`[Server]` günlüklerini kontrol edin)                                                                                                          |
| macOS noter tasdiki takılıyor                                                   | `APPLE_*` değişkenlerinin yalnızca `.env` içinde bulunmadığından, dışa aktarıldığından emin olun                                                                                                             |
| Windows SmartScreen uyarısı                                                     | EV sertifikasıyla imzalayın veya kullanıcıların sağ tıklayıp → "Yine de çalıştır" seçeneğini seçmesini sağlayın                                                                                              |
| Duman testi, port kullanımda olduğu için başarısız oluyor                       | `electron:smoke:packaged` komutunu çalıştırmadan önce 20128 portundaki tüm yerel geliştirme sunucularını durdurun                                                                                            |

## Ayrıca Bakınız

- [SETUP_GUIDE.md](./SETUP_GUIDE.md)
- [RELEASE_CHECKLIST.md](../ops/RELEASE_CHECKLIST.md)
- Kaynak: `electron/main.js`, `electron/preload.js`, `electron/package.json`
- Yardımcılar: `scripts/build/prepare-electron-standalone.mjs`, `scripts/dev/smoke-electron-packaged.mjs`
