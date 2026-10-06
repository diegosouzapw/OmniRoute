"use server";

import fs from "node:fs/promises";
import path from "node:path";

import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { NextResponse } from "next/server";
import pino from "pino";
import { z } from "zod";

import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { guardCliConfigWrite } from "@/lib/api/cliConfigWriteGuard";
import { deleteCliToolLastConfigured, saveCliToolLastConfigured } from "@/lib/db/cliToolState";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import { resolveApiKey } from "@/shared/services/apiKeyResolver";
import { createBackup } from "@/shared/services/backupService";
import { getCliConfigHome, getCliRuntimeStatus } from "@/shared/services/cliRuntime";
import {
  applyGrokBuildConfig,
  GrokBuildConfigConflictError,
  GROK_SUBAGENT_TYPES,
  parseGrokBuildConfig,
  resetGrokBuildConfig,
  resolveGrokBuildConfigPath,
  type GrokBuildApplyOptions,
  type GrokSubagentType,
} from "@/shared/services/grokBuildConfig";

const logger = pino({ name: "grok-build-settings-api" });
const TOOL_ID = "grok-build";
const DEFAULT_CONTEXT_WINDOW = 200000;

const modelSelectionSchema = z.object({
  model: z.string().trim().min(1),
  contextWindow: z.number().int().positive().optional(),
});

const grokBuildConfigSchema = z.object({
  baseUrl: z
    .string()
    .trim()
    .url()
    .refine((value) => ["http:", "https:"].includes(new URL(value).protocol), {
      message: "baseUrl must use HTTP or HTTPS",
    }),
  apiKey: z.string().nullable().optional(),
  keyId: z.string().trim().min(1).nullable().optional(),
  model: z.string().trim().min(1),
  contextWindow: z.number().int().positive().optional(),
  subagentModels: z
    .object({
      "general-purpose": modelSelectionSchema.optional(),
      explore: modelSelectionSchema.optional(),
      plan: modelSelectionSchema.optional(),
    })
    .optional(),
});

/** Resolve Grok Build config.toml from GROK_HOME or the CLI config home. */
function getGrokBuildConfigPath(
  env: NodeJS.ProcessEnv = process.env,
  configHome = getCliConfigHome()
): string {
  return resolveGrokBuildConfigPath(env, configHome);
}

const readConfigToml = async (configPath: string): Promise<string> => {
  try {
    return await fs.readFile(configPath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return "";
    throw error;
  }
};

const writeAtomic = async (filePath: string, content: string): Promise<void> => {
  const tempPath = `${filePath}.${process.pid}.${Date.now()}.tmp`;
  const mode = process.platform === "win32" ? undefined : 0o600;
  try {
    await fs.writeFile(tempPath, content, { encoding: "utf8", mode });
    if (mode !== undefined) await fs.chmod(tempPath, mode);
    await fs.rename(tempPath, filePath);
  } catch (error) {
    await fs.unlink(tempPath).catch(() => undefined);
    throw error;
  }
};

const normalizeBaseUrl = (baseUrl: string): string => {
  const url = new URL(baseUrl);
  url.pathname = `${url.pathname.replace(/(?:\/v1)*\/?$/, "")}/v1`.replace(/\/+/g, "/");
  url.search = "";
  url.hash = "";
  return url.toString().replace(/\/$/, "");
};

const resolveContextWindow = (value: number | undefined, model: string): number => {
  if (value !== undefined) return value;
  return getResolvedModelCapabilities(model).contextWindow ?? DEFAULT_CONTEXT_WINDOW;
};

const normalizeApplyOptions = (
  data: z.infer<typeof grokBuildConfigSchema>,
  apiKey: string
): GrokBuildApplyOptions => {
  const options: GrokBuildApplyOptions = {
    baseUrl: normalizeBaseUrl(data.baseUrl),
    apiKey,
    model: data.model,
    contextWindow: resolveContextWindow(data.contextWindow, data.model),
  };
  if (data.subagentModels !== undefined) {
    options.subagentModels = {};
    for (const type of GROK_SUBAGENT_TYPES) {
      const selected = data.subagentModels[type];
      if (!selected) continue;
      options.subagentModels[type] = {
        model: selected.model,
        contextWindow: resolveContextWindow(selected.contextWindow, selected.model),
      };
    }
  }
  return options;
};

const omitApiKey = <T extends { api_key: string | null }>(model: T): Omit<T, "api_key"> => {
  const { api_key: _apiKey, ...publicModel } = model;
  return publicModel;
};

const omitApiKeys = (settings: ReturnType<typeof parseGrokBuildConfig>) => ({
  ...settings,
  model: settings.model ? omitApiKey(settings.model) : null,
  subagentModels: Object.fromEntries(
    GROK_SUBAGENT_TYPES.map((type) => [
      type,
      settings.subagentModels[type] ? omitApiKey(settings.subagentModels[type]) : null,
    ])
  ) as Record<
    GrokSubagentType,
    Omit<NonNullable<(typeof settings.subagentModels)[GrokSubagentType]>, "api_key"> | null
  >,
});

const hasOmniRouteConfig = (settings: GrokBuildSettings): boolean =>
  settings.default === "omniroute" &&
  settings.model?.base_url !== null &&
  settings.model?.api_backend === "chat_completions";

/** Return Grok Build runtime and OmniRoute config status. */
export async function GET(request: Request): Promise<Response> {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const configPath = getGrokBuildConfigPath();
    const [runtime, toml] = await Promise.all([
      getCliRuntimeStatus(TOOL_ID),
      readConfigToml(configPath),
    ]);
    const settings = parseGrokBuildConfig(toml);
    const publicSettings = omitApiKeys(settings);
    const apiKeyConfigured = Boolean(
      settings.model?.api_key ||
      GROK_SUBAGENT_TYPES.some((type) => settings.subagentModels[type]?.api_key)
    );

    return NextResponse.json({
      ...runtime,
      config: publicSettings,
      settings: publicSettings,
      hasOmniRoute: hasOmniRouteConfig(settings),
      apiKeyConfigured,
      configPath,
    });
  } catch (error) {
    logger.error({ err: error }, "Failed to read Grok Build settings");
    return NextResponse.json({ error: { message: sanitizeErrorMessage(error) } }, { status: 500 });
  }
}

