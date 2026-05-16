import path from "node:path";
import os from "node:os";

import { generateClaudeConfig } from "./claude";
import { generateClineConfig } from "./cline";
import { generateCodexConfig } from "./codex";
import { generateContinueConfig } from "./continue";
import { generateKilocodeConfig } from "./kilocode";
import { generateOpencodeConfig } from "./opencode";

export interface GenerateOptions {
  baseUrl: string;
  apiKey: string;
  model?: string;
}

export interface GenerateResult {
  success: boolean;
  configPath: string;
  content?: string;
  error?: string;
}

function validateBaseUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function expandHome(p: string): string {
  const home = os.homedir();
  return p.replace(/^~\//, home + "/");
}

const TOOL_CONFIG_PATHS: Record<string, string> = {
  claude: path.join(os.homedir(), ".claude", "settings.json"),
  codex: path.join(os.homedir(), ".codex", "config.yaml"),
  opencode: path.join(os.homedir(), ".config", "opencode", "opencode.json"),
  cline: path.join(os.homedir(), ".cline", "data", "globalState.json"),
  kilocode: path.join(os.homedir(), ".config", "kilocode", "settings.json"),
  continue: path.join(os.homedir(), ".continue", "config.yaml"),
};

type ConfigGenerator = (options: GenerateOptions) => string | Promise<string>;

const GENERATORS: Record<string, ConfigGenerator> = {
  claude: generateClaudeConfig,
  codex: generateCodexConfig,
  opencode: generateOpencodeConfig,
  cline: generateClineConfig,
  kilocode: generateKilocodeConfig,
  continue: generateContinueConfig,
};

export async function generateConfig(
  toolId: string,
  options: GenerateOptions
): Promise<GenerateResult> {
  if (!validateBaseUrl(options.baseUrl)) {
    return {
      success: false,
      configPath: "",
      error: "Invalid baseUrl: must be an absolute HTTP(S) URL",
    };
  }

  if (!options.apiKey || options.apiKey.trim().length === 0) {
    return { success: false, configPath: "", error: "API key is required" };
  }

  try {
    const generate = GENERATORS[toolId];
    if (!generate) {
      return { success: false, configPath: "", error: `Unknown tool: ${toolId}` };
    }
    const content = await generate(options);
    const configPath = TOOL_CONFIG_PATHS[toolId] || "";
    return { success: true, configPath, content };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, configPath: "", error: `Generation failed: ${msg}` };
  }
}

export async function generateAllConfigs(options: GenerateOptions): Promise<GenerateResult[]> {
  const toolIds = ["claude", "codex", "opencode", "cline", "kilocode", "continue"] as const;
  const results = await Promise.allSettled(toolIds.map((id) => generateConfig(id, options)));

  return results.map((r) =>
    r.status === "fulfilled"
      ? r.value
      : { success: false, configPath: "", error: r.reason?.message || "Unknown error" }
  );
}
