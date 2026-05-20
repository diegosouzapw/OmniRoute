/**
 * Issue #2232 — Vision Bridge env override.
 *
 * Operators configured `visionBridgeModel: "gemini/gemini-2.0-flash"` (or
 * other non-anthropic prefixes) and watched every request fail with
 * `Vision API error 401: You didn't provide an API key` from OpenAI, because
 * the helper hardcoded `https://api.openai.com/v1` for any model that
 * wasn't `anthropic/*`.
 *
 * The fix adds two new env vars:
 *   - VISION_BRIDGE_BASE_URL: alternate OpenAI-compatible base URL (e.g.
 *     OmniRoute self-loop, Google's Gemini OpenAI-compat endpoint).
 *   - VISION_BRIDGE_API_KEY: alternate API key for that endpoint.
 *
 * These tests cover the helpers in isolation; the integration with the
 * guardrail's `callVisionModel` is exercised by the existing
 * vision-bridge-settings-schema tests.
 */

import test from "node:test";
import assert from "node:assert/strict";

const { resolveProviderApiKey, resolveVisionBridgeBaseUrl } =
  await import("../../src/lib/guardrails/visionBridgeHelpers.ts");

const ENV_KEYS = [
  "VISION_BRIDGE_API_KEY",
  "VISION_BRIDGE_BASE_URL",
  "OPENAI_API_URL",
  "OPENAI_API_KEY",
  "ANTHROPIC_API_KEY",
  "GOOGLE_API_KEY",
];

const ORIGINAL_ENV: Record<string, string | undefined> = {};
for (const k of ENV_KEYS) ORIGINAL_ENV[k] = process.env[k];

function clearEnv() {
  for (const k of ENV_KEYS) delete process.env[k];
}

function restoreEnv() {
  for (const k of ENV_KEYS) {
    if (ORIGINAL_ENV[k] === undefined) delete process.env[k];
    else process.env[k] = ORIGINAL_ENV[k];
  }
}

test.afterEach(restoreEnv);

// ─── resolveVisionBridgeBaseUrl ───────────────────────────────────────────

test("#2232 — VISION_BRIDGE_BASE_URL takes precedence over OPENAI_API_URL", () => {
  clearEnv();
  process.env.VISION_BRIDGE_BASE_URL = "http://localhost:20128/v1";
  process.env.OPENAI_API_URL = "https://oai.example.com/v1";
  assert.equal(resolveVisionBridgeBaseUrl(), "http://localhost:20128/v1");
});

test("#2232 — falls back to OPENAI_API_URL when VISION_BRIDGE_BASE_URL is unset", () => {
  clearEnv();
  process.env.OPENAI_API_URL = "https://oai.example.com/v1";
  assert.equal(resolveVisionBridgeBaseUrl(), "https://oai.example.com/v1");
});

test("#2232 — defaults to api.openai.com when both env vars are unset", () => {
  clearEnv();
  assert.equal(resolveVisionBridgeBaseUrl(), "https://api.openai.com/v1");
});

test("#2232 — trailing slashes on VISION_BRIDGE_BASE_URL are stripped", () => {
  clearEnv();
  process.env.VISION_BRIDGE_BASE_URL = "http://localhost:20128/v1///";
  assert.equal(resolveVisionBridgeBaseUrl(), "http://localhost:20128/v1");
});

test("#2232 — whitespace-only VISION_BRIDGE_BASE_URL falls through to OPENAI_API_URL", () => {
  clearEnv();
  process.env.VISION_BRIDGE_BASE_URL = "   ";
  process.env.OPENAI_API_URL = "https://oai.example.com/v1";
  assert.equal(resolveVisionBridgeBaseUrl(), "https://oai.example.com/v1");
});

// ─── resolveProviderApiKey ────────────────────────────────────────────────

test("#2232 — VISION_BRIDGE_API_KEY wins for non-anthropic models", () => {
  clearEnv();
  process.env.VISION_BRIDGE_API_KEY = "stub-vision-bridge-key";
  process.env.OPENAI_API_KEY = "stub-openai-key";
  process.env.GOOGLE_API_KEY = "stub-google-key";
  assert.equal(resolveProviderApiKey("gemini/gemini-2.0-flash"), "stub-vision-bridge-key");
  assert.equal(resolveProviderApiKey("openrouter/nvidia/foo"), "stub-vision-bridge-key");
  assert.equal(resolveProviderApiKey("openai/gpt-4o"), "stub-vision-bridge-key");
});

test("#2232 — Anthropic models ignore VISION_BRIDGE_API_KEY (wire format differs)", () => {
  clearEnv();
  process.env.VISION_BRIDGE_API_KEY = "stub-vision-bridge-key";
  process.env.ANTHROPIC_API_KEY = "stub-anthropic-key";
  assert.equal(resolveProviderApiKey("anthropic/claude-3-haiku"), "stub-anthropic-key");
});

test("#2232 — explicit apiKey wins over VISION_BRIDGE_API_KEY", () => {
  clearEnv();
  process.env.VISION_BRIDGE_API_KEY = "stub-vision-bridge-key";
  assert.equal(
    resolveProviderApiKey("gemini/gemini-2.0-flash", "stub-explicit-key"),
    "stub-explicit-key"
  );
});

test("#2232 — without VISION_BRIDGE_API_KEY, falls back to provider-specific env", () => {
  clearEnv();
  process.env.GOOGLE_API_KEY = "stub-google-key";
  process.env.OPENAI_API_KEY = "stub-openai-key";
  assert.equal(resolveProviderApiKey("google/gemini-pro"), "stub-google-key");
  assert.equal(resolveProviderApiKey("openai/gpt-4o"), "stub-openai-key");
});

test("#2232 — empty VISION_BRIDGE_API_KEY falls through to provider-specific env", () => {
  clearEnv();
  process.env.VISION_BRIDGE_API_KEY = "   ";
  process.env.OPENAI_API_KEY = "stub-openai-key";
  assert.equal(resolveProviderApiKey("openai/gpt-4o"), "stub-openai-key");
});

test("#2232 — unrecognized prefix without VISION_BRIDGE_API_KEY falls back to OPENAI_API_KEY", () => {
  clearEnv();
  process.env.OPENAI_API_KEY = "stub-openai-fallback";
  assert.equal(resolveProviderApiKey("nonexistent/foo-bar"), "stub-openai-fallback");
});
