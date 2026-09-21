# 🗜️ Prompt Compression Guide — OmniRoute (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Jimat 15-95% pada konteks yang layak secara automatik. Untuk gambaran keseluruhan ringkas, lihat [bahagian Pemampatan README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Gambaran Keseluruhan

OmniRoute melaksanakan saluran paip pemampatan gesaan modular yang berjalan **secara proaktif** sebelum permintaan sampai kepada penyedia huluan. Ini bermakna penjimatan token anda berlaku secara telus — tiada perubahan diperlukan pada aliran kerja anda.

```
Permintaan Klien
  → Pemilih Strategi Pemampatan
    → Penggantian kombo? → Gunakan tetapan kombo
    → Ambang pencetus automatik? → Gunakan mod automatik
    → Mod lalai? → Gunakan tetapan global
    → Dimatikan? → Langkau pemampatan
  → Mod Pemampatan Terpilih
    → Dimatikan: Tiada pemampatan
    → Ringan: Pembersihan ruang putih/pemformatan yang selamat (~15%)
    → Standard: Pembuangan kata pengisi gaya ringkas (~30%)
    → Agresif: Pelapukan sejarah + peringkasan (~50%)
    → Ultra: Pemangkasan heuristik + penipisan blok kod (~75%)
    → RTK: Penapisan output terminal/alat yang peka terhadap perintah (julat huluan 60-90%)
    → Bertindan: Saluran paip berbilang enjin tersusun, biasanya RTK kemudian Caveman (julat layak 78-95%)
  → Permintaan Dimampatkan → Penyedia
```

---

## Mod Pemampatan

### Dimatikan

Tiada pemampatan digunakan. Semua mesej diteruskan tanpa perubahan.

### Mod Ringan (~15% penjimatan, kependaman <1ms)

Mod paling selamat — tiada perubahan semantik, hanya pembersihan pemformatan:

| Teknik                   | Penerangan                                            |
| ------------------------ | ----------------------------------------------------- |
| `collapseWhitespace`     | Gabungkan baris kosong berturutan dan ruang di hujung |
| `dedupSystemPrompt`      | Buang mesej sistem pendua                             |
| `compressToolResults`    | Mampatkan output alat/fungsi yang berjela-jela        |
| `removeRedundantContent` | Buang arahan berulang                                 |
| `replaceImageUrls`       | Pendekkan URI data imej base64                        |

**Terbaik untuk:** Penggunaan sentiasa aktif, aliran kerja yang mengutamakan keselamatan.

### Mod Standard (~30% penjimatan)

