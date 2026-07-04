import test from "node:test";
import assert from "node:assert/strict";

/**
 * Regression test for the GLM `</think>` close-marker leak.
 *
 * GLM's Anthropic transport does its own Claude→OpenAI SSE translation inside
 * the executor (via `translateSseResponse`), bypassing chatCore's stream
 * pipeline. chatCore already resolves `suppressThinkClose` from the client
 * User-Agent / `x-omniroute-thinking-marker` header, but the GLM executor was
 * not passing the flag to its internal stream transform — so the textual
 * `</think>` marker leaked into the visible content for OpenCode and other
 * clients that render it verbatim (#5245 / #5312).
 *
 * This test verifies that `translateSseResponse` propagates the flag to the
 * underlying `createSSETransformStreamWithLogger`, which in turn gates the
 * marker emission in `claude-to-openai.ts`.
 */

// We test the stream output directly: feed a Claude-format SSE stream through
// `translateSseResponse` and check whether `</think>` appears in the output.

const { resolveSuppressThinkClose, THINKING_MARKER_HEADER } =
  await import("../../open-sse/utils/thinkCloseMarker.ts");

// Build a minimal Claude SSE stream: thinking block → text block → finish.
function buildClaudeSseStream(): string {
  const events: string[] = [];

  // message_start
  events.push(
    `event: message_start\ndata: ${JSON.stringify({
      type: "message_start",
      message: { id: "msg_test", model: "glm-5.2" },
    })}`
  );

  // thinking block
  events.push(
    `event: content_block_start\ndata: ${JSON.stringify({
      type: "content_block_start",
      index: 0,
      content_block: { type: "thinking" },
    })}`
  );
  events.push(
    `event: content_block_delta\ndata: ${JSON.stringify({
      type: "content_block_delta",
      index: 0,
      delta: { type: "thinking_delta", thinking: "reasoning here" },
    })}`
  );
  events.push(
    `event: content_block_stop\ndata: ${JSON.stringify({
      type: "content_block_stop",
      index: 0,
    })}`
  );

  // text block
  events.push(
    `event: content_block_start\ndata: ${JSON.stringify({
      type: "content_block_start",
      index: 1,
      content_block: { type: "text" },
    })}`
  );
  events.push(
    `event: content_block_delta\ndata: ${JSON.stringify({
      type: "content_block_delta",
      index: 1,
      delta: { type: "text_delta", text: "final answer" },
    })}`
  );
  events.push(
    `event: content_block_stop\ndata: ${JSON.stringify({
      type: "content_block_stop",
      index: 1,
    })}`
  );

  // message_delta with stop_reason
  events.push(
    `event: message_delta\ndata: ${JSON.stringify({
      type: "message_delta",
      delta: { stop_reason: "end_turn" },
      usage: { input_tokens: 10, output_tokens: 20 },
    })}`
  );

  // message_stop
  events.push(`event: message_stop\ndata: ${JSON.stringify({ type: "message_stop" })}`);

  return events.map((e) => e + "\n").join("\n");
}

async function collectStreamOutput(response: Response): Promise<string> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let output = "";
   
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    output += decoder.decode(value, { stream: true });
  }
  return output;
}

test("GLM translateSseResponse: suppressThinkClose=false emits </think> marker (Claude Code / Cursor compat)", async () => {
  const { translateSseResponse } = await import("../../open-sse/executors/glm.ts");

  const sseBody = buildClaudeSseStream();
  const upstream = new Response(sseBody, {
    headers: { "content-type": "text/event-stream" },
  });

  const translated = translateSseResponse(upstream, "glm", "glm-5.2", false);
  const output = await collectStreamOutput(translated);

  assert.ok(output.includes("</think>"), "marker must be emitted when suppressThinkClose is false");
  assert.ok(output.includes("final answer"), "real text content must be present");
});

test("GLM translateSseResponse: suppressThinkClose=true suppresses </think> marker (OpenCode)", async () => {
  const { translateSseResponse } = await import("../../open-sse/executors/glm.ts");

  const sseBody = buildClaudeSseStream();
  const upstream = new Response(sseBody, {
    headers: { "content-type": "text/event-stream" },
  });

  const translated = translateSseResponse(upstream, "glm", "glm-5.2", true);
  const output = await collectStreamOutput(translated);

  assert.ok(
    !output.includes("</think>"),
    "marker must be suppressed when suppressThinkClose is true"
  );
  assert.ok(output.includes("final answer"), "real text content must still be present");
  assert.ok(
    output.includes("reasoning_content"),
    "reasoning_content must still be emitted for thinking blocks"
  );
});

test("GLM translateSseResponse: default (no flag) emits </think> marker for backward compat", async () => {
  const { translateSseResponse } = await import("../../open-sse/executors/glm.ts");

  const sseBody = buildClaudeSseStream();
  const upstream = new Response(sseBody, {
    headers: { "content-type": "text/event-stream" },
  });

  // Call without the 4th arg — default must be false (preserve #4633)
  const translated = translateSseResponse(upstream, "glm", "glm-5.2");
  const output = await collectStreamOutput(translated);

  assert.ok(
    output.includes("</think>"),
    "marker must be emitted by default (backward compat with #4633)"
  );
});

test("resolveSuppressThinkClose: OpenCode UA triggers suppression for GLM path", () => {
  // This is the resolution that executeTransport does before calling
  // translateSseResponse. Verify the integration point.
  assert.equal(
    resolveSuppressThinkClose({ userAgent: "opencode/1.17.11" }),
    true,
    "OpenCode UA must resolve to suppress"
  );
  assert.equal(
    resolveSuppressThinkClose({ userAgent: "claude-code/1.0" }),
    false,
    "Claude Code UA must resolve to keep"
  );
  assert.equal(
    resolveSuppressThinkClose({
      userAgent: "cursor-agent/0.5",
      thinkingMarkerHeader: "off",
    }),
    true,
    "Header off must override UA"
  );
  assert.equal(
    THINKING_MARKER_HEADER,
    "x-omniroute-thinking-marker",
    "Header constant must match wire name"
  );
});
