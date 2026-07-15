#!/usr/bin/env node
/**
 * balance-e2e-shards — duration-aware LPT bin-packing for the Playwright matrix (WS4.1).
 *
 * Playwright's --shard=N/M distributes by COUNT (per file with fullyParallel:false),
 * blind to duration — measured skew on the 9-shard matrix: worst 24m47s vs best 1m47s
 * (14×), putting E2E on the CI critical path. This script assigns spec FILES to shards
 * by weight (Longest Processing Time greedy: heaviest first, always into the lightest
 * shard) using config/quality/e2e-timings.json, and prints shard N's files (one per
 * line) for `npx playwright test $FILES`.
 *
 * Safety: the union of all shards is verified to equal the discovered spec list —
 * losing a spec silently would hollow the suite. Any inconsistency (or a missing
 * timings file) exits non-zero so the CI step falls back to plain --shard=N/M.
 *
 * Weights are RELATIVE (unitless). The seed uses LOC as a proxy; regenerate from real
 * durations by editing config/quality/e2e-timings.json (see its _meta note).
 */
import fs from "node:fs";
import path from "node:path";

const E2E_DIR = path.join("tests", "e2e");
const TIMINGS_PATH = path.join("config", "quality", "e2e-timings.json");

/**
 * LPT greedy assignment. Deterministic: weight desc, then filename asc; ties on
 * shard totals resolve to the lowest shard index.
 * @param {{file: string, weight: number}[]} items
 * @param {number} shardCount
 * @returns {{files: string[], total: number}[]}
 */
export function lptAssign(items, shardCount) {
  const shards = Array.from({ length: shardCount }, () => ({ files: [], total: 0 }));
  const sorted = [...items].sort(
    (a, b) => b.weight - a.weight || a.file.localeCompare(b.file)
  );
  for (const item of sorted) {
    let target = shards[0];
    for (const s of shards) if (s.total < target.total) target = s;
    target.files.push(item.file);
    target.total += item.weight;
  }
  return shards;
}

/**
 * Weight lookup with a median fallback so a NEW spec (no timing yet) lands mid-pack
 * instead of skewing a shard.
 * @param {string[]} files basenames
 * @param {Record<string, number>} timings
 */
export function weightItems(files, timings) {
  const known = Object.entries(timings)
    .filter(([k]) => !k.startsWith("_"))
    .map(([, v]) => v)
    .filter((v) => Number.isFinite(v) && v > 0)
    .sort((a, b) => a - b);
  const median = known.length ? known[Math.floor(known.length / 2)] : 1;
  return files.map((file) => ({
    file,
    weight: Number.isFinite(timings[file]) && timings[file] > 0 ? timings[file] : median,
  }));
}

function main() {
  const shard = Number(process.argv[2]);
  const total = Number(process.argv[3]);
  if (!Number.isInteger(shard) || !Number.isInteger(total) || shard < 1 || shard > total) {
    console.error("usage: node scripts/quality/balance-e2e-shards.mjs <shard> <totalShards>");
    process.exit(2);
  }
  if (!fs.existsSync(TIMINGS_PATH)) {
    console.error(`[e2e-balance] ${TIMINGS_PATH} missing — caller should fall back to --shard`);
    process.exit(3);
  }
  const timings = JSON.parse(fs.readFileSync(TIMINGS_PATH, "utf8"));
  const files = fs
    .readdirSync(E2E_DIR)
    .filter((f) => f.endsWith(".spec.ts"))
    .sort();
  if (!files.length) {
    console.error(`[e2e-balance] no specs found under ${E2E_DIR}`);
    process.exit(3);
  }
  const shards = lptAssign(weightItems(files, timings), total);
  const assigned = shards.flatMap((s) => s.files).sort();
  if (assigned.length !== files.length || assigned.some((f, i) => f !== files[i])) {
    console.error("[e2e-balance] INTERNAL: shard union != discovered specs — falling back");
    process.exit(3);
  }
  process.stdout.write(
    shards[shard - 1].files.map((f) => path.join(E2E_DIR, f)).join("\n") + "\n"
  );
}

const isDirectRun =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);
if (isDirectRun) main();
