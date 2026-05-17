---
title: "Evaluations (Evals)"
version: 3.8.0
lastUpdated: 2026-05-13
---

# Evaluations (Evals)

> **Source of truth:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Last updated:** 2026-05-13 — v3.8.0

OmniRoute ships a generic evaluation framework you can use to benchmark routing
configurations, single providers/models, or the bundled "golden set" suites.
Use it to verify routing changes, validate new providers, and gate releases
before promoting them to production traffic.

The framework is implemented as:

- A pure runner (`src/lib/evals/evalRunner.ts`) that registers in-memory
  built-in suites, evaluates outputs against expected criteria, and aggregates
  scorecards.
- A persistence layer (`src/lib/db/evals.ts`) for custom (user-defined) suites
  and historical runs in SQLite.
- An orchestration layer (`src/lib/evals/runtime.ts`) that executes each case
  by dispatching real calls to `POST /v1/chat/completions`, captures latency
  and outputs, and persists the run.
- REST endpoints under `/api/evals/*` (management-auth only).
- A dashboard surface at `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Concepts

### Suite

A suite is a named collection of test cases with a `description` and one or
more cases. Suites come from two sources:

| Source     | Where defined                                 | Mutable at runtime? |
| ---------- | --------------------------------------------- | ------------------- |
| `built-in` | Registered via `registerSuite()` at boot      | No (code-defined)   |
| `custom`   | Stored in SQLite `eval_suites` + `eval_cases` | Yes (via API/UI)    |

The current built-in suites (see `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 baseline cases across greeting/math/translation/safety
- `coding-proficiency` — Python/JS/SQL/TS/bug detection
- `reasoning-logic` — syllogisms, word problems, pattern recognition
- `multilingual` — translation and language detection
- `safety-guardrails` — PII, jailbreak, refusal, bias awareness
- `instruction-following` — JSON-only, numbered lists, language constraints
- `codex-comparison` — head-to-head coding tasks intended for compare mode

### Case

Each case carries:

| Field      | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| `id`       | Stable identifier (used to key outputs and metrics)          |
| `name`     | Human-readable label                                         |
| `model`    | Default model when the run uses `suite-default` targeting    |
| `input`    | `{ messages, max_tokens? }` — sent to `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — scoring rubric (see below)           |
| `tags`     | Optional labels (e.g. `safety`, `pii`, `jailbreak`)          |

### Target

The same suite can be run against different targets. The target schema is
`evalTargetSchema` in `src/shared/validation/schemas.ts`:

| Target type     | `id`       | Behavior                                                        |
| --------------- | ---------- | --------------------------------------------------------------- |
| `suite-default` | `null`     | Each case uses its built-in `model` field                       |
| `model`         | model name | Force every case through one direct model (e.g. `gpt-4o`)       |
| `combo`         | combo name | Run every case through one combo (exercises the routing engine) |

For `model` and `combo`, the `id` field is required (enforced by Zod
`superRefine`). When `compareTarget` is provided, both targets must differ —
the runner persists both runs under the same `runGroupId` for A/B comparison.

## Scoring Rubrics

Implemented in `evaluateCase()` (evalRunner.ts):

| Strategy   | Pass when…                                                           |
| ---------- | -------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                    |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`  |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` is truthy            |
| `custom`   | `expected.fn(actualOutput, evalCase)` returns truthy (built-in only) |

**Note:** Custom-function scoring is reserved for code-defined (built-in)
suites because functions cannot be serialized through the API. The
`evalCaseBuilderSchema` only accepts `contains | exact | regex` for
user-created suites.

There is no LLM-as-judge or embedding-based similarity scorer today — it would
be a clean extension point in `evaluateCase()`.

## Database Schema

Three tables (migrations `030_create_eval_runs.sql` and
`031_create_eval_suites.sql`):

| Table         | Purpose                                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Custom suite metadata (`id`, `name`, `description`)                                                                          |
| `eval_cases`  | Cases per suite — `input_json`, `expected_*`, `tags_json`                                                                    |
| `eval_runs`   | Historical runs — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Built-in suites are **not** stored in the DB. They live in memory and are
re-registered every time `evalRunner.ts` is imported.

## REST API

All endpoints require management auth (`requireManagementAuth`) — they are not
part of the public proxy surface.

| Endpoint                      | Method   | Description                                                   |
| ----------------------------- | -------- | ------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | List suites + recent runs + scorecard + targets + keys        |
| `/api/evals`                  | `POST`   | Run a suite (single or compare) — schema `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Fetch one suite (built-in or custom)                          |
| `/api/evals/suites`           | `POST`   | Create a custom suite — schema `evalSuiteSaveSchema`          |
| `/api/evals/suites/{suiteId}` | `GET`    | Fetch a custom suite                                          |
| `/api/evals/suites/{suiteId}` | `PUT`    | Replace a custom suite (cases get re-inserted)                |
| `/api/evals/suites/{suiteId}` | `DELETE` | Delete a custom suite and its cases                           |

