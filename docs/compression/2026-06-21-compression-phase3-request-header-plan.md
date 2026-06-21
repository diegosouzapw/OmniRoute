---
title: "Compression Phase 3: Per-Request Header — Implementation Plan"
version: 3.8.33
lastUpdated: 2026-06-21
---

# Compression Phase 3: Per-Request Header — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the `x-omniroute-compression` per-request header so a client can override the resolved compression plan for a single request, taking precedence over every operator-configured layer.

**Architecture:** A pure header interpreter (`planFromHeader`) is evaluated at the top of the compression resolver (`resolveBasePlan` in `strategySelector.ts`); chatCore parses the header off the wire, threads it through the existing selector signature (the same way Phase 2 threaded `combos`), captures the resolved `{ mode, source }`, and emits an `X-OmniRoute-Compression` response header. The resolver stays pure (no DB import).

**Tech Stack:** TypeScript, Node test runner (`node --import tsx/esm --test`), better-sqlite3 (combos store, read via chatCore only), Next.js handler (`open-sse/handlers/chatCore.ts`).

**Spec:** `docs/compression/2026-06-21-compression-phase3-request-header-design.md`

---

## Key prior-art / facts (read before starting)

- The resolver entry point is `resolveBasePlan` in `open-sse/services/compression/strategySelector.ts`. It already threads a `combos` map (Phase 2). Public selectors: `selectCompressionPlan` / `selectCompressionStrategy` / `getEffectiveMode`, signature ending in `..., combos = {}`.
- `DerivedPlan` is defined in `open-sse/services/compression/deriveDefaultPlan.ts` as `{ mode: string; stackedPipeline: Array<{ engine: string; intensity?: string }> }`.
- `open-sse/services/compression/resolveCompressionPlan.ts` carries a **dormant** header branch (`ctx.header` + private `headerToPlan`). No caller ever passes `header` (confirmed: the only `.header` refs in compression code are those lines; no test passes it). This plan **removes** that dormant branch so header interpretation has a single home.
- Parsing precedent: `isNoMemoryRequested` in `open-sse/handlers/chatCore/headers.ts` (uses `getHeaderValueCaseInsensitive`). Tests for that module: `tests/unit/chatcore-headers.test.ts`.
- A combo's `id` is a `uuidv4()` (or the seeded slug `default-caveman`); `name` has **no** UNIQUE constraint (migration 042). Header `<combo>` matches **name-first** (Decision A).
- chatCore reads request headers from `clientRawRequest?.headers`. The compression block builds `namedCombos` (~line 1373) and calls `selectCompressionStrategy` (~line 1532) then `selectCompressionPlan` (~line 1601). Response headers are built at two sites: the non-streaming JSON path (`responseHeaders` at ~line 4570, after `attachOmniRouteMetaHeaders`) and the streaming path (`responseHeaders` at ~line 4697).
- **Decision A:** `<combo>` matched name-first (lowercased), then exact id. **Decision B:** any valid header value bypasses auto-trigger.
- **Boundary (implement as written):** the master switch is the hard gate — when `config.enabled` is false, the request is uncompressed regardless of the header (the header redirects among configured plans only when compression is enabled). A test asserts this.

---

## File Structure

| File | Responsibility | Change |
|---|---|---|
| `open-sse/services/compression/deriveDefaultPlan.ts` | `DerivedPlan` type + new `CompressionSource` union + optional `source`. | Modify |
| `open-sse/services/compression/strategySelector.ts` | `planFromHeader` interpreter, header-first precedence in `resolveBasePlan`, `source` tagging, `formatCompressionMeta`, thread `header` through public selectors. | Modify |
| `open-sse/services/compression/resolveCompressionPlan.ts` | Remove the dormant `header` branch + `headerToPlan` + `ResolveCtx.header`. | Modify |
| `open-sse/handlers/chatCore/headers.ts` | `resolveCompressionHeader` parser. | Modify |
| `src/shared/constants/headers.ts` | `compression` response-header name. | Modify |
| `open-sse/handlers/chatCore.ts` | Parse header, add name keys to `namedCombos`, thread `header`, capture `{mode,source}`, emit response header at both sites. | Modify |
| `tests/unit/compression/compression-header-dispatch.test.ts` | Resolver + `planFromHeader` + `source` + precedence + `formatCompressionMeta`. | Create |
| `tests/unit/chatcore-headers.test.ts` | `resolveCompressionHeader` parsing. | Modify |
| `docs/reference/API_REFERENCE.md`, `docs/compression/COMPRESSION_GUIDE.md` | Document the header. | Modify |
| `config/quality/file-size-baseline.json` | Rebaseline chatCore if it crosses its pin. | Modify (if needed) |

