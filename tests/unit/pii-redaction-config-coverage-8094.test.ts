import { test } from "node:test";
import assert from "node:assert/strict";

/**
 * Tests for #8094: PII redaction config footgun + coverage holes.
 *
 * We import redactBody indirectly via sanitizeRequest to test the
 * full pipeline. But since sanitizeRequest reads env vars at call-time
 * via getConfig(), we set them before each test.
 */

// We need to test the redactBody function directly, which is not exported.
// Instead, we test sanitizeRequest which calls it internally.
// The module reads env at call time, so we set env before each test.

async function importFresh() {
  // Use cache-busting query param to force re-import
  return import(`../../src/shared/utils/inputSanitizer.ts?t=${Date.now()}`);
}

function withEnv(env: Record<string, string>, fn: () => Promise<void>) {
  const saved: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(env)) {
    saved[k] = process.env[k];
    process.env[k] = v;
  }
  return fn().finally(() => {
    for (const [k, v] of Object.entries(saved)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  });
}

test("#8094: PII redaction runs regardless of INPUT_SANITIZER_MODE", async () => {
  await withEnv(
    {
      INPUT_SANITIZER_ENABLED: "true",
      INPUT_SANITIZER_MODE: "block", // NOT redact
      PII_REDACTION_ENABLED: "true",
    },
    async () => {
      const mod = await importFresh();
      const body = {
        messages: [{ role: "user", content: "My email is john@example.com" }],
      };
      const result = (mod as any).sanitizeRequest(body);
      assert.ok(result.modified, "body must be modified when PII_REDACTION_ENABLED=true");
      assert.ok(result.sanitizedBody, "sanitizedBody must be set");
      assert.ok(
        !JSON.stringify(result.sanitizedBody).includes("john@example.com"),
        "email must be redacted from body"
      );
    }
  );
});

test("#8094: PII redaction runs in warn mode too", async () => {
  await withEnv(
    {
      INPUT_SANITIZER_ENABLED: "true",
      INPUT_SANITIZER_MODE: "warn",
      PII_REDACTION_ENABLED: "true",
    },
    async () => {
      const mod = await importFresh();
      const body = {
        messages: [{ role: "user", content: "Call +55 11 99999-9999" }],
      };
      const result = (mod as any).sanitizeRequest(body);
      assert.ok(result.modified, "body must be redacted in warn mode");
      assert.ok(
        !JSON.stringify(result.sanitizedBody).includes("99999-9999"),
        "phone must be redacted"
      );
    }
  );
});

test("#8094: redactBody handles Responses API string input[] items", async () => {
  await withEnv(
    {
      INPUT_SANITIZER_ENABLED: "true",
      INPUT_SANITIZER_MODE: "warn",
      PII_REDACTION_ENABLED: "true",
    },
    async () => {
      const mod = await importFresh();
      const body = {
        input: [
          "My SSN is 123-45-6789",
          { role: "user", content: "hello" },
        ],
      };
      const result = (mod as any).sanitizeRequest(body);
      assert.ok(result.modified, "body must be modified");
      const sanitized = JSON.stringify(result.sanitizedBody);
      assert.ok(
        !sanitized.includes("123-45-6789"),
        "SSN in string input[] item must be redacted"
      );
    }
  );
});

test("#8094: redactBody handles array system", async () => {
  await withEnv(
    {
      INPUT_SANITIZER_ENABLED: "true",
      INPUT_SANITIZER_MODE: "warn",
      PII_REDACTION_ENABLED: "true",
    },
    async () => {
      const mod = await importFresh();
      const body = {
        system: [
          { type: "text", text: "Admin email: admin@corp.com" },
        ],
        messages: [{ role: "user", content: "hi" }],
      };
      const result = (mod as any).sanitizeRequest(body);
      assert.ok(result.modified, "body must be modified");
      const sanitized = JSON.stringify(result.sanitizedBody);
      assert.ok(
        !sanitized.includes("admin@corp.com"),
        "email in array system block must be redacted"
      );
    }
  );
});

test("#8094: redactBody handles content parts with input_text field", async () => {
  await withEnv(
    {
      INPUT_SANITIZER_ENABLED: "true",
      INPUT_SANITIZER_MODE: "warn",
      PII_REDACTION_ENABLED: "true",
    },
    async () => {
      const mod = await importFresh();
      const body = {
        messages: [
          {
            role: "user",
            content: [
              { type: "input_text", input_text: "My email is test@demo.org" },
            ],
          },
        ],
      };
      const result = (mod as any).sanitizeRequest(body);
      assert.ok(result.modified, "body must be modified");
      const sanitized = JSON.stringify(result.sanitizedBody);
      assert.ok(
        !sanitized.includes("test@demo.org"),
        "email in input_text content part must be redacted"
      );
    }
  );
});

test("#8094: redactBody handles duplicate string parts (no indexOf bug)", async () => {
  await withEnv(
    {
      INPUT_SANITIZER_ENABLED: "true",
      INPUT_SANITIZER_MODE: "warn",
      PII_REDACTION_ENABLED: "true",
    },
    async () => {
      const mod = await importFresh();
      const body = {
        messages: [
          {
            role: "user",
            content: [
              "Email: dup@same.com",
              "Email: dup@same.com", // duplicate string
            ],
          },
        ],
      };
      const result = (mod as any).sanitizeRequest(body);
      assert.ok(result.modified, "body must be modified");
      const sanitized = JSON.stringify(result.sanitizedBody);
      // Both instances must be redacted (old indexOf bug would miss the 2nd)
      assert.equal(
        (sanitized.match(/dup@same\.com/g) || []).length,
        0,
        "both duplicate string parts must be redacted"
      );
    }
  );
});
