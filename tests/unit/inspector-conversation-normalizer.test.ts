import test from "node:test";
import assert from "node:assert/strict";
import { normalizeConversation } from "../../src/mitm/inspector/conversationNormalizer.ts";
import type { InterceptedRequest } from "../../src/mitm/inspector/types.ts";

function makeReq(overrides: Partial<InterceptedRequest> = {}): InterceptedRequest {
  return {
    id: "test-id",
    source: "agent-bridge",
    timestamp: new Date().toISOString(),
    method: "POST",
    host: "api.openai.com",
    path: "/v1/chat/completions",
    requestHeaders: {},
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: 200,
    detectedKind: "llm",
    ...overrides,
  };
}

test("returns null for non-llm requests", () => {
  const req = makeReq({ detectedKind: "app" });
  assert.equal(normalizeConversation(req), null);
});

test("returns null when request body cannot yield turns", () => {
  const req = makeReq({ requestBody: JSON.stringify({ foo: "bar" }) });
  assert.equal(normalizeConversation(req), null);
});

test("normalizes OpenAI request with system + user messages", () => {
  const req = makeReq({
    requestBody: JSON.stringify({
      messages: [
        { role: "system", content: "You are helpful." },
        { role: "user", content: "Hello!" },
      ],
    }),
  });
  const conv = normalizeConversation(req);
  assert.ok(conv);
  assert.equal(conv.request.length, 2);
  assert.equal(conv.request[0].role, "system");
  assert.equal(conv.request[0].blocks[0].type, "text");
  assert.equal(conv.request[1].role, "user");
});

test("normalizes OpenAI assistant tool_calls into tool_use blocks", () => {
  const req = makeReq({
    requestBody: JSON.stringify({
      messages: [
        {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call-1",
              function: { name: "get_weather", arguments: '{"city":"SP"}' },
            },
          ],
        },
      ],
    }),
  });
  const conv = normalizeConversation(req);
  assert.ok(conv);
  const blocks = conv.request[0].blocks;
  assert.equal(blocks.length, 1);
  assert.equal(blocks[0].type, "tool_use");
  const tu = blocks[0] as { type: "tool_use"; id: string; name: string; input: unknown };
  assert.equal(tu.id, "call-1");
  assert.equal(tu.name, "get_weather");
  assert.deepEqual(tu.input, { city: "SP" });
});

test("normalizes OpenAI tool role into tool_result", () => {
  const req = makeReq({
    requestBody: JSON.stringify({
      messages: [{ role: "tool", tool_call_id: "call-1", content: "sunny" }],
    }),
  });
  const conv = normalizeConversation(req);
  assert.ok(conv);
  assert.equal(conv.request[0].role, "tool");
  const blk = conv.request[0].blocks[0] as { type: "tool_result"; tool_use_id: string };
  assert.equal(blk.type, "tool_result");
  assert.equal(blk.tool_use_id, "call-1");
});

test("normalizes Responses API function_call/function_call_output items (no `role` field) into tool_use/tool_result turns", () => {
  // Real OpenClaw traffic on the Responses API sends bare
  // {type:"function_call"}/{type:"function_call_output"} items with NO
  // `role` field at all — previously silently dropped (2026-08-06 bug:
  // request 1785975096139-6627d2 showed zero tool calls in the Conversation
  // Context panel despite the artifact having real function_call/
  // function_call_output items throughout).
  const req = makeReq({
    path: "/v1/responses",
    requestBody: JSON.stringify({
      input: [
        { role: "user", content: [{ type: "input_text", text: "run ls" }] },
        {
          type: "function_call",
          call_id: "call_00_abc",
          name: "exec",
          arguments: '{"command":"ls"}',
        },
        {
          type: "function_call_output",
          call_id: "call_00_abc",
          output: "file1.txt\nfile2.txt",
        },
      ],
    }),
  });
  const conv = normalizeConversation(req);
  assert.ok(conv);
  assert.equal(conv.request.length, 3);

  assert.equal(conv.request[1].role, "assistant");
  const toolUse = conv.request[1].blocks[0] as {
    type: "tool_use";
    id: string;
    name: string;
    input: unknown;
  };
  assert.equal(toolUse.type, "tool_use");
  assert.equal(toolUse.id, "call_00_abc");
  assert.equal(toolUse.name, "exec");
  assert.deepEqual(toolUse.input, { command: "ls" });

  assert.equal(conv.request[2].role, "tool");
  const toolResult = conv.request[2].blocks[0] as {
    type: "tool_result";
    tool_use_id: string;
    content: unknown;
  };
  assert.equal(toolResult.type, "tool_result");
  assert.equal(toolResult.tool_use_id, "call_00_abc");
  assert.equal(toolResult.content, "file1.txt\nfile2.txt");
});

