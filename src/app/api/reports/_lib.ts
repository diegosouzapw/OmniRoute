import { z } from "zod";

import { REPORT_DIMENSIONS } from "@/lib/usage/agentSessionReports";

// Stored timestamps are UTC `toISOString()` strings compared lexically, so any accepted offset
// is normalized to that form before it reaches SQL.
const isoTimestamp = z
  .string()
  .datetime({ offset: true })
  .transform((value) => new Date(value).toISOString());

const optionalText = z.string().trim().min(1).max(512).optional();

export const reportFilterSchema = z.object({
  from: isoTimestamp.optional(),
  to: isoTimestamp.optional(),
  apiKeyId: optionalText,
  projectName: optionalText,
  client: optionalText,
  provider: optionalText,
  connectionId: optionalText,
});

export const sessionsQuerySchema = reportFilterSchema.extend({
  sort: z.enum(["lastSeen", "firstSeen", "requests", "tokens", "cost"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

export const exportQuerySchema = reportFilterSchema.extend({
  type: z.enum([...REPORT_DIMENSIONS, "sessions"]),
});

/** Query params as a plain object; empty values count as absent. */
export function searchParamsObject(request: Request): Record<string, string> {
  const entries = [...new URL(request.url).searchParams.entries()].filter(([, v]) => v !== "");
  return Object.fromEntries(entries);
}
