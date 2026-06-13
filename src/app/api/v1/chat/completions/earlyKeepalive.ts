function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function acceptsEventStream(acceptHeader: string | null | undefined): boolean {
  return String(acceptHeader || "")
    .split(",")
    .some((entry) => {
      const [mediaType, ...params] = entry
        .split(";")
        .map((part) => part.trim().toLowerCase());
      if (mediaType !== "text/event-stream") return false;

      const qParam = params.find((param) => param.startsWith("q="));
      if (!qParam) return true;

      const q = Number(qParam.slice(2).trim());
      return Number.isFinite(q) && q > 0;
    });
}

export function shouldUseEarlyKeepaliveForChatCompletions(
  body: unknown,
  acceptHeader: string | null | undefined
): boolean {
  if (!isRecord(body)) return false;
  if (body.stream === true) return true;

  return acceptsEventStream(acceptHeader) && body.stream === undefined;
}

export function getChatCompletionsEarlyKeepaliveModel(body: unknown): string | undefined {
  if (!isRecord(body)) return undefined;
  return typeof body.model === "string" ? body.model : undefined;
}
