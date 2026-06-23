import test from "node:test";
import assert from "node:assert/strict";

// #4042 — Microsoft 365 Copilot (individual / Substrate BizChat) frame mapping.
// Fixtures below are taken from @skyzea1's real, sanitized capture of an
// `m365.cloud.microsoft/chat` round-trip (test prompt → one-word "pong" reply).
// These pin the wire format so the executor's encode/decode cannot drift; the
// live socket round-trip is the separate Rule #18 validation gate.

import {
  RECORD_SEPARATOR,
  encodeFrame,
  handshakeFrame,
  keepaliveFrame,
  splitFrames,
  parseFrame,
  handshakeError,
  buildChatInvocation,
  isUpdateFrame,
  isCompletionFrame,
  isLastUpdate,
  extractBotText,
  incrementalDelta,
} from "../../open-sse/executors/copilot-m365-frames.ts";

// ── Real captured frames (#4042) ──────────────────────────────────────────

const HANDSHAKE_ACK = {}; // SignalR success ack
const PROGRESS_UPDATE = {
  type: 1,
  target: "update",
  arguments: [{ messages: [{ messageType: "Progress", author: "bot" }] }],
};
const BOT_UPDATE = {
  type: 1,
  target: "update",
  arguments: [
    {
      messages: [
        {
          text: "pong",
          author: "bot",
          responseIdentifier: "Default",
          messageId: "00000000-0000-0000-0000-000000000001",
          requestId: "trace-id",
          adaptiveCards: [
            { type: "AdaptiveCard", version: "1.0", body: [{ type: "TextBlock", text: "pong" }] },
          ],
          sourceAttributions: [],
          contentOrigin: "DeepLeo",
        },
      ],
      nonce: "nonce",
      requestId: "trace-id",
    },
  ],
};
const FINAL_UPDATE = {
  type: 1,
  target: "update",
  arguments: [
    {
      messages: [
        { text: "pong", author: "bot", sourceAttributions: [], references: {}, contentOrigin: "DeepLeo" },
      ],
      isLastUpdate: true,
      requestId: "trace-id",
    },
  ],
};
const FINAL_ITEM = { type: 2, invocationId: "0", item: { messages: [], requestId: "trace-id" } };
const COMPLETION = { type: 3, invocationId: "0" };

// ── Framing ────────────────────────────────────────────────────────────────

test("RECORD_SEPARATOR is the SignalR 0x1e control char", () => {
  assert.equal(RECORD_SEPARATOR, String.fromCharCode(0x1e));
  assert.equal(RECORD_SEPARATOR.charCodeAt(0), 0x1e);
});

test("handshakeFrame / keepaliveFrame emit the exact SignalR bytes", () => {
  assert.equal(handshakeFrame(), `{"protocol":"json","version":1}` + RECORD_SEPARATOR);
  assert.equal(keepaliveFrame(), `{"type":6}` + RECORD_SEPARATOR);
});

test("encodeFrame appends the record separator", () => {
  assert.equal(encodeFrame({ a: 1 }), `{"a":1}` + RECORD_SEPARATOR);
});

test("splitFrames separates complete frames and keeps the trailing partial", () => {
  const buffer = encodeFrame(HANDSHAKE_ACK) + encodeFrame(BOT_UPDATE) + `{"type":1,"par`;
  const { frames, rest } = splitFrames(buffer);
  assert.equal(frames.length, 2);
  assert.deepEqual(parseFrame(frames[0]), {});
  assert.equal(isUpdateFrame(parseFrame(frames[1])), true);
  assert.equal(rest, `{"type":1,"par`);
});

test("splitFrames returns empty rest when the buffer ends on a separator", () => {
  const { frames, rest } = splitFrames(encodeFrame(COMPLETION));
  assert.equal(frames.length, 1);
  assert.equal(rest, "");
});

// ── Handshake ────────────────────────────────────────────────────────────

test("handshakeError is null on the {} ack and surfaces an error string", () => {
  assert.equal(handshakeError(parseFrame(encodeFrame(HANDSHAKE_ACK).slice(0, -1))), null);
  assert.equal(handshakeError({ error: "bad handshake" }), "bad handshake");
});

// ── Send (type:4) ──────────────────────────────────────────────────────────

