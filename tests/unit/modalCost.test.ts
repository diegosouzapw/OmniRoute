import { test } from "node:test";
import assert from "node:assert/strict";
import {
  computeImageCost,
  computeAudioCost,
  computeRerankCost,
  computeVideoCost,
  calculateModalCost,
} from "../../src/lib/usage/costCalculator.ts";

test("computeImageCost: per-image flat × n", () => {
  assert.equal(computeImageCost({ output_cost_per_image: 0.04 }, { n: 3 }), 0.12);
  assert.equal(computeImageCost({}, { n: 3 }), 0);
  assert.equal(computeImageCost({ output_cost_per_image: 0.04 }, { n: 0 }), 0);
});
test("computeAudioCost: per-second OR per-character, else 0", () => {
  assert.equal(computeAudioCost({ input_cost_per_second: 0.0001 }, { seconds: 30 }), 0.003);
  assert.equal(computeAudioCost({ input_cost_per_character: 0.000015 }, { characters: 1000 }), 0.015);
  assert.equal(computeAudioCost({ input_cost_per_second: 0.0001 }, {}), 0);
});
test("computeRerankCost: per search unit", () => {
  assert.equal(computeRerankCost({ search_unit_cost: 0.002 }, { searchUnits: 5 }), 0.01);
  assert.equal(computeRerankCost({}, { searchUnits: 5 }), 0);
});
test("computeVideoCost: per video-second", () => {
  assert.equal(computeVideoCost({ output_cost_per_video_per_second: 0.5 }, { seconds: 8 }), 4);
  assert.equal(computeVideoCost({}, { seconds: 8 }), 0);
});
test("calculateModalCost returns 0 for unknown pricing (fail-open)", async () => {
  const cost = await calculateModalCost("image", "no-such-provider", "no-such-model", { n: 2 });
  assert.equal(cost, 0);
});
