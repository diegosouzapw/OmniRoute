import { NextResponse } from "next/server";
import { z } from "zod";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { generateConfig } from "@/lib/cli-helper/config-generator";

const applySchema = z.object({
  toolId: z.string().min(1),
  baseUrl: z.string().optional(),
  apiKey: z.string().min(1),
  model: z.string().optional(),
  dryRun: z.boolean().optional(),
});

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
    const parsed = applySchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }
    const { toolId, baseUrl, apiKey, model, dryRun } = parsed.data;

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
