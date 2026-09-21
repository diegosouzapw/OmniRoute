type JsonRecord = Record<string, unknown>;

function isAgentMessageItem(item: JsonRecord): boolean {
  return item.type === "agent_message" || item.role === "agent_message";
}

function collectAgentMessageText(item: JsonRecord): string | null {
  if (typeof item.content === "string") return item.content;
  if (typeof item.text === "string") return item.text;
  if (!Array.isArray(item.content)) return null;

  const textParts: string[] = [];
  for (const partValue of item.content) {
    if (typeof partValue === "string") {
      textParts.push(partValue);
      continue;
    }
    if (!partValue || typeof partValue !== "object" || Array.isArray(partValue)) {
      return null;
    }

    const part = partValue as JsonRecord;
    if (part.type === "encrypted_content") {
      // Chat Completions has no encrypted agent-message equivalent. Do not leak a
      // partial plaintext envelope or forward an opaque payload the model cannot use.
      return null;
    }
    if (part.type !== "input_text" && part.type !== "output_text" && part.type !== "text") {
      return null;
    }
    if (typeof part.text !== "string") return null;
    textParts.push(part.text);
  }

  return textParts.join("\n");
}

function normalizeAgentMessageForChat(item: JsonRecord): JsonRecord | null {
  if (!isAgentMessageItem(item)) return null;

  const text = collectAgentMessageText(item);
  if (typeof text !== "string" || !text.trim()) return null;

  return {
    type: "message",
    role: "assistant",
    content: [{ type: "input_text", text }],
  };
}

function textPartTypeForRole(role: string): "input_text" | "output_text" {
  return role === "assistant" ? "output_text" : "input_text";
}

function normalizeCodexMessageContentPart(part: unknown, role: string): unknown {
  if (typeof part === "string") return { type: textPartTypeForRole(role), text: part };
  if (!part || typeof part !== "object" || Array.isArray(part)) return part;

  const record = { ...(part as JsonRecord) };
  if (record.type === "text") record.type = textPartTypeForRole(role);
  // Assistant history in the Responses API must use `output_text` (or `refusal`),
  // never `input_text` (which is user-only). codex-cli sends assistant turns as
  // `input_text`; normalize them so the Codex/OpenAI backend accepts the replay.
  if (role === "assistant" && (record.type === "input_text" || record.type === "text")) {
    record.type = "output_text";
    delete record.annotations;
    delete record.logprobs;
    delete record.obfuscation;
  }
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

  if (type === "additional_tools") {
    delete item.content;
    return item;
  }

  if (!type && item.content === undefined && typeof item.text === "string") {
    return {
      type: "message",
      role,
      content: [{ type: textPartTypeForRole(role), text: item.text }],
    };
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

  const agentMessage = normalizeAgentMessageForChat(item);
  if (agentMessage) return agentMessage;
  if (isAgentMessageItem(item)) {
    // Encrypted or malformed agent messages have no lossless Chat equivalent.
    // Treat them like other Responses-only metadata instead of failing the whole turn.
    return { type: "reasoning" };
  }

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
