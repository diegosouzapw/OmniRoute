/**
 * Controllable fake upstream ReadableStream for integration tests.
 * Allows pushing chunks, closing, erroring, and observing cancel.
 */
export function fakeUpstreamStream() {
  let controllerRef: ReadableStreamDefaultController<Uint8Array> | null = null;
  let cancelCb: ((reason?: unknown) => void) | null = null;
  const enc = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controllerRef = controller;
    },
    cancel(reason) {
      cancelCb?.(reason);
    },
  });

  return {
    stream,
    push: (s: string) => controllerRef?.enqueue(enc.encode(s)),
    close: () => controllerRef?.close(),
    error: (e: unknown) => controllerRef?.error(e),
    onCancel: (cb: (reason?: unknown) => void) => {
      cancelCb = cb;
    },
  };
}
