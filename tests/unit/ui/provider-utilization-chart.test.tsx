// @vitest-environment jsdom
import React from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProviderCharts from "@/app/(dashboard)/dashboard/analytics/components/ProviderCharts";

vi.mock("recharts", () => {
  return {
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    LineChart: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="line-chart">{children}</div>
    ),
    CartesianGrid: () => <div data-testid="grid" />,
    XAxis: () => <div data-testid="xaxis" />,
    YAxis: () => <div data-testid="yaxis" />,
    Legend: () => <div data-testid="legend" />,
    Tooltip: (props: any) => (
      <div
        data-testid="chart-tooltip"
        data-z-index={props.wrapperStyle?.zIndex}
        data-pointer-events={props.wrapperStyle?.pointerEvents}
      />
    ),
    Line: (props: any) => (
      <div data-testid="chart-line" data-key={props.dataKey} data-name={props.name} />
    ),
  };
});

describe("ProviderCharts Component", () => {
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

  it("renders tooltip with zIndex 1000 wrapperStyle and positioned after Legend", async () => {
    const root = createRoot(container);
    await act(async () => {
      root.render(
        <ProviderCharts
          chartData={[{ timestamp: "2026-09-08T00:00:00Z", "antigravity:conn-1": 100 }]}
          providers={["antigravity:conn-1"]}
          providerColors={new Map([["antigravity:conn-1", "#10b981"]])}
          range="24h"
          resolveProviderName={(p) => (p === "antigravity:conn-1" ? "user@example.com" : p)}
          nodeMap={{}}
          formatTimestamp={(v) => v}
          formatPercent={(v) => `${v}%`}
          formatTooltipTimestamp={(v) => v}
        />
      );
    });

    const tooltip = container.querySelector('[data-testid="chart-tooltip"]');
    expect(tooltip).not.toBeNull();
    expect(tooltip?.getAttribute("data-z-index")).toBe("1000");
    expect(tooltip?.getAttribute("data-pointer-events")).toBe("none");

    // Verify DOM order: Legend appears before Tooltip so Tooltip is painted on top
    const lineChart = container.querySelector('[data-testid="line-chart"]');
    const children = Array.from(lineChart?.children || []);
    const legendIndex = children.findIndex((el) => el.getAttribute("data-testid") === "legend");
    const tooltipIndex = children.findIndex(
      (el) => el.getAttribute("data-testid") === "chart-tooltip"
    );
    expect(legendIndex).toBeGreaterThan(-1);
    expect(tooltipIndex).toBeGreaterThan(legendIndex);
  });

  it("resolves account connection IDs to display names for Line and Legend labels", async () => {
    const root = createRoot(container);
    const mockResolve = vi.fn((key: string) => {
      if (key === "antigravity:uuid-1234") return "games.zaim@gmail.com";
      return key;
    });

    await act(async () => {
      root.render(
        <ProviderCharts
          chartData={[{ timestamp: "2026-09-08T00:00:00Z", "antigravity:uuid-1234": 85 }]}
          providers={["antigravity:uuid-1234"]}
          providerColors={new Map([["antigravity:uuid-1234", "#10b981"]])}
          range="24h"
          resolveProviderName={mockResolve}
          nodeMap={{}}
          formatTimestamp={(v) => v}
          formatPercent={(v) => `${v}%`}
          formatTooltipTimestamp={(v) => v}
        />
      );
    });

    expect(mockResolve).toHaveBeenCalledWith("antigravity:uuid-1234", expect.anything());

    const line = container.querySelector('[data-testid="chart-line"]');
    expect(line).not.toBeNull();
    expect(line?.getAttribute("data-key")).toBe("antigravity:uuid-1234");
    expect(line?.getAttribute("data-name")).toBe("games.zaim@gmail.com");
  });
});
