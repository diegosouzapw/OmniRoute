// #5426 — Coze surfaces key-validation failures as a JSON envelope shaped like
// `{ "code": 4100, "msg": "...", "logId": "...", "from": "bot-api" }`. Left
// untranslated, that raw envelope (logId included) leaks verbatim into the
// connection-validation UI. This pure helper recognizes the Coze shape and
// composes a friendly, leak-free message so callers can surface it instead of
// the raw body. Kept in its own leaf module (no network deps) so it is unit-
// testable in isolation.

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : null;
    } catch {
      return null;
    }
  }
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

/**
 * When `body` looks like a Coze error envelope (a string `msg`, `from === "bot-api"`,
 * or a `logId`), return a friendly one-line message composed from `msg`/`code`
 * (e.g. `Coze rejected the key: <msg> (code <code>)`). Returns `null` for anything
 * that is not a Coze envelope — including normal OpenAI-style errors, non-objects,
 * empty objects, and non-JSON strings — so non-Coze callers fall through unchanged.
 * Never echoes the raw `logId` or the whole body.
 */
export function extractCozeValidationError(body: unknown): string | null {
  const record = asRecord(body);
  if (!record) return null;

  const msg = typeof record.msg === "string" ? record.msg.trim() : "";
  const from = typeof record.from === "string" ? record.from : "";
  const logId = typeof record.logId === "string" ? record.logId.trim() : "";

  const looksLikeCoze = msg !== "" || from === "bot-api" || logId !== "";
  if (!looksLikeCoze) return null;

  const code = record.code;
  const codeStr =
    typeof code === "number"
      ? String(code)
      : typeof code === "string" && code.trim() !== ""
        ? code.trim()
        : "";

  const detail = msg || "the API key was rejected";
  return codeStr
    ? `Coze rejected the key: ${detail} (code ${codeStr})`
    : `Coze rejected the key: ${detail}`;
}
