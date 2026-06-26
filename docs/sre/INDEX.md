# SRE Playbook Library — OmniRoute (PR-011)

**Status**: Authoritative. Companion to `docs/INCIDENT_RESPONSE.md` (severity
ladder + 15-min checklist) and `docs/PERF_BUDGETS.md` (top-level SLOs).
**Audience**: On-call engineers (engineering, data, security rotations).
**Authoring rules**: every command below references a real file path or
metric that exists in this repository. No fabricated facts. If a runbook
references a number (latency budget, threshold MB, etc.) it is sourced from
the linked code path so the runbook cannot drift silently.

**Scope**: this PR delivers 8 incident-response runbooks + 4 operational
scripts + 3 test files. It does **not** introduce new metrics, alerts, or
dashboard panels — those live in observability PRs #4997 / #5014 / #5018.
When those land, this INDEX will gain `Metrics` and `Dashboards` columns
per alert.

---

## 1. Runbook index

| # | Runbook | Primary alert / signal | Metric or log key | Error code | Detection endpoint | Owner |
|---|---|---|---|---|---|---|
| 01 | [`01-undici-502-bursts.md`](./01-undici-502-bursts.md) | Burst of 502s from `/v1/relay/chat/completions` | `provider_errors` counter in `open-sse/services/errorClassifier.ts`; `[ProxyFetch] Undici dispatcher failed` log line from `open-sse/utils/proxyDispatcher.ts` | `PROXY_001` / `PROVIDER_001` | `GET /api/monitoring/health` (provider health panel) | routing |
| 02 | [`02-aliyun-waf-blocks.md`](./02-aliyun-waf-blocks.md) | Spike of 403s on the Aliyun edge; `X-WAF-Block` headers in upstream logs | upstream 403 rate from `src/shared/utils/classify429.ts` plus undici WAF response classification in `open-sse/utils/proxyDispatcher.ts` | `AUTH_004` | `GET /api/monitoring/health` + `src/lib/proxyHealth.ts` cache | routing |
| 03 | [`03-heap-oom.md`](./03-heap-oom.md) | `heap_pressure` alert fires; `Retry-After: 5` responses | `HEAP_PRESSURE_THRESHOLD_MB` from `open-sse/utils/heapPressure.ts`; `process.memoryUsage().heapUsed` | `heap_pressure` (custom code) | `GET /api/monitoring/health` → `checks.heap_pressure` | platform |
| 04 | [`04-bifrost-sidecar-down.md`](./04-bifrost-sidecar-down.md) | `X-Bifrost-Fallback` header appearing on every response; `liveWsConsecutiveFailures` climbing in `forwardDashboardEventToLiveWs` | sidecar `/healthz` reachability; `open-sse/handlers/chatCore/telemetryHelpers.ts::forwardDashboardEventToLiveWs` | `PROVIDER_002` | direct curl `http://127.0.0.1:20129/healthz`; `GET /api/system/version` shows `bifrost=true` | platform |
| 05 | [`05-combo-dag-cycle.md`](./05-combo-dag-cycle.md) | `POST /api/combos/{id}` returns 400 with `error.code = "COMBO_005"` | `validateComboDAG` failure logged at `src/app/api/combos/[id]/route.ts:222` | `COMBO_005` (`reason: cycle-detected` or `max-depth-exceeded`) | `POST /api/combos/{id}` smoke; `GET /api/monitoring/health` (combo targets panel) | routing |
| 06 | [`06-provider-quota-exhausted.md`](./06-provider-quota-exhausted.md) | `quota_exhausted` alert; cascade of 429s on a single connection | `quota_used` gauge in `open-sse/services/quotaMonitor.ts`; `QuotaMonitorSnapshot.status === "exhausted"` from `src/lib/monitoring/observability.ts` | `RATE_001` / `RATE_003` | `GET /api/monitoring/health` → `checks.quota_monitors`; MCP `observability_snapshot` | routing |
| 07 | [`07-sqlite-wal-bloat.md`](./07-sqlite-wal-bloat.md) | Disk-fill alert on `~/.omniroute/`; `storage.sqlite-wal` > 500 MB | `src/lib/db/storage.ts` reports `wal_pages`; `src/lib/monitoring/dbHealthCheck.ts` exposes `wal_size_bytes` | none (operational) | `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"` + `ls -lh ~/.omniroute/` | data |
| 08 | [`08-tailscale-overlay-partition.md`](./08-tailscale-overlay-partition.md) | Tailnet ping fails; `tailscaled` socket disconnected | `src/lib/tailscaleTunnel.ts` reports `TailscaleTunnelPhase = "stopped"`; `tailscale status` exit code ≠ 0 | none (operational) | `GET /api/tunnels/tailscale/check`; `tailscale ping <peer>` | platform |

---

## 2. Operational scripts

