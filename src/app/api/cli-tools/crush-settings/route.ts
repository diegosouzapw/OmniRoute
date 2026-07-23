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

const TOOL_ID = "crush";

// Crush (charmbracelet/crush) reads a file-based config, default
// ~/.config/crush/crush.json — same default `bin/cli/commands/setup-crush.mjs`
// (resolveCrushTarget / runSetupCrushCommand) writes to, so the dashboard and
// the `omniroute setup-crush` CLI command agree on one canonical location.
const getCrushConfigPath = (): string =>
  getCliPrimaryConfigPath(TOOL_ID) ??
  path.join(process.env.HOME ?? "~", ".config", "crush", "crush.json");

const getCrushDir = () => path.dirname(getCrushConfigPath());

/**
 * Crush's config uses a `providers.<id>` map. OmniRoute is registered under
 * the `omniroute` provider id as an `openai-compat` provider — same shape
 * `buildCrushProvider()`/`mergeCrushConfig()` in setup-crush.mjs produce.
 */
type CrushProvider = {
  type: "openai-compat";
  base_url: string;
  api_key: string;
  models: Array<{ id: string; name: string; context_window: number }>;
};

const DEFAULT_CONTEXT_WINDOW = 128000;

const ensureV1 = (url: string): string => {
  const s = url.replace(/\/+$/, "");
  return s.endsWith("/v1") ? s : `${s}/v1`;
};

const hasOmniRouteConfig = (settings: Record<string, unknown> | null): boolean => {
  if (!settings) return false;
  const providers = settings.providers as Record<string, unknown> | undefined;
  const omniroute = providers?.omniroute as Record<string, unknown> | undefined;
  return (
    !!omniroute &&
    omniroute.type === "openai-compat" &&
    typeof omniroute.base_url === "string" &&
    omniroute.base_url.length > 0
  );
};

// Read current crush.json
const readConfig = async (): Promise<Record<string, unknown> | null> => {
  try {
    const content = await fs.readFile(getCrushConfigPath(), "utf-8");
    return JSON.parse(content) as Record<string, unknown>;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
};

// GET — check crush CLI and return current config
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
            ? "Crush CLI is installed but not runnable"
            : "Crush CLI is not installed",
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
      configPath: getCrushConfigPath(),
    });
  } catch (err) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}

// POST — write OmniRoute settings to crush.json (providers.omniroute)
export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: { message: "Invalid JSON body" } }, { status: 400 });
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

    const configPath = getCrushConfigPath();
    const crushDir = getCrushDir();

    // Ensure directory exists
    await fs.mkdir(crushDir, { recursive: true });

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

    const normalizedBaseUrl = ensureV1(baseUrl);
    const provider: CrushProvider = {
      type: "openai-compat",
      base_url: normalizedBaseUrl,
      api_key: apiKey,
      models: [{ id: model, name: `OmniRoute: ${model}`, context_window: DEFAULT_CONTEXT_WINDOW }],
    };

    const updated: Record<string, unknown> = {
      ...existing,
      providers: {
        ...((existing.providers as Record<string, unknown>) || {}),
        omniroute: provider,
      },
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
      message: "Crush settings applied successfully!",
      configPath,
    });
  } catch (err) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}

// DELETE — remove OmniRoute provider from Crush config
export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const configPath = getCrushConfigPath();

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

    // Remove only the OmniRoute-managed provider entry — preserve the rest
    // of the user's providers map (Crush supports multiple providers).
    const providers = { ...((existing.providers as Record<string, unknown>) || {}) };
    delete providers.omniroute;

    if (Object.keys(providers).length === 0) {
      delete existing.providers;
    } else {
      existing.providers = providers;
    }

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

    return NextResponse.json({ success: true, message: "Crush OmniRoute settings removed" });
  } catch (err) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}
