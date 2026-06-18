# Resource Efficiency & Cost Attribution (OmniRoute, v3.8.24)

> **Status**: Living doc, refreshed quarterly.
> **Last reviewed**: 2026-06-18 (this turn).
> **Review cadence**: Quarterly (next: 2026-09-18).
> **Owner**: TBD — assign via CODEOWNERS (proposal: `@KooshaPari/release`).
> **Per**: 30-pillar framework L25 (Resource Efficiency). Migrating to
> 71-pillar in Q4 2026 per `ADR.md` § ADR-010.

---

## Service-Level Cost Breakdown

| Service / Workflow | Cloud / Runtime | Monthly cost (USD) | Per-transaction | Trend |
|---|---|---|---|---|
| **CI runners** (GitHub-hosted Linux) | GitHub Actions | ~$50/mo @ 2x standard | $0.30/merge avg | flat |
| **CI runners** (self-hosted, future) | Linux VM | target <$30/mo | target <$0.20/merge | pending Q4 |
| **OpenSSF Scorecard** | GitHub Actions | free | — | — |
| **Dependabot** | GitHub-hosted | free | — | — |
| **CodeRabbit** (PR review) | CodeRabbit SaaS | $0 (free tier) | — | flat |
| **Renovate** (dual automation) | GitHub-hosted | free | — | new in 2026-06 |
| **Storage (OmniRoute data dir)** | local `~/.omniroute/` | n/a (user-side) | n/a | n/a |
| **Storage (CI artifacts)** | GitHub Actions | $0 (free tier) | — | flat |
| **Container registry** (Docker Hub / GHCR) | GHCR | free (public repo) | — | flat |
| **Sandbox (E2E)** | Playwright on GitHub Actions | ~$10/mo | — | flat |
| **OpenAI/Anthropic API (e2e tests)** | provider SaaS | ~$5/mo | — | flat |
| **Total (estimated)** | | **~$65/mo** | **~$0.40/merge** | flat |

> **Note**: costs are estimated from GitHub Actions usage + provider API
> tests. Actual numbers should be pulled from the GitHub billing API monthly.
> See `scripts/audit/cost-report.mjs` (planned, post-v3.9.0).

---

## Optimization Backlog

| Item | Effort | Impact (USD/mo) | Status |
|---|---|---|---|
| Self-hosted CI runner (Linux, no GPU) | 1 w setup + maintenance | -$20/mo (2x runners @ $0.008/min → $0.001/min) | not started |
| Cache `node_modules` across CI jobs | 0.5 w | -$5/mo (avg) | not started |
| Switch Scorecard + Dependabot to weekly-only | 0.1 w | -$0 (already weekly) | done |
| Compress cache artifacts in CI | 0.5 w | -$2/mo (storage) | not started |
| Use spot instances for E2E (when self-hosted) | 1 w | -$5/mo | not started |
| Pre-warm `open-sse` build cache in CI | 0.5 w | -$3/mo | not started |
| **Total potential savings** | | **~$35/mo (-54%)** | |

File new opt items via `gh issue create --label cost-opt`.

---

## Right-Sizing

### Compute

- **CI runners**: 2x GitHub-hosted standard Linux (`ubuntu-24.04`), no GPU.
  Self-hosted (Linux VM) planned for Q4 2026 to cut per-minute cost by ~8x.
- **Production OmniRoute process**: 1x Node.js process, 2-4 vCPU, 4-8 GB RAM
  per tenant (multi-tenant scales horizontally).
- **SQLite database**: file-backed, no separate DB process. Backups stored
  compressed (gzip) in the same volume.

### Storage

- **Per-tenant OmniRoute data dir**: ~50-200 MB (database + cache + logs)
  depending on usage. Configurable via `DATA_DIR` env.
- **i18n locale files** (42 locales): ~10 MB total; auto-generated; can
  be gitignored per ADR-0005.
- **CI artifacts**: 100 MB / run, 30-day retention.

### Network

- **Provider API calls**: 232 providers; egress ~1-10 KB/req; per-tenant
  cost is provider-dependent.
