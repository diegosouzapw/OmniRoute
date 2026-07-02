import test from "node:test";
import assert from "node:assert/strict";

import { createSSETransformStreamWithLogger } from "@omniroute/open-sse/utils/stream.ts";
import { FORMATS } from "@omniroute/open-sse/translator/formats.ts";

/**
 * Regression guards for #5786 — streaming claude→codex.
 *
 * A Claude/Anthropic-format client (source_format=claude, e.g. Claude Code) routed
 * to a Codex provider (ChatGPT OAuth, Responses-API reasoning model) hit two bugs on
 * the STREAMING path:
 *
 *   (A) Reassembled deltas were emitted TWICE, glued with no separator, whenever the
 *       upstream Responses-API stream replayed an already-seen event (identical
 *       `sequence_number`) — the gateway never de-duplicated on sequence_number.
 *   (B) A reasoning summary that arrived ONLY as a terminal snapshot on
 *       `response.output_item.done` (item.type === "reasoning", no preceding
 *       `reasoning_summary_text.delta` events) was silently DROPPED in translate mode,
 *       so the reasoning channel was never surfaced (`tokens_reasoning` null) — and in
 *       the reported production traces leaked into the visible assistant `content`.
 *
 * These tests drive the REAL streaming pipeline used for claude←codex:
 *   createSSETransformStreamWithLogger(OPENAI_RESPONSES → CLAUDE).
 * The provider (Codex) speaks openai-responses; the client (Claude Code) speaks claude.
 */

function sse(type: string, obj: Record<string, unknown>): string {
  return `event: ${type}\ndata: ${JSON.stringify({ type, ...obj })}\n\n`;
}

type Reconstructed = {
  raw: string;
  content: string;
  thinking: string;
};

/**
 * Feed a raw Codex (Responses-API) SSE wire string through the real translate-mode
 * transform stream (openai-responses → claude), optionally byte-chunked to stress the
 * line-reassembly buffer, and reconstruct the client-visible Claude text/thinking.
 */
async function runClaudeFromCodex(rawSSE: string, chunkSize = 1_000_000): Promise<Reconstructed> {
  const ts = createSSETransformStreamWithLogger(
    FORMATS.OPENAI_RESPONSES, // targetFormat — provider (Codex)
    FORMATS.CLAUDE, // sourceFormat — client (Claude Code)
    "codex",
    null,
    null,
    "gpt-5.5-high",
    "conn-5786",
    { model: "gpt-5.5-high" },
    null,
    null,
    null
  );

  const writer = ts.writable.getWriter();
  const reader = ts.readable.getReader();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const readAll = (async () => {
    const out: string[] = [];
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      out.push(decoder.decode(value));
    }
    return out.join("");
  })();

  for (let i = 0; i < rawSSE.length; i += chunkSize) {
    await writer.write(encoder.encode(rawSSE.slice(i, i + chunkSize)));
  }
  await writer.close();

  const raw = await readAll;

  let content = "";
  let thinking = "";
  for (const line of raw.split("\n")) {
    if (!line.startsWith("data:")) continue;
    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;
    try {
      const evt = JSON.parse(payload);
      if (evt.type === "content_block_delta") {
        if (evt.delta?.type === "text_delta") content += evt.delta.text;
        if (evt.delta?.type === "thinking_delta") thinking += evt.delta.thinking;
      }
    } catch {
      // ignore metadata comment lines / non-JSON
    }
  }
  return { raw, content, thinking };
}