| Script | Purpose | SRE role | Test |
|---|---|---|---|
| [`scripts/sre/capture-heap-snapshot.mjs`](../../scripts/sre/capture-heap-snapshot.mjs) | Trigger `v8.writeHeapSnapshot()`, write the file locally, and PUT it to an S3-compatible object store (configurable endpoint) for offline `chrome://inspect` analysis | platform | [`tests/sre/capture-heap-snapshot.test.ts`](../../tests/sre/capture-heap-snapshot.test.ts) |
| [`scripts/sre/trace-topology.mjs`](../../scripts/sre/trace-topology.mjs) | Query a running OTLP/HTTP collector (Prometheus or Tempo), aggregate the last N minutes of spans by service, and print a service graph as ASCII | platform / observability | n/a (live network) |
| [`scripts/sre/redact-logs.mjs`](../../scripts/sre/redact-logs.mjs) | Stream logs from stdin → stdout, replacing PII (email, IPv4/IPv6, bearer tokens, OpenAI/Anthropic keys) with stable redaction markers. Pure Node stdlib. | compliance / log-shipping | [`tests/sre/redact-logs.test.ts`](../../tests/sre/redact-logs.test.ts) |
| [`scripts/sre/oncall-rotation.mjs`](../../scripts/sre/oncall-rotation.mjs) | PagerDuty-style rotation calculator: given a list of engineers, a start date, and a shift length, emit who is on-call for each interval across week boundaries and DST changes. File-based state, zero deps. | engineering manager | [`tests/sre/oncall-rotation.test.ts`](../../tests/sre/oncall-rotation.test.ts) |

All scripts use **only** Node.js stdlib (`fs`, `http`, `https`, `crypto`, `zlib`,
`stream`, `os`, `path`). No `npm install` step is required to run them.

---

## 3. Severity ladder (cross-reference)

See `docs/INCIDENT_RESPONSE.md` § 1 for the full table. The runbooks in
this library assume you have already:

1. Acknowledged the page in PagerDuty.
2. Opened `#inc-YYYY-MM-DD-slug` and posted a one-line ack.
3. Classified severity per the ladder (SEV-1 → SEV-4).
4. Captured the alert payload, the running `version`, and the top slow / erroring endpoints.

Runbooks are written so the **mitigation-first branch** can be executed
in under 10 minutes from page-to-action. Root-cause investigation is
captured under § "Investigate" of each runbook and is parallel to
mitigation, not a prerequisite.

---

## 4. Quick-reference: which runbook for which signal

| I see… | Go to |
|---|---|
| Burst of 502s on `/v1/relay/chat/completions` | [01-undici-502-bursts.md](./01-undici-502-bursts.md) |
| 403s with `X-WAF-Block` header | [02-aliyun-waf-blocks.md](./02-aliyun-waf-blocks.md) |
| `Retry-After: 5` on chat completions | [03-heap-oom.md](./03-heap-oom.md) |
| All chat responses include `X-Bifrost-Fallback` | [04-bifrost-sidecar-down.md](./04-bifrost-sidecar-down.md) |
| `POST /api/combos/{id}` returns 400 with `code: COMBO_005` | [05-combo-dag-cycle.md](./05-combo-dag-cycle.md) |
| One provider starts returning 429 for every key | [06-provider-quota-exhausted.md](./06-provider-quota-exhausted.md) |
| Disk full on the OmniRoute volume | [07-sqlite-wal-bloat.md](./07-sqlite-wal-bloat.md) |
| Cluster can't reach itself across tailnet | [08-tailscale-overlay-partition.md](./08-tailscale-overlay-partition.md) |

---

## 5. Escalation paths

| Signal | Primary on-call | Secondary | Notify channel |
|---|---|---|---|
| Undici / WAF / quota / combo failures | engineering on-call (routing) | @open-sse | `#omniroute-ops` |
| Heap OOM / sidecar down / WAL bloat / tailscale partition | platform on-call | @db-team (WAL only) | `#omniroute-ops` |
| Any data-loss scenario | data on-call | security on-call | `#omniroute-ops` (SEV-1) |
| Any incident involving user data exfiltration | **stop** — see `SECURITY.md` | — | security-team direct |

---

## 6. When NOT to use these runbooks

- **Vulnerability disclosure** — `SECURITY.md` (separate flow, do not post to `#omniroute-ops`).
- **Feature requests / config changes** — file a GitHub issue, not an incident.
- **Performance regression that is not user-visible** — weekly perf review queue, not the on-call path.

---

## 7. Maintenance

- **Quarterly review**: every runbook owner updates the "Last verified" date and re-runs the smoke test listed at the bottom of the runbook.
- **On code change**: if a referenced file path or metric name moves, the runbook owner must update this INDEX and the affected runbook in the same PR.
- **Postmortem link**: every SEV-1/2 postmortem files at least one update to this library if the runbook lacked the relevant step.

## 8. Review log

| Date | Reviewer | Change |
|---|---|---|
| 2026-06-25 | sre-circle (PR-011) | Initial library: 8 runbooks, 4 ops scripts, 3 test files. Index references PRs #4997 / #5014 / #5018 for metrics + dashboards (planned). |