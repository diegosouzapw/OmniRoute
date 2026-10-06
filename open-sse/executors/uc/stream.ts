/**
 * UC (uncensored.com) PERSONA WebSocket frame parsing.
 *
 * The persona backend streams newline-delimited JSON frames over the socket
 * (one `ws.recv()` may carry several `\n`-joined frames). Each frame is
 * discriminated on `message_type` (or a top-level `type`/`code` for errors).
 * Ported from the reference client's `_stream_uc_turn` (uc_native_adapter.py).
 *
 * Frame kinds we care about:
 *   • top-level `{type:"error", code, message, next_reset}` — quota / auth /
 *     rate. MUST be branched explicitly or the socket hangs to timeout. Codes:
 *     message_limit_exceeded (daily quota), rate_limit_exceeded, unauthorized,
 *     forbidden.
 *   • `message_type:"generation_failed"` (+ direct_mode_error) — retryable.
 *   • `message_type:"status"` — progress; ignorable (surfaced as a status event).
 *   • `message_type:"intermediary_message"` — pre-answer reasoning (→ reasoning).
 *   • `message_type:"text"` — the answer. Non-final frames carry incremental
 *     `text` deltas; the FINAL frame has `end_of_stream:true` and an authoritative
 *     `raw_text` (the full answer). STOP at the first `end_of_stream`.
 *   • `message_type:"memory_status"` — ignorable (only fires with use_memory:true,
 *     which we never set).
 */

/** A classified persona event yielded by the frame parser. */
export type UcEvent =
  | { kind: "status"; text: string }
  | { kind: "reasoning"; text: string }
  | { kind: "delta"; text: string }
  | { kind: "done"; text: string }
  | { kind: "error"; text: string };

/** Error codes that arrive as a top-level frame and must be surfaced immediately. */
const UC_TOP_LEVEL_ERROR_CODES = new Set([
  "message_limit_exceeded",
  "paywall_exceeded",
  "rate_limit_exceeded",
  "unauthorized",
  "forbidden",
]);

/**
 * UC occasionally returns a soft-error apology AS the assistant answer (usually
 * a per-model transient capacity limit). These are NOT real answers — detect
 * them so the executor can surface a retryable error instead of a bogus reply.
 * Patterns kept tight + short-length-gated to avoid eating a legit long reply
 * that happens to discuss servers. Ported from the reference client.
 */
const UC_SOFT_ERROR_PATTERNS = [
  "server overloaded temporarily",
  "please switch models and try again",
  "we are trying to resolve this asap",
  "model is temporarily unavailable",
  "temporarily over capacity",
];

/** Return the trimmed text when it looks like a soft-error apology, else null. */
export function detectUcSoftError(text: string): string | null {
  if (!text) return null;
  const low = text.toLowerCase();
  if (text.length <= 300 && UC_SOFT_ERROR_PATTERNS.some((p) => low.includes(p))) {
    return text.trim();
  }
  return null;
}

/**
 * Stateful accumulator for a single persona turn. Feed each raw `ws.recv()`
 * payload; it splits on newlines, parses each JSON frame, and returns the
 * classified events in order. Tracks accumulated deltas so the terminal `done`
 * can fall back to the concatenation when `raw_text` is absent.
 */
export class UcFrameParser {
  private parts: string[] = [];
  private finished = false;

  /** True once a terminal frame (done/error) has been seen. */
  get done(): boolean {
    return this.finished;
  }

  /** The accumulated answer text so far (delta concatenation). */
  get accumulated(): string {
    return this.parts.join("");
  }

  /** Parse one raw socket payload into ordered events. */
  feed(raw: string): UcEvent[] {
    const events: UcEvent[] = [];
    if (!raw || this.finished) return events;

    for (const rawLine of String(raw).split("\n")) {
      const line = rawLine.trim();
      if (!line) continue;

      let m: Record<string, unknown>;
      try {
        m = JSON.parse(line) as Record<string, unknown>;
      } catch {
        continue; // non-JSON keepalive
      }

      // Top-level error frame (distinct from per-generation message_type frames).
      const code = typeof m.code === "string" ? m.code : "";
      if (m.type === "error" || UC_TOP_LEVEL_ERROR_CODES.has(code)) {
        const effCode = code || "error";
        const msg = typeof m.message === "string" ? m.message : effCode;
        const reset = m.next_reset;
        const detail =
          `${msg} (code=${effCode}` + (reset ? `, next_reset=${String(reset)}` : "") + ")";
        events.push({ kind: "error", text: `uc_${effCode}: ${detail}`.slice(0, 300) });
        this.finished = true;
        break;
      }

      const mt = m.message_type;
      if (mt === "generation_failed") {
        const err = String(m.direct_mode_error ?? m.error ?? "generation_failed");
        events.push({ kind: "error", text: err.slice(0, 300) });
        this.finished = true;
        break;
      }
      if (mt === "status") {
        events.push({ kind: "status", text: String(m.status ?? "") });
      } else if (mt === "intermediary_message") {
        const rt = typeof m.text === "string" ? m.text : "";
        if (rt) events.push({ kind: "reasoning", text: rt });
      } else if (mt === "text") {
        if (m.end_of_stream) {
          const full = (typeof m.raw_text === "string" && m.raw_text) || this.parts.join("");
          events.push({ kind: "done", text: full.trim() });
          this.finished = true;
          break;
        }
        const t = typeof m.text === "string" ? m.text : "";
        if (t) {
          this.parts.push(t);
          events.push({ kind: "delta", text: t });
        }
      }
      // memory_status + anything else: ignored.
    }
    return events;
  }

  /** Terminal fallback when the socket closed without an explicit end_of_stream. */
  finalText(): string {
    return this.parts.join("").trim();
  }
}

/** Rough token estimate (~4 chars/token) — UC sends no usage frame. */
export function estimateUcTokens(text: string): number {
  if (!text) return 0;
  return Math.max(1, Math.ceil(text.length / 4));
}
