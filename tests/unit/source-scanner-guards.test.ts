// Hard gate: every test variable holding project source read as text must carry at
// least one POSITIVE anchor.
//
// The dangerous shape is the negative-only guard:
//   const endpoint = readSource("src/.../EndpointPageClient.tsx");
//   assert.equal(endpoint.includes(">Active Endpoints<"), false);
// When that markup is later extracted into a new component file, the parent no longer
// contains the string — so the assertion still passes while guarding nothing. The
// regression coverage is deleted silently, with no test turning red.
//
// One positive assertion against the same variable (assert.match(endpoint, /…/) on a
// stable top-level declaration) proves the read still resolved to the right, non-empty
// file — which makes the negative guards meaningful again.
//
// There is deliberately NO baseline and NO allowlist: the violation set is small and
// every instance is a real hole. Fix it by adding an anchor, not by suppressing it.
//
// Classification works on LOGICAL statements, not physical lines, because negative
// guards are routinely written across several lines:
//   assert.doesNotMatch(
//     source,
//     /^const\s+require\s*=\s*createRequire\s*\(/m
//   );
// A line-based scan sees a bare `source,` line, matches no negative pattern, and files
// it as a positive anchor — which would let anyone bypass this gate by reformatting.
//
// KNOWN LIMITATION (deliberate): variables are keyed by name per FILE, not per scope.
// A file that declares `const source` in two separate test bodies pools both sets of
// usages, so an anchor on one can mask a negative-only guard on the other
// (tests/unit/8395-plugin-hooks-fire.test.ts is the current example). This errs toward
// UNDER-reporting — it never invents a violation — and closing it needs real
// scope-aware parsing, which is not worth the complexity for the size of this problem.
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const TESTS_ROOT = join(REPO_ROOT, "tests");

const TEST_FILE_RE = /\.(test|spec)\.(ts|tsx|mjs)$/;
const SKIP_DIRS = new Set(["node_modules", "fixtures", "__snapshots__", "coverage"]);

/** Functions whose return value is project source read as text. */
const READER_NAMES = ["readFileSync", "readProjectFile", "readSource", "readSrc"];

/** Safety valve: no single statement in this repo legitimately spans more lines. */
const MAX_UNIT_LINES = 40;

/**
 * `const <name> = <reader>(<args>);` — captures the variable and the call arguments so
 * we can tell "read a project file" apart from "read a fixture / temp file".
 */
const ASSIGNMENT_RE = new RegExp(
  String.raw`(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:await\s+)?(?:${READER_NAMES.join(
    "|"
  )})\s*\(([^;]*?)\)\s*;`,
  "gs"
);

/** A quoted path pointing into one of the project's production source trees. */
const PROJECT_PATH_RE =
  /["'`][^"'`]*(?:src|open-sse|electron|bin)\/[^"'`]*\.(?:ts|tsx|mjs|js)["'`]/;

/** Relative escapes such as `new URL("../../open-sse/executors/claude-web.ts", …)`. */
const RELATIVE_PATH_RE = /\.\.\//;

interface SourceVar {
  name: string;
  /** 1-based line range covered by the assignment statement itself. */
  declStartLine: number;
  declEndLine: number;
  negativeLines: number[];
  positiveLines: number[];
}

interface LogicalUnit {
  /** 1-based line where the statement starts — what the failure message reports. */
  startLine: number;
  endLine: number;
  /** Joined statement text, with strings, regexes, and comments blanked out. */
  code: string;
}

interface Violation {
  file: string;
  varName: string;
  negativeLines: number[];
}

function walkTestFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walkTestFiles(full, acc);
    } else if (TEST_FILE_RE.test(entry.name)) {
      acc.push(full);
    }
  }
  return acc;
}

/**
 * Assertions that only prove something is ABSENT. They pass against an empty string,
 * so on their own they prove nothing about the source having been read correctly.
 * `\s*` spans newlines, so these also match the multi-line form once lines are joined.
 */
function negativeGuardPatterns(name: string): RegExp[] {
  const v = escapeForRegExp(name);
  return [
    new RegExp(String.raw`assert\.doesNotMatch\s*\(\s*${v}\b`),
    new RegExp(String.raw`assert\.equal\s*\(\s*${v}\.includes\s*\([^)]*\)\s*,\s*false`),
    new RegExp(String.raw`assert\.strictEqual\s*\(\s*${v}\.includes\s*\([^)]*\)\s*,\s*false`),
    new RegExp(String.raw`assert\.ok\s*\(\s*!\s*${v}\.includes`),
    new RegExp(String.raw`assert\.equal\s*\(\s*${v}\.indexOf\s*\([^)]*\)\s*,\s*-1`),
  ];
}