---

## Task 1: Header interpreter, precedence, and `source` in the resolver

**Files:**
- Modify: `open-sse/services/compression/deriveDefaultPlan.ts`
- Modify: `open-sse/services/compression/strategySelector.ts`
- Modify: `open-sse/services/compression/resolveCompressionPlan.ts`
- Test: `tests/unit/compression/compression-header-dispatch.test.ts` (create)

- [ ] **Step 1: Write the failing test**

Create `tests/unit/compression/compression-header-dispatch.test.ts`:

```ts
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  selectCompressionStrategy,
  selectCompressionPlan,
  planFromHeader,
  formatCompressionMeta,
} from "../../../open-sse/services/compression/strategySelector.ts";
import {
  DEFAULT_COMPRESSION_CONFIG,
  type CompressionConfig,
} from "../../../open-sse/services/compression/types.ts";

const combos = {
  c1: [{ engine: "rtk", intensity: "standard" }, { engine: "caveman", intensity: "full" }],
  "fast combo": [{ engine: "lite" }],
};

function cfg(overrides: Partial<CompressionConfig> = {}): CompressionConfig {
  return { ...DEFAULT_COMPRESSION_CONFIG, enabled: true, ...overrides };
}

// header is the 7th positional arg of selectCompressionPlan/selectCompressionStrategy.
function planWithHeader(config: CompressionConfig, header: string | null) {
  return selectCompressionPlan(config, null, 0, undefined, undefined, combos, header);
}

describe("planFromHeader (Phase 3)", () => {
  it("off => mode off, source request-header", () => {
    const p = planFromHeader(cfg(), "off", combos);
    assert.deepEqual(p, { mode: "off", stackedPipeline: [], source: "request-header" });
  });

  it("default => the panel-derived default, ignoring the active profile", () => {
    const config = cfg({
      activeComboId: "c1",
      enginesExplicit: true,
      engines: { rtk: { enabled: true } },
    });
    const p = planFromHeader(config, "default", combos);
    assert.equal(p?.mode, "rtk"); // engines map default, NOT the c1 active profile
    assert.equal(p?.source, "request-header");
  });

  it("engine:<id> => that single engine when enabled (case-insensitive)", () => {
    const config = cfg({ enginesExplicit: true, engines: { rtk: { enabled: true } } });
    assert.equal(planFromHeader(config, "engine:RTK", combos)?.mode, "rtk");
  });

  it("engine:<id> => null (fall-through) when the engine is disabled", () => {
    const config = cfg({ engines: { rtk: { enabled: false } } });
    assert.equal(planFromHeader(config, "engine:rtk", combos), null);
  });

  it("<combo> matches by name (case-insensitive) and by id", () => {
    assert.deepEqual(planFromHeader(cfg(), "FAST COMBO", combos)?.stackedPipeline, combos["fast combo"]);
    assert.deepEqual(planFromHeader(cfg(), "c1", combos)?.stackedPipeline, combos.c1);
  });

  it("unknown value => null (fall-through)", () => {
    assert.equal(planFromHeader(cfg(), "nonsense", combos), null);
  });
});

describe("header precedence in resolveBasePlan (Phase 3)", () => {
  it("a valid header beats the active profile", () => {
    const config = cfg({ activeComboId: "c1" });
    assert.equal(planWithHeader(config, "off").mode, "off");
    assert.equal(planWithHeader(config, "off").source, "request-header");
  });

  it("a valid header beats a routing-combo override", () => {
    const config = cfg({ comboOverrides: { "route-x": "stacked" } });
    const plan = selectCompressionPlan(config, "route-x", 0, undefined, undefined, combos, "off");
    assert.equal(plan.mode, "off");
    assert.equal(plan.source, "request-header");
  });

  it("a valid header bypasses auto-trigger (Decision B)", () => {
    const config = cfg({
      autoTriggerTokens: 1000,
      autoTriggerMode: "aggressive",
      enginesExplicit: true,
      engines: { rtk: { enabled: true } },
    });
    // Large prompt would auto-escalate to aggressive; the header pins the panel default.
    assert.equal(planWithHeader(config, "default").mode, "rtk");
  });

  it("an unknown header falls through to the normal resolution", () => {
    const config = cfg({ activeComboId: "c1" });
    const plan = planWithHeader(config, "bogus");
    assert.equal(plan.mode, "stacked");
    assert.equal(plan.source, "active-profile");
  });

  it("master-off beats the header (hard kill switch)", () => {
    const config = cfg({ enabled: false, engines: { rtk: { enabled: true } } });
    const plan = planWithHeader(config, "engine:rtk");
    assert.equal(plan.mode, "off");
    assert.equal(plan.source, "off");
  });
});

describe("source on non-header paths", () => {
  it("routing-override / active-profile / auto-trigger / default / off", () => {
    assert.equal(
      selectCompressionPlan(cfg({ comboOverrides: { r: "lite" } }), "r", 0, undefined, undefined, combos, null).source,
      "routing-override"
    );
    assert.equal(planWithHeader(cfg({ activeComboId: "c1" }), null).source, "active-profile");
    assert.equal(
      planWithHeader(cfg({ autoTriggerTokens: 10, autoTriggerMode: "lite" }), null).source,
      "auto-trigger"
    );
    assert.equal(
      planWithHeader(cfg({ enginesExplicit: true, engines: { rtk: { enabled: true } } }), null).source,
      "default"
    );
    assert.equal(planWithHeader(cfg({ enabled: false }), null).source, "off");
  });
});

describe("formatCompressionMeta", () => {
  it("renders '<mode>; source=<source>'", () => {
    assert.equal(
      formatCompressionMeta({ mode: "aggressive", stackedPipeline: [], source: "request-header" }),
      "aggressive; source=request-header"
    );
    assert.equal(formatCompressionMeta({ mode: "off", stackedPipeline: [] }), "off; source=off");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --import tsx --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit tests/unit/compression/compression-header-dispatch.test.ts`
