/**
 * Frontend parser regression #12468 follow-up.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { parseQuotaData } from "../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing.ts";

const parseOpenrouter = (data: unknown) => parseQuotaData("openrouter", data) as QuotaRow[];

type QuotaRow = {
  name: string;
  used: number;
  total: number;
  remaining: number;
  remainingPercentage?: number;
  isCredits?: boolean;
  creditCount?: number;
  currency?: string;
};

function findCredits(rows: QuotaRow[]): QuotaRow {
  const row = rows.find((r: QuotaRow) => r.name === "credits");
  assert.ok(row, "expected 'credits' row");
  return row as QuotaRow;
}

test("parseOpenrouter renders PAYG account credit row with bar + currency", () => {
  const rows = parseOpenrouter({
    quotas: {
      credits: { used: 0.7, total: 10, remaining: 9.3, remainingPercentage: 93 },
    },
  }) as QuotaRow[];
  const row = findCredits(rows);
  assert.equal(row.total, 10, "total must come from PAYG denominator");
  assert.ok(Math.abs(row.used - 0.7) < 1e-6);
  assert.ok(Math.abs(row.remaining - 9.3) < 1e-6);
  assert.equal(row.remainingPercentage, 93);
  assert.equal(row.isCredits, true, "PAYG row uses credits renderer");
});

test("parseOpenrouter keeps credit-balance row when positive denominator", () => {
  const rows = parseOpenrouter({
    quotas: {
      credits: { used: 0, total: 0, remaining: 2.67 },
    },
  }) as QuotaRow[];
  const row = findCredits(rows);
  assert.equal(row.total, 0);
  assert.equal(row.used, 0);
  assert.equal(row.remaining, 2.67);
  assert.equal(row.isCredits, true, "balance row keeps isCredits renderer");
  assert.equal(row.creditCount, 2.67);
});

test("parseOpenrouter ignores non-finite total (NaN) and falls back", () => {
  const rows = parseOpenrouter({
    quotas: {
      credits: { used: 0, total: NaN, remaining: 1.5 },
    },
  }) as QuotaRow[];
  const row = findCredits(rows);
  assert.equal(row.isCredits, true);
  assert.equal(row.remaining, 1.5);
});

test("parseOpenrouter keeps per-model rows alongside PAYG credit row", () => {
  const rows = parseOpenrouter({
    quotas: {
      credits: { used: 0.7, total: 10, remaining: 9.3, remainingPercentage: 93 },
      "anthropic/claude-3.5-sonnet": {
        used: 12,
        limit: 100,
        remaining: 88,
        resetAt: null,
      },
    },
  }) as QuotaRow[];
  assert.equal(rows.length, 2);
  const credits = findCredits(rows);
  assert.equal(credits.total, 10);
  assert.ok(Math.abs(credits.used - 0.7) < 1e-6);
  assert.equal(credits.remainingPercentage, 93);
});
