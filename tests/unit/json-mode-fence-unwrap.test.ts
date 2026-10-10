import { test } from "node:test";
import assert from "node:assert/strict";

import {
  translateNonStreamingClientResponse,
  type NonStreamingClientTranslateInput,
} from "../../open-sse/handlers/chatCore/nonStreamingClientTranslate.ts";
import {
  stripJsonFence,
  unfenceJsonOutput,
  wantsJsonOutput,
} from "../../open-sse/utils/jsonFence.ts";
import { openaiToClaudeRequest } from "../../open-sse/translator/request/openai-to-claude.ts";

const SCHEMA = {
  type: "object",
  properties: { facts: { type: "array", items: { type: "string" } } },
  required: ["facts"],
  additionalProperties: false,
};
const JSON_SCHEMA_BODY = {
  messages: [{ role: "user", content: "facts?" }],
  response_format: { type: "json_schema", json_schema: { name: "Facts", schema: SCHEMA } },
};
const FENCED = '```json\n{"facts":[]}\n```';

function chatResponse(...contents: Array<string | null>) {
  return {
    id: "chatcmpl-test",
    object: "chat.completion",
    choices: contents.map((content, index) => ({
      index,
      message: { role: "assistant", content },
      finish_reason: "stop",
    })),
    usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
  };
}

function input(
  overrides: Partial<NonStreamingClientTranslateInput> = {}
): NonStreamingClientTranslateInput {
  return {
    responseBody: chatResponse(FENCED),
    responsePayloadFormat: "openai",
    clientResponseFormat: "openai",
    sourceFormat: "openai",
    provider: "openai",
    model: "gpt-4o",
    requestBody: { messages: [{ role: "user", content: "facts?" }] },
    clientRequestBody: JSON_SCHEMA_BODY,
    responseToolNameMap: null,
    requestToolIdentityMap: null,
    reasoningCacheScope: null,
    clientHeaders: null,
    isClaudeCodeCompatible: false,
    phase: "final",
    ...overrides,
  };
}

/* ── translateNonStreamingClientResponse ─────────────────────────────────── */

test("OpenAI client in JSON mode routed to a Claude provider gets unfenced JSON", () => {
  const result = translateNonStreamingClientResponse(
    input({
      responseBody: {
        id: "msg-1",
        type: "message",
        role: "assistant",
        content: [{ type: "text", text: FENCED }],
        stop_reason: "end_turn",
        usage: { input_tokens: 10, output_tokens: 5 },
      },
      responsePayloadFormat: "claude",
      provider: "anthropic",
      model: "claude-sonnet-4-20250514",
      // the upstream (Claude) body no longer carries response_format
      requestBody: { messages: [{ role: "user", content: "facts?" }] },
    })
  );
  assert.equal(result.response.choices[0].message.content, '{"facts":[]}');
});

test("OpenAI→OpenAI JSON mode response is unfenced", () => {
  const result = translateNonStreamingClientResponse(input());
  assert.equal(result.response.choices[0].message.content, '{"facts":[]}');
});

test("fenced content is untouched when the client did not ask for JSON", () => {
  const result = translateNonStreamingClientResponse(
    input({ clientRequestBody: { messages: [{ role: "user", content: "show code" }] } })
  );
  assert.equal(result.response.choices[0].message.content, FENCED);
});

test("prose around a fence is never stripped, even in JSON mode", () => {
  const prose = `Here you go:\n${FENCED}\nHope that helps.`;
  const result = translateNonStreamingClientResponse(input({ responseBody: chatResponse(prose) }));
  assert.equal(result.response.choices[0].message.content, prose);
});

test("every choice is unfenced when n>1", () => {
  const result = translateNonStreamingClientResponse(
    input({ responseBody: chatResponse(FENCED, '```\n{"facts":["a"]}\n```', null) })
  );
  const contents = result.response.choices.map(
    (c: { message: { content: string | null } }) => c.message.content
  );
  assert.deepEqual(contents, ['{"facts":[]}', '{"facts":["a"]}', null]);
});