Expected: FAIL — `planFromHeader`/`formatCompressionMeta` are not exported yet (import error / not a function).

- [ ] **Step 3: Add `CompressionSource` + `source` to `DerivedPlan`**

In `open-sse/services/compression/deriveDefaultPlan.ts`, replace the `DerivedPlan` interface block:

```ts
export type CompressionSource =
  | "request-header"
  | "routing-override"
  | "active-profile"
  | "auto-trigger"
  | "default"
  | "off";

export interface DerivedPlan {
  mode: string;
  stackedPipeline: Array<{ engine: string; intensity?: string }>;
  /** Which precedence layer decided this plan (Phase 3 observability). Optional so
   *  Phase 1/2 callers and snapshots are unaffected. */
  source?: CompressionSource;
}
```

(Leave the `deriveDefaultPlan` function body unchanged — it does not set `source`; the resolver tags it.)

- [ ] **Step 4: Remove the dormant header branch from `resolveCompressionPlan.ts`**

In `open-sse/services/compression/resolveCompressionPlan.ts`: delete the `header` field from `ResolveCtx`, delete the `// 1. header` block, and delete the private `headerToPlan` function. The file becomes:

```ts
import { deriveDefaultPlan, type DerivedPlan } from "./deriveDefaultPlan.ts";

export interface ResolveCtx {
  comboId?: string | null;
  combos?: Record<string, Array<{ engine: string; intensity?: string }>>; // named combo pipelines by id
}

export function resolveCompressionPlan(config: any, ctx: ResolveCtx): DerivedPlan {
  if (config?.enabled === false) return { mode: "off", stackedPipeline: [] };

  // routing-combo override
  const ov = ctx.comboId ? config?.comboOverrides?.[ctx.comboId] : undefined;
  if (ov) return modeToPlan(ov, config);

  // active named combo
  if (config?.activeComboId && ctx.combos?.[config.activeComboId]) {
    return { mode: "stacked", stackedPipeline: ctx.combos[config.activeComboId] };
  }

  // derived default
  return deriveDefaultPlan(config?.engines ?? {}, config?.enabled !== false);
}

function modeToPlan(mode: string, config: any): DerivedPlan {
  return mode === "stacked"
    ? { mode: "stacked", stackedPipeline: config?.stackedPipeline ?? [] }
    : { mode, stackedPipeline: [] };
}
```

