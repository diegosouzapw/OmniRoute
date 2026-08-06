/**
 * tests/unit/radar-sync.test.ts
 *
 * TDD regression guard for the Radar client sync layer:
 * - feedSchema.ts: Zod schema validation
 * - pinnedKeys.ts: Ed25519 public key handling
 * - verify.ts: signature verification over exact bytes
 * - sync.ts: download/verify/validate/cache pipeline
 *
 * Uses an ephemeral Ed25519 keypair generated at test time.
 * The test public key is injected via `RADAR_FEED_PUBKEY` env override
 * to prove the fork path works.
 */

import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Generate ephemeral Ed25519 keypair for testing
// ---------------------------------------------------------------------------

const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");

// Export the public key as base64 SPKI-DER (same format as the pinned key)
const PUB_KEY_DER = publicKey.export({ type: "spki", format: "der" });
const PUB_KEY_B64 = PUB_KEY_DER.toString("base64");

// Inject as env override so pinnedKeys.ts picks it up (fork path)
process.env.RADAR_FEED_PUBKEY = PUB_KEY_B64;

// ---------------------------------------------------------------------------
// Load the fixture
// ---------------------------------------------------------------------------

const FIXTURE_PATH = path.resolve(import.meta.dirname!, "../fixtures/radar-feed-canonical.json");
const FIXTURE_BYTES = fs.readFileSync(FIXTURE_PATH);
const FIXTURE_STRING = FIXTURE_BYTES.toString("utf-8");

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function signBytes(bytes: Buffer): string {
  const sig = crypto.sign(null, bytes, privateKey);
  return sig.toString("base64");
}

function tamperByte(buf: Buffer): Buffer {
  const copy = Buffer.from(buf);
  copy[0] = copy[0] ^ 0xff; // flip bits of first byte
  return copy;
}

/** Build a minimal Response-like object for fetch mock. */
function mockResponse(body: Buffer, headers: Record<string, string> = {}, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Map(Object.entries(headers)),
    arrayBuffer: () =>
      Promise.resolve(body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength)),
  } as unknown as Response;
}

// ---------------------------------------------------------------------------
// Import modules under test (after env override)
// ---------------------------------------------------------------------------

const feedSchema = await import("../../src/lib/radar/feedSchema.ts");
const pinnedKeys = await import("../../src/lib/radar/pinnedKeys.ts");
const verify = await import("../../src/lib/radar/verify.ts");
const syncMod = await import("../../src/lib/radar/sync.ts");

// ===========================================================================
// Contract test: fixture sha256
// ===========================================================================

test("contract: fixture sha256 matches the server's canonical hash", () => {
  const hash = crypto.createHash("sha256").update(FIXTURE_BYTES).digest("hex");
  assert.equal(
    hash,
    "13992d27702071bcb240306b052d0fdfacb2a2c688056c5e5118e92957e28a3d",
    "Fixture sha256 must match the server's canonical fixture. " +
      "If this fails, the fixture was modified or re-downloaded with different formatting."
  );
});

// ===========================================================================
// pinnedKeys.ts
// ===========================================================================

test("pinnedKeys: getFeedPublicKeys returns env override when set", () => {
  const keys = pinnedKeys.getFeedPublicKeys();
  assert.equal(keys.length, 1, "must return exactly one key from env override");
  assert.equal(keys[0], PUB_KEY_B64, "must return the env-overridden key");
});

test("pinnedKeys: toPublicKey handles base64-DER", () => {
  const keyObj = pinnedKeys.toPublicKey(PUB_KEY_B64);
  assert.ok(keyObj, "must return a KeyObject for valid base64-DER");
  assert.equal(keyObj.type, "public", "must be a public key");
});

test("pinnedKeys: toPublicKey handles PEM", () => {
  const pem = publicKey.export({ type: "spki", format: "pem" }).toString();
  const keyObj = pinnedKeys.toPublicKey(pem);
  assert.ok(keyObj, "must return a KeyObject for valid PEM");
});

