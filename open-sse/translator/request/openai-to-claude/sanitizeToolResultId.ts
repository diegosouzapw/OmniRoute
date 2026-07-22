import { sanitizeToolId } from "../../helpers/schemaCoercion.ts";

// #7705: sanitize a "tool" role message's tool_use_id symmetrically with the
// assistant's sanitized tool_use.id (see getContentBlocksFromMessage). Returns null for
// a falsy raw id so callers can keep the existing "skip orphan tool_result" guard —
// sanitizeToolId() mints a fresh random id for falsy input, which would otherwise defeat
// that guard and silently fabricate a tool_result that can never match a tool_use.
export function sanitizeToolResultId(rawId: unknown): string | null {
  if (!rawId) return null;
  return sanitizeToolId(rawId);
}
