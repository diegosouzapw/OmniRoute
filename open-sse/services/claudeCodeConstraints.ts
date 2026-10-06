/**
 * Claude Code API constraints.
 *
 * Enforces Anthropic API requirements that real Claude Code handles:
 * 1. Sampling params under extended thinking: temperature=1 and top_p>=0.95
 *    (or unset) when thinking is enabled/adaptive
 * 2. Disable thinking when tool_choice forces a specific tool
 * 3. Enforce max 4 cache_control breakpoints
 * 4. Normalize cache_control TTL ordering
 * 5. Default missing cache_control.ttl to "1h" on the native Claude OAuth path
 */

/**
 * Anthropic's extended-thinking contract rejects non-default sampling params:
 * with thinking enabled/adaptive, `temperature` may only be 1 and `top_p` must
 * be >= 0.95 (or unset) — otherwise the Messages API returns HTTP 400
 * ("`temperature` may only be set to 1 ..." / "`top_p` must be greater than or
 * equal to 0.95 ..."). Clients such as the VS Code Copilot "Ollama" provider
 * routinely send other values (e.g. temperature 0.7, top_p 0.9), and thinking
 * can be injected by per-model requestDefaults *after* the request is built, so
 * normalize here: pin temperature to 1 and drop top_p (Anthropic's "unset"
 * branch — which also preserves the "never send both temperature and top_p"
 * invariant).
 */
export function enforceThinkingTemperature(body: Record<string, unknown>): void {
  const thinking = body.thinking as Record<string, unknown> | undefined;
  if (thinking?.type === "enabled" || thinking?.type === "adaptive") {
    body.temperature = 1;
    if (body.top_p !== undefined) {
      delete body.top_p;
    }
  }
}

/** Applies the final Anthropic wire-body invariants before serialization. */
export function finalizeClaudeBodyConstraints(body: Record<string, unknown>): void {
  hoistLeadingSystemMessages(body);
  relocateDirectiveOnlyMessages(body);
  enforceThinkingTemperature(body);
}

function isSystemRole(role: unknown): boolean {
  return (
    typeof role === "string" &&
    (role.toLowerCase() === "system" || role.toLowerCase() === "developer")
  );
}

function hasOutputConfig(message: Record<string, unknown>): boolean {
  return (
    message.output_config != null &&
    typeof message.output_config === "object" &&
    !Array.isArray(message.output_config)
  );
}

function isEmptySystemMessage(message: unknown): message is Record<string, unknown> {
  if (message == null || typeof message !== "object") return false;
  const candidate = message as Record<string, unknown>;
  return (
    isSystemRole(candidate.role) &&
    Array.isArray(candidate.content) &&
    candidate.content.length === 0
  );
}

function isDirectiveOnlyMessage(message: unknown): boolean {
  return isEmptySystemMessage(message) && hasOutputConfig(message);
}

/**
 * Moves a directive-only system message (empty content array + message-level
 * `output_config`) off `messages[0]`, which Anthropic reserves for the initial
 * system-prompt position. Legitimate directives already later in the conversation
 * stay untouched.
 */
export function relocateDirectiveOnlyMessages(payload: Record<string, unknown>): void {
  if (!Array.isArray(payload.messages) || payload.messages.length === 0) return;
  const messages = payload.messages as Array<Record<string, unknown>>;
  if (!isEmptySystemMessage(messages[0])) return;

  let runEnd = 0;
  while (runEnd < messages.length && isEmptySystemMessage(messages[runEnd])) runEnd++;
  const directives = messages.slice(0, runEnd).filter(isDirectiveOnlyMessage);

  let insertAfter = -1;
  for (let i = runEnd; i < messages.length; i++) {
    const candidate = messages[i];
    if (candidate != null && typeof candidate === "object" && !isSystemRole(candidate.role)) {
      insertAfter = i;
      break;
    }
  }

  if (insertAfter === -1) {
    if (payload.output_config == null && directives.length > 0) {
      payload.output_config = directives[0].output_config;
    }
    payload.messages = messages.slice(runEnd);
    return;
  }

  payload.messages = [
    ...messages.slice(runEnd, insertAfter + 1),
    ...directives,
    ...messages.slice(insertAfter + 1),
  ];
}

/** Extracts non-empty text blocks from string or array message content. */
function textBlocksFromContent(content: unknown): Array<Record<string, unknown>> {
  if (typeof content === "string" && content.length > 0) {
    return [{ type: "text", text: content }];
  }
  if (!Array.isArray(content)) return [];
  const blocks: Array<Record<string, unknown>> = [];
  for (const block of content) {
    if (block == null || typeof block !== "object") continue;
    const contentBlock = block as Record<string, unknown>;
    if (
      contentBlock.type === "text" &&
      typeof contentBlock.text === "string" &&
      contentBlock.text.length > 0
    ) {
      blocks.push({ ...contentBlock });
    }
  }
  return blocks;
}

