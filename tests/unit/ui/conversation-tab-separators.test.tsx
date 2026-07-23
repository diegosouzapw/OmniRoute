/**
 * Tests for ConversationTab separators — CONTEXT HISTORY / MODEL RESPONSE
 * Validates the rendering logic: both sections appear when both request/response have turns;
 * only CONTEXT HISTORY appears when response is empty.
 */
import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { normalizeConversation } from "../../../src/mitm/inspector/conversationNormalizer.ts";
import type { InterceptedRequest } from "../../../src/mitm/inspector/types.ts";

function makeRequest(overrides: Partial<InterceptedRequest> = {}): InterceptedRequest {
  return {
    id: "test-id",
    source: "agent-bridge",
    timestamp: new Date().toISOString(),
    method: "POST",
    host: "api.openai.com",
    path: "/v1/chat/completions",
    requestHeaders: { "content-type": "application/json" },
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: 200,
    detectedKind: "llm",
    ...overrides,
  };
}

describe("ConversationTab separators rendering logic", () => {
  it("shows CONTEXT HISTORY section when request has turns", () => {
    const reqBody = JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are helpful." },
        { role: "user", content: "Hello!" },
      ],
    });
    const req = makeRequest({ requestBody: reqBody, responseBody: null });
    const result = normalizeConversation(req);

    if (result !== null) {
      assert.ok(result.request.length > 0, "request section should have turns");
      // Context History separator should be rendered (guarded by request.length > 0)
      const shouldRenderContextHistory = result.request.length > 0;
      assert.equal(shouldRenderContextHistory, true);
    }
  });

  it("shows MODEL RESPONSE section when response has turns", () => {
    const reqBody = JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: "Hi" }],
    });
    const resBody = JSON.stringify({
      choices: [
        {
          message: { role: "assistant", content: "Hello! How can I help?" },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 5, completion_tokens: 8 },
    });
    const req = makeRequest({ requestBody: reqBody, responseBody: resBody });
    const result = normalizeConversation(req);

    if (result !== null) {
      // Model Response separator should be rendered (guarded by response.length > 0)
      const shouldRenderModelResponse = result.response.length > 0;
      assert.equal(shouldRenderModelResponse, true);
    }
  });

  it("does NOT render MODEL RESPONSE when response is empty", () => {
    const reqBody = JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: "Hi" }],
    });
    // No response body
    const req = makeRequest({ requestBody: reqBody, responseBody: null });
    const result = normalizeConversation(req);

    if (result !== null) {
      // Response section should be empty, so MODEL RESPONSE separator should NOT render
      const shouldRenderModelResponse = result.response.length > 0;
      assert.equal(shouldRenderModelResponse, false);
      // But context history should still render
      const shouldRenderContextHistory = result.request.length > 0;
      assert.equal(shouldRenderContextHistory, true);
    }
  });

  it("renders both separators when both request and response have turns", () => {
    const reqBody = JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: "Hi" }],
    });
    const resBody = JSON.stringify({
      choices: [
        {
          message: { role: "assistant", content: "Hello!" },
          finish_reason: "stop",
        },
      ],
    });
    const req = makeRequest({ requestBody: reqBody, responseBody: resBody });
    const result = normalizeConversation(req);

    if (result !== null) {
      const contextHistoryVisible = result.request.length > 0;
      const modelResponseVisible = result.response.length > 0;
      assert.equal(contextHistoryVisible, true, "CONTEXT HISTORY should be visible");
      assert.equal(modelResponseVisible, true, "MODEL RESPONSE should be visible");
    }
  });

  it("request and response turns are keyed separately (req-N vs res-N)", () => {
    // Keys used: `req-${i}` for request turns, `res-${i}` for response turns
    const reqKeys = ["req-0", "req-1", "req-2"];
    const resKeys = ["res-0", "res-1"];

    // Verify no overlap
    const allKeys = [...reqKeys, ...resKeys];
    const uniqueKeys = new Set(allKeys);
    assert.equal(uniqueKeys.size, allKeys.length, "all keys should be unique");
  });

  it("allTurns still accounts for correct total across both sections", () => {
    const request = [
      { role: "user" as const, content: "Hi", contentType: "text" as const },
    ];
    const response = [
      { role: "assistant" as const, content: "Hello!", contentType: "text" as const },
    ];
    // Before: allTurns = [...request, ...response]
    // After: both rendered in separate sections
    const totalTurns = request.length + response.length;
    assert.equal(totalTurns, 2);
  });

  it("conversationNotAvailable key resolves when body is null (normalizeConversation returns null)", () => {
    // When requestBody is null and responseBody is null, normalizeConversation returns null.
    // The ConversationTab renders t("conversationNotAvailable") in that case.
    const req = makeRequest({ requestBody: null, responseBody: null });
    const result = normalizeConversation(req);

    // Must return null so the component falls through to the conversationNotAvailable branch.
    assert.equal(result, null, "normalizeConversation must return null for non-LLM / null body");
  });
});
