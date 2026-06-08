---
name: config-codex-cli
description: Step-by-step agent workflow to configure the OpenAI Codex CLI on any machine (Linux, macOS, Windows) to use OmniRoute as backend. Detects OS and shell, writes config.toml and 7 named profiles, sets environment variables, and verifies the setup.
---

# /config-codex-cli — Codex CLI Configuration Workflow

Configure the Codex CLI on this machine to use an OmniRoute instance as backend.

After this skill completes, `codex` will use OmniRoute by default with `cx/gpt-5.5` (xhigh reasoning), 7 named profiles for quick switching, and proper token limits configured for each model.

---

## Step 0 — Collect required inputs from the user

Before doing anything, ask the user for the two required values. Do not proceed until both are provided:

1. **OmniRoute host** — the IP or hostname of the OmniRoute server (e.g. `192.168.0.1`, `100.x.x.x` for Tailscale, or `localhost`)
2. **OmniRoute API key** — the API key for OmniRoute (starts with `sk-`)

Store these as local variables for the rest of the skill:
- `OMNI_HOST` = the host the user provided (no trailing slash, no port — port 20128 is appended by this skill)
- `OMNI_KEY` = the API key

---

## Step 1 — Detect environment

Run the following to gather machine facts. Store results — they are used in later steps.

```bash
# OS detection
uname -s   # Linux / Darwin (macOS) / MINGW*/CYGWIN*/MSYS* = Windows/Git Bash

# Home directory
echo $HOME           # Linux / macOS / Git Bash
echo $USERPROFILE    # Windows native (PowerShell / cmd)

# Current shell
echo $SHELL          # Linux / macOS: /bin/bash, /bin/zsh, /bin/fish, etc.

# Shell profile file
# Resolve which file to append env vars to:
#   bash  → ~/.bashrc  (Linux) or ~/.bash_profile (macOS)
#   zsh   → ~/.zshrc
#   fish  → ~/.config/fish/config.fish
#   PowerShell (Windows) → $PROFILE (run: echo $PROFILE inside PowerShell)

# PATH and common tool directories (to populate shell_environment_policy later)
echo $PATH
which node 2>/dev/null && node --version
echo ${NVM_DIR:-not-set}
echo ${BUN_INSTALL:-not-set}
echo ${SDKMAN_DIR:-not-set}
echo ${JAVA_HOME:-not-set}
```

Based on the OS result, set the **Codex config directory**:
- Linux / macOS / Git Bash: `~/.codex/`
- Windows native (PowerShell): `$env:USERPROFILE\.codex\`

---

## Step 2 — Verify Codex CLI is installed

```bash
codex --version
```

If this fails, stop and tell the user to install the Codex CLI first:

```bash
npm install -g @openai/codex
```

Then re-run the skill from Step 1.

---

## Step 3 — Create the Codex config directory

```bash
mkdir -p ~/.codex   # Linux / macOS
# Windows PowerShell: New-Item -ItemType Directory -Force "$env:USERPROFILE\.codex"
```

---

## Step 4 — Write `~/.codex/config.toml`

Read the existing file first if it exists (to avoid overwriting MCP server entries, skills, projects, or notify configurations the user may already have).

If the file **does not exist**: create it with the full content below.

If the file **already exists**: apply only the fields listed in the "Model/Inference", "Behaviour", "Auth/Credentials", "Features", "TUI", "Notice", and "Model providers" sections — do **not** remove existing `[mcp_servers.*]`, `[projects.*]`, `[[skills.config]]`, or `notify` entries.

Replace `<OMNI_HOST>` with the value collected in Step 0.

**Content to write (or merge):**

```toml
# ── Model / Inference ─────────────────────────────────────────────────────────
model                    = "cx/gpt-5.5"
model_provider           = "omniroute"
model_reasoning_effort   = "xhigh"
model_reasoning_summary  = "detailed"
model_verbosity          = "high"
model_context_window           = 400000
model_auto_compact_token_limit = 350000
model_max_output_tokens        = 65536
tool_output_token_limit        = 32768

# ── Behaviour ─────────────────────────────────────────────────────────────────
approval_policy          = "never"
sandbox_mode             = "danger-full-access"
personality              = "pragmatic"
web_search               = "live"
check_for_update_on_startup = true

