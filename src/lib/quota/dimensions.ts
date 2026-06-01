import { z } from "zod";

export const QuotaUnitSchema = z.enum(["percent", "requests", "tokens", "usd"]);
export type QuotaUnit = z.infer<typeof QuotaUnitSchema>;

export const QuotaWindowSchema = z.enum(["5h", "hourly", "daily", "weekly", "monthly"]);
export type QuotaWindow = z.infer<typeof QuotaWindowSchema>;

export const PolicySchema = z.enum(["hard", "soft", "burst"]);
export type Policy = z.infer<typeof PolicySchema>;

export const QuotaDimensionSchema = z.object({
  unit: QuotaUnitSchema,
  window: QuotaWindowSchema,
  limit: z.number().positive(),
});
export type QuotaDimension = z.infer<typeof QuotaDimensionSchema>;

export const PoolAllocationSchema = z.object({
  apiKeyId: z.string().min(1),
  weight: z.number().min(0).max(100),
  capValue: z.number().positive().optional(),
  capUnit: QuotaUnitSchema.optional(),
  policy: PolicySchema,
});
export type PoolAllocation = z.infer<typeof PoolAllocationSchema>;

export const ProviderPlanSchema = z.object({
  connectionId: z.string().nullable(),
  provider: z.string().min(1),
  dimensions: z.array(QuotaDimensionSchema).min(1),
  source: z.enum(["auto", "manual"]),
});
export type ProviderPlan = z.infer<typeof ProviderPlanSchema>;

export const QuotaPoolSchema = z.object({
  id: z.string().min(1),
  connectionId: z.string().min(1),
  name: z.string().min(1),
  createdAt: z.string().datetime(),
  allocations: z.array(PoolAllocationSchema).default([]),
});
export type QuotaPool = z.infer<typeof QuotaPoolSchema>;

export interface DimensionKey {
  poolId: string;
  unit: QuotaUnit;
  window: QuotaWindow;
}

export const WINDOW_MS: Record<QuotaWindow, number> = {
  hourly: 60 * 60 * 1000,
  "5h": 5 * 60 * 60 * 1000,
  daily: 24 * 60 * 60 * 1000,
  weekly: 7 * 24 * 60 * 60 * 1000,
  monthly: 30 * 24 * 60 * 60 * 1000,
};

export function dimensionKeyToString(k: DimensionKey): string {
  return `${k.poolId}:${k.unit}:${k.window}`;
}
