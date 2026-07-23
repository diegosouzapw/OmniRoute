# Issue-Agent Executable Triage: Known Issues

Machine status: `open`

| issue_id | severity | status | evidence                                                                                                                        | impact                                                                                                                 | resolution owner          |
| -------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| KI-001   | P1       | `open` | `execution.ts` places `routingPolicy` in `X-OmniRoute-Mode`; the researched chat route has no observed consumer in the AC1 path | AC1 does not yet prove configured routing policy affects routing                                                       | AC1 implementation/review |
| KI-002   | P1       | `open` | issue-agent route catches execution errors and returns `{ error }` with HTTP 400 after writing only pre-execution audit         | provider failure, timeout, and budget stop lack correct terminal semantics and persistence                             | AC2/AC4 implementation    |
| KI-003   | P1       | `open` | `audit.ts` serializes only run context/steps before execution                                                                   | AC2 fields for lifecycle, prompt, output, token/cost/runtime, and error are missing                                    | AC2 implementation        |
| KI-004   | P1       | `open` | API returns raw `completion.body`                                                                                               | AC3 has no stable actionable triage result contract                                                                    | AC3 implementation        |
| KI-005   | P2       | `open` | `npm run typecheck:core` has unresolved `omniglyph` declarations in `open-sse/services/compression/*`                           | full typecheck cannot be used as issue-agent completion evidence until separately resolved or excluded with provenance | release validation        |

## Resolved/Verified

| issue_id | status     | evidence                                                                                                                      |
| -------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| KI-R001  | `verified` | `fa2c1d7c6` adds an isolated test that invokes the actual issue-agent route and mocks only provider HTTP for the success path |
| KI-R002  | `verified` | `e6a63eb33` applies shared request-body validation to the issue-agent route; prior route-validation gate passed               |

No workaround in this document changes the acceptance contract. Open P1 items
block declaring AC1-AC4 complete.
