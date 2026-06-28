import { detectVolatileSpans } from "./quantumLock.ts";
import {
  placeholderFor,
  TAIL_DELIM,
  type QuantumCategory,
  type QuantumLockConfig,
  type QuantumLockStats,
} from "./quantumPatterns.ts";

const EMPTY: QuantumLockStats = { fragments: 0, categories: {} };

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

/** v1 stabilizes string-content system messages only. Array/multimodal ⇒ no-op (follow-up). */
function systemTextOf(msg: Record<string, unknown>): string {
  return typeof msg.content === "string" ? msg.content : "";
}

/**
 * Stabilize volatile fragments in the FIRST role:system message: replace each detected span
 * with a positional, value-independent placeholder (⟦Q{i}⟧) and append a delimited value-tail.
 * The rewritten body is sent to the model (lossless — the tail carries every value). Pure:
 * clones the touched message, never mutates input. Fail-open: returns the input body + zero
 * stats on every no-op path. `ctx` is accepted for symmetry with the wrapper; unused here.
 */
export function applyQuantumLock(
  body: Record<string, unknown>,
  cfg: QuantumLockConfig,
  _ctx?: { isCachingProvider: boolean }
): { body: Record<string, unknown>; stats: QuantumLockStats } {
  const messages = body.messages;
  if (!Array.isArray(messages)) return { body, stats: EMPTY };

  const idx = messages.findIndex((m) => isRecord(m) && m.role === "system");
  if (idx === -1) return { body, stats: EMPTY };

  const sys = messages[idx] as Record<string, unknown>;
  const text = systemTextOf(sys);
  if (!text) return { body, stats: EMPTY };
  if (text.includes(TAIL_DELIM)) return { body, stats: EMPTY }; // idempotency

  const spans = detectVolatileSpans(text, cfg);
  if (spans.length === 0) return { body, stats: EMPTY };

  let out = "";
  let cursor = 0;
  const values: string[] = [];
  const categories: Partial<Record<QuantumCategory, number>> = {};
  spans.forEach((span, i) => {
    out += text.slice(cursor, span.start) + placeholderFor(i);
    values.push(text.slice(span.start, span.end));
    categories[span.category] = (categories[span.category] ?? 0) + 1;
    cursor = span.end;
  });
  out += text.slice(cursor);

  const tail = `\n\n${TAIL_DELIM}\n${values.map((v, i) => `${placeholderFor(i)}=${v}`).join("\n")}`;
  const newMessages = messages.slice();
  newMessages[idx] = { ...sys, content: out + tail };

  return {
    body: { ...body, messages: newMessages },
    stats: { fragments: values.length, categories },
  };
}
