# Plan: Zero-Config Auto-Routing with Built-in Auto Combos

## TL;DR

> Implement built-in auto-combos that activate automatically when users use the `auto/` model prefix — zero manual combo configuration required. Users install, add providers, and immediately use `auto`, `auto/coding`, `auto/fast`, etc.

---

## Context

### Original Request
User wants OmniRoute to be **the easiest-to-use AI router** — no combo creation required. After installing and adding provider credentials, users should be able to directly use `auto` or `auto/` prefixed models without any manual combo configuration.

### Current State
- Sophisticated auto-combo engine exists (`open-sse/services/autoCombo/`)
- Scoring: 6 factors (health, latency, cost, quota, taskfitness, stability)
- Self-healing + circuit breaker integration
- 4 mode packs: `ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`
- 5% exploration rate
- Intent classification for task-aware routing
- LKGP (Last Known Good Provider) for sticky routing

**Gap**: Users must manually create a combo with `type: "auto"`. No built-in defaults.

### The Gap (Current Flow)
```
1. Install OmniRoute
2. Add providers (credentials)
3. Dashboard → Combos → Create new combo
   - Name: "my-auto"
   - Type: "auto"
   - Candidate pool: select providers
   - Weights: optional
4. Use model: "my-auto" in AI tool
```

**Desired Flow:**
```
1. Install OmniRoute
2. Add providers (credentials)
3. Use model: "auto" in AI tool — DONE
```

---

## Work Objectives

### Core Objective
Implement zero-config auto-routing that works immediately after provider setup.

### Mechanism: Virtual Auto Combos
- `auto` → best overall provider (default weights)
- `auto/coding` → quality-first mode pack
- `auto/fast` → ship-fast mode pack
- `auto/cheap` → cost-saver mode pack
- `auto/offline` → offline-friendly mode pack
- `auto/smart` → quality-first + 10% exploration

These are **virtual** — not stored in DB, resolved dynamically per request from connected providers.

### Concrete Deliverables

**Phase 1 (Core):**
1. Auto-prefix resolver — intercept `auto/` model names before DB lookup
2. Virtual auto-combo factory — build `AutoComboConfig` from connected providers
3. Integration into combo resolution flow (`chatCore.ts`)
4. System provider entry `auto` in `providers.ts`

**Phase 2 (UX):**
5. Dashboard indicator — "Built-in Auto Combo enabled"
6. Optional settings for global auto defaults
7. Documentation updates (README, Auto Combo guide)

**Phase 3 (Polish):**
8. Metrics panel for auto routing decisions
9. Per-user auto preference storage

### Definition of Done

- All 6 variants route correctly using correct mode packs
- Works for any user with connected providers (zero config)
- No breaking changes to existing combos
- Unit + integration + e2e test coverage
- Docs updated
- Dashboard indicates auto combo active

---

## Must Have

- Virtual auto combo activated by `auto` prefix
- Uses existing scoring engine unchanged
- Candidate pool = connected providers only (credentials present)
- All 5 mode pack variants work
- No manual combo creation required

### Must NOT Have (Guardrails)

- No DB writes for virtual combos
- No changes to existing combo behavior
- No breaking changes to API or existing user configs
- No performance regression (<10ms overhead)
- No new lang/runtime dependencies

---

## Verification Strategy

### Test Decision
- Infrastructure: vitest + node native test runner
- Strategy: unit → integration → e2e

### QA Policy
All verification agent-executed. No manual steps.

---

## Execution Strategy

### Parallel Waves

```
Wave 1 (Core — can parallelize internally):
  T1: Auto-prefix parser (isolated)
  T2: Virtual combo factory (depends: T1)
  T3: Combo resolver integration (depends: T1, T2)
  T4: Provider alias "auto" (can start immediately)

Wave 2 (UX — depends on Wave 1):
  T5: Dashboard indicator (depends: T4)
  T6: Settings integration (depends: T4)
  T7: Documentation (independent)

Wave 3 (Polish — depends on T5/T6):
  T8: Metrics panel (depends: T5)
  T9: User preferences (depends: T6)
```

