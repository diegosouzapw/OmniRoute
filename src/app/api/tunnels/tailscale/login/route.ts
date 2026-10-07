import { NextResponse } from "next/server";
import { startTailscaleLogin } from "@/lib/tailscaleTunnel";
import { toPublicSafeTunnelError } from "@/lib/api/publicSafeTunnelError";
import { parseOptionalJsonBody, requireTailscaleAuth, tailscaleLoginSchema } from "../routeUtils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const authError = await requireTailscaleAuth(request);
  if (authError) return authError;

  const parsed = await parseOptionalJsonBody(request, tailscaleLoginSchema);
  if ("response" in parsed) return parsed.response;

  try {
    const result = await startTailscaleLogin(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      toPublicSafeTunnelError(
        error,
        "Failed to start the Tailscale login.",
        "tunnels/tailscale/login POST"
      ),
      { status: 500 }
    );
  }
}
