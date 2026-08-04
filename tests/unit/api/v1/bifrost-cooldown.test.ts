import { afterEach, test } from "node:test";
import assert from "node:assert/strict";
import {
  clearBifrostFailure,
  getActiveBifrostCooldown,
  getBifrostFailureCooldownMs,
  recordBifrostFailure,
  resetBifrostCooldowns,
} from "../../../../src/app/api/v1/relay/chat/completions/bifrostCooldown.ts";

afterEach(() => {
  resetBifrostCooldowns();
});

test("bifrost cooldown defaults to a short retry suppression window", () => {
  assert.equal(getBifrostFailureCooldownMs({}), 5000);
  assert.equal(
    getBifrostFailureCooldownMs({ OMNIROUTE_BIFROST_FAILURE_COOLDOWN_MS: "250" }),
    250
  );
  assert.equal(
    getBifrostFailureCooldownMs({ OMNIROUTE_BIFROST_FAILURE_COOLDOWN_MS: "bad" }),
    5000
  );
});

test("bifrost cooldown reports remaining time and expires", () => {
  recordBifrostFailure("http://bifrost.local", "timeout", 1000, 500);

  assert.deepEqual(getActiveBifrostCooldown("http://bifrost.local", 1100), {
    remainingMs: 400,
    reason: "timeout",
  });
  assert.equal(getActiveBifrostCooldown("http://bifrost.local", 1501), null);
});

test("bifrost cooldown can be disabled or cleared", () => {
  recordBifrostFailure("http://bifrost.local", "timeout", 1000, 0);
  assert.equal(getActiveBifrostCooldown("http://bifrost.local", 1001), null);

  recordBifrostFailure("http://bifrost.local", "timeout", 1000, 500);
  clearBifrostFailure("http://bifrost.local");

  assert.equal(getActiveBifrostCooldown("http://bifrost.local", 1001), null);
});
