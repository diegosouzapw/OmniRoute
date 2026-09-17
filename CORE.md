# CORE.md — the design constitution of the Hermes × OmniRoute harness

> **Read this before ANY upgrade, rebase, or agent-driven modification.**
> It records why the system is shaped the way it is, which rules are
> load-bearing, and how to verify nothing broke after a change. If a
> change contradicts this file, the change is wrong — or this file must be
> consciously amended first, in its own commit, with a reason.

State at last amendment: `fork/parallel-execution` @ `2b1f790` (B16.1) ·
31 commits over upstream base `f9a1cc8` · 162 files +26,749/−115 ·
gates green (services 553/553 · tsc 0 @ 41 files · openapi 714/719, 99.3%).

---

## 1. The system in one paragraph

**Hermes is the executive. OmniRoute is the model federation. Bots are
specialists.** Hermes receives the task, decides *whether* it needs help
(most tasks it does itself), asks OmniRoute *who* is best when delegation
is justified, and runs specialists — including its own dynamic Bot swarm —
client-side when a task is long, specialized, parallelizable, or sustained.
OmniRoute never decides anything about *if/when* to delegate; Hermes never
overrides OmniRoute's evidence about *which model* is good. The two guides
(routing + Hermes integration, committed verbatim under `docs/guides/`)
are the authoritative long-form versions of this paragraph.

## 2. The four actors

| Actor | Role | Decides | Never decides |
|---|---|---|---|
| **Hermes** (executive) | Task intake, decomposition, self-execution | IF and WHEN to delegate; order of execution | Which model is better (asks the router) |
| **OmniRoute** (fork, this repo) | Model federation + advisory routing + registries | WHICH model/tool/agent, by evidence | Whether to delegate (advisory only) |
| **Bots** (Hermes profiles) | Persistent named specialists, client-side runtime | Their own skill/tool use within a delegation | Their own underlying model (pinned via router advice) |
| **Tools** (camofox, openwork, web_search…) | Execution environments | Nothing — they execute | Anything about ranking |

Boundary sentence (guide §26, load-bearing): **"OmniRoute may select the
Bot's underlying model but does not orchestrate the research."** The
`agentRegistry` implements this as `modelAlias` — the agent's model is
resolved by the router at runtime, never hardcoded.

## 3. Prime directives — non-negotiable

1. **Hermes is sovereign.** Recommendations are not decisions. The router
   advises; Hermes (or its policy instruction) chooses. Nothing in the
   fork may auto-delegate on Hermes's behalf.
2. **The routing engine is the authority on relative model quality.** No
   hardcoded provider preferences, ever. Rankings come from the versioned
   registry + closed-loop empirical stats, refreshed at boot and by cron.
