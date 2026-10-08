# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Dokumen ini menerangkan asas penghalaan adaptif dipacu maklum balas yang ditambahkan pada
OmniRoute. Ia sengaja direka dalam skop kecil: ia memperkenalkan saluran hasil penghalaan
berjenis, isyarat kualiti dalam talian yang disalurkan kepada penilai auto-combo sedia ada,
pengeksport OpenTelemetry pilihan, dan titik akhir kebolehjelasan. Ia **tidak**
menggantikan tindanan daya tahan sedia ada (pemutus litar, tempoh bertenang sambungan,
penguncian model, matriks kesihatan, autopilot) — sebaliknya, ia melengkapkannya.

## 1. Konteks seni bina

OmniRoute ialah satah data dengan **laluan panas permintaan** dan **satah kawalan/kecerdasan**.
Laluan panas mesti kekal pantas, cekap memori, tak segerak, berdaya tahan dan
boleh diramal. Penilaian, pemarkahan kualiti, eksperimen dan analisis sejarah tergolong
dalam satah kawalan.

```
Ejen AI / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   satah data (pantas, segerak, dalam memori)
│  penghalaan /       │
│  tukar ganti        │
│  kesihatan / batasan│
│  cache / penstriman │
└──────────┬──────────┘
           │ RoutingEvent (lepas-dan-lupakan, ~0.2µs)
           ▼
┌─────────────────────┐
│  Penerima maklum    │   satah kawalan (tak segerak, usaha terbaik)
│  balas              │
│  penjejak kualiti   │
│  pengeksport OTel   │
│  stor penjelasan    │
└──────────┬──────────┘
           ▼  skor kualiti
      penilai auto-combo
```

### Perkara yang telah tersedia (diaudit, tidak diduplikasi)

| Konsep                                          | Pelaksanaan sedia ada                                                                                           |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Ketersediaan (bolehkah kita menghantar trafik?) | Pemutus litar (CLOSED/DEGRADED/OPEN/HALF_OPEN, disimpan dalam DB), tempoh bertenang sambungan, penguncian model |
| Pelaporan kesihatan                             | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                         |
| Trafik bayangan                                 | `open-sse/services/combo/shadowRouting.ts`                                                                      |
| Batasan                                         | `src/lib/guardrails/` (cangkuk pra/pasca)                                                                       |
| Cache tepat                                     | `src/lib/semanticCache.ts` (berasaskan tandatangan)                                                             |
| Penilai / penghalaan dipacu penilaian           | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                            |
| Kebolehjelasan keputusan combo                  | `open-sse/services/combo/decisionTrace.ts`                                                                      |
| Peristiwa masa nyata papan pemuka               | `src/lib/events/eventBus.ts` (saluran pemberitahuan UI, muatan `unknown`, sejarah 100 entri)                    |

Lapisan peristiwa penghalaan **bukan** pelaksanaan semula `eventBus`: bas tersebut ialah
saluran pemberitahuan masa nyata papan pemuka (nama _peristiwa_ berjenis, muatan
legap, pengguna UI). `RoutingEvent` ialah struktur _hasil_ berjenis
(kependaman/token/kos/hasil/sebab-penamatan) yang digunakan oleh penerima
maklum balas satah kawalan (penjejak kualiti, pengeksport OTel, stor penjelasan).

### Perkara yang tiada sebelum ini (ditambahkan di sini)

