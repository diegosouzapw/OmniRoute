import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("combo-provider-exhaustion");
const {
  buildClaudeResponse,
  buildRequest,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
  settingsDb,
} = harness;
const providersDb = await import("../../src/lib/db/providers.ts");

function toPlainHeaders(headers: any): Record<string, string> {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, value == null ? "" : String(value)])
  );
}

test.beforeEach(async () => {
  await resetStorage();
});

test.afterEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("fast-skip on quota-exhausted 429: first same-provider target causes remaining same-provider targets to be skipped (#1731)", async () => {
  await seedConnection("openai", {
    apiKey: "sk-openai-quota-exhausted",
  });
  await seedConnection("anthropic", {
    apiKey: "sk-anthropic-quota-exhausted",
  });
  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });

  // Combo with two openai targets and one anthropic
  await combosDb.createCombo({
    name: "quota-exhausted-combo",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    models: [
      "openai/gpt-4o-mini",
      "openai/gpt-3.5-turbo", // Same provider as first target
      "anthropic/claude-3-5-sonnet-20241022",
    ],
  });

  let openaiCalls = 0;
  let anthropicCalls = 0;
  let callSequence: string[] = [];

  globalThis.fetch = async (_url: string, init: any = {}) => {
    const headers = toPlainHeaders(init.headers);
    const authHeader = headers.authorization ?? headers.Authorization;
    const apiKeyHeader = headers["x-api-key"] ?? headers["X-Api-Key"];

    if (authHeader === "Bearer sk-openai-quota-exhausted") {
      openaiCalls += 1;
      callSequence.push("openai");
      // Return quota exhausted on all openai calls
      return new Response(JSON.stringify({ error: { message: "Subscription quota exceeded" } }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (
      apiKeyHeader === "sk-anthropic-quota-exhausted" ||
      authHeader === "Bearer sk-anthropic-quota-exhausted"
    ) {
      anthropicCalls += 1;
      callSequence.push("anthropic");
      return buildClaudeResponse("anthropic fallback success");
    }

    throw new Error(`unexpected upstream headers: ${JSON.stringify(headers)}`);
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "quota-exhausted-combo",
        stream: false,
        messages: [{ role: "user", content: "test quota exhaustion skip" }],
      },
    })
  );

  const body = (await response.json()) as any;

  assert.equal(response.status, 200, "should return 200");
  assert.equal(
    body.choices[0].message.content,
    "anthropic fallback success",
    "should fallback to anthropic"
  );
  // The key assertion: openai should only be called once (not twice for both gpt-4o-mini and gpt-3.5-turbo)
  assert.equal(
    openaiCalls,
    1,
    `openai should be called only once, but was called ${openaiCalls} times. Call sequence: ${callSequence.join(" -> ")}`
  );
  assert.equal(anthropicCalls, 1, "anthropic should be called once");
});

test("fast-skip on credits-exhausted 429: same-provider targets are skipped (#1731)", async () => {
  await seedConnection("openai", {
    apiKey: "sk-openai-credits-exhausted",
  });
  await seedConnection("anthropic", {
    apiKey: "sk-anthropic-credits-exhausted",
  });
  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });

  await combosDb.createCombo({
    name: "credits-exhausted-combo",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    models: ["openai/gpt-4o-mini", "openai/gpt-3.5-turbo", "anthropic/claude-3-5-sonnet-20241022"],
  });

  let openaiCalls = 0;
  let anthropicCalls = 0;

  globalThis.fetch = async (_url: string, init: any = {}) => {
    const headers = toPlainHeaders(init.headers);
    const authHeader = headers.authorization ?? headers.Authorization;
    const apiKeyHeader = headers["x-api-key"] ?? headers["X-Api-Key"];

    if (authHeader === "Bearer sk-openai-credits-exhausted") {
      openaiCalls += 1;
      if (openaiCalls === 1) {
        return new Response(
          JSON.stringify({ error: { message: "You exceeded your current usage quota" } }),
          {
            status: 429,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      throw new Error("Second openai call should have been skipped!");
    }

    if (
      apiKeyHeader === "sk-anthropic-credits-exhausted" ||
      authHeader === "Bearer sk-anthropic-credits-exhausted"
    ) {
      anthropicCalls += 1;
      return buildClaudeResponse("anthropic handled credits exhaustion");
    }

    throw new Error(`unexpected upstream headers: ${JSON.stringify(headers)}`);
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "credits-exhausted-combo",
        stream: false,
        messages: [{ role: "user", content: "test credits exhaustion" }],
      },
    })
  );

  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.choices[0].message.content, "anthropic handled credits exhaustion");
  assert.equal(openaiCalls, 1, "openai should only be attempted once");
  assert.equal(anthropicCalls, 1, "anthropic should be attempted once");
});