test("Responses client with text.format gets unfenced output_text", () => {
  const result = translateNonStreamingClientResponse(
    input({
      responseBody: {
        id: "resp_1",
        object: "response",
        status: "completed",
        output: [
          {
            type: "message",
            id: "msg_1",
            role: "assistant",
            status: "completed",
            content: [{ type: "output_text", text: FENCED, annotations: [] }],
          },
        ],
        usage: { input_tokens: 10, output_tokens: 5, total_tokens: 15 },
      },
      responsePayloadFormat: "openai-responses",
      clientResponseFormat: "openai-responses",
      sourceFormat: "openai-responses",
      requestBody: { input: "facts?" },
      clientRequestBody: {
        input: "facts?",
        text: { format: { type: "json_schema", name: "Facts", schema: SCHEMA } },
      },
    })
  );
  const message = result.response.output.find((i: { type: string }) => i.type === "message");
  assert.equal(message.content[0].text, '{"facts":[]}');
});

test("without clientRequestBody, falls back to the request body's response_format", () => {
  const result = translateNonStreamingClientResponse(
    input({ clientRequestBody: undefined, requestBody: JSON_SCHEMA_BODY })
  );
  assert.equal(result.response.choices[0].message.content, '{"facts":[]}');
});

/* ── helpers ─────────────────────────────────────────────────────────────── */

test("stripJsonFence: unwraps ```json and bare fences, keeps everything else", () => {
  assert.equal(stripJsonFence('```json\n{"a":1}\n```'), '{"a":1}');
  assert.equal(stripJsonFence('  ```JSON\r\n{"a":1}\r\n```  \n'), '{"a":1}');
  assert.equal(stripJsonFence('```\n{"a":1}\n```'), '{"a":1}');
  assert.equal(stripJsonFence('{"a":1}'), '{"a":1}');
  assert.equal(stripJsonFence("```python\nprint(1)\n```"), "```python\nprint(1)\n```");
  const twoBlocks = '```json\n{"a":1}\n```\nand\n```json\n{"b":2}\n```';
  assert.equal(stripJsonFence(twoBlocks), twoBlocks);
  assert.equal(stripJsonFence("```"), "```");
  assert.equal(stripJsonFence(null), null);
});

test("wantsJsonOutput: Chat response_format and Responses text.format", () => {
  assert.equal(wantsJsonOutput(JSON_SCHEMA_BODY), true);
  assert.equal(wantsJsonOutput({ response_format: { type: "json_object" } }), true);
  assert.equal(wantsJsonOutput({ text: { format: { type: "json_object" } } }), true);
  assert.equal(wantsJsonOutput({ response_format: { type: "text" } }), false);
  assert.equal(wantsJsonOutput({ text: { format: { type: "text" } } }), false);
  assert.equal(wantsJsonOutput({}), false);
  assert.equal(wantsJsonOutput(null), false);
});

test("unfenceJsonOutput leaves Claude-shaped bodies alone", () => {
  const claudeBody = { content: [{ type: "text", text: FENCED }] };
  unfenceJsonOutput(JSON_SCHEMA_BODY, claudeBody);
  assert.equal(claudeBody.content[0].text, FENCED);
});

/* ── prompt instruction ──────────────────────────────────────────────────── */

test("openai→claude JSON-mode instructions forbid markdown code fences", () => {
  for (const response_format of [
    { type: "json_object" },
    { type: "json_schema", json_schema: { name: "Facts", schema: SCHEMA } },
  ]) {
    const out = openaiToClaudeRequest(
      "claude-sonnet-4-20250514",
      { messages: [{ role: "user", content: "facts?" }], response_format },
      false
    ) as { system?: Array<{ text: string }> };
    const systemText = (out.system || []).map((p) => p.text).join("\n");
    assert.match(systemText, /no markdown code fences/, response_format.type);
  }
});
