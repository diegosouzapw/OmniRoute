/**
 * Issue #5172 / #5160 / #5152 — server OOM ("Ineffective mark-compacts near heap
 * limit ... ~500MB") on machines with plenty of RAM. Root cause: the server was
 * spawned with a FIXED 512MB heap default (`omniroute serve`) or with no
 * `--max-old-space-size` at all (Electron), so a 16GB box with 65 providers /
 * 2600 models still crashed at ~512MB.
 *
 * Fix: `calibrateHeapFallbackMb(totalmemBytes)` derives a sane default heap from
 * the host's physical RAM (~35%, clamped to [512, 4096]) so the out-of-the-box
 * ceiling scales with the machine. An explicit `OMNIROUTE_MEMORY_MB` still wins
 * (resolveMaxOldSpaceMb), and the existing #2939 contract is unchanged.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { calibrateHeapFallbackMb, resolveMaxOldSpaceMb } =
  await import("../../scripts/build/runtime-env.mjs");

const GB = 1024 * 1024 * 1024;

test("#5172 calibrates the default heap to ~35% of physical RAM", () => {
  // 8GB → 8192 * 0.35 ≈ 2867
  assert.equal(calibrateHeapFallbackMb(8 * GB), 2867);
  // 4GB → floor(4096 * 0.35) = 1433
  assert.equal(calibrateHeapFallbackMb(4 * GB), 1433);
});

test("#5172 clamps the calibrated default to [512, 4096]", () => {
  // 16GB → 5734 → clamped to the 4096 ceiling (the reporter's box)
  assert.equal(calibrateHeapFallbackMb(16 * GB), 4096);
  assert.equal(calibrateHeapFallbackMb(64 * GB), 4096);
  // 1GB → 358 → floored to 512
  assert.equal(calibrateHeapFallbackMb(1 * GB), 512);
});

test("#5172 falls back to 512 for missing/invalid totalmem", () => {
  assert.equal(calibrateHeapFallbackMb(0), 512);
  assert.equal(calibrateHeapFallbackMb(undefined), 512);
  assert.equal(calibrateHeapFallbackMb(null), 512);
  assert.equal(calibrateHeapFallbackMb(NaN), 512);
  assert.equal(calibrateHeapFallbackMb(-1), 512);
});

test("#5172 an explicit OMNIROUTE_MEMORY_MB still wins over the calibrated default", () => {
  const calibrated = calibrateHeapFallbackMb(16 * GB); // 4096
  // explicit override (in-range) is honored verbatim, not the calibrated default
  assert.equal(resolveMaxOldSpaceMb("1536", calibrated), 1536);
  // unset → the calibrated default is used (not the old fixed 512)
  assert.equal(resolveMaxOldSpaceMb(undefined, calibrated), 4096);
});
