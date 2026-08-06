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

async function withEnvAsync<T>(value: string | undefined, fn: () => Promise<T>): Promise<T> {
  const prev = process.env.OMNIROUTE_SSE_COMMENTS;
  try {
    if (value === undefined) delete process.env.OMNIROUTE_SSE_COMMENTS;
    else process.env.OMNIROUTE_SSE_COMMENTS = value;
    return await fn();
  } finally {
    if (prev === undefined) delete process.env.OMNIROUTE_SSE_COMMENTS;
    else process.env.OMNIROUTE_SSE_COMMENTS = prev;
  }
}

async function collectHeartbeatOutput(
  shape: (typeof HEARTBEAT_SHAPES)[keyof typeof HEARTBEAT_SHAPES]
) {
  const enc = new TextEncoder();
  let closeTimer: ReturnType<typeof setTimeout> | undefined;
  const input = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(enc.encode("data: ordinary\n\n"));
      closeTimer = setTimeout(() => controller.close(), 35);
    },
    cancel() {
      if (closeTimer) clearTimeout(closeTimer);
    },
  });

  return new Response(
    input.pipeThrough(createSseHeartbeatTransform({ shape, intervalMs: 10 }))
  ).text();
}

test("sseCommentsEnabled defaults to true when the env var is unset", () => {
  withEnv(undefined, () => assert.equal(sseCommentsEnabled(), true));
});

test("sseCommentsEnabled accepts conventional disabled values and otherwise defaults on", () => {
  const cases: Array<[string | undefined, boolean]> = [
    [undefined, true],
    ["", true],
    ["unknown", true],
    ["on", true],
    ["true", true],
    ["1", true],
    ["yes", true],
    ["off", false],
    [" OFF ", false],
    ["false", false],
    [" FaLsE ", false],
    ["0", false],
    [" no ", false],
  ];

  for (const [value, expected] of cases) {
    withEnv(value, () =>
      assert.equal(sseCommentsEnabled(), expected, `${JSON.stringify(value)} should be ${expected}`)
    );
  }
});

test("shapeForClientFormat maps known client formats", () => {
  assert.equal(shapeForClientFormat("claude"), HEARTBEAT_SHAPES.ANTHROPIC_PING);
  assert.equal(shapeForClientFormat("openai"), HEARTBEAT_SHAPES.OPENAI_CHUNK);
  assert.equal(
    shapeForClientFormat("openai-responses"),
    HEARTBEAT_SHAPES.OPENAI_RESPONSES_IN_PROGRESS
  );
  assert.equal(shapeForClientFormat(undefined), HEARTBEAT_SHAPES.COMMENT);
});

test("comment opt-out suppresses only COMMENT heartbeats, not data-event heartbeats", async () => {
  await withEnvAsync("off", async () => {
    const comment = await collectHeartbeatOutput(HEARTBEAT_SHAPES.COMMENT);
    assert.doesNotMatch(comment, /: keepalive/, "comment heartbeat should be suppressed");
    assert.match(comment, /data: ordinary/, "ordinary data should pass through unchanged");

    const openAI = await collectHeartbeatOutput(HEARTBEAT_SHAPES.OPENAI_CHUNK);
    assert.match(openAI, /"object":"chat\.completion\.chunk"/);

    const anthropic = await collectHeartbeatOutput(HEARTBEAT_SHAPES.ANTHROPIC_PING);
    assert.match(anthropic, /event: ping\ndata: \{"type":"ping"\}/);

    const responses = await collectHeartbeatOutput(HEARTBEAT_SHAPES.OPENAI_RESPONSES_IN_PROGRESS);
    assert.match(responses, /data: \{"type":"response\.in_progress"\}/);
  });
});
