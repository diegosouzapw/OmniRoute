import { z } from "zod";
import { createObsidianClient, createSyncServerClient, getSyncToken } from "../../../src/lib/obsidian/api.ts";
import {
  getObsidianToken,
  getObsidianBaseUrl,
  getObsidianConfigForApiKey,
} from "../../../src/lib/db/obsidian.ts";
import type { ObsidianClient, SyncServerClient } from "../../../src/lib/obsidian/api.ts";

type McpExtra = {
  authInfo?: { clientId?: string; scopes?: string[] };
  sessionId?: string;
};

function extractApiKeyId(extra?: McpExtra): string | undefined {
  const id = extra?.authInfo?.clientId;
  return typeof id === "string" && id.length > 0 && id !== "anonymous" && id !== "env-key"
    ? id
    : undefined;
}

function requireToken(apiKeyId?: string): string {
  const config = getObsidianConfigForApiKey(apiKeyId);
  if (!config.token) {
    throw new Error(
      "Obsidian API token not configured. Set it in Settings > Context Sources" +
        (apiKeyId ? " or in your API key's context source settings" : "") +
        "."
    );
  }
  return config.token;
}

function getClient(apiKeyId?: string): ObsidianClient {
  const config = getObsidianConfigForApiKey(apiKeyId);
  const token = requireToken(apiKeyId);
  return createObsidianClient(token, config.baseUrl);
}

