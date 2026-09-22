# RTK Compression (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

Pemampatan RTK ialah enjin pemampatan OmniRoute yang menyedari perintah untuk output terminal dan alat. Ia
direka bentuk untuk sesi ejen pengekodan yang kebanyakan pertumbuhan konteksnya berpunca daripada log ujian, output binaan,
hingar pengurus pakej, transkrip shell, output Docker, output git dan jejak tindanan.

RTK boleh dijalankan secara langsung dengan `defaultMode: "rtk"` atau sebagai langkah pertama dalam saluran bertindan, biasanya:

```txt
rtk -> caveman
```

Susunan tersebut memampatkan output mesin yang bising terlebih dahulu, kemudian membolehkan Caveman memadatkan prosa yang tinggal.

RTK huluan melaporkan penjimatan output perintah sebanyak `60-90%`. Sesi contoh dalam README-nya berkurang daripada
`~118,000` token standard kepada `~23,900` token RTK, iaitu penjimatan sebanyak `79.7%` (`~80%`). OmniRoute menggunakan
purata huluan tersebut untuk pengiraan penjimatan bertindan dengan pemampatan input Caveman:

```txt
Purata RTK:     80% dijimatkan
Input Caveman: 46% dijimatkan
Bertindan:     1 - (1 - 0.80) * (1 - 0.46) = 89.2% dijimatkan
Julat:         1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Kandungan yang Dimampatkan

Katalog terbina dalam pada masa ini menyediakan 49 penapis merentas kategori berikut:

| Kategori  | Contoh                                                        |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, ujian Go, ujian Cargo       |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, log shell generik                       |
| `docker`  | `docker ps`, log Docker                                       |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | Output JSON, jejak tindanan, sandaran output generik          |

Pengesan dalam `open-sse/services/compression/engines/rtk/commandDetector.ts` mengelaskan output
sebelum pemilihan penapis. Penapis juga boleh dipadankan berdasarkan corak perintah atau regex output apabila kelas
perintah tidak mencukupi.

## Penyelesaian Penapis

RTK memuatkan penapis mengikut susunan ini:

1. Penapis projek daripada `.rtk/filters.toml` dan `.rtk/filters.json`, hanya apabila dipercayai.
2. Penapis global daripada `DATA_DIR/rtk/filters.toml` dan `DATA_DIR/rtk/filters.json`.
3. Penapis terbina dalam daripada `open-sse/services/compression/engines/rtk/filters/`.

Dalam skop yang sama, penapis skema TOML RTK v1 diberikan keutamaan berbanding penapis JSON OmniRoute. Ungkapan TOML
`match_command` disemak sebelum pemadanan jenis perintah supaya penapis khusus perintah yang diimport
boleh mengatasi penapis yang lebih luas dalam skop tersebut. Skop projek masih diberikan keutamaan berbanding skop global,
tanpa mengira format fail.

Penapis projek sengaja dikawal berdasarkan kepercayaan kerana penapis regex boleh mengubah cara output alat
dipaparkan kepada ejen. Fail penapis projek diterima apabila salah satu daripada syarat berikut dipenuhi:

- `rtkConfig.trustProjectFilters` ialah `true`.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` ditetapkan.
- `.rtk/trust.json` mengandungi cincangan SHA-256 yang sepadan untuk fail penapis projek.

Contoh fail kepercayaan:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

Cincangan tersebut adalah berasingan: `filtersSha256` mempercayai `.rtk/filters.json`, manakala `filtersTomlSha256`
mempercayai `.rtk/filters.toml`. Penyuntingan mana-mana fail hanya membatalkan entri kepercayaannya sendiri. Fail global
dipasang oleh pentadbir dan menggunakan tingkah laku kepercayaan penapis global yang sedia ada.

Penapis tersuai boleh terdiri daripada satu objek penapis atau tatasusunan objek penapis. Penapis tersuai yang tidak sah akan
dilangkau dan dilaporkan oleh diagnostik `/api/context/rtk/filters`. Penapis terbina dalam yang tidak sah menyebabkan kegagalan serta-merta.

## Keserasian skema RTK TOML v1

