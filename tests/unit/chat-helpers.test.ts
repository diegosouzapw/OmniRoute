import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import net from "node:net";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chat-helpers-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const combosDb = await import("../../src/lib/db/combos.ts");
const {
  resolveModelOrError,
  checkPipelineGates,
  executeChatWithBreaker,
  handleNoCredentials,
  safeResolveProxy,
  safeLogEvents,
  withSessionHeader,
} = await import("../../src/sse/handlers/chatHelpers.ts");
const { getCircuitBreaker, resetAllCircuitBreakers, STATE } =
  await import("../../src/shared/utils/circuitBreaker.ts");
// DATA_DIR must be fixed before these modules load; keep this test seam dynamic.
const { setTlsClientForTest } = await import("../../open-sse/utils/proxyFetch.ts");

type ApiErrorJson = {
  error?: {
    message?: string;
    code?: string;
    type?: string;
    model?: string;
    reset_seconds?: number;
  };
};

async function resetStorage() {
  resetAllCircuitBreakers();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
    defaultModel: overrides.defaultModel,
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("resolveModelOrError resolves built-in auto catalog ids without persisted combo rows", async () => {
  await seedConnection("openai", { defaultModel: "gpt-4o-mini" });

  const result = await resolveModelOrError(
    "auto/best-coding",
    { messages: [{ role: "user", content: "echo hi" }] },
    "/v1/chat/completions"
  );

  assert.equal(result.error, undefined);
  assert.ok(result.combo);
  assert.equal(result.combo.id, "auto/best-coding");
  assert.equal(result.combo.name, "auto/best-coding");
  assert.equal(result.provider, "auto");
  assert.equal(result.model, "best-coding");
  assert.ok(Array.isArray(result.combo.models));
  assert.ok(result.combo.models.length > 0);
  assert.equal(result.combo.models[0].providerId, "openai");
});

test("resolveModelOrError rejects unknown built-in auto catalog ids", async () => {
  await seedConnection("openai", { defaultModel: "gpt-4o-mini" });

  const result = await resolveModelOrError(
    "auto/not-a-real-template",
    { messages: [{ role: "user", content: "echo hi" }] },
    "/v1/chat/completions"
  );

  assert.ok(result.error);
  assert.equal(result.error.status, 400);
  const json = (await result.error.json()) as ApiErrorJson;
  assert.match(json.error.message, /Unknown built-in auto combo/i);
});

test("resolveModelOrError preserves persisted fuzzy auto combos before virtual catalog ids", async () => {
  await combosDb.createCombo({
    id: "persisted-auto-best-legacy",
    name: "auto/best-legacy",
    strategy: "priority",
    models: [{ providerId: "openai", model: "gpt-4o-mini" }],
  });

  const result = await resolveModelOrError(
    "auto/legacy",
    { messages: [{ role: "user", content: "echo hi" }] },
    "/v1/chat/completions"
  );

  assert.equal(result.error, undefined);
  assert.ok(result.combo);
  assert.equal(result.combo.id, "persisted-auto-best-legacy");
  assert.equal(result.combo.name, "auto/best-legacy");
  assert.equal(result.provider, "auto");
  assert.equal(result.model, "legacy");
});

test("resolveModelOrError rejects ambiguous aliases without a provider prefix", async () => {
  const result = await resolveModelOrError(
    "claude-sonnet-4-6",
    { messages: [{ role: "user", content: "hello" }] },
    "/v1/chat/completions"
  );

  assert.ok(result.error);
  assert.equal(result.error.status, 400);
  const json = (await result.error.json()) as ApiErrorJson;
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
  const json = (await result.error.json()) as ApiErrorJson;
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
  const json = (await result.error.json()) as ApiErrorJson;
  assert.match(json.error.message, /Invalid model format/i);
});

test("resolveModelOrError routes Codex native compact gpt-5.5 requests to Codex", async () => {
  const result = await resolveModelOrError(
    "gpt-5.5",
    { model: "gpt-5.5", input: "compact this session", reasoning: { effort: "xhigh" } },
    "/v1/responses/compact",
    { "user-agent": "codex-cli/0.128.0" }
  );

  assert.equal(result.provider, "codex");
  assert.equal(result.model, "gpt-5.5");
});

test("resolveModelOrError routes bare gpt-5.5 Responses requests to Codex regardless of client user-agent", async () => {
  // #9275: gpt-5.5 is in CODEX_NATIVE_UNPREFIXED_MODELS — bare-id requests
  // route to codex even from a non-Codex-CLI client, so the Codex CLI default
  // is honored deterministically instead of racing other providers that also
  // catalog the id. #9447 bounded that precedence: it only PREEMPTS another
  // provider when a codex connection is actually ACTIVE, so this case seeds
  // one first. Prefix the model id (e.g. openai/gpt-5.5) to opt into a
  // different provider.
  await seedConnection("codex");

  const result = await resolveModelOrError(
    "gpt-5.5",
    { model: "gpt-5.5", input: "hello" },
    "/v1/responses",
    { "user-agent": "OpenAI/Node" }
  );

  assert.equal(result.provider, "codex");
  assert.equal(result.model, "gpt-5.5");
});

test("resolveModelOrError routes bare gpt-5.5 to Codex medium when Codex is the only active account", async () => {
  await seedConnection("codex");

  const result = await resolveModelOrError(
    "gpt-5.5",
    { model: "gpt-5.5", input: "hello" },
    "/v1/responses",
    { "user-agent": "OpenAI/Node" }
  );

  assert.equal(result.provider, "codex");
  assert.equal(result.model, "gpt-5.5");
  assert.equal(result.targetFormat, "openai-responses");
});

test("resolveModelOrError keeps bare gpt-5.5 on OpenAI when OpenAI is the only active account", async () => {
  // #9447 bounded the #9275 codex-first default: the Codex-native preference
  // may only PREEMPT another provider when a codex connection is ACTIVE. An
  // OpenAI-only install must not have bare gpt-5.5 sent to codex only to fail
  // with "no active credentials for provider: codex" on a model OpenAI
  // serves — it routes to the provider that can actually serve it.
  await seedConnection("openai");

  const result = await resolveModelOrError(
    "gpt-5.5",
    { model: "gpt-5.5", input: "hello" },
    "/v1/responses",
    { "user-agent": "OpenAI/Node" }
  );

  assert.equal(result.provider, "openai");
  assert.equal(result.model, "gpt-5.5");
});

test("resolveModelOrError honors a custom-model targetFormat override even when the model id also exists in the static provider registry", async () => {
  // #8852-followup: "claude-sonnet-4-6" is a real static registry entry under
  // "vertex" (see open-sse/config/providers/registry/vertex/index.ts) with no
  // per-model targetFormat, so the provider default ("gemini") normally applies.
  // A user who manually added the same id as a custom model with an explicit
  // "claude" targetFormat override must have that override win — otherwise
  // Vertex's native Anthropic response shape gets mistranslated as Gemini's,
  // silently dropping all response content.
  await seedConnection("vertex");
  const modelsDb = await import("../../src/lib/db/models.ts");
  await modelsDb.addCustomModel(
    "vertex",
    "claude-sonnet-4-6",
    "Claude Sonnet 4.6 (Vertex)",
    "manual",
    "chat-completions",
    ["chat"],
    "claude"
  );

  const result = await resolveModelOrError(
    "vertex/claude-sonnet-4-6",
    { model: "vertex/claude-sonnet-4-6", messages: [{ role: "user", content: "hi" }] },
    "/v1/chat/completions"
  );

  assert.equal(result.provider, "vertex");
  assert.equal(result.model, "claude-sonnet-4-6");
  assert.equal(result.targetFormat, "claude");
});

test("checkPipelineGates blocks providers with an open circuit breaker", async () => {
  const breaker = getCircuitBreaker("openai");
  breaker.state = STATE.OPEN;
  breaker.lastFailureTime = Date.now();
  breaker.resetTimeout = 5_000;

  const response = await checkPipelineGates("openai", "gpt-4o-mini", {
    providerProfile: {
      failureThreshold: 5,
      resetTimeoutMs: 5_000,
    },
  });
  const json = (await response.json()) as ApiErrorJson;
  const retryAfter = Number(response.headers.get("Retry-After"));

  assert.equal(response.status, 503);
  assert.ok(retryAfter >= 4);
  assert.ok(retryAfter <= 5);
  assert.match(json.error.message, /circuit breaker is open/i);
  assert.equal(json.error.code, "provider_circuit_open");
  assert.equal(response.headers.get("X-OmniRoute-Provider-Breaker"), "open");
});

test("checkPipelineGates reapplies runtime breaker settings to existing breakers", async () => {
  const breaker = getCircuitBreaker("openai", {
    failureThreshold: 5,
    resetTimeout: 30_000,
  });
  breaker.state = STATE.OPEN;
  breaker.lastFailureTime = Date.now() - 6_000;

  const response = await checkPipelineGates("openai", "gpt-4o-mini", {
    providerProfile: {
      failureThreshold: 60,
      degradationThreshold: 30,
      resetTimeoutMs: 5_000,
    },
  });

  assert.equal(response, null);
  assert.equal(breaker.resetTimeout, 5_000);
  assert.equal(breaker.failureThreshold, 60);
  assert.equal(breaker.degradationThreshold, 30);
});

test("handleNoCredentials reports missing provider credentials and exhausted accounts", async () => {
  // Ported from upstream decolua/9router#336 (Ibrahim Ryan): when a provider has
  // zero usable connections (all disabled, or none configured at all), the
  // historical 400 BAD_REQUEST classified the failure as non-fallbackable, so a
  // combo like `antigravity/opus → github/opus` died on the first leg with a
  // hard 400 even though the next combo target was perfectly healthy.
  //
  // The combo target loop (open-sse/services/combo.ts) deliberately breaks on
  // 400 to prevent infinite fallback loops with body-specific 4xx errors
  // (#4279/PR#4316). 404 NOT_FOUND, by contrast, flows through checkFallbackError
  // as `shouldFallback: true` (generic-error catch-all path,
  // open-sse/services/accountFallback.ts:1593-1599) so the next combo target is
  // tried. We surface "no active credentials" as 404 so combo can skip past a
  // disabled-credentials provider instead of failing the whole request.
  // In combo routing the no-credentials branch must stay 404 NOT_FOUND so the
  // combo target loop can fall through to the next target. Pass isCombo=true.
  const missing = handleNoCredentials(
    null,
    null,
    "openai",
    "gpt-4o-mini",
    null,
    null,
    undefined,
    true
  );
  const exhausted = handleNoCredentials(
    null,
    "conn_123",
    "openai",
    "gpt-4o-mini",
    "Primary account failed",
    500
  );

  const missingJson = (await missing.json()) as ApiErrorJson;
  const exhaustedJson = (await exhausted.json()) as ApiErrorJson;

  assert.equal(missing.status, 404);
  assert.match(missingJson.error.message, /No active credentials for provider: openai/);
  assert.equal(exhausted.status, 500);
  assert.match(exhaustedJson.error.message, /Primary account failed/);
});

test("handleNoCredentials remaps leaked 404 to 401/503 for single-model requests", async () => {
  // Issue #2: a direct (non-combo) API client must not receive a misleading 404
  // "No active credentials" error — remap to an explicit auth/credential status.
  const forKnownProvider = handleNoCredentials(
    null,
    null,
    "byNara",
    "claude-sonnet-4.6",
    null,
    null,
    undefined,
    /* isCombo */ false
  );
  assert.equal(forKnownProvider.status, 401);
  const knownJson = (await forKnownProvider.json()) as { error?: { message?: string } };
  assert.match(knownJson.error?.message ?? "", /No active credentials for provider: byNara/);

  const forUnknownProvider = handleNoCredentials(
    null,
    null,
    "",
    "gpt-4o-mini",
    null,
    null,
    undefined,
    /* isCombo */ false
  );
  assert.equal(forUnknownProvider.status, 503);
});

test("handleNoCredentials still leaks 404 (combo fall-through) only when combo", async () => {
  // Regression guard: the 404 is intentionally preserved for combo routing so it
  // can skip a disabled-credentials leg. Explicitly assert isCombo=true keeps 404
  // and isCombo=false does not. (Issue #2)
  const combo = handleNoCredentials(
    null,
    null,
    "kiro",
    "claude-opus-5",
    null,
    null,
    undefined,
    true
  );
  assert.equal(combo.status, 404);

  const single = handleNoCredentials(
    null,
    null,
    "byNara",
    "claude-opus-5",
    null,
    null,
    undefined,
    false
  );
  assert.notEqual(single.status, 404);
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
  const json = (await response.json()) as ApiErrorJson;

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
  const json = (await response.json()) as ApiErrorJson;

  assert.equal(response.status, 429);
  assert.equal(Number(response.headers.get("Retry-After")) >= 1, true);
  assert.equal(json.error.code, "model_cooldown");
  assert.equal(json.error.type, "rate_limit_error");
  assert.equal(json.error.model, "gemini-2.5-pro");
  assert.ok(json.error.reset_seconds >= 1);
  assert.match(json.error.message, /cooling down/i);
});

test("handleNoCredentials returns 401 with re-auth hint when every connection is in a terminal state", async () => {
  // Classic scenario: AWS SSO refresh tokens hit their 90-day TTL, every Kiro
  // connection flips to is_active=0 + testStatus=banned/expired. Surface as
  // 401 with a reconnect hint instead of the misleading 400 "No credentials".
  const response = handleNoCredentials(
    { allExpired: true, expiredCount: 1, expiredStatus: "banned" },
    null,
    "kiro",
    "claude-sonnet-4.6",
    null,
    null
  );
  const json = (await response.json()) as ApiErrorJson;

  assert.equal(response.status, 401);
  assert.match(json.error.message, /\[kiro\]/);
  assert.match(json.error.message, /banned by upstream/);
  assert.match(json.error.message, /please reconnect/i);
});

test("handleNoCredentials maps allExpired status='expired' to the 'authentication expired' reason", async () => {
  const response = handleNoCredentials(
    { allExpired: true, expiredCount: 3, expiredStatus: "expired" },
    null,
    "cline",
    "claude-sonnet-4.6",
    null,
    null
  );
  const json = (await response.json()) as ApiErrorJson;

  assert.equal(response.status, 401);
  assert.match(json.error.message, /3 connection\(s\) authentication expired/);
});

test("handleNoCredentials maps credits_exhausted to HTTP 402 not 401 (#12441)", async () => {
  const response = handleNoCredentials(
    { allExpired: true, expiredCount: 3, expiredStatus: "credits_exhausted" },
    null,
    "chutes",
    "moonshotai/Kimi-K3-TEE",
    null,
    null
  );
  const json = (await response.json()) as ApiErrorJson;

  assert.equal(response.status, 402);
  assert.match(json.error.message, /3 connection\(s\) credits exhausted/);
});

test("handleNoCredentials preserves lastError over allExpired after a failed attempt", async () => {
  const response = handleNoCredentials(
    { allExpired: true, expiredCount: 1, expiredStatus: "credits_exhausted" },
    null,
    "openai",
    "gpt-4.1",
    "quota exceeded",
    402
  );
  const json = (await response.json()) as { error?: { message?: string } };
  assert.equal(response.status, 402);
  assert.match(json.error.message, /quota exceeded/i);
});

test("safeResolveProxy returns the direct route when no proxy config is present", async () => {
  const connection = await seedConnection("openai", { apiKey: "sk-openai-direct" });

  const resolved = await safeResolveProxy((connection as { id: string }).id);

  assert.deepEqual(resolved, {
    proxy: null,
    level: "direct",
    levelId: null,
  });
});

test("executeChatWithBreaker converts proxy fast-fail errors", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    const error = new Error("Proxy unreachable");
    (error as Error & { code?: string }).code = "PROXY_UNREACHABLE";
    throw error;
  };

  try {
    const credentials = {
      connectionId: "conn_helper",
      apiKey: "sk-openai-helper",
      providerSpecificData: {},
    };
    const breaker = getCircuitBreaker("openai");
    const proxyResult = await executeChatWithBreaker({
      bypassCircuitBreaker: false,
      breaker,
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
      comboStepId: null,
      comboExecutionKey: null,
    });

    assert.equal(proxyResult.result.status, 502);
    assert.match(String(proxyResult.result.error || ""), /Proxy unreachable/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("executeChatWithBreaker preserves account TLS scope when a proxy bypasses to direct", async () => {
  const server = net.createServer((socket) => socket.end());
  const listening = Promise.withResolvers<void>();
  server.listen(0, "127.0.0.1", listening.resolve);
  await listening.promise;
  const address = server.address();
  assert.ok(address && typeof address !== "string");
  const prior = {
    enable: process.env.ENABLE_TLS_FINGERPRINT,
    providers: process.env.TLS_FINGERPRINT_PROVIDERS,
    noProxy: process.env.NO_PROXY,
  };
  process.env.ENABLE_TLS_FINGERPRINT = "true";
  delete process.env.TLS_FINGERPRINT_PROVIDERS;
  process.env.NO_PROXY = "api.openai.com";
  let observedProxy: string | null | undefined;
  let observedScope: string | undefined;
  setTlsClientForTest({
    available: true,
    fetch: async (_url, options) => {
      observedProxy = options?.proxy;
      observedScope = options?.sessionScope;
      return new Response(
        JSON.stringify({
          id: "chatcmpl-test",
          object: "chat.completion",
          created: 0,
          model: "gpt-4o-mini",
          choices: [
            {
              index: 0,
              message: { role: "assistant", content: "ok" },
              finish_reason: "stop",
            },
          ],
          usage: { prompt_tokens: 1, completion_tokens: 1, total_tokens: 2 },
        }),
        { headers: { "content-type": "application/json" } }
      );
    },
  });

  try {
    const credentials = {
      connectionId: "conn_tls_scope",
      apiKey: "sk-openai-helper",
      providerSpecificData: {},
    };
    const result = await executeChatWithBreaker({
      bypassCircuitBreaker: false,
      breaker: getCircuitBreaker("openai"),
      body: { model: "openai/gpt-4o-mini", messages: [] },
      provider: "openai",
      model: "gpt-4o-mini",
      refreshedCredentials: credentials,
      proxyInfo: {
        proxy: `http://127.0.0.1:${address.port}`,
        level: "connection",
        levelId: credentials.connectionId,
      },
      log: console,
      clientRawRequest: null,
      credentials,
      apiKeyInfo: null,
      userAgent: "",
      comboName: null,
      comboStrategy: null,
      isCombo: false,
      extendedContext: false,
      comboStepId: null,
      comboExecutionKey: null,
    });

    assert.equal(result.tlsFingerprintUsed, true);
    assert.equal(observedProxy, null);
    assert.equal(observedScope, credentials.connectionId);
  } finally {
    setTlsClientForTest(null);
    if (prior.enable === undefined) delete process.env.ENABLE_TLS_FINGERPRINT;
    else process.env.ENABLE_TLS_FINGERPRINT = prior.enable;
    if (prior.providers === undefined) delete process.env.TLS_FINGERPRINT_PROVIDERS;
    else process.env.TLS_FINGERPRINT_PROVIDERS = prior.providers;
    if (prior.noProxy === undefined) delete process.env.NO_PROXY;
    else process.env.NO_PROXY = prior.noProxy;
    const closed = Promise.withResolvers<void>();
    server.close(() => closed.resolve());
    await closed.promise;
  }
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

test("resolveModelOrError returns model_not_found error for unrecognised bare model names", async () => {
  const result = await resolveModelOrError(
    "completely-unknown-model-xyz",
    { messages: [{ role: "user", content: "hello" }] },
    "/v1/chat/completions"
  );

  assert.ok(result.error);
  assert.equal(result.error.status, 400);
  const json = (await result.error.json()) as ApiErrorJson;
  assert.match(json.error.message, /Unable to determine provider/i);
  assert.match(json.error.message, /completely-unknown-model-xyz/i);
});
