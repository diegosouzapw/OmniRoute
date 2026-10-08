# 🗜️ Prompt Compression Guide — OmniRoute (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Hemat 15-95% pada konteks yang memenuhi syarat secara otomatis. Untuk ringkasan singkat, lihat [bagian Kompresi README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Ringkasan

OmniRoute mengimplementasikan pipeline kompresi prompt modular yang berjalan secara **proaktif** sebelum permintaan mencapai penyedia upstream. Artinya, penghematan token berlangsung secara transparan — tidak perlu mengubah alur kerja Anda.

```
Permintaan Klien
  → Pemilih Strategi Kompresi
    → Ada penggantian combo? → Gunakan pengaturan combo
    → Ambang pemicu otomatis tercapai? → Gunakan mode otomatis
    → Ada mode default? → Gunakan pengaturan global
    → Nonaktif? → Lewati kompresi
  → Mode Kompresi yang Dipilih
    → Nonaktif: Tanpa kompresi
    → Ringan: Pembersihan spasi/format yang aman (~15%)
    → Standar: Penghapusan kata pengisi bergaya manusia gua (~30%)
    → Agresif: Penuaan riwayat + peringkasan (~50%)
    → Ultra: Pemangkasan heuristik + penipisan blok kode (~75%)
    → RTK: Pemfilteran output terminal/alat yang memahami perintah (rentang upstream 60-90%)
    → Bertumpuk: Pipeline multi-mesin berurutan, biasanya RTK lalu Caveman (rentang yang memenuhi syarat 78-95%)
  → Permintaan Terkompresi → Penyedia
```

---

## Mode Kompresi

### Nonaktif

Tidak ada kompresi yang diterapkan. Semua pesan diteruskan tanpa perubahan.

### Mode Ringan (penghematan ~15%, latensi <1ms)

Mode paling aman — tanpa perubahan semantik, hanya pembersihan format:

| Teknik                   | Deskripsi                                               |
| ------------------------ | ------------------------------------------------------- |
| `collapseWhitespace`     | Menggabungkan baris kosong berurutan dan spasi di akhir |
| `dedupSystemPrompt`      | Menghapus pesan sistem duplikat                         |
| `compressToolResults`    | Mengompresi output alat/fungsi yang bertele-tele        |
| `removeRedundantContent` | Menghapus instruksi yang berulang                       |
| `replaceImageUrls`       | Memperpendek URI data gambar base64                     |

**Paling cocok untuk:** Penggunaan yang selalu aktif dan alur kerja yang sangat mengutamakan keselamatan.

### Mode Standar (penghematan ~30%)

