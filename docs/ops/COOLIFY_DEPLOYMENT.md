---
title: "Coolify Production Deployment"
version: 3.8.52
lastUpdated: 2026-10-07
---

# Coolify Production Deployment (GHCR + Qdrant + Redis)

Deploy OmniRoute in production on [Coolify](https://coolify.io) (Contabo / VPS,
`linux/amd64`) using a private image from **GHCR** and the hardened
`docker-compose.coolify.yml` stack.

This guide is the operator-facing companion to:

- `docker-compose.coolify.yml` — the production stack (app + Redis + Qdrant).
- `.github/workflows/production-publish.yml` — builds and publishes the image.

> **Scope.** This is a fork deployment layout. Upstream publishing workflows
> (`Publish to Docker Hub`, `Publish to npm`, `Deploy to VPS`, `Wiki Sync`,
> `Radar Export`, nightly release jobs) are repository-guarded to
> `diegosouzapw/OmniRoute` and will no-op in this fork. Only
> `production-publish.yml` publishes here.

---

## 1. What the stack runs

| Service     | Image                                   | Purpose                                     |
| ----------- | --------------------------------------- | ------------------------------------------- |
| `omniroute` | `${OMNIROUTE_IMAGE}` (GHCR, runner-web) | API + dashboard + Chromium-based providers  |
| `redis`     | `redis:8.6.5-alpine`                    | Distributed rate limiting / session backend |
| `qdrant`    | `qdrant/qdrant:v1.12.4`                 | Persistent vector Memory Engine             |

Both `redis` and `qdrant` are **internal-only** (no host ports); OmniRoute reaches
them at `redis:6379` and `qdrant:6333` on the compose network.

The production image is always built with **`target: runner-web`** and
**`platforms: linux/amd64`**. This includes Playwright, playwright-core, Chromium,
and the supported `gemini-web`, `claude-web`, and `claude-turnstile` providers.
The Coolify Compose file consumes the already-built GHCR image; it intentionally
has no `build.target` because target selection belongs to CI, not runtime.

---

## 2. Build & publish the image

Push to `main` (the production branch) or run the workflow manually to trigger
`.github/workflows/production-publish.yml`:

- Builds `target: runner-web`, `platforms: linux/amd64`.
- Pushes to `ghcr.io/paulohsoliveira/my-omniroute` with `latest` only from `main`
  and the immutable `sha-<short>` tag.
- Uses the repository `GITHUB_TOKEN` for `packages: write`.

After the first successful run, make the package **private** (default for GHCR)
and create a Coolify Registry entry (see §3). The workflow supplies the private
image's OCI source/url labels as `https://github.com/PauloHSOliveira/my-omniroute`;
Dockerfile labels for the MIT license remain intact. BuildKit applies the labels
from `docker/build-push-action` to the selected `runner-web` image, overriding any
same-key base-stage value rather than changing the license or service names.

Pin production to an immutable digest or `sha-<short>` tag rather than `latest`
so a redeploy never picks up an unexpected build.

---

## 3. Coolify setup

1. **Registry** → _New Registry_ → **GitHub Container Registry**
   - URL: `ghcr.io`
   - Username: your GitHub username
   - Password: a GitHub PAT with `read:packages` (a classic token is fine).

2. **Project → New Resource → Docker Compose**
   - Source: this repository, file `docker-compose.coolify.yml`.
   - Coolify reads the compose file and renders the env-var form.

3. **Environment Variables / Secrets** (mark every secret as _Secret_):

   | Variable                         | Required | Notes                                                                          |
   | -------------------------------- | :------: | ------------------------------------------------------------------------------ |
   | `OMNIROUTE_IMAGE`                |    ✅    | `ghcr.io/paulohsoliveira/my-omniroute:sha-<short>`                             |
   | `JWT_SECRET`                     |    ✅    | Fresh install: generate; migration: preserve the existing value                |
   | `API_KEY_SECRET`                 |    ✅    | Fresh install: generate; migration: preserve the existing value                |
   | `STORAGE_ENCRYPTION_KEY`         |    ✅    | Fresh install: generate; migration: preserve the existing value                |
   | `STORAGE_ENCRYPTION_KEY_VERSION` |    ✅    | Migration: preserve the existing version; do not silently reset it             |
   | `OMNIROUTE_WS_BRIDGE_SECRET`     |    ✅    | **required in production**; preserve it during migration if already configured |
   | `INITIAL_PASSWORD`               |    ➖    | Fresh install bootstrap only; normally omit during migration                   |
   | `REQUIRE_API_KEY`                |    ➖    | default `true`; set `false` only on a trusted private network                  |
   | `OMNIROUTE_BIND_HOST`            |    ➖    | host bind for the published dashboard port; default `127.0.0.1` (see §4)       |
   | `OMNIROUTE_PORT`                 |    ➖    | host port for the dashboard/API; default `20128`                               |
   | `OMNIROUTE_MEMORY_LIMIT`         |    ➖    | default `2048m`                                                                |
   | `OMNIROUTE_CPUS`                 |    ➖    | default `2.0`                                                                  |
   | `OMNIROUTE_PIDS_LIMIT`           |    ➖    | default `512`                                                                  |
   | `QDRANT_API_KEY`                 |    ➖    | only if you front Qdrant with auth                                             |

   **Fresh install only:** generate new values for secrets that do not already
   exist. **Migration:** copy the existing values into Coolify; never regenerate,
   print, or commit them. Preserve `STORAGE_ENCRYPTION_KEY`,
   `STORAGE_ENCRYPTION_KEY_VERSION`, `API_KEY_SECRET`, and `JWT_SECRET`.

   ```bash
   openssl rand -base64 48   # JWT_SECRET, fresh install only
   openssl rand -hex 32      # API_KEY_SECRET, fresh install only
   openssl rand -base64 32   # STORAGE_ENCRYPTION_KEY, fresh install only
   openssl rand -base64 32   # OMNIROUTE_WS_BRIDGE_SECRET, when needed
   ```

