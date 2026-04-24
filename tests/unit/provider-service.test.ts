import test from "node:test";
import assert from "node:assert/strict";

import {
  buildProviderHeaders,
  buildProviderUrl,
  getProviderConfig,
  getProviderFallbackCount,
  getTargetFormat,
  hasThinkingConfig,
  isClaudeCodeCompatible,
  isLastMessageFromUser,
  normalizeThinkingConfig,
} from "../../open-sse/services/provider.ts";

test("OpenAI-compatible providers resolve responses URLs and formats", () => {
  const config = getProviderConfig("openai-compatible-responses-demo");
  const url = buildProviderUrl("openai-compatible-responses-demo", "gpt-4.1", false, {
    baseUrl: "https://proxy.example.com/v1/",
  });

  assert.equal(config.format, "openai-responses");
  assert.equal(url, "https://proxy.example.com/v1/responses");
  assert.equal(getTargetFormat("openai-compatible-responses-demo"), "openai-responses");
  assert.equal(getProviderFallbackCount("openai-compatible-responses-demo"), 1);
});

test("OpenAI-compatible legacy providers honor providerSpecificData.apiType", () => {
  const providerSpecificData = {
    apiType: "responses",
    baseUrl: "https://legacy-proxy.example.com/v1/",
  };
  const config = getProviderConfig("openai-compatible-sp-openai", providerSpecificData);
  const url = buildProviderUrl("openai-compatible-sp-openai", "gpt-5.4", false, {
    providerSpecificData,
  });

  assert.equal(config.format, "openai-responses");
  assert.equal(url, "https://legacy-proxy.example.com/v1/responses");
  assert.equal(
    getTargetFormat("openai-compatible-sp-openai", providerSpecificData),
    "openai-responses"
  );
});

test("Anthropic-compatible Claude Code providers use the Claude Code URL and headers", () => {
  const url = buildProviderUrl("anthropic-compatible-cc-demo", "claude-sonnet-4-6", false, {
    baseUrl: "https://proxy.example.com/v1/messages?beta=true",
  });
  const headers = buildProviderHeaders(
    "anthropic-compatible-cc-demo",
    {
      apiKey: "anthropic-token",
      providerSpecificData: { ccSessionId: "session-123" },
    },
    false
  );

  assert.equal(isClaudeCodeCompatible("anthropic-compatible-cc-demo"), true);
  assert.equal(url, "https://proxy.example.com/v1/messages?beta=true");
  assert.equal(headers["Authorization"], "Bearer anthropic-token");
  assert.equal(headers.Accept, "application/json");
  assert.equal(headers["X-Claude-Code-Session-Id"], "session-123");
  assert.equal(headers["anthropic-version"], "2023-06-01");
  assert.equal(getTargetFormat("anthropic-compatible-cc-demo"), "claude");
});

test("GitHub provider headers include request IDs and JSON accept for non-streaming requests", () => {
  const headers = buildProviderHeaders(
    "github",
    {
      copilotToken: "copilot-token",
    },
    false
  );

  assert.equal(headers.Authorization, "Bearer copilot-token");
  assert.equal(typeof headers["x-request-id"], "string");
  assert.match(headers["x-request-id"], /^[a-f0-9-]{36}$/i);
  assert.equal(headers.Accept, "application/json");
});

test("Registry-driven headers support x-goog-api-key and bearer fallback", () => {
  const apiKeyHeaders = buildProviderHeaders(
    "gemini",
    {
      apiKey: "gemini-api-key",
    },
    true
  );
  const accessTokenHeaders = buildProviderHeaders(
    "gemini",
    {
      accessToken: "gemini-access-token",
    },
    false
  );

  assert.equal(apiKeyHeaders["x-goog-api-key"], "gemini-api-key");
  assert.equal(apiKeyHeaders.Accept, "text/event-stream");
  assert.equal(accessTokenHeaders.Authorization, "Bearer gemini-access-token");
});

test("Unknown providers fall back to bearer auth and OpenAI format", () => {
  const headers = buildProviderHeaders(
    "custom-provider",
    {
      apiKey: "custom-key",
    },
    false
  );

  assert.equal(headers.Authorization, "Bearer custom-key");
  assert.equal(getTargetFormat("custom-provider"), "openai");
});

test("native thinking config is removed when the last message is not from the user", () => {
  const assistantLast = {
    messages: [
      { role: "user", content: "hi" },
      { role: "assistant", content: "hello" },
    ],
    reasoning_effort: "high",
    thinking: { type: "enabled" },
  };
  const userLast = {
    messages: [{ role: "user", content: "hi" }],
    reasoning_effort: "medium",
    thinking: { type: "enabled" },
  };

  const normalized = normalizeThinkingConfig(assistantLast);

  assert.equal(isLastMessageFromUser({ messages: [] }), true);
  assert.equal(isLastMessageFromUser(assistantLast), false);
  assert.equal(hasThinkingConfig(userLast), true);
  assert.equal(normalized.reasoning_effort, "high");
  assert.equal("thinking" in normalized, false);
  assert.equal(normalizeThinkingConfig(userLast).reasoning_effort, "medium");
});
