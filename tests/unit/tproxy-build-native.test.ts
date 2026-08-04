/**
 * Best-effort build of the TPROXY IP_TRANSPARENT native addon (build 4e/N). It
 * runs at production-build time so assembleStandalone can copy transparent.node
 * into the standalone bundle. IP_TRANSPARENT is Linux-only and a missing toolchain
 * is NOT fatal (the capture mode degrades gracefully), so the decision logic must
 * skip cleanly off-Linux / when sources are absent / when node-gyp fails. All
 * effectful seams (platform/run/exists) are injected.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { buildTproxyNative } from "../../scripts/build/build-tproxy-native.mjs";

const ROOT = "/repo";
const NATIVE = path.join(ROOT, "src", "mitm", "tproxy", "native");
const GYP = path.join(NATIVE, "binding.gyp");
const OUT = path.join(NATIVE, "build", "Release", "transparent.node");

test("skips (no-op) on non-Linux hosts and runs nothing", () => {
  let ran = false;
  const res = buildTproxyNative(ROOT, {
    platform: "darwin",
    run: () => {
      ran = true;
    },
    exists: () => true,
  });
  assert.equal(res.built, false);
  assert.match(res.reason ?? "", /linux/i);
  assert.equal(ran, false);
});

test("skips when the native sources are absent (binding.gyp missing)", () => {
  let ran = false;
  const res = buildTproxyNative(ROOT, {
    platform: "linux",
    run: () => {
      ran = true;
    },
    exists: (p) => p !== GYP,
  });
  assert.equal(res.built, false);
  assert.match(res.reason ?? "", /sources absent|binding\.gyp/i);
  assert.equal(ran, false);
});

test("builds via node-gyp rebuild in the native dir and reports success", () => {
  const calls = [];
  const res = buildTproxyNative(ROOT, {
    platform: "linux",
    run: (cmd, args, cwd) => calls.push({ cmd, args, cwd }),
    exists: (p) => p === GYP || p === OUT,
  });
  assert.equal(res.built, true);
  assert.deepEqual(calls, [{ cmd: "npx", args: ["--yes", "node-gyp", "rebuild"], cwd: NATIVE }]);
});

test("a node-gyp / toolchain failure is non-fatal (built:false with a reason)", () => {
  const res = buildTproxyNative(ROOT, {
    platform: "linux",
    run: () => {
      throw new Error("gyp ERR! not found: make");
    },
    exists: (p) => p === GYP,
  });
  assert.equal(res.built, false);
  assert.match(res.reason ?? "", /toolchain|build failed|make/i);
});

test("reports failure when node-gyp produced no transparent.node", () => {
  const res = buildTproxyNative(ROOT, {
    platform: "linux",
    run: () => {},
    exists: (p) => p === GYP, // OUT never appears
  });
  assert.equal(res.built, false);
  assert.match(res.reason ?? "", /no transparent\.node|produced/i);
});
