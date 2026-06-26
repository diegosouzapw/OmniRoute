# RULE_QA_MASTER — Universal QA → Review → Fix Protocol
**Version 2.0 | Consolidated from industry best practices + DevTools + OWASP + Exploratory + AI-era standards**

> **Satu file ini adalah satu-satunya sumber kebenaran untuk semua QA sesi.**
> Paste ke coding agent kamu di awal sesi. Jangan skip satu langkah pun.
> Setiap klaim "sudah selesai" HARUS didukung evidence table di Section 9.
> Tidak ada evidence = tidak ada done.

---

## 0. Cara Pakai Prompt Ini

1. Copy dari "## 1. Objective" ke bawah.
2. Paste ke coding agent (atau gunakan sebagai manual checklist) di awal sesi QA.
3. **Step pertama wajib: lakukan Layer Discovery (Section 2)** — jangan langsung lompat ke testing.
4. Jalankan loop per layer (Section 3). Isi Section 9 secara real-time, bukan dari ingatan setelah selesai.
5. Jangan terima laporan "done" tanpa evidence table dari Section 9.

---

## 1. Objective

Setiap layer codebase mencapai kondisi **verified secara independen**, bukan sekadar diklaim. Tidak ada layer, fitur, halaman, tombol, menu, endpoint, business flow, atau user journey yang dinyatakan selesai sampai ia melewati siklus **QA → Review → Fix** penuh yang berakhir dengan **nol open defect**, dikonfirmasi lewat re-test — bukan lewat asumsi.

Protokol ini secara eksplisit menolak klaim unfalsifiable seperti "100% working." Sebaliknya, "done" didefinisikan oleh:

- Setiap surface yang ditemukan sudah ditest
- Setiap defect sudah di-log, di-root-cause, di-fix, dan di-re-verify
- Satu cross-layer end-to-end pass sudah dijalankan **setelah** fix terakhir
- Final Evidence Report (Section 9.5) selesai dan jujur, termasuk apa yang tidak ditest dan alasannya

Hasil akhirnya adalah laporan yang bisa kamu serahkan ke pihak ketiga yang skeptis dan mereka setuju bahwa pengujian ini benar-benar terjadi.

---

## 2. Step Zero — Layer Discovery (wajib sebelum testing apapun)

**Jangan asumsikan stack-nya. Inspect dulu.**

### 2.1 Baca entry points

Baca `README.md`, `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `*.csproj`, `docker-compose.yml`, `Makefile`, atau ekuivalennya. Identifikasi:

- Language(s) dan framework(s)
- Entry points (dev server, CLI command, main binary, Docker service)
- Existing test suite (ada `npm test`? `pytest`? `jest`? tidak ada sama sekali?)

### 2.2 Map semua layer yang ada

Hanya test layer yang **benar-benar ada** di repo. Contoh layer yang mungkin ada — jangan invent layer fiktif:

| Kategori | Contoh konkret |
|---|---|
| Frontend / UI | Web app, mobile app, desktop app, dashboard |
| Backend / Services | Express, FastAPI, Django, NestJS, Go server |
| REST / GraphQL / gRPC / WebSocket API | Endpoints, schema, contracts |
| Database & Migrations | Schema, seed, migration scripts |
| Bot (chat / trading / automation) | Telegram bot, Discord bot, trading signal bot |
| Engine (trading, scoring, rules, rekomendasi) | Kalkulasi core, backtest, signal generation |
| Background Jobs / Workers / Cron | Queue consumers, schedulers, webhook processors |
| MCP Servers / Tool Integrations | Exposed tools, declared schemas |
| CLI Tools | Command-line scripts dan argumen |
| Infra / Config / CI-CD | Docker, env handling, GitHub Actions, pipeline |
| Third-party Integrations | Payment gateway, auth provider, data provider |

### 2.3 Output Layer Inventory

Isi tabel 9.2 sebelum testing dimulai. Ini adalah output wajib dari Step Zero.

---

## 3. The Loop (struktur wajib — jangan shortcut)

Untuk **setiap layer** di Layer Inventory, jalankan loop berikut:

```
LOOP START
  ↓
