/**
 * Regression test for #4012 — Nvidia NIM (and any vision-capable model whose
 * capability OmniRoute can't prove) via OmniRoute fails to process image inputs.
 *
 * The Vision Bridge is enabled by default. For a model with unknown
 * (`null`) vision capability it engages, tries to describe each image with the
 * configured vision model, and on a FAILED describe call it replaced the image
 * with the literal text "[Image N]: (unavailable)" — silently destroying the
 * original image so the (actually vision-capable) upstream answered
 * "Image unavailable". A describe failure must NOT be destructive: the original
 * image must survive so a vision-capable upstream can still see it.
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

test("#4012 describe failure preserves the original image instead of dropping it", async () => {
  const guardrail = makeGuardrail(true);
  const result = await guardrail.preCall(imagePayload(), ctx);

  assert.equal(result.block, false);
  const modified = (result.modifiedPayload ?? imagePayload()) as {
    messages: { content: Part[] }[];
  };
  const content = modified.messages[0].content;

  const imagePart = content.find((p) => p.type === "image_url");
  assert.ok(imagePart, "original image_url part must be preserved when the describe call fails");

  const unavailable = content.find((p) => p.type === "text" && p.text?.includes("(unavailable)"));
  assert.equal(unavailable, undefined, "must NOT replace the image with an '(unavailable)' stub");
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
