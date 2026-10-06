// Perplexity moved the answer text out of `markdown_block` into `workflow_block`
// (`intended_usage: "workflow_root"`), streaming it as RFC-6902 patches whose
// `field` is `"workflow_block"` and whose paths address
// `/steps/<n>/items/<m>/payload/text_payload/chunks/<k>`.
//
// `extractContent` recognised neither shape: `isAnswerTextUsage("workflow_root")`
// is false, and the diff guard skipped every `field !== "markdown_block"` patch.
// The stream therefore completed with an empty accumulator and the executor
// surfaced "Provider returned empty content" while the upstream answer was
// present in the SSE all along.
//
// Fixtures below are trimmed from a live capture (pplx-auto, mode=copilot).

import test from "node:test";
import assert from "node:assert/strict";

const { extractContent } = await import("../../open-sse/executors/perplexity-web/protocol.ts");

function sseStream(events: unknown[]): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const chunks = events.map((e) => `event: message\r\ndata: ${JSON.stringify(e)}\r\n\r\n`);
  chunks.push("event: end_of_stream\r\n\r\n");
  const body = chunks.join("");
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(body));
      controller.close();
    },
  });
}

async function collect(events: unknown[]) {
  let answer = "";
  const deltas: string[] = [];
  for await (const chunk of extractContent(sseStream(events))) {
    if (chunk.error) throw new Error(chunk.error);
    if (typeof chunk.delta === "string") deltas.push(chunk.delta);
    if (typeof chunk.answer === "string") answer = chunk.answer;
  }
  return { answer, deltas };
}

const ANSWER_PART_1 = "- The Caspian Sea is the world's largest inland";
const ANSWER_PART_2 = " body of water by area, spanning about 371,000 square kilometers";
const ANSWER_PART_3 = " (143,200 square miles).[1][2]";
const FULL_ANSWER = ANSWER_PART_1 + ANSWER_PART_2 + ANSWER_PART_3;

// `add /steps/1` seeds the answer item; later `add …/chunks/<k>` frames append.
const STREAMING_EVENTS = [
  {
    status: "PENDING",
    backend_uuid: "76cf494e-2663-43e8-9382-5f37129707bb",
    blocks: [
      {
        intended_usage: "workflow_root",
        diff_block: {
          field: "workflow_block",
          patches: [
            { op: "replace", path: "/status", value: "WORKFLOW_EXECUTING_STEPS" },
            {
              op: "add",
              path: "/steps/1",
              value: {
                status: "WORKFLOW_PENDING",
                title: "",
                items: [
                  {
                    id: "45d63f9870ab45bc9bd10e8a264a6fc4",
                    type: "WORKFLOW_ITEM_TEXT",
                    payload: {
                      text_payload: {
                        text: "",
                        chunks: [ANSWER_PART_1],
                        variant: "answer",
                        is_streaming: true,
                      },
                    },
                    variant: "answer",
                  },
                ],
              },
            },
          ],
        },
      },
    ],
  },
  {
    status: "PENDING",
    blocks: [
      {
        intended_usage: "workflow_root",
        diff_block: {
          field: "workflow_block",
          patches: [
            {
              op: "add",
              path: "/steps/1/items/0/payload/text_payload/chunks/1",
              value: ANSWER_PART_2,
            },
          ],
        },
      },
    ],
  },
  {
    status: "COMPLETED",
    final_sse_message: true,
    blocks: [
      {
        intended_usage: "workflow_root",
        diff_block: {
          field: "workflow_block",
          patches: [
            { op: "replace", path: "/status", value: "WORKFLOW_COMPLETED" },
            {
              op: "add",
              path: "/steps/1/items/0/payload/text_payload/chunks/2",
              value: ANSWER_PART_3,
            },
            {
              op: "replace",
              path: "/steps/1/items/0/payload/text_payload/is_streaming",
              value: false,
            },
          ],
        },
      },
    ],
  },
];

test("extractContent reconstructs the answer from workflow_block diff patches", async () => {
  const { answer, deltas } = await collect(STREAMING_EVENTS);

  assert.equal(answer, FULL_ANSWER);
  assert.equal(deltas.join(""), FULL_ANSWER, "deltas must concatenate to the full answer");
  assert.ok(deltas.length > 1, "streaming must emit incremental deltas, not one final blob");
});

// A reconnect (or a truncated diff track) can deliver only the materialized
// workflow_block on the terminal frame — the answer must still be recovered.
test("extractContent reads a materialized workflow_block on the COMPLETED frame", async () => {
  const { answer } = await collect([
    {
      status: "COMPLETED",
      final_sse_message: true,
      blocks: [
        {
          intended_usage: "workflow_root",
          workflow_block: {
            status: "WORKFLOW_COMPLETED",
            steps: [
              {
                status: "WORKFLOW_COMPLETED",
                title: "Searching the web",
                tool_name: "search_web",
                items: [{ type: "WORKFLOW_ITEM_QUERIES", payload: { queries_payload: {} } }],
              },
              {
                status: "WORKFLOW_COMPLETED",
                title: "",
                items: [
                  {
                    type: "WORKFLOW_ITEM_TEXT",
                    payload: {
                      text_payload: {
                        text: FULL_ANSWER,
                        chunks: [ANSWER_PART_1, ANSWER_PART_2, ANSWER_PART_3],
                        variant: "answer",
                        is_streaming: false,
                      },
                    },
                    variant: "answer",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ]);

  assert.equal(answer, FULL_ANSWER);
});

// Non-answer workflow items (search queries, sources) must never leak into the
// assistant message.
test("extractContent ignores non-answer workflow items", async () => {
  const { answer } = await collect([
    {
      status: "COMPLETED",
      final_sse_message: true,
      blocks: [
        {
          intended_usage: "workflow_root",
          workflow_block: {
            status: "WORKFLOW_COMPLETED",
            steps: [
              {
                items: [
                  {
                    type: "WORKFLOW_ITEM_TEXT",
                    payload: {
                      text_payload: {
                        text: "Searching the web for facts",
                        chunks: ["Searching the web for facts"],
                        variant: "thinking",
                      },
                    },
                    variant: "thinking",
                  },
                  {
                    type: "WORKFLOW_ITEM_TEXT",
                    payload: {
                      text_payload: {
                        text: FULL_ANSWER,
                        chunks: [FULL_ANSWER],
                        variant: "answer",
                      },
                    },
                    variant: "answer",
                  },
                ],
              },
            ],
          },
        },
      ],
    },
  ]);

  assert.equal(answer, FULL_ANSWER);
});

// Guard the pre-existing markdown_block path against regression from the fix.
test("extractContent still handles legacy markdown_block diffs", async () => {
  const { answer } = await collect([
    {
      status: "PENDING",
      blocks: [
        {
          intended_usage: "ask_text",
          diff_block: {
            field: "markdown_block",
            patches: [{ op: "replace", path: "", value: { chunks: [ANSWER_PART_1] } }],
          },
        },
      ],
    },
    {
      status: "COMPLETED",
      final_sse_message: true,
      blocks: [
        {
          intended_usage: "ask_text",
          markdown_block: { chunks: [ANSWER_PART_1, ANSWER_PART_2, ANSWER_PART_3] },
        },
      ],
    },
  ]);

  assert.equal(answer, FULL_ANSWER);
});