[1] QA PASS
    → Jalankan tests, buka browser/app, panggil endpoints, reproduksi flows
    → Gunakan semua instrument (DevTools, logs, network tab, console)
    → Log SETIAP defect yang ditemukan, sekecil apapun
  ↓
[2] REVIEW PASS
    → Root-cause setiap defect — "kenapa ini terjadi?"
    → Konfirmasi reproducibility
    → Tolak fix yang hanya suppress symptom (catch-all try/catch tanpa mengerti root cause = ditolak)
  ↓
[3] FIX PASS
    → Implement satu fix per satu defect
    → Defect yang ber-root-cause sama boleh di-fix bersamaan — tapi nyatakan itu secara eksplisit
  ↓
[4] RE-QA
    → Re-run test PERSIS SAMA yang menangkap defect tersebut
    → Jalankan regression check pada area adjacent yang disentuh oleh fix
  ↓
[5] EXIT CHECK
     ├─ Ada defect baru atau surviving? → kembali ke [2] REVIEW
     ├─ Zero defect pass ini?          → layer CLEARED → pindah ke layer berikutnya
     └─ Defect yang sama survive 3x attempt fix?
        → STOP. ESCALATE ke human dengan root-cause writeup.
          Jangan coba fix ke-4 secara blind.
```

### Rules yang tidak boleh dilanggar

- **Tidak ada layer yang "done" dari single pass.** Done = satu full pass dengan zero defect baru, termasuk regression check.
- **Tidak ada batch fix untuk defect yang tidak berkaitan.** 5 bug tidak berkaitan = 5 fix terpisah = 5 re-verify terpisah. Diff yang campur aduk membuat debugging regresi menjadi impossible.
- **Fix yang hanya suppress symptom ditolak di Review.** `try/catch` tanpa memahami kenapa crash = defect dengan failure mode yang lebih senyap, bukan fix.
- Setelah semua layer CLEARED, jalankan **satu cross-layer end-to-end pass** (Section 5) untuk menangkap regresi antar layer yang per-layer testing tidak bisa deteksi.

---

## 4. Coverage Requirements (per layer, hanya yang ada di repo)

### 4.1 Frontend / UI — Functional

- **Setiap page dan route**: termasuk deep links, 404/unknown routes, redirects, protected routes
- **Setiap elemen interaktif**: button, dropdown, modal, tab, tooltip, toast, accordion, drawer
- **Setiap form**:
  - Valid input → submit berhasil
  - Invalid input → error message muncul, tidak submit
  - Empty required field → blocked dengan pesan yang jelas
  - Boundary values (min/max, karakter limit)
  - Submit/Cancel/Reset behavior
  - Disabled state (form tidak bisa di-edit saat loading)
- **Setiap interactive state**: loading, empty state, error state, success state, offline (jika applicable)
- **Navigation flows end-to-end**: tidak hanya isolated screen — klik melalui seluruh journey
- **Conditional rendering**: apakah element yang seharusnya tersembunyi benar-benar tersembunyi?
- **Responsive breakpoints** (mobile, tablet, desktop) jika app responsive
- **Keyboard navigation dan accessibility** (jika dalam scope)

### 4.2 Frontend / UI — Browser DevTools (wajib dilakukan, bukan optional)

Buka DevTools (`F12` / `Cmd+Option+I`) dan periksa **setiap layer berikut** selama testing:

**Console Tab (prioritas tertinggi)**
- Zero `error` merah saat page load
- Zero `error` merah saat setiap user action utama dilakukan
- `warning` kuning — review satu per satu: ada yang sinyal masalah nyata (unhandled promise rejection, deprecated API, memory leak hint)
- Tidak ada stack trace yang bocor ke client dari backend
- Tidak ada `undefined` atau `null` yang di-log ke console sebagai fallback dari data yang harusnya ada

**Network Tab**
- Setiap API call yang dipicu oleh UI action terpanggil dengan benar
- Status codes yang diharapkan: `2xx` untuk sukses, bukan `200` untuk semua response termasuk error
- Tidak ada `4xx` atau `5xx` yang tidak ditangani (yang muncul sebagai generic "Something went wrong" tanpa log)
- Request payload/body berisi data yang benar (inspect `Payload` tab)
- Response body mengandung shape yang sesuai schema (inspect `Preview` / `Response` tab)
- Tidak ada request yang `pending` selamanya (timeout tidak ditangani)
- Tidak ada resource 404 (missing assets, fonts, icons)
- Filter by `XHR/Fetch` untuk isolasi API calls; filter by `Doc` untuk page loads
- **Throttle ke Slow 3G**: apakah loading state muncul? Apakah timeout ditangani? Apakah tidak ada infinite spinner?
- **Disable cache** selama testing untuk memastikan fresh response

**Application Tab**
- Cookies: nama, value, domain, path, HttpOnly, Secure, SameSite flags
- LocalStorage / SessionStorage: tidak ada sensitive data (token, password) yang tersimpan plaintext
- Session management: logout benar-benar clear semua session data
- IndexedDB / Cache Storage: dibersihkan dengan benar saat diperlukan

**Elements / DOM Tab**
- Tidak ada layout yang pecah (overflow hidden yang memotong konten penting)
- Tidak ada elemen yang overlap secara tidak sengaja
- ARIA attributes ada dan benar untuk elemen interactive (untuk accessibility)
- Computed styles sesuai yang diharapkan (gunakan tab `Computed` untuk resolve specificity wars)

**Performance / Lighthouse**
- Jalankan Lighthouse audit: Performance, Accessibility, Best Practices, SEO
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms (atau sesuai target produk)
- Tidak ada obvious long task blocking main thread

**Sources / Breakpoints (untuk bug yang sulit direpro)**
- Gunakan breakpoints untuk trace logic flow JavaScript yang kompleks
- Local Overrides untuk test proposed fix tanpa menunggu deployment

### 4.3 Backend / Services

- Setiap endpoint × setiap HTTP method yang di-expose
- **Auth & permission boundaries**:
  - Request tanpa auth → `401`
  - Request dengan token expired → `401`
  - Request user A untuk data user B → `403` (bukan data user B terekspos)
  - Role rendah akses endpoint role tinggi → `403`
- **Input validation**:
  - Valid input → proses benar
  - Invalid type → `400` dengan pesan yang jelas
  - Missing required field → `400` dengan field name
  - Boundary values (string terlalu panjang, angka negatif, dll)
  - Injection-style input: `' OR 1=1`, `<script>`, `../../../etc/passwd`, `{}`, `[]`
