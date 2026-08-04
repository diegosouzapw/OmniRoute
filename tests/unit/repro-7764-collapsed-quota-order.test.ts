import { test } from "node:test";
import assert from "node:assert/strict";
import { topQuotas } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/utils";
import {
  parseQuotaData,
  hasFixedQuotaOrder,
} from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing";

const quotaName = (quota: { name: string }) => quota.name;

test("#7764 sanity: codex has a fixed quota order (session, weekly)", () => {
  assert.equal(hasFixedQuotaOrder("codex"), true);
});

test("#7764: topQuotas() (collapsed card order) respects hasFixedQuotaOrder instead of re-sorting by remaining %", () => {
  const rawA = {
    quotas: {
      session: { used: 91, total: 100, remainingPercentage: 91, resetAt: null },
      weekly: { used: 97, total: 100, remainingPercentage: 3, resetAt: null },
    },
  };
  const rawB = {
    quotas: {
      session: { used: 99, total: 100, remainingPercentage: 1, resetAt: null },
      weekly: { used: 43, total: 100, remainingPercentage: 57, resetAt: null },
    },
  };
  const parsedA = parseQuotaData("codex", rawA);
  const parsedB = parseQuotaData("codex", rawB);
  assert.deepEqual(parsedA.map(quotaName), ["session", "weekly"]);
  assert.deepEqual(parsedB.map(quotaName), ["session", "weekly"]);
  const renderedA = topQuotas(parsedA, 3, "codex").map(quotaName);
  const renderedB = topQuotas(parsedB, 3, "codex").map(quotaName);
  assert.deepEqual(renderedA, ["session", "weekly"]);
  assert.deepEqual(renderedB, ["session", "weekly"]);
});

test("#7764: providers WITHOUT a fixed order still sort worst-status-first (no regression)", () => {
  const quotas = [
    { name: "alpha", used: 10, total: 100, remainingPercentage: 90 },
    { name: "beta", used: 95, total: 100, remainingPercentage: 5 },
    { name: "gamma", used: 50, total: 100, remainingPercentage: 50 },
  ];
  const rendered = topQuotas(quotas, 3, "some-other-provider").map(quotaName);
  assert.deepEqual(rendered, ["beta", "gamma", "alpha"]);
});
