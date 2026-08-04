"use server";

import { NextResponse } from "next/server";
import { getServiceRow } from "@/lib/db/versionManager";
import { getOrInitSupervisor } from "@/app/api/services/cliproxy/_lib";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

import { parseVersionManagerToolRequest } from "../request";

export async function POST(request: Request) {
  const parsed = await parseVersionManagerToolRequest(request);
  if (!parsed.ok) {
    return parsed.response;
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
