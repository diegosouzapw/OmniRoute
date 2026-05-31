/**
 * Issue #2939 — random OOM in Docker. The standalone launcher
 * (`scripts/dev/run-standalone.mjs`, the Docker CMD) must honor
 * OMNIROUTE_MEMORY_MB instead of relying only on the image-level NODE_OPTIONS
 * fallback, so Docker users can raise the server heap under load / large
 * SQLite DBs.
 *
 * `resolveMaxOldSpaceMb` is the shared heap-ceiling resolver the launcher now
 * uses (mirroring `omniroute serve`): OMNIROUTE_MEMORY_MB clamped to [64, 16384],
 * default 512.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { resolveMaxOldSpaceMb } = await import("../../scripts/build/runtime-env.mjs");

test("#2939 default is 512 when unset/invalid", () => {
  assert.equal(resolveMaxOldSpaceMb(undefined), 512);
  assert.equal(resolveMaxOldSpaceMb(null), 512);
  assert.equal(resolveMaxOldSpaceMb(""), 512);
  assert.equal(resolveMaxOldSpaceMb("abc"), 512);
});

test("#2939 honors a valid OMNIROUTE_MEMORY_MB (string or number)", () => {
  assert.equal(resolveMaxOldSpaceMb("1024"), 1024);
  assert.equal(resolveMaxOldSpaceMb(2048), 2048);
  assert.equal(resolveMaxOldSpaceMb("256"), 256);
});

test("#2939 clamps out-of-range values to the default", () => {
  assert.equal(resolveMaxOldSpaceMb("32"), 512, "below 64 → default");
  assert.equal(resolveMaxOldSpaceMb("99999"), 512, "above 16384 → default");
  assert.equal(resolveMaxOldSpaceMb("64"), 64, "lower bound inclusive");
  assert.equal(resolveMaxOldSpaceMb("16384"), 16384, "upper bound inclusive");
});

test("#2939 a custom fallback is respected", () => {
  assert.equal(resolveMaxOldSpaceMb(undefined, 1024), 1024);
});
