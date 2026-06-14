/**
 * Integration tests for Agent Skills discovery.
 *
 * Verifies:
 *  1. Every ID in API_SKILL_IDS + CLI_SKILL_IDS has a skills/<id>/SKILL.md on disk.
 *  2. Each SKILL.md has valid frontmatter (name + description) and body ≥ 100 chars.
 *  3. MCP tool omniroute_agent_skills_list handler returns 43 entries.
 *  4. A2A skill list-capabilities returns 1 artifact with 43 lines.
 *
 * Does NOT spin up a server — tests handlers directly via imports.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// Dynamic imports for ESM + tsx compatibility
const { API_SKILL_IDS, CLI_SKILL_IDS } = await import("../../src/lib/agentSkills/catalog.ts");
const { agentSkillTools } = await import("../../open-sse/mcp-server/tools/agentSkillTools.ts");
const { executeListCapabilities } = await import("../../src/lib/a2a/skills/listCapabilities.ts");
import type { A2ATask } from "../../src/lib/a2a/taskManager.ts";

const SKILLS_DIR = path.resolve(process.cwd(), "skills");

// ── Frontmatter parser (mirrors catalog.ts parseMarkdownFrontmatter) ─────────

function parseSkillMarkdown(content: string): { name: string; description: string; body: string } {
  const FM_REGEX = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = FM_REGEX.exec(content);
  if (!match) return { name: "", description: "", body: content };
  const yamlBlock = match[1];
  const body = match[2] ?? "";
  const nameMatch = /^name:\s*(.+)$/m.exec(yamlBlock);
  const descMatch = /^description:\s*(.+)$/m.exec(yamlBlock);
  return {
    name: nameMatch ? nameMatch[1].trim().replace(/^["']|["']$/g, "") : "",
    description: descMatch ? descMatch[1].trim().replace(/^["']|["']$/g, "") : "",
    body,
  };
}

// ── §1: Filesystem — every skill ID has a SKILL.md ───────────────────────────

const ALL_IDS = [...API_SKILL_IDS, ...CLI_SKILL_IDS] as string[];

test("skills/ directory exists and is readable", () => {
  assert.ok(fs.existsSync(SKILLS_DIR), `skills/ directory not found at ${SKILLS_DIR}`);
});

test("every API skill ID has skills/<id>/SKILL.md on disk", () => {
  const missing: string[] = [];
  for (const id of API_SKILL_IDS) {
    const skillPath = path.join(SKILLS_DIR, id, "SKILL.md");
    if (!fs.existsSync(skillPath)) {
      missing.push(id);
    }
  }
  assert.deepEqual(missing, [], `Missing API SKILL.md files: ${missing.join(", ")}`);
});

test("every CLI skill ID has skills/<id>/SKILL.md on disk", () => {
  const missing: string[] = [];
  for (const id of CLI_SKILL_IDS) {
    const skillPath = path.join(SKILLS_DIR, id, "SKILL.md");
    if (!fs.existsSync(skillPath)) {
      missing.push(id);
    }
  }
  assert.deepEqual(missing, [], `Missing CLI SKILL.md files: ${missing.join(", ")}`);
});

test("total skill count is exactly 42 (22 API + 20 CLI)", () => {
  assert.equal(API_SKILL_IDS.length + CLI_SKILL_IDS.length, 42);
});

// ── §2: Frontmatter validation ────────────────────────────────────────────────

test("each SKILL.md has non-empty name in frontmatter", () => {
  const failures: string[] = [];
  for (const id of ALL_IDS) {
    const skillPath = path.join(SKILLS_DIR, id, "SKILL.md");
    if (!fs.existsSync(skillPath)) continue; // covered by disk test above
    const content = fs.readFileSync(skillPath, "utf-8");
    const { name } = parseSkillMarkdown(content);
    if (!name || name.length === 0) {
      failures.push(id);
    }
  }
  assert.deepEqual(failures, [], `SKILL.md files with empty name: ${failures.join(", ")}`);
});

test("each SKILL.md has non-empty description in frontmatter", () => {
  const failures: string[] = [];
  for (const id of ALL_IDS) {
    const skillPath = path.join(SKILLS_DIR, id, "SKILL.md");
    if (!fs.existsSync(skillPath)) continue;
    const content = fs.readFileSync(skillPath, "utf-8");
    const { description } = parseSkillMarkdown(content);
    if (!description || description.length === 0) {
      failures.push(id);
    }
  }
  assert.deepEqual(failures, [], `SKILL.md files with empty description: ${failures.join(", ")}`);
});

test("each SKILL.md body is at least 100 chars", () => {
  const failures: Array<{ id: string; len: number }> = [];
  for (const id of ALL_IDS) {
    const skillPath = path.join(SKILLS_DIR, id, "SKILL.md");
    if (!fs.existsSync(skillPath)) continue;
    const content = fs.readFileSync(skillPath, "utf-8");
    const { body } = parseSkillMarkdown(content);
    if (body.length < 100) {
      failures.push({ id, len: body.length });
    }
  }
  const msg = failures.map((f) => `${f.id}(${f.len})`).join(", ");
  assert.deepEqual(failures, [], `SKILL.md files with body < 100 chars: ${msg}`);
});

// ── §3: MCP tool omniroute_agent_skills_list ─────────────────────────────────

test("MCP omniroute_agent_skills_list handler returns count 43", async () => {
  const result = await agentSkillTools.omniroute_agent_skills_list.handler({});
  assert.equal(result.count, 43, `Expected 43 but got ${result.count}`);
  assert.ok(Array.isArray(result.skills));
  assert.equal(result.skills.length, 43);
});

test("MCP omniroute_agent_skills_list result has all 42 IDs", async () => {
  const result = await agentSkillTools.omniroute_agent_skills_list.handler({});
  const returnedIds = new Set(result.skills.map((s: { id: string }) => s.id));
  for (const id of ALL_IDS) {
    assert.ok(returnedIds.has(id), `MCP result missing skill ID: ${id}`);
  }
});

// ── §4: A2A list-capabilities ────────────────────────────────────────────────

const stubTask = {} as A2ATask;

test("A2A list-capabilities returns exactly 1 artifact", async () => {
  const result = await executeListCapabilities(stubTask);
  assert.equal(result.artifacts.length, 1, "Expected exactly 1 artifact");
  assert.equal(result.artifacts[0].type, "text", "Artifact type should be 'text'");
});

test("A2A list-capabilities artifact content contains 42 skill IDs as table rows", async () => {
  const result = await executeListCapabilities(stubTask);
  const content = result.artifacts[0].content;
  const rows = content.split("\n").filter((line) => line.startsWith("| ") && !line.startsWith("| ID") && !line.startsWith("| ---"));
  // Each skill row starts with "| <id> |"
  assert.ok(
    rows.length >= 42,
    `Expected at least 42 data rows but got ${rows.length}`,
  );
});

test("A2A list-capabilities metadata.totalSkills === 43", async () => {
  const result = await executeListCapabilities(stubTask);
  assert.equal(result.metadata.totalSkills, 43);
});

test("A2A list-capabilities artifact contains all 42 skill IDs", async () => {
  const result = await executeListCapabilities(stubTask);
  const content = result.artifacts[0].content;
  const missing: string[] = [];
  for (const id of ALL_IDS) {
    if (!content.includes(id)) {
      missing.push(id);
    }
  }
  assert.deepEqual(missing, [], `A2A artifact missing skill IDs: ${missing.join(", ")}`);
});
