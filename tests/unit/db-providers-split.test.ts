/**
 * Characterization + API-surface test: providers.ts god-file decomposition.
 *
 * The host src/lib/db/providers.ts was split into three sibling leaf modules
 * under src/lib/db/providers/:
 *   - columns.ts   — 10 pure column-normalizer helpers (DB-free)
 *   - nodes.ts     — 6 provider-node CRUD functions
 *   - rateLimit.ts — 6 rate-limit/quota runtime helpers + formatResetCountdown
 *
 * This test verifies that:
 *   1. The pure column helpers in columns.ts behave correctly (DB-free).
 *   2. The host providers.ts still re-exports the FULL public API surface (23
 *      symbols) so every existing consumer keeps importing from the same path.
 *   3. The leaf modules export their own pieces directly.
 *
 * Pure typeof/behaviour checks only — no function is invoked against the DB,
 * so no SQLite handle is opened (no resetDbInstance teardown required).
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── 1. columns.ts — pure helpers behaviour ───────────────────────────────────

import {
  normalizeBooleanColumn,
  sanitizeRateLimitOverrides,
  sanitizeQuotaWindowThresholds,
  serializeJsonField,
  toRecord,
  toStringOrNull,
  toNumberOrZero,
} from "../../src/lib/db/providers/columns.ts";

describe("providers/columns — normalizeBooleanColumn", () => {
  it("passes through real booleans", () => {
    assert.equal(normalizeBooleanColumn(true, false), true);
    assert.equal(normalizeBooleanColumn(false, true), false);
  });
  it("maps SQLite integer flags (1/0)", () => {
    assert.equal(normalizeBooleanColumn(1, false), true);
    assert.equal(normalizeBooleanColumn(0, true), false);
  });
  it("parses string flags case-insensitively", () => {
    assert.equal(normalizeBooleanColumn("True", false), true);
    assert.equal(normalizeBooleanColumn("0", true), false);
  });
  it("returns the fallback for unrecognized values", () => {
    assert.equal(normalizeBooleanColumn("maybe", true), true);
    assert.equal(normalizeBooleanColumn(undefined, false), false);
  });
});

describe("providers/columns — sanitizeRateLimitOverrides", () => {
  it("returns null for nullish / non-object / array input", () => {
    assert.equal(sanitizeRateLimitOverrides(null), null);
    assert.equal(sanitizeRateLimitOverrides(undefined), null);
    assert.equal(sanitizeRateLimitOverrides("x"), null);
    assert.equal(sanitizeRateLimitOverrides([1, 2]), null);
  });
  it("keeps only allowed keys with non-negative integers", () => {
    assert.deepEqual(sanitizeRateLimitOverrides({ rpm: 10, bogus: 5, tpm: -1 }), { rpm: 10 });
  });
  it("returns null when nothing valid remains", () => {
    assert.equal(sanitizeRateLimitOverrides({ rpm: 1.5, nope: 3 }), null);
  });
});

describe("providers/columns — sanitizeQuotaWindowThresholds", () => {
  it("keeps only 0-100 integers", () => {
    assert.deepEqual(sanitizeQuotaWindowThresholds({ a: 50, b: 120, c: 0 }), { a: 50, c: 0 });
  });
  it("returns null when empty", () => {
    assert.equal(sanitizeQuotaWindowThresholds({ a: 200 }), null);
  });
});

describe("providers/columns — small coercers", () => {
  it("serializeJsonField stringifies objects, null otherwise", () => {
    assert.equal(serializeJsonField({ a: 1 }), '{"a":1}');
    assert.equal(serializeJsonField(null), null);
    assert.equal(serializeJsonField("str"), null);
  });
  it("toRecord returns objects as-is, {} otherwise", () => {
    const o = { x: 1 };
    assert.equal(toRecord(o), o);
    assert.deepEqual(toRecord(null), {});
    assert.deepEqual(toRecord(42), {});
  });
  it("toStringOrNull / toNumberOrZero coerce by type", () => {
    assert.equal(toStringOrNull("hi"), "hi");
    assert.equal(toStringOrNull(5), null);
    assert.equal(toNumberOrZero(7), 7);
    assert.equal(toNumberOrZero("7"), 0);
  });
});

// ── 2. providers.ts — full public API surface preserved ──────────────────────

const host = await import("../../src/lib/db/providers.ts");

describe("providers.ts public API surface (23 symbols)", () => {
  const expected = [
    // Connection CRUD (kept in host)
    "getProviderConnections",
    "getProviderConnectionById",
    "createProviderConnection",
    "updateProviderConnection",
    "deleteProviderConnection",
    "deleteProviderConnections",
    "deleteProviderConnectionsByProvider",
    "reorderProviderConnections",
    "cleanupProviderConnections",
    "getDistinctGroups",
    "autoMigrateLegacyEncryptedConnections",
    // Provider nodes (re-exported from ./providers/nodes)
    "getProviderNodes",
    "getProviderNodeById",
    "resolveProviderNodeForConnection",
    "createProviderNode",
    "updateProviderNode",
    "deleteProviderNode",
    // Rate-limit / quota runtime (re-exported from ./providers/rateLimit)
    "setConnectionRateLimitUntil",
    "isConnectionRateLimited",
    "getRateLimitedConnections",
    "getEffectiveQuotaUsage",
    "clearStaleCrashCooldowns",
    "formatResetCountdown",
  ];

  for (const name of expected) {
    it(`re-exports ${name} as a function`, () => {
      assert.equal(typeof host[name], "function", `${name} must be a function on the host module`);
    });
  }

  it("exposes exactly the 23 expected callables (no public symbol lost)", () => {
    const missing = expected.filter((n) => typeof host[n] !== "function");
    assert.deepEqual(missing, [], `missing public exports: ${missing.join(", ")}`);
  });
});

// ── 3. leaf modules export their own pieces ──────────────────────────────────

describe("leaf modules export their slices directly", () => {
  it("nodes.ts exports the 6 node CRUD functions", async () => {
    const nodes = await import("../../src/lib/db/providers/nodes.ts");
    for (const fn of [
      "getProviderNodes",
      "getProviderNodeById",
      "resolveProviderNodeForConnection",
      "createProviderNode",
      "updateProviderNode",
      "deleteProviderNode",
    ]) {
      assert.equal(typeof nodes[fn], "function", `nodes.${fn}`);
    }
  });

  it("rateLimit.ts exports the 6 runtime helpers", async () => {
    const rl = await import("../../src/lib/db/providers/rateLimit.ts");
    for (const fn of [
      "setConnectionRateLimitUntil",
      "isConnectionRateLimited",
      "getRateLimitedConnections",
      "getEffectiveQuotaUsage",
      "clearStaleCrashCooldowns",
      "formatResetCountdown",
    ]) {
      assert.equal(typeof rl[fn], "function", `rateLimit.${fn}`);
    }
  });
});
