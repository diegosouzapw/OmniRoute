// @vitest-environment jsdom
/**
 * Issue #11459 / PR #11460 — the costs dashboard opts into flat-rate estimate
 * mode (`includeFlatRateEstimates=true`) while every cost label on the page
 * still asserts actual billed money ("Spend Today", "Total Cost," in the CSV,
 * the month-end projection). A flat-rate subscription that renders $0 in
 * billed-cost mode renders a token-price estimate here, with no disclosure.
 *
 * The API already returns the truthful `includesFlatRateEstimates` flag
 * (src/app/api/usage/analytics/route.ts). These tests assert the UI and the CSV
 * export actually consume it:
 *
 *   - flag true  -> the cost surface, the forecast and the CSV summary row all
 *                   disclose that the numbers include flat-rate estimates;
 *   - flag false/absent -> the billed-cost presentation is byte-for-byte
 *                   unchanged (no disclosure, plain `Total Cost,` summary row).
 */
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import en from "../../../src/i18n/messages/en.json";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(""),
}));

// The costs tab lazy-loads recharts cards via next/dynamic. They are unrelated
// to the disclosure contract and are expensive to mount in jsdom.
vi.mock("@/app/(dashboard)/dashboard/costs/components/CostCharts", () => ({
  CostTrendCard: () => <div data-testid="cost-trend-card" />,
  ProviderSpendCard: () => <div data-testid="provider-spend-card" />,
  WeeklyPatternCard: () => <div data-testid="weekly-pattern-card" />,
}));

// Keep the shared barrel out of jsdom — CostOverviewTab only needs these four.
vi.mock("@/shared/components", () => ({
  Card: ({ children, className }: { children?: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
  ),
  EmptyState: ({ title, description }: { title?: string; description?: string }) => (
    <div>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  ),
  SegmentedControl: () => <div data-testid="segmented-control" />,
  CardSkeleton: () => <div data-testid="card-skeleton" />,
}));

const { default: CostOverviewTab } =
  await import("../../../src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx");

const DISCLOSURE_RE = /estimat/i;

function buildPayload(overrides: Record<string, unknown> = {}) {
  return {
    summary: {
      totalCost: 30,
      totalRequests: 4,
      uniqueModels: 1,
      uniqueAccounts: 1,
      uniqueApiKeys: 1,
      totalTokens: 2_000_000,
      promptTokens: 1_000_000,
      completionTokens: 1_000_000,
      fallbackCount: 0,
      fallbackRatePct: 0,
      requestedModelCoveragePct: 100,
      streak: 0,
    },
    byProvider: [{ provider: "claude", requests: 4, totalTokens: 2_000_000, cost: 30 }],
    byModel: [{ model: "claude-opus-5", requests: 4, totalTokens: 2_000_000, cost: 30 }],
    byApiKey: [],
    byAccount: [],
    dailyTrend: [{ date: "2026-08-25", cost: 30 }],
    weeklyPattern: [],
    activityMap: {},
    presetSummaries: { "1d": { totalCost: 30 }, "7d": { totalCost: 30 }, "30d": { totalCost: 30 } },
    ...overrides,
  };
}

let container: HTMLDivElement;
let root: Root;
let downloadedBlobs: Blob[];

function installFetch(payload: unknown) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes("/api/usage/analytics")) {
        return new Response(JSON.stringify(payload), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    })
  );
}

beforeEach(() => {
  downloadedBlobs = [];
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  // downloadFile() round-trips the export through an object URL; capture the Blob.
  vi.stubGlobal("URL", {
    ...URL,
    createObjectURL: vi.fn((blob: Blob) => {
      downloadedBlobs.push(blob);
      return "blob:mock";
    }),
    revokeObjectURL: vi.fn(),
  });
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

async function renderWith(payload: unknown) {
  installFetch(payload);
  await act(async () => {
    root.render(<CostOverviewTab />);
  });
  // let the analytics fetch resolve and re-render
  await act(async () => {
    await Promise.resolve();
  });
}

async function exportCsvText(): Promise<string> {
  const csvButton = Array.from(container.querySelectorAll("button")).find((button) =>
    button.getAttribute("title")?.includes("CSV")
  );
  expect(csvButton, "CSV export button should be rendered").not.toBeUndefined();
  await act(async () => {
    csvButton!.click();
  });
  expect(downloadedBlobs.length).toBe(1);
  return await downloadedBlobs[0].text();
}

describe("costs dashboard — flat-rate estimate disclosure (#11459)", () => {
  it("localizes the disclosure copy instead of hard-coding English", () => {
    const notice = (en as { costs: Record<string, string> }).costs.flatRateEstimateNotice;
    expect(notice, "costs.flatRateEstimateNotice must exist in en.json").toBeTruthy();
    expect(notice).toMatch(DISCLOSURE_RE);
  });

  it("discloses estimate mode when the API reports includesFlatRateEstimates: true", async () => {
    await renderWith(buildPayload({ includesFlatRateEstimates: true }));

    const text = container.textContent || "";
    expect(text).toMatch(/Spend Today/);
    expect(
      DISCLOSURE_RE.test(text),
      "costs page must disclose that displayed cost includes flat-rate estimates"
    ).toBe(true);
  });

  it("marks the month-end forecast when estimate mode is on", async () => {
    await renderWith(buildPayload({ includesFlatRateEstimates: true }));

    const forecastCard = Array.from(container.querySelectorAll("div")).find((node) =>
      node.textContent?.includes("Monthly Forecast")
    );
    expect(forecastCard, "monthly forecast card should be rendered").not.toBeUndefined();
    expect(
      DISCLOSURE_RE.test(forecastCard!.textContent || ""),
      "month-end projection must not assert billed money while estimate mode is on"
    ).toBe(true);
  });

  it("marks the CSV summary row when estimate mode is on", async () => {
    await renderWith(buildPayload({ includesFlatRateEstimates: true }));
    const csv = await exportCsvText();

    const summaryRow = csv.split("\n").find((line) => line.startsWith("Total Cost"));
    expect(summaryRow, "CSV should carry a Total Cost summary row").not.toBeUndefined();
    expect(
      DISCLOSURE_RE.test(summaryRow!),
      "CSV summary row must not assert billed money while estimate mode is on"
    ).toBe(true);
  });

  it("leaves the billed-cost presentation unchanged when the flag is absent", async () => {
    await renderWith(buildPayload());

    const text = container.textContent || "";
    expect(text).toMatch(/Spend Today/);
    expect(
      DISCLOSURE_RE.test(text),
      "billed-cost mode must not claim the numbers are estimates"
    ).toBe(false);

    const csv = await exportCsvText();
    const summaryRow = csv.split("\n").find((line) => line.startsWith("Total Cost"));
    expect(summaryRow).toBe("Total Cost,$30.00");
  });

  it("leaves the billed-cost presentation unchanged when the flag is false", async () => {
    await renderWith(buildPayload({ includesFlatRateEstimates: false }));

    const text = container.textContent || "";
    expect(
      DISCLOSURE_RE.test(text),
      "billed-cost mode must not claim the numbers are estimates"
    ).toBe(false);
  });
});
