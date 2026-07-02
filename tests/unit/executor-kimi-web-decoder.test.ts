// Tests for the Connect frame decoder and event-delta extractor that back
// the international Kimi web executor (www.kimi.com Connect-RPC API).
//
// These tests pin the wire-format parsing that the executor relies on —
// the riskiest piece of the migration per code review (PR #5858, I3).

import { describe, it } from "node:test";
import assert from "node:assert/strict";

const {
  frameConnectMessage,
  decodeConnectFrame,
  extractDelta,
  isEndOfStream,
  foldMessages,
} = await import("../../open-sse/executors/kimi-web.ts");

describe("frameConnectMessage + decodeConnectMessage round-trip", () => {
  it("round-trips a JSON payload through frame and decode", () => {
    const json = '{"hello":"world"}';
    const framed = frameConnectMessage(json);
    assert.equal(framed.length, 5 + json.length);
    // First byte is flags = 0 (uncompressed).
    assert.equal(framed[0], 0);
    // Bytes 1-4 are big-endian length.
    const len = (framed[1] << 24) | (framed[2] << 16) | (framed[3] << 8) | framed[4];
    assert.equal(len, json.length);

    const { consumed, frame } = decodeConnectFrame(framed, 0);
    assert.equal(consumed, framed.length);
    assert.equal(frame?.flags, 0);
    assert.deepEqual(frame?.message, { hello: "world" });
  });

  it("returns consumed=0 when the buffer has fewer than 5 bytes (need more)", () => {
    const short = new Uint8Array([0x00, 0x00, 0x00]);
    const { consumed, frame } = decodeConnectFrame(short, 0);
    assert.equal(consumed, 0);
    assert.equal(frame, null);
  });

  it("returns consumed=0 when the buffer has header but not enough payload yet", () => {
    // Header claims 100 bytes of payload, but we only have 5 header + 10 payload.
    const partial = new Uint8Array(15);
    partial[0] = 0;
    partial[1] = 0;
    partial[2] = 0;
    partial[3] = 0;
    partial[4] = 100;
    const { consumed, frame } = decodeConnectFrame(partial, 0);
    assert.equal(consumed, 0);
    assert.equal(frame, null);
  });

  it("consumes the first frame and leaves the rest in the buffer for the next call", () => {
    const a = frameConnectMessage('{"a":1}');
    const b = frameConnectMessage('{"b":2}');
    const merged = new Uint8Array(a.length + b.length);
    merged.set(a, 0);
    merged.set(b, a.length);

    const first = decodeConnectFrame(merged, 0);
    assert.equal(first.consumed, a.length);
    assert.deepEqual(first.frame?.message, { a: 1 });

    const second = decodeConnectFrame(merged, first.consumed);
    assert.equal(second.consumed, b.length);
    assert.deepEqual(second.frame?.message, { b: 2 });
  });

  it("decodes a frame whose length has the high bit (bit 31) set without sign issues", () => {
    // Construct a header claiming length 2,147,483,648 (0x80000000) — the
    // signed-shift bug would read this as -2147483648. With the decoder's
    // correction it should be treated as MAX_FRAME_LEN+1 and consumed=-1.
    const oversized = new Uint8Array(5);
    oversized[0] = 0;
    oversized[1] = 0x80;
    oversized[2] = 0x00;
    oversized[3] = 0x00;
    oversized[4] = 0x00;
    const { consumed } = decodeConnectFrame(oversized, 0);
    assert.equal(consumed, -1, "frames above MAX_FRAME_LEN must signal -1");
  });

  it("returns a null message (still consumed) when payload is not valid JSON", () => {
    const bad = new Uint8Array(5 + 3);
    bad[0] = 0;
    bad[4] = 3;
    bad[5] = 0x7b; // {
    bad[6] = 0x7d; // }
    bad[7] = 0x2c; // , (trailing — invalid JSON)
    const { consumed, frame } = decodeConnectFrame(bad, 0);
    assert.equal(consumed, 8);
    assert.equal(frame?.message, null);
    assert.equal(frame?.flags, 0);
  });
});

