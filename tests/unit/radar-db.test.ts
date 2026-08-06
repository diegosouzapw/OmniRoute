/**
 * tests/unit/radar-db.test.ts
 *
 * TDD regression guard for the Radar client local DB module:
 * - radar_feed_cache: single-row signed feed cache
 * - radar_settings: opt-in + encrypted supporter key
 *
 * Covers: empty state, round-trip, upsert replacement, encryption at rest,
 * key clear, and settings persistence.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate DB state in a temp directory
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-db-"));
process.env.DATA_DIR = TEST_DATA_DIR;
// Enable encryption so we can verify at-rest encryption of supporter key
process.env.STORAGE_ENCRYPTION_KEY = "test-encryption-key-for-radar-db-tests-32b!";

const core = await import("../../src/lib/db/core.ts");
const radar = await import("../../src/lib/db/radar.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const code = (error as NodeJS.ErrnoException | undefined)?.code;
      if ((code === "EBUSY" || code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  delete process.env.STORAGE_ENCRYPTION_KEY;
});

// ---------------------------------------------------------------------------
// radar_feed_cache
// ---------------------------------------------------------------------------

test("getRadarCache returns null when no cache exists", () => {
  const db = core.getDbInstance();
  const result = radar.getRadarCache();
  assert.equal(result, null, "empty cache must return null");
});

test("setRadarCache then getRadarCache round-trips exactly", () => {
  const db = core.getDbInstance();
  const feed = {
    version: "2026-08-03T00:00:00Z",
    tier: "community",
    payload: JSON.stringify({ models: [{ id: "gpt-4o", provider: "openai" }] }),
    signature: "ed25519:abc123def456",
  };

  radar.setRadarCache(feed);
  const result = radar.getRadarCache();

  assert.ok(result, "cache must not be null after set");
  assert.equal(result.version, feed.version, "version must round-trip");
  assert.equal(result.tier, feed.tier, "tier must round-trip");
  assert.equal(result.payload, feed.payload, "payload must round-trip byte-identically");
  assert.equal(result.signature, feed.signature, "signature must round-trip");
  assert.ok(result.fetchedAt, "fetchedAt must be set");
});

test("second setRadarCache REPLACES the row (still single row)", () => {
  const db = core.getDbInstance();

  radar.setRadarCache({
    version: "v1",
    tier: "community",
    payload: '{"old":true}',
    signature: "sig-old",
  });

  radar.setRadarCache({
    version: "v2",
    tier: "live",
    payload: '{"new":true}',
    signature: "sig-new",
  });

  const result = radar.getRadarCache();
  assert.ok(result);
  assert.equal(result.version, "v2", "must have the second version");
  assert.equal(result.tier, "live", "must have the second tier");
  assert.equal(result.payload, '{"new":true}', "must have the second payload");

  // Verify only one row exists
  const count = db.prepare("SELECT COUNT(*) AS c FROM radar_feed_cache").get() as { c: number };
  assert.equal(count.c, 1, "must have exactly one row");
});

test("setRadarCache uses fetchedAt when provided", () => {
  const db = core.getDbInstance();
  const fixed = "2026-08-03T12:00:00.000Z";

  radar.setRadarCache({
    version: "v1",
    tier: "community",
    payload: "{}",
    signature: "sig",
    fetchedAt: fixed,
  });

  const result = radar.getRadarCache();
  assert.ok(result);
  assert.equal(result.fetchedAt, fixed, "must use the provided fetchedAt");
});

// ---------------------------------------------------------------------------
// radar_settings
// ---------------------------------------------------------------------------

test("getRadarSettings defaults: optIn false, key null", () => {
  const db = core.getDbInstance();
  const settings = radar.getRadarSettings();

  assert.equal(settings.optIn, false, "default optIn must be false");
  assert.equal(settings.supporterKey, null, "default supporterKey must be null");
  assert.ok(settings.updatedAt, "updatedAt must be set on first read");
});

test("setRadarOptIn(true) persists", () => {
  const db = core.getDbInstance();

  radar.setRadarOptIn(true);
  const settings = radar.getRadarSettings();
  assert.equal(settings.optIn, true, "optIn must be true after setRadarOptIn(true)");

  radar.setRadarOptIn(false);
  const settings2 = radar.getRadarSettings();
  assert.equal(settings2.optIn, false, "optIn must be false after setRadarOptIn(false)");
});

test("setRadarKey encrypts at rest and getRadarSettings decrypts", () => {
  const db = core.getDbInstance();
  const clearKey = "omr_" + "a".repeat(40);

  radar.setRadarKey(clearKey);
  const settings = radar.getRadarSettings();

  assert.equal(settings.supporterKey, clearKey, "getRadarSettings must return the clear key");

  // Direct DB query to prove encryption at rest
  interface SettingsRow { supporter_key_encrypted: string | null }
  const row = db
    .prepare("SELECT supporter_key_encrypted FROM radar_settings WHERE id = 1")
    .get() as SettingsRow;
  assert.ok(row, "radar_settings row must exist");
  assert.ok(
    row.supporter_key_encrypted !== clearKey,
    "stored value must NOT be the clear key (encryption at rest)"
  );
  assert.ok(
    row.supporter_key_encrypted?.startsWith("enc:v1:"),
    "stored value must carry the enc:v1: prefix"
  );
});

test("setRadarKey(null) clears the key", () => {
  const db = core.getDbInstance();

  radar.setRadarKey("omr_" + "b".repeat(40));
  assert.ok(radar.getRadarSettings().supporterKey, "key must be set");

  radar.setRadarKey(null);
  const settings = radar.getRadarSettings();
  assert.equal(settings.supporterKey, null, "key must be null after clearing");

  // Direct DB check
  const cleared = db
    .prepare("SELECT supporter_key_encrypted FROM radar_settings WHERE id = 1")
    .get() as { supporter_key_encrypted: string | null };
  assert.equal(cleared.supporter_key_encrypted, null, "DB value must be null");
});

test("setRadarKey uses existing AES-256-GCM encryption from encryption.ts", () => {
  const db = core.getDbInstance();
  const clearKey = "omr_" + "c".repeat(40);

  radar.setRadarKey(clearKey);

  const encRow = db
    .prepare("SELECT supporter_key_encrypted FROM radar_settings WHERE id = 1")
    .get() as { supporter_key_encrypted: string };

  // Verify it uses the enc:v1: format (same as provider credentials)
  assert.ok(
    encRow.supporter_key_encrypted.startsWith("enc:v1:"),
    "must use enc:v1: prefix (AES-256-GCM from encryption.ts)"
  );

  // Verify the format: enc:v1:<iv_hex>:<ciphertext_hex>:<authTag_hex>
  const body = encRow.supporter_key_encrypted.slice("enc:v1:".length);
  const parts = body.split(":");
  assert.equal(parts.length, 3, "must have 3 parts (iv:ciphertext:authTag)");
});
