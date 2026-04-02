"use server";

import { NextResponse } from "next/server";
import { startTool } from "@/lib/versionManager";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tool = body.tool || "cliproxyapi";
    const result = await startTool(tool);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to start";
    console.error("[version-manager] start error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
