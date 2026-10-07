# Evaluations (Evals) (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Sumber acuan utama:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Terakhir diperbarui:** 2026-06-28 — v3.8.40

OmniRoute menyediakan kerangka kerja evaluasi generik yang dapat Anda gunakan untuk melakukan benchmark terhadap konfigurasi routing, penyedia/model tunggal, atau rangkaian "golden set" bawaan. Gunakan kerangka kerja ini untuk memverifikasi perubahan routing, memvalidasi penyedia baru, dan membatasi rilis sebelum mempromosikannya ke lalu lintas produksi.

Kerangka kerja ini diimplementasikan sebagai:

- Runner murni (`src/lib/evals/evalRunner.ts`) yang mendaftarkan rangkaian bawaan dalam memori, mengevaluasi keluaran berdasarkan kriteria yang diharapkan, dan mengagregasi kartu skor.
- Lapisan persistensi (`src/lib/db/evals.ts`) untuk rangkaian khusus (yang ditentukan pengguna) dan riwayat eksekusi di SQLite.
- Lapisan orkestrasi (`src/lib/evals/runtime.ts`) yang mengeksekusi setiap kasus dengan mengirimkan panggilan nyata ke `POST /v1/chat/completions`, mencatat latensi dan keluaran, serta menyimpan hasil eksekusi.
- Endpoint REST di bawah `/api/evals/*` (khusus autentikasi manajemen).
- Tampilan dasbor di `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Konsep

### Rangkaian

Rangkaian adalah kumpulan kasus uji bernama dengan sebuah `description` dan satu atau beberapa kasus. Rangkaian berasal dari dua sumber:

| Sumber     | Tempat didefinisikan                            | Dapat diubah saat runtime?    |
| ---------- | ----------------------------------------------- | ----------------------------- |
| `built-in` | Didaftarkan melalui `registerSuite()` saat boot | Tidak (ditentukan dalam kode) |
| `custom`   | Disimpan di SQLite `eval_suites` + `eval_cases` | Ya (melalui API/UI)           |

Rangkaian bawaan saat ini (lihat `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 kasus dasar yang mencakup sapaan/matematika/terjemahan/keamanan
- `coding-proficiency` — Python/JS/SQL/TS/deteksi bug
- `reasoning-logic` — silogisme, soal cerita, pengenalan pola
- `multilingual` — terjemahan dan deteksi bahasa
- `safety-guardrails` — PII, jailbreak, penolakan, kesadaran bias
- `instruction-following` — hanya JSON, daftar bernomor, batasan bahasa
- `codex-comparison` — tugas pemrograman langsung yang ditujukan untuk mode perbandingan

### Kasus

Setiap kasus memuat:

| Bidang     | Deskripsi                                                             |
| ---------- | --------------------------------------------------------------------- |
| `id`       | Pengidentifikasi stabil (digunakan sebagai kunci keluaran dan metrik) |
| `name`     | Label yang mudah dibaca manusia                                       |
| `model`    | Model default saat eksekusi menggunakan target `suite-default`        |
| `input`    | `{ messages, max_tokens? }` — dikirim ke `/v1/chat/completions`       |
| `expected` | `{ strategy, value }` — rubrik penilaian (lihat di bawah)             |
| `tags`     | Label opsional (misalnya `safety`, `pii`, `jailbreak`)                |

### Target

Rangkaian yang sama dapat dijalankan terhadap target yang berbeda. Skema targetnya adalah `evalTargetSchema` dalam `src/shared/validation/schemas.ts`:

| Jenis target    | `id`       | Perilaku                                                             |
| --------------- | ---------- | -------------------------------------------------------------------- |
| `suite-default` | `null`     | Setiap kasus menggunakan bidang `model` bawaannya                    |
| `model`         | nama model | Memaksa setiap kasus melalui satu model langsung (misalnya `gpt-4o`) |
| `combo`         | nama combo | Menjalankan setiap kasus melalui satu combo (menguji mesin routing)  |

