import { sanitizeErrorMessage } from "../utils/error.ts";

export function toSafeMcpErrorMessage(
  value: unknown,
  fallback = "MCP tool execution failed"
): string {
  try {
    const raw = value instanceof Error ? value.message : value;
    return sanitizeErrorMessage(raw) || fallback;
  } catch {
    return fallback;
  }
}
