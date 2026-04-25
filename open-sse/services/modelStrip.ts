import { PROVIDER_ID_TO_ALIAS, getModelStripTypes } from "../config/providerModels.ts";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function shouldStripPart(part: JsonRecord, stripTypes: Set<string>): boolean {
  const type = typeof part.type === "string" ? part.type : "";
  if (!type) return false;

  if (stripTypes.has(type)) return true;
  if (stripTypes.has("image") && (type === "image_url" || type === "image")) return true;
  if (stripTypes.has("audio") && (type === "input_audio" || type === "audio")) return true;
  return false;
}

export function stripIncompatibleMessageContent(
  messages: unknown,
  stripTypes: readonly string[]
): { messages: unknown; removedParts: number } {
  if (!Array.isArray(messages) || stripTypes.length === 0) {
    return { messages, removedParts: 0 };
  }

  const stripSet = new Set(stripTypes);
  let removedParts = 0;

  const sanitizedMessages = messages.map((message) => {
    const record = asRecord(message);
    if (!Array.isArray(record.content)) {
      return message;
    }

    const filteredContent = record.content.filter((part) => {
      const shouldStrip = shouldStripPart(asRecord(part), stripSet);
      if (shouldStrip) {
        removedParts += 1;
      }
      return !shouldStrip;
    });

    if (filteredContent.length > 0) {
      return { ...record, content: filteredContent };
    }

    return {
      ...record,
      content: [{ type: "text", text: "[unsupported image/audio content removed]" }],
    };
  });

  return { messages: sanitizedMessages, removedParts };
}

export function getStripTypesForProviderModel(providerId: string, modelId: string): string[] {
  const alias = PROVIDER_ID_TO_ALIAS[providerId] || providerId;
  return getModelStripTypes(alias, modelId);
}
