import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { getCurrentHermesAgentRoles } from "./config-generator/hermes-agent";
import { getCachedLoginShellPath, mergeShellPath } from "@/shared/services/loginShellPath";

const execFileAsync = promisify(execFile);
let execFileImpl = execFileAsync;

// #3321: macOS GUI/Electron truncates PATH, so `which`/`--version` probes miss Homebrew/
// nvm/volta CLIs and the doctor reports them "not installed". Build a lookup env enriched
// with the login-shell PATH (darwin-only, cached, fail-safe → returns process.env elsewhere).
function detectorEnv(): NodeJS.ProcessEnv {
  const loginShellPath = getCachedLoginShellPath();
  if (!loginShellPath) return process.env;
  return { ...process.env, PATH: mergeShellPath(process.env.PATH || "", loginShellPath) };
}

export function __setExecFileImpl(fn: typeof execFileAsync): void {
  execFileImpl = fn;
}

export interface DetectedTool {
  id: string;
  name: string;
  installed: boolean;
  version?: string;
  configPath: string;
  configured: boolean;
  configContents?: string;

  // Rich per-role status for Hermes Agent
  hermesAgentRoles?: Record<
    string,
    {
      model: string;
      provider?: string;
      usingOmniRoute: boolean;
    }
  >;
}

const TOOLS = [
  { id: "claude", name: "Claude Code", configPath: "~/.claude/settings.json" },
  { id: "codex", name: "Codex CLI", configPath: "~/.codex/config.yaml" },
  { id: "opencode", name: "OpenCode", configPath: "~/.config/opencode/opencode.json" },
  { id: "cline", name: "Cline", configPath: "~/.cline/data/globalState.json" },
  { id: "kilocode", name: "Kilo Code", configPath: "~/.config/kilocode/settings.json" },
  { id: "continue", name: "Continue", configPath: "~/.continue/config.yaml" },
  { id: "hermes", name: "Hermes", configPath: "~/.hermes/config.yaml" },
  { id: "hermes-agent", name: "Hermes Agent", configPath: "~/.hermes/config.yaml" },
  { id: "openclaw", name: "OpenClaw", configPath: "~/.openclaw/openclaw.json" },
] as const;

const BINARY_NAMES: Record<string, string> = {
  claude: "claude",
  codex: "codex",
  opencode: "opencode",
  cline: "cline",
  kilocode: "kilocode",
  continue: "continue",
  hermes: "hermes",
  "hermes-agent": "hermes",
  openclaw: "openclaw",
};

function expandHome(p: string): string {
  const home = os.homedir();
  return p.replace(/^~\//, home + "/");
}

function isConfigured(content: string, baseUrl: string): boolean {
  const normalized = baseUrl.replace(/\/+$/, "");
  return (
    content.includes(normalized) ||
    content.includes("localhost:20128") ||
    content.includes("OMNIROUTE_BASE_URL")
  );
}

async function detectBinary(name: string): Promise<{ installed: boolean; version?: string }> {
  const binary = BINARY_NAMES[name] || name;
  const env = detectorEnv();
  try {
    const { stdout } = await execFileImpl(binary, ["--version"], { timeout: 5000, env });
    const version = stdout.trim().replace(/^v/, "");
    return { installed: true, version };
  } catch {
    try {
      // Try `which` as fallback
      const { stdout } = await execFileAsync("which", [binary], { timeout: 5000, env });
      if (stdout.trim()) {
        return { installed: true };
      }
    } catch {}
    return { installed: false };
  }
}

async function readConfigFile(configPath: string): Promise<string | null> {
  try {
    const { readFileSync } = await import("node:fs");
    const expanded = expandHome(configPath);
    if (!expanded) return null;
    return readFileSync(expanded, "utf-8");
  } catch {
    return null;
  }
}

export async function detectTool(id: string): Promise<DetectedTool | null> {
  const tool = TOOLS.find((t) => t.id === id);
  if (!tool) return null;

  const { installed, version } = await detectBinary(tool.id);
  const configPath = expandHome(tool.configPath);
  const configContents = await readConfigFile(tool.configPath);
  const configured = !!configContents && isConfigured(configContents, "http://localhost:20128");

  const result: DetectedTool = {
    id: tool.id,
    name: tool.name,
    installed,
    version,
    configPath,
    configured,
    configContents: configContents ?? undefined,
  };

  // Rich per-role status only for Hermes Agent
  if (tool.id === "hermes-agent") {
    try {
      const roles = await getCurrentHermesAgentRoles();
      const richRoles: Record<string, any> = {};

      Object.entries(roles).forEach(([role, info]) => {
        const usingOmni =
          info?.provider === "omniroute" ||
          (info?.base_url || "").includes("20128") ||
          (info?.base_url || "").includes("localhost:20128");

        richRoles[role] = {
          model: info.model,
          provider: info.provider,
          usingOmniRoute: usingOmni,
        };
      });

      result.hermesAgentRoles = richRoles;
    } catch {
      // ignore – rich status is optional
    }
  }

  return result;
}

export async function detectAllTools(): Promise<DetectedTool[]> {
  const results = await Promise.allSettled(TOOLS.map((t) => detectTool(t.id)));

  return results
    .filter((r) => r.status === "fulfilled" && r.value !== null)
    .map((r) => (r as PromiseFulfilledResult<DetectedTool>).value);
}
