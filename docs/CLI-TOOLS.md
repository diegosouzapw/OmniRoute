# CLI Tools — OmniRoute v3.8.0

Last updated: 2026-05-13

OmniRoute integrates with two categories of CLI tools:

1. **External CLI integrations** — third-party CLIs (Cursor, Cline, Codex, Claude Code, Qwen Code, Windsurf, Hermes, Amp, etc.) that you point at OmniRoute's local OpenAI-compatible endpoint.
2. **Internal OmniRoute CLI** — commands bundled with the `omniroute` binary for server lifecycle, setup, diagnostics, and provider management.

---

## How It Works

```
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Cursor / Windsurf / Hermes / Amp / Qwen
           │
           ▼  (all point to OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute routes to the right provider)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...
```

**Benefits:**

- One API key to manage all tools
- Cost tracking across all CLIs in the dashboard
- Model switching without reconfiguring every tool
- Works locally and on remote servers (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## 1. External CLI Integrations

### Source of Truth

The dashboard cards in `/dashboard/cli-tools` are generated from
`src/shared/constants/cliTools.ts`. The internal helper `bin/cli-commands.mjs`
keeps the small set of "fully scriptable" tools that `omniroute setup` can write
config files for automatically.

### Current Catalog (v3.8.0)

| Tool               | ID            | Type / Config       | Install / Access                     | Auth                                |
| ------------------ | ------------- | ------------------- | ------------------------------------ | ----------------------------------- |
| **Claude Code**    | `claude`      | env / settings.json | `npm i -g @anthropic-ai/claude-code` | API key (Anthropic gateway)         |
| **OpenAI Codex**   | `codex`       | custom (toml)       | `npm i -g @openai/codex`             | API key (OpenAI)                    |
| **Factory Droid**  | `droid`       | custom              | bundled / CLI                        | API key                             |
| **Open Claw**      | `openclaw`    | custom              | bundled / CLI                        | API key                             |
| **Cursor**         | `cursor`      | guide (Cloud)       | Cursor desktop app                   | API key (Cloud Endpoint)            |
| **Windsurf**       | `windsurf`    | guide               | Windsurf desktop IDE                 | API key (BYOK)                      |
| **Cline**          | `cline`       | custom / VS Code    | `npm i -g cline` + VS Code ext       | API key                             |
| **Kilo Code**      | `kilo`        | custom / VS Code    | `npm i -g kilocode` + VS Code ext    | API key                             |
| **Continue**       | `continue`    | guide (config.yaml) | VS Code extension                    | API key                             |
| **Antigravity**    | `antigravity` | MITM                | OmniRoute built-in                   | API key (MITM proxy)                |
| **GitHub Copilot** | `copilot`     | custom / VS Code    | VS Code extension                    | API key (CLI fingerprint: `github`) |
| **OpenCode**       | `opencode`    | guide (json)        | `npm i -g opencode-ai`               | API key (OpenAI-compatible)         |
| **Hermes**         | `hermes`      | guide (json)        | install per docs                     | API key (OpenAI-compatible)         |
| **Amp CLI**        | `amp`         | guide (env)         | install per Sourcegraph docs         | API key (OpenAI-compatible)         |
| **Kiro AI**        | `kiro`        | MITM                | Amazon Kiro IDE / CLI                | API key (MITM proxy)                |
| **Qwen Code**      | `qwen`        | guide (json/env)    | `npm i -g @qwen-code/qwen-code`      | API key (OpenAI-compatible)         |
| **Custom CLI**     | `custom`      | custom-builder      | any OpenAI-compatible client         | API key                             |

> Notes:
>
> - "Web wrappers" like ChatGPT/Claude/Grok/Perplexity browser sessions are not
>   listed here. OmniRoute can proxy them through the `chatgpt-web`,
>   `claude-web`, `grok-web`, `perplexity-web`, `blackbox-web`,
>   `muse-spark-web` provider connections, but those are **provider connections**
>   (configured under `/dashboard/providers`), not CLI tools. They do not surface
>   as cards under `/dashboard/cli-tools`.
> - Tools marked **MITM** (Antigravity, Kiro) intercept the desktop app traffic
>   locally and require enabling the corresponding mitm endpoint in
>   `/dashboard/settings`.

### CLI fingerprint sync (Agents + Settings)

`/dashboard/agents` and `Settings > CLI Fingerprint` use
`src/shared/constants/cliCompatProviders.ts`. This keeps provider IDs aligned
with the CLI cards and legacy IDs.

| CLI ID                                                                                                                                        | Fingerprint Provider ID |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `kilo`                                                                                                                                        | `kilocode`              |
| `copilot`                                                                                                                                     | `github`                |
| `claude` / `codex` / `antigravity` / `kiro` / `cursor` / `windsurf` / `cline` / `opencode` / `hermes` / `amp` / `qwen` / `droid` / `openclaw` | same ID                 |

Legacy IDs still accepted for compatibility: `copilot`, `kimi-coding`, `qwen`.

---

### Step 1 — Get an OmniRoute API Key

1. Open the OmniRoute dashboard → **API Manager** (`/dashboard/api-manager`)
2. Click **Create API Key**
3. Give it a name (e.g. `cli-tools`) and select all permissions
4. Copy the key — you'll need it for every CLI below

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

# Kiro CLI (Amazon — requires curl + unzip)
apt-get install -y unzip   # on Debian/Ubuntu
curl -fsSL https://cli.kiro.dev/install | bash
export PATH="$HOME/.local/bin:$PATH"   # add to ~/.bashrc
```

**Verify:**

```bash
claude --version     # 2.x.x
codex --version      # 0.x.x
opencode --version   # x.x.x
cline --version      # 2.x.x
kilocode --version   # x.x.x (or: kilo --version)
qwen --version       # x.x.x
kiro-cli --version   # 1.x.x
```

---

### Step 3 — Set Global Environment Variables

Add to `~/.bashrc` (or `~/.zshrc`), then run `source ~/.bashrc`:

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
> e.g. `http://192.168.0.15:20128`.

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
> `alicode` / `openrouter` / `anthropic` / `gemini` providers instead.

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

**Test:** `qwen "say hello"`

---

#### Cursor (Desktop App)

> **Note:** Cursor routes requests through its cloud. For OmniRoute integration,
> enable **Cloud Endpoint** in OmniRoute Settings and use your public domain URL.

Via GUI: **Settings → Models → OpenAI API Key**

- Base URL: `https://your-domain.com/v1`
- API Key: your OmniRoute key

---

#### Windsurf (Desktop IDE)

> Official Windsurf docs currently describe BYOK for select Claude models plus
> enterprise URL/token settings, not a generic custom OpenAI-compatible provider.
> Test BYOK behavior in your environment before relying on this integration.

1. Open AI Settings inside Windsurf.
2. Select **Add custom provider** (OpenAI-compatible).
3. Base URL: `http://localhost:20128/v1`
4. API Key: your OmniRoute key
5. Pick a model from the OmniRoute catalog.

---

#### Hermes

```json
// Hermes config file
{
  "provider": {
    "type": "openai",
    "baseURL": "http://localhost:20128/v1",
    "apiKey": "sk-your-omniroute-key",
    "model": "claude-sonnet-4-6"
  }
}
```

---

#### Amp CLI (Sourcegraph)

```bash
export OPENAI_API_KEY="sk-your-omniroute-key"
export OPENAI_BASE_URL="http://localhost:20128/v1"
amp --model "claude-sonnet-4-6"

# Suggested shorthand aliases you can map locally:
# g25p -> gemini/gemini-2.5-pro
# g25f -> gemini/gemini-2.5-flash
# cs45 -> cc/claude-sonnet-4-5-20250929
# g54  -> gemini/gemini-3.1-pro-high
```

---

### Dashboard Auto-Configuration

The OmniRoute dashboard automates configuration for most tools:

1. Go to `http://localhost:20128/dashboard/cli-tools`
2. Expand any tool card
3. Select your API key from the dropdown
4. Click **Apply Config** (if the tool is detected as installed)
5. Or copy the generated config snippet manually

---

### Built-in Agents: Droid & Open Claw

**Droid** and **Open Claw** are AI agents built directly into OmniRoute — no
installation needed. They run as internal routes and use OmniRoute's model
routing automatically.

- Access: `http://localhost:20128/dashboard/agents`
- Configure: same combos and providers as all other tools
- No API key or CLI install required

---

## 2. Internal OmniRoute CLI

The `omniroute` binary (installed via `npm install -g omniroute` or bundled
with the desktop app) provides commands beyond running the server. The full
matrix is implemented in:

- `bin/omniroute.mjs` — entry point and `--help` text
- `bin/cli/index.mjs` — dispatcher for the supported subcommands
- `bin/cli/commands/setup.mjs`, `bin/cli/commands/doctor.mjs`,
  `bin/cli/commands/providers.mjs` — the three core subcommands

Other subcommands listed in `--help` (status, logs, combo, keys, mcp, a2a,
tunnel, backup, restore, quota, health, cache, env, completion, dashboard,
serve, stop, restart, open, update, test) are wired through
`bin/cli-commands.mjs` and require a running server for most of them.

### Server Lifecycle

```bash
omniroute                              # Start server (default port 20128)
omniroute --port 3000                  # Override port
omniroute --no-open                    # Don't auto-open browser
omniroute --mcp                        # Start as MCP server (stdio transport)
omniroute serve                        # Same as `omniroute`
omniroute stop                         # Stop the running server
omniroute restart                      # Restart the server
omniroute dashboard                    # Open dashboard in default browser
omniroute open                         # Alias for `dashboard`
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

| Var                           | Purpose                                      |
| ----------------------------- | -------------------------------------------- |
| `OMNIROUTE_SETUP_PASSWORD`    | Admin password (>=8 chars)                   |
| `OMNIROUTE_PROVIDER`          | Provider id (e.g. `openai`, `anthropic`)     |
| `OMNIROUTE_PROVIDER_NAME`     | Display name for the connection              |
| `OMNIROUTE_PROVIDER_BASE_URL` | Optional OpenAI-compatible base URL override |
| `OMNIROUTE_API_KEY`           | Provider API key                             |
| `OMNIROUTE_DEFAULT_MODEL`     | Optional default model                       |
| `DATA_DIR`                    | Override the OmniRoute data directory        |

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

### Other subcommands (via `cli-commands.mjs`)

These are dispatched in `bin/cli-commands.mjs` and assume a running OmniRoute
server, unless noted otherwise:

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

---

## Troubleshooting

| Error                                             | Cause                       | Fix                                                                         |
| ------------------------------------------------- | --------------------------- | --------------------------------------------------------------------------- |
| `Connection refused`                              | OmniRoute not running       | `omniroute serve` or `pm2 start omniroute`                                  |
| `401 Unauthorized`                                | Wrong API key               | Check in `/dashboard/api-manager`                                           |
| `No combo configured`                             | No active routing combo     | Set up in `/dashboard/combos`                                               |
| `invalid model`                                   | Model not in catalog        | Use `auto` or check `/dashboard/providers`                                  |
| CLI shows "not installed"                         | Binary not in PATH          | Check `which <command>`                                                     |
| `kiro-cli: not found`                             | Not in PATH                 | `export PATH="$HOME/.local/bin:$PATH"`                                      |
| `doctor` reports SQLite incompatible              | Wrong native binary         | `cd app && npm rebuild better-sqlite3`                                      |
| `doctor` reports `STORAGE_ENCRYPTION_KEY` missing | Encrypted creds without key | Set `STORAGE_ENCRYPTION_KEY` or `omniroute reset-encrypted-columns --force` |

---

## Quick Setup Script (One Command)

```bash
cat > my-setup.sh <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

# === Edit these ===
OMNIROUTE_URL="http://localhost:20128/v1"
OMNIROUTE_ANTHROPIC_URL="http://localhost:20128"
OMNIROUTE_KEY="sk-your-omniroute-key"
# ==================

# 1. Install the external CLIs
npm install -g \
  @anthropic-ai/claude-code \
  @openai/codex \
  opencode-ai \
  cline \
  kilocode \
  @qwen-code/qwen-code

# 2. Optional: Kiro CLI (needs unzip)
if ! command -v unzip >/dev/null 2>&1; then
  sudo apt-get install -y unzip
fi
curl -fsSL https://cli.kiro.dev/install | bash

# 3. Write the per-tool config files
mkdir -p ~/.claude ~/.codex ~/.config/opencode ~/.continue ~/.qwen

cat > ~/.claude/settings.json <<JSON
{
  "env": {
    "ANTHROPIC_BASE_URL": "${OMNIROUTE_ANTHROPIC_URL}",
    "ANTHROPIC_AUTH_TOKEN": "${OMNIROUTE_KEY}"
  }
}
JSON

cat > ~/.codex/config.yaml <<YAML
model: auto
apiKey: ${OMNIROUTE_KEY}
apiBaseUrl: ${OMNIROUTE_URL}
YAML

cat > ~/.qwen/.env <<ENV
OPENAI_API_KEY="${OMNIROUTE_KEY}"
OPENAI_BASE_URL="${OMNIROUTE_URL}"
OPENAI_MODEL="auto"
ENV

# 4. Append global env vars (idempotent guard)
if ! grep -q "OmniRoute Universal Endpoint" ~/.bashrc 2>/dev/null; then
  cat >> ~/.bashrc <<ENV

# OmniRoute Universal Endpoint
export OPENAI_BASE_URL="${OMNIROUTE_URL}"
export OPENAI_API_KEY="${OMNIROUTE_KEY}"
export ANTHROPIC_BASE_URL="${OMNIROUTE_ANTHROPIC_URL}"
export ANTHROPIC_AUTH_TOKEN="${OMNIROUTE_KEY}"
ENV
fi

# 5. Validate via the internal CLI
omniroute doctor || true
omniroute providers list || true

echo "All CLIs installed and configured for OmniRoute"
EOF
chmod +x my-setup.sh
./my-setup.sh
```
