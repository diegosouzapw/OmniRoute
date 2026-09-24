import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  readPrivateConfigFile,
  writePrivateConfigFile,
} from "../../../src/lib/cli-helper/privateConfigFile.ts";

function fixture(t: test.TestContext) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "relay-private-config-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}

test("private writes replace permissive files without retaining the old inode", (t) => {
  const dir = fixture(t);
  const target = path.join(dir, "config.json");
  fs.writeFileSync(target, "old", { mode: 0o644 });
  const oldInode = fs.statSync(target).ino;
  writePrivateConfigFile(target, "new");
  assert.equal(readPrivateConfigFile(target), "new");
  if (process.platform !== "win32") {
    assert.equal(fs.statSync(target).mode & 0o777, 0o600);
    assert.notEqual(fs.statSync(target).ino, oldInode);
  }
  assert.deepEqual(fs.readdirSync(dir), ["config.json"]);
});

test("private reads and writes reject final symlinks, including dangling ones", (t) => {
  if (process.platform === "win32") return t.skip("symlink creation requires OS privileges");
  const dir = fixture(t);
  const target = path.join(dir, "operator.json");
  const link = path.join(dir, "config.json");
  fs.writeFileSync(target, "operator-data", { mode: 0o644 });
  fs.symlinkSync(target, link);
  assert.throws(() => readPrivateConfigFile(link), /symbolic link/i);
  assert.throws(() => writePrivateConfigFile(link, "replacement"), /symbolic link/i);
  assert.equal(fs.readFileSync(target, "utf8"), "operator-data");
  assert.equal(fs.statSync(target).mode & 0o777, 0o644);
  fs.unlinkSync(target);
  assert.throws(() => writePrivateConfigFile(link, "replacement"), /symbolic link/i);
  assert.equal(fs.existsSync(target), false);
});

test("failed replacement cleans its private temporary file", (t) => {
  const dir = fixture(t);
  const target = path.join(dir, "config.json");
  fs.mkdirSync(target);
  assert.throws(() => writePrivateConfigFile(target, "new"));
  assert.deepEqual(fs.readdirSync(dir), ["config.json"]);
});
