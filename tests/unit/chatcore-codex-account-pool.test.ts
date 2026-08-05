// @ts-nocheck
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-chatcore-codex-pool-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");

const originalFetch = globalThis.fetch;

function noopLog() {
  return {
    debug() {},
    info() {},
    warn() {},
    error() {},
  };
}

function toPlainHeaders(headers) {
  if (!headers) return {};
  if (headers instanceof Headers) return Object.fromEntries(headers.entries());
  return Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [key, value == null ? "" : String(value)])
  );
}

function buildResponsesResponse(text = "ok") {
  return new Response(
    JSON.stringify({
      id: "resp_123",
      object: "response",
      status: "completed",
      model: "gpt-5.1-codex",
      output: [
        {
          id: "msg_123",
          type: "message",
          role: "assistant",
          content: [{ type: "output_text", text, annotations: [] }],
        },
      ],
      usage: {
        input_tokens: 4,
        output_tokens: 2,
        total_tokens: 6,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function waitForAsyncSideEffects() {
  await new Promise((resolve) => setImmediate(resolve));
  await new Promise((resolve) => setTimeout(resolve, 10));
}

async function invokeChatCore({
  body,
  provider = "codex",
  model,
  endpoint = "/v1/responses",
  credentials,
  responseFactory,
  connectionId = null,
  isCombo = false,
}: {
  body: unknown;
  provider?: string;
  model: string;
  endpoint?: string;
  credentials: Record<string, unknown>;
  responseFactory: (captured: unknown, calls: unknown[]) => Response;
  connectionId?: string | null;
  isCombo?: boolean;
}) {
  const calls: unknown[] = [];
  globalThis.fetch = async (url, init = {}) => {
    const headers = toPlainHeaders(init.headers);
    const captured = {
      url: String(url),
      method: init.method || "GET",
      headers,
      body: init.body ? JSON.parse(String(init.body)) : null,
    };
    calls.push(captured);
    return responseFactory(captured, calls);
  };

  try {
    const result = await handleChatCore({
      body: structuredClone(body),
      modelInfo: { provider, model, extendedContext: false },
      credentials,
      log: noopLog(),
      clientRawRequest: {
        endpoint,
        body: structuredClone(body),
        headers: new Headers({ accept: "application/json" }),
      },
      connectionId,
      userAgent: "unit-test",
      isCombo,
    });
    await waitForAsyncSideEffects();
    return { calls, result };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.afterEach(async () => {
  globalThis.fetch = originalFetch;
  await waitForAsyncSideEffects();
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  await waitForAsyncSideEffects();
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("chatCore persists child cooldown for each rotated Codex attempt", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "codex-rotation-first@example.com",
    accessToken: "codex-rotation-first",
    isActive: true,
    providerSpecificData: {},
  });
  const second = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "codex-rotation-second@example.com",
    accessToken: "codex-rotation-second",
    isActive: true,
    providerSpecificData: {},
  });
  const liveCredentials = {
    accessToken: "codex-rotation-first",
    connectionId: first.id,
    providerSpecificData: {},
  };

  const { result } = await invokeChatCore({
    provider: "codex",
    model: "gpt-5.3-codex-spark",
    endpoint: "/v1/responses",
    connectionId: first.id,
    credentials: liveCredentials,
    body: {
      model: "gpt-5.3-codex-spark",
      input: "rotate twice",
      stream: false,
    },
    responseFactory() {
      return new Response(
        JSON.stringify({ error: { message: "The usage limit has been reached" } }),
        { status: 429, headers: { "Content-Type": "application/json", "Retry-After": "60" } }
      );
    },
  });
  const firstPersisted = await providersDb.getProviderConnectionById(first.id);
  const secondPersisted = await providersDb.getProviderConnectionById(second.id);

  assert.equal(result.success, false);
  assert.equal(result.status, 429);
  assert.equal(
    typeof firstPersisted.providerSpecificData.codexScopeRateLimitedUntil.spark,
    "string"
  );
  assert.equal(
    typeof secondPersisted.providerSpecificData.codexScopeRateLimitedUntil.spark,
    "string"
  );
  assert.equal(liveCredentials.connectionId, second.id);
});

test("chatCore retains exact quota resets from intermediate rotated Codex 429s", async () => {
  const first = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "codex-exact-reset-first@example.com",
    accessToken: "codex-exact-reset-first",
    isActive: true,
    providerSpecificData: {},
  });
  await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "codex-exact-reset-second@example.com",
    accessToken: "codex-exact-reset-second",
    isActive: true,
    providerSpecificData: {},
  });
  const exactReset = new Date(Date.now() + 300_000).toISOString();
  const weeklyReset = new Date(Date.now() + 3_600_000).toISOString();
  const { result } = await invokeChatCore({
    provider: "codex",
    model: "gpt-5.3-codex-spark",
    endpoint: "/v1/responses",
    connectionId: first.id,
    isCombo: true,
    credentials: {
      accessToken: "codex-exact-reset-first",
      connectionId: first.id,
      providerSpecificData: {},
    },
    body: {
      model: "gpt-5.3-codex-spark",
      input: "persist exact reset before rotation",
      stream: false,
    },
    responseFactory(_captured: unknown, calls: unknown[]) {
      if (calls.length < 4) {
        return new Response(JSON.stringify({ error: { message: "Codex quota exceeded" } }), {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
            "x-codex-5h-usage": "100",
            "x-codex-5h-limit": "100",
            "x-codex-5h-reset-at": exactReset,
            "x-codex-7d-usage": "10",
            "x-codex-7d-limit": "100",
            "x-codex-7d-reset-at": weeklyReset,
          },
        });
      }
      return buildResponsesResponse("rotated account succeeded");
    },
  });
  const persisted = await providersDb.getProviderConnectionById(first.id);

  assert.ok(persisted);
  assert.equal(result.success, true);
  assert.equal(persisted.providerSpecificData.codexScopeRateLimitedUntil.spark, exactReset);
  assert.equal(persisted.providerSpecificData.codexExhaustedWindowByScope.spark, "5h");
  assert.equal(persisted.providerSpecificData.codexQuotaStateByScope.spark.resetAt5h, exactReset);
});

