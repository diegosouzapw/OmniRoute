import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

import {
  makeVersionClaimValidator,
  makeCoverageFloorClaimValidator,
} from "../../scripts/check/check-docs-counts-sync.mjs";

// Regression guard for audit #15159 — G-06 (stale version strings the validator
// cannot see) and G-08 (AGENTS.md advertises the wrong coverage floor).
//
// G-06: makeVersionClaimValidator matched exactly TWO literal phrasings:
//
//   /OmniRoute v(\d+\.\d+\.\d+)/
//   /Current version:\*{0,2}\s*\*{0,2}(\d+\.\d+\.\d+)/
//
// so it saw at most one claim per file. Four stale strings shipped straight
// through it (audit-measured):
//
//   README.md:1012  "reported by OmniRoute 3.8.51"
//   README.md:64    "v3.8.49 | **v3.8.50** | v3.8.51+"
//   README.md:571   "Recent highlights from **v3.8.20 → v3.8.50**"
//   llm.txt:277     "## Key Features (v3.8.50)"
//
// None of those phrasings match either pattern, so the gate reported OK while
// the docs named a version that was not package.json's. Widening the regex is
// load-bearing: fixing the strings alone lets the next phrasing slip through.
//
// G-08: AGENTS.md documents `60/60/60/60` (statements/lines/functions/branches).
// That IS what `npm run test:coverage` hardcodes, so the number is not wrong in
// isolation — but the BLOCKING ratchet in config/quality/quality-baseline.json
// enforces 67.33 / 67.33 / 72.02 / 65.08. An agent reading AGENTS.md alone reds
// the quality-gate job below the real floor. Worse, AGENTS.md was not in the
// validator's file list at all, so nothing checked it.

type Verdict = { ok: boolean; detail: string };

const validateVersion = makeVersionClaimValidator as (
  expected: string
) => (content: string) => Verdict;
const validateCoverage = makeCoverageFloorClaimValidator as (floors: {
  statements: number;
  lines: number;
  functions: number;
  branches: number;
}) => (content: string) => Verdict;

const VERSION = "3.8.52";

// --- G-06: the four phrasings the audit found slipping through ---

const SHIPPED_STALE: [string, string][] = [
  ["README.md:1012", "For the package set reported by OmniRoute 3.8.51:"],
  ["README.md:64", "|  | v3.8.49 |        **v3.8.50**        | `v3.8.51+`  |"],
  ["README.md:571", "Recent highlights from **v3.8.20 → v3.8.50**."],
  ["llm.txt:277", "## Key Features (v3.8.50)"],
];

for (const [where, line] of SHIPPED_STALE) {
  test(`G-06: the ${where} phrasing is now detected as a stale version claim`, () => {
    const result = validateVersion(VERSION)(line);

    assert.equal(
      result.ok,
      false,
      `validator must flag ${where} as stale on a ${VERSION} tree, got: ${result.detail}`
    );
    assert.match(result.detail, /stale version/);
  });
}

test("G-06: a claim matching the CURRENT version is accepted in every phrasing", () => {
  // Widening the patterns must not make the gate reject correct text.
  for (const [, line] of SHIPPED_STALE) {
    const updated = line.replace(/3\.8\.\d+/g, VERSION);
    const result = validateVersion(VERSION)(updated);
    assert.equal(result.ok, true, `current-version phrasing rejected: ${result.detail}`);
  }
});

test("G-06: a 'v3.8.51+' lower-bound claim is caught, not treated as a range", () => {
  // The `v3.8.51+` cell is a compatibility floor, not the shipped version. It
  // must still be reported: the audit listed it as one of the four leaks.
  const result = validateVersion(VERSION)("|  | v3.8.49 | **v3.8.52** | `v3.8.51+`  |");
  assert.equal(result.ok, false);
});

