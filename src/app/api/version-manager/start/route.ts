"use server";

import { NextResponse } from "next/server";
import { getServiceRow } from "@/lib/db/versionManager";
import { getOrInitSupervisor } from "@/app/api/services/cliproxy/_lib";
import { versionManagerToolSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

// Only "cliproxy" has a supervisor; for other tools the legacy path is not
// available in this branch, so we return 409 if the tool is not installed.
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
    const row = await getServiceRow("cliproxy");
    if (!row || row.status === "not_installed") {
      return NextResponse.json({ error: "CLIProxyAPI is not installed." }, { status: 409 });
    }

    const sup = await getOrInitSupervisor();
    const status = await sup.start();
    // Preserve legacy response shape: { success: true, pid, port, health }
    return NextResponse.json({ success: true, pid: status.pid, port: status.port });
  } catch (error) {
    const message = sanitizeErrorMessage(
      error instanceof Error ? error.message : "Failed to start"
    );
    console.error("[version-manager] start error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