3. **Three registries, never mixed.** Models (capability evidence),
   tools (execution environments), agents (model + tools + capabilities).
   Tools and agents are execution capabilities — **never ranked against
   models** and never inside the model scoring system. The router keeps
   capability *metadata* for tools/agents but does **not** implement
   their runtimes — Bot Mode is client-side execution ("we don't rebuild
   our own tools").
4. **Total abstraction.** No model or tag selection is ever surfaced to
   the user. Hermes-side, the user says *what* they want; the system
   resolves *who* does it.
5. **Client-side stays client-side.** Tools marked `execution: "client"`
   (camofox, openwork) run in Hermes's runtime. OmniRoute advises, never
   executes them. Camofox-direct-to-Hermes is the **Level-0 advantage**;
   web-research agents are the escalation, not the default.
6. **Workflow outcomes are not model benchmarks.** Web/research quality
   is measured per `(workflow, model, tools)` — sources found/verified,
   synthesis quality, latency — never folded into model leaderboard
   scores.
7. **Infra failures ≠ quality failures.** The failure taxonomy separates
   them (incl. `TOOL_FAILURE` since B16). A bare failure after honest
   attempts is still a quality signal (B15); exclusions are evidence-based.
8. **Zeroed evidence is never invented.** If nothing was measured, the
   stat is `null`, not 0.
9. **Admission limits ≥ 2** (e.g. matching active agent count) — explicit
   owner constraint. Never lower.
10. **Self-execution is the default, swarm is exceptional.** Most tasks
    finish at delegation levels 0–1. Never spawn a swarm for a task one
    actor can do.

## 4. The execution rule (verbatim — keep verbatim)

> **HERMES_EXECUTION_RULE**: "Tools are preferred for short, direct
> operations. Agents are preferred for extended, parallelizable,
> specialized, or multi-step operations. Models are selected based on
> task-specific capability evidence. Self-execution is preferred when
> expected quality is sufficient and delegation cost is not justified."

And the guide's core principle:

> "If Hermes can do the task well enough, do it. If a specialist provides
> meaningful advantage, use OmniRoute. If the task is long, specialized,
> parallelizable or sustained, delegate to a Hermes Bot/agent."

## 5. The delegation ladder

Guide §13 levels — most tasks finish at 0/1:

| Level | What | Example |
|---|---|---|
| 0 | Self-execution (+ direct tool use, e.g. camofox browse) | "Read this page and summarize" |
| 1 | One specialist via a cheap `/v1/route` query | "Verify this claim against sources" |
| 2 | A few specialists, sequenced | Research → draft → check |
| 3 | Orchestrated parallel swarm (waves, dependencies respected) | "Survey 15 competitors" |
| 4 | Full swarm + judge — exceptional | Huge, decomposable, sustained |

The B16 pure-code ladder (in `executionRouter.ts`), driven by task depth
(`requiresFreshInformation = type==="search" || explicit`;
`durationEstimate = complexity==="deep" ? "long" : "short"`):

```
!fresh                          → model
fresh + browser + short         → tool      (Level-0: browse yourself)
fresh + long/parallelizable     → agent     (escalation)
fresh + no matching agent       → tool-fallback
fresh + nothing available       → model     (search-capable)
```

## 6. Swarm semantics — parallel AND sequential, never random

Hermes spawns **dynamic Bots** (each a Hermes profile) which form agent
swarms. The ordering rule is structural, not vibes:

- **Parallel** when subtasks are independent (B3 waves; B10
  `objectives/spawn/wait` — children of one objective run simultaneously).
- **Sequential / any order** when dependencies exist — wave N+1 consumes
  wave N's outputs (B3.5 blackboard shares state; the judge scores).
- **Bodies are planned, not executed.** The fork emits a `spawn_plan`
  (B16.2, on `/v1/router/execution` when the ladder escalates to agent)
  mapped 1:1 to native Bot Mode surface — profile create, model pin, Bot
  Chat handoffs, group rooms, `[bot:]` cron routines. Hermes Bot Mode
  spawns the bodies in its own runtime; OmniRoute never does.
- - **Never random reliance on swarm.** Parallelism follows dependency
  structure, not enthusiasm. A swarm is justified only by task shape
  (long + parallelizable + specialized), never by default.
- **And Hermes does tasks itself** whenever expected quality is
  sufficient and delegation cost isn't justified (prime directives 1/10;
  B15 delegation gate: specialist advantage < 5 points → self).

## 7. The model federation (~40 models)

Design target: **~40 models admitted across providers**, chosen by what
they're good at. How the federation holds that many without rot:

- **Provider identity = the connection, never the vendor.** A model's
  `provider` is the configured upstream that transports the request
  (`openrouter`, `kiro`, …) — NOT the model's vendor (`openai`,
  `anthropic`). The vendor is namespace/metadata only. If `gpt-xx` shows
  provider "openai", the model is sitting under a vendor-typed provider
  entry — move it under the aggregator's provider type. This is
  load-bearing: the breaker (B9), leases (B5), and the bias-guard calling
  basis (B11) all key on provider identity; a vendor label there would
  fuse unrelated connections into one fake provider and trip the wrong
  breaker. (Verified 2026-09-14: OmniRoute labels by provider type
  everywhere — catalog `owned_by`, tag index, rankings — so the label
  always tells you which connection serves the model.)
- **Registry-driven admission** — benchmark-gated, versioned; refreshed at
  boot and by cron; deprecated models are *deleted* on refresh (no zombie
  entries). The registry is local at decision time.
- **Evidence hierarchy** (most valuable first): runtime performance →
  refreshed benchmarks → static facts. Closed-loop empirical stats beat
  leaderboards (B12/B13).
- **Tiered candidates with FULL fallback visibility** — primary,
  secondary, fallback are all visible to Hermes; equal scores →
  self-selection allowed (B12).
- **Bias guard** — when Hermes's own model equals the sub-agent candidate
  model, `bias_tolerance` 0.85 applies; calling basis = category +
  benchmark + provider/model identity (B11).
- **Survivability** — allocator + leases (B5), cost budgets
  `max_total_tokens` (B6), provider breaker at 0.2× success (B9),
  provider failover, compression + canaries (B8).
