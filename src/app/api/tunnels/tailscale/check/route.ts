import { NextResponse } from "next/server";
import { getTailscaleCheckStatus } from "@/lib/tailscaleTunnel";
import { requireTailscaleAuth } from "../routeUtils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authError = await requireTailscaleAuth(request);
  if (authError) return authError;

  try {
    const status = await getTailscaleCheckStatus();
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to check Tailscale state",
      },
      { status: 500 }
    );
  }
}