test("no skip on transient 429: plain rate-limit does not skip same-provider targets (#1731)", async () => {
  await seedConnection("openai", {
    apiKey: "sk-openai-transient-429",
  });
  await seedConnection("anthropic", {
    apiKey: "sk-anthropic-transient-429",
  });
  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });

  await combosDb.createCombo({
    name: "transient-429-combo",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    models: ["openai/gpt-4o-mini", "openai/gpt-3.5-turbo", "anthropic/claude-3-5-sonnet-20241022"],
  });

  let openaiCalls = 0;
  let anthropicCalls = 0;

  globalThis.fetch = async (_url: string, init: any = {}) => {
    const headers = toPlainHeaders(init.headers);
    const authHeader = headers.authorization ?? headers.Authorization;
    const apiKeyHeader = headers["x-api-key"] ?? headers["X-Api-Key"];

    if (authHeader === "Bearer sk-openai-transient-429") {
      openaiCalls += 1;
      // Return plain 429 without quota exhaustion signals
      return new Response(JSON.stringify({ error: { message: "Too many requests" } }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (
      apiKeyHeader === "sk-anthropic-transient-429" ||
      authHeader === "Bearer sk-anthropic-transient-429"
    ) {
      anthropicCalls += 1;
      return buildClaudeResponse("anthropic recovered from transient 429");
    }

    throw new Error(`unexpected upstream headers: ${JSON.stringify(headers)}`);
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "transient-429-combo",
        stream: false,
        messages: [{ role: "user", content: "test transient 429" }],
      },
    })
  );

  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.choices[0].message.content, "anthropic recovered from transient 429");
  // Transient 429 should still try both openai targets (retries), then move to anthropic
  assert.ok(openaiCalls >= 2, "openai should be attempted multiple times for transient 429");
  assert.equal(anthropicCalls, 1);
});

test("cross-provider not affected: different providers both return 429, both are still attempted (#1731)", async () => {
  await seedConnection("openai", {
    apiKey: "sk-openai-cross-provider",
  });
  await seedConnection("anthropic", {
    apiKey: "sk-anthropic-cross-provider",
  });
  await seedConnection("claude", {
    apiKey: "sk-claude-cross-provider",
  });
  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });

  await combosDb.createCombo({
    name: "cross-provider-combo",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    models: [
      "openai/gpt-4o-mini",
      "anthropic/claude-3-5-sonnet-20241022",
      "claude/claude-3-5-sonnet-20241022",
    ],
  });

  let openaiCalls = 0;
  let anthropicCalls = 0;
  let claudeCalls = 0;

  globalThis.fetch = async (_url: string, init: any = {}) => {
    const headers = toPlainHeaders(init.headers);
    const authHeader = headers.authorization ?? headers.Authorization;
    const apiKeyHeader = headers["x-api-key"] ?? headers["X-Api-Key"];

    if (authHeader === "Bearer sk-openai-cross-provider") {
      openaiCalls += 1;
      return new Response(JSON.stringify({ error: { message: "Rate limited" } }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (
      apiKeyHeader === "sk-anthropic-cross-provider" ||
      authHeader === "Bearer sk-anthropic-cross-provider"
    ) {
      anthropicCalls += 1;
      return new Response(JSON.stringify({ error: { message: "Rate limited" } }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (
      apiKeyHeader === "sk-claude-cross-provider" ||
      authHeader === "Bearer sk-claude-cross-provider"
    ) {
      claudeCalls += 1;
      return buildClaudeResponse("claude succeeded after other providers failed");
    }

    throw new Error(`unexpected upstream headers: ${JSON.stringify(headers)}`);
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "cross-provider-combo",
        stream: false,
        messages: [{ role: "user", content: "test cross provider" }],
      },
    })
  );

  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.choices[0].message.content, "claude succeeded after other providers failed");
  // Each different provider should be attempted
  assert.equal(openaiCalls, 1);
  assert.equal(anthropicCalls, 1);
  assert.equal(claudeCalls, 1);
});

