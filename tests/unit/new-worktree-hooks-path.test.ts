// Guards the hook check that closes scripts/dev/new-worktree.sh. Git runs hooks from an
// absolute core.hooksPath as-is and resolves a relative one against the worktree root, so
// the check tests that same path: an absolute core.hooksPath joined onto the worktree dir
// names a file that never exists, which would reject a worktree whose pre-commit is active.
import { after, test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(new URL("../../scripts/dev/new-worktree.sh", import.meta.url));
const BASE = "release/v0.0.1";

// Every inherited GIT_* variable is dropped so a hook-exported GIT_DIR or GIT_INDEX_FILE
// cannot point the fixture commands at this repository, and the global/system config is
// neutralised so a machine-wide core.hooksPath or signing setup cannot leak in.
const ENV: NodeJS.ProcessEnv = {
  ...Object.fromEntries(Object.entries(process.env).filter(([key]) => !key.startsWith("GIT_"))),
  GIT_CONFIG_GLOBAL: "/dev/null",
  GIT_CONFIG_SYSTEM: "/dev/null",
  GIT_AUTHOR_NAME: "Fixture",
  GIT_AUTHOR_EMAIL: "fixture@example.com",
  GIT_COMMITTER_NAME: "Fixture",
  GIT_COMMITTER_EMAIL: "fixture@example.com",
};

const sandboxes: string[] = [];
after(() => {
  for (const dir of sandboxes) rmSync(dir, { recursive: true, force: true });
});

function git(cwd: string, ...args: string[]) {
  const r = spawnSync("git", args, { cwd, env: ENV, encoding: "utf8" });
  assert.equal(r.status, 0, `git ${args.join(" ")}: ${r.stderr}`);
}

function writeExecutableHook(dir: string) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "pre-commit"), "#!/bin/sh\nexit 0\n");
  chmodSync(join(dir, "pre-commit"), 0o755);
}

/**
 * Builds the layout the script copies from, then runs it: a main checkout whose `origin`
 * carries BASE with a tracked `.husky/`, plus husky's untracked shim dir `.husky/_` holding
 * an executable pre-commit. `hooksPath` receives the main checkout and returns the
 * core.hooksPath value to configure, or undefined to leave it unset.
 */
function runWithHooksPath(hooksPath: (main: string) => string | undefined) {
  const root = realpathSync(mkdtempSync(join(tmpdir(), "new-worktree-")));
  sandboxes.push(root);
  const main = join(root, "main");
  git(root, "init", "--quiet", "--bare", "origin.git");
  git(root, "init", "--quiet", "main");
  mkdirSync(join(main, ".husky"));
  writeFileSync(join(main, ".husky", "pre-commit"), "exit 0\n");
  git(main, "add", ".husky");
  git(main, "commit", "--quiet", "-m", "base");
  git(main, "remote", "add", "origin", join(root, "origin.git"));
  git(main, "push", "--quiet", "origin", `HEAD:refs/heads/${BASE}`);
  writeExecutableHook(join(main, ".husky", "_"));
  const value = hooksPath(main);
  if (value !== undefined) git(main, "config", "core.hooksPath", value);
  return spawnSync("sh", [SCRIPT_PATH, "fix/probe", BASE], {
    cwd: main,
    env: ENV,
    encoding: "utf8",
  });
}

test("accepts an absolute core.hooksPath that holds an executable pre-commit", () => {
  const r = runWithHooksPath((main) => join(main, ".husky", "_"));
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /hooks: ativos/);
});

test("rejects an absolute core.hooksPath with no pre-commit", () => {
  const r = runWithHooksPath((main) => join(main, "no-hooks"));
  assert.equal(r.status, 1);
  assert.match(r.stderr, /pre-commit NÃO está ativo/);
});

test("resolves husky's relative .husky/_ against the new worktree", () => {
  const r = runWithHooksPath(() => ".husky/_");
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /hooks: ativos/);
});

test("rejects a relative core.hooksPath that exists only in the main checkout", () => {
  // `local-hooks/` is never copied into the new worktree, so resolving the relative path
  // against the main checkout would report a hook git never runs there.
  const r = runWithHooksPath((main) => {
    writeExecutableHook(join(main, "local-hooks"));
    return "local-hooks";
  });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /pre-commit NÃO está ativo/);
});

test("checks the common git dir's hooks/ when core.hooksPath is unset", () => {
  // Git then runs hooks from <git-common-dir>/hooks; inside a worktree `.git` is only a
  // pointer file, so `<worktree>/.git/hooks` never exists.
  const r = runWithHooksPath((main) => {
    writeExecutableHook(join(main, ".git", "hooks"));
    return undefined;
  });
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /hooks: ativos/);
});
