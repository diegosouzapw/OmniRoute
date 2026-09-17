# The Gateway Tool — an Agent's Guide (SKILL)

> **Load this before orchestrating sub-agents.** You (the calling agent —
> Hermes, or any brain) never pick models and never pick tags. You name
> work; the gateway picks models on category + benchmark scores + provider
> identity, keeps parallel calls on distinct models, and avoids routing
> your work back to your own model on near-ties. This guide is the whole
> tool surface.

---

## 0. The contract in one paragraph

One endpoint, every provider. Selection is the gateway's job: your task's
**category** (code, research, math, reasoning, plan, vision, search, chat,
image_gen, audio_speech, music_gen, video_gen) is inferred from the prompt
itself, **benchmark scores** rank the candidates, and **provider/model
identity** spreads parallel work (never the same model twice while
alternatives remain — that is what task tracking is for). You may pass a
tag to override the category when you know better; you may NEVER name a
model. If you run on a model yourself (`caller_model`), the gateway uses
it only as a **lenient** anti-bias signal: on a near-tie it routes the
sub-agent elsewhere; if your model is clearly the best by benchmark, it
wins on merit and the task is flagged `bias_same_model` — visible, never
hidden, never forced onto a worse model.

---

## 1. The tool surface

| Endpoint | Use it for |
|---|---|
| `POST /v1/orchestrate/objectives` | **Your default.** Submit an objective (with or without subtasks). Returns a job. |
| `POST /v1/orchestrate/quick` | One small synchronous task, answer in the response. |
| `GET /v1/orchestrate/jobs/{id}/wait-first?timeout=30` | Sleep until the FIRST task completes. Your loop tick. |
| `GET /v1/orchestrate/jobs/{id}?wait=30` | Full job view (the source of truth). |
| `POST /v1/orchestrate/jobs/{id}/tasks` | Refill: append tasks to a RUNNING job. |
| `POST /v1/orchestrate/spawn` | Delegate a self-contained task to a helper job. |
| `GET /v1/orchestrate/wait?job_ids=a,b&timeout=30` | Wake when ANY of several jobs completes. |
| `POST /v1/harness/classify` | Ask what the gateway would route a prompt as (debugging). |
| `GET/POST /v1/router/candidates` | **Self-assessment.** Who can serve this task — including YOU, ranked by the identical score — plus the advisory task `profile` (specialist advantage, best available, self estimate), `registry` version, and staleness `guidance`. |
| `POST /v1/router/refresh` | Force a registry refresh now (new models in, deprecated models deleted, version re-stamped). Cron/worker friendly. |
| `GET/POST /v1/router/execution` | **Who/what can accomplish this?** The three-registry surface: task depth analysis, the tool-vs-agent-vs-model ladder, workflow evidence.  On agent escalation also returns `spawn_plan` — the embodiment blueprint on native Bot Mode (bodies = Hermes profiles with pinned brains, waves, group-room/inbox coordination, outcome callback). Recipe: `examples/hermes-embodiment/`. |
| `POST /v1/router/outcomes` | **Hermes guide §22.4 structured outcome callback.** Bots execute client-side — their runs never cross the fork's closed loop — so they POST `{workflow, model?, tools?, sources_found?, sources_verified?, quality_score?, latency_ms?, success}` here and `GET ?workflow=` reads the history back. Workflow memory, never model benchmarks. |
| `POST /v1/route` | The compact fast API: `{task}` → `{primary, secondary, fallback, confidence}` (`?evidence=true` adds the matrix). |
| `GET /v1/models/best?task=code&limit=6` | See the ranked candidates for a category (never required). |

## 2. Submit an objective

```json
POST /v1/orchestrate/objectives
{
  "objective": "Build and verify a JWT auth module",
  "caller_model": "<the model YOU run on>",
  "subtasks": [
    { "prompt": "Write the token issuer in typescript" },
    { "prompt": "Write integration tests for the issuer", "depends_on": ["t1"] }
  ],
  "policy": { "scheduling": "stream", "max_rounds": 3 }
}
→ 202 { "job_id": "job_…", "inferred_tags": { "t1": "code" }, … }
```

Rules:
- **subtasks optional** — a bare objective runs as a single task. Decompose
  when the work genuinely parallelizes; don't manufacture a plan.
- **tags optional** — inferred from each prompt (`inferred_tags` in the
  response, `tag_inferred` in the log). Pass one only when the prompt's
  phrasing would mislead the inference (e.g. a code task written as prose).
- **caller_model** — name yourself. It enables the lenient bias guard and
  propagates to your spawned helpers.