test("normalizes Responses API reasoning items (no `role` field) into an assistant text turn", () => {
  const req = makeReq({
    path: "/v1/responses",
    requestBody: JSON.stringify({
      input: [
        {
          type: "reasoning",
          summary: [{ type: "summary_text", text: "Thinking about the request." }],
        },
      ],
    }),
  });
  const conv = normalizeConversation(req);
  assert.ok(conv);
  assert.equal(conv.request.length, 1);
  assert.equal(conv.request[0].role, "assistant");
  assert.equal(conv.request[0].blocks[0].type, "text");
  assert.equal((conv.request[0].blocks[0] as { text: string }).text, "Thinking about the request.");
});

test("normalizes Responses API instructions as a system turn before input", () => {
  const req = makeReq({
    path: "/v1/responses",
    requestBody: JSON.stringify({
      instructions: "Answer tersely.",
      input: [{ role: "user", content: [{ type: "input_text", text: "Hello" }] }],
    }),
  });
  const conv = normalizeConversation(req);
  assert.ok(conv);
  assert.deepEqual(
    conv.request.map((turn) => turn.role),
    ["system", "user"]
  );
  assert.equal(
    (conv.request[0].blocks[0] as { type: "text"; text: string }).text,
    "Answer tersely."
  );
});

test("normalizes Anthropic request with top-level system + tool_use response", () => {
  const req = makeReq({
    host: "api.anthropic.com",
    path: "/v1/messages",
    requestBody: JSON.stringify({
      system: "Be terse.",
      messages: [{ role: "user", content: "hi" }],
    }),
    responseBody: JSON.stringify({
      content: [
        { type: "text", text: "Hello." },
        { type: "tool_use", id: "tu1", name: "lookup", input: { q: "x" } },
      ],
    }),
  });
  const conv = normalizeConversation(req);
  assert.ok(conv);
  assert.equal(conv.request[0].role, "system");
  assert.equal(conv.response.length, 1);
  assert.equal(conv.response[0].role, "assistant");
  assert.equal(conv.response[0].blocks.length, 2);
  assert.equal(conv.response[0].blocks[0].type, "text");
  assert.equal(conv.response[0].blocks[1].type, "tool_use");
});

test("normalizes Anthropic user-carried tool_result content as a tool turn", () => {
  const req = makeReq({
    host: "api.anthropic.com",
    path: "/v1/messages",
    requestBody: JSON.stringify({
      messages: [
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: "toolu_1", content: "sunny" }],
        },
      ],
    }),
  });
  const conv = normalizeConversation(req);
  assert.ok(conv);
  assert.equal(conv.request[0].role, "tool");
  assert.deepEqual(conv.request[0].blocks[0], {
    type: "tool_result",
    tool_use_id: "toolu_1",
    content: "sunny",
  });
});

test("normalizes Gemini request contents + functionCall response", () => {
  const req = makeReq({
    host: "generativelanguage.googleapis.com",
    path: "/v1beta/models/gemini-pro:generateContent",
    requestBody: JSON.stringify({
      systemInstruction: { parts: [{ text: "sys" }] },
      contents: [
        { role: "user", parts: [{ text: "hi" }] },
        {
          role: "model",
          parts: [{ functionCall: { name: "fn", args: { a: 1 } } }],
        },
      ],
    }),
    responseBody: JSON.stringify({
      candidates: [
        {
          content: {
            parts: [{ text: "Hello from gemini" }],
          },
        },
      ],
    }),
  });
  const conv = normalizeConversation(req);
  assert.ok(conv);
  assert.equal(conv.request[0].role, "system");
  // user + assistant (model -> assistant)
  assert.equal(conv.request[1].role, "user");
  assert.equal(conv.request[2].role, "assistant");
  const tu = conv.request[2].blocks[0] as { type: string; name: string };
  assert.equal(tu.type, "tool_use");
  assert.equal(tu.name, "fn");
  assert.equal(conv.response[0].role, "assistant");
  assert.equal((conv.response[0].blocks[0] as { text: string }).text, "Hello from gemini");
});

test("propagates contextKey from request", () => {
  const req = makeReq({
    contextKey: "abc123def456",
    requestBody: JSON.stringify({
      messages: [{ role: "user", content: "hi" }],
    }),
  });
  const conv = normalizeConversation(req);
  assert.ok(conv);
  assert.equal(conv.contextKey, "abc123def456");
});

test("parses SSE response to extract OpenAI delta", () => {
  const sse = [
    `data: {"choices":[{"delta":{"role":"assistant","content":"Hello"}}]}`,
    "",
    `data: {"choices":[{"delta":{"content":" world"}}]}`,
    "",
    "data: [DONE]",
    "",
  ].join("\n");
  const req = makeReq({
    requestBody: JSON.stringify({ messages: [{ role: "user", content: "hi" }] }),
    responseHeaders: { "content-type": "text/event-stream" },
    responseBody: sse,
  });
  const conv = normalizeConversation(req);
  assert.ok(conv);
  assert.ok(conv.response.length >= 1);
  assert.equal(conv.response[0].role, "assistant");
});
