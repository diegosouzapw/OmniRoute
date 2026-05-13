# 🐳 Docker Guide — OmniRoute

> Complete Docker deployment reference. For a quick start, see the [README Docker section](../README.md#-docker).

## Table of Contents

- [Quick Run](#quick-run)
- [With Environment File](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Available Profiles](#available-profiles)
- [Redis Sidecar](#redis-sidecar)
- [Production Compose](#production-compose)
- [Dockerfile Stages](#dockerfile-stages)
- [Critical Environment Variables](#critical-environment-variables)
- [Docker Compose with Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image Tags](#image-tags)
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

## Redis Sidecar

OmniRoute relies on Redis to back the distributed rate limiter and shared cache. The `redis` service is **always defined** in `docker-compose.yml` (it has no profile gate) and starts alongside any other profile.

| Detail               | Value                             |
| -------------------- | --------------------------------- |
| Image                | `redis:7-alpine`                  |
| Container name       | `omniroute-redis`                 |
| Internal port        | `6379`                            |
| Host port (override) | `REDIS_PORT` (defaults to `6379`) |
| Volume               | `omniroute-redis-data` → `/data`  |
| Healthcheck          | `redis-cli ping` (10s interval)   |

Related environment variables:

- `REDIS_URL` — connection string injected into the app (`redis://redis:6379` by default).
- `REDIS_PORT` — host-side port mapping for the Redis container.

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

| Stage         | Base image                 | Purpose                                                                                                                                                            |
| ------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:24.15.0-trixie-slim` | Installs deps (`npm ci --legacy-peer-deps`) and runs `npm run build -- --webpack`                                                                                  |
| `runner-base` | `node:24.15.0-trixie-slim` | Production runtime with the Next.js standalone output. **No provider CLIs bundled.**                                                                               |
| `runner-cli`  | `runner-base`              | Adds `git`, `docker.io`, `docker-compose` and global CLIs: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Pick this for agentic workflows.** |

Build a specific target manually:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

Defaults exported by `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `NODE_OPTIONS=--max-old-space-size=256`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

## Critical Environment Variables

Beyond the defaults documented in [ENVIRONMENT.md](ENVIRONMENT.md), the following variables matter most when running under Docker:

| Variable                      | Purpose                                                                                             | Default                   |
| ----------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Shared secret for the WebSocket bridge. **Required in production** — set to a strong random string. | unset (must be provided)  |
| `REDIS_URL`                   | Connection string for the rate limiter / cache backend                                              | `redis://redis:6379`      |
| `REDIS_PORT`                  | Host-side port for the bundled Redis container                                                      | `6379`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Host path mounted into `cli` profile at `/workspace/omniroute` for self-update workflows            | `.` (current directory)   |
| `OMNIROUTE_MEMORY_MB`         | Node heap ceiling (`NODE_OPTIONS=--max-old-space-size`) baked into the image                        | `256` (set in Dockerfile) |
| `DASHBOARD_PORT` / `API_PORT` | Override exposed ports for dashboard (20128) and API (20129)                                        | `20128` / `20129`         |
| `PROD_DASHBOARD_PORT`         | Host-side dashboard port for `docker-compose.prod.yml`                                              | `20130`                   |
| `CLIPROXYAPI_PORT`            | Host-side port for the `cliproxyapi` sidecar                                                        | `8317`                    |

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
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com

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

| Image                    | Tag      | Size   | Description           |
| ------------------------ | -------- | ------ | --------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Latest stable release |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Current version       |

Multi-platform manifest: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). Docker selects the matching architecture automatically; pass `--platform linux/amd64` if you need to force AMD64 emulation on ARM hosts.

## Important Notes

- **SQLite WAL Mode:** `docker stop` should be allowed to finish so OmniRoute can checkpoint the latest changes back into `storage.sqlite`. The bundled Compose files already set a 40s stop grace period. If you run the image directly, keep `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Set to `true` if backups are managed externally.
- **Data Persistence:** Always mount a volume to `/app/data` to persist your database, keys, and configurations across container restarts.
- **Port Configuration:** Override `PORT` environment variable to change the default `20128` port.

## See Also

- [VM Deployment Guide](VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare setup
- [Fly.io Deployment Guide](FLY_IO_DEPLOYMENT_GUIDE.md) — Deploy to Fly.io
- [Environment Config](ENVIRONMENT.md) — Complete `.env` reference
