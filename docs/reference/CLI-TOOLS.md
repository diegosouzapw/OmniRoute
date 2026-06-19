---
title: "CLI Tools — OmniRoute v3.8.6"
version: 3.8.6
lastUpdated: 2026-05-28
---

# CLI Tools — OmniRoute v3.8.6

Last updated: 2026-05-28

OmniRoute integrates with three categories of CLI tools spread across three dedicated dashboard pages:

| Page | Route | Concept | Count |
|------|-------|---------|-------|
| **CLI Code's** | `/dashboard/cli-code` | Coding tools you point at OmniRoute (Client → CLI → OmniRoute → Provider) | 19 |
| **CLI Agents** | `/dashboard/cli-agents` | Autonomous agents you point at OmniRoute (same flow, broader scope) | 6 |
| **ACP Agents** | `/dashboard/acp-agents` | CLIs that OmniRoute spawns as backend via stdio/ACP (reverse flow) | see registry |

Legacy routes redirect via 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## How It Works

```
CLI Code's / CLI Agents (consumption flow):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (all point to OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute routes to the right provider)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agents (reverse spawn flow):
    Client request → OmniRoute → spawns CLI via stdio/ACP → response
```

**Benefits:**

- One API key to manage all tools
- Cost tracking across all CLIs in the dashboard
- Model switching without reconfiguring every tool
- Works locally and on remote servers (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Source of Truth

The unified catalog lives in `src/shared/constants/cliTools.ts` as `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Each entry has these fields (defined in `src/shared/schemas/cliCatalog.ts`):

| Field | Type | Description |
|-------|------|-------------|
| `category` | `"code" \| "agent"` | Which page the tool appears on |
| `vendor` | `string` | Tool origin ("Anthropic", "OSS (P. Gauthier)") |
| `acpSpawnable` | `boolean` | Also usable as an ACP Agent (badge shown) |
| `baseUrlSupport` | `"full" \| "partial" \| "none"` | Custom endpoint support level. `"none"` = MITM backlog |
| `configType` | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Configuration mechanism |
| `id`, `name`, `color`, `description`, `docsUrl` | standard | Core display fields |

Entries with `baseUrlSupport: "none"` are **not shown** in the dashboard pages — they are registered in the MITM backlog for plan 11 (see `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

---

## 1. CLI Code's Catalog (19 tools)

Tools that support custom base URL and appear in `/dashboard/cli-code`:

| id | name | vendor | baseUrlSupport | configType | acpSpawnable |
|----|------|--------|---------------|-----------|-------------|
| claude | Claude Code | Anthropic | full | env | true |
| codex | OpenAI Codex CLI | OpenAI | full | custom | true |
| cline | Cline | OSS (ex-Claude Dev) | full | custom | true |
| kilo | Kilo Code | Kilo-Org | full | custom | false |
| roo | Roo Code | Roo (OSS) | full | guide | false |
| continue | Continue | continue.dev | full | guide | false |
| qwen | Qwen Code | Alibaba | full | guide | true |
| aider | Aider | OSS (P. Gauthier) | full | guide | true |
| forge | ForgeCode | Antinomy HQ | full | custom | true |
| jcode | jcode | 1jehuang (OSS) | full | custom | false |
| deepseek-tui | DeepSeek TUI | Hunter Bown (OSS) | full | custom | false |
| opencode | OpenCode | Anomaly (ex-SST) | full | guide | true |
| droid | Factory Droid | Factory AI | partial | guide | false |
| copilot | GitHub Copilot CLI | GitHub/MS | full | custom | false |
| gemini-cli | Gemini CLI | Google | partial | guide | true |
| cursor-cli | Cursor CLI | Anysphere | partial | guide | true |
| smelt | Smelt | leonardcser (OSS) | full | custom | false |
| pi | Pi (pi-coding-agent) | M. Zechner (OSS) | full | custom | false |
| custom | Custom CLI | — | full | custom-builder | false |

Tools with `baseUrlSupport: "partial"` show a badge "⚠ Base URL parcial" in the dashboard card.

---

## 2. CLI Agents Catalog (6 tools)

Autonomous agents that appear in `/dashboard/cli-agents`:

| id | name | vendor | baseUrlSupport | acpSpawnable |
|----|------|--------|---------------|-------------|
| hermes-agent | Hermes Agent | Nous Research | full | false |
| openclaw | OpenClaw | OSS (P. Steinberger) | full | true |
| goose | Goose | Block / Linux Foundation | full | true |
| interpreter | Open Interpreter | OSS | full | true |
| warp | Warp AI | Warp Inc. | partial | true |
| agent-deck | Agent Deck | asheshgoplani (OSS) | full | false |

---

## 3. ACP Agents (/dashboard/acp-agents)

This page (renamed from `/dashboard/agents`) shows CLIs that OmniRoute can **spawn** as backend execution engines via stdio/ACP protocol. The catalog is maintained separately in `src/lib/acp/registry.ts` and is **not** the same as `CLI_TOOLS`.

Current ACP-spawnable CLIs (from `acpSpawnable: true` in `CLI_TOOLS` + ACP registry): codex, claude, goose, gemini-cli, openclaw, aider, opencode, cline, qwen-code, forge, interpreter, cursor-cli, warp.

---

## 4. MITM Backlog (not shown in dashboard)

The following CLIs do not support custom base URL natively and are **not listed** in CLI Code's or CLI Agents pages. They are candidates for MITM interception in plan 11:

| CLI | Reason |
|-----|--------|
| windsurf | BYOK limited to select Claude models + corporate URL/token |
| amp | Closed ecosystem (Sourcegraph) |
| amazon-q / kiro-cli | AWS SSO auth, no custom URL |
| cowork | Anthropic Desktop, no configurable endpoint |

See `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` for the full cross-reference.

---

## 5. Batch Detection API

All tool detection is aggregated via a single endpoint:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (same as other `/api/cli-tools/` routes)
- Returns: `Record<toolId, ToolBatchStatus>` (type: `src/shared/types/cliBatchStatus.ts`)
- Strategy: `Promise.all` over all tools, 5s timeout per tool
- Cache: in-memory LRU indexed by config file `mtime`. Cache invalidated when mtime changes. Reset on server restart.

Response shape per tool:
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
  error?: string;  // sanitized, no stack traces
}
```

---

## 6. Settings Handlers for New Tools

New tools with `configType: "custom"` have dedicated settings API routes:

| Route | Tool |
|-------|------|
| `POST /api/cli-tools/forge-settings` | ForgeCode (.forge.toml) |
| `POST /api/cli-tools/jcode-settings` | jcode (--base-url flag) |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL) |
| `POST /api/cli-tools/smelt-settings` | Smelt |
| `POST /api/cli-tools/pi-settings` | Pi coding agent |

All routes use `sanitizeErrorMessage()` for error responses (Hard Rule #12).

---

## 7. Dashboard Pages Architecture

### CLI Code's (`/dashboard/cli-code`)
- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — server component
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — client grid
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — tool detail page
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 specialized tool cards + `ToolDetailClient.tsx`

### CLI Agents (`/dashboard/cli-agents`)
- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — server component
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — client grid
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — reuses `ToolDetailClient`

### ACP Agents (`/dashboard/acp-agents`)
- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — server component (moved from `agents/`)

### Shared UI Components (`src/shared/components/cli/`)
| File | Purpose |
|------|---------|
| `CliToolCard.tsx` | Smart status card (detection + config + endpoint) |
| `CliConceptCard.tsx` | Per-page concept explanation card |
| `CliComparisonCard.tsx` | Three-column comparison across CLI types |
| `BaseUrlSelect.tsx` | Endpoint dropdown (Local/Cloud/Custom) |
| `ApiKeySelect.tsx` | API key selector |
| `ManualConfigModal.tsx` | Copiable config snippet modal |

### Shared Hook (`src/shared/hooks/cli/`)
| File | Purpose |
|------|---------|
| `useToolBatchStatuses.ts` | Fetches `/api/cli-tools/all-statuses`, manages loading/refresh state |

---

## 8. i18n

New namespaces added in plan 14 F9:

| Namespace | Purpose |
|-----------|---------|
| `cliCommon` | Shared strings (card labels, concept/comparison texts, detail page labels) |
| `cliCode` | CLI Code's page strings |
| `cliAgents` | CLI Agents page strings |
| `acpAgents` | ACP Agents page strings |

Full PT-BR and EN translations are provided. 39 other locales fall back to EN automatically via namespace-level merge in `src/i18n/request.ts`.

---

## 9. Quick Start

### Step 1 — Get an OmniRoute API Key

1. Open `/dashboard/api-manager` → **Create API Key**
2. Give it a name (e.g. `cli-tools`) and select all permissions
3. Copy the key — you'll need it for every CLI below

> Your key looks like: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Step 2 — Install CLI Tools

All npm-based tools require Node.js 20.20.2+, 22.22.2+ or 24.x:

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

# Qwen Code (Alibaba)
npm install -g @qwen-code/qwen-code

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Rust-based

# Pi coding agent
# see https://github.com/zechnerj/pi-coding-agent for install

# jcode
# see https://github.com/1jehuang/jcode for install
```

