import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createClaudeWebResponse } from "../../open-sse/executors/claude-web/stream.ts";

type ParsedSse = {
  json: Array<Record<string, unknown>>;
  doneCount: number;
};

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

function frames(events: Array<Record<string, unknown>>, newline = "\n"): string {
  return events.map((event) => `data: ${JSON.stringify(event)}${newline}${newline}`).join("");
}

function validEvents(): Array<Record<string, unknown>> {
  return [
    { type: "message_start", message: { model: "claude-sonnet-5" } },
    { type: "content_block_start", index: 0, content_block: { type: "thinking" } },
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "thinking_delta", thinking: "deep " },
    },
    {
      type: "content_block_delta",
      index: 0,
      delta: { type: "thinking_summary_delta", summary: "summary" },
    },
    { type: "content_block_stop", index: 0 },
    { type: "content_block_start", index: 1, content_block: { type: "text" } },
    {
      type: "content_block_delta",
      index: 1,
      delta: { type: "text_delta", text: "hello" },
    },
    { type: "content_block_stop", index: 1 },
    { type: "message_limit", remaining: 42 },
    { type: "model_update", model: "claude-sonnet-5" },
    { type: "message_delta", delta: { stop_reason: "end_turn" } },
    { type: "message_stop" },
  ];
}

function parseSse(output: string): ParsedSse {
  const json: Array<Record<string, unknown>> = [];
  let doneCount = 0;
  for (const frame of output.split(/\r?\n\r?\n/)) {
    const data = frame
      .split(/\r?\n/)
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice(5).trimStart())
      .join("\n");
    if (!data) continue;
    if (data === "[DONE]") {
      doneCount += 1;
    } else {
      json.push(JSON.parse(data) as Record<string, unknown>);
    }
  }
  return { json, doneCount };
}

