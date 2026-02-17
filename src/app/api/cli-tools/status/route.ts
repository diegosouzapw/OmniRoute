"use server";

import { NextResponse } from "next/server";
import { getCliRuntimeStatus, CLI_TOOL_IDS } from "@/shared/services/cliRuntime";
import { getAllCliToolLastConfigured } from "@/lib/db/cliToolState";

/**
 * GET /api/cli-tools/status
 * Returns runtime + config status for all CLI tools in one batch call.
 * Used by the CLI Tools page to show status badges in collapsed state.
 */
export async function GET() {
  try {
    const statuses = {};

    await Promise.all(
      CLI_TOOL_IDS.map(async (toolId) => {
        try {
          const runtime = await getCliRuntimeStatus(toolId);
          statuses[toolId] = {
            installed: runtime.installed,
            runnable: runtime.runnable,
            command: runtime.command,
            commandPath: runtime.commandPath,
            reason: runtime.reason || null,
          };
        } catch (error) {
          statuses[toolId] = {
            installed: false,
            runnable: false,
            reason: error.message,
          };
        }
      })
    );

    // Now fetch configStatus for the 6 tools that have settings endpoints
    const settingsTools = ["claude", "codex", "droid", "openclaw", "cline", "kilo"];

    await Promise.all(
      settingsTools.map(async (toolId) => {
        if (!statuses[toolId]?.installed || !statuses[toolId]?.runnable) {
          statuses[toolId].configStatus = "not_installed";
          return;
        }
        try {
          const settingsRes = await fetch(
            `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:20128"}/api/cli-tools/${toolId}-settings`
          );
          if (settingsRes.ok) {
            const data = await settingsRes.json();
            statuses[toolId].configStatus = data.hasOmniRoute ? "configured" : "not_configured";
          } else {
            statuses[toolId].configStatus = "unknown";
          }
        } catch {
          statuses[toolId].configStatus = "unknown";
        }
      })
    );

    // Merge last-configured timestamps from SQLite
    try {
      const lastConfigured = getAllCliToolLastConfigured();
      for (const [toolId, timestamp] of Object.entries(lastConfigured)) {
        if (statuses[toolId]) {
          statuses[toolId].lastConfiguredAt = timestamp;
        }
      }
    } catch {
      /* non-critical */
    }

    return NextResponse.json(statuses);
  } catch (error) {
    console.log("Error fetching CLI tool statuses:", error);
    return NextResponse.json({ error: "Failed to fetch statuses" }, { status: 500 });
  }
}
