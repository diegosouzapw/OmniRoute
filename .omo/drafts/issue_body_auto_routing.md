## Problem / Use Case

Currently, OmniRoute requires users to manually create combos before they can use intelligent routing. After installing and adding provider credentials, users must:

1. Open Dashboard → Combos
2. Create a new combo (name, type=auto, configure weights, select providers)
3. Save
4. Then use that combo name as the model

This is too much friction for new users who just want to "use OmniRoute and let it pick the best model automatically." Competitors like BazaarLink (provider) offer `auto:free` zero-config routing out of the box. We want OmniRoute to be the easiest AI router to use — no config required.

In short: Users want to install → add providers → use `auto` → DONE.

## Proposed Solution

Implement **built-in virtual auto-combos** that are always available by default, triggered via the `auto/` model prefix. These combos do NOT require manual creation — they resolve dynamically from all connected providers using the existing auto-combo engine.

### User Experience
```
Model               → What it does
─────────────────────────────────────────────────────────────
auto                → Best overall provider (default weights)
auto/coding         → Best for coding tasks (quality-first mode pack)
auto/fast           → Fastest available provider (ship-fast mode pack)
auto/cheap          → Cheapest available provider (cost-saver mode pack)
auto/offline        → Most quota-available (offline-friendly mode pack)
auto/smart          → Quality-first with 10% exploration
```

### Technical Implementation
1. **Auto-prefix detection** — intercept `auto` prefix in `chatCore.ts` before DB lookup
2. **Virtual auto-combo factory** — build `AutoComboConfig` at request-time from connected providers
3. **Reuse existing engine** — call `selectProvider()` from `open-sse/services/autoCombo/engine.ts`
4. **No DB writes** — virtual combo lives only in memory per request

File changes:
- `open-sse/services/combo.ts` — add prefix check before DB lookup
- `open-sse/services/autoCombo/virtualFactory.ts` — new factory
- `src/shared/constants/providers.ts` — add system provider `auto`
- `docs/` — "Zero-Config Mode" section

**No breaking changes** — existing combos preserved.

## Alternatives Considered

1. **Make `auto` a reserved combo name auto-created** — still requires save. Less seamless.
2. **Auto-combo as the only combo** — eliminates manual combos entirely. Too restrictive.
3. **First use creates DB combo** — adds DB state, cleanup complexity.
4. **Do nothing** — lose zero-config competitive edge.

## Acceptance Criteria

- [ ] Model name starting with `auto` routes without any saved combo
- [ ] All 5 variants (`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`) route correctly
- [ ] Uses existing auto-combo engine with correct mode packs
- [ ] Candidate pool = all *connected* providers with credentials
- [ ] Works alongside existing combos
- [ ] Unit tests for prefix parser + virtual combo factory
- [ ] Integration test for `auto` prefix routing flow
- [ ] Updated docs (README + Auto Combo guide)
- [ ] Dashboard shows "Built-in Auto Combo" indicator
- [ ] Performance: <10ms overhead

## Area (multiple)

- [x] Proxy / Routing
- [x] Dashboard / UI
- [x] Documentation

## Related Provider(s)

All connected providers

## Additional Context

**Existing infrastructure reused:**
- `open-sse/services/autoCombo/engine.ts` → `selectProvider()`
- `open-sse/services/autoCombo/scoring.ts`, `selfHealing.ts`, `modePacks.ts`, `taskFitness.ts`
- `open-sse/services/wildcardRouter.ts` — pattern matching

**Competitive advantage:** Makes OmniRoute uniquely plug-and-play. Competitors require combo/routing config; we become the "just works" option.

## Expected Test Plan

- Unit tests for `autoPrefix` parser (9 cases: valid auto, auto/coding, auto/fast, auto/cheap, auto/offline, auto/smart, auto/, invalid)
- Unit tests for `virtualAutoCombo` factory (connected provider filtering, mode pack mapping)
- Integration test: `auto/coding` routes without saved combo
- Integration test: all 5 variants produce distinct weights
- E2E test: dashboard indicator + auto model works
- Regression: existing manual combos still work
- Performance benchmark: <10ms overhead
