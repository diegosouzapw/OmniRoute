# Runbook 06 — Provider Quota Exhausted

**Severity**: SEV-2 if user-visible; SEV-3 if quota is for a single connection and we have a fallback.
**Owner**: routing on-call.
**Last verified**: 2026-06-25.
**Related**: `open-sse/services/quotaMonitor.ts`; `open-sse/services/quotaPreflight.ts`; `src/lib/monitoring/observability.ts`.

When a provider connection's quota is exhausted, OmniRoute's
`QuotaMonitorSnapshot.status` flips to `"exhausted"` (see
`src/lib/monitoring/observability.ts`). The preflight check at
`open-sse/services/quotaPreflight.ts::preflightQuota` reads this state
and either:

1. **Routes to the next available connection** for the same provider
   (if the customer has multiple keys configured).
2. **Falls back to the next provider** in the combo's target list.
3. **Returns `RATE_001` / `RATE_003`** (defined in
   `src/shared/constants/errorCodes.ts:73`) if no healthy target remains.

This runbook covers the case where the **fallback didn't engage** —
either because all targets for the requested model are exhausted, or
because the combo's target list contains only the exhausted provider.

---

## 1. Detect

### 1.1 Alert payload

```
Alert:  ProviderQuotaExhausted
Labels: { provider="anthropic", connection_id="conn-abc123", status="exhausted" }
Value:  last_quota_percent=0, status="exhausted"
```

### 1.2 Confirm via health endpoint

```bash
curl -s http://localhost:20128/api/monitoring/health | jq '.checks.quota_monitors'
```

A snapshot entry with `"status": "exhausted"` is your culprit. The
`lastQuotaPercent` will be `0` (or `null` if the upstream did not return a
total).

### 1.3 Confirm via MCP snapshot

```bash
# Using the MCP tool (per docs/ops/MONITORING_GUIDE.md § "Observability Snapshot")
omniroute-mcp call observability_snapshot
```

Look for:

```json
{
  "quotaMonitors": [
    {
      "sessionId": "sess-xyz",
      "provider": "anthropic",
      "accountId": "conn-abc123",
      "status": "exhausted",
      "lastQuotaPercent": 0,
      "totalPolls": 42,
      "totalAlerts": 3,
      "consecutiveFailures": 1
    }
  ]
}
```

### 1.4 Confirm via logs

```bash
grep -h "quota_exhausted\|RATE_001\|RATE_003" /var/log/omniroute/*.log | tail -10
```

The log line includes the connection ID and the most recent quota
percentage, which is what `services/errorClassifier.ts` uses to increment
the `provider_errors` counter.

---

## 2. Classify

| Symptom | Cause | Go to |
|---|---|---|
| Single connection exhausted, others healthy | That connection burned through its quota | § 3 (rotate to next connection) |
| All connections for one provider exhausted | Provider-wide outage or shared quota ceiling | § 4 (alert customer + failover provider) |
| All connections for all providers exhausted | Customer over-spend or auth issue | § 5 (escalate + customer notification) |

---

## 3. Mitigate (rotate to next connection)

If the customer has multiple connections for the exhausted provider, the
auto-failover in `open-sse/services/accountFallback.ts` should already
have rotated. Verify:

```bash
# List all connections for the provider
curl -s http://localhost:20128/api/connections?provider=anthropic \
  -H "Authorization: Bearer $MGMT_TOKEN" | jq '.[].id'

# The exhausted one should be isActive=false or in cooldown
curl -s http://localhost:20128/api/connections/CONN_ID \
  -H "Authorization: Bearer $MGMT_TOKEN" | jq '.status,.cooldownUntil'
```

If the failover did **not** engage, manually rotate:

```bash
# Mark the exhausted connection as in-cooldown
curl -X POST http://localhost:20128/api/connections/CONN_ID/cooldown \
  -H "Authorization: Bearer $MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"durationMinutes": 60, "reason": "quota-exhausted"}'
```

The cooldown expires automatically (the cooldown tracker in
`open-sse/services/providerCooldownTracker.ts` re-enables after the
duration). Verify a different connection is now active:

```bash
curl -s http://localhost:20128/api/monitoring/health | jq '.checks.quota_monitors'
```

The exhausted connection should show `status: "idle"` (no recent polls)
and a healthy sibling should show `status: "healthy"`.

---

## 4. Mitigate (failover provider)

If all connections for a provider are exhausted, the combo's next target
should pick up. Verify:

```bash
# List the combo's targets
curl -s http://localhost:20128/api/combos/COMBO_ID \
  -H "Authorization: Bearer $MGMT_TOKEN" | jq '.models'

# Order should be: healthy-provider first, exhausted last
# If the exhausted one is at index 0, reorder
```

If the combo targets don't include a fallback provider, **add one**:

```bash
curl -X PUT http://localhost:20128/api/combos/COMBO_ID \
  -H "Authorization: Bearer $MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d @combo-with-fallback.json
```

The new combo definition must include at least one provider/model
target that is currently `status: "healthy"` (or `status: "warning"`).
Verify with `validateComboDAG` (see runbook 05) before saving.

---

## 5. Mitigate (all-providers exhausted)

If every connection for every provider is exhausted, you have a
**customer-spend** problem (or an auth issue — verify the keys are still
valid by running `POST /api/connections/{id}/test`).

