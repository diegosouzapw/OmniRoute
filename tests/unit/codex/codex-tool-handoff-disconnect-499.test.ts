/**
 * Regression coverage for Codex Responses tool handoffs: Codex can close the
 * current HTTP response immediately after receiving a complete tool-call item,
 * before the trailing response.completed frame reaches the client. OmniRoute
 * must keep the upstream transform alive briefly so its normal completion and
 * usage bookkeeping can still win over the delayed 499 finalizer.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { FORMATS } from "../../../open-sse/translator/formats.ts";
import { createCompletedResponsesToolHandoffWatcher } from "../../../open-sse/utils/responsesToolHandoff.ts";
import { createPassthroughStreamWithLogger } from "../../../open-sse/utils/stream.ts";
import {
  createDisconnectAwareStream,
  createNoopAbortWritable,
  createStreamController,
} from "../../../open-sse/utils/streamHandler.ts";
import { createClientDisconnectGraceHandler } from "../../../open-sse/utils/streamFailureFinalization.ts";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function sse(event: string, data: Record<string, unknown>): string {
  return `event: ${event}\ndata: ${JSON.stringify({ type: event, ...data })}\n\n`;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function cancelAfterFirstChunk({
  sseText,
  allowCompletedToolHandoffGrace = true,
}: {
  sseText: string;
  allowCompletedToolHandoffGrace?: boolean;
}): Promise<{ upstreamCancelled: boolean; disconnects: number; signalAborted: boolean }> {
  let upstreamCancelled = false;
  let disconnects = 0;
  const transformStream = {
    readable: new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(sseText));
      },
      cancel() {
        upstreamCancelled = true;
      },
    }),
    writable: createNoopAbortWritable(),
  };
  const streamController = createStreamController({
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    allowCompletedToolHandoffGrace,
    clientDisconnectGracePeriodMs: 50,
    onDisconnect: () => {
      disconnects++;
    },
  });
  const clientStream = createDisconnectAwareStream(transformStream, streamController);
  const reader = clientStream.getReader();
  assert.equal((await reader.read()).done, false);
  await reader.cancel("request_signal_aborted");

  return {
    upstreamCancelled,
    disconnects,
    signalAborted: streamController.signal.aborted,
  };
}

test("Codex tool handoff drains the trailing Responses completion instead of persisting 499", async () => {
  let upstreamController: ReadableStreamDefaultController<Uint8Array> | null = null;
  let upstreamCancelled = false;
  let completionRecorded = false;
  let completionStatus: number | null = null;
  let disconnectFinalizedAs499 = false;
  const clientAbortController = new AbortController();

  const providerStream = new ReadableStream<Uint8Array>({
    start(controller) {
      upstreamController = controller;
      controller.enqueue(
        encoder.encode(
          sse("response.output_item.added", {
            output_index: 0,
            item: {
              id: "ctc_1",
              type: "custom_tool_call",
              call_id: "call_1",
              name: "apply_patch",
              input: "",
              status: "in_progress",
            },
          }) +
            sse("response.custom_tool_call_input.done", {
              item_id: "ctc_1",
              output_index: 0,
              input: "*** Begin Patch\n*** End Patch",
            }) +
            sse("response.output_item.done", {
              output_index: 0,
              item: {
                id: "ctc_1",
                type: "custom_tool_call",
                call_id: "call_1",
                name: "apply_patch",
                input: "*** Begin Patch\n*** End Patch",
                status: "completed",
              },
            })
        )
      );
    },
    cancel() {
      upstreamCancelled = true;
    },
  });

  const disconnectGraceHandler = createClientDisconnectGraceHandler({
    isStreamCompletionRecorded: () => completionRecorded,
    gracePeriodMs: 50,
    pollIntervalMs: 5,
    finalize: () => {
      disconnectFinalizedAs499 = true;
      completionStatus = 499;
    },
  });
  const streamController = createStreamController({
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    allowCompletedToolHandoffGrace: true,
    clientDisconnectGracePeriodMs: 50,
    clientAbortSignal: clientAbortController.signal,
    onDisconnect: disconnectGraceHandler,
  });
  const transformStream = createPassthroughStreamWithLogger(
    "codex",
    null,
    null,
    "gpt-5.6-sol",
    "connection-1",
    { model: "gpt-5.6-sol", stream: true },
    (payload) => {
      completionRecorded = true;
      completionStatus = payload.status;
    },
    null,
    null,
    FORMATS.OPENAI_RESPONSES
  );
  const transformedBody = providerStream.pipeThrough(transformStream);
  const clientStream = createDisconnectAwareStream(
    { readable: transformedBody, writable: createNoopAbortWritable() },
    streamController
  );
  const reader = clientStream.getReader();

  let received = "";
  while (!received.includes("response.output_item.done")) {
    const chunk = await reader.read();
    assert.equal(chunk.done, false);
    received += decoder.decode(chunk.value, { stream: true });
  }

  clientAbortController.abort("request_signal_aborted");
  const cancelPromise = reader.cancel("request_signal_aborted");
  setTimeout(() => {
    try {
      upstreamController?.enqueue(
        encoder.encode(
          sse("response.completed", {
            response: {
              id: "resp_1",
              status: "completed",
              output: [
                {
                  id: "ctc_1",
                  type: "custom_tool_call",
                  call_id: "call_1",
                  name: "apply_patch",
                  input: "*** Begin Patch\n*** End Patch",
                  status: "completed",
                },
              ],
              usage: { input_tokens: 10, output_tokens: 2, total_tokens: 12 },
            },
          })
        )
      );
      upstreamController?.close();
    } catch {
      // The unchanged implementation cancels the upstream before this trailing
      // completion can arrive; the assertions below expose that regression.
    }
  }, 0);

  await cancelPromise;
  await wait(70);

  assert.equal(upstreamCancelled, false, "the completed tool handoff must be drained, not aborted");
  assert.equal(disconnectFinalizedAs499, false, "the real completion must beat the 499 finalizer");
  assert.equal(completionRecorded, true);
  assert.equal(completionStatus, 200);
});

test("Codex handoff grace does not apply to an incomplete custom tool call", async () => {
  const result = await cancelAfterFirstChunk({
    sseText: sse("response.output_item.done", {
      output_index: 0,
      item: {
        id: "ctc_1",
        type: "custom_tool_call",
        call_id: "call_1",
        name: "apply_patch",
        input: "partial",
        status: "completed",
      },
    }),
  });

  assert.deepEqual(result, { upstreamCancelled: true, disconnects: 1, signalAborted: true });
});

test("Codex handoff detection accepts a complete function call split across SSE chunks", () => {
  const watcher = createCompletedResponsesToolHandoffWatcher();
  const frames =
    sse("response.function_call_arguments.done", {
      item_id: "fc_1",
      output_index: 0,
      arguments: '{"path":"README.md"}',
    }) +
    sse("response.output_item.done", {
      output_index: 0,
      item: {
        id: "fc_1",
        type: "function_call",
        call_id: "call_1",
        name: "read_file",
        arguments: '{"path":"README.md"}',
        status: "completed",
      },
    });
  const splitAt = frames.indexOf("response.output_item.done") + 9;

  assert.equal(watcher.note(frames.slice(0, splitAt)), false);
  assert.equal(watcher.note(frames.slice(splitAt)), true);
});

test("Codex handoff grace requires matching done input and completed item payloads", async () => {
  const result = await cancelAfterFirstChunk({
    sseText:
      sse("response.custom_tool_call_input.done", {
        item_id: "ctc_1",
        output_index: 0,
        input: "complete input",
      }) +
      sse("response.output_item.done", {
        output_index: 0,
        item: {
          id: "ctc_1",
          type: "custom_tool_call",
          call_id: "call_1",
          name: "apply_patch",
          input: "different input",
          status: "completed",
        },
      }),
  });

  assert.deepEqual(result, { upstreamCancelled: true, disconnects: 1, signalAborted: true });
});

test("completed tool calls from non-Codex Responses clients keep normal abort behavior", async () => {
  const result = await cancelAfterFirstChunk({
    allowCompletedToolHandoffGrace: false,
    sseText:
      sse("response.function_call_arguments.done", {
        item_id: "fc_1",
        output_index: 0,
        arguments: "{}",
      }) +
      sse("response.output_item.done", {
        output_index: 0,
        item: {
          id: "fc_1",
          type: "function_call",
          call_id: "call_1",
          name: "read_file",
          arguments: "{}",
          status: "completed",
        },
      }),
  });

  assert.deepEqual(result, { upstreamCancelled: true, disconnects: 1, signalAborted: true });
});

test("Codex handoff grace still finalizes 499 and aborts when no completion arrives", async () => {
  let upstreamCancelled = false;
  let finalizedAs499 = false;
  let completionRecorded = false;
  const clientAbortController = new AbortController();
  const providerStream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          sse("response.custom_tool_call_input.done", {
            item_id: "ctc_1",
            output_index: 0,
            input: "complete input",
          }) +
            sse("response.output_item.done", {
              output_index: 0,
              item: {
                id: "ctc_1",
                type: "custom_tool_call",
                call_id: "call_1",
                name: "apply_patch",
                input: "complete input",
                status: "completed",
              },
            })
        )
      );
    },
    cancel() {
      upstreamCancelled = true;
    },
  });
  const disconnectGraceHandler = createClientDisconnectGraceHandler({
    isStreamCompletionRecorded: () => completionRecorded,
    gracePeriodMs: 25,
    pollIntervalMs: 5,
    finalize: () => {
      finalizedAs499 = true;
    },
  });
  const streamController = createStreamController({
    clientResponseFormat: FORMATS.OPENAI_RESPONSES,
    allowCompletedToolHandoffGrace: true,
    clientDisconnectGracePeriodMs: 25,
    clientAbortSignal: clientAbortController.signal,
    onDisconnect: disconnectGraceHandler,
  });
  const transformStream = createPassthroughStreamWithLogger(
    "codex",
    null,
    null,
    "gpt-5.6-sol",
    "connection-1",
    { model: "gpt-5.6-sol", stream: true },
    () => {
      completionRecorded = true;
    },
    null,
    null,
    FORMATS.OPENAI_RESPONSES
  );
  const clientStream = createDisconnectAwareStream(
    {
      readable: providerStream.pipeThrough(transformStream),
      writable: createNoopAbortWritable(),
    },
    streamController
  );
  const reader = clientStream.getReader();
  assert.equal((await reader.read()).done, false);

  clientAbortController.abort("request_signal_aborted");
  await reader.cancel("request_signal_aborted");
  await wait(60);

  assert.equal(completionRecorded, false);
  assert.equal(finalizedAs499, true);
  assert.equal(upstreamCancelled, true);
  assert.equal(streamController.signal.aborted, true);
});
