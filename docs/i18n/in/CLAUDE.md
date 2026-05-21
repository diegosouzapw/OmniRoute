# CLAUDE.md (Bahasa Indonesia (Alt))

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

File ini memberikan panduan untuk Claude Code (claude.ai/code) saat bekerja dengan kode di repositori ini.

## Memulai dengan Cepat

```bash
npm install                    # Instal deps (secara otomatis menghasilkan .env dari .env.example)
npm run dev                    # Server dev di http://localhost:20128
npm run build                  # Build produksi (Next.js 16 standalone)
npm run lint                   # ESLint (0 kesalahan yang diharapkan; peringatan sudah ada sebelumnya)
npm run typecheck:core         # Pemeriksaan TypeScript (harus bersih)
npm run typecheck:noimplicit:core  # Pemeriksaan ketat (tidak ada implicit any)
npm run test:coverage          # Unit tests + coverage gate (75/75/75/70 — pernyataan/garis/fungsi/cabang)
npm run check                  # lint + test digabungkan
npm run check:cycles           # Deteksi ketergantungan melingkar
```

### Menjalankan Tes

```bash
# File tes tunggal (penguji native Node.js — sebagian besar tes)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (server MCP, autoCombo, cache)
npm run test:vitest

# Semua suite
npm run test:all
```

Untuk matriks tes lengkap, lihat `CONTRIBUTING.md` → "Menjalankan Tes". Untuk arsitektur mendalam, lihat `AGENTS.md`.

---

## Proyek Sekilas

**OmniRoute** — proxy/router AI terpadu. Satu endpoint, 160+ penyedia LLM, auto-fallback.

| Lapisan       | Lokasi                  | Tujuan                                                                      |
| ------------- | ----------------------- | --------------------------------------------------------------------------- |
| API Routes    | `src/app/api/v1/`       | Next.js App Router — titik masuk                                            |
| Handlers      | `open-sse/handlers/`    | Pemrosesan permintaan (chat, embeddings, dll)                               |
| Executors     | `open-sse/executors/`   | Pengiriman HTTP spesifik penyedia                                           |
| Translators   | `open-sse/translator/`  | Konversi format (OpenAI↔Claude↔Gemini)                                      |
| Transformer   | `open-sse/transformer/` | API Respons ↔ Penyelesaian Chat                                             |
| Services      | `open-sse/services/`    | Routing combo, batas kecepatan, caching, dll                                |
| Database      | `src/lib/db/`           | Modul domain SQLite (45+ file, 55 migrasi)                                  |
| Domain/Policy | `src/domain/`           | Mesin kebijakan, aturan biaya, logika fallback                              |
| MCP Server    | `open-sse/mcp-server/`  | 37 alat (30 dasar + 3 memori + 4 keterampilan), 3 transportasi, ~13 lingkup |
| A2A Server    | `src/lib/a2a/`          | Protokol agen JSON-RPC 2.0                                                  |
| Skills        | `src/lib/skills/`       | Kerangka keterampilan yang dapat diperluas                                  |
| Memory        | `src/lib/memory/`       | Memori percakapan yang persisten                                            |

Monorepo: `src/` (aplikasi Next.js 16), `open-sse/` (workspace mesin streaming), `electron/` (aplikasi desktop), `tests/`, `bin/` (titik masuk CLI).

---

## Jalur Permintaan

```
Klien → /v1/chat/completions (rute Next.js)
  → CORS → validasi Zod → otentikasi? → pemeriksaan kebijakan → penjaga injeksi prompt
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → pemeriksaan cache → batasan laju → pengalihan combo?
      → resolveComboTargets() → handleSingleModel() per target
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → coba lagi dengan backoff
    → terjemahan respons → aliran SSE atau JSON
    → Jika API Respons: responsesTransformer.ts TransformStream
```

Rute API mengikuti pola yang konsisten: `Rute → CORS preflight → validasi body Zod → Otentikasi opsional (extractApiKey/isValidApiKey) → penegakan kebijakan kunci API → Delegasi Handler (open-sse)`. Tidak ada middleware global Next.js — intersepsi bersifat spesifik rute.

