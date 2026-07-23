# Issue-Agent Executable Triage: DAG and WBS

Machine status: `in_progress`

| id      | phase       | acceptance criterion                                             | status   | source paths                                                                        | test paths                                                                           | evidence_sha                | depends_on                |
| ------- | ----------- | ---------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------- | ------------------------- |
| WBS-001 | contract    | AC1-AC4                                                          | complete | `src/app/api/issue-agent/runs/route.ts`                                             | `tests/unit/issue-agent-runs-route.test.ts`                                          | `a4378a26d`                 | -                         |
| WBS-002 | execution   | AC1: execute through normal chat-completions routing/policy seam | pending  | `src/app/api/issue-agent/runs/route.ts`; `src/app/api/v1/chat/completions/route.ts` | `tests/unit/issue-agent-runs-route.test.ts`                                          | `e6a` (reconciled baseline) | WBS-001                   |
| WBS-003 | persistence | AC2: persist lifecycle, input, output, usage, and terminal error | pending  | `src/lib/issueAgent/*`; `src/app/api/issue-agent/runs/route.ts`                     | `tests/unit/issue-agent-audit.test.ts`; `tests/unit/issue-agent-runner.test.ts`      | `e6a` (reconciled baseline) | WBS-002                   |
| WBS-004 | result      | AC3: return an actionable triage result from execution           | pending  | `src/lib/issueAgent/*`; `src/app/api/issue-agent/runs/route.ts`                     | `tests/unit/issue-agent-runner.test.ts`; `tests/unit/issue-agent-runs-route.test.ts` | `e6a` (reconciled baseline) | WBS-002, WBS-003          |
| WBS-005 | acceptance  | AC4: cover success, provider failure, timeout, and budget stop   | pending  | `src/lib/issueAgent/*`                                                              | `tests/unit/issue-agent-*.test.ts`                                                   | `e6a` (reconciled baseline) | WBS-002, WBS-003, WBS-004 |
| WBS-006 | release     | PR validation and maintainer review                              | pending  | `.github/workflows/*`                                                               | CI checks                                                                            | `a4378a26d`                 | WBS-005                   |

## Dependency Graph

`WBS-001 -> WBS-002 -> WBS-003 -> WBS-004 -> WBS-005 -> WBS-006`

`a4378a26d` is a prerequisite validation repair: it validates the issue-agent request body through the shared route validator and passes `npm run check:route-validation:t06` (535 routes). It does not satisfy AC1-AC4.

## Machine Evidence Contract

Every WBS item must maintain: `id`, `acceptance_criterion`, `status`, `source_paths`, `test_paths`, `command`, `expected`, `observed`, `evidence_sha`, `updated_at`, and `pr_url`.

PR: `https://github.com/diegosouzapw/OmniRoute/pull/7002`  
Issue: `https://github.com/diegosouzapw/OmniRoute/issues/5980`
