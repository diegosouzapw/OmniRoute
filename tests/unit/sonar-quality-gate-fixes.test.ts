import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Regression guards for the Sonar quality-gate fixes (release PR #6569 findings).
// Two classes of real defect are locked down here:
//  1. jssecurity:S8707 — classify-pr-changes.mjs read any path handed on argv;
//     the CLI now confines the list file to the working directory.
//  2. typescript:S6544 — `isCloudEnabled()` is async; a bare `if (isCloudEnabled())`
//     is always truthy, so cloud sync ran even with cloud disabled.

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CLASSIFY = path.join(ROOT, "scripts", "quality", "classify-pr-changes.mjs");

test("classify-pr-changes rejects a list path that escapes the workspace", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "classify-guard-"));
  try {
    const outside = path.join(os.tmpdir(), "classify-outside.txt");
    fs.writeFileSync(outside, "src/lib/db/core.ts\n");
    const res = spawnSync(process.execPath, [CLASSIFY, outside], {
      cwd,
      encoding: "utf8",
    });
    assert.equal(res.status, 1, `expected exit 1, got ${res.status}\n${res.stdout}${res.stderr}`);
    assert.match(res.stderr, /escapes the workspace/);
    fs.rmSync(outside, { force: true });
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true });
  }
});

test("classify-pr-changes still accepts a workspace-relative list file", () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "classify-ok-"));
  try {
    fs.writeFileSync(path.join(cwd, "changed-files.txt"), "docs/README.md\n");
    const res = spawnSync(process.execPath, [CLASSIFY, "changed-files.txt"], {
      cwd,
      encoding: "utf8",
    });
    assert.equal(res.status, 0, `expected exit 0, got ${res.status}\n${res.stderr}`);
    assert.match(res.stdout, /docs=true/);
    assert.match(res.stdout, /code=false/);
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true });
  }
});

test("kiro auto-import awaits the async isCloudEnabled() gate (S6544)", () => {
  const src = fs.readFileSync(
    path.join(ROOT, "src", "app", "api", "oauth", "kiro", "auto-import", "route.ts"),
    "utf8"
  );
  // `isCloudEnabled()` returns a Promise — a bare truthiness check is always true,
  // which made syncToCloud() run even when cloud sync is disabled.
  assert.doesNotMatch(src, /if\s*\(\s*isCloudEnabled\(\)/, "bare `if (isCloudEnabled())` found");
  assert.match(src, /if\s*\(\s*await isCloudEnabled\(\)/);
});
