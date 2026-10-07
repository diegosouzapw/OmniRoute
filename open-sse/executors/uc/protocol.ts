/**
 * UC (uncensored.com) PERSONA protocol — WebSocket send-frame assembly and
 * OpenAI→persona context mapping. Ported from the proven reference client
 * (uc_native_adapter.py: build_uc_turn, _persona_frame) and the wire spec
 * (UC-PERSONA-WS-OMNIROUTE-SPEC.md).
 *
 * Unlike a stateless-full-history HTTP provider, UC persona is single-shot over a
 * socket: one JSON frame carrying the CURRENT turn as `text` plus the prior
 * conversation as `chat_history` (client-accumulated). Roles in chat_history are
 * `human`/`assistant` (NOT `user`), and content is a parts array
 * `[{type:"text",text}]`. System prompts, an identity steer, and the tool
 * preamble are folded into `text` (persona has no system channel).
 *
 * CRITICAL persona wire rules (must be enforced at the executor boundary):
 *   • NO `direct_params`, and `max_tokens`/`max_completion_tokens`/`reasoning`/
 *     `temperature`/etc. are IGNORED — worse, injecting `max_tokens` ABORTS the
 *     turn (empty return). This module simply never emits them.
 *   • NO native `tools[]` — tool schemas are folded into `text` as a prompted
 *     `<tool_call>` preamble (handled by the shared translator/webTools.ts on the
 *     executor side); the response side parses `<tool_call>` blocks back out.
 */
import { randomUUID } from "node:crypto";
import { UC_APP_VERSION } from "./constants.ts";

/**
 * Gentle identity steer. An aggressive "absolute override" BACKFIRES on UC's
 * persona (the model mocks the injected system text); a mild, professional steer
 * neutralizes the default "ENI" pet-name persona cleanly. Proven in the
 * reference client.
 */
export const UC_IDENTITY_STEER =
  "You are operating as a professional technical assistant. Answer plainly and " +
  "directly; do not use pet-names or roleplay framing.";

interface OpenAiMessage {
  role?: string;
  content?: unknown;
  name?: string;
  tool_calls?: unknown;
  tool_call_id?: string;
}

/** A persona chat_history entry. */
export interface UcHistoryEntry {
  role: "human" | "assistant";
  content: Array<{ type: "text"; text: string }>;
}

/** Flatten OpenAI `content` (string or multipart array) to plain text. */
export function ucContentToText(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((part) =>
        part && typeof part === "object" && (part as { type?: string }).type === "text"
          ? String((part as { text?: unknown }).text ?? "")
          : ""
      )
      .filter(Boolean)
      .join("\n");
  }
  return "";
}

/** Wrap a plain string as a persona content-parts array. */
function textParts(text: string): Array<{ type: "text"; text: string }> {
  return [{ type: "text", text }];
}

/**
 * Assemble the persona `{ text, history }` from an OpenAI messages[] array.
 *
 * Split point is the LAST assistant message: everything up to and including it
 * becomes `chat_history` (roles mapped user→human, assistant→assistant,
 * tool→human with a `[tool result]` prefix); everything AFTER it (the trailing
 * user/tool turn) is flattened into the single `text` string. System messages
 * are collected and prepended to `text` (persona has no system channel),
 * followed by the identity steer, separated from the user content by a divider.
 *
 * Tool schemas are injected UPSTREAM by the shared prepareToolMessages() (the
 * executor passes the already-tool-prepared messages here), so this function
 * only maps roles + folds systems — it does not itself render a tool preamble.
 */
