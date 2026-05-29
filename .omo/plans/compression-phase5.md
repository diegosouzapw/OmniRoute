# Compression Phase 5 — Dashboard UI & Analytics

## TL;DR

> **Quick Summary**: Add full visibility layer for the compression pipeline — analytics tab, dedicated settings page route, per-combo override UI, log detail enhancement, and playground compression preview.
>
> **Deliverables**:
> - `compression_analytics` DB table + migration 032
> - `/api/analytics/compression` — aggregated stats endpoint
> - `/api/compression/preview` — preview endpoint for playground
> - `CompressionAnalyticsTab.tsx` — added to existing Analytics page
> - `/dashboard/compression` — dedicated standalone page (links to Settings > AI > Compression)
> - Per-combo compression dropdown in combo builder (`page.tsx`)
> - Request log detail modal: compression stats inline
> - Translator Playground: Compression Preview mode
> - Ultra mode added to `CompressionSettingsTab.tsx` MODES array
> - i18n keys for all 33 locale files
> - Unit tests: analytics API, preview API, DB module (≥60% coverage gate)
>
> **Estimated Effort**: Large
> **Parallel Execution**: YES — 3 waves
> **Critical Path**: Task 1 (DB) → Task 2 (analytics API) → Task 6 (analytics tab UI)

---

## Context

### Original Request
"okey continue to phase 5 planning" — after Phase 4 (ultra mode) was shipped via PR #1741.

### Interview Summary
**Key Discussions**:
- Phase 5 is issue #1590: Dashboard UI & Analytics — pure frontend + analytics, no engine changes
- CompressionSettingsTab already exists (Settings > AI tab) — Phase 5 enhances it (add ultra mode) and adds a dedicated route
- `comboOverrides` field already in compression config — per-combo UI just needs a selector
- No new charting library — follow SearchAnalyticsTab CSS-only pattern
- Migration 032 is next available slot
- Test coverage gate: 60% across statements/lines/functions/branches

**Research Findings**:
- SearchAnalyticsTab.tsx: CSS-only StatCard + ProviderBar pattern — reference for analytics UI
- BuilderIntelligentStep.tsx: combo builder uses `config`/`onChange` props pattern
- Analytics page: SegmentedControl with 5 tabs — add "compression" as 6th
- Logs page: tabs include request-logs, proxy-logs, audit-logs, console — CompressionLogTab exists in logs but is raw; analytics is aggregated
- `src/lib/db/migrations/031_aggressive_compression.sql` is latest → 032 is next

### Gaps Identified (Self-Review)

**Addressed silently**:
- Ultra mode missing from MODES array in CompressionSettingsTab → add in Task 7 (settings enhancement)
- `CompressionLogTab` in logs page shows raw entries; Phase 5 analytics tab shows aggregated/charted data — no conflict
- `/dashboard/compression` route: create as a redirect/wrapper to Settings?tab=ai#compression OR a standalone page that embeds CompressionSettingsTab — chosen: standalone page for linkability

**Assumptions applied as defaults**:
- No recharts/chart.js — CSS-only charts following SearchAnalyticsTab
- Preview endpoint: POST `/api/compression/preview` with `{text, mode}` → returns `{original, compressed, originalTokens, compressedTokens, savingsPercent, techniquesUsed, durationMs}`
- Per-combo override stored in existing `comboOverrides: Record<string, CompressionMode>` field

---

## Work Objectives

### Core Objective
Give users full visibility into compression savings, let them configure it per-combo, preview it before enabling, and see compression stats in every request log.

### Concrete Deliverables
- `src/lib/db/migrations/032_compression_analytics.sql`
- `src/lib/db/compressionAnalytics.ts` — DB module (insert, query aggregates)
- `src/app/api/analytics/compression/route.ts` — GET analytics endpoint
- `src/app/api/compression/preview/route.ts` — POST preview endpoint
- `src/app/(dashboard)/dashboard/analytics/CompressionAnalyticsTab.tsx`
- `src/app/(dashboard)/dashboard/analytics/page.tsx` — add Compression tab
- `src/app/(dashboard)/dashboard/compression/page.tsx` — standalone settings page
- `src/app/(dashboard)/dashboard/combos/page.tsx` — per-target compression dropdown
- `src/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab.tsx` — add ultra mode
- `src/app/(dashboard)/dashboard/translator/components/PlaygroundMode.tsx` — compression preview
- i18n: 33 locale files — new compression analytics + preview keys
- `tests/unit/compression/compressionAnalytics.test.ts`
- `tests/unit/compression/previewApi.test.ts`

### Definition of Done
- [ ] `npm run typecheck:core` → 0 errors
- [ ] `node --import tsx/esm --test tests/unit/compression/compressionAnalytics.test.ts` → all pass
- [ ] `node --import tsx/esm --test tests/unit/compression/previewApi.test.ts` → all pass
- [ ] `npm run lint` → 0 errors
- [ ] PR opened targeting `diegosouzapw/OmniRoute:main`

