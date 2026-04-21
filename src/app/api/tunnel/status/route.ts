import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getTunnelStatus, getTailscaleStatus } from "@/lib/tunnel/tunnelManager";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return unauthorized();
  }

  try {
    const [cloudflared, tailscale] = await Promise.all([getTunnelStatus(), getTailscaleStatus()]);
    return NextResponse.json({ cloudflared, tailscale });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to load tunnel status",
      },
      { status: 500 }
    );
  }
}
