# RTK Compression (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

Kompresi RTK adalah mesin kompresi OmniRoute yang memahami perintah untuk output terminal dan alat. Mesin ini
dirancang untuk sesi agen pengodean, tempat sebagian besar pertumbuhan konteks berasal dari log pengujian, output build,
derau pengelola paket, transkrip shell, output Docker, output git, dan stack trace.

RTK dapat berjalan langsung dengan `defaultMode: "rtk"` atau sebagai langkah pertama dalam pipeline bertumpuk, biasanya:

```txt
rtk -> caveman
```

Urutan tersebut terlebih dahulu mengompresi output mesin yang penuh derau, lalu memungkinkan Caveman memadatkan prosa yang tersisa.

RTK upstream melaporkan penghematan output perintah sebesar `60-90%`. Contoh sesi dalam README-nya berubah dari
`~118,000` token standar menjadi `~23,900` token RTK, yang berarti penghematan sebesar `79.7%` (`~80%`). OmniRoute menggunakan
rata-rata upstream tersebut untuk menghitung penghematan bertumpuk dengan kompresi input Caveman:

```txt
Rata-rata RTK:  80% dihemat
Input Caveman: 46% dihemat
Bertumpuk:     1 - (1 - 0.80) * (1 - 0.46) = 89.2% dihemat
Rentang:       1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Apa yang Dikompresi

Katalog bawaan saat ini menyediakan 49 filter di seluruh kategori berikut:

| Kategori  | Contoh                                                          |
| --------- | --------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`               |
| `test`    | Vitest, Jest, Pytest, Playwright, pengujian Go, pengujian Cargo |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx   |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler   |
| `shell`   | `ls`, `find`, `grep`, log shell generik                         |
| `docker`  | `docker ps`, log Docker                                         |
| `infra`   | Terraform, OpenTofu, `systemctl status`                         |
| `generic` | Output JSON, stack trace, fallback output generik               |

Detektor di `open-sse/services/compression/engines/rtk/commandDetector.ts` mengklasifikasikan output
sebelum pemilihan filter. Filter juga dapat mencocokkan berdasarkan pola perintah atau regex output ketika kelas
perintah tidak memadai.

## Resolusi Filter

RTK memuat filter dalam urutan berikut:

1. Filter proyek dari `.rtk/filters.toml` dan `.rtk/filters.json`, hanya jika dipercaya.
2. Filter global dari `DATA_DIR/rtk/filters.toml` dan `DATA_DIR/rtk/filters.json`.
3. Filter bawaan dari `open-sse/services/compression/engines/rtk/filters/`.

Dalam cakupan yang sama, filter skema RTK TOML v1 lebih diprioritaskan daripada filter JSON OmniRoute. Ekspresi TOML
`match_command` diperiksa sebelum pencocokan jenis perintah agar filter khusus perintah yang diimpor dapat
menggantikan filter yang lebih luas dalam cakupan tersebut. Cakupan proyek tetap lebih diprioritaskan daripada cakupan global,
apa pun format filenya.

Filter proyek sengaja dibatasi berdasarkan kepercayaan karena filter regex dapat mengubah cara output alat
ditampilkan kepada agen. File filter proyek diterima jika salah satu kondisi berikut terpenuhi:

- `rtkConfig.trustProjectFilters` bernilai `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` ditetapkan.
- `.rtk/trust.json` berisi hash SHA-256 yang cocok untuk file filter proyek.

Contoh file kepercayaan:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Hash tersebut terpisah: `filtersSha256` memercayai `.rtk/filters.json`, sedangkan `filtersTomlSha256`
memercayai `.rtk/filters.toml`. Mengedit salah satu file hanya membatalkan entri kepercayaannya sendiri. File global
dipasang oleh administrator dan menggunakan perilaku kepercayaan filter global yang sudah ada.

Filter kustom dapat berupa satu objek filter atau array objek filter. Filter kustom yang tidak valid akan
dilewati dan dilaporkan oleh diagnostik `/api/context/rtk/filters`. Filter bawaan yang tidak valid langsung menyebabkan kegagalan.

