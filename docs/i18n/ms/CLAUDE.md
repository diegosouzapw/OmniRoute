# CLAUDE.md (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Fail ini memberikan panduan kepada Claude Code (claude.ai/code) apabila bekerja dengan kod dalam repositori ini.

## Permulaan Pantas

```bash
npm install                    # Pasang deps (auto-generate .env dari .env.example)
npm run dev                    # Pelayan dev di http://localhost:20128
npm run build                  # Pembinaan pengeluaran (Next.js 16 standalone)
npm run lint                   # ESLint (0 ralat dijangka; amaran adalah sedia ada)
npm run typecheck:core         # Semakan TypeScript (seharusnya bersih)
npm run typecheck:noimplicit:core  # Semakan ketat (tiada implicit any)
npm run test:coverage          # Ujian unit + pintu liputan (75/75/75/70 — kenyataan/garis/fungsi/cabang)
npm run check                  # lint + ujian digabungkan
npm run check:cycles           # Mengesan kebergantungan bulat
```

### Menjalankan Ujian

```bash
# Fail ujian tunggal (penjalur ujian asli Node.js — kebanyakan ujian)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (pelayan MCP, autoCombo, cache)
npm run test:vitest

# Semua suite
npm run test:all
```

Untuk matriks ujian penuh, lihat `CONTRIBUTING.md` → "Menjalankan Ujian". Untuk seni bina mendalam, lihat `AGENTS.md`.

---

## Projek Secara Ringkas

**OmniRoute** — proksi/router AI yang bersatu. Satu titik akhir, 160+ penyedia LLM, auto-fallback.

| Lapisan       | Lokasi                  | Tujuan                                                               |
| ------------- | ----------------------- | -------------------------------------------------------------------- |
| API Routes    | `src/app/api/v1/`       | Penghala Aplikasi Next.js — titik masuk                              |
| Handlers      | `open-sse/handlers/`    | Pemprosesan permintaan (chat, embeddings, dll)                       |
| Executors     | `open-sse/executors/`   | Penghantaran HTTP khusus penyedia                                    |
| Translators   | `open-sse/translator/`  | Penukaran format (OpenAI↔Claude↔Gemini)                              |
| Transformer   | `open-sse/transformer/` | API Respons ↔ Penyelesaian Chat                                      |
| Services      | `open-sse/services/`    | Penghalaan combo, had kadar, caching, dll                            |
| Database      | `src/lib/db/`           | Modul domain SQLite (45+ fail, 55 migrasi)                           |
| Domain/Policy | `src/domain/`           | Enjin dasar, peraturan kos, logik fallback                           |
| MCP Server    | `open-sse/mcp-server/`  | 37 alat (30 asas + 3 memori + 4 kemahiran), 3 pengangkutan, ~13 skop |
| A2A Server    | `src/lib/a2a/`          | Protokol agen JSON-RPC 2.0                                           |
| Skills        | `src/lib/skills/`       | Rangka kerja kemahiran yang boleh diperluas                          |
| Memory        | `src/lib/memory/`       | Memori perbualan yang berterusan                                     |

Monorepo: `src/` (aplikasi Next.js 16), `open-sse/` (workspace enjin streaming), `electron/` (aplikasi desktop), `tests/`, `bin/` (titik masuk CLI).

---

## Saluran Permintaan

```
Klien → /v1/chat/completions (laluan Next.js)
  → CORS → pengesahan Zod → auth? → semakan polisi → pengawal suntikan prompt
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → semakan cache → had kadar → penghalaan combo?
      → resolveComboTargets() → handleSingleModel() bagi setiap sasaran
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → terjemahan respons → aliran SSE atau JSON
    → Jika API Respons: responsesTransformer.ts TransformStream
```

Laluan API mengikuti pola yang konsisten: `Laluan → CORS preflight → pengesahan badan Zod → Auth pilihan (extractApiKey/isValidApiKey) → penguatkuasaan polisi kunci API → Delegasi Pengendali (open-sse)`. Tiada middleware global Next.js — pemotongan adalah khusus untuk laluan.

