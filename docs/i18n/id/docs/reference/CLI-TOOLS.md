# CLI-TOOLS (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "Alat CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Alat CLI — OmniRoute

Terakhir diperbarui: 2026-08-18

OmniRoute terintegrasi dengan tiga kategori alat CLI yang tersebar di tiga halaman dasbor khusus:

| Halaman      | Rute                    | Konsep                                                                              | Jumlah         |
| ------------ | ----------------------- | ----------------------------------------------------------------------------------- | -------------- |
| **Kode CLI** | `/dashboard/cli-code`   | Alat pengkodean yang Anda arahkan ke OmniRoute (Klien → CLI → OmniRoute → Penyedia) | 26             |
| **Agen CLI** | `/dashboard/cli-agents` | Agen otonom yang Anda arahkan ke OmniRoute (alur yang sama, cakupan lebih luas)     | 8              |
| **Agen ACP** | `/dashboard/acp-agents` | CLI yang diluncurkan OmniRoute sebagai backend melalui stdio/ACP (alur terbalik)    | lihat registri |

Rute warisan mengalihkan melalui 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Cara Kerjanya

```
Kode CLI / Agen CLI (alur konsumsi):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (semua mengarah ke OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute mengarahkan ke penyedia yang tepat)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

Agen ACP (alur peluncuran terbalik):
    Permintaan Klien → OmniRoute → meluncurkan CLI melalui stdio/ACP → respons
```

**Manfaat:**

