---
title: "🐳 Docker Guide — OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# 🐳 Docker Guide — OmniRoute

> Complete Docker deployment reference. For a quick start, see the [README Docker section](../README.md#-docker).

## Table of Contents

- [Quick Run](#quick-run)
- [With Environment File](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Available Profiles](#available-profiles)
- [Configuring host CLI tools when OmniRoute runs in Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis Sidecar](#redis-sidecar)
- [Production Compose](#production-compose)
- [Dockerfile Stages](#dockerfile-stages)
- [Critical Environment Variables](#critical-environment-variables)
- [Docker Compose with Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image Tags](#image-tags)
- [Availability: default SQLite is single-replica](#availability-default-sqlite-is-single-replica)
- [Important Notes](#important-notes)

---

## Quick Run

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## With Environment File

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d

# Host profile (Linux-first; mounts host CLI binaries read-only)
docker compose --profile host up -d

# Combine CLI + CLIProxyAPI sidecar
docker compose --profile cli --profile cliproxyapi up -d
```

## Available Profiles

OmniRoute ships four Compose profiles. Pick the one that matches your environment.

| Profile          | Service          | When to use                                                                                                                       | Command                                      |
| ---------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (default) | `omniroute-base` | Headless server / minimal runtime, no provider CLIs bundled                                                                       | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | Agentic workflows that call `omniroute providers/setup/doctor` and bundled CLIs (Codex, Claude Code, Droid, OpenClaw)             | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | Linux hosts that want `network_mode`-like access to host CLIs by mounting `~/.local/bin`, `~/.codex`, `~/.claude`, etc. read-only | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | Run the [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) sidecar on port `8317` for upstream CLI proxying              | `docker compose --profile cliproxyapi up -d` |

> Multiple profiles can be combined: `docker compose --profile cli --profile cliproxyapi up -d`.

## Configuring host CLI tools when OmniRoute runs in Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` and the dashboard's
**Save config** button all write files like `~/.codex/*.config.toml`. Those paths
only mean something on the machine where the CLI actually runs. Run them inside
the container and the write lands in the container's own home (`/home/node` —
the image runs `USER node`), where no host CLI will ever read it and where it is
discarded the moment the container is recreated.

OmniRoute detects this and refuses the write with instructions instead of
reporting a success you cannot use: the CLI exits `2`, and the API answers `422`
with `containerEphemeralTarget: true`.

### Recommended: run the CLI on the host, OmniRoute in Docker

The container serves the API; the CLI configures your host tools.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # point the CLI at the container
omniroute setup-codex                      # writes the real ~/.codex on your host
```

This is the right choice when Codex, Claude Code, Cursor or similar run on your
laptop — which is the usual setup.

### Alternative: bind-mount the host config dirs (`host` profile)

If you want the container itself to write your host config, mount the
directories in and point `CLI_CONFIG_HOME` at the mount root. The `host` profile
already does this:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

A bind mount is what makes the path trustworthy: OmniRoute reads
`/proc/self/mountinfo` and allows writes to mounted paths (and to directories
whose children are mounts, which is exactly the `/host-home` shape above) while
still refusing unmounted ones.

### Escape hatch: configure the container's own CLIs (use sparingly)

When the CLIs genuinely live inside the container (the `cli` profile), the write
is intentional. Pass `--allow-container-write` to any `setup-*` command, or set
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` for the server. The write proceeds
with a warning that it will not survive the container.

> **Security warning — `cli` profile + `docker.sock` mount.**
> The `cli` profile bind-mounts `/var/run/docker.sock` so the in-container
> auto-updater can recreate the stack from the host daemon
> (`src/lib/system/autoUpdate.ts` probes for that socket and skips the
> Docker path when it is absent). That socket is **a host-root trust
> boundary**: anything that can reach it drives the host Docker daemon as
> root — it can create, inspect, stop and remove any container on the host.
> Implications:
>
> 1. **Never expose the `cli` profile's port to the network.** Publish
>    it on `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — a LAN-reachable `cli` profile turns any dashboard-level RCE into
>    full host compromise.
> 2. **Do not bind any extra host directories into the `cli` profile.**
>    The Docker socket plus any further mount gives the container full
>    read/write to your filesystem and host config. If you need a tool to
>    see a project, run it locally with the CLI binary — do not mount it
>    into the `cli` container.
>
> If you do not need in-container auto-update, leave the `cli` profile off
> (`COMPOSE_PROFILES=core,redis` or shorter). The other profiles do not
> mount the Docker socket.
>
> See `docs/security/MITM-TPROXY-DECRYPT.md` for the related threat model
> around MITM, and `docs/security/SUPPLY_CHAIN.md` for the
> `codex`/`claude-code`/`droid`/`openclaw` binary provenance chain.

## Redis Sidecar

OmniRoute relies on Redis to back the distributed rate limiter and shared cache. The `redis` service is **always defined** in `docker-compose.yml` (it has no profile gate) and starts alongside any other profile.

| Detail               | Value                                       |
| -------------------- | ------------------------------------------- |
| Image                | `redis:7-alpine`                            |
| Container name       | `omniroute-redis`                           |
| Internal port        | `6379`                                      |
| Host port (override) | `REDIS_PORT` (defaults to `6379`)           |
| Host bind (override) | `REDIS_BIND_HOST` (defaults to `127.0.0.1`) |
| Volume               | `omniroute-redis-data` → `/data`            |
| Healthcheck          | `redis-cli ping` (10s interval)             |

Related environment variables:

- `REDIS_URL` — connection string injected into the app (`redis://redis:6379` by default).
- `REDIS_PORT` — host-side port mapping for the Redis container.
- `REDIS_BIND_HOST` — host interface the port is published on. Defaults to `127.0.0.1`.

> **Why loopback by default:** the sidecar runs without `requirepass`, and the app
> containers reach it over the compose network (`redis:6379`) — the published port is
> only there for host-side tooling (`redis-cli`, a local `npm run dev`). Publishing on
> `0.0.0.0` would expose an unauthenticated Redis to every host on your LAN. If you set
> `REDIS_BIND_HOST=0.0.0.0`, add `--requirepass` to the service `command:` as well.

**Disabling Redis** is not recommended (rate limiter will degrade to in-memory fallback). If you must, either remove/comment the `redis:` service block in `docker-compose.yml` or scale it to zero:

```bash
docker compose up -d --scale redis=0
```

## Production Compose

For an isolated production snapshot running alongside dev, use `docker-compose.prod.yml`.

| Detail                 | Value                                                                              |
| ---------------------- | ---------------------------------------------------------------------------------- |
| File                   | `docker-compose.prod.yml`                                                          |
| Default dashboard port | `PROD_DASHBOARD_PORT=20130` (mapped to internal `${DASHBOARD_PORT:-20128}`)        |
| Default API port       | `PROD_API_PORT=20131`                                                              |
| Image                  | `omniroute:prod` (built from `runner-cli` target)                                  |
| Redis container        | `omniroute-redis-prod` (`redis:8.6.2`, dedicated `redis-prod-data` volume)         |
| Data volume            | `omniroute-prod-data` (named, persisted across rebuilds)                           |
| Healthchecks           | `node healthcheck.mjs` + `redis-cli ping`, with `depends_on` gated on Redis health |

How to use:

```bash
# Build & start the production stack
docker compose -f docker-compose.prod.yml up -d --build

# Stream logs
docker compose -f docker-compose.prod.yml logs -f

# Tear down (keep volumes)
docker compose -f docker-compose.prod.yml down
```

The prod stack runs in parallel with the dev compose (different container names, ports, and volumes), so you can keep iterating locally while production stays up.

## Dockerfile Stages

The repository ships a multi-stage Dockerfile (`Dockerfile`). Three stages are exposed; pick the right `target` for your use case.

| Stage         | Base image            | Purpose                                                                                                                                                            |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Installs deps (`npm ci --legacy-peer-deps`) and runs `npm run build` (Turbopack by default — see Build-time resources below)                                       |
| `runner-base` | `node:26-trixie-slim` | Production runtime with the Next.js standalone output. **No provider CLIs bundled.**                                                                               |
| `runner-cli`  | `runner-base`         | Adds `git`, `docker.io`, `docker-compose` and global CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Pick this for agentic workflows.** |

Build a specific target manually:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Build-time resources

Three build args control what the `builder` stage costs. They are build-time only —
`OMNIROUTE_MEMORY_MB` (below) is a separate, runtime knob.

| Build arg                   | Default | Effect                                                                              |
| --------------------------- | ------- | ----------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`     | `0` builds with webpack instead. Lower peak memory, slower.                         |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | V8 heap ceiling (`--max-old-space-size`) for the spawned `next build`.              |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Feeds `CIRCLE_NODE_TOTAL`; Next derives `workers = N - 1` for page-data collection. |

`OMNIROUTE_BUILD_WORKERS` is the one to raise on a big builder and the one to
suspect when a constrained build dies **after** `✓ Compiled successfully`. Each
page-data worker is its own process, and so is the parent `next build` itself;
a live VPS reproduction (issue #7518) measured each process's peak RSS at
~4.5 GB independent of the `NODE_OPTIONS` heap flag (Turbopack compiles in
native/Rust memory outside the V8 heap). The default of `2` (→ 1 worker, 2
processes total) is sized for the 16 GB / 4 vCPU GitHub-hosted runners the
publish pipeline uses. At `8` (→ 7 workers) that runner ran out of memory and
buildkit failed the step with `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) still didn't fit once the per-process RSS was measured
directly instead of inferred. `tests/unit/docker-build-memory-budget.test.ts`
does the arithmetic against the measured figure and fails if either knob
outgrows the runner.

Turbopack compiles in native Rust memory that lives **outside** the V8 heap, so
`OMNIROUTE_BUILD_MEMORY_MB` does not bound it. On a host with a memory ceiling the
build is then SIGKILLed by the OOM killer with no error text at all — it simply
stops mid-`Creating an optimized production build`, which reads like a hang rather
than an out-of-memory. If the build host is constrained, switch bundlers:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` is enabled, so `next build` runs a parent **and** a worker
process and each honours `OMNIROUTE_BUILD_MEMORY_MB` separately. Size the container
ceiling above roughly twice that value, not once.

Measured on this tree (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Container ceiling | Result                        |
| --------- | ----------------- | ----------------------------- |
| Turbopack | 8 GiB / 16 GiB    | OOM-killed at both, silently  |
| webpack   | 8 GiB             | build worker SIGKILLed        |
| webpack   | 12 GiB            | succeeded, peaked at 11.1 GiB |

### Runtime defaults

Defaults exported by `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Memory behavior in Docker:

- The image sets `OMNIROUTE_MEMORY_MB=1024` and derives `NODE_OPTIONS=--max-old-space-size=1024` from it.
- The actual server process is started by the standalone launcher, which reads `OMNIROUTE_MEMORY_MB` and appends `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node uses the last repeated `--max-old-space-size` value, so setting `OMNIROUTE_MEMORY_MB` controls the effective Docker heap limit.
- Because the image always sets it, the launcher's own RAM-calibrated fallback never applies under Docker. Raise it explicitly for the workload (table below). `2048` is still too small for coding-agent `/v1/responses`.

### Runtime RAM for coding agents

The 1 GiB Docker default is a dashboard/light-chat floor, not a production size. Long `POST /v1/responses` bodies (hundreds of messages, tens of tools) retain multiple in-memory graphs during compression. Two overlapping ~3 MiB / ~750k-token requests have aborted V8 at a **12 GiB** old-space (`FATAL ERROR: Reached heap limit`) and also hit a 16 GiB cgroup OOM. See [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Size **cgroup `--memory` above the heap** — native buffers, SQLite, and compression intermediates sit outside V8.

| Workload                             | `OMNIROUTE_MEMORY_MB`  | Container / cgroup   | Notes                                                                                       |
| ------------------------------------ | ---------------------- | -------------------- | ------------------------------------------------------------------------------------------- |
| Dashboard, one light chat            | `1024` (image default) | ≥2 GiB               |                                                                                             |
| One coding agent (Claude/Codex/Grok) | `8192`                 | ≥10 GiB              | Typical single-session `/v1/responses`                                                      |
| Two concurrent long `/v1/responses`  | `10240`–`12288`        | ≥12–16 GiB           | Measured V8 abort at ~12 GiB heap                                                           |
| Three+ concurrent long contexts      | do not on one process  | serialize / more RAM | Default heavyweight admission is 1 in-flight; raising it without RAM reintroduces the abort |

`omniroute serve` on bare metal calibrates ~35% of RAM (clamped `[512, 4096]`) when `OMNIROUTE_MEMORY_MB` is **unset**. Docker always sets `1024`, so that calibration never runs in the official image.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Critical Environment Variables

Beyond the defaults documented in [ENVIRONMENT.md](../reference/ENVIRONMENT.md), the following variables matter most when running under Docker:

| Variable                      | Purpose                                                                                                                                                                    | Default                  |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Shared secret for the WebSocket bridge. **Required in production** — set to a strong random string.                                                                        | unset (must be provided) |
| `REDIS_URL`                   | Connection string for the rate limiter / cache backend                                                                                                                     | `redis://redis:6379`     |
| `REDIS_PORT`                  | Host-side port for the bundled Redis container                                                                                                                             | `6379`                   |
| `REDIS_BIND_HOST`             | Host interface the bundled Redis port is published on (loopback unless you add AUTH)                                                                                       | `127.0.0.1`              |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Host path mounted into `cli` profile at `/workspace/omniroute` for self-update workflows                                                                                   | `.` (current directory)  |
| `OMNIROUTE_MEMORY_MB`         | Runtime Node heap ceiling for the Docker standalone server; overrides the image default above. Coding agents: `8192`+ (see [runtime RAM](#runtime-ram-for-coding-agents)). | `1024`                   |
| `DASHBOARD_PORT` / `API_PORT` | Override exposed ports for dashboard (20128) and API (20129)                                                                                                               | `20128` / `20129`        |
| `OMNIROUTE_PLUGINS_DIR`       | Directory the runtime plugin scanner reads and installs into. Set it when plugins are bind-mounted: the default follows `HOME`, which an image need not export.            | `~/.omniroute/plugins`   |
| `OMNIROUTE_BASE_PATH`         | URL subpath when the app is published behind a reverse proxy (e.g. `/omniroute`)                                                                                           | _(empty = root)_         |
| `NEXT_PUBLIC_BASE_URL`        | Public browser origin including the subpath (e.g. `https://host/omniroute`)                                                                                                | unset                    |
| `PROD_DASHBOARD_PORT`         | Host-side dashboard port for `docker-compose.prod.yml`                                                                                                                     | `20130`                  |
| `CLIPROXYAPI_PORT`            | Host-side port for the `cliproxyapi` sidecar                                                                                                                               | `8317`                   |

## Reverse Proxy on a Subpath (Traefik / nginx)

Next.js `basePath` is compiled into the standalone bundle. OmniRoute records the baked
value in a sentinel file at the app root (written during `npm run build`; read by
`scripts/docker/ensure-docker-base-path.mjs`) and compares it with
`OMNIROUTE_BASE_PATH` when the container starts. When they differ and the image was
built for the domain root, the entrypoint rewrites the standalone manifests, the
embedded `basePath`/`assetPrefix` literals (Next 16 renders SSR asset URLs from
`assetPrefix` alone — the patcher mirrors the subpath into it), the baked
`/_next/static` asset URLs (client-reference manifests, media imports, prerendered
error pages) and the client `process.env` shim before `node dev/run-standalone.mjs`
runs.

### Compose build (recommended)

Set both variables in `.env`, then rebuild so the image and runtime agree:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` forwards `OMNIROUTE_BASE_PATH` as a Docker build-arg and as a
runtime environment variable.

### Pre-built root image + runtime subpath

Published `diegosouzapw/omniroute:*` images are built for the domain root. You can still
set `OMNIROUTE_BASE_PATH` at runtime; the container patches the bundle once on startup.
Pair it with the matching public origin:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configure the reverse proxy to forward the **full** external path (do not strip the
prefix). Traefik should route `PathPrefix(`/omniroute`)` to the container without
`StripPrefix`, so Next.js receives `/omniroute/...` and serves assets from
`/omniroute/_next/...`.

The Docker healthcheck probes the lightweight `/healthz` lifecycle endpoint prefixed
with the active `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` remains available for
human/dashboard diagnostics; to point the container HEALTHCHECK back at it (for example
for deep health enforcement), set `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
That path is a **deep** check (DB + monitoring summary) — appropriate for Docker's
infrequent `HEALTHCHECK` if you opt back in, but **not** for Kubernetes `livenessProbe`
intervals.

For orchestrators (Kubernetes, Nomad, etc.):

| Probe           | Prefer                                                               | Avoid                                             |
| --------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, or TCP on the main port (`PORT`, default `20128`) | `/api/monitoring/health` as liveness              |
| Readiness       | HTTP `GET /healthz`                                                  | Tight timeouts that treat event-loop busy as dead |
| Deep / blackbox | `/api/monitoring/health`                                             | —                                                 |

`/healthz` reports process lifecycle (`ok` / `starting` / `stopping`). `/livez` is
process-alive only (200 whenever the handler can run; it does not wait for
readiness). Both still run on the same Node event loop as request handling, so
CPU-bound catalog or compression work can delay them — busy ≠ dead. Prefer TCP
liveness if HTTP probes time out. Full probe guidance:
[Monitoring guide — Kubernetes probe recommendations](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose with Caddy (HTTPS Auto-TLS)

OmniRoute can be securely exposed using Caddy's automatic SSL provisioning. Ensure your domain's DNS A record points to your server's IP.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Browser-facing origin for OAuth callbacks, dashboard links, and generated public URLs.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Internal server-to-server URL for scheduled jobs / self-fetches.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy sets the standard forwarding headers for the upstream container. OmniRoute uses
`NEXT_PUBLIC_BASE_URL` as the canonical public origin for OAuth callbacks and generated public
links; authenticated dashboard writes use same-origin requests plus session-bound CSRF
protection. Only enable `OMNIROUTE_TRUST_PROXY` for advanced deployments where you intentionally
want OmniRoute to derive the public origin from trusted forwarded headers instead of explicit
configuration.

## Cloudflare Quick Tunnel

Dashboard support for Docker deployments includes a one-click **Cloudflare Quick Tunnel** on `Dashboard → Endpoints`. The first enable downloads `cloudflared` only when needed, starts a temporary tunnel to your current `/v1` endpoint, and shows the generated `https://*.trycloudflare.com/v1` URL directly below your normal public URL.

Endpoint tunnel panels (Cloudflare, Tailscale, ngrok) can be shown or hidden from `Settings → Appearance` without changing active tunnel state.

### Tunnel Notes

- Quick Tunnel URLs are temporary and change after every restart.
- Quick Tunnels are not auto-restored after an OmniRoute or container restart. Re-enable them from the dashboard when needed.
- Managed install currently supports Linux, macOS, and Windows on `x64` / `arm64`.
- Managed Quick Tunnels default to HTTP/2 transport to avoid noisy QUIC UDP buffer warnings in constrained container environments. Set `CLOUDFLARED_PROTOCOL=quic` or `auto` if you want a different transport.
- Docker images bundle system CA roots and pass them to managed `cloudflared`, which avoids TLS trust failures when the tunnel bootstraps inside the container.
- Set `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` if you want OmniRoute to use an existing binary instead of downloading one.

## Image Tags

| Image                    | Tag      | Size   | Description                                          |
| ------------------------ | -------- | ------ | ---------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Highest **published** stable SemVer (not git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Pin this class of tag for GitOps                     |

Multi-platform manifest: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). Docker selects the matching architecture automatically; pass `--platform linux/amd64` if you need to force AMD64 emulation on ARM hosts.

### Release Channels

OmniRoute publishes separate Docker channels for stable releases, active release-branch testing, and development builds.

| Channel                         | Source                              | Mutability                  | Recommended use                                                                                                       |
| ------------------------------- | ----------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Signed/versioned release            | Immutable                   | Production deployments that pin an exact release                                                                      |
| `:latest` / `:latest-web`       | Highest **published** stable SemVer | Mutable stable pointer      | Follows stable releases **after** a SemVer publish job — does **not** track `main` or unreleased `release/v*` commits |
| `:next` / `:next-web`           | Current default `release/v*` branch | Mutable pre-release pointer | Testing fixes that have landed on the active release branch but are not yet in a stable release                       |
| `:main` / `:main-web`           | `main` branch                       | Mutable development pointer | Development and integration testing only                                                                              |

#### Using the pre-release channel

The `next` channel is rebuilt on every push to the current default `release/v*` branch and is published for both AMD64 and ARM64. Older maintenance branches cannot overwrite it. The channel provides a pullable image for fixes that have merged into the active release branch before the next stable tag is cut.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

For Docker Compose, override the image tag used by the selected profile, then pull and recreate the service:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Safety and rollback

`next` is a floating pre-release channel. It may change on any push to the active release branch and is **not supported for production use**. Pin the image digest while evaluating a specific build:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Before testing, back up the OmniRoute data volume or bind-mounted data directory. To roll back, restore the previously used stable version or digest and recreate the container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

A release-branch build can never move `latest`; only an eligible stable semantic version may promote the stable pointer. The `next` images retain the release image inspection and blocking CRITICAL-vulnerability gate.

**`latest` is not a currency guarantee for git.** Merged fixes on `main` or on the active `release/v*` branch are **not** in `:latest` until a stable SemVer image is published and the publish job promotes `:latest` (same digest as that SemVer). If `latest` looks frozen while GitHub already shows the fix, pull `:next` to test the release branch or wait for the SemVer tag.

| You want                                                       | Use                                |
| -------------------------------------------------------------- | ---------------------------------- |
| GitOps / production that must not drift                        | Pin `:X.Y.Z` (or the image digest) |
| Follow published stables and accept a recreate on each release | `:latest`                          |
| Test unreleased `release/v*` commits                           | `:next` (not production)           |
| Test `main`                                                    | `:main` (not production)           |

## Availability: default SQLite is single-replica

Stock Docker / Kubernetes OmniRoute is **one Node process + one SQLite writer**. High availability is **not supported** on that topology.

| Constraint                            | Consequence                                                                                                                                                                                                                                                                                             |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Single writer                         | Do **not** run multiple replicas against the same SQLite file. That corrupts the DB.                                                                                                                                                                                                                    |
| Recreate / restart / HEALTHCHECK kill | **Full outage** of in-flight SSE, dashboard sessions, and in-memory state. Every connected client drops. New requests during the empty-endpoint window get a reverse-proxy **`502 Bad Gateway: Unknown error`**, not OmniRoute JSON — clients cannot distinguish this from a provider failure (#11015). |
| Same event loop as `/healthz`         | A busy catalog or compression tick can delay probes; a short timeout then restarts the **only** replica.                                                                                                                                                                                                |

**Probe matrix** (see also [Kubernetes probe recommendations](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe         | Target                                                   | Do not use                                        |
| ------------- | -------------------------------------------------------- | ------------------------------------------------- |
| Liveness      | TCP on `PORT` (default `20128`), or soft HTTP `/healthz` | `/api/monitoring/health`                          |
| Readiness     | HTTP `GET /healthz`                                      | Tight timeouts that treat event-loop busy as dead |
| Deep / humans | `/api/monitoring/health`                                 | Automated kubelet liveness                        |

**Upgrades:** expect every session to drop. Drain clients if you can; there is no rolling update on default SQLite. Compose `restart: unless-stopped` plus Docker `HEALTHCHECK` will also replace the only process when the container is Unhealthy — same blast radius.

Kubernetes snippet for a **single replica** (Recreate is required; do not raise `replicas` against one SQLite file):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

`preStop` sleep lets kube drop Service endpoints before SIGTERM so **new** traffic stops hitting the dying process. In-flight `/v1/responses` SSE is drained up to `SHUTDOWN_TIMEOUT_MS` (default 30s) via heavyweight admission leases (#11015). New requests that still reach the process get `503` + `Retry-After: 5`. The Recreate empty-endpoint gap until the replacement is Ready remains a hard outage — that is the SQLite topology, not a probe misconfig.

External Postgres / multi-writer HA is **not** a documented stock path. If you need HA, keep a single replica or run a topology the project has tested and documented separately. The Postgres/MySQL work lives in [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Until that ships, the only supported way to multiply **large** `/v1/responses` capacity is N independent processes (next section), not `replicas > 1` on one volume.

## Scale-out: N independent processes

One Node process is **one V8 heap**. Two overlapping ~3 MiB / ~750k-token coding-agent `POST /v1/responses` (RTK + Caveman) abort that heap at ~12 Gi (`FATAL ERROR: Reached heap limit`) and can OOM a 16 Gi cgroup. See [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). That measurement is a **memory-budget** warning, not a product hard-max of two concurrent long `/v1/responses`. Heavyweight chat admission is gated by an auto-derived ingest byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) sized from that same V8/cgroup ceiling — overriding it upward (or setting the legacy `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap) on an already-sized process reintroduces the abort. Small chats, `/healthz`, `/v1/models`, and MCP are **not** in that cap.

### One-process: more than two long `/v1/responses`

A **healthy** process (heap below `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, default `0.75`) **may** run more than two concurrent long `POST /v1/responses` when the process-wide inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) still has room. Bodies at or above `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (default 256 KiB) take the same heavyweight lease as structure-heavy requests and use the same [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) `tryAcquireHealthyHeadroom` escape (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Tens of concurrent long SSE clients (operators often need 40–50) is a **memory-budget** question — size heap + primary/headroom slots + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — not a hard “max 2” product limit. A pressured heap still sheds with retryable `503` so #7849 does not return.

To **multiply heaps** (independent V8 old-spaces) **today**:

| Do                                                                                                                                      | Do not                                               |
| --------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Run **N containers/pods**, each with its **own** `DATA_DIR` / volume                                                                    | Set `replicas > 1` against one SQLite file           |
| Size heavy in-flight + healthy-headroom from heap / inflight-byte budget; 1–2 is the conservative #7849 default, not a hard product max | Give one process 8× RAM and an unbounded count cap   |
| Optional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` for **shared quota counters**                                            | Treat Redis as shared SQLite — it is not             |
| Duplicate provider secrets into each instance (or accept partitioned dashboards)                                                        | Expect one dashboard / one call-log across instances |
| Front with any load balancer; sticky by API key or session is enough                                                                    | Require a vendor-specific size-aware middleware      |

Hardware: per-instance concurrent long `/v1/responses` is a **memory-budget** question (heap + inflight-byte / #10110). `N` independent `DATA_DIR`s still multiply heaps: host RAM must cover `N × cgroup`, not “one 16 Gi pod with N=8.” Never `replicas > 1` on one SQLite file.

Compose sketch (two heaps, two volumes — not `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

In-process density (compression off the HTTP isolate) is [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). One logical cluster on shared durable state is [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Important Notes

- **SQLite WAL Mode:** `docker stop` should be allowed to finish so OmniRoute can checkpoint the latest changes back into `storage.sqlite`. The bundled Compose files already set a 40s stop grace period. If you run the image directly, keep `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Set to `true` if routine/pre-write backups are managed externally. Existing-database migrations still require their own durable safety snapshot and mass-migration guard.
- **Data Persistence:** Always mount a volume to `/app/data` to persist your database, keys, and configurations across container restarts.
- **Port Configuration:** Override `PORT` environment variable to change the default `20128` port.

## See Also

- [VM Deployment Guide](../ops/VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare setup
- [Fly.io Deployment Guide](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Deploy to Fly.io
- [Environment Config](../reference/ENVIRONMENT.md) — Complete `.env` reference
