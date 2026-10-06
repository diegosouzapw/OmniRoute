import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { sanitizeRateLimitOverrides } from "../../src/lib/db/providers/columns";

describe("providerConnection - sanitizeRateLimitOverrides with RPD", () => {
  it("accepts valid rpd alongside rpm and other overrides", () => {
    const input = {
      rpm: 60,
      rpd: 1000,
      tpm: 50000,
      tpd: 1000000,
      minTime: 500,
      maxConcurrent: 5,
      maxWaitMs: 30000,
    };
    const result = sanitizeRateLimitOverrides(input);
    assert.deepEqual(result.rejected, []);
    assert.deepEqual(result.sanitized, input);
  });

  it("accepts rpd as the sole override", () => {
    const input = { rpd: 500 };
    const result = sanitizeRateLimitOverrides(input);
    assert.deepEqual(result.rejected, []);
    assert.deepEqual(result.sanitized, { rpd: 500 });
  });

  it("rejects non-integer or negative rpd values", () => {
    const negative = { rpd: -10 };
    const floatVal = { rpd: 12.5 };
    const stringVal = { rpd: "500" as unknown as number };

    assert.deepEqual(sanitizeRateLimitOverrides(negative).rejected, ["rpd"]);
    assert.deepEqual(sanitizeRateLimitOverrides(floatVal).rejected, ["rpd"]);
    assert.deepEqual(sanitizeRateLimitOverrides(stringVal).rejected, ["rpd"]);
  });

  it("rejects unknown keys while preserving valid rpd", () => {
    const input = { rpd: 200, invalidKey: 100 };
    const result = sanitizeRateLimitOverrides(input);
    assert.deepEqual(result.rejected, ["invalidKey"]);
    assert.deepEqual(result.sanitized, { rpd: 200 });
  });
});