**Penghalaan combo** (`open-sse/services/combo.ts`): 14 strategi (keutamaan, berat, isi dahulu, bulatan, P2C, rawak, paling kurang digunakan, dioptimumkan kos, sedar reset, rawak ketat, auto, lkgp, dioptimumkan konteks, relay konteks). Setiap sasaran memanggil `handleSingleModel()` yang membungkus `handleChatCore()` dengan pengendalian ralat per-sasaran dan semakan pemutus litar. Lihat `docs/routing/AUTO-COMBO.md` untuk penilaian Auto-Combo 9 faktor dan `docs/architecture/RESILIENCE_GUIDE.md` untuk 3 lapisan ketahanan.

---

## Keadaan Runtime Ketahanan

OmniRoute mempunyai tiga mekanisme kegagalan sementara yang berkaitan tetapi berbeza. Pastikan skop mereka terpisah semasa menyahpepijat tingkah laku penghalaan. Lihat
[rajah ketahanan 3-lapisan](./docs/diagrams/exported/resilience-3layers.svg)
(sumber: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
untuk peta ringkas.

### Pemutus Litar Penyedia

**Skop**: keseluruhan penyedia, contohnya `glm`, `openai`, `anthropic`.

**Tujuan**: menghentikan penghantaran trafik kepada penyedia yang berulang kali gagal di
peringkat upstream/perkhidmatan, supaya satu penyedia yang tidak sihat tidak melambatkan setiap permintaan.

**Pelaksanaan**:

- Kelas teras: `src/shared/utils/circuitBreaker.ts`
- Penghantaran pintu/pendawaian pelaksanaan: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API status runtime: `src/app/api/monitoring/health/route.ts`
- Pembungkus bersama: `open-sse/services/accountFallback.ts`
- Jadual keadaan yang dipersisten: `domain_circuit_breakers`

**Keadaan**:

- `CLOSED`: trafik normal dibenarkan.
- `OPEN`: penyedia disekat sementara; pemanggil mendapat respons pemutus-litar-penyedia-terbuka
  atau penghalaan combo melangkau ke sasaran lain.
- `HALF_OPEN`: masa tamat reset telah berlalu; benarkan permintaan probe. Kejayaan menutup
  pemutus, kegagalan membukanya semula.

**Tetapan Lalai** (`open-sse/config/constants.ts`):

- Penyedia OAuth: ambang `3`, masa tamat reset `60s`.
- Penyedia kunci API: ambang `5`, masa tamat reset `30s`.
- Penyedia tempatan: ambang `2`, masa tamat reset `15s`.

Hanya status kegagalan peringkat penyedia yang seharusnya mencetuskan pemutus penyedia:

```ts
(408, 500, 502, 503, 504);
```

Jangan mencetuskan pemutus penyedia keseluruhan untuk kesalahan akaun/kunci/model normal seperti kebanyakan
kes `401`, `403`, atau `429`. Kes-kes tersebut biasanya berkaitan dengan cooldown sambungan atau penguncian model. Penyedia kunci API generik `403` seharusnya boleh dipulihkan kecuali ia diklasifikasikan
sebagai kesalahan penyedia/akaun terminal.

Pemutus menggunakan pemulihan malas, bukan pemasa latar belakang. Apabila `OPEN` tamat, bacaan seperti `getStatus()`, `canExecute()`, dan `getRetryAfterMs()` menyegarkan keadaan kepada
`HALF_OPEN`, supaya papan pemuka dan pembina calon combo tidak terus mengecualikan penyedia yang tamat selama-lamanya.

### Cooldown Sambungan

**Skop**: satu sambungan penyedia/akaun/kunci.

**Tujuan**: melangkau sementara satu kunci/akaun yang buruk sambil membenarkan sambungan lain untuk
penyedia yang sama terus memenuhi permintaan.

**Pelaksanaan**:

- Laluan tulis/kemas kini: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pemilihan/pengasingan akaun: `src/sse/services/auth.ts::getProviderCredentials...`
- Pengiraan cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Tetapan: `src/lib/resilience/settings.ts`

Medan penting pada sambungan penyedia:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Semasa pemilihan akaun, sambungan dilangkau sementara:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldown juga malas: apabila `rateLimitedUntil` berada di masa lalu, sambungan menjadi
layak semula. Pada penggunaan yang berjaya, `clearAccountError()` membersihkan `testStatus`,
`rateLimitedUntil`, medan ralat, dan `backoffLevel`.

Tingkah laku cooldown sambungan lalai:

- Cooldown asas OAuth: `5s`.
- Cooldown asas kunci API: `3s`.
- Kunci API `429` seharusnya lebih mengutamakan petunjuk retry upstream (`Retry-After`, header reset, atau
  teks reset yang boleh dibaca) apabila tersedia.
- Kegagalan boleh dipulihkan yang berulang menggunakan backoff eksponen:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Pengawal anti-thundering-herd menghalang kegagalan serentak pada sambungan yang sama daripada
berulang kali melanjutkan cooldown atau meningkatkan `backoffLevel` dua kali ganda.

Keadaan terminal bukan cooldown. `banned`, `expired`, dan `credits_exhausted` adalah
dimaksudkan untuk kekal tidak tersedia sehingga kelayakan/tetapan berubah atau seorang pengendali menetapkannya semula. Jangan menulis semula keadaan terminal dengan keadaan cooldown sementara.

### Penguncian Model

**Skop**: penyedia + sambungan + model.

**Tujuan**: mengelakkan melumpuhkan keseluruhan sambungan apabila hanya satu model tidak tersedia atau
had kuota untuk sambungan tersebut.

Contoh:

- Penyedia kuota per-model yang mengembalikan `429`.
- Penyedia tempatan yang mengembalikan `404` untuk satu model yang hilang.
- Kegagalan kebenaran mod/model khusus penyedia seperti mod Grok yang dipilih.

Penguncian model hidup dalam `open-sse/services/accountFallback.ts` dan membenarkan sambungan yang sama terus memenuhi model lain.

### Panduan Menyahpepijat

- Jika semua kunci untuk penyedia dilangkau, periksa kedua-dua keadaan pemutus penyedia dan setiap
  `rateLimitedUntil`/`testStatus` sambungan.
- Jika penyedia kelihatan kekal dikecualikan selepas tetingkap reset, semak sama ada kod
  membaca `state` mentah dan bukannya menggunakan `getStatus()`/`canExecute()`.
- Jika satu kunci penyedia gagal tetapi yang lain seharusnya berfungsi, lebih baik menggunakan cooldown sambungan daripada
  pemutus penyedia.
- Jika hanya satu model gagal, lebih baik menggunakan penguncian model daripada cooldown sambungan.
- Jika satu keadaan seharusnya pulih sendiri, ia seharusnya mempunyai cap waktu/reset masa depan dan laluan bacaan yang menyegarkan keadaan yang tamat. Status kekal memerlukan perubahan kelayakan
  atau konfigurasi secara manual.

## Konvensyen Utama

### Gaya Kod

- **2 ruang**, titik koma, petikan berganda, lebar 100 aksara, koma akhir es5 (dikuatkuasakan oleh lint-staged melalui Prettier)
- **Import**: luaran → dalaman (`@/`, `@omniroute/open-sse`) → relatif
- **Penamaan**: fail=camelCase/kebab, komponen=PascalCase, pemalar=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = ralat di mana-mana; `no-explicit-any` = amaran dalam `open-sse/` dan `tests/`
- **TypeScript**: `strict: false`, sasaran ES2022, modul esnext, resolusi bundler. Utamakan jenis eksplisit.

### Pangkalan Data

- **Sentiasa** melalui modul domain `src/lib/db/` — **jangan sekali-kali** menulis SQL mentah dalam laluan atau pengendali
- **Jangan sekali-kali** menambah logik ke dalam `src/lib/localDb.ts` (lapisan re-export sahaja)
- **Jangan sekali-kali** mengimport dari `localDb.ts` — import modul `db/` tertentu sebaliknya
- DB singleton: `getDbInstance()` dari `src/lib/db/core.ts` (penulisan jurnal WAL)
- Migrasi: `src/lib/db/migrations/` — fail SQL versi, idempotent, dijalankan dalam transaksi

### Pengendalian Ralat

- try/catch dengan jenis ralat tertentu, log dengan konteks pino
- Jangan sekali-kali menelan ralat dalam aliran SSE — gunakan isyarat abort untuk pembersihan
- Kembalikan kod status HTTP yang betul (4xx/5xx)

### Keselamatan

- **Jangan sekali-kali** menggunakan `eval()`, `new Function()`, atau eval tersirat
- Sahkan semua input dengan skema Zod
- Enkripsi kredensial dalam keadaan rehat (AES-256-GCM)
- Senarai denylist header upstream: `src/shared/constants/upstreamHeaders.ts` — pastikan sanitasi, skema Zod, dan ujian unit selaras semasa mengedit
- **Kredensial upstream awam** (Gemini/Antigravity/Windsurf-style OAuth client_id/secret + kunci Web Firebase yang diekstrak dari CLI awam): **HARUS** disematkan melalui `resolvePublicCred()` dari `open-sse/utils/publicCreds.ts` — **jangan sekali-kali** sebagai literal string. Lihat `docs/security/PUBLIC_CREDS.md` untuk pola yang wajib.
- **Respons ralat** (HTTP / SSE / pengendali executor / MCP): **HARUS** melalui `buildErrorBody()` atau `sanitizeErrorMessage()` dari `open-sse/utils/error.ts` — **jangan sekali-kali** meletakkan `err.stack` atau `err.message` mentah dalam badan respons. Lihat `docs/security/ERROR_SANITIZATION.md`.
- **Perintah shell yang dibina dari pembolehubah**: apabila memanggil `exec()`/`spawn()` dengan skrip yang memerlukan nilai runtime, hantarkan melalui pilihan `env` (automatik di-escape shell) — **jangan sekali-kali** interpolasi string laluan tidak dipercayai/luaran ke dalam badan skrip. Rujukan: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Perpustakaan yang selamat secara lalai** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): utamakan Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink berbanding pelaksanaan khusus apabila menambah permukaan sensitif keselamatan yang baru.