### Running a suite

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

Optional fields:

- `outputs` — `Record<caseId, string>` of pre-computed outputs. When provided,
  the runner **skips dispatch** and only scores the cached outputs (useful for
  offline evaluation).
- `compareTarget` — second target to run in parallel; both runs share a
  generated `runGroupId` for head-to-head viewing.
- `apiKeyId` — internal API key used to authenticate the dispatched
  `/v1/chat/completions` calls. Required when `REQUIRE_API_KEY` is enabled.

### Creating a custom suite

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Dispatch Pipeline

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Resolves the suite (built-in or custom).
2. For each case, builds a `Request` to `/v1/chat/completions` with the case's
   `messages`, the resolved `model`, `stream: false`, and `max_tokens: 512`
   (or the case override).
3. Calls the chat handler directly (in-process — no extra HTTP hop).
4. Captures latency and extracts text from either `choices[0].message.content`
   or the Responses-API `output[]` payload.
5. Scores all outputs via `runSuite()`, then persists via `saveEvalRun()`.

Cases run **sequentially**. There is no concurrency flag today.

## Dashboard

The UI lives at `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). From there you
can:

- Browse built-in and custom suites with case-by-case preview.
- Create/edit/delete custom suites with the case builder.
- Pick a target (suite defaults / model / combo), optionally a second
  `compareTarget`, optionally an API key, then run on demand.
- Inspect run history, per-case pass/fail, latency, and captured outputs.
- See the rolling scorecard aggregated across the latest run per
  `(suite, target)` scope.

## Relationship with the Auto-Assessment RFC

A separate, narrower assessment subsystem lives at `src/domain/assessment/`
(see also [AUTO-COMBO.md](../routing/AUTO-COMBO.md) for the live scoring engine).
That subsystem targets the Auto Combo engine — automatically scoring providers and
models so combos can self-heal when upstreams fail. It uses its own runner,
its own categorizer, and its own scoring logic.

The Evals framework documented here is the **broader, general-purpose
testing surface**. Prefer it for arbitrary regression suites, A/B comparisons,
and per-release smoke tests. Use the Auto-Assessment subsystem when you need
real-time provider health to influence routing decisions.

## CI Integration

There is no dedicated `eval:ci` npm script today. Two paths if you want to
gate releases on eval results:

- **HTTP path**: stand up the server, hit `POST /api/evals` with a known
  `suiteId` + `target`, and assert `runs[].summary.passRate >= N` in the
  response.
- **In-process path**: import `runEvalSuiteAgainstTarget()` from
  `@/lib/evals/runtime` from a script, run against a test DB, and check the
  returned `PersistedEvalRun.summary`.

Tests covering the route and history live at
`tests/unit/evals-route.test.ts` and `tests/unit/evals-history.test.ts`.

## Extension Points

Common changes and where to make them:

- **New scoring strategy** — extend the `switch (evalCase.expected.strategy)`
  block in `evaluateCase()` (`evalRunner.ts`) and widen `EvalCaseStrategy` in
  `src/lib/db/evals.ts` plus `evalCaseBuilderSchema` in `schemas.ts`.
- **New built-in suite** — define a suite object and call `registerSuite()` at
  the bottom of `evalRunner.ts`. It will be auto-discovered by `listSuites()`.
- **Run with concurrency** — change the sequential `for` loop in
  `runEvalSuiteAgainstTarget()` to a bounded `Promise.all` (no concurrency
  control exists today).
- **Stream/tool-call cases** — currently the runner forces `stream: false`.
  Streaming or tool-aware evaluation would require changes in `runtime.ts`
  (capture and aggregate SSE chunks before scoring).

## See Also

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — overall product walkthrough
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — request pipeline reference
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo scoring engine (live runtime)
- Source: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
