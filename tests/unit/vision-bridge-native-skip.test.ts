/**
 * Explicit guard for the "target model already supports vision natively" skip
 * path (openclaw `runner.ts:711` prompted this — OmniRoute already relied on
 * the behavior implicitly, this test makes the contract explicit and asserts
 * the dedicated skip log).
 *
 * Follows the DI harness pattern from `vision-bridge-cc-no-reroute.test.ts`:
 * settings/vision-call/combo-mapping are all injected, so this exercises
 * `VisionBridgeGuardrail.preCall` without going through any real network call.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { VisionBridgeGuardrail } = await import("../../src/lib/guardrails/visionBridge.ts");
import type { GuardrailContext } from "../../src/lib/guardrails/base.ts";
import type { VisionModelConfig } from "../../src/lib/guardrails/visionBridgeHelpers.ts";

// Known registry model with supportsVision: true (see
// vision-bridge-cc-no-reroute.test.ts CC-VB-SANITY).
const VISION_CAPABLE_MODEL = "command-code/gpt-5.5";

function imagePayload(model: string): Record<string, unknown> {
  return {
    model,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is in this image?" },
          {
            type: "image_url",
            image_url: { url: "https://example.com/image.png" },
          },
        ],
      },
    ],
  };
}

/** Records every (level, category, message) call so the test can assert on it. */
class LogSpy {
  calls: Array<{ level: string; category: string; message: string }> = [];
  private record(level: string) {
    return (category: string, message: string) => {
      this.calls.push({ level, category, message });
    };
  }
  debug = this.record("debug");
  info = this.record("info");
  warn = this.record("warn");
  error = this.record("error");
}

test("native-vision skip: messages untouched, zero vision calls, dedicated skip log", async () => {
  let visionCallCount = 0;
  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        visionBridgeEnabled: true,
        visionBridgeModel: "openai/gpt-4o-mini",
      }),
      callVisionModel: async (_imageDataUri: string, _config: VisionModelConfig) => {
        visionCallCount++;
        return "should never be produced";
      },
      // No `checkModelHasComboMapping` override: let the real (DB-backed)
      // combo lookup run, which resolves to "not-combo" for a plain model
      // string that is neither a combo name nor combo-mapped — exactly the
      // path that must hit the native-vision skip + log.
    },
  });

  const originalPayload = imagePayload(VISION_CAPABLE_MODEL);
  const payloadSnapshot = JSON.parse(JSON.stringify(originalPayload));
  const logSpy = new LogSpy();
  const context: GuardrailContext = {
    model: VISION_CAPABLE_MODEL,
    log: logSpy as unknown as GuardrailContext["log"],
  };

  const result = await guardrail.preCall(originalPayload, context);

  // (a) messages intact — guardrail must not modify the payload at all.
  assert.strictEqual(result.block, false);
  assert.strictEqual(
    result.modifiedPayload,
    undefined,
    "native-vision skip must not rewrite payload"
  );
  assert.deepStrictEqual(
    originalPayload,
    payloadSnapshot,
    "native-vision skip must not mutate the original messages"
  );

  // (b) zero calls to the vision (describe) model.
  assert.strictEqual(
    visionCallCount,
    0,
    "must not call the vision model when target has native vision"
  );

  // (c) dedicated skip log emitted.
  const skipLog = logSpy.calls.find((c) =>
    c.message.includes("Skipping: target model supports vision natively")
  );
  assert.ok(
    skipLog,
    `expected a skip log containing "Skipping: target model supports vision natively", got: ${JSON.stringify(logSpy.calls)}`
  );
  assert.equal(skipLog?.category, "VISION_BRIDGE");
});
