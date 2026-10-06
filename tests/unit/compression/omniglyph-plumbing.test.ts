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

const openaiBody = () => ({
  model: "gpt-5.6",
  messages: [
    { role: "system", content: DENSE },
    { role: "user", content: "oi" },
  ],
});

const responsesBody = () => ({
  model: "gpt-5.6",
  instructions: DENSE,
  input: [{ type: "message", role: "user", content: [{ type: "input_text", text: "oi" }] }],
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
    imageTransportFidelity: "byte-preserving",
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

test("stacked pós-tradução preserva o wire OpenAI Chat e executa OmniGlyph nativo", async () => {
  registerBuiltinCompressionEngines();
  const r = await applyCompressionAsync(openaiBody(), "stacked", {
    model: "gpt-5.6",
    supportsVision: true,
    providerTransport: "direct",
    imageTransportFidelity: "byte-preserving",
    sourceFormat: "openai",
    targetFormat: "openai",
    compressionStage: "post-translation",
    config: { stackedPipeline: [{ engine: "rtk" }, { engine: "omniglyph" }] } as never,
  });
  const omniglyphStep = r.stats?.engineBreakdown?.find((e) => e.engine === "omniglyph");
  assert.ok(omniglyphStep);
  assert.ok(omniglyphStep!.techniquesUsed.includes("omniglyph:context-as-image"));
  assert.equal(r.compressed, true);
  assert.ok(JSON.stringify(r.body).includes('"type":"image_url"'));
  assert.ok(
    r.stats?.validationWarnings?.some((warning) => warning.includes("rtk: skipped (stage")),
    "engines sem suporte ao estágio devem ser explicitamente pulados"
  );
});

test("stacked pós-tradução não adapta input[] Responses para messages[] antes do OmniGlyph", async () => {
  registerBuiltinCompressionEngines();
  const r = await applyCompressionAsync(responsesBody(), "stacked", {
    model: "gpt-5.6",
    supportsVision: true,
    providerTransport: "direct",
    imageTransportFidelity: "byte-preserving",
    sourceFormat: "openai-responses",
    targetFormat: "openai-responses",
    compressionStage: "post-translation",
    config: { stackedPipeline: [{ engine: "omniglyph" }] } as never,
  });
  assert.equal(r.compressed, true);
  assert.ok(JSON.stringify(r.body).includes('"type":"input_image"'));
  assert.ok(Array.isArray((r.body as { input?: unknown }).input));
});

test("OpenAI→Claude usa o wire traduzido sem uma segunda tradução", async () => {
  registerBuiltinCompressionEngines();
  const translatedClaudeBody = body();
  const r = await applyCompressionAsync(translatedClaudeBody, "omniglyph", {
    model: "claude-fable-5",
    supportsVision: true,
    providerTransport: "direct",
    imageTransportFidelity: "byte-preserving",
    sourceFormat: "openai",
    targetFormat: "claude",
    compressionStage: "post-translation",
  });
  assert.equal(r.compressed, true);
  assert.ok(JSON.stringify(r.body).includes('"type":"image"'));
  assert.ok(!JSON.stringify(r.body).includes('"type":"image_url"'));
});

test("Claude→OpenAI aguarda o wire alvo e não imageia o corpo fonte", async () => {
  registerBuiltinCompressionEngines();
  const pre = await applyCompressionAsync(body(), "omniglyph", {
    model: "claude-fable-5",
    supportsVision: true,
    providerTransport: "direct",
    imageTransportFidelity: "byte-preserving",
    sourceFormat: "claude",
    targetFormat: "openai",
    compressionStage: "pre-translation",
  });
  assert.equal(pre.compressed, false);
  assert.ok(pre.stats?.techniquesUsed.includes("skip:requires_post_translation"));

  const post = await applyCompressionAsync(
    {
      model: "gpt-5.6",
      messages: [
        { role: "system", content: DENSE },
        { role: "user", content: "oi" },
      ],
    },
    "omniglyph",
    {
      model: "gpt-5.6",
      supportsVision: true,
      providerTransport: "direct",
      imageTransportFidelity: "byte-preserving",
      sourceFormat: "claude",
      targetFormat: "openai",
      compressionStage: "post-translation",
    }
  );
  assert.equal(post.compressed, true);
  assert.ok(JSON.stringify(post.body).includes('"type":"image_url"'));
});

// O `provider` é threaded explicitamente por cada camada do selector (não é um
// spread cego), então uma camada nova pode derrubá-lo em silêncio: a
// contabilidade cairia para `unknown` e passaria a recusar a semântica de cache
// sem nenhum erro aparecer.
test("provider chega do selector até a contabilidade da engine", async () => {
  registerBuiltinCompressionEngines();
  const r = await applyCompressionAsync(body(), "stacked", {
    model: "claude-fable-5",
    provider: "anthropic",
    supportsVision: true,
    providerTransport: "direct",
    imageTransportFidelity: "byte-preserving",
    config: { stackedPipeline: [{ engine: "omniglyph" }] } as never,
  });
  assert.equal(r.compressed, true);
  const omniglyphStep = r.stats?.engineBreakdown?.find((e) => e.engine === "omniglyph");
  assert.ok(omniglyphStep, "omniglyph step deveria aparecer no engineBreakdown");
  assert.equal(
    omniglyphStep!.omniglyph?.provider,
    "anthropic",
    "sem o provider a contabilidade cai para unknown e recusa a semântica de cache"
  );
  assert.equal(omniglyphStep!.omniglyph?.savings.evidence, "bytes-only");
});
