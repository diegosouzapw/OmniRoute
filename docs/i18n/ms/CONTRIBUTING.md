# Contributing to OmniRoute (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Persediaan Pembangunan

### Prasyarat

- **Node.js** `>=22.22.3 <23`, atau `>=24.0.0 <27` (disyorkan: 24 LTS)
- **npm** 10+

> **Pengguna npm v11+ (Node 24+):** Selepas `npm install`, sahkan modul natif telah dipasang:
> `node -e "require('better-sqlite3')"`. Jika gagal dengan `MODULE_NOT_FOUND`,
> jalankan `npm approve-scripts better-sqlite3 && npm install`. Lihat
> [Penyelesaian Masalah](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klon & Pasang

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Pemboleh Ubah Persekitaran

```bash
# Cipta .env anda daripada templat
cp .env.example .env

# Jana rahsia yang diperlukan
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Pemboleh ubah utama untuk pembangunan:

| Pemboleh Ubah          | Lalai Pembangunan        | Penerangan                    |
| ---------------------- | ------------------------ | ----------------------------- |
| `PORT`                 | `20128`                  | Port pelayan                  |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | URL asas untuk bahagian depan |
| `JWT_SECRET`           | (jana di atas)           | Rahsia penandatanganan JWT    |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Kata laluan log masuk pertama |
| `APP_LOG_LEVEL`        | `info`                   | Tahap keterperincian log      |

### Tetapan Papan Pemuka

Papan pemuka menyediakan togol UI untuk ciri yang juga boleh dikonfigurasikan melalui pemboleh ubah persekitaran:

| Lokasi Tetapan     | Togol                 | Penerangan                              |
| ------------------ | --------------------- | --------------------------------------- |
| Tetapan → Lanjutan | Mod Nyahpepijat       | Dayakan log permintaan nyahpepijat (UI) |
| Tetapan → Umum     | Keterlihatan Bar Sisi | Tunjukkan/sembunyikan bahagian bar sisi |

Tetapan ini disimpan dalam pangkalan data dan dikekalkan selepas mula semula, serta mengatasi nilai lalai pemboleh ubah persekitaran apabila ditetapkan.

### Menjalankan Secara Setempat

```bash
# Mod pembangunan (muat semula pantas)
npm run dev

# Binaan pengeluaran
npm run build    # next build → .build/next/ kemudian assembleStandalone → dist/
npm run start

# Kompilasi pantas bahagian belakang/API sahaja untuk perubahan penyumbang
npm run build:contributor

# Binaan keluaran (binaan semula bersih + penanda HEAD — diperlukan untuk penggunaan)
npm run build:release   # rm -rf .build dist && build + menulis dist/BUILD_SHA

# Konfigurasi port umum
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Binaan penyumbang melakukan pengesahan kompilasi sahaja: ia tidak menghimpunkan
pengedaran kendiri atau membina aset pembungkusan natif pilihan. Gunakan binaan pengeluaran biasa apabila
anda perlu mengesahkan berkas yang boleh dihantar.

### Susun Atur Output Binaan

| Direktori | Kandungan                                                                     | Dijejaki |
| --------- | ----------------------------------------------------------------------------- | -------- |
| `src/`    | Sumber aplikasi (TypeScript / TSX)                                            | Ya       |
| `.build/` | Perantaraan — output `next build` (diabaikan git, `distDir = .build/next`)    | Tidak    |
| `dist/`   | Berkas boleh dihantar — dihimpunkan oleh `assembleStandalone` (diabaikan git) | Tidak    |

Saluran binaan ialah proses sekali lalu:

```
npm run build
  └─ next build → .build/next/standalone  (output Next.js)
  └─ assembleStandalone()                 (menyalin aset kendiri + statik + awam + natif)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` turut membersihkan kedua-dua direktori terlebih dahulu dan menulis
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) sebagai penanda integriti penggunaan.

`npm run build:contributor` menggunakan profil binaan bahagian belakang sahaja. Ia menggantikan sementara
fail UI papan pemuka dengan stub semasa membina, mengekalkan pengendali laluan API dan memulihkan fail asal
selepas binaan. Gunakan `npm run build` untuk perubahan yang menjejaskan UI papan pemuka atau bagi pengesahan
keluaran penuh; profil penyumbang bukan pengganti untuk binaan keluaran.

