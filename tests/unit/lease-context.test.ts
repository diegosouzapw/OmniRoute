import assert from "node:assert/strict";
import test from "node:test";

import {
  LEASE_EXCLUSIVE_SCOPE,
  LeaseContextError,
  isExclusiveLeaseManagedKey,
  parseManagedLeaseRequestContext,
  validateExclusiveLeaseKeyConfiguration,
} from "../../src/sse/services/leaseContext.ts";

const OWNER = "vlo_AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

test("routing session identity is never accepted as lease owner identity", () => {
  const headers = new Headers({
    "X-Session-Id": OWNER,
    "X-OmniRoute-Lease-Generation": "1",
  });
  assert.throws(
    () => parseManagedLeaseRequestContext(headers),
    (error: unknown) =>
      error instanceof LeaseContextError &&
      error.status === 400 &&
      error.code === "LEASE_CONTEXT_REQUIRED"
  );
});

test("parses only canonical explicit owner and positive safe generation", () => {
  const context = parseManagedLeaseRequestContext(
    new Headers({
      "X-OmniRoute-Lease-Owner": OWNER,
      "X-OmniRoute-Lease-Generation": "42",
      "X-Session-Id": "routing-session-a",
    })
  );
  assert.equal(context.leaseOwnerId, OWNER);
  assert.equal(context.generation, 42);
  assert.notEqual(context.leaseOwnerId, "routing-session-a");
});

for (const [name, owner, generation] of [
  ["malformed owner", "vlo_short", "1"],
  ["missing generation", OWNER, ""],
  ["zero generation", OWNER, "0"],
  ["fractional generation", OWNER, "1.5"],
  ["unsafe generation", OWNER, "9007199254740992"],
] as const) {
  test(`rejects ${name}`, () => {
    const headers = new Headers({ "X-OmniRoute-Lease-Owner": owner });
    if (generation) headers.set("X-OmniRoute-Lease-Generation", generation);
    assert.throws(
      () => parseManagedLeaseRequestContext(headers),
      (error: unknown) =>
        error instanceof LeaseContextError &&
        error.status === 400 &&
        error.code === "LEASE_CONTEXT_INVALID"
    );
  });
}

test("only the explicit lease scope opts a key into hard leases", () => {
  assert.equal(isExclusiveLeaseManagedKey({ scopes: [LEASE_EXCLUSIVE_SCOPE] }), true);
  assert.equal(isExclusiveLeaseManagedKey({ scopes: ["manage"] }), false);
  assert.equal(isExclusiveLeaseManagedKey({ scopes: [] }), false);
});

test("managed scope requires a non-empty existing allowedConnections list", () => {
  assert.doesNotThrow(() =>
    validateExclusiveLeaseKeyConfiguration({
      scopes: [LEASE_EXCLUSIVE_SCOPE],
      allowedConnections: ["connection-a"],
    })
  );
  assert.throws(
    () =>
      validateExclusiveLeaseKeyConfiguration({
        scopes: [LEASE_EXCLUSIVE_SCOPE],
        allowedConnections: [],
      }),
    (error: unknown) =>
      error instanceof LeaseContextError && error.code === "LEASE_KEY_CONFIGURATION_INVALID"
  );
  assert.doesNotThrow(() =>
    validateExclusiveLeaseKeyConfiguration({ scopes: ["manage"], allowedConnections: [] })
  );
});
