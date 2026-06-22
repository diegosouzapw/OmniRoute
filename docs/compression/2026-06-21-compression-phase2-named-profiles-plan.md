---
title: "Compression Phase 2 — Named Profiles + Active Selector: Implementation Plan"
version: 3.8.32
lastUpdated: 2026-06-21
---

# Compression Phase 2 — Named Profiles + Active Selector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire `CompressionConfig.activeComboId` into the runtime and give the operator a single active-profile selector (Default-from-panel | a named combo) on the Combos page, removing the now-duplicate "master mode selector" and "Set as Default" controls.

**Architecture:** The resolver already has the model; Phase 2 (a) lifts the active-combo resolution into `resolveBasePlan` (so it applies regardless of `enginesExplicit`, above auto-trigger, below a routing-combo override), threading a `combos` map through `selectCompressionPlan`/`selectCompressionStrategy`; (b) `chatCore` loads named combos via `listCompressionCombos()` and passes them in, and guards the legacy default-combo block so it can't shadow an active profile; (c) the UI adds an active-profile selector + read-only preview to `CompressionHub` (removing the master toggle / mode selector / reorder) and removes "Set as Default" from `NamedCombosManager` (adding an "● Active" badge). No new API endpoints or DB migrations.

**Tech Stack:** TypeScript, Next.js 16 App Router, SQLite (better-sqlite3), Node test runner + Vitest (component), React.

**Base:** worktree `feat/compression-phase2-named-profiles` off `release/v3.8.32`. Spec: `docs/compression/2026-06-21-compression-phase2-named-profiles-design.md`.

**Conventions:** unit tests run `node --import tsx/esm --test tests/unit/<f>.test.ts`; component tests run `npx vitest run <file>`. Each task ends by running the FULL compression suite (`node --import tsx/esm --test tests/unit/compression/*.test.ts`) + `npm run typecheck:core` before commit. Never `--no-verify`. Both UI files (`CompressionHub.tsx`, `CompressionCombosPageClient.tsx`) deliberately use **literal English strings, NOT `useTranslations`** — so vitest component tests can assert on those strings directly.

---

## File Structure

**Modify:**

- `open-sse/services/compression/strategySelector.ts` — thread a `combos` param through `resolveBasePlan`/`selectCompressionPlan`/`selectCompressionStrategy`/`getEffectiveMode`; resolve the active combo in `resolveBasePlan`; export `activeComboResolves()`.
- `open-sse/handlers/chatCore.ts` — load named combos, pass them to the two `selectCompression*` calls, guard the legacy default-combo block with `!activeComboResolves(...)`.
- `src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx` — remove master toggle / mode selector / reorder; add the active-profile selector + preview.
- `src/app/(dashboard)/dashboard/context/combos/CompressionCombosPageClient.tsx` — remove `setDefault` + "Set as Default" button; add the "● Active" badge from `activeComboId`.

**Create (tests):**

- `tests/unit/compression/active-combo-dispatch.test.ts`
- `tests/unit/compression/active-combo-integration.test.ts`
- `tests/unit/ui/compressionHub-active-selector.test.tsx`
- `tests/unit/ui/namedCombos-active-badge.test.tsx`

**Reference types:** `CompressionPipelineStep` = `{ engine: CompressionEngineId; intensity?: CavemanIntensity | RtkIntensity; config?: Record<string, unknown> }` (in `open-sse/services/compression/types.ts`). `DerivedPlan` = `{ mode: string; stackedPipeline: Array<{ engine: string; intensity?: string }> }` (in `deriveDefaultPlan.ts`).

---

## Task 1: Dispatch — resolve the active combo + thread `combos`

**Files:**

- Modify: `open-sse/services/compression/strategySelector.ts`
- Test: `tests/unit/compression/active-combo-dispatch.test.ts`

- [ ] **Step 1: Write the failing test** at `tests/unit/compression/active-combo-dispatch.test.ts`

