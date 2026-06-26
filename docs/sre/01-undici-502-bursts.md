# Runbook 01 — Undici 502 Bursts

**Severity**: usually SEV-2; SEV-1 if burst lasts > 5 min or covers > 50% of traffic.
**Owner**: routing on-call.
**Last verified**: 2026-06-25.
**Related**: `docs/PERF_BUDGETS.md` § 2.1 (inference latency budgets); `docs/architecture/RESILIENCE_GUIDE.md`.

This runbook addresses a burst of `502 Bad Gateway` responses coming from
OmniRoute's outbound HTTP layer. The root cause is almost always one of:

1. A specific provider's upstream is degraded (TCP RST flood, TLS handshake
   failure, or origin returns 502 because their infra is failing).
2. The configured egress proxy is failing (e.g. Aliyun WAF misconfiguration —
   see runbook 02 if you see `X-WAF-Block` headers).
3. The Undici dispatcher pool is exhausted because too many SSE streams are
   holding connections open (round-robin pool starvation).

The detection comes from the `provider_errors` counter and the log line
`[ProxyFetch] Undici dispatcher failed`, both of which are emitted by
`open-sse/utils/proxyDispatcher.ts` and
`open-sse/services/errorClassifier.ts`.

---

## 1. Detect

### 1.1 Alert payload

```
Alert:  ProviderErrorRateHigh
Labels: { provider=<name>, status=502, window=5m }
Value:  12.4 errors/sec (threshold: 2.0 errors/sec)
```

### 1.2 Confirm via health endpoint

```bash
curl -s http://localhost:20128/api/monitoring/health | jq '.checks.providers'
```

Expect to see one provider with `healthy: false, down: 1` or `degraded: 1`.
The dashboard `/dashboard/providers` shows the same data with the recent
errors panel.

### 1.3 Check the latest deploy SHA

```bash
curl -s http://localhost:20128/api/system/version
```

If a deploy landed in the last 30 min, **suspect it first** (see § 4 step 1).

---

## 2. Classify

| Symptom | Likely cause | Go to |
|---|---|---|
| All providers show `down: 1` simultaneously | Egress proxy failure | runbook 02 |
| One provider shows `down: 1`, others healthy | That provider's upstream is failing | § 3 (failover) |
| Mix of 502 + 504 | Provider is rate-limiting (proxy or upstream) | runbook 06 |
| 502 spike immediately after deploy | Regression in the new build | § 4 (rollback) |

---

## 3. Mitigate (failover)

### 3.1 Disable the bad provider

The fastest mitigation is to take the failing provider offline. The route
handler re-resolves on every request, so the toggle takes effect within ~5 s.

```bash
# List provider IDs
curl -s http://localhost:20128/api/providers | jq '.[].id'

# Disable (replace PROVIDER_ID)
curl -X PUT http://localhost:20128/api/providers/PROVIDER_ID \
  -H "Content-Type: application/json" \
  -d '{"isActive": false}'
```

Verify with:

```bash
curl -s http://localhost:20128/api/monitoring/health | jq '.checks.providers'
```

The provider should move to `degraded: 0, down: 1, isActive: false`.

### 3.2 Re-enable a model via combo

If the bad provider was the **only** healthy target for a model in a combo,
the combo will also fail. Check the combo health panel:

```
GET /api/monitoring/health → checks.combos
```

For each combo with `unhealthyTargets > 0`, either:

- Add a healthy provider to the combo targets list, **or**
- Reorder so a healthy target is first, **or**
- Disable the model on the bad provider (see `src/lib/a2a/skills/providerDiscovery.ts`).

### 3.3 Trigger a circuit-breaker reset (manual)

Once you confirm the upstream is healthy again, you can pre-empt the
5-minute auto-reset by clearing the breaker:

```bash
curl -X POST http://localhost:20128/api/providers/PROVIDER_ID/breaker/reset \
  -H "Content-Type: application/json"
```

This calls `clearBreakerForName` in `src/shared/utils/circuitBreaker.ts`,
which sets the breaker back to `STATE.CLOSED` and zeroes the failure
counter.

