# CLI-TOOLS (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "Alat CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Alat CLI — OmniRoute

Dikemas kini terakhir: 2026-08-18

OmniRoute mengintegrasikan dengan tiga kategori alat CLI yang tersebar di tiga halaman papan pemuka khusus:

| Halaman      | Laluan                  | Konsep                                                                                 | Bilangan          |
| ------------ | ----------------------- | -------------------------------------------------------------------------------------- | ----------------- |
| **Kod CLI**  | `/dashboard/cli-code`   | Alat pengkodan yang anda arahkan ke OmniRoute (Pelanggan → CLI → OmniRoute → Penyedia) | 26                |
| **Ejen CLI** | `/dashboard/cli-agents` | Ejen autonomi yang anda arahkan ke OmniRoute (aliran yang sama, skop yang lebih luas)  | 8                 |
| **Ejen ACP** | `/dashboard/acp-agents` | CLI yang OmniRoute hasilkan sebagai backend melalui stdio/ACP (aliran terbalik)        | lihat pendaftaran |

Laluan legasi mengalihkan melalui 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Cara Ia Berfungsi

```
Kod CLI / Ejen CLI (aliran penggunaan):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (semua mengarah ke OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute mengarahkan ke penyedia yang betul)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

Ejen ACP (aliran hasil terbalik):
    Permintaan pelanggan → OmniRoute → hasilkan CLI melalui stdio/ACP → respons
```

**Manfaat:**

