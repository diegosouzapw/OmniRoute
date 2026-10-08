/**
 * Streaming-safe preamble stripper.
 *
 * Background: DeepSeek-V4 and similar models sometimes echo the tail of the
 * system message (highest recency) — e.g. the OMNIROUTE_SYSTEM_INSTRUCTION_APPEND
 * directive appended by claude-to-openai.ts — verbatim at the START of their
 * response content. The user then sees the system instruction inside the
 * assistant's reply ("시스템 메시지" leak). This helper deterministically
 * removes a known directive when it appears as a leading prefix, across
 * arbitrary streaming chunk boundaries, and only ever at the very start: once a
 * stream diverges from the directive (or fully consumes it), matching is done
 * and everything after passes through untouched.
 *
 * The directive text is operator-configured (opt-in via the same env var used
 * on the request side), so this is a targeted remedy of the mitigation's side
 * effect — legitimate responses that do not begin with the directive are never
 * modified.
 *
 * API: `createDirectivePreambleStripper(directive)` returns a per-stream
 * function. Call it with each incoming text chunk; it returns the portion of
 * that chunk that may be emitted downstream. Chunks that are still matching a
 * directive prefix yield "" (buffered implicitly by a position counter); if the
 * stream later diverges from the directive, the so-far-matched prefix is
 * released as real content together with the rest of the chunk.
 *
 * Every stripper also exposes `flush()`, which MUST be called once at the end
 * of the stream: a stream that ends while a construct is still undecided (a
 * directive prefix that never completed, a block that never closed) leaves the
 * suppressed text in the internal buffer, and without a flush the client would
 * receive an empty — or truncated — response. `flush()` releases whatever is
 * still held and puts the stripper in the terminal state.
 */

/** A per-stream stripper: call it per chunk, then `flush()` once at stream end. */
export type PreambleStripper = ((text: string) => string) & { flush: () => string };

export function createDirectivePreambleStripper(directive: string): PreambleStripper {
  if (!directive) {
    return Object.assign((text: string) => text, { flush: () => "" });
  }

  let done = false; // stream diverged from, or fully consumed, the directive
  let position = 0; // directive chars matched so far (contiguous from stream start)

  const push = (text: string): string => {
    if (done || text === "") return text;

    let i = 0;
    while (position < directive.length && i < text.length) {
      if (text[i] === directive[position]) {
        position++;
        i++;
      } else {
        // Divergence at position: everything matched so far is real content,
        // and the rest of this chunk (from the diverging char on) is real too.
        done = true;
        return directive.slice(0, position) + text;
      }
    }

    if (position === directive.length) {
      // Full directive consumed; emit only the tail after it within this chunk.
      done = true;
      return text.slice(i);
    }

    // Chunk was entirely a directive prefix (or an empty remainder) — buffer it.
    return "";
  };

  // Stream ended while still matching a directive prefix: the buffered chars
  // are the only content the model produced, so release them instead of
  // swallowing the whole response.
  const flush = (): string => {
    if (done) return "";
    done = true;
    const held = directive.slice(0, position);
    position = 0;
    return held;
  };

  return Object.assign(push, { flush });
}

/**
 * Streaming-safe system-preamble stripper (Phase B).
 *
 * DeepSeek-V4 and similar models sometimes echo not just the exact
 * OMNIROUTE_SYSTEM_INSTRUCTION_APPEND directive but whole chunks of the system
 * prompt at the START of their reply: `<analysis>...</analysis>` blocks,
 * `<system-reminder>` blocks, `<summary>` blocks, or prose reproductions of the
 * superpowers skill section ("Skill usage (when superpowers skills are
 * installed)", "# Verification Process"). The exact-directive stripper does not
 * match these, so they leak to the client. This helper removes any sequence of
 * such known system-echo constructs from the very start of a stream, across
 * arbitrary chunk boundaries, and only while the stream is still a preamble.
 *
 * OFF by default — see the OMNIROUTE_STRIP_SYSTEM_PREAMBLE gate at the call
 * site (translator/response/openai-to-claude.ts). The heuristics below are
 * English-prose shaped and DO mutate response payloads, so they only run when
 * the operator opts in, exactly like the directive stripper above only runs
 * when OMNIROUTE_SYSTEM_INSTRUCTION_APPEND is configured.
 */
// System-echo blocks (the system prompt's tail echoed at the start of a reply) are
// short — a few hundred chars at most. A block carrying >= this many chars of
// content is the model's real response (e.g. a Claude Code autocompact summary),
// not an echo: preserve it instead of suppressing it as a preamble.
const SYSTEM_ECHO_THRESHOLD = 1000;

