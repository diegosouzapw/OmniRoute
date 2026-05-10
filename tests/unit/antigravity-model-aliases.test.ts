import test from "node:test";
import assert from "node:assert/strict";

import {
  isUserCallableAntigravityModelId,
  resolveAntigravityModelId,
  toClientAntigravityModelId,
} from "../../open-sse/config/antigravityModelAliases.ts";
import { AntigravityExecutor } from "../../open-sse/executors/antigravity.ts";
import { openaiToAntigravityRequest } from "../../open-sse/translator/request/openai-to-gemini.ts";

test("resolveAntigravityModelId maps the documented Antigravity aliases to upstream IDs", () => {
  assert.equal(resolveAntigravityModelId("gemini-3-pro-preview"), "gemini-3.1-pro-high");
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
  assert.equal(toClientAntigravityModelId("gemini-3-flash"), "gemini-3-flash-preview");
  assert.equal(toClientAntigravityModelId("gpt-oss-120b-medium"), "gpt-oss-120b-medium");
  assert.equal(toClientAntigravityModelId("claude-sonnet-4-6"), "claude-sonnet-4-6");
  assert.equal(toClientAntigravityModelId("claude-opus-4-6-thinking"), "claude-opus-4-6-thinking");
});

test("isUserCallableAntigravityModelId only allows public chat-capable model IDs", () => {
  assert.equal(isUserCallableAntigravityModelId("gemini-3-pro-preview"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3.1-pro-high"), true);
  assert.equal(isUserCallableAntigravityModelId("claude-sonnet-4-6"), true);
  assert.equal(isUserCallableAntigravityModelId("gemini-3-flash-agent"), false);
  assert.equal(isUserCallableAntigravityModelId("tab_flash_lite_preview"), false);
  assert.equal(isUserCallableAntigravityModelId("unknown-model"), false);
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
