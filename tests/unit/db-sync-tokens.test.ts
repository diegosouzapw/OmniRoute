import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  listSyncTokens,
  getSyncTokenById,
  getSyncTokenByHash,
  createSyncTokenRecord,
  revokeSyncToken,
  touchSyncTokenLastUsed,
} from "../../src/lib/db/syncTokens.ts";

describe("syncTokens", () => {
  const hash = `test-hash-${Date.now()}-${Math.random().toString(36).slice(2)}`;

  it("createSyncTokenRecord creates a token", async () => {
    const record = await createSyncTokenRecord({
      name: "test-token",
      tokenHash: hash,
    });
    assert.ok(record.id, "should have id");
    assert.equal(record.name, "test-token");
    assert.equal(record.tokenHash, hash);
    assert.equal(record.revokedAt, null);
  });

  it("getSyncTokenById retrieves created token", async () => {
    const created = await createSyncTokenRecord({
      name: "by-id",
      tokenHash: `byid-${Date.now()}`,
    });
    const found = await getSyncTokenById(created.id);
    assert.ok(found, "should find token");
    assert.equal(found!.name, "by-id");
  });

  it("getSyncTokenByHash retrieves by hash", async () => {
    const found = await getSyncTokenByHash(hash);
    assert.ok(found, "should find by hash");
    assert.equal(found!.tokenHash, hash);
  });

  it("listSyncTokens returns tokens", async () => {
    const list = await listSyncTokens();
    assert.ok(Array.isArray(list), "should return array");
    assert.ok(list.length >= 1, "should have at least 1 token");
  });

  it("revokeSyncToken sets revokedAt", async () => {
    const created = await createSyncTokenRecord({
      name: "to-revoke",
      tokenHash: `revoke-${Date.now()}`,
    });
    const revoked = await revokeSyncToken(created.id);
    assert.ok(revoked, "should return revoked token");
    assert.ok(revoked!.revokedAt, "should have revokedAt set");
  });

  it("revokeSyncToken returns null for unknown id", async () => {
    const result = await revokeSyncToken("nonexistent-id");
    assert.equal(result, null);
  });

  it("touchSyncTokenLastUsed updates lastUsedAt", async () => {
    const created = await createSyncTokenRecord({
      name: "to-touch",
      tokenHash: `touch-${Date.now()}`,
    });
    const touched = await touchSyncTokenLastUsed(created.id);
    assert.equal(touched, true, "should return true on success");
    const found = await getSyncTokenById(created.id);
    assert.ok(found!.lastUsedAt, "should have lastUsedAt set");
  });

  it("touchSyncTokenLastUsed returns false for unknown id", async () => {
    const result = await touchSyncTokenLastUsed("nonexistent");
    assert.equal(result, false);
  });
});
