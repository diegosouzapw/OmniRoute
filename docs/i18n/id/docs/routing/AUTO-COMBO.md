# OmniRoute Auto-Combo Engine (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Untuk Pengguna**: Mencari panduan memulai dengan cepat? Lihat [Panduan Pengguna Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) untuk penjelasan dan contoh sederhana.

> Rantai model yang mengelola dirinya sendiri dengan penilaian adaptif + perutean otomatis tanpa konfigurasi

## Perutean Otomatis Tanpa Konfigurasi (prefiks `auto/`)

> **BARU:** Tidak perlu membuat combo. Gunakan prefiks `auto/` secara langsung di klien apa pun.

### Contoh Singkat

| ID Model       | Varian  | Perilaku                                                                                           |
| -------------- | ------- | -------------------------------------------------------------------------------------------------- |
| `auto`         | default | Semua penyedia yang terhubung, strategi LKGP, bobot seimbang                                       |
| `auto/coding`  | coding  | Bobot yang mengutamakan kualitas, cocok untuk pembuatan kode                                       |
| `auto/fast`    | fast    | Pemilihan berbobot berlatensi rendah                                                               |
| `auto/cheap`   | cheap   | Perutean yang dioptimalkan untuk biaya (biaya terendah terlebih dahulu)                            |
| `auto/offline` | offline | Mengutamakan penyedia dengan ketersediaan kuota tertinggi                                          |
| `auto/smart`   | smart   | Mengutamakan kualitas + tingkat eksplorasi lebih tinggi (10%) untuk penemuan model yang lebih baik |
| `auto/lkgp`    | lkgp    | LKGP eksplisit (sama seperti `auto` default)                                                       |
| `auto/chaos`   | chaos   | Bobot injeksi kegagalan untuk pengujian ketahanan (chaos engineering)                              |

### Komposisi Kategori × Tingkat (`auto/<category>:<tier>`)

