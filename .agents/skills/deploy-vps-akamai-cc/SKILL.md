---
name: deploy-vps-akamai-cc
description: Deploy the latest OmniRoute code to the Akamai VPS (69.164.221.35)
---

# Deploy to Akamai VPS Workflow

Deploy OmniRoute to the Akamai VPS using a clean `build:release` + `rsync` + PM2 restart.

**Akamai VPS:** `69.164.221.35`
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

Run from a checkout with a **real** `node_modules`:

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

### 2. Back up the running bundle on the VPS

```bash
OMNIROUTE_VERSION=$(node -p "require('/home/diegosouzapw/dev/proxys/OmniRoute/package.json').version")
ssh root@69.164.221.35 "cp -a /usr/lib/node_modules/omniroute/app /usr/lib/node_modules/omniroute/app.bak-${OMNIROUTE_VERSION}"
```

### 3. Stop the process, then rsync `dist/` → remote `app/`

The VPS image directory is still named `app/`; we ship the **contents** of our local `dist/`. **Stop the running process FIRST** so `rsync --delete` never removes chunk files out from under the live server — that race produces the transient `[Shutdown] Cannot find module ./chunks/NNNNN.js` seen mid-deploy:

// turbo-all

```bash
ssh root@69.164.221.35 "pm2 stop omniroute"
rsync -az --delete /home/diegosouzapw/dev/proxys/OmniRoute/dist/ root@69.164.221.35:/usr/lib/node_modules/omniroute/app/
```

### 4. Start + health check

`pm2 restart` on a stopped app starts it again with a clean module graph:

```bash
ssh root@69.164.221.35 "pm2 restart omniroute --update-env && pm2 save"
```

```bash
sleep 5 && curl -sf http://69.164.221.35:20128/api/monitoring/health | jq '{status:.status, version:.version}'
```

Expected: HTTP 200, `"status": "ok"` (or equivalent health payload).

### 5. Verify the deployment

```bash
curl -s -o /dev/null -w 'AKAMAI HTTP %{http_code}\n' http://69.164.221.35:20128/
```

## Rollback

If the health check fails, restore the backup:

```bash
OMNIROUTE_VERSION=$(node -p "require('/home/diegosouzapw/dev/proxys/OmniRoute/package.json').version")
ssh root@69.164.221.35 "rm -rf /usr/lib/node_modules/omniroute/app && cp -a /usr/lib/node_modules/omniroute/app.bak-${OMNIROUTE_VERSION} /usr/lib/node_modules/omniroute/app && pm2 restart omniroute --update-env"
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
  then adjust the rsync source to `dist-release/` (or whatever `build:release` assembles into).
- **`dist/BUILD_SHA` must match the deployed HEAD** — always confirm before rsyncing.
  A mismatch means the build ran from a dirty or incorrect commit.
