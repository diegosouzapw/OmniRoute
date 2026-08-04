import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { getCliPrimaryConfigPath } from "@/shared/services/cliRuntime";
import { validateBaseUrl } from "@/lib/cli-helper/config-generator";
import {
  generateHermesAgentConfig,
  getCurrentHermesAgentRoles,
} from "@/lib/cli-helper/config-generator/hermes-agent";
import { getHermesConfigPath } from "@/lib/cli-helper/config-generator/hermesHome";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const hermesAgentSettingsSchema = z.object({
  baseUrl: z.string().min(1, "baseUrl is required"),
  keyId: z.string().optional().nullable(),
  apiKey: z.string().optional().nullable(),
  selections: z
    .array(
      z.object({
        role: z.string(),
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

  const payload = {
    baseUrl,
    keyId,
    apiKey,
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

  await fs.writeFile(configPath, result.yaml, "utf-8");

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
