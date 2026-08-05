/**
 * Regression test for #4012 / #8430 — Nvidia NIM (and any vision-capable model
 * whose capability OmniRoute can't prove) via OmniRoute fails to process image
 * inputs.
 *
 * SEMANTIC CHANGE (#8430): In the combo describe path, when ALL describe calls
 * fail (no vision-capable provider reachable on this instance), the raw image
 * is now replaced with an error text stub instead of being preserved. This is
 * safe because the combo describe path is only reached for models/targets that
 * are confirmed non-vision-capable — forwarding a raw image to a text-only
 * backend would produce an opaque serde error like `[400] unknown variant
 * image_url, expected text`. The original #4012 preserve-raw behavior is
 * maintained for the reroute path (not-combo / auto models with unknown vision
 * capability), where the upstream model might still be vision-capable.
 *
 * Previous behavior: describe failure → preserve original image_url part
 * Current behavior:  total describe failure → replace with error text stub
 */
import test from "node:test";
import assert from "node:assert/strict";

const { VisionBridgeGuardrail } = await import("../../src/lib/guardrails/visionBridge.ts");

type Part = { type: string; text?: string; image_url?: { url: string } };

function makeGuardrail(shouldVisionFail: boolean) {
  return new VisionBridgeGuardrail({
    enabled: true,
    deps: {
      getSettings: async () => ({
        visionBridgeEnabled: true,
        visionBridgeModel: "openai/gpt-4o-mini",
      }),
      callVisionModel: async () => {
        if (shouldVisionFail) throw new Error("no vision model configured");
        return "a sea turtle swimming";
      },
      // Force "process" deterministically without touching the DB.
      checkModelHasComboMapping: async () => true,
    },
  });
}

function imagePayload() {
  return {
    model: "nvidia/google/diffusiongemma-26b-a4b-it",
    messages: [
      {
        role: "user",
        content: [
          { type: "image_url", image_url: { url: "https://example.com/turtle.jpg" } },
          { type: "text", text: "Describe this image." },
        ],
      },
    ],
  };
}

const ctx = { model: "nvidia/google/diffusiongemma-26b-a4b-it", log: console } as never;

test("#4012/#8430 describe failure replaces image with error text stub (combo describe path)", async () => {
  const guardrail = makeGuardrail(true);
  const result = await guardrail.preCall(imagePayload(), ctx);

  assert.equal(result.block, false);
  const modified = (result.modifiedPayload ?? imagePayload()) as {
    messages: { content: Part[] }[];
  };
  const content = modified.messages[0].content;

  // (#8430) In the combo describe path, total describe failure stubs the image
  // instead of preserving it, because the upstream cannot handle raw images.
  const imagePart = content.find((p) => p.type === "image_url");
  assert.equal(imagePart, undefined, "raw image_url must be replaced when no vision provider is reachable");

  // The describe stub should contain the unavailable message
  const stub = content.find((p) => p.type === "text" && p.text?.includes("unavailable"));
  assert.ok(stub, "an error stub should be present when describe fails in the combo path");
});

test("#4012 successful describe still replaces the image with its text description", async () => {
  const guardrail = makeGuardrail(false);
  const result = await guardrail.preCall(imagePayload(), ctx);

  assert.equal(result.block, false);
  assert.ok(result.modifiedPayload, "successful describe should modify the payload");
  const content = (result.modifiedPayload as { messages: { content: Part[] }[] }).messages[0]
    .content;

  assert.equal(content.find((p) => p.type === "image_url"), undefined, "image replaced on success");
  const desc = content.find((p) => p.type === "text" && p.text?.includes("a sea turtle swimming"));
  assert.ok(desc, "the vision description should be injected as text");
});
