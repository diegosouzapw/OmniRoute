# Rollback Guide

> This document describes the rollback procedure for OmniRoute deployments.

## Quick Rollback (Phase 1: < 15 min)

If a deployment is causing errors, latency, or data integrity issues:

1. **Identify the release** — `dist/BUILD_SHA` artifact in the deployed directory
2. **Revert the deployment** — redeploy the previous known-good `dist/` artifact
3. **Verify** — check `/health`, `/metrics`, and a test chat completion
4. **Incident** — file an incident report (see below)

## Full Rollback Procedure

### Phase 1: Diagnose (0–5 min)

1. Check `/health` endpoint
2. Check logs: `journalctl -u omniroute -n 100 --no-pager`
3. Check metrics dashboard
4. Decision: Is rollback needed? (errors > 1%, latency > 5s p99, or data corruption)

### Phase 2: Rollback (5–15 min)

**Docker deployment:**
```bash
docker pull ghcr.io/kooshapari/omniroute:previous-stable-tag
docker stop omniroute
docker run -d --rm --name omniroute \
  -v /data/omniroute:/data \
  -p 8080:8080 \
  ghcr.io/kooshapari/omniroute:previous-stable-tag
```

**VPS / bare-metal:**
```bash
cd /usr/lib/node_modules/omniroute/app
# Restore previous dist/ backup
tar -xzf /backups/dist-$(date -d '1 day ago' +%Y%m%d).tar.gz
# Restart
systemctl restart omniroute
```

**Source rollback:**
```bash
git revert HEAD
git push origin main
# CI will redeploy automatically
```

### Phase 3: Verify (15–20 min)

- [ ] `/health` returns 200
- [ ] Hot cache warmed (hit rate > 80% after 5 min)
- [ ] Chat completions succeed end-to-end
- [ ] Dashboard loads without errors

### Phase 4: Post-Mortem (after stabilization)

- [ ] File incident report
- [ ] Root cause analysis
- [ ] Implement fix (not revert) in a PR
- [ ] Add regression test
- [ ] Update rollback checklist if gaps found

## Migration Rollback (Bifrost Phase transitions)

When rolling back Bifrost traffic splits (shadow → 5% → 25% → 100%):

| Phase | Rollback action |
|-------|----------------|
| 0 (shadow) | `export BIFROST_ENABLED=0` → restart |
| 1 (5%) | `export BIFROST_TRAFFIC_PCT=0` → restart |
| 2 (25%) | `export BIFROST_TRAFFIC_PCT=0` → restart |
| 3 (100%) | `export BIFROST_ENABLED=0` → restart + revert config |

## Data Safety

- **SQLite WAL**: Rollback is safe — WAL ensures atomic commits
- **Backups**: Auto-backup on startup to `/backups/omniroute-*.db`
- **Migrations**: All migrations are idempotent and reversible