```ts
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  selectCompressionStrategy,
  selectCompressionPlan,
  activeComboResolves,
} from "../../../open-sse/services/compression/strategySelector.ts";
import {
  DEFAULT_COMPRESSION_CONFIG,
  type CompressionConfig,
} from "../../../open-sse/services/compression/types.ts";

const combos = {
  c1: [
    { engine: "rtk", intensity: "standard" },
    { engine: "caveman", intensity: "full" },
  ],
};

function cfg(overrides: Partial<CompressionConfig> = {}): CompressionConfig {
  return { ...DEFAULT_COMPRESSION_CONFIG, enabled: true, ...overrides };
}

describe("active named combo resolution (Phase 2)", () => {
  it("activeComboId + combo present => that combo's stacked pipeline (regardless of enginesExplicit)", () => {
    const config = cfg({ activeComboId: "c1", enginesExplicit: false });
    const plan = selectCompressionPlan(config, null, 0, undefined, undefined, combos);
    assert.equal(plan.mode, "stacked");
    assert.deepEqual(plan.stackedPipeline, combos.c1);
  });
  it("activeComboId null => falls through to derived default (not the combo)", () => {
    const config = cfg({
      activeComboId: null,
      enginesExplicit: true,
      engines: { rtk: { enabled: true } },
    });
    assert.equal(selectCompressionStrategy(config, null, 0, undefined, undefined, combos), "rtk");
  });
  it("activeComboId set but combo missing => graceful fall-through to default", () => {
    const config = cfg({ activeComboId: "ghost", defaultMode: "lite", enginesExplicit: false });
    assert.equal(selectCompressionStrategy(config, null, 0, undefined, undefined, combos), "lite");
  });
  it("routing-combo override wins over the active profile", () => {
    const config = cfg({ activeComboId: "c1", comboOverrides: { "my-combo": "off" } });
    assert.equal(
      selectCompressionStrategy(config, "my-combo", 0, undefined, undefined, combos),
      "off"
    );
  });
  it("active profile wins over auto-trigger", () => {
    const config = cfg({
      activeComboId: "c1",
      autoTriggerTokens: 1000,
      autoTriggerMode: "aggressive",
    });
    assert.equal(
      selectCompressionStrategy(config, null, 5000, undefined, undefined, combos),
      "stacked"
    );
  });
});

describe("activeComboResolves", () => {
  it("true only when activeComboId is set AND present in combos", () => {
    assert.equal(activeComboResolves(cfg({ activeComboId: "c1" }), combos), true);
    assert.equal(activeComboResolves(cfg({ activeComboId: "ghost" }), combos), false);
    assert.equal(activeComboResolves(cfg({ activeComboId: null }), combos), false);
  });
});
```

- [ ] **Step 2: Run → FAIL** (`node --import tsx/esm --test tests/unit/compression/active-combo-dispatch.test.ts`) — `activeComboResolves` not exported / `combos` arg ignored.

