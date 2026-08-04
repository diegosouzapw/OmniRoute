/**
 * Tests for resolveResponsesApiModel combo-name guard — ensures combo names
 * without a "/" are NOT rewritten to codex/ prefix on /v1/responses.
 *
 * Root cause (#3233): the Codex CLI WS→HTTP fallback rewrites bare model ids
 * to codex/ prefix, but combo names like "paid-premium" or "n8n-text" also
 * lack a "/" and were incorrectly rewritten to "codex/paid-premium", breaking
 * combo resolution and producing "No credentials for provider: codex".
 *
 * These tests exercise the real production function directly, passing mock
 * resolvers as arguments. No module mocking required.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { resolveResponsesApiModel } from "../../src/app/api/internal/codex-responses-ws/modelResolution";

const mockModelInfo = new Map<string, { provider: string; model: string }>();

async function mockGetModelInfo(modelStr: string) {
  return mockModelInfo.get(modelStr) ?? { provider: null, model: modelStr };
}

const mockCombos = new Set<string>();

async function mockIsCombo(name: string) {
  return mockCombos.has(name);
}

test("combo name 'paid-premium' is NOT rewritten to codex/ prefix", async () => {
  mockModelInfo.clear();
  mockModelInfo.set("paid-premium", { provider: null, model: "paid-premium" });
  mockModelInfo.set("codex/paid-premium", { provider: "codex", model: "paid-premium" });
  mockCombos.clear();
  mockCombos.add("paid-premium");

  const result = await resolveResponsesApiModel("paid-premium", mockGetModelInfo, mockIsCombo);
  assert.equal(result.model, "paid-premium", "combo name must pass through unchanged");
  assert.equal(result.changed, false, "combo name must not be marked as changed");
});

test("combo name 'n8n-text' is NOT rewritten to codex/ prefix", async () => {
  mockModelInfo.clear();
  mockModelInfo.set("n8n-text", { provider: null, model: "n8n-text" });
  mockModelInfo.set("codex/n8n-text", { provider: "codex", model: "n8n-text" });
  mockCombos.clear();
  mockCombos.add("n8n-text");

  const result = await resolveResponsesApiModel("n8n-text", mockGetModelInfo, mockIsCombo);
  assert.equal(result.model, "n8n-text", "combo name must pass through unchanged");
  assert.equal(result.changed, false, "combo name must not be marked as changed");
});

test("bare gpt-5.5 without combo is still rewritten to codex/gpt-5.5", async () => {
  mockModelInfo.clear();
  mockModelInfo.set("gpt-5.5", { provider: "openrouter", model: "gpt-5.5" });
  mockModelInfo.set("codex/gpt-5.5", { provider: "codex", model: "gpt-5.5" });
  mockCombos.clear();

  const result = await resolveResponsesApiModel("gpt-5.5", mockGetModelInfo, mockIsCombo);
  assert.equal(result.model, "codex/gpt-5.5", "bare codex model must be rewritten");
  assert.equal(result.changed, true, "bare codex model must be marked as changed");
});

test("already-prefixed codex/gpt-5.5 passes through unchanged", async () => {
  mockModelInfo.clear();
  mockModelInfo.set("codex/gpt-5.5", { provider: "codex", model: "gpt-5.5" });
  mockCombos.clear();

  const result = await resolveResponsesApiModel("codex/gpt-5.5", mockGetModelInfo, mockIsCombo);
  assert.equal(result.model, "codex/gpt-5.5", "already-prefixed model must pass through");
  assert.equal(result.changed, false, "already-prefixed model must not be marked as changed");
});

test("combo name with combo/ prefix is NOT rewritten", async () => {
  mockModelInfo.clear();
  mockCombos.clear();
  mockCombos.add("combo/my-combo");

  const result = await resolveResponsesApiModel("combo/my-combo", mockGetModelInfo, mockIsCombo);
  assert.equal(result.model, "combo/my-combo", "combo/ prefix must pass through unchanged");
  assert.equal(result.changed, false, "combo/ prefix must not be marked as changed");
});

test("bare model that is not a combo and has no codex mapping passes through", async () => {
  mockModelInfo.clear();
  mockModelInfo.set("some-random-model", { provider: "openrouter", model: "some-random-model" });
  mockModelInfo.set("codex/some-random-model", { provider: null, model: "some-random-model" });
  mockCombos.clear();

  const result = await resolveResponsesApiModel("some-random-model", mockGetModelInfo, mockIsCombo);
  assert.equal(result.model, "some-random-model", "unmapped bare model must pass through");
  assert.equal(result.changed, false, "unmapped bare model must not be marked as changed");
});
