/**
 * getBestVisionModel() rescans the whole catalog on every call once no
 * candidate is usable.
 *
 * A successful pick is cached in `selectionCache`, but a `null` outcome never
 * was. `getVisionCapableModels()` walks every provider in PROVIDER_MODELS and
 * issues a credential lookup per candidate, on the request path, so an install
 * that sends images with no usable describer repeats that scan for every image
 * of every request. It cannot succeed until credentials change, so repeating
 * it buys nothing.
 *
 * These cover the negative cache: the scan runs once, is skipped while the
 * entry is live, resumes when it expires, and is dropped the moment a
 * candidate becomes usable again.
 */
import test from "node:test";
import assert from "node:assert/strict";

process.env.DATA_DIR = `/tmp/omniroute-test-vision-negative-cache-${Date.now()}`;

const { getBestVisionModel, clearSelectionCache } = await import(
  "../../src/lib/guardrails/visionBridgeRouter.ts"
);

/** Counts credential lookups, which is one scan's worth of work per call. */
function countingDeps(usable: boolean | null) {
  const calls: string[] = [];
  return {
    calls,
    deps: {
      hasUsableCredentials: async (model: string) => {
        calls.push(model);
        return usable;
      },
    },
  };
}

test("a no-candidate outcome is scanned once, not once per call", async () => {
  clearSelectionCache();
  const { calls, deps } = countingDeps(false);

  assert.equal(await getBestVisionModel({}, deps), null);
  const afterFirst = calls.length;
  assert.ok(afterFirst > 0, "first call must actually scan");

  assert.equal(await getBestVisionModel({}, deps), null);
  assert.equal(await getBestVisionModel({}, deps), null);

  assert.equal(
    calls.length,
    afterFirst,
    `expected the scan to run once, ran again for ${calls.length - afterFirst} more lookups`
  );
});

test("noCandidateCacheTtlMs: 0 restores the rescan-every-call behaviour", async () => {
  clearSelectionCache();
  const { calls, deps } = countingDeps(false);

  assert.equal(await getBestVisionModel({ noCandidateCacheTtlMs: 0 }, deps), null);
  const afterFirst = calls.length;
  assert.equal(await getBestVisionModel({ noCandidateCacheTtlMs: 0 }, deps), null);

  assert.equal(calls.length, afterFirst * 2, "disabled cache must scan every call");
});

test("the scan resumes once the entry expires", async () => {
  clearSelectionCache();
  const { calls, deps } = countingDeps(false);

  assert.equal(await getBestVisionModel({ noCandidateCacheTtlMs: 1 }, deps), null);
  const afterFirst = calls.length;

  await new Promise((resolve) => setTimeout(resolve, 5));

  assert.equal(await getBestVisionModel({ noCandidateCacheTtlMs: 1 }, deps), null);
  assert.ok(calls.length > afterFirst, "an expired entry must not suppress the scan");
});

test("a usable candidate is still found after a cached failure expires", async () => {
  clearSelectionCache();

  const failing = countingDeps(false);
  assert.equal(await getBestVisionModel({ noCandidateCacheTtlMs: 1 }, failing.deps), null);

  await new Promise((resolve) => setTimeout(resolve, 5));

  const working = countingDeps(true);
  const picked = await getBestVisionModel({ noCandidateCacheTtlMs: 1 }, working.deps);
  assert.ok(
    typeof picked === "string" && picked.length > 0,
    `expected a model once credentials work, got ${JSON.stringify(picked)}`
  );
});

test("excludedModels keep their own negative entry", async () => {
  clearSelectionCache();
  const { calls, deps } = countingDeps(false);

  assert.equal(await getBestVisionModel({}, deps), null);
  const afterDefault = calls.length;

  assert.equal(await getBestVisionModel({ excludedModels: ["openai/gpt-4o-mini"] }, deps), null);
  assert.ok(calls.length > afterDefault, "a distinct config must not reuse another key's entry");
});
