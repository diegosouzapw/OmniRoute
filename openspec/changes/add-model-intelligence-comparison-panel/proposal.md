## Why

The provider detail page shows every model a provider exposes, but offers no way to compare their quality. Arena ELO intelligence scores already live in the `model_intelligence` table and feed the auto-combo routing engine — they just never reached the model list UI. Operators switching between providers have no signal for "is this model worth routing to?".

## What Changes

- New API route `GET /api/provider-intelligence?provider=<id>` that returns per-model intelligence scores for a single provider, scoped to that provider's models only.
- New `ModelIntelligencePanel` component: an inline overlay (absolute-positioned over the model grid) rendering a horizontal bar chart of intelligence scores, with per-model checkboxes, Select All, Free-only filter, and a search box.
- `ProviderModelsSection` gains a "Compare" button in the `ModelVisibilityToolbar` that toggles the panel open/closed, and wraps the model grid in a relative container so the panel overlays it.

No existing behavior changes. No breaking changes.

## Capabilities

### New Capabilities
- `model-intelligence-comparison`: Per-provider model intelligence score comparison UI. Covers the API route, the panel component, the toolbar button, and the overlay lifecycle.

### Modified Capabilities
- None. No existing spec-level requirements change; this is purely additive UI.

## Impact

- New file: `src/app/api/provider-intelligence/route.ts` (~80 lines)
- New file: `src/app/(dashboard)/dashboard/providers/[id]/components/ModelIntelligencePanel.tsx` (~200 lines)
- Modified: `src/app/(dashboard)/dashboard/providers/[id]/components/ProviderModelsSection.tsx` (~15 lines added)
- Reuses existing logic: `findMatchingIntelligence` and `mergeProviderModels` from `src/lib/freeProviderRankings.ts`, `isFreeModel` from `src/shared/utils/freeModels.ts`, `listModelIntelligence` from `src/lib/db/modelIntelligence.ts`, shared `Checkbox`/`Button`/`Badge`/`Card` components.
- No new dependencies. No schema changes. No DB migrations.