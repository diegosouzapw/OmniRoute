// Internal failure metadata only. Never serialize provider strings, IDs, names,
// arguments, headers or payloads; cap traversal independently of payload size.
const MAX_ITEMS = 32;
const REASONS = new Set([
  "empty",
  "empty_choices",
  "no_terminal",
  "parse_fail",
  "content_is_upstream_error",
]);
const record = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};

function describe(value: unknown): string {
  const root = record(value);
  const body = root.response && root.response !== value ? record(root.response) : root;
  const kind =
    body.object === "response"
      ? "responses"
      : Array.isArray(body.choices)
        ? "chat"
        : Array.isArray(body.content)
          ? "claude"
          : "unknown";
  let textChars = 0,
    refusalChars = 0,
    tools = 0,
    other = 0,
    clipped = false;
  const bounded = (value: unknown): unknown[] => {
    if (!Array.isArray(value)) return [];
    if (value.length > MAX_ITEMS) clipped = true;
    return value.slice(0, MAX_ITEMS);
  };
  const parts = (value: unknown) => {
    for (const raw of bounded(value)) {
      const part = record(raw);
      if ((part.type === "text" || part.type === "output_text") && typeof part.text === "string")
        textChars += part.text.length;
      else if (part.type === "refusal" && typeof part.refusal === "string")
        refusalChars += part.refusal.length;
      else if (part.type === "tool_use") tools++;
      else other++;
    }
  };
  if (kind === "responses") {
    for (const raw of bounded(body.output)) {
      const item = record(raw);
      if (item.type === "message") parts(item.content);
      else if (item.type === "function_call") tools++;
      else other++;
    }
  } else if (kind === "chat") {
    for (const raw of bounded(body.choices)) {
      const choice = record(raw);
      const message = record(choice.message ?? choice.delta);
      if (typeof message.content === "string") textChars += message.content.length;
      else parts(message.content);
      if (typeof message.refusal === "string") refusalChars += message.refusal.length;
      tools += bounded(message.tool_calls).length;
    }
  } else if (kind === "claude") parts(body.content);
  return `kind=${kind},textChars=${textChars},refusalChars=${refusalChars},tools=${tools},other=${other},clipped=${clipped}`;
}

/** Fits the retained error_summary even if large pipeline artifacts are omitted. */
export function buildMalformedResponseDiagnostic(
  reason: string,
  upstream: unknown,
  translated: unknown
): string {
  return `malformed_translated_response:${REASONS.has(reason) ? reason : "unknown"} upstream{${describe(upstream)}} translated{${describe(translated)}}`;
}
