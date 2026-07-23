import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import {
  FreeBudgetView,
  relativeTimeFromNow,
  type FreeBudgetData,
} from "../../../src/app/(dashboard)/dashboard/usage/components/FreeBudgetCard.tsx";

const data: FreeBudgetData = {
  steadyRecurringTokens: 1_940_000_000,
  steadyWithRecurringCreditsTokens: 1_941_000_000,
  firstMonthRealisticTokens: 2_530_000_000,
  usedThisMonth: 40_000_000,
  remaining: 1_900_000_000,
  modelCount: 530,
  poolCount: 50,
  perModel: [
    { provider: "mistral", modelId: "mistral-large", displayName: "Mistral Large", monthlyTokens: 1_000_000_000, creditTokens: 0, freeType: "recurring-monthly", poolKey: "mistral", tos: "caution" },
    { provider: "kiro", modelId: "kiro", displayName: "Kiro", monthlyTokens: 25_000, creditTokens: 0, freeType: "recurring-monthly", poolKey: "kiro", tos: "avoid" },
  ],
};

describe("FreeBudgetView", () => {
  it("renders steady total, remaining, first-month, per-model rows, and ToS-restricted count", () => {
    const html = renderToStaticMarkup(<FreeBudgetView data={data} />);
    expect(html).toMatch(/1\.94B/); // steady
    expect(html).toMatch(/2\.53B/); // first-month
    expect(html).toMatch(/remaining/i);
    expect(html).toMatch(/Mistral Large/);
    expect(html).toMatch(/1 .*(ToS|restricted)/i); // 1 avoid-flagged model called out
  });

  // Pool-dedup: two models in the same pool → only ONE bar segment for that pool
  it("bar is pool-deduped: two models sharing a poolKey produce one bar segment", () => {
    const sharedPoolData: FreeBudgetData = {
      steadyRecurringTokens: 1_000_000_000,
      steadyWithRecurringCreditsTokens: 1_000_000_000,
      firstMonthRealisticTokens: 1_200_000_000,
      usedThisMonth: 0,
      remaining: 1_000_000_000,
      modelCount: 3,
      poolCount: 1,
      perModel: [
        // Two models in the same pool — should produce only 1 bar segment
        { provider: "gemini", modelId: "gemini-flash", displayName: "Gemini Flash", monthlyTokens: 1_000_000_000, creditTokens: 0, freeType: "recurring-monthly", poolKey: "gemini-pool", tos: "ok" },
        { provider: "gemini", modelId: "gemini-pro", displayName: "Gemini Pro", monthlyTokens: 500_000_000, creditTokens: 0, freeType: "recurring-monthly", poolKey: "gemini-pool", tos: "ok" },
        // One standalone model (poolKey null)
        { provider: "openai", modelId: "gpt-free", displayName: "GPT Free", monthlyTokens: 200_000_000, creditTokens: 0, freeType: "keyless", poolKey: null, tos: "ok" },
      ],
    };

    const html = renderToStaticMarkup(<FreeBudgetView data={sharedPoolData} />);

    const segmentMatches = html.match(/data-testid="bar-segment"/g);
    const segmentCount = segmentMatches ? segmentMatches.length : 0;

    // 1 pool-segment (gemini-pool) + 1 loose segment (openai) = 2 total, NOT 3
    expect(segmentCount).toBe(2);

    // Table should show all 3 models (informational, per-model not pool-deduped)
    expect(html).toMatch(/Gemini Flash/);
    expect(html).toMatch(/Gemini Pro/);
    expect(html).toMatch(/GPT Free/);
  });
});

