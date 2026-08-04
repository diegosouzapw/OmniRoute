# Issue-Agent Executable Triage: Testing Strategy

Machine status: `in_progress`

## QA Matrix

| qa_id  | AC           | scenario                                                            | command                                                                                    | expected                                              | observed                                | status        | evidence_sha |
| ------ | ------------ | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------- | --------------------------------------- | ------------- | ------------ |
| QA-001 | prerequisite | request schema validation                                           | `npm run check:route-validation:t06`                                                       | all routes pass                                       | 535 routes scanned; pass                | pass          | `a4378a26d`  |
| QA-002 | AC1          | selected provider/model/policy reaches normal chat-completions seam | `bun test tests/unit/issue-agent-runs-route.test.ts`                                       | captured request uses configured routing inputs       | not implemented                         | pending       | `e6a`        |
| QA-003 | AC2          | run lifecycle persists input, output, usage, terminal error         | `bun test tests/unit/issue-agent-audit.test.ts tests/unit/issue-agent-runner.test.ts`      | durable records for every terminal state              | not implemented                         | pending       | `e6a`        |
| QA-004 | AC3          | successful execution returns actionable triage output               | `bun test tests/unit/issue-agent-runner.test.ts tests/unit/issue-agent-runs-route.test.ts` | output derives from routed execution, not placeholder | not implemented                         | pending       | `e6a`        |
| QA-005 | AC4          | provider/model failure                                              | `bun test tests/unit/issue-agent-runner.test.ts`                                           | failed lifecycle and sanitized error persisted        | missing coverage                        | pending       | `e6a`        |
| QA-006 | AC4          | timeout                                                             | `bun test tests/unit/issue-agent-runner.test.ts`                                           | timed-out lifecycle and terminal error persisted      | missing coverage                        | pending       | `e6a`        |
| QA-007 | AC4          | budget stop                                                         | `bun test tests/unit/issue-agent-runner.test.ts`                                           | budget stop is explicit and persisted                 | missing coverage                        | pending       | `e6a`        |
| QA-008 | release      | core type safety                                                    | `npm run typecheck:core`                                                                   | pass                                                  | pending rerun after dependency recovery | pending       | `e6a`        |
| QA-009 | release      | whitespace integrity                                                | `git diff --check origin/main...HEAD`                                                      | no errors                                             | passed before remote rewrite            | pass/reverify | `a4378a26d`  |

## Test Rules

Tests must mock only the external provider boundary. AC1 must exercise the in-process `POST` export from `src/app/api/v1/chat/completions/route.ts` so admission, policy, translator initialization, and routing remain in the execution path. Each terminal outcome asserts both API behavior and persisted audit state.

## Evidence Requirements

Before a WBS item is marked complete, record the exact command output, commit SHA, test identifiers, and whether the test environment had a lockfile-compatible dependency set. The current recovered environment has incomplete dependencies due to `npm ci` disk exhaustion; no pending test may be reported as passing until rerun.
