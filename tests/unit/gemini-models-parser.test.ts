import test from "node:test";
import assert from "node:assert/strict";

import { parseGeminiModelsList } from "../../src/lib/providerModels/geminiModelsParser";

// A representative slice of the live generativelanguage v1beta/models response — including the
// image models (gemini-*-image via generateContent, imagen-* via predict) that the Vertex catalog
// must surface dynamically.
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
      name: "models/gemini-3-pro-image-preview",
      displayName: "Gemini 3 Pro Image Preview",
      supportedGenerationMethods: ["generateContent", "countTokens"],
    },
    {
      name: "models/imagen-4.0-generate-001",
      displayName: "Imagen 4.0",
      supportedGenerationMethods: ["predict"],
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

test("parseGeminiModelsList maps generateContent image models to the chat endpoint", () => {
  const models = parseGeminiModelsList(SAMPLE);
  const proImage = models.find((m) => m.id === "gemini-3-pro-image-preview");
  assert.ok(proImage, "gemini-3-pro-image-preview should be present");
  // gemini-*-image models generate images via generateContent (chat-with-modalities path).
  assert.deepEqual(proImage!.supportedEndpoints, ["chat"]);
});

test("parseGeminiModelsList maps Imagen predict models to the images endpoint", () => {
  const models = parseGeminiModelsList(SAMPLE);
  const imagen = models.find((m) => m.id === "imagen-4.0-generate-001");
  assert.ok(imagen, "imagen-4.0-generate-001 should be present");
  assert.deepEqual(imagen!.supportedEndpoints, ["images"]);
});

test("parseGeminiModelsList maps embedContent and bidiGenerateContent", () => {
  const models = parseGeminiModelsList(SAMPLE);
  assert.deepEqual(
    models.find((m) => m.id === "text-embedding-004")!.supportedEndpoints,
    ["embeddings"]
  );
  assert.deepEqual(
    models.find((m) => m.id === "gemini-live-2.5-flash")!.supportedEndpoints,
    ["audio"]
  );
});

test("parseGeminiModelsList defaults to chat and tolerates empty/missing input", () => {
  assert.deepEqual(parseGeminiModelsList({}), []);
  assert.deepEqual(parseGeminiModelsList(null), []);
  const [m] = parseGeminiModelsList({ models: [{ name: "models/mystery" }] });
  assert.equal(m.id, "mystery");
  assert.deepEqual(m.supportedEndpoints, ["chat"]);
});
