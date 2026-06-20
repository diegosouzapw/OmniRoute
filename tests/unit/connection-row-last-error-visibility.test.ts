import test from "node:test";
import assert from "node:assert/strict";

// Regression for port-from-9router#1447: a disabled connection's lastError was hidden
// in the connection row (`connection.isActive !== false` gated it), yet the provider
// card's error badge still counts disabled-with-error rows. The operator could see the
// error count but not the cause. The row now shows the error whenever there is one.
const { shouldShowConnectionLastError } = await import(
  "../../src/app/(dashboard)/dashboard/providers/[id]/components/connectionRowHelpers.ts"
);

test("#1447: lastError is shown even when the connection is disabled", () => {
  assert.equal(
    shouldShowConnectionLastError({ lastError: "401 Unauthorized", isActive: false }),
    true
  );
});

test("#1447: lastError is shown for an active connection", () => {
  assert.equal(
    shouldShowConnectionLastError({ lastError: "429 Too Many Requests", isActive: true }),
    true
  );
});

test("#1447: nothing is shown when there is no lastError", () => {
  assert.equal(shouldShowConnectionLastError({ isActive: false }), false);
  assert.equal(shouldShowConnectionLastError({ lastError: "", isActive: true }), false);
});
