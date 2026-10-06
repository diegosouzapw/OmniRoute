import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createTraeLoginState } from "@/lib/oauth/traeLoginState";

/**
 * POST /api/oauth/trae/authorize-state
 *
 * Issues the one-time state that the dashboard sends to Trae as `login_trace_id`.
 * The loopback callback at /authorize only saves a connection for a state issued
 * here. `/api/oauth/` is a public prefix, so the management check is done here.
 */
export async function POST(request: Request) {
  const authResponse = await requireManagementAuth(request, { invalidApiKeyStatus: 401 });
  if (authResponse) return authResponse;
  return NextResponse.json({ state: createTraeLoginState() });
}
