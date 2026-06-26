# Error Budgets — Operator Guide

PR-012 introduces production-grade error budget tracking and multi-window
burn-rate alerting for OmniRoute. This guide explains how the system works,
how to interpret the alerts it fires, and how to respond when one fires.

> **Audience**: on-call SRE, platform engineering, anyone paged by a
> burn-rate alert.

---

## 1. What is an error budget?

The Google SRE Workbook definition:

> An SLO is a target reliability promise over a rolling window. The
> **error budget** is the allowed unreliability over that window.

For a 99.9% SLO over a 30-day window with one million requests:

```
allowed_errors = total_requests × (1 - SLO)
              = 1_000_000 × 0.001
              = 1_000 errors
```

The SRE team is permitted to "spend" those 1,000 errors over 30 days. Once
spent, feature freeze kicks in and engineering prioritises reliability
over new features.

---

## 2. The five production SLOs (PR-012)

| ID      | Objective                          | Target  | Window | Owner     |
|---------|------------------------------------|---------|--------|-----------|
| SLO-001 | API availability                   | 99.9%   | 30d    | platform  |
| SLO-002 | p95 latency < 500ms                | 99.0%   | 7d     | platform  |
| SLO-003 | Bifrost relay success              | 99.5%   | 24h    | inference |
| SLO-004 | Combo execution success            | 99.0%   | 24h    | inference |
| SLO-005 | Provider failover < 2s             | 99.0%   | 1h     | platform  |

Source of truth: `src/lib/sre/sloDefinitions.ts`. Adding an SLO is a
code change — never edit the catalog at runtime.

---

## 3. Burn rate — the leading indicator

The SLO is *trailing* (30d, 7d, …). We can't wait a month to know
we're in trouble. The **burn rate** is the *speed* at which the budget
is being consumed, expressed as a multiple of the allowed rate:

```
burn_rate = observed_error_rate / allowed_error_rate
         = 1.0  (on budget)
         = 2.0  (burning twice as fast as allowed — would exhaust
                 the budget in half the window)
        = 14.4  (burning 14.4× as fast — would exhaust the budget
                 in 1/14.4 of the window, i.e. ~2 days for a 30d SLO)
```

### Multi-window checks (Google SRE Workbook)

A single-window check produces false positives (a 5-minute deploy spike
trips a 1h check) and false negatives (a 1.5× sustained burn is missed
by a 1h check but visible at 24h). PR-012 uses the canonical multi-window
AND logic:

| Window | Threshold | Severity | Reasoning                                                  |
|--------|-----------|----------|------------------------------------------------------------|
| 1h     | > 14.4×   | **page**   | 2% of the 28d budget in 1h — fast burn, page immediately.  |
| 6h     | > 6×      | **ticket** | 5% of the 28d budget in 6h — slow burn, open a ticket.    |
| 1h     | > 1×      | **warn**   | Any over-budget burn in 1h — log only, suppress if a page is already firing on the same window. |

These thresholds are the Google SRE Workbook table, reformulated as a
budget-fraction:

- 2% of a 28d budget consumed in 1h = 14.4× burn.
- 5% of a 28d budget consumed in 6h = 6× burn.

---

## 4. How to read an alert

When you get paged by `omniroute_slo_alerts_fired_total{slo_id="SLO-001",
severity="page"}`, the message looks like:

```
SLO SLO-001: fast-burn PAGE — 1h burn rate is 18.30× (threshold 14.40×).
Expect to exhaust the 28d error budget within ~1h at this rate.
```

The trailing "expect to exhaust within …" is computed from the observed
burn rate at alert-evaluation time. It is a *projection*, not a
guarantee — a transient spike that recovers in 30 minutes won't
actually exhaust the budget.

### Severity triage

1. **page** — drop what you're doing. Open the SLO dashboard
   (`/api/v1/slo/SLO-001`). Look at the burn-rate time series.
   The likely causes are:
   - **Provider outage**: check upstream status pages first.
   - **Bad deploy**: was there a release in the last hour?
   - **Traffic spike**: is the SLI falling because volume went up?
   Roll back the most recent release if rollback is safe.

2. **ticket** — open a P3 ticket. Slow burns are easier to debug than
   fast burns. Look at the 6h burn-rate series. If the burn is
   trending up over the last 6 hours, treat it as a slow-burning
   incident. If it's been stable, it may be a known-flaky
   provider that we tolerate.

3. **warn** — informational. The SLO is below target but not at
   paging severity. These fire whenever burn > 1× but ≤ 14.4× in
   the 1h window. They DO NOT fire if a page is already firing on
   the same window — we suppress to avoid double-alerting.

---

## 5. Time-to-exhaustion

`time_to_exhaustion_minutes` is a derived metric: how long until the
budget is fully consumed at the current burn rate. Three cases:

