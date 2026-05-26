"use server";

import { NextResponse } from "next/server";
import { install, InstallResult } from "@/lib/services/installers/cliproxy";
import { InstallError } from "@/lib/services/installers/utils";
import { versionManagerInstallSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

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
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { version } = validation.data;

  try {
    const result: InstallResult = await install(version || "latest");
    // Preserve legacy response shape: { success: true, installedVersion, binaryPath }
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    if (error instanceof InstallError) {
      return NextResponse.json({ error: error.friendly }, { status: error.httpStatus });
    }
    const message = sanitizeErrorMessage(
      error instanceof Error ? error.message : "Installation failed"
    );
    console.error("[version-manager] install error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
