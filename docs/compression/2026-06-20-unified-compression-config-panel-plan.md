# Unified Compression Config Panel — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/dashboard/context/settings` the single source for the master + per-engine on/off + level, with the default compression pipeline DERIVED from those toggles, removing the scattered/duplicate toggles — with zero behavior change for existing installs (a migration backfills).

**Architecture:** Add an `engines` map (+`activeComboId`) to `CompressionConfig` as the single source. A pure `deriveDefaultPlan(engines)` turns it into `{mode, stackedPipeline}`; a pure `resolveCompressionPlan(config, ctx)` applies precedence (header→combo-override→active-profile→derived-default→off) and feeds the existing `applyCompressionAsync`. A DB migration backfills the map. The engine-grid panel reads/writes the map via the single `/api/settings/compression` endpoint; per-engine pages lose on/off+level; the editable default-combo route becomes a read-only shim.

**Tech Stack:** TypeScript, Next.js 16 App Router, Zod, SQLite (better-sqlite3), Node test runner + Vitest (component), React.

**Base:** worktree `feat/compression-config-panel-v3831` off `release/v3.8.31`. Spec: `docs/compression/2026-06-20-unified-compression-config-panel-design.md`.

**Conventions:** unit tests run `node --import tsx/esm --test tests/unit/<f>.test.ts`; component tests run `npm run test:vitest`. Each task ends by running the FULL compression suite (`node --import tsx/esm --test tests/unit/compression/*.test.ts`) + `npm run typecheck:core` before commit. Never `--no-verify`.

---

## File Structure

**Create:**
- `open-sse/services/compression/engineCatalog.ts` — pure metadata: per-engine `{ id, label, stackPriority, levels?, isSingleMode }`. One source of truth for "which engines exist, which have levels, which can be a standalone mode".
- `open-sse/services/compression/deriveDefaultPlan.ts` — pure: `engines` map → `{ mode, stackedPipeline }`.
- `open-sse/services/compression/resolveCompressionPlan.ts` — pure: precedence resolver.
- `src/lib/db/migrations/102_compression_engines_map.sql` — backfill `engines` + `activeComboId`.
- `src/app/(dashboard)/dashboard/context/settings/CompressionPanel.tsx` — the engine-grid panel.
- `tests/unit/compression/engine-catalog.test.ts`, `derive-default-plan.test.ts`, `resolve-compression-plan.test.ts`, `compression-engines-map-migration.test.ts`.
- `tests/unit/ui/compressionPanel.test.tsx` (vitest).

**Modify:**
- `open-sse/services/compression/types.ts` — add `EngineToggle`, `CompressionConfig.engines`, `activeComboId`; keep `CompressionMode` type; drop stored `defaultMode` usage (derive).
- `src/lib/db/compression.ts` — normalize/persist `engines` + `activeComboId`.
- `open-sse/services/compression/strategySelector.ts` — `selectCompressionStrategy`/`getEffectiveMode` delegate to `resolveCompressionPlan`.
- `open-sse/handlers/chatCore.ts` — call `resolveCompressionPlan`.
- `src/app/api/settings/compression/route.ts` — accept/return `engines` + `activeComboId`.
- `src/app/api/context/combos/default/route.ts` — read-only shim (reject writes).
- `src/app/(dashboard)/dashboard/context/settings/page.tsx` — render `CompressionPanel` (not the old tab).
- `src/shared/components/compression/EngineConfigPage.tsx` + caveman/rtk client pages — remove on/off+level; stop writing default combo.
- `src/shared/constants/sidebarVisibility.ts` — reorder `COMPRESSION_CONTEXT_GROUP`.

**Engine reference (`stackPriority`, levels, single-mode):**
`session-dedup`(3,—,no) `ccr`(4,—,no) `lite`(5,—,yes) `rtk`(10,minimal|standard|aggressive,yes) `headroom`(15,—,no) `caveman`(20,lite|full|ultra,yes) `aggressive`(30,—,yes) `llmlingua`(35,—,no) `ultra`(40,—,yes). Plus `cavemanOutput`(intensity lite|full|ultra, separate from input caveman) and `mcpAccessibility`(no level, separate store).

---

## Task 1: Engine catalog (single source of engine metadata)

