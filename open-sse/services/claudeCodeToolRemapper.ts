/**
 * Claude Code tool name remapping.
 *
 * Claude Code-compatible requests use TitleCase tool names (Bash, Read,
 * Write, etc.) while OpenAI-compatible clients commonly use lowercase names.
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

function attachToolNameMap(body: Record<string, unknown>, toolNameMap: Map<string, string>): void {
  if (toolNameMap.size === 0) return;
  Object.defineProperty(body, "_toolNameMap", {
    value: toolNameMap,
    enumerable: false,
    configurable: true,
    writable: true,
  });
}

export function remapToolNamesInRequest(body: Record<string, unknown>): boolean {
  let hasLowercase = false;
  let hasTitleCase = false;
  const existingToolNameMap = body._toolNameMap instanceof Map ? body._toolNameMap : null;
  const toolNameMap = new Map<string, string>(existingToolNameMap ?? []);

  const recordRemap = (upstreamName: string, originalName: string): void => {
    toolNameMap.set(upstreamName, originalName);
  };

  // Remap tool definitions
  const tools = body.tools as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(tools)) {
    for (const tool of tools) {
      const name = String(tool.name || "");
      const mapped = TOOL_RENAME_MAP[name];
      if (mapped) {
        tool.name = mapped;
        recordRemap(mapped, name);
        hasLowercase = true;
      } else if (REVERSE_MAP[name]) {
        hasTitleCase = true;
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
          const name = block.name;
          const mapped = TOOL_RENAME_MAP[name];
          if (mapped) {
            block.name = mapped;
            recordRemap(mapped, name);
            hasLowercase = true;
          } else if (REVERSE_MAP[name]) {
            hasTitleCase = true;
          }
        }
      }
    }
  }

  // Remap tool_choice
  const toolChoice = body.tool_choice as Record<string, unknown> | undefined;
  if (toolChoice?.type === "tool" && typeof toolChoice.name === "string") {
    const name = toolChoice.name;
    const mapped = TOOL_RENAME_MAP[name];
    if (mapped) {
      toolChoice.name = mapped;
      recordRemap(mapped, name);
      hasLowercase = true;
    } else if (REVERSE_MAP[name]) {
      hasTitleCase = true;
    }
  }

  attachToolNameMap(body, toolNameMap);

  return hasLowercase && !hasTitleCase;
}

export function remapToolNamesInResponse(
  text: string,
  forceLowercase = true,
  toolNameMap: Map<string, string> | null = null
): string {
  if (!forceLowercase) return text;

  const replacements = new Map<string, string>(Object.entries(REVERSE_MAP));
  if (toolNameMap instanceof Map) {
    for (const [upstreamName, originalName] of toolNameMap.entries()) {
      replacements.set(upstreamName, originalName);
    }
  }

  // Replace TitleCase tool names back to lowercase in SSE chunks
  for (const [titleCase, lower] of replacements.entries()) {
    // Match in "name":"ToolName" patterns
    text = text.replaceAll(`"name":"${titleCase}"`, `"name":"${lower}"`);
    text = text.replaceAll(`"name": "${titleCase}"`, `"name": "${lower}"`);
  }
  return text;
}

export { TOOL_RENAME_MAP, REVERSE_MAP };
