/**
 * chatCore Claude system-role lifter (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure helper extracted from chatCore.ts: lifts any `system`/`developer` role messages out of the
 * messages[] array into the top-level `system` field. Anthropic's Messages API rejects either as a
 * chat role, so they must be hoisted. `developer` is OpenAI's Responses-API rename of `system` and
 * is treated identically. Mutates the payload in place; behaviour is byte-identical to the previous
 * top-level definition (still re-exported from chatCore.ts for existing importers/tests).
 *
 * `relocateHoistedCacheBoundary` keeps that hoist from destroying the client's prompt-cache
 * layout (#9436); both hoisting implementations share it.
 */

export type HoistedCacheBoundary = "moved" | "kept" | "dropped";

// Re-exported from its canonical home in claudeCodeConstraints.ts so existing
// importers of this module keep working.
export { relocateDirectiveOnlyMessages } from "../../services/claudeCodeConstraints.ts";

/** Effective cache TTL of a `cache_control` value; Anthropic defaults to 5m when `ttl` is absent. */
function effectiveTtl(marker: unknown): string {
  const ttl = (marker as Record<string, unknown> | null | undefined)?.ttl;
  return typeof ttl === "string" ? ttl : "5m";
}

/**
 * Whether a content block can carry a cache breakpoint. Excludes blocks Anthropic does not accept
 * as one (thinking) and blocks the upstream normalisation discards or empties out anyway.
 */
function isCacheBreakpointTarget(block: unknown): block is Record<string, unknown> {
  if (block === null || typeof block !== "object") return false;
  const candidate = block as Record<string, unknown>;
  switch (candidate.type) {
    case "text":
      // Empty text blocks are stripped before the payload goes upstream.
      return typeof candidate.text === "string" && candidate.text.length > 0;
    case "tool_use":
    case "image":
    case "image_url":
    case "file":
    case "file_url":
    case "document":
      return true;
    case "tool_result": {
      // A tool_result that yields no text collapses to nothing during normalisation.
      const payload = candidate.content ?? candidate.text ?? candidate.output;
      if (typeof payload === "string") return payload.length > 0;
      if (Array.isArray(payload)) {
        // Only the non-empty text parts of the array survive; images and unknown parts do not.
        return payload.some((part) => {
          const text = (part as Record<string, unknown> | null)?.text;
          return (
            (part as Record<string, unknown> | null)?.type === "text" &&
            typeof text === "string" &&
            text.length > 0
          );
        });
      }
      return payload != null;
    }
    default:
      // thinking, redacted_thinking, and anything unrecognised.
      return false;
  }
}

/**
 * Preserves a message-level cache boundary when a marked system/developer block is hoisted into
 * top-level `system[]`.
 *
 * The marker is moved to the nearest preceding block that can carry a breakpoint. If that block is
 * already marked, both are kept — except where the hoisted marker, which ends up ahead of the
 * target in `system[]`, would put a 5m breakpoint before a 1h one; Anthropic requires the longer
 * TTL first, so the hoisted marker is dropped instead.
 *
 * @returns `"moved"` or `"dropped"` — the caller must remove the marker from the hoisted block;
 *          `"kept"` — the marker stays on it
 */
export function relocateHoistedCacheBoundary(
  marker: unknown,
  preceding: ReadonlyArray<{ content?: unknown }>
): HoistedCacheBoundary {
  for (let i = preceding.length - 1; i >= 0; i--) {
    const content = preceding[i]?.content;
    if (!Array.isArray(content)) continue;
    for (let j = content.length - 1; j >= 0; j--) {
      const block = content[j];
      if (!isCacheBreakpointTarget(block)) continue;
      if (block.cache_control == null) {
        block.cache_control = marker;
        return "moved";
      }
      // Occupied: overwriting would discard the client's own marker, and stepping further back
      // would only shorten the prefix — so both stay, unless the TTL order forbids it.
      return effectiveTtl(marker) === "5m" && effectiveTtl(block.cache_control) === "1h"
        ? "dropped"
        : "kept";
    }
  }
  return "kept";
}