## Kompatibilitas skema RTK TOML v1

OmniRoute dapat mengurai, memvalidasi, menguji, dan menginstal file filter deklaratif menggunakan skema RTK TOML v1.
Bidang yang didukung adalah `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty`, dan pengujian inline `[[tests.<filter>]]`.
Bidang yang tidak dikenal, ekspresi reguler yang tidak valid atau tidak aman, aturan strip/keep yang digunakan secara bersamaan, file berukuran lebih dari
1 MiB, dan referensi ke filter yang tidak dikenal akan ditolak. File dengan pengujian inline yang gagal dapat
divalidasi untuk diperiksa, tetapi tidak dapat diinstal atau dimuat. Kegagalan pemuatan file kustom tetap
bersifat fail-open: file yang tidak valid akan dilewati dan filter lainnya akan terus berfungsi.

OmniRoute menerima keluaran alat setelah klien selesai menangkapnya, sehingga `filter_stderr = true`
tidak dapat mengubah penangkapan proses. Bidang tersebut diterima sebagai no-op dan validasi menghasilkan peringatan.
Hal ini sengaja dideskripsikan sebagai **kompatibilitas skema RTK TOML v1**, bukan kompatibilitas penuh
dengan executable RTK, hook shell, implementasi perintah Rust, atau tata letak trust store-nya.

Tampilan RTK lanjutan pada dasbor menerima TOML yang ditempelkan atau diunggah. Validasi bersifat hanya-baca.
Instalasi menulis `DATA_DIR/rtk/filters.toml` secara atomik dengan izin yang ketat dan memperbarui
katalog filter aktif tanpa memulai ulang. Mengganti file yang sudah ada memerlukan konfirmasi `overwrite`
secara eksplisit dan terlebih dahulu membuat `DATA_DIR/rtk/filters.toml.bak`.

## DSL Filter

Filter menggunakan skema JSON yang dijelaskan dalam [Format Aturan Kompresi](./COMPRESSION_RULES_FORMAT.md).
Runtime menerapkan tahapan berikut secara berurutan:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> buang/sertakan baris
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Bidang penting:

| Bidang                       | Tujuan                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Menghapus urutan warna/kontrol terminal sebelum pencocokan                      |
| `rules.filterStderr`         | Menormalisasi prefiks stderr yang umum sebelum pencocokan/penyaringan           |
| `rules.replace`              | Menerapkan penggantian regex secara berurutan                                   |
| `rules.matchOutput`          | Mengembalikan ringkasan ringkas saat keluaran cocok dengan kondisi yang dikenal |
| `rules.matchOutput[].unless` | Melewati pintasan saat terdapat pola kesalahan/kegagalan                        |
| `rules.dropPatterns`         | Menghapus baris yang mengganggu                                                 |
| `rules.includePatterns`      | Memprioritaskan baris yang dapat ditindaklanjuti                                |
| `rules.collapsePatterns`     | Menciutkan baris berulang yang cocok                                            |
| `rules.deduplicate`          | Keikutsertaan per filter: menciutkan baris duplikat yang berurutan              |
| `rules.truncateLineAt`       | Pemotongan per baris yang aman untuk Unicode                                    |
| `rules.onEmpty`              | Pesan cadangan jika semua baris tersaring                                       |
| `tests[]`                    | Sampel inline yang digunakan oleh gerbang verifikasi                            |

Filter bawaan diharapkan menyertakan sampel `tests[]` inline. Filter kustom juga sebaiknya
menyertakannya, terutama ketika filter tersebut digunakan bersama di berbagai proyek.

## Deduplikasi Baris (dua lapisan)

RTK menciutkan baris duplikat pada dua lapisan yang independen:

