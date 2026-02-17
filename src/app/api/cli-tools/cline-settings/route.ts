"use server";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { ensureCliConfigWriteAllowed, getCliRuntimeStatus } from "@/shared/services/cliRuntime";
import { createBackup } from "@/shared/services/backupService";

const CLINE_DATA_DIR = path.join(os.homedir(), ".cline", "data");
const GLOBAL_STATE_PATH = path.join(CLINE_DATA_DIR, "globalState.json");
const SECRETS_PATH = path.join(CLINE_DATA_DIR, "secrets.json");

// Read globalState.json
const readGlobalState = async () => {
  try {
    const content = await fs.readFile(GLOBAL_STATE_PATH, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
};

// Read secrets.json
const readSecrets = async () => {
  try {
    const content = await fs.readFile(SECRETS_PATH, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
};

// Check if OmniRoute is configured as OpenAI-compatible provider
const hasOmniRouteConfig = (globalState) => {
  if (!globalState) return false;
  const isOpenAi =
    globalState.actModeApiProvider === "openai" || globalState.planModeApiProvider === "openai";
  const baseUrl = globalState.openAiBaseUrl || "";
  return (
    isOpenAi &&
    (baseUrl.includes("localhost") ||
      baseUrl.includes("127.0.0.1") ||
      baseUrl.includes("omniroute"))
  );
};

// GET - Check cline CLI and read current settings
export async function GET() {
  try {
    const runtime = await getCliRuntimeStatus("cline");

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
            ? "Cline CLI is installed but not runnable"
            : "Cline CLI is not installed",
      });
    }

    const globalState = await readGlobalState();
    const secrets = await readSecrets();

    return NextResponse.json({
      installed: runtime.installed,
      runnable: runtime.runnable,
      command: runtime.command,
      commandPath: runtime.commandPath,
      runtimeMode: runtime.runtimeMode,
      reason: runtime.reason,
      settings: {
        actModeApiProvider: globalState?.actModeApiProvider,
        planModeApiProvider: globalState?.planModeApiProvider,
        openAiBaseUrl: globalState?.openAiBaseUrl,
        openAiModelId: globalState?.openAiModelId,
        planModeOpenAiModelId: globalState?.planModeOpenAiModelId,
      },
      hasOmniRoute: hasOmniRouteConfig(globalState),
      globalStatePath: GLOBAL_STATE_PATH,
      secretsPath: SECRETS_PATH,
    });
  } catch (error) {
    console.log("Error checking cline settings:", error);
    return NextResponse.json({ error: "Failed to check cline settings" }, { status: 500 });
  }
}

// POST - Configure Cline to use OmniRoute as OpenAI-compatible provider
export async function POST(request) {
  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const { baseUrl, apiKey, model } = await request.json();

    if (!baseUrl || !model) {
      return NextResponse.json({ error: "baseUrl and model are required" }, { status: 400 });
    }

    // Ensure directory exists
    await fs.mkdir(CLINE_DATA_DIR, { recursive: true });

    // Backup current files before modifying
    await createBackup("cline", GLOBAL_STATE_PATH);
    await createBackup("cline", SECRETS_PATH);

    // Read existing globalState or create new
    let globalState = {};
    try {
      const existing = await fs.readFile(GLOBAL_STATE_PATH, "utf-8");
      globalState = JSON.parse(existing);
    } catch {
      /* No existing config */
    }

    // Normalize baseUrl - Cline expects the base without /v1
    const normalizedBaseUrl = baseUrl.endsWith("/v1") ? baseUrl.slice(0, -3) : baseUrl;

    // Set OpenAI-compatible provider for both act and plan modes
    globalState.actModeApiProvider = "openai";
    globalState.planModeApiProvider = "openai";
    globalState.openAiBaseUrl = normalizedBaseUrl;
    globalState.openAiModelId = model;
    globalState.planModeOpenAiModelId = model;

    // Write globalState
    await fs.writeFile(GLOBAL_STATE_PATH, JSON.stringify(globalState, null, 2));

    // Write API key to secrets
    let secrets = {};
    try {
      const existing = await fs.readFile(SECRETS_PATH, "utf-8");
      secrets = JSON.parse(existing);
    } catch {
      /* No existing secrets */
    }

    secrets.openAiApiKey = apiKey || "sk_omniroute";

    await fs.writeFile(SECRETS_PATH, JSON.stringify(secrets, null, 2));

    return NextResponse.json({
      success: true,
      message: "Cline settings applied successfully!",
      globalStatePath: GLOBAL_STATE_PATH,
    });
  } catch (error) {
    console.log("Error updating cline settings:", error);
    return NextResponse.json({ error: "Failed to update cline settings" }, { status: 500 });
  }
}

// DELETE - Remove OmniRoute OpenAI-compatible provider config
export async function DELETE() {
  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    // Backup before reset
    await createBackup("cline", GLOBAL_STATE_PATH);
    await createBackup("cline", SECRETS_PATH);

    // Read existing state
    let globalState = {};
    try {
      const existing = await fs.readFile(GLOBAL_STATE_PATH, "utf-8");
      globalState = JSON.parse(existing);
    } catch (error) {
      if (error.code === "ENOENT") {
        return NextResponse.json({ success: true, message: "No settings file to reset" });
      }
      throw error;
    }

    // Only reset if currently set to openai mode with our config
    if (globalState.actModeApiProvider === "openai") {
      delete globalState.openAiBaseUrl;
      delete globalState.openAiModelId;
      delete globalState.planModeOpenAiModelId;
      // Reset provider to default (cline)
      globalState.actModeApiProvider = "cline";
      globalState.planModeApiProvider = "cline";
    }

    await fs.writeFile(GLOBAL_STATE_PATH, JSON.stringify(globalState, null, 2));

    // Remove API key from secrets
    let secrets = {};
    try {
      const existing = await fs.readFile(SECRETS_PATH, "utf-8");
      secrets = JSON.parse(existing);
    } catch {
      /* ignore */
    }

    delete secrets.openAiApiKey;
    await fs.writeFile(SECRETS_PATH, JSON.stringify(secrets, null, 2));

    return NextResponse.json({
      success: true,
      message: "OmniRoute settings removed from Cline",
    });
  } catch (error) {
    console.log("Error resetting cline settings:", error);
    return NextResponse.json({ error: "Failed to reset cline settings" }, { status: 500 });
  }
}
