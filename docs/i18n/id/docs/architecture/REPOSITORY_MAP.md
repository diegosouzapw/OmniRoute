# Repository Map (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Deskripsi satu baris untuk setiap direktori dan file root.**
> Terakhir diperbarui: 2026-06-28 — OmniRoute v3.8.40
>
> Gunakan peta ini untuk menavigasi basis kode dengan cepat. Untuk pembahasan mendalam, ikuti tautan ke dokumentasi khusus.

## Struktur tingkat teratas

```
OmniRoute/
├── src/                  # Aplikasi Next.js 16 (UI + rute API + pustaka + domain + server)
├── open-sse/             # Workspace mesin streaming (handler, eksekutor, penerjemah, server MCP)
├── electron/             # Pembungkus desktop (Electron 41 + electron-builder 26.10)
├── bin/                  # Titik masuk CLI dan handler perintah
├── scripts/              # Skrip build, pemeriksaan, sinkronisasi, dan sekali pakai
├── docs/                 # Dokumentasi publik (Anda berada di sini)
├── tests/                # Semua rangkaian pengujian (unit, integrasi, e2e, klien protokol)
├── public/               # Aset statis Next.js, manifes PWA, service worker, ikon
├── config/               # Konfigurasi statis + status gerbang kualitas (i18n, payloadRules, quality/)
├── images/               # Aset gambar pemasaran / README
├── @omniroute/           # Paket pendamping yang dapat dipublikasikan (opencode-plugin, opencode-provider)
├── skills/               # Paket keterampilan CLI/agen (cli-* + omni-* + config-codex-cli)
├── examples/             # Plugin contoh + templat awal omniroute-cmd-hello
├── contrib/              # Kontribusi komunitas (podman/)
├── .source/              # Konfigurasi sumber Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Workflow GitHub Actions + templat isu + templat PR
├── .husky/               # Hook Git (pre-commit, pre-push)
├── .claude/              # Perintah garis miring Claude Code (khusus proyek)
├── .agents/              # Workflow + keterampilan Codex / agen generik (cerminan .claude/)
├── .vscode/              # Pengaturan workspace VS Code
├── _ideia/               # Catatan perencanaan (informal; tidak didistribusikan)
├── _mono_repo/           # Subproyek historis (cloud, site, vscode-extension)
├── _references/          # Klona referensi hanya-baca dari proyek OSS terkait
├── _tasks/               # File pelacakan tugas per rilis (informal)
├── .build/ .worktrees/ dist/   # Area sementara build lokal / git-worktree / keluaran build (diabaikan oleh Git)
├── .issues/              # Cache isu lokal (diabaikan oleh Git)
├── .playwright-mcp/      # Artefak pengujian Playwright MCP
├── coverage/             # Keluaran cakupan c8 (diabaikan oleh Git)
├── logs/                 # Log runtime (diabaikan oleh Git)
├── node_modules/         # Dependensi (diabaikan oleh Git)
├── package/              # Area staging npm pack (artefak build)
├── .next/                # Keluaran build Next.js (diabaikan oleh Git)
└── (file root — lihat di bawah)
```

---

## File root