describe("extractDelta", () => {
  it("returns null on null/empty input", () => {
    assert.equal(extractDelta(null), null);
  });

  it("returns null on heartbeats and unrelated events", () => {
    assert.equal(extractDelta({ heartbeat: {} }), null);
    assert.equal(extractDelta({ op: "set", mask: "chat.name" }), null);
    assert.equal(extractDelta({ op: "set", mask: "block.stage" }), null);
  });

  it("extracts initial answer text from op=set, mask=block.text", () => {
    const delta = extractDelta({
      op: "set",
      mask: "block.text",
      block: { text: { content: "Hello" } },
    });
    assert.deepEqual(delta, { kind: "text", text: "Hello" });
  });

  it("extracts answer delta from op=append, mask=block.text.content", () => {
    const delta = extractDelta({
      op: "append",
      mask: "block.text.content",
      block: { text: { content: " world" } },
    });
    assert.deepEqual(delta, { kind: "text", text: " world" });
  });

  it("extracts initial reasoning from op=set, mask=block.think", () => {
    const delta = extractDelta({
      op: "set",
      mask: "block.think",
      block: { think: { content: "Reasoning..." } },
    });
    assert.deepEqual(delta, { kind: "think", text: "Reasoning..." });
  });

  it("extracts reasoning delta from op=append, mask=block.think.content", () => {
    const delta = extractDelta({
      op: "append",
      mask: "block.think.content",
      block: { think: { content: " continued" } },
    });
    assert.deepEqual(delta, { kind: "think", text: " continued" });
  });

  it("returns null when content is empty (no useful delta)", () => {
    assert.equal(
      extractDelta({ op: "set", mask: "block.text", block: { text: { content: "" } } }),
      null
    );
    assert.equal(
      extractDelta({ op: "append", mask: "block.text.content", block: { text: {} } }),
      null
    );
  });
});

describe("isEndOfStream", () => {
  it("returns true when assistant message flips to MESSAGE_STATUS_COMPLETED", () => {
    assert.equal(
      isEndOfStream({
        op: "set",
        mask: "message",
        message: { role: "assistant", status: "MESSAGE_STATUS_COMPLETED" },
      }),
      true
    );
  });

  it("returns false for non-assistant completed messages (system/user)", () => {
    assert.equal(
      isEndOfStream({
        op: "set",
        mask: "message",
        message: { role: "user", status: "MESSAGE_STATUS_COMPLETED" },
      }),
      false
    );
  });

  it("returns false for assistant messages that are still generating", () => {
    assert.equal(
      isEndOfStream({
        op: "set",
        mask: "message",
        message: { role: "assistant", status: "MESSAGE_STATUS_GENERATING" },
      }),
      false
    );
  });

  it("returns false for non-message events", () => {
    assert.equal(isEndOfStream({ heartbeat: {} }), false);
    assert.equal(isEndOfStream(null), false);
  });
});

describe("foldMessages", () => {
  it("returns empty string for empty input", () => {
    assert.equal(foldMessages([]), "");
  });

  it("returns user content as-is when only a user message is present", () => {
    assert.equal(foldMessages([{ role: "user", content: "hi" }]), "hi");
  });

  it("prepends system content to user content", () => {
    const out = foldMessages([
      { role: "system", content: "Be terse." },
      { role: "user", content: "hi" },
    ]);
    assert.equal(out, "Be terse.\n\nhi");
  });

  it("labels assistant turns and concatenates with prior user content", () => {
    const out = foldMessages([
      { role: "user", content: "q1" },
      { role: "assistant", content: "a1" },
      { role: "user", content: "q2" },
    ]);
    assert.equal(out, "q1\n\nAssistant: a1\n\nq2");
  });

  it("stringifies non-string content (arrays/objects) instead of dropping it", () => {
    const out = foldMessages([{ role: "user", content: [{ type: "text", text: "x" }] }]);
    assert.ok(out.includes("text"));
    assert.ok(out.includes("x"));
  });

  it("silently drops tool/function messages (limitation: kimi-web is single-turn)", () => {
    const out = foldMessages([
      { role: "user", content: "hi" },
      { role: "tool", content: "result" },
      { role: "function", content: "fn-result" },
    ]);
    // Tool/function messages contribute nothing; user content survives.
    assert.equal(out, "hi");
  });
});
