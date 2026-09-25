// Characterization of the db/apiKeys.ts row-parsers split (god-file decomposition): the pure column
// parsers that coerce raw SQLite values into typed shapes moved into db/apiKeys/rowParsers.ts, and the
// two shared row types (AccessSchedule / RateLimitRule) into db/apiKeys/types.ts. Behavior-preserving
// move — these locks pin the coercion semantics (JSON lists, 0/1 flags, nullable timestamps, schedule
// validation) and that the host still re-exports the two public types. DB-backed hydration stays
// covered by api-key-policy / combo-provider-wildcard.
import { test } from "node:test";
import assert from "node:assert/strict";

const P = await import("../../src/lib/db/apiKeys/rowParsers.ts");

test("module exposes all sixteen parsers", () => {
  for (const name of [
    "parseAllowedModels",
    "parseAllowedCombos",
    "parseNoLog",
    "parseAutoResolve",
    "parseDisableNonPublicModels",
    "parseAllowUsageCommand",
    "parseIsActive",
    "parseCompressionEnabled",
    "parseAccessSchedule",
    "parseRateLimits",
    "parseAllowedConnections",
    "parseAllowedQuotas",
    "parseStringList",
    "parseNullableTimestamp",
    "parseIsBanned",
    "parseStreamDefaultMode",
  ]) {
    assert.equal(typeof (P as Record<string, unknown>)[name], "function", `missing ${name}`);
  }
});

test("parseAllowedModels keeps only string entries, tolerates junk", () => {
  assert.deepEqual(P.parseAllowedModels('["a","b",1,null]'), ["a", "b"]);
  assert.deepEqual(P.parseAllowedModels(""), []);
  assert.deepEqual(P.parseAllowedModels("not json"), []);
  assert.deepEqual(P.parseAllowedModels(null), []);
});

// #14500: a driver that decodes the column for us (a jsonb-style read, or any writer that
// stored a real array) hands these parsers an Array, not a string. Every one of them tested
// `typeof value !== "string"` first and returned [] — so a key's whole allow-list was dropped
// before policy evaluation, and the request failed as if nothing were permitted.
//
// The direction matters and is asserted below: all of them failed CLOSED, so this discarded
// legitimate access rather than granting any. The one branch that could have widened —
// parseAllowedCombos treating legacy NULL as allow-all — is pinned separately, because an
// already-decoded [] must stay deny-all rather than falling into it.
test("list parsers keep string entries from an already-decoded array", () => {
  assert.deepEqual(P.parseStringList(["x", 1, null, "y"]), ["x", "y"]);
  assert.deepEqual(P.parseAllowedModels(["gpt-4", 1, null]), ["gpt-4"]);
  // parseAllowedConnections is deliberately NOT asserted here: #14698 is already
  // fixing that one, and duplicating the fix would conflict with it. Once both land,
  // all four share this behaviour.
  assert.deepEqual(P.parseAllowedCombos(["combo/x", 1, null]), ["combo/x"]);
});

test("a decoded array does not widen parseAllowedCombos to allow-all", () => {
  // The legacy NULL row is allow-all; an explicit empty list is deny-all. Adding an Array
  // branch must not let [] reach the NULL branch, which would turn a deny-all key into
  // allow-all — the one way this fix could be worse than the bug.
  assert.deepEqual(P.parseAllowedCombos([]), []);
  assert.deepEqual(P.parseAllowedCombos(null), ["combo/*"]);
  assert.deepEqual(P.parseAllowedCombos(undefined), ["combo/*"]);
});

test("decoded arrays containing no strings stay empty, not allow-all", () => {
  assert.deepEqual(P.parseAllowedModels([1, null, {}]), []);
  assert.deepEqual(P.parseAllowedCombos([1, null, {}]), []);
  assert.deepEqual(P.parseAllowedConnections([1, null, {}]), []);
});

test("list parsers preserve already-decoded database arrays", () => {
  assert.deepEqual(P.parseAllowedConnections(["connection-a", 1, null]), ["connection-a"]);
});

test("parseAllowedCombos preserves legacy NULL as allow-all without widening explicit []", () => {
  assert.deepEqual(P.parseAllowedCombos(null), ["combo/*"]);
  assert.deepEqual(P.parseAllowedCombos(undefined), ["combo/*"]);
  assert.deepEqual(P.parseAllowedCombos("[]"), []);
  assert.deepEqual(P.parseAllowedCombos('["fast-chat"]'), ["fast-chat"]);
});

test("flag parsers honor the 0/1/true/false matrix", () => {
  assert.equal(P.parseNoLog(1), true);
  assert.equal(P.parseNoLog("1"), true);
  assert.equal(P.parseNoLog(0), false);
  // isActive defaults to active unless explicitly falsy
  assert.equal(P.parseIsActive(undefined), true);
  assert.equal(P.parseIsActive(0), false);
  assert.equal(P.parseIsActive("0"), false);
  // compressionEnabled also defaults on for legacy/missing rows.
  assert.equal(P.parseCompressionEnabled(undefined), true);
  assert.equal(P.parseCompressionEnabled(null), true);
  assert.equal(P.parseCompressionEnabled(1), true);
  assert.equal(P.parseCompressionEnabled("1"), true);
  assert.equal(P.parseCompressionEnabled(0), false);
  assert.equal(P.parseCompressionEnabled("0"), false);
  assert.equal(P.parseCompressionEnabled(false), false);
  assert.equal(P.parseIsBanned(1), true);
  assert.equal(P.parseIsBanned(0), false);
});

test("parseStreamDefaultMode collapses to legacy unless json", () => {
  assert.equal(P.parseStreamDefaultMode("json"), "json");
  assert.equal(P.parseStreamDefaultMode("legacy"), "legacy");
  assert.equal(P.parseStreamDefaultMode("anything"), "legacy");
});

test("parseNullableTimestamp trims and nulls empties", () => {
  assert.equal(P.parseNullableTimestamp("  2026-01-01  "), "2026-01-01");
  assert.equal(P.parseNullableTimestamp("   "), null);
  assert.equal(P.parseNullableTimestamp(42), null);
});

test("parseAccessSchedule validates shape + clamps days, else null", () => {
  const ok = P.parseAccessSchedule(
    JSON.stringify({ enabled: true, from: "08:00", until: "18:00", days: [0, 3, 9], tz: "UTC" })
  );
  assert.ok(ok);
  assert.deepEqual(ok?.days, [0, 3]); // 9 dropped (out of 0..6)
  assert.equal(P.parseAccessSchedule('{"enabled":true}'), null);
  assert.equal(P.parseAccessSchedule("[]"), null);
  assert.equal(P.parseAccessSchedule(""), null);
});

test("parseRateLimits keeps well-formed numeric rules only", () => {
  const out = P.parseRateLimits(
    JSON.stringify([{ limit: 10, window: 60 }, { limit: "x", window: 1 }, null])
  );
  assert.deepEqual(out, [{ limit: 10, window: 60 }]);
  assert.equal(P.parseRateLimits("not array"), null);
  assert.equal(P.parseRateLimits(""), null);
});

test("host re-exports the two public row types (compile-time) and the parsers stay wired", async () => {
  // type-only re-export can't be probed at runtime; assert the host module still loads + exposes its API
  const HOST = await import("../../src/lib/db/apiKeys.ts");
  assert.equal(typeof (HOST as Record<string, unknown>).getApiKeys, "function");
  assert.equal(typeof (HOST as Record<string, unknown>).isModelAllowedForKey, "function");
});
