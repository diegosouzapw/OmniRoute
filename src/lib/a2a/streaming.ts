/**
 * A2A Server-Sent Events streaming
 */

import { A2ATask } from "./taskManager";

export const SSE_HEADERS = {
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "Connection": "keep-alive",
};

export async function createA2AStream(
  task: A2ATask,
  executor: (t: A2ATask) => Promise<{ artifacts: Array<{ type: string; content: string }>; metadata?: Record<string, unknown> }>,
  signal: AbortSignal,
  options?: {
    onStart?: () => void;
    onEnd?: () => void;
  }
): Promise<ReadableStream<Uint8Array>> {
  return new ReadableStream(async (controller) => {
    try {
      options?.onStart?.();

      const encoder = new TextEncoder();
      let isAborted = false;

      const unsubscribe = () => {
        isAborted = true;
      };
      signal.addEventListener("abort", unsubscribe);

      // Execute the skill and stream updates
      const result = await executor(task);

      if (!isAborted) {
        // Send completion event
        const event = {
          jsonrpc: "2.0",
          method: "message/stream",
          params: {
            task: { id: task.id, state: "completed" },
            artifacts: result.artifacts,
            metadata: result.metadata,
          },
        };
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      }

      controller.close();
      options?.onEnd?.();
      signal.removeEventListener("abort", unsubscribe);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      controller.error(new Error(`A2A Stream error: ${message}`));
      options?.onEnd?.();
    }
  });
}
