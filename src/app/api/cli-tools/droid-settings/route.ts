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
import { cliMultiModelConfigSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { resolveApiKey } from "@/shared/services/apiKeyResolver";
import { readJsoncConfig } from "../_lib/jsoncConfig";
import {
  buildDroidCustomModels,
  isOmniRouteCustomModel,
  normalizeDroidModelList,
} from "@/shared/services/droidCustomModels";

const getDroidSettingsPath = () => getCliPrimaryConfigPath("droid");
const getDroidDir = () => path.dirname(getDroidSettingsPath());

// Read current settings.json.
// Ported from upstream decolua/9router@6c10edf8: tolerate JSONC (trailing
// commas) and return null on any parse error so the dashboard renders
// "installed but not configured" instead of a 500 misread as "not installed".
const readSettings = async () => readJsoncConfig(getDroidSettingsPath());

// Check if settings has OmniRoute customModels.
// Multi-model entries are stored as `custom:OmniRoute-0`, `custom:OmniRoute-1`, …
// (Ported from upstream PR decolua/9router#618.)
const hasOmniRouteConfig = (settings: any) => {
  if (!settings || !settings.customModels) return false;
  return settings.customModels.some(isOmniRouteCustomModel);
};

// GET - Check droid CLI and read current settings
export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const runtime = await getCliRuntimeStatus("droid");

    if (!runtime.installed || !runtime.runnable) {
      return NextResponse.json({
        installed: runtime.installed,
        runnable: runtime.runnable,
        command: runtime.command,
        commandPath: runtime.commandPath,
        runtimeMode: runtime.runtimeMode,
        reason: runtime.reason,
        settings: null,
        message:
          runtime.installed && !runtime.runnable
            ? "Factory Droid CLI is installed but not runnable"
            : "Factory Droid CLI is not installed",
      });
    }

    const settings = await readSettings();

    return NextResponse.json({
      installed: runtime.installed,
      runnable: runtime.runnable,
      command: runtime.command,
      commandPath: runtime.commandPath,
      runtimeMode: runtime.runtimeMode,
      reason: runtime.reason,
      settings,
      hasOmniRoute: hasOmniRouteConfig(settings),
      settingsPath: getDroidSettingsPath(),
    });
  } catch (error) {
    console.log("Error checking droid settings:", error);
    return NextResponse.json({ error: "Failed to check droid settings" }, { status: 500 });
  }
}

// POST - Update OmniRoute customModels (merge with existing settings)
export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    // (#549) Extract keyId BEFORE validation — Zod strips unknown fields!
    const keyId = typeof rawBody?.keyId === "string" ? rawBody.keyId.trim() : null;

    const validation = validateBody(cliMultiModelConfigSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { baseUrl, model, models, activeModel } = validation.data;
    const apiKey = await resolveApiKey(keyId, validation.data.apiKey);

    // Multi-model support (ported from decolua/9router#618): accept either a
    // `models` array or the legacy single `model` string.
    const modelList = normalizeDroidModelList({ model, models });
    if (modelList.length === 0) {
      return NextResponse.json(
        {
          error: {
            message: "Invalid request",
            details: [
              { field: "models", message: "baseUrl and at least one model are required" },
            ],
          },
        },
        { status: 400 }
      );
    }

    const droidDir = getDroidDir();
    const settingsPath = getDroidSettingsPath();

    // Ensure directory exists
    await fs.mkdir(droidDir, { recursive: true });

    // Backup current settings before modifying
    await createBackup("droid", settingsPath);

    // Read existing settings or create new
    let settings: Record<string, any> = {};
    try {
      const existingSettings = await fs.readFile(settingsPath, "utf-8");
      settings = JSON.parse(existingSettings);
    } catch {
      /* No existing settings */
    }

    // Ensure customModels array exists
    if (!settings.customModels) {
      settings.customModels = [];
    }

    // Remove every existing OmniRoute config (multi-model: index 0..N)
    settings.customModels = settings.customModels.filter((m) => !isOmniRouteCustomModel(m));

    // Normalize baseUrl to ensure /v1 suffix
    const normalizedBaseUrl = baseUrl.endsWith("/v1") ? baseUrl : `${baseUrl}/v1`;

    // Build and prepend OmniRoute entries (one per requested model)
    const newEntries = buildDroidCustomModels(modelList, {
      baseUrl: normalizedBaseUrl,
      apiKey: apiKey || "your_api_key",
      activeModel,
    });
    settings.customModels = [...newEntries, ...settings.customModels];

    // Write settings
    await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));

    // Persist last-configured timestamp
    try {
      saveCliToolLastConfigured("droid");
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      success: true,
      message: "Factory Droid settings applied successfully!",
      settingsPath,
    });
  } catch (error) {
    console.log("Error updating droid settings:", error);
    return NextResponse.json({ error: "Failed to update droid settings" }, { status: 500 });
  }
}

// DELETE - Remove OmniRoute customModels only (keep other settings)
export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const settingsPath = getDroidSettingsPath();

    // Backup current settings before resetting
    await createBackup("droid", settingsPath);

    // Read existing settings
    let settings: Record<string, any> = {};
    try {
      const existingSettings = await fs.readFile(settingsPath, "utf-8");
      settings = JSON.parse(existingSettings);
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return NextResponse.json({
          success: true,
          message: "No settings file to reset",
        });
      }
      throw error;
    }

    // Remove OmniRoute customModels (every index, multi-model)
    if (settings.customModels) {
      settings.customModels = settings.customModels.filter((m) => !isOmniRouteCustomModel(m));

      // Remove customModels array if empty
      if (settings.customModels.length === 0) {
        delete settings.customModels;
      }
    }

    // Write updated settings
    await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));

    // Clear last-configured timestamp
    try {
      deleteCliToolLastConfigured("droid");
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      success: true,
      message: "OmniRoute settings removed successfully",
    });
  } catch (error) {
    console.log("Error resetting droid settings:", error);
    return NextResponse.json({ error: "Failed to reset droid settings" }, { status: 500 });
  }
}