> **Nota penggunaan VPS:** direktori imej jauh `/usr/lib/node_modules/omniroute/app/`
> tidak berubah. Kemahiran penggunaan melakukan rsync kandungan `dist/` ke dalamnya.
> Hanya laluan output binaan dalam repositori yang berubah (`app/` → `dist/`).

URL lalai:

- **Papan Pemuka**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Aliran Kerja Git

> ⚠️ **JANGAN SEKALI-KALI membuat commit terus ke `main`.** Sentiasa gunakan cabang ciri.
>
> **Asas PR:** sasarkan cabang `release/vX.Y.Z` yang aktif (bukan `main`). Lihat
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) untuk model
> satu keluaran bagi setiap cabang + tag semasa pelancaran.

```bash
# Cipta cabang daripada hujung keluaran aktif (contoh: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... buat perubahan ...
git commit -m "feat: terangkan perubahan anda"
git push -u origin feat/your-feature-name
# Buka Pull Request dengan base = release/v3.8.49
```

### Penamaan Cabang

| Awalan      | Tujuan                        |
| ----------- | ----------------------------- |
| `feat/`     | Ciri baharu                   |
| `fix/`      | Pembaikan pepijat             |
| `refactor/` | Penstrukturan semula kod      |
| `docs/`     | Perubahan dokumentasi         |
| `test/`     | Penambahan/pembaikan ujian    |
| `chore/`    | Peralatan, CI, kebergantungan |

### Mesej Commit

