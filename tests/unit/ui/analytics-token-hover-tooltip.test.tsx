// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  StatCard,
  CompactStatGrid,
  ApiKeyTable,
  ProviderTable,
} from "@/shared/components/analytics/charts";
import { ModelTable } from "@/shared/components/analytics/ModelTable";
import RequestCountTable from "@/shared/components/analytics/RequestCountTable";
import { fmtFull } from "@/shared/utils/formatting";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => {
    const t = (key: string, values?: Record<string, any>) => {
      if (values) return `${key}:${JSON.stringify(values)}`;
      return key;
    };
    t.has = () => false;
    return t;
  },
}));

describe("Analytics Token Hover Tooltips", () => {
  let container: HTMLElement;

  beforeEach(() => {
    (globalThis as any).IS_REACT_ACT_ENVIRONMENT = true;
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
    document.body.innerHTML = "";
  });

  it("StatCard renders custom tooltip when provided, else falls back to value", async () => {
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <div>
          <StatCard
            icon="generating_tokens"
            label="Total Tokens"
            value="1.5B"
            tooltip={fmtFull(1532481200)}
          />
          <StatCard icon="payments" label="Est. Cost" value="$1180.27" />
        </div>
      );
    });

    const values = container.querySelectorAll(".text-2xl.font-bold");
    expect(values).toHaveLength(2);
    expect(values[0]?.getAttribute("title")).toBe(fmtFull(1532481200));
    expect(values[0]?.textContent).toBe("1.5B");
    expect(values[1]?.getAttribute("title")).toBe("$1180.27");
    expect(values[1]?.textContent).toBe("$1180.27");
  });

  it("CompactStatGrid renders item tooltip when provided", async () => {
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <CompactStatGrid
          sections={[
            {
              title: "Performance",
              items: [
                {
                  icon: "speed",
                  label: "Avg Tokens/Req",
                  value: "131.5K",
                  tooltip: fmtFull(131482),
                },
                {
                  icon: "bolt",
                  label: "Fast Requests",
                  value: "0",
                },
              ],
            },
          ]}
        />
      );
    });

    const statElements = container.querySelectorAll(".text-sm.font-bold.text-right");
    expect(statElements).toHaveLength(2);
    expect(statElements[0]?.getAttribute("title")).toBe(fmtFull(131482));
    expect(statElements[1]?.getAttribute("title")).toBe("0");
  });

  it("ApiKeyTable renders full token counts as title hover tooltips", async () => {
    const root = createRoot(container);
    const mockData = [
      {
        apiKeyId: "key-12345678",
        apiKeyName: "Default Key",
        requests: 10,
        promptTokens: 1532000000,
        completionTokens: 6900000,
        totalTokens: 1538900000,
        cost: 12.34,
      },
    ];

    await act(async () => {
      root.render(<ApiKeyTable byApiKey={mockData} />);
    });

    const rows = container.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(1);

    const cells = rows[0]?.querySelectorAll("td");
    // promptTokens
    expect(cells?.[2]?.getAttribute("title")).toBe(fmtFull(1532000000));
    expect(cells?.[2]?.textContent?.trim()).toBe("1.5B");
    // completionTokens
    expect(cells?.[3]?.getAttribute("title")).toBe(fmtFull(6900000));
    expect(cells?.[3]?.textContent?.trim()).toBe("6.9M");
    // totalTokens
    expect(cells?.[4]?.getAttribute("title")).toBe(fmtFull(1538900000));
    expect(cells?.[4]?.textContent?.trim()).toBe("1.5B");
  });

  it("ProviderTable renders full token counts as title hover tooltips", async () => {
    const root = createRoot(container);
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
      root.render(<ProviderTable byProvider={mockData} />);
    });

    const rows = container.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(1);

    const cells = rows[0]?.querySelectorAll("td");
    // promptTokens
    expect(cells?.[2]?.getAttribute("title")).toBe(fmtFull(2000000));
    expect(cells?.[2]?.textContent?.trim()).toBe("2.0M");
    // completionTokens
    expect(cells?.[3]?.getAttribute("title")).toBe(fmtFull(500000));
    expect(cells?.[3]?.textContent?.trim()).toBe("500.0K");
    // totalTokens
    expect(cells?.[4]?.getAttribute("title")).toBe(fmtFull(2500000));
    expect(cells?.[4]?.textContent?.trim()).toBe("2.5M");
  });

  it("ModelTable renders full token counts as title hover tooltips", async () => {
    const root = createRoot(container);
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

    await act(async () => {
      root.render(<ModelTable byModel={mockData} summary={{ totalTokens: 12000000 }} />);
    });

    const rows = container.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(1);

    const cells = rows[0]?.querySelectorAll("td");
    // promptTokens
    expect(cells?.[2]?.getAttribute("title")).toBe(fmtFull(10000000));
    expect(cells?.[2]?.textContent?.trim()).toBe("10.0M");
    // completionTokens
    expect(cells?.[3]?.getAttribute("title")).toBe(fmtFull(2000000));
    expect(cells?.[3]?.textContent?.trim()).toBe("2.0M");
    // totalTokens
    expect(cells?.[4]?.getAttribute("title")).toBe(fmtFull(12000000));
    expect(cells?.[4]?.textContent?.trim()).toBe("12.0M");
  });

  it("RequestCountTable renders full totalTokens count as title hover tooltip", async () => {
    const root = createRoot(container);
    const mockData = [
      {
        date: "2026-09-03",
        provider: "openai",
        requests: 5,
        promptTokens: 1000,
        completionTokens: 500,
        totalTokens: 1500000,
      },
    ];

    await act(async () => {
      root.render(
        <RequestCountTable
          rows={mockData}
          sortBy="date"
          sortOrder="desc"
          onToggleSort={() => {}}
          dateLabel="Date"
          providerLabel="Provider"
          requestsLabel="Requests"
          totalLabel="Total"
        />
      );
    });

    const rows = container.querySelectorAll("tbody tr");
    expect(rows).toHaveLength(1);

    const cells = rows[0]?.querySelectorAll("td");
    // totalTokens cell (index 3)
    expect(cells?.[3]?.getAttribute("title")).toBe(fmtFull(1500000));
    expect(cells?.[3]?.textContent?.trim()).toBe("1.5M");
  });
});
