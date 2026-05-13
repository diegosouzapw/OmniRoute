import test from "node:test";
import assert from "node:assert/strict";

const { createSseHeartbeatTransform, HEARTBEAT_SHAPES, shapeForClientFormat } = await import(
  "../../open-sse/utils/sseHeartbeat.ts"
);

const STREAM_TS_STRIP_RE = /^event:\s*keepalive\b/i;

function decodeChunk(value) {
  return typeof value === "string" ? value : new TextDecoder().decode(value);
}

test("integration: anthropic-ping heartbeat reaches downstream and does NOT trigger stream.ts strip", async () => {
  // Build a fake upstream that emits one chunk then idles indefinitely
  let cancelled = false;
  const upstream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("event: message_start\ndata: {}\n\n"));
      // never close — let heartbeat fire
    },
    cancel() { cancelled = true; },
  });

  const transform = createSseHeartbeatTransform({
    intervalMs: 20,
    shape: HEARTBEAT_SHAPES.ANTHROPIC_PING,
  });

  const piped = upstream.pipeThrough(transform);
  const reader = piped.getReader();

  // Read first (real) chunk
  const { value: first } = await reader.read();
  assert.match(decodeChunk(first), /event: message_start/);

  // Wait for at least one heartbeat (interval = 20ms, give it 60ms slack)
  const startedAt = Date.now();
  let sawPing = false;
  while (Date.now() - startedAt < 200) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decodeChunk(value);
    if (/^event: ping\b/m.test(chunk)) {
      sawPing = true;
      // Verify it does NOT match the strip regex
      for (const line of chunk.split("\n")) {
        assert.ok(
          !STREAM_TS_STRIP_RE.test(line.trim()),
          `heartbeat chunk produced a stream.ts-strippable line: ${line}`
        );
      }
      break;
    }
  }

  await reader.cancel();
  assert.ok(sawPing, "expected to receive at least one event: ping heartbeat within 200ms");
});

test("integration: openai-chunk heartbeat is valid JSON parseable by SDKs", async () => {
  const upstream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(`data: {"id":"chatcmpl-1","object":"chat.completion.chunk","choices":[]}\n\n`));
    },
  });

  const transform = createSseHeartbeatTransform({
    intervalMs: 20,
    shape: HEARTBEAT_SHAPES.OPENAI_CHUNK,
  });

  const piped = upstream.pipeThrough(transform);
  const reader = piped.getReader();

  await reader.read(); // skip first real chunk

  const startedAt = Date.now();
  let sawValidChunk = false;
  while (Date.now() - startedAt < 200) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decodeChunk(value);
    if (chunk.startsWith("data: ") && chunk.includes("omniroute-keepalive")) {
      const jsonStr = chunk.slice(6, chunk.indexOf("\n\n"));
      const parsed = JSON.parse(jsonStr); // must not throw
      assert.equal(parsed.object, "chat.completion.chunk");
      assert.equal(parsed.choices[0].finish_reason, null);
      sawValidChunk = true;
      break;
    }
  }

  await reader.cancel();
  assert.ok(sawValidChunk, "expected to receive a valid openai-chunk heartbeat within 200ms");
});

test("integration: shapeForClientFormat + createSseHeartbeatTransform pipeline (claude path)", async () => {
  // Simulates what chatCore.ts does at line 4276
  const shape = shapeForClientFormat("claude");
  assert.equal(shape, HEARTBEAT_SHAPES.ANTHROPIC_PING);

  const transform = createSseHeartbeatTransform({
    intervalMs: 20,
    shape,
  });

  const upstream = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("event: hello\ndata: {}\n\n"));
    },
  });

  const reader = upstream.pipeThrough(transform).getReader();
  await reader.read(); // first real
  const { value } = await reader.read();
  assert.match(decodeChunk(value), /^event: ping\ndata: \{\}\n\n$/);
  await reader.cancel();
});