test("#5786 (A) replayed Responses-API deltas (sequence_number <= last-seen) are dropped — no glued duplicate text", async () => {
  // Upstream reconnect/retry replays the same output_text.delta event with the SAME
  // sequence_number, producing the reported "...briefly.and I'll summarize briefly." glue.
  const rawEvents = [
    sse("response.created", { sequence_number: 0, response: { id: "resp_1", status: "in_progress" } }),
    sse("response.output_item.added", {
      sequence_number: 1,
      output_index: 0,
      item: { id: "msg_1", type: "message", content: [], role: "assistant" },
    }),
    sse("response.output_text.delta", {
      sequence_number: 2,
      item_id: "msg_1",
      output_index: 0,
      content_index: 0,
      delta: "Sure, and I'll summarize briefly.",
    }),
    // Replay of the same event (identical sequence_number) — must be dropped.
    sse("response.output_text.delta", {
      sequence_number: 2,
      item_id: "msg_1",
      output_index: 0,
      content_index: 0,
      delta: "and I'll summarize briefly.",
    }),
    sse("response.output_item.done", {
      sequence_number: 3,
      output_index: 0,
      item: {
        id: "msg_1",
        type: "message",
        content: [{ type: "output_text", text: "Sure, and I'll summarize briefly." }],
        role: "assistant",
      },
    }),
    sse("response.completed", {
      sequence_number: 4,
      response: { id: "resp_1", status: "completed", output: [], usage: { input_tokens: 10, output_tokens: 20 } },
    }),
  ];

  const { content } = await runClaudeFromCodex(rawEvents.join(""));

  assert.equal(content, "Sure, and I'll summarize briefly.");
  assert.ok(
    !content.includes("briefly.and I'll summarize briefly."),
    `duplicated/glued text leaked into client content: ${JSON.stringify(content)}`
  );
});

test("#5786 (A-guard) a well-behaved stream with strictly increasing sequence_number is passed through UNCHANGED", async () => {
  const rawEvents = [
    sse("response.created", { sequence_number: 0, response: { id: "resp_2", status: "in_progress" } }),
    sse("response.output_item.added", {
      sequence_number: 1,
      output_index: 0,
      item: { id: "msg_2", type: "message", content: [], role: "assistant" },
    }),
    sse("response.output_text.delta", {
      sequence_number: 2,
      item_id: "msg_2",
      output_index: 0,
      content_index: 0,
      delta: "Hello, ",
    }),
    sse("response.output_text.delta", {
      sequence_number: 3,
      item_id: "msg_2",
      output_index: 0,
      content_index: 0,
      delta: "world.",
    }),
    sse("response.output_text.delta", {
      sequence_number: 4,
      item_id: "msg_2",
      output_index: 0,
      content_index: 0,
      delta: " Bye.",
    }),
    sse("response.output_item.done", {
      sequence_number: 5,
      output_index: 0,
      item: {
        id: "msg_2",
        type: "message",
        content: [{ type: "output_text", text: "Hello, world. Bye." }],
        role: "assistant",
      },
    }),
    sse("response.completed", {
      sequence_number: 6,
      response: { id: "resp_2", status: "completed", output: [], usage: { input_tokens: 5, output_tokens: 8 } },
    }),
  ];

  // Byte-chunked to also prove line reassembly does not corrupt the dedup gate.
  const { content } = await runClaudeFromCodex(rawEvents.join(""), 1);

  assert.equal(content, "Hello, world. Bye.");
});

test("#5786 (B) reasoning summary that arrives ONLY on output_item.done is surfaced as a Claude thinking block (not dropped, not in content)", async () => {
  const reasoningText = "I'm thinking I need to read the file again.";
  const rawEvents = [
    sse("response.created", { sequence_number: 0, response: { id: "resp_3", status: "in_progress" } }),
    // Reasoning item announced...
    sse("response.output_item.added", {
      sequence_number: 1,
      output_index: 0,
      item: { id: "rs_3", type: "reasoning", summary: [] },
    }),
    // ...but the summary text is exposed ONLY on the terminal snapshot — no delta events.
    sse("response.output_item.done", {
      sequence_number: 2,
      output_index: 0,
      item: {
        id: "rs_3",
        type: "reasoning",
        summary: [{ type: "summary_text", text: reasoningText }],
        encrypted_content: "opaque-blob",
      },
    }),
    sse("response.output_item.added", {
      sequence_number: 3,
      output_index: 1,
      item: { id: "msg_3", type: "message", content: [], role: "assistant" },
    }),
    sse("response.output_text.delta", {
      sequence_number: 4,
      item_id: "msg_3",
      output_index: 1,
      content_index: 0,
      delta: "Sure thing.",
    }),
    sse("response.output_item.done", {
      sequence_number: 5,
      output_index: 1,
      item: {
        id: "msg_3",
        type: "message",
        content: [{ type: "output_text", text: "Sure thing." }],
        role: "assistant",
      },
    }),
    sse("response.completed", {
      sequence_number: 6,
      response: { id: "resp_3", status: "completed", output: [], usage: { input_tokens: 10, output_tokens: 20 } },
    }),
  ];

  const { content, thinking } = await runClaudeFromCodex(rawEvents.join(""));

  // Reasoning must surface in the thinking channel, exactly once...
  assert.equal(thinking, reasoningText);
  // ...and must NOT leak into the visible assistant content.
  assert.equal(content, "Sure thing.");
  assert.ok(!content.includes(reasoningText), `reasoning leaked into content: ${JSON.stringify(content)}`);
});