- **Error handling**:
  - Status code benar untuk setiap error branch
  - Error response body informatif (tidak generic "Internal Server Error")
  - Stack trace tidak bocor ke response client
  - Semua unhandled exception dicatch dan di-log di server
- **Idempotency** (untuk operasi yang penting): double-submit, retry — hasilnya sama?
- **Server logs**: error benar-benar tercatat di log, tidak ditelan diam-diam

### 4.4 REST / GraphQL / gRPC API

- Response shape match documented/declared schema secara exact
- Status codes benar untuk setiap branch (success, client error, server error)
- API versioning behavior (jika ada versioning)
- Rate limiting behavior: apakah `429` dikembalikan dengan benar? Retry-After header ada?
- Backward compatibility (jika breaking change sensitif)
- **GraphQL spesifik**: introspection tidak expose info sensitif di production, query depth limiting ada
- **WebSocket spesifik**: connection lifecycle (connect, message, disconnect, error, reconnect)
- CORS headers benar: allowed origins tidak `*` untuk endpoint sensitif

### 4.5 Security (wajib, bukan optional, terlepas dari layer)

Berdasarkan **OWASP API Security Top 10** — setiap item harus di-test dengan evidence:

| # | Risk | Yang Harus Ditest |
|---|---|---|
| API1 | Broken Object Level Auth (BOLA) | User A akses object milik User B dengan mengubah ID di request |
| API2 | Broken Authentication | Expired token, brute force password, JWT manipulation |
| API3 | Broken Object Property Level Auth | Field sensitif terekspos di response yang tidak seharusnya |
| API4 | Unrestricted Resource Consumption | Request tanpa rate limit bisa exhausts server (CPU/memory/DB) |
| API5 | Broken Function Level Auth | User biasa akses admin endpoint |
| API6 | Unrestricted Access to Sensitive Business Flows | Abuse flows bisnis (bulk scraping, mass account creation) |
| API7 | SSRF | Input URL yang di-fetch oleh server → internal network request |
| API8 | Security Misconfiguration | Unnecessary HTTP methods enabled, verbose error, default creds |
| API9 | Improper Inventory Management | Shadow/undocumented endpoints tanpa auth control |
| API10 | Unsafe Consumption of APIs | Third-party API response di-trust dan di-execute tanpa validation |

