# Prometheus / Alertmanager Monitoring

> Prometheus scrape config + Alertmanager routing for OmniRoute.

## Prometheus (`deploy/monitoring/prometheus.yml`)

Scrapes OmniRoute's `/metrics` endpoint every 15s.

## Alertmanager (`deploy/monitoring/alertmanager.yml`)

Routes alerts to Slack and PagerDuty with appropriate severity routing.

## Dashboards

Import Grafana dashboards from `deploy/monitoring/dashboards/`:
- `omniroute-overview.json` — requests, latency, errors, rate limits
- `omniroute-provider.json` — per-provider breakdown
