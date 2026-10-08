/**
 * Content-stall watchdog vs long reasoning turns.
 *
 * Production incident (2026-10-06): Claude Opus 5.5 at xhigh effort streamed one thinking
 * block for minutes — ~95 content_block_delta frames per 115s carrying no visible thinking
 * text — and the content-stall watchdog cancelled the turn as "no model output" on every
 * combo target. Claude Code then re-sent the turn as a non-streaming request, which sends
 * no bytes until the answer is complete and was cut off by the reverse proxy's 120s read
 * timeout (Cloudflare 524). Codex xhigh turns stalled the same way while emitting one
 * reasoning item after another. Reasoning frames are progress: they must keep the watchdog
 * from firing, without counting as model output for the empty-turn check (#8649).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { createStreamController, pipeWithDisconnect } from "../../open-sse/utils/streamHandler.ts";
import { createStreamContentWatcher } from "../../open-sse/utils/streamReadiness.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const CONTENT_STALL_MS = 100;
const STEP_MS = 25;
// Reasoning runs three times longer than the content-stall budget.
const REASONING_STEPS = 12;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function claudeFrame(event: string, data: Record<string, unknown>): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

const CLAUDE_MESSAGE_START = claudeFrame("message_start", {
  type: "message_start",
  message: { id: "msg_1", type: "message", role: "assistant", content: [], model: "opus" },
});
const CLAUDE_THINKING_START = claudeFrame("content_block_start", {
  type: "content_block_start",
  index: 0,
  content_block: { type: "thinking", thinking: "" },
});
const CLAUDE_EMPTY_THINKING_DELTA = claudeFrame("content_block_delta", {
  type: "content_block_delta",
  index: 0,
  delta: { type: "thinking_delta", thinking: "" },
});
const CLAUDE_PING = claudeFrame("ping", { type: "ping" });

const RESPONSES_REASONING_ADDED = `data: ${JSON.stringify({
  type: "response.output_item.added",
  output_index: 0,
  item: { id: "rs_1", type: "reasoning", summary: [] },
})}\n\n`;
const RESPONSES_REASONING_DONE = `data: ${JSON.stringify({
  type: "response.output_item.done",
  output_index: 0,
  item: { id: "rs_1", type: "reasoning", summary: [], encrypted_content: "gAAAAB" },
})}\n\n`;

async function readStreamText(stream: ReadableStream<Uint8Array>): Promise<string> {
  const reader = stream.getReader();
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    text += decoder.decode(value, { stream: true });
  }
  return text + decoder.decode();
}

function runThroughWatchdog(source: ReadableStream<Uint8Array>) {
  const errors: string[] = [];
  const controller = createStreamController({
    onError(event: { message?: string }) {
      errors.push(String(event?.message ?? ""));
      return true;
    },
  });
  const stream = pipeWithDisconnect(new Response(source), new TransformStream(), controller, {
    stallTimeoutMs: 5_000,
    contentStallTimeoutMs: CONTENT_STALL_MS,
  });
  return { stream, errors };
}

test("a Claude thinking block that keeps streaming outlasts the content-stall budget", async () => {
  const source = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(encoder.encode(CLAUDE_MESSAGE_START + CLAUDE_THINKING_START));
      for (let i = 0; i < REASONING_STEPS; i++) {
        await sleep(STEP_MS);
        controller.enqueue(encoder.encode(CLAUDE_EMPTY_THINKING_DELTA));
      }
      controller.enqueue(
        encoder.encode(
          claudeFrame("content_block_delta", {
            type: "content_block_delta",
            index: 0,
            delta: { type: "signature_delta", signature: "sig" },
          }) +
            claudeFrame("content_block_stop", { type: "content_block_stop", index: 0 }) +
            claudeFrame("content_block_start", {
              type: "content_block_start",
              index: 1,
              content_block: { type: "text", text: "" },
            }) +
            claudeFrame("content_block_delta", {
              type: "content_block_delta",
              index: 1,
              delta: { type: "text_delta", text: "Hello" },
            }) +
            claudeFrame("message_stop", { type: "message_stop" })
        )
      );
      controller.close();
    },
  });

  const { stream, errors } = runThroughWatchdog(source);
  const text = await readStreamText(stream);

  assert.deepEqual(errors, [], "a model that is still thinking must not be cancelled");
  assert.doesNotMatch(text, /content stall/i);
  assert.match(text, /Hello/);
});

test("Codex reasoning items arriving one after another outlast the content-stall budget", async () => {
  const source = new ReadableStream<Uint8Array>({
    async start(controller) {
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ type: "response.created", response: { id: "resp_1" } })}\n\n`
        )
      );
      for (let i = 0; i < REASONING_STEPS / 2; i++) {
        await sleep(STEP_MS);
        controller.enqueue(encoder.encode(RESPONSES_REASONING_ADDED));
        await sleep(STEP_MS);
        controller.enqueue(encoder.encode(RESPONSES_REASONING_DONE));
      }
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ type: "response.output_text.delta", delta: "Hello" })}\n\n`
        )
      );
      controller.close();
    },
  });

  const { stream, errors } = runThroughWatchdog(source);
  const text = await readStreamText(stream);

  assert.deepEqual(errors, []);
  assert.match(text, /Hello/);
});

test("a thinking block that goes quiet still trips the content-stall watchdog", async () => {
  let timer: ReturnType<typeof setInterval> | undefined;
  const source = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        encoder.encode(CLAUDE_MESSAGE_START + CLAUDE_THINKING_START + CLAUDE_EMPTY_THINKING_DELTA)
      );
      // Only heartbeats from here on: bytes keep flowing, the model does not.
      timer = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(CLAUDE_PING));
        } catch {
          clearInterval(timer);
        }
      }, STEP_MS);
    },
    cancel() {
      clearInterval(timer);
    },
  });

  const { stream, errors } = runThroughWatchdog(source);
  const text = await readStreamText(stream);
  clearInterval(timer);

  assert.equal(errors.length, 1);
  assert.match(errors[0], /content stall/i);
  assert.match(text, /content stall/i);
});

test("reasoning frames are progress, not model output, for the empty-turn check", () => {
  const watcher = createStreamContentWatcher();
  watcher.note(CLAUDE_MESSAGE_START + CLAUDE_THINKING_START + CLAUDE_EMPTY_THINKING_DELTA);
  watcher.note(RESPONSES_REASONING_ADDED + RESPONSES_REASONING_DONE + CLAUDE_PING);
  watcher.finish();

  assert.equal(watcher.sawContent(), false, "#8649 must still see an empty turn");
  assert.equal(watcher.reasoningProgress(), 4);
});
