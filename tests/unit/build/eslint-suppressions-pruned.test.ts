// tests/unit/build/eslint-suppressions-pruned.test.ts
// TDD regression coverage for G-05 (#15159): `npm run lint` exits 2 on every PR
// because config/quality/eslint-suppressions.json carries suppressions for
// violations that no longer occur.
//
// ESLint fails the whole run when the suppressions file has unused entries:
//
//   There are suppressions left that do not occur anymore. To resolve this,
//   re-run the command with `--prune-suppressions` …
//
// So the debt is not cosmetic: a stale allowlist entry blocks the queue. AGENTS.md
// anticipates exactly this — "stale allowlist entries (suppressing a violation
// that no longer exists) will be caught by the stale-enforcement added in
// Fase 6A.3".
//
// FILE SHAPE: this file is keyed by FILE first, then rule, then count:
//
//   { "src/file.ts": { "@typescript-eslint/no-unused-vars": { "count": 1 } } }
//
// Getting that backwards makes a "no stale entries" assertion pass vacuously —
// every lookup misses and the test reports green while the gate is red. The first
// draft of this suite had exactly that bug; `SHAPE-SANITY` below pins it.
//
// A full `eslint .` run is far too slow for the unit suite (the CI `lint` job is the
// real gate), so the cheap tests here only pin the *invariant*.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SUPPRESSIONS = join(ROOT, "config/quality/eslint-suppressions.json");

/** file → rule → { count } */
type SuppressionFile = Record<string, Record<string, Record<string, number>>>;

function readSuppressions(): SuppressionFile {
  return JSON.parse(readFileSync(SUPPRESSIONS, "utf8")) as SuppressionFile;
}

/**
 * The six entries that were stale at release/v3.8.52 @ dbe703a000. Every one is
 * `@typescript-eslint/no-unused-vars` — a platform-independent rule, so pruning
 * them on a Windows dev machine yields the same file CI produces on Linux.
 *
 * Each file was re-linted directly with an EMPTY suppressions file and
 * `no-unused-vars` forced to error: zero violations on all six.
 */
const KNOWN_STALE = [
  "open-sse/translator/request/openai-to-cursor.ts",
  "src/app/(dashboard)/dashboard/settings/components/SystemStorageTab.tsx",
  "src/app/api/v1/vscode/[token]/combos/route.ts",
  "src/app/api/v1/vscode/raw/[token]/combos/route.ts",
  "src/lib/oauth/providers/ghe-copilot.ts",
  "tests/unit/cursor-agent-session.test.ts",
];

test("SHAPE-SANITY: the suppressions file is keyed by FILE first, then rule", () => {
  // Guards the whole suite against the inverted-lookup bug described in the
  // header. If ESLint ever changes this format, this fails loudly instead of the
  // stale-entry assertions quietly passing on nothing.
  const parsed = readSuppressions();
  const firstFile = Object.keys(parsed)[0];
  const rules = Object.keys(parsed[firstFile] ?? {});

  assert.ok(
    firstFile.includes("/") || firstFile.includes("\\"),
    `expected a path, got ${firstFile}`
  );
  assert.ok(
    rules.some((r) => r.includes("/")),
    `expected rule names at the second level, got ${JSON.stringify(rules)}`
  );
});

test("G-05: the suppressions file exists and parses", () => {
  assert.ok(existsSync(SUPPRESSIONS), `expected suppressions at ${SUPPRESSIONS}`);
  assert.ok(Object.keys(readSuppressions()).length > 0, "the file must not be empty");
});

test("G-05: none of the six known-stale suppressions is still present", () => {
  const parsed = readSuppressions();

  const stillPresent = KNOWN_STALE.filter((file) =>
    Object.prototype.hasOwnProperty.call(parsed, file)
  );

  assert.deepEqual(
    stillPresent,
    [],
    `these files no longer produce the suppressed violation, so ESLint exits 2: ${stillPresent.join(", ")}`
  );
});

test("G-05: the suppressions file carries no empty file or rule buckets", () => {
  // An empty bucket ({}) survives a hand-edit but ESLint treats it as an unused
  // suppression, reintroducing the same exit-2 failure the prune just removed.
  const parsed = readSuppressions();
  const empties: string[] = [];

  for (const [file, byRule] of Object.entries(parsed)) {
    if (!byRule || Object.keys(byRule).length === 0) {
      empties.push(`${file} (no rules)`);
      continue;
    }
    for (const [rule, counts] of Object.entries(byRule)) {
      if (!counts || Object.keys(counts).length === 0) {
        empties.push(`${file} → ${rule} (no counts)`);
      }
    }
  }

  assert.deepEqual(empties, [], `empty buckets are unused suppressions: ${empties.join(", ")}`);
});

test("G-05: every suppressed file path uses forward slashes", () => {
  // ESLint matches suppression keys against POSIX-style relative paths. A
  // backslash key silently stops matching, which turns a suppressed warning back
  // into a hard failure — and from the gate's exit code it looks identical to
  // "unpruned". Cheap to assert, expensive to debug.
  const bad = Object.keys(readSuppressions()).filter((file) => file.includes("\\"));
  assert.deepEqual(bad, [], `suppression keys must be POSIX-relative: ${bad.join(", ")}`);
});
