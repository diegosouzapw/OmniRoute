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
 * `mid-conversation-system-2026-04-07`; when the client sent it, its token is forwarded by
 * applyClientAnthropicBeta (config/anthropicHeaders.ts) while such a turn is in the body.
 */

import { isClaudeCodeCompatibleProvider } from "./claudeCodeCompatible.ts";
import { FORMATS } from "../translator/formats.ts";

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
