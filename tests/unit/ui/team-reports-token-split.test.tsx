// @vitest-environment jsdom
// Team Reports token split: the summary card and the sessions list/detail show Input, Output and
// Cache instead of one total figure.
import React, { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextIntlClientProvider } from "next-intl";

import messages from "../../../src/i18n/messages/en.json";
import ReportsPageClient from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/ReportsPageClient";
import SessionsPanel from "../../../src/app/(dashboard)/dashboard/analytics/team-reports/components/SessionsPanel";
import type { AgentSessionRecord } from "../../../src/lib/db/agentSessions";
import type { AgentSessionReport } from "../../../src/lib/usage/agentSessionReports";

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const fmt = (value: number) => new Intl.NumberFormat().format(value);

// Stored input already includes the cached part, and output already includes reasoning.
const REPORT: AgentSessionReport = {
  totals: {
    requests: 12,
    errors: 1,
    unpricedRequests: 0,
    costUsd: 4.2,
    tokens: {
      input: 1_500_000,
      output: 45_000,
      cacheRead: 1_000_000,
      cacheCreation: 200_000,
      reasoning: 5_000,
      uncachedInput: 300_000,
      total: 1_545_000,
    },
    sessions: 3,
    members: 2,
    projects: 2,
    lastSeenAt: "2026-09-25T10:00:00.000Z",
  },
  breakdowns: {
    members: [],
    projects: [],
    clients: [],
    providers: [],
    models: [],
    accounts: [],
    daily: [],
  },
};

const SESSION: AgentSessionRecord = {
  id: "as_session1",
  apiKeyId: "key-alice",
  apiKeyName: "alice",
  client: "claude-code",
  clientSessionId: null,
  projectName: "web-app",
  projectRepo: null,
  projectPath: null,
  projectSource: null,
  gitBranch: "main",
  firstSeenAt: "2026-09-25T09:00:00.000Z",
  lastSeenAt: "2026-09-25T10:00:00.000Z",
  requestCount: 4,
  errorCount: 0,
  tokens: {
    input: 12_000,
    output: 3_000,
    cacheRead: 9_000,
    cacheCreation: 1_000,
    reasoning: 500,
    uncachedInput: 2_000,
    total: 15_000,
  },
  costUsd: 0.5,
  unpricedCount: 0,
  lastProvider: "anthropic",
  lastModel: "claude-sonnet",
};

let container: HTMLDivElement;
let root: Root;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string) => {
      const body = url.startsWith("/api/reports/summary")
        ? REPORT
        : url.startsWith(`/api/reports/sessions/${SESSION.id}`)
          ? { session: SESSION, recentRequests: [] }
          : { sessions: [SESSION], total: 1 };
      return { ok: true, status: 200, json: async () => body };
    })
  );
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

async function render(ui: React.ReactElement) {
  await act(async () => {
    root.render(
      <NextIntlClientProvider locale="en" messages={messages}>
        {ui}
      </NextIntlClientProvider>
    );
  });
  await flush();
}

async function flush() {
  for (let i = 0; i < 3; i += 1) {
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
}

/** term -> <dd> of every definition list inside `scope`. */
function definitions(scope: Element): Map<string, HTMLElement> {
  const map = new Map<string, HTMLElement>();
  for (const dt of scope.querySelectorAll("dt")) {
    const dd = dt.nextElementSibling as HTMLElement | null;
    if (dd) map.set(dt.textContent ?? "", dd);
  }
  return map;
}

function expectCacheDetail(el: HTMLElement | undefined, read: number, write: number) {
  const title = el?.querySelector("[title]")?.getAttribute("title") ?? "";
  expect(title).toContain(`Cache Read: ${fmt(read)}`);
  expect(title).toContain(`Cache Write: ${fmt(write)}`);
  expect(el?.textContent).toContain(title);
}

describe("Team Reports token split", () => {
  it("summary card shows Input, Output and Cache instead of a total", async () => {
    await render(<ReportsPageClient />);

    const label = [...container.querySelectorAll("p")].find((p) => p.textContent === "Tokens");
    const card = label?.parentElement as HTMLElement;
    expect(card).toBeTruthy();
    const figures = definitions(card);
    expect([...figures.keys()]).toEqual(["Input", "Output", "Cache"]);
    expect(figures.get("Input")?.textContent).toBe("300.0K");
    expect(figures.get("Output")?.textContent).toBe("45.0K");
    expect(figures.get("Cache")?.textContent?.startsWith("1.2M")).toBe(true);
    expectCacheDetail(figures.get("Cache"), 1_000_000, 200_000);
    expect(card.textContent).not.toContain("1.5M");
  });

  it("sessions list shows Input, Output and Cache columns", async () => {
    await render(<SessionsPanel query="" refreshToken={0} />);

    const headers = [...container.querySelectorAll("thead th")].map((th) => th.textContent);
    expect(headers).not.toContain("Tokens");
    const cells = [...container.querySelectorAll("tbody tr td")];
    const at = (header: string) => cells[headers.indexOf(header)] as HTMLElement;
    expect(at("Input").textContent).toBe("2.0K");
    expect(at("Output").textContent).toBe("3.0K");
    expect(at("Cache").textContent?.startsWith("10.0K")).toBe(true);
    expectCacheDetail(at("Cache"), 9_000, 1_000);
  });

  it("session detail shows Input, Output and Cache", async () => {
    await render(<SessionsPanel query="" refreshToken={0} />);

    const details = [...container.querySelectorAll("tbody button")].find(
      (button) => button.textContent === "Details"
    );
    await act(async () => (details as HTMLButtonElement).click());
    await flush();

    const figures = definitions(document.body);
    expect(figures.has("Tokens")).toBe(false);
    expect(figures.get("Input")?.textContent).toBe("2.0K");
    expect(figures.get("Output")?.textContent).toBe("3.0K");
    expect(figures.get("Cache")?.textContent?.startsWith("10.0K")).toBe(true);
    expectCacheDetail(figures.get("Cache"), 9_000, 1_000);
  });
});
