"use server";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import {
  ensureCliConfigWriteAllowed,
  getCliConfigPaths,
  getCliRuntimeStatus,
} from "@/shared/services/cliRuntime";
import { createMultiBackup } from "@/shared/services/backupService";
import { saveCliToolLastConfigured, deleteCliToolLastConfigured } from "@/lib/db/cliToolState";
import { cliModelConfigSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { getApiKeyById } from "@/lib/localDb";

const getCodexConfigPath = () => getCliConfigPaths("codex").config;
const getCodexAuthPath = () => getCliConfigPaths("codex").auth;
const getCodexDir = () => path.dirname(getCodexConfigPath());

// Parse TOML config to object (simple parser for codex config)
const parseToml = (content: string) => {
  const result: Record<string, any> = { _root: {}, _sections: {} };
  let currentSection = "_root";

  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;

    // Section header like [model_providers.omniroute]
    const sectionMatch = trimmed.match(/^\[(.+)\]$/);
    if (sectionMatch) {
      currentSection = sectionMatch[1];
      result._sections[currentSection] = {};
      return;
    }

    // Key = value
    const kvMatch = trimmed.match(/^([^=]+)\s*=\s*(.+)$/);
    if (kvMatch) {
      let key = kvMatch[1].trim();
      const rawValue = kvMatch[2].trim();
      // Strip quotes from key (TOML quoted keys like "gpt-5.3-codex")
      if (
        (key.startsWith('"') && key.endsWith('"')) ||
        (key.startsWith("'") && key.endsWith("'"))
      ) {
        key = key.slice(1, -1);
      }
      // Parse value preserving TOML types (integers, floats, booleans)
      let parsedValue: string | number | boolean = rawValue;
      if (rawValue === "true") {
        parsedValue = true;
      } else if (rawValue === "false") {
        parsedValue = false;
      } else if (
        (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
        (rawValue.startsWith("'") && rawValue.endsWith("'"))
      ) {
        // Quoted string — strip quotes, keep as string
        parsedValue = rawValue.slice(1, -1);
      } else if (/^-?\d+$/.test(rawValue)) {
        // Integer literal (unquoted)
        parsedValue = parseInt(rawValue, 10);
      } else if (/^-?\d+\.\d+$/.test(rawValue)) {
        // Float literal (unquoted)
        parsedValue = parseFloat(rawValue);
      }
      // Arrays and other complex values stay as raw strings
      if (currentSection === "_root") {
        result._root[key] = parsedValue;
      } else {
        result._sections[currentSection][key] = parsedValue;
      }
    }
  });

  return result;
};

// Format a TOML value: arrays and booleans stay unquoted, strings get quoted
const formatTomlValue = (value: unknown): string => {
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  // Preserve pre-formatted TOML arrays (e.g. ["a", "b"])
  if (typeof value === "string" && value.startsWith("[") && value.endsWith("]")) return value;
  if (typeof value === "string") return `"${value}"`;
  return `"${value}"`;
};

// Convert parsed object back to TOML string
const toToml = (parsed: Record<string, any>) => {
  let lines: string[] = [];

  // Root level keys
  Object.entries(parsed._root).forEach(([key, value]) => {
    lines.push(`${key} = ${formatTomlValue(value)}`);
  });

  // Sections
  Object.entries(parsed._sections).forEach(([section, values]) => {
    lines.push("");
    lines.push(`[${section}]`);
    Object.entries(values).forEach(([key, value]) => {
      const formattedKey = key.includes(".") ? `"${key}"` : key;
      lines.push(`${formattedKey} = ${formatTomlValue(value)}`);
    });
  });

  return lines.join("\n") + "\n";
};

// Read current config.toml
const readConfig = async () => {
  try {
    const configPath = getCodexConfigPath();
    const content = await fs.readFile(configPath, "utf-8");
    return content;
  } catch (error: any) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
};

// Check if config has OmniRoute settings
const hasOmniRouteConfig = (config: string | null) => {
  if (!config) return false;
  return (
    config.includes("openai_base_url") ||
    config.includes('model_provider = "omniroute"') ||
    config.includes("[model_providers.omniroute]")
  );
};

// GET - Check codex CLI and read current settings
export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const runtime = await getCliRuntimeStatus("codex");

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
            ? "Codex CLI is installed but not runnable"
            : "Codex CLI is not installed",
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
      configPath: getCodexConfigPath(),
    });
  } catch (error) {
    console.log("Error checking codex settings:", error);
    return NextResponse.json({ error: "Failed to check codex settings" }, { status: 500 });
  }
}

