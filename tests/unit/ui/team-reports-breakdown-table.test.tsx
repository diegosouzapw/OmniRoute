// @vitest-environment jsdom
// Team Reports breakdown table: header sorting, the token split columns, the "no key" fallback
// name, and the filter action.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";

import messages from "../../../src/i18n/messages/en.json";
import BreakdownTable from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/components/BreakdownTable";
import type { ReportBreakdownRow } from "../../../src/lib/usage/agentSessionReports";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

type Tokens = Omit<ReportBreakdownRow["tokens"], "total">;

function row(key: string, costUsd: number, requests: number, tokens: Tokens): ReportBreakdownRow {
  return {
    key,
    label: null,
    detail: null,
    requests,
    errors: 0,
    unpricedRequests: 0,
    costUsd,
    tokens: { ...tokens, total: tokens.input + tokens.output },
    sessions: 1,
    members: 1,
    projects: 1,
    lastSeenAt: "2026-09-25T10:00:00.000Z",
  };
}

// Stored input already includes the cached part, and output already includes reasoning.
const ROWS = [
  // Input 8000, Output 700, Cache 1000
  row("cheap", 1, 30, {
    input: 9000,
    output: 700,
    cacheRead: 1000,
    cacheCreation: 0,
    reasoning: 300,
  }),
  // Input 500, Output 50, Cache 4000
  row("pricey", 5, 10, {
    input: 4500,
    output: 50,
    cacheRead: 3000,
    cacheCreation: 1000,
    reasoning: 0,
  }),
  // Input 2000, Output 900, Cache 200
  row("", 3, 20, { input: 2200, output: 900, cacheRead: 0, cacheCreation: 200, reasoning: 0 }),
];

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

function render(onFilter?: (key: string) => void) {
  act(() =>
    root.render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <BreakdownTable
          rows={ROWS}
          nameHeader="Project"
          fallbackName="(no project)"
          extraCount="members"
          onFilter={onFilter}
        />
      </NextIntlClientProvider>
    )
  );
}

function firstColumn(): string[] {
  return [...container.querySelectorAll("tbody tr")].map(
    (tr) => tr.querySelector("td")?.textContent ?? ""
  );
}

function headerLabels(): string[] {
  return [...container.querySelectorAll("thead button")].map(
    (button) => button.childNodes[0]?.textContent ?? ""
  );
}

function clickHeader(label: string) {
  const button = [...container.querySelectorAll("thead button")].find(
    (el) => el.childNodes[0]?.textContent === label
  );
  act(() => (button as HTMLButtonElement).click());
}

function cell(rowName: string, header: string): HTMLTableCellElement {
  const column = headerLabels().indexOf(header);
  const tr = [...container.querySelectorAll("tbody tr")].find(
    (el) => el.querySelector("td")?.textContent === rowName
  );
  return tr?.querySelectorAll("td")[column] as HTMLTableCellElement;
}

const fmt = (value: number) => new Intl.NumberFormat().format(value);

describe("Team Reports BreakdownTable", () => {
  it("sorts by cost descending first, then toggles and switches columns", () => {
    render();
    expect(firstColumn()).toEqual(["pricey", "(no project)", "cheap"]);

    clickHeader("Cost");
    expect(firstColumn()).toEqual(["cheap", "(no project)", "pricey"]);

    clickHeader("Requests");
    expect(firstColumn()).toEqual(["cheap", "(no project)", "pricey"]);
  });

  it("replaces the single tokens column with Input, Output and Cache", () => {
    render();
    expect(headerLabels()).toEqual([
      "Project",
      "Members",
      "Sessions",
      "Requests",
      "Errors",
      "Input",
      "Output",
      "Cache",
      "Cost",
      "Last active",
    ]);
  });

  it("shows uncached input, reasoning-inclusive output and cache read + write", () => {
    render();
    expect(cell("cheap", "Input").textContent).toBe("8.0K");
    expect(cell("cheap", "Output").textContent).toBe("700");
    expect(cell("pricey", "Input").textContent).toBe("500");
    expect(cell("pricey", "Output").textContent).toBe("50");

    const cache = cell("pricey", "Cache");
    expect(cache.textContent?.startsWith("4.0K")).toBe(true);
    const detail = cache.querySelector("[title]")?.getAttribute("title") ?? "";
    expect(detail).toContain(`Cache Read: ${fmt(3000)}`);
    expect(detail).toContain(`Cache Write: ${fmt(1000)}`);
    // The breakdown is also exposed to assistive technology, not only as a hover title.
    expect(cache.textContent).toContain(detail);
  });

  it("sorts each token column on its own figure", () => {
    render();

    clickHeader("Input");
    expect(firstColumn()).toEqual(["cheap", "(no project)", "pricey"]);

    clickHeader("Output");
    expect(firstColumn()).toEqual(["(no project)", "cheap", "pricey"]);

    clickHeader("Cache");
    expect(firstColumn()).toEqual(["pricey", "cheap", "(no project)"]);

    clickHeader("Cache");
    expect(firstColumn()).toEqual(["(no project)", "cheap", "pricey"]);
  });

  it("offers the filter action only for rows that have a key", () => {
    const onFilter = vi.fn();
    render(onFilter);

    const filterButtons = [...container.querySelectorAll("tbody button")];
    expect(filterButtons).toHaveLength(2);
    act(() => (filterButtons[0] as HTMLButtonElement).click());
    expect(onFilter).toHaveBeenCalledWith("pricey");
  });
});