const layoutData: FreeBudgetData = {
  steadyRecurringTokens: 1_540_000_000,
  steadyWithRecurringCreditsTokens: 1_540_000_000,
  firstMonthRealisticTokens: 2_150_000_000,
  usedThisMonth: 12_000_000,
  remaining: 1_528_000_000,
  modelCount: 4,
  poolCount: 3,
  boostMonthlyTokens: 24_000_000,
  uncappedProviders: ["glm-cn", "kilo-gateway", "siliconflow"],
  catalogUpdatedAt: null,
  // Server-derived: which of these providers route with nothing configured.
  noCredentialProviders: ["pollinations"],
  perModel: [
    { provider: "mistral", modelId: "mistral-small", displayName: "Mistral Small 4", monthlyTokens: 1_000_000_000, creditTokens: 0, freeType: "recurring-monthly", poolKey: "mistral", tos: "caution" },
    { provider: "llm7", modelId: "llm7", displayName: "LLM7 pool", monthlyTokens: 150_000_000, creditTokens: 0, freeType: "recurring-daily", poolKey: "llm7", tos: "caution" },
    { provider: "kiro", modelId: "kiro", displayName: "Kiro Auto", monthlyTokens: 25_000, creditTokens: 0, freeType: "recurring-monthly", poolKey: "kiro", tos: "avoid" },
    { provider: "together", modelId: "together-signup", displayName: "Together credit", monthlyTokens: 0, creditTokens: 25_000_000, freeType: "one-time-initial", poolKey: "together-signup", tos: "caution" },
    { provider: "kimi", modelId: "kimi-free", displayName: "Kimi Free", monthlyTokens: 50_000_000, creditTokens: 0, freeType: "keyless", poolKey: null, tos: "ok" },
    // Real provider that routes anonymously — the "no API key" section is
    // derived from routing behaviour, so a made-up id would (correctly) count
    // as credentialed and never appear there.
    { provider: "pollinations", modelId: "openai-fast", displayName: "Pollinations Fast", monthlyTokens: 30_000_000, creditTokens: 0, freeType: "keyless", poolKey: "pollinations", tos: "caution" },
  ],
};

describe("FreeBudgetView — layout, boost, uncapped chips", () => {
  it("renders KPI tiles, a per-model table, the boost callout and uncapped chips", () => {
    const html = renderToStaticMarkup(<FreeBudgetView data={layoutData} />);
    // KPI tiles
    expect(html).toMatch(/Steady \/ month/);
    expect(html).toMatch(/First month/);
    expect(html).toMatch(/Used this month/);
    // per-model table present with the model rows
    expect(html).toMatch(/data-testid="budget-table"/);
    expect(html).toMatch(/Mistral Small 4/);
    expect(html).toMatch(/Together credit/);
    expect(html).toMatch(/25M credit/); // one-time credit rendered as credit, not steady
    // deposit-unlock boost surfaced separately
    expect(html).toMatch(/Unlock ~24M more/);
    // uncapped providers shown as chips, not summed
    expect(html).toMatch(/no published cap/i);
    expect(html).toMatch(/siliconflow/);
    expect(html).toMatch(/kilo-gateway/);
  });

  it("does not render the freshness indicator when catalogUpdatedAt is null", () => {
    const html = renderToStaticMarkup(<FreeBudgetView data={layoutData} />);
    expect(html).not.toMatch(/data-testid="catalog-freshness"/);
  });

  it("renders 'updated X ago' when catalogUpdatedAt is present", () => {
    const html = renderToStaticMarkup(
      <FreeBudgetView data={{ ...layoutData, catalogUpdatedAt: new Date().toISOString() }} />
    );
    expect(html).toMatch(/data-testid="catalog-freshness"/);
    expect(html).toMatch(/updated (just now|\d+[a-z]+ ago)/);
  });
});

// Scope assertions to the table (bar-segment tooltips also contain model names and render first)
const tableOf = (h: string) => h.slice(h.indexOf('data-testid="budget-table"'));