# ── Auth / Credentials ────────────────────────────────────────────────────────
cli_auth_credentials_store   = "file"
mcp_oauth_credentials_store  = "file"

# ── Features ──────────────────────────────────────────────────────────────────
[features]
shell_snapshot = true
unified_exec   = true
multi_agent    = true
memories       = true
js_repl        = true
apps           = false
terminal_resize_reflow = true

# ── TUI ───────────────────────────────────────────────────────────────────────
[tui]
theme       = "dracula"
status_line = ["model-with-reasoning", "current-dir", "context-remaining", "context-used", "five-hour-limit"]

[tui.model_availability_nux]
"gpt-5.5" = 4

# ── Shell environment passed into sandboxed commands ──────────────────────────
# Populate [shell_environment_policy.set] with the PATH and tool dirs discovered
# in Step 1. Only include paths that actually exist on this machine.
# Minimum required: SHELL.
[shell_environment_policy]
inherit               = "all"
experimental_use_profile = true

[shell_environment_policy.set]
SHELL = "<detected shell binary, e.g. /bin/bash or /bin/zsh>"
# Add any of the following that exist on this machine:
# PATH       = "<full PATH from Step 1>"
# NVM_DIR    = "<NVM_DIR from Step 1>"
# BUN_INSTALL = "<BUN_INSTALL from Step 1>"
# SDKMAN_DIR = "<SDKMAN_DIR from Step 1>"
# JAVA_HOME  = "<JAVA_HOME from Step 1>"

# ── Notice / UI flags ─────────────────────────────────────────────────────────
[notice]
hide_full_access_warning   = true
hide_rate_limit_model_nudge = true
fast_default_opt_out       = true