OmniRoute boleh menghuraikan, mengesahkan, menguji dan memasang fail penapis deklaratif menggunakan skema RTK TOML v1.
Medan yang disokong ialah `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty` dan ujian sebaris `[[tests.<filter>]]`.
Medan yang tidak diketahui, ungkapan nalar yang tidak sah atau tidak selamat, peraturan buang/simpan serentak, fail yang melebihi
1 MiB dan rujukan kepada penapis yang tidak diketahui akan ditolak. Fail yang gagal dalam ujian sebarisnya boleh
disahkan untuk pemeriksaan tetapi tidak boleh dipasang atau dimuatkan. Kegagalan memuatkan fail tersuai kekal
terbuka apabila gagal: fail yang tidak sah akan dilangkau dan penapis lain akan terus berfungsi.

OmniRoute menerima output alat selepas klien selesai menangkapnya, jadi `filter_stderr = true`
tidak boleh mengubah penangkapan proses. Medan ini diterima sebagai tanpa operasi dan pengesahan mengembalikan amaran.
Hal ini sengaja diterangkan sebagai **keserasian skema RTK TOML v1**, bukannya keserasian penuh
dengan boleh laku RTK, cangkuk shell, pelaksanaan perintah Rust atau susun atur stor amanahnya.

Paparan RTK lanjutan pada papan pemuka menerima TOML yang ditampal atau dimuat naik. Pengesahan adalah baca sahaja.
Pemasangan menulis `DATA_DIR/rtk/filters.toml` secara atomik dengan keizinan terhad dan menyegarkan
katalog penapis langsung tanpa perlu dimulakan semula. Menggantikan fail sedia ada memerlukan pengesahan `overwrite`
secara jelas dan menghasilkan `DATA_DIR/rtk/filters.toml.bak` terlebih dahulu.

## DSL Penapis

Penapis menggunakan skema JSON yang diterangkan dalam [Format Peraturan Pemampatan](./COMPRESSION_RULES_FORMAT.md).
Masa jalan menggunakan peringkat berikut mengikut turutan:

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> buang/sertakan baris
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

Medan penting:

| Medan                        | Tujuan                                                                        |
| ---------------------------- | ----------------------------------------------------------------------------- |
| `rules.stripAnsi`            | Mengalih keluar jujukan warna/kawalan terminal sebelum pemadanan              |
| `rules.filterStderr`         | Menormalkan awalan stderr lazim sebelum pemadanan/penapisan                   |
| `rules.replace`              | Menggunakan penggantian ungkapan nalar secara berurutan                       |
| `rules.matchOutput`          | Mengembalikan ringkasan padat apabila output sepadan dengan keadaan diketahui |
| `rules.matchOutput[].unless` | Melangkau pintasan apabila terdapat corak ralat/kegagalan                     |
| `rules.dropPatterns`         | Mengalih keluar baris yang mengganggu                                         |
| `rules.includePatterns`      | Mengutamakan baris yang boleh diambil tindakan                                |
| `rules.collapsePatterns`     | Meruntuhkan baris sepadan yang berulang                                       |
| `rules.deduplicate`          | Ikut serta bagi setiap penapis: meruntuhkan baris pendua berturut-turut       |
| `rules.truncateLineAt`       | Pemangkasan setiap baris yang selamat untuk Unicode                           |
| `rules.onEmpty`              | Mesej sandaran jika semua baris ditapis keluar                                |
| `tests[]`                    | Sampel sebaris yang digunakan oleh pintu pengesahan                           |

Penapis terbina dalam dijangka menyertakan sampel `tests[]` sebaris. Penapis tersuai juga sepatutnya
menyertakannya, terutamanya apabila dikongsi merentas projek.

## Penyahduplikasian Baris (dua lapisan)

RTK menggabungkan baris pendua pada dua lapisan bebas:

1. **`deduplicate` bagi setiap penapis (pilihan serta aktif, lalai `false`).** Penapis boleh menetapkan `rules.deduplicate: true`
   untuk menggabungkan baris pendua berturutan _dalam output sepadan penapis tersebut_, sebelum pemangkasan.
   Proses ini dijalankan dalam `lineFilter.ts`. Untuk penapis legasi, ia didayakan secara automatik apabila penapis mentakrifkan
   `collapsePatterns`. Skema: `deduplicate: z.boolean().default(false)` dalam
   `open-sse/services/compression/engines/rtk/filterSchema.ts`.
