# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Dokumen ini menjelaskan fondasi perutean adaptif berbasis umpan balik yang ditambahkan ke
OmniRoute. Cakupannya sengaja dibuat kecil: fondasi ini memperkenalkan kanal hasil
perutean bertipe, sinyal kualitas daring yang menjadi masukan bagi penilai auto-combo
yang sudah ada, eksportir OpenTelemetry opsional, dan endpoint keterjelasan. Fondasi ini
**tidak** menggantikan tumpukan ketahanan yang sudah ada (circuit breaker, cooldown koneksi,
lockout model, matriks kesehatan, autopilot) — melainkan melengkapinya.

## 1. Konteks arsitektur

OmniRoute adalah bidang data dengan **jalur cepat permintaan** dan **bidang
kontrol/inteligensi**. Jalur cepat harus tetap cepat, hemat memori, asinkron, tangguh, dan
dapat diprediksi. Evaluasi, penilaian kualitas, eksperimen, dan analisis historis berada
di bidang kontrol.

```
Agen AI / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   bidang data (cepat, sinkron, dalam memori)
│  perutean / failover│
│  kesehatan/guardrail│
│  cache / streaming  │
└──────────┬──────────┘
           │ RoutingEvent (fire-and-forget, ~0.2µs)
           ▼
┌─────────────────────┐
│  Sink umpan balik   │   bidang kontrol (asinkron, upaya terbaik)
│  pelacak kualitas   │
│  eksportir OTel     │
│  penyimpanan explain│
└──────────┬──────────┘
           ▼  skor kualitas
      penilai auto-combo
```

### Yang sudah tersedia (diaudit, tidak diduplikasi)

| Konsep                                            | Implementasi yang sudah ada                                                                             |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Ketersediaan (dapatkah kita mengirimkan traffic?) | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, dipersistenkan di DB), cooldown koneksi, lockout model |
| Pelaporan kesehatan                               | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                 |
| Traffic bayangan                                  | `open-sse/services/combo/shadowRouting.ts`                                                              |
| Guardrail                                         | `src/lib/guardrails/` (hook sebelum/sesudah)                                                            |
| Cache eksak                                       | `src/lib/semanticCache.ts` (berbasis signature)                                                         |
| Evaluator / perutean berbasis evaluasi            | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                    |
| Keterjelasan keputusan combo                      | `open-sse/services/combo/decisionTrace.ts`                                                              |
| Peristiwa real-time dashboard                     | `src/lib/events/eventBus.ts` (kanal notifikasi UI, payload `unknown`, riwayat 100 entri)                |

Lapisan peristiwa perutean **bukan** implementasi ulang `eventBus`: bus tersebut merupakan
kanal notifikasi real-time milik dashboard (nama _peristiwa_ bertipe, payload
buram, konsumen UI). `RoutingEvent` adalah struct _hasil_ bertipe
(latensi/token/biaya/hasil/alasan-selesai) yang digunakan oleh sink umpan balik
bidang kontrol (pelacak kualitas, eksportir OTel, penyimpanan explain).

### Yang sebelumnya belum tersedia (ditambahkan di sini)

