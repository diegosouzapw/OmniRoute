import { z } from "zod";

import {
  getConfiguredLocalCorpusStatus,
  readConfiguredLocalCorpus,
  searchConfiguredLocalCorpus,
} from "../../../src/lib/localCorpus/configured.ts";

export const localCorpusTools = [
  {
    name: "local_corpus_status",
    description:
      "Show whether the read-only local corpus is configured and summarize its in-memory index without exposing the absolute root path.",
    scopes: ["read:local-corpus"],
    inputSchema: z.object({}).strict(),
    handler: async () => getConfiguredLocalCorpusStatus(),
  },
  {
    name: "local_corpus_search",
    description:
      "Search text files under the explicitly configured local corpus root. The index refreshes incrementally and returns relative paths with line-scoped snippets.",
    scopes: ["read:local-corpus"],
    inputSchema: z
      .object({
        query: z.string().trim().min(1).max(500).describe("Text to search for"),
        limit: z.number().int().min(1).max(20).default(10).describe("Maximum results"),
        refresh: z
          .boolean()
          .default(false)
          .describe("Force an incremental rescan before searching"),
      })
      .strict(),
    handler: async (args: { query: string; limit?: number; refresh?: boolean }) =>
      searchConfiguredLocalCorpus(args.query, {
        limit: args.limit,
        refresh: args.refresh,
      }),
  },
  {
    name: "local_corpus_read",
    description:
      "Read a bounded line range from a permitted text file under the configured local corpus root. Absolute paths and path traversal are rejected.",
    scopes: ["read:local-corpus"],
    inputSchema: z
      .object({
        relativePath: z
          .string()
          .trim()
          .min(1)
          .max(2_048)
          .describe("Path relative to the corpus root"),
        startLine: z.number().int().min(1).optional().describe("First line to return (1-based)"),
        endLine: z.number().int().min(1).optional().describe("Last line to return (inclusive)"),
      })
      .strict(),
    handler: async (args: { relativePath: string; startLine?: number; endLine?: number }) =>
      readConfiguredLocalCorpus(args.relativePath, {
        startLine: args.startLine,
        endLine: args.endLine,
      }),
  },
] as const;
