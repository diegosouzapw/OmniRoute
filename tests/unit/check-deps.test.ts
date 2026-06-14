import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
// @ts-expect-error — .mjs gate module has no type declarations
import {
  findUnapprovedDeps,
  discoverManifests,
  evaluateDepAge,
  auditNewDepsRegistry,
} from "../../scripts/check/check-deps.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("no unapproved deps when all are allowlisted", () => {
  assert.deepEqual(findUnapprovedDeps(["react", "next"], new Set(["react", "next", "zod"])), []);
});

test("flags a dependency not on the allowlist (potential slopsquat)", () => {
  assert.deepEqual(
    findUnapprovedDeps(["react", "reactt-router"], new Set(["react"])),
    ["reactt-router"]
  );
});

test("flags multiple new deps, preserves order, de-dupes", () => {
  assert.deepEqual(
    findUnapprovedDeps(["a", "b", "a", "c"], new Set(["a"])),
    ["b", "c"]
  );
});

// --- 6A.8: automatic workspace discovery ---

test("6A.8: discoverManifests finds root and workspace package.json files", () => {
  const manifests = discoverManifests(repoRoot);
  // Must include the root
  assert.ok(manifests.includes("package.json"), "root package.json must be included");
  // Must include known workspaces
  assert.ok(manifests.includes("electron/package.json"), "electron/package.json must be included");
  assert.ok(manifests.includes("open-sse/package.json"), "open-sse/package.json must be included");
  assert.ok(
    manifests.includes("@omniroute/opencode-plugin/package.json"),
    "@omniroute/opencode-plugin/package.json must be included"
  );
  assert.ok(
    manifests.includes("@omniroute/opencode-provider/package.json"),
    "@omniroute/opencode-provider/package.json must be included"
  );
});

test("6A.8: discoverManifests does NOT include node_modules, .next, or deep reference dirs", () => {
  const manifests = discoverManifests(repoRoot);
  for (const m of manifests) {
    assert.ok(!m.includes("node_modules"), `should not include node_modules: ${m}`);
    assert.ok(!m.includes(".next"), `should not include .next: ${m}`);
    assert.ok(!m.includes("_references"), `should not include _references: ${m}`);
    assert.ok(!m.includes("_mono_repo"), `should not include _mono_repo: ${m}`);
    assert.ok(!m.includes(".build"), `should not include .build: ${m}`);
    assert.ok(!m.includes(".claude"), `should not include .claude: ${m}`);
    assert.ok(!m.includes("dist-electron"), `should not include dist-electron: ${m}`);
  }
});

test("6A.8: all workspace package deps are in the allowlist (gate exits 0 with expanded scope)", () => {
  const allowlistPath = path.join(repoRoot, "dependency-allowlist.json");
  const allowlist = new Set(JSON.parse(fs.readFileSync(allowlistPath, "utf8")).allowed || []);
  const manifests = discoverManifests(repoRoot);
  const allDeps: string[] = [];
  for (const rel of manifests) {
    const abs = path.join(repoRoot, rel);
    if (!fs.existsSync(abs)) continue;
    const pkg = JSON.parse(fs.readFileSync(abs, "utf8"));
    allDeps.push(
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
      ...Object.keys(pkg.optionalDependencies || {}),
      ...Object.keys(pkg.peerDependencies || {})
    );
  }
  const unapproved = findUnapprovedDeps(allDeps, allowlist);
  assert.deepEqual(unapproved, [], `expected all deps to be approved, got: ${unapproved.join(", ")}`);
});

// --- 6A.8: stale-allowlist enforcement ---
// @ts-expect-error — reportStaleEntries from mjs
import { reportStaleEntries } from "../../scripts/check/lib/allowlist.mjs";

test("6A.8 stale: a dep removed from all manifests is detected as stale in allowlist", () => {
  // Simulate: allowlist has "removed-lib" but no manifest uses it.
  const stale = (reportStaleEntries as (a: string[], b: string[], c: string) => string[])(
    ["removed-lib", "react"],
    ["react"], // only "react" is live
    "check-deps"
  );
  assert.deepEqual(stale, ["removed-lib"]);
});

