/**
 * Log redaction safety net (free-claude-code port, Fase 8.3).
 *
 * Final defense-in-depth layer: scrubs credentials that slip into log MESSAGES or
 * arbitrary object/error values, regardless of call site. It complements — does not
 * replace — the call-site maskers (`src/mitm/maskSecrets.ts`, `src/lib/logPayloads.ts`),
 * and runs in the pino `hooks.logMethod` (main thread, so it works with transports).
 *
 * Patterns are strictly bounded (single, non-overlapping character classes with `{n,}`
 * limits) to avoid catastrophic backtracking on untrusted input — see CLAUDE.md
 * "PII & Stream Sanitization Learnings" §1.
 */

const CENSOR = "[REDACTED]";

// Cheap pre-test: skip the (still bounded) replace work entirely for clean strings.
const SECRET_HINT = /bearer|telegram\.org\/bot|api[_-]?key|authorization|sk-/i;

const PATTERNS: ReadonlyArray<readonly [RegExp, string]> = [
  // Authorization: Bearer <token>  /  authorization=Bearer <token>
  [/(authorization\s*[:=]\s*bearer\s+)[\w.\-]{6,}/gi, `$1${CENSOR}`],
  // bare "Bearer <token>"
  [/\bbearer\s+[\w.\-]{12,}/gi, `Bearer ${CENSOR}`],
  // x-api-key: <val>  /  api_key=<val>
  [/((?:x-api-key|api[_-]?key)\s*[:=]\s*)[\w.\-]{6,}/gi, `$1${CENSOR}`],
  // Telegram bot token in a URL: api.telegram.org/bot<digits>:<token>
  [/(api\.telegram\.org\/bot)\d{6,}:[\w\-]{20,}/gi, `$1${CENSOR}`],
  // OpenAI-style keys: sk-... (also sk-proj-...)
  [/\bsk-[A-Za-z0-9_\-]{16,}/g, `sk-${CENSOR}`],
];

const MAX_DEPTH = 6;
const MAX_NODES = 2000;

/** Redact secrets from a single string. Returns the same string when nothing matches. */
export function redactSecrets(text: string): string {
  if (typeof text !== "string" || text.length === 0 || !SECRET_HINT.test(text)) return text;
  let out = text;
  for (const [pattern, replacement] of PATTERNS) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

interface RedactState {
  budget: number;
  seen: WeakSet<object>;
}

function redactValue(value: unknown, depth: number, state: RedactState): unknown {
  if (state.budget <= 0 || depth > MAX_DEPTH) return value;
  state.budget -= 1;

  if (typeof value === "string") return redactSecrets(value);
  if (value === null || typeof value !== "object") return value;
  if (state.seen.has(value)) return value; // circular guard
  state.seen.add(value);

  if (value instanceof Error) {
    const message = redactSecrets(value.message || "");
    const stack = redactSecrets(value.stack || "");
    // Untouched error → keep the original instance so pino's err serializer still runs.
    if (message === (value.message || "") && stack === (value.stack || "")) return value;
    // Return a redacted CLONE (not the original — it may be used elsewhere) that is still
    // a real Error, so pino's err serializer produces the usual {type, message, stack}.
    const cloned = new Error(message);
    cloned.name = value.name;
    cloned.stack = stack;
    return cloned;
  }

  if (Array.isArray(value)) {
    let changed = false;
    const out = value.map((item) => {
      const redacted = redactValue(item, depth + 1, state);
      if (redacted !== item) changed = true;
      return redacted;
    });
    return changed ? out : value;
  }

  let changed = false;
  const out: Record<string, unknown> = {};
  for (const key of Object.keys(value as Record<string, unknown>)) {
    const original = (value as Record<string, unknown>)[key];
    const redacted = redactValue(original, depth + 1, state);
    if (redacted !== original) changed = true;
    out[key] = redacted;
  }
  return changed ? out : value;
}

/**
 * Redact every log argument (message string + structured objects/errors). Allocation-
 * and behavior-preserving: when nothing is redacted the original arguments are returned
 * unchanged. Bounded by node budget + depth and circular-reference safe.
 */
export function redactLogArgs(args: unknown[]): unknown[] {
  if (!Array.isArray(args) || args.length === 0) return args;
  const state: RedactState = { budget: MAX_NODES, seen: new WeakSet() };
  let changed = false;
  const out = args.map((arg) => {
    const redacted = redactValue(arg, 0, state);
    if (redacted !== arg) changed = true;
    return redacted;
  });
  return changed ? out : args;
}
