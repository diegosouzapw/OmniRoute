/**
 * Guard for the back-merge fragment sweep.
 *
 * The release reaches `main` as one squash commit, so `main` still holds every `changelog.d/`
 * fragment the reconciliation folded in and deleted. When the release branch back-merges
 * `main`, git restores all of them — 191 in the v3.8.49 run. Nothing looks broken at that
 * moment, which is exactly why it bites: the NEXT aggregation folds them in a second time and
 * the section grows duplicates that have to be hand-unpicked.
 *
 * The asymmetry these tests pin matters more than the happy path. Keeping a duplicate is a
 * visible nuisance someone will notice. Deleting a fragment that never shipped silently drops
 * a contributor's credit. So every ambiguous case must resolve to KEEP.
 */
import test from "node:test";
import assert from "node:assert/strict";

// @ts-expect-error — plain .mjs release script, no type declarations by design
import {
  classifyFragments,
  normalizeBullet,
  refsIn,
} from "../../scripts/release/sweep-stale-fragments.mjs";

const CHANGELOG = `# Changelog

## [Unreleased]

## [3.8.49] - 2026-07-30

### 🐛 Bug Fixes

- **fix(sse):** stop the retry loop double-counting attempts ([#8100](https://github.com/x/y/pull/8100)) — thanks @someone
- **fix(db):** migration 109 is idempotent again ([#8101](https://github.com/x/y/pull/8101))

### 📝 Maintenance

- **chore(ci):** pin the workflow action digests, no issue number on this one
`;

test("a fragment already folded into the changelog is stale", () => {
  const { stale, keep } = classifyFragments({
    changelog: CHANGELOG,
    fragments: [{ name: "8100-retry.md", rel: "changelog.d/fixes/8100-retry.md", body: "- **fix(sse):** stop the retry loop double-counting attempts ([#8100](https://x/y/pull/8100))" }],
  });
  assert.equal(stale.length, 1);
  assert.equal(keep.length, 0);
  assert.equal(stale[0].matchedBy, "pr-number");
  assert.match(stale[0].reason, /#8100/);
});

test("a fragment for THIS cycle, not yet in the changelog, is kept", () => {
  // The whole point: the sweep must not eat the fragments the current cycle is accumulating.
  const { stale, keep } = classifyFragments({
    changelog: CHANGELOG,
    fragments: [{ name: "8966-iflow.md", rel: "changelog.d/maintenance/8966-iflow.md", body: "- **chore(sse):** dropped the leftover iflow entry ([#8966](https://x/y/pull/8966))" }],
  });
  assert.equal(stale.length, 0);
  assert.equal(keep.length, 1);
});

test("identity is the FILENAME's PR number, never a ref cited in the bullet", () => {
  // The regression that caught this: the real fragment
  // `changelog.d/features/8980-deprecate-gemini-cli-provider.md` cites issue #7034 for
  // context, and #7034 shipped in an earlier cycle. Matching on any body ref flagged it stale
  // and would have deleted an unreleased bullet along with its credit.
  const { stale, keep } = classifyFragments({
    changelog: CHANGELOG + "\n- an older bullet about ([#7034](url))\n",
    fragments: [
      {
        name: "8980-deprecate-gemini-cli-provider.md",
        rel: "changelog.d/features/8980-deprecate-gemini-cli-provider.md",
        body: "- **feat(sse):** deprecated the provider. The client identity (issue #7034) is untouched ([#8980](url))",
      },
    ],
  });
  assert.equal(stale.length, 0, "#7034 is context, not this fragment's identity");
  assert.equal(keep.length, 1);
});

test("the filename's PR number being present IS enough to sweep", () => {
  const { stale } = classifyFragments({
    changelog: CHANGELOG,
    fragments: [
      { name: "8101-migration.md", rel: "changelog.d/fixes/8101-migration.md", body: "- whatever the text says" },
    ],
  });
  assert.equal(stale.length, 1);
  assert.equal(stale[0].matchedBy, "pr-number");
  assert.match(stale[0].reason, /#8101/);
});

test("a ref-less fragment already present is caught by normalized text", () => {
  const { stale, keep } = classifyFragments({
    changelog: CHANGELOG,
    fragments: [
      {
        name: "pin.md",
        rel: "changelog.d/maintenance/pin.md",
        // Different markdown, same sentence — must still collide.
        body: "- chore(ci): pin the workflow action digests, no issue number on this one",
      },
    ],
  });
  assert.equal(keep.length, 0);
  assert.equal(stale.length, 1);
  assert.equal(stale[0].matchedBy, "text");
});

test("a ref-less fragment that is NOT present is kept", () => {
  const { stale, keep } = classifyFragments({
    changelog: CHANGELOG,
    fragments: [{ name: "new.md", rel: "changelog.d/features/new.md", body: "- feat(api): brand new endpoint nobody has shipped yet" }],
  });
  assert.equal(stale.length, 0);
  assert.equal(keep.length, 1);
});

test("a very short ref-less fragment is kept — accidental text collisions are not evidence", () => {
  const { stale, keep } = classifyFragments({
    changelog: CHANGELOG,
    fragments: [{ name: "tiny.md", rel: "changelog.d/fixes/tiny.md", body: "- typo" }],
  });
  assert.equal(stale.length, 0, "too short to identify — keeping is the safe direction");
  assert.equal(keep.length, 1);
});

test("an empty changelog sweeps nothing", () => {
  const frags = [
    { name: "a.md", rel: "changelog.d/fixes/a.md", body: "- fix: something ([#1](url))" },
    { name: "b.md", rel: "changelog.d/fixes/b.md", body: "- fix: другое" },
  ];
  const { stale, keep } = classifyFragments({ changelog: "", fragments: frags });
  assert.equal(stale.length, 0);
  assert.equal(keep.length, 2);
});

test("no fragments and no changelog does not throw", () => {
  const r = classifyFragments({});
  assert.deepEqual(r.stale, []);
  assert.deepEqual(r.keep, []);
});

test("normalizeBullet folds markdown, links and refs away", () => {
  const a = normalizeBullet("- **fix(sse):** stop the *retry* loop ([#8100](https://x/y/pull/8100))");
  const b = normalizeBullet("fix(sse): stop the retry loop #8100");
  assert.equal(a, b, "the same sentence in two markdown dialects must compare equal");
});

test("refsIn finds every number and nothing else", () => {
  assert.deepEqual(refsIn("closes #12, refs #345 and v3.8.49"), [12, 345]);
  assert.deepEqual(refsIn(""), []);
  assert.deepEqual(refsIn(undefined), []);
});