- [ ] **Step 5: Implement `planFromHeader`, `withSource`, header-first precedence, and `formatCompressionMeta` in `strategySelector.ts`**

In `open-sse/services/compression/strategySelector.ts`:

(a) Update the `DerivedPlan` import to also bring `CompressionSource`:

```ts
import { deriveDefaultPlan, type DerivedPlan, type CompressionSource } from "./deriveDefaultPlan.ts";
```

(b) Add these helpers (place them just above `resolveBasePlan`):

```ts
/** Tags a plan with the precedence layer that produced it (Phase 3 observability). */
function withSource(plan: DerivedPlan, source: CompressionSource): DerivedPlan {
  return { ...plan, source };
}

/**
 * Interprets the `x-omniroute-compression` request header into a plan, or null when the
 * value is unrecognized (caller falls through to normal resolution). Pure.
 *   off            -> no compression
 *   default        -> the panel-derived Default (ignores active profile / routing / auto-trigger)
 *   engine:<id>    -> that single engine, when enabled in config.engines
 *   <combo>        -> a named combo, matched name-first (lowercased) then exact id (Decision A)
 */
export function planFromHeader(
  config: CompressionConfig,
  header: string,
  combos: NamedCombos
): DerivedPlan | null {
  const h = header.trim();
  if (!h) return null;
  const lower = h.toLowerCase();

  if (lower === "off") return withSource({ mode: "off", stackedPipeline: [] }, "request-header");

  if (lower === "default") {
    // Empty combos + null comboId yields the pure panel default (no active-combo leak).
    return withSource(deriveDefaultPlanFromConfig(config, null, {}), "request-header");
  }

  if (lower.startsWith("engine:")) {
    const id = lower.slice("engine:".length);
    const engine = config.engines?.[id];
    return engine?.enabled
      ? withSource(deriveDefaultPlan({ [id]: engine }, true), "request-header")
      : null;
  }

  const combo = combos[lower] ?? combos[h];
  return combo ? withSource({ mode: "stacked", stackedPipeline: combo }, "request-header") : null;
}

/** Renders the X-OmniRoute-Compression response header value. */
export function formatCompressionMeta(plan: DerivedPlan): string {
  return `${plan.mode}; source=${plan.source ?? "off"}`;
}
```

(c) Add a `header` parameter to `resolveBasePlan` and tag every return with `withSource`:

```ts
function resolveBasePlan(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number,
  combos: NamedCombos = {},
  header: string | null = null
): DerivedPlan {
  if (!config.enabled) return withSource({ mode: "off", stackedPipeline: [] }, "off");

  // Phase 3: an explicit, recognized header wins over every operator layer (Decision B).
  // The master switch above is the hard kill: a header cannot turn compression on.
  if (header) {
    const fromHeader = planFromHeader(config, header, combos);
    if (fromHeader) return fromHeader; // already tagged "request-header"
  }

  const comboMode = checkComboOverride(config, comboId);
  if (comboMode) {
    return withSource(resolveCompressionPlan(config, { comboId, combos }), "routing-override");
  }

  if (config.activeComboId && combos[config.activeComboId]) {
    return withSource(
      { mode: "stacked", stackedPipeline: combos[config.activeComboId] },
      "active-profile"
    );
  }

  if (shouldAutoTrigger(config, estimatedTokens)) {
    const mode = config.autoTriggerMode ?? "lite";
    return withSource(
      mode === "stacked"
        ? { mode, stackedPipeline: config.stackedPipeline ?? [] }
        : { mode, stackedPipeline: [] },
      "auto-trigger"
    );
  }

  const plan = deriveDefaultPlanFromConfig(config, comboId, combos);
  return withSource(plan, plan.mode === "off" ? "off" : "default");
}
```

