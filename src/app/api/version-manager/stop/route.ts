"use server";

import { NextResponse } from "next/server";
import { getSupervisor } from "@/lib/services/registry";
import { persistStoppedWithoutSupervisor } from "@/lib/services/persistedState";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

import { parseVersionManagerToolRequest } from "../request";

export async function POST(request: Request) {
  const parsed = await parseVersionManagerToolRequest(request);
  if (parsed.ok === false) {
    return parsed.response;
  }

  try {
    const sup = getSupervisor("cliproxy");
    if (!sup) {
      // Already stopped in memory; reconcile any volatile state left in the DB.
      await persistStoppedWithoutSupervisor(parsed.tool);
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
