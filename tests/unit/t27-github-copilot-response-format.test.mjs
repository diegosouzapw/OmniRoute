import test from "node:test";
import assert from "node:assert/strict";

const { GithubExecutor } = await import("../../open-sse/executors/github.ts");
const { BaseExecutor } = await import("../../open-sse/executors/base.ts");

function streamFromChunks(chunks) {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      for (const chunk of chunks) {
        controller.enqueue(encoder.encode(chunk));
      }
      controller.close();
    },
  });
}

test("T27: Claude + response_format=json_object injects system instruction and strips response_format field", () => {
  const executor = new GithubExecutor();
  const request = {
    messages: [{ role: "user", content: "return json" }],
    response_format: { type: "json_object" },
  };

  const transformed = executor.transformRequest("claude-sonnet-4.5", request, false, {});

  assert.equal(transformed.response_format, undefined);
  assert.equal(transformed.messages[0].role, "system");
  assert.match(
    transformed.messages[0].content,
    /Respond only with valid JSON\. Do not include any text/i
  );
});

test("T27: non-Claude models keep response_format untouched", () => {
  const executor = new GithubExecutor();
  const request = {
    messages: [{ role: "user", content: "hello" }],
    response_format: { type: "json_object" },
  };

  const transformed = executor.transformRequest("gpt-4o", request, false, {});
  assert.deepEqual(transformed.response_format, { type: "json_object" });
});

test("T27: SSE [DONE] guard applies only in streaming mode", async () => {
  const executor = new GithubExecutor();
  const originalExecute = BaseExecutor.prototype.execute;

  BaseExecutor.prototype.execute = async () => ({
    response: new Response(
      streamFromChunks(['data: {"delta":"hello"}\n\n', "data: [DONE]\n\n", "data: tail\n\n"]),
      {
        status: 200,
        headers: { "content-type": "text/event-stream" },
      }
    ),
    url: "https://api.githubcopilot.com/chat/completions",
  });

  try {
    const streamingResult = await executor.execute({
      model: "claude-sonnet-4.5",
      body: { messages: [] },
      stream: true,
      credentials: { accessToken: "token" },
    });
    const streamingText = await streamingResult.response.text();
    assert.equal(streamingText.includes("data: [DONE]"), false);
    assert.equal(streamingText.includes("data: tail"), true);

    const nonStreamingResult = await executor.execute({
      model: "claude-sonnet-4.5",
      body: { messages: [] },
      stream: false,
      credentials: { accessToken: "token" },
    });
    const nonStreamingText = await nonStreamingResult.response.text();
    assert.equal(nonStreamingText.includes("data: [DONE]"), true);
  } finally {
    BaseExecutor.prototype.execute = originalExecute;
  }
});
