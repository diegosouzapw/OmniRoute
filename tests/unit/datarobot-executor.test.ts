import test from "node:test";
import assert from "node:assert/strict";

const { getExecutor, hasSpecializedExecutor } = await import("../../open-sse/executors/index.ts");
const { buildDataRobotUrl, getDataRobotBaseUrl } =
  await import("../../open-sse/executors/datarobot.ts");

test("DataRobot uses a specialized executor and normalizes root hosts to the LLM gateway path", () => {
  assert.equal(hasSpecializedExecutor("datarobot"), true);
  assert.equal(getExecutor("datarobot").constructor.name, "DataRobotExecutor");
  assert.equal(
    buildDataRobotUrl("https://app.datarobot.com"),
    "https://app.datarobot.com/api/v2/genai/llmgw/chat/completions/"
  );
  assert.equal(
    buildDataRobotUrl("https://app.datarobot.com/api/v2"),
    "https://app.datarobot.com/api/v2/genai/llmgw/chat/completions/"
  );
});

test("DataRobot preserves explicit deployment paths when provided", () => {
  assert.equal(
    buildDataRobotUrl("https://app.datarobot.com/api/v2/deployments/65f00e6cc7e9d5d7a0a1a111"),
    "https://app.datarobot.com/api/v2/deployments/65f00e6cc7e9d5d7a0a1a111/"
  );
  assert.equal(
    getDataRobotBaseUrl(
      {
        deploymentPath: "https://app.datarobot.com/api/v2/deployments/65f00e6cc7e9d5d7a0a1a111",
      },
      "https://app.datarobot.com"
    ),
    "https://app.datarobot.com/api/v2/deployments/65f00e6cc7e9d5d7a0a1a111"
  );
});

test("DataRobot executor calls the normalized LLM gateway endpoint", async () => {
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
        id: "chatcmpl_datarobot",
        object: "chat.completion",
        created: 1,
        model: "customer-deployment",
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: "hello from datarobot" },
            finish_reason: "stop",
          },
        ],
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" },
      }
    );
  };

  try {
    const executor = getExecutor("datarobot");
    const result = await executor.execute({
      model: "customer-deployment",
      body: {
        model: "customer-deployment",
        messages: [{ role: "user", content: "hello" }],
        max_tokens: 8,
      },
      stream: false,
      credentials: {
        apiKey: "dr-key",
      },
    });

    assert.equal(captured.url, "https://app.datarobot.com/api/v2/genai/llmgw/chat/completions/");
    assert.equal(captured.headers.Authorization, "Bearer dr-key");
    assert.equal(captured.body.model, "customer-deployment");

    const responseBody = await result.response.json();
    assert.equal(responseBody.choices[0].message.content, "hello from datarobot");
  } finally {
    globalThis.fetch = originalFetch;
  }
});
