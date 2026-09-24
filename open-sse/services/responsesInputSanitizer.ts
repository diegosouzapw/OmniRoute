import { isValidResponsesItemId } from "./responsesItemId.ts";

type JsonRecord = Record<string, unknown>;
type SanitizeResponsesInputOptions = {
  dropInternalAssistantMessages?: boolean;
  // Codex's multi_agent_v2 uses a proprietary `agent_message` input-item type to pass
  // tasks/replies between a parent thread and a sub-agent. The real Codex/ChatGPT backend
  // understands this type; every other Responses-API upstream (e.g. Muse Spark 1.3 /
  // opencode-go) does not and rejects the request with `input[N] did not match any
  // supported type` (#13698). Set true only for the native Codex/ChatGPT passthrough path.
  preserveAgentMessages?: boolean;
};
const INTERNAL_ASSISTANT_PHASES = new Set(["commentary"]);
const SERVER_ITEM_ID_PREFIX_BY_TYPE: Record<string, string> = {
  function_call: "fc_",
  message: "msg_",
  reasoning: "rs_",
};
const SERVER_ITEM_ID_PATTERN = /^(fc|msg|rs|resp)_/;
// Validated per input item of type function_call / function_call_output (the agentic
// Responses path), so kept as a module constant instead of an inline literal.
const FUNCTION_NAME_VALID_RE = /^[a-zA-Z0-9_-]{1,128}$/;
const FUNCTION_NAME_SANITIZE_RE = /[^a-zA-Z0-9_-]/g;

function toRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function isResponsesMessageItem(record: JsonRecord): boolean {
  return record.type === "message" || (!record.type && typeof record.role === "string");
}

export function isInternalAssistantMessage(record: JsonRecord): boolean {
  if (!isResponsesMessageItem(record)) return false;
  if (record.role !== "assistant") return false;

  const phase = typeof record.phase === "string" ? record.phase.trim().toLowerCase() : "";
  if (!phase) return false;

  // Drop only known internal runtime frames. Visible assistant turns such as
  // `final` and `final_answer` must survive replay for Codex/OpenCode follow-ups.
  return INTERNAL_ASSISTANT_PHASES.has(phase);
}

// OpenAI Responses API enforces two constraints on name fields in input items:
//   1. Max 128 characters
//   2. Must match ^[a-zA-Z0-9_-]+$
// Sanitize after cloning so upstream never sees an invalid name.
function sanitizeFunctionName(name: string): string {
  // Replace any character not in [a-zA-Z0-9_-] with underscore, then truncate.
  return name.replace(FUNCTION_NAME_SANITIZE_RE, "_").slice(0, 128);
}

function sanitizeInputItemId(record: JsonRecord): JsonRecord {
  if (record.id === undefined) return record;
  if (!isValidResponsesItemId(record.id)) {
    const next = { ...record };
    delete next.id;
    return next;
  }

  const type = typeof record.type === "string" ? record.type : "";
  const expectedPrefix = SERVER_ITEM_ID_PREFIX_BY_TYPE[type];
  const hasExpectedPrefix = expectedPrefix
    ? record.id.startsWith(expectedPrefix)
    : SERVER_ITEM_ID_PATTERN.test(record.id);

  if (hasExpectedPrefix) return record;

  const next = { ...record };
  delete next.id;
  return next;
}

function imageUrlToText(value: unknown): string {
  if (typeof value === "string") return value;
  const record = toRecord(value);
  return typeof record?.url === "string" ? record.url : "";
}

function sanitizeContentPart(part: unknown, role: string): unknown {
  const record = toRecord(part);
  if (!record) return part;

  if (record.type === "image_url") {
    const url = imageUrlToText(record.image_url);
    // `output_text` is only a legal content-part type on assistant-role OUTPUT
    // items. Every other role (user, system, developer, ...) is input-side and
    // must use `input_image` -- otherwise the Codex/Responses backend rejects
    // the replayed history with "Invalid value: 'output_text'" (#8089).
    if (role !== "assistant") {
      const next: JsonRecord = { type: "input_image", image_url: url };
      const image = toRecord(record.image_url);
      if (image?.detail !== undefined) next.detail = image.detail;
      return next;
    }
    return { type: "output_text", text: url ? `[Image: ${url}]` : "[Image]" };
  }

  if (role === "assistant" && record.type === "input_image") {
    const url = imageUrlToText(record.image_url);
    return { type: "output_text", text: url ? `[Image: ${url}]` : "[Image]" };
  }

  return part;
}

function sanitizeMessageContent(record: JsonRecord): JsonRecord {
  if (!Array.isArray(record.content)) return record;

  const role = typeof record.role === "string" ? record.role.toLowerCase() : "";
  const content = record.content.map((part) => sanitizeContentPart(part, role));
  return { ...record, content };
}

