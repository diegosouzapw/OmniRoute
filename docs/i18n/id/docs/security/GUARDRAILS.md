# Guardrails (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sumber kebenaran:** `src/lib/guardrails/`
> **Terakhir diperbarui:** 2026-08-29 — v3.8.51 (provenans transkrip Video Bridge dideklarasikan oleh pemanggil,
> belum diverifikasi oleh server — diperjelas sesuai #11661)

Guardrail memberlakukan keamanan, kebijakan, dan transformasi konten pada batas
antara OmniRoute dan penyedia upstream. Setiap guardrail dapat memeriksa (dan
secara opsional menolak, mentransformasi, atau menganotasi) payload permintaan (`preCall`) dan
respons upstream (`postCall`).

Sistem ini bersifat **fail-open**: jika guardrail melemparkan error saat dijalankan, registry
mencatat error tersebut dan melanjutkan ke guardrail berikutnya alih-alih menggagalkan
permintaan. Pemblokiran merupakan keputusan eksplisit (`block: true`), bukan terjadi secara tidak sengaja.

## Guardrail Bawaan

Registry secara otomatis memuat enam guardrail berdasarkan urutan prioritas saat diimpor
(lihat `registry.ts` → `registerDefaultGuardrails()`):

| Prioritas | Nama                | Tahap          | File                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nomor prioritas yang lebih rendah dijalankan **lebih dahulu**.

### Vision Bridge (`visionBridge.ts`) — Jembatan Modalitas PR-1

Mencegat permintaan yang memuat gambar dan ditujukan ke **model non-vision**, lalu
mengalihkan seluruh permintaan ke model berkemampuan vision atau mengganti bagian
gambar dengan deskripsi teks yang dihasilkan oleh model vision yang dapat dikonfigurasi sebelum
pemanggilan upstream. Dengan demikian, penyedia khusus teks dapat menangani
payload multimodal secara transparan.

Alur:

1. Lewati jika model target sudah mendukung vision (kecuali model tersebut tercantum dalam
   daftar bridge paksa `isVisionBridgeForcedModel`).
2. Ekstrak bagian gambar melalui `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), yang mendelegasikan ke **detektor media
   terpadu** `detectMediaParts()` di `open-sse/utils/mediaParts.ts` — satu-satunya
   sumber kebenaran yang juga digunakan bersama dengan filter kompatibilitas combo.
   Ekstraksi menggunakan daftar yang diizinkan, terbatas pada bagian tingkat teratas dengan bentuk yang
   dapat disisipkan kembali oleh `replaceImageParts` (kontrak extract↔replace): OpenAI
   `image_url`, `source.type:"base64"` base64 Anthropic, URL Anthropic
   `source.type:"url"`, dan `input_image` Responses API. Temuan bertingkat dan
   bentuk yang hanya berupa indikator merupakan materi filter combo dan tidak pernah diekstrak.
   Lewati jika tidak ada yang ditemukan.
3. Selesaikan konfigurasi runtime melalui `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): key pengaturan `modalityBridge*`
   baru diprioritaskan; key `visionBridge*` lama tetap menjadi **fallback satu siklus**
   (periode rollback). Lewati sebelum penelusuran media apa pun jika
   bridge dinonaktifkan.
4. Pemilih mode (`modalityBridgeVisionMode`, lihat tabel di bawah) menentukan
   pengalihan atau pendeskripsian. Pengalihan mengembalikan `modifiedPayload` dengan hanya `model`
   yang diganti, beserta meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Jalur pendeskripsian: batasi gambar hingga `maxImages`, susun prompt yang sadar tugas,
   periksa cache pendeskripsian, panggil model vision **secara paralel**
   (`Promise.allSettled`), dan sisipkan bagian teks `[Image N]: <description>` sebagai
   penggantinya. Pendeskripsian yang gagal menghasilkan `null` dan bagian gambar asli
   **dipertahankan** (#4012) — kecuali pada jalur pendeskripsian combo ketika semua
   pendeskripsian gagal, yang dalam hal ini upstream non-vision yang telah dikonfirmasi menerima stub
   `(unavailable — no vision-capable provider connected)` sebagai gantinya (#8430).
6. Kembalikan `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Pemilih mode (`modalityBridgeVisionMode`)

| Mode       | Default | Perilaku                                                                                                                                                                                                                                                                                                                            |
| ---------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Heuristik lama, tidak diubah (#6640/#7204): model non-combo/`auto/` dialihkan ke model vision terbaik, kecuali model asli sudah memiliki kredensial yang dapat digunakan (maka dideskripsikan); target combo selalu dideskripsikan.                                                                                                 |
| `describe` |         | Selalu deskripsikan — blok pengalihan dilewati sepenuhnya; model yang dipilih pengguna selalu memberikan jawaban.                                                                                                                                                                                                                   |
| `reroute`  |         | Paksa pengalihan: mekanisme perlindungan untuk mempertahankan model berkredensial dilewati. Mekanisme perlindungan kredensial **target** pengalihan tetap berlaku — ketika tidak ada target vision yang dapat digunakan, permintaan beralih ke pendeskripsian agar gambar mentah tidak pernah mencapai backend khusus teks (#8430). |

Mode paksa melakukan short-circuit **sebelum** heuristik otomatis dijalankan; perilaku `auto`
identik secara byte dengan guardrail sebelum PR-1.

#### Prompt pendeskripsian yang sadar tugas (`modalityBridgeVisionTaskAware`)

Default **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) menambahkan
teks dari **pesan pengguna terakhir** (dipotong hingga 500 karakter) ke prompt dasar
pendeskripsian, mengarahkan deskripsi pada hal yang benar-benar ditanyakan pengguna
(pola codex-vision-proxy) dan meminta model vision untuk mentranskripsikan teks yang terlihat.
Jika flag dinonaktifkan — atau tidak ada teks pengguna — prompt dasar digunakan tanpa perubahan.

Self-loop describe milik OpenAI-compatible request (`callVisionModelSingle()`
di `visionBridgeHelpers.ts`) selalu meminta `image_url.detail: "high"` —
tanpa syarat, untuk setiap pemanggil/penyedia, dan tidak bergantung pada sinyal
apa pun dari klien. Sampling dengan detail rendah menurunkan akurasi OCR tepat
untuk tugas transkripsi teks yang diminta oleh prompt ini, sehingga panggilan
describe itu sendiri selalu meminta detail tinggi, terlepas dari tingkat detail
yang digunakan oleh permintaan masuk asli. Hal ini hanya memengaruhi body
permintaan describe internal; hal ini tidak mengubah cara OmniRoute meneruskan
`image_url.detail` milik pemanggil pada permintaan utama — nilai default tersebut
diterapkan secara terpisah, dan hanya untuk klien OpenCode yang terdeteksi, di
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Cabang
format wire Anthropic dari self-loop describe tidak memiliki field `detail` dan
tidak terpengaruh oleh kedua nilai default tersebut.

#### Batas output describe (`modalityBridgeVisionMaxChars`)

| Kunci                          | Default | Rentang            |
| ------------------------------ | ------- | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`     | `0` atau 100–50000 |

`0` (default) berarti **tanpa batas** — deskripsi yang dikembalikan oleh
`callVisionModel()` diteruskan tanpa modifikasi, sehingga mempertahankan
perilaku yang sudah ada. Nilai apa pun dalam rentang 100–50000 akan memotong
deskripsi dengan sufiks `…` sebelum disisipkan kembali sebagai
`[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` di
`src/lib/guardrails/visionBridge.ts`). Naikkan nilai ini untuk tugas OCR yang
kaya detail ketika model downstream memerlukan transkripsi lengkap; turunkan
untuk membatasi penggunaan token pada model vision yang terlalu panjang dalam
memberikan respons. Field dashboard berada di panel Advanced pada tab Vision
(`modality-bridge-max-chars` di `ModalityBridgeVisionTab.tsx`) dan membatasi
nilai apa pun antara 1 dan 99 ke batas minimum 100, sembari membiarkan nilai
eksplisit `0` tidak berubah — `0` merupakan nilai Zod yang valid secara mandiri
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), bukan sekadar
default "belum diatur".

