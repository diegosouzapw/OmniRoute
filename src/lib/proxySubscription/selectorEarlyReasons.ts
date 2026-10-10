/**
 * Global counters for early selector-skip reasons.
 *
 * The trigger returns before any database read when the selector is
 * disabled, no control URL is configured, or no subscription owns the
 * set-aside key. This module records those skips in process memory so the
 * management list can report them without extra I/O on the trigger path.
 */

export type SelectorEarlyReason = "flag-off" | "no-control" | "unmapped";

const counts: Record<SelectorEarlyReason, number> = {
  "flag-off": 0,
  "no-control": 0,
  unmapped: 0,
};

export function noteSelectorEarlyReason(reason: SelectorEarlyReason): void {
  if (reason !== "flag-off" && reason !== "no-control" && reason !== "unmapped") return;
  counts[reason] += 1;
}

export function readSelectorEarlyReasons(): Record<SelectorEarlyReason, number> {
  return { ...counts };
}

export function __resetSelectorEarlyReasonsForTesting(): void {
  counts["flag-off"] = 0;
  counts["no-control"] = 0;
  counts["unmapped"] = 0;
}
