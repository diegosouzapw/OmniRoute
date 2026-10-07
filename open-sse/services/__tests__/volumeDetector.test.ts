import { describe, it, expect, vi } from "vitest";

// Mock the DB so recommendStrategyOverride sees adaptiveVolumeRouting = true.
// Without this the real getSettings() throws (no SQLite in test env), the
// catch block fires, and the function returns noOverride before any rule runs.
vi.mock("@/lib/db/settings", () => ({
  getSettings: vi.fn().mockResolvedValue({ adaptiveVolumeRouting: true }),
}));

import { detectVolumeSignals, recommendStrategyOverride } from "../volumeDetector";

describe("volumeDetector", async () => {
  describe("detectVolumeSignals", async () => {
    it("detects simple single-message request", async () => {
      const body = {
        messages: [{ role: "user", content: "Hello" }],
      };
      const signals = detectVolumeSignals(body);
      expect(signals.batchSize).toBe(1);
      expect(signals.estimatedTokens).toBeLessThan(100);
      expect(signals.toolCount).toBe(0);
      expect(signals.hasBrowser).toBe(false);
      expect(signals.complexity).toBe("trivial");
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
      expect(signals.toolCount).toBe(4);
      expect(signals.complexity).toBe("critical");
    });

    it("detects browser keywords", async () => {
      const body = {
        messages: [{ role: "user", content: "Navigate to the page and take a screenshot" }],
      };
      const signals = detectVolumeSignals(body);
      expect(signals.hasBrowser).toBe(true);
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
      expect(signals.batchSize).toBe(20);
    });

    it("detects security keywords as high complexity", async () => {
      const body = {
        messages: [{ role: "user", content: "Refactor the authentication module for production" }],
      };
      const signals = detectVolumeSignals(body);
      expect(
        signals.complexity === "critical" || signals.complexity === "high",
        `expected critical or high, got ${signals.complexity}`
      ).toBe(true);
    });
  });

  describe("recommendStrategyOverride", async () => {
    it("recommends round-robin for large batches", async () => {
      const signals = detectVolumeSignals({ input: Array(60).fill("item") });
      const override = await recommendStrategyOverride(signals, "priority");
      expect(override.shouldOverride).toBe(true);
      expect(override.strategy).toBe("round-robin");
      expect(override.preferEconomy).toBe(true);
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
      expect(override.shouldOverride).toBe(true);
      expect(override.strategy).toBe("priority");
      expect(override.forcePremium).toBe(true);
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
      expect(override.shouldOverride).toBe(false);
      expect(override.preferEconomy).toBe(true);
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
      expect(override.shouldOverride).toBe(false);
      expect(override.preferEconomy).toBe(false);
    });
  });
});