Target: 4–5 tasks per wave.

### Dependency Matrix

```
T1 (parser): None → T2, T3
T2 (factory): T1 → T3
T3 (integration): T1, T2 → Wave 2
T4 (provider alias): None
T5 (dashboard): T4 → T8
T6 (settings): T4 → T9
T7 (docs): None
T8 (metrics): T5
T9 (preferences): T6
```

---

## TODOs

- [x] 1. Implement auto-prefix parser

  **What to do:**
  - Create `open-sse/services/autoCombo/autoPrefix.ts`
  - Parse model string: `auto` or `auto/{variant}`
  - Return `{ valid: true, variant?: 'coding'|'fast'|'cheap'|'offline'|'smart' }` or error
  - Handle edge cases: `auto/` (no variant) → default; `autoXYZ` → invalid

  **Must NOT do:**
  - Do not call DB; pure string parsing

  **Recommended Agent Profile:**
  - Category: `quick`
  - Skills: none needed
  - Reason: Simple string parsing, no external dependencies

  **Parallelization:**
  - Can Run In Parallel: YES
  - Parallel Group: Wave 1
  - Blocks: T2, T3
  - Blocked By: None

  **References:**
  - `open-sse/services/wildcardRouter.ts` — wildcard pattern parsing pattern
  - `open-sse/services/autoCombo/modePacks.ts` — valid variant list (coding = quality-first, fast = ship-fast, cheap = cost-saver, offline = offline-friendly, smart = quality-first + higher exploration)

  **Acceptance Criteria:**
  - [ ] `parseAutoPrefix("auto")` → `{ valid: true }`
  - [ ] `parseAutoPrefix("auto/coding")` → `{ valid: true, variant: "coding" }`
  - [ ] `parseAutoPrefix("auto/fast")` → `{ valid: true, variant: "fast" }`
  - [ ] `parseAutoPrefix("auto/cheap")` → `{ valid: true, variant: "cheap" }`
  - [ ] `parseAutoPrefix("auto/offline")` → `{ valid: true, variant: "offline" }`
  - [ ] `parseAutoPrefix("auto/smart")` → `{ valid: true, variant: "smart" }`
  - [ ] `parseAutoPrefix("auto/")` → `{ valid: true }` (empty variant = default)
  - [ ] `parseAutoPrefix("autocoding")` → `{ valid: false }` (invalid pattern)
  - [ ] `parseAutoPrefix("other")` → `{ valid: false }`

  **QA Scenarios:**

  Scenario: Valid auto prefixes parse correctly
    Tool: Bash (node --test)
    Preconditions: Clean build
    Steps:
      1. Run: `node --test tests/unit/autoPrefix.test.ts`
    Expected Result: All tests pass (9/9)
    Failure Indicators: Any test fails
    Evidence: .sisyphus/evidence/task-1-auto-prefix-parser.log

  Scenario: Integration without breaking existing routing
    Tool: Bash (bun test)
    Preconditions: Previous tasks complete
    Steps:
      1. Run: `npm run test:unit`
      2. Focus on autoCombo tests remain green
    Expected Result: No regressions; autoPrefix tests included
    Failure Indicators: 2+ test failures in autoCombo suite
    Evidence: .sisyphus/evidence/task-1-auto-prefix-integration.log

  **Evidence to Capture:**
  - [x] Unit test output
  - [x] Integration test run

  **Commit:** YES (individual commit)

---

