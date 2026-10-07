import test from "node:test";
import assert from "node:assert/strict";

const { formatBufferedVerdictLog, hasOpenReasoning } =
  await import("../../open-sse/utils/emptyTurnRetry.ts");
const { pipeWithDisconnect, createStreamController } =
  await import("../../open-sse/utils/streamHandler.ts");

const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function readStreamText(stream) {
  const reader = stream.getReader();
  const chunks = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return decoder.decode(
    chunks.length === 1 ? chunks[0] : Uint8Array.from(chunks.flatMap((c) => Array.from(c)))
  );
}

test("idle pass verdict logs warn with correlation ids", () => {
  const out = formatBufferedVerdictLog(
    { kind: "pass", why: "stalled turn already carries usable content", idlePass: true },
    "cid-123",
    "abcdef"
  );
  assert.equal(out.level, "warn");
  assert.match(out.line, /verdict=pass idle=yes/);
  assert.match(out.line, /correlationId=cid-123/);
  assert.match(out.line, /trace=abcdef/);
  assert.equal(out.line.split("\n").length, 1);
});

test("null correlationId renders none, never merged with trace", () => {
  const out = formatBufferedVerdictLog(
    { kind: "pass", why: "stalled turn already carries usable content", idlePass: true },
    null,
    "abcdef"
  );
  assert.equal(out.level, "warn");
  assert.match(out.line, /correlationId=none trace=abcdef/);
});

test("normal pass verdict logs info on one bounded line without turn content", () => {
  const secret = "SECRET-TURN-CONTENT-".concat("x".repeat(40));
  const out = formatBufferedVerdictLog(
    { kind: "pass", why: "turn has usable content" },
    "cid-9",
    "123456"
  );
  assert.equal(out.level, "info");
  assert.equal(out.line.split("\n").length, 1);
  assert.ok(!out.line.includes(secret), "helper must never receive turn content");
  const tail = out.line.slice(out.line.lastIndexOf("trace=123456 ") + "trace=123456 ".length);
  assert.ok(tail.length <= 181, `reason too long: ${tail.length}`);
});

test("free-text field is truncated to the bound", () => {
  const out = formatBufferedVerdictLog(
    { kind: "retry", reason: "r".repeat(500) },
    "cid-1",
    "654321"
  );
  assert.equal(out.level, "info");
  const tail = out.line.slice(out.line.lastIndexOf("trace=654321 ") + "trace=654321 ".length);
  assert.ok(tail.length <= 181, `reason too long: ${tail.length}`);
  assert.match(out.line, /…$/);
});

test("newline in a future reason literal stays one log line", () => {
  const out = formatBufferedVerdictLog(
    { kind: "retry", reason: "first line\nsecond line" },
    "cid-1",
    "654321"
  );
  assert.equal(out.level, "info");
  assert.equal(out.line.split("\n").length, 1);
  assert.match(out.line, /first line second line/);
});

test("content-stall cutoff reports what the upstream had sent", async () => {
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          'event: response.created\ndata: {"type":"response.created","response":{}}\n\n' +
            'event: response.in_progress\ndata: {"type":"response.in_progress","response":{}}\n\n'
        )
      );
    },
  });
  let onErrorEvent = null;
  const streamController = createStreamController({
    onError(event) {
      onErrorEvent = event;
      return true;
    },
  });
  const stream = pipeWithDisconnect(new Response(source), new TransformStream(), streamController, {
    stallTimeoutMs: 5000,
    contentStallTimeoutMs: 80,
  });
  await readStreamText(stream);
  assert.ok(onErrorEvent !== null, "watchdog must fire on lifecycle-only stream");
  assert.match(onErrorEvent.message, /bytes=\d+/);
  assert.match(onErrorEvent.message, /events=[1-9]\d*/);
  assert.match(onErrorEvent.message, /top=.+/);
  assert.match(onErrorEvent.message, /reasoning_open=(yes|no)/);
  assert.doesNotMatch(onErrorEvent.message, /lifecycle\/heartbeat events only/);
});

test("cutoff on a silent stream uses the empty format", async () => {
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(": keep-alive\n\n"));
    },
  });
  let onErrorEvent = null;
  const streamController = createStreamController({
    onError(event) {
      onErrorEvent = event;
      return true;
    },
  });
  const stream = pipeWithDisconnect(new Response(source), new TransformStream(), streamController, {
    stallTimeoutMs: 5000,
    contentStallTimeoutMs: 80,
  });
  await readStreamText(stream);
  assert.ok(onErrorEvent !== null, "watchdog must fire on a silent stream");
  assert.match(onErrorEvent.message, /bytes=\d+ events=0 top=none reasoning_open=no/);
});

test("stream with real content never trips the content watchdog", async () => {
  const source = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode('data: {"type":"response.in_progress","response":{}}'));
      await new Promise((r) => setTimeout(r, 30));
      controller.enqueue(
        encoder.encode('data: {"type":"response.output_text.delta","delta":"Hello"}\n\n')
      );
      controller.close();
    },
  });
  let onErrorCalled = false;
  const streamController = createStreamController({
    onError() {
      onErrorCalled = true;
      return true;
    },
  });
  const stream = pipeWithDisconnect(new Response(source), new TransformStream(), streamController, {
    stallTimeoutMs: 5000,
    contentStallTimeoutMs: 200,
  });
  const text = await readStreamText(stream);
  assert.equal(onErrorCalled, false);
  assert.doesNotMatch(text, /content stall/i);
});

test("hasOpenReasoning parity on the watchdog tail buffer shape", () => {
  const tail =
    'event: response.created\ndata: {"type":"response.output_item.added","item":{"type":"reasoning"}}\n\n' +
    'event: other\ndata: {"type":"response.in_progress"}\n\n';
  assert.equal(hasOpenReasoning(tail), true);
  assert.equal(hasOpenReasoning('data: {"type":"response.completed"}\n\n'), false);
});
