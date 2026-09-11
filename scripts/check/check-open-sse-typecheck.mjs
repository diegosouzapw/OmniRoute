#!/usr/bin/env node
// scripts/check/check-open-sse-typecheck.mjs
// open-sse workspace typecheck gate (#8781).
//
// The open-sse workspace declares path aliases (e.g. `@/*` → `../src/*`) in its own
// tsconfig.json, but those aliases are not resolvable by Node's bare module resolution —
// they only work because Next.js/Turbopack bundles the entire tree. Additionally,
// package.json historically declared `main`/`exports` entries that do not exist on disk.
//
// This gate runs `tsc -p open-sse/tsconfig.json` and diffs the result against a frozen
// per-file/per-TS-code count baseline (config/quality/open-sse-typecheck-baseline.json),
// following this repo's stale-enforcement allowlist convention. A live count that EXCEEDS
// the baselined count for a given (file, TS code) pair is a regression and fails the gate;
// a live count that is lower is an improvement and does not fail (use --update to ratchet
// the baseline down).
//
// Run:
//   node scripts/check/check-open-sse-typecheck.mjs
//   node scripts/check/check-open-sse-typecheck.mjs --update   # re-freeze baseline

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { diffAgainstBaseline, parseTscOutput } from "./typecheckBaseline.mjs";

export { diffAgainstBaseline, parseTscOutput } from "./typecheckBaseline.mjs";

const ROOT = process.cwd();
const TSCONFIG = path.join(ROOT, "open-sse", "tsconfig.json");
const BASELINE_PATH = path.join(ROOT, "config/quality/open-sse-typecheck-baseline.json");
const UPDATE = process.argv.includes("--update");

function runTsc() {
  try {
    const stdout = execFileSync(
      process.platform === "win32" ? "npx.cmd" : "npx",
      ["tsc", "--pretty", "false", "--noEmit", "-p", TSCONFIG],
      { encoding: "utf8", maxBuffer: 64 * 1024 * 1024, cwd: ROOT }
    );
    return stdout;
  } catch (err) {
    // tsc exits non-zero when there are type errors — stdout still has the report.
    if (err.stdout) return String(err.stdout);
    throw err;
  }
}

function loadBaseline() {
  if (!fs.existsSync(BASELINE_PATH)) return {};
  return JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));
}

function writeBaseline(counts) {
  fs.writeFileSync(BASELINE_PATH, JSON.stringify(counts, null, 2) + "\n");
}

function main() {
  if (!fs.existsSync(TSCONFIG)) {
    process.stderr.write(`[open-sse-typecheck] FAIL — tsconfig not found at ${TSCONFIG}\n`);
    process.exit(2);
  }

  console.log("[open-sse-typecheck] Running tsc scoped to open-sse/ workspace…");
  const stdout = runTsc();
  const live = parseTscOutput(stdout);
  const baseline = loadBaseline();
  const { regressions, improvements } = diffAgainstBaseline(live, baseline);

  const liveErrorCount = Object.values(live).reduce(
    (sum, codes) => sum + Object.values(codes).reduce((s, c) => s + c, 0),
    0
  );
  console.log(`openSseTypecheckErrors=${liveErrorCount}`);

  if (UPDATE) {
    writeBaseline(live);
    console.log(`[open-sse-typecheck] baseline rewritten (${liveErrorCount} errors frozen).`);
    process.exit(0);
  }

  if (improvements.length > 0) {
    console.log(
      `[open-sse-typecheck] ${improvements.length} baselined error(s) no longer present ` +
        `— run 'node scripts/check/check-open-sse-typecheck.mjs --update' to ratchet the baseline down:\n` +
        improvements
          .map(
            (i) => `  - ${i.file} ${i.code} (baseline ${i.baselineCount} -> live ${i.liveCount})`
          )
          .join("\n")
    );
  }

  if (regressions.length > 0) {
    process.stderr.write(
      `[open-sse-typecheck] FAIL — ${regressions.length} new/regressed TypeScript error(s) ` +
        `under open-sse/ workspace not covered by the frozen baseline:\n` +
        regressions
          .map((r) => `  ✗ ${r.file} ${r.code} (baseline ${r.baselineCount}, live ${r.liveCount})`)
          .join("\n") +
        `\n\nIf this is a genuine new open-sse type error (e.g. an undeclared @/ alias),\n` +
        `fix it in the source, not in the baseline.\n` +
        `If it's pre-existing type looseness you're intentionally not fixing in this PR,\n` +
        `do NOT widen the baseline for new regressions — that defeats the gate.\n`
    );
    process.exit(1);
  }

  console.log(
    `[open-sse-typecheck] OK — ${liveErrorCount} pre-existing error(s), all within frozen baseline.`
  );
  process.exit(0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  main();
}
