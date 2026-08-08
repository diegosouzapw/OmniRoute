/**
 * tests/unit/radar-referrals-sync.test.ts
 *
 * TDD regression guard for the standalone Radar referrals feed sync layer
 * (`GET /v1/referrals/latest`) — the fix that removes the up-to-30-day
 * community-tier delay referral links used to inherit from the catalog
 * feed:
 * - referralsFeedSchema.ts: Zod schema validation
 * - referralsSync.ts: download/verify/validate/cache pipeline +
 *   `shouldSyncReferralsOnRead` staleness helper
 *
 * Mirrors tests/unit/radar-sync.test.ts's structure and conventions (same
 * ephemeral Ed25519 keypair + `RADAR_FEED_PUBKEY` override, same
 * mockResponse() shape) — the referrals feed reuses the exact same pinned
 * key as the catalog feed.
 */

import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

// ---------------------------------------------------------------------------
// Generate ephemeral Ed25519 keypair for testing
// ---------------------------------------------------------------------------

const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
const PUB_KEY_DER = publicKey.export({ type: "spki", format: "der" });
const PUB_KEY_B64 = PUB_KEY_DER.toString("base64");

// Inject as env override so pinnedKeys.ts picks it up (fork path) — same
// pinned key backs both the catalog and the referrals feed.
process.env.RADAR_FEED_PUBKEY = PUB_KEY_B64;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function signBytes(bytes: Buffer): string {
  const sig = crypto.sign(null, bytes, privateKey);
  return sig.toString("base64");
}

function tamperByte(buf: Buffer): Buffer {
  const copy = Buffer.from(buf);
  copy[0] = copy[0] ^ 0xff;
  return copy;
}

/** Build a minimal Response-like object for fetch mock (matches radar-sync.test.ts). */
function mockResponse(body: Buffer, headers: Record<string, string> = {}, status = 200): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Map(Object.entries(headers)),
    arrayBuffer: () =>
      Promise.resolve(body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength)),
  } as unknown as Response;
}

function baseReferralsFeed(generatedAt = "2026-08-07T12:00:00.000Z"): Record<string, unknown> {
  return {
    feed: "omniroute-radar-referrals",
    schemaVersion: 1,
    generatedAt,
    referrals: {
      fixed: [
        {
          provider: "groq",
          url: "https://groq.com/?ref=omniroute",
          kind: "fixo",
          validUntil: null,
          requiredAction: null,
          isDefault: true,
        },
      ],
      campaigns: [],
    },
  };
}

function feedBytes(feed: Record<string, unknown>): Buffer {
  return Buffer.from(JSON.stringify(feed));
}

// ---------------------------------------------------------------------------
// Import modules under test (after env override)
// ---------------------------------------------------------------------------

const referralsFeedSchema = await import("../../src/lib/radar/referralsFeedSchema.ts");
const referralsSync = await import("../../src/lib/radar/referralsSync.ts");

// ===========================================================================
// referralsFeedSchema.ts
// ===========================================================================

test("RadarReferralsFeedSchema: valid feed parses successfully", () => {
  const result = referralsFeedSchema.RadarReferralsFeedSchema.safeParse(baseReferralsFeed());
  assert.equal(
    result.success,
    true,
    "valid feed must parse: " + (result.success ? "" : JSON.stringify(result.error?.issues))
  );
});

test("RadarReferralsFeedSchema: rejects wrong feed literal", () => {
  const feed = { ...baseReferralsFeed(), feed: "omniroute-radar" };
  const result = referralsFeedSchema.RadarReferralsFeedSchema.safeParse(feed);
  assert.equal(result.success, false, "must reject a catalog-feed literal");
});

test("RadarReferralsFeedSchema: rejects wrong schemaVersion", () => {
  const feed = { ...baseReferralsFeed(), schemaVersion: 2 };
  const result = referralsFeedSchema.RadarReferralsFeedSchema.safeParse(feed);
  assert.equal(result.success, false);
});

