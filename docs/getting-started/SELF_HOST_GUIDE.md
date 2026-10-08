---
title: "🚀 Self-Host Guide — OmniRoute (零月费自托管 / zero-fee self-host)"
version: 3.8.52
lastUpdated: 2026-10-05
---

# 🚀 Self-Host Guide — OmniRoute

> **TL;DR** — three commands, one local endpoint, zero monthly fees. No SaaS
> billing, no multi-tenant isolation, no hosted prompt-processing hop. Your
> prompts go straight to the provider you pick.

> **Version note:** this flow applies from **v3.8.51** on. The two files it uses
> (`docker-compose.selfhost.yml` and `.env.selfhost.example`) are not in
> v3.8.50 or any earlier tag. On v3.8.50, use the single-container
> [`docker run` flow in the Docker Guide](../guides/DOCKER_GUIDE.md#quick-run)
> instead.

```bash
mkdir omniroute && cd omniroute
BASE=https://raw.githubusercontent.com/diegosouzapw/OmniRoute/v3.8.51
curl -fsSLO "$BASE/docker-compose.selfhost.yml"
curl -fsSLO "$BASE/.env.selfhost.example"
cp .env.selfhost.example .env      # then edit the 2 lines marked "EDIT ME"
docker compose -f docker-compose.selfhost.yml up -d
open http://127.0.0.1:20128
```

This is the **self-host carrier** for OmniRoute's "零月费 + 自托管" product
form: a packaged container/binary you run on your own machine in 5 minutes.

---

## Why this guide exists

OmniRoute ships a sophisticated `docker-compose.yml` with profiles
(`base`, `web`, `cli`, `host`, `cliproxyapi`, `memory`, `bifrost`). Each app
service is profile-gated, so a bare `docker compose up -d` only starts Redis.
That is correct for power users who pick a profile — but it is _not_ a
5-minute self-host story.

`docker-compose.selfhost.yml` is the KISS overlay: **one command, published
image, loopback-only, Redis included, no profile choice, no build step.**
When you outgrow it, graduate to the full
[DOCKER_GUIDE](../guides/DOCKER_GUIDE.md) profiles.

| Audience                                                | Start here | Graduate to                   |
| ------------------------------------------------------- | ---------- | ----------------------------- |
| Self-hoster, single user                                | this guide | —                             |
| Power user, CLI tools / web-cookie providers / sidecars | —          | `docker-compose.yml` profiles |

---

## Prerequisites

- Docker Engine 24+ (or Docker Desktop 4.30+) with the Compose v2 plugin.
- ~2 GB RAM free (see [Sizing](#sizing-the-container)).
- A provider API key from any supported provider (OpenAI, Anthropic, Google,
  or one of the [150+ free tiers](./FREE-TIERS-GUIDE.md)).

No build toolchain, no Node, no git clone required: you download two files
(the compose file and the env template, Step 1) and the image is pulled.

---

## Step 1 — Configure (1 min)

Download the two self-host files into an empty directory, pinned to the
release tag, and create your `.env` from the template:

```bash
mkdir omniroute && cd omniroute
BASE=https://raw.githubusercontent.com/diegosouzapw/OmniRoute/v3.8.51
curl -fsSLO "$BASE/docker-compose.selfhost.yml"
curl -fsSLO "$BASE/.env.selfhost.example"
cp .env.selfhost.example .env
```

(Working from a git clone of v3.8.51 or later? Both files are at the repo
root; just run the `cp`.)

The compose file reads **`./.env` next to `docker-compose.selfhost.yml`**
(`env_file: .env`). It does **not** read `~/.omniroute/.env`: that file belongs
to the npm CLI install (`omniroute` command, see
[Local binary build](#local-binary-build-optional)) and has no effect on the
Docker flow.

Edit exactly **two** lines in `.env`:

```dotenv
REQUIRE_API_KEY=true          # was false — lock the endpoint down
APP_BIND_HOST=127.0.0.1       # keep loopback; see "Exposing" only if needed
```

`REQUIRE_API_KEY=true` makes `/v1` requests require an API key (a logged-in
dashboard session also works), and the
dashboard require login once a password exists. On first visit you create the
login password in the dashboard's onboarding wizard; skipping that step turns
dashboard login off, even with `REQUIRE_API_KEY=true`. Docker
port-forwarding makes your browser look non-local to the container, so after you
submit the password the wizard asks for a one-time bootstrap token, which the
container prints to its log at that moment:

```bash
docker logs omniroute | grep BOOTSTRAP
```

The other variables (`DASHBOARD_PORT`, `API_PORT`, `LIVE_WS_PORT`,
`OMNIROUTE_MEMORY_MB`) already have sane defaults. Leave them unless you know
you need to change them.

---

## Step 2 — Start (1 min)

```bash
docker compose -f docker-compose.selfhost.yml up -d
```

Pulls `diegosouzapw/omniroute:latest` (multi-arch AMD64 + ARM64, ~250 MB) and
`redis:8.6.5-alpine`, starts both, and waits for Redis to be healthy before
the app boots.

### Step 3 — Verify (30 s)

```bash
# process lifecycle + readiness
curl -fsS http://127.0.0.1:20128/healthz && echo

# container health
docker inspect --format '{{.State.Health.Status}}' omniroute
```

You should see `{"status":"ok"}` and `healthy`. Then open the dashboard:

```
http://127.0.0.1:20128
```

Within ~300 s of `up -d` the endpoint is locally reachable and the healthcheck
is `healthy` — the acceptance bar from the self-host issue.

---

## Ports

| Port    | What                                        | Default bind |
| ------- | ------------------------------------------- | ------------ |
| `20128` | Dashboard + `/v1` LLM proxy (unified entry) | `127.0.0.1`  |
| `20129` | API port (server-to-server)                 | `127.0.0.1`  |
| `20132` | Live WebSocket (realtime dashboard updates) | `127.0.0.1`  |

All three bind to **loopback only** by default. Redis is **not** published to
the host at all — the app reaches it over the compose network. This is
deliberate: shipping an unauthenticated Redis on `0.0.0.0` is a footgun.

---

## Connecting a provider

1. Open the dashboard → **Providers**.
2. Add a provider and paste its API key. Keys are encrypted at rest with
   AES-256-GCM; the cleartext never leaves your machine.
3. Point your IDE / agent at the unified entry:

```
http://127.0.0.1:20128/v1
```

For provider choice, see the
[Free Tiers Guide](./FREE-TIERS-GUIDE.md) — OmniRoute aggregates 150+ free
tiers into one endpoint, so you can run `model: "auto"` to pick the best free
option per request.

---

## Sizing the container

The image pins `OMNIROUTE_MEMORY_MB=1024`. That is enough for the dashboard
and light chat. **Coding agents** (`POST /v1/responses` from Claude Code,
Codex, Grok, …) retain multiple large context graphs during compression and
can abort V8 at ~12 GiB old-space under two overlapping long contexts
([#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849)).

`.env.selfhost.example` defaults to `OMNIROUTE_MEMORY_MB=2048` — a safe floor
for a single user running coding agents. Raise it if you fan out many models
in parallel (fusion combos) or hit `FATAL ERROR: Reached heap limit`:

```dotenv
OMNIROUTE_MEMORY_MB=4096
```

Memory is a V8 heap ceiling; native buffers (SQLite, ONNX, better-sqlite3)
sit outside it, so size the container a few hundred MB above the heap.

---

## Local binary build (optional)

Prefer a binary over Docker? The npm package is the same code:

```bash
npm install -g omniroute
omniroute
```

This runs the Next.js standalone server directly on your host, on the same
ports. It keeps its data and its `.env` in `~/.omniroute` by default
(when `~/.omniroute` does not exist: `%APPDATA%\omniroute` on Windows, or
`$XDG_CONFIG_HOME/omniroute` when that variable is set; `$DATA_DIR` overrides
all of these), not in the `./data` directory the Docker flow mounts.
Use it when you cannot run Docker
(e.g. a locked-down VM). The container path above is the recommended default
because it bundles the exact runtime the image was tested with.

From source (development only — not a deploy path):

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
npm run build && npm start
```

---

## Exposing beyond localhost

**Do not** flip `APP_BIND_HOST=0.0.0.0` while `REQUIRE_API_KEY=false`. That
publishes an open `/v1` proxy on every LAN/WAN interface — anyone on the
network can burn your provider quotas. The order is fixed:

1. Set `REQUIRE_API_KEY=true` in `.env`.
2. Create the login password in the onboarding wizard (see above) and log in.
3. _Only then_ set `APP_BIND_HOST=0.0.0.0` (or put an auth-enforcing reverse
   proxy in front and keep loopback).

For TLS / a domain, run Caddy or Traefik in front and leave `APP_BIND_HOST`
at `127.0.0.1`. See the
[DOCKER_GUIDE — Caddy HTTPS](../guides/DOCKER_GUIDE.md#docker-compose-with-caddy-https-auto-tls)
and
[Cloudflare Quick Tunnel](../guides/DOCKER_GUIDE.md#cloudflare-quick-tunnel)
sections for copy-paste reverse-proxy configs.

---

## Data, backups, and resets

- **Data dir**: `./data` (bind-mounted to `/app/data`). All SQLite DBs,
  migrations, audit trail, and encrypted provider keys live here.
- **Backups**: SQLite auto-backup is on by default
  (`DISABLE_SQLITE_AUTO_BACKUP` is unset → enabled). For a manual snapshot:
  ```bash
  ./bin/snapshot-data.sh
  ```
  Restore with `./bin/restore-data.sh`.
- **Reset the dashboard password**:
  ```bash
  docker exec -it omniroute node bin/reset-password.mjs
  ```
- **Reset policies** (routing/failover/quota to factory defaults):
  ```bash
  docker exec -it omniroute node bin/restore-policies.sh
  ```

---

## Common issues

<details>
<summary><code>cp: cannot stat '.env.selfhost.example': No such file or directory</code></summary>

The self-host files are not in your current directory. Download them first
(see [Step 1](#step-1--configure-1-min)); they ship from v3.8.51 on, so the
tag-pinned URLs do not exist for v3.8.50 or earlier. On v3.8.50 use the
[`docker run` flow](../guides/DOCKER_GUIDE.md#quick-run).
</details>

<details>
<summary>Edited <code>~/.omniroute/.env</code> and nothing changed</summary>

That file is read by the npm CLI install only. The Docker flow reads the
`.env` next to `docker-compose.selfhost.yml`. Edit that one and re-run
`docker compose -f docker-compose.selfhost.yml up -d`.
</details>

<details>
<summary><code>docker compose up</code> only starts Redis</summary>

You are running the **full** `docker-compose.yml`, whose app services are
profile-gated. For the one-command path use the self-host file:

```bash
docker compose -f docker-compose.selfhost.yml up -d
```

Or, with the full compose, pick a profile:
`docker compose --profile base up -d`.
</details>

<details>
<summary>Healthcheck stays <code>starting</code> / <code>unhealthy</code></summary>

- Check Redis is up: `docker inspect --format '{{.State.Health.Status}}' omniroute-redis`
- Check app logs: `docker logs omniroute`
- The healthcheck probes `/healthz` and allows a 20 s start period. A slow
  first boot (cold migrations) can take longer — bump `start_period` in the
  compose file if your disk is slow.

</details>

<details>
<summary><code>FATAL ERROR: Reached heap limit</code> under coding agents</summary>

Raise `OMNIROUTE_MEMORY_MB` in `.env` (e.g. `4096`), then
`docker compose -f docker-compose.selfhost.yml up -d`. See
[Sizing the container](#sizing-the-container).
</details>

<details>
<summary>Web-cookie providers (Gemini Web, Claude Turnstile) fail with
<code>Executable doesn't exist at .../ms-playwright/chromium</code></summary>

The `base` image ships without Chromium. The self-host compose uses the
published `base` image. For web-cookie providers, switch to the full compose
with the `web` profile (which bundles Playwright/Chromium):

```bash
docker compose --profile web up -d
```

See [DOCKER_GUIDE — Available Profiles](../guides/DOCKER_GUIDE.md#available-profiles).
</details>

<details>
<summary>Port 20128 already in use</summary>

Set `DASHBOARD_PORT`, `API_PORT`, `LIVE_WS_PORT` in `.env` to free ports and
re-run `up -d`.
</details>

---

## What this deliberately is NOT

Per the self-host KISS constraint, this path **does not** include:

- ❌ SaaS billing / metering / plan tiers
- ❌ Multi-tenant isolation / per-tenant namespaces
- ❌ A hosted prompt-processing hop (your prompts go straight to the provider)
- ❌ Any baked-in credentials or secrets

It is a **pure local self-host** carrier — the simplest thing that makes the
"零月费 + 自托管" promise real.

---

## Security checklist (self-host)

Before you expose beyond loopback:

- [ ] `REQUIRE_API_KEY=true` in `.env`
- [ ] Dashboard login password set in the onboarding wizard to a strong, unique value
- [ ] `APP_BIND_HOST` left at `127.0.0.1` _unless_ behind an auth-enforcing proxy
- [ ] TLS terminated by Caddy/Traefik/Cloudflare in front (never plain HTTP on WAN)
- [ ] Redis not published to the host (the self-host compose already enforces this)
- [ ] `./data` volume backed up regularly (`bin/snapshot-data.sh`)
- [ ] Provider keys rotated per the provider's own policy

For the full supply-chain / image / dependency audit dimension, see
[SECURITY.md](../../SECURITY.md) and
[SUPPLY_CHAIN](../security/SUPPLY_CHAIN.md).

---

## Related

- [Docker Guide](../guides/DOCKER_GUIDE.md) — profiles, Caddy HTTPS, tunnels, image tags
- [Quick Start](./QUICK-START.md) — 3-minute path for first-time users
- [Free Tiers Guide](./FREE-TIERS-GUIDE.md) — 150+ free provider tiers
- [Providers Guide](./PROVIDERS-GUIDE.md) — connecting and configuring providers
- [Troubleshooting](../guides/TROUBLESHOOTING.md) — deeper issue resolution