1. **`deduplicate` per filter (opsional, default `false`).** Sebuah filter dapat menetapkan `rules.deduplicate: true`
   untuk menciutkan baris duplikat berurutan _dalam output yang cocok dengan filter tersebut_, sebelum pemotongan.
   Proses ini dijalankan di dalam `lineFilter.ts`. Untuk filter lama, opsi ini diaktifkan secara otomatis ketika filter mendefinisikan
   `collapsePatterns`. Skema: `deduplicate: z.boolean().default(false)` dalam
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` di seluruh engine (default `3`).** Setelah semua filter dijalankan, engine menciutkan
   setiap rangkaian `>= deduplicateThreshold` baris berurutan yang identik di seluruh hasil
   (`deduplicateRepeatedLines`, diterapkan dalam `engines/rtk/index.ts`). Nilainya dibatasi antara 2–100 saat
   normalisasi.

Proses per filter dijalankan lebih dahulu (di dalam filter), sedangkan proses di seluruh engine dijalankan terakhir (pada output
yang telah digabungkan), sehingga keduanya dapat digunakan bersama tanpa penghitungan ganda.

## Pengelompokan Baris (`enableGrouping`)

Ketika `rtkConfig.enableGrouping` bernilai `true` (default `false`), RTK menjalankan proses tambahan `groupSimilarLines`
pada hasil pascadeduplikasi yang menciutkan rangkaian baris berurutan yang _hampir ekuivalen_ (tidak identik secara byte).
`rtkConfig.groupingThreshold` (default `3`) adalah panjang minimum rangkaian yang memicu
pengelompokan. Ini merupakan padanan struktural bagi `deduplicateThreshold`: deduplikasi menangani pengulangan persis,
sedangkan pengelompokan menangani "bentuk yang sama dengan sedikit perbedaan". Kedua opsi tersebut merupakan bagian dari JSON `rtkConfig`
yang disimpan dalam tabel `key_value` (lihat Konfigurasi di atas), sehingga pengaturannya tetap dipertahankan setelah proses dimulai ulang.

## Penghapusan Komentar Kode (`stripCodeComments` / `preserveDocstrings`)

Ketika `rtkConfig.applyToCodeBlocks` diaktifkan, RTK juga dapat menghapus komentar dari blok kode berpagar:

- `stripCodeComments` (default `false`) — opsional. Ketika bernilai `true`, RTK menghapus komentar dari blok berpagar JavaScript
  dan TypeScript. Secara historis, opsi ini dibaca tetapi tidak pernah diterapkan, sehingga default tetap
  "pertahankan" guna menghindari perubahan diam-diam pada lingkungan produksi.
- `preserveDocstrings` (default `true`) — ketika menghapus komentar, komentar blok JSDoc/`/** … */`
  tetap dipertahankan (komentar tersebut memuat dokumentasi API yang nilainya lebih besar daripada byte yang digunakannya). Tetapkan ke `false` untuk turut menghapus
  komentar tersebut.

Penghapusan komentar diimplementasikan dalam `open-sse/services/compression/engines/rtk/codeStripper.ts`. Implementasi ini menggunakan
**parser TypeScript** (bukan regex), sehingga literal string, templat, dan regex tidak pernah keliru dianggap
sebagai komentar, serta membatalkan seluruh proses ketika JSX terdeteksi (agar komentar dalam kontainer ekspresi JSX tidak pernah
rusak). Penghapusan komentar saat ini hanya berlaku untuk **JavaScript dan TypeScript** — bahasa lain
dalam kumpulan `CodeLanguage` milik penghapus (Python, Rust, Go, Ruby, Java) mengalami penciutan baris kosong dan
spasi kosong, tetapi tanpa penghapusan komentar. Proses pada blok yang telah dibersihkan diberi tag `rtk:code-strip` dalam
`rulesApplied`.

> **Catatan — GCF / enkode tabular merupakan engine terpisah.** RTK **tidak** memuat enkoder JSON tabular/kolumnar "GCF"
> (Graph Compact Format). Enkoder tersebut — yang menggantikan enkoder `omni-tabular` lama — berada dalam engine **headroom**
> (`open-sse/services/compression/engines/headroom/`, dengan codec yang disertakan sebagai vendor berada di bawah
> `headroom/gcf/`). Enkoder tersebut tidak berkaitan dengan alur filter RTK yang didokumentasikan di sini.

## Konfigurasi

Pengaturan global tersedia melalui `/api/settings/compression`. Pengaturan khusus RTK juga
tersedia melalui `/api/context/rtk/config`.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters` dan `disabledFilters` menggunakan id filter, misalnya `test-vitest` atau `git-diff`.

