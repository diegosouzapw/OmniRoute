import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import os from "os";

/**
 * POST /api/cli-tools/guide-settings/:toolId
 *
 * Save configuration for guide-based tools that have config files.
 * Currently supports: continue
 */
export async function POST(request, { params }) {
  const { toolId } = await params;
  const { baseUrl, apiKey, model } = await request.json();

  if (!model) {
    return NextResponse.json({ error: "Model is required" }, { status: 400 });
  }

  try {
    switch (toolId) {
      case "continue":
        return await saveContinueConfig({ baseUrl, apiKey, model });
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
        normalizeApiBase(m.apiBase).includes("localhost:20128") ||
        normalizeApiBase(m.apiBase).includes("127.0.0.1:20128") ||
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
