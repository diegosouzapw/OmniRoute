// @vitest-environment jsdom
/**
 * #6915 — Sort/filter Free Provider Rankings by auth Type: page-level tests.
 *
 * Mirrors tests/unit/dashboard/batch/list-regression.test.tsx: mock
 * next-intl's useTranslations to return the key, mock `fetch` to return a
 * fixed 3-provider payload spanning all three auth types, mount the real
 * page component, and prove the Type filter chips + "group by type" toggle
 * actually narrow/reorder the rendered `<table>` rows.
 */

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// ── Mocks ─────────────────────────────────────────────────────────────────────

// Return a STABLE `t` function identity across renders (real next-intl memoizes
// this internally). The page's `fetchRankings` useCallback depends on `t`, which
// is itself a dependency of the data-fetch useEffect — a mock that returns a
// fresh closure per call would give `t` a new identity every render, causing
// the effect to re-fire (and refetch) on every render, an infinite loop that
// only exists in this mock, not in production with real next-intl.
const stableT = (key: string) => key;
vi.mock("next-intl", () => ({
  useTranslations: () => stableT,
}));

// ── Import component after mocks ──────────────────────────────────────────────

const { default: FreeProviderRankingsPage } = await import(
  "@/app/(dashboard)/dashboard/free-provider-rankings/page"
);

// ── Fixture data ──────────────────────────────────────────────────────────────

function makeRanking(overrides: Partial<{
  id: string;
  name: string;
  category: "noauth" | "oauth" | "apikey";
  averageScore: number;
}> = {}) {
  return {
    id: overrides.id ?? "provider-noauth",
    name: overrides.name ?? "Provider NoAuth",
    icon: "",
    color: "#123456",
    textIcon: undefined,
    category: overrides.category ?? "noauth",
    topModel: {
      modelId: "model-1",
      modelName: "Model One",
      score: 0.8,
      eloRaw: 1500,
      confidence: "high",
      category: "default",
    },
    averageScore: overrides.averageScore ?? 0.75,
    modelCount: 1,
  };
}

const FIXTURE_RANKINGS = [
  makeRanking({ id: "p-apikey", name: "APIKey Provider", category: "apikey", averageScore: 0.9 }),
  makeRanking({ id: "p-oauth", name: "OAuth Provider", category: "oauth", averageScore: 0.85 }),
  makeRanking({ id: "p-noauth", name: "NoAuth Provider", category: "noauth", averageScore: 0.7 }),
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

function makeDiv() {
  const el = document.createElement("div");
  document.body.appendChild(el);
  return el;
}

function render(jsx: React.ReactElement) {
  const el = makeDiv();
  const root = createRoot(el);
  act(() => {
    root.render(jsx);
  });
  containers.push({ root, el });
  return el;
}

/**
 * Poll until the "loading" placeholder text is gone (fetch resolved + state
 * committed) or `maxAttempts` is exhausted. Deliberately outside `act()` — the
 * mount/click that triggered the async work already ran inside its own sync
 * `act()`; nesting an async `act()` around this wait hangs indefinitely under
 * React 19 + jsdom in this repo's test environment.
 */
async function waitForNotLoading(el: HTMLDivElement, maxAttempts = 40) {
  for (let i = 0; i < maxAttempts && el.textContent?.includes("loading"); i++) {
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
}

async function renderPageWithFixture() {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ rankings: FIXTURE_RANKINGS }),
    })
  );
  const el = render(<FreeProviderRankingsPage />);
  await waitForNotLoading(el);
  return el;
}

function clickButtonByText(el: HTMLDivElement, text: string) {
  const btn = Array.from(el.querySelectorAll("button")).find((b) => b.textContent === text);
  expect(btn).not.toBeUndefined();
  act(() => {
    btn!.click();
  });
}

function tableRowNames(el: HTMLDivElement): string[] {
  const rows = Array.from(el.querySelectorAll("tbody tr"));
  return rows.map((r) => r.querySelector("span.font-medium")?.textContent ?? "");
}

// ── Lifecycle ─────────────────────────────────────────────────────────────────

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ rankings: [] }) }));
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("FreeProviderRankingsPage — Type filter + group-by-type sort (#6915)", () => {
  it("renders all three providers before any Type filter is applied", async () => {
    const el = await renderPageWithFixture();
    expect(tableRowNames(el)).toEqual(
      expect.arrayContaining(["APIKey Provider", "OAuth Provider", "NoAuth Provider"])
    );
  }, 15000);

  it("clicking the NOAUTH filter chip narrows the rendered rows to only NOAUTH-typed providers", async () => {
    const el = await renderPageWithFixture();
    clickButtonByText(el, "typeNoauth");
    const names = tableRowNames(el);
    expect(names).toEqual(["NoAuth Provider"]);
  }, 15000);

  it("clicking the OAUTH filter chip narrows the rendered rows to only OAUTH-typed providers", async () => {
    const el = await renderPageWithFixture();
    clickButtonByText(el, "typeOauth");
    expect(tableRowNames(el)).toEqual(["OAuth Provider"]);
  }, 15000);

  it("clicking 'All Types' after a filter restores every row", async () => {
    const el = await renderPageWithFixture();
    clickButtonByText(el, "typeApikey");
    expect(tableRowNames(el)).toEqual(["APIKey Provider"]);
    clickButtonByText(el, "typeAll");
    expect(tableRowNames(el)).toEqual(
      expect.arrayContaining(["APIKey Provider", "OAuth Provider", "NoAuth Provider"])
    );
  }, 15000);

  it("toggling 'group by type' re-orders rendered rows to NOAUTH-first", async () => {
    const el = await renderPageWithFixture();
    // Fixture order is APIKey, OAuth, NoAuth (by score) — ungrouped preserves that.
    expect(tableRowNames(el)).toEqual(["APIKey Provider", "OAuth Provider", "NoAuth Provider"]);

    clickButtonByText(el, "sortTypeFirst");
    expect(tableRowNames(el)).toEqual(["NoAuth Provider", "OAuth Provider", "APIKey Provider"]);
  }, 15000);

  it("existing configuredOnly/availableOnly toggles remain independently functional alongside the new Type filter", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ rankings: FIXTURE_RANKINGS }) });
    vi.stubGlobal("fetch", fetchMock);
    const el = await renderPageWithFixture();
    vi.stubGlobal("fetch", fetchMock);

    // Apply the new Type filter (client-side only — no refetch expected for this).
    clickButtonByText(el, "typeNoauth");
    expect(tableRowNames(el)).toEqual(["NoAuth Provider"]);

    const callsBeforeToggle = fetchMock.mock.calls.length;

    // Toggle the pre-existing "configured only" control — it still triggers its own refetch.
    clickButtonByText(el, "filterConfiguredOnly");
    await waitForNotLoading(el);

    expect(fetchMock.mock.calls.length).toBeGreaterThan(callsBeforeToggle);
    const lastUrl = fetchMock.mock.calls[fetchMock.mock.calls.length - 1][0] as string;
    expect(lastUrl).toContain("configuredOnly=1");

    // The Type filter (client-side) should still be applied to the (still-fixture) rows.
    expect(tableRowNames(el)).toEqual(["NoAuth Provider"]);
  }, 15000);
});