Ikuti [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: tambah pemutus litar untuk panggilan penyedia
fix: selesaikan kes pinggir pengesahan rahsia JWT
docs: kemas kini SECURITY.md dengan perlindungan PII
test: tambah ujian unit kebolehcerapan
refactor(db): satukan jadual had kadar
```

Skop (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Menjalankan Ujian

```bash
# Semua ujian (unit + vitest + ekosistem + e2e)
npm run test:all

# Satu fail ujian (pelaksana ujian asli Node.js — kebanyakan ujian menggunakan ini)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Hanya ujian unit yang terjejas oleh perubahan anda (pemilih TIA yang sama seperti get CI, #8084)
npm run test:scoped            # perubahan dalam komit terakhir (atau pepohon kerja)
npm run test:scoped:staged     # perubahan berperingkat sahaja — sesuai digandingkan dengan pelaksanaan pra-komit
npm run test:scoped:full       # bina semula peta graf import terlebih dahulu (selepas menambah/mengalihkan fail)
# Keluar 1 + "run the full suite" bermaksud fail hab (tsconfig, package.json, …) atau sumber
# yang tidak dipetakan telah berubah — pemilih gagal secara selamat, ia tidak pernah melangkau secara senyap.

# Vitest (pelayan MCP, autoCombo, cache)
npm run test:vitest

# Ujian E2E (memerlukan Playwright)
npm run test:e2e

# E2E klien protokol (pengangkutan MCP, A2A)
npm run test:protocols:e2e

# Ujian keserasian ekosistem
npm run test:ecosystem

# Get liputan: 60% pernyataan/baris/fungsi/cabang
npm run test:coverage
npm run coverage:report

# Semakan lint + format
npm run lint
npm run check

# Ujian ringkas kombo huluan sebenar berpagar (memerlukan akses VPS + kredit penyedia sebenar)
# Mengakses penyedia SEBENAR — melibatkan sedikit kos. TIDAK PERNAH dijalankan dalam CI. Dilangkau dengan sempurna tanpa get.
# Memerlukan: akses ssh root@192.168.0.15 (mendapatkan petikan DB baca sahaja daripada VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Ujian ringkas langsung VPS fasa 3 — skrip Node ESM biasa, mengakses terus pelayan .15 yang aktif.
# Memerlukan: akses ssh root@192.168.0.15 (kombo dicipta/dihapuskan melalui SSH sqlite).
# Mengakses penyedia SEBENAR (kos kecil). Mencipta/memadam hanya kombo __live_test__*. TIDAK PERNAH dijalankan dalam CI.
# REQUIRE_API_KEY=false pada .15, jadi kunci API tidak diperlukan, tetapi mematuhi COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY jika ditetapkan.
npm run test:combo:live:vps              # 7 senario HTTP (keutamaan/round-robin/berwajaran/kos/gabungan/auto + kesihatan)
npm run test:combo:live:vps:failover     # menambahkan senario failover merentas penyedia sebenar (jumlah 8)
```

Catatan liputan:

- `npm run test:coverage` mengukur liputan sumber untuk suite ujian unit utama, mengecualikan `tests/**`, dan menyertakan `open-sse/**`
- Permintaan tarik mesti mengekalkan get liputan pada **60%+** pernyataan/baris/fungsi/cabang
- Jika PR mengubah kod pengeluaran dalam `src/`, `open-sse/`, `electron/`, atau `bin/`, ia mesti menambah atau mengemas kini ujian automatik dalam PR yang sama
- `npm run coverage:report` mencetak laporan terperinci fail demi fail daripada pelaksanaan liputan terkini
- `npm run test:coverage:legacy` mengekalkan metrik lama untuk perbandingan sejarah
- Lihat `docs/ops/COVERAGE_PLAN.md` untuk pelan hala tuju peningkatan liputan berfasa

### Keperluan Permintaan Tarik

Sebelum membuka PR, gunakan
[Laluan Emas Sumbangan](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) untuk menjalankan gelung terfokus bagi
perkara yang anda ubah. Suite unit penuh (4 serpihan CI), Vitest, get liputan **60%+**, dan
binaan pengeluaran ialah tanggungjawab CI — menjalankannya secara setempat tidak memberikan sebarang isyarat yang belum
akan diberikan oleh semakan PR, dan pada mesin yang lebih kecil, ia boleh menepukan hos (#8084):

- Jalankan fail ujian yang meliputi perubahan anda: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Jalankan `npm run lint`
- Sertakan atau kemas kini ujian automatik dalam PR yang sama apabila kod pengeluaran berubah
- Sertakan fail ujian yang diubah atau ditambah dalam perihalan PR apabila kod pengeluaran berubah
- Semak hasil SonarQube pada PR apabila rahsia projek dikonfigurasikan dalam CI

Status ujian semasa: **122 fail ujian unit** yang merangkumi:

- Penterjemah penyedia dan penukaran format
- Pengehadan kadar, pemutus litar, dan daya tahan
- Cache semantik, keidempotenan, penjejakan kemajuan
- Operasi dan skema pangkalan data (21 modul DB)
- Aliran OAuth dan pengesahan
- Pengesahan titik akhir API (Zod v4)
- Alat pelayan MCP dan penguatkuasaan skop
- Sistem Memori dan Kemahiran

---

## Gaya Kod

- **ESLint** — Jalankan `npm run lint` sebelum melakukan komit
- **Prettier** — Diformat secara automatik melalui `lint-staged` semasa komit (2 ruang, koma bertitik, petikan berganda, lebar 100 aksara, koma di penghujung es5)
- **TypeScript** — Semua kod `src/` menggunakan `.ts`/`.tsx`; `open-sse/` menggunakan `.ts`/`.js`; dokumentasikan dengan TSDoc (`@param`, `@returns`, `@throws`)
- **Tiada `eval()`** — ESLint menguatkuasakan `no-eval`, `no-implied-eval`, `no-new-func`
- **Pengesahan Zod** — Gunakan skema Zod v4 untuk semua pengesahan input API
- **Penamaan**: Fail = camelCase/kebab-case, komponen = PascalCase, pemalar = UPPER_SNAKE

### Pengendalian ralat / blok catch kosong

Jangan sekali-kali membiarkan `catch` tanpa penjelasan. Kelaskannya kepada salah satu daripada dua kategori (melaksanakan peraturan tegas "jangan sekali-kali mengabaikan ralat secara senyap dalam strim SSE"):

- **Disengajakan (pembersihan/telemetri usaha terbaik kita sendiri)** — kegagalan di sini dijangka dan
  tidak berbahaya; tambahkan komen rasional satu baris, tanpa pengelogan (pengelogan pada setiap permintaan ialah
  hingar yang cuba dielakkan oleh konvensyen ini).

  ```ts
  } catch {} // penutupan pengawal yang sudah ditutup selepas klien terputus adalah dijangka
  ```

- **Perlu dilog (kod luaran/dibekalkan oleh pemanggil, atau pengabaian mengubah aliran kawalan)** — kekalkan
  `catch` tersebut (jangan sekali-kali membiarkannya memutuskan strim) tetapi hasilkan `console.debug`/`warn` berkonteks supaya
  kegagalan itu dapat dikesan.

  ```ts
  } catch (e) {
    console.debug("[STREAM] ralat panggil balik onFailure:", e);
  }
  ```

Lihat `open-sse/utils/stream.ts` dan `open-sse/utils/streamHandler.ts` untuk contoh penggunaan.

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (110 top-level modules + 130 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (107 tools, 3 transports, 32 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (107 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Menambah Penyedia Baharu

### Langkah 1: Daftarkan Pemalar Penyedia

Tambahkan pada `src/shared/constants/providers.ts` — disahkan oleh Zod semasa modul dimuatkan.

### Langkah 2: Tambahkan Pelaksana (jika logik tersuai diperlukan)

Cipta pelaksana dalam `open-sse/executors/your-provider.ts` yang melanjutkan pelaksana asas.

### Langkah 3: Tambahkan Penterjemah (jika format bukan OpenAI)

Cipta penterjemah permintaan/respons dalam `open-sse/translator/`.

### Langkah 4: Tambahkan Konfigurasi OAuth (jika berasaskan OAuth)

Tambahkan kelayakan OAuth dalam `src/lib/oauth/constants/oauth.ts` dan perkhidmatan dalam `src/lib/oauth/services/`.

Jika penyedia huluan mengedarkan `client_id`/rahsia OAuth awam atau kunci API Web Firebase dalam CLI awam / berkas penyemak imbasnya, **jangan** benamkannya sebagai literal rentetan. Gunakan `resolvePublicCred()` daripada `open-sse/utils/publicCreds.ts` dan tambahkan entri bait bertopeng pada `EMBEDDED_DEFAULTS`. Aliran kerja mandatori yang lengkap didokumentasikan dalam [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Dalam pengendali/pelaksana, mesej ralat yang dihantar kepada klien mesti melalui `buildErrorBody()` / `sanitizeErrorMessage()` daripada `open-sse/utils/error.ts` — jangan sekali-kali letakkan `err.stack` atau `err.message` mentah dalam isi Respons. Lihat [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Langkah 5: Daftarkan Model

Tambahkan takrif model dalam `open-sse/config/providerRegistry.ts`.

### Langkah 6: Tambahkan Ujian

Tulis ujian unit dalam `tests/unit/` yang sekurang-kurangnya merangkumi:

- Pendaftaran penyedia
- Penterjemahan permintaan/respons
- Pengendalian ralat

---

## Senarai Semak Pull Request

- [ ] Ujian lulus (`npm test`)
- [ ] Pelintiran lulus (`npm run lint`)
- [ ] Binaan berjaya (`npm run build`)
- [ ] Jenis TypeScript ditambahkan untuk fungsi dan antara muka awam baharu
- [ ] Tiada rahsia atau nilai sandaran yang dikod keras
- [ ] Bukti kelayakan huluan awam dibenamkan melalui `resolvePublicCred()` (lihat [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), bukan sebagai nilai literal
- [ ] Respons ralat disalurkan melalui `buildErrorBody()` / `sanitizeErrorMessage()` — tiada surihan tindanan mentah dalam badan respons (lihat [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Perintah shell (`exec` / `spawn`) menghantar nilai masa jalan melalui `env`, bukan melalui interpolasi rentetan
- [ ] Semua input disahkan dengan skema Zod
- [ ] **Fragmen** log perubahan ditambahkan di bawah `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` untuk perubahan yang dapat dilihat oleh pengguna (lihat [`changelog.d/README.md`](./changelog.d/README.md)) — jangan edit `CHANGELOG.md` secara langsung; fragmen dihimpunkan semasa keluaran dan tidak akan bercanggah antara PR
- [ ] Dokumentasi dikemas kini (jika berkenaan)
- [ ] Tiada amaran CodeQL / Secret-Scanning baharu dibuka, atau setiap amaran ditolak dengan justifikasi teknikal yang merujuk dokumen `docs/security/` yang berkaitan
- [ ] Laluan yang melancarkan proses anak (`/api/mcp/`, `/api/cli-tools/runtime/`) diklasifikasikan sebagai `isLocalOnlyPath()` dalam `src/server/authz/routeGuard.ts` — lihat [Peraturan Tegas #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Tiada treler `Co-Authored-By` dalam mesej komit — komit mesti dipaparkan semata-mata di bawah identiti Git pemilik repositori (Peraturan Tegas #16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Mendapatkan Bantuan

- **Seni Bina**: Lihat [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Rujukan API**: Lihat [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Dokumentasi keselamatan**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Dokumentasi operasi**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Isu**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR**: Lihat `docs/adr/` untuk rekod keputusan seni bina
