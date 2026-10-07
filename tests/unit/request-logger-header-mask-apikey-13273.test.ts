// Regression test for #13273: maskSensitiveHeaders missed *-api-key spellings
// (x-goog-api-key, api-key, xi-api-key) — provider keys landed in the log
// pipeline unmasked.
//
// maskSensitiveHeaders uses substring matching on a sensitiveKeys list; adding
// "apikey" (no hyphens) catches every current and future *-api-key header
// spelling as a single catch-all.
//
// protectPayloadForLog / redactPayload in logPayloads.ts is a separate layer
// that also needs xi-api-key in SENSITIVE_KEYS for body-level redaction.

import { test } from "node:test";
import assert from "node:assert/strict";

const { createRequestLogger } = await import("../../open-sse/utils/requestLogger.ts");
const { protectPayloadForLog } = await import("../../src/lib/logPayloads.ts");

// --- maskSensitiveHeaders (via logTargetRequest -> getPipelinePayloads) ---

test("maskSensitiveHeaders redacts x-goog-api-key (Gemini)", async () => {
  const logger = await createRequestLogger("openai", "gemini", "gemini-2.5-flash", {});
  logger.logTargetRequest("https://generativelanguage.googleapis.com/v1", {
    "x-goog-api-key": "super-secret-gemini-key-12345",
  }, {});

  const payload = logger.getPipelinePayloads();
  const headers = payload?.providerRequest?.headers as Record<string, unknown>;
  assert.ok(headers, "providerRequest.headers must exist");
  assert.notEqual(headers["x-goog-api-key"], "super-secret-gemini-key-12345",
    "x-goog-api-key must not appear verbatim");
  assert.ok(
    typeof headers["x-goog-api-key"] === "string" && headers["x-goog-api-key"] !== "",
    "x-goog-api-key must be masked"
  );
});

test("maskSensitiveHeaders redacts api-key (Azure OpenAI)", async () => {
  const logger = await createRequestLogger("openai", "azure-openai", "gpt-4o", {});
  logger.logTargetRequest("https://myazure.openai.azure.com/openai/deployments/gpt-4o", {
    "api-key": "azure-secret-key-67890",
  }, {});

  const payload = logger.getPipelinePayloads();
  const headers = payload?.providerRequest?.headers as Record<string, unknown>;
  assert.ok(headers, "providerRequest.headers must exist");
  assert.notEqual(headers["api-key"], "azure-secret-key-67890",
    "api-key must not appear verbatim");
});

test("maskSensitiveHeaders redacts xi-api-key (ElevenLabs)", async () => {
  const logger = await createRequestLogger("openai", "elevenlabs", "eleven_multilingual_v2", {});
  logger.logTargetRequest("https://api.elevenlabs.io/v1/text-to-speech", {
    "xi-api-key": "elevenlabs-secret-key-abcde",
  }, {});

  const payload = logger.getPipelinePayloads();
  const headers = payload?.providerRequest?.headers as Record<string, unknown>;
  assert.ok(headers, "providerRequest.headers must exist");
  assert.notEqual(headers["xi-api-key"], "elevenlabs-secret-key-abcde",
    "xi-api-key must not appear verbatim");
});

test("maskSensitiveHeaders still masks x-api-key (Anthropic)", async () => {
  const logger = await createRequestLogger("openai", "anthropic", "claude-sonnet-4", {});
  logger.logTargetRequest("https://api.anthropic.com/v1/messages", {
    "x-api-key": "anthropic-key-xyz",
  }, {});

  const payload = logger.getPipelinePayloads();
  const headers = payload?.providerRequest?.headers as Record<string, unknown>;
  assert.ok(headers, "providerRequest.headers must exist");
  assert.notEqual(headers["x-api-key"], "anthropic-key-xyz",
    "x-api-key must not appear verbatim");
});

test("maskSensitiveHeaders does NOT mask x-ratelimit- headers", async () => {
  const logger = await createRequestLogger("openai", "openai", "gpt-4o", {});
  logger.logTargetRequest("https://api.openai.com/v1/chat/completions", {
    "x-ratelimit-remaining-requests": "100",
    "x-ratelimit-reset-requests": "1m",
  }, {});

  const payload = logger.getPipelinePayloads();
  const headers = payload?.providerRequest?.headers as Record<string, unknown>;
  assert.ok(headers, "providerRequest.headers must exist");
  assert.equal(headers["x-ratelimit-remaining-requests"], "100",
    "x-ratelimit- headers must NOT be masked");
});

// --- protectPayloadForLog (logPayloads.ts SENSITIVE_KEYS) ---

test("protectPayloadForLog redacts xi-api-key in body payloads", () => {
  const protectedPayload = protectPayloadForLog({
    headers: {
      "xi-api-key": "elevenlabs-secret-key-abcde",
    },
    body: {
      text: "Hello world",
    },
  }) as Record<string, unknown>;

  const headers = protectedPayload.headers as Record<string, unknown>;
  assert.equal(headers["xi-api-key"], "[REDACTED]",
    "xi-api-key must be redacted by protectPayloadForLog");
});

test("protectPayloadForLog redacts x-goog-api-key in body payloads", () => {
  const protectedPayload = protectPayloadForLog({
    headers: {
      "x-goog-api-key": "gemini-secret-key",
    },
  }) as Record<string, unknown>;

  const headers = protectedPayload.headers as Record<string, unknown>;
  assert.equal(headers["x-goog-api-key"], "[REDACTED]",
    "x-goog-api-key must be redacted by protectPayloadForLog");
});
