// @vitest-environment jsdom
/**
 * The rankings page now asks for `withUsage` and renders a Reliability column.
 * Two rules are pinned here: the fetch always carries the usage params (an
 * ELO-only ranking described a provider that errors on every call as healthy),
 * and a provider with no usable sample renders a dash — never 0%.
 *
 * Mirrors tests/unit/ui/free-provider-rankings-page-authtype-6915.test.tsx:
 * mock next-intl, mock fetch, mount the real page component.
 */

import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const stableT = (key: string) => key;
vi.mock("next-intl", () => ({
  useTranslations: () => stableT,
}));

const { default: FreeProviderRankingsPage } =
  await import("@/app/(dashboard)/dashboard/free-provider-rankings/page");

function makeRanking(overrides: Partial<{ id: string; name: string; usage: unknown }> = {}) {
  return {
    id: overrides.id ?? "p-1",
    name: overrides.name ?? "Provider One",
    icon: "",
    color: "#123456",
    textIcon: undefined,
    category: "noauth",
    topModel: {
      modelId: "model-1",
      modelName: "Model One",
      score: 0.8,
      eloRaw: 1500,
      confidence: "high",
      category: "default",
    },
    averageScore: 0.75,
    modelCount: 1,
    ...(overrides.usage !== undefined
      ? { reliability: { connections: [], state: "active", usage: overrides.usage } }
      : {}),
  };
}

const HEALTHY = makeRanking({
  id: "p-healthy",
  name: "Healthy Provider",
  usage: {
    requests: 100,
    successes: 99,
    successRate: 0.99,
    avgLatencyMs: 800,
    lastRequestAt: "2026-08-25T00:00:00.000Z",
    windowHours: 24,
  },
});
const NO_TRAFFIC = makeRanking({ id: "p-quiet", name: "Quiet Provider" });

const containers: Array<{ root: ReturnType<typeof createRoot>; el: HTMLDivElement }> = [];

async function renderPageWithFixture(rankings: unknown[]) {
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ rankings }),
  });
  vi.stubGlobal("fetch", fetchMock);
  const el = document.createElement("div");
  document.body.appendChild(el);
  const root = createRoot(el);
  act(() => {
    root.render(<FreeProviderRankingsPage />);
  });
  for (let i = 0; i < 40 && el.textContent?.includes("loading"); i++) {
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  containers.push({ root, el });
  return { el, fetchMock };
}

function reliabilityCells(el: HTMLDivElement): string[] {
  return Array.from(el.querySelectorAll("tbody tr")).map((r) => {
    const tds = r.querySelectorAll("td");
    // Reliability is the 6th data cell (rank, provider, top model, score, avg, reliability…).
    return tds[5]?.textContent ?? "";
  });
}

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ rankings: [] }) })
  );
});

afterEach(() => {
  for (const { root, el } of containers.splice(0)) {
    act(() => root.unmount());
    el.remove();
  }
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("FreeProviderRankingsPage — usage reliability column", () => {
  it("every rankings fetch carries withUsage=1 and usageRange=24h", async () => {
    const { fetchMock } = await renderPageWithFixture([HEALTHY]);
    expect(fetchMock.mock.calls.length).toBeGreaterThan(0);
    const url = String(fetchMock.mock.calls[0][0]);
    expect(url).toContain("withUsage=1");
    expect(url).toContain("usageRange=24h");
  }, 15000);

  it("renders the provider's success rate when the sample supports one", async () => {
    const { el } = await renderPageWithFixture([HEALTHY]);
    expect(el.querySelector("th")?.textContent).toBeDefined();
    const headerTexts = Array.from(el.querySelectorAll("th")).map((th) => th.textContent);
    expect(headerTexts).toContain("colReliability");
    expect(reliabilityCells(el)).toEqual(["99%"]);
  }, 15000);

  it("renders a dash for a provider with no recorded traffic, never 0%", async () => {
    const { el } = await renderPageWithFixture([NO_TRAFFIC]);
    expect(reliabilityCells(el)).toEqual(["—"]);
  }, 15000);
});
