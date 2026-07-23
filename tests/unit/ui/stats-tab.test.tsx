/**
 * Asserts that StatsTab lazy-loads StatsCharts via next/dynamic (ssr: false)
 * and does NOT statically import anything from "recharts".
 */
import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TABS_DIR = path.resolve(
  __dirname,
  "../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/components/tabs",
);

const statsTabSrc = readFileSync(path.join(TABS_DIR, "StatsTab.tsx"), "utf-8");
const statsChartsSrc = readFileSync(path.join(TABS_DIR, "StatsCharts.tsx"), "utf-8");

describe("StatsTab — C3 lazy bundle split", () => {
  it("imports dynamic from next/dynamic", () => {
    assert.ok(
      statsTabSrc.includes('import dynamic from "next/dynamic"'),
      "StatsTab must import dynamic from next/dynamic",
    );
  });

  it("calls dynamic() at module level with import('./StatsCharts')", () => {
    assert.ok(
      statsTabSrc.includes("dynamic(() => import(\"./StatsCharts\")"),
      "StatsTab must call dynamic(() => import('./StatsCharts')) at module level",
    );
  });

  it("passes ssr: false to dynamic()", () => {
    assert.ok(
      statsTabSrc.includes("ssr: false"),
      "StatsTab dynamic() call must include ssr: false",
    );
  });

  it("does NOT statically import any name from recharts", () => {
    // A static import of recharts would look like: import ... from "recharts"
    assert.ok(
      !statsTabSrc.includes("from \"recharts\""),
      "StatsTab must not contain a static import from recharts",
    );
  });

  it("does NOT contain a useEffect that imports recharts", () => {
    assert.ok(
      !statsTabSrc.includes("import(\"recharts\")"),
      "StatsTab must not dynamically import recharts via useEffect",
    );
  });

  it("does NOT contain the discarded _rechartsPreload no-op pattern", () => {
    assert.ok(
      !statsTabSrc.includes("_rechartsPreload"),
      "StatsTab must not contain the orphaned _rechartsPreload variable",
    );
  });
});

describe("StatsCharts — recharts imports live here", () => {
  it("imports recharts components statically", () => {
    assert.ok(
      statsChartsSrc.includes("from \"recharts\""),
      "StatsCharts must statically import from recharts",
    );
  });

  it("imports ResponsiveContainer from recharts", () => {
    assert.ok(
      statsChartsSrc.includes("ResponsiveContainer"),
      "StatsCharts must import ResponsiveContainer",
    );
  });

  it("imports BarChart from recharts", () => {
    assert.ok(statsChartsSrc.includes("BarChart"), "StatsCharts must import BarChart");
  });

  it("imports LineChart from recharts", () => {
    assert.ok(statsChartsSrc.includes("LineChart"), "StatsCharts must import LineChart");
  });

  it("exports a default component", () => {
    assert.ok(
      statsChartsSrc.includes("export default function StatsCharts"),
      "StatsCharts must export a default function",
    );
  });
});
