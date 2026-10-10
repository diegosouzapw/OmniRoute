/**
 * Vision Bridge mode selector (auto | describe | reroute) — Modality Bridge PR-1.
 *
 * The forced modes short-circuit BEFORE the auto reroute×describe heuristic, so
 * the #6640/#7204/#7871/#8430 contracts stay untouched in "auto" (the default):
 * - "describe": never whole-request-reroutes — straight to the describe path.
 * - "reroute": skips only the keep-credentialed-model guard; the reroute-target
 *   credential guard still applies, and with no usable target it blocks without
 *   describing or dropping the original images (lossless reroute — #15977).
 *
 * Uses dependency injection for settings/vision calls/credentials. The model
 * capability lookup inside preCall still opens the real (isolated) SQLite DB,
 * which on the current base dies on the inherited 134 migration collision —
 * hence the decollided-migrations helper below.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { useDecollidedMigrationsDir } from "./helpers/decollidedMigrationsDir.ts";

useDecollidedMigrationsDir();

const { VisionBridgeGuardrail } = await import("../../src/lib/guardrails/visionBridge.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
test.after(() => resetDbInstance());

const TEXT_ONLY_MODEL = "some/text-only-model";

/**
 * Unique per-test payload: the describe path caches by image+prompt+model
 * (Task 8), so reusing the same data URI across tests would turn a later
 * describe into a cache hit and hide the upstream call being asserted.
 */
function imageBody(uniqueRef: string): Record<string, unknown> {
  return {
    model: TEXT_ONLY_MODEL,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "o que há na imagem?" },
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

function metaOf(result: { meta?: Record<string, unknown> | null }): Record<string, unknown> {
  return result.meta ?? {};
}

test("mode=describe: never reroutes even when a reroute target exists", async () => {
  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVisionMode: "describe",
        // A configured vision model — in auto/reroute this would be a valid
        // fixed reroute target (credentials indeterminate → fail-open #8430).
        modalityBridgeVisionModel: "openai/gpt-4o-mini",
      }),
      callVisionModel: async () => "uma foto de um gato",
      hasUsableCredentials: async () => null,
    },
  });

  const body = imageBody("mode-describe-test");
  const result = await guardrail.preCall(body, { model: TEXT_ONLY_MODEL, log: console });

  const meta = metaOf(result);
  assert.notEqual(meta.rerouted, true, "describe mode must never whole-request-reroute");
  assert.equal(meta.imagesProcessed, 1, "the image must be described instead");
});

test("mode=reroute: blocks without describing when no reroute target has credentials", async () => {
  const describeCalls: string[] = [];
  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({ modalityBridgeVisionMode: "reroute" }),
      callVisionModel: async () => {
        describeCalls.push("describe");
        return "desc";
      },
      // Every model confirmed unusable — no reroute target can win (#8430).
      hasUsableCredentials: async () => false,
    },
  });

  const body = imageBody("mode-reroute-fallback-test");
  const original = structuredClone(body);
  const result = await guardrail.preCall(body, { model: TEXT_ONLY_MODEL, log: console });

  const meta = metaOf(result);
  assert.notEqual(meta.rerouted, true, "must not reroute to a target without credentials");
  assert.equal(result.block, true, "lossless reroute must fail closed without a usable target");
  assert.equal(meta.rerouteFailed, true);
  assert.equal(meta.requestedModel, TEXT_ONLY_MODEL);
  assert.equal(meta.imagesDetected, 1);
  assert.equal(describeCalls.length, 0, "forced reroute must never fall back to description");
  assert.equal(result.modifiedPayload, undefined);
  assert.deepEqual(body, original, "the original image request must remain intact");
});

test("mode=reroute: forces reroute where auto mode would keep the credentialed model", async () => {
  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeVisionMode: "reroute",
        modalityBridgeVisionModel: "openai/gpt-4o-mini",
      }),
      callVisionModel: async () => "desc",
      // Original model IS credentialed (auto mode would keep it, #7204);
      // reroute target indeterminate → fail-open proceeds (#8430).
      hasUsableCredentials: async (model: string) => (model === TEXT_ONLY_MODEL ? true : null),
    },
  });

  const body = imageBody("mode-reroute-forces-test");
  const result = await guardrail.preCall(body, { model: TEXT_ONLY_MODEL, log: console });

  const meta = metaOf(result);
  assert.equal(meta.rerouted, true, "reroute mode must skip the keep-credentialed-model guard");
  assert.equal(meta.toModel, "openai/gpt-4o-mini");
  assert.equal(meta.fromModel, TEXT_ONLY_MODEL);
});

test("mode=auto (default): credentialed model is described, not hijacked", async () => {
  const guardrail = new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({}),
      callVisionModel: async () => "desc",
      hasUsableCredentials: async () => true,
    },
  });

  const body = imageBody("mode-auto-default-test");
  const result = await guardrail.preCall(body, { model: TEXT_ONLY_MODEL, log: console });

  const meta = metaOf(result);
  assert.notEqual(meta.rerouted, true, "auto mode keeps the credentialed model (#7204)");
  assert.equal(meta.imagesProcessed, 1, "images are described for the kept model");
});
