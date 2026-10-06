import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-offers-db-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "test-encryption-key-for-radar-offers-db-32b!";

const core = await import("../../src/lib/db/core.ts");
const radar = await import("../../src/lib/db/radar.ts");

function resetStorage(): void {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetStorage);

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  delete process.env.STORAGE_ENCRYPTION_KEY;
});

test("Radar offers cache migration creates a single-row byte-preserving store", () => {
  const db = core.getDbInstance();
  assert.equal(radar.getRadarOffersCache(), null);

  radar.setRadarOffersCache({
    version: "2026.08.09.1",
    tier: "live",
    payload: '{"byte":"exact"}\n',
    signature: "signed",
    fetchedAt: "2026-08-09T12:05:00.000Z",
  });
  radar.setRadarOffersCache({
    version: "2026.08.09.2",
    tier: "live",
    payload: '{"replacement":true}',
    signature: "signed-again",
    fetchedAt: "2026-08-09T12:10:00.000Z",
  });

  assert.deepEqual(radar.getRadarOffersCache(), {
    version: "2026.08.09.2",
    tier: "live",
    payload: '{"replacement":true}',
    signature: "signed-again",
    fetchedAt: "2026-08-09T12:10:00.000Z",
  });
  const row = db.prepare("SELECT COUNT(*) AS count FROM radar_offers_cache").get() as {
    count: number;
  };
  assert.equal(row.count, 1);
});

test("changing the supporter key atomically invalidates every entitlement-sensitive cache", () => {
  const db = core.getDbInstance();
  radar.setRadarCache({ version: "2026.08.09.1", tier: "live", payload: "{}", signature: "a" });
  radar.setRadarReferralsCache({
    generatedAt: "2026-08-09T12:00:00.000Z",
    tier: "live",
    payload: "{}",
    signature: "b",
  });
  radar.setRadarOffersCache({
    version: "2026.08.09.1",
    tier: "live",
    payload: "{}",
    signature: "c",
  });

  radar.setRadarKey(`omr_${"a".repeat(40)}`);

  assert.equal(radar.getRadarCache(), null);
  assert.equal(radar.getRadarReferralsCache(), null);
  assert.equal(radar.getRadarOffersCache(), null);
  const stored = db
    .prepare("SELECT supporter_key_encrypted AS key FROM radar_settings WHERE id = 1")
    .get() as { key: string };
  assert.ok(!stored.key.includes("omr_"), "supporter key must stay encrypted at rest");
});
