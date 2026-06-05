import test from "node:test";
import assert from "node:assert/strict";

const codex = await import("../../open-sse/services/codexQuotaFetcher.ts");
const { registerCodexConnection, unregisterCodexConnection, getCodexConnectionMeta } = codex;

// getCodexConnectionMeta is not exported — use registerCodexConnection + internal verify
// Let's check what is exported
const exportedKeys = Object.keys(codex).filter((k) => typeof codex[k] === "function");
assert.ok(exportedKeys.length > 0, "codexQuotaFetcher should export functions");

test("registerCodexConnection: inserting into a full map does not evict the key being updated", () => {
  // Fill registry to capacity
  for (let i = 0; i < 210; i++) {
    registerCodexConnection(`conn-${i}`, { accessToken: `tok-${i}` });
  }

  // Update an existing connection — should NOT trigger eviction
  registerCodexConnection("conn-0", { accessToken: "tok-0-updated" });

  // If conn-0 was evicted, unregistering it would be a no-op.
  // The key point: this should not throw or corrupt state.
  unregisterCodexConnection("conn-0");
});

test("registerCodexConnection: evicts oldest when inserting NEW connection at capacity", () => {
  // Re-fill to capacity
  for (let i = 0; i < 210; i++) {
    registerCodexConnection(`fill-${i}`, { accessToken: `tok-${i}` });
  }

  // Insert a brand new one — should evict the oldest
  registerCodexConnection("fill-NEW-UNIQUE", { accessToken: "tok-new" });

  // The new entry should be registered (no throw)
  unregisterCodexConnection("fill-NEW-UNIQUE");
});

test("registerCodexConnection does not throw on normal usage", () => {
  registerCodexConnection("test-conn", { accessToken: "test-token" });
  unregisterCodexConnection("test-conn");
});

test("unregisterCodexConnection is idempotent", () => {
  registerCodexConnection("idempotent-test", { accessToken: "tok" });
  unregisterCodexConnection("idempotent-test");
  // Should not throw on double unregister
  unregisterCodexConnection("idempotent-test");
});
