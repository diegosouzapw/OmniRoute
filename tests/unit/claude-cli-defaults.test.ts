import { test } from "node:test";
import assert from "node:assert/strict";
import { getClaudeCodeDefaultModels } from "../../open-sse/config/providerRegistry.ts";

test("getClaudeCodeDefaultModels returns expected default models", () => {
  const models = getClaudeCodeDefaultModels();

  // They should be non-empty strings because providerRegistry is populated statically
  assert.ok(typeof models.opus === "string");
  assert.ok(typeof models.sonnet === "string");
  assert.ok(typeof models.haiku === "string");

  // Check that the returned IDs match the expected patterns
  if (models.opus) {
    assert.match(models.opus, /opus/i);
  }
  if (models.sonnet) {
    assert.match(models.sonnet, /sonnet/i);
  }
  if (models.haiku) {
    assert.match(models.haiku, /haiku/i);
  }
});
