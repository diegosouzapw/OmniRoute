import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync, symlinkSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const script = fileURLToPath(new URL("../../scripts/check/check-workflows.mjs", import.meta.url));
const posix = { skip: process.platform === "win32" };

function run({
  missing = [],
  stdout = "[]",
  exit = 0,
  actionExit = 0,
  actionOutput = "",
  baseline = 233,
  workflows = true,
} = {}) {
  const root = mkdtempSync(join(tmpdir(), "workflow-audit-execution-"));
  try {
    const bin = join(root, "bin");
    mkdirSync(bin);
    symlinkSync("/bin/sh", join(bin, "sh"));
    for (const name of ["actionlint", "zizmor"]) {
      if (missing.includes(name)) continue;
      writeFileSync(
        join(bin, name),
        `#!${process.execPath}\n` +
          `if (process.argv.includes('--version')) { console.log('zizmor 1.25.2'); process.exit(0); }\n` +
          `const data = JSON.parse(process.env.QG_TEST_AUDIT_TOOL);\n` +
          `const name = ${JSON.stringify(name)};\n` +
          `process.stdout.write(name === 'zizmor' ? data.stdout : data.actionOutput);\n` +
          `process.exit(name === 'zizmor' ? data.exit : data.actionExit);\n`,
        { mode: 0o755 }
      );
    }
    mkdirSync(join(root, ".github/workflows"), { recursive: true });
    if (workflows)
      writeFileSync(
        join(root, ".github/workflows/fixture.yml"),
        "name: Fixture\non: push\njobs: {}\n"
      );
    if (baseline !== null) {
      mkdirSync(join(root, "config/quality"), { recursive: true });
      writeFileSync(
        join(root, "config/quality/quality-baseline.json"),
        JSON.stringify({ metrics: { zizmorFindings: { value: baseline } } })
      );
    }
    return spawnSync(process.execPath, [script, "--ratchet", "--quiet"], {
      cwd: root,
      env: {
        ...process.env,
        PATH: bin,
        QG_TEST_AUDIT_TOOL: JSON.stringify({ stdout, exit, actionExit, actionOutput }),
      },
      encoding: "utf8",
      timeout: 15_000,
    });
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

for (const missing of [["zizmor"], ["actionlint"], ["zizmor", "actionlint"]]) {
  test(`missing ${missing.join(" and ")} cannot establish workflow admission`, posix, () => {
    const result = run({ missing });
    assert.equal(result.error, undefined);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /workflowAuditState=INCOMPLETE/);
    assert.doesNotMatch(result.stdout, /(?:^|\n)zizmorFindings=0/);
  });
}

for (const stdout of ["", "not JSON", '{"errors":[]}', "null", "[{}]", "[null]"]) {
  test(
    `invalid scanner payload ${JSON.stringify(stdout)} cannot become a measured zero`,
    posix,
    () => {
      const result = run({ stdout });
      assert.equal(result.error, undefined);
      assert.notEqual(result.status, 0);
      assert.match(result.stdout, /workflowAuditState=INCOMPLETE/);
    }
  );
}

test("tool execution failure is not a finding count even with parseable stdout", posix, () => {
  for (const options of [
    { exit: 2 },
    { actionExit: 2 },
    { actionExit: 1 },
    { actionOutput: "not a lint record" },
  ]) {
    const result = run(options);
    assert.equal(result.error, undefined);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /workflowAuditState=INCOMPLETE/);
  }
});

test("missing baseline and empty workflow discovery cannot pass a ratchet", posix, () => {
  for (const options of [
    { baseline: null },
    { baseline: -1 },
    { baseline: 0.5 },
    { workflows: false },
  ]) {
    const result = run(options);
    assert.equal(result.error, undefined);
    assert.notEqual(result.status, 0);
    assert.match(result.stdout, /workflowAuditState=INCOMPLETE/);
  }
});

test("valid zero findings and existing frozen debt preserve the ratchet policy", posix, () => {
  for (const stdout of ["[]", '[{"ident":"unpinned-uses"}]']) {
    const result = run({ stdout });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, /workflowAuditState=MEASURED/);
  }
  assert.equal(run({ stdout: '[{"ident":"unpinned-uses"}]', baseline: 0 }).status, 1);
});

test("actionlint findings remain measured advisory debt in zizmor-only ratchet mode", posix, () => {
  const result = run({
    actionExit: 1,
    actionOutput: "fixture.yml:2:1: bad trigger [syntax-check]\n",
  });
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /actionlintFindings=1/);
  assert.match(result.stdout, /workflowAuditState=MEASURED/);
});