Terinspirasi oleh [Caveman](https://github.com/JuliusBrussee/caveman) — menghapus kata pengisi dan frasa bertele-tele sambil mempertahankan makna:

- Menghapus kata pengisi ("please", "I think", "basically", "actually")
- Meringkas frasa bertele-tele ("in order to" → "to", "as a result of" → "because")
- Menghapus ungkapan sopan yang tidak tegas ("Would you mind...", "If you could possibly...")
- 30+ aturan regex yang disesuaikan untuk prompt pemrograman

**Paling cocok untuk:** Alur kerja pemrograman sehari-hari dan tim yang sadar biaya.

### Mode Agresif (penghematan ~50%)

Pengelolaan riwayat cerdas untuk sesi panjang:

- **Penuaan Pesan** — pesan lama dikompresi secara progresif
- **Kompresi Hasil Alat** — output alat yang panjang dipotong atau dihilangkan (baris pertama/terakhir,
  pemfilteran baris yang cocok, pemadatan kunci JSON)
- **Pelindung Integritas Struktural** — memastikan pasangan `tool_use` + `tool_result` tetap konsisten
- **Kesadaran Jendela Konteks** — mematuhi batas token per model

**Paling cocok untuk:** Sesi debugging yang panjang dan basis kode besar.

### Mode Ultra (penghematan ~75%)

Kompresi maksimum untuk skenario yang sangat terbatas oleh token:

- **Pemangkasan Heuristik** — pemangkasan token prosa berbasis skor
- **Pelestarian Struktur** — blok kode berpagar, kode inline, URL, dan pengidentifikasi
  diberi penanda sementara dan disusun kembali secara verbatim, tidak pernah dipangkas
- **Tingkat SLM opsional** — model lokal kecil dapat menyempurnakan pemangkasan jika dikonfigurasi
- Independen dari mode Agresif: mode ini tidak menjalankan penuaan pesan, kompresi hasil alat,
  atau peringkas fallback (hanya kegagalan pada tingkat SLM yang dapat mengarahkan proses fallback melalui
  mode agresif)

**Paling cocok untuk:** Saat Anda berulang kali mencapai batas konteks.

### Mode RTK (rentang upstream 60-90%)

Mode RTK dioptimalkan untuk output alat bertele-tele yang muncul dalam sesi agen pemrograman:

- Mendeteksi kelas perintah/output seperti `git status`, `git diff`, `git log`, eksekutor pengujian,
  build TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audit/instalasi npm, log Docker, output
  infrastruktur, dan output shell generik
- Menerapkan paket filter JSON dari `open-sse/services/compression/engines/rtk/filters/`
- Mengimpor filter skema TOML RTK v1 dari file `filters.toml` proyek atau global, dengan validasi
  pengujian inline dan pembatasan berbasis kepercayaan untuk file proyek
- Menyertakan 55 filter bawaan dengan sampel verifikasi inline
- Menghapus urutan kontrol ANSI, bilah kemajuan, baris berulang, dan derau yang tidak dapat ditindaklanjuti
- Mempertahankan kegagalan, error, peringatan, file yang berubah, ringkasan, dan bagian akhir output panjang
- Mendukung filter proyek berbasis kepercayaan, filter global, dan pemulihan opsional untuk output mentah yang telah disunting

**Paling cocok untuk:** Sesi agen dengan transkrip shell, build, pengujian, git, grep, dan output file.

### Mode Bertumpuk (rentang yang memenuhi syarat 78-95%)

Mode Bertumpuk menjalankan beberapa mesin kompresi dalam urutan deterministik. Pipeline default-nya adalah:

```txt
RTK -> Caveman
```

Urutan tersebut memadatkan output terminal/alat terlebih dahulu, lalu menerapkan pemadatan semantik Caveman pada
prompt bahasa alami yang tersisa. Pipeline bertumpuk dapat dikonfigurasi secara global atau melalui
combo kompresi yang ditetapkan ke combo perutean.

**Paling cocok untuk:** Konteks campuran dengan log alat berukuran besar beserta instruksi manusia atau ringkasan asisten.

---

## Perhitungan Penghematan Upstream

OmniRoute mendokumentasikan penghematan kompresi dari dua sumber: tolok ukur proyek upstream dan
komposisi mesin OmniRoute sendiri.

| Sumber  | Angka README upstream yang digunakan di sini                                                                                       |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` lebih sedikit token output, rata-rata penghematan output tolok ukur `65%`, rentang `22-87%`, dan alat kompresi input `~46%` |
| RTK     | Penghematan output perintah sebesar `60-90%`; sesi contoh `~118,000 -> ~23,900` token, atau penghematan `79.7%` (`~80%`)           |

Untuk payload alat/konteks yang tumpang tindih, kombinasi default OmniRoute menumpuk mesin-mesin tersebut:

```txt
RTK -> Caveman
```

Penghematan gabungannya bersifat multiplikatif, bukan aditif:

```txt
gabungan  = 1 - (1 - penghematan RTK) * (1 - penghematan input Caveman)
rata-rata = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
rentang   = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Angka `78-95%` tersebut berlaku ketika RTK dan Caveman sama-sama dapat mengurangi payload input/konteks yang sama.
Mode output respons Caveman bersifat terpisah: ketika diaktifkan, gunakan penghematan output Caveman sendiri (rata-rata
`65%`, angka utama `~75%`, rentang `22-87%`). Total penghematan biaya bergantung pada komposisi prompt/output Anda.

### Arti sebenarnya dari "eligible"

Rentang utama 15-95% memang nyata, tetapi hanya berlaku untuk konten yang **redundan atau bertele-tele** — baris
error yang berulang, log build yang membanjiri output dengan peringatan yang sama, dump `grep`/pembacaan file yang terlalu besar. Ini
**bukan** berarti setiap permintaan menghemat sebanyak itu.

Terverifikasi secara empiris (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): proses
`stacked` (RTK + Caveman) terhadap blok `tool_result` berbentuk Anthropic yang berisi 300 baris
error identik menghasilkan **penghematan token 95.93% / penghematan karakter 96.26%** — tepat di dalam rentang yang diiklankan.
Namun, pipeline yang sama saat dijalankan terhadap output alat yang normal dan tidak redundan (daftar kecocokan `grep` yang bersih,
pembacaan file singkat, teks percakapan biasa) dengan benar menghasilkan **penghematan mendekati nol**, karena
tidak ada pengulangan yang perlu dihapus dan `validateCompression()` (`validation.ts`) menolak mengirim
penulisan ulang yang akan menghilangkan atau mengubah blok kode, URL, judul, versi, atau identifier konstanta ALL-CAPS.

Ini adalah perilaku aman yang diharapkan, bukan bug: sesi pemrograman yang sebagian besar membaca/melakukan grep pada file bersih akan
menghasilkan total penghematan yang tidak besar meskipun kompresi sepenuhnya diaktifkan, sedangkan sesi yang mengalami loop gagal
atau linter yang cerewet akan menghasilkan rentang penuh 78-95% pada lalu lintas tersebut. Jangan gunakan rendahnya
persentase penghematan agregat dari satu sesi sebagai bukti bahwa kompresi salah dikonfigurasi — periksa terlebih dahulu apakah
output alat yang mendasarinya benar-benar redundan.

---

## Visualisasi Penghematan Token

```
Tanpa kompresi:      47K token dikirim ke LLM
Dengan Lite:         40K token dikirim          (hemat 15% — aman, selalu aktif)
Dengan Standard:     33K token dikirim          (hemat 30% — aturan caveman-speak)
Dengan Aggressive:   24K token dikirim          (hemat 50% — penuaan + peringkasan)
Dengan Ultra:        12K token dikirim          (hemat 75% — pemangkasan heuristik)
Dengan RTK:          19K-5K token dikirim       (hemat 60-90% pada output perintah/alat)
Dengan Stacked:      10K-2.5K token dikirim     (rentang RTK+Caveman yang memenuhi syarat 78-95%)
```

---

## Konfigurasi

### Dasbor

Buka `Dashboard → Context & Cache`:

- **Caveman** — pemilihan mode, paket bahasa, pratinjau, dan pengaturan bawaan global
- **RTK** — pratinjau filter perintah, pengaturan keamanan RTK, dan katalog filter
- **Kombinasi Kompresi** — pipeline mesin bernama yang ditetapkan ke kombinasi perutean
- **Ambang Pemicu Otomatis** — secara otomatis mengaktifkan kompresi ketika jumlah token melebihi ambang batas

### Penggantian Per Kombinasi

Di `Dashboard → Context & Cache → Compression Combos`, tetapkan kombinasi kompresi ke kombinasi
perutean:

```txt
Kombinasi: "free-tier-fallback"
  Kombinasi Kompresi: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Target:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Hal ini memungkinkan Anda menggunakan kompresi bertumpuk pada penyedia gratis/pemrograman sambil mempertahankan mode ringan pada
langganan berbayar.

Penetapan "Penggantian Per Kombinasi" ini merupakan kontrol yang berbeda dari penggantian **mode kompresi
kombinasi perutean** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — skema bidang tersebut
juga menerima `rtk`, `stacked`, dan `omniglyph`) — penggantian tersebut tidak memilih pipeline
kombinasi kompresi bernama; penggantian itu hanya menetapkan bidang `compressionMode` yang digunakan oleh
`resolveCompressionPlan`. Penggantian ini dapat ditetapkan pada kartu kombinasi (`Dashboard → Combos`) atau, sejak
#6760, per kombinasi perutean dalam daftar "Assign to routing" di
`Dashboard → Context & Cache → Compression Combos`, tepat di sebelah kotak centang penetapan pipeline
yang didokumentasikan di atas. Kedua antarmuka menyimpan perubahan melalui endpoint `PUT /api/combos/{id}` yang sama.

### Penggantian per permintaan

Kirim header permintaan `x-omniroute-compression` untuk mengganti rencana kompresi bagi satu
permintaan. Header ini memiliki prioritas tertinggi — mengesampingkan penggantian kombinasi perutean, profil aktif,
pemicu otomatis, dan pengaturan Default pada panel. Nilai yang tidak dikenal akan diabaikan (permintaan tidak pernah ditolak) dan
sakelar utama global tetap mengendalikan semuanya: ketika kompresi dinonaktifkan secara global, header tidak dapat
mengaktifkannya. Nilai:

| Nilai         | Efek                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------- |
| `off`         | Tidak ada kompresi untuk permintaan ini.                                                                            |
| `default`     | Profil Default yang berasal dari panel (mengabaikan profil aktif). Mesin lossy tetap dinonaktifkan.                 |
| `safe`        | Sama seperti tidak menyertakan header: hanya deduplikasi dan peringkasan spasi kosong.                              |
| `allow-lossy` | Pertahankan rencana operator permintaan ini, termasuk ringkasan, filter relevansi, dan penulisan ulang gaya.        |
| `engine:<id>` | Satu mesin ketika diaktifkan, misalnya `engine:rtk`. Ini adalah persetujuan per permintaan untuk mesin tersebut.    |
| `<combo>`     | Kombinasi bernama, dicocokkan terlebih dahulu berdasarkan nama (tidak peka huruf besar/kecil), lalu berdasarkan id. |

Tanpa `allow-lossy`, `engine:<id>`, atau kombinasi bernama, mesin lossy tidak diterapkan.
Permintaan tetap mendapatkan deduplikasi sesi dan peringkasan spasi kosong ketika kompresi diaktifkan.

Rencana yang diterapkan dikembalikan dalam header respons `X-OmniRoute-Compression: <mode>; source=<source>`,
dengan `<source>` berupa salah satu dari `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default`, atau `off`.

### API

```bash
# Dapatkan pengaturan kompresi
curl http://localhost:20128/api/settings/compression

# Perbarui pengaturan kompresi
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pratinjau payload RTK/stacked tertentu
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Cantumkan paket filter RTK
curl http://localhost:20128/api/context/rtk/filters

# Uji RTK secara langsung dengan metadata perintah opsional
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Apa yang Dilindungi

Mesin kompresi **selalu mempertahankan:**

- ✅ Blok kode (berpagar dan sebaris)
- ✅ URL dan jalur file
- ✅ Struktur JSON dan data terstruktur
- ✅ Identifier dan token teknis yang dilindungi
- ✅ Ekspresi matematika
- ✅ Definisi pemanggilan alat/fungsi
- ✅ Prompt sistem (dalam mode lite)

Pemulihan output mentah RTK menyunting kunci API umum, bearer token, token Slack, kunci akses AWS,
kata sandi, token, dan rahasia sebelum apa pun disimpan.

---

## Statistik Kompresi

Setiap permintaan yang dikompresi menyertakan statistik dalam log server:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Peta Jalan Fase

| Fase    | Mode                                                                                                                                             | Status     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| Fase 1  | Off, Lite                                                                                                                                        | ✅ Dirilis |
| Fase 2  | Standard, Aggressive, Ultra                                                                                                                      | ✅ Dirilis |
| Fase 3  | RTK, Stacked, Compression Combos                                                                                                                 | ✅ Dirilis |
| Fase 4  | Output Styles, SLM-tier Ultra, harness evaluasi                                                                                                  | ✅ Dirilis |
| Fase 4C | Anggaran konteks adaptif ("dial") — mesin komputasi + API (`contextBudget` pada `PUT /api/settings/compression`) + kontrol mode/kebijakan dasbor | ✅ Dirilis |

---

## Ucapan Terima Kasih

Aturan kompresi mode Standard terinspirasi oleh **[Caveman](https://github.com/JuliusBrussee/caveman)** karya **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — proyek viral "mengapa menggunakan banyak token ketika sedikit token sudah cukup". Caveman melaporkan token output `~75%` lebih sedikit, penghematan output rata-rata tolok ukur sebesar `65%`, rentang output `22-87%`, dan alat kompresi input sebesar `~46%`.

Mode RTK terinspirasi oleh **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** karya **[RTK AI](https://github.com/rtk-ai)** — proyek kompresi output perintah berkinerja tinggi untuk pemfilteran output terminal, build, pengujian, git, dan alat. RTK melaporkan penghematan sebesar `60-90%`, dengan contoh sesi dalam README-nya menunjukkan penghematan `~80%`.

---

## Sistem Kompresi Lanjutan

Selain 7 mode yang dijelaskan di atas (sumbernya juga menerima mode `codex-responses` dan
`omniglyph`, yang tidak dibahas dalam panduan ini), bagian-bagian berikut membahas fitur
yang bekerja di dalam atau berdampingan dengan mode-mode tersebut: Tool Result Compression dan Progressive Aging
merupakan langkah 1 dan 2 dari mesin aggressive (mode Aggressive dan langkah `aggressive` dari
pipeline bertumpuk), Stacked Pipeline adalah cara mode Stacked dijalankan, Cache-Aware Compression
menurunkan `aggressive` dan `ultra` menjadi `standard` untuk penyedia caching saat kompresi
aktif, sedangkan Caveman Output Mode dan Output Styles adalah instruksi prompt sistem opsional,
yang secara default nonaktif, yang membentuk output model alih-alih mengompresi permintaan.

### Kompresi Sadar Cache

Beberapa penyedia (seperti Anthropic dengan caching prompt) mendukung **caching prompt**,
yang memungkinkan mereka menyimpan bagian-bagian prompt dalam cache untuk mengurangi biaya dan latensi. Ketika
caching diaktifkan, kompresi agresif justru dapat **merugikan** performa
karena mengubah token yang di-cache sehingga membatalkan cache.

Modul `cachingAware.ts` mengatasi hal ini dengan **mendeteksi konteks caching** dan
**menyesuaikan strategi kompresi** sebagaimana mestinya.

#### Cara kerjanya

1. **Mendeteksi konteks caching** — Memindai isi permintaan untuk penanda `cache_control`
2. **Mengidentifikasi penyedia caching** — Memeriksa apakah penyedia target mendukung caching
3. **Menyesuaikan strategi** — Menurunkan `aggressive`/`ultra` menjadi `standard` untuk penyedia caching
4. **Melewati prompt sistem** — Prompt sistem biasanya di-cache, jadi jangan mengompresinya

Pembantu strategi juga mengembalikan flag `deterministicOnly`, tetapi penyusun rencana hanya menggunakan
strateginya — saat ini tidak ada proses hilir yang membaca flag tersebut.

#### Contoh kode

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Penanda cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kapan digunakan

Kompresi sadar cache **selalu aktif** — tidak diperlukan konfigurasi. Fitur ini mulai bekerja setiap kali
kompresi aktif dan penyedia target mendukung caching prompt (Anthropic, OpenAI,
dan lain-lain); penanda `cache_control` eksplisit tidak diperlukan — penyedia caching saja sudah
memicu penurunan mode, sedangkan penanda saja tidak pernah melakukannya (deteksi penanda memasok telemetri
cache, bukan keputusan strategi).

### Penuaan Progresif

Percakapan panjang mengakumulasi banyak giliran pesan, tetapi giliran yang lebih lama menjadi kurang
relevan. Modul `progressiveAging.ts` **menurunkan detail pesan berdasarkan jarak giliran**
(jarak diukur dari akhir percakapan). Dengan nilai default yang disertakan
(`verbatim: 2, light: 2, moderate: 3`):

- **2 giliran terakhir (jarak ≤ 2)**: Dipertahankan apa adanya
- **Jarak 3**: Kompresi manusia gua (penghapusan kata pengisi)
- **Jarak 4+**: Pesan asisten diringkas; pesan pengguna dipangkas menjadi baris pertama,
  dibatasi hingga 120 karakter; peran lain tidak diubah. Prompt sistem, pesan yang sudah
  mengalami aging, dan pesan pengguna terbaru selalu dipertahankan apa adanya terlepas
  dari jaraknya. Tidak ada yang dihapus sepenuhnya, dan band `light`
  tidak dapat dicapai dengan nilai default yang disertakan (`light` sama dengan `verbatim`).

#### Contoh kode

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 giliran lagi ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 3 giliran terakhir: apa adanya
  light: 8, // jarak <= 8: kompresi ringan
  moderate: 20, // jarak <= 20: kompresi manusia gua
  fullSummary: 5, // diwajibkan oleh tipe, tidak dibaca oleh kode banding
  // jarak > 20: diringkas (asisten) / baris pertama dipertahankan (pengguna)
});

// saved = jumlah token yang dihemat
```

#### Kapan digunakan

Progressive aging **selalu aktif** untuk mode `aggressive` — ini adalah langkah ke-2 dari
`compressAggressive()`. Mode Ultra tidak menjalankannya. Fitur ini
sangat efektif untuk:

- Sesi pengodean jangka panjang
- Percakapan selama beberapa hari
- Alur kerja agentik dengan banyak pemanggilan alat

### Mode Output Manusia Gua

Mode output manusia gua menambahkan **instruksi prompt sistem** yang meminta model itu sendiri
menghasilkan output ringkas — level `lite` meminta jawaban singkat yang tetap menggunakan kalimat lengkap, `full`
memintanya untuk "merespons ringkas seperti manusia gua cerdas", dan `ultra` meminta output telegrafis;
instruksi hanya meminta, bukan menjaminnya. Permintaan menerimanya melalui
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` terlebih dahulu menentukan pilihan dengan shim kompatibilitas mundur
(`resolveOutputStyleSelection()` dalam
`open-sse/services/compression/outputStyles/backCompat.ts`), yang, ketika `outputStyles`
kosong, memetakan `cavemanOutputMode` yang diaktifkan ke gaya output `terse-prose` pada
`cavemanOutputMode.intensity` (lihat Kompatibilitas mundur di bawah); pilihan `outputStyles`
yang tidak kosong digunakan apa adanya, lalu `cavemanOutputMode.enabled` dan `intensity` tidak
berpengaruh, sementara tombol `autoClarity` tetap berlaku. `outputMode.ts` menyimpan
teks instruksi (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), bypass konten, dan
helper penempatan yang digunakan injeksi; injektor `applyCavemanOutputMode()` miliknya sendiri tidak memiliki
pemanggil produksi.

#### Cara kerjanya

Mode ini tidak mengompresi input. Mode ini menambahkan blok instruksi ke prompt sistem
(lihat Cara kerja injeksi di bawah), dan mode kompresi input apa pun yang dipilih untuk permintaan
tetap dijalankan setelahnya, pada isi yang kini memuat blok tersebut. Sebelum
klausa batasan bersama yang mengakhiri setiap level, level `full` dalam bahasa Inggris berbunyi:

> "Respond terse like smart caveman. Drop articles (a/an/the), filler (just/really/basically/actually/simply), pleasantries, hedging. Fragments OK. Short synonyms (big not extensive, fix not implement). Keep all technical substance, code, errors, URLs, identifiers exact."

Ini bekerja sangat baik untuk:

- Pembuatan kode (output lebih ringkas = lebih sedikit token)
- Tanya jawab singkat (tidak perlu penjelasan panjang lebar)
- Pemrosesan batch (memaksimalkan throughput)

#### Kapan digunakan

Mode output manusia gua bersifat **opsional**. Dengan kompresi aktif (`enabled: true`, tombol utama
pada halaman Compression Settings), aktifkan dengan `cavemanOutputMode.enabled`; `intensity`
memilih `lite`, `full`, atau `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Tombol **Output Mode** milik sebuah kombinasi kompresi (`outputMode`, dengan level di `outputModeIntensity`)
mengatur sakelar yang sama untuk permintaan tempat kombinasi tersebut diterapkan, dan alat MCP
`omniroute_set_compression_engine` menuliskannya melalui argumen boolean `outputMode`.
Pilihan `outputStyles` yang tidak kosong lebih diutamakan daripada sakelar ini. Di
dasbor, mengaktifkan gaya output **Terse prose** akan menyuntikkan blok yang sama (lihat Output
Styles di bawah).

### Gaya Output (katalog)

Mode output manusia gua di atas adalah **jalur gaya tunggal lama**. Fase 4 menggeneralisasikannya
menjadi katalog gaya output yang dapat dikomposisikan: `OUTPUT_STYLE_CATALOG` dalam
`open-sse/services/compression/outputStyles/catalog.ts`. Setiap gaya merupakan instruksi prompt sistem
yang meminta model itu sendiri menghasilkan output yang lebih hemat; beberapa gaya dapat diaktifkan
bersamaan dan disuntikkan sesuai urutan katalog.

| Gaya                          | `id`          | Fungsinya                                                                                                                                                                                                                             | Bahasa instruksi                              |
| ----------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Prosa ringkas                 | `terse-prose` | Hilangkan kata pengisi/artikel/ungkapan keraguan; pertahankan substansi teknis secara tepat. Teksnya sama dengan mode keluaran caveman lama (dirujuk, tidak diketik ulang).                                                           | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Lebih sedikit kode            | `less-code`   | Tangga YAGNI: perubahan terkecil yang berfungsi, tanpa abstraksi yang tidak diminta.                                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (dev senior malas)   | `ponytail`    | "Kode terbaik adalah kode yang tidak pernah ditulis": gunakan kembali > tulis ulang, akar masalah > gejala, diff berfungsi yang terpendek.                                                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Saya punya ADHD (aksi dahulu) | `i-have-adhd` | Aksi dahulu (perintah/path/cuplik sebelum prosa), langkah bernomor dan terbatas, SATU langkah konkret berikutnya, tanpa pembuka/rangkuman/penutup. Diadaptasi dari [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| CJK ringkas (文言)            | `terse-cjk`   | Jawaban `full`/`ultra` dalam bahasa Tionghoa Klasik (文言); `lite` hanya meminta jawaban singkat tanpa kata tugas, basa-basi, atau hiasan.                                                                                            | zh (dibatasi lokal, lihat di bawah)           |

Setiap gaya menyediakan tiga tingkat intensitas — `lite`, `full`, `ultra` — dan setiap tingkat
diakhiri dengan klausul batas bersama (`SHARED_BOUNDARIES` di `outputMode.ts`), yang
mempertahankan blok kode, path file, perintah, galat, dan URL secara tepat. Teks tingkat
`terse-prose` dan `terse-cjk` menambahkan identifier ke daftar tersebut.

`terse-cjk` dibatasi ke lokal `zh` di dua tempat. Halaman Pengaturan Kompresi hanya menampilkan
barisnya ketika bahasa UI dasbor adalah bahasa Tionghoa (`zh-CN` atau `zh-TW`), dan
`applyOutputStyles()` hanya menyisipkannya ketika bahasa yang ditentukan untuk permintaan (lihat Pemilihan
bahasa di bawah) adalah `zh`. Menyembunyikan baris tidak menghapus pilihan `terse-cjk` yang tersimpan:
API pengaturan menerima id gaya apa pun, dan menyimpan gaya lain di halaman akan mempertahankannya. Saat
permintaan diproses, pemeriksaan bahasa `applyOutputStyles()` adalah satu-satunya pembatas lokal.

#### Cara kerja penyisipan

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) mencocokkan
pilihan dengan katalog (id yang tidak dikenal dan gaya yang tidak cocok dengan lokal
dihapus, tidak pernah menjadi galat; pilihan yang tidak menghasilkan gaya apa pun membiarkan body
tidak berubah, dilewati sebagai `no_styles`), menggabungkan instruksi yang dipilih sesuai urutan katalog,
menambahkan klausul batas **sekali** (beserta klausul keamanan, `SAFETY_BOUNDARIES` atau
terjemahannya, ketika `less-code` atau `ponytail` dipilih), dan mengawali blok dengan satu
penanda idempotensi (`[OmniRoute Output Styles]`), sehingga penerapan ulang tidak melakukan apa pun. Ketika
bahasa yang ditentukan (lihat Pemilihan bahasa di bawah) memiliki terjemahan, instruksi yang dilokalkan
disisipkan sebagai pengganti bahasa Inggris.

Pada body dengan array `messages` yang tidak kosong, pemeriksaan idempotensi dijalankan sebelum
pengabaian berdasarkan konten: ketika penanda `[OmniRoute Output Styles]` sudah ada di field
`system` tingkat atas (berupa string atau array blok konten) atau di pesan sistem dengan konten
string, body dibiarkan tidak berubah sebagai `already_applied` dan pemeriksaan kata kunci tidak dijalankan.
Jika tidak, pengabaian berdasarkan konten (`shouldBypassCavemanOutputMode()` di
`open-sse/services/compression/outputMode.ts`) memeriksa teks dari tiga pesan terakhir,
apa pun perannya, dan melewati gaya untuk seluruh giliran ketika teks tersebut
cocok dengan kata kunci keamanan, tindakan yang tidak dapat dibatalkan, atau klarifikasi, maupun
urutan yang peka terhadap susunan: `first`, `then`, `after that`, `before`, `rollback`, atau
`backup` yang dalam jarak 240 karakter diikuti oleh `delete`, `drop`, `migrate`, `deploy`, atau
`release`. Pengabaian ini berjalan selama tombol **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, aktif secara default) menyala; menonaktifkan tombol ini akan melewati
pemeriksaan kata kunci.

Ketika pengabaian mengizinkan giliran tersebut diproses, `placeSystemInstruction()` (file yang sama), yang
tidak pernah membuat `messages[0]` baru, menempatkan blok pada lokasi pertama yang ditemukan berikut ini:

1. Pesan sistem awal dengan konten string: blok ditambahkan setelah teksnya.
2. Field `system` tingkat atas: blok ditambahkan setelah teks string, atau
   ditambahkan sebagai blok teks baru ke array blok konten.
3. Pesan sistem berikutnya yang pertama dengan konten string: blok ditambahkan setelah
   teksnya.
4. Jika tidak ada satu pun di atas: blok dimasukkan ke pesan sistem baru di akhir `messages`.

Pada body tanpa array `messages` (atau dengan array kosong), pengabaian berdasarkan konten tidak dijalankan dan
field `system` tingkat atas tidak diperiksa. Blok ditambahkan setelah teks pada field
`instructions` bertipe string, kecuali field tersebut sudah berisi penanda
`[OmniRoute Output Styles]`; dalam hal itu, body dibiarkan tidak berubah sebagai
`already_applied`. Ketika body tidak memiliki field `instructions` bertipe string tetapi memuat `input`
(string atau array), blok menjadi `instructions`, menggantikan nilai non-string apa pun
yang sebelumnya tersimpan di field tersebut. Body yang tidak memiliki field `instructions` bertipe string maupun
`input` bertipe string atau array dibiarkan tidak berubah dan dilewati sebagai `no_messages`.

#### Cara mengaktifkan

Di dasbor: **Konteks Kompresi → Pengaturan Kompresi**
(`/dashboard/context/settings`), bagian Gaya output: satu baris per gaya dengan tombol
aktif/nonaktif dan pemilih tingkat. Gaya disisipkan selama kompresi itu sendiri aktif
(tombol utama halaman, `enabled`). Tombol **Lewati Kejelasan Otomatis** berada di halaman
**Manusia Gua** (`/dashboard/context/caveman`), dalam kartu **Mode Output**. Secara
programatis, konfigurasi kompresi menyimpan pilihan sebagai:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Kompatibilitas mundur: ketika `outputStyles` kosong, pengaturan lama
`cavemanOutputMode.enabled` dipetakan ke `terse-prose` pada
`cavemanOutputMode.intensity`. Blok kemudian dimulai dengan penanda
`[OmniRoute Output Styles]`, sedangkan injektor lama `applyCavemanOutputMode()`
menuliskan `[OmniRoute Caveman Output Mode]`. Di bawah penanda tersebut, teksnya sama
dengan injeksi lama dalam en, pt-BR, es, de, fr, it, ru, id, dan vi; dalam ja dan zh,
terdapat satu spasi tambahan sebelum klausa batas. `terse-prose` diterjemahkan ke
pt-BR, es, de, fr, it, ru, zh, ja, id, dan vi, sehingga permintaan yang bahasa hasil
resolusinya adalah `hu` akan mendapatkan teks bahasa Inggris, sementara injektor lama
menggunakan teks bahasa Hungaria.

Pemilihan bahasa gaya output (`resolveOutputStyleLanguage()` dalam
`outputStyles/apply.ts`): saat `languageConfig.enabled` aktif, `autoDetect` mengambil
sampel pesan pengguna terbaru dalam array `messages` milik permintaan yang memiliki
teks (konten string, atau `text` dari bagian kontennya), lalu menjalankan detektor
mesin Caveman (`detectCompressionLanguage()`) terhadapnya. Detektor mengembalikan `zh`
untuk teks dengan karakter Han tanpa kana; jika tidak, detektor mengembalikan bahasa
mana pun dari `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu`, dan `id` yang memiliki
kecocokan petunjuk terbanyak, serta `en` jika tidak ada yang cocok — teks yang tidak
dapat diklasifikasikan akan menggunakan bahasa Inggris, tidak pernah
`defaultLanguage`, dan `vi` tidak pernah terdeteksi meskipun gaya menyediakan teks
`vi`. Isi permintaan Responses API menyimpan giliran percakapannya dalam `input`, yang
tidak diambil sebagai sampel, sehingga menggunakan `defaultLanguage`, lalu bahasa
Inggris. Ketika tidak ada pesan pengguna dalam `messages` yang memiliki teks, atau
ketika `autoDetect` nonaktif, `defaultLanguage` diterapkan, lalu bahasa Inggris. Ketika
`languageConfig.enabled` nonaktif, bahasanya adalah bahasa Inggris — kecuali kombinasi
kompresi diterapkan pada permintaan (kombinasi yang ditetapkan ke kombinasi perutean
permintaan, atau kombinasi kompresi default yang digunakan chatCore sebagai fallback
untuk pipeline bertumpuk bawaan): penerapan kombinasi akan mengaktifkan
`languageConfig.enabled` untuk permintaan tersebut dan menetapkan `defaultLanguage`
dari paket bahasa kombinasi (nilai tersimpan jika merupakan salah satu paket dalam
kombinasi tersebut, atau paket pertama kombinasi jika bukan, yang secara default
adalah `en`), sementara nilai `autoDetect` yang tersimpan (aktif secara default) tetap
berlaku. Mesin input Caveman memilih bahasa paket aturannya secara berbeda — per bagian
teks dan, ketika deteksi otomatis nonaktif, dibatasi berdasarkan `enabledPacks`.

Matriks gaya × bahasa ditetapkan oleh
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: setiap gaya katalog harus
memiliki entri dalam `BASELINE_LANGUAGES` milik pengujian; gaya yang tidak dibatasi
berdasarkan lokal harus menyediakan terjemahan pt-BR (`terse-cjk` yang dibatasi
berdasarkan lokal dikecualikan dari aturan ini), kecuali gaya tersebut tercantum dalam
`KNOWN_ENGLISH_ONLY`, yang hanya boleh memuat gaya tanpa terjemahan sama sekali —
gaya yang tercantum tetapi memiliki terjemahan apa pun akan menggagalkan pengujian;
dan suatu gaya akan menggagalkan pengujian ketika kehilangan bahasa yang tercantum
dalam entri `BASELINE_LANGUAGES` miliknya. Untuk menambahkan gaya, lihat
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresi Hasil Alat

`compressToolResult()` dalam `open-sse/services/compression/toolResultCompressor.ts`
mengompresi teks hasil alat menggunakan **5 strategi**. Fungsi ini mencobanya dalam
urutan berikut, dan strategi aktif pertama yang pemeriksaannya cocok dengan konten
akan menentukan hasilnya:

1. **`fileContent`**: konten yang terdiri dari 3 baris atau lebih, dengan setidaknya satu baris yang, setelah
   indentasi awal diabaikan, diawali dengan `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` atau `return ` (kata kunci diikuti spasi), atau dengan `if`,
   `for` atau `while` yang diikuti oleh `(` atau ` (`, mempertahankan 20 baris pertama dan 5 baris terakhirnya, dengan
   bagian tengah yang dihilangkan diberi penanda.
2. **`grepSearch`**: konten dengan setidaknya satu baris berformat `<path>:<digits>:`,
   dengan teks sebelum titik dua pertama tidak mengandung spasi, hanya mempertahankan baris-baris tersebut, paling
   banyak 30, diikuti jumlah kecocokan lainnya dan daftar file yang cocok;
   semua baris lainnya dibuang. Satu baris seperti itu sudah cukup untuk memicu strategi, sehingga
   baris log yang diawali stempel waktu seperti `12:30:45` juga dihitung.
3. **`shellOutput`**: output yang mengandung urutan ANSI CSI (`ESC[` lalu angka atau
   titik koma, kemudian sebuah huruf, seperti pada kode warna) atau `$` yang diikuti spasi
   di mana pun dalam teks akan kehilangan urutan tersebut (escape lain, seperti `ESC[?25l` atau
   urutan judul jendela OSC, tetap dipertahankan) dan mempertahankan 50 baris terakhirnya, dengan baris
   identik yang berurutan diciutkan. Karena pemeriksaan ini dijalankan sebelum `json` dan `errorMessage`,
   output JSON atau error yang mengandung `$` seperti itu tidak pernah mencapai keduanya selama
   `shellOutput` aktif.
4. **`json`**: payload JSON yang panjangnya lebih dari 2.000 karakter, diawali dengan `{` atau `[` (setelah
   spasi opsional), dan berhasil diurai akan diringkas: array dengan lebih dari 7 item mempertahankan
   5 item pertama dan 2 item terakhir beserta jumlah totalnya, sedangkan objek mempertahankan 20
   key pertamanya, dengan setiap nilai objek atau array bertingkat diganti oleh placeholder `{…N keys}`
   (untuk array, N adalah panjangnya) dan penanda `_remaining_<N>_keys` yang menghitung key yang
   dibuang setelah 20 key pertama. Nilai skalar disalin seluruhnya, sehingga objek dengan 20 key
   atau kurang tanpa nilai bertingkat hanya diindentasi ulang — objek yang diminifikasi justru bertambah
   karakternya dan tetap tidak berubah.
5. **`errorMessage`**: output yang mengandung, di mana pun dan tanpa memedulikan kapitalisasi, `error:`,
   `error ` (kata tersebut diikuti spasi, seperti dalam `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` atau `traceback` mempertahankan baris pertamanya,
   10 baris berikutnya, dan 3 baris terakhir, dengan penanda `… [N frames elided] …` menggantikan
   baris-baris di antaranya. Penanda hanya muncul jika ada lebih dari 13 baris setelah baris pertama,
   sehingga output error yang terdiri dari 14 baris atau kurang tidak diperpendek (pada 12 atau 13 baris,
   3 baris terakhir mengulangi baris yang sudah dipertahankan).

Setelah suatu strategi cocok, bahkan strategi yang tidak menghemat apa pun, strategi berikutnya tidak
dicoba. Ketika strategi yang cocok tidak menghemat estimasi token (panjang ÷ 4, dibulatkan ke atas) —
misalnya file menyerupai kode yang terdiri dari 25 baris atau kurang, atau array JSON dengan panjang lebih dari 2.000
karakter yang memiliki 7 item atau kurang — engine agresif mempertahankan hasil tool asli:
kedua pemanggil (`compressAggressive()` dan `compressAnthropicToolResultBlock()`)
mempertahankan hasil asli ketika `saved` bernilai 0 atau kurang, sedangkan `compressToolResult()` sendiri tetap
mengembalikan output strategi tersebut. Langkah hasil tool bukanlah penentu akhir:
perangkum fallback milik engine masih dapat memperpendek pesan `tool` atau `function` yang panjangnya melebihi
8.192 karakter (`maxTokensPerMessage`, 2.048, dikalikan 4).

#### Kapan digunakan

Kompresi hasil tool adalah langkah 1 dari engine agresif (`compressAggressive()` di
`open-sse/services/compression/aggressive.ts`), sehingga dijalankan dalam mode Aggressive dan dalam
langkah `aggressive` pada pipeline bertumpuk. Fitur ini mengompresi pesan `tool` dan `function`
berformat OpenAI serta teks di dalam blok `tool_result` Anthropic. Setiap strategi memiliki
saklarnya sendiri di bawah `aggressive.toolStrategies`, semuanya aktif secara default. Di dashboard,
saklar tersebut berada di tampilan **Advanced** pada halaman Caveman saat kompresi aktif dan
mode defaultnya adalah Aggressive.

### Pipeline Bertumpuk

Mode bertumpuk menjalankan **beberapa engine secara berurutan** — biasanya RTK terlebih dahulu
(penghematan 60-90% pada output tool), kemudian Caveman pada teks yang tersisa (~46% penghematan
input). Jika digabungkan, hasilnya adalah **rentang kelayakan 78-95%** (lihat Perhitungan Penghematan Upstream
di atas): `1 - (1 - 0.60..0.90) × (1 - 0.46)` menghasilkan rata-rata ≈89%.

#### Cara kerjanya

```
Input (1000 token)
  → RTK (filter yang memahami perintah) → 200 token
    → Caveman (penghapusan kata pengisi) → 108 token
  → Output (108 token, penghematan ~89%)
```

#### Kapan digunakan

Gunakan mode bertumpuk untuk:

- Alur kerja yang banyak menggunakan tool (coding agentik, riset)
- Pemrosesan batch yang sensitif terhadap biaya
- Ketika Anda membutuhkan penghematan token maksimum

Pipeline bertumpuk dikonfigurasi melalui pengaturan kompresi global `stackedPipeline`,
atau melalui combo kompresi bernama yang ditetapkan ke combo routing (lihat
Penimpaan Per Combo di atas) — bukan melalui `modePack` milik auto-combo (field tersebut hanya
membobot ulang pemilihan model auto-combo, dan `stacked` bukan nama pack yang valid).

---

## Penggantian Kombinasi Kompresi

Anda dapat mengganti mode kompresi global **per kombinasi** untuk menyempurnakan perilaku
bagi berbagai kasus penggunaan:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Ini berguna untuk:

- **Kombinasi pengodean**: Gunakan mode `aggressive` untuk sesi panjang
- **Kombinasi tanya jawab cepat**: Gunakan mode `lite` untuk respons cepat
- **Kombinasi dengan penggunaan alat intensif**: Gunakan mode `stacked` untuk penghematan maksimal
- **Kombinasi produksi**: biarkan penggantian dinonaktifkan untuk penyedia caching — penyesuaian
  yang selalu aktif dan sadar-cache menurunkan `aggressive`/`ultra` menjadi `standard` secara otomatis
  (tidak ada mode `cache-aware` yang dapat dipilih)

---

## Lihat Juga

- [Konfigurasi Lingkungan](../reference/ENVIRONMENT.md) — Variabel lingkungan kompresi
- [Panduan Arsitektur](../architecture/ARCHITECTURE.md) — Bagian internal pipeline kompresi
- [Panduan Pengguna](../guides/USER_GUIDE.md) — Memulai penggunaan kompresi
- [Kompresi RTK](./RTK_COMPRESSION.md) — Filter RTK, model kepercayaan, gerbang verifikasi, pemulihan output mentah
- [Mesin Kompresi](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API, MCP, dasbor
- [Format Aturan Kompresi](./COMPRESSION_RULES_FORMAT.md) — Format paket aturan JSON
- [Paket Bahasa Kompresi](./COMPRESSION_LANGUAGE_PACKS.md) — Aturan Caveman khusus bahasa
