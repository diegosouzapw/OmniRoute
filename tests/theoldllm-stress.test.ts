import { describe, it, beforeEach } from "node:test";
import assert from "node:assert";
import { TheOldLlmExecutor, tokenCache } from "../open-sse/executors/theoldllm.ts";

const executor = new TheOldLlmExecutor();

const MOCK_SSE = [
  'data: {"choices":[{"delta":{"content":"hi"},"index":0,"finish_reason":null}]}',
  "data: [DONE]",
  "",
].join("\n");

const MOCK_ERR = JSON.stringify({
  error: { message: "auth", type: "access_denied" },
});

function makeResponse(status: number, body = MOCK_SSE) {
  return {
    status,
    ok: status < 300,
    statusText: status < 300 ? "OK" : "Error",
    headers: new Map<string, string>([["content-type", "application/json"]]),
    text: async () => body,
  } as unknown as Response;
}

function warmTokenCache() {
  tokenCache.value = "test-token-abc123";
  tokenCache.expiresAt = Date.now() + 15 * 60 * 1000;
}

function clearTokenCache() {
  tokenCache.value = "";
  tokenCache.expiresAt = 0;
}

describe("TheOldLlmExecutor", () => {
  it("buildHeaders returns static upstream headers", () => {
    const headers = (executor as any).buildHeaders({});
    assert.strictEqual(headers["Content-Type"], "application/json");
    assert.ok(
      headers["User-Agent"].includes("Chrome/"),
      `expected Chrome UA, got ${headers["User-Agent"]}`,
    );
    assert.ok(
      headers["User-Agent"].includes("Mozilla/5.0"),
      `expected Mozilla UA, got ${headers["User-Agent"]}`,
    );
  });

  it("maps model aliases to upstream slugs", () => {
    const cases: Record<string, string> = {
      "gpt-5.4": "GPT_5_4",
      "GPT_5_3": "GPT_5_3",
      "gpt_5_2": "GPT_5_2",
      "gpt-4o": "GPT_4O",
      "claude-4.6-opus": "CLAUDE_4_6_OPUS",
      "claude sonnet 4": "CLAUDE_4_6_SONNET",
      "claude_haiku_3_5": "CLAUDE_4_5_HAIKU",
      "weird-model": "GPT_5_4",
    };

    const transformRequest = (executor as any).transformRequest.bind(
      executor,
    ) as (
      model: string,
      body: Record<string, unknown>,
      stream: boolean,
    ) => Record<string, unknown>;

    for (const [model, expected] of Object.entries(cases)) {
      const updated = transformRequest(model, { model, messages: [] }, true);
      assert.strictEqual(
        updated.model,
        expected,
        `model ${model} mapped to ${expected}, got ${updated.model}`,
      );
    }
  });

  it("returns true on 200 and false on 401 for testConnection", async () => {
    const originalFetch = globalThis.fetch;
    try {
      globalThis.fetch = async () => makeResponse(200) as any;
      assert.strictEqual(
        await executor.testConnection({}, null, {
          info: () => {},
          warn: () => {},
          error: () => {},
          debug: () => {},
        }),
        true,
      );

      globalThis.fetch = async () => makeResponse(401) as any;
      assert.strictEqual(
        await executor.testConnection({}, null, {
          info: () => {},
          warn: () => {},
          error: () => {},
          debug: () => {},
        }),
        false,
      );
    } finally {
      globalThis.fetch = originalFetch;
    }
  });

  it("retries once after 401 then succeeds", async () => {
    const originalFetch = globalThis.fetch;
    warmTokenCache();
    try {
      let calls = 0;
      const responses = [
        () => makeResponse(401, MOCK_ERR),
        () => makeResponse(200, MOCK_SSE),
      ];

      globalThis.fetch = async () =>
        responses[
          calls++ < responses.length ? calls - 1 : responses.length - 1
        ]() as any;

      const result = await executor.execute({
        model: "gpt-5.4",
        body: { messages: [{ role: "user", content: "hai" }], stream: true },
        stream: true,
        signal: null,
        credentials: {},
        log: {
          debug: () => {},
          info: () => {},
          warn: () => {},
          error: () => {},
        },
      });

      assert.strictEqual((result as any).response.status, 200);
      assert.ok(calls >= 2, `expected >=2 fetch calls, got ${calls}`);
    } finally {
      globalThis.fetch = originalFetch;
      clearTokenCache();
    }
  });

  it("lets cancellation abort before upstream work", async () => {
    const controller = new AbortController();
    controller.abort(new Error("cancelled"));
    warmTokenCache();

    let fetchCalls = 0;
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      fetchCalls++;
      return makeResponse(200) as any;
    };

    try {
      await executor.execute({
        model: "gpt-5.4",
        body: { messages: [{ role: "user", content: "ping" }], stream: true },
        stream: true,
        signal: controller.signal,
        credentials: {},
        log: {
          debug: () => {},
          info: () => {},
          warn: () => {},
          error: () => {},
        },
      });

      assert.strictEqual(fetchCalls, 0);
    } finally {
      globalThis.fetch = originalFetch;
      clearTokenCache();
    }
  });

  it("handles concurrent calls with cached token", async () => {
    const originalFetch = globalThis.fetch;
    warmTokenCache();
    try {
      let fetchCalls = 0;

      globalThis.fetch = async () => {
        fetchCalls++;
        return makeResponse(200) as any;
      };

      const requests = Array.from({ length: 4 }, () =>
        executor.execute({
          model: "gpt-5.4",
          body: { messages: [{ role: "user", content: "ping" }], stream: true },
          stream: true,
          signal: null,
          credentials: {},
          log: {
            debug: () => {},
            info: () => {},
            warn: () => {},
            error: () => {},
          },
        }),
      );

      await Promise.all(requests);
      assert.ok(fetchCalls >= 1, `expected >=1 fetch calls, got ${fetchCalls}`);
    } finally {
      globalThis.fetch = originalFetch;
      clearTokenCache();
    }
  });

  it("fast fails on network error", async () => {
    const originalFetch = globalThis.fetch;
    warmTokenCache();
    try {
      globalThis.fetch = async () => {
        const error = new Error("ECONNREFUSED");
        (error as any).cause = new Error("ECONNREFUSED");
        throw error;
      };

      const result = await executor.execute({
        model: "gpt-5.4",
        body: { messages: [{ role: "user", content: "ping" }], stream: true },
        stream: true,
        signal: null,
        credentials: {},
        log: {
          debug: () => {},
          info: () => {},
          warn: () => {},
          error: () => {},
        },
      });

      assert.strictEqual((result as any).response.status, 502);
    } finally {
      globalThis.fetch = originalFetch;
      clearTokenCache();
    }
  });
});