**Files:**
- Create: `open-sse/services/compression/engineCatalog.ts`
- Test: `tests/unit/compression/engine-catalog.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { ENGINE_CATALOG, engineMeta, ENGINE_IDS } from "@omniroute/open-sse/services/compression/engineCatalog.ts";

test("catalog lists every engine with stackPriority", () => {
  for (const id of ["session-dedup","ccr","lite","rtk","headroom","caveman","aggressive","llmlingua","ultra"]) {
    assert.ok(engineMeta(id), `${id} present`);
    assert.equal(typeof engineMeta(id).stackPriority, "number");
  }
});
test("levels + single-mode flags are correct", () => {
  assert.deepEqual(engineMeta("rtk").levels, ["minimal","standard","aggressive"]);
  assert.deepEqual(engineMeta("caveman").levels, ["lite","full","ultra"]);
  assert.equal(engineMeta("headroom").levels, undefined);
  assert.equal(engineMeta("caveman").isSingleMode, true);
  assert.equal(engineMeta("headroom").isSingleMode, false);
});
test("ENGINE_IDS is ordered by stackPriority", () => {
  const ps = ENGINE_IDS.map((id) => engineMeta(id).stackPriority);
  assert.deepEqual(ps, [...ps].sort((a,b)=>a-b));
});
```

- [ ] **Step 2: Run → FAIL** (`node --import tsx/esm --test tests/unit/compression/engine-catalog.test.ts`) — module not found.

- [ ] **Step 3: Implement** `engineCatalog.ts`:

```ts
export interface EngineMeta {
  id: string;
  label: string;
  stackPriority: number;
  levels?: string[];        // intensity options; undefined = no level selector
  isSingleMode: boolean;    // can be the effective mode when it is the only engine on
  description: string;
}
export const ENGINE_CATALOG: Record<string, EngineMeta> = {
  "session-dedup": { id:"session-dedup", label:"Session Dedup", stackPriority:3, isSingleMode:false, description:"Cross-turn block deduplication." },
  ccr:             { id:"ccr", label:"CCR (Retrieval)", stackPriority:4, isSingleMode:false, description:"Content-addressed retrieval markers." },
  lite:            { id:"lite", label:"Lite", stackPriority:5, isSingleMode:true, description:"Whitespace/format cleanup." },
  rtk:             { id:"rtk", label:"RTK", stackPriority:10, levels:["minimal","standard","aggressive"], isSingleMode:true, description:"Command-output filtering." },
  headroom:        { id:"headroom", label:"Headroom", stackPriority:15, isSingleMode:false, description:"Tabular JSON compaction." },
  caveman:         { id:"caveman", label:"Caveman", stackPriority:20, levels:["lite","full","ultra"], isSingleMode:true, description:"Rule-based prose compression." },
  aggressive:      { id:"aggressive", label:"Aggressive", stackPriority:30, isSingleMode:true, description:"Summarize + age old turns." },
  llmlingua:       { id:"llmlingua", label:"LLMLingua (SLM)", stackPriority:35, isSingleMode:false, description:"Semantic pruning (ONNX)." },
  ultra:           { id:"ultra", label:"Ultra", stackPriority:40, isSingleMode:true, description:"Heuristic token pruning (+ optional SLM)." },
};
export const ENGINE_IDS: string[] = Object.values(ENGINE_CATALOG).sort((a,b)=>a.stackPriority-b.stackPriority).map((e)=>e.id);
export function engineMeta(id: string): EngineMeta { return ENGINE_CATALOG[id]; }
```

- [ ] **Step 4: Run → PASS.**
- [ ] **Step 5: Commit** `git add open-sse/services/compression/engineCatalog.ts tests/unit/compression/engine-catalog.test.ts && git commit -m "feat(compression): engine catalog metadata (levels, single-mode, order)"`

---

## Task 2: `EngineToggle` + `engines` map + `activeComboId` on the config type

**Files:**
- Modify: `open-sse/services/compression/types.ts` (the `CompressionConfig` interface + `DEFAULT_COMPRESSION_CONFIG`)
- Test: `tests/unit/compression/engine-catalog.test.ts` (extend) — assert the default config shape.

- [ ] **Step 1: Add the test** (append):

