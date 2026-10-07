import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  splitSections,
  sectionHashes,
  planSectionReuse,
  extractMirrorBody,
  findSourceTextByHash,
  extractTopHeading,
  stripTopHeading,
} from "../../scripts/i18n/run-translation.mjs";
import {
  mirrorNeedsRebuild,
  mergeStateUpdates,
  looksUntranslated,
} from "../../scripts/i18n/run-translation.mjs";

// The docs translator remembers a short hash of every `## ` section of the
// source at translation time and, on the next run, only sends the sections
// whose hash changed — the untouched translated sections of the mirror are
// spliced back in by index.

const body = "Intro line.\n\n## One\n\nalpha\n\n```md\n## not a heading\n```\n\n## Two\n\nbeta\n";

test("splitSections keeps the preamble as section 0 and never splits inside a fence", () => {
  const s = splitSections(body);
  assert.equal(s.length, 3);
  assert.equal(s[0].trim(), "Intro line.");
  assert.ok(s[1].startsWith("## One"));
  assert.ok(s[1].includes("## not a heading"));
  assert.ok(s[2].startsWith("## Two"));
});

test("splitSections round-trips the body modulo trailing whitespace", () => {
  const s = splitSections(body);
  assert.equal(s.join("\n\n"), body.trimEnd());
});

test("splitSections: a body that opens with a heading has no separate preamble", () => {
  const s = splitSections("## First\n\ntext\n\n## Second\n\nmore\n");
  assert.equal(s.length, 2);
  assert.ok(s[0].startsWith("## First"));
  assert.ok(s[1].startsWith("## Second"));
});

test("sectionHashes are 12-hex prefixes and change with the text", () => {
  const [a, b] = sectionHashes(["x", "y"]);
  assert.match(a, /^[0-9a-f]{12}$/);
  assert.notEqual(a, b);
});

test("planSectionReuse reuses unchanged sections by index and translates the changed ones", () => {
  const prev = sectionHashes(["p", "## A\n\na", "## B\n\nb"]);
  const now = ["p", "## A\n\na", "## B\n\nb CHANGED"];
  const mirror = ["p-pt", "## A-pt\n\na-pt", "## B-pt\n\nb-pt"];
  const plan = planSectionReuse({ previousHashes: prev, sections: now, mirrorSections: mirror });
  assert.ok(plan);
  assert.deepEqual(
    [...plan.reuse.entries()],
    [
      [0, "p-pt"],
      [1, "## A-pt\n\na-pt"],
    ]
  );
  assert.deepEqual(plan.translate, [2]);
});

test("planSectionReuse gives up when the mirror does not have the same section count", () => {
  const prev = sectionHashes(["p", "## A"]);
  assert.equal(
    planSectionReuse({ previousHashes: prev, sections: ["p", "## A"], mirrorSections: ["p"] }),
    null
  );
  assert.equal(
    planSectionReuse({ previousHashes: undefined, sections: ["p"], mirrorSections: ["p"] }),
    null
  );
  // An inserted section shifts the count: the plan falls back to a full translation.
  assert.equal(
    planSectionReuse({
      previousHashes: prev,
      sections: ["p", "## New", "## A"],
      mirrorSections: ["p", "## A"],
    }),
    null
  );
});

test("extractMirrorBody strips the heading, the language bar and the separator", () => {
  const mirror =
    "# Guide (Português)\n\n🌐 **Languages:** 🇺🇸 [English](../x.md) · 🇧🇷 [pt-BR](./x.md)\n\n---\n\nCorpo.\n\n## Um\n\ntexto\n";
  assert.equal(extractMirrorBody(mirror), "Corpo.\n\n## Um\n\ntexto\n");
});

// 141 docs sources open with a YAML front-matter block. The heading helpers
// must look past it, or the mirror gets the file name as its title and the
// front matter (plus a second heading) translated into its body.
const withFrontMatter =
  '---\ntitle: "OmniRoute — Uninstall Guide"\nversion: 3.8.40\n---\n\n# OmniRoute — Uninstall Guide\n\nThis guide covers removal.\n';

test("extractTopHeading reads the H1 behind a YAML front-matter block", () => {
  assert.equal(extractTopHeading(withFrontMatter), "OmniRoute — Uninstall Guide");
  assert.equal(extractTopHeading("# Plain\n\nbody\n"), "Plain");
  assert.equal(extractTopHeading("no heading\n"), null);
});

test("stripTopHeading drops the front matter together with the H1", () => {
  assert.equal(stripTopHeading(withFrontMatter), "This guide covers removal.\n");
  assert.equal(stripTopHeading("# Plain\n\nbody\n"), "body\n");
  // A horizontal rule further down is not front matter.
  assert.equal(stripTopHeading("# T\n\na\n\n---\n\nb\n"), "a\n\n---\n\nb\n");
});

