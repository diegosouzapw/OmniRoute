import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";

export type PlaygroundMessageRole = "user" | "assistant";

export interface PlaygroundMessageLike {
  role: PlaygroundMessageRole;
  content: string;
}

export interface ResponsesInputMessage {
  type: "message";
  role: PlaygroundMessageRole;
  content: Array<{
    type: "input_text" | "output_text";
    text: string;
  }>;
}

export interface CodexResponseMetadata {
  usage: Record<string, unknown>;
  requestedModel: string;
  resolvedModel: string;
  reasoningEffort: string | null;
  responseId: string | null;
  latencyMs: number;
  tokensIn: number;
  tokensOut: number;
  raw: Record<string, unknown>;
}

export const CODEX_PLAYGROUND_REASONING_EFFORT = "high";

function toRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function toNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function readHeader(headers: Headers | null | undefined, name: string): string | null {
  try {
    return headers?.get(name) ?? null;
  } catch {
    return null;
  }
}

export function isCodexPlaygroundProvider(providerId: string | null | undefined): boolean {
  return (providerId ?? "").trim().toLowerCase() === "codex";
}

export function normalizeCodexResponsesModel(model: string | null | undefined): string {
  return (model ?? "").trim().replace(/^(codex|cx)\//i, "");
}

export function buildResponsesInputMessages(
  messages: PlaygroundMessageLike[]
): ResponsesInputMessage[] {
  return messages
    .filter((message) => message.content.trim().length > 0)
    .map((message) => ({
      type: "message",
      role: message.role,
      content: [
        {
          type: message.role === "assistant" ? "output_text" : "input_text",
          text: message.content,
        },
      ],
    }));
}

export function extractResponsesOutputText(payload: unknown): string {
  const root = toRecord(payload);
  if (!root) return "";

  if (typeof root.output_text === "string") {
    return root.output_text;
  }

  const output = Array.isArray(root.output) ? root.output : [];
  const chunks: string[] = [];

  for (const item of output) {
    const itemRecord = toRecord(item);
    if (!itemRecord) continue;

    if (typeof itemRecord.text === "string") {
      chunks.push(itemRecord.text);
    }

    const content = Array.isArray(itemRecord.content) ? itemRecord.content : [];
    for (const part of content) {
      const partRecord = toRecord(part);
      if (!partRecord) continue;

      const text = partRecord.text;
      if (
        typeof text === "string" &&
        (partRecord.type === "output_text" || partRecord.type === "text" || !partRecord.type)
      ) {
        chunks.push(text);
      }
    }
  }

  return chunks.join("\n").trim();
}

export function formatCodexUsageValue(value: unknown): string {
  if (value == null) return "null";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function buildCodexResponseMetadata({
  payload,
  headers,
  requestedModel,
  reasoningEffort,
  fallbackLatencyMs,
}: {
  payload: unknown;
  headers?: Headers | null;
  requestedModel: string;
  reasoningEffort?: string | null;
  fallbackLatencyMs: number;
}): CodexResponseMetadata {
  const root = toRecord(payload) ?? {};
  const rawUsage = toRecord(root.usage);
  const usage: Record<string, unknown> = rawUsage ? { ...rawUsage } : {};

  const responseCost = readHeader(headers, OMNIROUTE_RESPONSE_HEADERS.responseCost);
  if (responseCost != null && !("cost_usd" in usage)) {
    const numericCost = toNumber(responseCost);
    usage.cost_usd = numericCost > 0 ? numericCost : responseCost;
  }

  const latencyHeader = readHeader(headers, OMNIROUTE_RESPONSE_HEADERS.latencyMs);
  const latencyMs = toNumber(latencyHeader) || fallbackLatencyMs;

  const headerModel = readHeader(headers, OMNIROUTE_RESPONSE_HEADERS.model);
  const resolvedModel = normalizeCodexResponsesModel(
    typeof root.model === "string" && root.model.trim() ? root.model : headerModel
  );

  const reasoning = toRecord(root.reasoning);
  const responseId = typeof root.id === "string" && root.id.trim() ? root.id : null;
  const inputTokens =
    toNumber(usage.input_tokens) ||
    toNumber(usage.prompt_tokens) ||
    toNumber(readHeader(headers, OMNIROUTE_RESPONSE_HEADERS.tokensIn));
  const outputTokens =
    toNumber(usage.output_tokens) ||
    toNumber(usage.completion_tokens) ||
    toNumber(readHeader(headers, OMNIROUTE_RESPONSE_HEADERS.tokensOut));

  return {
    usage,
    requestedModel: normalizeCodexResponsesModel(requestedModel),
    resolvedModel,
    reasoningEffort:
      (typeof reasoning?.effort === "string" && reasoning.effort.trim()) ||
      (reasoningEffort ? reasoningEffort : null),
    responseId,
    latencyMs,
    tokensIn: Math.max(0, Math.round(inputTokens)),
    tokensOut: Math.max(0, Math.round(outputTokens)),
    raw: root,
  };
}