1. **Abstraksi peristiwa hasil perutean + sink bertipe** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` terbatas pada combo dan hanya dalam memori;
   `comboMetrics` merupakan penghitung kumulatif; `call_logs` merupakan persistensi asinkron mentah.
   Tidak satu pun merupakan kanal hasil berbasis sink dan bertipe yang dapat dilanggani oleh
   pelacak kualitas, eksportir OTel, atau evaluator bergaya Future-AGI.
2. **Sinyal kualitas daring** (EWMA) untuk kualitas output — sebelumnya, penilai
   memproksikan "kualitas" hanya melalui kecocokan tugas statis dan tingkat kelulusan evaluasi yang bersifat opt-in.
3. **Eksportir OTel opsional tanpa dependensi** yang menggunakan konvensi semantik GenAI.
4. **Endpoint keterjelasan** yang mengembalikan keputusan perutean aktual + status kualitas.

## 2. Peristiwa Routing (fondasi umpan balik)

File: `open-sse/services/routing/events.ts`, `.../index.ts`

Sebuah `RoutingEvent` hanya membawa metadata routing:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // union dengan daftar nilai yang diizinkan
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` adalah trait bergaya `Send+Sync` dalam TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // harus O(1), tanpa I/O sinkron
}
```

Hot path memanggil `emitRoutingEvent(event)` sekali untuk setiap permintaan yang selesai
(callback penyelesaian streaming, jalur keberhasilan non-streaming, dan jalur
kegagalan malformed-200 dalam `handleChatCore`). Dispatch dilakukan secara fan-out
sinkron ke sink yang terdaftar, tetapi setiap sink hanya mengantrekan/memperbarui
state dalam memori. **Tidak ada penulisan database sinkron dan tidak ada I/O
jaringan pada hot path.**

Sink default:

- `MemoryRoutingEventStore` — ring buffer terbatas (500), yang terbaru ditampilkan
  terlebih dahulu, untuk endpoint explain.
- Konsumen `QualityTracker` — memperbarui estimasi kualitas EWMA.
- `OtlpHttpsEventSink` — opsional, hanya diaktifkan ketika `OMNIROUTE_OTEL_ENDPOINT`
  (atau `OTEL_EXPORTER_OTLP_ENDPOINT`) ditetapkan.

### Overhead terukur (perbandingan yang jujur)

`npm run bench:routing-events` pada workstation ini (100 ribu iterasi; operasi
sub-µs diukur sebagai µs/operasi agregat karena persentil per operasi berada di
bawah resolusi timer `performance.now()`):

| Skenario                            | µs/operasi | operasi/dtk |
| ----------------------------------- | ---------- | ----------- |
| baseline (hanya penskoran)          | ~0.045     | ~22 M       |
| baseline + RoutingEvent (2 sink)    | ~0.168     | ~5.9 M      |
| baseline + event + antrean OTel     | ~0.163     | ~6.1 M      |
| konkuren (8 burst berselang-seling) | ~0.18      | —           |

Selisih dispatch peristiwa terhadap penskoran baseline adalah ~0.12 µs/permintaan;
sink OTel hanya mengantrekan (push buffer O(1)), tanpa menambahkan overhead yang
dapat diukur. Angka-angka ini spesifik untuk mesin ini dan bersifat relatif —
bukan jaminan produksi. Angka v1 "~0.2 µs" merupakan estimasi agregat; metodologi
ini memisahkan baseline penskoran dari biaya dispatch peristiwa.

## 3. Sinyal Kualitas (state penyedia berbasis umpan balik)

File: `open-sse/services/routing/quality.ts`

v2 memisahkan kualitas **operasional** dari kualitas **semantik**:

- **Operasional** — berasal dari hot path routing (HTTP 4xx/5xx, kegagalan
  koneksi, 429, respons rusak, interupsi stream, `finish_reason=length`,
  keberhasilan tanpa output, EWMA latensi/TTFT). Status 200 TIDAK diperlakukan
  sebagai kualitas semantik.
- **Semantik** — nilai aktual dari output yang dihasilkan. HANYA dihasilkan oleh
  evaluator melalui `setSemanticQuality()`. Nilainya tetap `null` hingga evaluator
  menyediakannya dan tidak pernah masuk ke skor operasional.

State per-(penyedia, model) (EWMA + penghitung terbatas):

- `successEwma` — EWMA (α=0.2) untuk keberhasilan hasil.
- `latencyEwma` / `ttftEwma` — EWMA latensi (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — seberapa baru model terakhir diamati.

### Kesadaran terhadap keyakinan / jumlah sampel

`confidence = clamp01(samples / 50)`, dan skor yang dikembalikan ke penskor
dipadukan menuju titik tengah netral:

```
score = 0.5 + confidence * (operational - 0.5)
```

Konsekuensi (diverifikasi melalui pengujian):

- Penyedia baru (0 sampel) memperoleh skor **0.5** — tidak dihukum secara tidak
  adil, tetapi tidak dapat mendominasi penyedia dengan ribuan observasi yang kuat.
- Penyedia dengan 7 keberhasilan yang beruntung ditarik menuju 0.5 (tidak pernah
  mendominasi karena inisialisasi yang optimistis).
- Penyedia dengan 50+ sampel akan konvergen ke skor operasional sebenarnya.
- Degradasi dan pemulihan berlangsung bertahap (EWMA), dan satu kegagalan
  terisolasi tidak menghancurkan penyedia yang sehat.

`ProviderQuality` mengekspos `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Data ini diberikan kepada penskor auto-combo sebagai faktor penskoran `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` dalam
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Total tetap 1.0.
- `buildAutoCandidates` mengisi `candidate.quality` dari tracker; kandidat tanpa
  data secara default memperoleh nilai netral **0.5** (kandidat baru tidak
  ditingkatkan maupun dihukum).