/** Merges hoisted blocks into the existing top-level system value. */
function mergeSystemBlocks(
  existing: unknown,
  extra: Array<Record<string, unknown>>
): Array<Record<string, unknown>> {
  if (typeof existing === "string" && existing.length > 0) {
    return [{ type: "text", text: existing }, ...extra];
  }
  if (Array.isArray(existing)) {
    return [...(existing as Array<Record<string, unknown>>), ...extra];
  }
  return extra;
}

/**
 * Hoists only the initial system/developer run into Anthropic's top-level `system` field.
 * Directive-only entries remain in `messages` for the positional relocation pass, and
 * mid-conversation system entries remain untouched for the context-1m beta path.
 */
export function hoistLeadingSystemMessages(payload: Record<string, unknown>): void {
  if (!Array.isArray(payload.messages) || payload.messages.length === 0) return;
  const messages = payload.messages as Array<Record<string, unknown>>;

  let runEnd = 0;
  while (runEnd < messages.length && isSystemRole(messages[runEnd]?.role)) runEnd++;
  if (runEnd === 0) return;

  const extraBlocks: Array<Record<string, unknown>> = [];
  const directives: Array<Record<string, unknown>> = [];
  for (const message of messages.slice(0, runEnd)) {
    if (isDirectiveOnlyMessage(message)) {
      directives.push(message);
      continue;
    }
    extraBlocks.push(...textBlocksFromContent(message.content));
    if (payload.output_config == null && hasOutputConfig(message)) {
      payload.output_config = message.output_config;
    }
  }

  if (extraBlocks.length > 0) {
    payload.system = mergeSystemBlocks(payload.system, extraBlocks);
  }
  payload.messages = [...directives, ...messages.slice(runEnd)];
}

export function disableThinkingIfToolChoiceForced(body: Record<string, unknown>): void {
  const toolChoice = body.tool_choice as Record<string, unknown> | string | undefined;
  if (!toolChoice) return;

  const isForced =
    toolChoice === "any" ||
    (typeof toolChoice === "object" && (toolChoice.type === "any" || toolChoice.type === "tool"));

  if (isForced && body.thinking) {
    delete body.thinking;
    delete body.context_management;
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

  const system = body.system as Array<Record<string, unknown>> | undefined;
  let cacheControlCount = Array.isArray(system)
    ? system.filter((block) => block.cache_control).length
    : 0;
  let hasFiveMinuteCacheControl = Array.isArray(system)
    ? system.some(
        (block) => (block.cache_control as Record<string, unknown> | undefined)?.ttl === "5m"
      )
    : false;

  for (const message of messages) {
    const content = message.content as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(content)) continue;
    cacheControlCount += content.filter((block) => block.cache_control).length;
    hasFiveMinuteCacheControl ||= content.some(
      (block) => (block.cache_control as Record<string, unknown> | undefined)?.ttl === "5m"
    );
  }

  // Find the last user message
  for (let i = messages.length - 1; i >= 0; i--) {
    if (String(messages[i].role) === "user") {
      const content = messages[i].content;
      if (Array.isArray(content) && content.length > 0) {
        const lastBlock = content[content.length - 1] as Record<string, unknown>;
        if (!lastBlock.cache_control && cacheControlCount < MAX_CACHE_CONTROL_BLOCKS) {
          lastBlock.cache_control = hasFiveMinuteCacheControl
            ? { type: "ephemeral", ttl: "5m" }
            : { type: "ephemeral" };
        }
      }
      break;
    }
  }
}

/** Defaults missing TTLs to 1h until a 5m breakpoint; later defaults stay at 5m. */
export function normalizeCacheControlTtl(body: Record<string, unknown>): void {
  let hasFiveMinuteCacheControl = false;

  const defaultMissingTtl = (block: Record<string, unknown> | null | undefined) => {
    const cc = block?.cache_control as Record<string, unknown> | undefined;
    if (!cc || cc.type !== "ephemeral") return;

    if (cc.ttl === "5m") {
      hasFiveMinuteCacheControl = true;
    } else if (cc.ttl === undefined) {
      cc.ttl = hasFiveMinuteCacheControl ? "5m" : "1h";
    }
  };

  const tools = body.tools as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(tools)) {
    for (const tool of tools) defaultMissingTtl(tool);
  }

  const system = body.system as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(system)) {
    for (const block of system) defaultMissingTtl(block);
  }

  const messages = body.messages as Array<Record<string, unknown>> | undefined;
  if (Array.isArray(messages)) {
    for (const message of messages) {
      const content = message.content as Array<Record<string, unknown>> | undefined;
      if (Array.isArray(content)) {
        for (const block of content) defaultMissingTtl(block);
      }
    }
  }
}