---

## 4. Investigate (parallel with mitigation)

### 4.1 Compare against the last green deploy

```bash
git -C /opt/omniroute log --oneline -20
git -C /opt/omniroute diff HEAD~1 HEAD --stat
```

Look for changes under `open-sse/services/proxyFetch.ts`,
`open-sse/utils/proxyDispatcher.ts`, or any provider executor. If a suspect
change is found, **rollback** to the prior SHA:

```bash
bin/rollback.sh v3.8.36   # replace with the last green release tag
```

### 4.2 Trace via OTel spans (PR #4997)

Once the observability PR lands, trace a single failing request:

```bash
# Find a trace ID from the request logs
grep -h '"traceId"' /var/log/omniroute/*.log | tail -1

# Fetch the full span tree from Tempo / Jaeger
node scripts/sre/trace-topology.mjs \
  --endpoint http://tempo.observability.internal:4318 \
  --trace-id <TRACE_ID> \
  --window 10m
```

Identify the **p99 outlier provider** — the script renders a service graph
where edge thickness maps to span count and color maps to p99. The provider
with the thickest red edge is the upstream culprit. Bring up its status
page (Anthropic, OpenAI, Google, etc.) and confirm the incident.

### 4.3 Check undici dispatcher pool

If no provider is singled out, the dispatcher pool itself may be exhausted.
Inspect:

```bash
# Open the live dashboard page
curl -s http://localhost:20128/dashboard/providers | grep -A1 "active streams"
```

Or query the observability snapshot directly:

```bash
curl -s http://localhost:20128/api/monitoring/health | jq '.checks.active_sessions'
```

If `active_sessions` is climbing while throughput is flat, the round-robin
pool in `RoundRobinDispatcher` (`open-sse/utils/proxyDispatcher.ts:56`) is
starved. Increase `MAX_PROXY_DISPATCHER_CONNECTIONS` from the current 256
cap (line 22 of the same file) by setting the env var or editing the file
and restarting.

### 4.4 Verify egress proxy health

```bash
# If BIFROST_ENABLED=false and you're on a proxy, check the proxy
curl -x http://egress-proxy:8080 https://api.openai.com/v1/models -I
```

If the proxy returns 502 with `X-WAF-Block`, jump to runbook 02.

---

## 5. Restore

After upstream confirms recovery:

1. Re-enable the provider:
   ```bash
   curl -X PUT http://localhost:20128/api/providers/PROVIDER_ID \
     -H "Content-Type: application/json" \
     -d '{"isActive": true}'
   ```
2. Verify p95 returns to ≤ 1.5× the budget within 5 min (per
   `docs/PERF_BUDGETS.md` § 2.1).
3. Post in `#omniroute-ops` with the resolution time and the root cause.
4. File the postmortem (template forthcoming) within 5 business days.

---

## 6. Smoke test (run quarterly)

```bash
# Confirm the runbook still works against current code paths
node --test tests/sre/redact-logs.test.ts   # unrelated, but verifies test infra
node --import tsx -e "
  import('./open-sse/utils/proxyDispatcher.ts').then(m => {
    console.log('exports:', Object.keys(m));
  });
"
```

If any of the curl commands in § 3 returns a non-200 response with a new
error shape, file a docs PR to update this runbook in the same commit.

---

## 7. References

- `open-sse/utils/proxyDispatcher.ts` — dispatcher + `RoundRobinDispatcher`
- `open-sse/utils/proxyFetch.ts` — error wrapping (`[ProxyFetch] Undici dispatcher failed`)
- `open-sse/services/errorClassifier.ts` — `provider_errors` counter
- `src/shared/utils/circuitBreaker.ts` — breaker state machine + reset path
- `src/app/api/providers/[id]/route.ts` — `PUT` handler that toggles `isActive`
- `docs/PERF_BUDGETS.md` § 1 — error-budget burn rate
- `docs/architecture/RESILIENCE_GUIDE.md` — resilience layers
- `docs/INCIDENT_RESPONSE.md` § 4.1 — provider outage mitigation
- PR #4997 — OTel spans (planned)