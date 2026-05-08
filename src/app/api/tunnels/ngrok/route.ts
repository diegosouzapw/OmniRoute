import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { getNgrokTunnelStatus, startNgrokTunnel, stopNgrokTunnel } from "@/lib/ngrokTunnel";

export const dynamic = "force-dynamic";

const actionSchema = z.object({
  action: z.enum(["enable", "disable"]),
  authToken: z.string().optional(),
});

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return unauthorized();
  }

  try {
    const status = await getNgrokTunnelStatus();
    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to load ngrok tunnel status",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return unauthorized();
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(actionSchema, rawBody);
  if (isValidationFailure(validation)) {
    return validation.response;
  }

  const parsed = validation.data;

  try {
    const status =
      parsed.action === "enable"
        ? await startNgrokTunnel(parsed.authToken)
        : await stopNgrokTunnel();

    return NextResponse.json({
      success: true,
      action: parsed.action,
      status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to update ngrok tunnel",
      },
      { status: 500 }
    );
  }
}
