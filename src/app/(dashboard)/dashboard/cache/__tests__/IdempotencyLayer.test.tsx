// @vitest-environment jsdom
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import IdempotencyLayer from "../components/IdempotencyLayer";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("IdempotencyLayer", () => {
  const defaultProps = {
    deduplicatedRequests: 47,
    windowMs: 5000,
    activeKeys: 12,
    totalProcessed: 1200,
    savedCalls: 47,
  };

  describe("renders with data", () => {
    it("renders deduplicated request count", () => {
      render(<IdempotencyLayer {...defaultProps} />);
      expect(screen.getByText("47")).toBeInTheDocument();
    });

    it("renders deduplication window duration", () => {
      render(<IdempotencyLayer {...defaultProps} />);
      expect(screen.getByText("5000")).toBeInTheDocument();
    });

    it("renders active idempotency key count", () => {
      render(<IdempotencyLayer {...defaultProps} />);
      expect(screen.getByText("12")).toBeInTheDocument();
    });

    it("renders total processed requests", () => {
      render(<IdempotencyLayer {...defaultProps} />);
      expect(screen.getByText("1200")).toBeInTheDocument();
    });
  });

  describe("shows loading state", () => {
    it("shows skeleton while loading", () => {
      render(<IdempotencyLayer {...defaultProps} loading={true} />);
      const skeletons = document.querySelectorAll("[data-testid='skeleton']");
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it("hides data values during loading", () => {
      render(<IdempotencyLayer {...defaultProps} loading={true} />);
      expect(screen.queryByText("47")).not.toBeInTheDocument();
    });

    it("displays values once loading is complete", () => {
      render(<IdempotencyLayer {...defaultProps} loading={false} />);
      expect(screen.getByText("47")).toBeInTheDocument();
    });
  });

  describe("handles empty state", () => {
    it("renders with zero deduplicated requests", () => {
      render(
        <IdempotencyLayer
          deduplicatedRequests={0}
          windowMs={5000}
          activeKeys={0}
          totalProcessed={0}
          savedCalls={0}
        />
      );
      expect(screen.getAllByText("0").length).toBeGreaterThan(0);
    });

    it("renders gracefully when stats is null", () => {
      render(<IdempotencyLayer stats={null} />);
    });

    it("renders container element even with null stats", () => {
      render(<IdempotencyLayer stats={null} />);
      const container = document.querySelector("[data-testid='idempotency-layer']");
      expect(container).toBeInTheDocument();
    });
  });

  describe("handles API errors", () => {
    it("shows error message when error prop provided", () => {
      render(<IdempotencyLayer {...defaultProps} error="Failed to load idempotency data" />);
      expect(screen.getByText(/failed to load idempotency data/i)).toBeInTheDocument();
    });

    it("renders retry button on error", () => {
      render(<IdempotencyLayer {...defaultProps} error="API unavailable" onRetry={vi.fn()} />);
      expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
    });

    it("calls onRetry handler when retry is clicked", () => {
      const onRetry = vi.fn();
      render(<IdempotencyLayer {...defaultProps} error="API unavailable" onRetry={onRetry} />);
      screen.getByRole("button", { name: /retry/i }).click();
      expect(onRetry).toHaveBeenCalledOnce();
    });
  });
});