### Must Have
- `compression_analytics` table with migration 032
- Analytics API returning aggregated stats (total tokens saved, mode distribution, per-provider breakdown)
- CompressionAnalyticsTab added to Analytics page as new tab
- Per-combo compression dropdown in combo builder
- Ultra mode option in CompressionSettingsTab
- i18n for all new keys

### Must NOT Have (Guardrails)
- NO new npm dependencies (no recharts, chart.js, d3)
- NO re-implementing CompressionSettingsTab from scratch (it already exists — enhance only)
- NO touching Phase 1–4 compression engine files
- NO modifying existing compression API route (`/api/settings/compression`) — only add new endpoints
- NO over-engineering the analytics table — keep it flat, no foreign keys to missing tables
- NO generic variable names (`data`, `result`, `item`) — use domain-specific names
- NO excessive JSDoc comments — inline only where non-obvious
- NO "also add X while we're at it" scope inflation

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed.

### Test Decision
- **Infrastructure exists**: YES (vitest + node test runner)
- **Automated tests**: Tests-after for new DB module and API routes
- **Framework**: `node --import tsx/esm --test` (matches existing compression tests)

### QA Policy
Every task has agent-executed QA scenarios. Evidence saved to `.sisyphus/evidence/`.

- **API routes**: Bash (curl) — send requests, assert status + response fields
- **DB modules**: Bash (node REPL or test file) — import, call functions, compare output
- **UI components**: TypeScript compile check (no Playwright needed — UI is client-only)

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Foundation — start immediately, all independent):
├── Task 1: DB migration 032 + compressionAnalytics.ts module [quick]
├── Task 2: /api/analytics/compression GET endpoint [quick]
└── Task 3: /api/compression/preview POST endpoint [quick]

Wave 2 (UI — after Wave 1):
├── Task 4: CompressionAnalyticsTab.tsx + wire into analytics/page.tsx [visual-engineering]
├── Task 5: /dashboard/compression standalone page [visual-engineering]
├── Task 6: Per-combo compression dropdown in combos/page.tsx [visual-engineering]
├── Task 7: Ultra mode in CompressionSettingsTab + settings page enhancement [visual-engineering]
└── Task 8: Translator Playground compression preview mode [visual-engineering]

Wave 3 (i18n + tests + PR):
├── Task 9: i18n keys — all 33 locale files [quick]
├── Task 10: Unit tests — compressionAnalytics.test.ts + previewApi.test.ts [unspecified-high]
└── Task 11: New branch, typecheck, lint, PR [git-master]

