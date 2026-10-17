import test from "node:test";
import assert from "node:assert/strict";
import pino from "pino";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

process.env.STREAM_IDLE_TIMEOUT_MS = "50";
process.env.STREAM_READINESS_TIMEOUT_MS = "50";

const harness = await createChatPipelineHarness("chat-cooldown-aware-retry");
const auth = await import("../../src/sse/services/auth.ts");
const { getProviderConnectionById, updateProviderConnection } =
  await import("../../src/lib/db/providers.ts");
const { getCooldownAwareRetryDecision } =
  await import("../../src/sse/services/cooldownAwareRetry.ts");
const { logger: rootLogger } = await import("../../src/shared/utils/logger.ts");
const { __setTlsFetchOverrideForTesting } =
  await import("../../open-sse/services/claudeTlsClient.ts");
const {
  BaseExecutor,
  buildOpenAIResponse,
  buildRequest,
  handleChat,
  resetStorage,
  seedConnection,
  settingsDb,
} = harness;
const textEncoder = new TextEncoder();
const originalRetryConfig = {
  maxAttempts: BaseExecutor.RETRY_CONFIG.maxAttempts,
  delayMs: BaseExecutor.RETRY_CONFIG.delayMs,
};

function buildRequestWithSignal(body, signal) {
  return new Request("http://localhost/v1/chat/completions", {
    method: "POST",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}

function buildZombieSseResponse() {
  return new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(textEncoder.encode(": keepalive\n\n"));
        controller.enqueue(textEncoder.encode(`data: ${JSON.stringify({ type: "ping" })}\n\n`));
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }
  );
}

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.maxAttempts = originalRetryConfig.maxAttempts;
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});

test.afterEach(async () => {
  __setTlsFetchOverrideForTesting(null);
  BaseExecutor.RETRY_CONFIG.maxAttempts = originalRetryConfig.maxAttempts;
  BaseExecutor.RETRY_CONFIG.delayMs = originalRetryConfig.delayMs;
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("handleChat does not probe Claude Web repeatedly after an upstream 429", async () => {
  await seedConnection("claude-web", {
    apiKey: "sessionKey=fake-session",
  });
  await settingsDb.updateSettings({
    requestRetry: 3,
    maxRetryIntervalSec: 3,
  });

  let completionCalls = 0;
  __setTlsFetchOverrideForTesting(async (url) => {
    if (url.endsWith("/organizations")) {
      return {
        status: 200,
        headers: new Headers({ "Content-Type": "application/json" }),
        text: JSON.stringify([{ uuid: "org-test" }]),
        body: null,
      };
    }

    completionCalls += 1;
    return {
      status: 429,
      headers: new Headers({ "Content-Type": "application/json" }),
      text: JSON.stringify({ error: { message: "Rate limited." } }),
      body: null,
    };
  });

  const response = await handleChat(
    buildRequest({
      body: {
        model: "claude-web/claude-opus-5",
        stream: false,
        messages: [{ role: "user", content: "do not retry a Claude Web 429" }],
      },
    })
  );

  assert.equal(response.status, 429);
  assert.equal(completionCalls, 1);
});

test("handleChat waits for a short cooldown and retries once within the configured budget", async () => {
  await seedConnection("openai", {
    apiKey: "sk-openai-cooldown-short",
    rateLimitedUntil: new Date(Date.now() + 950).toISOString(),
    lastError: "short cooldown window",
    errorCode: 429,
  });
  await settingsDb.updateSettings({
    requestRetry: 1,
    maxRetryIntervalSec: 1,
  });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return buildOpenAIResponse("recovered after cooldown");
  };

  const startedAt = Date.now();
  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "retry after short cooldown" }],
      },
    })
  );
  const elapsedMs = Date.now() - startedAt;
  const body = (await response.json()) as unknown as {
    choices: Array<{ message: { content: string } }>;
    error: { message: string };
  };

  assert.equal(response.status, 200);
  assert.equal(fetchCalls, 1);
  assert.ok(elapsedMs >= 250, `expected cooldown-aware retry wait, got ${elapsedMs}ms`);
  assert.equal(body.choices[0].message.content, "recovered after cooldown");
});