function sanitizeNestedOutputPart(part: unknown): unknown {
  const record = toRecord(part);
  if (!record) return part;

  // `output` on replayed items is an input-side container. Its content uses
  // input content-part types even when the enclosing item originated from an
  // assistant/tool response. Converting an image placeholder to output_text
  // here makes Codex reject the request with the inverse 400.
  if (record.type === "output_text" || record.type === "refusal") {
    const next: JsonRecord = { ...record, type: "input_text" };
    if (typeof next.text !== "string") {
      next.text = typeof record.refusal === "string" ? record.refusal : "";
    }
    delete next.annotations;
    delete next.logprobs;
    delete next.obfuscation;
    delete next.refusal;
    return next;
  }

  return sanitizeContentPart(part, "user");
}

function sanitizeOutputContent(record: JsonRecord): JsonRecord {
  if (!Array.isArray(record.output)) return record;

  // Some clients replay previous Responses output items inside the next
  // Responses input. In that shape OpenAI validates `input[n].output[m].type`
  // against output content part types, so legacy Chat-style `image_url` parts
  // must be normalized here too, not only in message.content.
  const output = record.output.map(sanitizeNestedOutputPart);
  return { ...record, output };
}

function isAgentMessageInputItem(record: JsonRecord): boolean {
  return record.type === "agent_message" || record.role === "agent_message";
}

function agentMessageContextText(record: JsonRecord): string {
  return `[Agent message context] ${JSON.stringify({ author: record.author, recipient: record.recipient })}`;
}

function agentMessageContentPart(part: unknown): unknown {
  const record = toRecord(part);
  if (!record) return { type: "input_text", text: typeof part === "string" ? part : "" };

  if (record.type === "encrypted_content") {
    // No plaintext to forward for an encrypted part -- surface a placeholder instead of
    // leaking an opaque payload or silently dropping the item.
    return { type: "input_text", text: "[Agent message encrypted content omitted]" };
  }

  if (record.type === "output_text" || record.type === "text") {
    return { type: "input_text", text: typeof record.text === "string" ? record.text : "" };
  }

  if (record.type === "image_url" || record.type === "input_image") {
    return sanitizeContentPart(record, "user");
  }

  return record;
}

function convertAgentMessageItem(record: JsonRecord): JsonRecord {
  const contextPart = { type: "input_text", text: agentMessageContextText(record) };
  const content = record.content;

  let bodyParts: unknown[];
  if (typeof content === "string") {
    bodyParts = [{ type: "input_text", text: content }];
  } else if (Array.isArray(content)) {
    bodyParts = content.map((part) =>
      typeof part === "string" ? { type: "input_text", text: part } : agentMessageContentPart(part)
    );
  } else {
    bodyParts = [{ type: "input_text", text: JSON.stringify(content ?? "") }];
  }

  return {
    type: "message",
    role: "user",
    content: [contextPart, ...bodyParts],
  };
}

function sanitizeInputItem(item: unknown, options: SanitizeResponsesInputOptions): unknown {
  const record = toRecord(item);
  if (!record) return item;

  let next = record;
  if (!options.preserveAgentMessages && isAgentMessageInputItem(next)) {
    next = convertAgentMessageItem(next);
  }

  next = sanitizeInputItemId(next);
  if (isResponsesMessageItem(next)) {
    next = sanitizeMessageContent(next);
  }
  next = sanitizeOutputContent(next);
  if (
    (next.type === "function_call" || next.type === "function_call_output") &&
    typeof next.name === "string" &&
    !FUNCTION_NAME_VALID_RE.test(next.name)
  ) {
    next = { ...next, name: sanitizeFunctionName(next.name) };
  }
  return next;
}

export function sanitizeResponsesInputItems(
  items: readonly unknown[],
  clone = true,
  options: SanitizeResponsesInputOptions = {}
): unknown[] {
  const dropInternalAssistantMessages = options.dropInternalAssistantMessages ?? true;
  const sanitized: unknown[] = [];

  for (const item of items) {
    const record = toRecord(item);
    if (dropInternalAssistantMessages && record && isInternalAssistantMessage(record)) {
      continue;
    }

    const cloned = clone ? structuredClone(item) : item;
    sanitized.push(sanitizeInputItem(cloned, options));
  }

  return sanitized;
}

// Codex-specific call site (#13698): the native Codex/ChatGPT passthrough path is the only
// caller that needs both flags derived from one boolean, kept here (not in the frozen
// open-sse/executors/codex.ts) so a per-property change never grows that file's line count.
export function sanitizeCodexResponsesInput(
  body: Record<string, unknown>,
  nativeCodexPassthrough: boolean
): void {
  if (!Array.isArray(body.input)) return;
  body.input = sanitizeResponsesInputItems(body.input, false, {
    dropInternalAssistantMessages: !nativeCodexPassthrough,
    preserveAgentMessages: nativeCodexPassthrough,
  });
}
