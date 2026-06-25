# Runbook — `OmniRouteBifrostTimeoutRate`

> Severity: **warning** · SLO class: reliability · Alert:
> `OmniRouteBifrostTimeoutRate`

## What this alert means

More than 10% of provider upstream calls (bifrost relay) have ended in
`outcome="timeout"` over the last 5 minutes. The auto-fallback path
will shift load to the secondary provider, but both cost and latency
rise until the primary recovers.

## What to check (in order)

1. **Which provider?** Break down by `provider` label:
   ```promql
   sum by (provider) (
     rate(omniroute_provider_upstream_attempts_total{outcome="timeout"}[5m])
   )
   ```
2. **Provider status page.** Open the affected provider's status page
   and look for incidents.
3. **Network path.** From the OmniRoute host:
   ```bash
   mtr -rwc 20 <provider-api-host>
   ```
   Look for packet loss or sustained latency.
4. **DNS.** Has the provider rotated an IP? Verify with `dig`.

## Common causes

| Cause | Diagnostic | Mitigation |
|-------|-----------|------------|
| Provider outage | Status page shows incident | Wait; cost is the worst-case here |
| Network congestion | mtr shows packet loss | Wait or shift egress region |
| Provider rotated IP | DNS lookup returns new IP | Update provider config |
| DNS resolver broken | All DNS lookups slow | Switch resolver (8.8.8.8) |
| Local clock skew | TLS handshakes failing | Run `chronyc tracking` |

## Mitigation steps

1. **If a provider is degraded:** the auto-fallback should already be
   shifting load. Verify it is:
   ```bash
   curl -sS http://localhost:3030/v1/providers/health | jq '.fallback_active'
   ```
2. **If network is the issue:** restart the network namespace, or
   rotate to a backup egress route if one is configured.
3. **If the provider is permanently degraded:** remove it from the
   combo priority list and replace with a backup provider.
4. **Don't:** disable the alert. Timeouts are exactly the failure mode
   the alert is meant to catch.

## Post-incident

- If the alert fired for a sustained outage (>30 min), file a
  reliability ticket with the provider and link it in the incident
  report.
- If the timeout ratio correlates with traffic peaks, raise the
  upstream timeout (default: 30s) — but be aware that longer timeouts
  tie up event-loop slots and can trigger `OmniRouteHighConcurrency`.