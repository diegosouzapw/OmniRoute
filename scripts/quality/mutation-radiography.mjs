#!/usr/bin/env node
/**
 * Mutation radiography (Quality Gate v2 / Fase 9 T5 — Onda 2, Task 1).
 *
 * Classifies every COVERING test file by its mutation-kill contribution, using the
 * `killedBy` attribution that the Stryker tap-runner emits per mutant
 * (`coverageAnalysis: perTest`, validated by the Task 12 spike — see
 * docs/ops/MUTATION_GATE_SPIKE_VERDICT.md):
 *
 *   🔴 empty       — the test file never appears in any `killedBy` (kills no mutant
 *                    of the mutated modules). Prime R1-prune candidate (Task 2).
 *   🟠 redundant   — every mutant it kills is ALSO killed by ≥1 other test file
 *                    (zero unique kills).
 *   🟡 overlapping — kills ≥1 unique mutant, but the MAJORITY of its kills are shared.
 *   🟢 unique      — kills ≥1 mutant that NO other test file kills (and unique kills
 *                    are not outnumbered by shared kills).
 *
 * CAVEAT — bail-on-first-kill: Stryker bails after the first test kills a mutant
 * (we do NOT set `disableBail`), so `killedBy` lists the FIRST killer, not every
 * killer. Consequence: 🔴 empty is RELIABLE (a sole killer is always recorded, so a
 * file that never appears in killedBy is never the sole killer of any mutant → safe
 * R1-prune candidate w.r.t. mutationScore), but 🟢/🟠/🟡 are OPTIMISTIC — "unique" is
 * overstated and "redundant" understated, because a non-first coverer that WOULD also
 * kill is never recorded. Use 🟢/🟠/🟡 as advisory only; an accurate redundancy split
 * (for R2) needs a `disableBail: true` run. R1 (Task 2) acts on 🔴 alone + a line-
 * coverage cross-check + human review, so bail-on-first is sufficient there.
 *
 * IMPORTANT — multi-batch merge: the nightly splits `mutate` across parallel batches
 * (one mutation.json per batch). Stryker assigns numeric test ids PER RUN, so id "12"
 * in batch c is unrelated to id "12" in batch d. Each report is therefore resolved
 * (id -> file name, via its own `testFiles` section) and classified independently;
 * `aggregateRadiography` then sums the per-FILE kill counts across batches and
 * reclassifies. A file empty in one batch but unique in another is unique overall.
 *
 * Usage:
 *   node scripts/quality/mutation-radiography.mjs <mutation-c.json> [<mutation-d.json> ...]
 * The universe of test files (so 🔴 empty files are detectable) defaults to
 * `stryker.conf.json:tap.testFiles`; pass --no-conf-universe to use only the union
 * of the reports' own `testFiles` sections instead.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..", "..");

export function loadMutationReport(reportPath) {
  return JSON.parse(fs.readFileSync(reportPath, "utf8"));
}

/**
 * Threshold rules shared by single-report and aggregated classification.
 * @param {number} uniqueKills mutants this file kills ALONE
 * @param {number} sharedKills mutants this file kills together with others
 */
export function classifyFromCounts(uniqueKills, sharedKills) {
  if (uniqueKills === 0 && sharedKills === 0) return "empty";
  if (uniqueKills === 0) return "redundant";
  if (sharedKills > uniqueKills) return "overlapping";
  return "unique";
}

// Map each numeric test id to its file name via the report's `testFiles` section.
// Real tap-runner reports key killedBy by id; the synthetic test fixtures key it by
// file name directly (no testFiles section) — those pass through unchanged.
function buildIdToFile(report) {
  const map = new Map();
  for (const [file, data] of Object.entries(report.testFiles || {})) {
    for (const t of data.tests || []) {
      map.set(String(t.id), t.name || file);
    }
  }
  return map;
}

// Raw per-file kill counts for ONE report (no universe, no classification).
function countKills(report) {
  const idToFile = buildIdToFile(report);
  const counts = new Map();
  const bump = (file, key) => {
    const c = counts.get(file) || { uniqueKills: 0, sharedKills: 0 };
    c[key] += 1;
    counts.set(file, c);
  };
  for (const data of Object.values(report.files || {})) {
    for (const m of data.mutants || []) {
      if (m.status !== "Killed") continue;
      const killers = [...new Set((m.killedBy || []).map((id) => idToFile.get(String(id)) ?? id))];
      if (killers.length === 0) continue;
      if (killers.length === 1) bump(killers[0], "uniqueKills");
      else for (const k of killers) bump(k, "sharedKills");
    }
  }
  return counts;
}

function materialize(counts, universe) {
  const files = new Set(universe || []);
  for (const f of counts.keys()) files.add(f);
  const out = {};
  for (const file of files) {
    const { uniqueKills = 0, sharedKills = 0 } = counts.get(file) || {};
    out[file] = { class: classifyFromCounts(uniqueKills, sharedKills), uniqueKills, sharedKills };
  }
  return out;
}