test("RadarReferralsFeedSchema: rejects missing referrals section", () => {
  const feed = baseReferralsFeed();
  delete (feed as Record<string, unknown>).referrals;
  const result = referralsFeedSchema.RadarReferralsFeedSchema.safeParse(feed);
  assert.equal(result.success, false, "referrals section is required (no old-feed compat needed here)");
});

test("RadarReferralsFeedSchema: rejects a non-https referral url", () => {
  const feed = baseReferralsFeed();
  (feed.referrals as { fixed: Array<Record<string, unknown>> }).fixed[0]!.url =
    "http://groq.com/?ref=omniroute";
  const result = referralsFeedSchema.RadarReferralsFeedSchema.safeParse(feed);
  assert.equal(result.success, false);
});

test("RadarReferralsFeedSchema: rejects an invalid generatedAt", () => {
  const feed = { ...baseReferralsFeed(), generatedAt: "not-a-date" };
  const result = referralsFeedSchema.RadarReferralsFeedSchema.safeParse(feed);
  assert.equal(result.success, false);
});

// ===========================================================================
// shouldSyncReferralsOnRead
// ===========================================================================

test("shouldSyncReferralsOnRead: null fetchedAt => stale (sync now)", () => {
  assert.equal(referralsSync.shouldSyncReferralsOnRead(null, Date.now()), true);
});

test("shouldSyncReferralsOnRead: unparseable fetchedAt => stale", () => {
  assert.equal(referralsSync.shouldSyncReferralsOnRead("garbage", Date.now()), true);
});

test("shouldSyncReferralsOnRead: fresh (< 1h) => not stale", () => {
  const now = Date.parse("2026-08-07T12:00:00.000Z");
  const fetchedAt = new Date(now - 30 * 60 * 1000).toISOString(); // 30m ago
  assert.equal(referralsSync.shouldSyncReferralsOnRead(fetchedAt, now), false);
});

test("shouldSyncReferralsOnRead: exactly at the boundary => stale", () => {
  const now = Date.parse("2026-08-07T12:00:00.000Z");
  const fetchedAt = new Date(now - 60 * 60 * 1000).toISOString(); // exactly 1h ago
  assert.equal(referralsSync.shouldSyncReferralsOnRead(fetchedAt, now), true);
});

test("shouldSyncReferralsOnRead: old (> 1h) => stale", () => {
  const now = Date.parse("2026-08-07T12:00:00.000Z");
  const fetchedAt = new Date(now - 2 * 60 * 60 * 1000).toISOString(); // 2h ago
  assert.equal(referralsSync.shouldSyncReferralsOnRead(fetchedAt, now), true);
});

// ===========================================================================
// syncRadarReferrals — gating (flag/opt-in), never touching the network
// ===========================================================================

test("syncRadarReferrals: flag off => disabled, no fetch call", async () => {
  let fetchCalled = false;
  const result = await referralsSync.syncRadarReferrals({
    getFlag: () => false,
    fetch: (() => {
      fetchCalled = true;
      return Promise.resolve(mockResponse(Buffer.from("{}")));
    }) as unknown as typeof globalThis.fetch,
  });
  assert.deepEqual(result, { status: "disabled" });
  assert.equal(fetchCalled, false);
});

test("syncRadarReferrals: opt-in false => opt_out, no fetch call", async () => {
  let fetchCalled = false;
  const result = await referralsSync.syncRadarReferrals({
    getFlag: () => true,
    getSettings: () => ({ optIn: false, supporterKey: null }),
    fetch: (() => {
      fetchCalled = true;
      return Promise.resolve(mockResponse(Buffer.from("{}")));
    }) as unknown as typeof globalThis.fetch,
  });
  assert.deepEqual(result, { status: "opt_out" });
  assert.equal(fetchCalled, false);
});

// ===========================================================================
// syncRadarReferrals — signature verification over exact bytes
// ===========================================================================

