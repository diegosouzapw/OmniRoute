"use server";

import { NextResponse } from "next/server";
import { z } from "zod";
import { install, InstallResult } from "@/lib/services/installers/cliproxy";
import { InstallError, SERVICE_VERSION_PATTERN } from "@/lib/services/installers/utils";
import { versionManagerInstallSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { VERSION_MANAGER_SUPERVISOR_TOOLS } from "../request";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

// The version is spliced into a GitHub release URL and an install directory.
const installBodySchema = versionManagerInstallSchema.extend({
  version: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || SERVICE_VERSION_PATTERN.test(value),
      "Invalid version: only letters, digits and . _ + - are allowed"
    )
    .optional(),
});

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(installBodySchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { tool, version } = validation.data;
  if (!VERSION_MANAGER_SUPERVISOR_TOOLS.has(tool)) {
    return NextResponse.json({ error: `Unknown tool: ${tool}` }, { status: 400 });
  }

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
