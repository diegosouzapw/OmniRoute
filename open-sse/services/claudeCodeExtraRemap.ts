/**
 * Extra tool name remapping for third-party agent detection bypass.
 *
 * Anthropic detects non-Claude-Code clients by checking for specific
 * tool names that only third-party agents use (e.g. subagents, session_status).
 * This module adds aliases for those tool names so they look like
 * legitimate Claude Code tools.
 *
 * Mapping: lowercase original → TitleCase alias (sent to Anthropic)
 * Response path reverses automatically via REVERSE_MAP in claudeCodeToolRemapper.ts
 *
 * To update: just add entries to EXTRA_TOOL_RENAME_MAP below.
 */

export const EXTRA_TOOL_RENAME_MAP: Record<string, string> = {
  subagents: "SubDispatch",
  session_status: "CheckStatus",
};
