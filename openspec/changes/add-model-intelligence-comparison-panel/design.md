## Context

Arena ELO intelligence scores already exist in the `model_intelligence` SQLite table (populated by `arenaEloSync.ts`). They power the auto-combo routing engine and the `/dashboard/free-provider-rankings` page, but are never surfaced on the provider detail page. The provider detail page renders a flat list of model chips with visibility toggles; it has no quality dimension. See proposal.md for motivation.

The relevant existing utilities are:
- `listModelIntelligence()` in `src/lib/db/modelIntelligence.ts` — reads all rows from the DB
- `mergeProviderModels()` and `findMatchingIntelligence()` in `src/lib/freeProviderRankings.ts` — already solve model-list assembly and fuzzy matching against the intelligence table
- `isFreeModel()` in `src/shared/utils/freeModels.ts` — free-model predicate
- `requireManagementAuth` — the auth guard used by all other management API routes

## Goals / Non-Goals

**Goals:**
- Expose per-model intelligence scores for a provider via a new management API route
- Render those scores as a horizontal bar chart in an inline overlay on the provider detail page
- Support checkbox selection, Select All, Free-only toggle, and text search within the panel
- Reuse all existing utilities without modification

**Non-Goals:**
- Cross-provider comparison (scores are scoped to the open provider only)
- Displaying scores outside the provider detail page (no changes to the provider card grid or the rankings page)
- Persisting checkbox state across sessions
- Animating bars (static CSS widths only)
- Adding new intelligence data sources (the existing `arena_elo`, `user_override`, `models_dev_tier` sources are used as-is via the existing priority resolution)

## Decisions

### D1: Use all available sources, not just `arena_elo`

The DB stores scores from three sources (`user_override`, `arena_elo`, `models_dev_tier`) and `getModelIntelligence()` already resolves them in priority order (user_override > arena_elo > models_dev_tier). Using `listModelIntelligence()` without a source filter and then resolving per-model gives operators the richest possible score — a user-configured override will correctly supersede the ELO score.

**Alternative considered**: Filter to `arena_elo` only. Rejected — it would silently ignore user overrides and `models_dev_tier` entries, making the panel inconsistent with how scores are used in routing.

### D2: Fuzzy matching via existing `findMatchingIntelligence()`

Model IDs in the provider registry rarely match intelligence table keys exactly (e.g., `llama-3.1-8b` vs. `meta-llama/llama-3.1-8b`). `findMatchingIntelligence()` already implements a three-strategy cascade (exact → stripped-version → prefix) that is tested and battle-proven in the rankings page.

**Alternative considered**: Simple `Map.get()` exact lookup. Rejected — would produce far more "No data" entries than the fuzzy match.

### D3: Server-side API route, not client-side DB access

The `model_intelligence` table is SQLite-backed and must only be accessed server-side (per `src/lib/db/AGENTS.md`). A `GET /api/provider-intelligence?provider=<id>` route is the correct boundary. The existing `/api/free-provider-rankings` route is the pattern to follow.

### D4: Inline overlay, not a modal or slide-over

The model list is a flat grid. An absolute-positioned overlay over the grid keeps the panel spatially associated with the models it describes, avoids z-index conflicts with the app shell, and requires only a `relative` wrapper on the existing container. A modal would decontextualize the panel.

### D5: Gradient bar color (blue → green), not provider brand color

All models in the panel belong to the same provider, so using the provider's brand color produces a monochromatic chart with no visual differentiation between bars. A blue-to-green gradient keyed to the score value gives immediate visual ranking cues without needing a legend.

### D6: Normalized score (0–1) as the display value

The `score` column is already normalized to [0.4, 0.98] by the sync pipeline. Displaying `eloRaw` (e.g., 167.68) requires the operator to know what ELO scale means. The normalized score is self-explanatory as a quality percentage. Both values are returned by the API so the tooltip can show both.

## Risks / Trade-offs

- **Fuzzy match false positives** → `findMatchingIntelligence()` can match unrelated models if names are short. Mitigation: the function's existing prefix-match strategy requires a meaningful prefix length; edge cases will show scores for the wrong model. Acceptable — same risk exists in the rankings page today.
- **Empty panel for providers with no scores** → Most providers will have Arena ELO entries; new/obscure providers may not. Mitigation: show a clear empty state ("No intelligence scores available for this provider") rather than hiding the Compare button.
- **Panel performance** → A provider with 100+ models renders 100+ bar rows. Pure CSS widths and no virtualization. Mitigation: the panel is opt-in (opened on demand), so it does not affect initial page load. Virtualization is a future concern if providers exceed ~200 models.

## Migration Plan

No DB schema changes. No migrations. New files only, plus a small additive modification to `ProviderModelsSection.tsx`. Feature is purely additive — no existing behavior changes. No rollback needed beyond reverting the three files.
