// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import CachePerformance from "../components/CachePerformance";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("CachePerformance", () => {
  const defaultProps = {
    hits: 850,
    misses: 150,
    hitRate: "85.0%",
    avgLatencyMs: 45,
    p95LatencyMs: 120,
    totalRequests: 1000,
  };

  describe("renders with data", () => {
    it("renders hit count", () => {
      render(<CachePerformance {...defaultProps} />);
      expect(screen.getByText("850")).toBeInTheDocument();
    });

    it("renders miss count", () => {
      render(<CachePerformance {...defaultProps} />);
      expect(screen.getByText("150")).toBeInTheDocument();
    });

    it("renders hit rate percentage", () => {
      render(<CachePerformance {...defaultProps} />);
      expect(screen.getByText("85.0%")).toBeInTheDocument();
    });

    it("renders total requests", () => {
      render(<CachePerformance {...defaultProps} />);
      expect(screen.getByText("1000")).toBeInTheDocument();
    });

    it("renders average latency", () => {
      render(<CachePerformance {...defaultProps} />);
      expect(screen.getByText("45")).toBeInTheDocument();
    });
  });

  describe("shows loading state", () => {
    it("renders skeleton when loading is true", () => {
      render(<CachePerformance {...defaultProps} loading={true} />);
      const skeletons = document.querySelectorAll("[data-testid='skeleton']");
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it("hides values when loading", () => {
      render(<CachePerformance {...defaultProps} loading={true} />);
      expect(screen.queryByText("850")).not.toBeInTheDocument();
    });

    it("shows values after loading completes", () => {
      render(<CachePerformance {...defaultProps} loading={false} />);
      expect(screen.getByText("850")).toBeInTheDocument();
    });
  });

  describe("handles empty state", () => {
    it("renders with zero hits and misses", () => {
      render(
        <CachePerformance
          hits={0}
          misses={0}
          hitRate="0%"
          avgLatencyMs={0}
          p95LatencyMs={0}
          totalRequests={0}
        />
      );
      expect(screen.getAllByText("0").length).toBeGreaterThan(0);
    });

    it("renders gracefully when stats is null", () => {
      render(<CachePerformance stats={null} />);
    });

    it("renders component container even with no data", () => {
      render(<CachePerformance stats={null} />);
      const container = document.querySelector("[data-testid='cache-performance']");
      expect(container).toBeInTheDocument();
    });
  });

  describe("handles API errors", () => {
    it("displays error message", () => {
      render(<CachePerformance {...defaultProps} error="Failed to load performance data" />);
      expect(screen.getByText(/failed to load performance data/i)).toBeInTheDocument();
    });

    it("shows retry button on error state", () => {
      render(<CachePerformance {...defaultProps} error="Timeout" onRetry={vi.fn()} />);
      expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
    });

    it("invokes onRetry callback on click", () => {
      const onRetry = vi.fn();
      render(<CachePerformance {...defaultProps} error="Timeout" onRetry={onRetry} />);
      screen.getByRole("button", { name: /retry/i }).click();
      expect(onRetry).toHaveBeenCalledOnce();
    });
  });
});
