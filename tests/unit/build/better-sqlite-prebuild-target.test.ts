// tests/unit/build/better-sqlite-prebuild-target.test.ts
//
// Regression/coverage guard for scripts/build/betterSqlitePrebuildTarget.mjs
// (extracted out of scripts/build/postinstall.mjs — #12961 review, Hard Rule
// #8). Covers the glibc/musl/Android target-string resolution and, via a
// source-text check, the fixed candidate resolution order in
// postinstall.mjs's fixBetterSqliteBinary().
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

import { getBetterSqlitePrebuildTarget } from "../../../scripts/build/betterSqlitePrebuildTarget.mjs";

test("getBetterSqlitePrebuildTarget: glibc Linux resolves to the plain linux target", () => {
  const target = getBetterSqlitePrebuildTarget({
    platform: "linux",
    arch: "x64",
    env: {},
    detectLibc: () => "gnu",
  });
  assert.equal(target, "linux-x64");
});

test("getBetterSqlitePrebuildTarget: musl Linux (Alpine) resolves to the linuxmusl target", () => {
  const target = getBetterSqlitePrebuildTarget({
    platform: "linux",
    arch: "x64",
    env: {},
    detectLibc: () => "musl",
  });
  assert.equal(target, "linuxmusl-x64");
});

test("getBetterSqlitePrebuildTarget: musl detection failure falls back to plain linux target", () => {
  const target = getBetterSqlitePrebuildTarget({
    platform: "linux",
    arch: "arm64",
    env: {},
    detectLibc: () => {
      throw new Error("ldd unavailable");
    },
  });
  assert.equal(target, "linux-arm64");
});

test("getBetterSqlitePrebuildTarget: Termux/Android is detected ahead of the host platform", () => {
  const target = getBetterSqlitePrebuildTarget({
    platform: "linux",
    arch: "arm64",
    env: { TERMUX_VERSION: "0.118" },
    detectLibc: () => {
      throw new Error("must not be called for android");
    },
  });
  assert.equal(target, "android-arm64");
});

test("getBetterSqlitePrebuildTarget: non-Linux platforms skip libc detection entirely", () => {
  let called = false;
  const target = getBetterSqlitePrebuildTarget({
    platform: "darwin",
    arch: "arm64",
    env: {},
    detectLibc: () => {
      called = true;
      return "gnu";
    },
  });
  assert.equal(target, "darwin-arm64");
  assert.equal(called, false, "detectLibc must not run for a non-Linux platform");
});

// postinstall.mjs performs its work via top-level `await` on import, so
// importing it here would run the real postinstall flow (spawn npm, touch
// ~/.omniroute) as a side effect — same constraint documented in
// tests/unit/build/postinstall-rebuild-timeout-scope.test.ts. Read the
// source instead to pin the 4-candidate resolution order.
const POSTINSTALL_SOURCE = fs.readFileSync(
  new URL("../../../scripts/build/postinstall.mjs", import.meta.url),
  "utf8"
);

test("postinstall: fixBetterSqliteBinary resolves candidates in bundled-build, bundled-prebuild, root-build, root-prebuild order", () => {
  const candidatesIdx = POSTINSTALL_SOURCE.indexOf("const candidates = [");
  assert.notEqual(candidatesIdx, -1, "candidates array not found");

  const closeIdx = POSTINSTALL_SOURCE.indexOf("];", candidatesIdx);
  assert.notEqual(closeIdx, -1, "candidates array close bracket not found");

  const block = POSTINSTALL_SOURCE.slice(candidatesIdx, closeIdx);
  const labelOrder = [...block.matchAll(/label:\s*"([^"]+)"/g)].map((m) => m[1]);

  assert.deepEqual(labelOrder, [
    "bundled app build binary",
    "bundled app prebuild binary",
    "root node_modules build binary",
    "root node_modules prebuild binary",
  ]);
});

test("postinstall: getBetterSqlitePrebuildTarget is imported from the extracted module, not redefined locally", () => {
  assert.match(
    POSTINSTALL_SOURCE,
    /import\s*\{\s*getBetterSqlitePrebuildTarget\s*\}\s*from\s*"\.\/betterSqlitePrebuildTarget\.mjs"/,
    "postinstall.mjs must import the pure resolver instead of duplicating its logic"
  );
  assert.doesNotMatch(
    POSTINSTALL_SOURCE,
    /function getBetterSqlitePrebuildTarget\(/,
    "the resolver must not be re-declared locally in postinstall.mjs"
  );
});