test("handleChat recovers from a real 429 once the connection cooldown expires", async () => {
  await seedConnection("openai", {
    apiKey: "sk-openai-live-429",
  });
  await settingsDb.updateSettings({
    requestRetry: 1,
    maxRetryIntervalSec: 3,
  });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    if (fetchCalls <= 3) {
      return new Response(
        JSON.stringify({
          error: {
            message: "Rate limit exceeded.",
          },
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "2",
          },
        }
      );
    }

    return buildOpenAIResponse("recovered after live 429");
  };

  const startedAt = Date.now();
  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "trigger upstream 429 then recover" }],
      },
    })
  );
  const elapsedMs = Date.now() - startedAt;
  const body = (await response.json()) as unknown as {
    choices: Array<{ message: { content: string } }>;
    error: { message: string };
  };

  assert.equal(response.status, 200);
  assert.equal(fetchCalls, 4);
  assert.ok(elapsedMs >= 1900, `expected retry wait after 429, got ${elapsedMs}ms`);
  assert.equal(body.choices[0].message.content, "recovered after live 429");
});

test("handleChat does not wait when the cooldown exceeds maxRetryIntervalSec", async () => {
  await seedConnection("openai", {
    apiKey: "sk-openai-cooldown-long",
    rateLimitedUntil: new Date(Date.now() + 100000).toISOString(),
    lastError: "cooldown too long",
    errorCode: 429,
  });
  await settingsDb.updateSettings({
    requestRetry: 2,
    maxRetryIntervalSec: 1,
  });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return buildOpenAIResponse("should not be called");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "do not wait beyond configured interval" }],
      },
    })
  );
  const body = (await response.json()) as unknown as {
    choices: Array<{ message: { content: string } }>;
    error: { message: string };
  };

  assert.equal(fetchCalls, 0);
  assert.equal(response.status, 503);
  assert.match(body.error.message, /unavailable/i);
  assert.match(body.error.message, /reset after/i);
});

test("handleChat returns model_cooldown when every credential for the requested model is locked", async () => {
  const first = await seedConnection("gemini", {
    apiKey: "gemini-model-lock-first",
  });
  const second = await seedConnection("gemini", {
    apiKey: "gemini-model-lock-second",
  });
  await settingsDb.updateSettings({
    requestRetry: 0,
    maxRetryIntervalSec: 0,
  });

  await auth.markAccountUnavailable(
    (first as unknown as { id: string }).id,
    429,
    "too many requests",
    "gemini",
    "gemini-2.5-pro"
  );
  await auth.markAccountUnavailable(
    (second as unknown as { id: string }).id,
    429,
    "too many requests",
    "gemini",
    "gemini-2.5-pro"
  );

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return buildOpenAIResponse("should not be called");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "gemini/gemini-2.5-pro",
        stream: false,
        messages: [{ role: "user", content: "model cooldown response" }],
      },
    })
  );
  const body = (await response.json()) as unknown as {
    choices: Array<{ message: { content: string } }>;
    error: { message: string };
  };

  assert.equal(fetchCalls, 0);
  assert.equal(response.status, 429);
  assert.equal(body.error.code, "model_cooldown");
  assert.equal(body.error.type, "rate_limit_error");
  assert.equal(body.error.model, "gemini-2.5-pro");
  assert.ok(body.error.reset_seconds >= 1);
  assert.ok(Number(response.headers.get("Retry-After")) >= 1);
});