/** Apply OmniRoute model slots to Grok Build. */
export async function POST(request: Request): Promise<Response> {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
  }

  const validation = grokBuildConfigSchema.safeParse(rawBody);
  if (!validation.success) {
    return NextResponse.json(
      { error: { message: "Invalid request", details: validation.error.issues } },
      { status: 400 }
    );
  }

  try {
    const configPath = getGrokBuildConfigPath();
    const writeError = guardCliConfigWrite(configPath, { toolLabel: "Grok Build" });
    if (writeError) return writeError;

    const apiKey = await resolveApiKey(validation.data.keyId, validation.data.apiKey);
    const toml = applyGrokBuildConfig(
      await readConfigToml(configPath),
      normalizeApplyOptions(validation.data, apiKey)
    );

    await fs.mkdir(path.dirname(configPath), { recursive: true });
    await createBackup(TOOL_ID, configPath);
    await writeAtomic(configPath, toml);
    try {
      saveCliToolLastConfigured(TOOL_ID);
    } catch {
      logger.warn("Failed to record Grok Build config time");
    }

    return NextResponse.json({
      success: true,
      message: "Grok Build settings applied successfully!",
      configPath,
      modelSlot: "omniroute",
    });
  } catch (error) {
    if (error instanceof GrokBuildConfigConflictError) {
      return NextResponse.json({ error: { message: error.message } }, { status: 409 });
    }
    logger.error({ err: error }, "Failed to apply Grok Build settings");
    return NextResponse.json({ error: { message: sanitizeErrorMessage(error) } }, { status: 500 });
  }
}

/** Remove OmniRoute model slots from Grok Build. */
export async function DELETE(request: Request): Promise<Response> {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const configPath = getGrokBuildConfigPath();
    const writeError = guardCliConfigWrite(configPath, { toolLabel: "Grok Build" });
    if (writeError) return writeError;

    const current = await readConfigToml(configPath);
    if (!current) {
      return NextResponse.json({ success: true, message: "No config file to reset" });
    }

    await createBackup(TOOL_ID, configPath);
    await writeAtomic(configPath, resetGrokBuildConfig(current));
    try {
      deleteCliToolLastConfigured(TOOL_ID);
    } catch {
      logger.warn("Failed to clear Grok Build config time");
    }

    return NextResponse.json({
      success: true,
      message: "OmniRoute model slots removed from Grok Build",
    });
  } catch (error) {
    logger.error({ err: error }, "Failed to reset Grok Build settings");
    return NextResponse.json({ error: { message: sanitizeErrorMessage(error) } }, { status: 500 });
  }
}
