/**
 * ACP (Agent Client Protocol) — CLI Agent Registry
 *
 * Discovers installed CLI tools on the system by checking standard paths
 * and running version commands. Used to offer ACP transport as an alternative
 * to the HTTP proxy method.
 *
 * Reference: https://github.com/iOfficeAI/AionUi (auto-detects CLI agents)
 */

import { execSync } from "child_process";

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
];

/**
 * Detect installed CLI agents on the system.
 * Runs version commands to verify availability.
 */
export function detectInstalledAgents(): CliAgentInfo[] {
  return AGENT_DEFINITIONS.map((def) => {
    let version: string | null = null;
    let installed = false;

    try {
      const output = execSync(def.versionCommand, {
        timeout: 5000,
        encoding: "utf-8",
        stdio: ["pipe", "pipe", "pipe"],
      }).trim();

      // Extract version number from output
      const versionMatch = output.match(/(\d+\.\d+\.\d+(?:-\w+)?)/);
      version = versionMatch ? versionMatch[1] : output.split("\n")[0];
      installed = true;
    } catch {
      // Not installed or not runnable
    }

    return { ...def, version, installed };
  });
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
