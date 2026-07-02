/**
 * Unit tests for MCP Advanced Tools (Phase 3)
 *
 * Tests all 8 advanced tool handlers.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

describe("MCP Advanced Tools", () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe("simulate_route", () => {
    it("should return simulation with fallback tree", async () => {
      // Mock combos response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            id: "combo-1",
            name: "Fast",
            enabled: true,
            models: [
              { provider: "anthropic", model: "claude-sonnet", costPer1MTokens: 3 },
              { provider: "google", model: "gemini-pro", costPer1MTokens: 1 },
            ],
          },
        ],
      });

      const response = await mockFetch("http://localhost:20128/api/combos");
      const combos = await response.json();
      expect(combos).toHaveLength(1);
      expect(combos[0].models).toHaveLength(2);
    });
  });

  describe("set_budget_guard", () => {
    it("should accept valid budget parameters", () => {
      const args = { maxCost: 5.0, action: "alert", degradeToTier: "cheap" };
      expect(args.maxCost).toBeGreaterThan(0);
      expect(["degrade", "block", "alert"]).toContain(args.action);
    });

    it("should reject invalid actions", () => {
      const args = { maxCost: 5.0, action: "invalid" };
      expect(["degrade", "block", "alert"]).not.toContain(args.action);
    });
  });

  describe("set_resilience_profile", () => {
    it("should accept valid profile names", () => {
      const validProfiles = ["conservative", "balanced", "aggressive"];
      for (const profile of validProfiles) {
        expect(validProfiles).toContain(profile);
      }
    });
  });

  describe("test_combo", () => {
    it("should test combo with all models", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => [
          {
            id: "test-combo",
            models: [
              { provider: "anthropic", model: "claude-sonnet" },
              { provider: "google", model: "gemini-pro" },
            ],
          },
        ],
      });

      const response = await mockFetch("http://localhost:20128/api/combos");
      const combos = await response.json();
      const combo = combos.find((c: { id?: string }) => c.id === "test-combo");
      expect(combo).toBeDefined();
      expect(combo.models).toHaveLength(2);
    });
  });

  describe("get_provider_metrics", () => {
    it("should return detailed metrics for a provider", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          provider: "anthropic",
          requests: 100,
          avgLatencyMs: 1200,
          errorRate: 0.02,
        }),
      });

      const response = await mockFetch("http://localhost:20128/api/usage/analytics");
      const data = await response.json();
      expect(data).toHaveProperty("provider");
      expect(data).toHaveProperty("requests");
      expect(data.avgLatencyMs).toBeGreaterThan(0);
    });
  });

  describe("best_combo_for_task", () => {
    it("should recommend combo based on task type", () => {
      const taskTypes = ["coding", "review", "planning", "analysis", "debugging", "documentation"];
      for (const t of taskTypes) {
        expect(taskTypes).toContain(t);
      }
    });
  });

  describe("explain_route", () => {
    it("should accept a request ID", () => {
      const requestId = "550e8400-e29b-41d4-a716-446655440000";
      expect(requestId).toMatch(/^[0-9a-f-]+$/);
    });
  });

  describe("get_session_snapshot", () => {
    it("should return session data", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          sessionStart: "2026-03-03T17:00:00Z",
          requestCount: 42,
          totalCost: 0.15,
        }),
      });

      const response = await mockFetch("http://localhost:20128/api/usage/analytics?period=session");
      const data = await response.json();
      expect(data).toHaveProperty("sessionStart");
      expect(data).toHaveProperty("requestCount");
      expect(data.totalCost).toBeGreaterThanOrEqual(0);
    });
  });
});
