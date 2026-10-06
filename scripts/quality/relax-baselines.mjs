// scripts/quality/relax-baselines.mjs
// Velocity-phase baseline relaxation (owner decision, 2026-08-30).
//
// Every numeric ratchet baseline under config/quality/ is loosened by --pct percent in
// ONE auditable pass, and quality-baseline.json gets a `_policy` block that the ratchet
// engine reads (check-quality-ratchet.mjs skips --require-tighten while the phase is
// active). The intent: ship fast until v4.0 LTS, where the phase closes and every
// baseline is re-measured on the pure tip and tightened again (see
// docs/architecture/QUALITY_GATES.md → "Velocity phase").
//
// What it touches (all counts / caps / percentages, never allowlists):
//   quality-baseline.json      metrics.*.value  (down: ×(1+pct); up: ÷(1+pct), floors kept)
//   complexity-baseline.json   count
//   duplication-baseline.json  percentage
//   file-size-baseline.json    cap, testCap, frozen[*], testFrozen[*]
//   api-typecheck-baseline.json, dashboard-typecheck-baseline.json,
//   open-sse-typecheck-baseline.json   per-file / per-TS-code counts
//
// Floors that survive the relaxation (hard rules, not ratchets):
//   coverage.*            ≥ 60   (AGENTS.md Hard Rule #9 — absolute floor)
//   eslintErrors          stays 0 (errors are defects, not debt)
//   eslintWarnings at 0   becomes pct% of the frozen suppression count (a budget for
//                         new warnings; 0 × 1.2 would be no relaxation at all)
//
// Usage:
//   node scripts/quality/relax-baselines.mjs --pct 20 --note velocity_2026_08_30 [--dry-run]
// Refuses to run twice with the same note unless --force (idempotency guard).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const Q = (f) => path.join(ROOT, "config", "quality", f);

const argv = process.argv.slice(2);
const getArg = (name, dflt) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] !== undefined ? argv[i + 1] : dflt;
};
const PCT = Number(getArg("--pct", "20"));
const NOTE = getArg(
  "--note",
  `velocity_${new Date().toISOString().slice(0, 10).replace(/-/g, "_")}`
);
const DRY = argv.includes("--dry-run");
const FORCE = argv.includes("--force");
const UNTIL = getArg("--until", "4.0.0");
if (!Number.isFinite(PCT) || PCT <= 0 || PCT > 100) {
  console.error(`[relax-baselines] --pct must be in (0, 100], got ${PCT}`);
  process.exit(2);
}
const FACTOR = 1 + PCT / 100;
const NOTE_KEY = `_relax_${NOTE}`;

const COVERAGE_FLOOR = 60; // AGENTS.md Hard Rule #9
const changes = []; // [file, key, before, after]

const read = (f) => JSON.parse(fs.readFileSync(Q(f), "utf8"));
const write = (f, j) => {
  if (DRY) return;
  fs.writeFileSync(Q(f), JSON.stringify(j, null, 2) + "\n");
};
const upCount = (n) => Math.ceil(n * FACTOR);
const downPct = (n, floor = 0) => Math.max(floor, Math.round((n / FACTOR) * 100) / 100);
const keepType = (orig, n) => (typeof orig === "string" ? String(n) : n);

function guard(json, file) {
  if (json[NOTE_KEY] && !FORCE) {
    console.error(`[relax-baselines] ${file} already carries ${NOTE_KEY} — refusing (use --force)`);
    process.exit(3);
  }
}

// ── quality-baseline.json ────────────────────────────────────────────────────
function relaxQualityBaseline(json, { pct = PCT, suppressedCount = 0 } = {}) {
  const factor = 1 + pct / 100;
  const out = [];
  for (const [key, spec] of Object.entries(json.metrics)) {
    if (!spec || typeof spec.value !== "number") continue;
    const dir = spec.direction === "up" ? "up" : "down"; // undefined direction = a count
    const before = spec.value;
    let after = before;
    if (key === "eslintErrors") {
      continue; // errors are defects, never a budget
    } else if (dir === "down") {
      after =
        before === 0 && key === "eslintWarnings"
          ? Math.ceil((suppressedCount * pct) / 100)
          : Math.ceil(before * factor);
    } else {
      const floor = key.startsWith("coverage.") ? COVERAGE_FLOOR : 0;
      after = Math.max(floor, Math.round((before / factor) * 100) / 100);
    }
    if (after !== before) {
      spec.value = after;
      out.push([key, before, after]);
    }
  }
  return out;
}

const suppressedCount = (() => {
  try {
    const sup = read("eslint-suppressions.json");
    let n = 0;
    for (const rules of Object.values(sup)) for (const r of Object.values(rules)) n += r.count || 0;
    return n;
  } catch {
    return 0;
  }
})();

