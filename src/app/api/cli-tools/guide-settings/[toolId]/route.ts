import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { getOpenCodeConfigPath } from "@/shared/services/cliRuntime";
import { mergeOpenCodeConfig } from "@/shared/services/opencodeConfig";
import { guideSettingsSaveSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { getApiKeyById } from "@/lib/localDb";

/**
 * POST /api/cli-tools/guide-settings/:toolId
 *
 * Save configuration for guide-based tools that have config files.
 * Currently supports: continue, opencode
 */
export async function POST(request, { params }) {
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

  const { toolId } = await params;
  const keyId = typeof rawBody?.keyId === "string" ? rawBody.keyId.trim() : null;
  const validation = validateBody(guideSettingsSaveSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const { baseUrl, model } = validation.data;
  let { apiKey } = validation.data;

  if (keyId) {
    try {
      const keyRecord = await getApiKeyById(keyId);
      if (keyRecord?.key) {
        apiKey = keyRecord.key;
      }
    } catch {
      // Fall back to the provided apiKey when key lookup is unavailable.
    }
  }

  try {
    switch (toolId) {
      case "continue":
        return await saveContinueConfig({ baseUrl, apiKey, model });
      case "opencode":
        // (#524) OpenCode config was never saved because only 'continue' was handled here.
        // opencode reads ~/.config/opencode/config.toml — write the OmniRoute settings there.
        return await saveOpenCodeConfig({ baseUrl, apiKey, model });
      case "qwen":
        return await saveQwenConfig({ baseUrl, apiKey, model });
      default:
        return NextResponse.json(
          { error: `Direct config save not supported for: ${toolId}` },
          { status: 400 }
        );
    }
  } catch (error) {
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}

/**
 * Save Continue config to ~/.continue/config.json
 * Merges with existing config if present.
 */
async function saveContinueConfig({ baseUrl, apiKey, model }) {
  const { apiPort } = getRuntimePorts();
  const configPath = path.join(os.homedir(), ".continue", "config.json");
  const configDir = path.dirname(configPath);

  // Ensure dir exists
  await fs.mkdir(configDir, { recursive: true });

  // Read existing config if any
  let existingConfig: any = {};
  try {
    const raw = await fs.readFile(configPath, "utf-8");
    existingConfig = JSON.parse(raw);
  } catch {
    // No existing config or invalid JSON — start fresh
  }

  // Build the OmniRoute model entry
  const normalizedBaseUrl = String(baseUrl || "")
    .trim()
    .replace(/\/+$/, "");
  const routerModel = {
    apiBase: normalizedBaseUrl,
    title: model,
    model: model,
    provider: "openai",
    apiKey: apiKey || "sk_omniroute",
    omnirouteManaged: true,
  };

  // Merge into existing models array
  const models = existingConfig.models || [];

  function normalizeApiBase(value: unknown): string {
    return String(value || "")
      .trim()
      .replace(/\/+$/, "")
      .toLowerCase();
  }

  // Check if OmniRoute entry already exists and update it, or add new
  const existingIdx = models.findIndex(
    (m) =>
      m &&
      (m.omnirouteManaged === true ||
        normalizeApiBase(m.apiBase) === normalizedBaseUrl.toLowerCase() ||
        normalizeApiBase(m.apiBase).includes("omniroute") ||
        normalizeApiBase(m.apiBase).includes(`localhost:${apiPort}`) ||
        normalizeApiBase(m.apiBase).includes(`127.0.0.1:${apiPort}`) ||
        String(m.apiKey || "")
          .toLowerCase()
          .includes("sk_omniroute"))
  );

  if (existingIdx >= 0) {
    models[existingIdx] = routerModel;
  } else {
    models.push(routerModel);
  }

  existingConfig.models = models;

  // Write back
  await fs.writeFile(configPath, JSON.stringify(existingConfig, null, 2), "utf-8");

  return NextResponse.json({
    success: true,
    message: `Continue config saved to ${configPath}`,
    configPath,
  });
}

/**
 * Save OpenCode config to:
 * - Linux/macOS: ~/.config/opencode/opencode.json (XDG_CONFIG_HOME aware)
 * - Windows: %APPDATA%/opencode/opencode.json
 *
 * (#524) OpenCode was silently failing because this handler was missing.
 */
async function saveOpenCodeConfig({ baseUrl, apiKey, model }) {
  const configPath = getOpenCodeConfigPath();
  const configDir = path.dirname(configPath);

  // Ensure config directory exists
  await fs.mkdir(configDir, { recursive: true });

  const normalizedBaseUrl = String(baseUrl || "")
    .trim()
    .replace(/\/+$/, "");

  // Read existing JSON to preserve other provider entries
  let existingConfig: Record<string, any> = {};
  try {
    const raw = await fs.readFile(configPath, "utf-8");
    existingConfig = JSON.parse(raw);
  } catch {
    // File doesn't exist or invalid JSON — start fresh
  }

  const nextConfig = mergeOpenCodeConfig(existingConfig, {
    baseUrl: normalizedBaseUrl,
    apiKey,
    model,
  });

  await fs.writeFile(configPath, JSON.stringify(nextConfig, null, 2), "utf-8");

  return NextResponse.json({
    success: true,
    message: `OpenCode config saved to ${configPath}`,
    configPath,
  });
}

/**
 * Save Qwen Code config to ~/.qwen/settings.json
 * Writes the modelProviders.openai entry with OmniRoute as the provider.
 * Merges with existing config to preserve other providers.
 */
async function saveQwenConfig({ baseUrl, apiKey, model }) {
  const home = os.homedir();
  const configPath = path.join(home, ".qwen", "settings.json");
  const configDir = path.dirname(configPath);

  await fs.mkdir(configDir, { recursive: true });

  const normalizedBaseUrl = String(baseUrl || "")
    .trim()
    .replace(/\/+$/, "");

  // Read existing config to preserve other provider entries
  let existingConfig: Record<string, any> = {};
  try {
    const raw = await fs.readFile(configPath, "utf-8");
    existingConfig = JSON.parse(raw);
  } catch {
    // File doesn't exist or invalid JSON
  }

  // Build OmniRoute openai provider entry
  const omnirouteEntry = {
    id: "omniroute",
    name: "OmniRoute",
    envKey: "OPENAI_API_KEY",
    baseUrl: normalizedBaseUrl,
    apiKey: apiKey || "sk_omniroute",
    generationConfig: {
      defaultModel: model || "auto",
    },
  };

  // Ensure modelProviders.openai array exists
  if (!existingConfig.modelProviders) existingConfig.modelProviders = {};
  if (!existingConfig.modelProviders.openai) existingConfig.modelProviders.openai = [];

  const providers = existingConfig.modelProviders.openai;

  // Replace OmniRoute entry if already present, otherwise add it
  const existingIdx = providers.findIndex(
    (p: any) => p && (p.baseUrl === normalizedBaseUrl || p.id === "omniroute")
  );
  if (existingIdx >= 0) {
    providers[existingIdx] = omnirouteEntry;
  } else {
    providers.push(omnirouteEntry);
  }

  await fs.writeFile(configPath, JSON.stringify(existingConfig, null, 2), "utf-8");

  return NextResponse.json({
    success: true,
    message: `Qwen Code config saved to ${configPath}`,
    configPath,
  });
}
