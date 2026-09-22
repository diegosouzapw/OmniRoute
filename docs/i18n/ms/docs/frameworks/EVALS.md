# Evaluations (Evals) (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Sumber rujukan utama:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Kemas kini terakhir:** 2026-06-28 — v3.8.40

OmniRoute disertakan dengan rangka kerja penilaian generik yang boleh anda gunakan untuk menanda aras konfigurasi penghalaan, penyedia/model tunggal, atau suit "set emas" yang disertakan. Gunakannya untuk mengesahkan perubahan penghalaan, mengesahkan penyedia baharu dan mengawal keluaran sebelum mengalihkannya kepada trafik pengeluaran.

Rangka kerja ini dilaksanakan sebagai:

- Pelaksana tulen (`src/lib/evals/evalRunner.ts`) yang mendaftarkan suit terbina dalam dalam memori, menilai output berdasarkan kriteria yang dijangkakan dan mengagregatkan kad skor.
- Lapisan pengekalan (`src/lib/db/evals.ts`) untuk suit tersuai (ditakrifkan oleh pengguna) dan rekod pelaksanaan terdahulu dalam SQLite.
- Lapisan pengorkestraan (`src/lib/evals/runtime.ts`) yang melaksanakan setiap kes dengan menghantar panggilan sebenar kepada `POST /v1/chat/completions`, merekodkan kependaman dan output serta mengekalkan pelaksanaan tersebut.
- Titik akhir REST di bawah `/api/evals/*` (pengesahan pengurusan sahaja).
- Paparan papan pemuka di `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Konsep

### Suit

Suit ialah koleksi bernama bagi kes ujian dengan `description` dan satu atau lebih kes. Suit berasal daripada dua sumber:

| Sumber     | Tempat ditakrifkan                                 | Boleh diubah semasa masa jalan? |
| ---------- | -------------------------------------------------- | ------------------------------- |
| `built-in` | Didaftarkan melalui `registerSuite()` semasa but   | Tidak (ditakrifkan dalam kod)   |
| `custom`   | Disimpan dalam SQLite `eval_suites` + `eval_cases` | Ya (melalui API/UI)             |

Suit terbina dalam semasa (lihat `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 kes garis dasar merangkumi sapaan/matematik/terjemahan/keselamatan
- `coding-proficiency` — pengesanan Python/JS/SQL/TS/pepijat
- `reasoning-logic` — silogisme, masalah berayat, pengecaman corak
- `multilingual` — terjemahan dan pengesanan bahasa
- `safety-guardrails` — PII, pemecahan sekatan, penolakan, kesedaran berat sebelah
- `instruction-following` — JSON sahaja, senarai bernombor, kekangan bahasa
- `codex-comparison` — tugasan pengekodan perbandingan langsung yang bertujuan untuk mod perbandingan

### Kes

Setiap kes mengandungi:

| Medan      | Penerangan                                                           |
| ---------- | -------------------------------------------------------------------- |
| `id`       | Pengecam stabil (digunakan sebagai kunci output dan metrik)          |
| `name`     | Label yang mudah dibaca manusia                                      |
| `model`    | Model lalai apabila pelaksanaan menggunakan sasaran `suite-default`  |
| `input`    | `{ messages, max_tokens? }` — dihantar kepada `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — rubrik pemarkahan (lihat di bawah)           |
| `tags`     | Label pilihan (cth. `safety`, `pii`, `jailbreak`)                    |

### Sasaran

Suit yang sama boleh dilaksanakan terhadap sasaran yang berbeza. Skema sasaran ialah `evalTargetSchema` dalam `src/shared/validation/schemas.ts`:

| Jenis sasaran   | `id`          | Tingkah laku                                                         |
| --------------- | ------------- | -------------------------------------------------------------------- |
| `suite-default` | `null`        | Setiap kes menggunakan medan `model` terbina dalamnya                |
| `model`         | nama model    | Paksa setiap kes melalui satu model langsung (cth. `gpt-4o`)         |
| `combo`         | nama gabungan | Jalankan setiap kes melalui satu gabungan (menguji enjin penghalaan) |

Untuk `model` dan `combo`, medan `id` diperlukan (dikuatkuasakan oleh Zod `superRefine`). Apabila `compareTarget` disediakan, kedua-dua sasaran mestilah berbeza — pelaksana mengekalkan kedua-dua pelaksanaan di bawah `runGroupId` yang sama untuk perbandingan A/B.

## Rubrik Pemarkahan

Dilaksanakan dalam `evaluateCase()` (evalRunner.ts):

| Strategi   | Lulus apabila…                                                                         |
| ---------- | -------------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                      |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                    |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` bernilai benar                         |
| `custom`   | `expected.fn(actualOutput, evalCase)` mengembalikan nilai benar (terbina dalam sahaja) |