- [x] 2. Virtual auto-combo factory

  **What to do:**
  - Create `open-sse/services/autoCombo/virtualFactory.ts`
  - Function: `createVirtualAutoCombo(connectedProviders, variant): AutoComboConfig`
  - Get connected providers from DB/LocalDb (`providerConnections` table, filter `connected = true`)
  - Build candidate pool: array of `{ provider: string, model: string, modelStr: string }`
  - Resolve mode pack weights from variant:
    - default → DEFAULT_WEIGHTS (engine default)
    - coding → `quality-first`
    - fast → `ship-fast`
    - cheap → `cost-saver`
    - offline → `offline-friendly`
    - smart → `quality-first` + exploration=0.1
  - Return `AutoComboConfig`:
    ```ts
    {
      id: "auto-virtual",
      name: "Auto (Built-in)",
      type: "auto",
      candidatePool: [...providers],
      weights: modePackWeights,
      explorationRate: variant === 'smart' ? 0.1 : 0.05,
      budgetCap: undefined
    }
    ```
  - Error if no connected providers → return empty array (combo resolver will throw clear error)

  **Must NOT do:**
  - Do NOT persist config to DB
  - Do NOT modify provider selection logic

  **Recommended Agent Profile:**
  - Category: `quick`
  - Skills: none
  - Reason: Pure factory logic; DB read only

  **Parallelization:**
  - Can Run In Parallel: YES (after T1 parser)
  - Parallel Group: Wave 1
  - Blocks: T3
  - Blocked By: T1

  **References:**
  - `open-sse/services/autoCombo/engine.ts:56` — `selectProvider()` signature
  - `src/lib/db/providers.ts` — how to read provider connections
  - `open-sse/services/autoCombo/modePacks.ts` — mode pack definitions
  - `src/lib/localDb.ts` — db modules export

  **Acceptance Criteria:**
  - [ ] Factory returns AutoComboConfig for any variant
  - [ ] candidatePool contains only providers with `connected = true` and valid API key/OAuth
  - [ ] Wrong variant throws or falls back to default
  - [ ] Returns empty config when no providers connected (handled upstream)

  **QA Scenarios:**

  Scenario: Factory builds valid config with connected providers
    Tool: Bash (node --test)
    Preconditions: At least 1 provider connected in DB (simulate with mock)
    Steps:
      1. Run unit test suite for virtualFactory
      2. Assert candidatePool length matches connected count
      3. Assert weights object contains all 6 factor keys
    Expected Result: Config object valid and complete
    Failure Indicators: Missing keys, null provider list
    Evidence: .sisyphus/evidence/task-2-virtual-factory.log

  Scenario: No providers returns empty config
    Tool: Bash (node --test)
    Steps:
      1. Call factory with empty connected providers
      2. Return [] or AutoComboConfig with empty pool
    Expected Result: Graceful empty result (not crash)
    Failure Indicators: Throws exception
    Evidence: .sisyphus/evidence/task-2-no-providers.log

  **Evidence to Capture:**
  - [x] Unit test output
  - [x] Config validation

  **Commit:** YES (individual commit)

---

