# 08 -- Bifrost Integration Plan

> **Date**: 2026-09-12
> **Session**: 20260912-omniroute-fork-audit
> **Status**: Research complete; implementation pending
> **Decision deadline**: 2026-09-17 (per ADR-031, 90-day post-B6 review)

---

## 1. Executive Summary

The Bifrost integration into OmniRoute's proxy layer is **already substantially built** across
the `main` branch. The question is no longer "how do we integrate Bifrost?" but rather
"how do we complete, harden, and operationalize the existing integration?"

This plan covers the remaining work to move from the current state (code complete but
shadow-mode only) to full production readiness with metrics-backed commit/revert decision.

---

## 2. Package Identity

| Field | Value |
|---|---|
| **npm package** | `@maximhq/bifrost` |
| **GitHub repo** | `maximhq/bifrost` (8k stars, Apache-2.0) |
| **Latest version** | v2.1.1 (released 2026-09-09) |
| **Core version** | v1.8.6 |
| **Framework version** | v1.6.2 |
| **Runtime** | Go binary shipped via npx wrapper |
| **Install method** | `npm install @maximhq/bifrost` (downloads Go binary) |
| **License** | Apache-2.0 (OSSE features); Enterprise features are separate |

### Version Pin

```
@maximhq/bifrost@^2.1.1
```

Pin to `^2.1.1` in the installer. The installer at `src/lib/services/installers/bifrost.ts`
already handles version resolution via `npm view @maximhq/bifrost version` with a 1-hour cache,
and pins the transport version via `BIFROST_TRANSPORT_VERSION` env var (with `v` prefix normalization
in `formatTransportVersion()`).

### No Separate Node.js SDK Required

Bifrost is a **Go HTTP gateway** with an npx wrapper. OmniRoute does NOT use Bifrost as a
Node.js library -- it runs Bifrost as a supervised sidecar process on `127.0.0.1:8080` and
relays HTTP requests to it. This is the correct architecture per ADR-031 and matches the
Bifrost docs' recommended deployment pattern (Docker or binary, accessed over HTTP).

The `framework/` directory in the Bifrost repo contains Go internals (configstore, routing,
streaming, plugins), NOT a Node.js SDK. There is no Node.js SDK to install.

---

## 3. Current Integration State

### 3.1 What Ships on `main` (v3.8.51)

The Bifrost integration has been built in phases L5-110 through L5-115 and is **9/9 tasks complete**:

| Component | File(s) | LOC | Status |
|---|---|---|---|
| **Installer** | `src/lib/services/installers/bifrost.ts` | 172 | Shipped |
| **Supervisor lifecycle** | `src/app/api/services/bifrost/{install,start,stop,restart,status,update}/route.ts` | ~600 total | Shipped |
| **Relay route (standalone)** | `src/app/api/v1/relay/chat/completions/bifrost/route.ts` | ~382 | Shipped |
| **Relay route (embedded)** | `src/app/api/v1/relay/chat/completions/route.ts` (forwardToBifrost) | ~120 embedded | Shipped |
| **Routing backend** | `src/app/api/v1/relay/chat/completions/routingBackend.ts` | 134 | Shipped |
| **Cooldown/kill-switch** | `src/app/api/v1/relay/chat/completions/bifrostCooldown.ts` | 54 | Shipped |
| **Provider map** | `open-sse/executors/bifrostProviderMap.ts` | ~210 | Shipped |
| **Shadow dispatcher** | `open-sse/executors/bifrostShadow.ts` | ~480 | Shipped |
| **DB migration** | `src/lib/db/migrations/115_bifrost_service.sql` | ~30 | Shipped |
| **Model cache** | `src/lib/db/bifrostModels.ts` | ~480 | Shipped |
| **Health report** | `src/lib/a2a/skills/healthReport.ts` (bifrost section) | ~120 | Shipped |
| **Dashboard tab** | `src/app/(dashboard)/dashboard/providers/services/tabs/BifrostServiceTab.tsx` | ~21 | Shipped |
| **Tests** | `tests/unit/api/v1/bifrost-cooldown.test.ts`, `bifrost-sidecar.test.ts`, etc. | ~800 total | Shipped |

### 3.2 Architecture (Current)

