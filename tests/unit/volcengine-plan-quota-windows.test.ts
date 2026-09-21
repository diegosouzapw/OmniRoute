import test from "node:test";
import assert from "node:assert/strict";
import { __testing } from "../../open-sse/services/usage/volcenginePlan.ts";

test("mapCodingPlanUsage maps windows to canonical names and handles cap edge cases", () => {
  const sampleResult = {
    QuotaUsage: [
      {
        Level: "session",
        Cap: 100,
        Percent: 35,
        ResetTimestamp: 1725686400,
      },
      {
        Level: "weekly",
        Cap: 100,
        Percent: 10,
        ResetTimestamp: 1726204800,
      },
      {
        Level: "daily",
        Cap: 0,
        Percent: 0,
        ResetTimestamp: 0,
      },
    ],
  };

  const quotas = __testing.mapCodingPlanUsage(sampleResult);
  assert.ok(quotas["session (5h)"]);
  assert.equal(quotas["session (5h)"].used, 35);
  assert.equal(quotas["session (5h)"].total, 100);
  assert.equal(quotas["session (5h)"].remainingPercentage, 65);
  assert.ok(quotas["session (5h)"].resetAt);

  assert.ok(quotas["weekly (7d)"]);
  assert.equal(quotas["weekly (7d)"].used, 10);
  assert.equal(quotas["weekly (7d)"].remainingPercentage, 90);

  assert.ok(quotas["daily"]);
  assert.equal(quotas["daily"].resetAt, null);
  assert.equal("session" in quotas, false);
  assert.equal("weekly" in quotas, false);
});

test("mapAgentPlanUsage maps windows to canonical names and guards zero total", () => {
  const sampleResult = {
    AFPFiveHour: {
      Quota: 1000,
      Used: 250,
      ResetTime: 1725686400000,
    },
    AFPWeekly: {
      Quota: 5000,
      Used: 500,
      ResetTime: 1726204800000,
    },
    AFPDaily: {
      Quota: 0,
      Used: 0,
      ResetTime: 0,
    },
  };

  const quotas = __testing.mapAgentPlanUsage(sampleResult);
  assert.ok(quotas["session (5h)"]);
  assert.equal(quotas["session (5h)"].used, 250);
  assert.equal(quotas["session (5h)"].total, 1000);
  assert.equal(quotas["session (5h)"].remainingPercentage, 75);

  assert.ok(quotas["weekly (7d)"]);
  assert.equal(quotas["weekly (7d)"].used, 500);
  assert.equal(quotas["weekly (7d)"].total, 5000);
  assert.equal(quotas["weekly (7d)"].remainingPercentage, 90);

  assert.ok(quotas["daily"]);
  assert.equal(quotas["daily"].total, 0);
  // Total 0 must result in remainingPercentage: 0, NOT 100 (which poisons routing priority)
  assert.equal(quotas["daily"].remainingPercentage, 0);

  assert.equal("AFPFiveHour" in quotas, false);
  assert.equal("AFPWeekly" in quotas, false);
});
