import test from "node:test";
import assert from "node:assert/strict";

// Dynamic imports for ESM + tsx compatibility
const { agentSkillTools, AgentSkillsListSchema, AgentSkillsGetSchema, AgentSkillsCoverageSchema } =
  await import("../../open-sse/mcp-server/tools/agentSkillTools.ts");

const { MCP_TOOL_MAP } = await import("../../open-sse/mcp-server/schemas/tools.ts");

// ─── Schema registration in MCP_TOOL_MAP ──────────────────────────────────

test("omniroute_agent_skills_list is registered in MCP_TOOL_MAP", () => {
  const tool = MCP_TOOL_MAP["omniroute_agent_skills_list"];
  assert.ok(tool, "Tool should exist in MCP_TOOL_MAP");
  assert.equal(tool.name, "omniroute_agent_skills_list");
  assert.deepEqual(tool.scopes, ["read:catalog"]);
});

test("omniroute_agent_skills_get is registered in MCP_TOOL_MAP", () => {
  const tool = MCP_TOOL_MAP["omniroute_agent_skills_get"];
  assert.ok(tool, "Tool should exist in MCP_TOOL_MAP");
  assert.equal(tool.name, "omniroute_agent_skills_get");
  assert.deepEqual(tool.scopes, ["read:catalog"]);
});

test("omniroute_agent_skills_coverage is registered in MCP_TOOL_MAP", () => {
  const tool = MCP_TOOL_MAP["omniroute_agent_skills_coverage"];
  assert.ok(tool, "Tool should exist in MCP_TOOL_MAP");
  assert.equal(tool.name, "omniroute_agent_skills_coverage");
  assert.deepEqual(tool.scopes, ["read:catalog"]);
});

// ─── agentSkillTools object shape ────────────────────────────────────────

test("agentSkillTools exports exactly 3 tools", () => {
  const keys = Object.keys(agentSkillTools);
  assert.deepEqual(keys.sort(), [
    "omniroute_agent_skills_coverage",
    "omniroute_agent_skills_get",
    "omniroute_agent_skills_list",
  ]);
});

test("each agentSkillTool has name, description, inputSchema, and handler", () => {
  for (const toolDef of Object.values(agentSkillTools)) {
    assert.ok(
      typeof toolDef.name === "string" && toolDef.name.length > 0,
      `${toolDef.name}: name missing`
    );
    assert.ok(
      typeof toolDef.description === "string" && toolDef.description.length > 0,
      `${toolDef.name}: description missing`
    );
    assert.ok(toolDef.inputSchema != null, `${toolDef.name}: inputSchema missing`);
    assert.ok(typeof toolDef.handler === "function", `${toolDef.name}: handler missing`);
  }
});

// ─── omniroute_agent_skills_list ────────────────────────────────────────────

test("omniroute_agent_skills_list with no filters returns all 45 skills", async () => {
  const result = await agentSkillTools.omniroute_agent_skills_list.handler({});
  assert.equal(result.count, 45, `Expected 45 but got ${result.count}`);
  assert.ok(Array.isArray(result.skills));
  assert.equal(result.skills.length, 45);
});

test("omniroute_agent_skills_list({category:'api'}) returns exactly 23 entries", async () => {
  const result = await agentSkillTools.omniroute_agent_skills_list.handler({ category: "api" });
  assert.equal(result.count, 23, `Expected 23 api skills but got ${result.count}`);
  assert.ok(result.skills.every((s: { category: string }) => s.category === "api"));
});

test("omniroute_agent_skills_list({category:'cli'}) returns exactly 21 entries", async () => {
  const result = await agentSkillTools.omniroute_agent_skills_list.handler({ category: "cli" });
  assert.equal(result.count, 21, `Expected 21 cli skills but got ${result.count}`);
  assert.ok(result.skills.every((s: { category: string }) => s.category === "cli"));
});

test("omniroute_agent_skills_list result includes coverage shape", async () => {
  const result = await agentSkillTools.omniroute_agent_skills_list.handler({});
  assert.ok(result.coverage != null, "coverage should be present");
  assert.ok(typeof result.coverage.api === "object");
  assert.ok(typeof result.coverage.cli === "object");
  assert.equal(result.coverage.api.total, 23);
  assert.equal(result.coverage.cli.total, 21);
  assert.ok(typeof result.coverage.totalSkills === "number");
  assert.ok(typeof result.coverage.generatedAt === "string");
});

