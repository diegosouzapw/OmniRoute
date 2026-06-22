type MessageLike = {
  role?: unknown;
  content?: unknown;
  [COMPRESSION_INPUT_INDEX]?: number;
  [KIRO_TOOL_RESULT_PATH]?: KiroToolResultPath;
  [key: string]: unknown;
};

type ResponsesItem = {
  type?: unknown;
  role?: unknown;
  content?: unknown;
  output?: unknown;
  [key: string]: unknown;
};

const RESPONSES_MESSAGE_TYPES = new Set(["message", "function_call_output"]);
const COMPRESSION_INPUT_INDEX = Symbol("compressionInputIndex");

// Kiro envelope path back to the original tool-result text inside
// `conversationState.{history|currentMessage}[].userInputMessage.userInputMessageContext.toolResults[N].content[M].text`.
// Stored on the synthesized role:"tool" message so we can restore the rewritten text
// to the exact source slot after any compression engine runs.
//
// This lifts Kiro support from RTK-only (upstream decolua/9router#1194) to the shared
// adapter layer, so every compression engine (RTK, lite, aggressive…) automatically
// covers Kiro/CodeWhisperer payloads, not just RTK.
const KIRO_TOOL_RESULT_PATH = Symbol("kiroToolResultPath");

type KiroToolResultPath = {
  scope: "currentMessage" | "history";
  historyIndex: number; // ignored when scope === "currentMessage"
  toolResultIndex: number;
  contentIndex: number;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function normalizeRole(role: unknown, fallback: string): string {
  return typeof role === "string" && role.length > 0 ? role : fallback;
}

function toChatContent(content: unknown, fallbackOutput?: unknown): unknown {
  return content === undefined ? fallbackOutput : content;
}

function fromChatContent(nextContent: unknown, originalContent: unknown): unknown {
  if (Array.isArray(originalContent) && typeof nextContent === "string") {
    let replaced = false;
    const mapped = originalContent.map((part) => {
      if (!isRecord(part) || typeof part.text !== "string") return part;
      if (replaced) return { ...part, text: "" };
      replaced = true;
      return { ...part, text: nextContent };
    });
    return replaced ? mapped : originalContent;
  }
  return nextContent;
}

function responsesItemToMessage(item: ResponsesItem): MessageLike | null {
  const type = typeof item.type === "string" ? item.type : "message";
  if (!RESPONSES_MESSAGE_TYPES.has(type)) return null;

  if (type === "function_call_output") {
    return {
      role: "tool",
      content: toChatContent(item.output ?? item.content),
    };
  }

  return {
    role: normalizeRole(item.role, "user"),
    content: toChatContent(item.content, item.output),
  };
}

function messageToResponsesItem(message: MessageLike, originalItem: ResponsesItem): ResponsesItem {
  const type = typeof originalItem.type === "string" ? originalItem.type : "message";
  if (type === "function_call_output") {
    return {
      ...originalItem,
      output: fromChatContent(message.content, originalItem.output),
    };
  }

  return {
    ...originalItem,
    content: fromChatContent(message.content, originalItem.content),
  };
}

function hasTextContent(message: MessageLike): boolean {
  if (typeof message.content === "string") return message.content.length > 0;
  if (!Array.isArray(message.content)) return false;
  return message.content.some(
    (part) => isRecord(part) && typeof part.text === "string" && part.text.length > 0
  );
}

export type CompressionBodyAdapter = {
  body: Record<string, unknown>;
  adapted: boolean;
  restore(compressedBody: Record<string, unknown>): Record<string, unknown>;
};

export function adaptBodyForCompression(body: Record<string, unknown>): CompressionBodyAdapter {
  if (Array.isArray(body.messages)) {
    return {
      body,
      adapted: false,
      restore: (compressedBody) => compressedBody,
    };
  }

  // Kiro / AWS CodeWhisperer envelope: tool results live deep inside
  // conversationState.{currentMessage|history[]}.userInputMessage.userInputMessageContext.toolResults.
  // Flatten the tool-result text into synthesized role:"tool" messages so every engine
  // can compress them, then restore the rewritten text back into the exact source slot.
  if (isRecord(body.conversationState)) {
    return adaptKiroBodyForCompression(body);
  }

  if (!Array.isArray(body.input) && typeof body.input !== "string") {
    return {
      body,
      adapted: false,
      restore: (compressedBody) => compressedBody,
    };
  }

  const inputItems = Array.isArray(body.input)
    ? body.input
    : [{ type: "message", role: "user", content: body.input }];
  const mappings: Array<{ index: number; item: ResponsesItem }> = [];
  const messages: MessageLike[] = [];

  inputItems.forEach((item, index) => {
    if (!isRecord(item)) return;
    const message = responsesItemToMessage(item);
    if (!message || !hasTextContent(message)) return;
    mappings.push({ index, item: item as ResponsesItem });
    messages.push({ ...message, [COMPRESSION_INPUT_INDEX]: index });
  });

  if (messages.length === 0) {
    return {
      body,
      adapted: false,
      restore: (compressedBody) => compressedBody,
    };
  }

  const bodyWithoutInput = { ...body };
  delete bodyWithoutInput.input;

  return {
    body: { ...bodyWithoutInput, messages },
    adapted: true,
    restore(compressedBody) {
      const compressedMessagesByIndex = new Map<number, MessageLike>();
      if (Array.isArray(compressedBody.messages)) {
        for (const message of compressedBody.messages as MessageLike[]) {
          if (typeof message[COMPRESSION_INPUT_INDEX] === "number") {
            compressedMessagesByIndex.set(message[COMPRESSION_INPUT_INDEX], message);
          }
        }
      }
      const nextInput = [...inputItems];
      mappings.forEach((mapping) => {
        const compressedMessage = compressedMessagesByIndex.get(mapping.index);
        if (!compressedMessage) return;
        nextInput[mapping.index] = messageToResponsesItem(compressedMessage, mapping.item);
      });
      const rest = { ...compressedBody };
      delete rest.messages;
      if (typeof body.input === "string") {
        const first = nextInput[0];
        return { ...rest, input: isRecord(first) ? (first.content ?? body.input) : body.input };
      }
      return { ...rest, input: nextInput };
    },
  };
}

/**
 * Flatten a Kiro / AWS CodeWhisperer body so compression engines can rewrite the
 * tool-result text, then restore the rewritten text back into the original envelope
 * shape. Mirrors the OpenAI tool-role contract:
 *
 * - Each surviving tool-result content block becomes one role:"tool" message whose
 *   `content` is its inner text (engines see a familiar shape).
 * - Error tool results (`status === "error"`) are intentionally left out of the
 *   synthesized messages so engines cannot rewrite them — preserves diagnostics
 *   byte-for-byte (matches upstream decolua/9router#1194 behavior).
 * - Non-string text parts are skipped.
 * - On restore, only string `content` (or an array whose first text part is a string)
 *   is written back to `toolResults[N].content[M].text`.
 */
function adaptKiroBodyForCompression(body: Record<string, unknown>): CompressionBodyAdapter {
  const state = body.conversationState as Record<string, unknown>;
  const history = Array.isArray(state.history) ? (state.history as Array<unknown>) : [];
  const currentMessage = isRecord(state.currentMessage) ? state.currentMessage : null;

  const messages: MessageLike[] = [];

  const collectFrom = (
    container: Record<string, unknown>,
    scope: "currentMessage" | "history",
    historyIndex: number
  ): void => {
    const uim = container.userInputMessage;
    if (!isRecord(uim)) return;
    const ctx = uim.userInputMessageContext;
    if (!isRecord(ctx)) return;
    const toolResults = ctx.toolResults;
    if (!Array.isArray(toolResults)) return;
    toolResults.forEach((tr, trIdx) => {
      if (!isRecord(tr)) return;
      if (tr.status === "error") return; // preserve error traces — never compress
      const content = tr.content;
      if (!Array.isArray(content)) return;
      content.forEach((part, partIdx) => {
        if (!isRecord(part)) return;
        if (typeof part.text !== "string" || part.text.length === 0) return;
        messages.push({
          role: "tool",
          content: part.text,
          [KIRO_TOOL_RESULT_PATH]: {
            scope,
            historyIndex,
            toolResultIndex: trIdx,
            contentIndex: partIdx,
          },
        });
      });
    });
  };

  history.forEach((entry, idx) => {
    if (!isRecord(entry)) return;
    collectFrom(entry, "history", idx);
  });
  if (currentMessage) collectFrom(currentMessage, "currentMessage", -1);

  if (messages.length === 0) {
    return {
      body,
      adapted: false,
      restore: (compressedBody) => compressedBody,
    };
  }

  return {
    body: { ...body, messages },
    adapted: true,
    restore(compressedBody) {
      // Build a path → rewritten text map from the synthesized tool messages.
      const rewrites = new Map<string, string>();
      if (Array.isArray(compressedBody.messages)) {
        for (const message of compressedBody.messages as MessageLike[]) {
          const path = message[KIRO_TOOL_RESULT_PATH];
          if (!path) continue;
          let nextText: string | null = null;
          if (typeof message.content === "string") {
            nextText = message.content;
          } else if (Array.isArray(message.content)) {
            const firstText = message.content.find(
              (part): part is { text: string } =>
                isRecord(part) && typeof (part as { text?: unknown }).text === "string"
            );
            if (firstText) nextText = firstText.text;
          }
          if (nextText === null) continue;
          rewrites.set(kiroPathKey(path), nextText);
        }
      }

      const nextState: Record<string, unknown> = { ...state };
      // Rebuild history with any rewritten tool-result text.
      if (history.length > 0) {
        nextState.history = history.map((entry, idx) => {
          if (!isRecord(entry)) return entry;
          return rewriteKiroEntry(entry, "history", idx, rewrites);
        });
      }
      if (currentMessage) {
        nextState.currentMessage = rewriteKiroEntry(currentMessage, "currentMessage", -1, rewrites);
      }

      const rest = { ...compressedBody };
      delete rest.messages;
      return { ...rest, conversationState: nextState };
    },
  };
}

function kiroPathKey(path: KiroToolResultPath): string {
  return `${path.scope}|${path.historyIndex}|${path.toolResultIndex}|${path.contentIndex}`;
}

function rewriteKiroEntry(
  entry: Record<string, unknown>,
  scope: "currentMessage" | "history",
  historyIndex: number,
  rewrites: Map<string, string>
): Record<string, unknown> {
  const uim = entry.userInputMessage;
  if (!isRecord(uim)) return entry;
  const ctx = uim.userInputMessageContext;
  if (!isRecord(ctx)) return entry;
  const toolResults = ctx.toolResults;
  if (!Array.isArray(toolResults)) return entry;

  let entryChanged = false;
  const nextToolResults = toolResults.map((tr, trIdx) => {
    if (!isRecord(tr)) return tr;
    const content = tr.content;
    if (!Array.isArray(content)) return tr;
    let trChanged = false;
    const nextContent = content.map((part, partIdx) => {
      if (!isRecord(part) || typeof part.text !== "string") return part;
      const key = kiroPathKey({ scope, historyIndex, toolResultIndex: trIdx, contentIndex: partIdx });
      const rewritten = rewrites.get(key);
      if (rewritten === undefined || rewritten === part.text) return part;
      trChanged = true;
      return { ...part, text: rewritten };
    });
    if (!trChanged) return tr;
    entryChanged = true;
    return { ...tr, content: nextContent };
  });

  if (!entryChanged) return entry;
  return {
    ...entry,
    userInputMessage: {
      ...uim,
      userInputMessageContext: { ...ctx, toolResults: nextToolResults },
    },
  };
}