test("handleChat retries a direct stream readiness timeout once, without cooldown-aware retry or account lockout", async () => {
  const connection = await seedConnection("openai", {
    apiKey: "sk-openai-stream-readiness-timeout",
  });
  await settingsDb.updateSettings({
    requestRetry: 1,
    maxRetryIntervalSec: 10,
  });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return buildZombieSseResponse();
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4.1",
        stream: true,
        messages: [{ role: "user", content: "trigger zombie stream" }],
      },
    })
  );
  const body = (await response.json()) as unknown as {
    choices: Array<{ message: { content: string } }>;
    error: { message: string };
  };

  assert.equal(response.status, 504);
  // #14209 (issue #14025): a direct (non-combo, non-forced, still-connected) request gets ONE
  // bounded same-target retry of a readiness timeout before the 504 — so exactly two upstream
  // calls, and still no cooldown-aware retry loop or account lockout.
  assert.equal(fetchCalls, 2);
  assert.equal(body.error.code, "STREAM_READINESS_TIMEOUT");

  const refreshedConnection = (await getProviderConnectionById(
    (connection as unknown as { id: string }).id
  )) as unknown as Record<string, unknown>;
  assert.equal(refreshedConnection.testStatus, "active");
  assert.ok(refreshedConnection.rateLimitedUntil == null);
  assert.ok(refreshedConnection.errorCode == null);
  assert.equal(refreshedConnection.backoffLevel, 0);
});

test("handleChat aborts the pending cooldown wait when the client disconnects", async () => {
  await seedConnection("openai", {
    apiKey: "sk-openai-cooldown-abort",
    rateLimitedUntil: new Date(Date.now() + 5_000).toISOString(),
    lastError: "abort retry wait",
    errorCode: 429,
  });
  await settingsDb.updateSettings({
    requestRetry: 1,
    maxRetryIntervalSec: 10,
  });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return buildOpenAIResponse("should not run");
  };

  const controller = new AbortController();
  setTimeout(() => controller.abort(), 40);

  const startedAt = Date.now();
  const response = await handleChat(
    buildRequestWithSignal(
      {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "abort retry wait" }],
      },
      controller.signal
    )
  );
  const elapsedMs = Date.now() - startedAt;
  const body = (await response.json()) as unknown as {
    choices: Array<{ message: { content: string } }>;
    error: { message: string };
  };

  assert.equal(fetchCalls, 0);
  assert.ok(elapsedMs < 1_000, `should abort cooldown wait promptly, got ${elapsedMs}ms`);
  assert.equal(response.status, 499);
  assert.equal(body.error.message, "Request aborted");
});

test("#15789: requestRetry=3 dispatches upstream exactly 4 times and never logs a retry above its max", async () => {
  BaseExecutor.RETRY_CONFIG.maxAttempts = 0;
  await seedConnection("openai", {
    apiKey: "sk-openai-cooldown-retry-bounds",
  });
  await settingsDb.updateSettings({
    requestRetry: 3,
    maxRetryIntervalSec: 3,
  });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return new Response(JSON.stringify({ error: { message: "Rate limit exceeded." } }), {
      status: 429,
      headers: { "Content-Type": "application/json", "Retry-After": "1" },
    });
  };

  const stream = rootLogger[pino.symbols.streamSym];
  const originalWrite = stream.write;
  const cooldownLines: string[] = [];
  stream.write = function (chunk: unknown, ...rest: unknown[]) {
    const line = String(chunk);
    if (line.includes("COOLDOWN_RETRY")) cooldownLines.push(line);
    return originalWrite.call(this, chunk, ...rest);
  };

  try {
    const response = await handleChat(
      buildRequest({
        body: {
          model: "openai/gpt-4.1",
          stream: false,
          messages: [{ role: "user", content: "keep hitting 429 until retries run out" }],
        },
      })
    );
    await response.text();
    assert.notEqual(response.status, 200);
  } finally {
    stream.write = originalWrite;
  }

  assert.equal(fetchCalls, 4, "maxRetries=3 means one initial dispatch plus three retries");

  const counters = cooldownLines.flatMap((line) =>
    [...line.matchAll(/(?:retry|attempt) (\d+)\/(\d+)/g)].map((m) => [Number(m[1]), Number(m[2])])
  );
  assert.ok(counters.length >= 6, `expected wait + restart log lines, got ${cooldownLines.length}`);
  for (const [n, max] of counters) {
    assert.equal(max, 3);
    assert.ok(n >= 1 && n <= max, `logged ${n}/${max} is out of bounds`);
  }
});