export const obsidianTools = [
  {
    name: "obsidian_check_status",
    description: "Check whether the Obsidian Local REST API is reachable and authenticated. Returns connection status.",
    scopes: ["read:obsidian"],
    inputSchema: z.object({}),
    handler: async (_args: unknown, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      return client.checkStatus();
    },
  },
  {
    name: "obsidian_search_simple",
    description: "Search note content in Obsidian vault by text query. Returns matching snippets with file paths.",
    scopes: ["read:obsidian"],
    inputSchema: z.object({
      query: z.string().min(1).max(500).describe("Search query text"),
      contextLength: z.number().min(20).max(500).default(100).describe("Characters of context around each match"),
    }),
    handler: async (args: { query: string; contextLength?: number }, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      return client.searchSimple(args.query, args.contextLength);
    },
  },
  {
    name: "obsidian_search_structured",
    description: "Search Obsidian vault using a JSON Logic expression for complex queries (and, or, regex, path filters, etc.).",
    scopes: ["read:obsidian"],
    inputSchema: z.object({
      jsonLogic: z.unknown().describe("JSON Logic expression for the search query"),
    }),
    handler: async (args: { jsonLogic: unknown }, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      return client.searchStructured(args.jsonLogic);
    },
  },
  {
    name: "obsidian_read_note",
    description: "Read the full content of a note in the Obsidian vault by its vault-relative path. Optionally target a specific heading or block.",
    scopes: ["read:obsidian"],
    inputSchema: z.object({
      path: z.string().min(1).describe("Vault-relative path (e.g., 'notes/my-note.md')"),
      targetType: z.enum(["heading", "block", "frontmatter"]).optional().describe("Scope the read to a specific type of target"),
      target: z.string().optional().describe("Target identifier: heading text, block index (e.g., '^block-id'), or 'frontmatter'"),
    }),
    handler: async (args: { path: string; targetType?: "heading" | "block" | "frontmatter"; target?: string }, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      return client.readNote(args.path, args.targetType, args.target);
    },
  },
  {
    name: "obsidian_list_vault",
    description: "List files and directories in the Obsidian vault. Returns a tree of file/folder entries.",
    scopes: ["read:obsidian"],
    inputSchema: z.object({
      path: z.string().optional().default("").describe("Vault-relative directory path to list (empty for root)"),
    }),
    handler: async (args: { path?: string }, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      return client.listVault(args.path);
    },
  },
  {
    name: "obsidian_get_document_map",
    description: "Get the document structure of a note as a map of headings and their line numbers.",
    scopes: ["read:obsidian"],
    inputSchema: z.object({
      path: z.string().min(1).describe("Vault-relative path to the note"),
    }),
    handler: async (args: { path: string }, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      return client.getDocumentMap(args.path);
    },
  },
  {
    name: "obsidian_get_note_metadata",
    description: "Get metadata (frontmatter, tags, links, char/word count) for a note without reading its full content.",
    scopes: ["read:obsidian"],
    inputSchema: z.object({
      path: z.string().min(1).describe("Vault-relative path to the note"),
    }),
    handler: async (args: { path: string }, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      return client.getNoteMetadata(args.path);
    },
  },
  {
    name: "obsidian_get_active_file",
    description: "Get the path and content of the currently active file in Obsidian.",
    scopes: ["read:obsidian"],
    inputSchema: z.object({}),
    handler: async (_args: unknown, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      return client.getActiveFile();
    },
  },
  {
    name: "obsidian_get_periodic_note",
    description: "Get the daily, weekly, or monthly periodic note for a given date (or today if no date specified).",
    scopes: ["read:obsidian"],
    inputSchema: z.object({
      period: z.enum(["daily", "weekly", "monthly"]).describe("Period type"),
      year: z.number().int().optional().describe("Year (required if month/day provided)"),
      month: z.number().int().min(1).max(12).optional().describe("Month"),
      day: z.number().int().min(1).max(31).optional().describe("Day"),
    }),
    handler: async (args: { period: "daily" | "weekly" | "monthly"; year?: number; month?: number; day?: number }, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      return client.getPeriodicNote(args.period, args.year, args.month, args.day);
    },
  },
  {
    name: "obsidian_get_tags",
    description: "List all tags used across the Obsidian vault with their frequencies.",
    scopes: ["read:obsidian"],
    inputSchema: z.object({}),
    handler: async (_args: unknown, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      return client.getTags();
    },
  },
  {
    name: "obsidian_list_commands",
    description: "List all available Obsidian commands with their IDs and names. Use IDs with obsidian_execute_command.",
    scopes: ["read:obsidian"],
    inputSchema: z.object({}),
    handler: async (_args: unknown, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      return client.commandList();
    },
  },
  {
    name: "obsidian_write_note",
    description: "Create or overwrite a note in the Obsidian vault with the given markdown content.",
    scopes: ["write:obsidian"],
    inputSchema: z.object({
      path: z.string().min(1).describe("Vault-relative path to write to (e.g., 'notes/new-note.md')"),
      content: z.string().min(1).describe("Full markdown content to write"),
    }),
    handler: async (args: { path: string; content: string }, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      await client.writeNote(args.path, args.content);
      return { success: true, message: `Note written to ${args.path}` };
    },
  },
  {
    name: "obsidian_append_note",
    description: "Append content to an existing note. Optionally append to a specific heading or block.",
    scopes: ["write:obsidian"],
    inputSchema: z.object({
      path: z.string().min(1).describe("Vault-relative path to the note"),
      content: z.string().min(1).describe("Markdown content to append"),
      targetType: z.enum(["heading", "block", "frontmatter"]).optional().describe("Target type to append to"),
      target: z.string().optional().describe("Target identifier (heading text, block index, or 'frontmatter')"),
    }),
    handler: async (args: { path: string; content: string; targetType?: "heading" | "block" | "frontmatter"; target?: string }, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      await client.appendNote(args.path, args.content, args.targetType, args.target);
      return { success: true, message: `Content appended to ${args.path}` };
    },
  },
  {
    name: "obsidian_patch_note",
    description: "Surgically patch a note — append, prepend, or replace content at a specific heading, block, or frontmatter field.",
    scopes: ["write:obsidian"],
    inputSchema: z.object({
      path: z.string().min(1).describe("Vault-relative path to the note"),
      operation: z.enum(["append", "prepend", "replace"]).describe("Patch operation"),
      targetType: z.enum(["heading", "block", "frontmatter"]).describe("Target type"),
      target: z.string().min(1).describe("Target identifier: heading text, block ID, or frontmatter key"),
      content: z.string().min(1).describe("Content to apply with the patch operation"),
      createTargetIfMissing: z.boolean().optional().default(false).describe("Create the target heading/block if it does not exist"),
    }),
    handler: async (args: {
      path: string;
      operation: "append" | "prepend" | "replace";
      targetType: "heading" | "block" | "frontmatter";
      target: string;
      content: string;
      createTargetIfMissing?: boolean;
    }, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      return client.patchNote(args.path, args.operation, args.targetType, args.target, args.content, args.createTargetIfMissing);
    },
  },
  {
    name: "obsidian_delete_note",
    description: "Permanently delete a note from the Obsidian vault.",
    scopes: ["write:obsidian"],
    inputSchema: z.object({
      path: z.string().min(1).describe("Vault-relative path to the note to delete"),
    }),
    handler: async (args: { path: string }, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      await client.deleteNote(args.path);
      return { success: true, message: `Deleted ${args.path}` };
    },
  },
  {
    name: "obsidian_move_note",
    description: "Move or rename a note within the Obsidian vault.",
    scopes: ["write:obsidian"],
    inputSchema: z.object({
      path: z.string().min(1).describe("Current vault-relative path"),
      destination: z.string().min(1).describe("New vault-relative path (can include new parent directory)"),
    }),
    handler: async (args: { path: string; destination: string }, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      await client.moveNote(args.path, args.destination);
      return { success: true, message: `Moved ${args.path} to ${args.destination}` };
    },
  },
  {
    name: "obsidian_execute_command",
    description: "Execute an Obsidian command by its command ID. Use obsidian_list_commands to discover available command IDs.",
    scopes: ["write:obsidian"],
    inputSchema: z.object({
      commandId: z.string().min(1).describe("Obsidian command ID (e.g., 'editor:insert-link')"),
    }),
    handler: async (args: { commandId: string }, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      await client.executeCommand(args.commandId);
      return { success: true, message: `Executed command: ${args.commandId}` };
    },
  },
  {
    name: "obsidian_open_file",
    description: "Open a file in Obsidian. If the file exists it opens in the editor; if not, it creates a new file.",
    scopes: ["write:obsidian"],
    inputSchema: z.object({
      path: z.string().min(1).describe("Vault-relative path to the file to open"),
    }),
    handler: async (args: { path: string }, extra?: McpExtra) => {
      const client = getClient(extractApiKeyId(extra));
      await client.openFile(args.path);
      return { success: true, message: `Opened ${args.path} in Obsidian` };
    },
  },
  {
    name: "obsidian_sync_status",
    description: "Get the OmniRoute sync plugin status: whether the server is running, vault name, port, uptime, and last sync results. Requires the sync auth token to be configured in OmniRoute settings.",
    scopes: ["read:obsidian"],
    inputSchema: z.object({}),
    handler: async (_args: unknown, extra?: McpExtra) => {
      const token = getSyncToken() || requireToken(extractApiKeyId(extra));
      const syncClient = createSyncServerClient(token);
      return syncClient.getStatus();
    },
  },
  {
    name: "obsidian_sync_trigger",
    description: "Trigger an immediate bidirectional sync between desktop and mobile Obsidian vaults. Returns the sync result (files pulled, pushed, deleted, conflicts). Requires the sync auth token to be configured in OmniRoute settings.",
    scopes: ["write:obsidian"],
    inputSchema: z.object({}),
    handler: async (_args: unknown, extra?: McpExtra) => {
      const token = getSyncToken() || requireToken(extractApiKeyId(extra));
      const syncClient = createSyncServerClient(token);
      const result = await syncClient.triggerSync();
      return { success: true, ...result };
    },
  },
  {
    name: "obsidian_sync_conflicts",
    description: "List unresolved sync conflicts. Each conflict shows the file path, conflict file path, and when it was detected. Requires the sync auth token to be configured in OmniRoute settings.",
    scopes: ["read:obsidian"],
    inputSchema: z.object({}),
    handler: async (_args: unknown, extra?: McpExtra) => {
      const token = getSyncToken() || requireToken(extractApiKeyId(extra));
      const syncClient = createSyncServerClient(token);
      return syncClient.getConflicts();
    },
  },
  {
    name: "obsidian_sync_resolve_conflict",
    description: "Resolve a sync conflict by choosing which version to keep. Use 'local' for the mobile version, 'remote' for the desktop version, or 'keep-both' to preserve both. Requires the sync auth token to be configured in OmniRoute settings.",
    scopes: ["write:obsidian"],
    inputSchema: z.object({
      path: z.string().min(1).describe("Vault-relative path of the conflicting file (without .conflict- suffix)"),
      resolution: z.enum(["local", "remote", "keep-both"]).describe("Which version to keep: local (mobile), remote (desktop), or keep-both"),
    }),
    handler: async (args: { path: string; resolution: "local" | "remote" | "keep-both" }, extra?: McpExtra) => {
      const token = getSyncToken() || requireToken(extractApiKeyId(extra));
      const syncClient = createSyncServerClient(token);
      const result = await syncClient.resolveConflict(args.path, args.resolution);
      return { success: true, result };
    },
  },
];
