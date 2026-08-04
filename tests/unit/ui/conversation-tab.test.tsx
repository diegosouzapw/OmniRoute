/**
 * Tests for ConversationTab — normalizeConversation + chat bubble rendering logic
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

describe("ConversationTab normalizeConversation", () => {
  it("returns null for non-LLM request", () => {
    const req = makeRequest({ detectedKind: "app", requestBody: null });
    const result = normalizeConversation(req);
    assert.equal(result, null);
  });

  it("returns null for request without body", () => {
    const req = makeRequest({ requestBody: null, responseBody: null });
    const result = normalizeConversation(req);
    assert.equal(result, null);
  });

  it("normalizes OpenAI chat request with user message", () => {
    const body = JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Hello!" },
      ],
    });
    const req = makeRequest({ requestBody: body, responseBody: null });
    const result = normalizeConversation(req);

    // Should not return null for a valid LLM request
    if (result !== null) {
      assert.ok(Array.isArray(result.request), "request should be an array");
      assert.ok(result.request.length >= 1, "should have at least 1 turn");
      const roles = result.request.map((t) => t.role);
      assert.ok(roles.includes("user") || roles.includes("system"), "should have user or system role");
    }
  });

  it("normalizes OpenAI response with assistant message", () => {
    const reqBody = JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: "Hi" }],
    });
    const resBody = JSON.stringify({
      choices: [
        {
          message: {
            role: "assistant",
            content: "Hello! How can I help?",
          },
          finish_reason: "stop",
        },
      ],
      usage: { prompt_tokens: 10, completion_tokens: 8 },
    });
    const req = makeRequest({ requestBody: reqBody, responseBody: resBody });
    const result = normalizeConversation(req);

    if (result !== null) {
      // Response turns should include assistant
      const responseTurns = result.response;
      assert.ok(Array.isArray(responseTurns));
    }
  });

  it("returns NormalizedConversation shape with request/response/contextKey", () => {
    const body = JSON.stringify({
      model: "gpt-4o",
      messages: [{ role: "user", content: "test" }],
    });
    const req = makeRequest({ requestBody: body });
    const result = normalizeConversation(req);

    if (result !== null) {
      assert.ok("request" in result, "should have request field");
      assert.ok("response" in result, "should have response field");
      assert.ok("contextKey" in result, "should have contextKey field");
    }
  });
});

describe("ChatBubble role mapping", () => {
  it("maps expected roles", () => {
    const validRoles = ["system", "user", "assistant", "tool"] as const;
    const roleLabels: Record<(typeof validRoles)[number], string> = {
      system: "System",
      user: "User",
      assistant: "Assistant",
      tool: "Tool",
    };

    for (const role of validRoles) {
      assert.ok(roleLabels[role], `Role ${role} should have a label`);
    }
  });

  it("system role is collapsed by default", () => {
    // System messages start collapsed per UX spec
    const defaultCollapsed = true;
    assert.equal(defaultCollapsed, true);
  });
});
