import { z } from "zod";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import fs from "node:fs";
import path from "node:path";
import { generateConfig, redactGeneratedConfig } from "@/lib/cli-helper/config-generator";
import { readPrivateConfigFile, writePrivateConfigFile } from "@/lib/cli-helper/privateConfigFile";
import { guardCliConfigWrite } from "@/lib/api/cliConfigWriteGuard";
import { getCliPrimaryConfigPath, normalizeCliToolId } from "@/shared/services/cliRuntime";
import {
  configRequestSchema,
  configError,
  defaultConfigBaseUrl,
  privateConfigResponse,
} from "@/lib/cli-helper/configRequest";

const applySchema = configRequestSchema.extend({
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
  writePrivateConfigFile(backupPath, readPrivateConfigFile(configPath));
  return backupPath;
}

// POST /api/cli-tools/apply - Apply config for a specific tool
export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) {
    authError.headers.set("cache-control", "no-store");
    return authError;
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return configError(400, "Invalid JSON request");
  }

  try {
    const parsed = applySchema.safeParse(body);
    if (!parsed.success) {
      return configError(400, "Invalid config request");
    }
    const { toolId, baseUrl, apiKey, model, dryRun } = parsed.data;
    const canonicalToolId = normalizeCliToolId(toolId);

    const result = await generateConfig(canonicalToolId, {
      baseUrl: baseUrl || defaultConfigBaseUrl(),
      apiKey,
      model,
    });

    if (!result.success) {
      return configError(
        400,
        redactGeneratedConfig(result.error || "Config generation failed", [apiKey])
      );
    }
    const safeContent = redactGeneratedConfig(result.content || "", [apiKey]);

    if (dryRun) {
      return privateConfigResponse({
        dryRun: true,
        configPath: result.configPath,
        content: safeContent,
        ...(result.migration ? { migration: result.migration } : {}),
      });
    }

    const configPath = result.configPath || getCliPrimaryConfigPath(canonicalToolId);
    if (!configPath) {
      return configError(400, "Unknown CLI tool");
    }

    // A container write into an unmounted path looks successful and then
    // disappears with the container — refuse it and point at the host CLI.
    const refusal = guardCliConfigWrite(configPath, {
      toolLabel: canonicalToolId,
      hostCommand: HOST_SETUP_COMMANDS[canonicalToolId],
    });
    if (refusal) {
      refusal.headers.set("cache-control", "no-store");
      return refusal;
    }

    const backupPath = ensureBackup(configPath);

    writePrivateConfigFile(configPath, result.content!);

    return privateConfigResponse({
      success: true,
      configPath,
      backupPath,
      content: safeContent,
      ...(result.migration ? { migration: result.migration } : {}),
    });
  } catch {
    return configError(500, "Failed to apply config");
  }
}
