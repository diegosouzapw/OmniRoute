type JsonRecord = Record<string, unknown>;

const MESSAGE_PLACEHOLDER = "[content removed - unsupported format]";

function shouldStripType(type: string | null, stripTypes: readonly string[]): boolean {
  if (!type) return false;
  if (stripTypes.includes(type)) return true;
  if (
    stripTypes.includes("image") &&
    (type === "image_url" || type === "image" || type === "input_image")
  ) {
    return true;
  }
  if (stripTypes.includes("audio") && (type === "input_audio" || type === "audio")) {
    return true;
  }
  return false;
}

function stripMessageContent(
  messages: unknown[],
  stripTypes: readonly string[]
): { changed: boolean; messages: unknown[]; strippedCount: number } {
  let changed = false;
  let strippedCount = 0;

  const nextMessages = messages.map((message) => {
    if (!message || typeof message !== "object") return message;
    const record = message as JsonRecord;
    if (!Array.isArray(record.content)) return message;
    let messageChanged = false;

    const filtered = record.content.filter((part) => {
      const type = part && typeof part === "object" ? (part as { type?: unknown }).type : null;
      const strip = shouldStripType(typeof type === "string" ? type : null, stripTypes);
      if (strip) {
        strippedCount += 1;
        changed = true;
        messageChanged = true;
      }
      return !strip;
    });

    if (!messageChanged) return message;
    if (filtered.length === 0) {
      return { ...record, content: MESSAGE_PLACEHOLDER };
    }
    if (
      filtered.length === 1 &&
      filtered[0] &&
      typeof filtered[0] === "object" &&
      (filtered[0] as { type?: unknown }).type === "text" &&
      typeof (filtered[0] as { text?: unknown }).text === "string"
    ) {
      return { ...record, content: (filtered[0] as { text: string }).text };
    }
    return { ...record, content: filtered };
  });

  return { changed, messages: nextMessages, strippedCount };
}

function stripResponsesInput(
  input: unknown[],
  stripTypes: readonly string[]
): { changed: boolean; input: unknown[]; strippedCount: number } {
  let changed = false;
  let strippedCount = 0;

  const nextInput = input
    .map((item) => {
      if (!item || typeof item !== "object") return item;
      const record = item as JsonRecord;
      let itemChanged = false;

      const rootType = typeof record.type === "string" ? record.type : null;
      if (shouldStripType(rootType, stripTypes)) {
        strippedCount += 1;
        changed = true;
        return null;
      }

      if (!Array.isArray(record.content)) return item;

      const filtered = record.content.filter((part) => {
        const type = part && typeof part === "object" ? (part as { type?: unknown }).type : null;
        const strip = shouldStripType(typeof type === "string" ? type : null, stripTypes);
        if (strip) {
          strippedCount += 1;
          changed = true;
          itemChanged = true;
        }
        return !strip;
      });

      if (!itemChanged) return item;
      if (filtered.length === 0) {
        return {
          ...record,
          content: [{ type: "input_text", text: MESSAGE_PLACEHOLDER }],
        };
      }
      return { ...record, content: filtered };
    })
    .filter((item) => item !== null);

  return { changed, input: nextInput, strippedCount };
}

export function stripIncompatibleContent(
  payload: Record<string, unknown>,
  stripTypes: readonly string[]
): { body: Record<string, unknown>; strippedCount: number } {
  if (
    !payload ||
    typeof payload !== "object" ||
    !Array.isArray(stripTypes) ||
    stripTypes.length === 0
  ) {
    return { body: payload, strippedCount: 0 };
  }

  let nextBody = payload;
  let strippedCount = 0;

  if (Array.isArray(payload.messages)) {
    const strippedMessages = stripMessageContent(payload.messages, stripTypes);
    strippedCount += strippedMessages.strippedCount;
    if (strippedMessages.changed) {
      nextBody = { ...nextBody, messages: strippedMessages.messages };
    }
  }

  if (Array.isArray(payload.input)) {
    const strippedInput = stripResponsesInput(payload.input, stripTypes);
    strippedCount += strippedInput.strippedCount;
    if (strippedInput.changed) {
      nextBody = { ...nextBody, input: strippedInput.input };
    }
  }

  return { body: nextBody, strippedCount };
}
