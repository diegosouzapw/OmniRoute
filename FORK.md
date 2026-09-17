# OmniRoute — parallel-execution fork

Fork of [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
(`release/v3.8.51`, base commit `f9a1cc8`) tuned for **parallel execution**:
multiple models from multiple providers working simultaneously, chosen by
**what they are good at**, on a gateway whose admission and transport layers
don't throttle the concurrency back down.

Branch: `fork/parallel-execution`. Everything else is upstream — rebase often,
diverge deliberately.

**`CORE.md`** (repo root) is the design constitution — the boundaries,
prime directives, and extension playbook. Read it before any upgrade,
rebase, or agent-driven modification; this file is the changelog, CORE.md
is the intent.

## Why

- Adding more providers only maximizes usage if requests actually run **in
  parallel** across them. OmniRoute's fusion strategy already fans a prompt
  out to a panel and synthesizes with a judge — but the panel was a
  hand-maintained model list that rots with every vendor release, and the
  default admission profile was tuned for memory safety on small hosts, not
  for agent fan-out.
- Choosing models for a task ("a coder", "vision for item recognition",
  "speech-to-text") required client-side catalog filtering. There was no
  uniform retrieval vocabulary.

## What the fork changes

### 1. Model tagging: provider + category + benchmark (`open-sse/services/modelTags`)

3300+ models from the chat registry and every media registry are tagged with
provider, a closed category vocabulary (`chat`, `coder`, `reasoning`,
`vision`, `image-gen`, `image-edit`, `video-gen`, `speech-to-text`,
`text-to-speech`, `music-gen`, `embedding`, `rerank`, `ocr`, `search`,
`moderation`, `upscale`) and a benchmark score (curated versioned seeds,
runtime-overridable via `scoreLookup` for the arena/taskFitness stack).
Retrieval: `findModelsByTags` with filters (category, providers,
`minBenchmark`, tools, vision, context), `distinctModels` (relay duplicates
collapse onto first-party providers) and `diverseProviders` (round-robin).

HTTP surface: `GET /api/models/tags` (management auth), including
`panel=true` panel preview.

### 2. Tag-driven fusion panels (`combo.config.panelFromTags`)

A fusion combo may resolve its panel at dispatch time from the tag index:
distinct models from distinct providers (`perProvider` hard cap, default 1),
quality floor (`minBenchmark`), capability floors, provider allow/blocklists,
size clamped to the fusion `maxPanel` heap guard. Malformed specs and empty
resolutions fall back to the literal `models` list; pre-fork combos are
byte-identical in behavior. Combo schema: `models` may be empty when
`panelFromTags` is present (create + update paths).

Examples: `examples/fusion-parallel/` (combos + import script).

### 3. Agent-swarm combo strategy (`strategy: "swarm"`, `config.swarm`)

The one-call multi-task fan-out that fusion (same task × N models) and
pipeline (different tasks, sequential) both lack: **N different tasks → N
different models, in parallel** (`open-sse/services/swarm.ts`).

- Each task carries its own instruction (injected as the worker's leading
  system turn, reusing `prependSystemInstruction`) and its own worker: an
  explicit `provider/model`, a `fromTags` spec (same selector vocabulary as
  `panelFromTags`, resolved at dispatch time), or the combo's `defaultModel`.
- **Cross-task diversity**: tag resolution skips models already claimed by an
  earlier task while alternatives exist — identical specs still yield
  different models from different providers.
- Workers run chat-shaped like fusion panel members: tools stripped,
  non-streaming, per-target admission lane probe (#9654 discipline), 120 s
  per-task timeout, bounded concurrency pool (default 8).
- Per-task isolation: a failed/timed-out/lane-full task is reported in the
  result and never sinks the run; total failure 503s with per-task reasons.
  More than 40 tasks is refused pre-fan-out (#1905 heap guard).
- Response shapes: labeled sections or structured JSON (synthetic OpenAI chat
  completion), or `synthesize: true` — a synthesizer call on the original
  request (streaming + tools preserved, fusion-judge discipline; #6771-style
  bypass for tool-bearing requests without synthesis).
- **Per-request swarms**: `body.swarm` (tasks + any run option) overrides the
  combo's stored tasks and is stripped before workers are dispatched; a combo
  may also define tasks as `models` steps with per-step `prompt` (the pipeline
  shape, executed in parallel).
- Registered as a canonical routing strategy end-to-end:
  `ROUTING_STRATEGY_VALUES`/`ROUTING_STRATEGIES` metadata,
  `HANDLED_COMBO_STRATEGIES`/dispatch leaves (known-symbols gate G1),
  `comboStrategySchema` (schema options derive from the shared constant), and
  `combos.swarm`/`combos.swarmDesc` i18n keys in all 42 locales. The combo
  schema allows an empty `models` list when `config.swarm.tasks` is present.

Examples: `examples/swarm/` (combos + import script + README).

### 4. Parallel-agent admission + transport profile (deployment defaults)

No admission **code** changes — upstream semantics are kept exactly (all 74
admission/proxy-dispatcher tests green). The fork ships deployment defaults
instead (`.env.example`, `docker-compose.yml`, annotated in
`docs/reference/ENVIRONMENT.md`):

| Variable                                    | Upstream | Fork    | Why                                                 |
| ------------------------------------------- | -------- | ------- | --------------------------------------------------- |
| `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`        | unset    | `4`     | main + 3 concurrent subagents; match agent count    |
| `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS`         | `2000`   | `5000`  | drain bursts server-side (#9012 guidance)           |
| `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` | `4 MB`   | `16 MB` | several ~750 KB agent bodies parked during the wait |
| `OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS`    | `32`     | `64`    | fusion panels × agents sharing one account proxy    |

### 5. Harness B1 — capability routing (`feat(harness)` @ 056cc85ce)

Layer 3 of the agent harness: **the caller names the work, the gateway picks
the model.** Full guide in `docs/guides/HARNESS.md`.

- **Benchmark axes** (`open-sse/services/modelTags/benchmarkAxes.ts`): six
  normalized 0..100 axes — `swe_bench`, `humaneval`, `math500`, `gpqa`,
  `mmlu`, `lmarena_elo` (ELO via `(elo−1200)/3`) — seeded over the curated
  flagship set with the same discipline as the composite seeds (basis notes,
  runtime `scoreLookup` outranks seeds, "no evidence" is never a number).
  `findModelsByTags` gains `axis:` — one axis ranks and floors the whole
  chat registry; no axis = byte-identical pre-B1 behavior.
- **Task classifier** (`open-sse/services/harness/classifier.ts`): free
  stage-1 heuristics (image parts → vision; keyword scoring → code / math /
  reasoning / research / search; deep markers + size + history → fast/deep)
  plus an opt-in stage-2 model call that only refines low-confidence
  verdicts and degrades to stage 1 on any failure.
- **Capability aliases** (`capabilityAliases.ts`): bare reserved model names
  `code`/`vision`/`reasoning`/`math`/`research`/`search`/`chat` resolve —
  per request, inside `getComboForModel`, after DB lookups — to ephemeral
  PRIORITY combos over the index's current best specialists. Full native
  combo machinery applies (failover, admission, breakers, translation).
  Operator combos named `code` deliberately override; `provider/code` is an
  ordinary model; empty resolution falls through to a 404, never a wrong
  route.
- **API** (API-key policy): `GET /api/v1/models/catalog`,
  `GET /api/v1/models/best?task=`, `POST /api/v1/harness/classify`,
  `POST /api/v1/harness/task` (classify → rewrite model to the alias →
  self-fetch `/v1/chat/completions` with forwarded credentials; streaming
  passthrough; `X-Harness-Route`/`X-Harness-Tier` headers;
  `?classify_only`/`?alias` overrides). Documented in both OpenAPI specs;
  routes + coverage gates green (699 paths / 99.3%).
- Tests: `tests/unit/services/harness-b1.test.ts` (17 — axis
  seeding/ranking/reordering/floors, legacy parity, classifier incl. hostile
  shapes and stage-2 degradation, alias construction + live-registry
  resolution, `getComboForModel` seam e2e). `typecheck:core` clean.

### 5b. Harness B2 — Hermes contract surface (`feat(harness)`)

Guide 1 Part 6 `/quick` + Guide 2's capability vocabulary (see
`docs/guides/HARNESS.md` §B2 and `docs/guides/ORCHESTRATION_SPEC.md`):

- **`plan` task type + alias + classifier class** — Guide 2's six contract
  strings (`vision · image_gen · code · research · plan · chat`) all work
  across the B1 surface; whole-registry GPQA/MMLU ranking.
- **Budget tiers** — bare-name suffix `alias:best` (top-3 specialists) and
  `alias:cheap` (fast-tier names from a widened pool, relaxing to `any` when
  empty). Unknown suffixes fall through to ordinary resolution;
  provider-prefixed names never parse as budget aliases.
- **`POST /api/v1/orchestrate/quick`** — single delegated task,
  synchronous, guide-shaped response `{ok, model, provider, text,
  latency_ms, score, decision}` with model/provider/decision read from the
  pipeline's own `X-OmniRoute-*` headers; `image_gen` dispatches the images
  API with the index's best image specialist; `Idempotency-Key` is
  forwarded so the chat pipeline's NATIVE idempotent replay applies;
  errors are guide-shaped (400 per-field `invalid_request`, 503
  `no_active_models`).
- Tests: `tests/unit/services/harness-b2.test.ts` (12 — plan vocabulary,
  budget tiers + relaxation, seam resolution, quick shape mapping with
  stub dispatches incl. 503/throw paths and image_gen). All services
  417/417, openapi routes/coverage, typecheck:core green.

### 5c. Harness B3 — orchestrator core (`feat(harness)`, Guide 1 Parts 3+5+6)

Jobs, waves, and the plan API (parallel mode; swarm/blackboard/judge is
B3.5). See `docs/guides/HARNESS.md` §B3:

- **Jobs store** — `orchestrate_jobs` / `orchestrate_tasks` /
  `orchestrate_job_log` (SQLite, idempotent bootstrap; prefixed to avoid
  the jobRegistry `jobs` table). Task state machine `queued → running →
  done | failed` with attempts, and a per-transition audit log.
- **Planner** — topological waves: a task is ready when every `depends_on`
  is done; ready tasks fire in parallel (max_concurrency, default 8);
  upstream results inject into dependents (`Upstream outputs:` + per-dep
  result truncated to 800 chars); failed deps BLOCK dependents with
  reasons surfaced, never guessed around.
- **Runner** — requeues transient failures up to `max_attempts` (default
  3); deadline exceeded → job `failed("deadline")` with partial results
  intact. Every task dispatches through its capability alias (+ job budget
  tier) via the native chat pipeline, so provider diversity/failover come
  from the combo machinery. Pure logic + `JobsStore` interface —
  in-memory store for tests/embedders, SQLite store for production.
- **API** — `POST /api/v1/orchestrate/plan` (admission validation with
  per-task errors replacing `validate_plan.py`: unknown tags, duplicate
  ids, dangling depends_on, cycles, empty tasks, 40-task cap;
  Idempotency-Key replays return the ORIGINAL job, never re-executing;
  202 + background wave loop) and `GET /api/v1/orchestrate/jobs/{id}`
  (status, waves, per-task state/model/latency/attempts, log tail;
  `?wait=N` long-poll). `mode:"swarm"` rejected with an explicit
  next-build error.
- Tests: `tests/unit/services/harness-b3.test.ts` (12 — admission matrix,
  clamping, planner readiness/blocking/truncation, runner e2e with
  scripted dispatches: two-wave upstream injection, requeue-then-succeed,
  attempts-exhausted + blocked dependent, deadline partials, idempotency
  conflict, API shape). services 429/429, openapi 702 paths / 99.3%,
  typecheck:core clean.

### 5d. Harness B3.5 — swarm mode (`feat(harness)`, Guide 1 Part 7)

Blackboard, bounded A2A relay, and the judge loop on the B3 wave engine
(see `docs/guides/HARNESS.md` §B3.5):

- **Blackboard** — swarm prompts wrapped with `<shared context>` (goal,
  snapshot, `[LOCKED]` markers, part identity, output contract: a ≤15-line
  `<summary>` block); the HARNESS parses summaries into
  `blackboard.summaries.<taskId>` — workers never write the board, locked
  keys untouchable (plans locking missing keys are rejected at admission).
  `GET /v1/orchestrate/jobs/{id}/blackboard` = snapshot + append history.
- **Bounded A2A relay** — one `@ask <task-id>: <question>` per worker per
  wave, relayed by the harness as a single ≤30s dispatch to the asked
  worker's specialty; the answer lands on `blackboard.mailbox`. Stateless
  workers keep the guide's failure modes (drift/burn/loops) avoided by
  construction.
- **Judge loop** — after the waves, status `judging`: a `plan`-tagged
  (image jobs: `vision`) judge reviews summaries against the locked canon
  or a caller check, strict-JSON verdicts; failed parts re-queue with
  `[judge feedback, round N]` injected (attempts reset); `max_rounds`
  (default 3, cap 5) hard-stops refinement — final output accepted with
  flaws logged (`task_flaw_accepted`). Unparseable verdicts never
  fabricate a clean pass. `POST /jobs/{id}/judge` for manual advance.
- **Per-task media dispatch** — `image_gen` tasks dispatch the images API
  with the tag index's top image specialist (no chat-alias detour);
  image models skip the shared-context wrapper.
- Tests: `tests/unit/services/harness-b35.test.ts` (14 — prompt assembly,
  summary/merge with locked keys, @ask parsing + relay + degradation,
  judge input/vision-tag/parsing, runner e2e: blackboard fill + clean
  pass, requeue-with-feedback, max_rounds flaw acceptance, mailbox answer
  + unanswered note, image-task raw prompt). Combined harness suites
  55/55; services 443/443; openapi 704 paths / 99.3%; typecheck:core
  clean.

### 5e. Harness B4 — hermes surface + NIM hardening (`feat(harness)`, Guide 2 Layer 2)

The Guide 2 hermes plugin mapped onto the fork's alias infra (no runtime
plugin loader exists — a static registry IS the plugin), NVIDIA NIM 429
hardening, complexity tiers, and orchestrator trace headers (see
`docs/guides/HARNESS.md` §B4):

- **`hermes/*` reserved model namespace** — `hermesCombos.ts` maps ten
  role-shaped names onto capability aliases with fixed budget tiers
  (`hermes/fast`→`chat:cheap`, `hermes/smart`→`chat:best`,
  `hermes/code`/`code-best`/`reason`/`plan`/`math`/`vision`/`research`/
  `search`). Resolved at `getComboForModel` step 3.5 — after DB combos
  (operator wins), exact names only, unknown names 404 (never mis-route).
  `hermes` added to the reserved provider prefixes (408→409): custom nodes
  cannot shadow the namespace.
- **NIM 429 hardening** — `nimRateLimitTracker.ts` (per-connection sliding
  60s request windows, Retry-After-derived cooldowns capped at 5 min,
  learned RPM ceilings) + a `nvidia` 429 failover block in `chatCore`
  (codex-pattern): persist cooldown via `markConnectionRateLimitedUntil`
  (survives token refresh, visible to all requests), rotate to a sibling
  key preferring unsaturated ones, ≤3 attempts, probe-origin 429s isolated
  (#9817 parity), all-keys-cooling → 429 passthrough with Retry-After.
- **Complexity tiers** — `/v1/harness/task?tier=auto`: fast→`alias:cheap`,
  deep→`alias:best`; `X-Harness-Budget` response header; default unchanged.
- **Trace headers** — orchestrator dispatches carry `X-OmniRoute-Job`/
  `Task`/`Wave` through the self-fetch (both chat and images paths).
- Tests: `tests/unit/services/harness-b4.test.ts` (19 — tracker windows/
  cooldowns/ceilings/caps/decay/reset, hermes registry+membership+
  resolution+tier contract+reserved prefix, tier=auto route deep/fast/
  default/forced) + reserved-prefix suite extended (hermes node rejection,
  count 409). Combined harness 74/74; services 461/461; openapi 704
  paths / 99.3%; typecheck:core clean.

### 5f. Harness B5 — allocator, drift loop, lease expiry (`feat(harness)`, Guide 1 Parts 4+8)

Guide 1 Part 4+8 completion — the live half of routing on top of B1's
static ranks (see `docs/guides/HARNESS.md` §B5):

- **Allocator scoring** — `open-sse/services/harness/allocator.ts` (pure,
  deterministic): `quality × (0.5+0.5×health) × (0.5+0.5×speed) ×
  breaker_penalty`; health/speed from the jobs store's own per-model task
  outcomes (`aggregateModelStats`, both stores), Laplace-smoothed so no
  history is neutral.
- **Assigned routing** — `policy.routing: "assigned"` runs
  provider-diverse water-filling per wave (`max_per_provider`, unused-model
  preference) and dispatches the literal picked model (`task_assigned`
  logged with score); default stays `"alias"` (B1 behavior, native combo
  failover). Unassignable tasks fall back to the alias, logged. Image
  dispatch honors assignments.
- **Judge drift loop** — every verdict writes back per served model: two
  consecutive fails → quality −0.05 per further fail (floor 0.3),
  `model_drift_penalty` logged; persisted in `orchestrate_model_drift`
  (SQLite) / in-memory map; feeds the next wave's allocator.
- **Lease expiry + work-stealing** — tasks carry `lease_until`
  (`max(5min, task_timeout+30s)`); expired running leases are stealable,
  and each wave sweeps lost tasks back to `queued` (`lease_expired` logged,
  attempts preserved) — Part 9 acceptance "lease expiry requeues" is a
  tested behavior in both stores.
- Tests: `tests/unit/services/harness-b5.test.ts` (19 — score formula
  exactness, water-fill/max_per_provider/penalty/health reordering,
  determinism, lease lifecycle + steal + requeue + SQLite parity, drift
  streak/reset/cap + SQLite parity, policy clamps, e2e: alias vs assigned
  dispatch, lease-expiry recovery, judge drift write-back). Combined
  harness+regression batch 124/124; openapi 704/99.3%; fastcheck tsc clean.

### 5g. Harness B6 — cost budgets (`feat(harness)`, cross-cutting)

`policy.max_total_tokens` + per-task token usage accounting (see
`docs/guides/HARNESS.md` §B6):

- **Usage** — dispatch outcomes carry OpenAI-style usage; per-task
  `prompt_tokens`/`completion_tokens` columns (both stores) aggregate into
  `jobToApi().usage`; unreported usage never fabricated.
- **Breach** — unstarted tasks abort (`task_budget_aborted`), deferred
  tasks swept, job fails `budget_exhausted` with partial results visible;
  deadline semantics; default 0 = unlimited (unchanged behavior).
- Tests: `tests/unit/services/harness-b6.test.ts` (7 — policy clamps,
  usage accounting + jobToApi aggregation, SQLite round-trip parity,
  budget abort e2e incl. deferred sweep, no-budget and
  usage-less-dispatch guards). Combined batch 131/131; openapi 704/99.3%.

### 5h. Harness B7 — multimodal task dispatch (`feat(harness)`, cross-cutting)

Task `modality` + three new media capability tags (see
`docs/guides/HARNESS.md` §B7):

- **Modality** — `text|image|search|speech|music|video`; media tags
  imply theirs (`audio_speech`/`music_gen`/`video_gen` are new tags with
  registry subcategories `text-to-speech`/`music-gen`/`video-gen`);
  `search` on a chat tag = literal `/v1/search` dispatch. Validation
  enforces tag/modality compatibility.
- **Dispatch** — media endpoints via self-fetch (speech returns audio
  bytes → base64 envelope ≤192 KB, digest beyond; music/video JSON
  envelopes capped at 2 MB with sha256 + `truncated`); search results
  envelope carries query + results.
- **Semantics** — media tasks skip swarm wrappers, can't answer @ask
  (`mailbox_skipped`), image/video jobs get a vision judge;
  `task.modality` in jobToApi; SQLite column with tag-implied fallback
  for pre-B7 rows.
- Tests: `tests/unit/services/harness-b7.test.ts` (9 — validation
  compatibility rules, runner plumbing, mailbox skip, envelope caps,
  SQLite round-trip). Combined batch 140/140; openapi 704/99.3%.
- Toolchain: `min-deps.package.json` js-yaml pin corrected
  (`^5.4.1` → `^4.1.0` — v5 doesn't exist; the stale tarball shipped
  3.15.2 and broke the openapi check scripts' named imports); deps
  tarball rebuilt with js-yaml 4.3.2.

### 5i. Harness B8 — cross-cutting hardening (`feat(harness)`)

Compression + canaries + benchmark wiring + Guide 2 fork-side mechanics
(see `docs/guides/HARNESS.md` §B8):

- **Compression** — `policy.compress_context` (default false): Caveman/
  lite over each swarm worker's context before fan-out; code preserved;
  `context_compressed` log with token delta; verbatim fallback.
- **Canaries** — 2-consecutive-failure dead marking; freshness window
  (stale dead stops filtering); `findModelsByTags` skips fresh-dead;
  empty state = no behavior change. Routes:
  `GET /v1/models/canaries`, `POST /v1/models/canaries/check`
  (reachability semantics: any HTTP answer = alive).
- **Benchmark wiring** — DB-backed taskFitness (user override → arena
  ELO → models.dev tier) injected as the live index's `scoreLookup`
  (coder→coding, reasoning→analysis only; ×100 rescale).
- **Guide 2** — bare `model: "auto"` classifies + routes on the direct
  chat path; `policy.retry_503_after_ms` on /quick retries ONCE before
  the honest 503.
- Toolchain: deps tarball layout bug fixed (nested `minstall/` prefix
  silently broke node_modules links) + setup-fast.sh now fails loudly on
  a broken link.
- Tests: `tests/unit/services/harness-b8.test.ts` (15 — retry semantics,
  compression on/off + control comparison, canary state machine +
  ranking skip + probe semantics, override→runtime-score flow, auto
  classifier decisions). Combined batch 155/155; openapi 706/99.3%;
  fastcheck tsc clean.

### 5j. Harness B9 — the breaker feed (`feat(harness)`)

The allocator's 0.2 multiplier reads the live provider breaker registry
(see `docs/guides/HARNESS.md` §B9): OPEN/HALF_OPEN penalize, DEGRADED/
CLOSED/unknown don't; persisted-state fallback survives restarts;
`peekCircuitBreaker` reads without creating; `RunnerDeps.breakerOpen`
plumbs it from the plan route (absent = B5 behavior). Tests:
`tests/unit/services/harness-b9.test.ts` (7 — predicate signature +
score math, feed semantics incl. persisted fallback + no-creation,
runner steering away from an open provider). Combined batch 162/162;
openapi 706/99.3%; fastcheck tsc clean.

### 5k. Docs — USAGE.md + JOURNEY.md (`docs(fork)`)

`docs/guides/USAGE.md`: the consolidated endpoint syntax — model:"auto"
and the alias/hermes vocabularies, /quick (incl. retry_503_after_ms),
/plan (tags, modality rules, full policy table), jobs polling shape and
failure reasons, /harness/task variants, /v1/models/best, the canary
routes, trace headers, and task-state semantics.
`docs/guides/JOURNEY.md`: the decision log — per-build rationale,
rejected alternatives, and the process scars (drift-penalty rounding,
silent tarball links, box-bound tsc). The workspace README gained the
same usage section and a journey pointer.

### 5l. B10 — Objective orchestration for the brain (`feat(harness)`)

The OpenResearch adaptation (alphaXiv), translated from their research
agent workspace to our gateway: **the caller names objectives, not models
and not tags.**

- **Tag inference** — `tag` optional on every plan/objective task; the
  classifier's stage-1 heuristics infer it from the prompt (`tag_inferred`
  log, `inferred_tags` in responses). Explicit tags still win; unknown
  tags still 400. `objectiveToPlanBody` normalizes the new
  `POST /v1/orchestrate/objectives` body (subtasks optional — a bare
  objective becomes the single task) through the ONE admission path
  (validatePlan).
- **Bias guard** — `caller_model` on the job (SQLite column; jobFromPlan
  from the body). When set (and `policy.bias_guard` not false): alias
  routing pins the best tag-viable NON-caller model (`bias_avoided`
  logged); assigned routing scores the caller's model ×0.6
  (allocator `avoidModel`); the judge also avoids it (self-grading is the
  sharpest bias); no alternative → runs anyway, flagged
  `bias_same_model` per task in jobToApi. Penalty, not a ban — never
  deadlocks a single-model deployment.
- **Stream scheduling** — `policy.scheduling: "wave"|"stream"` (wave
  default, byte-identical B3 barriers). Stream = per-completion
  admission (the `orx exp wait` loop shape): a freed slot refills
  immediately (no barrier), `task.wave` carries the dispatch ordinal,
  swarm blackboard merges + mailbox relays land per completion. The
  stream loop is deliberately parallel to runWaves (shared building
  blocks, different admission discipline) so the battle-tested wave path
  stays untouched. Tests caught the double-count bug (running-state ∪
  tracked-launches) that would have quietly reintroduced the barrier.
- **Refill + spawn + wakes** — `POST /jobs/{id}/tasks` appends to a
  LIVE job (deps may reference existing tasks; 409 `job_terminal`);
  `POST /v1/orchestrate/spawn` creates a helper job with a self-contained
  brief (context copied verbatim, never derived), no nesting (409), an
  in-flight cap of `policy.max_children` (429, default 4 ≥ the admission
  floor of 2), and the bias guard propagates to children;
  `GET /jobs/{id}/wait-first` wakes on the first task completion since
  call start (baseline-diffed `completed_since`, `drained` exit);
  `GET /v1/orchestrate/wait?job_ids=` is the multi-job analog.
- **Drive-by fixes** — the jobs route's `?wait=` long-poll claimed a 60s
  cap but never enforced it (stuck-active job = infinite spin); bounded
  by wall clock now. Build-1 (parallel session) type breaks repaired:
  the OpenDev policy fields were missing from the Required<> assembly
  (every persisted row carried undefined), `TaskType` wasn't re-exported,
  and "worktree" modality crashed `pickMediaModel`'s type (it's an
  execution location, not an endpoint family — dispatch treats it as
  text). New `tsconfig.harness-check.json` gate: tsc over the whole
  harness/orchestrate slice (fastcheck never covered these files — its
  21s "clean" was checking 27 core files + imports).

Tests: `tests/unit/services/harness-b10.test.ts` (25 — inference,
objective/spawn normalization, allocator penalty-not-ban, e2e alias/assigned
bias avoidance, stream refill-before-barrier timing proof, wave still
barriers, stream retry/deadline/budget/swarm-per-completion, refill
validation, lineage, jobToApi surface). Combined batch 177/177; harness
tsc 0 errors; openapi 709/714 (99.3%).

### 5m. B11 — Lenient bias guard + parallel-execution diversity (`feat(harness)`)

User direction: "calling shall be on basis of category and benchmark
scores and provider/model name; tag is just for parallel-execution
tracking so it doesn't call same model twice; make the bias guard a
little more lenient" — plus an agent guide and a user setup guide.

- **Lenient bias guard** — `policy.bias_tolerance` (0–1, default 0.85).
  The guard now only diversifies on NEAR-TIES: the best alternative's
  quality must be within `tolerance ×` the caller candidate's quality
  (`biasAvoidApplies`, pure, shared by both routing paths). Inside the
  band: alias routing pins the best alternative, assigned routing scores
  the caller's model ×0.8 (was ×0.6). Outside: benchmark merit wins, the
  task is flagged `bias_same_model` — a clearly superior caller model is
  never overridden. Tolerance 0 = B10's strict always-avoid, preserved as
  an explicit option.
- **Stream assigned routing + run-scoped diversity** — stream mode now
  honors `routing: "assigned"` (per-admission allocation with the same
  stats/penalties/breakers/bias feeds as the wave path) and carries a
  `usedModels` set across the WHOLE job (`AssignOptions.usedModels`,
  caller-owned): parallel tasks never call the same model twice while
  alternatives remain; pool exhaustion falls back to reuse, never a
  deadlock. Wave mode keeps its per-wave semantics, unchanged.
- **Guides** — `docs/guides/AGENT_TOOL_GUIDE.md`: the agent-facing skill
  (contract: never name models; the surface table; the per-completion
  loop discipline; spawn rules; failure semantics; anti-patterns) and
  `docs/guides/SETUP_HERMES.md`: the user setup (base-project structure
  unchanged: dashboard providers → ONE API key → Hermes base URL +
  skill install; smoke tests; knob table; troubleshooting).

Tests: `tests/unit/services/harness-b11.test.ts` (8 — the lenient matrix
pure, allocator merit-vs-band, usedModels spread/exhaustion, policy
clamps, stream×assigned 3-tasks-3-models, strict tolerance 0, honest
default-flag e2e). b10 updated for the lenient default (strict cases pin
tolerance 0). Combined batch 185/185; harness tsc 0 errors.

### 5n. B12 — The capability registry (layered router) (`feat(harness)`)

The user's layered pipeline, implemented: Task → hard capability filter →
unified ranking → tiered candidates with FULL fallback visibility.

- **`open-sse/services/harness/capabilityRegistry.ts`** (pure): ModelDescriptor
  assembly from the tag index (capability matrix incl. tool_calling/code
  from categories+axes; specializations derived from benchmark axes,
  enriched per model; operational context/latency/cost; reliability from
  empirical stats) + `filterCandidates` (deterministic elimination:
  modality, capability, tool_calling, min_context) + `unifiedScore`
  (capability_match × benchmark × historical_success × reliability /
  cost_penalty / latency_penalty — unknown evidence is neutral, never
  zeroing) + `rankCandidates` (PRIMARY/SECONDARY/FALLBACK, every filtered
  candidate retained) + `selfAssess` (the equal-scoring rule: the caller
  is ranked by the identical function; would_win / filtered /
  unregistered — no self-bonus, no self-penalty).
- **Closed loop**: `aggregateModelStatsByCategory()` on both stores (keyed
  `model|tag`) feeds the descriptor's per-category rates AND the
  allocator's `statOf(model, tag)` in both assigned-routing paths — the
  router learns P(success | model, task); the benchmark is only the prior.
  E2E test proves a workload history (10 chat failures) flips a real
  allocation away from the prior's winner.
- **`GET/POST /v1/router/candidates`**: the Hermes-facing surface —
  classify-from-prompt, filter stats (pool/eliminated), tiers, ranked
  candidates with score breakdowns + full metadata, self-assessment.

Tests: `tests/unit/services/harness-b12.test.ts` (9 — assembly + enrichment,
hard filter, exact neutral math, empirical closed loop, tiers, equal
scoring incl. filtered/unregistered, allocator per-category routing,
store-level model|tag stats, the flip e2e). Combined batch 194/194; harness
tsc 0 errors; openapi 710/715 (99.3%).

### 5o. B13 — Registry intelligence: advisory profiles, provenance, telemetry, versioned refresh (`feat(harness)`)

Advisory routing with honest data. The registry collects three kinds of
information (static facts, refreshed benchmarks, runtime telemetry — the
most valuable), versions itself so nobody decides on unknowingly stale
data, and stays LOCAL at routing-decision time.

- **Advisory task profile** — `taskProfile()` on the candidates response:
  domain / complexity / input, `specialist_advantage`
  (high|medium|low|none|incapable — ratio of self score to best),`
  best_available` (top-3 with scores), `self_estimate`
  (capable|marginal|incapable|unregistered). The router organizes; the
  judgment stays with Hermes.
- **Benchmark provenance** — every benchmark dimension carries
  `{public, internal, confidence}`: public score when it exists (nullable),
  internal rate from OUR workload (global laplace × 100), confidence from
  sample size (≥50 high, ≥10 medium, else low). A missing public benchmark
  NEVER zeroes a model — the unified-score chain falls back
  category → composite → internal empirical → neutral 50/100.
  (Fixed a latent B12 scale bug here: the neutral fallback fed a 0–100
  chain as 0.5 → 0.005 after the ÷100.)
- **Runtime telemetry** — `finished_at` stamped on terminal transitions
  (both stores; SQLite `ALTER TABLE … ADD COLUMN finished_at REAL`, NULL =
  in-window for pre-B13 rows). Stats aggregate over a 30-day window with
  nearest-rank p50/p95 latency per model (`ModelStat.p50LatencyMs/
  p95LatencyMs`; `operational.latency_p50_ms` prefers global p50, new
  `latency_p95_ms`).
- **Versioned registry + refresh** — `RegistryVersion {version:
  "YYYY.MM.DD", refreshed_at, runtime_stats_window: "30d"}`;
  `REGISTRY_STALENESS_GUIDANCE` ("Benchmark data is a snapshot and may be
  stale. Prefer recent internal performance when available."); refresh at
  boot (`registerNodejs`), self-heal when > 6h stale
  (`ensureRegistryFresh` on the candidates route), manual/cron
  `POST /v1/router/refresh`. A refresh rebuilds from the live provider
  registry — **deprecated models are deleted**, never lingered.
- **Clean separation** — Cron/boot collects knowledge → the Registry stores
  → the Router organizes → Hermes judges. No external dependency at
  routing-decision time (local/on-device federation safe).
- **Swarm parallelism documented** — independent tasks (vision ∥ code)
  share a wave when `depends_on` is omitted; synthesize + own reasoning →
  final answer. Pattern documented in AGENT_TOOL_GUIDE §7.

Tests: `tests/unit/services/harness-b13.test.ts` (7 — provenance + confidence
bands, internal-fallback-for-missing-public, profile advantage bands +
self estimates, p50/p95 nearest-rank, 30d window exclusion incl. NULL
in-window, terminal stamping, version stamping + fresh no-op). Combined
batch b1–b13+swarm 201/201; harness tsc 0 errors (24 files); openapi
711/716 (99.3%).

### 5p. B14 — Embeddings-based classification at the classifier seam (`feat(harness)`)

The deferred embedding-source decision, made: **provider /v1/embeddings**.
The classifier's cheapest-first ladder gains a middle stage — one cheap,
non-generative, cache-friendly embeddings call between the free heuristics
and the opt-in model call.

- **`open-sse/services/harness/embeddingClassifier.ts`** (pure): 7 task
  types × 7 exemplar prompts (media/body-shape types excluded by design —
  stage 1's body-shape rules are authoritative), cosine matching against
  per-type exemplar CENTROIDS with margin discipline (needs BOTH absolute
  similarity ≥ 0.3 and margin ≥ 0.03 over the runner-up; ≥ 0.08 = high
  confidence — an ambiguous verdict keeps the heuristic default, which is
  more honest than a coin flip). Per-MODEL centroid cache (6h TTL — a
  model switch rebuilds; the model identity is only known after the first
  embed, so a model race between text and centroid embeds is guarded),
  in-flight build dedupe, and a 256-entry LRU for request-text vectors
  (repeated classifications cost zero calls).
- **`classifier.ts`**: `classifyRequest` gains stage 1.5 — runs only when
  stage 1 is low-confidence AND an `embed` function is supplied AND the
  request carries no image/audio content (body facts are never re-decided
  by text semantics). Stage "embeddings" in the classification result;
  every failure degrades downward, never errors (same contract as stage 2).
- **`src/lib/harness/embedder.ts`** + `selfFetchEmbeddings`/`selfFetchList`:
  the route-side embedding source — OmniRoute's OWN /v1/embeddings via
  self-fetch (the call rides the FULL native pipeline: provider selection,
  failover, credentials). Default model resolution honors the total
  abstraction: no naming required — the first configured embedding model
  (known-dimension preferred) read from this server's own
  GET /v1/embeddings list, cached 60s. 2500ms budget: refinement, never a
  stall. Unavailable/timeout/no-model → null → next stage.
- **Wired**: `/v1/harness/classify` (useEmbeddings default ON,
  embeddingModel pin, opt-out) and `/v1/router/candidates` (use_embeddings
  / embedding_model params; no model stage on the router path — it stays
  non-generative). `/quick` and `/plan` intentionally stay stage-1-only:
  they are latency paths.

Tests: `tests/unit/services/harness-b14.test.ts` (12 — exemplar integrity,
centroid/cosine math incl. degenerate + dimension-mismatch safety, decisive
winner / ambiguity / out-of-distribution, ladder order incl.
match-skips-model and null-embed-falls-to-model, high-confidence and
body-shape never embed, throwing embed, per-model centroid caching + text
LRU call counts, model-race guard). Combined batch b1–b14+swarm 213/213;
harness tsc 0 errors (29 files).

### 5q. B15 — The decision layer: failure taxonomy, delegation threshold, candidate matrix, routing cache (`feat(harness)`)

The user's decision-layer spec: two kinds of model knowledge (registry
facts vs workflow memory — both shipped B12/B13), plus four new pieces.

- **Failure taxonomy** (`failureTaxonomy.ts`, pure): classifies terminal
  failures as model / timeout / context_too_large / malformed_request /
  infrastructure / budget — EVIDENCE-BASED EXCLUSION: only detectable
  non-model failures are excused; a bare failure after exhausting attempts
  is still a quality signal (closed-loop semantics preserved). Both
  stores aggregate `infraFailures` (sparse, the failure memory); every
  laplace/health consumer (descriptor reliability, allocator health,
  provenance internal) scores on reputation failures only. The e2e proves
  ten TIMEOUT failures do NOT flip a real allocation while ten bare
  failures still do — "a provider outage never reads as 'Qwen is bad at
  OCR'".
- **Delegation gate** (`delegationGate.ts`, pure): the anti-model-call-
  inflation rule — `specialist advantage < DELEGATION_THRESHOLD (default 5
  pts) → self`. The user's exact cases are tests: 91-vs-93 → self, 72-vs-96
  → delegate. Filtered callers → delegate (a fact, not advice);
  unregistered/no-caller → consider. Pure code, zero LLM — the boundary
  between "I can do it" and "delegate" is extremely cheap. Advisory:
  `delegation: {recommendation, advantage, threshold, signals, reason}` on
  the candidates response; Hermes stays sovereign.
- **Compact candidate matrix** (`candidateMatrixLines`): every ranked
  candidate as ONE line — `"P1 a/qwen-vl  vision 94 | hist 92% | p50 — |
  $0.40/M"` — tier-marked, self-tagged ("←you"), ≤ ~90 chars/line. Hermes
  sees the whole field in a few hundred tokens; the full `candidates`
  array stays for digging in.
- **Routing decision cache** (`routingCache.ts`, pure): task_signature
  (type|modality|specialization|complexity, normalized) → preferred model,
  6h TTL, LRU 256, per-signature outcome memory (attempts/successes — the
  Task Memory). The candidates response leads with `cache: {hit, model,
  uses, success_rate}` so a known task can skip re-reasoning. The RUNNER
  feeds outcomes back (wave + stream paths, `dispatchModel` captured for
  error outcomes that carry no model): a reputation failure on the cached
  model DROPS the entry ("route immediately"); infra failures are recorded
  but kept. `pruneRoutingCache` drops models the registry rebuild deleted.

Tests: `tests/unit/services/harness-b15.test.ts` (9 — taxonomy kinds +
reputationFailures clamping, sparse infraFailures + reliability excusal
incl. pure-infra neutral, the no-flip e2e with the bare-failure
counterfactual, the gate's exact bands (91/93, 72/96, would_win, filtered,
unregistered, threshold override), matrix line format + self tag +
compactness bound, signature normalization, cache record/hit/uses/outcomes/
invalidation/TTL/prune, runner wiring e2e: done records success, bare
error invalidates, infra error keeps). Combined batch b1–b15+swarm 222/222;
harness tsc 0 errors (34 files).

### 5r. B16 — The three-registry separation: tools, agents, models + execution routing (`feat(harness)`)

The user's spec: "Camofox isn't a model. OpenWork isn't a model. They're
execution environments/tools. So don't put them in the same ranking system
as Qwen, DeepSeek, etc." — plus the attached routing guide (committed
verbatim: `docs/guides/OmniRoute_Revised_Intelligent_Routing_Guide.md`;
phases 1–8 were already B12/B13/B15).

- **`toolRegistry.ts`** (pure): execution environments with capability
  metadata — camofox (browser/web_navigation/javascript, execution:
  client — Hermes bot mode runs it), openwork (web_research/browser,
  client), web_search (native, POST /v1/search). Superset capability
  matching with overlap ranking; `execution: native|client|external`
  marks WHO runs it — the fork NEVER implements tool runtimes (guide §16;
  "Hermes bot mode saves us from rebuilding tools").
- **`agentRegistry.ts`** (pure): model + tools + capabilities — the
  escalation path (web_research_agent: research alias, camofox+openwork,
  web_research/source_verification/synthesis). Matched by capability,
  never by model axes.
- **`executionRouter.ts`** (pure): the user's ladder as pure code —
  fresh information? → can the executor browse directly? → short/direct
  = **Level-0 TOOL** (Hermes + camofox, no model delegation) vs
  long/parallelizable/multi-step = **AGENT** escalation ("this isn't a
  browsing operation; this is a 20-source research job"); no fresh info →
  MODEL routing. `HERMES_EXECUTION_RULE` verbatim: "Tools are preferred
  for short, direct operations. Agents are preferred for extended,
  parallelizable, specialized, or multi-step operations. Models are
  selected based on task-specific capability evidence. Self-execution is
  preferred when expected quality is sufficient and delegation cost is
  not justified." Task depth on the profile: duration_estimate,
  requires_fresh_information, parallelizable.
- **`workflowMemory.ts`** (pure, guide §14): web quality is a WORKFLOW
  property (model × browsing × strategy × verification × synthesis) —
  outcomes recorded per (workflow, model, tools): sources_found,
  sources_verified, quality_score, latency. §15 interfaces
  (recordWorkflowOutcome/getWorkflowHistory/workflowEvidence) — "that's
  information you won't find on a benchmark leaderboard."
- **`GET/POST /v1/router/execution`**: the "who/what can accomplish
  this?" surface — analysis + decision ladder + matched tools + agents
  (with workflow evidence) + top-3 models, all advisory.
- **`POST /v1/route`** (guide §10, Phase 10): the compact fast API —
  {task} → {primary, secondary[], fallback[], confidence} (+?evidence=true
  matrix). Thin: same filter+ranking, none of the verbosity.
- **`TOOL_FAILURE`** in the failure taxonomy (guide §12): tool/browser
  crashes never hurt a model's reputation.

Tests: `tests/unit/services/harness-b16.test.ts` (10 — tool superset
matching + execution kinds, agent capability matching, task-depth profile,
the ladder's four outcomes incl. Level-0/escalation/degenerates, the rule
verbatim, workflow aggregation + ranking + zeroed-never-invented evidence
+ dedup, agents-with-evidence wiring, TOOL_FAILURE). Combined batch
b1–b16+swarm 232/232; harness tsc 0 errors (40 files); openapi 713/718
(99.3%). Deferred to B17: the `intelligent` combo strategy (guide §2 —
upstream combo-engine surgery, needs its own contained build).

### 6. Transport: concurrent proxy dispatcher streams (already upstream)

PR [#4288](https://github.com/diegosouzapw/OmniRoute/pull/4288)
(`fix(proxy): allow concurrent proxy dispatcher streams`) was **merged into
`release/v3.8.30`** — this fork's v3.8.51 base already contains the
concurrent-tunnel pooling (`OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS`, default
32, cap 256) that replaced the single shared upstream socket. Verified in this
fork: `tests/unit/proxy-dispatcher-family.test.ts` and
`tests/unit/proxy-concurrency-keepalive-regression.test.ts` pass. The fork's
contribution is the capacity bump above + documentation.

## Incidental fixes

- `open-sse/config/audioRegistry.ts`, `open-sse/config/rerankRegistry.ts`:
  explicit array annotations in `getAllAudioModels`/`getAllRerankModels` —
  these files entered the `typecheck:core` program (via the tag index's
  imports) with latent `never[]` inference errors under the core tsconfig.

## Documentation

- `docs/guides/PARALLEL_EXECUTION.md` — the full guide (tags, panels, swarms,
  admission, transport).
- `docs/guides/HARNESS.md` — the agent-harness Layer-3 surface (axes,
  classifier, aliases, catalog/task API) and the seeding policy.
- `examples/fusion-parallel/README.md` — fusion panel examples walkthrough.
- `examples/swarm/README.md` — swarm examples walkthrough.
- `docs/reference/ENVIRONMENT.md` — fork deployment defaults annotated on the
  affected rows.

## Verification (this fork, on the v3.8.51 base)

- `tsc -p tsconfig.typecheck-core.json` — clean.
- New tests: `tests/unit/services/model-tags.test.ts` (15),
  `tests/unit/services/fusion-tag-panel.test.ts` (5, e2e through the real
  combo engine + live registry),
  `tests/unit/services/swarm-strategy.test.ts` (21, e2e dispatch + pure
  units: parallel fan-out, body.swarm override, tag diversity, partial/total
  failure, synthesis, tool-bearing bypass, schema, parsing).
- Existing suites re-run green: fusion strategy/judge/partial-failure (10),
  combo-config schema, full `tests/unit/combo/*` + `fusion-*` (203),
  `tests/unit/services/*` (388), admission + proxy-dispatcher (377),
  `autocombo-unification` (7 — strategy parity).
- i18n gates: translation-ratio (41 locales within baseline) and
  ui-keys-coverage (all ≥ 80%) — `combos.swarm`/`combos.swarmDesc` added to
  all 42 locales.
- Gates: `check:env-doc-sync`, `check:openapi-routes` (695 paths),
  `check:api-docs-refs`, `check:known-symbols` (21 canonical strategies, all
  dispatched) — all pass.

Not re-verified here (sandbox limits): `typecheck:api`/dashboard typecheck
(needs >2 GB RAM for the full Next.js program) and the Electron/Docker builds.
Run those in CI.

## Rebase procedure

```bash
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
git fetch upstream
git rebase upstream/release/v3.8.5x   # conflicts expected only in:
                                      #   .env.example, docker-compose.yml,
                                      #   ENVIRONMENT.md rows, combo schema,
                                      #   docs/openapi.yaml (path block)
```

The fork's code footprint is deliberately small and additive (one new module
### 5s. B16.1 — The Hermes integration surface completed (`feat(harness)`)

The Hermes-side counterpart guide arrived (27 sections, committed verbatim
at `docs/guides/Hermes_Revised_Intelligent_Agent_Integration_Guide.md`).
Its §22 integration surface has four items; three already shipped and this
build closes the fourth:

1. **Client/provider integration** — OmniRoute speaks OpenAI-compatible
   `/v1/chat/completions`; Hermes adds it as a provider. *(shipped, upstream)*
2. **Optional /route query** — `POST /v1/route` compact decision, B16.
3. **Execution-policy instruction** — client-side (Hermes profile/SOUL);
   the fork's counterpart rule ships in `AGENT_TOOL_GUIDE` (B16, verbatim).
4. **Structured outcome callback** — **this build**: `POST /v1/router/outcomes`
   records client-side Bot executions into workflow memory; `GET ?workflow=`
   reads the per-(workflow, model, tools) history back. Bot Mode is a Hermes
   profile (pinned model, own memory/skills/tools) executing in the client
   runtime — §26: *OmniRoute may select the Bot's underlying model but does
   not orchestrate the research* — so outcomes arrive by callback, not
   observation. `coerceWorkflowOutcome` validates without inventing fields
   (finite ≥ 0 numerics, `quality_score` clamped 0..1, optional booleans);
   workflow memory only, never model benchmarks.

Surface: `open-sse/services/harness/workflowMemory.ts` (+`coerceWorkflowOutcome`),
`src/app/api/v1/router/outcomes/route.ts` (GET/POST), openapi (both copies),
AGENT_TOOL_GUIDE row, USAGE §15, guide verbatim. Verified against Hermes
Desktop ≥ v0.20.3 (Bot Mode bundled default-on; a bot IS a Hermes profile
with pinned provider/model; Agent-Inbox bot-to-bot messaging; group rooms
2–6 bots; routines via Hermes cron; Camofox local mode = client-side
anti-detection browser backend, no CDP — exactly the fork's
`execution: "client"` Level-0 tool).

### 5t. B16.2 — The spawn plan: embodiment on native Bot Mode (`feat(harness)`)

First live report: parallel model calls work (brains), but bodies don't
exist yet. Bodies are Hermes-side by design — a body IS a native Bot Mode
bot (a Hermes profile), so this build translates agent escalation into a
plan FOR that surface, verified against NousResearch/hermes-agent source
& docs (Desktop ≥ v0.20.3, bundled plugin `apps/desktop/src/plugins/hermes-bots/`):

- `spawnPlanner.ts` (pure) — every field maps to a native capability:
  `hermes profile create <name> --description` (+`--no-skills`/`--clone-from`),
  Advanced **Model & provider pin**, per-toolset/skill enablement, Hindsight
  `bank_id`, group rooms **2–6 bots / ≤3 rounds / ≤10 msgs** with @name/@user,
  Bot Chat CLI handoffs (`hermes -p <bot> chat --in ~ -c "Bot Chat" -Q -q`),
  `[bot:<name>]` cron routines, B16.1 outcome callback.
- Structure: parallelizable → fan-out wave (workers) + synthesis wave
  (judge); sequential → ordered single-body waves, inbox handoffs. Judge =
  primary model; workers spread across the tiered pool (one provider can't
  sink the room — B9 keys on provider). Null unless `path === "agent"` —
  a body is justified by task shape, never default (CORE.md §6).
- `examples/hermes-embodiment/` — the Hermes-side recipe: spawn-from-plan.sh
  (create → dispatch → report; dry-run default, `--apply` is the human
  decision, `--report` closes the loop).
- Surface: execution route gains `spawn_plan` (agent path only); openapi
  description updated; 5 new tests (18/18).

directory, ~30 lines in `dispatchPrelude.ts`, one schema block, one route
file, two registry type annotations) to keep rebases mechanical. Changelog
fragments are intentionally not added to `changelog.d/` — this file is the
fork's changelog; drop the commits upstream as PRs if you want them landed
and let the fragments come from the PR numbers.
