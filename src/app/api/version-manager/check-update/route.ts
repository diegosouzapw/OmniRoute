"use server";

import { NextResponse } from "next/server";
import { getInstalledVersion, getLatestVersion } from "@/lib/services/installers/cliproxy";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    // Accept legacy "cliproxyapi" alias as well as the canonical "cliproxy" tool name.
    // Both refer to the same binary; normalizing here avoids a DB lookup mismatch.
    const { searchParams } = new URL(request.url);
    const toolParam = searchParams.get("tool") ?? "cliproxy";
    if (toolParam !== "cliproxy" && toolParam !== "cliproxyapi") {
      return NextResponse.json({ error: `Unknown tool: ${toolParam}` }, { status: 400 });
    }

    const [installedVersion, latestVersion] = await Promise.all([
      getInstalledVersion(),
      getLatestVersion(),
    ]);

    const latest = latestVersion ?? null;
    return NextResponse.json({
      current: installedVersion,
      latest,
      updateAvailable: !!installedVersion && !!latest && installedVersion !== latest,
    });
  } catch (error) {
    const message = sanitizeErrorMessage(
      error instanceof Error ? error.message : "Failed to check for updates"
    );
    console.error("[version-manager] check-update error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