---

### Step 3 — Configure via Dashboard

1. Go to `http://localhost:20128/dashboard/cli-code`
2. Find your tool in the grid
3. Click the card to open the tool detail page
4. Select your API key and base URL
5. Click **Apply Config** or copy the manual config snippet

---

### Step 4 — Set Global Environment Variables

```bash
# OmniRoute Universal Endpoint
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> For a **remote server** replace `localhost:20128` with the server IP or domain,
> e.g. `http://<your-server-ip>:20128`.

---

### Step 4 — Configure Each Tool

#### Claude Code

```bash
# Create ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Use the unified Anthropic gateway root for Claude Code. Do not append `/v1` here.

**Test:** `claude "say hello"`

---

#### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: sk-your-omniroute-key
apiBaseUrl: http://localhost:20128/v1
EOF
```

**Test:** `codex "what is 2+2?"`

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

**Test:** `opencode`

> Use `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> to send thinking variants.

---

#### Cline (CLI or VS Code)

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
Cline extension settings → API Provider: `OpenAI Compatible` → Base URL: `http://localhost:20128/v1`

Or use the OmniRoute dashboard → **CLI Tools → Cline → Apply Config**.

---

#### KiloCode (CLI or VS Code)

**CLI mode:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code settings:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Or use the OmniRoute dashboard → **CLI Tools → KiloCode → Apply Config**.