// ─── Task 7.8: evaluateDepAge (pure function) ─────────────────────────────────

test("7.8 evaluateDepAge: package older than 72h is OK", () => {
  const now = Date.now();
  const createdMs = now - 73 * 60 * 60 * 1000; // 73 hours ago
  const { ok, ageHours } = (evaluateDepAge as (a: number, b: number, c?: number) => { ok: boolean; ageHours: number })(
    createdMs,
    now
  );
  assert.ok(ok, "package older than 72h should be ok");
  assert.ok(ageHours >= 73, "ageHours should reflect elapsed time");
});

test("7.8 evaluateDepAge: package exactly at 72h boundary is OK (boundary inclusive)", () => {
  const now = Date.now();
  const createdMs = now - 72 * 60 * 60 * 1000; // exactly 72 hours ago
  const { ok } = (evaluateDepAge as (a: number, b: number, c?: number) => { ok: boolean; ageHours: number })(
    createdMs,
    now
  );
  assert.ok(ok, "package at exactly 72h should be ok (inclusive boundary)");
});

test("7.8 evaluateDepAge: package published 1h ago is NOT OK", () => {
  const now = Date.now();
  const createdMs = now - 1 * 60 * 60 * 1000; // 1 hour ago
  const { ok, ageHours } = (evaluateDepAge as (a: number, b: number, c?: number) => { ok: boolean; ageHours: number })(
    createdMs,
    now
  );
  assert.ok(!ok, "package published 1h ago should NOT be ok");
  assert.ok(ageHours < 72, "ageHours should reflect < 72h");
});

test("7.8 evaluateDepAge: respects custom minAgeHours", () => {
  const now = Date.now();
  const createdMs = now - 10 * 60 * 60 * 1000; // 10 hours ago
  // With 24h minimum, 10h-old package should fail
  const { ok: failWith24 } = (evaluateDepAge as (a: number, b: number, c?: number) => { ok: boolean; ageHours: number })(
    createdMs,
    now,
    24
  );
  assert.ok(!failWith24, "10h-old package should fail with 24h minimum");
  // With 6h minimum, 10h-old package should pass
  const { ok: passWith6 } = (evaluateDepAge as (a: number, b: number, c?: number) => { ok: boolean; ageHours: number })(
    createdMs,
    now,
    6
  );
  assert.ok(passWith6, "10h-old package should pass with 6h minimum");
});

test("7.8 evaluateDepAge: future timestamp (time.created in future) is NOT OK", () => {
  const now = Date.now();
  const createdMs = now + 1000; // 1s in future (clock skew edge case)
  const { ok, ageHours } = (evaluateDepAge as (a: number, b: number, c?: number) => { ok: boolean; ageHours: number })(
    createdMs,
    now
  );
  assert.ok(!ok, "future timestamp should not be ok");
  assert.ok(ageHours < 0, "ageHours should be negative for future timestamp");
});

// ─── Task 7.8: auditNewDepsRegistry (uses stubbed queryNpmRegistry) ───────────
// We test auditNewDepsRegistry by examining its logic with real deps that are
// known to exist and are old. The pure evaluateDepAge covers the age logic above.
// For auditNewDepsRegistry we test the aggregation/routing logic by noting that:
//   - an empty dep list → all empty results
//   - any real npm package like "react" is found and old → does NOT appear in any list

test("7.8 auditNewDepsRegistry: empty dep list returns all-empty results", () => {
  const result = (auditNewDepsRegistry as (deps: string[], minAge?: number, now?: number) => {
    notFound: string[];
    tooNew: Array<{ name: string; ageHours: number }>;
    offline: string[];
  })([], 72, Date.now());
  assert.deepEqual(result.notFound, []);
  assert.deepEqual(result.tooNew, []);
  assert.deepEqual(result.offline, []);
});
