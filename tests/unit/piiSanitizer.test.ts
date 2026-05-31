import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolate DB state to avoid polluting production database
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-pii-"));
process.env.DATA_DIR = tmpDir;

test("sanitizePII checks resolveFeatureFlag, not process.env", async (t) => {
  const originalEnv = process.env.PII_RESPONSE_SANITIZATION;

  await t.test("when env is true but DB is override false, it resolves to disabled", async () => {
    process.env.PII_RESPONSE_SANITIZATION = "true";

    const { setFeatureFlagOverride, getFeatureFlagOverride } = await import("@/lib/db/featureFlags");
    setFeatureFlagOverride("PII_RESPONSE_SANITIZATION", "false");

    console.log("Subtest 1 - Override in DB:", getFeatureFlagOverride("PII_RESPONSE_SANITIZATION"));

    const { sanitizePIIChunk } = await import("@/lib/piiSanitizer");
    const { isFeatureFlagEnabled } = await import("@/shared/utils/featureFlags");
    console.log("Subtest 1 - isFeatureFlagEnabled:", isFeatureFlagEnabled("PII_RESPONSE_SANITIZATION"));

    const input = "my email is test@example.com";
    const result = sanitizePIIChunk(input);
    assert.equal(result, input);
  });

  await t.test("when env is false but DB is override true, it resolves to enabled", async () => {
    process.env.PII_RESPONSE_SANITIZATION = "false";

    const { setFeatureFlagOverride, getFeatureFlagOverride } = await import("@/lib/db/featureFlags");
    setFeatureFlagOverride("PII_RESPONSE_SANITIZATION", "true");

    console.log("Subtest 2 - Override in DB:", getFeatureFlagOverride("PII_RESPONSE_SANITIZATION"));

    const { sanitizePIIChunk } = await import("@/lib/piiSanitizer");
    const { isFeatureFlagEnabled } = await import("@/shared/utils/featureFlags");
    console.log("Subtest 2 - isFeatureFlagEnabled:", isFeatureFlagEnabled("PII_RESPONSE_SANITIZATION"));

    const input = "my email is test@example.com";
    const result = sanitizePIIChunk(input);
    assert.ok(result.includes("[EMAIL_REDACTED]"));
  });

  if (originalEnv !== undefined) {
    process.env.PII_RESPONSE_SANITIZATION = originalEnv;
  } else {
    delete process.env.PII_RESPONSE_SANITIZATION;
  }

  const coreDb = await import("@/lib/db/core");
  coreDb.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});