---

#### Continue (VS Code Extension)

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

Restart VS Code after editing.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Use this when VS Code Insiders is configured for custom endpoint models and you want OmniRoute to work without a custom header field.

**Recommended location:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Example using the tokenized OmniRoute alias:**

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

**Notes:**

- Replace `sk-your-omniroute-key` with an API key created in OmniRoute.
- The `url` field should point to `/api/v1/vscode/{token}/chat/completions`.
- The `modelsUrl` field should point to `/api/v1/vscode/{token}/models`.
- Prefer the normal `/v1` + Bearer header flow when the client supports custom headers.
- URL-embedded tokens are a compatibility fallback and may appear in editor logs or proxy history.

---

#### Kiro CLI (Amazon)

```bash
# Login to your AWS/Kiro account:
kiro-cli login

# The CLI uses its own auth — OmniRoute is not needed as backend for Kiro CLI itself.
# Use kiro-cli alongside OmniRoute for other tools.
kiro-cli status
```

For the **Kiro IDE** desktop app, use the MITM endpoint exposed by OmniRoute
under `/dashboard/cli-tools → Kiro`.

---

#### Qwen Code (Alibaba)

Qwen Code supports OpenAI-compatible API endpoints via environment variables or `settings.json`.

> Qwen OAuth free tier was discontinued on 2026-04-15. Use OmniRoute with
> `bailian-coding-plan` / `alibaba` / `alibaba-cn` / `openrouter` / `anthropic` /
> `gemini` providers instead.

**Option 1: Environment variables (`~/.qwen/.env`)**

```bash
mkdir -p ~/.qwen && cat > ~/.qwen/.env << EOF
OPENAI_API_KEY="sk-your-omniroute-key"
OPENAI_BASE_URL="http://localhost:20128/v1"
OPENAI_MODEL="auto"
EOF
```

**Option 2: `settings.json` with `security.auth`**

```json
// ~/.qwen/settings.json
{
  "security": {
    "auth": {
      "selectedType": "openai",
      "apiKey": "sk-your-omniroute-key",
      "baseUrl": "http://localhost:20128/v1"
    }
  },
  "model": {
    "name": "claude-sonnet-4-6"
  }
}
```

**Option 3: Inline CLI flags**

```bash
OPENAI_BASE_URL="http://localhost:20128/v1" \
OPENAI_API_KEY="sk-your-omniroute-key" \
OPENAI_MODEL="auto" \
qwen
```

> For a **remote server** replace `localhost:20128` with the server IP or domain.

---

## 10. Internal OmniRoute CLI

The `omniroute` binary provides commands for server lifecycle, setup, diagnostics, and provider management. Entry point: `bin/omniroute.mjs`.

```bash
omniroute                              # Start server (default port 20128)
omniroute setup                        # Interactive setup wizard
omniroute doctor                       # Check config, DB, ports, runtime
omniroute providers list               # Configured provider connections
omniroute providers test-all           # Test every active connection
omniroute reset-password               # Reset the admin password
omniroute logs                         # Stream request logs
omniroute health                       # Detailed health (breakers, cache, memory)
omniroute --version                    # Print version
omniroute --help                       # Show all commands
```

### Setup & Initialization

```bash
omniroute setup                        # Interactive setup wizard
omniroute setup --non-interactive      # CI/automation mode (reads env vars + flags)
omniroute setup --password '<value>'   # Set admin password directly
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Add and test a provider in one shot
```

Recognized environment variables for non-interactive setup:

| Var                | Purpose                                                            |
| ------------------ | ----------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Provider API key (bound to `--api-key` via Commander `.env()`)   |
| `DATA_DIR`         | Override the OmniRoute data directory                             |

All other non-interactive inputs are passed as flags, not environment variables:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(see the `omniroute setup` options above).

### Diagnostics

