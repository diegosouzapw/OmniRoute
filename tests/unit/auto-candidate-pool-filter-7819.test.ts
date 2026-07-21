/**
 * #7819 (Level 2) — pure `filterExcludedCandidates` unit tests
 * (`open-sse/services/autoCombo/candidateOverrides.ts`). No DB, no network —
 * mirrors the style of `paidModelFilter.ts`'s own tests.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { filterExcludedCandidates } from "../../open-sse/services/autoCombo/candidateOverrides.ts";

const pool = [
  { connectionId: "conn-a", model: "gpt" },
  { connectionId: "conn-b", model: "claude" },
  { connectionId: "conn-c", model: "gemini" },
];

test("#7819: empty exclusion set returns the SAME array reference (identity, no-op path)", () => {
  const result = filterExcludedCandidates(pool, new Set());
  assert.strictEqual(result, pool);
});

test("#7819: excluding one connection removes only that candidate", () => {
  const result = filterExcludedCandidates(pool, new Set(["conn-b"]));
  assert.deepEqual(
    result.map((c) => c.connectionId),
    ["conn-a", "conn-c"]
  );
});

test("#7819: excluding an unknown connection id leaves the pool unchanged in content", () => {
  const result = filterExcludedCandidates(pool, new Set(["conn-does-not-exist"]));
  assert.deepEqual(
    result.map((c) => c.connectionId),
    ["conn-a", "conn-b", "conn-c"]
  );
});

test("#7819: excluding every candidate yields an empty pool (caller's empty-pool path handles it)", () => {
  const result = filterExcludedCandidates(pool, new Set(["conn-a", "conn-b", "conn-c"]));
  assert.equal(result.length, 0);
});

test("#7819: logical candidates retain only non-excluded account fallbacks", () => {
  const logicalPool = [
    {
      connectionId: null,
      allowedConnectionIds: ["conn-a", "conn-b"],
      model: "claude",
    },
  ];

  const result = filterExcludedCandidates(logicalPool, new Set(["conn-a"]));
  assert.deepEqual(result, [
    {
      connectionId: null,
      allowedConnectionIds: ["conn-b"],
      model: "claude",
    },
  ]);
});

test("#7819: logical candidates are removed when every account fallback is excluded", () => {
  const logicalPool = [
    {
      connectionId: null,
      allowedConnectionIds: ["conn-a", "conn-b"],
      model: "claude",
    },
  ];

  const result = filterExcludedCandidates(logicalPool, new Set(["conn-a", "conn-b"]));
  assert.deepEqual(result, []);
});