# ── Model providers ───────────────────────────────────────────────────────────
# env_key = NAME of the environment variable (not the value).
# The actual key is stored in the shell profile (Step 5), never here.
[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://<OMNI_HOST>:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
wire_api             = "responses"
```

> **TOML rule:** `[[skills.config]]` array-of-tables must be the **last** section in the file. If the file already has `[[skills.config]]` entries, keep them at the end after inserting the new provider block.

---

## Step 5 — Write profile files

> **Naming rule (Codex CLI v0.137+):** files must be `~/.codex/<name>.config.toml` — **no `profile-` prefix**. The CLI resolves `-p chat` to `~/.codex/chat.config.toml`. If the file is not found, the default applies silently with no error.

Create each file below in the Codex config directory (`~/.codex/`). If a file already exists, overwrite it.

### `chat.config.toml` — no reasoning (server default = medium)

```toml
model          = "cx/gpt-5.5"
model_provider = "omniroute"
```

### `low.config.toml`

```toml
model                  = "cx/gpt-5.5"
model_reasoning_effort = "low"
model_provider         = "omniroute"
```

### `medium.config.toml`

```toml
model                  = "cx/gpt-5.5"
model_reasoning_effort = "medium"
model_provider         = "omniroute"
```

### `high.config.toml`

```toml
model                  = "cx/gpt-5.5"
model_reasoning_effort = "high"
model_provider         = "omniroute"
```

### `xhigh.config.toml`

```toml
model                  = "cx/gpt-5.5"
model_reasoning_effort = "xhigh"
model_provider         = "omniroute"
```

### `deepseek.config.toml` — DeepSeek V4 Pro, 1M context

```toml
model          = "ds/deepseek-v4-pro"
model_provider = "omniroute"

model_context_window           = 1000000
model_auto_compact_token_limit = 900000
model_max_output_tokens        = 65536
tool_output_token_limit        = 65536
```

### `mistral.config.toml` — Mistral Large Latest, 256k context

```toml
model          = "mistral/mistral-large-latest"
model_provider = "omniroute"

model_context_window           = 262144
model_auto_compact_token_limit = 220000
model_max_output_tokens        = 32768
tool_output_token_limit        = 16384
```

---

## Step 6 — Set environment variables in the shell profile

Determine the correct shell profile file from Step 1, then append the following block **only if the variables are not already present**.

Before writing, check:
```bash
grep -l "OMNIROUTE_API_KEY" ~/.bashrc ~/.zshrc ~/.bash_profile 2>/dev/null
```

If the variable already exists in any profile file, update the value in-place instead of appending a duplicate.

**Block to append (replace `<OMNI_KEY>` with the key collected in Step 0):**

```bash
# OmniRoute API key — used by Codex CLI (env_key = "OMNIROUTE_API_KEY" in config)
export OMNIROUTE_API_KEY="<OMNI_KEY>"

# Codex CLI / Claude Code output cap (64k — covers any file or diff a coding assistant generates)
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=65536
```

**Shell profile file by OS/shell:**

| OS / Shell | Profile file |
|------------|-------------|
| Linux — bash | `~/.bashrc` |
| Linux — zsh | `~/.zshrc` |
| macOS — zsh (default) | `~/.zshrc` |
| macOS — bash | `~/.bash_profile` |
| Linux/macOS — fish | `~/.config/fish/config.fish` (use `set -Ux` syntax instead of `export`) |
| Windows — PowerShell | `$PROFILE` (run `echo $PROFILE` in PowerShell to get the path) |
| Windows — Git Bash | `~/.bashrc` |

**fish syntax:**

```fish
set -Ux OMNIROUTE_API_KEY "<OMNI_KEY>"
set -Ux CLAUDE_CODE_MAX_OUTPUT_TOKENS 65536
```

**PowerShell syntax:**

```powershell
[System.Environment]::SetEnvironmentVariable("OMNIROUTE_API_KEY", "<OMNI_KEY>", "User")
[System.Environment]::SetEnvironmentVariable("CLAUDE_CODE_MAX_OUTPUT_TOKENS", "65536", "User")
```

---

## Step 7 — Apply and verify

```bash
# Apply the shell profile (Linux/macOS)
source ~/.bashrc   # or ~/.zshrc depending on Step 1

# Verify variables are set
echo $OMNIROUTE_API_KEY              # must print the key
echo $CLAUDE_CODE_MAX_OUTPUT_TOKENS  # must print 65536

# Verify Codex picks up the provider
codex config get model_provider      # must print: omniroute

# Smoke test — must return a response without auth errors
codex -p chat "reply with only the word OK"
```

If the smoke test returns an authentication error:
- Re-check that `source ~/.bashrc` was run (or open a new terminal)
- Run `curl http://<OMNI_HOST>:20128/v1/models` to confirm OmniRoute is reachable
- Confirm the key is correct with `echo $OMNIROUTE_API_KEY`

---

## Reference — profiles quick table

| Profile | Command | Best for |
|---------|---------|----------|
| `chat` | `codex -p chat "..."` | Explain, light questions |
| `low` | `codex -p low "..."` | Rename, format, trivial edits |
| `medium` | `codex -p medium "..."` | Debug, moderate refactor |
| `high` | `codex -p high "..."` | New features, complex tests |
| `xhigh` | *(default)* | Architecture, deep analysis |
| `deepseek` | `codex -p deepseek "..."` | Long codebase analysis (1M context) |
| `mistral` | `codex -p mistral "..."` | Cost-conscious tasks |

Per-invocation overrides (bypass profiles entirely):

```bash
codex -m cx/gpt-5.5 -c model_reasoning_effort=low "rename var x to count"
codex -m ds/deepseek-v4-pro "analyze the entire repo"
```

---

## Reference — why `wire_api = "responses"` works for all models

Codex CLI deprecated `wire_api = "chat"` in February 2026. OmniRoute bridges the gap transparently:

```
Codex CLI  →  POST /v1/responses  →  OmniRoute  →  POST /chat/completions  →  DeepSeek / Mistral / any provider
```

All profiles use the same `wire_api = "responses"`. OmniRoute handles translation for every upstream provider.

---

## Reference — token fields

| Field | Controls |
|-------|----------|
| `model_context_window` | Total token budget |
| `model_auto_compact_token_limit` | Compaction trigger (max 90% of context window) |
| `model_max_output_tokens` | Max tokens per API response (sent on every request) |
| `tool_output_token_limit` | Max tokens stored per tool call in session history |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS` | Same concept for the Claude Code CLI |

---

*Full reference: `docs/guides/CODEX-CLI-CONFIGURATION.md` in the OmniRoute repository.*
