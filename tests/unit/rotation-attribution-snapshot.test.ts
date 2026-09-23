// Rotation attribution snapshot store (N111 state): keyed by connection id,
// in-memory only, read without side effects. Failing-first (RED) test.
import test from "node:test";
import assert from "node:assert/strict";

import {
  recordRotationSnapshot,
  readRotationSnapshot,
  maskAccountId,
} from "../../open-sse/executors/accountRotation.ts";

test("readRotationSnapshot returns null when nothing was recorded", () => {
  assert.equal(readRotationSnapshot("conn-missing"), null);
});

test("recordRotationSnapshot stores masked entries readable by connection key", () => {
  const fp = "abcdef1234567890";
  recordRotationSnapshot("conn-a", [
    { masked: maskAccountId(fp), ready: false, cooldownUntilMs: 12345, consecutiveFails: 2 },
  ]);
  const snap = readRotationSnapshot("conn-a");
  assert.ok(snap);
  assert.equal(snap!.length, 1);
  assert.equal(snap![0].masked, maskAccountId(fp));
  assert.ok(!snap![0].masked.includes(fp.slice(8)));
  assert.equal(snap![0].consecutiveFails, 2);
});

test("reading the snapshot never mutates it (repeat reads identical)", () => {
  recordRotationSnapshot("conn-b", [
    { masked: "deadbeef…", ready: true, cooldownUntilMs: null, consecutiveFails: 0 },
  ]);
  const first = readRotationSnapshot("conn-b");
  const second = readRotationSnapshot("conn-b");
  assert.deepEqual(first, second);
});

test("maskAccountId never emits the full id; empty means direct", () => {
  assert.equal(maskAccountId(""), "direct");
  const masked = maskAccountId("abcdef1234567890");
  assert.ok(!masked.includes("1234567890"));
});