Critical Path: Task 1 → Task 2 → Task 4 → Task 11
Parallel Speedup: ~65% faster than sequential
```

### Agent Dispatch Summary
- **Wave 1**: 3× `quick` agents in parallel
- **Wave 2**: 5× `visual-engineering` agents in parallel
- **Wave 3**: `quick` (i18n), `unspecified-high` (tests), `git-master` (PR)

---

## TODOs

- [x] 1. DB migration 032 + `compressionAnalytics.ts` DB module

  **What to do**:
  - Create `src/lib/db/migrations/032_compression_analytics.sql` — new table `compression_analytics` with columns: `id INTEGER PRIMARY KEY AUTOINCREMENT`, `timestamp TEXT NOT NULL`, `combo_id TEXT`, `provider TEXT`, `mode TEXT NOT NULL`, `original_tokens INTEGER NOT NULL`, `compressed_tokens INTEGER NOT NULL`, `tokens_saved INTEGER NOT NULL`, `duration_ms INTEGER`, `request_id TEXT`
  - The migration must be idempotent: use `CREATE TABLE IF NOT EXISTS`
  - Create `src/lib/db/compressionAnalytics.ts` with:
    - `insertCompressionAnalyticsRow(row)` — inserts one record
    - `getCompressionAnalyticsSummary(since?: string)` — returns `{ totalRequests, totalTokensSaved, avgSavingsPct, byMode: Record<string,number>, byProvider: Record<string,number>, last24h: Array<{hour:string,count:number,tokensSaved:number}> }`
  - Export both functions from `src/lib/localDb.ts` re-export layer

  **Must NOT do**:
  - No foreign keys referencing tables not guaranteed to exist
  - No logic in `localDb.ts` — re-export only
  - No skipping migration slot 032 (031 is latest)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Straightforward DB schema + module, no complex logic
  - **Skills**: none needed

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3)
  - **Blocks**: Tasks 2, 10
  - **Blocked By**: None (can start immediately)

  **References**:
  - `src/lib/db/migrations/031_aggressive_compression.sql` — migration format (idempotent `SELECT 1;` pattern)
  - `src/lib/db/migrations/025_call_logs_summary_storage.sql` — example of adding a real table
  - `src/lib/db/compression.ts:77-79` — `comboOverrides` field pattern for domain module structure
  - `src/lib/db/detailedLogs.ts` — canonical domain module structure: `getDbInstance()`, typed rows, named exports
  - `src/lib/localDb.ts` — re-export pattern (just add `export * from "./compressionAnalytics"`)

  **Acceptance Criteria**:
  - [ ] `src/lib/db/migrations/032_compression_analytics.sql` exists, passes `sqlite3 :memory: < file`
  - [ ] `compressionAnalytics.ts` exports `insertCompressionAnalyticsRow` and `getCompressionAnalyticsSummary`
  - [ ] `localDb.ts` re-exports both functions
  - [ ] `npm run typecheck:core` → 0 errors

  **QA Scenarios**:
  ```
  Scenario: Migration creates table without errors
    Tool: Bash
    Steps:
      1. node -e "import('./src/lib/db/core.ts').then(m => { m.getDbInstance(); console.log('ok') })"
         OR run: node --import tsx/esm -e "import { getDbInstance } from './src/lib/db/core.ts'; const db = getDbInstance(); const row = db.prepare(\"SELECT name FROM sqlite_master WHERE type='table' AND name='compression_analytics'\").get(); console.log(row ? 'PASS' : 'FAIL')"
    Expected Result: prints "PASS"
    Evidence: .sisyphus/evidence/task-1-migration.txt

  Scenario: insertCompressionAnalyticsRow + getCompressionAnalyticsSummary round-trip
    Tool: Bash
    Steps:
      1. node --import tsx/esm -e "
         import { insertCompressionAnalyticsRow, getCompressionAnalyticsSummary } from './src/lib/db/compressionAnalytics.ts';
         insertCompressionAnalyticsRow({ timestamp: new Date().toISOString(), mode: 'standard', originalTokens: 100, compressedTokens: 70, tokensSaved: 30, durationMs: 5 });
         const s = getCompressionAnalyticsSummary();
         console.log(s.totalRequests >= 1 && s.totalTokensSaved >= 30 ? 'PASS' : 'FAIL', JSON.stringify(s));
         "
    Expected Result: prints "PASS ..."
    Evidence: .sisyphus/evidence/task-1-roundtrip.txt
  ```

  **Commit**: YES (group with Task 2)
  - Message: `feat(compression): migration 032 + compressionAnalytics DB module`
  - Files: `src/lib/db/migrations/032_compression_analytics.sql`, `src/lib/db/compressionAnalytics.ts`, `src/lib/localDb.ts`

---

- [x] 2. `GET /api/analytics/compression` endpoint

  **What to do**:
  - Create `src/app/api/analytics/compression/route.ts`
  - Pattern: copy structure from `src/app/api/v1/search/analytics/route.ts` exactly — `enforceApiKeyPolicy(req, "analytics")`, `getDbInstance()`, aggregate SQL queries, return `NextResponse.json(...)`
  - Response shape: `{ totalRequests, totalTokensSaved, avgSavingsPct, byMode: Record<string,number>, byProvider: Record<string,number>, last24h: Array<{hour,count,tokensSaved}> }`
  - If `compression_analytics` table is empty, return zeroed stats (no 500)
  - Add `since` query param support: `?since=24h | 7d | 30d | all` (default `24h`)

  **Must NOT do**:
  - No raw SQL outside this route file — use `getCompressionAnalyticsSummary()` from Task 1 DB module
  - No new auth middleware — use existing `enforceApiKeyPolicy`
  - No `as any` casts

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Boilerplate API route following established pattern

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Task 1 completes — depends on DB module)
  - **Parallel Group**: Wave 1 (with Tasks 1, 3) — can start when Task 1 done
  - **Blocks**: Task 4 (analytics tab UI)
  - **Blocked By**: Task 1

  **References**:
  - `src/app/api/v1/search/analytics/route.ts` — EXACT pattern to follow
  - `src/lib/db/compressionAnalytics.ts` (Task 1) — call `getCompressionAnalyticsSummary(since)`
  - `src/shared/utils/apiKeyPolicy.ts` — `enforceApiKeyPolicy` import path

  **Acceptance Criteria**:
  - [ ] `curl -s http://localhost:3000/api/analytics/compression` → `200` with JSON having keys `totalRequests`, `totalTokensSaved`, `byMode`, `byProvider`
  - [ ] `curl -s http://localhost:3000/api/analytics/compression?since=7d` → `200`
  - [ ] Empty table returns `{ totalRequests: 0, totalTokensSaved: 0, ... }` not `500`

  **QA Scenarios**:
  ```
  Scenario: GET /api/analytics/compression returns valid JSON
    Tool: Bash (curl)
    Steps:
      1. Start dev server (assume running): curl -s http://localhost:3000/api/analytics/compression
    Expected Result: HTTP 200, JSON body with keys: totalRequests, totalTokensSaved, avgSavingsPct, byMode, byProvider, last24h
    Failure Indicators: 500 error, missing keys, non-JSON response
    Evidence: .sisyphus/evidence/task-2-api-response.json

  Scenario: ?since=7d param accepted
    Tool: Bash (curl)
    Steps:
      1. curl -s "http://localhost:3000/api/analytics/compression?since=7d"
    Expected Result: HTTP 200 with same shape
    Evidence: .sisyphus/evidence/task-2-since-param.json
  ```

  **Commit**: YES (group with Task 1)
  - Message: `feat(compression): migration 032 + compressionAnalytics DB module`
  - Files: `src/app/api/analytics/compression/route.ts`

