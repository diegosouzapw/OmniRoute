import assert from "node:assert/strict";
import test from "node:test";

import {
  getPagerCorruption,
  isSqlitePagerCorruptError,
  notePagerCorruption,
  resetPagerCorruption,
} from "../../../src/lib/db/healthCheck.ts";
import {
  handleCallLogRotateError,
  isCallLogRotatePaused,
  resetCallLogRotateFence,
} from "../../../src/lib/usage/callLogRotation.ts";

test("isSqlitePagerCorruptError matches SQLITE_CORRUPT and malformed pager errors", () => {
  assert.equal(isSqlitePagerCorruptError({ code: "SQLITE_CORRUPT", message: "x" }), true);
  assert.equal(
    isSqlitePagerCorruptError(new Error("database disk image is malformed")),
    true
  );
  assert.equal(isSqlitePagerCorruptError(new Error("SQLITE_IOERR")), true);
  assert.equal(isSqlitePagerCorruptError(new Error("simulated opendir failure")), false);
});

test("notePagerCorruption surfaces on the next health check snapshot", () => {
  resetPagerCorruption();
  notePagerCorruption("call-log-rotate", { code: "SQLITE_CORRUPT", message: "malformed" });
  const noted = getPagerCorruption();
  assert.ok(noted);
  assert.equal(noted.source, "call-log-rotate");
  assert.match(noted.message, /malformed|SQLITE_CORRUPT/);
  resetPagerCorruption();
  assert.equal(getPagerCorruption(), null);
});

test("handleCallLogRotateError fences further rotation on SQLITE_CORRUPT", () => {
  resetCallLogRotateFence();
  resetPagerCorruption();
  const corrupt = Object.assign(new Error("database disk image is malformed"), {
    code: "SQLITE_CORRUPT",
  });
  handleCallLogRotateError(corrupt);
  assert.equal(isCallLogRotatePaused(), true);
  assert.ok(getPagerCorruption());
  resetCallLogRotateFence();
  resetPagerCorruption();
});

test("handleCallLogRotateError does not fence ordinary filesystem errors", () => {
  resetCallLogRotateFence();
  resetPagerCorruption();
  handleCallLogRotateError(new Error("simulated opendir failure"));
  assert.equal(isCallLogRotatePaused(), false);
  assert.equal(getPagerCorruption(), null);
});
