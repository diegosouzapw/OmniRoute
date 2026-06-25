# Runbook — `OmniRouteHighErrorRate`

> Severity: **critical** · SLO class: availability · Alert:
> `OmniRouteHighErrorRate`

## What this alert means

The 5xx error rate on one or more HTTP routes handled by OmniRoute has
exceeded 5% of total requests over a rolling 5-minute window. This is
the canonical "error budget burn" signal — at this rate, the 30-day
99.9% availability SLO budget is consumed in days, not weeks.

## What to check (in order)

1. **Recent deploys.** Did a release land in the last 30 minutes? If so,
   the most likely cause is a regression in the new code path. Check
   the commit range since the last green deploy:
   ```bash
   git log --since="30 minutes ago" --oneline
   ```
2. **Provider health.** Are upstream providers degraded?
   ```bash
   curl -sS http://localhost:3030/v1/providers/health | jq .
   ```
   Cross-reference with each provider's status page.
3. **Database / Redis connectivity.** A spike of 5xx with 0 successful
   requests usually means a dependency is down.
   ```bash
   curl -sS http://localhost:3030/healthz
   ```
4. **Process logs.**
   ```bash
   journalctl -u omniroute --since "10 minutes ago" | grep -E "ERROR|FATAL"
   ```

## Common causes

| Cause | Diagnostic | Mitigation |
|-------|-----------|------------|
| Bad deploy | `git log --since "30m"` shows recent commits | Roll back to last green tag |
| Provider outage | `/v1/providers/health` shows degraded | Wait + enable `force-fallback` |
| DB OOM | `omniroute_process_resident_bytes` near limit | Restart node, check for leaks |
| Redis down | healthz reports redis=down | Restart redis, restore from snapshot |
| Network partition | DNS / VPC errors in logs | Failover to backup region |

## Mitigation steps

1. **If a deploy caused it:** roll back immediately.
   ```bash
   omniroute rollback --to <previous-green-sha>
   ```
2. **If a provider is the cause:** force-fallback so all routes use the
   secondary provider. Verify the secondary can handle the load first.
3. **If OmniRoute itself is broken:** drain traffic (set the load
   balancer to "draining") and restart the node.
4. **Once recovered:** post in `#incidents` with a timeline. File a
   follow-up if the root cause was not a known issue.

## Post-incident

- Update this runbook with anything you learned.
- If the SLO budget dropped below 0 for the 30-day window, freeze
  non-critical deploys until the budget recovers.
- Add a regression test for the bug if applicable.