Siklus tertutupnya:

```
RoutingEvent → QualityTracker → getQualityScore → faktor kualitas auto-combo
      ↑                                                    │
      └────── hasil permintaan (handleChatCore) ←──────────┘
```

### Pengecualian tegas vs penalti lunak

Sinyal kualitas hanya merupakan **preferensi adaptif lunak**. Pengecualian tegas
tetap ditangani oleh stack resiliensi yang ada: circuit breaker OPEN, kuota habis,
kegagalan autentikasi, penguncian model — tidak satu pun dipengaruhi oleh skor
kualitas. Penyedia yang skor kualitasnya turun sementara akan dikurangi
prioritasnya, dan tidak pernah dinonaktifkan sepenuhnya.

## 3b. Pengaturan waktu stream kanonis (TTFT / ITL)

File: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` adalah satu-satunya titik instrumentasi untuk jalur streaming,
yang dihubungkan ke `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — chunk upstream pertama diterima.
- `markForward()` — chunk pertama diteruskan ke klien (digunakan untuk TTFT).
- `markInterrupted()` — timeout/abort/error stream sebelum selesai secara normal.
- `ttft()` = latensi chunk SSE pertama yang diteruskan. **Ini BUKAN TTFT tingkat token** —
  satu chunk SSE dapat membawa nol/satu/banyak token. Didokumentasikan secara tepat.
- `avgItlMs()` = rata-rata jeda antar-chunk (proksi latensi chunk untuk ITL).

TTFT/ITL/status interrupted dialirkan ke `RoutingEvent` (`ttftMs`, `itlMs`) dan
diekspor sebagai atribut span GenAI/OmniRoute oleh sink OTel.

## 4. Observabilitas OpenTelemetry / GenAI

File: `open-sse/services/routing/otel.ts`

- Eksportir OTLP/HTTP JSON tanpa dependensi (menggunakan `fetch` global, tanpa
  SDK `@opentelemetry/*`).
- Span mengikuti konvensi semantik GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) serta atribut perutean
  OmniRoute (hasil, status, ttft, percobaan ulang, fallback).
- `record()` hanya memasukkan data ke dalam buffer terbatas (O(1)); timer latar
  belakang melakukan flush secara asinkron melalui `POST {endpoint}/v1/traces`.
  Saat beban berlebih, event terlama dibuang (penghitung `dropped`) — tidak pernah
  memberikan backpressure pada bidang data.
- **Dinonaktifkan kecuali dikonfigurasi.** `OMNIROUTE_OTEL_ENDPOINT` (atau
  `OTEL_EXPORTER_OTLP_ENDPOINT`) harus ditetapkan; jika tidak, sink tidak
  didaftarkan dan tidak ada kode OTel yang dijalankan.

## 5. Keterjelasan keputusan

- `GET /v1/explain/routing` mengembalikan `RoutingEvent` terbaru (keputusan
  sebenarnya, yang paling baru terlebih dahulu) dan snapshot kualitas per penyedia/model.
- Autentikasi mengikuti `/v1/combos` (Bearer API key atau sesi dasbor; anonim pada
  deployment lokal pengguna tunggal dengan `REQUIRE_API_KEY=false`).
