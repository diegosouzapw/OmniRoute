import test from "node:test";
import assert from "node:assert/strict";
import { InterceptedRequestSchema } from "../../src/mitm/inspector/types.ts";
import { MitmTargetSchema } from "../../src/mitm/types.ts";

const validInterceptedRequest = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  source: "agent-bridge" as const,
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
};

test("InterceptedRequestSchema — accepts valid payload", () => {
  assert.ok(InterceptedRequestSchema.safeParse(validInterceptedRequest).success);
});

test("InterceptedRequestSchema — accepts in-flight status", () => {
  assert.ok(InterceptedRequestSchema.safeParse({ ...validInterceptedRequest, status: "in-flight" }).success);
});

test("InterceptedRequestSchema — accepts error status", () => {
  assert.ok(InterceptedRequestSchema.safeParse({ ...validInterceptedRequest, status: "error", error: "Connection timeout" }).success);
});

test("InterceptedRequestSchema — rejects malformed uuid", () => {
  assert.ok(!InterceptedRequestSchema.safeParse({ ...validInterceptedRequest, id: "not-a-uuid" }).success);
});

test("InterceptedRequestSchema — rejects invalid source enum", () => {
  assert.ok(!InterceptedRequestSchema.safeParse({ ...validInterceptedRequest, source: "invalid-source" }).success);
});

test("InterceptedRequestSchema — rejects negative requestSize", () => {
  assert.ok(!InterceptedRequestSchema.safeParse({ ...validInterceptedRequest, requestSize: -1 }).success);
});

const validMitmTarget = {
  id: "copilot",
  name: "GitHub Copilot",
  icon: "code",
  color: "#10B981",
  hosts: ["api.githubcopilot.com"],
  port: 443,
  endpointPatterns: ["/v1/chat/completions"],
  defaultModels: [{ id: "gpt-4o", name: "GPT-4o", alias: "gpt-4o" }],
  setupTutorial: {
    steps: ["Step 1", "Step 2"],
    detection: { command: "code --version", platform: "all" as const },
  },
  riskNoticeKey: "providers.riskNotice.oauth",
};

test("MitmTargetSchema — accepts valid target", () => {
  assert.ok(MitmTargetSchema.safeParse(validMitmTarget).success);
});

test("MitmTargetSchema — rejects invalid color format", () => {
  assert.ok(!MitmTargetSchema.safeParse({ ...validMitmTarget, color: "green" }).success);
});

test("MitmTargetSchema — rejects empty hosts array", () => {
  assert.ok(!MitmTargetSchema.safeParse({ ...validMitmTarget, hosts: [] }).success);
});

test("MitmTargetSchema — rejects invalid agent id", () => {
  assert.ok(!MitmTargetSchema.safeParse({ ...validMitmTarget, id: "unknown-agent" }).success);
});

test("MitmTargetSchema — accepts all 9 valid agent ids", () => {
  const ids = ["antigravity", "kiro", "copilot", "codex", "cursor", "zed", "claude-code", "open-code", "trae"];
  for (const id of ids) {
    assert.ok(MitmTargetSchema.safeParse({ ...validMitmTarget, id }).success, `Should accept: ${id}`);
  }
});
