import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  insertNextSection,
  extractSection,
  versionAfter,
} from "../../scripts/release/sync-next-cycle.mjs";

const SCRIPT_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../scripts/release/sync-next-cycle.mjs"
);

// Pure-function guards for the parallel-cycle sync-back (generate-release
// Phase 5 step 20): main's CHANGELOG must win VERBATIM and the next cycle's
// section must be re-inserted on top without eating any of main's bullets
// (anti-CHANGELOG-eat protocol, design doc
// _tasks/release-flow/2026-07-04_proposta-ciclo-paralelo-v2.md).

const MAIN = `# Changelog

## [Unreleased]

---

## [3.8.44] — 2026-07-04

### ✨ New Features

- **feat(a):** shipped feature one. (#1)
- **feat(b):** shipped feature two. (#2)

### 🙌 Contributors

| Contributor | PRs / Issues |
| --- | --- |
| [@x](https://github.com/x) | #1 |

---

## [3.8.43] — 2026-07-02

- **old:** bullet. (#0)
`;

const CYCLE_SECTION = `## [3.8.45] — TBD

### ✨ New Features

- **feat(new):** cycle bullet accumulated before the sync. (#9)`;

test("insertNextSection puts the cycle section before main's latest version, keeping main intact", () => {
  const out = insertNextSection(MAIN, CYCLE_SECTION, "3.8.45");
  const i45 = out.indexOf("## [3.8.45]");
  const i44 = out.indexOf("## [3.8.44]");
  const i43 = out.indexOf("## [3.8.43]");
  assert.ok(i45 !== -1 && i44 !== -1 && i43 !== -1, "all three sections present");
  assert.ok(i45 < i44 && i44 < i43, "ordering: 3.8.45 → 3.8.44 → 3.8.43");
  // main's content survives verbatim (no bullet eaten)
  assert.ok(out.includes("shipped feature one"), "main bullet 1 intact");
  assert.ok(out.includes("shipped feature two"), "main bullet 2 intact");
  assert.ok(out.includes("| [@x](https://github.com/x) | #1 |"), "contributors row intact");
  // the cycle's accumulated bullet survives
  assert.ok(out.includes("cycle bullet accumulated before the sync"), "cycle bullet intact");
});

test("insertNextSection synthesizes a TBD placeholder when the cycle has no section yet", () => {
  const out = insertNextSection(MAIN, null, "3.8.45");
  assert.ok(out.includes("## [3.8.45] — TBD"));
  assert.ok(out.indexOf("## [3.8.45]") < out.indexOf("## [3.8.44]"));
});

test("insertNextSection replaces a pre-existing copy of the next section instead of duplicating", () => {
  const withNext = insertNextSection(MAIN, CYCLE_SECTION, "3.8.45");
  const again = insertNextSection(withNext, CYCLE_SECTION, "3.8.45");
  const count = (again.match(/## \[3\.8\.45\]/g) || []).length;
  assert.equal(count, 1, "exactly one [3.8.45] heading after re-run (idempotent)");
});

test("extractSection returns header through the line before the next heading, trimming the separator", () => {
  const withNext = insertNextSection(MAIN, CYCLE_SECTION, "3.8.45");
  const section = extractSection(withNext, "3.8.45");
  assert.ok(section, "section found");
  assert.ok(section.startsWith("## [3.8.45]"));
  assert.ok(section.includes("cycle bullet accumulated"));
  assert.ok(!section.includes("## [3.8.44]"), "does not bleed into the next section");
  assert.ok(!section.trimEnd().endsWith("---"), "trailing separator trimmed");
});

test("extractSection returns null when the version has no section", () => {
  assert.equal(extractSection(MAIN, "9.9.9"), null);
});

test("versionAfter finds the heading right below a version's section", () => {
  assert.equal(versionAfter(MAIN, "3.8.44"), "3.8.43");
  assert.equal(versionAfter(MAIN, "3.8.43"), null, "last section has nothing below");
  assert.equal(versionAfter(MAIN, "9.9.9"), null, "missing version → null");
});

// Live-failure guards for the v3.8.45 run (2026-07-06) — source-shape assertions,
// same style as tests/unit/validate-release-green.test.ts.
test("git() passes a widened maxBuffer (ENOBUFS on `git show origin/main:CHANGELOG.md` — the CHANGELOG alone is >1 MiB)", () => {
  const src = readFileSync(SCRIPT_PATH, "utf8");
  const gitFn = src.slice(src.indexOf("function git("), src.indexOf("function main("));
  assert.ok(gitFn.includes("maxBuffer"), "git() helper must set maxBuffer above the 1 MiB default");
});

test("i18n resync also propagates the FINALIZED [prevVersion] section into the mirrors, not just [NEXT]", () => {
  const src = readFileSync(SCRIPT_PATH, "utf8");
  assert.ok(
    src.includes('"release:sync-changelog-i18n", "--", NEXT, prevVersion'),
    "syncs the new cycle section"
  );
  assert.ok(
    src.includes("versionAfter(mainChangelog, prevVersion)"),
    "computes the boundary below the shipped section"
  );
  assert.ok(
    src.includes('"release:sync-changelog-i18n", "--", prevVersion, belowPrev'),
    "syncs the shipped (finalized) section — without this all 42 mirrors keep it as TBD"
  );
});

// WS0.3 (v3.8.49 quality plan): the captain's sync-back push is the one write path
// with NO CI gate — the merged tree must pass release-green --quick BEFORE the push,
// or the whole PR queue inherits a red tip (G1). --skip-green-gate is the documented
// emergency escape hatch (pre-existing tip reds verified by hand).

test("greenGateArgs returns the quick release-green command by default", async () => {
  const { greenGateArgs } = await import("../../scripts/release/sync-next-cycle.mjs");
  assert.deepEqual(greenGateArgs(["node", "script", "3.8.49"]), [
    "scripts/quality/validate-release-green.mjs",
    "--quick",
  ]);
});

test("greenGateArgs returns null only with the explicit --skip-green-gate flag", async () => {
  const { greenGateArgs } = await import("../../scripts/release/sync-next-cycle.mjs");
  assert.equal(greenGateArgs(["node", "script", "3.8.49", "--skip-green-gate"]), null);
  assert.notEqual(greenGateArgs(["node", "script", "3.8.49", "--other"]), null);
});

test("sync-next-cycle gates the push on release-green (source guard)", () => {
  const src = readFileSync(SCRIPT_PATH, "utf8");
  const mainIdx = src.indexOf("function main()");
  const gateCallIdx = src.indexOf("greenGateArgs(process.argv)", mainIdx);
  const pushIdx = src.indexOf('git(["push", "origin", BRANCH]');
  assert.ok(gateCallIdx > mainIdx, "main() must call greenGateArgs(process.argv)");
  assert.ok(pushIdx > gateCallIdx, "the release-green gate must run BEFORE the push");
});
