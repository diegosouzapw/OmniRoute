import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeRequest } from "../../src/shared/utils/inputSanitizer.ts";

async function withEnv(overrides: Record<string, string | undefined>, fn: () => Promise<void> | void) {
  const originals: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(overrides)) {
    originals[key] = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  try {
    await fn();
  } finally {
    for (const [key, value] of Object.entries(originals)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

const silentLogger = {
  info() {},
  warn() {},
  error() {},
} as Pick<Console, "info" | "warn" | "error">;

type ChatBody = {
  messages?: Array<{ role?: string; content?: unknown }>;
  input?: unknown;
};

test("sanitizeRequest redacts PII when enabled even if injection mode is block", async () => {
  await withEnv(
    {
      INPUT_SANITIZER_ENABLED: "true",
      INPUT_SANITIZER_MODE: "block",
      PII_REDACTION_ENABLED: "true",
    },
    () => {
      const result = sanitizeRequest(
        { messages: [{ role: "user", content: "Email dev@example.com" }] },
        silentLogger
      );
      assert.equal(result.modified, true);
      assert.ok(result.sanitizedBody);
      const body = result.sanitizedBody as ChatBody;
      assert.match(String(body.messages?.[0]?.content), /\[EMAIL_REDACTED\]/);
    }
  );
});

test("sanitizeRequest redacts Responses API string input items", async () => {
  await withEnv(
    {
      INPUT_SANITIZER_ENABLED: "true",
      INPUT_SANITIZER_MODE: "warn",
      PII_REDACTION_ENABLED: "true",
    },
    () => {
      const result = sanitizeRequest(
        { input: ["Please write to support@example.com"] },
        silentLogger
      );
      assert.equal(result.modified, true);
      const body = result.sanitizedBody as ChatBody;
      assert.match(String(Array.isArray(body.input) ? body.input[0] : undefined), /\[EMAIL_REDACTED\]/);
    }
  );
});

test("sanitizeRequest does not rewrite PII when PII_REDACTION_ENABLED is false", async () => {
  await withEnv(
    {
      INPUT_SANITIZER_ENABLED: "true",
      INPUT_SANITIZER_MODE: "redact",
      PII_REDACTION_ENABLED: "false",
    },
    () => {
      const result = sanitizeRequest(
        { messages: [{ role: "user", content: "Email dev@example.com" }] },
        silentLogger
      );
      assert.equal(result.modified, false);
      assert.equal(result.sanitizedBody, null);
    }
  );
});