---

- [x] 3. `POST /api/compression/preview` endpoint

  **What to do**:
  - Create `src/app/api/compression/preview/route.ts`
  - Accept: `{ messages: Array<{role,content}>, mode: CompressionMode }` (validate with Zod)
  - Call the existing compression engine (import from `open-sse/services/compression/` or `src/lib/compression/`) to compress the messages
  - Return: `{ original: string, compressed: string, originalTokens: number, compressedTokens: number, tokensSaved: number, savingsPct: number, techniquesUsed: string[], durationMs: number }`
  - `originalTokens` / `compressedTokens`: use rough word-count proxy (`Math.ceil(str.split(/\s+/).length * 1.33)`) — no external tokenizer
  - If mode is `"off"`, return compressed === original, tokensSaved === 0
  - 400 on invalid input; 200 always on valid input (even if no compression occurred)

  **Must NOT do**:
  - No new npm packages for tokenization
  - No calling external LLM APIs
  - No touching existing compression engine files

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Thin API wrapper over existing compression functions

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2)
  - **Blocks**: Task 8 (playground preview)
  - **Blocked By**: None

  **References**:
  - `open-sse/services/compression/` — find the main compress function entry point
  - `src/app/api/settings/compression/route.ts` — auth + Zod pattern for compression routes
  - `src/shared/validation/` — Zod schemas pattern

  **Acceptance Criteria**:
  - [ ] `curl -s -X POST http://localhost:3000/api/compression/preview -H 'Content-Type: application/json' -d '{"messages":[{"role":"user","content":"Hello world this is a test"}],"mode":"standard"}'` → 200 with `originalTokens`, `compressedTokens`, `savingsPct`
  - [ ] `mode: "off"` returns `tokensSaved: 0`
  - [ ] Missing `mode` → 400

  **QA Scenarios**:
  ```
  Scenario: Preview returns compression stats for standard mode
    Tool: Bash (curl)
    Steps:
      1. curl -s -X POST http://localhost:3000/api/compression/preview \
           -H "Content-Type: application/json" \
           -d '{"messages":[{"role":"user","content":"Please could you kindly help me with this task. I was wondering if you might be able to assist."}],"mode":"standard"}'
    Expected Result: HTTP 200, JSON with originalTokens > 0, compressedTokens > 0, savingsPct >= 0, techniquesUsed is array
    Evidence: .sisyphus/evidence/task-3-preview-standard.json

  Scenario: mode=off returns no compression
    Tool: Bash (curl)
    Steps:
      1. Same as above but "mode":"off"
    Expected Result: tokensSaved === 0, compressed === original (or very close)
    Evidence: .sisyphus/evidence/task-3-preview-off.json

  Scenario: Missing mode field returns 400
    Tool: Bash (curl)
    Steps:
      1. curl -s -X POST http://localhost:3000/api/compression/preview \
           -H "Content-Type: application/json" \
           -d '{"messages":[{"role":"user","content":"test"}]}'
    Expected Result: HTTP 400
    Evidence: .sisyphus/evidence/task-3-preview-400.json
  ```

  **Commit**: YES (separate commit)
  - Message: `feat(compression): add /api/compression/preview endpoint`
  - Files: `src/app/api/compression/preview/route.ts`

---

