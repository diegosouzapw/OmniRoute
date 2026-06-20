---
title: "Unified Compression Config Panel — Design"
version: 3.8.32
lastUpdated: 2026-06-20
---

# Unified Compression Config Panel — Design

**Status:** approved direction (2026-06-20), pending spec review
**Base branch:** `release/v3.8.31`
**Goal:** Make `/dashboard/context/settings` the single management panel for the master
on/off and each compression engine's on/off + level, deriving the default pipeline from
those toggles. Keep the Combos page solely for *chaining* (ordered named pipelines) +
selecting the globally-active profile, and the per-engine pages solely for *detailed*
config. Plan for (but phase) multiple named profiles with an active selector and a
per-request override header.

---

## 1. Background — current state (the problem)

Compression on/off + level is split across **two stores and several UIs**, with real
duplication:

- **`/api/settings/compression`** (DB `key_value` ns=`compression`, via `src/lib/db/compression.ts`)
  holds: `enabled` (master), `defaultMode`, `autoTriggerTokens`, `cavemanConfig`,
  `cavemanOutputMode`, `rtkConfig`, `aggressive`, `ultra`, language config, etc.
- **`/api/context/combos/default`** (the *default combo pipeline*) holds the per-engine
  `enabled` + config for the **structural** engines (lite, headroom, session-dedup, ccr,
  llmlingua, aggressive, ultra) as pipeline steps. The per-engine detail pages
  (`EngineConfigPage.tsx`) read/write here via `setEngineInDefaultCombo`.
- **`compression_combos`** table holds *named* pipelines assigned to routing combos.

Concrete duplications (from the UI audit):
- Caveman on/off in **3** places (TokenSaverCard, CompressionSettingsTab, CavemanContextPageClient).
- Caveman intensity in **3**; RTK intensity in **2**; Caveman output mode in **2**.
- `lite/session-dedup/headroom/ccr/llmlingua` on/off **absent** from the central settings —
  only on their per-engine page (which writes the *default combo*, not the central config).

So "is engine X on?" is answered inconsistently (central config for caveman/rtk; default
combo for the structural engines), and the **Combos page edits the same default pipeline**
that a central panel would — the conceptual overlap the redesign must remove.

Out of scope as a *config* surface: `dashboard/compression/studio` is the Compression
Studio (waterfall/cockpit analytics), not toggles — untouched.

Engines (the 10 stackable units): `lite, caveman, aggressive, ultra, rtk, headroom,
session-dedup, ccr, llmlingua` (registered `CompressionEngine`s) + `mcpAccessibility`
(separate path: compresses MCP tool-result outputs, not the chat pipeline). Each engine's
`stackPriority` defines automatic ordering (session-dedup 3, ccr 4, lite 5, rtk 10,
headroom 15, caveman 20, aggressive 30, llmlingua 35, ultra 40).

---

## 2. Design principles — the boundary

