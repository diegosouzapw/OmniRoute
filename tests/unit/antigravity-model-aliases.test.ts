import test from "node:test";
import assert from "node:assert/strict";

import {
  ANTIGRAVITY_PUBLIC_MODELS,
  getClientVisibleAntigravityModelName,
  isUserCallableAntigravityModelId,
  resolveAntigravityModelId,
  toClientAntigravityModelId,
} from "../../open-sse/config/antigravityModelAliases.ts";
import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import { openaiToAntigravityRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

function getPublicModel(id: string) {
  return ANTIGRAVITY_PUBLIC_MODELS.find((model) => model.id === id) as any;
}

test("resolveAntigravityModelId maps the documented Antigravity aliases to upstream IDs", () => {
  assert.equal(resolveAntigravityModelId("gemini-3-pro-preview"), "gemini-3.1-pro-high");
  assert.equal(resolveAntigravityModelId("gemini-3.5-flash-preview"), "gemini-3.5-flash-high");
  assert.equal(resolveAntigravityModelId("gemini-3-flash-preview"), "gemini-3-flash");
  assert.equal(resolveAntigravityModelId("gemini-3-pro-image-preview"), "gemini-3-pro-image");
  assert.equal(
    resolveAntigravityModelId("gemini-2.5-computer-use-preview-10-2025"),
    "rev19-uic3-1p"
  );
  assert.equal(resolveAntigravityModelId("gemini-claude-sonnet-4-5"), "claude-sonnet-4-6");
  assert.equal(resolveAntigravityModelId("gemini-claude-sonnet-4-5-thinking"), "claude-sonnet-4-6");
  assert.equal(
    resolveAntigravityModelId("gemini-claude-opus-4-5-thinking"),
    "claude-opus-4-6-thinking"
  );
  assert.equal(resolveAntigravityModelId("unknown-model"), "unknown-model");
});

test("toClientAntigravityModelId exposes client-visible aliases for known upstream IDs", () => {
  assert.equal(toClientAntigravityModelId("gemini-3.1-pro-high"), "gemini-3-pro-preview");
  assert.equal(toClientAntigravityModelId("gemini-3-flash-agent"), "gemini-3.5-flash-preview");
  assert.equal(toClientAntigravityModelId("gemini-3-flash"), "gemini-3-flash-preview");
  assert.equal(toClientAntigravityModelId("gpt-oss-120b-medium"), "gpt-oss-120b-medium");
  assert.equal(toClientAntigravityModelId("claude-sonnet-4-6"), "claude-sonnet-4-6");
  assert.equal(toClientAntigravityModelId("claude-opus-4-6-thinking"), "claude-opus-4-6-thinking");
});

test("isUserCallableAntigravityModelId only allows public chat-capable model IDs", () => {
  assert.equal(isUserCallableAntigravityModelId("gemini-3-pro-preview"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.1-pro-high"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.5-flash-preview"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3-flash-agent"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.5-flash-low"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.1-flash-lite"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-2.5-pro"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-2.5-flash"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-2.5-flash-lite"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-2.5-flash-thinking"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-pro-agent"), true);
  // Claude was removed from Antigravity 2.0's public catalog (May 2026); the alias is
  // kept for back-compat but the model is no longer user-callable.
  assert.equal(isUserCallableAntigravityModelId("claude-sonnet-4-6"), false);
  assert.equal(isUserCallableAntigravityModelId("tab_flash_lite_preview"), false);
  assert.equal(isUserCallableAntigravityModelId("unknown-model"), false);
});

test("ANTIGRAVITY_PUBLIC_MODELS exposes captured Antigravity 2.0.1 names and capabilities", () => {
  // Claude models were removed from Antigravity 2.0's public catalog (May 2026), so they
  // are no longer exposed as public models (the back-compat alias still resolves upstream).
  assert.equal(getPublicModel("claude-opus-4-6-thinking"), undefined);
  assert.deepEqual(getPublicModel("gemini-3.5-flash-preview"), {
    id: "gemini-3.5-flash-preview",
    name: "Gemini 3.5 Flash (High)",
    contextLength: 1048576,
    maxOutputTokens: 65536,
    supportsReasoning: true,
    supportsVision: true,
    toolCalling: true,
  });
  assert.equal(
    getClientVisibleAntigravityModelName("gemini-3.5-flash-low"),
    "Gemini 3.5 Flash (Low)"
  );
  assert.equal(getClientVisibleAntigravityModelName("gemini-2.5-flash"), "Gemini 2.5 Flash");
  assert.equal(
    getClientVisibleAntigravityModelName("gemini-2.5-flash-lite"),
    "Gemini 2.5 Flash Lite"
  );
  assert.equal(
    getClientVisibleAntigravityModelName("gemini-2.5-flash-thinking"),
    "Gemini 2.5 Flash Thinking"
  );
  assert.deepEqual(getPublicModel("gpt-oss-120b-medium"), {
    id: "gpt-oss-120b-medium",
    name: "GPT-OSS 120B (Medium)",
    contextLength: 131072,
    maxOutputTokens: 32768,
    supportsReasoning: true,
    toolCalling: true,
  });
  assert.equal(getPublicModel("gemini-3-pro-image-preview").contextLength, undefined);
  assert.equal(
    getPublicModel("gemini-2.5-computer-use-preview-10-2025").maxOutputTokens,
    undefined
  );
});

test("ANTIGRAVITY_PUBLIC_MODELS has no duplicate model IDs", () => {
  const ids = ANTIGRAVITY_PUBLIC_MODELS.map((model) => model.id);
  const seen = new Set<string>();
  const duplicates = ids.filter((id) => {
    if (seen.has(id)) return true;
    seen.add(id);
    return false;
  });
  assert.deepEqual(duplicates, [], `duplicate model IDs found: ${duplicates.join(", ")}`);
});

test("gemini-3-flash-agent keeps its Agent display name (not the Flash High duplicate)", () => {
  // A duplicate entry previously overwrote this name with "Gemini 3.5 Flash (High)"
  // because the id-keyed name map kept the last occurrence.
  assert.equal(
    getClientVisibleAntigravityModelName("gemini-3-flash-agent"),
    "Gemini 3.5 Flash Agent"
  );
});

test("AntigravityExecutor.transformRequest resolves alias models before dispatching upstream", async () => {
  const executor = new AntigravityExecutor();
  const result = await executor.transformRequest(
    "antigravity/gemini-3-pro-preview",
    {
      request: {
        contents: [{ role: "user", parts: [{ text: "Hello" }] }],
      },
    },
    true,
    { projectId: "project-1" }
  );

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  assert.equal(result.model, "gemini-3.1-pro-high");
});

test("AntigravityExecutor.transformRequest resolves Gemini 3.5 Flash alias upstream", async () => {
  const executor = new AntigravityExecutor();
  const result = await executor.transformRequest(
    "antigravity/gemini-3.5-flash-preview",
    {
      request: {
        contents: [{ role: "user", parts: [{ text: "Hello" }] }],
      },
    },
    true,
    { projectId: "project-1" }
  );

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  assert.equal(result.model, "gemini-3.5-flash-high");
});

test("AntigravityExecutor.transformRequest sends Claude through Gemini-compatible Cloud Code schema", async () => {
  const executor = new AntigravityExecutor();
  const bridged = openaiToAntigravityRequest(
    "claude-opus-4-6-thinking",
    {
      messages: [{ role: "user", content: "Hello" }],
      max_completion_tokens: 32_000,
      temperature: 0.5,
      reasoning_effort: "high",
    },
    true,
    { projectId: "project-1" } as any
  );

  const result = await executor.transformRequest(
    "antigravity/claude-opus-4-6-thinking",
    bridged,
    true,
    {
      projectId: "project-1",
    }
  );

  if (result instanceof Response) throw new Error("Unexpected Response from transformRequest");
  const request = result.request as any;
  assert.deepEqual(request.contents, [{ role: "user", parts: [{ text: "Hello" }] }]);
  assert.equal(request.generationConfig.maxOutputTokens, 32769);
  assert.equal(request.generationConfig.temperature, 0.5);
  assert.equal(request.generationConfig.topK, 40);
  assert.equal(request.generationConfig.topP, 1);
  assert.equal(request.messages, undefined);
  assert.equal(request.system, undefined);
  assert.equal(request.max_tokens, undefined);
  assert.equal(request.stream, undefined);
  assert.equal(request.temperature, undefined);
  assert.equal(request.thinking, undefined);
  assert.equal(request.generationConfig.thinkingConfig, undefined);
});