describe("FreeBudgetView — filters", () => {
  it("hideAvoid drops ToS-restricted rows from the table but keeps the count callout", () => {
    const shown = renderToStaticMarkup(<FreeBudgetView data={layoutData} hideAvoid={false} />);
    expect(tableOf(shown)).toMatch(/Kiro Auto/);
    const hidden = renderToStaticMarkup(<FreeBudgetView data={layoutData} hideAvoid={true} />);
    expect(tableOf(hidden)).not.toMatch(/Kiro Auto/);
    // the 1-model ToS-restricted callout still reflects the underlying data
    expect(hidden).toMatch(/1 model.*ToS-restricted/i);
  });

  it("sort=name orders the table rows alphabetically by display name", () => {
    const t = tableOf(renderToStaticMarkup(<FreeBudgetView data={layoutData} sort="name" />));
    // Kiro Auto should appear before Mistral Small 4 in the table body when sorted by name
    expect(t.indexOf("Kiro Auto")).toBeLessThan(t.indexOf("Mistral Small 4"));
  });

  it("search filters rows by model name, model id, and provider (case-insensitive)", () => {
    const byName = tableOf(renderToStaticMarkup(<FreeBudgetView data={layoutData} search="kimi" />));
    expect(byName).toMatch(/Kimi Free/);
    expect(byName).not.toMatch(/Mistral Small 4/);

    const byProvider = tableOf(renderToStaticMarkup(<FreeBudgetView data={layoutData} search="LLM7" />));
    expect(byProvider).toMatch(/LLM7 pool/);
    expect(byProvider).not.toMatch(/Kimi Free/);
  });

  it("providerFilter restricts the table to a single provider", () => {
    const t = tableOf(renderToStaticMarkup(<FreeBudgetView data={layoutData} providerFilter="kimi" />));
    expect(t).toMatch(/Kimi Free/);
    expect(t).not.toMatch(/Mistral Small 4/);
    expect(t).not.toMatch(/LLM7 pool/);
  });

  it("keylessOnly keeps only providers that route with no credential", () => {
    // Filters on the server-derived noCredentialProviders list, NOT on
    // freeType: "keyless" — "Kimi Free" is catalogued keyless yet is not in
    // that list, exactly the case that used to mislead users.
    const t = tableOf(renderToStaticMarkup(<FreeBudgetView data={layoutData} keylessOnly={true} />));
    expect(t).toMatch(/Pollinations Fast/);
    expect(t).not.toMatch(/Kimi Free/);
    expect(t).not.toMatch(/Mistral Small 4/);
    expect(t).not.toMatch(/Together credit/);
  });

  it("shows an empty-state row when no model matches the current filters", () => {
    const t = tableOf(renderToStaticMarkup(<FreeBudgetView data={layoutData} search="no-such-model-xyz" />));
    expect(t).toMatch(/No models match the current filters/);
  });
});

describe("FreeBudgetView — keyless section and badges", () => {
  it("renders a 'No API key required' overview section listing keyless providers", () => {
    const html = renderToStaticMarkup(<FreeBudgetView data={layoutData} />);
    expect(html).toMatch(/data-testid="keyless-section"/);
    expect(html).toMatch(/No API key required/);
    expect(html).toMatch(/pollinations/);
  });

  it("omits the keyless section entirely when no model is keyless", () => {
    const noKeyless: FreeBudgetData = {
      ...layoutData,
      perModel: layoutData.perModel.filter((m) => m.provider !== "pollinations"),
    };
    const html = renderToStaticMarkup(<FreeBudgetView data={noKeyless} />);
    expect(html).not.toMatch(/data-testid="keyless-section"/);
  });

  it("badges the keyless free-type distinctly from other free types", () => {
    const html = renderToStaticMarkup(<FreeBudgetView data={layoutData} />);
    const badges = html.match(/data-testid="free-type-badge"[^>]*>[^<]*(?:<[^>]*>[^<]*)*<\/span>/g) ?? [];
    expect(badges.some((b) => b.includes("keyless"))).toBe(true);
    expect(badges.some((b) => b.includes("daily"))).toBe(true);
  });
});

describe("relativeTimeFromNow", () => {
  const NOW = Date.parse("2026-07-20T12:00:00.000Z");

  it("returns null for an unparsable timestamp", () => {
    expect(relativeTimeFromNow("not-a-date", NOW)).toBeNull();
  });

  it("formats sub-minute deltas as 'just now'", () => {
    expect(relativeTimeFromNow("2026-07-20T11:59:45.000Z", NOW)).toBe("just now");
  });

  it("formats minute/hour/day deltas", () => {
    expect(relativeTimeFromNow("2026-07-20T11:30:00.000Z", NOW)).toBe("30m ago");
    expect(relativeTimeFromNow("2026-07-20T09:00:00.000Z", NOW)).toBe("3h ago");
    expect(relativeTimeFromNow("2026-07-17T12:00:00.000Z", NOW)).toBe("3d ago");
  });
});
