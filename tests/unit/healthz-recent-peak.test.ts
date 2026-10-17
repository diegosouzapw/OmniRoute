import test from "node:test";
import assert from "node:assert/strict";
import { consumeEventLoopPeakMs } from "../../src/lib/healthzLag.ts";

test("a large recent stall is not diluted by lifetime mean and is consumed once", () => {
  const histogram = {
    max: 90_000_000_000,
    mean: 20_100_000,
    reset() {
      this.max = 0;
    },
  };
  assert.equal(consumeEventLoopPeakMs(histogram), 90000);
  assert.equal(consumeEventLoopPeakMs(histogram), 0);
});

test("an uninitialized or non-finite sample is not a warning", () => {
  for (const max of [0, NaN, Infinity]) {
    let resets = 0;
    assert.equal(
      consumeEventLoopPeakMs({
        max,
        reset() {
          resets++;
        },
      }),
      0
    );
    assert.equal(resets, 1);
  }
});
