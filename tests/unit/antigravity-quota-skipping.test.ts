import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-quota-antigravity-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const coreDb = await import("../../src/lib/db/core.ts");
const quotaCache = await import("../../src/domain/quotaCache.ts");

test.after(() => {
  coreDb.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("isQuotaExhaustedForRequest isolates Claude and Gemini quota families for antigravity & agy", () => {
  const connectionId = "conn-antigravity-test";

  // Simulate Claude Opus being exhausted, while Gemini is NOT.
  quotaCache.setQuotaCache(connectionId, "antigravity", {
    "claude-opus-4-6-thinking": { remainingPercentage: 0, resetAt: null },
    "gemini-3.5-flash-high": { remainingPercentage: 100, resetAt: null },
  });

  // Verify that Claude models are considered exhausted.
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(
      connectionId,
      "antigravity",
      "antigravity/claude-opus-4-6-thinking"
    ),
    true,
    "Claude Opus should be exhausted"
  );
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(
      connectionId,
      "antigravity",
      "antigravity/claude-sonnet-4-6"
    ),
    true,
    "Claude Sonnet should share Claude family quota and be exhausted"
  );

  // Verify that Gemini models are NOT considered exhausted.
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(
      connectionId,
      "antigravity",
      "antigravity/gemini-3.5-flash-high"
    ),
    false,
    "Gemini Flash should NOT be exhausted"
  );
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(
      connectionId,
      "antigravity",
      "antigravity/gemini-2.5-pro"
    ),
    false,
    "Gemini Pro should share Gemini family quota and NOT be exhausted"
  );

  // Test that 'agy' spelling behaves the exact same way.
  const connectionIdAgy = "conn-agy-test";
  quotaCache.setQuotaCache(connectionIdAgy, "agy", {
    "claude-opus-4-6-thinking": { remainingPercentage: 0, resetAt: null },
    "gemini-3.5-flash-high": { remainingPercentage: 100, resetAt: null },
  });

  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(connectionIdAgy, "agy", "agy/claude-opus-4-6-thinking"),
    true,
    "Claude Opus under 'agy' should be exhausted"
  );
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(connectionIdAgy, "agy", "agy/gemini-3.5-flash-high"),
    false,
    "Gemini Flash under 'agy' should NOT be exhausted"
  );

  // Test that unknown models (family 'other') preserve exact-model scoping.
  const connectionIdOther = "conn-other-test";
  quotaCache.setQuotaCache(connectionIdOther, "antigravity", {
    "unknown-model-a": { remainingPercentage: 0, resetAt: null },
    "unknown-model-b": { remainingPercentage: 100, resetAt: null },
  });

  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(
      connectionIdOther,
      "antigravity",
      "antigravity/unknown-model-a"
    ),
    true,
    "Unknown model A should be exhausted"
  );
  assert.equal(
    quotaCache.isQuotaExhaustedForRequest(
      connectionIdOther,
      "antigravity",
      "antigravity/unknown-model-b"
    ),
    false,
    "Unknown model B should NOT be exhausted"
  );
});
