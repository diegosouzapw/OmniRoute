/**
 * Source hygiene guard: no source file may embed a raw NUL byte (U+0000).
 *
 * Four files carried the NUL separator of a cache/group key as a literal byte
 * instead of the `\u0000` escape the rest of the codebase uses
 * (catalogDedupe.ts, providerHealthMatrix.ts, ModelCompatPopover.tsx). The
 * runtime value is identical, but the raw byte flips git's, GitHub's and
 * ripgrep's binary heuristics: `git diff --numstat` reports `-  -`, the PR
 * diff on GitHub is shown as "Binary file not shown" (the introducing commits
 * expose no `patch` for those files through the REST API), and `rg` skips the
 * files entirely in recursive mode. The NUL as a *value* is fine; only the
 * *encoding* in the source text is wrong.
 *
 * The first test pins the encoding. The other two pin the behaviour the NUL
 * separator exists for (keys that would collide under plain concatenation
 * must stay distinct) so the escape-form rewrite is provably behaviour-neutral.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const SCAN_DIRS = ["src", "open-sse", "tests"];
const EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".md"]);
const IGNORE_DIR_NAMES = new Set(["node_modules", ".next", "dist", "build", ".git"]);

function walk(dir: string, out: string[]): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORE_DIR_NAMES.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (EXTENSIONS.has(path.extname(entry.name))) out.push(full);
  }
}

function rawNulLocations(file: string): string[] {
  const bytes = fs.readFileSync(file);
  if (!bytes.includes(0)) return [];
  const locations: string[] = [];
  let line = 1;
  for (let i = 0; i < bytes.length; i++) {
    const byte = bytes[i];
    if (byte === 0x00) locations.push(`${path.relative(ROOT, file)}:${line}`);
    else if (byte === 0x0a) line++;
  }
  return locations;
}

test("no source file under src/, open-sse/ or tests/ contains a raw NUL byte", () => {
  const files: string[] = [];
  for (const dir of SCAN_DIRS) {
    const abs = path.join(ROOT, dir);
    if (fs.existsSync(abs)) walk(abs, files);
  }
  assert.ok(files.length > 100, `expected to scan the source tree, scanned ${files.length} files`);

  const offenders = files.flatMap(rawNulLocations).sort();
  assert.deepEqual(
    offenders,
    [],
    `raw NUL bytes make git/GitHub/ripgrep treat the file as binary; write the separator as "\\u0000" instead:\n  ${offenders.join("\n  ")}`
  );
});

test("serviceKindIndex memo key keeps (providerId, declared) pairs distinct that plain concatenation would merge", async () => {
  const { getProviderServiceKinds } = await import("../../src/lib/providers/serviceKindIndex.ts");
  // "openai" + "llm" and "openaillm" + "" concatenate to the same string; the NUL separator
  // must keep them apart, otherwise the second call would hit the first call's memo entry.
  const openai = getProviderServiceKinds("openai", ["llm"]);
  const unknown = getProviderServiceKinds("openaillm", undefined);
  assert.ok(openai.includes("llm"));
  assert.ok(!unknown.includes("llm"), "memo entry leaked across a colliding key");
  assert.notDeepEqual(openai, unknown);
});

test("videoBridgePromotionAggregator groups (caseId, model) pairs distinct that plain concatenation would merge", async () => {
  const { aggregatePromotionObservations } =
    await import("../../src/lib/guardrails/videoBridgePromotionAggregator.ts");
  const aggregates = aggregatePromotionObservations([
    { caseId: "c1", metrics: { latencyMs: 100 }, model: "m1" },
    { caseId: "c", metrics: { latencyMs: 200 }, model: "1m1" },
  ]);
  assert.equal(
    aggregates.length,
    2,
    "two observations with colliding concatenated keys must form two groups"
  );
  assert.deepEqual(aggregates.map((a) => [a.caseId, a.model, a.sampleCount]).sort(), [
    ["c", "1m1", 1],
    ["c1", "m1", 1],
  ]);
});
