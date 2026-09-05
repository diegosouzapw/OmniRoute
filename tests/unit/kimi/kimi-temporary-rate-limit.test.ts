import assert from "node:assert/strict";
import test from "node:test";
import { getKimiTemporaryRateLimitResetAt } from "../../../open-sse/handlers/chatCore/kimiQuotaRecovery.ts";

const NOW = Date.parse("2026-08-11T01:00:00.000Z");
const RESET_AT = "2026-08-11T04:49:07.783Z";

test("Kimi temporary request limit stays recoverable when weekly quota remains", () => {
  const resetAt = getKimiTemporaryRateLimitResetAt(
    {
      quotas: {
        Ratelimit: { remaining: 0, resetAt: RESET_AT },
        Weekly: { remaining: 14 },
      },
    },
    NOW
  );

  assert.equal(resetAt, RESET_AT);
});

test("Kimi depleted weekly quota is not mistaken for a temporary request limit", () => {
  const resetAt = getKimiTemporaryRateLimitResetAt(
    {
      quotas: {
        Ratelimit: { remaining: 0, resetAt: RESET_AT },
        Weekly: { remaining: 0 },
      },
    },
    NOW
  );

  assert.equal(resetAt, null);
});
