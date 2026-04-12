/**
 * Claude Code API constraints.
 *
 * Enforces Anthropic API requirements that real Claude Code handles:
 * 1. temperature=1 when thinking is enabled
 * 2. Disable thinking when tool_choice forces a specific tool
 * 3. Enforce max 4 cache_control breakpoints
 * 4. Normalize cache_control TTL ordering
 */

export function enforceThinkingTemperature(body: Record<string, unknown>): void {
  const thinking = body.thinking as Record<string, unknown> | undefined;
  if (thinking?.type === "enabled" || thinking?.type === "adaptive") {
    body.temperature = 1;
  }
}

export function disableThinkingIfToolChoiceForced(body: Record<string, unknown>): void {
  const toolChoice = body.tool_choice as Record<string, unknown> | string | undefined;
  if (!toolChoice) return;

  const isForced =
    toolChoice === "any" ||
    (typeof toolChoice === "object" &&
      (toolChoice.type === "any" || toolChoice.type === "tool"));

  if (isForced && body.thinking) {
    delete body.thinking;
  }
}

const MAX_CACHE_CONTROL_BLOCKS = 4;

export function enforceCacheControlLimit(body: Record<string, unknown>): void {
  let count = 0;

  // Count in system blocks
  const system = body.system as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(system)) {
    for (const block of system) {
      if (block.cache_control) count++;
    }
  }

  // Count in messages
  const messages = body.messages as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(messages)) {
    for (const msg of messages) {
      const content = msg.content as Array<Record<string, unknown>> | undefined;
      if (!Array.isArray(content)) continue;
      for (const block of content) {
        if (block.cache_control) count++;
      }
    }
  }

  // Count in tools
  const tools = body.tools as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(tools)) {
    for (const tool of tools) {
      if (tool.cache_control) count++;
    }
  }

  if (count <= MAX_CACHE_CONTROL_BLOCKS) return;

  // Strip excess cache_control blocks from the end (keep first 4)
  let remaining = MAX_CACHE_CONTROL_BLOCKS;

  if (Array.isArray(system)) {
    for (const block of system) {
      if (block.cache_control) {
        if (remaining > 0) {
          remaining--;
        } else {
          delete block.cache_control;
        }
      }
    }
  }

  if (Array.isArray(messages)) {
    for (const msg of messages) {
      const content = msg.content as Array<Record<string, unknown>> | undefined;
      if (!Array.isArray(content)) continue;
      for (const block of content) {
        if (block.cache_control) {
          if (remaining > 0) {
            remaining--;
          } else {
            delete block.cache_control;
          }
        }
      }
    }
  }

  if (Array.isArray(tools)) {
    for (const tool of tools) {
      if (tool.cache_control) {
        if (remaining > 0) {
          remaining--;
        } else {
          delete tool.cache_control;
        }
      }
    }
  }
}

export function ensureCacheControlOnLastUserMessage(body: Record<string, unknown>): void {
  const messages = body.messages as Array<Record<string, unknown>> | undefined;
  if (!Array.isArray(messages) || messages.length === 0) return;

  // Find the last user message
  for (let i = messages.length - 1; i >= 0; i--) {
    if (String(messages[i].role) === "user") {
      const content = messages[i].content;
      if (Array.isArray(content) && content.length > 0) {
        const lastBlock = content[content.length - 1] as Record<string, unknown>;
        if (!lastBlock.cache_control) {
          lastBlock.cache_control = { type: "ephemeral" };
        }
      }
      break;
    }
  }
}
