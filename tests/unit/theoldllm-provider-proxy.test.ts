import test from "node:test";
import assert from "node:assert/strict";

import { fetchTheOldLlmWithProviderProxy } from "../../open-sse/executors/theoldllm.ts";

test("theoldllm dispatches through its provider proxy assignment", async () => {
  const assignedProxy = {
    type: "http",
    host: "residential.example",
    port: 8080,
    username: "user",
    password: "secret",
  };
  let observedProxy: unknown = null;
  let fetchCalls = 0;

  const response = await fetchTheOldLlmWithProviderProxy(
    { model: "GPT_5_4", messages: [], stream: true },
    new AbortController().signal,
    {
      resolveProxy: async () => assignedProxy,
      runWithProxy: async (proxy, request) => {
        observedProxy = proxy;
        return request();
      },
      fetch: (async () => {
        fetchCalls++;
        return new Response("ok", { status: 200 });
      }) as typeof fetch,
    }
  );

  assert.equal(response.status, 200);
  assert.equal(fetchCalls, 1);
  assert.deepEqual(observedProxy, assignedProxy);
});