2. **`deduplicateThreshold` seluruh enjin (lalai `3`).** Selepas semua penapis dijalankan, enjin menggabungkan
   sebarang jujukan `>= deduplicateThreshold` baris berturutan yang serupa merentas keseluruhan hasil
   (`deduplicateRepeatedLines`, digunakan dalam `engines/rtk/index.ts`). Nilai ini dihadkan kepada 2–100 ketika
   penormalan.

Proses bagi setiap penapis dijalankan dahulu (dalam penapis), manakala proses seluruh enjin dijalankan terakhir (pada output
yang telah digabungkan), maka kedua-duanya berfungsi bersama tanpa pengiraan berganda.

## Pengumpulan Baris (`enableGrouping`)

Apabila `rtkConfig.enableGrouping` ialah `true` (lalai `false`), RTK menjalankan proses tambahan `groupSimilarLines`
pada hasil selepas penyahduplikasian yang menggabungkan jujukan baris berturutan yang _hampir setara_ (bukan serupa bait demi bait).
`rtkConfig.groupingThreshold` (lalai `3`) ialah panjang jujukan minimum yang mencetuskan
pengumpulan. Ini ialah padanan berstruktur kepada `deduplicateThreshold`: penyahduplikasian mengendalikan pengulangan tepat,
manakala pengumpulan mengendalikan "bentuk yang sama dengan sedikit perbezaan". Kedua-dua bendera merupakan sebahagian daripada JSON `rtkConfig`
yang disimpan dalam jadual `key_value` (lihat Konfigurasi di atas), maka tetapan tersebut kekal selepas dimulakan semula.

## Pembuangan Komen Kod (`stripCodeComments` / `preserveDocstrings`)

Apabila `rtkConfig.applyToCodeBlocks` didayakan, RTK juga boleh membuang komen daripada blok kod berpagar:

- `stripCodeComments` (lalai `false`) — pilihan serta aktif. Apabila `true`, RTK membuang komen daripada blok berpagar JavaScript
  dan TypeScript. Pada masa lalu, bendera ini dibaca tetapi tidak pernah digunakan, maka nilai lalainya kekal
  sebagai "kekalkan" untuk mengelakkan perubahan produksi secara senyap.
- `preserveDocstrings` (lalai `true`) — apabila membuang komen, komen blok JSDoc/`/** … */`
  dikekalkan (komen tersebut mengandungi dokumentasi API yang lebih bernilai daripada bait yang digunakannya). Tetapkan kepada `false` untuk turut membuang
  komen tersebut.

Pembuangan komen dilaksanakan dalam `open-sse/services/compression/engines/rtk/codeStripper.ts`. Ia menggunakan
**penghurai TypeScript** (bukan regex), supaya literal rentetan, templat dan regex tidak sekali-kali disalah anggap
sebagai komen, dan proses dibatalkan sepenuhnya apabila JSX dikesan (supaya komen bekas ungkapan JSX
tidak sekali-kali dirosakkan). Pembuangan komen pada masa ini hanya digunakan untuk **JavaScript dan TypeScript** — bahasa lain
dalam set `CodeLanguage` milik pembuang tersebut (Python, Rust, Go, Ruby, Java) mempunyai penggabungan baris kosong dan
ruang putih tetapi tiada pembuangan komen. Proses blok yang dibuang ditandai `rtk:code-strip` dalam
`rulesApplied`.

> **Nota — pengekodan GCF / jadual ialah enjin yang berasingan.** RTK **tidak** mengandungi pengekod JSON jadual/berkolum
> "GCF" (Graph Compact Format). Pengekod tersebut — yang menggantikan pengekod lama
> `omni-tabular` — berada dalam enjin **headroom**
> (`open-sse/services/compression/engines/headroom/`, dengan codec vendor di bawah
> `headroom/gcf/`). Ia tidak berkaitan dengan talian paip penapis RTK yang didokumentasikan di sini.

## Konfigurasi

Tetapan global tersedia melalui `/api/settings/compression`. Tetapan khusus RTK juga
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

`enabledFilters` dan `disabledFilters` menggunakan ID penapis, contohnya `test-vitest` atau `git-diff`.

