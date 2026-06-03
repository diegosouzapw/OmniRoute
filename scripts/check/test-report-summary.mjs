import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

function getArg(name, fallbackValue = "") {
  const index = process.argv.indexOf(name);
  if (index === -1 || index === process.argv.length - 1) {
    return fallbackValue;
  }
  return process.argv[index + 1];
}

function formatPercent(value) {
  return `${Number(value ?? 0).toFixed(2)}%`;
}

function parseThreshold(name, fallbackValue) {
  const rawValue = getArg(name, fallbackValue);
  const value = Number(rawValue);
  if (!Number.isFinite(value)) {
    console.error(`Invalid coverage threshold for ${name}: ${rawValue}`);
    process.exit(1);
  }
  return value;
}

const inputPath = getArg("--input", "coverage/coverage-summary.json");
const outputPath = getArg("--output", "");
const hasGlobalThreshold = process.argv.includes("--threshold");
const defaultThreshold = parseThreshold("--threshold", "75");

if (!existsSync(inputPath)) {
  console.error(`Coverage summary file not found: ${inputPath}`);
  process.exit(1);
}

const summary = JSON.parse(readFileSync(inputPath, "utf8"));
const cwd = process.cwd();
const metrics = [
  ["lines", "Lines"],
  ["statements", "Statements"],
  ["functions", "Functions"],
  ["branches", "Branches"],
];
const thresholds = Object.fromEntries(
  metrics.map(([metric]) => {
    const fallback = metric === "branches" && !hasGlobalThreshold ? "70" : String(defaultThreshold);
    return [metric, parseThreshold(`--${metric}`, fallback)];
  })
);

const total = summary.total ?? {};
const gatePassed = metrics.every(([metric]) => (total[metric]?.pct ?? 0) >= thresholds[metric]);

const files = Object.entries(summary)
  .filter(([name]) => name !== "total" && /\.(?:[cm]?[jt]sx?)$/.test(name))
  .map(([name, stats]) => {
    const relativeName = path.relative(cwd, name);
    const totalLines = stats.lines?.total ?? 0;
    const coveredLines = stats.lines?.covered ?? 0;

    return {
      name: relativeName,
      lines: stats.lines?.pct ?? 0,
      branches: stats.branches?.pct ?? 0,
      functions: stats.functions?.pct ?? 0,
      missingLines: Math.max(totalLines - coveredLines, 0),
    };
  })
  .sort((left, right) => {
    if (left.lines !== right.lines) return left.lines - right.lines;
    if (left.branches !== right.branches) return left.branches - right.branches;
    return right.missingLines - left.missingLines;
  })
  .slice(0, 15);

const report = [
  "# Coverage Report",
  "",
  `Gate: ${gatePassed ? "PASS" : "FAIL"} at configured metric minimums.`,
  "",
  "## Totals",
  "",
  "| Metric | Covered | Total | Percent | Threshold | Status |",
  "| --- | ---: | ---: | ---: | ---: | --- |",
  ...metrics.map(([metric, label]) => {
    const covered = total[metric]?.covered ?? 0;
    const totalCount = total[metric]?.total ?? 0;
    const pct = total[metric]?.pct ?? 0;
    const threshold = thresholds[metric];
    const status = pct >= threshold ? "PASS" : "FAIL";
    return `| ${label} | ${covered} | ${totalCount} | ${formatPercent(pct)} | ${threshold}% | ${status} |`;
  }),
  "",
  "## Lowest Coverage Files",
  "",
  "| File | Lines | Branches | Functions | Missing Lines |",
  "| --- | ---: | ---: | ---: | ---: |",
  ...files.map(
    (entry) =>
      `| \`${entry.name}\` | ${formatPercent(entry.lines)} | ${formatPercent(entry.branches)} | ${formatPercent(entry.functions)} | ${entry.missingLines} |`
  ),
];

const reportContent = `${report.join("\n")}\n`;

if (outputPath) {
  writeFileSync(outputPath, reportContent);
} else {
  process.stdout.write(reportContent);
}