- [ ] 4. `CompressionAnalyticsTab.tsx` + wire into analytics page

  **What to do**:
  - Create `src/app/(dashboard)/dashboard/analytics/CompressionAnalyticsTab.tsx`
  - Fetch from `GET /api/analytics/compression?since={range}` — add `since` range selector (24h / 7d / 30d / all)
  - Display StatCards: Total Requests, Total Tokens Saved, Avg Savings %, Avg Duration ms
  - Display mode distribution bar chart using `ProviderBar`-style CSS bars (copy pattern from `SearchAnalyticsTab.tsx` exactly)
  - Display provider breakdown bar chart (same CSS bar pattern)
  - Display last24h sparkline as simple flex row of bars (height proportional to count)
  - Loading skeleton: use `card animate-pulse` divs matching existing skeleton pattern
  - Edit `src/app/(dashboard)/dashboard/analytics/page.tsx`:
    - Add `import CompressionAnalyticsTab from "./CompressionAnalyticsTab"` 
    - Add `{ value: "compression", label: "Compression" }` to SegmentedControl options
    - Add `tabDescriptions.compression` string: `"Token compression analytics — savings by mode, provider, and time."`
    - Add `{activeTab === "compression" && <CompressionAnalyticsTab />}` render

  **Must NOT do**:
  - No recharts, chart.js, d3, or any charting library
  - No duplicating `StatCard` or `ProviderBar` — copy inline (they're local to SearchAnalyticsTab, not exported)
  - No TypeScript `any` casts

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI component matching existing visual patterns
  - **Skills**: `frontend-ui-ux`

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 7, 8)
  - **Blocks**: None (leaf node)
  - **Blocked By**: Task 2

  **References**:
  - `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx` — EXACT visual pattern: StatCard, ProviderBar, fetch pattern, loading state
  - `src/app/(dashboard)/dashboard/analytics/page.tsx` — SegmentedControl wiring pattern
  - `src/app/api/analytics/compression/route.ts` (Task 2) — response shape

  **Acceptance Criteria**:
  - [ ] `npm run typecheck:core` → 0 errors on new file
  - [ ] analytics/page.tsx has 6 tab options including `compression`
  - [ ] CompressionAnalyticsTab renders StatCard grid and two bar sections
  - [ ] No import of recharts/chart.js/d3 anywhere in file

  **QA Scenarios**:
  ```
  Scenario: Compression tab renders without crash (empty data)
    Tool: Bash (tsc check)
    Steps:
      1. npx tsc --noEmit --project tsconfig.json 2>&1 | grep CompressionAnalyticsTab
    Expected Result: No errors mentioning CompressionAnalyticsTab
    Evidence: .sisyphus/evidence/task-4-typecheck.txt

  Scenario: analytics/page.tsx includes compression tab
    Tool: Bash (grep)
    Steps:
      1. grep -n "compression" src/app/\(dashboard\)/dashboard/analytics/page.tsx
    Expected Result: At least 3 lines: import, SegmentedControl option, and render condition
    Evidence: .sisyphus/evidence/task-4-page-wired.txt
  ```

  **Commit**: YES (group with Task 5)
  - Message: `feat(compression): Phase 5 UI — analytics tab, settings page, combo override, playground preview`

---

