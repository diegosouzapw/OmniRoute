// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import UsageAnalytics from "@/shared/components/UsageAnalytics";
import { ApiKeyTable, ProviderTable } from "@/shared/components/analytics/charts";
import { ModelTable } from "@/shared/components/analytics/ModelTable";
import RequestCountTable from "@/shared/components/analytics/RequestCountTable";
import { fmtFull } from "@/shared/utils/formatting";

const mockTranslate = (key: string, values?: Record<string, any>) => {
  if (key === "tokenDisplayCompact") return "Compact";
  if (key === "tokenDisplayExact") return "Exact";
  if (key === "tokenDisplayMode") return "Token Display Mode";
  if (key === "totalTokens") return "Total Tokens";
  if (key === "inputTokens") return "Input Tokens";
  if (key === "outputTokens") return "Output Tokens";
  if (key === "estCost") return "Est. Cost";
  if (values) return `${key}:${JSON.stringify(values)}`;
  return key;
};
mockTranslate.has = () => true;

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => mockTranslate,
}));

vi.mock("@/shared/components/analytics/rechartsCore", () => ({
  loadRecharts: vi.fn(),
  useRecharts: () => null,
  ChartLoadingCard: () => <div data-testid="chart-loading" />,
  DarkTooltip: () => null,
}));

const mockAnalyticsData = {
  summary: {
    totalTokens: 3712481200,
    promptTokens: 3700000000,
    completionTokens: 12481200,
    totalCost: 1180.27,
    totalRequests: 19433,
    uniqueAccounts: 40,
    uniqueApiKeys: 6,
    uniqueModels: 22,
    fastRequests: 0,
    fallbackRatePct: 0,
  },
  byProvider: [
    {
      provider: "anthropic",
      requests: 15,
      promptTokens: 2000000,
      completionTokens: 500000,
      totalTokens: 2500000,
      cost: 5.5,
    },
  ],
  byApiKey: [
    {
      apiKeyId: "key-12345678",
      apiKeyName: "Default Key",
      requests: 10,
      promptTokens: 1532000000,
      completionTokens: 6900000,
      totalTokens: 1538900000,
      cost: 12.34,
    },
  ],
  byModel: [
    {
      model: "claude-3-7-sonnet",
      requests: 20,
      promptTokens: 10000000,
      completionTokens: 2000000,
      totalTokens: 12000000,
      cost: 10.0,
    },
  ],
};

