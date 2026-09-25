import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createClaudeWebResponse } from "../../open-sse/executors/claude-web/stream.ts";

function byteStream(text: string): ReadableStream<Uint8Array> {
  const bytes = new TextEncoder().encode(text);
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
}

function idleByteStream(text: string, onCancel: () => void): ReadableStream<Uint8Array> {
  const bytes = new TextEncoder().encode(text);
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(bytes);
    },
    cancel() {
      onCancel();
    },
  });
}

function timedByteStream(
  chunks: Array<{ delayMs: number; text: string }>,
  onCancel: () => void
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const timers: Array<ReturnType<typeof setTimeout>> = [];
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) {
        timers.push(
          setTimeout(() => controller.enqueue(encoder.encode(chunk.text)), chunk.delayMs)
        );
      }
    },
    cancel() {
      for (const timer of timers) clearTimeout(timer);
      onCancel();
    },
  });
}

async function readResponseWithTimeout(response: Response, timeoutMs = 250): Promise<string> {
  const reader = response.body?.getReader();
  assert.ok(reader, "Expected a streaming response body");
  const decoder = new TextDecoder();
  let output = "";

  try {
    while (true) {
      let timeout: ReturnType<typeof setTimeout> | undefined;
      const result = await Promise.race([
        reader.read(),
        new Promise<never>((_, reject) => {
          timeout = setTimeout(
            () => reject(new Error("Timed out waiting for stream termination")),
            timeoutMs
          );
        }),
      ]).finally(() => clearTimeout(timeout));
      if (result.done) return output;
      output += decoder.decode(result.value, { stream: true });
    }
  } finally {
    await reader.cancel().catch(() => {});
  }
}

function frames(events: Array<Record<string, unknown>>, newline = "\n"): string {
  return events.map((event) => `data: ${JSON.stringify(event)}${newline}${newline}`).join("");
}

/**
 * Reproduce #9408: Claude Web emits tool_use content blocks and the stream
 * parser has no handler for them, causing input_json_delta to be rejected as
 * a protocol violation → HTTP 502.
 *
 * Upstream event sequence:
 *   message_start
 *   → content_block_start(type:"tool_use", id:"toolu_xxx", name:"get_weather")
 *   → ×3 content_block_delta(type:"input_json_delta", partial_json:"...")
 *   → content_block_stop
 *   → message_delta(stop_reason:"tool_use")
 *   → message_stop
 */
