/**
 * Best-effort finish_reason extraction from a (possibly translated) response
 * body for routing-event telemetry. Returns null when the shape is unknown.
 */
export function routingFinishReason(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  const choices = record.choices;
  if (Array.isArray(choices)) {
    const first = choices[0];
    if (first && typeof first === "object") {
      const fr = (first as Record<string, unknown>).finish_reason;
      if (typeof fr === "string") return fr;
    }
  }
  const output = record.output;
  if (Array.isArray(output)) {
    for (const item of output) {
      if (item && typeof item === "object") {
        const fr = (item as Record<string, unknown>).finish_reason;
        if (typeof fr === "string") return fr;
      }
    }
  }
  return null;
}
