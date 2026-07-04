---
title: "Codex CLI — Configuration with OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Codex CLI — Configuration with OmniRoute

Complete guide for using the Codex CLI pointed at OmniRoute as an OpenAI-compatible backend.

---

## Ready-to-paste config.toml

Replace `<YOUR_HOST>` and `<YOUR_KEY>` with your values:

```toml
# ~/.codex/config.toml
model                          = "cx/gpt-5.5"
model_provider                 = "omniroute"
model_reasoning_effort         = "xhigh"
model_context_window           = 400000
model_auto_compact_token_limit = 350000
tool_output_token_limit        = 32768    # history storage cap per tool call

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://<YOUR_HOST>:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
wire_api             = "responses"
```

```bash
# ~/.bashrc or ~/.zshrc — actual key value, never in config.toml
export OMNIROUTE_API_KEY="<YOUR_KEY>"
```

> **Common host options**
>
> | Access        | URL                           |
> | ------------- | ----------------------------- |
> | Local network | `http://192.168.0.1:20128/v1` |
> | Tailscale     | `http://100.x.x.x:20128/v1`   |
> | Loopback      | `http://localhost:20128/v1`   |

---

## `wire_api = "responses"` — why it works for all models

Codex CLI deprecated `wire_api = "chat"` (Chat Completions) in February 2026 and now **requires** `wire_api = "responses"` (OpenAI Responses API). Setting `wire_api = "chat"` causes an immediate startup crash since v0.138.

DeepSeek, GLM, Kimi and others only expose a Chat Completions endpoint — not the Responses API. If you pointed Codex directly at them, it would fail.

**OmniRoute solves this transparently:**

```
Codex CLI
  → wire_api = "responses"
  → POST /v1/responses (OmniRoute)
    → OmniRoute Responses ↔ Chat Completions transformer
    → POST /chat/completions (DeepSeek / Mistral / GLM / Kimi / any provider)
```

You never need a separate translation proxy when using OmniRoute. **All models use `wire_api = "responses"`** — OmniRoute handles the rest.

> **`wire_api` is the default** — the field defaults to `"responses"` and can be omitted entirely from `config.toml`. Only ever set it explicitly if you're documenting intent.

---

## Context window and compaction

### Token configuration fields

