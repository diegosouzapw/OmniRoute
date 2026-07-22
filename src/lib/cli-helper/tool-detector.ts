import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { getCurrentHermesAgentRoles } from "./config-generator/hermes-agent";
import {
  getLookupEnv,
  locateCommand,
  shouldUseShellForCommand,
} from "../../shared/services/cliRuntime";

const execFileAsync = promisify(execFile);
let execFileImpl = execFileAsync;
let locateCommandImpl = locateCommand;

export function __setExecFileImpl(fn: typeof execFileAsync): void {
  execFileImpl = fn;
}

export function __setLocateCommandImpl(fn: typeof locateCommand): void {
  locateCommandImpl = fn;
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

// #968/#7279: on native Windows, npm installs CLI wrappers (claude/codex/opencode/…)
// as .cmd/.bat shims. Node's CVE-2024-27980 hardening makes execFile()/spawn() reject
// those without `shell: true`, and the `which` fallback below doesn't exist natively
// on Windows (no WSL/git-bash) — so both probes threw, both were swallowed, and an
// installed CLI was reported as absent. Reuse cliRuntime.ts's `locateCommand`
// (already win32-aware since #968: `where.exe` + `.cmd`/`.exe`/`.bat`/`.com`
// preference) for existence/path, then probe `--version` with `shell: true` when the
// resolved binary needs it. If this drifts again, check cliRuntime.ts first.
async function detectBinaryWindows(
  binary: string,
  env: NodeJS.ProcessEnv
): Promise<{ installed: boolean; version?: string }> {
  const located = await locateCommandImpl(binary, env);
  if (!located.installed || !located.commandPath) return { installed: false };

  try {
    const useShell = shouldUseShellForCommand(located.commandPath);
    const { stdout } = await execFileImpl(located.commandPath, ["--version"], {
      timeout: 5000,
      env,
      ...(useShell ? { shell: true } : {}),
    });
    return { installed: true, version: stdout.trim().replace(/^v/, "") };
  } catch {
    // Binary exists on PATH but the --version probe failed (unusual flag, slow
    // startup, etc.) — still report it as installed since locateCommand confirmed it.
    return { installed: true };
  }
}

async function detectBinary(name: string): Promise<{ installed: boolean; version?: string }> {
  const binary = BINARY_NAMES[name] || name;
  const env = getLookupEnv();

  if (process.platform === "win32") {
    return detectBinaryWindows(binary, env);
  }

  try {
    const { stdout } = await execFileImpl(binary, ["--version"], { timeout: 5000, env });
    const version = stdout.trim().replace(/^v/, "");
    return { installed: true, version };
  } catch {
    try {
      // Try `which` as fallback (routed through execFileImpl so it stays mockable)
      const { stdout } = await execFileImpl("which", [binary], { timeout: 5000, env });
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
