"use server";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import {
  ensureCliConfigWriteAllowed,
  getCliPrimaryConfigPath,
  getCliRuntimeStatus,
} from "@/shared/services/cliRuntime";
import { createBackup } from "@/shared/services/backupService";
import { saveCliToolLastConfigured, deleteCliToolLastConfigured } from "@/lib/db/cliToolState";

const getDroidSettingsPath = () => getCliPrimaryConfigPath("droid");
const getDroidDir = () => path.dirname(getDroidSettingsPath());

// Read current settings.json
const readSettings = async () => {
  try {
    const settingsPath = getDroidSettingsPath();
    const content = await fs.readFile(settingsPath, "utf-8");
    return JSON.parse(content);
  } catch (error: any) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
};

// Check if settings has OmniRoute customModels
const hasOmniRouteConfig = (settings: any) => {
  if (!settings || !settings.customModels) return false;
  return settings.customModels.some((m) => m.id === "custom:OmniRoute-0");
};

// GET - Check droid CLI and read current settings
export async function GET() {
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
  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const { baseUrl, apiKey, model } = await request.json();

    if (!baseUrl || !model) {
      return NextResponse.json({ error: "baseUrl and model are required" }, { status: 400 });
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

    // Remove existing OmniRoute config if any
    settings.customModels = settings.customModels.filter((m) => m.id !== "custom:OmniRoute-0");

    // Normalize baseUrl to ensure /v1 suffix
    const normalizedBaseUrl = baseUrl.endsWith("/v1") ? baseUrl : `${baseUrl}/v1`;

    // Add new OmniRoute config
    const customModel = {
      model: model,
      id: "custom:OmniRoute-0",
      index: 0,
      baseUrl: normalizedBaseUrl,
      apiKey: apiKey || "your_api_key",
      displayName: model,
      maxOutputTokens: 131072,
      noImageSupport: false,
      provider: "openai",
    };

    settings.customModels.unshift(customModel);

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
export async function DELETE() {
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

    // Remove OmniRoute customModels
    if (settings.customModels) {
      settings.customModels = settings.customModels.filter((m) => m.id !== "custom:OmniRoute-0");

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
