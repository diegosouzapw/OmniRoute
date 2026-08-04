export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { exec } from "child_process";
import { promisify } from "util";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { cliAuthOnlyConfigSchema } from "@/shared/validation/schemas/cli";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const execAsync = promisify(exec);

// ── Paths ──────────────────────────────────────────────────────────────
const getLettaDir = () => path.join(os.homedir(), ".letta");
const getSettingsPath = () => path.join(getLettaDir(), "settings.json");
const getLocalBackendDir = () => path.join(getLettaDir(), "lc-local-backend");
const getProviderAuthPath = () => path.join(getLocalBackendDir(), "providers", "auth.json");
const getBackupPath = () =>
  path.join(getLocalBackendDir(), "providers", "auth.json.omniroute-backup");

// ── Provider name in auth.json ─────────────────────────────────────────
// "lmstudio" provider type has localModelDiscovery: "openai-compatible"
// which auto-discovers models from /v1/models and shows them in /model picker
// Models appear as "lmstudio/<model-id>" in the CLI
const PROVIDER_NAME = "lmstudio";
const PROVIDER_TYPE = "lmstudio_openai";

// ── Check if Letta CLI is installed ────────────────────────────────────
const checkLettaInstalled = async () => {
  try {
    const isWindows = os.platform() === "win32";
    const command = isWindows ? "where letta" : "which letta";
    const env = isWindows
      ? { ...process.env, PATH: `${process.env.APPDATA}\\npm;${process.env.PATH}` }
      : process.env;
    await execAsync(command, { windowsHide: true, env });
    return true;
  } catch {
    // Also check if config directory exists (CLI may be installed but not on PATH)
    try {
      await fs.access(getLettaDir());
      return true;
    } catch {
      return false;
    }
  }
};

// ── Read settings.json ─────────────────────────────────────────────────
const readSettings = async () => {
  try {
    const content = await fs.readFile(getSettingsPath(), "utf-8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw error;
  }
};

// ── Read auth.json ──────────────────────────────────────────────────────
const readAuthFile = async () => {
  try {
    const content = await fs.readFile(getProviderAuthPath(), "utf-8");
    return JSON.parse(content);
  } catch (error) {
    if (error.code === "ENOENT") return { version: 1, providers: {} };
    throw error;
  }
};

// ── Check if a base_url points to OmniRoute ──────────────────────────────
const isOmniRouteUrl = (baseUrl) => {
  if (!baseUrl) return false;
  return baseUrl.includes(":20128") || baseUrl.includes(":3000") || baseUrl.includes("omniroute");
};

// ── Check if OmniRoute is configured ─────────────────────────────────────
const hasOmniRouteConfig = (authFile) => {
  if (!authFile?.providers) return false;
  const provider = authFile.providers[PROVIDER_NAME];
  if (!provider) return false;
  return isOmniRouteUrl(provider.base_url);
};

// ── GET - Check Letta CLI and read current settings ────────────────────
export async function GET(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;
  try {
    const isInstalled = await checkLettaInstalled();

    if (!isInstalled) {
      return NextResponse.json({
        installed: false,
        config: null,
        message: "Letta CLI is not installed",
      });
    }

    const settings = await readSettings();
    const authFile = await readAuthFile();
    const provider = authFile?.providers?.[PROVIDER_NAME];

    // Detect if lmstudio is already configured for a non-OmniRoute endpoint
    let lmstudioConflict = false;
    if (provider && !isOmniRouteUrl(provider.base_url)) {
      lmstudioConflict = true;
    }

    return NextResponse.json({
      installed: true,
      config: authFile,
      hasOmniRoute: hasOmniRouteConfig(authFile),
      lmstudioConflict,
      configPath: getProviderAuthPath(),
      letta: {
        baseURL: provider?.base_url || null,
      },
      backendMode: settings.preferredBackendMode || "api",
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(error) } },
      { status: 500 }
    );
  }
}

// ── POST - Apply OmniRoute as LM Studio provider + switch to local mode ──
/**
 * Steps 1-2 of POST: read the existing Letta auth.json, refuse to clobber a real
 * LM Studio configuration unless `overwrite` is set (409 with conflict info), and back
 * up a non-OmniRoute provider before it is overwritten. Extracted to keep POST under
 * the complexity gate.
 */
async function prepareLettaAuthFile(
  overwrite: boolean | undefined
): Promise<
  | { conflictResponse: NextResponse }
  | { authFile: { version: number; providers: Record<string, any> }; authPath: string }
