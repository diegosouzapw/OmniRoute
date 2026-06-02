# VS Code Integration Architecture

## Overview

The VS Code integration in OmniRoute is not a single transport. It is the combination of two client-facing compatibility layers built on top of the standard OmniRoute OpenAI-compatible APIs.

1. Ollama-compatible GitHub Copilot BYOK flow
2. Custom model catalog flow for VS Code model import and chatLanguageModels.json generation

Both layers live under `src/app/api/v1/vscode/` and use tokenized path aliases so VS Code-compatible clients can authenticate without sending custom headers.

## Main Goals

- Expose a stable compatibility surface for GitHub Copilot BYOK Ollama mode
- Expose a richer VS Code model catalog with OmniRoute-specific metadata
- Allow path-token authentication for clients that cannot easily inject Bearer headers
- Publish service-tier and reasoning metadata in a client-friendly shape

## Entry Points

### Tokenized VS Code alias

- `src/app/api/v1/vscode/[token]/route.ts`
- `src/app/api/v1/vscode/[token]/tokenizedRequest.ts`

Responsibility:

- Extract the token from `/api/v1/vscode/{token}/...`
- Inject `x-api-key` and `Authorization: Bearer <token>` when missing
- Reuse the normal OmniRoute v1 handlers behind the alias

## Integration Modes

### 1. GitHub Copilot BYOK Ollama contract

Primary contract document:

- `src/app/api/v1/vscode/VS_CODE_COPILOT_OLLAMA_CONTRACT.md`

Observed minimum handshake:

- `GET /api/version`
- `GET /api/tags`
- `POST /api/show`
- `POST /v1/chat/completions`

Routes:

- `src/app/api/v1/vscode/[token]/api/version/route.ts`
- `src/app/api/v1/vscode/[token]/api/tags/route.ts`
- `src/app/api/v1/vscode/[token]/api/show/route.ts`
- `src/app/api/v1/vscode/[token]/v1/chat/completions/route.ts`

This path exists to satisfy Copilot's Ollama-like discovery and model selection flow.

### 2. VS Code custom model catalog flow

Routes:

- `src/app/api/v1/vscode/[token]/models/route.ts`
- `src/app/api/v1/vscode/[token]/responses/route.ts`
- `src/app/api/v1/vscode/[token]/chat/completions/route.ts`

This path is used by custom model import flows and the dashboard-generated `chatLanguageModels.json` configuration.

## Model Publication Layers

### Catalog source

All VS Code routes ultimately start from the unified OmniRoute model catalog:

- `src/app/api/v1/models/catalog.ts`

### Presentation layer

- `src/app/api/v1/vscode/[token]/modelPresentation.ts`

Responsibility:

- Resolve user-facing display names
- Add provider prefixes like `Codex` and `GitHub` when needed
- Add service-tier suffixes such as `Default`, `Fast`, and `Flex`
- Provide grouping keys for the grouped catalog

### Family-first alias layer

- `src/app/api/v1/vscode/[token]/familyFirstModelIds.ts`

Responsibility:

- Publish simplified family-first model IDs for grouped import flows
- Preserve provider-native IDs in raw flows

### Service-tier layer

- `src/app/api/v1/vscode/[token]/serviceTierVariants.ts`

Responsibility:

- Expand supported models into tier variants such as `__tier_priority` and `__tier_flex`
- Rewrite incoming requests so tier aliases become base model + `service_tier`
- Map labels to `Default`, `Fast`, and `Flex`

Current behavior:

- Service-tier expansion is intentionally Codex-specific today

### Reasoning metadata layer

- `src/app/api/v1/vscode/[token]/reasoningMetadata.ts`

Responsibility:

- Detect whether a model supports reasoning
- Infer supported effort values like `none`, `low`, `medium`, `high`, `xhigh`
- Detect reasoning variants from the model ID suffix
- Build the configuration schema returned to VS Code-compatible clients

## Grouped vs Raw Surfaces

### Grouped surface

Grouped routes prioritize canonical import behavior and hide duplicated reasoning variants when a canonical base model is already available.

Main grouped routes:

- `src/app/api/v1/vscode/[token]/models/route.ts`
- `src/app/api/v1/vscode/[token]/api/tags/route.ts`
- `src/app/api/v1/vscode/[token]/api/show/route.ts`

Behavior:

- Group by canonical model identity
- Prefer family-first published IDs
- Keep service-tier variants when they are intentionally distinct
- Collapse reasoning variants into the base published model for import-friendly catalogs

### Raw surface

Raw routes exist to expose provider-native IDs and every relevant variant without family-first grouping.

Main raw routes:

- `src/app/api/v1/vscode/raw/[token]/route.ts`
- `src/app/api/v1/vscode/raw/[token]/models/route.ts`
- `src/app/api/v1/vscode/raw/[token]/api/tags/route.ts`
- `src/app/api/v1/vscode/raw/[token]/api/show/route.ts`

Behavior:

- Preserve native provider IDs like `cx/gpt-5.4`
- Preserve service-tier variants like `cx/gpt-5.4__tier_priority`
- Preserve reasoning variants like `cx/gpt-5.4-low`
- Preserve combined variants like `cx/gpt-5.4-low__tier_priority`

This raw layer is the correct place for experiments or advanced client flows that need every concrete model variant exposed independently.

## Dashboard UX

Main UI files:

- `src/app/(dashboard)/dashboard/endpoint/VscodeTokenAliasCard.tsx`
- `src/app/(dashboard)/dashboard/cli-tools/components/CopilotToolCard.tsx`

Responsibilities:

- Show ready-to-copy tokenized VS Code URLs
- Generate `chatLanguageModels.json` blocks
- Use a vendor workaround such as `vendor: "azure"` for custom model lists
- Point imported response-capable models to `/api/v1/vscode/{token}/responses#models.ai.azure.com`

## Request Rewriting

Only these routes currently rewrite service-tier aliases before delegating:

- `src/app/api/v1/vscode/[token]/v1/chat/completions/route.ts`
- `src/app/api/v1/vscode/[token]/responses/route.ts`

Important asymmetry:

- `src/app/api/v1/vscode/[token]/chat/completions/route.ts` only re-exports the base handler and does not apply the VS Code service-tier rewrite locally

That distinction matters when designing future features because not every VS Code-prefixed route has identical adaptation behavior.

## Tests

Main coverage file:

- `tests/unit/vscode-token-routes.test.ts`

Current test coverage includes:

- tokenized root route behavior
- grouped models route behavior
- raw models route behavior
- grouped tags route behavior
- combos token alias behavior
- reasoning metadata exposure
- provider-native raw IDs

## Architecture Guidance For Future Work

When extending the VS Code integration, decide first which surface the feature belongs to:

1. Grouped import surface
2. Raw variant surface
3. Copilot Ollama compatibility surface
4. Dashboard configuration UX

Do not mix grouped and raw publication rules in the same route.

If a new feature depends on exact provider-native variants, place it in the raw surface first.
If a new feature targets import UX stability, place it in the grouped surface first.

## Current Known Constraints

- The Copilot BYOK contract is based on observed behavior, not a stable public spec
- Service-tier expansion is currently specific to supported Codex models
- Grouped routes intentionally suppress duplicated reasoning variants
- Raw routes are the safer surface for exposing full reasoning-effort matrices