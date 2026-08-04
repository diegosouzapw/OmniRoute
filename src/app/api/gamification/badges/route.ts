/**
 * GET /api/gamification/badges — the full built-in badge catalog (definitions).
 * Seeds the built-in badges first (idempotent INSERT OR IGNORE) so the profile
 * grid is populated even on installs where seeding never ran. (#3484, see #3472)
 *
 * LOCAL_ONLY: not process-spawning; management-scoped via requireManagementAuth.
 */
import { NextRequest, NextResponse } from "next/server";

import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { getBadgeDefinitions } from "@/lib/db/gamification";
import { seedBuiltinBadges } from "@/lib/gamification/badges";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  await seedBuiltinBadges();

  const category = new URL(request.url).searchParams.get("category") || undefined;
  const badges = getBadgeDefinitions(category);
  return NextResponse.json({ badges }, { headers: CORS_HEADERS });
}
