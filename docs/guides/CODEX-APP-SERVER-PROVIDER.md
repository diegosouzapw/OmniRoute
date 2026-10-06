---
title: "OpenAI Codex (App-Server) provider"
version: 3.8.50
lastUpdated: 2026-08-22
---

# OpenAI Codex — App-Server provider (`codex-app-server`)

OmniRoute exposes **two** ways to use OpenAI Codex:

| Provider | How it talks to OpenAI | Usage caveat |
|---|---|---|
| **`codex`** | Replays your ChatGPT/OpenAI OAuth token directly to the Responses API | **Yes** — the official session is not authorized for proxy/router use |
| **`codex-app-server`** | Drives the **Codex CLI's own `codex app-server`** over JSON-RPC/WebSocket; the CLI owns and self-refreshes its OAuth (`~/.codex/auth.json`) exactly like an interactive `codex` session | **No** — OmniRoute never replays a token to the API |

Because `codex-app-server` never replays a token, it does not carry the
session-replay usage caveat. It does require a **Codex CLI reachable at the
configured app-server URL**, and that CLI must be **signed in**.

---

## 1. Architecture

```
┌─ OmniRoute app ─────────────────┐        ┌─ codex-app-server sidecar ─────────┐
│  CodexAppServerExecutor          │  WS    │  codex app-server                   │
│  ws://codex-app-server:1456 ─────┼───────▶│  --listen ws://0.0.0.0:1456         │
│  (+ capability token)            │  JSON  │  --ws-auth capability-token         │
│                                  │  RPC   │  self-manages OpenAI OAuth          │
└──────────────────────────────────┘        │  (~/.codex/auth.json, auto-refresh) │
        │ shares (compose volumes)           └─────────────────────────────────────┘
        ▼
  codex-appserver-token   → the WS capability token (both mount it)
  codex-appserver-home    → ~/.codex (auth.json written by the dashboard,
                             read by the sidecar's codex app-server)
```

- The sidecar listens **only** on the internal compose network
  (`ws://codex-app-server:1456`) behind a capability token. It is **never**
  published to the host or internet.
- The Codex CLI is baked into `omniroute:base`, so no codex install is needed on
  the host or the user's machine when you run the sidecar.

## 2. Bring it up

```bash
# Start the stack WITH the codex app-server sidecar profile:
docker compose --profile base --profile codex-app-server up -d
# (podman: podman compose --profile base --profile codex-app-server up -d)
```

The sidecar mints its WS capability token on first boot (into the shared
`codex-appserver-token` volume) and the app reads the same token via
`OMNIROUTE_CODEX_APPSERVER_WS_TOKEN_FILE`. No manual token wiring needed.

## 3. Connect + sign in

1. In the dashboard, add a connection for **OpenAI Codex (App-Server)**. No API
   key or token is required (it's a no-auth provider — the sidecar owns auth).
2. If the sidecar's Codex CLI is **not yet signed in**, the connection health
   check reports *"running but not signed in"* (not a red auth error). Use
   **Sign in with ChatGPT**: this runs the standard Codex device-OAuth in your
   browser and then writes `~/.codex/auth.json` into the shared volume via
   **Apply auth** (the same one login serves both the `codex` and
   `codex-app-server` providers).
3. Once signed in, the health check goes green (it verifies both `/readyz` **and**
   `account/read` — i.e. up *and* authenticated) and turns work.

The dashboard never clobbers a healthy existing `~/.codex/auth.json` — it writes
only when the file is absent or its token is stale (a backup is always taken).

## 4. Deployment scenarios

- **Operator with an already-authenticated Codex CLI** — mount your host
  `~/.codex` into the sidecar (`codex-appserver-home`) and skip the sign-in step.
- **Public user, no codex installed locally** — irrelevant: the sidecar has the
  CLI. The user only authenticates through the dashboard.
- **Bare-metal OmniRoute (no sidecar, host codex)** — point
  `OMNIROUTE_CODEX_APPSERVER_WS` at your own `codex app-server` and ensure the
  host codex is signed in; the "codex not installed" hint appears if the binary
  is missing.

## 5. Residential / UDP egress (operator extra, not shipped)

The generic sidecar above egresses over the container's normal network. An
operator who needs Codex traffic to egress via a **residential exit** (e.g. a TUN
tailscale sidecar carrying TCP + UDP/QUIC) runs that as a separate compose
override; it is intentionally **not** part of the shipped `codex-app-server`
profile. See the internal operations runbook for that setup.