Struktur lengkap `rtkConfig` ditentukan oleh `RtkConfig` / `DEFAULT_RTK_CONFIG` di
`open-sse/services/compression/types.ts`. Seluruh objek disimpan sebagai satu nilai JSON dalam
tabel SQLite `key_value` pada `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`), dan dinormalisasi saat dibaca oleh `normalizeRtkConfig`. Jadi, setiap bidang di bawah ini
— termasuk `enableGrouping`, `groupingThreshold`, `stripCodeComments`, dan `preserveDocstrings` —
dipertahankan melalui penyimpanan yang sama dan tetap tersedia setelah dimulai ulang.

| Kunci                  | Bawaan  | Tujuan                                                                                 |
| ---------------------- | ------- | -------------------------------------------------------------------------------------- |
| `deduplicateThreshold` | `3`     | Seluruh mesin: jumlah minimum baris identik berurutan untuk diringkas (dibatasi 2–100) |
| `enableGrouping`       | `false` | Opsional: ringkas rentetan baris berurutan yang hampir setara                          |
| `groupingThreshold`    | `3`     | Jumlah minimum rentetan baris serupa berurutan yang memicu pengelompokan               |
| `stripCodeComments`    | `false` | Opsional: hapus komentar dari blok kode berpagar (memerlukan `applyToCodeBlocks`)      |
| `preserveDocstrings`   | `true`  | Saat menghapus komentar, pertahankan blok JSDoc/`/** … */`                             |

## API

| Rute                               | Metode | Tujuan                                            |
| ---------------------------------- | ------ | ------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Baca konfigurasi RTK                              |
| `/api/context/rtk/config`          | PUT    | Perbarui konfigurasi RTK                          |
| `/api/context/rtk/filters`         | GET    | Cantumkan katalog filter dan diagnostik pemuatan  |
| `/api/context/rtk/import`          | POST   | Validasi atau instal file skema TOML RTK v1       |
| `/api/context/rtk/test`            | POST   | Pratinjau kompresi RTK untuk satu muatan teks     |
| `/api/context/rtk/raw-output/[id]` | GET    | Baca keluaran mentah tersensor yang dipertahankan |
| `/api/compression/preview`         | POST   | Pratinjau mode kompresi apa pun                   |

Muatan pengujian RTK:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Muatan pratinjau kompresi:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

Rute pengelolaan memerlukan autentikasi pengelolaan dasbor atau kebijakan kunci API yang sesuai.

Muatan validasi TOML RTK:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Gunakan `"action": "install"` untuk menginstal file yang telah divalidasi secara global. Tambahkan `"overwrite": true` hanya
setelah meninjau dan mengonfirmasi penggantian file global yang sudah ada.

## Pemulihan Output Mentah

RTK biasanya hanya mengembalikan teks terkompresi. Untuk debugging, `rawOutputRetention` dapat mempertahankan
output mentah yang telah disunting:

| Nilai      | Perilaku                                                            |
| ---------- | ------------------------------------------------------------------- |
| `never`    | Jangan pertahankan output mentah                                    |
| `failures` | Pertahankan hanya output yang kemungkinan merupakan kegagalan       |
| `always`   | Pertahankan setiap output mentah RTK terkompresi, setelah disunting |

File yang dipertahankan ditulis di bawah:

```txt
DATA_DIR/rtk/raw-output/
```

Rahasia disunting sebelum disimpan, termasuk bearer token umum, kunci API, token Slack,
kunci akses AWS, dan nilai bergaya penetapan `token=...`, `secret=...`, `password=...`. Analitik
hanya menyimpan metadata ID penunjuk, ukuran, dan hash.

## Gerbang Verifikasi

Gerbang verifikasi terfokus menjalankan pengujian filter inline bawaan tanpa memanggil perintah eksternal melalui shell:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Gerbang RTK yang lebih luas adalah:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Jalankan gerbang kompresi luas sebelum rilis:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Memperluas RTK

