# Guardrails (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sumber rujukan utama:** `src/lib/guardrails/`
> **Kemas kini terakhir:** 2026-08-29 — v3.8.51 (asal usul transkrip Video Bridge diisytiharkan oleh pemanggil,
> belum disahkan oleh pelayan — diperjelas mengikut #11661)

Kekangan keselamatan menguatkuasakan keselamatan, dasar dan transformasi kandungan pada sempadan
antara OmniRoute dengan penyedia huluan. Setiap kekangan keselamatan boleh memeriksa (dan
secara pilihan menolak, mengubah atau menganotasi) muatan permintaan (`preCall`) dan
respons huluan (`postCall`).

Sistem ini bersifat **fail-open**: jika kekangan keselamatan melontarkan ralat semasa dilaksanakan, registri
merekodkan ralat tersebut dan meneruskan dengan kekangan keselamatan seterusnya dan bukannya menggagalkan
permintaan. Penyekatan ialah keputusan eksplisit (`block: true`), bukan kemalangan.

## Kekangan Keselamatan Terbina Dalam

Registri memuatkan enam kekangan keselamatan secara automatik mengikut keutamaan apabila diimport
(lihat `registry.ts` → `registerDefaultGuardrails()`):

| Keutamaan | Nama                | Peringkat      | Fail                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nombor keutamaan yang lebih rendah dijalankan **terlebih dahulu**.

### Vision Bridge (`visionBridge.ts`) — Jambatan Modaliti PR-1

Memintas permintaan yang mengandungi imej dan ditujukan kepada **model tanpa keupayaan penglihatan**, lalu sama ada
menghalakan semula keseluruhan permintaan kepada model berkeupayaan penglihatan atau menggantikan bahagian
imej dengan perihalan teks yang dihasilkan oleh model penglihatan boleh dikonfigurasi sebelum
panggilan huluan. Ini membolehkan penyedia teks sahaja mengendalikan
muatan multimodal secara telus.

Aliran:

1. Langkau jika model sasaran sudah menyokong penglihatan (melainkan model tersebut terdapat dalam
   senarai jambatan paksa `isVisionBridgeForcedModel`).
2. Ekstrak bahagian imej melalui `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), yang menyerahkan tugas kepada **pengesan media
   bersepadu** `detectMediaParts()` dalam `open-sse/utils/mediaParts.ts` — satu-satunya
   sumber rujukan utama yang dikongsi dengan penapis keserasian kombo.
   Pengekstrakan dihadkan kepada senarai bentuk bahagian peringkat atas yang
   boleh dicantumkan semula oleh `replaceImageParts` (kontrak ekstrak↔ganti): OpenAI
   `image_url`, `source.type:"base64"` base64 Anthropic, URL Anthropic
   `source.type:"url"` dan `input_image` Responses API. Padanan bersarang dan
   bentuk penunjuk sahaja merupakan bahan penapis kombo dan tidak pernah diekstrak.
   Langkau jika tiada yang ditemukan.
3. Tentukan konfigurasi masa jalan melalui `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): kekunci tetapan `modalityBridge*`
   baharu diutamakan; kekunci `visionBridge*` legasi kekal sebagai **sandaran satu kitaran**
   (tetingkap pengembalian). Langkau sebelum sebarang penelusuran media apabila
   jambatan dilumpuhkan.
