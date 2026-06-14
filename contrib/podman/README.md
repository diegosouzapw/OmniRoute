# Podman Deployment

Run OmniRoute with Podman via **Quadlet** (systemd integration) or **podman compose**.

---

## Option A: Quadlet (recommended)

### 1. Build the image

```bash
cd /path/to/omniroute
podman build --target runner-base -t omniroute:base .
# For web-cookie providers (gemini-web, claude-web, claude-turnstile):
podman build --target runner-web -t omniroute:web .
# For CLI tool support:
podman build --target runner-cli -t omniroute:cli .
```

### 2. Copy Quadlet files to the systemd directory

```bash
mkdir -p ~/.config/containers/systemd/omniroute
cp contrib/podman/*.container ~/.config/containers/systemd/omniroute/
cp contrib/podman/*.network ~/.config/containers/systemd/omniroute/
cp contrib/podman/*.volume ~/.config/containers/systemd/omniroute/
```

### 3. Mount the project .env for secrets

Edit `~/.config/containers/systemd/omniroute/omniroute.container` and
uncomment/replace the `EnvironmentFile` line with the absolute path to
your project `.env`:

```
EnvironmentFile=/home/USER/code/docker/OmniRoute/.env
```

Make sure `CONTAINER_HOST=podman` is set in that `.env`.

Alternatively, edit the env vars directly in the `.container` file.

### 4. Reload systemd and start

```bash
systemctl --user daemon-reload
systemctl --user start omniroute-redis
systemctl --user start omniroute
```

### 5. Verify

```bash
systemctl --user status omniroute
curl http://localhost:20128/v1/models
```

To follow logs:

```bash
journalctl --user -u omniroute -f
```

### 6. Enable on boot

```bash
systemctl --user enable omniroute-redis
systemctl --user enable omniroute
```

---

## Option B: podman compose

The project's `docker-compose.yml` now works with both Docker and Podman.
Just set `CONTAINER_HOST=podman` in `.env` before starting.

### 1. Prepare the data directory

Rootless Podman maps container UIDs into a subordinate range. The
`node` user (UID 1000) inside the container maps to a different UID
on the host, so it cannot write to `./data` owned by your host user.

Fix the ownership **before** starting:

```bash
mkdir -p data
podman unshare chown 1000:1000 ./data
```

### 2. Set the runtime in `.env`

Make sure `.env` contains:

```env
CONTAINER_HOST=podman
```

### 3. Start

```bash
podman compose --profile base up -d
```

### Profiles

Same profiles as `docker compose`:

| Profile                        | Command                                              |
| ------------------------------ | ---------------------------------------------------- |
| `base` (no CLIs)               | `podman compose --profile base up -d`                |
| `web` (+Chromium/Playwright)   | `podman compose --profile web up -d`                 |
| `cli` (+CLI tools)             | `podman compose --profile cli up -d`                 |
| `host` (host-mounted binaries) | `podman compose --profile host up -d`                |
| `cliproxyapi` (sidecar)        | `podman compose --profile cliproxyapi up -d`         |

---

## How it works

The `docker-compose.yml` uses fully-qualified image names
(`docker.io/library/redis:7-alpine`) and flat variable expansions so it
works with both Docker and Podman without a separate compose file.

The entrypoint script (`check-permissions.sh`) reads `CONTAINER_HOST`
from `.env` to give the correct fix instructions:
- **docker**: `sudo chown -R ... ./data`
- **podman**: `podman unshare chown 1000:1000 ./data`