#### Cache describe (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dalam memori untuk output describe, digunakan bersama di seluruh
proses. Kunci = `sha256(imageRef + composedPrompt + configuredBridgeModel)`
dengan framing berbasis prefiks panjang (tanpa collision batas field). Komponen
model adalah model bridge yang **dikonfigurasi**, bukan model yang benar-benar
memberikan respons — `callVisionModel` dapat melakukan fallback secara internal,
dan penggunaan kunci per percobaan akan memecah cache. Describe yang gagal tidak
pernah disimpan dalam cache. Pengaturan:

| Kunci                           | Default | Rentang |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Normalisasi gambar jarak jauh (self-loop describe/pengambilan base64)

Ketika bridge mengambil sendiri gambar **jarak jauh** — self-call describe
Anthropic dan konversi base64 format wire Claude
(`ensureBase64ImagesForClaudeWire`), keduanya melalui
`fetchRemoteImageAsDataUri()` di `visionBridgeHelpers.ts` — URI data yang
dihasilkan diteruskan melalui `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) sebelum disematkan dalam permintaan model
vision. Gambar yang terlalu besar diperkecil hingga memiliki **sisi terpanjang
2048px** (sesuai dengan batas pengubahan ukuran yang sudah diterapkan OpenAI/
Anthropic di sisi server), sehingga mengurangi byte unggahan/latensi tanpa
mengubah apa yang dilihat oleh model vision. Pengubahan ukuran menggunakan
`sharp`, yang dimuat melalui impor dinamis: pada platform tempat binary native
gagal dimuat, `normalizeDataUri()` **tidak pernah melempar exception** — fungsi
tersebut melakukan fallback dengan meneruskan byte asli, sehingga jalur
describe/konversi base64 selalu tetap berfungsi. Byte non-gambar (hasil
pengambilan yang tidak mengembalikan gambar yang dapat didekodekan) juga
diteruskan tanpa perubahan. Normalisasi ini dibatasi pada gambar yang diambil
oleh bridge untuk self-call miliknya sendiri — normalisasi tidak pernah
diterapkan pada payload passthrough mentah milik pemanggil, konsisten dengan
prinsip mutasi hanya berdasarkan keikutsertaan eksplisit (Hard Rule #20).

#### Skema pengaturan + migrasi

Kunci `modalityBridge*` baru divalidasi dengan Zod di `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*`, dan grup
`modalityBridgeAudio*` yang digunakan oleh Audio Bridge. Migrasi
`141_modality_bridge_settings.sql` menyalin nilai lama `visionBridge*` yang
sudah ada ke kunci baru yang sesuai (idempoten, tidak pernah menimpa nilai
`modalityBridge*` yang telah ditetapkan operator); kunci lama tetap diterima
sebagai fallback pembacaan selama satu siklus rilis.

#### Header transparansi + statistik

Respons yang ditransformasi oleh describe membawa
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(dibuat oleh `buildModalityBridgeHeader()` di
`modalityBridge/bridgeStats.ts`, ditambahkan oleh
`withModalityBridgeHeader()` di `src/sse/handlers/chatHelpers.ts`).
Permintaan yang dialihkan ulang **tidak** mendapatkan header — payload tidak
diubah dan pergantian model sudah terlihat pada field `model` dalam body
respons.

`GET /api/modality-bridge/stats` (autentikasi manajemen, tingkat yang sama
dengan `GET /api/settings`) mengembalikan penghitung per modalitas dalam memori
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` untuk `vision`, `audio`, dan
`video`. `averageLatencyMs` menggunakan `latencySamples`, bukan semua percobaan,
sebagai penyebutnya; operasi tanpa pengukuran waktu tidak membuat sampel nol
milidetik secara artifisial. `bridged` tetap menjadi alias yang kompatibel ke
belakang untuk konversi yang berhasil; percobaan yang gagal tidak menaikkan
nilainya. Penghitung direset saat proses dimulai ulang sesuai desain
(telemetri, bukan akuntansi).

#### Konfigurasi dashboard

Halaman dasbor khusus berada di
`/dashboard/settings/modality-bridge`. Tab `Vision`, `Audio`,
dan `Video` yang dapat diakses melalui URL mempertahankan parameter kueri saat mengganti nilai `tab`.
Tab Vision menyediakan pengaktifan, mode, pemilihan model (termasuk default
otomatis), prompting berbasis tugas, batas lanjutan untuk timeout/gambar/panjang deskripsi/cache,
penghitung runtime,
dan permintaan sampel yang dilindungi. Tab Audio juga aktif: tab ini menyediakan
pengaktifan, pemilih model khusus STT dengan Auto, batas timeout/durasi maksimum klip,
penghitung audio, dan pengujian sampel `input_audio`. Tab Video berfungsi: tab ini melaporkan
status runtime FFmpeg/ffprobe — salah satu dari empat status UI eksplisit (`unknown` saat
probe sedang berlangsung atau tidak dapat diselesaikan, `restricted` pada host dasbor
non-loopback ketika probe dilewati di sisi klien, `unavailable` setelah diperiksa
dan dipastikan tidak tersedia, atau `available` beserta versi FFmpeg/ffprobe) — mempertahankan
batas pengaktifan/model/frame/video/timeout, memfilter pemilih model agar hanya menampilkan model
yang mendukung vision, dan menyediakan penghitung video.

Kartu Vision Bridge sebelumnya di bawah pengaturan AI kini menjadi tautan kompatibilitas ke
halaman baru; kartu tersebut tidak lagi memiliki salinan formulir kedua. Media Providers juga
menautkan alur kerja Image-to-Text dan Speech-to-Text ke tab Modality
Bridge terkait tanpa menghapus playground Speech-to-Text yang sudah ada.

