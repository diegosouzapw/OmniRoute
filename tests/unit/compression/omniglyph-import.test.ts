import { test } from "node:test";
import assert from "node:assert";

test("pacote omniglyph exporta a API que o adapter consome", async () => {
  const mod = await import("omniglyph");
  assert.equal(typeof mod.transformAnthropicMessages, "function");
  assert.equal(typeof mod.transformOpenAIChatCompletions, "function");
  assert.equal(typeof mod.transformOpenAIResponses, "function");
  assert.equal(typeof mod.transformRequest, "function");
  assert.equal(typeof mod.isOmniGlyphSupportedModel, "function");
  assert.equal(typeof mod.isOmniGlyphSupportedGptModel, "function");
  assert.equal(mod.isOmniGlyphSupportedModel("claude-fable-5"), true);
  assert.equal(mod.isOmniGlyphSupportedModel("gpt-5.5"), false);

  const applicability = await import("omniglyph/applicability");
  assert.equal(typeof applicability.isModelImageable, "function");
});

// Superfícies introduzidas no 1.4.0. Sem esta asserção, uma remoção upstream só
// apareceria em runtime — o adapter importa esses símbolos diretamente.
test("omniglyph 1.4.0 exporta escopo de segurança, perfis e accounting", async () => {
  const mod = await import("omniglyph");

  // Gate de modelo por escopo explícito (não pela env do processo).
  assert.equal(typeof mod.isOmniGlyphSupportedModelForScope, "function");
  assert.equal(mod.isOmniGlyphSupportedModelForScope("claude-fable-5", "coding-safe"), true);
  assert.equal(mod.isOmniGlyphSupportedModelForScope("claude-sonnet-5", "coding-safe"), false);
  assert.equal(
    mod.isOmniGlyphSupportedModelForScope("claude-fable-5", "passthrough"),
    false,
    "passthrough não habilita modelo nenhum"
  );

  // Perfis semânticos.
  assert.equal(typeof mod.resolveCompressionProfile, "function");
  assert.equal(typeof mod.mergeCompressionProfileOptions, "function");
  assert.equal(typeof mod.shouldKeepToolResultSharp, "function");
  assert.equal(mod.resolveCompressionProfile("coding-safe").name, "coding-safe");
  assert.throws(() => mod.resolveCompressionProfile("nao-existe"));

  // Contabilidade física normalizada.
  assert.equal(typeof mod.normalizeAccounting, "function");
  assert.equal(typeof mod.providerActualInputTokens, "function");
});