| Surface | Concept | Owns | Never does |
|---|---|---|---|
| **Panel** (`context/settings`) | "My **Default**: what is on + level" | master on/off; per-engine on/off + level | ordering/chaining; per-route assignment |
| **Combos** (`context/combos`, menu #2) | "Named **profiles**: chaining + which is active + per-route assignment" | create/edit ordered named pipelines; pick the globally-active profile; assign to routing combos | engine on/off (inherits the active profile's membership) |
| **Per-engine pages** (menu, after combos) | "Deep config of one engine" | filters, rules, language packs, thresholds | on/off; level (those live in the panel) |

**No duplication rule:** the **Panel owns the Default profile** (membership + level, order
auto-derived by `stackPriority`). A **Combo is a *named alternative* profile** (membership
+ level + *explicit order*). Different scopes (the one default vs named alternatives) — not
the same object edited twice. The editable "default combo" store is **removed**; the
default pipeline becomes **derived** from the panel.

---

## 3. Architecture

### 3.1 Resolution model (per request, most-specific wins)

```
x-omniroute-compression header          (per-request override)
  → routing-combo override (comboOverrides[comboId])   (per-route)
    → active profile (activeComboId: "default" | <comboId>)   (global)
      → Default = derived from panel engines map
        → off  (master disabled, or zero engines on)
```

A single `resolveCompressionPlan(config, { comboId, header })` produces the effective
`{ mode, stackedPipeline }` fed to the existing `applyCompressionAsync`. It supersedes
today's `getEffectiveMode` (which only does combo-override → autoTrigger → defaultMode).

### 3.2 Data model (Model A — single source + derived pipeline)

**CompressionConfig gains an engines map** (the single source for the Default's on/off +
level), replacing the editable default-combo store:

```ts
interface EngineToggle {
  enabled: boolean;
  level?: string;     // caveman/cavemanOutput: lite|full|ultra ; rtk: minimal|standard|aggressive ; others: undefined
}
interface CompressionConfig {
  enabled: boolean;                         // master
  engines: Record<CompressionEngineId, EngineToggle>;   // NEW — the Default profile
  activeComboId: string | null;             // NEW — null/"default" = derived default; else a compression_combos id
  autoTriggerTokens: number;
  autoTriggerMode?: CompressionMode;        // kept (auto-trigger still selects a profile/mode on large prompts)
  preserveSystemPrompt: boolean;
  comboOverrides: Record<string, CompressionMode>;   // existing per-routing-combo override
  // detailed per-engine config keeps living in its existing sub-objects
  // (cavemanConfig, rtkConfig, aggressive, ultra, …) — edited by the per-engine pages.
}
```

**Deriving the Default pipeline** from `engines` (pure function `deriveDefaultPlan`):
- master `enabled === false` → `off`.
- 0 engines enabled → `off`.
- exactly 1 enabled and it is a single-mode engine (`lite|caveman|aggressive|ultra|rtk`) →
  that mode (single path — reuses today's `applyCompression(mode)`).
- otherwise → `stacked` with the enabled engines in `stackPriority` order, each step's
  `intensity` from its `level` (the global `stackedPipeline` already accepts all 9 engines
  after the B-PIPELINE-DIVERGENCE fix).

The **stored `defaultMode` field** and the editable default combo
(`/api/context/combos/default`, `setEngineInDefaultCombo`) are **removed**; the default is
derived from `engines`. (The `CompressionMode` *type* persists — `comboOverrides`,
`autoTriggerMode`, and the resolver's output still use it; only the stored `defaultMode`
field is dropped.) A DB migration backfills `engines` from the current `defaultMode` +
default-combo steps + caveman/rtk config so existing installs keep their behavior.

**Named combos** (`compression_combos`, existing table): N ordered pipelines. `activeComboId`
selects which profile is globally active (`Default` or a named combo). Per-routing-combo
assignment stays in `comboOverrides`.

`mcpAccessibility` keeps its own store (`/api/settings/compression/mcp-accessibility`,
migration 056) — surfaced in the panel as a row that writes there, with a scope note.

### 3.3 The per-request header

`x-omniroute-compression: <value>` (mirrors the `x-omniroute-no-memory`/`no-cache` pattern,
PR #4290; parsed in the request pipeline alongside the other omniroute headers). Values:
- `off` → no compression for this request.
- `default` → the derived Default profile.
- `<combo-name|id>` → that named combo.
- `engine:<id>` → a single engine (if that engine is enabled in the Default), e.g. `engine:rtk`.

Invalid/unknown value → ignored (falls through to the normal resolution); never errors the
request. Header parsing + validation has a unit test asserting each form and the
fall-through.

---

## 4. Screens

### 4.1 Panel — `context/settings` (engine grid)

A single client component (replacing the scattered `CompressionSettingsTab` +
`CompressionTokenSaverCard` toggles):
- **Master** on/off at top.
- **Engine grid** (one row per engine, ordered by `stackPriority` so the row order mirrors
  run order): `[engine name + short desc]  [on/off toggle]  [level selector if applicable]
  [→ detail page]`. Level selector appears only for engines with levels
  (caveman lite|full|ultra, rtk minimal|standard|aggressive; caveman output mode as its own row).
- **General** (auto-trigger tokens, preserve-system-prompt) below the grid.
- Reads/writes the `engines` map + master via `GET/PUT /api/settings/compression` (single
  endpoint). The displayed default pipeline (derived) is shown read-only ("runs: rtk →
  caveman → …") so the user sees the effect without editing order here.

### 4.2 Combos — `context/combos` (menu #2)

- List of named combos; create/edit an **ordered** pipeline (drag/reorder + per-step level)
  — the only place for explicit chaining.
- **Active profile selector**: `Default (panel)` | `<combo>` → writes `activeComboId`.
- Assign a combo to a routing combo (existing `comboOverrides`).
- Reuses the existing `CompressionCombosPageClient` / `comboFlowModel`; the `CompressionHub`
  "master mode selector" is removed (mode is now derived; the Hub becomes a read-only
  overview or is folded into the panel).

### 4.3 Per-engine pages (menu, after combos)

`EngineConfigPage` + the caveman/rtk custom pages: **lose** the on/off + level controls
(moved to the panel) and keep only **detailed** config (filters, rules, language packs,
thresholds, preview). They **stop writing** `/api/context/combos/default`; detailed config
writes to its own sub-object in `/api/settings/compression` (or the existing
caveman/rtk facade routes, which already proxy to it).

### 4.4 Navigation

`COMPRESSION_CONTEXT_GROUP` (`src/shared/constants/sidebarVisibility.ts`) reordered:
**Settings (panel) → Combos → per-engine pages → Studio (analytics)**.

---

## 5. Consolidation / migration

- `CompressionTokenSaverCard` quick toggles → **absorbed into the panel; the card is removed**.
- Duplicate caveman/rtk on/off + intensity in `CompressionSettingsTab` → removed.
- `EngineConfigPage` → on/off+level removed; stops writing the default combo.
- DB migration: backfill `engines` map + `activeComboId="default"` from current state
  (defaultMode + default-combo steps + caveman/rtk/ultra/aggressive enabled), so live
  installs preserve behavior. The editable default-combo route (`PUT /api/context/combos/default`)
  becomes a **read-only shim for one release** (returns the derived default; rejects writes
  with a deprecation note), then is removed.

---

## 6. Phasing

Each phase is its own implementation plan + PR, independently shippable and TDD'd
(Hard Rule #18). `writing-plans` will author **Phase 1 first**; Phases 2–3 get their own
plans later.

- **Phase 1 (core consolidation):** the `engines` map + `deriveDefaultPlan` + migration;
  the engine-grid panel; remove scattered/duplicate toggles; per-engine pages lose on/off;
  menu reorder. Delivers the single-panel goal. *No behavior change for existing installs
  (migration backfills).*
- **Phase 2 (profiles):** multiple named combos + the `activeComboId` active-profile selector.
- **Phase 3 (header):** the `x-omniroute-compression` per-request override.

Phases 2–3 reuse the Phase-1 resolution model (`resolveCompressionPlan`), which is built
header/active-aware from the start so later phases only wire UI + header parsing.

---

## 7. Testing

- **Unit:** `deriveDefaultPlan` (every engines-map shape → expected mode/pipeline);
  migration backfill (old config → equivalent engines map); `resolveCompressionPlan`
  precedence (header > comboOverride > active > default > off); header parsing (each form +
  fall-through); panel reducer (toggle/level edits → config patch).
- **Component (vitest):** the panel renders all engines, toggles persist, derived pipeline
  preview updates.
- **Integration:** a config with engines `{rtk,caveman}` on → `applyCompressionAsync` runs the
  derived stacked pipeline; single engine on → single-mode path; equivalence with the old
  defaultMode behavior for the same logical config.
- Both runners green (`test:unit` + `test:vitest`); typecheck:core clean; lint 0 errors.

---

## 8. Non-goals (YAGNI)

- No new compression engines in this work (the model just makes adding them trivial later).
- No change to the engines' internal algorithms (the recent fixes are separate).
- The Compression Studio (analytics) is not restructured.
- Phases 2–3 UI polish (combo templates, sharing) is out of scope.