- [x] 3. Integrate auto prefix into combo resolution

  **What to do:**
  - Modify `open-sse/services/combo.ts` in `resolveComboTargets()` function
  - Before DB lookup, check if parsedModel has auto prefix:
    ```ts
    if (parsedModel.provider === "auto") {
      // 1. Get all connected providers with credentials
      const connected = await getConnectedProviders()
      // 2. Parse auto prefix to get variant
      const variant = parseAutoPrefix(parsedModel.model) // model string after provider
      // 3. Build virtual combo config via virtualFactory
      const virtualConfig = createVirtualAutoCombo(connected, variant)
      // 4. Call selectProvider() directly, get selected provider+model
      const selection = selectProvider(virtualConfig, candidates, taskType, messages)
      // 5. Return ResolvedComboTarget with selected provider
      return [{
        provider: selection.provider,
        model: selection.model,
        // ... other fields
      }]
    }
    ```
  - Connected providers: query `providerConnections` where `connected = true` + has creds
  - Fallback: If no providers connected, throw clear error

  **Must NOT do:**
  - Do NOT store virtual combo in DB
  - Do NOT skip auth/breaker checks (reuse existing flow after provider selection)

  **Recommended Agent Profile:**
  - Category: `deep` (touches routing core)
  - Skills: none required
  - Reason: Needs to understand `resolveComboTargets` flow; moderate complexity

  **Parallelization:**
  - Can Run In Parallel: NO — depends on T1 & T2
  - Parallel Group: Wave 1 sequential
  - Blocks: Wave 2
  - Blocked By: T1, T2

  **References:**
  - `open-sse/services/combo.ts:992` — `resolveComboTargets()` function signature
  - `open-sse/services/autoCombo/engine.ts:56` — `selectProvider()` usage
  - `src/lib/db/providers.ts` — `getProviderConnections()` or similar
  - `open-sse/services/model.ts` — parsed model structure (`{ provider, model }`)

  **Acceptance Criteria:**
  - [ ] Model `auto` routes without DB combo lookup
  - [ ] Model `auto/coding` uses `quality-first` weights
  - [ ] Model `auto/fast` uses `ship-fast` weights
  - [ ] Model `auto/cheap` uses `cost-saver` weights
  - [ ] Model `auto/offline` uses `offline-friendly` weights
  - [ ] Model `auto/smart` uses `quality-first` + exploration 0.1
  - [ ] Error thrown if no providers connected: "No providers connected — connect at least one provider to use auto routing"
  - [ ] Existing combos unaffected (regression check)

  **QA Scenarios:**

  Scenario: auto prefix routes directly without DB lookup
    Tool: Interactive bash (tmux)
    Preconditions: OmniRoute running, at least 1 provider connected (e.g., OpenAI key added)
    Steps:
      1. Send request: `curl -X POST http://localhost:20128/v1/chat/completions \
          -H "Authorization: Bearer test" \
          -H "Content-Type: application/json" \
          -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'`
      2. Observe response status 200
      3. Check logs: should contain "[AUTO] Selected provider X via virtual combo"
    Expected Result: 200 OK, valid response stream/JSON
    Failure Indicators: 400/500 error, "combo not found"
    Evidence: .sisyphus/evidence/task-3-integration-curl-response.json

  Scenario: auto/coding uses quality-first weights
    Tool: Interactive bash (tmux) + log inspection
    Preconditions: Mock providers to inspect weights used (or use test mode)
    Steps:
      1. Send request with model `auto/coding`
      2. Enable debug logging
      3. Inspect log: "[AUTO] scoring weights: health=0.2, latencyInv=0.05, taskFit=0.4 ..."
    Expected Result: taskFit weight 0.4 (from quality-first)
    Failure Indicators: Different weights (e.g., latency-heavy)
    Evidence: .sisyphus/evidence/task-3-weights-inspection.log

  Scenario: Existing manual combos still work
    Tool: Bash (curl)
    Steps:
      1. Create a manual combo "test-combo" via API
      2. Request with model `test-combo`
    Expected Result: Routes as before (no regression)
    Failure Indicators: 400 "combo not found" or auto prefix logic applied incorrectly
    Evidence: .sisyphus/evidence/task-3-manual-combo-regression.json

  **Evidence to Capture:**
  - [x] Curl response (status, body)
  - [x] Debug log snippets
  - [x] Manual combo check

  **Commit:** YES (individual commit)

---

- [x] 4. Add system provider entry `auto`

  **What to do:**
  - Edit `src/shared/constants/providers.ts`
  - Add entry to `APIKEY_PROVIDERS`:
    ```ts
    auto: {
      id: "auto",
      alias: "auto",
      name: "Auto (Built-in)",
      icon: "auto_awesome",
      color: "#8B5CF6",
      textIcon: "AUTO",
      hasFree: true,
      freeNote: "Built-in auto-routing — no API key needed",
    }
    ```
  - Show in provider list as "system" provider (no actual credentials stored)

  **Must NOT do:**
  - Do NOT add to providerRegistry (no actual executor — virtual)

  **Parallelization:**
  - Can Run In Parallel: YES (with Wave 1)
  - Parallel Group: Wave 1
  - Blocks: None
  - Blocked By: None

  **References:**
  - `src/shared/constants/providers.ts` — existing provider entries near top (alphabetical)
  - Model icon names: use existing Material icon "auto_awesome"

  **Acceptance Criteria:**
  - [ ] TypeScript compiles
  - [ ] No aliasing conflicts with existing providers
  - [ ] Appears in providers list (optional) with "No API key required"

  **QA Scenarios:**

  Scenario: Provider alias doesn't conflict
    Tool: Bash (tsc --noEmit)
    Steps:
      1. Run: `npm run typecheck:core`
    Expected Result: Zero type errors
    Failure Indicators: Duplicate identifier error
    Evidence: .sisyphus/evidence/task-4-typecheck.log

  **Evidence to Capture:**
  - [x] tsc output

  **Commit:** YES (individual commit)

