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

const TOOL_ID = "smelt";

const getSmeltConfigPath = (): string =>
  getCliPrimaryConfigPath(TOOL_ID) ?? path.join(process.env.HOME ?? "~", ".smelt", "config.json");

const getSmeltDir = () => path.dirname(getSmeltConfigPath());

/**
 * Check if the config file contains OmniRoute settings.
 */
const hasOmniRouteConfig = (settings: Record<string, unknown> | null): boolean => {
  if (!settings) return false;
  return (
    typeof settings.baseUrl === "string" &&
    settings.baseUrl.length > 0 &&
    settings._managedBy === "omniroute"
  );
};

// Read current config.json
const readConfig = async (): Promise<Record<string, unknown> | null> => {
  try {
    const content = await fs.readFile(getSmeltConfigPath(), "utf-8");
    return JSON.parse(content) as Record<string, unknown>;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
};

// GET — check smelt CLI and return current config
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
            ? "Smelt CLI is installed but not runnable"
            : "Smelt CLI is not installed",
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
      configPath: getSmeltConfigPath(),
    });
  } catch (err) {
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(err) } },
      { status: 500 }
    );
  }
}

// POST — write OmniRoute settings to Smelt config.json
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

    const configPath = getSmeltConfigPath();
    const smeltDir = getSmeltDir();

    // Ensure directory exists
    await fs.mkdir(smeltDir, { recursive: true });

    // Backup current config before modifying
    await createBackup(TOOL_ID, configPath);

    // Read existing config or start fresh
    let existing: Record<string, unknown> = {};
    try {
      const raw = await fs.readFile(configPath, "utf-8");
      existing = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      /* No existing config */
    }

    // Merge OmniRoute settings (smelt uses OpenAI-compatible config)
    const normalizedBaseUrl = baseUrl.endsWith("/v1") ? baseUrl : `${baseUrl}/v1`;
    const updated: Record<string, unknown> = {
      ...existing,
      baseUrl: normalizedBaseUrl,
      apiKey,
      model,
      _managedBy: "omniroute",
    };

    await fs.writeFile(configPath, JSON.stringify(updated, null, 2), "utf-8");

    // Persist last-configured timestamp
    try {
      saveCliToolLastConfigured(TOOL_ID);
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      success: true,
      message: "Smelt settings applied successfully!",
      configPath,
    });
  } catch (err) {
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(err) } },
      { status: 500 }
    );
  }
}

// DELETE — remove OmniRoute settings from Smelt config
export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const configPath = getSmeltConfigPath();

    // Backup before modifying
    await createBackup(TOOL_ID, configPath);

    // Read existing config
    let existing: Record<string, unknown> = {};
    try {
      const raw = await fs.readFile(configPath, "utf-8");
      existing = JSON.parse(raw) as Record<string, unknown>;
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        return NextResponse.json({ success: true, message: "No config file to reset" });
      }
      throw err;
    }

    // Remove OmniRoute-managed fields
    delete existing.baseUrl;
    delete existing.apiKey;
    delete existing.model;
    delete existing._managedBy;

    if (Object.keys(existing).length === 0) {
      await fs.rm(configPath, { force: true });
    } else {
      await fs.writeFile(configPath, JSON.stringify(existing, null, 2), "utf-8");
    }

    // Clear last-configured timestamp
    try {
      deleteCliToolLastConfigured(TOOL_ID);
    } catch {
      /* non-critical */
    }

    return NextResponse.json({ success: true, message: "Smelt OmniRoute settings removed" });
  } catch (err) {
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(err) } },
      { status: 500 }
    );
  }
}
