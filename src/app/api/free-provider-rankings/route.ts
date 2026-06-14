import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { computeFreeProviderRankings } from "@/lib/freeProviderRankings";

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
});

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const parsed = QuerySchema.safeParse({
    category: url.searchParams.get("category") || undefined,
    limit: url.searchParams.get("limit") || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: parsed.error.flatten().fieldErrors },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const { category, limit } = parsed.data;
  const rankings = computeFreeProviderRankings(category, limit);

  return NextResponse.json({ rankings }, { headers: CORS_HEADERS });
}
