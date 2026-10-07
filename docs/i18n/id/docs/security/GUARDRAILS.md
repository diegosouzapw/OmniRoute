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

Registri secara otomatis memuat enam guardrail dalam urutan prioritas saat diimpor
(lihat `registry.ts` → `registerDefaultGuardrails()`):

| Prioritas | Nama                | Tahap(s)       | Berkas                |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nomor prioritas yang lebih rendah berjalan **lebih dulu**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Mencegat permintaan yang mengandung gambar yang ditujukan untuk **model non-visi** dan
mengalihkan seluruh permintaan ke model yang mampu visi atau mengganti bagian
gambar dengan deskripsi teks yang dihasilkan oleh model visi yang dapat
dikonfigurasi sebelum panggilan upstream. Ini memungkinkan penyedia khusus teks
untuk secara transparan menangani payload multimodal.

Alur:

1. Lewati jika model target sudah mendukung visi (kecuali jika muncul dalam
   daftar bridge paksa `isVisionBridgeForcedModel`).
2. Ekstrak bagian gambar melalui `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), yang mendelegasikan ke **detektor media
   terpadu** `detectMediaParts()` di `open-sse/utils/mediaParts.ts` — satu-satunya
   sumber kebenaran yang dibagikan dengan filter kompatibilitas kombo.
   Ekstraksi diizinkan untuk bagian tingkat atas dari bentuk
   `replaceImageParts` yang dapat disambungkan kembali (kontrak ekstrak↔ganti):
   OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"`, dan Responses API `input_image`. Hit bersarang dan
   bentuk indikator-saja adalah materi filter kombo dan tidak pernah
   diekstrak. Lewati jika tidak ditemukan.
3. Selesaikan konfigurasi runtime melalui `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): kunci pengaturan
   `modalityBridge*` yang baru menang; kunci `visionBridge*` lama tetap menjadi
   **fallback satu siklus** (jendela rollback). Lewati sebelum traversal media
   apa pun saat bridge dinonaktifkan.
4. Pemilih mode (`modalityBridgeVisionMode`, lihat tabel di bawah) memutuskan
   pengalihan vs deskripsi. Pengalihan mengembalikan `modifiedPayload` hanya
   dengan `model` yang ditukar, ditambah meta `{ rerouted, fromModel, toModel,
imagesKept }`.
5. Jalur deskripsi: batasi gambar pada `maxImages`, susun prompt yang sadar
   tugas, konsultasikan cache deskripsi, panggil model visi **secara paralel**
   (`Promise.allSettled`), dan suntikkan bagian teks `[Image N]: <description>`
   di tempatnya. Deskripsi yang gagal menghasilkan `null` dan bagian gambar
   asli **dipertahankan** (#4012) — kecuali pada jalur deskripsi kombo ketika
   setiap deskripsi gagal, di mana upstream non-visi yang dikonfirmasi
   mendapatkan stub `(unavailable — no vision-capable provider connected)`
   sebagai gantinya (#8430).
6. Kembalikan `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Pemilih mode (`modalityBridgeVisionMode`)

| Mode       | Default | Perilaku                                                                                                                                                                                                                                                                               |
| ---------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Heuristik lama, tidak tersentuh (#6640/#7204): model non-kombo/`auto/` mengalihkan ke model visi terbaik kecuali model asli sudah memiliki kredensial yang dapat digunakan (kemudian deskripsikan); target kombo selalu deskripsikan.                                                  |
| `describe` |         | Selalu deskripsikan — blok pengalihan dilewati sepenuhnya; model pilihan pengguna selalu menjawab.                                                                                                                                                                                     |
| `reroute`  |         | Paksa pengalihan: penjaga model yang memiliki kredensial dilewati. Penjaga kredensial **target** pengalihan masih berlaku — ketika tidak ada target visi yang dapat digunakan, permintaan jatuh ke deskripsi sehingga gambar mentah tidak pernah mencapai backend khusus teks (#8430). |

Mode paksa memotong **sebelum** heuristik otomatis berjalan; perilaku `auto`
sama persis dengan guardrail pra-PR-1.

#### Prompt deskripsi yang sadar tugas (`modalityBridgeVisionTaskAware`)

Default **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) menambahkan
teks **pesan pengguna terakhir** (dipotong hingga 500 karakter) ke prompt
deskripsi dasar, mengarahkan deskripsi ke apa yang sebenarnya diminta pengguna
(pola codex-vision-proxy) dan meminta model visi untuk menyalin teks yang
terlihat. Dengan flag mati — atau tanpa teks pengguna — prompt dasar digunakan
tanpa perubahan.

Permintaan kompatibel OpenAI dari self-loop deskripsi itu sendiri (`callVisionModelSingle()` di `visionBridgeHelpers.ts`) selalu meminta `image_url.detail: "high"` — tanpa syarat, untuk setiap pemanggil/penyedia, tidak dibatasi oleh sinyal klien apa pun. Pengambilan sampel detail rendah menurunkan akurasi OCR untuk tugas transkripsi teks yang diminta oleh prompt ini, jadi panggilan deskripsi itu sendiri selalu meminta detail tinggi terlepas dari tingkat detail yang digunakan oleh permintaan masuk asli. Ini hanya memengaruhi badan permintaan deskripsi internal; ini tidak mengubah cara OmniRoute meneruskan `image_url.detail` milik pemanggil pada permintaan utama — default tersebut diterapkan secara terpisah, dan hanya untuk klien OpenCode yang terdeteksi, di `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Cabang format-kabel Anthropic dari self-loop deskripsi tidak memiliki bidang `detail` dan tidak terpengaruh oleh salah satu default tersebut.

#### Batas keluaran deskripsi (`modalityBridgeVisionMaxChars`)

| Kunci                          | Default | Rentang            |
| :----------------------------- | :------ | :----------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` atau 100–50000 |

`0` (default) berarti **tanpa batas** — deskripsi yang dikembalikan oleh `callVisionModel()` diteruskan tanpa modifikasi, mempertahankan perilaku yang ada. Nilai apa pun dalam rentang 100–50000 memotong deskripsi dengan sufiks `…` sebelum disambungkan kembali sebagai `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` di `src/lib/guardrails/visionBridge.ts`). Tingkatkan ini untuk tugas OCR yang membutuhkan detail tinggi di mana model hilir membutuhkan transkripsi lengkap; turunkan untuk membatasi penggunaan token pada model visi yang banyak bicara. Bidang dasbor berada di panel Lanjutan tab Visi (`modality-bridge-max-chars` di `ModalityBridgeVisionTab.tsx`) dan membatasi nilai apa pun antara 1 dan 99 hingga batas bawah 100 sambil membiarkan `0` eksplisit tidak tersentuh — `0` adalah nilai Zod yang valid dengan sendirinya (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), bukan hanya default "tidak diatur".

