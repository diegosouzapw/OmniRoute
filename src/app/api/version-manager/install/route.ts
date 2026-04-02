"use server";

import { NextResponse } from "next/server";
import { installTool } from "@/lib/versionManager";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tool = body.tool || "cliproxyapi";
    const version = body.version;

    const result = await installTool(tool, version || undefined);
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Installation failed";
    console.error("[version-manager] install error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
