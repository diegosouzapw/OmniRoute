// @vitest-environment jsdom
// Team Reports breakdown table: header sorting, the "no key" fallback name, and the filter action.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";

import messages from "../../../src/i18n/messages/en.json";
import BreakdownTable from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/components/BreakdownTable";
import type { ReportBreakdownRow } from "../../../src/lib/usage/agentSessionReports";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

function row(key: string, costUsd: number, requests: number): ReportBreakdownRow {
  return {
    key,
    label: null,
    detail: null,
    requests,
    errors: 0,
    unpricedRequests: 0,
    costUsd,
    tokens: { input: 0, output: 0, cacheRead: 0, cacheCreation: 0, reasoning: 0, total: 0 },
    sessions: 1,
    members: 1,
    projects: 1,
    lastSeenAt: "2026-09-25T10:00:00.000Z",
  };
}

const ROWS = [row("cheap", 1, 30), row("pricey", 5, 10), row("", 3, 20)];

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

function clickHeader(label: string) {
  const button = [...container.querySelectorAll("thead button")].find((el) =>
    el.textContent?.startsWith(label)
  );
  act(() => (button as HTMLButtonElement).click());
}

describe("Team Reports BreakdownTable", () => {
  it("sorts by cost descending first, then toggles and switches columns", () => {
    render();
    expect(firstColumn()).toEqual(["pricey", "(no project)", "cheap"]);

    clickHeader("Cost");
    expect(firstColumn()).toEqual(["cheap", "(no project)", "pricey"]);

    clickHeader("Requests");
    expect(firstColumn()).toEqual(["cheap", "(no project)", "pricey"]);
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
