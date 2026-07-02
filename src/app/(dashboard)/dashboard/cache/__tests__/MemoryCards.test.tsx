// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import React from "react";
import MemoryCards from "../components/MemoryCards";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

afterEach(() => {
  cleanup();
});

describe("MemoryCards", () => {
  const defaultProps = {
    memoryEntries: 42,
    dbEntries: 120,
    hits: 300,
    misses: 50,
    hitRate: "85.7%",
    tokensSaved: 15000,
  };

  describe("renders with data", () => {
    it("renders memory entry count", () => {
      render(<MemoryCards {...defaultProps} />);
      expect(screen.getByText("42")).toBeInTheDocument();
    });

    it("renders db entry count", () => {
      render(<MemoryCards {...defaultProps} />);
      expect(screen.getByText("120")).toBeInTheDocument();
    });

    it("renders hit rate value", () => {
      render(<MemoryCards {...defaultProps} />);
      expect(screen.getByText("85.7%")).toBeInTheDocument();
    });

    it("renders tokens saved", () => {
      render(<MemoryCards {...defaultProps} />);
      expect(screen.getByText("15000")).toBeInTheDocument();
    });
  });

  describe("shows loading state", () => {
    it("renders skeleton loaders when loading prop is true", () => {
      render(<MemoryCards {...defaultProps} loading={true} />);
      const skeletons = document.querySelectorAll("[data-testid='skeleton']");
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it("does not render stat values while loading", () => {
      render(<MemoryCards {...defaultProps} loading={true} />);
      expect(screen.queryByText("42")).not.toBeInTheDocument();
    });

    it("renders content once loading is false", () => {
      render(<MemoryCards {...defaultProps} loading={false} />);
      expect(screen.getByText("42")).toBeInTheDocument();
    });
  });

  describe("handles empty state", () => {
    it("renders zero values gracefully", () => {
      render(
        <MemoryCards
          memoryEntries={0}
          dbEntries={0}
          hits={0}
          misses={0}
          hitRate="0%"
          tokensSaved={0}
        />
      );
      expect(screen.getAllByText("0").length).toBeGreaterThan(0);
    });

    it("renders with null stats gracefully", () => {
      const { container } = render(<MemoryCards stats={null} />);
      expect(container).toBeInTheDocument();
    });
  });

  describe("handles API errors", () => {
    it("renders error message when error prop is provided", () => {
      render(<MemoryCards {...defaultProps} error="Failed to load cache stats" />);
      expect(screen.getByText(/failed to load cache stats/i)).toBeInTheDocument();
    });

    it("shows retry button on error", () => {
      render(<MemoryCards {...defaultProps} error="Network error" onRetry={vi.fn()} />);
      expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
    });

    it("calls onRetry when retry button clicked", async () => {
      const onRetry = vi.fn();
      render(<MemoryCards {...defaultProps} error="Network error" onRetry={onRetry} />);
      screen.getByRole("button", { name: /retry/i }).click();
      expect(onRetry).toHaveBeenCalledOnce();
    });
  });
});
