import test from "node:test";
import assert from "node:assert/strict";

const { FACTORY_MODELS } = await import("../../open-sse/config/factoryModels.ts");
const {
  FACTORY_CLIENT_VERSION,
  FACTORY_API,
  resolveFactoryModelContract,
  resolveFactoryApiBase,
  validateHostedFactoryApiOrigin,
  factoryApiForRegion,
  normalizeFactoryModelId,
} = await import("../../open-sse/config/factory.ts");
const { getModelTargetFormat } = await import("../../open-sse/config/providerModels.ts");
const { resolveReasoningTransport } =
  await import("../../open-sse/services/reasoningInputPolicy.ts");
const { resolvePublicCred } = await import("../../open-sse/utils/publicCreds.ts");

test("Factory catalog projects 73 Droid models in source order", () => {
  assert.equal(FACTORY_MODELS.length, 73);
  assert.equal(FACTORY_MODELS[0]?.id, "claude-fable-5.1");
  assert.equal(FACTORY_MODELS[17]?.id, "claude-haiku-4-5-20251001");
  assert.equal(FACTORY_MODELS[43]?.id, "inkling");
  assert.equal(FACTORY_MODELS[60]?.id, "minimax-m3");
  assert.equal(FACTORY_MODELS[63]?.id, "nemotron-3-ultra");
  assert.equal(FACTORY_MODELS[72]?.id, "garnet-07-15");
});

test("Factory Chat models declare interleaved reasoning_content", () => {
  const kimi = FACTORY_MODELS.find((model) => model.id === "kimi-k2.6");
  assert.equal(kimi?.targetFormat, "openai");
  assert.equal(kimi?.interleavedField, "reasoning_content");
  const haiku = FACTORY_MODELS.find((model) => model.id === "claude-haiku-4-5-20251001");
  assert.equal(haiku?.supportsReasoning, undefined);
  assert.equal(haiku?.interleavedField, undefined);
});

test("MiniMax M3 uses Messages, fireworks, and Core", () => {
  const contract = resolveFactoryModelContract("minimax-m3");
  assert.deepEqual(contract, {
    targetFormat: "claude",
    path: "/api/llm/a/v1/messages",
    upstreamProvider: "fireworks",
    quotaTier: "core",
  });
});

test("Factory routing table matches Droid family/upstream/tier", () => {
  assert.deepEqual(resolveFactoryModelContract("factory/claude-haiku-4-5-20251001"), {
    targetFormat: "claude",
    path: "/api/llm/a/v1/messages",
    upstreamProvider: "anthropic",
    quotaTier: "standard",
  });
  assert.deepEqual(resolveFactoryModelContract("gpt-5.4-mini"), {
    targetFormat: "openai-responses",
    path: "/api/llm/o/v1/responses",
    upstreamProvider: "openai",
    quotaTier: "standard",
  });
  assert.deepEqual(resolveFactoryModelContract("grok-4.6"), {
    targetFormat: "openai-responses",
    path: "/api/llm/o/v1/responses",
    upstreamProvider: "xai",
    quotaTier: "standard",
  });
  assert.deepEqual(resolveFactoryModelContract("gemini-3-flash-preview"), {
    targetFormat: "gemini",
    path: "/api/llm/g/v1/generate",
    upstreamProvider: "google",
    quotaTier: "standard",
  });
  assert.deepEqual(resolveFactoryModelContract("kimi-k2.6"), {
    targetFormat: "openai",
    path: "/api/llm/o/v1/chat/completions",
    upstreamProvider: "fireworks",
    quotaTier: "core",
  });
  assert.deepEqual(resolveFactoryModelContract("mistral-medium-3.5"), {
    targetFormat: "openai",
    path: "/api/llm/o/v1/chat/completions",
    upstreamProvider: "mistral",
    quotaTier: "core",
  });
  assert.equal(resolveFactoryModelContract("unknown-model"), null);
  assert.equal(resolveFactoryModelContract("openai/gpt-5.4-mini"), null);
});

test("getModelTargetFormat uses the Factory resolver for dynamic IDs", () => {
  assert.equal(getModelTargetFormat("factory", "claude-haiku-4-5-20251001"), "claude");
  assert.equal(getModelTargetFormat("factory", "factory/gpt-5.4-mini"), "openai-responses");
  assert.equal(getModelTargetFormat("factory", "kimi-k2.6"), "openai");
  assert.equal(getModelTargetFormat("factory", "gemini-3-flash-preview"), "gemini");
  assert.equal(getModelTargetFormat("factory", "minimax-m3"), "claude");
  assert.equal(getModelTargetFormat("factory", "not-a-factory-model"), null);
});

test("Factory reasoning transport is model-aware", () => {
  assert.equal(resolveReasoningTransport("factory", false, "gpt-5.4-mini"), "opaque");
  assert.equal(resolveReasoningTransport("factory", false, "kimi-k2.6"), "plaintext");
  assert.equal(
    resolveReasoningTransport("factory", false, "claude-haiku-4-5-20251001"),
    "plaintext"
  );
  assert.equal(resolveReasoningTransport("factory", true, "claude-haiku-4-5-20251001"), "opaque");
  assert.equal(resolveReasoningTransport("codex"), "opaque");
});

test("Factory origin validation rejects unsafe endpoints", () => {
  assert.equal(validateHostedFactoryApiOrigin("https://api.factory.ai"), FACTORY_API);
  assert.equal(factoryApiForRegion("eu"), "https://api.eu.factory.ai");
  assert.equal(factoryApiForRegion("europe"), "https://api.eu.factory.ai");
  assert.throws(() => validateHostedFactoryApiOrigin("http://api.factory.ai"));
  assert.throws(() => validateHostedFactoryApiOrigin("https://user:pass@api.factory.ai"));
  assert.throws(() => validateHostedFactoryApiOrigin("https://api.factory.ai/v1"));
  assert.throws(() => validateHostedFactoryApiOrigin("https://api.factory.ai:8443"));
  assert.throws(() => validateHostedFactoryApiOrigin("https://evil.example/"));
  assert.throws(() => factoryApiForRegion("not a region"));
  assert.equal(normalizeFactoryModelId("factory/kimi-k2.6"), "kimi-k2.6");
  assert.equal(resolveFactoryApiBase(null), FACTORY_API);
  assert.equal(resolveFactoryApiBase({ region: "eu" }), "https://api.eu.factory.ai");
});

test("Factory WorkOS client id resolves through factory_id", () => {
  assert.equal(FACTORY_CLIENT_VERSION, "0.224.1");
  assert.equal(resolvePublicCred("factory_id"), "client_01HNM792M5G5G1A2THWPXKFMXB");
});
