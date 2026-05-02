import { z } from "zod";

export const rtkFilterSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    description: z.string().default(""),
    commandTypes: z.array(z.string().min(1)).min(1),
    category: z.enum(["git", "test", "build", "shell", "docker", "package", "generic"]),
    priority: z.number().int().min(0).max(100).default(50),
    stripPatterns: z.array(z.string()).default([]),
    keepPatterns: z.array(z.string()).default([]),
    priorityPatterns: z.array(z.string()).default([]),
    collapsePatterns: z.array(z.string()).default([]),
    maxLines: z.number().int().min(0).default(0),
    preserveHead: z.number().int().min(0).default(20),
    preserveTail: z.number().int().min(0).default(20),
  })
  .strict();

export type RtkFilterDefinition = z.infer<typeof rtkFilterSchema>;

export function validateRtkFilter(value: unknown): RtkFilterDefinition {
  return rtkFilterSchema.parse(value);
}
