import { describe, it, expect } from "vitest";
import { formatCost, formatCostAbbreviated, truncateUrl, safePercentage } from "./formatting";

describe("formatCost", () => {
  it("formats sub-cent values with 6 decimals", () => {
    expect(formatCost(0.000_001)).toBe("$0.000001");
  });

  it("formats cent-range values with 4 decimals", () => {
    expect(formatCost(0.05)).toBe("$0.0500");
  });

  it("formats dollar-range values with 2 decimals", () => {
    expect(formatCost(12.345)).toBe("$12.35");
  });

  it("returns $0 for null/undefined/NaN", () => {
    expect(formatCost(null)).toBe("$0");
    expect(formatCost(undefined)).toBe("$0");
    expect(formatCost(NaN)).toBe("$0");
  });
});

describe("formatCostAbbreviated", () => {
  it("abbreviates large values with K/M/B/T suffixes", () => {
    expect(formatCostAbbreviated(1_500)).toBe("$1.5K");
    expect(formatCostAbbreviated(2_000_000)).toBe("$2M");
    expect(formatCostAbbreviated(3_500_000_000)).toBe("$3.5B");
    expect(formatCostAbbreviated(1_200_000_000_000)).toBe("$1.2T");
  });

  it("formats small values with extra precision", () => {
    expect(formatCostAbbreviated(0.000_001)).toBe("$0.000001");
  });

  it("handles negative values", () => {
    expect(formatCostAbbreviated(-1_500)).toBe("-$1.5K");
    expect(formatCostAbbreviated(-0.005)).toBe("-$0.005000");
  });

  it("returns $0 for null/undefined/NaN", () => {
    expect(formatCostAbbreviated(null)).toBe("$0");
    expect(formatCostAbbreviated(undefined)).toBe("$0");
    expect(formatCostAbbreviated(NaN)).toBe("$0");
  });
});

describe("truncateUrl", () => {
  it("returns dash for empty input", () => {
    expect(truncateUrl(null)).toBe("-");
    expect(truncateUrl(undefined)).toBe("-");
  });

  it("truncates long URLs to hostname + pathname", () => {
    expect(truncateUrl("https://example.com/very/long/path/that/exceeds", 20)).toBe("example.com/very/lon…");
  });

  it("returns full display URL when under max", () => {
    expect(truncateUrl("https://example.com/short", 50)).toBe("example.com/short");
  });

  it("falls back to raw URL truncation on parse failure", () => {
    expect(truncateUrl("not-a-url-at-all-just-a-very-long-string-that-needs-truncation", 20)).toBe("not-a-url-at-all-just…");
  });
});

describe("safePercentage", () => {
  it("returns the number for finite values", () => {
    expect(safePercentage(42)).toBe(42);
    expect(safePercentage(0)).toBe(0);
  });

  it("returns undefined for non-numbers and non-finite values", () => {
    expect(safePercentage("42")).toBeUndefined();
    expect(safePercentage(NaN)).toBeUndefined();
    expect(safePercentage(Infinity)).toBeUndefined();
    expect(safePercentage(null)).toBeUndefined();
    expect(safePercentage(undefined)).toBeUndefined();
  });
});