Sufiks bergaya OpenRouter memisahkan **jenis rute** (kategori) dari **cara mengoptimalkannya** (tingkat), sehingga Anda dapat menyusunnya secara bebas (#4235 Fase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategori** (memfilter kumpulan kandidat berdasarkan kemampuan): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` mempertahankan model yang mendukung visi; `reasoning` mempertahankan model penalaran/berpikir.
- **Tingkat** (memilih bobot penilaian / filter kumpulan): `fast` (rilis cepat) · `cheap` (alias `floor`, penghemat biaya) · `reliable` (kesehatan circuit breaker + stabilitas latensi) · `free` / `pro` (memfilter kumpulan berdasarkan tingkat model melalui `classifyTier` — tingkat gratis vs. premium).

| Contoh                 | Menghasilkan                                                          |
| ---------------------- | --------------------------------------------------------------------- |
| `auto/coding:fast`     | kumpulan coding, bobot berlatensi rendah                              |
| `auto/coding:cheap`    | kumpulan coding, dioptimalkan untuk biaya (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | hanya model penalaran/berpikir, tingkat premium                       |
| `auto/vision`          | model yang mendukung visi (tanpa tingkat → bobot seimbang)            |
| `auto/multimodal:free` | model yang mendukung multimodal, hanya tingkat gratis                 |

Setiap `auto/<category>[:<tier>]` yang valid di-resolve sesuai permintaan; subset terkurasi ditampilkan di `/v1/models` dan dasbor (`AUTO_SUFFIX_VARIANTS` dalam `open-sse/services/autoCombo/builtinCatalog.ts`). Pemfilteran bersifat **fail-open** — jika suatu batasan tidak cocok dengan model terhubung mana pun, kumpulan lengkap akan digunakan agar perutean tidak pernah gagal. Penilai inti (`combo.ts`) tidak berubah; filter kategori/tingkat diterapkan dalam `buildAutoCandidates`.

> **Inteligensi model langsung:** kelayakan perutean otomatis didasarkan pada peringkat **Arena ELO** langsung + data tingkat **models.dev** saat flag `ARENA_ELO_SYNC_ENABLED` aktif (jika tidak, kembali menggunakan peta kelayakan statis).

**Cara menggunakan:**

```bash
# IDE atau alat CLI apa pun yang mendukung format OpenAI
URL Dasar: http://localhost:20128/v1
Kunci API: <your-endpoint-key>

# Dalam kode/konfigurasi Anda, atur model menjadi:
model: "auto"                 # default seimbang
model: "auto/coding"          # terbaik untuk tugas coding
model: "auto/fast"            # paling cepat yang tersedia
model: "auto/cheap"           # paling murah per token
```

**Yang terjadi:**

1. OmniRoute mendeteksi prefiks `auto/` dalam `src/sse/handlers/chat.ts`
2. Mengambil semua **koneksi penyedia aktif** dari basis data
3. Memfilter koneksi yang memiliki kredensial valid (kunci API atau token OAuth)
4. Menentukan model per koneksi (`connection.defaultModel` atau model pertama milik penyedia)
5. Membuat **combo virtual** dalam memori (tidak disimpan dalam DB)
6. Melakukan perutean menggunakan profil bobot varian yang dipilih + strategi LKGP

**Properti utama:**

- ✅ **Selalu aktif:** Tidak memerlukan tombol pengaktif, pembuatan combo, atau konfigurasi
- ✅ **Dinamis:** Secara otomatis mencerminkan penyedia yang saat ini terhubung
- ✅ **Afinitas sesi:** LKGP memastikan penyedia terakhir yang berhasil diprioritaskan
- ✅ **Mendukung banyak akun:** Setiap koneksi penyedia menjadi kandidat terpisah
- ✅ **Tanpa penulisan DB:** Combo virtual hanya tersedia untuk permintaan tersebut, tanpa overhead persistensi

### Kontrol kandidat per kunci (#7819, Level 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = sufiks setelah `auto/`, atau
literal `auto` untuk saluran dasar) adalah endpoint **hanya baca** yang mencantumkan
kumpulan kandidat terkini dari saluran `auto/*` beserta keterjangkauan langsung,
dengan menggunakan kembali pembacaan ketahanan yang sudah ada (tidak pernah menggunakan
`state` mentah dari breaker):

- circuit breaker penyedia — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- cooldown koneksi — `rateLimitedUntil` / `testStatus` pada baris
  `provider_connections` yang telah di-resolve
- penguncian model — `isModelLocked(provider, connectionId, model)`

Setiap kandidat juga menyertakan flag `excluded` milik kunci API ini. Pengecualian
disimpan per kunci API (tabel `auto_candidate_overrides`, migrasi `128`) — OmniRoute
bersifat single-tenant tanpa tabel `users`, sehingga `apiKeyId` merupakan identitas
per-pemanggil nyata yang paling mendekati — dan diberlakukan pada titik kontrol
kumpulan kandidat dalam `open-sse/services/autoCombo/virtualFactory.ts` melalui
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`)
yang murni dan telah diuji dengan unit test. Filter ini bersifat **fail-open**:
apiKeyId/saluran yang tidak ditetapkan maupun kegagalan pencarian DB akan membiarkan
kumpulan tetap tidak terfilter, sehingga operator tanpa override yang dikonfigurasi
akan melihat perutean yang identik per byte dengan sebelum fitur ini.

**Ditangguhkan ke isu lanjutan:** bobot per kandidat + pengurutan eksplisit (Level 3
— diteruskan ke jalur strategi berbobot/prioritas yang sudah ada) dan penyematan strategi
`combo.ts` tertentu per kanal `auto/*` (Level 4). Lihat rencana #7819 untuk pertanyaan terbuka
mengenai apakah override harus tetap berlaku per kunci API atau menjadi global mengingat
model penyewa tunggal.

**Di balik layar:**

```txt
Permintaan: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts mendeteksi prefiks
   ↓
createVirtualAutoCombo('coding') → candidatePool dari koneksi aktif
   ↓
handleComboChat (mesin yang sama dengan combo tersimpan)
   ↓
Penilaian otomatis memilih penyedia/model terbaik per permintaan
```

**File implementasi:**

| File                                                      | Tujuan                                            |
| --------------------------------------------------------- | ------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefiks (`parseAutoPrefix`)                |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Membuat objek `AutoComboConfig` virtual           |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Hook pengujian untuk memalsukan registri penyedia |
| `src/sse/handlers/chat.ts`                                | Integrasi: pintasan prefiks auto                  |
| `src/shared/constants/providers.ts`                       | Entri sistem `SYSTEM_PROVIDERS.auto`              |

## Nama Combo yang Cocok dengan ID Model Nyata

Combo yang `name`-nya identik dengan ID model tanpa prefiks (misalnya combo bernama
`gpt-5.5`) adalah **pola yang disengaja dan didukung**, bukan bug: ini merupakan
mekanisme fallback penyedia per ID model yang didokumentasikan dalam
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Karena resolusi
combo diperiksa sebelum resolusi ID model tanpa prefiks
(`getComboForModel()` dalam `src/sse/services/model.ts`), permintaan untuk ID
tanpa prefiks `gpt-5.5` dirutekan melalui target combo tersebut (misalnya
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`), bukan langsung ke satu
penyedia — ini menggunakan kembali prioritas combo-sebelum-rewrite yang dibuat untuk
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) dan telah
diuji terhadap regresi oleh `tests/unit/responses-combo-resolution-3227.test.ts` dan
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Membuat atau mengganti nama combo menjadi nama yang membayangi ID model nyata
**tidak pernah ditolak** — penolakan akan merusak alur kerja yang telah didokumentasikan ini. Sebagai gantinya
(#8530), `POST /api/combos` dan `PUT /api/combos/[id]` menambahkan field
`warning` yang tidak memblokir ke respons ketika nama (baru) bertabrakan dengan ID
model nyata:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Saat proses boot, `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) juga mencatat peringatan `[STARTUP]` satu baris
yang mencantumkan setiap combo yang ada dan membayangi ID model, sehingga operator yang
mengalami hal ini secara tidak sengaja (alih-alih secara sengaja, sesuai #6940) mendapatkan
indikasi. Helper deteksi berada di `src/lib/combos/modelNameCollision.ts`.

## Memanggil Combo Kustom dari Klien

Combo persisten (Settings → Combos) hanya digunakan ketika klien mengirimkan **nama persis** combo tersebut dalam field `model` — tidak ada pencocokan fuzzy atau parsial terhadap nama combo, dan tidak melibatkan prefiks `auto/`. Urutan resolusi (`getComboForModel()` dalam `src/sse/services/model.ts`):

1. kecocokan persis nama combo (`model: "my-combo"`),
2. prefiks `combo/<name>` (`model: "combo/my-combo"`),
3. pemetaan glob model→combo (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dua masalah umum:

- **`auto` tidak menggunakan combo Anda.** `auto`/`auto/*` membuat kumpulan kandidat zero-config-nya sendiri dan hanya menggunakan combo persisten jika ada combo yang benar-benar bernama `auto` (tidak direkomendasikan). Untuk merutekan melalui combo, kirimkan nama persisnya — bukan `auto`.
- **`openrouter/auto` adalah produk berbayar OpenRouter yang nyata** ("Auto Best Available"), bukan alias OmniRoute. Ini merupakan satu-satunya entri model statis dalam registri OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) dan ditagih secara terpisah. Gunakan Settings → Routing → Hide paid models untuk mengecualikannya dari kumpulan `auto`.

Lihat [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) dan [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) untuk kebingungan awal yang dijelaskan dalam dokumentasi ini.

## Cara Kerjanya (Auto-Combo Persisten)

Auto-Combo Engine secara dinamis memilih penyedia/model terbaik untuk setiap permintaan menggunakan **fungsi penilaian 16 faktor** (didefinisikan dalam `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Bobot default berjumlah `1.0`; bobot khusus dinormalisasi ulang oleh `normalizeScoringWeights()`. Dua dari enam belas faktor tersebut — `cacheAffinity` dan `resetWindowAffinity` — memiliki bobot default `0`; `reliability` memiliki bobot `0` dalam `DEFAULT_WEIGHTS`, tetapi `0.03` dalam paket generik dan `0.04` dalam `reliability-first`, sedangkan `quality` memiliki bobot `0.02` dalam paket (`0.03` dalam `quality-first`): faktor-faktor tersebut tetap dihitung untuk setiap kandidat, dan `cacheAffinity` mengatur deduplikasi cache prompt di luar skor, sehingga faktor dengan bobot default nol tidak memberikan pengaruh secara default, sedangkan paket mengaktifkannya.

![Penilaian 16 faktor Auto-Combo](../diagrams/exported/auto-combo-scoring.svg)

> Sumber: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (buat ulang melalui `npm run docs:render-diagrams`). Nama file tersebut bersifat historis; sumber dan diagram yang dirender menampilkan seluruh 16 faktor yang dideklarasikan dalam `DEFAULT_WEIGHTS`.

| Faktor                | Bobot Default | Deskripsi                                                                                                                                                                                                                                                        |
| :-------------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429        | Sisa kuota / ruang batas laju [0..1]                                                                                                                                                                                                                             |
| `health`              | 0.1605        | Skor kesehatan dari circuit breaker (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                                        |
| `costInv`             | 0.1429        | Kebalikan dari biaya **gabungan** (60% harga token input + 40% harga token output, dinormalisasi) — semakin murah = skor semakin tinggi                                                                                                                          |
| `latencyInv`          | 0.1143        | Kebalikan dari latensi p95 yang dinormalisasi terhadap kumpulan — semakin cepat = skor semakin tinggi                                                                                                                                                            |
| `taskFit`             | 0.0762        | Kesesuaian jenis tugas (pengodean, peninjauan, perencanaan, analisis, debugging, dokumentasi)                                                                                                                                                                    |
| `stability`           | 0.0476        | Stabilitas berbasis varians dari simpangan baku latensi — kandidat dengan waktu respons yang berubah-ubah memperoleh skor lebih rendah                                                                                                                           |
| `tierPriority`        | 0.0476        | Prioritas tingkat akun — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                                            |
| `tierAffinity`        | 0.0476        | Afinitas antara tingkat kandidat dan tingkat yang direkomendasikan manifes                                                                                                                                                                                       |
| `specificityMatch`    | 0.0476        | Kecocokan antara spesifisitas permintaan (petunjuk manifes) dan tingkat model                                                                                                                                                                                    |
| `contextAffinity`     | 0.0476        | Afinitas antara kebutuhan jendela konteks permintaan dan jendela konteks model                                                                                                                                                                                   |
| `sessionAvailability` | 0.0476        | Ketersediaan sesi OAuth dari koneksi kandidat untuk sesi ini (`getOAuthSessionAvailability()`; koneksi non-OAuth memperoleh skor 1.0)                                                                                                                            |
| `connectionDensity`   | 0.0476        | Menyebarkan beban ke seluruh koneksi dari penyedia yang sama (anti-konsentrasi)                                                                                                                                                                                  |
| `cacheAffinity`       | 0.00          | Afinitas hash rendezvous menuju koneksi yang paling mungkin telah menyimpan prefiks cache prompt permintaan ini (`open-sse/services/combo/promptCacheAffinity.ts`); dinonaktifkan secara default (#8008)                                                         |
| `resetWindowAffinity` | 0.00          | Bias terhadap koneksi yang jendela pengaturan ulang kuotanya menguntungkan (dinonaktifkan secara default)                                                                                                                                                        |
| `quality`             | 0.03          | Sinyal kualitas output berbasis umpan balik dari pelacak kualitas peristiwa perutean; kandidat tanpa observasi menerima nilai netral 0.5                                                                                                                         |
| `reliability`         | 0.00          | Proporsi keberhasilan yang diamati, `1 - failureRate`, dari riwayat penggunaan selama 24 jam dengan batas minimum sepuluh sampel (selain itu menggunakan metrik waktu nyata); kandidat tanpa observasi dianggap memiliki nilai 1.0. Dinonaktifkan secara default |

**Jumlah:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` sebagaimana dideklarasikan dalam `DEFAULT_WEIGHTS`; bobot yang dikonfigurasi pengguna dinormalisasi ulang menjadi sebuah distribusi oleh `normalizeScoringWeights()` sebelum penilaian.

## Paket Mode

6 profil bobot siap pakai di `open-sse/services/autoCombo/modePacks.ts`. Setiap paket sepenuhnya menggantikan bobot default untuk mengarahkan pemilihan ke satu tujuan. Jumlah setiap paket sudah mencapai `1.0` (`0.9999` jika ditampilkan dengan empat angka desimal), sehingga `normalizeScoringWeights()` tidak memiliki koreksi berarti saat suatu paket aktif — nilai-nilai di bawah ini, dengan mempertimbangkan pembulatan, adalah nilai yang diterapkan oleh pemberi skor.

| Faktor                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Catatan:

- **Paket menyertakan `quality` dan `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) dan menggantikan seluruh peta bobot (`weights = pack`, bukan penggabungan). `DEFAULT_WEIGHTS` menyertakan `quality 0.03 / reliability 0`; memilih `balanced`/`default` mempertahankan nilai default tersebut, sedangkan memilih suatu paket menggunakan nilai paket di atas. Pada pool dingin (belum ada observasi, sehingga `quality 0.5` dan `reliability 1`), kedua faktor ini menambahkan `+0.04` pada paket generik (`0.03 + 0.01`), `+0.045` pada `quality-first`, dan `+0.05` pada `reliability-first`.
- `tierAffinity`, `specificityMatch`, dan `resetWindowAffinity` secara eksplisit bernilai `0` di setiap paket.
- Ringkasan fokus setiap paket:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (koneksi sehat dengan latensi rendah)
  - **cost-saver** → costInv 0.3324 (token termurah menang)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, tertinggi di antara semua paket (model terbaik dan konsisten untuk tugas tersebut)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (ruang kapasitas maksimum tanpa memandang kecepatan/biaya)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, tertinggi di antara semua paket (paling sedikit kejutan)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (profil injeksi kegagalan)

### Kontrol Per Permintaan (header) — #6023 / #6024 / #6025 / #3470

Combo `auto` dapat diarahkan **per permintaan** melalui tiga header, tanpa mengubah konfigurasi
tersimpan combo tersebut. Ini hanya berlaku untuk strategi `auto` dan hanya untuk permintaan
yang menyertakannya; `modePack`/`budgetCap`/`budgetFallback` tersimpan milik combo digunakan
jika header tidak ada.

| Header                        | Nilai yang Diterima                                                                                                                                                                      | Efek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | alias preset (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) atau nama pack mentah (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Mengganti bobot penilaian untuk permintaan ini. `balanced`/`default` memaksakan bobot default (tanpa pack). Nilai yang tidak dikenal akan diabaikan (konfigurasi dipertahankan).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `X-OmniRoute-Budget`          | angka positif (USD maksimum per permintaan)                                                                                                                                              | Batas biaya mutlak: kandidat yang perkiraan biayanya melebihi batas ini akan difilter sebelum pemilihan. Tindakan yang dilakukan ketika **setiap** kandidat melebihi batas tersebut dikendalikan oleh `X-OmniRoute-Budget-Fallback` di bawah ini.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (default, alias: `cheapest-viable`, `soft`) atau `strict` (alias: `block`, `hard`)                                                                                            | `cheapest`: beralih ke kandidat termurah secara global meskipun kandidat tersebut masih melebihi batas (perilaku lama). `strict`: menolak melakukan pemilihan — permintaan langsung gagal dengan `HTTP 402`, alih-alih secara diam-diam mengeluarkan biaya berlebih. Nilai yang tidak dikenal akan diabaikan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `X-OmniRoute-Effort`          | `auto` (nilai lain dicadangkan)                                                                                                                                                          | Anggaran pemikiran adaptif: ketika permintaan **tidak** memuat bidang penalaran dalam bentuk apa pun (`reasoning_effort`, `reasoning`, `thinking`), gateway menetapkan `auto` menjadi `low`/`medium`/`high` berdasarkan sinyal deterministik dari struktur permintaan (panjang pesan pengguna terakhir, ukuran konteks hingga pesan pengguna terakhir, hasil tool sebelumnya, kedalaman loop tool). Sinyal dibatasi pada giliran saat ini — semua yang berada setelah pesan pengguna terakhir diabaikan — sehingga setiap permintaan dalam loop tool ditetapkan ke tingkat yang sama (penetapan stateless per giliran, tanpa status sesi, tanpa eskalasi di tengah loop yang dapat merusak prefiks cache prompt upstream). Bidang penalaran eksplisit dari klien selalu diprioritaskan. Berlaku untuk permintaan yang pengiriman upstream-nya ditetapkan ke bentuk OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` adalah bidang berbentuk OpenAI, sehingga header ini tidak berpengaruh pada permintaan yang ditujukan ke Claude atau Gemini (lihat `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Paksa profil tercepat, batasi permintaan ini hingga $0.05, dan lakukan pemblokiran keras alih-alih membelanjakan secara berlebihan
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Resolusi merupakan fungsi murni (`open-sse/services/autoCombo/requestControls.ts`); nilai yang
telah diresolusi diteruskan ke masukan `config.modePack` / `config.budgetCap` /
`config.budgetFallback` yang sudah ada pada mesin. `config.budgetFallback` yang tersimpan milik suatu combo ("strict" |
"cheapest") menetapkan kebijakan persisten; header menimpanya untuk satu permintaan.

## Semua Strategi Perutean

Mesin combo OmniRoute mendukung **19 strategi perutean** (dideklarasikan di `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Mesin Auto Combo itu sendiri tersedia melalui strategi `auto`; strategi lainnya tersedia untuk combo yang disimpan.

| Strategi            | Deskripsi                                                                                                                                                                                                                            |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Daftar terurut berdasarkan target pertama dengan prioritas eksplisit                                                                                                                                                                 |
| `weighted`          | Pemilihan acak berbobot berdasarkan bobot masing-masing target                                                                                                                                                                       |
| `round-robin`       | Menggilir target secara berurutan                                                                                                                                                                                                    |
| `context-relay`     | Meneruskan konteks antar-target (percakapan panjang)                                                                                                                                                                                 |
| `fill-first`        | Mengisi kuota setiap target sebelum beralih ke target berikutnya                                                                                                                                                                     |
| `p2c`               | Penyeimbangan beban acak dengan metode power-of-2-choices                                                                                                                                                                            |
| `random`            | Pemilihan acak seragam                                                                                                                                                                                                               |
| `least-used`        | Memilih target dengan beban saat ini yang paling rendah                                                                                                                                                                              |
| `cost-optimized`    | Meminimalkan biaya $ per permintaan berdasarkan harga katalog                                                                                                                                                                        |
| `reset-aware` ⭐    | Memprioritaskan berdasarkan waktu reset kuota — jendela reset yang singkat mendapat peringkat lebih tinggi                                                                                                                           |
| `reset-window`      | Mengutamakan target yang jendela kuotanya akan paling cepat direset                                                                                                                                                                  |
| `headroom`          | Memilih target dengan sisa kelonggaran kuota terbesar                                                                                                                                                                                |
| `strict-random`     | Pemilihan acak tanpa deduplikasi pengulangan                                                                                                                                                                                         |
| `auto`              | Menggunakan penilaian Auto Combo (16 faktor) — **direkomendasikan**                                                                                                                                                                  |
| `lkgp`              | Jalur Terakhir yang Diketahui Berfungsi (mempertahankan penyedia terakhir yang berhasil, lalu beralih ke aturan sebagai fallback)                                                                                                    |
| `context-optimized` | Memilih target yang paling sesuai dengan ukuran konteks saat ini                                                                                                                                                                     |
| `cache-optimized`   | Mengurutkan ulang target berdasarkan afinitas cache prompt — koneksi yang kemungkinan besar sudah menyimpan prefiks permintaan ini dalam cache akan dicoba terlebih dahulu (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Menyebarkan permintaan ke panel model secara paralel, lalu menyintesis satu jawaban melalui model penilai (lihat di bawah)                                                                                                           |
| `pipeline`          | Menjalankan target secara berurutan, meneruskan output setiap langkah ke input langkah berikutnya; hanya jawaban akhir yang dikembalikan (#6396)                                                                                     |

⭐ = Baru di v3.8.0 · 🧬 = Baru di v3.8.36

### Semantik `weighted`

`weighted` adalah **pengundian acak proporsional untuk setiap permintaan**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), bukan mekanisme pemerataan:

- Setiap permintaan mengundi **satu** langkah dengan probabilitas `weight / totalWeight`; langkah
  yang tersisa diurutkan berdasarkan bobot secara menurun sebagai rantai fallback untuk permintaan tersebut.
- Langkah dengan bobot `0` (atau tanpa bobot) **tidak pernah diundi** selama ada langkah lain
  yang memiliki bobot > 0 — langkah tersebut hanya dapat berfungsi sebagai fallback setelah langkah yang diundi gagal. Hanya jika **semua**
  bobot bernilai 0, pemilihan menjadi seragam.
- Langkah yang semua targetnya tidak tersedia — circuit breaker penyedia berstatus `OPEN`, cooldown
  koneksi, penguncian model — dihapus dari pengundian sebelum pengundian dilakukan
  (`open-sse/services/combo/targetResolution.ts`), sehingga satu langkah yang sehat dapat sementara
  memenangkan setiap permintaan.
- `stickyWeightedLimit` (konfigurasi combo, nilai default `1` = nonaktif) mempertahankan langkah yang diundi selama sejumlah
  keberhasilan berturut-turut tersebut sebelum melakukan pengundian ulang.

Untuk rotasi ketat, gunakan `round-robin`; bobot yang sama pada `weighted` menghasilkan keseimbangan
statistik — bukan ketat.

## Strategi Fusion

`fusion` adalah satu-satunya strategi yang **tidak** memilih satu target. Strategi ini menyebarkan prompt
ke **setiap model panel secara paralel**, lalu **model juri** yang dapat dikonfigurasi menyintesis
satu jawaban akhir dari seluruh respons panel. Di-porting dari upstream `decolua/9router`
(desain Fusion milik OpenRouter); implementasinya berada di `open-sse/services/fusion.ts`.

Cara kerjanya:

0. **Pelewatan untuk permintaan dengan alat** — permintaan yang membawa array `tools` yang tidak kosong dengan
   `tool_choice` yang tidak secara eksplisit bernilai `"none"` akan melewati panel sepenuhnya: permintaan tersebut dirutekan langsung ke
   satu model (juri yang dikonfigurasi, atau `panel[0]`) dengan `tools`/`tool_choice`
   diteruskan tanpa perubahan. Anggota panel tidak memiliki akses ke alat dan direktif
   sintesis juri mencegah emisi pemanggilan alat, sehingga klien agentik/pemanggil alat
   mendapatkan keputusan pemanggilan alat yang sebenarnya, bukan prosa hasil sintesis (#6771).
1. **Penyebaran** (khusus permintaan tanpa alat) — prompt dikirim ke setiap model
   panel sekaligus, dipaksa menjadi non-streaming dengan alat dihapus (juri memerlukan
   prosa lengkap untuk menyintesis).
2. **Pengumpulan kuorum-tenggang** — segera setelah `minPanel` jawaban tiba, timer
   tenggang singkat dimulai untuk model yang tertinggal, lalu fusion dilanjutkan dengan hasil apa pun yang telah dikumpulkan.
   Ini membatasi penalti waktu nyata dari model paling lambat, dengan batas berupa timeout mutlak.
3. **Sintesis juri** — jawaban panel dianonimkan (`Source 1`, `Source 2`, … — sehingga
   juri menilai substansi, bukan merek model) dan diserahkan kepada juri, yang menganalisis
   konsensus / kontradiksi / cakupan parsial / wawasan unik / titik buta, lalu
   menulis **satu** jawaban otoritatif. Pemanggilan juri mempertahankan flag `stream` asli milik klien
   beserta alatnya, sehingga streaming dan penggunaan alat di tahap berikutnya tetap berfungsi.
4. **Degradasi yang mulus** — 0 jawaban panel → `503`; tepat 1 model yang bertahan → jawaban tersebut
   dikembalikan secara langsung (tidak ada yang perlu digabungkan); panel dengan satu model menjawab secara langsung.

Anggota panel juga dapat berupa langkah `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) yang mereferensikan
combo lain — langkah tersebut diselesaikan sebagai **satu suara panel kotak hitam** (dispatch rekursif penuh ke
combo yang direferensikan, bukan penyebaran ke target milik combo itu sendiri), dengan perlindungan kedalaman/siklus
yang sama seperti yang telah digunakan oleh setiap strategi lain yang memakai combo-ref (#6764).

### Konfigurasi

Dikonfigurasi pada blob `config` milik combo (tanpa migrasi skema — menggunakan kembali tabel
`combos` yang sudah ada):

| Bidang                                   | Tipe     | Default             | Tujuan                                                                                                |
| :--------------------------------------- | :------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | model panel pertama | Model yang menyintesis jawaban akhir                                                                  |
| `config.fusionTuning.minPanel`           | `number` | `2`                 | Jumlah jawaban berhasil yang diperlukan sebelum timer tenggang dimulai (dibatasi ke `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`              | Lama waktu menunggu model yang tertinggal setelah kuorum tercapai                                     |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`             | Batas mutlak agar satu model yang macet tidak dapat menahan permintaan                                |

Nilai default berada di `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Contoh

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Kemudian panggil seperti combo lainnya: `{"model":"fusion-panel","messages":[...]}`.

## Pabrik Auto-Combo Virtual

Mesin Auto Combo tidak memerlukan combo yang telah ditentukan sebelumnya. Sebagai gantinya, `open-sse/services/autoCombo/virtualFactory.ts` membangun kandidat secara dinamis:

1. Mengambil `getProviderConnections({ isActive: true })` (semua koneksi yang diaktifkan)
2. Memfilter koneksi yang memiliki kredensial valid (kunci API atau token OAuth yang belum kedaluwarsa melalui `hasUsableOAuthToken()`)
3. Melakukan referensi silang dengan `getProviderRegistry()` untuk ketersediaan model + harga
4. Untuk setiap tuple `(provider, model, connection)`, membangun `VirtualAutoComboCandidate`
5. Memilih `connection.defaultModel` (atau model pertama dalam registry) sebagai target pengiriman
6. Memberi skor pada setiap kandidat menggunakan `scorePool()` dengan 16 faktor dan paket bobot varian
7. Mengembalikan `AutoComboConfig` dalam memori yang dihasilkan untuk `handleComboChat()` — tidak pernah disimpan ke DB

Ini berarti **menambahkan provider baru dengan `auto/*` yang diaktifkan akan secara otomatis memperluas kumpulan kandidat** — tidak perlu mengedit combo secara manual. Combo virtual dibangun ulang untuk setiap permintaan, sehingga koneksi yang baru ditambahkan atau baru kembali sehat langsung disertakan.

## Pemulihan Mandiri

- **Pengecualian sementara**: Skor < 0.2 → dikecualikan selama 5 menit (backoff progresif, maksimal 30 menit)
- **Kesadaran circuit breaker**: OPEN → otomatis dikecualikan; HALF_OPEN → permintaan probe
- **Mode insiden**: >50% OPEN → nonaktifkan eksplorasi, maksimalkan stabilitas
- **Pemulihan cooldown**: Setelah pengecualian, permintaan pertama adalah "probe" dengan timeout yang dikurangi

## Eksplorasi Bandit

5% permintaan (dapat dikonfigurasi) dirutekan ke provider acak untuk eksplorasi. Dinonaktifkan dalam mode insiden.

## API

**Tidak ada endpoint khusus `POST /api/combos/auto`** — Auto-Combo digunakan dengan dua cara:

1. **Tanpa konfigurasi (direkomendasikan):** Kirim permintaan penyelesaian chat apa pun dengan `model: "auto"` atau `model: "auto/<variant>"`. Pabrik virtual membangun combo untuk setiap permintaan — tanpa persistensi dan tanpa panggilan API tambahan.

2. **Combo persisten dengan `strategy: "auto"`:** Buat combo biasa melalui `POST /api/combos` dan tetapkan `strategy: "auto"` beserta `config.auto.weights` / `config.auto.candidatePool`. Mesin penilaian yang sama digunakan; combo disimpan dalam `combos` dan dapat digunakan kembali berdasarkan ID.

Untuk penemuan, `GET /api/combos/auto` mencantumkan setiap varian beserta kumpulan kandidat yang telah diresolusi serta `context_length` / `max_output_tokens` — nilai MAKSIMUM di seluruh jendela dalam kumpulan kandidat. Klien (misalnya plugin opencode) harus mengiklankan nilai-nilai ini, bukan `0`: konteks nol sepenuhnya menonaktifkan pemadatan otomatis opencode, sehingga sesi terus membesar sampai pembersihan riwayat gateway menghancurkan konteks. Nilai MAKSIMUM aman untuk diiklankan karena pra-filter konteks auto-combo merutekan permintaan yang terlalu besar ke kandidat dengan jendela besar.

```bash
# Penggunaan tanpa konfigurasi (tanpa pembuatan combo)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Combo otomatis persisten melalui endpoint combo reguler
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategi router otomatis

Combo persisten dengan `strategy: "auto"` dapat menetapkan `config.routerStrategy` (atau format lama
`config.auto.routerStrategy`) ke salah satu nilai berikut:

- `rules` — penilaian berbobot default
- `score` — memilih skor berbobot terkonfigurasi tertinggi. Jika skor benar-benar sama, urutan
  kandidat yang dikonfigurasi dipertahankan; `explorationRate` yang ada mengambil sampel dari seluruh kumpulan berperingkat.
- `cost` / `eco` — provider sehat termurah
- `latency` / `fast` — latensi p95 terendah dengan penalti keandalan
- `sla-aware` / `sla` — memprioritaskan kandidat yang memenuhi SLO latensi p95, tingkat error, dan
  biaya opsional
- `lkgp` — provider terakhir yang diketahui berfungsi ditempatkan pertama

### Strategi router secara mendetail

Mesin auto-combo menyediakan 6 implementasi **RouterStrategy** yang dapat dipasang dan
Anda tukar melalui `config.routerStrategy` (atau format lama `config.auto.routerStrategy`).
Setiap strategi memilih satu provider dari kumpulan kandidat berdasarkan `RoutingContext`
(jenis tugas, petunjuk alat/visi, estimasi token, kebijakan SLA opsional, dan
provider terakhir yang diketahui berfungsi secara opsional).

#### 1. `rules` (default) — penilaian berbobot dengan 16 faktor

Membungkus mesin penilaian yang ada. Memfilter kandidat circuit breaker
`OPEN`, lalu menjalankan `scorePool()` dengan jenis tugas saat ini dan `getTaskFitness()`,
serta memilih provider dengan skor tertinggi.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Kapan digunakan**: Default. Gunakan saat Anda menginginkan kompromi yang seimbang di antara semua sinyal.

**Alias**: `rules` (tanpa alias)

---

#### 2. `cost` / `eco` — provider sehat termurah

Mengurutkan kumpulan kandidat berdasarkan `costPer1MTokens` (menaik) dan memilih yang termurah.
Memfilter kandidat `OPEN` terlebih dahulu.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Kapan digunakan**: Beban kerja yang sensitif terhadap biaya, pemrosesan batch, atau pekerjaan latar belakang.

**Alias**: `cost`, `eco`

---

#### 3. `latency` / `fast` — latensi p95 terendah dengan penalti keandalan

Mengurutkan berdasarkan `p95LatencyMs + (errorRate * 1000)`. Penalti tingkat kesalahan memastikan
penyedia yang tidak andal diberi peringkat lebih rendah meskipun latensi nominalnya rendah.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Kapan digunakan**: Beban kerja yang sensitif terhadap latensi seperti obrolan waktu nyata, pelengkapan otomatis, atau
asisten pemrograman interaktif.

**Alias**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — kepatuhan terhadap SLO latensi/kesalahan/biaya

Memberi skor kepada setiap kandidat berdasarkan seberapa baik kandidat tersebut memenuhi kebijakan SLO yang dikonfigurasi:

| Faktor          | Bobot | Rumus                                                   |
| --------------- | ----- | ------------------------------------------------------- |
| Skor latensi    | 35%   | `threshold / max(value, ε)`                             |
| Skor kesalahan  | 35%   | `threshold / max(value, ε)`                             |
| Skor kesehatan  | 15%   | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)       |
| Skor biaya      | 10%   | `threshold / max(value, ε)` atau invers ternormalisasi  |
| Skor stabilitas | 5%    | simpangan baku latensi yang dinormalisasi secara invers |

Ketika `hardConstraints: true`, kandidat diurutkan terutama berdasarkan **skor pelanggaran**
(seberapa jauh mereka melampaui SLO apa pun), lalu berdasarkan skor gabungan. Jika tidak, pengurutan hanya menggunakan
skor gabungan.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... memberi skor kepada setiap kandidat berdasarkan kebijakan: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Bidang SLA** (ditetapkan pada konfigurasi kombo):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Kapan digunakan**: Beban kerja produksi dengan batas latensi, tingkat kesalahan, atau biaya yang ketat.

**Alias**: `sla-aware`, `sla`

---

#### 5. `lkgp` — penyedia terakhir yang diketahui berfungsi didahulukan

Mencoba **penyedia terakhir yang diketahui berfungsi** (jika ditetapkan) terlebih dahulu, lalu melakukan fallback ke
strategi `rules`. Berguna untuk persistensi sesi — penyedia yang sama menangani
permintaan lanjutan dalam percakapan.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Fallback ke strategi rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Kapan digunakan**: Percakapan multi-giliran ketika Anda ingin penyedia yang sama menangani
permintaan lanjutan (misalnya, untuk caching, kontinuitas konteks, atau konsistensi harga).

**Alias**: `lkgp` (tanpa alias)

---

### Strategi router khusus

Anda dapat mendaftarkan implementasi `RouterStrategy` Anda sendiri melalui API publik:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Logika perutean Anda di sini
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Kemudian gunakan:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Panduan pemilihan strategi router

| Kasus penggunaan      | Strategi    | Alasan                                           |
| --------------------- | ----------- | ------------------------------------------------ |
| Beban kerja seimbang  | `rules`     | Default — mempertimbangkan semua faktor          |
| Meminimalkan biaya    | `cost`      | Selalu memilih yang termurah                     |
| Meminimalkan latensi  | `latency`   | Memilih penyedia andal yang tercepat             |
| SLO yang ketat        | `sla-aware` | Memfilter berdasarkan ambang p95/kesalahan/biaya |
| Obrolan multi-giliran | `lkgp`      | Persistensi sesi                                 |

Bidang yang mendukung SLA:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Kesesuaian Tugas

Lebih dari 30 model dinilai pada 6 jenis tugas (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Mendukung pola wildcard (misalnya, `*-coder` → skor coding tinggi).

## Ringkasan Varian Auto

Dengan menyertakan `auto` tanpa varian (default) serta 6 nilai `AutoVariant` yang dideklarasikan dalam `autoPrefix.ts`, terdapat **7 ID model yang dapat dipanggil**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` sendiri mencantumkan 6 nilai; opsi ke-7 adalah "tanpa varian" — `auto` tanpa varian — yang ditangani oleh `parseAutoPrefix()` sebagai `variant: undefined`.)

## Cara tier berperan dalam Auto-Combo

Fungsi penilaian 16 faktor (`open-sse/services/autoCombo/scoring.ts`) memperlakukan keanggotaan tier sebagai dua sinyal: `tierPriority` (0.0476) dan `tierAffinity` (0.0476). Lihat [tabel faktor penilaian](#how-it-works-persisted-auto-combos) kanonis di atas untuk rangkaian lengkap `DEFAULT_WEIGHTS` — penggantian per paket (ship-fast/cost-saver/quality-first/offline-friendly) tercantum dalam tabel "Profil bobot per paket".

Tier saja **tidak** memaksa Tier 1 untuk selalu didahulukan — jika latensi Tier 1 buruk atau perbandingan biaya terhadap kualitas tidak optimal, Tier 2 yang akan dipilih. Untuk memaksakan urutan tier, gunakan strategi combo `priority` dan atur penyedia berdasarkan tier.

Untuk sangat memprioritaskan Tier 1 (langganan), tingkatkan bobot `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Lihat `docs/marketing/TIERS.md` untuk definisi tier dan klasifikasi penyedia.

## Pengujian & Cakupan

### Matriks keputusan perutean deterministik (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` membuktikan **keputusan** perutean dari seluruh 19 strategi publik secara menyeluruh melalui pipeline combo yang sebenarnya dengan upstream tiruan. Cakupannya meliputi:

- Seluruh 19 strategi `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (internal) secara menyeluruh: keadilan DRR + penurunan prioritas saat saturasi melalui seam `selectQuotaShareTarget` yang sebenarnya (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- Cakupan serah-terima universal `context-relay` di seluruh jumlah target.

Suite ini dijalankan di CI (job `test:integration`) dengan `--test-concurrency=1` dan `--test-force-exit` agar deterministik dan tidak memerlukan kredensial aktif.

### Smoke test live berbatas akses (TIDAK di CI — penyedia nyata)

| Perintah                               | Fungsinya                                                                                    |
| :------------------------------------- | :------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Perutean nyata dalam proses dengan `RUN_COMBO_LIVE=1`; mengambil snapshot DB OmniRoute aktif |
| `npm run test:combo:live:vps`          | Panggilan HTTP terhadap server OmniRoute aktif (atur `COMBO_LIVE_BASE_URL`)                  |
| `npm run test:combo:live:vps:failover` | Hal yang sama, dengan skenario failover yang disengaja                                       |

Smoke test ini menguji jalur komunikasi yang sebenarnya (combo → penyedia → penyelesaian). Pengujian ini sengaja dikecualikan dari CI karena memerlukan kredensial aktif dan akses VPS.

---

## Berkas

| Berkas                                                    | Tujuan                                                                                                          |
| :-------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Fungsi penilaian 16 faktor, `DEFAULT_WEIGHTS`, normalisasi pool                                                 |
| `open-sse/services/autoCombo/taskFitness.ts`              | Pencarian kecocokan model × tugas                                                                               |
| `open-sse/services/autoCombo/engine.ts`                   | Logika pemilihan, bandit, batas anggaran                                                                        |
| `open-sse/services/autoCombo/selfHealing.ts`              | Pengecualian, probe, mode insiden                                                                               |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profil bobot (kirim-cepat, penghemat-biaya, utamakan-kualitas, ramah-offline, utamakan-keandalan, mode-kacau) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefiks `auto/` + 6 varian                                                                               |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Membuat `AutoComboConfig` dalam memori dari koneksi aktif                                                       |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Kait pengujian untuk membuat tiruan registri penyedia                                                           |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 strategi)                                                                         |
| `src/sse/handlers/chat.ts`                                | Integrasi: pengalihan singkat prefiks otomatis                                                                  |
