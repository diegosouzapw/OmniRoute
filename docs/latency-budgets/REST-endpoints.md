# REST Endpoint Latency Budgets — OmniRoute

**Pillar:** L17 (latency-budget-to-CI)
**Status:** Authoritative. Extends the per-endpoint budgets from `docs/PERF_BUDGETS.md`
with CI enforcement hooks for every REST endpoint in the API surface.
**Refs:** [`docs/PERF_BUDGETS.md`](../PERF_BUDGETS.md),
[`.github/workflows/latency-budget.yml`](../../.github/workflows/latency-budget.yml),
[`tools/latency-budget-to-ci/budget.py`](../../tools/latency-budget-to-ci/budget.py)

---

## 1. Scope

All REST endpoints under `/v1/*` and `/api/*` that are part of the production API surface.
Excluded: static assets, `/api/docs` (HTML shell, no provider call), internal error pages.

---

## 2. Consolidated Endpoint Budget Table

All measurements are **server-side** (Next.js Route Handler entry to response start,
or TTFB for streaming endpoints). Budgets are from the 3-replica Caddy + Redis topology;
adjust on infra change.

| # | Endpoint | Method | Budget p99 | Hard cap | Notes |
|---|----------|--------|-----------|----------|-------|
| 1 | `/v1/responses` (non-stream) | POST | 3.5 s | 5.0 s | Includes translator + provider roundtrip |
| 2 | `/v1/responses` (stream, TTFB) | POST | 1.8 s | 3.0 s | TTFB only; total duration unbounded |
| 3 | `/v1/relay/chat/completions` (non-stream) | POST | 4.0 s | 6.0 s | Includes per-(token,IP) rate-limit check |
| 4 | `/v1/relay/chat/completions` (stream, TTFB) | POST | 2.0 s | 3.5 s | |
| 5 | `/v1/embeddings` | POST | 1.4 s | 2.5 s | Pure provider roundtrip; cheap |
| 6 | `/v1/rerank` | POST | 2.8 s | 4.0 s | |
| 7 | `/v1/moderations` | POST | 1.2 s | 2.0 s | Lightweight classification |
| 8 | `/v1/audio/speech` | POST | 6.0 s | 10.0 s | Audio synthesis is slow |
| 9 | `/v1/audio/transcriptions` | POST | 10.0 s | 15.0 s | STT bounded by audio duration + model size |
| 10 | `/v1/images/generations` | POST | 15.0 s | 20.0 s | Image gen is async-bound by provider |
| 11 | `/v1/videos/generations` (TTFB) | POST | 3.0 s | 5.0 s | Async; client polls `/v1/videos/{id}` |
| 12 | `/v1/music/generations` | POST | 12.0 s | 18.0 s | |
| 13 | `/v1/files` (list) | GET | 400 ms | 800 ms | Cached list |
| 14 | `/v1/files` (upload) | POST | 2.5 s | 4.0 s | 25 MB cap; multipart parse |
| 15 | `/v1/files/{id}` | GET | 300 ms | 600 ms | |
| 16 | `/v1/files/{id}` | DELETE | 400 ms | 800 ms | |
| 17 | `/v1/files/{id}/content` (download) | GET | 600 ms | 1.2 s | + per-MB throughput |
| 18 | `/v1/batches` (list) | GET | 800 ms | 1.5 s | |
| 19 | `/v1/batches` (create) | POST | 1.0 s | 2.0 s | Validates input file then enqueues |
| 20 | `/v1/batches/{id}` | GET | 600 ms | 1.2 s | |
| 21 | `/v1/batches/{id}` | DELETE | 600 ms | 1.2 s | |
| 22 | `/v1/batches/delete-completed` | POST | 2.0 s | 4.0 s | Mass delete; n rows |
| 23 | `/v1/agents/health` | GET | 5.0 s | 8.0 s | 5s per-provider timeout cap; 3 providers |
| 24 | `/v1/agents/credentials` | GET | 500 ms | 1.0 s | Metadata only; values never returned |
| 25 | `/v1/agents/tasks` (list) | GET | 800 ms | 1.5 s | |
| 26 | `/v1/agents/tasks` (create) | POST | 1.2 s | 2.0 s | Just enqueues; doesn't run agent |
| 27 | `/v1/agents/tasks/{id}` | GET | 600 ms | 1.2 s | |
| 28 | `/v1/agents/tasks/{id}` | DELETE | 800 ms | 1.5 s | |
| 29 | `/v1/combos` | GET | 400 ms | 800 ms | |
| 30 | `/v1/me/status` | GET | 300 ms | 600 ms | |
| 31 | `/v1/providers/{provider}/models` | GET | 500 ms | 1.0 s | |
| 32 | `/v1/web/fetch` | POST | 8.0 s | 12.0 s | 10s timeout cap; recurse depth 3 |
| 33 | `/v1/search` | POST | 4.0 s | 6.0 s | Provider search latency varies |
| 34 | `/v1/vscode/{token}/v1/chat/completions` | POST | 3.0 s | 5.0 s | |
| 35 | `/v1/vscode/{token}/v1/models` | GET | 300 ms | 600 ms | |
| 36 | `/v1/vscode/{token}/combos` | GET | 400 ms | 800 ms | |
| 37 | `/v1/vscode/{token}/responses` | POST | 3.5 s | 5.0 s | |
| 38 | `/api/settings/*` (GET) | GET | 600 ms | 1.2 s | |
| 39 | `/api/settings/*` (POST/PATCH/DELETE) | POST/PATCH/DELETE | 1.0 s | 2.0 s | |
| 40 | `/api/keys/*` (CRUD) | CRUD | 800 ms | 1.5 s | |
| 41 | `/api/quota/*` (CRUD) | CRUD | 800 ms | 1.5 s | |
| 42 | `/api/monitoring/health` (heavy) | GET | 3.0 s | 5.0 s | |
| 43 | `/api/health/ping` | GET | 50 ms | 100 ms | |
| 44 | `/api/system/version` | GET | 50 ms | 100 ms | |