**Pengalihan combo** (`open-sse/services/combo.ts`): 14 strategi (prioritas, berbobot, isi-terlebih-dahulu, round-robin, P2C, acak, paling-sedikit-digunakan, biaya-teroptimalisasi, sadar-reset, acak-ketat, otomatis, lkgp, teroptimalkan-konteks, relay-konteks). Setiap target memanggil `handleSingleModel()` yang membungkus `handleChatCore()` dengan penanganan kesalahan per-target dan pemeriksaan pemutus sirkuit. Lihat `docs/routing/AUTO-COMBO.md` untuk penilaian Auto-Combo 9-faktor dan `docs/architecture/RESILIENCE_GUIDE.md` untuk 3 lapisan ketahanan.

---

## Status Runtime Ketahanan

OmniRoute memiliki tiga mekanisme kegagalan sementara yang terkait tetapi berbeda. Jaga agar ruang lingkup mereka terpisah saat melakukan debugging perilaku pengalihan. Lihat diagram
[3-lapisan ketahanan](./docs/diagrams/exported/resilience-3layers.svg)
(sumber: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
untuk peta sekilas.

### Pemutus Sirkuit Penyedia

**Ruang Lingkup**: seluruh penyedia, misalnya `glm`, `openai`, `anthropic`.

**Tujuan**: menghentikan pengiriman lalu lintas ke penyedia yang terus-menerus gagal di tingkat upstream/layanan, sehingga satu penyedia yang tidak sehat tidak memperlambat setiap permintaan.

**Implementasi**:

- Kelas inti: `src/shared/utils/circuitBreaker.ts`
- Pemasangan gerbang/chat eksekusi: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API status runtime: `src/app/api/monitoring/health/route.ts`
- Pembungkus bersama: `open-sse/services/accountFallback.ts`
- Tabel status yang dipersistenkan: `domain_circuit_breakers`

**Status**:

- `CLOSED`: lalu lintas normal diizinkan.
- `OPEN`: penyedia diblokir sementara; pemanggil mendapatkan respons pemutus-sirkuit-penyedia-terbuka
  atau pengalihan combo melewati target lain.
- `HALF_OPEN`: waktu reset telah berlalu; izinkan permintaan probe. Keberhasilan menutup
  pemutus, kegagalan membukanya lagi.

**Defaults** (`open-sse/config/constants.ts`):

- Penyedia OAuth: ambang `3`, waktu reset `60s`.
- Penyedia kunci API: ambang `5`, waktu reset `30s`.
- Penyedia lokal: ambang `2`, waktu reset `15s`.

Hanya status kegagalan tingkat penyedia yang harus memicu pemutus penyedia:

```ts
(408, 500, 502, 503, 504);
```

Jangan memicu pemutus seluruh-penyedia untuk kesalahan akun/kunci/model normal seperti kebanyakan
kasus `401`, `403`, atau `429`. Itu biasanya termasuk dalam cooldown koneksi atau penguncian model. Penyedia kunci API generik `403` harus dapat dipulihkan kecuali diklasifikasikan
sebagai kesalahan penyedia/akun terminal.

Pemutus menggunakan pemulihan malas, bukan timer latar belakang. Ketika `OPEN` kedaluwarsa, pembacaan seperti `getStatus()`, `canExecute()`, dan `getRetryAfterMs()` menyegarkan status menjadi
`HALF_OPEN`, sehingga dasbor dan pembangun kandidat combo tidak terus mengecualikan penyedia yang kedaluwarsa selamanya.

### Cooldown Koneksi

**Ruang Lingkup**: satu koneksi/akun/kunci penyedia.

**Tujuan**: sementara melewatkan satu kunci/akun yang buruk sambil memungkinkan koneksi lain untuk
penyedia yang sama terus melayani permintaan.

**Implementasi**:

- Jalur tulis/perbarui: `src/sse/services/auth.ts::markAccountUnavailable()`
- Pemilihan/filtering akun: `src/sse/services/auth.ts::getProviderCredentials...`
- Perhitungan cooldown: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Pengaturan: `src/lib/resilience/settings.ts`

Bidang penting pada koneksi penyedia:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Selama pemilihan akun, koneksi dilewatkan sementara:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Cooldown juga malas: ketika `rateLimitedUntil` berada di masa lalu, koneksi menjadi
layak lagi. Pada penggunaan yang berhasil, `clearAccountError()` menghapus `testStatus`,
`rateLimitedUntil`, bidang kesalahan, dan `backoffLevel`.

Perilaku default cooldown koneksi:

- Cooldown dasar OAuth: `5s`.
- Cooldown dasar kunci API: `3s`.
- Kunci API `429` harus lebih memilih petunjuk coba lagi upstream (`Retry-After`, header reset, atau
  teks reset yang dapat diuraikan) jika tersedia.
- Kegagalan yang dapat dipulihkan berulang menggunakan backoff eksponensial:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Penjaga anti-thundering-herd mencegah kegagalan bersamaan pada koneksi yang sama dari
berulang kali memperpanjang cooldown atau menggandakan `backoffLevel`.

Status terminal bukanlah cooldown. `banned`, `expired`, dan `credits_exhausted` dimaksudkan untuk tetap tidak tersedia sampai kredensial/pengaturan berubah atau operator meresetnya. Jangan menimpa status terminal dengan status cooldown sementara.

### Penguncian Model

**Ruang Lingkup**: penyedia + koneksi + model.

**Tujuan**: menghindari menonaktifkan seluruh koneksi ketika hanya satu model yang tidak tersedia atau
terbatas kuota untuk koneksi tersebut.

Contoh:

- Penyedia kuota per-model yang mengembalikan `429`.
- Penyedia lokal yang mengembalikan `404` untuk satu model yang hilang.
- Kegagalan izin mode/model spesifik penyedia seperti mode Grok yang dipilih.

Penguncian model berada di `open-sse/services/accountFallback.ts` dan memungkinkan koneksi yang sama
terus melayani model lain.

### Panduan Debugging

- Jika semua kunci untuk penyedia dilewatkan, periksa status pemutus penyedia dan setiap
  koneksi `rateLimitedUntil`/`testStatus`.
- Jika penyedia tampak secara permanen dikecualikan setelah jendela reset, periksa apakah kode
  membaca `state` mentah alih-alih menggunakan `getStatus()`/`canExecute()`.
- Jika satu kunci penyedia gagal tetapi yang lain seharusnya berfungsi, lebih baik memilih cooldown koneksi daripada
  pemutus penyedia.
- Jika hanya satu model yang gagal, lebih baik memilih penguncian model daripada cooldown koneksi.
- Jika sebuah status seharusnya pulih sendiri, itu harus memiliki cap waktu/reset timeout di masa depan dan jalur
  baca yang menyegarkan status yang kedaluwarsa. Status permanen memerlukan perubahan kredensial
  atau konfigurasi manual.

## Konvensi Kunci

### Gaya Kode

- **2 spasi**, titik koma, tanda kutip ganda, lebar 100 karakter, koma trailing es5 (ditegakkan oleh lint-staged melalui Prettier)
- **Impor**: eksternal → internal (`@/`, `@omniroute/open-sse`) → relatif
- **Penamaan**: file=camelCase/kebab, komponen=PascalCase, konstanta=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = kesalahan di mana saja; `no-explicit-any` = peringatan di `open-sse/` dan `tests/`
- **TypeScript**: `strict: false`, target ES2022, modul esnext, resolusi bundler. Utamakan tipe eksplisit.

### Basis Data

- **Selalu** melalui modul domain `src/lib/db/` — **jangan pernah** menulis SQL mentah di rute atau pengendali
- **Jangan pernah** menambahkan logika ke `src/lib/localDb.ts` (hanya lapisan re-ekspor)
- **Jangan pernah** barrel-import dari `localDb.ts` — impor modul `db/` tertentu sebagai gantinya
- Singleton DB: `getDbInstance()` dari `src/lib/db/core.ts` (jurnal WAL)
- Migrasi: `src/lib/db/migrations/` — file SQL versi, idempotent, dijalankan dalam transaksi

### Penanganan Kesalahan

- coba/tangkap dengan tipe kesalahan tertentu, log dengan konteks pino
- Jangan pernah menelan kesalahan dalam aliran SSE — gunakan sinyal abort untuk pembersihan
- Kembalikan kode status HTTP yang tepat (4xx/5xx)

### Keamanan

- **Jangan pernah** menggunakan `eval()`, `new Function()`, atau eval implisit
- Validasi semua input dengan skema Zod
- Enkripsi kredensial saat tidak aktif (AES-256-GCM)
- Daftar penolakan header upstream: `src/shared/constants/upstreamHeaders.ts` — jaga sanitasi, skema Zod, dan pengujian unit tetap selaras saat mengedit
- **Kredensial upstream publik** (Gemini/Antigravity/Windsurf-style OAuth client_id/secret + kunci Web Firebase yang diekstrak dari CLI publik): **HARUS** disematkan melalui `resolvePublicCred()` dari `open-sse/utils/publicCreds.ts` — **jangan pernah** sebagai literal string. Lihat `docs/security/PUBLIC_CREDS.md` untuk pola yang wajib.
- **Respon kesalahan** (HTTP / SSE / eksekutor / pengendali MCP): **HARUS** diarahkan melalui `buildErrorBody()` atau `sanitizeErrorMessage()` dari `open-sse/utils/error.ts` — **jangan pernah** menempatkan `err.stack` atau `err.message` mentah dalam tubuh respon. Lihat `docs/security/ERROR_SANITIZATION.md`.
- **Perintah shell yang dibangun dari variabel**: saat memanggil `exec()`/`spawn()` dengan skrip yang memerlukan nilai runtime, kirimkan melalui opsi `env` (secara otomatis di-escape shell) — **jangan pernah** melakukan interpolasi string jalur yang tidak tepercaya/eksternal ke dalam tubuh skrip. Referensi: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Perpustakaan aman secara default** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): utamakan Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink daripada implementasi kustom kapan pun menambahkan permukaan yang sensitif terhadap keamanan yang baru.

