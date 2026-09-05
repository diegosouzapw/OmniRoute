import test from "node:test";
import assert from "node:assert/strict";
import {
  recordRelayProbe,
  getRelayProbeStats,
  resetRelayProbeStats,
} from "@/lib/db/relayProbeStats";

test.beforeEach(() => {
  resetRelayProbeStats();
});

test("starts at zero", () => {
  assert.deepEqual(getRelayProbeStats(), { tested: 0, alive: 0 });
});

test("counts tested and alive probes", () => {
  recordRelayProbe(true);
  recordRelayProbe(false);
  recordRelayProbe(true);
  assert.deepEqual(getRelayProbeStats(), { tested: 3, alive: 2 });
});

test("returns a copy so callers cannot mutate internal state", () => {
  recordRelayProbe(true);
  const snapshot = getRelayProbeStats();
  snapshot.tested = 999;
  assert.deepEqual(getRelayProbeStats(), { tested: 1, alive: 1 });
});

test("reset returns counters to zero", () => {
  recordRelayProbe(false);
  recordRelayProbe(false);
  resetRelayProbeStats();
  assert.deepEqual(getRelayProbeStats(), { tested: 0, alive: 0 });
});
