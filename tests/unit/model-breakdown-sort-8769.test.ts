/**
 * Regression #8769: Usage → Model Breakdown column-header sort must reorder rows.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  nextModelBreakdownSort,
  sortModelBreakdownRows,
  withModelBreakdownShare,
} from "../../src/shared/components/analytics/modelBreakdownSort.ts";

const ROWS = [
  {
    model: "alpha",
    requests: 10,
    promptTokens: 100,
    completionTokens: 50,
    totalTokens: 150,
    cost: 0.5,
  },
  {
    model: "bravo",
    requests: 30,
    promptTokens: 10,
    completionTokens: 90,
    totalTokens: 100,
    cost: 2.0,
  },
  {
    model: "charlie",
    requests: 5,
    promptTokens: 200,
    completionTokens: 10,
    totalTokens: 210,
    cost: 0.1,
  },
];

test("#8769: sort by requests desc puts bravo first", () => {
  const sorted = sortModelBreakdownRows(ROWS, "requests", "desc");
  assert.deepEqual(
    sorted.map((r) => r.model),
    ["bravo", "alpha", "charlie"]
  );
});

test("#8769: sort by totalTokens asc puts bravo first", () => {
  const sorted = sortModelBreakdownRows(ROWS, "totalTokens", "asc");
  assert.deepEqual(
    sorted.map((r) => r.model),
    ["bravo", "alpha", "charlie"]
  );
});

test("#8769: sort by model asc is alphabetical", () => {
  const sorted = sortModelBreakdownRows(ROWS, "model", "asc");
  assert.deepEqual(
    sorted.map((r) => r.model),
    ["alpha", "bravo", "charlie"]
  );
});

test("#8769: sort by cost desc puts bravo first", () => {
  const sorted = sortModelBreakdownRows(ROWS, "cost", "desc");
  assert.equal(sorted[0].model, "bravo");
  assert.equal(sorted[2].model, "charlie");
});

test("#8769: nextModelBreakdownSort toggles order on same field", () => {
  assert.deepEqual(nextModelBreakdownSort("requests", "desc", "requests"), {
    sortBy: "requests",
    sortOrder: "asc",
  });
  assert.deepEqual(nextModelBreakdownSort("requests", "asc", "cost"), {
    sortBy: "cost",
    sortOrder: "desc",
  });
});

test("#8769: withModelBreakdownShare fills missing pct from summary total", () => {
  const withPct = withModelBreakdownShare(ROWS, 460);
  assert.equal(withPct[0].pct, ((150 / 460) * 100).toFixed(1));
  assert.equal(withPct[1].pct, ((100 / 460) * 100).toFixed(1));
});

test("#8769: sort is stable for empty/null input", () => {
  assert.deepEqual(sortModelBreakdownRows(null, "requests", "desc"), []);
  assert.deepEqual(sortModelBreakdownRows(undefined, "model", "asc"), []);
});