---

- [x] 5. Dashboard indicator

  **What to do:**
  - On Combo page (or Providers page), add banner: "Built-in Auto Combo is enabled — use models: `auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`. No setup required."
  - Link to docs
  - Show count of connected providers in auto pool

  **Must NOT do:**
  - Do not require user action to "enable" — it's always on

  **Parallelization:**
  - Can Run In Parallel: NO
  - Blocks: Wave 3
  - Blocked By: T4

  **References:**
  - `src/app/dashboard/combos/page.tsx` — or similar dashboard page
  - Existing banner component pattern (e.g., "Quick Setup" banner)

  **Acceptance Criteria:**
  - [ ] Banner visible on Combos page
  - [ ] Lists all 6 auto model names
  - [ ] Shows count of connected providers
  - [ ] Links to documentation section

  **QA Scenarios:**

  Scenario: Auto combo indicator visible
    Tool: Playwright
    Steps:
      1. Open http://localhost:20128/dashboard/combos
      2. Locate "Built-in Auto Combo" banner
    Expected Result: Banner displays with 6 model names and docs link
    Failure Indicators: Bannermissing or broken markup
    Evidence: .sisyphus/evidence/task-5-dashboard-screenshot.png

  **Evidence to Capture:**
  - [x] Screenshot of dashboard with banner

  **Commit:** YES (individual commit)

---

- [x] 6. Settings integration (optional global defaults)

  **What to do:**
  - Add settings schema entries:
    - `autoDefaultModePack`: string (default: "")
    - `autoExplorationRate`: number (default: 0.05)
    - `autoEnabled`: boolean (always true, allow disable)
  - Settings page: toggle "Enable built-in auto combos (default on)"; mode pack selector
  - If disabled, auto prefix returns error 400 "Auto routing disabled"

  **Must NOT do:**
  - Overcomplicate — keep minimal (just enable/disable + mode pack)

  **Parallelization:**
  - Can Run In Parallel: NO
  - Blocks: Wave 3
  - Blocked By: T4

  **References:**
  - `src/lib/db/settings.ts` — setting schema
  - `src/app/api/settings/` — API routes
  - Dashboard settings page components

  **Acceptance Criteria:**
  - [ ] Settings persist to DB
  - [ ] If disabled, auto requests get 400 error
  - [ ] Override mode pack applies globally when set

  **QA Scenarios:**

  Scenario: Disable auto via settings blocks auto prefix
    Tool: Playwright + curl
    Steps:
      1. In dashboard settings, disable "Built-in Auto Combo"
      2. Curl model `auto` → expect 400 with "disabled" message
    Expected Result: 400 Bad Request auto_disabled
    Failure Indicators: Still routes despite setting
    Evidence: .sisyphus/evidence/task-6-settings-disable.json

  **Evidence to Capture:**
  - [x] Curl response with error
  - [x] Settings screenshot

  **Commit:** YES

---

- [x] 7. Documentation

  **What to do:**
  - Update README.md: add "Zero-Config Mode" section
  - Add docs page: `docs/ZERO_CONFIG_AUTO.md` explaining auto variants
  - Update API reference: "Model name" section
  - Add to dashboard screenshots with auto combo shown

  **Must NOT do:**
  - Do not remove existing content

  **Parallelization:**
  - Can Run In Parallel: YES (with Wave 2)
  - Blocks: None
  - Blocked By: T5 (indicator must exist first)

  **References:**
  - `README.md` — end of "Free Models" section
  - `docs/` — existing guide structure

  **Acceptance Criteria:**
  - [ ] README updated with table of auto variants
  - [ ] Dedicated docs page created
  - [ ] API reference mentions auto prefix

  **QA Scenarios:**

  Scenario: Docs accessible and accurate
    Tool: Web fetch / playwright
    Steps:
      1. Visit README on GitHub
      2. Search for "auto/" prefix
    Expected Result: Clear explanation found
    Failure Indicators: Missing section or dead links
    Evidence: .sisyphus/evidence/task-7-docs-screenshot.png

  **Evidence to Capture:**
  - [x] Docs screenshot

  **Commit:** YES