---

## Skenario Modifikasi Umum

### Menambahkan Penyedia Baru

1. Daftarkan di `src/shared/constants/providers.ts` (divalidasi Zod saat dimuat)
2. Tambahkan eksekutor di `open-sse/executors/` jika logika kustom diperlukan (perluas `BaseExecutor`)
3. Tambahkan penerjemah di `open-sse/translator/` jika format bukan OpenAI
4. Tambahkan konfigurasi OAuth di `src/lib/oauth/constants/oauth.ts` jika berbasis OAuth — jika CLI upstream mengirimkan client_id/secret publik, sematkan melalui `resolvePublicCred()` (lihat `docs/security/PUBLIC_CREDS.md`), **jangan pernah** sebagai literal
5. Daftarkan model di `open-sse/config/providerRegistry.ts`
6. Tulis pengujian di `tests/unit/` (termasuk pernyataan bentuk publicCreds jika Anda menambahkan default yang disematkan baru)

### Menambahkan Rute API Baru

1. Buat direktori di bawah `src/app/api/v1/your-route/`
2. Buat `route.ts` dengan pengendali `GET`/`POST`
3. Ikuti pola: CORS → validasi tubuh Zod → otentikasi opsional → delegasi pengendali
4. Pengendali ditempatkan di `open-sse/handlers/` (impor dari sana, bukan inline)
5. Respon kesalahan menggunakan `buildErrorBody()` / `errorResponse()` dari `open-sse/utils/error.ts` (otomatis disanitasi — jangan pernah menempatkan `err.stack` atau `err.message` mentah dalam tubuh). Lihat `docs/security/ERROR_SANITIZATION.md`.
6. Tambahkan pengujian — termasuk setidaknya satu pernyataan bahwa respon kesalahan tidak membocorkan jejak tumpukan (`!body.error.message.includes("at /")`)