{
  const f = "quality-baseline.json";
  const j = read(f);
  guard(j, f);
  for (const c of relaxQualityBaseline(j, { pct: PCT, suppressedCount })) changes.push([f, ...c]);
  j._policy = {
    phase: "velocity",
    since: NOTE.replace(/^velocity_/, "").replace(/_/g, "-"),
    until: UNTIL,
    relaxPct: PCT,
    requireTighten: false,
    monitor:
      "scripts/quality/baseline-headroom.mjs (nightly-release-green → baseline-headroom job)",
    note:
      "Owner decision 2026-08-30: speed matters more than debt until the v4.0 LTS modularization. " +
      "Every numeric baseline was loosened by relaxPct in one pass (see _relax_* note). " +
      "check-quality-ratchet skips --require-tighten while this block exists; headroom is " +
      "monitored nightly. At 4.0 the phase closes: re-measure on the pure tip, tighten, delete this block.",
  };
  j[NOTE_KEY] = summarize(changes.filter((c) => c[0] === f));
  write(f, j);
}

// ── complexity-baseline.json ─────────────────────────────────────────────────
{
  const f = "complexity-baseline.json";
  const j = read(f);
  guard(j, f);
  const before = j.count;
  j.count = upCount(before);
  changes.push([f, "count", before, j.count]);
  j[NOTE_KEY] = summarize(changes.filter((c) => c[0] === f));
  write(f, j);
}

// ── duplication-baseline.json ────────────────────────────────────────────────
{
  const f = "duplication-baseline.json";
  const j = read(f);
  guard(j, f);
  const before = j.percentage;
  j.percentage = Math.round(before * FACTOR * 100) / 100;
  changes.push([f, "percentage", before, j.percentage]);
  j[NOTE_KEY] = summarize(changes.filter((c) => c[0] === f));
  write(f, j);
}

// ── file-size-baseline.json ──────────────────────────────────────────────────
{
  const f = "file-size-baseline.json";
  const j = read(f);
  guard(j, f);
  for (const capKey of ["cap", "testCap"]) {
    if (typeof j[capKey] === "number") {
      const before = j[capKey];
      j[capKey] = upCount(before);
      changes.push([f, capKey, before, j[capKey]]);
    }
  }
  let n = 0;
  for (const mapKey of ["frozen", "testFrozen"]) {
    const map = j[mapKey];
    if (!map || typeof map !== "object") continue;
    for (const [file, v] of Object.entries(map)) {
      if (file.startsWith("_")) continue; // rebaseline notes live inside the map
      const num = Number(v);
      if (!Number.isFinite(num)) continue;
      map[file] = keepType(v, upCount(num));
      n++;
    }
  }
  changes.push([f, "frozen+testFrozen entries", n, `×${FACTOR}`]);
  j[NOTE_KEY] =
    `${n} frozen line caps and cap/testCap raised by ${PCT}% (velocity phase; see quality-baseline.json _policy).`;
  write(f, j);
}

// ── per-file typecheck baselines ─────────────────────────────────────────────
for (const f of [
  "api-typecheck-baseline.json",
  "dashboard-typecheck-baseline.json",
  "open-sse-typecheck-baseline.json",
]) {
  if (!fs.existsSync(Q(f))) continue;
  const j = read(f);
  guard(j, f);
  let files = 0;
  let before = 0;
  let after = 0;
  for (const [file, codes] of Object.entries(j)) {
    if (file.startsWith("_") || !codes || typeof codes !== "object") continue;
    files++;
    for (const [code, count] of Object.entries(codes)) {
      if (typeof count !== "number") continue;
      before += count;
      codes[code] = upCount(count);
      after += codes[code];
    }
  }
  changes.push([f, `${files} files (sum of counts)`, before, after]);
  j[NOTE_KEY] =
    `per-file TS diagnostic counts raised by ${PCT}% (${before} → ${after}); velocity phase, see quality-baseline.json _policy.`;
  write(f, j);
}

function summarize(list) {
  return (
    `Velocity phase (${PCT}% relaxation, until ${UNTIL}): ` +
    list.map(([, k, b, a]) => `${k} ${b} → ${a}`).join("; ")
  );
}

// ── report ───────────────────────────────────────────────────────────────────
console.log(`[relax-baselines] ${DRY ? "DRY RUN — " : ""}pct=${PCT} note=${NOTE_KEY}`);
for (const [f, k, b, a] of changes)
  console.log(`  ${f.padEnd(34)} ${String(k).padEnd(40)} ${b} → ${a}`);
console.log(`[relax-baselines] ${changes.length} entries ${DRY ? "would change" : "changed"}.`);