(d) Thread `header` through the public selectors (append as the last positional arg, default `null`), preserving `source` through the caching-aware adjustment:

```ts
export function getEffectiveMode(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number,
  combos: NamedCombos = {},
  header: string | null = null
): CompressionMode {
  return resolveBasePlan(config, comboId, estimatedTokens, combos, header).mode as CompressionMode;
}

export function selectCompressionPlan(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number,
  body?: Record<string, unknown>,
  context?: CachingDetectionContext,
  combos: NamedCombos = {},
  header: string | null = null
): DerivedPlan {
  const plan = resolveBasePlan(config, comboId, estimatedTokens, combos, header);
  if (body) {
    const ctx = detectCachingContext(body, context);
    const cacheAware = getCacheAwareStrategy(plan.mode as CompressionMode, ctx);
    return { ...plan, mode: cacheAware.strategy as CompressionMode }; // ...plan preserves source
  }
  return plan;
}

export function selectCompressionStrategy(
  config: CompressionConfig,
  comboId: string | null,
  estimatedTokens: number,
  body?: Record<string, unknown>,
  context?: CachingDetectionContext,
  combos: NamedCombos = {},
  header: string | null = null
): CompressionMode {
  return selectCompressionPlan(config, comboId, estimatedTokens, body, context, combos, header)
    .mode as CompressionMode;
}
```

- [ ] **Step 6: Run the test to verify it passes**

Run: `node --import tsx --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit tests/unit/compression/compression-header-dispatch.test.ts`
Expected: PASS (all cases).

- [ ] **Step 7: Run the full compression suite to confirm no regression**

Run: `node --import tsx --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit "tests/unit/compression/**/*.test.ts"`
Expected: PASS — the existing 774+ compression tests stay green (resolveCompressionPlan / strategySelector / active-combo dispatch unchanged in behavior for header-less callers).

- [ ] **Step 8: Commit**

```bash
git add open-sse/services/compression/deriveDefaultPlan.ts \
        open-sse/services/compression/strategySelector.ts \
        open-sse/services/compression/resolveCompressionPlan.ts \
        tests/unit/compression/compression-header-dispatch.test.ts
git commit -m "feat(compression): header-first resolver + plan source (Phase 3 core)"
```

---

## Task 2: `resolveCompressionHeader` parser

**Files:**
- Modify: `open-sse/handlers/chatCore/headers.ts`
- Test: `tests/unit/chatcore-headers.test.ts`

- [ ] **Step 1: Write the failing test**

Append to `tests/unit/chatcore-headers.test.ts` (keep existing imports; add `resolveCompressionHeader` to the import from `../../open-sse/handlers/chatCore/headers.ts`):

```ts
import { resolveCompressionHeader } from "../../open-sse/handlers/chatCore/headers.ts";
import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("resolveCompressionHeader", () => {
  it("reads the raw value case-insensitively and trims it", () => {
    assert.equal(resolveCompressionHeader({ "x-omniroute-compression": "  engine:rtk " }), "engine:rtk");
    assert.equal(resolveCompressionHeader(new Headers({ "X-OmniRoute-Compression": "off" })), "off");
  });

  it("returns null when absent or blank", () => {
    assert.equal(resolveCompressionHeader({}), null);
    assert.equal(resolveCompressionHeader({ "x-omniroute-compression": "   " }), null);
    assert.equal(resolveCompressionHeader(null), null);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --import tsx --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit tests/unit/chatcore-headers.test.ts`
