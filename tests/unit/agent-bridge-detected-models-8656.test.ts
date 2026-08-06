/**
 * Unit test: GET /api/tools/agent-bridge/agents/[id]/detected-models
 * Verifies model auto-detection from intercepted traffic (#8656 follow-up D)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { globalTrafficBuffer } from "../../src/mitm/inspector/buffer.ts";
import type { InterceptedRequest } from "../../src/mitm/inspector/types.ts";

test("GET /detected-models: returns unique source models from intercepted traffic", async () => {
  // Mock some intercepted traffic with source models
  const mockRequests: InterceptedRequest[] = [
    {
      id: "req1",
      source: "agent-bridge",
      agent: "cursor",
      timestamp: new Date().toISOString(),
      method: "POST",
      host: "api.cursor.sh",
      path: "/v1/chat/completions",
      requestHeaders: {},
      requestBody: null,
      requestSize: 100,
      responseHeaders: {},
      responseBody: null,
      responseSize: 0,
      status: 200,
      sourceModel: "gpt-4-turbo",
      mappedModel: "openai/gpt-4-turbo",
    },
    {
      id: "req2",
      source: "agent-bridge",
      agent: "cursor",
      timestamp: new Date().toISOString(),
      method: "POST",
      host: "api.cursor.sh",
      path: "/v1/chat/completions",
      requestHeaders: {},
      requestBody: null,
      requestSize: 100,
      responseHeaders: {},
      responseBody: null,
      responseSize: 0,
      status: 200,
      sourceModel: "claude-3-opus",
      mappedModel: "anthropic/claude-3-opus-20240229",
    },
    {
      id: "req3",
      source: "agent-bridge",
      agent: "cursor",
      timestamp: new Date().toISOString(),
      method: "POST",
      host: "api.cursor.sh",
      path: "/v1/chat/completions",
      requestHeaders: {},
      requestBody: null,
      requestSize: 100,
      responseHeaders: {},
      responseBody: null,
      responseSize: 0,
      status: 200,
      sourceModel: "gpt-4-turbo", // Duplicate - should only appear once
      mappedModel: "openai/gpt-4-turbo",
    },
    {
      id: "req4",
      source: "agent-bridge",
      agent: "kiro",
      timestamp: new Date().toISOString(),
      method: "POST",
      host: "api.kiro.ai",
      path: "/v1/chat/completions",
      requestHeaders: {},
      requestBody: null,
      requestSize: 100,
      responseHeaders: {},
      responseBody: null,
      responseSize: 0,
      status: 200,
      sourceModel: "gemini-pro",
      mappedModel: "google/gemini-pro",
    },
  ];

  // Add mock requests to buffer
  mockRequests.forEach((req) => globalTrafficBuffer.push(req));

  try {
    const { GET } = await import(
      "../../src/app/api/tools/agent-bridge/agents/[id]/detected-models/route.ts?t=" +
        Date.now()
    );

    const res = await GET(
      new Request("http://localhost/api/tools/agent-bridge/agents/cursor/detected-models"),
      { params: { id: "cursor" } }
    );

    assert.equal(res.status, 200, "Response should be 200 OK");

    const body = (await res.json()) as {
      agentId: string;
      detectedModels: string[];
      requestCount: number;
    };

    assert.equal(body.agentId, "cursor", "agentId should be cursor");
    assert.ok(Array.isArray(body.detectedModels), "detectedModels should be array");
    assert.equal(body.detectedModels.length, 2, "Should have 2 unique models (duplicates removed)");
    assert.ok(
      body.detectedModels.includes("gpt-4-turbo"),
      "Should include gpt-4-turbo"
    );
    assert.ok(
      body.detectedModels.includes("claude-3-opus"),
      "Should include claude-3-opus"
    );
    assert.equal(body.requestCount, 3, "Should have 3 cursor requests");
  } finally {
    // Clean up buffer
    globalTrafficBuffer.clear();
  }
});

test("GET /detected-models: returns empty array for agent with no traffic", async () => {
  const { GET } = await import(
    "../../src/app/api/tools/agent-bridge/agents/[id]/detected-models/route.ts?t=" +
      Date.now()
  );

  const res = await GET(
    new Request("http://localhost/api/tools/agent-bridge/agents/antigravity/detected-models"),
    { params: { id: "antigravity" } }
  );

  assert.equal(res.status, 200);

  const body = (await res.json()) as {
    agentId: string;
    detectedModels: string[];
    requestCount: number;
  };

  assert.equal(body.agentId, "antigravity");
  assert.deepEqual(body.detectedModels, []);
  assert.equal(body.requestCount, 0);
});

test("GET /detected-models: returns 404 for invalid agent id", async () => {
  const { GET } = await import(
    "../../src/app/api/tools/agent-bridge/agents/[id]/detected-models/route.ts?t=" +
      Date.now()
  );

  const res = await GET(
    new Request("http://localhost/api/tools/agent-bridge/agents/invalid-agent/detected-models"),
    { params: { id: "invalid-agent" } }
  );

  assert.equal(res.status, 404);
});
