import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { parseExclusions, findViolations } from "../../scripts/check/check-vitest-exclusions.mjs";

const ROOT = path.resolve(import.meta.dirname, "..", "..");

/** Every excluded file in the inventory is a real path — a stale entry excludes nothing. */
test("the checked-in inventory only lists files that exist", () => {
  const inv = JSON.parse(
    fs.readFileSync(path.join(ROOT, "config/quality/vitest-exclusions.json"), "utf8")
  );
  assert.ok(inv.excluded.length > 0, "inventory is not empty");
  for (const entry of inv.excluded) {
    assert.ok(fs.existsSync(path.join(ROOT, entry.file)), `${entry.file} exists`);
    assert.match(entry.issue, /^#\d+$/, `${entry.file} names a tracking issue`);
  }
});

test("the live config satisfies the gate", () => {
  const entries = parseExclusions(fs.readFileSync(path.join(ROOT, "vitest.config.ts"), "utf8"));
  const inv = JSON.parse(
    fs.readFileSync(path.join(ROOT, "config/quality/vitest-exclusions.json"), "utf8")
  );
  const v = findViolations(
    entries,
    (p) => fs.existsSync(path.join(ROOT, p)),
    inv.excluded.map((e: { file: string }) => e.file)
  );
  assert.deepEqual(v, { unreferenced: [], untracked: [], orphaned: [] });
});

test("parseExclusions keeps each entry's trailing comment", () => {
  const src = `  test: {\n    exclude: [\n      "node_modules/**",\n      "tests/a.test.ts", // #123 — reason\n    ]\n  }`;
  assert.deepEqual(parseExclusions(src), [
    { pattern: "node_modules/**", comment: "," },
    { pattern: "tests/a.test.ts", comment: ", // #123 — reason" },
  ]);
});

test("an exclusion with no issue reference fails the gate", () => {
  const entries = [{ pattern: "tests/a.test.ts", comment: ", // just because" }];
  const v = findViolations(entries, () => true, ["tests/a.test.ts"]);
  assert.deepEqual(v.unreferenced, ["tests/a.test.ts"]);
});

test("an exclusion absent from the inventory fails the gate", () => {
  const entries = [{ pattern: "tests/a.test.ts", comment: ", // #123" }];
  const v = findViolations(entries, () => true, []);
  assert.deepEqual(v.untracked, ["tests/a.test.ts"]);
});

test("an inventory entry that is no longer excluded fails the gate", () => {
  const v = findViolations([], () => true, ["tests/revived.test.ts"]);
  assert.deepEqual(v.orphaned, ["tests/revived.test.ts"]);
});

test("tooling exclusions and globs are exempt, and a stale path is ignored", () => {
  const entries = [
    { pattern: "node_modules/**", comment: "," },
    { pattern: "tests/unit/**/*.test.tsx", comment: "," },
    { pattern: "tests/deleted.test.ts", comment: "," },
  ];
  const v = findViolations(entries, (p) => p !== "tests/deleted.test.ts", []);
  assert.deepEqual(v, { unreferenced: [], untracked: [], orphaned: [] });
});
