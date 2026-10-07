import test from "node:test";
import assert from "node:assert/strict";

import { memoizeTargetMetadata } from "../../src/app/api/v1/models/catalogHelpers.ts";

// #9147 / #12046: the built-in auto/* combos all resolve metadata for the same candidate
// pool, so the catalog build must resolve each distinct target once and yield between misses.

test("memoizeTargetMetadata resolves each distinct target once across calls", async () => {
  const resolved: string[] = [];
  let yields = 0;
  const resolveTargets = memoizeTargetMetadata(
    (target) => {
      resolved.push(`${target.providerId}/${target.modelStr}`);
      return target.modelStr === "missing" ? null : { id: target.modelStr };
    },
    async () => {
      yields++;
    }
  );
  const pool = [
    { providerId: "openai", modelStr: "gpt-a" },
    { providerId: "openai", modelStr: "missing" },
    { providerId: "claude", modelStr: "gpt-a" },
  ];

  const first = await resolveTargets(pool);
  const second = await resolveTargets([...pool].reverse());

  assert.deepEqual(first, [{ id: "gpt-a" }, null, { id: "gpt-a" }]);
  assert.deepEqual(second, [{ id: "gpt-a" }, null, { id: "gpt-a" }]);
  assert.deepEqual(resolved, ["openai/gpt-a", "openai/missing", "claude/gpt-a"]);
  assert.equal(yields, 3, "one yield per cache miss, none on hits");
});

test("memoizeTargetMetadata keys on connection scope, not just provider/model", async () => {
  let calls = 0;
  const resolveTargets = memoizeTargetMetadata(
    (target) => {
      calls++;
      return { scope: target.connectionId ?? target.allowedConnectionIds?.join(",") ?? "any" };
    },
    async () => {}
  );

  const result = await resolveTargets([
    { providerId: "openai", modelStr: "gpt-a" },
    { providerId: "openai", modelStr: "gpt-a", connectionId: "conn-1" },
    { providerId: "openai", modelStr: "gpt-a", allowedConnectionIds: ["conn-1", "conn-2"] },
    { providerId: "openai", modelStr: "gpt-a", connectionId: "conn-1" },
  ]);

  assert.deepEqual(result, [
    { scope: "any" },
    { scope: "conn-1" },
    { scope: "conn-1,conn-2" },
    { scope: "conn-1" },
  ]);
  assert.equal(calls, 3);
});