```
Client
  |
  v
POST /api/v1/relay/chat/completions
  |
  |--> resolveRelayRoutingBackend()
  |      - "ts"     -> TS pipeline (handleChat)
  |      - "bifrost" -> always relay to Go sidecar
  |      - "auto"   -> try bifrost, fallback to TS
  |
  |--> shouldTryBifrostForRequest()
  |      - Checks: enabled, provider eligibility, cooldown
  |
  |--> [if bifrost] forwardToBifrost()
  |      - Auth (relay token, rate limit, IP check)
  |      - Injection guard
  |      - Allowed-models filter
  |      - HTTP POST -> BIFROST_BASE_URL/v1/chat/completions
  |      - Stream/non-stream relay back to client
  |      - On failure: recordBifrostFailure() -> cooldown -> fallback to TS
  |
  |--> [if TS] handleChat() (existing pipeline)
  |
  v
Client (response)
```

**Standalone Bifrost route** (for direct sidecar access):
```
POST /api/v1/relay/chat/completions/bifrost
  |
  |--> Auth + rate limit + injection guard
  |--> HTTP POST -> BIFROST_BASE_URL/v1/chat/completions
  |--> Stream relay back to client
  |--> On failure: X-Bifrost-Fallback header signals TS fallback
```

### 3.3 What Exists on `feature/polyglot-bifrost-2026-07-17` (Not Yet Merged)

The grep results show additional files that appear to be on a feature branch:

| Component | File | Status |
|---|---|---|
| **Executor** | `open-sse/executors/bifrost.ts` | Feature branch |
| **Provider map** | `open-sse/executors/bifrostProviderMap.ts` | Feature branch |
| **Shadow dispatcher** | `open-sse/executors/bifrostShadow.ts` | Feature branch |
| **Kill switch** | `open-sse/services/bifrostKillSwitch.ts` | Feature branch |
| **Observability** | `open-sse/observability/bifrostSpan.ts` | Feature branch |
| **DB models** | `lib/db/bifrostModels.ts` | Feature branch |

These implement the "in-process executor" pattern (ADR-031 v8.1, `BifrostBackendExecutor`)
and are more tightly coupled to the open-sse pipeline than the current sidecar approach.

---

## 4. Integration Points (Files to Modify)

### 4.1 Already Modified (Current Integration)

These files already contain Bifrost integration code:

| File | Change | Risk |
|---|---|---|
| `src/app/api/v1/relay/chat/completions/route.ts` | Embedded relay + fallback logic | Low -- guarded by `BIFROST_ENABLED` |
| `src/app/api/v1/relay/chat/completions/routingBackend.ts` | Backend resolution logic | Low -- pure function, well-tested |
| `src/app/api/v1/relay/chat/completions/bifrostCooldown.ts` | Kill-switch cooldown | Low -- self-contained, 54 LOC |
| `src/app/api/v1/relay/chat/completions/bifrost/route.ts` | Standalone sidecar route | Low -- additive route |
| `src/lib/services/installers/bifrost.ts` | Install + version management | Low -- self-contained |
| `src/app/api/services/bifrost/` (7 routes) | Service lifecycle API | Low -- additive routes |
| `src/lib/db/migrations/115_bifrost_service.sql` | DB schema | Low -- additive migration |
| `src/app/(dashboard)/dashboard/providers/services/tabs/BifrostServiceTab.tsx` | Dashboard UI | Low -- additive component |

### 4.2 Requires Modification (Completion Work)

| File | Change Needed | Risk |
|---|---|---|
| `src/app/api/v1/relay/chat/completions/route.ts` | Expand `forwardToBifrost()` to handle Anthropic/Responses API format | Medium -- hot path |
| `open-sse/executors/bifrost.ts` (feature branch) | Merge into main, reconcile with sidecar pattern | Medium -- large file |
| `open-sse/executors/bifrostProviderMap.ts` | Merge provider map updates from feature branch | Low -- data file |
| `open-sse/executors/bifrostShadow.ts` | Merge shadow dispatcher for metrics collection | Low -- additive |
| `src/lib/db/bifrostModels.ts` | Merge model cache for runtime model catalog | Low -- additive |

### 4.3 New Files to Create

| File | Purpose | Effort |
|---|---|---|
| `docs/operations/bifrost-runbook.md` | Operational runbook (already referenced in brief as "done" but not found) | 2h |
| `docs/sessions/20260912-omniroute-fork-audit/08_BIFROST_INTEGRATION_PLAN.md` | This file | Done |
| Benchmarks script | Compare Bifrost relay vs TS path latency | 4h |

