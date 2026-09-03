import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import type { GuardrailContext } from "@/lib/guardrails/base";

// Isolate DB state to avoid polluting production database
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-pii-"));
process.env.DATA_DIR = tmpDir;

test("PIIMaskerGuardrail respects feature flag DB overrides", async (t) => {
  await t.test(
    "when PII_REDACTION_ENABLED is false in env but true in DB, request PII is redacted",
    async () => {
      delete process.env.PII_REDACTION_ENABLED;
      const { setFeatureFlagOverride } = await import("@/lib/db/featureFlags");
      setFeatureFlagOverride("PII_REDACTION_ENABLED", "true");

      const { PIIMaskerGuardrail } = await import("@/lib/guardrails/piiMasker");
      const guardrail = new PIIMaskerGuardrail();
      const payload = {
        model: "gpt-4o",
        messages: [{ role: "user", content: "My SSN is 123-45-6789" }],
      };
      const dummyContext: GuardrailContext = {
        model: "gpt-4o",
        provider: "openai",
        endpoint: "/v1/chat/completions",
      };
      const res = await guardrail.preCall(payload, dummyContext);
      assert.strictEqual(Boolean(res.modifiedPayload), true);
      const messages = (res.modifiedPayload as { messages?: Array<{ content?: string }> })
        ?.messages;
      assert.strictEqual(messages?.[0]?.content, "My SSN is [SSN_REDACTED]");

      setFeatureFlagOverride("PII_REDACTION_ENABLED", "false");
      const resDisabled = await guardrail.preCall(payload, dummyContext);
      assert.strictEqual(Boolean(resDisabled.modifiedPayload), false);
    }
  );
});

test("sanitizePII checks resolveFeatureFlag, not process.env", async (t) => {
  const originalEnv = process.env.PII_RESPONSE_SANITIZATION;

  await t.test("when env is true but DB is override false, it resolves to disabled", async () => {
    process.env.PII_RESPONSE_SANITIZATION = "true";

    const { setFeatureFlagOverride, getFeatureFlagOverride } =
      await import("@/lib/db/featureFlags");
    setFeatureFlagOverride("PII_RESPONSE_SANITIZATION", "false");

    console.log("Subtest 1 - Override in DB:", getFeatureFlagOverride("PII_RESPONSE_SANITIZATION"));

    const { sanitizePIIChunk } = await import("@/lib/piiSanitizer");
    const { isFeatureFlagEnabled } = await import("@/shared/utils/featureFlags");
    console.log(
      "Subtest 1 - isFeatureFlagEnabled:",
      isFeatureFlagEnabled("PII_RESPONSE_SANITIZATION")
    );

    const input = "my email is test@example.com";
    const result = sanitizePIIChunk(input, true);
    assert.equal(result, input);
  });

  await t.test("when env is false but DB is override true, it resolves to enabled", async () => {
    process.env.PII_RESPONSE_SANITIZATION = "false";

    const { setFeatureFlagOverride, getFeatureFlagOverride } =
      await import("@/lib/db/featureFlags");
    setFeatureFlagOverride("PII_RESPONSE_SANITIZATION", "true");

    console.log("Subtest 2 - Override in DB:", getFeatureFlagOverride("PII_RESPONSE_SANITIZATION"));

    const { sanitizePIIChunk } = await import("@/lib/piiSanitizer");
    const { isFeatureFlagEnabled } = await import("@/shared/utils/featureFlags");
    console.log(
      "Subtest 2 - isFeatureFlagEnabled:",
      isFeatureFlagEnabled("PII_RESPONSE_SANITIZATION")
    );

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
  fs.rmSync(tmpDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("getMode returns redact for invalid flag values", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  process.env.PII_RESPONSE_SANITIZATION_MODE = "garbage";

  const { sanitizePIIChunk } = await import("@/lib/piiSanitizer");
  const input = "my email is test@example.com";
  const result = sanitizePIIChunk(input, true);

  assert.ok(
    result.includes("[EMAIL_REDACTED]"),
    "invalid mode should fall back to redact, not silently pass PII through"
  );

  delete process.env.PII_RESPONSE_SANITIZATION_MODE;
});

test("sanitizePII detects and redacts SSN", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  const input = "My SSN is 123-45-6789";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[SSN_REDACTED]"), "SSN should be redacted");
  assert.ok(!result.text.includes("123-45-6789"), "raw SSN should not remain");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII detects and redacts credit card", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  const input = "Card: 4111111111111111";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[CC_REDACTED]"), "Credit card should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePII detects AWS access key", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePII } = await import("@/lib/piiSanitizer");
  const input = "Key: AKIAEXAMPLE123456789";
  const result = sanitizePII(input);

  assert.ok(result.text.includes("[AWS_KEY_REDACTED]"), "AWS access key should be redacted");

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePIIResponse handles Claude format", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePIIResponse } = await import("@/lib/piiSanitizer");
  const payload = {
    type: "message",
    content: [{ type: "text", text: "SSN: 123-45-6789" }],
  };
  const result = sanitizePIIResponse(payload) as typeof payload;

  assert.ok(result.content[0].text.includes("[SSN_REDACTED]"));

  delete process.env.PII_RESPONSE_SANITIZATION;
});

test("sanitizePIIResponse handles Gemini format", async () => {
  process.env.PII_RESPONSE_SANITIZATION = "true";
  delete process.env.PII_RESPONSE_SANITIZATION_MODE;

  const { sanitizePIIResponse } = await import("@/lib/piiSanitizer");
  const payload = {
    candidates: [
      {
        content: {
          parts: [{ text: "Contact: test@example.com" }],
        },
      },
    ],
  };
  const result = sanitizePIIResponse(payload) as typeof payload;

  assert.ok(result.candidates[0].content.parts[0].text.includes("[EMAIL_REDACTED]"));

  delete process.env.PII_RESPONSE_SANITIZATION;
});