test("chatCore keeps a Codex Spark 429 scoped so Sol remains selectable", async () => {
  const connection = await providersDb.createProviderConnection({
    provider: "codex",
    authType: "oauth",
    email: "codex-scope@example.com",
    accessToken: "codex-scope-token",
    isActive: true,
    providerSpecificData: {},
  });

  const { result } = await invokeChatCore({
    provider: "codex",
    model: "gpt-5.3-codex-spark",
    endpoint: "/v1/responses",
    connectionId: connection.id,
    credentials: {
      accessToken: "codex-scope-token",
      connectionId: connection.id,
      providerSpecificData: {},
    },
    body: {
      model: "gpt-5.3-codex-spark",
      input: "scope this cooldown",
      stream: false,
    },
    responseFactory() {
      return new Response(
        JSON.stringify({ error: { message: "The usage limit has been reached" } }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    },
  });

  const updated = await providersDb.getProviderConnectionById(connection.id);
  const sparkSelected = await auth.getProviderCredentials(
    "codex",
    null,
    null,
    "gpt-5.3-codex-spark"
  );
  const solSelected = await auth.getProviderCredentials("codex", null, null, "gpt-5.6-sol");

  assert.equal(result.success, false);
  assert.equal(result.status, 429);
  assert.equal(updated.rateLimitedUntil, undefined);
  assert.equal(typeof updated.providerSpecificData.codexScopeRateLimitedUntil.spark, "string");
  assert.equal(sparkSelected.allRateLimited, true);
  assert.equal(solSelected.connectionId, connection.id);
});
