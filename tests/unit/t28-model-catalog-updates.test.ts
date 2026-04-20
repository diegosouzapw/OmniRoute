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

test("T28: antigravity static catalog exposes client-visible Gemini preview IDs", () => {
  const staticIds = (getStaticModelsForProvider("antigravity") || []).map((m) => m.id);

  assert.ok(staticIds.includes("gemini-3-pro-preview"));
  assert.ok(staticIds.includes("gemini-3.1-pro-low"));
  assert.ok(staticIds.includes("gemini-3-flash-preview"));
  assert.ok(!staticIds.includes("gemini-3-pro-high"));
  assert.ok(!staticIds.includes("gemini-3.1-pro-high"));
});

test("T28: github registry exposes Gemini 3.1 Pro Preview and keeps legacy alias compatibility", async () => {
  const githubIds = REGISTRY.github.models.map((m) => m.id);

  assert.ok(githubIds.includes("gemini-3.1-pro-preview"));
  assert.ok(githubIds.includes("gemini-3-pro-preview"));
  assert.ok(githubIds.includes("gemini-3-flash-preview"));
  assert.ok(githubIds.includes("gpt-5.3-codex"));
  assert.ok(githubIds.includes("gpt-5.4"));
  assert.ok(githubIds.includes("gpt-5.4-mini"));
  assert.ok(githubIds.includes("claude-sonnet-4.6"));

  const canonical = await getModelInfoCore("gh/gemini-3.1-pro-preview", {});
  assert.equal(canonical.provider, "github");
  assert.equal(canonical.model, "gemini-3.1-pro-preview");

  const legacy = await getModelInfoCore("gh/gemini-3-pro", {});
  assert.equal(legacy.provider, "github");
  assert.equal(legacy.model, "gemini-3.1-pro-preview");

  const responsesOnly = await getModelInfoCore("gh/gpt-5.4", {});
  assert.equal(responsesOnly.provider, "github");
  assert.equal(responsesOnly.model, "gpt-5.4");
});

test("T28: kiro-family registries expose the expanded Kiro, Amazon Q and CodeBuddy catalogs", async () => {
  const kiroIds = REGISTRY.kiro.models.map((m) => m.id);
  const amazonIds = REGISTRY["amazon-q"].models.map((m) => m.id);
  const codebuddyIds = REGISTRY.codebuddy.models.map((m) => m.id);

  assert.ok(kiroIds.includes("kiro-claude-sonnet-4-6"));
  assert.ok(kiroIds.includes("kiro-qwen3-coder-next-agentic"));
  assert.ok(amazonIds.includes("amazonq-auto"));
  assert.ok(amazonIds.includes("amazonq-claude-opus-4.5"));
  assert.ok(codebuddyIds.includes("glm-5.1"));
  assert.ok(codebuddyIds.includes("kimi-k2-thinking"));

  const kiro = await getModelInfoCore("kiro/kiro-claude-sonnet-4-6", {});
  assert.equal(kiro.provider, "kiro");
  assert.equal(kiro.model, "kiro-claude-sonnet-4-6");

  const amazon = await getModelInfoCore("amazon-q/amazonq-auto", {});
  assert.equal(amazon.provider, "amazon-q");
  assert.equal(amazon.model, "amazonq-auto");

  const codebuddy = await getModelInfoCore("codebuddy/glm-5.1", {});
  assert.equal(codebuddy.provider, "codebuddy");
  assert.equal(codebuddy.model, "glm-5.1");
});

test("T28: gitlab duo registries expose static OAuth and PAT model catalogs with target formats", async () => {
  const patIds = REGISTRY["gitlab-duo"].models.map((m) => m.id);
  const oauthIds = REGISTRY["gitlab-duo-oauth"].models.map((m) => m.id);

  assert.ok(patIds.includes("duo-chat-sonnet-4-6"));
  assert.ok(patIds.includes("duo-chat-gpt-5-2"));
  assert.ok(oauthIds.includes("duo-chat-opus-4-6"));
  assert.ok(oauthIds.includes("duo-chat-gpt-5-codex"));

  const claudeModel = REGISTRY["gitlab-duo-oauth"].models.find(
    (m) => m.id === "duo-chat-sonnet-4-6"
  );
  const openaiModel = REGISTRY["gitlab-duo-oauth"].models.find((m) => m.id === "duo-chat-gpt-5-2");
  assert.equal(claudeModel?.targetFormat, "claude");
  assert.equal(openaiModel?.targetFormat, undefined);

  const gitlabClaude = await getModelInfoCore("gitlab-oauth/duo-chat-sonnet-4-6", {});
  assert.equal(gitlabClaude.provider, "gitlab-duo-oauth");
  assert.equal(gitlabClaude.model, "duo-chat-sonnet-4-6");

  const gitlabGpt = await getModelInfoCore("gitlab-duo/duo-chat-gpt-5-2", {});
  assert.equal(gitlabGpt.provider, "gitlab-duo");
  assert.equal(gitlabGpt.model, "duo-chat-gpt-5-2");
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

test("T28: azure ai catalog exposes Foundry chat models and Claude target formats", async () => {
  const azureIds = REGISTRY["azure-ai"].models.map((m) => m.id);
  const claudeModel = REGISTRY["azure-ai"].models.find((m) => m.id === "claude-sonnet-4-6");
  const grokModel = REGISTRY["azure-ai"].models.find((m) => m.id === "grok-4");

  assert.ok(azureIds.includes("claude-sonnet-4-6"));
  assert.ok(azureIds.includes("gpt-oss-120b"));
  assert.ok(azureIds.includes("Phi-4"));
  assert.equal(claudeModel?.targetFormat, "claude");
  assert.equal(grokModel?.targetFormat, undefined);

  const azureClaude = await getModelInfoCore("azure-ai/claude-sonnet-4-6", {});
  assert.equal(azureClaude.provider, "azure-ai");
  assert.equal(azureClaude.model, "claude-sonnet-4-6");

  const azureGrok = await getModelInfoCore("azure-ai/grok-4", {});
  assert.equal(azureGrok.provider, "azure-ai");
  assert.equal(azureGrok.model, "grok-4");
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