- **Entrypoints** — B1 classifier + aliases; B7 modality routing
  (vision/audio/etc. before text ranking); B14 embeddings classification
  via provider `/v1/embeddings` (admit at ≥ 0.30 similarity AND ≥ 0.03
  margin; centroid cache 6h, LRU 256).
- **Transport** — upstream's concurrency throttling was the bottleneck;
  PR #4288 (transport patch) is applied and must survive every rebase.
- **Cheap query surface** — `POST /v1/route` `{task}` →
  `{primary, secondary, fallback, confidence}` (guide §10 fast path;
  routing cache B15). Nothing forces a full candidates call for a
  Level-1 lookup.

## 8. Memory & evidence

- **Workflow memory** (`workflowMemory.ts`): key
  `workflow | model(??*) | sortedTools`; aggregates attempts, success
  rate, avg sources found/verified, quality, latency. History is
  best-evidence-first (quality × log-volume). Surfaced on
  `/v1/router/execution` and read back via `GET /v1/router/outcomes`.
- **Outcome callback** (B16.1): Bots execute client-side, so they close
  the loop themselves — `POST /v1/router/outcomes` (§17/§22.4).
  `coerceWorkflowOutcome` validates without inventing fields; numerics
  finite ≥ 0; `quality_score` clamped 0..1; malformed → 400 with reason.
- **Model stats** (`ModelStat`): reputation/quality from observed
  outcomes, `success_rate` snake_case in API surfaces, infra failures
  tracked separately so they don't poison quality scores.
- **Deterministic evaluator (B18, queued)**: OCR → expected fields
  present; code → tests pass; JSON → schema valid; tool call →
  succeeded. Verification failure = model failure. Judge (B3.5) only for
  genuinely difficult cases.

## 9. API surface map

| Endpoint | Purpose | Build |
|---|---|---|
| `POST /v1/chat/completions` | OpenAI-compatible serving (how Hermes connects as a provider) | upstream |
| `POST /v1/route` | Compact decision `{task}` → ranked trio + confidence (`?evidence=true` adds matrix) | B16 |
| `GET/POST /v1/router/candidates` | Self-assessment: full pool + tiers + advisory profile + registry version | B12/B13 |
| `POST /v1/router/refresh` | Force registry refresh (cron/worker friendly) | B13 |
| `GET/POST /v1/router/execution` | Who/WHAT can accomplish this — ladder + tools + agents + workflow evidence | B16 |
| `GET/POST /v1/router/outcomes` | Structured outcome callback (record client-side Bot runs; read history) | B16.1 |
| `POST /v1/embeddings` | Embedding source for classification | B14 |
| `POST /v1/quick` | Quick path | B2 |

## 10. Hermes-side facts (verified, client-side reality)

- A **Bot IS a Hermes profile** (`~/.hermes/profiles/<id>/`): own config,
  memory (Hindsight banks, `bank_id` = recall boundary), skills,
  credentials, chat history, **pinned provider/model**, SOUL.md persona,
  per-skill/per-toolset enablement. Bundled default-on since Desktop
  v0.20.3. No new storage layer, no core patches.
- Bot-to-bot via persistent **Agent Inbox**; group rooms cap 2–6 bots,
  ≤ 3 serial rounds; **routines** via Hermes cron.
- **Camofox local mode** is an official browser backend (Firefox fork,
  C++ fingerprint spoofing, no CDP) — exactly our `execution: "client"`
  Level-0 tool.
- No new sandboxing — bots carry normal Hermes system access (Hermes-side
  concern; the fork adds nothing to it).
- Hermes-side do-not-change list (guide §21): agent loop, tool framework,
  Bot runtime/profiles, memory, messaging, browser integration, provider
  abstraction. We integrate; we do not patch Hermes core.

## 11. Extension playbook (for agents modifying this system)

**Add a model** → registry refresh + benchmarks + admission (limits ≥ 2).
Never hardcode a provider preference anywhere. Deprecation is automatic
on refresh — don't hand-delete.

**Add a tool** → `toolRegistry` entry: `{id, capabilities, execution:
"client"|"native"}`. It must NOT appear in any model ranking path.
Capability matching is superset-based.

**Add an agent** → `agentRegistry` entry: `{id, modelAlias, tools,
capabilities}`. Model resolves at runtime via the router — never pin a
model string in the agent.