Struktur penuh `rtkConfig` ditakrifkan oleh `RtkConfig` / `DEFAULT_RTK_CONFIG` dalam
`open-sse/services/compression/types.ts`. Keseluruhan objek disimpan sebagai satu nilai JSON dalam
jadual SQLite `key_value` di bawah `namespace = "compression"`, `key = "rtkConfig"`
(`src/lib/db/compression.ts`), dan dinormalkan semasa dibaca oleh `normalizeRtkConfig`. Oleh itu, setiap medan di bawah
— termasuk `enableGrouping`, `groupingThreshold`, `stripCodeComments`, dan `preserveDocstrings` —
melalui proses pergi balik dalam stor yang sama dan kekal tersedia selepas dimulakan semula.

| Kunci                  | Lalai   | Tujuan                                                                                                 |
| ---------------------- | ------- | ------------------------------------------------------------------------------------------------------ |
| `deduplicateThreshold` | `3`     | Seluruh enjin: bilangan minimum baris serupa berturut-turut untuk diringkaskan (dihadkan kepada 2–100) |
| `enableGrouping`       | `false` | Pilihan ikut serta: ringkaskan rentetan baris berturut-turut yang hampir setara                        |
| `groupingThreshold`    | `3`     | Rentetan minimum baris serupa berturut-turut yang mencetuskan pengelompokan                            |
| `stripCodeComments`    | `false` | Pilihan ikut serta: alih keluar komen daripada blok kod berpagar (memerlukan `applyToCodeBlocks`)      |
| `preserveDocstrings`   | `true`  | Semasa membuang komen, kekalkan blok JSDoc/`/** … */`                                                  |

## API

| Laluan                             | Kaedah | Tujuan                                             |
| ---------------------------------- | ------ | -------------------------------------------------- |
| `/api/context/rtk/config`          | GET    | Baca konfigurasi RTK                               |
| `/api/context/rtk/config`          | PUT    | Kemas kini konfigurasi RTK                         |
| `/api/context/rtk/filters`         | GET    | Senaraikan katalog penapis dan diagnostik pemuatan |
| `/api/context/rtk/import`          | POST   | Sahkan atau pasang fail skema RTK TOML v1          |
| `/api/context/rtk/test`            | POST   | Pratonton pemampatan RTK untuk satu muatan teks    |
| `/api/context/rtk/raw-output/[id]` | GET    | Baca output mentah tersunting yang disimpan        |
| `/api/compression/preview`         | POST   | Pratonton sebarang mod pemampatan                  |

Muatan ujian RTK:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

Muatan pratonton pemampatan:

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

Laluan pengurusan memerlukan pengesahan pengurusan papan pemuka atau dasar kunci API yang sepadan.

Muatan pengesahan RTK TOML:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

Gunakan `"action": "install"` untuk memasang fail yang telah disahkan secara global. Tambahkan `"overwrite": true` hanya
selepas menyemak dan mengesahkan penggantian fail global yang sedia ada.

## Pemulihan Output Mentah

RTK biasanya hanya mengembalikan teks yang dimampatkan. Untuk penyahpepijatan, `rawOutputRetention` boleh mengekalkan output mentah yang telah disunting:

| Nilai      | Tingkah laku                                                          |
| ---------- | --------------------------------------------------------------------- |
| `never`    | Jangan kekalkan output mentah                                         |
| `failures` | Kekalkan hanya output yang berkemungkinan menunjukkan kegagalan       |
| `always`   | Kekalkan setiap output mentah RTK yang dimampatkan, selepas suntingan |

Fail yang dikekalkan ditulis di bawah:

```txt
DATA_DIR/rtk/raw-output/
```

Rahsia disunting sebelum penyimpanan, termasuk token pembawa lazim, kunci API, token Slack,
kunci akses AWS dan nilai berbentuk penetapan `token=...`, `secret=...`, `password=...`. Analitis
hanya menyimpan ID penuding, saiz dan metadata cincangan.

## Get Pengesahan

Get pengesahan berfokus menjalankan ujian penapis sebaris terbina dalam tanpa menggunakan perintah luaran melalui shell:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

Get RTK yang lebih luas ialah:

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

Jalankan get pemampatan luas sebelum keluaran:

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## Memperluas RTK

