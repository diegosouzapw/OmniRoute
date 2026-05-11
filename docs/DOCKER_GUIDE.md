# 🐳 Docker Guide — OmniRoute

> Complete Docker deployment reference. For a quick start, see the [README Docker section](../README.md#-docker).

## Table of Contents

- [Quick Run](#quick-run)
- [Windows PowerShell Wizard](#windows-powershell-wizard)
- [With Environment File](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Docker Compose with Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Image Tags](#image-tags)
- [Important Notes](#important-notes)

---

## Quick Run

Linux/macOS shells:

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Windows PowerShell Wizard

From the repository root, the easiest Windows command is:

```powershell
.\scripts\setup-windows.ps1 -InstallDocker
```

The wizard installs Docker Desktop with `winget` when Docker is missing, starts Docker Desktop if it can, waits for Docker, pulls the image, creates the persistent `omniroute-data` volume, starts the container, skips onboarding, disables dashboard login for local setup, and prints the dashboard URL.

No default password is used by this setup flow. To require a dashboard password, run `./scripts/setup-windows.ps1 -RequirePassword`.

If Docker Desktop was just installed and Windows asks you to restart or accept Docker Desktop's first-run setup, do that once and rerun the same command.

If Docker Desktop is already installed, this also works:

```powershell
.\scripts\setup-windows.ps1
```

One-command GitHub download, useful for video tutorials:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
irm https://raw.githubusercontent.com/VusalAbdurahmanovX/OmniRoute/main/scripts/setup-windows.ps1 -OutFile setup-windows.ps1
.\setup-windows.ps1 -InstallDocker
```

Raw PowerShell command:

```powershell
docker run -d `
  --name omniroute `
  --restart unless-stopped `
  --stop-timeout 40 `
  -p 20128:20128 `
  -v omniroute-data:/app/data `
  diegosouzapw/omniroute:latest
```

The raw Docker command may show onboarding on first open. Use `setup-windows.ps1` for the no-onboarding flow.

PowerShell uses a backtick (`` ` ``) for multiline commands. A Linux-style backslash (`\`) makes PowerShell run each following line as a separate command.

More details: [Windows Quick Start](WINDOWS_QUICK_START.md).

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

All services in `docker-compose.yml` use Compose profiles. Choose one profile; plain `docker compose up -d` has no default service and prints `no service selected`.

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

Common command fixes:

| Problem                                      | Fix                                                |
| -------------------------------------------- | -------------------------------------------------- |
| `docker compse ps`                           | `docker compose ps`                                |
| `docker compose up -d`                       | `docker compose --profile base up -d`              |
| `unknown shorthand flag: 's' in -s`          | Use `docker compose ps`, not `docker compose up -s` |
| `failed to connect to the docker API`        | Start Docker Desktop first                         |
| `--name` / `-p` errors after a `docker run`  | Use PowerShell backticks or put the command on one line |

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
| `diegosouzapw/omniroute` | `3.7.8`  | ~250MB | Current version       |

Multi-platform: AMD64 + ARM64 native (Apple Silicon, AWS Graviton, Raspberry Pi).

## Important Notes

- **SQLite WAL Mode:** `docker stop` should be allowed to finish so OmniRoute can checkpoint the latest changes back into `storage.sqlite`. The bundled Compose files already set a 40s stop grace period. If you run the image directly, keep `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Set to `true` if backups are managed externally.
- **Data Persistence:** Always mount a volume to `/app/data` to persist your database, keys, and configurations across container restarts.
- **Port Configuration:** Override `PORT` environment variable to change the default `20128` port.

## See Also

- [VM Deployment Guide](VM_DEPLOYMENT_GUIDE.md) — VM + nginx + Cloudflare setup
- [Fly.io Deployment Guide](FLY_IO_DEPLOYMENT_GUIDE.md) — Deploy to Fly.io
- [Environment Config](ENVIRONMENT.md) — Complete `.env` reference
