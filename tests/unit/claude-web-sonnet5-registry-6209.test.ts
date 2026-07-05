import { test } from "node:test";
import assert from "node:assert/strict";
import { getModelsByProviderId } from "../../open-sse/config/providerModels.ts";

// #6209 (#6200): the Claude Web provider (claude.ai scrape) now offers Claude 5 Sonnet.
// Regression guard: the claude-web registry must expose `claude-sonnet-5` alongside the
// pre-existing 4.6 Sonnet / 4.5 Haiku web entries. Fails without the registry line.
test("claude-web registry exposes claude-sonnet-5 (Claude 5 Sonnet web)", () => {
  const models = getModelsByProviderId("claude-web");
  const ids = new Set(models.map((m) => m.id));
  assert.ok(ids.has("claude-sonnet-5"), "claude-web must expose claude-sonnet-5");
  // the prior web lineup must survive
  assert.ok(ids.has("claude-sonnet-4-6"), "claude-web must keep claude-sonnet-4-6");
  assert.ok(ids.has("claude-haiku-4-5"), "claude-web must keep claude-haiku-4-5");
});
