// Guard for scripts/dev/vendor-chatgpt-web.mjs — the drift-visibility tooling requested by
// #14194 for the vendored codex-chatgpt-web bridge. Only the pure formatting functions are
// tested here (no live GitHub calls) — network I/O is isolated in the script's main().

import test from "node:test";
import assert from "node:assert/strict";

import { formatStatusReport, formatDiffReport } from "../../scripts/dev/vendor-chatgpt-web.mjs";

const VENDOR_META = {
  repository: "miuuyy/codex-chatgpt-web",
  tag: "v4.0.7",
  commit: "b59d7dc51b84fb1f465ff1d00f5207f3b2b4a494",
  license: "MIT",
};

test("reports up to date when the pinned tag matches the latest release", () => {
  const latest = { tag: "v4.0.7", publishedAt: "2026-08-31T09:48:26Z" };
  const compare = { aheadBy: 0, totalFiles: 0, htmlUrl: null, files: [] };
  const report = formatStatusReport(VENDOR_META, latest, compare);
  assert.match(report, /Status: up to date\./);
  assert.doesNotMatch(report, /behind/);
});

test("reports drift with commit/file counts and a compare link when the pin lags", () => {
  const latest = { tag: "v5.0.8", publishedAt: "2026-09-16T21:15:45Z" };
  const compare = {
    aheadBy: 33,
    totalFiles: 169,
    htmlUrl: "https://github.com/miuuyy/codex-chatgpt-web/compare/b59d7dc...v5.0.8",
    files: [],
  };
  const report = formatStatusReport(VENDOR_META, latest, compare);
  assert.match(report, /33 commit\(s\) \/ 169 file\(s\) behind/);
  assert.match(report, /Compare: https:\/\/github\.com\/miuuyy/);
});

test("diff report lists changed files sorted by total change size, descending", () => {
  const latest = { tag: "v5.0.8", publishedAt: "2026-09-16T21:15:45Z" };
  const compare = {
    aheadBy: 33,
    totalFiles: 2,
    htmlUrl: "https://example.com/compare",
    files: [
      { filename: "small-file.ts", status: "modified", additions: 3, deletions: 1 },
      { filename: "browser-worker.ts", status: "modified", additions: 1792, deletions: 624 },
    ],
  };
  const report = formatDiffReport(VENDOR_META, latest, compare);
  const workerIndex = report.indexOf("browser-worker.ts");
  const smallIndex = report.indexOf("small-file.ts");
  assert.ok(workerIndex !== -1 && smallIndex !== -1);
  assert.ok(workerIndex < smallIndex, "the larger diff should be listed first");
  assert.match(report, /\+1792\/-624/);
});

test("diff report collapses to the status header alone when up to date", () => {
  const latest = { tag: "v4.0.7", publishedAt: "2026-08-31T09:48:26Z" };
  const compare = { aheadBy: 0, totalFiles: 0, htmlUrl: null, files: [] };
  const report = formatDiffReport(VENDOR_META, latest, compare);
  assert.match(report, /Status: up to date\./);
  assert.doesNotMatch(report, /Changed files/);
});
