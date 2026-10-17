import test from "node:test";
import assert from "node:assert/strict";
import { normalizeDiscoveredModels } from "../../src/lib/providerModels/modelDiscovery.ts";
import { normalizeSyncedAvailableModels } from "../../src/lib/db/models/synced.ts";
import { parseGeminiModelsList } from "../../src/lib/providerModels/geminiModelsParser.ts";

test("#16929: endpoint provenance survives the synced catalog round trip", () => {
  const unknown = normalizeDiscoveredModels([{ id: "unknown-model" }], "openai");
  const declared = normalizeDiscoveredModels([
    { id: "multi", supportedEndpoints: ["chat", "embeddings"] },
  ], "openai");
  const inferred = normalizeDiscoveredModels([
    { id: "bge-reranker-large", type: "rerank" },
  ], "local");
  assert.equal(unknown[0].endpointCapabilitySource, "defaulted");
  assert.equal(declared[0].endpointCapabilitySource, "declared");
  assert.equal(inferred[0].endpointCapabilitySource, "inferred");
  const readBack = normalizeSyncedAvailableModels(JSON.parse(JSON.stringify([
    ...unknown, ...declared, ...inferred,
  ])));
  assert.deepEqual(readBack.map((m) => m.endpointCapabilitySource),
    ["defaulted", "declared", "inferred"]);
  assert.deepEqual(readBack[1].supportedEndpoints, ["chat", "embeddings"]);
  assert.deepEqual(readBack[2].supportedEndpoints, ["rerank"]);
});

test("#16929: Gemini generic generateContent stays defaulted while specialty IDs are inferred", () => {
  const models = parseGeminiModelsList({ models: [
    { name: "models/gemini-3.8-flash", supportedGenerationMethods: ["generateContent"] },
    { name: "models/gemini-3.5-transcribe", supportedGenerationMethods: ["generateContent"] },
    { name: "models/gemini-3.8-flash-tts", supportedGenerationMethods: ["generateContent"] },
    { name: "models/lyria-realtime-exp", supportedGenerationMethods: ["generateContent"] },
    { name: "models/text-embedding-004", supportedGenerationMethods: ["embedContent"] },
  ] });
  assert.deepEqual(models.map((m) => m.endpointCapabilitySource),
    ["defaulted", "inferred", "inferred", "inferred", "declared"]);
  assert.deepEqual(models.map((m) => m.supportedEndpoints),
    [["chat"], ["audio-transcriptions"], ["audio-speech"], ["music"], ["embeddings"]]);
  assert.equal(normalizeDiscoveredModels(models, "gemini")[1].endpointCapabilitySource, "inferred");
});
