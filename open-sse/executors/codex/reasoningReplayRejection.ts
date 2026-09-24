/**
 * Codex rejects a replayed reasoning item whose encrypted_content cannot be verified with
 * HTTP 400, `type: "invalid_request_error"` and an empty `code`, e.g. "The encrypted content
 * for item rs_… could not be verified. Reason: Encrypted content could not be decrypted or
 * parsed." Clients recover by resending without the reasoning item, so the rejection gets one
 * stable public code instead of the generic `bad_request`. (A content-less `rs_` item never
 * reaches Codex: the request pipeline drops it first.)
 */
export const CODEX_REASONING_REPLAY_ERROR_CODE = "invalid_encrypted_content";

const MAX_MESSAGE_LENGTH = 2_000;

// Bounded quantifiers only (ReDoS-safe on untrusted upstream text).
const REPLAY_MESSAGE_PATTERN =
  /\bencrypted[ _]content\b.{0,200}\bcould not be (?:verified|decrypted)\b/i;

export async function readCodexReasoningReplayRejection(
  response: Response
): Promise<{ message: string } | null> {
  if (response.status !== 400) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(await response.clone().text());
  } catch {
    return null;
  }
  const error =
    parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>).error : null;
  if (!error || typeof error !== "object") return null;

  const { code, message } = error as Record<string, unknown>;
  const text = typeof message === "string" ? message.slice(0, MAX_MESSAGE_LENGTH) : "";
  const matches = code === CODEX_REASONING_REPLAY_ERROR_CODE || REPLAY_MESSAGE_PATTERN.test(text);
  return matches ? { message: text || "Codex rejected a replayed reasoning item" } : null;
}
