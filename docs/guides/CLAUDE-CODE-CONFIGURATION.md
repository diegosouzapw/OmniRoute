---
title: "Claude Code CLI — Configuration with OmniRoute"
version: 3.8.40
lastUpdated: 2026-09-25
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

## Usage attribution: sessions and projects

OmniRoute groups each API key's requests into **agent sessions** and records which **project**
each session worked on (`agent_sessions` table), so usage and cost can be reported per team member,
per project and per session.

What is recorded without any client setup:

| Field   | Source                                                                                                                                                         |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Session | `x-claude-code-session-id` header (same value as `metadata.user_id.session_id`), stable per session                                                            |
| Project | The `Primary working directory:` line Claude Code sends in its environment message; worktree folders under `.claude/worktrees/` resolve to the repository name |
| Branch  | `Current branch:` from the git status Claude Code sends with the first message                                                                                 |
| Client  | `user-agent` (`claude-cli/<version>`)                                                                                                                          |

Codex (`<environment_context><cwd>`) and OpenCode (`x-opencode-session`) are recognized the same
way. Keys with **no-log** enabled keep only the session id and header-supplied project fields;
nothing read from the prompt (path, branch) is stored.

### Naming the project explicitly (recommended)

The working directory differs between machines, so the same repository can show up under different
paths. Send the project explicitly instead: Claude Code adds any headers listed in
`ANTHROPIC_CUSTOM_HEADERS` to every model request, and OmniRoute reads two of them:

| Header                     | Value                                                       |
| -------------------------- | ----------------------------------------------------------- |
| `x-omniroute-project`      | Project name, e.g. `omniroute`                              |
| `x-omniroute-project-repo` | Normalized remote, e.g. `github.com/diegosouzapw/OmniRoute` |

Both are only read for attribution; they are never forwarded to the upstream provider.

`ANTHROPIC_CUSTOM_HEADERS` is read once at startup, and settings files store literal values, so
compute it when Claude Code launches. Add this to `~/.zshrc` or `~/.bashrc` and keep starting
`claude` from the project folder:

```bash
claude() {
  local common name repo
  if common=$(git rev-parse --path-format=absolute --git-common-dir 2>/dev/null); then
    name=$(basename "$(dirname "$common")")  # repository name, also inside worktrees
    repo=$(git remote get-url origin 2>/dev/null \
      | sed -E 's#^[a-zA-Z][a-zA-Z0-9+.-]*://([^@/]*@)?##; s#^[^@/]+@([^:]+):#\1/#; s#\.git$##')
  else
    name=$(basename "$PWD")                  # not a git repository: folder name
  fi
  ANTHROPIC_CUSTOM_HEADERS="x-omniroute-project: ${name}${repo:+
x-omniroute-project-repo: ${repo}}" command claude "$@"
}
```

The `sed` expression strips any credentials embedded in the remote URL. IDE extensions launch
Claude Code without your shell, so their sessions fall back to the working directory.

### Team reports

**Analytics → Team Reports** (`/dashboard/analytics/team-reports`) rolls these sessions up for
whoever manages the team's API keys: cost, tokens, requests and errors per member (API key),
project, client, provider, model, account and day, plus the session list with its latest
requests. Filters cover a from/to date-time window, member, project, client, provider and
account, and every table can be sorted and exported as CSV.

The numbers come from the individual requests, so a session that fell back from one provider to
another is split across both, and the window counts only the requests inside it. Cost is priced
from the token counts with the current pricing table. The same data is available to management
callers at `GET /api/reports/summary`, `GET /api/reports/sessions`,
`GET /api/reports/sessions/{id}` and `GET /api/reports/export?type=…`.

---

## Discovery aliases — surface non-Claude models in the `/model` picker

Claude Code's gateway model discovery only lists ids that begin with `claude`
or `anthropic`, so with `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1` the native
`/model` picker normally shows **only** OmniRoute's Claude/Anthropic models — a
`kimi/kimi-k2.6` or `glm/glm-5.2` never appears, even though it routes fine.

OmniRoute can mirror any enabled model (and combo) under a `claude/…` id so it
passes that filter and shows up in the picker:

```
kimi/kimi-k2.6            →  claude/kimi/kimi-k2.6      "Kimi K2.6 (OmniRoute)"
glm/glm-5.2              →  claude/glm/glm-5.2         "GLM 5.2 (OmniRoute)"
<combo "custo-otimizado"> →  claude/combo/custo-otimizado
```

