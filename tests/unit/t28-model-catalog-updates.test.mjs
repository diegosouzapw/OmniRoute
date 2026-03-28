import test from "node:test";
import assert from "node:assert/strict";

import { getModelInfoCore } from "../../open-sse/services/model.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { getStaticModelsForProvider } from "../../src/app/api/providers/[id]/models/route.ts";

test("T28: gemini catalog includes preview models from 9router", () => {
  const geminiIds = REGISTRY.gemini.models.map((m) => m.id);
  const geminiCliIds = REGISTRY["gemini-cli"].models.map((m) => m.id);

  assert.ok(geminiIds.includes("gemini-3.1-flash-lite-preview"));
  assert.ok(geminiIds.includes("gemini-3-flash-preview"));
  assert.ok(geminiCliIds.includes("gemini-3.1-flash-lite-preview"));
  assert.ok(geminiCliIds.includes("gemini-3-flash-preview"));
});

test("T28: antigravity static catalog includes Gemini 3.1 preview fallbacks", () => {
  const staticIds = (getStaticModelsForProvider("antigravity") || []).map((m) => m.id);

  assert.ok(staticIds.includes("gemini-3.1-pro-preview"));
  assert.ok(staticIds.includes("gemini-3.1-flash-lite-preview"));
});

test("T28: qwen registry uses DashScope-compatible base URL", () => {
  assert.equal(
    REGISTRY.qwen.baseUrl,
    "https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions"
  );
});

test("T28: vertex catalog includes partner models when vertex executor is available", () => {
  const vertexIds = REGISTRY.vertex.models.map((m) => m.id);

  assert.ok(vertexIds.includes("deepseek-v3.2"));
  assert.ok(vertexIds.includes("qwen3-next-80b"));
  assert.ok(vertexIds.includes("glm-5"));
});

test("T28: new catalog models resolve through getModelInfoCore", async () => {
  const minimax = await getModelInfoCore("minimax/minimax-m2.7", {});
  assert.equal(minimax.provider, "minimax");
  assert.equal(minimax.model, "minimax-m2.7");

  const flashLite = await getModelInfoCore("gemini/gemini-3.1-flash-lite-preview", {});
  assert.equal(flashLite.provider, "gemini");
  assert.equal(flashLite.model, "gemini-3.1-flash-lite-preview");

  const flashPreview = await getModelInfoCore("gemini/gemini-3-flash-preview", {});
  assert.equal(flashPreview.provider, "gemini");
  assert.equal(flashPreview.model, "gemini-3-flash-preview");

  const vertexPartner = await getModelInfoCore("vertex/qwen3-next-80b", {});
  assert.equal(vertexPartner.provider, "vertex");
  assert.equal(vertexPartner.model, "qwen3-next-80b");
});
