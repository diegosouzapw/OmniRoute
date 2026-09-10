---
title: "Admission lanes — two lane systems, what gates each, where each reports"
status: active
lastUpdated: 2026-08-10
---

# Admission lanes (#9654) — two lane systems, what gates each, where each reports

OmniRoute has **two** process-local lane systems with different scopes. They are
complementary; operators should know which one they are looking at.

## 1. Byte-level process-wide admission (`chatBodyAdmission.ts`)

- **Scope:** the buffered-body/heap path for `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses`, and the other chat-shaped routes. Guards
  against heap amplification from large coding-agent bodies (#4380).
- **One process-global controller, not per-key lanes (#10110).** Every API key
  (hashed) or `anonymous` session admits against the **same** shared budget —
  the hashed session id is used ONLY as a fairness scheduling key (round-robin
  dispatch across waiters), never as a capacity shard. A prior version of this
  doc described per-key lanes with independent capacity; that model was
  removed in #10110 because it let unauthenticated fake credentials multiply
  the process-wide bound.
- **Gate (#503-fanout): an auto-derived ingest BYTE budget, not a fixed request
  count.** The legacy `CHAT_MAX_HEAVY_IN_FLIGHT` request-count cap (default `1`
  before this fix) collapsed coding-agent fan-out (multiple subagents/CLIs,
  bodies routinely > 256 KB) to an effective concurrency of ~1, which 503'd
  under completely normal load. It now binds only when an operator explicitly
  sets `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`. Left unset, admission is instead
  gated by `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — a budget auto-derived from the
  process's real memory ceiling (`src/shared/middleware/admissionBudget.ts`):
  25% of the tighter of the V8 heap limit and any cgroup/container limit,
  divided by an 8x transient-amplification factor, clamped between 8 MiB and
  2 GiB. Explicit overrides use the same clamps. This scales itself from a
  512 MB container to a 32 GB desktop with no env tuning. A body that cannot
  fit within the effective budget fails immediately with `413 body_exceeds_budget`;
  only contention among individually serviceable bodies enters the bounded
  fairness queue. A live multi-signal resource-pressure tracker (V8 heap ratio,
  cgroup, PSI, OOM events — `open-sse/utils/resourcePressurePolicy.ts`) shortens
  the bounded wait under `high` pressure and sheds immediately with
  `503 resource_pressure` under `critical` pressure, before any bytes are even
  ingested.
- **Tuning:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — override for the auto-derived byte budget
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — legacy request-count cap, opt-in only
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — queue-wait before 503 (default 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — queued-bytes heap valve (default 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — deprecated
    no-ops since #10110 (accepted for config compatibility, ignored)
- **Reports:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — including
  the #503-fanout additions `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, and `countCapEnabled`
  (false on a default deployment — confirms the byte budget, not the legacy
  count cap, is what is actually binding).

## 2. Adaptive runtime virtual lanes (`open-sse/services/admission`)

- **Scope:** tenant-key admission for provider dispatch — queue cost, latency-guided
  limit adaptation, lane queueing, and lane metrics.
- **Gate:** **opt-in.** Disabled unless `OMNIROUTE_CHAT_VIRTUAL_LANES=true`. Without it,
  the adaptive controller keeps the shared queue behavior (criterion 1 of #9654 only
  holds once an operator enables lanes).
- **Tuning:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + adaptive config (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **Reports:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (opaque lane IDs, never raw
  keys), and `virtualLanes` — the authoritative "lanes are on" flag in the snapshot.

## 3. Fan-out probes — per-target admission for combo/fusion (#9654 Wave 2)

Combo (priority / round-robin) and fusion fan out N model targets under one parent
request. Since #9654 Wave 2, **each fan-out target is gated before dispatch** by a
per-target probe (`PerTargetAdmissionHook`, built by `createPerTargetAdmissionHook`)
against the **parent's** tenant lane.

- **Scope:** every fan-out target dispatched by combo, fusion, and the chaos engine.
  System 1 (byte-level) is unaffected — it never probes fan-out targets.
- **Gate:** **opt-in with system 2.** A no-op when `OMNIROUTE_CHAT_VIRTUAL_LANES`
  is unset — the parent request already holds the shared-queue lease in that mode,
  so probing would double-count and reject combo targets.
- **Semantics:**
  - **Strictly non-blocking — skip, never queue.** `maxWaitMs 0`: a full lane
    skips the target and the combo's fallback machinery (or fusion's survivor
    panel) serves instead. This is deliberate: a fan-out target is redundant
    work, and queueing it piles more load onto the exact congestion lanes exist
    to stop. `defaultMaxWaitMs` therefore applies to the **parent request only**;
    fan-out probes never wait, and there is intentionally **no knob** to make
    them wait (issue history shows wait knobs produced the mass-502/504 class
    #9654 prevents — revisit only if an operator reports skipped fan-out targets
    hurting response quality).
  - **Release-on-admit.** An admitted probe releases its lease immediately: it is
    a capacity gate, not a hold. The parent's lease covers the fan-out; holding N
    more would inflate shared active cost and reject other tenants. Best-effort,
    not a reservation: the lane can refill between probe and dispatch, so under
    heavy contention the gate may admit into a lane that is full again by the
    time the target dispatches.
  - **Priced from the real fan-out body.** The probe estimates cost from the
    target's actual body — including the request class derived from its `stream`
    flag, exactly like the parent path — so fusion panel members (`stream: false`)
    are priced at the non-streaming class they will truly occupy, and priority/RR
    targets at whatever the user requested.
- **Reports:** a probe skip after the first target bumps combo's per-request
  `fallbackCount` (mirroring the existing fallback semantics; visible in combo
  logs); fusion returns 503 when every panel member is skipped. There is
  **no aggregate counter** (e.g. `virtualFanoutSkipped`) on the snapshot today —
  if an operator reports they cannot tell how often the lane gate skips fan-out
  targets, that is the trigger to add one.

## Which one is showing in a dashboard

- `adaptiveAdmission.laneCount` / `laneTenants` → **adaptive virtual lanes** (system 2).
- `adaptiveAdmission.virtualLanes === true` → the fan-out probes of section 3 are
  also active. A payload with `virtualLanes` missing or `false` means
  `OMNIROUTE_CHAT_VIRTUAL_LANES` is unset — the byte-level lanes (system 1) are
  still active, but nothing under `adaptiveAdmission` (and no fan-out gating) is
  in effect until it is enabled.

## Why both exist

The byte-level lanes bound the memory-heavy parse/compress path; the adaptive lanes
bound dispatch cost per tenant. #9654's criterion 1 ("one session's burst does not 503
another") is enforced by system 1 unconditionally and by system 2 once opt-in is enabled.

## 4. One-process long `/v1/responses` (healthy-headroom)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) added
`tryAcquireHealthyHeadroom` so a second structurally-heavy request is admitted
when the heap is below `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`. The BYTE
path used by `admitChatRequest` (bodies ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
default 256 KiB, including `POST /v1/responses`) uses the **same** escape.

This is the supported **one-process** recipe for more than two concurrent long
SSE `/v1/responses`: raise primary + healthy-headroom only as far as the heap
and the process-wide inflight-byte budget (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) allow. Tens of long SSE clients (40–50) is that memory-budget
question, not a hard “max 2” product limit. A pressured heap still sheds with
retryable `503` so #7849 does not return.

To **multiply heaps**, run N independent `DATA_DIR`s (#11024). Never
`replicas > 1` on one SQLite file (#10350). This section is not a reopen of
the DATA_DIR scale-out recipe.
