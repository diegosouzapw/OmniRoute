import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const script = fileURLToPath(new URL("../../scripts/quality/coverage-scope.mjs", import.meta.url));

function git(root, ...args) {
  const result = spawnSync("git", args, { cwd: root, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
}

function repository(t, files = { "src/read.ts": "export const read = () => 42;\n" }) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "omni-coverage-scope-"));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  git(root, "init", "--quiet");
  git(root, "config", "user.name", "Quality Fixture");
  git(root, "config", "user.email", "quality@example.test");
  for (const [name, content] of Object.entries(files)) {
    const target = path.join(root, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
  }
  git(root, "add", ".");
  git(root, "commit", "--quiet", "-m", "test: seed coverage scope fixture");
  return { root, sha: git(root, "rev-parse", "HEAD") };
}

function run(root, ...args) {
  return spawnSync(process.execPath, [script, "--root", root, ...args], {
    encoding: "utf8",
    timeout: 15_000,
    maxBuffer: 2 * 1024 * 1024,
  });
}

function inventory(root, sha) {
  const result = run(root, "--sha", sha);
  assert.equal(result.error, undefined, result.error?.message);
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

test("the public CLI inventories tracked production sources even when never imported", (t) => {
  const source = "export const neverImported = () => 7;\n";
  const { root, sha } = repository(t, {
    "src/read.ts": "export const read = () => 42;\n",
    "src/neverImported.ts": source,
    "open-sse/service.mts": "export const service = 1;\n",
    "electron/main.cjs": "module.exports = 1;\n",
    "bin/cli.mjs": "export const cli = 1;\n",
  });
  const result = inventory(root, sha);
  assert.equal(result.schemaVersion, 1);
  assert.equal(result.sha, sha);
  assert.equal(result.tree, git(root, "rev-parse", `${sha}^{tree}`));
  assert.equal(result.releaseAcceptance, false);
  assert.deepEqual(
    result.files.map((file) => file.path),
    [
      "bin/cli.mjs",
      "electron/main.cjs",
      "open-sse/service.mts",
      "src/neverImported.ts",
      "src/read.ts",
    ]
  );
  const untouched = result.files.find((file) => file.path === "src/neverImported.ts");
  assert.equal(untouched.sourceHash, createHash("sha256").update(source).digest("hex"));
  assert.equal(untouched.bytes, Buffer.byteLength(source));
  assert.equal(untouched.blob, git(root, "rev-parse", `${sha}:src/neverImported.ts`));
  assert.match(result.scopeHash, /^[a-f0-9]{64}$/);
});

test("exclusions have explicit reasons, not zero-hit or import-count heuristics", (t) => {
  const { root, sha } = repository(t, {
    "src/read.ts": "export const read = () => 42;",
    "src/types.d.ts": "export interface Read { value: number; }",
    "src/a.test.ts": "export const test = 1;",
    "src/__tests__/legacy.ts": "export const legacy = 1;",
    "src/theme.css": "body {}",
    "tests/unit/not-production.ts": "export const outside = 1;",
  });
  const result = inventory(root, sha);
  assert.deepEqual(
    result.files.map((file) => file.path),
    ["src/read.ts"]
  );
  assert.deepEqual(
    result.excluded.map(({ path, reason }) => [path, reason]),
    [
      ["src/__tests__/legacy.ts", "test-directory"],
      ["src/a.test.ts", "test-file"],
      ["src/theme.css", "non-runtime-extension"],
      ["src/types.d.ts", "type-declaration"],
    ]
  );
});

test("inventory reads immutable Git blobs rather than dirty or untracked working files", (t) => {
  const { root, sha } = repository(t);
  const before = inventory(root, sha);
  fs.writeFileSync(path.join(root, "src/read.ts"), "export const changed = 999;\n");
  fs.writeFileSync(path.join(root, "src/untracked.ts"), "export const untracked = 1;\n");
  assert.deepEqual(inventory(root, sha), before);
  git(root, "add", "src");
  git(root, "commit", "--quiet", "-m", "test: change scope source");
  const after = inventory(root, git(root, "rev-parse", "HEAD"));
  assert.notEqual(after.scopeHash, before.scopeHash);
  assert.notEqual(
    after.files.find((file) => file.path === "src/read.ts").sourceHash,
    before.files[0].sourceHash
  );
});

test("verification recomputes identity and rejects omission, forgery, stale SHA and invalid JSON", (t) => {
  const { root, sha } = repository(t);
  const result = inventory(root, sha);
  const receipt = path.join(root, "scope.json");
  fs.writeFileSync(receipt, JSON.stringify(result));
  const valid = run(root, "--sha", sha, "--verify", receipt);
  assert.equal(valid.status, 0, valid.stderr);
  assert.equal(JSON.parse(valid.stdout).verified, true);
  for (const mutate of [
    (value) => {
      value.files = [];
    },
    (value) => {
      value.files[0].sourceHash = "f".repeat(64);
    },
    (value) => {
      value.files[0].bytes++;
    },
    (value) => {
      value.files.push(value.files[0]);
    },
    (value) => {
      value.sha = "f".repeat(40);
    },
    (value) => {
      value.tree = "f".repeat(40);
    },
    (value) => {
      value.scopeHash = "f".repeat(64);
    },
    (value) => {
      value.policy.roots = ["src"];
    },
    (value) => {
      value.releaseAcceptance = true;
    },
  ]) {
    const forged = structuredClone(result);
    mutate(forged);
    fs.writeFileSync(receipt, JSON.stringify(forged));
    const checked = run(root, "--sha", sha, "--verify", receipt);
    assert.equal(checked.status, 1, checked.stdout + checked.stderr);
    assert.match(checked.stderr, /scope.*mismatch/i);
  }
  fs.writeFileSync(receipt, "{invalid");
  assert.equal(run(root, "--sha", sha, "--verify", receipt).status, 1);
});

test("missing commits, symlink sources, empty scope and unknown scope flags fail closed", (t) => {
  const { root, sha } = repository(t);
  assert.equal(run(root, "--sha", "f".repeat(40)).status, 1);
  assert.equal(run(root, "--sha", "HEAD").status, 1);
  assert.equal(run(root, "--sha", sha, "--roots", "src").status, 1);
  fs.symlinkSync("/outside/source.ts", path.join(root, "src/link.ts"));
  git(root, "add", "src/link.ts");
  git(root, "commit", "--quiet", "-m", "test: add symlink source");
  const symlink = run(root, "--sha", git(root, "rev-parse", "HEAD"));
  assert.equal(symlink.status, 1);
  assert.match(symlink.stderr, /regular.*source/i);
  const empty = repository(t, { "README.md": "empty production scope" });
  const checked = run(empty.root, "--sha", empty.sha);
  assert.equal(checked.status, 1);
  assert.match(checked.stderr, /empty.*scope/i);
});