**Nota:** Pemarkahan fungsi tersuai dikhaskan untuk suit yang ditakrifkan dalam kod
(terbina dalam) kerana fungsi tidak boleh disirikan melalui API.
`evalCaseBuilderSchema` hanya menerima `contains | exact | regex` untuk
suit yang dicipta oleh pengguna.

Pada masa ini, tiada penilai LLM-sebagai-hakim atau pemarkah keserupaan berasaskan pembenaman — ia
boleh menjadi titik peluasan yang kemas dalam `evaluateCase()`.

## Skema Pangkalan Data

Tiga jadual (migrasi `030_create_eval_runs.sql` dan
`031_create_eval_suites.sql`):

| Jadual        | Tujuan                                                                                                                             |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadata suit tersuai (`id`, `name`, `description`)                                                                                |
| `eval_cases`  | Kes bagi setiap suit — `input_json`, `expected_*`, `tags_json`                                                                     |
| `eval_runs`   | Pelaksanaan terdahulu — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Suit terbina dalam **tidak** disimpan dalam DB. Suit tersebut berada dalam memori dan
didaftarkan semula setiap kali `evalRunner.ts` diimport.

## API REST

Semua titik akhir memerlukan pengesahan pengurusan (`requireManagementAuth`) — ia bukan
sebahagian daripada permukaan proksi awam.

| Titik akhir                   | Kaedah   | Penerangan                                                             |
| ----------------------------- | -------- | ---------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Senaraikan suit + pelaksanaan terkini + kad skor + sasaran + kunci     |
| `/api/evals`                  | `POST`   | Jalankan suit (tunggal atau perbandingan) — skema `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Dapatkan satu suit (terbina dalam atau tersuai)                        |
| `/api/evals/suites`           | `POST`   | Cipta suit tersuai — skema `evalSuiteSaveSchema`                       |
| `/api/evals/suites/{suiteId}` | `GET`    | Dapatkan suit tersuai                                                  |
| `/api/evals/suites/{suiteId}` | `PUT`    | Gantikan suit tersuai (kes dimasukkan semula)                          |
| `/api/evals/suites/{suiteId}` | `DELETE` | Padam suit tersuai dan kesnya                                          |

### Menjalankan suit

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

Medan pilihan:

- `outputs` — `Record<caseId, string>` bagi output yang telah diprakira. Apabila diberikan,
  pelaksana **melangkau penghantaran** dan hanya memarkahkan output cache (berguna untuk
  penilaian luar talian).
- `compareTarget` — sasaran kedua untuk dijalankan secara selari; kedua-dua pelaksanaan berkongsi
  `runGroupId` yang dijana untuk paparan perbandingan secara langsung.
- `apiKeyId` — kunci API dalaman yang digunakan untuk mengesahkan panggilan
  `/v1/chat/completions` yang dihantar. Diperlukan apabila `REQUIRE_API_KEY` didayakan.

### Mencipta suit tersuai

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

## Saluran Pelaksanaan

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Menyelesaikan suit (terbina dalam atau tersuai).
2. Bagi setiap kes, membina `Request` ke `/v1/chat/completions` dengan
   `messages` kes tersebut, `model` yang telah diselesaikan, `stream: false`, dan
   `max_tokens: 512` (atau nilai ganti kes tersebut).
3. Memanggil pengendali sembang secara terus (dalam proses — tanpa lompatan HTTP tambahan).
4. Merekod kependaman dan mengekstrak teks sama ada daripada `choices[0].message.content`
   atau muatan `output[]` Responses API.
5. Memberi skor kepada semua output melalui `runSuite()`, kemudian menyimpannya melalui `saveEvalRun()`.

Kes dijalankan secara **berurutan**. Tiada bendera konkurensi buat masa ini.

## Papan Pemuka

UI terletak di `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Dari sana, anda
boleh:

- Melayari suit terbina dalam dan tersuai dengan pratonton kes demi kes.
- Mencipta/mengedit/memadam suit tersuai menggunakan pembina kes.
- Memilih sasaran (lalai suit / model / kombo), secara pilihan sasaran kedua
  `compareTarget`, secara pilihan kunci API, kemudian menjalankannya atas permintaan.
- Memeriksa sejarah pelaksanaan, status lulus/gagal bagi setiap kes, kependaman, dan output yang direkodkan.
- Melihat kad skor berterusan yang diagregatkan merentas pelaksanaan terkini bagi setiap
  skop `(suite, target)`.

## Hubungan dengan RFC Penilaian Automatik

Subsistem penilaian berasingan yang lebih khusus terletak di `src/domain/assessment/`
(lihat juga [AUTO-COMBO.md](../routing/AUTO-COMBO.md) untuk enjin pemarkahan langsung).
Subsistem tersebut menyasarkan enjin Auto Combo — memberi skor secara automatik kepada penyedia dan
model supaya kombo boleh memulihkan diri apabila sistem huluan gagal. Ia menggunakan pelaksana,
pengkategori, dan logik pemarkahannya sendiri.

Rangka kerja Evals yang didokumenkan di sini ialah **permukaan pengujian
serba guna yang lebih luas**. Utamakannya untuk suit regresi sewenang-wenangnya, perbandingan A/B,
dan ujian asap bagi setiap keluaran. Gunakan subsistem Penilaian Automatik apabila anda memerlukan
kesihatan penyedia masa nyata untuk mempengaruhi keputusan penghalaan.

## Integrasi CI

Tiada skrip npm `eval:ci` khusus buat masa ini. Terdapat dua kaedah jika anda mahu
menjadikan hasil penilaian sebagai syarat keluaran:

- **Kaedah HTTP**: jalankan pelayan, hantar permintaan ke `POST /api/evals` dengan
  `suiteId` + `target` yang diketahui, dan tegaskan bahawa `runs[].summary.passRate >= N` dalam
  respons.
- **Kaedah dalam proses**: import `runEvalSuiteAgainstTarget()` daripada
  `@/lib/evals/runtime` melalui skrip, jalankan terhadap pangkalan data ujian, dan semak
  `PersistedEvalRun.summary` yang dikembalikan.

Ujian yang merangkumi laluan dan sejarah terletak di
`tests/unit/evals-route.test.ts` dan `tests/unit/evals-history.test.ts`.

## Titik Sambungan

Perubahan lazim dan lokasi untuk melakukannya:

- **Strategi pemarkahan baharu** — lanjutkan blok `switch (evalCase.expected.strategy)`
  dalam `evaluateCase()` (`evalRunner.ts`) dan luaskan `EvalCaseStrategy` dalam
  `src/lib/db/evals.ts` serta `evalCaseBuilderSchema` dalam `schemas.ts`.
- **Suit terbina dalam baharu** — takrifkan objek suit dan panggil `registerSuite()` di
  bahagian bawah `evalRunner.ts`. Ia akan ditemui secara automatik oleh `listSuites()`.
- **Jalankan dengan konkurensi** — tukar gelung `for` berurutan dalam
  `runEvalSuiteAgainstTarget()` kepada `Promise.all` berbatas (tiada kawalan
  konkurensi buat masa ini).
- **Kes penstriman/panggilan alat** — pada masa ini pelaksana memaksa `stream: false`.
  Penilaian yang menyokong penstriman atau alat memerlukan perubahan dalam `runtime.ts`
  (rekod dan agregatkan ketulan SSE sebelum pemarkahan).

## Lihat Juga

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — panduan keseluruhan produk
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — rujukan saluran pemprosesan permintaan
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — enjin pemarkahan Auto Combo (masa jalan langsung)
- Sumber: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