**Cross-cutting security checks (semua layer):**
- Tidak ada secret/API key yang hardcoded di source code (bahkan di comment)
- HTTPS enforced — HTTP redirect ke HTTPS, tidak ada mixed content
- Security headers ada: `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`
- Session token tidak bisa di-guess (entropy cukup, tidak sequential)
- XSS: user-generated content di-escape dengan benar sebelum dirender
- SQL injection: semua query menggunakan parameterized query / ORM binding
- Dependency vulnerabilities: jalankan `npm audit` / `pip-audit` / `snyk` — tidak ada critical

### 4.6 Bot (chat / trading / messaging)

- Setiap command/trigger phrase, termasuk near-miss dan typo
- Conversation state transitions (multi-step flows, cancel mid-flow, timeout)
- Failure recovery: malformed input, network drop, upstream API failure, duplicate message delivery
- Rate limit / spam protection jika diimplementasi
- **Trading bot spesifik**:
  - Kalkulasi ukuran posisi benar (cross-check manual)
  - Stop loss / take profit di-set dengan benar sebelum order dikirim
  - Order tidak double-kirim jika ada retry

### 4.7 Engine (trading / scoring / rules / rekomendasi)

> **Angka yang salah tapi tidak crash adalah defect yang LEBIH PARAH daripada crash.**
> Silent miscalculation harus di-test secara eksplisit, tidak boleh diasumsikan tidak ada.

- Core calculation diverifikasi terhadap **expected values yang diketahui** — hand-computed atau dari trusted baseline. "Tidak crash" bukan verifikasi.
- Edge cases: zero, negatif, null/missing data, extreme values, empty dataset, duplicate inputs
- Determinism check: input yang sama → output yang sama (atau dokumentasikan non-determinism yang disengaja)
- Backtests / historical replay jika applicable — bandingkan terhadap trusted baseline
- Precision/rounding: floating point edge cases untuk kalkulasi finansial

### 4.8 Background Jobs / Workers / Cron

- Job berjalan sesuai schedule/trigger yang dikonfigurasi
- Failure & retry behavior (apa yang terjadi jika job gagal di tengah jalan?)
- Idempotency on re-run (menjalankan job yang sama dua kali tidak double-process data)
- Resource cleanup: tidak ada orphaned process, lock, temp file setelah selesai
- Dead letter queue / error notification jika job gagal berulang kali

### 4.9 MCP Servers / Tool Integrations

- Setiap exposed tool dipanggil dengan: valid args, invalid args, missing required args, wrong types
- Returned data match tool's declared output schema
- Failures surface sebagai informative errors, tidak silent no-op
- Tool descriptions match actual behavior — mismatch antara docs dan behavior adalah defect

### 4.10 Infra / Config / CI-CD

- Env variable handling: missing var **gagal dengan keras dan jelas**, tidak silent dengan default yang salah
- Build sukses dari **clean clone** (bukan dari dev machine yang sudah pre-warmed)
- `npm install` / `pip install` dari environment bersih benar-benar works
- CI pipeline benar-benar menjalankan test suite yang diklaim (bukan hanya build)
- Docker: container start clean tanpa error, health check pass
- Secrets tidak ada di environment file yang di-commit ke repo (`.env` di `.gitignore`?)

### 4.11 Business Flows & User Journeys (wajib, terpisah dari per-layer)

Test seluruh journey dari perspektif pengguna, bukan perspektif developer:

- **Happy path**: alur ideal dari awal ke akhir tanpa hambatan
- **Sad path / Error path**: apa yang terjadi ketika setiap step gagal? User tahu apa yang harus dilakukan?
- **Edge path**: user melakukan sesuatu yang tidak diharapkan (double-click, back button, refresh mid-flow, session expired mid-flow)
- **Permission boundary path**: user dengan role berbeda mencoba aksi yang tidak boleh dilakukan

