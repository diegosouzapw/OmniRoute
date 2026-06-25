# Runbook — `OmniRouteHighLatencyP99`

> Severity: **warning** · SLO class: latency · Alert:
> `OmniRouteHighLatencyP99`

## What this alert means

p99 request latency has exceeded 2 seconds for a single HTTP route for
at least 10 minutes. This crosses the bifrost-route SLO boundary
(proxy routes have a stricter 500ms p99 budget that fires earlier as a
warning inside Grafana).

## What to check (in order)

1. **Are we under-provisioned?** Cross-reference with the
   `omniroute:http:requests_per_route_5m` recording rule. If the request
   count is also elevated, the node is saturated.
2. **Provider latency.** The bifrost path is dominated by upstream call
   time. A spike in `omniroute_provider_upstream_duration_seconds`
   histogram p99 (in the per-provider panel) confirms a provider-side
   regression.
3. **Event-loop lag.** Check `omniroute_event_loop_lag_seconds`. Values
   above 1 second indicate synchronous work is blocking the loop
   (usually JSON serialization of a very large response).
4. **GC pauses.** Sustained V8 heap growth alongside high latency
   usually means a stop-the-world GC is firing repeatedly.

## Common causes

| Cause | Diagnostic | Mitigation |
|-------|-----------|------------|
| Provider latency spike | per-provider p99 panel elevated | Wait or reroute via fallback |
| Node CPU saturation | `top` shows >90% user CPU | Scale horizontally |
| Large response payloads | `http_request_duration_seconds` bucketed at +Inf | Enable streaming response |
| GC pauses | `omniroute_process_heap_bytes` near 1.2 GiB | Tune `--max-old-space-size` |
| Cold cache | `omniroute_cache_hits_total` rate dropped | Warm the cache (PR #4615) |

## Mitigation steps

1. **Provider-side:** if the provider is the cause, the
   `OmniRouteProviderErrorSpike` alert will usually fire concurrently.
   Enable `force-fallback` and verify the secondary provider's p99.
2. **Node-side:** scale out. Add a replica, update the load balancer.
3. **Payload-size-side:** enable the streaming response code path
   (default in v3.8.34+ for routes >1 MB response body).
4. **GC-side:** restart the node. Long-term, audit the request path for
   allocations on the hot path.

## Post-incident

- If the alert fired without `OmniRouteHighConcurrency`, the cause is
  almost certainly upstream. File a ticket with the provider.
- If the alert fired alongside `OmniRouteHighConcurrency`, the cause
  is capacity. Plan a horizontal scale-out before the next traffic peak.