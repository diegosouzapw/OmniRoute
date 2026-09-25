import { z } from "zod";
import { PoolAllocationSchema, QuotaDimensionSchema } from "@/lib/quota/dimensions";

export const GroupCreateSchema = z.object({
  name: z.string().min(1).max(120),
});

export const GroupRenameSchema = z.object({
  name: z.string().min(1).max(120),
});

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

export const PoolUpdateSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  allocations: z.array(PoolAllocationSchema).optional(),
  exclusive: z.boolean().optional(),
  groupId: z.string().optional(),
  connectionIds: z.array(z.string().min(1)).min(1).optional(),
});

export const PlanUpsertSchema = z.object({
  dimensions: z.array(QuotaDimensionSchema).min(1),
});

/** IANA zone accepted by this runtime's ICU data; empty/absent = server local time. */
function isKnownTimeZone(tz: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

export const QuotaScheduleSchema = z
  .object({
    id: z.string().min(1).max(120).optional(),
    label: z.string().max(120).optional(),
    /** JS getDay() values, 0 = Sunday .. 6 = Saturday. */
    days: z.array(z.number().int().min(0).max(6)).min(1),
    /** Minutes from local midnight. endMinute <= startMinute wraps past midnight. */
    startMinute: z.number().int().min(0).max(1439),
    endMinute: z.number().int().min(1).max(1440),
    timezone: z
      .string()
      .min(1)
      .max(64)
      .refine(isKnownTimeZone, { message: "unknown IANA time zone" })
      .nullable()
      .optional(),
    mode: z.enum(["allow", "block"]).default("allow"),
    /**
     * Upstream quota that must stay unspent, one floor per metered window —
     * "any" lets the most-consumed window decide. Percentages are fractional:
     * on a large weekly budget a whole point is a lot of quota to round away.
     */
    reserves: z
      .array(
        z.object({
          window: z.enum(["any", "5h", "hourly", "daily", "weekly", "monthly"]),
          percent: z.number().min(0).max(100),
        })
      )
      .max(6)
      .default([]),
    /** OmniRoute's own allowance inside the window. */
    budgetValue: z.number().positive().optional(),
    budgetUnit: z.enum(["requests", "tokens", "usd"]).optional(),
    budgetWindow: z.enum(["5h", "hourly", "daily", "weekly", "monthly"]).default("daily"),
    priority: z.number().int().min(0).max(1000).default(0),
    enabled: z.boolean().default(true),
  })
  .refine((s) => (s.budgetValue === undefined) === (s.budgetUnit === undefined), {
    message: "budgetValue and budgetUnit must be set together",
  });

export const SchedulesReplaceSchema = z.object({
  schedules: z.array(QuotaScheduleSchema).max(50),
});

export const QuotaStoreSettingsSchema = z.object({
  driver: z.enum(["sqlite", "redis"]),
  redisUrl: z.string().url().nullable().optional(),
});

export const QuotaPreviewQuerySchema = z.object({
  apiKeyId: z.string().min(1),
  poolId: z.string().min(1),
  estimatedTokens: z.coerce.number().nonnegative().optional(),
  estimatedUsd: z.coerce.number().nonnegative().optional(),
  estimatedRequests: z.coerce.number().int().nonnegative().optional(),
});

export const AuditLogQuerySchema = z.object({
  action: z.string().optional(),
  actor: z.string().optional(),
  level: z.enum(["high", "all"]).default("all"),
  from: z.string().datetime().optional(),
  to: z.string().datetime().optional(),
  limit: z.coerce.number().int().min(1).max(500).default(50),
  offset: z.coerce.number().int().min(0).max(10_000).default(0),
});