test("exhaustion does not persist across requests: second request starts fresh (#1731)", async () => {
  // The fast-skip exhaustion sets are request-scoped. The connection-level
  // cooldown written by the first 429 is a separate, legitimate layer — clear
  // it between requests so this test only observes the request-scoped state.
  const openaiConn = (await seedConnection("openai", {
    apiKey: "sk-openai-persistence-test",
  })) as any;
  await seedConnection("anthropic", {
    apiKey: "sk-anthropic-persistence-test",
  });
  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });

  await combosDb.createCombo({
    name: "persistence-test-combo",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    models: ["openai/gpt-4o-mini", "openai/gpt-3.5-turbo", "anthropic/claude-3-5-sonnet-20241022"],
  });

  let requestCount = 0;
  let openaiCalls = 0;
  let anthropicCalls = 0;

  globalThis.fetch = async (_url: string, init: any = {}) => {
    const headers = toPlainHeaders(init.headers);
    const authHeader = headers.authorization ?? headers.Authorization;
    const apiKeyHeader = headers["x-api-key"] ?? headers["X-Api-Key"];

    if (authHeader === "Bearer sk-openai-persistence-test") {
      openaiCalls += 1;
      // First request: openai fails with quota exhaustion
      if (requestCount === 0) {
        return new Response(JSON.stringify({ error: { message: "Subscription quota exceeded" } }), {
          status: 429,
          headers: { "Content-Type": "application/json" },
        });
      }
      // Second request: openai succeeds
      return new Response(JSON.stringify({ choices: [{ message: { content: "openai ok" } }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (
      apiKeyHeader === "sk-anthropic-persistence-test" ||
      authHeader === "Bearer sk-anthropic-persistence-test"
    ) {
      anthropicCalls += 1;
      return buildClaudeResponse("anthropic handled first request");
    }

    throw new Error(`unexpected upstream headers: ${JSON.stringify(headers)}`);
  };

  // First request: openai exhausted -> anthropic succeeds
  requestCount = 0;
  const response1 = await handleChat(
    buildRequest({
      body: {
        model: "persistence-test-combo",
        stream: false,
        messages: [{ role: "user", content: "first request" }],
      },
    })
  );

  const body1 = (await response1.json()) as any;
  assert.equal(response1.status, 200);
  assert.equal(body1.choices[0].message.content, "anthropic handled first request");
  assert.equal(openaiCalls, 1, "first request: openai called once");
  assert.equal(anthropicCalls, 1, "first request: anthropic called once");

  // Clear the connection-level cooldown left by the first 429 — we are testing
  // the request-scoped exhaustion sets, not the (persistent-by-design) cooldown.
  await providersDb.updateProviderConnection(openaiConn.id, {
    rateLimitedUntil: null,
    testStatus: "active",
    lastError: null,
    lastErrorType: null,
    errorCode: null,
    backoffLevel: 0,
  });

  // Second request: exhaustedProviders should be reset, openai should be tried again
  requestCount = 1;
  const response2 = await handleChat(
    buildRequest({
      body: {
        model: "persistence-test-combo",
        stream: false,
        messages: [{ role: "user", content: "second request" }],
      },
    })
  );

  const body2 = (await response2.json()) as any;
  assert.equal(response2.status, 200);
  assert.equal(body2.choices[0].message.content, "openai ok", "second request should try openai");
  assert.equal(openaiCalls, 2, "second request: openai should be called again");
  assert.equal(anthropicCalls, 1, "second request: anthropic should not be called");
});

test("round-robin path fast-skip: round-robin combo also skips exhausted provider targets (#1731)", async () => {
  await seedConnection("openai", {
    apiKey: "sk-openai-rr-exhaustion",
  });
  await seedConnection("anthropic", {
    apiKey: "sk-anthropic-rr-exhaustion",
  });
  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });

  await combosDb.createCombo({
    name: "rr-exhaustion-combo",
    strategy: "round-robin",
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    models: ["openai/gpt-4o-mini", "openai/gpt-3.5-turbo", "anthropic/claude-3-5-sonnet-20241022"],
  });

  let openaiCalls = 0;
  let anthropicCalls = 0;

  globalThis.fetch = async (_url: string, init: any = {}) => {
    const headers = toPlainHeaders(init.headers);
    const authHeader = headers.authorization ?? headers.Authorization;
    const apiKeyHeader = headers["x-api-key"] ?? headers["X-Api-Key"];

    if (authHeader === "Bearer sk-openai-rr-exhaustion") {
      openaiCalls += 1;
      if (openaiCalls === 1) {
        return new Response(JSON.stringify({ error: { message: "Daily quota exceeded" } }), {
          status: 429,
          headers: { "Content-Type": "application/json" },
        });
      }
      throw new Error("Second openai call should have been skipped!");
    }

    if (
      apiKeyHeader === "sk-anthropic-rr-exhaustion" ||
      authHeader === "Bearer sk-anthropic-rr-exhaustion"
    ) {
      anthropicCalls += 1;
      return buildClaudeResponse("anthropic handled round-robin exhaustion");
    }

    throw new Error(`unexpected upstream headers: ${JSON.stringify(headers)}`);
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "rr-exhaustion-combo",
        stream: false,
        messages: [{ role: "user", content: "test round-robin exhaustion" }],
      },
    })
  );

  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.choices[0].message.content, "anthropic handled round-robin exhaustion");
  assert.equal(openaiCalls, 1, "round-robin should skip second openai target");
  assert.equal(anthropicCalls, 1);
});