---

## Senario Pengubahsuaian Biasa

### Menambah Penyedia Baru

1. Daftar dalam `src/shared/constants/providers.ts` (disahkan Zod semasa memuat)
2. Tambah executor dalam `open-sse/executors/` jika logik khusus diperlukan (lanjutan `BaseExecutor`)
3. Tambah penterjemah dalam `open-sse/translator/` jika format bukan OpenAI
4. Tambah konfigurasi OAuth dalam `src/lib/oauth/constants/oauth.ts` jika berasaskan OAuth — jika CLI upstream menghantar client_id/secret awam, sematkan melalui `resolvePublicCred()` (lihat `docs/security/PUBLIC_CREDS.md`), **jangan sekali-kali** sebagai literal
5. Daftar model dalam `open-sse/config/providerRegistry.ts`
6. Tulis ujian dalam `tests/unit/` (sertakan pengesahan bentuk publicCreds jika anda menambah default yang disematkan baru)

### Menambah Laluan API Baru

1. Buat direktori di bawah `src/app/api/v1/your-route/`
2. Buat `route.ts` dengan pengendali `GET`/`POST`
3. Ikuti pola: CORS → pengesahan badan Zod → pengesahan pilihan → delegasi pengendali
4. Pengendali pergi ke dalam `open-sse/handlers/` (import dari situ, bukan dalam talian)
5. Respons ralat menggunakan `buildErrorBody()` / `errorResponse()` dari `open-sse/utils/error.ts` (auto-sanitized — jangan sekali-kali meletakkan `err.stack` atau `err.message` mentah dalam badan). Lihat `docs/security/ERROR_SANITIZATION.md`.
6. Tambah ujian — termasuk sekurang-kurangnya satu pengesahan bahawa respons ralat tidak bocorkan jejak tumpukan (`!body.error.message.includes("at /")`)

