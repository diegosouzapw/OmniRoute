"use server";

import { NextResponse } from "next/server";
import { getSupervisor } from "@/lib/services/registry";
import { versionManagerToolSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const SUPERVISOR_TOOLS = new Set(["cliproxy", "cliproxyapi"]);

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(versionManagerToolSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { tool } = validation.data;

  if (!SUPERVISOR_TOOLS.has(tool)) {
    return NextResponse.json({ error: `Unknown tool: ${tool}` }, { status: 400 });
  }

  try {
    const sup = getSupervisor("cliproxy");
    if (!sup) {
      // Already stopped — no supervisor registered yet, nothing to do.
      return NextResponse.json({ success: true });
    }
    await sup.stop();
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = sanitizeErrorMessage(error instanceof Error ? error.message : "Failed to stop");
    console.error("[version-manager] stop error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
