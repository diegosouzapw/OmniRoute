import test from "node:test";
import assert from "node:assert/strict";
import {
  sseCommentsEnabled,
  shapeForClientFormat,
  createSseHeartbeatTransform,
  HEARTBEAT_SHAPES,
} from "../../open-sse/utils/sseHeartbeat.ts";

function withEnv(value: string | undefined, fn: () => void) {
  const prev = process.env.OMNIROUTE_SSE_COMMENTS;
  try {
    if (value === undefined) delete process.env.OMNIROUTE_SSE_COMMENTS;
    else process.env.OMNIROUTE_SSE_COMMENTS = value;
    fn();
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_SSE_COMMENTS;
    else process.env.OMNIROUTE_SSE_COMMENTS = prev;
  }
}

test("sseCommentsEnabled defaults to true when the env var is unset", () => {
  withEnv(undefined, () => assert.equal(sseCommentsEnabled(), true));
});

test("sseCommentsEnabled is false only when set to 'off' (case-insensitive)", () => {
  withEnv("off", () => assert.equal(sseCommentsEnabled(), false));
  withEnv("OFF", () => assert.equal(sseCommentsEnabled(), false));
  withEnv("on", () => assert.equal(sseCommentsEnabled(), true));
  withEnv("false", () => assert.equal(sseCommentsEnabled(), true));
});

test("shapeForClientFormat maps known client formats", () => {
  assert.equal(shapeForClientFormat("claude"), HEARTBEAT_SHAPES.ANTHROPIC_PING);
  assert.equal(shapeForClientFormat("openai"), HEARTBEAT_SHAPES.OPENAI_CHUNK);
  assert.equal(shapeForClientFormat("openai-responses"), HEARTBEAT_SHAPES.OPENAI_RESPONSES_IN_PROGRESS);
  assert.equal(shapeForClientFormat(undefined), HEARTBEAT_SHAPES.COMMENT);
});

test("createSseHeartbeatTransform suppresses COMMENT heartbeats when OMNIROUTE_SSE_COMMENTS=off", async () => {
  const prev = process.env.OMNIROUTE_SSE_COMMENTS;
  process.env.OMNIROUTE_SSE_COMMENTS = "off";
  try {
    const enc = new TextEncoder();
    const dec = new TextDecoder();
    const input = new ReadableStream<Uint8Array>({
      start(c) {
        c.enqueue(enc.encode("data: hello\n\n"));
        c.close();
      },
    });
    const reader = input
      .pipeThrough(createSseHeartbeatTransform({ shape: HEARTBEAT_SHAPES.COMMENT, intervalMs: 20 }))
      .pipeThrough(
        new TransformStream<Uint8Array, string>({
          transform(chunk, ctrl) {
            ctrl.enqueue(dec.decode(chunk));
          },
        })
      )
      .getReader();
    const chunks: string[] = [];
    let res = await reader.read();
    while (!res.done) {
      chunks.push(res.value as string);
      res = await reader.read();
    }
    const out = chunks.join("");
    assert.ok(!out.includes(": keepalive"), "no comment heartbeat should be emitted when disabled");
    assert.ok(out.includes("data: hello"), "original chunk passes through unchanged");
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_SSE_COMMENTS;
    else process.env.OMNIROUTE_SSE_COMMENTS = prev;
  }
});