- **MCP/A2A over WebSocket/SSE**: minimal overhead, ~1 KB/req control
  plane.

---

## FinOps Notes

### Targets

- **CI cost per-merge**: target <$0.50 (currently ~$0.30).
- **Per-tenant infra cost**: target <$5/mo for <100k req/mo tenants.
- **Storage cost per-tenant**: target <$0.10/mo for typical usage.

### Anomaly Alerts

- **Monthly cost** > 1.5x trailing 3-month avg → Slack alert.
- **Per-merge cost** > $1.00 → PR comment + auto-investigation.
- **Egress** > 10 GB/day per tenant → alert ops.
- **Provider API error rate** > 5% over 1 hour → page on-call.

### Chargeback (Multi-Tenant)

- Per-tenant cost is computed from `usage.ts` records (token counts ×
  provider rate) and `quota.ts` cost caps.
- Cost breakdown per tenant exposed via `/api/usage/cost` (admin).
- Future: cost export to external FinOps tools (CloudHealth, Vantage) via
  `/api/usage/export`.

### Provider Cost Sync

- **Source of truth**: `src/lib/pricingSync.ts` syncs from LiteLLM nightly.
- **Refresh**: every 24h via cron; on-demand via `POST /api/pricing/sync`.
- **Coverage**: 232 providers (where LiteLLM has pricing data; missing
  providers default to `cost_estimate: 0` with a warning flag).
- **Last sync**: see `SELECT last_sync_at FROM pricing_sync_log;` (in DB).

---

## Per-Workflow Cost (Projected)

| Workflow | Tokens/req (avg) | Cost/req (avg) | Notes |
|---|---|---|---|
| `chat/completions` (no compression) | 2000 | $0.002 | Baseline |
| `chat/completions` (lite compression) | 1700 | $0.0017 | -15% (ADR-006 spec) |
| `chat/completions` (rtk compression) | 1400 | $0.0014 | -30% (target) |
| `responses` (Responses API) | 2000 | $0.002 | Same as chat |
| `embeddings` | 500 | $0.00005 | Lower per token |
| `images/generations` | 1 image | $0.04 | Variable by model |
| `audio/transcriptions` | 60s | $0.006 | Whisper pricing |
| `audio/speech` | 1000 chars | $0.015 | TTS pricing |
| `rerank` | 5000 | $0.001 | Per-query |
| `search` | 1 query | $0.001 | 12 providers |
| **MCP tool invocation** | varies | $0.0001 | Internal overhead |
| **A2A skill invocation** | varies | $0.001 | Cross-agent overhead |

> **Aggregate target**: <$0.001 per request across the fleet
> (per `OKR.md` § Outcome KPIs).

---

## How to Use This Doc

- **Quarterly review**: walk the optimization backlog, update the cost
  breakdown, refresh anomaly thresholds.
- **Add a new cost item**: append a row to the relevant table with effort,
  impact, status, and owner.
- **Cross-team alignment**: share with `@KooshaPari/finance` (if exists)
  monthly; otherwise file an issue with label `cost-report`.

---

## Cross-References

- [`SPEC.md`](../SPEC.md) § 5.6 — Cost & pricing design.
- [`PLAN.md`](../PLAN.md) § 2.3 — Q3 2026 cost-related work items.
- [`docs/architecture/MONITORING_SECTIONS.md`](../docs/architecture/MONITORING_SECTIONS.md) — Monitoring includes cost dashboards.
- [`docs/ops/SQLITE_RUNTIME.md`](../docs/ops/SQLITE_RUNTIME.md) — Storage cost & backup sizing.
- [`docs/audits/FLEET-AUDIT-30-PILLAR.md`](../docs/audits/FLEET-AUDIT-30-PILLAR.md) — 30-pillar framework (L25 = this doc).
- [`OKR.md`](./OKR.md) — Outcome KPIs include cost targets.
- [`TECH_DEBT.md`](./TECH_DEBT.md) — Performance debt that drives cost.
