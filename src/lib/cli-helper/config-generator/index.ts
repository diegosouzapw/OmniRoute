import path from "node:path";
import os from "node:os";

import { getHermesConfigPath } from "./hermesHome.ts";
import { generateClaudeConfig } from "./claude";
import { generateClineConfig } from "./cline";
import { generateCodexConfig, findLegacyCodexYaml } from "./codex";
import { generateContinueConfig } from "./continue";
import { generateHermesConfig } from "./hermes";
import { generateHermesAgentConfig, type HermesAgentConfigPayload } from "./hermes-agent";
import { generateKilocodeConfig } from "./kilocode";
import { generateOpencodeConfig } from "./opencode";
import { generateOmpConfig } from "./omp";
import { resolveOpencodeConfigPath } from "../../../shared/services/opencodeConfigPath";
import { normalizeCliToolId } from "../../../shared/services/cliRuntime";

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
  /** Human-readable migration note (e.g. a legacy config file that is now ignored). */
  migration?: string;
}

export function validateBaseUrl(url: string): boolean {
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

// Static paths that do not depend on runtime env vars can stay eagerly computed.
const STATIC_TOOL_CONFIG_PATHS: Record<string, string> = {
  claude: path.join(os.homedir(), ".claude", "settings.json"),
  // Modern Codex (v0.137+) reads TOML only; config.yaml is the legacy npm CLI.
  codex: path.join(os.homedir(), ".codex", "config.toml"),
  cline: path.join(os.homedir(), ".cline", "data", "globalState.json"),
  // `kilo` is the canonical id; the file name remains `kilocode` because the
  // VS Code extension owns that settings namespace.
  kilo: path.join(os.homedir(), ".config", "kilocode", "settings.json"),
  continue: path.join(os.homedir(), ".continue", "config.yaml"),
  omp: path.join(os.homedir(), ".omp", "agent", "models.yml"),
};

/**
 * Returns the config path for a given tool.
 *
 * Hermes entries are resolved lazily at call-time so `HERMES_HOME` is always
 * honoured (#3628).  All other tools use the eagerly-computed static map.
 */
function getToolConfigPath(toolId: string): string {
  toolId = normalizeCliToolId(toolId);
  if (toolId === "hermes" || toolId === "hermes-agent") {
    return getHermesConfigPath();
  }
  if (toolId === "opencode") {
    return resolveOpencodeConfigPath();
  }
  return STATIC_TOOL_CONFIG_PATHS[toolId] ?? "";
}

type ConfigGenerator = (options: GenerateOptions) => string | Promise<string>;

const GENERATORS: Record<string, ConfigGenerator> = {
  claude: generateClaudeConfig,
  codex: generateCodexConfig,
  opencode: generateOpencodeConfig,
  cline: generateClineConfig,
  kilo: generateKilocodeConfig,
  continue: generateContinueConfig,
  omp: generateOmpConfig as ConfigGenerator,
  hermes: generateHermesConfig,
  "hermes-agent": generateHermesAgentConfig as any, // rich multi-role version
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
    const canonicalToolId = normalizeCliToolId(toolId);
    const generate = GENERATORS[canonicalToolId];
    if (!generate) {
      return { success: false, configPath: "", error: `Unknown tool: ${toolId}` };
    }
    const configPath = getToolConfigPath(canonicalToolId);
    const content =
      canonicalToolId === "opencode"
        ? await generateOpencodeConfig({ ...options, configPath })
        : canonicalToolId === "codex"
          ? await generateCodexConfig({ ...options, configPath })
          : await generate(options);

    let migration: string | undefined;
    if (canonicalToolId === "codex") {
      const legacyYaml = findLegacyCodexYaml();
      if (legacyYaml) {
        migration =
          `Legacy ${legacyYaml} found — modern Codex (v0.137+) ignores YAML and reads ` +
          `only config.toml. The YAML file was left untouched; remove it manually once ` +
          `you confirm nothing else uses it.`;
      }
    }

    return { success: true, configPath, content, ...(migration ? { migration } : {}) };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, configPath: "", error: `Generation failed: ${msg}` };
  }
}

export async function generateAllConfigs(options: GenerateOptions): Promise<GenerateResult[]> {
  // Keep the batch view derived from the actual generator registry. Hermes
  // Agent has a richer payload and is intentionally exposed by its dedicated
  // endpoint, not by this simple `{baseUrl, apiKey, model}` batch API.
  const toolIds = Object.keys(GENERATORS).filter((id) => id !== "hermes-agent");
  const results = await Promise.allSettled(toolIds.map((id) => generateConfig(id, options)));

  return results.map((r) =>
    r.status === "fulfilled"
      ? r.value
      : { success: false, configPath: "", error: r.reason?.message || "Unknown error" }
  );
}
