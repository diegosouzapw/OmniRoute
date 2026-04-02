"use server";

import { NextResponse } from "next/server";
import { getVersionManagerStatus } from "@/lib/versionManager";

export async function GET() {
  try {
    const status = await getVersionManagerStatus();
    return NextResponse.json(status);
  } catch (error) {
    console.error("[version-manager] status error:", error);
    return NextResponse.json({ error: "Failed to get status" }, { status: 500 });
  }
}
