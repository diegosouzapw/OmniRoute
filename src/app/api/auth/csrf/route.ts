import { NextResponse } from "next/server";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { issueDashboardCsrfToken } from "@/server/authz/csrf";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const issued = issueDashboardCsrfToken(request);
  return NextResponse.json(issued ?? { token: null, expiresAt: null }, {
    headers: { "Cache-Control": "no-store" },
  });
}
