import test from "node:test";
import assert from "node:assert/strict";

import { getModelInfoCore } from "../../open-sse/services/model.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { getStaticModelsForProvider } from "../../src/app/api/providers/[id]/models/route.ts";

test("T28: gemini-cli catalog includes preview models, gemini uses API sync", () => {
  // Gemini (AI Studio) no longer has a hardcoded registry — models come from
  // API sync via /api/providers/:id/models with pageSize=1000.
  const geminiIds = REGISTRY.gemini.models.map((m) => m.id);
  assert.equal(geminiIds.length, 0, "gemini models should be empty (populated by API sync)");

  // gemini-cli still has hardcoded models (Cloud Code doesn't have a models API)
  const geminiCliIds = REGISTRY["gemini-cli"].models.map((m) => m.id);
  assert.ok(geminiCliIds.includes("gemini-3.1-flash-lite-preview"));
  assert.ok(geminiCliIds.includes("gemini-3-flash-preview"));
});

test("T28: antigravity static catalog exposes current Gemini 3.1 model IDs", () => {
  const staticIds = (getStaticModelsForProvider("antigravity") || []).map((m) => m.id);

  assert.ok(staticIds.includes("gemini-3.1-pro-high"));
  assert.ok(staticIds.includes("gemini-3.1-pro-low"));
  assert.ok(staticIds.includes("gemini-3-flash"));
  assert.ok(!staticIds.includes("gemini-3-pro-high"));
  assert.ok(!staticIds.includes("gemini-3-pro-low"));
});

test("T28: github registry exposes Gemini 3.1 Pro Preview and keeps legacy alias compatibility", async () => {
  const githubIds = REGISTRY.github.models.map((m) => m.id);

  assert.ok(githubIds.includes("gemini-3.1-pro-preview"));

  const canonical = await getModelInfoCore("gh/gemini-3.1-pro-preview", {});
  assert.equal(canonical.provider, "github");
  assert.equal(canonical.model, "gemini-3.1-pro-preview");

  const legacy = await getModelInfoCore("gh/gemini-3-pro", {});
  assert.equal(legacy.provider, "github");
  assert.equal(legacy.model, "gemini-3.1-pro-preview");
});

test("T28: qwen registry uses native chat.qwen.ai base URL", () => {
  assert.equal(
    REGISTRY.qwen.baseUrl,
    "https://chat.qwen.ai/api/v1/services/aigc/text-generation/generation"
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
