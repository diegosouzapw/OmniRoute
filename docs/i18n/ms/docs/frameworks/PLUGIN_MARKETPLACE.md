# Plugin Marketplace (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇹 [am](../../../am/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇿 [az](../../../az/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇰 [da](../../../da/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇩🇪 [de](../../../de/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇷 [el](../../../el/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇸 [es](../../../es/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇪🇪 [et](../../../et/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇱 [he](../../../he/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇩 [id](../../../id/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇹 [it](../../../it/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇭 [km](../../../km/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇲🇲 [my](../../../my/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇴 [no](../../../no/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [or](../../../or/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇱🇰 [si](../../../si/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇮🇳 [te](../../../te/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇭 [th](../../../th/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/PLUGIN_MARKETPLACE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/PLUGIN_MARKETPLACE.md)

---

> **Sumber rujukan utama:** `src/lib/plugins/` (`marketplace.ts`, `manager.ts`, `manifest.ts`,
> `scanner.ts`, `loader.ts`), `src/app/api/plugins/`, dan
> `src/app/(dashboard)/dashboard/plugins/`
> **Kemas kini terakhir:** 2026-06-28 — v3.8.40

OmniRoute disertakan dengan sistem pemalam ala WordPress. Pemalam ialah direktori
serba lengkap — setiap satunya mempunyai manifes `plugin.json` dan fail titik masuk — yang mencangkuk
ke dalam talian paip permintaan (`onRequest` / `onResponse` / `onError`) dan ke dalam
peristiwa kitaran hayat (`onInstall` / `onActivate` / `onDeactivate` / `onUninstall`).