### Menambahkan Modul DB Baru

1. Buat `src/lib/db/yourModule.ts` — impor `getDbInstance` dari `./core.ts`
2. Ekspor fungsi CRUD untuk tabel domain Anda
3. Tambahkan migrasi di `src/lib/db/migrations/` jika tabel baru diperlukan
4. Re-ekspor dari `src/lib/localDb.ts` (tambahkan ke daftar re-ekspor saja)
5. Tulis pengujian

### Menambahkan Alat MCP Baru

1. Tambahkan definisi alat di `open-sse/mcp-server/tools/` dengan skema input Zod + pengendali asinkron
2. Daftarkan dalam set alat (terhubung oleh `createMcpServer()`)
3. Tetapkan ke lingkup yang sesuai
4. Tulis pengujian (panggilan alat dicatat ke tabel `mcp_audit`)

### Menambahkan Keterampilan A2A Baru

1. Buat keterampilan di `src/lib/a2a/skills/` (5 sudah ada: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Keterampilan menerima konteks tugas (pesan, metadata) → mengembalikan hasil terstruktur
3. Daftarkan di `A2A_SKILL_HANDLERS` di `src/lib/a2a/taskExecution.ts`
4. Ekspos di `src/app/.well-known/agent.json/route.ts` (Kartu Agen)
5. Tulis pengujian di `tests/unit/`
6. Dokumentasikan di tabel keterampilan `docs/frameworks/A2A-SERVER.md`

### Menambahkan Agen Cloud Baru

1. Buat kelas agen di `src/lib/cloudAgent/agents/` yang memperluas `CloudAgentBase` (3 sudah ada: codex-cloud, devin, jules)
2. Implementasikan `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Daftarkan di `src/lib/cloudAgent/registry.ts`
4. Tambahkan penanganan OAuth/kredensial jika diperlukan (`src/lib/oauth/providers/`)
5. Pengujian + dokumentasikan di `docs/frameworks/CLOUD_AGENT.md`

### Menambahkan Guardrail / Eval / Keterampilan / Acara Webhook Baru

- Guardrail: `src/lib/guardrails/` → dokumen: `docs/security/GUARDRAILS.md`
- Suite Eval: `src/lib/evals/` → dokumen: `docs/frameworks/EVALS.md`
- Keterampilan (sandbox): `src/lib/skills/` → dokumen: `docs/frameworks/SKILLS.md`
- Acara Webhook: `src/lib/webhookDispatcher.ts` → dokumen: `docs/frameworks/WEBHOOKS.md`

## Dokumentasi Referensi

Untuk setiap perubahan yang tidak sepele, baca pendalaman yang sesuai terlebih dahulu:

| Area                                    | Dok                                                               |
| --------------------------------------- | ----------------------------------------------------------------- |
| Navigasi repo                           | `docs/architecture/REPOSITORY_MAP.md`                             |
| Arsitektur                              | `docs/architecture/ARCHITECTURE.md`                               |
| Referensi teknik                        | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (skor 9-faktor, 14 strategi) | `docs/routing/AUTO-COMBO.md`                                      |
| Ketahanan (3 mekanisme)                 | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Pemutaran penalaran                     | `docs/routing/REASONING_REPLAY.md`                                |
| Kerangka keterampilan                   | `docs/frameworks/SKILLS.md`                                       |
| Sistem memori (FTS5 + Qdrant)           | `docs/frameworks/MEMORY.md`                                       |
| Agen cloud                              | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Pembatas (PII / injeksi / visi)         | `docs/security/GUARDRAILS.md`                                     |
| Kredensial publik hulu (Gemini/dll.)    | `docs/security/PUBLIC_CREDS.md`                                   |
| Sanitasi pesan kesalahan                | `docs/security/ERROR_SANITIZATION.md`                             |
| Evaluasi                                | `docs/frameworks/EVALS.md`                                        |
| Kepatuhan / audit                       | `docs/security/COMPLIANCE.md`                                     |
| Webhook                                 | `docs/frameworks/WEBHOOKS.md`                                     |
| Jalur otorisasi                         | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / sidik jari)              | `docs/security/STEALTH_GUIDE.md`                                  |
| Protokol agen (A2A / ACP / Cloud)       | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| Server MCP                              | `docs/frameworks/MCP-SERVER.md`                                   |
| Server A2A                              | `docs/frameworks/A2A-SERVER.md`                                   |
| Referensi API + OpenAPI                 | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Katalog penyedia (auto-dihasilkan)      | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Alur rilis                              | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## Pengujian

| Apa                     | Perintah                                                               |
| ----------------------- | ---------------------------------------------------------------------- |
| Uji unit                | `npm run test:unit`                                                    |
| File tunggal            | `node --import tsx/esm --test tests/unit/file.test.ts`                 |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                  |
| E2E (Playwright)        | `npm run test:e2e`                                                     |
| Protokol E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                           |
| Ekosistem               | `npm run test:ecosystem`                                               |
| Gerbang cakupan         | `npm run test:coverage` (75/75/75/70 — pernyataan/garis/fungsi/cabang) |
| Laporan cakupan         | `npm run coverage:report`                                              |

**Aturan PR**: Jika Anda mengubah kode produksi di `src/`, `open-sse/`, `electron/`, atau `bin/`, Anda harus menyertakan atau memperbarui pengujian dalam PR yang sama.

**Preferensi lapisan pengujian**: unit pertama → integrasi (multi-modul atau status DB) → e2e (UI/workflow saja). Kodekan reproduksi bug sebagai pengujian otomatis sebelum atau bersamaan dengan perbaikan.

**Kebijakan cakupan Copilot**: Ketika PR mengubah kode produksi dan cakupan di bawah 75% (pernyataan/garis/fungsi) atau 70% (cabang), jangan hanya melaporkan — tambahkan atau perbarui pengujian, jalankan kembali gerbang cakupan, lalu minta konfirmasi. Sertakan perintah yang dijalankan, file pengujian yang diubah, dan hasil cakupan akhir dalam laporan PR.

---

## Alur Kerja Git

```bash
# Jangan pernah melakukan commit langsung ke main
git checkout -b feat/your-feature
git commit -m "feat: deskripsikan perubahan Anda"
git push -u origin feat/your-feature
```

**Awalan cabang**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Format commit** (Conventional Commits): `feat(db): tambahkan circuit breaker` — lingkup: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Hook Husky**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Lingkungan

- **Runtime**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modules
- **TypeScript**: 5.9+, target ES2022, module esnext, resolution bundler
- **Alias jalur**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Port default**: 20128 (API + dashboard di port yang sama)
- **Direktori data**: variabel lingkungan `DATA_DIR`, default ke `~/.omniroute/`
- **Variabel lingkungan kunci**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Setup: `cp .env.example .env` lalu buat `JWT_SECRET` (`openssl rand -base64 48`) dan `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## Aturan Keras

1. Jangan pernah melakukan commit rahasia atau kredensial
2. Jangan pernah menambahkan logika ke `localDb.ts`
3. Jangan pernah menggunakan `eval()` / `new Function()` / eval implisit
4. Jangan pernah melakukan commit langsung ke `main`
5. Jangan pernah menulis SQL mentah di rute — gunakan modul `src/lib/db/`
6. Jangan pernah menelan kesalahan secara diam-diam di aliran SSE
7. Selalu validasi input dengan skema Zod
8. Selalu sertakan pengujian saat mengubah kode produksi
9. Cakupan harus tetap ≥75% (pernyataan, garis, fungsi) / ≥70% (cabang). Saat ini terukur: ~82%.
10. Jangan pernah melewati hook Husky (`--no-verify`, `--no-gpg-sign`) tanpa persetujuan operator yang eksplisit.
11. Jangan pernah menyematkan client_id/secret OAuth upstream publik atau kunci Web Firebase sebagai literal string — selalu melalui `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`). Lihat `docs/security/PUBLIC_CREDS.md`.
12. Jangan pernah mengembalikan `err.stack` / `err.message` mentah dalam respons HTTP / SSE / executor — selalu rute melalui `buildErrorBody()` atau `sanitizeErrorMessage()` (`open-sse/utils/error.ts`). Lihat `docs/security/ERROR_SANITIZATION.md`.
13. Jangan pernah melakukan interpolasi string jalur eksternal atau nilai runtime ke dalam skrip shell yang diteruskan ke `exec()`/`spawn()` — lewati melalui opsi `env` sebagai gantinya. Referensi: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Jangan pernah mengabaikan peringatan CodeQL / Secret-Scanning tanpa (a) terlebih dahulu memeriksa dokumen pola di atas untuk melihat apakah pembantu berlaku, dan (b) mencatat justifikasi teknis dalam komentar pengabaian. Preseden: `js/stack-trace-exposure` yang muncul di callsites yang sudah rute melalui `sanitizeErrorMessage()` adalah batasan CodeQL yang dikenal (pembersih kustom tidak dikenali) — abaikan sebagai `false positive` yang merujuk pada `docs/security/ERROR_SANITIZATION.md`.
15. Jangan pernah mengekspos rute yang memunculkan proses anak (`/api/mcp/`, `/api/cli-tools/runtime/`) tanpa klasifikasi `isLocalOnlyPath()` di `src/server/authz/routeGuard.ts`. Penegakan loopback terjadi tanpa syarat sebelum pemeriksaan otentikasi — JWT yang bocor melalui terowongan tidak dapat memicu pemunculan proses. Lihat `docs/security/ROUTE_GUARD_TIERS.md`.
16. Jangan pernah menyertakan trailer `Co-Authored-By` dalam pesan commit. Commit harus muncul hanya di bawah identitas Git pemilik repositori (`diegosouzapw`). Baris `Co-Authored-By: Claude …` menyebabkan GitHub mengatribusikan commit ke akun `claude` Anthropic, menyembunyikan penulis sebenarnya dalam riwayat PR.
