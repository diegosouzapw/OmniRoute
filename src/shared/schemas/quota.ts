import { z } from "zod";
import { PoolAllocationSchema, QuotaDimensionSchema } from "@/lib/quota/dimensions";

export const GroupCreateSchema = z.object({
  name: z.string().min(1).max(120),
});
export type GroupCreate = z.infer<typeof GroupCreateSchema>;

export const GroupRenameSchema = z.object({
  name: z.string().min(1).max(120),
});
export type GroupRename = z.infer<typeof GroupRenameSchema>;

export const PoolCreateSchema = z
  .object({
    connectionId: z.string().min(1),
    connectionIds: z.array(z.string().min(1)).min(1).optional(),
    name: z.string().min(1).max(120),
    allocations: z.array(PoolAllocationSchema).default([]),
    groupId: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.connectionIds === undefined) return true;
      return data.connectionIds.includes(data.connectionId);
    },
    { message: "primary connectionId must be one of connectionIds" }
  );
export type PoolCreate = z.infer<typeof PoolCreateSchema>;

export const PoolUpdateSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  allocations: z.array(PoolAllocationSchema).optional(),
  exclusive: z.boolean().optional(),
  groupId: z.string().optional(),
  connectionIds: z.array(z.string().min(1)).min(1).optional(),
});
export type PoolUpdate = z.infer<typeof PoolUpdateSchema>;

export const PlanUpsertSchema = z.object({
  dimensions: z.array(QuotaDimensionSchema).min(1),
});
export type PlanUpsert = z.infer<typeof PlanUpsertSchema>;

export const QuotaStoreSettingsSchema = z.object({
  driver: z.enum(["sqlite", "redis"]),
  redisUrl: z.string().url().nullable().optional(),
});
export type QuotaStoreSettings = z.infer<typeof QuotaStoreSettingsSchema>;

export const QuotaPreviewQuerySchema = z.object({
  apiKeyId: z.string().min(1),
  poolId: z.string().min(1),
  estimatedTokens: z.coerce.number().nonnegative().optional(),
  estimatedUsd: z.coerce.number().nonnegative().optional(),
  estimatedRequests: z.coerce.number().int().nonnegative().optional(),
});
export type QuotaPreviewQuery = z.infer<typeof QuotaPreviewQuerySchema>;

export const AuditLogQuerySchema = z.object({
  action: z.string().optional(),
  actor: z.string().optional(),
  level: z.enum(["high", "all"]).default("all"),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  limit: z.coerce.number().int().min(1).max(500).default(50),
  offset: z.coerce.number().int().min(0).max(10_000).default(0),
});
export type AuditLogQuery = z.infer<typeof AuditLogQuerySchema>;