1. Tambahkan atau perbarui file JSON filter.
2. Sertakan setidaknya satu sampel `tests[]` yang membuktikan perilaku penting.
3. Tambahkan fixture di bawah `tests/unit/compression/fixtures/rtk/` untuk kelompok perintah baru.
4. Tambahkan cakupan deteksi perintah saat memperkenalkan kelas output baru.
5. Jalankan gerbang verifikasi dan gerbang RTK luas.
6. Jika filter bersifat lokal untuk proyek, commit `.rtk/filters.json` dan perbarui `.rtk/trust.json` hanya setelah peninjauan.

---

## Tingkat Intensitas (v3.8.16+)

RTK mendukung **3 tingkat intensitas** yang menyeimbangkan **agresivitas kompresi** dan **keamanan**. Tingkat tersebut diatur melalui `config.intensity` dalam konfigurasi mesin.

### 3 Tingkat

| Tingkat              | Ambang pemotongan   | Penghematan token | Risiko        | Paling cocok untuk                 |
| -------------------- | ------------------- | ----------------- | ------------- | ---------------------------------- |
| `minimal`            | 24 baris per bagian | ~20-40%           | Sangat rendah | Produksi dengan konteks penting    |
| `standard` (default) | 24 baris per bagian | ~50-70%           | Rendah        | Sesi coding sehari-hari            |
| `aggressive`         | 16 baris per bagian | ~70-90%           | Sedang        | Sesi panjang, penghematan maksimum |

### Lokasi Pemotongan Terjadi

Ambang pemotongan memengaruhi `lineFilter.ts`:

```ts
// Dari open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Baik **bagian awal** maupun **bagian akhir** dari setiap bagian dipertahankan; konten di tengah dibuang saat pemotongan diterapkan.

### Konten yang Dipertahankan vs. Dipotong

| Konten                    | minimal          | standard         | aggressive       |
| ------------------------- | ---------------- | ---------------- | ---------------- |
| Error / stack trace       | ✅ dipertahankan | ✅ dipertahankan | ✅ dipertahankan |
| Kegagalan pengujian       | ✅ dipertahankan | ✅ dipertahankan | ✅ dipertahankan |
| Error build               | ✅ dipertahankan | ✅ dipertahankan | ✅ dipertahankan |
| Pengujian lolos (verbose) | ✅ dipertahankan | 🟡 diringkas     | 🟡 diringkas     |
| Output rutin (log info)   | 🟡 diringkas     | 🟡 diringkas     | ❌ dibuang       |
| Bilah progres             | 🟡 diringkas     | ❌ dibuang       | ❌ dibuang       |
| Banner / seni ASCII       | 🟡 diringkas     | ❌ dibuang       | ❌ dibuang       |

### Memilih Intensitas yang Tepat

```
                  Apakah kehilangan konteks berdampak fatal?
                  │
      ┌───────────┼───────────┐
      │           │           │
     YA         TIDAK       TIDAK YAKIN
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Seberapa penting Coba `standard` terlebih dahulu
      │      throughput?      (cocok untuk 80%
      │           │           kasus)
      │      ┌────┴────┐
      │      │         │
      │   RENDAH      TINGGI
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Mengonfigurasi Intensitas

**Per-combo** (dalam konfigurasi combo):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**Secara terprogram**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) merupakan
`CompressionEngine` dan tidak memiliki metode `updateConfig`. Perbarui konfigurasi mesin
melalui helper registry sebagai gantinya:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Memverifikasi Efeknya

