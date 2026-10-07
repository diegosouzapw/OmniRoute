# Guardrails (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Sumber kebenaran:** `src/lib/guardrails/`
> **Terakhir dikemas kini:** 2026-08-29 — v3.8.51 (Asal transkrip Video Bridge diisytiharkan oleh pemanggil,
> belum disahkan oleh pelayan — dijelaskan mengikut #11661)

Guardrail menguatkuasakan keselamatan, dasar, dan transformasi kandungan pada sempadan
antara OmniRoute dan penyedia hulu. Setiap guardrail boleh memeriksa (dan
secara pilihan menolak, mengubah, atau menganotasi) muatan permintaan (`preCall`) dan
respons hulu (`postCall`).

Sistem ini adalah **fail-open**: jika guardrail membuang ralat semasa pelaksanaan, pendaftar
merekodkan ralat tersebut dan meneruskan dengan guardrail seterusnya daripada menggagalkan
permintaan. Penyekatan adalah keputusan yang jelas (`block: true`), bukan kemalangan.

## Guardrail Terbina Dalam

Pendaftar memuatkan secara automatik enam guardrail mengikut susunan keutamaan semasa import
(lihat `registry.ts` → `registerDefaultGuardrails()`):

| Priority | Name                | Stage(s)       | File                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Nombor keutamaan yang lebih rendah berjalan **dahulu**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Memintas permintaan yang mengandungi imej yang ditujukan kepada **model bukan penglihatan** dan sama ada
mengubah hala keseluruhan permintaan kepada model berkemampuan penglihatan atau menggantikan bahagian imej
dengan penerangan teks yang dihasilkan oleh model penglihatan yang boleh dikonfigurasi sebelum
panggilan hulu. Ini membolehkan penyedia teks sahaja mengendalikan muatan multimodal secara telus.

Aliran:

1.  Langkau jika model sasaran sudah menyokong penglihatan (melainkan ia muncul dalam senarai
    `isVisionBridgeForcedModel` yang dipaksa-jambatan).
2.  Ekstrak bahagian imej melalui `extractImageParts(messages)`
    (`visionBridgeHelpers.ts`), yang mewakilkan kepada **pengesan media bersatu**
    `detectMediaParts()` dalam `open-sse/utils/mediaParts.ts` — sumber kebenaran tunggal
    yang dikongsi dengan penapis keserasian kombo.
    Pengekstrakan dibenarkan untuk bahagian peringkat atas bentuk yang
    `replaceImageParts` boleh sambungkan semula (kontrak ekstrak↔ganti): OpenAI
    `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
    `source.type:"url"`, dan Responses API `input_image`. Pukulan bersarang dan
    bentuk penunjuk sahaja adalah bahan penapis kombo dan tidak pernah diekstrak.
    Langkau jika tiada ditemui.
3.  Selesaikan konfigurasi masa jalan melalui `resolveVisionBridgeRuntimeSettings()`
    (`src/shared/constants/modalityBridgeDefaults.ts`): kunci tetapan `modalityBridge*`
    baharu menang; kunci `visionBridge*` legasi kekal sebagai **fallback satu kitaran**
    (tetingkap pengembalian). Langkau sebelum sebarang lintasan media apabila jambatan dilumpuhkan.
4.  Pemilih mod (`modalityBridgeVisionMode`, lihat jadual di bawah) memutuskan ubah hala lawan huraikan.
    Ubah hala mengembalikan `modifiedPayload` dengan hanya `model` ditukar, serta meta
    `{ rerouted, fromModel, toModel, imagesKept }`.
5.  Laluan huraian: hadkan imej pada `maxImages`, gubah gesaan yang peka tugas,
    rujuk cache huraian, panggil model penglihatan **secara selari**
    (`Promise.allSettled`), dan suntik bahagian teks `[Imej N]: <penerangan>` di tempatnya.
    Huraian yang gagal menghasilkan `null` dan bahagian imej asal **dipelihara** (#4012)
    — kecuali pada laluan huraian kombo apabila setiap huraian gagal, di mana hulu bukan penglihatan
    yang disahkan mendapat stub `(tidak tersedia — tiada penyedia berkemampuan penglihatan disambungkan)`
    sebagai ganti (#8430).
6.  Kembalikan `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
    `processingTimeMs`, `visionModel`).

#### Pemilih mod (`modalityBridgeVisionMode`)

| Mode       | Default | Tingkah Laku                                                                                                                                                                                                                                                                                      |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔       | Heuristik legasi, tidak disentuh (#6640/#7204): model bukan kombo/`auto/` mengubah hala ke model penglihatan terbaik melainkan model asal sudah mempunyai kelayakan yang boleh digunakan (kemudian huraikan); sasaran kombo sentiasa menghuraikan.                                                |
| `describe` |         | Sentiasa huraikan — blok ubah hala dilangkau sepenuhnya; model pilihan pengguna sentiasa menjawab.                                                                                                                                                                                                |
| `reroute`  |         | Paksa ubah hala: pengawal model berkredensial dikekalkan dipintas. Pengawal kelayakan **sasaran** ubah hala masih terpakai — apabila tiada sasaran penglihatan yang boleh digunakan wujud, permintaan jatuh kepada huraian supaya imej mentah tidak pernah sampai ke backend teks sahaja (#8430). |

Mod paksa memintas **sebelum** heuristik auto berjalan; tingkah laku `auto`
adalah sama persis bait dengan guardrail pra-PR-1.

#### Gesaan huraian peka tugas (`modalityBridgeVisionTaskAware`)

Lalai **benar**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) menambahkan teks
**mesej pengguna terakhir** (dipotong kepada 500 aksara) kepada gesaan huraian asas,
mengarahkan penerangan ke arah apa yang sebenarnya diminta oleh pengguna (corak proksi
penglihatan codex) dan meminta model penglihatan untuk menyalin teks yang kelihatan.
Dengan bendera dimatikan — atau tiada teks pengguna — gesaan asas digunakan tanpa perubahan.

Permintaan OpenAI-compatible kendiri untuk gelung-kendiri describe (`callVisionModelSingle()` dalam `visionBridgeHelpers.ts`) sentiasa meminta `image_url.detail: "high"` — tanpa syarat, untuk setiap pemanggil/penyedia, tidak dikawal oleh sebarang isyarat klien. Pensampelan perincian-rendah merendahkan ketepatan OCR untuk tugasan transkripsi teks yang diminta oleh prompt ini, jadi panggilan describe itu sendiri sentiasa meminta perincian tinggi tanpa mengira tahap perincian yang digunakan oleh permintaan masuk asal. Ini hanya menjejaskan badan permintaan describe luaran; ia tidak mengubah cara OmniRoute memajukan `image_url.detail` pemanggil sendiri pada permintaan utama — lalai tersebut dikendalikan secara berasingan, dan hanya untuk klien OpenCode yang dikesan, dalam `defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Cabang format-wayar Anthropic bagi gelung-kendiri describe tidak mempunyai medan `detail` dan tidak terjejas oleh kedua-dua nilai lalai tersebut.

#### Had atas output describe (`modalityBridgeVisionMaxChars`)

| Key                            | Default | Range            |
| ------------------------------ | ------- | ---------------- |
| `modalityBridgeVisionMaxChars` | `0`     | `0` or 100–50000 |

`0` (lalai) bermaksud **tiada had atas** — penerangan yang dikembalikan oleh `callVisionModel()` diluluskan tanpa diubah, mengekalkan kelakuan sedia ada. Sebarang nilai dalam julat 100–50000 memotong penerangan dengan akhiran `…` sebelum ia disambung semula sebagai `[Image N]: <description>` (`VisionBridgeGuardrail.preCall()` dalam `src/lib/guardrails/visionBridge.ts`). Tingkatkan nilai ini untuk tugasan OCR yang sarat perincian di mana model hiliran memerlukan transkripsi penuh; rendahkan nilai ini untuk mengehadkan penggunaan token pada model visi yang terlalu meleret. Medan papan pemuka terletak pada panel Advanced tab Vision (`modality-bridge-max-chars` dalam `ModalityBridgeVisionTab.tsx`) dan mengehadkan sebarang nilai antara 1 dan 99 naik ke aras minimum 100 sambil membiarkan nilai `0` yang eksplisit tidak disentuh — `0` adalah nilai Zod yang sah pada hakikatnya (`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), bukan sekadar lalai "tidak ditetapkan" (unset).