describe("Analytics Token Display Mode (Compact vs Exact)", () => {
  let container: HTMLElement;
  let root: Root | undefined;

  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
    localStorage.clear();

    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAnalyticsData),
        })
      )
    );
  });

  afterEach(() => {
    if (root) {
      act(() => {
        root!.unmount();
      });
      root = undefined;
    }
    container.remove();
    document.body.innerHTML = "";
    localStorage.clear();
    vi.unstubAllGlobals();
  });

  async function renderUsageAnalytics() {
    root = createRoot(container);
    await act(async () => {
      root!.render(<UsageAnalytics />);
    });
    // Wait for fetch to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 30));
    });
  }

  it("renders Compact and Exact toggle buttons in the toolbar", async () => {
    await renderUsageAnalytics();

    const toggleGroup = container.querySelector('[role="radiogroup"]');
    expect(toggleGroup).not.toBeNull();

    const buttons = toggleGroup?.querySelectorAll('button[role="radio"]');
    expect(buttons).toHaveLength(2);
    expect(buttons?.[0]?.textContent?.trim()).toBe("Compact");
    expect(buttons?.[1]?.textContent?.trim()).toBe("Exact");
    expect(buttons?.[0]?.getAttribute("aria-checked")).toBe("true");
    expect(buttons?.[1]?.getAttribute("aria-checked")).toBe("false");
  });

  it("switches to Exact mode on button click and updates KPI card displays", async () => {
    await renderUsageAnalytics();

    // In default compact mode, values should be compact (e.g. 3.7B)
    const kpiValues = container.querySelectorAll(".text-2xl.font-bold");
    expect(kpiValues[0]?.textContent).toBe("3.7B");
    expect(kpiValues[1]?.textContent).toBe("3.7B");
    expect(kpiValues[2]?.textContent).toBe("12.5M");

    // Click "Exact" toggle
    const exactBtn = container.querySelector(
      'button[role="radio"][title="Exact"]'
    ) as HTMLButtonElement;
    expect(exactBtn).not.toBeNull();

    await act(async () => {
      exactBtn.click();
    });

    expect(exactBtn.getAttribute("aria-checked")).toBe("true");

    // Now values should be formatted with full precision
    expect(kpiValues[0]?.textContent).toBe(fmtFull(3712481200));
    expect(kpiValues[1]?.textContent).toBe(fmtFull(3700000000));
    expect(kpiValues[2]?.textContent).toBe(fmtFull(12481200));

    // Check localStorage was persisted
    expect(localStorage.getItem("omniroute:analytics-token-display-mode")).toBe("exact");
  });

  it("hydrates saved 'exact' preference from localStorage on mount", async () => {
    localStorage.setItem("omniroute:analytics-token-display-mode", "exact");

    await renderUsageAnalytics();

    const exactBtn = container.querySelector('button[role="radio"][title="Exact"]');
    expect(exactBtn?.getAttribute("aria-checked")).toBe("true");

    const kpiValues = container.querySelectorAll(".text-2xl.font-bold");
    expect(kpiValues[0]?.textContent).toBe(fmtFull(3712481200));
  });

  it("ModelTable formats token columns according to displayMode prop", async () => {
    root = createRoot(container);
    const mockData = [
      {
        model: "claude-3-7-sonnet",
        requests: 20,
        promptTokens: 10000000,
        completionTokens: 2000000,
        totalTokens: 12000000,
        cost: 10.0,
      },
    ];

    // Compact mode
    await act(async () => {
      root!.render(
        <ModelTable byModel={mockData} summary={{ totalTokens: 12000000 }} displayMode="compact" />
      );
    });

    let cells = container.querySelectorAll("tbody tr td");
    expect(cells[2]?.textContent?.trim()).toBe("10.0M");
    expect(cells[3]?.textContent?.trim()).toBe("2.0M");
    expect(cells[4]?.textContent?.trim()).toBe("12.0M");

    // Unmount before re-rendering in new mode
    await act(async () => {
      root!.unmount();
    });
    root = createRoot(container);

    // Exact mode
    await act(async () => {
      root!.render(
        <ModelTable byModel={mockData} summary={{ totalTokens: 12000000 }} displayMode="exact" />
      );
    });

    cells = container.querySelectorAll("tbody tr td");
    expect(cells[2]?.textContent?.trim()).toBe(fmtFull(10000000));
    expect(cells[3]?.textContent?.trim()).toBe(fmtFull(2000000));
    expect(cells[4]?.textContent?.trim()).toBe(fmtFull(12000000));
  });

  it("ApiKeyTable formats token columns according to displayMode prop", async () => {
    root = createRoot(container);
    const mockData = [
      {
        apiKeyId: "key-123",
        apiKeyName: "Key",
        requests: 10,
        promptTokens: 1532000000,
        completionTokens: 6900000,
        totalTokens: 1538900000,
        cost: 12.34,
      },
    ];

    await act(async () => {
      root!.render(<ApiKeyTable byApiKey={mockData} displayMode="exact" />);
    });

    const cells = container.querySelectorAll("tbody tr td");
    expect(cells[2]?.textContent?.trim()).toBe(fmtFull(1532000000));
    expect(cells[3]?.textContent?.trim()).toBe(fmtFull(6900000));
    expect(cells[4]?.textContent?.trim()).toBe(fmtFull(1538900000));
  });

  it("ProviderTable formats token columns according to displayMode prop", async () => {
    root = createRoot(container);
    const mockData = [
      {
        provider: "anthropic",
        requests: 15,
        promptTokens: 2000000,
        completionTokens: 500000,
        totalTokens: 2500000,
        cost: 5.5,
      },
    ];

    await act(async () => {
      root!.render(<ProviderTable byProvider={mockData} displayMode="exact" />);
    });

    const cells = container.querySelectorAll("tbody tr td");
    expect(cells[2]?.textContent?.trim()).toBe(fmtFull(2000000));
    expect(cells[3]?.textContent?.trim()).toBe(fmtFull(500000));
    expect(cells[4]?.textContent?.trim()).toBe(fmtFull(2500000));
  });

  it("RequestCountTable formats token column according to displayMode prop", async () => {
    root = createRoot(container);
    const mockData = [
      {
        date: "2026-09-08",
        provider: "openai",
        requests: 5,
        promptTokens: 1000,
        completionTokens: 500,
        totalTokens: 1500000,
      },
    ];

    await act(async () => {
      root!.render(
        <RequestCountTable
          rows={mockData}
          sortBy="date"
          sortOrder="desc"
          onToggleSort={() => {}}
          dateLabel="Date"
          providerLabel="Provider"
          requestsLabel="Requests"
          totalLabel="Total"
          displayMode="exact"
        />
      );
    });

    const cells = container.querySelectorAll("tbody tr td");
    expect(cells[3]?.textContent?.trim()).toBe(fmtFull(1500000));
  });
});
