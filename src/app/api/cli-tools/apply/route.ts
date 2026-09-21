import { NextResponse } from "next/server";
import { z } from "zod";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import fs from "node:fs";
import path from "node:path";
import { generateConfig } from "@/lib/cli-helper/config-generator";
import { guardCliConfigWrite } from "@/lib/api/cliConfigWriteGuard";
import { getCliPrimaryConfigPath, normalizeCliToolId } from "@/shared/services/cliRuntime";

const applySchema = z.object({
  toolId: z.string().min(1),
  baseUrl: z.string().optional(),
  apiKey: z.string().min(1),
  model: z.string().optional(),
  dryRun: z.boolean().optional(),
});

/** The host-side command that does the same job when OmniRoute is containerised. */
const HOST_SETUP_COMMANDS: Record<string, string> = {
  claude: "omniroute setup-claude",
  codex: "omniroute setup-codex",
  opencode: "omniroute setup-opencode",
  cline: "omniroute setup-cline",
  kilo: "omniroute setup-kilo",
  continue: "omniroute setup-continue",
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
    const canonicalToolId = normalizeCliToolId(toolId);

    const defaultPort = process.env.API_PORT || process.env.PORT || 20128;
    const defaultBaseUrl =
      process.env.OMNIROUTE_BASE_URL ||
      process.env.BASE_URL ||
      `http://localhost:${defaultPort}/v1`;

    const result = await generateConfig(canonicalToolId, {
      baseUrl: baseUrl || defaultBaseUrl,
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
        ...(result.migration ? { migration: result.migration } : {}),
      });
    }

    const configPath = result.configPath || getCliPrimaryConfigPath(canonicalToolId);
    if (!configPath) {
      return NextResponse.json({ error: `Unknown tool: ${toolId}` }, { status: 400 });
    }

    // A container write into an unmounted path looks successful and then
    // disappears with the container — refuse it and point at the host CLI.
    const refusal = guardCliConfigWrite(configPath, {
      toolLabel: canonicalToolId,
      hostCommand: HOST_SETUP_COMMANDS[canonicalToolId],
    });
    if (refusal) return refusal;

    const backupPath = ensureBackup(configPath);

    const dir = path.dirname(configPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(configPath, result.content!, "utf-8");

    return NextResponse.json({
      success: true,
      configPath,
      backupPath,
      content: result.content,
      ...(result.migration ? { migration: result.migration } : {}),
    });
  } catch (error) {
    console.log("Error applying config:", error);
    return NextResponse.json({ error: "Failed to apply config" }, { status: 500 });
  }
}