**Add a workflow** → outcomes already flow generically through
`POST /v1/router/outcomes`; evidence surfaces on `/v1/router/execution`.

**Add a routing strategy** (e.g. B17 `intelligent`) → `routingStrategies`
dispatch + validation + UI are upstream core; do it as a contained build
with full typecheck, not a drive-by edit.

**Every change, no exceptions:**
1. Tests colocated as `tests/unit/services/harness-bN.test.ts` (naming
   convention; no `@/` aliases in tests).
2. `tsconfig.harness-check.json` — add new TS files to `files`.
3. OpenAPI: BOTH `docs/openapi.yaml` and `public/openapi.yaml`, inserted
   before `components:`.
4. Docs: FORK.md §5x subsection + JOURNEY.md section + USAGE.md /
   AGENT_TOOL_GUIDE.md rows. This file if design-level.
5. Commit → push `fork/parallel-execution` → verify live via GitHub API —
   same turn.
6. Artifacts: numbered patch, changed-files snapshot, `EXPECTED_HEAD`,
   docs mirrors, README/journey/roadmap in `omniroute-fork/`.

## 12. Verification gates (run after ANY modification)

```bash
export PATH="/work/node-v22.23.2-linux-x64/bin:$PATH"
cd /work/omniroute

# 1. scoped suite (fast) — full sweep is the CI gate
DISABLE_SQLITE_AUTO_BACKUP=true node --max-old-space-size=2400 \
  --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts \
  --import ./tests/_setup/isolateDataDir.ts --test --test-concurrency=4 \
  --test-force-exit tests/unit/services/<harness-bN>.test.ts

# 2. types (real tsc, not a linter)
npx tsc -p tsconfig.harness-check.json          # 0 errors @ 41 files

# 3. API coverage
node scripts/check/check-openapi-coverage.mjs   # ≥ 99% (714/719)

# 4. full services sweep before a push
... --test tests/unit/services/*.test.ts        # 553/553 @ B16.1
```

Green means: tests pass, types clean, every route documented, tree
committed, GitHub HEAD == local HEAD.

## 13. Build ledger (what each B means)

| Build | One-liner |
|---|---|
| B1 | Task classifier + aliases |
| B2 | `/v1/quick` quick path |
| B3 | Orchestrator waves (dependency-ordered parallelism) |
| B3.5 | Blackboard + judge |
| B4 | Hermes NIM contract |
| B5 | Allocator + leases |
| B6 | Cost budgets (`max_total_tokens`) |
| B7 | Multimodal dispatch |
| B8 | Compression + canaries + auto |
| B9 | Provider breaker (0.2×) |
| B10 | Objective orchestration (objectives/spawn/wait) |
| B11 | Lenient bias guard (0.85) + guides |
| B12 | Capability registry: unifiedScore, tiers, full fallback visibility |
| B13 | Advisory candidates + versioned registry + `/v1/router/refresh` |
| B14 | Embeddings classification (provider `/v1/embeddings`) |
| B15 | Decision layer: taxonomy, delegation gate (<5pts → self), routing cache |
| B16 | Three-registry separation + `/v1/router/execution` + `/v1/route` + execution rule |
| B16.1 | Hermes outcome callback + guide verbatim (§22 complete) |
| B17 *(queued)* | `intelligent` combo routing strategy |
| B18 *(queued)* | Deterministic evaluator (verification failure = model failure) |

Backlog: scoring-weight config; Guide 2 Part 8 live-client rows;
vision-input judge. Parallel track (not this line): OpenDev builds 1/3/4.

## 14. Authoritative documents

- `docs/guides/OmniRoute_Revised_Intelligent_Routing_Guide.md` — 20
  sections, committed **verbatim** (the router-side design)
- `docs/guides/Hermes_Revised_Intelligent_Agent_Integration_Guide.md` —
  27 sections, committed **verbatim** (the executive-side design)
- `FORK.md` — the fork's changelog (§5a–§5s per build)
- `docs/guides/JOURNEY.md` — build-by-build narrative + scars
- `docs/guides/AGENT_TOOL_GUIDE.md` — the counterpart execution-policy
  text Hermes embeds (rule verbatim)
- `docs/guides/USAGE.md` — every endpoint with curl examples
- `HARNESS_ROADMAP.md` (artifact side) — shipped/queued/backlog state

When this file and any other document disagree, this file wins for
design intent; the guides win for wording; code wins for what exists
today — fix the loser in the same commit.
