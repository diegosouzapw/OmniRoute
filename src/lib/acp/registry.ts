/**
 * ACP (Agent Client Protocol) — CLI Agent Registry
 *
 * Discovers installed CLI tools on the system by checking standard paths
 * and running version commands. Used to offer ACP transport as an alternative
 * to the HTTP proxy method.
 *
 * Supports 14 built-in agents + user-defined custom agents from settings.
 *
 * Reference: https://github.com/iOfficeAI/AionUi (auto-detects CLI agents)
 */

import { execFileSync } from "child_process";
import path from "path";

export interface CliAgentInfo {
  /** Agent identifier (e.g., "codex", "claude", "goose") */
  id: string;
  /** Display name */
  name: string;
  /** Binary name to spawn */
  binary: string;
  /** Version detection command */
  versionCommand: string;
  /** Detected version (null if not installed) */
  version: string | null;
  /** Whether the agent is installed and available */
  installed: boolean;
  /** Provider ID that this agent maps to in OmniRoute */
  providerAlias: string;
  /** Arguments to pass when spawning for ACP */
  spawnArgs: string[];
  /** Protocol used for communication */
  protocol: "stdio" | "http";
  /** Whether this is a user-defined custom agent */
  isCustom?: boolean;
}

/** Shape stored in settings DB for custom agents */
export interface CustomAgentDef {
  id: string;
  name: string;
  binary: string;
  versionCommand: string;
  providerAlias: string;
  spawnArgs: string[];
  protocol: "stdio" | "http";
}

/**
 * Registry of known CLI agents that support ACP or similar protocols.
 */
const AGENT_DEFINITIONS: Omit<CliAgentInfo, "version" | "installed">[] = [
  {
    id: "codex",
    name: "OpenAI Codex CLI",
    binary: "codex",
    versionCommand: "codex --version",
    providerAlias: "codex",
    spawnArgs: ["--quiet"],
    protocol: "stdio",
  },
  {
    id: "claude",
    name: "Claude Code CLI",
    binary: "claude",
    versionCommand: "claude --version",
    providerAlias: "claude",
    spawnArgs: ["--print", "--output-format", "json"],
    protocol: "stdio",
  },
  {
    id: "goose",
    name: "Goose CLI",
    binary: "goose",
    versionCommand: "goose --version",
    providerAlias: "goose",
    spawnArgs: [],
    protocol: "stdio",
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    binary: "gemini",
    versionCommand: "gemini --version",
    providerAlias: "gemini-cli",
    spawnArgs: [],
    protocol: "stdio",
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    binary: "openclaw",
    versionCommand: "openclaw --version",
    providerAlias: "openclaw",
    spawnArgs: [],
    protocol: "stdio",
  },
  {
    id: "aider",
    name: "Aider",
    binary: "aider",
    versionCommand: "aider --version",
    providerAlias: "aider",
    spawnArgs: ["--no-auto-commits"],
    protocol: "stdio",
  },
  {
    id: "opencode",
    name: "OpenCode",
    binary: "opencode",
    versionCommand: "opencode --version",
    providerAlias: "opencode",
    spawnArgs: [],
    protocol: "stdio",
  },
  {
    id: "cline",
    name: "Cline",
    binary: "cline",
    versionCommand: "cline --version",
    providerAlias: "cline",
    spawnArgs: [],
    protocol: "stdio",
  },
  {
    id: "qwen-code",
    name: "Qwen Code",
    binary: "qwen",
    versionCommand: "qwen --version",
    providerAlias: "qwen",
    spawnArgs: [],
    protocol: "stdio",
  },
  {
    id: "forge",
    name: "ForgeCode",
    binary: "forge",
    versionCommand: "forge --version",
    providerAlias: "forge",
    spawnArgs: [],
    protocol: "stdio",
  },
  {
    id: "amazon-q",
    name: "Amazon Q Developer",
    binary: "q",
    versionCommand: "q --version",
    providerAlias: "amazon-q",
    spawnArgs: [],
    protocol: "stdio",
  },
  {
    id: "interpreter",
    name: "Open Interpreter",
    binary: "interpreter",
    versionCommand: "interpreter --version",
    providerAlias: "interpreter",
    spawnArgs: [],
    protocol: "stdio",
  },
  {
    id: "cursor-cli",
    name: "Cursor CLI",
    binary: "cursor",
    versionCommand: "cursor --version",
    providerAlias: "cursor",
    spawnArgs: [],
    protocol: "stdio",
  },
  {
    id: "warp",
    name: "Warp AI",
    binary: "warp",
    versionCommand: "warp --version",
    providerAlias: "warp",
    spawnArgs: [],
    protocol: "stdio",
  },
];

// ---------------------------------------------------------------------------
// Detection cache (60 seconds)
// ---------------------------------------------------------------------------
let _cachedAgents: CliAgentInfo[] | null = null;
let _cacheTimestamp = 0;
const CACHE_TTL_MS = 60_000;

