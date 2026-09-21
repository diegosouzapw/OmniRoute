// @vitest-environment jsdom
/**
 * tests/unit/ui/orchestrationComparePanel.test.tsx
 * Component tests for the Orchestration Canvas History tab's side-by-side comparison panel
 * (Task A3, PR-A). Kept in its own file — not `orchestrationHistoryTab.test.tsx` — to stay
 * under the 1200-line `check:file-size` cap (see global-constraints.md).
 * Run: npx vitest run tests/unit/ui/orchestrationComparePanel.test.tsx
 */
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (k: string, v?: Record<string, unknown>) =>
    v ? `${k}:${JSON.stringify(v)}` : k,
}));

import { CompareRunsPanel } from "@/app/(dashboard)/dashboard/orchestration/tabs/CompareRunsPanel";
import type { HistoryItem } from "@/app/(dashboard)/dashboard/orchestration/model/historyModel";

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

/** Flushes N microtask ticks inside `act`, enough to drain the two parallel
 * fetch().then().then(Promise.allSettled) chains (same idiom as orchestrationHistoryTab.test.tsx). */
async function flush(n = 6) {
  for (let i = 0; i < n; i++) {
    await act(async () => {
      await Promise.resolve();
    });
  }
}

afterEach(() => {
  document.body.innerHTML = "";
  vi.unstubAllGlobals();
});

function historyItem(overrides: Partial<HistoryItem> = {}): HistoryItem {
  return {
    id: "a2a:t1",
    source: "a2a",
    identity: "smart-routing",
    state: "succeeded",
    label: "smart-routing",
    createdAt: "2026-09-01T10:00:00.000Z",
    completedAt: "2026-09-01T10:00:30.000Z",
    durationMs: 30000,
    cost: null,
    raw: {},
    ...overrides,
  };
}

/** Mocks `GET /api/a2a/tasks/t1` and `/t2` — the two ids used by every test's left/right
 * items below. Each side defaults to an empty-events success response so a test only has to
 * override the side it cares about. */
function mockDetailFetch(opts: {
  left?: { ok: boolean; body?: unknown };
  right?: { ok: boolean; body?: unknown };
}) {
  const leftResp = opts.left ?? { ok: true, body: { task: { events: [] } } };
  const rightResp = opts.right ?? { ok: true, body: { task: { events: [] } } };
  return vi.fn((url: string) => {
    const u = String(url);
    const resp = u.includes("/t1") ? leftResp : u.includes("/t2") ? rightResp : null;
    if (!resp) return Promise.reject(new Error(`unexpected url ${u}`));
    if (!resp.ok) return Promise.resolve({ ok: false, status: 500 });
    return Promise.resolve({ ok: true, json: () => Promise.resolve(resp.body) });
  });
}

