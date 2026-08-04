/**
 * PR port #2038 (decolua/9router) — "feat(blackbox): overhaul provider with latest models"
 *
 * Asserts that the blackbox registry entry carries the refreshed model
 * catalogue introduced by upstream PR #2038:
 *   - New model ids are present
 *   - Stale model ids that were replaced are absent
 */
import test from "node:test";
import assert from "node:assert/strict";

const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");

const blackbox = (REGISTRY as Record<string, Record<string, unknown>>).blackbox;

// New model ids from upstream PR #2038 (upstreamModelId / thinkingConfig fields
// are dropped — OmniRoute's RegistryModel only carries { id, name, ... })
const NEW_MODEL_IDS = [
  "claude-fable-5",
  "claude-opus-4.8",
  "claude-sonnet-4.6",
  "gpt-5.5",
  "gpt-5.4-pro",
  "gpt-5.4",
  "gpt-5.3-codex",
  "gpt-5.4-nano",
  "deepseek-v4-flash",
  "grok-4.3",
];

// Stale ids that the upstream PR replaced (were present before the overhaul)
const STALE_MODEL_IDS = [
  "gpt-4o",
  "gemini-2.5-flash",
  "claude-sonnet-4",
  "deepseek-v3",
  "blackboxai",
  "blackboxai-pro",
];

test("blackbox provider is registered", () => {
  assert.ok(blackbox, "blackbox should be present in the executor registry");
  assert.ok(Array.isArray(blackbox.models), "blackbox must expose a models array");
});

for (const id of NEW_MODEL_IDS) {
  test(`blackbox.models includes new model: ${id}`, () => {
    const models = blackbox.models as { id: string; name: string }[];
    const found = models.find((m) => m.id === id);
    assert.ok(found, `Expected model "${id}" to be present in blackbox.models`);
  });
}

for (const id of STALE_MODEL_IDS) {
  test(`blackbox.models does NOT include stale model: ${id}`, () => {
    const models = blackbox.models as { id: string; name: string }[];
    const found = models.find((m) => m.id === id);
    assert.equal(found, undefined, `Stale model "${id}" should be absent from blackbox.models`);
  });
}
