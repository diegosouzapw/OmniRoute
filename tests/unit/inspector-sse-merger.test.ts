import test from "node:test";
import assert from "node:assert/strict";
import {
  detectApiFormat,
  mergeStream,
  parseSseStream,
  rebuildAnthropic,
  rebuildGemini,
  rebuildOpenAI,
  type SseEvent,
} from "../../src/mitm/inspector/sseMerger.ts";

function jsonChunks(payloads: unknown[]): SseEvent[] {
  return payloads.map((p) => ({ data: JSON.stringify(p), json: p }));
}

test("detectApiFormat — message_start → anthropic", () => {
  const chunks = jsonChunks([
    { type: "message_start", message: { id: "msg_1" } },
  ]);
  assert.equal(detectApiFormat(chunks), "anthropic");
});

test("detectApiFormat — content_block_delta → anthropic", () => {
  const chunks = jsonChunks([
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "Hi" } },
  ]);
  assert.equal(detectApiFormat(chunks), "anthropic");
});

test("detectApiFormat — choices[].delta → openai", () => {
  const chunks = jsonChunks([
    { choices: [{ index: 0, delta: { content: "Hi" } }] },
  ]);
  assert.equal(detectApiFormat(chunks), "openai");
});

test("detectApiFormat — candidates → gemini", () => {
  const chunks = jsonChunks([
    { candidates: [{ content: { parts: [{ text: "Hello" }] } }] },
  ]);
  assert.equal(detectApiFormat(chunks), "gemini");
});

test("detectApiFormat — no JSON chunks → unknown", () => {
  assert.equal(detectApiFormat([{ data: "weird non-json" }]), "unknown");
});

test("rebuildAnthropic — concat text_delta by index", () => {
  const chunks = jsonChunks([
    { type: "message_start", message: { id: "msg_1" } },
    { type: "content_block_start", index: 0, content_block: { type: "text" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "Hello" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: " world" } },
    { type: "content_block_stop", index: 0 },
    { type: "message_delta", delta: { stop_reason: "end_turn" }, usage: { output_tokens: 7 } },
  ]);
  const merged = rebuildAnthropic(chunks);
  assert.equal(merged.format, "anthropic");
  const msg = merged.message as { content: Array<{ text: string }>; stop_reason: string; usage: { output_tokens: number } };
  assert.equal(msg.content[0].text, "Hello world");
  assert.equal(msg.stop_reason, "end_turn");
  assert.equal(msg.usage.output_tokens, 7);
});

test("rebuildAnthropic — input_json_delta merges and JSON.parses", () => {
  const chunks = jsonChunks([
    { type: "message_start", message: {} },
    {
      type: "content_block_start",
      index: 0,
      content_block: { type: "tool_use", id: "tu_1", name: "search" },
    },
    { type: "content_block_delta", index: 0, delta: { type: "input_json_delta", partial_json: '{"q":' } },
    { type: "content_block_delta", index: 0, delta: { type: "input_json_delta", partial_json: '"hi"}' } },
    { type: "content_block_stop", index: 0 },
  ]);
  const merged = rebuildAnthropic(chunks);
  const msg = merged.message as { content: Array<{ type: string; input: { q: string }; name: string }> };
  assert.equal(msg.content[0].type, "tool_use");
  assert.equal(msg.content[0].name, "search");
  assert.deepEqual(msg.content[0].input, { q: "hi" });
});

test("rebuildAnthropic — thinking_delta accumulates", () => {
  const chunks = jsonChunks([
    { type: "content_block_start", index: 0, content_block: { type: "thinking" } },
    { type: "content_block_delta", index: 0, delta: { type: "thinking_delta", thinking: "I am " } },
    { type: "content_block_delta", index: 0, delta: { type: "thinking_delta", thinking: "thinking..." } },
  ]);
  const merged = rebuildAnthropic(chunks);
  const msg = merged.message as { content: Array<{ thinking: string }> };
  assert.equal(msg.content[0].thinking, "I am thinking...");
});