Gunakan **Gerbang Verifikasi** (lihat di bawah) untuk mengonfirmasi bahwa filter Anda aman pada intensitas yang dipilih:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Filter gagal pada intensitas agresif");
}
```

---

## Pengembangan Filter Kustom (v3.8.16+)

Direktori `engines/rtk/filters/` berisi **49+ file JSON filter bawaan**. Anda dapat menambahkan filter sendiri untuk mengompresi keluaran dari alat kustom yang tidak tercakup oleh filter bawaan.

### Skema Filter (Zod)

```ts
{
  "id": "string",                      // Wajib. Pengidentifikasi filter (kebab-case, misalnya, "python-traceback")
  "label": "string",                   // Wajib. Nama filter yang mudah dibaca manusia
  "description": "string",             // Opsional (default: ""). Deskripsi singkat mengenai fungsi filter
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Opsional (0-100, default: 50). Urutan eksekusi (lebih tinggi = lebih dahulu)
  "match": {
    "commands": ["string"],            // Nama perintah yang akan dicocokkan (misalnya, "python", "pytest")
    "patterns": ["string"],            // Pola regex untuk mencocokkan keluaran
    "outputTypes": ["string"]          // Kelas keluaran yang terdeteksi (misalnya, "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Opsional (default: false). Hapus kode warna ANSI
    "replace": [                       // Aturan cari-dan-ganti (default: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Hentikan lebih awal saat pola cocok (default: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Lewati jika pola ini cocok
      }
    ],
    "includePatterns": ["string"],     // Baris yang akan dipertahankan (pola regex, default: [])
    "dropPatterns": ["string"],        // Baris yang akan dihapus (pola regex, default: [])
    "collapsePatterns": ["string"],    // Baris yang akan diringkas menjadi satu kemunculan (default: [])
    "deduplicate": boolean,            // Opsional (default: false). Hapus baris duplikat
    "truncateLineAt": number,          // Opsional (default: 0). Pangkas baris hingga jumlah karakter maksimum
    "maxLines": number,                // Opsional (default: 0). Batas mutlak jumlah baris
    "headLines": number,               // Opsional (default: 20). Pertahankan N baris pertama dari keluaran yang cocok
    "tailLines": number,               // Opsional (default: 20). Pertahankan N baris terakhir dari keluaran yang cocok
    "onEmpty": "string",               // Opsional (default: ""). Pesan pengganti jika semua baris difilter
    "filterStderr": boolean            // Opsional (default: false). Filter juga keluaran stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Pola yang harus selalu dipertahankan (default: [])
    "summaryPatterns": ["string"]      // Pola untuk baris ringkasan akhir (default: [])
  },
  "tests": [                           // Pengujian sebaris untuk verifikasi (default: [])
    {
      "name": "string",               // Wajib. Nama pengujian
      "input": "sample output",        // Wajib. Contoh teks masukan
      "expected": "expected output",   // Wajib. Keluaran terkompresi yang diharapkan
      "command": "optional command"    // Opsional. Konteks perintah
    }
  ]
}
```

### Contoh: Filter Traceback Python

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### Memuat Filter Kustom

Tempatkan file di lokasi yang dikenali:

```
~/.omniroute/rtk/filters/my-filter.json     # Tingkat pengguna
<project>/.rtk/filters/my-filter.json      # Tingkat proyek
```

Filter dimuat secara otomatis saat proses dimulai melalui `loadRtkFilters()` di `open-sse/services/compression/engines/rtk/filterLoader.ts`. Pemuat menemukan filter dari:

- Katalog bawaan: `open-sse/services/compression/engines/rtk/filters/`
- Direktori pengguna: `~/.omniroute/rtk/filters/`
- Direktori proyek: `<project>/.rtk/filters/`

Untuk memuat filter secara terprogram:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Opsi: customFiltersEnabled (memuat filter pengguna/proyek, aktif secara default),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Validasi

Filter divalidasi terhadap skema Zod saat dimuat. Filter dengan struktur yang tidak valid akan gagal dimuat dan mencatat kesalahan:

```
RTK_FILTER_LOADER: filter "my-filter" failed validation:
  - rules.replace.0.pattern: Invalid regex
  - match.commands: must not be empty
