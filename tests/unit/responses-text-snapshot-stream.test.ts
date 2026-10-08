/** #15765: exercise Responses snapshots through the real parser -> hub -> SSE serializer. */
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

const previousDataDir = process.env.DATA_DIR;
const dataDir = mkdtempSync(join(tmpdir(), "omniroute-text-snapshot-stream-"));
process.env.DATA_DIR = dataDir;
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { createSSEStream } = await import("../../open-sse/utils/stream.ts");

test.after(() => {
  resetDbInstance();
  if (previousDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = previousDataDir;
  rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

type UpstreamEvent = Record<string, unknown>;
type ClientFormat = "openai" | "claude";
type ToolDelta = { index: number; id?: string; function?: { name?: string; arguments?: string } };
type WireEvent = {
  type?: string;
  index?: number;
  message?: { role?: string };
  content_block?: { type: string; text?: string; id?: string; name?: string; input?: object };
  delta?: { type?: string; text?: string; partial_json?: string; stop_reason?: string };
  choices?: Array<{
    delta?: { role?: string; content?: string; tool_calls?: ToolDelta[] };
    finish_reason?: string | null;
  }>;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    input_tokens?: number;
    output_tokens?: number;
    estimated?: boolean;
  };
};

const TEXT = "Hello, café 世界!";
const PREFIX = "Hello, café ";
const ARGS = '{"city":"東京"}';
const message = {
  id: "msg_snapshot",
  type: "message",
  role: "assistant",
  content: [{ type: "output_text", text: TEXT }],
};
const tool = {
  id: "fc_snapshot",
  type: "function_call",
  call_id: "call_snapshot",
  name: "weather",
  arguments: ARGS,
};
const identity = { output_index: 0, item_id: message.id, content_index: 0 };
const textDone = { type: "response.output_text.done", ...identity, text: TEXT };
const itemDone = { type: "response.output_item.done", output_index: 0, item: message };
const delta = (text: string): UpstreamEvent => ({
  type: "response.output_text.delta",
  ...identity,
  delta: text,
});
function completed(output: object[]): UpstreamEvent {
  return {
    type: "response.completed",
    response: {
      id: "resp_snapshot",
      status: "completed",
      output,
      usage: { input_tokens: 11, output_tokens: 7, total_tokens: 18 },
    },
  };
}

type Emission = { text: string } | { tool: string };
type Scenario = {
  name: string;
  events: UpstreamEvent[];
  hasTool?: boolean;
  text?: string;
  order?: Emission[];
};
const textMessage = (id: string, ...texts: string[]) => ({
  ...message,
  id,
  content: texts.map((text) => ({ type: "output_text", text })),
});
const cases: Scenario[] = [
  { name: "completed-only text", events: [completed([message])] },
  { name: "text.done-only text", events: [textDone, completed([])] },
  { name: "item.done-only text", events: [itemDone, completed([])] },
  {
    name: "full deltas deduplicate all snapshots",
    events: [delta(PREFIX), delta("世界!"), textDone, itemDone, completed([message])],
  },
  {
    name: "partial prefix recovers only the missing suffix",
    events: [delta(PREFIX), textDone, itemDone, completed([message])],
  },
  {
    name: "completed-only text and tool",
    events: [completed([message, tool])],
    hasTool: true,
    order: [{ text: TEXT }, { tool: tool.call_id }],
  },
  {
    name: "streamed tool deduplicates while completed recovers text suffix",
    events: [
      delta(PREFIX),
      {
        type: "response.output_item.added",
        output_index: 1,
        item: { ...tool, arguments: "" },
      },
      {
        type: "response.function_call_arguments.delta",
        output_index: 1,
        item_id: tool.id,
        delta: ARGS,
      },
      { type: "response.output_item.done", output_index: 1, item: tool },
      completed([message, tool]),
    ],
    hasTool: true,
    order: [{ text: PREFIX }, { tool: tool.call_id }, { text: "世界!" }],
  },
  {
    name: "completed-only tool then text preserves output order",
    events: [completed([tool, message])],
    hasTool: true,
    order: [{ tool: tool.call_id }, { text: TEXT }],
  },
  {
    name: "completed-only text tool text preserves output order",
    events: [
      completed([textMessage("msg_before", "Before"), tool, textMessage("msg_after", "After")]),
    ],
    hasTool: true,
    text: "BeforeAfter",
    order: [{ text: "Before" }, { tool: tool.call_id }, { text: "After" }],
  },
  {
    name: "partial prefix completes before later tool and text",
    events: [delta(PREFIX), completed([message, tool, textMessage("msg_after", "After")])],
    hasTool: true,
    text: TEXT + "After",
    order: [{ text: TEXT }, { tool: tool.call_id }, { text: "After" }],
  },
  {
    name: "ambiguous part delta after known part does not replay B",
    events: [
      { ...delta("A"), item_id: "msg_parts" },
      { type: "response.output_text.delta", item_id: "msg_parts", delta: "B" },
      completed([textMessage("msg_parts", "A", "B")]),
    ],
    text: "AB",
  },
  {
    name: "ambiguous item delta after known item does not replay B",
    events: [
      { ...delta("A"), item_id: "msg_a" },
      { type: "response.output_text.delta", delta: "B" },
      completed([textMessage("msg_a", "A"), textMessage("msg_b", "B")]),
    ],
    text: "AB",
  },
];

async function translate(
  sourceFormat: ClientFormat,
  events: UpstreamEvent[],
  fragmented: boolean
): Promise<{ output: string; frames: Array<WireEvent | "[DONE]"> }> {
  // Splitting the encoded bytes, not JS strings, also splits multibyte UTF-8
  // characters, event names, JSON tokens, and the blank-line SSE delimiters.
  const upstream = [
    { type: "response.created", response: { id: "resp_snapshot", status: "in_progress" } },
    ...events,
  ]
    .map((event) => `event: ${event.type}\ndata: ${JSON.stringify(event)}\n\n`)
    .join("");
  const bytes = new TextEncoder().encode(upstream + "data: [DONE]\n\n");
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      const size = fragmented ? 1 : bytes.length;
      for (let offset = 0; offset < bytes.length; offset += size) {
        controller.enqueue(bytes.subarray(offset, offset + size));
      }
      controller.close();
    },
  });
  let completions = 0;
  let failures = 0;
  const output = await new Response(
    source.pipeThrough(
      createSSEStream({
        mode: "translate",
        targetFormat: "openai-responses",
        sourceFormat,
        provider: "openai",
        model: "snapshot-test",
        dropResponsesCommentary: false,
        body: { messages: [{ role: "user", content: "Hello" }] },
        onComplete: () => {
          completions++;
        },
        onFailure: () => {
          failures++;
        },
      })
    )
  ).text();
  assert.equal(completions, 1, "EOF must complete the stream exactly once");
  assert.equal(failures, 0, "successful snapshots must not trigger stream failure");
  assert.ok(!output.includes("�"), "byte fragmentation must preserve Unicode");
  const frames = output
    .split("\n")
    .filter((line) => line.startsWith("data: "))
    .map((line): WireEvent | "[DONE]" => {
      const data = line.slice(6);
      return data === "[DONE]" ? data : JSON.parse(data);
    });
  return { output, frames };
}

