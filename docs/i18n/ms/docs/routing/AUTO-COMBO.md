# OmniRoute Auto-Combo Engine (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Untuk Pengguna**: Mahukan permulaan yang pantas? Lihat [Panduan Pengguna Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) untuk penerangan dan contoh ringkas.

> Rantaian model yang mengurus sendiri dengan pemarkahan adaptif + penghalaan automatik tanpa konfigurasi

## Penghalaan Automatik Tanpa Konfigurasi (awalan `auto/`)

> **BAHARU:** Tidak perlu mencipta combo. Gunakan awalan `auto/` secara langsung dalam mana-mana klien.

### Contoh Ringkas

| ID Model       | Varian  | Tingkah Laku                                                                                    |
| -------------- | ------- | ----------------------------------------------------------------------------------------------- |
| `auto`         | lalai   | Semua penyedia yang disambungkan, strategi LKGP, pemberat seimbang                              |
| `auto/coding`  | coding  | Pemberat yang mengutamakan kualiti, sesuai untuk penjanaan kod                                  |
| `auto/fast`    | fast    | Pemilihan berwajaran dengan kependaman rendah                                                   |
| `auto/cheap`   | cheap   | Penghalaan yang dioptimumkan untuk kos (kos terendah dahulu)                                    |
| `auto/offline` | offline | Mengutamakan penyedia dengan ketersediaan kuota tertinggi                                       |
| `auto/smart`   | smart   | Mengutamakan kualiti + kadar penerokaan lebih tinggi (10%) untuk penemuan model yang lebih baik |
| `auto/lkgp`    | lkgp    | LKGP eksplisit (sama seperti `auto` lalai)                                                      |
| `auto/chaos`   | chaos   | Pemberat suntikan kerosakan untuk ujian daya tahan (kejuruteraan chaos)                         |

### Komposisi Kategori × Tahap (`auto/<category>:<tier>`)

