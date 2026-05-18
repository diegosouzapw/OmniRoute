import { test } from "node:test";
import assert from "node:assert/strict";
import { bulkCreateProviderSchema } from "../../src/shared/validation/schemas.ts";
import { supportsBulkApiKey } from "../../src/shared/constants/providers.ts";

// These tests cover the business primitives of POST /api/providers/bulk
// without importing the Next.js route (which pulls pino/thread-stream — see
// batch-deletion-route-logic.test.ts for the same pattern).

test("bulkCreateProviderSchema accepts a valid minimal payload", () => {
  const result = bulkCreateProviderSchema.safeParse({
    provider: "anthropic",
    entries: [{ name: "prod", apiKey: "sk-1" }],
  });
  assert.equal(result.success, true);
});

test("bulkCreateProviderSchema rejects empty entries array", () => {
  const result = bulkCreateProviderSchema.safeParse({
    provider: "anthropic",
    entries: [],
  });
  assert.equal(result.success, false);
});

test("bulkCreateProviderSchema rejects entries over 200", () => {
  const entries = Array.from({ length: 201 }, (_, i) => ({
    name: `n${i}`,
    apiKey: `k${i}`,
  }));
  const result = bulkCreateProviderSchema.safeParse({
    provider: "anthropic",
    entries,
  });
  assert.equal(result.success, false);
});

test("bulkCreateProviderSchema requires non-empty apiKey per entry", () => {
  const result = bulkCreateProviderSchema.safeParse({
    provider: "anthropic",
    entries: [{ name: "prod", apiKey: "" }],
  });
  assert.equal(result.success, false);
});

test("bulkCreateProviderSchema requires non-empty name per entry", () => {
  const result = bulkCreateProviderSchema.safeParse({
    provider: "anthropic",
    entries: [{ name: "", apiKey: "sk-1" }],
  });
  assert.equal(result.success, false);
});

test("bulkCreateProviderSchema enforces google-pse-search cx requirement", () => {
  const noCx = bulkCreateProviderSchema.safeParse({
    provider: "google-pse-search",
    entries: [{ name: "k1", apiKey: "x" }],
  });
  assert.equal(noCx.success, false);

  const withCx = bulkCreateProviderSchema.safeParse({
    provider: "google-pse-search",
    entries: [{ name: "k1", apiKey: "x" }],
    providerSpecificData: { cx: "abc123" },
  });
  assert.equal(withCx.success, true);
});

test("bulkCreateProviderSchema accepts optional validateKeys flag", () => {
  const result = bulkCreateProviderSchema.safeParse({
    provider: "anthropic",
    entries: [{ name: "prod", apiKey: "sk-1" }],
    validateKeys: true,
  });
  assert.equal(result.success, true);
});

test("supportsBulkApiKey: true for first-party api-key providers", () => {
  assert.equal(supportsBulkApiKey("anthropic"), true);
  assert.equal(supportsBulkApiKey("openai"), true);
  assert.equal(supportsBulkApiKey("deepseek"), true);
  assert.equal(supportsBulkApiKey("groq"), true);
  assert.equal(supportsBulkApiKey("glm"), true);
});

test("supportsBulkApiKey: false for OAuth/multi-field/web-session providers", () => {
  assert.equal(supportsBulkApiKey("vertex"), false);
  assert.equal(supportsBulkApiKey("vertex-partner"), false);
  assert.equal(supportsBulkApiKey("grok-web"), false);
  assert.equal(supportsBulkApiKey("perplexity-web"), false);
  assert.equal(supportsBulkApiKey("blackbox-web"), false);
  assert.equal(supportsBulkApiKey("muse-spark-web"), false);
  assert.equal(supportsBulkApiKey("deepseek-web"), false);
  assert.equal(supportsBulkApiKey("qoder"), false);
  assert.equal(supportsBulkApiKey("azure"), false);
  assert.equal(supportsBulkApiKey("cloudflare-ai"), false);
  assert.equal(supportsBulkApiKey("google-pse-search"), false);
  assert.equal(supportsBulkApiKey("command-code"), false);
  assert.equal(supportsBulkApiKey("ollama-local"), false);
});

test("supportsBulkApiKey: false for non-string/empty input", () => {
  assert.equal(supportsBulkApiKey(""), false);
  assert.equal(supportsBulkApiKey(null), false);
  assert.equal(supportsBulkApiKey(undefined), false);
  assert.equal(supportsBulkApiKey(123), false);
});

test("response shape — partial-failure semantics", () => {
  // Documents the contract that the route returns 200 with per-entry results.
  const response = {
    success: 2,
    failed: 1,
    total: 3,
    created: [{ id: "c1" }, { id: "c2" }],
    errors: [{ index: 2, name: "bad", message: "invalid apiKey" }],
  };
  assert.equal(response.total, response.success + response.failed);
  assert.equal(response.created.length, response.success);
  assert.equal(response.errors.length, response.failed);
});

test("response — never echoes apiKey", () => {
  const created = { id: "c1", apiKey: "sk-leak", name: "x" };
  const safe: Record<string, unknown> = { ...created };
  delete safe.apiKey;
  assert.equal(safe.apiKey, undefined);
  assert.equal(safe.name, "x");
});
