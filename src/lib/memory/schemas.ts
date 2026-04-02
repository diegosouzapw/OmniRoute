import { z } from "zod";
import { MemoryType } from "./types";

/**
 * MemoryConfig schema - validates memory system configuration settings
 */
export const MemoryConfigSchema = z.object({
  enabled: z.boolean(),
  maxTokens: z.number().int().positive(),
  retrievalStrategy: z.enum(["exact", "semantic", "hybrid"]).optional(),
  autoSummarize: z.boolean(),
  persistAcrossModels: z.boolean(),
  retentionDays: z.number().int().positive(),
  scope: z.enum(["session", "apiKey", "global"]).optional(),
});

/**
 * MemoryCreateInput schema - validates input for creating new memories
 */
export const MemoryCreateInputSchema = z
  .object({
    type: z.nativeEnum(MemoryType),
    key: z.string().min(1),
    content: z.string().min(1),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

/**
 * MemoryUpdateInput schema - validates input for partially updating existing memories
 */
export const MemoryUpdateInputSchema = z
  .object({
    type: z.nativeEnum(MemoryType).optional(),
    key: z.string().min(1).optional(),
    content: z.string().min(1).optional(),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();

/**
 * Exported schema types for TypeScript references
 */
export type MemoryConfig = z.infer<typeof MemoryConfigSchema>;
export type MemoryCreateInput = z.infer<typeof MemoryCreateInputSchema>;
export type MemoryUpdateInput = z.infer<typeof MemoryUpdateInputSchema>;