---

## 3. CI Enforcement

### 3.1 Workflow

The `.github/workflows/latency-budget.yml` workflow enforces these budgets on every PR:

- **Trigger:** `pull_request` (all PRs)
- **Job 1 — `budget-check`:** Runs `tools/latency-budget-to-ci/budget.py` against a YAML budget
  file (see §3.2) and a trace JSON collected during PR CI. Fails if any endpoint exceeds its
  hard cap; warns on soft-budget breach.
- **Job 2 — `regression-check`:** Compares current p99 against the baseline from `main`.
  Fails if any endpoint regresses >10% without an approved exception.

### 3.2 Budget YAML Format

```yaml
# budgets/rest-endpoints.yaml — consumed by tools/latency-budget-to-ci/budget.py
version: 1
spans:
  - name: "/v1/responses"
    method: POST
    threshold_ms: 3500
    hard_cap_ms: 5000
  - name: "/v1/responses/stream"
    method: POST
    threshold_ms: 1800
    hard_cap_ms: 3000
  - name: "/v1/embeddings"
    method: POST
    threshold_ms: 1400
    hard_cap_ms: 2500
  # ... (all 43 endpoints)
```

### 3.3 Trace Collection

Traces are collected by the CI runner using:

1. **otel-cli** or `curl` to the deployed PR preview's `/v1/*` endpoints
2. A synthetic test suite (`tests/e2e/latency-budgets.test.ts`) that hits all 43 endpoints
   and records `duration_ms` per span
3. The JSON trace is written to `.build/latency-trace.json`

### 3.4 Failure Modes

| Signal | Action |
|--------|--------|
| Endpoint > hard cap | ❌ PR blocked, `::error` annotation on the failing line |
| Endpoint > budget p99 (but under hard cap) | ⚠️ Warning annotation, PR not blocked |
| Endpoint > 10% regression from main | ❌ PR blocked unless label `latency-exception` applied |
| Missing endpoint from trace | ⚠️ Warning (may be a new endpoint without a baseline) |

---

## 4. Budget Derivation

Budgets in §2 are derived from:

- **p99:** Observed p99 at 3-replica 500 RPS (from `docs/PERF_BUDGETS.md` §2)
- **Hard cap:** p99 × 1.5 (rounded up), never exceeding the infrastructure timeout
  for that endpoint (10s for `/v1/web/fetch`, 30s for audio gen, etc.)

Re-evaluation cadence: quarterly, or on any major infra change. Locked by
`.github/workflows/latency-budget.yml` — any change to budgets requires updating
both this doc and the workflow YAML in the same PR.

---

## 5. Review Log

| Date | Reviewer | Change |
|------|----------|--------|
| 2026-06-25 | @KooshaPari/core (v29-T1) | Initial 44-endpoint budget table extracted from `PERF_BUDGETS.md` with hard-cap columns + CI enforcement spec |
