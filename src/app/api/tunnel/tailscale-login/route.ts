import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { startLogin } from "@/lib/tunnel/tailscale";
import { generateShortId, loadTunnelState, updateTunnelState } from "@/lib/tunnel/tunnelState";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return unauthorized();
  }

  try {
    const shortId = loadTunnelState()?.shortId || generateShortId();
    updateTunnelState({ shortId });
    const result = await startLogin(shortId);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to start Tailscale login",
      },
      { status: 500 }
    );
  }
}
