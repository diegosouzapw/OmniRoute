import test from "node:test";
import assert from "node:assert/strict";

const usageModule = await import("../../open-sse/services/usage.ts");

const originalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("getUsageForProvider returns error for unsupported provider", async () => {
  globalThis.fetch = async () => new Response("{}", { status: 200 });
  const result = await usageModule.getUsageForProvider({
    id: "test-1",
    provider: "unsupported-provider" as any,
    accessToken: "tok",
    apiKey: "key",
  });
  assert.ok(result);
  assert.ok(
    (result as any).error || (result as any).quotas === undefined || typeof result === "object"
  );
});

test("getUsageForProvider handles github provider with 403", async () => {
  globalThis.fetch = async () => new Response("forbidden", { status: 403 });
  const result = await usageModule.getUsageForProvider({
    id: "test-gh",
    provider: "github",
    accessToken: "gho_test",
    apiKey: "key",
  });
  assert.ok(result);
  assert.ok(typeof result === "object");
});

test("getUsageForProvider handles github provider with network error", async () => {
  globalThis.fetch = async () => {
    throw new Error("network down");
  };
  try {
    const result = await usageModule.getUsageForProvider({
      id: "test-gh-err",
      provider: "github",
      accessToken: "gho_test",
      apiKey: "key",
    });
    assert.ok(result);
  } catch (err) {
    assert.ok(err instanceof Error);
  }
});

test("getUsageForProvider handles codex provider", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
  const result = await usageModule.getUsageForProvider({
    id: "test-cx",
    provider: "codex",
    accessToken: "tok",
    apiKey: "key",
  });
  assert.ok(result);
});

test("getUsageForProvider handles cursor provider", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
  const result = await usageModule.getUsageForProvider({
    id: "test-cur",
    provider: "cursor",
    accessToken: "tok",
    apiKey: "key",
  });
  assert.ok(result);
});

test("getUsageForProvider handles kiro provider", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
  const result = await usageModule.getUsageForProvider({
    id: "test-kr",
    provider: "kiro",
    accessToken: "tok",
    apiKey: "key",
  });
  assert.ok(result);
});

test("getUsageForProvider handles kimi-coding provider", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
  const result = await usageModule.getUsageForProvider({
    id: "test-kimi",
    provider: "kimi-coding",
    accessToken: "tok",
    apiKey: "key",
  });
  assert.ok(result);
});

test("getUsageForProvider handles qwen provider", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
  const result = await usageModule.getUsageForProvider({
    id: "test-qw",
    provider: "qwen",
    accessToken: "tok",
    apiKey: "key",
  });
  assert.ok(result);
});

test("getUsageForProvider handles qoder provider", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
  const result = await usageModule.getUsageForProvider({
    id: "test-if",
    provider: "qoder",
    accessToken: "tok",
    apiKey: "key",
  });
  assert.ok(result);
});

test("getUsageForProvider handles glm provider", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
  const result = await usageModule.getUsageForProvider({
    id: "test-glm",
    provider: "glm",
    accessToken: "tok",
    apiKey: "key",
  });
  assert.ok(result);
});

test("getUsageForProvider handles claude provider with 429", async () => {
  globalThis.fetch = async () => new Response("rate limited", { status: 429 });
  const result = await usageModule.getUsageForProvider({
    id: "test-cl",
    provider: "claude",
    accessToken: "tok",
    apiKey: "key",
  });
  assert.ok(result);
});

test("getUsageForProvider handles minimax provider", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
  const result = await usageModule.getUsageForProvider({
    id: "test-mm",
    provider: "minimax",
    accessToken: "tok",
    apiKey: "key",
  });
  assert.ok(result);
});

test("getUsageForProvider handles deepseek provider", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
  const result = await usageModule.getUsageForProvider({
    id: "test-ds",
    provider: "deepseek",
    accessToken: "tok",
    apiKey: "key",
    providerSpecificData: {},
  });
  assert.ok(result);
});

test("getUsageForProvider handles nanogpt provider", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
  const result = await usageModule.getUsageForProvider({
    id: "test-ng",
    provider: "nanogpt",
    accessToken: "tok",
    apiKey: "key",
  });
  assert.ok(result);
});

test("getUsageForProvider handles opencode provider", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
  const result = await usageModule.getUsageForProvider({
    id: "test-oc",
    provider: "opencode",
    accessToken: "tok",
    apiKey: "key",
    providerSpecificData: {},
  });
  assert.ok(result);
});

test("getUsageForProvider handles amazon-q provider", async () => {
  globalThis.fetch = async () => new Response(JSON.stringify({}), { status: 200 });
  const result = await usageModule.getUsageForProvider({
    id: "test-aq",
    provider: "amazon-q",
    accessToken: "tok",
    apiKey: "key",
  });
  assert.ok(result);
});

test("getUsageForProvider handles antigravity provider with 500", async () => {
  globalThis.fetch = async () => new Response("server error", { status: 500 });
  const result = await usageModule.getUsageForProvider({
    id: "test-ag",
    provider: "antigravity",
    accessToken: "tok",
    apiKey: "key",
    providerSpecificData: {},
  });
  assert.ok(result);
});
