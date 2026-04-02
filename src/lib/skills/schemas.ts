import { z } from "zod";
import { SkillStatus, SkillMode } from "./types";

export const SkillSchema = z.object({
  input: z.record(z.string(), z.unknown()),
  output: z.record(z.string(), z.unknown()),
});

export const SkillCreateInputSchema = z
  .object({
    name: z.string().min(1).max(100),
    version: z
      .string()
      .regex(/^\d+\.\d+\.\d+$/)
      .default("1.0.0"),
    description: z.string().max(500).optional(),
    schema: SkillSchema,
    handler: z.string().min(1),
    enabled: z.boolean().default(true),
  })
  .strict();

export const SkillUpdateInputSchema = z
  .object({
    name: z.string().min(1).max(100).optional(),
    version: z
      .string()
      .regex(/^\d+\.\d+\.\d+$/)
      .optional(),
    description: z.string().max(500).optional(),
    schema: SkillSchema.optional(),
    handler: z.string().min(1).optional(),
    enabled: z.boolean().optional(),
  })
  .strict();

export const SkillConfigSchema = z.object({
  enabled: z.boolean(),
  mode: z.nativeEnum(SkillMode),
  allowedSkills: z.array(z.string()),
  timeout: z.number().int().positive().default(30000),
  maxRetries: z.number().int().min(0).default(3),
});

export type SkillCreateInput = z.infer<typeof SkillCreateInputSchema>;
export type SkillUpdateInput = z.infer<typeof SkillUpdateInputSchema>;
export type SkillConfig = z.infer<typeof SkillConfigSchema>;