4. **Volumes** must be persistent (Coolify keeps named volumes across redeploys):
   - `omniroute-data` → `/app/data` (SQLite store + `secrets.json`)
   - `omniroute-redis-data` → `/data`
   - `omniroute-qdrant-data` → `/qdrant/storage`

---

## 4. Network exposure (Tailscale-first)

The Compose file publishes only `20128`, bound to **`127.0.0.1`** by default.
Ports `20129` and `20132` are exposed only on the Compose network for internal
proxy/service access; Redis and Qdrant have no host ports.

- **Direct Tailscale**: `http://<TAILSCALE-IP>:20128` works only when the host
  binding reaches the Tailscale interface. Set
  `OMNIROUTE_BIND_HOST=<TAILSCALE_IPV4_OF_THE_HOST>` for that mode.
- **Coolify proxy**: it can reach `omniroute:20128` through the Compose network.
  A public bind such as `0.0.0.0` is not enabled automatically; use the Coolify
  proxy/serve path deliberately if public access is required.

---

## 5. Migrating existing data

OmniRoute stores everything in `DATA_DIR` (SQLite `storage.sqlite` + sibling
`*.sqlite` + `secrets.json`). Move it with the first-party ops scripts in `bin/`
— never a live `cp` under WAL.

### 5.1 Snapshot on the source host

The local Compose deployment (`docker-compose.local.yml`) keeps the active data
in the named volume `omniroute-local-data` mounted at `/app/data` — not in
`~/.omniroute`. Run the first-party scripts from the repository checkout against
the resolved volume mountpoint. On a Linux Docker host:

```bash
VOL=$(docker volume inspect omniroute-local-data --format '{{ .Mountpoint }}')

# Stop the app first if the host has no sqlite3 (the script then falls back to a
# plain copy, which is only clean with no WAL writers).
docker compose -f docker-compose.local.yml stop omniroute

DATA_DIR="$VOL" bin/snapshot-data.sh --label pre-coolify
```

`bin/snapshot-data.sh` uses `sqlite3 … VACUUM INTO` when `sqlite3` is available,
which is transactionally consistent even with writers active. The script prints a
snapshot id and writes `$VOL/db_backups/snapshot_<UTC>_pre-coolify/`.

On Docker Desktop (where the mountpoint is inside the Linux VM), snapshot from a
container that has `bash` and `sqlite3` and mounts both the volume and the repo
`bin/`:

```bash
docker run --rm \
  -v omniroute-local-data:/app/data \
  -v "$PWD/bin:/opt/omniroute/bin:ro" \
  debian:bookworm-slim \
  bash -lc 'apt-get update -qq && apt-get install -y -qq sqlite3 ca-certificates \
    && /opt/omniroute/bin/snapshot-data.sh --data-dir /app/data --label pre-coolify'
```

### 5.2 Copy the snapshot to the target

```bash
VOL=$(docker volume inspect omniroute-local-data --format '{{ .Mountpoint }}')
scp -r "$VOL/db_backups/snapshot_"*_pre-coolify \
  root@<contabo-host>:/root/omniroute-snapshot
```

### 5.3 Restore into the Coolify volume

Stop the `omniroute` service in Coolify first (no WAL writers), then restore from
inside the target host's volume. The app runs as UID/GID `1000` (`node`), so fix
ownership after copying or the container cannot open the database:

```bash
# Resolve the target named volume mountpoint (name from docker-compose.coolify.yml)
VOL=$(docker volume inspect omniroute-data --format '{{ .Mountpoint }}')

# Put the snapshot where restore-data.sh expects it
mkdir -p "$VOL/db_backups"
cp -a /root/omniroute-snapshot "$VOL/db_backups/"
chown -R 1000:1000 "$VOL"

# Restore (writes a pre-restore safety snapshot first)
DATA_DIR="$VOL" bin/restore-data.sh pre-coolify --yes
chown -R 1000:1000 "$VOL"
```

Do not use `docker compose down -v`: it deletes the named volumes and all data.

Start the service again and confirm the dashboard lists your providers/keys.
Generate `STORAGE_ENCRYPTION_KEY` **once** and never change it after restore, or
previously encrypted credentials can no longer be decrypted (see
`src/lib/db/encryption.ts`).

---

## 6. Verification checklist

- [ ] `docker compose -f docker-compose.coolify.yml config` parses locally.
- [ ] GHCR image built for `linux/amd64`, target `runner-web`.
- [ ] `omniroute` reaches Redis (`redis:6379`) and Qdrant (`qdrant:6333`).
- [ ] Dashboard loads over Tailscale; login succeeds.
- [ ] Data from the old host is visible (providers, keys, memory).
- [ ] Migration used the pre-existing `JWT_SECRET`, `API_KEY_SECRET`,
      `STORAGE_ENCRYPTION_KEY`, and `STORAGE_ENCRYPTION_KEY_VERSION` (no reset).
- [ ] `omniroute-data` volume survives a redeploy.
- [ ] Upstream workflows (`docker-publish`, `npm-publish`, `deploy-vps`,
      `wiki-sync`, `radar-export`) show **skipped** in this fork's Actions.
