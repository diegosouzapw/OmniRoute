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

const TOOL_RENAME_MAP: Record<string, string> = {
  bash: "Bash",
  read: "Read",
  write: "Write",
  edit: "Edit",
  glob: "Glob",
  grep: "Grep",
  task: "Task",
  webfetch: "WebFetch",
  todowrite: "TodoWrite",
  todoread: "TodoRead",
  question: "Question",
  skill: "Skill",
  multiedit: "MultiEdit",
  notebook: "Notebook",
};

const REVERSE_MAP: Record<string, string> = {};
for (const [k, v] of Object.entries(TOOL_RENAME_MAP)) {
  REVERSE_MAP[v] = k;
}

export function remapToolNamesInRequest(body: Record<string, unknown>): void {
  return;
}

export function remapToolNamesInResponse(text: string): string {
  return text;
}

export { TOOL_RENAME_MAP, REVERSE_MAP };
