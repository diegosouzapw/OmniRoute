import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-radar-intel-db-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.STORAGE_ENCRYPTION_KEY = "test-encryption-key-for-radar-intel-db-32b!";

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
});

test("Intel migration provides a byte-preserving single-row cache", () => {
  assert.equal(radar.getRadarIntelCache(), null);
  radar.setRadarIntelCache({
    version: "2026.08.09.1",
    tier: "live",
    payload: '{"exact":true}\n',
    signature: "signed",
    supporterIdentity: `radar:${"a".repeat(64)}`,
    fetchedAt: "2026-08-09T12:05:00.000Z",
  });
  assert.deepEqual(radar.getRadarIntelCache(), {
    version: "2026.08.09.1",
    tier: "live",
    payload: '{"exact":true}\n',
    signature: "signed",
    supporterIdentity: `radar:${"a".repeat(64)}`,
    fetchedAt: "2026-08-09T12:05:00.000Z",
  });
});

test("changing supporter key invalidates catalog, referrals, offers, and Intel atomically", () => {
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
  radar.setRadarIntelCache({
    version: "2026.08.09.1",
    tier: "live",
    payload: "{}",
    signature: "d",
    supporterIdentity: `radar:${"a".repeat(64)}`,
  });

  radar.setRadarKey(`omr_${"b".repeat(40)}`);

  assert.equal(radar.getRadarCache(), null);
  assert.equal(radar.getRadarReferralsCache(), null);
  assert.equal(radar.getRadarOffersCache(), null);
  assert.equal(radar.getRadarIntelCache(), null);
});
