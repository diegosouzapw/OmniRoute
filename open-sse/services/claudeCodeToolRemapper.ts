/**
 * Claude Code tool name remapping.
 *
 * Anthropic uses tool name fingerprinting to detect third-party clients.
 * Real Claude Code uses TitleCase tool names (Bash, Read, Write, etc.)
 * while third-party clients like OpenCode use lowercase.
 *
 * This module remaps tool names in both directions:
 * - Request path: lowercase → TitleCase (before sending to Anthropic)
 * - Response path: TitleCase → lowercase (for clients expecting lowercase)
 */

import { EXTRA_TOOL_RENAME_MAP } from "./claudeCodeExtraRemap.ts";

const TOOL_RENAME_MAP: Record<string, string> = {
  ...EXTRA_TOOL_RENAME_MAP,
  bash: "Bash",
  read: "Read",
  write: "Write",
  edit: "Edit",
  glob: "Glob",
  grep: "Grep",
  task: "Task",
  webfetch: "WebFetch",
  websearch: "WebSearch",
  todowrite: "TodoWrite",
  todoread: "TodoRead",
  question: "Question",
  skill: "Skill",
  multiedit: "MultiEdit",
  notebook: "Notebook",
  lsp: "Lsp",
  apply_patch: "ApplyPatch",
};

const REVERSE_MAP: Record<string, string> = {};
for (const [k, v] of Object.entries(TOOL_RENAME_MAP)) {
  REVERSE_MAP[v] = k;
}

export function remapToolNamesInRequest(body: Record<string, unknown>): void {
  // Remap tool definitions
  const tools = body.tools as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(tools)) {
    for (const tool of tools) {
      const name = String(tool.name || "");
      if (TOOL_RENAME_MAP[name]) {
        tool.name = TOOL_RENAME_MAP[name];
      }
    }
  }

  // Remap tool_result references in messages
  const messages = body.messages as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(messages)) {
    for (const msg of messages) {
      const content = msg.content as Array<Record<string, unknown>> | undefined;
      if (!Array.isArray(content)) continue;
      for (const block of content) {
        if (block.type === "tool_use" && typeof block.name === "string") {
          const mapped = TOOL_RENAME_MAP[block.name];
          if (mapped) block.name = mapped;
        }
      }
    }
  }

  // Remap tool_choice
  const toolChoice = body.tool_choice as Record<string, unknown> | undefined;
  if (toolChoice?.type === "tool" && typeof toolChoice.name === "string") {
    const mapped = TOOL_RENAME_MAP[toolChoice.name];
    if (mapped) toolChoice.name = mapped;
  }
}

export function remapToolNamesInResponse(text: string): string {
  // Replace TitleCase tool names back to lowercase in SSE chunks
  for (const [titleCase, lower] of Object.entries(REVERSE_MAP)) {
    // Match in "name":"ToolName" patterns
    text = text.replaceAll(`"name":"${titleCase}"`, `"name":"${lower}"`);
    text = text.replaceAll(`"name": "${titleCase}"`, `"name": "${lower}"`);
  }
  return text;
}

export { TOOL_RENAME_MAP, REVERSE_MAP };
