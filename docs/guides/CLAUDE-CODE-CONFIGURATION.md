---
title: "Claude Code CLI — Configuration with OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Claude Code CLI — Configuration with OmniRoute

Point the **Claude Code** CLI (`claude`) at OmniRoute — local or a remote VPS —
with per-model profiles, mirroring the Codex setup.

---

## Quick start

```bash
# Launch Claude Code against a local OmniRoute (auto-detects the active context)
omniroute launch

# Against a remote OmniRoute (after `omniroute connect <host>`, this is automatic)
omniroute launch --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Generate per-model profiles, then launch one
omniroute setup-claude            # writes ~/.claude/profiles/<name>/settings.json
omniroute launch --profile glm52  # Claude Code using glm/glm-5.2 via OmniRoute
```

---

## How Claude Code connects to a gateway

Claude Code talks the **Anthropic Messages API** and is pointed at a custom
endpoint with environment variables (it has no `--base-url` flag):

| Variable                                     | Purpose                                                                                |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| `ANTHROPIC_BASE_URL`                         | Gateway root URL (Claude Code appends `/v1/messages`). **No `/v1` suffix.**            |
| `ANTHROPIC_AUTH_TOKEN`                       | Sent as `Authorization: Bearer …` — use your OmniRoute access token / API key          |
| `ANTHROPIC_API_KEY`                          | Alternative: sent as `x-api-key`. If both set, `ANTHROPIC_AUTH_TOKEN` wins             |
| `ANTHROPIC_MODEL`                            | Force a specific model (overrides the `/model` picker default)                         |
| `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY` | `1` → the native `/model` picker lists `claude*`/`anthropic*` models from `/v1/models` |
| `CLAUDE_CODE_MAX_OUTPUT_TOKENS`              | Cap output tokens per response (e.g. `65536`)                                          |
| `CLAUDE_CODE_AUTO_COMPACT_WINDOW`            | Token threshold for auto-compaction                                                    |

> Env vars are read **once at startup** — restart Claude Code after changing them.

`omniroute launch` sets all of these for you: it resolves the base URL + token
from the active context (so `omniroute connect <vps>` then `omniroute launch`
just works), health-checks the server, and execs `claude`.

---

## Profiles (`CLAUDE_CONFIG_DIR`)

Claude Code has **no native profile files** (unlike Codex's `~/.codex/<name>.config.toml`).
The idiomatic mechanism is `CLAUDE_CONFIG_DIR` — a separate config directory per
profile, each with its own `settings.json`, credentials, history and cache.

`omniroute setup-claude` fetches the live `/v1/models` catalog and writes one
profile per model at `~/.claude/profiles/<name>/settings.json`, reusing the
**same names as `setup-codex`** (`glm52`, `kimi-k27`, `deepseek-pro`, …):

```jsonc
// ~/.claude/profiles/glm52/settings.json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "model": "glm/glm-5.2",
  "effortLevel": "xhigh",
  "env": {
    "ANTHROPIC_BASE_URL": "http://192.168.0.15:20128",
    "ANTHROPIC_MODEL": "glm/glm-5.2",
    "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY": "1",
    "CLAUDE_CODE_AUTO_COMPACT_WINDOW": "190000",
  },
}
```

> **The auth token is never written to the profile.** Launch with
> `omniroute launch --profile <name>` (it injects `ANTHROPIC_AUTH_TOKEN` from the
> active context), or export `ANTHROPIC_AUTH_TOKEN` yourself and run
> `CLAUDE_CONFIG_DIR=~/.claude/profiles/<name> claude`.

### Generating + using profiles

```bash
# Local OmniRoute
omniroute setup-claude

# Remote VPS (bakes the VPS URL into every profile)
omniroute setup-claude --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Only some providers
omniroute setup-claude --only glm,kimi

# Preview without writing
omniroute setup-claude --dry-run

# Launch a profile
omniroute launch --profile kimi-k27
```

---

## Model tiers (optional)

Claude Code routes to capability tiers. Map each to an OmniRoute model via env /
settings if you want different providers per tier:

```bash
export ANTHROPIC_DEFAULT_OPUS_MODEL="glm/glm-5.2"
export ANTHROPIC_DEFAULT_SONNET_MODEL="kmc/kimi-k2.6"
export ANTHROPIC_DEFAULT_HAIKU_MODEL="glm/glm-4.7-flash"
```

Otherwise a single `ANTHROPIC_MODEL` (what profiles set) is used for everything.

---

## Remote mode

Once you've run `omniroute connect <host>` (see
[Remote Mode](./REMOTE-MODE.md)), `omniroute launch` and `omniroute setup-claude`
automatically target that remote server and use its scoped access token — no
extra flags needed. Override per-invocation with `--remote` / `--api-key`.

---

## Troubleshooting

**Claude Code ignores the gateway** — confirm `ANTHROPIC_BASE_URL` has **no
`/v1`** and restart `claude` (env is read once at startup). `omniroute launch`
handles this for you.

**`/model` picker is empty / missing gateway models** — needs Claude Code
v2.1.129+ and `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1`. Only `claude*` /
`anthropic*` model IDs appear in the picker; force any other model with
`ANTHROPIC_MODEL=<id>` (this is what profiles do).

**Auth errors** — the profile holds no token. Use `omniroute launch --profile`
(injects it) or export `ANTHROPIC_AUTH_TOKEN`.

**Profiles don't isolate** — each profile is a distinct `CLAUDE_CONFIG_DIR`;
verify `echo $CLAUDE_CONFIG_DIR` inside the session points at
`~/.claude/profiles/<name>`.