Contoh journeys yang harus di-map:
- Registrasi → Verifikasi → Login → Onboarding → Core Action → Logout
- Buat data → Edit data → Hapus data → Konfirmasi
- Upload file → Proses → Tampilkan hasil → Download
- Pembayaran/transaksi end-to-end termasuk failure handling
- Error recovery: session timeout di tengah flow → user bisa lanjut setelah login ulang?

---

## 5. End-to-End Cross-Layer Pass

Jalankan setelah **setiap layer individu sudah CLEARED.**

Pilih 2–5 real-world journeys yang paling penting di produk ini. Jalankan fully, end-to-end, setelah fix terakhir ke layer apapun:

```
User action di UI
  → API call ke backend
  → Backend logic
  → Engine/bot processing (jika applicable)
  → Database write
  → Response kembali ke UI
  → UI reflect state baru dengan benar
  → Downstream effects (email sent? notification triggered? log written?)
```

Ini menangkap regresi antar layer yang per-layer testing tidak bisa lihat.

Jika defect ditemukan di sini: log, kembali ke layer yang relevan, fix, re-QA, lalu **ulangi seluruh E2E pass ini dari awal** — bukan hanya re-run step yang gagal saja.

---

## 6. Definition of Done

Pekerjaan selesai **jika dan hanya jika** ketiga hal ini terpenuhi:

1. Setiap layer di Layer Inventory status **CLEARED** (zero open defect, dikonfirmasi re-test).
2. Cross-layer end-to-end pass (Section 5) sudah dijalankan **setelah** fix terakhir ke layer apapun, dan hasilnya defect-free.
3. Final Evidence Report (Section 9.5) selesai, termasuk daftar eksplisit hal yang tidak ditest dan alasannya.

Jika satu pun dari tiga ini belum terpenuhi, status = **NOT DONE** — nyatakan dengan jelas mana yang masih pending.

---

## 7. Evidence Requirements

Jangan pernah laporkan completion sebagai persentase atau klaim kepercayaan. Untuk **setiap layer**, laporkan:

```
LAYER: <nama>
Method:
  [ ] Automated (command yang dijalankan: __________)
  [ ] Manual (apa yang dilakukan: __________, apa yang diamati: __________)
  Kedua-duanya diperlukan di mana keduanya feasible.
DevTools check:  [ ] Console clean  [ ] Network clean  [ ] Application tab checked
Security check:  [ ] OWASP API checklist covered (relevant items)
Test cases run:  <N>
Passed:          <N>
Failed → fixed → re-verified:  <N>
Open defects:    <N>   ← harus 0 untuk CLEARED
Not tested:      <daftar apapun yang dilewati, dan TEPAT kenapa>
                 Contoh: "staging DB tidak available", "feature flag off di env ini",
                 "third-party sandbox API down selama sesi ini"
```

"Tidak terverifikasi — ini alasannya" jauh lebih baik daripada klaim "100% confirmed" yang palsu.

---

## 8. Anti-Patterns yang Wajib Ditolak

Ini adalah tanda bahwa QA tidak benar-benar dilakukan:

- Mengklaim "100% tested" atau "semua sudah dicek" tanpa evidence table dari Section 7
- Menandai layer selesai setelah single pass tanpa re-test
- Fix bug dengan cara catch/silence error tanpa memahami kenapa terjadi
- Batch-fix defect yang tidak berkaitan dalam satu commit (tidak jelas fix mana yang fix apa)
- Skip layer yang sulit (test frontend buttons tapi skip engine math correctness)
- "No defects found" tanpa menyatakan apa yang dijalankan untuk sampai ke kesimpulan itu
- Console errors diabaikan karena "tidak keliatan di UI"
- Network 4xx/5xx diabaikan karena "app tetap berjalan"
- Tidak cek DevTools sama sekali selama frontend testing
- Security testing dilewati karena "ini cuma internal tool"
- Business flow tidak ditest end-to-end karena "per-unit sudah lulus"

---

## 9. Tracking Sheet (isi real-time, bukan dari ingatan)

### 9.1 Project Info

- **Project / Repo:**
- **URL / Environment yang ditest:**
- **Date started:**
- **Tester (human / agent name):**
- **Commit / Branch / Build:**
- **DevTools browser yang digunakan:**

