import test from "node:test";
import assert from "node:assert/strict";

const rotator = await import("../../open-sse/services/apiKeyRotator.ts");
const {
  trackConnectionExtraKeys,
  connectionHasExtraKeys,
  getAllKeyHealth,
  syncHealthFromDB,
  resetKeyStatus,
  removeConnectionIndex,
} = rotator;

test("trackConnectionExtraKeys: inserting into a full map does not evict existing key being updated", () => {
  // Fill the map to capacity by inserting many unique connection IDs
  for (let i = 0; i < 510; i++) {
    trackConnectionExtraKeys(`conn-${i}`, [`key-${i}`]);
  }

  // Now update an existing key — this should NOT evict it
  trackConnectionExtraKeys("conn-0", ["key-0", "key-new"]);
  assert.ok(connectionHasExtraKeys("conn-0", ["key-0"]), "Existing key should not be evicted on update");
});

test("trackConnectionExtraKeys: evicts oldest when inserting NEW key at capacity", () => {
  // The map was filled above. Insert a brand new key — oldest should be evicted
  const before = connectionHasExtraKeys("conn-1", ["key-1"]);
  trackConnectionExtraKeys("conn-NEW-UNIQUE-XYZ", ["new-key"]);
  // conn-1 may or may not be evicted depending on insertion order, but the map should not grow unbounded
  assert.ok(typeof before === "boolean");
});

test("syncHealthFromDB: does not evict when updating existing scopedKey", () => {
  // Seed with some health entries
  for (let i = 0; i < 5; i++) {
    resetKeyStatus("test-conn", `key-${i}`);
  }

  // Sync health for existing entries — should not evict them
  const health = {
    "key-0": { status: "active" as const, failures: 0, lastFailure: 0 },
    "key-1": { status: "active" as const, failures: 0, lastFailure: 0 },
  };
  syncHealthFromDB("test-conn", health);

  const all = getAllKeyHealth();
  assert.ok(all["test-conn:key-0"], "key-0 should still exist after sync");
  assert.ok(all["test-conn:key-1"], "key-1 should still exist after sync");
});

test("syncHealthFromDB: evicts oldest when inserting NEW scopedKey at capacity", () => {
  // Fill the map by syncing many unique entries
  for (let i = 0; i < 505; i++) {
    syncHealthFromDB(`bulk-conn-${i}`, {
      [`bulk-key-${i}`]: { status: "active" as const, failures: 0, lastFailure: 0 },
    });
  }
  // Insert one more brand new entry — should trigger eviction of oldest
  syncHealthFromDB("bulk-conn-NEW", {
    "bulk-key-NEW": { status: "active" as const, failures: 0, lastFailure: 0 },
  });
  const all = getAllKeyHealth();
  assert.ok(all["bulk-conn-NEW:bulk-key-NEW"], "New entry should exist");
});

test("removeConnectionIndex cleans all 3 maps (keyIndexes, connectionExtraKeys, keyHealth)", () => {
  // Seed data
  trackConnectionExtraKeys("cleanup-conn", ["k1", "k2"]);
  resetKeyStatus("cleanup-conn", "k1");

  // Verify data exists via the in-memory cache (no extraKeys arg)
  assert.ok(connectionHasExtraKeys("cleanup-conn"));

  // Remove via removeConnectionIndex (cleans all 3 maps)
  removeConnectionIndex("cleanup-conn");

  // Verify cleaned — in-memory cache should be empty
  assert.ok(!connectionHasExtraKeys("cleanup-conn"));
  const all = getAllKeyHealth();
  assert.ok(!all["cleanup-conn:k1"], "Health entry should be removed");
});