**Bypass penerimaan self-loop:** ketika panggilan describe dirutekan melalui
self-loop `/v1` milik OmniRoute sendiri (model penyedia nonstandar), subpermintaan mengirimkan
`x-omniroute-admission-bypass: internal` dan diautentikasi dengan kredensial
self-loop yang telah di-resolve — sentinel lokal `sk_omniroute` dalam mode lokal, atau
kunci env `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` yang dikonfigurasi operator (#1350), sehingga
deployment dengan `REQUIRE_API_KEY=true` tetap dapat menjalankan panggilan describe. Bypass
hanya diterima untuk kredensial yang persis sama tersebut, sehingga klien eksternal tidak dapat menggunakan
header ini untuk melewati proses penerimaan.

Default lama berada di `src/shared/constants/visionBridgeDefaults.ts`;
default mode/task-aware/cache baru dan resolver pengaturan berada di
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail menyediakan opsi konstruktor
`deps` agar pengujian dapat menyuntikkan implementasi palsu `getSettings` dan
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Mengintersepsi permintaan chat yang memuat audio sebelum permintaan tersebut mencapai target yang tidak
diketahui dapat menerima input audio. Mekanisme ini tidak pernah merutekan ulang permintaan chat: bagian audio
ditranskripsikan melalui endpoint multipart kompatibel OpenAI yang sudah ada, dan
model chat yang dipilih melanjutkan proses dengan transkrip teks.

Alur:

1. Resolve `supportsAudio` melalui `getResolvedModelCapabilities()`. Metadata
   provider-registry eksplisit memiliki prioritas, disusul metadata model statis, kemudian
   `modalities_input` yang telah disinkronkan. Daftar input yang dideklarasikan tanpa `audio` bernilai `false`;
   jika tidak ada bukti kapabilitas, nilainya tetap `null`. Baik `false` maupun `null` mengaktifkan
   bridge konservatif, sedangkan `true` melewatinya.
2. Resolve pengaturan `modalityBridgeAudio*` dan ekstrak bagian audio tingkat atas
   yang dapat di-splice dari setiap pesan melalui detektor bersama `detectMediaParts()`.
   Bentuk wire yang didukung adalah `input_audio`, `audio_url` OpenAI, dan
   `source.media_type: "audio/*"`. Audio bertingkat terdeteksi untuk perutean, tetapi tidak
   dihapus oleh jalur splice. Pekerjaan dibatasi oleh `modalityBridgeAudioMaxClips`;
   bagian berikutnya tetap tidak diubah.
3. Gunakan `provider/model` yang dikonfigurasi, atau biarkan `selectAudioBridgeModel()` menelusuri
   `AUDIO_TRANSCRIPTION_PROVIDERS` sesuai urutan katalog yang stabil dan memilih model pertama
   dengan kredensial penyedia aktif yang dapat digunakan.
4. `callAudioTranscription()` mengonversi audio base64/data-URI menjadi `file`
   multipart, atau mengunduh `audio_url` jarak jauh melalui guard outbound khusus publik
   dengan DNS pinning dan batas 25 MB. Fungsi ini kemudian melakukan POST terhadap file dan model
   terpilih ke self-loop lokal `/v1/audio/transcriptions`, yang diautentikasi dengan
   `resolveSelfLoopBearer()`. Rute transkripsi yang sudah ada menjalankan pencarian
   kredensial, penanganan cooldown/rate-limit, dan dispatch penyedia secara normal.
5. Panggilan yang berhasil mengganti bagiannya dengan `[Audio N]: <transcript>`. Panggilan
   dijalankan dengan `Promise.allSettled`: kegagalan individual mempertahankan bagian audio
   asli tersebut (kontrak #4012). Jika semua panggilan gagal dan target terbukti memiliki
   `supportsAudio === false`, bagian tersebut menjadi
   `[Audio N]: (unavailable — no STT provider connected)` (kontrak #8430). Untuk
   target yang tidak diketahui (`null`), hasil ketika semua panggilan gagal tetap tidak diubah. Target
   yang terbukti hanya mendukung teks tanpa kredensial STT yang dapat digunakan menerima stub eksplisit
   yang sama tanpa membuat panggilan jaringan.

Transkrip yang berhasil menggunakan cache LRU/TTL Modality Bridge tingkat proses. Kuncinya
menggabungkan referensi audio, label operasi `audio-transcription` yang stabil,
dan model STT terpilih; kegagalan tidak pernah disimpan dalam cache. Upaya audio memperbarui
penghitung bersama `bridged`, `cacheHits`, `failures`, dan `lastUsedAt`.
Respons yang ditransformasi menyertakan
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; permintaan
yang tidak diubah tidak menerima segmen Audio Bridge.

Pengaturan runtime didukung DB dan divalidasi dengan Zod:

| Kunci                         | Default | Rentang          |
| ----------------------------- | ------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                |
| `modalityBridgeAudioModel`    | `""`    | Auto atau ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10             |

Cache bersama tetap dikendalikan oleh `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, dan `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Mencegat bagian video tingkat teratas dalam `messages` Chat Completions dan `input`
Responses API sebelum target yang tidak diketahui memiliki dukungan video native
dipanggil. Bentuk yang didukung adalah `input_video`, `video_url`, `video_source`,
URL HTTPS, dan URI data `data:video/*;base64,...`. Nama file biasa dalam teks tidak
dianggap sebagai video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) menangani traversal permintaan,
pemeriksaan kapabilitas/kebijakan, agregasi per permintaan, dan payload respons.
Pekerjaan per video — akuisisi, cache hasil keseluruhan, pendeskripsian urutan frame
(yang menggabungkan transkrip audio yang dideklarasikan pemanggil), serta
metrik/pembatalan/pembersihan per percobaan — disembunyikan di balik
`processVideoPart` dalam `videoBridgePipeline.ts`, yang dipanggil sekali untuk
setiap bagian video di dalam loop `preCall`. Modul tersebut juga mendefinisikan
batas port eksplisit `VideoMediaBrokerPort` (mengakuisisi byte dan mengekstrak
frame sampel), `VideoAudioTranscriptionPort` (menggabungkan transkrip audio yang
dideklarasikan pemanggil dengan keterangan frame sampel), dan
`VideoDrilldownPort` (batas persistensi penelusuran mendetail frame; belum
dihubungkan ke `processVideoPart` — saat ini hanya rute terpisah
`/api/modality-bridge/video/drilldown` yang menulis entri penelusuran mendetail).

Jalur permintaan publik `/v1` tidak pernah mengimpor atau menjalankan subproses.
Video jarak jauh diunduh dengan batas 50 MiB; video base64 inline memiliki batas
konservatif 36 MiB setelah didekode per video agar envelope
model/pesan/framing tetap berada di dalam batas penerimaan permintaan JSON publik
sebesar 50 MiB. Panjang inline dan estimasi ukuran setelah didekode diperiksa
sebelum alokasi. HTTPS diwajibkan pada URL jarak jauh awal dan setiap pengalihan,
menggunakan pengaman outbound khusus publik yang sudah ada dengan penyematan DNS.
Byte tersebut kemudian melewati batas broker internal yang tepat,
`POST /api/modality-bridge/video/extract`. Rute tersebut bersifat `LOCAL_ONLY`
dan `SPAWN_CAPABLE`, hanya menerima permintaan loopback tepercaya yang
diautentikasi per proses, serta tidak pernah menerima URL, jalur sistem file,
executable, atau daftar argumen. Pipeline ukuran isi API dan pembaca isi
inkremental milik handler secara independen memberlakukan batas input broker
sebesar 50 MiB. Antrean terbatasnya menjalankan satu ekstraksi pada satu waktu,
mengizinkan empat pekerjaan tertunda, dan membatasi input tertunda hingga
100 MiB.

Di dalam broker, `ffprobe` membaca file lokal privat; daftar izin format tetap
mengecualikan format playlist dan manifes. Untuk container keluarga MOV yang
diizinkan, referensi data MOV eksternal tetap dinonaktifkan secara default, dan
perintah tetap tidak mengaktifkannya. Baik `ffprobe` maupun `ffmpeg` menggunakan
daftar izin protokol khusus `file`, satu thread, array argumen tetap, tanpa shell,
dan executable yang diselesaikan dari `PATH`. Stream gambar sampul terlampir
bukan kandidat yang dapat diputar. Semua stream yang dapat diputar harus
memenuhi batas, dan stream default eksplisit diprioritaskan sebelum fallback
deterministik ke indeks terendah. Video dibatasi hingga 600 detik, 8.192 piksel
per dimensi, dan 33.554.432 piksel sumber. FFmpeg mengambil sampel 1–16 frame
JPEG titik tengah, memperkecil sisi panjang menjadi maksimal 1.024 piksel tanpa
memperbesar input yang lebih kecil, dan tidak pernah menerima URL. Pengambilan
sampel menggunakan `uniform` secara default. Kebijakan opsional `scene_aware`
dan eksperimental `segment_aware` melakukan satu pass FFmpeg tetap tambahan
terhadap stream lokal yang telah divalidasi, memilih stempel waktu adegan
`showinfo` yang dibatasi, dan melakukan fallback secara deterministik ke titik
tengah seragam yang sama jika detektor gagal, terjadi timeout, output tidak
valid, atau kumpulan kandidat kosong. Mode sadar segmen mengalokasikan sampel
titik tengah secara proporsional terhadap interval adegan yang telah divalidasi;
bukti sadar segmen dan perilaku fallback dijelaskan secara mendetail di bawah.
Batas tegas 16 frame diterapkan setelah pemilihan dalam setiap kebijakan. Ketika
permintaan sadar adegan hanya memiliki anggaran satu frame, permintaan tersebut
menggunakan titik tengah seragam dari jendela video penuh atau jendela fokus
yang aktif dan melaporkan `policyEffective: uniform`: satu frame adegan yang
dipilih tidak dapat mempertahankan kedua ujung temporal. Pemanggil dapat secara
opsional menyediakan jendela fokus terbatas (`start`/`end` dalam detik); batasnya
dibatasi ke durasi media, jendela yang terbalik atau tidak terbatas ditolak, dan
semua kebijakan pengambilan sampel dilakukan hanya di dalam interval yang telah
dinormalisasi. Jendela yang dihasilkan disertakan dalam metadata pengambilan
sampel dan dalam prefiks deskripsi yang tidak tepercaya agar model hilir dapat
membedakan cuplikan terfokus dari keseluruhan linimasa.

Fokus keterangan semantik merupakan pengaturan terpisah dan eksplisit. Mode
analisis default `full` mempertahankan prompt frame yang sudah ada dan tidak
pernah meneruskan teks permintaan ke model keterangan. Dalam mode `focused`,
bridge hanya membaca `text`/`input_text` terbaru yang tidak kosong dan ditulis
pengguna dari container Chat atau Responses yang sama, menormalisasikannya ke
NFC, menciutkan karakter kontrol dan spasi, serta membatasinya hingga 500 titik
kode Unicode. Hasil kosong melakukan fallback ke prompt `full` yang persis sama.
Petunjuk yang dapat digunakan diserialisasi sebagai JSON dalam blok konteks
pengguna tidak tepercaya khusus dan hanya boleh memprioritaskan detail yang
dapat diamati; petunjuk tersebut tidak dapat mengesampingkan peringatan terpisah
agar tidak mengikuti instruksi yang terlihat atau terdengar dalam media. Fokus
tekstual tidak pernah menyimpulkan `start`/`end` atau mengubah sampler temporal.

#### Bukti segmen struktural FU-07

`segment_aware` menggunakan satu pass pra-analisis terbatas terhadap stream video
lokal yang telah divalidasi. Rantai filter tetap terlebih dahulu menskalakan
lebar hingga maksimal 320 piksel, mendeteksi perubahan adegan dan interval beku,
lalu mengambil sampel dengan laju 1 frame per detik untuk keburaman, luma
rata-rata, serta informasi spasial/temporal. Pass tersebut dibatasi hingga 600
sampel struktural, satu thread FFmpeg/filter, daftar izin protokol khusus `file`
dan container yang sama, batas output proses sebesar 1 MiB, serta maksimal 30
detik dalam pembatalan/tenggat bersama milik broker. Pass tersebut tidak pernah
menerima perintah, filter, jalur, atau URL dari permintaan.

Nilai struktural merupakan bukti pengambilan sampel deterministik, bukan
pemahaman semantik terhadap video. Nilai tersebut tidak menyimpulkan subjek,
tindakan, teks layar, ucapan, atau maksud pengguna. Batas adegan dan pembekuan
membentuk segmen; cakupan pembekuan, keburaman, eksposur, detail spasial, dan
perubahan temporal hanya memengaruhi cara anggaran 1–16 frame yang tersedia
dialokasikan. Segmen yang sepenuhnya beku dibatasi hingga satu frame, sedangkan
segmen yang tidak beku bersaing untuk mendapatkan sisa anggaran. Jika jumlah
batas melebihi jumlah frame, cakupan linimasa yang seragam dipertahankan agar
potongan cepat di awal tidak dapat menyembunyikan segmen panjang di bagian akhir.
Batas adegan yang berada dalam resolusi analisis 1 detik dari batas pembekuan
digabungkan.

Filter yang tidak tersedia, bukti yang rusak/kosong, kesalahan detektor, atau
batas waktu praanalisis yang dibatasi akan gagal secara terbuka dengan kembali
ke kebijakan titik tengah seragam yang sama persis. Pembatalan oleh pemanggil
atau tenggat broker tidak gagal secara terbuka: hal tersebut menghentikan
subproses yang sedang berjalan, mencegah ekstraksi frame berikutnya, dan
menghapus pohon sementara privat di dalam `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` menghasilkan fixture FFmpeg nyata yang
deterministik untuk penghematan panggilan pembuatan teks layar setelah
deduplikasi, alokasi anggaran gerakan padat, bukti keburaman/eksposur/SI-TI,
potongan cepat dengan bagian akhir yang panjang, serta positif palsu dari
pemudaran bertahap. Skrip tersebut mencatat waktu dinding praanalisis dan, jika
`/usr/bin/time` tersedia, CPU proses anak serta RSS puncak. Pemeriksaan
kualitasnya hanya berupa oracle struktural. Kualitas model teks layar nyata
tetap berstatus `HOLD` karena harness ini tidak memiliki endpoint yang
diotorisasi atau penilai yang dibekukan. Penghematan moneter juga tetap
berstatus `HOLD`, kecuali `--caption-cost-per-call-usd` memberikan estimasi
positif yang eksplisit untuk biaya per panggilan; skrip tidak pernah mengarang
salah satu hasil tersebut.

Setiap frame dibatasi hingga 4 MiB, gabungan seluruh frame mentah hingga 23 MiB,
dan respons broker yang diserialisasi hingga 32 MiB. Direktori sementara privat
dihapus di dalam `finally`. OmniRoute tidak menyertakan FFmpeg dan tidak menerima
jalur executable khusus. Sebelum membuat teks layar, bridge menerapkan tahap
deduplikasi visual yang konservatif: setiap JPEG diperkecil menjadi buffer
grayscale 16×16 dan hanya dibandingkan dengan frame terakhir yang dipertahankan.
Untuk anggaran teks layar yang diminta di atas satu frame, ekstraksi menyediakan
kumpulan kandidat terbatas hingga dua kali anggaran tersebut dan tidak pernah
lebih dari 16 frame. Batas yang diminta baru diterapkan setelah deduplikasi,
dengan kandidat pertama dan terakhir yang dipilih tetap dipertahankan selama
penjarangan akhir jika anggaran sedikitnya dua. Kebijakan berversi
`grayscale-16x16-mean-cells-v2` menggunakan nilai yang lebih besar antara delta
luma rata-rata dan rasio sel thumbnail yang delta ternormalisasinya sedikitnya
0,05. Ambang duplikat adalah konstanta 0,04, yang dipilih demi keterprediksian
alih-alih diekspos sebagai pengaturan runtime. Sinyal kontras tinggi sekunder ini
mempertahankan gerakan kecil dan perubahan teks yang terlihat, yang dapat
disembunyikan oleh perbandingan berbasis rata-rata saja. Kesalahan pembanding
atau dekoder gagal secara terbuka dan mempertahankan cakupan. Metadata keluaran
memisahkan kandidat yang diekstrak, frame yang berhasil digunakan, dan duplikat
visual yang dibuang.

Bagian video yang ditandai secara eksplisit dapat meminta lembar kontak dengan
stempel waktu. Bridge membuat grid JPEG dengan maksimal 4 kolom dan 16 frame.
Setiap sel 512 piksel menyematkan stempel waktu sumbernya ke dalam pita bawah
berkontras tinggi, sementara stempel waktu yang sama tetap tersedia dalam
metadata tekstual untuk pengaitan dan audit pada tahap hilir. JPEG lengkap tetap
dibatasi hingga 32 MiB. Jika `sharp` tidak dapat mendekode atau menyusun grid,
bridge kembali menggunakan masing-masing frame JPEG; pembatalan oleh klien tetap
dipropagasikan melalui operasi lembar tersebut.

Bukti promosi sengaja dipisahkan dari microbenchmark komposisi sintetis.
`scripts/perf/video-bridge-contact-sheet-eval.ts` mendefinisikan harness A/B
dengan versi skema untuk model visi nyata yang kompatibel dengan OpenAI. Harness
ini mengukur token yang dilaporkan penyedia, latensi dinding ujung-ke-ujung
(termasuk penyusunan lembar), jumlah panggilan model, dan retensi fakta yang
ditentukan oleh manifes. Respons model mentah tidak ditulis ke dalam laporan;
hanya digest SHA-256 dan ID fakta yang cocok yang dipertahankan. Harness tidak
melakukan panggilan jaringan atau model berbayar apa pun kecuali
`--execute-real` diteruskan dan `--model`, `OMNIROUTE_BASE_URL`, serta
`OMNIROUTE_API_KEY` dikonfigurasi. Tanpa eksekusi nyata yang eksplisit tersebut,
verdict yang dapat dibaca mesin tetap berstatus `HOLD`; pengukuran
payload/jumlah panggilan sintetis saja bukan merupakan bukti promosi.

Pemanggil dapat melampirkan array opsional `transcript.cues` ke bagian video
yang didukung jika mereka sudah memiliki teks yang terselaraskan. Setiap cue
harus memuat `text`, interval `start`/`end` yang bernilai terbatas dan berada di
dalam durasi hasil pemeriksaan, serta `source` yang masuk daftar yang diizinkan
(`client`, `embedded`, atau `audio-bridge`); nilai default `confidence` adalah
`1` dan harus tetap berada di antara `0` dan `1`. Cue duplikat persis
digabungkan. OmniRoute tidak pernah memulai transkripsi dari metadata ini: cue
yang telah divalidasi disalin ke hasil yang dideskripsikan beserta sumber,
tingkat keyakinan, dan intervalnya, lalu dirender sebagai observasi yang tidak
tepercaya bersama teks layar frame. Teks yang tidak valid, berada di luar
rentang, atau tidak memiliki asal-usul ditolak alih-alih dicampurkan ke dalam
aliran teks layar. Saat ini, bidang `source` dideklarasikan oleh pemanggil dan
tidak diverifikasi oleh server: OmniRoute memastikan bahwa nilainya merupakan
salah satu dari tiga string yang diizinkan, tetapi belum mengonfirmasi secara
kriptografis bahwa label `embedded` atau `audio-bridge` benar-benar berasal dari
ekstraksi milik server. Perlakukan `source` sebagai petunjuk yang tidak tepercaya
hingga verifikasi tersebut tersedia; jangan mendasarkan keputusan otorisasi
padanya.

Pemanggil tingkat lanjut dapat menyediakan trek `audioTranscript` yang sudah diotorisasi
untuk video yang sama. Lapisan fusi menjalankan observasi visual dan audio dalam
satu tenggat waktu dan sinyal pembatalan, mengurutkannya pada linimasa bersama,
menggabungkan duplikat yang sama persis, dan melaporkan hasil parsial ketika hanya
satu sisi yang berhasil. `audioTranscript` yang tidak valid diturunkan menjadi
hasil parsial tersebut — deskripsi visual tetap dipertahankan dan cabang audio
mencatat kode kegagalan yang telah disanitasi — alih-alih menggagalkan seluruh
video. Ketersediaan per cabang, penanda parsial, dan kode kegagalan yang telah
disanitasi dipertahankan dalam hasil yang dideskripsikan, dalam metadata
pengaman (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), dalam metadata cache hasil, dan dalam penghitung
fusi bridge. Jalur Video Bridge default tidak memanggil speech-to-text atau
mengunduh salinan media kedua; tanpa trek eksplisit tersebut, jalur itu tetap
hanya memproses video.

**Retensi transkrip (#12150 P1).** Ini diterapkan secara otomatis setiap kali
Video Bridge (yang bersifat opt-in) merender cue transkrip — tidak ada penanda
retensi terpisah. Ketika suatu permintaan merender cue transkrip apa pun
(`transcript` yang dideklarasikan pemanggil atau `audioTranscript` hasil fusi),
pengaman menandainya sebagai `videoBridgeObserved` dan menghasilkan salinan
bayangan deskripsi video yang telah disunting — rendering identik dengan isi
teks bebas setiap cue diganti menjadi `[redacted-video-transcript]`, yang dibuat
dengan mengganti bidang cue terstruktur sebelum string dirangkai (tidak pernah
dengan mengurai teks yang telah diratakan, sehingga tidak ada konten cue —
baik yang bersifat adversarial maupun biasa, termasuk isi yang memuat `]`
seperti `[inaudible]`/`[music]` — yang dapat bertahan). Isi permintaan log
panggilan yang dipersistenkan mengganti setiap bagian teks turunan video dengan
salinan bayangan yang telah disunting tersebut, yang dicocokkan berdasarkan
kesetaraan konten; jangkar `fullText` dibaca ulang dari payload pengaman
prapanggilan yang telah selesai, sehingga pencocokan tetap berhasil setelah
pengaman berantai berikutnya (penyamar PII dan kredensial, dengan prioritas
10/95) menulis ulang teks deskripsi secara langsung dan setelah injeksi prompt
sistem/handoff/memori membentuk ulang larik pesan. Isi yang dikirim ke model
upstream tidak berubah. Permintaan yang terobservasi juga tidak mengisi Memory
persisten apa pun (ekstraksi yang berasal dari permintaan maupun respons
dilewati), sehingga balasan model sendiri tidak dapat menggemakan teks transkrip
ke dalam Memory.

Permukaan retensi yang masih terbuka dan dilacak untuk tindak lanjut (**P2**,
#12430): snapshot mentah permintaan klien prapengaman dalam artefak log terperinci;
kelanjutan `previous_response_id` yang gagal secara tertutup; pengiriman internal
prompt turunan yang menyematkan transkrip di dalam prompt string sintetis
(tahap pipeline, context-handoff); serta isi respons / salinan cache semantik
dari balasan model yang mengutip transkrip. Ini merupakan permukaan kelas
mentah/respons atau opt-in yang berada di luar cakupan isi permintaan
terpersisten + Memory pada P1.

Siklus hidup internal `/api/modality-bridge/video/drilldown` merupakan substrat
cache terpisah yang diautentikasi melalui loopback/token. Setiap operasi juga
memerlukan ID principal opak kanonis. Sebelum pemanggil produksi diaktifkan,
pemanggil tersebut harus menurunkan ID itu dari tenant yang terautentikasi dan
tidak boleh meneruskan nilai yang dipilih klien. Kunci cache mengikat principal
tersebut ke ID sesi dan referensi video kanonis, hanya menyimpan kunci turunannya
yang berbasis SHA-256, serta membatasi pembacaan maupun penghapusan ke principal
yang sama. Cache menyimpan maksimal 16 frame JPEG turunan per entri,
menghapusnya setelah sepuluh menit, dan mendukung pembacaan `start`/`end`
terbatas atau penghapusan sesi secara eksplisit.

Setiap principal dibatasi hingga 16 entri dan 64 MiB data JPEG kanonis. Batas
tersebut terpisah dari batas global 64 entri/256 MiB: tekanan kuota principal
hanya menyingkirkan entri yang paling lama tidak digunakan milik principal
tersebut sebelum penyingkiran LRU global dipertimbangkan. Entri kedaluwarsa
dibersihkan dari penghitungan principal dan global saat ada aktivitas cache,
sedangkan pembatalan dan kegagalan validasi tidak melakukan commit terhadap
pengganti parsial.

Cache menolak Base64 nonkanonis, padding berlebih, media non-JPEG, JPEG yang
rusak atau terpotong, serta JPEG yang menghasilkan peringatan selama dekode
gambar penuh `sharp` yang dibatasi. Cache mengodekan ulang setiap gambar yang
diterima sebagai JPEG kanonis, memperoleh lebar dan tinggi dari byte yang telah
didekode alih-alih memercayai bidang dari pemanggil, serta membuang byte
polyglot tambahan alih-alih mempertahankannya. Hanya buffer terkompresi kanonis
yang dibatasi yang dibebankan pada kedua kuota. Batas transmisi JSON mencakup
overhead Base64 untuk batas maksimum input terdekode sebesar 32 MiB. Setiap
derivasi yang disimpan mencatat format/resolusi JPEG yang telah divalidasi,
kebijakan sampling, versi derivasi, waktu pembuatan, hash konten yang dihitung
server, serta referensi induk yang di-hash beserta hash konten induk dari
pemanggil tepercaya. Pembatalan diperiksa di antara fase dekode/hash asinkron
sebelum commit cache atomik.

Tahap ini belum menghubungkan produsen produksi ke rute tersebut dan belum
menyediakan pemilihan varian multiresolusi. Oleh karena itu, jalur permintaan
Video Bridge yang transparan tidak menimbulkan pekerjaan tambahan, sementara
penurunan principal yang terikat pada tenant dan siklus hidup multiresolusi
FU-08 secara lengkap tetap menjadi pekerjaan tindak lanjut yang eksplisit,
bukan didokumentasikan sebagai perilaku yang telah selesai.

Frame diberi keterangan secara berurutan dengan model Video yang dikonfigurasi. Penggantian
Video yang kosong mewarisi pengaturan Vision; jika keduanya kosong, perute otomatis
Vision memilih model efektif yang mendukung visi. Keterangan yang berhasil
menggantikan bagian asli dengan prefiks `[Video description:` yang stabil, yang juga
menandai teks sebagai observasi tidak tepercaya yang berasal dari media dan memberi tahu
model hilir agar tidak mengikuti instruksi yang ditemukan dalam media. Kunci cache keterangan frame
mencakup byte JPEG, prompt, stempel waktu, dan model efektif; hanya
keterangan yang berhasil yang di-cache. Entri cache mempertahankan model produsen yang benar-benar berhasil,
termasuk model fallback; bridge melaporkan `mixed` ketika frame yang berbeda
dihasilkan oleh model yang berbeda. Cache hit menggunakan kembali identitas produsen tersebut
alih-alih melabelinya ulang sebagai rencana perutean yang diminta. Cache hasil seluruh video
menggunakan setiap input yang mengubah output sebagai kunci — prompt, model efektif,
kebijakan sampling, jumlah frame, mode analisis semantik, fingerprint SHA-256
dari petunjuk fokus yang dinormalisasi, jendela fokus, `transcript`,
`audioTranscript`, dan flag lembar kontak — sehingga perubahan pada salah satu
dimensi tersebut menghasilkan cache miss, bukan penggunaan ulang data usang. Versi kebijakan
deduplikasi visual, ambang batas, dan jumlah frame kandidat yang dibatasi juga dinyatakan secara eksplisit dalam
kunci dan metadata cache hasil; karena itu, perubahan kebijakan tidak dapat menggunakan kembali
deskripsi seluruh video yang usang. Metadata cache hasil v4 menyimpan mode dan
fingerprint, bukan tugas mentah pengguna. Metadata guardrail melaporkan mode analisis
yang diminta maupun yang efektif; mode `focused` yang diminta tanpa
teks pengguna yang dapat digunakan dilaporkan secara efektif sebagai `full`.

Guardrail mengekstrak setiap bagian video yang didukung, tetapi tidak mendeskripsikan lebih dari
`modalityBridgeVideoMaxVideos`. Untuk target yang terbukti memiliki
`supportsVideo === false`, video yang gagal dan melebihi batas menjadi penanda teks aman
yang eksplisit agar tidak ada video mentah yang tersisa. Ketika kapabilitas tidak diketahui, bagian tersebut
tetap tidak diubah. Target dengan `supportsVideo === true` melewati bridge.
Sinyal pembatalan permintaan klien diteruskan melalui pengunduhan, antrean broker,
subproses, dan panggilan pembuatan keterangan; pembatalan menghentikan proses di antara video dan tidak pernah gagal secara terbuka
dengan meneruskan media mentah.

Pengaturan runtime didukung oleh DB dan divalidasi oleh Zod:

| Kunci                               | Default     | Rentang / perilaku                                                                                                      |
| ----------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime opsional, harus diaktifkan secara eksplisit                                                                     |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` mempertahankan keterangan umum; `focused` menggunakan konteks pengguna terbaru yang dibatasi dan tidak tepercaya |
| `modalityBridgeVideoModel`          | `""`        | Mewarisi model Vision Bridge                                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, atau `segment_aware` proporsional; kegagalan detektor beralih ke `uniform`                    |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                          |

Nilai timeout Video lama yang tersimpan dan melebihi 120 detik dibatasi pada
tenggat broker; penulisan pengaturan baru yang melebihi batas tersebut ditolak.
`GET /api/modality-bridge/video/runtime` memerlukan lokalitas loopback tepercaya
yang telah diberi stempel sebelum autentikasi atau pemeriksaan runtime, kemudian memerlukan autentikasi
manajemen. Endpoint ini hanya mengembalikan `available`, versi FFmpeg/ffprobe yang telah disanitasi, dan alasan tetap
ketika runtime tidak tersedia. Endpoint ekstraksi internal bukan
API unggahan publik: kejenuhan antrean mengembalikan `503` beserta `Retry-After`, pemutusan koneksi oleh pemanggil
mengembalikan `499`, dan tenggat tetap broker mengembalikan `504`. Respons yang dikonversi menambahkan
`video->text;model=<visionModel>;parts=<videos>` ke header pusat
`x-omniroute-modality-bridge` tanpa menghapus segmen Vision atau Audio.

### Penyamar PII (`piiMasker.ts`)

Berjalan pada **kedua** tahap.

- **`preCall`** mengkloning payload, menelusuri `system`, `messages`, `input`, dan
  `prompt` (termasuk item string biasa), serta menerapkan `processPII()` (dari
  `@/shared/utils/inputSanitizer`) pada field string `content`/`text`. Ketika
  `PII_REDACTION_ENABLED=true`, PII yang terdeteksi disamarkan dalam payload
  keluar. Hal ini tidak bergantung pada `INPUT_SANITIZER_MODE` (yang hanya mengontrol
  kebijakan injeksi prompt). Ketika penyamaran dinonaktifkan, panggilan mencatat jumlah
  deteksi tanpa menulis ulang konten.
- **`postCall`** melakukan deep clone pada respons, menjalankan `sanitizePIIResponse()` serta
  penyamar berbentuk Responses API (`maskResponsesOutput` — mencakup
  `output_text` dan `output[].content[].text`). Jika terjadi penyamaran, respons
  yang telah dimodifikasi menggantikan respons asli.

Guardrail tidak pernah memblokir; guardrail hanya memberi anotasi (`meta.detections`,
`meta.redacted`) atau menulis ulang.

### Injeksi Prompt (`promptInjection.ts`)

Mendeteksi struktur adversarial dalam konten yang diberikan pengguna dan menerapkan
kebijakan yang dikonfigurasi. Perilaku ditentukan oleh variabel lingkungan dan opsi konstruktor:

| Pengaturan    | Variabel env                                                                                        | Default | Efek                                                                                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Diaktifkan    | `INPUT_SANITIZER_ENABLED`                                                                           | `true`  | Jika `false`, guardrail langsung dilewati.                                                                                                                                                                       |
| Mode          | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                     | `warn`  | Kebijakan injeksi: `block`, `warn`, atau `log`. (`redact` diterima untuk kompatibilitas mundur, tetapi **tidak** menghapus teks injeksi; penulisan ulang PII permintaan dikontrol oleh `PII_REDACTION_ENABLED`.) |
| Ambang blokir | Opsi `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Tingkat keparahan minimum yang diperlukan untuk memblokir. Secara default, tingkat sedang hanya dipantau.                                                                                                        |

**Prioritas mode** (`getMode`): `options.mode` pemanggil →
**penggantian feature flag DB** `INJECTION_GUARD_MODE` (Dasbor → Pengaturan →
Feature Flags) → env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` →
`warn`. Dengan demikian, penggantian dari dasbor lebih diprioritaskan daripada
variabel env, sehingga UI Feature Flags mengontrol guard yang sedang berjalan
secara langsung (tanpa memulai ulang). Pembacaan DB bersifat fail-safe: jika
terjadi error, guard kembali ke perilaku berbasis env, dan jika tidak ada
penggantian yang ditetapkan, perilakunya identik dengan resolusi yang hanya
menggunakan env.

Sumber deteksi:

1. `sanitizeRequest()` dari `@/shared/utils/inputSanitizer` (kumpulan detektor
   bersama yang digunakan di bagian lain pipeline).
2. `DEFAULT_GUARD_PATTERNS` bawaan (saat ini `system_override_inline` dan
   `markdown_system_block`, keduanya dengan tingkat keparahan `high`).
3. `customPatterns` opsional yang diteruskan melalui opsi konstruktor (string,
   regex, atau record `{ name, pattern, severity }`).

Ketika `mode === "block"` **dan** setidaknya satu deteksi memenuhi ambang
keparahan, `preCall` mengembalikan `{ block: true, message: "Request rejected:
suspicious content detected" }`. Dalam mode `warn`/`log`, guardrail mencatat log
tetapi mengizinkan panggilan. Helper bersama `evaluatePromptInjection()` juga
diekspor untuk pemanggil yang perlu mengevaluasi prompt tanpa melalui registry.

**Batas pemindaian (v3.8.20):** detektor hanya memeriksa **16 KB pertama** dari
teks prompt yang digabungkan — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16.384
byte) di `src/shared/utils/inputSanitizer.ts`. Baik `detectInjection()` maupun
`evaluatePromptInjection()` menjalankan `slice(0, MAX_INJECTION_SCAN_BYTES)`
sebelum menjalankan perulangan pola. Direktif injeksi berada di dekat bagian
awal input, sehingga ini membatasi penggunaan CPU/GC oleh regex pada payload
berukuran ratusan KB tanpa melemahkan deteksi (lihat #3932, #4041).

### Penyamar Kredensial (`credentialMasker.ts`)

Berjalan pada **kedua** tahap, sebagai proses terakhir dalam rantai default
(prioritas `95`). Menyamarkan pola kunci API / token rahasia yang dikenal luas
dari payload keluar (konten pesan, argumen pemanggilan alat, hasil alat) **dan**
respons penyedia, sehingga kredensial yang ditempelkan ke dalam prompt (atau
ditampilkan kembali oleh hasil alat) tidak bocor ke penyedia upstream maupun
kembali ke klien.

- **Hanya opt-in**, menggunakan konvensi yang sama seperti penyamaran PII
  (berkaitan dengan Hard Rule #20): dinonaktifkan kecuali
  `settings.credentialRedactionEnabled === true` **atau**
  `CREDENTIAL_REDACTION_ENABLED=true`. Jika dinonaktifkan, guardrail tidak
  melakukan apa pun — tidak pernah memblokir dan tidak pernah menulis ulang.
- `redactCredentials()` menelusuri seluruh struktur payload/respons
  (`walkValue()`, aman dari prototype pollution, aman dari siklus melalui
  `WeakSet`) dan mengganti kecocokan dengan placeholder `[REDACTED:<type>]`,
  dengan hanya mengkloning cabang yang benar-benar berubah.
- `CREDENTIAL_PATTERNS` mencakup kunci penyedia LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), kunci pembayaran (Stripe, Square),
  kunci cloud (kunci akses AWS, Twilio, SendGrid, Mailgun), kunci privat / JWT,
  string koneksi yang memuat kredensial (`mongodb://user:pass@...`, dan
  sebagainya), serta pola umum nilai header
  `Authorization`/`x-api-key`/`api-key`/`apikey`. Kunci berbentuk header
  (`authorization`, `x-api-key`, `api-key`, `apikey`) disamarkan secara
  struktural (hanya nilainya, sementara prefiks skema seperti
  `Bearer `/`Basic ` dipertahankan), bukan melalui regex teks generik.
- Guardrail tidak pernah memblokir; guardrail hanya menulis ulang
  (`modifiedPayload` / `modifiedResponse`) dan menambahkan anotasi
  (`meta.credentialsRedacted`, `meta.count`).

Guard regresi: `tests/unit/credential-masker-guardrail.test.ts`.

## Kontrak Dasar (`base.ts`)

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
  block?: boolean; // true menghentikan rantai secara langsung
  message?: string; // ditampilkan saat pemblokiran
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // dikembalikan oleh preCall untuk menulis ulang permintaan
  modifiedResponse?: TValue; // dikembalikan oleh postCall untuk menulis ulang respons
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

Sebuah guardrail menandakan "tidak ada perubahan" dengan mengembalikan `void`, `{}`, atau
`{ block: false }`. Mengembalikan `modifiedPayload`/`modifiedResponse` akan menggantikan
nilai yang diteruskan melalui rantai untuk guardrail berikutnya.
`signal?: AbortSignal` membawa siklus hidup pemanggil ke dalam guardrail. Pembatalan permintaan merupakan pengecualian fail-open yang disengaja: penghubung media menghentikan pekerjaan dan melakukan pembersihan tanpa memulihkan media mentah ke target yang diketahui tidak mendukungnya.

## Registri (`registry.ts`)

Singleton `guardrailRegistry` menyediakan:

- `register(guardrail)` — menambahkan (atau mengganti berdasarkan nama yang dinormalisasi) sebuah guardrail dan
  mengurutkan ulang berdasarkan `priority` secara menaik.
- `clear()` / `list()` — utilitas administratif.
- `runPreCallHooks(payload, context)` — mengiterasi guardrail aktif, meneruskan
  payload melalui `modifiedPayload`, dan berhenti pada `block: true` pertama.
- `runPostCallHooks(response, context)` — alur yang sama pada sisi respons.
- `resetGuardrailsForTests({ registerDefaults })` — menghapus status dan secara opsional
  mendaftarkan ulang guardrail default untuk isolasi pengujian yang bersih.

Kedua runner mengembalikan `{ blocked, payload|response, results, guardrail?, message? }`
dengan `results` berupa array rekaman `GuardrailExecutionResult` yang menyertakan
kolom `blocked`, `skipped`, `modified`, `error`, dan `meta` untuk setiap guardrail,
yang berguna untuk penelusuran.

### Menonaktifkan Guardrail Per Permintaan

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` mengumpulkan daftar
nama guardrail tanpa duplikat yang harus dilewati untuk permintaan saat ini.
Sumbernya (semuanya opsional dan digabungkan):

- `apiKeyInfo.disabledGuardrails`
- `disabledGuardrails` pada isi permintaan (tingkat teratas)
- `metadata.disabledGuardrails` pada isi permintaan
- Header `x-omniroute-disabled-guardrails` (atau versi lama
  `x-disabled-guardrails`)

Nilai dapat berupa array string atau string yang dipisahkan koma; nama
dinormalisasi menjadi kebab-case huruf kecil (`pii_masker` → `pii-masker`). Hasilnya
diteruskan melalui `context.disabledGuardrails` ke registri, yang melewati
guardrail yang cocok (`skipped: true` dalam `results`).

## Urutan Eksekusi

Untuk setiap permintaan yang mengalir melalui `src/sse/handlers/chat.ts` dan
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` membuat daftar lewati berdasarkan kunci API, body,
   dan header.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` menjalankan guardrail dalam urutan
   prioritas menaik:
   - Guardrail yang dinonaktifkan dicatat sebagai `skipped`.
   - `preCall` setiap guardrail dapat menulis ulang payload melalui `modifiedPayload`.
   - `block: true` pertama menghentikan rantai lebih awal dan handler mengembalikan
     respons penolakan guardrail.
3. Payload (yang mungkin telah ditulis ulang) diteruskan ke perutean kombo dan pengiriman
   ke upstream.
4. Setelah respons disusun, `guardrailRegistry.runPostCallHooks(...)`
   menjalankan rantai yang sama pada respons. `block: true` di sini membuang respons
   upstream.

Guardrail yang melempar pengecualian dicatat dengan `error: <message>` dan dicatat dalam log melalui
`logger.warn`, tetapi rantai tetap berlanjut — secara desain tetap terbuka saat terjadi kegagalan.

## Konfigurasi

Variabel lingkungan yang dibaca oleh guardrail bawaan:

| Variabel                              | Digunakan oleh            | Efek                                                                                                         |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Atur ke `false` untuk menonaktifkan deteksi sepenuhnya.                                                      |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Kebijakan injeksi: `warn`, `block`, atau `log`. Nilai lama `redact` tidak menulis ulang teks injeksi.        |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Mode untuk guard injeksi; juga merupakan flag fitur DB yang **menggantikan** variabel lingkungan (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Tingkat keparahan minimum yang ditolak oleh `MODE=block`: `high` (bawaan), `medium`, atau `low`.             |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Alias lama untuk `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                          |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Jika `true`, PII dalam permintaan disamarkan (tidak bergantung pada mode injeksi).                           |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Mengontrol perilaku masker pada sisi respons.                                                                |

Guardrail Modality Bridge membaca konfigurasi runtime dari penyimpanan pengaturan
berbasis DB (`getSettings()`), bukan dari variabel lingkungan. Kunci utama Vision adalah
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, dan
`modalityBridgeCacheMaxEntries`. Kunci lama
`visionBridge*` hanya diterima sebagai fallback pembacaan satu siklus yang telah didokumentasikan;
penulisan dari dasbor menggunakan kunci utama. Nilai bawaan dan resolver fallback
berada di `src/shared/constants/modalityBridgeDefaults.ts`, dengan konstanta lama
tetap dipertahankan di `src/shared/constants/visionBridgeDefaults.ts`.

Audio menggunakan `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, dan `modalityBridgeAudioMaxClips`, ditambah pengaturan
bersama `modalityBridgeCache*`. Audio tidak memiliki fallback kunci lama karena kunci-kunci
ini diperkenalkan bersama skema Modality Bridge.

Video menggunakan `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, dan
`modalityBridgeVideoTimeout`, ditambah pengaturan bersama `modalityBridgeCache*`.
Fitur ini dinonaktifkan secara bawaan karena FFmpeg/ffprobe merupakan dependensi operasional
opsional dan pemberian keterangan pada frame menambah latensi serta biaya model.

## Guardrail Kustom

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Anggaran harian terlampaui" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Langkah-langkah:

1. Buat `src/lib/guardrails/myGuardrail.ts` yang memperluas `BaseGuardrail`.
2. Implementasikan `preCall` dan/atau `postCall`.
3. Daftarkan saat impor (tambahkan dari `registerDefaultGuardrails`) atau
   panggil `guardrailRegistry.register(...)` saat runtime — registry akan mengganti
   guardrail sebelumnya yang memiliki nama ternormalisasi yang sama.
4. Tambahkan pengujian di bawah `tests/unit/` (contoh yang tersedia:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Pengujian

Gunakan `resetGuardrailsForTests()` di antara pengujian agar dimulai dari keadaan yang diketahui.
Berikan `{ registerDefaults: false }` untuk memulai dengan registry kosong dan
hanya mendaftarkan guardrail yang sedang diuji. Vision Bridge menerima injeksi dependensi
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge menyediakan titik injeksi
yang setara untuk pengaturan, kapabilitas, pemilihan model STT, pemeriksaan kredensial,
dan transkripsi. Dengan demikian, pengujian dapat menjalankan kedua alur tanpa akses DB
atau jaringan.

## Lihat Juga

- `src/lib/guardrails/` — implementasi
- `src/shared/utils/inputSanitizer.ts` — detektor bersama yang mendukung
  injeksi prompt dan penyamaran PII
- `src/shared/constants/visionBridgeDefaults.ts` — nilai default Vision Bridge dan
  daftar model forced-bridge
- `src/shared/constants/modalityBridgeDefaults.ts` — nilai default runtime bersama Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — lapisan ortogonal (circuit breaker, cooldown)
- `docs/reference/ENVIRONMENT.md` — referensi lengkap variabel lingkungan

## Cakupan rute injection-guard & red-team (Fase 8 · Blok D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) mencakup semua rute
yang menerima prompt pengguna. Guard ini mematuhi `INJECTION_GUARD_MODE` (nilai default `warn` = hanya mencatat log;
`block` = mengembalikan HTTP 400 `SECURITY_001`).

| Jenis           | Rute                                                                                                                                                 | Mode default |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Teks (tersedia) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn         |
| Generatif       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn         |
| Data            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn         |

Ekstraksi teks (`extractMessageContents`) mencakup `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (setiap malam, `nightly-llm-security.yml`):** promptfoo memvalidasi bahwa setiap rute memblokir
korpus OWASP-LLM dalam `INJECTION_GUARD_MODE=block`; garak menjalankan probe (dilewati tanpa secret).
`moderations` disertakan untuk konsistensi — operator dalam mode blokir dapat mengecualikannya melalui
`resolveDisabledGuardrails`.

Workflow setiap malam (`.github/workflows/nightly-llm-security.yml`, cron + dispatch
manual) memiliki dua job:

- **`promptfoo-guard` (memblokir)** — menjalankan `promptfoo eval -c promptfooconfig.yaml`
  dengan `INJECTION_GUARD_MODE=block`. Setiap kasus adversarial (misalnya "abaikan semua
  instruksi sebelumnya…", jailbreak bergaya DAN) memastikan respons memuat
  `error.code === "SECURITY_001"`, yaitu guard benar-benar menolak permintaan tersebut.
- **`garak` (advisory)** — menjalankan garak `--probes promptinject,dan,leakreplay`
  terhadap instans OmniRoute lokal (`http://localhost:20128/v1`). Bergantung pada
  secret penyedia (`PROMPTFOO_PROVIDER_KEY`); dilewati dengan baik jika tidak tersedia dan diberi akhiran
  `|| true`, sehingga job ini melaporkan hasil tanpa menggagalkan CI.

Cakupan helper guard (`createInjectionGuard` / `withInjectionGuard`)
meliputi setiap rute `/v1` yang memuat prompt; teks prompt diambil dari
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` oleh
`extractMessageContents()` di `src/shared/utils/inputSanitizer.ts`.
