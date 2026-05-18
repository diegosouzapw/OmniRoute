"use server";

import { NextResponse } from "next/server";
import { installTool } from "@/lib/versionManager";
import { versionManagerInstallSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody, getValidationError } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(versionManagerInstallSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: getValidationError(validation) }, { status: 400 });
  }

  try {
    const { tool, version } = validation.data;
    const result = await installTool(tool, version || undefined);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Installation failed";
    console.error("[version-manager] install error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