test("pinnedKeys: toPublicKey returns null for garbage", () => {
  const keyObj = pinnedKeys.toPublicKey("not-a-valid-key");
  assert.equal(keyObj, null, "must return null for malformed input");
});

test("pinnedKeys: PINNED_FEED_PUBLIC_KEYS is a non-empty array", () => {
  assert.ok(Array.isArray(pinnedKeys.PINNED_FEED_PUBLIC_KEYS), "must be an array");
  assert.ok(pinnedKeys.PINNED_FEED_PUBLIC_KEYS.length > 0, "must have at least one pinned key");
});

// ===========================================================================
// verify.ts
// ===========================================================================

test("verifyFeedBytes: valid signature returns true", () => {
  const sig = signBytes(FIXTURE_BYTES);
  const result = verify.verifyFeedBytes(FIXTURE_BYTES, sig);
  assert.equal(result, true, "valid signature must verify");
});

test("verifyFeedBytes: tampered bytes return false", () => {
  const sig = signBytes(FIXTURE_BYTES);
  const tampered = tamperByte(FIXTURE_BYTES);
  const result = verify.verifyFeedBytes(tampered, sig);
  assert.equal(result, false, "tampered bytes must not verify");
});

test("verifyFeedBytes: tampered signature returns false", () => {
  const badSig = Buffer.from("invalid-signature-data-here").toString("base64");
  const result = verify.verifyFeedBytes(FIXTURE_BYTES, badSig);
  assert.equal(result, false, "bad signature must not verify");
});

test("verifyFeedBytes: empty bytes returns false", () => {
  const sig = signBytes(FIXTURE_BYTES);
  const result = verify.verifyFeedBytes(Buffer.alloc(0), sig);
  assert.equal(result, false, "empty bytes must return false");
});

test("verifyFeedBytes: empty signature returns false", () => {
  const result = verify.verifyFeedBytes(FIXTURE_BYTES, "");
  assert.equal(result, false, "empty signature must return false");
});

test("verifyFeedBytes: never throws on malformed input", () => {
  // Should not throw even with completely invalid inputs
  assert.equal(verify.verifyFeedBytes(Buffer.alloc(1), ""), false);
  assert.equal(verify.verifyFeedBytes(Buffer.from("x"), "!!!"), false);
});

// ===========================================================================
// feedSchema.ts
// ===========================================================================

test("feedSchema: valid fixture parses successfully", () => {
  const parsed = JSON.parse(FIXTURE_STRING);
  const result = feedSchema.RadarFeedSchema.safeParse(parsed);
  assert.equal(
    result.success,
    true,
    "fixture must parse: " + (result.success ? "" : JSON.stringify(result.error?.issues))
  );
});

test("feedSchema: rejects missing required fields", () => {
  const parsed = JSON.parse(FIXTURE_STRING);
  delete parsed.feed;
  const result = feedSchema.RadarFeedSchema.safeParse(parsed);
  assert.equal(result.success, false, "must reject missing 'feed' field");
});

test("feedSchema: rejects wrong feed literal", () => {
  const parsed = JSON.parse(FIXTURE_STRING);
  parsed.feed = "wrong-feed";
  const result = feedSchema.RadarFeedSchema.safeParse(parsed);
  assert.equal(result.success, false, "must reject wrong feed literal");
});

test("feedSchema: rejects wrong schemaVersion", () => {
  const parsed = JSON.parse(FIXTURE_STRING);
  parsed.schemaVersion = 2;
  const result = feedSchema.RadarFeedSchema.safeParse(parsed);
  assert.equal(result.success, false, "must reject schemaVersion != 1");
});

test("feedSchema: budget per_model requires positive tokensPerMonth", () => {
  const parsed = JSON.parse(FIXTURE_STRING);
  parsed.models[0].budget.tokensPerMonth = 0;
  const result = feedSchema.RadarFeedSchema.safeParse(parsed);
  assert.equal(result.success, false, "must reject tokensPerMonth <= 0");
});

// ===========================================================================
// compareVersions
// ===========================================================================

test("compareVersions: equal versions return 0", () => {
  assert.equal(syncMod.compareVersions("2026.08.01.1", "2026.08.01.1"), 0);
});