4. Pemilih mod (`modalityBridgeVisionMode`, lihat jadual di bawah) menentukan
   penghalaan semula atau pemerihalan. Penghalaan semula mengembalikan `modifiedPayload` dengan hanya `model`
   ditukar, berserta meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Laluan pemerihalan: hadkan imej kepada `maxImages`, gubah gesaan peka tugas,
   rujuk cache pemerihalan, panggil model penglihatan **secara selari**
   (`Promise.allSettled`) dan suntik bahagian teks `[Image N]: <description>` sebagai
   gantinya. Pemerihalan yang gagal menghasilkan `null` dan bahagian imej asal
   **dikekalkan** (#4012) — kecuali pada laluan pemerihalan kombo apabila semua
   pemerihalan gagal, yang mana huluan tanpa keupayaan penglihatan yang disahkan akan menerima stub
   `(tidak tersedia — tiada penyedia berkeupayaan penglihatan disambungkan)` sebagai ganti (#8430).
6. Kembalikan `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Pemilih mod (`modalityBridgeVisionMode`)

| Mod        | Lalai | Tingkah laku                                                                                                                                                                                                                                                                                                                                       |
| ---------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔     | Heuristik legasi, tidak diubah (#6640/#7204): model bukan kombo/`auto/` dihalakan semula kepada model penglihatan terbaik melainkan model asal sudah mempunyai kelayakan yang boleh digunakan (kemudian perihalkan); sasaran kombo sentiasa diperihalkan.                                                                                          |
| `describe` |       | Sentiasa perihalkan — blok penghalaan semula dilangkau sepenuhnya; model pilihan pengguna sentiasa memberikan jawapan.                                                                                                                                                                                                                             |
| `reroute`  |       | Paksa penghalaan semula: perlindungan untuk mengekalkan model yang mempunyai kelayakan dipintas. Perlindungan kelayakan **sasaran** penghalaan semula masih terpakai — apabila tiada sasaran penglihatan yang boleh digunakan, permintaan beralih kepada pemerihalan supaya imej mentah tidak sampai kepada bahagian belakang teks sahaja (#8430). |

Mod paksa melakukan pintasan awal **sebelum** heuristik automatik dijalankan; tingkah laku `auto`
adalah seiras bait dengan kekangan keselamatan sebelum PR-1.

#### Gesaan pemerihalan peka tugas (`modalityBridgeVisionTaskAware`)

Lalai ialah **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) menambahkan
teks daripada **mesej pengguna terakhir** (dipendekkan kepada 500 aksara) pada gesaan asas
pemerihalan, bagi memandu perihalan ke arah perkara yang sebenarnya diminta oleh pengguna
(corak codex-vision-proxy) serta meminta model penglihatan mentranskripsikan teks yang kelihatan.
Apabila bendera dimatikan — atau tiada teks pengguna — gesaan asas digunakan tanpa perubahan.

Permintaan serasi OpenAI milik gelung kendiri describe (`callVisionModelSingle()`
dalam `visionBridgeHelpers.ts`) sentiasa meminta `image_url.detail: "high"` —
tanpa syarat, untuk setiap pemanggil/penyedia, dan tidak bergantung pada
sebarang isyarat klien. Pensampelan butiran rendah mengurangkan ketepatan OCR
khususnya bagi tugas transkripsi teks yang diminta oleh gesaan ini, maka
panggilan describe itu sendiri sentiasa meminta butiran tinggi tanpa mengira
tahap butiran yang digunakan oleh permintaan masuk asal. Ini hanya mempengaruhi
badan permintaan describe dalaman; ia tidak mengubah cara OmniRoute memajukan
`image_url.detail` milik pemanggil pada permintaan utama — nilai lalai itu
digunakan secara berasingan dan hanya untuk klien OpenCode yang dikesan, dalam
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Cabang
format wayar Anthropic bagi gelung kendiri describe tidak mempunyai medan
`detail` dan tidak dipengaruhi oleh mana-mana nilai lalai tersebut.

#### Had output describe (`modalityBridgeVisionMaxChars`)

| Kunci                          | Lalai | Julat              |
| ------------------------------ | ----- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`   | `0` atau 100–50000 |

`0` (lalai) bermaksud **tiada had** — perihalan yang dikembalikan oleh
`callVisionModel()` diteruskan tanpa perubahan, sekali gus mengekalkan tingkah
laku sedia ada. Sebarang nilai dalam julat 100–50000 memendekkan perihalan
dengan akhiran `…` sebelum ia disisipkan semula sebagai
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` dalam
`src/lib/guardrails/visionBridge.ts`). Tingkatkan nilai ini untuk tugas OCR
yang sarat dengan butiran apabila model hiliran memerlukan transkripsi penuh;
turunkannya untuk mengehadkan penggunaan token pada model penglihatan yang
banyak berbicara. Medan papan pemuka terletak dalam panel Lanjutan pada tab
Penglihatan (`modality-bridge-max-chars` dalam `ModalityBridgeVisionTab.tsx`)
dan mengepit sebarang nilai antara 1 hingga 99 kepada had bawah 100, sambil
membiarkan nilai `0` yang dinyatakan secara eksplisit tanpa perubahan — `0`
ialah nilai Zod yang sah dengan sendirinya
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), bukan sekadar
nilai lalai "tidak ditetapkan".

#### Cache describe (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dalam memori untuk output describe, dikongsi pada seluruh
proses. Kunci = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
dengan pembingkaian awalan panjang (tiada perlanggaran sempadan medan).
Komponen model ialah model jambatan yang **dikonfigurasikan**, bukan model yang
sebenarnya memberikan jawapan — `callVisionModel` mungkin menggunakan sandaran
secara dalaman, dan penggunaan kunci bagi setiap percubaan akan memecah-belahkan
cache. Describe yang gagal tidak pernah dicache. Tetapan:

| Kunci                           | Lalai  | Julat   |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### Penormalan imej jauh (describe gelung kendiri/pengambilan base64)

Apabila jambatan mengambil sendiri imej **jauh** — panggilan kendiri describe
Anthropic dan penukaran base64 berformat wayar claude
(`ensureBase64ImagesForClaudeWire`), kedua-duanya melalui
`fetchRemoteImageAsDataUri()` dalam `visionBridgeHelpers.ts` — URI data yang
terhasil disalurkan melalui `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) sebelum dibenamkan dalam permintaan model
penglihatan. Imej yang terlalu besar dikecilkan kepada **sisi panjang 2048px**
(sepadan dengan had saiz semula yang telah digunakan oleh OpenAI/Anthropic
pada sisi pelayan), yang mengurangkan bait/masa pendam muat naik tanpa mengubah
apa yang dilihat oleh model penglihatan. Pengubahan saiz menggunakan `sharp`,
yang dimuatkan melalui import dinamik: pada platform yang binari natifnya gagal
dimuatkan, `normalizeDataUri()` **tidak pernah melemparkan ralat** — ia kembali
kepada penghantaran terus bait asal, supaya laluan describe/penukaran base64
sentiasa terus berfungsi. Bait bukan imej (pengambilan yang tidak mengembalikan
imej yang boleh dinyahkod) turut diteruskan tanpa perubahan. Penormalan ini
dikhususkan kepada imej yang diambil oleh jambatan untuk panggilan kendirinya
sendiri — ia tidak pernah digunakan pada muatan penghantaran terus mentah
pemanggil, selaras dengan prinsip pengubahan hanya melalui pilihan ikut serta
(Peraturan Keras #20).

#### Skema tetapan + migrasi

Kunci `modalityBridge*` baharu disahkan oleh Zod dalam `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*`, dan kumpulan
`modalityBridgeAudio*` yang digunakan oleh Jambatan Audio. Migrasi
`141_modality_bridge_settings.sql` menyalin nilai legasi `visionBridge*` sedia
ada kepada kunci baharu yang sepadan (idempoten, tidak pernah menulis ganti
nilai `modalityBridge*` yang ditetapkan oleh pengendali); kunci legasi kekal
diterima sebagai sandaran bacaan selama satu kitaran keluaran.

#### Pengepala ketelusan + statistik

Respons yang diubah oleh describe membawa
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(dibina oleh `buildModalityBridgeHeader()` dalam
`modalityBridge/bridgeStats.ts`, dicapkan oleh
`withModalityBridgeHeader()` dalam `src/sse/handlers/chatHelpers.ts`).
Permintaan yang dihalakan semula **tidak** menerima pengepala — muatan tidak
diubah dan pertukaran model sudah dapat dilihat dalam medan `model` pada badan
respons.

`GET /api/modality-bridge/stats` (pengesahan pengurusan, peringkat yang sama
seperti `GET /api/settings`) mengembalikan pembilang dalam memori bagi setiap
modaliti `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` untuk `vision`, `audio`, dan
`video`. `averageLatencyMs` menggunakan `latencySamples`, bukannya semua
percubaan, sebagai penyebutnya; operasi tanpa pemasaan tidak mencipta sampel
sifar milisaat secara rekaan. `bridged` kekal sebagai alias serasi ke belakang
untuk penukaran yang berjaya; percubaan yang gagal tidak menambah nilainya.
Pembilang ditetapkan semula apabila proses dimulakan semula mengikut reka bentuk
(telemetri, bukan perakaunan).

#### Konfigurasi papan pemuka

Halaman papan pemuka khusus ialah
`/dashboard/settings/modality-bridge`. Tab `Vision`, `Audio`,
dan `Video` yang boleh dialamatkan melalui URL mengekalkan parameter pertanyaan semasa menukar nilai `tab`.
Tab Vision menyediakan pengaktifan, mod, pemilihan model (termasuk lalai
automatik), penggesaan berasaskan tugasan, had lanjutan untuk tamat masa/imej/panjang perihalan/cache,
pembilang masa jalan,
dan permintaan sampel yang dilindungi. Tab Audio juga aktif: ia menyediakan
pengaktifan, pemilih model khusus STT dengan Auto, had tamat masa/tempoh maksimum klip, pembilang
audio, dan ujian sampel `input_audio`. Tab Video berfungsi: ia melaporkan
keadaan masa jalan FFmpeg/ffprobe — satu daripada empat keadaan UI yang jelas (`unknown` semasa
siasatan sedang berjalan atau tidak dapat diselesaikan, `restricted` pada hos papan pemuka
bukan gelung balik yang menyebabkan siasatan dilangkau pada sisi klien, `unavailable` selepas disiasat
dan disahkan tiada, atau `available` bersama versi FFmpeg/ffprobe) — mengekalkan
had pengaktifan/model/bingkai/video/tamat masa, menapis pemilih model kepada model
yang menyokong penglihatan, dan menyediakan pembilang video.

Kad Vision Bridge terdahulu di bawah tetapan AI ialah pautan keserasian ke
halaman baharu; ia tidak lagi memiliki salinan kedua borang tersebut. Media Providers juga
memautkan aliran kerja Image-to-Text dan Speech-to-Text kepada tab Modality
Bridge yang sepadan tanpa mengalih keluar ruang uji kaji Speech-to-Text sedia ada.

**Pintasan kemasukan gelung kendiri:** apabila panggilan perihalan dihalakan melalui
gelung kendiri `/v1` OmniRoute sendiri (model penyedia bukan standard), subpermintaan menghantar
`x-omniroute-admission-bypass: internal` dan disahkan dengan kelayakan
gelung kendiri yang telah diselesaikan — sentinel `sk_omniroute` setempat dalam mod setempat, atau
kunci persekitaran `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` yang dikonfigurasikan oleh pengendali (#1350), supaya
penggunaan dengan `REQUIRE_API_KEY=true` masih boleh menjalankan panggilan perihalan. Pintasan
hanya diterima untuk kelayakan tepat tersebut, maka klien luaran tidak boleh menggunakan
pengepala itu untuk melangkau kemasukan.

Nilai lalai legasi berada dalam `src/shared/constants/visionBridgeDefaults.ts`;
nilai lalai mod/berasaskan tugasan/cache yang baharu serta penyelesai tetapan berada dalam
`src/shared/constants/modalityBridgeDefaults.ts`. Pengadang menyediakan pilihan pembina
`deps` supaya ujian boleh menyuntik pelaksanaan `getSettings` dan
`callVisionModel` palsu.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Memintas permintaan sembang yang mengandungi audio sebelum permintaan tersebut sampai kepada sasaran yang tidak
diketahui menerima input audio. Ia tidak pernah menghalakan semula permintaan sembang: bahagian audio
ditranskripsikan melalui titik akhir berbilang bahagian serasi OpenAI sedia ada dan
model sembang yang dipilih meneruskan pemprosesan dengan transkrip teks.

Aliran:

1. Selesaikan `supportsAudio` melalui `getResolvedModelCapabilities()`. Metadata
   daftar penyedia yang eksplisit diutamakan, diikuti metadata model statik, kemudian
   `modalities_input` yang disegerakkan. Senarai input yang diisytiharkan tanpa `audio` ialah `false`;
   ketiadaan bukti keupayaan kekal sebagai `null`. Kedua-dua `false` dan `null` mengaktifkan
   jambatan konservatif, manakala `true` memintasnya.
2. Selesaikan tetapan `modalityBridgeAudio*` dan ekstrak bahagian audio peringkat teratas
   yang boleh disambung daripada setiap mesej melalui pengesan `detectMediaParts()`
   yang dikongsi. Bentuk wayar yang disokong ialah `input_audio`, `audio_url` OpenAI, dan
   `source.media_type: "audio/*"`. Audio tersarang dikesan untuk penghalaan tetapi tidak
   dialih keluar oleh laluan penyambungan. Kerja dihadkan oleh `modalityBridgeAudioMaxClips`;
   bahagian selepas had tersebut dibiarkan tanpa perubahan.
3. Patuhi `provider/model` yang dikonfigurasikan, atau biarkan `selectAudioBridgeModel()` menelusuri
   `AUDIO_TRANSCRIPTION_PROVIDERS` mengikut susunan katalog yang stabil dan memilih model pertama
   dengan kelayakan penyedia aktif yang boleh digunakan.
4. `callAudioTranscription()` menukar audio base64/URI data kepada `file`
   berbilang bahagian, atau memuat turun `audio_url` jauh melalui pengadang keluar khusus awam
   dengan penyematan DNS dan had 25 MB. Ia kemudian menghantar fail dan model yang dipilih melalui POST
   ke gelung kendiri `/v1/audio/transcriptions` setempat, yang disahkan dengan
   `resolveSelfLoopBearer()`. Laluan transkripsi sedia ada melakukan carian
   kelayakan biasa, pengendalian tempoh bertenang/had kadar, dan penghantaran kepada penyedia.
5. Panggilan yang berjaya menggantikan bahagiannya dengan `[Audio N]: <transcript>`. Panggilan
   dijalankan dengan `Promise.allSettled`: kegagalan individu mengekalkan bahagian audio
   asal tersebut (kontrak #4012). Jika setiap panggilan gagal dan sasaran terbukti
   `supportsAudio === false`, bahagian tersebut menjadi
   `[Audio N]: (unavailable — no STT provider connected)` (kontrak #8430). Untuk
   sasaran yang tidak diketahui (`null`), hasil kegagalan menyeluruh kekal tanpa perubahan. Sasaran
   teks sahaja yang terbukti tanpa kelayakan STT yang boleh digunakan menerima stub eksplisit
   yang sama tanpa mengeluarkan panggilan rangkaian.

Transkrip yang berjaya menggunakan cache LRU/TTL Modality Bridge seluruh proses. Kunci
menggabungkan rujukan audio, label operasi `audio-transcription` yang stabil,
dan model STT yang dipilih; kegagalan tidak pernah dicache. Percubaan audio mengemas kini
pembilang `bridged`, `cacheHits`, `failures`, dan `lastUsedAt` yang dikongsi.
Respons yang diubah membawa
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; permintaan
yang tidak disentuh tidak menerima segmen Audio Bridge.

Tetapan masa jalan disokong oleh DB dan disahkan oleh Zod:

| Kunci                         | Lalai   | Julat            |
| ----------------------------- | ------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                |
| `modalityBridgeAudioModel`    | `""`    | Auto atau ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10             |

Cache yang dikongsi kekal dikawal oleh `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, dan `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Memintas bahagian video peringkat teratas dalam `messages` Chat Completions dan `input`
API Responses sebelum sasaran tanpa sokongan video natif yang diketahui dipanggil.
Bentuk yang disokong ialah `input_video`, `video_url`, `video_source`, URL HTTPS,
dan URI data `data:video/*;base64,...`. Nama fail biasa dalam teks tidak dianggap
sebagai video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) mengendalikan perayapan permintaan,
semakan keupayaan/dasar, pengagregatan bagi setiap permintaan, dan muatan respons.
Kerja bagi setiap video — pemerolehan, cache hasil penuh, penghuraian jujukan bingkai
(yang menggabungkan sebarang transkrip audio yang diisytiharkan oleh pemanggil), serta
metrik/pembatalan/pembersihan bagi setiap percubaan — disembunyikan di sebalik
`processVideoPart` dalam `videoBridgePipeline.ts`, yang dipanggil sekali bagi setiap
bahagian video dalam gelung `preCall`. Modul itu juga mentakrifkan sempadan port yang
jelas, iaitu `VideoMediaBrokerPort` (memperoleh bait dan mengekstrak bingkai yang
disampel), `VideoAudioTranscriptionPort` (menggabungkan transkrip audio yang
diisytiharkan oleh pemanggil dengan kapsyen yang disampel), dan
`VideoDrilldownPort` (sempadan pengekalan telusur terperinci bingkai; belum
disambungkan kepada `processVideoPart` — hanya laluan berasingan
`/api/modality-bridge/video/drilldown` yang menulis entri telusur terperinci pada
masa ini).

Laluan permintaan awam `/v1` tidak pernah mengimport atau memanggil subproses.
Video jauh dimuat turun di bawah had 50 MiB; video base64 sebaris mempunyai had
konservatif 36 MiB yang dinyahkod bagi setiap video supaya sampul
model/mesej/pembingkaian boleh kekal dalam had kemasukan permintaan JSON awam
sebanyak 50 MiB. Anggaran panjang sebaris dan saiz dinyahkod diperiksa sebelum
peruntukan. HTTPS diperlukan pada URL jauh awal dan setiap ubah hala, menggunakan
pelindung keluar awam sahaja sedia ada dengan penyematan DNS. Bait tersebut
kemudiannya merentasi sempadan broker dalaman tepat
`POST /api/modality-bridge/video/extract`. Laluan itu ialah `LOCAL_ONLY` dan
`SPAWN_CAPABLE`, hanya menerima permintaan gelung balik dipercayai yang disahkan
bagi setiap proses, dan tidak pernah menerima URL, laluan sistem fail, boleh laku,
atau senarai argumen. Saluran paip saiz isi API dan pembaca isi tambahan bagi
pengendali masing-masing menguatkuasakan had input broker 50 MiB secara bebas.
Baris gilir berhadnya menjalankan satu pengekstrakan pada satu-satu masa,
membenarkan empat kerja belum selesai, dan mengehadkan input belum selesai kepada
100 MiB.

Di dalam broker, `ffprobe` membaca fail setempat persendirian; senarai dibenarkan
format tetap mengecualikan format senarai main dan manifes. Bagi bekas keluarga
MOV yang dibenarkan, rujukan data MOV luaran kekal dilumpuhkan secara lalai, dan
perintah tetap tidak memilih untuk mendayakannya. Kedua-dua `ffprobe` dan `ffmpeg`
menggunakan senarai dibenarkan protokol `file` sahaja, satu bebenang, tatasusunan
argumen tetap, tanpa cangkerang, dan boleh laku yang diselesaikan daripada `PATH`.
Strim kulit muka bergambar terlampir bukan calon yang boleh dimainkan. Semua strim
yang boleh dimainkan mesti memenuhi had, dan strim lalai yang jelas diutamakan
sebelum sandaran indeks terendah yang berketentuan. Video dihadkan kepada 600 saat,
8,192 piksel bagi setiap dimensi, dan 33,554,432 piksel sumber. FFmpeg mensampel
1–16 bingkai JPEG titik tengah, mengecilkan skala sisi panjang kepada paling banyak
1,024 piksel tanpa membesarkan input yang lebih kecil, dan tidak pernah menerima
URL. Pensampelan ialah `uniform` secara lalai. Dasar pilihan `scene_aware` dan
`segment_aware` yang bersifat eksperimen melakukan satu laluan FFmpeg tetap tambahan
ke atas strim setempat yang telah disahkan, memilih cap masa adegan `showinfo`
berhad, dan kembali secara berketentuan kepada titik tengah seragam yang sama jika
pengesan gagal, tamat masa, menghasilkan output cacat, atau set calon kosong. Mod
peka segmen memperuntukkan sampel titik tengah secara berkadar kepada selang adegan
yang telah disahkan; bukti peka segmen dan tingkah laku sandaran diperincikan di
bawah. Had keras 16 bingkai digunakan selepas pemilihan dalam setiap dasar. Apabila
permintaan peka adegan hanya mempunyai belanjawan satu bingkai, ia menggunakan titik
tengah seragam bagi video penuh aktif atau tetingkap fokus dan melaporkan
`policyEffective: uniform`: satu bingkai adegan yang dipilih tidak dapat mengekalkan
kedua-dua hujung masa. Pemanggil boleh memberikan tetingkap fokus terhingga
(`start`/`end` saat) secara pilihan; sempadan diapit kepada tempoh media, tetingkap
terbalik atau tidak terhingga ditolak, dan semua dasar pensampelan dilakukan hanya
dalam selang yang telah dinormalkan. Tetingkap yang terhasil disertakan dalam
metadata pensampelan dan dalam awalan penerangan tidak dipercayai supaya model hiliran
dapat membezakan petikan berfokus daripada garis masa penuh.

Fokus kapsyen semantik ialah tetapan berasingan yang dinyatakan secara jelas. Mod
analisis `full` lalai mengekalkan gesaan bingkai sedia ada dan tidak pernah
memajukan teks permintaan kepada model kapsyen. Dalam mod `focused`, jambatan hanya
membaca `text`/`input_text` karangan pengguna terkini yang tidak kosong daripada
bekas Chat atau Responses yang sama, menormalkannya kepada NFC, merapatkan aksara
kawalan dan ruang putih, serta mengehadkannya kepada 500 titik kod Unicode. Hasil
kosong kembali kepada gesaan `full` yang tepat. Petunjuk yang boleh digunakan
disirikan sebagai JSON dalam blok konteks pengguna tidak dipercayai khusus dan hanya
boleh mengutamakan butiran yang boleh diperhatikan; ia tidak boleh mengatasi amaran
berasingan supaya tidak mengikuti arahan yang kelihatan atau kedengaran dalam media.
Fokus tekstual tidak pernah menyimpulkan `start`/`end` atau mengubah pensampel masa.

#### Bukti segmen struktur FU-07

`segment_aware` menggunakan satu laluan praanalisis berhad ke atas strim video
setempat yang telah disahkan. Rantaian penapis tetap mula-mula mengecilkan skala
kepada paling banyak 320 piksel lebar, mengesan perubahan adegan dan selang beku,
kemudian mensampel pada kadar 1 bingkai sesaat untuk kekaburan, luma purata, serta
maklumat ruang/masa. Laluan itu dihadkan kepada 600 sampel struktur, satu bebenang
FFmpeg/penapis, protokol `file` sahaja dan senarai dibenarkan bekas yang sama, had
output proses 1 MiB, serta paling banyak 30 saat dalam pembatalan/tarikh akhir
dikongsi broker. Ia tidak pernah menerima perintah, penapis, laluan, atau URL
daripada permintaan.

Nilai struktur ialah bukti pensampelan deterministik, bukannya pemahaman semantik
video. Nilai tersebut tidak membuat inferens tentang subjek, tindakan, sari kata, pertuturan atau niat
pengguna. Sempadan babak dan pegun membentuk segmen; liputan pegun, kekaburan,
pendedahan, perincian ruang dan perubahan temporal hanya mempengaruhi cara bajet
1–16 bingkai sedia ada diperuntukkan. Segmen yang pegun sepenuhnya dihadkan kepada satu bingkai,
manakala segmen tidak pegun bersaing untuk baki bajet. Apabila bilangan sempadan
melebihi bilangan bingkai, liputan garis masa yang seragam dikekalkan supaya potongan pantas pada bahagian awal
tidak dapat menyembunyikan segmen panjang di bahagian akhir. Sempadan babak dalam resolusi analisis
1 saat daripada sempadan pegun digabungkan.

Penapis yang tiada, bukti yang cacat/kosong, ralat pengesan atau tamat masa
praanalisis terhad akan kembali kepada dasar titik tengah seragam yang tepat. Pembatalan oleh pemanggil
atau tarikh akhir broker tidak akan kembali kepada dasar tersebut: ia menamatkan subproses
yang sedang berjalan, menghalang pengekstrakan bingkai selanjutnya dan pepohon sementara peribadi
dihapuskan dalam `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` menjana lekapan FFmpeg sebenar yang deterministik
untuk penjimatan panggilan sari kata selepas penyahduplikasian, peruntukan bajet gerakan padat,
bukti kekaburan/pendedahan/SI-TI, potongan pantas dengan bahagian akhir yang panjang dan
positif palsu bagi pudar beransur-ansur. Ia merekodkan masa sebenar pra-analisis dan, apabila `/usr/bin/time`
tersedia, CPU proses anak serta RSS puncak. Semakan kualitinya hanyalah peramal struktur.
Kualiti model sari kata sebenar kekal `HOLD` kerana abah ini tidak mempunyai
titik akhir yang dibenarkan atau penilai yang dibekukan. Penjimatan kewangan juga kekal `HOLD`
melainkan `--caption-cost-per-call-usd` membekalkan anggaran positif yang jelas bagi setiap panggilan;
skrip tersebut tidak pernah mereka-reka mana-mana hasil.

Setiap bingkai dihadkan kepada 4 MiB, semua bingkai mentah secara keseluruhan kepada 23 MiB dan
respons broker bersiri kepada 32 MiB. Direktori sementara peribadi dihapuskan
dalam `finally`. OmniRoute tidak menyertakan FFmpeg dan tidak menerima laluan
boleh laku tersuai. Sebelum menghasilkan sari kata, jambatan tersebut menggunakan laluan
penyahduplikasian visual yang konservatif: setiap JPEG dikecilkan kepada penimbal skala kelabu 16×16 dan
dibandingkan hanya dengan bingkai terakhir yang dikekalkan. Bagi bajet sari kata yang diminta
melebihi satu bingkai, pengekstrakan menyediakan
kumpulan calon terhad sehingga dua kali ganda bajet tersebut dan tidak pernah melebihi 16 bingkai.
Had yang diminta hanya digunakan selepas penyahduplikasian, dengan calon pertama dan terakhir
yang dipilih dikekalkan semasa penipisan akhir apabila bajet sekurang-kurangnya
dua. Dasar berversi
`grayscale-16x16-mean-cells-v2` menggunakan nilai yang lebih besar antara delta luminans purata dan
nisbah sel imej kecil yang delta ternormanya sekurang-kurangnya 0.05.
Ambang pendua ialah pemalar 0.04, dipilih demi kebolehramalan dan bukannya
didedahkan sebagai tetapan masa jalan. Isyarat sekunder
berkontras tinggi ini mengekalkan gerakan kecil dan perubahan teks yang kelihatan yang mungkin
disembunyikan oleh perbandingan berdasarkan purata sahaja. Ralat pembanding atau penyahkod akan gagal secara terbuka dan mengekalkan
liputan. Metadata output memisahkan calon yang diekstrak, bingkai yang berjaya digunakan
dan pendua visual yang digugurkan.

Bahagian video yang ditandakan secara eksplisit boleh meminta helaian kenalan bercap masa. Jambatan
membina grid JPEG dengan maksimum 4 lajur dan 16 bingkai. Setiap sel 512 piksel menerapkan
cap masa sumbernya pada jalur bawah berkontras tinggi, manakala cap masa yang sama
dikekalkan dalam metadata teks untuk perkaitan dan audit hiliran. JPEG lengkap
kekal dihadkan kepada 32 MiB. Jika `sharp` tidak dapat menyahkod atau menggubah grid,
jambatan akan kembali kepada bingkai JPEG individu; pembatalan klien masih disebarkan
melalui operasi helaian tersebut.

Bukti promosi sengaja diasingkan daripada penanda aras mikro komposisi
sintetik. `scripts/perf/video-bridge-contact-sheet-eval.ts` mentakrifkan abah A/B
berversi skema untuk model penglihatan sebenar yang serasi dengan OpenAI. Ia mengukur
token yang dilaporkan penyedia, kependaman hujung ke hujung berdasarkan masa sebenar (termasuk penggubahan helaian),
bilangan panggilan model dan pengekalan fakta yang ditakrifkan oleh manifes. Respons model mentah tidak
ditulis ke dalam laporan; hanya ringkasan SHA-256 dan ID fakta yang sepadan dikekalkan. Abah tersebut
tidak membuat sebarang panggilan rangkaian atau model berbayar melainkan `--execute-real` diberikan dan
`--model`, `OMNIROUTE_BASE_URL` serta `OMNIROUTE_API_KEY` dikonfigurasikan. Tanpa
pelaksanaan sebenar yang eksplisit itu, keputusan boleh baca mesinnya kekal `HOLD`; pengukuran
muatan/bilangan panggilan sintetik sahaja bukanlah bukti promosi.

Pemanggil boleh melampirkan tatasusunan `transcript.cues` pilihan pada bahagian video
yang disokong apabila mereka sudah mempunyai teks yang dijajarkan. Setiap kiu mesti mengandungi `text`,
selang `start`/`end` terhingga dalam tempoh yang disiasat dan `source` yang
disenarai putihkan (`client`, `embedded` atau `audio-bridge`); `confidence` secara lalai ialah
`1` dan mesti kekal antara `0` hingga `1`. Kiu pendua yang seiras digabungkan.
OmniRoute tidak pernah memulakan transkripsi daripada metadata ini: kiu yang disahkan
disalin ke dalam hasil yang dihuraikan bersama sumber, keyakinan dan selang, serta
dipaparkan sebagai pemerhatian tidak dipercayai di samping sari kata bingkai. Teks yang tidak sah,
di luar julat atau tanpa asal-usul ditolak dan bukannya dicampurkan ke dalam
aliran sari kata. Medan `source` pada masa ini diisytiharkan oleh pemanggil, bukan
disahkan oleh pelayan: OmniRoute menguatkuasakan bahawa nilainya ialah salah satu daripada tiga
rentetan yang dibenarkan, tetapi belum mengesahkan secara kriptografi bahawa label
`embedded` atau `audio-bridge` benar-benar datang daripada pengekstrakan milik
pelayan. Anggap `source` sebagai petunjuk tidak dipercayai sehingga pengesahan tersebut
dilaksanakan; jangan bina keputusan kebenaran akses berdasarkan medan tersebut.

Pemanggil lanjutan boleh menyediakan runut `audioTranscript` yang telah pun diberi kebenaran
untuk video yang sama. Titik penyatuan menjalankan pemerhatian visual dan audio di bawah
satu tarikh akhir dan isyarat pembatalan, menyusunnya pada garis masa yang sama, menggabungkan
pendua tepat, dan melaporkan hasil separa apabila hanya satu bahagian berjaya.
`audioTranscript` yang tidak sah akan diturunkan taraf kepada hasil separa tersebut — perihalan
visual dikekalkan dan cabang audio merekodkan kod kegagalan yang telah disanitasi —
dan bukannya menggagalkan keseluruhan video. Ketersediaan setiap cabang, penanda separa,
dan kod kegagalan yang telah disanitasi dikekalkan dalam hasil yang dihuraikan, dalam
metadata pagar keselamatan (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), dalam metadata cache hasil, dan dalam pembilang
penyatuan jambatan. Laluan Video Bridge lalai tidak menggunakan pertuturan-ke-teks
atau memuat turun salinan media kedua; tanpa runut eksplisit tersebut, ia kekal
sebagai video sahaja.

**Pengekalan transkrip (#12150 P1).** Ini digunakan secara automatik apabila
Video Bridge (yang penggunaannya sendiri memerlukan persetujuan) memaparkan kiu transkrip — tiada
penanda pengekalan yang berasingan. Apabila permintaan memaparkan sebarang kiu transkrip (`transcript`
yang diisytiharkan pemanggil atau `audioTranscript` yang digabungkan), pagar keselamatan menandakannya sebagai
`videoBridgeObserved` dan menghasilkan salinan bayang yang telah disunting bagi perihalan video —
paparan yang sama, dengan badan teks bebas setiap kiu digantikan oleh
`[redacted-video-transcript]`, yang dibina dengan menggantikan medan kiu berstruktur
sebelum rentetan dihimpunkan (dan bukannya dengan menghuraikan teks yang telah diratakan, supaya tiada
kandungan kiu — sama ada berniat jahat atau biasa, termasuk badan yang mengandungi `]` seperti
`[inaudible]`/`[music]` — boleh kekal). Badan permintaan log panggilan yang disimpan
menggantikan setiap bahagian teks yang diterbitkan daripada video dengan salinan bayang yang telah disunting itu, yang dipadankan
berdasarkan kesamaan kandungan; penambat `fullText` dibaca semula daripada muatan pagar keselamatan
prapanggilan yang telah selesai, supaya padanan masih berjaya selepas pagar keselamatan berantai berikutnya
(penyamar PII dan kelayakan, keutamaan 10/95) menulis semula teks perihalan secara langsung dan
selepas penyuntikan gesaan sistem/serah tugas/memori membentuk semula tatasusunan mesej. Badan
yang dihantar ke huluan kepada model tidak berubah. Permintaan yang diperhatikan juga tidak mengisi
sebarang Memory tahan lama (pengekstrakan yang diterbitkan daripada permintaan dan respons dilangkau),
maka balasan model itu sendiri tidak boleh menggema teks transkrip ke dalam Memory.

Permukaan pengekalan yang masih terbuka, dijejaki untuk tindakan susulan (**P2**, #12430): petikan mentah
permintaan klien sebelum pagar keselamatan dalam artifak log terperinci;
sambungan `previous_response_id` yang gagal secara tertutup; penghantaran dalaman
gesaan terbitan yang membenamkan transkrip di dalam gesaan rentetan tersintesis
(peringkat saluran paip, serah tugas konteks); dan badan respons / salinan cache semantik
bagi balasan model yang memetik transkrip. Ini ialah permukaan kelas mentah/respons atau
permukaan yang memerlukan persetujuan, di luar skop badan permintaan tersimpan + Memory bagi P1.

Kitar hayat dalaman `/api/modality-bridge/video/drilldown` ialah substrat cache berasingan
yang disahkan melalui gelung balik/token. Setiap operasi turut memerlukan
ID prinsipal legap kanonik. Sebelum pemanggil pengeluaran didayakan, pemanggil itu mesti
menerbitkan ID tersebut daripada penyewa yang disahkan dan tidak boleh sama sekali memajukan nilai
yang dipilih oleh klien. Kekunci cache mengikat prinsipal tersebut kepada ID sesi dan
rujukan video kanonik, menyimpan hanya kekuncinya yang diterbitkan daripada SHA-256, dan mengehadkan
bacaan serta pemadaman kepada prinsipal yang sama. Cache menyimpan paling banyak 16 bingkai JPEG
terbitan bagi setiap entri, menamatkan tempohnya selepas sepuluh minit, dan menyokong bacaan
`start`/`end` yang dibataskan atau pemadaman sesi secara eksplisit.

Setiap prinsipal dihadkan kepada 16 entri dan 64 MiB data JPEG kanonik. Had tersebut
adalah bebas daripada had global sebanyak 64 entri/256 MiB: tekanan kuota prinsipal
hanya menyingkirkan entri prinsipal tersebut yang paling lama tidak digunakan sebelum
penyingkiran LRU global dipertimbangkan. Entri yang telah tamat tempoh disingkirkan daripada
perakaunan prinsipal dan global semasa aktiviti cache, manakala pembatalan dan kegagalan pengesahan
tidak menerapkan penggantian separa.

Cache menolak Base64 bukan kanonik, pelapik berlebihan, media bukan JPEG, JPEG yang rosak atau
terpenggal, dan JPEG yang menghasilkan amaran semasa penyahkodan imej penuh `sharp`
yang dibataskan. Ia mengekod semula setiap imej yang diterima sebagai JPEG kanonik, menerbitkan lebar dan tinggi
daripada bait yang dinyahkod dan bukannya mempercayai medan pemanggil, serta membuang sebarang bait
poliglot di belakang dan bukannya mengekalkannya. Hanya penimbal termampat kanonik yang dibataskan
diambil kira bagi kedua-dua kuota. Had pendawaian JSON merangkumi overhed Base64 untuk siling
input dinyahkod 32 MiB. Setiap
terbitan yang disimpan merekodkan format/resolusi JPEG yang disahkan, dasar pensampelan,
versi terbitan, masa penciptaan, cincangan kandungan yang dikira pelayan, dan rujukan induk
tercincang berserta cincangan kandungan induk milik pemanggil yang dipercayai. Pembatalan diperiksa
antara fasa penyahkodan/cincangan tak segerak sebelum penerapan cache atom.

Tranche ini belum menghubungkan pengeluar produksi kepada laluan tersebut dan tidak
menyediakan pemilihan varian berbilang resolusi. Oleh itu, laluan permintaan Video Bridge yang telus
tidak mengenakan kerja tambahan, manakala penerbitan prinsipal terikat penyewa dan
kitar hayat berbilang resolusi penuh FU-08 kekal sebagai kerja susulan eksplisit dan bukannya
didokumentasikan sebagai tingkah laku yang lengkap.

Bingkai diberi kapsyen secara berurutan menggunakan model Video yang dikonfigurasikan. Penggantian
Video yang kosong mewarisi tetapan Vision; jika kedua-duanya kosong, penghala automatik
Vision memilih model berkeupayaan penglihatan yang berkesan. Kapsyen yang berjaya
menggantikan bahagian asal dengan awalan `[Video description:` yang stabil, yang turut
menandai teks sebagai pemerhatian tidak dipercayai yang diperoleh daripada media dan memberitahu
model hiliran supaya tidak mengikuti arahan yang ditemukan dalam media. Kunci cache kapsyen bingkai
merangkumi bait JPEG, gesaan, cap masa dan model berkesan; hanya kapsyen yang
berjaya dicache. Entri cache mengekalkan model pengeluar sebenar yang berjaya,
termasuk model sandaran; jambatan melaporkan `mixed` apabila bingkai yang berbeza
dihasilkan oleh model yang berbeza. Padanan cache menggunakan semula identiti pengeluar tersebut
dan bukannya melabelkannya semula sebagai pelan penghalaan yang diminta. Cache hasil seluruh video
dikuncikan berdasarkan setiap input yang mengubah output — gesaan, model
berkesan, dasar pensampelan, bilangan bingkai, mod analisis semantik, cap jari SHA-256
bagi petunjuk fokus yang dinormalkan, tetingkap fokus, `transcript`,
`audioTranscript` dan bendera helaian kenalan — maka perubahan pada mana-mana
dimensi tersebut menyebabkan cache tidak sepadan dan tidak sekali-kali menggunakan semula hasil lapuk. Versi,
ambang dan bilangan bingkai calon terbatas bagi dasar penyahduplikasian visual turut dinyatakan secara eksplisit dalam
kunci dan metadata cache hasil; oleh itu, perubahan dasar tidak boleh menggunakan semula
perihalan seluruh video yang lapuk. Metadata cache hasil v4 mengekalkan mod dan
cap jari, bukan sekali-kali tugas mentah pengguna. Metadata pagar keselamatan melaporkan kedua-dua
mod analisis yang diminta dan yang berkesan; mod `focused` yang diminta tanpa
teks pengguna yang boleh digunakan dilaporkan sebagai `full` secara berkesan.

Pagar keselamatan mengekstrak setiap bahagian video yang disokong tetapi tidak menerangkan lebih daripada
`modalityBridgeVideoMaxVideos`. Bagi sasaran yang terbukti mempunyai
`supportsVideo === false`, video yang gagal dan melebihi had menjadi penanda teks
selamat yang eksplisit supaya tiada video mentah kekal. Apabila keupayaan tidak diketahui, bahagian tersebut
dibiarkan tanpa perubahan. Sasaran dengan `supportsVideo === true` memintas jambatan.
Isyarat pembatalan permintaan klien dirambatkan melalui muat turun, baris gilir broker,
subproses dan panggilan kapsyen; pembatalan menghentikan pemprosesan antara video dan tidak sekali-kali membiarkan
media mentah diteruskan apabila berlaku kegagalan.

Tetapan masa jalan disandarkan oleh DB dan disahkan oleh Zod:

| Kunci                               | Lalai       | Julat / tingkah laku                                                                                                  |
| ----------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Masa jalan pilihan, ikut serta                                                                                        |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` mengekalkan kapsyen generik; `focused` menggunakan konteks pengguna terkini yang terbatas dan tidak dipercayai |
| `modalityBridgeVideoModel`          | `""`        | Mewarisi model Vision Bridge                                                                                          |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, atau `segment_aware` berkadar; kegagalan pengesan kembali kepada `uniform`                  |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                        |

Nilai tamat masa Video legasi yang disimpan dan melebihi 120 saat dihadkan kepada
tarikh akhir broker; penulisan tetapan baharu yang melebihi had tersebut ditolak.
`GET /api/modality-bridge/video/runtime` memerlukan kelokalan gelung balik bercap yang dipercayai
sebelum pengesahan atau pemeriksaan masa jalan, kemudian memerlukan pengesahan
pengurusan. Ia hanya mengembalikan `available`, versi FFmpeg/ffprobe yang disanitasi dan sebab
tetap apabila masa jalan tidak tersedia. Titik akhir pengekstrakan dalaman bukan
API muat naik awam: ketepuan baris gilir mengembalikan `503` bersama `Retry-After`, pemutusan
sambungan oleh pemanggil mengembalikan `499`, dan tarikh akhir tetap broker mengembalikan `504`. Respons yang ditukar menambahkan
`video->text;model=<visionModel>;parts=<videos>` pada pengepala pusat
`x-omniroute-modality-bridge` tanpa mengalih keluar segmen Vision atau Audio.

### Penopeng PII (`piiMasker.ts`)

Berjalan pada **kedua-dua** peringkat.

- **`preCall`** mengklon muatan, menelusuri `system`, `messages`, `input` dan
  `prompt` (termasuk item rentetan biasa), serta menggunakan `processPII()` (daripada
  `@/shared/utils/inputSanitizer`) pada medan rentetan `content`/`text`. Apabila
  `PII_REDACTION_ENABLED=true`, PII yang dikesan disunting dalam muatan
  keluar. Ini tidak bergantung pada `INPUT_SANITIZER_MODE` (yang hanya mengawal
  dasar suntikan gesaan). Apabila penyuntingan dimatikan, panggilan merekodkan kiraan
  pengesanan tanpa menulis semula kandungan.
- **`postCall`** melakukan klon mendalam terhadap respons, menjalankan `sanitizePIIResponse()` serta
  penopeng bentuk Responses API (`maskResponsesOutput` — merangkumi
  `output_text` dan `output[].content[].text`). Jika sebarang penyuntingan berlaku,
  respons yang diubah suai menggantikan respons asal.

Pagar keselamatan tidak sekali-kali menyekat; ia hanya menganotasi (`meta.detections`,
`meta.redacted`) atau menulis semula.

### Suntikan Gesaan (`promptInjection.ts`)

Mengesan struktur adversarial dalam kandungan yang dibekalkan pengguna dan menguatkuasakan
dasar yang dikonfigurasikan. Tingkah laku ditentukan oleh pemboleh ubah persekitaran dan pilihan
pembina:

| Tetapan        | Pemboleh ubah persekitaran                                                                             | Lalai  | Kesan                                                                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Didayakan      | `INPUT_SANITIZER_ENABLED`                                                                              | `true` | Apabila `false`, pengadang memintas proses selanjutnya.                                                                                                                                                      |
| Mod            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                        | `warn` | Dasar suntikan: `block`, `warn`, atau `log`. (`redact` diterima untuk keserasian ke belakang tetapi **tidak** membuang teks suntikan; penulisan semula PII permintaan dikawal oleh `PII_REDACTION_ENABLED`.) |
| Ambang sekatan | Pilihan `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Tahap keterukan minimum yang diperlukan untuk menyekat. Tahap sederhana hanya dipantau secara lalai.                                                                                                         |

**Keutamaan mod** (`getMode`): `options.mode` pemanggil →
penggantian **bendera ciri DB** `INJECTION_GUARD_MODE` (Papan Pemuka → Tetapan →
Bendera Ciri) → persekitaran `INJECTION_GUARD_MODE` → persekitaran `INPUT_SANITIZER_MODE` →
`warn`. Oleh itu, penggantian papan pemuka mengatasi pemboleh ubah persekitaran, maka UI Bendera
Ciri mengawal pengadang yang sedang berjalan secara langsung (tanpa mula semula). Pembacaan DB adalah selamat ketika gagal:
jika berlaku ralat, pengadang kembali kepada tingkah laku berasaskan persekitaran dan apabila tiada
penggantian ditetapkan, tingkah lakunya adalah sama seperti resolusi persekitaran sahaja.

Sumber pengesanan:

1. `sanitizeRequest()` daripada `@/shared/utils/inputSanitizer` (set pengesan dikongsi
   yang digunakan di bahagian lain dalam saluran pemprosesan).
2. `DEFAULT_GUARD_PATTERNS` terbina dalam (kini `system_override_inline` dan
   `markdown_system_block`, kedua-duanya dengan tahap keterukan `high`).
3. `customPatterns` pilihan yang dihantar melalui pilihan pembina (rentetan, regex,
   atau rekod `{ name, pattern, severity }`).

Apabila `mode === "block"` **dan** sekurang-kurangnya satu pengesanan memenuhi ambang
keterukan, `preCall` mengembalikan `{ block: true, message: "Request rejected:
suspicious content detected" }`. Dalam mod `warn`/`log`, pengadang merekodkan peristiwa tetapi
membenarkan panggilan. Pembantu dikongsi `evaluatePromptInjection()` turut dieksport
untuk pemanggil yang perlu menilai gesaan tanpa melalui registri.

**Had imbasan (v3.8.20):** pengesan hanya memeriksa **16 KB pertama** bagi
teks gesaan yang digabungkan — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bait) dalam
`src/shared/utils/inputSanitizer.ts`. Kedua-dua `detectInjection()` dan
`evaluatePromptInjection()` menggunakan `slice(0, MAX_INJECTION_SCAN_BYTES)` sebelum menjalankan
gelung pola. Arahan suntikan berada berhampiran bahagian atas input, maka ini
mengehadkan penggunaan CPU/GC regex pada muatan beratus-ratus KB tanpa melemahkan pengesanan (rujuk
#3932, #4041).

### Penyamar Kelayakan (`credentialMasker.ts`)

Berjalan pada **kedua-dua** peringkat, terakhir dalam rantaian lalai (keutamaan `95`). Menyunting
pola kunci API / token rahsia yang diketahui umum daripada muatan keluar (kandungan
mesej, argumen panggilan alat, hasil alat) **dan** respons penyedia, supaya
kelayakan yang ditampal ke dalam gesaan (atau digemakan semula oleh hasil alat) tidak dibocorkan
kepada penyedia huluan atau kembali kepada klien.

- **Ikut serta sahaja**, konvensyen yang sama seperti penyuntingan PII (bersebelahan Peraturan Tegas #20):
  dilumpuhkan melainkan `settings.credentialRedactionEnabled === true` **atau**
  `CREDENTIAL_REDACTION_ENABLED=true`. Apabila dimatikan, pengadang tidak melakukan apa-apa —
  ia tidak pernah menyekat dan tidak pernah menulis semula.
- `redactCredentials()` menyusuri keseluruhan pepohon muatan/respons (`walkValue()`,
  selamat daripada pencemaran prototaip, selamat daripada kitaran melalui `WeakSet`) dan menggantikan padanan dengan
  ruang letak `[REDACTED:<type>]`, dengan mengklon hanya cabang yang benar-benar
  berubah.
- `CREDENTIAL_PATTERNS` merangkumi kunci penyedia LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), kunci pembayaran (Stripe, Square), kunci
  awan (kunci akses AWS, Twilio, SendGrid, Mailgun), kunci peribadi / JWT,
  rentetan sambungan yang mengandungi kelayakan (`mongodb://user:pass@...`, dan sebagainya), serta
  pola nilai pengepala generik `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Kunci berbentuk pengepala (`authorization`, `x-api-key`, `api-key`,
  `apikey`) disunting secara berstruktur (nilai sahaja, awalan skema seperti
  `Bearer `/`Basic ` dikekalkan) dan bukannya melalui regex teks generik.
- Pengadang tidak pernah menyekat; ia hanya menulis semula (`modifiedPayload` /
  `modifiedResponse`) dan menganotasi (`meta.credentialsRedacted`, `meta.count`).

Pengadang regresi: `tests/unit/credential-masker-guardrail.test.ts`.

## Kontrak Asas (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true memintas rantaian
  message?: string; // dipaparkan apabila disekat
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // dikembalikan oleh preCall untuk menulis semula permintaan
  modifiedResponse?: TValue; // dikembalikan oleh postCall untuk menulis semula respons
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Sesuatu pagar pengadang menandakan "tiada perubahan" dengan mengembalikan sama ada `void`, `{}`, atau
`{ block: false }`. Pengembalian `modifiedPayload`/`modifiedResponse` menggantikan
nilai yang mengalir melalui rantaian untuk pagar pengadang seterusnya.
`signal?: AbortSignal` membawa kitaran hayat pemanggil ke dalam pagar pengadang. Pembatalan permintaan ialah pengecualian gagal-terbuka yang disengajakan: jambatan media menghentikan kerja dan melakukan pembersihan tanpa memulihkan media mentah kepada sasaran yang diketahui tidak menyokongnya.

## Daftar (`registry.ts`)

`guardrailRegistry` tunggal menyediakan:

- `register(guardrail)` — menambahkan pagar pengadang (atau menggantikannya berdasarkan nama yang dinormalkan) dan
  mengisih semula mengikut `priority` secara menaik.
- `clear()` / `list()` — pembantu pentadbiran.
- `runPreCallHooks(payload, context)` — mengulangi pagar pengadang yang aktif, mengalirkan
  muatan melalui `modifiedPayload`, dan berhenti pada `block: true` yang pertama.
- `runPostCallHooks(response, context)` — aliran yang sama pada bahagian respons.
- `resetGuardrailsForTests({ registerDefaults })` — mengosongkan keadaan dan secara pilihan
  mendaftarkan semula nilai lalai untuk pengasingan ujian yang bersih.

Kedua-dua pelaksana mengembalikan `{ blocked, payload|response, results, guardrail?, message? }`
dengan `results` merupakan tatasusunan rekod `GuardrailExecutionResult` yang merangkumi
medan `blocked`, `skipped`, `modified`, `error`, dan `meta` bagi setiap pagar pengadang,
yang berguna untuk penjejakan.

### Menyahdayakan Pagar Pengadang bagi Setiap Permintaan

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` mengagregatkan senarai
nama pagar pengadang tanpa pendua yang perlu dilangkau untuk permintaan semasa.
Sumber (semuanya pilihan, semuanya digabungkan):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` dalam badan permintaan (peringkat teratas)
- `metadata.disabledGuardrails` dalam badan permintaan
- Pengepala `x-omniroute-disabled-guardrails` (atau versi legasi
  `x-disabled-guardrails`)

Nilai boleh berupa tatasusunan rentetan atau rentetan yang dipisahkan dengan koma; nama
dinormalkan kepada kebab-case huruf kecil (`pii_masker` → `pii-masker`). Hasilnya
diteruskan melalui `context.disabledGuardrails` kepada daftar, yang melangkau
pagar pengadang yang sepadan (`skipped: true` dalam `results`).

## Urutan Pelaksanaan

Bagi setiap permintaan yang melalui `src/sse/handlers/chat.ts` dan
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` membina senarai langkau berdasarkan kunci API, isi permintaan,
   dan pengepala.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` menjalankan pagar keselamatan mengikut turutan
   keutamaan menaik:
   - Pagar keselamatan yang dinyahdayakan direkodkan sebagai `skipped`.
   - `preCall` bagi setiap pagar keselamatan boleh menulis semula muatan melalui `modifiedPayload`.
   - `block: true` yang pertama akan menghentikan rantaian serta-merta dan pengendali mengembalikan
     respons penolakan pagar keselamatan.
3. Muatan yang mungkin telah ditulis semula diteruskan kepada penghalaan gabungan dan
   penghantaran ke huluan.
4. Selepas respons dibentuk, `guardrailRegistry.runPostCallHooks(...)`
   menjalankan rantaian yang sama pada respons tersebut. `block: true` di sini menggugurkan respons
   huluan.

Pagar keselamatan yang mencetuskan pengecualian direkodkan dengan `error: <message>` dan dilog melalui
`logger.warn`, tetapi rantaian diteruskan — direka bentuk untuk kekal terbuka sekiranya berlaku kegagalan.

## Konfigurasi

Pemboleh ubah persekitaran yang dibaca oleh pagar keselamatan terbina dalam:

| Pemboleh ubah                         | Digunakan oleh         | Kesan                                                                                                    |
| ------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`     | Tetapkan kepada `false` untuk menyahdayakan pengesanan sepenuhnya.                                       |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`     | Dasar suntikan: `warn`, `block`, atau `log`. Nilai legasi `redact` tidak menulis semula teks suntikan.   |
| `INJECTION_GUARD_MODE`                | `prompt-injection`     | Mod untuk pagar suntikan; juga bendera ciri DB yang **mengatasi** pemboleh ubah persekitaran (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`     | Tahap keterukan minimum yang ditolak oleh `MODE=block`: `high` (lalai), `medium`, atau `low`.            |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`     | Alias legasi untuk `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                    |
| `PII_REDACTION_ENABLED`               | `pii-masker`           | Apabila `true`, PII permintaan disunting (tidak bergantung pada mod suntikan).                           |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (hiliran) | Mengawal tingkah laku penyamar pada bahagian respons.                                                    |

Pagar keselamatan Modality Bridge membaca konfigurasi masa jalan daripada stor tetapan
bersandarkan DB (`getSettings()`), bukan pemboleh ubah persekitaran. Kunci utama Vision ialah
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, dan
`modalityBridgeCacheMaxEntries`. Kunci legasi
`visionBridge*` hanya diterima sebagai sandaran bacaan satu kitaran yang didokumenkan;
penulisan papan pemuka menggunakan kunci utama. Nilai lalai dan penyelesai sandaran
berada dalam `src/shared/constants/modalityBridgeDefaults.ts`, manakala pemalar legasi
dikekalkan dalam `src/shared/constants/visionBridgeDefaults.ts`.

Audio menggunakan `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, dan `modalityBridgeAudioMaxClips`, berserta tetapan
`modalityBridgeCache*` yang dikongsi. Audio tidak mempunyai sandaran kunci legasi kerana
kunci ini diperkenalkan bersama skema Modality Bridge.

Video menggunakan `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, dan
`modalityBridgeVideoTimeout`, berserta tetapan `modalityBridgeCache*` yang dikongsi.
Ia dinyahdayakan secara lalai kerana FFmpeg/ffprobe ialah kebergantungan operasi
pilihan, manakala penjanaan kapsyen bingkai menambah kependaman dan kos model.

## Pengadang Tersuai

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Langkah-langkah:

1. Cipta `src/lib/guardrails/myGuardrail.ts` yang melanjutkan `BaseGuardrail`.
2. Laksanakan `preCall` dan/atau `postCall`.
3. Sama ada daftarkan semasa pengimportan (tolak daripada `registerDefaultGuardrails`) atau
   panggil `guardrailRegistry.register(...)` pada masa jalan — daftar tersebut menggantikan
   mana-mana pengadang terdahulu dengan nama ternormal yang sama.
4. Tambahkan ujian di bawah `tests/unit/` (contoh sedia ada:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Pengujian

Gunakan `resetGuardrailsForTests()` antara ujian untuk bermula daripada keadaan yang diketahui.
Hantarkan `{ registerDefaults: false }` untuk bermula dengan daftar kosong dan
daftarkan hanya pengadang yang sedang diuji. Vision Bridge menerima suntikan kebergantungan
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge menyediakan titik sambungan yang
setara untuk tetapan, keupayaan, pemilihan model STT, semakan kelayakan dan transkripsi.
Oleh itu, ujian boleh menguji kedua-dua aliran tanpa akses DB atau rangkaian.

## Lihat Juga

- `src/lib/guardrails/` — pelaksanaan
- `src/shared/utils/inputSanitizer.ts` — pengesan dikongsi yang menguasakan
  suntikan gesaan dan penyamaran PII
- `src/shared/constants/visionBridgeDefaults.ts` — lalai Vision Bridge dan
  senarai model jambatan paksa
- `src/shared/constants/modalityBridgeDefaults.ts` — lalai masa jalan Vision/Audio yang dikongsi
- `docs/architecture/RESILIENCE_GUIDE.md` — lapisan ortogon (pemutus litar, tempoh bertenang)
- `docs/reference/ENVIRONMENT.md` — rujukan lengkap pemboleh ubah persekitaran

## Liputan laluan pengadang suntikan & pasukan merah (Fasa 8 · Blok D)

Pengadang suntikan (`createInjectionGuard` / `withInjectionGuard`) meliputi semua laluan
yang menerima gesaan pengguna. Ia mematuhi `INJECTION_GUARD_MODE` (`warn` lalai = log sahaja;
`block` = mengembalikan HTTP 400 `SECURITY_001`).

| Jenis            | Laluan                                                                                                                                               | Mod lalai |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Teks (sedia ada) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn      |
| Generatif        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn      |
| Data             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn      |

Pengekstrakan teks (`extractMessageContents`) meliputi `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Pasukan merah (setiap malam, `nightly-llm-security.yml`):** promptfoo mengesahkan bahawa setiap laluan menyekat
korpus OWASP-LLM dalam `INJECTION_GUARD_MODE=block`; garak menjalankan prob (dilangkau tanpa rahsia).
`moderations` disertakan demi konsistensi — pengendali dalam mod sekatan boleh mengecualikannya melalui
`resolveDisabledGuardrails`.

Aliran kerja setiap malam (`.github/workflows/nightly-llm-security.yml`, cron + penghantaran
manual) mempunyai dua tugas:

- **`promptfoo-guard` (menyekat)** — menjalankan `promptfoo eval -c promptfooconfig.yaml`
  dengan `INJECTION_GUARD_MODE=block`. Setiap kes adversarial (cth. "abaikan semua
  arahan terdahulu…", pemecahan sekatan gaya DAN) menegaskan bahawa respons membawa
  `error.code === "SECURITY_001"`, iaitu pengadang benar-benar menolak permintaan tersebut.
- **`garak` (nasihat)** — menjalankan garak `--probes promptinject,dan,leakreplay`
  terhadap tika OmniRoute setempat (`http://localhost:20128/v1`). Dikawal oleh
  rahsia penyedia (`PROMPTFOO_PROVIDER_KEY`); dilangkau dengan lancar dan diakhiri dengan
  `|| true`, maka ia melaporkan tanpa menggagalkan CI.

Liputan pembantu pengadang (`createInjectionGuard` / `withInjectionGuard`)
merangkumi setiap laluan `/v1` yang mengandungi gesaan; teks gesaan diambil daripada
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` oleh
`extractMessageContents()` dalam `src/shared/utils/inputSanitizer.ts`.
