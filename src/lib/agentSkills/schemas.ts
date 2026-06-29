import { z } from "zod";

export const SkillCategorySchema = z.enum(["api", "cli"]);

export const AgentSkillSchema = z.object({
  id: z.string().regex(/^[a-z][a-z0-9-]*$/),
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(2000),
  category: SkillCategorySchema,
  area: z.string().min(1).max(50),
  endpoints: z.array(z.string()).optional(),
  cliCommands: z.array(z.string()).optional(),
  icon: z.string().optional(),
  isEntry: z.boolean().optional(),
  isNew: z.boolean().optional(),
  rawUrl: z.string().url(),
  githubUrl: z.string().url(),
});

export const SkillCoverageSchema = z.object({
  api: z.object({ have: z.number().int().nonnegative(), total: z.literal(22) }),
  cli: z.object({ have: z.number().int().nonnegative(), total: z.literal(20) }),
  totalSkills: z.number().int().nonnegative(),
  generatedAt: z.string().datetime(),
});

export const ListQuerySchema = z.object({
  category: SkillCategorySchema.optional(),
  area: z.string().optional(),
});

export const GenerateBodySchema = z.object({
  dryRun: z.boolean().default(true),
  prune: z.boolean().default(false),
  onlyIds: z.array(z.string()).optional(),
});