Expected: FAIL — `resolveCompressionHeader` is not exported.

- [ ] **Step 3: Implement the parser**

Append to `open-sse/handlers/chatCore/headers.ts`:

```ts
/**
 * Per-request compression override via the `x-omniroute-compression` header. Mirrors the
 * `x-omniroute-no-memory` convention (#4290). Returns the raw trimmed value, or null when
 * absent/blank. The resolver (planFromHeader) owns interpretation and casing rules; this
 * helper only reads the wire.
 */
export function resolveCompressionHeader(
  headers: Record<string, unknown> | Headers | null | undefined
): string | null {
  const value = (getHeaderValueCaseInsensitive(headers, "x-omniroute-compression") || "").trim();
  return value || null;
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --import tsx --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit tests/unit/chatcore-headers.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add open-sse/handlers/chatCore/headers.ts tests/unit/chatcore-headers.test.ts
git commit -m "feat(compression): resolveCompressionHeader parser (Phase 3)"
```

---

## Task 3: chatCore wiring + response header

**Files:**
- Modify: `src/shared/constants/headers.ts`
- Modify: `open-sse/handlers/chatCore.ts`

- [ ] **Step 1: Add the response-header name constant**

In `src/shared/constants/headers.ts`, add the `compression` entry to `OMNIROUTE_RESPONSE_HEADERS` (alphabetical, after `cacheHit`):

```ts
  cacheHit: "X-OmniRoute-Cache-Hit",
  compression: "X-OmniRoute-Compression",
  costSaved: "X-OmniRoute-Cost-Saved",
```

- [ ] **Step 2: Import the parser and declare the capture variable**

In `open-sse/handlers/chatCore.ts`, line 7, add `resolveCompressionHeader` to the existing import from `./chatCore/headers.ts`:

```ts
import { getHeaderValueCaseInsensitive, isNoMemoryRequested, resolveCompressionHeader } from "./chatCore/headers.ts";
```

Near the other compression-scoped `let`s (~line 1321, beside `let cavemanOutputModeApplied = false;`), add:

```ts
  let compressionResponseMeta: string | null = null;
```

- [ ] **Step 3: Parse the header and add name keys to the combos map**

In the compression block, replace the `namedCombos` build (~line 1373) so it keys by **both** id and lowercased name, and parse the header right after:

```ts
      let namedCombos: Record<string, CompressionPipelineStep[]> = {};
      try {
        const { listCompressionCombos } = await import("../../src/lib/db/compressionCombos.ts");
        namedCombos = Object.fromEntries(
          listCompressionCombos().flatMap((c) => [
            [c.id, c.pipeline],
            [c.name.toLowerCase(), c.pipeline],
          ])
        );
      } catch (err) {
        log?.debug?.(
          "COMPRESSION",
          "Named combos load skipped: " + (err instanceof Error ? err.message : String(err))
        );
      }
      // Phase 3: per-request override. Unknown values fall through in the resolver (never error).
      const compressionHeader = resolveCompressionHeader(clientRawRequest?.headers ?? null);
      if (compressionHeader) {
        log?.debug?.("COMPRESSION", `x-omniroute-compression header: ${compressionHeader}`);
      }
```

(The active-profile lookup keys on `config.activeComboId`, always a UUID/slug id, so the added name keys are inert for it — one map serves both paths. A combo named `off`/`default` cannot be selected by name because the keyword branches run first; note this in the docs.)

- [ ] **Step 4: Thread the header into both selector calls**

Append `compressionHeader` as the last argument to `selectCompressionStrategy` (~line 1532) and `selectCompressionPlan` (~line 1601):

```ts
      const modeBeforeOutputTransform = selectCompressionStrategy(
        config,
        compressionComboKey,
        estimatedTokens,
        body as Record<string, unknown>,
        { provider, targetFormat, model: effectiveModel },
        namedCombos,
        compressionHeader
      );
```

```ts
      const compressionPlan = selectCompressionPlan(
        config,
        compressionComboKey,
        estimatedTokens,
        compressionInputBody,
        { provider, targetFormat, model: effectiveModel },
        namedCombos,
        compressionHeader
      );
```

