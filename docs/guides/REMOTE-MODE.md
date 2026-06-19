---
title: "Remote Mode — Drive a remote OmniRoute from your laptop"
version: 3.8.29
lastUpdated: 2026-06-19
---

# Remote Mode

Run the `omniroute` CLI on your laptop while OmniRoute itself runs somewhere else
(a VPS, a home server, another machine on your Tailnet). You log in once with
`omniroute connect`, and from then on **every** CLI command targets that remote
server — same commands, same output, just executed against the remote.

There is no second tool to install: remote mode is the regular `omniroute` CLI
plus scoped **access tokens**.

```bash
npm install -g omniroute                 # the normal CLI
omniroute connect 192.168.0.15           # log in (password → scoped token)
omniroute models list                    # ← now lists the REMOTE server's models
omniroute configure codex                # ← writes a local Codex profile from the remote catalog
```

---

## How it works

```
your laptop                              remote OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (password → token)         │
│  context: vps      │ ───────────────►  │ mints a scoped access token    │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ every management route, scope- │
│ writes configs     │ ◄───────────────  │ checked per the token's scope  │
│ LOCALLY            │                   └───────────────────────────────┘
└────────────────────┘
```

- **Contexts** store one server each (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` switches the active server; `default` is local.
- **Access tokens** (`oma_live_…`) authorize management commands. They are
  distinct from inference API keys (`sk-…`, used for `/v1/chat/completions`).
- Only the SHA-256 hash of a token is stored server-side. The plaintext is shown
  **once**, at creation.

---

## Connecting

### With the management password (bootstrap)

```bash
omniroute connect 192.168.0.15
# Management password for http://192.168.0.15:20128: ********
# ✔ Connected to http://192.168.0.15:20128 — context '192.168.0.15' (scope: admin)
```

The password flow mints an **admin** token by default (you hold the password, so
you already have full control). Downscope with `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Options: `--port <p>` (when the host has none), `--name <ctx>` (context name),
`--scope read|write|admin`. A full URL is honoured as-is:
`omniroute connect https://omni.example.com`.

### With a pre-generated token

Generate a scoped token in the dashboard (or with `omniroute tokens create`) and
paste it — no password needed:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

The CLI validates it via `GET /api/cli/whoami` and saves it as the active context.

---

## Scopes

Three levels, hierarchical (`admin ⊃ write ⊃ read`):

| Scope | Can do |
|-------|--------|
| `read`  | list/inspect — `models list`, `providers status`, `logs`, `usage`, `cost` |
| `write` | read **+** configure/apply — `setup-codex`, `keys add`, `config set`, combos |
| `admin` | write **+** manage — `tokens` CRUD, add providers, services, policy, oauth |

The server infers the scope each route requires from the HTTP method
(`GET`→read, mutations→write) plus an admin allowlist for sensitive surfaces
(`/api/cli/tokens`, `/api/providers` mutations, `/api/oauth`, `/api/services`, …).
A token with insufficient scope gets `403` with a clear message.

> Routes that spawn processes (`/api/services/*`, `/api/mcp/*`, …) stay
> **loopback-only** — a remote token can never reach them, regardless of scope.

---

## Managing tokens

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ prints the secret ONCE — copy it now
omniroute tokens list                 # masked: id, name, scope, prefix, status, expiry
omniroute tokens revoke <id|prefix>   # revoke immediately
omniroute tokens scopes               # explain the three scopes
```

`tokens` commands require an **admin** credential. You can also manage tokens in
the dashboard under **Settings → Access Tokens** (create, revoke, copy-once).

---

## Configuring a coding CLI from the remote catalog

`omniroute configure` reads the **active server's** live model catalog and writes
a config on **your** machine.

```bash
omniroute configure codex
#   Providers: glm, kmc, ollamacloud, opencode-go, …
#   Provider: glm
#   Model id: glm/glm-5.2
#   ✔ Wrote ~/.codex/glm52.config.toml
#   Use it:  codex --profile glm52

# non-interactive
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52
```

The written profile references the inference key by env var
(`OMNIROUTE_API_KEY`) — the secret is never written to disk. For the one-time
base Codex setup (the `[model_providers.omniroute]` block), see
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Per-CLI setup commands

Each supported CLI has a remote-aware setup command (all honour the active
context, or `--remote <url> --api-key <key>`):

| CLI | Command | What it writes |
|-----|---------|----------------|
| Codex | `omniroute setup-codex` | `~/.codex/<name>.config.toml` profiles (per model) |
| Claude Code | `omniroute setup-claude` | `~/.claude/profiles/<name>/settings.json` (per model) |
| OpenCode | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — the `omniroute` openai-compatible provider with every catalog model (run `opencode -m omniroute/<model>`) |
| Cline | `omniroute setup-cline` | `~/.cline/data/{globalState,secrets}.json` (CLI mode) + prints the VS Code extension settings to paste (OpenAI-compatible, Base URL **without** `/v1`) |
| Kilo Code | `omniroute setup-kilo` | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` settings — OpenAI-compatible, Base URL **with** `/v1` |
| Continue | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` **with** `/v1`, key via `${{ secrets.OMNIROUTE_API_KEY }}` |

```bash
# OpenCode (openai-compatible provider, all catalog models, remote VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # keep only matching models
opencode -m omniroute/glm/glm-5.2 "..."          # export OMNIROUTE_API_KEY first
```

> OpenCode also has a richer **plugin** integration: `omniroute setup opencode`
> (now remote-aware via `--remote`) installs `@omniroute/opencode-plugin`.
> `setup-opencode` is the lightweight openai-compatible alternative. The API key
> is referenced via `{env:OMNIROUTE_API_KEY}` — never written to disk.

---

## Switching back to local

```bash
omniroute contexts use default     # back to localhost
omniroute context current          # show active server, auth, scope
omniroute contexts list            # all contexts
```

---

## Security notes

- Token plaintext is shown once; only the SHA-256 hash is persisted (same as API keys).
- `omniroute connect` reuses the login brute-force lockout + audit logging.
- Prefer HTTPS or a Tailnet for the transport; a bare host defaults to `http://`
  for LAN/Tailscale convenience — pass a full `https://…` URL for TLS.
- The local context file is `~/.omniroute/config.json` (`chmod 600`); tokens are
  never printed in logs (masked to a prefix).

---

## API endpoints (reference)

| Method | Route | Auth | Scope |
|--------|-------|------|-------|
| POST | `/api/cli/connect` | management password | — (public, password-gated) |
| GET  | `/api/cli/whoami` | access token | read |
| GET  | `/api/cli/tokens` | access token | admin |
| POST | `/api/cli/tokens` | access token | admin |
| DELETE | `/api/cli/tokens/:id` | access token | admin |

See [openapi.yaml](../reference/openapi.yaml) for full schemas.