1. **Abstraksi peristiwa hasil penghalaan + penerima berjenis** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` terhad kepada combo dan hanya dalam memori;
   `comboMetrics` ialah pembilang kumulatif; `call_logs` ialah pengekalan tak segerak mentah.
   Tiada satu pun merupakan saluran hasil berjenis berasaskan penerima yang boleh dilanggan
   oleh penjejak kualiti, pengeksport OTel, atau penilai gaya Future-AGI.
2. **Isyarat kualiti dalam talian** (EWMA) untuk kualiti output — sebelum ini, penilai
   menganggar "kualiti" hanya melalui kesesuaian tugas statik dan kadar kelulusan penilaian
   ikut serta.
3. **Pengeksport OTel pilihan tanpa kebergantungan** yang menggunakan konvensyen semantik GenAI.
4. **Titik akhir kebolehjelasan** yang mengembalikan keputusan penghalaan sebenar + keadaan kualiti.

## 2. Peristiwa Penghalaan (asas maklum balas)

Fail: `open-sse/services/routing/events.ts`, `.../index.ts`

Sebuah `RoutingEvent` hanya membawa metadata penghalaan:

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
  outcome: RoutingOutcome; // gabungan yang disenaraibenarkan
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` ialah trait bergaya `Send+Sync` dalam TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // mestilah O(1), tanpa I/O segerak
}
```

Laluan panas memanggil `emitRoutingEvent(event)` sekali bagi setiap permintaan yang selesai
(panggilan balik pelengkapan penstriman, laluan kejayaan tanpa penstriman dan laluan
kegagalan 200-cacat dalam `handleChatCore`). Penghantaran ialah fan-out segerak
kepada sink yang berdaftar, tetapi setiap sink hanya membariskan/mengemas kini keadaan
dalam memori. **Tiada penulisan pangkalan data segerak, tiada I/O rangkaian pada laluan panas.**

Sink lalai:

- `MemoryRoutingEventStore` — penimbal gelang terbatas (500), terbaharu dahulu, untuk
  titik akhir penerangan.
- Pengguna `QualityTracker` — mengemas kini anggaran kualiti EWMA.
- `OtlpHttpsEventSink` — pilihan, didayakan hanya apabila `OMNIROUTE_OTEL_ENDPOINT`
  (atau `OTEL_EXPORTER_OTLP_ENDPOINT`) ditetapkan.

### Overhed terukur (perbandingan yang telus)

`npm run bench:routing-events` pada stesen kerja ini (100k lelaran; operasi sub-µs
diukur sebagai agregat µs/op kerana persentil setiap operasi berada di bawah
resolusi pemasa `performance.now()`):

| Senario                                    | µs/op  | ops/s  |
| ------------------------------------------ | ------ | ------ |
| garis dasar (pemarkahan sahaja)            | ~0.045 | ~22 M  |
| garis dasar + RoutingEvent (2 sink)        | ~0.168 | ~5.9 M |
| garis dasar + peristiwa + baris gilir OTel | ~0.163 | ~6.1 M |
| serentak (8 letusan berselang-seli)        | ~0.18  | —      |

Delta penghantaran peristiwa berbanding pemarkahan garis dasar ialah ~0.12 µs/permintaan; sink OTel
hanya membariskan (tolakan penimbal O(1)), tanpa menambahkan apa-apa yang boleh diukur. Angka-angka ini
khusus kepada mesin dan bersifat relatif — bukan jaminan pengeluaran. Angka v1 "~0.2 µs"
ialah anggaran agregat; metodologi ini memisahkan garis dasar pemarkahan
daripada kos penghantaran peristiwa.

## 3. Isyarat Kualiti (keadaan penyedia dipacu maklum balas)

Fail: `open-sse/services/routing/quality.ts`

v2 memisahkan kualiti **operasi** daripada kualiti **semantik**:

- **Operasi** — diperoleh daripada laluan panas penghalaan (HTTP 4xx/5xx, kegagalan
  sambungan, 429, respons cacat, gangguan strim, `finish_reason=length`,
  kejayaan tanpa output, EWMA kependaman/TTFT). Respons 200 TIDAK dianggap sebagai kualiti
  semantik.
- **Semantik** — nilai sebenar output yang dijana. HANYA dihasilkan oleh
  penilai melalui `setSemanticQuality()`. Nilainya ialah `null` sehingga diberikan oleh penilai dan
  tidak pernah meresap ke dalam skor operasi.

Keadaan setiap (penyedia, model) (EWMA + pembilang terbatas):

- `successEwma` — EWMA (α=0.2) bagi kejayaan hasil.
- `latencyEwma` / `ttftEwma` — EWMA kependaman (α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — tempoh sejak model kali terakhir diperhatikan.

### Kesedaran keyakinan / sampel

`confidence = clamp01(samples / 50)`, dan skor yang dikembalikan kepada pemarkah
diadunkan ke arah titik tengah neutral:

```
score = 0.5 + confidence * (operational - 0.5)
```

Akibatnya (disahkan oleh ujian):

- Penyedia baharu (0 sampel) mendapat skor **0.5** — tidak dihukum secara tidak adil, tetapi
  tidak mampu mengatasi penyedia dengan ribuan pemerhatian yang kukuh.
- Penyedia dengan 7 kejayaan bertuah ditarik ke arah 0.5 (tidak pernah mendominasi hasil
  pengasalan optimistik).
- Penyedia dengan 50+ sampel menumpu kepada skor operasi sebenar.
- Kemerosotan dan pemulihan berlaku secara beransur-ansur (EWMA), dan satu kegagalan terpencil
  tidak memusnahkan penyedia yang sihat.

`ProviderQuality` mendedahkan `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Ini membekalkan pemarkah gabungan automatik sebagai faktor pemarkahan `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` dalam
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. Jumlah kekal 1.0.
- `buildAutoCandidates` mengisi `candidate.quality` daripada penjejak; calon
  tanpa data menggunakan nilai neutral **0.5** secara lalai (calon baharu tidak dirangsang mahupun
  dihukum).

