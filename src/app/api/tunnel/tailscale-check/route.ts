import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getTailscaleStatus } from "@/lib/tunnel/tunnelManager";

export const dynamic = "force-dynamic";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return unauthorized();
  }

  try {
    const status = await getTailscaleStatus();
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to load Tailscale status",
      },
      { status: 500 }
    );
  }
}
