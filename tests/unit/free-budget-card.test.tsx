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

  // Legend should show all 3 models (informational)
  assert.match(html, /Gemini Flash/);
  assert.match(html, /Gemini Pro/);
  assert.match(html, /GPT Free/);
});
