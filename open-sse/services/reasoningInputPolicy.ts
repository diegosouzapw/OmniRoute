import { REGISTRY } from "../config/providerRegistry.ts";
import type { ReasoningTransport } from "../config/providerRegistry.ts";
import { isValidResponsesItemId } from "./responsesItemId.ts";

type JsonRecord = Record<string, unknown>;

const REASONING_TRANSPORTS = new Map<string, ReasoningTransport>();
for (const [id, entry] of Object.entries(REGISTRY)) {
  if (!entry.reasoningTransport) continue;
  REASONING_TRANSPORTS.set(id.toLowerCase(), entry.reasoningTransport);
  if (entry.alias) {
    REASONING_TRANSPORTS.set(entry.alias.toLowerCase(), entry.reasoningTransport);
  }
}

const CHAT_PLAINTEXT_REASONING_FIELDS = [
  "reasoning_content",
  "reasoning",
  "reasoning_text",
  "thinking",
  "thought",
] as const;

export type ReasoningInputFormat = "chat" | "responses";

export interface ReasoningStateInspection {
  hasPlaintext: boolean;
  hasOpaque: boolean;
}

export interface ReasoningInputPolicyOptions {
  provider?: string | null;
  preserveEncryptedReasoning?: boolean;
  onIncompatibleReasoning?: "reject" | "drop";
}

export interface ReasoningInputPolicyResult {
  incompatibleReasoning: boolean;
}
export function resolveReasoningTransport(
  provider: string | null | undefined,
  preserveEncryptedReasoning = false
): ReasoningTransport {
  const normalized = typeof provider === "string" ? provider.trim().toLowerCase() : "";
  const transport = REASONING_TRANSPORTS.get(normalized);
  if (transport) return transport;
  // #12128: Generic Responses-protocol endpoints (e.g. openai-compatible-responses-*,
  // custom-openai-responses, proxy backends) implement the OpenAI/Codex Responses API
  // where reasoning input items cannot accept plaintext content (maxItems: 0).
  if (
    normalized.startsWith("openai-compatible-responses") ||
    normalized.startsWith("custom-openai-responses") ||
    normalized.includes("codex") ||
    normalized.includes("responses")
  ) {
    return "opaque";
  }
  return preserveEncryptedReasoning ? "opaque" : "plaintext";
}

