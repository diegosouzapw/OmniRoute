# Plugin Marketplace (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Sumber acuan:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, dan
> `src/app/(dashboard)/dashboard/plugins/`
> **Terakhir diperbarui:** 2026-06-28 — v3.8.40

OmniRoute menyediakan sistem plugin bergaya WordPress. Plugin merupakan direktori
mandiri — masing-masing dengan manifes `plugin.json` dan sebuah file entri — yang terhubung
ke pipeline permintaan (`onRequest` / `onResponse` / `onError`) serta ke
peristiwa siklus hidup (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Marketplace Plugin** merupakan lapisan penemuan di atas sistem tersebut. Lapisan ini
menyediakan katalog plugin yang dapat dipasang dan ditelusuri. Secara default, katalog
tersebut berupa registri seed bawaan berukuran kecil; operator dapat mengarahkannya ke URL
registri jarak jauh khusus. Dalam hal ini, pengambilan data diperkuat dengan perlindungan SSRF
yang melakukan resolusi DNS (lihat [Keamanan](#security)).

Setiap rute plugin **hanya dapat diakses melalui loopback** (Tingkat 1 — `LOCAL_ONLY`): plugin memuat
dan mengeksekusi kode dalam proses anak, sehingga rute tersebut tidak dapat dijangkau dari
origin non-loopback, terlepas dari autentikasi. Lihat
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Cara Kerjanya

```
Dasbor (/dashboard/plugins)
  ├─ Tab "Terpasang"    → GET /api/plugins            (listPlugins)
  │                       POST /api/plugins/scan      (pluginManager.scan)
  │                       POST /api/plugins/{name}/activate|deactivate
  │                       DELETE /api/plugins/{name}   (hapus instalasi)
  └─ Tab "Marketplace" → GET /api/plugins/marketplace
                          → listMarketplacePlugins()
                            ├─ tanpa URL khusus → SEED_REGISTRY bawaan
                            └─ URL khusus → perlindungan SSRF isSafeMarketplaceUrl()
                                          → safeOutboundFetch(guard:"public-only")
```

- **Lapisan registri** — `src/lib/plugins/marketplace.ts`: menampilkan / mencari
  katalog, dengan kembali menggunakan registri seed apabila terjadi kegagalan.
- **Lapisan siklus hidup** — `src/lib/plugins/manager.ts` (singleton `pluginManager`):
  memasang, meningkatkan versi, mengaktifkan, menonaktifkan, menghapus instalasi, memindai, dan memuat saat startup.
- **Lapisan manifes** — `src/lib/plugins/manifest.ts`: skema Zod + nilai default untuk
  `plugin.json`.
- **Pemindai** — `src/lib/plugins/scanner.ts`: menemukan plugin pada disk di bawah
  direktori plugin.
- **Pemuat** — `src/lib/plugins/loader.ts`: menjalankan setiap plugin dalam
  proses anak yang terisolasi dan memperantarai pemanggilan hook melalui IPC.

## Katalog Marketplace

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) mengembalikan daftar
objek `MarketplaceEntry`:

| Bidang        | Tipe     | Keterangan                                  |
| ------------- | -------- | ------------------------------------------- |
| `name`        | string   | Nama plugin dalam kebab-case                |
| `version`     | string   | semver                                      |
| `description` | string   | Ringkasan singkat                           |
| `author`      | string   | Penulis / organisasi                        |
| `license`     | string   | ID lisensi bergaya SPDX                     |
| `downloadUrl` | string   | URL unduhan sumber (boleh kosong)           |
| `repository`  | string?  | URL repositori opsional                     |
| `tags`        | string[] | Tag pencarian/filter                        |
| `downloads`   | number   | Jumlah unduhan                              |
| `rating`      | number   | 0–5                                         |
| `verified`    | boolean  | Apakah entri ditandai sebagai terverifikasi |
| `lastUpdated` | string   | String tanggal menyerupai format ISO        |

Jika tidak ada URL registri khusus yang dikonfigurasi, katalog menggunakan
`SEED_REGISTRY` bawaan (saat ini `request-logger`, `rate-limiter`, `cost-tracker`, dan
`theme-manager`). Registri seed selalu tersedia — jika registri jarak jauh yang
dikonfigurasi tidak dapat dijangkau, mengembalikan status selain `200`, atau mengembalikan
isi yang tidak dikenali, `listMarketplacePlugins()` mencatat peringatan dan kembali
menggunakan daftar seed.

> Catatan: **katalog** marketplace (penelusuran/pencarian) telah terhubung secara menyeluruh, tetapi
> **pemasangan** sekali klik dari katalog marketplace belum diimplementasikan — tombol
> "Pasang" pada entri marketplace di dasbor saat ini menampilkan pemberitahuan
> "segera hadir". Saat ini, pemasangan dilakukan melalui alur pemasangan dari jalur lokal
> (`POST /api/plugins`) dan penemuan pada disk (`POST /api/plugins/scan`).

## REST API

Semua endpoint memerlukan autentikasi manajemen (`requireManagementAuth`) **dan**
hanya dapat diakses melalui loopback — `/api/plugins` dan `/api/plugins/` tercantum
dalam `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Endpoint                         | Metode | Deskripsi                                                           |
| -------------------------------- | ------ | ------------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Mencantumkan plugin yang terinstal (filter `?status=` opsional)     |
| `/api/plugins`                   | POST   | Menginstal plugin dari path lokal absolut                           |
| `/api/plugins/scan`              | POST   | Memindai direktori plugin dan mendaftarkan plugin baru              |
| `/api/plugins/marketplace`       | GET    | Mencantumkan entri katalog marketplace                              |
| `/api/plugins/[name]`            | GET    | Mendapatkan detail plugin yang terinstal                            |
| `/api/plugins/[name]`            | DELETE | Menghapus instalasi plugin                                          |
| `/api/plugins/[name]/activate`   | POST   | Mengaktifkan (memuat + mendaftarkan hook)                           |
| `/api/plugins/[name]/deactivate` | POST   | Menonaktifkan (memicu `onDeactivate`, membatalkan pendaftaran hook) |
| `/api/plugins/[name]/config`     | GET    | Mendapatkan konfigurasi plugin + skema konfigurasi                  |
| `/api/plugins/[name]/config`     | PUT    | Memperbarui konfigurasi plugin (divalidasi terhadap skema)          |

Filter `status` untuk `GET /api/plugins` menerima salah satu dari
`installed` / `active` / `inactive` / `error`. Nilai yang tidak valid akan menghasilkan `400`.

### Mencantumkan plugin yang terinstal

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Menginstal dari path lokal

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` harus **absolut** dan tidak boleh berisi segmen traversal `..` atau
byte null (diberlakukan oleh Zod). Direktori sumber harus berisi
`plugin.json` yang valid (atau merupakan induk dari direktori yang memuatnya). Jika berhasil, responsnya adalah `201` dengan
baris plugin yang terinstal.

### Menjelajahi marketplace

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Memperbarui konfigurasi plugin

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` memvalidasi setiap nilai yang diberikan terhadap
`configSchema` plugin (dideklarasikan dalam manifes): bidang `number` mematuhi `min`/`max`,
bidang `select` harus cocok dengan `enum` yang dideklarasikan. Kunci yang tidak ada dalam skema
tetap diizinkan.

## Konfigurasi

### Direktori plugin

Plugin berada di bawah direktori data OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (atau apa pun yang dirujuk oleh manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) menentukan direktori tersebut dalam
tiga langkah:

1. **`OMNIROUTE_PLUGINS_DIR`**, jika ditetapkan — digunakan apa adanya, terlepas dari nilai `HOME`. Ini adalah
   pengaturan eksplisit untuk Docker/K8s, tempat struktur direktori plugin di-bind-mount pada suatu path
   yang biasanya tidak berkaitan dengan direktori home kontainer (#11827).
2. `<home>/.omniroute/plugins`, dengan `<home>` berasal dari variabel lingkungan `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, ketika proses sama sekali tidak mengekspor direktori home.

Direktori yang ditentukan dicatat satu kali saat startup sebagai `scanner.dir_resolved`, dengan menyebutkan
input yang dipilih (`OMNIROUTE_PLUGINS_DIR`, `home`, atau `no-home-fallback`) — sehingga image
yang secara diam-diam berakhir pada langkah 3 akan menyatakannya, alih-alih hanya melaporkan daftar plugin kosong.
`POST /api/plugins/scan` menemukan setiap subdirektori di sana yang memiliki
`plugin.json` valid dan mendaftarkannya; direktori yang sama merupakan root tempat
`pluginManager.install()` menyalin plugin, sehingga override memindahkan lokasi penemuan dan
instalasi secara bersamaan.

> **`OMNIROUTE_PLUGINS_DIR` bukan `OMNIROUTE_PLUGIN_PATH`.** Yang terakhir hanya dibaca oleh
> pemuat plugin perintah CLI (`bin/cli/plugins.mjs`) untuk menemukan package npm `omniroute-cmd-*`
> yang menambahkan subperintah `omniroute` — variabel tersebut tidak berpengaruh pada pemindai runtime
> yang dijelaskan di sini. Lihat [PLUGINS.md](./PLUGINS.md) untuk bagian tersebut.

### URL registry marketplace khusus

Sumber katalog marketplace dibaca dari pengaturan `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` membaca `settings.pluginMarketplaceUrl`). Jika
ditetapkan ke URL `http(s)`, `listMarketplacePlugins()` mengambil URL tersebut dan menerima
array JSON entri pada tingkat teratas atau objek dengan array `plugins`;
entri tanpa `name` bertipe string akan disaring. Jika tidak ditetapkan (atau jika pengambilan
gagal melewati perlindungan SSRF / menghasilkan respons yang buruk), registry bawaan
akan digunakan.

Tab "Marketplace" di dasbor menyediakan bidang untuk URL ini (dibaca kembali dari
`GET /api/settings`).

> Catatan implementasi: tindakan "Save" di dasbor mengirimkan
> `pluginMarketplaceUrl` ke `PATCH /api/settings`. Pada saat penulisan, kunci ini
> tidak dideklarasikan dalam `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), jadi verifikasikan persistensinya pada
> rilis Anda sebelum mengandalkannya — jalur **baca** (`getSettings()` →
> `listMarketplacePlugins()`) menggunakan kunci tersebut setelah tersedia dalam penyimpanan
> pengaturan.

## Keamanan

### Tingkat rute — hanya loopback

Plugin mengeksekusi kode dalam proses anak yang dibuat, sehingga seluruh permukaan
`/api/plugins` diklasifikasikan sebagai `LOCAL_ONLY` (Tingkat 1). Penegakan loopback
dijalankan tanpa syarat **sebelum** pemeriksaan autentikasi apa pun, sehingga token
manajemen yang bocor dan mencapai mesin melalui tunnel tetap tidak dapat menginstal,
mengaktifkan, atau menghapus instalasi plugin. Lihat
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) dan
Aturan Ketat #15 / #17.

### Perlindungan SSRF registri marketplace

URL registri khusus merupakan konfigurasi yang dapat dipengaruhi penyerang, sehingga
sebelum mengambilnya, `listMarketplacePlugins()` memprosesnya melalui dua lapisan:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Menolak apa pun yang bukan `http:` / `https:`.
   - Menolak host privat/loopback/link-local/ULA literal (IPv4 **dan** IPv6,
     termasuk yang dipetakan ke IPv4) melalui `isPrivateHost` kanonis
     (`src/shared/network/outboundUrlGuard.ts`).
   - Me-resolve **kedua** record `A` dan `AAAA`, serta menolak jika **ada**
     alamat hasil resolusi yang bersifat privat — menutup bypass nama host publik
     → alamat IP privat.
   - **Gagal secara tertutup**: kegagalan resolusi DNS menyebabkan URL ditolak.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): menerapkan ulang perlindungan URL
   khusus-publik saat pengambilan dan **memblokir pengalihan** (tidak ada pivot
   publik → privat melalui `30x`).

URL yang gagal pada salah satu lapisan tidak membatalkan permintaan — marketplace
secara diam-diam kembali menggunakan registri bawaan awal dan mencatat peringatan.

> Perlindungan ini diperkuat dalam PR #3774 secara khusus untuk me-resolve A + AAAA
> dan menggunakan `isPrivateHost` kanonis alih-alih pemeriksaan khusus IPv4.

### Isolasi eksekusi plugin

- **Isolasi proses** — `loadPlugin()` (`src/lib/plugins/loader.ts`) menjalankan
  setiap plugin dalam proses anak Node.js yang terpisah dan berkomunikasi melalui
  IPC. Pemanggilan hook memiliki batas waktu dengan eskalasi `SIGTERM` → `SIGKILL`.
- **Daftar izin variabel lingkungan** — proses anak hanya menerima kumpulan
  variabel lingkungan yang diizinkan; kumpulan yang lebih luas hanya diberikan
  ketika manifes meminta izin `env`.
- **Pembatasan jalur** — proses instalasi/peningkatan/penghapusan instalasi
  memastikan bahwa direktori plugin dan `manifest.main` di-resolve **di dalam**
  root plugin terkelola sebelum penyalinan atau penghapusan rekursif apa pun
  (melindungi dari jalur DB yang dimanipulasi dan traversal `../` dalam
  `manifest.main`). Aktivasi me-resolve symlink melalui `realpath` dan menolak
  memuat titik masuk yang keluar dari direktori plugin.
- **Pin integritas opsional** — manifes dapat mendeklarasikan kolom `integrity`
  (`sha256-<base64>`, format SRI). Jika tersedia, loader memverifikasi hash file
  entri pada waktu pemuatan dan menolak aktivasi jika tidak cocok. Ini merupakan
  deteksi manipulasi yang bersifat opsional, **bukan** batas keamanan — perutean
  khusus-loopback dan model izin adalah batas yang sesungguhnya.

## Manifes (`plugin.json`)

Divalidasi oleh `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Kolom              | Tipe      | Catatan                                                       |
| ------------------ | --------- | ------------------------------------------------------------- |
| `name`             | string    | Wajib; kebab-case (`^[a-z0-9-]+$`), 1–100 karakter            |
| `version`          | string    | Wajib; semver (`MAJOR.MINOR.PATCH`)                           |
| `description`      | string?   | ≤ 500 karakter                                                |
| `author`           | string?   | ≤ 200 karakter                                                |
| `license`          | string?   | Nilai default `MIT`                                           |
| `main`             | string?   | File entri; nilai default `index.js`                          |
| `source`           | enum?     | `local` \| `marketplace` (nilai default `local`)              |
| `tags`             | string[]? | Tag pencarian                                                 |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                               |
| `hooks`            | object?   | Boolean yang menyatakan hook yang diimplementasikan plugin    |
| `skills`           | object[]? | Definisi keterampilan opsional                                |
| `enabledByDefault` | boolean?  | Aktifkan otomatis saat instalasi                              |
| `configSchema`     | object?   | Peta kolom konfigurasi (`string`/`number`/`boolean`/`select`) |
| `integrity`        | string?   | Pin file entri `sha256-<base64>` opsional                     |

Izin berasal dari enum
`network` / `file-read` / `file-write` / `env` / `exec`.

## Alur Siklus Hidup

```
install (POST /api/plugins, path)
  → pindai/validasi manifest → salin ke staging → pastikan main berada di dalam direktori
  → ubah nama secara atomik ke ~/.omniroute/plugins/<name> → sisipkan baris DB
  → jalankan onInstall → jika enabledByDefault: aktifkan

activate (POST /api/plugins/{name}/activate)
  → pemeriksaan containment realpath → loadPlugin() (jalankan proses anak)
  → daftarkan hook yang dideklarasikan → status = "active" → jalankan onActivate

deactivate (POST /api/plugins/{name}/deactivate)
  → jalankan onDeactivate (SEBELUM membatalkan pendaftaran) → batalkan pendaftaran hook
  → hentikan proses anak → status = "inactive"

uninstall (DELETE /api/plugins/{name})
  → nonaktifkan jika aktif → jalankan onUninstall
  → hapus direktori plugin secara rekursif dengan pemeriksaan containment → hapus baris DB
```

Menjalankan kembali `install` terhadap direktori yang versi manifest-nya **benar-benar
lebih baru** daripada versi yang terinstal akan melakukan peningkatan otomatis (instalasi ulang bersih; konfigurasi diatur ulang
ke nilai default). Versi yang sama atau lebih lama akan ditolak.

## Basis Data

Tabel `plugins` (migrasi `076_create_plugins.sql`):

| Kolom           | Tipe    | Catatan                                                       |
| --------------- | ------- | ------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                          |
| `name`          | TEXT    | Unik                                                          |
| `version`       | TEXT    | semver; default `1.0.0`                                       |
| `description`   | TEXT    | Opsional                                                      |
| `author`        | TEXT    | Opsional                                                      |
| `license`       | TEXT    | Default `MIT`                                                 |
| `main`          | TEXT    | File entri; default `index.js`                                |
| `source`        | TEXT    | Default `local`                                               |
| `tags`          | TEXT    | Array JSON; default `[]`                                      |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`              |
| `enabled`       | INT     | 0/1; default 0                                                |
| `manifest`      | TEXT    | JSON manifest lengkap                                         |
| `config`        | TEXT    | JSON; default `{}`                                            |
| `config_schema` | TEXT    | JSON; default `{}`                                            |
| `hooks`         | TEXT    | Array JSON berisi nama hook yang dideklarasikan; default `[]` |
| `permissions`   | TEXT    | Array JSON; default `[]`                                      |
| `plugin_dir`    | TEXT    | Direktori instalasi absolut                                   |
| `error_message` | TEXT    | Diatur ketika `status = "error"`                              |
| `installed_at`  | TEXT    | `datetime('now')`                                             |
| `updated_at`    | TEXT    | `datetime('now')`                                             |
| `activated_at`  | TEXT    | Diatur saat aktivasi                                          |

Metrik/analitik plugin dilacak dalam tabel tambahan
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Dasbor

Halaman dasbor di `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) menyediakan dua tab:

- **Terinstal** — mencantumkan plugin yang terinstal beserta hook yang dideklarasikan, tombol pengalih
  aktif/nonaktif, tombol hapus instalasi, dan tindakan "Pindai plugin"
  (`POST /api/plugins/scan`).
- **Marketplace** — menampilkan katalog dari `GET /api/plugins/marketplace` dengan
  kolom untuk menetapkan URL registry khusus.

Halaman konfigurasi per plugin berada di `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Lihat Juga

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  alasan `/api/plugins` hanya dapat diakses melalui loopback (Tingkat 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — kerangka kerja keterampilan terkait
  (`src/lib/skills/`); plugin dapat mendeklarasikan keterampilan dalam manifesnya
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integrasi keluar
  berbasis peristiwa
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  pola `buildErrorBody()` yang digunakan oleh setiap rute plugin untuk respons kesalahan
