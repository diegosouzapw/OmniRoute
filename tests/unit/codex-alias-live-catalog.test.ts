/**
 * A Codex registry alias that names its own effort (gpt-6.1-sol-ultra) was
 * returned unchanged and then rejected, because the synced catalog only
 * contains the base id the upstream account reports. The alias has to resolve
 * to that base id plus the effort, the same way every other provider strips a
 * trailing effort token.
 *
 * A Codex id that the catalog lists directly still resolves to itself.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { resolveSyncedModelIdAndEffort } from "../../src/sse/services/model.ts";

const synced = [
  { id: "gpt-6.1-sol", supportedThinkingEfforts: ["low", "medium", "high", "xhigh", "max", "ultra"] },
];

test("codex effort alias resolves to the synced base model", () => {
  const result = resolveSyncedModelIdAndEffort("codex", "gpt-6.1-sol-ultra", synced);
  assert.equal(result.modelId, "gpt-6.1-sol");
  assert.equal(result.effort, "ultra");
});

test("codex effort alias listed in the catalog resolves to itself", () => {
  const listed = [...synced, { id: "gpt-6.1-sol-ultra" }];
  const result = resolveSyncedModelIdAndEffort("codex", "gpt-6.1-sol-ultra", listed);
  assert.equal(result.modelId, "gpt-6.1-sol-ultra");
  assert.equal(result.effort, null);
});

test("codex base model listed in the catalog resolves to itself", () => {
  const result = resolveSyncedModelIdAndEffort("codex", "gpt-6.1-sol", synced);
  assert.equal(result.modelId, "gpt-6.1-sol");
  assert.equal(result.effort, null);
});
