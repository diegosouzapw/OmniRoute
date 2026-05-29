# Momus Review: Zero-Config Auto-Routing Plan

## Review Status
**Plan:** `.sisyphus/plans/zero-config-auto-routing.md`  
**Reviewer:** Prometheus (self-review after Momus decline)  
**Date:** 2026-05-09  
**Verdict:** ⚠️ **NEEDS CLARIFICATION** — 5 critical decisions required before implementation

---

## Critical Gaps Requiring User Decision

### 1. Which model does auto combo route to per provider?

**Problem:** Auto combo returns `{provider, model}`. When we select provider "openai", which model should be used?

**Options:**
- A. Use provider's **first model** in registry (deterministic, simple)
- B. Use provider's **default model** if defined, else first (slightly smarter)
- C. Allow **per-provider override** in settings (advanced, UI needed)

**Recommendation:** Option A (first model) for MVP. Users who need specific models create manual combos. Simplicity > flexibility here.

**Impact:** Affects Task 2 (virtual factory) — needs to pick model for each connection.

---

### 2. Should auto combo use LKGP (sticky provider)?

**Problem:** Once auto picks provider X for request 1, should request 2 try X first (LKGP) or rescore fully?

**Options:**
- A. No LKGP — pure scoring every request (more adaptive, catches degradation)
- B. Auto always uses LKGP — better stickiness, less churn
- C. Separate variant `auto/lkgp` for sticky behavior

**Recommendation:** Option B — auto should use LKGP by default. Reason: users expect consistency; LKGP already exists; pure auto scoring changes provider too often. Implementation: after successful request, store `lastKnownGoodProvider` in session (memory). Next auto request tries that provider first via LKGP strategy.

**Impact:** Extend virtual factory to set `routerStrategy: "lkgp"` or set context. Actually auto combo supports `routerStrategy` field. Use `"lkgp"` for all auto variants.

---

### 3. Multi-account handling

**Problem:** User might have 2 API keys for same provider (e.g., two OpenAI keys). Should auto combo treat them as separate candidates?

**Options:**
- A. Yes — each connection is separate candidate (maximizes quota, aligns with existing combo target model)
- B. No — one provider = one candidate, pick best account automatically

**Recommendation:** Option A (per-connection candidate). Existing combos treat each account as separate target; auto should too. Simple filter: all `providerConnections` where `connected=true`.

**Impact:** Candidate pool includes `connectionId` per entry.

---

### 4. Should auto be disable-able?

**Problem:** Enterprise might want to enforce manual combos only.

**Options:**
- A. Always on — simplest, zero config
- B. Global setting toggle — adds UI + API + DB

**Recommendation:** Option A for MVP. Later add optional setting if enterprise demand emerges. Keep it minimal.

**Impact:** No settings needed in Task 6; dashboard indicator only.

---

### 5. Which auto variants to ship?

**Proposed:** auto, auto/coding, auto/fast, auto/cheap, auto/offline, auto/smart, auto/lkgp (7 total)

**Question:** All 7 needed? Could start with just `auto` and `auto/lkgp`. Others are nice-to-have but add UI/docs complexity.

**Recommendation:** Ship all 7 to demonstrate range. Coding/fast/cheap/offline map to existing mode packs; smart = quality-first + exploration=0.1; lkgp = LKGP sticky.

---

## Resolved Assumptions (no user input needed)

- **Candidate source:** `providerConnections` table with `connected=true` and valid credentials (apiKey non-empty, OAuth token not expired). Exclude providers without working credentials.
- **Model per connection:** Use `connection.defaultModel` if set, else use `providerRegistry[providerId].models[0].id`. This is deterministic.
- **Scoring:** Reuse existing `selectProvider()` unchanged — just feed it the virtual config + candidates.
- **Performance:** Caching not needed initially; with ≤20 connections, scoring ~5ms.
- **Error handling:** When no connected providers, return 400 "No providers connected — add at least one provider (OAuth or API key) first."
- **Dashboard:** Simple static banner; no dynamic list needed in v1.
- **Docs:** One new page `docs/AUTO_COMBO.md` explaining all variants.
- **Backwards compatibility:** Existing combos unchanged. If user has a manual combo named "auto", it takes precedence over virtual (DB lookup first).
- **Testing:** Mock DB for provider connections in unit tests.

---

## Proposed Updated Plan Sections

Replace/ augment plan with these specifics:

**Task 1 (parser):** Add variants: `coding|fast|cheap|offline|smart|lkgp`. Empty = default. No trailing slash.

**Task 2 (factory):** Input: `connectedProviderConnections[]` from DB. Output: `AutoComboConfig` + `ProviderCandidate[]`. Build candidates:
```ts
connections.map(conn => ({
  provider: conn.providerId,
  connectionId: conn.id,
  model: conn.defaultModel || providerRegistry[conn.providerId].models[0].id,
  modelStr: `${conn.providerId}/${model}`,
  // other fields: costPer1MTokens from providerRegistry
}))
```
Apply variant → mode pack weights. Set `routerStrategy: "lkgp"` for all auto variants (or only for auto/lkgp?). Recommendation: all auto combos use LKGP for session stickiness.

**Task 3 (integration):** In `resolveComboTargets()`: after parsing model, check `if (parsed.provider === "auto")` and TARGETS empty (no DB combo found) → call virtual factory → `selectProvider()` → return single resolved target.

**Task 4 (provider entry):** Add `auto` to providers with icon `auto_awesome`, color purple.

**Task 5 (dashboard):** Banner on Combos page: "🚀 Built-in Auto Combo is enabled. Use `auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart` for zero-config routing. (7 providers in pool)"

**Task 6 (settings):** Skip for now — out of scope for MVP. Remove from plan or mark optional.

**Task 7-9:** Adjust accordingly.

---

## Final Checklist Before Go-Live

- [ ] Resolve model-selection-per-provider decision (A/B/C)
- [ ] Decide LKGP default (on/off per variant)
- [ ] Confirm number of variants (all 7 or subset)
- [ ] Confirm multi-account handling (per-connection candidate)
- [ ] Validate mode pack weights still appropriate with LKGP (no conflict)
- [ ] Check if any provider's default model is unsuitable (e.g., expensive GPT-4) — maybe filter to free/cheap defaults? But auto should consider all; scoring will avoid expensive unless needed.
- [ ] Ensure circuit breaker health check applies per connection not just provider (already does)

---

**Recommendation:** Update the plan with these clarifications, then proceed to implementation. The gaps are fixable with reasonable defaults. Core value (zero-config routing) is solid and builds perfectly on existing auto-combo engine.

Want me to update the plan file with these decisions and then start implementation?