test("compareVersions: newer > older", () => {
  assert.ok(syncMod.compareVersions("2026.08.02.1", "2026.08.01.1") > 0);
});

test("compareVersions: older < newer", () => {
  assert.ok(syncMod.compareVersions("2026.08.01.1", "2026.08.02.1") < 0);
});

test("compareVersions: numeric compare, not lexicographic (2026.08.02.10 > 2026.08.02.9)", () => {
  assert.ok(
    syncMod.compareVersions("2026.08.02.10", "2026.08.02.9") > 0,
    "10 must be greater than 9 numerically"
  );
  assert.ok(
    syncMod.compareVersions("2026.08.02.9", "2026.08.02.10") < 0,
    "9 must be less than 10 numerically"
  );
});

test("compareVersions: different lengths", () => {
  assert.ok(syncMod.compareVersions("2026.08.02", "2026.08.01.99") > 0);
});

// ===========================================================================
// nextSyncTime
// ===========================================================================

test("nextSyncTime: null => epoch (sync now)", () => {
  const t = syncMod.nextSyncTime(null);
  assert.equal(t.getTime(), 0, "null must return epoch");
});

test("nextSyncTime: returns ~24h after last sync", () => {
  const last = "2026-08-03T12:00:00Z";
  const next = syncMod.nextSyncTime(last);
  const expected = new Date("2026-08-03T12:00:00Z").getTime() + 24 * 60 * 60 * 1000;
  assert.equal(next.getTime(), expected, "must be 24h after last sync");
});

// ===========================================================================
// syncRadar — comprehensive integration tests
// ===========================================================================

test("syncRadar: flag off => disabled, no fetch call", async () => {
  let fetchCalled = false;
  const result = await syncMod.syncRadar({
    getFlag: () => false,
    fetch: (() => {
      fetchCalled = true;
      return Promise.resolve(mockResponse(Buffer.from("{}")));
    }) as unknown as typeof globalThis.fetch,
  });

  assert.deepEqual(result, { status: "disabled" });
  assert.equal(fetchCalled, false, "fetch must NOT be called when flag is off");
});

test("syncRadar: opt-in false => opt_out, no fetch call", async () => {
  let fetchCalled = false;
  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: false, supporterKey: null }),
    fetch: (() => {
      fetchCalled = true;
      return Promise.resolve(mockResponse(Buffer.from("{}")));
    }) as unknown as typeof globalThis.fetch,
  });

  assert.deepEqual(result, { status: "opt_out" });
  assert.equal(fetchCalled, false, "fetch must NOT be called when opt-in is false");
});

test("syncRadar: valid signature => cache updated, payload byte-identical to fixture", async () => {
  const sig = signBytes(FIXTURE_BYTES);
  const cacheStore: syncMod.RadarCacheEntry[] = [];

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: (entry) => {
      cacheStore.push(entry);
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(FIXTURE_BYTES, { "x-omniroute-feed-signature": sig })
      )) as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-08-03T12:00:00Z"),
  });

  assert.equal(result.status, "updated");
  assert.equal(cacheStore.length, 1, "cache must be written exactly once");
  assert.equal(
    cacheStore[0].payload,
    FIXTURE_STRING,
    "cached payload must be byte-identical to fixture file content"
  );
  assert.equal(cacheStore[0].version, "2026.08.01.1");
  assert.equal(cacheStore[0].tier, "community");
  assert.equal(cacheStore[0].signature, sig);
  assert.equal(cacheStore[0].fetchedAt, "2026-08-03T12:00:00.000Z");
});

test("syncRadar: tampered bytes => invalid_signature, cache untouched", async () => {
  const sig = signBytes(FIXTURE_BYTES);
  const tampered = tamperByte(FIXTURE_BYTES);
  let cacheWritten = false;

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: () => {
      cacheWritten = true;
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(tampered, { "x-omniroute-feed-signature": sig })
      )) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "invalid_signature");
  assert.equal(cacheWritten, false, "cache must NOT be written on invalid signature");
});

