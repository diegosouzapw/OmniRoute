/**
 * `modalityBridgeVisionMaxChars` — configurable teto for the vision-bridge
 * describe-path output. 0 (default) means "no cap" (existing behavior
 * unchanged); a positive value truncates the description with a `…` suffix
 * before it is spliced back as `[Image N]: <description>`.
 *
 * Follows the DI harness pattern from `vision-bridge-cc-no-reroute.test.ts` /
 * `vision-bridge-mode.test.ts` (settings + vision call injected, no real DB
 * dependency for the describe path itself).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { VisionBridgeGuardrail } = await import("../../../src/lib/guardrails/visionBridge.ts");
const { resolveVisionBridgeRuntimeSettings } =
  await import("../../../src/shared/constants/modalityBridgeDefaults.ts");
const { updateSettingsSchema } = await import("../../../src/shared/validation/settingsSchemas.ts");
import type { GuardrailContext } from "../../../src/lib/guardrails/base.ts";
import type { VisionModelConfig } from "../../../src/lib/guardrails/visionBridgeHelpers.ts";

const TEXT_ONLY_MODEL = "some/text-only-model";
const LONG_DESCRIPTION = "x".repeat(500);

function imageBody(uniqueRef: string): Record<string, unknown> {
  return {
    model: TEXT_ONLY_MODEL,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "what is in the image?" },
          {
            type: "image_url",
            image_url: {
              url: `data:image/png;base64,${Buffer.from(uniqueRef).toString("base64")}`,
            },
          },
        ],
      },
    ],
  };
}

function findImageDescriptionText(modifiedPayload: unknown): string | undefined {
  const body = modifiedPayload as { messages?: Array<{ content?: unknown }> } | undefined;
  const messages = body?.messages ?? [];
  for (const message of messages) {
    const parts = message.content;
    if (!Array.isArray(parts)) continue;
    for (const part of parts) {
      const p = part as { type?: string; text?: string };
      if (p?.type === "text" && typeof p.text === "string" && p.text.startsWith("[Image 1]:")) {
        return p.text;
      }
    }
  }
  return undefined;
}

test("modalityBridgeVisionMaxChars=120 caps the description with a … suffix", async () => {
  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        visionBridgeEnabled: true,
        modalityBridgeVisionMode: "describe",
        modalityBridgeVisionMaxChars: 120,
      }),
      callVisionModel: async (_imageDataUri: string, _config: VisionModelConfig) =>
        LONG_DESCRIPTION,
      // #10859 made the reroute heuristic try a live vision-capable model for
      // not-combo text-only models, which would hijack the request before the
      // describe path. Pin credentials to definitively-unusable (false) so the
      // reroute is excluded and the describe path under test runs.
      hasUsableCredentials: async () => false,
    },
  });

  const body = imageBody("maxchars-cap-test");
  const context: GuardrailContext = { model: TEXT_ONLY_MODEL, log: console };
  const result = await guardrail.preCall(body, context);

  const text = findImageDescriptionText(result.modifiedPayload);
  assert.ok(text, "expected a [Image 1]: text part in the modified payload");
  const description = text!.slice("[Image 1]: ".length);
  assert.ok(
    description.length <= 121,
    `capped description should be <= 121 chars (120 + ellipsis), got ${description.length}`
  );
  assert.ok(description.endsWith("…"), "capped description must end with an ellipsis suffix");
});

test("no modalityBridgeVisionMaxChars key: description is passed through in full", async () => {
  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        visionBridgeEnabled: true,
        modalityBridgeVisionMode: "describe",
      }),
      callVisionModel: async (_imageDataUri: string, _config: VisionModelConfig) =>
        LONG_DESCRIPTION,
      // Same #10859 reroute guard as above — keep the describe path under test.
      hasUsableCredentials: async () => false,
    },
  });

  const body = imageBody("maxchars-nokey-test");
  const context: GuardrailContext = { model: TEXT_ONLY_MODEL, log: console };
  const result = await guardrail.preCall(body, context);

  const text = findImageDescriptionText(result.modifiedPayload);
  assert.ok(text, "expected a [Image 1]: text part in the modified payload");
  const description = text!.slice("[Image 1]: ".length);
  assert.equal(description, LONG_DESCRIPTION, "without a cap the description must be untouched");
  assert.ok(!description.endsWith("…"), "unconfigured cap must never add an ellipsis");
});

test("resolveVisionBridgeRuntimeSettings({}) defaults maxChars to 0 (no cap)", () => {
  const runtime = resolveVisionBridgeRuntimeSettings({});
  assert.equal(runtime.maxChars, 0);
});

test("updateSettingsSchema accepts an explicit modalityBridgeVisionMaxChars: 0 to disable the cap", async () => {
  const parsed = updateSettingsSchema.safeParse({ modalityBridgeVisionMaxChars: 0 });
  assert.equal(parsed.success, true, "explicit 0 must validate (disables the cap)");

  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        visionBridgeEnabled: true,
        modalityBridgeVisionMode: "describe",
        modalityBridgeVisionMaxChars: 0,
      }),
      callVisionModel: async (_imageDataUri: string, _config: VisionModelConfig) =>
        LONG_DESCRIPTION,
      // Same #10859 reroute guard as above — keep the describe path under test.
      hasUsableCredentials: async () => false,
    },
  });

  const body = imageBody("maxchars-explicit-zero-test");
  const context: GuardrailContext = { model: TEXT_ONLY_MODEL, log: console };
  const result = await guardrail.preCall(body, context);

  const text = findImageDescriptionText(result.modifiedPayload);
  assert.ok(text, "expected a [Image 1]: text part in the modified payload");
  const description = text!.slice("[Image 1]: ".length);
  assert.equal(description, LONG_DESCRIPTION, "explicit 0 must disable truncation entirely");
  assert.ok(!description.endsWith("…"), "explicit 0 must never add an ellipsis");
});

test("updateSettingsSchema rejects a value below the 100 floor that is not the explicit-0 sentinel", () => {
  const parsed = updateSettingsSchema.safeParse({ modalityBridgeVisionMaxChars: 50 });
  assert.equal(parsed.success, false, "50 is neither the 0 sentinel nor >= 100");
});