function escapeForRegExp(literal: string): string {
  return literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function lineNumberAt(source: string, index: number): number {
  let line = 1;
  for (let i = 0; i < index; i++) if (source.charCodeAt(i) === 10) line++;
  return line;
}

interface ScrubState {
  inBlockComment: boolean;
  inTemplate: boolean;
}

/** True when a `/` at this position opens a regex literal rather than dividing. */
function startsRegex(codeSoFar: string): boolean {
  const prev = codeSoFar.replace(/\s+$/, "").slice(-1);
  return prev === "" || "(,=:[!&|?{};+-*%~^".includes(prev);
}

/** Consume a quoted string starting at `i`; returns the index just past the closing quote. */
function skipQuoted(line: string, start: number, quote: string): number {
  let i = start + 1;
  while (i < line.length) {
    if (line[i] === "\\") i += 2;
    else if (line[i] === quote) return i + 1;
    else i++;
  }
  return i;
}

/** Consume a regex literal starting at `i`; returns the index just past the closing slash. */
function skipRegex(line: string, start: number): number {
  let i = start + 1;
  let inClass = false;
  while (i < line.length) {
    if (line[i] === "\\") i += 2;
    else if (line[i] === "/" && !inClass) return i + 1;
    else {
      if (line[i] === "[") inClass = true;
      else if (line[i] === "]") inClass = false;
      i++;
    }
  }
  return i;
}

/**
 * Blank out string literals, template literals, regex literals, and comments so bracket
 * counting sees only real code brackets: `/notify\.error\(/` must not read as an
 * unclosed parenthesis, and a `//` comment must not swallow the rest of a statement.
 * Blanking (rather than deleting) also stops a variable name mentioned inside a comment
 * or a string from counting as a usage.
 */
function scrubLine(line: string, state: ScrubState): string {
  let out = "";
  let i = 0;
  const blank = (from: number, to: number) => " ".repeat(Math.min(to, line.length) - from);

  while (i < line.length) {
    const ch = line[i];
    if (state.inBlockComment) {
      if (ch === "*" && line[i + 1] === "/") {
        state.inBlockComment = false;
        out += "  ";
        i += 2;
      } else {
        out += " ";
        i++;
      }
      continue;
    }
    if (state.inTemplate) {
      if (ch === "\\") {
        out += "  ";
        i += 2;
      } else {
        if (ch === "`") state.inTemplate = false;
        out += " ";
        i++;
      }
      continue;
    }
    if (ch === "/" && line[i + 1] === "/") return out + blank(i, line.length);
    if (ch === "/" && line[i + 1] === "*") {
      state.inBlockComment = true;
      out += "  ";
      i += 2;
      continue;
    }
    if (ch === '"' || ch === "'") {
      const end = skipQuoted(line, i, ch);
      out += blank(i, end);
      i = end;
      continue;
    }
    if (ch === "`") {
      state.inTemplate = true;
      out += " ";
      i++;
      continue;
    }
    if (ch === "/" && startsRegex(out)) {
      const end = skipRegex(line, i);
      out += blank(i, end);
      i = end;
      continue;
    }
    out += ch;
    i++;
  }
  return out;
}

function bracketDelta(code: string, open: string, close: string): number {
  let depth = 0;
  for (const ch of code) {
    if (ch === open) depth++;
    else if (ch === close) depth--;
  }
  return depth;
}

/**
 * Fold physical lines into logical statements: keep joining while parentheses are still
 * open. A line that opens a block (`test("…", () => {`) ends the unit regardless, so a
 * whole test body never collapses into one blob — that would let a single negative guard
 * mislabel every other assertion around it.
 */
function toLogicalUnits(lines: string[]): LogicalUnit[] {
  const state: ScrubState = { inBlockComment: false, inTemplate: false };
  const scrubbed = lines.map((line) => scrubLine(line, state));
  const units: LogicalUnit[] = [];
  let index = 0;
  while (index < lines.length) {
    let parenDepth = 0;
    let braceDepth = 0;
    let end = index;
    for (; end < lines.length && end - index < MAX_UNIT_LINES; end++) {
      parenDepth += bracketDelta(scrubbed[end], "(", ")");
      braceDepth += bracketDelta(scrubbed[end], "{", "}");
      if (parenDepth <= 0 || braceDepth > 0) break;
    }
    if (end >= lines.length) end = lines.length - 1;
    units.push({
      startLine: index + 1,
      endLine: end + 1,
      code: scrubbed.slice(index, end + 1).join("\n"),
    });
    index = end + 1;
  }
  return units;
}

/** Collect every variable in `source` that is bound to a project source file read. */
function collectSourceVars(source: string): SourceVar[] {
  const vars: SourceVar[] = [];
  ASSIGNMENT_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = ASSIGNMENT_RE.exec(source)) !== null) {
    const [statement, name, args] = match;
    if (!PROJECT_PATH_RE.test(args) && !RELATIVE_PATH_RE.test(args)) continue;
    const declStartLine = lineNumberAt(source, match.index);
    vars.push({
      name,
      declStartLine,
      declEndLine: declStartLine + statement.split("\n").length - 1,
      negativeLines: [],
      positiveLines: [],
    });
  }
  return vars;
}

/**
 * Classify each logical statement that mentions the variable, outside its declaration.
 * Anything that is not a recognised negative guard counts as a positive anchor —
 * including custom helper calls such as `assertInOrder(source, [...])`, which fail on
 * empty input.
 */