- Satu kunci API untuk mengurus semua alat
- Penjejakan kos merentasi semua CLI dalam papan pemuka
- Penukaran model tanpa mengkonfigurasi semula setiap alat
- Berfungsi secara tempatan dan di pelayan jauh (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Auto-konfigurasi dengan `setup-*`

Anda tidak perlu menulis konfigurasi setiap alat dengan tangan. OmniRoute menyediakan perintah `setup-*`
untuk setiap CLI yang disokong yang membaca katalog model **langsung** dari OmniRoute yang sedang berjalan
(tempatan atau jauh) dan menulis konfigurasi alat itu sendiri di mesin anda:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Setiap satu menerima `--remote <url> --api-key <key>` (mengkonfigurasi alat tempatan terhadap
OmniRoute jauh), `--dry-run` (pratonton tanpa menulis), dan `--port`. Alat
tanpa penemuan model automatik (Cline, Kilo, Roo, Goose, Aider, Qwen) mengambil
`--model <id>` (dan `--yes` untuk larian bukan interaktif). Untuk melancarkan CLI dengan
persekitaran yang betul disuntik dan tanpa konfigurasi ditulis sama sekali, gunakan
pelancar generik `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — sasaran dan alias datang dari `bin/cli/cli-manifest.mjs`); pelancar per-alat legasi
`omniroute launch` (Claude Code) dan `omniroute launch-codex`
(Codex) masih tersedia. CLI Gemini hanya untuk pelancaran: ia adalah sasaran `omniroute run`
tetapi tidak mempunyai resipi `setup-*`/`configure`.

> **Rujukan penuh:** jadual induk — apa yang ditulis oleh setiap perintah, setiap bendera,
> tempatan vs jauh, dan alat mana yang memerlukan akhiran `/v1` — terdapat dalam
> **[Integrasi CLI](../guides/CLI-INTEGRATIONS.md)**.

### Menjalankan ini di dalam kontena

Perintah `setup-*` yang dilaksanakan di dalam kontena OmniRoute menulis ke
rumah kontena itu sendiri, yang tidak dibaca oleh CLI host dan yang hilang dengan
kontena. OmniRoute mengesan itu dan keluar `2` dengan arahan daripada menulis. Dua cara yang disokong untuk maju — pasang CLI di host dan
`omniroute connect` ke kontena, atau bind-mount direktori konfigurasi dan set
`CLI_CONFIG_HOME` (profil `host` compose). Setiap perintah `setup-*`, ditambah
`omniroute configure` dan `omniroute config set`, menerima
`--allow-container-write` apabila mengkonfigurasi CLI kontena itu sendiri adalah apa yang anda
sebenarnya maksudkan; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` melakukan perkara yang sama untuk
pelayan. Lihat
[Panduan Docker → Mengkonfigurasi alat CLI host](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

Titik akhir **apply** papan pemuka (`POST /api/cli-tools/apply`) menguatkuasakan
pengawal yang sama: dalam kontena, penulisan yang sasarannya tidak bind-mounted dari
host menjawab **`422`** dengan `containerEphemeralTarget: true`, teks ralat selamat dan — untuk alat dengan resipi host (claude, codex, opencode, cline,
kilo, continue) — satu `hostSetupCommand` (contohnya `omniroute setup-opencode`) untuk dijalankan
di host sebaliknya; tiada apa yang ditulis. `dryRun: true` terus berfungsi dalam mod kontena
dan mengembalikan kandungan yang dihasilkan + laluan sasaran tanpa menyentuh cakera, jadi
anda boleh pratonton dari papan pemuka dan memohon di host. Tingkah laku ini adalah
sengaja dan dilindungi regresi oleh
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — jangan sekali-kali "baiki" 422
dengan mengeluarkan pengawal.

---

## Sumber Kebenaran

Katalog yang disatukan terletak di `src/shared/constants/cliTools.ts` sebagai `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Setiap entri mempunyai medan ini (ditakrifkan dalam `src/shared/schemas/cliCatalog.ts`):

| Medan                                           | Jenis                                                        | Penerangan                                                   |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `category`                                      | `"code" \| "agent"`                                          | Halaman mana alat itu muncul                                 |
| `vendor`                                        | `string`                                                     | Asal alat ("Anthropic", "OSS (P. Gauthier)")                 |
| `acpSpawnable`                                  | `boolean`                                                    | Juga boleh digunakan sebagai ACP Agent (lencana ditunjukkan) |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Tahap sokongan titik akhir khusus. `"none"` = backlog MITM   |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Mekanisme konfigurasi                                        |
| `id`, `name`, `color`, `description`, `docsUrl` | standard                                                     | Medan paparan teras                                          |

Entri dengan `baseUrlSupport: "none"` **tidak ditunjukkan** dalam halaman papan pemuka — mereka didaftarkan dalam backlog MITM untuk pelan 11 (lihat `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Tahap Keupayaan (dikatalog × dapat dikesan × boleh dikonfigurasi × boleh dilancarkan)

Tidak semua alat yang dikatalog boleh dikesan, boleh dikonfigurasi atau boleh dilancarkan. Setiap tahap mempunyai satu sumber pengisytiharan, dan ujian drift memastikan mereka selari:

| Tahap                   | Maksud                                                                       | Diisytiharkan dalam                                               |
| ----------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Dikatalog**           | Muncul dalam katalog papan pemuka (nama, vendor, dokumen, jenis konfigurasi) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Dapat Dikesan**       | Pengesanan binari/config, pemeriksaan kesihatan, laluan konfigurasi          | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` katalog runtime) |
| **Boleh Dikonfigurasi** | Disokong oleh `omniroute configure <cli>` (resipi penyediaan wujud)          | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Boleh Dilancarkan**   | Disokong oleh `omniroute run <target>` (injeksi env/args ditakrifkan)        | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` adalah manifest boleh laku kanonik untuk permukaan arahan CLI: `run`, `configure` dan penjana penyelesaian shell semuanya memperoleh senarai sasaran mereka, penyelesaian alias (contohnya `kilocode`/`kilo-code`/`kilo_cli` → `kilo`) dan pengkabelan bendera `--model` daripadanya. Pengawal drift `tests/unit/cli/cli-manifest-drift.test.ts` mengesahkan bahawa manifest, katalog runtime, katalog UI dan setiap permukaan pengguna kekal seiring — sasaran yang ditambah kepada satu permukaan tanpa yang lain akan gagal suite dan bukannya mengalir secara senyap.

## 1. Katalog Kod CLI (26 alat)

Semua alat yang muncul dalam `/dashboard/cli-code`. Alat yang mempunyai `baseUrlSupport: none` disambungkan melalui MITM atau panduan manual dan bukannya URL asas khusus:

| id           | nama                        | vendor                       | baseUrlSupport | configType     | acpSpawnable |
| ------------ | --------------------------- | ---------------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code                 | Anthropic                    | penuh          | env            | true         |
| codex        | OpenAI Codex CLI            | OpenAI                       | penuh          | custom         | true         |
| zcode        | ZCode (Pelan Pengkodan GLM) | Z.ai                         | tiada          | custom         | false        |
| cline        | Cline                       | OSS (bekas-Pembangun Claude) | penuh          | custom         | true         |
| kilo         | Kilo Code                   | Kilo-Org                     | penuh          | custom         | false        |
| roo          | Roo Code                    | Roo (OSS)                    | penuh          | panduan        | false        |
| continue     | Continue                    | continue.dev                 | penuh          | panduan        | false        |
| aider        | Aider                       | OSS (P. Gauthier)            | penuh          | panduan        | true         |
| forge        | ForgeCode                   | Antinomy HQ                  | penuh          | custom         | true         |
| jcode        | jcode                       | 1jehuang (OSS)               | penuh          | custom         | false        |
| deepseek-tui | DeepSeek TUI                | Hunter Bown (OSS)            | penuh          | custom         | false        |
| codewhale    | CodeWhale                   | Hmbown (OSS)                 | penuh          | custom         | false        |
| opencode     | OpenCode                    | Anomaly (bekas-SST)          | penuh          | panduan        | true         |
| droid        | Factory Droid               | Factory AI                   | separa         | panduan        | false        |
| copilot      | GitHub Copilot CLI          | GitHub/MS                    | penuh          | custom         | false        |
| cursor-cli   | Cursor CLI                  | Anysphere                    | separa         | panduan        | true         |
| smelt        | Smelt                       | leonardcser (OSS)            | penuh          | custom         | false        |
| pi           | Pi (agen-pengkodan-pi)      | M. Zechner (OSS)             | penuh          | custom         | false        |
| grok-build   | Grok Build                  | xAI                          | penuh          | custom         | false        |
| crush        | Crush                       | OSS (Charm)                  | penuh          | custom         | false        |
| qwen         | Qwen Code                   | Alibaba                      | penuh          | panduan        | true         |
| cursor       | Cursor                      | Anysphere                    | tiada          | panduan        | false        |
| antigravity  | Antigravity                 | Google                       | tiada          | mitm           | false        |
| hermes       | Hermes                      | Nous Research                | tiada          | panduan        | false        |
| kiro         | Kiro AI                     | Amazon                       | tiada          | mitm           | false        |
| custom       | Custom CLI                  | —                            | penuh          | pembina-khusus | false        |

Alat dengan `baseUrlSupport: "separa"` menunjukkan lencana "⚠ URL asas separa" dalam kad papan pemuka.

## 2. Katalog Ejen CLI (8 alat)

Ejen autonomi yang muncul di `/dashboard/cli-agents`:

| id           | nama                | vendor                   | sokonganBaseUrl | acpSpawnable |
| ------------ | ------------------- | ------------------------ | --------------- | ------------ |
| hermes-agent | Ejen Hermes         | Nous Research            | penuh           | false        |
| openclaw     | OpenClaw            | OSS (P. Steinberger)     | penuh           | true         |
| goose        | Goose               | Block / Linux Foundation | penuh           | true         |
| interpreter  | Penterjemah Terbuka | OSS                      | penuh           | true         |
| warp         | Warp AI             | Warp Inc.                | separa          | true         |
| agent-deck   | Dek Ejen            | asheshgoplani (OSS)      | penuh           | false        |
| omp          | Oh My Pi            | OSS                      | penuh           | true         |
| letta        | Letta CLI           | Letta                    | penuh           | false        |

---

## 3. Ejen ACP (/dashboard/acp-agents)

Halaman ini (dikenali semula dari `/dashboard/agents`) menunjukkan CLI yang boleh **dihasilkan** oleh OmniRoute sebagai enjin pelaksanaan backend melalui protokol stdio/ACP. Katalog ini diselenggara secara berasingan dalam `src/lib/acp/registry.ts` dan **tidak** sama dengan `CLI_TOOLS`.

---

## 4. Senarai Tunggakan MITM (tidak ditunjukkan dalam papan pemuka)

CLI berikut tidak menyokong URL asas khusus secara asli dan **tidak disenaraikan** dalam halaman Kod CLI atau Ejen CLI. Mereka adalah calon untuk pemintasan MITM dalam pelan 11:

| CLI                 | Sebab                                                         |
| ------------------- | ------------------------------------------------------------- |
| windsurf            | BYOK terhad kepada model Claude terpilih + URL/token korporat |
| amp                 | Ekosistem tertutup (Sourcegraph)                              |
| amazon-q / kiro-cli | Pengesahan AWS SSO, tiada URL khusus                          |
| cowork              | Anthropic Desktop, tiada titik akhir yang boleh dikonfigurasi |

Lihat `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` untuk rujukan silang penuh.

---

## 5. API Pengesanan Batch

Semua pengesanan alat digabungkan melalui satu titik akhir:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (sama seperti laluan `/api/cli-tools/` yang lain)
- Mengembalikan: `Record<toolId, ToolBatchStatus>` (jenis: `src/shared/types/cliBatchStatus.ts`)
- Strategi: `Promise.all` ke atas semua alat, masa tamat 5s bagi setiap alat
- Cache: dalam memori LRU yang diindeks oleh fail konfigurasi `mtime`. Cache tidak sah apabila mtime berubah. Direset semasa pelayan dimulakan semula.

Bentuk respons bagi setiap alat:

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
  error?: string; // disanitasi, tiada jejak tumpukan
}
```

## 6. Pengendali Tetapan untuk Alat Baru

Alat baru dengan `configType: "custom"` mempunyai laluan API tetapan khusus:

| Laluan                                      | Alat                                                           |
| ------------------------------------------- | -------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                        |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                        |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legasi)                         |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, utama + legasi `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                          |
| `POST /api/cli-tools/pi-settings`           | Ejen pengkodan Pi                                              |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)          |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + kunci `.env` khusus)      |

