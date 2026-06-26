---
title: "Setup & Run Guide — OmniRoute"
version: 3.8.36
lastUpdated: 2026-06-26
---

# Setup & Run Guide — OmniRoute

> One consolidated reference for every way to install and run OmniRoute. This
> guide pulls together the commands that were previously scattered across the
> README, `docs/guides/SETUP_GUIDE.md`, `docs/guides/DOCKER_GUIDE.md`,
> `contrib/podman/README.md`, `docs/ops/VM_DEPLOYMENT_GUIDE.md`, and
> `docs/guides/REMOTE-MODE.md`. Each section links to the deeper guide where
> relevant.
>
> For the 3-step quick start, see the
> [Quick Start in the README](../README.md#-quick-start).

## Table of Contents

- [Prerequisites](#prerequisites)
- [1. Electron Desktop App (install & launch locally)](#1-electron-desktop-app-install--launch-locally)
- [2. Docker](#2-docker)
- [3. Podman](#3-podman)
- [4. VM / VPS Setup](#4-vm--vps-setup)
- [5. Remote Mode](#5-remote-mode)
- [Other Install Methods](#other-install-methods)
- [Common Ports & Environment Variables](#common-ports--environment-variables)
- [Verifying It Works](#verifying-it-works)

---

## Prerequisites

- **Node.js** `>=22.0.0 <23 || >=24.0.0 <27` (24 LTS recommended) — see
  `package.json` `engines`. Verify with `node -v`.
- For building from source / Electron / Docker / Podman: a checkout of this repo.
- For Docker/Podman: the respective runtime installed.
- For VM/VPS: an Ubuntu 22.04+ server (or equivalent) with Docker installed.

> `npm install` auto-generates `.env` from `.env.example` on first run and will
> not overwrite an existing `.env` afterwards. To re-seed, delete `.env` first.

---

## 1. Electron Desktop App (install & launch locally)

OmniRoute ships a desktop wrapper (Electron 42 + electron-builder 26). It runs the
same Next.js server as the web app, plus a native window and system tray.

### From a published installer

Download the installer for your OS from the latest
[GitHub Release](https://github.com/diegosouzapw/OmniRoute/releases) and run it.
No build step required.

### From source (development)

Run the dev server and the Electron shell together. The `electron:dev` script
starts the Next.js dev server and waits for `http://localhost:20128` before
launching Electron.

**Unix / macOS / Linux:**

```bash
npm install
npm run electron:dev
```

**Windows (cmd / PowerShell):**

```bat
npm install
npm run electron:dev
```

### Build installers from source

These scripts build the Next.js standalone bundle first (`npm run build`), then
package the Electron app for the target OS. Run them from the repo root.

| Script                            | What it produces                             |
| --------------------------------- | -------------------------------------------- |
| `npm run electron:build`          | Installer for the current OS (auto-detected) |
| `npm run electron:build:win`      | Windows installer (NSIS + portable)          |
| `npm run electron:build:mac`      | macOS (dmg, arm64 + x64)                     |
| `npm run electron:build:linux`    | Linux (AppImage + deb)                       |
| `npm run electron:smoke:packaged` | Smoke-test a packaged build                  |

```bash
npm install
npm run electron:build          # current OS
npm run electron:build:win      # Windows only
npm run electron:build:mac      # macOS only
npm run electron:build:linux    # Linux only
```

The Electron sub-project (`electron/`) has its own `package.json`; the
root-level scripts above delegate into it. Once the desktop app is running, the
dashboard opens at `http://localhost:20128` and the API at
`http://localhost:20128/v1`.

> Deep dive: [`electron/README.md`](../electron/README.md).

---

## 2. Docker

### Quick run (prebuilt image)

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

Dashboard: `http://localhost:20128` · API: `http://localhost:20128/v1`.

> Keep `--stop-timeout 40` so SQLite can checkpoint its WAL on shutdown. The
> bundled Compose files already set a 40s stop grace period.

### With an environment file

```bash
cp .env.example .env   # then edit secrets (see Prerequisites / env table below)

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

### Docker Compose (profiles)

The repo's `docker-compose.yml` ships several profiles. Pick the one that
matches your use case. A `redis` sidecar is always defined and starts alongside
any profile.

```bash
docker compose --profile base up -d                        # minimal, no CLI tools
docker compose --profile web up -d                         # +Chromium/Playwright (gemini-web, claude-web)
docker compose --profile cli up -d                         # CLIs installed in-container (Codex, Claude Code, OpenClaw)
docker compose --profile host up -d                        # host-mounted CLI binaries (Linux-first)
docker compose --profile cliproxyapi up -d                 # CLIProxyAPI sidecar on port 8317
docker compose --profile cli --profile cliproxyapi up -d   # combine profiles
docker compose --profile base --profile memory up -d       # +Qdrant semantic-memory sidecar
docker compose --profile base --profile bifrost up -d      # +Bifrost Go LLM-router sidecar
```

| Profile       | Service          | When to use                                                                      |
| ------------- | ---------------- | -------------------------------------------------------------------------------- |
| `base`        | `omniroute-base` | Headless server / minimal runtime, no provider CLIs                              |
| `web`         | `omniroute-web`  | Web-cookie providers (gemini-web, claude-web, claude-turnstile) — needs Chromium |
| `cli`         | `omniroute-cli`  | Agentic workflows calling bundled CLIs (Codex, Claude Code, Droid, OpenClaw)     |
| `host`        | `omniroute-host` | Linux hosts mounting `~/.local/bin`, `~/.codex`, `~/.claude`, etc. read-only     |
| `cliproxyapi` | `cliproxyapi`    | CLIProxyAPI sidecar on port `8317`                                               |
| `memory`      | `qdrant`         | Qdrant semantic-memory offload (opt-in)                                          |
| `bifrost`     | `bifrost`        | Bifrost Go Tier-1 LLM-router sidecar (opt-in)                                    |

### Build a specific image target

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-web  -t omniroute:web  .
docker build --target runner-cli  -t omniroute:cli  .
```

### Production Compose

For an isolated production snapshot (separate ports/volumes from dev):

```bash
docker compose -f docker-compose.prod.yml up -d --build   # ports 20130 (dashboard) / 20131 (api)
docker compose -f docker-compose.prod.yml logs -f
docker compose -f docker-compose.prod.yml down            # keeps volumes
```

### Image tags

| Image                    | Tag      | Platforms                     |
| ------------------------ | -------- | ----------------------------- |
| `diegosouzapw/omniroute` | `latest` | `linux/amd64` + `linux/arm64` |
| `diegosouzapw/omniroute` | `3.8.36` | `linux/amd64` + `linux/arm64` |

> Deep dive: [`docs/guides/DOCKER_GUIDE.md`](guides/DOCKER_GUIDE.md).

---

## 3. Podman

The repo's `docker-compose.yml` works with both Docker and Podman (it uses
fully-qualified image names). Set `CONTAINER_HOST=podman` in `.env` first.

### Option A — podman compose

Rootless Podman maps container UIDs into a subordinate range, so the in-container
`node` user (UID 1000) cannot write to a host `./data` owned by your user. Fix
ownership **before** starting.

```bash
# 1. Build the base image (or web / cli targets)
podman build --target runner-base -t omniroute:base .

# 2. Fix data directory permissions for rootless Podman
mkdir -p data
podman unshare chown 1000:1000 ./data

# 3. Tell the entrypoint to use podman
echo "CONTAINER_HOST=podman" >> .env

# 4. Start (same profiles as docker compose)
podman compose --profile base up -d
podman compose --profile web up -d      # +Chromium/Playwright
podman compose --profile cli up -d      # +CLI tools
podman compose --profile host up -d     # host-mounted binaries
```

### Option B — Quadlet (systemd integration, recommended for servers)

```bash
# 1. Build the image
podman build --target runner-base -t omniroute:base .

# 2. Copy Quadlet files into the systemd directory
mkdir -p ~/.config/containers/systemd/omniroute
cp contrib/podman/*.container ~/.config/containers/systemd/omniroute/
cp contrib/podman/*.network   ~/.config/containers/systemd/omniroute/
cp contrib/podman/*.volume    ~/.config/containers/systemd/omniroute/

# 3. Point the EnvironmentFile in omniroute.container at your project .env,
#    and ensure CONTAINER_HOST=podman is set there.

# 4. Reload systemd and start
systemctl --user daemon-reload
systemctl --user start omniroute-redis
systemctl --user start omniroute

# 5. Verify
systemctl --user status omniroute
curl http://localhost:20128/v1/models

# 6. Enable on boot
systemctl --user enable omniroute-redis
systemctl --user enable omniroute
```

> The `check-permissions.sh` entrypoint reads `CONTAINER_HOST` from `.env` and
> prints the correct ownership fix (`podman unshare chown 1000:1000 ./data`
> for Podman vs `sudo chown -R ... ./data` for Docker).
>
> Deep dive: [`contrib/podman/README.md`](../contrib/podman/README.md).

---

## 4. VM / VPS Setup

A complete VM deployment runs OmniRoute in Docker behind an nginx reverse proxy
with Cloudflare in front. This section consolidates the provisioning commands;
see [`docs/ops/VM_DEPLOYMENT_GUIDE.md`](ops/VM_DEPLOYMENT_GUIDE.md) for the full
walkthrough (Cloudflare origin certs, firewall hardening, backups).

### 4.1 Prerequisites

| Item   | Minimum           | Recommended      |
| ------ | ----------------- | ---------------- |
| CPU    | 1 vCPU            | 2 vCPU           |
| RAM    | 1 GB              | 2 GB             |
| Disk   | 10 GB SSD         | 25 GB SSD        |
| OS     | Ubuntu 22.04 LTS  | Ubuntu 24.04 LTS |
| Docker | Docker Engine 24+ | Docker 27+       |

Tested on Akamai (Linode), DigitalOcean, Vultr, Hetzner, AWS Lightsail.

### 4.2 Provision the VM

```bash
ssh root@203.0.113.10                      # your VM's public IP

# Update the system
apt update && apt upgrade -y

# Install Docker
apt install -y ca-certificates curl gnupg
install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Install nginx
apt install -y nginx

# Firewall (UFW) — allow SSH, HTTP, HTTPS
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### 4.3 Create the environment file

```bash
mkdir -p /opt/omniroute

cat > /opt/omniroute/.env << 'EOF'
# === Security (generate unique values: openssl rand -hex 32) ===
JWT_SECRET=CHANGE-TO-A-UNIQUE-64-CHAR-SECRET-KEY
INITIAL_PASSWORD=YourSecurePassword123!
API_KEY_SECRET=REPLACE-WITH-ANOTHER-SECRET-KEY
STORAGE_ENCRYPTION_KEY=REPLACE-WITH-THIRD-SECRET-KEY
STORAGE_ENCRYPTION_KEY_VERSION=v1
MACHINE_ID_SALT=CHANGE-TO-A-UNIQUE-SALT
OMNIROUTE_WS_BRIDGE_SECRET=REPLACE-WITH-WS-BRIDGE-SECRET

# === App ===
PORT=20128
NODE_ENV=production
HOSTNAME=0.0.0.0
DATA_DIR=/app/data
APP_LOG_TO_FILE=true
AUTH_COOKIE_SECURE=false
REQUIRE_API_KEY=false

# === Domain (change to your domain) ===
BASE_URL=https://llms.yourdomain.com
NEXT_PUBLIC_BASE_URL=https://llms.yourdomain.com
EOF
```

### 4.4 Start OmniRoute

```bash
docker pull diegosouzapw/omniroute:latest

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest

docker ps | grep omniroute          # should show "Up"
docker logs omniroute --tail 20     # expect "[DB] SQLite database ready" + "listening on port 20128"
```

### 4.5 nginx reverse proxy (HTTPS)

Generate a Cloudflare Origin certificate, then create the nginx site. The key
parts (full block in the VM guide): proxy to `http://127.0.0.1:20128`, WebSocket
upgrade headers, `proxy_buffering off` for SSE, and `proxy_read_timeout 600s`
aligned with OmniRoute's stream timeouts.

```bash
mkdir -p /etc/nginx/ssl
# paste origin cert -> /etc/nginx/ssl/origin.crt
# paste private key -> /etc/nginx/ssl/origin.key
chmod 600 /etc/nginx/ssl/origin.key

# create /etc/nginx/sites-available/omniroute (proxy_pass http://127.0.0.1:20128)
rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/omniroute /etc/nginx/sites-enabled/omniroute
nginx -t && systemctl reload nginx
```

### 4.6 Operations

```bash
# Upgrade to a new version
docker pull diegosouzapw/omniroute:latest
docker stop omniroute && docker rm omniroute
docker run -d --name omniroute --restart unless-stopped \
  --env-file /opt/omniroute/.env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest

# Logs
docker logs -f omniroute
```

### 4.7 Port summary

| Port  | Service     | Access                     |
| ----- | ----------- | -------------------------- |
| 22    | SSH         | Public (with fail2ban)     |
| 80    | nginx HTTP  | Redirect → HTTPS           |
| 443   | nginx HTTPS | Via Cloudflare Proxy       |
| 20128 | OmniRoute   | Localhost only (via nginx) |

> Deep dive: [`docs/ops/VM_DEPLOYMENT_GUIDE.md`](ops/VM_DEPLOYMENT_GUIDE.md).

---

## 5. Remote Mode

Run the `omniroute` CLI on your laptop while OmniRoute itself runs on a VPS, home
server, or another machine. You log in once with `omniroute connect`; from then
on every CLI command targets that remote server. There is no second tool to
install — remote mode is the regular CLI plus scoped **access tokens**.

> The server must be reachable from the client (a bare host defaults to `http://`
> for LAN/Tailscale convenience; pass a full `https://…` URL for TLS). Non-
> localhost hosts can connect because OmniRoute binds to `0.0.0.0` by default.

### On the server (once)

Install and start OmniRoute by any method above (npm global, Docker, VM, …). No
special "remote" flag is required — the management API (`/api/cli/*`) is part of
the normal server. Set a strong `INITIAL_PASSWORD` (or change it from
Dashboard → Settings → Security after first login).

### On the client (your laptop)

```bash
npm install -g omniroute                 # the normal CLI

# Connect (management password → admin token, saved as the active context)
omniroute connect 192.168.0.15           # or: --key oma_live_xxxx  (no password)
omniroute connect 192.168.0.15 --scope write
omniroute connect https://omni.example.com

# Every command now runs against the remote
omniroute models list                    # lists the REMOTE server's models
omniroute configure codex                # writes a local Codex profile from the remote catalog
omniroute setup-codex                    # remote-aware per-CLI setup (see table below)
```

### Scopes

Three hierarchical levels (`admin ⊃ write ⊃ read`):

| Scope   | Can do                                                                    |
| ------- | ------------------------------------------------------------------------- |
| `read`  | list/inspect — `models list`, `providers status`, `logs`, `usage`, `cost` |
| `write` | read + configure/apply — `setup-codex`, `keys add`, `config set`, combos  |
| `admin` | write + manage — `tokens` CRUD, add providers, services, policy, oauth    |

> Routes that spawn processes (`/api/services/*`, `/api/mcp/*`, …) stay
> **loopback-only** — a remote token can never reach them, regardless of scope.

### Managing tokens

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]   # secret shown ONCE
omniroute tokens list                                                  # masked list
omniroute tokens revoke <id|prefix>                                    # kill access
omniroute tokens scopes                                                # explain scopes
```

### Managing contexts (switch between servers)

```bash
omniroute contexts list                 # all contexts; active marked ●
omniroute contexts current              # active server, auth status, scope
omniroute contexts use vps              # → all commands now hit the remote
omniroute contexts use default          # → back to localhost
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write
omniroute contexts remove vps --yes     # drops the LOCAL credential only
```

### Per-CLI remote setup commands

Each honours the active context (or `--remote <url> --api-key <key>`):

| CLI         | Command                    | Writes                                             |
| ----------- | -------------------------- | -------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml`                      |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json`          |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json`                 |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/*.json` + VS Code settings          |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` + VS Code settings |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml`                          |
| Cursor      | `omniroute setup-cursor`   | prints in-app steps                                |
| Roo Code    | `omniroute setup-roo`      | Roo import JSON + autoImport pointer               |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json`                       |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml`                      |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json`                            |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml`                                |
| Gemini CLI  | `omniroute setup-gemini`   | native Gemini API (`~/.gemini/settings.json`)      |

> Deep dive: [`docs/guides/REMOTE-MODE.md`](guides/REMOTE-MODE.md).

---

## Other Install Methods

### npm (global, recommended for CLI use)

```bash
npm install -g omniroute
omniroute
```

### pnpm

```bash
pnpm install -g omniroute
pnpm approve-builds -g   # approve native build scripts (better-sqlite3, @swc/core)
omniroute
```

### From source (development)

**Unix / macOS / Linux:**

```bash
cp .env.example .env
npm install
PORT=20128 npm run dev
```

**Windows (cmd / PowerShell):**

```bat
copy .env.example .env
npm install
set PORT=20128 && npm run dev
```

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

### Nix (Flake)

```bash
nix develop
npm run dev
```

### Headless / scripted setup (CI, automation)

```bash
omniroute setup --non-interactive
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
omniroute setup --list                          # every supported CLI tool (id + default command)
omniroute doctor                                # local diagnostics without starting the server
omniroute doctor --json                         # same, machine-readable
omniroute providers available                   # discover providers by category/search
omniroute providers test <id-or-name>           # validate one provider connection
omniroute providers test-all                    # validate every connected provider
```

> Deep dive: [`docs/guides/SETUP_GUIDE.md`](guides/SETUP_GUIDE.md).

---

## Common Ports & Environment Variables

| Variable                     | Default         | Purpose                                                          |
| ---------------------------- | --------------- | ---------------------------------------------------------------- |
| `PORT`                       | `20128`         | Canonical port for both dashboard and API (single-port mode)     |
| `DASHBOARD_PORT`             | `20128`         | Override dashboard port (split-port mode)                        |
| `API_PORT`                   | `20129`         | Override API port (split-port mode)                              |
| `LIVE_WS_PORT`               | `20129`         | Real-time dashboard WebSocket (overlaps `API_PORT` by design)    |
| `API_HOST`                   | `0.0.0.0`       | Bind address for the API (allows non-localhost / remote clients) |
| `HOSTNAME`                   | `0.0.0.0`       | Bind address (Docker default)                                    |
| `DATA_DIR`                   | `~/.omniroute`  | Database & config storage (`/app/data` in Docker)                |
| `CONTAINER_HOST`             | `docker`        | Container runtime hint (`docker` / `podman`) for entrypoint      |
| `REQUIRE_API_KEY`            | `false`         | Require an API key for all inference requests                    |
| `INITIAL_PASSWORD`           | `CHANGEME`      | First-boot dashboard password — change immediately               |
| `JWT_SECRET`                 | (required)      | Signs dashboard session tokens                                   |
| `API_KEY_SECRET`             | (required)      | Encrypts stored API keys at rest                                 |
| `OMNIROUTE_WS_BRIDGE_SECRET` | (prod required) | Shared secret for the WebSocket bridge                           |
| `REDIS_URL`                  | (opt-in)        | Rate-limiter/cache backend (`redis://redis:6379` in Compose)     |
| `OMNIROUTE_MEMORY_MB`        | `512`           | Node heap ceiling for the Docker standalone server               |

**Split-port mode** (API and dashboard on separate ports):

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

> Full reference: [`docs/reference/ENVIRONMENT.md`](reference/ENVIRONMENT.md).

---

## Verifying It Works

Whichever method you chose, confirm the server is up:

```bash
# Health / liveness
curl http://localhost:20128/health

# List models (replace YOUR_KEY with an Endpoint API key from the dashboard)
curl http://localhost:20128/v1/models -H "Authorization: Bearer YOUR_KEY"
```

Then point any OpenAI-compatible tool at:

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Dashboard → Endpoints]
Model:    auto            (zero-config smart routing — or any provider/model)
```

If your client cannot send `Authorization: Bearer …`, use the tokenized
compatibility aliases (documented in the README Quick Start).