Gelung tertutup:

```
RoutingEvent → QualityTracker → getQualityScore → faktor kualiti gabungan automatik
      ↑                                                    │
      └────── hasil permintaan (handleChatCore) ←───────────┘
```

### Pengecualian keras berbanding penalti lembut

Isyarat kualiti hanyalah **keutamaan adaptif lembut**. Pengecualian keras kekal
dengan tindanan daya tahan sedia ada: pemutus litar OPEN, kuota habis,
kegagalan pengesahan, sekatan model — semua ini tidak dipengaruhi oleh skor kualiti.
Penyedia yang skor kualitinya menurun buat sementara waktu akan dikurangkan keutamaannya, tetapi tidak pernah
dinyahdayakan sepenuhnya.

## 3b. Pemasaan strim kanonik (TTFT / ITL)

Fail: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` ialah titik instrumentasi tunggal untuk laluan penstriman,
yang disambungkan ke `createSSEStream` (open-sse/utils/stream.ts):

- `markByte()` — ketulan huluan pertama diterima.
- `markForward()` — ketulan pertama dimajukan kepada klien (digunakan untuk TTFT).
- `markInterrupted()` — tamat masa/pembatalan/ralat strim sebelum selesai dengan sempurna.
- `ttft()` = kependaman ketulan SSE pertama yang dimajukan. **Ini BUKAN TTFT peringkat token** —
  satu ketulan SSE boleh membawa sifar/satu/banyak token. Didokumentasikan dengan tepat.
- `avgItlMs()` = purata sela antara ketulan (proksi kependaman ketulan untuk ITL).

TTFT/ITL/status terganggu dimasukkan ke dalam `RoutingEvent` (`ttftMs`, `itlMs`) dan
dieksport sebagai atribut span GenAI/OmniRoute oleh sinki OTel.

## 4. Kebolehcerapan OpenTelemetry / GenAI

Fail: `open-sse/services/routing/otel.ts`

- Pengeksport JSON OTLP/HTTP tanpa kebergantungan (menggunakan `fetch` global, tanpa
  SDK `@opentelemetry/*`).
- Span mematuhi konvensyen semantik GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) berserta atribut penghalaan
  OmniRoute (hasil, status, ttft, percubaan semula, sandaran).
- `record()` hanya memasukkan data ke dalam penimbal terbatas (O(1)); pemasa latar belakang
  mengosongkannya melalui `POST {endpoint}/v1/traces` secara tak segerak. Ketika beban berlebihan,
  peristiwa paling lama digugurkan (pembilang `dropped`) — satah data tidak sekali-kali dikenakan tekanan balik.
- **Dilumpuhkan melainkan dikonfigurasikan.** `OMNIROUTE_OTEL_ENDPOINT` (atau
  `OTEL_EXPORTER_OTLP_ENDPOINT`) mesti ditetapkan; jika tidak, sinki tidak
  didaftarkan dan tiada kod OTel dijalankan.

## 5. Kebolehjelasan

- `GET /v1/explain/routing` mengembalikan `RoutingEvent` terkini (keputusan sebenar,
  yang terbaharu dahulu) dan petikan kualiti bagi setiap penyedia/model.
- Pengesahan mencerminkan `/v1/combos` (kunci API Bearer atau sesi papan pemuka; akses tanpa nama pada
  penggunaan setempat pengguna tunggal dengan `REQUIRE_API_KEY=false`).
- Jejak setiap pemanggilan pada peringkat kombo kekal tersedia melalui
  `decisionTrace.ts` sedia ada (pengepala `X-OmniRoute-Combo-Trace`).
- Keselamatan: peristiwa hanya membawa metadata penghalaan, tidak pernah membawa prom/badan/kelayakan.

## 6. Penyepaduan satah penilaian (Kesediaan Future AGI)

OmniRoute menganggap Future AGI (atau mana-mana penilai) sebagai **bahagian belakang
kecerdasan/penilaian yang berpotensi, bukan kebergantungan**. Titik penyepaduannya:

- `RoutingEventSink` boleh memajukan peristiwa kepada penilai secara tak segerak.
- `MemoryRoutingEventStore` + petikan kualiti menyediakan aliran
  keputusan mentah kepada penilai.
- `Evaluator` pada masa hadapan (deterministik, penilai setempat, HTTP, WASM) akan menggunakan
  peristiwa/jejak dan mengembalikan `QualityScore` yang disalurkan ke laluan
  `getQualityScore`/faktor kualiti yang sama.
- Penghalaan dipacu penilaian sedia ada (`open-sse/services/evalRouting.ts`) sudah
  menyusun semula sasaran kombo mengikut kadar kelulusan `eval_runs` apabila didayakan.

Tiada penilaian dijalankan secara segerak pada laluan permintaan, dan get laluan beroperasi
sepenuhnya tanpa penilai.

## 7. Semakan seni bina akhir

1. **Apakah yang kekal pada laluan kritikal segerak?** Penghalaan/pemarkahan, prapemeriksaan
   pagar keselamatan, carian cache dan satu sebaran `emitRoutingEvent` (~0.12 µs berbanding
   pemarkahan garis dasar) kepada sinki dalam memori.
2. **Apakah yang dipindahkan kepada pemprosesan tak segerak?** Eksport OTel (pemasa + fetch),
   pengekalan `call_logs`/penggunaan, penulisan cache semantik; kualiti berada dalam memori
   dan O(1) (tidak memerlukan pemprosesan tak segerak).
3. **Bagaimanakah hasil penghalaan menjadi maklum balas?** `handleChatCore` mengeluarkan
   `RoutingEvent` → `QualityTracker` mengemas kini keadaan EWMA → `getQualityScore`
   membekalkan faktor `quality` untuk kombo automatik.
4. **Bagaimanakah kualiti mempengaruhi penghalaan masa hadapan?** Skor kualiti yang rendah mengurangkan
   skor berwajaran penyedia/model tersebut dalam `scoreAutoTargets`, lalu model yang merosot
   secara beransur-ansur kurang diutamakan dan pulih apabila EWMA model tersebut bertambah baik.
5. **Bagaimanakah Future AGI boleh disepadukan tanpa menjadi kebergantungan?** Melalui
   antara muka `RoutingEventSink` / penyesuai `Evaluator` pada masa hadapan — tiada
   kebergantungan yang dikod keras.
6. **Apakah yang berlaku apabila penilai tidak tersedia?** Penghalaan tidak terjejas;
   kualiti kembali kepada nilai neutral (1.0) untuk model tanpa isyarat yang diperhatikan.
7. **Apakah yang berlaku apabila telemetri tidak tersedia?** Sinki OTel tidak
   didaftarkan; selebihnya lapisan penghalaan berjalan tanpa perubahan.
8. **Apakah yang berlaku ketika beban berlebihan?** Penimbal OTel menggugurkan peristiwa paling lama; kualiti
   dan penimbal gelang terbatas secara reka bentuk; tiada tekanan balik.
9. **Bagaimanakah keadaan penyedia pulih selepas kemerosotan?** EWMA menumpu semula apabila
   kejayaan terkumpul; pemanasan memastikan model baharu kekal neutral; pemutus litar
   pulih secara bebas melalui prob HALF_OPEN.
10. **Ciri yang dicadangkan manakah yang sengaja TIDAK dilaksanakan, dan mengapa?**
    - Trafik bayangan / eksperimen — sudah dilaksanakan
      (`combo/shadowRouting.ts`); tidak dibina semula.
    - Pagar keselamatan — sudah dilaksanakan (`src/lib/guardrails/`); tidak diduplikasi.
    - Cache semantik — sudah dilaksanakan (`src/lib/semanticCache.ts`); tidak
      diduplikasi.
    - Platform pengurusan eksperimen lengkap, peralatan set data, platform pengoptimuman
      prom, DB vektor atau infrastruktur OTel luaran yang wajib — di luar
      skop bagi satah data yang ringkas.
    - Struct `RoutingEvent` Rust — satah data menggunakan TypeScript; jenis TS
      ialah padanan yang disesuaikan.

## 8. Rujukan konfigurasi

| Pemboleh ubah                 | Lalai            | Kesan                                                                                      |
| ----------------------------- | ---------------- | ------------------------------------------------------------------------------------------ |
| `OMNIROUTE_OTEL_ENDPOINT`     | tidak ditetapkan | Apabila ditetapkan, mendayakan pengeksport jejak OTLP/HTTP (cth. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | tidak ditetapkan | Alias sandaran untuk titik akhir OTLP.                                                     |
| `OTEL_SERVICE_NAME`           | `omniroute`      | Atribut sumber `service.name`.                                                             |

## 9. Ujian

- `tests/unit/routing-events.test.ts` — penormalan peristiwa, pengelasan status,
  penimbal gelang terbatas, pengagihan ke sinki + pengasingan.
- `tests/unit/routing-quality.test.ts` — pemanasan EWMA, pemulihan kegagalan/kejayaan,
  penalti anomali, pengendalian sementara 429, petikan keadaan, tetapan semula.
- `tests/unit/routing-scoring-quality.test.ts` — integriti pemberat, nilai lalai
  neutral, penarafan faktor kualiti.
- `tests/unit/routing-otel.test.ts` — pengawalan pengaktifan, muatan span GenAI, pengosongan
  tak segerak, pengguguran ketika beban lampau.
- `tests/unit/routing-events-concurrency.test.ts` — ribuan peristiwa, keterbatasan
  penimbal gelang, pengasingan sinki yang membuang pengecualian, ledakan tak segerak berselang-seli,
  tetapan semula semasa sisipan.
- `tests/unit/routing-adaptive-e2e.test.ts` — gelung hujung-ke-hujung deterministik melalui
  pemberi skor sebenar `scoreAutoTargets`: sihat → merosot → pulih → gangguan seketika, serta
  senario permulaan dingin dan penyedia dingin yang bernasib baik.
- `tests/unit/stream-timing.test.ts` — TTFT (ketulan pertama yang dimajukan), ITL,
  bait pertama berbanding pemajuan pertama, gangguan, keselamatan ketulan cacat/kosong.

## 10. Status isu sedia ada (Fasa 18)

| Isu                                                     | Status                        | Catatan                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ketidakpadanan eksport `omniglyph`                      | **DIBAIKI (persekitaran)**    | `node_modules` tidak segerak dengan `package-lock.json` (1.3.1 dipasang berbanding 1.4.0 yang dikunci). Menjalankan `npm install omniglyph@1.4.0` memulihkan versi yang dikunci; ralat jenis berkurang kepada 0. Manifes tidak berubah.                                                  |
| Ujian `getKnownContextOverflow` yang lapuk              | **DIKETAHUI — tidak dibaiki** | `combo-context-overflow-compression-probe.test.ts` mengimport fungsi yang tidak lagi wujud dalam `open-sse/services/combo.ts` (hanya ulasan merujuk kepadanya). Pembetulan memerlukan pelaksanaan semula atau penulisan semula ujian tersebut — rombakan seni bina yang tidak berkaitan. |
| Pengasingan DB `combo-runtime-unit-concurrency.test.ts` | **DIKETAHUI — tidak dibaiki** | Penegasan pengasingan SQLite dalam kerangka ujian gagal apabila dijalankan secara langsung; gagal dengan cara yang sama pada cabang asas.                                                                                                                                                |
| Penyimpangan i18n `llm.txt`                             | **DIKETAHUI — tidak dibaiki** | `docs/i18n/*/llm.txt` berbeza daripada akar; isu sedia ada yang menyekat pagar pra-komit penyegerakan dokumentasi.                                                                                                                                                                       |

Isu persekitaran dan isu kod dikekalkan secara berasingan; tiada kegagalan yang tidak berkaitan disembunyikan
di sebalik penapis ujian yang diubah.
