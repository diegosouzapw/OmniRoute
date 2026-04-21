import test from "node:test";
import assert from "node:assert/strict";

const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const { buildSagemakerRequest, buildSagemakerUrl } =
  await import("../../open-sse/executors/sagemaker.ts");

test("SageMaker uses a specialized executor and builds endpoint invocation URLs", () => {
  assert.equal(hasSpecializedExecutor("sagemaker"), true);
  assert.equal(getExecutor("sagemaker").constructor.name, "SagemakerExecutor");
  assert.equal(
    buildSagemakerUrl({
      baseUrl: "https://runtime.sagemaker.us-west-2.amazonaws.com/endpoints",
      endpointName: "meta-textgeneration-llama-2-7b-f",
    }),
    "https://runtime.sagemaker.us-west-2.amazonaws.com/endpoints/meta-textgeneration-llama-2-7b-f/invocations"
  );
});

test("SageMaker strips router-only fields and preserves OpenAI Messages API payloads", () => {
  const payload = buildSagemakerRequest({
    model: "meta-textgeneration-llama-2-7b-f",
    stream: true,
    messages: [{ role: "user", content: "hello" }],
    max_tokens: 32,
    temperature: 0.2,
  });

  assert.equal(payload.model, undefined);
  assert.equal(payload.stream, undefined);
  assert.deepEqual(payload.messages, [{ role: "user", content: "hello" }]);
  assert.equal(payload.max_tokens, 32);
  assert.equal(payload.temperature, 0.2);
});

test("SageMaker executor signs invocation requests and returns OpenAI-compatible JSON", async () => {
  const originalFetch = globalThis.fetch;
  let captured;

  globalThis.fetch = async (url, options = {}) => {
    captured = {
      url: String(url),
      headers: options.headers,
      body: JSON.parse(String(options.body || "{}")),
    };
    return new Response(
      JSON.stringify({
        id: "chatcmpl_sagemaker",
        object: "chat.completion",
        created: 1,
        model: "meta-textgeneration-llama-2-7b-f",
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: "hello from sagemaker" },
            finish_reason: "stop",
          },
        ],
        usage: { prompt_tokens: 5, completion_tokens: 3, total_tokens: 8 },
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const executor = getExecutor("sagemaker");
    const result = await executor.execute({
      model: "meta-textgeneration-llama-2-7b-f",
      body: {
        model: "meta-textgeneration-llama-2-7b-f",
        messages: [{ role: "user", content: "hello" }],
        max_tokens: 8,
      },
      stream: false,
      credentials: {
        apiKey: "AKIA_TEST:secret-test::us-west-2",
      },
    });

    assert.equal(
      captured.url,
      "https://runtime.sagemaker.us-west-2.amazonaws.com/endpoints/meta-textgeneration-llama-2-7b-f/invocations"
    );
    assert.equal(typeof captured.headers.Authorization, "string");
    assert.equal(captured.headers["Content-Type"], "application/json");
    assert.equal(captured.body.model, undefined);

    const responseBody = await result.response.json();
    assert.equal(responseBody.choices[0].message.content, "hello from sagemaker");
    assert.equal(responseBody.usage.total_tokens, 8);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("SageMaker executor synthesizes SSE for streaming clients", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    new Response(
      JSON.stringify({
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: "streamed sagemaker" },
            finish_reason: "stop",
          },
        ],
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );

  try {
    const executor = getExecutor("sagemaker");
    const result = await executor.execute({
      model: "meta-textgeneration-llama-2-7b-f",
      body: {
        model: "meta-textgeneration-llama-2-7b-f",
        messages: [{ role: "user", content: "hello" }],
      },
      stream: true,
      credentials: {
        apiKey: "AKIA_TEST:secret-test::us-west-2",
      },
    });

    assert.equal(result.response.headers.get("content-type"), "text/event-stream");
    const raw = await result.response.text();
    assert.match(raw, /streamed sagemaker/);
    assert.match(raw, /\[DONE\]/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
