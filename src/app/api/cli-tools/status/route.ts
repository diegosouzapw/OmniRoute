"use server";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import {
  getCliRuntimeStatus,
  CLI_TOOL_IDS,
  getCliPrimaryConfigPath,
} from "@/shared/services/cliRuntime";
import { getAllCliToolLastConfigured } from "@/lib/db/cliToolState";
import { getRuntimePorts } from "@/lib/runtime/ports";

const { apiPort } = getRuntimePorts();

// Check if a tool has OmniRoute configured by reading its config file directly
// This replaces the expensive self-referential HTTP calls to /api/cli-tools/*-settings
async function checkToolConfigStatus(toolId: string): Promise<string> {
  try {
    const configPath = getCliPrimaryConfigPath(toolId);
    if (!configPath) return "unknown";

    const content = await fs.readFile(configPath, "utf-8");

    // Codex uses TOML config — parse as raw text, not JSON
    if (toolId === "codex") {
      const lower = content.toLowerCase();
      const hasOmniRoute =
        lower.includes("omniroute") ||
        lower.includes(`localhost:${apiPort}`) ||
        lower.includes(`127.0.0.1:${apiPort}`);
      if (!hasOmniRoute) return "not_configured";

      // Also verify auth.json has an API key (not masked/empty)
      try {
        const authPath = configPath.replace(/config\.toml$/, "auth.json");
        const authContent = await fs.readFile(authPath, "utf-8");
        const auth = JSON.parse(authContent);
        const apiKey = auth?.OPENAI_API_KEY || "";
        if (!apiKey || apiKey.includes("****") || apiKey.length < 20) {
          return "not_configured";
        }
      } catch {
        return "not_configured";
      }

      return "configured";
    }

    const config = JSON.parse(content);

    // Each tool stores OmniRoute config differently
    switch (toolId) {
      case "claude":
        return config?.env?.ANTHROPIC_BASE_URL ? "configured" : "not_configured";
      case "qwen":
        // Check modelProviders for OmniRoute entries
        const mp = config?.modelProviders;
        if (!mp) return "not_configured";
        const qwenConfigStr = JSON.stringify(mp).toLowerCase();
        return qwenConfigStr.includes("omniroute") ||
          qwenConfigStr.includes(`localhost:${apiPort}`) ||
          qwenConfigStr.includes(`127.0.0.1:${apiPort}`)
          ? "configured"
          : "not_configured";
      case "droid":
      case "openclaw":
      case "cline":
      case "kilo":
        // Generic check: look for OmniRoute-specific markers in the config
        const configStr = JSON.stringify(config).toLowerCase();
        if (
          configStr.includes("omniroute") ||
          configStr.includes("sk_omniroute") ||
          configStr.includes(`localhost:${apiPort}`) ||
          configStr.includes(`127.0.0.1:${apiPort}`)
        ) {
          return "configured";
        }
        // Also accept openai-compatible provider with any non-empty baseUrl
        // (user may configure an external domain instead of localhost)
        if (
          toolId === "cline" &&
          (config.actModeApiProvider === "openai" || config.planModeApiProvider === "openai") &&
          (config.openAiBaseUrl || "").trim().length > 0
        ) {
          return "configured";
        }
        return "not_configured";
      default:
        return "unknown";
    }
  } catch {
    return "not_configured";
  }
}

/**
 * GET /api/cli-tools/status
 * Returns runtime + config status for all CLI tools in one batch call.
 * Used by the CLI Tools page to show status badges in collapsed state.
 */
export async function GET() {
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
    const settingsTools = ["claude", "codex", "droid", "openclaw", "cline", "kilo", "qwen"];

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