**Pasaran Pemalam** ialah lapisan penemuan di atas sistem tersebut. Ia
menyediakan katalog pemalam boleh pasang yang boleh dilayari. Secara lalai, katalog tersebut ialah
daftar benih terbina dalam yang kecil; pengendali boleh menghalakannya kepada URL daftar
jauh tersuai. Dalam hal ini, pengambilan diperkukuh oleh pengawal SSRF yang
menyelesaikan DNS (lihat [Keselamatan](#security)).

Setiap laluan pemalam adalah **gelung balik sahaja** (Tahap 1 — `LOCAL_ONLY`): pemalam memuatkan
dan melaksanakan kod dalam proses anak, maka laluan tersebut tidak boleh dicapai daripada
asal bukan gelung balik tanpa mengira pengesahan. Lihat
[`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md).

## Cara Semuanya Berfungsi Bersama

```
Papan pemuka (/dashboard/plugins)
  ├─ Tab "Dipasang"    → GET /api/plugins            (listPlugins)
  │                      POST /api/plugins/scan      (pluginManager.scan)
  │                      POST /api/plugins/{name}/activate|deactivate
  │                      DELETE /api/plugins/{name}   (nyahpasang)
  └─ Tab "Pasaran"     → GET /api/plugins/marketplace
                           → listMarketplacePlugins()
                             ├─ tiada URL tersuai → SEED_REGISTRY terbina dalam
                             └─ URL tersuai → pengawal SSRF isSafeMarketplaceUrl()
                                           → safeOutboundFetch(guard:"public-only")
```

- **Lapisan daftar** — `src/lib/plugins/marketplace.ts`: menyenaraikan / mencari dalam
  katalog dan kembali menggunakan daftar benih jika berlaku sebarang kegagalan.
- **Lapisan kitaran hayat** — `src/lib/plugins/manager.ts` (tunggal `pluginManager`):
  pasang, tingkatkan, aktifkan, nyahaktifkan, nyahpasang, imbas, muatkan semasa permulaan.
- **Lapisan manifes** — `src/lib/plugins/manifest.ts`: skema Zod + nilai lalai untuk
  `plugin.json`.
- **Pengimbas** — `src/lib/plugins/scanner.ts`: menemukan pemalam pada cakera di bawah
  direktori pemalam.
- **Pemuat** — `src/lib/plugins/loader.ts`: memulakan setiap pemalam dalam proses
  anak terpencil dan mengantarakan panggilan cangkuk melalui IPC.

## Katalog Pasaran

`listMarketplacePlugins()` (`src/lib/plugins/marketplace.ts`) mengembalikan senarai
objek `MarketplaceEntry`:

| Medan         | Jenis    | Catatan                                  |
| ------------- | -------- | ---------------------------------------- |
| `name`        | string   | Nama pemalam dalam kebab-case            |
| `version`     | string   | semver                                   |
| `description` | string   | Ringkasan pendek                         |
| `author`      | string   | Pengarang / organisasi                   |
| `license`     | string   | ID lesen gaya SPDX                       |
| `downloadUrl` | string   | URL muat turun sumber (mungkin kosong)   |
| `repository`  | string?  | URL repositori pilihan                   |
| `tags`        | string[] | Teg carian/penapis                       |
| `downloads`   | number   | Bilangan muat turun                      |
| `rating`      | number   | 0–5                                      |
| `verified`    | boolean  | Sama ada entri ditandai sebagai disahkan |
| `lastUpdated` | string   | Rentetan tarikh seakan ISO               |

Apabila tiada URL daftar tersuai dikonfigurasikan, katalog tersebut ialah
`SEED_REGISTRY` terbina dalam (kini `request-logger`, `rate-limiter`, `cost-tracker`, dan
`theme-manager`). Daftar benih sentiasa tersedia — jika daftar jauh yang dikonfigurasikan
tidak dapat dicapai, mengembalikan status bukan `200`, atau mengembalikan isi yang tidak
dikenali, `listMarketplacePlugins()` merekodkan amaran dan kembali menggunakan senarai benih.

> Nota: **katalog** pasaran (layar/cari) disambungkan dari hujung ke hujung, tetapi
> **pemasangan** satu klik daripada katalog masih belum dilaksanakan — butang
> "Pasang" pada entri pasaran dalam papan pemuka pada masa ini memaparkan notis
> "akan datang". Pemasangan pada masa ini dilakukan melalui aliran pemasangan laluan setempat
> (`POST /api/plugins`) dan penemuan pada cakera (`POST /api/plugins/scan`).

## REST API

Semua titik akhir memerlukan pengesahan pengurusan (`requireManagementAuth`) **dan**
hanya boleh diakses melalui loopback — `/api/plugins` dan `/api/plugins/` disenaraikan
dalam `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`).

| Titik akhir                      | Kaedah | Penerangan                                                    |
| -------------------------------- | ------ | ------------------------------------------------------------- |
| `/api/plugins`                   | GET    | Senaraikan pemalam yang dipasang (penapis `?status=` pilihan) |
| `/api/plugins`                   | POST   | Pasang pemalam daripada laluan tempatan mutlak                |
| `/api/plugins/scan`              | POST   | Imbas direktori pemalam dan daftarkan pemalam baharu          |
| `/api/plugins/marketplace`       | GET    | Senaraikan entri katalog pasaran                              |
| `/api/plugins/[name]`            | GET    | Dapatkan butiran pemalam yang dipasang                        |
| `/api/plugins/[name]`            | DELETE | Nyahpasang pemalam                                            |
| `/api/plugins/[name]/activate`   | POST   | Aktifkan (muat + daftarkan cangkuk)                           |
| `/api/plugins/[name]/deactivate` | POST   | Nyahaktifkan (cetuskan `onDeactivate`, nyahdaftarkan cangkuk) |
| `/api/plugins/[name]/config`     | GET    | Dapatkan konfigurasi pemalam + skema konfigurasi              |
| `/api/plugins/[name]/config`     | PUT    | Kemas kini konfigurasi pemalam (disahkan terhadap skema)      |

Penapis `status` untuk `GET /api/plugins` menerima salah satu daripada
`installed` / `active` / `inactive` / `error`. Nilai tidak sah mengembalikan `400`.

### Senaraikan pemalam yang dipasang

```bash
curl http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..."
```

### Pasang daripada laluan tempatan

```bash
curl -X POST http://localhost:20128/api/plugins \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "path": "/absolute/path/to/my-plugin" }'
```

`path` mestilah **mutlak** dan tidak boleh mengandungi segmen rentasan `..` atau
bait nol (dikuatkuasakan oleh Zod). Direktori sumber mesti mengandungi
`plugin.json` yang sah (atau menjadi direktori induk kepadanya). Jika berjaya,
respons ialah `201` dengan baris pemalam yang dipasang.

### Layari pasaran

```bash
curl http://localhost:20128/api/plugins/marketplace \
  -H "Cookie: auth_token=..."
```

### Kemas kini konfigurasi pemalam

```bash
curl -X PUT http://localhost:20128/api/plugins/my-plugin/config \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{ "config": { "level": "debug", "maxItems": 100 } }'
```

`PUT .../config` mengesahkan setiap nilai yang diberikan terhadap
`configSchema` pemalam (diisytiharkan dalam manifes): medan `number` mematuhi
`min`/`max`, manakala medan `select` mesti sepadan dengan `enum` yang
diisytiharkan. Kunci yang tidak terdapat dalam skema dibenarkan melaluinya.

## Konfigurasi

### Direktori pemalam

Pemalam terletak di bawah direktori data OmniRoute:

```
~/.omniroute/plugins/<plugin-name>/
  ├─ plugin.json
  └─ index.js          # (atau apa-apa yang dirujuk oleh manifest.main)
```

`getDefaultPluginDir()` (`src/lib/plugins/scanner.ts`) menentukan direktori
tersebut dalam tiga langkah:

1. **`OMNIROUTE_PLUGINS_DIR`**, apabila ditetapkan — digunakan secara langsung, tanpa
   mengira nilai `HOME`. Ini ialah tetapan eksplisit untuk Docker/K8s, apabila pepohon
   pemalam dilekapkan secara ikatan pada laluan yang biasanya tidak berkaitan dengan
   direktori rumah bekas (#11827).
2. `<home>/.omniroute/plugins`, dengan `<home>` diperoleh daripada pemboleh ubah
   persekitaran `HOME` / `USERPROFILE`.
3. `/tmp/.omniroute/plugins`, apabila proses tidak mengeksport sebarang direktori
   rumah.

Direktori yang ditentukan dilog sekali semasa permulaan sebagai
`scanner.dir_resolved`, dengan menamakan input yang dipilih
(`OMNIROUTE_PLUGINS_DIR`, `home`, atau `no-home-fallback`) — supaya imej yang
secara senyap berakhir pada langkah 3 menyatakannya, dan bukannya sekadar
melaporkan senarai pemalam kosong. `POST /api/plugins/scan` menemui mana-mana
subdirektori di situ yang mengandungi `plugin.json` yang sah dan mendaftarkannya;
direktori yang sama ialah akar tempat `pluginManager.install()` menyalin pemalam,
maka penggantian mengalihkan penemuan dan pemasangan bersama-sama.

> **`OMNIROUTE_PLUGINS_DIR` bukan `OMNIROUTE_PLUGIN_PATH`.** Yang kedua hanya dibaca
> oleh pemuat pemalam perintah CLI (`bin/cli/plugins.mjs`) untuk mencari pakej npm
> `omniroute-cmd-*` yang menambahkan subperintah `omniroute` — ia tidak memberi kesan
> pada pengimbas masa jalan yang diterangkan di sini. Lihat
> [PLUGINS.md](./PLUGINS.md) untuk bahagian tersebut.

### URL pendaftaran pasaran tersuai

Sumber katalog pasaran dibaca daripada tetapan `pluginMarketplaceUrl`
(`src/lib/plugins/marketplace.ts` membaca `settings.pluginMarketplaceUrl`).
Apabila ditetapkan kepada URL `http(s)`, `listMarketplacePlugins()` mengambil
URL tersebut dan menerima sama ada tatasusunan JSON peringkat teratas yang
mengandungi entri atau objek dengan tatasusunan `plugins`; entri tanpa `name`
jenis rentetan ditapis keluar. Apabila tidak ditetapkan (atau apabila
pengambilan gagal melepasi perlindungan SSRF / mengembalikan respons yang tidak
sah), pendaftaran benih terbina dalam digunakan.

Tab "Marketplace" pada papan pemuka menyediakan medan untuk URL ini (dibaca
semula daripada `GET /api/settings`).

> Nota pelaksanaan: tindakan "Save" pada papan pemuka menghantar
> `pluginMarketplaceUrl` kepada `PATCH /api/settings`. Pada masa penulisan, kunci
> ini tidak diisytiharkan dalam `updateSettingsSchema`
> (`src/shared/validation/settingsSchemas.ts`), jadi sahkan pengekalan dalam
> keluaran anda sebelum bergantung padanya — laluan **baca** (`getSettings()` →
> `listMarketplacePlugins()`) menggunakan kunci tersebut setelah ia wujud dalam
> stor tetapan.

## Keselamatan

### Tahap laluan — gelung balik sahaja

Pemalam melaksanakan kod dalam proses anak yang diwujudkan, maka keseluruhan permukaan `/api/plugins`
diklasifikasikan sebagai `LOCAL_ONLY` (Tahap 1). Penguatkuasaan gelung balik dijalankan
tanpa syarat **sebelum** sebarang semakan pengesahan, maka token pengurusan yang bocor dan sampai
ke mesin melalui terowong masih tidak boleh memasang, mengaktifkan atau menyahpasang pemalam.
Lihat [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) dan
Peraturan Tegas #15 / #17.

### Perlindungan SSRF pendaftaran pasaran

URL pendaftaran tersuai ialah konfigurasi yang boleh dipengaruhi oleh penyerang, maka sebelum
mengambilnya, `listMarketplacePlugins()` menjalankannya melalui dua lapisan:

1. **`isSafeMarketplaceUrl(url)`** (`src/lib/plugins/marketplace.ts`):
   - Menolak apa-apa yang bukan `http:` / `https:`.
   - Menolak hos peribadi/gelung balik/pautan setempat/ULA literal (IPv4 **dan** IPv6,
     termasuk IPv4 yang dipetakan) melalui `isPrivateHost` kanonik
     (`src/shared/network/outboundUrlGuard.ts`).
   - Menyelesaikan rekod **kedua-dua** `A` dan `AAAA` serta menolak jika **mana-mana** alamat
     yang diselesaikan adalah peribadi — menutup pintasan nama hos awam → IP peribadi.
   - **Gagal secara tertutup**: kegagalan resolusi DNS menyebabkan URL ditolak.
2. **`safeOutboundFetch(url, { guard: "public-only", timeoutMs: 5000 })`**
   (`src/shared/network/safeOutboundFetch.ts`): menggunakan semula perlindungan URL awam sahaja
   semasa pengambilan dan **menyekat ubah hala** (tiada pangsi awam → peribadi `30x`).

URL yang gagal pada salah satu lapisan tidak membatalkan permintaan — pasaran
secara senyap kembali menggunakan pendaftaran benih terbina dalam dan merekodkan amaran.

> Perlindungan ini diperkukuh dalam PR #3774 khususnya untuk menyelesaikan A + AAAA dan menggunakan
> `isPrivateHost` kanonik dan bukannya semakan IPv4 sahaja.

### Pengasingan pelaksanaan pemalam

- **Pengasingan proses** — `loadPlugin()` (`src/lib/plugins/loader.ts`) mewujudkan
  setiap pemalam dalam proses anak Node.js yang berasingan dan berkomunikasi melalui IPC.
  Panggilan cangkuk mempunyai had masa dengan peningkatan `SIGTERM` → `SIGKILL`.
- **Senarai dibenarkan persekitaran** — proses anak hanya menerima set pemboleh ubah
  persekitaran yang dibenarkan; set yang lebih luas hanya diberikan apabila manifes meminta
  kebenaran `env`.
- **Pembendungan laluan** — pemasangan/penaiktarafan/penyahpasangan memastikan bahawa direktori
  pemalam dan `manifest.main` diselesaikan **dalam** akar pemalam terurus
  sebelum sebarang penyalinan atau pemadaman rekursif (melindungi daripada laluan DB yang diusik dan
  lintasan `../` dalam `manifest.main`). Pengaktifan menyelesaikan pautan simbolik melalui
  `realpath` dan enggan memuatkan titik masuk yang terkeluar daripada direktori pemalam.
- **Pin integriti pilihan** — manifes boleh mengisytiharkan medan `integrity`
  (`sha256-<base64>`, format SRI). Apabila tersedia, pemuat mengesahkan cincangan
  fail masukan semasa pemuatan dan enggan mengaktifkannya jika tidak sepadan. Ini ialah
  pengesanan pengusikan atas pilihan, **bukan** sempadan keselamatan — penghalaan gelung balik sahaja
  dan model kebenaran ialah sempadan sebenar.

## Manifes (`plugin.json`)

Disahkan oleh `PluginManifestSchema` (`src/lib/plugins/manifest.ts`):

| Medan              | Jenis     | Catatan                                                        |
| ------------------ | --------- | -------------------------------------------------------------- |
| `name`             | string    | Diperlukan; kebab-case (`^[a-z0-9-]+$`), 1–100 aksara          |
| `version`          | string    | Diperlukan; semver (`MAJOR.MINOR.PATCH`)                       |
| `description`      | string?   | ≤ 500 aksara                                                   |
| `author`           | string?   | ≤ 200 aksara                                                   |
| `license`          | string?   | Lalai kepada `MIT`                                             |
| `main`             | string?   | Fail masukan; lalai kepada `index.js`                          |
| `source`           | enum?     | `local` \| `marketplace` (lalai kepada `local`)                |
| `tags`             | string[]? | Teg carian                                                     |
| `requires`         | object?   | `{ omniroute?, permissions[] }`                                |
| `hooks`            | object?   | Boolean yang mengisytiharkan cangkuk yang dilaksanakan pemalam |
| `skills`           | object[]? | Takrif kemahiran pilihan                                       |
| `enabledByDefault` | boolean?  | Aktifkan secara automatik semasa pemasangan                    |
| `configSchema`     | object?   | Peta medan konfigurasi (`string`/`number`/`boolean`/`select`)  |
| `integrity`        | string?   | Pin fail masukan `sha256-<base64>` pilihan                     |

Kebenaran diambil daripada enum
`network` / `file-read` / `file-write` / `env` / `exec`.

## Aliran Kitar Hayat

```
pasang (POST /api/plugins, laluan)
  → imbas/sahkan manifes → salin ke pementasan → pastikan main berada dalam direktori
  → penamaan semula atomik ke ~/.omniroute/plugins/<name> → masukkan baris DB
  → jalankan onInstall → jika enabledByDefault: aktifkan

aktifkan (POST /api/plugins/{name}/activate)
  → semakan pembendungan realpath → loadPlugin() (hasilkan proses anak)
  → daftarkan cangkuk yang diisytiharkan → status = "active" → jalankan onActivate

nyahaktifkan (POST /api/plugins/{name}/deactivate)
  → jalankan onDeactivate (SEBELUM menyahdaftar) → nyahdaftarkan cangkuk
  → hentikan proses anak → status = "inactive"

nyahpasang (DELETE /api/plugins/{name})
  → nyahaktifkan jika aktif → jalankan onUninstall
  → pemadaman rekursif direktori pemalam dengan semakan pembendungan → padamkan baris DB
```

Menjalankan semula `install` terhadap direktori yang versi manifesnya **benar-benar
lebih baharu** daripada versi yang dipasang akan menaik taraf secara automatik (pemasangan semula bersih; konfigurasi ditetapkan semula
kepada nilai lalai). Versi yang sama atau lebih lama akan ditolak.

## Pangkalan Data

Jadual `plugins` (migrasi `076_create_plugins.sql`):

| Lajur           | Jenis   | Catatan                                                           |
| --------------- | ------- | ----------------------------------------------------------------- |
| `id`            | TEXT PK | UUID                                                              |
| `name`          | TEXT    | Unik                                                              |
| `version`       | TEXT    | semver; lalai `1.0.0`                                             |
| `description`   | TEXT    | Pilihan                                                           |
| `author`        | TEXT    | Pilihan                                                           |
| `license`       | TEXT    | Lalai `MIT`                                                       |
| `main`          | TEXT    | Fail masukan; lalai `index.js`                                    |
| `source`        | TEXT    | Lalai `local`                                                     |
| `tags`          | TEXT    | Tatasusunan JSON; lalai `[]`                                      |
| `status`        | TEXT    | `installed` \| `active` \| `inactive` \| `error`                  |
| `enabled`       | INT     | 0/1; lalai 0                                                      |
| `manifest`      | TEXT    | JSON manifes penuh                                                |
| `config`        | TEXT    | JSON; lalai `{}`                                                  |
| `config_schema` | TEXT    | JSON; lalai `{}`                                                  |
| `hooks`         | TEXT    | Tatasusunan JSON bagi nama cangkuk yang diisytiharkan; lalai `[]` |
| `permissions`   | TEXT    | Tatasusunan JSON; lalai `[]`                                      |
| `plugin_dir`    | TEXT    | Direktori pemasangan mutlak                                       |
| `error_message` | TEXT    | Ditetapkan apabila `status = "error"`                             |
| `installed_at`  | TEXT    | `datetime('now')`                                                 |
| `updated_at`    | TEXT    | `datetime('now')`                                                 |
| `activated_at`  | TEXT    | Ditetapkan semasa pengaktifan                                     |

Metrik/analitik pemalam dijejaki dalam jadual tambahan
(`090_plugin_metrics.sql`, `091_plugin_analytics.sql`).

## Papan Pemuka

Halaman papan pemuka di `/dashboard/plugins`
(`src/app/(dashboard)/dashboard/plugins/page.tsx`) menyediakan dua tab:

- **Dipasang** — menyenaraikan pemalam yang dipasang bersama cangkuk yang diisytiharkan, togol
  aktifkan/nyahaktifkan, butang nyahpasang dan tindakan "Imbas pemalam"
  (`POST /api/plugins/scan`).
- **Pasaran** — memaparkan katalog daripada `GET /api/plugins/marketplace` dengan medan
  untuk menetapkan URL pendaftar tersuai.

Halaman konfigurasi bagi setiap pemalam tersedia di `/dashboard/plugins/[name]/config`
(`src/app/(dashboard)/dashboard/plugins/[name]/config/page.tsx`).

## Lihat Juga

- [`docs/security/ROUTE_GUARD_TIERS.md`](../security/ROUTE_GUARD_TIERS.md) —
  sebab `/api/plugins` hanya boleh diakses melalui gelung balik (Tahap 1)
- [`docs/frameworks/SKILLS.md`](./SKILLS.md) — rangka kerja kemahiran yang berkaitan
  (`src/lib/skills/`); pemalam boleh mengisytiharkan kemahiran dalam manifesnya
- [`docs/frameworks/WEBHOOKS.md`](./WEBHOOKS.md) — integrasi keluar berasaskan
  peristiwa
- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) —
  corak `buildErrorBody()` yang digunakan oleh setiap laluan pemalam untuk respons ralat
