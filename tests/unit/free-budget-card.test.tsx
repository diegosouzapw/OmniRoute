import test from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { FreeBudgetView } from "../../src/app/(dashboard)/dashboard/usage/components/FreeBudgetCard.tsx";

const data = {
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

test("FreeBudgetView renders steady total, remaining, first-month, per-model rows, and ToS-restricted count", () => {
  const html = renderToStaticMarkup(React.createElement(FreeBudgetView, { data }));
  assert.match(html, /1\.94B/);          // steady
  assert.match(html, /2\.53B/);          // first-month
  assert.match(html, /remaining/i);
  assert.match(html, /Mistral Large/);
  assert.match(html, /1 .*(ToS|restricted)/i); // 1 avoid-flagged model called out
});

// Pool-dedup: two models in the same pool → only ONE bar segment for that pool
test("FreeBudgetView bar is pool-deduped: two models sharing a poolKey produce one bar segment", () => {
  const sharedPoolData = {
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

  const html = renderToStaticMarkup(React.createElement(FreeBudgetView, { data: sharedPoolData }));

  // Count bar segment divs by data-testid attribute
  const segmentMatches = html.match(/data-testid="bar-segment"/g);
  const segmentCount = segmentMatches ? segmentMatches.length : 0;

  // 1 pool-segment (gemini-pool) + 1 loose segment (openai) = 2 total, NOT 3
  assert.equal(segmentCount, 2, `Expected 2 pool-deduped bar segments, got ${segmentCount}`);

  // Table should show all 3 models (informational, per-model not pool-deduped)
  assert.match(html, /Gemini Flash/);
  assert.match(html, /Gemini Pro/);
  assert.match(html, /GPT Free/);
});

const layoutData = {
  steadyRecurringTokens: 1_540_000_000,
  steadyWithRecurringCreditsTokens: 1_540_000_000,
  firstMonthRealisticTokens: 2_150_000_000,
  usedThisMonth: 12_000_000,
  remaining: 1_528_000_000,
  modelCount: 4,
  poolCount: 3,
  boostMonthlyTokens: 24_000_000,
  uncappedProviders: ["glm-cn", "kilo-gateway", "siliconflow"],
  perModel: [
    { provider: "mistral", modelId: "mistral-small", displayName: "Mistral Small 4", monthlyTokens: 1_000_000_000, creditTokens: 0, freeType: "recurring-monthly", poolKey: "mistral", tos: "caution" },
    { provider: "llm7", modelId: "llm7", displayName: "LLM7 pool", monthlyTokens: 150_000_000, creditTokens: 0, freeType: "recurring-daily", poolKey: "llm7", tos: "caution" },
    { provider: "kiro", modelId: "kiro", displayName: "Kiro Auto", monthlyTokens: 25_000, creditTokens: 0, freeType: "recurring-monthly", poolKey: "kiro", tos: "avoid" },
    { provider: "together", modelId: "together-signup", displayName: "Together credit", monthlyTokens: 0, creditTokens: 25_000_000, freeType: "one-time-initial", poolKey: "together-signup", tos: "caution" },
  ],
};

test("Layout A renders KPI tiles, a per-model table, the boost callout and uncapped chips", () => {
  const html = renderToStaticMarkup(React.createElement(FreeBudgetView, { data: layoutData }));
  // KPI tiles
  assert.match(html, /Steady \/ month/);
  assert.match(html, /First month/);
  assert.match(html, /Used this month/);
  // per-model table present with the model rows
  assert.match(html, /data-testid="budget-table"/);
  assert.match(html, /Mistral Small 4/);
  assert.match(html, /Together credit/);
  assert.match(html, /25M credit/); // one-time credit rendered as credit, not steady
  // deposit-unlock boost surfaced separately
  assert.match(html, /Unlock ~24M more/);
  // uncapped providers shown as chips, not summed
  assert.match(html, /no published cap/i);
  assert.match(html, /siliconflow/);
  assert.match(html, /kilo-gateway/);
});

// Scope assertions to the table (bar-segment tooltips also contain model names and render first)
const tableOf = (h: string) => h.slice(h.indexOf('data-testid="budget-table"'));

test("hideAvoid drops ToS-restricted rows from the table but keeps the count callout", () => {
  const shown = renderToStaticMarkup(React.createElement(FreeBudgetView, { data: layoutData, hideAvoid: false }));
  assert.match(tableOf(shown), /Kiro Auto/);
  const hidden = renderToStaticMarkup(React.createElement(FreeBudgetView, { data: layoutData, hideAvoid: true }));
  assert.doesNotMatch(tableOf(hidden), /Kiro Auto/);
  // the 1-model ToS-restricted callout still reflects the underlying data
  assert.match(hidden, /1 model.*ToS-restricted/i);
});

test("sort=name orders the table rows alphabetically by display name", () => {
  const t = tableOf(renderToStaticMarkup(React.createElement(FreeBudgetView, { data: layoutData, sort: "name" })));
  // Kiro Auto should appear before Mistral Small 4 in the table body when sorted by name
  assert.ok(t.indexOf("Kiro Auto") < t.indexOf("Mistral Small 4"), "table rows not sorted by name");
});