- Policy you may set: `scheduling: "stream"` (per-completion; recommended
  for parallel work) or `"wave"` (barrier batches, default), `deadline_s`,
  `max_concurrency`, `max_total_tokens`, `max_rounds` (judge refinement
  cap), `bias_tolerance` (0–1, default 0.85 — how close two models must be
  before the guard diversifies away from your model; 0 = always avoid).

## 3. Drive the per-completion loop

```
loop:
  GET /v1/orchestrate/jobs/<jobId>/wait-first?timeout=30
  #   → wakes on the FIRST task completion since the call started.
  # The wake is a SIGNAL, not the source of truth:
  #   - re-read the FULL task list in the response every wake
  #   - act on every newly-terminal task (completed_since), not just the one
  #     that woke you — a task that finished while you analyzed the last
  #     one will NOT appear in the next completed_since
  # For each completed task: READ its result, then decide —
  #   - more work of this kind? POST /jobs/<id>/tasks to refill the slot
  #   - done? stop launching
  # re-issue wait-first each tick; exit when "drained": true
```

Do NOT tight-poll. Do NOT wait-for-all when you could act per completion —
under `stream` scheduling a freed slot refills the moment you append.

## 4. Delegate (spawn)

Spawn a helper for work with a **clean boundary** (surveying, write-ups,
independent exploration) — never for a step of the loop you're driving.

```json
POST /v1/orchestrate/spawn
{
  "parent_job_id": "job_…",
  "brief": "Survey the auth codebase and report the current token flow.
            Read-only: launch no runs. Output: a 10-line summary.",
  "caller_model": "<your model>"
}
→ 202 { "job_id": "job_…", "parent_job_id": "job_…", "in_flight": 1, "cap": 4 }
```

- The brief must be **self-contained**: the helper sees NOTHING of your
  conversation, tasks, or results — only the brief (plus any `context`
  object you copy in explicitly). Include constraints, allowed compute,
  expected output, definition of done.
- A helper **cannot spawn** (409 `spawn_nesting`). At most `max_children`
  helpers in flight (429 `spawn_cap`) — wait for one to finish.
- Wake on any helper: `GET /v1/orchestrate/wait?job_ids=a,b&timeout=30` →
  `{woken, job, states, drained}`. Same discipline: the states map is the
  source of truth; `drained: true` is your exit.

## 5. One small task (quick)

```json
POST /v1/orchestrate/quick
{ "tag": "search", "prompt": "current stable version of node?", "policy": { "budget": "cheap" } }
→ { "ok": true, "text": "…", "latency_ms": 812 }
```
Synchronous, one capability. Use for lookups and single questions — not
for anything you'll parallelize.

## 6. Failure semantics (never guess around these)

- Task states: `queued → running → done | failed`. A failed task under
  `max_attempts` requeues automatically — don't resubmit it.
- Job failures: `deadline` (time out — partial results remain readable),
  `blocked` (a dependency failed; the reasons are on each task),
  `budget_exhausted` (token budget hit; unstarted tasks aborted).
- A job may be `done` with failed tasks — `failure_reason` says how many.
  Read the task rows, not just the status.
- Unknown job id (404): the job is gone or expired — resubmit the work.

## 7. "Can I do it myself?" — the delegation decision tree

Before doing any task yourself, ask the registry — not your own confidence:

```
Can I do it?
  ├── trivial (one short reply, no lookup)        → do it
  ├── within capability but specialized           → compare external
  │     (router/candidates: your rank vs PRIMARY)    specialists
  ├── complex / long / parallelizable             → delegate / swarm
  └── outside capability (vision? OCR? media?)    → delegate, always
```

`POST /v1/router/candidates` with `caller_model` names yourself and returns
your rank under the SAME scoring function every other model is scored by —
`would_win: true` means doing it yourself is genuinely the best route;
`status: "filtered"` means you can't serve it at all. You also get
PRIMARY/SECONDARY/FALLBACK tiers with EVERY filtered candidate and its
dimensions (specializations, benchmarks, reliability, cost, latency), so
contextual judgment is yours: if the image is a UI screenshot, prefer the
model whose `ui_understanding` is high even when it's SECONDARY.

The routing engine knows whether a model is "better than you" — you don't
have to. Use it.

### Execution routing: tools vs agents vs models (B16)

Some needs aren't model needs at all. "Can browse" is an EXECUTION
capability, not a model capability — Camofox and OpenWork are tools, not
models, and they are never ranked against Qwen or DeepSeek. Ask
`/v1/router/execution` "who/what can accomplish this?" and you get the
ladder, as pure code:

- **Fresh information + short/direct** → run the browser TOOL yourself
  (Level-0: you + Camofox, no model delegation). A cheap lookup never
  justifies a research agent.