test("#5786 (B) a normal reasoning stream (with reasoning_summary_text.delta) still yields a thinking block and does NOT duplicate", async () => {
  const rawEvents = [
    sse("response.created", { sequence_number: 0, response: { id: "resp_4", status: "in_progress" } }),
    sse("response.output_item.added", {
      sequence_number: 1,
      output_index: 0,
      item: { id: "rs_4", type: "reasoning", summary: [] },
    }),
    sse("response.reasoning_summary_part.added", {
      sequence_number: 2,
      item_id: "rs_4",
      output_index: 0,
      summary_index: 0,
      part: { type: "summary_text", text: "" },
    }),
    sse("response.reasoning_summary_text.delta", {
      sequence_number: 3,
      item_id: "rs_4",
      output_index: 0,
      summary_index: 0,
      delta: "Considering the request. ",
    }),
    sse("response.reasoning_summary_text.delta", {
      sequence_number: 4,
      item_id: "rs_4",
      output_index: 0,
      summary_index: 0,
      delta: "Planning the answer.",
    }),
    sse("response.reasoning_summary_text.done", {
      sequence_number: 5,
      item_id: "rs_4",
      output_index: 0,
      summary_index: 0,
      text: "Considering the request. Planning the answer.",
    }),
    // Terminal reasoning snapshot carries the FULL summary — must NOT re-emit it.
    sse("response.output_item.done", {
      sequence_number: 6,
      output_index: 0,
      item: {
        id: "rs_4",
        type: "reasoning",
        summary: [{ type: "summary_text", text: "Considering the request. Planning the answer." }],
      },
    }),
    sse("response.output_item.added", {
      sequence_number: 7,
      output_index: 1,
      item: { id: "msg_4", type: "message", content: [], role: "assistant" },
    }),
    sse("response.output_text.delta", {
      sequence_number: 8,
      item_id: "msg_4",
      output_index: 1,
      content_index: 0,
      delta: "Here is the answer.",
    }),
    sse("response.output_item.done", {
      sequence_number: 9,
      output_index: 1,
      item: {
        id: "msg_4",
        type: "message",
        content: [{ type: "output_text", text: "Here is the answer." }],
        role: "assistant",
      },
    }),
    sse("response.completed", {
      sequence_number: 10,
      response: { id: "resp_4", status: "completed", output: [], usage: { input_tokens: 12, output_tokens: 15 } },
    }),
  ];

  const { content, thinking } = await runClaudeFromCodex(rawEvents.join(""), 7);

  assert.equal(thinking, "Considering the request. Planning the answer.");
  assert.equal(content, "Here is the answer.");
  // Duplication guard: the summary text must appear exactly once in the thinking channel.
  const firstIdx = thinking.indexOf("Considering the request.");
  const lastIdx = thinking.lastIndexOf("Considering the request.");
  assert.equal(firstIdx, lastIdx, `reasoning summary duplicated in thinking: ${JSON.stringify(thinking)}`);
});