| Value          | Meaning                                                              |
|----------------|----------------------------------------------------------------------|
| `null`         | The budget is already exhausted. Treat as outage.                    |
| finite number  | Minutes until exhaustion at the current rate. Plan accordingly.      |
| `Infinity`     | Burn rate is zero. The budget will not be exhausted.                 |

When a page fires and `time_to_exhaustion_minutes < 60`, expect the
budget to be exhausted within the hour. When it's > 24h, the alert is
*real* but you have time to investigate before the budget is gone.

---

## 6. Default-off behaviour

PR-012 is shipped **default-off**. The full subsystem activates only
when:

```bash
export SLO_TRACKER_ENABLED=true
```

When disabled:

- `recordBudgetMetric()` is a no-op (no Prometheus writes).
- `/api/v1/slo` and `/api/v1/slo/{id}` return the catalog but every
  `current` field is `null`.
- `/api/v1/slo/{id}/burn` returns a zeroed series with `enabled=false`.

To opt in for staging: set `SLO_TRACKER_ENABLED=true` in the staging
environment. To opt out in production (e.g. during a database
migration), unset the env var. The endpoints remain functional; they
just stop recording.

---

## 7. Prometheus metrics

Four metric families ship with PR-012:

```
omniroute_slo_target_ratio{slo_id}                  gauge   [0,1]
omniroute_slo_error_budget_remaining{slo_id,window} gauge   [0,1]
omniroute_slo_burn_rate{slo_id,window}               gauge   rate
omniroute_slo_alerts_fired_total{slo_id,severity}   counter alerts
omniroute_slo_cardinality_dropped_total              counter drops
```

### Cardinality cap

The budget metrics are bounded to **75 series**:

- 5 SLOs × 5 windows × 3 severities = 75
- Plus `target_ratio` (5 SLOs) and the dropped counter (1 series) = 11

The cap exists to protect Prometheus from label explosion. The
`cardinality_dropped_total` counter increments every time a write is
rejected for exceeding the cap. **If this counter is non-zero, check
that no test/QA env is registering throwaway SLO ids** — the catalog
is frozen at 5 entries.

### Scraping

The metrics are emitted in Prometheus text exposition format from
`renderPrometheusExposition()`. The intended integration:

```yaml
# prometheus.yml
scrape_configs:
  - job_name: omniroute_slo
    metrics_path: /api/v1/slo/metrics
    static_configs:
      - targets: [omniroute-internal]
```

Wire the metrics endpoint into the same scrape config as the rest of
the service so the burn-rate alerts in Prometheus have a consistent
cardinality budget.

---

## 8. Alert routing

PR-012 produces the *alert signal*. Pager routing is handled by the
existing alertmanager pipeline (see PR-008 / issue #5018). The
recommended routing rules:

```yaml
# alertmanager.yml (excerpt)
route:
  receiver: omniroute-platform-pager
  routes:
    - matchers:
        - slo_id="SLO-001"
        - severity="page"
      receiver: omniroute-platform-pager
      group_wait: 30s
    - matchers:
        - slo_id="SLO-003"
        - severity="ticket"
      receiver: omniroute-inference-tickets
```

The page/ticket/warn severity maps directly to the AlertSeverity enum
exposed by `src/lib/sre/errorBudget.ts`.

---

## 9. Common questions

**Why is the 30d window for SLO-001 instead of the canonical 28d?**
The 28d window is the Google SRE Workbook default, but our business
calendar runs on a 30-day cycle. 30d is a deliberate choice; the math
is the same (target × window length = budget).

**What happens to the budget at the window boundary?**
The window is **rolling**, not calendar-based. There is no "reset".
The error budget at any moment is `(1 - target) × window_length -
errors_so_far`. When errors_so_far ≥ allowed_errors, the budget is
exhausted.

**Why is the cardinality cap 75 and not 1000?**
The Prometheus best practice is to keep label cardinality bounded. We
have 5 SLOs and 5 windows. That's 25 series for the gauges; adding
3 severities on the alerts counter brings us to 75. The cap is sized
so the catalog can grow to 10 SLOs without exceeding it. Beyond that,
re-evaluate the metric design — don't silently inflate cardinality.

**Can I disable a single SLO?**
Not at runtime. The catalog is frozen at 5 entries. To temporarily
de-emphasise an SLO, route its alerts to a quieter channel in
alertmanager.

**How do I test alerts without paging anyone?**
Set `SLO_TRACKER_ENABLED=true` in a staging env and inject synthetic
samples through the metrics endpoint. The default thresholds are
applied unchanged — use a dedicated "test" SLO id if you need to
verify routing without polluting production labels.

---

## 10. Related documents

- `docs/sre/01-slo-overview.md` — how SLOs are defined and evaluated.
- `src/lib/sre/errorBudget.ts` — the calculator (pure math).
- `src/lib/sre/sloDefinitions.ts` — the catalog.
- `src/lib/observability/budgetMetrics.ts` — the Prometheus binding.
- `src/app/api/v1/slo/*` — the public HTTP surface.
- PR-008 / issue #5018 — alertmanager routing rules.
