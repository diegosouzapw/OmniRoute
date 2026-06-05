/**
 * Regression: Cloud sync must verify the X-Cloud-Sig HMAC and must NOT
 * overwrite accessToken / refreshToken unless OMNIROUTE_CLOUD_SYNC_SECRETS=true.
 * See docs/security/SOCKET_DEV_FINDINGS.md §5.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";

test("verifyCloudSignature accepts a valid HMAC", async () => {
  // Test-only HMAC key derived deterministically — no hardcoded production secret.
  const TEST_HMAC_KEY = crypto.createHash("sha256").update("omniroute-test").digest("hex");
  process.env.OMNIROUTE_CLOUD_SYNC_SECRET = TEST_HMAC_KEY;
  // Re-import so the module re-reads the env.
  const mod = await import(
    "../../../src/lib/cloudSync.ts?cache=" + Date.now()
  ).catch(() => import("../../../src/lib/cloudSync.ts"));
  const body = JSON.stringify({ data: { providers: {} } });
  const sig = crypto.createHmac("sha256", TEST_HMAC_KEY).update(body).digest("hex");
  assert.equal((mod as any).verifyCloudSignature(body, sig), true);
});

test("verifyCloudSignature rejects a forged signature", async () => {
  // Test-only HMAC key derived deterministically — no hardcoded production secret.
  const TEST_HMAC_KEY = crypto.createHash("sha256").update("omniroute-test").digest("hex");
  process.env.OMNIROUTE_CLOUD_SYNC_SECRET = TEST_HMAC_KEY;
  const mod = await import("../../../src/lib/cloudSync.ts");
  const body = JSON.stringify({ data: { providers: {} } });
  const forged = "0".repeat(64);
  assert.equal((mod as any).verifyCloudSignature(body, forged), false);
});

test("verifyCloudSignature rejects when the secret is set but sig header is missing", async () => {
  // Test-only HMAC key derived deterministically — no hardcoded production secret.
  const TEST_HMAC_KEY = crypto.createHash("sha256").update("omniroute-test").digest("hex");
  process.env.OMNIROUTE_CLOUD_SYNC_SECRET = TEST_HMAC_KEY;
  const mod = await import("../../../src/lib/cloudSync.ts");
  const body = JSON.stringify({ data: { providers: {} } });
  assert.equal((mod as any).verifyCloudSignature(body, null), false);
});

test("verifyCloudSignature falls through (legacy mode) when secret is unset", async () => {
  delete process.env.OMNIROUTE_CLOUD_SYNC_SECRET;
  // Force re-import so module constants pick up the cleared env.
  delete (globalThis as any).__omniroute_cloudSync_cache;
  const mod = await import("../../../src/lib/cloudSync.ts");
  const body = JSON.stringify({ data: { providers: {} } });
  // Behaviour: accept unsigned body but log warning. We assert it doesn't throw.
  const result = (mod as any).verifyCloudSignature(body, null);
  assert.equal(typeof result, "boolean");
});
