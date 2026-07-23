// tests/unit/playground-stream-metrics.test.ts
// Node native test runner — no React
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { computeMetrics } from "../../src/lib/playground/streamMetrics.js";

describe("computeMetrics", () => {
  const BASE_START = 1000;
  const BASE_FIRST = 1200;
  const BASE_FINISH = 3000;

  describe("ttftMs", () => {
    it("is firstChunkAt - startedAt when both are set", () => {
      const m = computeMetrics({
        startedAt: BASE_START,
        firstChunkAt: BASE_FIRST,
        finishedAt: BASE_FINISH,
        tokensIn: 10,
        tokensOut: 20,
      });
      assert.equal(m.ttftMs, BASE_FIRST - BASE_START); // 200
    });

    it("is null when firstChunkAt is null", () => {
      const m = computeMetrics({
        startedAt: BASE_START,
        firstChunkAt: null,
        finishedAt: BASE_FINISH,
        tokensIn: 10,
        tokensOut: 20,
      });
      assert.equal(m.ttftMs, null);
    });

    it("is null when startedAt is null", () => {
      const m = computeMetrics({
        startedAt: null,
        firstChunkAt: BASE_FIRST,
        finishedAt: BASE_FINISH,
        tokensIn: 10,
        tokensOut: 20,
      });
      assert.equal(m.ttftMs, null);
    });

    it("is null when both are null", () => {
      const m = computeMetrics({
        startedAt: null,
        firstChunkAt: null,
        finishedAt: null,
        tokensIn: 0,
        tokensOut: 0,
      });
      assert.equal(m.ttftMs, null);
    });
  });

  describe("totalMs", () => {
    it("is finishedAt - startedAt when both are set", () => {
      const m = computeMetrics({
        startedAt: BASE_START,
        firstChunkAt: BASE_FIRST,
        finishedAt: BASE_FINISH,
        tokensIn: 10,
        tokensOut: 20,
      });
      assert.equal(m.totalMs, BASE_FINISH - BASE_START); // 2000
    });

    it("is null when finishedAt is null", () => {
      const m = computeMetrics({
        startedAt: BASE_START,
        firstChunkAt: BASE_FIRST,
        finishedAt: null,
        tokensIn: 10,
        tokensOut: 20,
      });
      assert.equal(m.totalMs, null);
    });

    it("is null when startedAt is null", () => {
      const m = computeMetrics({
        startedAt: null,
        firstChunkAt: BASE_FIRST,
        finishedAt: BASE_FINISH,
        tokensIn: 10,
        tokensOut: 20,
      });
      assert.equal(m.totalMs, null);
    });
  });

  describe("tps (tokens per second)", () => {
    it("is tokensOut / (totalMs / 1000)", () => {
      // totalMs = 2000ms => 2s; tokensOut = 20 => tps = 10
      const m = computeMetrics({
        startedAt: BASE_START,
        firstChunkAt: BASE_FIRST,
        finishedAt: BASE_FINISH,
        tokensIn: 10,
        tokensOut: 20,
      });
      assert.equal(m.tps, 20 / (2000 / 1000)); // 10
    });

    it("is null when tokensOut is 0", () => {
      const m = computeMetrics({
        startedAt: BASE_START,
        firstChunkAt: BASE_FIRST,
        finishedAt: BASE_FINISH,
        tokensIn: 10,
        tokensOut: 0,
      });
      assert.equal(m.tps, null);
    });

    it("is null when totalMs is null (stream not finished)", () => {
      const m = computeMetrics({
        startedAt: BASE_START,
        firstChunkAt: BASE_FIRST,
        finishedAt: null,
        tokensIn: 10,
        tokensOut: 20,
      });
      assert.equal(m.tps, null);
    });

    it("is null when totalMs is 0 (avoid division by zero)", () => {
      const m = computeMetrics({
        startedAt: BASE_START,
        firstChunkAt: BASE_FIRST,
        finishedAt: BASE_START, // same as start => 0ms
        tokensIn: 10,
        tokensOut: 20,
      });
      assert.equal(m.tps, null);
    });

    it("computes correct tps for various token counts", () => {
      const cases: Array<{ tokensOut: number; totalMs: number; expected: number }> = [
        { tokensOut: 100, totalMs: 1000, expected: 100 },
        { tokensOut: 50, totalMs: 2000, expected: 25 },
        { tokensOut: 1, totalMs: 500, expected: 2 },
      ];
      for (const { tokensOut, totalMs, expected } of cases) {
        const m = computeMetrics({
          startedAt: 0,
          firstChunkAt: 1,
          finishedAt: totalMs,
          tokensIn: 5,
          tokensOut,
        });
        assert.equal(m.tps, expected, `tps should be ${expected} for ${tokensOut}t/${totalMs}ms`);
      }
    });
  });

  describe("costUsd", () => {
    it("computes cost: (tokensIn × inPer1k + tokensOut × outPer1k) / 1000", () => {
      const m = computeMetrics({
        startedAt: BASE_START,
        firstChunkAt: BASE_FIRST,
        finishedAt: BASE_FINISH,
        tokensIn: 1000,
        tokensOut: 500,
        pricing: { inUsdPer1k: 0.003, outUsdPer1k: 0.015, estimated: true },
      });
      // cost = (1000 * 0.003 + 500 * 0.015) / 1000 = (3 + 7.5) / 1000 = 0.0105
      assert.ok(Math.abs((m.costUsd ?? 0) - 0.0105) < 1e-10);
    });

    it("is null when pricing is absent", () => {
      const m = computeMetrics({
        startedAt: BASE_START,
        firstChunkAt: BASE_FIRST,
        finishedAt: BASE_FINISH,
        tokensIn: 1000,
        tokensOut: 500,
      });
      assert.equal(m.costUsd, null);
    });

    it("handles zero tokens", () => {
      const m = computeMetrics({
        startedAt: BASE_START,
        firstChunkAt: BASE_FIRST,
        finishedAt: BASE_FINISH,
        tokensIn: 0,
        tokensOut: 0,
        pricing: { inUsdPer1k: 0.003, outUsdPer1k: 0.015, estimated: true },
      });
      assert.equal(m.costUsd, 0);
    });

    it("computes gpt-4o style pricing correctly", () => {
      // gpt-4o: in=0.0025, out=0.01 per 1k
      const m = computeMetrics({
        startedAt: 0,
        firstChunkAt: 100,
        finishedAt: 2000,
        tokensIn: 2000,
        tokensOut: 300,
        pricing: { inUsdPer1k: 0.0025, outUsdPer1k: 0.01, estimated: true },
      });
      const expected = (2000 * 0.0025 + 300 * 0.01) / 1000; // (5 + 3) / 1000 = 0.008
      assert.ok(Math.abs((m.costUsd ?? 0) - expected) < 1e-10);
    });
  });

  describe("passthrough fields", () => {
    it("returns tokensIn and tokensOut unchanged", () => {
      const m = computeMetrics({
        startedAt: BASE_START,
        firstChunkAt: BASE_FIRST,
        finishedAt: BASE_FINISH,
        tokensIn: 42,
        tokensOut: 77,
      });
      assert.equal(m.tokensIn, 42);
      assert.equal(m.tokensOut, 77);
    });
  });

  describe("initial state (all null)", () => {
    it("returns all-null metrics when nothing has happened", () => {
      const m = computeMetrics({
        startedAt: null,
        firstChunkAt: null,
        finishedAt: null,
        tokensIn: 0,
        tokensOut: 0,
      });
      assert.equal(m.ttftMs, null);
      assert.equal(m.totalMs, null);
      assert.equal(m.tps, null);
      assert.equal(m.costUsd, null);
      assert.equal(m.tokensIn, 0);
      assert.equal(m.tokensOut, 0);
    });
  });
});
