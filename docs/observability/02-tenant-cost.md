# Tenant Cost Meters & Quota Gauges

This guide is the operator-facing reference for the **PR-007** per-tenant
cost attribution layer that ships on top of the
[observability stack](./01-overview.md) introduced in PR-001/002/003/004/005b.

It is **default-off**. No metric, counter, gauge, or label is exported unless
`OTEL_ENABLED=true` is set in the environment.

---

## 1. What PR-007 adds on top of the base observability stack

| Metric                          | Type    | Labels                                                                                              | Purpose                                            |
| ------------------------------- | ------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| `tenant_cost_usd_total`         | Counter | `tenant_id`, `provider`, `model`, `currency`                                                        | Cumulative tenant spend, currency-normalized.      |
| `tenant_quota_ratio`            | Gauge   | `tenant_id`, `resource`                                                                             | `used / limit` per tenant per resource.            |
| `tenant_usage_value`            | Gauge   | `tenant_id`, `resource`, `window` ∈ {`hour`,`day`,`month`}                                          | Rolling usage window for budget visualization.     |
| `tenant_requests_total`         | Counter | `tenant_id`, `route`, `status`                                                                      | Per-tenant request volume by route and HTTP status. |
| `tenant_errors_total`           | Counter | `tenant_id`, `route`, `error_code`                                                                  | Per-tenant error attribution for SLO dashboards.   |

All five series are registered on the same Prometheus registry as the rest of
the application metrics and exported via the same `/metrics` endpoint.

---

## 2. Currency normalization

Cost meters accept a `costUsd` value plus a `currency` code. The canonical
currency is **USD**. Non-USD values are converted to USD using a static
exchange-rate map. Unknown currencies get the label `currency=other` and are
still recorded (operators can choose to ignore them).

### 2.1 Conversion rules

| Input `currency` | Behavior                                                                |
| ---------------- | ----------------------------------------------------------------------- |
| `USD`            | Recorded as-is, no conversion.                                          |
| `EUR`, `GBP`, `JPY` | Converted via `EXCHANGE_RATES` static map → USD canonical.         |
| Anything else    | Recorded with label `currency=other`; original value retained as `costUsd`. |

### 2.2 Default exchange rates (USD per 1 unit)

```text
EUR = 1.08
GBP = 1.27
JPY = 0.0067
```

Override the rates by setting `OTEL_EXCHANGE_RATES` to a JSON object, for
example:

```bash
OTEL_EXCHANGE_RATES='{"EUR":1.10,"GBP":1.30,"JPY":0.0070}'
```

If the JSON is malformed the default rates are used and a warning is logged.

---

## 3. The `tenant_id` allow-list (cardinality protection)

Tenant IDs are high-cardinality by design. The base observability stack caps
the total number of unique label values at **256** to prevent Prometheus
memory blow-up and TSDB index thrash.

- The first 256 unique `tenantId` values are recorded verbatim.
- Any value beyond the 256th is collapsed into the sentinel `tenant_id=other`.
- The allow-list is populated lazily on first observation. The currently
  active list is exposed by the `tenantLabelAllowList` export for debugging
  and admin tooling.

### 3.1 Pre-seeding the allow-list

If your roster is small and known up front, you can pre-seed the list to
guarantee that the canonical IDs never collapse to `other`:

```bash
OTEL_TENANT_LABEL_ALLOW_LIST=acme-corp,globex,initech,umbrella
```

The list is parsed as a comma-separated string. Whitespace is trimmed.
Duplicates are deduplicated. Empty entries are dropped. The resulting array
replaces the lazy-discovery default. If the env var is not set, the lazy
discovery + 256 cap is used.

---

## 4. Helper API

```ts
import {
  recordTenantCost,
  setTenantQuota,
  recordTenantUsage,
  recordTenantRequest,
  recordTenantError,
  calculateCostUsd,
} from "~/lib/observability";
```

All helpers are **no-ops when `OTEL_ENABLED=false`**. They never throw and
never block the request path.