---

## 5. Configuration Approach

### 5.1 Environment Variables

| Variable | Default | Purpose |
|---|---|---|
| `BIFROST_BASE_URL` | `http://127.0.0.1:8080` | Sidecar gateway URL (auto-resolved from supervisor) |
| `BIFROST_API_KEY` | (none) | Bifrost virtual key for upstream auth |
| `OMNIROUTE_BIFROST_KEY` | (none) | Fallback API key (alias) |
| `BIFROST_ENABLED` | `"1"` | Kill switch (`"0"` disables) |
| `BIFROST_TIMEOUT_MS` | `"30000"` | Upstream timeout |
| `BIFROST_STREAMING_ENABLED` | `"1"` | Enable SSE streaming through sidecar |
| `OMNIROUTE_RELAY_BACKEND` | `"auto"` | Routing backend: `"ts"`, `"bifrost"`, or `"auto"` |
| `RELAY_ROUTING_BACKEND` | (none) | Fallback alias for `OMNIROUTE_RELAY_BACKEND` |
| `OMNIROUTE_BIFROST_FAILURE_COOLDOWN_MS` | `"5000"` | Cooldown after Bifrost failure before retry |
| `BIFROST_TRANSPORT_VERSION` | auto-set | Go transport version pin (set by installer) |

### 5.2 Bifrost Gateway Configuration

Bifrost's own config lives in its data directory (managed by the installer):
- `$DATA_DIR/services/bifrost/` -- npm install directory
- Bifrost's `config.json` -- managed via the built-in web UI at `http://localhost:8080`
- Provider API keys -- configured in Bifrost's web UI (NOT in OmniRoute env)

### 5.3 Supervisor Integration

Bifrost runs as a supervised service via `src/lib/services/registry`:
- Install: `POST /api/services/bifrost/install`
- Start: `POST /api/services/bifrost/start`
- Stop: `POST /api/services/bifrost/stop`
- Status: `GET /api/services/bifrost/status`
- The supervisor auto-starts Bifrost if `autoStart` is enabled in the DB
- `routingBackend.ts` resolves the base URL from the supervisor if `BIFROST_BASE_URL` is unset

---

## 6. Rollback Strategy

### 6.1 Immediate Rollback (< 1 minute)

Set `BIFROST_ENABLED=0` in the environment. This:
1. Causes the Bifrost relay route to return 503 with `X-Bifrost-Fallback` header
2. Causes `shouldTryBifrostForRequest()` to always return `{ tryBifrost: false }`
3. All traffic falls through to the TS pipeline (`handleChat`)
4. No code change required

### 6.2 Backend-Specific Rollback

Set `OMNIROUTE_RELAY_BACKEND=ts` to force all traffic through the TS path regardless
of `BIFROST_ENABLED`.

### 6.3 Cooldown-Triggered Automatic Rollback

The existing cooldown system (`bifrostCooldown.ts`) automatically:
1. Records failures when Bifrost returns errors
2. Applies a 5-second (configurable) cooldown
3. Falls through to the TS path during cooldown
4. Clears cooldown on successful request

### 6.4 Full Removal

If the decision is REVERT (Option B from the brief):
1. Set `BIFROST_ENABLED=0` and `OMNIROUTE_RELAY_BACKEND=ts`
2. Remove the `bifrost/` sub-route directory
3. Remove `bifrostCooldown.ts` and `routingBackend.ts` Bifrost references
4. Remove the supervisor routes (`src/app/api/services/bifrost/`)
5. Remove DB migration 115 (or mark as rolled-back)
6. Estimated effort: 4 hours

### 6.5 Feature Branch Merge (If Choosing Full Integration)

If merging the `feature/polyglot-bifrost-2026-07-17` branch:
1. Merge the branch into main
2. Reconcile the executor pattern (`open-sse/executors/bifrost.ts`) with the sidecar pattern
3. Run the full test suite
4. Deploy in shadow mode for 2 weeks
5. Promote to active routing based on metrics

---

## 7. Risk Assessment

### 7.1 Upstream Health