test("G-06: unrelated version numbers in docs are not flagged", () => {
  // The gate must not become so greedy it reddens on legitimate prose — node
  // versions, dependency versions, historical notes.
  const result = validateVersion(VERSION)(
    [
      "Requires Node.js >=22.22.2 <23.",
      "TypeScript 6.0+, target ES2022.",
      "Released 2024 for the 1.0 series.",
    ].join("\n")
  );

  assert.equal(result.ok, true, `false positive: ${result.detail}`);
});

test("G-06: prose with no version claim at all is accepted", () => {
  const result = validateVersion(VERSION)("OmniRoute is a unified AI proxy/router.");
  assert.equal(result.ok, true);
});

// --- G-06: the real files must now be clean ---

test("G-06: README.md and llm.txt carry no stale version claim", () => {
  const root = path.resolve(import.meta.dirname, "..", "..");
  const validator = validateVersion(VERSION);

  for (const rel of ["README.md", "llm.txt"]) {
    const result = validator(fs.readFileSync(path.join(root, rel), "utf8"));
    assert.equal(result.ok, true, `${rel} has a stale version claim — ${result.detail}`);
  }
});

// --- G-08: the coverage floor AGENTS.md advertises ---

const REAL_FLOORS = { statements: 67.33, lines: 67.33, functions: 72.02, branches: 65.08 };

test("G-08: a doc claiming the blocking ratchet floor is accepted", () => {
  const line =
    "coverage gate (67.33 / 67.33 / 72.02 / 65.08 — statements/lines/functions/branches)";
  assert.equal(validateCoverage(REAL_FLOORS)(line).ok, true);
});

test("G-08: AGENTS.md claiming 60/60/60/60 is now flagged against the blocking floor", () => {
  // This is the defect. Accurate for `npm run test:coverage`, misleading for the
  // ratchet an agent will actually hit.
  const line =
    "| Coverage gate           | `npm run test:coverage` (60/60/60/60 — statements/lines/functions/branches)   |";
  const result = validateCoverage(REAL_FLOORS)(line);

  assert.equal(result.ok, false, `must flag 60/60/60/60 as below the blocking floor`);
  assert.match(result.detail, /60/);
});

test("G-08: the coverage validator reports WHICH floor is missing", () => {
  const result = validateCoverage(REAL_FLOORS)("coverage gate (60/60/60/60)");
  assert.match(result.detail, /blocking/i);
});

test("G-08: a docs file with no coverage claim is accepted", () => {
  assert.equal(validateCoverage(REAL_FLOORS)("nothing to see here").ok, true);
});

test("G-08: AGENTS.md no longer advertises a floor below the blocking ratchet", () => {
  // The end state: the instruction surface an agent reads first must not send
  // them below the floor the blocking gate enforces.
  const root = path.resolve(import.meta.dirname, "..", "..");
  const agents = fs.readFileSync(path.join(root, "AGENTS.md"), "utf8");

  const result = validateCoverage(REAL_FLOORS)(agents);
  assert.equal(
    result.ok,
    true,
    `AGENTS.md advertises a coverage floor below the blocking ratchet — ${result.detail}`
  );
});

test("G-08: the blocking ratchet floors in quality-baseline.json are what we validate against", () => {
  // Pin the source of truth so a future rebaseline that lowers these floors is a
  // deliberate act visible in a test diff, not a silent doc/gate divergence.
  const root = path.resolve(import.meta.dirname, "..", "..");
  const baseline = JSON.parse(
    fs.readFileSync(path.join(root, "config/quality/quality-baseline.json"), "utf8")
  );

  assert.equal(baseline.metrics["coverage.statements"].value, REAL_FLOORS.statements);
  assert.equal(baseline.metrics["coverage.lines"].value, REAL_FLOORS.lines);
  assert.equal(baseline.metrics["coverage.functions"].value, REAL_FLOORS.functions);
  assert.equal(baseline.metrics["coverage.branches"].value, REAL_FLOORS.branches);
});
