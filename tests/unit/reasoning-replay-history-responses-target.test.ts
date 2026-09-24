/**
 * Reasoning replay for Responses-API targets (opencode-go/deepseek-v4-flash after #10540).
 *
 * DeepSeek's thinking mode requires the reasoning of EVERY prior assistant turn to be
 * passed back whenever the request carries `tools` — including turns that made no tool
 * call. OmniRoute's replay cache re-injects that reasoning for clients that drop it.
 *
 * Two gaps existed once the model moved from Chat Completions to `/responses`:
 *
 * 1. Plain (non-tool-call) turns are cached under a digest of the normalized OpenAI
 *    transcript. chatCore fed the write side `translatedBody.messages`, which a
 *    Responses-shaped body (`input`) does not have, so the write-time digest covered
 *    only the assistant message while the read side digested the full transcript —
 *    every plain-turn replay missed.
 * 2. The Responses replay pass only ran for `sourceFormat === "openai"`. Anthropic
 *    Messages clients pivot Claude → OpenAI → Responses, and the generic replay pass
 *    runs after the Responses conversion (no `messages` left), so those clients got no
 *    replay at all, not even for tool-call turns.
 *
 * `translateRequest` now reports the normalized pivot transcript it digested through
 * `onReasoningReplayHistory`, and chatCore uses that as the write-side history for
 * Responses targets. The replay pass runs on the pivot for every source format.
 */

import { describe, it, before, after } from "node:test";
import assert from "node:assert/strict";

import { mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-reasoning-history-"));
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "reasoning-history-test-secret";

import {
  cacheReasoningFromAssistantMessage,
  clearReasoningCacheAll,
} from "../../open-sse/services/reasoningCache.ts";
import { translateRequest } from "../../open-sse/translator/index.ts";
import { FORMATS } from "../../open-sse/translator/formats.ts";
import { clearModelsDevCapabilities } from "../../src/lib/modelsDevSync.ts";

type JsonRecord = Record<string, unknown>;

const PROVIDER = "opencode-go";
const MODEL = "deepseek-v4-flash";
const SCOPE = "api-key:local\x1finput:sha256:reasoning-history";
const PLAIN_REASONING = "The user only wants a greeting; no tool is needed.";
const TOOL_REASONING = "The user asked for the file contents, so read it first.";

const OPENAI_TOOLS = [
  {
    type: "function",
    function: {
      name: "read_file",
      description: "Read a file",
      parameters: { type: "object", properties: { path: { type: "string" } } },
    },
  },
];

const CLAUDE_TOOLS = [
  {
    name: "read_file",
    description: "Read a file",
    input_schema: { type: "object", properties: { path: { type: "string" } } },
  },
];

/**
 * Mirrors the chatCore write path: translate the request that produced the assistant
 * turn, keep the transcript `translateRequest` reports, then capture the upstream
 * response's reasoning against that transcript.
 */
function translateAndCapture(
  sourceFormat: string,
  body: JsonRecord,
  assistantResponse: JsonRecord
): { translated: JsonRecord; history: unknown[] | null; keysWritten: number } {
  let history: unknown[] | null = null;
  const translated = translateRequest(
    sourceFormat,
    FORMATS.OPENAI_RESPONSES,
    MODEL,
    structuredClone(body),
    false,
    null,
    PROVIDER,
    null,
    {
      reasoningCacheScope: SCOPE,
      onReasoningReplayHistory: (messages: unknown[]) => {
        history = messages;
      },
    }
  ) as JsonRecord;
  const historyMessages = Array.isArray(translated.messages)
    ? (translated.messages as unknown[])
    : history;
  const keysWritten = cacheReasoningFromAssistantMessage(
    assistantResponse as Parameters<typeof cacheReasoningFromAssistantMessage>[0],
    PROVIDER,
    MODEL,
    {
      scope: SCOPE,
      historyMessages: Array.isArray(historyMessages) ? historyMessages : [],
    }
  );
  return { translated, history, keysWritten };
}

function translateFollowUp(sourceFormat: string, body: JsonRecord): JsonRecord[] {
  const translated = translateRequest(
    sourceFormat,
    FORMATS.OPENAI_RESPONSES,
    MODEL,
    structuredClone(body),
    false,
    null,
    PROVIDER,
    null,
    { reasoningCacheScope: SCOPE }
  ) as { input: JsonRecord[] };
  return translated.input;
}

function reasoningTexts(input: JsonRecord[]): string[] {
  return input
    .filter((item) => item.type === "reasoning")
    .map((item) =>
      (item.content as Array<{ text?: string }>).map((part) => part.text ?? "").join("")
    );
}

describe("reasoning replay history for Responses targets (opencode-go/deepseek-v4-flash)", () => {
  before(() => {
    clearModelsDevCapabilities();
    clearReasoningCacheAll();
  });

  after(() => {
    clearReasoningCacheAll();
    clearModelsDevCapabilities();
  });

  it("replays a plain assistant turn for an OpenAI Chat client", () => {
    clearReasoningCacheAll();
    const turn1 = {
      model: MODEL,
      tools: OPENAI_TOOLS,
      messages: [
        { role: "system", content: "You are helpful." },
        { role: "user", content: "Say hi first, no tools." },
      ],
    };
    const { translated, history, keysWritten } = translateAndCapture(FORMATS.OPENAI, turn1, {
      role: "assistant",
      content: "Hi!",
      reasoning_content: PLAIN_REASONING,
    });

    assert.equal(translated.messages, undefined, "Responses body carries input, not messages");
    assert.ok(Array.isArray(history), "translateRequest reports the transcript it digested");
    assert.equal(keysWritten, 1);

    // Turn 2: the client replays history without reasoning_content (default OpenAI client).
    const input = translateFollowUp(FORMATS.OPENAI, {
      model: MODEL,
      tools: OPENAI_TOOLS,
      messages: [
        ...turn1.messages,
        { role: "assistant", content: "Hi!" },
        { role: "user", content: "Now read README.md" },
      ],
    });
    assert.deepEqual(reasoningTexts(input), [PLAIN_REASONING]);
    const reasoningIndex = input.findIndex((item) => item.type === "reasoning");
    const assistantIndex = input.findIndex(
      (item) => item.type === "message" && item.role === "assistant"
    );
    assert.ok(reasoningIndex < assistantIndex, "reasoning precedes the assistant message");
  });

  it("replays a tool-call turn for an Anthropic Messages client", () => {
    clearReasoningCacheAll();
    const toolUseId = "call_read_readme_1";
    // Turn 1 response (already translated to Chat shape by the response translator)
    // is captured under the tool_call id, as chatCore does.
    cacheReasoningFromAssistantMessage(
      {
        role: "assistant",
        content: "",
        reasoning_content: TOOL_REASONING,
        tool_calls: [
          { id: toolUseId, type: "function", function: { name: "read_file", arguments: "{}" } },
        ],
      },
      PROVIDER,
      MODEL,
      { scope: SCOPE, historyMessages: [] }
    );

    // Turn 2: Claude client sends tool_use / tool_result history without a thinking block.
    const input = translateFollowUp(FORMATS.CLAUDE, {
      model: MODEL,
      max_tokens: 1024,
      tools: CLAUDE_TOOLS,
      messages: [
        { role: "user", content: "Read README.md" },
        {
          role: "assistant",
          content: [
            { type: "tool_use", id: toolUseId, name: "read_file", input: { path: "README.md" } },
          ],
        },
        {
          role: "user",
          content: [{ type: "tool_result", tool_use_id: toolUseId, content: "# README" }],
        },
      ],
    });
    assert.deepEqual(reasoningTexts(input), [TOOL_REASONING]);
    const reasoningIndex = input.findIndex((item) => item.type === "reasoning");
    const functionCallIndex = input.findIndex((item) => item.type === "function_call");
    assert.ok(reasoningIndex < functionCallIndex, "reasoning precedes the function_call");
  });

  it("replays a plain assistant turn for an Anthropic Messages client", () => {
    clearReasoningCacheAll();
    const turn1 = {
      model: MODEL,
      max_tokens: 1024,
      tools: CLAUDE_TOOLS,
      system: "You are helpful.",
      messages: [{ role: "user", content: "Say hi first, no tools." }],
    };
    const { history, keysWritten } = translateAndCapture(FORMATS.CLAUDE, turn1, {
      role: "assistant",
      content: "Hi!",
      reasoning_content: PLAIN_REASONING,
    });
    assert.ok(Array.isArray(history));
    assert.equal(keysWritten, 1);

    const input = translateFollowUp(FORMATS.CLAUDE, {
      ...turn1,
      messages: [
        ...turn1.messages,
        { role: "assistant", content: [{ type: "text", text: "Hi!" }] },
        { role: "user", content: "Now read README.md" },
      ],
    });
    assert.deepEqual(reasoningTexts(input), [PLAIN_REASONING]);
  });

  it("keeps the reported transcript out of the upstream body and off Chat targets", () => {
    let responsesHistory: unknown[] | null = null;
    const responsesBody = translateRequest(
      FORMATS.OPENAI,
      FORMATS.OPENAI_RESPONSES,
      MODEL,
      { model: MODEL, tools: OPENAI_TOOLS, messages: [{ role: "user", content: "hi" }] },
      false,
      null,
      PROVIDER,
      null,
      {
        reasoningCacheScope: SCOPE,
        onReasoningReplayHistory: (messages: unknown[]) => {
          responsesHistory = messages;
        },
      }
    ) as JsonRecord;
    assert.ok(Array.isArray(responsesHistory));
    const serialized = JSON.parse(JSON.stringify(responsesBody)) as JsonRecord;
    assert.equal(serialized.messages, undefined);
    assert.ok(
      !Object.keys(serialized).some((key) => /replay|history/i.test(key)),
      "no replay bookkeeping leaks into the upstream payload"
    );

    let chatHistoryCalls = 0;
    const chatBody = translateRequest(
      FORMATS.OPENAI,
      FORMATS.OPENAI,
      MODEL,
      { model: MODEL, tools: OPENAI_TOOLS, messages: [{ role: "user", content: "hi" }] },
      false,
      null,
      PROVIDER,
      null,
      {
        reasoningCacheScope: SCOPE,
        onReasoningReplayHistory: () => {
          chatHistoryCalls += 1;
        },
      }
    ) as JsonRecord;
    assert.ok(Array.isArray(chatBody.messages), "Chat targets keep messages[] for the write side");
    assert.equal(chatHistoryCalls, 0, "Chat targets do not need the side channel");
  });
});
