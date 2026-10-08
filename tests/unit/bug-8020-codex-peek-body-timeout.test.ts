// #8020 bounds silent SSE reads; #15091 must also hand off *live* output
// before EOF, without losing capacity-error fallback after lifecycle frames.
import test from "node:test";
import assert from "node:assert/strict";
import { peekCodexSseTransientError, CodexExecutor } from "../../open-sse/executors/codex.ts";
import { buildTargetTimeoutRunner } from "../../open-sse/services/combo/targetTimeoutRunner.ts";

const TEST_TIMEOUT_MS = 100;
const encoder = new TextEncoder();
const created = 'event: response.created\ndata: {"type":"response.created","response":{"status":"in_progress"}}\n\n';
const capacity = 'event: error\ndata: {"error":{"type":"server_is_overloaded","message":"Selected model is at capacity."}}\n\n';
const completed = 'event: response.completed\ndata: {"type":"response.completed","response":{"status":"completed"}}\n\n';

function openSse(...frames: string[]) {
  let controller: ReadableStreamDefaultController<Uint8Array>;
  const response = new Response(new ReadableStream<Uint8Array>({
    start(c) {
      controller = c;
      for (const frame of frames) c.enqueue(encoder.encode(frame));
      // Deliberately stay open: EOF would make the broken implementation pass.
    },
  }), { headers: { "content-type": "text/event-stream" } });
  return { response, enqueue: (frame: string) => controller.enqueue(encoder.encode(frame)) };
}

for (const [name, frame] of [
  ["reasoning summary", 'data: {"type":"response.reasoning_summary_text.delta","delta":"thinking"}\n\n'],
  ["reasoning text", 'data: {"type":"response.reasoning_text.delta","delta":"thinking"}\n\n'],
  ["function arguments", 'data: {"type":"response.function_call_arguments.delta","delta":"{"}\n\n'],
  ["custom tool input", 'data: {"type":"response.custom_tool_call_input.delta","delta":"print(1)"}\n\n'],
  ["spaced text JSON", 'data: {"type": "response.output_text.delta", "delta": "你好"}\n\n'],
  ["completed JSON", 'data: {"type": "response.completed", "response": {"status": "completed"}}\n\n'],
]) {
  test(`peek hands off ${name} without waiting for EOF or another chunk`, { timeout: 5000 }, async () => {
    const { response, enqueue } = openSse(created, frame);
    const result = await peekCodexSseTransientError(response, TEST_TIMEOUT_MS);
    assert.equal(result.timedOut ?? false, false);
    assert.equal(result.matched, null);
    assert.ok(result.replacementBody);
    const reader = result.replacementBody.getReader();
    try {
      assert.deepEqual((await reader.read()).value, encoder.encode(created));
      assert.deepEqual((await reader.read()).value, encoder.encode(frame));
      enqueue(completed);
      assert.deepEqual((await reader.read()).value, encoder.encode(completed));
    } finally {
      await reader.cancel();
    }
  });
}

for (const [name, prefix] of [
  ["silent body", ""],
  ["lifecycle only", created],
  ["heartbeat", 'event: ping\ndata: {"type":"ping"}\n\n'],
  ["empty delta", 'data: {"type":"response.reasoning_text.delta","delta":""}\n\n'],
  ["partial data line", 'data: {"type":"response.reasoning_text.delta","delta":"thinking"}'],
  ["partial JSON", 'data: {"type":"response.reasoning_text.delta",\n\n'],
]) {
  test(`peek retains the per-read timeout for ${name}`, { timeout: 5000 }, async () => {
    const result = await peekCodexSseTransientError(openSse(prefix).response, TEST_TIMEOUT_MS);
    assert.equal(result.timedOut, true);
    assert.equal(result.replacementBody, null);
    assert.equal(result.matched, null);
  });
}

test("peek preserves capacity detection after lifecycle and heartbeat in separate chunks", async () => {
  const result = await peekCodexSseTransientError(openSse(created, ': keepalive\n\n', capacity).response, TEST_TIMEOUT_MS);
  assert.match(result.matched ?? "", /capacity|overloaded/);
  assert.equal(result.replacementBody, null);
  assert.equal(result.timedOut ?? false, false);
});

test("peek recognizes fragmented SSE and replays the exact prefix bytes", async () => {
  const chunks = ['data: {"type": "response.reasoning_text.delta", ', '"delta": "thinking"}\n', '\n'];
  const result = await peekCodexSseTransientError(openSse(...chunks).response, TEST_TIMEOUT_MS);
  assert.equal(result.timedOut ?? false, false);
  assert.ok(result.replacementBody);
  const reader = result.replacementBody.getReader();
  try {
    for (const chunk of chunks) assert.deepEqual((await reader.read()).value, encoder.encode(chunk));
  } finally {
    await reader.cancel();
  }
});

test("Codex HTTP executor keeps lifecycle-then-capacity eligible for fallback", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => openSse(created, capacity).response;
  try {
    const result = await new CodexExecutor().execute({
      model: "gpt-5.5", body: { model: "gpt-5.5", input: [{ role: "user", content: "hello" }] },
      stream: true, credentials: { accessToken: "test-token" },
    });
    assert.equal(result.response.status, 503);
    await result.response.body?.cancel();
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("Codex HTTP executor hands reasoning to the target runner while the upstream stays open", { timeout: 5000 }, async () => {
  const originalFetch = globalThis.fetch;
  const stream = openSse(created, 'data: {"type":"response.reasoning_text.delta","delta":"thinking"}\n\n');
  let signal: AbortSignal | null | undefined;
  globalThis.fetch = async (_url, init) => {
    signal = init?.signal;
    return stream.response;
  };
  let handler: Promise<Response> | undefined;
  const runner = buildTargetTimeoutRunner({
    comboTargetTimeoutMs: 200,
    log: { debug() {}, info() {}, warn() {}, error() {} },
    handleSingleModel: async (_body, _model, target) => {
      handler = new CodexExecutor().execute({
        model: "gpt-5.5", body: { model: "gpt-5.5", input: [{ role: "user", content: "hello" }] },
        stream: true, credentials: { accessToken: "test-token" }, signal: target?.modelAbortSignal,
      }).then((result) => result.response);
      return handler;
    },
  });
  try {
    const response = await runner({}, "codex/gpt-5.5");
    assert.equal(response.status, 200, "live reasoning must not become combo_target_timeout");
    await new Promise((resolve) => setTimeout(resolve, 250));
    assert.equal(signal?.aborted, false, "target deadline must be removed after handoff");
  } finally {
    // Also unblocks the old implementation in RED runs; never leave a 600s read behind.
    stream.enqueue(completed);
    const response = await handler;
    await response?.body?.cancel();
    globalThis.fetch = originalFetch;
  }
});
