import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { getOpenCodeConfigPath } from "@/shared/services/cliRuntime";
import { mergeOpenCodeConfigText } from "@/shared/services/opencodeConfig";
import { guideSettingsSaveSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { resolveApiKey, getOrCreateApiKey } from "@/shared/services/apiKeyResolver";

/**
 * POST /api/cli-tools/guide-settings/:toolId
 *
 * Save configuration for guide-based tools that have config files.
 * Currently supports: continue, opencode
 */
export async function POST(request, { params }) {
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

  const { toolId } = await params;
  const validation = validateBody(guideSettingsSaveSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const { baseUrl, model, models, modelLabels } = validation.data;
  // (#523) Extract keyId BEFORE validation — Zod strips unknown fields!
  const apiKeyId = typeof rawBody?.keyId === "string" ? rawBody.keyId.trim() : null;
  // If no keyId provided, auto-create a valid DB-backed key instead of using placeholder
  const apiKey = apiKeyId
    ? await resolveApiKey(apiKeyId, validation.data.apiKey)
    : await getOrCreateApiKey();

  try {
    switch (toolId) {
      case "continue":
        return await saveContinueConfig({ baseUrl, apiKey, model });
      case "opencode":
        // (#524) OpenCode config was never saved because only 'continue' was handled here.
        // OpenCode reads ~/.config/opencode/opencode.json — write the OmniRoute settings there.
        return await saveOpenCodeConfig({ baseUrl, apiKey, model, models, modelLabels });
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
async function saveOpenCodeConfig({ baseUrl, apiKey, model, models, modelLabels }) {
  const configPath = getOpenCodeConfigPath();
  const configDir = path.dirname(configPath);

  // Ensure config directory exists
  await fs.mkdir(configDir, { recursive: true });

  const normalizedBaseUrl = String(baseUrl || "")
    .trim()
    .replace(/\/+$/, "");

  // Read existing JSONC/JSON text to preserve unrelated config formatting and fields.
  let existingConfigText = "";
  try {
    existingConfigText = await fs.readFile(configPath, "utf-8");
  } catch {
    // File doesn't exist — start fresh
  }

  const nextConfigText = mergeOpenCodeConfigText(existingConfigText, {
    baseUrl: normalizedBaseUrl,
    apiKey,
    model,
    models,
    modelLabels,
  });

  await fs.writeFile(configPath, nextConfigText, "utf-8");

  return NextResponse.json({
    success: true,
    message: `OpenCode config saved to ${configPath}`,
    configPath,
  });
}

/**
 * Save Qwen Code config to ~/.qwen/settings.json
 *
 * Uses security.auth format (not modelProviders) since Qwen Code
 * prioritizes security.auth.selectedType over modelProviders entries.
 * Per official docs: security.auth takes highest precedence.
 */
async function saveQwenConfig({ baseUrl, apiKey, model }) {
  const home = os.homedir();
  const configPath = path.join(home, ".qwen", "settings.json");

  await fs.mkdir(path.dirname(configPath), { recursive: true });

  const normalizedBaseUrl = String(baseUrl || "")
    .trim()
    .replace(/\/+$/, "");
  const resolvedApiKey = apiKey || "sk_omniroute";
  const resolvedModel = model || "gemini-cli/gemini-3.1-pro-preview";

  // Read existing config to preserve other settings (permissions, mcpServers, etc.)
  let existingConfig: Record<string, any> = {};
  try {
    const raw = await fs.readFile(configPath, "utf-8");
    existingConfig = JSON.parse(raw);
  } catch {
    // File doesn't exist or invalid JSON
  }

  // Set security.auth for openai auth type with direct credentials
  // This takes priority over modelProviders entries (per Qwen docs)
  existingConfig.security = {
    ...existingConfig.security,
    auth: {
      selectedType: "openai",
      apiKey: resolvedApiKey,
      baseUrl: normalizedBaseUrl,
    },
  };

  // Set model to the selected model
  existingConfig.model = {
    ...existingConfig.model,
    name: resolvedModel,
  };

  await fs.writeFile(configPath, JSON.stringify(existingConfig, null, 2), "utf-8");

  return NextResponse.json({
    success: true,
    message: `Qwen Code config saved to ${configPath}`,
    configPath,
  });
}