1. Tambah atau kemas kini fail JSON penapis.
2. Sertakan sekurang-kurangnya satu sampel `tests[]` yang membuktikan tingkah laku penting.
3. Tambah lekapan di bawah `tests/unit/compression/fixtures/rtk/` untuk keluarga perintah baharu.
4. Tambah liputan pengesanan perintah apabila memperkenalkan kelas output baharu.
5. Jalankan get pengesahan dan get RTK yang lebih luas.
6. Jika penapis adalah setempat untuk projek, komit `.rtk/filters.json` dan segarkan semula `.rtk/trust.json` hanya selepas semakan.

---

## Tahap Keamatan (v3.8.16+)

RTK menyokong **3 tahap keamatan** yang mengimbangi antara **keagresifan pemampatan** dengan **keselamatan**. Tahap tersebut ditetapkan melalui `config.intensity` dalam konfigurasi enjin.

### 3 Tahap

| Tahap              | Ambang pemangkasan       | Penjimatan token | Risiko        | Paling sesuai untuk                 |
| ------------------ | ------------------------ | ---------------- | ------------- | ----------------------------------- |
| `minimal`          | 24 baris setiap bahagian | ~20-40%          | Sangat rendah | Pengeluaran dengan konteks kritikal |
| `standard` (lalai) | 24 baris setiap bahagian | ~50-70%          | Rendah        | Sesi pengekodan harian              |
| `aggressive`       | 16 baris setiap bahagian | ~70-90%          | Sederhana     | Sesi panjang, penjimatan maksimum   |

### Tempat Pemangkasan Berlaku

Ambang pemangkasan mempengaruhi `lineFilter.ts`:

```ts
// Daripada open-sse/services/compression/engines/rtk/index.ts:329-330
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

Kedua-dua bahagian **kepala** dan **ekor** setiap bahagian dikekalkan; kandungan tengah dibuang apabila pemangkasan dicetuskan.

### Kandungan yang Dikekalkan berbanding Kandungan yang Dipotong

| Kandungan                    | minimal         | standard        | aggressive      |
| ---------------------------- | --------------- | --------------- | --------------- |
| Ralat / surih tindanan       | ✅ dikekalkan   | ✅ dikekalkan   | ✅ dikekalkan   |
| Kegagalan ujian              | ✅ dikekalkan   | ✅ dikekalkan   | ✅ dikekalkan   |
| Ralat binaan                 | ✅ dikekalkan   | ✅ dikekalkan   | ✅ dikekalkan   |
| Ujian berjaya (berjela-jela) | ✅ dikekalkan   | 🟡 diringkaskan | 🟡 diringkaskan |
| Output rutin (log maklumat)  | 🟡 diringkaskan | 🟡 diringkaskan | ❌ dibuang      |
| Bar kemajuan                 | 🟡 diringkaskan | ❌ dibuang      | ❌ dibuang      |
| Sepanduk / seni ASCII        | 🟡 diringkaskan | ❌ dibuang      | ❌ dibuang      |

### Memilih Keamatan yang Sesuai

```
                  Adakah kehilangan konteks membawa akibat buruk?
                  │
      ┌───────────┼───────────┐
      │           │           │
     YA          TIDAK      TIDAK PASTI
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      Sejauh mana     Cuba `standard` dahulu
      │      kritikalnya     (sesuai untuk 80%
      │      daya pemprosesan? kes)
      │           │
      │      ┌────┴────┐
      │      │         │
      │    RENDAH     TINGGI
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### Mengkonfigurasi Keamatan

**Mengikut kombo** (dalam konfigurasi kombo):

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

**Secara pengaturcaraan**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`) ialah
`CompressionEngine` dan tidak mempunyai kaedah `updateConfig`. Kemas kini konfigurasi enjin
melalui pembantu pendaftaran:

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### Mengesahkan Kesannya

Gunakan **Get Pengesahan** (lihat di bawah) untuk mengesahkan bahawa penapis anda selamat pada keamatan yang dipilih:

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("Penapis gagal pada keamatan agresif");
}
```

---

## Pembangunan Penapis Tersuai (v3.8.16+)

Direktori `engines/rtk/filters/` mengandungi **49+ fail JSON penapis terbina dalam**. Anda boleh menambah penapis anda sendiri untuk memampatkan output daripada alat tersuai yang tidak diliputi oleh penapis lalai.

