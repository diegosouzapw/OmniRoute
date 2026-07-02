import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { detectVolumeSignals, recommendStrategyOverride } from "../volumeDetector";

describe("volumeDetector", async () => {
  describe("detectVolumeSignals", async () => {
    it("detects simple single-message request", async () => {
      const body = {
        messages: [{ role: "user", content: "Hello" }],
      };
      const signals = detectVolumeSignals(body);
      assert.equal(signals.batchSize, 1);
      assert.ok(signals.estimatedTokens < 100);
      assert.equal(signals.toolCount, 0);
      assert.equal(signals.hasBrowser, false);
      assert.equal(signals.complexity, "trivial");
    });

    it("detects tool-heavy request as high complexity", async () => {
      const body = {
        messages: [{ role: "user", content: "Deploy the app to production" }],
        tools: [
          { type: "function", function: { name: "run_command" } },
          { type: "function", function: { name: "read_file" } },
          { type: "function", function: { name: "write_file" } },
          { type: "function", function: { name: "browser_action" } },
        ],
      };
      const signals = detectVolumeSignals(body);
      assert.equal(signals.toolCount, 4);
      assert.equal(signals.complexity, "critical");
    });

    it("detects browser keywords", async () => {
      const body = {
        messages: [{ role: "user", content: "Navigate to the page and take a screenshot" }],
      };
      const signals = detectVolumeSignals(body);
      assert.equal(signals.hasBrowser, true);
    });

    it("detects batch from multi-part content", async () => {
      const parts = Array.from({ length: 20 }, (_, i) => ({
        type: "text",
        text: `Item ${i}`,
      }));
      const body = {
        messages: [{ role: "user", content: parts }],
      };
      const signals = detectVolumeSignals(body);
      assert.equal(signals.batchSize, 20);
    });

    it("detects security keywords as high complexity", async () => {
      const body = {
        messages: [{ role: "user", content: "Refactor the authentication module for production" }],
      };
      const signals = detectVolumeSignals(body);
      assert.ok(
        signals.complexity === "critical" || signals.complexity === "high",
        `expected critical or high, got ${signals.complexity}`
      );
    });
  });

  describe("recommendStrategyOverride", async () => {
    it("recommends round-robin for large batches", async () => {
      const signals = detectVolumeSignals({ input: Array(60).fill("item") });
      const override = await recommendStrategyOverride(signals, "priority");
      assert.equal(override.shouldOverride, true);
      assert.equal(override.strategy, "round-robin");
      assert.equal(override.preferEconomy, true);
    });

    it("recommends premium-first for browser tasks", async () => {
      const signals = {
        batchSize: 1,
        estimatedTokens: 500,
        toolCount: 2,
        hasBrowser: true,
        hasImages: false,
        complexity: "high" as const,
      };
      const override = await recommendStrategyOverride(signals, "round-robin");
      assert.equal(override.shouldOverride, true);
      assert.equal(override.strategy, "priority");
      assert.equal(override.forcePremium, true);
    });

    it("flags economy for tiny requests without changing strategy", async () => {
      const signals = {
        batchSize: 1,
        estimatedTokens: 100,
        toolCount: 0,
        hasBrowser: false,
        hasImages: false,
        complexity: "trivial" as const,
      };
      const override = await recommendStrategyOverride(signals, "priority");
      assert.equal(override.shouldOverride, false);
      assert.equal(override.preferEconomy, true);
    });

    it("no override for normal medium requests", async () => {
      const signals = {
        batchSize: 1,
        estimatedTokens: 1000,
        toolCount: 0,
        hasBrowser: false,
        hasImages: false,
        complexity: "low" as const,
      };
      const override = await recommendStrategyOverride(signals, "priority");
      assert.equal(override.shouldOverride, false);
      assert.equal(override.preferEconomy, false);
    });
  });
});