```ts
import { DEFAULT_COMPRESSION_CONFIG } from "@omniroute/open-sse/services/compression/types.ts";
test("default config has an engines map + activeComboId", () => {
  assert.equal(typeof DEFAULT_COMPRESSION_CONFIG.engines, "object");
  assert.equal(DEFAULT_COMPRESSION_CONFIG.activeComboId, null);
  // default-off: every engine disabled by default (opt-in preserved)
  for (const id of ENGINE_IDS) assert.equal(DEFAULT_COMPRESSION_CONFIG.engines[id]?.enabled, false);
});
```

- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** in `types.ts`: add `export interface EngineToggle { enabled: boolean; level?: string }`; add to `CompressionConfig`: `engines: Record<string, EngineToggle>;` and `activeComboId: string | null;`. In `DEFAULT_COMPRESSION_CONFIG` add `engines: Object.fromEntries(ENGINE_IDS.map((id)=>[id,{enabled:false}]))` (import `ENGINE_IDS`) and `activeComboId: null`. Keep `defaultMode` field for now (removed in Task 9 once derive is wired) to avoid breaking compilation.

- [ ] **Step 4: Run → PASS + `npm run typecheck:core`.**
- [ ] **Step 5: Commit** `... -m "feat(compression): add engines map + activeComboId to CompressionConfig"`

---

## Task 3: `deriveDefaultPlan` (the heart — engines map → mode/pipeline)

**Files:**
- Create: `open-sse/services/compression/deriveDefaultPlan.ts`
- Test: `tests/unit/compression/derive-default-plan.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { deriveDefaultPlan } from "@omniroute/open-sse/services/compression/deriveDefaultPlan.ts";

const on = (level) => ({ enabled: true, ...(level?{level}:{}) });
test("master off / empty / none-on => off", () => {
  assert.deepEqual(deriveDefaultPlan({}, false), { mode:"off", stackedPipeline:[] });
  assert.deepEqual(deriveDefaultPlan({}, true), { mode:"off", stackedPipeline:[] });
  assert.deepEqual(deriveDefaultPlan({ rtk:{enabled:false} }, true), { mode:"off", stackedPipeline:[] });
});
test("exactly one single-mode engine => that mode", () => {
  assert.deepEqual(deriveDefaultPlan({ caveman: on("full") }, true), { mode:"standard", stackedPipeline:[] });
  assert.deepEqual(deriveDefaultPlan({ rtk: on("minimal") }, true), { mode:"rtk", stackedPipeline:[] });
  assert.deepEqual(deriveDefaultPlan({ lite: on() }, true), { mode:"lite", stackedPipeline:[] });
});
test("one non-single-mode engine => stacked with that engine", () => {
  const p = deriveDefaultPlan({ headroom: on() }, true);
  assert.equal(p.mode, "stacked");
  assert.deepEqual(p.stackedPipeline, [{ engine:"headroom" }]);
});
test("multiple engines => stacked in stackPriority order, levels as intensity", () => {
  const p = deriveDefaultPlan({ caveman: on("full"), rtk: on("standard"), headroom: on() }, true);
  assert.equal(p.mode, "stacked");
  assert.deepEqual(p.stackedPipeline, [
    { engine:"rtk", intensity:"standard" },   // pri 10
    { engine:"headroom" },                    // pri 15
    { engine:"caveman", intensity:"full" },   // pri 20
  ]);
});
```

- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** `deriveDefaultPlan.ts`:

```ts
import { ENGINE_CATALOG, engineMeta } from "./engineCatalog.ts";
import type { EngineToggle } from "./types.ts";

const SINGLE_MODE_OF: Record<string,string> = { lite:"lite", caveman:"standard", aggressive:"aggressive", ultra:"ultra", rtk:"rtk" };

export interface DerivedPlan { mode: string; stackedPipeline: Array<{ engine: string; intensity?: string }>; }

export function deriveDefaultPlan(engines: Record<string, EngineToggle>, masterEnabled: boolean): DerivedPlan {
  if (!masterEnabled) return { mode:"off", stackedPipeline:[] };
  const onIds = Object.keys(ENGINE_CATALOG).filter((id) => engines[id]?.enabled === true);
  if (onIds.length === 0) return { mode:"off", stackedPipeline:[] };
  if (onIds.length === 1 && engineMeta(onIds[0]).isSingleMode) {
    return { mode: SINGLE_MODE_OF[onIds[0]], stackedPipeline:[] };
  }
  const ordered = onIds.sort((a,b)=>engineMeta(a).stackPriority-engineMeta(b).stackPriority);
  const stackedPipeline = ordered.map((id) => {
    const level = engines[id]?.level;
    return level ? { engine:id, intensity:level } : { engine:id };
  });
  return { mode:"stacked", stackedPipeline };
}
```

