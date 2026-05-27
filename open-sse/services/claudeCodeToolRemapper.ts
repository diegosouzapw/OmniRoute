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

function getRequestToolNameMap(body: Record<string, unknown>): Map<string, string> {
  const existing = body._toolNameMap instanceof Map ? body._toolNameMap : new Map<string, string>();
  Object.defineProperty(body, "_toolNameMap", {
    value: existing,
    enumerable: false,
    configurable: true,
    writable: true,
  });
  return existing;
}

function trackToolName(
  body: Record<string, unknown>,
  titleCaseName: string,
  originalName: string
): void {
  getRequestToolNameMap(body).set(titleCaseName, originalName);
}

export function remapToolNamesInRequest(body: Record<string, unknown>): boolean {
  let hasLowercase = false;
  let hasTitleCase = false;

  // Remap tool definitions
  const tools = body.tools as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(tools)) {
    for (const tool of tools) {
      const name = String(tool.name || "");
      if (TOOL_RENAME_MAP[name]) {
        const mapped = TOOL_RENAME_MAP[name];
        tool.name = mapped;
        trackToolName(body, mapped, name);
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
          const mapped = TOOL_RENAME_MAP[block.name];
          if (mapped) {
            const originalName = block.name;
            block.name = mapped;
            trackToolName(body, mapped, originalName);
            hasLowercase = true;
          } else if (REVERSE_MAP[block.name]) {
            hasTitleCase = true;
          }
        }
      }
    }
  }

  // Remap tool_choice
  const toolChoice = body.tool_choice as Record<string, unknown> | undefined;
  if (toolChoice?.type === "tool" && typeof toolChoice.name === "string") {
    const mapped = TOOL_RENAME_MAP[toolChoice.name];
    if (mapped) {
      const originalName = toolChoice.name;
      toolChoice.name = mapped;
      trackToolName(body, mapped, originalName);
      hasLowercase = true;
    } else if (REVERSE_MAP[toolChoice.name]) {
      hasTitleCase = true;
    }
  }

  // NOTE: do not set body._claudeCodeRequiresLowercaseToolNames here.
  // The flag has no readers and would leak into the outgoing Anthropic
  // request body, causing HTTP 400 (Extra inputs are not permitted).
  // The response-side remap is unconditional via remapToolNamesInResponse.

  return hasLowercase && !hasTitleCase;
}

export function remapToolNamesInResponse(
  text: string,
  forceLowercase = true,
  toolNameMap?: Map<string, string>
): string {
  if (!forceLowercase) return text;

  // Replace TitleCase tool names back to lowercase in SSE chunks
  if (toolNameMap?.size) {
    for (const [mapped, original] of toolNameMap.entries()) {
      text = text.replaceAll(`"name":"${mapped}"`, `"name":"${original}"`);
      text = text.replaceAll(`"name": "${mapped}"`, `"name": "${original}"`);
    }
  }
  for (const [titleCase, lower] of Object.entries(REVERSE_MAP)) {
    // Match in "name":"ToolName" patterns
    text = text.replaceAll(`"name":"${titleCase}"`, `"name":"${lower}"`);
    text = text.replaceAll(`"name": "${titleCase}"`, `"name": "${lower}"`);
  }
  return text;
}

export { TOOL_RENAME_MAP, REVERSE_MAP };
