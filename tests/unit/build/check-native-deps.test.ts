// tests/unit/build/check-native-deps.test.ts
// Tests for check-native-deps.mjs — the preflight gate that catches an
// externalised native dependency npm silently dropped, before the Next.js build
// spends four minutes discovering the same thing as "Module not found".
//
// Strategy: the three exported functions are pure. `findMissingExternals` takes an
// injectable resolver, so nothing here touches node_modules or the filesystem.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
// @ts-expect-error — .mjs helper has no type declarations; runtime shape is known.
import {
  extractServerExternalPackages,
  findMissingExternals,
  formatMissingReport,
} from "../../../scripts/check/check-native-deps.mjs";

// ---------------------------------------------------------------------------
// extractServerExternalPackages
// ---------------------------------------------------------------------------

test("extractServerExternalPackages: pulls the string literals in declaration order", () => {
  const source = `
    const config = {
      serverExternalPackages: [
        "pino",
        "better-sqlite3",
        "sql.js",
      ],
    };
  `;
  assert.deepEqual(extractServerExternalPackages(source), [
    "pino",
    "better-sqlite3",
    "sql.js",
  ]);
});

test("extractServerExternalPackages: ignores comment lines between entries", () => {
  const source = `
    serverExternalPackages: [
      "pino",
      // sqlite-vec ships a native vec0.so loaded at runtime via createRequire().
      // Externalizing it keeps the require at runtime. See issue #3066.
      "sqlite-vec",
    ],
  `;
  assert.deepEqual(extractServerExternalPackages(source), ["pino", "sqlite-vec"]);
});

test("extractServerExternalPackages: returns [] when the key is absent", () => {
  assert.deepEqual(extractServerExternalPackages("export default { distDir: '.build' };"), []);
});

test("extractServerExternalPackages: returns [] for an unterminated array", () => {
  assert.deepEqual(extractServerExternalPackages('serverExternalPackages: ["pino",'), []);
});

test("extractServerExternalPackages: skips prose mentions and finds the real declaration", () => {
  // Regression: next.config.mjs discusses serverExternalPackages in a comment well
  // above the actual key. A bare indexOf matched the comment and then grabbed the
  // next array literal in the file, which belongs to a different option.
  const source = `
    turbopack: {
      // the premise that serverExternalPackages still won at runtime does not hold
      ignoreIssue: ["some-glob", "another-glob"],
    },
    serverExternalPackages: [
      "better-sqlite3",
    ],
  `;
  assert.deepEqual(extractServerExternalPackages(source), ["better-sqlite3"]);
});

test("extractServerExternalPackages: handles single quotes and a trailing comma", () => {
  const source = "serverExternalPackages: ['keytar', 'wreq-js',]";
  assert.deepEqual(extractServerExternalPackages(source), ["keytar", "wreq-js"]);
});

test("extractServerExternalPackages: a quoted word in a trailing comment is not a package", () => {
  const source = `
    serverExternalPackages: [
      "ws", // bundling breaks its "bufferutil" native addon
      "bufferutil",
    ],
  `;
  assert.deepEqual(extractServerExternalPackages(source), ["ws", "bufferutil"]);
});

test("extractServerExternalPackages: the real next.config.mjs lists better-sqlite3", () => {
  const source = fs.readFileSync(new URL("../../../next.config.mjs", import.meta.url), "utf8");
  const externals = extractServerExternalPackages(source);
  assert.ok(externals.length > 0, "should find serverExternalPackages in the real config");
  assert.ok(
    externals.includes("better-sqlite3"),
    "better-sqlite3 must be externalised — this gate exists because it is"
  );
});

// ---------------------------------------------------------------------------
// findMissingExternals
// ---------------------------------------------------------------------------

const resolveNone = () => false;
const resolveAll = () => true;

test("findMissingExternals: reports an optional external that does not resolve", () => {
  const missing = findMissingExternals({
    externals: ["pino", "better-sqlite3"],
    optionalDeps: ["better-sqlite3"],
    resolver: resolveNone,
  });
  assert.deepEqual(missing, ["better-sqlite3"]);
});

test("findMissingExternals: ignores externals that are NOT optional dependencies", () => {
  // A missing required dependency means `npm install` never ran — already loud.
  const missing = findMissingExternals({
    externals: ["pino", "zod"],
    optionalDeps: [],
    resolver: resolveNone,
  });
  assert.deepEqual(missing, []);
});

test("findMissingExternals: reports nothing when everything resolves", () => {
  const missing = findMissingExternals({
    externals: ["better-sqlite3", "keytar"],
    optionalDeps: ["better-sqlite3", "keytar"],
    resolver: resolveAll,
  });
  assert.deepEqual(missing, []);
});

test("findMissingExternals: preserves declaration order across several misses", () => {
  const missing = findMissingExternals({
    externals: ["better-sqlite3", "pino", "sqlite-vec", "keytar"],
    optionalDeps: ["keytar", "sqlite-vec", "better-sqlite3"],
    resolver: resolveNone,
  });
  assert.deepEqual(missing, ["better-sqlite3", "sqlite-vec", "keytar"]);
});

test("findMissingExternals: an optional dep that is not externalised is not our problem", () => {
  const missing = findMissingExternals({
    externals: ["pino"],
    optionalDeps: ["js-tiktoken"],
    resolver: resolveNone,
  });
  assert.deepEqual(missing, []);
});

// ---------------------------------------------------------------------------
// formatMissingReport
// ---------------------------------------------------------------------------

test("formatMissingReport: empty input produces an empty string", () => {
  assert.equal(formatMissingReport([]), "");
});

test("formatMissingReport: names every missing package", () => {
  const report = formatMissingReport(["better-sqlite3", "sqlite-vec"]);
  assert.match(report, /better-sqlite3/);
  assert.match(report, /sqlite-vec/);
});

test("formatMissingReport: offers a runnable install command", () => {
  const report = formatMissingReport(["better-sqlite3"]);
  assert.match(report, /npm install better-sqlite3 --no-save --foreground-scripts/);
});

test("formatMissingReport: explains the npm 11 optional-dependency cause", () => {
  const report = formatMissingReport(["better-sqlite3"]);
  assert.match(report, /optional/i);
  assert.match(report, /exits 0/);
});

test("formatMissingReport: points at the troubleshooting guide", () => {
  const report = formatMissingReport(["better-sqlite3"]);
  assert.match(report, /docs\/guides\/TROUBLESHOOTING\.md/);
});
