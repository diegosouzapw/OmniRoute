"use server";

import { NextResponse } from "next/server";
import { getVersionManagerStatus } from "@/lib/db/versionManager";
import { getSupervisor } from "@/lib/services/registry";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rows = await getVersionManagerStatus();

    // Merge live supervisor state into DB rows so callers see consistent data
    // whether they started the service via the legacy or the new UI.
    const enriched = rows.map((row) => {
      const sup = getSupervisor(row.tool);
      if (!sup) return row;

      const live = sup.getStatus();
      return {
        ...row,
        // Prefer live state over DB state for volatile fields.
        status: live.state,
        pid: live.pid ?? row.pid,
        healthStatus: live.health,
        errorMessage: live.lastError ?? row.errorMessage,
      };
    });

    return NextResponse.json(enriched);
  } catch (error) {
    const message = sanitizeErrorMessage(
      error instanceof Error ? error.message : "Failed to get status"
    );
    console.error("[version-manager] status error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
