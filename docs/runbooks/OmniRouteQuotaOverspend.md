# Runbook — `OmniRouteQuotaOverspend`

> Severity: **warning** · SLO class: cost · Alert:
> `OmniRouteQuotaOverspend`

## What this alert means

A specific `(provider, model)` pair has consumed more than 90% of its
quota window. The remaining headroom is not enough for the next hour
of expected traffic. Cost SLO is breached.

## What to check (in order)

1. **Which provider?** The alert carries `provider` and `model` labels.
2. **How much is left?**
   ```promql
   omniroute_quota_remaining
     / on(provider, model) omniroute_quota_limit
   ```
3. **When does it reset?** Most providers reset on a calendar boundary
   (UTC midnight for some, rolling 60s for others). Check the provider
   docs.
4. **Who is consuming it?** Per-tenant cost breakdown in the
   `omniroute-tenant-cost` dashboard panel.

## Common causes

| Cause | Diagnostic | Mitigation |
|-------|-----------|------------|
| Genuine growth | Smooth quota consumption | Upgrade tier; budget review |
| Single tenant runaway | One tenant dominates consumption | Per-tenant quota cap |
| Bug in retry loop | Same request fired N times | Fix retry logic |
| Provider double-counting | Provider dashboard disagrees | Open ticket with provider |

## Mitigation steps

1. **If a single tenant is responsible:** apply a per-tenant quota cap
   in the proxy config:
   ```json
   { "tenantId": "t-123", "quotaPerHour": 1000 }
   ```
2. **If all tenants together caused it:** rotate to a backup provider
   for this route until the quota window resets.
3. **If a retry loop is the cause:** this is a bug. Roll back the
   deploy that introduced it. File a regression test.
4. **If the budget is just too low:** open a budget conversation with
   finance. The 90% threshold is the warning; the 100% threshold is
   the failure.

## Cost SLO context

The cost SLO target is 0.9 (90% utilization) over a rolling 1-hour
window. This alert is the operational signal that we are approaching
the budget. It is not a hard error — providers keep serving after the
limit is reached, but with surcharges or hard denials depending on the
provider's policy.

## Post-incident

- Quota overspend is rarely a one-off. Add the affected provider to
  the weekly capacity review.
- If the alert fires repeatedly, the budget needs to grow or the
  workload needs to redistribute. Either answer is a planning
  conversation, not an ops one.