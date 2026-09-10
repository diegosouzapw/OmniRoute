# CLI-TOOLS (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI Tools — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Tools — OmniRoute

Huling na-update: 2026-08-18

Ang OmniRoute ay nag-iintegrate sa tatlong kategorya ng mga CLI tool na nakakalat sa tatlong nakalaang pahina ng dashboard:

| Pahina         | Ruta                    | Konsepto                                                                                       | Bilang               |
| -------------- | ----------------------- | ---------------------------------------------------------------------------------------------- | -------------------- |
| **CLI Code's** | `/dashboard/cli-code`   | Mga tool sa pag-coding na itinuturo mo sa OmniRoute (Client → CLI → OmniRoute → Provider)      | 26                   |
| **CLI Agents** | `/dashboard/cli-agents` | Mga autonomous agent na itinuturo mo sa OmniRoute (parehong daloy, mas malawak na saklaw)      | 8                    |
| **ACP Agents** | `/dashboard/acp-agents` | Mga CLI na nilikha ng OmniRoute bilang backend sa pamamagitan ng stdio/ACP (baligtad na daloy) | tingnan ang rehistro |

Ang mga legacy na ruta ay nagre-redirect sa pamamagitan ng 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Paano Ito Gumagana

```
CLI Code's / CLI Agents (daloy ng pagkonsumo):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (lahat ay itinuturo sa OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (ang OmniRoute ay nagruruta sa tamang provider)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agents (baligtad na daloy ng paglikha):
    Client request → OmniRoute → naglilikha ng CLI sa pamamagitan ng stdio/ACP → tugon
```

**Mga Benepisyo:**

