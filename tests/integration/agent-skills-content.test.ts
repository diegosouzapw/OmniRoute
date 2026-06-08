/**
 * Integration tests for Agent Skills content integrity.
 *
 * Verifies:
 *  1. All 43 skill IDs from catalog have skills/{id}/ folder with SKILL.md.
 *  2. Zero omniroute-* folders remain (post-prune: old omniroute-* skill dirs were removed).
 *  3. 10 specific IDs have <!-- skill:custom-start --> ... <!-- skill:custom-end --> blocks:
 *     omni-mcp, omni-compression, cli-providers, cli-eval, omni-agents-a2a,
 *     omni-combos-routing, omni-auth, omni-resilience, omni-inference, cli-serve.
 *
 * Does NOT spin up a server.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const { API_SKILL_IDS, CLI_SKILL_IDS, CONFIG_SKILL_IDS } = await import("../../src/lib/agentSkills/catalog.ts");

const SKILLS_DIR = path.resolve(process.cwd(), "skills");
const ALL_IDS = [...API_SKILL_IDS, ...CLI_SKILL_IDS, ...CONFIG_SKILL_IDS] as string[];

// IDs that must have a custom block
const CUSTOM_BLOCK_IDS = [
  "omni-mcp",
  "omni-compression",
  "cli-providers",
  "cli-eval",
  "omni-agents-a2a",
  "omni-combos-routing",
  "omni-auth",
  "omni-resilience",
  "omni-inference",
  "cli-serve",
  "omni-providers",
] as const;

// ── §1: All 42 catalog IDs have skills/{id}/SKILL.md ─────────────────────────

test("all 43 catalog IDs have a skills/{id}/ directory", () => {
  const missing: string[] = [];
  for (const id of ALL_IDS) {
    const dirPath = path.join(SKILLS_DIR, id);
    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
      missing.push(id);
    }
  }
  assert.deepEqual(missing, [], `Missing skill directories: ${missing.join(", ")}`);
});

test("all 43 catalog IDs have a skills/{id}/SKILL.md file", () => {
  const missing: string[] = [];
  for (const id of ALL_IDS) {
    const skillPath = path.join(SKILLS_DIR, id, "SKILL.md");
    if (!fs.existsSync(skillPath)) {
      missing.push(id);
    }
  }
  assert.deepEqual(missing, [], `Missing SKILL.md files: ${missing.join(", ")}`);
});

// ── §2: No omniroute-* directories remain ────────────────────────────────────

test("skills/ has zero omniroute-* directories (all pruned)", () => {
  if (!fs.existsSync(SKILLS_DIR)) {
    // If skills dir doesn't exist at all, nothing to prune
    return;
  }
  const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
  const omniRouteDirs = entries
    .filter((e) => e.isDirectory() && e.name.startsWith("omniroute-"))
    .map((e) => e.name);
  assert.deepEqual(
    omniRouteDirs,
    [],
    `Found omniroute-* directories that should have been pruned: ${omniRouteDirs.join(", ")}`,
  );
});

test("skills/ directory only contains expected catalog IDs plus README", () => {
  if (!fs.existsSync(SKILLS_DIR)) return;
  const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory()).map((e) => e.name);
  const expectedSet = new Set(ALL_IDS);
  const unexpected = dirs.filter((d) => !expectedSet.has(d));
  assert.deepEqual(
    unexpected,
    [],
    `Unexpected directories in skills/: ${unexpected.join(", ")}`,
  );
});

// ── §3: 10 specific IDs have custom blocks ───────────────────────────────────

for (const id of CUSTOM_BLOCK_IDS) {
  test(`skills/${id}/SKILL.md has <!-- skill:custom-start --> block`, () => {
    const skillPath = path.join(SKILLS_DIR, id, "SKILL.md");
    assert.ok(
      fs.existsSync(skillPath),
      `skills/${id}/SKILL.md does not exist`,
    );
    const content = fs.readFileSync(skillPath, "utf-8");
    assert.ok(
      content.includes("<!-- skill:custom-start -->"),
      `skills/${id}/SKILL.md missing <!-- skill:custom-start --> block`,
    );
    assert.ok(
      content.includes("<!-- skill:custom-end -->"),
      `skills/${id}/SKILL.md missing <!-- skill:custom-end --> block`,
    );
  });
}

// ── Additional integrity checks ───────────────────────────────────────────────

test("exactly 11 skills have custom blocks", () => {
  const withCustomBlocks: string[] = [];
  for (const id of ALL_IDS) {
    const skillPath = path.join(SKILLS_DIR, id, "SKILL.md");
    if (!fs.existsSync(skillPath)) continue;
    const content = fs.readFileSync(skillPath, "utf-8");
    if (content.includes("<!-- skill:custom-start -->")) {
      withCustomBlocks.push(id);
    }
  }
  // Verify exactly the expected 10 IDs have custom blocks
  const expectedIds = [...CUSTOM_BLOCK_IDS].sort();
  assert.deepEqual(
    withCustomBlocks.sort(),
    expectedIds,
    `Expected exactly these 11 custom-block IDs: ${expectedIds.join(", ")}\nActual: ${withCustomBlocks.join(", ")}`,
  );
});

test("no skill has custom-start without custom-end (unclosed blocks)", () => {
  const unclosed: string[] = [];
  for (const id of ALL_IDS) {
    const skillPath = path.join(SKILLS_DIR, id, "SKILL.md");
    if (!fs.existsSync(skillPath)) continue;
    const content = fs.readFileSync(skillPath, "utf-8");
    const hasStart = content.includes("<!-- skill:custom-start -->");
    const hasEnd = content.includes("<!-- skill:custom-end -->");
    if (hasStart !== hasEnd) {
      unclosed.push(id);
    }
  }
  assert.deepEqual(unclosed, [], `Skills with unclosed custom blocks: ${unclosed.join(", ")}`);
});
