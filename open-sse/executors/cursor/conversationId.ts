/**
 * Conversation id sent to Cursor in AgentRunRequest.conversation_id.
 *
 * Cursor routes a run to the backend that holds that conversation's prompt
 * cache. A fresh random id per request lands each agentic turn on a random
 * backend, so the cache hit only by luck (1 of 3 identical
 * resends hit with random ids, 3 of 3 with a fixed id; prod saw 5% full
 * hits). Every turn of one client session must therefore carry the same id.
 *
 * Only the wire id changes. CursorSessionManager keeps its per-request key so
 * parallel requests of one session (e.g. Claude Code subagents) never share
 * an h2 tool-resume session.
 */
import { createHash, randomUUID } from "node:crypto";
import { generateSessionId } from "../../services/sessionManager.ts";
import { resolveOpencodeSessionIdentity } from "../../utils/opencodeSessionIdentity.ts";

function uuidFromHash(input: string): string {
  const h = createHash("sha256").update(input).digest("hex");
  // RFC 4122 layout with version 4 / variant bits so Cursor sees a normal UUID.
  const variant = ((parseInt(h[16], 16) & 0x3) | 0x8).toString(16);
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-${variant}${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

/**
 * An explicit body.conversation_id wins unchanged; otherwise the client's
 * session identity (Claude Code / Codex / OpenCode headers or metadata),
 * then the conversation fingerprint (system prompt, first user message,
 * tools). Derived ids are hashed with the connection id, so the raw client
 * identifier never reaches Cursor. Nothing to go on → random, as before.
 */
export function resolveCursorWireConversationId(
  body: Record<string, unknown>,
  clientHeaders: Record<string, string> | null | undefined,
  connectionId: string | null | undefined
): string {
  if (typeof body.conversation_id === "string" && body.conversation_id) {
    return body.conversation_id;
  }
  const scope = `cursor-conversation:${connectionId || ""}`;
  const sessionIdentity = resolveOpencodeSessionIdentity(clientHeaders, body);
  if (sessionIdentity) return uuidFromHash(`${scope}:session:${sessionIdentity}`);
  const fingerprint = generateSessionId(body as Parameters<typeof generateSessionId>[0]);
  if (fingerprint) return uuidFromHash(`${scope}:fingerprint:${fingerprint}`);
  return randomUUID();
}
