import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-log-apikey-redact-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");
const { redactPayload, protectPayloadForLog } = await import("../../src/lib/logPayloads.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const GEMINI_KEY = "AIzaSyDdI1SecretKeyMaterial1234567890";
const AZURE_KEY = "7f3a9c2e4b5d6f8091a2b3c4d5e6f7081";
const ELEVENLABS_KEY = "sk_e1SecretKeyMaterial_abcdefghij1234";
const ANTHROPIC_KEY = "sk-ant-api03-TopSecretKeyMaterial-abcdefgh";

async function captureProviderHeaders(
  headers: Record<string, string>
): Promise<Record<string, unknown>> {
  const logger = await createRequestLogger("openai", "gemini", "gemini-2.5-flash", {});
  logger.logTargetRequest("https://generativelanguage.googleapis.com/v1beta/models/x:generateContent", headers, {
    contents: [],
  });
  const payloads = logger.getPipelinePayloads() as {
    providerRequest?: { headers?: Record<string, unknown> };
  } | null;
  return payloads?.providerRequest?.headers ?? {};
}

test("log pipeline masks every *-api-key provider credential header spelling", async () => {
  const headers = await captureProviderHeaders({
    "x-goog-api-key": GEMINI_KEY,
    "api-key": AZURE_KEY,
    "xi-api-key": ELEVENLABS_KEY,
    "x-api-key": ANTHROPIC_KEY,
    "Content-Type": "application/json",
  });
  const dumped = JSON.stringify(headers);
  assert.ok(!dumped.includes(GEMINI_KEY), "Gemini x-goog-api-key must not survive masking");
  assert.ok(!dumped.includes(AZURE_KEY), "Azure api-key must not survive masking");
  assert.ok(!dumped.includes(ELEVENLABS_KEY), "ElevenLabs xi-api-key must not survive masking");
  assert.ok(!dumped.includes(ANTHROPIC_KEY), "Anthropic x-api-key must not survive masking");
  assert.equal(headers["Content-Type"], "application/json", "non-secret headers are preserved");
});

test("log pipeline header masking is case-insensitive", async () => {
  const headers = await captureProviderHeaders({
    "X-Goog-Api-Key": GEMINI_KEY,
    "Api-Key": AZURE_KEY,
  });
  const dumped = JSON.stringify(headers);
  assert.ok(!dumped.includes(GEMINI_KEY), "mixed-case X-Goog-Api-Key must be masked");
  assert.ok(!dumped.includes(AZURE_KEY), "mixed-case Api-Key must be masked");
});

test("log pipeline keeps x-ratelimit-* headers readable", async () => {
  const headers = await captureProviderHeaders({
    "x-ratelimit-remaining": "99",
    "x-api-key": ANTHROPIC_KEY,
  });
  assert.equal(headers["x-ratelimit-remaining"], "99", "rate-limit diagnostics are preserved");
});

test("persisted-log redaction covers the ElevenLabs xi-api-key header", () => {
  const protectedPayload = protectPayloadForLog({
    headers: { "xi-api-key": ELEVENLABS_KEY, "Content-Type": "audio/mpeg" },
  }) as { headers: Record<string, unknown> };
  assert.equal(protectedPayload.headers["xi-api-key"], "[REDACTED]");
  assert.equal(protectedPayload.headers["Content-Type"], "audio/mpeg");
  assert.equal(
    (redactPayload({ "xi-api-key": ELEVENLABS_KEY }) as Record<string, unknown>)["xi-api-key"],
    "[REDACTED]"
  );
});