export function createSystemPreambleStripper(): PreambleStripper {
  const tagNames = ["analysis", "system-reminder", "summary"] as const;
  const proseHeads = [
    "# Verification Process",
    "# Skill usage",
    "Skill usage (when superpowers skills are installed)",
    "Required skills for implementation work",
  ] as const;

  let done = false;
  // "leading" (whitespace only) | "head" (matching a known opener) |
  // "block" (inside a suppressed construct; stack holds open tag names).
  let phase: "leading" | "head" | "block" = "leading";
  let stack: string[] = [];
  let buf = ""; // suppressed, not-yet-decided prefix
  // Opener text already consumed for the construct currently in flight (the
  // `<tag>` itself). Cleared whenever a construct is FINALLY classified as an
  // echo; kept so flush() can restore a construct that never closed.
  let pendingDrop = "";

  const isAllWs = (s: string): boolean => s.trim() === "";

  // First "\n\n" that is followed by a structural marker (an opening tag, a
  // markdown heading, or a divider line) — the boundary where a prose-echo
  // section ends and the next construct (or real content) begins. -1 = none.
  const proseBoundary = (s: string): number => {
    const re = /\n[ \t]*\n[ \t]*(?=<|<[^>]*>|#{1,6} |[-=]{3,})/;
    const m = re.exec(s);
    return m ? m.index : -1;
  };

  const tryOpeners = (s: string): { kind: "tag" | "prose"; name?: string } | null => {
    const t = s.trimStart();
    for (const name of tagNames) {
      if (t.startsWith(`<${name}>`)) return { kind: "tag", name };
    }
    for (const h of proseHeads) {
      if (t.startsWith(h)) {
        const rest = t.slice(h.length);
        if (rest === "" || /^[\s;:.,\-]/.test(rest)) return { kind: "prose" };
      }
    }
    return null;
  };

  const anyOpenerPrefix = (s: string): boolean => {
    const t = s.trimStart();
    for (const name of tagNames) {
      if (`<${name}>`.startsWith(t)) return true;
    }
    for (const h of proseHeads) {
      if (h.startsWith(t)) return true;
    }
    return false;
  };

  const push = (text: string): string => {
    if (done || text === "") return text;
    buf += text;

    while (true) {
      if (phase === "leading") {
        if (isAllWs(buf)) return "";
        phase = "head";
      }

      if (phase === "head") {
        if (isAllWs(buf)) return "";
        const open = tryOpeners(buf);
        if (open) {
          if (open.kind === "tag") {
            const tagStart = buf.indexOf("<");
            const afterOpen = buf.indexOf(">", tagStart) + 1;
            pendingDrop += buf.slice(0, afterOpen);
            buf = buf.slice(afterOpen);
            stack.push(open.name!);
            phase = "block";
            continue;
          }
          // Prose head matched: suppress the echoed section until a structural
          // boundary ends it (or the stream diverges into real content).
          stack.push("__prose__");
          phase = "block";
          continue;
        }
        if (anyOpenerPrefix(buf)) {
          return ""; // strict prefix of a known opener — keep buffering
        }
        // Diverged from every known opener: buffered prefix is real content.
        done = true;
        const out = pendingDrop + buf;
        pendingDrop = "";
        buf = "";
        return out;
      }

      if (phase === "block") {
        const top = stack[stack.length - 1];
        if (top === "__prose__") {
          const b = proseBoundary(buf);
          if (b === -1) return ""; // stay suppressed until boundary or divergence
          buf = buf.slice(b);
          pendingDrop = ""; // prose echo finally classified: the drop is final
          stack.pop();
          phase = "head";
          continue;
        }
        const closeTag = "</" + top + ">";
        const ci = buf.indexOf(closeTag);
        if (ci === -1) return ""; // block not closed yet — keep suppressing
        const afterClose = buf.slice(ci + closeTag.length);
        const trailing = afterClose.replace(/^[ \t\r\n]+/, "");
        // A block carrying substantial content (>= SYSTEM_ECHO_THRESHOLD) is the
        // model's real response (e.g. a Claude Code autocompact summary), not a
        // short system-echo — preserve it. A small block with NO trailing content
        // is also the real response (the block IS the entire reply) — preserve it
        // too. Otherwise (small block followed by more content) it's a system
        // echo — drop it (existing behavior).
        if (ci >= SYSTEM_ECHO_THRESHOLD || trailing === "") {
          done = true;
          const out = "<" + top + ">" + buf.slice(0, ci) + closeTag + afterClose;
          pendingDrop = "";
          buf = "";
          return out;
        }
        buf = trailing;
        pendingDrop = ""; // block finally classified as an echo: the drop is final
        stack.pop();
        phase = stack.length === 0 ? "leading" : "block";
        continue;
      }
    }
  };

  // Stream ended with a construct still undecided (e.g. `<analysis>` that never
  // closed, or a prose head with no structural boundary). Without this the
  // buffered text — possibly the ENTIRE response — would be dropped and the
  // client would get an empty message. Release the opener plus everything held.
  const flush = (): string => {
    if (done) return "";
    done = true;
    const out = pendingDrop + buf;
    pendingDrop = "";
    buf = "";
    stack = [];
    return out;
  };

  return Object.assign(push, { flush });
}
