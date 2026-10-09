---
title: "Headless Mode — run only the proxy engine"
version: 3.8.52
lastUpdated: 2026-10-09
---

# Headless Mode

Headless mode boots OmniRoute as a plain LLM proxy: the OpenAI-compatible API under `/v1/*`
keeps working, but the dashboard is switched off and the optional subsystems that only feed
the dashboard (or add opt-in features on top of the proxy) are not started at boot.

Use it for servers, containers and CI boxes where nobody opens the dashboard and you want a
lighter, quieter process. Nothing is uninstalled or removed: unset the variable and restart to
get the full server back.

## Turning it on

Either set the environment variable:

```bash
OMNIROUTE_HEADLESS=1 omniroute serve
```

or pass the CLI flag, which sets `OMNIROUTE_HEADLESS=1` on the server process for you:

```bash
omniroute serve --headless
omniroute serve --headless --port 20128 --daemon
```

Accepted truthy values are `1`, `true`, `yes` and `on` (case-insensitive). Any other value,
or an unset variable, keeps the full server. The flag is implemented in
`bin/cli/commands/serve.mjs`; the single source of truth for the mode is
`src/lib/system/headless.ts`.

With `--headless` the CLI does not open a browser and the startup banner prints
`Dashboard: disabled (headless)`. `--headless` cannot be combined with `--tray` (the tray menu
exists to open the dashboard).

## What stays on

| Surface                                                                     | Headless |
| --------------------------------------------------------------------------- | -------- |
| `/v1/*` (chat completions, responses, models, embeddings, …)                | on       |
| `/api/monitoring/health`                                                    | on       |
| `/api/auth/*` and the API-key / `REQUIRE_API_KEY` checks                    | on       |
| Every other `/api/*` route (management API, used by the `omniroute` CLI)    | on       |
| Proxy core at boot: DB, secrets, quota fetchers, settings hydration         | on       |
| Background proxy work: quota refresh, token auto-refresh, cooldown recovery | on       |
| API bridge port, cleanup/VACUUM schedulers, backup schedule                 | on       |

Authentication is unchanged: if `/v1/*` needs an API key on the full server, it needs one in
headless mode too.

## What is switched off

**Dashboard pages.** `/dashboard`, `/dashboard/*`, `/home` and `/home/*` answer
`404` with the JSON body `{"error":"dashboard disabled (headless)"}`. The gate runs in
`src/proxy.ts` before the authorization pipeline, so no other route is affected.

**Optional boot subsystems.** `registerNodejs()` in `src/instrumentation-node.ts` skips:

| Subsystem name              | What it does on the full server                                        |
| --------------------------- | ---------------------------------------------------------------------- |
| `free-proxy-sync`           | Re-fetches free-proxy source lists on an interval                      |
| `cloud-sync`                | Cloud / model sync background bootstrap                                |
| `embedded-services`         | Auto-starts embedded services marked auto-start                        |
| `embed-ws-proxy`            | WebSocket proxy for embedded service UIs                               |
| `conductor-bridge`          | Mirrors OmniConductor hub tasks into A2A (opt-in, `CONDUCTOR_HUB_URL`) |
| `arena-elo-sync`            | Arena ELO leaderboard sync for the Free Provider Rankings page         |
| `radar-sync`                | Radar daily feed sync (opt-in)                                         |
| `pricing-sync`              | External pricing data sync (opt-in, `PRICING_SYNC_ENABLED`)            |
| `openrouter-provider-stats` | Provider directory / popularity enrichment for the dashboard           |
| `models-dev-sync`           | models.dev capability sync (opt-in in settings)                        |
| `memory-decay-sweep`        | Typed-memory decay sweep (opt-in)                                      |
| `memory-backends`           | Initializes configured memory backends from settings                   |
| `live-dashboard-ws`         | Real-time dashboard WebSocket daemon (port 20132)                      |

Each skip is logged once at startup, for example:

```
[STARTUP] Headless mode: skipping free-proxy-sync
[STARTUP] Headless mode: skipping cloud-sync
[STARTUP] Headless mode: skipping optional subsystems: embedded-services, embed-ws-proxy, …
```

## Checking it with curl

```bash
# Health — 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:20128/api/monitoring/health

# Models — 200 (add -H "Authorization: Bearer $OMNIROUTE_KEY" when REQUIRE_API_KEY is on)
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:20128/v1/models

# Dashboard — 404 with the headless error body
curl -s -w "\n%{http_code}\n" http://localhost:20128/dashboard
# {"error":"dashboard disabled (headless)"}
# 404
```

## Limits

- **Set before start.** The server process reads `OMNIROUTE_HEADLESS` from its own environment;
  switching modes means restarting the server with the variable set or unset.
- **Management API stays reachable.** Headless mode only closes the dashboard pages. The
  `/api/*` management routes keep their normal authorization tiers, so the `omniroute` CLI
  (and remote mode) keep working. It is not a security boundary — keep using
  `REQUIRE_API_KEY` and a loopback bind (`OMNIROUTE_SERVER_HOST`) where appropriate.
- **Route-loaded features still load on demand.** MCP, A2A, evals, gamification, webhooks and
  cloud agents have no boot-time init; they start lazily when their routes are called, in both
  modes.
- **Memory backends.** Configured memory backends are not initialized at boot in headless mode;
  features that depend on a non-default memory backend should run on the full server.
- **Code still ships.** This mode changes what runs, not what is installed — the package size
  and the build are identical.

## See also

- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `OMNIROUTE_HEADLESS` and
  `OMNIROUTE_DISABLE_BACKGROUND_SERVICES` (a separate switch that stops background schedulers
  but keeps the dashboard).
- [REMOTE-MODE.md](REMOTE-MODE.md) — drive a remote (for example, headless) OmniRoute from
  your laptop with the `omniroute` CLI.
