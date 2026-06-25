# Runbook — `OmniRouteProviderErrorSpike`

> Severity: **warning** · SLO class: reliability · Alert:
> `OmniRouteProviderErrorSpike`

## What this alert means

A specific `(provider, model)` pair is returning errors or rate-limit
responses at more than 0.5/s sustained over 5 minutes. This is a
per-provider signal — distinct from `OmniRouteBifrostTimeoutRate`
which fires on timeouts regardless of provider.

## What to check (in order)

1. **Is it `error` or `rate-limit`?** Break the metric down:
   ```promql
   sum by (provider, model, outcome) (
     rate(omniroute_provider_upstream_attempts_total[5m])
   )
   ```
   - `outcome="rate-limit"`: provider is throttling us. Reduce traffic.
   - `outcome="error"`: provider is returning 4xx/5xx. Investigate.
2. **Provider status page.** Confirm whether the provider reports an
   incident.
3. **Account quota.** If the provider has per-account rate limits
   (Anthropic, OpenAI), check the org dashboard.

## Common causes

| Cause | Diagnostic | Mitigation |
|-------|-----------|------------|
| Per-model rate limit | `outcome="rate-limit"` dominant | Lower priority of this model in combos |
| Model deprecated | `outcome="error"` with 410/404 | Remove the model from combos |
| Quota exhausted | Provider dashboard shows exhausted | Wait for quota reset; reduce traffic |
| Auth failure | `outcome="error"` with 401/403 | Rotate API key |

## Mitigation steps

1. **Rate-limit case:**
   - Demote this `(provider, model)` in combo priorities.
   - If unavoidable, add a per-tenant quota cap.
2. **Auth/credential failure:**
   - Rotate the provider API key immediately.
   - Audit access logs to see whether the leaked key is in use
     elsewhere.
3. **Model deprecated:**
   - Remove from combos. Add a replacement model to the combo
     priority list with a lower-priority slot until traffic shifts.
4. **Quota exhausted:**
   - Wait for reset, OR
   - Upgrade the provider tier, OR
   - Shift to a different provider for the affected route.

## Post-incident

- If the alert fired because of a credential leak, treat as a security
  incident. Rotate, audit, and review access logs.
- If the alert fired because of a quota exhaustion, file with finance
  for budget review before next billing cycle.