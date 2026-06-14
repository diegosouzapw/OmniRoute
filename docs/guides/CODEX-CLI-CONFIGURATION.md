---
title: "Codex CLI — Configuration with OmniRoute"
version: 3.8.16
lastUpdated: 2026-06-08
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
model_max_output_tokens        = 65536    # max tokens per response (model cap = 128k)
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
> | Access | URL |
> |--------|-----|
> | Local network | `http://192.168.0.1:20128/v1` |
> | Tailscale | `http://100.x.x.x:20128/v1` |
> | Loopback | `http://localhost:20128/v1` |

---

## `wire_api = "responses"` — why it works for all models

Codex CLI deprecated `wire_api = "chat"` (Chat Completions) in February 2026 and now **requires** `wire_api = "responses"` (OpenAI Responses API).

DeepSeek and Mistral only expose a Chat Completions endpoint — not the Responses API. If you pointed Codex directly at DeepSeek or Mistral, it would fail with a 404.

**OmniRoute solves this transparently:**

```
Codex CLI
  → wire_api = "responses"
  → POST /v1/responses (OmniRoute)
    → OmniRoute Responses ↔ Chat Completions transformer
    → POST /chat/completions (DeepSeek / Mistral / any provider)
```

You never need a separate translation proxy (`codex-relay`, `LiteLLM`, etc.) when using OmniRoute. **All models use `wire_api = "responses"`** — OmniRoute handles the rest.

---

## Context window and compaction

### Why this matters

If the session history exceeds the model's context window, the Codex CLI either crashes or truncates silently. Different models have very different limits — setting these explicitly prevents surprises.

### Token configuration fields