function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function isNonEmptyString(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function isSummaryDetail(record: JsonRecord): boolean {
  const type = typeof record.type === "string" ? record.type.toLowerCase() : "";
  return (
    type.includes("summary") || record.summary !== undefined || record.summary_text !== undefined
  );
}

function hasPlaintextReasoning(record: JsonRecord): boolean {
  return (
    Array.isArray(record.content) &&
    record.content.some((part) => {
      const value = asRecord(part);
      return value?.type === "reasoning_text" && isNonEmptyString(value.text);
    })
  );
}

function hasChatPlaintextReasoning(record: JsonRecord): boolean {
  if (CHAT_PLAINTEXT_REASONING_FIELDS.some((field) => isNonEmptyString(record[field]))) {
    return true;
  }
  if (!Array.isArray(record.reasoning_details)) return false;
  return record.reasoning_details.some((detail) => {
    const value = asRecord(detail);
    return Boolean(
      value &&
      !isSummaryDetail(value) &&
      (isNonEmptyString(value.text) || isNonEmptyString(value.content))
    );
  });
}

/**
 * Returns only provider-authentic plaintext continuation state. Display summaries
 * and opaque-only records are excluded. Explicit plaintext remains independently
 * portable when the same record also carries an opaque companion (#10949).
 */
export function extractReplayableResponsesReasoningText(value: unknown): string {
  const record = asRecord(value);
  if (!record || record.type !== "reasoning") return "";
  if (!Array.isArray(record.content)) return "";

  return record.content
    .map((part) => {
      const content = asRecord(part);
      return content?.type === "reasoning_text" && typeof content.text === "string"
        ? content.text
        : "";
    })
    .filter((text) => text.trim().length > 0)
    .join("\n\n");
}

export function hasOpaqueReasoningState(record: JsonRecord): boolean {
  return (
    isNonEmptyString(record.encrypted_content) ||
    record.signature !== undefined ||
    record.format !== undefined
  );
}

function hasOpaqueReasoningDetail(value: unknown): boolean {
  const record = asRecord(value);
  if (!record) return false;
  const type = typeof record.type === "string" ? record.type.toLowerCase() : "";
  return (
    hasOpaqueReasoningState(record) ||
    ((type.includes("encrypted") || type.includes("opaque")) && isNonEmptyString(record.data))
  );
}

function hasChatOpaqueReasoning(record: JsonRecord): boolean {
  return (
    hasOpaqueReasoningState(record) ||
    (Array.isArray(record.reasoning_details) &&
      record.reasoning_details.some(hasOpaqueReasoningDetail))
  );
}

export function inspectChatReasoning(messages: unknown): ReasoningStateInspection {
  const inspection: ReasoningStateInspection = { hasPlaintext: false, hasOpaque: false };
  if (!Array.isArray(messages)) return inspection;

  for (const message of messages) {
    const record = asRecord(message);
    if (!record || record.role !== "assistant") continue;
    inspection.hasPlaintext ||= hasChatPlaintextReasoning(record);
    inspection.hasOpaque ||= hasChatOpaqueReasoning(record);
    if (inspection.hasPlaintext && inspection.hasOpaque) break;
  }
  return inspection;
}

export function inspectResponsesReasoning(input: unknown): ReasoningStateInspection {
  const inspection: ReasoningStateInspection = { hasPlaintext: false, hasOpaque: false };
  if (!Array.isArray(input)) return inspection;

  for (const item of input) {
    const record = asRecord(item);
    if (!record || record.type !== "reasoning") continue;
    inspection.hasPlaintext ||= hasPlaintextReasoning(record);
    inspection.hasOpaque ||= hasOpaqueReasoningState(record);
    if (inspection.hasPlaintext && inspection.hasOpaque) break;
  }
  return inspection;
}

function isReasoningCompatible(
  inspection: ReasoningStateInspection,
  transport: ReasoningTransport
): boolean {
  if (!inspection.hasPlaintext && !inspection.hasOpaque) return true;
  if (transport === "plaintext") return !inspection.hasOpaque;
  if (transport === "opaque") return !inspection.hasPlaintext;
  return false;
}

function stripOpaqueFields(record: JsonRecord): void {
  delete record.encrypted_content;
  delete record.signature;
  delete record.format;
  delete record.data;
}

function stripChatReasoningDetails(details: unknown[], transport: ReasoningTransport): unknown[] {
  return details.flatMap((detail) => {
    const record = asRecord(detail);
    if (!record) return [detail];

    const plaintext =
      !isSummaryDetail(record) &&
      (isNonEmptyString(record.text) || isNonEmptyString(record.content));
    const opaque = hasOpaqueReasoningDetail(record);
    if ((!plaintext || transport === "plaintext") && (!opaque || transport === "opaque")) {
      return [detail];
    }

    const next = { ...record };
    if (plaintext && transport !== "plaintext") {
      delete next.text;
      delete next.content;
    }
    if (opaque && transport !== "opaque") stripOpaqueFields(next);
    const remainingKeys = Object.keys(next).filter((key) => key !== "type");
    return remainingKeys.length > 0 ? [next] : [];
  });
}

function dropIncompatibleChatReasoning(
  messages: unknown[],
  transport: ReasoningTransport
): unknown[] {
  return messages.map((message) => {
    const record = asRecord(message);
    if (!record || record.role !== "assistant") return message;
    const next = { ...record };
    if (transport !== "plaintext") {
      for (const field of CHAT_PLAINTEXT_REASONING_FIELDS) delete next[field];
    }
    if (transport !== "opaque") stripOpaqueFields(next);
    if (Array.isArray(record.reasoning_details)) {
      const details = stripChatReasoningDetails(record.reasoning_details, transport);
      if (details.length > 0) next.reasoning_details = details;
      else delete next.reasoning_details;
    }
    return next;
  });
}

function hasDisplaySummary(record: JsonRecord): boolean {
  return record.summary !== undefined || record.summary_text !== undefined;
}

function dropIncompatibleResponsesReasoning(
  record: JsonRecord,
  transport: ReasoningTransport
): JsonRecord | null {
  const next = { ...record };
  if (transport !== "plaintext" && Array.isArray(record.content)) {
    const content = record.content.filter((part) => asRecord(part)?.type !== "reasoning_text");
    if (content.length > 0) next.content = content;
    else delete next.content;
  }
  if (transport !== "opaque") stripOpaqueFields(next);
  const stillActive = hasPlaintextReasoning(next) || hasOpaqueReasoningState(next);
  return stillActive || hasDisplaySummary(next) ? next : null;
}

function sanitizeResponsesInput(
  input: unknown[],
  transport: ReasoningTransport,
  dropIncompatible: boolean,
  stripOrphanedSummaries: boolean
): unknown[] {
  const filtered: unknown[] = [];
  for (const item of input) {
    if (typeof item === "string") continue;
    const record = asRecord(item);
    if (!record) {
      filtered.push(item);
      continue;
    }
    if (record.type === "item_reference") continue;

    if (record.type === "reasoning") {
      const next = dropIncompatible
        ? dropIncompatibleResponsesReasoning(record, transport)
        : { ...record };
      if (!next) continue;
      const hasPlaintext = hasPlaintextReasoning(next);
      const hasOpaque = hasOpaqueReasoningState(next);
      if (!hasPlaintext && !hasOpaque && (!hasDisplaySummary(next) || stripOrphanedSummaries)) {
        continue;
      }
      // `id` is only worth keeping on an opaque item with a valid string value —
      // non-opaque items don't replay their id, and a malformed value (e.g. `null`,
      // observed on opencode/zen) must not survive either way (#11108).
      if (!hasOpaque || !isValidResponsesItemId(next.id)) delete next.id;
      // Some upstreams (e.g. opencode/zen) omit `summary` entirely on opaque
      // reasoning items instead of sending an empty array. Replaying that shape
      // verbatim trips strict Responses-API validators that require the field
      // to be present on every `input[]` item of type `reasoning` (#11108).
      // Plaintext-only items intentionally have no `summary` key and must stay
      // untouched.
      if (hasOpaque && next.summary === undefined) next.summary = [];
      filtered.push(next);
      continue;
    }

    const cloned = { ...record };
    // Strip `id` whenever present, valid or not: these items don't need a
    // replayed server id, and a malformed one (e.g. `null`, same opencode/zen
    // omission pattern as the reasoning branch above) must not survive either
    // (#11108).
    if (cloned.id !== undefined) delete cloned.id;
    filtered.push(cloned);
  }
  return filtered;
}

/**
 * Projects reasoning continuation onto the selected target transport.
 * Incompatible active state is dropped by default; combo routing may reject an
 * attempt instead so it can fall through without mutating the request.
 */
export function applyReasoningInputPolicy(
  body: Record<string, unknown>,
  inputFormat: ReasoningInputFormat,
  options: ReasoningInputPolicyOptions = {}
): ReasoningInputPolicyResult {
  const transport = resolveReasoningTransport(options.provider, options.preserveEncryptedReasoning);
  const inspection =
    inputFormat === "responses"
      ? inspectResponsesReasoning(body.input)
      : inspectChatReasoning(body.messages);
  const mixedState = inspection.hasPlaintext && inspection.hasOpaque;
  const incompatibleReasoning = !mixedState && !isReasoningCompatible(inspection, transport);
  // Mixed plaintext + opaque input (#10949) is never a rejection: it is projected
  // onto the target transport by the per-item sanitizers below.

  if (incompatibleReasoning && options.onIncompatibleReasoning === "reject") {
    return { incompatibleReasoning: true };
  }

  if (inputFormat === "chat") {
    if ((incompatibleReasoning || mixedState) && Array.isArray(body.messages)) {
      body.messages = dropIncompatibleChatReasoning(body.messages, transport);
    }
    return { incompatibleReasoning: false };
  }

  if (Array.isArray(body.input) && body.input.length === 0) {
    body.input = [
      {
        type: "message",
        role: "user",
        content: [{ type: "input_text", text: "continue" }],
      },
    ];
  }
  if (Array.isArray(body.input)) {
    body.input = sanitizeResponsesInput(
      body.input,
      transport,
      incompatibleReasoning || mixedState,
      body.store === false
    );
  }
  return { incompatibleReasoning: false };
}

export function createReasoningTransportIncompatibleError(): Error & {
  statusCode: number;
  errorType: string;
} {
  const error = new Error(
    "Reasoning continuation is not compatible with the selected target"
  ) as Error & { statusCode: number; errorType: string };
  error.statusCode = 400;
  error.errorType = "reasoning_transport_incompatible";
  return error;
}

export const REASONING_FALLBACK_HEADER = "x-omniroute-reasoning-fallback";

function readFallbackHeader(
  headers: Headers | Record<string, unknown> | null | undefined
): string | null {
  if (!headers) return null;
  if (headers instanceof Headers) {
    const value = headers.get(REASONING_FALLBACK_HEADER);
    return typeof value === "string" ? value : null;
  }
  if (typeof headers !== "object") return null;
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === REASONING_FALLBACK_HEADER && typeof value === "string") {
      return value;
    }
  }
  return null;
}