test("syncRadar: valid sig over garbage JSON => invalid_schema, cache untouched", async () => {
  const garbageBytes = Buffer.from('{"not":"a-valid-feed"}');
  const sig = signBytes(garbageBytes);
  let cacheWritten = false;

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: () => {
      cacheWritten = true;
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(garbageBytes, { "x-omniroute-feed-signature": sig })
      )) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "invalid_schema");
  assert.equal(cacheWritten, false, "cache must NOT be written on invalid schema");
});

test("syncRadar: version floor — same version => stale, cache untouched", async () => {
  const sig = signBytes(FIXTURE_BYTES);
  let cacheWritten = false;

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => ({
      version: "2026.08.01.1",
      tier: "community",
      payload: "{}",
      signature: "old-sig",
    }),
    setCache: () => {
      cacheWritten = true;
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(FIXTURE_BYTES, { "x-omniroute-feed-signature": sig })
      )) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "stale");
  assert.equal(cacheWritten, false, "cache must NOT be overwritten with same version");
});

test("syncRadar: version floor — incoming older => stale", async () => {
  const sig = signBytes(FIXTURE_BYTES);
  let cacheWritten = false;

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => ({
      version: "2026.08.02.1",
      tier: "community",
      payload: "{}",
      signature: "old-sig",
    }),
    setCache: () => {
      cacheWritten = true;
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(FIXTURE_BYTES, { "x-omniroute-feed-signature": sig })
      )) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "stale");
  assert.equal(cacheWritten, false, "cache must NOT be overwritten with older version");
});

test("syncRadar: version floor — incoming newer => updated", async () => {
  // Modify fixture to have a newer version
  const fixtureObj = JSON.parse(FIXTURE_STRING);
  fixtureObj.version = "2026.08.02.1";
  const newerBytes = Buffer.from(JSON.stringify(fixtureObj));
  const sig = signBytes(newerBytes);
  const cacheStore: syncMod.RadarCacheEntry[] = [];

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => ({
      version: "2026.08.01.1",
      tier: "community",
      payload: "{}",
      signature: "old-sig",
    }),
    setCache: (entry) => {
      cacheStore.push(entry);
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(newerBytes, { "x-omniroute-feed-signature": sig })
      )) as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-08-03T12:00:00Z"),
  });

  assert.equal(result.status, "updated");
  assert.equal(cacheStore.length, 1);
  assert.equal(cacheStore[0].version, "2026.08.02.1");
});

test("syncRadar: numeric version compare (2026.08.02.9 vs 2026.08.02.10)", async () => {
  // Cached is .9, incoming is .10 => should be updated
  const fixtureObj = JSON.parse(FIXTURE_STRING);
  fixtureObj.version = "2026.08.02.10";
  const newerBytes = Buffer.from(JSON.stringify(fixtureObj));
  const sig = signBytes(newerBytes);
  const cacheStore: syncMod.RadarCacheEntry[] = [];

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => ({
      version: "2026.08.02.9",
      tier: "community",
      payload: "{}",
      signature: "old-sig",
    }),
    setCache: (entry) => {
      cacheStore.push(entry);
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(newerBytes, { "x-omniroute-feed-signature": sig })
      )) as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-08-03T12:00:00Z"),
  });

  assert.equal(result.status, "updated", ".10 must be considered newer than .9");
  assert.equal(cacheStore[0].version, "2026.08.02.10");
});

test("syncRadar: network error => error with no stack in reason", async () => {
  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    fetch: (() => Promise.reject(new Error("ECONNREFUSED"))) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "error");
  if (result.status === "error") {
    assert.ok(result.reason.length > 0, "reason must not be empty");
    assert.ok(
      !result.reason.includes("at ") &&
        !result.reason.includes(".ts:") &&
        !result.reason.includes(".js:"),
      "reason must NOT contain stack trace paths"
    );
    assert.ok(
      !result.reason.includes("ECONNREFUSED") || result.reason.includes("ECONNREFUSED"),
      "reason should be sanitized but may include the error name"
    );
  }
});

