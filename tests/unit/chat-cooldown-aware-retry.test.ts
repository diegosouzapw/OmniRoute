import test from "node:test";
import assert from "node:assert/strict";

import { createChatPipelineHarness } from "../integration/_chatPipelineHarness.ts";

const harness = await createChatPipelineHarness("chat-cooldown-aware-retry");
const auth = await import("../../src/sse/services/auth.ts");
const {
  BaseExecutor,
  buildOpenAIResponse,
  buildRequest,
  handleChat,
  resetStorage,
  seedConnection,
  settingsDb,
} = harness;
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

test.beforeEach(async () => {
  BaseExecutor.RETRY_CONFIG.maxAttempts = originalRetryConfig.maxAttempts;
  BaseExecutor.RETRY_CONFIG.delayMs = 0;
  await resetStorage();
});

test.afterEach(async () => {
  BaseExecutor.RETRY_CONFIG.maxAttempts = originalRetryConfig.maxAttempts;
  BaseExecutor.RETRY_CONFIG.delayMs = originalRetryConfig.delayMs;
  await resetStorage();
});

test.after(async () => {
  await harness.cleanup();
});

test("handleChat waits for a short cooldown and retries once within the configured budget", async () => {
  await seedConnection("openai", {
    apiKey: "sk-openai-cooldown-short",
    rateLimitedUntil: new Date(Date.now() + 350).toISOString(),
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
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "retry after short cooldown" }],
      },
    })
  );
  const elapsedMs = Date.now() - startedAt;
  const body = (await response.json()) as any;

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
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "trigger upstream 429 then recover" }],
      },
    })
  );
  const elapsedMs = Date.now() - startedAt;
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(fetchCalls, 4);
  assert.ok(elapsedMs >= 1900, `expected retry wait after 429, got ${elapsedMs}ms`);
  assert.equal(body.choices[0].message.content, "recovered after live 429");
});

test("handleChat does not wait when the cooldown exceeds maxRetryIntervalSec", async () => {
  await seedConnection("openai", {
    apiKey: "sk-openai-cooldown-long",
    rateLimitedUntil: new Date(Date.now() + 1500).toISOString(),
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
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "do not wait beyond configured interval" }],
      },
    })
  );
  const body = (await response.json()) as any;

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
    (first as any).id,
    429,
    "too many requests",
    "gemini",
    "gemini-2.5-pro"
  );
  await auth.markAccountUnavailable(
    (second as any).id,
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
  const body = (await response.json()) as any;

  assert.equal(fetchCalls, 0);
  assert.equal(response.status, 429);
  assert.equal(body.error.code, "model_cooldown");
  assert.equal(body.error.type, "rate_limit_error");
  assert.equal(body.error.model, "gemini-2.5-pro");
  assert.ok(body.error.reset_seconds >= 1);
  assert.ok(Number(response.headers.get("Retry-After")) >= 1);
});

test("handleChat aborts the pending cooldown wait when the client disconnects", async () => {
  await seedConnection("openai", {
    apiKey: "sk-openai-cooldown-abort",
    rateLimitedUntil: new Date(Date.now() + 250).toISOString(),
    lastError: "abort retry wait",
    errorCode: 429,
  });
  await settingsDb.updateSettings({
    requestRetry: 1,
    maxRetryIntervalSec: 1,
  });

  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    return buildOpenAIResponse("should not run");
  };

  const controller = new AbortController();
  setTimeout(() => controller.abort(), 40);

  const response = await handleChat(
    buildRequestWithSignal(
      {
        model: "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: "abort retry wait" }],
      },
      controller.signal
    )
  );
  const body = (await response.json()) as any;

  assert.equal(fetchCalls, 0);
  assert.equal(response.status, 499);
  assert.equal(body.error.message, "Request aborted");
});
