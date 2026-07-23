/**
 * Leaf module for the shared MCP tool-definition types.
 *
 * Extracted out of `tools.ts` to break a dependency cycle: `tools.ts` imports the
 * `toolSearchTool` value from `toolSearch.ts`, and `toolSearch.ts` needs the
 * `McpToolDefinition` type. Keeping the type here (a leaf that only depends on zod)
 * lets both files import it without forming a cycle.
 */

import type { z } from "zod";

export type AuditLevel = "none" | "basic" | "full";

export interface McpToolDefinition<TInput extends z.ZodTypeAny, TOutput extends z.ZodTypeAny> {
  /** Tool name (MCP identifier) */
  name: string;
  /** Human-readable description for AI agents */
  description: string;
  /** Zod schema for input validation */
  inputSchema: TInput;
  /** Zod schema for output validation */
  outputSchema: TOutput;
  /** Required API key scopes */
  scopes: readonly string[];
  /** Audit logging level */
  auditLevel: AuditLevel;
  /** Phase: 1 = essential, 2 = advanced */
  phase: 1 | 2;
  /** Source endpoints on OmniRoute that this tool wraps */
  sourceEndpoints: readonly string[];
}