### Menambah Modul DB Baru

1. Buat `src/lib/db/yourModule.ts` — import `getDbInstance` dari `./core.ts`
2. Eksport fungsi CRUD untuk jadual domain anda
3. Tambah migrasi dalam `src/lib/db/migrations/` jika jadual baru diperlukan
4. Re-export dari `src/lib/localDb.ts` (tambahkan ke senarai re-export sahaja)
5. Tulis ujian

### Menambah Alat MCP Baru

1. Tambah definisi alat dalam `open-sse/mcp-server/tools/` dengan skema input Zod + pengendali asinkron
2. Daftar dalam set alat (disambungkan oleh `createMcpServer()`)
3. Tugaskan kepada skop yang sesuai
4. Tulis ujian (panggilan alat dicatat ke dalam jadual `mcp_audit`)

### Menambah Kemahiran A2A Baru

1. Buat kemahiran dalam `src/lib/a2a/skills/` (5 sudah ada: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Kemahiran menerima konteks tugas (mesej, metadata) → mengembalikan hasil terstruktur
3. Daftar dalam `A2A_SKILL_HANDLERS` dalam `src/lib/a2a/taskExecution.ts`
4. Dedahkan dalam `src/app/.well-known/agent.json/route.ts` (Kad Ejen)
5. Tulis ujian dalam `tests/unit/`
6. Dokumentasikan dalam jadual kemahiran `docs/frameworks/A2A-SERVER.md`

### Menambah Ejen Cloud Baru

1. Buat kelas ejen dalam `src/lib/cloudAgent/agents/` yang memperluas `CloudAgentBase` (3 sudah ada: codex-cloud, devin, jules)
2. Laksanakan `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Daftar dalam `src/lib/cloudAgent/registry.ts`
4. Tambah pengendalian OAuth/kredensial jika perlu (`src/lib/oauth/providers/`)
5. Ujian + dokumentasikan dalam `docs/frameworks/CLOUD_AGENT.md`

### Menambah Garis Panduan / Eval / Kemahiran / Acara Webhook Baru

- Garis panduan: `src/lib/guardrails/` → dokumen: `docs/security/GUARDRAILS.md`
- Suite Eval: `src/lib/evals/` → dokumen: `docs/frameworks/EVALS.md`
- Kemahiran (sandbox): `src/lib/skills/` → dokumen: `docs/frameworks/SKILLS.md`
- Acara Webhook: `src/lib/webhookDispatcher.ts` → dokumen: `docs/frameworks/WEBHOOKS.md`

## Dokumentasi Rujukan

Untuk sebarang perubahan yang tidak remeh, baca analisis mendalam yang sepadan terlebih dahulu:

| Kawasan                                        | Dokumen                                                           |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| Navigasi repo                                  | `docs/architecture/REPOSITORY_MAP.md`                             |
| Seni bina                                      | `docs/architecture/ARCHITECTURE.md`                               |
| Rujukan kejuruteraan                           | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (penilaian 9 faktor, 14 strategi)   | `docs/routing/AUTO-COMBO.md`                                      |
| Ketahanan (3 mekanisme)                        | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Ulangan penaakulan                             | `docs/routing/REASONING_REPLAY.md`                                |
| Rangka kerja kemahiran                         | `docs/frameworks/SKILLS.md`                                       |
| Sistem memori (FTS5 + Qdrant)                  | `docs/frameworks/MEMORY.md`                                       |
| Ejen awan                                      | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Garis panduan (PII / suntikan / visi)          | `docs/security/GUARDRAILS.md`                                     |
| Kelayakan awam hulu (Gemini/dll.)              | `docs/security/PUBLIC_CREDS.md`                                   |
| Pembersihan mesej ralat                        | `docs/security/ERROR_SANITIZATION.md`                             |
| Penilaian                                      | `docs/frameworks/EVALS.md`                                        |
| Pematuhan / audit                              | `docs/security/COMPLIANCE.md`                                     |
| Webhook                                        | `docs/frameworks/WEBHOOKS.md`                                     |
| Saluran pengesahan                             | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / cap jari)                       | `docs/security/STEALTH_GUIDE.md`                                  |
| Protokol ejen (A2A / ACP / Awan)               | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| Pelayan MCP                                    | `docs/frameworks/MCP-SERVER.md`                                   |
| Pelayan A2A                                    | `docs/frameworks/A2A-SERVER.md`                                   |
| Rujukan API + OpenAPI                          | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Katalog penyedia (dihasilkan secara automatik) | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Aliran pelepasan                               | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Ujian

| Apa                     | Perintah                                                               |
| ----------------------- | ---------------------------------------------------------------------- |
| Ujian unit              | `npm run test:unit`                                                    |
| Fail tunggal            | `node --import tsx/esm --test tests/unit/file.test.ts`                 |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                  |
| E2E (Playwright)        | `npm run test:e2e`                                                     |
| Protokol E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                           |
| Ekosistem               | `npm run test:ecosystem`                                               |
| Pintu liputan           | `npm run test:coverage` (75/75/75/70 — pernyataan/garis/fungsi/cabang) |
| Laporan liputan         | `npm run coverage:report`                                              |

**Peraturan PR**: Jika anda mengubah kod pengeluaran dalam `src/`, `open-sse/`, `electron/`, atau `bin/`, anda mesti menyertakan atau mengemas kini ujian dalam PR yang sama.

**Keutamaan lapisan ujian**: unit pertama → integrasi (multi-modul atau keadaan DB) → e2e (UI/aliran sahaja). Kodkan pengulangan pepijat sebagai ujian automatik sebelum atau bersama dengan pembetulan.

**Dasar liputan Copilot**: Apabila PR mengubah kod pengeluaran dan liputan berada di bawah 75% (pernyataan/garis/fungsi) atau 70% (cabang), jangan hanya laporkan — tambah atau kemas kini ujian, jalankan semula pintu liputan, kemudian minta pengesahan. Sertakan perintah yang dijalankan, fail ujian yang diubah, dan hasil liputan akhir dalam laporan PR.

---

## Aliran Kerja Git

```bash
# Jangan pernah komit terus ke main
git checkout -b feat/your-feature
git commit -m "feat: terangkan perubahan anda"
git push -u origin feat/your-feature
```

**Awalan cawangan**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Format komit** (Komit Konvensional): `feat(db): tambah pemutus litar` — skop: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Pautan Husky**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Persekitaran

- **Runtime**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, Modul ES
- **TypeScript**: 5.9+, sasaran ES2022, modul esnext, resolusi bundler
- **Alias laluan**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Port lalai**: 20128 (API + papan pemuka pada port yang sama)
- **Direktori data**: `DATA_DIR` env var, lalai kepada `~/.omniroute/`
- **Variabel env utama**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Persediaan: `cp .env.example .env` kemudian hasilkan `JWT_SECRET` (`openssl rand -base64 48`) dan `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Peraturan Ketat

1. Jangan pernah komit rahsia atau kelayakan
2. Jangan pernah tambah logik ke `localDb.ts`
3. Jangan pernah gunakan `eval()` / `new Function()` / eval tersirat
4. Jangan pernah komit terus ke `main`
5. Jangan pernah menulis SQL mentah dalam laluan — gunakan modul `src/lib/db/`
6. Jangan pernah menelan ralat secara senyap dalam aliran SSE
7. Sentiasa sahkan input dengan skema Zod
8. Sentiasa sertakan ujian apabila mengubah kod pengeluaran
9. Liputan mesti kekal ≥75% (pernyataan, garis, fungsi) / ≥70% (cabang). Ukuran semasa: ~82%.
10. Jangan pernah mengabaikan pautan Husky (`--no-verify`, `--no-gpg-sign`) tanpa kelulusan pengendali yang jelas.
11. Jangan pernah menyematkan client_id/secret OAuth awam atau kunci Web Firebase sebagai literal rentetan — sentiasa melalui `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Lihat `docs/security/PUBLIC_CREDS.md`.
12. Jangan pernah mengembalikan `err.stack` / `err.message` mentah dalam HTTP / SSE / respons pelaksana — sentiasa lalui `buildErrorBody()` atau `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Lihat `docs/security/ERROR_SANITIZATION.md`.
13. Jangan pernah interpolasi rentetan laluan luaran atau nilai runtime ke dalam skrip shell yang dihantar kepada `exec()`/`spawn()` — hantarkan melalui pilihan `env` sebaliknya. Rujukan: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Jangan pernah menolak amaran CodeQL / Pengimbasan Rahsia tanpa (a) terlebih dahulu memeriksa dokumen pola di atas untuk melihat jika pembantu terpakai, dan (b) merekodkan justifikasi teknikal dalam komen penolakan. Preseden: `js/stack-trace-exposure` yang dibangkitkan pada callsites yang sudah lalui `sanitizeErrorMessage()` adalah batasan CodeQL yang diketahui (pembersih khusus tidak dikenali) — tolak sebagai `false positive` merujuk kepada `docs/security/ERROR_SANITIZATION.md`.
15. Jangan pernah mendedahkan laluan yang memulakan proses anak (`/api/mcp/`, `/api/cli-tools/runtime/`) tanpa klasifikasi `isLocalOnlyPath()` dalam `src/server/authz/routeGuard.ts`. Penguatkuasaan loopback berlaku tanpa syarat sebelum sebarang semakan pengesahan — JWT yang bocor melalui terowong tidak boleh mencetuskan pemulaan proses. Lihat `docs/security/ROUTE_GUARD_TIERS.md`.
16. Jangan pernah menyertakan trailer `Co-Authored-By` dalam mesej komit. Komit mesti muncul semata-mata di bawah identiti Git pemilik repositori (`diegosouzapw`). Baris `Co-Authored-By: Claude …` menyebabkan GitHub mengaitkan komit kepada akaun `claude` Anthropic, menyembunyikan pengarang sebenar dalam sejarah PR.
