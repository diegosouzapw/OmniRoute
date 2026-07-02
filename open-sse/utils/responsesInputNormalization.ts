type JsonRecord = Record<string, unknown>;

function textPartTypeForRole(role: string): "input_text" | "output_text" {
  return role === "assistant" ? "output_text" : "input_text";
}

function normalizeCodexMessageContentPart(part: unknown, role: string): unknown {
  if (typeof part === "string") return { type: textPartTypeForRole(role), text: part };
  if (!part || typeof part !== "object" || Array.isArray(part)) return part;

  const record = { ...(part as JsonRecord) };
  if (record.type === "text") record.type = textPartTypeForRole(role);
  return record;
}

function buildCodexMessageContent(item: JsonRecord, role: string): unknown[] {
  if (Array.isArray(item.content)) {
    return item.content.map((part) => normalizeCodexMessageContentPart(part, role));
  }
  if (typeof item.content === "string") {
    return [{ type: textPartTypeForRole(role), text: item.content }];
  }
  if (typeof item.text === "string") {
    return [{ type: textPartTypeForRole(role), text: item.text }];
  }
  return [];
}

function normalizeCodexResponsesInputItem(itemValue: unknown): unknown {
  if (typeof itemValue === "string") {
    return { type: "message", role: "user", content: [{ type: "input_text", text: itemValue }] };
  }

  if (!itemValue || typeof itemValue !== "object" || Array.isArray(itemValue)) return itemValue;

  const item = { ...(itemValue as JsonRecord) };
  const role = typeof item.role === "string" ? item.role : "user";
  const type = typeof item.type === "string" ? item.type : "";

  if (!type && item.content === undefined && typeof item.text === "string") {
    return { type: "message", role, content: [{ type: textPartTypeForRole(role), text: item.text }] };
  }

  if (!type && role) item.type = "message";
  if (item.type === "message" || (!type && item.content !== undefined)) {
    item.role = role;
    item.content = buildCodexMessageContent(item, role);
    item.type = "message";
  }

  return item;
}

export function normalizeCodexResponsesInput(body: JsonRecord): void {
  if (Array.isArray(body.input)) {
    body.input = body.input.map(normalizeCodexResponsesInputItem);
    return;
  }

  // undefined → leave as-is; null → empty list (not [null], which would surface a bogus
  // item downstream); anything else → wrap the single item.
  if (body.input === undefined) return;
  body.input = body.input === null ? [] : [normalizeCodexResponsesInputItem(body.input)];
}

function normalizeResponsesInputItemForChat(value: unknown): unknown {
  if (typeof value === "string") {
    return { type: "message", role: "user", content: [{ type: "input_text", text: value }] };
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) return value;

  const item = { ...(value as JsonRecord) };
  const hasType = typeof item.type === "string" && item.type.length > 0;
  const hasRole = typeof item.role === "string" && item.role.length > 0;
  if (hasType || hasRole) {
    if (!hasType && hasRole) item.type = "message";
    return item;
  }

  if (typeof item.text === "string") {
    return { type: "message", role: "user", content: [{ type: "input_text", text: item.text }] };
  }

  if (item.content !== undefined) return { type: "message", role: "user", content: item.content };
  return item;
}

export function normalizeResponsesInputForChat(input: unknown): unknown[] {
  // == null matches both undefined and null (neither is a spec-valid input) → empty list.
  if (input == null) return [];
  if (Array.isArray(input)) return input.map(normalizeResponsesInputItemForChat);
  return [normalizeResponsesInputItemForChat(input)];
}