test("handleChat returns a persistent 403 without waiting or retrying once every account cools down", async () => {
  const connection = await seedConnection("glm", {
    name: "glm-refused",
    apiKey: "sk-glm-refused",
  });
  await updateProviderConnection((connection as unknown as { id: string }).id, {
    rateLimitedUntil: new Date(Date.now() + 1_500).toISOString(),
    lastError: "forbidden",
    errorCode: 403,
    testStatus: "unavailable",
  });
  await settingsDb.updateSettings({ requestRetry: 3, maxRetryIntervalSec: 3 });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return buildOpenAIResponse("must not be dispatched");
  };

  const startedAt = Date.now();
  const response = await handleChat(
    buildRequest({
      body: {
        model: "glm/glm-5.1",
        stream: false,
        messages: [{ role: "user", content: "refused on every account" }],
      },
    })
  );
  const elapsedMs = Date.now() - startedAt;

  assert.equal(fetchCalls, 0);
  assert.equal(response.status, 403);
  assert.ok(
    elapsedMs < 1_000,
    `persistent refusal must not wait out the cooldown, got ${elapsedMs}ms`
  );
});

test("handleChat returns a persistent 410 without waiting or retrying once every account cools down", async () => {
  const connection = await seedConnection("openai", {
    name: "openai-retired",
    apiKey: "sk-openai-retired",
  });
  await updateProviderConnection((connection as unknown as { id: string }).id, {
    rateLimitedUntil: new Date(Date.now() + 1_500).toISOString(),
    lastError: "model has reached its end of life and is no longer available",
    errorCode: 410,
    testStatus: "unavailable",
  });
  await settingsDb.updateSettings({ requestRetry: 3, maxRetryIntervalSec: 3 });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return buildOpenAIResponse("must not be dispatched");
  };

  const startedAt = Date.now();
  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "retired model on every account" }],
      },
    })
  );
  const elapsedMs = Date.now() - startedAt;

  assert.equal(fetchCalls, 0);
  assert.equal(response.status, 410);
  assert.ok(elapsedMs < 1_000, `retired model must not wait out the cooldown, got ${elapsedMs}ms`);
});

test("a persistent 403 or 410 skips the cooldown wait while a 429 stays retryable", async () => {
  const settings = {
    enabled: true,
    maxRetries: 3,
    maxRetryWaitSec: 3,
    maxRetryWaitMs: 3_000,
    budgetMs: 300_000,
  };
  const retryAfter = new Date(Date.now() + 1_500).toISOString();
  const decide = (lastErrorCode: unknown) =>
    getCooldownAwareRetryDecision({ retryAfter, settings, attempt: 0, lastErrorCode }).shouldRetry;

  assert.equal(decide(403), false);
  assert.equal(decide(410), false);
  assert.equal(decide(401), false);
  assert.equal(decide(429), true);
});

test("a connection-scoped agentrouter quota 403 persists as 429 and stays retryable", async () => {
  const connection = await seedConnection("agentrouter", { apiKey: "sk-agentrouter-quota" });

  const result = await auth.markAccountUnavailable(
    (connection as unknown as { id: string }).id,
    403,
    '{"error":{"message":"账户额度不足，请充值后重试"}}',
    "agentrouter",
    "claude-opus-5"
  );

  assert.equal(result.shouldFallback, true);
  assert.ok(result.cooldownMs > 0);

  const updated = (await getProviderConnectionById(
    (connection as unknown as { id: string }).id
  )) as unknown as Record<string, unknown>;
  assert.equal(Number(updated.errorCode), 429);

  const settings = {
    enabled: true,
    maxRetries: 3,
    maxRetryWaitSec: 10,
    maxRetryWaitMs: 10_000,
    budgetMs: 300_000,
  };
  const retryAfter = new Date(Date.now() + 1_500).toISOString();
  assert.equal(
    getCooldownAwareRetryDecision({ retryAfter, settings, attempt: 0, lastErrorCode: 429 })
      .shouldRetry,
    true
  );
});