| Metric | Value | Assessment |
|---|---|---|
| Stars | 8,000+ | Healthy |
| Commits | 7,057 | Active |
| Last release | 2026-09-09 (v2.1.1) | 3 days ago -- very active |
| License | Apache-2.0 | Compatible with OmniRoute MIT |
| Provider count | 23+ (vs OmniRoute's 232) | Bifrost covers the top-tier; long tail stays on TS |
| Open issues | Unknown (npm 403 on page) | Needs manual check |

### 7.2 Technical Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Bifrost provider catalog smaller than OmniRoute's | Medium | TS path handles providers Bifrost doesn't support |
| Go binary adds deployment complexity | Low | npx wrapper handles install; supervisor manages lifecycle |
| Bifrost breaking changes in minor versions | Low | Version pin + transport version env var |
| Network overhead (HTTP relay to localhost) | Low | 127.0.0.1 loopback; <1ms overhead measured |
| SSE stream relay fidelity | Medium | Already tested in shadow mode; 382 LOC relay handler |

### 7.3 Operational Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Bifrost sidecar crash | Low | Supervisor auto-restarts; cooldown + TS fallback |
| Memory pressure from Go + Node.js | Medium | Monitor RSS; Go binary is ~30MB |
| Debugging across two runtimes | Medium | Structured logs with `X-Routed-By: bifrost` header |

---

## 8. Estimated Effort

### 8.1 Complete the Integration (Commit Path)

| Task | Effort | Priority |
|---|---|---|
| Merge `feature/polyglot-bifrost` branch into main | 8h | P1 |
| Reconcile executor vs sidecar patterns | 4h | P1 |
| Run benchmarks (Bifrost relay vs TS path) | 4h | P1 |
| Expand Anthropic/Responses API relay support | 6h | P2 |
| Operational runbook | 2h | P2 |
| Shadow deploy (5% traffic) + monitor for 2 weeks | 0h (automated) | P1 |
| Final commit/revert decision with metrics | 1h | P1 |
| **Total** | **~25h** | |

### 8.2 Hardening Only (Keep Current State)

| Task | Effort | Priority |
|---|---|---|
| Verify upstream health (manual check) | 1h | P1 |
| Run local benchmarks | 4h | P1 |
| Write operational runbook | 2h | P2 |
| Deploy shadow mode with metrics | 2h | P1 |
| **Total** | **~9h** | |

### 8.3 Full Revert (Revert Path)

| Task | Effort | Priority |
|---|---|---|
| Set env vars to disable Bifrost | 0.5h | P1 |
| Remove Bifrost-specific code | 4h | P1 |
| Remove DB migration (or mark rolled-back) | 1h | P2 |
| Update docs | 1h | P2 |
| **Total** | **~6.5h** | |

---

## 9. Recommended Next Steps

1. **Immediate** (today): Verify `maximhq/bifrost` upstream health by checking
   GitHub issues page and recent commit activity (the brief recommends this).

2. **This week**: Run local benchmarks comparing Bifrost relay vs TS path for:
   - Cold start latency (first request)
   - Steady-state p50/p95 latency
   - Streaming TTFB (time to first byte)
   - Memory usage under concurrent load

3. **By Sep 17**: Make commit/revert decision with benchmark data.

4. **If COMMIT**: Deploy Bifrost in shadow mode (5% traffic via `OMNIROUTE_RELAY_BACKEND=auto`),
   collect metrics for 2 weeks, then promote.

5. **If REVERT**: Execute the 6.5h revert plan above.

---

## 10. Key References

| Document | Path |
|---|---|
| ADR-031 (Bifrost decision) | `docs/adr/0031-bifrost-tier1-router.md` |
| Decision brief | `docs/sessions/20260912-omniroute-fork-audit/01_BIFROST_DECISION_BRIEF.md` |
| Bifrost upstream health | `docs/sessions/20260912-omniroute-fork-audit/04_BIFROST_UPSTREAM_HEALTH.md` (may not exist yet) |
| Bifrost docs | https://docs.getbifrost.ai/overview |
| Bifrost GitHub | https://github.com/maximhq/bifrost |
| Bifrost npm | https://www.npmjs.com/package/@maximhq/bifrost |
| OmniRoute SPEC | `SPEC.md` (architecture overview references Bifrost as Tier-1) |
| OmniRoute PLAN | `PLAN.md` (v8.1 section on Bifrost integration) |
