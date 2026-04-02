"use server";

import { NextResponse } from "next/server";
import { checkForUpdates } from "@/lib/versionManager";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tool = searchParams.get("tool") || "cliproxyapi";
    const result = await checkForUpdates(tool);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[version-manager] check-update error:", error);
    return NextResponse.json({ error: "Failed to check for updates" }, { status: 500 });
  }
}