- [ ] 5. `/dashboard/compression` standalone settings page

  **What to do**:
  - Create `src/app/(dashboard)/dashboard/compression/page.tsx`
  - This is a standalone route that embeds `CompressionSettingsTab` (already exists at `src/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab.tsx`)
  - Page layout: title bar ("Compression Settings" + icon `compress`) + description + the full `CompressionSettingsTab` component
  - Follow the same page wrapper pattern as other dashboard pages (see `src/app/(dashboard)/dashboard/analytics/page.tsx` — `flex flex-col gap-6`, `h1` with icon)
  - Add i18n via `useTranslations("compression")` — use keys `settingsTitle`, `settingsDescription` (add to all locale files in Task 9)
  - Export `generateMetadata` using `getTranslations`

  **Must NOT do**:
  - Do NOT re-implement CompressionSettingsTab — just import and render it
  - Do NOT add navigation sidebar entry (that's a separate concern, not in scope)
  - No new state management

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Simple page wrapper UI

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2 (with Tasks 4, 6, 7, 8)
  - **Blocks**: None
  - **Blocked By**: None (CompressionSettingsTab already exists)

  **References**:
  - `src/app/(dashboard)/dashboard/analytics/page.tsx` — page layout pattern
  - `src/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab.tsx` — component to import
  - `src/app/(dashboard)/dashboard/translator/page.tsx` — `generateMetadata` + server component wrapper pattern

  **Acceptance Criteria**:
  - [ ] `src/app/(dashboard)/dashboard/compression/page.tsx` exists
  - [ ] Route `/dashboard/compression` renders CompressionSettingsTab
  - [ ] `npm run typecheck:core` → 0 errors

  **QA Scenarios**:
  ```
  Scenario: /dashboard/compression page renders
    Tool: Bash (curl)
    Steps:
      1. curl -s http://localhost:3000/dashboard/compression | grep -i "compression"
    Expected Result: HTML response containing "compression" (page renders, not 404)
    Evidence: .sisyphus/evidence/task-5-page-render.txt
  ```

  **Commit**: YES (group with Task 4)

---

- [ ] 6. Per-combo compression override dropdown in combo builder

  **What to do**:
  - Find where per-target settings are rendered in `src/app/(dashboard)/dashboard/combos/page.tsx` (search for the target editor section)
  - For each combo target row/card, add a `<Select>` component with compression mode options: `off`, `lite`, `standard`, `aggressive`, `ultra`
  - Read current value from `combo.config.comboOverrides?.[target.id] ?? "off"` (the field exists in DB per Task 1 research)
  - On change: call existing combo update API (`PUT /api/combos/{id}`) with updated `config.comboOverrides`
  - Label: "Compression Override" with subtitle "Overrides global compression for this target"
  - Use `Select` from `@/shared/components` — same import pattern as rest of combos page

  **Must NOT do**:
  - No new API endpoints — use existing `PUT /api/combos/{id}`
  - No changing the DB schema for combos (comboOverrides already stored)
  - No touching combo builder step files other than the target list section of `page.tsx`

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI dropdown addition to existing form

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: None
  - **Blocked By**: None

  **References**:
  - `src/app/(dashboard)/dashboard/combos/page.tsx` — find the target list/editor section (grep for "target" or per-target settings)
  - `src/app/(dashboard)/dashboard/combos/BuilderIntelligentStep.tsx` — existing combo config pattern (`config`, `onChange` props)
  - `src/lib/db/compression.ts:77-79` — `comboOverrides: Record<string, CompressionMode>` field structure
  - `src/shared/components/Select.tsx` or `Select` from `@/shared/components` — component to use

  **Acceptance Criteria**:
  - [ ] Each combo target has a "Compression Override" select with 5 options
  - [ ] Selecting a mode and saving updates `combo.config.comboOverrides`
  - [ ] `npm run typecheck:core` → 0 errors

  **QA Scenarios**:
  ```
  Scenario: Compression override select visible per combo target
    Tool: Bash (grep)
    Steps:
      1. grep -n "CompressionMode\|comboOverrides\|Compression Override" src/app/\(dashboard\)/dashboard/combos/page.tsx
    Expected Result: At least 3 matches showing the dropdown is wired
    Evidence: .sisyphus/evidence/task-6-grep.txt
  ```

  **Commit**: YES (group with Tasks 4, 5, 7, 8)

---

- [ ] 7. Add `ultra` mode to `CompressionSettingsTab.tsx` MODES array

  **What to do**:
  - Open `src/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab.tsx`
  - Add `ultra` entry to the `MODES` array after `aggressive`:
    ```ts
    {
      value: "ultra",
      labelKey: "compressionModeUltra",
      descKey: "compressionModeUltraDesc",
      icon: "rocket_launch",
    }
    ```
  - The type `CompressionMode` already includes `"ultra"` (confirmed on line 7) — no type change needed
  - Add the two i18n keys `compressionModeUltra` and `compressionModeUltraDesc` to all 33 locale files in Task 9

  **Must NOT do**:
  - No other changes to CompressionSettingsTab
  - Do not add a new MODES constant elsewhere — edit the existing array in-place

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Single array entry addition

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: Task 9 (i18n keys for ultra mode)
  - **Blocked By**: None

  **References**:
  - `src/app/(dashboard)/dashboard/settings/components/CompressionSettingsTab.tsx:47-72` — MODES array to edit
  - `src/messages/en.json` — existing compression i18n key pattern (find `compressionModeAggressive` for reference)

  **Acceptance Criteria**:
  - [ ] MODES array has 5 entries: off, lite, standard, aggressive, ultra
  - [ ] `compressionModeUltra` and `compressionModeUltraDesc` keys exist in `en.json`
  - [ ] `npm run typecheck:core` → 0 errors

  **QA Scenarios**:
  ```
  Scenario: ultra mode appears in MODES array
    Tool: Bash
    Steps:
      1. grep -c "ultra" src/app/\(dashboard\)/dashboard/settings/components/CompressionSettingsTab.tsx
    Expected Result: count >= 1
    Evidence: .sisyphus/evidence/task-7-ultra-mode.txt
  ```

  **Commit**: YES (group with Tasks 4, 5, 6, 8)

---

- [ ] 8. Compression Preview in Translator Playground

  **What to do**:
  - Edit `src/app/(dashboard)/dashboard/translator/components/PlaygroundMode.tsx`
  - Add a "Compression Preview" toggle section below the existing translate controls
  - Toggle button: `<Button variant="ghost">` labeled "Compression Preview" with icon `compress`
  - When enabled, show:
    - A `<Select>` to pick compression mode (off/lite/standard/aggressive/ultra)
    - A "Preview" button that calls `POST /api/compression/preview` with current `inputContent` parsed as messages (extract `messages` from parsed JSON body, or wrap raw text as `[{role:"user",content:inputContent}]`)
    - Results panel: two side-by-side cards ("Original" / "Compressed") showing token counts + savings percentage
    - If `inputContent` is empty or invalid JSON, show inline error: "Enter valid JSON to preview compression"
  - Loading state: disable "Preview" button and show spinner while fetching
  - Keep all existing translate functionality untouched

  **Must NOT do**:
  - No modifying the translate flow
  - No new state management libraries
  - No breaking the existing Monaco editor layout

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI addition to existing playground component

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 2
  - **Blocks**: None
  - **Blocked By**: Task 3

  **References**:
  - `src/app/(dashboard)/dashboard/translator/components/PlaygroundMode.tsx:1-80` — existing structure (Monaco editor + translate controls)
  - `src/shared/components/Button.tsx`, `Select.tsx`, `Card.tsx` — components to use
  - Task 3 (`/api/compression/preview`) — endpoint to call, request/response shape

  **Acceptance Criteria**:
  - [ ] PlaygroundMode has "Compression Preview" toggle
  - [ ] Clicking Preview calls `/api/compression/preview` and shows token stats
  - [ ] Empty input shows error message, not crash
  - [ ] `npm run typecheck:core` → 0 errors

  **QA Scenarios**:
  ```
  Scenario: Compression preview toggle appears in playground
    Tool: Bash (grep)
    Steps:
      1. grep -n "compression/preview\|Compression Preview\|compressionMode" src/app/\(dashboard\)/dashboard/translator/components/PlaygroundMode.tsx
    Expected Result: At least 3 matches
    Evidence: .sisyphus/evidence/task-8-grep.txt

  Scenario: Preview button calls /api/compression/preview
    Tool: Bash (grep)
    Steps:
      1. grep -c "compression/preview" src/app/\(dashboard\)/dashboard/translator/components/PlaygroundMode.tsx
    Expected Result: count >= 1
    Evidence: .sisyphus/evidence/task-8-api-call.txt
  ```

  **Commit**: YES (group with Tasks 4, 5, 6, 7)

---

- [ ] 9. i18n keys — all 33 locale files

  **What to do**:
  - Find all locale files: `ls src/messages/` — should be 33 JSON files
  - Add the following new keys to EVERY locale file. Use English values for all non-English locales (fallback pattern used throughout the project):

  **New keys to add under `"analytics"` namespace** (or create if missing):
  ```json
  "compressionTab": "Compression",
  "compressionDescription": "Token compression analytics — savings by mode, provider, and time.",
  "compressionTotalRequests": "Total Requests",
  "compressionTokensSaved": "Tokens Saved",
  "compressionAvgSavings": "Avg Savings",
  "compressionAvgDuration": "Avg Duration",
  "compressionByMode": "By Mode",
  "compressionByProvider": "By Provider",
  "compressionLast24h": "Last 24h Activity"
  ```

  **New keys under `"compression"` namespace**:
  ```json
  "settingsTitle": "Compression Settings",
  "settingsDescription": "Configure context compression to reduce token usage.",
  "compressionModeUltra": "Ultra",
  "compressionModeUltraDesc": "Maximum compression — removes all non-essential content. Best for very long contexts."
  ```

  - Use a script or parallel editing — do NOT manually edit 33 files one by one. Write a small Node script `scripts/add-i18n-keys.mjs` that reads each file, merges keys, writes back. Run it. Then delete the script.

  **Must NOT do**:
  - No removing existing keys
  - No reordering existing keys
  - No adding keys that already exist (check first)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Scripted bulk edit of JSON files

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Tasks 7 confirms ultra mode key names)
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 11 (final typecheck before PR)
  - **Blocked By**: Task 7 (confirms key names)

  **References**:
  - `src/messages/en.json` — existing key structure and namespacing pattern
  - `src/messages/` — all 33 locale files
  - `src/app/(dashboard)/dashboard/analytics/SearchAnalyticsTab.tsx:*` — how analytics keys are used

  **Acceptance Criteria**:
  - [ ] `ls src/messages/ | wc -l` → same count (no files deleted)
  - [ ] `grep -l "compressionModeUltra" src/messages/*.json | wc -l` → 33
  - [ ] `grep -l "settingsTitle" src/messages/*.json | wc -l` → 33
  - [ ] `npm run typecheck:core` → 0 errors (no missing translation type errors)

  **QA Scenarios**:
  ```
  Scenario: All locale files have new keys
    Tool: Bash
    Steps:
      1. grep -l "compressionModeUltra" src/messages/*.json | wc -l
    Expected Result: 33
    Evidence: .sisyphus/evidence/task-9-i18n-count.txt
  ```

  **Commit**: YES (separate)
  - Message: `feat(compression): Phase 5 i18n keys (analytics + settings)`
  - Files: `src/messages/*.json`

