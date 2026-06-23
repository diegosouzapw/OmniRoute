# Performance Budgets — OmniRoute (2026-06-18)

**Status**: Authoritative. SLO targets that the 71-pillar audit (L13)
references for the `Perf > 2.00` gate.
**Methodology**: per-endpoint p50/p95/p99 latency budgets, plus a
top-level availability SLO. Budgets are derived from the 3-replica
Caddy + Redis topology (commit `038439fa7`); adjust on infra change.
**Enforcement**: `benches/perf-gate.k6.js` (k6 reference script) —
**not** yet wired into CI; `bench/` already exists in the repo
and the script can be added there in a follow-up PR.
**Re-evaluation cadence**: quarterly, or on any major infra change.

---

## 1. Top-level SLOs

| SLO | Target | Window | Page on breach |
|---|---|---|---|
| **Availability** (2xx or 4xx for /v1/* and /api/settings/*) | 99.9% | rolling 30 days | on-call P2 |
| **Error budget burn rate** (1xx normalized rate) | < 2x for 1h, < 6x for 5m | 1h / 5m windows | on-call P1 |
| **Aggregate p95 latency** (all /v1/*) | ≤ 1.5 s | rolling 5 min | on-call P2 |
| **Aggregate p99 latency** (all /v1/*) | ≤ 4.0 s | rolling 5 min | on-call P2 |

**Error budget**: 30-day window = 43.2 minutes of unavailability at
99.9%. Burn rate > 2x is P2; > 6x is P1.

---

## 2. Per-endpoint latency budgets

All budgets measured **server-side** (Next.js Route Handler entry to
response start, or last byte for streaming). Stream endpoints are
measured to time-of-first-byte (TTFB) since the body is incremental.

### 2.1 Inference endpoints (the hot path)

| Endpoint | Method | p50 | p95 | p99 | Notes |
|---|---|---|---|---|---|
| `/v1/responses` (non-stream) | POST | 800 ms | 1.8 s | 3.5 s | Includes translator + provider roundtrip |
| `/v1/responses` (stream) | POST (TTFB) | 350 ms | 900 ms | 1.8 s | TTFB only; total duration unbounded |
| `/v1/relay/chat/completions` (non-stream) | POST | 1.0 s | 2.2 s | 4.0 s | Includes per-(token,IP) rate-limit check |
| `/v1/relay/chat/completions` (stream) | POST (TTFB) | 400 ms | 1.0 s | 2.0 s | |
| `/v1/embeddings` | POST | 300 ms | 700 ms | 1.4 s | Pure provider roundtrip; cheap |
| `/v1/rerank` | POST | 600 ms | 1.4 s | 2.8 s | |
| `/v1/moderations` | POST | 250 ms | 600 ms | 1.2 s | Lightweight classification |
| `/v1/audio/speech` | POST | 1.2 s | 3.0 s | 6.0 s | Audio synthesis is slow; budget reflects that |
| `/v1/audio/transcriptions` | POST | 2.0 s | 5.0 s | 10.0 s | STT is bounded by audio duration + model size |
| `/v1/images/generations` | POST | 4.0 s | 8.0 s | 15.0 s | Image gen is async-bound by provider |
| `/v1/videos/generations` | POST (TTFB) | 600 ms | 1.5 s | 3.0 s | Async; client polls `/v1/videos/{id}` |
| `/v1/music/generations` | POST | 3.0 s | 6.0 s | 12.0 s | |

### 2.2 Files + batches

| Endpoint | Method | p50 | p95 | p99 | Notes |
|---|---|---|---|---|---|
| `/v1/files` (GET) | GET | 80 ms | 200 ms | 400 ms | Cached list |
| `/v1/files` (POST upload) | POST | 500 ms | 1.2 s | 2.5 s | 25 MB cap; multipart parse |
| `/v1/files/{id}` (GET) | GET | 60 ms | 150 ms | 300 ms | |
| `/v1/files/{id}` (DELETE) | DELETE | 80 ms | 200 ms | 400 ms | |
| `/v1/files/{id}/content` (download) | GET | 100 ms | 300 ms | 600 ms | + per-MB throughput |
| `/v1/batches` (GET) | GET | 150 ms | 400 ms | 800 ms | |
| `/v1/batches` (POST create) | POST | 200 ms | 500 ms | 1.0 s | Validates input file then enqueues |
| `/v1/batches/{id}` (GET) | GET | 100 ms | 300 ms | 600 ms | |
| `/v1/batches/{id}` (DELETE) | DELETE | 100 ms | 300 ms | 600 ms | |
| `/v1/batches/delete-completed` (POST) | POST | 400 ms | 1.0 s | 2.0 s | Mass delete; n rows |

### 2.3 Agents

| Endpoint | Method | p50 | p95 | p99 | Notes |
|---|---|---|---|---|---|
| `/v1/agents/health` | GET | 1.5 s | 4.5 s | 5.0 s | 5s per-provider timeout cap; expect 3-provider total |
| `/v1/agents/credentials` | GET | 100 ms | 250 ms | 500 ms | Metadata only; values never returned |
| `/v1/agents/tasks` (GET list) | GET | 150 ms | 400 ms | 800 ms | |
| `/v1/agents/tasks` (POST create) | POST | 250 ms | 600 ms | 1.2 s | Just enqueues; doesn't run agent |
| `/v1/agents/tasks/{id}` (GET) | GET | 100 ms | 300 ms | 600 ms | |
| `/v1/agents/tasks/{id}` (DELETE) | DELETE | 150 ms | 400 ms | 800 ms | |

### 2.4 Combos / me / providers

| Endpoint | Method | p50 | p95 | p99 |
|---|---|---|---|---|
| `/v1/combos` | GET | 80 ms | 200 ms | 400 ms |
| `/v1/me/status` | GET | 60 ms | 150 ms | 300 ms |
| `/v1/providers/{provider}/models` | GET | 100 ms | 250 ms | 500 ms |

### 2.5 Web / search

| Endpoint | Method | p50 | p95 | p99 | Notes |
|---|---|---|---|---|---|
| `/v1/web/fetch` | POST | 1.5 s | 4.0 s | 8.0 s | 10s timeout cap; recurse depth 3 |
| `/v1/search` | POST | 800 ms | 2.0 s | 4.0 s | Provider search latency varies |

### 2.6 VSCode-CLI shim (token-scoped)

These are the legacy passthrough paths. Budgets are tighter because
they're called frequently by the VSCode-CLI extension in tight loops.

| Endpoint | Method | p50 | p95 | p99 |
|---|---|---|---|---|
| `/v1/vscode/{token}/v1/chat/completions` | POST | 700 ms | 1.6 s | 3.0 s |
| `/v1/vscode/{token}/v1/models` | GET | 60 ms | 150 ms | 300 ms |
| `/v1/vscode/{token}/combos` | GET | 80 ms | 200 ms | 400 ms |
| `/v1/vscode/{token}/chat/completions` (legacy) | POST | 700 ms | 1.6 s | 3.0 s |
| `/v1/vscode/{token}/models` (legacy) | GET | 60 ms | 150 ms | 300 ms |
| `/v1/vscode/{token}/responses` | POST | 800 ms | 1.8 s | 3.5 s |

### 2.7 Management / settings

Management endpoints are operator-only and not part of the hot path.
Budgets are set conservatively; breaches don't page on-call but do
flag in the weekly perf review.

| Endpoint group | p50 | p95 | p99 |
|---|---|---|---|
| `/api/settings/*` (GET) | 100 ms | 300 ms | 600 ms |
| `/api/settings/*` (POST/PATCH/DELETE) | 200 ms | 500 ms | 1.0 s |
| `/api/keys/*` (CRUD) | 150 ms | 400 ms | 800 ms |
| `/api/quota/*` (CRUD) | 150 ms | 400 ms | 800 ms |
| `/api/monitoring/health` (heavy) | 500 ms | 1.5 s | 3.0 s |

### 2.8 Public probes

| Endpoint | Method | p50 | p95 | p99 |
|---|---|---|---|---|
| `/api/health/ping` | GET | 5 ms | 20 ms | 50 ms |
| `/api/version` | GET | 5 ms | 20 ms | 50 ms |
| `/api/docs` | GET | 20 ms | 80 ms | 200 ms (HTML shell, no provider call) |

---

## 3. Throughput targets

| Tier | Per-replica RPS | Cluster RPS (3 replicas) | Notes |
|---|---|---|---|
| Inference (non-stream) | 50 RPS | 150 RPS | Bounded by provider quota + translator CPU |
| Inference (stream) | 25 concurrent streams | 75 streams | Bounded by Node event-loop + memory |
| Embeddings | 200 RPS | 600 RPS | Cheap |
| Files (upload) | 10 RPS | 30 RPS | Multipart parse + DB write |
| Files (download) | 100 RPS | 300 RPS | Static-content via Next.js |
| Combos / me / providers | 500 RPS | 1,500 RPS | Cached |
| WebSocket | 100 concurrent connections | 300 | Per-IP cap 5 |

**Cluster ceiling** (all endpoints combined, sustained): ~1,000 RPS
before p95 latency begins to climb. Scale horizontally beyond that
by adding replicas; the Caddy LB is stateless.

---

## 4. Resource budgets

| Resource | Per-replica cap | Notes |
|---|---|---|
| RSS memory | 1.5 GB | Spikes during audio/video gen; expect brief 2 GB |
| Event-loop lag (p99) | 50 ms | Alert via `clinic doctor` regression |
| Heap retained | 800 MB | Old-gen GC tuning in `node --max-old-space-size` |
| File descriptors | 2,000 | `ulimit -n 4096` recommended at host |
| DB connections (sql.js) | 1 per replica | sql.js is in-process; no pool needed |
| Redis connections | 20 per replica | Pooled; idle reaped at 5 min |

---

## 5. Cold-start budget

Next.js App Router cold-start on a fresh container:

| Phase | Budget |
|---|---|
| Container start → HTTP listening | ≤ 800 ms |
| First request TTFB (warm) | ≤ 200 ms |
| Translator registry bootstrap | ≤ 500 ms (one-time, first /v1/responses) |

**Measurement script**: `bin/cold-start-bench.sh` (not yet committed;
`bin/` is the canonical scripts dir).

---

## 6. Regression gate (k6 reference)

The `benches/perf-gate.k6.js` script asserts the SLOs above. Not yet
wired into CI; the JSON output is the contract for the next infra PR.

```javascript
// benches/perf-gate.k6.js — pseudo-code; not yet committed
import http from 'k6/http';
import { check, Trend } from 'k6';

const responsesTTFB = new Trend('v1_responses_ttfb', true);

export const options = {
  scenarios: {
    smoke: {
      executor: 'constant-vus',
      vus: 10,
      duration: '1m',
    },
  },
  thresholds: {
    'http_req_duration{endpoint:v1_responses}': ['p(95)<1800', 'p(99)<3500'],
    'http_req_failed': ['rate<0.01'],
    'v1_responses_ttfb': ['p(95)<900'],
  },
};

export default function () {
  const res = http.post(`${__ENV.BASE_URL}/api/v1/responses`, JSON.stringify({
    model: 'gpt-4o-mini',
    input: 'ping',
  }), { headers: { 'Authorization': `Bearer ${__ENV.API_KEY}` }});
  check(res, { 'status is 200': (r) => r.status === 200 });
  responsesTTFB.add(res.timings.waiting);
}
```

---

## 7. Review log

| Date | Reviewer | Change |
|---|---|---|
| 2026-06-18 | security-circle lead | Initial per-endpoint budgets derived from 3-replica Caddy + Redis topology |
| 2026-07-18 (planned) | observability-circle | Wire `benches/perf-gate.k6.js` into CI; gate on p95 + p99 breach |
| 2026-09-18 (planned) | observability-circle | Quarterly review; adjust after real-traffic baseline data |
