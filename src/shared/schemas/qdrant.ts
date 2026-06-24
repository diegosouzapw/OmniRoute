import { z } from "zod";

export const QdrantQuantizationSchema = z.enum(["none", "int8", "binary"]);

export const QdrantSettingsSchema = z.object({
  enabled: z.boolean(),
  host: z.string().min(0), // string vazia OK quando enabled=false
  port: z.number().int().min(1).max(65535).default(6333),
  collection: z.string().min(1).default("omniroute_memory"),
  embeddingModel: z.string().default("openai/text-embedding-3-small"),
  quantization: QdrantQuantizationSchema.default("none"),
  hasApiKey: z.boolean().default(false),
  apiKeyMasked: z.string().nullable().default(null),
});

export const QdrantSettingsUpdateSchema = z
  .object({
    enabled: z.boolean().optional(),
    host: z.string().optional(),
    port: z.number().int().min(1).max(65535).optional(),
    collection: z.string().min(1).optional(),
    embeddingModel: z.string().min(1).optional(),
    quantization: QdrantQuantizationSchema.optional(),
    apiKey: z.string().optional(), // string vazia = remove
  })
  .strict();

export const QdrantSearchSchema = z
  .object({
    query: z.string().min(1),
    topK: z.number().int().min(1).max(50).default(5),
  })
  .strict();

export const QdrantHealthResultSchema = z.object({
  ok: z.boolean(),
  latencyMs: z.number(),
  error: z.string().optional(),
});

type QdrantSettings = z.infer<typeof QdrantSettingsSchema>;
type QdrantSettingsUpdate = z.infer<typeof QdrantSettingsUpdateSchema>;
type QdrantSearch = z.infer<typeof QdrantSearchSchema>;
type QdrantHealthResult = z.infer<typeof QdrantHealthResultSchema>;