---

- [x] 8. Metrics panel

  **What to do:**
  - Dashboard panel: "Auto Routing Stats"
  - Show: total auto requests, success rate, top selected provider, fallback rate
  - Data from request logs (where model starts with "auto/")
  - Chart: last 24h auto selections by provider

  **Must NOT do:**
  - Don't store additional data — use existing analytics

  **Parallelization:**
  - Can Run In Parallel: NO
  - Blocks: Wave 3 only
  - Blocked By: T5

  **References:**
  - `src/app/dashboard/analytics/page.tsx` — existing analytics patterns
  - `src/lib/usage/` — usage tracking

  **Acceptance Criteria:**
  - [ ] Panel on Analytics or separate Auto page
  - [ ] Success rate ≥ 95% displayed
  - [ ] Top provider breakdown shown

  **QA Scenarios:**

  Scenario: Metrics panel renders
    Tool: Playwright
    Steps:
      1. Navigate to /dashboard/analytics or /dashboard/auto
      2. Panel visible with numbers
    Expected Result: Panel shows real data (if auto requests made)
    Failure Indicators: Panel absent or 0/N/A
    Evidence: .sisyphus/evidence/task-8-metrics-screenshot.png

  **Evidence to Capture:**
  - [x] Screenshot

  **Commit:** YES

---

- [x] 9. User preferences (optional)

  **What to do:**
  - Store per-user auto variant preference (default: none → always default auto)
  - Allow user to set `autoPrefersVariant` in settings
  - Next auto request from that user uses that variant

  **Must NOT do:**
  - Do NOT implement if Wave 2 not needed

  **Reference:** user settings schema

---

## Final Verification Wave

After all tasks: 4 parallel review agents → must ALL approve → user okay.

**Wave 1:** F1 (Integration) ⚠️ | F2 (Plan) REJECT | F3 (Code Quality) REJECT | F4 (Security) APPROVE
**Wave 2 (re-check):** All critical fixes applied (C1-C3, security, empty pool, try/catch) → APPROVED

---

## Commit Strategy

One commit per task (9 tasks). Prefix:
- `feat(auto): add auto prefix parser`
- `feat(auto): add virtual auto-combo factory`
- `feat(auto): integrate virtual auto combo into resolution`
- `feat(providers): add system provider "auto"`
- `feat(dashboard): show built-in auto combo banner`
- `feat(settings): add auto combo enable/disable + mode pack`
- `docs: add zero-config auto routing docs`
- `feat(analytics): add auto routing metrics`
- `feat(settings): store per-user auto variant preference`

---

## Success Criteria

- New user flow: install → add providers → set model to `auto` → works
- All 6 auto variants route correctly per mode pack
- No breaking changes
- Coverage ≥ 60%
- No performance regression
- Docs publish with examples

---

## Post-Launch: Metrics to Track

- `auto_` prefix request volume (total requests %)
- Auto success rate vs manual combos
- Selected provider distribution per variant
- Fallback rate (how often auto falls back to secondary)
- User retention after adding auto combo

Tune default weights after 2 weeks based on real data.

---

## Questions

1. Should `auto` imply "any model" or "coding"? Consensus: `auto` = default weights (balanced), not coding-specific.
2. Should LKGP apply to auto? Likely yes — remember last selected provider per session (store in memory only).
3. Should we support `auto:*` wildcards? Future: `auto-*` patterns.
4. Global disable setting needed? Yes — enterprise admins may want to enforce manual combos only.

---

**Ready to build?** → Delegate to Sisyphus-Junior with this plan.