---

### 9.2 Layer Inventory

| Layer | Ada? | Entry point(s) | Test suite yang ada? | Status |
|-------|------|----------------|----------------------|--------|
| Frontend / UI | | | | Not started |
| Backend / Services | | | | Not started |
| REST/GraphQL/WebSocket API | | | | Not started |
| Database / Migrations | | | | Not started |
| Bot | | | | Not started |
| Engine / Core Logic | | | | Not started |
| Background Jobs / Workers | | | | Not started |
| MCP Servers / Tool Integrations | | | | Not started |
| CLI Tools | | | | Not started |
| Infra / Config / CI-CD | | | | Not started |
| Third-party Integrations | | | | Not started |
| *(tambah layer yang ditemukan)* | | | | Not started |

**Status values:** `Not started` → `In QA` → `Fixing` → `Re-QA` → `CLEARED`

---

### 9.3 Per-Layer Loop Log

*Duplikat block ini untuk setiap layer.*

---

**Layer: ____________________**

**Pass 1 — QA**

Method:
- [ ] Automated (`command: __________`)
- [ ] Manual (dilakukan: __________, diamati: __________)

DevTools checks (untuk layer Frontend):
- [ ] Console — zero errors, zero unhandled rejections
- [ ] Network — semua API calls sukses, tidak ada 4xx/5xx yang tidak ditangani
- [ ] Network — request payload benar, response shape benar
- [ ] Network — throttle ke Slow 3G tested
- [ ] Application — cookies/localStorage/session diperiksa
- [ ] Lighthouse audit dijalankan

Business flows yang dicek:
- [ ] Happy path
- [ ] Sad path / error path
- [ ] Edge path (double-click, back button, refresh mid-flow)
- [ ] Permission boundary

Security checks yang dilakukan: ____________________

Defects ditemukan:

| ID | Deskripsi | Layer | Severity (Blocker/Major/Minor) | Reproducible? | Ditemukan via |
|----|-----------|-------|-------------------------------|---------------|---------------|
| D1 | | | | | Console/Network/Manual/Test |
| D2 | | | | | |

---

**Pass 1 — Review**

| ID | Root cause | Fix approach | Symptom suppression? Ditolak? |
|----|------------|--------------|-------------------------------|
| D1 | | | |

---

**Pass 1 — Fix**

| ID | Fix yang diaplikasikan (commit/diff ref) | Satu fix per defect? |
|----|------------------------------------------|----------------------|
| D1 | | Ya / Tidak (alasan: __________) |

---

**Pass 1 — Re-QA**

| ID | Test original di-re-run? Hasil? | Regression check pada area adjacent | Hasil |
|----|--------------------------------|-------------------------------------|-------|
| D1 | | | |

---

**Exit check setelah Pass 1:**
- [ ] Zero defect baru → Layer **CLEARED**
- [ ] Ada defect baru/surviving → lanjut ke Pass 2 (duplikat blocks di atas sebagai Pass 2, 3...)
- [ ] Defect yang sama survive 3 fix attempts → **ESCALATED** (tulis root-cause writeup di bawah)

**Escalation notes (jika ada):**

*(Ulangi seluruh block ini untuk setiap layer di inventory.)*

---

### 9.4 Business Flow & User Journey Log

*(Isi setelah per-layer QA selesai, atau paralel selama testing)*

| Journey | Steps | Layers yang dilintasi | Happy path result | Sad path result | Edge path result | Defects |
|---------|-------|-----------------------|-------------------|-----------------|------------------|---------|
| 1. | | | | | | |
| 2. | | | | | | |
| 3. | | | | | | |

---

### 9.5 Cross-Layer End-to-End Pass

*Jalankan hanya setelah semua layer di atas CLEARED.*

| Journey yang ditest | Steps / layers yang dilintasi | Result | Defects ditemukan |
|---------------------|-------------------------------|--------|-------------------|
| 1. | | | |
| 2. | | | |
| 3. | | | |

Jika ada defect di sini: log, kembali ke loop layer yang relevan, fix, re-QA, lalu **ulangi seluruh E2E pass ini.**

---