/**
 * Resolves the action taken when inbound continuation reasoning is incompatible with the selected
 * target's reasoning transport. Combo steps keep their explicit configuration. Single-target
 * requests default to "drop" so replayed summary-only reasoning from agentic clients does not
 * hard-fail every continuation turn; an operator (OMNIROUTE_SINGLE_TARGET_REASONING_FALLBACK=reject)
 * or caller (x-omniroute-reasoning-fallback: reject) may explicitly enforce "reject".
 */
export function resolveIncompatibleReasoningAction(options: {
  reasoningTransportFallback?: string | null;
  isComboStep?: boolean;
  headers?: Headers | Record<string, unknown> | null;
  env?: Record<string, string | undefined>;
}): "drop" | "reject" {
  if (options.reasoningTransportFallback === "drop") return "drop";
  if (options.isComboStep && options.reasoningTransportFallback === "skip") return "reject";

  const headerRaw = readFallbackHeader(options.headers)?.trim().toLowerCase();
  if (headerRaw === "reject") return "reject";
  if (headerRaw === "drop") return "drop";

  const envRaw = (
    options.env ?? process.env
  ).OMNIROUTE_SINGLE_TARGET_REASONING_FALLBACK?.trim().toLowerCase();
  if (envRaw === "reject") return "reject";
  if (envRaw === "drop") return "drop";

  // Default to "drop" for single-target requests so multi-turn agentic loops on direct
  // Codex / OpenAI targets work seamlessly out of the box.
  return "drop";
}
