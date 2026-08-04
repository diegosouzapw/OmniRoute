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
  getConnectEndStreamError,
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

  it("rejects a frame whose payload is not valid JSON", () => {
    const bad = new Uint8Array(5 + 3);
    bad[0] = 0;
    bad[4] = 3;
    bad[5] = 0x7b; // {
    bad[6] = 0x7d; // }
    bad[7] = 0x2c; // , (trailing — invalid JSON)
    assert.throws(() => decodeConnectFrame(bad, 0), /invalid JSON/);
  });

  it("rejects compressed frames instead of parsing compressed bytes as JSON", () => {
    const framed = frameConnectMessage("{}");
    framed[0] = 1;
    assert.throws(() => decodeConnectFrame(framed, 0), /compressed frames/);
  });

  it("extracts Connect EndStream errors", () => {
    const framed = frameConnectMessage(
      JSON.stringify({ error: { code: "unauthenticated", message: "expired" } })
    );
    framed[0] = 2;
    const { frame } = decodeConnectFrame(framed, 0);
    assert.equal(
      frame ? getConnectEndStreamError(frame) : null,
      "unauthenticated: expired"
    );
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

describe("foldMessages", () => {
  it("returns empty prompt fields for empty input", () => {
    assert.deepEqual(foldMessages([]), { prompt: "", systemPrompt: "" });
  });

  it("returns user content as-is when only a user message is present", () => {
    assert.deepEqual(foldMessages([{ role: "user", content: "hi" }]), {
      prompt: "hi",
      systemPrompt: "",
    });
  });

  it("keeps system content separate for options.system_prompt", () => {
    const out = foldMessages([
      { role: "system", content: "Be terse." },
      { role: "user", content: "hi" },
    ]);
    assert.deepEqual(out, { prompt: "hi", systemPrompt: "Be terse." });
  });

  it("labels assistant turns and concatenates with prior user content", () => {
    const out = foldMessages([
      { role: "user", content: "q1" },
      { role: "assistant", content: "a1" },
      { role: "user", content: "q2" },
    ]);
    assert.deepEqual(out, {
      prompt: "q1\n\nAssistant: a1\n\nUser: q2",
      systemPrompt: "",
    });
  });

  it("accepts OpenAI text content parts without stringifying their structure", () => {
    const out = foldMessages([{ role: "user", content: [{ type: "text", text: "x" }] }]);
    assert.equal(out.prompt, "x");
  });

  it("rejects unsupported tool and multimodal content instead of silently dropping it", () => {
    assert.throws(
      () => foldMessages([{ role: "tool", content: "result" }]),
      /tool result messages/
    );
    assert.throws(
      () =>
        foldMessages([
          { role: "user", content: [{ type: "image_url", image_url: { url: "x" } }] },
        ]),
      /does not support image/
    );
  });
});
