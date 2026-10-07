// tests/unit/build/postinstall-rebuild-timeout-scope.test.ts
//
// Regression guard for a scope bug in scripts/build/postinstall.mjs.
//
// `fixBetterSqliteBinary()` falls back to `npm rebuild better-sqlite3` with a
// timeout. Its catch block distinguishes a timeout from an ordinary failure and
// reports the limit — 600s on Android/Termux, 300s elsewhere — by reading
// `isAndroid`. That constant used to be declared with `const` INSIDE the try
// block, so it was not in scope in the catch:
//
//     try {
//       const isAndroid = ...;        // block-scoped to the try
//       execSync(rebuildCmd, { timeout: isAndroid ? 600_000 : 300_000 });
//     } catch (err) {
//       if (err.killed) {
//         const secs = isAndroid ? 600 : 300;   // ReferenceError
//
// The consequence was worse than a wrong number. postinstall.mjs is a top-level
// await module, so the ReferenceError escaped the catch, rejected module
// evaluation, and failed the whole `npm install` — on the exact path that exists
// to print manual-fix instructions when a machine has no C++ toolchain. The user
// saw a stack trace instead of the guidance.
//
// This test reads the source rather than importing it: postinstall.mjs performs
// its work at module scope, so importing it would run the real postinstall
// (spawning npm, touching ~/.omniroute) as a side effect of the test.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const SOURCE = fs.readFileSync(
  new URL("../../../scripts/build/postinstall.mjs", import.meta.url),
  "utf8"
);

test("postinstall: isAndroid is declared exactly once", () => {
  const matches = SOURCE.match(/const isAndroid\s*=/g) ?? [];
  assert.equal(
    matches.length,
    1,
    "expected a single isAndroid declaration; a duplicate would reintroduce shadowing"
  );
});

test("postinstall: isAndroid is declared OUTSIDE the npm-rebuild try block", () => {
  const declIdx = SOURCE.indexOf("const isAndroid =");
  assert.notEqual(declIdx, -1, "isAndroid declaration not found");

  // Anchor on a line that is unambiguously inside the try block.
  const insideTryIdx = SOURCE.indexOf("const rebuildCmd = isAndroid");
  assert.notEqual(insideTryIdx, -1, "rebuildCmd assignment not found");

  const tryIdx = SOURCE.lastIndexOf("try {", insideTryIdx);
  assert.notEqual(tryIdx, -1, "enclosing try block not found");

  assert.ok(
    declIdx < tryIdx,
    "isAndroid must be declared before the try block, otherwise the catch below " +
      "throws ReferenceError on the rebuild-timeout path and fails npm install"
  );
});

test("postinstall: the rebuild catch block still reports the timeout it used", () => {
  const catchIdx = SOURCE.indexOf("npm rebuild timed out");
  assert.notEqual(catchIdx, -1, "the timeout warning was removed");

  const window = SOURCE.slice(catchIdx - 400, catchIdx);
  assert.match(
    window,
    /isAndroid \? 600 : 300/,
    "the catch should still pick the reported timeout from isAndroid"
  );
});

test("postinstall: the rebuild failure path stays non-fatal", () => {
  // The whole point of the catch is to fall through to the manual-fix hints.
  assert.match(
    SOURCE,
    /Could not fix better-sqlite3 native module automatically/,
    "the manual-fix guidance must remain reachable after a failed rebuild"
  );
});
