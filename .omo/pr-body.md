## Summary

Complete implementation of zero-config auto-routing — users can now use `auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, and `auto/smart` model prefixes without creating any manual combo.

### What's New

**Core Engine (open-sse/services/autoCombo/)**
- `autoPrefix.ts` — Parses `auto` and `auto/{variant}` prefixes (11 test cases)
- `virtualFactory.ts` — Builds virtual AutoComboConfig from connected providers
  - `config` wrapper fix (C1 root cause)
  - Empty pool early return with clear error (Q1)
- `chat.ts` integration (lines 280-329):
  - Auto-prefix detection before DB lookup
  - Settings enforcement — `autoRoutingEnabled` check (C2)
  - Variant fallback logic — `autoRoutingDefaultVariant` applied (C3)
  - Try/catch around dynamic imports (Q2)

**System Provider**
- Added `auto` entry to `src/shared/constants/providers.ts`
- Shows as "Auto (Built-in)" in provider list

**Dashboard UX**
- `AutoRoutingBanner.tsx` — dismissible banner below MaintenanceBanner
- localStorage persistence for dismissal state
- Shows connected provider count + docs link
- 5/5 unit tests

**Settings (src/app/dashboard/settings/RoutingTab.tsx)**
- Toggle: "Enable built-in auto combos" (default: on)
- Mode pack selector: default / coding / fast / cheap / offline / smart
- Per-user preference storage in DB
- Disabled → 400 error on auto requests

**Analytics**
- `AutoRoutingAnalyticsTab.tsx` — metrics panel with provider breakdown
- `/api/analytics/auto-routing/route.ts` — authenticated (`requireManagementAuth`)
- Tracks: total requests, success rate, top provider, fallback rate

**Documentation**
- README.md "Case 0: Zero-Config Mode" section
- `docs/AUTO-COMBO.md` — variants table + usage examples
- API reference updated

### Variants Supported

| Model | Mode Pack | Weights Highlights |
|-------|-----------|-------------------|
| `auto` | default | balanced (health 0.2, latencyInv 0.2, cost 0.1, quota 0.1, taskFit 0.2, stability 0.2) |
| `auto/coding` | quality-first | taskFit 0.4, stability 0.3 |
| `auto/fast` | ship-fast | latencyInv 0.4, stability 0.1 |
| `auto/cheap` | cost-saver | cost 0.5, quota 0.2 |
| `auto/offline` | offline-friendly | quota 0.5, stability 0.3 |
| `auto/smart` | quality-first + exploration | taskFit 0.4, explorationRate 0.1 |

### Critical Bugs Fixed

| ID | Issue | Fix |
|----|-------|-----|
| C1 | Bare `auto` not routed — variant-only check | Removed condition, `auto` → default variant |
| C2 | `autoRoutingEnabled` not enforced — always routed | Added settings check, 400 if disabled |
| C3 | `autoRoutingDefaultVariant` ignored — always default | Implemented fallback chain: setting → default |
| S1 | Analytics endpoint unauthenticated | Added `requireManagementAuth` middleware |
| Q1 | Empty provider pool crashes | Early return with clear error message |
| Q2 | Dynamic import errors unhandled | Wrapped in try/catch with fallback |

### Quality Gates

- ✅ TypeScript: `tsc --noEmit` clean
- ✅ Unit tests: **4155/4155 passing** (0 failures)
- ✅ Auto-routing tests: 11/11 passing
- ✅ ESLint: 0 errors
- ✅ No breaking changes — existing combos unaffected
- ✅ Coverage: ~85% (well above 60% minimum)

### Commits

1. `feat(auto): add auto prefix parser` (67cc0a65)
2. `feat(auto): complete zero-config auto-routing feature` (a10ef5ee)
3. `fix(security): require auth for auto-routing analytics`
4. `fix(auto): handle empty provider pool gracefully`
5. `fix(auto): enforce autoRoutingEnabled setting`
6. `fix(auto): apply autoRoutingDefaultVariant correctly`
7. `fix(auto): handle bare auto prefix without variant`

### Verification

All 9 plan tasks marked complete. Final Wave Wave 2 re-check APPROVED by all reviewers.

**User flow verified:**
```
Install → Add providers → Use model "auto" → Works (no combo creation needed)
```

## Test Plan

- ✅ Unit tests: `node --test tests/unit/autoPrefix.test.ts tests/unit/autoCombo/virtualFactory.test.ts`
- ✅ Integration: `npm run test:unit` (4155/4155 passing)
- ✅ TypeScript: `npm run typecheck:core` clean
- ✅ Manual QA: curl tests performed during development

## Related Issue

Closes #1849 (zero-config auto-routing feature request)
