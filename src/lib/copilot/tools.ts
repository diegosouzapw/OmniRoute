/**
 * OmniRoute Copilot — Tool definitions
 *
 * Tools the copilot can execute to configure OmniRoute on behalf of the user,
 * query the codebase via CodeGraph, and execute CLI commands for full control.
 */

import { execSync } from "node:child_process";
import { createCombo, getCombos, updateCombo } from "@/lib/db/combos";
import { getProviderConnections } from "@/lib/db/providers";
import { createApiKey, revokeApiKey, getApiKeys } from "@/lib/db/apiKeys";
import {
  searchSymbols,
  findCallers,
  findCallees,
  getFileContext,
  listFiles,
  getCodeGraphStats,
  isCodeGraphAvailable,
  type CodeGraphQueryResult,
} from "./codegraphKnowledge";
import { getAllKeyGroups } from "@/lib/db/apiKeyGroups";

// ── Tool Types ───────────────────────────────────────────────────────────────

export interface CopilotToolParam {
  name: string;
  type: "string" | "number" | "boolean";
  description: string;
  required: boolean;
}

export interface CopilotTool {
  name: string;
  description: string;
  parameters: CopilotToolParam[];
  handler: (args: Record<string, unknown>) => Promise<string>;
}

// ── Helper: format CodeGraph results ─────────────────────────────────────────

function formatCodeGraphResult(result: CodeGraphQueryResult): string {
  if (!result.success) {
    if (result.engine === "none") {
      return `CodeGraph not available: ${result.error || "DB not found"}. The app runs without the development code index in production.`;
    }
    return `CodeGraph query error: ${result.error}`;
  }

  const rows = result.data as Record<string, unknown>[];
  if (!rows || rows.length === 0) return "No results found.";

  return (
    JSON.stringify(rows.slice(0, 30), null, 2) +
    (rows.length > 30 ? `\n... and ${rows.length - 30} more` : "")
  );
}

// ── Helper: check if omniroute CLI is available ──────────────────────────────

function getOmniRouteCliPath(): string | null {
  try {
    const result = execSync("which omniroute 2>/dev/null || command -v omniroute 2>/dev/null", {
      encoding: "utf-8",
      timeout: 3000,
    }).trim();
    return result || null;
  } catch {
    return null;
  }
}

// ── Tool Definitions ─────────────────────────────────────────────────────────

