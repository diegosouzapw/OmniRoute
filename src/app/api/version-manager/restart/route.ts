"use server";

import { NextResponse } from "next/server";
import { restartTool } from "@/lib/versionManager";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tool = body.tool || "cliproxyapi";
    const result = await restartTool(tool);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to restart";
    console.error("[version-manager] restart error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