### Skema Penapis (Zod)

```ts
{
  "id": "string",                      // Wajib. Pengecam penapis (kebab-case, cth., "python-traceback")
  "label": "string",                   // Wajib. Nama penapis yang boleh dibaca oleh manusia
  "description": "string",             // Pilihan (lalai: ""). Penerangan ringkas tentang fungsi penapis
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // Pilihan (0-100, lalai: 50). Turutan pelaksanaan (lebih tinggi = dahulu)
  "match": {
    "commands": ["string"],            // Nama perintah untuk dipadankan (cth., "python", "pytest")
    "patterns": ["string"],            // Corak regex untuk memadankan output
    "outputTypes": ["string"]          // Kelas output yang dikesan (cth., "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // Pilihan (lalai: false). Buang kod warna ANSI
    "replace": [                       // Peraturan cari dan ganti (lalai: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // Hentikan pemprosesan awal apabila corak sepadan (lalai: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // Langkau jika corak ini sepadan
      }
    ],
    "includePatterns": ["string"],     // Baris untuk dikekalkan (corak regex, lalai: [])
    "dropPatterns": ["string"],        // Baris untuk dibuang (corak regex, lalai: [])
    "collapsePatterns": ["string"],    // Baris untuk diringkaskan kepada satu kejadian (lalai: [])
    "deduplicate": boolean,            // Pilihan (lalai: false). Buang baris pendua
    "truncateLineAt": number,          // Pilihan (lalai: 0). Pangkas baris kepada bilangan aksara maksimum
    "maxLines": number,                // Pilihan (lalai: 0). Had mutlak bagi jumlah baris
    "headLines": number,               // Pilihan (lalai: 20). Kekalkan N baris pertama output yang sepadan
    "tailLines": number,               // Pilihan (lalai: 20). Kekalkan N baris terakhir output yang sepadan
    "onEmpty": "string",               // Pilihan (lalai: ""). Mesej sandaran jika semua baris ditapis
    "filterStderr": boolean            // Pilihan (lalai: false). Turut tapis output stderr
  },
  "preserve": {
    "errorPatterns": ["string"],       // Corak yang mesti sentiasa dikekalkan (lalai: [])
    "summaryPatterns": ["string"]      // Corak untuk baris ringkasan akhir (lalai: [])
  },
  "tests": [                           // Ujian sebaris untuk pengesahan (lalai: [])
    {
      "name": "string",               // Wajib. Nama ujian
      "input": "sample output",        // Wajib. Teks input sampel
      "expected": "expected output",   // Wajib. Output termampat yang dijangkakan
      "command": "optional command"    // Pilihan. Konteks perintah
    }
  ]
}
```

### Contoh: Penapis Jejak Balik Python

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

### Memuatkan Penapis Tersuai

Letakkan fail di lokasi yang dikenali:

```
~/.omniroute/rtk/filters/my-filter.json     # Peringkat pengguna
<project>/.rtk/filters/my-filter.json      # Peringkat projek
```

Penapis dimuatkan secara automatik semasa permulaan melalui `loadRtkFilters()` dalam `open-sse/services/compression/engines/rtk/filterLoader.ts`. Pemuat menemukan penapis daripada:

- Katalog terbina dalam: `open-sse/services/compression/engines/rtk/filters/`
- Direktori pengguna: `~/.omniroute/rtk/filters/`
- Direktori projek: `<project>/.rtk/filters/`

Untuk memuatkan penapis secara pengaturcaraan:

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// Pilihan: customFiltersEnabled (muatkan penapis pengguna/projek, diaktifkan secara lalai),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### Pengesahan

Penapis disahkan terhadap skema Zod semasa dimuatkan. Penapis dengan struktur yang tidak sah akan gagal dimuatkan dan ralat akan direkodkan:

```
RTK_FILTER_LOADER: penapis "my-filter" gagal pengesahan:
  - rules.replace.0.pattern: Regex tidak sah
  - match.commands: tidak boleh kosong
```

Untuk mengesahkan semua penapis yang dipasang, panggil `runRtkFilterTests()` yang dieksport daripada `open-sse/services/compression/engines/rtk/verify.ts`.