test("rebuildOpenAI — concat delta.content per choice index", () => {
  const chunks = jsonChunks([
    { id: "c1", model: "gpt-4", choices: [{ index: 0, delta: { role: "assistant", content: "Hel" } }] },
    { choices: [{ index: 0, delta: { content: "lo" }, finish_reason: null }] },
    { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] },
    { usage: { prompt_tokens: 3, completion_tokens: 1 } },
  ]);
  const merged = rebuildOpenAI(chunks);
  assert.equal(merged.format, "openai");
  const msg = merged.message as {
    id: string;
    model: string;
    choices: Array<{ message: { content: string; role: string }; finish_reason: string }>;
    usage: { prompt_tokens: number };
  };
  assert.equal(msg.id, "c1");
  assert.equal(msg.model, "gpt-4");
  assert.equal(msg.choices[0].message.content, "Hello");
  assert.equal(msg.choices[0].message.role, "assistant");
  assert.equal(msg.choices[0].finish_reason, "stop");
  assert.equal(msg.usage.prompt_tokens, 3);
});

test("rebuildOpenAI — merges tool_calls per (choice, tool) index", () => {
  const chunks = jsonChunks([
    {
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [{ index: 0, id: "tc_1", type: "function", function: { name: "search", arguments: '{"q":' } }],
          },
        },
      ],
    },
    {
      choices: [
        {
          index: 0,
          delta: {
            tool_calls: [{ index: 0, function: { arguments: '"hi"}' } }],
          },
        },
      ],
    },
  ]);
  const merged = rebuildOpenAI(chunks);
  const msg = merged.message as {
    choices: Array<{
      message: {
        tool_calls: Array<{ id: string; function: { name: string; arguments: string } }>;
      };
    }>;
  };
  assert.equal(msg.choices[0].message.tool_calls[0].id, "tc_1");
  assert.equal(msg.choices[0].message.tool_calls[0].function.name, "search");
  assert.equal(msg.choices[0].message.tool_calls[0].function.arguments, '{"q":"hi"}');
});

test("rebuildGemini — merges parts across candidates", () => {
  const chunks = jsonChunks([
    { candidates: [{ content: { parts: [{ text: "Hello " }] } }] },
    { candidates: [{ content: { parts: [{ text: "world" }] } }] },
    { usageMetadata: { promptTokenCount: 2, candidatesTokenCount: 2 } },
  ]);
  const merged = rebuildGemini(chunks);
  assert.equal(merged.format, "gemini");
  const msg = merged.message as {
    candidates: Array<{ content: { parts: Array<{ text: string }> } }>;
    usageMetadata: { promptTokenCount: number };
  };
  assert.equal(msg.candidates[0].content.parts.length, 2);
  assert.equal(msg.candidates[0].content.parts[0].text, "Hello ");
  assert.equal(msg.candidates[0].content.parts[1].text, "world");
  assert.equal(msg.usageMetadata.promptTokenCount, 2);
});

test("mergeStream — unknown format returns raw fallback (no crash)", () => {
  const chunks: SseEvent[] = [
    { data: "garbage" },
    { data: "{}", json: { foo: 1 } },
  ];
  const merged = mergeStream(chunks);
  assert.equal(merged.format, "unknown");
  assert.ok(Array.isArray(merged.raw));
  assert.equal(merged.raw!.length, 2);
});

test("parseSseStream — parses event/data blocks separated by blank lines", () => {
  const raw =
    "event: foo\ndata: 1\n\n" +
    'data: {"x":1}\n\n' +
    "data: [DONE]\n\n";
  const events = parseSseStream(raw);
  assert.equal(events.length, 3);
  assert.equal(events[0].event, "foo");
  assert.deepEqual(events[1].json, { x: 1 });
  assert.equal(events[2].data, "[DONE]");
});

test("parseSseStream — keeps raw data when JSON parse fails", () => {
  const events = parseSseStream("data: {not-json\n\n");
  assert.equal(events.length, 1);
  assert.equal(events[0].data, "{not-json");
  assert.equal(events[0].json, undefined);
});

test("mergeStream — dispatches by detected format", () => {
  const anth = mergeStream(jsonChunks([{ type: "message_start", message: {} }]));
  assert.equal(anth.format, "anthropic");
  const oai = mergeStream(jsonChunks([{ choices: [{ delta: { content: "x" } }] }]));
  assert.equal(oai.format, "openai");
  const gem = mergeStream(jsonChunks([{ candidates: [{ content: { parts: [{ text: "x" }] } }] }]));
  assert.equal(gem.format, "gemini");
});
