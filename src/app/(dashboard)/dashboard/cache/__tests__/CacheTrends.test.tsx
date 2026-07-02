// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import CacheTrends from "../components/CacheTrends";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const sampleTrendData = [
  { timestamp: "2026-04-01T00:00:00Z", requests: 120, hits: 100, misses: 20, hitRate: 83.3 },
  { timestamp: "2026-04-01T01:00:00Z", requests: 95, hits: 80, misses: 15, hitRate: 84.2 },
  { timestamp: "2026-04-01T02:00:00Z", requests: 200, hits: 180, misses: 20, hitRate: 90.0 },
];

describe("CacheTrends", () => {
  describe("renders with data", () => {
    it("renders the trend chart container", () => {
      render(<CacheTrends data={sampleTrendData} />);
      const container = document.querySelector("[data-testid='cache-trends']");
      expect(container).toBeInTheDocument();
    });

    it("renders a data point for each trend entry", () => {
      render(<CacheTrends data={sampleTrendData} />);
      const bars = document.querySelectorAll("[data-testid='trend-bar']");
      expect(bars.length).toBe(sampleTrendData.length);
    });

    it("renders chart title or heading", () => {
      render(<CacheTrends data={sampleTrendData} />);
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    it("renders peak hit rate from data", () => {
      render(<CacheTrends data={sampleTrendData} />);
      expect(screen.getByText("90.0")).toBeInTheDocument();
    });
  });

  describe("shows loading state", () => {
    it("renders skeleton while loading", () => {
      render(<CacheTrends data={[]} loading={true} />);
      const skeletons = document.querySelectorAll("[data-testid='skeleton']");
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it("hides chart bars while loading", () => {
      render(<CacheTrends data={sampleTrendData} loading={true} />);
      const bars = document.querySelectorAll("[data-testid='trend-bar']");
      expect(bars.length).toBe(0);
    });

    it("renders bars after loading finishes", () => {
      render(<CacheTrends data={sampleTrendData} loading={false} />);
      const bars = document.querySelectorAll("[data-testid='trend-bar']");
      expect(bars.length).toBe(sampleTrendData.length);
    });
  });

  describe("handles empty state", () => {
    it("renders empty state message when data array is empty", () => {
      render(<CacheTrends data={[]} />);
      expect(screen.getByText(/no data/i)).toBeInTheDocument();
    });

    it("renders without crashing when data is null", () => {
      render(<CacheTrends data={null} />);
    });

    it("shows empty container element when no trend data", () => {
      render(<CacheTrends data={null} />);
      const container = document.querySelector("[data-testid='cache-trends']");
      expect(container).toBeInTheDocument();
    });
  });

  describe("handles API errors", () => {
    it("shows error message when error prop is set", () => {
      render(<CacheTrends data={[]} error="Failed to load trend data" />);
      expect(screen.getByText(/failed to load trend data/i)).toBeInTheDocument();
    });

    it("renders retry button on error", () => {
      render(<CacheTrends data={[]} error="Network timeout" onRetry={vi.fn()} />);
      expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
    });

    it("triggers onRetry when retry clicked", () => {
      const onRetry = vi.fn();
      render(<CacheTrends data={[]} error="Network timeout" onRetry={onRetry} />);
      screen.getByRole("button", { name: /retry/i }).click();
      expect(onRetry).toHaveBeenCalledOnce();
    });
  });
});
