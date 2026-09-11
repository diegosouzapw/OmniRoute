// @vitest-environment jsdom
/**
 * tests/unit/ui/orchestrationHistoryTab.test.tsx
 * Component tests for the Orchestration Canvas "History" tab (Task C4, PR-B2).
 * Run: npx vitest run tests/unit/ui/orchestrationHistoryTab.test.tsx
 */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (k: string, v?: Record<string, unknown>) =>
    v ? `${k}:${JSON.stringify(v)}` : k,
}));

const drawerCalls: Record<string, unknown>[] = [];
vi.mock("@/app/(dashboard)/dashboard/orchestration/drawer/OrchestrationDrawer", () => ({
  OrchestrationDrawer: (props: Record<string, unknown>) => {
    drawerCalls.push(props);
    return <div data-testid="drawer-stub" />;
  },
}));

import { HistoryTab } from "@/app/(dashboard)/dashboard/orchestration/tabs/HistoryTab";

function render(el: React.ReactElement) {
  const c = document.createElement("div");
  document.body.appendChild(c);
  const root = createRoot(c);
  act(() => root.render(el));
  return {
    c,
    cleanup: () => {
      act(() => root.unmount());
      c.remove();
    },
  };
}

/** Flushes N microtask ticks inside `act`, enough to drain fetch().then().then(Promise.allSettled) chains. */
async function flush(n = 6) {
  for (let i = 0; i < n; i++) {
    await act(async () => {
      await Promise.resolve();
    });
  }
}

afterEach(() => {
  document.body.innerHTML = "";
  drawerCalls.length = 0;
  vi.unstubAllGlobals();
});

const NOW = Date.parse("2026-09-01T12:00:00Z");
const hoursAgo = (h: number) => new Date(NOW - h * 60 * 60 * 1000).toISOString();
/** Relative to the REAL clock — for assertions that must hold inside the 1d window too
 * (the component derives its range from `Date.now()`, not from the fixed `NOW` above). */
const realHoursAgo = (h: number) => new Date(Date.now() - h * 60 * 60 * 1000).toISOString();

function mockFetch(opts: {
  a2aTasks?: unknown[];
  cloudAgentTasks?: unknown[];
  a2aFail?: boolean;
  cloudAgentFail?: boolean;
}) {
  const { a2aTasks = [], cloudAgentTasks = [], a2aFail = false, cloudAgentFail = false } = opts;
  const fn = vi.fn((url: string) => {
    const u = String(url);
    if (u.startsWith("/api/a2a/tasks/history")) {
      if (a2aFail) return Promise.resolve({ ok: false, status: 500 });
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ tasks: a2aTasks, total: a2aTasks.length, limit: 500, offset: 0 }),
      });
    }
    if (u.startsWith("/api/v1/agents/tasks")) {
      if (cloudAgentFail) return Promise.resolve({ ok: false, status: 500 });
      return Promise.resolve({ ok: true, json: () => Promise.resolve({ data: cloudAgentTasks }) });
    }
    return Promise.reject(new Error(`unexpected url ${u}`));
  });
  return fn;
}

function cloudAgentTask(overrides: Record<string, unknown> = {}) {
  return {
    id: "ca1",
    providerId: "devin",
    status: "completed",
    prompt: "do the thing",
    source: { repoName: "r", repoUrl: "https://x" },
    options: {},
    activities: [],
    createdAt: hoursAgo(45 / 60),
    updatedAt: hoursAgo(20 / 60),
    completedAt: hoursAgo(20 / 60),
    ...overrides,
  };
}

function a2aTask(overrides: Record<string, unknown> = {}) {
  return {
    id: "t1",
    state: "completed",
    skill: "smart-routing",
    createdAt: hoursAgo(1),
    completedAt: hoursAgo(0.5),
    ...overrides,
  };
}

