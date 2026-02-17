"use server";

import { NextResponse } from "next/server";
import {
  CLI_TOOL_IDS,
  getCliPrimaryConfigPath,
  getCliRuntimeStatus,
} from "@/shared/services/cliRuntime";

export async function GET(_request, { params }) {
  try {
    const { toolId } = await params;
    const normalizedToolId = String(toolId || "")
      .trim()
      .toLowerCase();

    if (!CLI_TOOL_IDS.includes(normalizedToolId)) {
      return NextResponse.json({ error: "Unsupported CLI tool" }, { status: 404 });
    }

    const runtime = await getCliRuntimeStatus(normalizedToolId);
    return NextResponse.json({
      ...runtime,
      toolId: normalizedToolId,
      configPath: getCliPrimaryConfigPath(normalizedToolId),
      message:
        runtime.reason === "not_required"
          ? "This integration is guide-based and does not require a local CLI binary"
          : runtime.installed && runtime.runnable
            ? "CLI detected and runnable"
            : runtime.installed
              ? "CLI detected but not runnable"
              : "CLI not detected",
    });
  } catch (error) {
    console.log("Error checking CLI runtime:", error);
    return NextResponse.json({ error: "Failed to check CLI runtime" }, { status: 500 });
  }
}