| Helper                                          | Returns                  | Notes                                                                  |
| ----------------------------------------------- | ------------------------ | ---------------------------------------------------------------------- |
| `recordTenantCost({...})`                       | `void`                   | Increments `tenant_cost_usd_total`. Currency-normalized.              |
| `setTenantQuota({tenantId, resource, limit, used})` | `void`                 | Sets `tenant_quota_ratio` to `used/limit`. `limit=0` is a no-op.      |
| `recordTenantUsage({tenantId, resource, value, window})` | `void`           | Sets `tenant_usage_value` for the given window.                       |
| `recordTenantRequest({tenantId, route, status})` | `void`                   | Increments `tenant_requests_total`.                                   |
| `recordTenantError({tenantId, route, errorCode})` | `void`                  | Increments `tenant_errors_total`.                                     |
| `calculateCostUsd({provider, model, inputTokens, outputTokens})` | `number` | Static pricing table. Unknown models fall back to `$0.01/1k` each side. |

---

## 5. Wire-up in the relay path

PR-007 records cost at the **relay boundary**. The bifrost route reads
`x-tenant-id` from the inbound request headers, prefers the upstream-supplied
`x-bifrost-cost-usd` and `x-bifrost-currency` headers (set by the upstream
proxy after token accounting), and falls back to `costUsd = 0` when neither is
present.

The cost attribution only runs on a successful relay (HTTP 2xx forwarded
back to the caller). Failed relays still bump `tenant_requests_total` with
the correct `status` so SLO dashboards stay accurate.

---

## 6. Sample PromQL queries

### 6.1 Hourly spend per tenant (USD)

```promql
sum by (tenant_id) (rate(tenant_cost_usd_total{currency="USD"}[1h]))
```

### 6.2 Daily spend per tenant (USD)

```promql
sum by (tenant_id) (increase(tenant_cost_usd_total{currency="USD"}[1d]))
```

### 6.3 Top-10 spenders in the last 24h

```promql
topk(10, sum by (tenant_id) (increase(tenant_cost_usd_total[24h])))
```

### 6.4 Per-model cost breakdown for one tenant

```promql
sum by (model) (rate(tenant_cost_usd_total{tenant_id="acme-corp"}[1h]))
```

### 6.5 Quota utilization (current)

```promql
tenant_quota_ratio * on(tenant_id) group_left() < 1
```

### 6.6 Tenants over 80% of any quota

```promql
tenant_quota_ratio > 0.80
```

### 6.7 Error rate per tenant per route

```promql
sum by (tenant_id, route) (rate(tenant_errors_total[5m]))
  / ignoring(error_code)
sum by (tenant_id, route) (rate(tenant_requests_total[5m]))
```

### 6.8 Non-USD cost leakage (operational hygiene)

```promql
sum by (currency) (rate(tenant_cost_usd_total[1h]))
```

A non-zero series for `currency=other` indicates upstream is sending a
currency code that the static exchange-rate table does not know about.

---

## 7. Cardinality budgets (rule of thumb)

| Series                       | Max unique label combos expected | Notes                                                  |
| ---------------------------- | -------------------------------- | ------------------------------------------------------ |
| `tenant_cost_usd_total`      | `256 tenants × ~6 providers × ~12 models × 4 currencies` ≈ 74k | Capped at 256 tenant IDs.                             |
| `tenant_quota_ratio`         | `256 tenants × 4 resources` ≈ 1k | Trivial.                                              |
| `tenant_usage_value`         | `256 tenants × 4 resources × 3 windows` ≈ 3k | Trivial.                                |
| `tenant_requests_total`      | `256 tenants × ~10 routes × 8 statuses` ≈ 20k | Bounded.                                       |
| `tenant_errors_total`        | `256 tenants × ~10 routes × ~20 codes` ≈ 51k | Bounded.                                       |

Keep the 256-tenant cap unless you operate a multi-tenant SaaS with a
genuinely larger roster, and even then raise it only after load-testing
Prometheus.

---

## 8. Troubleshooting

| Symptom                                                  | Likely cause                                                                                         |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `currency=other` is non-zero in dashboards                | Upstream sent an unknown currency code. Either add it to `OTEL_EXCHANGE_RATES` or filter the series. |
| A tenant suddenly disappears from dashboards             | The allow-list rotated; that tenant ID was promoted past position 256. Pre-seed the env var.        |
| `tenant_quota_ratio` is `NaN`                            | `limit = 0` was passed. The helper short-circuits in that case.                                      |
| `calculateCostUsd` returns the fallback $0.01/1k        | The model string is not in the static `MODEL_PRICING` table. Add an entry or accept the fallback.    |

---

## 9. Related documents

- `docs/observability/01-overview.md` — the base observability stack.
- `docs/observability/02-tenant-cost.md` — this document.
- `.env.example.observability` — all 30 environment variables recognized by the stack.
