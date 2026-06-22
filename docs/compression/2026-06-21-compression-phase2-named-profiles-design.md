---
title: "Compression Config Panel — Phase 2: Named Profiles + Active Selector"
version: 3.8.32
lastUpdated: 2026-06-21
---

# Compression Config Panel — Phase 2: Named Profiles + Active Selector

**Status:** approved direction (2026-06-21), pending spec review
**Base branch:** `release/v3.8.32` (Phase 1 merged via #4432)
**Goal:** Let the operator pick which compression **profile** is globally active — the
panel-derived **Default** or one of the existing **named combos** — via a single
active-profile selector that writes `CompressionConfig.activeComboId`, and wire that
selection into the runtime so the chosen profile actually runs. Remove the now-duplicate
"master mode selector" and "Set as Default" controls so there is exactly one concept:
the active profile.

Phase 1 (#4432) already built the `engines` map (the Default), `deriveDefaultPlan`,
`resolveCompressionPlan` (header/active-combo-aware), and persisted `activeComboId`.
Phase 3 (the `x-omniroute-compression` per-request header) is a separate later plan.

---

## 1. Background — current state

The named-combos infrastructure already exists; Phase 2 wires it up and removes
duplication. From the code map:

- **`compression_combos` table** (migration 042) + **`src/lib/db/compressionCombos.ts`**:
  full CRUD (`listCompressionCombos`, `createCompressionCombo`, `updateCompressionCombo`,
  `deleteCompressionCombo`), routing-combo assignments, and an `is_default` flag
  (`getDefaultCompressionCombo`/`setDefaultCompressionCombo`). A combo's `pipeline` is
  `CompressionPipelineStep[]` (`{engine, intensity?, config?}`).
- **`CompressionCombosPageClient.tsx`** renders two blocks on `context/combos`:
  - **`CompressionHub`** — today: a Token-Saver (master) toggle, a **Mode selector**
    (Off/Lite/Standard/…/Stacked), a read-only active-pipeline display (read from the
    410-shim `/api/context/combos/default`), and reorder buttons.
  - **`NamedCombosManager`** — full create/list/edit/delete of named combos + pipeline
    editor + language packs + output mode + routing-combo assignments + a **"Set as
    Default"** button (sets `is_default`).
- **`CompressionConfig.activeComboId`** is persisted (`/api/settings/compression`) but
  **not wired into dispatch**: `resolveCompressionPlan` has the active-combo branch
  (`ctx.combos[config.activeComboId]`), but Phase 1 only reaches it from inside
  `deriveDefaultPlanFromConfig` (gated on `enginesExplicit`) and passes `combos: {}`
  (empty), so the branch never fires.

**The reconciliation (decided):** unify under the active profile. The active-profile
selector (writing `activeComboId`) is the single user-facing source of "which profile
runs". The `is_default` flag stays as a **backend-only** legacy detail (the fallback the
chatCore legacy block + `deriveEnginesMap` backfill read for installs that never opted
into the panel); it is no longer user-settable. The "Set as Default" button is removed.

---

## 2. Architecture — dispatch

### 2.1 Resolution model (precedence)

```
master off                                            → off
  → routing-combo override (config.comboOverrides[comboId])   → that mode
    → ACTIVE PROFILE (config.activeComboId set + combo exists) → that combo's pipeline   [NEW]
      → auto-trigger (estimatedTokens ≥ autoTriggerTokens)    → autoTriggerMode
        → Default derived (enginesExplicit → engines map; else legacy defaultMode)
          → off
```

The active profile is an **explicit operator choice**, so it resolves:

- **regardless of `enginesExplicit`** (setting `activeComboId` is itself an explicit
  opt-in, even on a legacy install), and
- **above auto-trigger** (a manually-chosen profile wins over automatic escalation),
- but **below a per-routing-combo override** (a route-scoped override is more specific).

### 2.2 Where it resolves (the Phase-1 gap)

Phase 1's `resolveBasePlan` (in `strategySelector.ts`) does: master-off → routing-combo
override → auto-trigger → `deriveDefaultPlanFromConfig`. The `activeComboId` branch lives
inside `resolveCompressionPlan`, which `deriveDefaultPlanFromConfig` only calls when
`enginesExplicit`, with `combos: {}`. So Phase 2 **lifts the active-profile resolution
into `resolveBasePlan`**, right after the routing-combo override and before auto-trigger:

```ts
// resolveBasePlan, after checkComboOverride, before shouldAutoTrigger:
if (config.activeComboId && ctx.combos?.[config.activeComboId]) {
  return { mode: "stacked", stackedPipeline: ctx.combos[config.activeComboId] };
}
```

`ctx.combos` is `Record<comboId, CompressionPipelineStep[]>`. `selectCompressionPlan`/
`selectCompressionStrategy` gain a `combos` param (threaded into `ctx`) so callers supply
it; existing callers that pass nothing default to `{}` (unchanged behavior).

### 2.3 Loading the combos (Approach A — in chatCore)

`chatCore.ts` already loads named combos for routing-combo assignment lookup. Phase 2
extends that to build the full `combos` map once and pass it to `selectCompressionPlan`:

```ts
const { listCompressionCombos } = await import("../../src/lib/db/compressionCombos.ts");
const combos = Object.fromEntries(listCompressionCombos().map((c) => [c.id, c.pipeline]));
// …passed as the new combos arg to selectCompressionStrategy / selectCompressionPlan
```

When the active profile resolves to `stacked`, its pipeline reaches `applyCompressionAsync`
the same way Phase 1's engines-map override does — chatCore sets
`config.stackedPipeline = ctx.combos[activeComboId]` under the same guard
(`!compressionComboApplied && !config.compressionComboId`) so the operator's chosen profile
runs instead of the built-in default. `strategySelector` stays pure (no `src/lib/db`
import); only chatCore touches the DB.

### 2.4 What stays untouched (legacy backend)

`is_default`, `getDefaultCompressionCombo`, `setDefaultCompressionCombo`,
`setEngineInDefaultCombo`, the chatCore legacy default-combo block, and the
`deriveEnginesMap` backfill are **unchanged**. Setting `activeComboId` never writes
`is_default`. The active-profile path resolves _before_ (and independently of) the legacy
default-combo fallback, so legacy installs that never set `activeComboId` keep their exact
behavior; an install that sets `activeComboId` runs that profile.

---

## 3. UI

No new API endpoints or DB migrations: `/api/settings/compression` already carries
`activeComboId`, and the combos CRUD API already exists.

### 3.1 Active-profile selector — top of `CompressionHub`

```
Active profile:  [ Default (from panel) ▼ ]
                   • Default (from panel)     → activeComboId = null
                   • Standard Savings          → a named combo id
                   • <other named combos>
```

On change → `PUT /api/settings/compression { activeComboId }` (null for "Default";
debounced/merge-patch like the panel's `save()`). Below it, a **read-only preview** of the
active profile's effective pipeline ("runs: rtk → caveman → …"):

- Default → `deriveDefaultPlan(config.engines, config.enabled)` (the pure fn, client-side).
- Named combo → that combo's pipeline.

### 3.2 `CompressionHub` becomes a read-only overview — remove duplicates

- **Remove** the **Mode selector** (Off/Lite/…/Stacked) — the mode is now derived; this is
  the "master mode selector" the redesign removes.
- **Remove** the **Token Saver (master on/off) toggle** — it lives in the Panel
  (`context/settings`), the single source since Phase 1.
- **Remove** the pipeline **reorder buttons** — ordering a named combo is done in the
  combo editor (`NamedCombosManager`); the Default's order is auto-derived by
  `stackPriority`.
- **Keep** only the active-profile selector + the read-only preview.

### 3.3 `NamedCombosManager` — one change

- **Remove** the **"Set as Default"** button (the active selector replaces it).
- **Keep** everything else: create/list/edit/delete, the pipeline editor (add/remove steps
  - per-step intensity), language packs, output mode, routing-combo assignments.
- **Add** an **"● Active"** badge on the card whose id equals `activeComboId`.

### 3.4 Navigation

Sidebar order unchanged (Settings → Combos → per-engine pages → Studio).

---

## 4. Testing

Both runners green (`test:unit` node + `test:vitest`); `typecheck:core` + `lint` clean;
`check:file-size` (rebaseline `CompressionHub.tsx`/`CompressionCombosPageClient.tsx` if
they grow, with a justification key).

- **Resolver / dispatch (unit, node):** `selectCompressionStrategy`/`resolveBasePlan` with
  `activeComboId` + `ctx.combos[id]` → resolves to that combo's stacked pipeline,
  **regardless of `enginesExplicit`**; `activeComboId` null → Default derived;
  `activeComboId` set but combo missing → graceful fall-through. Precedence:
  routing-combo override > active profile > auto-trigger > Default derived (one test per
  boundary).
- **chatCore integration:** `activeComboId` set → chatCore loads named combos → the active
  combo's pipeline runs via `applyCompressionAsync` (engineBreakdown reflects the combo's
  engines), mirroring Phase 1's `derived-pipeline-integration` test. Plus: setting
  `activeComboId` does **not** mutate `is_default` (`getDefaultCompressionCombo`
  unchanged).
- **DB + API (unit):** `activeComboId` round-trips in `updateCompressionSettings`/
  `getCompressionSettings` and `PUT`/`GET /api/settings/compression`, including the
  "switch combo → null" path.
- **UI (vitest component):** `CompressionHub` renders the selector (Default + named combos),
  changing it issues the right `PUT`, the preview reflects the selection, and the removed
  controls (mode selector, master toggle, reorder) are **absent** (alignment, not masking).
  `NamedCombosManager`: "Set as Default" gone; the active combo shows the "● Active" badge.
  Honor the Phase-1 vitest gotchas (i18n renders English/keys → assert on stable
  strings/`data-testid`; new `@omniroute/...` imports don't resolve under vitest → use
  relative/re-export).
- **No regression:** `is_default`/`getDefaultCompressionCombo`/legacy chatCore block/
  backfill tests stay green and untouched.

---

## 5. Non-goals (YAGNI)

- **Phase 3** — the `x-omniroute-compression` per-request header — is a separate plan
  (the resolver is already header-aware).
- No new compression engines; no new named-combo features (templates, sharing, import/
  export).
- No change to the combo CRUD API/DB (already shaped correctly).
- The `is_default` flag is kept (legacy backend fallback), not removed — removing it is a
  larger migration out of scope here.
- The Compression Studio (analytics) is untouched.