describe("CompareRunsPanel", () => {
  it("renders both headers and a metrics row with the signed delta", async () => {
    const left = historyItem({ id: "a2a:t1", identity: "smart-routing", durationMs: 30000 });
    const right = historyItem({
      id: "a2a:t2",
      identity: "smart-routing",
      durationMs: 45000,
      cost: 0.5,
    });
    vi.stubGlobal("fetch", mockDetailFetch({}));
    const { c, cleanup } = render(
      <CompareRunsPanel left={left} right={right} onClose={() => {}} />
    );
    await flush();

    expect(c.querySelector('[data-testid="orchestration-history-compare-panel"]')).toBeTruthy();
    expect(c.textContent).toContain("smart-routing");
    expect(c.textContent).toContain("compareTitle");
    expect(c.textContent).toContain("compareDuration");
    expect(c.textContent).toContain("compareCost");
    // right.durationMs - left.durationMs = 45000 - 30000 = 15000ms → "+15s".
    expect(c.textContent).toContain("+15s");
    cleanup();
  });

  it("one side failing its fetch shows compareDetailFailed for that side while the other continues rendering, without an empty alert region for the healthy side", async () => {
    const left = historyItem({ id: "a2a:t1", identity: "smart-routing" });
    const right = historyItem({ id: "a2a:t2", identity: "eval-suite" });
    vi.stubGlobal(
      "fetch",
      mockDetailFetch({
        left: { ok: true, body: { task: { events: [{ state: "submitted", timestamp: null }] } } },
        right: { ok: false },
      })
    );
    const { c, cleanup } = render(
      <CompareRunsPanel left={left} right={right} onClose={() => {}} />
    );
    await flush();

    expect(c.textContent).toContain("compareDetailFailed");
    // Both headers keep rendering — the failing side is not blanked out.
    expect(c.textContent).toContain("smart-routing");
    expect(c.textContent).toContain("eval-suite");

    // Only the side that actually failed (right) gets a role="alert" region — the healthy
    // left side must not emit an empty alert (regression guard, Task A4 review fix #2).
    // (left/right here also differ in identity, which renders its own separate
    // compareDifferentIdentity role="alert" banner — asserted on its own test below — so this
    // checks the two error cells directly instead of counting every role="alert" on the page.)
    const leftErrorCell = c.querySelector('[data-testid="orchestration-compare-error-left"]');
    const rightErrorCell = c.querySelector('[data-testid="orchestration-compare-error-right"]');
    expect(leftErrorCell?.getAttribute("role")).toBeNull();
    expect(leftErrorCell?.textContent).toBe("");
    expect(rightErrorCell?.getAttribute("role")).toBe("alert");
    expect(rightErrorCell?.textContent).toContain("compareDetailFailed");
    cleanup();
  });

  it("shows compareDifferentIdentity when the two runs are not the same (source, identity) pair", async () => {
    const left = historyItem({ id: "a2a:t1", identity: "smart-routing" });
    const right = historyItem({ id: "a2a:t2", identity: "eval-suite" });
    vi.stubGlobal("fetch", mockDetailFetch({}));
    const { c, cleanup } = render(
      <CompareRunsPanel left={left} right={right} onClose={() => {}} />
    );
    await flush();
    expect(c.textContent).toContain("compareDifferentIdentity");
    cleanup();
  });

  it("does not show compareDifferentIdentity when both sides share the same (source, identity) pair", async () => {
    const left = historyItem({ id: "a2a:t1", identity: "smart-routing" });
    const right = historyItem({ id: "a2a:t2", identity: "smart-routing" });
    vi.stubGlobal("fetch", mockDetailFetch({}));
    const { c, cleanup } = render(
      <CompareRunsPanel left={left} right={right} onClose={() => {}} />
    );
    await flush();
    expect(c.textContent).not.toContain("compareDifferentIdentity");
    cleanup();
  });

  it("renders — in the delta cell (never NaN) when only one side has a cost value", async () => {
    // Regression guard, Task A4 review fix #1: the original version of this test set `cost:
    // null` on BOTH sides, so the asserted "—" was also produced by the two (unrelated) value
    // cells — it would have kept passing even if the delta formatter itself were completely
    // broken. The real "absent delta" case is ONE side missing the value: `signedDelta` in
    // `model/compareRuns.ts` only returns a number when BOTH sides are finite, so a lone
    // `left.cost` must still collapse to an absent ("—") delta, never a `NaN` computed from
    // `finite - null`. Asserting the delta cell specifically (via its `data-testid`, not
    // page-wide text content) is what makes this test able to fail.
    const left = historyItem({ id: "a2a:t1", identity: "smart-routing", cost: 12.5 });
    const right = historyItem({ id: "a2a:t2", identity: "smart-routing", cost: null });
    vi.stubGlobal("fetch", mockDetailFetch({}));
    const { c, cleanup } = render(
      <CompareRunsPanel left={left} right={right} onClose={() => {}} />
    );
    await flush();

    const leftCell = c.querySelector('[data-testid="orchestration-compare-metric-cost-left"]');
    const rightCell = c.querySelector('[data-testid="orchestration-compare-metric-cost-right"]');
    const deltaCell = c.querySelector('[data-testid="orchestration-compare-metric-cost-delta"]');
    // Sanity-check the fixture: the side with a real value must NOT itself render "—", or the
    // delta assertion below would be vacuous.
    expect(leftCell?.textContent).toBe("$12.50");
    expect(rightCell?.textContent).toBe("—");
    expect(deltaCell?.textContent).toBe("—");
    expect(deltaCell?.textContent).not.toContain("NaN");
    cleanup();
  });

  it("aligns the timeline by index, rendering one row per event of the longer side", async () => {
    const left = historyItem({ id: "a2a:t1", identity: "smart-routing" });
    const right = historyItem({ id: "a2a:t2", identity: "smart-routing" });
    vi.stubGlobal(
      "fetch",
      mockDetailFetch({
        left: {
          ok: true,
          body: {
            task: {
              events: [
                { state: "submitted", timestamp: "2026-09-01T10:00:00.000Z" },
                { state: "working", timestamp: "2026-09-01T10:00:05.000Z" },
                { state: "completed", timestamp: "2026-09-01T10:00:30.000Z" },
              ],
            },
          },
        },
        right: {
          ok: true,
          body: {
            task: { events: [{ state: "submitted", timestamp: "2026-09-01T10:00:00.000Z" }] },
          },
        },
      })
    );
    const { c, cleanup } = render(
      <CompareRunsPanel left={left} right={right} onClose={() => {}} />
    );
    await flush();

    const rows = c.querySelectorAll('[data-testid="orchestration-compare-timeline-row"]');
    expect(rows.length).toBe(3);
    cleanup();
  });

  it("renders — instead of the literal 'Invalid Date' for a malformed createdAt or event timestamp", async () => {
    // Regression guard, Task A4 review fix #3: `new Date(unparseable).toLocaleString()` returns
    // the literal string "Invalid Date" rather than throwing, so it used to leak straight into
    // the DOM. Exercises both call sites — RunHeader's `item.createdAt` and EventCell's
    // `event.timestamp` — with an unparseable (but non-null, non-empty) string each.
    const left = historyItem({
      id: "a2a:t1",
      identity: "smart-routing",
      createdAt: "not-a-real-date",
    });
    const right = historyItem({ id: "a2a:t2", identity: "smart-routing" });
    vi.stubGlobal(
      "fetch",
      mockDetailFetch({
        left: {
          ok: true,
          body: { task: { events: [{ state: "submitted", timestamp: "also-not-a-date" }] } },
        },
      })
    );
    const { c, cleanup } = render(
      <CompareRunsPanel left={left} right={right} onClose={() => {}} />
    );
    await flush();

    expect(c.textContent).not.toContain("Invalid Date");
    const leftHeader = c.querySelector('[data-testid="orchestration-compare-header-left"]');
    expect(leftHeader?.textContent).toContain("—");
    const timelineRow = c.querySelector('[data-testid="orchestration-compare-timeline-row"]');
    expect(timelineRow?.textContent).not.toContain("Invalid Date");
    cleanup();
  });

  it("calls onClose when the close button is clicked", async () => {
    const left = historyItem({ id: "a2a:t1" });
    const right = historyItem({ id: "a2a:t2", identity: "eval-suite" });
    vi.stubGlobal("fetch", mockDetailFetch({}));
    let closed = false;
    const { c, cleanup } = render(
      <CompareRunsPanel left={left} right={right} onClose={() => (closed = true)} />
    );
    await flush();
    const closeBtn = c.querySelector(
      '[data-testid="orchestration-compare-close"]'
    ) as HTMLButtonElement;
    expect(closeBtn).toBeTruthy();
    act(() => closeBtn.click());
    expect(closed).toBe(true);
    cleanup();
  });

  it("scrolls its own container instead of expanding it (overflow-x-auto on the panel)", async () => {
    const left = historyItem({ id: "a2a:t1" });
    const right = historyItem({ id: "a2a:t2", identity: "eval-suite" });
    vi.stubGlobal("fetch", mockDetailFetch({}));
    const { c, cleanup } = render(
      <CompareRunsPanel left={left} right={right} onClose={() => {}} />
    );
    await flush();
    const panel = c.querySelector('[data-testid="orchestration-history-compare-panel"]');
    expect(panel?.className).toContain("overflow-x-auto");
    cleanup();
  });

  it("bounds its own height instead of growing unbounded (max-h + overflow-y + shrink-0 on the panel)", async () => {
    // Review finding (Important #2): the panel is mounted as a plain sibling of the
    // `flex-1 min-h-0` history grid inside HistoryTab's `h-full` flex column. Without its own
    // height cap + internal vertical scroll + `shrink-0`, a run with dozens of activities
    // (Jules/Devin logs routinely exceed 50) grows the panel without limit, collapsing the
    // grid to zero height and overflowing the tab.
    const left = historyItem({ id: "a2a:t1" });
    const right = historyItem({ id: "a2a:t2", identity: "eval-suite" });
    vi.stubGlobal("fetch", mockDetailFetch({}));
    const { c, cleanup } = render(
      <CompareRunsPanel left={left} right={right} onClose={() => {}} />
    );
    await flush();
    const panel = c.querySelector('[data-testid="orchestration-history-compare-panel"]');
    expect(panel?.className).toContain("max-h-[45vh]");
    expect(panel?.className).toContain("overflow-y-auto");
    expect(panel?.className).toContain("shrink-0");
    cleanup();
  });

  it("shows — (not 0) for the events count and delta while both sides are still loading", async () => {
    // Review finding (Important #1), loading branch: before either fetch settles, the row must
    // not present a real "0" as if it had already loaded an empty timeline.
    const left = historyItem({ id: "a2a:t1", identity: "smart-routing" });
    const right = historyItem({ id: "a2a:t2", identity: "smart-routing" });
    // A never-resolving fetch keeps both sides in the initial "loading" status.
    vi.stubGlobal(
      "fetch",
      vi.fn(() => new Promise(() => {}))
    );
    const { c, cleanup } = render(
      <CompareRunsPanel left={left} right={right} onClose={() => {}} />
    );

    const leftCell = c.querySelector('[data-testid="orchestration-compare-metric-events-left"]');
    const rightCell = c.querySelector('[data-testid="orchestration-compare-metric-events-right"]');
    const deltaCell = c.querySelector('[data-testid="orchestration-compare-metric-events-delta"]');
    expect(leftCell?.textContent).toBe("—");
    expect(rightCell?.textContent).toBe("—");
    expect(deltaCell?.textContent).toBe("—");
    cleanup();
  });

  it("one side's fetch failing keeps the events row at — for count and delta, while the healthy side's own header/timeline still render", async () => {
    // Review finding (Important #1), error branch: a real "3 · 0 · -3" next to the error alert
    // is a wrong number presented as data. The events row must collapse to `—` across the
    // board (both counts and the delta) unless BOTH sides are `"ok"` — even for the side that
    // loaded fine, since the row is a comparison and a lone half is not a valid one. The
    // healthy side's header and timeline are unaffected: those never depended on the other
    // side's status.
    const left = historyItem({ id: "a2a:t1", identity: "smart-routing" });
    const right = historyItem({ id: "a2a:t2", identity: "smart-routing" });
    vi.stubGlobal(
      "fetch",
      mockDetailFetch({
        left: { ok: true, body: { task: { events: [{ state: "submitted", timestamp: null }] } } },
        right: { ok: false },
      })
    );
    const { c, cleanup } = render(
      <CompareRunsPanel left={left} right={right} onClose={() => {}} />
    );
    await flush();

    const leftCell = c.querySelector('[data-testid="orchestration-compare-metric-events-left"]');
    const rightCell = c.querySelector('[data-testid="orchestration-compare-metric-events-right"]');
    const deltaCell = c.querySelector('[data-testid="orchestration-compare-metric-events-delta"]');
    expect(leftCell?.textContent).toBe("—");
    expect(rightCell?.textContent).toBe("—");
    expect(deltaCell?.textContent).toBe("—");

    // The healthy (left) side's own header and its timeline row still render, unaffected by
    // the right side's failure.
    const leftHeader = c.querySelector('[data-testid="orchestration-compare-header-left"]');
    expect(leftHeader?.textContent).toContain("smart-routing");
    const timelineRow = c.querySelector('[data-testid="orchestration-compare-timeline-row"]');
    expect(timelineRow).toBeTruthy();
    cleanup();
  });

  it("labels the delta column's direction so the operator knows which side a positive delta favors (Minor #4)", async () => {
    const left = historyItem({ id: "a2a:t1" });
    const right = historyItem({ id: "a2a:t2", identity: "eval-suite" });
    vi.stubGlobal("fetch", mockDetailFetch({}));
    const { c, cleanup } = render(
      <CompareRunsPanel left={left} right={right} onClose={() => {}} />
    );
    await flush();
    const legend = c.querySelector('[data-testid="orchestration-compare-delta-legend"]');
    expect(legend?.textContent).toBe("compareDeltaLegend");
    cleanup();
  });

  it("uses role=status (not role=alert) for the informational compareDifferentIdentity banner (Minor #6)", async () => {
    // role="alert" is assertive and should be reserved for the actual per-side fetch failures
    // (SideErrorCell). This banner fires on every mount where the pair differs — never in
    // response to an error — so it must not interrupt assistive tech the way an alert does.
    const left = historyItem({ id: "a2a:t1", identity: "smart-routing" });
    const right = historyItem({ id: "a2a:t2", identity: "eval-suite" });
    vi.stubGlobal("fetch", mockDetailFetch({}));
    const { c, cleanup } = render(
      <CompareRunsPanel left={left} right={right} onClose={() => {}} />
    );
    await flush();
    expect(c.textContent).toContain("compareDifferentIdentity");
    const banners = Array.from(c.querySelectorAll("div")).filter(
      (el) => el.textContent === "compareDifferentIdentity"
    );
    expect(banners.length).toBe(1);
    expect(banners[0].getAttribute("role")).toBe("status");
    // No unrelated role="alert" region should exist in this scenario (both fetches succeed).
    expect(c.querySelector('[role="alert"]')).toBeNull();
    cleanup();
  });
});
