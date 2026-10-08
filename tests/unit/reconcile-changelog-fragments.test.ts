import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const mod = await import("../../scripts/release/reconcile-changelog.mjs");
const { readFragments, fragmentOrigins } = mod;

function git(cwd: string, ...args: string[]): string {
  return execFileSync("git", args, {
    cwd,
    encoding: "utf8",
    env: {
      ...process.env,
      GIT_AUTHOR_NAME: "t",
      GIT_AUTHOR_EMAIL: "t@example.com",
      GIT_COMMITTER_NAME: "t",
      GIT_COMMITTER_EMAIL: "t@example.com",
      GIT_CONFIG_GLOBAL: "/dev/null",
      GIT_CONFIG_NOSYSTEM: "1",
    },
  }).trim();
}

function commitFile(cwd: string, rel: string, text: string, subject: string) {
  fs.mkdirSync(path.dirname(path.join(cwd, rel)), { recursive: true });
  fs.writeFileSync(path.join(cwd, rel), text);
  git(cwd, "add", "-A");
  git(cwd, "commit", "-q", "-m", subject);
  return git(cwd, "rev-parse", "--short=9", "HEAD");
}

function makeRepo(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "reconcile-fragments-"));
  git(dir, "init", "-q", "-b", "main");
  git(dir, "commit", "-q", "--allow-empty", "-m", "root");
  return dir;
}

test("readFragments: origin = the commit that ADDED the fragment, text + prefix parsed, one git walk", () => {
  const dir = makeRepo();
  try {
    const h1 = commitFile(
      dir,
      "changelog.d/features/xquik.md",
      "- **feat(search):** Add Xquik X search\n  with typed results\n",
      "feat(search): add Xquik (#11370)"
    );
    const h2 = commitFile(
      dir,
      "changelog.d/fixes/11685-antigravity.md",
      "- Default Antigravity connections to auto-sync\n",
      "fix(antigravity): auto-sync (#11887)"
    );
    // a later commit that only EDITS the fragment must not become its origin
    commitFile(
      dir,
      "changelog.d/fixes/11685-antigravity.md",
      "- Default Antigravity connections to auto-sync (edited)\n",
      "chore: touch fragment (#12000)"
    );
    // README/.gitkeep are never fragments
    commitFile(dir, "changelog.d/maintenance/.gitkeep", "", "chore: keep");

    const frags = readFragments("HEAD", dir);
    assert.deepEqual(
      frags.map((f) => [f.path, f.section, f.originHash, f.originPr, f.prefixPr]),
      [
        ["changelog.d/features/xquik.md", "features", h1, 11370, null],
        ["changelog.d/fixes/11685-antigravity.md", "fixes", h2, 11887, 11685],
      ]
    );
    assert.equal(frags[0].text, "- **feat(search):** Add Xquik X search\n  with typed results");
    assert.equal(frags[1].text, "- Default Antigravity connections to auto-sync (edited)");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("fragmentOrigins: a fragment deleted and re-added keeps its ORIGINAL adding commit", () => {
  const dir = makeRepo();
  try {
    const first = commitFile(
      dir,
      "changelog.d/fixes/phantom.md",
      "- fix: original\n",
      "fix: original (#100)"
    );
    fs.rmSync(path.join(dir, "changelog.d/fixes/phantom.md"));
    git(dir, "add", "-A");
    git(dir, "commit", "-q", "-m", "chore(release): aggregate fragments");
    commitFile(dir, "changelog.d/fixes/phantom.md", "- fix: original\n", "merge: re-add (#200)");

    const origins = fragmentOrigins(dir);
    assert.ok(
      origins.get("changelog.d/fixes/phantom.md")?.hash.startsWith(first),
      "oldest add wins"
    );
    assert.match(origins.get("changelog.d/fixes/phantom.md")?.subject ?? "", /\(#100\)$/);
    assert.equal(readFragments("HEAD", dir)[0].originPr, 100);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("readFragments: empty tree / missing changelog.d is not an error", () => {
  const dir = makeRepo();
  try {
    assert.deepEqual(readFragments("HEAD", dir), []);
    assert.equal(fragmentOrigins(dir).size, 0);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
