type JsonRecord = Record<string, unknown>;

export function asReasoningRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function nonEmptyString(value: unknown): string {
  return typeof value === "string" && value.length > 0 ? value : "";
}

export function extractReasoningDetailsText(value: unknown): string {
  const record = asReasoningRecord(value);
  if (!Array.isArray(record.reasoning_details)) return "";
  return record.reasoning_details
    .map((detail) => {
      const item = asReasoningRecord(detail);
      return nonEmptyString(item.text) || nonEmptyString(item.content);
    })
    .join("");
}

export function getReadableReasoningValue(value: unknown): string {
  const record = asReasoningRecord(value);
  return nonEmptyString(record.reasoning_content) || nonEmptyString(record.reasoning);
}

export function getUnsupportedReasoningValue(value: unknown): string {
  const record = asReasoningRecord(value);
  return (
    nonEmptyString(record.reasoning_text) ||
    nonEmptyString(record.thinking) ||
    nonEmptyString(record.thought) ||
    extractReasoningDetailsText(record)
  );
}

export function getAnyReasoningValue(value: unknown): string {
  return getReadableReasoningValue(value) || getUnsupportedReasoningValue(value);
}

export function hasUnsupportedReasoningSignal(value: unknown): boolean {
  const record = asReasoningRecord(value);
  return Boolean(
    !getReadableReasoningValue(record) &&
    (nonEmptyString(record.reasoning_text) ||
      nonEmptyString(record.thinking) ||
      nonEmptyString(record.thought) ||
      (Array.isArray(record.reasoning_details) && record.reasoning_details.length > 0))
  );
}

export function hasAnyReasoningSignal(value: unknown): boolean {
  const record = asReasoningRecord(value);
  return Boolean(
    getReadableReasoningValue(record) ||
    nonEmptyString(record.reasoning_text) ||
    nonEmptyString(record.thinking) ||
    nonEmptyString(record.thought) ||
    (Array.isArray(record.reasoning_details) && record.reasoning_details.length > 0)
  );
}

export function copyOpenAICompatibleReasoningFields(source: JsonRecord, target: JsonRecord) {
  if (source.reasoning_content !== undefined) target.reasoning_content = source.reasoning_content;
  if (source.reasoning !== undefined) target.reasoning = source.reasoning;
  if (source.reasoning_text !== undefined) target.reasoning_text = source.reasoning_text;
  if (Array.isArray(source.reasoning_details)) target.reasoning_details = source.reasoning_details;
  if (!getReadableReasoningValue(target)) {
    const mirrored = getUnsupportedReasoningValue(source);
    if (mirrored) target.reasoning_content = mirrored;
  }
}