- [ ] **Step 4: Run → PASS.**
- [ ] **Step 5: Commit** `... -m "feat(compression): deriveDefaultPlan (engines map -> mode/pipeline)"`

---

## Task 4: Migration 102 — backfill `engines` + `activeComboId`

**Files:**
- Create: `src/lib/db/migrations/102_compression_engines_map.sql`
- Test: `tests/unit/compression/compression-engines-map-migration.test.ts`

- [ ] **Step 1: Write the failing test** (uses `resetDbInstance()` + closes handles in `test.after`, per repo rule):

```ts
import { test, after } from "node:test";
import assert from "node:assert/strict";
import { getDbInstance, resetDbInstance } from "@/lib/db/core.ts";
import { getCompressionSettings } from "@/lib/db/compression.ts";

after(() => resetDbInstance());
test("migration backfills engines map from prior defaultMode + default combo", () => {
  resetDbInstance();
  const db = getDbInstance(); // runs migrations incl. 102
  // simulate a pre-102 install: master on, defaultMode 'standard', caveman enabled
  db.prepare("INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES('compression','enabled','true')").run();
  db.prepare("INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES('compression','defaultMode','\"standard\"')").run();
  db.prepare("INSERT OR REPLACE INTO key_value(namespace,key,value) VALUES('compression','cavemanConfig','{\"enabled\":true}')").run();
  const cfg = getCompressionSettings();
  assert.equal(cfg.engines.caveman.enabled, true);
  assert.equal(cfg.activeComboId, null);
});
```

- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** the SQL migration (idempotent; the row backfill of derived `engines` is done in `normalizeCompressionSettings` read-path — the SQL only seeds `activeComboId` default and a marker). Migration `102_compression_engines_map.sql`:

```sql
-- Phase 1 of the unified compression panel: the engines map + activeComboId become the
-- single source. The engines map is DERIVED on read (normalizeCompressionSettings) from the
-- legacy defaultMode + default-combo steps + caveman/rtk/ultra/aggressive config, so existing
-- installs keep their behavior. Here we only ensure activeComboId defaults to NULL ("default").
INSERT OR IGNORE INTO key_value (namespace, key, value) VALUES ('compression', 'activeComboId', 'null');
```

(The read-path derivation in Task 5 is what makes `getCompressionSettings().engines` correct; the migration just guarantees `activeComboId` exists.)

