import { test } from "node:test";
import assert from "node:assert/strict";
import { parseQuotaData } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing";
import { resolveQuotaDisplayOrder } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardExpanded";

interface TestQuota {
  name: string;
  [key: string]: unknown;
}

// Regression for #6687: quotaParsing.ts applies a deterministic CODEX_QUOTA_ORDER
// (session:0, weekly:1, ...) via sortCodexOrder(). QuotaCardExpanded.tsx used to
// unconditionally re-sort the already-ordered array by remaining percentage via
// sortQuotasByRemaining(), discarding the fixed window order. resolveQuotaDisplayOrder()
// is the fix: it keeps parseQuotaData()'s order for providers with a fixed window
// order (codex, glm family) and only applies the remaining-% sort elsewhere.

test("#6687 codex: display order stays session-then-weekly regardless of remaining %", () => {
  const rawCodexData = {
    quotas: {
      session: { used: 90, total: 100, remainingPercentage: 10, resetAt: null },
      weekly: { used: 10, total: 100, remainingPercentage: 90, resetAt: null },
    },
  };

  const parsed = parseQuotaData("codex", rawCodexData);
  // Sanity check: quotaParsing.ts's sortCodexOrder should order session before weekly.
  assert.deepEqual(
    parsed.map((q: TestQuota) => q.name),
    ["session", "weekly"]
  );

  // The display layer must NOT undo the fixed order, even though weekly
  // (90% remaining) would sort before session (10% remaining) by percentage.
  const displayed = resolveQuotaDisplayOrder("codex", parsed);
  assert.deepEqual(
    displayed.map((q: TestQuota) => q.name),
    ["session", "weekly"]
  );
});

test("#6687 glm family: display order stays session-then-weekly regardless of remaining %", () => {
  const rawGlmData = {
    quotas: {
      session: { used: 95, total: 100, remainingPercentage: 5, resetAt: null },
      weekly: { used: 5, total: 100, remainingPercentage: 95, resetAt: null },
    },
  };

  const parsed = parseQuotaData("glm", rawGlmData);
  assert.deepEqual(
    parsed.map((q: TestQuota) => q.name),
    ["session", "weekly"]
  );

  const displayed = resolveQuotaDisplayOrder("glm", parsed);
  assert.deepEqual(
    displayed.map((q: TestQuota) => q.name),
    ["session", "weekly"]
  );
});

test("#6687 non-fixed-order providers still sort by remaining percentage descending", () => {
  const quotas = [
    { name: "low", remainingPercentage: 10 },
    { name: "high", remainingPercentage: 90 },
  ];

  const displayed = resolveQuotaDisplayOrder("openai", quotas);
  assert.deepEqual(
    displayed.map((q: TestQuota) => q.name),
    ["high", "low"]
  );
});