test("syncRadarReferrals: valid signature => cache updated, payload byte-identical", async () => {
  const feed = baseReferralsFeed();
  const bytes = feedBytes(feed);
  const sig = signBytes(bytes);
  const cacheStore: referralsSync.RadarReferralsCacheEntry[] = [];

  const result = await referralsSync.syncRadarReferrals({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: (entry) => {
      cacheStore.push(entry);
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(bytes, { "x-omniroute-feed-signature": sig, "x-omniroute-feed-tier": "community" })
      )) as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-08-07T12:05:00.000Z"),
  });

  assert.equal(result.status, "updated");
  assert.equal(cacheStore.length, 1);
  assert.equal(cacheStore[0]!.payload, bytes.toString("utf-8"));
  assert.equal(cacheStore[0]!.generatedAt, feed.generatedAt);
  assert.equal(cacheStore[0]!.tier, "community");
  assert.equal(cacheStore[0]!.signature, sig);
  assert.equal(cacheStore[0]!.fetchedAt, "2026-08-07T12:05:00.000Z");
});

test("syncRadarReferrals: tampered bytes => invalid_signature, cache untouched", async () => {
  const bytes = feedBytes(baseReferralsFeed());
  const sig = signBytes(bytes);
  const tampered = tamperByte(bytes);
  let cacheWritten = false;

  const result = await referralsSync.syncRadarReferrals({
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
  assert.equal(cacheWritten, false);
});

test("syncRadarReferrals: missing signature header => invalid_signature", async () => {
  const bytes = feedBytes(baseReferralsFeed());
  let cacheWritten = false;

  const result = await referralsSync.syncRadarReferrals({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: () => {
      cacheWritten = true;
    },
    fetch: (() => Promise.resolve(mockResponse(bytes, {}))) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "invalid_signature");
  assert.equal(cacheWritten, false);
});

test("syncRadarReferrals: valid sig over garbage JSON => invalid_schema, cache untouched", async () => {
  const garbageBytes = Buffer.from('{"not":"a-valid-referrals-feed"}');
  const sig = signBytes(garbageBytes);
  let cacheWritten = false;

  const result = await referralsSync.syncRadarReferrals({
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
  assert.equal(cacheWritten, false);
});

// ===========================================================================
// syncRadarReferrals — generatedAt floor (replay/no-op guard)
// ===========================================================================

test("syncRadarReferrals: same generatedAt as cache => stale, cache untouched", async () => {
  const feed = baseReferralsFeed("2026-08-07T12:00:00.000Z");
  const bytes = feedBytes(feed);
  const sig = signBytes(bytes);
  let cacheWritten = false;

  const result = await referralsSync.syncRadarReferrals({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => ({
      generatedAt: "2026-08-07T12:00:00.000Z",
      tier: "community",
      payload: "{}",
      signature: "old-sig",
    }),
    setCache: () => {
      cacheWritten = true;
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(bytes, { "x-omniroute-feed-signature": sig })
      )) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "stale");
  assert.equal(cacheWritten, false);
});

test("syncRadarReferrals: older generatedAt than cache => stale (replay rejected)", async () => {
  const feed = baseReferralsFeed("2026-08-07T10:00:00.000Z"); // older
  const bytes = feedBytes(feed);
  const sig = signBytes(bytes);
  let cacheWritten = false;

  const result = await referralsSync.syncRadarReferrals({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => ({
      generatedAt: "2026-08-07T12:00:00.000Z",
      tier: "community",
      payload: "{}",
      signature: "old-sig",
    }),
    setCache: () => {
      cacheWritten = true;
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(bytes, { "x-omniroute-feed-signature": sig })
      )) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "stale");
  assert.equal(cacheWritten, false);
});

test("syncRadarReferrals: newer generatedAt than cache => updated", async () => {
  const feed = baseReferralsFeed("2026-08-07T13:00:00.000Z"); // newer
  const bytes = feedBytes(feed);
  const sig = signBytes(bytes);
  const cacheStore: referralsSync.RadarReferralsCacheEntry[] = [];

  const result = await referralsSync.syncRadarReferrals({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => ({
      generatedAt: "2026-08-07T12:00:00.000Z",
      tier: "community",
      payload: "{}",
      signature: "old-sig",
    }),
    setCache: (entry) => {
      cacheStore.push(entry);
    },
    fetch: (() =>
      Promise.resolve(
        mockResponse(bytes, { "x-omniroute-feed-signature": sig })
      )) as unknown as typeof globalThis.fetch,
    now: () => new Date("2026-08-07T13:05:00.000Z"),
  });

  assert.equal(result.status, "updated");
  assert.equal(cacheStore.length, 1);
  assert.equal(cacheStore[0]!.generatedAt, "2026-08-07T13:00:00.000Z");
});

// ===========================================================================
// syncRadarReferrals — 2 identical requests => same signature => same cache
// (determinism contract from the server: generatedAt is the max updatedAt
// across referral links, so unchanged data re-signs identically)
// ===========================================================================

test("syncRadarReferrals: two identical fetches (no cache between) produce identical cache entries modulo fetchedAt", async () => {
  const feed = baseReferralsFeed();
  const bytes = feedBytes(feed);
  const sig = signBytes(bytes);
  const cacheStore: referralsSync.RadarReferralsCacheEntry[] = [];

  const run = () =>
    referralsSync.syncRadarReferrals({
      getFlag: () => true,
      getSettings: () => ({ optIn: true, supporterKey: null }),
      getCache: () => null, // simulate two independent "first sync" calls
      setCache: (entry) => {
        cacheStore.push(entry);
      },
      fetch: (() =>
        Promise.resolve(
          mockResponse(bytes, { "x-omniroute-feed-signature": sig })
        )) as unknown as typeof globalThis.fetch,
      now: () => new Date("2026-08-07T12:05:00.000Z"),
    });

  await run();
  await run();

  assert.equal(cacheStore.length, 2);
  assert.equal(cacheStore[0]!.signature, cacheStore[1]!.signature);
  assert.equal(cacheStore[0]!.payload, cacheStore[1]!.payload);
  assert.equal(cacheStore[0]!.generatedAt, cacheStore[1]!.generatedAt);
});

// ===========================================================================
// syncRadarReferrals — served-tier header
// ===========================================================================

test("syncRadarReferrals: header 'community' => cache + result use community", async () => {
  const bytes = feedBytes(baseReferralsFeed());
  const sig = signBytes(bytes);
  const cacheStore: referralsSync.RadarReferralsCacheEntry[] = [];

  const result = await referralsSync.syncRadarReferrals({
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
  });

  assert.equal(result.status, "updated");
  if (result.status === "updated") assert.equal(result.tier, "community");
  assert.equal(cacheStore[0]!.tier, "community");
});

test("syncRadarReferrals: header 'live' (supporter key) => cache + result use live", async () => {
  const bytes = feedBytes(baseReferralsFeed());
  const sig = signBytes(bytes);
  const cacheStore: referralsSync.RadarReferralsCacheEntry[] = [];

  const result = await referralsSync.syncRadarReferrals({
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
  });

  assert.equal(result.status, "updated");
  if (result.status === "updated") assert.equal(result.tier, "live");
  assert.equal(cacheStore[0]!.tier, "live");
});

test("syncRadarReferrals: header absent => falls back to 'community' (no body tier field to fall back to)", async () => {
  const bytes = feedBytes(baseReferralsFeed());
  const sig = signBytes(bytes);
  const cacheStore: referralsSync.RadarReferralsCacheEntry[] = [];

  const result = await referralsSync.syncRadarReferrals({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: (entry) => {
      cacheStore.push(entry);
    },
    fetch: (() =>
      Promise.resolve(mockResponse(bytes, { "x-omniroute-feed-signature": sig }))) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "updated");
  if (result.status === "updated") assert.equal(result.tier, "community");
  assert.equal(cacheStore[0]!.tier, "community");
});

test("syncRadarReferrals: garbage tier header => never trusted, falls back to 'community'", async () => {
  const bytes = feedBytes(baseReferralsFeed());
  const sig = signBytes(bytes);
  const cacheStore: referralsSync.RadarReferralsCacheEntry[] = [];

  const result = await referralsSync.syncRadarReferrals({
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
          "x-omniroute-feed-tier": "premium",
        })
      )) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "updated");
  if (result.status === "updated") {
    assert.equal(result.tier, "community");
    assert.notEqual(result.tier as string, "premium");
  }
});

// ===========================================================================
// syncRadarReferrals — Authorization header (supporter key)
// ===========================================================================

test("syncRadarReferrals: sends Authorization header when supporter key exists", async () => {
  let capturedHeaders: Record<string, string> = {};
  const bytes = feedBytes(baseReferralsFeed());
  const sig = signBytes(bytes);

  await referralsSync.syncRadarReferrals({
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
      return Promise.resolve(mockResponse(bytes, { "x-omniroute-feed-signature": sig }));
    }) as unknown as typeof globalThis.fetch,
  });

  assert.equal(capturedHeaders["Authorization"], "Bearer omr_test-key-123");
});

test("syncRadarReferrals: no Authorization header when no supporter key", async () => {
  let capturedHeaders: Record<string, string> = {};
  const bytes = feedBytes(baseReferralsFeed());
  const sig = signBytes(bytes);

  await referralsSync.syncRadarReferrals({
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
      return Promise.resolve(mockResponse(bytes, { "x-omniroute-feed-signature": sig }));
    }) as unknown as typeof globalThis.fetch,
  });

  assert.equal(capturedHeaders["Authorization"], undefined);
});

