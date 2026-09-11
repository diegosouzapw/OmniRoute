type JsonRecord = Record<string, unknown>;

export type ResponsesFailureOutputStringField = "id" | "text" | "refusal";

export type ResponsesFailureOutputStringProjector = (
  field: ResponsesFailureOutputStringField,
  value: string
) => string;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

/**
 * Retain only public assistant text/refusal output from a failed Responses payload.
 * Failure envelopes may contain reasoning, tool arguments, annotations, commentary,
 * or provider diagnostics, so every retained field is reconstructed explicitly.
 */
export function projectResponsesFailureOutput(
  value: unknown,
  projectString: ResponsesFailureOutputStringProjector
): JsonRecord[] {
  if (!Array.isArray(value)) return [];

  const output: JsonRecord[] = [];
  for (const item of value) {
    const record = asRecord(item);
    if (record.type !== "message" || record.role !== "assistant" || record.phase === "commentary") {
      continue;
    }

    const content: JsonRecord[] = [];
    if (Array.isArray(record.content)) {
      for (const part of record.content) {
        const contentPart = asRecord(part);
        if (contentPart.phase === "commentary") continue;
        if (contentPart.type === "output_text" && typeof contentPart.text === "string") {
          content.push({
            type: "output_text",
            text: projectString("text", contentPart.text),
            // Preserve the required Responses schema without forwarding any
            // untrusted citation/file metadata supplied by the provider.
            annotations: [],
          });
        } else if (contentPart.type === "refusal" && typeof contentPart.refusal === "string") {
          content.push({
            type: "refusal",
            refusal: projectString("refusal", contentPart.refusal),
          });
        }
      }
    }

    const projected: JsonRecord = {
      type: "message",
      role: "assistant",
      content,
    };
    if (typeof record.id === "string") projected.id = projectString("id", record.id);
    if (
      record.status === "in_progress" ||
      record.status === "completed" ||
      record.status === "incomplete"
    ) {
      projected.status = record.status;
    }
    output.push(projected);
  }
  return output;
}