```

Untuk memvalidasi semua filter yang terpasang, panggil `runRtkFilterTests()` yang diekspor dari `open-sse/services/compression/engines/rtk/verify.ts`.

### Praktik Terbaik

1. **Selalu sertakan `tests[]`** — pengujian tersebut membuktikan bahwa filter Anda berfungsi dan mencegah regresi
2. **Gunakan `matchOutput` untuk penghentian dini** — jika satu baris sudah cukup menjelaskan, gantikan seluruh blok
3. **Utamakan `keep` daripada `strip`** — aturan eksplisit "selalu pertahankan" lebih aman daripada "selalu hapus"
4. **Uji pada ketiga tingkat intensitas** — `minimal` seharusnya tidak melakukan apa pun, sedangkan `aggressive` harus tetap mempertahankan pesan kesalahan
5. **Gunakan bidang `unless`** — lindungi penghentian dini dengan kondisi "jangan picu jika X ada"

---

## Pemulihan Output Mentah & Gerbang Verifikasi

Ketika RTK mengompresi output secara agresif, Anda dapat **memulihkan teks asli** untuk debugging, audit, atau pemutaran ulang.

### Cara Kerja Pemulihan Output Mentah

```
Output asli (10K token)
        │
        ▼
Kompresi RTK (dengan rawOutput.enabled=true)
        │
        ├─▶ Output terkompresi (2K token)  ──▶ ke LLM
        │
        └─▶ Output asli (10K token)         ──▶ disimpan di DB
                                                  (ditautkan berdasarkan request_id)
```

### Mengaktifkan Penyimpanan Output Mentah

**Per permintaan** (dalam konfigurasi combo):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // Batas 1MB
    }
  }
}
```

**Default**: `rawOutput.enabled: false` (menghemat penyimpanan).

### Biaya Penyimpanan

| Per permintaan               | Batas 1MB     | Batas 10MB     |
| ---------------------------- | ------------- | -------------- |
| Rata-rata output terkompresi | ~5KB          | ~5KB           |
| Output mentah yang disimpan  | ~50-500KB     | ~500KB-5MB     |
| Dengan 1000 permintaan/hari  | 50-500MB/hari | 500MB-5GB/hari |

> **Rekomendasi**: Aktifkan output mentah hanya untuk **sesi debugging** atau **audit berbasis sampel**, bukan secara terus-menerus.

### Memulihkan Output Asli

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId dari statistik kompresi
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` dikembalikan dalam `CompressionStats.rtkRawOutputPointers[]` setelah kompresi.
Lihat `open-sse/services/compression/engines/rtk/rawOutput.ts:102` untuk signature fungsi tersebut.

### Gerbang Verifikasi

**Verifikasi Filter RTK** (`open-sse/services/compression/engines/rtk/verify.ts`) memvalidasi semua filter terhadap `tests[]` masing-masing dan memastikan perilakunya benar pada ketiga tingkat intensitas.

**Panggil `runRtkFilterTests()`** untuk menjalankan verifikasi:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`Passed: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`Failed: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("Filters failed verification");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: expected "${o.expected}", got "${o.actual}"`
      );
    });
}
```

**Yang divalidasi**:

1. Setiap filter dimuat dan lolos validasi skema
2. Setiap entri `tests[]` menghasilkan output yang diharapkan
3. Intensitas `minimal` tidak melakukan perubahan (mempertahankan output asli dan hanya menerapkan filter struktural)
4. Intensitas `aggressive` mempertahankan error, kegagalan pengujian, dan stack trace
5. Output terkompresi tidak pernah lebih besar daripada input asli

- Sumber: `open-sse/services/compression/engines/rtk/` (63 file, ~70KB)

- **Sebelum menggabungkan perubahan filter** — selalu pastikan pengujian berhasil
- **Setelah meningkatkan versi engine RTK** — skema mungkin telah berubah
- **Secara berkala dalam pemantauan** — melindungi dari pergeseran pada fixture pengujian
- **Saat menambahkan keluarga tool/perintah baru** — membuktikan bahwa filter baru berfungsi

---

## Lihat Juga

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Ikhtisar lengkap pipeline kompresi
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registri engine dan engine bawaan
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Engine khusus, paket bahasa, pipeline bertumpuk
- Sumber: `open-sse/services/compression/engines/rtk/` (63 file, ~70KB)
