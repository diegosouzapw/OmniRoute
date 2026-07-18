# Issue-Agent Executable Triage: Implementation Strategy

Machine status: `in_progress`

## Phase Plan

| phase | work package                                                | dependency        | exit evidence                                                           | status        |
| ----- | ----------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------- | ------------- |
| P1    | verify/finish routing-policy contract and failure semantics | existing AC1 seam | actual chat route test proves policy consumption and non-2xx mapping    | `in_progress` |
| P2    | introduce durable execution lifecycle persistence           | P1                | records transitions, request/prompt, output, accounting, terminal error | `pending`     |
| P3    | normalize actionable triage result                          | P2                | stable API result schema derived from completion                        | `pending`     |
| P4    | implement terminal outcome controls                         | P2                | provider failure, timeout, budget stop transition tests                 | `pending`     |
| P5    | release validation and PR review                            | P1-P4             | focused tests, route gate, relevant typecheck/CI evidence               | `pending`     |

## Architecture

1. Keep `src/app/api/issue-agent/runs/route.ts` as the API adapter: validation,
   feature gate, and response formatting only.
2. Keep the standard chat `POST` as the routing boundary; do not add a parallel
   provider invocation path.
3. Extract lifecycle persistence and result normalization into focused
   `src/lib/issueAgent/` modules. Do not overload the existing pre-execution audit
   writer with unrelated transport behavior.
4. Use typed execution outcomes so provider failure, abort/timeout, and budget
   termination are distinguishable before HTTP mapping and persistence.
5. Add tests from the actual route down to a mocked external provider boundary;
   use unit tests for pure normalization and lifecycle state transitions.

## Quality Controls

| control            | command or review                                     | threshold                                                  |
| ------------------ | ----------------------------------------------------- | ---------------------------------------------------------- |
| route contract     | `npm run check:route-validation:t06`                  | pass                                                       |
| AC1 route behavior | focused `bun test` issue-agent route/execution suites | policy and provider/model assertions pass                  |
| AC2-AC4            | lifecycle/result/terminal-outcome suites              | all required states persist and API matches                |
| static safety      | `npm run typecheck:core`                              | distinguish new failures from existing `omniglyph` blocker |
| patch integrity    | `git diff --check origin/main...HEAD`                 | pass                                                       |