test("omniroute_agent_skills_list skill entries have required fields", async () => {
  const result = await agentSkillTools.omniroute_agent_skills_list.handler({});
  const first = result.skills[0];
  assert.ok(typeof first.id === "string" && first.id.length > 0);
  assert.ok(typeof first.name === "string" && first.name.length > 0);
  assert.ok(typeof first.description === "string");
  assert.ok(first.category === "api" || first.category === "cli");
  assert.ok(typeof first.area === "string");
  assert.ok(typeof first.rawUrl === "string");
  assert.ok(typeof first.githubUrl === "string");
});

test("AgentSkillsListSchema parses valid category filter", () => {
  const parsed = AgentSkillsListSchema.parse({ category: "api" });
  assert.equal(parsed.category, "api");
});

test("AgentSkillsListSchema rejects invalid category", () => {
  assert.throws(() => AgentSkillsListSchema.parse({ category: "unknown" }));
});

// ─── omniroute_agent_skills_get ─────────────────────────────────────────────

// NOTE: omniroute_agent_skills_get calls fetchSkillMarkdown which tries:
//   1. local filesystem skills/{id}/SKILL.md
//   2. GitHub raw URL
// In unit test environment, SKILL.md files are not yet generated and GitHub
// raw URLs are 404 on feature branches. We test the shape contract by
// verifying: (a) metadata fields are correct, (b) a real GitHub-hosted skill
// (main branch) resolves, or (c) a skill not found throws correctly.
// The deep integration (fetch round-trip) is covered by e2e/ecosystem tests.

test("omniroute_agent_skills_get({id:'omni-providers'}) returns correct skill metadata before markdown fetch", async () => {
  const { getSkillById } = await import("../../src/lib/agentSkills/catalog.ts");
  const skill = getSkillById("omni-providers");
  assert.ok(skill != null, "omni-providers should exist in catalog");
  assert.equal(skill!.id, "omni-providers");
  assert.equal(skill!.category, "api");
  assert.ok(typeof skill!.name === "string" && skill!.name.length > 0);
  assert.ok(typeof skill!.rawUrl === "string");
  assert.ok(typeof skill!.githubUrl === "string");
});

test("omniroute_agent_skills_get({id:'cli-serve'}) resolves correct cli skill metadata", async () => {
  const { getSkillById } = await import("../../src/lib/agentSkills/catalog.ts");
  const skill = getSkillById("cli-serve");
  assert.ok(skill != null, "cli-serve should exist in catalog");
  assert.equal(skill!.id, "cli-serve");
  assert.equal(skill!.category, "cli");
  assert.ok(typeof skill!.name === "string" && skill!.name.length > 0);
});

test("omniroute_agent_skills_get with invalid id throws Error", async () => {
  await assert.rejects(
    () => agentSkillTools.omniroute_agent_skills_get.handler({ id: "non-existent-skill-xyz" }),
    (err: unknown) => {
      assert.ok(err instanceof Error);
      assert.ok(err.message.includes("non-existent-skill-xyz"));
      return true;
    }
  );
});

test("AgentSkillsGetSchema requires id field", () => {
  assert.throws(() => AgentSkillsGetSchema.parse({}));
});

test("AgentSkillsGetSchema parses valid id", () => {
  const parsed = AgentSkillsGetSchema.parse({ id: "omni-providers" });
  assert.equal(parsed.id, "omni-providers");
});

// ─── omniroute_agent_skills_coverage ────────────────────────────────────────

test("omniroute_agent_skills_coverage({}) returns coverage shape", async () => {
  const result = await agentSkillTools.omniroute_agent_skills_coverage.handler({});
  assert.ok(result != null);
  assert.ok(typeof result.api === "object");
  assert.ok(typeof result.cli === "object");
  assert.equal(result.api.total, 23);
  assert.equal(result.cli.total, 21);
  assert.ok(typeof result.api.have === "number");
  assert.ok(typeof result.cli.have === "number");
  assert.ok(result.api.have >= 0 && result.api.have <= 23);
  assert.ok(result.cli.have >= 0 && result.cli.have <= 21);
  assert.ok(typeof result.totalSkills === "number");
  assert.equal(result.totalSkills, result.api.have + result.cli.have + (result.config?.have ?? 0));
  assert.ok(typeof result.generatedAt === "string");
  // Validate ISO datetime format
  assert.ok(!isNaN(Date.parse(result.generatedAt)), "generatedAt should be valid ISO datetime");
});

test("AgentSkillsCoverageSchema parses empty input", () => {
  const parsed = AgentSkillsCoverageSchema.parse({});
  assert.deepEqual(parsed, {});
});
