---
title: "Tunnels Guide"
version: 3.8.0
lastUpdated: 2026-05-13
---

# Tunnels Guide

> **Source of truth:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Last updated:** 2026-05-13 — v3.8.0

OmniRoute can expose its local server (`http://localhost:20128`) to the public
internet via three tunnel backends. This is useful for:

- OAuth callbacks from cloud providers (Antigravity, Gemini, Cursor) that need a
  publicly reachable redirect URL.
- Sharing your local instance with teammates without deploying a VM.
- Mobile, remote, or cross-network testing.

All three backends are managed in-process — OmniRoute starts/stops the underlying
binary or SDK from the dashboard or REST API. No reverse-proxy or systemd setup
is required.

## Backends at a glance

| Backend                     | Persistence                                            | Cost              | Setup                                           |
| --------------------------- | ------------------------------------------------------ | ----------------- | ----------------------------------------------- |
| **Cloudflare Quick Tunnel** | Ephemeral (URL changes each restart)                   | Free              | Zero — auto-installs `cloudflared`              |
| **ngrok**                   | Stable while a paid plan or fixed domain is configured | Free tier + paid  | Requires ngrok account + authtoken              |
| **Tailscale Funnel**        | Stable per node within your tailnet                    | Free for personal | Requires Tailscale install + login + Funnel ACL |

The implementations live in `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts`, and `src/lib/tailscaleTunnel.ts`. All three return a
common-shaped `status` object with `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl`, and `lastError` fields, so the dashboard can render them uniformly.

## 1. Cloudflare Tunnel (Quick Tunnel)

`src/lib/cloudflaredTunnel.ts` runs `cloudflared tunnel --url
http://localhost:<apiPort>` as a child process and parses the assigned
`*.trycloudflare.com` URL from stdout.

Key behaviors:

- **Auto-install.** On first use, OmniRoute downloads the latest `cloudflared`
  binary from the official GitHub releases (managed install lives under
  `DATA_DIR/cloudflared/`). SHA256 of the downloaded asset is verified against the
  release manifest before execution.
- **Quick-tunnel only.** The current implementation runs only the
  `--url`-style quick tunnel. Named/persistent tunnels (`cloudflared tunnel
login` + `cloudflared tunnel route dns ...`) are not orchestrated by
  OmniRoute. URLs are ephemeral and will change every restart.
- **Process supervision.** The cloudflared PID and resolved URL are persisted to
  `cloudflared-state.json` so the dashboard can resume status across reloads.

### Enable / disable via REST

The endpoint uses an `{action: "enable" | "disable"}` body, not separate
`start`/`stop` paths. Management auth (admin session or admin API key) is
required.

```bash
# Enable
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Status
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Disable
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Or via dashboard: **Settings → Tunnels → Cloudflare**.

### Optional env vars

| Variable                                             | Purpose                                                                               |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Override the binary path. If set and valid, OmniRoute uses it instead of downloading. |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Transport protocol (default `http2`).                                                 |

## 2. ngrok

`src/lib/ngrokTunnel.ts` uses the **`@ngrok/ngrok` SDK** (in-process, no CLI
subprocess). The native module is imported lazily on first start so platforms
without prebuilt binaries do not break the app at boot.

### Prerequisites

1. Sign up at <https://ngrok.com>.
2. Copy your authtoken from the ngrok dashboard.
3. Provide it either via:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, or
   - Dashboard: **Settings → Tunnels → ngrok**, or
   - REST body (one-shot): `{"action":"enable","authToken":"<token>"}`.

If neither is configured, status returns `phase: "needs_auth"`.

### Enable / disable via REST

```bash
# Enable (uses NGROK_AUTHTOKEN from env)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Enable with inline token
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Disable
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

The response includes the assigned `publicUrl` (e.g.
`https://abcd-1234.ngrok-free.app`). Custom domains, regions, and policy rules
must be configured in the ngrok dashboard — OmniRoute itself only forwards the
local target URL to the SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` orchestrates the system `tailscale` CLI to expose
the local API port via **Funnel** (Tailscale's public-internet egress for serve).
It supports the full lifecycle: install, login, daemon start, enable, disable.

The implementation invokes `tailscale funnel --bg <port>` (background mode). The
public URL has the shape `https://<machine>.<tailnet>.ts.net/`.

### Prerequisites

