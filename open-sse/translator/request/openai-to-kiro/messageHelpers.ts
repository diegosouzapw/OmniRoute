// Pure message/tool helpers for the OpenAI -> Kiro request translator.
// Extracted verbatim from openai-to-kiro.ts (no host imports).

export function parseToolInput(value: unknown) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value;
  }
  if (typeof value !== "string") {
    return {};
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return {};
  }

  try {
    const parsed = JSON.parse(trimmed);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * Recursively sanitize JSON Schema for Kiro API.
 * Kiro returns 400 "Improperly formed request" if:
 * - `required` is an empty array []
 * - `additionalProperties` is present anywhere
 */
export function normalizeKiroToolSchema(schema: unknown): Record<string, unknown> {
  if (!schema || typeof schema !== "object" || Array.isArray(schema)) {
    return { type: "object", properties: {} };
  }

  const result: Record<string, unknown> = {};
  const src = schema as Record<string, unknown>;

  for (const [key, value] of Object.entries(src)) {
    // Skip empty required arrays — Kiro rejects them
    if (key === "required" && Array.isArray(value) && value.length === 0) {
      continue;
    }
    // Skip additionalProperties — Kiro doesn't support it
    if (key === "additionalProperties") {
      continue;
    }
    // Recursively process nested objects
    if (
      key === "properties" &&
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value)
    ) {
      const sanitizedProps: Record<string, unknown> = {};
      for (const [propName, propValue] of Object.entries(value as Record<string, unknown>)) {
        sanitizedProps[propName] = normalizeKiroToolSchema(propValue);
      }
      result[key] = sanitizedProps;
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      result[key] = normalizeKiroToolSchema(value);
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === "object" && item !== null && !Array.isArray(item)
          ? normalizeKiroToolSchema(item)
          : item
      );
    } else {
      result[key] = value;
    }
  }

  return result;
}

export function serializeToolResultContent(content: unknown): string {
  if (typeof content === "string") {
    return content || "(no output)";
  }
  if (!Array.isArray(content)) {
    if (content !== null && content !== undefined) {
      try {
        return JSON.stringify(content);
      } catch {
        return "(no output)";
      }
    }
    return "(no output)";
  }
  const parts: string[] = [];
  for (const block of content as Array<Record<string, unknown>>) {
    if (!block || typeof block !== "object") continue;
    if (block.type === "text" && typeof block.text === "string") {
      if (block.text) parts.push(block.text);
    } else if (block.type === "image" || block.type === "image_url") {
      const src = block.source as Record<string, unknown> | undefined;
      const mediaType = src?.media_type ?? block.media_type ?? "image";
      parts.push(`[image: ${mediaType}]`);
    } else {
      try {
        const str = JSON.stringify(block);
        if (str && str !== "{}") parts.push(str);
      } catch {
        // skip unserializable block
      }
    }
  }
  return parts.join("\n") || "(no output)";
}
