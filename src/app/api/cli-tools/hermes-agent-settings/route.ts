import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { getCliPrimaryConfigPath } from "@/shared/services/cliRuntime";
import { validateBaseUrl } from "@/lib/cli-helper/config-generator";
import {
  generateHermesAgentConfig,
  getCurrentHermesAgentRoles,
  HERMES_AGENT_ROLES,
  type HermesAgentRole,
} from "@/lib/cli-helper/config-generator/hermes-agent";
import { getHermesConfigPath } from "@/lib/cli-helper/config-generator/hermesHome";
import { getApiKeyById } from "@/lib/db/apiKeys";
import { createMultiBackup } from "@/shared/services/backupService";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const hermesRoleIds = HERMES_AGENT_ROLES.map((role) => role.id) as [
  HermesAgentRole,
  ...HermesAgentRole[],
];

const hermesAgentSettingsSchema = z.object({
  baseUrl: z.string().min(1, "baseUrl is required"),
  keyId: z.string().optional().nullable(),
  apiKey: z.string().optional().nullable(),
  selections: z
    .array(
      z.object({
        role: z.enum(hermesRoleIds),
        model: z.string(),
      })
    )
    .min(1, "selections must be a non-empty array of { role, model }"),
  preview: z.boolean().optional(),
});

/**
 * Dedicated endpoint for Hermes Agent (the advanced Nous Research terminal agent).
 * This is separate from the original simple "Hermes" guided tool.
 *
 * GET  -> returns current per-role configuration (default, delegation, auxiliary.*)
 * POST -> accepts { baseUrl, keyId?, apiKey?, selections: [{role, model}, ...] }
 */

// Resolved lazily so HERMES_HOME is always honoured (#3628).
const getConfigPath = () => getHermesConfigPath();

function getMetadataPath(configPath: string) {
  return path.join(path.dirname(configPath), ".first-setup.json");
}

const HERMES_API_KEY_ENV = "OMNIROUTE_API_KEY";
const HERMES_API_KEY_PLACEHOLDERS = new Set(["YOUR_OMNIROUTE_API_KEY_HERE", "sk_omniroute"]);

async function readTextIfPresent(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return "";
    throw error;
  }
}

function upsertHermesApiKey(existing: string, value: string): string {
  if (/[\r\n]/.test(value)) throw new Error("Invalid OmniRoute API key");
  const replacement = `${HERMES_API_KEY_ENV}=${value}`;
  const next: string[] = [];
  let replaced = false;
  for (const line of existing.split(/\r?\n/)) {
    if (!line.startsWith(`${HERMES_API_KEY_ENV}=`)) {
      next.push(line);
    } else if (!replaced) {
      next.push(replacement);
      replaced = true;
    }
  }
  if (!replaced) {
    while (next.length && next[next.length - 1] === "") next.pop();
    next.push(replacement);
  }
  return `${next.join("\n")}\n`;
}

function hasUsableHermesApiKey(existing: string): boolean {
  const prefix = `${HERMES_API_KEY_ENV}=`;
  const line = existing.split(/\r?\n/).find((candidate) => candidate.startsWith(prefix));
  if (!line) return false;
  let value = line.slice(prefix.length).trim();
  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'")))
  ) {
    value = value.slice(1, -1);
  }
  return value.length > 0 && !HERMES_API_KEY_PLACEHOLDERS.has(value);
}

async function writeAtomic(filePath: string, content: string, mode: number): Promise<void> {
  const tempPath = `${filePath}.${process.pid}.${randomUUID()}.tmp`;
  try {
    await fs.writeFile(tempPath, content, { encoding: "utf8", mode });
    await fs.chmod(tempPath, mode);
    await fs.rename(tempPath, filePath);
  } catch (error) {
    await fs.unlink(tempPath).catch(() => {});
    throw error;
  }
}

export async function GET(request: Request) {
  // cli-tools routes touch host config files — guard every handler with the shared auth.
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;
  try {
    const roles = await getCurrentHermesAgentRoles();

    const configPath = getCliPrimaryConfigPath("hermes-agent") || getConfigPath();
    let firstSetupAt: string | null = null;

    try {
      const metaRaw = await fs.readFile(getMetadataPath(configPath), "utf8");
      const meta = JSON.parse(metaRaw);
      firstSetupAt = meta.firstSetupAt || null;
    } catch {
      // no metadata yet
    }

    return NextResponse.json({ success: true, roles, firstSetupAt });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: sanitizeErrorMessage(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = hermesAgentSettingsSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 }
    );
  }

  const { baseUrl, keyId, apiKey, selections, preview } = parsed.data;

  if (!validateBaseUrl(baseUrl)) {
    return NextResponse.json({ error: "baseUrl must be a valid http(s) URL" }, { status: 400 });
  }

  const configPath = getCliPrimaryConfigPath("hermes-agent") || getConfigPath();
  const configDir = path.dirname(configPath);

  await fs.mkdir(configDir, { recursive: true });

  // Resolve keyId server-side. The generator references OMNIROUTE_API_KEY;
  // only the non-preview apply path writes the resolved secret to Hermes' .env.
  let resolvedApiKey = apiKey ?? null;
  if (keyId) {
    try {
      const keyRecord = await getApiKeyById(keyId);
      if (keyRecord?.key) {
        resolvedApiKey = keyRecord.key as string;
      }
    } catch {
      // Non-critical: fall back to whatever apiKey (if any) was already provided.
    }
  }

  const payload = {
    baseUrl,
    keyId,
    apiKey: resolvedApiKey,
    selections,
  };

  const result = await generateHermesAgentConfig(payload);

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  // Preview mode: return the would-be YAML without writing it (Phase 5 polish)
  if (preview === true) {
    return NextResponse.json({
      success: true,
      preview: true,
      yaml: result.yaml,
      configPath,
    });
  }

  const envPath = path.join(configDir, ".env");
  const existingEnv = await readTextIfPresent(envPath);
  const hasExistingApiKey = hasUsableHermesApiKey(existingEnv);
  if (!resolvedApiKey && !hasExistingApiKey) {
    return NextResponse.json(
      { error: "The selected OmniRoute API key could not be resolved" },
      { status: 400 }
    );
  }
  await createMultiBackup("hermes-agent", [configPath, envPath]);
  if (resolvedApiKey) {
    await writeAtomic(envPath, upsertHermesApiKey(existingEnv, resolvedApiKey), 0o600);
  }
  await writeAtomic(configPath, result.yaml, 0o600);

  // Record first setup time if this is the first save via OmniRoute
  const metaPath = getMetadataPath(configPath);
  try {
    await fs.access(metaPath);
  } catch {
    await fs.writeFile(
      metaPath,
      JSON.stringify({ firstSetupAt: new Date().toISOString() }),
      "utf8"
    );
  }

  return NextResponse.json({
    success: true,
    message: `Hermes Agent config saved to ${configPath}`,
    configPath,
  });
}
