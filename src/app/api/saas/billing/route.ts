import { NextResponse } from "next/server";
import { listSaasBillingEvents } from "@/lib/localDb";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { friendlyBillingAdminError } from "@/lib/saas/userFacingMessages";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const url = new URL(request.url);
    const customerId = url.searchParams.get("customerId") || undefined;
    const limit = Number(url.searchParams.get("limit") || 50);
    return NextResponse.json({ events: listSaasBillingEvents({ customerId, limit }) });
  } catch (error) {
    return NextResponse.json({ error: friendlyBillingAdminError() }, { status: 500 });
  }
}