Diilhamkan oleh [Caveman](https://github.com/JuliusBrussee/caveman) — membuang kata pengisi dan ungkapan berjela-jela sambil mengekalkan maksud:

- Membuang kata pengisi ("sila", "saya rasa", "pada asasnya", "sebenarnya")
- Meringkaskan frasa berjela-jela ("untuk tujuan" → "untuk", "disebabkan oleh hakikat bahawa" → "kerana")
- Membuang ungkapan sopan yang berlapik ("Adakah anda keberatan...", "Jika anda boleh...")
- Lebih 30 peraturan regex yang ditala untuk gesaan pengekodan

**Terbaik untuk:** Aliran kerja pengekodan harian, pasukan yang mementingkan kos.

### Mod Agresif (~50% penjimatan)

Pengurusan sejarah pintar untuk sesi panjang:

- **Pelapukan Mesej** — mesej lama dimampatkan secara berperingkat
- **Peringkasan Hasil Alat** — output alat yang panjang digantikan dengan ringkasan
- **Pelindung Integriti Struktur** — memastikan pasangan `tool_use` + `tool_result` kekal konsisten
- **Kesedaran Tetingkap Konteks** — mematuhi had token bagi setiap model

**Terbaik untuk:** Sesi penyahpepijatan yang panjang, pangkalan kod yang besar.

### Mod Ultra (~75% penjimatan)

Pemampatan maksimum untuk senario yang kritikal dari segi token:

- **Pemangkasan Heuristik** — membuang mesej di bawah ambang kerelevanan
- **Penipisan Blok Kod** — memampatkan contoh kod yang berulang
- **Pemangkasan Carian Binari** — mencari titik pemotongan optimum untuk tetingkap konteks
- Semua ciri mod Agresif disertakan

**Terbaik untuk:** Apabila anda berulang kali mencapai had konteks.

### Mod RTK (julat huluan 60-90%)

Mod RTK dioptimumkan untuk output alat berjela-jela yang muncul dalam sesi ejen pengekodan:

- Mengesan kelas perintah/output seperti `git status`, `git diff`, `git log`, pelaksana ujian,
  binaan TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audit/pemasangan npm, log Docker, output
  infrastruktur dan output shell generik
- Menggunakan pek penapis JSON daripada `open-sse/services/compression/engines/rtk/filters/`
- Mengimport penapis skema TOML RTK v1 daripada fail `filters.toml` projek atau global, dengan pengesahan
  ujian sebaris dan kawalan berasaskan kepercayaan untuk fail projek
- Disertakan dengan 49 penapis terbina dalam bersama sampel pengesahan sebaris
- Membuang jujukan kawalan ANSI, bar kemajuan, baris berulang dan hingar yang tidak boleh diambil tindakan
- Mengekalkan kegagalan, ralat, amaran, fail yang diubah, ringkasan dan bahagian akhir output panjang
- Menyokong penapis projek yang dikawal berasaskan kepercayaan, penapis global dan pemulihan output mentah yang disunting secara pilihan

**Terbaik untuk:** Sesi ejen dengan transkrip shell, binaan, ujian, git, grep dan output fail.

### Mod Bertindan (julat layak 78-95%)

Mod Bertindan menjalankan berbilang enjin pemampatan dalam susunan yang deterministik. Saluran paip lalai ialah:

```txt
RTK -> Caveman
```

Susunan itu memastikan output terminal/alat diringkaskan terlebih dahulu, kemudian menggunakan pemadatan semantik Caveman pada
gesaan bahasa semula jadi yang berbaki. Saluran paip bertindan boleh dikonfigurasikan secara global atau melalui
kombo pemampatan yang ditetapkan kepada kombo penghalaan.

**Terbaik untuk:** Konteks bercampur dengan log alat yang besar serta arahan manusia atau ringkasan pembantu.

---

## Matematik Penjimatan Upstream

OmniRoute mendokumenkan penjimatan pemampatan daripada dua sumber: penanda aras projek upstream dan
komposisi enjin OmniRoute sendiri.

| Sumber  | Angka README upstream yang digunakan di sini                                                                              |
| ------- | ------------------------------------------------------------------------------------------------------------------------- |
| Caveman | `~75%` kurang token output, `65%` purata penjimatan output penanda aras, julat `22-87%`, dan alat pemampatan input `~46%` |
| RTK     | Penjimatan output perintah `60-90%`; sesi contoh `~118,000 -> ~23,900` token, atau penjimatan `79.7%` (`~80%`)            |

Untuk muatan alat/konteks yang bertindih, gabungan lalai OmniRoute menyusun enjin seperti berikut:

```txt
RTK -> Caveman
```

Penjimatan gabungan adalah secara daraban, bukan penambahan:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Angka `78-95%` itu terpakai apabila RTK dan Caveman kedua-duanya boleh mengurangkan muatan input/konteks yang sama.
Mod output respons Caveman adalah berasingan: apabila didayakan, gunakan penjimatan output Caveman sendiri (`65%`
secara purata, tajuk utama `~75%`, julat `22-87%`). Jumlah penjimatan bil bergantung pada gabungan gesaan/output anda.

### Maksud sebenar "layak"

Julat tajuk utama 15-95% adalah benar, tetapi ia hanya terpakai pada kandungan **berlebihan atau berjela-jela** — baris
ralat berulang, log binaan yang menghujani output dengan amaran yang sama, atau longgokan bacaan `grep`/fail yang terlalu besar. Ia
**tidak** bermakna setiap permintaan menjimatkan sebanyak itu.

Disahkan secara empirikal (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): satu
pelaksanaan `stacked` (RTK + Caveman) terhadap blok `tool_result` berbentuk Anthropic yang mengandungi 300 baris
ralat serupa menghasilkan **penjimatan token sebanyak 95.93% / penjimatan aksara sebanyak 96.26%** — tepat dalam julat yang
diiklankan. Namun, saluran yang sama apabila dijalankan terhadap output alat biasa yang tidak berlebihan (senarai padanan `grep` yang bersih,
bacaan fail pendek, teks perbualan biasa) menghasilkan **penjimatan hampir sifar** dengan tepat, kerana
tiada unsur berulang untuk dibuang dan `validateCompression()` (`validation.ts`) enggan menghantar
penulisan semula yang akan menggugurkan atau mengubah blok kod, URL, tajuk, versi atau pengecam pemalar ALL-CAPS.

Ini ialah tingkah laku selamat yang dijangkakan, bukannya pepijat: sesi pengekodan yang kebanyakannya membaca/melakukan grep pada fail bersih akan
mencatat jumlah penjimatan yang sederhana walaupun pemampatan didayakan sepenuhnya, manakala sesi yang mengalami
gelung kegagalan atau linter yang terlalu banyak mengeluarkan mesej akan mencatat julat penuh 78-95% untuk trafik tersebut. Jangan gunakan peratusan
penjimatan agregat yang rendah daripada satu sesi sebagai bukti bahawa pemampatan tersalah konfigurasi — periksa terlebih dahulu sama ada
output alat yang mendasarinya sememangnya berlebihan.

---

## Visualisasi Penjimatan Token

```
Tanpa pemampatan: 47K token dihantar kepada LLM
Dengan Lite:      40K token dihantar            (15% dijimatkan — selamat, sentiasa aktif)
Dengan Standard:  33K token dihantar            (30% dijimatkan — peraturan caveman-speak)
Dengan Aggressive: 24K token dihantar           (50% dijimatkan — penuaan + peringkasan)
Dengan Ultra:     12K token dihantar            (75% dijimatkan — pemangkasan heuristik)
Dengan RTK:       19K-5K token dihantar         (60-90% dijimatkan pada output perintah/alat)
Dengan Stacked:   10K-2.5K token dihantar       (julat RTK+Caveman yang layak sebanyak 78-95%)
```

---

## Konfigurasi

### Papan Pemuka

Navigasi ke `Dashboard → Context & Cache`:

- **Caveman** — pemilihan mod, pek bahasa, pratonton dan tetapan lalai global
- **RTK** — pratonton penapis perintah, tetapan keselamatan RTK dan katalog penapis
- **Compression Combos** — saluran enjin bernama yang ditetapkan kepada kombo penghalaan
- **Auto-Trigger Threshold** — aktifkan pemampatan secara automatik apabila kiraan token melebihi ambang

### Penggantian Mengikut Kombo

Dalam `Dashboard → Context & Cache → Compression Combos`, tetapkan kombo pemampatan kepada kombo
penghalaan:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ini membolehkan anda menggunakan pemampatan bertindan pada penyedia percuma/pengekodan sambil mengekalkan mod ringan pada
langganan berbayar.

Penetapan "Penggantian Mengikut Kombo" ini ialah kawalan yang berbeza daripada penggantian **mod pemampatan
kombo penghalaan** (Default/Off/Lite/Standard/Aggressive/Ultra) — penggantian tersebut tidak memilih saluran
kombo pemampatan bernama; ia hanya menetapkan medan `compressionMode` yang dirujuk oleh
`resolveCompressionPlan`. Ia boleh ditetapkan sama ada pada kad kombo (`Dashboard → Combos`) atau, sejak
#6760, bagi setiap kombo penghalaan dalam senarai "Assign to routing" di
`Dashboard → Context & Cache → Compression Combos`, betul-betul di sebelah kotak pilihan penetapan saluran
yang didokumenkan di atas. Kedua-dua antara muka menyimpan perubahan melalui titik akhir `PUT /api/combos/{id}` yang sama.

### Penggantian bagi setiap permintaan

Hantar pengepala permintaan `x-omniroute-compression` untuk menggantikan pelan pemampatan bagi satu
permintaan. Ia mempunyai keutamaan tertinggi — ia mengatasi penggantian kombo penghalaan, profil aktif,
pencetus automatik dan tetapan Default panel. Nilai yang tidak dikenali akan diabaikan (permintaan tidak pernah ditolak) dan
suis induk global masih mengawal semuanya: apabila pemampatan dimatikan secara global, pengepala tidak boleh
menghidupkannya. Nilai:

| Nilai         | Kesan                                                                                                             |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| `off`         | Tiada pemampatan untuk permintaan ini.                                                                            |
| `default`     | Profil Default yang diperoleh daripada panel (mengabaikan profil aktif).                                          |
| `engine:<id>` | Satu enjin apabila didayakan, contohnya `engine:rtk`.                                                             |
| `<combo>`     | Kombo bernama, dipadankan mengikut nama (tidak sensitif huruf besar/kecil) terlebih dahulu, kemudian mengikut id. |

Pelan yang digunakan dikembalikan dalam pengepala respons `X-OmniRoute-Compression: <mode>; source=<source>`,
dengan `<source>` ialah salah satu daripada `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` atau `off`.

### API

```bash
# Dapatkan tetapan pemampatan
curl http://localhost:20128/api/settings/compression

# Kemas kini tetapan pemampatan
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pratonton muatan RTK/bertindan tertentu
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Senaraikan pek penapis RTK
curl http://localhost:20128/api/context/rtk/filters

# Uji RTK secara langsung dengan metadata perintah pilihan
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Perkara yang Dilindungi

Enjin pemampatan **sentiasa mengekalkan:**

- ✅ Blok kod (berpagar dan sebaris)
- ✅ URL dan laluan fail
- ✅ Struktur JSON dan data berstruktur
- ✅ Pengecam dan token teknikal yang dilindungi
- ✅ Ungkapan matematik
- ✅ Takrif panggilan alat/fungsi
- ✅ Gesaan sistem (dalam mod lite)

Pemulihan output mentah RTK menyunting keluar kunci API lazim, token pembawa, token Slack, kunci akses AWS,
kata laluan, token dan rahsia sebelum apa-apa disimpan.

---

## Statistik Pemampatan

Setiap permintaan yang dimampatkan menyertakan statistik dalam log pelayan:

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

## Pelan Hala Tuju Fasa

| Fasa    | Mod                                                                                                                                                 | Status         |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| Fasa 1  | Off, Lite                                                                                                                                           | ✅ Dilancarkan |
| Fasa 2  | Standard, Aggressive, Ultra                                                                                                                         | ✅ Dilancarkan |
| Fasa 3  | RTK, Stacked, Gabungan Pemampatan                                                                                                                   | ✅ Dilancarkan |
| Fasa 4  | Gaya Output, Ultra peringkat SLM, abah-abah penilaian                                                                                               | ✅ Dilancarkan |
| Fasa 4C | Belanjawan konteks adaptif ("dail") — enjin pengiraan + API (`contextBudget` pada `PUT /api/settings/compression`) + kawalan mod/dasar papan pemuka | ✅ Dilancarkan |

---

## Penghargaan

Peraturan pemampatan mod Standard diinspirasikan oleh **[Caveman](https://github.com/JuliusBrussee/caveman)** oleh **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — projek tular "mengapa guna banyak token apabila sedikit token sudah memadai". Caveman melaporkan `~75%` kurang token output, purata penjimatan output penanda aras sebanyak `65%`, julat output `22-87%` dan alat pemampatan input `~46%`.

Mod RTK diinspirasikan oleh **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** oleh **[RTK AI](https://github.com/rtk-ai)** — projek pemampatan output perintah berprestasi tinggi untuk terminal, binaan, ujian, git dan penapisan output alat. RTK melaporkan penjimatan `60-90%`, dengan sesi contoh dalam READMEnya menunjukkan penjimatan `~80%`.

---

## Sistem Pemampatan Lanjutan

Selain 7 mod standard, OmniRoute menyertakan beberapa sistem pemampatan
lanjutan yang berfungsi secara automatik berdasarkan konteks.

### Pemampatan Peka Cache

Sesetengah penyedia (seperti Anthropic dengan caching gesaan) menyokong **caching gesaan**,
yang membolehkan mereka menyimpan sebahagian gesaan dalam cache untuk mengurangkan kos dan kependaman. Apabila
caching didayakan, pemampatan agresif sebenarnya boleh **menjejaskan** prestasi
kerana ia mengubah token yang dicache, sekali gus membatalkan cache.

Modul `cachingAware.ts` menyelesaikan perkara ini dengan **mengesan konteks caching** dan
**melaraskan strategi pemampatan** sewajarnya.

#### Cara ia berfungsi

1. **Kesan konteks caching** — Mengimbas isi permintaan untuk penanda `cache_control`
2. **Kenal pasti penyedia caching** — Memeriksa sama ada penyedia sasaran menyokong caching
3. **Laraskan strategi** — Menurunkan taraf `aggressive`/`ultra` kepada `standard` untuk penyedia caching
4. **Langkau gesaan sistem** — Gesaan sistem biasanya dicache, jadi jangan mampatkannya
5. **Gunakan transformasi deterministik** — Hanya gunakan transformasi yang menghasilkan output konsisten

#### Contoh kod

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

#### Bila hendak digunakan

Pemampatan peka cache **sentiasa aktif** — tiada konfigurasi diperlukan. Ia hanya diaktifkan
apabila:

- Permintaan mempunyai penanda `cache_control`
- Penyedia sasaran menyokong caching gesaan (Anthropic, OpenAI dan sebagainya)

### Penuaan Progresif

Perbualan panjang menghimpunkan banyak giliran mesej, tetapi giliran yang lebih lama menjadi kurang
relevan. Modul `progressiveAging.ts` **mengurangkan tahap perincian mesej mengikut jarak giliran**:

- **Giliran terkini (0-3)**: Dikekalkan kata demi kata (butiran penuh)
- **Giliran pertengahan (4-8)**: Pemampatan Lite (pembersihan ruang kosong dan pemformatan)
- **Giliran lama (9+)**: Pemampatan Caveman (penyingkiran pengisi dan peringkasan)
- **Giliran sangat lama (20+)**: Diringkaskan secara menyeluruh atau digugurkan

#### Contoh kod

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 giliran lagi ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 3 giliran pertama: kata demi kata
  light: 8, // Giliran 4-8: pemampatan lite
  moderate: 20, // Giliran 9-20: pemampatan caveman
  // Giliran 21+: peringkasan menyeluruh
});

// saved = bilangan token yang dijimatkan
```

#### Bila hendak digunakan

Penuaan progresif **sentiasa aktif** untuk mod `aggressive` dan `ultra`. Ia
amat berkesan khususnya untuk:

- Sesi pengekodan yang berjalan lama
- Perbualan berbilang hari
- Aliran kerja berasaskan ejen dengan banyak panggilan alat

### Mod Output Caveman

Modul `outputMode.ts` menyuntik **arahan gesaan sistem** untuk membuatkan
model itu sendiri menghasilkan output yang dimampatkan dan ringkas (gaya "caveman").

#### Cara ia berfungsi

Daripada memampatkan input, mod ini menambahkan gesaan sistem seperti:

> "Balas dengan perkataan minimum. Abaikan basa-basi. Gunakan ayat pendek."

Ini amat berkesan khususnya untuk:

- Penjanaan kod (output lebih ringkas = token lebih sedikit)
- Soal jawab pantas (tidak memerlukan penerangan panjang lebar)
- Pemprosesan kelompok (memaksimumkan daya pemprosesan)

#### Masa untuk digunakan

Mod output Caveman adalah **pilihan ikut serta** — tetapkannya melalui konfigurasi kombo:

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

Mod output Caveman di atas ialah **laluan gaya tunggal legasi**. Fasa 4 memperluaskannya
menjadi katalog gaya output yang boleh digabungkan: `OUTPUT_STYLE_CATALOG` dalam
`open-sse/services/compression/outputStyles/catalog.ts`. Setiap gaya ialah arahan gesaan sistem
yang membuatkan model itu sendiri menghasilkan output yang lebih murah; gaya boleh didayakan
bersama-sama dan disuntik mengikut susunan katalog.

| Gaya                                  | `id`          | Fungsinya                                                                                                                                                                                                                                                 | Bahasa arahan                                                                                 |
| ------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Prosa ringkas                         | `terse-prose` | Gugurkan kata pengisi/kata sandang/ungkapan keraguan; kekalkan kandungan teknikal dengan tepat. Teks yang sama seperti mod output caveman legasi (dirujuk, bukan ditaip semula).                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                 |
| Kurang kod                            | `less-code`   | Tangga YAGNI: perubahan berfungsi yang paling kecil, tanpa abstraksi yang tidak diminta.                                                                                                                                                                  | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                 |
| Ponytail (pembangun kanan yang malas) | `ponytail`    | "Kod terbaik ialah kod yang tidak pernah ditulis": guna semula > tulis semula, punca utama > gejala, diff berfungsi yang paling pendek.                                                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                 |
| Saya mempunyai ADHD (tindakan dahulu) | `i-have-adhd` | Tindakan dahulu (perintah/laluan/cebis kod sebelum prosa), langkah bernombor yang terhad, SATU langkah seterusnya yang konkrit, tanpa mukadimah/ringkasan/penutup. Diadaptasi daripada [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                 |
| CJK ringkas (文言)                    | `terse-cjk`   | Gaya bahasa Cina klasik yang sangat ringkas.                                                                                                                                                                                                              | zh (dihadkan mengikut penempatan: hanya ditawarkan apabila bahasa yang ditentukan ialah `zh`) |

Setiap gaya disertakan dengan tiga tahap keamatan — `lite`, `full`, `ultra` — dan setiap tahap
diakhiri dengan klausa sempadan bersama, yang mengekalkan blok kod, laluan fail, perintah,
rentetan ralat, URL dan pengecam secara verbatim.

#### Cara suntikan berfungsi

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) menentukan
pilihan berdasarkan katalog (id yang tidak diketahui dan gaya yang tidak sepadan dengan penempatan
digugurkan, tanpa menghasilkan ralat), menggabungkan arahan yang dipilih mengikut susunan katalog,
menambahkan klausa sempadan **sekali**, dan meletakkan hasilnya di hadapan gesaan sistem
selepas satu penanda idempoten (`[OmniRoute Output Styles]`) — penggunaan semula
tidak melakukan apa-apa. Apabila bahasa permintaan yang dikesan mempunyai terjemahan, arahan
setempat disuntik dan bukannya arahan bahasa Inggeris.

#### Cara mendayakan

Dalam papan pemuka: **Konteks → Tetapan → Pemampatan** — satu baris bagi setiap gaya dengan
togol hidup/mati dan pemilih tahap. Secara pengaturcaraan, konfigurasi pemampatan menyimpan
pilihan sebagai:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Keserasian ke belakang: tetapan kombo legasi `outputMode: "caveman"` masih berfungsi dan dipetakan kepada
`terse-prose`, sama bait demi bait dengan suntikan lama dalam setiap bahasa legasi.

Pemilihan bahasa: apabila `languageConfig.enabled` dihidupkan, `autoDetect` memilih
bahasa mesej pengguna terkini (pengesan yang sama seperti enjin input);
mematikan `autoDetect` menetapkan `defaultLanguage`. Mati → bahasa Inggeris.

Matriks gaya × bahasa ditetapkan oleh
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: gaya baharu tidak boleh dikeluarkan
tanpa sekurang-kurangnya terjemahan pt-BR (atau pengecualian eksplisit yang dijejaki), dan
gaya sedia ada tidak boleh kehilangan penempatan secara senyap. Untuk menambahkan gaya, lihat
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Pemampatan Hasil Alat

Modul `toolResultCompressor.ts` menyediakan **5 strategi pemampatan khusus**
untuk hasil alat (panggilan fungsi, output ejen, hasil carian dan sebagainya):

1. **Pemampatan hasil carian** — Mengalih keluar hasil berlebihan, mengekalkan N teratas
2. **Pemampatan pembacaan fail** — Memotong fail besar, mengekalkan pengepala/import
3. **Pemampatan pelaksanaan kod** — Hanya mengekalkan stdout/stderr yang penting
4. **Pemampatan pertanyaan pangkalan data** — Mengehadkan baris, mengalih keluar metadata berjela-jela
5. **Pemampatan respons API** — Membuang medan nol, memadatkan tatasusunan

#### Masa untuk digunakan

Pemampatan hasil alat **sentiasa aktif** apabila terdapat panggilan alat. Tiada
konfigurasi diperlukan.

### Talian Paip Bertindan

Mod bertindan menjalankan **berbilang enjin secara berurutan** — biasanya RTK dahulu
(penjimatan 60-90% pada output alat), kemudian Caveman (penjimatan tambahan 30% pada
teks yang selebihnya). Ini mencapai **jumlah penjimatan 78-95%**.

#### Cara ia berfungsi

```
Input (1000 token)
  → RTK (penapis peka perintah) → 200 token
    → Caveman (penyingkiran kata pengisi) → 140 token
  → Output (140 token, penjimatan 86%)
```

#### Masa untuk digunakan

Gunakan mod bertindan untuk:

- Aliran kerja yang banyak menggunakan alat (pengekodan berasaskan ejen, penyelidikan)
- Pemprosesan kelompok yang sensitif terhadap kos
- Apabila anda memerlukan penjimatan token maksimum

Konfigurasikan melalui kombo:

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

## Penggantian Gabungan Pemampatan

Anda boleh menggantikan mod pemampatan global **bagi setiap gabungan** untuk memperhalus tingkah laku
bagi kes penggunaan yang berbeza:

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

- **Gabungan pengekodan**: Gunakan mod `aggressive` untuk sesi yang panjang
- **Gabungan soal jawab pantas**: Gunakan mod `lite` untuk respons yang pantas
- **Gabungan yang banyak menggunakan alat**: Gunakan mod `stacked` untuk penjimatan maksimum
- **Gabungan produksi**: Gunakan mod `cache-aware` untuk penyedia yang menyokong cache

---

## Lihat Juga

- [Konfigurasi Persekitaran](../reference/ENVIRONMENT.md) — Pemboleh ubah persekitaran pemampatan
- [Panduan Seni Bina](../architecture/ARCHITECTURE.md) — Komponen dalaman saluran paip pemampatan
- [Panduan Pengguna](../guides/USER_GUIDE.md) — Bermula dengan pemampatan
- [Pemampatan RTK](./RTK_COMPRESSION.md) — Penapis RTK, model kepercayaan, gerbang pengesahan, pemulihan output mentah
- [Enjin Pemampatan](./COMPRESSION_ENGINES.md) — Caveman, RTK, bertindan, API, MCP, papan pemuka
- [Format Peraturan Pemampatan](./COMPRESSION_RULES_FORMAT.md) — Format pek peraturan JSON
- [Pek Bahasa Pemampatan](./COMPRESSION_LANGUAGE_PACKS.md) — Peraturan Caveman khusus bahasa