test("buildChatInvocation produces a type:4 chat invocation carrying the user text", () => {
  const frame = buildChatInvocation({
    text: "protocol capture test. Reply with one word: pong.",
    traceId: "trace-id",
    sessionId: "session-id",
    isStartOfSession: true,
  });
  assert.equal(frame.type, 4);
  assert.equal(frame.target, "chat");
  assert.equal(frame.invocationId, "0");
  const arg = (frame.arguments as Array<Record<string, unknown>>)[0];
  assert.equal(arg.source, "officeweb");
  assert.equal(arg.streamingMode, "ConciseWithPadding");
  assert.equal(arg.traceId, "trace-id");
  assert.equal(arg.clientCorrelationId, "trace-id");
  assert.equal(arg.sessionId, "session-id");
  assert.equal(arg.isStartOfSession, true);
  assert.ok(Array.isArray(arg.allowedMessageTypes));
  assert.ok((arg.allowedMessageTypes as string[]).includes("Chat"));
  const message = arg.message as Record<string, unknown>;
  assert.equal(message.author, "user");
  assert.equal(message.inputMethod, "Keyboard");
  assert.equal(message.messageType, "Chat");
  assert.equal(message.text, "protocol capture test. Reply with one word: pong.");
});

test("buildChatInvocation serializes/round-trips through the framing", () => {
  const frame = buildChatInvocation({ text: "hi", traceId: "t", sessionId: "s" });
  const wire = encodeFrame(frame);
  assert.ok(wire.endsWith(RECORD_SEPARATOR));
  const { frames } = splitFrames(wire);
  assert.deepEqual(parseFrame(frames[0]), frame);
});

// ── Response decode (type:1/2/3) ─────────────────────────────────────────

test("isUpdateFrame / isCompletionFrame classify the captured frames", () => {
  assert.equal(isUpdateFrame(BOT_UPDATE), true);
  assert.equal(isUpdateFrame(FINAL_UPDATE), true);
  assert.equal(isUpdateFrame(COMPLETION), false);
  assert.equal(isUpdateFrame(FINAL_ITEM), false);
  assert.equal(isCompletionFrame(COMPLETION), true);
  assert.equal(isCompletionFrame(BOT_UPDATE), false);
  assert.equal(isCompletionFrame(FINAL_ITEM), false); // type:2 is the final item, not completion
});

test("isLastUpdate only fires on the isLastUpdate:true update", () => {
  assert.equal(isLastUpdate(BOT_UPDATE), false);
  assert.equal(isLastUpdate(FINAL_UPDATE), true);
  assert.equal(isLastUpdate(COMPLETION), false);
});

test("extractBotText reads the bot answer and ignores Progress frames", () => {
  assert.equal(extractBotText(BOT_UPDATE), "pong");
  assert.equal(extractBotText(FINAL_UPDATE), "pong");
  assert.equal(extractBotText(PROGRESS_UPDATE), null);
  assert.equal(extractBotText(COMPLETION), null);
});

// ── Accumulated → incremental delta ─────────────────────────────────────

test("incrementalDelta emits only the new suffix of accumulated text", () => {
  assert.equal(incrementalDelta("", "pong"), "pong");
  assert.equal(incrementalDelta("pong", "pong"), "");
  assert.equal(incrementalDelta("po", "pong"), "ng");
  assert.equal(incrementalDelta("", ""), "");
});

test("incrementalDelta falls back to the full text on a non-extending replace", () => {
  assert.equal(incrementalDelta("abc", "xyz"), "xyz");
});

// ── End-to-end decode of the captured stream ─────────────────────────────

test("decoding the captured frame sequence reconstructs the bot answer once", () => {
  const wire =
    encodeFrame(HANDSHAKE_ACK) +
    encodeFrame(PROGRESS_UPDATE) +
    encodeFrame(BOT_UPDATE) +
    encodeFrame(FINAL_UPDATE) +
    encodeFrame(FINAL_ITEM) +
    encodeFrame(COMPLETION);

  const { frames } = splitFrames(wire);
  let emitted = "";
  let prev = "";
  let completed = false;
  for (const raw of frames) {
    const frame = parseFrame(raw);
    if (isUpdateFrame(frame)) {
      const text = extractBotText(frame);
      if (text != null) {
        emitted += incrementalDelta(prev, text);
        prev = text;
      }
    } else if (isCompletionFrame(frame)) {
      completed = true;
    }
  }
  assert.equal(emitted, "pong");
  assert.equal(completed, true);
});
