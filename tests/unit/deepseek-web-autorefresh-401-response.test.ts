import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";

import {
  DeepSeekWebWithAutoRefreshExecutor,
} from "../../open-sse/executors/deepseek-web-with-auto-refresh.ts";
import { DeepSeekWebExecutor } from "../../open-sse/executors/deepseek-web.ts";

// Regression: the base DeepSeekWebExecutor.execute() never throws — it converts
// upstream auth failures (401/403) into a returned error Response. The auto-refresh
// subclass used to trigger refresh+retry only from its catch block (thrown errors),
// so the retry path was dead code: a stale access token surfaced a 401 to the client
// on every refresh boundary instead of self-healing. See executor-deepseek-web-auto-refresh.

const baseProto = DeepSeekWebExecutor.prototype;
const originalExecute = baseProto.execute;

function makeInput(overrides: Record<string, unknown> = {}) {
  return {
    model: "deepseek-web",
    body: { messages: [{ role: "user", content: "hi" }] },
    stream: false,
    credentials: { apiKey: "user-token-abc" },
    signal: null,
    log: null,
    ...overrides,
  } as any;
}

afterEach(() => {
  baseProto.execute = originalExecute;
});

describe("DeepSeekWebWithAutoRefreshExecutor — 401 Response retry (regression)", () => {
  it("refreshes and retries when the base returns a 401 error Response", async () => {
    const executor = new DeepSeekWebWithAutoRefreshExecutor({ autoRefresh: false });

    let baseCalls = 0;
    baseProto.execute = async function () {
      baseCalls++;
      if (baseCalls === 1) {
        return {
          response: new Response(
            JSON.stringify({ error: { message: "DeepSeek token expired" } }),
            { status: 401, headers: { "Content-Type": "application/json" } }
          ),
          url: "https://chat.deepseek.com/api/v0/chat/completion",
          headers: {},
          transformedBody: {},
        };
      }
      return {
        response: new Response(
          JSON.stringify({ choices: [{ message: { role: "assistant", content: "ok" } }] }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        ),
        url: "https://chat.deepseek.com/api/v0/chat/completion",
        headers: {},
        transformedBody: {},
      };
    };

    let refreshCalls = 0;
    (executor as any).doRefreshSession = async () => {
      refreshCalls++;
    };

    const result = await executor.execute(makeInput());

    assert.equal(refreshCalls, 1, "auto-refresh should fire exactly once on a 401 Response");
    assert.equal(baseCalls, 2, "base execute should run twice (initial 401 → refreshed retry)");
    assert.equal(result.response.status, 200, "the retried request's success should reach the client");
  });

  it("does not refresh/retry on a successful 200 Response", async () => {
    const executor = new DeepSeekWebWithAutoRefreshExecutor({ autoRefresh: false });

    let baseCalls = 0;
    baseProto.execute = async function () {
      baseCalls++;
      return {
        response: new Response(JSON.stringify({ choices: [] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
        url: "https://chat.deepseek.com/api/v0/chat/completion",
        headers: {},
        transformedBody: {},
      };
    };

    let refreshCalls = 0;
    (executor as any).doRefreshSession = async () => {
      refreshCalls++;
    };

    const result = await executor.execute(makeInput());

    assert.equal(baseCalls, 1, "base execute should run once on success");
    assert.equal(refreshCalls, 0, "no refresh on a 200 Response");
    assert.equal(result.response.status, 200);
  });

  it("stops retrying (no loop) when refresh cannot recover a dead userToken", async () => {
    const executor = new DeepSeekWebWithAutoRefreshExecutor({ autoRefresh: false });

    let baseCalls = 0;
    baseProto.execute = async function () {
      baseCalls++;
      return {
        response: new Response(JSON.stringify({ error: { message: "expired" } }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }),
        url: "https://chat.deepseek.com/api/v0/chat/completion",
        headers: {},
        transformedBody: {},
      };
    };

    let refreshCalls = 0;
    (executor as any).doRefreshSession = async () => {
      refreshCalls++;
      throw new Error("Token expired — get a new userToken from DeepSeek localStorage");
    };

    const result = await executor.execute(makeInput());

    // Refresh is attempted once; when it throws (dead userToken), we surface the
    // original 401 instead of looping forever.
    assert.equal(refreshCalls, 1, "refresh attempted once");
    assert.equal(baseCalls, 1, "no retry when refresh itself fails");
    assert.equal(result.response.status, 401, "original auth failure surfaces to the client");
  });
});
