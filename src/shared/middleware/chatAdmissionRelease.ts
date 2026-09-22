/**
 * Lease release binding for streamed chat responses.
 *
 * Extracted from `chatBodyAdmission.ts` so the admission controller module does
 * not keep growing. The release paths on a wrapped SSE body are all driven by
 * the consumer (pull-to-done, pull-throws, cancel). A client that disconnects
 * mid-stream may stop pulling without ever cancelling, so the request signal is
 * observed as a fallback and the slot is returned exactly once.
 */
import type { ChatAdmissionLease } from "./chatBodyAdmission";

export interface ReleaseChatAdmissionOptions {
  /**
   * The inbound request signal. A disconnecting client may simply stop pulling
   * the wrapped stream without ever cancelling it, in which case none of the
   * consumer-driven release paths run. Aborting releases the slot.
   */
  readonly signal?: AbortSignal;
}

/** Hold a heavyweight lease through an SSE response without buffering the response body. */
export function releaseChatAdmissionWhenDone(
  response: Response,
  lease: ChatAdmissionLease | null,
  options: ReleaseChatAdmissionOptions = {}
): Response {
  if (!lease) return response;
  const isStreaming = response.headers.get("content-type")?.includes("text/event-stream");
  if (!isStreaming || !response.body) {
    lease.release();
    return response;
  }

  const reader = response.body.getReader();

  const { signal } = options;
  let detachAbortListener = (): void => undefined;
  const releaseOnce = (): void => {
    detachAbortListener();
    if (!lease.released) lease.release();
  };

  if (signal) {
    const onAbort = (): void => {
      releaseOnce();
      void reader.cancel("client disconnected").catch(() => undefined);
    };
    if (signal.aborted) {
      onAbort();
    } else {
      signal.addEventListener("abort", onAbort, { once: true });
      detachAbortListener = () => signal.removeEventListener("abort", onAbort);
    }
  }

  const body = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          releaseOnce();
          controller.close();
        } else {
          controller.enqueue(value);
        }
      } catch (error) {
        releaseOnce();
        controller.error(error);
      }
    },
    async cancel(reason) {
      releaseOnce();
      await reader.cancel(reason).catch(() => undefined);
    },
  });

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

/** Release a lease if a handler rejects; otherwise bind it to the returned response lifecycle. */
export async function releaseChatAdmissionAfterHandler(
  responsePromise: Promise<Response>,
  lease: ChatAdmissionLease | null,
  options: ReleaseChatAdmissionOptions = {}
): Promise<Response> {
  try {
    return releaseChatAdmissionWhenDone(await responsePromise, lease, options);
  } catch (error) {
    lease?.release();
    throw error;
  }
}
