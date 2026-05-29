# Plan: Zero-Config Auto-Routing with Built-in Auto Combos

## TL;DR

> Implement built-in auto-combos that activate automatically when users use the `auto/` model prefix — zero manual combo configuration required. Users install, add providers, and immediately use `auto`, `auto/coding`, `auto/fast`, etc.

---

## Context

### Original Request
User wants OmniRoute to be **the easiest-to-use AI router** — no combo creation required. After installing and adding provider credentials, users should be able to directly use `auto` or `auto/` prefixed models without any manual combo configuration.

### What We Have Today

OmniRoute already has a sophisticated **auto-combo engine** (`open-sse/services/autoCombo/`) with:
- Scoring based on 6 factors: health, latency, cost, quota, task fitness, stability
- Self-healing with circuit breaker integration
- 4 mode packs: `ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`
- 5% exploration rate for continuous optimization
- Intent classification for task-aware routing
- LKGP (Last Known Good Provider) for sticky routing
- Budget caps, candidate pool filtering

**But**: Users must manually create a combo with `type: "auto"` in dashboard or via API. No built-in default.

### The Gap

Current flow:
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

Desired flow:
```
1. Install OmniRoute
2. Add providers (credentials)
3. Use model: "auto" in AI tool — DONE
```

---

## Work Objective

**Build zero-config auto-routing** that works immediately after provider setup.

### Core Mechanism

Add **virtual auto-combos** triggered by model prefix:
- `auto` → default auto combo (all providers, default weights)
- `auto/coding` → auto combo with `quality-first` mode pack
- `auto/fast` → auto combo with `ship-fast` mode pack
- `auto/cheap` → auto combo with `cost-saver` mode pack
- `auto/offline` → auto combo with `offline-friendly` mode pack
- `auto/smart` → auto combo with `quality-first` + higher exploration

These are **not stored in DB** — they're resolved dynamically per request from connected providers.

---

## Concrete Deliverables

### Phase 1: Core Engine (must have)

1. **Auto-prefix resolver** — intercept model names starting with `auto/` before normal combo resolution
   - Extract variant (e.g., `coding`, `fast`, `cheap`, `offline`, `smart`) from prefix
   - Map to mode pack
   - Build virtual `AutoComboConfig`

2. **Virtual auto-combo factory** — generate `AutoComboConfig` from:
   - All provider connections with valid credentials
   - Mode pack weights (default or variant-specific)
   - Default exploration rate (5%)
   - Optional budget cap (None, or configurable via settings)

3. **Integration point** — modify `chatCore.ts` resolve flow:
   ```
   if model starts with "auto/":
     use virtualAutoCombo(model, providers)
   else if "default" combo:
     normal resolution
   ```

4. **Add provider alias** — create `providerId = "auto"` in `providers.ts` (system provider)

### Phase 2: UX Polish (should have)

5. **Dashboard indicator** — Show "Built-in Auto Combo: Enabled" on Combo page
   - "The `auto/` prefix is always available — no setup needed"
   - Display which providers are in the auto pool

6. **Settings integration** — Optional global config for auto combo:
   - Default mode pack (global override)
   - Exploration rate tweak
   - Enable/disable specific variants

7. **Documentation** — Add to README and docs:
   - "Zero-Config Mode" section explaining `auto/` prefix
   - When to use each variant
   - How to disable/customize

### Phase 3: Advanced (nice to have)

8. **Per-user auto preferences** — Store auto variant preference in settings
9. **Auto combo metrics** — Dashboard panel showing auto routing decisions
10. **Wildcard `auto*`** — Support `auto-*` patterns (e.g., `auto-fast` same as `auto/fast`)

---

## Verification Strategy

### Acceptance Criteria

- [ ] `auto` model name routes to best available provider (non-deterministic)
- [ ] `auto/coding` biases toward task fitness ≥ 0.4 in scoring
- [ ] `auto/fast` picks lowest latency (<200ms if available)
- [ ] `auto/cheap` selects cheapest provider (costInv weight 0.5–0.9)
- [ ] `auto/offline` prioritizes providers with highest quota remaining
- [ ] Works immediately after adding providers — no combo creation needed
- [ ] LKGP sticky behavior works within session (option "auto lkgp"? separate LKGP combo)
- [ ] All existing combos continue to work unchanged
- [ ] Type safety: no TS errors
- [ ] Test coverage ≥ 75% for `autoComboResolver.ts`

### QA Scenarios

Each phase has agent-executable tests verifying the routing logic.

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Core):
  1. Auto-prefix parser + model variant extractor
  2. Virtual auto-combo factory (build AutoComboConfig at runtime)
  3. Integration: modify combo.resolve to short-circuit for auto prefix
  4. Provider alias "auto" in constants

Wave 2 (UX):
  5. Dashboard indicator (static text)
  6. Settings integration (optional global overrides)
  7. Documentation updates

Wave 3 (Metrics):
  8. Metrics panel (auto routing stats)
  9. Per-user preference storage
```

**Dependencies:** Wave 2 depends on Wave 1. Wave 3 is independent (can run in parallel with Wave 2).

### Task Splitting

- Task 1: `autoPrefix.ts` — parse `auto[/variant]` strings, return variant enum
- Task 2: `virtualAutoCombo.ts` — factory that collects connected providers, builds candidate pool, applies mode pack
- Task 3: `comboResolver.ts` modification — detect auto prefix, short-circuit DB lookup
- Task 4: `providers.ts` — add `auto: { id: "auto", ... }` as system provider placeholder
- Task 5: Dashboard banner component
- Task 6: Settings schema update + API route
- Task 7: README docs
- Task 8: AutoCombo metrics panel
- Task 9: User preference storage (optional)

---

## Dependencies

- Existing auto-combo engine (`open-sse/services/autoCombo/`) — **no changes needed**, reuse as-is
- Provider registry and connection state — read-only access
- Combo resolution flow (`open-sse/services/combo.ts`) — modify to intercept auto prefix
- Dashboard UI — minimal changes (informational only)

**No breaking changes** — existing combos fully intact.

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Auto routing picks low-quality provider by default | Users blame OmniRoute | Ship with conservative default weights (health/latency heavy), tune based on telemetry |
| Unexpected behavior if no providers connected | Silent failure | Return clear error: "No providers connected — add at least one provider to use `auto/`" |
| Performance overhead (scoring on every request) | Extra 2–5ms | Acceptable — auto-combo already fast; candidates come from cached connections |
| LKGP confusion when using `auto` prefix | Users expect stickiness | Document: LKGP requires explicit combo; `auto` does not remember (or add auto-lkgp variant) |

---

## Success Criteria

1. A new user can install OmniRoute, add any provider, and use `auto` or `auto/coding` immediately
2. Zero manual combo creation required
3. Existing combo workflows unchanged
4. No performance regression (<10ms routing overhead)
5. All tests pass (`npm run test` and coverage ≥ 60%)
6. Documentation updated

**Success metric:** "Oh that's it?" reaction from first-time users.

---

## Post-Launch: Gather feedback via

- Telemetry: track `auto/` variant usage
- Success rate: % of auto requests that succeed vs fail
- Fallback rate: how often auto falls back to secondary providers
- Most selected provider per variant

Tune default weights after 2 weeks based on real data.

---

Now opening the GitHub issue…