| File                                        | Tujuan                                                                                        |
| ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **README.md**                               | Halaman arahan pemasaran + mulai cepat + matriks fitur (lihat juga `llm.txt`)                 |
| **CHANGELOG.md**                            | Catatan perubahan per rilis (dibuat otomatis oleh skill `/version-bump-cc`)                   |
| **LICENSE**                                 | Teks lisensi MIT                                                                              |
| **CLAUDE.md**                               | Aturan proyek untuk agen Claude Code (aturan wajib, konvensi, skenario)                       |
| **AGENTS.md**                               | Sama seperti CLAUDE.md, tetapi untuk agen AI non-Claude (Codex, Cursor, dll.)                 |
| **GEMINI.md**                               | Aturan ringkas untuk agen berbasis Gemini (subset dari CLAUDE.md)                             |
| **CONTRIBUTING.md**                         | Panduan kontributor: penyiapan, commit konvensional, pengujian, alur PR                       |
| **SECURITY.md**                             | Kebijakan pelaporan kerentanan, versi yang didukung, model ancaman                            |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — ekspektasi perilaku komunitas                                          |
| **llm.txt**                                 | Halaman arahan teks biasa yang dioptimalkan untuk crawler LLM (SEO untuk asisten AI)          |
| **package.json**                            | Manifes npm, skrip, dependensi, engine, ambang cakupan c8                                     |
| **package-lock.json**                       | Pohon dependensi yang dikunci                                                                 |
| **tsconfig.json**                           | Konfigurasi TypeScript root                                                                   |
| **tsconfig.typecheck-core.json**            | Konfigurasi pemeriksaan tipe untuk inti `src/`                                                |
| **tsconfig.typecheck-noimplicit-core.json** | Pemeriksaan tipe ketat (`noImplicitAny`)                                                      |
| **tsconfig.tsbuildinfo**                    | Cache build inkremental TS (diabaikan oleh git)                                               |
| **next.config.mjs**                         | Konfigurasi build Next.js 16 (output mandiri)                                                 |
| **next-env.d.ts**                           | Tipe env yang dibuat otomatis oleh Next.js                                                    |
| **eslint.config.mjs**                       | Konfigurasi datar ESLint (aturan per area proyek)                                             |
| **prettier.config.mjs**                     | Aturan pemformatan Prettier                                                                   |
| **postcss.config.mjs**                      | Konfigurasi PostCSS untuk pipeline Tailwind/CSS                                               |
| **playwright.config.ts**                    | Konfigurasi pengujian E2E Playwright                                                          |
| **vitest.config.ts**                        | Konfigurasi Vitest (suite default)                                                            |
| **vitest.mcp.config.ts**                    | Konfigurasi Vitest untuk server MCP / suite autoCombo / cache                                 |
| **sonar-project.properties**                | Konfigurasi SonarQube/SonarCloud (kualitas kode)                                              |
| **Dockerfile**                              | Build Docker multi-tahap (builder → runner-base → runner-cli)                                 |
| **docker-compose.yml**                      | Compose pengembangan dengan 4 profil (base, cli, host, cliproxyapi) + sidecar redis           |
| **docker-compose.prod.yml**                 | Compose produksi (port 20130, redis, volume bernama)                                          |
| **.dockerignore**                           | File yang dikecualikan dari konteks Docker                                                    |
| **fly.toml**                                | Konfigurasi deployment Fly.io (wilayah `sin`, port 20128, volume /data)                       |
| **.env.example**                            | Templat file env (disalin otomatis ke `.env` saat instalasi pertama)                          |
| **.gitignore**                              | Pola pengabaian Git                                                                           |
| **.npmignore**                              | Daftar pengecualian publikasi npm                                                             |
| **.npmrc**                                  | Konfigurasi npm (registry, kebijakan lockfile)                                                |
| **.node-version**                           | Sematan versi Node (digunakan oleh alat yang kompatibel dengan nvm)                           |
| **.nvmrc**                                  | Sematan versi Node untuk nvm                                                                  |
| **eslint.complexity.config.mjs**            | Konfigurasi ESLint untuk ratchet kompleksitas (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Konfigurasi ESLint untuk aturan SonarJS (kompleksitas kognitif / duplikasi)                   |
| **source.config.ts**                        | Konfigurasi sumber `defineDocs` Fumadocs (memasok `.source/`)                                 |
| **knip.json**                               | Konfigurasi Knip — file/ekspor/dependensi yang tidak digunakan (memasok gerbang kode mati)    |
| **stryker.conf.json**                       | Konfigurasi pengujian mutasi Stryker                                                          |
| **.size-limit.json**                        | Konfigurasi anggaran ukuran bundle size-limit                                                 |
| **promptfooconfig.yaml**                    | Konfigurasi evaluasi promptfoo                                                                |
| **.gitleaks.toml**                          | Kumpulan aturan pemindaian rahasia gitleaks                                                   |
| **.zizmor.yml**                             | Konfigurasi lint keamanan GitHub Actions zizmor                                               |
| **socket.yml**                              | Konfigurasi rantai pasok Socket.dev                                                           |
| **news.json**                               | Feed pengumuman v2 yang dilokalkan; item peluncuran Radar dikirim dalam keadaan nonaktif      |
| **flake.nix** / **flake.lock**              | Definisi dev-shell Nix + lock                                                                 |
| **.env**                                    | Rahasia lokal (diabaikan git — dihasilkan dari `.env.example`)                                |

> **Dipindahkan dari root pada v3.8.26 (perapian):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json`, dan `quality-metrics.json` yang dihasilkan (diabaikan git). Lihat [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Aplikasi Next.js

```
src/
├── app/                 # App Router (halaman + rute API + halaman status + landing page)
├── lib/                 # Pustaka inti / modul domain (80 subdirektori + ~70 file tingkat atas)
├── domain/              # Logika domain murni (mesin kebijakan, fallback, biaya, lockout, comboResolver, assessment)
├── server/              # Modul khusus server (pipeline authz, cors, middleware autentikasi) — tidak dapat diimpor dari klien
├── shared/              # Digunakan bersama antara server dan klien jika aman (konstanta, tipe, validasi, kontrak, utilitas)
├── i18n/                # Konfigurasi next-intl + JSON pesan per locale (42 locale)
├── middleware/          # Middleware Next.js (pengayaan permintaan, deteksi locale)
├── mitm/                # Inti proxy MITM: pembuatan/instalasi sertifikat, handler, target, inspektur, mask, passthrough
│   ├── handlers/        # 9 kelas handler agen IDE yang memperluas MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Lapisan penangkapan lalu lintas: buffer (ring dalam memori), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Kode perekat adaptor model (shim lama)
├── scripts/             # Skrip pemeliharaan dalam pohon sumber (misalnya, backfillAggregation)
├── sse/                 # Handler/layanan SSE lama (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Penyimpanan dalam memori lama (sedang dihentikan secara bertahap untuk src/lib/db)
├── types/               # File tipe TS bersama
├── instrumentation.ts   # Hook telemetri Next.js (browser + edge)
├── instrumentation-node.ts  # Instrumentasi khusus Node
└── proxy.ts             # Shim entri HTTP-proxy
```

### `src/app/` — App Router (Next.js 16)

| Path                                                                         | Tujuan                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | API publik yang kompatibel dengan OpenAI (~25 sub-rute: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers, dll.)                                                                                                                 |
| `app/api/v1beta/`                                                            | Endpoint API bergaya Gemini                                                                                                                                                                                                                                                                                              |
| `app/api/playground/`                                                        | Rute Playground Studio: `improve-prompt/` (POST — penulis ulang prompt LLM), `presets/` (GET daftar / POST buat), `presets/[id]/` (GET / PUT / DELETE) — lihat `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                    |
| `app/api/` (non-v1)                                                          | Rute manajemen/admin (~60 direktori: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools, dll.)                                                                                                                                               |
| `app/api/tools/agent-bridge/`                                                | API REST AgentBridge — 12 rute (kontrol server, status/DNS/pemetaan agen, bypass, sertifikat, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Lihat `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                       |
| `app/api/tools/traffic-inspector/`                                           | API REST + WS Traffic Inspector — 16+ rute (requests, sessions, hosts, capture-modes, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Lihat `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                          |
| `app/a2a/`                                                                   | Titik masuk A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                               |
| `app/.well-known/agent.json/`                                                | Kartu Agen A2A (penemuan)                                                                                                                                                                                                                                                                                                |
| `app/(dashboard)/dashboard/`                                                 | Halaman UI dasbor (50+ bagian, ~118 file page.tsx: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity, dll.)                                                                                                                                             |
| `app/(dashboard)/dashboard/search-tools/`                                    | UI Search Tools Studio (3 tab: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — lihat `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                             |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (rencana 21): `page.tsx` (kerangka 3 tab), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Halaman dasbor AgentBridge — kartu server, 9 kartu agen, wizard penyiapan, pemetaan model, daftar bypass. i18n PT-BR + EN. Lihat `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                       |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Halaman dasbor Traffic Inspector — tampilan terbagi DevTools, 7 tab detail, 4 tombol alih mode pengambilan, perekam sesi, pewarnaan konteks. i18n PT-BR + EN. Lihat `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                              |
| `app/(dashboard)/dashboard/activity/`                                        | Halaman umpan aktivitas (Grup B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — lihat `docs/architecture/MONITORING_SECTIONS.md`                                                                                                             |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Halaman Berbagi Kuota (Grup B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                              |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Halaman konfigurasi paket penyedia (Grup B): `page.tsx` + `ProviderPlanConfigClient.tsx` — penimpaan dimensi kuota per koneksi                                                                                                                                                                                           |
| `app/docs/`                                                                  | Penampil dokumentasi tersemat (merender `docs/*.md`)                                                                                                                                                                                                                                                                     |
| `app/landing/`                                                               | Halaman arahan pemasaran                                                                                                                                                                                                                                                                                                 |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Halaman terkait autentikasi                                                                                                                                                                                                                                                                                              |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Halaman kesalahan HTTP                                                                                                                                                                                                                                                                                                   |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Halaman statis/status                                                                                                                                                                                                                                                                                                    |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Tata letak root, beranda, manifes PWA, CSS global                                                                                                                                                                                                                                                                        |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Batas kesalahan                                                                                                                                                                                                                                                                                                          |

### `src/lib/` — Pustaka inti (~50 modul)

| Modul                                    | Tujuan                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Pengelola tugas protokol A2A, keterampilan (5), streaming                                                                                                                                                                                                                                                               |
| `acp/`                                   | Registri Agen CLI (penemuan CLI lokal — lihat `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                               |
| `api/`                                   | Pembantu API bersama (`requireManagementAuth`, validasi)                                                                                                                                                                                                                                                                |
| `auth/`                                  | Sesi, hashing kata sandi, validasi token                                                                                                                                                                                                                                                                                |
| `batches/`                               | Handler OpenAI Batches API                                                                                                                                                                                                                                                                                              |
| `catalog/`                               | Validasi Zod katalog penyedia + resolusi kapabilitas                                                                                                                                                                                                                                                                    |
| `cloudAgent/`                            | Agen Cloud (Codex Cloud, Devin, Jules) — lihat `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                         |
| `combos/`                                | Resolusi kombo + pembantu pengurutan ulang                                                                                                                                                                                                                                                                              |
| `audit/`                                 | Pembantu umpan aktivitas: `highLevelActions.ts` (daftar izin + `isHighLevelAction()`), `activityIcons.ts` (pemetaan tindakan → ikon/verba), `timeline.ts` (groupByDay/relativeTime) — lihat `docs/architecture/MONITORING_SECTIONS.md`                                                                                  |
| `compliance/`                            | Log audit + audit penyedia — lihat `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                        |
| `compression/`                           | Perekat mesin kompresi (mesin berada di `open-sse/services/compression/`)                                                                                                                                                                                                                                               |
| `config/`                                | Pembantu konfigurasi runtime                                                                                                                                                                                                                                                                                            |
| `db/`                                    | 120+ modul DB domain + 168 migrasi (selalu gunakan modul ini untuk SQLite)                                                                                                                                                                                                                                              |
| `quota/`                                 | Mesin Berbagi Kuota: `dimensions.ts` (tipe/Zod), `types.ts` (antarmuka QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — lihat `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Klien katalog model gratis Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — lihat `docs/frameworks/RADAR.md`                                                                                                                                         |
| `display/`                               | Helper pemformatan UI (biaya, latensi, dll.)                                                                                                                                                                                                                                                                            |
| `embeddings/`                            | Helper layanan embedding                                                                                                                                                                                                                                                                                                |
| `env/`                                   | Penguraian + validasi variabel lingkungan                                                                                                                                                                                                                                                                               |
| `evals/`                                 | Kerangka kerja evaluasi (suite, runner, runtime) — lihat `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                     |
| `guardrails/`                            | Penyamar PII, injeksi prompt, bridge vision — lihat `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                       |
| `jobs/`                                  | Tugas latar belakang (seperti cron)                                                                                                                                                                                                                                                                                     |
| `memory/`                                | Memori percakapan (RRF hibrida SQLite FTS5 + sqlite-vec + Qdrant tingkat 2) — lihat `docs/frameworks/MEMORY.md`                                                                                                                                                                                                         |
| `memory/embedding/`                      | Lapisan embedding multisumber: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (rencana 21)                                                                                                                                                                       |
| `memory/vectorStore.ts`                  | Wrapper sqlite-vec v0.1.9 — KNN brute-force + RRF hibrida (FTS5 + vektor, k=60). Diinisialisasi secara lazy, mengalami degradasi dengan baik saat sqlite-vec tidak tersedia. (rencana 21)                                                                                                                               |
| `memory/reindex.ts`                      | `runReindexBatch()` — memproses memori dengan `needs_reindex=1` di latar belakang; dipanggil oleh `POST /api/memory/reindex` dan jalur lazy-backfill. (rencana 21)                                                                                                                                                      |
| `monitoring/`                            | Pemeriksaan kesehatan, emisi metrik                                                                                                                                                                                                                                                                                     |
| `oauth/`                                 | Alur OAuth/impor untuk 22 modul penyedia (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                    |
| `plugins/`                               | Registri plugin                                                                                                                                                                                                                                                                                                         |
| `promptCache/`                           | Titik henti cache prompt bergaya Anthropic                                                                                                                                                                                                                                                                              |
| `skills/`                                | Kerangka kerja keterampilan (bawaan + marketplace + SkillsSH) — lihat `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                       |
| `playground/`                            | Helper bersama Playground Studio: `codeExport.ts` (generator curl/Python/TS), `promptImprover.ts` (pembuat meta-prompt), `streamMetrics.ts` (TTFT/TPS murni), `types.ts` (tabel harga) — lihat `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                   |
| `webhookDispatcher.ts`                   | Pengiriman webhook HMAC — lihat `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                           |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Pengelola tunnel — lihat `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                    |
| `cloudSync.ts`, `initCloudSync.ts`       | Sinkronisasi status ke cloud secara opsional                                                                                                                                                                                                                                                                            |
| `localDb.ts`                             | Barrel ekspor ulang untuk modul db (tanpa logika — hanya ekspor ulang)                                                                                                                                                                                                                                                  |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Caching permintaan + idempotensi                                                                                                                                                                                                                                                                                        |
| (~30 file tingkat atas lainnya)          | Helper khusus (logEnv, modelsDevSync, piiSanitizer, dll.)                                                                                                                                                                                                                                                               |

### `src/lib/db/` — Database (122 modul + 168 migrasi)

| Subdirektori              | Tujuan                                                                                                                                                                     |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton `getDbInstance()` dengan penjurnalan WAL                                                                                                                         |
| `db/migrations/`          | File SQL berversi (idempoten, transaksional). `073_memory_vec.sql` menambahkan `memory_vec_meta` + kolom `needs_reindex` (rencana 21).                                     |
| `db/playgroundPresets.ts` | Modul CRUD untuk preset Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)   |
| `db/memoryVec.ts`         | CRUD untuk `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, dll. (rencana 21)           |
| `db/<domain>.ts`          | Satu modul per domain: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache, dll. |

### `src/domain/`

| Modul                  | Tujuan                                       |
| ---------------------- | -------------------------------------------- |
| `policy.ts`            | Mesin kebijakan                              |
| `fallbackPolicy.ts`    | Pohon keputusan fallback                     |
| `costRules.ts`         | Aturan penghitungan biaya                    |
| `lockoutPolicy.ts`     | Kebijakan penguncian model/koneksi           |
| `tagRouter.ts`         | Perutean berbasis tag                        |
| `comboResolver.ts`     | Resolusi combo (digunakan oleh mesin combo)  |
| `modelAvailability.ts` | Pemeriksaan ketersediaan per model           |
| `assessment/`          | Penilaian model (Fase 1 RFC-AUTO-ASSESSMENT) |

### `src/server/`

| Modul    | Tujuan                                                                                             |
| -------- | -------------------------------------------------------------------------------------------------- |
| `authz/` | Pipeline otorisasi: `classify` → `policies` → `enforce` — lihat `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Konfigurasi CORS                                                                                   |
| `auth/`  | Middleware sesi                                                                                    |

### `src/shared/`

| Modul                            | Tujuan                                                                        |
| -------------------------------- | ----------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 penyedia** dengan validasi Zod (sumber kebenaran utama)                 |
| `constants/cliTools.ts`          | Registri alat CLI eksternal                                                   |
| `constants/routingStrategies.ts` | **19 strategi perutean** dengan prioritas                                     |
| `constants/publicApiRoutes.ts`   | Rute yang memerlukan autentikasi Bearer (bukan autentikasi manajemen)         |
| `constants/upstreamHeaders.ts`   | Daftar larangan header untuk permintaan upstream                              |
| `validation/schemas.ts`          | ~80 skema Zod (sumber kebenaran tunggal untuk kontrak API)                    |
| `validation/helpers.ts`          | Helper validasi Zod (`validateBody`, dll.)                                    |
| `types/`                         | Tipe TS bersama                                                               |
| `contracts/`                     | Kontrak API publik (digunakan oleh `files:` di `package.json`)                |
| `utils/circuitBreaker.ts`        | Pemutus sirkuit penyedia (lihat `docs/architecture/RESILIENCE_GUIDE.md`)      |
| `utils/apiAuth.ts`               | Validasi kunci API, pemeriksaan cakupan                                       |
| `utils/fetchTimeout.ts`          | Wrapper batas waktu/pembatalan untuk pengambilan upstream                     |
| `utils/releaseNotes.ts`          | Parser pengumuman v2/legacy tertutup, pelokalan, dan penutupan berdasarkan ID |

---

## `open-sse/` — Workspace Mesin Streaming

Workspace npm terpisah (`@omniroute/open-sse`). Menangani pemrosesan permintaan + eksekusi penyedia.

```
open-sse/
├── handlers/            # 16 file (12 handler + 4 helper): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search, dll.
├── executors/           # 67 executor khusus penyedia (memperluas BaseExecutor)
├── translator/          # Konverter format (9 permintaan, 9 respons, 9 helper)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ modul layanan (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM, dll.)
├── mcp-server/          # Server MCP (110 alat, 3 transportasi, 33 cakupan)
├── config/              # Registri penyedia/model, konfigurasi header, alias model
├── utils/               # Klien TLS, fetch/dispatcher proksi, helper jaringan
├── index.ts             # Titik masuk workspace
├── package.json         # Manifes workspace
├── tsconfig.json        # Konfigurasi TS workspace
└── types.d.ts           # Deklarasi tipe workspace
```

### `open-sse/mcp-server/`

| Jalur                       | Tujuan                                                                             |
| --------------------------- | ---------------------------------------------------------------------------------- |
| `server.ts`                 | Siklus hidup server MCP (transportasi stdio + HTTP)                                |
| `httpTransport.ts`          | Transportasi HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)             |
| `audit.ts`                  | Pencatatan audit ke tabel `mcp_tool_audit`                                         |
| `scopeEnforcement.ts`       | Validasi cakupan per alat                                                          |
| `runtimeHeartbeat.ts`       | Heartbeat kesehatan ke `DATA_DIR/runtime/mcp-heartbeat.json`                       |
| `descriptionCompressor.ts`  | Memampatkan metadata deskripsi alat untuk menghemat konteks                        |
| `schemas/tools.ts`          | 36 definisi alat dasar + cakupan                                                   |
| `tools/advancedTools.ts`    | Implementasi alat tingkat lanjut                                                   |
| `tools/memoryTools.ts`      | 3 alat memori (pencarian/penambahan/penghapusan)                                   |
| `tools/skillTools.ts`       | 4 alat keterampilan (daftar/aktifkan/eksekusi/eksekusi yang telah dilakukan)       |
| `tools/compressionTools.ts` | 5 alat kompresi                                                                    |
| `README.md`                 | README server MCP internal (ditautkan silang dari `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Pembungkus Desktop

| File             | Tujuan                                                                                          |
| ---------------- | ----------------------------------------------------------------------------------------------- |
| `main.js`        | Proses utama Electron (BrowserWindow, server Next.js tertanam, baki sistem, pembaruan otomatis) |
| `preload.js`     | Jembatan IPC (contextBridge → `window.omniroute`)                                               |
| `package.json`   | Konfigurasi electron-builder + dependensi Electron 41 + electron-builder 26.10                  |
| `assets/`        | Ikon aplikasi (Windows .ico, macOS .icns, Linux .png)                                           |
| `dist-electron/` | Output build (diabaikan oleh git)                                                               |
| `types.d.ts`     | Deklarasi tipe untuk jembatan renderer                                                          |
| `README.md`      | README Electron internal (lihat juga `docs/guides/ELECTRON_GUIDE.md`)                           |

---

## `bin/` — CLI

| File                                                                                                        | Tujuan                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Titik masuk CLI utama — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos`, dll. |
| `reset-password.mjs`                                                                                        | CLI mandiri untuk mengatur ulang kata sandi                                                                                       |
| `cli/commands/setup.mjs`                                                                                    | Wizard penyiapan interaktif + noninteraktif                                                                                       |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostik kesehatan sistem (8+ pemeriksaan)                                                                                      |
| `cli/commands/providers.mjs`                                                                                | Daftar/pengujian/validasi penyedia                                                                                                |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Modul pembantu CLI                                                                                                                |
| `cli/tray/tray.ts`                                                                                          | Integrasi baki sistem (lintas platform: NotifyIcon di Windows, systray2 di macOS/Linux)                                           |
| `cli/tray/tray.ps1`                                                                                         | Backend NotifyIcon PowerShell (Windows, tanpa biner baru)                                                                         |
| `cli/tray/autostart.ts`                                                                                     | Mulai otomatis lintas platform (LaunchAgent / .desktop / registri)                                                                |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Rantai resolusi driver SQLite 5 langkah (dibundel → runtime → instalasi tertunda → node:sqlite → sql.js)                          |
| `cli/runtime/magicBytes.mjs`                                                                                | Validasi magic byte biner (ELF / Mach-O / Mach-O fat / PE)                                                                        |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — melakukan praresolusi driver saat postinstall / pertama kali dimulai                                         |
| `nodeRuntimeSupport.mjs`                                                                                    | Memvalidasi versi Node.js yang didukung saat instalasi                                                                            |

---

## `skills/` — Skill Agen Publik

| File                         | Tujuan                                                                            |
| ---------------------------- | --------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifes skill untuk agen AI eksternal (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Skrip Build & Pemeriksaan

| Skrip                               | Tujuan                                                                                           |
| ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| `run-next.mjs`                      | Runner pengembangan/start dengan pemuatan variabel lingkungan                                    |
| `build-next-isolated.mjs`           | Build mandiri (mode standalone Next.js 16)                                                       |
| `prepublish.ts`                     | Persiapan paket sebelum `npm pack`                                                               |
| `postinstall.mjs`                   | Membuat `.env` secara otomatis dari `.env.example` saat instalasi pertama                        |
| `sync-env.mjs`                      | Menyinkronkan ulang key `.env` dengan `.env.example`                                             |
| `check-cycles.mjs`                  | Mendeteksi dependensi melingkar                                                                  |
| `check-route-validation.mjs`        | Memvalidasi bahwa semua rute API memiliki validasi Zod                                           |
| `check-t11-any-budget.mjs`          | Menerapkan batas eksplisit penggunaan `any` per file                                             |
| `check-docs-sync.mjs`               | Memvalidasi sinkronisasi versi dokumentasi (pre-commit yang sudah ada)                           |
| **`check-env-doc-sync.mjs`**        | BARU: memeriksa silang variabel lingkungan dalam kode dengan `.env.example` dan `ENVIRONMENT.md` |
| **`check-docs-counts-sync.mjs`**    | BARU: memvalidasi jumlah (eksekutor, strategi, OAuth, skill A2A) agar sesuai dengan dokumentasi  |
| **`check-deprecated-versions.mjs`** | BARU: menandai versi/tanggal usang dalam dokumentasi                                             |
| `check-supported-node-runtime.ts`   | Memvalidasi bahwa versi Node saat ini didukung                                                   |
| `check-pr-test-policy.mjs`          | Menerapkan aturan "pengujian wajib" pada perubahan kode produksi                                 |
| **`gen-provider-reference.ts`**     | BARU: membuat otomatis `docs/reference/PROVIDER_REFERENCE.md` dari katalog                       |
| `i18n/generate-multilang.mjs`       | Menerjemahkan string UI + dokumentasi melalui Google Translate                                   |
| `i18n_autotranslate.py`             | Pipeline penerjemahan dokumentasi berbasis LLM                                                   |
| `validate_translation.py`           | Validasi terjemahan per lokal                                                                    |
| `check_translations.py`             | Pemeriksaan key i18n pada sisi kode                                                              |
| `run-playwright-tests.mjs`          | Runner E2E Playwright                                                                            |
| `run-protocol-clients-tests.mjs`    | Runner E2E MCP/A2A                                                                               |
| `run-ecosystem-tests.mjs`           | Pengujian ekosistem (integrasi penyedia)                                                         |
| `test-report-summary.mjs`           | Membuat markdown ringkasan cakupan                                                               |
| `smoke-electron-packaged.mjs`       | Melakukan smoke test pada build Electron yang telah dikemas                                      |
| `native-binary-compat.mjs`          | Memvalidasi bahwa dependensi native (`better-sqlite3`) cocok dengan Node milik Electron          |
| `validate-pack-artifact.ts`         | Memvalidasi output npm pack                                                                      |
| `responses-ws-proxy.mjs`            | Jembatan WebSocket untuk Codex Responses API                                                     |
| `v1-ws-bridge.mjs`                  | Jembatan WebSocket untuk endpoint `/api/v1/ws`                                                   |
| `standalone-server-ws.mjs`          | Runner server WS mandiri                                                                         |
| `system-info.mjs`                   | Mencetak informasi sistem/runtime untuk dukungan                                                 |
| `healthcheck.mjs`                   | Pemeriksaan kesehatan sekali jalan (digunakan oleh Docker HEALTHCHECK)                           |
| `uninstall.mjs`                     | Skrip penghapusan instalasi secara bersih                                                        |

---

## `docs/` — Dokumentasi Publik (7 file root + 17 subdirektori)

### Panduan tingkat atas

| Dokumen                     | Tujuan                                                                                       |
| --------------------------- | -------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Arsitektur tingkat tinggi, peta subsistem, antarmuka dasbor                                  |
| `CODEBASE_DOCUMENTATION.md` | Referensi rekayasa: direktori, modul, konvensi                                               |
| `FEATURES.md`               | Matriks fitur dengan sorotan v3.8                                                            |
| `USER_GUIDE.md`             | Panduan pengguna akhir (penyiapan, model, combo, CLI, audio, dll.)                           |
| `API_REFERENCE.md`          | Referensi endpoint API beserta model autentikasi                                             |
| `openapi.yaml`              | Spesifikasi OpenAPI 3.0 (121 path)                                                           |
| `SETUP_GUIDE.md`            | Metode instalasi (npm, npx, Docker, Electron, Termux, sumber)                                |
| `ENVIRONMENT.md`            | Semua variabel lingkungan (~800 didokumentasikan, ~3.050 baris `.env.example`)               |
| `TROUBLESHOOTING.md`        | Kesalahan umum + masalah umum yang diketahui pada v3.8.0                                     |
| `RELEASE_CHECKLIST.md`      | Alur rilis lengkap (skill, husky, commit konvensional, deployment)                           |
| `COVERAGE_PLAN.md`          | Target cakupan dan status saat ini                                                           |
| `FREE_TIERS.md`             | Penyedia tingkat gratis yang dikurasi (48+ gratis + 11 OAuth)                                |
| `CLI-TOOLS.md`              | Integrasi CLI eksternal + CLI Internal OmniRoute                                             |
| `I18N.md`                   | Arsitektur i18n, menambahkan bahasa, 42 locale                                               |
| `UNINSTALL.md`              | Langkah-langkah penghapusan instalasi secara bersih                                          |
| `PROVIDER_REFERENCE.md`     | Katalog 355 penyedia yang **dibuat otomatis** (buat ulang: `npm run gen:provider-reference`) |

### Pembahasan mendalam subsistem

| Dokumen                                      | Tujuan                                                                        |
| -------------------------------------------- | ----------------------------------------------------------------------------- |
| `MCP-SERVER.md`                              | Server MCP: 110 alat, 3 transport, 33 cakupan, endpoint REST                  |
| `A2A-SERVER.md`                              | A2A v0.3: JSON-RPC, 6 skill, pembantu REST, kartu agen                        |
| `AGENT_PROTOCOLS_GUIDE.md`                   | Panduan terpadu: A2A vs ACP vs Cloud Agents                                   |
| `CLOUD_AGENT.md`                             | Orkestrasi Codex Cloud / Devin / Jules                                        |
| `SKILLS.md`                                  | Kerangka kerja skill (bawaan + marketplace + SkillsSH + sandbox)              |
| `RADAR.md`                                   | Overlay katalog model gratis Radar (`RADAR_ENABLED`, nonaktif secara default) |
| `MEMORY.md`                                  | Sistem memori (SQLite FTS5 + Qdrant)                                          |
| `EVALS.md`                                   | Kerangka kerja evaluasi (suite, eksekusi, rubrik)                             |
| `GUARDRAILS.md`                              | Penyamaran PII, injeksi prompt, jembatan visi                                 |
| `COMPLIANCE.md`                              | Log audit, retensi, pilihan untuk menonaktifkan noLog                         |
| `WEBHOOKS.md`                                | Pengiriman webhook bertanda tangan HMAC                                       |
| `REASONING_REPLAY.md`                        | Cache hibrida memori/SQLite untuk `reasoning_content`                         |
| `AUTHZ_GUIDE.md`                             | Pipeline otorisasi (`classify` → `policies` → `enforce`)                      |
| `RESILIENCE_GUIDE.md`                        | Circuit breaker + cooldown + penguncian model                                 |
| `docs/security/STEALTH_GUIDE.md` (hanya git) | Fingerprinting TLS (JA3/JA4), Claude Code CCH, sertifikat MITM                |
| `AUTO-COMBO.md`                              | Mesin Auto Combo (penilaian 16 faktor, 6 paket mode, pabrik virtual)          |

### Kompresi

| Dokumen                         | Tujuan                                |
| ------------------------------- | ------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Ikhtisar mode kompresi + roadmap      |
| `COMPRESSION_ENGINES.md`        | Mesin Caveman + RTK, kontrak registry |
| `COMPRESSION_RULES_FORMAT.md`   | Skema JSON paket aturan Caveman       |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventaris paket aturan per bahasa    |
| `RTK_COMPRESSION.md`            | Pipeline deklaratif RTK (49 filter)   |

### Deployment

| Dokumen                      | Tujuan                                                            |
| ---------------------------- | ----------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Build Docker, profil (base/cli/host/cliproxyapi), sidecar Redis   |
| `VM_DEPLOYMENT_GUIDE.md`     | Deployment VM/VPS generik (Ubuntu/Debian + nginx + systemd)       |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Deployment Fly.io (saat ini hanya tersedia dalam bahasa Mandarin) |
| `TERMUX_GUIDE.md`            | Android headless melalui Termux                                   |
| `PWA_GUIDE.md`               | Instalasi Progressive Web App + service worker                    |
| `ELECTRON_GUIDE.md`          | Build + tanda tangani + distribusikan aplikasi desktop            |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                            |
| `PROXY_GUIDE.md`             | Proxy outbound 4 tingkat + marketplace 1proxy                     |

### Subdirektori

| Subdir                | Tujuan                                                                                                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Terjemahan dokumentasi yang dilokalkan (41 lokal)                                                                                                                                                                   |
| `docs/screenshots/`   | Aset gambar untuk panduan                                                                                                                                                                                           |
| `_tasks/superpowers/` | Rencana/spesifikasi dari superpowers (`writing-plans`/`brainstorming`) + riset — repositori terisolasi dengan versi terpisah, diabaikan oleh git pada pohon utama. Lihat CLAUDE.md → "Artefak Perencanaan & Riset". |

---

## `tests/` — Rangkaian Pengujian

| Subdirektori                         | Jenis                                        | Runner                                      |
| ------------------------------------ | -------------------------------------------- | ------------------------------------------- |
| `tests/unit/`                        | Pengujian unit (~4.800 berkas, paling cepat) | Runner pengujian bawaan Node                |
| `tests/integration/`                 | Pengujian integrasi multimodul + DB          | Runner pengujian bawaan Node (konkurensi 1) |
| `tests/e2e/`                         | E2E UI + alur kerja                          | Playwright                                  |
| `tests/e2e/protocol-clients.test.ts` | E2E klien nyata MCP + A2A                    | Klien protokol khusus                       |
| `tests/e2e/ecosystem.test.ts`        | Integrasi penyedia (mengakses jaringan)      | Runner pengujian bawaan Node                |

---

## `public/` — Aset Statis

| Jalur               | Tujuan                                                         |
| ------------------- | -------------------------------------------------------------- |
| `public/` (root)    | Favicon, robots.txt, manifes, service worker, gambar pemasaran |
| `public/providers/` | Logo penyedia PNG/SVG (digunakan di dasbor)                    |

---

## `config/` — Konfigurasi Statis + Status Gerbang Kualitas

Templat konfigurasi yang disertakan beserta baseline gerbang kualitas yang di-commit
(dipindahkan ke sini dari root repo pada v3.8.26 agar root tetap ringkas).

| Jalur                                         | Tujuan                                                                                    |
| --------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Daftar locale + metadata (sumber kanonis untuk jumlah 42 locale)                          |
| `config/i18n-schema.json`                     | Skema JSON yang memvalidasi `i18n.json`                                                   |
| `config/payloadRules.json`                    | Aturan sanitasi payload upstream                                                          |
| `config/quality/quality-baseline.json`        | Baseline ratchet mult metrik (`scripts/quality/check-quality-ratchet.mjs`)                |
| `config/quality/complexity-baseline.json`     | Baseline kompleksitas ESLint yang dibekukan (`check-complexity.mjs`)                      |
| `config/quality/duplication-baseline.json`    | Baseline duplikasi jscpd yang dibekukan (`check-duplication.mjs`)                         |
| `config/quality/file-size-baseline.json`      | Baseline ukuran per berkas yang dibekukan (`check-file-size.mjs`)                         |
| `config/quality/test-discovery-baseline.json` | Baseline pengujian yatim yang dibekukan (`check-test-discovery.mjs`)                      |
| `config/quality/dependency-allowlist.json`    | Daftar izin dependensi yang disetujui (`check-deps.mjs`)                                  |
| `config/quality/.license-allowlist.json`      | Daftar izin lisensi SPDX (`check-licenses.mjs`)                                           |
| `config/quality/quality-metrics.json`         | Metrik sementara yang dikumpulkan (dihasilkan oleh `collect-metrics.mjs`; **gitignored**) |

---

## `.github/` — Integrasi GitHub

| Path                               | Tujuan                                                            |
| ---------------------------------- | ----------------------------------------------------------------- |
| `.github/workflows/`               | Alur kerja CI/CD GitHub Actions (lint, pengujian, cakupan, rilis) |
| `.github/ISSUE_TEMPLATE/`          | Templat isu bug/fitur                                             |
| `.github/pull_request_template.md` | Templat PR                                                        |
| `.github/dependabot.yml`           | Konfigurasi pembaruan dependensi                                  |

---

## `.husky/` — Git Hooks

| File         | Tujuan                                                                            |
| ------------ | --------------------------------------------------------------------------------- |
| `pre-commit` | Menjalankan `lint-staged + check-docs-sync + check:any-budget:t11`                |
| `pre-push`   | Saat ini dinonaktifkan (dikomentari). Jalankan `npm run test:unit` secara manual. |
| `_/`         | Komponen internal Husky                                                           |

---

## `.claude/` — Perintah Slash Claude Code

| File                                                | Tujuan                                                    |
| --------------------------------------------------- | --------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — menaikkan versi + changelog otomatis |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — alur kerja rilis lengkap         |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Melakukan deployment ke VPS                               |
| `commands/capture-release-evidences-cc.md`          | Merekam fitur baru melalui browser sebagai WebP           |
| `commands/review-{prs,discussions}-cc.md`           | Melakukan triase PR/diskusi GitHub                        |
| `commands/{review-issues,implement-features}-cc.md` | Alur kerja isu                                            |
| `settings.local.json`                               | Pengaturan Claude Code per proyek                         |

---

## `.agents/` — Alur Kerja Agen Generik (Codex / Cursor / dll.)

| Path                     | Tujuan                                                     |
| ------------------------ | ---------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definisi alur kerja (cerminan dari `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definisi keterampilan dengan Catatan Eksekusi Codex      |

> **Catatan:** Alur kerja dan perintah saat ini identik byte demi byte. Jika `.agents/` dimaksudkan untuk menargetkan runtime agen yang berbeda (Codex), variannya perlu dibuat berbeda secara bermakna.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Di Luar Pohon Proyek

Direktori berawalan garis bawah ini menyimpan konten yang tidak didistribusikan:

- **`_ideia/`** — catatan desain (kategori defer / notfit / viable)
- **`_mono_repo/`** — subproyek historis (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — klon hanya-baca dari proyek OSS terkait (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, dll.) untuk referensi silang selama pengembangan
- **`_tasks/`** — file pelacakan tugas per rilis (informal)

Tidak disertakan dalam keluaran `npm pack`. Lihat `.npmignore`.

---

## Dihasilkan / Diabaikan Git

| Path                   | Tujuan                           |
| ---------------------- | -------------------------------- |
| `node_modules/`        | Dependensi npm                   |
| `.next/`               | Output build Next.js             |
| `coverage/`            | Laporan cakupan c8               |
| `logs/`                | Log runtime                      |
| `package/`             | Staging npm pack                 |
| `.playwright-mcp/`     | Artefak pengujian Playwright MCP |
| `.issues/`             | Cache issue lokal                |
| `tsconfig.tsbuildinfo` | Cache inkremental TS             |

---

## Tips navigasi

- **Kontributor baru?** Baca `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Menambahkan provider?** Ikuti `docs/architecture/ARCHITECTURE.md § Adding a New Provider` + periksa silang dengan `docs/reference/PROVIDER_REFERENCE.md`.
- **Menambahkan route?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` + `src/shared/validation/schemas.ts`.
- **Menambahkan tool MCP?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Menambahkan skill A2A?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Menjalankan secara lokal?** `docs/guides/SETUP_GUIDE.md`.
- **Melakukan deployment?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Melakukan rilis?** `docs/ops/RELEASE_CHECKLIST.md` (dan skill Claude Code `/generate-release-cc`).
