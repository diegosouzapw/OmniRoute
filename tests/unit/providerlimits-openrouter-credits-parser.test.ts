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
  unlimited?: boolean;
  isCredits?: boolean;
  creditCount?: number;
  currency?: string;
};

function findCredits(rows: QuotaRow[]): QuotaRow {
  const row = rows.find((r: QuotaRow) => r.name === "credits");
  assert.ok(row, "expected 'credits' row");
  return row as QuotaRow;
}

test("parseOpenrouter renders PAYG account quota with normal percentage bar (no isCredits short-circuit)", () => {
  const rows = parseOpenrouter({
    quotas: {
      credits: {
        used: 7.332_573_982,
        total: 10,
        remaining: 2.667_426_018,
        remainingPercentage: 27,
        unlimited: false,
        currency: "USD",
      },
    },
  });
  const row = findCredits(rows);
  assert.equal(row.total, 10, "total must come from PAYG denominator");
  assert.ok(Math.abs(row.used - 7.332_573_982) < 1e-6);
  assert.ok(Math.abs(row.remaining - 2.667_426_018) < 1e-6);
  assert.equal(row.remainingPercentage, 27);
  assert.equal(row.currency, "USD");
  // The credits renderer in QuotaCardExpanded short-circuits when isCredits
  // is true and only shows the USD balance - a positive-denominator PAYG row
  // must NOT take that branch.
  assert.notEqual(row.isCredits, true, "PAYG row must not flip isCredits");
});

test("parseOpenrouter keeps credit-balance row when no positive denominator", () => {
  const rows = parseOpenrouter({
    quotas: {
      credits: {
        used: 0,
        total: 0,
        remaining: 2.67,
        unlimited: false,
        currency: "USD",
      },
    },
  });
  const row = findCredits(rows);
  assert.equal(row.total, 0);
  assert.equal(row.used, 0);
  assert.equal(row.remaining, 2.67);
  assert.equal(row.isCredits, true, "balance row keeps isCredits renderer");
  assert.equal(row.creditCount, 2.67);
  assert.notEqual(row.remainingPercentage, 100, "no fabricated 100% percentage");
});

test("parseOpenrouter falls back to balance row for non-finite denominator", () => {
  const rows = parseOpenrouter({
    quotas: {
      credits: { used: 0, total: NaN, remaining: 1.5 },
    },
  });
  const row = findCredits(rows);
  assert.equal(row.isCredits, true);
  assert.equal(row.remaining, 1.5);
});

test("parseOpenrouter keeps per-model rows alongside PAYG credit row", () => {
  const rows = parseOpenrouter({
    quotas: {
      credits: {
        used: 7.332_573_982,
        total: 10,
        remaining: 2.667_426_018,
        remainingPercentage: 27,
        unlimited: false,
        currency: "USD",
      },
      "anthropic/claude-3.5-sonnet": {
        used: 12,
        total: 100,
        remaining: 88,
        resetAt: null,
      },
    },
  });
  assert.equal(rows.length, 2);
  const credits = findCredits(rows);
  assert.equal(credits.total, 10);
  assert.ok(Math.abs(credits.used - 7.332_573_982) < 1e-6);
  assert.equal(credits.remainingPercentage, 27);
  assert.notEqual(credits.isCredits, true);
});

test("parseOpenrouter passes non-credits quota keys through normalizeQuotaEntry", () => {
  const rows = parseOpenrouter({
    quotas: {
      "anthropic/claude-3.5-sonnet": {
        used: 12,
        total: 100,
        remaining: 88,
        resetAt: null,
      },
    },
  });
  assert.equal(rows.length, 1);
  const row = rows[0];
  assert.equal(row.name, "anthropic/claude-3.5-sonnet");
  assert.equal(row.total, 100);
  assert.equal(row.remaining, 88);
  assert.notEqual(row.isCredits, true);
});
