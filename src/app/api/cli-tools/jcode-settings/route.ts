"use server";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { parse as parseToml } from "smol-toml";
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

const TOOL_ID = "jcode";

/**
 * jcode reads named provider profiles from `[providers.<name>]` tables in
 * ~/.jcode/config.toml (TOML, not JSON — the previous revision of this route
 * wrote a ~/.jcode/config.json that jcode never reads). Reference:
 * https://github.com/1jehuang/jcode#openai-compatible-providers
 *
 * The OmniRoute-managed profile is kept inside a marker-delimited block so
 * apply/reset round-trips without disturbing the rest of the user's config.
 */
const MANAGED_BEGIN = "# >>> managed by OmniRoute (jcode provider profile) >>>";
const MANAGED_END = "# <<< managed by OmniRoute <<<";

const getJcodeConfigPath = (): string =>
  getCliPrimaryConfigPath(TOOL_ID) ?? path.join(process.env.HOME ?? "~", ".jcode", "config.toml");

const getJcodeDir = () => path.dirname(getJcodeConfigPath());

const tomlString = (value: string): string => JSON.stringify(String(value));

/**
 * Render the managed `[providers.omniroute]` block. The API key is stored
 * inline via jcode's `api_key` field; `requires_api_key = false` keeps a
 * keyless local gateway working.
 */
function renderManagedBlock(baseUrl: string, apiKey: string, model: string): string {
  const normalizedBaseUrl = baseUrl.endsWith("/v1") ? baseUrl : `${baseUrl}/v1`;
  const lines = [
    MANAGED_BEGIN,
    "[providers.omniroute]",
    'type = "openai-compatible"',
    `base_url = ${tomlString(normalizedBaseUrl)}`,
  ];
  if (apiKey) lines.push(`api_key = ${tomlString(apiKey)}`);
  lines.push(`default_model = ${tomlString(model)}`, "requires_api_key = false", MANAGED_END);
  return lines.join("\n");
}

const hasOmniRouteConfig = (content: string | null): boolean =>
  Boolean(content && content.includes(MANAGED_BEGIN));

/** Strip the managed block (including surrounding blank padding) from config text. */
function stripManagedBlock(content: string): string {
  const begin = content.indexOf(MANAGED_BEGIN);
  if (begin === -1) return content;
  const endMarker = content.indexOf(MANAGED_END, begin);
  const end = endMarker === -1 ? content.length : endMarker + MANAGED_END.length;
  const before = content.slice(0, begin).replace(/\n+$/, "\n");
  const after = content.slice(end).replace(/^\n+/, "\n");
  return (before + after).replace(/^\n+/, "");
}

// Read current config.toml
const readConfig = async (): Promise<string | null> => {
  try {
    return await fs.readFile(getJcodeConfigPath(), "utf-8");
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
};

// GET — check jcode CLI and return current config
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
            ? "jcode CLI is installed but not runnable"
            : "jcode CLI is not installed",
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
      configPath: getJcodeConfigPath(),
    });
  } catch (err) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}

// POST — write the OmniRoute provider profile into jcode's config.toml
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

    const configPath = getJcodeConfigPath();
    const jcodeDir = getJcodeDir();

    // Ensure directory exists
    await fs.mkdir(jcodeDir, { recursive: true });

    // Backup current config before modifying
    await createBackup(TOOL_ID, configPath);

    // Read existing config (TOML text) or start fresh
    let existing = "";
    try {
      existing = await fs.readFile(configPath, "utf-8");
    } catch {
      /* No existing config */
    }

    // Refuse to double-define the table if the user hand-wrote a
    // [providers.omniroute] profile outside our managed block — duplicate
    // TOML tables would make the whole config unparseable for jcode.
    const unmanaged = stripManagedBlock(existing);
    try {
      if (unmanaged.trim()) {
        const parsed = parseToml(unmanaged) as { providers?: Record<string, unknown> };
        if (parsed.providers && Object.hasOwn(parsed.providers, "omniroute")) {
          return NextResponse.json(
            {
              error: {
                message:
                  "config.toml already defines [providers.omniroute] outside the OmniRoute-managed block; remove it or manage it manually",
              },
            },
            { status: 409 }
          );
        }
      }
    } catch {
      return NextResponse.json(
        {
          error: {
            message:
              "existing ~/.jcode/config.toml is not valid TOML; fix it before applying OmniRoute settings",
          },
        },
        { status: 409 }
      );
    }

    const base = unmanaged.trimEnd();
    const block = renderManagedBlock(baseUrl, apiKey ?? "", model);
    const updated = base ? `${base}\n\n${block}\n` : `${block}\n`;

    await fs.writeFile(configPath, updated, "utf-8");

    // Persist last-configured timestamp
    try {
      saveCliToolLastConfigured(TOOL_ID);
    } catch {
      /* non-critical */
    }

    return NextResponse.json({
      success: true,
      message:
        "jcode settings applied! Start jcode with `jcode --provider-profile omniroute` or pick the profile with /model.",
      configPath,
    });
  } catch (err) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}

// DELETE — remove the OmniRoute-managed block from jcode's config.toml
export async function DELETE(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  try {
    const writeGuard = ensureCliConfigWriteAllowed();
    if (writeGuard) {
      return NextResponse.json({ error: writeGuard }, { status: 403 });
    }

    const configPath = getJcodeConfigPath();

    // Backup before modifying
    await createBackup(TOOL_ID, configPath);

    let existing: string;
    try {
      existing = await fs.readFile(configPath, "utf-8");
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        return NextResponse.json({ success: true, message: "No config file to reset" });
      }
      throw err;
    }

    const remaining = stripManagedBlock(existing);

    if (!remaining.trim()) {
      await fs.rm(configPath, { force: true });
    } else {
      await fs.writeFile(configPath, remaining, "utf-8");
    }

    // Clear last-configured timestamp
    try {
      deleteCliToolLastConfigured(TOOL_ID);
    } catch {
      /* non-critical */
    }

    return NextResponse.json({ success: true, message: "jcode OmniRoute settings removed" });
  } catch (err) {
    return NextResponse.json({ error: { message: sanitizeErrorMessage(err) } }, { status: 500 });
  }
}
