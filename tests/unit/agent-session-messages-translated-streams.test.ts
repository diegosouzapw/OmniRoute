// #14864: a translated stream must hand the tool_use names its Claude client received to the
// session turn, through the same non-enumerable side channel as Claude passthrough, while the
// assembled body (replayed by the semantic cache, copied into call logs) stays unchanged.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-translated-turns-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { extractAgentSessionTurn } =
  await import("../../open-sse/handlers/chatCore/agentSessionTurn.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type StreamCompletion = { responseBody?: unknown; clientPayload?: { summary?: unknown } };
type StreamOptions = NonNullable<Parameters<typeof createSSEStream>[0]>;
type AssembledChatBody = { choices: { message: Record<string, unknown> }[] };

const textEncoder = new TextEncoder();
const sse = (payload: unknown) => `data: ${JSON.stringify(payload)}\n\n`;
const claudeBody = {
  messages: [{ role: "user", content: "go" }],
  tools: [{ name: "Glob", input_schema: { type: "object" } }],
};

async function assembleStream(chunks: string[], options: StreamOptions) {
  let completion: StreamCompletion = {};
  const source = new ReadableStream({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(textEncoder.encode(chunk));
      controller.close();
    },
  });
  const onComplete = (payload: StreamCompletion) => {
    completion = payload;
  };
  const clientText = await new Response(
    source.pipeThrough(createSSEStream({ ...options, onComplete }))
  ).text();
  // Same candidate order as chatCore's streaming call site.
  const turn = extractAgentSessionTurn(
    { messages: [{ role: "user", content: "go" }] },
    completion.clientPayload?.summary,
    completion.responseBody
  );
  return { completion, clientText, turn };
}

function assertBodyUnchanged(completion: StreamCompletion) {
  const message = (completion.responseBody as AssembledChatBody).choices[0].message;
  assert.equal(message.tool_calls, undefined, "the assembled body gains no tool_calls");
  assert.ok(!JSON.stringify(completion.responseBody).includes("Glob"), "names stay off the wire");
  assert.ok(!JSON.stringify(completion.clientPayload).includes("Glob"), "call log unchanged");
}

const geminiChunks = (withTool: boolean) => [
  sse({ candidates: [{ content: { role: "model", parts: [{ text: "Searching." }] } }] }),
  sse({
    candidates: [
      {
        content: {
          role: "model",
          parts: withTool ? [{ functionCall: { name: "Glob", args: { pattern: "*.ts" } } }] : [],
        },
        finishReason: "STOP",
      },
    ],
    usageMetadata: { promptTokenCount: 4, candidatesTokenCount: 5, totalTokenCount: 9 },
  }),
];

test("a Gemini stream translated for a Claude client stores the tool_use names", async () => {
  const { completion, clientText, turn } = await assembleStream(geminiChunks(true), {
    mode: "translate",
    targetFormat: FORMATS.GEMINI,
    sourceFormat: FORMATS.CLAUDE,
    provider: "gemini",
    model: "gemini-2.5-flash",
    body: claudeBody,
  });

  assert.ok(clientText.includes('"tool_use"'), "the client received a tool_use block");
  assert.equal(turn?.assistantText, "Searching.");
  assert.deepEqual(turn?.toolNames, ["Glob"]);
  assertBodyUnchanged(completion);
});

test("an Antigravity stream translated for a Claude client stores the tool_use names", async () => {
  const chunks = geminiChunks(true).map((chunk) =>
    sse({ response: JSON.parse(chunk.slice("data: ".length)) })
  );
  const { completion, turn } = await assembleStream(chunks, {
    mode: "translate",
    targetFormat: FORMATS.ANTIGRAVITY,
    sourceFormat: FORMATS.CLAUDE,
    provider: "antigravity",
    model: "gemini-3-flash",
    body: claudeBody,
  });

  assert.deepEqual(turn?.toolNames, ["Glob"]);
  assertBodyUnchanged(completion);
});

test("a Responses API stream translated for a Claude client stores the tool_use names", async () => {
  const functionCall = {
    type: "function_call",
    id: "fc_1",
    call_id: "call_1",
    name: "Glob",
    arguments: '{"pattern":"*.ts"}',
    status: "completed",
  };
  const { turn } = await assembleStream(
    [
      sse({ type: "response.created", response: { id: "resp_1", status: "in_progress" } }),
      sse({
        type: "response.output_item.added",
        output_index: 0,
        item: { ...functionCall, arguments: "", status: "in_progress" },
      }),
      sse({
        type: "response.function_call_arguments.done",
        item_id: "fc_1",
        output_index: 0,
        arguments: functionCall.arguments,
      }),
      sse({ type: "response.output_item.done", output_index: 0, item: functionCall }),
      sse({
        type: "response.completed",
        response: { id: "resp_1", status: "completed", output: [functionCall] },
      }),
    ],
    {
      mode: "translate",
      targetFormat: FORMATS.OPENAI_RESPONSES,
      sourceFormat: FORMATS.CLAUDE,
      provider: "codex",
      model: "gpt-5.5",
      body: claudeBody,
    }
  );

  assert.deepEqual(turn?.toolNames, ["Glob"]);
});

test("a text-only Gemini stream translated for a Claude client stores no tool names", async () => {
  const { turn } = await assembleStream(geminiChunks(false), {
    mode: "translate",
    targetFormat: FORMATS.GEMINI,
    sourceFormat: FORMATS.CLAUDE,
    provider: "gemini",
    model: "gemini-2.5-flash",
    body: claudeBody,
  });

  assert.equal(turn?.assistantText, "Searching.");
  assert.deepEqual(turn?.toolNames, []);
});

test("a Claude stream translated for an OpenAI client keeps its tool names", async () => {
  const { turn } = await assembleStream(
    [
      sse({
        type: "message_start",
        message: { id: "msg_1", model: "claude-sonnet-4", role: "assistant", usage: {} },
      }),
      sse({
        type: "content_block_start",
        index: 0,
        content_block: { type: "tool_use", id: "toolu_1", name: "Glob", input: {} },
      }),
      sse({
        type: "content_block_delta",
        index: 0,
        delta: { type: "input_json_delta", partial_json: "{}" },
      }),
      sse({ type: "content_block_stop", index: 0 }),
      sse({
        type: "message_delta",
        delta: { stop_reason: "tool_use" },
        usage: { output_tokens: 3 },
      }),
      sse({ type: "message_stop" }),
    ],
    {
      mode: "translate",
      targetFormat: FORMATS.CLAUDE,
      sourceFormat: FORMATS.OPENAI,
      provider: "claude",
      model: "claude-sonnet-4",
      body: { messages: [{ role: "user", content: "go" }] },
    }
  );

  assert.deepEqual(turn?.toolNames, ["Glob"]);
});
