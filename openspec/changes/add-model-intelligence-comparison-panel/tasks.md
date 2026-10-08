## 1. Branch Setup

- [x] 1.1 `git fetch origin` then `git checkout -b feat/model-intelligence-comparison-panel origin/release/v3.8.52` — never commit directly to `release/v3.8.52` (CONTRIBUTING.md Git Workflow)
- [x] 1.2 Commit the openspec change artifacts (`proposal.md`, `specs/`, `design.md`, `tasks.md`) on the new branch before starting implementation

## 2. Pre-coding Verification (AGENTS.md Rule 4 — verify first)

- [x] 2.1 Read the actual source files before writing any code: `src/lib/db/modelIntelligence.ts`, `src/lib/freeProviderRankings.ts`, `src/shared/utils/freeModels.ts`, and the auth guard file containing `requireManagementAuth` — confirm real function signatures, parameter names, and return types. Do not write any code against these until verified from source.

## 3. API Route

- [x] 3.1 Create `src/app/api/provider-intelligence/route.ts` — `GET` handler with `requireManagementAuth`, reads `provider` query param (400 if missing), calls `mergeProviderModels` + `findMatchingIntelligence` + `isFreeModel`, returns `ProviderModelIntelligence[]` sorted by score desc
- [x] 3.2 Verify the route compiles with no TypeScript errors (`tsc --noEmit` or `lsp_diagnostics`)
- [x] 3.3 Commit: `feat(api): add provider-intelligence route`

## 4. Panel Component

- [x] 4.1 Create `src/app/(dashboard)/dashboard/providers/[id]/components/ModelIntelligencePanel.tsx` — props: `providerId`, `providerName`, `onClose`; fetches `/api/provider-intelligence?provider=<id>` on mount
- [x] 4.2 Implement state: `selected: Set<string>` (all checked by default), `freeOnly: boolean`, `search: string`
- [x] 4.3 Render toolbar: close button (✕), title, Select All button, Free-only toggle, search input
- [x] 4.4 Render horizontal bar chart — one row per visible model, sorted by score desc, bar width = `score * 100%`, blue→green gradient, label with model ID + score value, tooltip with `modelId · Intelligence: {score} · ELO: {eloRaw}`
- [x] 4.5 Render empty state when no models match the active filters
- [x] 4.6 Render loading state while fetch is in flight
- [x] 4.7 Render error state when the fetch rejects (network error, 5xx) — show "Failed to load intelligence scores." with a Retry button
- [x] 4.8 Verify component compiles with no TypeScript errors
- [x] 4.9 Commit: `feat(dashboard): add ModelIntelligencePanel component`

## 5. Provider Models Section Integration

- [x] 5.1 In `src/app/(dashboard)/dashboard/providers/[id]/components/ProviderModelsSection.tsx`, add `showIntelligence` state and import `ModelIntelligencePanel`
- [x] 5.2 Add "Compare" button to `ModelVisibilityToolbar` (disabled when `models.length === 0`), wired to `setShowIntelligence(true)`
- [x] 5.3 Wrap the model grid in a `relative` container and conditionally render `<ModelIntelligencePanel>` as an `absolute inset-0 z-20` overlay
- [x] 5.4 Verify the modified file compiles with no TypeScript errors
- [x] 5.5 Commit: `feat(dashboard): integrate ModelIntelligencePanel into ProviderModelsSection`

## 6. Tests (AGENTS.md Rule 5 — real tests, no mocked network calls)

- [ ] 6.1 Write an integration test for `GET /api/provider-intelligence`: start the real dev server and issue a real `fetch` to the route — cover HTTP 200 (valid provider), HTTP 400 (missing `provider` param), and HTTP 401 (no auth). Must run against the real running server, not mocked handlers.
- [ ] 6.2 Write a component unit test for `ModelIntelligencePanel` exercising: filter by search string, Free-only toggle, checkbox deselect/Select All, and the error state render.
- [ ] 6.3 Run `npm run test:coverage` — confirm statements/lines/functions/branches all ≥ 60%.

## 7. Manual Verification

- [ ] 7.1 Start the dev server and open a provider detail page — confirm the Compare button appears in the toolbar
- [ ] 7.2 Click Compare — confirm the panel overlays the model grid with bars, checkboxes, Select All, Free-only toggle, and search
- [ ] 7.3 Confirm deselecting a checkbox hides that model's bar; Select All restores all bars
- [ ] 7.4 Confirm Free-only toggle filters to free models only (or shows empty state if none)
- [ ] 7.5 Confirm search filters bars by model ID/name case-insensitively
- [ ] 7.6 Confirm clicking ✕ dismisses the panel and the model grid is interactive again
- [ ] 7.7 Open a provider with no intelligence scores — confirm empty state message is shown
- [ ] 7.8 Kill the dev server mid-load — confirm the error state renders with a Retry button
- [ ] 7.9 Run `npm run lint` — confirm no new errors

## 8. PR

- [ ] 8.1 Push the branch (`git push -u origin feat/model-intelligence-comparison-panel`) and open a PR with base = `release/v3.8.52`
- [ ] 8.2 Add a changelog fragment: create a `.md` file under `changelog.d/features/` named `<PR-number>-model-intelligence-comparison-panel.md`