### Amalan Terbaik

1. **Sentiasa sertakan `tests[]`** — ia membuktikan penapis anda berfungsi dan mencegah regresi
2. **Gunakan `matchOutput` untuk pintasan** — jika satu baris sudah memadai untuk menyampaikan maksud, gantikan keseluruhan blok
3. **Utamakan `keep` berbanding `strip`** — peraturan eksplisit "sentiasa kekalkan" lebih selamat daripada "sentiasa alih keluar"
4. **Uji pada ketiga-tiga tahap keamatan** — `minimal` sepatutnya tidak melakukan apa-apa, manakala `aggressive` masih perlu mengekalkan ralat
5. **Gunakan medan `unless`** — lindungi pintasan dengan syarat "jangan cetuskan jika X hadir"

---

## Pemulihan Output Mentah & Get Pengesahan

Apabila RTK memampatkan output secara agresif, anda boleh **memulihkan teks asal** untuk penyahpepijatan, audit atau main semula.

### Cara Pemulihan Output Mentah Berfungsi

```
Output asal (10K token)
        │
        ▼
Pemampatan RTK (dengan rawOutput.enabled=true)
        │
        ├─▶ Output termampat (2K token)  ──▶ kepada LLM
        │
        └─▶ Output asal (10K token)      ──▶ disimpan dalam DB
                                                  (dipautkan melalui request_id)
```

### Mendayakan Penyimpanan Output Mentah

**Bagi setiap permintaan** (dalam konfigurasi kombo):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // had 1MB
    }
  }
}
```

**Lalai**: `rawOutput.enabled: false` (menjimatkan ruang penyimpanan).

### Kos Penyimpanan

| Bagi setiap permintaan      | Had 1MB       | Had 10MB       |
| --------------------------- | ------------- | -------------- |
| Purata output termampat     | ~5KB          | ~5KB           |
| Output mentah yang disimpan | ~50-500KB     | ~500KB-5MB     |
| Dengan 1000 permintaan/hari | 50-500MB/hari | 500MB-5GB/hari |

> **Saranan**: Dayakan output mentah hanya untuk **sesi penyahpepijatan** atau **pengauditan bersampel**, bukan secara berterusan.

### Memulihkan Output Asal

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // pointerId daripada statistik pemampatan
if (raw) {
  console.log("Original output:", raw);
}
```

`pointerId` dikembalikan dalam `CompressionStats.rtkRawOutputPointers[]` selepas pemampatan.
Lihat `open-sse/services/compression/engines/rtk/rawOutput.ts:102` untuk tandatangan fungsi.

### Get Pengesahan

**Pengesahan Penapis RTK** (`open-sse/services/compression/engines/rtk/verify.ts`) mengesahkan semua penapis berdasarkan `tests[]` masing-masing dan memastikan tingkah laku adalah betul pada kesemua 3 tahap keamatan.

**Panggil `runRtkFilterTests()`** untuk menjalankan pengesahan:

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

**Perkara yang disahkan**:

1. Setiap penapis dimuatkan dan lulus pengesahan skema
2. Setiap entri `tests[]` menghasilkan output yang dijangkakan
3. Keamatan `minimal` tidak melakukan apa-apa (mengekalkan yang asal, hanya menggunakan penapis struktur)
4. Keamatan `aggressive` mengekalkan ralat, kegagalan ujian dan surihan tindanan
5. Output termampat tidak pernah lebih besar daripada input asal

- Sumber: `open-sse/services/compression/engines/rtk/` (63 fail, ~70KB)

- **Sebelum menggabungkan perubahan penapis** — sentiasa pastikan ujian lulus
- **Selepas menaik taraf enjin RTK** — skema mungkin telah berubah
- **Secara berkala dalam pemantauan** — melindungi daripada penyimpangan dalam lekapan ujian
- **Apabila menambahkan keluarga alat/perintah baharu** — membuktikan penapis baharu berfungsi

---

## Lihat Juga

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Gambaran keseluruhan saluran pemprosesan pemampatan
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Daftar enjin dan enjin terbina dalam
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — Enjin tersuai, pek bahasa, saluran pemprosesan bertindan
- Sumber: `open-sse/services/compression/engines/rtk/` (63 fail, ~70KB)
