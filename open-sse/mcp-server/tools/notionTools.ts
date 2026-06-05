import { z } from "zod";
import { createNotionClient } from "../../../src/lib/notion/api.ts";
import { getNotionToken } from "../../../src/lib/db/notion.ts";

function requireToken(): string {
  const token = getNotionToken();
  if (!token) throw new Error("Notion integration token not configured. Set it in Settings > Context Sources.");
  return token;
}

export const notionTools = [
  {
    name: "notion_search",
    description: "Search pages and databases in Notion by text query. Returns matching page titles, IDs, and URL.",
    scopes: ["read:notion"],
    inputSchema: z.object({
      query: z.string().min(1).max(500).describe("Search query text"),
      pageSize: z.number().min(1).max(100).default(20).describe("Results per page (max 100)"),
      startCursor: z.string().optional().describe("Pagination cursor"),
    }),
    handler: async (args: { query: string; pageSize?: number; startCursor?: string }) => {
      const client = createNotionClient(requireToken());
      return client.searchPagesAndDatabases(args.query, args.startCursor, args.pageSize);
    },
  },
  {
    name: "notion_get_page",
    description: "Get the content and metadata of a Notion page by its ID.",
    scopes: ["read:notion"],
    inputSchema: z.object({
      pageId: z.string().min(1).describe("Notion page ID (32-char hex or UUID)"),
    }),
    handler: async (args: { pageId: string }) => {
      const client = createNotionClient(requireToken());
      return client.getPage(args.pageId);
    },
  },
  {
    name: "notion_list_block_children",
    description: "List all block children of a Notion block or page. Returns the block tree structure.",
    scopes: ["read:notion"],
    inputSchema: z.object({
      blockId: z.string().min(1).describe("Block ID to fetch children from"),
      pageSize: z.number().min(1).max(100).default(50).describe("Blocks per page (max 100)"),
      startCursor: z.string().optional().describe("Pagination cursor"),
    }),
    handler: async (args: { blockId: string; pageSize?: number; startCursor?: string }) => {
      const client = createNotionClient(requireToken());
      return client.listBlockChildren(args.blockId, args.startCursor, args.pageSize);
    },
  },
  {
    name: "notion_query_database",
    description: "Query a Notion database with optional filters and sorts. Returns matching entries.",
    scopes: ["read:notion"],
    inputSchema: z.object({
      databaseId: z.string().min(1).describe("Notion database ID (32-char hex or UUID)"),
      filter: z.unknown().optional().describe("Optional filter object (Notion API filter format)"),
      sorts: z.array(z.unknown()).optional().describe("Optional sort array (Notion API sort format)"),
      pageSize: z.number().min(1).max(100).default(50).describe("Results per page (max 100)"),
      startCursor: z.string().optional().describe("Pagination cursor"),
    }),
    handler: async (args: {
      databaseId: string;
      filter?: unknown;
      sorts?: unknown[];
      pageSize?: number;
      startCursor?: string;
    }) => {
      const client = createNotionClient(requireToken());
      return client.queryDatabase(
        args.databaseId,
        args.filter,
        args.sorts,
        args.startCursor,
        args.pageSize
      );
    },
  },
  {
    name: "notion_get_database",
    description: "Get metadata and schema of a Notion database by its ID.",
    scopes: ["read:notion"],
    inputSchema: z.object({
      databaseId: z.string().min(1).describe("Notion database ID (32-char hex or UUID)"),
    }),
    handler: async (args: { databaseId: string }) => {
      const client = createNotionClient(requireToken());
      return client.getDatabase(args.databaseId);
    },
  },
  {
    name: "notion_append_blocks",
    description: "Append block children to an existing Notion block or page. Maximum 100 blocks per request.",
    scopes: ["write:notion"],
    inputSchema: z.object({
      blockId: z.string().min(1).describe("Target block or page ID to append to"),
      children: z.array(z.unknown()).describe("Array of block objects to append"),
      after: z.string().optional().describe("Block ID to append after (position parameter)"),
    }),
    handler: async (args: { blockId: string; children: unknown[]; after?: string }) => {
      const client = createNotionClient(requireToken());
      return client.appendBlocks(args.blockId, args.children, args.after);
    },
  },
];
