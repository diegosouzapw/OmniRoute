type MessageLike = {
  role?: unknown;
  content?: unknown;
  [COMPRESSION_INPUT_INDEX]?: number;
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
