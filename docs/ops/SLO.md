# Service Level Objectives (SLOs)

> Current SLO targets for OmniRoute.

## SLO Table

| Service | SLO | Measurement | Window | Current |
|---------|-----|-------------|--------|---------|
| Chat completions | 99.9% | Error rate | 30d rolling | 99.95% |
| Chat completions (p50) | 1000ms | Latency | 30d rolling | 320ms |
| Chat completions (p99) | 10000ms | Latency | 30d rolling | 4500ms |
| API availability | 99.99% | Uptime | 30d rolling | 100% |
| Provider uptime | 99.5% | Provider error rate | 30d rolling | 99.2% |
| MCP tool invocations | 99.5% | Error rate | 30d rolling | 99.7% |
| Dashboard availability | 99.9% | HTTP status | 30d rolling | 99.9% |

## Error Budgets

| Service | SLO | Budget | Monthly allowance | Used |
|---------|-----|--------|-------------------|------|
| Chat completions | 99.9% | 0.1% | 43 min downtime | 12 min |

## Burn Rate Alerts

| Alert | Threshold | Window |
|-------|-----------|--------|
| Critical | > 2% error rate | 5 min |
| Warning | > 1% error rate | 30 min |
| Info | > 0.5% error rate | 6h |

## Measurement

SLOs are measured via:
1. **Logs** — request-level success/failure from pino
2. **Metrics** — Prometheus counters for error rate
3. **Traces** — OTel span data for latency

Dashboards:
- Grafana: Overview dashboard (requests, errors, latency)
- Grafana: Provider dashboard (per-provider breakdown)

## Reporting

SLO compliance reported weekly:
- [ ] Current vs target for each SLO
- [ ] Error budget consumption
- [ ] Top failure modes
- [ ] Action items for regression
