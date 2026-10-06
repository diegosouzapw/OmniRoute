# 🗜️ Prompt Compression Guide — OmniRoute (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Jimat 15-95% pada konteks yang layak secara automatik. Untuk gambaran ringkas, lihat bahagian [Mampatan README](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Gambaran Keseluruhan

OmniRoute melaksanakan saluran paip mampatan prompt modular yang berjalan **secara proaktif** sebelum permintaan mencapai penyedia huluan. Ini bermakna penjimatan token anda berlaku secara telus — tiada perubahan diperlukan pada aliran kerja anda.

```
Permintaan Klien
  → Pemilih Strategi Mampatan
    → Ganti kombo? → Gunakan tetapan kombo
    → Ambang pencetus automatik? → Gunakan mod auto
    → Mod lalai? → Gunakan tetapan global
    → Mati? → Langkau mampatan
  → Mod Mampatan Terpilih
    → Mati: Tiada mampatan
    → Lite: Pembersihan ruang kosong/pemformatan selamat (~15%)
    → Standard: Pembuangan pengisi bahasa Caveman (~30%)
    → Agresif: Penuaan sejarah + ringkasan (~50%)
    → Ultra: Pemangkasan heuristik + penipisan blok kod (~75%)
    → RTK: Penapisan output terminal/alat yang peka arahan (julat huluan 60-90%)
    → Bertindan: Saluran paip berbilang enjin yang tersusun, biasanya RTK kemudian Caveman (julat layak 78-95%)
  → Permintaan Termampat → Penyedia
```

---

## Mod Mampatan

### Mati

Tiada mampatan diterapkan. Semua mesej melalui tanpa perubahan.

### Mod Lite (penjimatan ~15%, kependaman <1ms)

Mod paling selamat — sifar perubahan semantik, hanya pembersihan pemformatan:

| Teknik                   | Penerangan                                             |
| :----------------------- | :----------------------------------------------------- |
| `collapseWhitespace`     | Gabungkan baris kosong berturut-turut dan ruang hujung |
| `dedupSystemPrompt`      | Buang mesej sistem yang berulang                       |
| `compressToolResults`    | Mampatkan output alat/fungsi yang bertele-tele         |
| `removeRedundantContent` | Buang arahan yang berulang                             |
| `replaceImageUrls`       | Pendekkan URI data imej base64                         |

**Terbaik untuk:** Penggunaan sentiasa aktif, aliran kerja kritikal keselamatan.

### Mod Standard (penjimatan ~30%)

