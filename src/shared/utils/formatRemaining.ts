/**
 * Format a millisecond duration as a human-readable countdown ("Mm Ns").
 *
 * Shared by the runtime ModelCooldownsCard and the resilience ConnectionsTable
 * so both surfaces display cooldown time identically.
 *
 * Examples: 5000 -> "0m 5s", 5400000 -> "90m 0s".
 */
export function formatRemaining(ms: number): string {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}m ${s}s`;
}
