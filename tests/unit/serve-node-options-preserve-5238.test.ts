/**
 * Issue #5238 (Defect C) — `omniroute serve` silently DISCARDED a user-set
 * `NODE_OPTIONS=--max-old-space-size=…`. The serve command spread `process.env`
 * then UNCONDITIONALLY overwrote NODE_OPTIONS with the calibrated default, so a
 * user who exported `NODE_OPTIONS=--max-old-space-size=8192` still ran at the
 * calibrated/old default and OOM'd (reporter: set 8192, crashed at ~505 MB).
 *
 * The fix mirrors the Electron (electron/main.js) and standalone
 * (scripts/dev/run-standalone.mjs) launchers: preserve a user-set heap flag,
 * otherwise APPEND the calibrated value (keeping unrelated flags intact). It
 * also gates the explicit `node --max-old-space-size` CLI arg so it never
 * shadows the user's NODE_OPTIONS value.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { buildServerNodeOptions, buildNodeHeapArgs, envHasExplicitHeapFlag } =
  await import("../../scripts/build/runtime-env.mjs");

const HEAP_RE = /--max-old-space-size=(\d+)/g;
function heapValues(nodeOptions: string): string[] {
  return [...nodeOptions.matchAll(HEAP_RE)].map((m) => m[1]);
}

test("#5238 case 1: user-set NODE_OPTIONS heap wins, no second/calibrated flag injected", () => {
  const env = { NODE_OPTIONS: "--max-old-space-size=8192" };
  // memoryLimit here would be the calibrated default the OLD code forced in.
  const result = buildServerNodeOptions(env, 512);

  const values = heapValues(result);
  assert.deepEqual(values, ["8192"], "exactly one heap flag, the user's 8192");
  assert.ok(!values.includes("512"), "calibrated 512 must NOT be present");
  // CLI arg path must also not re-inject a conflicting/shadowing flag.
  assert.deepEqual(
    buildNodeHeapArgs(env, 512),
    [],
    "no explicit CLI --max-old-space-size when user pinned NODE_OPTIONS"
  );
});

test("#5238 case 2: no NODE_OPTIONS → calibrated value applied", () => {
  const result = buildServerNodeOptions({}, 2048);
  assert.equal(result, "--max-old-space-size=2048");
  assert.deepEqual(heapValues(result), ["2048"]);
  assert.deepEqual(buildNodeHeapArgs({}, 2048), ["--max-old-space-size=2048"]);
});

test("#5238 case 3: unrelated pre-existing flag preserved when heap is appended", () => {
  const env = { NODE_OPTIONS: "--enable-source-maps" };
  const result = buildServerNodeOptions(env, 2048);
  assert.ok(result.includes("--enable-source-maps"), "unrelated flag preserved");
  assert.deepEqual(heapValues(result), ["2048"], "calibrated heap appended once");
  assert.equal(result, "--enable-source-maps --max-old-space-size=2048");
});

test("#5238 case 4: user heap flag + unrelated flag both preserved, no override", () => {
  const env = { NODE_OPTIONS: "--enable-source-maps --max-old-space-size=8192" };
  const result = buildServerNodeOptions(env, 512);
  assert.ok(result.includes("--enable-source-maps"), "unrelated flag preserved");
  assert.deepEqual(heapValues(result), ["8192"], "user heap preserved, calibrated NOT added");
  assert.equal(result, env.NODE_OPTIONS, "returned as-is");
  assert.deepEqual(buildNodeHeapArgs(env, 512), [], "no shadowing CLI arg");
});

test("#5238 envHasExplicitHeapFlag detects a user-pinned heap", () => {
  assert.equal(envHasExplicitHeapFlag({ NODE_OPTIONS: "--max-old-space-size=4096" }), true);
  assert.equal(envHasExplicitHeapFlag({ NODE_OPTIONS: "--enable-source-maps" }), false);
  assert.equal(envHasExplicitHeapFlag({}), false);
  assert.equal(envHasExplicitHeapFlag(undefined), false);
});
