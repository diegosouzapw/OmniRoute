/**
 * warningDetector — detects prompt injection, sanitizer alerts, and provider warnings
 * in chat message content and raw upstream stream text.
 *
 * Used by:
 *  - open-sse/handlers/chatCore.ts  (message-level scan before dispatch)
 *  - Future: stream interceptors for [SANITIZER]/[FILTER] pattern detection
 */

/** Patterns for prompt injection in user message content */
const INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(previous|all|prior)\s+instructions/i,
  /you\s+are\s+now\s+(a|an)\s+/i,
  /<system_prompt>/i,
  /\bDAN\b.*mode/i,
  /pretend\s+(you\s+are|to\s+be)\s+(a|an)\s+/i,
  /act\s+as\s+if\s+you\s+(have\s+no|don't\s+have)\s+(restrictions|guidelines)/i,
  /jailbreak/i,
  /bypass\s+(your\s+)?(safety|restrictions|guidelines|filters)/i,
  /forget\s+(your\s+)?(instructions|training|guidelines)/i,
];

/** Patterns for provider-side stream warnings (sanitizer, filter, model warnings) */
const STREAM_WARNING_PATTERNS: RegExp[] = [
  /\[SANITIZER\]/,
  /\[FILTER\]/,
  /\[WARNING\]/i,
  /Warning:/,
  /\[BLOCKED\]/i,
  /Content filtered/i,
  /safety\s+system\s+blocked/i,
];

/**
 * Scans an array of chat messages for prompt injection patterns.
 * Returns true if any user message triggers a warning.
 */
export function detectWarnings(messages: any[]): boolean {
  if (!Array.isArray(messages)) return false;

  for (const message of messages) {
    const content = typeof message?.content === "string" ? message.content : null;
    if (!content) continue;

    // Only scan user/system messages (skip assistant turns)
    if (message?.role !== "user" && message?.role !== "system") continue;

    for (const pattern of INJECTION_PATTERNS) {
      if (pattern.test(content)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Scans a raw upstream stream chunk for provider-side warning/filter signals.
 * Returns true if any stream warning pattern is found.
 */
export function detectStreamWarnings(chunk: string): boolean {
  if (typeof chunk !== "string" || chunk.length === 0) return false;

  for (const pattern of STREAM_WARNING_PATTERNS) {
    if (pattern.test(chunk)) {
      return true;
    }
  }

  return false;
}

/**
 * Returns the list of all injection pattern strings for documentation/testing.
 */
export function getInjectionPatterns(): string[] {
  return INJECTION_PATTERNS.map((p) => p.toString());
}

/**
 * Returns the list of all stream warning pattern strings for documentation/testing.
 */
export function getStreamWarningPatterns(): string[] {
  return STREAM_WARNING_PATTERNS.map((p) => p.toString());
}