- Jejak per pemanggilan pada tingkat combo tetap tersedia melalui
  `decisionTrace.ts` yang sudah ada (header `X-OmniRoute-Combo-Trace`).
- Keamanan: event hanya memuat metadata perutean, tidak pernah memuat prompt/body/kredensial.

## 6. Integrasi bidang evaluasi (kesiapan Future AGI)

OmniRoute memperlakukan Future AGI (atau evaluator apa pun) sebagai **backend
kecerdasan/evaluasi potensial, bukan dependensi**. Titik integrasinya:

- `RoutingEventSink` dapat meneruskan event ke evaluator secara asinkron.
- `MemoryRoutingEventStore` + snapshot kualitas menyediakan aliran keputusan
  mentah bagi evaluator.
- `Evaluator` di masa mendatang (deterministik, penilai lokal, HTTP, WASM) akan
  mengonsumsi event/jejak dan mengembalikan `QualityScore` yang masuk ke jalur
  `getQualityScore`/faktor kualitas yang sama.
- Perutean berbasis evaluasi yang sudah ada (`open-sse/services/evalRouting.ts`)
  telah mengurutkan ulang target combo berdasarkan tingkat kelulusan `eval_runs`
  saat diaktifkan.

Tidak ada evaluasi yang berjalan secara sinkron pada jalur permintaan, dan gateway
beroperasi sepenuhnya tanpa kehadiran evaluator.

## 7. Tinjauan arsitektur akhir

1. **Apa yang tetap berada pada hot path sinkron?** Perutean/penilaian,
   pemeriksaan awal guardrail, pencarian cache, dan satu fan-out
   `emitRoutingEvent` (~0,12 µs di atas penilaian dasar) ke sink dalam memori.
2. **Apa yang dipindahkan ke pemrosesan asinkron?** Ekspor OTel (timer + fetch),
   persistensi `call_logs`/penggunaan, penulisan cache semantik; kualitas berada
   dalam memori dan O(1) (tidak memerlukan proses asinkron).
3. **Bagaimana hasil perutean menjadi umpan balik?** `handleChatCore`
   memancarkan `RoutingEvent` → `QualityTracker` memperbarui status EWMA →
   `getQualityScore` memasok faktor `quality` untuk auto-combo.
4. **Bagaimana kualitas memengaruhi perutean berikutnya?** Skor kualitas rendah
   mengurangi skor berbobot penyedia/model tersebut dalam `scoreAutoTargets`,
   sehingga model yang mengalami degradasi secara bertahap diturunkan
   prioritasnya dan pulih seiring membaiknya EWMA.
5. **Bagaimana Future AGI dapat diintegrasikan tanpa menjadi dependensi?**
   Melalui antarmuka `RoutingEventSink` / adaptor `Evaluator` di masa mendatang —
   tanpa dependensi yang di-hardcode.
6. **Apa yang terjadi ketika evaluator tidak tersedia?** Perutean tidak
   terpengaruh; kualitas kembali ke nilai netral (1.0) untuk model yang belum
   memiliki sinyal teramati.
7. **Apa yang terjadi ketika telemetri tidak tersedia?** Sink OTel tidak
   didaftarkan; bagian lain dari lapisan perutean tetap berjalan tanpa perubahan.
8. **Apa yang terjadi saat beban berlebih?** Buffer OTel membuang event terlama;
   kualitas dan ring buffer dibatasi secara bawaan; tidak ada backpressure.
9. **Bagaimana status penyedia pulih setelah mengalami degradasi?** EWMA kembali
   konvergen seiring bertambahnya keberhasilan; warmup menjaga model baru tetap
   netral; circuit breaker pulih secara independen melalui probe HALF_OPEN.
