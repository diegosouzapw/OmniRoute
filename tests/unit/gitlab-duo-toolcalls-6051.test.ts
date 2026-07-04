import test from "node:test";
import assert from "node:assert/strict";

import { GitlabExecutor } from "../../open-sse/executors/gitlab.ts";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const WEATHER_TOOL = {
  type: "function",
  function: {
    name: "get_weather",
    description: "Get the current weather for a city",
    parameters: {
      type: "object",
      properties: { city: { type: "string" } },
      required: ["city"],
    },
  },
};

test("GitlabExecutor emulates OpenAI tool_calls when body.tools is present (#6051)", async () => {
  const executor = new GitlabExecutor();
  const originalFetch = globalThis.fetch;
  const calls: Array<{ url: string; body: Record<string, unknown> }> = [];

  // Upstream (GitLab code_suggestions) replies with the tool invocation as raw
  // text, exactly how a web/completion model would when handed the tool contract.
  globalThis.fetch = async (url, init = {}) => {
    calls.push({ url: String(url), body: JSON.parse(String(init.body || "{}")) });
    return jsonResponse({
      model: { name: "code-gecko" },
      choices: [
        {
          text: 'Sure, let me check.\n<tool>{"name": "get_weather", "arguments": {"city": "Paris"}}</tool>',
        },
      ],
    });
  };

  try {
    const result = await executor.execute({
      model: "gitlab-duo-code-suggestions",
      body: {
        messages: [{ role: "user", content: "What's the weather in Paris?" }],
        tools: [WEATHER_TOOL],
        tool_choice: "auto",
      },
      stream: false,
      credentials: { apiKey: "glpat-test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    } as any);

    // The serialized tool contract must reach the GitLab prompt.
    assert.equal(calls.length, 1);
    assert.match(
      String((calls[0].body.current_file as any)?.content_above_cursor ?? ""),
      /get_weather/,
      "tool contract must be serialized into the GitLab prompt"
    );

    const body = (await result.response.json()) as any;
    const choice = body.choices[0];
    assert.equal(choice.finish_reason, "tool_calls");
    assert.ok(Array.isArray(choice.message.tool_calls), "tool_calls array must be present");
    assert.equal(choice.message.tool_calls.length, 1);
    assert.equal(choice.message.tool_calls[0].type, "function");
    assert.equal(choice.message.tool_calls[0].function.name, "get_weather");
    assert.deepEqual(JSON.parse(choice.message.tool_calls[0].function.arguments), {
      city: "Paris",
    });
    assert.equal(choice.message.content, null);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GitlabExecutor streams a tool_calls chunk when tools are present (#6051)", async () => {
  const executor = new GitlabExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    jsonResponse({
      model: { name: "code-gecko" },
      choices: [{ text: '<tool>{"name": "get_weather", "arguments": {"city": "Paris"}}</tool>' }],
    });

  try {
    const result = await executor.execute({
      model: "gitlab-duo-code-suggestions",
      body: {
        messages: [{ role: "user", content: "weather in Paris?" }],
        tools: [WEATHER_TOOL],
      },
      stream: true,
      credentials: { apiKey: "glpat-test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    } as any);

    assert.equal(result.response.headers.get("Content-Type"), "text/event-stream");
    const text = await result.response.text();
    assert.match(text, /"tool_calls"/, "SSE stream must carry a tool_calls delta");
    assert.match(text, /get_weather/);
    assert.match(text, /"finish_reason":"tool_calls"/);
    assert.match(text, /data: \[DONE\]/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("GitlabExecutor keeps plain-text finish_reason:stop for non-tool requests (#6051)", async () => {
  const executor = new GitlabExecutor();
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async () =>
    jsonResponse({
      model: { name: "code-gecko" },
      choices: [{ text: "def hello():\n    return 'world'" }],
    });

  try {
    const result = await executor.execute({
      model: "gitlab-duo-code-suggestions",
      body: { messages: [{ role: "user", content: "Write a hello world function" }] },
      stream: false,
      credentials: { apiKey: "glpat-test" },
      signal: AbortSignal.timeout(10_000),
      log: null,
    } as any);

    const body = (await result.response.json()) as any;
    const choice = body.choices[0];
    assert.equal(choice.finish_reason, "stop");
    assert.equal(choice.message.tool_calls, undefined);
    assert.match(choice.message.content, /hello/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
