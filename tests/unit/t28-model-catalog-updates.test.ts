import test from "node:test";
import assert from "node:assert/strict";

import { getModelInfoCore } from "../../open-sse/services/model.ts";
import { REGISTRY } from "../../open-sse/config/providerRegistry.ts";
import { getStaticModelsForProvider } from "../../src/lib/providers/staticModels.ts";

test("T28: gemini AI Studio catalog includes current preview models", () => {
  // Gemini (AI Studio) carries a small hardcoded fallback for first-run UX when no
  // API key has been added yet; the full catalog is populated by API sync via
  // /api/providers/:id/models with pageSize=1000 once a key exists.
  const geminiIds = REGISTRY.gemini.models.map((m) => m.id);
  assert.ok(geminiIds.includes("gemini-3.1-pro-preview"));
  assert.ok(geminiIds.includes("gemini-3-flash-preview"));
  assert.ok(geminiIds.includes("gemini-3.1-flash-lite-preview"));
  assert.ok(geminiIds.includes("gemini-3.5-flash"));
  assert.ok(geminiIds.includes("gemini-2.5-flash"));
  assert.ok(geminiIds.includes("gemini-2.5-pro"));
  assert.equal(geminiIds[0], "gemini-2.0-flash", "preserve the existing Gemini default");
});

test("T28: antigravity static catalog exposes client-visible Gemini tier IDs", () => {
  const staticIds = (getStaticModelsForProvider("antigravity") || []).map((m) => m.id);

  assert.ok(staticIds.includes("gemini-3-pro-preview"));
  assert.ok(staticIds.includes("gemini-3.5-flash-low"));
  assert.ok(staticIds.includes("gemini-3.5-flash-medium"));
  assert.ok(staticIds.includes("gemini-3.5-flash-high"));
  assert.ok(staticIds.includes("gemini-3.1-pro-low"));
  assert.ok(staticIds.includes("gemini-3.1-pro-high"));
  // Legacy aliases that were never client-visible stay absent.
  assert.ok(!staticIds.includes("gemini-3-pro-high"));
  assert.ok(!staticIds.includes("gemini-3-flash-preview"));
  assert.ok(!staticIds.includes("gemini-3-flash-agent"));
  assert.ok(!staticIds.includes("gemini-claude-sonnet-4-5"));
  assert.ok(!staticIds.includes("gemini-claude-sonnet-4-5-thinking"));
  assert.ok(!staticIds.includes("gemini-claude-opus-4-5-thinking"));
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

  assert.ok(vertexIds.includes("DeepSeek-V4-Flash"));
  assert.ok(vertexIds.includes("DeepSeek-V4-Pro"));
  assert.ok(vertexIds.includes("Qwen3.6-35B-A3B"));
  assert.ok(vertexIds.includes("GLM-5.1-FP8"));
});

test("T28: volcengine (Ark) catalog includes DeepSeek V4 models", () => {
  const volcengineIds = REGISTRY.volcengine.models.map((m) => m.id);

  assert.ok(
    volcengineIds.includes("DeepSeek-V4-Flash"),
    "volcengine Ark must list DeepSeek-V4-Flash"
  );
  assert.ok(volcengineIds.includes("DeepSeek-V4-Pro"), "volcengine Ark must list DeepSeek-V4-Pro");
  // Existing models must still be present
  assert.ok(volcengineIds.includes("deepseek-v3-2-251201"));
  assert.ok(volcengineIds.includes("kimi-k2-5-260127"));
  assert.ok(volcengineIds.includes("glm-4-7-251222"));
});

test("T28: new catalog models resolve through getModelInfoCore", async () => {
  const minimax = await getModelInfoCore("minimax/MiniMax-M2.7", {});
  assert.equal(minimax.provider, "minimax");
  assert.equal(minimax.model, "MiniMax-M2.7");

  const flashLite = await getModelInfoCore("gemini/gemini-3.1-flash-lite-preview", {});
  assert.equal(flashLite.provider, "gemini");
  assert.equal(flashLite.model, "gemini-3.1-flash-lite-preview");

  const flashPreview = await getModelInfoCore("gemini/gemini-3-flash-preview", {});
  assert.equal(flashPreview.provider, "gemini");
  assert.equal(flashPreview.model, "gemini-3-flash-preview");

  const vertexPartner = await getModelInfoCore("vertex/Qwen3.6-35B-A3B", {});
  assert.equal(vertexPartner.provider, "vertex");
  assert.equal(vertexPartner.model, "Qwen3.6-35B-A3B");
});
