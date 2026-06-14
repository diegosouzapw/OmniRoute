/**
 * Tests for resolveResponsesApiModel — ensures bare ChatGPT model IDs are
 * codex-preferred when the Codex CLI falls back from WebSocket to HTTP and
 * hits /v1/responses with a bare model id (e.g. "gpt-5.5").
 *
 * Root cause: WS transport requires bare ids (codex/ prefix rejected client-side),
 * but HTTP routing resolves bare "gpt-5.5" → openrouter, not codex.
 * Fix: /v1/responses pre-resolves bare ids with codex preference.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { resolveResponsesApiModel } from "../../src/app/api/internal/codex-responses-ws/modelResolution.ts";
import type { ModelResolver } from "../../src/app/api/internal/codex-responses-ws/modelResolution.ts";

/** Resolver that maps model id to a { provider, model } pair. */
function makeResolver(map: Record<string, { provider: string; model: string }>): ModelResolver {
  return async (id: string) => map[id] ?? {};
}

test("bare gpt-5.5 that resolves to codex is rewritten to codex/gpt-5.5", async () => {
  const resolve = makeResolver({
    "gpt-5.5": { provider: "openrouter", model: "gpt-5.5" },
    "codex/gpt-5.5": { provider: "codex", model: "gpt-5.5" },
  });
  const result = await resolveResponsesApiModel("gpt-5.5", resolve);
  assert.equal(result.model, "codex/gpt-5.5");
  assert.equal(result.changed, true);
});

test("bare gpt-4o that has no codex mapping is passed through unchanged", async () => {
  const resolve = makeResolver({
    "gpt-4o": { provider: "openai", model: "gpt-4o" },
    // codex/gpt-4o is NOT in the registry
  });
  const result = await resolveResponsesApiModel("gpt-4o", resolve);
  assert.equal(result.model, "gpt-4o");
  assert.equal(result.changed, false);
});

test("already-prefixed codex/gpt-5.5 is passed through unchanged", async () => {
  const resolve = makeResolver({
    "codex/gpt-5.5": { provider: "codex", model: "gpt-5.5" },
  });
  const result = await resolveResponsesApiModel("codex/gpt-5.5", resolve);
  assert.equal(result.model, "codex/gpt-5.5");
  assert.equal(result.changed, false);
});

test("bare model that resolves to openrouter AND has no codex equivalent is passed through", async () => {
  const resolve = makeResolver({
    "llama-3.1": { provider: "openrouter", model: "llama-3.1" },
    "codex/llama-3.1": { provider: "openrouter", model: "llama-3.1" }, // no codex match
  });
  const result = await resolveResponsesApiModel("llama-3.1", resolve);
  assert.equal(result.model, "llama-3.1");
  assert.equal(result.changed, false);
});

test("empty model string is passed through unchanged", async () => {
  const resolve = makeResolver({});
  const result = await resolveResponsesApiModel("", resolve);
  assert.equal(result.model, "");
  assert.equal(result.changed, false);
});

test("bare gpt-5.5 that directly resolves to codex (without prefix retry) is rewritten", async () => {
  const resolve = makeResolver({
    "gpt-5.5": { provider: "codex", model: "gpt-5.5" },
  });
  const result = await resolveResponsesApiModel("gpt-5.5", resolve);
  assert.equal(result.model, "codex/gpt-5.5");
  assert.equal(result.changed, true);
});

test("other-provider/ prefix passes through unchanged (not a bare model)", async () => {
  const resolve = makeResolver({
    "anthropic/claude-opus-4": { provider: "anthropic", model: "claude-opus-4" },
  });
  const result = await resolveResponsesApiModel("anthropic/claude-opus-4", resolve);
  assert.equal(result.model, "anthropic/claude-opus-4");
  assert.equal(result.changed, false);
});

test("resolver throwing is handled gracefully — model passes through unchanged", async () => {
  const resolve: ModelResolver = async () => {
    throw new Error("resolver unavailable");
  };
  const result = await resolveResponsesApiModel("gpt-5.5", resolve);
  assert.equal(result.model, "gpt-5.5");
  assert.equal(result.changed, false);
});