### 9.6 Final Evidence Report

*(Isi setelah semua layer CLEARED dan E2E pass defect-free)*

| Layer | Method (Auto/Manual/Both) | DevTools checked? | Security checked? | Cases run | Passed | Fixed & re-verified | Open defects | Not tested (dan kenapa) |
|-------|--------------------------|-------------------|-------------------|-----------|--------|---------------------|--------------|-------------------------|
| Frontend | | | | | | | 0 | |
| Backend | | | | | | | 0 | |
| API | | | | | | | 0 | |
| Bot | | | | | | | 0 | |
| Engine | | | | | | | 0 | |
| Jobs | | | | | | | 0 | |
| Infra | | | | | | | 0 | |

**Cross-layer E2E pass defect-free?** [ ] Ya [ ] Tidak (loop belum selesai)

**Definition of Done (Section 6) terpenuhi?**
- [ ] Semua layer CLEARED
- [ ] Cross-layer E2E pass dijalankan setelah fix terakhir, defect-free
- [ ] Report ini selesai dengan jujur, termasuk apa yang tidak ditest

**Overall status:** [ ] **DONE** [ ] **NOT DONE** — pending: ____________________

---

### 9.7 Notes / Anything Unusual

*(Flaky tests, environment limitations, hal yang ditunda ke sesi berikutnya, environment-specific quirks, dll.)*

---

## Appendix A — Quick Reference: DevTools Checklist per Action

Setiap kali kamu melakukan user action penting di frontend, centang ini:

```
Action yang dilakukan: ____________________
□ Console → zero error merah baru setelah action ini
□ Console → zero unhandled promise rejection baru
□ Network → API call yang diharapkan muncul dan dipanggil
□ Network → Status code sesuai yang diharapkan
□ Network → Request payload benar (inspect Payload tab)
□ Network → Response body shape benar (inspect Preview tab)
□ Network → Tidak ada 4xx/5xx yang tidak ditangani oleh UI
□ UI → State update visible dan benar setelah action
□ UI → Error state muncul dengan pesan yang jelas jika action gagal
□ UI → Loading state ada dan hilang dengan benar
```

---

## Appendix B — Quick Reference: OWASP API Top 10 Test Scenarios

| Risk | Skenario minimal yang harus ditest |
|------|-----------------------------------|
| BOLA (API1) | `GET /resource/123` dengan auth user yang punya resource ID 456 → harus `403`, bukan data ID 123 |
| Broken Auth (API2) | Token expired → `401`; token invalid → `401`; no token → `401` |
| Property Level Auth (API3) | Response tidak expose field `passwordHash`, `internalAdminNote`, dll |
| Resource Consumption (API4) | 100 request beruntun tanpa throttle → server tidak crash/timeout |
| Function Level Auth (API5) | User biasa `POST /admin/users` → `403` |
| Business Flow Abuse (API6) | Loop script yang trigger checkout berulang → rate limited atau blocked |
| SSRF (API7) | Input `url=http://169.254.169.254/` (AWS metadata) → tidak di-fetch oleh server |
| Security Misconfig (API8) | `OPTIONS /api/users` → tidak expose unnecessary methods; error response tidak verbose |
| Inventory (API9) | Semua endpoint terdokumentasi; tidak ada shadow endpoint tanpa auth |
| Third-party Consumption (API10) | External API response di-validate sebelum di-parse/di-execute |

---

## Appendix C — Severity Definitions

| Severity | Definisi | Contoh |
|----------|----------|--------|
| **Blocker** | Menghalangi core functionality; tidak bisa lanjut testing area ini | Login tidak bisa, data corruption, crash total |
| **Major** | Feature utama tidak berjalan benar atau data salah | Kalkulasi fee salah, order tidak tersimpan, button tidak response |
| **Minor** | Fungsional tapi ada masalah UX, styling, atau edge case tidak umum | Teks terpotong di mobile, warna salah, error message generik |
| **Trivial** | Kosmetik, tidak mempengaruhi fungsi atau UX signifikan | Spasi tidak konsisten, typo di placeholder |

Blocker dan Major harus 0 sebelum layer bisa CLEARED. Minor dan Trivial boleh dipertimbangkan berdasarkan konteks produk.
