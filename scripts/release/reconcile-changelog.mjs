#!/usr/bin/env node
// scripts/release/reconcile-changelog.mjs
//
// Reconcile the living `## [<version>]` CHANGELOG section against the FULL development cycle
// (Phase 0a.1–0a.3a of /generate-release), so that at the moment a release is cut:
//   • every cycle commit is represented by a bullet whose PRIMARY reference is that commit's PR,
//   • every bullet carries the merged PR link and `— thanks @author` (Hard Rule #16),
//   • fragments are folded in under the RIGHT version section (not the first heading that
//     matches — `[Unreleased]` still carries a `### ✨ New Features` heading),
//   • fragments that duplicate bullets already shipped in a previous version are dropped,
//   • the section opens with "📊 Release by the numbers" + "🏆 Top 25 contributors" (v3.8.50 format).
//
// It never touches bullets that already exist in the section (the changelog-integrity gate
// compares bullet lines against the base), never touches `[Unreleased]`, and never edits any
// other version section. Run `npm run release:contributors -- <version> --inject` afterwards to
// (re)build the `### 🙌 Contributors` table, then `release:sync-changelog-i18n`.
//
// Lessons baked in (v3.8.51 reconciliation, 2026-09-07 — PR #12971):
//   • prefix of a fragment filename is NOT a reliable PR number (issue numbers, closed/recreated
//     PRs, literal `#PR_NUMBER`); the commit that ADDED the fragment (`git log --diff-filter=A`)
//     is the definitive origin — unless that commit is a "carrier" PR that only back-filled
//     fragments for other people's PRs (`--carrier N`), then the prefix wins;
//   • a commit is covered only when its OWN PR is a primary ref (a `/pull/N` link or the last
//     `#N` on the bullet line) — an incidental mention ("Opper #11629 + 1min.ai #11631") must not
//     hide a PR's own bullet;
//   • gen-contributors only reads lines that start with "- ", so fragment bullets are collapsed
//     to a single line (pre-existing section bullets are left verbatim).
//
// Usage:
//   node scripts/release/reconcile-changelog.mjs [--version 3.8.51] [--base <ref>] [--head <ref>]
//        [--release-branch release/v3.8.51] [--credit 12255=backryun] [--carrier 11938]
//        [--drop-fragment changelog.d/fixes/x.md] [--fragment-pr changelog.d/fixes/y.md=11845]
//        [--prs <cached gh json>] [--dry-run] [--report <path.json>]
//
// Defaults: version = package.json; release branch = release/v<version>; head = HEAD;
// base = parent of the commit that opened the cycle (first commit carrying the version string,
// see resolveCycleBase in list-uncovered-commits.mjs) — pass `--base origin/release/v<prev>` to
// use the previous release tip explicitly. Exit 0 always (advisory: the captain reviews the diff).

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveCycleBase } from "./list-uncovered-commits.mjs";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const MAINTAINER = "diegosouzapw";
export const SECTION_HEADINGS = Object.freeze({
  features: "### ✨ New Features",
  fixes: "### 🐛 Bug Fixes",
  maintenance: "### 📝 Maintenance",
});
const TYPE_LABEL = {
  fix: "🐛 Fixes",
  feat: "✨ Features",
  docs: "📚 Docs",
  chore: "🧹 Chore",
  test: "🧪 Tests",
  refactor: "♻️ Refactor",
  perf: "⚡ Performance",
  security: "🔒 Security",
  ci: "⚙️ CI",
  deps: "📦 Dependencies",
  build: "🏗️ Build",
  revert: "⏪ Reverts",
  other: "🔀 Other",
};
const BOT_RE = /dependabot|\[bot\]|^app\//i;

// ───────────────────────────── pure helpers (unit-tested) ─────────────────────────────