function assertOpenAI(frames: Array<WireEvent | "[DONE]">, hasTool: boolean, text = TEXT) {
  assert.equal(frames.filter((frame) => frame === "[DONE]").length, 1);
  assert.equal(frames.at(-1), "[DONE]", "[DONE] must be the last data frame");
  const chunks = frames.filter((frame): frame is WireEvent => frame !== "[DONE]");
  const choices = chunks.flatMap((chunk) => chunk.choices ?? []);
  assert.equal(choices.map((choice) => choice.delta?.content ?? "").join(""), text);
  assert.equal(choices[0]?.delta?.role, "assistant", "first delta must announce the role");
  assert.equal(choices.filter((choice) => choice.delta?.role === "assistant").length, 1);
  const terminals = choices.filter((choice) => choice.finish_reason != null);
  assert.equal(terminals.length, 1, "completion and EOF must not duplicate terminal chunks");
  assert.equal(terminals[0].finish_reason, hasTool ? "tool_calls" : "stop");
  assert.equal(choices.at(-1), terminals[0], "all content must precede the terminal choice");
  const usages = chunks.filter((chunk) => chunk.usage);
  assert.equal(usages.length, 1, "upstream usage must be emitted exactly once");
  assert.equal(usages[0].usage?.prompt_tokens, 11);
  assert.equal(usages[0].usage?.completion_tokens, 7);
  assert.notEqual(usages[0].usage?.estimated, true);
  const toolDeltas = choices.flatMap((choice) => choice.delta?.tool_calls ?? []);
  if (!hasTool) {
    assert.equal(toolDeltas.length, 0);
    return;
  }
  assert.deepEqual(
    toolDeltas.filter((entry) => entry.id).map((entry) => entry.id),
    [tool.call_id]
  );
  assert.equal(new Set(toolDeltas.map((entry) => entry.index)).size, 1);
  assert.equal(toolDeltas.map((entry) => entry.function?.name ?? "").join(""), tool.name);
  assert.equal(toolDeltas.map((entry) => entry.function?.arguments ?? "").join(""), ARGS);
}

