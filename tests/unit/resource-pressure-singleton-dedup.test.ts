/**
 * Issue #13621 dedup guard.
 *
 * The packaged Turbopack build compiles `open-sse/utils/resourcePressure.ts`
 * once per entry graph: the relative specifier used inside `open-sse/` and the
 * `@omniroute/open-sse/utils/resourcePressure.ts` alias used from `src/` are
 * distinct modules to the bundler (module ids 7186 vs 51118 in the
 * 2026-10-09 `.build/next` evidence). Before the fix, each compiled copy owned
 * a private `defaultRuntime` singleton, so a runtime reload through one copy
 * left every other copy serving a stale one.
 *
 * The fix keys the singleton on `globalThis` via `Symbol.for` — the same
 * technique already proven in `open-sse/utils/proxyRefusalMemory.ts`
 * (duplicate-copy alarm) and `open-sse/utils/providerRequestLogging.ts`
 * (shared capture state).
 *
 * This test forces two evaluations of the module in one process (static import
 * + query-suffixed dynamic import) and asserts both copies observe the same
 * live runtime.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import {
  createResourcePressureRuntime,
  getResourcePressureObservation,
  reloadResourcePressureRuntime,
} from "../../open-sse/utils/resourcePressure.ts";

const RUNTIME_KEY = Symbol.for("omniroute.resourcePressure.runtime");

type ResourcePressureModuleCopy = {
  createResourcePressureRuntime: typeof createResourcePressureRuntime;
  reloadResourcePressureRuntime: typeof reloadResourcePressureRuntime;
};

type RuntimeInstance = ReturnType<typeof createResourcePressureRuntime>;

const SECOND_EVAL_SPECIFIER = "../../open-sse/utils/resourcePressure.ts?secondevaluation";

function readHolder(): unknown {
  // Symbol-keyed globalThis indexing needs the cast (mirror of the
  // proxyRefusalMemory holder idiom).
  const holder = globalThis as unknown as { [RUNTIME_KEY]?: unknown };
  return holder[RUNTIME_KEY];
}

function isResourcePressureModuleCopy(value: unknown): value is ResourcePressureModuleCopy {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as {
    createResourcePressureRuntime?: unknown;
    reloadResourcePressureRuntime?: unknown;
  };
  return (
    typeof candidate.createResourcePressureRuntime === "function" &&
    typeof candidate.reloadResourcePressureRuntime === "function"
  );
}

test("resourcePressure singleton is shared across duplicated module copies", async () => {
  const observationBefore = getResourcePressureObservation();

  let secondCopyUnknown: unknown = null;
  try {
    // Query suffix makes the specifier a distinct module URL for the loader;
    // the import stays dynamic so it is never hoisted into the static import
    // above.
    secondCopyUnknown = await import(SECOND_EVAL_SPECIFIER);
  } catch {
    // Some loaders refuse query suffixes on file specifiers; treated as "no
    // second evaluation possible" via the fallback below.
  }
  const secondCopy = isResourcePressureModuleCopy(secondCopyUnknown) ? secondCopyUnknown : null;

  // (a) After importing both copies, the process-wide holder must be defined.
  assert.notEqual(
    readHolder(),
    undefined,
    "Symbol.for holder must expose the shared runtime after both copies load"
  );

  if (secondCopy === null) return;
  if (secondCopy.createResourcePressureRuntime === createResourcePressureRuntime) {
    // The loader deduped the query-suffixed specifier (only one evaluation in
    // this process), so the cross-copy identity assertion below would be
    // vacuous: a shared module reloading itself would legitimately flip its
    // own captured variable even before the fix. The production duplication
    // is proven by the .build/next module-id evidence in issue #13621; the
    // holder assertion above plus the source pattern guard below pin the fix.
    return;
  }

  // (b) Reload through copy 2 and confirm copy 1 observes the reloaded
  // runtime: with the fix copy 1 reads the holder, so the observed `state`
  // object identity changes; without the fix each copy keeps its own runtime
  // and the identity stays put (the RED failure mode).
  secondCopy.reloadResourcePressureRuntime();
  const observationAfter = getResourcePressureObservation();
  assert.notStrictEqual(
    observationAfter.state,
    observationBefore.state,
    "copy 1 observation must reflect the runtime that copy 2 reloaded"
  );
});

// Deterministic counterpart to the loader-dependent test above: swapping the
// holder for a freshly built runtime must be observable through the public
// readers. A module copy that served its own captured `defaultRuntime` would
// return that copy's state and fail here — independent of whether the loader
// ever produces a second module instance.
test("reads resolve the runtime through the globalThis holder, not a captured copy", () => {
  const holder = globalThis as unknown as { [RUNTIME_KEY]?: RuntimeInstance };
  const previous = holder[RUNTIME_KEY];
  const replacement = createResourcePressureRuntime();
  try {
    holder[RUNTIME_KEY] = replacement;
    assert.strictEqual(
      getResourcePressureObservation().state,
      replacement.getObservation().state,
      "getResourcePressureObservation must read the runtime through the globalThis holder"
    );
  } finally {
    if (previous === undefined) {
      delete holder[RUNTIME_KEY];
    } else {
      holder[RUNTIME_KEY] = previous;
    }
    replacement.dispose();
  }
});

// Regression for the reload path: whichever runtime the holder currently
// serves is the one being superseded, so it must be disposed even when another
// module copy created it. The old guard (`dispose only if this copy's runtime
// is the holder`) left the holder's background driver running forever whenever
// a different copy had reloaded last.
test("reload disposes the holder's runtime even when another copy created it", () => {
  const holder = globalThis as unknown as { [RUNTIME_KEY]?: RuntimeInstance };
  const previous = holder[RUNTIME_KEY];
  const foreign = createResourcePressureRuntime();
  let disposed = 0;
  const originalDispose = foreign.dispose.bind(foreign);
  foreign.dispose = () => {
    disposed += 1;
    originalDispose();
  };

  try {
    holder[RUNTIME_KEY] = foreign;
    reloadResourcePressureRuntime();
    assert.equal(disposed, 1, "the superseded holder runtime must be disposed exactly once");
    // The reload rebound the module's private `defaultRuntime` to the runtime it
    // just installed. That runtime is deliberately left undisposed: disposing it
    // would leave the `?? defaultRuntime` fallback serving a disposed runtime
    // once the holder is restored below.
  } finally {
    if (previous === undefined) {
      delete holder[RUNTIME_KEY];
    } else {
      holder[RUNTIME_KEY] = previous;
    }
  }
});

test("resourcePressure source keys its singleton via Symbol.for", () => {
  // (c) Cheap pattern guard: the singleton must be globalThis-keyed, not a
  // bare module-level variable (which is what allowed the 7186/51118 split).
  const source = readFileSync(
    new URL("../../open-sse/utils/resourcePressure.ts", import.meta.url),
    "utf8"
  );
  assert.ok(
    source.includes('Symbol.for("omniroute.resourcePressure.runtime")'),
    "resourcePressure.ts must key its runtime on a Symbol.for globalThis holder"
  );
});
