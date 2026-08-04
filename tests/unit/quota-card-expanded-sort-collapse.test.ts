import { test } from "node:test";
import assert from "node:assert/strict";
import {
  sortQuotasByRemaining,
  getVisibleQuotas,
} from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardExpanded";

function quota(name: string, remainingPercentage: number) {
  return { name, remainingPercentage };
}

test("sortQuotasByRemaining orders quotas by remaining percentage descending", () => {
  const quotas = [quota("low", 10), quota("high", 90), quota("mid", 50)];
  const sorted = sortQuotasByRemaining(quotas);
  assert.deepEqual(
    sorted.map((q) => q.name),
    ["high", "mid", "low"]
  );
  // original array untouched
  assert.deepEqual(
    quotas.map((q) => q.name),
    ["low", "high", "mid"]
  );
});

test("sortQuotasByRemaining treats unlimited quotas as 100% remaining", () => {
  const quotas = [quota("capped", 40), { name: "unlimited", unlimited: true }];
  const sorted = sortQuotasByRemaining(quotas);
  assert.equal(sorted[0].name, "unlimited");
});

test("getVisibleQuotas collapses to the first 3 rows when not expanded", () => {
  const quotas = [1, 2, 3, 4, 5].map((n) => quota(`q${n}`, n));
  const visible = getVisibleQuotas(quotas, false);
  assert.equal(visible.length, 3);
  assert.deepEqual(
    visible.map((q) => q.name),
    ["q1", "q2", "q3"]
  );
});

test("getVisibleQuotas returns every row when expanded", () => {
  const quotas = [1, 2, 3, 4, 5].map((n) => quota(`q${n}`, n));
  const visible = getVisibleQuotas(quotas, true);
  assert.equal(visible.length, 5);
});

test("getVisibleQuotas returns all rows unchanged when under the default threshold", () => {
  const quotas = [quota("a", 10), quota("b", 20)];
  const visible = getVisibleQuotas(quotas, false);
  assert.equal(visible.length, 2);
});
