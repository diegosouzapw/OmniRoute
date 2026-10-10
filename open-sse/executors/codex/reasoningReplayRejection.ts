import { HTTP_STATUS } from "../../config/constants.ts";
import { errorResponse } from "../../utils/error.ts";
import type { ExecutorLog } from "../base.ts";

/**
 * Codex rejects a replayed reasoning item whose encrypted_content cannot be verified with
 * HTTP 400, `type: "invalid_request_error"` and an empty `code`, e.g. "The encrypted content
 * for item rs_… could not be verified. Reason: Encrypted content could not be decrypted or
 * parsed." This happens with cross-account / cross-model history and after a combo or account
 * fallback. The HTTP executor retries ONCE on the same account with that ciphertext stripped;
 * a repeated rejection gets one stable public code instead of the generic `bad_request`, so a
 * client can still recover by resending without the reasoning item. (A content-less `rs_` item
 * never reaches Codex: the request pipeline drops it first.)
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

function hasEntries(value: unknown): boolean {
  return Array.isArray(value) ? value.length > 0 : Boolean(value);
}

/**
 * Returns a copy of `body` whose top-level `reasoning` input items no longer carry
 * `encrypted_content` (nor the server `id` that pointed at it); items left with no summary and
 * no content are dropped. The caller's body is never mutated.
 */
export function stripUndecryptableReasoning(body: unknown): { body: unknown; removed: number } {
  const input = body && typeof body === "object" ? (body as Record<string, unknown>).input : null;
  if (!Array.isArray(input)) return { body, removed: 0 };

  let removed = 0;
  const nextInput: unknown[] = [];
  for (const item of input) {
    const record = item && typeof item === "object" ? (item as Record<string, unknown>) : null;
    if (record?.type !== "reasoning" || !Object.hasOwn(record, "encrypted_content")) {
      nextInput.push(item);
      continue;
    }
    removed++;
    const { encrypted_content: _ciphertext, id: _id, ...rest } = record;
    if (hasEntries(rest.summary) || hasEntries(rest.content)) nextInput.push(rest);
  }
  if (removed === 0) return { body, removed: 0 };
  return { body: { ...(body as Record<string, unknown>), input: nextInput }, removed };
}

/**
 * Handles a Codex HTTP replay rejection: retries once via `resend` without the undecryptable
 * ciphertext, and relabels a rejection that still stands as a stable
 * `invalid_encrypted_content` 400. Any other result is returned untouched; `rejected` is true
 * only when the relabeled 400 is the final answer (callers skip their success post-processing).
 */
export async function recoverCodexReasoningReplayRejection<T extends object>(
  first: T,
  body: unknown,
  resend: (body: unknown) => Promise<T>,
  log?: ExecutorLog | null
): Promise<{ result: T; rejected: boolean }> {
  const responseOf = (value: T) => (value as { response?: Response }).response;
  const rejectionOf = async (response?: Response) =>
    response && !response.ok ? readCodexReasoningReplayRejection(response) : null;
  let result = first;
  let rejection = await rejectionOf(responseOf(result));
  if (!rejection) return { result, rejected: false };

  const stripped = stripUndecryptableReasoning(body);
  if (stripped.removed > 0) {
    log?.warn?.(
      "RETRY",
      `CODEX | undecryptable reasoning replay; retrying same account without ${stripped.removed} encrypted reasoning item(s)`
    );
    await responseOf(result)
      ?.body?.cancel()
      .catch(() => undefined);
    result = await resend(stripped.body);
    rejection = await rejectionOf(responseOf(result));
    if (!rejection) return { result, rejected: false };
  }

  log?.warn?.("CODEX", "upstream rejected a replayed reasoning item");
  await responseOf(result)
    ?.body?.cancel()
    .catch(() => undefined);
  (result as { response: Response }).response = errorResponse(
    HTTP_STATUS.BAD_REQUEST,
    rejection.message,
    { type: "invalid_request_error", code: CODEX_REASONING_REPLAY_ERROR_CODE }
  );
  return { result, rejected: true };
}
