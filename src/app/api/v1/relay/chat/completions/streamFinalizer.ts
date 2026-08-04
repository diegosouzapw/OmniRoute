export function finalizeReadableStream(
  body: ReadableStream<Uint8Array>,
  onFinalize: (error?: unknown) => void
): ReadableStream<Uint8Array> {
  const reader = body.getReader();
  let finalized = false;

  const finalizeOnce = (error?: unknown) => {
    if (finalized) return;
    finalized = true;
    onFinalize(error);
  };

  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          finalizeOnce();
          controller.close();
          return;
        }
        controller.enqueue(value);
      } catch (error) {
        finalizeOnce(error);
        controller.error(error);
      }
    },
    async cancel(reason) {
      try {
        await reader.cancel(reason);
      } finally {
        finalizeOnce(reason);
      }
    },
  });
}
