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

const TOOL_ID = "codewhale";

const getCodewhaleConfigPath = (): string =>
  getCliPrimaryConfigPath(TOOL_ID) ??
  path.join(process.env.HOME ?? "~", ".codewhale", "config.toml");

const getCodewhaleDir = () => path.dirname(getCodewhaleConfigPath());

/**
 * Render the OmniRoute config block in CodeWhale TOML format.
 * CodeWhale reads OPENAI_BASE_URL and OPENAI_API_KEY from its config.
 * Reference: https://github.com/Hmbown/CodeWhale
 */
function renderCodewhaleConfig(baseUrl: string, apiKey: string, model: string): string {
  return [
    "# CodeWhale config — managed by OmniRoute (plan 14)",
    "",
    "[openai]",
    `base_url = "${baseUrl}"`,
    `api_key = "${apiKey}"`,
    `model = "${model}"`,
    "",
  ].join("\n");
}

/**
 * Check if the config file contains OmniRoute settings.
 */
const hasOmniRouteConfig = (content: string | null): boolean => {
  if (!content) return false;
  return content.includes("managed by OmniRoute");
};

// Read current config.toml
const readConfig = async (): Promise<string | null> => {
  try {
    return await fs.readFile(getCodewhaleConfigPath(), "utf-8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
};

// GET — check codewhale CLI and return current config
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
            ? "CodeWhale is installed but not runnable"
            : "CodeWhale is not installed",
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
      configPath: getCodewhaleConfigPath(),
    });
  } catch (err) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}

// POST — write OmniRoute settings to CodeWhale config.toml
export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
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

    const configPath = getCodewhaleConfigPath();
    const configDir = getCodewhaleDir();

    // Ensure directory exists
    await fs.mkdir(configDir, { recursive: true });

    // Backup current config before modifying
    await createBackup(TOOL_ID, configPath);

    // Write new config (full replace — simple TOML file)
    const content = renderCodewhaleConfig(baseUrl, apiKey, model);
    await fs.writeFile(configPath, content, "utf-8");

    // Persist last-configured timestamp
    try {
      saveCliToolLastConfigured(TOOL_ID);
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      success: true,
      message: "CodeWhale settings applied successfully!",
      configPath,
    });
  } catch (err) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}

// DELETE — remove CodeWhale OmniRoute config
export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const configPath = getCodewhaleConfigPath();

    // Backup before removing
    await createBackup(TOOL_ID, configPath);

    await fs.rm(configPath, { force: true });

    // Clear last-configured timestamp
    try {
      deleteCliToolLastConfigured(TOOL_ID);
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      success: true,
      message: "CodeWhale settings removed successfully",
    });
  } catch (err) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}
