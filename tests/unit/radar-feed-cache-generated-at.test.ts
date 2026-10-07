/**
 * tests/unit/radar-feed-cache-generated-at.test.ts
 *
 * The catalog feed carries the date its data was built (`generatedAt`, required
 * by the feed schema). Until now the cache kept only `fetched_at` — when this
 * install downloaded it — so nothing downstream could tell a recent download
 * from recent data. The referrals cache (migration 142) already persists it;
 * this file is the guard that the catalog cache does too, all the way out to
 * `getRadarCatalog()` and `GET /api/radar/status`.
 *
 * A cache row written before the migration has no data date. It must read back
 * as null — never the fetch time standing in for it, which is the exact
 * confusion this column exists to end.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { SignJWT } from "jose";

// Ephemeral signing key, injected before any Radar module loads so the sync
// path verifies against it (the fork override documented in RADAR.md).
const { publicKey, privateKey } = crypto.generateKeyPairSync("ed25519");
process.env.RADAR_FEED_PUBKEY = publicKey
  .export({ type: "spki", format: "der" })
  .toString("base64");

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-generated-at-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "test-encryption-key-for-radar-genat-tests-32b";
process.env.JWT_SECRET = "test-jwt-secret-for-radar-genat-tests";
process.env.INITIAL_PASSWORD = "test-bootstrap-password-for-radar-genat-tests";
process.env.RADAR_ENABLED = "true";

const core = await import("../../src/lib/db/core.ts");
const radarDb = await import("../../src/lib/db/radar.ts");
const { getRadarCatalog } = await import("../../src/lib/radar/index.ts");

const FIXTURE = JSON.parse(
  fs.readFileSync(
    path.resolve(import.meta.dirname!, "../fixtures/radar-feed-canonical.json"),
    "utf8"
  )
) as { generatedAt: string; version: string };

const FETCHED_AT = "2026-08-24T07:00:00.000Z";

async function authCookieHeader(): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({ authenticated: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  return `auth_token=${token}`;
}

function seed(entry: Partial<Parameters<typeof radarDb.setRadarCache>[0]> = {}): void {
  radarDb.setRadarCache({
    version: FIXTURE.version,
    generatedAt: FIXTURE.generatedAt,
    tier: "community",
    payload: JSON.stringify(FIXTURE),
    signature: "test-signature-not-verified-on-read",
    fetchedAt: FETCHED_AT,
    ...entry,
  });
}

test("the catalog cache persists the feed's own build date", () => {
  seed();

  const cache = radarDb.getRadarCache();

  assert.ok(cache);
  assert.equal(cache.generatedAt, FIXTURE.generatedAt);
  assert.equal(cache.fetchedAt, FETCHED_AT);
  assert.notEqual(
    cache.generatedAt,
    cache.fetchedAt,
    "the data date and the download date are two different facts"
  );
});

test("a row cached before this column existed reads back as an unknown date", () => {
  seed({ generatedAt: undefined });

  const cache = radarDb.getRadarCache();

  assert.ok(cache);
  assert.equal(cache.generatedAt, null, "unknown must stay unknown, never the fetch time");
  assert.equal(cache.fetchedAt, FETCHED_AT);
});

test("syncRadar writes the build date it just validated", async () => {
  const syncMod = await import("../../src/lib/radar/sync.ts");
  const bytes = Buffer.from(JSON.stringify(FIXTURE), "utf8");
  const signature = crypto.sign(null, bytes, privateKey).toString("base64");
  const written: Array<{ generatedAt?: string | null }> = [];

  const result = await syncMod.syncRadar({
    getFlag: () => true,
    getSettings: () => ({ optIn: true, supporterKey: null }),
    getCache: () => null,
    setCache: (entry) => {
      written.push(entry);
    },
    fetch: (() =>
      Promise.resolve(
        new Response(bytes, {
          status: 200,
          headers: {
            "x-omniroute-feed-signature": signature,
            "x-omniroute-feed-tier": "community",
          },
        })
      )) as unknown as typeof globalThis.fetch,
  });

  assert.equal(result.status, "updated");
  assert.equal(written.length, 1, "a valid feed must be cached");
  assert.equal(written[0].generatedAt, FIXTURE.generatedAt);
});

test("getRadarCatalog reports the build date alongside the fetch date", () => {
  seed();

  const { meta } = getRadarCatalog();

  assert.ok(meta, "an active feed must expose its metadata");
  assert.equal(meta.generatedAt, FIXTURE.generatedAt);
  assert.equal(meta.fetchedAt, FETCHED_AT);
});

test("GET /api/radar/status reports the build date as its own field", async () => {
  seed();
  const { GET } = await import("../../src/app/api/radar/status/route.ts");

  const res = await GET(
    new Request("http://localhost:20128/api/radar/status", {
      headers: { cookie: await authCookieHeader() },
    })
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    feeds: { catalog: { version?: string; generatedAt?: string | null; fetchedAt: string } };
  };

  assert.equal(body.feeds.catalog.generatedAt, FIXTURE.generatedAt);
  assert.equal(
    body.feeds.catalog.version,
    FIXTURE.version,
    "the build date must not be folded into the version field"
  );
});

test("status omits the build date for the caches that never store one", async () => {
  seed();
  // Both must be present in the response, otherwise the assertion below would
  // pass on an `{ available: false }` stub that carries no field either.
  radarDb.setRadarOffersCache({
    version: "2026.08.24.1",
    tier: "live",
    payload: JSON.stringify({ offers: [] }),
    signature: "test-signature",
    fetchedAt: FETCHED_AT,
  });
  radarDb.setRadarIntelCache({
    version: "2026.08.24.1",
    tier: "live",
    payload: JSON.stringify({ intel: {} }),
    signature: "test-signature",
    supporterIdentity: "test-identity",
    fetchedAt: FETCHED_AT,
  });
  const { GET } = await import("../../src/app/api/radar/status/route.ts");

  const res = await GET(
    new Request("http://localhost:20128/api/radar/status", {
      headers: { cookie: await authCookieHeader() },
    })
  );
  const body = (await res.json()) as {
    feeds: Record<string, Record<string, unknown>>;
  };

  // offers and intel are cached without a build date. Reporting null there
  // would say "unknown", when the truth is that it was never kept.
  for (const feed of ["offers", "intel"]) {
    assert.equal(
      body.feeds[feed].available,
      true,
      `${feed} must be cached for this to mean anything`
    );
    assert.equal(
      "generatedAt" in body.feeds[feed],
      false,
      `${feed} must not advertise a build date it never stores`
    );
  }
  assert.equal(body.feeds.catalog.generatedAt, FIXTURE.generatedAt);
});

test.after(() => {
  core.resetDbInstance();
  delete process.env.RADAR_ENABLED;
  delete process.env.INITIAL_PASSWORD;
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // ignore
  }
});
