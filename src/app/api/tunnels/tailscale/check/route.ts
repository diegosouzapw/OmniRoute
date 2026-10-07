import { NextResponse } from "next/server";
import { getTailscaleCheckStatus } from "@/lib/tailscaleTunnel";
import { toPublicSafeTunnelError } from "@/lib/api/publicSafeTunnelError";
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
      toPublicSafeTunnelError(
        error,
        "Failed to check the Tailscale state.",
        "tunnels/tailscale/check GET"
      ),
      { status: 500 }
    );
  }
}