#### Cache deskripsi (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dalam memori untuk keluaran deskripsi, dibagikan di seluruh proses. Kunci = `sha256(imageRef + composedPrompt + configuredBridgeModel)` dengan pembingkaian awalan panjang (tidak ada tabrakan batas bidang). Komponen model adalah model bridge yang **dikonfigurasi**, bukan model yang benar-benar menjawab — `callVisionModel` dapat melakukan fallback secara internal, dan penguncian per percobaan akan memecah cache. Deskripsi yang gagal tidak pernah di-cache. Pengaturan:

| Kunci                           | Default | Rentang |
| :------------------------------ | :------ | :------ |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Normalisasi gambar jarak jauh (self-loop describe/base64 fetch)

Ketika bridge mengambil gambar **jarak jauh** itu sendiri — panggilan mandiri deskripsi Anthropic dan konversi base64 format-kabel claude (`ensureBase64ImagesForClaudeWire`), keduanya melalui `fetchRemoteImageAsDataUri()` di `visionBridgeHelpers.ts` — URI data yang dihasilkan dilewatkan melalui `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) sebelum disematkan dalam permintaan model visi. Gambar berukuran besar di-downscale ke **sisi panjang 2048px** (sesuai dengan batas ukuran yang sudah diterapkan OpenAI/Anthropic di sisi server), yang mengurangi byte/latensi unggahan tanpa mengubah apa yang dilihat model visi. Pengubahan ukuran menggunakan `sharp`, dimuat melalui impor dinamis: pada platform di mana biner natifnya gagal dimuat, `normalizeDataUri()` **tidak pernah memunculkan error** — ia kembali ke penerusan byte asli, sehingga jalur konversi deskripsi/base64 selalu berfungsi. Byte non-gambar (pengambilan yang tidak mengembalikan gambar yang dapat didekode) juga diteruskan tanpa tersentuh. Normalisasi ini terbatas pada gambar yang diambil bridge untuk panggilan mandirinya sendiri — ini tidak pernah diterapkan pada payload passthrough mentah pemanggil, konsisten dengan prinsip mutasi hanya-opt-in (Aturan Keras #20).

#### Skema pengaturan + migrasi

Kunci `modalityBridge*` yang baru divalidasi Zod di `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*`, dan grup `modalityBridgeAudio*` yang digunakan oleh Audio Bridge. Migrasi `141_modality_bridge_settings.sql` menyalin nilai `visionBridge*` lama yang ada ke kunci baru yang cocok (idempoten, tidak pernah menimpa nilai `modalityBridge*` yang diatur operator); kunci lama tetap diterima sebagai fallback baca untuk satu siklus rilis.

#### Header transparansi + statistik

Respons yang diubah deskripsi membawa `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (dibangun oleh `buildModalityBridgeHeader()` di `modalityBridge/bridgeStats.ts`, dicap oleh `withModalityBridgeHeader()` di `src/sse/handlers/chatHelpers.ts`). Permintaan yang dialihkan **tidak** mendapatkan header — payload tidak tersentuh dan pertukaran model sudah terlihat di bidang `model` pada badan respons.

`GET /api/modality-bridge/stats` (autentikasi manajemen, tingkat yang sama dengan `GET /api/settings`) mengembalikan penghitung per-modalitas dalam memori `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` untuk `vision`, `audio`, dan `video`. `averageLatencyMs` menggunakan `latencySamples`, bukan semua percobaan, sebagai penyebutnya; operasi tanpa pengaturan waktu tidak membuat sampel nol-milidetik. `bridged` tetap menjadi alias yang kompatibel ke belakang untuk konversi yang berhasil; percobaan yang gagal tidak meningkatkannya. Penghitung diatur ulang saat proses dimulai ulang sesuai desain (telemetri, bukan akuntansi).

#### Konfigurasi dasbor

Halaman dasbor khusus adalah
`/dashboard/settings/modality-bridge`. Tab `Vision`, `Audio`,
dan `Video` yang dapat diakses melalui URL-nya mempertahankan parameter kueri saat mengganti nilai `tab`.
Tab Vision menampilkan pengaktifan, mode, pemilihan model (termasuk default otomatis), _prompting_ yang sadar tugas, batas waktu habis/gambar/panjang deskripsi/cache lanjutan, penghitung waktu proses, dan permintaan sampel yang dijaga. Tab Audio juga aktif: menampilkan pengaktifan, pemilih model khusus STT dengan Otomatis, batas waktu habis/klip maksimum, penghitung audio, dan tes sampel `input_audio`. Tab Video fungsional: melaporkan status waktu proses FFmpeg/ffprobe — salah satu dari empat status UI eksplisit (`unknown` saat probe sedang berjalan atau tidak dapat diselesaikan, `restricted` pada host dasbor non-loopback di mana probe dilewati di sisi klien, `unavailable` setelah diprobing dan dikonfirmasi tidak ada, atau `available` dengan versi FFmpeg/ffprobe) — mempertahankan batas aktifkan/model/bingkai/video/waktu habis, memfilter pemilih model ke model yang mampu visi, dan menampilkan penghitung video.

Kartu Vision Bridge sebelumnya di bawah pengaturan AI adalah tautan kompatibilitas ke halaman baru; tidak lagi memiliki salinan kedua dari formulir. Penyedia Media juga menautkan alur kerja Image-to-Text dan Speech-to-Text ke tab Modality Bridge yang sesuai tanpa menghapus _playground_ Speech-to-Text yang sudah ada.

