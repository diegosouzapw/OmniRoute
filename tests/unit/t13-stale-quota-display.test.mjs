import test from "node:test";
import assert from "node:assert/strict";

import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils.tsx";

test("T13: parseQuotaData zeroes usage when resetAt is already in the past", () => {
  const past = new Date(Date.now() - 60_000).toISOString();
  const parsed = parseQuotaData("codex", {
    quotas: {
      session: { used: 83, total: 100, resetAt: past },
    },
  });

  assert.equal(parsed.length, 1);
  assert.equal(parsed[0].used, 0);
  assert.equal(parsed[0].staleAfterReset, true);
  assert.equal(parsed[0].remainingPercentage, 100);
});

test("T13: parseQuotaData keeps usage unchanged when resetAt is in the future", () => {
  const future = new Date(Date.now() + 60_000).toISOString();
  const parsed = parseQuotaData("codex", {
    quotas: {
      session: { used: 42, total: 100, resetAt: future },
    },
  });

  assert.equal(parsed.length, 1);
  assert.equal(parsed[0].used, 42);
  assert.equal(parsed[0].staleAfterReset, false);
});