// POST - Update OmniRoute settings (merge with existing config)
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
    // The dashboard sends masked key strings — resolving by ID guarantees
    // we always write the full key value to the config file.
    const keyId = typeof rawBody?.keyId === "string" ? rawBody.keyId.trim() : null;

    const validation = validateBody(cliModelConfigSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { baseUrl, model, reasoningEffort, wireApi, modelMappings } = validation.data;
    let { apiKey } = validation.data;
    if (!apiKey) {
      return NextResponse.json(
        { error: "baseUrl, apiKey and model are required" },
        { status: 400 }
      );
    }

    // Resolve real key from DB by ID
    if (keyId) {
      try {
        const keyRecord = await getApiKeyById(keyId);
        if (keyRecord?.key) {
          apiKey = keyRecord.key as string;
        }
      } catch {
        // Non-critical: fall back to whatever value was in apiKey
      }
    }

    const codexDir = getCodexDir();
    const configPath = getCodexConfigPath();
    const authPath = getCodexAuthPath();

    // Ensure directory exists
    await fs.mkdir(codexDir, { recursive: true });

    // Backup current configs before modifying
    await createMultiBackup("codex", [configPath, authPath]);

    // Read and parse existing config
    let parsed: Record<string, any> = { _root: {}, _sections: {} };
    try {
      const existingConfig = await fs.readFile(configPath, "utf-8");
      parsed = parseToml(existingConfig);
    } catch {
      /* No existing config */
    }

    // Update only OmniRoute related fields (api_key goes to auth.json, not config.toml)
    parsed._root.model = model;

    if (reasoningEffort && reasoningEffort !== "none") {
      // Optional: low, medium, high
      parsed._root.model_reasoning_effort = reasoningEffort;
    } else {
      delete parsed._root.model_reasoning_effort;
    }

    // Fix: Codex CLI sends /chat/completions; ensure the base resolves strictly to /api/v1
    const normalizedBaseUrl = baseUrl.replace(/\/v1\/?$/, "").replace(/\/api\/?$/, "") + "/api/v1";

    // Always create a custom provider to reliably pass wire_api and use OMNIROUTE_API_KEY
    parsed._root.model_provider = "omniroute";
    parsed._sections["model_providers.omniroute"] = {
      name: "OmniRoute",
      base_url: normalizedBaseUrl,
      wire_api: wireApi || "chat",
      env_key: "OPENAI_API_KEY",
    };
    delete parsed._root.openai_base_url;

    // Process model aliases into notice.model_migrations
    if (modelMappings && Object.keys(modelMappings).length > 0) {
      if (!parsed._sections["notice.model_migrations"]) {
        parsed._sections["notice.model_migrations"] = {};
      }
      for (const [from, to] of Object.entries(modelMappings)) {
        parsed._sections["notice.model_migrations"][from] = to;
      }
    } else {
      delete parsed._sections["notice.model_migrations"];
    }

    // Write merged config
    const configContent = toToml(parsed);
    await fs.writeFile(configPath, configContent);

    // Update auth.json with OPENAI_API_KEY (Codex reads this first)
    let authData: Record<string, any> = {};
    try {
      const existingAuth = await fs.readFile(authPath, "utf-8");
      authData = JSON.parse(existingAuth);
    } catch {
      /* No existing auth */
    }

    authData.OPENAI_API_KEY = apiKey;
    await fs.writeFile(authPath, JSON.stringify(authData, null, 2));

    // Persist last-configured timestamp
    try {
      saveCliToolLastConfigured("codex");
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      success: true,
      message: "Codex settings applied successfully!",
      configPath,
    });
  } catch (error) {
    console.log("Error updating codex settings:", error);
    return NextResponse.json({ error: "Failed to update codex settings" }, { status: 500 });
  }
}

// DELETE - Remove OmniRoute settings only (keep other settings)
export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const configPath = getCodexConfigPath();

    // Backup current configs before resetting
    await createMultiBackup("codex", [configPath, getCodexAuthPath()]);

    // Read and parse existing config
    let parsed: Record<string, any> = { _root: {}, _sections: {} };
    try {
      const existingConfig = await fs.readFile(configPath, "utf-8");
      parsed = parseToml(existingConfig);
    } catch (error: any) {
      if (error.code === "ENOENT") {
        return NextResponse.json({
          success: true,
          message: "No config file to reset",
        });
      }
      throw error;
    }

    // Remove OmniRoute related root fields
    delete parsed._root.openai_base_url;

    if (parsed._root.model_provider === "omniroute") {
      delete parsed._root.model;
      delete parsed._root.model_provider;
    }

    // Remove omniroute provider section
    delete parsed._sections["model_providers.omniroute"];

    // Write updated config
    const configContent = toToml(parsed);
    await fs.writeFile(configPath, configContent);

    // Remove OPENAI_API_KEY from auth.json
    const authPath = getCodexAuthPath();
    try {
      const existingAuth = await fs.readFile(authPath, "utf-8");
      const authData = JSON.parse(existingAuth);
      delete authData.OPENAI_API_KEY;

      // Write back or delete if empty
      if (Object.keys(authData).length === 0) {
        await fs.unlink(authPath);
      } else {
        await fs.writeFile(authPath, JSON.stringify(authData, null, 2));
      }
    } catch {
      /* No auth file */
    }

    // Clear last-configured timestamp
    try {
      deleteCliToolLastConfigured("codex");
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      success: true,
      message: "OmniRoute settings removed successfully",
    });
  } catch (error) {
    console.log("Error resetting codex settings:", error);
    return NextResponse.json({ error: "Failed to reset codex settings" }, { status: 500 });
  }
}