---

- [ ] 10. Unit tests — `compressionAnalytics.test.ts` + `previewApi.test.ts`

  **What to do**:
  - Create `tests/unit/compression/compressionAnalytics.test.ts`:
    - Test `insertCompressionAnalyticsRow` — inserts a row, reads back via `getCompressionAnalyticsSummary`, verifies counts/sums
    - Test `getCompressionAnalyticsSummary` with `since` filter — only rows after cutoff are counted
    - Test empty table returns zeroed stats (not error)
    - Use in-memory DB or temp file DB (follow pattern in `tests/unit/compression/` existing tests)
  - Create `tests/unit/compression/previewApi.test.ts`:
    - Unit-test the preview logic (not the HTTP route — test the underlying compress function called by the route)
    - Test `mode: "off"` → no compression applied
    - Test `mode: "standard"` with a verbose input → `tokensSaved > 0`
    - Test invalid input → error thrown/returned
  - Both files use `node:test` + `assert` (existing test runner pattern — see `tests/unit/plan3-p0.test.ts`)

  **Must NOT do**:
  - No Vitest in these files — use `node:test` + `node:assert`
  - No HTTP calls — unit test the functions, not the routes
  - No `as any` in test code

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Requires understanding compression DB module + preview logic
  - **Skills**: none

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3
  - **Blocks**: Task 11
  - **Blocked By**: Tasks 1, 3

  **References**:
  - `tests/unit/compression/` — existing compression test files for style/patterns
  - `tests/unit/plan3-p0.test.ts` — `node:test` + `assert` pattern
  - `src/lib/db/compressionAnalytics.ts` (Task 1) — functions to test
  - `open-sse/services/compression/` — compression engine to test in preview tests

  **Acceptance Criteria**:
  - [ ] `node --import tsx/esm --test tests/unit/compression/compressionAnalytics.test.ts` → all pass
  - [ ] `node --import tsx/esm --test tests/unit/compression/previewApi.test.ts` → all pass
  - [ ] Coverage contribution: ≥60% on new lines (checked via `npm run test:coverage`)

  **QA Scenarios**:
  ```
  Scenario: compressionAnalytics tests all pass
    Tool: Bash
    Steps:
      1. node --import tsx/esm --test tests/unit/compression/compressionAnalytics.test.ts 2>&1
    Expected Result: "# tests N, pass N, fail 0"
    Evidence: .sisyphus/evidence/task-10-analytics-tests.txt

  Scenario: previewApi tests all pass
    Tool: Bash
    Steps:
      1. node --import tsx/esm --test tests/unit/compression/previewApi.test.ts 2>&1
    Expected Result: "# tests N, pass N, fail 0"
    Evidence: .sisyphus/evidence/task-10-preview-tests.txt
  ```

  **Commit**: YES (group with Task 9)
  - Message: `feat(compression): Phase 5 i18n keys (analytics + settings)`
  - Files: `tests/unit/compression/compressionAnalytics.test.ts`, `tests/unit/compression/previewApi.test.ts`