> {
  const localBackendDir = getLocalBackendDir();
  const authPath = getProviderAuthPath();
  await fs.mkdir(path.join(localBackendDir, "providers"), { recursive: true });

  let authFile = { version: 1, providers: {} as Record<string, any> };
  try {
    const existing = await fs.readFile(authPath, "utf-8");
    authFile = JSON.parse(existing);
  } catch {
    /* No existing file */
  }

  const existingProvider = authFile.providers?.[PROVIDER_NAME];
  if (existingProvider && !isOmniRouteUrl(existingProvider.base_url) && !overwrite) {
    // User has lmstudio configured for actual LM Studio — refuse to overwrite
    return {
      conflictResponse: NextResponse.json(
        {
          error: `lmstudio provider is already configured for ${existingProvider.base_url}. Overwriting will break your existing LM Studio connection. Apply again to overwrite.`,
          conflict: true,
          existingBaseUrl: existingProvider.base_url,
        },
        { status: 409 }
      ),
    };
  }

  // Back up existing lmstudio provider before overwriting
  if (existingProvider && !isOmniRouteUrl(existingProvider.base_url)) {
    const backupPath = getBackupPath();
    await fs.writeFile(backupPath, JSON.stringify(existingProvider, null, 2));
  }

  return { authFile, authPath };
}

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
    const validation = validateBody(cliAuthOnlyConfigSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { baseUrl, apiKey, overwrite } = validation.data;

    const normalizedBaseUrl = baseUrl.endsWith("/v1") ? baseUrl : `${baseUrl}/v1`;

    // ── 1-2. Read auth.json, guard non-OmniRoute conflicts, back up before overwrite ──
    const prepared = await prepareLettaAuthFile(overwrite);
    if ("conflictResponse" in prepared) {
      return prepared.conflictResponse;
    }
    const { authFile, authPath } = prepared;

    // ── 3. Switch to local mode in settings.json ──
    const settingsPath = getSettingsPath();
    const lettaDir = getLettaDir();
    await fs.mkdir(lettaDir, { recursive: true });

    let settings = {};
    try {
      const existing = await fs.readFile(settingsPath, "utf-8");
      settings = JSON.parse(existing);
    } catch {
      /* No existing settings */
    }

    settings.preferredBackendMode = "local";
    await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));

    // ── 4. Write lmstudio provider to auth.json ──
    // Clean up legacy lc-omniroute provider if present
    if (authFile.providers?.["lc-omniroute"]) {
      delete authFile.providers["lc-omniroute"];
    }

    // Create or update lmstudio provider
    authFile.providers[PROVIDER_NAME] = {
      id: `local-provider-${PROVIDER_NAME}`,
      name: PROVIDER_NAME,
      provider_type: PROVIDER_TYPE,
      provider_category: "byok",
      auth: { type: "api", key: apiKey },
      base_url: normalizedBaseUrl,
      created_at: authFile.providers[PROVIDER_NAME]?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await fs.writeFile(authPath, JSON.stringify(authFile, null, 2));

    return NextResponse.json({
      success: true,
      message: "Settings applied. Restart Letta CLI, then use /model to select a OmniRoute model.",
      needsRestart: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(error) } },
      { status: 500 }
    );
  }
}

// ── DELETE - Remove OmniRoute configuration ──────────────────────────────
export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;
  try {
    // ── 1. Remove lmstudio provider from auth.json, restore backup if exists ──
    const authPath = getProviderAuthPath();
    const backupPath = getBackupPath();
    let authFile = { version: 1, providers: {} };
    try {
      const existing = await fs.readFile(authPath, "utf-8");
      authFile = JSON.parse(existing);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }

    let changed = false;
    let restored = false;

    if (authFile.providers?.[PROVIDER_NAME]) {
      // Check if there's a backup of a pre-existing lmstudio config
      try {
        const backupContent = await fs.readFile(backupPath, "utf-8");
        const backupProvider = JSON.parse(backupContent);
        // Restore the original lmstudio config
        authFile.providers[PROVIDER_NAME] = backupProvider;
        restored = true;
        await fs.unlink(backupPath);
      } catch {
        // No backup — just remove the provider
        delete authFile.providers[PROVIDER_NAME];
      }
      changed = true;
    }

    // Clean up legacy lc-omniroute provider if present
    if (authFile.providers?.["lc-omniroute"]) {
      delete authFile.providers["lc-omniroute"];
      changed = true;
    }

    if (changed) {
      await fs.writeFile(authPath, JSON.stringify(authFile, null, 2));
    }

    // ── 2. Reset backend mode to api in settings.json ──
    const settingsPath = getSettingsPath();
    try {
      const existing = await fs.readFile(settingsPath, "utf-8");
      const settings = JSON.parse(existing);
      if (settings.preferredBackendMode === "local") {
        settings.preferredBackendMode = "api";
        await fs.writeFile(settingsPath, JSON.stringify(settings, null, 2));
      }
    } catch {
      /* No settings file */
    }

    const message = restored
      ? "OmniRoute config removed. Your original LM Studio provider has been restored. Restart Letta CLI to take effect."
      : "OmniRoute config removed. Restart Letta CLI to take effect.";

    return NextResponse.json({
      success: true,
      message,
      needsRestart: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: { message: sanitizeErrorMessage(error) } },
      { status: 500 }
    );
  }
}