test("allow rate-limited connections after transient 429 on subsequent targets in same combo", async () => {
  const now = Date.now();
  await seedConnection("openai", {
    name: "openai-rate-limited-reused",
    apiKey: "sk-openai-rate-limited-reused",
    rateLimitedUntil: new Date(now + 60000).toISOString(),
  });

  await seedConnection("openai", {
    name: "openai-fresh-429",
    apiKey: "sk-openai-fresh-429",
  });

  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });

  await combosDb.createCombo({
    name: "rate-limit-reuse-combo",
    strategy: "priority",
    config: { maxRetries: 0, retryDelayMs: 0, fallbackDelayMs: 0 },
    models: [
      "openai/gpt-4o-mini",
      "openai/gpt-3.5-turbo",
    ],
  });

  let openaiCalls = 0;
  let usedApiKeys: string[] = [];

  globalThis.fetch = async (_url: string, init: any = {}) => {
    const headers = toPlainHeaders(init.headers);
    const authHeader = headers.authorization ?? headers.Authorization;

    openaiCalls += 1;
    if (authHeader === "Bearer sk-openai-fresh-429") {
      usedApiKeys.push("fresh");
      return new Response(JSON.stringify({ error: { message: "Too many requests" } }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (authHeader === "Bearer sk-openai-rate-limited-reused") {
      usedApiKeys.push("rate-limited");
      return new Response(
        JSON.stringify({ choices: [{ message: { content: "rate limited reuse success" } }] }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    throw new Error(`unexpected upstream headers: ${JSON.stringify(headers)}`);
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "rate-limit-reuse-combo",
        stream: false,
        messages: [{ role: "user", content: "test rate limit reuse" }],
      },
    })
  );

  const body = (await response.json()) as any;
  assert.equal(response.status, 200);
  assert.equal(body.choices[0].message.content, "rate limited reuse success");
  assert.equal(openaiCalls, 2);
  assert.deepEqual(usedApiKeys, ["fresh", "rate-limited"]);
});

test("emergency fallback never sends the failing provider's credentials to another provider's endpoint", async () => {
  // Single-model request (no combo). On a quota/billing 429 the emergency
  // fallback redirects to nvidia/openai/gpt-oss-120b. The hop must go through
  // credential selection for the EMERGENCY provider — it must never re-send
  // the exhausted provider's API key to a different provider's URL (the old
  // executor-level hop shipped the OpenAI key to integrate.api.nvidia.com).
  await seedConnection("openai", {
    apiKey: "sk-openai-emergency-leak-guard",
  });
  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });

  const originalRetryDelay = harness.BaseExecutor.RETRY_CONFIG.delayMs;
  harness.BaseExecutor.RETRY_CONFIG.delayMs = 0;

  const upstreamCalls: Array<{ host: string; usedOpenAIKey: boolean }> = [];

  globalThis.fetch = async (url: any, init: any = {}) => {
    const headers = toPlainHeaders(init.headers);
    const authHeader = headers.authorization ?? headers.Authorization;
    const host = new URL(typeof url === "string" ? url : String(url)).host;
    const usedOpenAIKey = authHeader === "Bearer sk-openai-emergency-leak-guard";
    upstreamCalls.push({ host, usedOpenAIKey });

    if (usedOpenAIKey) {
      return new Response(JSON.stringify({ error: { message: "Subscription quota exceeded" } }), {
        status: 429,
        headers: { "Content-Type": "application/json" },
      });
    }

    throw new Error(`unexpected upstream headers: ${JSON.stringify(headers)}`);
  };

  try {
    const response = await handleChat(
      buildRequest({
        body: {
          model: "openai/gpt-4o-mini",
          stream: false,
          messages: [{ role: "user", content: "test emergency credential leak guard" }],
        },
      })
    );

    assert.notEqual(response.status, 200, "request should fail (no fallback available)");
  } finally {
    harness.BaseExecutor.RETRY_CONFIG.delayMs = originalRetryDelay;
  }

  const leaks = upstreamCalls.filter(
    (call) => call.usedOpenAIKey && !call.host.includes("openai.com")
  );
  assert.deepEqual(
    leaks,
    [],
    `the OpenAI key must never be sent to a non-OpenAI host: ${JSON.stringify(upstreamCalls)}`
  );
  assert.ok(
    upstreamCalls.every((call) => call.usedOpenAIKey),
    `no unauthenticated emergency call should reach upstream either: ${JSON.stringify(upstreamCalls)}`
  );
});

