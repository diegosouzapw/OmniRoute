import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const analyticsFiles = [
  "src/shared/components/analytics/charts.tsx",
  "src/shared/components/analytics/index.tsx",
  "src/shared/components/analytics/rechartsDonuts.tsx",
  "src/shared/components/analytics/rechartsUsageCharts.tsx",
];

test("usage analytics keeps Recharts behind the lazy loader boundary", () => {
  const coreSource = readFileSync("src/shared/components/analytics/rechartsCore.tsx", "utf8");

  assert.match(coreSource, /import\("recharts"\)/);
  assert.match(coreSource, /rechartsPromise = null;/);

  for (const filePath of analyticsFiles) {
    const source = readFileSync(filePath, "utf8");

    assert.doesNotMatch(source, /from\s+["']recharts["']/);
    assert.doesNotMatch(source, /import\("recharts"\)/);
  }
});

test("usage analytics bars use the defined primary color token", () => {
  const chartSource = readFileSync(
    "src/shared/components/analytics/rechartsUsageCharts.tsx",
    "utf8"
  );

  assert.match(chartSource, /fill="var\(--color-primary\)"/);
  assert.doesNotMatch(chartSource, /fill="var\(--primary\)"/);
});
