import test from "node:test";
import assert from "node:assert/strict";

const {
  getEffectiveProviderConnectionStatus,
  isProviderConnectionConnected,
  isProviderConnectionErrored,
} = await import("../../src/shared/utils/providerConnectionStatus.ts");

test("an active connection with unknown status is configured but not errored", () => {
  const connection = { isActive: true, testStatus: "unknown" };
  assert.equal(isProviderConnectionConnected(connection), true);
  assert.equal(isProviderConnectionErrored(connection), false);
});

test("disabled connections are excluded from connected and error counts", () => {
  assert.equal(isProviderConnectionConnected({ isActive: false, testStatus: "success" }), false);
  assert.equal(isProviderConnectionErrored({ isActive: false, testStatus: "error" }), false);
});

test("expired cooldown restores unavailable connection to active", () => {
  const now = Date.parse("2026-07-17T00:00:00.000Z");
  const connection = {
    isActive: true,
    testStatus: "unavailable",
    rateLimitedUntil: "2026-07-16T23:59:59.000Z",
  };
  assert.equal(getEffectiveProviderConnectionStatus(connection, now), "active");
  assert.equal(isProviderConnectionConnected(connection, now), true);
  assert.equal(isProviderConnectionErrored(connection, now), false);
});

test("active cooldown remains unavailable", () => {
  const now = Date.parse("2026-07-17T00:00:00.000Z");
  const connection = {
    isActive: true,
    testStatus: "unavailable",
    rateLimitedUntil: "2026-07-17T00:00:01.000Z",
  };
  assert.equal(getEffectiveProviderConnectionStatus(connection, now), "unavailable");
  assert.equal(isProviderConnectionConnected(connection, now), false);
  assert.equal(isProviderConnectionErrored(connection, now), true);
});

test("unavailable without a live cooldown is restored to active", () => {
  const connection = { isActive: true, testStatus: "unavailable" };
  assert.equal(getEffectiveProviderConnectionStatus(connection), "active");
  assert.equal(isProviderConnectionConnected(connection), true);
  assert.equal(isProviderConnectionErrored(connection), false);
});
