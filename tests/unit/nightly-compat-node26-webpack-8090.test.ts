/**
 * Regression guard for #8090 — "nightly-compat: Node 24/26 build failures".
 *
 * Class 2 of the triage (the live item): the `compat-build-26` job in
 * .github/workflows/nightly-compat.yml is the ONLY place in the entire CI matrix
 * that runs `npm run build` on Node 26 (ci.yml pins CI_NODE_VERSION=24). Every
 * nightly it failed with the runner-reclaimed signature — "The runner has received
 * a shutdown signal" / "The operation was canceled", no exit code, always at the
 * same Turbopack compile phase — the classic OOM-kill pattern on the
 * memory-constrained ubuntu-latest runner.
 *
 * Turbopack's native (Rust, off-V8-heap) allocation is NOT bounded by
 * --max-old-space-size and peaks far higher than webpack on OmniRoute's large module
 * graph (#6409), heavier still under Node 26. The codebase's own documented escape
 * hatch for RAM-constrained environments is the webpack fallback
 * (OMNIROUTE_USE_TURBOPACK=0; see docs/reference/ENVIRONMENT.md). The fix wires that
 * fallback into the Node 26 compat build so it still validates the app *builds* on
 * Node 26 without OOMing the runner.
 *
 * This guard asserts the compat-build-26 job keeps the webpack fallback so a future
 * edit cannot silently flip it back to the OOM-prone Turbopack path.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function extractJobBlock(yaml: string, jobName: string): string {
  const lines = yaml.split("\n");
  // Job keys live at 2-space indentation under `jobs:`.
  const startIdx = lines.findIndex((l) => new RegExp(`^  ${jobName}:\\s*$`).test(l));
  assert.ok(startIdx !== -1, `nightly-compat.yml must define the ${jobName} job`);
  const block: string[] = [];
  for (let i = startIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    // Next 2-space-indented key ends the block (but blank lines / deeper indent stay).
    if (/^  \S/.test(line)) break;
    block.push(line);
  }
  return block.join("\n");
}

test("#8090 compat-build-26 uses the webpack fallback (OMNIROUTE_USE_TURBOPACK=0) to avoid Node 26 OOM", () => {
  const wf = fs.readFileSync(
    path.join(repoRoot, ".github/workflows/nightly-compat.yml"),
    "utf-8"
  );
  const jobBlock = extractJobBlock(wf, "compat-build-26");

  assert.match(
    jobBlock,
    /npm run build/,
    "compat-build-26 must still run the production build on Node 26"
  );
  assert.match(
    jobBlock,
    /OMNIROUTE_USE_TURBOPACK:\s*["']0["']/,
    "compat-build-26 must set OMNIROUTE_USE_TURBOPACK=0 (webpack fallback) so the sole " +
      "Node 26 build does not OOM the runner on Turbopack's unbounded native memory (#8090/#6409)"
  );
});
