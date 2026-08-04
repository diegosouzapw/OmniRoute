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

// Agora que `estimateCompressionTokens` (stats.ts) é image-aware (Task 6), o guard
// honesto de inflação agregada do stacked (`guardPipelineInflation` em
// pipelineGuards.ts) não reverte mais a saída imageada do omniglyph: o estimador
// conta o bloco de imagem pelo billing real (patches 28px + overhead), não pelo
// char-count do base64. Este teste cobre tanto o plumbing de `providerTransport`
// (Task 5) quanto a saída final ponta a ponta (Task 6).
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
  assert.equal(r.compressed, true);
  assert.ok(
    JSON.stringify(r.body).includes('"type":"image"'),
    "stacked mantém a saída imageada (guard não reverte mais)"
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