describe("HistoryTab", () => {
  it("fetches both sources on mount and renders one row per (source, identity)", async () => {
    vi.stubGlobal(
      "fetch",
      mockFetch({ a2aTasks: [a2aTask()], cloudAgentTasks: [cloudAgentTask()] })
    );
    const { c, cleanup } = render(<HistoryTab />);
    await flush();
    expect(c.textContent).toContain("smart-routing");
    expect(c.textContent).toContain("devin");
    expect(c.querySelectorAll("tbody tr").length).toBe(2);
    cleanup();
  });

  it("switching the preset re-fetches A2A history with a from/to window matching the new preset", async () => {
    const fetchMock = mockFetch({});
    vi.stubGlobal("fetch", fetchMock);
    const { c, cleanup } = render(<HistoryTab />);
    await flush();

    const historyCalls = () =>
      fetchMock.mock.calls
        .map((call) => String(call[0]))
        .filter((u) => u.includes("/api/a2a/tasks/history"));

    // Derives the actual [from, to] window (ms) the component asked for — this is what
    // catches "preset ignored" bugs; a plain "URL changed" assertion would not, since
    // `nowMs` is re-sampled on every click regardless of whether `setPreset` even ran.
    function windowMs(url: string): number {
      const parsed = new URL(url, "http://localhost");
      const from = Date.parse(parsed.searchParams.get("from") ?? "");
      const to = Date.parse(parsed.searchParams.get("to") ?? "");
      return to - from;
    }

    const firstCall = historyCalls().at(-1);
    expect(firstCall).toBeTruthy();
    // Default preset is "7d".
    expect(windowMs(firstCall!)).toBeCloseTo(7 * 24 * 60 * 60 * 1000, -4);

    const btn1d = Array.from(c.querySelectorAll("button")).find(
      (b) => b.textContent === "historyRange1d"
    ) as HTMLButtonElement;
    expect(btn1d).toBeTruthy();
    act(() => {
      btn1d.click();
    });
    await flush();

    const secondCall = historyCalls().at(-1);
    expect(secondCall).toBeTruthy();
    expect(secondCall).not.toBe(firstCall);
    expect(windowMs(secondCall!)).toBeCloseTo(24 * 60 * 60 * 1000, -4);
    cleanup();
  });

  it("shows a loading line instead of an empty bordered table, and keeps rows visible while refetching", async () => {
    vi.stubGlobal("fetch", mockFetch({ a2aTasks: [a2aTask()] }));
    const { c, cleanup } = render(<HistoryTab />);

    // First load, still in flight: a loading line, and NO empty bordered table/grid.
    expect(c.querySelector('[role="status"]')).toBeTruthy();
    expect(c.querySelector("table")).toBeNull();

    await flush();
    expect(c.querySelector('[role="status"]')).toBeNull();
    expect(c.querySelector("table")).toBeTruthy();

    // Refetch (30d is a superset of the current 7d window, so the already-fetched rows stay
    // in range): the grid must stay on screen instead of blanking while loading.
    const btn30d = Array.from(c.querySelectorAll("button")).find(
      (b) => b.textContent === "historyRange30d"
    ) as HTMLButtonElement;
    act(() => {
      btn30d.click();
    });
    expect(c.querySelector('[role="status"]')).toBeTruthy();
    expect(c.querySelector("table")).toBeTruthy();
    expect(c.querySelectorAll("tbody tr").length).toBe(1);
    cleanup();
  });

  it("renders a bucket time axis header derived from the fetched window", async () => {
    const fetchMock = mockFetch({ a2aTasks: [a2aTask({ createdAt: realHoursAgo(1) })] });
    vi.stubGlobal("fetch", fetchMock);
    const { c, cleanup } = render(<HistoryTab />);
    await flush();

    const fromMs = () => {
      const url = fetchMock.mock.calls
        .map((call) => String(call[0]))
        .filter((u) => u.includes("/api/a2a/tasks/history"))
        .at(-1)!;
      return Date.parse(new URL(url, "http://localhost").searchParams.get("from")!);
    };

    // Default preset is 7d → 7 daily buckets + the leading row-label column.
    const headers7d = Array.from(c.querySelectorAll("thead th"));
    expect(headers7d.length).toBe(8);
    expect(headers7d[1].textContent).toBe(new Date(fromMs()).toLocaleDateString());

    const btn1d = Array.from(c.querySelectorAll("button")).find(
      (b) => b.textContent === "historyRange1d"
    ) as HTMLButtonElement;
    act(() => {
      btn1d.click();
    });
    await flush();

    // 1d preset → 24 hourly buckets, labeled by time-of-day instead of date.
    const headers1d = Array.from(c.querySelectorAll("thead th"));
    expect(headers1d.length).toBe(25);
    expect(headers1d[1].textContent).toBe(new Date(fromMs()).toLocaleTimeString());
    cleanup();
  });

  it("clicking a cell opens the drawer with a synthetic OrchNode built from the clicked item", async () => {
    vi.stubGlobal("fetch", mockFetch({ a2aTasks: [a2aTask()] }));
    const { c, cleanup } = render(<HistoryTab />);
    await flush();

    const cell = c.querySelector('button[aria-label*="smart-routing"]') as HTMLButtonElement;
    expect(cell).toBeTruthy();
    // The cell tooltip/aria-label states the run state through the shared `state*` i18n keys
    // (mock returns the raw key), never the raw upstream string ("succeeded").
    expect(cell.getAttribute("aria-label")).toMatch(/· stateSucceeded$/);
    expect(cell.title).toBe(cell.getAttribute("aria-label"));
    act(() => {
      cell.click();
    });
    const last = drawerCalls.at(-1) as {
      node: { id: string; source: string; kind: string } | null;
    };
    expect(last.node?.id).toBe("a2a:t1");
    expect(last.node?.source).toBe("a2a");
    expect(last.node?.kind).toBe("work");
    cleanup();
  });

  it("keeps the drawer open on onActionDone so its success toast is visible, and refetches", async () => {
    // Review finding (Minor B): this tab used to pass `onActionDone={() => setSelected(null)}`,
    // which unmounted the drawer BEFORE it rendered the repeat/cancel confirmation — the
    // operator saw the action silently do nothing. The callback must keep the drawer mounted
    // (and re-sample the range so the new run shows up).
    const fetchMock = mockFetch({ a2aTasks: [a2aTask()] });
    vi.stubGlobal("fetch", fetchMock);
    const { c, cleanup } = render(<HistoryTab />);
    await flush();

    const cell = c.querySelector('button[aria-label*="smart-routing"]') as HTMLButtonElement;
    act(() => {
      cell.click();
    });
    expect((drawerCalls.at(-1) as { node: unknown }).node).toBeTruthy();
    const callsBefore = fetchMock.mock.calls.length;

    await act(async () => {
      (drawerCalls.at(-1) as { onActionDone: () => void }).onActionDone();
    });
    await flush();

    // Still open on the same node …
    const last = drawerCalls.at(-1) as { node: { id: string } | null };
    expect(last.node?.id).toBe("a2a:t1");
    // … and the history was refetched.
    expect(fetchMock.mock.calls.length).toBeGreaterThan(callsBefore);
    cleanup();
  });

  it("shows a source-failed warning for A2A while Cloud Agent rows still render", async () => {
    vi.stubGlobal("fetch", mockFetch({ a2aFail: true, cloudAgentTasks: [cloudAgentTask()] }));
    const { c, cleanup } = render(<HistoryTab />);
    await flush();
    // The failed source is named through the shared `sourceA2A` key (mock returns the raw
    // key), never a hardcoded "A2A" literal.
    expect(c.textContent).toContain('historySourceFailed:{"source":"sourceA2A"}');
    expect(c.textContent).toContain("devin");
    // The Cloud Agent row label is translated too (`sourceCloudAgent`, not "Cloud Agent").
    expect(c.querySelector("tbody th")?.textContent).toContain("sourceCloudAgent");
    cleanup();
  });

  it("shows the empty state when both sources return no items in range", async () => {
    vi.stubGlobal("fetch", mockFetch({}));
    const { c, cleanup } = render(<HistoryTab />);
    await flush();
    expect(c.textContent).toContain("historyEmpty");
    cleanup();
  });

  describe("compare mode", () => {
    // Three distinct cells (distinct aria-label substrings) so tests can select each
    // individually: two a2a runs plus one Cloud Agent run.
    function threeItems() {
      return {
        a2aTasks: [
          a2aTask({ id: "t1", skill: "smart-routing" }),
          a2aTask({
            id: "t3",
            skill: "eval-suite",
            createdAt: hoursAgo(2),
            completedAt: hoursAgo(1.5),
          }),
        ],
        cloudAgentTasks: [cloudAgentTask()],
      };
    }

    function cellFor(c: HTMLElement, needle: string) {
      return c.querySelector(`button[aria-label*="${needle}"]`) as HTMLButtonElement;
    }

    function toggleCompareButton(c: HTMLElement) {
      return Array.from(c.querySelectorAll("button")).find(
        (b) => b.textContent === "compareMode" || b.textContent === "compareExit"
      ) as HTMLButtonElement;
    }

    it("compare mode is off by default: the toggle reports aria-pressed=false and a cell click still opens the drawer", async () => {
      vi.stubGlobal("fetch", mockFetch(threeItems()));
      const { c, cleanup } = render(<HistoryTab />);
      await flush();

      const toggle = toggleCompareButton(c);
      expect(toggle).toBeTruthy();
      expect(toggle.getAttribute("aria-pressed")).toBe("false");
      expect(toggle.textContent).toBe("compareMode");

      const cell = cellFor(c, "smart-routing");
      act(() => cell.click());
      const last = drawerCalls.at(-1) as { node: { id: string } | null };
      expect(last.node?.id).toBe("a2a:t1");
      cleanup();
    });

    it("turning compare mode on and clicking two cells marks both and does not open the drawer", async () => {
      vi.stubGlobal("fetch", mockFetch(threeItems()));
      const { c, cleanup } = render(<HistoryTab />);
      await flush();

      act(() => toggleCompareButton(c).click());
      expect(toggleCompareButton(c).getAttribute("aria-pressed")).toBe("true");
      expect(toggleCompareButton(c).textContent).toBe("compareExit");

      const cellA = cellFor(c, "smart-routing");
      const cellB = cellFor(c, "do the thing");
      act(() => cellA.click());
      act(() => cellB.click());

      expect(cellFor(c, "smart-routing").getAttribute("aria-pressed")).toBe("true");
      expect(cellFor(c, "do the thing").getAttribute("aria-pressed")).toBe("true");
      // The drawer stub keeps re-rendering (parent state changed) but is never given a node —
      // neither click opened it.
      const last = drawerCalls.at(-1) as { node: unknown };
      expect(last.node).toBeNull();
      cleanup();
    });

    it("clicking an already-selected cell in compare mode unmarks it instead of dropping the oldest", async () => {
      // Isolated coverage for onToggleCompareSelect's unmark branch (`prev.some(...) →
      // prev.filter(...)`) — the eviction-queue test above only exercises the "new distinct
      // item" branch, so clicking a cell that is ALREADY marked had no direct test.
      vi.stubGlobal("fetch", mockFetch(threeItems()));
      const { c, cleanup } = render(<HistoryTab />);
      await flush();

      act(() => toggleCompareButton(c).click());
      act(() => cellFor(c, "smart-routing").click());
      act(() => cellFor(c, "do the thing").click());
      expect(cellFor(c, "smart-routing").getAttribute("aria-pressed")).toBe("true");
      expect(cellFor(c, "do the thing").getAttribute("aria-pressed")).toBe("true");

      // Click the already-selected "smart-routing" cell again: it must unmark, leaving only
      // "do the thing" marked — not evict the oldest as if a 3rd distinct item were picked.
      act(() => cellFor(c, "smart-routing").click());
      expect(cellFor(c, "smart-routing").getAttribute("aria-pressed")).toBe("false");
      expect(cellFor(c, "do the thing").getAttribute("aria-pressed")).toBe("true");
      cleanup();
    });

    it("a third selection in compare mode drops the oldest, keeping the 2nd and 3rd marked", async () => {
      vi.stubGlobal("fetch", mockFetch(threeItems()));
      const { c, cleanup } = render(<HistoryTab />);
      await flush();

      act(() => toggleCompareButton(c).click());
      act(() => cellFor(c, "smart-routing").click());
      act(() => cellFor(c, "do the thing").click());
      act(() => cellFor(c, "eval-suite").click());

      expect(cellFor(c, "smart-routing").getAttribute("aria-pressed")).toBe("false");
      expect(cellFor(c, "do the thing").getAttribute("aria-pressed")).toBe("true");
      expect(cellFor(c, "eval-suite").getAttribute("aria-pressed")).toBe("true");
      cleanup();
    });

    it("selecting a new preset clears the compare selection (Minor #3)", async () => {
      // Review finding: a pick made under the old range can fall outside the new range once
      // the preset changes — the grid drops its ring while the compare panel kept comparing a
      // stale snapshot captured at click time. The selection queue must reset on preset change,
      // without leaving/re-entering compare mode.
      //
      // `buildHistoryGrid` (historyModel.ts) buckets purely client-side by `createdAt` against
      // `range`, which is derived from the REAL `Date.now()` (not the fixed `NOW` constant this
      // file otherwise uses) — an item outside the requested window is dropped from the grid
      // entirely, row and all. Both fixtures below use `realHoursAgo` so they survive the
      // switch to the 1d preset too; the assertion is about the ring/selection state, not about
      // which items the grid happens to still show.
      vi.stubGlobal(
        "fetch",
        mockFetch({
          a2aTasks: [
            a2aTask({ id: "t1", skill: "smart-routing", createdAt: realHoursAgo(1) }),
            a2aTask({ id: "t3", skill: "eval-suite", createdAt: realHoursAgo(2) }),
          ],
        })
      );
      const { c, cleanup } = render(<HistoryTab />);
      await flush();

      act(() => toggleCompareButton(c).click());
      act(() => cellFor(c, "smart-routing").click());
      act(() => cellFor(c, "eval-suite").click());
      expect(cellFor(c, "smart-routing").getAttribute("aria-pressed")).toBe("true");
      expect(cellFor(c, "eval-suite").getAttribute("aria-pressed")).toBe("true");

      const btn1d = Array.from(c.querySelectorAll("button")).find(
        (b) => b.textContent === "historyRange1d"
      ) as HTMLButtonElement;
      expect(btn1d).toBeTruthy();
      act(() => btn1d.click());
      await flush();

      // Still in compare mode (the toggle itself is untouched by a preset change) …
      expect(toggleCompareButton(c).getAttribute("aria-pressed")).toBe("true");
      // … but both picks are unmarked — the cells still exist, they must no longer show the ring.
      expect(cellFor(c, "smart-routing").getAttribute("aria-pressed")).toBe("false");
      expect(cellFor(c, "eval-suite").getAttribute("aria-pressed")).toBe("false");
      // The compare panel itself must not be mounted any more (queue dropped below 2).
      expect(c.querySelector('[data-testid="orchestration-history-compare-panel"]')).toBeNull();
      cleanup();
    });

    it("leaving compare mode clears the selection", async () => {
      vi.stubGlobal("fetch", mockFetch(threeItems()));
      const { c, cleanup } = render(<HistoryTab />);
      await flush();

      act(() => toggleCompareButton(c).click());
      act(() => cellFor(c, "smart-routing").click());
      act(() => cellFor(c, "do the thing").click());
      expect(cellFor(c, "smart-routing").getAttribute("aria-pressed")).toBe("true");

      // Leave compare mode.
      act(() => toggleCompareButton(c).click());
      expect(toggleCompareButton(c).getAttribute("aria-pressed")).toBe("false");

      // Re-enter compare mode: nothing should still be marked.
      act(() => toggleCompareButton(c).click());
      expect(cellFor(c, "smart-routing").getAttribute("aria-pressed")).toBe("false");
      expect(cellFor(c, "do the thing").getAttribute("aria-pressed")).toBe("false");
      cleanup();
    });
  });
});
