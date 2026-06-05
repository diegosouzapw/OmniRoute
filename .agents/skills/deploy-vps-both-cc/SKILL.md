---
name: deploy-vps-both-cc
description: Deploy the latest OmniRoute code to BOTH the Akamai VPS and the Local VPS
---

# Deploy to VPS (Both) Workflow

Deploy OmniRoute to both production VPSs using a clean `build:release` + `rsync` + PM2 restart.

**Akamai VPS:** `69.164.221.35`
**Local VPS:** `192.168.0.15`
**Process manager:** PM2 (`omniroute`)
**Port:** `20128`
**Remote install dir:** `/usr/lib/node_modules/omniroute/app/` (VPS image dir — unchanged)

> [!IMPORTANT]
> **Build must run where `node_modules` is REAL.** A git worktree with symlinked
> `node_modules` breaks the Next.js standalone assembly. Always build from the main
> checkout (or an `npm ci`'d worktree), never from `OmniRoute-*` worktrees unless
> you first ran `npm ci` inside them.

## Steps

### 1. Clean build + sentinel

Build **once** locally — the same `dist/` is shipped to both VPSs:

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/OmniRoute && npm run build:release
```

`build:release` does:
1. Deletes `.build/` and `dist/` (clean rebuild — no stale cache)
2. Runs `next build` → `.build/next/` (intermediates)
3. Assembles the shippable bundle into `dist/` via `assembleStandalone`
4. Writes `dist/BUILD_SHA` = `git rev-parse --short HEAD` (deploy sentinel)

Verify the sentinel before shipping:

```bash
cat /home/diegosouzapw/dev/proxys/OmniRoute/dist/BUILD_SHA && git -C /home/diegosouzapw/dev/proxys/OmniRoute rev-parse --short HEAD
```

Both lines must match. If they differ, the build is stale — re-run `build:release`.

### 2. Back up the running bundle on both VPSs

```bash
OMNIROUTE_VERSION=$(node -p "require('/home/diegosouzapw/dev/proxys/OmniRoute/package.json').version")
ssh root@69.164.221.35 "cp -a /usr/lib/node_modules/omniroute/app /usr/lib/node_modules/omniroute/app.bak-${OMNIROUTE_VERSION}" &
ssh root@192.168.0.15 "cp -a /usr/lib/node_modules/omniroute/app /usr/lib/node_modules/omniroute/app.bak-${OMNIROUTE_VERSION}" &
wait
```

### 3. Stop the processes, then rsync `dist/` → remote `app/` on both VPSs

The VPS image directory is still named `app/`; we ship the **contents** of our local `dist/`. **Stop both running processes FIRST** so `rsync --delete` never removes chunk files out from under a live server — that race produces the transient `[Shutdown] Cannot find module ./chunks/NNNNN.js` seen mid-deploy:

// turbo-all

```bash
ssh root@69.164.221.35 "pm2 stop omniroute" & ssh root@192.168.0.15 "pm2 stop omniroute" & wait
rsync -az --delete /home/diegosouzapw/dev/proxys/OmniRoute/dist/ root@69.164.221.35:/usr/lib/node_modules/omniroute/app/ && rsync -az --delete /home/diegosouzapw/dev/proxys/OmniRoute/dist/ root@192.168.0.15:/usr/lib/node_modules/omniroute/app/
```

### 4. Start + health check on both VPSs

`pm2 restart` on a stopped app starts it again with a clean module graph:

```bash
ssh root@69.164.221.35 "pm2 restart omniroute --update-env && pm2 save"
```

```bash
ssh root@192.168.0.15 "pm2 restart omniroute --update-env && pm2 save"
```

```bash
sleep 5
curl -sf http://69.164.221.35:20128/api/monitoring/health | jq '{status:.status, version:.version}'
curl -sf http://192.168.0.15:20128/api/monitoring/health | jq '{status:.status, version:.version}'
```

Expected: HTTP 200, `"status": "ok"` on both.

### 5. Verify the deployment

```bash
curl -s -o /dev/null -w 'AKAMAI HTTP %{http_code}\n' http://69.164.221.35:20128/
curl -s -o /dev/null -w 'LOCAL HTTP %{http_code}\n' http://192.168.0.15:20128/
```

## Rollback

If either VPS fails its health check, restore from backup (adjust host as needed):

```bash
OMNIROUTE_VERSION=$(node -p "require('/home/diegosouzapw/dev/proxys/OmniRoute/package.json').version")
# Akamai rollback:
ssh root@69.164.221.35 "rm -rf /usr/lib/node_modules/omniroute/app && cp -a /usr/lib/node_modules/omniroute/app.bak-${OMNIROUTE_VERSION} /usr/lib/node_modules/omniroute/app && pm2 restart omniroute --update-env"
# Local rollback:
ssh root@192.168.0.15 "rm -rf /usr/lib/node_modules/omniroute/app && cp -a /usr/lib/node_modules/omniroute/app.bak-${OMNIROUTE_VERSION} /usr/lib/node_modules/omniroute/app && pm2 restart omniroute --update-env"
```

## Gotchas

- **Never build in a worktree with symlinked `node_modules`** — the standalone copy step
  follows symlinks and produces a broken bundle. Use the main checkout or run `npm ci`
  inside the worktree first.
- **`pm2 restart --update-env` does NOT re-read `ecosystem.config.cjs`** — if you changed
  env vars in the ecosystem file, use `pm2 reload` or `pm2 delete + pm2 start` instead.
- **Parallel dev + release builds**: to avoid clobbering the dev server's `.build/next`,
  pass `NEXT_DIST_DIR=.build/next-release` to `build:release` in CI or concurrent deploys:
  `NEXT_DIST_DIR=.build/next-release npm run build:release`
  then adjust the rsync source to `dist-release/`.
- **`dist/BUILD_SHA` must match the deployed HEAD** — always confirm before rsyncing.
  A mismatch means the build ran from a dirty or incorrect commit.
- **Build once, deploy to both** — never run two separate builds for the two VPSs.
  The same `dist/` artifact (same `BUILD_SHA`) must land on both hosts to keep
  versions in sync.
