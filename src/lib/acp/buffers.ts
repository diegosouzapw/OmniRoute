/** Preserve the existing #13095 bound for native and legacy output. */
export const MAX_BUFFER_CHARS = 1_048_576;
const TRUNCATION_NOTICE = "\n[...output truncated...]\n";

export function appendCapped(buffer: string, chunk: string): string {
  const combined = buffer + chunk;
  if (combined.length <= MAX_BUFFER_CHARS) return combined;
  return TRUNCATION_NOTICE + combined.slice(-(MAX_BUFFER_CHARS - TRUNCATION_NOTICE.length));
}

/** Bound an incomplete wire frame before the SDK's JSON line accumulator. */
export function boundedFrames(maxBytes = 2 * MAX_BUFFER_CHARS) {
  let pending = 0;
  return new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      for (const byte of chunk) {
        pending = byte === 10 ? 0 : pending + 1;
        if (pending > maxBytes) throw new Error("ACP frame exceeded the transport limit");
      }
      controller.enqueue(chunk);
    },
  });
}
