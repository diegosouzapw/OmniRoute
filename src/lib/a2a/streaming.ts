/**
 * A2A SSE Streaming Support
 *
 * Provides SSE event formatting for A2A `message/stream` responses.
 * Features: heartbeat (15s), chunk emission, metadata final event, cancellation.
 */

import type { A2ATask } from "./taskManager";

export interface SSEChunkEvent {
  jsonrpc: "2.0";
  method: "message/stream";
  params: {
    task: { id: string; state: string };
    chunk?: { type: string; content: string };
    metadata?: Record<string, unknown>;
  };
}

/**
 * Format an SSE event line.
 */
export function formatSSE(event: SSEChunkEvent): string {
  return `data: ${JSON.stringify(event)}\n\n`;
}

/**
 * Create a chunk event for streaming text content.
 */
export function createChunkEvent(taskId: string, content: string): string {
  return formatSSE({
    jsonrpc: "2.0",
    method: "message/stream",
    params: {
      task: { id: taskId, state: "working" },
      chunk: { type: "text", content },
    },
  });
}

/**
 * Create the final completion event with metadata.
 */
export function createCompletionEvent(taskId: string, metadata: Record<string, unknown>): string {
  return formatSSE({
    jsonrpc: "2.0",
    method: "message/stream",
    params: {
      task: { id: taskId, state: "completed" },
      metadata,
    },
  });
}

/**
 * Create a heartbeat event to keep the connection alive.
 */
export function createHeartbeat(taskId: string): string {
  return `: heartbeat ${new Date().toISOString()}\n\n`;
}

/**
 * Create a failure event.
 */
export function createFailureEvent(taskId: string, error: string): string {
  return formatSSE({
    jsonrpc: "2.0",
    method: "message/stream",
    params: {
      task: { id: taskId, state: "failed" },
      metadata: { error },
    },
  });
}

/**
 * SSE response headers for A2A streaming.
 */
export const SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache, no-transform",
  Connection: "keep-alive",
  "X-Accel-Buffering": "no",
} as const;

/**
 * Create a streaming SSE handler that wraps a fetch-based LLM call.
 * Returns a ReadableStream suitable for a Response object.
 */
export function createA2AStream(
  task: A2ATask,
  executeSkill: (
    task: A2ATask
  ) => Promise<{ artifacts: Array<{ content: string }>; metadata: Record<string, unknown> }>,
  abortSignal?: AbortSignal
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      // Heartbeat interval
      const heartbeatInterval = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(createHeartbeat(task.id)));
        } catch {
          /* stream closed */
        }
      }, 15_000);

      try {
        // Check for cancellation
        if (abortSignal?.aborted) {
          controller.enqueue(encoder.encode(createFailureEvent(task.id, "Cancelled")));
          controller.close();
          return;
        }

        // Execute the skill
        const result = await executeSkill(task);

        // Emit content as chunks (simulated streaming for non-streaming skills)
        for (const artifact of result.artifacts) {
          if (abortSignal?.aborted) break;
          controller.enqueue(encoder.encode(createChunkEvent(task.id, artifact.content)));
        }

        // Emit completion with metadata
        controller.enqueue(encoder.encode(createCompletionEvent(task.id, result.metadata)));
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        controller.enqueue(encoder.encode(createFailureEvent(task.id, msg)));
      } finally {
        clearInterval(heartbeatInterval);
        controller.close();
      }
    },
  });
}
