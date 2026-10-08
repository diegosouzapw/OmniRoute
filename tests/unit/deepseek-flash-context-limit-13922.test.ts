import test from "node:test";
import assert from "node:assert/strict";

const { resolveTokenLimit } = await import("../../open-sse/services/contextManager.ts");

test("#13922: deepseek-flash (new 1M model, no registry/synced metadata) resolves to DeepSeek's 1M window", () => {
  const resolved = resolveTokenLimit("deepseek", "deepseek-flash");
  assert.equal(resolved.limit, 1_000_000);
  assert.equal(resolved.specific, true);
});

test("#13922: any unlisted deepseek model id inherits the provider's 1M defaultContextLength", () => {
  const resolved = resolveTokenLimit("deepseek", "deepseek-some-future-model-not-yet-in-registry");
  assert.equal(resolved.limit, 1_000_000);
});