- Satu kunci API untuk mengelola semua alat
- Pelacakan biaya di seluruh CLI di dasbor
- Pergantian model tanpa mengonfigurasi ulang setiap alat
- Bekerja secara lokal dan di server jarak jauh (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Konfigurasi otomatis dengan `setup-*`

Anda tidak perlu menulis konfigurasi setiap alat dengan tangan. OmniRoute menyediakan perintah `setup-*`
untuk setiap CLI yang didukung yang membaca katalog model **langsung** dari OmniRoute yang berjalan
(lokal atau jarak jauh) dan menulis konfigurasi alat itu sendiri di mesin Anda:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Setiap perintah menerima `--remote <url> --api-key <key>` (mengonfigurasi alat lokal terhadap
OmniRoute jarak jauh), `--dry-run` (prabaca tanpa menulis), dan `--port`. Alat
tanpa penemuan model otomatis (Cline, Kilo, Roo, Goose, Aider, Qwen) menggunakan
`--model <id>` (dan `--yes` untuk eksekusi non-interaktif). Untuk meluncurkan CLI dengan
lingkungan yang tepat disuntikkan dan tanpa konfigurasi yang ditulis sama sekali, gunakan
peluncur generik `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — target dan alias berasal dari `bin/cli/cli-manifest.mjs`); peluncur per-alat warisan
`omniroute launch` (Claude Code) dan `omniroute launch-codex`
(Codex) tetap tersedia. CLI Gemini hanya untuk peluncuran: itu adalah target `omniroute run`
tetapi tidak memiliki resep `setup-*`/`configure`.

> **Referensi lengkap:** tabel utama — apa yang ditulis setiap perintah, setiap flag,
> lokal vs jarak jauh, dan alat mana yang memerlukan akhiran `/v1` — ada di
> **[Integrasi CLI](../guides/CLI-INTEGRATIONS.md)**.

### Menjalankan ini di dalam kontainer

Perintah `setup-*` yang dieksekusi di dalam kontainer OmniRoute menulis ke
rumah kontainer itu sendiri, yang tidak dibaca oleh CLI host dan yang menghilang bersama
kontainer. OmniRoute mendeteksi itu dan keluar dengan kode `2` dengan instruksi daripada
menulis. Dua cara yang didukung untuk melanjutkan — instal CLI di host dan
`omniroute connect` ke kontainer, atau bind-mount direktori konfigurasi dan set
`CLI_CONFIG_HOME` (profil `host` compose). Setiap perintah `setup-*`, ditambah
`omniroute configure` dan `omniroute config set`, menerima
`--allow-container-write` ketika mengonfigurasi CLI kontainer itu sendiri adalah apa yang sebenarnya Anda maksud; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` melakukan hal yang sama untuk
server. Lihat
[Panduan Docker → Mengonfigurasi alat CLI host](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

**Titik akhir apply** di dasbor (`POST /api/cli-tools/apply`) menerapkan
pengaman yang sama: di dalam kontainer, penulisan yang targetnya tidak bind-mounted dari
host menjawab **`422`** dengan `containerEphemeralTarget: true`, teks kesalahan yang aman
dan — untuk alat dengan resep host (claude, codex, opencode, cline,
kilo, continue) — sebuah `hostSetupCommand` (misalnya `omniroute setup-opencode`) untuk dijalankan
di host sebagai gantinya; tidak ada yang ditulis. `dryRun: true` tetap berfungsi dalam
mode kontainer dan mengembalikan konten yang dihasilkan + jalur target tanpa menyentuh disk, sehingga
Anda dapat prabaca dari dasbor dan menerapkan di host. Perilaku ini
sengaja dan dilindungi regresi oleh
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — jangan pernah "memperbaiki" 422
dengan menghapus pengaman.

---

## Sumber Kebenaran

Katalog terpadu berada di `src/shared/constants/cliTools.ts` sebagai `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Setiap entri memiliki bidang-bidang berikut (didefinisikan di `src/shared/schemas/cliCatalog.ts`):

| Bidang                                          | Tipe                                                         | Deskripsi                                                  |
| ----------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Halaman mana alat tersebut muncul                          |
| `vendor`                                        | `string`                                                     | Asal alat ("Anthropic", "OSS (P. Gauthier)")               |
| `acpSpawnable`                                  | `boolean`                                                    | Juga dapat digunakan sebagai ACP Agent (badge ditampilkan) |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Tingkat dukungan endpoint kustom. `"none"` = backlog MITM  |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Mekanisme konfigurasi                                      |
| `id`, `name`, `color`, `description`, `docsUrl` | standar                                                      | Bidang tampilan inti                                       |

Entri dengan `baseUrlSupport: "none"` **tidak ditampilkan** di halaman dasbor — mereka terdaftar di backlog MITM untuk rencana 11 (lihat `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Tingkatan Kapabilitas (tercatalog × terdeteksi × dapat dikonfigurasi × dapat diluncurkan)

Tidak semua alat yang tercatalog dapat terdeteksi, dapat dikonfigurasi, atau dapat diluncurkan. Setiap tingkatan memiliki satu sumber deklarasi, dan tes drift menjaga agar mereka tetap selaras:

| Tingkatan        | Arti                                                                    | Dideklarasikan di                                                 |
| ---------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Cataloged**    | Muncul di katalog dasbor (nama, vendor, dokumen, tipe konfigurasi)      | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Detectable**   | Deteksi biner/konfigurasi, pemeriksaan kesehatan, jalur konfigurasi     | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **Configurable** | Didukung oleh `omniroute configure <cli>` (resep pengaturan ada)        | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Launchable**   | Didukung oleh `omniroute run <target>` (injeksi env/args didefinisikan) | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` adalah manifest eksekusi kanonik untuk perintah CLI yang muncul: `run`, `configure` dan generator penyelesaian shell semuanya mengambil daftar target, resolusi alias (misalnya `kilocode`/`kilo-code`/`kilo_cli` → `kilo`) dan pengkabelan flag `--model` darinya. Penjaga drift `tests/unit/cli/cli-manifest-drift.test.ts` memastikan bahwa manifest, katalog runtime, katalog UI, dan setiap permukaan konsumen tetap sinkron — target yang ditambahkan ke satu permukaan tanpa yang lainnya akan gagal dalam suite alih-alih mengalir diam-diam.

## 1. Katalog Kode CLI (26 alat)

Semua alat yang muncul di `/dashboard/cli-code`. Alat yang memiliki `baseUrlSupport: none` terhubung melalui MITM atau panduan manual alih-alih URL dasar kustom:

| id           | nama                       | vendor              | baseUrlSupport | configType     | acpSpawnable |
| ------------ | -------------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code                | Anthropic           | penuh          | env            | true         |
| codex        | OpenAI Codex CLI           | OpenAI              | penuh          | kustom         | true         |
| zcode        | ZCode (Rencana Koding GLM) | Z.ai                | tidak ada      | kustom         | false        |
| cline        | Cline                      | OSS (ex-Claude Dev) | penuh          | kustom         | true         |
| kilo         | Kilo Code                  | Kilo-Org            | penuh          | kustom         | false        |
| roo          | Roo Code                   | Roo (OSS)           | penuh          | panduan        | false        |
| continue     | Continue                   | continue.dev        | penuh          | panduan        | false        |
| aider        | Aider                      | OSS (P. Gauthier)   | penuh          | panduan        | true         |
| forge        | ForgeCode                  | Antinomy HQ         | penuh          | kustom         | true         |
| jcode        | jcode                      | 1jehuang (OSS)      | penuh          | kustom         | false        |
| deepseek-tui | DeepSeek TUI               | Hunter Bown (OSS)   | penuh          | kustom         | false        |
| codewhale    | CodeWhale                  | Hmbown (OSS)        | penuh          | kustom         | false        |
| opencode     | OpenCode                   | Anomaly (ex-SST)    | penuh          | panduan        | true         |
| droid        | Factory Droid              | Factory AI          | sebagian       | panduan        | false        |
| copilot      | GitHub Copilot CLI         | GitHub/MS           | penuh          | kustom         | false        |
| cursor-cli   | Cursor CLI                 | Anysphere           | sebagian       | panduan        | true         |
| smelt        | Smelt                      | leonardcser (OSS)   | penuh          | kustom         | false        |
| pi           | Pi (agen-koding-pi)        | M. Zechner (OSS)    | penuh          | kustom         | false        |
| grok-build   | Grok Build                 | xAI                 | penuh          | kustom         | false        |
| crush        | Crush                      | OSS (Charm)         | penuh          | kustom         | false        |
| qwen         | Qwen Code                  | Alibaba             | penuh          | panduan        | true         |
| cursor       | Cursor                     | Anysphere           | tidak ada      | panduan        | false        |
| antigravity  | Antigravity                | Google              | tidak ada      | mitm           | false        |
| hermes       | Hermes                     | Nous Research       | tidak ada      | panduan        | false        |
| kiro         | Kiro AI                    | Amazon              | tidak ada      | mitm           | false        |
| custom       | Custom CLI                 | —                   | penuh          | pembuat-kustom | false        |

Alat dengan `baseUrlSupport: "partial"` menunjukkan lencana "⚠ Base URL parcial" di kartu dasbor.

## 2. Katalog Agen CLI (8 alat)

Agen otonom yang muncul di `/dashboard/cli-agents`:

| id           | nama             | vendor                   | dukunganBaseUrl | dapatDibuatACP |
| ------------ | ---------------- | ------------------------ | --------------- | -------------- |
| hermes-agent | Hermes Agent     | Nous Research            | penuh           | false          |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | penuh           | true           |
| goose        | Goose            | Block / Linux Foundation | penuh           | true           |
| interpreter  | Open Interpreter | OSS                      | penuh           | true           |
| warp         | Warp AI          | Warp Inc.                | sebagian        | true           |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | penuh           | false          |
| omp          | Oh My Pi         | OSS                      | penuh           | true           |
| letta        | Letta CLI        | Letta                    | penuh           | false          |

---

## 3. Agen ACP (/dashboard/acp-agents)

Halaman ini (yang diubah namanya dari `/dashboard/agents`) menunjukkan CLI yang dapat **dibuat** oleh OmniRoute sebagai mesin eksekusi backend melalui protokol stdio/ACP. Katalog ini dikelola secara terpisah di `src/lib/acp/registry.ts` dan **tidak** sama dengan `CLI_TOOLS`.

---

## 4. Daftar Tugas MITM (tidak ditampilkan di dashboard)

CLI berikut tidak mendukung URL dasar kustom secara native dan **tidak terdaftar** di halaman Kode CLI atau Agen CLI. Mereka adalah kandidat untuk intersepsi MITM dalam rencana 11:

| CLI                 | Alasan                                                            |
| ------------------- | ----------------------------------------------------------------- |
| windsurf            | BYOK terbatas pada model Claude tertentu + URL/token perusahaan   |
| amp                 | Ekosistem tertutup (Sourcegraph)                                  |
| amazon-q / kiro-cli | Autentikasi AWS SSO, tidak ada URL kustom                         |
| cowork              | Anthropic Desktop, tidak ada titik akhir yang dapat dikonfigurasi |

Lihat `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` untuk referensi silang lengkap.

---

## 5. API Deteksi Batch

Semua deteksi alat digabungkan melalui satu titik akhir:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (sama seperti rute `/api/cli-tools/` lainnya)
- Mengembalikan: `Record<toolId, ToolBatchStatus>` (tipe: `src/shared/types/cliBatchStatus.ts`)
- Strategi: `Promise.all` untuk semua alat, batas waktu 5 detik per alat
- Cache: LRU dalam memori yang diindeks oleh file konfigurasi `mtime`. Cache tidak valid ketika mtime berubah. Reset saat server di-restart.

Bentuk respons per alat:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // disanitasi, tanpa jejak tumpukan
}
```

## 6. Pengatur Pengaturan untuk Alat Baru

Alat baru dengan `configType: "custom"` memiliki rute API pengaturan khusus:

| Rute                                        | Alat                                                             |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Agen pemrograman Pi                                              |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + kunci `.env` khusus)        |

Semua rute menggunakan `sanitizeErrorMessage()` untuk respons kesalahan (Aturan Keras #12).

---

## 7. Arsitektur Halaman Dasbor

### Kode CLI (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — komponen server
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — grid klien
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — halaman detail alat
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 kartu alat khusus + `ToolDetailClient.tsx`

### Agen CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — komponen server
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — grid klien
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — menggunakan kembali `ToolDetailClient`

### Agen ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — komponen server (dipindahkan dari `agents/`)

### Komponen UI Bersama (`src/shared/components/cli/`)

| File                    | Tujuan                                                 |
| ----------------------- | ------------------------------------------------------ |
| `CliToolCard.tsx`       | Kartu status pintar (deteksi + konfigurasi + endpoint) |
| `CliConceptCard.tsx`    | Kartu penjelasan konsep per halaman                    |
| `CliComparisonCard.tsx` | Perbandingan tiga kolom antar jenis CLI                |
| `BaseUrlSelect.tsx`     | Dropdown endpoint (Lokal/Awan/Kustom)                  |
| `ApiKeySelect.tsx`      | Pemilih kunci API                                      |
| `ManualConfigModal.tsx` | Modal cuplikan konfigurasi yang dapat disalin          |

### Hook Bersama (`src/shared/hooks/cli/`)

| File                      | Tujuan                                                                      |
| ------------------------- | --------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Mengambil `/api/cli-tools/all-statuses`, mengelola status pemuatan/segarkan |

## 8. i18n

Namespace baru ditambahkan dalam rencana 14 F9:

| Namespace   | Tujuan                                                                              |
| ----------- | ----------------------------------------------------------------------------------- |
| `cliCommon` | String yang dibagikan (label kartu, teks konsep/perbandingan, label halaman detail) |
| `cliCode`   | String halaman CLI Code                                                             |
| `cliAgents` | String halaman CLI Agents                                                           |
| `acpAgents` | String halaman ACP Agents                                                           |

Terjemahan lengkap PT-BR dan EN disediakan. 39 lokalitas lainnya secara otomatis menggunakan EN melalui penggabungan tingkat namespace di `src/i18n/request.ts`.

---

## 9. Memulai dengan Cepat

### Langkah 1 — Dapatkan Kunci API OmniRoute

1. Buka `/dashboard/api-manager` → **Buat Kunci API**
2. Beri nama (misalnya `cli-tools`) dan pilih semua izin
3. Salin kunci tersebut — Anda akan membutuhkannya untuk setiap CLI di bawah ini

> Kunci Anda terlihat seperti: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Langkah 2 — Instal Alat CLI

Semua alat berbasis npm memerlukan Node.js 22.22.2+ atau 24.x:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (dapat diluncurkan melalui `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Berbasis Rust

# Agen pemrograman Pi
# lihat https://github.com/zechnerj/pi-coding-agent untuk instalasi

# jcode
# lihat https://github.com/1jehuang/jcode untuk instalasi
```

---

### Langkah 3 — Konfigurasi melalui Dashboard

1. Pergi ke `http://localhost:20128/dashboard/cli-code`
2. Temukan alat Anda di grid
3. Klik kartu untuk membuka halaman detail alat
4. Pilih kunci API dan URL dasar Anda
5. Klik **Terapkan Konfigurasi** atau salin cuplikan konfigurasi manual

---

### Langkah 4 — Atur Variabel Lingkungan Global

```bash
# OmniRoute Universal Endpoint
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI membaca GOOGLE_GEMINI_BASE_URL di ROOT (SDK-nya menambahkan /v1beta/... sendiri)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Untuk **server jarak jauh** ganti `localhost:20128` dengan IP atau domain server,
> misalnya `http://<your-server-ip>:20128`.

---

### Langkah 4 — Konfigurasi Setiap Alat

#### Claude Code

```bash
# Buat ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Gunakan root gateway Anthropic yang bersatu untuk Claude Code. Jangan tambahkan `/v1` di sini.

**Uji:** `claude "say hello"`

---

#### OpenAI Codex

Codex modern (v0.137+) hanya membaca `~/.codex/config.toml` — `config.yaml` lama milik CLI npm warisan dan diabaikan tanpa suara. Kunci API tetap di variabel lingkungan `OMNIROUTE_API_KEY` (`env_key`), tidak pernah di dalam file:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

Referensi lengkap (profil, `wire_api`, jendela konteks): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Uji:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**Uji:** `opencode`

> Gunakan `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> untuk mengirim varian berpikir.

---

#### Cline (CLI atau VS Code)

**Mode CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Mode VS Code:**
Pengaturan ekstensi Cline → Penyedia API: `OpenAI Compatible` → URL Dasar: `http://localhost:20128/v1`

Atau gunakan dashboard OmniRoute → **CLI Tools → Cline → Terapkan Konfigurasi**.

---

#### KiloCode (CLI atau VS Code)

**Mode CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Pengaturan VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Atau gunakan dashboard OmniRoute → **CLI Tools → KiloCode → Terapkan Konfigurasi**.

---

#### Continue (Ekstensi VS Code)

Edit `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Restart VS Code setelah mengedit.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Gunakan ini ketika VS Code Insiders dikonfigurasi untuk model endpoint kustom dan Anda ingin OmniRoute berfungsi tanpa bidang header kustom.

**Lokasi yang Disarankan:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Contoh menggunakan alias OmniRoute yang ditokenisasi:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**Catatan:**

- Ganti `sk-your-omniroute-key` dengan kunci API yang dibuat di OmniRoute.
- Bidang `url` harus mengarah ke `/api/v1/vscode/{token}/chat/completions`.
- Bidang `modelsUrl` harus mengarah ke `/api/v1/vscode/{token}/models`.
- Utamakan alur normal `/v1` + header Bearer ketika klien mendukung header kustom.
- Token yang tertanam dalam URL adalah fallback kompatibilitas dan mungkin muncul dalam log editor atau riwayat proxy.

---

#### Kiro CLI (Amazon)

```bash
# Masuk ke akun AWS/Kiro Anda:
kiro-cli login

# CLI menggunakan otentikasi sendiri — OmniRoute tidak diperlukan sebagai backend untuk Kiro CLI itu sendiri.
# Gunakan kiro-cli bersamaan dengan OmniRoute untuk alat lainnya.
kiro-cli status
```

Untuk aplikasi desktop **Kiro IDE**, gunakan endpoint MITM yang diekspos oleh OmniRoute
di bawah `/dashboard/cli-tools → Kiro`.

---

## 10. Internal OmniRoute CLI

Biner `omniroute` menyediakan perintah untuk siklus hidup server, pengaturan, diagnostik, dan manajemen penyedia. Titik masuk: `bin/omniroute.mjs`.

```bash
omniroute                              # Mulai server (port default 20128)
omniroute setup                        # Wizard pengaturan interaktif
omniroute doctor                       # Periksa konfigurasi, DB, port, runtime
omniroute providers list               # Koneksi penyedia yang dikonfigurasi
omniroute providers test-all           # Uji setiap koneksi aktif
omniroute reset-password               # Atur ulang kata sandi admin
omniroute logs                         # Streaming log permintaan
omniroute health                       # Kesehatan terperinci (pemutus, cache, memori)
omniroute --version                    # Cetak versi
omniroute --help                       # Tampilkan semua perintah
```

### Pengaturan & Inisialisasi

```bash
omniroute setup                        # Wizard pengaturan interaktif
omniroute setup --non-interactive      # Mode CI/automasi (membaca variabel env + flag)
omniroute setup --password '<value>'   # Atur kata sandi admin langsung
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Tambah dan uji penyedia dalam satu langkah
```

Variabel lingkungan yang dikenali untuk pengaturan non-interaktif:

| Var                 | Tujuan                                                                 |
| ------------------- | ---------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Kunci API penyedia (terikat ke `--api-key` melalui Commander `.env()`) |
| `DATA_DIR`          | Ganti direktori data OmniRoute                                         |

Semua input non-interaktif lainnya diteruskan sebagai flag, bukan variabel lingkungan:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(lihat opsi `omniroute setup` di atas).

### Diagnostik

```bash
omniroute doctor                       # Periksa konfigurasi, DB, port, runtime, memori, kelangsungan
omniroute doctor --json                # JSON yang dapat dibaca mesin
omniroute doctor --no-liveness         # Lewati probe kesehatan HTTP
omniroute doctor --host 0.0.0.0        # Ganti host kelangsungan
omniroute doctor --liveness-url <url>  # Ganti URL endpoint kesehatan penuh
```

Dokter menjalankan pemeriksaan ini: `Konfigurasi`, `Database`, `Penyimpanan/enkripsi`,
`Ketersediaan Port`, `Runtime Node`, `Biner asli` (better-sqlite3),
`Memori`, dan `Kelangsungan Server`. Ia keluar dengan status non-nol jika ada pemeriksaan yang `gagal`.

### Manajemen Penyedia

```bash
omniroute providers available                       # Katalog penyedia OmniRoute
omniroute providers available --search openai       # Filter katalog berdasarkan id/nama/alias/kategori
omniroute providers available --category api-key    # Filter berdasarkan kategori (api-key, oauth, gratis, ...)
omniroute providers available --json                # JSON yang dapat dibaca mesin

omniroute providers list                            # Koneksi penyedia yang dikonfigurasi
omniroute providers list --json

omniroute providers test <id|name>                  # Uji satu koneksi yang dikonfigurasi
omniroute providers test-all                        # Uji setiap koneksi aktif
omniroute providers validate                        # Validasi struktural hanya lokal
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Alur OAuth yang ada
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` adalah API-first dan oleh karena itu bekerja terhadap
konteks lokal atau jarak jauh yang aktif. Input kredensial harus menggunakan
`--credential-stdin` atau `--credential-env`; `--dry-run --json` hanya melaporkan
keberadaan/bentuk yang disunting. `providers available` membaca katalog OmniRoute;
`providers list/test/test-all/validate` mempertahankan perilaku SQLite lokal mereka dan
tidak memerlukan server untuk berjalan.

### Pemulihan & Atur Ulang

```bash
omniroute reset-password                # Atur ulang kata sandi admin (juga: omniroute-reset-password)
omniroute reset-encrypted-columns       # Tampilkan peringatan + dry-run untuk atur ulang kredensial terenkripsi
omniroute reset-encrypted-columns --force  # Benar-benar menghapus kredensial terenkripsi di SQLite
```

### Ekspor Kredensial (⚠ tangani dengan hati-hati)

```bash
omniroute auth export                                 # Tampilkan peringatan + gerbang konfirmasi — tidak ada akses DB
omniroute auth export --force                          # Ekspor SEMUA kredensial DECRYPTED koneksi ke stdout sebagai JSON
omniroute auth export --force --id <id>                 # Ekspor hanya koneksi yang cocok
omniroute auth export --force --format env               # Emit OMNIROUTE_<PROVIDER>_<FIELD>=<value> baris
omniroute auth export --force --out creds.json           # Tulis ke file (dibuat dengan izin 0600)
```

`auth export` adalah **hanya lokal** (baca SQLite langsung, tidak ada rute HTTP) dan dengan sengaja mencetak/menulis
nilai **plaintext** `apiKey`/`accessToken`/`refreshToken`/`idToken` — itu adalah fitur, bukan
bug. Tidak ada yang dibaca dari database, dan tidak ada yang didekripsi, tanpa `--force`. Sebuah banner peringatan stderr
selalu dicetak sebelum ada plaintext yang dikeluarkan. Memerlukan `STORAGE_ENCRYPTION_KEY` untuk
diatur. Sebuah field yang gagal untuk didekripsi (kunci kadaluarsa, ciphertext rusak) dilaporkan sebagai
`<field>DecryptFailed: true` alih-alih menghentikan seluruh ekspor atau membocorkan kesalahan yang mendasarinya.

### Subperintah Lainnya

Ini mengasumsikan server OmniRoute yang berjalan, kecuali dinyatakan sebaliknya:

```bash
omniroute status                       # Status runtime yang komprehensif
omniroute logs                         # Streaming log permintaan (--json, --search, --follow)
omniroute config show                  # Tampilkan konfigurasi saat ini

omniroute provider list                # Daftar penyedia yang tersedia (alias dari providers list)
omniroute provider add                 # Daftarkan OmniRoute sebagai penyedia di alat
omniroute keys add | list | remove     # Kelola kunci API
omniroute models [provider]            # Daftar model (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Snapshot konfigurasi + DB
omniroute restore                      # Pulihkan dari snapshot sebelumnya

omniroute health                       # Kesehatan terperinci (pemutus, cache, memori)
omniroute quota                        # Penggunaan kuota penyedia
omniroute cache                        # Status cache
omniroute cache clear                  # Hapus cache semantik + tanda tangan

omniroute mcp status | restart         # Status server MCP / restart
omniroute a2a status | card            # Status server A2A / kartu agen

omniroute tunnel list | create | stop  # Kelola terowongan (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Periksa / atur variabel env (sementara)

omniroute test                         # Uji konektivitas penyedia
omniroute update                       # Periksa pembaruan
omniroute completion                   # Hasilkan penyelesaian shell
```

### Flag Umum

| Flag                | Deskripsi                                                     |
| ------------------- | ------------------------------------------------------------- |
| `--no-open`         | Jangan otomatis membuka browser saat mulai                    |
| `--port <n>`        | Ganti port API (default 20128)                                |
| `--mcp`             | Jalankan sebagai server MCP melalui stdio (untuk IDE)         |
| `--non-interactive` | Mode CI (tanpa prompt; membaca dari env/flags)                |
| `--json`            | Output JSON yang dapat dibaca mesin (doctor, providers, dll.) |
| `--help`, `-h`      | Tampilkan bantuan spesifik perintah                           |
| `--version`, `-v`   | Cetak versi yang terinstal                                    |

## Endpoint API yang Tersedia

| Endpoint                   | Deskripsi                        | Digunakan Untuk                      |
| -------------------------- | -------------------------------- | ------------------------------------ |
| `/v1/chat/completions`     | Obrolan standar (semua penyedia) | Semua alat modern                    |
| `/v1/responses`            | API Respons (format OpenAI)      | Codex, alur kerja agentik            |
| `/v1/completions`          | Penyelesaian teks warisan        | Alat lama yang menggunakan `prompt:` |
| `/v1/embeddings`           | Embedding teks                   | RAG, pencarian                       |
| `/v1/images/generations`   | Generasi gambar                  | GPT-Image, Flux, dll.                |
| `/v1/audio/speech`         | Teks-ke-suara                    | ElevenLabs, OpenAI TTS               |
| `/v1/audio/transcriptions` | Suara-ke-teks                    | Deepgram, AssemblyAI                 |

Contoh siap-tempel dengan URL OmniRoute yang ter-tokenisasi:

```txt
Token contoh: sk-a3ab3c080beaee3a-69f4a4-070d71af

Basis OpenAI standar: http://localhost:20128/v1
Model VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Obrolan VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Respons VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Tag Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Obrolan Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Pemecahan Masalah

| Kesalahan                                              | Penyebab                          | Perbaikan                                                  |
| ------------------------------------------------------ | --------------------------------- | ---------------------------------------------------------- |
| `Connection refused`                                   | OmniRoute tidak berjalan          | `omniroute serve`                                          |
| `401 Unauthorized`                                     | Kunci API salah                   | Periksa di `/dashboard/api-manager`                        |
| `No combo configured`                                  | Tidak ada kombinasi routing aktif | Siapkan di `/dashboard/combos`                             |
| CLI menunjukkan "not installed"                        | Biner tidak ada di PATH           | Periksa `which <command>`                                  |
| Dashboard menunjukkan "not detected" setelah instalasi | Cache usang                       | Klik "⟳ Refresh detection" di dashboard                    |
| Tautan lama `/dashboard/cli-tools`                     | Bookmark pra-v3.8.6               | Dialihkan secara otomatis ke `/dashboard/cli-code` (308)   |
| Tautan lama `/dashboard/agents`                        | Bookmark pra-v3.8.6               | Dialihkan secara otomatis ke `/dashboard/acp-agents` (308) |
