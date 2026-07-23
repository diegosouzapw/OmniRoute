import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { createCostMeter } from "../../../open-sse/services/compression/eval/costMeter.ts";

describe("eval cost meter", () => {
  it("accumulates spend and reports it", () => {
    const m = createCostMeter(1.0);
    m.add(0.2);
    m.add(0.3);
    assert.equal(Math.round(m.spent * 100) / 100, 0.5);
    assert.equal(m.exceeded, false);
  });

  it("wouldExceed is true when the next charge crosses the cap", () => {
    const m = createCostMeter(1.0);
    m.add(0.8);
    assert.equal(m.wouldExceed(0.3), true);
    assert.equal(m.wouldExceed(0.1), false);
  });

  it("marks exceeded once spend crosses the cap", () => {
    const m = createCostMeter(1.0);
    m.add(0.9);
    m.add(0.2);
    assert.equal(m.exceeded, true);
  });

  it("a cap of 0 or undefined means unbounded (never exceeds)", () => {
    const m = createCostMeter(0);
    m.add(1000);
    assert.equal(m.wouldExceed(1000), false);
    assert.equal(m.exceeded, false);
  });
});
