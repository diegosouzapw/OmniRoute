import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { requireCliToolsAuth } from "@/lib/api/requireCliToolsAuth";
import { getCliPrimaryConfigPath } from "@/shared/services/cliRuntime";
import {
  generateHermesAgentConfig,
  getCurrentHermesAgentRoles,
} from "@/lib/cli-helper/config-generator/hermes-agent";

/**
 * Dedicated endpoint for Hermes Agent (the advanced Nous Research terminal agent).
 * This is separate from the original simple "Hermes" guided tool.
 *
 * GET  -> returns current per-role configuration (default, delegation, auxiliary.*)
 * POST -> accepts { baseUrl, keyId?, apiKey?, selections: [{role, model}, ...] }
 */

const CONFIG_PATH = path.join(os.homedir(), ".hermes", "config.yaml");

function getMetadataPath(configPath: string) {
  return path.join(path.dirname(configPath), ".first-setup.json");
}

export async function GET(request: Request) {
  // cli-tools routes touch host config files — guard every handler with the shared auth.
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;
  try {
    const roles = await getCurrentHermesAgentRoles();

    const configPath = getCliPrimaryConfigPath("hermes-agent") || CONFIG_PATH;
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
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireCliToolsAuth(request);
  if (authError) return authError;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { baseUrl, keyId, apiKey, selections } = body;

  if (!baseUrl) {
    return NextResponse.json({ error: "baseUrl is required" }, { status: 400 });
  }

  if (!Array.isArray(selections) || selections.length === 0) {
    return NextResponse.json(
      { error: "selections must be a non-empty array of { role, model }" },
      { status: 400 }
    );
  }

  const configPath = getCliPrimaryConfigPath("hermes-agent") || CONFIG_PATH;
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
  if (body.preview === true) {
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