export const COPILOT_TOOLS: CopilotTool[] = [
  // ── Provider Tools ──
  {
    name: "listProviders",
    description:
      "List all configured provider connections, optionally filtered by type (apikey, oauth, local, free)",
    parameters: [
      {
        name: "type",
        type: "string",
        description: "Filter: apikey, oauth, local, free, or empty for all",
        required: false,
      },
    ],
    handler: async (args) => {
      const filter: Record<string, unknown> = {};
      if (args.type) filter.type = args.type;
      const connections = await getProviderConnections(filter);
      const connectionsAny = connections as any[];
      if (connectionsAny.length === 0) return "No provider connections found.";
      let output = `**${connectionsAny.length} provider(s) configured**\n\n`;
      for (const c of connectionsAny) {
        const status = c.isActive ? "✅" : "⛔";
        const models = c.models
          ? `(${(Array.isArray(c.models) ? c.models : JSON.parse(c.models || "[]")).length} models)`
          : "";
        output += `${status} **${c.displayName || c.name}** — \`${c.id}\` (${c.type}) ${models}\n`;
      }
      return output;
    },
  },

  // ── Combo Tools ──
  {
    name: "listCombos",
    description: "List all configured combos with their strategy and target count",
    parameters: [],
    handler: async () => {
      const combos = await getCombos();
      if (!combos || combos.length === 0)
        return "No combos configured. Create one with createCombo.";
      let output = `**${combos.length} combo(s) configured**\n\n`;
      for (const c of combos as any[]) {
        const active = c.isActive ? "✅" : "⛔";
        const targets = c.targets
          ? typeof c.targets === "string"
            ? JSON.parse(c.targets).length
            : c.targets.length
          : 0;
        output += `${active} **${c.name}** — strategy: \`${c.strategy}\` — ${targets} target(s)\n`;
      }
      return output;
    },
  },
  {
    name: "createCombo",
    description: "Create a new routing combo with specified targets",
    parameters: [
      { name: "name", type: "string", description: "Combo display name", required: true },
      {
        name: "strategy",
        type: "string",
        description: "Routing strategy: priority, weighted, round-robin, cost-optimized, auto",
        required: true,
      },
      {
        name: "targets",
        type: "string",
        description: "JSON array of targets: [{provider, model, weight?}]",
        required: true,
      },
    ],
    handler: async (args) => {
      const name = args.name as string;
      const strategy = args.strategy as string;
      if (!name || !strategy) return "Error: name and strategy are required.";
      let targets: unknown[];
      try {
        targets = JSON.parse(args.targets as string);
      } catch {
        return "Error: targets must be valid JSON array.";
      }
      if (!Array.isArray(targets) || targets.length === 0) {
        return "Error: targets must be a non-empty array.";
      }
      const combo = await createCombo({
        name,
        strategy,
        targets: JSON.stringify(targets),
        isActive: true,
      });
      const anyCombo = combo as any;
      return `✅ Combo **${anyCombo.name || name}** created (ID: \`${anyCombo.id || "?"}\`) with ${targets.length} target(s).`;
    },
  },

  // ── API Key Tools ──
  {
    name: "listApiKeys",
    description: "List all API keys with their status and scope",
    parameters: [],
    handler: async () => {
      const keys = await getApiKeys();
      const keysAny = keys as any[];
      if (!keysAny || keysAny.length === 0) return "No API keys configured.";
      let output = `**${keysAny.length} API key(s)**\n\n`;
      for (const k of keysAny) {
        const status = k.isActive && !k.revokedAt ? "✅" : "⛔";
        output += `${status} **${k.name}** — \`${k.keyPrefix || k.id}\` — ${k.scopes ? JSON.stringify(k.scopes) : "no scopes"}\n`;
      }
      return output;
    },
  },
  {
    name: "createApiKey",
    description: "Create a new API key with optional scopes",
    parameters: [
      { name: "name", type: "string", description: "Human-readable key name", required: true },
      { name: "machineId", type: "string", description: "Machine identifier", required: false },
      {
        name: "scopes",
        type: "string",
        description: "Comma-separated scopes (e.g., manage,read)",
        required: false,
      },
    ],
    handler: async (args) => {
      const name = args.name as string;
      if (!name) return "Error: name is required.";
      const scopes = args.scopes
        ? (args.scopes as string).split(",").map((s) => s.trim())
        : undefined;
      const result = await createApiKey(name, (args.machineId as string) || "copilot", scopes);
      const r = result as any;
      return `✅ API key **${name}** created:\n\`\`\`\n${r.key}\n\`\`\`\nSave this now — it won't be shown again.`;
    },
  },
  {
    name: "revokeApiKey",
    description: "Revoke an API key by ID",
    parameters: [
      { name: "id", type: "string", description: "API key ID to revoke", required: true },
    ],
    handler: async (args) => {
      const id = args.id as string;
      if (!id) return "Error: id is required.";
      await revokeApiKey(id);
      return `✅ API key \`${id}\` revoked.`;
    },
  },

  // ── Key Group Tools ──
  {
    name: "listKeyGroups",
    description: "List all API key groups with their model permissions",
    parameters: [],
    handler: async () => {
      const groups = await getAllKeyGroups();
      const gArr = groups as any[];
      if (!gArr || gArr.length === 0) return "No key groups configured.";
      let output = `**${gArr.length} key group(s)**\n\n`;
      for (const g of gArr) {
        const perms = g.allowedModels
          ? (typeof g.allowedModels === "string"
              ? JSON.parse(g.allowedModels)
              : g.allowedModels
            ).join(", ")
          : "all models";
        output += `📦 **${g.name}** — models: ${perms}\n`;
      }
      return output;
    },
  },

  // ── CodeGraph Tools ──
  {
    name: "searchCodeGraph",
    description:
      "Search for symbols in the OmniRoute codebase by name (functions, classes, types, variables). Use this to understand how the app works internally.",
    parameters: [
      {
        name: "query",
        type: "string",
        description:
          "Symbol name or partial name to search (e.g., 'handleChat', 'sanitizeMessage', 'CircuitBreaker')",
        required: true,
      },
      { name: "limit", type: "number", description: "Max results (default 20)", required: false },
    ],
    handler: async (args) => {
      const q = args.query as string;
      const limit = (args.limit as number) || 20;
      if (!q) return "Please provide a search query.";
      const result = searchSymbols(q, limit);
      return formatCodeGraphResult(result);
    },
  },
  {
    name: "findCallers",
    description:
      "Find all code that calls or references a specific function/symbol. Useful for impact analysis — 'what would break if I changed X?'",
    parameters: [
      {
        name: "symbol",
        type: "string",
        description: "Symbol name to find callers for (e.g., 'handleChatCore', 'translateRequest')",
        required: true,
      },
      { name: "limit", type: "number", description: "Max results (default 20)", required: false },
    ],
    handler: async (args) => {
      const symbol = args.symbol as string;
      const limit = (args.limit as number) || 20;
      if (!symbol) return "Please provide a symbol name.";
      const result = findCallers(symbol, limit);
      return formatCodeGraphResult(result);
    },
  },
  {
    name: "findCallees",
    description:
      "Find all functions/symbols that a specific function calls. Useful for understanding dependencies and code flow within OmniRoute.",
    parameters: [
      {
        name: "symbol",
        type: "string",
        description: "Symbol name to find callees for (e.g., 'handleChatCore', 'getExecutor')",
        required: true,
      },
      { name: "limit", type: "number", description: "Max results (default 20)", required: false },
    ],
    handler: async (args) => {
      const symbol = args.symbol as string;
      const limit = (args.limit as number) || 20;
      if (!symbol) return "Please provide a symbol name.";
      const result = findCallees(symbol, limit);
      return formatCodeGraphResult(result);
    },
  },
  {
    name: "getFileContext",
    description:
      "Get all symbols defined in a specific file. Useful to understand a file's exports and structure at a glance.",
    parameters: [
      {
        name: "filePath",
        type: "string",
        description: "File path (partial or full, e.g., 'chatCore.ts', 'combo.ts', 'src/lib/db/')",
        required: true,
      },
    ],
    handler: async (args) => {
      const fp = args.filePath as string;
      if (!fp) return "Please provide a file path.";
      const result = getFileContext(fp);
      return formatCodeGraphResult(result);
    },
  },
  {
    name: "listCodeGraphFiles",
    description:
      "List all files indexed by CodeGraph, optionally filtered by language. Tells you what parts of the codebase are available for analysis.",
    parameters: [
      {
        name: "language",
        type: "string",
        description: "Filter by language: typescript, javascript, python, etc.",
        required: false,
      },
    ],
    handler: async (args) => {
      const lang = args.language as string | undefined;
      const result = listFiles(lang);
      return formatCodeGraphResult(result);
    },
  },
  {
    name: "codeGraphStats",
    description:
      "Get summary stats about the CodeGraph index: total nodes, edges, files, languages, and node kinds indexed.",
    parameters: [],
    handler: async () => {
      const result = getCodeGraphStats();
      return formatCodeGraphResult(result);
    },
  },

  // ── CLI Execution Tool ──
  {
    name: "runOmniRouteCli",
    description:
      "Execute an 'omniroute' CLI command to configure or query the OmniRoute app. Gives complete control over the app — use for advanced operations not covered by other tools. Common commands: omniroute list-keys, omniroute switch-combo [id], omniroute set-budget 10, omniroute set-strategy [id] priority, omniroute health, omniroute mcp (starts MCP server), omniroute db-health, omniroute reset-password.",
    parameters: [
      {
        name: "command",
        type: "string",
        description:
          "CLI command arguments (everything after 'omniroute'). Example: 'list-keys', 'switch-combo abc123', 'health'",
        required: true,
      },
    ],
    handler: async (args) => {
      const cmd = args.command as string;
      if (!cmd) return "Please provide a command to execute.";

      const cliPath = getOmniRouteCliPath();
      if (!cliPath) return "omniroute CLI not found in PATH. Install OmniRoute first.";

      try {
        const output = execSync(`omniroute ${cmd}`, {
          encoding: "utf-8",
          timeout: 30000,
          maxBuffer: 1024 * 1024,
        });
        return `\`\`\`\n${output.trim()}\n\`\`\``;
      } catch (err: unknown) {
        const e = err as { stderr?: string; stdout?: string; message?: string };
        return `Error executing CLI command:\n${e.stderr || e.stdout || e.message || "Unknown error"}`;
      }
    },
  },
];

// ── Tool Lookup ──────────────────────────────────────────────────────────────

export function getCopilotTool(name: string): CopilotTool | undefined {
  return COPILOT_TOOLS.find((t) => t.name === name);
}

export function getCopilotToolDescriptions(): string {
  return COPILOT_TOOLS.map((t) => `- **${t.name}**: ${t.description}`).join("\n");
}
