import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, writeFileSync, rmSync, mkdirSync, copyFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { load } from "js-yaml";
import {
  parseVitestExcludes,
  validateQuarantine,
} from "../../scripts/quality/quarantine-contract.mjs";
import { COLLECTORS } from "../../scripts/check/check-test-discovery.mjs";

const entry = {
  file: "tests/unit/ui/example.test.tsx",
  issue: "#13204",
  owner: "diegosouzapw",
  measured: "2026-09-10",
  expires: "2026-09-24",
  status: "1 failed",
};
const now = new Date("2026-09-22T01:00:00Z");

test("discovery --update cannot silently freeze newly orphaned tests", () => {
  const dir = mkdtempSync(join(tmpdir(), "qg-discovery-baseline-"));
  const baseline = join(dir, "baseline.json");
  const original = JSON.stringify({ orphans: [] });
  writeFileSync(baseline, original);
  try {
    const root = new URL("../../", import.meta.url);
    const fixtureSources = new Set([
      ...COLLECTORS.flatMap((collector) => collector.sources),
      "config/quality/vitest-exclusions.json",
      "vitest.quarantine.config.ts",
      ".github/workflows/test-quarantine.yml",
    ]);
    for (const source of fixtureSources) {
      mkdirSync(dirname(join(dir, source)), { recursive: true });
      copyFileSync(new URL(source, root), join(dir, source));
    }
    writeFileSync(
      join(dir, "config/quality/vitest-exclusions.json"),
      JSON.stringify({ excluded: [] })
    );
    mkdirSync(join(dir, "tests/unassigned"), { recursive: true });
    writeFileSync(
      join(dir, "tests/unassigned/orphan.test.ts"),
      "// deliberately uncollected fixture\n"
    );
    const result = spawnSync(
      process.execPath,
      [
        fileURLToPath(new URL("scripts/check/check-test-discovery.mjs", root)),
        "--update",
        "--baseline",
        baseline,
      ],
      {
        cwd: dir,
        encoding: "utf8",
        timeout: 60_000,
      }
    );
    assert.equal(result.status, 1, result.stdout + result.stderr);
    assert.match(result.stderr, /new orphan|NOVO|novo/i);
    assert.equal(readFileSync(baseline, "utf8"), original);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("zero quarantined files is valid debt retirement, not a requirement to retain failures", () => {
  assert.deepEqual(validateQuarantine([], { now }), []);
});

test("discovery parses actual inline/multiline Vitest excludes and rejects dynamic ones", () => {
  assert.deepEqual(
    parseVitestExcludes('export default { test: { exclude: ["a", /* comment */ "b"] } }'),
    ["a", "b"]
  );
  assert.throws(
    () => parseVitestExcludes("export default { test: { exclude: [...hidden] } }"),
    /literal/
  );
  assert.throws(
    () => parseVitestExcludes("export default { test: { exclude: external } }"),
    /literal/
  );
  assert.throws(() => parseVitestExcludes("export default { test: {} }"), /exclude/);
});

test("quarantine requires bounded ownership, measured evidence, and an open issue when checked", () => {
  assert.deepEqual(validateQuarantine([entry], { now, issueStates: { "#13204": "open" } }), []);
  for (const field of ["owner", "issue", "measured", "expires", "status"]) {
    const invalid = { ...entry };
    delete invalid[field];
    assert.ok(validateQuarantine([invalid], { now }).length, field);
  }
  assert.ok(validateQuarantine([entry], { now, issueStates: {} }).length);
  assert.ok(validateQuarantine([entry], { now, issueStates: { "#13204": "closed" } }).length);
});

test("expired, future, duplicate, escaped and broad exclusions fail closed", () => {
  for (const patch of [
    { expires: "2026-09-21" },
    { expires: "2026-12-01" },
    { measured: "2026-09-23" },
    { measured: "2026-02-31" },
    { file: "../outside.test.ts" },
    { file: "tests/**" },
  ])
    assert.ok(validateQuarantine([{ ...entry, ...patch }], { now }).length, JSON.stringify(patch));
  assert.ok(validateQuarantine([entry, entry], { now }).length);
});

test("quarantine workflow executes the inventory and keeps failure/artifacts visible", () => {
  const root = new URL("../../", import.meta.url);
  const workflow = load(
    readFileSync(new URL(".github/workflows/test-quarantine.yml", root), "utf8")
  );
  assert.ok(workflow.on.schedule.length);
  assert.ok(Object.hasOwn(workflow.on, "workflow_dispatch"));
  const job = workflow.jobs.quarantine;
  assert.equal(job["runs-on"], "ubuntu-latest");
  assert.equal(job["continue-on-error"], undefined);
  assert.ok(job.steps.some((s) => s.run?.includes("--issue-states")));
  const run = job.steps.find((s) => s.run?.includes("vitest.quarantine.config.ts"));
  assert.ok(run);
  assert.equal(run["continue-on-error"], undefined);
  assert.ok(!run.run.includes("|| true"));
  assert.ok(
    job.steps.some((s) => s.uses?.startsWith("actions/upload-artifact@") && s.if === "always()")
  );
  const config = readFileSync(new URL("vitest.quarantine.config.ts", root), "utf8");
  assert.match(config, /inventory\.excluded\.map/);
  assert.match(config, /exclude:\s*\[\]/);
  assert.match(config, /passWithNoTests:\s*false/);
});
