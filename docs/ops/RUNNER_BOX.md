---
title: Self-Hosted Runner Box Operations
---

# Self-Hosted Runner Box Operations (.113 pool)

The self-hosted pool (`self-hosted, omni-release` labels) runs on the 16 GB box at
`192.168.0.113`. Two failure modes recurred on release days and were, until v3.8.49,
manual discipline; the **janitor script codifies them** (WS3.3 of the quality plan):

1. **Orphaned temp/work dirs** filling the disk → disk-full SQLite errors mid-job.
2. **>4 concurrent runners** → OOM-killed jobs (8-wide killed jobs twice on the
   v3.8.47 release day; 4-wide is the proven ceiling).

## Install the janitor (one-time, on the box)

```bash
sudo mkdir -p /opt/omniroute-ops
sudo cp scripts/ops/runner-janitor.sh /opt/omniroute-ops/
sudo chmod +x /opt/omniroute-ops/runner-janitor.sh
( sudo crontab -l 2>/dev/null; echo '*/30 * * * * /opt/omniroute-ops/runner-janitor.sh >> /var/log/runner-janitor.log 2>&1' ) | sudo crontab -
```

What it does every 30min: sweeps runner temp leftovers older than 24h, alerts at
≥85% root-disk usage, and alerts when more than the runner ceiling (default 4, tunable
via the script's own environment) of `Runner.Listener` processes are up. Alerts land in `/var/log/runner-janitor.log`
with a non-zero exit (grep for `⚠`).

## Operating rules

- **Ceiling: 4 runners** on the 16 GB box. Runners 5–8 stay STOPPED except for
  explicit off-peak experiments — never during a release window.
- Stopping a runner mid-job cancels the job (observed live): `systemctl stop`
  only when its runner is idle (`Runner.Listener` without a `Runner.Worker` child).
- The `.15` VPS is homologation-only — never runs CI runners.