Untuk `model` dan `combo`, bidang `id` wajib diisi (diberlakukan oleh Zod `superRefine`). Saat `compareTarget` diberikan, kedua target harus berbeda — runner menyimpan kedua eksekusi di bawah `runGroupId` yang sama untuk perbandingan A/B.

## Rubrik Penilaian

Diimplementasikan dalam `evaluateCase()` (evalRunner.ts):

| Strategi   | Lulus jika…                                                                      |
| ---------- | -------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`              |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` bernilai truthy                  |
| `custom`   | `expected.fn(actualOutput, evalCase)` mengembalikan nilai truthy (khusus bawaan) |

**Catatan:** Penilaian dengan fungsi khusus hanya tersedia untuk suite yang
didefinisikan dalam kode (bawaan) karena fungsi tidak dapat diserialisasi melalui
API. `evalCaseBuilderSchema` hanya menerima `contains | exact | regex` untuk
suite yang dibuat pengguna.

Saat ini belum ada penilai berbasis LLM atau kemiripan berbasis embedding —
`evaluateCase()` dapat menjadi titik ekstensi yang tepat untuk menambahkannya.

## Skema Database

Tiga tabel (migrasi `030_create_eval_runs.sql` dan
`031_create_eval_suites.sql`):

| Tabel         | Tujuan                                                                                                                        |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadata suite khusus (`id`, `name`, `description`)                                                                           |
| `eval_cases`  | Kasus per suite — `input_json`, `expected_*`, `tags_json`                                                                     |
| `eval_runs`   | Riwayat eksekusi — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Suite bawaan **tidak** disimpan dalam DB. Suite tersebut berada di memori dan
didaftarkan ulang setiap kali `evalRunner.ts` diimpor.

## REST API

Semua endpoint memerlukan autentikasi manajemen (`requireManagementAuth`) —
endpoint tersebut bukan bagian dari antarmuka proksi publik.

| Endpoint                      | Metode   | Deskripsi                                                                  |
| ----------------------------- | -------- | -------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Mencantumkan suite + eksekusi terbaru + kartu skor + target + kunci        |
| `/api/evals`                  | `POST`   | Menjalankan suite (tunggal atau perbandingan) — skema `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Mengambil satu suite (bawaan atau khusus)                                  |
| `/api/evals/suites`           | `POST`   | Membuat suite khusus — skema `evalSuiteSaveSchema`                         |
| `/api/evals/suites/{suiteId}` | `GET`    | Mengambil suite khusus                                                     |
| `/api/evals/suites/{suiteId}` | `PUT`    | Mengganti suite khusus (kasus dimasukkan ulang)                            |
| `/api/evals/suites/{suiteId}` | `DELETE` | Menghapus suite khusus beserta kasusnya                                    |

### Menjalankan suite

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

Kolom opsional:

- `outputs` — `Record<caseId, string>` berisi output yang telah dihitung
  sebelumnya. Jika disediakan, runner **melewati dispatch** dan hanya menilai
  output yang disimpan dalam cache (berguna untuk evaluasi offline).
- `compareTarget` — target kedua yang dijalankan secara paralel; kedua eksekusi
  berbagi `runGroupId` yang dihasilkan untuk tampilan perbandingan langsung.
- `apiKeyId` — kunci API internal yang digunakan untuk mengautentikasi panggilan
  `/v1/chat/completions` yang dikirim. Wajib ketika `REQUIRE_API_KEY` diaktifkan.

### Membuat suite khusus

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Pipeline Pengiriman

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Menentukan suite (bawaan atau kustom).
2. Untuk setiap kasus, membuat `Request` ke `/v1/chat/completions` dengan
   `messages` milik kasus tersebut, `model` yang telah ditentukan, `stream: false`, dan `max_tokens: 512`
   (atau nilai pengganti dari kasus tersebut).
3. Memanggil handler chat secara langsung (dalam proses — tanpa lompatan HTTP tambahan).
4. Mencatat latensi dan mengekstrak teks dari `choices[0].message.content`
   atau payload `output[]` dari Responses API.
5. Menilai semua output melalui `runSuite()`, lalu menyimpannya melalui `saveEvalRun()`.

Kasus dijalankan **secara berurutan**. Saat ini tidak ada flag konkurensi.

## Dasbor

UI berada di `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Dari sana, Anda
dapat:

- Menelusuri suite bawaan dan kustom dengan pratinjau per kasus.
- Membuat/mengedit/menghapus suite kustom dengan pembuat kasus.
- Memilih target (default suite / model / kombinasi), secara opsional target kedua
  `compareTarget`, secara opsional kunci API, lalu menjalankannya sesuai permintaan.
- Memeriksa riwayat eksekusi, status lulus/gagal per kasus, latensi, dan output yang direkam.
- Melihat kartu skor bergulir yang diagregasikan dari eksekusi terbaru untuk setiap
  cakupan `(suite, target)`.

## Hubungan dengan RFC Penilaian Otomatis

Subsistem penilaian terpisah yang lebih sempit berada di `src/domain/assessment/`
(lihat juga [AUTO-COMBO.md](../routing/AUTO-COMBO.md) untuk mesin penilaian langsung).
Subsistem tersebut menargetkan mesin Auto Combo — menilai penyedia dan
model secara otomatis agar kombinasi dapat memulihkan diri ketika layanan upstream gagal. Subsistem ini menggunakan runner,
pengategorisasi, dan logika penilaiannya sendiri.

Framework Evals yang didokumentasikan di sini merupakan **permukaan pengujian
serbaguna yang lebih luas**. Gunakan framework ini untuk suite regresi arbitrer, perbandingan A/B,
dan uji asap per rilis. Gunakan subsistem Penilaian Otomatis ketika Anda memerlukan
kondisi penyedia secara real-time untuk memengaruhi keputusan perutean.

## Integrasi CI

Saat ini tidak ada skrip npm `eval:ci` khusus. Terdapat dua cara jika Anda ingin
mengatur agar rilis bergantung pada hasil evaluasi:

- **Jalur HTTP**: jalankan server, akses `POST /api/evals` dengan
  `suiteId` + `target` yang diketahui, dan pastikan `runs[].summary.passRate >= N` dalam
  respons.
- **Jalur dalam proses**: impor `runEvalSuiteAgainstTarget()` dari
  `@/lib/evals/runtime` melalui skrip, jalankan terhadap DB pengujian, dan periksa
  `PersistedEvalRun.summary` yang dikembalikan.

Pengujian yang mencakup rute dan riwayat berada di
`tests/unit/evals-route.test.ts` dan `tests/unit/evals-history.test.ts`.

## Titik Ekstensi

Perubahan umum dan lokasi untuk menerapkannya:

- **Strategi penilaian baru** — perluas blok `switch (evalCase.expected.strategy)`
  di `evaluateCase()` (`evalRunner.ts`) dan perluas `EvalCaseStrategy` di
  `src/lib/db/evals.ts` serta `evalCaseBuilderSchema` di `schemas.ts`.
- **Suite bawaan baru** — definisikan objek suite dan panggil `registerSuite()` di
  bagian bawah `evalRunner.ts`. Suite tersebut akan ditemukan secara otomatis oleh `listSuites()`.
- **Eksekusi dengan konkurensi** — ubah perulangan `for` berurutan di
  `runEvalSuiteAgainstTarget()` menjadi `Promise.all` terbatas (saat ini tidak ada
  kontrol konkurensi).
- **Kasus streaming/pemanggilan alat** — saat ini runner memaksakan `stream: false`.
  Evaluasi yang mendukung streaming atau alat akan memerlukan perubahan di `runtime.ts`
  (merekam dan mengagregasikan potongan SSE sebelum penilaian).

## Lihat Juga

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — panduan lengkap produk
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — referensi alur pemrosesan permintaan
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — mesin penilaian Auto Combo (runtime aktif)
- Sumber: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
