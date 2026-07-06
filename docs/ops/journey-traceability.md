---
title: Journey Traceability
description: Traceability model for OmniRoute requirements, code, tests, and evidence.
---

# Journey Traceability

Implements the phenotype-infra journey-traceability standard for OmniRoute as the canonical routing framework for the Phenotype org.

## Traceability Model

Every user-facing or operator-facing flow should be traceable across:

1. **FR/NFR** — requirement ID and user story.
2. **Spec/ADR** — acceptance criteria, routing invariants, and non-regression constraints.
3. **Docs** — operator/user documentation and rich media placeholders.
4. **Code** — API route, handler, executor, provider adapter, MCP tool, or desktop/UI surface implementing the flow.
5. **Tests/Gates** — unit, integration, BDD, typecheck, lint, coverage, and journey verification acting as autograders.
6. **Evidence** — journey manifest, recording/keyframes, and evaluation verdict.

## User-Facing Flows

| Flow | Requirement | Implementation surface | Autograder gates | Evidence status |
| --- | --- | --- | --- | --- |
| Chat request routes through fallback providers | FR-OMNI-CHAT-001, NFR-OMNI-RELIABILITY-001 | `src/app/api/v1/`, `open-sse/handlers/`, provider executors | unit tests, provider fixture tests, typecheck, BDD journey, eval verdict | Stubbed |
| Operator reviews provider health and routing state | FR-OMNI-HEALTH-001, NFR-OMNI-OBSERVABILITY-001 | dashboard health screens, provider status docs, routing metrics/logs | UI smoke, metric/log assertions, journey manifest | Stubbed |
| MCP tool invocation succeeds through the gateway | FR-OMNI-MCP-001, NFR-OMNI-CONTRACT-001 | MCP Server tools, API handlers, tool registry | MCP contract tests, schema validation, journey eval | Stubbed |
| Desktop/user config updates endpoint and provider settings | FR-OMNI-CONFIG-001, NFR-OMNI-USABILITY-001 | Electron/Desktop UI, settings screen, CLI config path | config tests, screenshot journey, accessibility checks | Stubbed |

## Rich Media Stubs

<!-- RICH-MEDIA-STUB type="animated-gif" subject="Chat fallback routing journey" journey="chat-fallback-routing" status="TODO" -->
Pending rich media: chat fallback routing journey covering request, primary provider failure,
fallback provider success, and final response.

*Expected capture: send an OpenAI-compatible chat request, simulate or fixture a primary-provider failure, show fallback selection, and verify final response plus provider trace metadata.*

<!-- RICH-MEDIA-STUB type="annotated-screenshot" subject="Provider health dashboard" journey="provider-health-dashboard" status="TODO" -->
Pending rich media: provider health dashboard showing available providers, degraded providers,
routing policy, and last-check timestamp.

*Expected capture: open the dashboard health/provider view, annotate stale/degraded provider states, freshness timestamp, and operator remediation action.*

<!-- RICH-MEDIA-STUB type="journey-eval" subject="MCP tool invocation contract verdict" journey="mcp-tool-invocation" status="TODO" -->
Pending rich media: MCP tool invocation verdict showing tool request, schema validation,
response, and eval verdict.

*Expected capture: invoke a representative MCP tool through OmniRoute, validate request/response schema, and attach a pass/fail verdict for FR-OMNI-MCP-001 and NFR-OMNI-CONTRACT-001.*

<!-- RICH-MEDIA-STUB type="annotated-screenshot" subject="Endpoint and provider settings update" journey="endpoint-provider-settings" status="TODO" -->
Pending rich media: endpoint and provider settings update showing endpoint URL, provider key
state, validation feedback, and save result.

*Expected capture: update endpoint/provider settings in the UI or CLI, show validation feedback, and prove the saved configuration affects a subsequent request.*

## Journey Manifests

Journey manifests should live in `docs/journeys/manifests/` and include:

- FR/NFR IDs covered by the journey;
- API endpoint, CLI command, UI route, or MCP tool entrypoint used to reproduce the flow;
- provider fixtures or mock configuration needed for deterministic replay;
- expected screenshots/GIFs/keyframes;
- tests and gates that must pass before the journey is accepted;
- eval verdict schema and pass/fail criteria.

## Autograder Gates

Minimum gates before marking a journey complete:

- `npm run lint` for style and static checks;
- `npm run typecheck:core` for TypeScript correctness;
- provider and handler unit tests for routing behavior;
- MCP contract tests for tool requests/responses;
- BDD journey replay for user-visible and operator-facing flows;
- doc link validation for every referenced rich media asset;
- journey manifest validation via `phenotype-journey verify` when available;
- eval verdict linked to the FR/NFR IDs in the manifest.

## Status

- [x] Identify initial user-facing and operator-facing flows
- [x] Stub rich media embeds for expected screenshots/GIFs/evals
- [ ] Author manifests in `docs/journeys/manifests/`
- [ ] Record journey captures for each flow
- [ ] Run `phenotype-journey verify` in CI
