# Issue-Agent Executable Triage: Session Overview

Machine status: `in_progress`
Updated at: `2026-07-14`
Issue: `https://github.com/diegosouzapw/OmniRoute/issues/5980`
PR: `https://github.com/diegosouzapw/OmniRoute/pull/7002`

## Goal

Deliver GitHub issue #5980 as a production issue-agent workflow. The workflow
must execute recorded GitHub triage through OmniRoute routing, persist a complete
audit trail, return an actionable result, and cover all terminal outcomes.

## Current State

| artifact_id | requirement                                                            | status                           | current evidence                                                                                     | next proof                                                   |
| ----------- | ---------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| AC1         | configured provider/model/policy use normal chat routing               | `implemented_pending_acceptance` | `623e0d541`, `fa2c1d7c6`; real-route test invokes the issue-agent route and mocks only provider HTTP | prove routing-policy semantics and terminal failure handling |
| AC2         | persist lifecycle, request, output, usage/cost/runtime, terminal error | `not_started`                    | audit JSONL currently records only pre-execution run context                                         | lifecycle persistence tests                                  |
| AC3         | return actionable triage result                                        | `not_started`                    | route forwards raw completion body                                                                   | result contract and integration test                         |
| AC4         | success, provider failure, timeout, budget stop                        | `not_started`                    | only success-route coverage exists                                                                   | terminal-outcome test matrix                                 |
| release     | CI/review evidence                                                     | `in_progress`                    | route-validation and focused tests have prior passing evidence                                       | rerun final gates on PR head                                 |

## Decisions

| decision_id | decision                                                                         | rationale                                                                                                      | status        |
| ----------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------- |
| DEC-001     | Use the in-process `POST` export from `/api/v1/chat/completions`                 | preserves existing admission, initialization, guardrails, and provider routing                                 | `implemented` |
| DEC-002     | Keep issue-agent execution opt-in with `OMNIROUTE_ISSUE_AGENT_ENABLED=true`      | prevents unrequested autonomous execution                                                                      | `implemented` |
| DEC-003     | Treat AC1 as incomplete until policy and error semantics are verified end-to-end | request construction alone does not prove the chat route consumes the policy or returns correct terminal state | `active`      |

## Traceability

The canonical WBS is `03_DAG_WBS.md`; the canonical QA matrix is
`06_TESTING_STRATEGY.md`. Every status change must identify its commit SHA,
exact command, observed result, and PR head.
