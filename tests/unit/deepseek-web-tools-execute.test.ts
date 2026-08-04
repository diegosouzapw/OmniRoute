// @ts-nocheck
// deepseek-web executor-level tool behavior (full execute() pipeline, fetch mocked):
//   1. A reply interleaving natural-language text with a (DeepSeek-flavoured) tool call must
//      surface BOTH the text AND the parsed tool_calls — streaming and non-streaming alike.
//   2. An agentic (tool-using) conversation must replay the whole trajectory (prior tool calls
//      + their results) into the flat web `prompt`, so the model keeps context across turns
//      instead of restarting.
// Pure parser / prompt-builder unit tests live in deepseek-web-tools-variants.test.ts.
import test from "node:test";
import assert from "node:assert/strict";

const dsMod = await import("../../open-sse/executors/deepseek-web.ts");
const { DeepSeekWebExecutor } = dsMod;

const POW_CHALLENGE = {
  algorithm: "DeepSeekHashV1",
  challenge: "311b26ae1e0fe7375e242958ce46db5552a6c67fea3f96880dcd846c63a74286",
  salt: "1122334455667788",
  signature: "sig123",
  difficulty: 1,
  expire_at: 1778891543095,
  expire_after: 300000,
  target_path: "/api/v0/chat/completion",
};

function sseWithContent(text) {
  return [
    "event: ready\n",
    'data: {"request_message_id":1,"response_message_id":2}\n',
    "\n",
    `data: ${JSON.stringify({ v: { response: { message_id: 2, fragments: [{ id: 1, type: "RESPONSE", content: text }] } } })}\n`,
    "\n",
    'data: {"p":"response/status","o":"SET","v":"FINISHED"}\n',
    "\n",
    "event: close\n",
    'data: {"click_behavior":"none"}\n',
  ].join("");
}

function installMock(completionText) {
  const original = globalThis.fetch;
  const calls = { completionBodies: [] };
  dsMod.tokenCache?.clear();
  dsMod.sessionCache?.clear();
  globalThis.fetch = async (url, opts = {}) => {
    const u = String(url);
    if (u.includes("/users/current"))
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { token: "access-token-xyz" } } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    if (u.includes("/chat_session/create"))
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { chat_session: { id: "s-1" } } } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    if (u.includes("/chat_session/delete"))
      return new Response(JSON.stringify({ code: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    if (u.includes("/create_pow_challenge"))
      return new Response(
        JSON.stringify({ code: 0, data: { biz_data: { challenge: POW_CHALLENGE } } }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    if (u.includes("/chat/completion")) {
      try {
        calls.completionBodies.push(JSON.parse(opts.body));
      } catch {
        calls.completionBodies.push(null);
      }
      return new Response(new TextEncoder().encode(sseWithContent(completionText)), {
        status: 200,
        headers: { "Content-Type": "text/event-stream" },
      });
    }
    return new Response("not found", { status: 404 });
  };
  return {
    calls,
    restore: () => {
      globalThis.fetch = original;
      dsMod.tokenCache?.clear();
      dsMod.sessionCache?.clear();
    },
  };
}

const TOOLS = [
  { type: "function", function: { name: "todowrite", description: "Write todos" } },
  { type: "function", function: { name: "bash", description: "Run a shell command" } },
];

// ── 1. Surrounding text + tool_calls are both surfaced ──────────────────────

// Explanation text followed by a `<tool:bash>` block.
const TEXT_PLUS_TOOL = 'I\'ll create a script.\n\n<tool:bash>\n{"command": "echo hi"}\n</tool>';
const EXPLANATION = "I'll create a script.";

test("non-stream: surrounding text AND tool_calls are both returned", async () => {
  const mock = installMock(TEXT_PLUS_TOOL);
  try {
    const result = await new DeepSeekWebExecutor().execute({
      model: "default",
      body: { messages: [{ role: "user", content: "go" }], tools: TOOLS },
      stream: false,
      credentials: { apiKey: "tkn-text-ns" },
      signal: AbortSignal.timeout(10000),
    });
    const choice = JSON.parse(await result.response.text()).choices[0];
    assert.equal(choice.finish_reason, "tool_calls");
    assert.equal(choice.message.tool_calls[0].function.name, "bash");
    assert.deepEqual(JSON.parse(choice.message.tool_calls[0].function.arguments), {
      command: "echo hi",
    });
    assert.ok(choice.message.content.includes(EXPLANATION), "explanation text preserved");
    assert.ok(!choice.message.content.includes("<tool"), "tool block stripped from content");
  } finally {
    mock.restore();
  }
});

test("stream: SSE carries the text delta AND the tool_calls delta", async () => {
  const mock = installMock(TEXT_PLUS_TOOL);
  try {
    const result = await new DeepSeekWebExecutor().execute({
      model: "default",
      body: { messages: [{ role: "user", content: "go" }], tools: TOOLS },
      stream: true,
      credentials: { apiKey: "tkn-text-stream" },
      signal: AbortSignal.timeout(10000),
    });
    const text = await result.response.text();
    assert.ok(text.includes(EXPLANATION), "stream carries the explanation text");
    assert.ok(text.includes("tool_calls"), "stream carries tool_calls");
    assert.ok(text.includes("echo hi"), "stream carries the arguments");
    assert.ok(text.includes('"finish_reason":"tool_calls"'));
    assert.ok(text.includes("[DONE]"));
  } finally {
    mock.restore();
  }
});

// ── 2. Agentic context is replayed into the upstream prompt ──────────────────

test("execute forwards the full agentic trajectory into the upstream prompt", async () => {
  const mock = installMock("All done.");
  try {
    await new DeepSeekWebExecutor().execute({
      model: "default",
      body: {
        tools: TOOLS,
        messages: [
          { role: "user", content: "write train.py" },
          {
            role: "assistant",
            content: "",
            tool_calls: [
              {
                id: "c1",
                type: "function",
                function: { name: "todowrite", arguments: '{"todos":[]}' },
              },
            ],
          },
          { role: "tool", tool_call_id: "c1", content: "todos created" },
        ],
      },
      stream: false,
      credentials: { apiKey: "tkn-ctx" },
      signal: AbortSignal.timeout(10000),
    });
    const prompt = mock.calls.completionBodies[0].prompt;
    assert.ok(prompt.includes("write train.py"), "task retained");
    assert.ok(prompt.includes("todowrite"), "prior tool call retained");
    assert.ok(prompt.includes("todos created"), "prior tool result retained");
  } finally {
    mock.restore();
  }
});
