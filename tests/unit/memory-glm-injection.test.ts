/**
 * Tests for #1701: GLM providers rejecting system role from memory injection.
 *
 * Validates that injectMemory() uses the user role fallback for GLM/ZAI/Qianfan
 * providers that do not support the system role, while still using system role
 * for standard providers like OpenAI.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { injectMemory, providerSupportsSystemMessage } from "../../src/lib/memory/injection.ts";
import type { ChatRequest } from "../../src/lib/memory/injection.ts";
import type { Memory } from "../../src/lib/memory/types.ts";
import { normalizeSystemRole } from "../../open-sse/services/roleNormalizer.ts";

// ── Fixtures ───────────────────────────────────────────────────────────────────

const baseRequest: ChatRequest = {
  model: "glm-5.1",
  messages: [{ role: "user", content: "Hello" }],
};

const testMemories: Memory[] = [
  {
    id: "mem-1",
    content: "User prefers dark mode",
    type: "factual" as any,
    apiKeyId: "test-key",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    importance: 0.5,
  },
];

// ── providerSupportsSystemMessage ──────────────────────────────────────────────

describe("providerSupportsSystemMessage — GLM providers (#1701)", () => {
  it("should return false for glm", () => {
    assert.equal(providerSupportsSystemMessage("glm"), false);
  });

  it("should return false for glmt", () => {
    assert.equal(providerSupportsSystemMessage("glmt"), false);
  });

  it("should return false for glm-cn", () => {
    assert.equal(providerSupportsSystemMessage("glm-cn"), false);
  });

  it("should return false for zai", () => {
    assert.equal(providerSupportsSystemMessage("zai"), false);
  });

  it("should return false for qianfan", () => {
    assert.equal(providerSupportsSystemMessage("qianfan"), false);
  });

  it("should return false for o1 (existing behavior)", () => {
    assert.equal(providerSupportsSystemMessage("o1"), false);
  });

  it("should return true for openai (regression check)", () => {
    assert.equal(providerSupportsSystemMessage("openai"), true);
  });

  it("should return true for anthropic (regression check)", () => {
    assert.equal(providerSupportsSystemMessage("anthropic"), true);
  });

  it("should return true for null/undefined (safe default)", () => {
    assert.equal(providerSupportsSystemMessage(null), true);
    assert.equal(providerSupportsSystemMessage(undefined), true);
  });
});

// ── injectMemory with GLM providers ────────────────────────────────────────────

describe("injectMemory — GLM providers use user role (#1701)", () => {
  it("should inject as user role for provider=glm", () => {
    const result = injectMemory(baseRequest, testMemories, "glm");
    assert.equal(result.messages[0].role, "user");
    assert.ok(result.messages[0].content.includes("Memory context:"));
  });

  it("should inject as user role for provider=glmt", () => {
    const result = injectMemory(baseRequest, testMemories, "glmt");
    assert.equal(result.messages[0].role, "user");
  });

  it("should inject as user role for provider=glm-cn", () => {
    const result = injectMemory(baseRequest, testMemories, "glm-cn");
    assert.equal(result.messages[0].role, "user");
  });

  it("should inject as user role for provider=zai", () => {
    const result = injectMemory(baseRequest, testMemories, "zai");
    assert.equal(result.messages[0].role, "user");
  });

  it("should inject as user role for provider=qianfan", () => {
    const result = injectMemory(baseRequest, testMemories, "qianfan");
    assert.equal(result.messages[0].role, "user");
  });

  it("should inject as system role for provider=openai (regression)", () => {
    const result = injectMemory(baseRequest, testMemories, "openai");
    assert.equal(result.messages[0].role, "system");
  });

  it("should inject as system role for provider=anthropic (regression)", () => {
    const result = injectMemory(baseRequest, testMemories, "anthropic");
    assert.equal(result.messages[0].role, "system");
  });

  it("should not modify original request", () => {
    const original = { ...baseRequest, messages: [...baseRequest.messages] };
    injectMemory(baseRequest, testMemories, "glm");
    assert.equal(baseRequest.messages.length, original.messages.length);
  });
});

// ── normalizeSystemRole — GLM model names ──────────────────────────────────────

describe("normalizeSystemRole — GLM model names (#1701)", () => {
  it("should convert system→user for glm-5.1", () => {
    const messages = [
      { role: "system", content: "Memory context: test" },
      { role: "user", content: "Hello" },
    ];
    const result = normalizeSystemRole(messages, "glm", "glm-5.1");
    assert.ok(Array.isArray(result));
    const roles = (result as { role: string }[]).map((m) => m.role);
    assert.ok(!roles.includes("system"), "system role should be converted");
    assert.ok(roles.includes("user"), "should have user role");
  });

  it("should convert system→user for glm-4.7", () => {
    const messages = [
      { role: "system", content: "Instructions" },
      { role: "user", content: "Hello" },
    ];
    const result = normalizeSystemRole(messages, "glm", "glm-4.7");
    const roles = (result as { role: string }[]).map((m) => m.role);
    assert.ok(!roles.includes("system"));
  });

  it("should convert system→user for exact model id 'glm'", () => {
    const messages = [
      { role: "system", content: "Memory" },
      { role: "user", content: "Hello" },
    ];
    const result = normalizeSystemRole(messages, "pollinations", "glm");
    const roles = (result as { role: string }[]).map((m) => m.role);
    assert.ok(!roles.includes("system"));
  });

  it("should convert system→user for ernie models", () => {
    const messages = [
      { role: "system", content: "Memory" },
      { role: "user", content: "Hello" },
    ];
    const result = normalizeSystemRole(messages, "qianfan", "ernie-4.5-turbo-128k");
    const roles = (result as { role: string }[]).map((m) => m.role);
    assert.ok(!roles.includes("system"));
  });

  it("should preserve system role for openai models (regression)", () => {
    const messages = [
      { role: "system", content: "Instructions" },
      { role: "user", content: "Hello" },
    ];
    const result = normalizeSystemRole(messages, "openai", "gpt-5.4");
    const roles = (result as { role: string }[]).map((m) => m.role);
    assert.ok(roles.includes("system"), "system role should be preserved");
  });
});