describe("Claude Web tool_use protocol (#9408)", () => {
  it("converts tool_use blocks to tool_calls in buffered mode", async () => {
    const events = [
      { type: "message_start", message: { model: "claude-sonnet-5" } },
      {
        type: "content_block_start",
        index: 0,
        content_block: {
          type: "tool_use",
          id: "toolu_9408_001",
          name: "get_weather",
          input: {},
        },
      },
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "input_json_delta", partial_json: '{"loca' },
      },
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "input_json_delta", partial_json: 'tion": "Sa' },
      },
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "input_json_delta", partial_json: 'n Francisco"}' },
      },
      { type: "content_block_stop", index: 0 },
      { type: "message_delta", delta: { stop_reason: "tool_use" } },
      { type: "message_stop" },
    ];

    const completions: Array<{ assistantText: string; stopReason: string }> = [];
    let failures = 0;

    const response = await createClaudeWebResponse(byteStream(frames(events)), {
      model: "claude-sonnet-5",
      stream: false,
      responseMetadata: {},
      onComplete: (result) => completions.push(result),
      onFailure: () => {
        failures += 1;
      },
    });

    // Should NOT be 502 — the bug was that tool_use blocks caused protocol failure
    assert.equal(response.status, 200, "Expected 200, not 502 — tool_use should not crash");
    const body = (await response.json()) as {
      choices: Array<{
        message: {
          content: string | null;
          tool_calls?: Array<{
            id: string;
            type: string;
            function: { name: string; arguments: string };
          }>;
        };
        finish_reason: string;
      }>;
    };

    assert.equal(body.choices[0].finish_reason, "tool_calls");
    assert.ok(body.choices[0].message.tool_calls, "Expected tool_calls in message");
    assert.equal(body.choices[0].message.tool_calls!.length, 1);
    assert.equal(body.choices[0].message.tool_calls![0].id, "toolu_9408_001");
    assert.equal(body.choices[0].message.tool_calls![0].type, "function");
    assert.equal(body.choices[0].message.tool_calls![0].function.name, "get_weather");
    // Content should be null when there's only a tool call
    assert.equal(body.choices[0].message.content, null);
    // Preserve upstream tool call ID — the input should parse correctly
    const parsed = JSON.parse(body.choices[0].message.tool_calls![0].function.arguments);
    assert.deepEqual(parsed, { location: "San Francisco" });
    assert.deepEqual(completions, [{ assistantText: "", stopReason: "tool_use" }]);
    assert.equal(failures, 0);
  });

  it("converts tool_use blocks to tool_calls in streaming mode", async () => {
    const events = [
      { type: "message_start", message: { model: "claude-sonnet-5" } },
      {
        type: "content_block_start",
        index: 0,
        content_block: {
          type: "tool_use",
          id: "toolu_9408_002",
          name: "search_code",
          input: {},
        },
      },
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "input_json_delta", partial_json: '{"query":"initial"' },
      },
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "input_json_delta", partial_json: ',"limit":10}' },
      },
      { type: "content_block_stop", index: 0 },
      { type: "message_delta", delta: { stop_reason: "tool_use" } },
      { type: "message_stop" },
    ];

    const completions: Array<{ assistantText: string; stopReason: string }> = [];
    let failures = 0;

    const response = await createClaudeWebResponse(byteStream(frames(events)), {
      model: "claude-sonnet-5",
      stream: true,
      responseMetadata: {},
      onComplete: (result) => completions.push(result),
      onFailure: () => {
        failures += 1;
      },
    });

    assert.equal(response.status, 200, "Expected 200, not 502");
    const output = await response.text();
    // Verify it contains tool_calls in some chunk
    assert.match(output, /tool_calls/);
    // Verify finish_reason: tool_calls
    assert.match(output, /"finish_reason":"tool_calls"/);
    // Verify tool call id preserved
    assert.match(output, /"id":"toolu_9408_002"/);
    // Verify tool call name
    assert.match(output, /"name":"search_code"/);
    // Verify arguments contain the accumulated input
    assert.match(output, /"arguments":".*query.*initial.*limit.*10/);
    assert.deepEqual(completions, [{ assistantText: "", stopReason: "tool_use" }]);
    assert.equal(failures, 0);
  });

  it("terminates after a tool_use block when upstream remains idle (#14711)", async () => {
    const events = [
      { type: "message_start", message: { model: "claude-sonnet-5" } },
      {
        type: "content_block_start",
        index: 0,
        content_block: {
          type: "tool_use",
          id: "toolu_14711_001",
          name: "search_code",
          input: {},
        },
      },
      {
        type: "content_block_delta",
        index: 0,
        delta: {
          type: "input_json_delta",
          partial_json: '{"query":"stream termination"}',
        },
      },
      { type: "content_block_stop", index: 0 },
    ];
    let upstreamCancelled = false;
    const completions: Array<{ assistantText: string; stopReason: string }> = [];
    let failures = 0;

    const response = await createClaudeWebResponse(
      idleByteStream(frames(events), () => {
        upstreamCancelled = true;
      }),
      {
        model: "claude-sonnet-5",
        stream: true,
        responseMetadata: {},
        onComplete: (result) => completions.push(result),
        onFailure: () => {
          failures += 1;
        },
      }
    );

    const output = await readResponseWithTimeout(response);
    assert.match(output, /"id":"toolu_14711_001"/);
    assert.match(output, /"finish_reason":"tool_calls"/);
    assert.match(output, /data: \[DONE\]/);
    assert.equal(upstreamCancelled, true);
    assert.deepEqual(completions, [{ assistantText: "", stopReason: "tool_use" }]);
    assert.equal(failures, 0);
  });

  it("emits every queued tool call before terminating an idle stream", async () => {
    const events = [
      { type: "message_start", message: { model: "claude-sonnet-5" } },
      {
        type: "content_block_start",
        index: 0,
        content_block: {
          type: "tool_use",
          id: "toolu_14711_001",
          name: "read_file",
          input: { path: "README.md" },
        },
      },
      { type: "content_block_stop", index: 0 },
      {
        type: "content_block_start",
        index: 1,
        content_block: {
          type: "tool_use",
          id: "toolu_14711_002",
          name: "read_file",
          input: { path: "AGENTS.md" },
        },
      },
      { type: "content_block_stop", index: 1 },
    ];
    let upstreamCancelled = false;

    const response = await createClaudeWebResponse(
      idleByteStream(frames(events), () => {
        upstreamCancelled = true;
      }),
      {
        model: "claude-sonnet-5",
        stream: true,
        responseMetadata: {},
        onComplete() {},
        onFailure() {},
      }
    );

    const output = await readResponseWithTimeout(response);
    assert.match(output, /"id":"toolu_14711_001"/);
    assert.match(output, /"id":"toolu_14711_002"/);
    assert.match(output, /"finish_reason":"tool_calls"/);
    assert.match(output, /data: \[DONE\]/);
    assert.equal(upstreamCancelled, true);
  });

  it("does not terminate while a sibling tool block is still arriving", async () => {
    const firstTool = frames([
      { type: "message_start", message: { model: "claude-sonnet-5" } },
      {
        type: "content_block_start",
        index: 0,
        content_block: {
          type: "tool_use",
          id: "toolu_14711_001",
          name: "read_file",
          input: { path: "README.md" },
        },
      },
      { type: "content_block_stop", index: 0 },
    ]);
    const secondToolStart = frames([
      {
        type: "content_block_start",
        index: 1,
        content_block: {
          type: "tool_use",
          id: "toolu_14711_002",
          name: "search_code",
          input: {},
        },
      },
    ]);
    const secondToolDelta = frames([
      {
        type: "content_block_delta",
        index: 1,
        delta: { type: "input_json_delta", partial_json: '{"query":"stream"}' },
      },
    ]);
    const secondToolStop = frames([{ type: "content_block_stop", index: 1 }]);
    let upstreamCancelled = false;

    const response = await createClaudeWebResponse(
      timedByteStream(
        [
          { delayMs: 0, text: firstTool },
          { delayMs: 20, text: secondToolStart },
          { delayMs: 45, text: secondToolDelta },
          { delayMs: 70, text: secondToolStop },
        ],
        () => {
          upstreamCancelled = true;
        }
      ),
      {
        model: "claude-sonnet-5",
        stream: true,
        responseMetadata: {},
        onComplete() {},
        onFailure() {},
      }
    );

    const output = await readResponseWithTimeout(response);
    assert.match(output, /"id":"toolu_14711_001"/);
    assert.match(output, /"id":"toolu_14711_002"/);
    assert.match(output, /"arguments":"\{\\"query\\":\\"stream\\"\}"/);
    assert.match(output, /"finish_reason":"tool_calls"/);
    assert.equal(upstreamCancelled, true);
  });

  it("handles tool_use alongside text content", async () => {
    const events = [
      { type: "message_start", message: { model: "claude-sonnet-5" } },
      { type: "content_block_start", index: 0, content_block: { type: "text" } },
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "text_delta", text: "I'll look that up." },
      },
      { type: "content_block_stop", index: 0 },
      {
        type: "content_block_start",
        index: 1,
        content_block: {
          type: "tool_use",
          id: "toolu_9408_003",
          name: "get_info",
          input: { topic: "weather" },
        },
      },
      { type: "content_block_stop", index: 1 },
      { type: "message_delta", delta: { stop_reason: "tool_use" } },
      { type: "message_stop" },
    ];

    const response = await createClaudeWebResponse(byteStream(frames(events)), {
      model: "claude-sonnet-5",
      stream: false,
      responseMetadata: {},
      onComplete() {},
      onFailure() {},
    });

    assert.equal(response.status, 200);
    const body = (await response.json()) as {
      choices: Array<{
        message: {
          content: string | null;
          tool_calls?: Array<{
            id: string;
            type: string;
            function: { name: string; arguments: string };
          }>;
        };
        finish_reason: string;
      }>;
    };

    // Should have text content AND tool calls
    assert.equal(body.choices[0].message.content, "I'll look that up.");
    assert.equal(body.choices[0].message.tool_calls!.length, 1);
    assert.equal(body.choices[0].message.tool_calls![0].id, "toolu_9408_003");
  });

  it("rejects input_json_delta when no tool_use block is open", async () => {
    const events = [
      { type: "message_start" },
      { type: "content_block_start", index: 0, content_block: { type: "text" } },
      {
        type: "content_block_delta",
        index: 0,
        delta: { type: "input_json_delta", partial_json: "{}" },
      },
      { type: "content_block_stop", index: 0 },
      { type: "message_delta", delta: { stop_reason: "end_turn" } },
      { type: "message_stop" },
    ];

    const completions: Array<unknown> = [];
    const errors: string[] = [];
    let failures = 0;

    const response = await createClaudeWebResponse(byteStream(frames(events)), {
      model: "claude-sonnet-5",
      stream: false,
      responseMetadata: {},
      onComplete: (result) => completions.push(result),
      onFailure: () => {
        failures += 1;
      },
      log: {
        error: (_tag, message) => errors.push(message),
      },
    });

    assert.equal(response.status, 502, "input_json_delta without open tool_use should fail");
    assert.deepEqual(completions, []);
    assert.equal(failures, 1);
    assert.match(errors[0], /Content delta type does not match its block/);
  });
});