export function assembleUcTurn(
  messages: OpenAiMessage[],
  opts: { identitySteer?: boolean } = {}
): { text: string; history: UcHistoryEntry[] } {
  const identitySteer = opts.identitySteer !== false;
  const systems: string[] = [];
  const history: UcHistoryEntry[] = [];

  let lastAssistant = -1;
  for (let i = 0; i < messages.length; i++) {
    if (messages[i]?.role === "assistant") lastAssistant = i;
  }
  const head = lastAssistant >= 0 ? messages.slice(0, lastAssistant + 1) : [];
  const tail = lastAssistant >= 0 ? messages.slice(lastAssistant + 1) : messages;

  for (const m of head) {
    const role = m.role;
    if (role === "system") {
      systems.push(ucContentToText(m.content));
    } else if (role === "user") {
      history.push({ role: "human", content: textParts(ucContentToText(m.content)) });
    } else if (role === "assistant") {
      history.push({ role: "assistant", content: textParts(ucContentToText(m.content)) });
    } else if (role === "tool") {
      history.push({
        role: "human",
        content: textParts(`[tool result] ${ucContentToText(m.content)}`),
      });
    }
  }

  const activeParts: string[] = [];
  for (const m of tail) {
    const role = m.role;
    if (role === "system") {
      systems.push(ucContentToText(m.content));
    } else if (role === "user") {
      activeParts.push(ucContentToText(m.content));
    } else if (role === "tool") {
      const name = m.name || "tool";
      activeParts.push(
        `The ${name} tool already ran and returned:\n` +
          `${ucContentToText(m.content)}\n` +
          `Use this result to answer; do NOT call the tool again.`
      );
    } else if (role === "assistant") {
      activeParts.push(ucContentToText(m.content));
    }
  }

  const preamble: string[] = [];
  const joinedSystems = systems.filter(Boolean).join("\n\n");
  if (joinedSystems) preamble.push(joinedSystems);
  if (identitySteer) preamble.push(UC_IDENTITY_STEER);

  let active = activeParts.filter(Boolean).join("\n\n").trim();
  if (preamble.length) {
    active = preamble.join("\n\n") + "\n\n---\n\n" + active;
  }
  return { text: active, history };
}

/**
 * Build the persona (non-direct) WebSocket send frame. Mirrors the reference
 * client's `_persona_frame` exactly. Fresh uuids per message; `model` is the UC
 * persona SHORTNAME (already the registry id); `user_identifier` is the account
 * uid (also the WS URL path segment).
 *
 * Note the deliberately-absent knobs: no direct_params, no max_tokens, no
 * temperature/reasoning — persona ignores them and max_tokens aborts the turn.
 */
export function buildPersonaFrame(opts: {
  model: string;
  text: string;
  history: UcHistoryEntry[];
  uid: string;
  /** Uploaded input-media blob references (images/docs) for the current turn. */
  media?: Array<{ blobName: string; contentType: string }>;
}): Record<string, unknown> {
  // UC persona carries ONE media blob per frame (the captured single-file chat
  // case); when several were uploaded we attach the first and list the rest under
  // `media_blob_names` for forward-compat (the multi-file field is untested but
  // harmless if the server ignores it). See UC-FILE-UPLOAD.md.
  const media = opts.media ?? [];
  const primary = media[0];
  return {
    message_id: randomUUID(),
    client_request_id: randomUUID(),
    thread_id: randomUUID(),
    app_version: UC_APP_VERSION,
    model: opts.model,
    text: opts.text,
    chat_history: opts.history,
    chat_history_truncated: false,
    chat_mode: "chat",
    use_memory: false,
    web_search_enabled: false,
    perplexity_search_enabled: false,
    is_smartify: false,
    is_refresh: false,
    is_suggested_input: false,
    followups_enabled: false,
    free_tier_model_selected: false,
    user_identifier: opts.uid,
    // no_media_in_chat means "don't render the media inline in the transcript",
    // NOT "no media" — it stays true even when a blob is attached (per capture).
    no_media_in_chat: true,
    media_blob_name: primary?.blobName ?? "",
    media_content_type: primary?.contentType ?? "",
    ...(media.length > 1
      ? { media_blob_names: media.map((m) => m.blobName), _uc_media_count: media.length }
      : {}),
    adapty_profile_id: null,
  };
}