**Bypass Penerimaan Self-loop:** ketika panggilan deskripsi merutekan melalui self-loop `/v1` OmniRoute sendiri (model penyedia non-standar), sub-permintaan mengirimkan
`x-omniroute-admission-bypass: internal` dan diautentikasi dengan kredensial self-loop yang telah diselesaikan — _sentinel_ `sk_omniroute` lokal dalam mode lokal, atau kunci _env_ `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` yang dikonfigurasi operator (#1350) sehingga _deployment_ `REQUIRE_API_KEY=true` masih dapat menjalankan panggilan deskripsi. Bypass hanya dihormati untuk kredensial yang tepat tersebut, sehingga klien eksternal tidak dapat menggunakan _header_ untuk melewati penerimaan.

Default lama berada di `src/shared/constants/visionBridgeDefaults.ts`;
default mode/sadar tugas/cache baru dan _resolver_ pengaturan berada di
`src/shared/constants/modalityBridgeDefaults.ts`. _Guardrail_ menampilkan opsi konstruktor `deps` sehingga pengujian dapat menyuntikkan implementasi `getSettings` dan `callVisionModel` palsu.

### Jembatan Audio (`audioBridge.ts`) — Modality Bridge PR-3

Mencegat permintaan obrolan yang mengandung audio sebelum mencapai target yang tidak diketahui menerima input audio. Ini tidak pernah merutekan ulang permintaan obrolan: bagian audio ditranskripsikan melalui _endpoint multipart_ yang kompatibel dengan OpenAI yang sudah ada dan model obrolan yang dipilih melanjutkan dengan transkrip teks.

Alur:

1.  Selesaikan `supportsAudio` melalui `getResolvedModelCapabilities()`. Metadata registri penyedia eksplisit menang, kemudian metadata model statis, kemudian `modalities_input` yang disinkronkan. Daftar input yang dideklarasikan tanpa audio adalah `false`; tidak ada bukti kapabilitas yang tersisa `null`. Baik `false` maupun `null` mengaktifkan jembatan konservatif, sementara `true` melewatinya.
2.  Selesaikan pengaturan `modalityBridgeAudio*` dan ekstrak bagian audio tingkat atas yang dapat disambung dari setiap pesan melalui detektor `detectMediaParts()` bersama. Bentuk _wire_ yang didukung adalah OpenAI `input_audio`, `audio_url`, dan `source.media_type: "audio/*"`. Audio bersarang terdeteksi untuk perutean tetapi tidak dihapus oleh jalur sambungan. Pekerjaan dibatasi oleh `modalityBridgeAudioMaxClips`; bagian selanjutnya tetap tidak tersentuh.
3.  Hormati `provider/model` yang dikonfigurasi, atau biarkan `selectAudioBridgeModel()` menelusuri `AUDIO_TRANSCRIPTION_PROVIDERS` dalam urutan katalog stabil dan pilih model pertama dengan kredensial penyedia aktif yang dapat digunakan.
4.  `callAudioTranscription()` mengonversi audio base64/data-URI ke file _multipart_, atau mengunduh `audio_url` jarak jauh melalui _guard outbound_ khusus publik dengan _DNS pinning_ dan batas 25 MB. Kemudian POST file dan model yang dipilih ke self-loop `/v1/audio/transcriptions` lokal, diautentikasi dengan `resolveSelfLoopBearer()`. Rute transkripsi yang ada melakukan pencarian kredensial normal, penanganan _cooldown/rate-limit_, dan pengiriman penyedia.
5.  Panggilan yang berhasil mengganti bagiannya dengan `[Audio N]: <transcript>`. Panggilan berjalan dengan `Promise.allSettled`: kegagalan individu mempertahankan bagian audio asli tersebut (kontrak #4012). Jika setiap panggilan gagal dan target terbukti `supportsAudio === false`, bagian-bagiannya menjadi `[Audio N]: (tidak tersedia — tidak ada penyedia STT yang terhubung)` (kontrak #8430). Untuk target yang tidak diketahui (`null`), hasil semua kegagalan tetap tidak tersentuh. Target khusus teks yang terbukti tanpa kredensial STT yang dapat digunakan menerima _stub_ eksplisit yang sama tanpa mengeluarkan panggilan jaringan.

Transkrip yang berhasil menggunakan cache LRU/TTL Modality Bridge di seluruh proses. Kunci menggabungkan referensi audio, label operasi transkripsi audio yang stabil, dan model STT yang dipilih; kegagalan tidak pernah di-cache. Upaya audio memperbarui penghitung `bridged`, `cacheHits`, `failures`, dan `lastUsedAt` yang dibagikan. Respons yang diubah membawa
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; permintaan yang tidak tersentuh tidak menerima segmen Jembatan Audio.

Pengaturan waktu proses didukung oleh DB dan divalidasi Zod:

| Kunci                         | Default | Rentang              |
| :---------------------------- | :------ | :------------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                    |
| `modalityBridgeAudioModel`    | `""`    | Otomatis atau ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000          |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10                 |

Cache bersama tetap dikendalikan oleh `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, dan `modalityBridgeCacheMaxEntries`.

### Jembatan Video (`videoBridge.ts`, `videoBridgePipeline.ts`)

Mencegat bagian video tingkat atas dalam `messages` Chat Completions dan `input` API Responses sebelum target tanpa dukungan video native yang diketahui dipanggil.
Bentuk yang didukung adalah `input_video`, `video_url`, `video_source`, URL HTTPS, dan URI data `data:video/*;base64,...`. Nama file biasa dalam teks tidak diperlakukan sebagai video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) memiliki traversal permintaan, pemeriksaan kapabilitas/kebijakan, agregasi per permintaan, dan payload respons.
Pekerjaan per video — akuisisi, cache hasil keseluruhan, mendeskripsikan urutan frame (yang menggabungkan transkrip audio yang dideklarasikan pemanggil), dan metrik/pembatalan/pembersihan per percobaan — disembunyikan di balik `processVideoPart` dalam `videoBridgePipeline.ts`, dipanggil sekali per bagian video di dalam loop `preCall`.
Modul tersebut juga mendefinisikan batas port eksplisit `VideoMediaBrokerPort` (mengakuisisi byte dan mengekstrak frame yang disampel), `VideoAudioTranscriptionPort` (menggabungkan transkrip audio yang dideklarasikan pemanggil dengan keterangan yang disampel), dan `VideoDrilldownPort` (batas persistensi drill-down frame; belum terhubung ke `processVideoPart` — hanya rute `/api/modality-bridge/video/drilldown` yang terpisah yang menulis entri drill-down saat ini).

Jalur permintaan publik `/v1` tidak pernah mengimpor atau memanggil subproses. Video jarak jauh diunduh di bawah batas 50 MiB; video base64 inline memiliki batas per video yang didekodekan secara konservatif 36 MiB sehingga model/pesan/amplop pembingkaian dapat tetap berada di dalam batas penerimaan permintaan JSON publik sebesar 50 MiB. Estimasi panjang inline dan ukuran yang didekodekan diperiksa sebelum alokasi. HTTPS diperlukan pada URL jarak jauh awal dan setiap pengalihan, menggunakan penjaga keluar khusus publik yang ada dengan penyematan DNS. Byte kemudian melintasi batas broker internal `POST /api/modality-bridge/video/extract` yang tepat. Rute tersebut bersifat `LOCAL_ONLY` dan `SPAWN_CAPABLE`, hanya menerima permintaan loopback terpercaya yang diautentikasi per proses, dan tidak pernah menerima URL, jalur sistem file, executable, atau daftar argumen. Pipeline ukuran badan API dan pembaca badan inkremental handler secara independen memberlakukan batas input broker 50 MiB. Antrean terbatasnya menjalankan satu ekstraksi pada satu waktu, memungkinkan empat pekerjaan yang tertunda, dan membatasi input yang tertunda pada 100 MiB.

Di dalam broker, `ffprobe` membaca file lokal pribadi; daftar format yang diizinkan yang tetap mengecualikan format playlist dan manifest. Untuk kontainer keluarga MOV yang diizinkan, referensi data MOV eksternal tetap dinonaktifkan secara default, dan perintah tetap tidak memilih untuk menggunakannya. Baik `ffprobe` maupun `ffmpeg` menggunakan daftar putih protokol khusus `file`, satu thread, array argumen tetap, tanpa shell, dan executable yang diselesaikan dari `PATH`. Stream sampul gambar terlampir bukan kandidat yang dapat diputar. Semua stream yang dapat diputar harus memenuhi batas, dan stream default eksplisit lebih diutamakan sebelum fallback indeks terendah yang deterministik. Video dibatasi hingga 600 detik, 8.192 piksel per dimensi, dan 33.554.432 piksel sumber. FFmpeg mengambil sampel 1–16 frame JPEG titik tengah, menurunkan sisi panjang menjadi paling banyak 1.024 piksel tanpa meningkatkan input yang lebih kecil, dan tidak pernah menerima URL. Pengambilan sampel adalah `uniform` secara default. Kebijakan `scene_aware` opsional dan `segment_aware` eksperimental melakukan satu pass FFmpeg tetap tambahan pada stream lokal yang sudah divalidasi, memilih stempel waktu adegan `showinfo` yang terbatas, dan kembali secara deterministik ke titik tengah seragam yang sama pada kegagalan detektor, batas waktu, output yang salah format, atau set kandidat kosong. Mode sadar segmen mengalokasikan sampel titik tengah secara proporsional dengan interval adegan yang divalidasi; bukti sadar segmen dan perilaku fallback dirinci di bawah ini. Batas keras 16-frame diterapkan setelah pemilihan di setiap kebijakan. Ketika permintaan sadar adegan hanya memiliki anggaran satu frame, ia menggunakan titik tengah seragam dari jendela video penuh atau fokus aktif dan melaporkan `policyEffective: uniform`: satu frame adegan yang dipilih tidak dapat mempertahankan kedua ujung temporal. Pemanggil dapat secara opsional menyediakan jendela fokus terbatas (detik `start`/`end`); batas-batas dijepit ke durasi media, jendela terbalik atau tidak terbatas ditolak, dan semua kebijakan pengambilan sampel dilakukan hanya di dalam interval yang dinormalisasi. Jendela yang dihasilkan disertakan dalam metadata pengambilan sampel dan dalam prefiks deskripsi yang tidak tepercaya sehingga model hilir dapat membedakan kutipan yang difokuskan dari garis waktu penuh.

Fokus keterangan semantik adalah pengaturan terpisah yang eksplisit. Mode analisis `full` default mempertahankan prompt frame yang ada dan tidak pernah meneruskan teks permintaan ke model keterangan. Dalam mode `focused`, bridge hanya membaca `text`/`input_text` terbaru yang tidak kosong yang dibuat pengguna dari kontainer Chat atau Responses yang sama, menormalkannya ke NFC, menggabungkan karakter kontrol dan spasi, dan membatasinya hingga 500 titik kode Unicode. Hasil kosong akan kembali ke prompt `full` yang tepat. Petunjuk yang dapat digunakan diserialkan sebagai JSON dalam blok konteks pengguna yang tidak tepercaya yang didedikasikan dan hanya dapat memprioritaskan detail yang dapat diamati; ia tidak dapat mengesampingkan peringatan terpisah terhadap mengikuti instruksi yang terlihat atau terdengar di media. Fokus tekstual tidak pernah menyimpulkan `start`/`end` atau mengubah sampler temporal.

#### FU-07 bukti segmen struktural

`segment_aware` menggunakan satu pass pra-analisis terbatas pada stream video lokal yang sudah divalidasi. Rantai filter tetap pertama-tama menskalakan hingga paling banyak 320 piksel lebar, mendeteksi perubahan adegan dan interval beku, kemudian mengambil sampel pada 1 frame per detik untuk blur, luma rata-rata, dan informasi spasial/temporal. Pass ini dibatasi hingga 600 sampel struktural, satu thread FFmpeg/filter, daftar putih protokol dan kontainer khusus `file` yang sama, batas output proses 1 MiB, dan paling banyak 30 detik di dalam batas waktu/pembatalan bersama broker. Ia tidak pernah menerima perintah, filter, jalur, atau URL dari permintaan.

Nilai-nilai struktural adalah bukti pengambilan sampel deterministik, bukan pemahaman video semantik. Nilai-nilai tersebut tidak menyimpulkan subjek, tindakan, keterangan, ucapan, atau maksud pengguna. Batas adegan dan pembekuan membentuk segmen; cakupan pembekuan, keburaman, eksposur, detail spasial, dan perubahan temporal hanya memengaruhi bagaimana anggaran 1–16 bingkai yang ada dialokasikan. Segmen yang sepenuhnya beku dibatasi pada satu bingkai, sementara segmen yang tidak beku bersaing untuk anggaran yang tersisa. Ketika batas melebihi jumlah bingkai, cakupan garis waktu yang seragam dipertahankan sehingga potongan awal yang cepat tidak dapat menyembunyikan segmen akhir yang panjang. Batas adegan dalam resolusi analisis 1 detik dari batas pembekuan digabungkan.

Filter yang hilang, bukti yang salah/kosong, kesalahan detektor, atau batas waktu pra-analisis yang terikat akan gagal terbuka ke kebijakan titik tengah seragam yang tepat. Pembatalan pemanggil atau tenggat waktu broker tidak gagal terbuka: itu mengakhiri subproses yang sedang berjalan, mencegah ekstraksi bingkai selanjutnya, dan pohon sementara pribadi dihapus di `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` menghasilkan fixture FFmpeg nyata yang deterministik untuk penghematan panggilan keterangan pasca-deduplikasi, alokasi anggaran gerakan padat, bukti blur/eksposur/SI-TI, potongan cepat dengan ekor panjang, dan positif palsu pudar bertahap. Ini mencatat waktu dinding pra-analisis dan, jika `/usr/bin/time` tersedia, CPU anak dan RSS puncak. Pemeriksaan kualitasnya hanyalah orakel struktural. Kualitas model keterangan nyata tetap `HOLD` karena harness ini tidak memiliki titik akhir yang sah atau juri yang beku. Penghematan moneter juga tetap `HOLD` kecuali `--caption-cost-per-call-usd` menyediakan estimasi per-panggilan positif yang eksplisit; skrip tidak pernah mengarang salah satu hasilnya.

Setiap bingkai dibatasi hingga 4 MiB, semua bingkai mentah bersama-sama hingga 23 MiB, dan respons broker yang diserialkan hingga 32 MiB. Direktori sementara pribadi dihapus di `finally`. OmniRoute tidak menggabungkan FFmpeg dan tidak menerima jalur eksekusi kustom. Sebelum pembuatan keterangan, bridge menerapkan proses deduplikasi visual konservatif: setiap JPEG dikurangi menjadi buffer skala abu-abu 16×16 dan hanya dibandingkan dengan bingkai terakhir yang dipertahankan. Untuk anggaran keterangan yang diminta di atas satu bingkai, ekstraksi menyediakan kumpulan kandidat terbatas hingga dua kali lipat anggaran tersebut dan tidak pernah lebih dari 16 bingkai. Batas yang diminta diterapkan hanya setelah deduplikasi, dengan kandidat pertama dan terakhir yang dipilih dipertahankan selama penipisan akhir ketika anggaran setidaknya dua. Kebijakan `grayscale-16x16-mean-cells-v2` yang diberi versi menggunakan nilai yang lebih besar antara delta luma rata-rata dan rasio sel thumbnail yang delta normalisasinya setidaknya 0.05. Ambang batas duplikat adalah konstanta 0.04, dipilih untuk prediktabilitas daripada diekspos sebagai pengaturan runtime. Sinyal kontras tinggi sekunder ini mempertahankan gerakan kecil dan perubahan teks yang terlihat yang dapat disembunyikan oleh perbandingan hanya rata-rata. Kesalahan komparator atau dekoder gagal terbuka dan mempertahankan cakupan. Metadata keluaran memisahkan kandidat yang diekstraksi, bingkai yang berhasil digunakan, dan duplikat visual yang dibuang.

Bagian video yang ditandai secara eksplisit dapat meminta lembar kontak berstempel waktu. Bridge membangun paling banyak grid JPEG 4 kolom, 16 bingkai. Setiap sel 512 piksel membakar stempel waktu sumbernya ke dalam pita bawah berkontras tinggi, sementara stempel waktu yang sama tetap ada dalam metadata tekstual untuk asosiasi dan audit hilir. JPEG lengkap tetap dibatasi pada 32 MiB. Jika `sharp` tidak dapat mendekode atau menyusun grid, bridge akan kembali ke bingkai JPEG individual; pembatalan klien masih menyebar melalui operasi lembar.

Bukti promosi sengaja dipisahkan dari microbenchmark komposisi sintetis. `scripts/perf/video-bridge-contact-sheet-eval.ts` mendefinisikan harness A/B versi skema untuk model visi yang kompatibel dengan OpenAI nyata. Ini mengukur token yang dilaporkan penyedia, latensi dinding ujung-ke-ujung (termasuk komposisi lembar), jumlah panggilan model, dan retensi fakta yang ditentukan manifes. Respons model mentah tidak ditulis ke laporan; hanya digest SHA-256 dan ID fakta yang cocok yang dipertahankan. Harness tidak melakukan panggilan jaringan atau model berbayar kecuali `--execute-real` dilewatkan dan `--model`, `OMNIROUTE_BASE_URL`, dan `OMNIROUTE_API_KEY` dikonfigurasi. Tanpa eksekusi nyata yang eksplisit itu, putusan yang dapat dibaca mesinnya tetap `HOLD`; pengukuran payload/jumlah panggilan sintetis saja bukanlah bukti promosi.

Pemanggil dapat melampirkan array `transcript.cues` opsional ke bagian video yang didukung ketika mereka sudah memiliki teks yang selaras. Setiap isyarat harus membawa `text`, interval `start`/`end` terbatas di dalam durasi yang diselidiki, dan `source` yang diizinkan (`client`, `embedded`, atau `audio-bridge`); `confidence` secara default adalah `1` dan harus tetap antara `0` dan `1`. Isyarat duplikat yang persis sama digabungkan. OmniRoute tidak pernah memulai transkripsi dari metadata ini: isyarat yang divalidasi disalin ke dalam hasil yang dijelaskan dengan sumber, kepercayaan, dan interval, dan dirender sebagai observasi yang tidak tepercaya di samping keterangan bingkai. Teks yang tidak valid, di luar jangkauan, atau tanpa asal ditolak daripada dicampur ke dalam aliran keterangan. Bidang `source` saat ini dideklarasikan oleh pemanggil, bukan diverifikasi oleh server: OmniRoute memberlakukan bahwa nilainya adalah salah satu dari tiga string yang diizinkan, tetapi belum mengonfirmasi secara kriptografis bahwa label `embedded` atau `audio-bridge` benar-benar berasal dari ekstraksi milik server. Perlakukan `source` sebagai petunjuk yang tidak tepercaya sampai verifikasi itu tiba; jangan membangun keputusan otorisasi berdasarkan itu.

Pemanggil tingkat lanjut dapat menyediakan trek `audioTranscript` yang sudah diotorisasi untuk video yang sama. Jalur fusi menjalankan observasi visual dan audio di bawah satu tenggat waktu dan sinyal pembatalan, mengurutkannya pada garis waktu yang sama, menggabungkan duplikat yang persis sama, dan melaporkan hasil parsial ketika hanya satu sisi yang berhasil. `audioTranscript` yang tidak valid akan terdegradasi menjadi hasil parsial tersebut — deskripsi visual tetap dipertahankan dan cabang audio mencatat kode kegagalan yang disanitasi — alih-alih menggagalkan seluruh video. Ketersediaan per-cabang, flag parsial, dan kode kegagalan yang disanitasi dipertahankan dalam hasil yang dijelaskan, dalam metadata guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), dalam metadata cache hasil, dan dalam penghitung fusi jembatan. Jalur Video Bridge default tidak memanggil speech-to-text atau mengunduh salinan media kedua; tanpa trek eksplisit tersebut, ia tetap hanya video.

**Retensi Transkrip (#12150 P1).** Ini berlaku secara otomatis setiap kali Video Bridge (yang bersifat opt-in) merender isyarat transkrip — tidak ada flag retensi terpisah. Ketika sebuah permintaan merender isyarat transkrip apa pun (sebuah `transcript` yang dideklarasikan pemanggil atau `audioTranscript` yang difusikan), guardrail menandainya sebagai `videoBridgeObserved` dan menghasilkan bayangan deskripsi video yang disunting — sebuah rendering identik di mana setiap badan teks bebas isyarat diganti dengan `[redacted-video-transcript]`, dibangun dengan mengganti bidang isyarat terstruktur sebelum string dirakit (tidak pernah dengan mengurai teks yang diratakan, sehingga tidak ada konten isyarat — baik yang bersifat adversarial maupun biasa, termasuk badan yang berisi `]` seperti `[inaudible]`/`[music]` — yang dapat bertahan). Badan permintaan log panggilan yang dipertahankan menukar setiap bagian teks yang berasal dari video dengan bayangan yang disunting tersebut, dicocokkan berdasarkan kesamaan konten; anchor `fullText` dibaca ulang dari payload guardrail pra-panggilan yang selesai, sehingga pencocokan masih berhasil setelah guardrail rantai berikutnya (masker PII dan kredensial, prioritas 10/95) menulis ulang teks deskripsi di tempat dan setelah injeksi system-prompt/handoff/memory membentuk ulang array pesan. Badan yang dikirim ke hulu ke model tidak berubah. Permintaan yang diamati juga tidak mengisi Memori yang tahan lama (ekstraksi yang berasal dari permintaan maupun respons dilewati), sehingga balasan model itu sendiri tidak dapat mengulang teks transkrip ke dalam Memori.

Salinan tambahan yang dipertahankan menggunakan sinyal permintaan yang diamati yang sama. Snapshot permintaan klien pra-guardrail mentah, permintaan tertunda dalam memori, dan log permintaan yang ditolak awal secara struktural mengganti bidang transkrip di bagian video; prompt string yang disintesis oleh tahapan pipeline dan serah terima konteks disunting pada sink badan permintaan yang dipertahankan. Penanda `video_content_removed` yang dipertahankan membuat kelanjutan `previous_response_id` gagal tertutup daripada merekonstruksi teks yang sengaja dibuang. Jika permintaan yang diamati kehilangan bayangan penyuntingan per-bagian sebelum pencatatan, atau bahkan salah satu dari beberapa bayangan video gagal cocok setelah mutasi permintaan berikutnya, badan permintaan yang dipertahankan dihilangkan sepenuhnya alih-alih mempertahankan transkrip yang disunting sebagian.

Untuk permintaan yang diamati, respons model mungkin mengutip bagian mana pun dari transkrip tanpa batas isyarat terstruktur. Oleh karena itu, `responseBody` log panggilan yang dipertahankan diganti dengan penanda penghilangan; artefak pipeline terperinci (yang dapat mencakup badan hulu/klien dan potongan aliran) tidak dipertahankan. Cache semantik, idempoten, dan pemutaran ulang penalaran melewati pembacaan dan penulisan untuk permintaan tersebut. Permintaan penyedia dan respons yang terlihat oleh klien tetap tidak berubah. Byte keepalive awal dikuras dari buffer sementara ketika artefak terperinci dihilangkan. Peringatan EventStream yang salah format dari Kiro hanya melaporkan jumlah byte payload, tidak pernah isinya atau kesalahan mentah parser JSON. Ini tidak mengklaim bahwa setiap diagnostik penyedia/plugin yang tidak terkait telah diaudit; pembersihan sink yang dipertahankan yang lebih luas dilacak di #11658.

Siklus hidup internal `/api/modality-bridge/video/drilldown` adalah substrat cache terpisah, loopback/token-authenticated. Setiap operasi juga memerlukan ID prinsipal buram kanonis. Sebelum pemanggil produksi diaktifkan, ia harus memperoleh ID tersebut dari penyewa yang diautentikasi dan tidak boleh meneruskan nilai yang dipilih klien. Kunci cache mengikat prinsipal tersebut ke ID sesi dan referensi video kanonis, hanya menyimpan kunci yang berasal dari SHA-256, dan membatasi pembacaan serta penghapusan ke prinsipal yang sama. Cache menyimpan paling banyak 16 frame JPEG turunan per entri, kedaluwarsa setelah sepuluh menit, dan mendukung pembacaan `start`/`end` terbatas atau penghapusan sesi eksplisit.

Setiap prinsipal dibatasi hingga 16 entri dan 64 MiB data JPEG kanonis. Batasan tersebut independen dari batas global 64 entri/256 MiB: tekanan kuota prinsipal hanya mengeluarkan entri yang paling jarang digunakan dari prinsipal tersebut sebelum pertimbangan pengeluaran LRU global. Entri yang kedaluwarsa dihapus dari akuntansi prinsipal dan global pada aktivitas cache, sementara pembatalan dan kegagalan validasi tidak melakukan penggantian parsial.

Cache menolak Base64 non-kanonis, padding berlebih, media non-JPEG, JPEG yang salah format atau terpotong, dan JPEG yang menghasilkan peringatan selama dekode `sharp` gambar penuh yang terbatas. Ini mengkode ulang setiap gambar yang diterima sebagai JPEG kanonis, memperoleh lebar dan tinggi dari byte yang didekode alih-alih mempercayai bidang pemanggil, dan membuang byte poliglota yang tersisa daripada mempertahankannya. Hanya buffer terkompresi kanonis terbatas yang dibebankan ke kedua kuota. Batas wire JSON mencakup overhead Base64 untuk batas input yang didekode 32 MiB. Setiap derivasi yang disimpan mencatat format/resolusi JPEG yang divalidasi, kebijakan pengambilan sampel, versi derivasi, waktu pembuatan, hash konten yang dihitung server, dan referensi induk yang di-hash ditambah hash konten induk dari pemanggil tepercaya. Pembatalan diperiksa antara fase dekode/hash asinkron sebelum komit cache atomik.

Tranche ini belum menghubungkan produsen produksi ke rute dan tidak
menyediakan pemilihan varian multi-resolusi. Jalur permintaan Video Bridge yang transparan
oleh karena itu tidak menimbulkan pekerjaan tambahan, sementara derivasi prinsipal yang terikat penyewa dan
siklus hidup multi-resolusi FU-08 penuh tetap menjadi pekerjaan tindak lanjut eksplisit
daripada didokumentasikan sebagai perilaku lengkap.

Bingkai diberi keterangan secara berurutan dengan model Video yang dikonfigurasi. Sebuah
penggantian Video kosong mewarisi pengaturan Vision; jika keduanya kosong, Vision
auto-router memilih model yang mampu melihat secara efektif. Keterangan yang berhasil
mengganti bagian asli dengan awalan `[Video description:` yang stabil yang juga
menandai teks sebagai pengamatan yang berasal dari media yang tidak tepercaya dan memberi tahu
model hilir untuk tidak mengikuti instruksi yang ditemukan di media. Kunci cache keterangan bingkai
mencakup byte JPEG, prompt, stempel waktu, dan model efektif; hanya keterangan yang berhasil
yang di-cache. Entri cache mempertahankan model produsen yang berhasil sebenarnya,
termasuk model fallback; bridge melaporkan `mixed` ketika bingkai yang berbeda
diproduksi oleh model yang berbeda. Cache hit menggunakan kembali identitas produsen tersebut
alih-alih melabelinya ulang sebagai rencana perutean yang diminta. Cache hasil seluruh video
dikunci pada setiap input yang mengubah output — prompt, model efektif,
kebijakan pengambilan sampel, jumlah bingkai, mode analisis semantik,
sidik jari SHA-256 dari petunjuk fokus yang dinormalisasi, jendela fokus, `transcript`,
`audioTranscript`, dan flag lembar kontak — jadi mengubah salah satu dimensi tersebut
adalah cache miss, bukan penggunaan kembali yang usang. Versi kebijakan dedup visual,
ambang batas, dan jumlah bingkai kandidat yang terbatas juga eksplisit dalam kunci dan metadata cache hasil;
perubahan kebijakan oleh karena itu tidak dapat menggunakan kembali deskripsi seluruh video yang usang.
Metadata cache hasil v4 menyimpan mode dan sidik jari, bukan tugas pengguna mentah.
Metadata guardrail melaporkan mode analisis yang diminta dan efektif; mode `focused` yang diminta
tanpa teks pengguna yang dapat digunakan dilaporkan sebagai `full` secara efektif.

Guardrail mengekstrak setiap bagian video yang didukung tetapi tidak menjelaskan lebih dari
`modalityBridgeVideoMaxVideos`. Untuk target yang terbukti memiliki
`supportsVideo === false`, video yang gagal dan melebihi batas menjadi penanda teks aman eksplisit
sehingga tidak ada video mentah yang bertahan. Ketika kemampuan tidak diketahui, bagian-bagian tersebut
tetap tidak tersentuh. Target dengan `supportsVideo === true` melewati bridge.
Sinyal pembatalan permintaan klien menyebar melalui unduhan, antrean broker,
subproses, dan panggilan keterangan; pembatalan berhenti di antara video dan tidak pernah gagal terbuka
ke media mentah.

Pengaturan runtime didukung DB dan divalidasi Zod:

| Kunci                               | Default     | Rentang / perilaku                                                                                                      |
| :---------------------------------- | :---------- | :---------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime opsional, opt-in                                                                                                |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` mempertahankan keterangan generik; `focused` menggunakan konteks pengguna terbaru yang terbatas, tidak tepercaya |
| `modalityBridgeVideoModel`          | `""`        | Mewarisi model Vision Bridge                                                                                            |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                    |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, atau `segment_aware` proporsional; kegagalan detektor kembali ke `uniform`                    |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                     |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                          |

Nilai batas waktu Video yang dipertahankan lama di atas 120 detik dibatasi hingga batas waktu broker;
penulisan pengaturan baru di atas batas tersebut ditolak.
`GET /api/modality-bridge/video/runtime` memerlukan lokalitas loopback yang dicap tepercaya
sebelum otentikasi atau pemeriksaan runtime, kemudian memerlukan otentikasi manajemen.
Ini hanya mengembalikan `available`, versi FFmpeg/ffprobe yang disanitasi, dan alasan tetap
ketika runtime tidak tersedia. Titik akhir ekstraksi internal bukanlah API unggah publik:
kejenuhan antrean mengembalikan `503` ditambah `Retry-After`, pemutusan koneksi pemanggil mengembalikan `499`,
dan batas waktu broker yang tetap mengembalikan `504`. Respons yang dikonversi menambahkan
`video->text;model=<visionModel>;parts=<videos>` ke header `x-omniroute-modality-bridge` pusat
tanpa menghapus segmen Vision atau Audio.

### PII Masker (`piiMasker.ts`)

Berjalan di **kedua** tahap.

- **`preCall`** mengkloning payload, menelusuri `system`, `messages`, `input`, dan
  `prompt` (termasuk item string biasa), dan menerapkan `processPII()` (dari
  `@/shared/utils/inputSanitizer`) ke bidang `content`/`text` string. Ketika
  `PII_REDACTION_ENABLED=true`, PII yang terdeteksi disunting dalam payload keluar.
  Ini tidak tergantung pada `INPUT_SANITIZER_MODE` (yang hanya mengontrol
  kebijakan injeksi prompt). Ketika penyuntingan dimatikan, panggilan mencatat jumlah deteksi
  tanpa menulis ulang konten.
- **`postCall`** mengkloning respons secara mendalam, menjalankan `sanitizePIIResponse()` ditambah
  masker bentuk API Respons (`maskResponsesOutput` — mencakup
  `output_text` dan `output[].content[].text`). Jika ada penyuntingan yang terjadi,
  respons yang dimodifikasi menggantikan yang asli.

Guardrail tidak pernah memblokir; ia hanya menganotasi (`meta.detections`,
`meta.redacted`) atau menulis ulang.

### Injeksi Prompt (`promptInjection.ts`)

Mendeteksi struktur adversarial dalam konten yang disediakan pengguna dan menegakkan
kebijakan yang dikonfigurasi. Perilaku didorong oleh variabel lingkungan dan opsi konstruktor:

| Pengaturan          | Env var                                                                                               | Default | Efek                                                                                                                                                                                                               |
| ------------------- | ----------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Diaktifkan          | `INPUT_SANITIZER_ENABLED`                                                                             | `true`  | Ketika `false`, guardrail langsung berhenti.                                                                                                                                                                       |
| Mode                | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`  | Kebijakan injeksi: `block`, `warn`, atau `log`. (`redact` diterima untuk kompatibilitas mundur tetapi **tidak** menghapus teks injeksi; permintaan penulisan ulang PII dikendalikan oleh `PII_REDACTION_ENABLED`.) |
| Ambang batas blokir | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`  | Tingkat keparahan minimum yang diperlukan untuk memblokir. Sedang hanya untuk observasi secara default.                                                                                                            |

**Prioritas Mode** (`getMode`): pemanggil `options.mode` →
`INJECTION_GUARD_MODE` **penggantian bendera fitur DB** (Dashboard → Pengaturan →
Bendera Fitur) → env `INJECTION_GUARD_MODE` → env `INPUT_SANITIZER_MODE` →
`warn`. Oleh karena itu, penggantian dari dashboard mengalahkan variabel lingkungan, sehingga UI Bendera Fitur mengontrol guard yang berjalan secara langsung (tanpa restart). Pembacaan DB adalah fail-safe:
jika terjadi kesalahan, guard kembali ke perilaku berbasis env, dan ketika tidak ada penggantian yang diatur, perilaku identik dengan resolusi hanya-env.

Sumber deteksi:

1.  `sanitizeRequest()` dari `@/shared/utils/inputSanitizer` (set detektor bersama yang digunakan di tempat lain dalam pipeline).
2.  `DEFAULT_GUARD_PATTERNS` bawaan (saat ini `system_override_inline` dan
    `markdown_system_block`, keduanya dengan tingkat keparahan `high`).
3.  `customPatterns` opsional yang diteruskan melalui opsi konstruktor (string, regex,
    atau rekaman `{ name, pattern, severity }`).

Ketika `mode === "block"` **dan** setidaknya satu deteksi memenuhi ambang batas
keparahan, `preCall` mengembalikan `{ block: true, message: "Request rejected:
suspicious content detected" }`. Dalam mode `warn`/`log`, guardrail mencatat tetapi
mengizinkan panggilan. Pembantu bersama `evaluatePromptInjection()` juga diekspor
untuk pemanggil yang perlu mengevaluasi prompt tanpa melalui registri.

**Batas pemindaian (v3.8.20):** detektor hanya memeriksa **16 KB pertama** dari
teks prompt yang digabungkan — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 byte) di
`src/shared/utils/inputSanitizer.ts`. Baik `detectInjection()` maupun
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` sebelum menjalankan
loop pola. Direktif injeksi berada di dekat bagian atas input, sehingga ini
membatasi CPU/GC regex pada payload multi-ratus-KB tanpa melemahkan deteksi (bandingkan
#3932, #4041).

### Penyamar Kredensial (`credentialMasker.ts`)

Berjalan di **kedua** tahap, terakhir dalam rantai default (prioritas `95`). Menyunting
pola kunci API / token rahasia yang dikenal dari payload keluar (konten pesan,
argumen panggilan alat, hasil alat) **dan** respons penyedia, sehingga kredensial
yang ditempelkan ke prompt (atau dikembalikan oleh hasil alat) tidak bocor ke
penyedia hulu atau kembali ke klien.

- **Hanya opt-in**, konvensi yang sama dengan penyuntingan PII (Aturan Keras #20-berdekatan):
  dinonaktifkan kecuali `settings.credentialRedactionEnabled === true` **atau**
  `CREDENTIAL_REDACTION_ENABLED=true`. Jika dinonaktifkan, guardrail tidak melakukan apa-apa —
  tidak pernah memblokir dan tidak pernah menulis ulang.
- `redactCredentials()` menelusuri seluruh pohon payload/respons (`walkValue()`,
  aman dari polusi prototipe, aman dari siklus melalui `WeakSet`) dan mengganti
  kecocokan dengan placeholder `[REDACTED:<type>]`, hanya mengkloning cabang yang
  benar-benar berubah.
- `CREDENTIAL_PATTERNS` mencakup kunci penyedia LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), kunci pembayaran (Stripe, Square),
  kunci cloud (kunci akses AWS, Twilio, SendGrid, Mailgun), kunci pribadi / JWT,
  string koneksi yang mengandung kredensial (`mongodb://user:pass@...`, dll.),
  dan pola nilai header `Authorization`/`x-api-key`/`api-key`/`apikey` generik.
  Kunci berbentuk header (`authorization`, `x-api-key`, `api-key`, `apikey`)
  disunting secara struktural (hanya nilai, awalan skema seperti `Bearer `/`Basic `
  dipertahankan) daripada melalui regex teks generik.
- Guardrail tidak pernah memblokir; ia hanya menulis ulang (`modifiedPayload` /
  `modifiedResponse`) dan menganotasi (`meta.credentialsRedacted`, `meta.count`).

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
