
import { DefaultExecutor } from "./default.ts";
type JsonRecord = Record<string, unknown>;
import {
  type ProviderCredentials,
} from "./base.ts";

import { applyProviderRequestDefaults } from "../services/providerRequestDefaults.ts";

function hasActiveKimiThinking(body: JsonRecord): boolean {
  const reasoningEffort = body.reasoning_effort;
  if (typeof reasoningEffort === "string") {
    const normalized = reasoningEffort.trim().toLowerCase();
    if (normalized && normalized !== "off" && normalized !== "none") return true;
  }

  const reasoning = body.reasoning;
  if (reasoning && typeof reasoning === "object" && !Array.isArray(reasoning)) {
    const reasoningRecord = reasoning as JsonRecord;
    const effort = reasoningRecord.effort;
    if (typeof effort === "string") {
      const normalized = effort.trim().toLowerCase();
      if (normalized && normalized !== "off" && normalized !== "none") return true;
    }
    if (reasoningRecord.enabled === true || reasoningRecord.type === "enabled") return true;
  }

  const thinking = body.thinking;
  if (thinking && typeof thinking === "object" && !Array.isArray(thinking)) {
    const thinkingRecord = thinking as JsonRecord;
    return thinkingRecord.type === "enabled" || thinkingRecord.type === "adaptive";
  }

  return false;
}

function ensureToolCallReasoningContent(body: JsonRecord): JsonRecord {
  if (!hasActiveKimiThinking(body) || !Array.isArray(body.messages)) return body;

  let changed = false;
  const messages = body.messages.map((message: unknown) => {
    if (!message || typeof message !== "object" || Array.isArray(message)) return message;

    const msg = message as JsonRecord;
    if (msg.role !== "assistant" || !Array.isArray(msg.tool_calls)) return message;
    if (Object.prototype.hasOwnProperty.call(msg, "reasoning_content")) return message;

    changed = true;
    return { ...msg, reasoning_content: "" };
  });

  return changed ? { ...body, messages } : body;
}

function hasTools(body: unknown): boolean {
  const record = asRecord(body);
  return Array.isArray(record?.tools) && record.tools.length > 0;
}


function asRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function applyKimiRequestDefaults(body: unknown, defaults?: JsonRecord | null): unknown {
  const withDefaults = applyProviderRequestDefaults(body, defaults);
  const record = asRecord(withDefaults);
  if (record && hasActiveKimiThinking(record) && hasTools(record)) {
    return ensureToolCallReasoningContent(record);
  }
  return withDefaults;
}

export class KimiExecutor extends DefaultExecutor {
  constructor(provider = "kimi-coding") {
    super(provider);
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ) {
    const cleanedBody = super.transformRequest(model, body, stream, credentials);
    return applyKimiRequestDefaults(cleanedBody);
  }
}

export default KimiExecutor;
