/**
 * Queuing strategy that counts a `Uint8Array` queue in bytes instead of chunks.
 *
 * A bare `{ highWaterMark: N }` counts chunks, so a 16384 budget meant ~16k chunks of
 * arbitrary size (effectively unbounded) and let a slow client pin the whole upstream
 * body in memory. Shared by the SSE transform (`utils/stream.ts`) and the Antigravity
 * credits-extraction passthrough so both apply the same byte-based backpressure.
 */
export function createByteLengthQueueStrategy(highWaterMark: number): QueuingStrategy<Uint8Array> {
  return {
    highWaterMark,
    size(chunk: Uint8Array) {
      return chunk.byteLength;
    },
  };
}

/** Writable + readable strategies of a `TransformStream`, both budgeted in bytes. */
export function createByteLengthQueueStrategies(
  highWaterMark: number
): [QueuingStrategy<Uint8Array>, QueuingStrategy<Uint8Array>] {
  return [
    createByteLengthQueueStrategy(highWaterMark),
    createByteLengthQueueStrategy(highWaterMark),
  ];
}
