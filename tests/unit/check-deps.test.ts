import { test } from "node:test";
import assert from "node:assert";
import { findUnapprovedDeps } from "../../scripts/check/check-deps.mjs";

test("no unapproved deps when all are allowlisted", () => {
  assert.deepEqual(findUnapprovedDeps(["react", "next"], new Set(["react", "next", "zod"])), []);
});

test("flags a dependency not on the allowlist (potential slopsquat)", () => {
  assert.deepEqual(
    findUnapprovedDeps(["react", "reactt-router"], new Set(["react"])),
    ["reactt-router"]
  );
});

test("flags multiple new deps, preserves order, de-dupes", () => {
  assert.deepEqual(
    findUnapprovedDeps(["a", "b", "a", "c"], new Set(["a"])),
    ["b", "c"]
  );
});
