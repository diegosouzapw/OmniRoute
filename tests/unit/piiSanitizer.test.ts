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
    const result = sanitizePIIChunk(input, true);
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
    const result = sanitizePIIChunk(input, true);
    assert.ok(result.includes("[EMAIL_REDACTED]"));
  });


  if (originalEnv !== undefined) {
    process.env.PII_RESPONSE_SANITIZATION = originalEnv;
  } else {
    delete process.env.PII_RESPONSE_SANITIZATION;
  }
});

test.after(async () => {
  const coreDb = await import("@/lib/db/core");
  coreDb.resetDbInstance();
  fs.rmSync(tmpDir, { recursive: true, force: true });
});

test("getMode returns redact for invalid flag values", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  process.env.PII_RESPONSE_SANITIZATION_MODE = "garbage";

  const { sanitizePIIChunk } = await import("@/lib/piiSanitizer");
  const input = "my email is test@example.com";
  const result = sanitizePIIChunk(input, true);

  assert.ok(result.includes("[EMAIL_REDACTED]"),
    "invalid mode should fall back to redact, not silently pass PII through");

  delete process.env.PII_RESPONSE_SANITIZATION_MODE;
});

test("sanitizePII detects and redacts SSN", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  const result = sanitizePII("SSN is 123-45-6789");

  assert.ok(result.text.includes("[SSN_REDACTED]"));
  assert.ok(!result.text.includes("123-45-6789"));
  assert.ok(result.detections.some(d => d.pattern === "ssn"));
});

test("sanitizePII detects and redacts credit card", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  const result = sanitizePII("Card: 4111-1111-1111-1111");

  assert.ok(result.text.includes("[CC_REDACTED]"));
  assert.ok(!result.text.includes("4111"));
});

test("sanitizePII detects AWS access key", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  const result = sanitizePII("Key: AKIAIOSFODNN7EXAMPLE");

  assert.ok(result.text.includes("[AWS_KEY_REDACTED]"));
  assert.ok(!result.text.includes("AKIAIOSFODNN7EXAMPLE"));
});

test("sanitizePIIResponse handles Claude format", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";

  const { sanitizePIIResponse } = await import("@/lib/piiSanitizer");
  const response = {
    content: [{ type: "text", text: "email is john@example.com" }]
  };
  const result = sanitizePIIResponse(JSON.parse(JSON.stringify(response)));

  assert.ok(result.content[0].text.includes("[EMAIL_REDACTED]"),
    "Claude format PII should be redacted");
});

test("sanitizePIIResponse handles Gemini format", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";

  const { sanitizePIIResponse } = await import("@/lib/piiSanitizer");
  const response = {
    candidates: [{ content: { parts: [{ text: "email is john@example.com" }] } }]
  };
  const result = sanitizePIIResponse(JSON.parse(JSON.stringify(response)));

  assert.ok(result.candidates[0].content.parts[0].text.includes("[EMAIL_REDACTED]"),
    "Gemini format PII should be redacted");
});
