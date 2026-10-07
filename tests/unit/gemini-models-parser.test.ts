import test from "node:test";
import assert from "node:assert/strict";

import { parseGeminiModelsList } from "../../src/lib/providerModels/geminiModelsParser";

// A representative slice of the live generativelanguage v1beta/models response.
const SAMPLE = {
  models: [
    {
      name: "models/gemini-2.5-flash",
      displayName: "Gemini 2.5 Flash",
      inputTokenLimit: 1048576,
      outputTokenLimit: 65536,
      supportedGenerationMethods: ["generateContent", "countTokens", "batchGenerateContent"],
      thinking: true,
    },
    {
      name: "models/gemini-3.5-flash",
      displayName: "Gemini 3.5 Flash",
      supportedGenerationMethods: ["generateContent"],
    },
    {
      name: "models/gemini-3.5-flash-lite",
      displayName: "Gemini 3.5 Flash Lite",
      supportedGenerationMethods: ["generateContent"],
    },
    {
      name: "models/gemini-3-pro-image-preview",
      displayName: "Gemini 3 Pro Image Preview",
      supportedGenerationMethods: ["generateContent", "countTokens"],
    },
    {
      name: "models/text-embedding-004",
      displayName: "Text Embedding 004",
      supportedGenerationMethods: ["embedContent"],
    },
    {
      name: "models/gemini-live-2.5-flash",
      displayName: "Gemini Live",
      supportedGenerationMethods: ["bidiGenerateContent"],
    },
    {
      name: "models/veo-3.0-generate-001",
      displayName: "Veo 3.0",
      supportedGenerationMethods: ["predictLongRunning"],
    },
  ],
};

test("parseGeminiModelsList strips the models/ prefix and maps display name", () => {
  const models = parseGeminiModelsList(SAMPLE);
  const flash = models.find((m) => m.id === "gemini-2.5-flash");
  assert.ok(flash, "gemini-2.5-flash should be present");
  assert.equal(flash!.name, "Gemini 2.5 Flash");
  assert.equal(flash!.inputTokenLimit, 1048576);
  assert.equal(flash!.outputTokenLimit, 65536);
  assert.equal(flash!.supportsThinking, true);
  assert.deepEqual(flash!.supportedEndpoints, ["chat"]);
});

test("parseGeminiModelsList excludes retired Gemini 3.5 Flash but keeps Flash Lite", () => {
  const ids = parseGeminiModelsList(SAMPLE).map((model) => model.id);
  assert.equal(ids.includes("gemini-3.5-flash"), false);
  assert.equal(ids.includes("gemini-3.5-flash-lite"), true);
});

test("parseGeminiModelsList maps generateContent image models to the chat endpoint", () => {
  const models = parseGeminiModelsList(SAMPLE);
  const proImage = models.find((m) => m.id === "gemini-3-pro-image-preview");
  assert.ok(proImage, "gemini-3-pro-image-preview should be present");
  // gemini-*-image models generate images via generateContent (chat-with-modalities path).
  assert.deepEqual(proImage!.supportedEndpoints, ["chat"]);
});

test("parseGeminiModelsList maps embeddings without advertising unsupported Gemini Live", () => {
  const models = parseGeminiModelsList(SAMPLE);
  assert.deepEqual(models.find((m) => m.id === "text-embedding-004")!.supportedEndpoints, [
    "embeddings",
  ]);
  assert.equal(models.some((m) => m.id === "gemini-live-2.5-flash"), false);
  const [hybrid] = parseGeminiModelsList({
    models: [
      {
        name: "models/gemini-live-hybrid",
        supportedGenerationMethods: ["generateContent", "bidiGenerateContent"],
      },
    ],
  });
  assert.deepEqual(hybrid.supportedEndpoints, ["chat"]);
});

test("parseGeminiModelsList maps Veo predictLongRunning models to the videos endpoint", () => {
  const models = parseGeminiModelsList(SAMPLE);
  const veo = models.find((m) => m.id === "veo-3.0-generate-001");
  assert.ok(veo, "veo-3.0-generate-001 should be present");
  assert.deepEqual(veo!.supportedEndpoints, ["videos"]);
});

test("parseGeminiModelsList defaults to chat and tolerates empty/missing input", () => {
  assert.deepEqual(parseGeminiModelsList({}), []);
  assert.deepEqual(parseGeminiModelsList(null), []);
  const [m] = parseGeminiModelsList({ models: [{ name: "models/mystery" }] });
  assert.equal(m.id, "mystery");
  assert.deepEqual(m.supportedEndpoints, ["chat"]);
});
