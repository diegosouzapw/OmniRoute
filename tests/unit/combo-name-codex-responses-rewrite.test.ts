/**
 * Tests for withCodexPreferredModel combo-name guard — ensures combo names
 * without a "/" are NOT rewritten to codex/ prefix on /v1/responses.
 *
 * Root cause (#3233): the Codex CLI WS→HTTP fallback rewrites bare model ids
 * to codex/ prefix, but combo names like "paid-premium" or "n8n-text" also
 * lack a "/" and were incorrectly rewritten to "codex/paid-premium", breaking
 * combo resolution and producing "No credentials for provider: codex".
 *
 * These tests use node:test mock.module (experimental) to intercept the real
 * production code. Run with:
 *   node --import tsx/esm --experimental-test-module-mocks --test tests/unit/combo-name-codex-responses-rewrite.test.ts
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mock } from "node:test";

const mockCombos = new Map<string, { name: string; models: string[] } | null>();
const mockModelInfo = new Map<string, { provider: string; model: string }>();

// Mock the model service module BEFORE importing the route handler.
// The route imports getComboForModel and getModelInfo at module load time,
// so the mock must be registered first.
mock.module("../../src/sse/services/model.ts", {
  namedExports: {
    getComboForModel: async (modelStr: string) => mockCombos.get(modelStr) ?? null,
    getModelInfo: async (modelStr: string) => mockModelInfo.get(modelStr) ?? { provider: null, model: modelStr },
  },
});

// Now import the route handler — it will pick up the mocked module.
const { withCodexPreferredModel } = await import(
  "../../src/app/api/v1/responses/route.ts"
);

function makeRequest(model: string): Request {
  return new Request("http://localhost/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model }),
  });
}

test("combo name 'paid-premium' is NOT rewritten to codex/ prefix", async () => {
  mockCombos.set("paid-premium", { name: "paid-premium", models: ["codex/gpt-5.4"] });
  mockModelInfo.set("paid-premium", { provider: null, model: "paid-premium" });
  mockModelInfo.set("codex/paid-premium", { provider: "codex", model: "paid-premium" });

  const req = makeRequest("paid-premium");
  const result = await withCodexPreferredModel(req);
  const body = await result.json();
  assert.equal(body.model, "paid-premium", "combo name must pass through unchanged");
});

test("combo name 'n8n-text' is NOT rewritten to codex/ prefix", async () => {
  mockCombos.set("n8n-text", { name: "n8n-text", models: ["cloudflare-ai/@cf/moonshotai/kimi-k2.6"] });
  mockModelInfo.set("n8n-text", { provider: null, model: "n8n-text" });
  mockModelInfo.set("codex/n8n-text", { provider: "codex", model: "n8n-text" });

  const req = makeRequest("n8n-text");
  const result = await withCodexPreferredModel(req);
  const body = await result.json();
  assert.equal(body.model, "n8n-text", "combo name must pass through unchanged");
});

test("bare gpt-5.5 without combo is still rewritten to codex/gpt-5.5", async () => {
  mockCombos.clear();
  mockModelInfo.set("gpt-5.5", { provider: "openrouter", model: "gpt-5.5" });
  mockModelInfo.set("codex/gpt-5.5", { provider: "codex", model: "gpt-5.5" });

  const req = makeRequest("gpt-5.5");
  const result = await withCodexPreferredModel(req);
  const body = await result.json();
  assert.equal(body.model, "codex/gpt-5.5", "bare codex model must be rewritten");
});

test("already-prefixed codex/gpt-5.5 passes through unchanged", async () => {
  mockCombos.clear();
  mockModelInfo.set("codex/gpt-5.5", { provider: "codex", model: "gpt-5.5" });

  const req = makeRequest("codex/gpt-5.5");
  const result = await withCodexPreferredModel(req);
  const body = await result.json();
  assert.equal(body.model, "codex/gpt-5.5", "already-prefixed model must pass through");
});

test("combo name with combo/ prefix is NOT rewritten", async () => {
  mockCombos.set("combo/my-combo", { name: "my-combo", models: ["openai/gpt-4o"] });
  mockModelInfo.clear();

  const req = makeRequest("combo/my-combo");
  const result = await withCodexPreferredModel(req);
  const body = await result.json();
  assert.equal(body.model, "combo/my-combo", "combo/ prefix must pass through unchanged");
});

test("bare model that is not a combo and has no codex mapping passes through", async () => {
  mockCombos.clear();
  mockModelInfo.set("some-random-model", { provider: "openrouter", model: "some-random-model" });
  mockModelInfo.set("codex/some-random-model", { provider: null, model: "some-random-model" });

  const req = makeRequest("some-random-model");
  const result = await withCodexPreferredModel(req);
  const body = await result.json();
  assert.equal(body.model, "some-random-model", "unmapped bare model must pass through");
});