export function extractSystemRoleMessages(payload: Record<string, unknown>): void {
  if (!Array.isArray(payload.messages)) return;
  const messages = payload.messages as Array<{ role?: unknown; content?: unknown }>;
  // Treat both `system` and `developer` as system-equivalent (OpenAI's Responses
  // API renamed system → developer). Anthropic rejects either as a chat role, so
  // both must be lifted into the top-level `system` field — parity with the
  // normal-path extractSystemMessagesToBody closure.
  const isSystemRole = (role: unknown): boolean =>
    typeof role === "string" &&
    (role.toLowerCase() === "system" || role.toLowerCase() === "developer");
  const systemMessages = messages.filter((m) => isSystemRole(m.role));
  if (systemMessages.length === 0) return;

  const extraBlocks: Array<Record<string, unknown>> = [];
  // Walk in order rather than over the filtered list: re-anchoring a hoisted `cache_control`
  // needs the messages that precede it and stay behind (#9436).
  const preceding: Array<{ content?: unknown }> = [];
  for (const sm of messages) {
    if (!isSystemRole(sm.role)) {
      preceding.push(sm);
      continue;
    }
    if (typeof sm.content === "string" && sm.content.length > 0) {
      extraBlocks.push({ type: "text", text: sm.content });
    } else if (Array.isArray(sm.content)) {
      for (const block of sm.content as Array<Record<string, unknown>>) {
        if (block?.type === "text" && typeof block.text === "string" && block.text.length > 0) {
          const hoisted = { ...block };
          if (
            hoisted.cache_control != null &&
            relocateHoistedCacheBoundary(hoisted.cache_control, preceding) !== "kept"
          ) {
            delete hoisted.cache_control;
          }
          extraBlocks.push(hoisted);
        }
      }
    }
    // Directive payload (message-level output_config, as emitted by Claude
    // Code clients): the message itself is lifted away, so fold its output
    // configuration into the top-level parameter instead of silently dropping
    // it — whatever shape the content had. An explicit top-level output_config
    // wins, and among several directive messages the first one wins.
    if (payload.output_config == null) {
      const directive = sm as Record<string, unknown>;
      if (
        directive.output_config != null &&
        typeof directive.output_config === "object" &&
        !Array.isArray(directive.output_config)
      ) {
        payload.output_config = directive.output_config;
      }
    }
  }
  if (extraBlocks.length > 0) {
    const existingSystem = payload.system;
    if (typeof existingSystem === "string" && existingSystem.length > 0) {
      payload.system = [{ type: "text", text: existingSystem }, ...extraBlocks];
    } else if (Array.isArray(existingSystem)) {
      payload.system = [...(existingSystem as Array<Record<string, unknown>>), ...extraBlocks];
    } else {
      payload.system = extraBlocks;
    }
  }
  payload.messages = messages.filter((m) => !isSystemRole(m.role));
}

/**
 * Hoists the leading run of text-bearing system-role messages (everything
 * before the first real user/assistant turn) into the top-level `system`
 * parameter. Anthropic treats `messages[0]` as the initial system prompt
 * position and rejects any non-directive system-role message there ("use the
 * top-level 'system' parameter for the initial system prompt"), which is
 * exactly where the Output Styles injection lands on the mid-conversation
 * system passthrough (provider `claude` + 1M-context models). Only the leading
 * run is hoisted so genuine mid-conversation system turns keep their position
 * and cache prefix; empty (directive-only) messages in the run are left in
 * place for relocateDirectiveOnlyMessages to handle.
 */
export function hoistLeadingTextSystemMessages(payload: Record<string, unknown>): void {
  if (!Array.isArray(payload.messages) || payload.messages.length === 0) return;
  const messages = payload.messages as Array<Record<string, unknown>>;
  const isSystemRole = (role: unknown): boolean =>
    typeof role === "string" &&
    (role.toLowerCase() === "system" || role.toLowerCase() === "developer");

  const blocks: Array<Record<string, unknown>> = [];
  const kept: Array<Record<string, unknown>> = [];
  let i = 0;
  for (; i < messages.length; i++) {
    const m = messages[i];
    if (m == null || typeof m !== "object" || !isSystemRole(m.role)) break;
    if (typeof m.content === "string") {
      if (m.content.length > 0) blocks.push({ type: "text", text: m.content });
      continue;
    }
    if (Array.isArray(m.content) && m.content.length > 0) {
      let hoisted = false;
      for (const block of m.content as Array<Record<string, unknown>>) {
        if (block?.type === "text" && typeof block.text === "string" && block.text.length > 0) {
          blocks.push({ type: "text", text: block.text });
          hoisted = true;
        }
      }
      if (!hoisted) kept.push(m);
      continue;
    }
    kept.push(m);
  }
  if (blocks.length === 0) return;

  const existing = payload.system;
  if (typeof existing === "string" && existing.length > 0) {
    payload.system = [{ type: "text", text: existing }, ...blocks];
  } else if (Array.isArray(existing)) {
    payload.system = [...(existing as Array<Record<string, unknown>>), ...blocks];
  } else {
    payload.system = blocks;
  }
  payload.messages = [...kept, ...messages.slice(i)];
}
