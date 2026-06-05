import { z } from "zod";
import { getCatalog, getSkillById, filterCatalog, computeCoverage, fetchSkillMarkdown } from "@/lib/agentSkills/catalog";
import type { AgentSkill, SkillCoverage } from "@/lib/agentSkills/types";

// ── Input Schemas ────────────────────────────────────────────────────────────

export const AgentSkillsListSchema = z.object({
  category: z.enum(["api", "cli"]).optional().describe("Filter by category: 'api' or 'cli'"),
  area: z.string().optional().describe("Filter by area (e.g. 'providers', 'models', 'cli-serve')"),
});

export const AgentSkillsGetSchema = z.object({
  id: z.string().describe("Canonical skill ID (e.g. 'omni-providers', 'cli-serve')"),
});

export const AgentSkillsCoverageSchema = z.object({});

// ── Tool Definitions ─────────────────────────────────────────────────────────

export const agentSkillTools = {
  omniroute_agent_skills_list: {
    name: "omniroute_agent_skills_list",
    description:
      "List OmniRoute agent skills with optional filtering by category (api/cli) or area. Returns skill metadata including id, name, description, endpoints/commands, and URLs.",
    inputSchema: AgentSkillsListSchema,
    handler: async (args: z.infer<typeof AgentSkillsListSchema>) => {
      const skills: AgentSkill[] =
        args.category || args.area
          ? filterCatalog({ category: args.category, area: args.area })
          : getCatalog();

      return {
        skills: skills.map((s) => ({
          id: s.id,
          name: s.name,
          description: s.description,
          category: s.category,
          area: s.area,
          endpoints: s.endpoints,
          cliCommands: s.cliCommands,
          icon: s.icon,
          isEntry: s.isEntry,
          isNew: s.isNew,
          rawUrl: s.rawUrl,
          githubUrl: s.githubUrl,
        })),
        count: skills.length,
        coverage: computeCoverage(),
      };
    },
  },

  omniroute_agent_skills_get: {
    name: "omniroute_agent_skills_get",
    description:
      "Get detailed metadata and SKILL.md markdown for a single agent skill by its canonical ID. Returns all skill fields plus the raw markdown content.",
    inputSchema: AgentSkillsGetSchema,
    handler: async (args: z.infer<typeof AgentSkillsGetSchema>) => {
      const skill: AgentSkill | null = getSkillById(args.id);
      if (!skill) {
        throw new Error(`Skill not found: ${args.id}`);
      }

      const markdown = await fetchSkillMarkdown(args.id);

      return {
        ...skill,
        markdown,
      };
    },
  },

  omniroute_agent_skills_coverage: {
    name: "omniroute_agent_skills_coverage",
    description:
      "Returns the current SKILL.md coverage stats: how many of the 22 API skills and 20 CLI skills have generated SKILL.md files on the filesystem vs the catalog total.",
    inputSchema: AgentSkillsCoverageSchema,
    handler: async (_args: z.infer<typeof AgentSkillsCoverageSchema>) => {
      const coverage: SkillCoverage = computeCoverage();
      return coverage;
    },
  },
};
