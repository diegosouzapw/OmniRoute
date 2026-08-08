/**
 * Describe-path cache integration (Modality Bridge PR-1): the describe loop
 * consults the shared BridgeCache (sha256 of contentRef+prompt+model) so the
 * same image with the same prompt/model is described once per TTL. Failures
 * are never cached. Opt-out via `modalityBridgeCacheEnabled: false`.
 *
 * The shared cache is PROCESS-WIDE — every test uses a unique image payload so
 * tests cannot cross-contaminate each other's keys. Guardrail cases use
 * `model: "auto/..."` + `mode: "describe"` so the flow is DB-free.
 */
import { test } from "node:test";
import assert from "node:assert/strict";

import { VisionBridgeGuardrail } from "../../src/lib/guardrails/visionBridge.ts";

function cacheGuardrail(
  settings: Record<string, unknown>,
  counter: { calls: number },
  behavior?: { failFirstCall?: boolean }
): InstanceType<typeof VisionBridgeGuardrail> {
  return new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({ modalityBridgeVisionMode: "describe", ...settings }),
      callVisionModel: async () => {
        counter.calls++;
        if (behavior?.failFirstCall && counter.calls === 1) {
          throw new Error("primeiro describe falhou");
        }
        return "uma descrição da imagem";
      },
      hasUsableCredentials: async () => null,
    },
  });
}

/** Unique per-test payload — the test name lands inside the base64 content. */
function bodyWithImage(uniqueRef: string): Record<string, unknown> {
  return {
    model: "auto/describe-cache",
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

const context = { model: "auto/describe-cache", log: console };

test("same image+prompt+model described twice → single upstream call (cache hit)", async () => {
  const counter = { calls: 0 };
  const guardrail = cacheGuardrail({}, counter);

  const first = await guardrail.preCall(bodyWithImage("cache-hit-test"), context);
  assert.equal((first.meta ?? {}).imagesProcessed, 1);
  assert.equal(counter.calls, 1);

  const second = await guardrail.preCall(bodyWithImage("cache-hit-test"), context);
  assert.equal((second.meta ?? {}).imagesProcessed, 1, "cached describe still replaces the image");
  assert.equal(counter.calls, 1, "second identical request must be served from the cache");

  const descriptions = (second.meta ?? {}).descriptions as string[];
  assert.ok(
    descriptions?.[0]?.includes("uma descrição da imagem"),
    "cached description must be spliced into the payload"
  );
});

test("modalityBridgeCacheEnabled=false → every request hits the vision model", async () => {
  const counter = { calls: 0 };
  const guardrail = cacheGuardrail({ modalityBridgeCacheEnabled: false }, counter);

  await guardrail.preCall(bodyWithImage("cache-disabled-test"), context);
  await guardrail.preCall(bodyWithImage("cache-disabled-test"), context);
  assert.equal(counter.calls, 2, "disabled cache must not dedupe describe calls");
});

test("failed describe is NOT cached — the next request retries upstream", async () => {
  const counter = { calls: 0 };
  const guardrail = cacheGuardrail({}, counter, { failFirstCall: true });

  await guardrail.preCall(bodyWithImage("failure-not-cached-test"), context);
  assert.equal(counter.calls, 1);

  const second = await guardrail.preCall(bodyWithImage("failure-not-cached-test"), context);
  assert.equal(counter.calls, 2, "failure must not be cached; retry must reach upstream");

  const descriptions = (second.meta ?? {}).descriptions as string[];
  assert.ok(
    descriptions?.[0]?.includes("uma descrição da imagem"),
    "successful retry description must be used"
  );
});
