type JsonRecord = Record<string, unknown>;

const SYSTEM_REMINDER_BLOCK_RE = /<system-reminder>[\s\S]*?<\/system-reminder>/gi;

function cloneJson<T>(value: T): T {
  return value === undefined ? value : JSON.parse(JSON.stringify(value));
}

function collapseWhitespace(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function stripClaudeSystemReminderText(text: unknown): string {
  if (typeof text !== "string" || !text) return "";
  return collapseWhitespace(text.replace(SYSTEM_REMINDER_BLOCK_RE, ""));
}

function sanitizeContentBlocks(content: unknown): {
  content: unknown;
  strippedBlocks: number;
} {
  if (!Array.isArray(content)) {
    if (typeof content === "string") {
      const sanitized = stripClaudeSystemReminderText(content);
      return {
        content: sanitized,
        strippedBlocks: sanitized === content ? 0 : 1,
      };
    }
    return { content, strippedBlocks: 0 };
  }

  let strippedBlocks = 0;
  const sanitized = content.flatMap((block) => {
    if (!block || typeof block !== "object") return [block];

    const record = block as JsonRecord;
    if (record.type !== "text" || typeof record.text !== "string") {
      return [block];
    }

    const sanitizedText = stripClaudeSystemReminderText(record.text);
    if (sanitizedText === record.text) {
      return [block];
    }

    strippedBlocks += 1;
    if (!sanitizedText) return [];
    return [{ ...record, text: sanitizedText }];
  });

  return { content: sanitized, strippedBlocks };
}

export function sanitizeClaudeContextForNonClaudeTarget(
  body: Record<string, unknown> | null | undefined
): {
  body: Record<string, unknown>;
  strippedBlocks: number;
} {
  const cloned = cloneJson(body || {});
  let strippedBlocks = 0;

  if (Array.isArray(cloned.system)) {
    cloned.system = cloned.system.flatMap((block) => {
      if (!block || typeof block !== "object") return [block];
      const record = block as JsonRecord;
      if (record.type !== "text" || typeof record.text !== "string") return [block];
      const sanitizedText = stripClaudeSystemReminderText(record.text);
      if (sanitizedText === record.text) return [block];
      strippedBlocks += 1;
      if (!sanitizedText) return [];
      return [{ ...record, text: sanitizedText }];
    });
  } else if (typeof cloned.system === "string") {
    const sanitizedSystem = stripClaudeSystemReminderText(cloned.system);
    if (sanitizedSystem !== cloned.system) {
      strippedBlocks += 1;
      cloned.system = sanitizedSystem;
    }
  }

  if (Array.isArray(cloned.messages)) {
    cloned.messages = cloned.messages.map((message) => {
      if (!message || typeof message !== "object") return message;
      const record = message as JsonRecord;
      const sanitized = sanitizeContentBlocks(record.content);
      strippedBlocks += sanitized.strippedBlocks;
      if (sanitized.content === record.content) return message;
      return {
        ...record,
        content: sanitized.content,
      };
    });
  }

  return { body: cloned, strippedBlocks };
}
