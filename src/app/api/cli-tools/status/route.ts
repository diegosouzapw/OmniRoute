"use server";

import { NextResponse } from "next/server";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { getCliRuntimeStatus, CLI_TOOL_IDS } from "@/shared/services/cliRuntime";
import { getAllCliToolLastConfigured } from "@/lib/db/cliToolState";
import { checkToolConfigStatus } from "@/lib/cliTools/checkToolConfigStatus";

/**
 * GET /api/cli-tools/status
 * Returns runtime + config status for all CLI tools in one batch call.
 * Used by the CLI Tools page to show status badges in collapsed state.
 */
export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const statuses = {};

    // Run all runtime checks in parallel with individual timeouts
    const RUNTIME_CHECK_TIMEOUT = 5000; // 5s per tool max
    await Promise.all(
      CLI_TOOL_IDS.map(async (toolId) => {
        try {
          const runtime = (await Promise.race([
            getCliRuntimeStatus(toolId),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Timeout")), RUNTIME_CHECK_TIMEOUT)
            ),
          ])) as {
            installed: boolean;
            runnable: boolean;
            command?: string;
            commandPath?: string;
            reason?: string;
          };
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
            reason: error.message || "Check failed",
          };
        }
      })
    );

    // Check config status for installed+runnable tools via direct file reads
    const settingsTools = [
      "claude",
      "codex",
      "droid",
      "openclaw",
      "cline",
      "kilo",
      "hermes",
      "qwen",
    ];

    await Promise.all(
      settingsTools.map(async (toolId) => {
        if (!statuses[toolId]) {
          return;
        }
        if (!statuses[toolId].installed || !statuses[toolId].runnable) {
          statuses[toolId].configStatus = "not_installed";
          return;
        }
        statuses[toolId].configStatus = await checkToolConfigStatus(toolId);
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
