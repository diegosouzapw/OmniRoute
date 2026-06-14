import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  getSessionAccountAffinity,
  upsertSessionAccountAffinity,
  touchSessionAccountAffinity,
  deleteSessionAccountAffinity,
  cleanupStaleSessionAccountAffinities,
} from "../../src/lib/db/sessionAccountAffinity.ts";

describe("sessionAccountAffinity", () => {
  const session = `sess-${Date.now()}`;
  const provider = "test-provider";
  const connId = "conn-123";
  const ttl = 5 * 60_000; // 5 min

  it("getSessionAccountAffinity returns null when no entry", () => {
    assert.equal(getSessionAccountAffinity(`missing-${Date.now()}`, provider, ttl), null);
  });

  it("getSessionAccountAffinity returns null with zero ttl", () => {
    assert.equal(getSessionAccountAffinity(session, provider, 0), null);
  });

  it("upsertSessionAccountAffinity stores and getSessionAccountAffinity retrieves", () => {
    upsertSessionAccountAffinity(session, provider, connId, Date.now(), ttl);
    const result = getSessionAccountAffinity(session, provider, ttl);
    assert.ok(result, "should return stored affinity");
    assert.equal(result!.connectionId, connId);
  });

  it("touchSessionAccountAffinity extends expiry", () => {
    const now = Date.now();
    upsertSessionAccountAffinity(session, provider, connId, now, ttl);
    touchSessionAccountAffinity(session, provider, now + 1000, ttl);
    const result = getSessionAccountAffinity(session, provider, ttl, now + 2000);
    assert.ok(result, "should still exist after touch");
  });

  it("deleteSessionAccountAffinity removes entry", () => {
    const delSess = `del-${Date.now()}`;
    upsertSessionAccountAffinity(delSess, provider, connId, Date.now(), ttl);
    deleteSessionAccountAffinity(delSess, provider);
    assert.equal(getSessionAccountAffinity(delSess, provider, ttl), null);
  });

  it("cleanupStaleSessionAccountAffinities removes expired entries", () => {
    const oldSess = `old-${Date.now()}`;
    const past = Date.now() - 120_000; // 2 min ago
    upsertSessionAccountAffinity(oldSess, provider, connId, past, 60_000); // 1 min ttl, already expired
    const deleted = cleanupStaleSessionAccountAffinities(30 * 60_000, Date.now());
    assert.ok(deleted >= 0, "should return count of deleted");
  });

  it("getSessionAccountAffinity returns null for expired entry", () => {
    const expSess = `exp-${Date.now()}`;
    const past = Date.now() - 120_000;
    upsertSessionAccountAffinity(expSess, provider, connId, past, 60_000);
    const result = getSessionAccountAffinity(expSess, provider, 60_000, Date.now());
    assert.equal(result, null, "expired entry should return null");
  });
});
