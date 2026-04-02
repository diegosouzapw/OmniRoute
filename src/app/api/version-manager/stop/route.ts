"use server";

import { NextResponse } from "next/server";
import { stopTool } from "@/lib/versionManager";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tool = body.tool || "cliproxyapi";
    await stopTool(tool);
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to stop";
    console.error("[version-manager] stop error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
