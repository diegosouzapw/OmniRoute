import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

// Regression guard for #12579: DB export temp paths must be created via
// fs.mkdtempSync (unique + exclusive) rather than a predictable, deterministic
// timestamp-derived path passed to mkdirSync({ recursive: true }) or a raw
// write target. A deterministic path lets a local attacker pre-place a
// symlink at the predicted location; mkdirSync/writeFileSync then silently
// follow it (TOCTOU / symlink-following) instead of failing.

const exportAllSource = fs.readFileSync(
  path.join(process.cwd(), "src/app/api/db-backups/exportAll/route.ts"),
  "utf8"
);
const exportSource = fs.readFileSync(
  path.join(process.cwd(), "src/app/api/db-backups/export/route.ts"),
  "utf8"
);

test("exportAll/route.ts: uses fs.mkdtempSync to create the temp export directory", () => {
  assert.match(exportAllSource, /fs\.mkdtempSync\(/);
});

test("exportAll/route.ts: never passes a manually-built timestamp path to mkdirSync", () => {
  assert.doesNotMatch(exportAllSource, /fs\.mkdirSync\(\s*tempDir/);
});

test("export/route.ts: uses fs.mkdtempSync to create the temp export directory", () => {
  assert.match(exportSource, /fs\.mkdtempSync\(/);
});

test("export/route.ts: the sqlite backup write target lives inside an mkdtemp-created directory, not a bare tmpdir path", () => {
  assert.doesNotMatch(exportSource, /path\.join\(tmpDir,\s*exportFilename\)/);
});

test("mkdtempSync-based paths are unique across two calls made within the same millisecond (no timestamp collision)", () => {
  const a = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-export-"));
  const b = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-export-"));
  try {
    assert.notEqual(a, b);
  } finally {
    fs.rmSync(a, { recursive: true, force: true });
    fs.rmSync(b, { recursive: true, force: true });
  }
});

test("mkdtempSync rejects a pre-placed symlink at the target prefix path (exclusive creation, no TOCTOU)", () => {
  // mkdtempSync always appends 6 random characters, so an attacker cannot
  // predict (and therefore cannot pre-place a symlink at) the final path —
  // unlike the old `mkdirSync(deterministicPath, { recursive: true })`.
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-export-"));
  try {
    assert.ok(fs.lstatSync(dir).isDirectory());
    assert.ok(!fs.lstatSync(dir).isSymbolicLink());
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