test("syncRadar: timeout => error with no stack in reason", async () => {
  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    fetch: (() =>
      Promise.reject(
        new DOMException("The operation was aborted", "AbortError")
      )) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "error");
  if (result.status === "error") {
    assert.ok(result.reason.length > 0, "reason must not be empty");
    assert.ok(
      !result.reason.includes("at ") &&
        !result.reason.includes(".ts:") &&
        !result.reason.includes(".js:"),
      "reason must NOT contain stack trace paths"
    );
  }
});

test("syncRadar: HTTP non-200 => error", async () => {
  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    fetch: (() =>
      Promise.resolve(
        mockResponse(Buffer.from("Internal Server Error"), {}, 500)
      )) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "error");
  if (result.status === "error") {
    assert.ok(result.reason.includes("500"), "reason must mention the status code");
  }
});

test("syncRadar: sends Authorization header when supporter key exists", async () => {
  let capturedHeaders: Record<string, string> = {};
  const sig = signBytes(FIXTURE_BYTES);

  await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: "omr_test-key-123" }),
    getCache: () => null,
    setCache: () => {},
    fetch: ((url: string, init: RequestInit) => {
      capturedHeaders = Object.fromEntries(
        (init.headers as Record<string, string> | undefined)
          ? Object.entries(init.headers as Record<string, string>)
          : []
      );
      return Promise.resolve(mockResponse(FIXTURE_BYTES, { "x-omniroute-feed-signature": sig }));
    }) as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-08-03T12:00:00Z"),
  });

  assert.equal(
    capturedHeaders["Authorization"],
    "Bearer omr_test-key-123",
    "must send Bearer token when supporter key exists"
  );
});

test("syncRadar: no Authorization header when no supporter key", async () => {
  let capturedHeaders: Record<string, string> = {};
  const sig = signBytes(FIXTURE_BYTES);

  await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: () => {},
    fetch: ((url: string, init: RequestInit) => {
      capturedHeaders = Object.fromEntries(
        (init.headers as Record<string, string> | undefined)
          ? Object.entries(init.headers as Record<string, string>)
          : []
      );
      return Promise.resolve(mockResponse(FIXTURE_BYTES, { "x-omniroute-feed-signature": sig }));
    }) as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-08-03T12:00:00Z"),
  });

  assert.equal(
    capturedHeaders["Authorization"],
    undefined,
    "must NOT send Authorization header without supporter key"
  );
});

test("syncRadar: missing signature header => invalid_signature", async () => {
  let cacheWritten = false;

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: () => {
      cacheWritten = true;
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(FIXTURE_BYTES, {}) // no signature header
      )) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "invalid_signature");
  assert.equal(cacheWritten, false, "cache must NOT be written");
});

// ===========================================================================
// syncRadar — served-tier header (x-omniroute-feed-tier)
//
// Regression guard for the defect where a FREE user on a stale/community
// snapshot saw "Ao vivo (tempo real)" in the UI: the signed body always
// carries tier:"live" by design (one signed artifact per version), so the
// client MUST trust the `x-omniroute-feed-tier` response header — the
// tier ACTUALLY served — rather than the body field.
// ===========================================================================

test("syncRadar: header 'community' overrides body tier:'live' — cache + result use community", async () => {
  const fixtureObj = JSON.parse(FIXTURE_STRING);
  fixtureObj.tier = "live"; // signed body always says "live"
  const bytes = Buffer.from(JSON.stringify(fixtureObj));
  const sig = signBytes(bytes);
  const cacheStore: syncMod.RadarCacheEntry[] = [];

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: (entry) => {
      cacheStore.push(entry);
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(bytes, {
          "x-omniroute-feed-signature": sig,
          "x-omniroute-feed-tier": "community",
        })
      )) as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-08-03T12:00:00Z"),
  });

  assert.equal(result.status, "updated");
  if (result.status === "updated") {
    assert.equal(
      result.tier,
      "community",
      "syncRadar() must return the served tier from the header, not the body"
    );
  }
  assert.equal(cacheStore.length, 1);
  assert.equal(
    cacheStore[0].tier,
    "community",
    "cache must store the served tier from the header, not the body"
  );
});

