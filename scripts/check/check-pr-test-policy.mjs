import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const SOURCE_ROOTS = ["src/", "open-sse/", "electron/", "bin/"];
const TEST_PATTERNS = [/^tests\//, /(?:^|\/)__tests__\//, /\.(?:test|spec)\.[cm]?[jt]sx?$/];
// Test files for specific source types (e.g., Python validation scripts for i18n)
const TEST_FILE_PATTERNS = {
  "src/i18n/messages/": [
    /\/scripts\/validate_translation\.py$/,
    /\/scripts\/check_translations\.py$/,
  ],
};
// Exclude directories that don't require tests (i18n has Python validation, docs, config)
const EXCLUDED_PATTERNS = [
  /\/i18n\/messages\//, // i18n files have their own Python test scripts
  /\.md$/, // Documentation
  /\.yaml$/, // Config files
  /\.yml$/, // Config files
];

function getArg(name, fallbackValue = "") {
  const index = process.argv.indexOf(name);
  if (index === -1 || index === process.argv.length - 1) {
    return fallbackValue;
  }
  return process.argv[index + 1];
}

function runGit(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim();
}

function isSourceFile(filePath) {
  // Exclude patterns that don't require tests
  if (EXCLUDED_PATTERNS.some((pattern) => pattern.test(filePath))) {
    return false;
  }
  return SOURCE_ROOTS.some((root) => filePath.startsWith(root));
}

function isTestFile(filePath) {
  // Check standard test patterns
  if (TEST_PATTERNS.some((pattern) => pattern.test(filePath))) {
    return true;
  }
  // Check custom test file patterns for specific directories
  for (const [dir, patterns] of Object.entries(TEST_FILE_PATTERNS)) {
    if (filePath.startsWith(dir) && patterns.some((pattern) => pattern.test(filePath))) {
      return true;
    }
  }
  return false;
}

function buildReport(lines) {
  return `${lines.join("\n")}\n`;
}

const summaryFile = getArg("--summary-file", "");
const baseRef = process.env.GITHUB_BASE_REF;

if (!baseRef) {
  const report = buildReport([
    "## PR Test Policy",
    "",
    "Skipped: not running in a pull request context.",
  ]);

  if (summaryFile) {
    mkdirSync(path.dirname(summaryFile), { recursive: true });
    writeFileSync(summaryFile, report);
  }

  process.stdout.write(report);
  process.exit(0);
}

const baseTarget = process.env.GITHUB_BASE_SHA || `origin/${baseRef}`;
const changedFiles = runGit(["diff", "--name-only", "--diff-filter=ACMR", `${baseTarget}...HEAD`])
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

const changedSourceFiles = changedFiles.filter(isSourceFile);
const changedTestFiles = changedFiles.filter(isTestFile);
const hasRequiredTests = changedSourceFiles.length === 0 || changedTestFiles.length > 0;

const reportLines = [
  "## PR Test Policy",
  "",
  `Base ref: \`${baseRef}\``,
  `Changed production files: ${changedSourceFiles.length}`,
  `Changed automated test files: ${changedTestFiles.length}`,
  "",
];

if (changedSourceFiles.length > 0) {
  reportLines.push("### Production files in scope", "");
  for (const filePath of changedSourceFiles.slice(0, 20)) {
    reportLines.push(`- \`${filePath}\``);
  }
  reportLines.push("");
}

if (changedTestFiles.length > 0) {
  reportLines.push("### Tests in this PR", "");
  for (const filePath of changedTestFiles.slice(0, 20)) {
    reportLines.push(`- \`${filePath}\``);
  }
  reportLines.push("");
}

if (hasRequiredTests) {
  reportLines.push("Result: PASS");
} else {
  reportLines.push(
    "Result: FAIL",
    "",
    "This PR changes production code under `src/`, `open-sse/`, `electron/`, or `bin/` but does not add or update automated tests."
  );
}

const report = buildReport(reportLines);

if (summaryFile) {
  mkdirSync(path.dirname(summaryFile), { recursive: true });
  writeFileSync(summaryFile, report);
}

process.stdout.write(report);

if (!hasRequiredTests) {
  process.exit(1);
}
