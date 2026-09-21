#!/usr/bin/env node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "tinyglobby";

import { resolveImport } from "../quality/build-test-impact-map.mjs";

const DEFAULT_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SOURCE_ROOTS = ["src/", "open-sse/", "bin/"];
const SOURCE_GLOBS = [
  "src/**/*.{ts,tsx,mts,js,mjs}",
  "open-sse/**/*.{ts,tsx,mts,js,mjs}",
  "bin/**/*.{ts,tsx,mts,js,mjs}",
];
const IGNORE = [
  "**/__tests__/**",
  "**/*.test.*",
  "**/*.spec.*",
  "**/fixtures/**",
  "**/generated/**",
];
const STATIC_IMPORT_RE =
  /(?:import|export)[^'"()]*from\s*['"]([^'"]+)['"]|require\(\s*['"]([^'"]+)['"]\s*\)/g;
const DYNAMIC_IMPORT_RE = /import\(\s*['"]([^'"]+)['"]\s*\)/g;
const TEST_MASK_RE =
  /^\+.*(?:\b(?:it|test|describe)\.(?:skip|todo)\b|\b(?:xit|xtest|xdescribe)\s*\()/;
const REFERENCE_RE = /^(?:#\d+|https:\/\/github\.com\/[^/]+\/[^/]+\/(?:issues|pull)\/\d+)$/;

function normalize(file) {
  return file.split(path.sep).join("/");
}

function isProduction(file) {
  return (
    SOURCE_ROOTS.some((root) => file.startsWith(root)) &&
    !IGNORE.some((pattern) => {
      const token = pattern.replaceAll("**/", "").replaceAll("/**", "").replaceAll("*", "");
      return token && file.includes(token);
    })
  );
}

function isBarrel(file, code) {
  return /(?:^|\/)index\.[cm]?[jt]sx?$/.test(file) && /\bexport\s+(?:\*|\{)/.test(code);
}

function importEdges(root) {
  const edges = [];
  const files = globSync(SOURCE_GLOBS, { cwd: root, absolute: true, ignore: IGNORE });
  for (const absolute of files) {
    const consumer = normalize(path.relative(root, absolute));
    const code = fs.readFileSync(absolute, "utf8");
    for (const match of code.matchAll(STATIC_IMPORT_RE)) {
      const resolved = resolveImport(match[1] || match[2], absolute, root);
      if (resolved) {
        edges.push({
          module: normalize(path.relative(root, resolved)),
          consumer,
          kind: isBarrel(consumer, code) ? "barrel" : "static",
        });
      }
    }
    for (const match of code.matchAll(DYNAMIC_IMPORT_RE)) {
      const resolved = resolveImport(match[1], absolute, root);
      if (resolved) {
        edges.push({
          module: normalize(path.relative(root, resolved)),
          consumer,
          kind: "dynamic-import",
        });
      }
    }
  }
  return edges.sort((a, b) =>
    `${a.module}\0${a.consumer}\0${a.kind}`.localeCompare(`${b.module}\0${b.consumer}\0${b.kind}`)
  );
}

export function validateAllowlist(value) {
  const entries = Array.isArray(value) ? value : value?.entries;
  if (!Array.isArray(entries))
    throw new Error("forgotten-sibling allowlist must contain an entries array");
  return entries.map((entry, index) => {
    for (const field of ["consumer", "candidateTest", "rationale", "reference"]) {
      if (typeof entry?.[field] !== "string" || !entry[field].trim()) {
        throw new Error(`forgotten-sibling allowlist entry ${index} requires ${field}`);
      }
    }
    if (entry.rationale.trim().length < 20) {
      throw new Error(`forgotten-sibling allowlist entry ${index} rationale must be specific`);
    }
    if (!REFERENCE_RE.test(entry.reference.trim())) {
      throw new Error(
        `forgotten-sibling allowlist entry ${index} reference must be a GitHub issue or PR`
      );
    }
    return {
      consumer: normalize(entry.consumer.trim()),
      candidateTest: normalize(entry.candidateTest.trim()),
      rationale: entry.rationale.trim(),
      reference: entry.reference.trim(),
    };
  });
}

export function analyzeForgottenSiblingTests({
  root = DEFAULT_ROOT,
  changedEntries,
  impactMap,
  allowlist,
  changedSymbolsByFile = {},
  addedTestLines = [],
}) {
  const changed = new Map(changedEntries.map((entry) => [normalize(entry.file), entry.status]));
  const changedModules = [...changed.keys()].filter(isProduction).sort();
  const maskingAdded = addedTestLines.some((line) => TEST_MASK_RE.test(line));
  const allow = new Map(
    allowlist.map((entry) => [`${entry.consumer}\0${entry.candidateTest}`, entry])
  );
  const findings = [];
  const diagnostics = [];
  const suppressed = [];
  const maskingRisks = [];

  for (const edge of importEdges(root)) {
    if (!changedModules.includes(edge.module)) continue;
    const tests = [...new Set(impactMap.sources?.[edge.consumer] || [])].sort();
    if (edge.kind !== "static") {
      diagnostics.push({
        changedModule: edge.module,
        consumer: edge.consumer,
        kind: edge.kind,
        message: `${edge.kind} resolution is advisory and never blocks`,
      });
      continue;
    }
    for (const candidateTest of tests) {
      const status = changed.get(candidateTest);
      const masking = status === "D" || (status && maskingAdded);
      if (masking) {
        maskingRisks.push({
          changedModule: edge.module,
          consumer: edge.consumer,
          candidateTest,
          reason:
            status === "D"
              ? "candidate sibling test was deleted"
              : "candidate sibling test adds skip/todo masking",
        });
        continue;
      }
      if (status) continue;
      const finding = {
        changedModule: edge.module,
        changedSymbols: [...(changedSymbolsByFile[edge.module] || [])].sort(),
        consumer: edge.consumer,
        candidateTest,
        reason: "candidate sibling test is absent from the PR diff",
      };
      const exception = allow.get(`${edge.consumer}\0${candidateTest}`);
      if (exception) suppressed.push({ ...finding, exception });
      else findings.push(finding);
    }
  }
  return { mode: "advisory", findings, diagnostics, suppressed, maskingRisks };
}

function arg(name, fallback = "") {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

function git(root, args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
}

function changedEntries(root, base) {
  return git(root, ["diff", "--name-status", "--diff-filter=ACMRD", `${base}...HEAD`])
    .trim()
    .split(/\r?\n/)
    .filter(Boolean)
    .map((line) => {
      const [status, ...files] = line.split("\t");
      return { status: status[0], file: files.at(-1) };
    });
}

function changedSymbols(root, base, entries) {
  const result = {};
  const declaration =
    /^\+\s*(?:export\s+)?(?:async\s+)?(?:function|class|const|let|var|interface|type|enum)\s+([A-Za-z_$][\w$]*)/;
  for (const entry of entries.filter(({ file }) => isProduction(file))) {
    const diff = git(root, ["diff", "--unified=0", `${base}...HEAD`, "--", entry.file]);
    result[entry.file] = [
      ...new Set(
        diff
          .split(/\r?\n/)
          .map((line) => line.match(declaration)?.[1])
          .filter(Boolean)
      ),
    ];
  }
  return result;
}

// A changed hub module (providerRegistry.ts, providers.ts, …) is imported by thousands of
// consumers, and every consumer multiplies by its candidate tests, so the cross-product reaches
// millions of rows. Rendering all of them made `lines.join("\n")` exceed V8's maximum string
// length; the throw landed in main()'s catch, which exits 1 — so an ADVISORY step turned
// "Fast Quality Gates" red on every PR whose diff touched a hub (#13866 follow-up). The header
// keeps the exact totals; only the enumeration is bounded.
const RENDER_LIMIT = 200;
const JSON_ITEM_LIMIT = 5000;

/** First `limit` items plus a one-line note naming how many were withheld. */
function renderBounded(lines, items, format, limit = RENDER_LIMIT) {
  for (const item of items.slice(0, limit)) lines.push(format(item));
  if (items.length > limit) {
    lines.push(
      `- _… and ${items.length - limit} more not listed (report bounded at ${limit} rows per section; the counts above are exact)._`
    );
  }
}

export function markdown(result, base) {
  const lines = [
    "## Forgotten sibling tests (advisory)",
    "",
    `Base: \`${base}\``,
    `Unallowlisted findings: ${result.findings.length}`,
    `Reviewed exceptions: ${result.suppressed.length}`,
    `Resolution diagnostics: ${result.diagnostics.length}`,
    `Masking/deletion risks (owned by blocking sibling gates): ${result.maskingRisks.length}`,
    "",
  ];
  if (result.findings.length) {
    lines.push("### Candidate tests absent from this diff", "");
    renderBounded(lines, result.findings, (item) => {
      const symbol = item.changedSymbols.length ? ` (${item.changedSymbols.join(", ")})` : "";
      return `- \`${item.changedModule}\`${symbol} -> \`${item.consumer}\` -> \`${item.candidateTest}\``;
    });
    lines.push("", "> Report-only calibration: these findings do not fail the job.", "");
  }
  for (const [heading, items] of [
    ["Resolution diagnostics", result.diagnostics],
    ["Test masking/deletion risks", result.maskingRisks],
  ]) {
    if (!items.length) continue;
    lines.push(`### ${heading}`, "");
    renderBounded(
      lines,
      items,
      (item) =>
        `- \`${item.changedModule}\` -> \`${item.consumer}\`${item.candidateTest ? ` -> \`${item.candidateTest}\`` : ""}: ${item.reason || item.message}`
    );
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

function main() {
  const root = DEFAULT_ROOT;
  const base = arg(
    "--base",
    process.env.GITHUB_BASE_SHA ||
      (process.env.GITHUB_BASE_REF ? `origin/${process.env.GITHUB_BASE_REF}` : "HEAD~1")
  );
  const mapPath = arg("--impact-map", path.join(root, "config/quality/test-impact-map.json"));
  const allowlistPath = arg(
    "--allowlist",
    path.join(root, "config/quality/forgotten-sibling-allowlist.json")
  );
  const summaryPath = arg("--summary-file", "");
  const jsonPath = arg("--json-file", "");
  const entries = changedEntries(root, base);
  const impactMap = JSON.parse(fs.readFileSync(mapPath, "utf8"));
  const allowlist = validateAllowlist(JSON.parse(fs.readFileSync(allowlistPath, "utf8")));
  const addedTestLines = git(root, ["diff", "--unified=0", `${base}...HEAD`, "--", "tests/"])
    .split(/\r?\n/)
    .filter((line) => line.startsWith("+") && !line.startsWith("+++"));
  const result = analyzeForgottenSiblingTests({
    root,
    changedEntries: entries,
    impactMap,
    allowlist,
    changedSymbolsByFile: changedSymbols(root, base, entries),
    addedTestLines,
  });
  const report = markdown(result, base);
  process.stdout.write(report);
  // The JSON artifact is bounded for the same reason the markdown is: a hub-module diff
  // produces millions of rows and `JSON.stringify` would throw the same "Invalid string
  // length". `totals` keeps every count exact, so tooling can still see the real numbers.
  const jsonResult = {
    ...result,
    totals: {
      findings: result.findings.length,
      diagnostics: result.diagnostics.length,
      suppressed: result.suppressed.length,
      maskingRisks: result.maskingRisks.length,
    },
    itemLimit: JSON_ITEM_LIMIT,
    findings: result.findings.slice(0, JSON_ITEM_LIMIT),
    diagnostics: result.diagnostics.slice(0, JSON_ITEM_LIMIT),
    suppressed: result.suppressed.slice(0, JSON_ITEM_LIMIT),
    maskingRisks: result.maskingRisks.slice(0, JSON_ITEM_LIMIT),
  };
  for (const [target, contents] of [
    [summaryPath, report],
    [jsonPath, `${JSON.stringify(jsonResult, null, 2)}\n`],
  ]) {
    if (!target) continue;
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, contents);
  }
}

if (fileURLToPath(import.meta.url) === path.resolve(process.argv[1] || "")) {
  try {
    main();
  } catch (error) {
    console.error(
      `forgotten-sibling-tests: ${error instanceof Error ? error.message : String(error)}`
    );
    process.exit(1);
  }
}
