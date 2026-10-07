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
> `Radar Export`, Electron/nightly release jobs) are repository-guarded to
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

The image target is **`runner-web`** (includes Chromium/Playwright for
`gemini-web` / `claude-web` / `claude-turnstile`). If you do not use browser-based
providers, publish `runner-base` instead and drop the extra size.

---

## 2. Build & publish the image

Push to the production branch (this fork's default is `develop`; `main` in a
standard fork) or run the workflow manually to trigger
`.github/workflows/production-publish.yml`:

- Builds `target: runner-web`, `platforms: linux/amd64`.
- Pushes to `ghcr.io/<owner>/<repo>` with tags `latest` and `sha-<short>`.
- Uses the repository `GITHUB_TOKEN` for `packages: write`.

After the first successful run, make the package **private** (default for GHCR)
and create a Coolify Registry entry (see §3).

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

   | Variable                     | Required | Notes                                                                                         |
   | ---------------------------- | :------: | --------------------------------------------------------------------------------------------- |
   | `OMNIROUTE_IMAGE`            |    ✅    | `ghcr.io/<owner>/<repo>:sha-<short>`                                                          |
   | `JWT_SECRET`                 |    ✅    | `openssl rand -base64 48`                                                                     |
   | `API_KEY_SECRET`             |    ✅    | `openssl rand -hex 32`                                                                        |
   | `STORAGE_ENCRYPTION_KEY`     |    ✅    | `openssl rand -base64 32` — encrypts stored credentials                                       |
   | `OMNIROUTE_WS_BRIDGE_SECRET` |    ✅    | `openssl rand -base64 32` — **required in production**; WS bridge rejects requests without it |
   | `INITIAL_PASSWORD`           |    ✅    | first-login admin password; **rotate after first login**                                      |
   | `REQUIRE_API_KEY`            |    ➖    | default `true`; set `false` only on a trusted private network                                 |
   | `OMNIROUTE_BIND_HOST`        |    ➖    | default `127.0.0.1` (see §4)                                                                  |
   | `OMNIROUTE_PORT`             |    ➖    | default `20128` (dashboard)                                                                   |
   | `OMNIROUTE_API_PORT`         |    ➖    | default `20129` (API)                                                                         |
   | `OMNIROUTE_WS_PORT`          |    ➖    | default `20132` (live WS)                                                                     |
   | `OMNIROUTE_MEMORY_LIMIT`     |    ➖    | default `2048m`                                                                               |
   | `OMNIROUTE_CPUS`             |    ➖    | default `2.0`                                                                                 |
   | `OMNIROUTE_PIDS_LIMIT`       |    ➖    | default `512`                                                                                 |
   | `QDRANT_API_KEY`             |    ➖    | only if you front Qdrant with auth                                                            |

   Generate the secrets:

   ```bash
   openssl rand -base64 48   # JWT_SECRET
   openssl rand -hex 32      # API_KEY_SECRET
   openssl rand -base64 32   # STORAGE_ENCRYPTION_KEY
   openssl rand -base64 32   # OMNIROUTE_WS_BRIDGE_SECRET
   ```

4. **Volumes** must be persistent (Coolify keeps named volumes across redeploys):
   - `omniroute-data` → `/app/data` (SQLite store + `secrets.json`)
   - `omniroute-redis-data` → `/data`
   - `omniroute-qdrant-data` → `/qdrant/storage`

---

## 4. Network exposure (Tailscale-first)

Ports bind to **`127.0.0.1`** by default. This is intentional: expose OmniRoute
through Tailscale (or the Coolify proxy) rather than the public internet.

- **Tailscale**: install Tailscale on the Contabo host, then reach the app at
  `http://<tailscale-ip>:20128` (or bind `OMNIROUTE_BIND_HOST` to the Tailscale
  interface IP for direct access).
- **Coolify proxy / public domain**: only after Tailscale-only access is
  validated, set `OMNIROUTE_BIND_HOST=0.0.0.0` and attach a domain in Coolify.
  Also tighten `LIVE_WS_ALLOWED_ORIGINS` to your real hostname.

---

## 5. Migrating existing data

OmniRoute stores everything in `DATA_DIR` (SQLite `storage.sqlite` + sibling
`*.sqlite` + `secrets.json`). Move it with the first-party ops scripts in `bin/`
— never a live `cp` under WAL.

### 5.1 Snapshot on the source host

```bash
DATA_DIR=~/.omniroute bin/snapshot-data.sh --label pre-coolify
```

This prints a snapshot id and writes
`$DATA_DIR/db_backups/snapshot_<UTC>_pre-coolify/`.

### 5.2 Copy the snapshot to the target

```bash
scp -r ~/.omniroute/db_backups/snapshot_*_pre-coolify \
  root@<contabo-host>:/root/omniroute-snapshot
```

### 5.3 Restore into the Coolify volume

Stop the `omniroute` service in Coolify first (no WAL writers), then restore from
inside the running volume:

```bash
# Resolve the named volume mountpoint on the target host
VOL=$(docker volume inspect omniroute-data --format '{{ .Mountpoint }}')

# Put the snapshot where restore-data.sh expects it
mkdir -p "$VOL/db_backups"
cp -a /root/omniroute-snapshot "$VOL/db_backups/"

# Restore (writes a pre-restore safety snapshot first)
DATA_DIR="$VOL" bin/restore-data.sh pre-coolify --yes
```

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
- [ ] `omniroute-data` volume survives a redeploy.
- [ ] Upstream workflows (`docker-publish`, `npm-publish`, `deploy-vps`,
      `wiki-sync`, `radar-export`) show **skipped** in this fork's Actions.
