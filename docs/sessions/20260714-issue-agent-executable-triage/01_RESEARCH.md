# Issue-Agent Executable Triage: Research

Machine status: `complete_for_current_phase`

## In-Repository Findings

| research_id | source                                           | finding                                                                                                                                            | consequence                                                                                        |
| ----------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| RES-001     | `src/app/api/issue-agent/runs/route.ts`          | the endpoint validates body, rejects unsupported mode/disabled execution, builds recorded context, writes audit JSONL, then delegates non-dry runs | execution behavior is centralized at the issue-agent route                                         |
| RES-002     | `src/app/api/v1/chat/completions/route.ts`       | standard chat entrypoint exports `POST` and owns the normal chat request path                                                                      | AC1 must exercise this export rather than a fake internal seam                                     |
| RES-003     | `src/lib/issueAgent/execution.ts`                | provider and model are resolved into the chat request; policy is only encoded as `X-OmniRoute-Mode`                                                | an implementation review must establish that this header is a consumed routing-policy contract     |
| RES-004     | `src/lib/issueAgent/audit.ts`                    | audit persistence occurs before execution and writes run context/steps only                                                                        | AC2 is unsatisfied: no transition, completion, usage/cost/runtime, or terminal-error record exists |
| RES-005     | `tests/unit/issue-agent-route-execution.test.ts` | live route test initializes isolated DB, calls the actual issue-agent `POST`, and mocks only `globalThis.fetch` at provider boundary               | strong AC1 path evidence, but it verifies success only and does not prove policy consumption       |

## Validation Evidence

| evidence_id | command                                                                                                                                      | observed                                                      | scope                                                 | evidence_sha |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------- | ------------ |
| EVD-001     | `bun test tests/unit/issue-agent-execution.test.ts tests/unit/issue-agent-route-execution.test.ts tests/unit/issue-agent-runs-route.test.ts` | prior focused run reported green                              | AC1 focused path                                      | `fa2c1d7c6`  |
| EVD-002     | `npm run check:route-validation:t06`                                                                                                         | prior run reported pass                                       | request route validation                              | `e6a63eb33`  |
| EVD-003     | `npm run typecheck:core`                                                                                                                     | unresolved `omniglyph` declarations outside issue-agent paths | release gate blocked by pre-existing unrelated errors | pre-existing |

## Research Conclusions

The normal chat route is correctly selected as the AC1 integration seam. The
remaining design work must use a persisted run-lifecycle model rather than
extending the pre-execution JSONL row. No external API research was needed:
the implementation uses existing in-repository routes and provider adapters.
