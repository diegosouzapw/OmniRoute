// Safe JSON.parse helper shared by the translator layer.
//
// Behavior contract (must be preserved by all callers):
//   - non-string input is returned unchanged (passthrough)
//   - a valid JSON string is parsed and returned
//   - on parse error the caller-chosen `fallback` is returned
//
// The `fallback` is explicit so the two historical `tryParseJSON` variants
// can keep their distinct semantics: geminiHelper returns `null` on error,
// while openai-to-claude returns the raw input string (passthrough).
export function safeParseJSON<TFallback>(str: unknown, fallback: TFallback): unknown {
  if (typeof str !== "string") return str;
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}
