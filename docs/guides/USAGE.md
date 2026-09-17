# Using the harness — endpoint syntax

The fork serves everything under `/v1/*` (rewritten internally to
`/api/v1/*` — both forms work). The examples use the brain's default
`http://localhost:20128`. Every endpoint takes the gateway's normal auth
(Bearer key) and honors per-key policies.

The one rule that shapes everything: **callers name capabilities, never
model ids.** Models are ranked, picked, failed over, and re-picked by the
harness.

---

## 1. Direct conversation — `model: "auto"`

The brain's config.yaml default. A bare `model: "auto"` on the normal
chat endpoint classifies the conversation and routes it to the right
capability alias in-pipeline:

```bash
curl -s http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -d '{"model": "auto",
       "messages": [{"role": "user", "content": "refactor this failing test"}]}'
# → routed as a `code` request; the response is a normal chat completion.
```

Capability aliases also work directly as model ids — with optional budget
tiers:

| model id | meaning |
|---|---|
| `code`, `chat`, `vision`, `reasoning`, `math`, `research`, `plan`, `search` | best current specialists for that capability (axis-ranked) |
| `code:best`, `chat:best`, … | top-3 quality tier |
| `code:cheap`, `chat:cheap`, … | fast/cheap tier (flash/mini-class models) |
| `hermes/fast` | `chat:cheap` (stable client pin) |
| `hermes/smart` | `chat:best` |
| `hermes/code`, `hermes/vision`, … | capability equivalents of the namespace |

## 2. One-shot delegation — `POST /v1/orchestrate/quick`

