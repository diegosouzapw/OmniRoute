# Issue-Agent Executable Triage: Specifications

Machine status: `in_progress`

## Acceptance Contract

| ac_id | requirement                                                                                                                             | acceptance evidence                                                                                                                 | status                           |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| AC1   | Non-dry recorded triage executes through normal chat routing with selected provider, model, and policy                                  | actual issue-agent route reaches chat `POST`; provider-boundary mock observes selected target; policy is proven consumed by routing | `implemented_pending_acceptance` |
| AC2   | Persist `accepted`, `running`, and terminal state plus sanitized request/prompt, model output, usage, cost, runtime, and terminal error | durable queryable record contains each field for success and failures                                                               | `pending`                        |
| AC3   | API returns a useful, structured triage result derived from model output                                                                | response has stable triage schema and is not a raw opaque provider payload                                                          | `pending`                        |
| AC4   | Tests cover success, provider/model failure, timeout, and budget stop                                                                   | each outcome asserts HTTP response and persisted terminal record                                                                    | `pending`                        |

## API Contract (Target)

| field               | rule                                                                                                                       |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `mode`              | must be `recorded-triage`                                                                                                  |
| execution selection | accepts configured `provider`, `model`, `routingPolicy`, and bounded `timeoutMs`                                           |
| `runId`             | stable execution identifier returned for every accepted run                                                                |
| result              | includes structured triage decision/summary/actions and execution metadata                                                 |
| errors              | return sanitized terminal error with explicit terminal status; never leak provider credentials or unredacted issue content |

## Persistence Contract (Target)

| field group    | required values                                                                                           |
| -------------- | --------------------------------------------------------------------------------------------------------- |
| identity       | run ID, issue URL/repository/number, mode, timestamps                                                     |
| lifecycle      | `accepted`, `running`, `succeeded`, `failed`, `timed_out`, or `budget_stopped` with transition timestamps |
| input          | redacted recorded context and rendered prompt fingerprint/content according to retention policy           |
| routing        | requested provider/model/policy and resolved execution target                                             |
| output         | sanitized model output and structured triage result                                                       |
| accounting     | input/output/total tokens, cost, and runtime when available                                               |
| terminal error | normalized code/message for failure, timeout, and budget stop                                             |

## Assumptions, Risks, Uncertainties

| aru_id  | type        | statement                                                                                | mitigation                                                                | status |
| ------- | ----------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------ |
| ARU-001 | risk        | `X-OmniRoute-Mode` may not be a consumed routing-policy input in the chat route          | trace the policy contract and test an observable policy effect            | `open` |
| ARU-002 | risk        | current catch maps all thrown execution errors to HTTP 400 and does not persist them     | introduce typed terminal outcomes and persistence before response mapping | `open` |
| ARU-003 | risk        | current audit row is emitted before execution and cannot represent final execution state | replace/extend with append-only lifecycle records or durable run storage  | `open` |
| ARU-004 | uncertainty | provider response metadata may differ by adapter                                         | normalize accounting fields and preserve unknowns explicitly              | `open` |
