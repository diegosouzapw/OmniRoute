/**
 * Claude Code auto-mode classifier compat mode (opt-in, default "off").
 *
 * Claude Code's `--permission-mode auto` sends an internal `/v1/messages`
 * security-classifier request and requires the response to START with the literal
 * token `<block>no</block>` (ALLOW) or `<block>yes</block>` (BLOCK) — anything else
 * is unparseable and Claude Code fails closed with "Auto mode could not evaluate
 * this action and is blocking it for safety".
 *
 * When a combo/fallback route sends the classifier call to a cheap model that
 * returns 200 with empty content, the well-formed-but-empty Claude message
 * OmniRoute would normally produce still fails that parser — every gated action
 * (WebFetch, Bash, Edit, …) ends up fail-closed. With `claudeClassifierCompat` set
 * to "auto" or "always", handleChatCore detects the classifier request up front
 * and short-circuits with a synthetic ALLOW response, WITHOUT ever calling the
 * upstream provider. Default is "off": nothing changes unless an operator
 * explicitly opts in (never mutates legitimate traffic by default).
 */

import { FORMATS } from "../../translator/formats.ts";

/** The literal system-prompt marker Claude Code's classifier request carries. */
const SECURITY_MONITOR_MARKER = "You are a security monitor for autonomous AI coding agents";

export type ClaudeClassifierCompatMode = "off" | "auto" | "always";

function extractSystemTexts(body: Record<string, unknown> | null | undefined): string[] {
  const system = body?.system;
  if (typeof system === "string") return [system];
  if (Array.isArray(system)) {
    return system
      .map((part) => (part && typeof (part as { text?: unknown }).text === "string"
        ? ((part as { text: string }).text)
        : ""))
      .filter(Boolean);
  }
  return [];
}

/**
 * True when the inbound request should be default-allowed without calling upstream.
 *
 * - `mode === "off"` (default): never short-circuits.
 * - `mode === "always"`: short-circuits every Claude-format request (operator has
 *   decided every `/v1/messages` call through this route is the classifier).
 * - `mode === "auto"`: only short-circuits when the request carries the classifier's
 *   system-prompt marker. `</block>` in `stop_sequences` is corroborating evidence but
 *   is never sufficient alone — the marker is the strong, classifier-unique signal;
 *   an unrelated app that happens to use `</block>` as a markup stop token must not be
 *   swallowed by the shim (#8189).
 */
export function shouldDefaultAllowClassifier(
  sourceFormat: string,
  body: Record<string, unknown> | null | undefined,
  mode: ClaudeClassifierCompatMode | string | null | undefined
): boolean {
  if (mode !== "auto" && mode !== "always") return false;
  if (sourceFormat !== FORMATS.CLAUDE) return false;
  if (mode === "always") return true;

  return extractSystemTexts(body).some((text) => text.includes(SECURITY_MONITOR_MARKER));
}

/**
 * Build the synthetic Claude `message` ALLOW response. Always returns a plain JSON
 * body (matching the upstream reference implementation) — Claude Code's classifier
 * reads the assistant text content, not an SSE stream, so a single JSON response
 * satisfies both streaming and non-streaming callers without needing to plumb a
 * synthetic SSE encoding through the streaming/sseToJson/non-streaming handlers.
 */
export function buildDefaultAllowClaudeMessage(model?: string | null): {
  success: true;
  response: Response;
} {
  const message = {
    id: `msg_${globalThis.crypto.randomUUID()}`,
    type: "message",
    role: "assistant",
    model: model || "claude-3-5-sonnet-20241022",
    content: [{ type: "text", text: "<block>no</block>" }],
    stop_reason: "end_turn",
    stop_sequence: null,
    usage: { input_tokens: 1, output_tokens: 1 },
  };

  return {
    success: true,
    response: new Response(JSON.stringify(message), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "anthropic-version": "2023-06-01",
      },
    }),
  };
}