/** Custom agents loaded from settings */
let _customAgentDefs: CustomAgentDef[] = [];

const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;

/**
 * Set custom agent definitions from settings.
 */
export function setCustomAgents(agents: CustomAgentDef[]): void {
  _customAgentDefs = agents || [];
  _cachedAgents = null; // invalidate cache
}

/**
 * Get current custom agent definitions.
 */
export function getCustomAgentDefs(): CustomAgentDef[] {
  return _customAgentDefs;
}

function tokenizeVersionCommand(command: string): string[] | null {
  if (!command || DISALLOWED_VERSION_COMMAND_CHARS.test(command)) {
    return null;
  }

  const tokens: string[] = [];
  let current = "";
  let quote: '"' | "'" | null = null;

  for (let index = 0; index < command.length; index += 1) {
    const char = command[index];

    if (quote) {
      if (char === quote) {
        quote = null;
      } else {
        current += char;
      }
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (/\s/.test(char)) {
      if (current) {
        tokens.push(current);
        current = "";
      }
      continue;
    }

    if (char === "\\") {
      const next = command[index + 1];
      if (next) {
        current += next;
        index += 1;
        continue;
      }
    }

    current += char;
  }

  if (quote) {
    return null;
  }

  if (current) {
    tokens.push(current);
  }

  return tokens.length > 0 ? tokens : null;
}

function normalizeCommandToken(command: string): string {
  return path.normalize(command).replace(/\\/g, "/").toLowerCase();
}

export function resolveVersionProbe(
  binary: string,
  versionCommand: string,
  requireBinaryMatch = false
): { command: string; args: string[] } | null {
  const tokens = tokenizeVersionCommand(versionCommand);
  if (!tokens) {
    return null;
  }

  const [command, ...args] = tokens;
  if (!command) {
    return null;
  }

  if (requireBinaryMatch) {
    const normalizedCommand = normalizeCommandToken(command);
    const allowed = new Set([
      normalizeCommandToken(binary),
      normalizeCommandToken(path.basename(binary)),
    ]);
    if (!allowed.has(normalizedCommand)) {
      return null;
    }
  }

  return { command, args };
}

export function shouldUseShellForVersionProbe(
  command: string,
  platform = process.platform
): boolean {
  if (platform !== "win32") return false;

  const normalized = command.trim().toLowerCase();
  if (!normalized) return false;

  return (
    normalized.endsWith(".cmd") || normalized.endsWith(".bat") || path.extname(normalized) === ""
  );
}

/**
 * Detect a single agent by running its version command.
 */
function detectAgent(
  def: Omit<CliAgentInfo, "version" | "installed">,
  isCustom = false
): CliAgentInfo {
  let version: string | null = null;
  let installed = false;

  try {
    const probe = resolveVersionProbe(def.binary, def.versionCommand, isCustom);
    if (!probe) {
      return { ...def, version, installed, isCustom };
    }

    const output = execFileSync(probe.command, probe.args, {
      timeout: 5000,
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
      ...(shouldUseShellForVersionProbe(probe.command) ? { shell: true } : {}),
    }).trim();

    // Extract version number from output
    const versionMatch = output.match(/(\d+\.\d+\.\d+(?:-\w+)?)/);
    version = versionMatch ? versionMatch[1] : output.split("\n")[0];
    installed = true;
  } catch {
    // Not installed or not runnable
  }

  return { ...def, version, installed, isCustom };
}

/**
 * Detect installed CLI agents on the system.
 * Results are cached for 60 seconds.
 */
export function detectInstalledAgents(): CliAgentInfo[] {
  const now = Date.now();
  if (_cachedAgents && now - _cacheTimestamp < CACHE_TTL_MS) {
    return _cachedAgents;
  }

  // Merge built-in + custom definitions
  const allDefs = [
    ...AGENT_DEFINITIONS.map((d) => ({ ...d, _custom: false })),
    ..._customAgentDefs.map((d) => ({ ...d, _custom: true })),
  ];

  _cachedAgents = allDefs.map((def) => {
    const { _custom, ...rest } = def;
    return detectAgent(rest, _custom);
  });
  _cacheTimestamp = now;

  return _cachedAgents;
}

/**
 * Force refresh detection cache.
 */
export function refreshAgentCache(): CliAgentInfo[] {
  _cachedAgents = null;
  return detectInstalledAgents();
}

/**
 * Get a specific agent by ID.
 */
export function getAgentById(id: string): CliAgentInfo | undefined {
  const agents = detectInstalledAgents();
  return agents.find((a) => a.id === id);
}

/**
 * Get agents that are installed and available for ACP.
 */
export function getAvailableAgents(): CliAgentInfo[] {
  return detectInstalledAgents().filter((a) => a.installed);
}