test("a generic apikey 403 keeps its 403 error code and skips the cooldown wait", async () => {
  const connection = await seedConnection("glm", { apiKey: "sk-glm-generic-403" });

  const result = await auth.markAccountUnavailable(
    (connection as unknown as { id: string }).id,
    403,
    "forbidden",
    "glm",
    "glm-5.1"
  );

  assert.equal(result.shouldFallback, true);

  const updated = (await getProviderConnectionById(
    (connection as unknown as { id: string }).id
  )) as unknown as Record<string, unknown>;
  assert.equal(Number(updated.errorCode), 403);

  const settings = {
    enabled: true,
    maxRetries: 3,
    maxRetryWaitSec: 10,
    maxRetryWaitMs: 10_000,
    budgetMs: 300_000,
  };
  const retryAfter = new Date(Date.now() + 1_500).toISOString();
  assert.equal(
    getCooldownAwareRetryDecision({ retryAfter, settings, attempt: 0, lastErrorCode: 403 })
      .shouldRetry,
    false
  );
});

test("handleChat still retries after a short cooldown when the earliest cooldown is a 429", async () => {
  const first = await seedConnection("openai", {
    name: "openai-mixed-first",
    apiKey: "sk-openai-mixed-first",
  });
  const second = await seedConnection("openai", {
    name: "openai-mixed-second",
    apiKey: "sk-openai-mixed-second",
  });
  await updateProviderConnection((first as unknown as { id: string }).id, {
    rateLimitedUntil: new Date(Date.now() + 900).toISOString(),
    lastError: "short quota window",
    errorCode: 429,
    testStatus: "unavailable",
  });
  await updateProviderConnection((second as unknown as { id: string }).id, {
    rateLimitedUntil: new Date(Date.now() + 60_000).toISOString(),
    lastError: "forbidden",
    errorCode: 403,
    testStatus: "unavailable",
  });
  await settingsDb.updateSettings({ requestRetry: 1, maxRetryIntervalSec: 3 });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return buildOpenAIResponse("recovered after mixed cooldown");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: "openai/gpt-4.1",
        stream: false,
        messages: [{ role: "user", content: "mixed cooldown, earliest is retryable" }],
      },
    })
  );
  const body = (await response.json()) as unknown as {
    choices: Array<{ message: { content: string } }>;
    error: { message: string };
  };

  assert.equal(response.status, 200);
  assert.equal(fetchCalls, 1);
  assert.equal(body.choices[0].message.content, "recovered after mixed cooldown");
});

test("a 403 model-scoped refusal keeps the connection usable for other models", async () => {
  const { isModelLocked } = await import("../../open-sse/services/accountFallback.ts");
  const connection = await seedConnection("agentrouter", { apiKey: "sk-agentrouter-model" });

  const result = await auth.markAccountUnavailable(
    (connection as unknown as { id: string }).id,
    403,
    '{"error":{"message":"无权访问模型 claude-opus-5"}}',
    "agentrouter",
    "claude-opus-5"
  );

  assert.equal(result.shouldFallback, true);

  const updated = (await getProviderConnectionById(
    (connection as unknown as { id: string }).id
  )) as unknown as Record<string, unknown>;
  assert.ok(!updated.rateLimitedUntil, "a model-scoped refusal must not cool the connection");
  assert.equal(
    isModelLocked("agentrouter", (connection as unknown as { id: string }).id, "claude-opus-5"),
    true
  );
});
