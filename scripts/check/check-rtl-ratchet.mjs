#!/usr/bin/env node
// scripts/check/check-rtl-ratchet.mjs
// RTL layout ratchet. Counts physical directional Tailwind classes in TSX.
//
// tests/unit/ui/rtl-logical-classes.test.tsx pins four high-impact components
// and says so: "#3541 (partial, core layout)". This measures the rest, so the
// remaining backlog cannot grow while it is worked through.
//
// Physical classes (ml/mr/pl/pr/left/right/text-left/border-l/rounded-l ...) do
// not mirror under dir=rtl. Tailwind v4 logical utilities (ms/me/ps/pe/start/
// end/text-start/border-s/rounded-s) do.
//
// Output:  rtlPhysicalClasses=N
//
// Advisory by default (exit 0). With --ratchet, reads
// metrics.rtlPhysicalClasses.value from config/quality/quality-baseline.json and
// exits 1 only when the measured count is HIGHER (direction: down).
//
//   node scripts/check/check-rtl-ratchet.mjs
//   node scripts/check/check-rtl-ratchet.mjs --list     # show the worst files
//   node scripts/check/check-rtl-ratchet.mjs --ratchet  # blocking

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const QUIET = process.argv.includes("--quiet");
const LIST = process.argv.includes("--list");
const RATCHET = process.argv.includes("--ratchet");
const BASELINE_PATH = path.join(ROOT, "config/quality/quality-baseline.json");
const SCAN_DIRS = ["src", "electron"];
const SKIP = new Set(["node_modules", ".next", "dist", "build", "out", "coverage", ".git"]);

// Physical utilities that govern placement and do not mirror under dir=rtl.
const PHYSICAL =
  /(?<![\w-])(?:ml|mr|pl|pr|left|right|border-l|border-r|rounded-l|rounded-r)-[a-z0-9.[\]/]+|(?<![\w-])text-(?:left|right)(?![\w-])/g;

/**
 * Count violations in one file's source.
 *
 * Two exemptions, both direction independent rather than oversights:
 *  - a class already scoped to an `rtl:` variant, which is a deliberate override
 *  - `left-…` paired with `right-…` on the same element, which spans both edges
 */
export function countViolations(source) {
  let count = 0;
  for (const line of source.split("\n")) {
    const spansBothEdges = /(?<![\w-])left-[a-z0-9.[\]/]+/.test(line) &&
      /(?<![\w-])right-[a-z0-9.[\]/]+/.test(line);
    for (const match of line.matchAll(PHYSICAL)) {
      const before = line.slice(0, match.index);
      if (/rtl:[\w-]*$/.test(before)) continue;
      if (spansBothEdges && /^(left|right)-/.test(match[0])) continue;
      count += 1;
    }
  }
  return count;
}

function* walk(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.name.endsWith(".tsx")) yield full;
  }
}

function measure() {
  const perFile = [];
  let total = 0;
  for (const dir of SCAN_DIRS) {
    for (const file of walk(path.join(ROOT, dir))) {
      const n = countViolations(fs.readFileSync(file, "utf-8"));
      if (n > 0) {
        perFile.push({ file: path.relative(ROOT, file), count: n });
        total += n;
      }
    }
  }
  perFile.sort((a, b) => b.count - a.count);
  return { total, perFile };
}

function main() {
  const { total, perFile } = measure();
  console.log(`rtlPhysicalClasses=${total}`);

  if (LIST) {
    for (const { file, count } of perFile.slice(0, 25)) {
      console.log(`  ${String(count).padStart(4)}  ${file}`);
    }
    console.log(`  ${perFile.length} file(s) affected`);
  }

  if (!RATCHET) return 0;

  let baseline;
  try {
    const json = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf-8"));
    baseline = json?.metrics?.rtlPhysicalClasses?.value;
  } catch (err) {
    // A measurement failure must not block, only a measured regression.
    if (!QUIET) console.log(`rtlPhysicalClasses=SKIP reason=baseline-unreadable (${err.message})`);
    return 0;
  }
  if (typeof baseline !== "number") {
    if (!QUIET) console.log("rtlPhysicalClasses=SKIP reason=baseline-absent");
    return 0;
  }
  if (total > baseline) {
    console.error(
      `RTL ratchet: ${total} physical directional classes, baseline ${baseline}. ` +
        `Use logical utilities (ms/me/ps/pe/start/end/text-start) so the layout ` +
        `mirrors under dir=rtl, or re-baseline with justification.`,
    );
    return 1;
  }
  if (!QUIET) console.log(`rtlPhysicalClasses OK (${total} <= ${baseline})`);
  return 0;
}

// Only run when invoked directly, so countViolations can be unit tested.
if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  process.exit(main());
}