| Field | Description |
|-------|-------------|
| `model_context_window` | Total token budget for the active model. Set to the model's advertised limit. |
| `model_auto_compact_token_limit` | Threshold that triggers automatic history compaction. **Maximum: 90% of `model_context_window`** — values above 90% are silently ignored. |
| `model_max_output_tokens` | **Maximum tokens per response** (equivalent to Claude's `CLAUDE_CODE_MAX_OUTPUT_TOKENS`). Caps the output sent to the API on every request. Exists in CLI config since mid-2025 (Issue #4138, now fixed). |
| `tool_output_token_limit` | Cap on tokens stored per tool call output in history. Prevents a single large tool response from filling the window. **This is not the max output** — it is a history storage cap. |
| `compact_prompt` | Inline override for the system prompt used during compaction. |
| `experimental_compact_prompt_file` | Load the compaction prompt from a file (experimental). |

> **`model_max_output_tokens` vs `tool_output_token_limit`**: these are two different things.
> - `model_max_output_tokens` = max tokens the model may produce in a single API response.
> - `tool_output_token_limit` = max tokens stored per tool call in the session history.

### Context windows and output caps by model

| Model | OmniRoute ID | Context window | Max output (model) | `model_max_output_tokens` | `auto_compact` | `tool_output_limit` |
|-------|-------------|----------------|--------------------|---------------------------|----------------|----------------------|
| GPT-5.5 | `cx/gpt-5.5` | 1,050,000 (400k reliable) | **128,000** | 65,536 | 350,000 | 32,768 |
| DeepSeek V4 Pro | `ds/deepseek-v4-pro` | 1,000,000 | **384,000** | 65,536 | 900,000 | 65,536 |
| Mistral Large Latest | `mistral/mistral-large-latest` | 262,144 (256k) | ~128,000 | 32,768 | 220,000 | 16,384 |

> **Why not set `model_max_output_tokens` to the model's maximum?**
> For a coding assistant that writes whole files and long diffs, 64k (65,536) is a practical sweet spot. The model can generate files up to ~50k tokens without hitting the cap. Reserve the higher limits for edge cases — they increase cost on every request regardless of output length.

> **Compaction formula:** `effective_window = model_context_window - min(model_max_output_tokens, 20000)`. Values above 20k do not reduce the compaction trigger — the formula caps the output reservation at 20k. So setting `model_max_output_tokens = 65536` does not require lowering `model_auto_compact_token_limit`.

> **Rule of thumb:** set `model_auto_compact_token_limit` to 85–90% of `model_context_window`. Never go above 90% — it is silently ignored.

### How compaction works

When the session history exceeds `model_auto_compact_token_limit`, Codex CLI automatically summarises older turns into a compact form. The session continues without interruption — you lose verbatim history but keep context. This is different from truncation (which loses context).

For models with smaller windows (Mistral 256k), compaction fires earlier and more often. Setting a tighter `tool_output_token_limit` reduces how fast the window fills with tool call results.

---

## Model prefix: `cx/`

All Codex models in OmniRoute use the `cx/` prefix:

| Codex CLI name | OmniRoute model |
|----------------|-----------------|
| `cx/gpt-5.5` | GPT-5.5 standard |
| `cx/gpt-5.4` | GPT-5.4 standard |
| `cx/gpt-5.4-mini` | GPT-5.4 mini |
| `cx/gpt-5.1-codex-mini` | GPT-5.1 Codex mini |

Other providers use their own prefix (`ds/`, `mistral/`, etc.) — the prefix matches the OmniRoute provider alias.

> **Never use bare `gpt-5.5` or `codex/gpt-5.5`** — OmniRoute does not recognize those formats for the Codex provider.

---

## Reasoning Effort

Controls how much the model "thinks" before responding. Higher effort = better quality, higher latency and cost.

### Available values

| Value | Recommended for |
|-------|-----------------|
| `none` | No reasoning — direct response |
| `low` | Trivial tasks (rename a variable, format code) |
| `medium` | **Server default** when not specified |
| `high` | Intermediate tasks (refactoring, debugging) |
| `xhigh` | Architecture, deep analysis, complex problems |

> **Note:** `model_reasoning_effort` applies to models that support reasoning (GPT-5.x, DeepSeek V4 Pro). Mistral Large does not expose a reasoning effort parameter — setting it has no effect on Mistral.

### How to configure

**In `config.toml` (global default):**
```toml
model_reasoning_effort = "xhigh"
```

**Per invocation via `-c` (overrides global):**
```bash
codex -c model_reasoning_effort=low "rename variable x to count"
codex -c model_reasoning_effort=xhigh "design the auth module architecture"
```

**Combining model and effort:**
```bash
codex -m cx/gpt-5.4 -c model_reasoning_effort=medium "refactor the handler"
```

> **About the default:** If `model_reasoning_effort` is not set, OmniRoute falls back to `"medium"`. Set it explicitly for serious engineering work.

---

## Selecting a model via the CLI

### 1. `--model` / `-m` flag — per invocation

```bash
codex -m cx/gpt-5.5 "analyze the full pipeline"
codex -m ds/deepseek-v4-pro "deep analysis of this algorithm"
codex -m mistral/mistral-large-latest "quick review"
```

**Priority:** CLI flags > profiles > config.toml

### 2. `/model` — interactive switch inside a session

During an open session, type `/model` + Enter to open the model picker.

### 3. `-c key=value` — inline override for any field

```bash
# Change context window for one run
codex -m ds/deepseek-v4-pro -c model_context_window=1000000 -c model_auto_compact_token_limit=900000 "task"
```

---

## Profiles — named usage profiles

Profiles let you have named configurations for different workflows. Each profile is a file at `~/.codex/<name>.config.toml` that layers on top of the base `config.toml`.

> **Naming rule (Codex CLI v0.137+):** the file must be named `~/.codex/<name>.config.toml` — **no `profile-` prefix**. The CLI resolves `-p chat` to `~/.codex/chat.config.toml`. If the file is not found, the default silently applies with no error.

### How to use

```bash
codex --profile deepseek "analyze 10k lines of this codebase"
codex --profile mistral "quick code review"
codex --profile low "rename variable"
codex -p chat "explain this function"
```

### All available profiles

#### `chat.config.toml` — no reasoning effort (server default = medium)
```toml
model          = "cx/gpt-5.5"
model_provider = "omniroute"
# No model_reasoning_effort — uses server default (medium)
```

#### `low.config.toml` / `medium.config.toml` / `high.config.toml` / `xhigh.config.toml`
```toml
model                  = "cx/gpt-5.5"
model_reasoning_effort = "low"   # or medium / high / xhigh
model_provider         = "omniroute"
```
Context window is inherited from `config.toml` (400k for gpt-5.5).

#### `deepseek.config.toml` — DeepSeek V4 Pro, 1M context
```toml
model          = "ds/deepseek-v4-pro"
model_provider = "omniroute"

model_context_window           = 1000000
model_auto_compact_token_limit = 900000
model_max_output_tokens        = 65536    # practical cap; model max = 384k
tool_output_token_limit        = 65536
```

#### `mistral.config.toml` — Mistral Large Latest, 256k context
```toml
model          = "mistral/mistral-large-latest"
model_provider = "omniroute"

model_context_window           = 262144
model_auto_compact_token_limit = 220000
model_max_output_tokens        = 32768    # ~32k; Mistral Large model max ~128k
tool_output_token_limit        = 16384
```

### Quick decision table

| Task | Profile |
|------|---------|
| Rename, format, boilerplate | `--profile low` |
| Explain, light PR review | `--profile chat` |
| Debug, moderate refactor | `--profile medium` |
| New feature, complex tests | `--profile high` |
| Architecture, system analysis | `--profile xhigh` (default) |
| Long codebase analysis (needs 1M ctx) | `--profile deepseek` |
| Quick tasks, cost-conscious | `--profile mistral` |

---

## Multiple models and servers

### Multiple models — same server

Change only `model` and `model_provider` (and context window fields if the model differs):

```toml
model                         = "ds/deepseek-v4-pro"
model_provider                = "omniroute"
model_context_window          = 1000000
model_auto_compact_token_limit = 900000
```

### Multiple servers

```toml
model          = "cx/gpt-5.5"
model_provider = "omniroute-main"

[model_providers.omniroute-main]
name                 = "OmniRoute (Main)"
base_url             = "http://192.168.0.1:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
wire_api             = "responses"

[model_providers.omniroute-tailscale]
name                 = "OmniRoute (Tailscale)"
base_url             = "http://100.x.x.x:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
wire_api             = "responses"

[model_providers.omniroute-staging]
name                 = "OmniRoute (Staging)"
base_url             = "http://192.168.0.2:20128/v1"
env_key              = "OMNIROUTE_STAGING_KEY"
requires_openai_auth = false
wire_api             = "responses"
```

> All providers use `wire_api = "responses"` — OmniRoute handles translation for each upstream provider internally.

---

## Claude Code — equivalent configuration

Claude Code (Anthropic's CLI) uses a different mechanism for the same concept: environment variables in `~/.bashrc` / `~/.zshrc`.

| Codex CLI (`config.toml`) | Claude Code (env var) | Effect |
|---------------------------|-----------------------|--------|
| `model_max_output_tokens = 65536` | `CLAUDE_CODE_MAX_OUTPUT_TOKENS=65536` | Max tokens per response |
| `model_context_window = 400000` | *(determined by the model — not configurable)* | Context window |
| `tool_output_token_limit = 32768` | *(not directly exposed)* | Per-tool history cap |

```bash
# ~/.bashrc — Claude Code token cap (equivalent to Codex model_max_output_tokens)
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=65536
```

> **Why 64k and not 128k?** The Claude 4.x family supports up to 128k output, but for interactive coding sessions 64k covers any file or diff you realistically generate. Setting 128k reserves the full slot on every request, which increases latency and cost even for short responses. Use 128k only for batch/document-generation workflows where you routinely need very long outputs.

---

## About `[notice.model_migrations]`

Auto-generated by the Codex CLI to record acknowledged deprecation warnings. **Not an alias system** — safe to ignore.

---

## Quick reference — CLI flags

| Flag | Short | Effect |
|------|-------|--------|
| `--model <id>` | `-m` | Overrides `model` for the current invocation |
| `--profile <name>` | `-p` | Loads `~/.codex/<name>.config.toml` |
| `--config key=value` | `-c` | Overrides any config.toml field |
| `--enable <feature>` | — | Force-enables a feature flag |
| `--disable <feature>` | — | Force-disables a feature flag |

Inside an interactive session:

| Command | Effect |
|---------|--------|
| `/model` | Opens the model picker |
| `/help` | Lists all slash commands |

---

## Troubleshooting

**`Error: model not found`**
Verify the model exists in OmniRoute with the correct prefix. Open `/dashboard/providers/<provider>` and check available models.

**`Authentication error`**
Confirm `OMNIROUTE_API_KEY` is exported: `echo $OMNIROUTE_API_KEY`.

**`Connection refused`**
Verify OmniRoute is running and the `base_url` host/port is correct for your network (local vs Tailscale vs VPS).

**Session crashes near context limit**
Set `model_context_window` and `model_auto_compact_token_limit` explicitly for the model you are using. See the context window table above.

**Compaction fires too late / history is cut**
Lower `model_auto_compact_token_limit` to trigger compaction earlier (e.g. 75% of the window). Never set it above 90% — silently ignored.

**DeepSeek / Mistral returns 404**
You are likely pointing Codex directly at the provider API. Route through OmniRoute — it translates Responses API → Chat Completions automatically. Confirm `base_url` points to your OmniRoute instance, not directly to `api.deepseek.com` or `api.mistral.ai`.