test("syncRadar: header 'live' => cache + result use live", async () => {
  const fixtureObj = JSON.parse(FIXTURE_STRING);
  fixtureObj.tier = "live";
  const bytes = Buffer.from(JSON.stringify(fixtureObj));
  const sig = signBytes(bytes);
  const cacheStore: syncMod.RadarCacheEntry[] = [];

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: "omr_supporter-key" }),
    getCache: () => null,
    setCache: (entry) => {
      cacheStore.push(entry);
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(bytes, {
          "x-omniroute-feed-signature": sig,
          "x-omniroute-feed-tier": "live",
        })
      )) as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-08-03T12:00:00Z"),
  });

  assert.equal(result.status, "updated");
  if (result.status === "updated") {
    assert.equal(result.tier, "live");
  }
  assert.equal(cacheStore[0].tier, "live");
});

test("syncRadar: header absent => falls back to body tier (older server)", async () => {
  const fixtureObj = JSON.parse(FIXTURE_STRING);
  fixtureObj.tier = "community";
  const bytes = Buffer.from(JSON.stringify(fixtureObj));
  const sig = signBytes(bytes);
  const cacheStore: syncMod.RadarCacheEntry[] = [];

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: (entry) => {
      cacheStore.push(entry);
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(bytes, { "x-omniroute-feed-signature": sig }) // no tier header
      )) as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-08-03T12:00:00Z"),
  });

  assert.equal(result.status, "updated");
  if (result.status === "updated") {
    assert.equal(
      result.tier,
      "community",
      "must fall back to the body tier when the header is absent"
    );
  }
  assert.equal(cacheStore[0].tier, "community");
});

test("syncRadar: header holds a garbage value => falls back to body tier, garbage never stored", async () => {
  const fixtureObj = JSON.parse(FIXTURE_STRING);
  fixtureObj.tier = "live";
  const bytes = Buffer.from(JSON.stringify(fixtureObj));
  const sig = signBytes(bytes);
  const cacheStore: syncMod.RadarCacheEntry[] = [];

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: (entry) => {
      cacheStore.push(entry);
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(bytes, {
          "x-omniroute-feed-signature": sig,
          "x-omniroute-feed-tier": "premium", // arbitrary/garbage header value
        })
      )) as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-08-03T12:00:00Z"),
  });

  assert.equal(result.status, "updated");
  if (result.status === "updated") {
    assert.equal(result.tier, "live", "garbage header must never be trusted — falls back to body");
    assert.notEqual(result.tier as string, "premium");
  }
  assert.equal(cacheStore[0].tier, "live");
  assert.notEqual(
    cacheStore[0].tier as string,
    "premium",
    "garbage header value must never reach the cache"
  );
});

test("syncRadar: header holds an empty string => falls back to body tier", async () => {
  const fixtureObj = JSON.parse(FIXTURE_STRING);
  fixtureObj.tier = "community";
  const bytes = Buffer.from(JSON.stringify(fixtureObj));
  const sig = signBytes(bytes);
  const cacheStore: syncMod.RadarCacheEntry[] = [];

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: (entry) => {
      cacheStore.push(entry);
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(bytes, {
          "x-omniroute-feed-signature": sig,
          "x-omniroute-feed-tier": "",
        })
      )) as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-08-03T12:00:00Z"),
  });

  assert.equal(result.status, "updated");
  if (result.status === "updated") {
    assert.equal(result.tier, "community");
  }
  assert.equal(cacheStore[0].tier, "community");
});

test("syncRadar: first sync (no cache) with valid data => updated", async () => {
  const sig = signBytes(FIXTURE_BYTES);
  const cacheStore: syncMod.RadarCacheEntry[] = [];

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null, // no existing cache
    setCache: (entry) => {
      cacheStore.push(entry);
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(FIXTURE_BYTES, { "x-omniroute-feed-signature": sig })
      )) as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-08-03T12:00:00Z"),
  });

  assert.equal(result.status, "updated");
  assert.equal(cacheStore.length, 1);
});
