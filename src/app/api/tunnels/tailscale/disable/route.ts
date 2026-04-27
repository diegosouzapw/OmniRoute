import { NextResponse } from "next/server";
import { disableTailscaleTunnel } from "@/lib/tailscaleTunnel";
import { parseOptionalJsonBody, requireTailscaleAuth, tailscaleSudoSchema } from "../routeUtils";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const authError = await requireTailscaleAuth(request);
  if (authError) return authError;

  const parsed = await parseOptionalJsonBody(request, tailscaleSudoSchema);
  if ("response" in parsed) return parsed.response;

  try {
    const result = await disableTailscaleTunnel(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to disable Tailscale Funnel",
      },
      { status: 500 }
    );
  }
}
