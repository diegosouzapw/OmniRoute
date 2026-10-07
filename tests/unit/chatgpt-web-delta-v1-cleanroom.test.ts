import assert from "node:assert/strict";
import { describe, test } from "node:test";

import {
  ChatGptWebDeltaV1Decoder,
  parseChatGptWebEncodedItem,
} from "../../open-sse/utils/chatgptWebDeltaV1.ts";

function sse(event: string | null, data: unknown): string {
  const eventLine = event ? `event: ${event}\n` : "";
  const payload = typeof data === "string" && data === "[DONE]" ? data : JSON.stringify(data);
  return `${eventLine}data: ${payload}\n\n`;
}

describe("ChatGPT Web clean-room delta_encoding v1", () => {
  test("parses multiple SSE frames and joins multiline data fields", () => {
    const events = parseChatGptWebEncodedItem(
      'event: delta_encoding\ndata: "v1"\n\n' +
        "event: note\ndata: first\ndata: second\n\n" +
        "data: [DONE]\n\n"
    );

    assert.deepEqual(events, [
      { event: "delta_encoding", data: '"v1"', json: "v1", done: false },
      { event: "note", data: "first\nsecond", done: false },
      { event: "message", data: "[DONE]", done: true },
    ]);
  });

  test("reconstructs inherited append operations and an ordered terminal patch", () => {
    const decoder = new ChatGptWebDeltaV1Decoder();
    decoder.ingest(sse("delta_encoding", "v1"));
    decoder.ingest(
      sse("delta", {
        p: "",
        o: "add",
        v: {
          message: {
            author: { role: "assistant" },
            content: { content_type: "text", parts: [""] },
            status: "in_progress",
            end_turn: null,
            metadata: { model_slug: "gpt-5-6-thinking" },
          },
        },
      })
    );
    decoder.ingest(sse("delta", { p: "/message/content/parts/0", o: "append", v: "CLEAN" }));
    decoder.ingest(sse("delta", { v: "ROOM_MIT" }));
    decoder.ingest(
      sse("delta", {
        p: "",
        o: "patch",
        v: [
          { p: "/message/content/parts/0", o: "append", v: "M_OK" },
          { p: "/message/status", o: "replace", v: "finished_successfully" },
          { p: "/message/end_turn", o: "replace", v: true },
          { p: "/message/metadata", o: "append", v: { finish_source: "cleanroom" } },
        ],
      })
    );
    const terminal = decoder.ingest(sse(null, "[DONE]"));

    assert.equal(terminal.done, true);
    assert.deepEqual(decoder.snapshot(), {
      message: {
        author: { role: "assistant" },
        content: { content_type: "text", parts: ["CLEANROOM_MITM_OK"] },
        status: "finished_successfully",
        end_turn: true,
        metadata: {
          model_slug: "gpt-5-6-thinking",
          finish_source: "cleanroom",
        },
      },
    });
  });

  test("preserves Unicode, newlines, backslashes, and brackets across delta boundaries", () => {
    const decoder = new ChatGptWebDeltaV1Decoder();
    decoder.ingest(sse("delta_encoding", "v1"));
    decoder.ingest(
      sse("delta", {
        p: "",
        o: "add",
        v: { message: { content: { content_type: "text", parts: [""] } } },
      })
    );
    decoder.ingest(
      sse("delta", {
        p: "/message/content/parts/0",
        o: "append",
        v: "첫째: CLEANROOM_한글_🙂\n",
      })
    );
    decoder.ingest(sse("delta", { v: "둘째: alpha\\beta[gamma]" }));

    const document = decoder.snapshot() as {
      message: { content: { parts: string[] } };
    };
    assert.equal(
      document.message.content.parts[0],
      "첫째: CLEANROOM_한글_🙂\n둘째: alpha\\beta[gamma]"
    );
  });

  test("supports array and object append without aliasing caller-owned values", () => {
    const decoder = new ChatGptWebDeltaV1Decoder();
    const initial = { list: ["a"], metadata: { first: true } };
    decoder.ingest(sse("delta_encoding", "v1"));
    decoder.ingest(sse("delta", { p: "", o: "add", v: initial }));
    decoder.ingest(sse("delta", { p: "/list", o: "append", v: ["b", "c"] }));
    decoder.ingest(sse("delta", { p: "/metadata", o: "append", v: { second: true } }));

    initial.list.push("mutated-outside");
    initial.metadata.first = false;
    assert.deepEqual(decoder.snapshot(), {
      list: ["a", "b", "c"],
      metadata: { first: true, second: true },
    });
  });

  test("resets inherited operation state on a new encoding declaration", () => {
    const decoder = new ChatGptWebDeltaV1Decoder();
    decoder.ingest(sse("delta_encoding", "v1"));
    decoder.ingest(sse("delta", { p: "", o: "add", v: { text: "a" } }));
    decoder.ingest(sse("delta_encoding", "v1"));

    assert.throws(
      () => decoder.ingest(sse("delta", { v: "orphan" })),
      /current or inherited path and operation/
    );
  });

  test("rejects prototype-polluting JSON Pointer segments", () => {
    const decoder = new ChatGptWebDeltaV1Decoder();
    decoder.ingest(sse("delta_encoding", "v1"));
    decoder.ingest(sse("delta", { p: "", o: "add", v: {} }));

    assert.throws(
      () => decoder.ingest(sse("delta", { p: "/__proto__/polluted", o: "add", v: true })),
      /Unsafe JSON Pointer segment/
    );
    assert.equal(({} as { polluted?: boolean }).polluted, undefined);
  });

  test("rejects unsupported encodings and operations", () => {
    const decoder = new ChatGptWebDeltaV1Decoder();
    assert.throws(() => decoder.ingest(sse("delta_encoding", "v2")), /Unsupported/);

    decoder.ingest(sse("delta_encoding", "v1"));
    assert.throws(
      () => decoder.ingest(sse("delta", { p: "", o: "remove", v: null })),
      /Unsupported delta operation/
    );
  });
});
