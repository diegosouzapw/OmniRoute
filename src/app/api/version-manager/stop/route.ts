"use server";

import { NextResponse } from "next/server";
import { getSupervisor } from "@/lib/services/registry";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

import { parseVersionManagerToolRequest } from "../request";

export async function POST(request: Request) {
  const parsed = await parseVersionManagerToolRequest(request);
  if (!parsed.ok) {
    return parsed.response;
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
