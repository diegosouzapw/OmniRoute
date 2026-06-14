/**
 * callVisionModel fallback behavior — Integration test (PR #3377, Rule #18)
 *
 * Verifies that when the primary vision model fails, callVisionModel falls
 * through to the next model in the fallback list, and that when ALL models
 * fail it throws the last error (not a silent empty result).
 *
 * Run: node --import tsx/esm --test tests/unit/guardrails/vision-bridge-callmodel.test.ts
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-vision-bridge-")
);
process.env.DATA_DIR = TEST_DATA_DIR;
// Prevent vision bridge from routing through a real API
process.env.VISION_BRIDGE_ENABLED = "false";

const { callVisionModel } = await import(
  "../../../src/lib/guardrails/visionBridgeHelpers.ts"
);

const originalFetch = globalThis.fetch;

test.after(() => {
  globalThis.fetch = originalFetch;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

// Helper: build a minimal OpenAI-compat image data URI
const TINY_PNG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

test("callVisionModel falls through to next model when primary fails", async () => {
  let fetchCallCount = 0;
  const FALLBACK_RESPONSE = JSON.stringify({
    choices: [{ message: { content: "fallback model description" } }],
  });

  globalThis.fetch = async (url: RequestInfo | URL, _init?: RequestInit) => {
    fetchCallCount++;
    if (fetchCallCount === 1) {
      // First call (primary model) — simulate API error
      throw new Error("mock: primary model unavailable");
    }
    // Second call (fallback model) — return valid response
    return new Response(FALLBACK_RESPONSE, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  const result = await callVisionModel(
    TINY_PNG,
    { model: "openai/gpt-4o-mini", prompt: "Describe this image." },
    "sk-test-key",
    { fixedModel: "openai/gpt-4o-mini", maxFallbackAttempts: 2 }
  );

  assert.equal(
    fetchCallCount,
    2,
    "must have attempted exactly 2 models (primary + 1 fallback)"
  );
  assert.equal(
    result,
    "fallback model description",
    "must return the fallback model's response"
  );
});

test("callVisionModel throws when ALL models fail", async () => {
  let fetchCallCount = 0;

  globalThis.fetch = async () => {
    fetchCallCount++;
    throw new Error(`mock: model-${fetchCallCount} unavailable`);
  };

  await assert.rejects(
    () =>
      callVisionModel(
        TINY_PNG,
        { model: "openai/gpt-4o-mini", prompt: "Describe this image." },
        "sk-test-key",
        { fixedModel: "openai/gpt-4o-mini", maxFallbackAttempts: 2 }
      ),
    (err: Error) => {
      assert.ok(
        err.message.includes("unavailable") || err.message.includes("All vision models failed"),
        `error should indicate failure, got: ${err.message}`
      );
      return true;
    }
  );

  assert.ok(fetchCallCount >= 1, "must have attempted at least 1 model");
});
