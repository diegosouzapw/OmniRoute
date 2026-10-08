import test from "node:test";
import assert from "node:assert/strict";

import {
  createByteLengthQueueStrategies,
  createByteLengthQueueStrategy,
} from "../../open-sse/utils/byteQueueStrategy.ts";

test("SSE queue strategy measures Uint8Array capacity in bytes", () => {
  const strategy = createByteLengthQueueStrategy(16 * 1024);
  assert.equal(strategy.highWaterMark, 16 * 1024);
  assert.equal(strategy.size?.(new Uint8Array(1)), 1);
  assert.equal(strategy.size?.(new Uint8Array(4096)), 4096);
  assert.equal(strategy.size?.(new Uint8Array(16 * 1024)), 16 * 1024);
});

test("SSE queue strategies pair applies the same byte budget to both sides", () => {
  const [writable, readable] = createByteLengthQueueStrategies(16 * 1024);
  for (const strategy of [writable, readable]) {
    assert.equal(strategy.highWaterMark, 16 * 1024);
    assert.equal(strategy.size?.(new Uint8Array(4096)), 4096);
  }
  assert.notEqual(writable, readable);
});