### 5.1 Confirm it's not an auth issue

```bash
# Test each connection in turn
for conn in $(curl -s http://localhost:20128/api/connections | jq -r '.[].id'); do
  echo "=== $conn ==="
  curl -X POST "http://localhost:20128/api/connections/$conn/test" \
    -H "Authorization: Bearer $MGMT_TOKEN" | jq '.status'
done
```

A `status: "invalid_credentials"` result means the API key was revoked
or expired, not a quota issue. The fix is a new key, not a new provider.

### 5.2 Notify the customer

If the customer's spend has hit the ceiling, this is a billing event:

```bash
# Check the customer's billing dashboard (if connected)
curl -s "http://localhost:20128/api/billing/CUSTOMER_ID/summary" \
  -H "Authorization: Bearer $MGMT_TOKEN" | jq '.currentSpend,.monthlyBudget'
```

Notify via the customer success channel:

```text
Subject: OmniRoute quota exhausted — immediate action required

Your account has reached its monthly quota on OmniRoute. All
provider connections are now returning 429 with status code
RATE_001 / RATE_003. To restore service:

  1. Increase your monthly budget in the dashboard:
     https://app.omniroute.dev/settings/billing
  2. Or contact support@omniroute.dev to discuss a custom plan.

This is an automated notification. Reply to escalate to a
human within 1 business day.
```

### 5.3 Enable "always-on" fail-open (last resort)

If you need to keep the customer up while billing is resolved, you can
fail-open to OmniRoute's hosted fallback key for the duration. This is
**a billing event** — make sure to log it:

```bash
# Enable fail-open (operator-only)
curl -X POST http://localhost:20128/api/connections/fail-open \
  -H "Authorization: Bearer $OPS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"customerId":"CUSTOMER_ID","durationHours":24,"reason":"quota-exhausted"}'
```

This routes traffic through OmniRoute's own quota, billed at the
customer's per-token rate. The `fail-open` event is logged to the audit
table and the customer success team is auto-paged.

---

## 6. Investigate

### 6.1 Why did quota exhaust?

```bash
# Last 24h of usage for the customer
sqlite3 ~/.omniroute/storage.sqlite \
  "SELECT provider, model, SUM(tokens_consumed) AS tokens
   FROM usage_logs
   WHERE customer_id='CUSTOMER_ID'
     AND created_at > datetime('now', '-1 day')
   GROUP BY provider, model
   ORDER BY tokens DESC LIMIT 10;"
```

A single model dominating the chart suggests the customer has a runaway
script or batch job. A roughly even distribution suggests organic usage
growth.

### 6.2 Was the right alert configured?

Per `docs/ops/MONITORING_GUIDE.md`, the `quota_warning` alert fires at
80%+ usage. If the customer hit 100% without seeing a warning, either:

- The alert webhook is misconfigured (check `/api/settings/webhooks`).
- The quota poll interval is too long for the customer's burn rate
  (default 60 min via `DEFAULT_HEALTH_CHECK_INTERVAL_MIN` in
  `src/lib/tokenHealthCheck.ts`).

Tighten the interval for the affected customer:

```bash
curl -X POST http://localhost:20128/api/connections/CONN_ID/settings \
  -H "Authorization: Bearer $MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"healthCheckIntervalMin": 5}'
```

---

## 7. Restore

1. `status: "exhausted"` no longer present in `quota_monitors`.
2. p95 latency back within budget per `docs/PERF_BUDGETS.md` § 2.1.
3. Customer notified (if § 5 was reached) and acknowledged.
4. Any cooldowns set in § 3 have expired and the original connection is
   no longer marked exhausted.

If the original connection re-exhausts within 30 min of un-cooldown,
open a SEV-2 — the underlying burn rate is not sustainable.

---

## 8. Smoke test (run quarterly)

```bash
# Confirm the quota preflight still returns null on healthy state
node --import tsx -e "
  Promise.all([
    import('./open-sse/services/quotaPreflight.ts'),
    import('./open-sse/services/quotaMonitor.ts')
  ]).then(([preflight, monitor]) => {
    monitor.clearQuotaMonitors();
    console.log('preflight exports:', Object.keys(preflight));
  });
"

# Confirm the existing test suite still passes
node --test tests/unit/quota-preflight.test.ts
node --test tests/integration/quota-*.test.ts
```

---

## 9. References

- `src/shared/constants/errorCodes.ts` — `RATE_001` (429), `RATE_003` (503)
- `src/lib/monitoring/observability.ts` — `QuotaMonitorSnapshot` shape + status enum
- `open-sse/services/quotaMonitor.ts` — quota polling + status transitions
- `open-sse/services/quotaPreflight.ts` — `preflightQuota` short-circuit
- `open-sse/services/accountFallback.ts` — connection-level failover
- `open-sse/services/providerCooldownTracker.ts` — cooldown expiry
- `open-sse/services/emergencyFallback.ts` — fail-open path
- `src/lib/tokenHealthCheck.ts` — `DEFAULT_HEALTH_CHECK_INTERVAL_MIN`
- `docs/ops/MONITORING_GUIDE.md` — alert + dashboard patterns
- `docs/PERF_BUDGETS.md` § 2.1 — latency budgets per endpoint