- [ ] **Step 5: Capture the resolved meta**

Immediately after `const mode = compressionPlan.mode as CompressionConfig["defaultMode"];` (~line 1609), add (importing `formatCompressionMeta` alongside the other strategySelector imports destructured at ~line 1349):

```ts
      compressionResponseMeta = formatCompressionMeta(compressionPlan);
```

And add `formatCompressionMeta` to the destructured import from `../services/compression/strategySelector.ts` (~line 1349):

```ts
        formatCompressionMeta,
```

- [ ] **Step 6: Emit the response header at both build sites**

In the non-streaming JSON path, right after the `attachOmniRouteMetaHeaders(responseHeaders, { ... });` call (~line 4582), add:

```ts
    if (compressionResponseMeta) {
      responseHeaders[OMNIROUTE_RESPONSE_HEADERS.compression] = compressionResponseMeta;
    }
```

In the streaming path, right after the `responseHeaders` object literal closes (the `};` after `"x-omniroute-request-id": pendingRequestId,`, ~line 4708), add:

```ts
  if (compressionResponseMeta) {
    responseHeaders[OMNIROUTE_RESPONSE_HEADERS.compression] = compressionResponseMeta;
  }
```

- [ ] **Step 7: Typecheck + cycle/source guard**

Run: `npm run typecheck:core`
Expected: exit 0.

Run: `npm run check:cycles`
Expected: exit 0 — the resolver still has no `src/lib/db` import (header logic lives in `strategySelector.ts`, name-key map built in chatCore).

- [ ] **Step 8: Run the compression suite again (no regression from wiring)**

Run: `node --import tsx --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit "tests/unit/compression/**/*.test.ts"`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add src/shared/constants/headers.ts open-sse/handlers/chatCore.ts
git commit -m "feat(compression): wire x-omniroute-compression header + response header (Phase 3)"
```

---

## Task 4: Docs + file-size + full validation

**Files:**
- Modify: `docs/reference/API_REFERENCE.md`
- Modify: `docs/compression/COMPRESSION_GUIDE.md`
- Modify (if needed): `config/quality/file-size-baseline.json`

- [ ] **Step 1: Document the header (API reference)**

In `docs/reference/API_REFERENCE.md`, near the `x-omniroute-no-memory` documentation, add a section:

````markdown
### `x-omniroute-compression`

Per-request override of the compression plan. Highest precedence — beats the routing-combo
override, the active profile, auto-trigger, and the panel Default. Values:

| Value | Effect |
|-------|--------|
| `off` | No compression for this request. |
| `default` | The panel-derived Default profile (ignores the active profile). |
| `engine:<id>` | A single engine when enabled, e.g. `engine:rtk`. |
| `<combo>` | A named combo, matched by name (case-insensitive) first, then by id. |

Unknown values are ignored (the request is never rejected). The applied plan is echoed in the
`X-OmniRoute-Compression: <mode>; source=<source>` response header. The master compression
switch is a hard gate: when compression is disabled globally, this header cannot enable it.
````

- [ ] **Step 2: Document the header (compression guide)**

In `docs/compression/COMPRESSION_GUIDE.md`, add a short "Per-request override" subsection mirroring the table above (one paragraph + the value table). Keep all angle-bracket tokens (`engine:<id>`, `<combo>`, `<mode>`, `<source>`) inside backticks or fenced blocks (the docs are MDX-compiled).

- [ ] **Step 3: Validate MDX**

Run: `npx fumadocs-mdx`
Expected: `[MDX] generated files in ...ms` with no error.

- [ ] **Step 4: Reconcile the file-size baseline if chatCore crossed its pin**

Run: `npm run check:file-size`
Expected: PASS. If it reports `chatCore.ts: <actual> > <frozen>`, update `config/quality/file-size-baseline.json`: set the `open-sse/handlers/chatCore.ts` frozen value to the reported `<actual>` and add a justification key:

```json
  "_rebaseline_2026_06_21_phase3_request_header": "Compression Phase 3 (x-omniroute-compression per-request header) own growth: chatCore.ts <frozen>-><actual> at the existing compression-dispatch chokepoint — parse the header (resolveCompressionHeader), add lowercased-name keys to the namedCombos map, thread it as the new last arg to selectCompressionStrategy + selectCompressionPlan, capture formatCompressionMeta(compressionPlan) into compressionResponseMeta, and emit X-OmniRoute-Compression at the two response-header build sites. The resolver stays pure (planFromHeader + source live in open-sse/services/compression/strategySelector.ts, <cap). Cohesive wiring at the existing chokepoint, mirroring the Phase 2 rebaseline; not extractable without hiding the dispatch boundary. Structural shrink of chatCore.ts tracked in #3501. Covered by tests/unit/compression/compression-header-dispatch.test.ts + tests/unit/chatcore-headers.test.ts.",