1. Install Tailscale (or let OmniRoute do it — see `install` endpoint below).
2. Sign in (`tailscale login` or via OmniRoute's `login` endpoint).
3. Enable Funnel for your tailnet in the Tailscale admin console:
   <https://login.tailscale.com/admin/settings/features>.

On Linux and macOS the daemon (`tailscaled`) requires `sudo` to control. The
POST endpoints accept an optional `sudoPassword` field which is forwarded to
OmniRoute's MITM password cache (`getCachedPassword` / `setCachedPassword`) for
the duration of the call. Windows uses the default service install at
`C:\Program Files\Tailscale\tailscale.exe`.

### REST endpoints

Tailscale has a richer surface than the other backends because installation,
login, daemon, and tunnel are separate concerns.

| Endpoint                              | Method | Purpose                                                         |
| ------------------------------------- | ------ | --------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Aggregated tunnel status (`phase`, `tunnelUrl`, `apiUrl`, etc.) |
| `/api/tunnels/tailscale/check`        | `GET`  | Lower-level check: installed? logged in? daemon running?        |
| `/api/tunnels/tailscale/install`      | `POST` | Install Tailscale (SSE-streamed progress events) — Linux/macOS  |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Start `tailscaled` on Linux/macOS                               |
| `/api/tunnels/tailscale/login`        | `POST` | Begin login flow; returns `authUrl` to open in a browser        |
| `/api/tunnels/tailscale/enable`       | `POST` | Start the Funnel for the API port                               |
| `/api/tunnels/tailscale/disable`      | `POST` | Stop the Funnel                                                 |

All Tailscale endpoints require management auth (see `routeUtils.ts ::
requireTailscaleAuth`).

Example enable:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

If Funnel is not enabled in the admin console, the response includes
`funnelNotEnabled: true` plus an `enableUrl` to open in a browser.

### Optional env vars

| Variable        | Purpose                              |
| --------------- | ------------------------------------ |
| `TAILSCALE_BIN` | Override the `tailscale` binary path |

## Endpoint summary

| Endpoint                              | Method | Body                                | Auth       |
| ------------------------------------- | ------ | ----------------------------------- | ---------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | management |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | management |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | management |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | management |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | management |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | management |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | management |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | management |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | management |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | management |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | management |

There is no central `/api/settings/tunnels` endpoint — each backend is
independent.

## OAuth callback considerations

When you expose OmniRoute through a tunnel, the dashboard and OAuth flows must
build callback URLs against the **public** hostname, not `localhost`. Otherwise
the OAuth provider redirects the user back to a URL its servers cannot reach,
and the handshake fails.

Set:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

and restart OmniRoute before initiating OAuth. For ephemeral Cloudflare Quick
Tunnels the URL changes after every restart, so prefer ngrok with a reserved
domain or Tailscale Funnel for production OAuth use.

## Health and monitoring

The dashboard surfaces tunnel state under **Settings → Tunnels**:

- Active backend(s) and current `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- The current public URL and the derived API URL (`<publicUrl>/v1`).
- The local target URL the tunnel is forwarding to.
- Last error message, if any.

For programmatic monitoring poll the per-backend `GET` endpoints. Running more
than one backend simultaneously is allowed; OmniRoute will track each
independently.

## Troubleshooting

### "cloudflared binary not found"

OmniRoute attempts to auto-install on first use. If the install is blocked
(restricted network, no GitHub access), download `cloudflared` manually from
<https://github.com/cloudflare/cloudflared/releases> and set
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: authtoken required"

`phase: "needs_auth"` means no authtoken was found. Set `NGROK_AUTHTOKEN` in
`.env`, configure it via the dashboard, or pass `authToken` in the enable POST
body.

### "tailscale: funnel not enabled"

When the enable response includes `funnelNotEnabled: true`, Funnel is disabled
for your tailnet. Open the returned `enableUrl` (or the admin console feature
page) and toggle Funnel on.

### Tunnel URL changes break OAuth

Use ngrok with a reserved domain or Tailscale Funnel (both stable per-node).
Cloudflare Quick Tunnels are ephemeral by design and not recommended for
long-lived OAuth callbacks.

### Permission denied on Linux/macOS for Tailscale

`tailscaled` needs root. Provide `sudoPassword` to the relevant POST endpoint,
or run the daemon yourself (`sudo systemctl start tailscaled`).

## See also

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — outbound proxy (1proxy, SOCKS5, HTTP) for
  egress traffic.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — full list of env vars including
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternatives to tunneling for stable
  public hosting.
- Source: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
