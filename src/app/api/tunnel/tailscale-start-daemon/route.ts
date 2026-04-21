import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { startDaemonWithPassword } from "@/lib/tunnel/tailscale";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  sudoPassword: z.string().max(200).optional(),
});

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return unauthorized();
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    rawBody = {};
  }

  const validation = validateBody(bodySchema, rawBody);
  if (isValidationFailure(validation)) {
    return validation.response;
  }

  try {
    await startDaemonWithPassword(validation.data.sudoPassword || "");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to start tailscaled",
      },
      { status: 500 }
    );
  }
}
