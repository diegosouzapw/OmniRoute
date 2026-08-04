/**
 * Characterization + API-surface test: proxies.ts god-file decomposition.
 *
 * The host src/lib/db/proxies.ts was split into two sibling leaf modules under
 * src/lib/db/proxies/:
 *   - types.ts   — the 10 proxy type/interface declarations
 *   - mappers.ts — the pure row mappers / scope normalizers / payload coercers
 *                  (toRecord, mapProxyRow, isRelayProxyType, extractRelayAuth,
 *                   normalizeScope, toLegacyProxyLevel, coerceProxyPayload,
 *                   redactProxySecrets, …)
 *
 * The tightly-coupled CRUD + assignment + resolution core stays in the host
 * (resolution calls createProxy/assignProxyToScope, so extracting it would
 * create an import cycle).
 *
 * Verifies that:
 *   1. The pure mappers behave correctly (DB-free).
 *   2. The host proxies.ts still re-exports the FULL public API (20 functions).
 *   3. The mappers leaf exports its pieces directly.
 *
 * Pure typeof/behaviour checks only — no DB handle is opened.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// ── 1. mappers.ts — pure helper behaviour ────────────────────────────────────

import {
  isRelayProxyType,
  extractRelayAuth,
  normalizeScope,
  normalizeAssignmentScopeId,
  toLegacyProxyLevel,
} from "../../src/lib/db/proxies/mappers.ts";

describe("proxies/mappers — isRelayProxyType", () => {
  it("is true only for relay proxy types", () => {
    for (const t of ["vercel", "deno", "cloudflare"]) {
      assert.equal(isRelayProxyType(t), true, t);
    }
  });
  it("is false for non-relay or non-string input", () => {
    assert.equal(isRelayProxyType("http"), false);
    assert.equal(isRelayProxyType("socks5"), false);
    assert.equal(isRelayProxyType(123), false);
    assert.equal(isRelayProxyType(null), false);
  });
});

describe("proxies/mappers — normalizeScope", () => {
  it("maps the legacy 'key' alias to 'account'", () => {
    assert.equal(normalizeScope("key"), "account");
  });
  it("passes through known scopes (case-insensitive)", () => {
    assert.equal(normalizeScope("Provider"), "provider");
    assert.equal(normalizeScope("ACCOUNT"), "account");
    assert.equal(normalizeScope("combo"), "combo");
  });
  it("defaults to 'global' for unknown / empty", () => {
    assert.equal(normalizeScope("bogus"), "global");
    assert.equal(normalizeScope(""), "global");
  });
});

describe("proxies/mappers — normalizeAssignmentScopeId", () => {
  it("returns the sentinel for the global scope", () => {
    assert.equal(normalizeAssignmentScopeId("global", "ignored"), "__global__");
  });
  it("returns the scopeId (or null) for other scopes", () => {
    assert.equal(normalizeAssignmentScopeId("provider", "openai"), "openai");
    assert.equal(normalizeAssignmentScopeId("account", null), null);
    assert.equal(normalizeAssignmentScopeId("account", undefined), null);
  });
});

describe("proxies/mappers — toLegacyProxyLevel", () => {
  it("maps 'account' back to the legacy 'key' level", () => {
    assert.equal(toLegacyProxyLevel("account"), "key");
  });
  it("passes through the other scopes unchanged", () => {
    assert.equal(toLegacyProxyLevel("global"), "global");
    assert.equal(toLegacyProxyLevel("provider"), "provider");
    assert.equal(toLegacyProxyLevel("combo"), "combo");
  });
});

describe("proxies/mappers — extractRelayAuth", () => {
  it("returns undefined for non-string input", () => {
    assert.equal(extractRelayAuth(null), undefined);
    assert.equal(extractRelayAuth(42), undefined);
  });
  it("returns undefined for invalid JSON (try/catch)", () => {
    assert.equal(extractRelayAuth("not json"), undefined);
  });
  it("returns the plaintext relayAuth field when present", () => {
    assert.equal(extractRelayAuth(JSON.stringify({ relayAuth: "tok-123" })), "tok-123");
  });
  it("returns undefined when no relay auth is stored", () => {
    assert.equal(extractRelayAuth(JSON.stringify({ other: "x" })), undefined);
  });
});

// ── 2. proxies.ts — full public API surface preserved ────────────────────────

const host = await import("../../src/lib/db/proxies.ts");

describe("proxies.ts public API surface (20 symbols)", () => {
  const expected = [
    "assignProxyToScope",
    "bulkAssignProxyToScope",
    "createProxy",
    "createProxyAndAssign",
    "deleteProxyById",
    "extractRelayAuth", // re-export from mappers
    "getProxyAssignments",
    "getProxyById",
    "getProxyHealthStats",
    "getProxyRegistryGeneration",
    "getProxyWhereUsed",
    "listProxies",
    "migrateLegacyProxyConfigToRegistry",
    "redactProxySecrets", // re-export from mappers
    "resolveProxyForConnectionFromRegistry",
    "resolveProxyForProvider",
    "resolveProxyForScopeFromRegistry",
    "updateProxy",
    "updateProxyAndAssign",
    "upsertProxy",
  ];

  for (const name of expected) {
    it(`re-exports ${name} as a function`, () => {
      assert.equal(typeof host[name], "function", `${name} must be a function on the host module`);
    });
  }

  it("exposes exactly the 20 expected callables (no public symbol lost)", () => {
    const missing = expected.filter((n) => typeof host[n] !== "function");
    assert.deepEqual(missing, [], `missing public exports: ${missing.join(", ")}`);
  });
});

// ── 3. mappers leaf exports its slice directly ───────────────────────────────

describe("mappers.ts exports its public helpers directly", () => {
  it("re-exported public mappers are functions on the leaf", async () => {
    const mappers = await import("../../src/lib/db/proxies/mappers.ts");
    assert.equal(typeof mappers.extractRelayAuth, "function");
    assert.equal(typeof mappers.redactProxySecrets, "function");
    assert.equal(typeof mappers.coerceProxyPayload, "function");
  });
});
