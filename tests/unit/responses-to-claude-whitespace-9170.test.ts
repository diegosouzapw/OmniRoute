import test from "node:test";
import assert from "node:assert/strict";

import { createSSETransformStreamWithLogger } from "@omniroute/open-sse/utils/stream.ts";
import { FORMATS } from "@omniroute/open-sse/translator/formats.ts";

function sse(type: string, payload: Record<string, unknown>): string {
  return `event: ${type}\ndata: ${JSON.stringify({ type, ...payload })}\n\n`;
}

async function runClaudeFromCodex(rawSse: string): Promise<string> {
  const transform = createSSETransformStreamWithLogger(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.CLAUDE,
    "codex",
    null,
    null,
    "gpt-5.5-high",
    "conn-9170",
    { model: "gpt-5.5-high" },
    null,
    null,
    null
  );

  const writer = transform.writable.getWriter();
  const reader = transform.readable.getReader();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const readAll = (async () => {
    const output: string[] = [];

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      output.push(decoder.decode(value));
    }

    return output.join("");
  })();

  // Deliberately split the wire stream into single-byte writes to exercise
  // the same buffering and SSE reconstruction used by the live path.
  for (let index = 0; index < rawSse.length; index += 1) {
    await writer.write(encoder.encode(rawSse.slice(index, index + 1)));
  }

  await writer.close();

  const rawClaudeSse = await readAll;
  let content = "";

  for (const line of rawClaudeSse.split("\n")) {
    if (!line.startsWith("data:")) continue;

    const payload = line.slice(5).trim();
    if (!payload || payload === "[DONE]") continue;

    try {
      const event = JSON.parse(payload) as {
        type?: string;
        delta?: {
          type?: string;
          text?: string;
        };
      };

      if (event.type === "content_block_delta" && event.delta?.type === "text_delta") {
        content += event.delta.text ?? "";
      }
    } catch {
      // Ignore metadata comments and non-JSON SSE lines.
    }
  }

  return content;
}

test("#9170 Responses-to-Claude streaming preserves standalone whitespace deltas", async () => {
  const deltas = [
    "cleanup",
    "\n\n",
    "### Context",
    "\n",
    "ADR-R08",
    "\n\n",
    "```text",
    "\n",
    "ironbox://worker/<worker-name>",
    "\n",
    "```",
    "\n\n",
    "contain",
    " ",
    "1–253 bytes",
  ];

  const expected = deltas.join("");
  let sequenceNumber = 0;

  const rawSse = [
    sse("response.created", {
      sequence_number: sequenceNumber++,
      response: {
        id: "resp_9170",
        object: "response",
        model: "gpt-5.5-high",
        status: "in_progress",
        output: [],
      },
    }),
    sse("response.output_item.added", {
      sequence_number: sequenceNumber++,
      output_index: 0,
      item: {
        id: "msg_9170",
        type: "message",
        role: "assistant",
        content: [],
      },
    }),
    ...deltas.map((delta) =>
      sse("response.output_text.delta", {
        sequence_number: sequenceNumber++,
        item_id: "msg_9170",
        output_index: 0,
        content_index: 0,
        delta,
      })
    ),
    sse("response.output_item.done", {
      sequence_number: sequenceNumber++,
      output_index: 0,
      item: {
        id: "msg_9170",
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: expected }],
      },
    }),
    sse("response.completed", {
      sequence_number: sequenceNumber++,
      response: {
        id: "resp_9170",
        object: "response",
        model: "gpt-5.5-high",
        status: "completed",
        output: [],
        usage: {
          input_tokens: 10,
          output_tokens: 20,
          total_tokens: 30,
        },
      },
    }),
  ].join("");

  const actual = await runClaudeFromCodex(rawSse);

  assert.equal(actual, expected);
  assert.match(actual, /cleanup\n\n### Context\nADR-R08/);
  assert.match(actual, /```text\nironbox:\/\/worker\/<worker-name>\n```/);
  assert.match(actual, /contain 1–253 bytes$/);
});
