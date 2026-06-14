/**
 * cliRegistryParser.ts — regex-based parser for bin/cli/commands/*.mjs files.
 *
 * Extracts command families and their subcommands WITHOUT importing the modules
 * (Commander.js has side-effects when required as a program instance, D15).
 *
 * Parse strategy:
 *  - Read all *.mjs files under bin/cli/commands/
 *  - Detect top-level command name from `.command("<name>")` patterns
 *  - Detect subcommands from chained `.command("<sub>")` patterns
 *  - Map file basename → SkillArea family via FAMILY_MAP
 */

import fs from "node:fs";
import path from "node:path";
import type { SkillArea } from "./types";

// ── Types ────────────────────────────────────────────────────────────────────

export interface CliCommand {
  /** Canonical command string, e.g. "providers list" */
  name: string;
  /** Description extracted from .description("...") */
  description: string;
  /** Flags extracted from .option("--flag", "...") */
  flags: string[];
  /** Whether this is a top-level command (depth 0) or subcommand (depth > 0) */
  isSubcommand: boolean;
}

export interface ParsedCliRegistry {
  /** All commands keyed by their full name, e.g. "providers list" */
  commands: Map<string, CliCommand>;
  /** Commands grouped by SkillArea family */
  families: Map<SkillArea, CliCommand[]>;
}

// ── Mapping: file basename → CLI SkillArea ───────────────────────────────────

/**
 * Maps a commands/*.mjs basename to its CLI SkillArea.
 * Files that don't map to a known family are ignored.
 */
const FILE_FAMILY_MAP: Record<string, SkillArea> = {
  "serve": "cli-serve",
  "dashboard": "cli-serve",
  "stop": "cli-serve",
  "restart": "cli-serve",
  "health": "cli-health",
  "status": "cli-health",
  "doctor": "cli-health",
  "providers": "cli-providers",
  "provider-cmd": "cli-providers",
  "test-provider": "cli-providers",
  "keys": "cli-keys",
  "oauth": "cli-keys",
  "models": "cli-models",
  "chat": "cli-chat",
  "stream": "cli-chat",
  "repl": "cli-chat",
  "combo": "cli-routing",
  "routing": "cli-routing",
  "resilience": "cli-resilience",
  "quota": "cli-resilience",
  "compression": "cli-compression",
  "context-eng": "cli-contexts",
  "contexts": "cli-contexts",
  "sessions": "cli-contexts",
  "cost": "cli-cost-usage",
  "usage": "cli-cost-usage",
  "pricing": "cli-cost-usage",
  "mcp": "cli-mcp",
  "a2a": "cli-a2a",
  "tunnel": "cli-tunnel",
  "backup": "cli-backup-sync",
  "sync": "cli-backup-sync",
  "cloud": "cli-backup-sync",
  "audit": "cli-policy-audit",
  "policy": "cli-policy-audit",
  "logs": "cli-policy-audit",
  "telemetry": "cli-policy-audit",
  "batches": "cli-batches",
  "files": "cli-batches",
  "eval": "cli-eval",
  "simulate": "cli-eval",
  "skills": "cli-plugins-skills",
  "plugin": "cli-plugins-skills",
  "memory": "cli-plugins-skills",
  "setup": "cli-setup",
  "config": "cli-setup",
  "env": "cli-setup",
  "update": "cli-setup",
  "autostart": "cli-setup",
};

// ── Regex patterns ───────────────────────────────────────────────────────────

