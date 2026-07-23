import { test } from "node:test";
import assert from "node:assert/strict";
import {
  sortConnectionsByAvailability,
  isConnectionAvailable,
  getConnectionEffectiveStatus,
} from "../../src/app/(dashboard)/dashboard/providers/[id]/components/connectionRowHelpers";

// Reorder-by-availability — upstream 9router PR #2558 ported to OmniRoute's
// resilience model (rateLimitedUntil cooldown + testStatus), not the
// upstream `modelLock_*` field convention. See CLAUDE.md "Resilience Runtime
// State" → Connection Cooldown.

test("sortConnectionsByAvailability moves available connections to the top", () => {
  const connections = [
    { id: "a", testStatus: "error" },
    { id: "b", testStatus: "active" },
    { id: "c", testStatus: "success" },
    { id: "d", testStatus: "expired" },
  ];

  const sorted = sortConnectionsByAvailability(connections);

  assert.deepEqual(
    sorted.map((c) => c.id),
    ["b", "c", "a", "d"]
  );
});

test("sortConnectionsByAvailability is a stable sort (preserves relative order within each group)", () => {
  const connections = [
    { id: "1", testStatus: "error" },
    { id: "2", testStatus: "active" },
    { id: "3", testStatus: "error" },
    { id: "4", testStatus: "success" },
    { id: "5", testStatus: "unknown" },
  ];

  const sorted = sortConnectionsByAvailability(connections);

  // Available group (2, 4) keeps its original relative order, then the
  // unavailable group (1, 3, 5) keeps its original relative order.
  assert.deepEqual(
    sorted.map((c) => c.id),
    ["2", "4", "1", "3", "5"]
  );
});

test("sortConnectionsByAvailability does not mutate the input array", () => {
  const connections = [{ id: "a", testStatus: "error" }, { id: "b", testStatus: "active" }];
  const original = [...connections];

  sortConnectionsByAvailability(connections);

  assert.deepEqual(connections, original);
});

test("a testStatus: 'unavailable' connection past its cooldown counts as available (lazy recovery)", () => {
  const pastCooldown = new Date(Date.now() - 60_000).toISOString();
  const connection = { testStatus: "unavailable", rateLimitedUntil: pastCooldown };

  assert.equal(getConnectionEffectiveStatus(connection), "active");
  assert.equal(isConnectionAvailable(connection), true);
});

test("a testStatus: 'unavailable' connection still within cooldown stays unavailable", () => {
  const futureCooldown = new Date(Date.now() + 60_000).toISOString();
  const connection = { testStatus: "unavailable", rateLimitedUntil: futureCooldown };

  assert.equal(getConnectionEffectiveStatus(connection), "unavailable");
  assert.equal(isConnectionAvailable(connection), false);
});

test("sortConnectionsByAvailability treats an active cooldown as unavailable even ahead of a hard error", () => {
  const futureCooldown = new Date(Date.now() + 60_000).toISOString();
  const connections = [
    { id: "cooling", testStatus: "unavailable", rateLimitedUntil: futureCooldown },
    { id: "recovered", testStatus: "active" },
  ];

  const sorted = sortConnectionsByAvailability(connections);

  assert.deepEqual(
    sorted.map((c) => c.id),
    ["recovered", "cooling"]
  );
});
