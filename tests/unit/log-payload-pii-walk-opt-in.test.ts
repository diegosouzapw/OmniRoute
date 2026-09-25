import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// protectPayloadForLog runs on every request body several times per request
// (pending-request tracker, call log). With response PII sanitization off,
// which is the default, the PII pass must not rebuild the payload at all.
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-pii-walk-"));
process.env.DATA_DIR = tmpDir;
delete process.env.PII_RESPONSE_SANITIZATION;
delete process.env.PII_RESPONSE_SANITIZATION_MODE;

const { clearAllFeatureFlagOverrides } = await import("../../src/lib/db/featureFlags.ts");
const { sanitizePayloadPII, protectPayloadForLog } = await import("../../src/lib/logPayloads.ts");

const body = {
  model: "test-model",
  messages: [
    { role: "user", content: [{ type: "text", text: "mail me at jane.doe@example.com" }] },
  ],
  authorization: "Bearer secret-token-value",
};

test("payload PII pass", async (t) => {
  await t.test("returns the payload untouched by reference when sanitization is off", () => {
    clearAllFeatureFlagOverrides();
    assert.strictEqual(sanitizePayloadPII(body), body);
    assert.strictEqual(sanitizePayloadPII(body.messages), body.messages);
    assert.equal(sanitizePayloadPII("jane.doe@example.com"), "jane.doe@example.com");
  });

  await t.test("protectPayloadForLog still redacts credentials when sanitization is off", () => {
    const protectedPayload = protectPayloadForLog(body) as Record<string, unknown>;
    assert.equal(protectedPayload.authorization, "[REDACTED]");
    assert.notStrictEqual(protectedPayload, body, "log copies never alias the live body");
    assert.deepEqual(protectedPayload.messages, body.messages);
  });

  await t.test("walks and redacts every string leaf when sanitization is on", () => {
    process.env.PII_RESPONSE_SANITIZATION = "true";
    process.env.PII_RESPONSE_SANITIZATION_MODE = "redact";
    try {
      const sanitized = sanitizePayloadPII(body) as typeof body;
      assert.notStrictEqual(sanitized, body);
      const text = (sanitized.messages[0].content[0] as { text: string }).text;
      assert.ok(!text.includes("jane.doe@example.com"), `email must be redacted, got: ${text}`);
      assert.equal(
        (body.messages[0].content[0] as { text: string }).text,
        "mail me at jane.doe@example.com",
        "the original body is never mutated"
      );
    } finally {
      delete process.env.PII_RESPONSE_SANITIZATION;
      delete process.env.PII_RESPONSE_SANITIZATION_MODE;
    }
  });
});
