"use server";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import {
  ensureCliConfigWriteAllowed,
  getCliPrimaryConfigPath,
  getCliRuntimeStatus,
} from "@/shared/services/cliRuntime";
import { createBackup } from "@/shared/services/backupService";
import { saveCliToolLastConfigured, deleteCliToolLastConfigured } from "@/lib/db/cliToolState";
import { cliModelConfigSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { resolveApiKey } from "@/shared/services/apiKeyResolver";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const TOOL_ID = "forge";

const getForgeConfigPath = (): string =>
  getCliPrimaryConfigPath(TOOL_ID) ?? path.join(process.env.HOME ?? "~", ".forge", "config.toml");

const getForgeDir = () => path.dirname(getForgeConfigPath());

/**
 * Render the OmniRoute provider block in Forge TOML format.
 * Forge uses a TOML config at ~/.forge/config.toml with an [openai] section.
 * Reference: https://github.com/antinomyhq/forge
 */
function renderForgeConfig(baseUrl: string, apiKey: string, model: string): string {
  const normalizedBaseUrl = baseUrl.endsWith("/v1") ? baseUrl : `${baseUrl}/v1`;
  return [
    "# Forge config — managed by OmniRoute (plan 14)",
    "",
    "[openai]",
    `api_key = "${apiKey}"`,
    `base_url = "${normalizedBaseUrl}"`,
    `model = "${model}"`,
    "",
  ].join("\n");
}

/**
 * Check if the config file contains OmniRoute settings.
 * Looks for the managed-by-OmniRoute marker comment.
 */
const hasOmniRouteConfig = (content: string | null): boolean => {
  if (!content) return false;
  return content.includes("managed by OmniRoute");
};

// Read current config.toml
const readConfig = async (): Promise<string | null> => {
  try {
    return await fs.readFile(getForgeConfigPath(), "utf-8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
};

// GET — check forge CLI and return current config
export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const runtime = await getCliRuntimeStatus(TOOL_ID);

    if (!runtime.installed || !runtime.runnable) {
      return NextResponse.json({
        installed: runtime.installed,
        runnable: runtime.runnable,
        command: runtime.command,
        commandPath: runtime.commandPath,
        runtimeMode: runtime.runtimeMode,
        reason: runtime.reason,
        config: null,
        message:
          runtime.installed && !runtime.runnable
            ? "Forge CLI is installed but not runnable"
            : "Forge CLI is not installed",
      });
    }

    const config = await readConfig();

    return NextResponse.json({
      installed: runtime.installed,
      runnable: runtime.runnable,
      command: runtime.command,
      commandPath: runtime.commandPath,
      runtimeMode: runtime.runtimeMode,
      reason: runtime.reason,
      config,
      hasOmniRoute: hasOmniRouteConfig(config),
      configPath: getForgeConfigPath(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(err) } },
      { status: 500 }
    );
  }
}

// POST — write OmniRoute settings to Forge config.toml
export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: { message: "Invalid JSON body" } },
      { status: 400 }
    );
  }

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    // Extract keyId BEFORE Zod validation — Zod strips unknown fields
    const keyId = typeof rawBody?.keyId === "string" ? rawBody.keyId.trim() : null;

    const validation = validateBody(cliModelConfigSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { baseUrl, model } = validation.data;
    const apiKey = await resolveApiKey(keyId, validation.data.apiKey);

    const configPath = getForgeConfigPath();
    const forgeDir = getForgeDir();

    // Ensure directory exists
    await fs.mkdir(forgeDir, { recursive: true });

    // Backup current config before modifying
    await createBackup(TOOL_ID, configPath);

    // Write new config (full replace — Forge config is simple)
    const content = renderForgeConfig(baseUrl, apiKey, model);
    await fs.writeFile(configPath, content, "utf-8");

    // Persist last-configured timestamp
    try {
      saveCliToolLastConfigured(TOOL_ID);
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      success: true,
      message: "Forge settings applied successfully!",
      configPath,
    });
  } catch (err) {
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(err) } },
      { status: 500 }
    );
  }
}

// DELETE — remove Forge OmniRoute config
export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const configPath = getForgeConfigPath();

    // Backup before removing
    await createBackup(TOOL_ID, configPath);

    await fs.rm(configPath, { force: true });

    // Clear last-configured timestamp
    try {
      deleteCliToolLastConfigured(TOOL_ID);
    } catch {
      /* non-critical */
    }

    return NextResponse.json({ success: true, message: "Forge settings removed successfully" });
  } catch (err) {
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(err) } },
      { status: 500 }
    );
  }
}
