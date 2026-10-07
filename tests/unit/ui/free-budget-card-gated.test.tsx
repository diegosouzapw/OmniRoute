// @vitest-environment jsdom
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

const { default: FreeBudgetCard } =
  await import("../../../src/app/(dashboard)/dashboard/usage/components/FreeBudgetCard");

const summary = {
  steadyRecurringTokens: 1_503_225_000,
  steadyWithRecurringCreditsTokens: 1_504_225_000,
  firstMonthRealisticTokens: 2_129_725_000,
  usedThisMonth: 0,
  remaining: 1_503_225_000,
  modelCount: 453,
  poolCount: 35,
  perModel: [],
  boostMonthlyTokens: 24_000_000,
  uncappedProviders: ["gemini"],
  gatedRecurringTokens: 6_000_000,
  gatedProviders: ["modelscope"],
  catalogUpdatedAt: null,
  noCredentialProviders: [],
};

describe("FreeBudgetCard — eligibility-gated line", () => {
  beforeAll(() => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
  });

  it("renders the gated callout with its providers when gatedRecurringTokens > 0", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify(summary), { status: 200 }))
    );
    const el = document.createElement("div");
    document.body.appendChild(el);
    const root = createRoot(el);
    await act(async () => {
      root.render(<FreeBudgetCard />);
    });
    await act(async () => {});
    expect(el.textContent).toContain("gated");
    expect(el.textContent).toContain("modelscope");
  });

  it("hides the callout when the gated total is zero", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(
            JSON.stringify({ ...summary, gatedRecurringTokens: 0, gatedProviders: [] }),
            { status: 200 }
          )
      )
    );
    const el = document.createElement("div");
    document.body.appendChild(el);
    await act(async () => {
      createRoot(el).render(<FreeBudgetCard />);
    });
    await act(async () => {});
    expect(el.textContent).not.toContain("gated");
  });
});
