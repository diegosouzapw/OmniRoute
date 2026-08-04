/**
 * Tests for combo builder fingerprint expansion (#6087).
 *
 * No-auth account providers (opencode, mimocode) pack multiple accounts as UUIDs inside
 * providerSpecificData.fingerprints of a SINGLE provider_connections row. The combo
 * builder must expand them into one selectable option per account.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { expandConnectionOptions } from "../../src/lib/combos/builderOptions.ts";

function makeConn(overrides: Record<string, unknown> = {}) {
  return {
    id: "conn-1",
    provider: "opencode",
    authType: "noauth",
    name: "OpenCode Account 1",
    priority: 0,
    isActive: true,
    testStatus: "active",
    ...overrides,
  };
}

describe("expandConnectionOptions — fingerprint expansion", () => {
  it("expands 3 fingerprints into 3 separate connection options", () => {
    const result = expandConnectionOptions([
      makeConn({ providerSpecificData: { fingerprints: ["fp-a", "fp-b", "fp-c"] } }),
    ]);
    assert.equal(result.length, 3);
    assert.equal(result[0].label, "Account 1");
    assert.equal(result[1].label, "Account 2");
    assert.equal(result[2].label, "Account 3");
  });

  it("encodes fingerprint into the connection id for pinning", () => {
    const result = expandConnectionOptions([
      makeConn({ id: "row-abc", providerSpecificData: { fingerprints: ["fp-x", "fp-y"] } }),
    ]);
    assert.ok(result[0].id.includes("fp-x"), `id should contain fp-x, got: ${result[0].id}`);
    assert.ok(result[1].id.includes("fp-y"), `id should contain fp-y, got: ${result[1].id}`);
    assert.ok(result[0].id.includes("row-abc"));
  });

  it("falls back to the row itself when there are no fingerprints", () => {
    const result = expandConnectionOptions([makeConn({ name: "OpenCode Account 1" })]);
    assert.equal(result.length, 1);
    assert.equal(result[0].id, "conn-1");
    assert.equal(result[0].label, "OpenCode Account 1");
  });

  it("treats an empty fingerprints array the same as no fingerprints", () => {
    const result = expandConnectionOptions([
      makeConn({ providerSpecificData: { fingerprints: [] } }),
    ]);
    assert.equal(result.length, 1);
    assert.equal(result[0].id, "conn-1");
  });

  it("skips non-string entries in fingerprints array", () => {
    const result = expandConnectionOptions([
      makeConn({ providerSpecificData: { fingerprints: ["fp-1", null, 42, "fp-2"] } }),
    ]);
    assert.equal(result.length, 2);
    assert.equal(result[0].label, "Account 1");
    assert.equal(result[1].label, "Account 2");
  });

  it("expands fingerprints across multiple rows, accumulating all accounts", () => {
    const result = expandConnectionOptions([
      makeConn({ id: "row-1", providerSpecificData: { fingerprints: ["fp-1", "fp-2"] } }),
      makeConn({ id: "row-2", providerSpecificData: { fingerprints: ["fp-3"] } }),
    ]);
    assert.equal(result.length, 3);
    const ids = result.map((r) => r.id);
    assert.ok(ids.some((id) => id.includes("fp-1")));
    assert.ok(ids.some((id) => id.includes("fp-2")));
    assert.ok(ids.some((id) => id.includes("fp-3")));
  });

  it("inherits isActive from the parent connection row", () => {
    const result = expandConnectionOptions([
      makeConn({ isActive: false, providerSpecificData: { fingerprints: ["fp-inactive"] } }),
    ]);
    assert.equal(result[0].isActive, false);
  });
});
