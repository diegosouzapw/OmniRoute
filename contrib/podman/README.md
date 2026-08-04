# Podman Deployment

Run OmniRoute with **podman compose** on Linux, macOS, or Windows, or with
**Quadlet** on a Linux host that runs systemd.

---

## Choose the deployment path

- **Linux with a local Podman engine and user systemd:** Compose or Quadlet.
- **macOS or Windows:** Compose. Podman runs containers in a remote Linux VM
  managed by Podman Machine; host-side `systemctl` and `podman unshare` do not
  operate on that engine.
- **Any other remote Podman connection (including an optional Linux Podman
  Machine):** treat it like Podman Machine, not like a local rootless engine.

## Option A: Quadlet (Linux + systemd only)

Use this option only when the Podman engine and user systemd instance run on the
same Linux host. The `systemctl --user` commands below do not configure a Podman
Machine from a macOS or Windows host.

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

The checked-in Quadlet files already contain `[Install]` sections with
`WantedBy=default.target`. The Quadlet generator applies those sections during
`systemctl --user daemon-reload`. Generated Quadlet services are transient
systemd units and must not be enabled with `systemctl enable`.

---

## Option B: podman compose (all supported host platforms)

The project's `docker-compose.yml` now works with both Docker and Podman.
Just set `CONTAINER_HOST=podman` in `.env` before starting.

### 1. Set the runtime in `.env`

Make sure `.env` contains:

```env
CONTAINER_HOST=podman
```

### 2. Prepare the data directory

The Compose profiles bind-mount `./data` at `/app/data`. Create the directory,
then use the permission guidance for your engine topology below.

```bash
mkdir -p data
```

### 3. Build and start

The application profiles use local image names such as `omniroute:base`; those
are build outputs, not published Docker Hub tags. On the first run, have Compose
build the selected profile:

```bash
podman compose --profile base up -d --build
```

Alternatively, build the matching target explicitly and tell Compose to reuse
that local image:

```bash
podman build --target runner-base -t omniroute:base .
podman compose --profile base up -d --no-build
```

### Profiles

Same profiles as `docker compose`:

| Profile                        | First-run command                             |
| ------------------------------ | --------------------------------------------- |
| `base` (no CLIs)               | `podman compose --profile base up -d --build` |
| `web` (+Chromium/Playwright)   | `podman compose --profile web up -d --build`  |
| `cli` (+CLI tools)             | `podman compose --profile cli up -d --build`  |
| `host` (host-mounted binaries) | `podman compose --profile host up -d --build` |
| `cliproxyapi` (sidecar)        | `podman compose --profile cliproxyapi up -d`  |

---

## Data directory permissions by topology

### Linux with a local rootless Podman engine

Rootless Podman maps container UIDs into a subordinate range. If the container
cannot write to the bind-mounted `./data`, run this **on the Linux host whose
local engine will run the container**:

```bash
podman unshare chown 1000:1000 ./data
```

Use this only when the CLI is connected to a local, non-remote Podman engine.
`podman unshare` is not available with a remote Podman client.

### macOS or Windows with Podman Machine

Podman on macOS and Windows runs the engine inside a Linux VM. The host CLI is a
remote client, so do **not** run `podman unshare` on the macOS or Windows host.
Create `./data` in the host directory shared with the machine and try the
Compose start command above; no ownership change is needed when that mount is
already writable.

If the bind mount is not writable and you do not need direct host access to the
database files, use a Podman-managed named volume with the published image.
Named volumes avoid host-directory UID translation:

```bash
podman volume create omniroute-data
podman run -d --name omniroute \
  --env-file .env \
  -e DATA_DIR=/app/data \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  docker.io/diegosouzapw/omniroute:latest
```

For a bind mount that still fails, inspect or repair the shared path from the
Podman Machine side (for example with `podman machine ssh`) according to the
machine provider's mount configuration. A container cannot reliably determine
or repair that host/VM topology for you.

---

## How it works

The `docker-compose.yml` uses fully-qualified image names
(`docker.io/library/redis:7-alpine`) and flat variable expansions so it
works with both Docker and Podman without a separate compose file.

The entrypoint script (`check-permissions.sh`) reads `CONTAINER_HOST`
from `.env` to choose the runtime guidance:

- **docker**: `sudo chown -R ... ./data`
- **podman**: a topology-neutral warning that points back to this guide, because
  the container cannot tell whether its engine is local or reached through
  Podman Machine.