Akhiran gaya OpenRouter memisahkan **jenis laluan** (kategori) daripada **cara mengoptimumkannya** (tahap), supaya anda boleh menggabungkannya secara bebas (#4235 Fasa B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategori** (tapis kumpulan calon berdasarkan keupayaan): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` mengekalkan model berkeupayaan penglihatan; `reasoning` mengekalkan model penaakulan/pemikiran.
- **Tahap** (pilih pemberat pemarkahan / penapis kumpulan): `fast` (penghantaran pantas) · `cheap` (alias `floor`, penjimat kos) · `reliable` (kesihatan pemutus litar + kestabilan kependaman) · `free` / `pro` (tapis kumpulan mengikut tahap model melalui `classifyTier` — tahap percuma berbanding premium).

| Contoh                 | Diselesaikan kepada                                                 |
| ---------------------- | ------------------------------------------------------------------- |
| `auto/coding:fast`     | kumpulan coding, pemberat kependaman rendah                         |
| `auto/coding:cheap`    | kumpulan coding, dioptimumkan untuk kos (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | model penaakulan/pemikiran sahaja, tahap premium                    |
| `auto/vision`          | model berkeupayaan penglihatan (tiada tahap → pemberat seimbang)    |
| `auto/multimodal:free` | model berkeupayaan multimodal, tahap percuma sahaja                 |

Sebarang `auto/<category>[:<tier>]` yang sah diselesaikan apabila diperlukan; subset yang dikurasi diiklankan dalam `/v1/models` dan papan pemuka (`AUTO_SUFFIX_VARIANTS` dalam `open-sse/services/autoCombo/builtinCatalog.ts`). Penapisan adalah **fail-open** — jika sesuatu kekangan tidak sepadan dengan mana-mana model yang disambungkan, kumpulan penuh digunakan supaya penghalaan tidak pernah terjejas. Penskor teras (`combo.ts`) tidak berubah; penapis kategori/tahap digunakan dalam `buildAutoCandidates`.

> **Kecerdasan model langsung:** kesesuaian penghalaan automatik dipandu oleh kedudukan langsung **Arena ELO** + data tahap **models.dev** apabila bendera `ARENA_ELO_SYNC_ENABLED` dihidupkan (jika tidak, ia kembali menggunakan peta kesesuaian statik).

**Cara menggunakan:**

```bash
# Mana-mana alat IDE atau CLI yang menyokong format OpenAI
URL Asas: http://localhost:20128/v1
Kunci API: <your-endpoint-key>

# Dalam kod/konfigurasi anda, tetapkan model kepada:
model: "auto"                 # lalai seimbang
model: "auto/coding"          # terbaik untuk tugas pengekodan
model: "auto/fast"            # paling pantas yang tersedia
model: "auto/cheap"           # paling murah bagi setiap token
```

**Perkara yang berlaku:**

1. OmniRoute mengesan awalan `auto/` dalam `src/sse/handlers/chat.ts`
2. Mendapatkan semua **sambungan penyedia aktif** daripada pangkalan data
3. Menapis kepada sambungan yang mempunyai bukti kelayakan sah (kunci API atau token OAuth)
4. Menentukan model bagi setiap sambungan (`connection.defaultModel` atau model pertama penyedia)
5. Membina **combo maya** dalam memori (tidak disimpan dalam DB)
6. Menghala menggunakan profil pemberat varian yang dipilih + strategi LKGP

**Sifat utama:**

- ✅ **Sentiasa aktif:** Tiada suis, tiada penciptaan combo dan tiada konfigurasi diperlukan
- ✅ **Dinamik:** Mencerminkan penyedia yang sedang disambungkan secara automatik
- ✅ **Kelekatan sesi:** LKGP memastikan penyedia terakhir yang berjaya diberi keutamaan
- ✅ **Menyokong berbilang akaun:** Setiap sambungan penyedia menjadi calon yang berasingan
- ✅ **Tiada penulisan DB:** Combo maya hanya wujud untuk permintaan tersebut, tanpa overhed pengekalan

### Kawalan calon bagi setiap kunci (#7819, Tahap 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = akhiran selepas `auto/`, atau
literal `auto` untuk saluran asas) ialah titik akhir **baca sahaja** yang menyenaraikan
kumpulan calon semasa bagi saluran `auto/*`, dilengkapi dengan kebolehcapaian langsung, menggunakan semula
bacaan daya tahan sedia ada (bukan `state` pemutus mentah):

- pemutus litar penyedia — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- tempoh bertenang sambungan — `rateLimitedUntil` / `testStatus` pada baris
  `provider_connections` yang telah diselesaikan
- sekatan model — `isModelLocked(provider, connectionId, model)`

Setiap calon turut membawa bendera `excluded` bagi kunci API ini. Pengecualian disimpan
bagi setiap kunci API (jadual `auto_candidate_overrides`, migrasi `128`) — OmniRoute
merupakan sistem penyewa tunggal tanpa jadual `users`, maka `apiKeyId` ialah identiti
sebenar bagi setiap pemanggil yang paling hampir — dan dikuatkuasakan pada titik kawalan
kumpulan calon dalam `open-sse/services/autoCombo/virtualFactory.ts` melalui
`filterExcludedCandidates()` yang tulen dan diuji unit (`open-sse/services/autoCombo/candidateOverrides.ts`).
Penapis tersebut bersifat **fail-open**: `apiKeyId`/saluran yang tidak ditetapkan atau kegagalan carian DB
kedua-duanya membiarkan kumpulan tanpa penapisan, supaya pengendali tanpa sebarang penggantian
yang dikonfigurasikan melihat penghalaan yang seiras bait dengan keadaan sebelum ciri ini.

**Ditangguhkan kepada isu susulan:** pemberat bagi setiap calon + susunan eksplisit (Tahap 3
— disalurkan ke laluan strategi berwajaran/keutamaan sedia ada) dan penetapan strategi
`combo.ts` tertentu bagi setiap saluran `auto/*` (Tahap 4). Lihat pelan #7819 untuk soalan
terbuka sama ada penggantian harus kekal bagi setiap kunci API atau menjadi global berdasarkan
model penyewa tunggal.

**Di sebalik tabir:**

```txt
Permintaan: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts mengesan awalan
   ↓
createVirtualAutoCombo('coding') → candidatePool daripada sambungan aktif
   ↓
handleComboChat (enjin yang sama seperti kombo tersimpan)
   ↓
Pemarkahan automatik memilih penyedia/model terbaik bagi setiap permintaan
```

**Fail pelaksanaan:**

| Fail                                                      | Tujuan                                          |
| --------------------------------------------------------- | ----------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Penghurai awalan (`parseAutoPrefix`)            |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Mencipta objek `AutoComboConfig` maya           |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Cangkuk ujian untuk mengolok pendaftar penyedia |
| `src/sse/handlers/chat.ts`                                | Penyepaduan: pintasan awal awalan automatik     |
| `src/shared/constants/providers.ts`                       | Entri sistem `SYSTEM_PROVIDERS.auto`            |

## Nama Combo yang Sepadan dengan Id Model Sebenar

Combo yang `name`-nya sama dengan id model biasa (contohnya combo bernama
`gpt-5.5`) ialah **corak yang disengajakan dan disokong**, bukannya pepijat: ia merupakan
mekanisme sandaran penyedia bagi setiap id model yang didokumentasikan dalam
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Oleh sebab resolusi combo
disemak sebelum resolusi id model biasa
(`getComboForModel()` dalam `src/sse/services/model.ts`), permintaan untuk id biasa
`gpt-5.5` dihalakan melalui sasaran combo tersebut (contohnya
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) dan bukannya terus kepada
satu penyedia — ini menggunakan semula keutamaan combo-sebelum-penulisan-semula yang dibina untuk
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) dan
diuji bagi regresi oleh `tests/unit/responses-combo-resolution-3227.test.ts` dan
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Mencipta atau menamakan semula combo kepada nama yang membayangi id model sebenar
**tidak akan sekali-kali ditolak** — tindakan sedemikian akan menjejaskan aliran kerja yang didokumentasikan ini. Sebaliknya
(#8530), `POST /api/combos` dan `PUT /api/combos/[id]` melampirkan medan
`warning` yang tidak menyekat pada respons apabila nama (baharu) bertembung dengan id
model sebenar:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Semasa pemulaan, `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) turut merekodkan amaran `[STARTUP]` satu baris
yang menyenaraikan setiap combo sedia ada yang membayangi id model, supaya pengendali yang
menghadapi perkara ini secara tidak sengaja (dan bukannya dengan sengaja, seperti dalam #6940) menerima isyarat.
Pembantu pengesanan terletak dalam `src/lib/combos/modelNameCollision.ts`.

## Memanggil Combo Tersuai daripada Klien

Combo tersimpan (Settings → Combos) hanya digunakan apabila klien menghantar **nama tepat** combo tersebut dalam medan `model` — tiada pemadanan kabur atau separa bagi nama combo, dan tiada awalan `auto/` yang terlibat. Urutan resolusi (`getComboForModel()` dalam `src/sse/services/model.ts`):

1. padanan tepat nama combo (`model: "my-combo"`),
2. awalan `combo/<name>` (`model: "combo/my-combo"`),
3. pemetaan glob model→combo (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dua kesilapan lazim:

- **`auto` tidak menggunakan combo anda.** `auto`/`auto/*` membina kumpulan calonnya sendiri tanpa konfigurasi dan hanya merujuk combo tersimpan jika sesuatu combo benar-benar dinamakan `auto` (tidak disyorkan). Untuk menghalakan melalui combo, hantar nama tepatnya — bukan `auto`.
- **`openrouter/auto` ialah produk OpenRouter berbayar yang sebenar** ("Auto Best Available"), bukannya alias OmniRoute. Ia merupakan entri model statik tunggal dalam daftar OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) dan dibilkan secara berasingan. Gunakan Settings → Routing → Hide paid models untuk mengecualikannya daripada kumpulan `auto`.

Lihat [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) dan [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) untuk kekeliruan asal yang didokumentasikan di sini.

## Cara Ia Berfungsi (Auto-Combo Tersimpan)

Enjin Auto-Combo memilih penyedia/model terbaik secara dinamik bagi setiap permintaan menggunakan **fungsi pemarkahan 16 faktor** (ditakrifkan dalam `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Jumlah pemberat lalai ialah `1.0`; pemberat tersuai dinormalkan semula oleh `normalizeScoringWeights()`. Dua daripada enam belas faktor tersebut — `cacheAffinity` dan `resetWindowAffinity` — mempunyai pemberat lalai `0`; `reliability` mempunyai pemberat `0` dalam `DEFAULT_WEIGHTS` tetapi `0.03` dalam pek generik dan `0.04` dalam `reliability-first`, manakala `quality` mempunyai pemberat `0.02` dalam pek (`0.03` dalam `quality-first`): faktor-faktor ini masih dikira bagi setiap calon, dan `cacheAffinity` mengawal penyahduplikasian cache gesaan di luar skor, jadi faktor dengan nilai lalai sifar tidak mempengaruhi keputusan secara lalai manakala pek menggunakannya.

![Pemarkahan 16 faktor Auto-Combo](../diagrams/exported/auto-combo-scoring.svg)

> Sumber: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (jana semula melalui `npm run docs:render-diagrams`). Nama fail tersebut bersifat historikal; sumber dan rajah yang dipaparkan menunjukkan kesemua 16 faktor yang diisytiharkan dalam `DEFAULT_WEIGHTS`.

| Faktor                | Pemberat Lalai | Penerangan                                                                                                                                                                                                                              |
| :-------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429         | Baki kuota / ruang had kadar [0..1]                                                                                                                                                                                                     |
| `health`              | 0.1605         | Skor kesihatan daripada pemutus litar (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                             |
| `costInv`             | 0.1429         | Kos **campuran** songsang (60% harga token input + 40% harga token output, dinormalkan) — lebih murah = skor lebih tinggi                                                                                                               |
| `latencyInv`          | 0.1143         | Kependaman p95 songsang yang dinormalkan mengikut kumpulan — lebih pantas = skor lebih tinggi                                                                                                                                           |
| `taskFit`             | 0.0762         | Kesesuaian jenis tugas (pengekodan, semakan, perancangan, analisis, penyahpepijatan, dokumentasi)                                                                                                                                       |
| `stability`           | 0.0476         | Kestabilan berasaskan varians daripada sisihan piawai kependaman — calon dengan masa respons yang tidak menentu menerima skor lebih rendah                                                                                              |
| `tierPriority`        | 0.0476         | Keutamaan peringkat akaun — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                |
| `tierAffinity`        | 0.0476         | Keserasian antara peringkat calon dengan peringkat yang disyorkan oleh manifes                                                                                                                                                          |
| `specificityMatch`    | 0.0476         | Padanan antara kekhususan permintaan (petunjuk manifes) dengan peringkat model                                                                                                                                                          |
| `contextAffinity`     | 0.0476         | Keserasian antara keperluan tetingkap konteks permintaan dengan tetingkap konteks model                                                                                                                                                 |
| `sessionAvailability` | 0.0476         | Ketersediaan sesi OAuth bagi sambungan calon untuk sesi ini (`getOAuthSessionAvailability()`; sambungan bukan OAuth menerima skor 1.0)                                                                                                  |
| `connectionDensity`   | 0.0476         | Mengagihkan beban merentas sambungan daripada penyedia yang sama (antipenumpuan)                                                                                                                                                        |
| `cacheAffinity`       | 0.00           | Keserasian hash rendezvous terhadap sambungan yang berkemungkinan besar telah menyimpan awalan cache gesaan permintaan ini (`open-sse/services/combo/promptCacheAffinity.ts`); dilumpuhkan secara lalai (#8008)                         |
| `resetWindowAffinity` | 0.00           | Kecondongan terhadap sambungan yang mempunyai tetingkap penetapan semula kuota yang menguntungkan (dilumpuhkan secara lalai)                                                                                                            |
| `quality`             | 0.03           | Isyarat kualiti output berpandukan maklum balas daripada penjejak kualiti peristiwa penghalaan; calon tanpa pemerhatian menerima nilai neutral 0.5                                                                                      |
| `reliability`         | 0.00           | Bahagian kejayaan yang diperhatikan, `1 - failureRate`, daripada sejarah penggunaan 24 jam dengan paras minimum sepuluh sampel (jika tidak, metrik masa nyata); calon tanpa pemerhatian dianggap bernilai 1.0. Dilumpuhkan secara lalai |

**Jumlah:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` seperti yang diisytiharkan dalam `DEFAULT_WEIGHTS`; pemberat yang dikonfigurasikan pengguna dinormalkan semula menjadi suatu taburan oleh `normalizeScoringWeights()` sebelum pemarkahan.

## Pek Mod

6 profil pemberat pratakrif dalam `open-sse/services/autoCombo/modePacks.ts`. Setiap pek menggantikan pemberat lalai sepenuhnya untuk mencondongkan pemilihan ke arah satu matlamat. Setiap pek sudah berjumlah `1.0` (`0.9999` seperti yang dipaparkan hingga empat tempat perpuluhan), jadi `normalizeScoringWeights()` tidak mempunyai apa-apa yang bermakna untuk dibetulkan apabila sesuatu pek aktif — nilai di bawah ialah, tertakluk pada pembundaran, nilai yang digunakan oleh penskor.

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

Nota:

- **Pek mengandungi `quality` dan `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) dan menggantikan keseluruhan peta pemberat (`weights = pack`, bukan penggabungan). `DEFAULT_WEIGHTS` mengandungi `quality 0.03 / reliability 0`; memilih `balanced`/`default` mengekalkan nilai lalai tersebut, manakala memilih sesuatu pek menggunakan nilai pek di atas. Dalam kumpulan sejuk (belum ada pemerhatian, maka `quality 0.5` dan `reliability 1`), kedua-dua faktor ini menambah `+0.04` di bawah pek generik (`0.03 + 0.01`), `+0.045` di bawah `quality-first` dan `+0.05` di bawah `reliability-first`.
- `tierAffinity`, `specificityMatch` dan `resetWindowAffinity` ditetapkan secara eksplisit kepada `0` dalam setiap pek.
- Penekanan setiap pek sepintas lalu:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (sambungan kependaman rendah dan sihat)
  - **cost-saver** → costInv 0.3324 (token termurah diutamakan)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, yang tertinggi antara semua pek (model terbaik dan konsisten untuk tugas tersebut)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (ruang kapasiti maksimum tanpa mengira kelajuan/kos)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, yang tertinggi antara semua pek (paling kurang kejutan)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (profil suntikan kerosakan)

### Kawalan Per Permintaan (pengepala) — #6023 / #6024 / #6025 / #3470

Kombo `auto` boleh dikawal **bagi setiap permintaan** melalui tiga pengepala, tanpa mengubah konfigurasi tersimpan kombo tersebut. Ini hanya digunakan pada strategi `auto` dan hanya untuk permintaan yang membawa pengepala berkenaan; `modePack`/`budgetCap`/`budgetFallback` tersimpan bagi kombo digunakan apabila pengepala tersebut tiada.

| Pengepala                     | Menerima                                                                                                                                                                                  | Kesan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | alias pratetap (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) atau nama pek mentah (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Mengatasi pemberat pemarkahan untuk permintaan ini. `balanced`/`default` memaksa penggunaan pemberat lalai (tanpa pek). Nilai yang tidak dikenali akan diabaikan (konfigurasi dikekalkan).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Budget`          | nombor positif (USD maksimum bagi setiap permintaan)                                                                                                                                      | Had kos mutlak: calon yang anggaran kosnya melebihi had ini akan ditapis sebelum pemilihan. Perkara yang berlaku apabila **setiap** calon melebihi had ini dikawal oleh `X-OmniRoute-Budget-Fallback` di bawah.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (lalai, alias: `cheapest-viable`, `soft`) atau `strict` (alias: `block`, `hard`)                                                                                               | `cheapest`: kembali menggunakan calon paling murah secara keseluruhan walaupun calon tersebut masih melebihi had (tingkah laku legasi). `strict`: enggan membuat pemilihan — permintaan gagal serta-merta dengan `HTTP 402` dan bukannya berbelanja berlebihan secara senyap. Nilai yang tidak dikenali akan diabaikan.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `X-OmniRoute-Effort`          | `auto` (nilai lain dikhaskan)                                                                                                                                                             | Belanjawan pemikiran adaptif: apabila permintaan **tidak** mengandungi medan penaakulan dalam apa-apa bentuk (`reasoning_effort`, `reasoning`, `thinking`), get laluan menyelesaikan `auto` kepada `low`/`medium`/`high` berdasarkan isyarat bentuk permintaan yang bersifat deterministik (panjang mesej pengguna terakhir, saiz konteks sehingga mesej pengguna terakhir, hasil alat terdahulu, kedalaman gelung alat). Isyarat dihadkan kepada giliran semasa — segala-galanya selepas mesej pengguna terakhir diabaikan — supaya setiap permintaan dalam gelung alat diselesaikan kepada tahap yang sama (penetapan setiap giliran tanpa keadaan, tanpa keadaan sesi, tanpa peningkatan pertengahan gelung yang akan merosakkan awalan cache gesaan huluan). Medan penaakulan klien yang dinyatakan secara eksplisit sentiasa diutamakan. Terhad kepada permintaan yang penghantaran huluannya diselesaikan kepada bentuk OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` ialah medan berbentuk OpenAI, maka pengepala ini tidak memberikan kesan pada permintaan yang disasarkan kepada Claude atau Gemini (lihat `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Paksa profil terpantas, hadkan permintaan ini kepada $0.05 dan sekat sepenuhnya dan bukannya berbelanja melebihi had
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Resolusi ialah fungsi tulen (`open-sse/services/autoCombo/requestControls.ts`); nilai yang
diselesaikan disalurkan kepada input `config.modePack` / `config.budgetCap` /
`config.budgetFallback` sedia ada bagi enjin. `config.budgetFallback` ("strict" |
"cheapest") yang disimpan bagi sesuatu kombo menetapkan dasar berterusan; pengepala tersebut mengatasinya untuk satu permintaan sahaja.

## Semua Strategi Penghalaan

Enjin kombo OmniRoute menyokong **19 strategi penghalaan** (diisytiharkan dalam `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Enjin Auto Combo itu sendiri disediakan di bawah strategi `auto`; strategi lain tersedia untuk kombo yang disimpan.

| Strategi            | Penerangan                                                                                                                                                                                                            |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Senarai tersusun yang mengutamakan sasaran pertama dengan keutamaan eksplisit                                                                                                                                         |
| `weighted`          | Pemilihan rawak berwajaran mengikut wajaran setiap sasaran                                                                                                                                                            |
| `round-robin`       | Mengitar sasaran mengikut turutan                                                                                                                                                                                     |
| `context-relay`     | Memindahkan konteks merentas sasaran (perbualan panjang)                                                                                                                                                              |
| `fill-first`        | Memenuhi kuota setiap sasaran sebelum beralih kepada sasaran seterusnya                                                                                                                                               |
| `p2c`               | Pengimbangan beban rawak berdasarkan kuasa 2 pilihan                                                                                                                                                                  |
| `random`            | Pemilihan rawak seragam                                                                                                                                                                                               |
| `least-used`        | Memilih sasaran dengan beban semasa paling rendah                                                                                                                                                                     |
| `cost-optimized`    | Meminimumkan $ bagi setiap permintaan berdasarkan harga katalog                                                                                                                                                       |
| `reset-aware` ⭐    | Mengutamakan berdasarkan masa penetapan semula kuota — tetingkap penetapan semula yang singkat diberi kedudukan lebih tinggi                                                                                          |
| `reset-window`      | Mengutamakan sasaran yang tetingkap kuotanya akan ditetapkan semula paling awal                                                                                                                                       |
| `headroom`          | Memilih sasaran dengan ruang baki kuota paling banyak                                                                                                                                                                 |
| `strict-random`     | Pemilihan rawak tanpa penyahduplikasian pengulangan                                                                                                                                                                   |
| `auto`              | Menggunakan pemarkahan Auto Combo (16 faktor) — **disyorkan**                                                                                                                                                         |
| `lkgp`              | Laluan Terakhir Diketahui Baik (mengekalkan penyedia terakhir yang berjaya, kemudian beralih kepada peraturan sandaran)                                                                                               |
| `context-optimized` | Memilih sasaran yang paling sesuai dengan saiz konteks semasa                                                                                                                                                         |
| `cache-optimized`   | Menyusun semula sasaran mengikut afiniti cache prom — sambungan yang berkemungkinan besar telah menyimpan awalan tercache bagi permintaan ini dicuba dahulu (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Menghantar permintaan kepada panel model secara selari, kemudian mensintesis satu jawapan melalui model penilai (lihat di bawah)                                                                                      |
| `pipeline`          | Menjalankan sasaran secara berurutan dengan menyalurkan output setiap langkah kepada input langkah seterusnya; hanya jawapan akhir dikembalikan (#6396)                                                               |

⭐ = Baharu dalam v3.8.0 · 🧬 = Baharu dalam v3.8.36

### Semantik `weighted`

`weighted` ialah **cabutan rawak berkadar bagi setiap permintaan**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), bukan mekanisme penyamaan:

- Setiap permintaan mencabut **satu** langkah dengan kebarangkalian `weight / totalWeight`; langkah selebihnya
  disusun mengikut wajaran secara menurun sebagai rantaian sandaran bagi permintaan tersebut.
- Langkah yang mempunyai wajaran `0` (atau tiada wajaran) **tidak akan dicabut** selagi langkah lain
  mempunyai wajaran > 0 — langkah itu hanya boleh berfungsi sebagai sandaran selepas langkah yang dicabut gagal. Hanya apabila **semua**
  wajaran ialah 0, pemilihan menjadi seragam.
- Langkah yang semua sasarannya tidak tersedia — pemutus litar penyedia `OPEN`, tempoh bertenang
  sambungan, penguncian model — dikeluarkan daripada cabutan sebelum cabutan dilakukan
  (`open-sse/services/combo/targetResolution.ts`), maka satu langkah yang sihat boleh memenangi setiap
  permintaan buat sementara waktu.
- `stickyWeightedLimit` (konfigurasi kombo, lalai `1` = dimatikan) mengekalkan langkah yang dicabut untuk bilangan
  kejayaan berturut-turut tersebut sebelum cabutan dibuat semula.

Untuk penggiliran ketat, gunakan `round-robin`; wajaran yang sama pada `weighted` memberikan keseimbangan
statistik — bukan keseimbangan ketat.

## Strategi Fusion

`fusion` ialah satu-satunya strategi yang **tidak** memilih satu sasaran sahaja. Ia menghantar gesaan
kepada **setiap model panel secara selari**, kemudian **model penilai** yang boleh dikonfigurasikan mensintesis
satu jawapan akhir daripada semua respons panel. Diport daripada `decolua/9router` huluan
(reka bentuk Fusion OpenRouter); pelaksanaannya terdapat dalam `open-sse/services/fusion.ts`.

Cara ia berfungsi:

0. **Pintasan permintaan dengan alat** — permintaan yang membawa tatasusunan `tools` yang tidak kosong dengan
   `tool_choice` yang tidak ditetapkan secara jelas kepada `"none"` akan melangkau panel sepenuhnya: ia dihalakan terus kepada
   satu model (penilai yang dikonfigurasikan, atau `panel[0]`) dengan `tools`/`tool_choice`
   diteruskan tanpa pengubahsuaian. Ahli panel tidak mempunyai akses kepada alat dan arahan
   sintesis penilai menghalang penghasilan panggilan alat, supaya klien berasaskan ejen/panggilan alat
   memperoleh keputusan panggilan alat sebenar dan bukannya prosa yang disintesis (#6771).
1. **Penghantaran serentak** (hanya untuk permintaan tanpa alat) — gesaan dihantar kepada setiap model
   panel serentak, dengan mod bukan penstriman dipaksa dan alat disingkirkan (penilai memerlukan
   prosa lengkap untuk melakukan sintesis).
2. **Pengumpulan kuorum dengan tempoh ihsan** — sebaik sahaja `minPanel` jawapan diterima, pemasa
   ihsan singkat dimulakan untuk respons yang lewat, kemudian fusion diteruskan dengan apa sahaja yang telah dikumpulkan.
   Ini mengehadkan penalti masa sebenar daripada model paling perlahan, tertakluk pada had masa tamat mutlak.
3. **Sintesis penilai** — jawapan panel dianonimkan (`Source 1`, `Source 2`, … — supaya
   penilai menimbang isi kandungan, bukannya jenama model) dan diberikan kepada penilai, yang menganalisis
   konsensus / percanggahan / liputan separa / pandangan unik / titik buta, kemudian
   menulis **satu** jawapan berwibawa. Panggilan penilai mengekalkan nilai asal `stream`
   milik klien berserta alat, supaya penstriman dan penggunaan alat hiliran masih berfungsi.
4. **Degradasi beransur-ansur** — 0 jawapan panel → `503`; tepat 1 jawapan yang berjaya → jawapan tersebut
   dikembalikan secara terus (tiada apa-apa untuk digabungkan); panel dengan satu model memberikan jawapan secara terus.

Ahli panel juga boleh berupa langkah `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) yang merujuk
kepada combo lain — ia diselesaikan sebagai **satu suara panel kotak hitam** (penghantaran rekursif penuh ke dalam
combo yang dirujuk, bukannya penghantaran serentak kepada sasaran combo tersebut), dengan perlindungan kedalaman/kitaran yang sama
yang telah digunakan oleh setiap strategi lain yang menggunakan combo-ref (#6764).

### Konfigurasi

Dikonfigurasikan pada blob `config` combo (tiada migrasi skema — ia menggunakan semula jadual
`combos` yang sedia ada):

| Medan                                    | Jenis    | Lalai               | Tujuan                                                                                        |
| :--------------------------------------- | :------- | :------------------ | :-------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | model panel pertama | Model yang mensintesis jawapan akhir                                                          |
| `config.fusionTuning.minPanel`           | `number` | `2`                 | Jawapan berjaya yang diperlukan sebelum pemasa ihsan bermula (diapit kepada `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`              | Tempoh menunggu respons yang lewat setelah kuorum dicapai                                     |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`             | Had mutlak supaya satu model yang tergantung tidak dapat melengahkan permintaan               |

Nilai lalai terdapat dalam `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

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

Kemudian panggilnya seperti mana-mana combo lain: `{"model":"fusion-panel","messages":[...]}`.

## Kilang Kombo Auto Maya

Enjin Auto Combo tidak memerlukan kombo yang dipratakrifkan. Sebaliknya, `open-sse/services/autoCombo/virtualFactory.ts` membina calon secara dinamik:

1. Mengambil `getProviderConnections({ isActive: true })` (semua sambungan yang didayakan)
2. Menapis kepada sambungan yang mempunyai kelayakan sah (kunci API atau token OAuth yang belum tamat tempoh melalui `hasUsableOAuthToken()`)
3. Membuat rujukan silang dengan `getProviderRegistry()` untuk ketersediaan model + harga
4. Bagi setiap tupel `(provider, model, connection)`, membina `VirtualAutoComboCandidate`
5. Memilih `connection.defaultModel` (atau model pertama dalam daftar) sebagai sasaran penghantaran
6. Memberikan skor kepada setiap calon menggunakan `scorePool()` 16 faktor dan pek pemberat varian
7. Mengembalikan `AutoComboConfig` dalam memori yang terhasil untuk `handleComboChat()` — tidak pernah disimpan ke DB

Ini bermakna **penambahan penyedia baharu dengan `auto/*` didayakan akan mengembangkan kumpulan calon secara automatik** — tiada penyuntingan kombo secara manual diperlukan. Kombo maya dibina semula bagi setiap permintaan, jadi sambungan yang baru ditambahkan atau baru kembali sihat akan digunakan serta-merta.

## Pemulihan Kendiri

- **Pengecualian sementara**: Skor < 0.2 → dikecualikan selama 5 minit (undur bertahap, maksimum 30 minit)
- **Kesedaran pemutus litar**: OPEN → dikecualikan secara automatik; HALF_OPEN → permintaan percubaan
- **Mod insiden**: >50% OPEN → lumpuhkan penerokaan, maksimumkan kestabilan
- **Pemulihan tempoh bertenang**: Selepas pengecualian, permintaan pertama ialah "percubaan" dengan tamat masa yang dikurangkan

## Penerokaan Bandit

5% daripada permintaan (boleh dikonfigurasikan) dihalakan kepada penyedia rawak untuk penerokaan. Dilumpuhkan dalam mod insiden.

## API

**Tiada titik akhir khusus `POST /api/combos/auto`** — Auto-Combo digunakan dalam dua cara:

1. **Konfigurasi sifar (disyorkan):** Hantar sebarang permintaan pelengkapan sembang dengan `model: "auto"` atau `model: "auto/<variant>"`. Kilang maya membina kombo bagi setiap permintaan — tiada pengekalan, tiada panggilan API diperlukan.

2. **Kombo tersimpan dengan `strategy: "auto"`:** Cipta kombo biasa melalui `POST /api/combos` dan tetapkan `strategy: "auto"` berserta `config.auto.weights` / `config.auto.candidatePool`. Enjin pemarkahan yang sama digunakan; kombo disimpan dalam `combos` dan boleh digunakan semula mengikut ID.

Untuk penemuan, `GET /api/combos/auto` menyenaraikan setiap varian berserta kumpulan calon yang telah diselesaikan serta `context_length` / `max_output_tokens` — nilai MAKSIMUM merentas tetingkap kumpulan calon. Klien (contohnya pemalam opencode) mesti mengiklankan nilai ini dan bukannya `0`: konteks sifar melumpuhkan pemadatan automatik opencode sepenuhnya, membenarkan sesi berkembang sehingga pembersihan sejarah get laluan memusnahkan konteks. Nilai MAKSIMUM selamat untuk diiklankan kerana prapenapis konteks auto-combo menghalakan permintaan bersaiz terlalu besar kepada calon bertetingkap besar.

```bash
# Penggunaan konfigurasi sifar (tanpa penciptaan kombo)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Kombo auto tersimpan melalui titik akhir kombo biasa
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategi penghala auto

Kombo tersimpan `strategy: "auto"` boleh menetapkan `config.routerStrategy` (atau legasi
`config.auto.routerStrategy`) kepada salah satu daripada:

- `rules` — pemarkahan berwajaran lalai
- `score` — memilih skor berwajaran terkonfigurasi yang tertinggi. Jika skor sama tepat,
  susunan calon yang dikonfigurasikan dikekalkan; `explorationRate` sedia ada mengambil sampel daripada keseluruhan kumpulan berperingkat.
- `cost` / `eco` — penyedia sihat yang paling murah
- `latency` / `fast` — kependaman p95 terendah dengan penalti kebolehpercayaan
- `sla-aware` / `sla` — mengutamakan calon yang memenuhi kependaman p95, kadar ralat dan SLO
  kos pilihan
- `lkgp` — penyedia terakhir yang diketahui baik didahulukan

### Strategi penghala secara terperinci

Enjin auto-combo menyediakan 6 pelaksanaan **RouterStrategy** boleh pasang yang
boleh anda tukar melalui `config.routerStrategy` (atau `config.auto.routerStrategy` legasi).
Setiap strategi memilih satu penyedia daripada kumpulan calon berdasarkan `RoutingContext`
(jenis tugas, petunjuk alat/visual, anggaran token, dasar SLA pilihan, penyedia
terakhir yang diketahui baik secara pilihan).

#### 1. `rules` (lalai) — pemarkahan berwajaran 16 faktor

Membalut enjin pemarkahan sedia ada. Menapis keluar calon pemutus litar
`OPEN`, kemudian menjalankan `scorePool()` dengan jenis tugas semasa dan `getTaskFitness()`,
lalu memilih penyedia dengan skor tertinggi.

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

**Bila hendak digunakan**: Lalai. Gunakan apabila anda mahukan pertukaran seimbang merentas semua isyarat.

**Alias**: `rules` (tiada alias)

---

#### 2. `cost` / `eco` — penyedia sihat yang paling murah

Mengisih kumpulan calon mengikut `costPer1MTokens` (menaik) dan memilih yang paling murah.
Menapis keluar calon `OPEN` terlebih dahulu.

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

**Bila hendak digunakan**: Beban kerja yang peka terhadap kos, pemprosesan kelompok atau tugas latar belakang.

**Alias**: `cost`, `eco`

---

#### 3. `latency` / `fast` — kependaman p95 terendah dengan penalti kebolehpercayaan

Mengisih mengikut `p95LatencyMs + (errorRate * 1000)`. Penalti kadar ralat memastikan
penyedia yang tidak boleh dipercayai diberi kedudukan lebih rendah walaupun kependaman nominalnya rendah.

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

**Bila hendak digunakan**: Beban kerja yang sensitif terhadap kependaman seperti sembang masa nyata, autolengkap atau
pembantu pengekodan interaktif.

**Alias**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — pematuhan SLO kependaman/ralat/kos

Memberikan skor kepada setiap calon berdasarkan sejauh mana calon tersebut memenuhi dasar SLO yang dikonfigurasikan:

| Faktor          | Wajaran | Formula                                             |
| --------------- | ------- | --------------------------------------------------- |
| Skor kependaman | 35%     | `threshold / max(value, ε)`                         |
| Skor ralat      | 35%     | `threshold / max(value, ε)`                         |
| Skor kesihatan  | 15%     | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)   |
| Skor kos        | 10%     | `threshold / max(value, ε)` atau songsang ternormal |
| Skor kestabilan | 5%      | sisihan piawai kependaman ternormal secara songsang |

Apabila `hardConstraints: true`, calon diisih terutamanya mengikut **skor pelanggaran**
(sejauh mana mereka melebihi mana-mana SLO), kemudian mengikut skor komposit. Jika tidak, hanya
skor komposit digunakan.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... memberikan skor kepada setiap calon berdasarkan dasar: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Medan SLA** (ditetapkan pada konfigurasi gabungan):

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

**Bila hendak digunakan**: Beban kerja pengeluaran dengan belanjawan kependaman, kadar ralat atau kos yang ketat.

**Alias**: `sla-aware`, `sla`

---

#### 5. `lkgp` — penyedia terakhir yang diketahui baik didahulukan

Mencuba **penyedia terakhir yang diketahui baik** (jika ditetapkan) terlebih dahulu, kemudian kembali kepada
strategi `rules`. Berguna untuk kekekalan sesi — penyedia yang sama mengendalikan
permintaan susulan dalam sesuatu perbualan.

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

    // Kembali kepada strategi rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Bila hendak digunakan**: Perbualan berbilang giliran apabila anda mahu penyedia yang sama mengendalikan
permintaan susulan (contohnya, untuk pencachean, kesinambungan konteks atau konsistensi harga).

**Alias**: `lkgp` (tiada alias)

---

### Strategi penghala tersuai

Anda boleh mendaftarkan pelaksanaan `RouterStrategy` anda sendiri melalui API awam:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Logik penghalaan anda di sini
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

Kemudian gunakannya:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Panduan pemilihan strategi penghala

| Kes penggunaan            | Strategi    | Sebab                                       |
| ------------------------- | ----------- | ------------------------------------------- |
| Beban kerja seimbang      | `rules`     | Lalai — mempertimbangkan semua faktor       |
| Minimumkan kos            | `cost`      | Sentiasa memilih yang paling murah          |
| Minimumkan kependaman     | `latency`   | Memilih penyedia boleh dipercayai terpantas |
| SLO yang ketat            | `sla-aware` | Menapis mengikut ambang p95/ralat/kos       |
| Sembang berbilang giliran | `lkgp`      | Kekekalan sesi                              |

Medan peka SLA:

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

Lebih 30 model dinilai merentas 6 jenis tugas (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Menyokong corak kad bebas (contohnya, `*-coder` → skor pengekodan tinggi).

## Ringkasan Varian Auto

Termasuk `auto` asas (lalai) serta 6 nilai `AutoVariant` yang diisytiharkan dalam `autoPrefix.ts`, terdapat **7 ID model yang boleh digunakan**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` itu sendiri menyenaraikan 6 nilai; pilihan ke-7 ialah "tiada varian" — `auto` asas — yang dikendalikan oleh `parseAutoPrefix()` sebagai `variant: undefined`.)

## Cara peringkat disepadukan dengan Auto-Combo

Fungsi pemarkahan 16 faktor (`open-sse/services/autoCombo/scoring.ts`) menganggap keahlian
peringkat sebagai dua isyarat: `tierPriority` (0.0476) dan `tierAffinity` (0.0476). Lihat
[jadual faktor pemarkahan](#how-it-works-persisted-auto-combos) kanonik di atas untuk set
`DEFAULT_WEIGHTS` penuh — penggantian bagi setiap pek (ship-fast/cost-saver/quality-first/
offline-friendly) disenaraikan dalam jadual "Profil pemberat bagi setiap pek".

Peringkat sahaja **tidak** memaksa Peringkat 1 dipilih dahulu — jika kependaman Peringkat 1 tinggi atau
nisbah kos kepada kualiti tidak optimum, Peringkat 2 akan dipilih. Untuk memaksa susunan peringkat, gunakan
strategi kombo `priority` dan susun penyedia mengikut peringkat.

Untuk memberikan keutamaan yang tinggi kepada Peringkat 1 (langganan), tingkatkan pemberat `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Lihat `docs/marketing/TIERS.md` untuk takrif peringkat dan pengelasan penyedia.

## Pengujian & Liputan

### Matriks keputusan penghalaan deterministik (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` membuktikan **keputusan** penghalaan bagi kesemua 19
strategi awam secara hujung ke hujung melalui saluran kombo sebenar dengan huluan olok-olok.
Liputan merangkumi:

- Kesemua 19 strategi `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (dalaman) secara hujung ke hujung: keadilan DRR + penurunan keutamaan akibat ketepuan melalui
  titik sambungan `selectQuotaShareTarget` sebenar (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- Liputan penyerahan universal `context-relay` merentas setiap bilangan sasaran.

Suit ini dijalankan dalam CI (tugas `test:integration`) dengan `--test-concurrency=1` dan
`--test-force-exit` supaya ia bersifat deterministik dan tidak memerlukan kelayakan langsung.

### Ujian asap langsung berpagar (BUKAN dalam CI — penyedia sebenar)

| Perintah                               | Fungsinya                                                                                                      |
| :------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Penghalaan sebenar dalam proses dengan `RUN_COMBO_LIVE=1`; mengambil petikan pangkalan data OmniRoute langsung |
| `npm run test:combo:live:vps`          | Panggilan HTTP terhadap pelayan OmniRoute langsung (tetapkan `COMBO_LIVE_BASE_URL`)                            |
| `npm run test:combo:live:vps:failover` | Sama, dengan senario failover yang disengajakan                                                                |

Ujian asap ini menguji laluan komunikasi sebenar (kombo → penyedia → pelengkapan). Ujian ini
sengaja dikecualikan daripada CI kerana memerlukan kelayakan langsung dan akses VPS.

---

## Fail

| Fail                                                      | Tujuan                                                                                                                               |
| :-------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Fungsi pemarkahan 16 faktor, `DEFAULT_WEIGHTS`, norma kumpulan                                                                       |
| `open-sse/services/autoCombo/taskFitness.ts`              | Carian kesesuaian model × tugas                                                                                                      |
| `open-sse/services/autoCombo/engine.ts`                   | Logik pemilihan, bandit, had belanjawan                                                                                              |
| `open-sse/services/autoCombo/selfHealing.ts`              | Pengecualian, prob, mod insiden                                                                                                      |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profil pemberat (penghantaran pantas, penjimat kos, utamakan kualiti, mesra luar talian, utamakan kebolehpercayaan, mod huru-hara) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Penghurai awalan `auto/` + 6 varian                                                                                                  |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Membina `AutoComboConfig` dalam memori daripada sambungan langsung                                                                   |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Cangkuk ujian untuk memalsukan pendaftaran penyedia                                                                                  |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 strategi)                                                                                              |
| `src/sse/handlers/chat.ts`                                | Penyepaduan: pintasan awalan automatik                                                                                               |
