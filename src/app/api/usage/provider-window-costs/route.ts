import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getProviderWindowCostBreakdown } from "@/lib/usage/providerWindowCosts";

const PROVIDER_RE = /^[a-z0-9._-]{1,80}$/i;

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const provider = (searchParams.get("provider") || "").trim().toLowerCase();
    const connectionId = (searchParams.get("connectionId") || "").trim() || null;

    if (!provider || !PROVIDER_RE.test(provider)) {
      return NextResponse.json({ error: "provider query param is required" }, { status: 400 });
    }

    const breakdown = await getProviderWindowCostBreakdown({ provider, connectionId });
    return NextResponse.json(breakdown);
  } catch (error) {
    console.error("[API] GET /api/usage/provider-window-costs error:", error);
    return NextResponse.json({ error: "Failed to fetch provider USD costs" }, { status: 500 });
  }
}