---

- [ ] 11. New branch, final typecheck + lint, open PR

  **What to do**:
  - Create branch `feat/compression-phase5` off `feat/compression-phase4` (or `main` if Phase 4 already merged): `git checkout -b feat/compression-phase5`
  - Run `npm run typecheck:core` → must be 0 errors
  - Run `npm run lint` → must be 0 errors
  - Run all compression tests: `node --import tsx/esm --test tests/unit/compression/*.test.ts`
  - Run `npm run test:coverage` → check 60% gate is met
  - Open PR: title `feat(compression): Phase 5 — Dashboard UI & Analytics (#1590)`, body listing all deliverables, linked to issue #1590
  - PR targets `diegosouzapw/OmniRoute:main` (or the upstream default branch)

  **Must NOT do**:
  - Do not merge — only open PR
  - Do not push to main directly

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Git + CI commands only
  - **Skills**: `git-master`

  **Parallelization**:
  - **Can Run In Parallel**: NO — must run after ALL other tasks
  - **Parallel Group**: Wave 3 (sequential, last)
  - **Blocks**: Nothing
  - **Blocked By**: All tasks 1–10

  **References**:
  - `.github/copilot-instructions.md` — PR requirements, coverage gate
  - PRs #1633, #1738, #1739, #1741 — existing PR title/body format to match

  **Acceptance Criteria**:
  - [ ] Branch `feat/compression-phase5` exists
  - [ ] `npm run typecheck:core` → 0 errors
  - [ ] `npm run lint` → 0 errors
  - [ ] All compression unit tests pass
  - [ ] PR opened, linked to #1590

  **QA Scenarios**:
  ```
  Scenario: typecheck clean
    Tool: Bash
    Steps:
      1. npm run typecheck:core 2>&1 | tail -5
    Expected Result: "Found 0 errors."
    Evidence: .sisyphus/evidence/task-11-typecheck.txt

  Scenario: lint clean
    Tool: Bash
    Steps:
      1. npm run lint 2>&1 | tail -5
    Expected Result: no error lines
    Evidence: .sisyphus/evidence/task-11-lint.txt
  ```

  **Commit**: NO (PR is opened, not a new commit)

---

## Final Verification Wave

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read plan end-to-end. For each "Must Have": verify implementation exists. For each "Must NOT Have": search codebase for forbidden patterns. Check evidence files exist.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + lint. Review changed files: no `as any`/`@ts-ignore`, no empty catches, no console.log in prod code, no AI slop.
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | VERDICT`

- [ ] F3. **Real QA** — `unspecified-high`
  Execute every QA scenario from every task. Save evidence to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `feat(compression): add compression_analytics table and analytics/preview API endpoints`
- **Wave 2**: `feat(compression): Phase 5 UI — analytics tab, settings page, combo override, playground preview`
- **Wave 3**: `feat(compression): Phase 5 i18n + tests`

## Success Criteria

```bash
npm run typecheck:core      # Expected: 0 errors
npm run lint                # Expected: 0 errors
node --import tsx/esm --test tests/unit/compression/compressionAnalytics.test.ts
node --import tsx/esm --test tests/unit/compression/previewApi.test.ts
curl http://localhost:3000/api/analytics/compression  # Expected: 200 + JSON stats
```

### Final Checklist
- [ ] All "Must Have" present
- [ ] All "Must NOT Have" absent
- [ ] All tests pass
- [ ] PR opened targeting upstream