/**
 * Classify the test files of a SINGLE mutation report.
 * @param {object} report parsed mutation.json
 * @param {string[]} [allTestFiles] universe; defaults to the report's testFiles keys
 */
export function classifyTestFiles(report, allTestFiles) {
  const universe = allTestFiles || Object.keys(report.testFiles || {});
  return materialize(countKills(report), universe);
}

/**
 * Merge several per-batch reports at the file level, then classify.
 * @param {object[]} reports parsed mutation.json objects (one per batch)
 * @param {string[]} [allTestFiles] universe; defaults to the union of testFiles keys
 */
export function aggregateRadiography(reports, allTestFiles) {
  const total = new Map();
  const universe = new Set(allTestFiles || []);
  for (const report of reports) {
    if (!allTestFiles) for (const f of Object.keys(report.testFiles || {})) universe.add(f);
    for (const [file, c] of countKills(report)) {
      const acc = total.get(file) || { uniqueKills: 0, sharedKills: 0 };
      acc.uniqueKills += c.uniqueKills;
      acc.sharedKills += c.sharedKills;
      total.set(file, acc);
    }
  }
  return materialize(total, [...universe]);
}

// ── CLI ──────────────────────────────────────────────────────────────────────

function tapTestFilesUniverse() {
  try {
    const conf = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, "stryker.conf.json"), "utf8"));
    return conf?.tap?.testFiles || null;
  } catch {
    return null;
  }
}

const CLASS_LABEL = {
  empty: "🔴 empty",
  redundant: "🟠 redundant",
  overlapping: "🟡 overlapping",
  unique: "🟢 unique",
};
const CLASS_ORDER = ["empty", "redundant", "overlapping", "unique"];

function renderMarkdown(classification) {
  const byClass = { empty: [], redundant: [], overlapping: [], unique: [] };
  for (const [file, info] of Object.entries(classification))
    byClass[info.class].push({ file, ...info });
  for (const k of CLASS_ORDER) byClass[k].sort((a, b) => a.file.localeCompare(b.file));

  const total = Object.keys(classification).length;
  const lines = [];
  lines.push("# Mutation Radiography");
  lines.push("");
  lines.push(
    `Test files classified by mutation-kill contribution (\`killedBy\`). Total: **${total}**.`
  );
  lines.push("");
  lines.push("| Class | Count | Meaning |");
  lines.push("| --- | --- | --- |");
  lines.push(
    `| 🔴 empty | ${byClass.empty.length} | kills no mutant of the mutated modules (R1-prune candidate) |`
  );
  lines.push(
    `| 🟠 redundant | ${byClass.redundant.length} | every kill is shared with another file |`
  );
  lines.push(
    `| 🟡 overlapping | ${byClass.overlapping.length} | kills ≥1 unique but mostly shared |`
  );
  lines.push(`| 🟢 unique | ${byClass.unique.length} | kills ≥1 mutant no other file kills |`);
  lines.push("");
  lines.push(
    "> **Bail caveat:** Stryker bails on the first kill (no `disableBail`), so `killedBy` is the " +
      "FIRST killer only. 🔴 empty is reliable (safe R1-prune candidate w.r.t. mutationScore); " +
      "🟢/🟠/🟡 are optimistic (unique overstated, redundant understated) — advisory until a " +
      "`disableBail` run. R1 prunes 🔴 only, with a line-coverage cross-check + human review."
  );
  lines.push("");
  for (const k of CLASS_ORDER) {
    const rows = byClass[k];
    lines.push(`## ${CLASS_LABEL[k]} (${rows.length})`);
    lines.push("");
    if (rows.length === 0) {
      lines.push("_none_");
    } else {
      lines.push("| Test file | unique | shared |");
      lines.push("| --- | --- | --- |");
      for (const r of rows) lines.push(`| ${r.file} | ${r.uniqueKills} | ${r.sharedKills} |`);
    }
    lines.push("");
  }
  return lines.join("\n");
}

function main(argv) {
  const args = argv.filter((a) => a !== "--no-conf-universe");
  const useConfUniverse = !argv.includes("--no-conf-universe");
  const paths = args.slice(2);
  if (paths.length === 0) {
    process.stderr.write(
      "usage: mutation-radiography.mjs <mutation-1.json> [<mutation-2.json> ...] [--no-conf-universe]\n"
    );
    process.exit(2);
  }
  const reports = paths.map(loadMutationReport);
  const universe = useConfUniverse ? tapTestFilesUniverse() : null;
  const classification = aggregateRadiography(reports, universe || undefined);
  process.stdout.write(renderMarkdown(classification) + "\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main(process.argv);
}
