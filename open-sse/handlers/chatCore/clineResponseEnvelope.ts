type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function hasOpenAIChoices(value: unknown): boolean {
  return isRecord(value) && Array.isArray(value.choices);
}

export function unwrapClineNonStreamingEnvelope(provider: string, responseBody: unknown): unknown {
  if (provider !== "cline" || !isRecord(responseBody)) {
    return responseBody;
  }

  const data = responseBody.data;
  if (!hasOpenAIChoices(data)) {
    return responseBody;
  }

  return {
    ...data,
    usage: isRecord(data) && data.usage !== undefined ? data.usage : responseBody.usage,
  };
}
