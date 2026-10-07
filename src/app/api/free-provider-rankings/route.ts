import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { computeFreeProviderRankings } from "@/lib/freeProviderRankings";

// Coerce common truthy query-string forms ("1", "true", "yes") to a boolean.
const boolParam = z
  .string()
  .optional()
  .transform((val) => val === "1" || val === "true" || val === "yes");

const QuerySchema = z.object({
  category: z.string().min(1).max(50).optional(),
  limit: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 50;
      const n = Number(val);
      return Number.isFinite(n) && n >= 1 ? Math.min(Math.round(n), 100) : 50;
    }),
  // Additive filters (default off → current behavior). `availableOnly` implies configured.
  configuredOnly: boolParam,
  availableOnly: boolParam,
  // Opt-in usage reporting: costs one aggregate query, so it is never implicit.
  withUsage: boolParam,
  // Rejected rather than silently coerced: a typo must not quietly return a
  // different window than the caller asked for.
  usageRange: z.enum(["1h", "24h", "7d", "30d"]).optional(),
  sortBy: z.enum(["elo", "reliability"]).optional(),
});

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const parsed = QuerySchema.safeParse({
    category: url.searchParams.get("category") || undefined,
    limit: url.searchParams.get("limit") || undefined,
    configuredOnly: url.searchParams.get("configuredOnly") || undefined,
    availableOnly: url.searchParams.get("availableOnly") || undefined,
    withUsage: url.searchParams.get("withUsage") || undefined,
    usageRange: url.searchParams.get("usageRange") || undefined,
    sortBy: url.searchParams.get("sortBy") || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: parsed.error.flatten().fieldErrors },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const { category, limit, configuredOnly, availableOnly, withUsage, usageRange, sortBy } =
    parsed.data;
  const rankings = await computeFreeProviderRankings(category, limit, {
    configuredOnly,
    availableOnly,
    withUsage,
    usageRange,
    sortBy,
  });

  return NextResponse.json({ rankings }, { headers: CORS_HEADERS });
}