function classifyUsages(units: LogicalUnit[], sourceVar: SourceVar): void {
  const mention = new RegExp(String.raw`\b${escapeForRegExp(sourceVar.name)}\b`);
  const negatives = negativeGuardPatterns(sourceVar.name);
  for (const unit of units) {
    if (unit.startLine >= sourceVar.declStartLine && unit.startLine <= sourceVar.declEndLine) {
      continue;
    }
    if (!mention.test(unit.code)) continue;
    if (negatives.some((pattern) => pattern.test(unit.code))) {
      sourceVar.negativeLines.push(unit.startLine);
    } else {
      sourceVar.positiveLines.push(unit.startLine);
    }
  }
}

/** Analyze one file's text. Exported so the meta-test can feed the classifier a snippet. */
export function findViolationsInSource(fileLabel: string, source: string): Violation[] {
  const sourceVars = collectSourceVars(source);
  if (sourceVars.length === 0) return [];
  const units = toLogicalUnits(source.split("\n"));
  const violations: Violation[] = [];
  for (const sourceVar of sourceVars) {
    classifyUsages(units, sourceVar);
    if (sourceVar.negativeLines.length > 0 && sourceVar.positiveLines.length === 0) {
      violations.push({
        file: fileLabel,
        varName: sourceVar.name,
        negativeLines: sourceVar.negativeLines,
      });
    }
  }
  return violations;
}

function findViolations(): Violation[] {
  const violations: Violation[] = [];
  for (const file of walkTestFiles(TESTS_ROOT).sort()) {
    const label = relative(REPO_ROOT, file).split(sep).join("/");
    violations.push(...findViolationsInSource(label, readFileSync(file, "utf8")));
  }
  return violations;
}

function describeViolations(violations: Violation[]): string {
  const details = violations
    .map(
      (v) =>
        `  ${v.file}\n` +
        `    variable "${v.varName}" is guarded only by negative assertions ` +
        `(line${v.negativeLines.length === 1 ? "" : "s"} ${v.negativeLines.join(", ")})\n` +
        `    fix: add one positive anchor, e.g. ` +
        `assert.match(${v.varName}, /export default function SomeComponent/);`
    )
    .join("\n\n");

  return (
    `${violations.length} source-bound test variable(s) carry ONLY negative guards:\n\n` +
    `${details}\n\n` +
    `A negative guard (assert.doesNotMatch / .includes(...) === false) passes against an ` +
    `empty string, so once the guarded code is extracted into another file the assertion ` +
    `keeps passing while protecting nothing. Add at least one positive assertion against ` +
    `the same variable — anchored on a stable top-level declaration of the file it reads — ` +
    `so the test fails loudly if the source moves.`
  );
}

test("test files scanning project source are not guarded by negative assertions alone", () => {
  const violations = findViolations();
  assert.deepEqual(violations, [], violations.length > 0 ? describeViolations(violations) : "");
});

test("the scanner actually finds the source-scanning tests it is meant to police", () => {
  // Guards the guard: if the walk or the assignment regex silently stops matching,
  // findViolations() would return [] and this gate would pass while doing nothing.
  const scanned = walkTestFiles(TESTS_ROOT).filter(
    (file) => collectSourceVars(readFileSync(file, "utf8")).length > 0
  );
  assert.ok(
    scanned.length >= 20,
    `expected the scanner to detect many source-reading test files, found ${scanned.length} — ` +
      `the walk or the assignment pattern has probably stopped matching`
  );
});

test("a negative guard split across lines is still detected as a negative guard", () => {
  // Regression guard for the line-based blind spot: a bare `source,` line matches no
  // negative pattern, so a per-line scan filed it as a positive anchor and the variable
  // looked anchored. Reformatting must not become a way past this gate.
  const snippet = [
    'const source = readFileSync("src/app/example/page.tsx", "utf8");',
    "",
    "test('multi-line negative guard', () => {",
    "  assert.doesNotMatch(",
    "    source,",
    "    /notify\\.error\\(\\s*data\\.error\\b/,",
    '    "must not surface the raw error"',
    "  );",
    "});",
  ].join("\n");

  assert.deepEqual(findViolationsInSource("synthetic.test.ts", snippet), [
    { file: "synthetic.test.ts", varName: "source", negativeLines: [4] },
  ]);
});

test("a positive anchor split across lines still counts as an anchor", () => {
  // The mirror case: folding must not turn a multi-line positive assertion into a
  // violation. Guards against over-reporting now that units span lines.
  const snippet = [
    'const source = readFileSync("src/app/example/page.tsx", "utf8");',
    "",
    "test('multi-line anchor plus negative guard', () => {",
    "  assert.match(",
    "    source,",
    "    /export default function ExamplePage\\(/",
    "  );",
    "  assert.doesNotMatch(source, /notify\\.error/);",
    "});",
  ].join("\n");

  assert.deepEqual(findViolationsInSource("synthetic.test.ts", snippet), []);
});
