# 🗜️ Prompt Compression Guide — OmniRoute (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Hemat 15-95% pada konteks yang memenuhi syarat secara otomatis. Untuk ringkasan singkat, lihat [bagian Kompresi README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Ikhtisar

OmniRoute mengimplementasikan pipeline kompresi prompt modular yang berjalan **secara proaktif** sebelum permintaan mencapai penyedia upstream. Artinya, penghematan token berlangsung secara transparan — tidak diperlukan perubahan pada alur kerja Anda.

```
Permintaan Klien
  → Pemilih Strategi Kompresi
    → Ada penggantian combo? → Gunakan pengaturan combo
    → Ambang pemicu otomatis tercapai? → Gunakan mode otomatis
    → Ada mode default? → Gunakan pengaturan global
    → Nonaktif? → Lewati kompresi
  → Mode Kompresi yang Dipilih
    → Nonaktif: Tanpa kompresi
    → Ringan: Pembersihan spasi kosong/pemformatan yang aman (~15%)
    → Standar: Penghapusan kata pengisi bergaya manusia gua (~30%)
    → Agresif: Pengusangan riwayat + peringkasan (~50%)
    → Ultra: Pemangkasan heuristik + perampingan blok kode (~75%)
    → RTK: Pemfilteran output terminal/alat yang mempertimbangkan perintah (rentang upstream 60-90%)
    → Bertumpuk: Pipeline multi-engine berurutan, biasanya RTK lalu Caveman (rentang yang memenuhi syarat 78-95%)
  → Permintaan Terkompresi → Penyedia
```

---

## Mode Kompresi

### Nonaktif

Tidak ada kompresi yang diterapkan. Semua pesan diteruskan tanpa perubahan.

### Mode Ringan (penghematan ~15%, latensi <1ms)

Mode paling aman — tanpa perubahan semantik, hanya pembersihan pemformatan:

| Teknik                   | Deskripsi                                               |
| ------------------------ | ------------------------------------------------------- |
| `collapseWhitespace`     | Menggabungkan baris kosong berurutan dan spasi di akhir |
| `dedupSystemPrompt`      | Menghapus pesan sistem duplikat                         |
| `compressToolResults`    | Mengompresi output alat/fungsi yang panjang             |
| `removeRedundantContent` | Menghapus instruksi yang berulang                       |
| `replaceImageUrls`       | Memperpendek URI data gambar base64                     |

**Paling cocok untuk:** Penggunaan yang selalu aktif dan alur kerja yang mengutamakan keamanan.

### Mode Standar (penghematan ~30%)