#### Cache describe (`modalityBridge/bridgeCache.ts`)

Cache LRU + TTL dalam memori untuk output describe, dikongsi merentas proses. Key = `sha256(imageRef + composedPrompt + configuredBridgeModel)` dengan pembingkaian awalan-panjang (tiada pelanggaran sempadan medan). Komponen model ialah model jambatan yang **dikonfigurasikan**, bukannya model yang benar-benar menjawab — `callVisionModel` mungkin jatuh kembali (fallback) secara luaran, dan penguncian mengikut setiap percubaan akan memecah-mecahkan cache. Describe yang gagal tidak pernah dicache. Tetapan:

| Key                             | Default | Range   |
| ------------------------------- | ------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`  | —       |
| `modalityBridgeCacheTtlMinutes` | `60`    | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`   | 10–5000 |

#### Normalisasi imej jauh (gelung-kendiri describe/pambilan base64)

Apabila jambatan mengambil imej **jauh** sendiri — panggilan-kendiri describe Anthropic dan penukaran base64 format-wayar-claude (`ensureBase64ImagesForClaudeWire`), kedua-duanya melalui `fetchRemoteImageAsDataUri()` dalam `visionBridgeHelpers.ts` — URI data terhasil diluluskan melalui `normalizeDataUri()` (`open-sse/utils/imageNormalize.ts`) sebelum dibenamkan dalam permintaan model-visi. Imej yang terlalu besar dikecilkan ke **tepi panjang 2048px** (sepadan dengan had saiz semula yang telah dikenakan oleh OpenAI/Anthropic pada sisi pelayan), yang mengurangkan bait/latensi muat naik tanpa mengubah perkara yang dilihat oleh model visi. Penilaian saiz semula menggunakan `sharp`, dimuatkan melalui import dinamik: pada platform di mana binari natifnya gagal dimuatkan, `normalizeDataUri()` **tidak pernah melempar ralat (throws)** — ia jatuh kembali kepada hantaran laluan (passthrough) bait asal, jadi laluan describe/penukaran-base64 sentiasa terus berfungsi. Bait bukan imej (pambilan yang tidak mengembalikan imej yang boleh dinyahkod) juga diluluskan tanpa disentuh. Normalisasi ini dis skopkan kepada imej yang diambil oleh jambatan untuk panggilan-kendirinya sendiri — ia tidak pernah dikenakan pada muatan hantaran laluan mentah pemanggil, konsisten dengan prinsip mutasi pilih-masuk-sahaja (Hard Rule #20).

#### Skema tetapan + migrasi

Kunci baharu `modalityBridge*` disahkan oleh Zod dalam `updateSettingsSchema` (`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`, `modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*`, dan kumpulan `modalityBridgeAudio*` yang digunakan oleh Jambatan Audio. Migrasi `141_modality_bridge_settings.sql` menyalin nilai `visionBridge*` warisan sedia ada kepada kunci baharu yang sepadan (idempoten, tidak pernah menimpa nilai `modalityBridge*` yang ditetapkan pengendali); kunci warisan terus diterima sebagai rizab bacaan untuk satu kitaran keluaran.

#### Header ketelusan + statistik

Respons yang diubah-terbit describe membawa `x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>` (dibina oleh `buildModalityBridgeHeader()` dalam `modalityBridge/bridgeStats.ts`, dicop oleh `withModalityBridgeHeader()` dalam `src/sse/handlers/chatHelpers.ts`). Permintaan yang dihala semula mendapat **tiada** header — muatan tidak disentuh dan pertukaran model sudah kelihatan dalam medan `model` badan respons.

`GET /api/modality-bridge/stats` (pengesahihan pengurusan, peringkat yang sama seperti `GET /api/settings`) mengembalikan pembilang dalam-memori setiap-modaliti `{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs, latencySamples, averageLatencyMs, lastUsedAt }` untuk `vision`, `audio`, dan `video`. `averageLatencyMs` menggunakan `latencySamples`, bukan semua percubaan, sebagai penyebutnya; operasi tanpa masa tidak merekayasa sampel sifar milisaat. `bridged` kekal sebagai alias serasi ke belakang untuk penukaran yang berjaya; percubaan yang gagal tidak menaikkan nilainya. Pembilang diset semula semasa mula semula proses secara reka bentuk (telemetri, bukan perakaunan).

#### Konfigurasi papan pemuka

Halaman papan pemuka khusus ialah
`/dashboard/settings/modality-bridge`. Tab `Vision`, `Audio`,
dan `Video` yang boleh dialamatkan URL mengekalkan parameter pertanyaan
semasa menukar nilai `tab`.
Tab Vision mendedahkan pengaktifan, mod, pemilihan model (termasuk
lalai automatik), gesaan yang peka tugas, had tamat masa/imej/panjang
penerangan/cache lanjutan, pembilang masa jalan, dan permintaan sampel
yang dilindungi. Tab Audio juga aktif: ia mendedahkan pengaktifan,
pemilih model STT-sahaja dengan Auto, had tamat masa/klip maksimum,
pembilang audio, dan ujian sampel `input_audio`. Tab Video berfungsi:
ia melaporkan keadaan masa jalan FFmpeg/ffprobe — salah satu daripada
empat keadaan UI eksplisit (`unknown` semasa probe sedang dalam penerbangan
atau tidak dapat diselesaikan, `restricted` pada hos papan pemuka bukan
gelung balik di mana probe dilangkau di sisi klien, `unavailable` setelah
disiasat dan disahkan hilang, atau `available` dengan versi FFmpeg/ffprobe)
— mengekalkan had aktifkan/model/bingkai/video/tamat masa, menapis pemilih
model kepada model yang berkemampuan penglihatan, dan mendedahkan pembilang video.

Kad Vision Bridge yang dahulu di bawah tetapan AI adalah pautan keserasian
ke halaman baharu; ia tidak lagi memiliki salinan kedua borang tersebut.
Penyedia Media juga memautkan aliran kerja Imej-ke-Teks dan Ucapan-ke-Teks
ke tab Modality Bridge yang sepadan tanpa mengalih keluar taman permainan
Ucapan-ke-Teks sedia ada.

**Pintas kemasukan gelung kendiri:** apabila panggilan penerangan melalui
gelung kendiri `/v1` OmniRoute (model penyedia bukan standard), sub-permintaan
menghantar `x-omniroute-admission-bypass: internal` dan disahkan dengan
kredensial gelung kendiri yang diselesaikan — sentinel `sk_omniroute` tempatan
dalam mod tempatan, atau kunci persekitaran `OMNIROUTE_API_KEY` / `ROUTER_API_KEY`
yang dikonfigurasi oleh operator (#1350) supaya penyebaran `REQUIRE_API_KEY=true`
masih boleh menjalankan panggilan penerangan. Pintasan hanya dihormati untuk
kredensial yang tepat itu, jadi klien luaran tidak boleh menggunakan pengepala
untuk melangkau kemasukan.

Lalai warisan berada dalam `src/shared/constants/visionBridgeDefaults.ts`;
lalai mod/peka tugas/cache baharu dan penyelesai tetapan berada dalam
`src/shared/constants/modalityBridgeDefaults.ts`. Guardrail mendedahkan
pilihan pembina `deps` supaya ujian boleh menyuntik pelaksanaan `getSettings`
dan `callVisionModel` palsu.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Memintas permintaan sembang yang mengandungi audio sebelum ia mencapai sasaran
yang tidak diketahui menerima input audio. Ia tidak pernah mengubah laluan
permintaan sembang: bahagian audio ditranskripsi melalui titik akhir berbilang
bahagian yang serasi dengan OpenAI sedia ada dan model sembang yang dipilih
terus dengan transkripsi teks.

Aliran:

1. Selesaikan `supportsAudio` melalui `getResolvedModelCapabilities()`. Metadata
   daftar penyedia eksplisit menang, kemudian metadata model statik, kemudian
   `modalities_input` yang disegerakkan. Senarai input yang diisytiharkan tanpa
   `audio` adalah `false`; tiada bukti keupayaan kekal `null`. Kedua-dua `false`
   dan `null` mengaktifkan jambatan konservatif, manakala `true` memintasnya.
2. Selesaikan tetapan `modalityBridgeAudio*` dan ekstrak bahagian audio peringkat
   atas yang boleh disambung dari setiap mesej melalui pengesan `detectMediaParts()`
   yang dikongsi. Bentuk wayar yang disokong ialah OpenAI `input_audio`, `audio_url`,
   dan `source.media_type: "audio/*"`. Audio bersarang dikesan untuk penghalaan
   tetapi tidak dialih keluar oleh laluan sambungan. Kerja dihadkan oleh
   `modalityBridgeAudioMaxClips`; bahagian kemudian kekal tidak disentuh.
3. Hormati `provider/model` yang dikonfigurasi, atau biarkan `selectAudioBridgeModel()`
   melalui `AUDIO_TRANSCRIPTION_PROVIDERS` dalam susunan katalog stabil dan pilih
   model pertama dengan kredensial penyedia aktif yang boleh digunakan.
4. `callAudioTranscription()` menukar audio base64/data-URI kepada `file` berbilang
   bahagian, atau memuat turun `audio_url` jauh melalui pengawal keluar awam-sahaja
   dengan pin DNS dan had 25 MB. Ia kemudian POST fail dan model yang dipilih ke
   gelung kendiri `/v1/audio/transcriptions` tempatan, disahkan dengan
   `resolveSelfLoopBearer()`. Laluan transkripsi sedia ada melakukan pencarian
   kredensial biasa, pengendalian penyejukan/had kadar, dan penghantaran penyedia.
5. Panggilan yang berjaya menggantikan bahagiannya dengan `[Audio N]: <transkripsi>`.
   Panggilan dijalankan dengan `Promise.allSettled`: kegagalan individu mengekalkan
   bahagian audio asal itu (kontrak #4012). Jika setiap panggilan gagal dan sasaran
   terbukti `supportsAudio === false`, bahagian tersebut menjadi
   `[Audio N]: (tidak tersedia — tiada penyedia STT disambungkan)` (kontrak #8430).
   Untuk sasaran yang tidak diketahui (`null`), hasil semua kegagalan kekal tidak
   disentuh. Sasaran teks-sahaja yang terbukti tanpa kredensial STT yang boleh
   digunakan menerima stub eksplisit yang sama tanpa mengeluarkan panggilan rangkaian.

Transkripsi yang berjaya menggunakan cache LRU/TTL Modality Bridge seluruh proses.
Kunci menggabungkan rujukan audio, label operasi `audio-transcription` yang stabil,
dan model STT yang dipilih; kegagalan tidak pernah dicache. Percubaan audio
mengemas kini pembilang `bridged`, `cacheHits`, `failures`, dan `lastUsedAt` yang dikongsi.
Respons yang diubah membawa
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; permintaan
yang tidak disentuh tidak menerima segmen Audio Bridge.

Tetapan masa jalan disokong DB dan disahkan Zod:

| Kunci                         | Lalai   | Julat            |
| ----------------------------- | ------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                |
| `modalityBridgeAudioModel`    | `""`    | Auto atau ID STT |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10             |

Cache yang dikongsi kekal dikawal oleh `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, dan `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Memintas bahagian video peringkat atas dalam `messages` Chat Completions dan `input` Respons API sebelum sasaran tanpa sokongan video asli yang diketahui dipanggil.
Bentuk yang disokong ialah `input_video`, `video_url`, `video_source`, URL HTTPS,
dan URI data `data:video/*;base64,...`. Nama fail biasa dalam teks tidak dianggap
sebagai video.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) menguruskan penelusuran permintaan,
pemeriksaan keupayaan/dasar, pengagregatan setiap permintaan, dan muatan respons.
Kerja setiap video — pemerolehan, cache hasil keseluruhan, menerangkan urutan bingkai
(yang menggabungkan sebarang transkrip audio yang diisytiharkan pemanggil), dan
metrik/pembatalan/pembersihan setiap percubaan — disembunyikan di sebalik `processVideoPart` dalam
`videoBridgePipeline.ts`, dipanggil sekali bagi setiap bahagian video dalam gelung `preCall`.
Modul itu juga mentakrifkan sempadan port eksplisit `VideoMediaBrokerPort`
(memperoleh bait dan mengekstrak bingkai yang disampel), `VideoAudioTranscriptionPort`
(menggabungkan transkrip audio yang diisytiharkan pemanggil dengan kapsyen yang disampel), dan
`VideoDrilldownPort` (sempadan ketekalan drill-down bingkai; belum disambungkan
ke `processVideoPart` — hanya laluan `/api/modality-bridge/video/drilldown` yang berasingan
menulis entri drill-down hari ini).

Laluan permintaan awam `/v1` tidak pernah mengimport atau memanggil subproses. Video jauh
dimuat turun di bawah had 50 MiB; video base64 sebaris mempunyai
had 36 MiB yang dinyahkod setiap video secara konservatif supaya model/mesej/sampul pembingkaian
boleh kekal dalam had kemasukan permintaan JSON awam sebanyak 50 MiB. Anggaran
panjang sebaris dan saiz yang dinyahkod diperiksa sebelum peruntukan. HTTPS
diperlukan pada URL jauh awal dan setiap pengalihan, menggunakan
pengawal keluar awam-sahaja sedia ada dengan penetapan DNS. Bait kemudian melintasi
sempadan broker `POST /api/modality-bridge/video/extract` dalaman yang tepat. Laluan itu adalah
`LOCAL_ONLY` dan `SPAWN_CAPABLE`, hanya menerima permintaan gelung balik yang dipercayai,
disahkan setiap proses, dan tidak pernah menerima URL, laluan sistem fail, boleh laksana,
atau senarai argumen. Saluran paip saiz badan API dan pembaca badan tambahan pengendali
secara bebas menguatkuasakan had input broker 50 MiB. Barisan terhadnya menjalankan
satu pengekstrakan pada satu masa, membenarkan empat kerja yang belum selesai, dan mengehadkan input yang belum selesai pada
100 MiB.

Di dalam broker, `ffprobe` membaca fail tempatan peribadi; senarai putih format tetap
mengecualikan format senarai main dan manifes. Untuk kontena keluarga MOV yang dibenarkan,
rujukan data MOV luaran kekal dilumpuhkan secara lalai, dan arahan tetap tidak
memilihnya. Kedua-dua `ffprobe` dan `ffmpeg` menggunakan senarai putih protokol `file`-sahaja,
satu benang, tatasusunan argumen tetap, tiada shell, dan boleh laksana yang diselesaikan daripada `PATH`.
Strim muka depan gambar yang dilampirkan bukan calon yang boleh dimainkan. Semua strim yang boleh dimainkan
mesti memenuhi had, dan strim lalai eksplisit diutamakan sebelum
pemilihan balik indeks terendah yang deterministik. Video dihadkan kepada 600 saat,
8,192 piksel setiap dimensi, dan 33,554,432 piksel sumber. FFmpeg menyampel
1–16 bingkai JPEG titik tengah, mengecilkan tepi panjang kepada paling banyak 1,024 piksel
tanpa meningkatkan skala input yang lebih kecil, dan tidak pernah menerima URL. Persampelan adalah
`uniform` secara lalai. Dasar `scene_aware` pilihan dan `segment_aware` eksperimen
melakukan satu laluan FFmpeg tetap tambahan ke atas strim tempatan yang telah disahkan,
memilih cap masa adegan `showinfo` yang terhad, dan kembali secara deterministik kepada
titik tengah seragam yang sama pada kegagalan pengesan, tamat masa, output yang salah bentuk,
atau set calon yang kosong. Mod sedar segmen memperuntukkan sampel titik tengah secara
berkadaran dengan selang adegan yang disahkan; bukti sedar segmen dan tingkah laku
pemilihan balik diperincikan di bawah. Had 16 bingkai yang keras
diterapkan selepas pemilihan dalam setiap dasar. Apabila permintaan sedar adegan hanya mempunyai
satu bingkai bajet, ia menggunakan titik tengah seragam video penuh aktif atau tetingkap fokus
dan melaporkan `policyEffective: uniform`: satu bingkai adegan yang dipilih tidak dapat
memelihara kedua-dua hujung temporal. Pemanggil boleh secara pilihan menyediakan
tetingkap fokus terhad (`start`/`end` saat); sempadan dikapitkan kepada tempoh media,
tetingkap terbalik atau tidak terhingga ditolak, dan semua dasar persampelan dilakukan
hanya di dalam selang yang dinormalisasi. Tetingkap yang terhasil disertakan dalam
metadata persampelan dan dalam awalan penerangan yang tidak dipercayai supaya model hiliran
dapat membezakan petikan fokus daripada garis masa penuh.

Fokus kapsyen semantik adalah tetapan berasingan yang eksplisit. Mod analisis `full` lalai
memelihara gesaan bingkai sedia ada dan tidak pernah memajukan teks permintaan kepada model kapsyen.
Dalam mod `focused`, jambatan hanya membaca `text`/`input_text` yang terkini, bukan kosong,
yang ditulis pengguna daripada bekas Chat atau Respons yang sama, menormalkannya kepada NFC,
menggabungkan aksara kawalan dan ruang putih, dan mengehadkannya kepada 500 titik kod Unicode.
Hasil kosong kembali kepada gesaan `full` yang tepat. Petunjuk yang boleh digunakan disirikan
sebagai JSON dalam blok konteks pengguna tidak dipercayai yang khusus dan hanya boleh
mengutamakan butiran yang boleh diperhatikan; ia tidak boleh mengatasi amaran berasingan
terhadap mengikuti arahan yang kelihatan atau boleh didengar dalam media. Fokus tekstual
tidak pernah menyimpulkan `start`/`end` atau mengubah pensampel temporal.

#### FU-07 bukti segmen struktur

`segment_aware` menggunakan satu laluan pra-analisis terhad ke atas strim video tempatan yang telah disahkan.
Rantaian penapis tetap mula-mula menskala kepada paling banyak 320 piksel lebar, mengesan perubahan adegan
dan selang beku, kemudian menyampel pada 1 bingkai sesaat untuk kekaburan, luma purata, dan maklumat
ruang/temporal. Laluan ini dihadkan kepada 600 sampel struktur, satu benang FFmpeg/penapis,
protokol `file`-sahaja dan senarai putih kontena yang sama, had output proses 1 MiB,
dan paling banyak 30 saat di dalam pembatalan/tarikh akhir kongsi broker. Ia tidak pernah menerima
arahan, penapis, laluan, atau URL daripada permintaan.

Nilai struktur adalah bukti pensampelan deterministik, bukan pemahaman video
semantik. Ia tidak menyimpulkan subjek, tindakan, kapsyen, ucapan, atau niat
pengguna. Sempadan adegan dan pembekuan membentuk segmen; liputan pembekuan,
kabur, pendedahan, butiran ruang, dan perubahan temporal hanya mempengaruhi
bagaimana bajet 1–16 bingkai sedia ada diperuntukkan. Segmen yang beku
sepenuhnya dihadkan kepada satu bingkai, manakala segmen tidak beku bersaing
untuk bajet yang tinggal. Apabila sempadan melebihi bingkai, liputan garis
masa seragam dikekalkan supaya potongan awal yang pantas tidak dapat
menyembunyikan segmen panjang yang mengekor. Sempadan adegan dalam resolusi
analisis 1 saat sempadan pembekuan digabungkan.

Penapis yang hilang, bukti yang salah/kosong, ralat pengesan, atau tamat
masa pra-analisis terikat gagal terbuka kepada dasar titik tengah seragam
yang tepat. Pembatalan pemanggil atau tarikh akhir broker tidak gagal
terbuka: ia menamatkan subproses yang sedang berjalan, menghalang
pengekstrakkan bingkai kemudian, dan pokok sementara persendirian dialih
keluarkan dalam `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` menjana lekapan FFmpeg sebenar
deterministik untuk penjimatan panggilan kapsyen pasca-dedup, peruntukan
bajet gerakan padat, bukti kabur/pendedahan/SI-TI, potongan pantas dengan
ekor panjang, dan positif palsu pudar beransur-ansur. Ia merekodkan masa
dinding pra-analisis dan, di mana `/usr/bin/time` tersedia, CPU anak dan RSS
puncak. Pemeriksaan kualitinya adalah orakel struktur sahaja. Kualiti model
kapsyen sebenar kekal `HOLD` kerana abah-abah ini tidak mempunyai titik akhir
yang dibenarkan atau hakim yang beku. Penjimatan kewangan juga kekal `HOLD`
melainkan `--caption-cost-per-call-usd` membekalkan anggaran per-panggilan
positif yang jelas; skrip tidak pernah menghasilkan kedua-dua hasil.

Setiap bingkai dihadkan kepada 4 MiB, semua bingkai mentah bersama-sama kepada
23 MiB, dan respons broker yang disirikan kepada 32 MiB. Direktori sementara
persendirian dialih keluar dalam `finally`. OmniRoute tidak menggabungkan
FFmpeg dan tidak menerima laluan boleh laku tersuai. Sebelum kapsyen, jambatan
menggunakan laluan deduplikasi visual konservatif: setiap JPEG dikurangkan
kepada penimbal skala kelabu 16×16 dan dibandingkan hanya dengan bingkai
terakhir yang disimpan. Untuk bajet kapsyen yang diminta melebihi satu
bingkai, pengekstrakkan membekalkan kumpulan calon terhad sehingga dua kali
ganda bajet itu dan tidak pernah lebih daripada 16 bingkai. Had yang diminta
dikenakan hanya selepas deduplikasi, dengan calon pertama dan terakhir yang
dipilih dikekalkan semasa penipisan akhir apabila bajet sekurang-kurangnya
dua. Dasar `grayscale-16x16-mean-cells-v2` yang diversi menggunakan delta
luma purata yang lebih besar dan nisbah sel lakaran kecil yang delta
ternormalnya sekurang-kurangnya 0.05. Ambang duplikat adalah pemalar 0.04,
dipilih untuk kebolehramalan dan bukannya didedahkan sebagai tetapan masa
jalan. Isyarat kontras tinggi sekunder ini mengekalkan gerakan kecil dan
perubahan teks yang kelihatan yang boleh disembunyikan oleh perbandingan
purata sahaja. Ralat pembanding atau penyahkod gagal terbuka dan mengekalkan
liputan. Metadata output memisahkan calon yang diekstrak, bingkai yang
berjaya digunakan, dan duplikat visual yang digugurkan.

Bahagian video yang ditanda secara eksplisit mungkin meminta helaian kenalan
yang dicap masa. Jambatan membina paling banyak grid JPEG 4 lajur, 16 bingkai.
Setiap sel 512 piksel membakar cap masa sumbernya ke dalam jalur bawah
kontras tinggi, manakala cap masa yang sama kekal dalam metadata teks untuk
persatuan dan audit hiliran. JPEG lengkap kekal dihadkan pada 32 MiB. Jika
`sharp` tidak dapat menyahkod atau menyusun grid, jambatan kembali kepada
bingkai JPEG individu; pembatalan klien masih tersebar melalui operasi
helaian.

Bukti promosi sengaja dipisahkan daripada mikropenanda aras komposisi
sintetik. `scripts/perf/video-bridge-contact-sheet-eval.ts` mentakrifkan
abah-abah A/B versi skema untuk model penglihatan serasi OpenAI sebenar. Ia
mengukur token yang dilaporkan pembekal, kependaman dinding hujung ke hujung
(termasuk komposisi helaian), kiraan panggilan model, dan pengekalan fakta
yang ditakrifkan manifes. Respons model mentah tidak ditulis ke laporan;
hanya ringkasan SHA-256 dan ID fakta yang sepadan dikekalkan. Abah-abah
tidak membuat panggilan rangkaian atau model berbayar melainkan
`--execute-real` diluluskan dan `--model`, `OMNIROUTE_BASE_URL`, dan
`OMNIROUTE_API_KEY` dikonfigurasi. Tanpa larian sebenar yang jelas itu,
keputusan boleh dibaca mesinnya kekal `HOLD`; pengukuran muatan/kiraan
panggilan sintetik sahaja bukan bukti promosi.

Pemanggil boleh melampirkan tatasusunan `transcript.cues` pilihan kepada
bahagian video yang disokong apabila mereka sudah memiliki teks yang
diselaraskan. Setiap isyarat mesti membawa `text`, selang `start`/`end`
terhingga di dalam tempoh yang disiasat, dan `source` yang disenarai putih
(`client`, `embedded`, atau `audio-bridge`); `confidence` lalai kepada `1`
dan mesti kekal antara `0` dan `1`. Isyarat duplikat yang tepat digabungkan.
OmniRoute tidak pernah memulakan transkripsi daripada metadata ini: isyarat
yang disahkan disalin ke dalam hasil yang diterangkan dengan sumber,
keyakinan, dan selang, dan dipaparkan sebagai pemerhatian yang tidak
dipercayai bersama kapsyen bingkai. Teks yang tidak sah, di luar julat, atau
tanpa asal-usul ditolak dan bukannya dicampur ke dalam aliran kapsyen. Medan
`source` pada masa ini diisytiharkan oleh pemanggil, bukan disahkan oleh
pelayan: OmniRoute menguatkuasakan bahawa nilai adalah salah satu daripada
tiga rentetan yang dibenarkan, tetapi belum mengesahkan secara kriptografi
bahawa label `embedded` atau `audio-bridge` sebenarnya datang daripada
pengekstrakkan milik pelayan. Anggap `source` sebagai petunjuk yang tidak
dipercayai sehingga pengesahan itu tiba; jangan bina keputusan kebenaran
berdasarkan itu.

Pemanggil lanjutan boleh menyediakan trek `audioTranscript` yang telah dibenarkan untuk video yang sama. Jahitan gabungan menjalankan pemerhatian visual dan audio di bawah satu tarikh akhir dan isyarat pembatalan, menyusunnya pada garis masa yang sama, menggabungkan duplikasi yang tepat, dan melaporkan hasil separa apabila hanya satu pihak berjaya. `audioTranscript` yang tidak sah merosot kepada hasil separa tersebut — perihalan visual dikekalkan dan cabang audio merekodkan kod kegagalan yang disanitasi — dan bukannya menyebabkan keseluruhan video gagal. Ketersediaan setiap cabang, bendera separa, dan kod kegagalan yang disanitasi dikekalkan dalam hasil yang diterangkan, dalam metadata guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), dalam metadata cache hasil, dan dalam pembilang gabungan jambatan. Laluan Video Bridge lalai tidak memanggil teks-ke-ucapan atau memuat turun salinan media kedua; tanpa trek eksplisit itu, ia kekal sebagai video-sahaja.

**Pengekalan transkrip (#12150 P1).** Ini terpakai secara automatik setiap kali Video Bridge (yang sendiri adalah opt-in) memaparkan isyarat transkrip — tiada bendera pengekalan yang berasingan. Apabila permintaan memaparkan sebarang isyarat transkrip (`transcript` yang diisytiharkan pemanggil atau `audioTranscript` yang digabungkan), guardrail menandakannya sebagai `videoBridgeObserved` dan menghasilkan bayangan yang disunting daripada perihalan video — paparan yang sama di mana setiap badan teks bebas isyarat digantikan dengan `[redacted-video-transcript]`, dibina dengan menggantikan medan isyarat berstruktur sebelum rentetan dipasang (tidak pernah dengan menghuraikan teks yang diratakan, jadi tiada kandungan isyarat — sama ada bermusuhan atau biasa, termasuk badan yang mengandungi `]` seperti `[inaudible]`/`[music]` — boleh bertahan). Badan permintaan log panggilan yang dikekalkan menukar setiap bahagian teks yang diperoleh daripada video dengan bayangan yang disunting itu, dipadankan oleh kesamaan kandungan; sauh `fullText` dibaca semula daripada muatan guardrail pra-panggilan yang telah selesai, jadi padanan masih berjaya selepas guardrail rantaian kemudian (penutup PII dan kelayakan, keutamaan 10/95) menulis semula teks perihalan di tempatnya dan selepas suntikan gesaan sistem/serah tugas/memori membentuk semula tatasusunan mesej. Badan yang dihantar ke hulu kepada model tidak berubah. Permintaan yang diperhatikan juga tidak mengisi Memori yang tahan lama (kedua-dua pengekstrakan yang diperoleh daripada permintaan dan respons dilewati), jadi balasan model sendiri tidak boleh mengulang teks transkrip ke dalam Memori.

Salinan tambahan yang dikekalkan menggunakan isyarat permintaan yang diperhatikan yang sama. Gambar rajah permintaan klien pra-guardrail mentah, permintaan tertunda dalam memori, dan log permintaan yang ditolak awal secara struktur menggantikan medan transkrip dalam bahagian video; gesaan rentetan yang disintesis oleh peringkat saluran paip dan serah tugas konteks disunting pada sinki badan permintaan yang dikekalkan. Penanda `video_content_removed` yang dikekalkan menyebabkan kesinambungan `previous_response_id` gagal ditutup dan bukannya membina semula teks yang sengaja dibuang. Jika permintaan yang diperhatikan kehilangan bayangan penyuntingan setiap bahagian sebelum pengelogan, atau bahkan salah satu daripada beberapa bayangan video gagal dipadankan selepas mutasi permintaan kemudian, badan permintaan yang dikekalkan akan diabaikan sepenuhnya dan bukannya mengekalkan transkrip yang disunting sebahagian.

Untuk permintaan yang diperhatikan, respons model mungkin memetik mana-mana bahagian transkrip tanpa sempadan isyarat berstruktur. Oleh itu, `responseBody` log panggilan yang dikekalkan digantikan dengan penanda peninggalan; artifak saluran paip terperinci (yang boleh merangkumi badan hulu/klien dan cebisan aliran) tidak dikekalkan. Cache semantik, idempotensi, dan ulangan penaakulan memintas bacaan dan penulisan untuk permintaan tersebut. Permintaan pembekal dan respons yang kelihatan kepada klien kekal tidak berubah. Bait keepalive awal disalirkan daripada penimbal sementara apabila artifak terperinci diabaikan. Amaran `EventStream` yang salah bentuk Kiro hanya melaporkan kiraan bait muatan, tidak pernah kandungannya atau ralat mentah penghurai `JSON`. Ini tidak mendakwa bahawa setiap diagnostik pembekal/pemalam yang tidak berkaitan telah diaudit; penyapuan sinki yang dikekalkan yang lebih luas dijejaki dalam #11658.

Kitaran hayat `/api/modality-bridge/video/drilldown` dalaman adalah substrat cache yang berasingan, gelung balik/token-disahkan. Setiap operasi juga memerlukan ID prinsipal legap kanonik. Sebelum pemanggil produksi diaktifkan, ia mesti memperoleh ID tersebut daripada penyewa yang disahkan dan tidak boleh sekali-kali memajukan nilai yang dipilih oleh klien. Kunci cache mengikat prinsipal tersebut kepada ID sesi kanonik dan rujukan video, menyimpan hanya kunci terbitan `SHA-256` mereka, dan melingkupi kedua-dua bacaan dan penghapusan kepada prinsipal yang sama. Cache menyimpan paling banyak 16 bingkai `JPEG` terbitan setiap entri, melupuskannya selepas sepuluh minit, dan menyokong bacaan `start`/`end` terhad atau penghapusan sesi eksplisit.

Setiap prinsipal terhad kepada 16 entri dan 64 `MiB` data `JPEG` kanonik. Had tersebut adalah bebas daripada had siling global 64-entri/256 `MiB`: tekanan kuota prinsipal hanya mengeluarkan entri yang paling kurang digunakan oleh prinsipal tersebut sebelum pengusiran `LRU` global dipertimbangkan. Entri yang tamat tempoh disapu daripada kedua-dua perakaunan prinsipal dan global pada aktiviti cache, manakala pembatalan dan kegagalan pengesahan tidak melakukan penggantian separa.

Cache menolak `Base64` bukan kanonik, padding berlebihan, media bukan `JPEG`, `JPEG` yang salah bentuk atau terpotong, dan `JPEG` yang menghasilkan amaran semasa penyahkodan `sharp` imej penuh yang terhad. Ia mengekod semula setiap imej yang diterima sebagai `JPEG` kanonik, memperoleh lebar dan tinggi daripada bait yang dinyahkod dan bukannya mempercayai medan pemanggil, dan membuang sebarang bait poliglota yang mengekor dan bukannya mengekalkannya. Hanya penimbal termampat kanonik yang terhad dicaj kepada kedua-dua kuota. Had wayar `JSON` termasuk overhed `Base64` untuk siling input dinyahkod 32 `MiB`. Setiap terbitan yang disimpan merekodkan format/resolusi `JPEG` yang disahkan, dasar pensampelan, versi terbitan, masa penciptaan, hash kandungan yang dikira oleh pelayan, dan rujukan induk yang di-hash serta hash kandungan induk pemanggil yang dipercayai. Pembatalan diperiksa antara fasa penyahkodan/hash tak segerak sebelum komit cache atom.

Tranche ini belum lagi menyambungkan pengeluar produksi ke laluan dan tidak menyediakan pemilihan varian berbilang resolusi. Oleh itu, laluan permintaan Video Bridge yang telus tidak menimbulkan kerja tambahan, manakala derivasi prinsipal terikat penyewa dan kitaran hayat berbilang resolusi FU-08 yang lengkap kekal sebagai kerja susulan yang jelas dan bukannya didokumenkan sebagai tingkah laku yang lengkap.

Bingkai diberi kapsyen secara berurutan dengan model Video yang dikonfigurasi. Penggantian Video kosong mewarisi tetapan Vision; jika kedua-duanya kosong, penghala automatik Vision memilih model berkemampuan penglihatan yang berkesan. Kapsyen yang berjaya menggantikan bahagian asal dengan awalan `[Video description:` yang stabil yang juga menandakan teks sebagai pemerhatian terbitan media yang tidak dipercayai dan memberitahu model hiliran untuk tidak mengikut arahan yang terdapat dalam media. Kunci cache kapsyen bingkai termasuk bait JPEG, gesaan, cap masa, dan model yang berkesan; hanya kapsyen yang berjaya disimpan dalam cache. Entri cache mengekalkan model pengeluar yang berjaya sebenar, termasuk model sandaran; jambatan melaporkan `mixed` apabila bingkai yang berbeza dihasilkan oleh model yang berbeza. Pukulan cache menggunakan semula identiti pengeluar itu dan bukannya melabelkannya semula sebagai pelan penghalaan yang diminta. Cache hasil keseluruhan video dikunci pada setiap input yang mengubah output — gesaan, model berkesan, dasar pensampelan, kiraan bingkai, mod analisis semantik, cap jari SHA-256 bagi petunjuk fokus yang dinormalisasi, tetingkap fokus, `transcript`, `audioTranscript`, dan bendera helaian kenalan — jadi mengubah mana-mana dimensi tersebut adalah cache miss, bukan penggunaan semula yang lapuk. Versi dasar dedup visual, ambang, dan kiraan bingkai calon terhad juga jelas dalam kunci cache hasil dan metadata; oleh itu, perubahan dasar tidak boleh menggunakan semula perihalan keseluruhan video yang lapuk. Metadata cache hasil v4 mengekalkan mod dan cap jari, bukan tugas pengguna mentah. Metadata guardrail melaporkan kedua-dua mod analisis yang diminta dan berkesan; mod `focused` yang diminta tanpa teks pengguna yang boleh digunakan dilaporkan sebagai `full` secara berkesan.

Guardrail mengekstrak setiap bahagian video yang disokong tetapi tidak menerangkan lebih daripada `modalityBridgeVideoMaxVideos`. Untuk sasaran yang terbukti mempunyai `supportsVideo === false`, video yang gagal dan melebihi had menjadi penanda teks selamat yang jelas supaya tiada video mentah yang terselamat. Apabila keupayaan tidak diketahui, bahagian-bahagian tersebut kekal tidak disentuh. Sasaran dengan `supportsVideo === true` memintas jambatan. Isyarat pembatalan permintaan klien merambat melalui muat turun, barisan broker, subproses, dan panggilan kapsyen; pembatalan berhenti di antara video dan tidak pernah gagal terbuka kepada media mentah.

Tetapan runtime disokong DB dan disahkan Zod:

| Kunci                               | Lalai       | Julat / tingkah laku                                                                                                |
| :---------------------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------ |
| `modalityBridgeVideoEnabled`        | `false`     | Runtime pilihan, opt-in                                                                                             |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` mengekalkan kapsyen generik; `focused` menggunakan konteks pengguna terkini yang terhad dan tidak dipercayai |
| `modalityBridgeVideoModel`          | `""`        | Mewarisi model Vision Bridge                                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                                |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware`, atau `segment_aware` berkadar; kegagalan pengesan kembali kepada `uniform`                |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                                 |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                                      |

Nilai tamat masa Video yang dikekalkan legasi melebihi 120 saat dihadkan kepada had masa broker; penulisan tetapan baharu melebihi had tersebut ditolak. `GET /api/modality-bridge/video/runtime` memerlukan lokaliti gelung balik bercap yang dipercayai sebelum pengesahan atau penyiasatan runtime, kemudian memerlukan pengesahan pengurusan. Ia hanya mengembalikan `available`, versi FFmpeg/ffprobe yang disanitasi, dan sebab tetap apabila runtime tidak tersedia. Titik akhir pengekstrakan dalaman bukan API muat naik awam: ketepuan barisan mengembalikan `503` ditambah `Retry-After`, pemutus sambungan pemanggil mengembalikan `499`, dan had masa broker tetap mengembalikan `504`. Respons yang ditukar menambah `video->text;model=<visionModel>;parts=<videos>` ke pengepala `x-omniroute-modality-bridge` pusat tanpa membuang segmen Vision atau Audio.

### PII Masker (`piiMasker.ts`)

Berjalan pada **kedua-dua** peringkat.

- **`preCall`** mengklonkan muatan, melayari `system`, `messages`, `input`, dan `prompt` (termasuk item rentetan biasa), dan menggunakan `processPII()` (dari `@/shared/utils/inputSanitizer`) pada medan rentetan `content`/`text`. Apabila `PII_REDACTION_ENABLED=true`, PII yang dikesan disunting dalam muatan keluar. Ini tidak bergantung pada `INPUT_SANITIZER_MODE` (yang hanya mengawal dasar suntikan gesaan). Apabila penyuntingan dimatikan, panggilan merekodkan kiraan pengesanan tanpa menulis semula kandungan.
- **`postCall`** mengklonkan respons secara mendalam, menjalankan `sanitizePIIResponse()` ditambah masker bentuk API Respons (`maskResponsesOutput` — meliputi `output_text` dan `output[].content[].text`). Jika sebarang penyuntingan berlaku, respons yang diubah suai menggantikan yang asal.

Guardrail tidak pernah menyekat; ia hanya menganotasi (`meta.detections`, `meta.redacted`) atau menulis semula.

### Prompt Injection (`promptInjection.ts`)

Mengesan struktur bermusuhan dalam kandungan yang dibekalkan pengguna dan menguatkuasakan dasar yang dikonfigurasi. Tingkah laku didorong oleh pemboleh ubah persekitaran dan pilihan pembina:

| Tetapan        | Env var                                                                                               | Lalai  | Kesan                                                                                                                                                                                                              |
| -------------- | ----------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Didayakan      | `INPUT_SANITIZER_ENABLED`                                                                             | `true` | Apabila `false`, guardrail litar pintas.                                                                                                                                                                           |
| Mod            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn` | Polisi suntikan: `block`, `warn`, atau `log`. (`redact` diterima untuk keserasian ke belakang tetapi **tidak** menyingkirkan teks suntikan; permintaan penulisan semula PII dikawal oleh `PII_REDACTION_ENABLED`.) |
| Ambang sekatan | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high` | Tahap keterukan minimum yang diperlukan untuk menyekat. Sederhana adalah hanya pemerhatian secara lalai.                                                                                                           |

**Keutamaan Mod** (`getMode`): pemanggil `options.mode` →
`INJECTION_GUARD_MODE` **penggantian bendera ciri DB** (Papan Pemuka → Tetapan →
Bendera Ciri) → `INJECTION_GUARD_MODE` env → `INPUT_SANITIZER_MODE` env →
`warn`. Oleh itu, penggantian papan pemuka mengatasi pembolehubah env, jadi UI Bendera Ciri mengawal guard yang berjalan secara langsung (tiada mulakan semula). Pembacaan DB adalah selamat-gagal:
jika berlaku ralat, guard kembali kepada tingkah laku berasaskan env, dan apabila tiada penggantian ditetapkan, tingkah laku adalah sama dengan penyelesaian env-sahaja.

Sumber pengesanan:

1.  `sanitizeRequest()` daripada `@/shared/utils/inputSanitizer` (set pengesan
    kongsi yang digunakan di tempat lain dalam saluran paip).
2.  `DEFAULT_GUARD_PATTERNS` terbina dalam (pada masa ini `system_override_inline` dan
    `markdown_system_block`, kedua-duanya keterukan `high`).
3.  `customPatterns` pilihan yang dihantar melalui pilihan pembina (rentetan, regex,
    atau rekod `{ name, pattern, severity }`).

Apabila `mode === "block"` **dan** sekurang-kurangnya satu pengesanan memenuhi ambang
keterukan, `preCall` mengembalikan `{ block: true, message: "Request rejected:
suspicious content detected" }`. Dalam mod `warn`/`log`, guardrail mencatat tetapi
membenarkan panggilan. Pembantu kongsi `evaluatePromptInjection()` juga dieksport
untuk pemanggil yang perlu menilai gesaan tanpa melalui pendaftaran.

**Had Imbasan (v3.8.20):** pengesan hanya memeriksa **16 KB pertama** teks
gesaan yang digabungkan — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bait) dalam
`src/shared/utils/inputSanitizer.ts`. Kedua-dua `detectInjection()` dan
`evaluatePromptInjection()` `slice(0, MAX_INJECTION_SCAN_BYTES)` sebelum menjalankan
gelung corak. Arahan suntikan terletak berhampiran bahagian atas input, jadi ini
mengehadkan CPU/GC regex pada muatan beratus-ratus KB tanpa melemahkan pengesanan
(rujuk #3932, #4041).

### Penutup Kredensial (`credentialMasker.ts`)

Berjalan pada **kedua-dua** peringkat, terakhir dalam rantaian lalai (keutamaan `95`). Menutup
corak kunci API / token rahsia yang diketahui daripada muatan keluar (kandungan mesej,
argumen panggilan alat, hasil alat) **dan** respons pembekal, supaya kredensial
yang ditampal ke dalam gesaan (atau digemakan semula oleh hasil alat) tidak bocor
kepada pembekal huluan atau kembali kepada klien.

- **Pilihan ikut serta sahaja**, konvensyen yang sama seperti penutupan PII (Peraturan Keras #20-bersebelahan):
  dilumpuhkan melainkan `settings.credentialRedactionEnabled === true` **atau**
  `CREDENTIAL_REDACTION_ENABLED=true`. Apabila ia dimatikan, guardrail adalah operasi kosong —
  ia tidak pernah menyekat dan tidak pernah menulis semula.
- `redactCredentials()` melintasi pokok muatan/respons penuh (`walkValue()`,
  selamat daripada pencemaran prototaip, selamat daripada kitaran melalui `WeakSet`) dan
  menggantikan padanan dengan pemegang tempat `[REDACTED:<type>]`, mengklon hanya
  cawangan yang sebenarnya berubah.
- `CREDENTIAL_PATTERNS` meliputi kunci pembekal LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), token VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), kunci pembayaran (Stripe, Square),
  kunci awan (kunci akses AWS, Twilio, SendGrid, Mailgun), kunci peribadi / JWT,
  rentetan sambungan yang mengandungi kredensial (`mongodb://user:pass@...`, dsb.),
  dan corak nilai pengepala `Authorization`/`x-api-key`/`api-key`/`apikey` generik.
  Kunci berbentuk pengepala (`authorization`, `x-api-key`, `api-key`, `apikey`)
  ditutup secara struktur (nilai sahaja, awalan skema seperti `Bearer `/`Basic `
  dikekalkan) dan bukannya melalui regex teks generik.
- Guardrail tidak pernah menyekat; ia hanya menulis semula (`modifiedPayload` /
  `modifiedResponse`) dan menganotasi (`meta.credentialsRedacted`, `meta.count`).

Guard regresi: `tests/unit/credential-masker-guardrail.test.ts`.

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
  block?: boolean; // true short-circuits the chain
  message?: string; // surfaced when blocking
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returned by preCall to rewrite the request
  modifiedResponse?: TValue; // returned by postCall to rewrite the response
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

Guardrail memberi isyarat "tiada perubahan" dengan mengembalikan sama ada `void`, `{}`, atau
`{ block: false }`. Mengembalikan `modifiedPayload`/`modifiedResponse` menggantikan
nilai yang mengalir melalui rantaian untuk guardrail hiliran.
`signal?: AbortSignal` membawa kitaran hayat pemanggil ke dalam guardrail. Pembatalan permintaan adalah pengecualian fail-open yang disengajakan: jambatan media menghentikan kerja dan pembersihan tanpa memulihkan media mentah ke sasaran yang diketahui tidak menyokongnya.

## Pendaftar (`registry.ts`)

`guardrailRegistry` singleton mendedahkan:

- `register(guardrail)` — menambah (atau menggantikan mengikut nama yang dinormalisasi) guardrail dan
  menyusun semula mengikut `priority` menaik.
- `clear()` / `list()` — pembantu pentadbiran.
- `runPreCallHooks(payload, context)` — mengulangi guardrail aktif, mengalirkan
  payload melalui `modifiedPayload`, dan berhenti pada `block: true` yang pertama.
- `runPostCallHooks(response, context)` — aliran yang sama di bahagian respons.
- `resetGuardrailsForTests({ registerDefaults })` — mengosongkan keadaan dan secara pilihan
  mendaftar semula lalai untuk pengasingan ujian yang bersih.

Kedua-dua pelari mengembalikan `{ blocked, payload|response, results, guardrail?, message? }`
di mana `results` adalah tatasusunan rekod `GuardrailExecutionResult` yang merangkumi
medan `blocked`, `skipped`, `modified`, `error`, dan `meta` bagi setiap guardrail,
berguna untuk pengesanan.

### Melumpuhkan Guardrail Setiap Permintaan

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` mengagregatkan
senarai nama guardrail yang tidak diduplikasi yang harus dilangkau untuk permintaan semasa. Sumber (semua pilihan, semua digabungkan):

- `apiKeyInfo.disabledGuardrails`
- Badan permintaan `disabledGuardrails` (peringkat atas)
- Badan permintaan `metadata.disabledGuardrails`
- Header `x-omniroute-disabled-guardrails` (atau warisan
  `x-disabled-guardrails`)

Nilai boleh berupa tatasusunan rentetan atau rentetan yang dipisahkan koma; nama
dinormalisasi kepada kebab-case huruf kecil (`pii_masker` → `pii-masker`). Hasilnya
dihantar melalui `context.disabledGuardrails` ke pendaftar, yang melangkau
guardrail yang sepadan (`skipped: true` dalam `results`).

## Urutan Pelaksanaan

Untuk setiap permintaan yang mengalir melalui `src/sse/handlers/chat.ts` dan
`open-sse/handlers/chatCore.ts`:

1.  `resolveDisabledGuardrails(...)` membina senarai langkau daripada kunci API, badan,
    dan pengepala.
2.  `guardrailRegistry.runPreCallHooks(body, ctx)` menjalankan guardrail mengikut
    susunan keutamaan menaik:
    - Guardrail yang dilumpuhkan direkodkan sebagai `skipped`.
    - `preCall` setiap guardrail mungkin menulis semula muatan melalui `modifiedPayload`.
    - `block: true` yang pertama akan memendekkan rantaian dan pengendali mengembalikan
      respons penolakan guardrail.
3.  Muatan (yang berpotensi ditulis semula) mengalir ke dalam penghalaan kombo dan
    penghantaran huluan.
4.  Selepas respons dipasang, `guardrailRegistry.runPostCallHooks(...)`
    menjalankan rantaian yang sama pada respons. `block: true` di sini menggugurkan
    respons huluan.

Guardrail yang membuang ralat direkodkan dengan `error: <message>` dan dicatat melalui
`logger.warn`, tetapi rantaian berterusan — reka bentuk fail-open.

## Konfigurasi

Pembolehubah persekitaran yang dibaca oleh guardrail terbina dalam:

| Pembolehubah                          | Digunakan oleh        | Kesan                                                                                                      |
| :------------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`    | Tetapkan `false` untuk melumpuhkan pengesanan sepenuhnya.                                                  |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`    | Polisi suntikan: `warn`, `block`, atau `log`. Nilai warisan `redact` tidak menulis semula teks suntikan.   |
| `INJECTION_GUARD_MODE`                | `prompt-injection`    | Mod untuk pengawal suntikan; juga bendera ciri DB yang **mengatasi** pembolehubah persekitaran (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`    | Keterukan minimum yang `MODE=block` tolak: `high` (lalai), `medium`, atau `low`.                           |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`    | Alias warisan untuk `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                     |
| `PII_REDACTION_ENABLED`               | `pii-masker`          | Apabila `true`, PII permintaan disunting (tidak bergantung pada mod suntikan).                             |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (huluan) | Mengawal tingkah laku masker di sisi respons.                                                              |

Guardrail Modality Bridge membaca konfigurasi masa jalan daripada stor tetapan yang disokong DB
(`getSettings()`), bukan pembolehubah persekitaran. Kunci utama Vision ialah
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes`, dan
`modalityBridgeCacheMaxEntries`. Kunci `visionBridge*` warisan diterima hanya sebagai
penyelesaian sandaran bacaan satu kitaran yang didokumenkan; penulisan papan pemuka menggunakan
kunci utama. Nilai lalai dan penyelesaian sandaran terdapat dalam
`src/shared/constants/modalityBridgeDefaults.ts`, dengan pemalar warisan dikekalkan dalam
`src/shared/constants/visionBridgeDefaults.ts`.

Audio menggunakan `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout`, dan `modalityBridgeAudioMaxClips`, serta tetapan
`modalityBridgeCache*` yang dikongsi. Audio tidak mempunyai sandaran kunci warisan kerana
kunci-kunci ini diperkenalkan dengan skema Modality Bridge.

Video menggunakan `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos`, dan
`modalityBridgeVideoTimeout`, serta tetapan `modalityBridgeCache*` yang dikongsi.
Ia dilumpuhkan secara lalai kerana FFmpeg/ffprobe adalah kebergantungan operasi pilihan
dan kapsyen bingkai menambah kependaman serta kos model.

## Pengawal Tersuai

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

1.  Cipta `src/lib/guardrails/myGuardrail.ts` yang melanjutkan `BaseGuardrail`.
2.  Laksanakan `preCall` dan/atau `postCall`.
3.  Sama ada daftar pada masa import (tolak dari `registerDefaultGuardrails`) atau
    panggil `guardrailRegistry.register(...)` pada masa jalan — pendaftar menggantikan
    mana-mana pengawal terdahulu dengan nama yang dinormalisasi yang sama.
4.  Tambah ujian di bawah `tests/unit/` (contoh sedia ada:
    `tests/unit/guardrails-registry.test.ts`,
    `tests/unit/prompt-injection-guard.test.ts`,
    `tests/unit/guardrails/visionBridge.test.ts`).

## Pengujian

Gunakan `resetGuardrailsForTests()` antara ujian untuk bermula dari keadaan yang diketahui.
Luluskan `{ registerDefaults: false }` untuk bermula dengan pendaftar kosong dan
daftar hanya pengawal yang sedang diuji. Vision Bridge menerima suntikan kebergantungan
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge mendedahkan sambungan yang setara untuk tetapan, keupayaan, pemilihan model STT, semakan kelayakan, dan transkripsi. Ujian oleh itu boleh melaksanakan kedua-dua aliran tanpa akses DB atau rangkaian.

## Lihat Juga

- `src/lib/guardrails/` — pelaksanaan
- `src/shared/utils/inputSanitizer.ts` — pengesan kongsi yang menggerakkan
  suntikan prompt dan penyamaran PII
- `src/shared/constants/visionBridgeDefaults.ts` — lalai Vision Bridge dan
  senarai model jambatan paksa
- `src/shared/constants/modalityBridgeDefaults.ts` — lalai masa jalan Vision/Audio kongsi
- `docs/architecture/RESILIENCE_GUIDE.md` — lapisan ortogonal (pemutus litar, penyejukan)
- `docs/reference/ENVIRONMENT.md` — rujukan pemboleh ubah persekitaran penuh

## Liputan laluan pengawal suntikan & pasukan merah (Fasa 8 · Blok D)

Pengawal suntikan (`createInjectionGuard` / `withInjectionGuard`) meliputi semua laluan
yang menerima prompt pengguna. Ia menghormati `INJECTION_GUARD_MODE` (lalai `warn` = log sahaja;
`block` = mengembalikan HTTP 400 `SECURITY_001`).

| Jenis            | Laluan                                                                                                                                               | Mod lalai |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :-------- |
| Teks (sedia ada) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn      |
| Generatif        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn      |
| Data             | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn      |

Pengekstrakan teks (`extractMessageContents`) meliputi `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Pasukan merah (malam, `nightly-llm-security.yml`):** promptfoo mengesahkan bahawa setiap laluan menyekat
korpus OWASP-LLM dalam `INJECTION_GUARD_MODE=block`; garak menjalankan probe (melangkau tanpa rahsia).
`moderations` disertakan untuk konsistensi — pengendali dalam mod sekat boleh mengecualikannya melalui
`resolveDisabledGuardrails`.

Aliran kerja malam (`.github/workflows/nightly-llm-security.yml`, cron + penghantaran manual) mempunyai dua tugas:

- **`promptfoo-guard` (menyekat)** — menjalankan `promptfoo eval -c promptfooconfig.yaml`
  dengan `INJECTION_GUARD_MODE=block`. Setiap kes adversari (cth. "abaikan semua
  arahan sebelumnya...", jailbreak gaya DAN) menegaskan bahawa respons membawa
  `error.code === "SECURITY_001"`, iaitu pengawal sebenarnya menolak permintaan tersebut.
- **`garak` (nasihat)** — menjalankan garak `--probes promptinject,dan,leakreplay`
  terhadap instans OmniRoute tempatan (`http://localhost:20128/v1`). Terkawal oleh
  rahsia pembekal (`PROMPTFOO_PROVIDER_KEY`); melangkau dengan lancar dan diakhiri
  `|| true`, jadi ia melaporkan tanpa menyebabkan CI gagal.

Liputan pembantu pengawal (`createInjectionGuard` / `withInjectionGuard`)
merangkumi setiap laluan `/v1` yang membawa prompt; teks prompt ditarik dari
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` oleh
`extractMessageContents()` dalam `src/shared/utils/inputSanitizer.ts`.
