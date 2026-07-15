# Capacity Planning Guide

> **Last updated**: 2026-07-09
> **Owner**: Platform team
> **Status**: Draft v1

## Purpose

This document defines how to estimate, monitor, and scale OmniRoute infrastructure to meet traffic demands while controlling cost.

---

## 1. Key Dimensions

| Dimension | Unit | Measurement | Source |
|-----------|------|-------------|--------|
| Throughput | Requests/sec (RPS) | Per-node RPS from metrics | Prometheus `/metrics` |
| Tokens | Tokens/sec | Input + output token rate | OpenSSE handler metrics |
| Active sessions | Concurrent SSE connections | Connection count | SSE manager |
| Provider latency | p50/p95/p99 ms | Upstream response time | Upstream headers + OTel spans |
| Memory | RSS (MB) | Resident set size | `process.memoryUsage()` + OS |
| Disk | WAL growth (MB/hr) | SQLite WAL file size | `db_health_check` MCP tool |

## 2. Baseline Observation

Run for 1 hour at typical traffic:

```bash
# Start Prometheus with the sample config
cd deploy/monitoring && prometheus --config.file=prometheus.yml

# Generate representative load
k6 run k6/smoke-test.js --vus 10 --duration 5m

# Export metrics snapshot
curl http://localhost:9090/api/v1/query?query=rate(http_requests_total[5m])
```

Record the output as `baseline-YYYY-MM-DD.json` in this directory.

## 3. Scaling Rules of Thumb

### Node Sizing

| Traffic Tier | RPS (peak) | CPU | RAM | Disk | Node Count |
|-------------|------------|-----|-----|------|------------|
| Light | <50 | 2 cores | 4 GB | 20 GB SSD | 1 |
| Medium | 50-200 | 4 cores | 8 GB | 50 GB SSD | 2 |
| Heavy | 200-1000 | 8 cores | 16 GB | 100 GB SSD | 3-5 |
| Extreme | >1000 | 16+ cores | 32+ GB | 200+ GB SSD | 5+ (LB) |

### SQLite Scaling

OmniRoute uses SQLite with WAL mode. Key limits:

- **Read concurrency**: Unlimited (WAL allows concurrent reads)
- **Write throughput**: ~1,000 txns/sec on SSD (single-writer WAL)
- **DB size**: <10 GB recommended; >50 GB requires VACUUM planning
- **WAL growth**: ~1-5% of DB size per hour under heavy write load; checkpoint every 1000 pages

When you exceed write throughput, migrate to the external Postgres adapter (see `docs/ops/POSTGRES_MIGRATION.md` if available).

## 4. Auto-Combo Capacity

Each combo routing strategy has a capacity profile:

| Strategy | CPU Impact | Memory Impact | Best For |
|----------|-----------|---------------|----------|
| Priority | Negligible | Negligible | Fixed provider preference |
| Weighted | Low | Low | Gradual traffic shift |
| Least-used | Low | Medium | Even load distribution |
| P2C (Power of Two Choices) | Medium | Medium | Large provider pools |
| Auto (LLM-evaluated) | High | High | Dynamic smart routing |
| LKGP | Medium | Medium | Latency-aware routing |

## 5. Cost Projection Model

```text
Monthly Cost = (NodeCount × NodeCost) + (TokenVolume × AvgTokenCost)

Where:
  NodeCost = instance_type hourly × 730 hours × 1.3 (headroom)
  AvgTokenCost = weighted average across providers
  TokenVolume = monthly_input_tokens + monthly_output_tokens × 3
```

### Example

```text
Tier: Medium
Nodes: 2 × 8-core/16GB @ $0.40/hr = $2,688/month (plus 30% buffer)
Tokens: 500M input + 100M output × 3 = 800M token-equivalents
Avg cost: $2/M tokens
Monthly token cost: $1,600
Total monthly: ~$4,300 + $500 headroom = ~$4,800
```

## 6. Thresholds & Actions

| Signal | Warning | Critical | Action |
|--------|---------|----------|--------|
| Node CPU | >70% for 5 min | >85% for 2 min | Add node or scale up |
| Node memory | >80% RSS | >90% RSS | Add node or increase RAM |
| p95 latency | >2s for 5 min | >5s for 1 min | Check provider health, add fallback |
| SQLite WAL | >500 MB | >1 GB | Manually checkpoint or VACUUM |
| Error rate | >1% for 5 min | >5% for 1 min | Trigger kill switch, alert on-call |

## 7. Capacity Review Cadence

| Activity | Frequency | Owner |
|----------|-----------|-------|
| Baseline capture | Weekly | Platform |
| Cost projection review | Monthly | Finance + Platform |
| Threshold tuning | Quarterly | Platform |
| Full capacity test | Per major release | Platform |

## 8. Related Documents

- `docs/ops/SLO.md` — Service level objectives and measurement
- `docs/ops/INCIDENT_RESPONSE.md` — Incident response procedure
- `deploy/monitoring/prometheus.yml` — Metrics gathering
- `deploy/monitoring/alertmanager.yml` — Alert routing
- `k6/smoke-test.js` — Baseline load test script
