import { test } from "node:test";
import assert from "node:assert";
import { applyCompressionAsync } from "../../../open-sse/services/compression/strategySelector.ts";
import { registerBuiltinCompressionEngines } from "../../../open-sse/services/compression/engines/index.ts";

const DENSE =
  "X".repeat(500) +
  "\n" +
  Array.from(
    { length: 400 },
    (_, i) => `const row_${i} = compute(${i * 17}, "${"v".repeat(80)}");`
  ).join("\n");

const body = () => ({
  model: "claude-fable-5",
  max_tokens: 128,
  system: DENSE,
  messages: [{ role: "user", content: [{ type: "text", text: "oi" }] }],
});

// NOTE: this asserts on the per-engine `engineBreakdown` entry (not the final
// `r.compressed`/`r.body`). The stacked pipeline's honest aggregate inflation guard
// (`guardPipelineInflation` in pipelineGuards.ts, unrelated to this task) reverts the
// final body whenever the naive char-based token estimator (`estimateCompressionTokens`
// in stats.ts) counts the base64-PNG output as "bigger" than the original text — which
// it always will for this fixture, since it doesn't understand real image-token billing.
// That is a pre-existing gap outside Task 5's scope (chatCore.ts + strategySelector.ts
// options plumbing only) — flagged in the task report, not fixed here. What this test
// verifies is squarely Task 5's job: that `providerTransport` reaches the per-engine
// options inside the stacked runner, so omniglyph actually RUNS instead of being
// skipped with `transport_not_direct`.
test("stacked com step omniglyph recebe providerTransport (engine roda, não é pulado por transporte)", async () => {
  registerBuiltinCompressionEngines();
  const r = await applyCompressionAsync(body(), "stacked", {
    model: "claude-fable-5",
    supportsVision: true,
    providerTransport: "direct",
    config: { stackedPipeline: [{ engine: "rtk" }, { engine: "omniglyph" }] } as never,
  });
  const omniglyphStep = r.stats?.engineBreakdown?.find((e) => e.engine === "omniglyph");
  assert.ok(omniglyphStep, "omniglyph step deveria aparecer no engineBreakdown");
  assert.ok(
    omniglyphStep!.techniquesUsed.includes("omniglyph:context-as-image"),
    `omniglyph deveria ter rodado (não pulado) — techniquesUsed=${JSON.stringify(
      omniglyphStep!.techniquesUsed
    )}`
  );
});

test("stacked sem providerTransport 'direct' pula omniglyph (transport_not_direct)", async () => {
  registerBuiltinCompressionEngines();
  const r = await applyCompressionAsync(body(), "stacked", {
    model: "claude-fable-5",
    supportsVision: true,
    // providerTransport ausente → fail-closed, omniglyph deve pular
    config: { stackedPipeline: [{ engine: "rtk" }, { engine: "omniglyph" }] } as never,
  });
  const omniglyphStep = r.stats?.engineBreakdown?.find((e) => e.engine === "omniglyph");
  assert.ok(omniglyphStep, "omniglyph step deveria aparecer no engineBreakdown mesmo pulado");
  assert.ok(omniglyphStep!.techniquesUsed.includes("skip:transport_not_direct"));
});