- [ ] **Step 3: Implement** in `strategySelector.ts`. Add the `CompressionPipelineStep` type import (it's already imported from `./types.ts` in most cases — confirm; if not, add it). Define the combos type alias near the top after imports:

```ts
type NamedCombos = Record<string, CompressionPipelineStep[]>;
```

Change `resolveBasePlan` to accept `combos` and resolve the active combo after the routing-combo override, before auto-trigger:

```ts
function resolveBasePlan(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number,
  combos: NamedCombos = {}
): DerivedPlan {
  if (!config.enabled) return { mode: "off", stackedPipeline: [] };

  const comboMode = checkComboOverride(config, comboId);
  if (comboMode) {
    return resolveCompressionPlan(config, { comboId, combos });
  }

  // Active profile: an EXPLICIT operator choice. Resolves regardless of enginesExplicit and
  // above auto-trigger (manual choice beats automatic escalation), but below a routing-combo
  // override (route-scoped is more specific).
  if (config.activeComboId && combos[config.activeComboId]) {
    return { mode: "stacked", stackedPipeline: combos[config.activeComboId] };
  }

  if (shouldAutoTrigger(config, estimatedTokens)) {
    const mode = config.autoTriggerMode ?? "lite";
    return mode === "stacked"
      ? { mode, stackedPipeline: config.stackedPipeline ?? [] }
      : { mode, stackedPipeline: [] };
  }

  return deriveDefaultPlanFromConfig(config, comboId, combos);
}
```

Add the `combos` param to `deriveDefaultPlanFromConfig` and pass it to its `resolveCompressionPlan` call:

```ts
function deriveDefaultPlanFromConfig(
  config: CompressionConfig,
  comboId: string | null,
  combos: NamedCombos = {}
): DerivedPlan {
  if (config.enginesExplicit) {
    return resolveCompressionPlan(config, { comboId, combos });
  }
  const legacyMode = config.defaultMode;
  if (legacyMode && legacyMode !== "off") {
    return legacyMode === "stacked"
      ? { mode: legacyMode, stackedPipeline: config.stackedPipeline ?? [] }
      : { mode: legacyMode, stackedPipeline: [] };
  }
  return { mode: "off", stackedPipeline: [] };
}
```

Add `combos` as a trailing param to `getEffectiveMode`, `selectCompressionPlan`, `selectCompressionStrategy` and thread it down. Final signatures + bodies:

```ts
export function getEffectiveMode(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number,
  combos: NamedCombos = {}
): CompressionMode {
  return resolveBasePlan(config, comboId, estimatedTokens, combos).mode as CompressionMode;
}

export function selectCompressionPlan(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number,
  body?: Record<string, unknown>,
  context?: CachingDetectionContext,
  combos: NamedCombos = {}
): DerivedPlan {
  const plan = resolveBasePlan(config, comboId, estimatedTokens, combos);
  if (body) {
    const ctx = detectCachingContext(body, context);
    const cacheAware = getCacheAwareStrategy(plan.mode as CompressionMode, ctx);
    return { ...plan, mode: cacheAware.strategy as CompressionMode };
  }
  return plan;
}

export function selectCompressionStrategy(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number,
  body?: Record<string, unknown>,
  context?: CachingDetectionContext,
  combos: NamedCombos = {}
): CompressionMode {
  return selectCompressionPlan(config, comboId, estimatedTokens, body, context, combos)
    .mode as CompressionMode;
}
```

Add the exported helper (near `enginesMapDerivesStackedPipeline`):

```ts
/**
 * True when the config has an active named-combo selection that exists in the supplied combos
 * map. chatCore uses this to keep the legacy default-combo fallback from shadowing the
 * operator's active profile (same class of bug as the #4023 web-cookie shadowing).
 */
export function activeComboResolves(config: CompressionConfig, combos: NamedCombos = {}): boolean {
  return Boolean(config.activeComboId && combos[config.activeComboId]);
}
```

If `CompressionPipelineStep` is not already imported in `strategySelector.ts`, add it to the existing `import { ... } from "./types.ts"` (it is a type-only symbol).

- [ ] **Step 4: Run → PASS** + full compression suite + `npm run typecheck:core`.

- [ ] **Step 5: Commit**

```bash
git add open-sse/services/compression/strategySelector.ts tests/unit/compression/active-combo-dispatch.test.ts
git commit -m "feat(compression): resolve active named combo in dispatch (activeComboId)"
```

---

## Task 2: chatCore — load named combos + guard the legacy block

**Files:**

- Modify: `open-sse/handlers/chatCore.ts` (compression dispatch block, ~lines 1428–1690)
- Test: `tests/unit/compression/active-combo-integration.test.ts`

- [ ] **Step 1: Write the failing integration test** at `tests/unit/compression/active-combo-integration.test.ts`

```ts
import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-active-combo-"));
const ORIGINAL = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const { getDbInstance, resetDbInstance } = await import("../../../src/lib/db/core.ts");
const combosDb = await import("../../../src/lib/db/compressionCombos.ts");
const { updateCompressionSettings } = await import("../../../src/lib/db/compression.ts");
const { selectCompressionPlan } =
  await import("../../../open-sse/services/compression/strategySelector.ts");
const { DEFAULT_COMPRESSION_CONFIG } =
  await import("../../../open-sse/services/compression/types.ts");

after(() => {
  resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL;
});

test("an active named combo's pipeline is what selectCompressionPlan resolves, fed from the DB combos map", async () => {
  resetDbInstance();
  getDbInstance();
  const created = combosDb.createCompressionCombo({
    name: "RTK only",
    pipeline: [{ engine: "rtk", intensity: "standard" }],
  });
  await updateCompressionSettings({ enabled: true, activeComboId: created.id });

  // Mirror chatCore's load: build the combos map from the DB.
  const combos = Object.fromEntries(
    combosDb.listCompressionCombos().map((c) => [c.id, c.pipeline])
  );
  const config = { ...DEFAULT_COMPRESSION_CONFIG, enabled: true, activeComboId: created.id };
  const plan = selectCompressionPlan(config, null, 5000, undefined, undefined, combos);
  assert.equal(plan.mode, "stacked");
  assert.deepEqual(plan.stackedPipeline, [{ engine: "rtk", intensity: "standard" }]);

  // Setting activeComboId did NOT change which combo is is_default (legacy untouched).
  const def = combosDb.getDefaultCompressionCombo();
  assert.notEqual(def?.id, created.id);
});
```

- [ ] **Step 2: Run → FAIL** (the combos map is correct but confirms the wiring contract; if `createCompressionCombo`'s default seeding makes the new combo default, adjust the assertion to read the seeded `default-caveman` id — verify by reading `compressionCombos.ts`). Run: `node --import tsx/esm --test tests/unit/compression/active-combo-integration.test.ts`.

- [ ] **Step 3: Implement** in `chatCore.ts`. In the compression block, AFTER `config` is loaded and BEFORE the first `selectCompressionStrategy` call (line ~1602), load the named combos once:

```ts
let namedCombos: Record<string, CompressionPipelineStep[]> = {};
try {
  const { listCompressionCombos } = await import("../../src/lib/db/compressionCombos.ts");
  namedCombos = Object.fromEntries(listCompressionCombos().map((c) => [c.id, c.pipeline]));
} catch (err) {
  log?.debug?.(
    "COMPRESSION",
    "Named combos load skipped: " + (err instanceof Error ? err.message : String(err))
  );
}
```

Pass `namedCombos` as the 6th arg to BOTH `selectCompressionStrategy` (line ~1602) and `selectCompressionPlan` (line ~1668):

```ts
const modeBeforeOutputTransform = selectCompressionStrategy(
  config,
  compressionComboKey,
  estimatedTokens,
  body as Record<string, unknown>,
  { provider, targetFormat, model: effectiveModel },
  namedCombos
);
```

```ts
const compressionPlan = selectCompressionPlan(
  config,
  compressionComboKey,
  estimatedTokens,
  compressionInputBody,
  { provider, targetFormat, model: effectiveModel },
  namedCombos
);
```

Guard the legacy default-combo block (the `if (modeBeforeOutputTransform === "stacked" && ... && !enginesMapDerivesStackedPipeline(config))` at line ~1609) so it does NOT fire when the active profile resolves — add `enginesMapDerivesStackedPipeline` is already imported; add `activeComboResolves` to the same import block (line ~1430) and add the guard term:

```ts
const {
  selectCompressionStrategy,
  selectCompressionPlan,
  enginesMapDerivesStackedPipeline,
  activeComboResolves, // ← add
  applyCompressionAsync,
  resolveCacheAwareConfig,
} = await import("../services/compression/strategySelector.ts");
```

```ts
      if (
        modeBeforeOutputTransform === "stacked" &&
        !compressionComboApplied &&
        !config.compressionComboId &&
        isBuiltinStackedPipeline(config.stackedPipeline) &&
        !enginesMapDerivesStackedPipeline(config) &&
        !activeComboResolves(config, namedCombos)   // ← add: never shadow the active profile
      ) {
```

The existing engines-map feed (line ~1680, `if (mode === "stacked" && compressionPlan.stackedPipeline.length > 0 && !compressionComboApplied && !config.compressionComboId)`) now ALSO feeds the active combo's pipeline into `config.stackedPipeline` (because `compressionPlan.stackedPipeline` is the active combo's when activeComboId resolves) — no change needed there. Confirm `CompressionPipelineStep` is imported in chatCore.ts (it is used by `config.stackedPipeline`); if not, add the type import.

- [ ] **Step 4: Run → PASS** + full compression suite + `npm run typecheck:core` + `npm run lint`.

- [ ] **Step 5: Commit**

```bash
git add open-sse/handlers/chatCore.ts tests/unit/compression/active-combo-integration.test.ts
git commit -m "feat(compression): chatCore loads named combos; legacy default combo can't shadow the active profile"
```

---

## Task 3: UI — active-profile selector in CompressionHub (remove duplicates)

**Files:**

- Modify: `src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`
- Test: `tests/unit/ui/compressionHub-active-selector.test.tsx`

- [ ] **Step 1: Read the file first.** Note: it uses literal English strings (no `useTranslations`), `useState` for `settings`/`engines`/`combo`, a `saveSettings()` PUT to `/api/settings/compression`, a `MODES` array + a mode `<select>`, a Token Saver master `<Toggle>`, and a `moveStep()` reorder. The component fetches `/api/settings/compression`, `/api/compression/engines`, `/api/context/combos/default` on mount.

- [ ] **Step 2: Write the failing component test** at `tests/unit/ui/compressionHub-active-selector.test.tsx` (mirror `tests/unit/ui/compressionPanel.test.tsx`'s `createRoot`+`act` harness). Stub `fetch`: `/api/settings/compression` → `{ enabled:true, defaultMode:"off", activeComboId:null }`; `/api/compression/engines` → `{ engines: [] }`; `/api/context/combos` → `{ combos: [{ id:"c1", name:"RTK only", pipeline:[{engine:"rtk"}] }] }`. Assert:
  1. A `<select data-testid="active-profile-select">` renders with options "Default (from panel)" and "RTK only".
  2. Changing it to `c1` issues a `PUT /api/settings/compression` whose body has `activeComboId === "c1"`.
  3. The preview (`data-testid="active-profile-preview"`) shows the combo's engines when a combo is active.
  4. There is NO mode `<select>` for Off/Lite/Standard and NO "Token Saver" master toggle (query by their old text/testids → absent).

- [ ] **Step 3: Run → FAIL** (`npx vitest run tests/unit/ui/compressionHub-active-selector.test.tsx`).

- [ ] **Step 4: Implement** in `CompressionHub.tsx`:
  - **Remove** the Token Saver master `<Toggle>` + its label/explainer, the `MODES` mode `<select>` + its handler, and `moveStep` + the reorder buttons. Keep the component's data load + error handling.
  - **Add** `activeComboId` to the settings state/type; **fetch** the named combos list (`/api/context/combos`) on mount into a `combos` state.
  - **Add** the active-profile `<select data-testid="active-profile-select">` with a "Default (from panel)" option (value `""` → `activeComboId: null`) and one option per named combo (`value=c.id`, label `c.name`). On change: `setSettings(s => ({...s, activeComboId}))` + `PUT /api/settings/compression { activeComboId }`.
  - **Add** the read-only preview `<div data-testid="active-profile-preview">`: if `activeComboId` matches a combo, render its `pipeline` engines joined by " → "; else render the Default — import `deriveDefaultPlan` (relative path `../../../../../../open-sse/services/compression/deriveDefaultPlan.ts`, the Phase-1 panel pattern — the bare `@omniroute/...` alias does NOT resolve under vitest) and `engineCatalog` if needed; compute `deriveDefaultPlan(engines, enabled)` from the fetched settings/engines and show the order, OR (simpler, no engines map on the Hub settings type) show the text "Default — see the panel for the derived pipeline." Choose the simplest correct option that the test asserts.
  - Match the file's existing literal-English style + primitives.

- [ ] **Step 5: Run → PASS** + `npm run typecheck:core` + `npm run lint`.

- [ ] **Step 6: Commit**

```bash
git add "src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx" tests/unit/ui/compressionHub-active-selector.test.tsx
git commit -m "feat(dashboard): active-profile selector in CompressionHub; remove master toggle/mode/reorder"
```

---

## Task 4: UI — NamedCombosManager: remove "Set as Default", add "● Active" badge

**Files:**

- Modify: `src/app/(dashboard)/dashboard/context/combos/CompressionCombosPageClient.tsx`
- Test: `tests/unit/ui/namedCombos-active-badge.test.tsx`

- [ ] **Step 1: Read the file first.** Note: literal English; `setDefault(id)` PUTs `/api/context/combos/{id} { isDefault: true }`; the combo cards (`combos.map`) show a `combo.isDefault` "Default" badge and, when `!combo.isDefault`, a "Set as Default" button + a Delete button.

- [ ] **Step 2: Write the failing component test** at `tests/unit/ui/namedCombos-active-badge.test.tsx`. Stub: `/api/context/combos` → two combos `c1`/`c2`; `/api/combos` → `[]`; `/api/compression/language-packs` → `[]`; `/api/settings/compression` → `{ activeComboId: "c2" }`. Assert:
  1. No "Set as Default" button is present anywhere.
  2. The card for `c2` shows an "● Active" badge (query `data-testid="active-badge-c2"`); the card for `c1` does NOT.

- [ ] **Step 3: Run → FAIL** (`npx vitest run tests/unit/ui/namedCombos-active-badge.test.tsx`).

- [ ] **Step 4: Implement** in `CompressionCombosPageClient.tsx`:
  - **Remove** the `setDefault` function and the "Set as Default" `<button>` from the card render.
  - **Fetch** `activeComboId` on mount (`GET /api/settings/compression` → `data.activeComboId`) into an `activeComboId` state.
  - In the card render, **replace** the `combo.isDefault` "Default" badge with: `combo.id === activeComboId && <span data-testid={\`active-badge-${combo.id}\`}>● Active</span>`. (Keep the `isDefault` field in the type; just stop surfacing it.)
  - Keep create/edit/delete/pipeline-editor/language-packs/output-mode/assignments untouched.

- [ ] **Step 5: Run → PASS** + `npm run typecheck:core` + `npm run lint`.

- [ ] **Step 6: Commit**

```bash
git add "src/app/(dashboard)/dashboard/context/combos/CompressionCombosPageClient.tsx" tests/unit/ui/namedCombos-active-badge.test.tsx
git commit -m "feat(dashboard): NamedCombosManager active badge; remove Set-as-Default (active selector replaces it)"
```

---

## Task 5: Full validation + no-regression + file-size

**Files:**

- Modify (if needed): `config/quality/file-size-baseline.json` (rebaseline any grown frozen file with a justification key)
- Test: reuse existing suites.

- [ ] **Step 1:** Run the FULL gates:
  - `npm run typecheck:core` (clean)
  - `npm run lint` (0 errors)
  - `npm run check:cycles` (no cycles — the new `combos` threading must not create a `strategySelector → src/lib/db` cycle; it must NOT — chatCore does the DB load, not strategySelector)
  - `node --import tsx/esm --test tests/unit/compression/*.test.ts` (green, incl. the Phase-1 strategySelector/derive/resolve tests UNCHANGED — confirm no regression from the `combos` param defaults)
  - `npm run test:vitest` (blocking; green)
  - `npx vitest run tests/unit/ui/compressionHub-active-selector.test.tsx tests/unit/ui/namedCombos-active-badge.test.tsx` (green)
  - the api + db compression tests (`tests/unit/api/compression/*.test.ts`, the migration/round-trip test)
- [ ] **Step 2:** If `check:file-size` flags `CompressionHub.tsx`/`CompressionCombosPageClient.tsx`/`strategySelector.ts`/`chatCore.ts`, update `config/quality/file-size-baseline.json` (value + a `_rebaseline_2026_06_21_phase2_active_selector` justification key, same pattern as Phase 1).
- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore(compression): Phase 2 full validation + file-size rebaseline"
```

---

## Self-review notes (done while writing)

- **Spec coverage:** active-combo resolution in resolveBasePlan (T1), `combos` threading (T1), chatCore load + legacy-block guard (T2), active-profile selector + Hub cleanup (T3), Set-as-Default removal + active badge (T4), is_default-untouched assertion (T2), tests + file-size (T5). ✓
- **Type consistency:** `NamedCombos = Record<string, CompressionPipelineStep[]>` used in T1's signatures + T2's chatCore load + `activeComboResolves`. `DerivedPlan.stackedPipeline` accepts `CompressionPipelineStep[]` (structural superset). ✓
- **No placeholders:** concrete code/tests; UI removals point at exact elements (the executing subagent reads the file). T3 step 4 offers the simplest preview option and tells the executor to pick what the test asserts — make the test assert the combo-engine text and the "Default" fallback text so the choice is fixed at execution.

---

# 📌 RESUMO — o que ESTE plano (Fase 2) entrega

1. **Resolução do perfil ativo** no `resolveBasePlan` (precedência routing-override > ativo > auto-trigger > Default derivado), independente de `enginesExplicit`, com `combos` threaded por `selectCompressionPlan`/`Strategy`.
2. **chatCore** carrega combos nomeados (`listCompressionCombos`) e os passa ao resolver; o bloco legado de default-combo é guardado por `!activeComboResolves` (não sombreia o perfil ativo).
3. **CompressionHub** ganha o seletor de perfil ativo + preview e perde master-toggle/mode-selector/reorder (duplicados/derivados).
4. **NamedCombosManager** perde "Set as Default" e ganha o badge "● Ativo".
5. Zero API/DB nova; `is_default`/legado intocados; validação completa + rebaseline file-size.

# ⏳ PENDÊNCIAS — depois desta fase

- **Fase 3** — header `x-omniroute-compression` (resolver já header-aware; falta parsing+wiring, espelhando `x-omniroute-no-memory` #4290).
- Deferidos da Fase 1: B-OBSERVABILITY, packs caveman de/fr/ja, bump js-tiktoken.
- Decisão operacional: ligar o SLM (tier ultra) em produção.
