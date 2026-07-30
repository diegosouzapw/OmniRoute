type JsonRecord = Record<string, unknown>;

const SERVER_ITEM_ID_PATTERN = /^(rs|fc|resp|msg)_/;

/**
 * Applies the persistence-independent policy for replayed Responses input items.
 * Stored references can only be resolved by the upstream that created them, so
 * they are always removed. Self-contained encrypted reasoning is retained only
 * when the selected connection explicitly opts in.
 */
export function applyResponsesInputPolicy(
  body: Record<string, unknown>,
  preserveEncryptedReasoning = false
): void {
  if (Array.isArray(body.input) && body.input.length === 0) {
    body.input = [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "continue" }],
      },
    ];
  }

  if (!Array.isArray(body.input)) return;

  body.input = body.input.filter((item) => {
    if (typeof item === "string" && SERVER_ITEM_ID_PATTERN.test(item)) {
      return false;
    }

    const record =
      item && typeof item === "object" && !Array.isArray(item) ? (item as JsonRecord) : null;
    if (!record) return true;

    if (record.type === "item_reference") {
      return false;
    }

    if (
      record.type === "reasoning" &&
      (!preserveEncryptedReasoning ||
        typeof record.encrypted_content !== "string" ||
        record.encrypted_content.trim().length === 0)
    ) {
      return false;
    }

    if (typeof record.id === "string" && SERVER_ITEM_ID_PATTERN.test(record.id)) {
      delete record.id;
    }

    return true;
  });
}
