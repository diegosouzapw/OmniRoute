/**
 * chatCore Claude message shape aliases (Quality Gate v2 / Fase 9 — chatCore god-file decomposition,
 * #3501).
 *
 * Minimal structural aliases shared by the Claude upstream-message transforms (and a handful of
 * narrowing casts left in handleChatCore). Kept intentionally loose — these mirror the permissive
 * shapes the handler already used inline; behaviour is unchanged.
 */

export type ClaudeContentBlock = Record<string, unknown>;

export type ClaudeMessage = {
  role?: unknown;
  content?: unknown;
};
