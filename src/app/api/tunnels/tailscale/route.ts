import { NextResponse } from "next/server";
import { getTailscaleTunnelStatus } from "@/lib/tailscaleTunnel";
import { toPublicSafeTunnelError } from "@/lib/api/publicSafeTunnelError";
import { requireTailscaleAuth } from "./routeUtils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authError = await requireTailscaleAuth(request);
  if (authError) return authError;

  try {
    const status = await getTailscaleTunnelStatus();
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      toPublicSafeTunnelError(
        error,
        "Failed to load the Tailscale status.",
        "tunnels/tailscale GET"
      ),
      { status: 500 }
    );
  }
}