Single synchronous task, guide-shaped answer. Everything the worker
needs must be in `prompt` (workers do not see the caller's conversation).

```bash
curl -s http://localhost:20128/v1/orchestrate/quick \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -H "Idempotency-Key: 8f14e45f-ea1b-4c3f-9d2a-77b6f1c2e3d4" \
  -d '{"tag": "vision",
       "prompt": "describe this image",
       "images": ["data:image/png;base64,..."],
       "policy": {"budget": "any"}}'
```

- `tag` — capability vocabulary (see §3).
- `policy.budget` — `any` (default) | `best` | `cheap`.
- `policy.retry_503_after_ms` — 0–120000, default 0. Guide 2's "on 503,
  retry once after 20s" made fork-side: when the tag's candidates
  exhaust, wait and retry ONCE before the honest 503.

Responses:

```json
{"ok": true, "model": "openai/gpt-5.6", "provider": "openai",
 "text": "…", "latency_ms": 812, "score": 0.91, "decision": {…},
 "retried": true}                                        // 200 (retried only when a retry happened)

{"ok": false, "error": "no_active_models", "tag": "vision", "retried": true}   // 503
```

`Idempotency-Key` replays return the original result without
re-executing (native pipeline semantics, forwarded by /quick).

## 3. Decomposition — `POST /v1/orchestrate/plan`

Submit a plan of tagged, dependency-ordered tasks; returns 202
immediately and executes as parallel waves in the background.

```bash
curl -s http://localhost:20128/v1/orchestrate/plan \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -H "Idempotency-Key: 3d1c…" \
  -d '{
    "goal": "4-page comic about Ravi",
    "mode": "swarm",
    "tasks": [
      {"id": "script", "tag": "chat",   "prompt": "write the script",        "depends_on": []},
      {"id": "art",    "tag": "image_gen", "prompt": "draw page 1",          "depends_on": ["script"]},
      {"id": "refs",   "tag": "research", "modality": "search",
       "prompt": "find reference art styles for Indian webcomics",           "depends_on": []}
    ],
    "blackboard": {"canon": "hero=Ravi, red scarf", "_locked": ["canon"]},
    "policy": {"routing": "assigned", "max_total_tokens": 150000,
               "compress_context": true}
  }'
# → 202 {"ok": true, "job_id": "job_m1x…", "status": "active", "accepted": 3}
```

**Tag vocabulary** (what the harness knows how to rank):
`code` · `research` · `math` · `reasoning` · `plan` · `vision` ·
`search` · `chat` · `image_gen` · `audio_speech` · `music_gen` ·
`video_gen`

**Modality** (B7) — which endpoint family executes the task:
`text` (default) · `image` · `search` · `speech` · `music` · `video`.
Media tags imply theirs (`image_gen`→image, `audio_speech`→speech,
`music_gen`→music, `video_gen`→video). `modality: "search"` on any chat
tag dispatches literally to `/v1/search` (web search, no model). Media
results land on the task row as JSON envelopes
(`{images|search|speech|music|video: …}`).

**Policy fields:**

| field | range / values | default | notes |
|---|---|---|---|
| `budget` | any \| best \| cheap | any | quality tier |
| `max_attempts` | 1–5 | 3 | per-task retries |
| `max_concurrency` | 1–16 | 8 | wave parallelism |
| `deadline_s` | 1–86400 | 600 | partials stay visible on breach |
| `task_timeout_ms` | 1000–600000 | 120000 | per dispatch |
| `routing` | alias \| assigned | alias | assigned = allocator water-filling (B5) |
| `max_per_provider` | 1–16 | 3 | assigned routing, provider spread |
| `max_total_tokens` | 0–1e9 | 0 | 0 = unlimited; on breach unstarted tasks abort, job fails `budget_exhausted` (B6) |
| `judge` | bool | true | swarm mode: run the judge loop |
| `max_rounds` | 1–5 | 3 | judge refinement cap, then flaws are accepted |
| `compress_context` | bool | false | Caveman compression of the swarm shared context before fan-out (B8) |

## 4. Polling — `GET /v1/orchestrate/jobs/{id}?wait=30`

`?wait=` long-polls (500 ms ticks, capped at 60 s). The job shape:

```json
{
  "job_id": "job_m1x…", "status": "done", "goal": "…", "mode": "swarm",
  "failure_reason": null, "judge_rounds": 1,
  "blackboard": {"canon": "…", "summaries": {"script": "…"}, "mailbox": {}},
  "usage": {"prompt_tokens": 12040, "completion_tokens": 3311,
            "total_tokens": 15351, "budget_tokens": 150000},
  "waves": [{"n": 1, "tasks": ["script", "refs"]}, {"n": 2, "tasks": ["art"]}],
  "tasks": [
    {"id": "art", "tag": "image_gen", "modality": "image", "state": "done",
     "depends_on": ["script"], "model": "openai/gpt-image-2", "provider": "openai",
     "wave": 2, "attempts": 1, "latency_ms": 8420,
     "prompt_tokens": 24, "completion_tokens": null,
     "verdict": "pass", "error": null,
     "result": "{\"images\": […]}"}
  ],
  "log": [ /* last 100 audit events: task_start, task_done, task_requeued,
              task_assigned, assign_fallback_alias, lease_expired,
              context_compressed, task_budget_aborted, job_budget_exhausted,
              blackboard_append, mailbox_relayed, mailbox_skipped,
              judge_start, judge_verdicts, model_drift_penalty, job_done … */ ]
}
```

`status`: `active` → `judging` (swarm) → `done` | `failed`.
`failure_reason`: `deadline` | `blocked` | `budget_exhausted` —
in every case completed work stays visible; nothing is fabricated.

## 5. Classify / forced-route — `POST /v1/harness/task`

The single-call Layer 3 endpoint (classify + route + execute):

```bash
curl -s "http://localhost:20128/v1/harness/task" \
  -H "Authorization: Bearer $KEY" -H "Content-Type: application/json" \
  -d '{"model": "auto", "messages": [...], "tools": [...]}'

# variants:
#   ?alias=code           forced route, no classification
#   ?classify_only=true   decision only, no execution
#   ?tier=auto            complexity picks the budget (fast→cheap, deep→best)
```

## 6. Allocator query — `GET /v1/models/best?task=code&limit=6`

The ranking the harness itself uses, as a read-only query
(`?task=` classifier vocabulary or `?category=` raw + optional
`?axis=`, `?minBenchmark=`).

## 7. Liveness canaries — `GET /v1/models/canaries`, `POST /v1/models/canaries/check`

```bash
# snapshot: per-model {alive, lastCheckAt, latencyMs, consecutiveFailures,
# lastError}, config, and the current dead list rankings skip
curl -s http://localhost:20128/v1/models/canaries -H "Authorization: Bearer $KEY"

# run one probe round now (reachability: any HTTP answer = alive;
# ?limit=12 rotates provider coverage)
curl -X POST "http://localhost:20128/v1/models/canaries/check?limit=12" \
  -H "Authorization: Bearer $KEY"
```

## 8. Trace headers

Every orchestrator-originated upstream call carries
`X-OmniRoute-Job`, `X-OmniRoute-Task`, `X-OmniRoute-Wave` (and
`X-Harness-Route` on /harness/task) — admin logs can explain every
sub-call; user replies never name models, routes, or providers.

## 9. Task states & failure semantics (recap)

- Task: `queued → running → done | failed`; failures under
  `max_attempts` requeue; at the cap the task fails and the job
  CONTINUES (a job may succeed with failed tasks — the response's
  `failure_reason` says how many).
- A task is READY when every `depends_on` is `done`; failed deps BLOCK
  dependents (job fails `blocked` with reasons on each task).
- `deadline_s` breach: remaining tasks stay queued, job fails
  `deadline`, completed work visible.
- `max_total_tokens` breach: unstarted tasks abort
  (`task_budget_aborted`), in-flight dispatches finish, job fails
  `budget_exhausted`.

## 10. Objectives — `POST /v1/orchestrate/objectives` (B10)

The agent surface (OpenResearch adaptation): name an **objective**, not a
plan. Subtasks optional (absent → the objective is the single task);
per-task `tag` optional (inferred from each prompt, logged `tag_inferred`);
`caller_model` optional (the calling agent naming itself).

```json
{
  "objective": "Build and verify a JWT auth module",
  "subtasks": [
    { "prompt": "Write the token issuer in typescript" },
    { "prompt": "Write the integration tests", "depends_on": ["t1"] }
  ],
  "caller_model": "gpt-4o",
  "policy": { "scheduling": "stream", "max_rounds": 3 }
}
```

→ `202 {ok, job_id, status:"active", accepted, inferred_tags, caller_model,
bias_guard, scheduling}` — same runner, store, and semantics as `/plan`.

**Bias guard — lenient** (active when `caller_model` is set and
`policy.bias_guard` isn't false): sub-agent and judge dispatches avoid the
caller's own model only on **near-ties** — when the best alternative's
quality is within `policy.bias_tolerance` (0–1, default 0.85) of the
caller candidate's. Inside that band, alias routing pins the best
alternative (logged `bias_avoided`) and assigned routing scores the
caller's model ×0.8. Outside the band, benchmark merit wins and the task
is flagged `bias_same_model: true` in the job view — visible, never
silent, never forced onto a worse model. `bias_tolerance: 0` = the B10
strict behavior (always avoid); `1` = avoid only when the alternative is
at least as good.

## 11. Per-completion loop — `wait-first`, refill, spawn (B10)

The OpenResearch auto-research loop shape, on our job model:

```bash
# wake on the FIRST task completion since call start (not a barrier):
curl "http://localhost:20128/v1/orchestrate/jobs/$JOB/wait-first?timeout=30"
# → {…full job view…, completed_since: ["t2"], drained: false}
# The wake is a signal, NOT the source of truth: re-read the full task
# list every wake; a task finished while you analyzed the last one won't
# appear in the next completed_since. drained:true = stop.

# refill the freed slot while the job runs:
curl -X POST "http://localhost:20128/v1/orchestrate/jobs/$JOB/tasks" \
  -d '{"tasks": [{"prompt": "Now benchmark the winner", "depends_on": ["t1"]}]}'
# → 202 {appended, inferred_tags}; 409 job_terminal when the job ended.

# delegate a SELF-CONTAINED helper job (no nesting, in-flight cap):
curl -X POST "http://localhost:20128/v1/orchestrate/spawn" \
  -d '{"parent_job_id": "'"$JOB"'", "brief": "Survey X, read-only, output 10 lines"}'
# → 202 {job_id, parent_job_id, in_flight, cap}
#   409 spawn_nesting (helpers can't spawn) · 429 spawn_cap (max_children)

# wake when ANY of several jobs completes (the exp-wait --project analog):
curl "http://localhost:20128/v1/orchestrate/wait?job_ids=$A,$B&timeout=30"
# → {woken: "$B", job: {…}, states: {$A: "active", $B: "done"}, drained: false}
```

**`policy.scheduling`**: `wave` (default — B3 barriers, unchanged) or
`stream` (per-completion admission: the moment any task finishes, the next
ready task starts in the freed slot; `task.wave` carries the dispatch
ordinal; swarm blackboard merges land per completion, not per wave).

New policy fields: `scheduling` (wave|stream), `bias_guard` (bool, default
true), `bias_tolerance` (0–1, default 0.85), `max_children` (2–16, default
4). Job view adds `caller_model`, `parent_job_id`, per-task
`bias_same_model`. Stream scheduling honors `routing: "assigned"` with
run-scoped model diversity — parallel tasks never call the same model
twice while alternatives remain (wave mode keeps per-wave diversity).

**Companion guides**: `docs/guides/AGENT_TOOL_GUIDE.md` (the agent-facing
skill — the whole tool surface + loop discipline) and
`docs/guides/SETUP_HERMES.md` (user setup: providers → one key → point
Hermes at the endpoint).

## 12. Embedding-classified routing — the classifier's stage 1.5 (B14)

When the free keyword heuristics are UNSURE (low confidence — the vague
"hey so about that thing" case), the classifier refines cheapest-first:

```
stage 1   heuristics   free, ~0ms, always runs (body shape is authoritative)
stage 1.5 embeddings   one provider /v1/embeddings call (B14, default ON)
                       — the text is matched against per-task-type EXEMPLAR
                       CENTROIDS (7 types × 7 exemplars); a verdict needs
                       BOTH similarity ≥ 0.3 AND margin ≥ 0.03 over the
                       runner-up, else the heuristic default stands
stage 2   model        opt-in (useModel), one cheap generative call
```

Every stage degrades downward, never errors. Costs stay tiny: centroids
are cached per embedding model (6h), request-text vectors get an LRU
(repeated classifications cost zero calls), and the whole stage is bounded
at 2500ms. No model naming required — the first configured embedding model
is used (pin with `embeddingModel` / `embedding_model`; opt out with
`useEmbeddings: false` / `use_embeddings=false`).

Surfaces: `POST /v1/harness/classify` (result `stage: "embeddings"` tells
you which stage answered) and `GET/POST /v1/router/candidates` (the
`task.type` behind the advisory profile may now come from embeddings).
`/quick` and `/plan` intentionally stay stage-1-only — latency paths.

## 13. Decision layer on the router (B15): threshold, matrix, cache, failure memory

The candidates response now carries the whole decision kit:

- **`delegation`** — the anti-inflation gate, pure code (no LLM):
  `specialist advantage < threshold (default 5 pts) → self; ≥ → delegate`.
  91-vs-93 → self (not worth a round-trip); 72-vs-96 → delegate. Filtered
  callers get `delegate` (a fact); unregistered/no-caller get `consider`.
  Override the threshold with `delegation_threshold` (points). Advisory —
  Hermes stays sovereign.
- **`matrix`** — the compact representation: every candidate in ONE line
  (`P1 a/qwen-vl  vision 94 | hist 92% | p50 — | $0.40/M`), tier-marked,
  the caller tagged `←you`. A few hundred tokens for the whole field; the
  full `candidates` array remains for digging in.
- **`cache`** — `task_signature → preferred model` with outcome memory.
  A hit means "known task — you may take this model without re-reasoning";
  `success_rate` is the signature's observed history. Reputation failures
  on the cached model drop the entry (the next consultation routes
  fully); infra failures are recorded but kept. The runner feeds outcomes
  back automatically (every orchestrate task completion).
- **Failure memory** — timeouts, provider outages, context overflows,
  malformed requests, and budget sweeps are counted as `infraFailures`
  and EXCUSED from reputation. Reliability, historical success, and
  allocator health score reputation failures only: "a provider outage
  never reads as 'Qwen is bad at OCR'." Bare failures (no infra evidence)
  still count — the closed loop stays honest.

## 15. Execution routing — `GET/POST /v1/router/execution` + `POST /v1/route` (B16)

Three registries, never mixed: **models** (capability evidence, unified
score), **tools** (execution environments — camofox, openwork, native
web_search), **agents** (model + tools + capabilities — the escalation
path). Hermes asks "who/what can accomplish web research?":

```bash
curl -s -X POST "http://localhost:20128/v1/router/execution" \
  -H "Authorization: Bearer $KEY" -H 'Content-Type: application/json' \
  -d '{"prompt": "research 15 competing projects and verify claims against primary sources", "parallelizable": true}'
```

→ `{analysis: {requires_fresh_information, duration_estimate,
parallelizable, …}, decision: {path: tool|agent|model, tool?, agent?,
reason, ladder}, tools: […], agents: [… with workflow evidence],
models: {primary, secondary, fallback, matrix}, workflow_memory: […],
rule}`. The ladder is pure code: fresh info + short/direct → **Level-0
tool** (browse yourself, no model delegation); long/parallelizable/
multi-step → **agent escalation**; otherwise model routing. Tools marked
`execution: "client"` run in YOUR runtime (bot mode) — OmniRoute advises,
never executes them. Web quality is measured as WORKFLOW outcomes
(sources found/verified, synthesis quality, latency) per
(workflow, model, tools) — not model benchmarks.

The compact fast API (routing guide §10):

```bash
curl -s -X POST "http://localhost:20128/v1/route" \
  -H "Authorization: Bearer $KEY" -H 'Content-Type: application/json' \
  -d '{"task": "read this screenshot and explain the UI problem", "modalities": ["image"]}'
# → {primary, secondary: […], fallback: […], confidence, task}   (?evidence=true adds the matrix)
```

**B16.2 — the spawn plan (bodies for brains).** When the ladder escalates
to AGENT, the same call returns a `spawn_plan`: an embodiment blueprint
mapped 1:1 to native Bot Mode (a body IS a Hermes profile — create with
`hermes profile create`, brain pinned via New Agent → Advanced → Model &
provider pin, missions via Bot Chat handoffs, group rooms 2–6 bots /
≤3 rounds, sustained work via `[bot:<name>]` cron routines):

```bash
curl -s -X POST "http://localhost:20128/v1/router/execution" \
  -H "Authorization: Bearer $KEY" -H 'Content-Type: application/json' \
  -d '{"prompt": "survey 15 competing agent harnesses and verify routing claims", "parallelizable": true}' \
  | jq .spawn_plan
```

→ `{advisory, blueprint: "hermes-bot-mode", body_count, bodies: [{name,
role, wave, model, tools, memory_bank, mission}], waves: [fan-out
parallel → synthesis], coordination: {mode: group_room|inbox_handoffs,
native_caps}, embodiment: {native commands}, report: {outcome_callback}}`.
Parallelizable → one fan-out wave + a judge wave; sequential → ordered
single-body waves with inbox handoffs. Judge gets the primary model;
workers spread across the tiered pool so one provider can't sink the
room. A runnable recipe lives at `examples/hermes-embodiment/` (create →
dispatch → report; dry-run by default). No spawn_plan on tool/model
paths — a body is justified by task shape, never by default.

**B16.1 — the Hermes outcome callback.** Your Bots execute client-side, so
their runs never cross the fork's closed loop. They close it themselves —
the Hermes integration guide §17/§22.4 structured outcome callback:

```bash
curl -s -X POST "http://localhost:20128/v1/router/outcomes" \
  -H "Authorization: Bearer $KEY" -H 'Content-Type: application/json' \
  -d '{"workflow": "web_research", "model": "sonnet-4.5", "tools": ["camofox"],
       "sources_found": 14, "sources_verified": 12, "quality_score": 0.91,
       "latency_ms": 38000, "success": true}'
# → 202 {ok, recorded, workflow, memory_size}

curl -s "http://localhost:20128/v1/router/outcomes?workflow=web_research" \
  -H "Authorization: Bearer $KEY"
# → {history: […aggregated WorkflowStat, best-evidence first]} — same evidence
#   /v1/router/execution surfaces for agents and workflow_memory
```

Numeric fields are optional but must be finite ≥ 0 (`quality_score` clamps
to 0..1); `success` optional boolean. Malformed payloads are rejected 400
with the reason — never silently recorded. Workflow memory, never model
benchmarks.

## 16. Layered capability router — `GET/POST /v1/router/candidates` (B12) + advisory profile & versioned registry (B13)

The pipeline, explicitly:

```
Task → Capability filter (hard elimination: modality, capability,
tool_calling, min_context — 100 → 17) → Ranking (capability_match ×
benchmark × historical_success × reliability / cost_penalty /
latency_penalty — 17 → 3) → PRIMARY / SECONDARY / FALLBACK tiers,
ALL candidates retained.
```

```bash
curl -s -X POST "http://localhost:20128/v1/router/candidates" \
  -H "Authorization: Bearer $KEY" -H 'Content-Type: application/json' \
  -d '{"prompt": "read the error from this screenshot", "modality": "image",
       "tool_calling": true, "caller_model": "gpt-4o"}'
```

→ `{advisory, guidance, registry: {version, refreshed_at,
runtime_stats_window}, profile: {domain, complexity, input,
specialist_advantage, best_available, self_estimate}, task: {type,
modality}, filter: {pool, eliminated, candidates}, tiers: {primary,
secondary, fallback}, candidates: [{id, provider, tier, rank, score,
score_breakdown, capabilities, specializations, benchmarks,
benchmark_provenance, operational, reliability, preferred_for}], self:
{rank, score, would_win, status}}`.

Four architectural rules (B13 adds the fourth):

- **Closed loop** — `historical_success` is EMPIRICAL per-(model × category)
  success from the jobs store (`aggregateModelStatsByCategory`, keyed
  `model|tag`), fed into the allocator's assigned-routing paths too. The
  router learns P(success | model, task) as work flows through it; the
  benchmark is only the prior.
- **Equal scoring** — `caller_model` is ranked by the IDENTICAL function:
  `would_win: true` means the caller legitimately won; `status:
  "filtered"|"unregistered"` says why it's absent. No self-bonus, no
  self-penalty. (Near-tie dispatch diversification remains B11's
  `bias_tolerance`.)
- **Full visibility** — every filtered candidate stays in the response with
  per-dimension metadata, so the brain can exercise contextual judgment
  ("Qwen-VL normally wins OCR, but this image is a UI screenshot and Model
  C has better UI understanding") while the tiers say what the
  deterministic router would try first.

Specializations start from benchmark axes (swe_tasks, coding, math,
hard_reasoning, knowledge, conversation, visual_reasoning) and grow via the
enrichment table (`buildModelDescriptors` opts: specializations +
cost_per_million_tokens per model).

**Advisory, not mandatory (B13)** — before self-executing, read the
`profile` block: `specialist_advantage` (high / medium / low / none /
incapable), `best_available` (top-3 with scores), `self_estimate`. The
router organizes candidates; the judgment stays with the caller. Three
kinds of information feed the score, cleanly separated:

- **Static facts** (embedded/registered): capabilities, context window,
  modalities, provider — refreshed at boot and on every rebuild.
- **Benchmark intelligence** (periodic refresh): public scores when they
  exist; `benchmark_provenance` per dimension marks `{public, internal,
  confidence}` so a model with no public score is ranked on OUR internal
  evidence (0–1, confidence from sample size: ≥50 high, ≥10 medium) instead
  of pretending all silence is equal. A missing benchmark NEVER zeroes a
  model — the unified-score chain falls back category → composite →
  internal empirical → neutral.
- **Runtime telemetry** (most valuable): per model × task-type — attempts,
  successful, success_rate, p50/p95 latency over a 30-day window
  (`finished_at` stamps on terminal transitions; NULL counts as in-window
  for pre-B13 rows).

**Versioned registry (B13)** — every response carries `registry:
{version: "YYYY.MM.DD", refreshed_at, runtime_stats_window: "30d"}` plus the
staleness `guidance`: benchmark data is a snapshot and may be stale —
prefer recent internal performance when available. The registry refreshes
on boot, self-heals when older than 6h (`ensureRegistryFresh` on the
candidates route), and `POST /v1/router/refresh` forces a rebuild now —
cron/worker friendly. A rebuild is a full re-derivation from the live
provider registry, so **deprecated models are deleted, never lingered**.
The registry is LOCAL at routing-decision time — no external calls mid-
decision, which matters for local/on-device federation.
