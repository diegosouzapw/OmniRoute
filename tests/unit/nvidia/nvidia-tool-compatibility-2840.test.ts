import assert from "node:assert/strict";
import test from "node:test";

import { DefaultExecutor } from "../../../open-sse/executors/default.ts";
import { getRegistryEntry } from "../../../open-sse/config/providerRegistry.ts";
import { translateNonStreamingResponse } from "../../../open-sse/handlers/responseTranslator.ts";
import {
  normalizeOpenAIToolNames,
  restoreOpenAIToolNames,
} from "../../../open-sse/translator/helpers/toolCallHelper.ts";
import { FORMATS } from "../../../open-sse/translator/formats.ts";
import { openaiToClaudeResponse } from "../../../open-sse/translator/response/openai-to-claude.ts";
import { createPassthroughStreamWithLogger } from "../../../open-sse/utils/stream.ts";

test("NVIDIA keeps tool calls and tool results linked with deterministic 9-character IDs", () => {
  const body = {
    messages: [
      {
        role: "assistant",
        tool_calls: [
          {
            id: "6075034-0",
            type: "function",
            function: { name: "lookup", arguments: "{}" },
          },
        ],
      },
      { role: "tool", tool_call_id: "6075034-0", content: "ok" },
    ],
  };

  const first = new DefaultExecutor("nvidia").transformRequest(
    "mistralai/mistral-medium-3.5-128b",
    structuredClone(body),
    false,
    null
  );
  const second = new DefaultExecutor("nvidia").transformRequest(
    "mistralai/mistral-medium-3.5-128b",
    structuredClone(body),
    false,
    null
  );

  const callId = first.messages[0].tool_calls[0].id;
  assert.match(callId, /^[A-Za-z0-9]{9}$/);
  assert.equal(first.messages[1].tool_call_id, callId);
  assert.equal(second.messages[0].tool_calls[0].id, callId);

  const valid = new DefaultExecutor("nvidia").transformRequest(
    "mistralai/mistral-medium-3.5-128b",
    {
      messages: [
        {
          role: "assistant",
          tool_calls: [
            {
              id: "Abc123XyZ",
              type: "function",
              function: { name: "lookup", arguments: "{}" },
            },
          ],
        },
        { role: "tool", tool_call_id: "Abc123XyZ", content: "ok" },
      ],
    },
    false,
    null
  );
  assert.equal(valid.messages[0].tool_calls[0].id, "Abc123XyZ");
  assert.equal(valid.messages[1].tool_call_id, "Abc123XyZ");
});

test("NVIDIA aliases every OpenAI tool-name surface and can restore the provider response", () => {
  const original = "mcp__plugin_chrome-devtools-mcp_chrome-devtools__get.console/message";
  const body = {
    tools: [{ type: "function", function: { name: original } }],
    tool_choice: { type: "function", function: { name: original } },
    messages: [
      {
        role: "assistant",
        tool_calls: [{ type: "function", function: { name: original, arguments: "{}" } }],
      },
      { role: "tool", name: original, tool_call_id: "valid1234", content: "ok" },
    ],
  };

  const aliases = normalizeOpenAIToolNames(body, 64);
  const alias = body.tools[0].function.name;

  assert.match(alias, /^[A-Za-z0-9_-]{1,64}$/);
  assert.notEqual(alias, original);
  assert.equal(body.tool_choice.function.name, alias);
  assert.equal(body.messages[0].tool_calls[0].function.name, alias);
  assert.equal(body.messages[1].name, alias);

  const response = {
    choices: [
      {
        message: {
          tool_calls: [{ type: "function", function: { name: alias, arguments: "{}" } }],
        },
      },
    ],
  };

  assert.equal(restoreOpenAIToolNames(response, aliases), true);
  assert.equal(response.choices[0].message.tool_calls[0].function.name, original);

  const collisions = {
    tools: ["a.b", "a?b"].map((name) => ({ type: "function", function: { name } })),
  };
  normalizeOpenAIToolNames(collisions, 64);
  assert.notEqual(collisions.tools[0].function.name, collisions.tools[1].function.name);
});

test("NVIDIA executor applies its registry-scoped tool-name limit without changing OpenAI", () => {
  const original = "mcp__plugin_chrome-devtools-mcp_chrome-devtools__get.console/message";
  const request = {
    tools: [{ type: "function", function: { name: original } }],
    messages: [
      {
        role: "assistant",
        tool_calls: [{ type: "function", function: { name: original, arguments: "{}" } }],
      },
    ],
  };

  assert.equal(getRegistryEntry("nvidia")?.toolNameMaxLength, 64);

  const nvidia = new DefaultExecutor("nvidia").transformRequest(
    "mistralai/mistral-medium-3.5-128b",
    structuredClone(request),
    false,
    null
  );
  const openai = new DefaultExecutor("openai").transformRequest(
    "gpt-5.4",
    structuredClone(request),
    false,
    null
  );

  const alias = nvidia.tools[0].function.name;
  assert.match(alias, /^[A-Za-z0-9_-]{1,64}$/);
  assert.equal(nvidia.messages[0].tool_calls[0].function.name, alias);
  assert.equal(nvidia._toolNameMap.get(alias), original);
  assert.equal(Object.prototype.propertyIsEnumerable.call(nvidia, "_toolNameMap"), false);
  assert.equal(openai.tools[0].function.name, original);
  assert.equal(openai._toolNameMap, undefined);
});

