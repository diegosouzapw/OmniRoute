import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createClaudeWebResponse } from "../../open-sse/executors/claude-web/stream.ts";

// Regression test for GitHub issue #14711: after claude.ai emits a `tool_use` block and then
// keeps the assistant message open (only sending keepalive `ping` events, never
// `message_stop`), OmniRoute's stream must still end the OpenAI turn with
// `finish_reason: "tool_calls"` + `[DONE]` instead of hanging forever waiting for a
// `message_stop` that claude.ai's custom-tool flow never sends on that stream.
//
// This is a bounded-timeout test by design (Hard Rule: never "fix" a hang with a test-side
// timeout that masks a real hang) — the assertions below require the finish/[DONE] chunks to
// actually arrive; if the underlying bug regresses, the `readWithTimeout` calls below fail
// fast with "__TIMED_OUT__" instead of hanging the whole suite.

const TEST_IDLE_FINISH_MS = 30;

function frame(event: Record<string, unknown>): Uint8Array {
  return new TextEncoder().encode(`data: ${JSON.stringify(event)}\n\n`);
}

type Chunk = {
  finishReason: unknown;
  hasToolCall: boolean;
  eventType: unknown;
  done: boolean;
};

function parseChunk(bytes: Uint8Array): Chunk {
  const text = new TextDecoder().decode(bytes);
  const dataLine = text
    .split(/\r?\n/)
    .find((line) => line.startsWith("data:"))!
    .slice(5)
    .trimStart();
  if (dataLine === "[DONE]") {
    return { finishReason: null, hasToolCall: false, eventType: undefined, done: true };
  }
  const json = JSON.parse(dataLine) as {
    choices: Array<{ finish_reason: unknown; delta?: { tool_calls?: unknown } }>;
    claude_web?: { event?: { type?: unknown } };
  };
  return {
    finishReason: json.choices[0]?.finish_reason ?? null,
    hasToolCall: Boolean(json.choices[0]?.delta?.tool_calls),
    eventType: json.claude_web?.event?.type,
    done: false,
  };
}

async function readWithTimeout(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  ms: number
): Promise<Chunk | "__TIMED_OUT__"> {
  let timer: NodeJS.Timeout;
  const timeout = new Promise<"__TIMED_OUT__">((resolve) => {
    timer = setTimeout(() => resolve("__TIMED_OUT__"), ms);
  });
  const read = reader.read().then((result) => (result.done ? null : parseChunk(result.value)));
  const outcome = await Promise.race([read, timeout]);
  clearTimeout(timer!);
  if (outcome === null) throw new Error("Stream closed unexpectedly (should never happen here)");
  return outcome;
}

describe("Claude Web stream — tool_use held open by upstream (#14711)", () => {
  it("synthesizes finish_reason:'tool_calls' + [DONE] after an idle window when claude.ai never sends message_stop", async () => {
    let controller: ReadableStreamDefaultController<Uint8Array> | undefined;
    const source = new ReadableStream<Uint8Array>({
      start(value) {
        controller = value;
        value.enqueue(frame({ type: "message_start", message: { model: "claude-sonnet-5" } }));
        value.enqueue(
          frame({
            type: "content_block_start",
            index: 0,
            content_block: { type: "tool_use", id: "toolu_1", name: "read_file", input: {} },
          })
        );
        value.enqueue(
          frame({
            type: "content_block_delta",
            index: 0,
            delta: { type: "input_json_delta", partial_json: '{"path":"README.md"}' },
          })
        );
        value.enqueue(frame({ type: "content_block_stop", index: 0 }));
        value.enqueue(frame({ type: "ping", latency_ms: 12 }));
        value.enqueue(frame({ type: "ping", latency_ms: 12 }));
        // Deliberately never close(): the real upstream connection stays open too, holding
        // the message open after the tool_use with only keepalives — exactly the reported hang.
      },
    });

    const completions: Array<{ assistantText: string; stopReason: string }> = [];
    let failures = 0;
    const response = await createClaudeWebResponse(source, {
      model: "claude-sonnet-5",
      stream: true,
      responseMetadata: { conversation_id: "conversation-test" },
      onComplete: (result) => completions.push(result),
      onFailure: () => {
        failures += 1;
      },
      toolUseIdleFinishMs: TEST_IDLE_FINISH_MS,
    });

    assert.equal(response.status, 200);
    const reader = response.body!.getReader();

    const toolCallChunk = await readWithTimeout(reader, 2000);
    assert.notEqual(toolCallChunk, "__TIMED_OUT__");
    assert.equal((toolCallChunk as Chunk).hasToolCall, true);
    assert.equal((toolCallChunk as Chunk).finishReason, null);

    for (let i = 0; i < 2; i++) {
      const pingChunk = await readWithTimeout(reader, 2000);
      assert.notEqual(pingChunk, "__TIMED_OUT__");
      assert.equal((pingChunk as Chunk).eventType, "ping");
      assert.equal((pingChunk as Chunk).finishReason, null);
    }

    // THE FIX: no more upstream events ever arrive after the pings — the idle window must
    // still end the turn with finish_reason:"tool_calls" instead of hanging indefinitely.
    const finishChunk = await readWithTimeout(reader, 2000);
    assert.notEqual(
      finishChunk,
      "__TIMED_OUT__",
      "expected a synthesized finish_reason:'tool_calls' chunk after the idle window instead of a hang"
    );
    assert.equal((finishChunk as Chunk).finishReason, "tool_calls");

    const doneChunk = await readWithTimeout(reader, 2000);
    assert.notEqual(doneChunk, "__TIMED_OUT__");
    assert.equal((doneChunk as Chunk).done, true);

    assert.deepEqual(completions, [{ assistantText: "", stopReason: "tool_use" }]);
    assert.equal(failures, 0);

    // The fix cancels the (never-closed) upstream source once it synthesizes the finish, so
    // the source's own controller may already be closed by the time we get here.
    await reader.cancel().catch(() => {});
    try {
      controller?.close();
    } catch {
      // Already closed by the fix's own upstream cancel — nothing left to do.
    }
  });

  it("does not synthesize a finish while other content blocks are still open after a tool_use", async () => {
    let controller: ReadableStreamDefaultController<Uint8Array> | undefined;
    const source = new ReadableStream<Uint8Array>({
      start(value) {
        controller = value;
        value.enqueue(frame({ type: "message_start", message: { model: "claude-sonnet-5" } }));
        value.enqueue(
          frame({
            type: "content_block_start",
            index: 0,
            content_block: { type: "tool_use", id: "toolu_1", name: "read_file", input: {} },
          })
        );
        value.enqueue(frame({ type: "content_block_stop", index: 0 }));
        // A second block (text) is still open — the idle window must never fire a synthetic
        // finish while any block remains open, regardless of tool_use having closed.
        value.enqueue(
          frame({ type: "content_block_start", index: 1, content_block: { type: "text" } })
        );
      },
    });

    const response = await createClaudeWebResponse(source, {
      model: "claude-sonnet-5",
      stream: true,
      responseMetadata: {},
      onComplete() {},
      onFailure() {},
      toolUseIdleFinishMs: TEST_IDLE_FINISH_MS,
    });

    const reader = response.body!.getReader();
    await readWithTimeout(reader, 2000); // tool_call chunk

    const next = await readWithTimeout(reader, TEST_IDLE_FINISH_MS * 4);
    assert.equal(
      next,
      "__TIMED_OUT__",
      "must not synthesize a finish while a later content block is still open"
    );

    controller?.close();
    await reader.cancel().catch(() => {});
  });
});