/** `[#N](url)` → `#N`, `[@h](url)` → `@h` so refs/handles can be scanned uniformly. */
export const normalizeLinks = (s) =>
  s.replace(/\[#(\d+)\]\([^)]*\)/g, "#$1").replace(/\[@([A-Za-z0-9_-]+)\]\([^)]*\)/g, "@$1");
export const refsIn = (s) => [...s.matchAll(/#(\d+)/g)].map((m) => Number(m[1]));
export const prLink = (repo, n) => `[#${n}](https://github.com/${repo}/pull/${n})`;

/**
 * Primary refs of a bullet: every `/pull/N` link, the LAST `#N` on its first line (the
 * conventional trailing `(#N)` back-reference) and every explicit `(#N …)` group — a group
 * that OPENS with the ref, e.g. `(#11436)` or `(#11436 — thanks @x)`. An incidental mention
 * inside prose (`(Opper #11629 + 1min.ai #11631)`) does not count.
 */
export function primaryRefs(bullet) {
  const flat = normalizeLinks(bullet.replace(/\n\s+/g, " "));
  const out = new Set([...bullet.matchAll(/\/pull\/(\d+)\)/g)].map((m) => Number(m[1])));
  const refs = refsIn(flat);
  if (refs.length) out.add(refs[refs.length - 1]);
  for (const m of flat.matchAll(/\(#(\d+)(?=[\s,)—-])/g)) out.add(Number(m[1]));
  return out;
}

/** Commit hashes a bullet documents explicitly as `(direct commit \`<hash>\`)`. */
export const directHashes = (bullet) =>
  [...bullet.matchAll(/direct commit `([0-9a-f]{7,40})`/g)].map((m) => m[1]);

/**
 * Split a markdown text into bullet blocks per section heading. A block is a `- ` line plus its
 * indented continuation lines. `fixedSection` forces every bullet into one section (fragments).
 * `collapse` joins continuation lines into the first line (fragments only — never pre-existing
 * section bullets, which the changelog-integrity gate compares line by line).
 */
export function parseBlocks(text, { fixedSection = null, collapse = false } = {}) {
  const out = { features: [], fixes: [], maintenance: [] };
  let cur = fixedSection;
  let block = null;
  const flush = () => {
    if (block && cur) {
      out[cur].push(
        collapse
          ? block.map((l, i) => (i ? l.trim() : l.replace(/\s+$/, ""))).join(" ")
          : block.join("\n")
      );
    }
    block = null;
  };
  for (const line of text.split("\n")) {
    if (!fixedSection && line.startsWith("### ")) {
      flush();
      cur = Object.keys(SECTION_HEADINGS).find((k) => SECTION_HEADINGS[k] === line.trim()) || null;
      continue;
    }
    if (line.startsWith("- ")) {
      flush();
      if (cur) block = [line];
      continue;
    }
    if (block && /^\s+\S/.test(line)) {
      block.push(line);
      continue;
    }
    flush();
  }
  flush();
  return out;
}

/** Escape every regex metacharacter (CodeQL js/incomplete-sanitization: never escape just one). */
const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const mentions = (b, h) => new RegExp(`@${escapeRegExp(h)}(?![A-Za-z0-9_-])`, "i").test(b);

/** Append `— thanks @a / @b` (or extend an existing trailing thanks group) for handles not yet mentioned. */
export function addCredit(bullet, handles, maintainer = MAINTAINER) {
  const hs = [...new Set(handles.filter((h) => h && h !== maintainer && !mentions(bullet, h)))];
  if (!hs.length) return bullet;
  const lines = bullet.split("\n");
  let last = lines[lines.length - 1];
  const add = hs.map((h) => `@${h}`).join(" / ");
  if (/thanks\s+@[A-Za-z0-9_-]+(\s*\/\s*@[A-Za-z0-9_-]+)*\s*$/.test(last)) {
    last = `${last.replace(/\s*$/, "")} / ${add}`;
  } else if (/thanks\s+@[A-Za-z0-9_-]+(\s*\/\s*@[A-Za-z0-9_-]+)*\)\s*$/.test(last)) {
    last = `${last.replace(/\)\s*$/, "")} / ${add})`;
  } else {
    last = `${last.replace(/\s*$/, "")} — thanks ${add}`;
  }
  lines[lines.length - 1] = last;
  return lines.join("\n");
}

/** Append a `([#N](…))` link to the last line of a bullet, before any trailing thanks group. */
export function appendLink(bullet, repo, n) {
  if (refsIn(normalizeLinks(bullet)).includes(n)) return bullet;
  const lines = bullet.split("\n");
  let last = lines[lines.length - 1];
  const th = last.match(/\s*—\s*thanks\s+@[^\n]*$/);
  last = th
    ? `${last.slice(0, th.index).replace(/\s*$/, "")} (${prLink(repo, n)})${th[0]}`
    : `${last.replace(/\s*$/, "")} (${prLink(repo, n)})`;
  lines[lines.length - 1] = last;
  return lines.join("\n");
}

/** Conventional-commit subject → { type, text } with the type prefix bolded (repo format). */
export function bulletFromSubject(subject, special = {}) {
  let s = subject
    .replace(/\s*\(#\d+\)\s*$/, "")
    .replace(/^\[?URGENT\]?\s*/i, "")
    .trim();
  if (special[s]) s = special[s];
  const m = s.match(/^([a-z]+)(\([^)]*\))?(!)?:\s*(.+)$/i);
  if (!m) return { type: "other", text: s };
  return { type: m[1].toLowerCase(), text: `**${m[1].toLowerCase()}${m[2] || ""}:** ${m[4]}` };
}

export const sectionForType = (type) =>
  type === "feat"
    ? "features"
    : ["fix", "perf", "security", "revert"].includes(type)
      ? "fixes"
      : "maintenance";

/** Type of an existing bullet (`- **fix(x):** …` or `- fix(x): …`), else "other". */
export function typeOfBullet(bullet) {
  const m = normalizeLinks(bullet).match(/^- \*{0,2}([a-z]+)(?:\([^)]*\))?!?:\*{0,2}/i);
  return m ? m[1].toLowerCase() : "other";
}

/** Text key used to spot twins (two fragments for one PR, a direct-commit twin of a synced PR). */
export const dedupKey = (b) =>
  normalizeLinks(b)
    .split("\n")[0]
    .replace(/\s*\((?:#\d+[^)]*|direct commit[^)]*)\)\s*/g, " ")
    .replace(/\s*—\s*thanks.*$/, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 100);

/**
 * Keep one bullet per dedupKey (the best-linked one) and MERGE every `([#N](…))` /
 * `(direct commit …)` group the dropped twins carried into the survivor.
 */
export function dedupeBullets(list) {
  const best = new Map();
  const score = (b) => (b.match(/\/pull\//g) || []).length * 10 + b.length / 1000;
  for (const b of list) {
    const k = dedupKey(b);
    if (!best.has(k) || score(b) > best.get(k).score) best.set(k, { b, score: score(b) });
  }
  const extras = new Map();
  const dropped = [];
  for (const b of list) {
    const k = dedupKey(b);
    if (best.get(k).b === b) continue;
    dropped.push(b);
    if (!extras.has(k)) extras.set(k, []);
    for (const m of b.matchAll(/\(\[#\d+\]\([^)]*\)\)|\(direct commit `[0-9a-f]+`\)/g)) {
      extras.get(k).push(m[0]);
    }
  }
  const seen = new Set();
  const kept = [];
  for (const b of list) {
    const k = dedupKey(b);
    if (best.get(k).b !== b || seen.has(k)) continue;
    seen.add(k);
    let out = b;
    for (const g of extras.get(k) || []) {
      if (out.includes(g)) continue;
      const th = out.match(/\s*—\s*thanks[^\n]*$/);
      out = th ? `${out.slice(0, th.index)} ${g}${th[0]}` : `${out} ${g}`;
    }
    kept.push(out);
  }
  return { kept, dropped };
}

/** Extract `## [version]` … up to the next `## [` (exclusive). */
export function versionSectionRange(changelog, version) {
  const esc = version.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const m = changelog.match(new RegExp(`^## \\[${esc}\\][^\\n]*$`, "m"));
  if (!m) return null;
  const bodyStart = m.index + m[0].length;
  const rest = changelog.slice(bodyStart);
  const next = rest.search(/\n## \[/);
  return { start: m.index, bodyStart, end: next === -1 ? changelog.length : bodyStart + next };
}

/** Everything under every `## [` heading OTHER than `version` (used to spot already-shipped text). */
export function otherSectionsText(changelog, version) {
  const r = versionSectionRange(changelog, version);
  if (!r) return changelog;
  return changelog.slice(0, r.start) + changelog.slice(r.end);
}

/** Commits covered by the bullets: own PR is a primary ref (or closes a cited issue); no-PR commits by any ref. */
export function computeCoverage(
  rows,
  bullets,
  { closingPrs = new Set(), originHashes = new Set(), skipHashes = new Set() } = {}
) {
  const cited = new Set();
  const hashes = [];
  for (const b of bullets) {
    for (const n of primaryRefs(b)) cited.add(n);
    hashes.push(...directHashes(b));
  }
  const documentedHash = (full) =>
    hashes.some((h) => full.startsWith(h) || h.startsWith(full.slice(0, 9)));
  const uncovered = rows.filter((r) => {
    const h = r.hash.slice(0, 9);
    if (skipHashes.has(h) || originHashes.has(h)) return false;
    if (r.pr) return !(cited.has(r.pr) || closingPrs.has(r.pr));
    return !(documentedHash(r.hash) || r.refs.some((x) => cited.has(x)));
  });
  return { cited, uncovered };
}

/** Rank authors by commits; key = GitHub login of the merged PR when known, else the mailmap name. */
export function rankAuthors(rows, limit = 25) {
  const counts = {};
  const names = {};
  for (const r of rows) {
    if (BOT_RE.test(r.authorName)) continue;
    const k = r.prAuthor || r.authorName;
    counts[k] = (counts[k] || 0) + 1;
    names[k] ??= {};
    names[k][r.authorName] = (names[k][r.authorName] || 0) + 1;
  }
  const display = (k) => Object.entries(names[k]).sort((a, b) => b[1] - a[1])[0][0];
  return {
    counts,
    top: Object.entries(counts)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, limit)
      .map(([k, c]) => [display(k) === k ? k : `${display(k)} (@${k})`, c]),
  };
}

const fmt = (n) => n.toLocaleString("en-US");
const medal = (i) => (i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : String(i + 1));

/** Render the whole `## [version]` section (header → stats → ranking → three sections). */
export function renderSection({
  version,
  today,
  baseTip,
  headTip,
  rows,
  all,
  ranking,
  prNumbers,
  dateSuffix = "TBD",
}) {
  const bullets = Object.values(all)
    .flat()
    .filter((b) => b.startsWith("- "));
  const byType = {};
  const SEC_DEFAULT = { features: "feat", fixes: "fix", maintenance: "chore" };
  for (const k of Object.keys(all)) {
    for (const b of all[k].filter((x) => x.startsWith("- "))) {
      let t = typeOfBullet(b);
      if (!TYPE_LABEL[t] || t === "other") t = SEC_DEFAULT[k];
      byType[TYPE_LABEL[t]] = (byType[TYPE_LABEL[t]] || 0) + 1;
    }
  }
  const prRefs = new Set();
  const handles = new Set();
  for (const b of bullets) {
    for (const n of refsIn(normalizeLinks(b))) if (prNumbers.has(n)) prRefs.add(n);
    for (const m of normalizeLinks(b).matchAll(/@([A-Za-z0-9_-]+)/g)) handles.add(m[1]);
  }
  const humans = rows.filter((r) => !BOT_RE.test(r.authorName));
  const people = new Set([...Object.keys(ranking.counts), ...handles].map((x) => x.toLowerCase()));
  const lines = [
    `## [${version}] — ${dateSuffix}`,
    ``,
    `_Living section — reconciled ${today} from all cycle commits (\`${baseTip}\` → \`${headTip}\`, ${fmt(rows.length)} non-merge commits). Bullets carry the merged PR and its author; direct pushes are listed with their commit hash. Regenerated at each \`/generate-release\` phase._`,
    ``,
    `### 📊 Release by the numbers`,
    ``,
    `| | |`,
    `| --- | ---: |`,
    `| 👥 People who contributed | **${fmt(people.size)}** |`,
    `| 📝 Commits in the cycle | **${fmt(rows.length)}** |`,
    `| 🔀 Pull requests referenced | **${fmt(prRefs.size)}** |`,
    `| 📋 Changelog entries | **${fmt(bullets.length)}** |`,
    `| 🙌 Contributors credited in entries | **${fmt(handles.size)}** |`,
    `| 🤖 Automated dependency commits | ${rows.length - humans.length} |`,
    ``,
    `**Entries by type**`,
    ``,
    `| Type | Count |`,
    `| --- | ---: |`,
    ...Object.entries(byType)
      .sort((a, b) => b[1] - a[1])
      .map(([t, c]) => `| ${t} | ${c} |`),
    ``,
    `### 🏆 Top 25 contributors this cycle`,
    ``,
    `_By commits in \`${baseTip}..${headTip}\`, author identities consolidated via \`.mailmap\` and the merged PR's GitHub login. Bots excluded._`,
    ``,
    `| # | Contributor | Commits |`,
    `| ---: | --- | ---: |`,
    ...ranking.top.map(([n, c], i) => `| ${medal(i)} | ${n} | ${c} |`),
    ``,
  ];
  for (const k of ["features", "fixes", "maintenance"]) {
    lines.push(SECTION_HEADINGS[k], "", ...all[k], "");
  }
  return `${lines.join("\n")}\n---\n`;
}

// ───────────────────────────── data acquisition (git + gh) ─────────────────────────────

const git = (args, cwd = ROOT) =>
  execFileSync("git", args, { cwd, encoding: "utf8", maxBuffer: 1 << 28 }).trim();
const gh = (args) => execFileSync("gh", args, { encoding: "utf8", maxBuffer: 1 << 28 });

export function repoSlug(cwd = ROOT) {
  const url = git(["remote", "get-url", "origin"], cwd);
  const m = url.match(/github\.com[:/]([^/]+\/[^/.]+)/);
  return m ? m[1] : "diegosouzapw/OmniRoute";
}

/** Non-merge commits in `base..head` with mailmap identities, PR number and co-author trailers. */
export function readCommits(base, head, cwd = ROOT) {
  const raw = git(
    [
      "log",
      "--no-merges",
      "--use-mailmap",
      "--date=short",
      "--format=%H%x1f%ad%x1f%aN%x1f%aE%x1f%s%x1f%(trailers:key=Co-authored-by,valueonly,separator=%x1e)%x1e%x1e",
      `${base}..${head}`,
    ],
    cwd
  );
  return raw
    .split("\x1e\x1e")
    .map((s) => s.replace(/^\n/, ""))
    .filter((s) => s.trim())
    .map((r) => {
      const [hash, date, authorName, authorEmail, subject, coa] = r.split("\x1f");
      const refs = refsIn(subject);
      const prMatch = subject.match(/\(#(\d+)\)\s*$/);
      return {
        hash,
        date,
        authorName,
        authorEmail,
        subject,
        refs,
        pr: prMatch ? Number(prMatch[1]) : null,
        prAuthor: null,
        coauthors: (coa || "")
          .split("\x1e")
          .map((s) => s.trim())
          .filter(Boolean),
      };
    });
}

export function fetchMergedPrs(repo, releaseBranch) {
  return JSON.parse(
    gh([
      "pr",
      "list",
      "--repo",
      repo,
      "--state",
      "merged",
      "--base",
      releaseBranch,
      "--limit",
      "1000",
      "--json",
      "number,title,author,body,closingIssuesReferences,mergedAt",
    ])
  );
}

export function fetchPr(repo, n) {
  try {
    return JSON.parse(
      execFileSync(
        "gh",
        [
          "pr",
          "view",
          String(n),
          "--repo",
          repo,
          "--json",
          "number,title,author,body,closingIssuesReferences",
        ],
        {
          encoding: "utf8",
          stdio: ["ignore", "pipe", "ignore"],
        }
      )
    );
  } catch {
    return null;
  }
}

/** Fragment files at `ref` + the commit that ADDED each one (definitive origin of the credit). */
export function readFragments(ref = "HEAD", cwd = ROOT) {
  const out = [];
  for (const dir of Object.keys(SECTION_HEADINGS)) {
    let files = "";
    try {
      files = git(["ls-tree", "--name-only", ref, `changelog.d/${dir}/`], cwd);
    } catch {
      continue;
    }
    for (const f of files
      .split("\n")
      .filter((x) => x && !/README\.md$|\.gitkeep$/.test(x))
      .sort()) {
      const text = git(["show", `${ref}:${f}`], cwd);
      const origin =
        git(["log", "--diff-filter=A", "--format=%h%x09%s", "--", f], cwd)
          .split("\n")
          .filter(Boolean)
          .pop() || "";
      const [ohash, osubject = ""] = origin.split("\t");
      const om = osubject.match(/\(#(\d+)\)\s*$/);
      const pm = f.match(/\/(\d{4,6})-/);
      out.push({
        path: f,
        section: dir,
        text,
        originHash: ohash ? ohash.slice(0, 9) : null,
        originPr: om ? Number(om[1]) : null,
        prefixPr: pm ? Number(pm[1]) : null,
      });
    }
  }
  return out;
}

// ───────────────────────────── the reconciliation itself ─────────────────────────────

export function reconcile({
  changelog,
  version,
  repo,
  rows,
  prs,
  fragments,
  extraPrs = new Map(),
  credits = {},
  carriers = new Set(),
  dropFragments = new Set(),
  fragmentPr = {},
  fragmentCredit = {},
  today,
  baseTip,
  headTip,
  skipHashes = new Set(),
  special = {},
}) {
  const prBy = new Map(prs.map((p) => [p.number, p]));
  for (const [n, p] of extraPrs) if (!prBy.has(n)) prBy.set(n, p);
  const prAuthor = (n) => prBy.get(n)?.author?.login || null;
  for (const r of rows) r.prAuthor = r.pr ? prAuthor(r.pr) : null;
  const issueToPrs = new Map();
  for (const p of prs)
    for (const ci of p.closingIssuesReferences || []) {
      if (!issueToPrs.has(ci.number)) issueToPrs.set(ci.number, []);
      issueToPrs.get(ci.number).push(p.number);
    }

  const range = versionSectionRange(changelog, version);
  if (!range) throw new Error(`CHANGELOG.md has no "## [${version}]" section`);
  const existing = parseBlocks(changelog.slice(range.bodyStart, range.end));
  const shippedElsewhere = normalizeLinks(otherSectionsText(changelog, version));

  const blocks = {
    features: [...existing.features],
    fixes: [...existing.fixes],
    maintenance: [...existing.maintenance],
  };
  const srcOf = new Map();
  for (const f of fragments) {
    const parsed = parseBlocks(f.text, { fixedSection: f.section, collapse: true });
    for (const b of parsed[f.section]) {
      blocks[f.section].push(b);
      srcOf.set(b, f);
    }
  }

  const dropped = [];
  const patched = [];
  const mismatches = [];
  const originHashes = new Set();
  for (const k of Object.keys(blocks)) {
    const out = [];
    for (let b of blocks[k]) {
      const frag = srcOf.get(b);
      const first = b.split("\n")[0].trim();
      if (frag && dropFragments.has(frag.path)) {
        dropped.push({ why: "dropped by --drop-fragment", first, src: frag.path });
        continue;
      }
      const probe = normalizeLinks(first)
        .replace(/\s*\(#\d+.*$/, "")
        .slice(0, 90);
      if (frag && probe.length > 40 && shippedElsewhere.includes(probe)) {
        dropped.push({
          why: "text already shipped in another version section",
          first,
          src: frag.path,
        });
        continue;
      }
      if (frag) {
        const refs0 = refsIn(normalizeLinks(b));
        const override = fragmentPr[frag.path];
        const oPr = frag.originPr;
        const fPr = frag.prefixPr;
        let defPrs = override
          ? [override]
          : oPr && prBy.has(oPr) && !carriers.has(oPr)
            ? [oPr]
            : fPr && prBy.has(fPr)
              ? [fPr]
              : oPr && prBy.has(oPr)
                ? [oPr]
                : [];
        if (!defPrs.length)
          for (const n of refs0) for (const pr of issueToPrs.get(n) || []) defPrs.push(pr);
        defPrs = [...new Set(defPrs)];
        if (oPr && fPr && prBy.has(fPr) && oPr !== fPr) {
          mismatches.push(
            `${frag.path}: prefix #${fPr} (${prAuthor(fPr)}) vs origin #${oPr} (${prAuthor(oPr)}) → used #${defPrs.join("/")}`
          );
        }
        if (b.includes("#PR_NUMBER") && defPrs.length) {
          b = b
            .replace(/\[#PR_NUMBER\]\([^)]*\)/g, prLink(repo, defPrs[0]))
            .replace(/#PR_NUMBER/g, `#${defPrs[0]}`);
        }
        for (const h of fragmentCredit[frag.path] || []) b = addCredit(b, [h]);
        for (const n of defPrs) {
          const before = b;
          b = appendLink(b, repo, n);
          b = addCredit(b, [prAuthor(n), ...(credits[n] || [])]);
          if (b !== before) patched.push(`${frag.path} → #${n} @${prAuthor(n)}`);
        }
        if (!override && !(oPr && carriers.has(oPr)) && frag.originHash)
          originHashes.add(frag.originHash);
      }
      out.push(b);
    }
    blocks[k] = out;
  }

  const allExisting = Object.values(blocks)
    .flat()
    .filter((b) => b.startsWith("- "));
  const closingPrs = new Set();
  const citedIssues = new Set(allExisting.flatMap((b) => refsIn(normalizeLinks(b))));
  for (const p of prs)
    for (const ci of p.closingIssuesReferences || [])
      if (citedIssues.has(ci.number)) closingPrs.add(p.number);
  const { uncovered } = computeCoverage(rows, allExisting, {
    closingPrs,
    originHashes,
    skipHashes,
  });

  const gen = { features: [], fixes: [], maintenance: [] };
  const deps = [];
  for (const r of [...uncovered].sort(
    (a, b) => (a.pr || 0) - (b.pr || 0) || a.date.localeCompare(b.date)
  )) {
    if (BOT_RE.test(r.authorName)) {
      deps.push(r);
      continue;
    }
    const c = bulletFromSubject(r.subject, special);
    let bullet = `- ${c.text}`;
    bullet += r.pr ? ` (${prLink(repo, r.pr)})` : ` (direct commit \`${r.hash.slice(0, 10)}\`)`;
    bullet = addCredit(bullet, [
      r.pr ? prAuthor(r.pr) : null,
      ...(r.pr ? credits[r.pr] || [] : []),
    ]);
    gen[sectionForType(c.type)].push(bullet);
  }
  if (deps.length) {
    gen.maintenance.push(
      `- **deps:** ${deps.length} Dependabot bumps — ${deps
        .map(
          (r) =>
            `${r.subject.replace(/^deps(\([^)]*\))?:\s*/, "").replace(/\s*\(#\d+\)\s*$/, "")} (${prLink(repo, r.pr)})`
        )
        .join("; ")}`
    );
  }

  const all = {};
  const dedupDropped = [];
  for (const k of Object.keys(blocks)) {
    const existingSet = new Set(existing[k]);
    const merged = [...blocks[k], ...gen[k]];
    const kept = merged.filter((b) => existingSet.has(b));
    const { kept: rest, dropped: dd } = dedupeBullets(merged.filter((b) => !existingSet.has(b)));
    dedupDropped.push(...dd);
    all[k] = [...kept, ...rest];
  }

  const ranking = rankAuthors(rows);
  const section = renderSection({
    version,
    today,
    baseTip,
    headTip,
    rows,
    all,
    ranking,
    prNumbers: new Set(prBy.keys()),
  });
  const next = `${changelog.slice(0, range.start)}${section}${changelog.slice(range.end + 1)}`;
  const report = {
    version,
    baseTip,
    headTip,
    commits: rows.length,
    existing: Object.fromEntries(Object.entries(existing).map(([k, v]) => [k, v.length])),
    fragments: fragments.length,
    generated: Object.fromEntries(Object.entries(gen).map(([k, v]) => [k, v.length])),
    bullets: Object.values(all)
      .flat()
      .filter((b) => b.startsWith("- ")).length,
    dropped,
    patched: patched.length,
    mismatches,
    dedupDropped,
    uncovered: uncovered.length,
    depsRolled: deps.length,
    ranking: ranking.top,
  };
  return { changelog: next, report };
}

// ───────────────────────────── CLI ─────────────────────────────

function parseArgs(argv) {
  const o = {
    credit: {},
    carriers: new Set(),
    dropFragments: new Set(),
    fragmentPr: {},
    dryRun: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const v = () => argv[++i];
    if (a === "--version") o.version = v();
    else if (a === "--base") o.base = v();
    else if (a === "--head") o.head = v();
    else if (a === "--release-branch") o.releaseBranch = v();
    else if (a === "--prs") o.prs = v();
    else if (a === "--report") o.report = v();
    else if (a === "--dry-run") o.dryRun = true;
    else if (a === "--carrier") o.carriers.add(Number(v()));
    else if (a === "--drop-fragment") o.dropFragments.add(v());
    else if (a === "--credit") {
      const [n, hs] = v().split("=");
      o.credit[Number(n)] = hs.split(",").map((h) => h.replace(/^@/, ""));
    } else if (a === "--fragment-pr") {
      const [p, n] = v().split("=");
      o.fragmentPr[p] = Number(n);
    }
  }
  return o;
}

export function main(argv = process.argv.slice(2)) {
  const o = parseArgs(argv);
  const version =
    o.version || JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version;
  const releaseBranch = o.releaseBranch || `release/v${version}`;
  const head = o.head || "HEAD";
  let base = o.base;
  if (!base) {
    const { base: open, source } = resolveCycleBase(version);
    base = `${open}^`;
    console.log(`[reconcile-changelog] base = parent of the ${source} commit ${open.slice(0, 10)}`);
  }
  const repo = repoSlug();
  const rows = readCommits(base, head);
  const prs = o.prs
    ? JSON.parse(fs.readFileSync(o.prs, "utf8"))
    : fetchMergedPrs(repo, releaseBranch);
  const known = new Set(prs.map((p) => p.number));
  const extraPrs = new Map();
  for (const n of new Set(rows.filter((r) => r.pr && !known.has(r.pr)).map((r) => r.pr))) {
    const p = fetchPr(repo, n);
    if (p) extraPrs.set(n, p);
  }
  const fragments = readFragments(head);
  const changelog = fs.readFileSync(path.join(ROOT, "CHANGELOG.md"), "utf8");
  const baseTip = git(["rev-parse", "--short=10", base]);
  const headTip = git(["rev-parse", "--short=10", head]);
  // the cycle-open bump and the living-section restore are the only legitimate non-bullet commits
  const skipHashes = new Set(
    rows
      .filter(
        (r) =>
          /^chore\(release\): (open v[\d.]+ development cycle|restore the living)/.test(
            r.subject
          ) || /^Release v[\d.]+$/.test(r.subject)
      )
      .map((r) => r.hash.slice(0, 9))
  );
  const { changelog: next, report } = reconcile({
    changelog,
    version,
    repo,
    rows,
    prs,
    fragments,
    extraPrs,
    credits: o.credit,
    carriers: o.carriers,
    dropFragments: o.dropFragments,
    fragmentPr: o.fragmentPr,
    today: new Date().toISOString().slice(0, 10),
    baseTip,
    headTip,
    skipHashes,
  });
  if (!o.dryRun) {
    fs.writeFileSync(path.join(ROOT, "CHANGELOG.md"), next);
    for (const f of fragments) {
      try {
        fs.unlinkSync(path.join(ROOT, f.path));
      } catch {
        /* already gone */
      }
    }
  }
  if (o.report) fs.writeFileSync(o.report, JSON.stringify(report, null, 1));
  const { dropped, mismatches, dedupDropped, ranking, ...summary } = report;
  console.log(`[reconcile-changelog] ${o.dryRun ? "(dry-run) " : ""}${JSON.stringify(summary)}`);
  for (const d of dropped) console.log(`  dropped: ${d.why} — ${d.first.slice(0, 90)}`);
  for (const m of mismatches) console.log(`  review: ${m}`);
  for (const d of dedupDropped) console.log(`  deduped: ${d.slice(0, 90)}`);
  console.log(
    `[reconcile-changelog] next: npm run release:contributors -- ${version} --inject && npx prettier --write CHANGELOG.md && npm run release:sync-changelog-i18n -- ${version} <prev> && npm run check:changelog-integrity`
  );
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.exit(main());
}