| Field                            | Description                                                                                                                                                                        |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model_context_window`           | Total token budget for the active model. Set to the model's advertised limit.                                                                                                      |
| `model_auto_compact_token_limit` | Threshold that triggers automatic history compaction. **Maximum: 90% of `model_context_window`** — values above 90% are silently ignored.                                          |
| `tool_output_token_limit`        | Cap on tokens stored per tool call output in history. Prevents a single large tool response from filling the window. **This is not the max output** — it is a history storage cap. |
| `compact_prompt`                 | Inline override for the system prompt used during compaction (v0.138+).                                                                                                            |

> **Note on `model_max_output_tokens`**: This field is **not part of the Codex CLI config schema** (absent from the Codex Rust codebase). It is silently ignored if set. Do not rely on it — use `tool_output_token_limit` to control how much tool output is stored in history.

### Context windows by model

| Model                                | OmniRoute ID                         | Context window         | `auto_compact` | `tool_output_limit` |
| ------------------------------------ | ------------------------------------ | ---------------------- | -------------- | ------------------- |
| GPT-5.5                              | `cx/gpt-5.5`                         | 400k reliable (1M max) | 350,000        | 32,768              |
| Kimi K2.7 (thinking)                 | `kmc/kimi-k2.7`                      | 131,072                | 112,000        | 32,768              |
| Kimi K2.6                            | `kmc/kimi-k2.6`                      | 131,072                | 112,000        | 32,768              |
| GLM-5.2 / 5.2-max (thinking)         | `glm/glm-5.2`                        | 131,072                | 112,000        | 32,768              |
| MiMo V2.5 Pro (thinking)             | `opencode-go/mimo-v2.5-pro`          | 131,072                | 112,000        | 32,768              |
| Qwen 3.7 Plus (thinking)             | `opencode-go/qwen3.7-plus`           | 32,768                 | 28,000         | 16,384              |
| DeepSeek V4 Pro (OllamaCloud)        | `ollamacloud/deepseek-v4-pro`        | 131,072                | 112,000        | 32,768              |
| DeepSeek V4 Pro                      | `ds/deepseek-v4-pro`                 | 1,000,000              | 900,000        | 65,536              |
| MiMo V2.5                            | `opencode-go/mimo-v2.5`              | 131,072                | 112,000        | 32,768              |
| Gemma 4 31B (OllamaCloud)            | `ollamacloud/gemma4:31b`             | 32,768                 | 28,000         | 16,384              |
| Nemotron 3 Super (OllamaCloud)       | `ollamacloud/nemotron-3-super`       | 32,768                 | 28,000         | 16,384              |
| GPT-OSS 20B (OllamaCloud)            | `ollamacloud/gpt-oss:20b`            | 32,768                 | 28,000         | 16,384              |
| DeepSeek V4 Flash (OllamaCloud)      | `ollamacloud/deepseek-v4-flash`      | 65,536                 | 56,000         | 16,384              |
| Gemini 3 Flash Preview (OllamaCloud) | `ollamacloud/gemini-3-flash-preview` | 1,000,000              | 850,000        | 32,768              |
| GLM-5 Turbo                          | `glm/glm-5-turbo`                    | 131,072                | 112,000        | 16,384              |
| GLM-4.7 Flash                        | `glm/glm-4.7-flash`                  | 131,072                | 112,000        | 16,384              |
| Mistral Large Latest                 | `mistral/mistral-large-latest`       | 262,144                | 220,000        | 16,384              |

> **Compaction formula:** `effective_window = model_context_window - min(tool_output_token_limit, 20000)`. Values above 20k do not change the compaction trigger.

> **Rule of thumb:** set `model_auto_compact_token_limit` to 85–88% of `model_context_window`. Never go above 90% — silently ignored.

---

## Model prefix: `cx/`

All Codex models in OmniRoute use the `cx/` prefix:

| Codex CLI name          | OmniRoute model    |
| ----------------------- | ------------------ |
| `cx/gpt-5.5`            | GPT-5.5 standard   |
| `cx/gpt-5.4`            | GPT-5.4 standard   |
| `cx/gpt-5.4-mini`       | GPT-5.4 mini       |
| `cx/gpt-5.1-codex-mini` | GPT-5.1 Codex mini |

Other providers use their own prefix (`kmc/`, `glm/`, `ds/`, `ollamacloud/`, `opencode-go/`, `mistral/`) — the prefix matches the OmniRoute provider alias.

---

## Reasoning Effort

Controls how much the model "thinks" before responding.

| Value    | Use for                                       |
| -------- | --------------------------------------------- |
| `none`   | No reasoning — direct response                |
| `low`    | Trivial tasks (rename, format)                |
| `medium` | **Server default** when not specified         |
| `high`   | Intermediate tasks (refactoring, debug)       |
| `xhigh`  | Architecture, deep analysis, complex problems |

```bash
# Per invocation override
codex -c model_reasoning_effort=low "rename variable x to count"
codex -c model_reasoning_effort=xhigh "design the auth module"
```

---

## Profiles — named configurations per model/workflow

Profiles let you switch model + context window with a single flag. Each profile is a flat
`~/.codex/<name>.config.toml` that overlays on top of the base `config.toml`.

> **Naming rule (Codex CLI v0.137+):** file must be `~/.codex/<name>.config.toml` — **no `profile-` prefix**.
> The CLI resolves `-p kimi-k27` → `~/.codex/kimi-k27.config.toml`. If the file is not found, the default applies silently.

```bash
codex --profile kimi-k27 "analyze 10k lines of this codebase"
codex -p glm52 "architecture review"
codex --profile deepseek-flash "rename variable"   # fast, cheap
```

### Effort profiles (same model, different effort)

```bash
codex -p low      # cx/gpt-5.5, effort=low
codex -p medium   # cx/gpt-5.5, effort=medium
codex -p high     # cx/gpt-5.5, effort=high
codex -p xhigh    # cx/gpt-5.5, effort=xhigh (default)
codex -p chat     # cx/gpt-5.5, no effort set (server default)
```

### Thinking models (alto pensamento) — xhigh + detailed summary

| Profile      | Model                       | Context | Use for                      |
| ------------ | --------------------------- | ------- | ---------------------------- |
| `kimi-k27`   | `kmc/kimi-k2.7`             | 128k    | Best thinking quality (Kimi) |
| `glm52`      | `glm/glm-5.2`               | 128k    | GLM thinking                 |
| `glm52max`   | `glm/glm-5.2-max`           | 128k    | GLM thinking max             |
| `mimo-pro`   | `opencode-go/mimo-v2.5-pro` | 128k    | MiMo thinking                |
| `qwen37plus` | `opencode-go/qwen3.7-plus`  | 32k     | Qwen thinking                |

### Good models (bons) — high effort

| Profile        | Model                         | Context | Use for                           |
| -------------- | ----------------------------- | ------- | --------------------------------- |
| `kimi-k26`     | `kmc/kimi-k2.6`               | 128k    | General purpose (Kimi)            |
| `deepseek-pro` | `ollamacloud/deepseek-v4-pro` | 128k    | DeepSeek Pro via OllamaCloud      |
| `deepseek`     | `ds/deepseek-v4-pro`          | 1M      | DeepSeek Pro direct, huge context |
| `mimo`         | `opencode-go/mimo-v2.5`       | 128k    | MiMo general                      |

### Simple models (simples) — no reasoning effort

| Profile    | Model                          | Context | Use for                 |
| ---------- | ------------------------------ | ------- | ----------------------- |
| `gemma4`   | `ollamacloud/gemma4:31b`       | 32k     | Cost-effective, capable |
| `nemotron` | `ollamacloud/nemotron-3-super` | 32k     | NVIDIA Nemotron         |
| `gptoss`   | `ollamacloud/gpt-oss:20b`      | 32k     | Open-source GPT         |

### Fast models — low effort

| Profile          | Model                                | Context | Use for                 |
| ---------------- | ------------------------------------ | ------- | ----------------------- |
| `deepseek-flash` | `ollamacloud/deepseek-v4-flash`      | 64k     | Quick tasks             |
| `gemini-flash`   | `ollamacloud/gemini-3-flash-preview` | 1M      | Very fast, huge context |
| `glm5turbo`      | `glm/glm-5-turbo`                    | 128k    | GLM Turbo               |
| `glm47flash`     | `glm/glm-4.7-flash`                  | 128k    | GLM Flash               |
| `mistral`        | `mistral/mistral-large-latest`       | 256k    | Mistral Large           |

### Quick decision table

| Task                             | Recommended profile                              |
| -------------------------------- | ------------------------------------------------ |
| Rename, format, boilerplate      | `--profile deepseek-flash` or `-p low`           |
| Explain, light review            | `-p chat` or `-p gemini-flash`                   |
| Debug, moderate refactor         | `-p medium` or `-p kimi-k26`                     |
| New feature, complex tests       | `-p high` or `-p mimo`                           |
| Architecture, deep analysis      | `-p kimi-k27` or `-p glm52` or `-p xhigh`        |
| Codebase analysis (needs 1M ctx) | `--profile deepseek` or `--profile gemini-flash` |
| Maximum thinking quality         | `-p glm52max` or `-p mimo-pro`                   |
| Cost-conscious                   | `-p gemma4` or `-p gptoss`                       |

---

## Generating profiles automatically with `omniroute setup-codex`

If you run OmniRoute on a VPS, you can auto-generate profile files from the live model catalog:

```bash
# From a VPS (uses local OmniRoute on port 20128)
omniroute setup-codex

