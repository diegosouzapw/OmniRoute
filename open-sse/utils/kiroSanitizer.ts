/**
 * Kiro tool-schema sanitizer.
 *
 * Kiro / AWS CodeWhisperer rejects requests with HTTP 400 "Improperly formed
 * request" when a tool's `inputSchema.json` contains JSON-Schema keywords it
 * does not understand (`additionalProperties`, `anyOf`/`oneOf`/`allOf`/`not`,
 * `$ref`/`$defs`/`definitions`, `if`/`then`/`else`, etc.) or an empty
 * `required` array. It also rejects tool names longer than 64 characters.
 *
 * This pure helper strips the unsupported keys recursively, ensures a
 * top-level `required: []` is present, and hash-truncates over-long names —
 * returning a `nameMap` (truncated → original) so the streamed tool-call name
 * can be mapped back for the client. See chatCore.ts (request wiring) and
 * translator/response/kiro-to-openai.ts (response reverse-mapping).
 */
import { createHash } from "node:crypto";

/** Max tool-name length Kiro accepts before it rejects the request. */
const MAX_TOOL_NAME_LENGTH = 64;

/** JSON-Schema keywords Kiro rejects anywhere in a tool schema. */
const STRIP_KEYS = new Set<string>([
  "additionalProperties",
  "anyOf",
  "oneOf",
  "allOf",
  "not",
  "$schema",
  "$id",
  "$ref",
  "$defs",
  "definitions",
  "if",
  "then",
  "else",
  "unevaluatedProperties",
  "unevaluatedItems",
  "contentEncoding",
  "contentMediaType",
]);

/**
 * Recursively drop unsupported JSON-Schema keys and empty `required` arrays.
 * Non-object/array values are returned untouched.
 */
function stripKeys(value: unknown): unknown {
  if (!value || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(stripKeys);

  const cleaned: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
    if (STRIP_KEYS.has(key)) continue;
    if (key === "required" && Array.isArray(val) && val.length === 0) continue;
    cleaned[key] = stripKeys(val);
  }
  return cleaned;
}

/** A single Kiro tool entry (loose shape — upstream payloads vary). */
type KiroTool = {
  toolSpecification?: {
    name?: string;
    inputSchema?: { json?: unknown };
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export interface SanitizeKiroToolsResult<T = unknown> {
  tools: T;
  /** Map of truncated tool name → original name, for response reverse-mapping. */
  nameMap: Map<string, string>;
}

/**
 * Sanitize a Kiro `tools` array in place-safely (returns new objects).
 *
 * - Strips JSON-Schema keys Kiro rejects from each `inputSchema.json`.
 * - Ensures the top-level schema carries `required: []` (Kiro requires the key).
 * - Hash-truncates tool names > 64 chars and records the mapping in `nameMap`.
 *
 * Inputs that are not arrays are returned untouched with an empty `nameMap`,
 * so this is safe to call unconditionally on the Kiro tools slot.
 */
export function sanitizeKiroTools<T>(tools: T): SanitizeKiroToolsResult<T> {
  const nameMap = new Map<string, string>();

  if (!tools || !Array.isArray(tools)) {
    return { tools, nameMap };
  }

  const sanitized = (tools as KiroTool[]).map((tool) => {
    const spec = tool?.toolSpecification;
    if (!spec) return tool;

    const originalName = spec.name;
    let name = originalName;
    if (typeof name === "string" && name.length > MAX_TOOL_NAME_LENGTH) {
      const hash = createHash("sha256").update(name).digest("hex").slice(0, 7);
      name = `${name.slice(0, 56)}_${hash}`;
      nameMap.set(name, originalName as string);
    }

    const schema = spec.inputSchema?.json;
    if (schema && typeof schema === "object" && !Array.isArray(schema)) {
      const cleaned = stripKeys(schema) as Record<string, unknown>;
      if (!cleaned.required) {
        cleaned.required = [];
      }
      return {
        ...tool,
        toolSpecification: {
          ...spec,
          name,
          inputSchema: { json: cleaned },
        },
      };
    }

    return {
      ...tool,
      toolSpecification: { ...spec, name },
    };
  });

  return { tools: sanitized as T, nameMap };
}
