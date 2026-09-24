import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createClaudeWebResponse } from "../../open-sse/executors/claude-web/stream.ts";

function byteStream(text: string, chunkSizes: number[] = []): ReadableStream<Uint8Array> {
  const bytes = new TextEncoder().encode(text);
  return new ReadableStream<Uint8Array>({
    start(controller) {
      let offset = 0;
      for (const size of chunkSizes) {
        if (offset >= bytes.length) break;
        controller.enqueue(bytes.slice(offset, Math.min(offset + size, bytes.length)));
        offset += size;
      }
      if (offset < bytes.length) controller.enqueue(bytes.slice(offset));
      controller.close();
    },
  });
}

function frames(events: Array<Record<string, unknown>>): string {
  return events.map((event) => `data: ${JSON.stringify(event)}\n\n`).join("");
}

function persianTextEvents(text: string): Array<Record<string, unknown>> {
  return [
    { type: "message_start", message: { model: "claude-sonnet-5" } },
    { type: "content_block_start", index: 0, content_block: { type: "text" } },
    { type: "content_block_delta", index: 0, delta: { type: "text_delta", text } },
    { type: "content_block_stop", index: 0 },
    { type: "message_delta", delta: { stop_reason: "end_turn" } },
    { type: "message_stop" },
  ];
}