Terinspirasi oleh [Caveman](https://github.com/JuliusBrussee/caveman) — menghapus kata pengisi dan frasa bertele-tele sambil mempertahankan makna:

- Menghapus kata pengisi ("please", "I think", "basically", "actually")
- Memadatkan frasa bertele-tele ("in order to" → "to", "as a result of" → "because")
- Menghapus ungkapan sopan yang memperhalus permintaan ("Would you mind...", "If you could possibly...")
- 30+ aturan regex yang disesuaikan untuk prompt pengodean

**Paling cocok untuk:** Alur kerja pengodean harian dan tim yang sadar biaya.

### Mode Agresif (penghematan ~50%)

Pengelolaan riwayat cerdas untuk sesi panjang:

- **Pengusangan Pesan** — pesan lama dikompresi secara progresif
- **Peringkasan Hasil Alat** — output alat yang panjang diganti dengan ringkasan
- **Pelindung Integritas Struktural** — memastikan pasangan `tool_use` + `tool_result` tetap konsisten
- **Kesadaran Jendela Konteks** — mematuhi batas token per model

**Paling cocok untuk:** Sesi debugging yang panjang dan basis kode besar.

### Mode Ultra (penghematan ~75%)

Kompresi maksimum untuk skenario yang sangat dibatasi token:

- **Pemangkasan Heuristik** — menghapus pesan di bawah ambang relevansi
- **Perampingan Blok Kode** — mengompresi contoh kode yang berulang
- **Pemotongan dengan Pencarian Biner** — menemukan titik potong optimal untuk jendela konteks
- Mencakup semua fitur mode Agresif

**Paling cocok untuk:** Saat Anda berulang kali mencapai batas konteks.

### Mode RTK (rentang upstream 60-90%)

Mode RTK dioptimalkan untuk output alat yang panjang dalam sesi agen pengodean:

- Mendeteksi kelas perintah/output seperti `git status`, `git diff`, `git log`, test runner,
  build TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audit/instalasi npm, log Docker, output
  infrastruktur, dan output shell generik
- Menerapkan paket filter JSON dari `open-sse/services/compression/engines/rtk/filters/`
- Mengimpor filter schema RTK TOML v1 dari file `filters.toml` proyek atau global, dengan validasi
  pengujian inline dan pembatasan berdasarkan kepercayaan untuk file proyek
- Menyediakan 49 filter bawaan dengan sampel verifikasi inline
- Menghapus urutan kontrol ANSI, bilah progres, baris berulang, dan derau yang tidak dapat ditindaklanjuti
- Mempertahankan kegagalan, kesalahan, peringatan, file yang berubah, ringkasan, dan bagian akhir output panjang
- Mendukung filter proyek dengan pembatasan berdasarkan kepercayaan, filter global, dan pemulihan opsional untuk output mentah yang telah disunting

**Paling cocok untuk:** Sesi agen dengan transkrip shell, build, pengujian, git, grep, dan output file.

### Mode Bertumpuk (rentang yang memenuhi syarat 78-95%)

Mode Bertumpuk menjalankan beberapa engine kompresi dalam urutan deterministik. Pipeline default-nya adalah:

```txt
RTK -> Caveman
```

Urutan tersebut memadatkan output terminal/alat terlebih dahulu, lalu menerapkan pemadatan semantik Caveman pada
prompt bahasa alami yang tersisa. Pipeline bertumpuk dapat dikonfigurasi secara global atau melalui
combo kompresi yang ditetapkan ke combo perutean.

**Paling cocok untuk:** Konteks campuran dengan log alat berukuran besar serta instruksi manusia atau ringkasan asisten.

---

## Perhitungan Penghematan Upstream

OmniRoute mendokumentasikan penghematan kompresi dari dua sumber: benchmark proyek upstream dan
komposisi mesin OmniRoute sendiri.

| Sumber  | Angka README upstream yang digunakan di sini                                                                                            |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` lebih sedikit token keluaran, rata-rata benchmark penghematan keluaran `65%`, rentang `22-87%`, dan alat kompresi masukan `~46%` |
| RTK     | Penghematan keluaran perintah sebesar `60-90%`; sesi sampel `~118,000 -> ~23,900` token, atau penghematan `79.7%` (`~80%`)              |

Untuk payload alat/konteks yang tumpang tindih, kombinasi default OmniRoute menumpuk mesin-mesin tersebut:

```txt
RTK -> Caveman
```

Penghematan gabungannya bersifat multiplikatif, bukan aditif:

```txt
gabungan  = 1 - (1 - penghematan RTK) * (1 - penghematan masukan Caveman)
rata-rata = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
rentang   = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Angka `78-95%` tersebut berlaku ketika RTK dan Caveman sama-sama dapat mengurangi payload masukan/konteks yang sama.
Mode keluaran respons Caveman bersifat terpisah: ketika diaktifkan, gunakan penghematan keluaran Caveman sendiri (rata-rata `65%`,
angka utama `~75%`, rentang `22-87%`). Total penghematan biaya bergantung pada komposisi prompt/keluaran Anda.

### Apa arti sebenarnya dari "memenuhi syarat"

Rentang utama 15-95% memang nyata, tetapi hanya berlaku untuk konten yang **redundan atau terlalu panjang** — baris
kesalahan berulang, log build yang terus mengeluarkan peringatan yang sama, dump `grep`/pembacaan file yang terlalu besar. Ini
**bukan** berarti setiap permintaan menghemat sebanyak itu.

Diverifikasi secara empiris (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): proses
`stacked` (RTK + Caveman) terhadap blok `tool_result` berbentuk Anthropic yang berisi 300 baris
kesalahan identik menghasilkan **penghematan token 95.93% / penghematan karakter 96.26%** — tepat dalam rentang yang
diiklankan. Namun, pipeline yang sama ketika dijalankan terhadap keluaran alat yang normal dan tidak redundan (daftar kecocokan `grep` yang bersih,
pembacaan file singkat, teks percakapan biasa) dengan tepat menghasilkan **penghematan mendekati nol**, karena
tidak ada pengulangan yang dapat dihapus dan `validateCompression()` (`validation.ts`) menolak mengirim
penulisan ulang yang akan menghilangkan atau mengubah blok kode, URL, judul, versi, atau pengidentifikasi konstanta ALL-CAPS.

Ini adalah perilaku aman yang diharapkan, bukan bug: sesi pengodean yang sebagian besar membaca/mencari dengan grep pada file bersih akan
menghasilkan total penghematan yang moderat meskipun kompresi diaktifkan sepenuhnya, sedangkan sesi yang mengalami
loop gagal atau linter yang terlalu cerewet akan menghasilkan rentang penuh 78-95% pada lalu lintas tersebut. Jangan gunakan
persentase penghematan agregat yang rendah dari satu sesi sebagai bukti bahwa kompresi salah dikonfigurasi — periksa terlebih dahulu apakah
keluaran alat yang mendasarinya benar-benar redundan.

---

## Visualisasi Penghematan Token

```
Tanpa kompresi:     47K token dikirim ke LLM
Dengan Lite:        40K token dikirim          (hemat 15% — aman, selalu aktif)
Dengan Standard:    33K token dikirim          (hemat 30% — aturan caveman-speak)
Dengan Aggressive:  24K token dikirim          (hemat 50% — penuaan + peringkasan)
Dengan Ultra:       12K token dikirim          (hemat 75% — pemangkasan heuristik)
Dengan RTK:         19K-5K token dikirim       (hemat 60-90% pada keluaran perintah/alat)
Dengan Stacked:     10K-2.5K token dikirim     (rentang RTK+Caveman 78-95% yang memenuhi syarat)
```

---

## Konfigurasi

### Dasbor

Buka `Dashboard → Context & Cache`:

- **Caveman** — pemilihan mode, paket bahasa, pratinjau, dan pengaturan default global
- **RTK** — pratinjau filter perintah, pengaturan keamanan RTK, dan katalog filter
- **Compression Combos** — pipeline mesin bernama yang ditetapkan ke kombo perutean
- **Auto-Trigger Threshold** — mengaktifkan kompresi secara otomatis saat jumlah token melampaui ambang batas

### Penggantian Per Kombo

Di `Dashboard → Context & Cache → Compression Combos`, tetapkan kombo kompresi ke kombo perutean:

```txt
Kombo: "free-tier-fallback"
  Kombo Kompresi: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Target:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Hal ini memungkinkan Anda menggunakan kompresi bertumpuk pada penyedia gratis/coding sambil tetap menggunakan mode ringan pada langganan berbayar.

Penetapan "Penggantian Per Kombo" ini merupakan kontrol yang berbeda dari penggantian **mode kompresi kombo perutean** (Default/Off/Lite/Standard/Aggressive/Ultra) — penggantian tersebut tidak memilih pipeline kombo kompresi bernama; penggantian itu hanya mengatur bidang `compressionMode` yang digunakan oleh `resolveCompressionPlan`. Penggantian ini dapat diatur pada kartu kombo (`Dashboard → Combos`) atau, sejak #6760, per kombo perutean dalam daftar "Assign to routing" di `Dashboard → Context & Cache → Compression Combos`, tepat di sebelah kotak centang penetapan pipeline yang didokumentasikan di atas. Kedua antarmuka menyimpan perubahan melalui endpoint `PUT /api/combos/{id}` yang sama.

### Penggantian per permintaan

Kirim header permintaan `x-omniroute-compression` untuk mengganti rencana kompresi bagi satu permintaan. Header ini memiliki prioritas tertinggi — mengungguli penggantian kombo perutean, profil aktif, pemicu otomatis, dan Default pada panel. Nilai yang tidak dikenal akan diabaikan (permintaan tidak pernah ditolak), dan sakelar utama global tetap mengontrol semuanya: saat kompresi dinonaktifkan secara global, header tidak dapat mengaktifkannya. Nilai:

| Nilai         | Efek                                                                                                                  |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| `off`         | Tanpa kompresi untuk permintaan ini.                                                                                  |
| `default`     | Profil Default yang berasal dari panel (mengabaikan profil aktif).                                                    |
| `engine:<id>` | Satu mesin ketika diaktifkan, misalnya `engine:rtk`.                                                                  |
| `<combo>`     | Kombo bernama, dicocokkan berdasarkan nama (tanpa membedakan huruf besar-kecil) terlebih dahulu, lalu berdasarkan id. |

Rencana yang diterapkan dikembalikan dalam header respons `X-OmniRoute-Compression: <mode>; source=<source>`, dengan `<source>` berupa salah satu dari `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`, atau `off`.

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

## Yang Dilindungi

Mesin kompresi **selalu mempertahankan:**

- ✅ Blok kode (berpagar dan sebaris)
- ✅ URL dan jalur file
- ✅ Struktur JSON dan data terstruktur
- ✅ Pengidentifikasi dan token teknis yang dilindungi
- ✅ Ekspresi matematika
- ✅ Definisi pemanggilan alat/fungsi
- ✅ Prompt sistem (dalam mode lite)

Pemulihan keluaran mentah RTK menyamarkan kunci API umum, bearer token, token Slack, kunci akses AWS,
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
| Fase 3  | RTK, Stacked, Kombinasi Kompresi                                                                                                                 | ✅ Dirilis |
| Fase 4  | Gaya Keluaran, Ultra tingkat SLM, perangkat evaluasi                                                                                             | ✅ Dirilis |
| Fase 4C | Anggaran konteks adaptif ("dial") — mesin komputasi + API (`contextBudget` pada `PUT /api/settings/compression`) + kontrol mode/kebijakan dasbor | ✅ Dirilis |

---

## Ucapan Terima Kasih

Aturan kompresi mode Standard terinspirasi oleh **[Caveman](https://github.com/JuliusBrussee/caveman)** karya **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — proyek viral "mengapa menggunakan banyak token ketika sedikit token sudah cukup". Caveman melaporkan keluaran dengan token `~75%` lebih sedikit, penghematan keluaran rata-rata tolok ukur sebesar `65%`, rentang keluaran `22-87%`, dan alat kompresi masukan sebesar `~46%`.

Mode RTK terinspirasi oleh **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** karya **[RTK AI](https://github.com/rtk-ai)** — proyek kompresi keluaran perintah berkinerja tinggi untuk terminal, build, pengujian, git, dan pemfilteran keluaran alat. RTK melaporkan penghematan `60-90%`, dengan contoh sesi README-nya menunjukkan penghematan `~80%`.

---

## Sistem Kompresi Lanjutan

Selain 7 mode standar, OmniRoute mencakup beberapa sistem kompresi
lanjutan yang bekerja secara otomatis berdasarkan konteks.

### Kompresi yang Mempertimbangkan Cache

Beberapa penyedia (seperti Anthropic dengan caching prompt) mendukung **caching prompt**,
yang memungkinkan mereka menyimpan sebagian prompt ke cache untuk mengurangi biaya dan latensi. Ketika
caching diaktifkan, kompresi agresif justru dapat **merugikan** kinerja
karena kompresi tersebut mengubah token yang di-cache, sehingga membatalkan cache.

Modul `cachingAware.ts` mengatasi hal ini dengan **mendeteksi konteks caching** dan
**menyesuaikan strategi kompresi** sebagaimana mestinya.

#### Cara kerjanya

1. **Mendeteksi konteks caching** — Memindai badan permintaan untuk penanda `cache_control`
2. **Mengidentifikasi penyedia caching** — Memeriksa apakah penyedia target mendukung caching
3. **Menyesuaikan strategi** — Menurunkan `aggressive`/`ultra` menjadi `standard` untuk penyedia caching
4. **Melewati prompt sistem** — Prompt sistem biasanya di-cache, jadi jangan mengompresinya
5. **Menggunakan transformasi deterministik** — Hanya menggunakan transformasi yang menghasilkan keluaran konsisten

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
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kapan digunakan

Kompresi yang mempertimbangkan cache **selalu aktif** — tidak diperlukan konfigurasi. Kompresi ini hanya mulai bekerja
ketika:

- Permintaan memiliki penanda `cache_control`
- Penyedia target mendukung caching prompt (Anthropic, OpenAI, dll.)

### Penuaan Progresif

Percakapan panjang mengakumulasi banyak giliran pesan, tetapi giliran yang lebih lama menjadi kurang
relevan. Modul `progressiveAging.ts` **menurunkan detail pesan berdasarkan jarak giliran**:

- **Giliran terbaru (0-3)**: Dipertahankan apa adanya (detail lengkap)
- **Giliran menengah (4-8)**: Kompresi Lite (pembersihan spasi kosong dan pemformatan)
- **Giliran lama (9+)**: Kompresi Caveman (penghapusan pengisi dan peringkasan)
- **Giliran sangat lama (20+)**: Diringkas secara intensif atau dibuang

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
  verbatim: 3, // 3 giliran pertama: apa adanya
  light: 8, // Giliran 4-8: kompresi lite
  moderate: 20, // Giliran 9-20: kompresi caveman
  // Giliran 21+: peringkasan intensif
});

// saved = jumlah token yang dihemat
```

#### Kapan digunakan

Penuaan progresif **selalu aktif** untuk mode `aggressive` dan `ultra`. Fitur ini
sangat efektif untuk:

- Sesi pemrograman yang berlangsung lama
- Percakapan selama beberapa hari
- Alur kerja agen dengan banyak pemanggilan alat

### Mode Output Caveman

Modul `outputMode.ts` menyisipkan **instruksi prompt sistem** agar model
menghasilkan output yang ringkas dan padat (gaya "caveman").

#### Cara kerjanya

Alih-alih mengompresi input, mode ini menambahkan prompt sistem seperti:

> "Balas dengan kata seminimal mungkin. Lewati basa-basi. Gunakan kalimat pendek."

Ini sangat efektif untuk:

- Pembuatan kode (output lebih ringkas = lebih sedikit token)
- Tanya jawab singkat (tidak memerlukan penjelasan panjang lebar)
- Pemrosesan batch (memaksimalkan throughput)

#### Kapan digunakan

Mode output Caveman bersifat **opsional** — atur melalui konfigurasi combo:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Gaya Output (katalog)

Mode output Caveman di atas merupakan **jalur gaya tunggal lama**. Fase 4 mengembangkannya
menjadi katalog gaya output yang dapat dikombinasikan: `OUTPUT_STYLE_CATALOG` di
`open-sse/services/compression/outputStyles/catalog.ts`. Setiap gaya merupakan instruksi
prompt sistem yang membuat model menghasilkan output yang lebih hemat; beberapa gaya dapat
diaktifkan sekaligus dan disisipkan sesuai urutan katalog.

| Gaya                                        | `id`          | Fungsinya                                                                                                                                                                                                                                        | Bahasa instruksi                                                                             |
| ------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| Prosa ringkas                               | `terse-prose` | Menghilangkan kata pengisi/artikel/ungkapan keraguan; mempertahankan substansi teknis secara akurat. Teksnya sama dengan mode output caveman lama (dirujuk, bukan diketik ulang).                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                |
| Lebih sedikit kode                          | `less-code`   | Tangga YAGNI: perubahan berfungsi yang paling kecil, tanpa abstraksi yang tidak diminta.                                                                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                |
| Ponytail (pengembang senior yang malas)     | `ponytail`    | "Kode terbaik adalah kode yang tidak pernah ditulis": penggunaan ulang > penulisan ulang, akar masalah > gejala, diff berfungsi yang paling singkat.                                                                                             | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                |
| Saya menderita ADHD (tindakan lebih dahulu) | `i-have-adhd` | Tindakan lebih dahulu (perintah/path/cuplik sebelum prosa), langkah bernomor yang terbatas, SATU langkah konkret berikutnya, tanpa pembuka/rangkuman/penutup. Diadaptasi dari [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                |
| CJK ringkas (文言)                          | `terse-cjk`   | Gaya bahasa Tionghoa klasik yang sangat ringkas.                                                                                                                                                                                                 | zh (dibatasi berdasarkan locale: hanya ditawarkan ketika bahasa yang ditentukan adalah `zh`) |

Setiap gaya menyediakan tiga tingkat intensitas — `lite`, `full`, `ultra` — dan setiap tingkat
diakhiri dengan klausa batasan bersama, yang mempertahankan blok kode, path file, perintah,
string kesalahan, URL, dan identifier apa adanya.

#### Cara kerja penyisipan

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) mencocokkan
pilihan dengan katalog (`id` yang tidak dikenal dan gaya yang tidak sesuai dengan locale
dihapus, tanpa pernah menghasilkan kesalahan), menggabungkan instruksi yang dipilih sesuai
urutan katalog, menambahkan klausa batasan **satu kali**, dan menempatkan hasilnya di awal
prompt sistem setelah satu penanda idempotensi (`[OmniRoute Output Styles]`) — penerapan
ulang tidak melakukan apa pun. Jika bahasa permintaan yang terdeteksi memiliki terjemahan,
instruksi yang telah dilokalkan akan disisipkan sebagai pengganti bahasa Inggris.

#### Cara mengaktifkan

Di dasbor: **Konteks → Pengaturan → Kompresi** — satu baris per gaya dengan tombol
aktif/nonaktif dan pemilih tingkat. Secara terprogram, konfigurasi kompresi menyimpan
pilihan sebagai:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Kompatibilitas mundur: pengaturan combo lama `outputMode: "caveman"` tetap berfungsi dan
dipetakan ke `terse-prose`, identik byte demi byte dengan penyisipan lama dalam setiap bahasa lama.

Pemilihan bahasa: saat `languageConfig.enabled` aktif, `autoDetect` memilih
bahasa pesan pengguna terbaru (menggunakan detektor yang sama dengan mesin input);
menonaktifkan `autoDetect` akan menetapkan `defaultLanguage`. Nonaktif → bahasa Inggris.

Matriks gaya × bahasa ditetapkan oleh
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: gaya baru tidak dapat dirilis
tanpa setidaknya terjemahan pt-BR (atau pengecualian terlacak yang eksplisit), dan gaya
yang sudah ada tidak dapat kehilangan locale secara diam-diam. Untuk menambahkan gaya, lihat
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresi Hasil Alat

Modul `toolResultCompressor.ts` menyediakan **5 strategi kompresi khusus**
untuk hasil alat (pemanggilan fungsi, output agen, hasil pencarian, dan sebagainya):

1. **Kompresi hasil pencarian** — Menghapus hasil redundan, mempertahankan N teratas
2. **Kompresi pembacaan file** — Memotong file besar, mempertahankan header/import
3. **Kompresi eksekusi kode** — Hanya mempertahankan stdout/stderr yang esensial
4. **Kompresi kueri database** — Membatasi baris, menghapus metadata yang panjang
5. **Kompresi respons API** — Menghapus field null, meringkas array

#### Kapan digunakan

Kompresi hasil alat **selalu aktif** ketika terdapat pemanggilan alat. Tidak memerlukan
konfigurasi.

### Pipeline Bertumpuk

Mode bertumpuk menjalankan **beberapa mesin secara berurutan** — biasanya RTK terlebih dahulu
(penghematan 60-90% pada output alat), kemudian Caveman (penghematan tambahan 30% pada
teks yang tersisa). Ini menghasilkan **penghematan total 78-95%**.

#### Cara kerjanya

```
Input (1000 token)
  → RTK (filter berbasis perintah) → 200 token
    → Caveman (penghapusan kata pengisi) → 140 token
  → Output (140 token, penghematan 86%)
```

#### Kapan digunakan

Gunakan mode bertumpuk untuk:

- Alur kerja yang banyak menggunakan alat (pemrograman berbasis agen, riset)
- Pemrosesan batch yang sensitif terhadap biaya
- Saat Anda memerlukan penghematan token maksimal

Konfigurasikan melalui combo:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Penggantian Kombo Kompresi

Anda dapat mengganti mode kompresi global **untuk setiap kombo** guna menyempurnakan perilaku
bagi berbagai kasus penggunaan:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Ini berguna untuk:

- **Kombo pemrograman**: Gunakan mode `aggressive` untuk sesi panjang
- **Kombo tanya jawab singkat**: Gunakan mode `lite` untuk respons cepat
- **Kombo dengan banyak alat**: Gunakan mode `stacked` untuk penghematan maksimal
- **Kombo produksi**: Gunakan mode `cache-aware` untuk penyedia caching

---

## Lihat Juga

- [Konfigurasi Lingkungan](../reference/ENVIRONMENT.md) — Variabel lingkungan kompresi
- [Panduan Arsitektur](../architecture/ARCHITECTURE.md) — Bagian internal pipeline kompresi
- [Panduan Pengguna](../guides/USER_GUIDE.md) — Memulai penggunaan kompresi
- [Kompresi RTK](./RTK_COMPRESSION.md) — Filter RTK, model kepercayaan, gerbang verifikasi, pemulihan output mentah
- [Mesin Kompresi](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API, MCP, dasbor
- [Format Aturan Kompresi](./COMPRESSION_RULES_FORMAT.md) — Format paket aturan JSON
- [Paket Bahasa Kompresi](./COMPRESSION_LANGUAGE_PACKS.md) — Aturan Caveman khusus bahasa