Semua laluan menggunakan `sanitizeErrorMessage()` untuk respons ralat (Peraturan Ketat #12).

---

## 7. Seni Bina Halaman Papan Pemuka

### Kod CLI (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — komponen pelayan
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — grid klien
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — halaman butiran alat
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 kad alat khusus + `ToolDetailClient.tsx`

### Ejen CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — komponen pelayan
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — grid klien
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — menggunakan semula `ToolDetailClient`

### Ejen ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — komponen pelayan (dipindahkan dari `agents/`)

### Komponen UI Bersama (`src/shared/components/cli/`)

| Fail                    | Tujuan                                                     |
| ----------------------- | ---------------------------------------------------------- |
| `CliToolCard.tsx`       | Kad status pintar (pengesanan + konfigurasi + titik akhir) |
| `CliConceptCard.tsx`    | Kad penjelasan konsep per-halaman                          |
| `CliComparisonCard.tsx` | Perbandingan tiga lajur merentasi jenis CLI                |
| `BaseUrlSelect.tsx`     | Dropdown titik akhir (Tempatan/Awan/Khusus)                |
| `ApiKeySelect.tsx`      | Pemilih kunci API                                          |
| `ManualConfigModal.tsx` | Modal petikan konfigurasi yang boleh disalin               |

### Hook Bersama (`src/shared/hooks/cli/`)

| Fail                      | Tujuan                                                                         |
| ------------------------- | ------------------------------------------------------------------------------ |
| `useToolBatchStatuses.ts` | Mengambil `/api/cli-tools/all-statuses`, menguruskan keadaan pemuatan/segarkan |

## 8. i18n

Namespace baru ditambahkan dalam pelan 14 F9:

| Namespace   | Tujuan                                                                              |
| ----------- | ----------------------------------------------------------------------------------- |
| `cliCommon` | Rentetan yang dikongsi (label kad, teks konsep/perbandingan, label halaman butiran) |
| `cliCode`   | Rentetan halaman Kod CLI                                                            |
| `cliAgents` | Rentetan halaman Ejen CLI                                                           |
| `acpAgents` | Rentetan halaman Ejen ACP                                                           |

Terjemahan penuh PT-BR dan EN disediakan. 39 lokasi lain secara automatik menggunakan EN melalui penggabungan peringkat namespace dalam `src/i18n/request.ts`.

---

## 9. Permulaan Pantas

### Langkah 1 — Dapatkan Kunci API OmniRoute

1. Buka `/dashboard/api-manager` → **Buat Kunci API**
2. Berikan nama (contohnya `cli-tools`) dan pilih semua kebenaran
3. Salin kunci tersebut — anda akan memerlukannya untuk setiap CLI di bawah

> Kunci anda kelihatan seperti: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Langkah 2 — Pasang Alat CLI

Semua alat berasaskan npm memerlukan Node.js 22.22.2+ atau 24.x:

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

# Google Gemini CLI (boleh dilancarkan melalui `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Berasaskan Rust

# Ejen pengkodan Pi
# lihat https://github.com/zechnerj/pi-coding-agent untuk pemasangan

# jcode
# lihat https://github.com/1jehuang/jcode untuk pemasangan
```

---

### Langkah 3 — Konfigurasi melalui Dashboard

1. Pergi ke `http://localhost:20128/dashboard/cli-code`
2. Cari alat anda dalam grid
3. Klik kad untuk membuka halaman butiran alat
4. Pilih kunci API dan URL asas anda
5. Klik **Terapkan Konfigurasi** atau salin petikan konfigurasi manual

---

### Langkah 4 — Tetapkan Pembolehubah Persekitaran Global

```bash
# Titik Akhir Universal OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI membaca GOOGLE_GEMINI_BASE_URL di ROOT (SDKnya menambah /v1beta/... sendiri)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Untuk **pelayan jauh** ganti `localhost:20128` dengan IP pelayan atau domain,
> contohnya `http://<your-server-ip>:20128`.

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

Gunakan akar gerbang Anthropic yang bersatu untuk Claude Code. Jangan tambah `/v1` di sini.

**Uji:** `claude "say hello"`

---

#### OpenAI Codex

Codex moden (v0.137+) hanya membaca `~/.codex/config.toml` — `config.yaml` lama milik CLI npm warisan dan diabaikan secara senyap. Kunci API kekal dalam pembolehubah persekitaran `OMNIROUTE_API_KEY` (`env_key`), tidak pernah di dalam fail:

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

Rujukan penuh (profil, `wire_api`, tingkap konteks): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

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
> untuk menghantar varian pemikiran.

---

#### Cline (CLI atau VS Code)

**Mod CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Mod VS Code:**
Tetapan sambungan Cline → Penyedia API: `OpenAI Compatible` → URL Asas: `http://localhost:20128/v1`

Atau gunakan dashboard OmniRoute → **Alat CLI → Cline → Terapkan Konfigurasi**.

---

#### KiloCode (CLI atau VS Code)

**Mod CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Tetapan VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Atau gunakan dashboard OmniRoute → **Alat CLI → KiloCode → Terapkan Konfigurasi**.

---

#### Continue (Panjang VS Code)

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

Mulakan semula VS Code selepas mengedit.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Gunakan ini apabila VS Code Insiders dikonfigurasi untuk model titik akhir khusus dan anda mahu OmniRoute berfungsi tanpa medan header khusus.

**Lokasi yang disyorkan:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Contoh menggunakan alias OmniRoute yang ditokenkan:**

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

**Nota:**

- Gantikan `sk-your-omniroute-key` dengan kunci API yang dibuat dalam OmniRoute.
- Medan `url` harus menunjuk kepada `/api/v1/vscode/{token}/chat/completions`.
- Medan `modelsUrl` harus menunjuk kepada `/api/v1/vscode/{token}/models`.
- Utamakan aliran `/v1` biasa + header Bearer apabila klien menyokong header khusus.
- Token yang disematkan dalam URL adalah fallback keserasian dan mungkin muncul dalam log editor atau sejarah proksi.

---

#### Kiro CLI (Amazon)

```bash
# Log masuk ke akaun AWS/Kiro anda:
kiro-cli login

# CLI menggunakan pengesahan sendiri — OmniRoute tidak diperlukan sebagai backend untuk Kiro CLI itu sendiri.
# Gunakan kiro-cli bersama OmniRoute untuk alat lain.
kiro-cli status
```

Untuk aplikasi desktop **Kiro IDE**, gunakan titik akhir MITM yang didedahkan oleh OmniRoute
di bawah `/dashboard/cli-tools → Kiro`.

---

## 10. OmniRoute CLI Dalaman

Biner `omniroute` menyediakan perintah untuk kitaran hayat pelayan, penyediaan, diagnostik, dan pengurusan penyedia. Titik masuk: `bin/omniroute.mjs`.

```bash
omniroute                              # Mula pelayan (port lalai 20128)
omniroute setup                        # Wizard penyediaan interaktif
omniroute doctor                       # Semak konfigurasi, DB, port, masa berjalan
omniroute providers list               # Sambungan penyedia yang dikonfigurasikan
omniroute providers test-all           # Uji setiap sambungan aktif
omniroute reset-password               # Tetapkan semula kata laluan admin
omniroute logs                         # Aliran log permintaan
omniroute health                       # Kesihatan terperinci (pemutus, cache, memori)
omniroute --version                    # Cetak versi
omniroute --help                       # Tunjukkan semua perintah
```

### Penyediaan & Inisialisasi

```bash
omniroute setup                        # Wizard penyediaan interaktif
omniroute setup --non-interactive      # Mod CI/automasi (membaca pembolehubah env + bendera)
omniroute setup --password '<value>'   # Tetapkan kata laluan admin secara langsung
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Tambah dan uji penyedia dalam satu langkah
```

Pembolehubah persekitaran yang diiktiraf untuk penyediaan bukan interaktif:

| Var                 | Tujuan                                                                     |
| ------------------- | -------------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Kunci API penyedia (terikat kepada `--api-key` melalui Commander `.env()`) |
| `DATA_DIR`          | Gantikan direktori data OmniRoute                                          |

Semua input bukan interaktif yang lain dihantar sebagai bendera, bukan pembolehubah persekitaran:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(rujuk pilihan `omniroute setup` di atas).

### Diagnostik

```bash
omniroute doctor                       # Semak konfigurasi, DB, port, masa berjalan, memori, kelangsungan
omniroute doctor --json                # JSON yang boleh dibaca mesin
omniroute doctor --no-liveness         # Langkau probe kesihatan HTTP
omniroute doctor --host 0.0.0.0        # Gantikan hos kelangsungan
omniroute doctor --liveness-url <url>  # Gantikan URL titik akhir kesihatan penuh
```

Doktor menjalankan pemeriksaan ini: `Konfigurasi`, `Pangkalan Data`, `Penyimpanan/enkripsi`,
`Ketersediaan Port`, `Masa Berjalan Node`, `Biner Asli` (better-sqlite3),
`Memori`, dan `Kelangsungan Pelayan`. Ia keluar dengan nilai bukan sifar jika mana-mana pemeriksaan adalah `gagal`.

### Pengurusan Penyedia

```bash
omniroute providers available                       # Katalog penyedia OmniRoute
omniroute providers available --search openai       # Penapis katalog mengikut id/nama/alias/kategori
omniroute providers available --category api-key    # Penapis mengikut kategori (api-key, oauth, percuma, ...)
omniroute providers available --json                # JSON yang boleh dibaca mesin

omniroute providers list                            # Sambungan penyedia yang dikonfigurasikan
omniroute providers list --json

omniroute providers test <id|name>                  # Uji satu sambungan yang dikonfigurasikan
omniroute providers test-all                        # Uji setiap sambungan aktif
omniroute providers validate                        # Pengesahan struktur hanya untuk tempatan
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Aliran OAuth yang sedia ada
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` adalah API-first dan oleh itu berfungsi terhadap
konteks tempatan atau jauh yang aktif. Input kelayakan harus menggunakan
`--credential-stdin` atau `--credential-env`; `--dry-run --json` hanya melaporkan
kehadiran/bentuk yang disunting. `providers available` membaca katalog OmniRoute;
`providers list/test/test-all/validate` mengekalkan tingkah laku SQLite tempatan mereka dan
tidak memerlukan pelayan untuk berjalan.

### Pemulihan & Tetapan Semula

```bash
omniroute reset-password                # Tetapkan semula kata laluan admin (juga: omniroute-reset-password)
omniroute reset-encrypted-columns       # Tunjukkan amaran + dry-run untuk tetapan semula kelayakan yang dienkripsi
omniroute reset-encrypted-columns --force  # Betul-betul kosongkan kelayakan yang dienkripsi dalam SQLite
```

### Eksport Kelayakan (⚠ tangani dengan berhati-hati)

```bash
omniroute auth export                                 # Tunjukkan amaran + pintu pengesahan — tiada akses DB
omniroute auth export --force                          # Eksport SEMUA kelayakan DECRYPTED sambungan ke stdout sebagai JSON
omniroute auth export --force --id <id>                 # Eksport hanya sambungan yang sepadan
omniroute auth export --force --format env               # Emit OMNIROUTE_<PROVIDER>_<FIELD>=<value> baris
omniroute auth export --force --out creds.json           # Tulis ke fail (dicipta dengan kebenaran 0600)
```

`auth export` adalah **hanya untuk tempatan** (bacaan SQLite langsung, tiada laluan HTTP) dan sengaja mencetak/menulis
nilai **plaintext** `apiKey`/`accessToken`/`refreshToken`/`idToken` — itu adalah ciri, bukan
bug. Tiada apa yang dibaca dari pangkalan data, dan tiada apa yang didekripsi, tanpa `--force`. Amaran stderr
papan tanda sentiasa dicetak sebelum sebarang plaintext dikeluarkan. Memerlukan `STORAGE_ENCRYPTION_KEY` untuk
ditetapkan. Sebuah medan yang gagal untuk didekripsi (kunci lapuk, ciphertext rosak) dilaporkan sebagai
`<field>DecryptFailed: true` dan bukannya membatalkan keseluruhan eksport atau membocorkan ralat yang mendasari.

### Subperintah Lain

Ini menganggap pelayan OmniRoute sedang berjalan, kecuali dinyatakan sebaliknya:

```bash
omniroute status                       # Status masa berjalan yang komprehensif
omniroute logs                         # Aliran log permintaan (--json, --search, --follow)
omniroute config show                  # Paparkan konfigurasi semasa

omniroute provider list                # Senaraikan penyedia yang tersedia (alias bagi providers list)
omniroute provider add                 # Daftar OmniRoute sebagai penyedia pada alat
omniroute keys add | list | remove     # Urus kunci API
omniroute models [provider]            # Senaraikan model (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Snapshot konfigurasi + DB
omniroute restore                      # Pulihkan dari snapshot sebelumnya

omniroute health                       # Kesihatan terperinci (pemutus, cache, memori)
omniroute quota                        # Penggunaan kuota penyedia
omniroute cache                        # Status cache
omniroute cache clear                  # Kosongkan cache semantik + tanda tangan

omniroute mcp status | restart         # Status pelayan MCP / mulakan semula
omniroute a2a status | card            # Status pelayan A2A / kad ejen

omniroute tunnel list | create | stop  # Urus terowong (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Periksa / tetapkan pembolehubah env (sementara)

omniroute test                         # Ujian sambungan penyedia
omniroute update                       # Semak untuk kemas kini
omniroute completion                   # Hasilkan penyelesaian shell
```

### Bendera Umum

| Bendera             | Penerangan                                                   |
| ------------------- | ------------------------------------------------------------ |
| `--no-open`         | Jangan buka pelayar secara automatik semasa mula             |
| `--port <n>`        | Gantikan port API (lalai 20128)                              |
| `--mcp`             | Jalankan sebagai pelayan MCP melalui stdio (untuk IDE)       |
| `--non-interactive` | Mod CI (tiada prompt; membaca dari env/bendera)              |
| `--json`            | Output JSON yang boleh dibaca mesin (doktor, penyedia, dll.) |
| `--help`, `-h`      | Tunjukkan bantuan khusus perintah                            |
| `--version`, `-v`   | Cetak versi yang dipasang                                    |

---

## Titik Akhir API Tersedia

| Titik Akhir                | Penerangan                        | Digunakan Untuk                 |
| -------------------------- | --------------------------------- | ------------------------------- |
| `/v1/chat/completions`     | Sembang standard (semua penyedia) | Semua alat moden                |
| `/v1/responses`            | API Respons (format OpenAI)       | Codex, aliran agentik           |
| `/v1/completions`          | Penyelesaian teks legasi          | Alat lama menggunakan `prompt:` |
| `/v1/embeddings`           | Penyisipan teks                   | RAG, carian                     |
| `/v1/images/generations`   | Penjanaan imej                    | GPT-Image, Flux, dll.           |
| `/v1/audio/speech`         | Teks-ke-ucapan                    | ElevenLabs, OpenAI TTS          |
| `/v1/audio/transcriptions` | Ucapan-ke-teks                    | Deepgram, AssemblyAI            |

Contoh sedia untuk tampal dengan URL OmniRoute yang ditokenkan:

```txt
Contoh token: sk-a3ab3c080beaee3a-69f4a4-070d71af

Asas OpenAI standard: http://localhost:20128/v1
Model VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Sembang VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Respons VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Tag Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Sembang Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Penyelesaian Masalah

| Ralat                                                   | Punca                         | Pembetulan                                       |
| ------------------------------------------------------- | ----------------------------- | ------------------------------------------------ |
| `Connection refused`                                    | OmniRoute tidak berjalan      | `omniroute serve`                                |
| `401 Unauthorized`                                      | Kunci API salah               | Semak di `/dashboard/api-manager`                |
| `No combo configured`                                   | Tiada kombinasi routing aktif | Tetapkan di `/dashboard/combos`                  |
| CLI menunjukkan "not installed"                         | Binari tidak dalam PATH       | Semak `which <command>`                          |
| Dashboard menunjukkan "not detected" selepas pemasangan | Cache tidak terkini           | Klik "⟳ Refresh detection" di dashboard          |
| Pautan lama `/dashboard/cli-tools`                      | Penanda buku pra-v3.8.6       | Auto-redirected ke `/dashboard/cli-code` (308)   |
| Pautan lama `/dashboard/agents`                         | Penanda buku pra-v3.8.6       | Auto-redirected ke `/dashboard/acp-agents` (308) |