When you pick one of these in Claude Code, OmniRoute strips the `claude/` wrapper
back to the real id before routing — a genuine `claude/<real-claude-model>` id
(the actual Claude OAuth provider) is always left untouched.

**This is off by default** and controlled by a three-level gate (most specific
wins), so a plain OmniRoute never doubles its catalog for clients that don't use
Claude Code:

| Level    | Where                                                                  |
| -------- | ---------------------------------------------------------------------- |
| Model    | Provider detail page → per-model "Expose in Claude Code" toggle        |
| Provider | Provider detail page → provider-level toggle (covers all its models)   |
| Global   | Settings → Feature Flags → `EXPOSE_CC_DISCOVERY_ALIASES` (default off) |

The `EXPOSE_CC_DISCOVERY_ALIASES` environment variable forces the global level on
and takes precedence over the dashboard override (the Feature Flags screen shows
an "active via environment variable" note when it does). Per-provider and
per-model toggles refine from there — e.g. global off + Kimi provider on exposes
only Kimi's models.

> ⚠️ **Window mismatch on non-Claude models.** Claude Code assumes a 200K context
> window for any id it doesn't recognize (it can't read a real window from
> `/v1/models`). For a model with a larger window (e.g. Kimi K2's 256K), set
> `CLAUDE_CODE_AUTO_COMPACT_WINDOW` to a value below the model's real window so
> auto-compaction doesn't fire prematurely. The generated profiles above already
> do this per model.

---

## Onboarding block on the dashboard

The Claude tool card (**Dashboard → CLI Code**) renders the exact `settings.json` fragment
for this instance, next to the discovery-alias info button, with a copy button:

```jsonc
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://<your OmniRoute>:20128",
    "ANTHROPIC_AUTH_TOKEN": "<your OmniRoute API key>",
    "CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY": "1",
  },
}
```

The base URL is the one resolved by the card (including a custom override you typed), already
normalized — no `/v1` suffix, no trailing slash. **The key is never rendered**: the block ships a
placeholder, so a screenshot or a pasted snippet cannot leak one. Paste your key over it.

Add `CLAUDE_CODE_AUTO_COMPACT_WINDOW` under the same `env` block for any model whose real
context window is not 200K — Claude Code assumes 200K for every id it does not recognize, so
auto-compaction otherwise fires at the wrong point (see the warning in the previous section).
The snippet builder accepts that value too, so a caller that knows the target model's window
can emit it directly.

Source: `src/shared/services/claudeCliConfig.ts::buildClaudeDiscoverySettingsSnippet` (pure
builder, unit-tested) rendered by `ClaudeGatewayOnboardingBlock`.

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

**Auto-sync after model discovery (opt-in).** OmniRoute can regenerate these same
`~/.claude/profiles/<name>/settings.json` files automatically whenever a provider model
sync changes the live catalog — so new/renamed models get profiles without re-running the
command. It is **off by default**: toggle it from the **CLI Code dashboard** ("CLI profile
auto-sync" → Claude Code), or set `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES=true` (it also honors
`CLI_ALLOW_CONFIG_WRITES`, on by default). When enabled it only writes profile files; it never
changes your active/default Claude config, auth, or the `~/.claude/settings.json`.

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
v2.1.219+ and `CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1`. Only `claude*` /
`anthropic*` model IDs appear in the picker; force any other model with
`ANTHROPIC_MODEL=<id>` (this is what profiles do).

**`400 Ambiguous model 'claude-…'`** — Claude Code always sends **unprefixed**
model IDs (e.g. `claude-opus-4-8`), so when both the Claude Code (`cc/…`) and
Claude (`claude/…`) providers are connected the bare id matches two routes and
OmniRoute refuses to guess. Fix it either way: pin a prefixed id with
`ANTHROPIC_MODEL=cc/claude-opus-4-8`, or enable **Prefer Claude Code for
unprefixed Claude models** — the toggle on the Claude provider page, or
`OMNIROUTE_PREFER_CLAUDE_CODE_FOR_UNPREFIXED_CLAUDE_MODELS=true` (default off;
see [Environment](../reference/ENVIRONMENT.md)) — which routes bare `claude-*`
IDs to Claude Code instead. Explicit provider prefixes always win.

**Auth errors** — the profile holds no token. Use `omniroute launch --profile`
(injects it) or export `ANTHROPIC_AUTH_TOKEN`.

**Profiles don't isolate** — each profile is a distinct `CLAUDE_CONFIG_DIR`;
verify `echo $CLAUDE_CONFIG_DIR` inside the session points at
`~/.claude/profiles/<name>`.
