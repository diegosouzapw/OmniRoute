/**
 * Mid-conversation system-turn policy for plain `anthropic-compatible-*` connections.
 *
 * The claude → claude passthrough hoists every `role: "system"` turn into the top-level
 * `system` parameter for any provider that is not native `claude`. A client that appends a
 * system notification each turn (environment updates, background notices, `<total_tokens>`
 * budget updates) then grows `system` — the head of the prompt — on every request, so the
 * cached history after it never matches again and the whole conversation is re-written to
 * the cache each turn.
 *
 * The turns always stay in place, whatever the client negotiated: cache stability is the
 * point, and the hoist is what breaks it. OmniRoute never invents
 * `mid-conversation-system-2026-04-07`; when the client sent it, its token is forwarded
 * (the generic anthropic-beta allowlist would otherwise drop it).
 */

import { isClaudeCodeCompatibleProvider } from "./claudeCodeCompatible.ts";
import { FORMATS } from "../translator/formats.ts";

export const MID_CONVERSATION_SYSTEM_BETA = "mid-conversation-system-2026-04-07";

/** Whether a comma-list `anthropic-beta` value carries the mid-conversation-system token. */
export function clientNegotiatedMidConversationSystem(clientBeta: unknown): boolean {
  if (typeof clientBeta !== "string") return false;
  return clientBeta
    .split(",")
    .some((token) => token.trim().toLowerCase() === MID_CONVERSATION_SYSTEM_BETA);
}

/**
 * True when this request should keep its mid-conversation system turns in `messages[]`.
 * Only plain `anthropic-compatible-*` passthrough is covered: native `claude` keeps its own
 * model/shape policy (shouldUseMidConversationSystem) and the CC bridge builds its own body.
 */
export function resolveClaudeMidConversationSystemPolicy({
  provider,
  sourceFormat,
  targetFormat,
}: {
  provider: string | null | undefined;
  sourceFormat: string | null | undefined;
  targetFormat: string | null | undefined;
}): boolean {
  if (sourceFormat !== FORMATS.CLAUDE || targetFormat !== FORMATS.CLAUDE) return false;
  if (typeof provider !== "string" || !provider.startsWith("anthropic-compatible-")) return false;
  return !isClaudeCodeCompatibleProvider(provider);
}

/** Whether a (post-hoist) Claude body still carries a system-role turn inside `messages[]`. */
export function hasMidConversationSystemTurn(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const messages = (body as Record<string, unknown>).messages;
  if (!Array.isArray(messages)) return false;
  return messages.some((message) => {
    const role = (message as Record<string, unknown> | null)?.role;
    return typeof role === "string" && role.toLowerCase() === "system";
  });
}