test("NVIDIA restores aliases in non-streaming OpenAI and OpenAI-to-Claude responses", () => {
  const original = "mcp__plugin_chrome-devtools-mcp_chrome-devtools__get.console/message";
  const request = { tools: [{ type: "function", function: { name: original } }] };
  const aliases = normalizeOpenAIToolNames(request, 64);
  const alias = request.tools[0].function.name;
  const providerResponse = {
    id: "chatcmpl_1",
    object: "chat.completion",
    choices: [
      {
        message: {
          role: "assistant",
          content: null,
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: alias, arguments: "{}" },
            },
          ],
        },
        finish_reason: "tool_calls",
      },
    ],
  };

  const openai = structuredClone(providerResponse);
  assert.equal(restoreOpenAIToolNames(openai, aliases), true);
  assert.equal(openai.choices[0].message.tool_calls[0].function.name, original);

  const claude = translateNonStreamingResponse(
    structuredClone(providerResponse),
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    aliases
  );
  const toolUse = claude.content.find((block) => block.type === "tool_use");
  assert.equal(toolUse.name, original);
});

test("NVIDIA restores aliases in passthrough OpenAI SSE chunks", async () => {
  const original = "mcp__plugin_chrome-devtools-mcp_chrome-devtools__get.console/message";
  const request = { tools: [{ type: "function", function: { name: original } }] };
  const aliases = normalizeOpenAIToolNames(request, 64);
  const alias = request.tools[0].function.name;
  const transform = createPassthroughStreamWithLogger("nvidia", null, aliases);
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const output = (async () => {
    let result = "";
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) return result;
      result += decoder.decode(value);
    }
  })();

  await writer.write(
    new TextEncoder().encode(
      `data: ${JSON.stringify({
        id: "chatcmpl_1",
        object: "chat.completion.chunk",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: 0,
                  id: "call_1",
                  type: "function",
                  function: { name: alias, arguments: "" },
                },
              ],
            },
            finish_reason: null,
          },
        ],
      })}\n\n`
    )
  );
  await writer.close();

  const text = await output;
  assert.match(text, new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(text, new RegExp(alias));
});

test("NVIDIA restores aliases before emitting translated OpenAI-to-Claude tool blocks", () => {
  const original = "mcp__plugin_chrome-devtools-mcp_chrome-devtools__get.console/message";
  const request = { tools: [{ type: "function", function: { name: original } }] };
  const aliases = normalizeOpenAIToolNames(request, 64);
  const alias = request.tools[0].function.name;
  const translated = openaiToClaudeResponse(
    {
      id: "chatcmpl_1",
      model: "mistralai/mistral-medium-3.5-128b",
      choices: [
        {
          delta: {
            tool_calls: [
              {
                index: 0,
                id: "call_1",
                type: "function",
                function: { name: alias, arguments: "" },
              },
            ],
          },
          finish_reason: null,
        },
      ],
    },
    {
      toolNameMap: aliases,
      toolCalls: new Map(),
      nextBlockIndex: 0,
      textBlockIndex: -1,
      thinkingBlockIndex: -1,
    }
  );

  const block = translated.find((event) => event.type === "content_block_start");
  assert.equal(block.content_block.name, original);
});

test("NVIDIA restores an alias in the final passthrough SSE chunk without a trailing newline", async () => {
  const original = "mcp__plugin_chrome-devtools-mcp_chrome-devtools__get.console/message";
  const request = { tools: [{ type: "function", function: { name: original } }] };
  const aliases = normalizeOpenAIToolNames(request, 64);
  const alias = request.tools[0].function.name;
  const transform = createPassthroughStreamWithLogger("nvidia", null, aliases);
  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const output = (async () => {
    let result = "";
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) return result;
      result += decoder.decode(value);
    }
  })();

  await writer.write(
    new TextEncoder().encode(
      `data: ${JSON.stringify({
        id: "chatcmpl_2",
        object: "chat.completion.chunk",
        choices: [
          {
            index: 0,
            delta: {
              tool_calls: [
                {
                  index: 0,
                  id: "call_2",
                  type: "function",
                  function: { name: alias, arguments: "{}" },
                },
              ],
            },
            finish_reason: "tool_calls",
          },
        ],
      })}`
    )
  );
  await writer.close();

  const text = await output;
  assert.match(text, new RegExp(original.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.doesNotMatch(text, new RegExp(alias));
});
