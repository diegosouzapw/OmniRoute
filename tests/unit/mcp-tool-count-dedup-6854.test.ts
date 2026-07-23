import test from "node:test";
import assert from "node:assert/strict";

// Regression for #6854: TOTAL_MCP_TOOL_COUNT (open-sse/mcp-server/server.ts) was a
// plain additive sum across all registered tool collections. Three tools
// (omniroute_agent_skills_list/get/coverage) are intentionally defined in BOTH
// MCP_TOOLS (open-sse/mcp-server/schemas/tools.ts) and agentSkillTools
// (open-sse/mcp-server/tools/agentSkillTools.ts), so the additive sum reported 99
// while only 96 distinct tool names actually exist. countUniqueMcpTools
// (open-sse/mcp-server/toolCount.ts) fixes this by unioning tool names from every
// registered collection into a Set, so each user-visible tool is counted once.

const { countUniqueMcpTools } = await import("../../open-sse/mcp-server/toolCount.ts");
const { MCP_TOOLS } = await import("../../open-sse/mcp-server/schemas/tools.ts");
const { memoryTools } = await import("../../open-sse/mcp-server/tools/memoryTools.ts");
const { skillTools } = await import("../../open-sse/mcp-server/tools/skillTools.ts");
const { agentSkillTools } = await import("../../open-sse/mcp-server/tools/agentSkillTools.ts");
const { githubSkillTools } = await import("../../open-sse/mcp-server/tools/githubSkillTools.ts");
const { poolTools } = await import("../../open-sse/mcp-server/tools/poolTools.ts");
const { gamificationTools } = await import("../../open-sse/mcp-server/tools/gamificationTools.ts");
const { pluginTools } = await import("../../open-sse/mcp-server/tools/pluginTools.ts");
const { notionTools } = await import("../../open-sse/mcp-server/tools/notionTools.ts");
const { obsidianTools } = await import("../../open-sse/mcp-server/tools/obsidianTools.ts");
const { compressionTools } = await import("../../open-sse/mcp-server/tools/compressionTools.ts");

type NamedTool = { name: string };

function namesOf(collection: readonly NamedTool[] | Record<string, NamedTool>): string[] {
  return Array.isArray(collection)
    ? collection.map((t) => t.name)
    : Object.values(collection).map((t) => t.name);
}

test("#6854: countUniqueMcpTools de-duplicates tools registered in multiple collections", () => {
  // The agent-skills trio is intentionally present in both MCP_TOOLS and agentSkillTools.
  const mcpToolsNames = namesOf(MCP_TOOLS as unknown as NamedTool[]);
  const agentSkillNames = namesOf(agentSkillTools as unknown as Record<string, NamedTool>);
  const overlap = mcpToolsNames.filter((n) => agentSkillNames.includes(n));
  assert.ok(
    overlap.length > 0,
    "expected MCP_TOOLS and agentSkillTools to still share the agent-skills tool names " +
      "(if this fails because the overlap was removed instead, this test's premise no " +
      "longer applies and it should be revisited)"
  );

  const collections = {
    MCP_TOOLS: MCP_TOOLS as unknown as NamedTool[],
    memoryTools: memoryTools as unknown as Record<string, NamedTool>,
    skillTools: skillTools as unknown as Record<string, NamedTool>,
    agentSkillTools: agentSkillTools as unknown as Record<string, NamedTool>,
    githubSkillTools: githubSkillTools as unknown as Record<string, NamedTool>,
    poolTools: poolTools as unknown as Record<string, NamedTool>,
    gamificationTools: gamificationTools as unknown as NamedTool[],
    pluginTools: pluginTools as unknown as NamedTool[],
    notionTools: notionTools as unknown as NamedTool[],
    obsidianTools: obsidianTools as unknown as NamedTool[],
    compressionTools: compressionTools as unknown as Record<string, NamedTool>,
  };

  const total = countUniqueMcpTools(collections);

  // Independently compute the "true" unique count by unioning every collection's
  // tool names into a Set — this must equal countUniqueMcpTools's own result AND
  // must be strictly less than the naive additive sum whenever there is overlap.
  const uniqueNames = new Set<string>();
  for (const collection of Object.values(collections)) {
    for (const name of namesOf(collection)) uniqueNames.add(name);
  }

  const naiveAdditiveSum = Object.values(collections).reduce(
    (sum, collection) => sum + namesOf(collection).length,
    0
  );

  assert.equal(total, uniqueNames.size, "countUniqueMcpTools must equal the unique-name count");
  assert.ok(
    total < naiveAdditiveSum,
    "unique count must be strictly less than the naive additive sum given a known overlap"
  );
});