- [ ] **Step 4: Run → PASS** (after Task 5's normalize is in — if running 4 before 5, expect the engines assertion to fail; do Task 5 then re-run). Commit after Task 5.

---

## Task 5: Persist + normalize `engines` / `activeComboId` (read-path derivation)

**Files:**
- Modify: `src/lib/db/compression.ts` (`getCompressionSettings`/`normalizeCompressionSettings`/`updateCompressionSettings`)
- Test: reuse Task 4's migration test + add a round-trip test in the same file.

- [ ] **Step 1: Add round-trip test**:

```ts
import { updateCompressionSettings } from "@/lib/db/compression.ts";
test("engines map persists round-trip + activeComboId", () => {
  resetDbInstance(); getDbInstance();
  updateCompressionSettings({ enabled:true, engines:{ rtk:{enabled:true,level:"standard"}, caveman:{enabled:true,level:"full"} }, activeComboId:null });
  const cfg = getCompressionSettings();
  assert.equal(cfg.engines.rtk.enabled, true);
  assert.equal(cfg.engines.rtk.level, "standard");
  assert.equal(cfg.engines.caveman.level, "full");
});
```

- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** in `compression.ts`:
  - In `normalizeCompressionSettings`: read stored `engines` if present; ELSE derive it from legacy fields — `engines[id].enabled` from: caveman/rtk/ultra/aggressive `*.enabled`; structural engines from the default-combo steps (read the default combo); single-modes from `defaultMode`. Levels from `cavemanConfig.intensity`/`rtkConfig.intensity`. Read `activeComboId` (default null).
  - In `updateCompressionSettings`: accept `engines` (validate each value `{enabled:boolean, level?:string}`) + `activeComboId` and persist as `key_value` rows (`engines` as one JSON row).
  - Add a Zod sub-schema `engineToggleSchema = z.object({ enabled: z.boolean(), level: z.string().optional() })` and `engines: z.record(engineToggleSchema).optional()`, `activeComboId: z.string().nullable().optional()`.

- [ ] **Step 4: Run → PASS** (Task 4 + Task 5 tests). `npm run typecheck:core`.
- [ ] **Step 5: Commit** `git add src/lib/db/migrations/102_compression_engines_map.sql src/lib/db/compression.ts tests/unit/compression/compression-engines-map-migration.test.ts && git commit -m "feat(compression): persist+backfill engines map and activeComboId (migration 102)"`

---

## Task 6: `resolveCompressionPlan` (precedence resolver)

**Files:**
- Create: `open-sse/services/compression/resolveCompressionPlan.ts`
- Test: `tests/unit/compression/resolve-compression-plan.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveCompressionPlan } from "@omniroute/open-sse/services/compression/resolveCompressionPlan.ts";

const base = { enabled:true, engines:{ caveman:{enabled:true,level:"full"} }, activeComboId:null, comboOverrides:{} };
test("derived default when no override/active/header", () => {
  assert.deepEqual(resolveCompressionPlan(base, {}), { mode:"standard", stackedPipeline:[] });
});
test("routing-combo override wins over default", () => {
  const cfg = { ...base, comboOverrides:{ cmb:"aggressive" } };
  assert.equal(resolveCompressionPlan(cfg, { comboId:"cmb" }).mode, "aggressive");
});
test("active named combo wins over default (Phase 2 wiring uses combos table; here pass it in)", () => {
  const cfg = { ...base, activeComboId:"c1" };
  const combos = { c1: [{ engine:"rtk", intensity:"standard" }] };
  const plan = resolveCompressionPlan(cfg, { combos });
  assert.equal(plan.mode, "stacked");
  assert.deepEqual(plan.stackedPipeline, [{ engine:"rtk", intensity:"standard" }]);
});
test("master off => off regardless", () => {
  assert.equal(resolveCompressionPlan({ ...base, enabled:false }, {}).mode, "off");
});
```

- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** `resolveCompressionPlan.ts`:

```ts
import { deriveDefaultPlan, type DerivedPlan } from "./deriveDefaultPlan.ts";

export interface ResolveCtx {
  comboId?: string | null;
  header?: string | null;              // x-omniroute-compression (Phase 3 parses+passes; Phase 1 callers pass undefined)
  combos?: Record<string, Array<{ engine:string; intensity?:string }>>;  // named combo pipelines by id
}
export function resolveCompressionPlan(config: any, ctx: ResolveCtx): DerivedPlan {
  if (config?.enabled === false) return { mode:"off", stackedPipeline:[] };
  // 1. header (Phase 3 supplies parsed value; here it composes if present)
  if (ctx.header) {
    if (ctx.header === "off") return { mode:"off", stackedPipeline:[] };
    if (ctx.header !== "default") {
      const fromHeader = headerToPlan(ctx.header, config, ctx);
      if (fromHeader) return fromHeader;            // unknown => fall through
    }
  }
  // 2. routing-combo override
  const ov = ctx.comboId ? config?.comboOverrides?.[ctx.comboId] : undefined;
  if (ov) return modeToPlan(ov, config);
  // 3. active named combo
  if (config?.activeComboId && ctx.combos?.[config.activeComboId]) {
    return { mode:"stacked", stackedPipeline: ctx.combos[config.activeComboId] };
  }
  // 4. derived default
  return deriveDefaultPlan(config?.engines ?? {}, config?.enabled !== false);
}
function modeToPlan(mode: string, config: any): DerivedPlan {
  return mode === "stacked"
    ? { mode:"stacked", stackedPipeline: config?.stackedPipeline ?? [] }
    : { mode, stackedPipeline:[] };
}
function headerToPlan(h: string, config: any, ctx: ResolveCtx): DerivedPlan | null {
  if (h.startsWith("engine:")) { const id = h.slice(7); return config?.engines?.[id]?.enabled ? deriveDefaultPlan({ [id]: config.engines[id] }, true) : null; }
  if (ctx.combos?.[h]) return { mode:"stacked", stackedPipeline: ctx.combos[h] };
  return null;
}
```

- [ ] **Step 4: Run → PASS.**
- [ ] **Step 5: Commit** `... -m "feat(compression): resolveCompressionPlan precedence resolver (header>override>active>default)"`

---

## Task 7: Wire the resolver into strategy selection + chatCore

**Files:**
- Modify: `open-sse/services/compression/strategySelector.ts` (`selectCompressionStrategy`)
- Modify: `open-sse/handlers/chatCore.ts` (the compression call site)
- Test: `tests/unit/compression/strategySelector.test.ts` (extend with an engines-map case)

- [ ] **Step 1: Add test** asserting `selectCompressionStrategy` with `engines:{rtk:{enabled:true}}` + master on returns mode `rtk`; with `{rtk,caveman}` returns `stacked`. (Use the existing test's import + harness.)
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** — `selectCompressionStrategy` calls `resolveCompressionPlan(config, { comboId, combos })` and returns its `mode` (and expose the `stackedPipeline` so `applyCompressionAsync` uses the derived pipeline when mode==="stacked"). Load named `combos` from the combos DB module. In `chatCore.ts`, pass the active combo set; keep the `header` arg `undefined` (Phase 3 fills it). Keep `autoTriggerMode` behavior (auto-trigger still overrides to its mode on large prompts — apply BEFORE step 4 default).
- [ ] **Step 4: Run → PASS** + full compression suite + typecheck.
- [ ] **Step 5: Commit** `... -m "feat(compression): selectCompressionStrategy uses resolveCompressionPlan"`

---

## Task 8: API — `/api/settings/compression` carries `engines` + `activeComboId`

**Files:**
- Modify: `src/app/api/settings/compression/route.ts`
- Test: `tests/unit/api/compression/compression-api.test.ts` (extend)

- [ ] **Step 1: Add test**: `PUT` with `{engines:{rtk:{enabled:true,level:"standard"}}}` then `GET` returns it; error body has no stack (`!body.error?.message?.includes("at /")`).
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** — extend the route's Zod body schema with `engines` + `activeComboId` (reuse the db sub-schema); GET returns them; errors via `buildErrorBody`.
- [ ] **Step 4: Run → PASS** + vitest if the route is covered there.
- [ ] **Step 5: Commit** `... -m "feat(api): settings/compression carries engines map + activeComboId"`

---

## Task 9: Remove stored `defaultMode` write-path + default-combo editable route → shim

**Files:**
- Modify: `open-sse/services/compression/types.ts` (drop `defaultMode` from the persisted shape; keep `CompressionMode` type)
- Modify: `src/app/api/context/combos/default/route.ts` (PUT → 410/deprecation; GET → derived default read-only)
- Test: `tests/unit/api/...` for the shim (PUT rejected, GET returns derived).

- [ ] **Step 1: Add test**: `PUT /api/context/combos/default` returns a deprecation error (not 200); `GET` returns the derived default pipeline.
- [ ] **Step 2: Run → FAIL.**
- [ ] **Step 3: Implement** — `setEngineInDefaultCombo` no longer the write path; PUT route returns `buildErrorBody` "deprecated: edit engines in /api/settings/compression"; GET returns `deriveDefaultPlan(config.engines, config.enabled)`. Remove remaining reads of stored `defaultMode` (derive).
- [ ] **Step 4: Run → PASS** + full suite + typecheck.
- [ ] **Step 5: Commit** `... -m "refactor(compression): derive default; default-combo route is a read-only shim"`

---

## Task 10: The engine-grid panel UI

**Files:**
- Create: `src/app/(dashboard)/dashboard/context/settings/CompressionPanel.tsx`
- Modify: `src/app/(dashboard)/dashboard/context/settings/page.tsx` (render `CompressionPanel`)
- Test: `tests/unit/ui/compressionPanel.test.tsx` (vitest, `createRoot`+`act`)

- [ ] **Step 1: Write the failing component test**: render `CompressionPanel` with a stubbed `fetch` returning `{enabled:true, engines:{rtk:{enabled:true,level:"standard"}}}`; assert it renders a row per `ENGINE_IDS`, the rtk level shows "standard", toggling caveman issues a `PUT` with `engines.caveman.enabled:true`, and the derived-pipeline preview text appears.
- [ ] **Step 2: Run → FAIL** (`npm run test:vitest`).
- [ ] **Step 3: Implement** `CompressionPanel.tsx`: master toggle; map `ENGINE_IDS` → a row component `[label+desc][Toggle][LevelSelect if meta.levels][Link → /dashboard/context/<id>]`; a derived-pipeline preview computed client-side via `deriveDefaultPlan` (import the pure fn); a `cavemanOutput` row; an `mcpAccessibility` row (writes its own endpoint, with a "MCP tool outputs" note); general settings (auto-trigger, preserve system prompt). Save via `PUT /api/settings/compression` (debounced, merge-patch like the existing `save()` pattern in `CompressionSettingsTab`). Reuse existing primitives (`Toggle`, segmented control) from the current cards.
- [ ] **Step 4:** Update `page.tsx` to render `<CompressionPanel/>`. Run → PASS.
- [ ] **Step 5: Commit** `... -m "feat(dashboard): engine-grid compression panel (single source for on/off + level)"`

---

## Task 11: Consolidate — remove scattered/duplicate toggles + per-engine on/off

**Files:**
- Modify: `src/app/(dashboard)/dashboard/settings/components/CompressionTokenSaverCard.tsx` (remove; or strip to a read-only summary linking to the panel)
- Modify: `CompressionSettingsTab.tsx` (remove duplicate caveman/rtk on/off + intensity sections; keep only things not in the panel, or delete if fully superseded)
- Modify: `src/shared/components/compression/EngineConfigPage.tsx` + `CavemanContextPageClient.tsx` + `RtkContextPageClient.tsx` (remove on/off + level; keep detailed config; stop writing `/api/context/combos/default`)
- Test: vitest render tests for the per-engine pages assert NO enabled toggle is present; the existing tests updated to the new shape (alignment, not masking).

- [ ] **Step 1:** Update the affected render tests to expect the new (toggle-free) shape; run → FAIL on the still-present toggles.
- [ ] **Step 2:** Implement the removals; per-engine detail save writes detailed config to its facade route (caveman/rtk) or the settings sub-object.
- [ ] **Step 3:** Run vitest + full compression suite → PASS.
- [ ] **Step 4: Commit** `... -m "refactor(dashboard): remove duplicate compression toggles; per-engine pages keep only detailed config"`

---

## Task 12: Menu reorder + integration + full validation

**Files:**
- Modify: `src/shared/constants/sidebarVisibility.ts` (`COMPRESSION_CONTEXT_GROUP`: Settings → Combos → per-engine → Studio)
- Test: `tests/unit/...` sidebar order test (if one exists) + an integration test.

- [ ] **Step 1:** Add an integration test: build a config with `engines:{rtk:{enabled:true},caveman:{enabled:true,level:"full"}}`, call `selectCompressionStrategy` + `applyCompressionAsync` on a realistic body, assert the derived stacked pipeline ran (engineBreakdown has rtk+caveman) and equals the behavior of an explicit `[rtk,caveman]` stacked config. Run → (write fails first if any wiring gap).
- [ ] **Step 2:** Reorder the sidebar group; update any sidebar order test (alignment).
- [ ] **Step 3:** FULL validation: `npm run typecheck:core` (clean) · `npm run lint` (0 errors) · `node --import tsx/esm --test tests/unit/compression/*.test.ts` (green) · `npm run test:vitest` (green) · the api/integration compression tests.
- [ ] **Step 4: Commit** `... -m "feat(compression): unified panel menu order + integration coverage"`

---

## Self-review notes (done while writing)
- Spec coverage: panel (T10), combos boundary (default derived T3/T9; named/active resolver T6 — UI for active selection is Phase 2), per-engine detail-only (T11), header (resolver is header-aware T6; parsing+wiring is Phase 3), migration (T4/T5), menu (T12). ✓
- Type consistency: `EngineToggle` (T2) used by `deriveDefaultPlan` (T3), `resolveCompressionPlan` (T6), normalize (T5), panel (T10). `DerivedPlan` shape consistent T3↔T6↔T7. ✓
- No placeholders: each task has concrete code/tests. UI tasks (T10/T11) specify exact behavior + assertions; final per-line component code is produced at execution following the existing card patterns.

---

# 📌 RESUMO — o que ESTE plano (Fase 1) entrega

1. **Catálogo de engines** (`engineCatalog.ts`) — fonte única de metadados (níveis, single-mode, ordem).
2. **Modelo de dados Fase A** — `engines` map + `activeComboId` em `CompressionConfig`, com migração 102 + backfill (zero mudança de comportamento).
3. **`deriveDefaultPlan`** — pipeline default DERIVADO dos toggles (0/1/N engines → off/modo/stacked).
4. **`resolveCompressionPlan`** — resolvedor de precedência (header > override por-rota > perfil ativo > default derivado > off), já header/active-aware.
5. **Fiação no runtime** — `selectCompressionStrategy`/`chatCore` usam o resolvedor.
6. **API** — `/api/settings/compression` carrega `engines` + `activeComboId`; rota `combos/default` vira shim read-only; `defaultMode` armazenado removido (derivado).
7. **Painel engine-grid** — `CompressionPanel.tsx` como fonte única de master + on/off + nível, com preview do pipeline derivado.
8. **Consolidação** — remove toggles duplicados (TokenSaverCard, CompressionSettingsTab) e tira on/off+nível das páginas por-engine (que ficam só com config detalhada).
9. **Menu** — Settings → Combos → páginas por-engine → Studio.

---

# ⏳ PENDÊNCIAS — a fazer DEPOIS deste plano (cada uma vira seu próprio plano/PR)

### Fase 2 — Perfis nomeados + seletor de ativo
- **UI de combos como perfis**: a página `context/combos` lista N combos nomeados, edita pipeline **ordenado** (drag/reorder + nível por step), e tem o seletor **"perfil ativo"** (`Default` | `<combo>`) gravando `activeComboId`. O resolvedor (Fase 1) já consome `activeComboId`; falta a UI + o carregamento dos combos nomeados no `selectCompressionStrategy`. Remover o "master mode selector" do `CompressionHub` (modo agora é derivado).

### Fase 3 — Header por-request `x-omniroute-compression`
- **Parsing + wiring do header**: ler `x-omniroute-compression` no pipeline (espelhando `x-omniroute-no-memory`, PR #4290), passar como `ctx.header` ao `resolveCompressionPlan` (que já trata `off`/`default`/`<combo>`/`engine:<id>`). Doc no `API_REFERENCE` + teste de fetch-capture provando precedência por-request.

### Itens de compressão deferidos (do ciclo de fixes, independentes deste painel)
- **B-OBSERVABILITY** (telemetria): engines no-op somem do `engineBreakdown` (não dá pra distinguir "rodou 0%" de "pulou"). Exige um refactor do modelo de breakdown (campo `ran`/`skipped`) que toca a UI Studio + testes que asseram `.length` — deferido conscientemente.
- **B-CAVEMAN-PACKS**: `de`/`fr`/`ja` sem `dedup.json`+`ultra.json` (ultra==full nessas línguas). Conteúdo linguístico — adicionar os packs (ou contribuição), **sem** fallback EN que mutilaria.
- **js-tiktoken 1.0.21→1.0.22**: bump trivial (o range `^1.0.20` já permite; só pinar o lockfile num install real).

### Decisão operacional pendente (não-código)
- **Ligar o SLM (tier ultra) em produção**: validado ao vivo (49,4% real), mas mantido **OFF** por sua escolha. Quando decidir o trade-off (custo/latência/qualidade do pruning), ligar via o painel (após Fase 1) ou pela escrita de config — começando conservador (≥2000 tok).

### Portes upstream (opcionais, do audit — fora do escopo deste painel)
- headroom *safety-rails*/BM25; filtros novos do rtk/token-savior; conformance GCF v3.1 (já cobrimos o `[..]:`); transformers.js 3.5.2→4.x (arriscado, major).