describe("Claude Web UTF-8 text preservation (#13416)", () => {
  const persianSamples = [
    { label: "simple Persian greeting", text: "سلام" },
    { label: "full Persian sentence", text: "سلام! این پیام یک تست ساده به نظر می‌رسه." },
    { label: "Arabic text", text: "مرحبا بكم في هذا التطبيق" },
    {
      label: "mixed script with emoji",
      text: "سلام world 你好 🌍",
    },
    {
      label: "Persian with diacritics and punctuation",
      text: "\u06F1\u06F2\u06F3\u06F4\u06F5\u06F6\u06F7\u06F8\u06F9 \u2014 \u00AB\u00BB \u201E\u201C \u0633\u0644\u0627\u0645",
    },
  ];

  for (const { label, text } of persianSamples) {
    it(`preserves ${label} through streaming response`, async () => {
      const events = persianTextEvents(text);
      const response = await createClaudeWebResponse(byteStream(frames(events)), {
        model: "claude-sonnet-5",
        stream: true,
        responseMetadata: {},
        onComplete() {},
        onFailure() {},
      });

      assert.equal(response.status, 200);
      const contentType = response.headers.get("Content-Type") ?? "";
      assert.match(contentType, /text\/event-stream/, "should be event-stream");
      assert.match(contentType, /charset=utf-8/, "should include charset=utf-8");

      const output = await response.text();
      // Re-extract the content text from SSE chunks
      let accumulated = "";
      for (const frame of output.split(/\r?\n\r?\n/)) {
        const dataLines = frame
          .split(/\r?\n/)
          .filter((line) => line.startsWith("data:"))
          .map((line) => line.slice(5).trimStart());
        for (const data of dataLines) {
          if (data === "[DONE]") continue;
          try {
            const parsed = JSON.parse(data) as Record<string, unknown>;
            const choices = parsed.choices as
              Array<{ delta?: Record<string, unknown> }> | undefined;
            const content = choices?.[0]?.delta?.content;
            if (typeof content === "string") accumulated += content;
          } catch {
            // skip non-JSON frames
          }
        }
      }
      assert.equal(
        accumulated,
        text,
        `streaming response should preserve ${label} without mojibake`
      );
    });

    it(`preserves ${label} through buffered response`, async () => {
      const events = persianTextEvents(text);
      const response = await createClaudeWebResponse(byteStream(frames(events)), {
        model: "claude-sonnet-5",
        stream: false,
        responseMetadata: {},
        onComplete() {},
        onFailure() {},
      });

      assert.equal(response.status, 200);
      const contentType = response.headers.get("Content-Type") ?? "";
      assert.match(contentType, /application\/json/, "should be application/json");
      assert.match(contentType, /charset=utf-8/, "should include charset=utf-8");

      const body = (await response.json()) as {
        choices: Array<{ message: { content: string } }>;
      };
      assert.equal(
        body.choices[0].message.content,
        text,
        `buffered response should preserve ${label} without mojibake`
      );
    });
  }

  it("preserves multi-byte text split across chunk boundaries", async () => {
    // "سلام" is 8 bytes in UTF-8: D8 B3 D9 84 D8 A7 D9 85
    // Deliberately split at byte boundaries to ensure partial multi-byte chars are handled
    const text = "سلام دنیا";
    const events = persianTextEvents(text);
    const source = frames(events);
    // Split into 3-byte chunks which will cut through multi-byte sequences
    const response = await createClaudeWebResponse(byteStream(source, [3, 5, 7, 13]), {
      model: "claude-sonnet-5",
      stream: true,
      responseMetadata: {},
      onComplete() {},
      onFailure() {},
    });

    assert.equal(response.status, 200);
    const output = await response.text();
    let accumulated = "";
    for (const frame of output.split(/\r?\n\r?\n/)) {
      const dataLines = frame
        .split(/\r?\n/)
        .filter((line) => line.startsWith("data:"))
        .map((line) => line.slice(5).trimStart());
      for (const data of dataLines) {
        if (data === "[DONE]") continue;
        try {
          const parsed = JSON.parse(data) as Record<string, unknown>;
          const choices = parsed.choices as Array<{ delta?: Record<string, unknown> }> | undefined;
          const content = choices?.[0]?.delta?.content;
          if (typeof content === "string") accumulated += content;
        } catch {
          // skip non-JSON frames
        }
      }
    }
    assert.equal(accumulated, text, "chunk boundary split should not produce mojibake");
  });

  it("byte-level repro: naive per-chunk decode (no TextDecoder stream state) IS the actual mojibake mechanism, and OmniRoute's real pipeline already avoids it independent of the Content-Type header", async () => {
    // Isolate the real root cause behind #13416: a multi-byte UTF-8 sequence split
    // across a network chunk boundary. Every Persian/Arabic letter is 2 bytes in UTF-8
    // (0xD8/0xD9 lead byte + 0x80-0xBF continuation byte), so splitting 1 byte into the
    // first character of the delta text guarantees the cut lands mid-sequence.
    const text = "سلام";
    const events = persianTextEvents(text);
    const source = frames(events);
    const bytes = new TextEncoder().encode(source);
    const prefixLen = source.indexOf(text); // everything before the text is plain ASCII
    const splitPoint = prefixLen + 1; // 1 byte into the first 2-byte Arabic character
    const chunk1 = bytes.slice(0, splitPoint);
    const chunk2 = bytes.slice(splitPoint);

    // (a) Reproduce the garbling mechanism directly: decoding each chunk independently,
    // WITHOUT { stream: true }, is what actually corrupts a split multi-byte sequence —
    // this is the byte-level mechanism a "charset=utf-8" header can never fix or cause.
    const naiveDecoded = new TextDecoder().decode(chunk1) + new TextDecoder().decode(chunk2);
    assert.notEqual(
      naiveDecoded,
      source,
      "sanity check: naive decode-without-stream-state must actually corrupt the split character"
    );
    assert.match(
      naiveDecoded,
      /�/,
      "naive per-chunk decode should surface U+FFFD at the split multi-byte sequence"
    );

    // (b) Feed the exact same byte split through OmniRoute's real claude-web pipeline
    // (decodeSseData's TextDecoder is constructed once and called with { stream: true }
    // across reads — see open-sse/executors/claude-web/stream.ts). This must reconstruct
    // the original text losslessly regardless of the Content-Type header on the response.
    const splitSource = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(chunk1);
        controller.enqueue(chunk2);
        controller.close();
      },
    });
    const response = await createClaudeWebResponse(splitSource, {
      model: "claude-sonnet-5",
      stream: true,
      responseMetadata: {},
      onComplete() {},
      onFailure() {},
    });
    const output = await response.text();
    let accumulated = "";
    for (const frame of output.split(/\r?\n\r?\n/)) {
      const dataLines = frame
        .split(/\r?\n/)
        .filter((l) => l.startsWith("data:"))
        .map((l) => l.slice(5).trimStart());
      for (const data of dataLines) {
        if (data === "[DONE]") continue;
        try {
          const parsed = JSON.parse(data) as Record<string, unknown>;
          const choices = parsed.choices as Array<{ delta?: Record<string, unknown> }> | undefined;
          const content = choices?.[0]?.delta?.content;
          if (typeof content === "string") accumulated += content;
        } catch {
          // skip non-JSON frames (e.g. this minimal event stream never emits message_stop)
        }
      }
    }
    assert.equal(
      accumulated,
      text,
      "OmniRoute's own stream:true decode must reconstruct the split character correctly, " +
        "proving the reported mojibake is not caused by OmniRoute's chunk-boundary handling"
    );
  });
});