test("findSourceTextByHash walks the file's git history and returns the text with that sha", async () => {
  const dir = mkdtempSync(path.join(os.tmpdir(), "i18n-sections-"));
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: dir,
      encoding: "utf8",
      env: {
        ...process.env,
        GIT_AUTHOR_NAME: "t",
        GIT_AUTHOR_EMAIL: "t@example.com",
        GIT_COMMITTER_NAME: "t",
        GIT_COMMITTER_EMAIL: "t@example.com",
      },
    });
  try {
    git("init", "-q");
    const rel = "docs/guide.md";
    const v1 = "# G\n\nfirst\n";
    const v2 = "# G\n\nsecond\n";
    mkdirSync(path.join(dir, "docs"), { recursive: true });
    for (const text of [v1, v2]) {
      writeFileSync(path.join(dir, rel), text);
      git("add", rel);
      git("commit", "-q", "-m", "c", "--no-verify");
    }
    const sha = createHash("sha256").update(Buffer.from(v1, "utf8")).digest("hex");
    assert.equal(await findSourceTextByHash(rel, sha, { cwd: dir }), v1);
    assert.equal(await findSourceTextByHash(rel, "0".repeat(64), { cwd: dir }), null);
    assert.equal(await findSourceTextByHash("docs/missing.md", sha, { cwd: dir }), null);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("planSectionReuse never reuses a mirror section that is still the English source", () => {
  const sections = ["p", "## A\n\nalpha text here", "## B\n\nbeta"];
  const prev = sectionHashes(sections);
  const mirror = ["p-pt", "## A\n\nalpha text here", "## B-pt\n\nbeta-pt"];
  const plan = planSectionReuse({ previousHashes: prev, sections, mirrorSections: mirror });
  assert.deepEqual([...plan.reuse.keys()], [0, 2]);
  assert.deepEqual(plan.translate, [1]);
});

test("planSectionReuse always rebuilds a mirror preamble that starts with leaked frontmatter", () => {
  const sections = ["Intro line.", "## A\n\nalpha"];
  const prev = sectionHashes(sections);
  const mirror = ['---\n\ntitle: "Guia"\n---\n\nLinha de intro.', "## A-pt\n\nalfa"];
  const plan = planSectionReuse({ previousHashes: prev, sections, mirrorSections: mirror });
  assert.deepEqual(plan.translate, [0]);
  assert.deepEqual([...plan.reuse.keys()], [1]);
});

const SRC =
  '---\ntitle: "Guide"\n---\n\n# Guide\n\nThis is the first long paragraph of the guide.\n\n## One\n\nAnother long paragraph with enough characters in it.\n\nA third long paragraph with enough characters in it.\n';

test("mirrorNeedsRebuild: leaked frontmatter in the mirror body", () => {
  const mirror =
    '# Guide (Deutsch)\n\n🌐 **Languages:** x\n\n---\n\n---\n\ntitle: "Anleitung"\n---\n\nErster Absatz.\n';
  assert.equal(mirrorNeedsRebuild(mirror, SRC), true);
});

test("mirrorNeedsRebuild: an English copy adopted as translated", () => {
  const mirror =
    "# Guide (Deutsch)\n\n🌐 **Languages:** x\n\n---\n\nThis is the first long paragraph of the guide.\n\n## One\n\nAnother long paragraph with enough characters in it.\n\nA third long paragraph with enough characters in it.\n";
  assert.equal(mirrorNeedsRebuild(mirror, SRC), true);
});

test("mirrorNeedsRebuild: a real translation is left alone", () => {
  const mirror =
    "# Anleitung (Deutsch)\n\n🌐 **Languages:** x\n\n---\n\nDies ist der erste lange Absatz der Anleitung.\n\n## Eins\n\nEin weiterer langer Absatz mit genügend Zeichen darin.\n\nEin dritter langer Absatz mit genügend Zeichen darin.\n";
  assert.equal(mirrorNeedsRebuild(mirror, SRC), false);
});

test("mergeStateUpdates keeps other runners' entries and applies this run's records", () => {
  const fresh = {
    sources: {
      "a.md": { source_hash: "s1", locales: { de: { source_hash: "s1", target_hash: "t1" } } },
    },
  };
  const rec = { source_hash: "s2", target_hash: "t2", section_hashes: ["x"], updated_at: "now" };
  const out = mergeStateUpdates(
    fresh,
    [{ rel: "a.md", locale: "fr", sourceHash: "s2", record: rec }],
    { sources: {} }
  );
  assert.deepEqual(out.sources["a.md"].locales.de, { source_hash: "s1", target_hash: "t1" });
  assert.deepEqual(out.sources["a.md"].locales.fr, rec);
  assert.equal(out.sources["a.md"].source_hash, "s2");
});

test("planSectionReuse retranslates a section that is still mostly English even when not byte-equal", () => {
  const sec =
    "## Setup\n\nClone the repository and install the dependencies first.\n\nRun the development server and open the dashboard.\n\nCreate your env file from the template before starting.\n";
  const sections = ["p", sec];
  const prev = sectionHashes(sections);
  const mirror = ["p-de", sec.replace("## Setup", "## Einrichtung")];
  const plan = planSectionReuse({ previousHashes: prev, sections, mirrorSections: mirror });
  assert.deepEqual(plan.translate, [1]);
  assert.equal(looksUntranslated(mirror[1], sec), true);
  assert.equal(
    looksUntranslated(
      "## Einrichtung\n\nKlone das Repository und installiere zuerst die Abhängigkeiten.\n\nStarte den Entwicklungsserver und öffne das Dashboard.\n\nErstelle deine env-Datei aus der Vorlage.\n",
      sec
    ),
    false
  );
});