// Matches: .command("name") or .command('name') — capture group 1 = name
const COMMAND_RE = /\.command\(\s*["']([^"']+)["']/g;

// Matches: .description("text") or .description('text') — capture group 1 = text
const DESCRIPTION_RE = /\.description\(\s*["']([^"']+)["']/g;

// Matches: .option("--flag ...", "desc") — capture group 1 = flag string
const OPTION_RE = /\.option\(\s*["']([^"']+)["']/g;

// ── Parser helpers ───────────────────────────────────────────────────────────

interface RawCommand {
  name: string;
  description: string;
  flags: string[];
}

/**
 * Extracts all commands (and their immediately following description + options)
 * from a single .mjs file content.
 *
 * Limitation: uses regex, not a full AST — deeply nested or dynamically
 * constructed commands may be missed. This is acceptable for the catalog use-case
 * where we want a list of known subcommand names, not runtime-validated metadata.
 */
function extractCommandsFromContent(content: string, topLevelName: string): RawCommand[] {
  const commands: RawCommand[] = [];

  // Find all .command() call positions
  COMMAND_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  const commandMatches: Array<{ name: string; index: number }> = [];

  while ((match = COMMAND_RE.exec(content)) !== null) {
    commandMatches.push({ name: match[1], index: match.index });
  }

  for (let i = 0; i < commandMatches.length; i++) {
    const { name: rawName, index: cmdIndex } = commandMatches[i];
    const nextIndex = commandMatches[i + 1]?.index ?? content.length;

    // Slice between this command call and the next to scope description/options
    const slice = content.slice(cmdIndex, nextIndex);

    // Extract description (first match in slice)
    DESCRIPTION_RE.lastIndex = 0;
    const descMatch = DESCRIPTION_RE.exec(slice);
    const description = descMatch ? descMatch[1] : "";

    // Extract flags in slice
    const flags: string[] = [];
    OPTION_RE.lastIndex = 0;
    let optMatch: RegExpExecArray | null;
    while ((optMatch = OPTION_RE.exec(slice)) !== null) {
      flags.push(optMatch[1]);
    }

    // Compose full command name:
    // - If rawName equals the top-level name (or is the isDefault pattern), use as-is
    // - Otherwise, qualify as "topLevel subname"
    const isTopLevel =
      rawName === topLevelName ||
      rawName.startsWith(topLevelName + " ") ||
      // Some files declare standalone root commands (e.g. serve, health)
      !rawName.includes(" ");

    const fullName = isTopLevel && i === 0 ? rawName : `${topLevelName} ${rawName}`;

    commands.push({ name: fullName.trim(), description, flags });
  }

  return commands;
}

// ── Main export ──────────────────────────────────────────────────────────────

/**
 * Reads all `bin/cli/commands/*.mjs` files and extracts CLI command metadata.
 *
 * Returns:
 * - `commands`: flat map of all commands by full name
 * - `families`: commands grouped by SkillArea
 */
export function parseCliRegistry(): ParsedCliRegistry {
  const commandsDir = path.resolve(process.cwd(), "bin", "cli", "commands");

  let files: string[];
  try {
    files = fs.readdirSync(commandsDir).filter((f) => f.endsWith(".mjs"));
  } catch (err) {
    throw new Error(
      `cliRegistryParser: could not read ${commandsDir}. ` +
        `Run from project root. Underlying error: ${err instanceof Error ? err.message : String(err)}`,
    );
  }

  const commands = new Map<string, CliCommand>();
  const families = new Map<SkillArea, CliCommand[]>();

  for (const file of files) {
    const basename = path.basename(file, ".mjs");
    const family = FILE_FAMILY_MAP[basename];
    if (!family) continue; // skip unrecognised files (e.g. runtime.mjs, repl.mjs)

    const filePath = path.join(commandsDir, file);
    let content: string;
    try {
      content = fs.readFileSync(filePath, "utf-8");
    } catch {
      continue; // skip unreadable files
    }

    const rawCmds = extractCommandsFromContent(content, basename);
    if (rawCmds.length === 0) continue;

    for (let i = 0; i < rawCmds.length; i++) {
      const rc = rawCmds[i];
      const cliCmd: CliCommand = {
        name: rc.name,
        description: rc.description,
        flags: rc.flags,
        isSubcommand: i > 0,
      };

      commands.set(rc.name, cliCmd);

      if (!families.has(family)) {
        families.set(family, []);
      }
      families.get(family)!.push(cliCmd);
    }
  }

  return { commands, families };
}

/**
 * Returns command name strings for a given CLI SkillArea family,
 * suitable for `AgentSkill.cliCommands`.
 */
export function getCommandsForFamily(family: SkillArea): string[] {
  const { families } = parseCliRegistry();
  const cmds = families.get(family) ?? [];
  return cmds.map((c) => c.name);
}
