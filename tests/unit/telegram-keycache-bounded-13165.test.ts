/**
 * Regression test for #13165: the Telegram per-user key cache must stay bounded.
 *
 * `resolveUserApiKey()` is reachable from the webhook path of
 * POST /api/telegram/update with a caller-supplied chat id, so an uncapped Map
 * grows for the lifetime of the process. The cache is module-private, so this
 * asserts the observable LRU contract: a cold id is re-minted after a burst of
 * distinct ids (proving eviction), while a recently used id survives it.
 *
 * Runner: node:test (tests/unit/*.test.ts), so DB access is stubbed through a
 * module mock rather than vi.mock.
 */
import { test, describe, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

const CAP = 1000;

/** Names passed to createApiKey — one entry per real mint (i.e. per cache miss). */
const minted: string[] = [];

let resolveUserApiKey: (id: number) => Promise<string>;

before(async () => {
  // Stub the DB + machine-id modules so nothing touches SQLite. The loader
  // matches the specifiers used by chatProxy.ts. The stub must export every
  // name the real module exports: chatProxy pulls in the chat handler, which
  // imports other members of this module, and a missing export is a module-load
  // SyntaxError that would look like a failing assertion.
  const dbExports = [
    "clearApiKeyCaches",
    "deleteApiKey",
    "getApiKeyById",
    "getApiKeyMetadata",
    "getApiKeysCount",
    "getExclusiveLeaseConnectionIds",
    "isModelAllowedForKey",
    "pickApiKeyForInternalUse",
    "regenerateApiKey",
    "resetApiKeyState",
    "revokeApiKey",
    "setApiKeyExpiry",
    "updateApiKeyPermissions",
    "validateApiKey",
  ];

  const dbStub = `
    export async function getApiKeys() { return []; }
    export async function createApiKey(name) {
      globalThis.__mintedKeys.push(name);
      return { key: "sk-omni-" + "x".repeat(32) + "-" + name };
    }
    ${dbExports.map((n) => `export async function ${n}() { return null; }`).join("\n")}
  `;
  const machineStub = `
    export async function getConsistentMachineId() { return "0000000000000000"; }
  `;

  (globalThis as Record<string, unknown>).__mintedKeys = minted;

  const loader = `
    export async function resolve(spec, ctx, next) {
      if (spec.includes("db/apiKeys")) {
        return { url: "data:text/javascript,${encodeURIComponent(dbStub)}", shortCircuit: true };
      }
      if (spec.includes("machineId")) {
        return { url: "data:text/javascript,${encodeURIComponent(machineStub)}", shortCircuit: true };
      }
      return next(spec, ctx);
    }
  `;
  register("data:text/javascript," + encodeURIComponent(loader), pathToFileURL("./"));

  ({ resolveUserApiKey } = await import("../../src/lib/telegram/chatProxy.ts"));
});

describe("telegram keyCache bounding (#13165)", () => {
  beforeEach(() => {
    minted.length = 0;
  });

  test("evicts a cold id once the cap is exceeded", async () => {
    const victim = 7_000_001;
    const beforeFirstResolve = minted.length;
    await resolveUserApiKey(victim);
    assert.equal(minted.length - beforeFirstResolve, 1, "first resolve should mint exactly once");

    // Never touch `victim` again: it must fall out of a CAP-sized cache.
    for (let i = 0; i < CAP + 50; i++) await resolveUserApiKey(600_000 + i);

    // Measure the victim's own resolve in isolation. Comparing against the
    // running total would be dominated by the burst's own mints and would pass
    // even with an unbounded cache.
    const beforeVictimResolve = minted.length;
    await resolveUserApiKey(victim);
    const mintedForVictim = minted.length - beforeVictimResolve;

    // Evicted => cache miss => exactly one fresh mint for this id.
    assert.equal(
      mintedForVictim,
      1,
      `expected victim to be re-minted after eviction, got ${mintedForVictim} mint(s)`
    );
  });

  test("keeps a recently used id alive across a burst of new ids", async () => {
    const active = 8_000_001;
    const first = await resolveUserApiKey(active);

    // Touch the active id throughout the burst so it stays most-recently-used.
    for (let i = 0; i < CAP * 2; i++) {
      await resolveUserApiKey(500_000 + i);
      if (i % 100 === 0) await resolveUserApiKey(active);
    }

    const mintsBefore = minted.length;
    const again = await resolveUserApiKey(active);

    assert.equal(again, first, "active id should keep its cached key");
    assert.equal(minted.length, mintsBefore, "active id should not be re-minted");
  });
});