```

- [ ] **Step 5: Run the full validation suite**

Run each and confirm exit 0 / green:
- `npm run typecheck:core`
- `npm run lint`
- `npm run check:cycles`
- `npm run check:file-size`
- `node --import tsx --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit "tests/unit/compression/**/*.test.ts"` (compression subset) and `tests/unit/chatcore-headers.test.ts`
- `npm run test:unit` (full unit suite — confirms no cross-suite regression)

Expected: all green. Fix any red before proceeding (do not weaken assertions to pass).

- [ ] **Step 6: Commit**

```bash
git add docs/reference/API_REFERENCE.md docs/compression/COMPRESSION_GUIDE.md config/quality/file-size-baseline.json
git commit -m "docs(compression): document x-omniroute-compression header + file-size reconcile (Phase 3)"
```

---

## Self-Review (run by the author after writing)

**1. Spec coverage**
- §2 contract (off/default/engine/combo, unknown→ignore) → Task 1 `planFromHeader` + tests. ✓
- Decision A (name-first combo) → Task 1 `planFromHeader` `combos[lower] ?? combos[h]` + Task 3 name-key map + test. ✓
- Decision B (bypass auto-trigger) → Task 1 header-first in `resolveBasePlan` + test. ✓
- §3.1 precedence (header at top) → Task 1 + precedence tests (beats active profile, routing override). ✓
- §3.2 `source` on `DerivedPlan` → Task 1 `CompressionSource` + `withSource` + tests. ✓
- §3.3 parser → Task 2. ✓
- §3.4 threading + id+name map → Task 1 (signatures) + Task 3 (chatCore). ✓
- §4 response header → Task 3 (constant + two sites) + `formatCompressionMeta` test. ✓
- §5 error handling (unknown→fall-through; disabled engine→fall-through; unconditional gating; master-off boundary) → Task 1 tests. ✓
- §7 testing (parser, resolver, precedence, source guard) → Tasks 1, 2; source guard via `check:cycles` in Task 3/4. ✓
- §8 scope (no bare modes, no UI, chat-only) → respected; `planFromHeader` rejects bare mode names (they fall through), no UI/non-chat files touched. ✓

**2. Placeholder scan:** none — every code step shows full code; commands have expected output.

**3. Type consistency:** `DerivedPlan`/`CompressionSource` defined in Task 1 Step 3, imported in Step 5; `planFromHeader(config, header, combos)` / `formatCompressionMeta(plan)` signatures identical across Task 1 tests, implementation, and Task 3 usage; `resolveCompressionHeader(headers)` identical in Task 2 and Task 3; `header` appended as the same final positional arg in `getEffectiveMode`/`selectCompressionPlan`/`selectCompressionStrategy`. ✓

**Note for the implementer:** `typecheck:core`, `check:cycles`, `check:file-size`, and `lint` are existing `package.json` scripts. There is **no** `test:compression` script — run the compression subset directly with the node test runner (`node --import tsx --import ./open-sse/utils/setupPolyfill.ts --import ./tests/_setup/isolateDataDir.ts --test --test-force-exit "tests/unit/compression/**/*.test.ts"`), or run the whole unit suite with `npm run test:unit`. Confirm any other script name in `package.json` before running.
