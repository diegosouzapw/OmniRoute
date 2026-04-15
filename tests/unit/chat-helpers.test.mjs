import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chat-helpers-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const {
  resolveModelOrError,
  checkPipelineGates,
  executeChatWithBreaker,
  handleNoCredentials,
  safeResolveProxy,
  safeLogEvents,
  withSessionHeader,
} = await import("../../src/sse/handlers/chatHelpers.ts");
const { setModelUnavailable, resetAllAvailability } =
  await import("../../src/domain/modelAvailability.ts");
const { getCircuitBreaker, resetAllCircuitBreakers, CircuitBreakerOpenError, STATE } =
  await import("../../src/shared/utils/circuitBreaker.ts");

async function resetStorage() {
  resetAllAvailability();
  resetAllCircuitBreakers();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedConnection(provider, overrides = {}) {
  return providersDb.createProviderConnection({
    provider,
    authType: "apikey",
    name: overrides.name || `${provider}-helper-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: overrides.apiKey || `sk-${provider}-helper`,
    isActive: overrides.isActive ?? true,
    testStatus: overrides.testStatus || "active",
    providerSpecificData: overrides.providerSpecificData || {},
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("resolveModelOrError rejects ambiguous aliases without a provider prefix", async () => {
  const result = await resolveModelOrError(
    "claude-sonnet-4-6",
    { messages: [{ role: "user", content: "hello" }] },
    "/v1/chat/completions"
  );

  assert.ok(result.error);
  assert.equal(result.error.status, 400);
  const json = await result.error.json();
  assert.match(json.error.message, /Ambiguous model/i);
});

test("resolveModelOrError rejects ambiguous slashful canonical ids instead of misrouting them", async () => {
  const result = await resolveModelOrError(
    "openai/gpt-oss-120b",
    { messages: [{ role: "user", content: "hello" }] },
    "/v1/chat/completions"
  );

  assert.ok(result.error);
  assert.equal(result.error.status, 400);
  const json = await result.error.json();
  assert.match(json.error.message, /Ambiguous model/i);
  assert.match(json.error.message, /openai\/gpt-oss-120b/i);
});

test("resolveModelOrError rejects malformed model strings", async () => {
  const result = await resolveModelOrError(
    "../etc/passwd",
    { messages: [{ role: "user", content: "hello" }] },
    "/v1/chat/completions"
  );

  assert.ok(result.error);
  assert.equal(result.error.status, 400);
  const json = await result.error.json();
  assert.match(json.error.message, /Invalid model format/i);
});

test("checkPipelineGates blocks models in cooldown", async () => {
  setModelUnavailable("openai", "gpt-4o-mini", 60_000, "cooldown");

  const response = checkPipelineGates("openai", "gpt-4o-mini");
  const json = await response.json();

  assert.equal(response.status, 503);
  assert.equal(Number(response.headers.get("Retry-After")), 30);
  assert.match(json.error.message, /temporarily unavailable/i);
});

test("checkPipelineGates blocks providers with an open circuit breaker", async () => {
  const breaker = getCircuitBreaker("openai");
  breaker.state = STATE.OPEN;
  breaker.lastFailureTime = Date.now();

  const response = checkPipelineGates("openai", "gpt-4o-mini");
  const json = await response.json();

  assert.equal(response.status, 503);
  assert.match(json.error.message, /circuit breaker is open/i);
});

test("handleNoCredentials reports missing provider credentials and exhausted accounts", async () => {
  const missing = handleNoCredentials(null, null, "openai", "gpt-4o-mini", null, null);
  const exhausted = handleNoCredentials(
    null,
    "conn_123",
    "openai",
    "gpt-4o-mini",
    "Primary account failed",
    500
  );

  const missingJson = await missing.json();
  const exhaustedJson = await exhausted.json();

  assert.equal(missing.status, 400);
  assert.match(missingJson.error.message, /No credentials for provider: openai/);
  assert.equal(exhausted.status, 500);
  assert.match(exhaustedJson.error.message, /Primary account failed/);
});

test("handleNoCredentials returns Retry-After when every account is rate limited", async () => {
  const retryAfter = new Date(Date.now() + 45_000).toISOString();
  const response = handleNoCredentials(
    {
      allRateLimited: true,
      retryAfter,
      retryAfterHuman: "reset after 45s",
      lastErrorCode: 429,
      lastError: "Quota exceeded",
    },
    "conn_123",
    "openai",
    "gpt-4o-mini",
    null,
    null
  );
  const json = await response.json();

  assert.equal(response.status, 429);
  assert.ok(Number(response.headers.get("Retry-After")) >= 1);
  assert.match(json.error.message, /\[openai\/gpt-4o-mini\] Quota exceeded/);
});

test("handleNoCredentials returns structured model_cooldown when every credential for the model is cooling down", async () => {
  const retryAfter = new Date(Date.now() + 12_000).toISOString();
  const response = handleNoCredentials(
    {
      allRateLimited: true,
      retryAfter,
      retryAfterHuman: "reset after 12s",
      cooldownScope: "model",
      cooldownModel: "gemini-2.5-pro",
      lastErrorCode: 429,
      lastError: "too many requests",
    },
    "conn_123",
    "gemini",
    "gemini-2.5-pro",
    null,
    null
  );
  const json = await response.json();

  assert.equal(response.status, 429);
  assert.equal(Number(response.headers.get("Retry-After")) >= 1, true);
  assert.equal(json.error.code, "model_cooldown");
  assert.equal(json.error.type, "rate_limit_error");
  assert.equal(json.error.model, "gemini-2.5-pro");
  assert.ok(json.error.reset_seconds >= 1);
  assert.match(json.error.message, /cooling down/i);
});

test("safeResolveProxy returns the direct route when no proxy config is present", async () => {
  const connection = await seedConnection("openai", { apiKey: "sk-openai-direct" });

  const resolved = await safeResolveProxy(connection.id);

  assert.deepEqual(resolved, {
    proxy: null,
    level: "direct",
    levelId: null,
  });
});

test("executeChatWithBreaker converts circuit-open and proxy-fast-fail errors", async () => {
  const credentials = { connectionId: "conn_helper" };
  const openResult = await executeChatWithBreaker({
    bypassCircuitBreaker: false,
    breaker: {
      execute: async () => {
        throw new CircuitBreakerOpenError("already open", "openai", 5_000);
      },
    },
    body: { model: "openai/gpt-4o-mini" },
    provider: "openai",
    model: "gpt-4o-mini",
    refreshedCredentials: credentials,
    proxyInfo: null,
    log: console,
    clientRawRequest: null,
    credentials,
    apiKeyInfo: null,
    userAgent: "",
    comboName: null,
    comboStrategy: null,
    isCombo: false,
    extendedContext: false,
  });

  const proxyResult = await executeChatWithBreaker({
    bypassCircuitBreaker: false,
    breaker: {
      execute: async () => {
        const error = new Error("Proxy unreachable");
        error.code = "PROXY_UNREACHABLE";
        throw error;
      },
    },
    body: { model: "openai/gpt-4o-mini" },
    provider: "openai",
    model: "gpt-4o-mini",
    refreshedCredentials: credentials,
    proxyInfo: null,
    log: console,
    clientRawRequest: null,
    credentials,
    apiKeyInfo: null,
    userAgent: "",
    comboName: null,
    comboStrategy: null,
    isCombo: false,
    extendedContext: false,
  });

  assert.equal(openResult.result.status, 503);
  assert.equal(openResult.result.response.status, 503);
  assert.equal(proxyResult.result.status, 503);
  assert.equal(proxyResult.result.error, "Proxy unreachable");
});

test("safeLogEvents tolerates success and timeout payloads", () => {
  const credentials = { connectionId: "conn_log_12345678" };

  safeLogEvents({
    result: { success: true, status: 200 },
    proxyInfo: null,
    proxyLatency: 12,
    provider: "openai",
    model: "gpt-4o-mini",
    sourceFormat: "openai-chat",
    targetFormat: "openai-chat",
    credentials,
    comboName: null,
    clientRawRequest: { endpoint: "/v1/chat/completions" },
  });

  safeLogEvents({
    result: { success: false, status: 504, error: "timeout" },
    proxyInfo: { proxy: null, level: "direct", levelId: null },
    proxyLatency: 25,
    provider: "openai",
    model: "gpt-4o-mini",
    sourceFormat: "openai-chat",
    targetFormat: "openai-chat",
    credentials,
    comboName: "combo-a",
    clientRawRequest: { endpoint: "/v1/chat/completions" },
    tlsFingerprintUsed: true,
  });
});

test("withSessionHeader adds headers to mutable and immutable responses", async () => {
  const mutable = withSessionHeader(new Response("ok"), "sess_mutable");
  const immutable = withSessionHeader(Response.redirect("https://example.com"), "sess_redirect");

  assert.equal(mutable.headers.get("X-OmniRoute-Session-Id"), "sess_mutable");
  assert.equal(immutable.headers.get("X-OmniRoute-Session-Id"), "sess_redirect");
  assert.equal(immutable.status, 302);
  assert.equal(await immutable.text(), "");
});
