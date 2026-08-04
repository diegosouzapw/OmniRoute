#!/usr/bin/env node
// Remove `changelog.d/` fragments whose bullet is ALREADY in CHANGELOG.md.
//
// WHY: the release reaches `main` as a single squash commit, so `main` still carries every
// fragment the reconciliation already folded in and deleted. The moment the release branch
// back-merges `main`, git faithfully restores all of them — 191 in the v3.8.49 run. Nothing
// is broken at that instant, which is the problem: the next aggregation folds them in a
// SECOND time and the section grows duplicate bullets that then have to be hand-unpicked.
//
// The rule is deliberately the simple one: a fragment is stale iff its content is already
// represented in CHANGELOG.md. Not "iff it belongs to an older version" — that needs the
// script to reason about which section owns it and gets the in-flight cycle wrong. Already
// present means redundant, wherever it is.
//
// Identity comes from the FILENAME (`<PR-number>-<slug>.md`), which is what that convention
// exists for, and NOT from the `#N` refs inside the bullet. Matching on any body ref looked
// right and was wrong — caught by running this against the live repo, where
// `changelog.d/features/8980-deprecate-gemini-cli-provider.md` was flagged stale because its
// bullet cites issue **#7034** for context, and #7034 shipped in an earlier cycle. That would
// have deleted an unreleased fragment and dropped its credit. A bullet routinely cites issues
// it merely references; only the filename says which PR the fragment *is*.
//
// Fragments with no number in the filename fall back to normalized text, and anything matching
// neither is always kept. Keeping a duplicate is a visible nuisance someone notices; deleting
// an unreleased bullet silently loses a contributor's credit — so every ambiguous case
// resolves toward keeping.
//
// Usage:
//   node scripts/release/sweep-stale-fragments.mjs            # report only
//   node scripts/release/sweep-stale-fragments.mjs --apply    # delete the stale ones
// Exit: 0 when nothing stale (or after a successful --apply), 1 when stale fragments remain
// in report mode — so the back-merge step can gate on it.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const FRAGMENT_DIRS = ["features", "fixes", "maintenance"];

/** Every `#N` in a piece of text. */
export function refsIn(text) {
  return [...String(text ?? "").matchAll(/#(\d+)/g)].map((m) => Number(m[1]));
}

/**
 * The fragment's own PR number, taken from the `<PR-number>-<slug>.md` filename convention.
 * Returns null when the name carries no leading number — those fall back to text matching.
 */
export function prNumberOf(filename) {
  const m = /^(\d+)-/.exec(String(filename ?? ""));
  return m ? Number(m[1]) : null;
}

/**
 * Collapse a bullet to a comparable shape: drop markdown emphasis, links, refs and
 * punctuation, fold whitespace, lowercase. Two bullets that say the same thing in slightly
 * different markdown must collide here, or the text fallback is useless.
 */
export function normalizeBullet(text) {
  return String(text ?? "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // [label](url) → label
    .replace(/#\d+/g, "") // refs are handled separately
    .replace(/[*_`~]/g, "")
    .replace(/^[-*+]\s*/gm, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * Split fragments into `stale` (already in the changelog) and `keep`.
 *
 * Pure — takes the changelog text and the fragment list, touches no disk. That is what makes
 * the dangerous direction (deleting a bullet that never shipped) testable.
 */
export function classifyFragments({ fragments = [], changelog = "" }) {
  const changelogRefs = new Set(refsIn(changelog));
  // Index the changelog's own bullets by normalized text for the ref-less fallback.
  const changelogBullets = new Set(
    changelog
      .split("\n")
      .filter((l) => /^\s*[-*+]\s/.test(l))
      .map((l) => normalizeBullet(l))
      .filter((s) => s.length >= 12) // too-short lines collide by accident
  );

  const stale = [];
  const keep = [];

  for (const frag of fragments) {
    // The filename carries the fragment's OWN PR number. Body refs are context, not identity.
    const own = prNumberOf(frag.name);
    if (own !== null) {
      if (changelogRefs.has(own)) {
        stale.push({ ...frag, reason: `#${own} already in CHANGELOG.md`, matchedBy: "pr-number" });
      } else {
        keep.push(frag);
      }
      continue;
    }
    const norm = normalizeBullet(frag.body);
    if (norm.length >= 12 && changelogBullets.has(norm)) {
      stale.push({ ...frag, reason: "identical bullet text already in CHANGELOG.md", matchedBy: "text" });
    } else {
      keep.push(frag);
    }
  }

  return { stale, keep };
}

export function readFragments(root) {
  const out = [];
  for (const sub of FRAGMENT_DIRS) {
    const dir = path.join(root, "changelog.d", sub);
    if (!fs.existsSync(dir)) continue;
    for (const name of fs.readdirSync(dir)) {
      if (!name.endsWith(".md") || name === "README.md") continue;
      const rel = path.join("changelog.d", sub, name);
      out.push({ name, rel, body: fs.readFileSync(path.join(root, rel), "utf8") });
    }
  }
  return out;
}

function main(argv) {
  const apply = argv.includes("--apply");
  const changelog = fs.readFileSync(path.join(ROOT, "CHANGELOG.md"), "utf8");
  const fragments = readFragments(ROOT);
  const { stale, keep } = classifyFragments({ fragments, changelog });

  process.stdout.write(
    `[sweep-stale-fragments] ${fragments.length} fragment(s): ${stale.length} already in ` +
      `CHANGELOG.md, ${keep.length} pending.\n`
  );

  if (stale.length === 0) {
    process.stdout.write("[sweep-stale-fragments] nothing to sweep.\n");
    return 0;
  }

  const byRef = stale.filter((s) => s.matchedBy === "ref").length;
  const byText = stale.length - byRef;
  process.stdout.write(`  matched by ref: ${byRef} · by text: ${byText}\n`);
  for (const s of stale) process.stdout.write(`  ${apply ? "removed" : "stale"}: ${s.rel} — ${s.reason}\n`);

  if (!apply) {
    process.stdout.write(
      "\n[sweep-stale-fragments] report only. Re-run with --apply to delete them.\n" +
        "These are almost certainly fragments that a back-merge from main restored after the\n" +
        "reconciliation had already folded them in — leaving them duplicates the bullets on the\n" +
        "next aggregation.\n"
    );
    return 1;
  }

  for (const s of stale) fs.rmSync(path.join(ROOT, s.rel));
  process.stdout.write(`[sweep-stale-fragments] removed ${stale.length} stale fragment(s).\n`);
  return 0;
}

if (process.argv[1] && fs.realpathSync(process.argv[1]) === fs.realpathSync(fileURLToPath(import.meta.url))) {
  process.exit(main(process.argv.slice(2)));
}
