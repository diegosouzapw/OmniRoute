// src/shared/schemas/playground.ts
import { z } from "zod";

/** Row da tabela playground_presets. */
export const PlaygroundPresetRowSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  endpoint: z.string().min(1),
  model: z.string().min(1),
  system: z.string().max(50_000).nullable(),
  params_json: z.string(), // JSON serializado (parsed na rota)
  created_at: z.string().datetime(),
});
export type PlaygroundPresetRow = z.infer<typeof PlaygroundPresetRowSchema>;

/** Body de POST /api/playground/presets. */
export const PlaygroundPresetCreateSchema = z.object({
  name: z.string().min(1).max(100),
  endpoint: z.string().min(1),
  model: z.string().min(1),
  system: z.string().max(50_000).nullable().optional(),
  params: z.record(z.string(), z.any()).default({}),
});

/** Body de PUT /api/playground/presets/[id]. */
export const PlaygroundPresetUpdateSchema = PlaygroundPresetCreateSchema.partial();

export const PlaygroundPresetListItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  endpoint: z.string(),
  model: z.string(),
  system: z.string().nullable(),
  params: z.record(z.string(), z.any()),
  created_at: z.string().datetime(),
});
export type PlaygroundPresetListItem = z.infer<typeof PlaygroundPresetListItemSchema>;

/** Tool definition aceito pelo Build tab. Validação client-side. */
export const ToolDefinitionSchema = z.object({
  type: z.literal("function"),
  function: z.object({
    name: z.string().min(1).max(64),
    description: z.string().max(1024).optional(),
    parameters: z.record(z.string(), z.any()),
  }),
});

/** JSON schema do response_format (Structured Output). Validação client-side. */
export const StructuredOutputSchema = z.object({
  type: z.literal("json_schema"),
  json_schema: z.object({
    name: z.string().min(1).max(64),
    schema: z.record(z.string(), z.any()),
    strict: z.boolean().optional(),
  }),
});

/** Stream metrics — uma medição por coluna/mensagem. */
export const StreamMetricsSchema = z.object({
  ttftMs: z.number().nonnegative().nullable(), // null = não chegou primeiro chunk ainda
  totalMs: z.number().nonnegative().nullable(),
  tokensOut: z.number().int().nonnegative(),
  tokensIn: z.number().int().nonnegative(),
  tps: z.number().nonnegative().nullable(), // tokens/segundo (out/totalSec)
  costUsd: z.number().nonnegative().nullable(),
});
export type StreamMetrics = z.infer<typeof StreamMetricsSchema>;
