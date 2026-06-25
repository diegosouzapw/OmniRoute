# Runbook — `OmniRouteHighConcurrency`

> Severity: **warning** · SLO class: capacity · Alert:
> `OmniRouteHighConcurrency`

## What this alert means

Sustained inbound request rate has exceeded 500 req/min for 5 minutes.
This is the soft-concurrency ceiling for a single OmniRoute node —
queueing latency and provider timeouts will follow shortly. The
`OmniRouteHighLatencyP99` alert will usually fire next.

## What to check (in order)

1. **Is this expected?** Check the schedule. A scheduled traffic peak
   (a marketing campaign, a new tenant onboarding, a cron-driven
   bulk job) explains it. If yes, scale proactively.
2. **Is it a hot tenant?** Break down the request rate by `route` in
   the dashboard. A single tenant driving 80% of the traffic is a
   different problem than aggregate growth.
3. **Provider queue depth.** Look at the per-provider latency. If one
   provider is the bottleneck, the issue is upstream — not the OmniRoute
   node itself.

## Common causes

| Cause | Diagnostic | Mitigation |
|-------|-----------|------------|
| New tenant | One route dominating total rate | Coordinate with tenant for backpressure |
| Provider slow path | Per-provider p99 elevated | Enable provider circuit breaker |
| Burst from CI / cron | Schedule-aligned traffic spike | Throttle the cron |
| Genuine growth | Smooth upward trend | Scale out (add a replica) |

## Mitigation steps

1. **If caused by a single tenant:** reach out to the tenant, ask them
   to throttle, or set per-tenant rate limits in the proxy config.
2. **If caused by a provider:** enable the circuit breaker for that
   provider — traffic will be rerouted via fallback until the
   provider recovers.
3. **If caused by growth:** scale out. The standard recipe is to add
   one replica per 500 req/min of additional capacity. Update the
   load balancer's target group.
4. **Last resort:** shed low-priority routes. Mark `/v1/debug/*` and
   `/v1/health/*` as non-essential in the proxy config and let the
   load balancer drop them under pressure.

## Post-incident

- If the alert fired during business hours, capacity planning is the
  long-term answer.
- If the alert fired outside business hours, audit the scheduled jobs
  to see if one is responsible.