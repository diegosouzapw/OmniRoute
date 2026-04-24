import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { getRuntimePorts } from "@/lib/runtime/ports";
import { getOpenCodeConfigPath } from "@/shared/services/cliRuntime";
import { mergeOpenCodeConfig } from "@/shared/services/opencodeConfig";
import { guideSettingsSaveSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { resolveApiKey } from "@/shared/services/apiKeyResolver";

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
  const { baseUrl, model } = validation.data;
  // (#523) Extract keyId BEFORE validation — Zod strips unknown fields!
  const apiKeyId = typeof rawBody?.keyId === "string" ? rawBody.keyId.trim() : null;
  const apiKey = await resolveApiKey(apiKeyId, validation.data.apiKey);

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
 * Save Qwen Code config to ~/.qwen/settings.json + ~/.qwen/.env
 *
 * Per official docs, credentials go in .env via envKey references,
 * not hardcoded in settings.json modelProviders entries.
 * Writes openai, anthropic, and gemini providers pointing to OmniRoute.
 */
async function saveQwenConfig({ baseUrl, apiKey, model }) {
  const home = os.homedir();
  const configPath = path.join(home, ".qwen", "settings.json");
  const envPath = path.join(home, ".qwen", ".env");
  const configDir = path.dirname(configPath);

  await fs.mkdir(configDir, { recursive: true });

  const normalizedBaseUrl = String(baseUrl || "")
    .trim()
    .replace(/\/+$/, "");
  const resolvedApiKey = apiKey || "sk_omniroute";
  const resolvedModel = model || "coder-model";

  // --- Write API keys to .env ---
  let envContent = "";
  try {
    envContent = await fs.readFile(envPath, "utf-8");
  } catch {
    // File doesn't exist
  }

  const envLines = envContent.split("\n").filter((line) => {
    // Remove old OmniRoute-related keys we're about to write
    return (
      !line.startsWith("OPENAI_API_KEY=") &&
      !line.startsWith("ANTHROPIC_API_KEY=") &&
      !line.startsWith("GEMINI_API_KEY=")
    );
  });

  envLines.push(`OPENAI_API_KEY=${resolvedApiKey}`);
  envLines.push(`ANTHROPIC_API_KEY=${resolvedApiKey}`);
  envLines.push(`GEMINI_API_KEY=${resolvedApiKey}`);

  await fs.writeFile(envPath, envLines.join("\n").trim() + "\n", "utf-8");

  // --- Write modelProviders to settings.json ---
  let existingConfig: Record<string, any> = {};
  try {
    const raw = await fs.readFile(configPath, "utf-8");
    existingConfig = JSON.parse(raw);
  } catch {
    // File doesn't exist or invalid JSON
  }

  if (!existingConfig.modelProviders) existingConfig.modelProviders = {};

  // openai provider — primary, supports all models via OmniRoute
  const openaiEntry = {
    id: resolvedModel,
    name: `${resolvedModel} (OmniRoute)`,
    envKey: "OPENAI_API_KEY",
    baseUrl: normalizedBaseUrl,
    generationConfig: {
      contextWindowSize: 200000,
    },
  };

  if (!existingConfig.modelProviders.openai) existingConfig.modelProviders.openai = [];
  const openaiProviders = existingConfig.modelProviders.openai;
  const openaiIdx = openaiProviders.findIndex(
    (p: any) => p && (p.baseUrl === normalizedBaseUrl || p.id === "omniroute")
  );
  if (openaiIdx >= 0) {
    openaiProviders[openaiIdx] = openaiEntry;
  } else {
    openaiProviders.push(openaiEntry);
  }

  // anthropic provider — for Claude models via OmniRoute
  const anthropicEntry = {
    id: "claude-sonnet-4-6",
    name: "Claude Sonnet 4.6 (OmniRoute)",
    envKey: "ANTHROPIC_API_KEY",
    baseUrl: normalizedBaseUrl,
    generationConfig: {
      contextWindowSize: 200000,
    },
  };

  if (!existingConfig.modelProviders.anthropic) existingConfig.modelProviders.anthropic = [];
  const anthropicProviders = existingConfig.modelProviders.anthropic;
  const anthropicIdx = anthropicProviders.findIndex(
    (p: any) => p && p.baseUrl === normalizedBaseUrl
  );
  if (anthropicIdx >= 0) {
    anthropicProviders[anthropicIdx] = anthropicEntry;
  } else {
    anthropicProviders.push(anthropicEntry);
  }

  // gemini provider — for Gemini models via OmniRoute
  const geminiEntry = {
    id: "gemini-3-flash",
    name: "Gemini 3 Flash (OmniRoute)",
    envKey: "GEMINI_API_KEY",
    baseUrl: normalizedBaseUrl,
  };

  if (!existingConfig.modelProviders.gemini) existingConfig.modelProviders.gemini = [];
  const geminiProviders = existingConfig.modelProviders.gemini;
  const geminiIdx = geminiProviders.findIndex((p: any) => p && p.baseUrl === normalizedBaseUrl);
  if (geminiIdx >= 0) {
    geminiProviders[geminiIdx] = geminiEntry;
  } else {
    geminiProviders.push(geminiEntry);
  }

  await fs.writeFile(configPath, JSON.stringify(existingConfig, null, 2), "utf-8");

  return NextResponse.json({
    success: true,
    message: `Qwen Code config saved to ${configPath} + ${envPath}`,
    configPath,
    envPath,
  });
}
