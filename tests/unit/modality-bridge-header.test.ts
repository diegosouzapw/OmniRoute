/**
 * Modality Bridge stats + transparency header (PR-1 Task 9):
 * - buildModalityBridgeHeader() derives the `x-omniroute-modality-bridge`
 *   response header value from pre-call guardrail results (describe path only —
 *   reroute and untouched requests get no header).
 * - recordBridgeUse()/getBridgeStats() keep in-memory per-modality counters.
 *
 * Stats and the describe cache are PROCESS-GLOBAL: assertions use >= against
 * captured before-values and every guardrail case uses a unique image payload
 * (`auto/` model + mode "describe" keeps the flow DB-free — same recipe as
 * tests/unit/vision-bridge-describe-cache.test.ts).
 */
import { test } from "node:test";
import assert from "node:assert";

import {
  buildModalityBridgeHeader,
  recordBridgeUse,
  getBridgeStats,
} from "../../src/lib/guardrails/modalityBridge/bridgeStats.ts";
import { VisionBridgeGuardrail } from "../../src/lib/guardrails/visionBridge.ts";

test("header built from vision-bridge describe meta", () => {
  const h = buildModalityBridgeHeader([
    { guardrail: "vision-bridge", meta: { imagesProcessed: 2, visionModel: "openai/gpt-4o-mini" } },
  ]);
  assert.equal(h, "image->text;model=openai/gpt-4o-mini;parts=2");
});

test("no header for reroute or untouched requests", () => {
  assert.equal(
    buildModalityBridgeHeader([{ guardrail: "vision-bridge", meta: { rerouted: true } }]),
    null
  );
  assert.equal(buildModalityBridgeHeader([]), null);
});

test("audio-bridge meta produces the audio segment (PR-3 forward-compat)", () => {
  const h = buildModalityBridgeHeader([
    { guardrail: "vision-bridge", meta: { imagesProcessed: 1, visionModel: "m1" } },
    { guardrail: "audio-bridge", meta: { clipsProcessed: 3, sttModel: "m2" } },
  ]);
  assert.equal(h, "image->text;model=m1;parts=1, audio->text;model=m2;parts=3");
});

test("stats counters accumulate", () => {
  recordBridgeUse("vision", { cacheHit: true });
  const s = getBridgeStats();
  assert.ok(s.vision.bridged >= 1);
  assert.ok(s.vision.cacheHits >= 1);
});

// ── Guardrail-level wiring: describe path bumps the vision counters ─────────

function statsGuardrail(counter: { calls: number }, behavior?: { failAlways?: boolean }) {
  return new VisionBridgeGuardrail({
    deps: {
      getSettings: async () => ({ modalityBridgeVisionMode: "describe" }),
      callVisionModel: async () => {
        counter.calls++;
        if (behavior?.failAlways) throw new Error("describe indisponível");
        return "uma descrição da imagem";
      },
      hasUsableCredentials: async () => null,
    },
  });
}

/** Unique per-test payload — the test name lands inside the base64 content. */
function bodyWithImage(uniqueRef: string): Record<string, unknown> {
  return {
    model: "auto/bridge-stats",
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

const context = { model: "auto/bridge-stats", log: console };

test("describe path records bridged use; identical repeat counts a cache hit", async () => {
  const before = getBridgeStats().vision;
  const counter = { calls: 0 };
  const guardrail = statsGuardrail(counter);

  await guardrail.preCall(bodyWithImage("bridge-stats-hit-test"), context);
  const afterFirst = getBridgeStats().vision;
  assert.ok(afterFirst.bridged >= before.bridged + 1, "successful describe must count as bridged");
  assert.ok(typeof afterFirst.lastUsedAt === "string", "lastUsedAt must be stamped");

  await guardrail.preCall(bodyWithImage("bridge-stats-hit-test"), context);
  const afterSecond = getBridgeStats().vision;
  assert.equal(counter.calls, 1, "second identical request must be served from the cache");
  assert.ok(afterSecond.bridged >= afterFirst.bridged + 1, "cache-served describe still bridged");
  assert.ok(afterSecond.cacheHits >= afterFirst.cacheHits + 1, "cache hit must be counted");
});

test("failed describe records a failure", async () => {
  const before = getBridgeStats().vision;
  const guardrail = statsGuardrail({ calls: 0 }, { failAlways: true });

  await guardrail.preCall(bodyWithImage("bridge-stats-failure-test"), context);
  const after = getBridgeStats().vision;
  assert.ok(after.failures >= before.failures + 1, "failed describe must count as failure");
});
