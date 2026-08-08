/**
 * Guard for the reconciliation range base.
 *
 * `list-uncovered-commits.mjs` used `git describe --tags` to bound the range it scans. That
 * is wrong here in a way that hides work instead of announcing itself: releases reach `main`
 * by SQUASH, so no commit on a release branch is ever an ancestor of the tag, and
 * `vPREV..HEAD` re-lists the un-squashed history of every earlier cycle.
 *
 * Measured on release/v3.8.50 @ 7eca04fd12:
 *
 *     v3.8.49..HEAD ....... 1361 commits
 *     cycle open..HEAD .....   22 commits
 *
 * 62× the real range. The report drowns, which is how a previous reconciliation let ~200 PRs
 * through with no CHANGELOG bullet.
 *
 * The base is now resolved by CONTENT — the oldest commit that introduced this version string
 * into package.json — because the commit SUBJECT has already changed format once:
 *
 *     chore(release): bump v3.8.49 (development cycle version)     ← older
 *     chore(release): open v3.8.50 development cycle               ← current
 *
 * A message-matching resolver would have silently fallen back to the broken tag base the
 * first time someone reworded the bump. These tests pin the content strategy and, just as
 * importantly, pin that the fallback is LOUD.
 */
import test from "node:test";
import assert from "node:assert/strict";

// @ts-expect-error — plain .mjs release script, no type declarations by design
import { resolveCycleBase } from "../../scripts/release/list-uncovered-commits.mjs";

/** Build a fake `git` that answers by matching on the argv it receives. */
function fakeGit(answers: Record<string, string>) {
  const calls: string[][] = [];
  const run = (args: string[]) => {
    calls.push(args);
    if (args[0] === "log") return answers.log ?? "";
    if (args[0] === "describe") {
      if (answers.describe === undefined) throw new Error("no tags");
      return answers.describe;
    }
    return "";
  };
  return { run, calls };
}

test("resolves the base to the OLDEST commit carrying this version", () => {
  // `git log -S` lists newest-first. The cycle opened at the oldest hit — a later commit that
  // merely touched the same line (a merge, a revert) must not win.
  const { run } = fakeGit({ log: "ffffffffff\nbbbbbbbbbb\naaaaaaaaaa" });
  const r = resolveCycleBase("3.8.50", run);
  assert.equal(r.base, "aaaaaaaaaa");
  assert.equal(r.source, "cycle-open");
});

test("searches package.json for the version string, not the commit subject", () => {
  const { run, calls } = fakeGit({ log: "aaaaaaaaaa" });
  resolveCycleBase("3.8.50", run);
  const logCall = calls.find((c) => c[0] === "log");
  assert.ok(logCall, "must ask git log");
  assert.ok(logCall.includes("-S"), "must use -S (content search), not --grep");
  assert.ok(
    logCall.some((a) => a === '"version": "3.8.50"'),
    "must search for the exact package.json version line"
  );
  assert.ok(logCall.includes("package.json"), "must scope the search to package.json");
  assert.ok(
    !logCall.some((a) => a === "--grep"),
    "must NOT match on the commit subject — the wording changed once already"
  );
});

test("a single hit still resolves (the common case: cycle just opened)", () => {
  const { run } = fakeGit({ log: "ed2db6cb19" });
  assert.deepEqual(resolveCycleBase("3.8.50", run), {
    base: "ed2db6cb19",
    source: "cycle-open",
  });
});

test("falls back to the tag LOUDLY when the cycle-open commit cannot be found", () => {
  const { run } = fakeGit({ log: "", describe: "v3.8.49" });
  const written: string[] = [];
  const realWrite = process.stderr.write.bind(process.stderr);
  // @ts-expect-error — narrowing the write signature for the assertion is not worth it here
  process.stderr.write = (chunk: string) => {
    written.push(String(chunk));
    return true;
  };
  try {
    const r = resolveCycleBase("3.8.50", run);
    assert.equal(r.base, "v3.8.49");
    assert.equal(r.source, "tag-fallback");
  } finally {
    process.stderr.write = realWrite;
  }
  const msg = written.join("");
  assert.match(msg, /WARNING/, "a silent fallback would reproduce the original bug");
  assert.match(msg, /squash/i, "the warning must say WHY the tag range is untrustworthy");
  assert.match(msg, /noise/i, "and what the operator will see because of it");
});

test("survives a repo with neither the version commit nor any tag", () => {
  // Shallow clone: both lookups fail. It must degrade, not throw.
  const run = (args: string[]) => {
    if (args[0] === "log") throw new Error("shallow");
    throw new Error("no tags");
  };
  const realWrite = process.stderr.write.bind(process.stderr);
  // @ts-expect-error — see above
  process.stderr.write = () => true;
  try {
    const r = resolveCycleBase("3.8.50", run);
    assert.equal(r.source, "tag-fallback");
    assert.equal(r.base, "");
  } finally {
    process.stderr.write = realWrite;
  }
});