```bash
omniroute doctor                       # Check config, DB, ports, runtime, memory, liveness
omniroute doctor --json                # Machine-readable JSON
omniroute doctor --no-liveness         # Skip the HTTP health probe
omniroute doctor --host 0.0.0.0        # Override liveness host
omniroute doctor --liveness-url <url>  # Full health endpoint URL override
```

The doctor runs these checks: `Config`, `Database`, `Storage/encryption`,
`Port availability`, `Node runtime`, `Native binary` (better-sqlite3),
`Memory`, and `Server liveness`. It exits non-zero if any check is `fail`.

### Provider Management

```bash
omniroute providers available                       # OmniRoute provider catalog
omniroute providers available --search openai       # Filter catalog by id/name/alias/category
omniroute providers available --category api-key    # Filter by category (api-key, oauth, free, ...)
omniroute providers available --json                # Machine-readable JSON

omniroute providers list                            # Configured provider connections
omniroute providers list --json

omniroute providers test <id|name>                  # Test one configured connection
omniroute providers test-all                        # Test every active connection
omniroute providers validate                        # Local-only structural validation
```

> `providers available` reads the OmniRoute catalog; `providers list/test/test-all/validate`
> read the local SQLite database directly and do not require the server to be running.

### Recovery & Reset

```bash
omniroute reset-password                # Reset the admin password (legacy alias still works)
omniroute reset-encrypted-columns       # Show warning + dry-run for encrypted credential reset
omniroute reset-encrypted-columns --force  # Actually null out encrypted credentials in SQLite
```

### Other subcommands

These assume a running OmniRoute server, unless noted otherwise:

```bash
omniroute status                       # Comprehensive runtime status
omniroute logs                         # Stream request logs (--json, --search, --follow)
omniroute config show                  # Display current configuration

omniroute provider list                # List available providers (alias of providers list)
omniroute provider add                 # Register OmniRoute as a provider on a tool
omniroute keys add | list | remove     # Manage API keys
omniroute models [provider]            # List models (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Snapshot config + DB
omniroute restore                      # Restore from a previous snapshot

omniroute health                       # Detailed health (breakers, cache, memory)
omniroute quota                        # Provider quota usage
omniroute cache                        # Cache status
omniroute cache clear                  # Clear semantic + signature caches

omniroute mcp status | restart         # MCP server status / restart
omniroute a2a status | card            # A2A server status / agent card

omniroute tunnel list | create | stop  # Manage tunnels (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Inspect / set env vars (temporary)

omniroute test                         # Provider connectivity smoke test
omniroute update                       # Check for updates
omniroute completion                   # Generate shell completion
```

### Common flags

| Flag                | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `--no-open`         | Don't auto-open the browser on start                   |
| `--port <n>`        | Override the API port (default 20128)                  |
| `--mcp`             | Run as MCP server over stdio (for IDEs)                |
| `--non-interactive` | CI mode (no prompts; reads from env/flags)             |
| `--json`            | Machine-readable JSON output (doctor, providers, etc.) |
| `--help`, `-h`      | Show command-specific help                             |
| `--version`, `-v`   | Print the installed version                            |

---

## Available API Endpoints

| Endpoint                   | Description                   | Use For                     |
| -------------------------- | ----------------------------- | --------------------------- |
| `/v1/chat/completions`     | Standard chat (all providers) | All modern tools            |
| `/v1/responses`            | Responses API (OpenAI format) | Codex, agentic workflows    |
| `/v1/completions`          | Legacy text completions       | Older tools using `prompt:` |
| `/v1/embeddings`           | Text embeddings               | RAG, search                 |
| `/v1/images/generations`   | Image generation              | GPT-Image, Flux, etc.       |
| `/v1/audio/speech`         | Text-to-speech                | ElevenLabs, OpenAI TTS      |
| `/v1/audio/transcriptions` | Speech-to-text                | Deepgram, AssemblyAI        |

Ready-to-paste examples with a tokenized OmniRoute URL:

```txt
Token example: sk-a3ab3c080beaee3a-69f4a4-070d71af

Standard OpenAI base: http://localhost:20128/v1
VS Code models: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code responses: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama tags: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `Connection refused` | OmniRoute not running | `omniroute serve` |
| `401 Unauthorized` | Wrong API key | Check in `/dashboard/api-manager` |
| `No combo configured` | No active routing combo | Set up in `/dashboard/combos` |
| CLI shows "not installed" | Binary not in PATH | Check `which <command>` |
| Dashboard shows "not detected" after install | Cache stale | Click "⟳ Refresh detection" in dashboard |
| Old link `/dashboard/cli-tools` | Pre-v3.8.6 bookmark | Auto-redirected to `/dashboard/cli-code` (308) |
| Old link `/dashboard/agents` | Pre-v3.8.6 bookmark | Auto-redirected to `/dashboard/acp-agents` (308) |
