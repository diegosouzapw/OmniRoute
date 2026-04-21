import test from "node:test";
import assert from "node:assert/strict";

const { BACKOFF_CONFIG } = await import("../../open-sse/config/constants.ts");
const { ERROR_TYPES, DEFAULT_ERROR_MESSAGES, classifyError, calculateBackoff } =
  await import("../../open-sse/config/errorConfig.ts");
const { buildErrorBody } = await import("../../open-sse/utils/error.ts");

test("errorConfig classifyError prioritizes text matches over status codes", () => {
  const rule = classifyError(500, "Too many requests right now");

  assert.equal(rule?.backoff, true);
  assert.equal(rule?.reason, "rate_limit_exceeded");
});

test("errorConfig classifyError falls back to status rules", () => {
  const rule = classifyError(404, "");

  assert.equal(rule?.cooldownMs, 120000);
  assert.equal(rule?.reason, "unknown");
});

test("buildErrorBody uses centralized billing and model support mappings", () => {
  assert.deepEqual(buildErrorBody(402, ""), {
    error: {
      message: DEFAULT_ERROR_MESSAGES[402],
      type: ERROR_TYPES[402].type,
      code: ERROR_TYPES[402].code,
    },
  });

  assert.deepEqual(buildErrorBody(406, ""), {
    error: {
      message: DEFAULT_ERROR_MESSAGES[406],
      type: ERROR_TYPES[406].type,
      code: ERROR_TYPES[406].code,
    },
  });
});

test("calculateBackoff respects the configured cap", () => {
  assert.equal(calculateBackoff(0), 1000);
  assert.equal(calculateBackoff(1), 2000);
  assert.equal(calculateBackoff(BACKOFF_CONFIG.maxLevel + 20), BACKOFF_CONFIG.max);
});
