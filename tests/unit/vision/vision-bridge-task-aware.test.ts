/**
 * Task-aware vision description prompt (codex-vision-proxy pattern) —
 * Modality Bridge PR-1. The describe path appends the user's last question as
 * a focus hint so the vision model describes what is relevant to answering it
 * instead of producing a generic caption. Default ON; disabled via
 * `modalityBridgeVisionTaskAware: false`.
 *
 * Guardrail-level cases use `model: "auto/..."` + `mode: "describe"` so the
 * whole flow is DB-free (the auto prefix skips the capability/combo lookups
 * that open SQLite, and the forced describe mode skips the reroute block).
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { composeVisionPrompt } from "../../../src/lib/guardrails/visionBridgeHelpers.ts";
import { VisionBridgeGuardrail } from "../../../src/lib/guardrails/visionBridge.ts";
import type { VisionModelConfig } from "../../../src/lib/guardrails/visionBridgeHelpers.ts";

// ── composeVisionPrompt (pure) ──────────────────────────────────────────────

test("appends user focus hint when taskAware", () => {
  const p = composeVisionPrompt("Describe the image.", "qual o erro no screenshot?", true);
  assert.ok(p.startsWith("Describe the image."));
  assert.ok(p.includes("qual o erro no screenshot?"));
});

test("no hint when disabled or no user text", () => {
  assert.equal(composeVisionPrompt("Base.", "pergunta", false), "Base.");
  assert.equal(composeVisionPrompt("Base.", undefined, true), "Base.");
  assert.equal(composeVisionPrompt("Base.", "   ", true), "Base.");
});

test("hint truncated to 500 chars", () => {
  const p = composeVisionPrompt("Base.", "x".repeat(2000), true);
  assert.ok(p.length < 700, `expected truncated prompt, got length ${p.length}`);
  assert.ok(p.includes("x".repeat(500)));
  assert.ok(!p.includes("x".repeat(501)));
});

// ── Guardrail describe path wiring ──────────────────────────────────────────

function describeGuardrail(
  settings: Record<string, unknown>,
  capturedPrompts: string[]
): InstanceType<typeof VisionBridgeGuardrail> {
  return new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({ modalityBridgeVisionMode: "describe", ...settings }),
      callVisionModel: async (_imageDataUri: string, config: VisionModelConfig) => {
        capturedPrompts.push(config.prompt);
        return "descrição";
      },
      hasUsableCredentials: async () => null,
    },
  });
}

/**
 * Unique per-test payload: the describe path caches by image+prompt+model
 * (Task 8), so reusing the same data URI across tests would make a later
 * describe a cache hit and hide the upstream call whose prompt is asserted.
 */
function autoImageBody(uniqueRef: string, userText: string): Record<string, unknown> {
  return {
    model: "auto/task-aware",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: userText },
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

test("describe call prompt contains the last user question (taskAware default on)", async () => {
  const prompts: string[] = [];
  const guardrail = describeGuardrail({}, prompts);

  const result = await guardrail.preCall(
    autoImageBody("task-aware-default-on-test", "qual o erro no screenshot?"),
    { model: "auto/task-aware", log: console }
  );

  assert.equal((result.meta ?? {}).imagesProcessed, 1);
  assert.equal(prompts.length, 1);
  assert.ok(
    prompts[0].includes("qual o erro no screenshot?"),
    `prompt should carry the user question, got: ${prompts[0]}`
  );
});

test("modalityBridgeVisionTaskAware=false keeps the base prompt untouched", async () => {
  const prompts: string[] = [];
  const guardrail = describeGuardrail(
    { modalityBridgeVisionTaskAware: false, modalityBridgeVisionPrompt: "Base prompt." },
    prompts
  );

  const result = await guardrail.preCall(
    autoImageBody("task-aware-disabled-test", "pergunta que não deve vazar"),
    { model: "auto/task-aware", log: console }
  );

  assert.equal((result.meta ?? {}).imagesProcessed, 1);
  assert.equal(prompts.length, 1);
  assert.equal(prompts[0], "Base prompt.");
});
