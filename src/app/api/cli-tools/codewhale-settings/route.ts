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

/**
 * CodeWhale is the actively-maintained successor to DeepSeek TUI (same
 * author, renamed project — https://github.com/Hmbown/CodeWhale). It reads
 * its config from ~/.codewhale/config.toml. Users upgrading from the old
 * DeepSeek TUI binary may still have ~/.deepseek/config.toml around, so we
 * read/write that path as a legacy fallback.
 */
const getPrimaryConfigPath = (): string =>
  getCliPrimaryConfigPath(TOOL_ID) ?? path.join(process.env.HOME ?? "~", ".codewhale", "config.toml");

const getLegacyConfigPath = (): string =>
  path.join(process.env.HOME ?? "~", ".deepseek", "config.toml");

const getPrimaryConfigDir = () => path.dirname(getPrimaryConfigPath());

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

// Read current config.toml — prefers the primary ~/.codewhale path, falling
// back to the legacy ~/.deepseek path for users upgrading from DeepSeek TUI.
const readConfig = async (): Promise<string | null> => {
  for (const candidate of [getPrimaryConfigPath(), getLegacyConfigPath()]) {
    try {
      return await fs.readFile(candidate, "utf-8");
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
    }
  }
  return null;
};

// GET — check CodeWhale CLI and return current config
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
      configPath: getPrimaryConfigPath(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(err) } },
      { status: 500 }
    );
  }
}

// POST — write OmniRoute settings to CodeWhale's config.toml (primary), and
// keep the legacy ~/.deepseek/config.toml in sync when it already exists so
// users who have not yet upgraded their CLI binary keep working.
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

    const primaryPath = getPrimaryConfigPath();
    const legacyPath = getLegacyConfigPath();
    const content = renderCodewhaleConfig(baseUrl, apiKey, model);

    // Always write the primary (~/.codewhale) config.
    await fs.mkdir(getPrimaryConfigDir(), { recursive: true });
    await createBackup(TOOL_ID, primaryPath);
    await fs.writeFile(primaryPath, content, "utf-8");

    // Best-effort: keep the legacy (~/.deepseek) config in sync only if it
    // already exists — never create a fresh legacy directory for new users.
    try {
      await fs.access(legacyPath);
      await createBackup(TOOL_ID, legacyPath);
      await fs.writeFile(legacyPath, content, "utf-8");
    } catch {
      /* legacy config not present — nothing to sync */
    }

    // Persist last-configured timestamp
    try {
      saveCliToolLastConfigured(TOOL_ID);
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      success: true,
      message: "CodeWhale settings applied successfully!",
      configPath: primaryPath,
    });
  } catch (err) {
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(err) } },
      { status: 500 }
    );
  }
}

// DELETE — remove OmniRoute CodeWhale config (primary + legacy, if present)
export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const primaryPath = getPrimaryConfigPath();
    const legacyPath = getLegacyConfigPath();

    // Backup + remove primary before removing
    await createBackup(TOOL_ID, primaryPath);
    await fs.rm(primaryPath, { force: true });

    // Best-effort: remove legacy config too, if present
    try {
      await fs.access(legacyPath);
      await createBackup(TOOL_ID, legacyPath);
      await fs.rm(legacyPath, { force: true });
    } catch {
      /* legacy config not present */
    }

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
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(err) } },
      { status: 500 }
    );
  }
}