- **Long / parallelizable / multi-step / specialized** (a 20-source
  research job) → escalate to the AGENT (web_research_agent:
  research-model + camofox + openwork). Browsing turned into research.
- **Everything else** → model routing by capability evidence
  (`/v1/router/candidates`).

The standing rule, verbatim: *Tools are preferred for short, direct
operations. Agents are preferred for extended, parallelizable,
specialized, or multi-step operations. Models are selected based on
task-specific capability evidence. Self-execution is preferred when
expected quality is sufficient and delegation cost is not justified.*

Tools marked `execution: "client"` run in YOUR runtime — the registry
advises, you execute. Agents carry WORKFLOW evidence (sources found and
verified, synthesis quality, latency per model+tools combination), which
no benchmark leaderboard contains.

### The delegation gate + the fast path (B15)

Three additions make the decision cheaper still:

- **`delegation`** — a hard threshold, pure code: specialist advantage
  below 5 points (default) → `self` ("not worth a round-trip"); above →
  `delegate`. `incapable` is a fact, not advice. Tune per call with
  `delegation_threshold` (points).
- **`matrix`** — the whole candidate field as one compact line each
  (`P1 qwen3-vl  vision 94 | hist 92% | p50 1.2s | $0.40/M`), you tagged
  `←you`. Read the matrix first; open `candidates` only when something
  needs digging.
- **`cache`** — a known task signature with a cached model and its
  observed success rate. On a hit you may take the model without
  re-reasoning — override freely when the request is unusual. The system
  invalidates the entry itself when the cached model fails on merit
  (infra timeouts do NOT invalidate — the choice wasn't wrong).

And the failure memory works for you silently: a provider outage is never
recorded as "the model is bad at this task" — only genuine quality
failures move reputation.

### The task profile (advisory, not mandatory)

Since B13 the candidates response carries a `profile` block — read it before
self-executing:

- **domain / complexity / input** — what the router understood the task to be.
- **specialist_advantage** — `high` (a specialist beats you badly), `medium`
  (meaningfully better), `low` (roughly equal), `none` (you're competitive),
  `incapable` (you were filtered — you cannot serve this task at all).
- **best_available** — the top-3 candidates with their unified scores.
- **self_estimate** — `capable` / `marginal` / `incapable` / `unregistered`.

This is **advice, not an order**. The router organizes candidates; the
judgment stays with you. A `high` specialist advantage on a two-line image
caption might still not be worth a delegation round-trip — that's your call.
An `incapable` estimate is not advice though: you were filtered out.

Treat the data honestly: `benchmark_provenance` per dimension tells you
whether a score is `{public, internal, confidence}` — a model with
`public: null, internal: 0.87, confidence: high` is ranked on OUR workload
history, not a public leaderboard. Confidence `low` means thin evidence.
And the `guidance` string says it plainly: benchmark data is a snapshot and
may be stale — prefer recent internal performance when available. The
`registry` block (version date, refreshed_at, `runtime_stats_window: 30d`)
tells you how fresh the snapshot is; the registry also self-refreshes when
stale (> 6h) and on server boot, and `POST /v1/router/refresh` forces it now.

### Swarm need not be sequential

Independent tasks run in PARALLEL — omit `depends_on` and they share a wave:

```
POST /v1/orchestrate/objectives  { goal: "compare screenshot vs its React code" }
POST /…/jobs/{id}/tasks  { id: "vision", tag: "vision", prompt: "describe the screenshot…" }
POST /…/jobs/{id}/tasks  { id: "code",   tag: "code",   prompt: "analyze the component…" }   // no depends_on → parallel
GET  /v1/orchestrate/wait?job_ids={id}
→ synthesize both results + your own reasoning → final answer
```

Vision and code analysis don't depend on each other — run them concurrently,
wait once, then synthesize. Sequential chains are only for genuine data
dependencies (`depends_on`).

## 8. Anti-patterns

- **Naming a model.** Never. If you find yourself wanting a specific model,
  name the CATEGORY and let the benchmarks decide.
- **Tagging everything.** Tags are inferred; pass one only to correct a
  misread.
- **Tight polling.** `wait-first` exists so you sleep until signal.
- **Waiting for all before thinking.** Act per completion.
- **Spawning from a helper.** Refused by design — do the work or wait.
- **Resubmitting failed tasks.** The runner already retries to
  `max_attempts`; resubmission duplicates work. Append NEW tasks instead.
- **Running independent tasks sequentially.** No `depends_on` → same wave →
  parallel. Only chain when one task's input is another's output.
- **Treating the profile as an order.** It's advisory. `incapable` is a fact;
  `high` advantage is a judgment input.