- Isang API key upang pamahalaan ang lahat ng tool
- Pagsubaybay sa gastos sa lahat ng CLI sa dashboard
- Paglipat ng modelo nang hindi nire-reconfigure ang bawat tool
- Gumagana nang lokal at sa mga remote server (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Auto-configure gamit ang `setup-*`

Hindi mo kailangang isulat ang config ng bawat tool nang mano-mano. Ang OmniRoute ay nagdadala ng `setup-*`
command para sa bawat suportadong CLI na nagbabasa ng **live** model catalog mula sa isang tumatakbong
OmniRoute (lokal o remote) at sumusulat ng sariling config ng tool sa iyong makina:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Bawat isa ay tumatanggap ng `--remote <url> --api-key <key>` (i-configure ang lokal na tool laban sa
remote OmniRoute), `--dry-run` (preview nang hindi sumusulat), at `--port`. Ang mga tool
na walang model auto-discovery (Cline, Kilo, Roo, Goose, Aider, Qwen) ay tumatanggap
ng `--model <id>` (at `--yes` para sa non-interactive na mga run). Upang ilunsad ang isang CLI na may
tamang env na injected at walang config na naisulat, gamitin ang generic
`omniroute run <target>` launcher (claude, codex, aider, goose, opencode, qwen,
gemini — ang mga target at alias ay nagmumula sa `bin/cli/cli-manifest.mjs`); ang legacy
na per-tool launchers `omniroute launch` (Claude Code) at `omniroute launch-codex`
(Codex) ay nananatiling available. Ang Gemini CLI ay launch-only: ito ay isang `omniroute run`
target ngunit walang `setup-*`/`configure` recipe.

> **Buong sanggunian:** ang master table — kung ano ang isinusulat ng bawat command, bawat flag,
> lokal vs remote, at kung aling mga tool ang nangangailangan ng `/v1` suffix — ay matatagpuan sa
> **[CLI Integrations](../guides/CLI-INTEGRATIONS.md)**.

### Pagtakbo ng mga ito sa loob ng isang container

Ang isang `setup-*` command na isinagawa sa loob ng OmniRoute container ay sumusulat sa
sariling home ng container, na walang host CLI na nagbabasa at nawawala kasama ng
container. Nakikita ito ng OmniRoute at lumalabas ng `2` na may mga tagubilin sa halip na
sumulat. Dalawang suportadong paraan pasulong — i-install ang CLI sa host at
`omniroute connect` sa container, o i-bind-mount ang mga config dir at itakda ang
`CLI_CONFIG_HOME` (ang compose `host` profile). Bawat `setup-*` command, kasama ang
`omniroute configure` at `omniroute config set`, ay tumatanggap ng
`--allow-container-write` kapag ang pag-configure ng sariling CLIs ng container ang talagang
nasa isip mo; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` ay ginagawa ang parehong bagay para
sa server. Tingnan ang
[Docker Guide → Pag-configure ng host CLI tools](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

Ang **apply endpoint** ng dashboard (`POST /api/cli-tools/apply`) ay nagpapatupad ng
parehong guard: sa isang container, ang isang write na ang target ay hindi bind-mounted mula sa
host ay sumasagot ng **`422`** na may `containerEphemeralTarget: true`, ang ligtas na error
text at — para sa mga tool na may host recipe (claude, codex, opencode, cline,
kilo, continue) — isang `hostSetupCommand` (hal. `omniroute setup-opencode`) na patakbuhin
sa host sa halip; walang naisusulat. Ang `dryRun: true` ay patuloy na gumagana sa container
mode at nagbabalik ng nabuo na nilalaman + target path nang hindi humahawak sa disk, kaya
maari mong i-preview mula sa dashboard at ilapat sa host. Ang pag-uugaling ito ay
sinadya at naka-regress-guarded ng
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — huwag kailanman "ayusin" ang 422
sa pamamagitan ng pagtanggal ng guard.

---

## Pinagmulan ng Katotohanan

Ang pinagsamang katalogo ay matatagpuan sa `src/shared/constants/cliTools.ts` bilang `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Bawat entry ay may mga field na ito (itinakda sa `src/shared/schemas/cliCatalog.ts`):

| Field                                           | Type                                                         | Paglalarawan                                                 |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `category`                                      | `"code" \| "agent"`                                          | Aling pahina lumalabas ang tool                              |
| `vendor`                                        | `string`                                                     | Pinagmulan ng tool ("Anthropic", "OSS (P. Gauthier)")        |
| `acpSpawnable`                                  | `boolean`                                                    | Maaari ring gamitin bilang ACP Agent (ipinapakitang badge)   |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Antas ng suporta sa custom endpoint. `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Mekanismo ng pagsasaayos                                     |
| `id`, `name`, `color`, `description`, `docsUrl` | standard                                                     | Pangunahing mga field ng pagpapakita                         |

Ang mga entry na may `baseUrlSupport: "none"` ay **hindi ipinapakita** sa mga pahina ng dashboard — sila ay nakarehistro sa MITM backlog para sa plan 11 (tingnan ang `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Antas ng Kakayahan (naka-katalogo × nadetect × na-configure × nailunsad)

Hindi lahat ng naka-katalogong tool ay nadetect, na-configure o nailunsad. Bawat antas ay may isang
nagdedeklarang pinagmulan, at isang drift test ang nagpapanatili sa kanilang pagkakasunod-sunod:

| Antas             | Kahulugan                                                                  | Naka-deklara sa                                                   |
| ----------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Naka-katalogo** | Lumalabas sa katalogo ng dashboard (pangalan, vendor, docs, uri ng config) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Nadetect**      | Binary/config detection, health checks, config paths                       | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **Na-configure**  | Suportado ng `omniroute configure <cli>` (umiiral ang setup recipe)        | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Nailunsad**     | Suportado ng `omniroute run <target>` (naka-define ang env/args injection) | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

Ang `bin/cli/cli-manifest.mjs` ay ang canonical executable manifest para sa mga CLI command
surfaces: `run`, `configure` at ang shell-completion generators ay lahat ay nagmula sa kanilang
target lists, alias resolution (halimbawa `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
at `--model` flag wiring mula dito. Ang drift guard
`tests/unit/cli/cli-manifest-drift.test.ts` ay nagsasaad na ang manifest, ang runtime
catalog, ang UI catalog at bawat consumer surface ay nananatiling naka-sync — ang isang target na idinagdag sa
isang surface nang walang iba ay nabibigo ang suite sa halip na tahimik na mag-drift.

## 1. Katalogo ng CLI Code (26 na tool)

Lahat ng tool na lumalabas sa `/dashboard/cli-code`. Ang mga may `baseUrlSupport: none` ay nakakabit sa pamamagitan ng MITM o isang manwal na gabay sa halip na isang pasadyang base URL:

| id           | pangalan                | vendor              | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ----------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code             | Anthropic           | full           | env            | true         |
| codex        | OpenAI Codex CLI        | OpenAI              | full           | custom         | true         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                | none           | custom         | false        |
| cline        | Cline                   | OSS (ex-Claude Dev) | full           | custom         | true         |
| kilo         | Kilo Code               | Kilo-Org            | full           | custom         | false        |
| roo          | Roo Code                | Roo (OSS)           | full           | guide          | false        |
| continue     | Continue                | continue.dev        | full           | guide          | false        |
| aider        | Aider                   | OSS (P. Gauthier)   | full           | guide          | true         |
| forge        | ForgeCode               | Antinomy HQ         | full           | custom         | true         |
| jcode        | jcode                   | 1jehuang (OSS)      | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)   | full           | custom         | false        |
| codewhale    | CodeWhale               | Hmbown (OSS)        | full           | custom         | false        |
| opencode     | OpenCode                | Anomaly (ex-SST)    | full           | guide          | true         |
| droid        | Factory Droid           | Factory AI          | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI      | GitHub/MS           | full           | custom         | false        |
| cursor-cli   | Cursor CLI              | Anysphere           | partial        | guide          | true         |
| smelt        | Smelt                   | leonardcser (OSS)   | full           | custom         | false        |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)    | full           | custom         | false        |
| grok-build   | Grok Build              | xAI                 | full           | custom         | false        |
| crush        | Crush                   | OSS (Charm)         | full           | custom         | false        |
| qwen         | Qwen Code               | Alibaba             | full           | guide          | true         |
| cursor       | Cursor                  | Anysphere           | none           | guide          | false        |
| antigravity  | Antigravity             | Google              | none           | mitm           | false        |
| hermes       | Hermes                  | Nous Research       | none           | guide          | false        |
| kiro         | Kiro AI                 | Amazon              | none           | mitm           | false        |
| custom       | Custom CLI              | —                   | full           | custom-builder | false        |

Ang mga tool na may `baseUrlSupport: "partial"` ay nagpapakita ng badge na "⚠ Base URL parcial" sa dashboard card.

## 2. Katalogo ng CLI Agents (8 tools)

Mga autonomous agents na makikita sa `/dashboard/cli-agents`:

| id           | pangalan         | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | full           | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | full           | true         |
| goose        | Goose            | Block / Linux Foundation | full           | true         |
| interpreter  | Open Interpreter | OSS                      | full           | true         |
| warp         | Warp AI          | Warp Inc.                | partial        | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | full           | false        |
| omp          | Oh My Pi         | OSS                      | full           | true         |
| letta        | Letta CLI        | Letta                    | full           | false        |

---

## 3. ACP Agents (/dashboard/acp-agents)

Ang pahinang ito (na pinalitan mula sa `/dashboard/agents`) ay nagpapakita ng mga CLI na maaaring **i-spawn** ng OmniRoute bilang mga backend execution engines sa pamamagitan ng stdio/ACP protocol. Ang katalogo ay pinapanatili nang hiwalay sa `src/lib/acp/registry.ts` at **hindi** ito kapareho ng `CLI_TOOLS`.

---

## 4. MITM Backlog (hindi ipinapakita sa dashboard)

Ang mga sumusunod na CLI ay hindi sumusuporta sa custom base URL nang katutubo at **hindi nakalista** sa mga pahina ng CLI Code o CLI Agents. Sila ay mga kandidato para sa MITM interception sa plan 11:

| CLI                 | Dahilan                                                              |
| ------------------- | -------------------------------------------------------------------- |
| windsurf            | BYOK limitado sa mga napiling modelo ng Claude + corporate URL/token |
| amp                 | Closed ecosystem (Sourcegraph)                                       |
| amazon-q / kiro-cli | AWS SSO auth, walang custom URL                                      |
| cowork              | Anthropic Desktop, walang configurable endpoint                      |

Tingnan ang `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` para sa buong cross-reference.

---

## 5. Batch Detection API

Ang lahat ng tool detection ay pinagsama-sama sa pamamagitan ng isang endpoint:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (pareho sa iba pang `/api/cli-tools/` routes)
- Nagbabalik: `Record<toolId, ToolBatchStatus>` (uri: `src/shared/types/cliBatchStatus.ts`)
- Estratehiya: `Promise.all` sa lahat ng tools, 5s timeout bawat tool
- Cache: in-memory LRU na naka-index sa config file `mtime`. Ang cache ay nawawalan ng bisa kapag nagbago ang mtime. I-reset sa server restart.

Hugis ng tugon bawat tool:

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
  error?: string; // sanitized, walang stack traces
}
```

## 6. Mga Tagapangasiwa ng Mga Setting para sa Mga Bagong Tool

Ang mga bagong tool na may `configType: "custom"` ay may mga nakalaang ruta ng API para sa mga setting:

| Ruta                                        | Tool                                                             |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedicated `.env` key)       |

Lahat ng ruta ay gumagamit ng `sanitizeErrorMessage()` para sa mga tugon ng error (Hard Rule #12).

---

## 7. Arkitektura ng Mga Pahina ng Dashboard

### CLI Code's (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — server component
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — client grid
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — tool detail page
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 specialized tool cards + `ToolDetailClient.tsx`

### CLI Agents (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — server component
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — client grid
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — muling ginagamit ang `ToolDetailClient`

### ACP Agents (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — server component (inilipat mula sa `agents/`)

### Mga Shared UI Components (`src/shared/components/cli/`)

| File                    | Layunin                                           |
| ----------------------- | ------------------------------------------------- |
| `CliToolCard.tsx`       | Smart status card (detection + config + endpoint) |
| `CliConceptCard.tsx`    | Per-page concept explanation card                 |
| `CliComparisonCard.tsx` | Tatlong-column comparison sa mga uri ng CLI       |
| `BaseUrlSelect.tsx`     | Endpoint dropdown (Local/Cloud/Custom)            |
| `ApiKeySelect.tsx`      | API key selector                                  |
| `ManualConfigModal.tsx` | Copiable config snippet modal                     |

### Shared Hook (`src/shared/hooks/cli/`)

| File                      | Layunin                                                                         |
| ------------------------- | ------------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Kinukuha ang `/api/cli-tools/all-statuses`, namamahala ng loading/refresh state |

## 8. i18n

Mga bagong namespace na idinagdag sa plano 14 F9:

| Namespace   | Layunin                                                                                                 |
| ----------- | ------------------------------------------------------------------------------------------------------- |
| `cliCommon` | Mga shared na string (mga label ng card, mga teksto ng konsepto/paghahambing, mga label ng detail page) |
| `cliCode`   | Mga string ng pahina ng CLI Code                                                                        |
| `cliAgents` | Mga string ng pahina ng CLI Agents                                                                      |
| `acpAgents` | Mga string ng pahina ng ACP Agents                                                                      |

Buong PT-BR at EN na pagsasalin ay ibinigay. 39 iba pang mga locale ay awtomatikong bumabalik sa EN sa pamamagitan ng namespace-level merge sa `src/i18n/request.ts`.

---

## 9. Mabilis na Simula

### Hakbang 1 — Kumuha ng OmniRoute API Key

1. Buksan ang `/dashboard/api-manager` → **Lumikha ng API Key**
2. Bigyan ito ng pangalan (hal. `cli-tools`) at piliin ang lahat ng pahintulot
3. Kopyahin ang key — kakailanganin mo ito para sa bawat CLI sa ibaba

> Ang iyong key ay mukhang: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Hakbang 2 — I-install ang CLI Tools

Lahat ng npm-based na tools ay nangangailangan ng Node.js 22.22.2+ o 24.x:

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

# Google Gemini CLI (maaaring ilunsad sa pamamagitan ng `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Batay sa Rust

# Pi coding agent
# tingnan ang https://github.com/zechnerj/pi-coding-agent para sa pag-install

# jcode
# tingnan ang https://github.com/1jehuang/jcode para sa pag-install
```

---

### Hakbang 3 — I-configure sa pamamagitan ng Dashboard

1. Pumunta sa `http://localhost:20128/dashboard/cli-code`
2. Hanapin ang iyong tool sa grid
3. I-click ang card upang buksan ang pahina ng detalye ng tool
4. Piliin ang iyong API key at base URL
5. I-click ang **Ilapat ang Config** o kopyahin ang manual config snippet

---

### Hakbang 4 — Itakda ang Global Environment Variables

```bash
# OmniRoute Universal Endpoint
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Binabasa ng Gemini CLI ang GOOGLE_GEMINI_BASE_URL sa ROOT (ang SDK nito ay nagdadagdag ng /v1beta/... mismo)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Para sa isang **remote server** palitan ang `localhost:20128` ng IP o domain ng server,
> hal. `http://<your-server-ip>:20128`.

---

### Hakbang 4 — I-configure ang Bawat Tool

#### Claude Code

```bash
# Lumikha ng ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Gamitin ang pinagsamang root ng Anthropic gateway para sa Claude Code. Huwag magdagdag ng `/v1` dito.

**Subukan:** `claude "say hello"`

---

#### OpenAI Codex

Ang Modern Codex (v0.137+) ay nagbabasa lamang ng `~/.codex/config.toml` — ang luma
`config.yaml` ay pag-aari ng legacy npm CLI at tahimik na pinapabayaan. Ang API
key ay nananatili sa `OMNIROUTE_API_KEY` environment variable (`env_key`), hindi kailanman
sa loob ng file:

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

Buong sanggunian (mga profile, `wire_api`, mga context window): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Subukan:** `codex "what is 2+2?"`

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

**Subukan:** `opencode`

> Gamitin ang `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> upang magpadala ng mga thinking variants.

---

#### Cline (CLI o VS Code)

**CLI mode:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code mode:**
Mga setting ng Cline extension → API Provider: `OpenAI Compatible` → Base URL: `http://localhost:20128/v1`

O gamitin ang OmniRoute dashboard → **CLI Tools → Cline → Ilapat ang Config**.

---

#### KiloCode (CLI o VS Code)

**CLI mode:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Mga setting ng VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

O gamitin ang OmniRoute dashboard → **CLI Tools → KiloCode → Ilapat ang Config**.

---

#### Continue (VS Code Extension)

I-edit ang `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

I-restart ang VS Code pagkatapos mag-edit.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Gamitin ito kapag ang VS Code Insiders ay naka-configure para sa mga custom endpoint models at nais mong gumana ang OmniRoute nang walang custom header field.

**Inirerekomendang lokasyon:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Halimbawa gamit ang tokenized OmniRoute alias:**

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

**Mga Tala:**

- Palitan ang `sk-your-omniroute-key` ng isang API key na nilikha sa OmniRoute.
- Ang `url` field ay dapat tumuro sa `/api/v1/vscode/{token}/chat/completions`.
- Ang `modelsUrl` field ay dapat tumuro sa `/api/v1/vscode/{token}/models`.
- Mas mainam ang normal na `/v1` + Bearer header flow kapag sinusuportahan ng client ang mga custom headers.
- Ang mga URL-embedded na token ay isang compatibility fallback at maaaring lumitaw sa mga log ng editor o proxy history.

---

#### Kiro CLI (Amazon)

```bash
# Mag-login sa iyong AWS/Kiro account:
kiro-cli login

# Ang CLI ay gumagamit ng sarili nitong auth — hindi kinakailangan ang OmniRoute bilang backend para sa Kiro CLI mismo.
# Gamitin ang kiro-cli kasama ang OmniRoute para sa iba pang mga tool.
kiro-cli status
```

Para sa **Kiro IDE** desktop app, gamitin ang MITM endpoint na inilabas ng OmniRoute
sa ilalim ng `/dashboard/cli-tools → Kiro`.

---

## 10. Internal OmniRoute CLI

Ang `omniroute` binary ay nagbibigay ng mga utos para sa lifecycle ng server, setup, diagnostics, at pamamahala ng provider. Entry point: `bin/omniroute.mjs`.

```bash
omniroute                              # Simulan ang server (default port 20128)
omniroute setup                        # Interactive setup wizard
omniroute doctor                       # Suriin ang config, DB, ports, runtime
omniroute providers list               # Nakakonfigurang koneksyon ng provider
omniroute providers test-all           # Subukan ang bawat aktibong koneksyon
omniroute reset-password               # I-reset ang admin password
omniroute logs                         # I-stream ang mga request logs
omniroute health                       # Detalyadong kalusugan (breakers, cache, memory)
omniroute --version                    # I-print ang bersyon
omniroute --help                       # Ipakita ang lahat ng utos
```

### Setup & Initialization

```bash
omniroute setup                        # Interactive setup wizard
omniroute setup --non-interactive      # CI/automation mode (nagbabasa ng env vars + flags)
omniroute setup --password '<value>'   # Itakda ang admin password nang direkta
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Magdagdag at subukan ang provider sa isang pagkakataon
```

Mga kinikilalang environment variable para sa non-interactive setup:

| Var                 | Layunin                                                                         |
| ------------------- | ------------------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Provider API key (nakabind sa `--api-key` sa pamamagitan ng Commander `.env()`) |
| `DATA_DIR`          | Palitan ang OmniRoute data directory                                            |

Lahat ng iba pang non-interactive inputs ay ipinapasa bilang flags, hindi mga environment variable:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(tingnan ang mga opsyon ng `omniroute setup` sa itaas).

### Diagnostics

```bash
omniroute doctor                       # Suriin ang config, DB, ports, runtime, memory, liveness
omniroute doctor --json                # Machine-readable JSON
omniroute doctor --no-liveness         # Laktawan ang HTTP health probe
omniroute doctor --host 0.0.0.0        # Palitan ang liveness host
omniroute doctor --liveness-url <url>  # Buong health endpoint URL override
```

Ang doctor ay nagsasagawa ng mga pagsusuri: `Config`, `Database`, `Storage/encryption`,
`Port availability`, `Node runtime`, `Native binary` (better-sqlite3),
`Memory`, at `Server liveness`. Ito ay lalabas na non-zero kung ang anumang pagsusuri ay `fail`.

### Provider Management

```bash
omniroute providers available                       # Catalog ng OmniRoute provider
omniroute providers available --search openai       # I-filter ang catalog ayon sa id/name/alias/category
omniroute providers available --category api-key    # I-filter ayon sa kategorya (api-key, oauth, free, ...)
omniroute providers available --json                # Machine-readable JSON

omniroute providers list                            # Nakakonfigurang koneksyon ng provider
omniroute providers list --json

omniroute providers test <id|name>                  # Subukan ang isang nakakonfigurang koneksyon
omniroute providers test-all                        # Subukan ang bawat aktibong koneksyon
omniroute providers validate                        # Local-only structural validation
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Umiiral na OAuth flow
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` ay API-first at samakatuwid ay gumagana laban
sa aktibong lokal o remote na konteksto. Ang input ng credential ay dapat gumamit ng
`--credential-stdin` o `--credential-env`; `--dry-run --json` ay nag-uulat lamang ng
redacted presence/shape. Ang `providers available` ay nagbabasa ng catalog ng OmniRoute;
`providers list/test/test-all/validate` ay nagpapanatili ng kanilang lokal na SQLite na pag-uugali at
hindi nangangailangan ng server na tumatakbo.

### Recovery & Reset

```bash
omniroute reset-password                # I-reset ang admin password (din: omniroute-reset-password)
omniroute reset-encrypted-columns       # Ipakita ang babala + dry-run para sa reset ng encrypted credential
omniroute reset-encrypted-columns --force  # Talagang i-null out ang encrypted credentials sa SQLite
```

### Credential Export (⚠ hawakan nang maingat)

```bash
omniroute auth export                                 # Ipakita ang babala + confirmation gate — walang DB access
omniroute auth export --force                          # I-export ang LAHAT ng DECRYPTED credentials ng koneksyon sa stdout bilang JSON
omniroute auth export --force --id <id>                 # I-export lamang ang tumutugmang koneksyon
omniroute auth export --force --format env               # Maglabas ng OMNIROUTE_<PROVIDER>_<FIELD>=<value> na mga linya
omniroute auth export --force --out creds.json           # Isulat sa isang file (nilikha na may 0600 permissions)
```

Ang `auth export` ay **local-only** (direktang pagbabasa ng SQLite, walang HTTP route) at sinadyang nagpi-print/nagsusulat ng
**plaintext** `apiKey`/`accessToken`/`refreshToken`/`idToken` na mga halaga — iyon ang tampok, hindi isang
bug. Walang nababasa mula sa database, at walang nade-decrypt, nang walang `--force`. Isang stderr
warning banner ang palaging nagpi-print bago lumabas ang anumang plaintext. Nangangailangan ng `STORAGE_ENCRYPTION_KEY` na
itakda. Ang isang field na nabigong ma-decrypt (stale key, corrupt ciphertext) ay iniulat bilang
`<field>DecryptFailed: true` sa halip na itigil ang buong export o mag-leak ng underlying error.

### Iba pang subcommands

Ang mga ito ay nag-aassume ng tumatakbong OmniRoute server, maliban kung nakasaad na iba:

```bash
omniroute status                       # Komprehensibong runtime status
omniroute logs                         # I-stream ang mga request logs (--json, --search, --follow)
omniroute config show                  # Ipakita ang kasalukuyang configuration

omniroute provider list                # Ilista ang mga available na provider (alias ng providers list)
omniroute provider add                 # Irehistro ang OmniRoute bilang provider sa isang tool
omniroute keys add | list | remove     # Pamahalaan ang API keys
omniroute models [provider]            # Ilista ang mga modelo (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Snapshot config + DB
omniroute restore                      # Ibalik mula sa nakaraang snapshot

omniroute health                       # Detalyadong kalusugan (breakers, cache, memory)
omniroute quota                        # Paggamit ng provider quota
omniroute cache                        # Katayuan ng cache
omniroute cache clear                  # I-clear ang semantic + signature caches

omniroute mcp status | restart         # Katayuan ng MCP server / restart
omniroute a2a status | card            # Katayuan ng A2A server / agent card

omniroute tunnel list | create | stop  # Pamahalaan ang mga tunnel (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Suriin / itakda ang mga env vars (temporary)

omniroute test                         # Provider connectivity smoke test
omniroute update                       # Suriin ang mga update
omniroute completion                   # Lumikha ng shell completion
```

### Karaniwang flags

| Flag                | Paglalarawan                                                     |
| ------------------- | ---------------------------------------------------------------- |
| `--no-open`         | Huwag awtomatikong buksan ang browser sa pagsisimula             |
| `--port <n>`        | Palitan ang API port (default 20128)                             |
| `--mcp`             | Tumakbo bilang MCP server sa pamamagitan ng stdio (para sa IDEs) |
| `--non-interactive` | CI mode (walang prompts; nagbabasa mula sa env/flags)            |
| `--json`            | Machine-readable JSON output (doctor, providers, atbp.)          |
| `--help`, `-h`      | Ipakita ang command-specific help                                |
| `--version`, `-v`   | I-print ang naka-install na bersyon                              |

---

## Mga Magagamit na API Endpoint

| Endpoint                   | Paglalarawan                        | Gamit Para                                |
| -------------------------- | ----------------------------------- | ----------------------------------------- |
| `/v1/chat/completions`     | Karaniwang chat (lahat ng provider) | Lahat ng modernong tool                   |
| `/v1/responses`            | Responses API (OpenAI format)       | Codex, agentic workflows                  |
| `/v1/completions`          | Legacy text completions             | Mas lumang tool na gumagamit ng `prompt:` |
| `/v1/embeddings`           | Text embeddings                     | RAG, search                               |
| `/v1/images/generations`   | Paglikha ng imahe                   | GPT-Image, Flux, atbp.                    |
| `/v1/audio/speech`         | Text-to-speech                      | ElevenLabs, OpenAI TTS                    |
| `/v1/audio/transcriptions` | Speech-to-text                      | Deepgram, AssemblyAI                      |

Mga halimbawa na handang i-paste na may tokenized na OmniRoute URL:

```txt
Token example: sk-a3ab3c080beaee3a-69f4a4-070d71af

Karaniwang OpenAI base: http://localhost:20128/v1
VS Code models: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code responses: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama tags: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Pagsusuri ng Problema

| Error                                        | Sanhi                         | Ayos                                             |
| -------------------------------------------- | ----------------------------- | ------------------------------------------------ |
| `Connection refused`                         | Hindi tumatakbo ang OmniRoute | `omniroute serve`                                |
| `401 Unauthorized`                           | Mali ang API key              | Suriin sa `/dashboard/api-manager`               |
| `No combo configured`                        | Walang aktibong routing combo | I-set up sa `/dashboard/combos`                  |
| CLI shows "not installed"                    | Binary hindi nasa PATH        | Suriin ang `which <command>`                     |
| Dashboard shows "not detected" after install | Cache stale                   | I-click ang "⟳ Refresh detection" sa dashboard   |
| Lumang link `/dashboard/cli-tools`           | Pre-v3.8.6 bookmark           | Auto-redirected sa `/dashboard/cli-code` (308)   |
| Lumang link `/dashboard/agents`              | Pre-v3.8.6 bookmark           | Auto-redirected sa `/dashboard/acp-agents` (308) |