# From any machine — point at your VPS
omniroute setup-codex --remote http://100.x.x.x:20128 --api-key sk-xxx

# Preview without writing files
omniroute setup-codex --remote http://100.x.x.x:20128 --dry-run

# Only generate GLM and Kimi profiles
omniroute setup-codex --only glm,kimi

# Write to a custom directory
omniroute setup-codex --codex-home /path/to/.codex
```

The command fetches `/v1/models`, uses tuned profiles for known models, falls back to catalog metadata for other compatible text models, and writes `~/.codex/<name>.config.toml` for each. Idempotent — safe to re-run.

OmniRoute can also **auto-sync** these same profile files after a successful provider model discovery/import changes the live catalog. This is **opt-in and off by default**: toggle it from the **CLI Code dashboard** ("CLI profile auto-sync" → Codex), or set `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES=true` (it also honors `CLI_ALLOW_CONFIG_WRITES`, on by default). When enabled it only writes separate `~/.codex/*.config.toml` profile files; it never changes the active/default `~/.codex/config.toml`, Codex-lb settings, auth, or provider selection.

---

## Launching Codex with `omniroute launch-codex`

Health-checks your OmniRoute instance before launching Codex:

```bash
# Launch against local OmniRoute (default port 20128)
omniroute launch-codex

# Launch with a specific profile
omniroute launch-codex --profile kimi-k27

# Launch against a remote VPS
omniroute launch-codex --remote http://100.x.x.x:20128/v1 --api-key sk-xxx

# Pass extra args to codex
omniroute launch-codex --profile glm52 -- --yolo "fix this bug"
```

---

## New Codex CLI features (v0.138–v0.141)

| Version | Feature                                                                                                                                                              |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| v0.138  | Desktop app handoff (`/app`), v2 personal access tokens, `--profile` as the exclusive profile selector (legacy in-file `[profiles]` tables crash on startup)         |
| v0.139  | `web_search = "live"` — native web search from code mode; `oneOf`/`allOf` in MCP tool schemas; `codex doctor` env diagnostics                                        |
| v0.140  | `/usage` token view in-session; `/import` from Claude Code sessions; `codex delete <SESSION_ID>` subcommand; Amazon Bedrock auth via `aws` object in provider config |
| v0.141  | E2E encrypted Noise relay for remote executors; SQLite WAL fix; P-521 TLS support                                                                                    |

### New `config.toml` fields (post-v0.137)

```toml
# Native web search (v0.139)
web_search = "live"   # "disabled" | "cached" | "live"

# Separate developer system prompt (v0.138)
developer_instructions = "Always prefer functional style."

# Custom compaction prompt
compact_prompt = "Summarise the above as bullet points."

# Route /review to a cheaper model
review_model = "glm/glm-5-turbo"

# OpenAI service tier
service_tier = "fast"   # "fast" | "flex"
```

### New `[model_providers.<id>]` fields

```toml
[model_providers.omniroute]
base_url             = "http://100.x.x.x:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false

# Static extra headers on every request
[model_providers.omniroute.http_headers]
"X-Custom-Header" = "value"

# Headers read from env vars
[model_providers.omniroute.env_http_headers]
"X-Trace-Id" = "TRACE_ID"

# Extra URL query params (useful for Azure api-version)
[model_providers.omniroute.query_params]
"api-version" = "2024-12-01-preview"
```

### Amazon Bedrock auth (v0.140)

```toml
[model_providers.bedrock]
base_url = "https://bedrock-runtime.us-east-1.amazonaws.com"

[model_providers.bedrock.aws]
profile = "default"   # ~/.aws/credentials profile
region  = "us-east-1"
```

---

## Multiple servers

```toml
[model_providers.omniroute-main]
base_url = "http://192.168.0.1:20128/v1"
env_key  = "OMNIROUTE_API_KEY"

[model_providers.omniroute-tailscale]
base_url = "http://100.x.x.x:20128/v1"
env_key  = "OMNIROUTE_API_KEY"
```

---

## Claude Code — equivalent configuration

| Codex CLI (`config.toml`)         | Claude Code (env var)                 | Effect                  |
| --------------------------------- | ------------------------------------- | ----------------------- |
| `tool_output_token_limit = 32768` | _(not directly exposed)_              | Per-tool history cap    |
| `model_context_window = 400000`   | _(determined by the model)_           | Context window          |
| —                                 | `CLAUDE_CODE_MAX_OUTPUT_TOKENS=65536` | Max tokens per response |

```bash
# ~/.bashrc — Claude Code token cap
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=65536
```

---

## Quick reference — CLI flags

| Flag                  | Short | Effect                                       |
| --------------------- | ----- | -------------------------------------------- |
| `--model <id>`        | `-m`  | Overrides `model` for this invocation        |
| `--profile <name>`    | `-p`  | Loads `~/.codex/<name>.config.toml`          |
| `--config key=value`  | `-c`  | Overrides any config.toml field (repeatable) |
| `--enable <feature>`  | —     | Force-enables a feature flag                 |
| `--disable <feature>` | —     | Force-disables a feature flag                |
| `--search`            | —     | Enable live web search for this invocation   |

New in v0.140:

```bash
codex delete <SESSION_ID>          # delete a session
codex delete <SESSION_ID> --force  # skip confirmation
codex debug models --bundled       # list bundled model catalog as JSON
```

Inside an interactive session:

| Command   | Effect                                      |
| --------- | ------------------------------------------- |
| `/model`  | Opens the model picker                      |
| `/usage`  | Shows token usage for this session (v0.140) |
| `/app`    | Hands off to the desktop app (v0.138)       |
| `/import` | Import a Claude Code session (v0.140)       |
| `/help`   | Lists all slash commands                    |

---

## Troubleshooting

**`Error: wire_api = "chat" is no longer supported`**
Remove `wire_api = "chat"` from your config. Set `wire_api = "responses"` or omit the field (defaults to `"responses"` since v0.138).

**`Error: model not found`**
Verify the model exists in OmniRoute with the correct prefix. Use `omniroute models list` or open `/dashboard/providers/<provider>`.

**`Authentication error`**
Confirm `OMNIROUTE_API_KEY` is exported: `echo $OMNIROUTE_API_KEY`.

**`Connection refused`**
Verify OmniRoute is running and the `base_url` host/port is correct for your network (local vs Tailscale vs VPS).

**Session crashes near context limit**
Set `model_context_window` and `model_auto_compact_token_limit` explicitly. See the context window table above.

**Compaction fires too late**
Lower `model_auto_compact_token_limit` to 80–85% of the window. Never set above 90%.

**Profile not loading (`-p <name>` silently ignored)**
Confirm the file exists at `~/.codex/<name>.config.toml` (no `profile-` prefix). Run `ls ~/.codex/*.config.toml`.
