import test from "node:test";
import assert from "node:assert/strict";

import { emitUsageRecorded, onUsageRecorded } from "../../src/lib/usage/usageEvents.ts";

test("emitUsageRecorded delivers provider + connectionId to subscribers", () => {
  const seen: Array<[string, string]> = [];
  const off = onUsageRecorded((provider, connectionId) => seen.push([provider, connectionId]));
  try {
    emitUsageRecorded("antigravity", "conn-1");
    assert.deepEqual(seen, [["antigravity", "conn-1"]]);
  } finally {
    off();
  }
});

test("emitUsageRecorded no-ops when provider or connectionId is missing", () => {
  let calls = 0;
  const off = onUsageRecorded(() => {
    calls += 1;
  });
  try {
    emitUsageRecorded(null, "conn-1");
    emitUsageRecorded("agy", "");
    emitUsageRecorded(undefined, undefined);
    assert.equal(calls, 0);
  } finally {
    off();
  }
});

test("onUsageRecorded unsubscribe stops further delivery", () => {
  let calls = 0;
  const off = onUsageRecorded(() => {
    calls += 1;
  });
  emitUsageRecorded("agy", "conn-2");
  off();
  emitUsageRecorded("agy", "conn-2");
  assert.equal(calls, 1);
});

test("a throwing listener does not break emit for others", () => {
  let reached = false;
  const offBad = onUsageRecorded(() => {
    throw new Error("boom");
  });
  const offGood = onUsageRecorded(() => {
    reached = true;
  });
  try {
    assert.doesNotThrow(() => emitUsageRecorded("antigravity", "conn-3"));
    assert.equal(reached, true);
  } finally {
    offBad();
    offGood();
  }
});