Diinspirasikan oleh [Caveman](https://github.com/JuliusBrussee/caveman) — membuang perkataan pengisi dan frasa bertele-tele sambil mengekalkan makna:

- Membuang perkataan pengisi ("please", "I think", "basically", "actually")
- Memadatkan frasa bertele-tele ("in order to" → "to", "as a result of" → "because")
- Membuang pagar sopan ("Would you mind...", "If you could possibly...")
- 30+ peraturan regex yang disesuaikan untuk prompt pengekodan

**Terbaik untuk:** Aliran kerja pengekodan harian, pasukan yang mementingkan kos.

### Mod Agresif (penjimatan ~50%)

Pengurusan sejarah pintar untuk sesi yang panjang:

- **Penuaan Mesej** — mesej lama dimampatkan secara progresif
- **Ringkasan Hasil Alat** — output alat yang panjang digantikan dengan ringkasan
- **Pengawal Integriti Struktur** — memastikan pasangan `tool_use` + `tool_result` kekal konsisten
- **Kesedaran Tetingkap Konteks** — menghormati had token setiap model

**Terbaik untuk:** Sesi penyahpepijatan lanjutan, pangkalan kod yang besar.

### Mod Ultra (penjimatan ~75%)

Mampatan maksimum untuk senario kritikal token:

- **Pemangkasan Heuristik** — membuang mesej di bawah ambang perkaitan
- **Penipisan Blok Kod** — memampatkan contoh kod yang berulang
- **Pemotongan Carian Binari** — mencari titik potong optimum untuk tetingkap konteks
- Semua ciri mod Agresif disertakan

**Terbaik untuk:** Apabila anda berulang kali mencapai had konteks.

### Mod RTK (julat huluan 60-90%)

Mod RTK dioptimumkan untuk output alat yang bertele-tele yang muncul dalam sesi ejen pengekodan:

- Mengesan kelas arahan/output seperti `git status`, `git diff`, `git log`, pelari ujian,
  binaan TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audit/pemasangan npm, log Docker, output infra, dan output shell generik
- Menerapkan pek penapis JSON daripada `open-sse/services/compression/engines/rtk/filters/`
- Mengimport penapis skema RTK TOML v1 daripada fail `filters.toml` projek atau global, dengan pengesahan ujian sebaris dan pintu kepercayaan untuk fail projek
- Menghantar 49 penapis terbina dalam dengan sampel pengesahan sebaris
- Membuang urutan kawalan ANSI, bar kemajuan, baris berulang, dan hingar yang tidak boleh diambil tindakan
- Mengekalkan kegagalan, ralat, amaran, fail yang diubah, ringkasan, dan hujung output yang panjang
- Menyokong penapis projek berpagar kepercayaan, penapis global, dan pemulihan output mentah yang disunting secara pilihan

**Terbaik untuk:** Sesi ejen dengan transkrip shell, binaan, ujian, git, grep, dan output fail.

### Mod Bertindan (julat layak 78-95%)

Mod bertindan menjalankan berbilang enjin mampatan dalam susunan yang ditentukan. Saluran paip lalai ialah:

```txt
RTK -> Caveman
```

Susunan itu mengekalkan output terminal/alat yang padat terlebih dahulu, kemudian menerapkan pemeluwapan semantik Caveman pada prompt bahasa semula jadi yang tinggal. Saluran paip bertindan boleh dikonfigurasi secara global atau melalui kombo mampatan yang diberikan kepada kombo penghalaan.

**Terbaik untuk:** Konteks campuran dengan log alat yang besar serta arahan manusia atau ringkasan pembantu.

---

## Matematik Penjimatan Hulu

OmniRoute mendokumenkan penjimatan mampatan daripada dua sumber: penanda aras projek hulu dan
komposisi enjin OmniRoute sendiri.

| Sumber  | Nombor README hulu yang digunakan di sini                                                                                      |
| ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` token output lebih sedikit, `65%` penjimatan output purata penanda aras, julat `22-87%`, dan alat mampatan input `~46%` |
| RTK     | `60-90%` penjimatan output arahan; sesi sampel `~118,000 -> ~23,900` token, atau `79.7%` disimpan (`~80%`)                     |

Untuk muatan alat/konteks yang bertindih, kombo OmniRoute lalai menyusun enjin:

```txt
RTK -> Caveman
```

Penjimatan gabungan adalah secara multiplikatif, bukan aditif:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Nombor `78-95%` itu terpakai apabila RTK dan Caveman boleh mengurangkan muatan input/konteks yang sama.
Mod output respons Caveman adalah berasingan: apabila diaktifkan, gunakan penjimatan output Caveman sendiri (`65%`
purata, `~75%` utama, julat `22-87%`). Jumlah penjimatan bil bergantung pada campuran prompt/output anda.

### Apa maksud "layak" sebenarnya

Julat utama 15-95% adalah nyata, tetapi ia hanya terpakai untuk kandungan yang **berlebihan atau bertele-tele** — baris ralat yang berulang, log binaan yang menghantar amaran yang sama, buangan `grep`/baca fail yang terlalu besar. Ia **tidak** bermakna setiap permintaan menjimatkan sebanyak itu.

Disahkan secara empirik (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): larian `stacked` (RTK + Caveman) terhadap blok `tool_result` berbentuk Anthropic yang mengandungi 300 baris ralat yang sama menghasilkan **95.93% penjimatan token / 96.26% penjimatan aksara** — tepat dalam julat yang diiklankan. Tetapi saluran paip yang sama dijalankan terhadap output alat biasa, tidak berlebihan (senarai padanan `grep` yang bersih, bacaan fail pendek, teks perbualan biasa) dengan betul menghasilkan **penjimatan hampir sifar**, kerana tiada apa-apa yang berulang untuk dialih keluar dan `validateCompression()` (`validation.ts`) enggan menghantar penulisan semula yang akan menggugurkan atau mengubah blok kod, URL, tajuk, versi, atau pengecam pemalar ALL-CAPS.

Ini adalah tingkah laku yang dijangka dan selamat, bukan pepijat: sesi pengekodan yang kebanyakannya membaca/mencari fail bersih akan melihat jumlah penjimatan yang sederhana walaupun dengan mampatan diaktifkan sepenuhnya, manakala sesi yang mengalami gelung gagal atau linter yang banyak bercakap akan melihat julat penuh 78-95% pada trafik tersebut. Jangan gunakan peratusan penjimatan agregat rendah satu sesi sebagai bukti mampatan salah konfigurasi — periksa sama ada output alat asas sebenarnya berlebihan terlebih dahulu.

---

## Visualisasi Penjimatan Token

```
Without compression: 47K tokens sent to LLM
With Lite:           40K tokens sent          (15% saved — safe, always-on)
With Standard:       33K tokens sent          (30% saved — caveman-speak rules)
With Aggressive:     24K tokens sent          (50% saved — aging + summarization)
With Ultra:          12K tokens sent          (75% saved — heuristic pruning)
With RTK:            19K-5K tokens sent       (60-90% saved on command/tool output)
With Stacked:        10K-2.5K tokens sent     (78-95% eligible RTK+Caveman range)
```

---

## Konfigurasi

### Papan Pemuka

Navigasi ke `Dashboard → Context & Cache`:

- **Caveman** — pemilihan mod, pek bahasa, pratonton, dan lalai global
- **RTK** — pratonton penapis arahan, tetapan keselamatan RTK, dan katalog penapis
- **Compression Combos** — saluran paip enjin bernama yang diberikan kepada kombo penghalaan
- **Auto-Trigger Threshold** — secara automatik melibatkan mampatan apabila kiraan token melebihi ambang

### Ganti Per-Kombo

Dalam `Dashboard → Context & Cache → Compression Combos`, berikan kombo mampatan kepada kombo penghalaan:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Ini membolehkan anda menggunakan mampatan bertindan pada penyedia percuma/pengekodan sambil mengekalkan mod lite pada langganan berbayar.

Penugasan "Ganti Per-Kombo" ini adalah kawalan yang berbeza daripada ganti **mod mampatan kombo penghalaan** (Default/Off/Lite/Standard/Aggressive/Ultra) — ganti tersebut tidak memilih saluran paip kombo mampatan bernama; ia hanya menetapkan medan `compressionMode` yang dirujuk oleh `resolveCompressionPlan`. Ia boleh ditetapkan sama ada pada kad kombo (`Dashboard → Combos`) atau, sejak #6760, setiap kombo penghalaan dalam senarai "Assign to routing" pada `Dashboard → Context & Cache → Compression Combos`, betul-betul di sebelah kotak semak penugasan saluran paip yang didokumenkan di atas. Kedua-dua permukaan kekal melalui titik akhir `PUT /api/combos/{id}` yang sama.

### Ganti per-permintaan

Hantar pengepala permintaan `x-omniroute-compression` untuk menggantikan pelan mampatan untuk satu permintaan. Ia mempunyai keutamaan tertinggi — ia mengatasi ganti kombo penghalaan, profil aktif, pencetus automatik, dan Lalai panel. Nilai yang tidak diketahui diabaikan (permintaan tidak pernah ditolak) dan suis induk global masih mengawal segala-galanya: apabila mampatan dimatikan secara global, pengepala tidak boleh menghidupkannya. Nilai:

| Nilai         | Kesan                                                                                                           |
| :------------ | :-------------------------------------------------------------------------------------------------------------- |
| `off`         | Tiada mampatan untuk permintaan ini.                                                                            |
| `default`     | Profil Lalai terbitan panel (mengabaikan profil aktif). Enjin yang hilang data dibiarkan mati.                  |
| `safe`        | Sama seperti menghilangkan pengepala: dedup dan lipatan ruang kosong sahaja.                                    |
| `allow-lossy` | Kekalkan pelan operator permintaan ini, termasuk ringkasan, penapis perkaitan, dan penulisan semula gaya.       |
| `engine:<id>` | Satu enjin apabila diaktifkan, cth. `engine:rtk`. Ini adalah pilihan masuk per-permintaan untuk enjin tersebut. |
| `<combo>`     | Kombo bernama, dipadankan mengikut nama (tidak sensitif huruf besar/kecil) dahulu, kemudian mengikut id.        |

Tanpa `allow-lossy`, `engine:<id>`, atau kombo bernama, enjin yang hilang data tidak digunakan. Permintaan masih mendapat dedup sesi dan lipatan ruang kosong apabila mampatan dihidupkan.

Pelan yang digunakan diulang semula dalam pengepala respons `X-OmniRoute-Compression: <mode>; source=<source>`, di mana `<source>` adalah salah satu daripada `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default`, atau `off`.

### API

```bash
# Dapatkan tetapan mampatan
curl http://localhost:20128/api/settings/compression

# Kemas kini tetapan mampatan
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Pratonton muatan RTK/bertindan tertentu
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Senaraikan pek penapis RTK
curl http://localhost:20128/api/context/rtk/filters

# Uji RTK secara langsung dengan metadata arahan pilihan
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Apa Yang Dilindungi

Enjin pemampatan **sentiasa mengekalkan:**

- ✅ Blok kod (berpagar dan sebaris)
- ✅ URL dan laluan fail
- ✅ Struktur JSON dan data berstruktur
- ✅ Pengecam dan token teknikal yang dilindungi
- ✅ Ungkapan matematik
- ✅ Definisi panggilan alat/fungsi
- ✅ Gesaan sistem (dalam mod lite)

Pemulihan output mentah RTK menyunting kunci API biasa, token pembawa, token Slack, kunci akses AWS,
kata laluan, token, dan rahsia sebelum apa-apa disimpan.

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

| Fasa    | Mod                                                                                                                                                 | Status      |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| Fasa 1  | Mati, Lite                                                                                                                                          | ✅ Dihantar |
| Fasa 2  | Standard, Agresif, Ultra                                                                                                                            | ✅ Dihantar |
| Fasa 3  | RTK, Bertindan, Gabungan Pemampatan                                                                                                                 | ✅ Dihantar |
| Fasa 4  | Gaya Output, Ultra peringkat SLM, eval harness                                                                                                      | ✅ Dihantar |
| Fasa 4C | Belanjawan konteks adaptif ("dial") — enjin pengiraan + API (`contextBudget` pada `PUT /api/settings/compression`) + kawalan mod/dasar papan pemuka | ✅ Dihantar |

---

## Penghargaan

Peraturan pemampatan mod standard diinspirasikan oleh **[Caveman](https://github.com/JuliusBrussee/caveman)** oleh **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — projek viral "mengapa guna banyak token apabila sedikit token boleh buat helah". Caveman melaporkan `~75%` token output yang lebih sedikit, `65%` purata penjimatan output penanda aras, julat output `22-87%`, dan alat pemampatan input `~46%`.

Mod RTK diinspirasikan oleh **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** oleh **[RTK AI](https://github.com/rtk-ai)** — projek pemampatan output arahan berprestasi tinggi untuk terminal, binaan, ujian, git, dan penapisan output alat. RTK melaporkan penjimatan `60-90%`, dengan sesi sampel README menunjukkan `~80%` disimpan.

---

## Sistem Pemampatan Lanjutan

Selain 7 mod standard, OmniRoute menyertakan beberapa sistem pemampatan lanjutan
yang berfungsi secara automatik berdasarkan konteks.

### Pemampatan Sedar Cache

Sesetengah penyedia (seperti Anthropic dengan penimbalan gesaan) menyokong **penimbalan gesaan**,
yang membolehkan mereka menimbal sebahagian daripada gesaan untuk mengurangkan kos dan kependaman. Apabila
penimbalan diaktifkan, pemampatan agresif sebenarnya boleh **merosakkan** prestasi
kerana ia mengubah token yang ditimbal, membatalkan cache.

Modul `cachingAware.ts` menyelesaikan masalah ini dengan **mengesan konteks penimbalan** dan
**menyesuaikan strategi pemampatan** dengan sewajarnya.

#### Cara ia berfungsi

1.  **Mengesan konteks penimbalan** — Mengimbas badan permintaan untuk penanda `cache_control`
2.  **Mengenal pasti penyedia penimbalan** — Memeriksa sama ada penyedia sasaran menyokong penimbalan
3.  **Menyesuaikan strategi** — Menurunkan `aggressive`/`ultra` kepada `standard` untuk penyedia penimbalan
4.  **Melangkau gesaan sistem** — Gesaan sistem biasanya ditimbal, jadi jangan mampatkannya
5.  **Menggunakan transformasi deterministik** — Hanya gunakan transformasi yang menghasilkan output yang konsisten

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

#### Bila untuk digunakan

Pemampatan sedar cache **sentiasa dihidupkan** — tiada konfigurasi diperlukan. Ia hanya berfungsi
apabila:

- Permintaan mempunyai penanda `cache_control`
- Penyedia sasaran menyokong penimbalan gesaan (Anthropic, OpenAI, dll.)

### Penuaan Progresif

Perbualan yang panjang mengumpul banyak giliran mesej, tetapi giliran yang lebih lama menjadi kurang
relevan. Modul `progressiveAging.ts` **menurunkan kualiti mesej mengikut jarak giliran**:

- **Giliran terkini (0-3)**: Dikekalkan secara verbatim (butiran penuh)
- **Giliran sederhana (4-8)**: Pemampatan ringan (ruang kosong, pembersihan format)
- **Giliran lama (9+)**: Pemampatan Caveman (penyingkiran pengisi, ringkasan)
- **Giliran sangat lama (20+)**: Dirumuskan secara berat atau digugurkan

#### Contoh kod

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 lagi giliran ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 3 giliran pertama: verbatim
  light: 8, // Giliran 4-8: pemampatan ringan
  moderate: 20, // Giliran 9-20: pemampatan caveman
  // Giliran 21+: ringkasan berat
});

// saved = bilangan token yang disimpan
```

#### Bila untuk digunakan

Penuaan progresif **sentiasa dihidupkan** untuk mod `aggressive` dan `ultra`. Ia
sangat berkesan untuk:

- Sesi pengekodan yang berjalan lama
- Perbualan berhari-hari
- Aliran kerja ejen dengan banyak panggilan alat

### Mod Keluar Caveman

Modul `outputMode.ts` menyuntikkan **arahan gesaan sistem** untuk menjadikan
model itu sendiri menghasilkan output yang dimampatkan dan ringkas (gaya "caveman").

#### Cara ia berfungsi

Daripada memampatkan input, mod ini menambah gesaan sistem seperti:

> "Balas dalam perkataan yang minimum. Langkau kata-kata manis. Gunakan ayat pendek."

Ini berfungsi dengan baik terutamanya untuk:

- Penjanaan kod (output yang lebih ringkas = token yang lebih sedikit)
- Soal Jawab pantas (tidak perlu penjelasan yang rumit)
- Pemprosesan kelompok (memaksimumkan daya pemprosesan)

#### Bila untuk digunakan

Mod output Caveman adalah **pilihan** — tetapkan melalui konfigurasi kombo:

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

Mod output Caveman di atas adalah **laluan gaya tunggal legasi**. Fasa 4 menggeneralisasikannya
ke dalam katalog gaya output yang boleh digubah: `OUTPUT_STYLE_CATALOG` dalam
`open-sse/services/compression/outputStyles/catalog.ts`. Setiap gaya adalah arahan gesaan sistem
yang menjadikan model itu sendiri menghasilkan output yang lebih murah; gaya boleh diaktifkan
bersama dan disuntik mengikut susunan katalog.

| Gaya                              | `id`          | Apa yang dilakukannya                                                                                                                                                                                                                    | Bahasa arahan                                                                    |
| --------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Prosa ringkas                     | `terse-prose` | Gugurkan pengisi/artikel/pagar; kekalkan intipati teknikal yang tepat. Teks yang sama dengan mod output caveman legasi (dirujuk, tidak ditaip semula).                                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                    |
| Kurang kod                        | `less-code`   | Tangga YAGNI: perubahan kerja terkecil, tiada abstraksi yang tidak diminta.                                                                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                    |
| Ponytail (pembangun senior malas) | `ponytail`    | "Kod terbaik adalah kod yang tidak pernah ditulis": guna semula > tulis semula, punca > simptom, perbezaan kerja terpendek.                                                                                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                    |
| Saya ada ADHD (tindakan-pertama)  | `i-have-adhd` | Tindakan pertama (arahan/laluan/cebisan sebelum prosa), langkah terhad bernombor, SATU langkah konkrit seterusnya, tiada mukadimah/rekap/penutup. Diadaptasi daripada [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                    |
| CJK ringkas (文言)                | `terse-cjk`   | Gaya ultra-ringkas Cina Klasik.                                                                                                                                                                                                          | zh (terhad-lokal: hanya ditawarkan apabila bahasa yang diselesaikan adalah `zh`) |

Setiap gaya mempunyai tiga tahap keamatan — `lite`, `full`, `ultra` — dan setiap tahap
berakhir dengan klausa sempadan yang dikongsi, yang mengekalkan blok kod, laluan fail, arahan,
rentetan ralat, URL dan pengecam secara verbatim.

#### Cara suntikan berfungsi

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) menyelesaikan
pemilihan terhadap katalog (ID yang tidak diketahui dan gaya yang tidak sepadan dengan lokal
digugurkan, tidak pernah menjadi ralat), menggabungkan arahan yang dipilih mengikut susunan katalog,
menambah klausa sempadan **sekali**, dan memulakan blok dengan satu penanda idempotensi
(`[Gaya Output OmniRoute]`), jadi penggunaan semula adalah tiada operasi. Apabila bahasa yang diselesaikan
(lihat Pemilihan bahasa di bawah) mempunyai terjemahan, arahan tempatan
disuntikkan dan bukannya bahasa Inggeris.

Pada badan dengan `messages`, pintasan kandungan (`shouldBypassCavemanOutputMode()` dalam
`open-sse/services/compression/outputMode.ts`) menyemak tiga mesej terakhir dan melangkau
gaya untuk keseluruhan giliran apabila ia sepadan dengan keselamatan, tindakan tidak boleh diterbalikkan,
penjelasan, atau kata kunci sensitif urutan. Pintasan berjalan tidak kira apa yang ditetapkan oleh togol **Pintasan Kejelasan Auto** papan pemuka
(`cavemanOutputMode.autoClarity`).

Apabila pintasan membenarkan giliran, `placeSystemInstruction()` (fail yang sama), yang
tidak pernah mencipta `messages[0]` baharu, meletakkan blok dalam yang pertama daripada ini yang ditemuinya:

1. Mesej sistem utama dengan kandungan rentetan: blok ditambahkan selepas teksnya.
2. Medan `system` peringkat atas: blok ditambahkan selepas teks rentetan, atau
   ditambah sebagai blok teks baharu ke tatasusunan blok kandungan.
3. Mesej sistem kemudian yang pertama dengan kandungan rentetan: blok ditambahkan selepas teksnya.
4. Tiada di atas: blok masuk ke dalam mesej sistem baharu pada akhir `messages`.

Pada badan tanpa `messages`, blok ditambahkan ke medan `instructions` rentetan,
atau menjadi `instructions` apabila badan membawa `input` (rentetan atau tatasusunan). Badan
tanpa `instructions` mahupun `input` dilangkau sebagai `no_messages`.

#### Cara untuk mengaktifkan

Dalam papan pemuka: **Konteks → Tetapan → Pemampatan** — satu baris setiap gaya dengan
togol hidup/mati dan pemilih tahap. Secara program, konfigurasi pemampatan mengekalkan
pemilihan sebagai:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Keserasian ke belakang: tetapan kombo `outputMode: "caveman"` legasi masih berfungsi dan memetakan kepada
`terse-prose`, bait-identik dengan suntikan lama dalam setiap bahasa legasi.

Pemilihan bahasa: dengan `languageConfig.enabled` dihidupkan, `autoDetect` memilih bahasa mesej pengguna terkini (pengesan yang sama seperti enjin input); mematikan `autoDetect` menetapkan `defaultLanguage`. Mati → Inggeris.

Matriks gaya × bahasa ditetapkan oleh
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: gaya baharu tidak boleh dihantar
tanpa sekurang-kurangnya terjemahan pt-BR (atau pengecualian yang dijejaki secara eksplisit), dan gaya sedia ada tidak boleh kehilangan lokal secara senyap. Untuk menambah gaya, lihat
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Pemampatan Hasil Alat

Modul `toolResultCompressor.ts` menyediakan **5 strategi pemampatan khusus**
untuk hasil alat (panggilan fungsi, output ejen, hasil carian, dsb.):

1.  **Pemampatan hasil carian** — Mengeluarkan hasil yang berlebihan, mengekalkan N teratas
2.  **Pemampatan bacaan fail** — Memotong fail besar, mengekalkan pengepala/import
3.  **Pemampatan pelaksanaan kod** — Mengekalkan hanya stdout/stderr yang penting
4.  **Pemampatan pertanyaan pangkalan data** — Mengehadkan baris, membuang metadata yang bertele-tele
5.  **Pemampatan respons API** — Menanggalkan medan nol, memadatkan tatasusunan

#### Bila untuk digunakan

Pemampatan hasil alat **sentiasa dihidupkan** apabila panggilan alat hadir. Tiada
konfigurasi diperlukan.

### Saluran Paip Bertindan

Mod bertindan menjalankan **pelbagai enjin secara berurutan** — biasanya RTK dahulu
(penjimatan 60-90% pada output alat), kemudian Caveman (penjimatan tambahan 30% pada
teks yang tinggal). Ini mencapai **jumlah penjimatan 78-95%**.

#### Cara ia berfungsi

```
Input (1000 token)
  → RTK (penapis peka-perintah) → 200 token
    → Caveman (penyingkiran pengisi) → 140 token
  → Output (140 token, penjimatan 86%)
```

#### Bila untuk digunakan

Gunakan mod bertindan untuk:

- Aliran kerja yang banyak menggunakan alat (pengekodan ejen, penyelidikan)
- Pemprosesan kelompok yang sensitif kos
- Apabila anda memerlukan penjimatan token maksimum

Konfigurasi melalui kombo:

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

## Penggantian Kombo Pemampatan

Anda boleh menggantikan mod pemampatan global **bagi setiap kombo** untuk memperhalusi tingkah laku bagi kes penggunaan yang berbeza:

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

- **Kombo pengekodan**: Gunakan mod `aggressive` untuk sesi yang panjang
- **Kombo Soal Jawab Pantas**: Gunakan mod `lite` untuk respons pantas
- **Kombo yang banyak menggunakan alat**: Gunakan mod `stacked` untuk penjimatan maksimum
- **Kombo pengeluaran**: Gunakan mod `cache-aware` untuk penyedia caching

---

## Lihat Juga

- [Konfigurasi Persekitaran](../reference/ENVIRONMENT.md) — Pemboleh ubah persekitaran pemampatan
- [Panduan Seni Bina](../architecture/ARCHITECTURE.md) — Dalaman saluran paip pemampatan
- [Panduan Pengguna](../guides/USER_GUIDE.md) — Bermula dengan pemampatan
- [Pemampatan RTK](./RTK_COMPRESSION.md) — Penapis RTK, model kepercayaan, gerbang pengesahan, pemulihan output mentah
- [Enjin Pemampatan](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API, MCP, papan pemuka
- [Format Peraturan Pemampatan](./COMPRESSION_RULES_FORMAT.md) — Format pek peraturan JSON
- [Pek Bahasa Pemampatan](./COMPRESSION_LANGUAGE_PACKS.md) — Peraturan Caveman khusus bahasa