// ===========================================================================
// syncRadarReferrals — errors, never leaking a stack
// ===========================================================================

test("syncRadarReferrals: network error => error with no stack in reason", async () => {
  const result = await referralsSync.syncRadarReferrals({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    fetch: (() => Promise.reject(new Error("ECONNREFUSED"))) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "error");
  if (result.status === "error") {
    assert.ok(result.reason.length > 0);
    assert.ok(!result.reason.includes("at ") && !result.reason.includes(".ts:"));
  }
});

test("syncRadarReferrals: HTTP non-200 => error mentioning the status code", async () => {
  const result = await referralsSync.syncRadarReferrals({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    fetch: (() =>
      Promise.resolve(mockResponse(Buffer.from("Internal Server Error"), {}, 500))) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "error");
  if (result.status === "error") assert.ok(result.reason.includes("500"));
});

// ===========================================================================
// syncRadarReferrals — 10 MB response cap
// ===========================================================================

test("FIX: Content-Length exceeding the 10MB cap => too_large, cache untouched, body never read", async () => {
  let arrayBufferCalled = false;
  const oversizedContentLength = String(10 * 1024 * 1024 + 1);
  const response = mockResponse(Buffer.from("irrelevant"), {
    "content-length": oversizedContentLength,
  });
  const originalArrayBuffer = response.arrayBuffer.bind(response);
  (response as unknown as { arrayBuffer: () => Promise<ArrayBuffer> }).arrayBuffer = () => {
    arrayBufferCalled = true;
    return originalArrayBuffer();
  };

  let setCacheCalled = false;
  const result = await referralsSync.syncRadarReferrals({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: () => {
      setCacheCalled = true;
    },
    fetch: (() => Promise.resolve(response)) as unknown as typeof globalThis.fetch,
  });

  assert.deepEqual(result, { status: "too_large" });
  assert.equal(setCacheCalled, false);
  assert.equal(arrayBufferCalled, false);
});

test("FIX: oversized body without a trustworthy Content-Length header => too_large, cache untouched", async () => {
  const oversized = Buffer.alloc(10 * 1024 * 1024 + 1, 0x41);
  let setCacheCalled = false;

  const result = await referralsSync.syncRadarReferrals({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: () => {
      setCacheCalled = true;
    },
    fetch: (() => Promise.resolve(mockResponse(oversized, {}))) as unknown as typeof globalThis.fetch,
  });

  assert.deepEqual(result, { status: "too_large" });
  assert.equal(setCacheCalled, false);
});

test("FIX: body within the 10MB cap proceeds normally (never returns too_large)", async () => {
  const bytes = feedBytes(baseReferralsFeed());
  const sig = signBytes(bytes);

  const result = await referralsSync.syncRadarReferrals({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: () => {},
    fetch: (() =>
      Promise.resolve(
        mockResponse(bytes, { "x-omniroute-feed-signature": sig })
      )) as unknown as typeof globalThis.fetch,
  });

  assert.notEqual(result.status, "too_large");
});