describe("Claude Web strict stream protocol", () => {
  it("handles split CRLF frames, reasoning, text, metadata, and one terminal marker", async () => {
    const events = validEvents();
    const prefix =
      'data: {"type":"ping",\r\ndata: "latency_ms":12,"prompt":"never expose me"}\r\n\r\n';
    const source = prefix + frames(events, "\r\n") + "data: [DONE]\r\n\r\n";
    const completions: Array<{ assistantText: string; stopReason: string }> = [];
    let failures = 0;
    const response = await createClaudeWebResponse(byteStream(source, [1, 2, 5, 3, 11, 7]), {
      model: "claude-sonnet-5",
      stream: true,
      responseMetadata: { conversation_id: "conversation-test" },
      onComplete: (result) => completions.push(result),
      onFailure: () => {
        failures += 1;
      },
    });

    assert.equal(response.status, 200);
    const output = await response.text();
    const parsed = parseSse(output);
    const deltas = parsed.json.flatMap((chunk) => {
      const choices = chunk.choices as Array<{ delta?: Record<string, unknown> }> | undefined;
      return choices?.map((choice) => choice.delta ?? {}) ?? [];
    });
    assert.equal(deltas.map((delta) => delta.reasoning_content ?? "").join(""), "deep summary");
    assert.equal(deltas.map((delta) => delta.content ?? "").join(""), "hello");

    const metadataEvents = parsed.json
      .map((chunk) => chunk.claude_web as Record<string, unknown> | undefined)
      .map((metadata) => metadata?.event as Record<string, unknown> | undefined)
      .map((event) => event?.type)
      .filter(Boolean);
    assert.ok(metadataEvents.includes("ping"));
    assert.ok(metadataEvents.includes("message_limit"));
    assert.ok(metadataEvents.includes("model_update"));
    assert.doesNotMatch(output, /never expose me|tool_states|transcript_hash/);
    assert.equal((output.match(/"finish_reason":"stop"/g) ?? []).length, 1);
    assert.equal(parsed.doneCount, 1);
    assert.deepEqual(completions, [{ assistantText: "hello", stopReason: "end_turn" }]);
    assert.equal(failures, 0);
  });

  it("projects known metadata through per-event allowlists", async () => {
    const events = [
      { type: "message_start" },
      {
        type: "tool_approval",
        status: "required",
        prompt: "private prompt",
        conversation_id: "private-conversation",
        tool_states: [{ name: "private_tool" }],
        transcript_hash: "private-hash",
      },
      { type: "message_delta", delta: { stop_reason: "end_turn" } },
      { type: "message_stop" },
    ];
    const response = await createClaudeWebResponse(byteStream(frames(events)), {
      model: "claude-sonnet-5",
      stream: false,
      responseMetadata: {},
      onComplete() {},
      onFailure() {},
    });
    const raw = await response.text();
    assert.match(raw, /tool_approval/);
    assert.match(raw, /required/);
    assert.doesNotMatch(raw, /private prompt|private-conversation|private_tool|private-hash/);
  });

  it("finishes and cancels upstream immediately after message_stop", async () => {
    let controller: ReadableStreamDefaultController<Uint8Array> | undefined;
    let cancelled = false;
    const source = new ReadableStream<Uint8Array>({
      start(value) {
        controller = value;
        value.enqueue(new TextEncoder().encode(frames(validEvents())));
      },
      cancel() {
        cancelled = true;
      },
    });
    const response = await createClaudeWebResponse(source, {
      model: "claude-sonnet-5",
      stream: true,
      responseMetadata: {},
      onComplete() {},
      onFailure() {},
    });
    const pending = response.text();
    const outcome = await Promise.race([
      pending.then(() => "completed" as const),
      new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 100)),
    ]);
    if (outcome === "timeout") {
      controller?.close();
      await pending;
    }
    assert.equal(outcome, "completed");
    assert.equal(cancelled, true);
  });

  it("cancels upstream when the downstream consumer disconnects", async () => {
    let sourceController: ReadableStreamDefaultController<Uint8Array> | undefined;
    let cancelled = false;
    const partial = frames([
      { type: "message_start" },
      { type: "content_block_start", index: 0, content_block: { type: "text" } },
      { type: "content_block_delta", index: 0, delta: { type: "text_delta", text: "partial" } },
    ]);
    const source = new ReadableStream<Uint8Array>({
      start(value) {
        sourceController = value;
        value.enqueue(new TextEncoder().encode(partial));
      },
      cancel() {
        cancelled = true;
      },
    });
    const response = await createClaudeWebResponse(source, {
      model: "claude-sonnet-5",
      stream: true,
      responseMetadata: {},
      onComplete() {},
      onFailure() {},
    });
    const reader = response.body!.getReader();
    await reader.read();
    const cancelPromise = reader.cancel("client disconnected");
    const outcome = await Promise.race([
      cancelPromise.then(() => "cancelled" as const),
      new Promise<"timeout">((resolve) => setTimeout(() => resolve("timeout"), 100)),
    ]);
    if (outcome === "timeout") {
      sourceController?.close();
      await cancelPromise.catch(() => {});
    }
    assert.equal(outcome, "cancelled");
    assert.equal(cancelled, true);
  });

  it("cancels an oversized unterminated SSE frame before reading the whole source", async () => {
    const chunk = new TextEncoder().encode("x".repeat(64 * 1024));
    const availableChunks = 40;
    let reads = 0;
    let cancelled = false;
    const source = new ReadableStream<Uint8Array>({
      pull(controller) {
        if (reads >= availableChunks) {
          controller.close();
          return;
        }
        reads += 1;
        controller.enqueue(chunk);
      },
      cancel() {
        cancelled = true;
      },
    });
    const response = await createClaudeWebResponse(source, {
      model: "claude-sonnet-5",
      stream: false,
      responseMetadata: {},
      onComplete() {},
      onFailure() {},
    });

    assert.equal(response.status, 502);
    assert.equal(cancelled, true);
    assert.ok(reads < availableChunks);
  });

  it("builds buffered output from the same semantic events", async () => {
    const completions: Array<{ assistantText: string; stopReason: string }> = [];
    let failures = 0;
    const response = await createClaudeWebResponse(byteStream(frames(validEvents())), {
      model: "claude-sonnet-5",
      stream: false,
      responseMetadata: { assistant_message_uuid: "assistant-test" },
      onComplete: (result) => completions.push(result),
      onFailure: () => {
        failures += 1;
      },
    });

    assert.equal(response.status, 200);
    assert.match(response.headers.get("Content-Type") ?? "", /application\/json/);
    const body = (await response.json()) as {
      choices: Array<{
        message: { content: string; reasoning_content?: string };
        finish_reason: string;
      }>;
      claude_web: { assistant_message_uuid: string; events: unknown[] };
    };
    assert.equal(body.choices[0].message.content, "hello");
    assert.equal(body.choices[0].message.reasoning_content, "deep summary");
    assert.equal(body.choices[0].finish_reason, "stop");
    assert.equal(body.claude_web.assistant_message_uuid, "assistant-test");
    assert.equal(body.claude_web.events.length, 2);
    assert.deepEqual(completions, [{ assistantText: "hello", stopReason: "end_turn" }]);
    assert.equal(failures, 0);
  });

  it("fails closed for malformed, unknown, unordered, upstream error, and premature EOF", async () => {
    const badStreams = [
      'data: {"type":\n\n',
      frames([{ type: "message_start" }, { type: "future_event" }]),
      frames([
        {
          type: "content_block_delta",
          index: 0,
          delta: { type: "text_delta", text: "too early" },
        },
      ]),
      frames([
        { type: "message_start" },
        {
          type: "error",
          error: { message: "secret at C:\\Users\\private\\source.ts:10" },
        },
      ]),
      frames([{ type: "message_start" }]),
      frames([{ type: "message_start" }]) + "data: [DONE]\n\n",
    ];

    for (const badStream of badStreams) {
      const completions: unknown[] = [];
      let failures = 0;
      const response = await createClaudeWebResponse(byteStream(badStream), {
        model: "claude-sonnet-5",
        stream: true,
        responseMetadata: {},
        onComplete: (result) => completions.push(result),
        onFailure: () => {
          failures += 1;
        },
      });
      const output = await response.text();

      assert.match(output, /Claude Web stream protocol error/);
      assert.doesNotMatch(output, /C:\\\\Users|private|source\.ts/);
      assert.equal((output.match(/"finish_reason"/g) ?? []).length, 0);
      assert.deepEqual(completions, []);
      assert.equal(failures, 1);
    }
  });
});