10. **Fitur usulan mana yang sengaja TIDAK diimplementasikan, dan mengapa?**
    - Shadow traffic / eksperimen — sudah diimplementasikan
      (`combo/shadowRouting.ts`); tidak dibuat ulang.
    - Guardrail — sudah diimplementasikan (`src/lib/guardrails/`); tidak
      diduplikasi.
    - Cache semantik — sudah diimplementasikan (`src/lib/semanticCache.ts`);
      tidak diduplikasi.
    - Platform manajemen eksperimen lengkap, alat bantu dataset, platform
      pengoptimalan prompt, DB vektor, atau infrastruktur OTel eksternal wajib —
      di luar cakupan bidang data yang ramping.
    - Struct `RoutingEvent` Rust — bidang data menggunakan TypeScript; tipe TS
      merupakan padanan yang telah diadaptasi.

## 8. Referensi konfigurasi

| Variabel                      | Default      | Efek                                                                                     |
| ----------------------------- | ------------ | ---------------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | tidak diatur | Jika diatur, mengaktifkan pengekspor jejak OTLP/HTTP (misalnya `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | tidak diatur | Alias cadangan untuk endpoint OTLP.                                                      |
| `OTEL_SERVICE_NAME`           | `omniroute`  | Atribut sumber daya `service.name`.                                                      |

## 9. Pengujian

- `tests/unit/routing-events.test.ts` — normalisasi peristiwa, klasifikasi
  status, buffer cincin terbatas, penyebaran ke sink + isolasi.
- `tests/unit/routing-quality.test.ts` — pemanasan EWMA, pemulihan kegagalan/keberhasilan,
  penalti anomali, penanganan sementara 429, snapshot, reset.
- `tests/unit/routing-scoring-quality.test.ts` — integritas bobot, default
  netral, pemeringkatan faktor kualitas.
- `tests/unit/routing-otel.test.ts` — gerbang pengaktifan, payload span GenAI, flush
  asinkron, pengabaian saat beban berlebih.
- `tests/unit/routing-events-concurrency.test.ts` — ribuan peristiwa, keterbatasan
  buffer cincin, isolasi sink yang melempar error, burst asinkron berselang-seling,
  reset saat penyisipan.
- `tests/unit/routing-adaptive-e2e.test.ts` — loop end-to-end deterministik melalui
  pemberi skor `scoreAutoTargets` yang sebenarnya: sehat → menurun → pulih → gangguan sesaat, serta
  skenario cold-start dan penyedia dingin yang beruntung.
- `tests/unit/stream-timing.test.ts` — TTFT (chunk pertama yang diteruskan), ITL,
  byte pertama vs penerusan pertama, interupsi, keamanan chunk rusak/kosong.

## 10. Status masalah yang sudah ada sebelumnya (Fase 18)

| Masalah                                             | Status                           | Catatan                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ketidakcocokan ekspor `omniglyph`                   | **DIPERBAIKI (lingkungan)**      | `node_modules` tidak sinkron dengan `package-lock.json` (versi terinstal 1.3.1 vs versi terkunci 1.4.0). Menjalankan `npm install omniglyph@1.4.0` memulihkan versi terkunci; error tipe turun menjadi 0. Manifes tidak berubah.                                                         |
| Pengujian `getKnownContextOverflow` yang usang      | **DIKETAHUI — tidak diperbaiki** | `combo-context-overflow-compression-probe.test.ts` mengimpor fungsi yang sudah tidak ada di `open-sse/services/combo.ts` (hanya komentar yang merujuknya). Perbaikannya memerlukan implementasi ulang atau penulisan ulang pengujian tersebut — perubahan arsitektur yang tidak terkait. |
| Isolasi DB `combo-runtime-unit-concurrency.test.ts` | **DIKETAHUI — tidak diperbaiki** | Assertion isolasi SQLite pada test harness gagal saat dijalankan secara langsung; gagal secara identik pada branch dasar.                                                                                                                                                                |
| Penyimpangan i18n `llm.txt`                         | **DIKETAHUI — tidak diperbaiki** | `docs/i18n/*/llm.txt` berbeda dari root; sudah ada sebelumnya dan memblokir gerbang pre-commit sinkronisasi dokumentasi.                                                                                                                                                                 |

Masalah lingkungan dan masalah kode tetap dibedakan; tidak ada kegagalan yang tidak terkait yang disembunyikan
di balik filter pengujian yang diubah.