function assertClaude(frames: Array<WireEvent | "[DONE]">, hasTool: boolean, expectedText = TEXT) {
  assert.ok(
    frames.every((frame) => frame !== "[DONE]"),
    "Claude uses message_stop, not [DONE]"
  );
  const events = frames as WireEvent[];
  assert.equal(events[0]?.type, "message_start");
  assert.equal(events[0]?.message?.role, "assistant");
  assert.equal(events.filter((event) => event.type === "message_start").length, 1);
  assert.equal(events.filter((event) => event.type === "message_stop").length, 1);
  assert.equal(events.at(-1)?.type, "message_stop");
  const terminals = events.filter((event) => event.type === "message_delta");
  assert.equal(terminals.length, 1);
  assert.equal(events.at(-2), terminals[0], "all blocks must close before the terminal delta");
  assert.equal(terminals[0].delta?.stop_reason, hasTool ? "tool_use" : "end_turn");
  assert.equal(terminals[0].usage?.input_tokens, 11);
  assert.equal(terminals[0].usage?.output_tokens, 7);
  assert.notEqual(terminals[0].usage?.estimated, true);

  const open = new Map<number, string>();
  const closed = new Set<number>();
  let text = "";
  let argumentsJson = "";
  const tools: Array<{ id?: string; name?: string }> = [];
  for (const event of events) {
    if (event.type === "content_block_start") {
      assert.equal(typeof event.index, "number");
      assert.ok(
        !open.has(event.index!) && !closed.has(event.index!),
        "block indices cannot restart"
      );
      assert.ok(event.content_block);
      open.set(event.index!, event.content_block.type);
      if (event.content_block.type === "text") text += event.content_block.text ?? "";
      if (event.content_block.type === "tool_use") tools.push(event.content_block);
    } else if (event.type === "content_block_delta") {
      assert.ok(open.has(event.index!), "every delta must belong to an open block");
      if (event.delta?.type === "text_delta") {
        assert.equal(open.get(event.index!), "text");
        text += event.delta.text ?? "";
      } else if (event.delta?.type === "input_json_delta") {
        assert.equal(open.get(event.index!), "tool_use");
        argumentsJson += event.delta.partial_json ?? "";
      }
    } else if (event.type === "content_block_stop") {
      assert.ok(open.delete(event.index!), "every block must stop exactly once after starting");
      closed.add(event.index!);
    } else if (event.type === "message_delta" || event.type === "message_stop") {
      assert.equal(open.size, 0, "terminal events must not leave open content blocks");
    }
  }
  assert.equal(text, expectedText, "text must reach the client exactly once");
  assert.equal(tools.length, hasTool ? 1 : 0);
  if (hasTool) {
    assert.equal(tools[0].id, tool.call_id);
    assert.equal(tools[0].name, tool.name);
    assert.equal(argumentsJson, ARGS, "tool arguments must reach the client exactly once");
  }
}

function assertEmissionOrder(
  frames: Array<WireEvent | "[DONE]">,
  format: ClientFormat,
  expected: Emission[]
) {
  // Observe serialized arrival order, not tool execution or protocol causality.
  // Adjacent text fragments are one emission regardless of upstream chunking.
  const emissions: Emission[] = [];
  const appendText = (text: string | undefined) => {
    if (!text) return;
    const previous = emissions.at(-1);
    if (previous && "text" in previous) previous.text += text;
    else emissions.push({ text });
  };
  for (const frame of frames) {
    if (frame === "[DONE]") continue;
    if (format === "openai") {
      for (const choice of frame.choices ?? []) {
        appendText(choice.delta?.content);
        for (const call of choice.delta?.tool_calls ?? []) {
          if (call.id) emissions.push({ tool: call.id });
        }
      }
    } else if (frame.type === "content_block_start") {
      if (frame.content_block?.type === "tool_use") {
        emissions.push({ tool: frame.content_block.id! });
      } else if (frame.content_block?.type === "text") {
        appendText(frame.content_block.text);
      }
    } else if (frame.type === "content_block_delta" && frame.delta?.type === "text_delta") {
      appendText(frame.delta.text);
    }
  }
  assert.deepEqual(emissions, expected, "serialized tool/text order must match expected emissions");
}

for (const format of ["openai", "claude"] as const) {
  for (const scenario of cases) {
    for (const fragmented of [false, true]) {
      test(`${format}: ${scenario.name} (${fragmented ? "single-byte fragments" : "one buffer"})`, async () => {
        const { frames } = await translate(format, scenario.events, fragmented);
        if (format === "openai") assertOpenAI(frames, scenario.hasTool === true, scenario.text);
        else assertClaude(frames, scenario.hasTool === true, scenario.text);
        if (scenario.order) assertEmissionOrder(frames, format, scenario.order);
      });
    }
  }
}
