import { NextResponse } from "next/server";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { generateConfig } from "@/lib/cli-helper/config-generator";

const TOOL_CONFIG_PATHS: Record<string, string> = {
  claude: path.join(os.homedir(), ".claude", "settings.json"),
  codex: path.join(os.homedir(), ".codex", "config.yaml"),
  opencode: path.join(os.homedir(), ".config", "opencode", "opencode.json"),
  cline: path.join(os.homedir(), ".cline", "data", "globalState.json"),
  kilocode: path.join(os.homedir(), ".config", "kilocode", "settings.json"),
  continue: path.join(os.homedir(), ".continue", "config.yaml"),
};

function ensureBackup(configPath: string): string | null {
  if (!fs.existsSync(configPath)) return null;
  const backupDir = path.join(path.dirname(configPath), ".omniroute.bak");
  if (!fs.existsSync(backupDir)) fs.mkdirSync(backupDir, { recursive: true });
  const backupPath = path.join(backupDir, path.basename(configPath) + ".bak");
  fs.copyFileSync(configPath, backupPath);
  return backupPath;
}

// POST /api/cli-tools/apply - Apply config for a specific tool
export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const body = await request.json();
    const { toolId, baseUrl, apiKey, model, dryRun } = body;

    if (!toolId) {
      return NextResponse.json({ error: "toolId is required" }, { status: 400 });
    }
    if (!apiKey) {
      return NextResponse.json({ error: "apiKey is required" }, { status: 400 });
    }

    const result = await generateConfig(toolId, {
      baseUrl: baseUrl || "http://localhost:20128/v1",
      apiKey,
      model,
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    if (dryRun) {
      return NextResponse.json({
        dryRun: true,
        configPath: result.configPath,
        content: result.content,
      });
    }

    const configPath = TOOL_CONFIG_PATHS[toolId];
    if (!configPath) {
      return NextResponse.json({ error: `Unknown tool: ${toolId}` }, { status: 400 });
    }

    const backupPath = ensureBackup(configPath);

    const dir = path.dirname(configPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(configPath, result.content!, "utf-8");

    return NextResponse.json({
      success: true,
      configPath,
      backupPath,
      content: result.content,
    });
  } catch (error) {
    console.log("Error applying config:", error);
    return NextResponse.json({ error: "Failed to apply config" }, { status: 500 });
  }
}
