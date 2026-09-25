/**
 * ACP (Agent Client Protocol) — CLI Agent Registry
 *
 * Discovers installed CLI tools on the system by checking standard paths
 * and running version commands. Used to offer ACP transport as an alternative
 * to the HTTP proxy method.
 *
 * Supports built-in agents + user-defined custom agents from settings.
 *
 * Reference: https://github.com/iOfficeAI/AionUi (auto-detects CLI agents)
 */

import { execFileSync } from "child_process";
import path from "path";
import {
  CLI_INTEGRATION_MANIFEST,
  listCliIntegrationIds,
  type CliAgentBackendSpec,
} from "@/shared/constants/cliIntegrationManifest";

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
  /** Native ACP or a legacy newline/stdout adapter. */
  backendMode?: CliAgentBackendSpec["mode"];
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
  backendMode?: CliAgentBackendSpec["mode"];
}

/**
 * Registry of known CLI agents that support ACP or similar protocols.
 */
export const BUILT_IN_AGENT_IDS = Object.freeze(listCliIntegrationIds("agentBackend"));

const AGENT_DEFINITIONS: Omit<CliAgentInfo, "version" | "installed">[] = BUILT_IN_AGENT_IDS.map(
  (id) => {
    const entry = CLI_INTEGRATION_MANIFEST[id];
    const backend = entry.agentBackend;
    if (!backend) throw new Error(`CLI '${id}' has no agent backend contract`);
    return {
      id,
      name: entry.displayName,
      binary: backend.binary,
      versionCommand: [backend.binary, ...backend.versionArgs].join(" "),
      providerAlias: backend.providerAlias,
      spawnArgs: [...backend.spawnArgs],
      protocol: "stdio",
      backendMode: backend.mode,
    };
  }
);

// ---------------------------------------------------------------------------
// Detection cache (60 seconds)
// ---------------------------------------------------------------------------
let _cachedAgents: CliAgentInfo[] | null = null;
let _cacheTimestamp = 0;
const CACHE_TTL_MS = 60_000;

/** Custom agents loaded from settings */
let _customAgentDefs: CustomAgentDef[] = [];

const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;

// A version probe only ever needs a version flag. For untrusted (client-registered)
// custom agents the binary-match check alone is not enough: the caller controls both
// `binary` and `versionCommand`, so a matching interpreter with an eval-style argument
// (`node -e …`, `python -c …`, `ruby -e …`) reaches execFileSync as arbitrary code
// execution without any shell metacharacter. Restricting the args to a recognized
// version flag closes that path — see GHSA-jphr-2gw7-xrwp / GHSA-hf57-cqmx-p4gr.
const SAFE_VERSION_PROBE_ARG = /^(-v|-V|--version|-version|version|--ver)$/;

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

/** Resolve a registered launch contract without probing executables on PATH. */
export function getRegisteredAgentById(
  id: string
): Omit<CliAgentInfo, "version" | "installed"> | undefined {
  const normalized = String(id || "")
    .trim()
    .toLowerCase();
  const builtIn = AGENT_DEFINITIONS.find((agent) => agent.id === normalized);
  if (builtIn) return builtIn;

  const custom = _customAgentDefs.find((agent) => agent.id === normalized);
  return custom ? { ...custom, backendMode: custom.backendMode || "stdio-adapter" } : undefined;
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

    // Untrusted probe: allow only a bare binary or a single recognized version
    // flag, so a matching interpreter cannot smuggle an eval/exec argument.
    if (args.length > 1 || (args.length === 1 && !SAFE_VERSION_PROBE_ARG.test(args[0]))) {
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
 * Check registration without probing every executable on PATH.
 *
 * Process lifecycle callers need an allowlist decision, not a fresh health
 * scan. Keeping this lookup pure avoids making `spawn()` wait on one timeout
 * per uninstalled agent while preserving detectInstalledAgents() for UI/status
 * consumers.
 */
export function hasRegisteredAgent(id: string): boolean {
  return Boolean(getRegisteredAgentById(id));
}

/**
 * Get agents that are installed and available for ACP.
 */
export function getAvailableAgents(): CliAgentInfo[] {
  return detectInstalledAgents().filter((a) => a.installed);
}
