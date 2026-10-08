import test from "node:test";
import assert from "node:assert/strict";

import { DefaultExecutor } from "../../open-sse/executors/default.ts";

test("muse-code sends reminted Responses requests to its configured endpoint", async () => {
  const originalFetch = globalThis.fetch;
  const requests: { url: string; body: unknown }[] = [];
  globalThis.fetch = async (input, init = {}) => {
    requests.push({
      url: String(input),
      body: JSON.parse(String(init.body)),
    });
    return new Response(JSON.stringify({ id: "resp_test", object: "response", output: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  try {
    await new DefaultExecutor("muse-code").execute({
      model: "muse-spark-1.3",
      body: {
        model: "muse-spark-1.3",
        input: "hello",
        max_output_tokens: 20,
      },
      stream: false,
      credentials: {
        apiKey: "LLM|test",
        providerSpecificData: { baseUrl: "https://api.meta.ai/v1" },
      },
    });
  } finally {
    globalThis.fetch = originalFetch;
  }

  assert.equal(requests.length, 1);
  assert.equal(requests[0].url, "https://api.meta.ai/v1/responses");
  assert.deepEqual(requests[0].body, {
    model: "muse-spark-1.3",
    input: "hello",
    max_output_tokens: 20,
  });
});

test("muse-code preserves a configured host while selecting the Responses endpoint", () => {
  const executor = new DefaultExecutor("muse-code");
  assert.equal(
    executor.buildUrl("muse-spark-1.3", false, 0, {
      providerSpecificData: { baseUrl: "https://proxy.example/v1" },
    }),
    "https://proxy.example/v1/responses"
  );
});

test("unrelated OpenAI-compatible providers retain their chat endpoint", () => {
  const executor = new DefaultExecutor("openai-compatible-test");
  assert.equal(
    executor.buildUrl("gpt-4.1", true, 0, {
      providerSpecificData: { baseUrl: "https://proxy.example/v1" },
    }),
    "https://proxy.example/v1/chat/completions"
  );
});
