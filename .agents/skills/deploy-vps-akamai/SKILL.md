---
name: deploy-vps-akamai-cx
description: Deploy the latest OmniRoute code to the Akamai VPS (69.164.221.35)
---

# Deploy to Akamai VPS Workflow

Deploy OmniRoute to the Akamai VPS using `npm pack + scp` + PM2.

## Codex Execution Notes

- Treat `// turbo` / `// turbo-all` as instructions to use `multi_tool_use.parallel` only for independent commands. Do not parallelize dependent build, copy, install, restart, and verification steps.
- Report each remote result explicitly before finishing.

**Akamai VPS:** `69.164.221.35`
**Process manager:** PM2 (`omniroute`)
**Port:** `20128`

## Steps

### 1. Build + pack locally

// turbo

```bash
cd /home/diegosouzapw/dev/proxys/OmniRoute && rm -f omniroute-*.tgz && rm -rf .next/cache app/.next/cache && npm run build:cli && rm -rf app/logs app/coverage app/.git app/.app-build-backup* && npm pack --ignore-scripts
```

### 2. Copy to Akamai VPS and install

// turbo-all

```bash
scp omniroute-*.tgz root@69.164.221.35:/tmp/
```

```bash
ssh root@69.164.221.35 "npm install -g /tmp/omniroute-*.tgz --ignore-scripts && cd /usr/lib/node_modules/omniroute/app && npm rebuild better-sqlite3 && pm2 delete omniroute 2>/dev/null; pm2 start /root/.omniroute/ecosystem.config.cjs --update-env && pm2 save && echo '✅ Akamai done'"
```

### 3. Verify the deployment

```bash
curl -s -o /dev/null -w 'AKAMAI HTTP %{http_code}\n' http://69.164.221.35:20128/
```
